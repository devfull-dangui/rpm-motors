/**
 * RF03 / RF12 — Resumo dos valores da compra, reutilizável via props.
 * Usado nas duas telas do fluxo (Carrinho e Pagamento), o que mantém o total
 * apresentado igual nas duas (RF04).
 */
function ResumoCompra({ total, quantidadeItens }) {
  return (
    <section className="resumo" aria-labelledby="resumo-titulo">
      <h2 id="resumo-titulo">Resumo da compra</h2>
      {typeof quantidadeItens === 'number' && (
        <p className="texto-suave">
          {quantidadeItens} {quantidadeItens === 1 ? 'moto' : 'motos'} no carrinho
        </p>
      )}
      <p className="resumo__total">
        Total: <strong>{total}</strong>
      </p>
    </section>
  )
}

export default ResumoCompra
