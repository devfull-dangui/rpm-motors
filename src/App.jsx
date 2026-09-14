import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Carrinho from './pages/Carrinho.jsx'
import Pagamento from './pages/Pagamento.jsx'
import Sucesso from './pages/Sucesso.jsx'
import Falha from './pages/Falha.jsx'

// RF12 — as quatro telas do fluxo de compra, uma rota para cada.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/falha" element={<Falha />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
