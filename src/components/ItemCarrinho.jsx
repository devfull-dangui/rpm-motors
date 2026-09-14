/**
 * RF03 / RF12 — Exibe um produto do carrinho via props.
 * Recebe os dados já calculados (o subtotal é responsabilidade da página,
 * que tem a visão do carrinho inteiro). Layout em card, pensado para o
 * grid de produtos com foto (ver .grid--produtos em assets/styles/index.css).
 */
function ItemCarrinho({ nome, imagem, precoUnitario, quantidade, subtotal }) {
  return (
    <article className="card">
      {imagem && <img src={imagem} alt={nome} loading="lazy" />}
      <h3>{nome}</h3>
      <p className="texto-suave">
        {quantidade} × {precoUnitario}
      </p>
      <p>
        <strong>Subtotal:</strong> {subtotal}
      </p>
    </article>
  )
}

export default ItemCarrinho
