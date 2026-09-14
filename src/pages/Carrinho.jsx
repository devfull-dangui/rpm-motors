import { Link } from 'react-router-dom'
import produtos from '../data/produtos.js'
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'
import { formatarReais } from '../utils/formatacao.js'

/**
 * RF03 — Resumo do carrinho: produtos, subtotais e total, calculados a
 * partir de src/data/produtos.js e formatados em reais.
 * RF04 — Link para /pagamento; o total exibido aqui é o mesmo repassado
 * ao processar a compra.
 */
function Carrinho() {
  const itens = produtos.map((produto) => ({
    ...produto,
    subtotal: produto.precoUnitario * produto.quantidade,
  }))

  const total = itens.reduce((soma, item) => soma + item.subtotal, 0)

  return (
    <main className="container">
      <h1>Carrinho — RPM Motors</h1>

      <div className="grid grid--produtos">
        {itens.map((item) => (
          <ItemCarrinho
            key={item.id}
            nome={item.nome}
            imagem={item.imagem}
            precoUnitario={formatarReais(item.precoUnitario)}
            quantidade={item.quantidade}
            subtotal={formatarReais(item.subtotal)}
          />
        ))}
      </div>

      <div className="mt-3">
        <ResumoCompra total={formatarReais(total)} />
      </div>

      <div className="acoes">
        <Link to="/pagamento" className="btn btn--primario">
          Finalizar compra
        </Link>
      </div>
    </main>
  )
}

export default Carrinho
