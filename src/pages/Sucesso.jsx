import { Link } from 'react-router-dom'

/**
 * RF10 — Confirmação de compra aprovada + link/botão para voltar ao carrinho.
 */
function Sucesso() {
  return (
    <main className="container resultado resultado--sucesso">
      <h1>Compra aprovada!</h1>
      <p className="texto-suave">Sua moto RPM Motors está a caminho.</p>
      <Link className="btn btn--primario" to="/">
        Voltar ao carrinho
      </Link>
    </main>
  )
}

export default Sucesso
