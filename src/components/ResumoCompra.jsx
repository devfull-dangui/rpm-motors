/**
 * RF03 / RF12 — Resumo dos valores da compra (total), reutilizável
 * entre o Carrinho e o Pagamento.
 */
function ResumoCompra({ total }) {
  return (
    <div className="card">
      <strong>Total:</strong> {total}
    </div>
  )
}

export default ResumoCompra
