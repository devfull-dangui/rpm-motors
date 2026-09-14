// Regras de negócio puras (sem estado, sem JSX) relacionadas ao pagamento.

/**
 * RF07 — Regra da simulação: a compra falha quando os 16 dígitos do número
 * do cartão são todos iguais (ex.: 1111111111111111). Espaços e hífens já
 * devem ter sido removidos antes de chamar esta função.
 *
 * @param {string} numeroCartao - apenas dígitos, 16 caracteres.
 * @returns {boolean} true se for uma "tentativa de golpe".
 */
export function ehTentativaDeGolpe(numeroCartao) {
  if (!numeroCartao || numeroCartao.length !== 16) return false
  return numeroCartao.split('').every((digito) => digito === numeroCartao[0])
}

/**
 * Remove espaços e hífens do número do cartão, conforme RF06.
 * @param {string} numeroCartao
 */
export function limparNumeroCartao(numeroCartao) {
  return numeroCartao.replace(/[\s-]/g, '')
}
