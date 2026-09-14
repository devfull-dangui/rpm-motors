import { Link } from 'react-router-dom'

/**
 * RF11 — Mensagem exata "Tentativa de golpe" + link/botão para tentar
 * novamente, retornando ao pagamento.
 */
function Falha() {
  return (
    <main className="container resultado resultado--falha">
      <h1>Tentativa de golpe</h1>
      <p className="texto-suave">Não identificamos essa compra como válida.</p>
      <Link className="btn btn--secundario" to="/pagamento">
        Tentar novamente
      </Link>
    </main>
  )
}

export default Falha
