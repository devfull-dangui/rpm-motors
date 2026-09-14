/**
 * RF12 — Componente reutilizável (props): um card do catálogo.
 * Mostra a moto e sinaliza se ela já faz parte do carrinho — a seleção vem
 * fixa da fonte de dados (RF02), o card só a representa na tela.
 */
function CardCatalogo({ nome, imagem, preco, noCarrinho }) {
  return (
    <article className={noCarrinho ? 'card card--selecionado' : 'card'}>
      {imagem && <img src={imagem} alt={nome} loading="lazy" />}
      <h3>{nome}</h3>
      <p className="texto-suave">{preco}</p>
      <span className={noCarrinho ? 'selo selo--ativo' : 'selo'}>
        {noCarrinho ? 'No carrinho' : 'Disponível'}
      </span>
    </article>
  )
}

export default CardCatalogo
