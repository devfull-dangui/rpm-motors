import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePagamento } from '../hooks/usePagamento.js'
import { limparNumeroCartao } from '../utils/pagamento.js'
import {
  mascararNumeroCartao,
  mascararValidade,
  mascararCvv,
} from '../utils/mascaras.js'
import { obterItensDoCarrinho, calcularTotal } from '../utils/carrinho.js'
import { formatarReais } from '../utils/formatacao.js'
import ResumoCompra from '../components/ResumoCompra.jsx'

// RF06 — validação de formato: titular preenchido, cartão com 16 dígitos
// (espaços/hífens ignorados), validade MM/AA com mês entre 01 e 12, CVV com
// 3 dígitos. Bandeira, Luhn e data de vencimento não são exigidos.
const schemaPagamento = z.object({
  titular: z.string().trim().min(1, 'Informe o titular do cartão'),
  numeroCartao: z
    .string()
    .min(1, 'Informe o número do cartão')
    .transform((valor) => limparNumeroCartao(valor))
    .refine((valor) => /^\d{16}$/.test(valor), {
      message: 'O cartão deve ter 16 dígitos',
    }),
  validade: z
    .string()
    .min(1, 'Informe a validade')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA, com mês entre 01 e 12'),
  cvv: z.string().min(1, 'Informe o CVV').regex(/^\d{3}$/, 'O CVV deve ter 3 dígitos'),
})

/**
 * Envolve o campo registrado no React Hook Form com uma máscara: formata o
 * valor digitado antes de entregá-lo ao formulário, para que estado e tela
 * mostrem sempre o mesmo texto.
 */
function comMascara(campo, mascara) {
  return {
    ...campo,
    onChange: (evento) => {
      evento.target.value = mascara(evento.target.value)
      return campo.onChange(evento)
    },
  }
}

/**
 * RF05/RF06 — Formulário de dados do cartão (React Hook Form + Zod).
 * RF07 — a regra de "todos os dígitos iguais" é resolvida pelo custom hook
 * usePagamento (utils/pagamento.js), não aqui: aqui só cuidamos do formato.
 * RF08 — botão desabilitado e texto "Processando compra..." durante o envio.
 * RF09 — ao concluir, navega para /sucesso ou /falha.
 */
function Pagamento() {
  const { status, processarCompra } = usePagamento()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaPagamento) })

  const processando = status === 'processando'

  // RF04 — o total aqui vem do mesmo módulo usado pelo Carrinho, então as
  // duas telas mostram sempre o mesmo valor.
  const itens = obterItensDoCarrinho()
  const total = calcularTotal(itens)

  const campoNumeroCartao = comMascara(register('numeroCartao'), mascararNumeroCartao)
  const campoValidade = comMascara(register('validade'), mascararValidade)
  const campoCvv = comMascara(register('cvv'), mascararCvv)

  async function aoEnviar(dados) {
    const resultado = await processarCompra(dados)
    navigate(resultado === 'sucesso' ? '/sucesso' : '/falha')
  }

  return (
    <main className="container">
      <h1>Pagamento</h1>

      <ResumoCompra total={formatarReais(total)} quantidadeItens={itens.length} />

      <form className="mt-3" onSubmit={handleSubmit(aoEnviar)} noValidate>
        <div className="campo">
          <label htmlFor="titular">Titular do cartão</label>
          <input
            id="titular"
            type="text"
            autoComplete="cc-name"
            placeholder="Nome completo, como está gravado no cartão"
            aria-invalid={Boolean(errors.titular)}
            aria-describedby={errors.titular ? 'titular-erro' : undefined}
            {...register('titular')}
          />
          {errors.titular && (
            <span id="titular-erro" className="campo-erro" role="alert">
              {errors.titular.message}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="numeroCartao">Número do cartão</label>
          <input
            id="numeroCartao"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className="campo-numerico"
            aria-invalid={Boolean(errors.numeroCartao)}
            aria-describedby={errors.numeroCartao ? 'numeroCartao-erro' : undefined}
            {...campoNumeroCartao}
          />
          {errors.numeroCartao && (
            <span id="numeroCartao-erro" className="campo-erro" role="alert">
              {errors.numeroCartao.message}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="validade">Validade</label>
          <input
            id="validade"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/AA"
            maxLength={5}
            className="campo-numerico"
            aria-invalid={Boolean(errors.validade)}
            aria-describedby={errors.validade ? 'validade-erro' : undefined}
            {...campoValidade}
          />
          {errors.validade && (
            <span id="validade-erro" className="campo-erro" role="alert">
              {errors.validade.message}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="000"
            maxLength={3}
            className="campo-numerico"
            aria-invalid={Boolean(errors.cvv)}
            aria-describedby={errors.cvv ? 'cvv-erro' : undefined}
            {...campoCvv}
          />
          {errors.cvv && (
            <span id="cvv-erro" className="campo-erro" role="alert">
              {errors.cvv.message}
            </span>
          )}
        </div>

        <div className="acoes">
          <button type="submit" className="btn btn--primario" disabled={processando}>
            {processando ? 'Processando compra...' : 'Finalizar compra'}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Pagamento
