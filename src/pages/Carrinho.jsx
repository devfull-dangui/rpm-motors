import { Link } from 'react-router-dom'
import produtos from '../data/produtos.js'
import logo from '../assets/img/logo.svg'
import { NOME_LOJA } from '../config.js'
import CardCatalogo from '../components/CardCatalogo.jsx'
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'
import { obterItensDoCarrinho, calcularTotal } from '../utils/carrinho.js'
import { formatarReais } from '../utils/formatacao.js'

/**
 * Página inicial: vitrine da loja (catálogo completo) + o carrinho já montado.
 * RF01/RF02 — catálogo e seleção vêm da fonte de dados.
 * RF03 — itens renderizados com map e key estável; subtotais e total
 * calculados a partir dos dados e formatados em reais.
 * RF04 — botão que leva à tela de pagamento.
 */
function Carrinho() {
  const itens = obterItensDoCarrinho()
  const total = calcularTotal(itens)

  return (
    <main>
      <div className="container">
        <header className="hero">
          <img className="hero__logo" src={logo} alt="" />
          <div>
            <p className="hero__selo">Concessionária de motos esportivas</p>
            <h1>{NOME_LOJA}</h1>
            <p className="hero__texto">Motos 0km, para quem gosta de aventura.</p>
            <ul className="hero__vantagens">
              <li>Entrega em todo o Brasil</li>
              <li>Garantia de fábrica</li>
              <li>Compra segura</li>
            </ul>
          </div>
        </header>

        <section id="catalogo" className="secao" aria-labelledby="catalogo-titulo">
          <h2 id="catalogo-titulo">Catálogo</h2>
          <p className="texto-suave">
            {itens.length} de {produtos.length} motos já estão no seu carrinho.
          </p>
          <div className="grid grid--produtos mt-2">
            {produtos.map((produto) => (
              <CardCatalogo
                key={produto.id}
                nome={produto.nome}
                imagem={produto.imagem}
                preco={formatarReais(produto.precoUnitario)}
                noCarrinho={produto.noCarrinho}
              />
            ))}
          </div>
        </section>

        <section className="secao secao--carrinho" aria-labelledby="carrinho-titulo">
          <div className="secao--carrinho__topo">
            <h2 id="carrinho-titulo">Meu carrinho</h2>
            <span className="selo selo--ativo">
              {itens.length} {itens.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          <div className="grid grid--produtos mt-2">
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
            <ResumoCompra total={formatarReais(total)} quantidadeItens={itens.length} />
          </div>
        </section>

        <div className="acoes">
          <a className="btn btn--secundario" href="#catalogo">
            Ver catálogo
          </a>
          <Link to="/pagamento" className="btn btn--primario">
            Finalizar compra
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Carrinho
