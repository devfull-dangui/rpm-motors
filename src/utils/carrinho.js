import produtos from '../data/produtos.js'

// Regras do carrinho isoladas em um módulo: tanto o Carrinho quanto o
// Pagamento importam daqui, então o total das duas telas vem sempre do mesmo
// cálculo — é isso que garante o RF04 ("o total mostrado no pagamento deve
// corresponder ao resumo do carrinho") sem precisar compartilhar estado
// entre as rotas.

/** RF02 — itens do carrinho: os que já vêm marcados na fonte de dados. */
export function obterItensDoCarrinho() {
  return produtos
    .filter((produto) => produto.noCarrinho)
    .map((produto) => ({
      ...produto,
      subtotal: produto.precoUnitario * produto.quantidade,
    }))
}

/** RF03 — total da compra, somado a partir dos subtotais. */
export function calcularTotal(itens) {
  return itens.reduce((soma, item) => soma + item.subtotal, 0)
}
