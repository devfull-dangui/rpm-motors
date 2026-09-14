import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { usePagamento } from '../hooks/usePagamento.js'
import { limparNumeroCartao } from '../utils/pagamento.js'

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
      message: 'O cartão deve ter 16 dígitos (espaços e hífens são ignorados)',
    }),
  validade: z
    .string()
    .min(1, 'Informe a validade')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use o formato MM/AA, com mês entre 01 e 12'),
  cvv: z.string().min(1, 'Informe o CVV').regex(/^\d{3}$/, 'O CVV deve ter 3 dígitos'),
})

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

  async function aoEnviar(dados) {
    const resultado = await processarCompra(dados)
    navigate(resultado === 'sucesso' ? '/sucesso' : '/falha')
  }

  return (
    <main className="container">
      <h1>Pagamento</h1>

      <form onSubmit={handleSubmit(aoEnviar)} noValidate>
        <div className="campo">
          <label htmlFor="titular">Titular do cartão</label>
          <input
            id="titular"
            type="text"
            autoComplete="cc-name"
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
            aria-invalid={Boolean(errors.numeroCartao)}
            aria-describedby={errors.numeroCartao ? 'numeroCartao-erro' : undefined}
            {...register('numeroCartao')}
          />
          {errors.numeroCartao && (
            <span id="numeroCartao-erro" className="campo-erro" role="alert">
              {errors.numeroCartao.message}
            </span>
          )}
        </div>

        <div className="campo">
          <label htmlFor="validade">Validade (MM/AA)</label>
          <input
            id="validade"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/AA"
            aria-invalid={Boolean(errors.validade)}
            aria-describedby={errors.validade ? 'validade-erro' : undefined}
            {...register('validade')}
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
            aria-invalid={Boolean(errors.cvv)}
            aria-describedby={errors.cvv ? 'cvv-erro' : undefined}
            {...register('cvv')}
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
