// RF03 — formatar valores em reais.
export function formatarReais(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
