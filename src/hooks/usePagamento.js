import { useState, useCallback } from 'react'
import { ehTentativaDeGolpe, limparNumeroCartao } from '../utils/pagamento.js'

/**
 * RF13 — Custom hook: concentra o estado e o processamento assíncrono
 * (simulado) da compra, para não misturar essa lógica com a página de
 * Pagamento (RF08).
 *
 * @returns {{
 *   status: 'idle' | 'processando' | 'sucesso' | 'falha',
 *   processarCompra: (dados: { numeroCartao: string }) => Promise<'sucesso' | 'falha'>,
 * }}
 */
export function usePagamento() {
  const [status, setStatus] = useState('idle')

  const processarCompra = useCallback(async (dados) => {
    setStatus('processando')

    // Simulação assíncrona (RF08) — sem back-end real.
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const numero = limparNumeroCartao(dados.numeroCartao)
    const resultado = ehTentativaDeGolpe(numero) ? 'falha' : 'sucesso'

    setStatus(resultado)
    return resultado
  }, [])

  return { status, processarCompra }
}
