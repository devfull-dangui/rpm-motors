// Máscaras de digitação do formulário de pagamento.
// Elas só formatam o que a pessoa digita (UX): a pessoa digita apenas os
// números e a página insere os separadores. A validação de verdade continua
// no schema Zod da página de Pagamento — máscara não é validação.

/** Remove tudo que não for dígito. */
export function somenteDigitos(valor) {
  return valor.replace(/\D/g, '')
}

/** RF06 — 16 dígitos agrupados de 4 em 4: "0000 0000 0000 0000". */
export function mascararNumeroCartao(valor) {
  const digitos = somenteDigitos(valor).slice(0, 16)
  return digitos.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/** RF06 — 4 dígitos no formato de data: "00/00" (MM/AA). */
export function mascararValidade(valor) {
  const digitos = somenteDigitos(valor).slice(0, 4)
  if (digitos.length <= 2) return digitos
  return `${digitos.slice(0, 2)}/${digitos.slice(2)}`
}

/** RF06 — 3 dígitos, sem separador. */
export function mascararCvv(valor) {
  return somenteDigitos(valor).slice(0, 3)
}
