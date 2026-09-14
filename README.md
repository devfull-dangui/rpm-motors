# RPM Motors

SPA em React que simula o checkout de uma loja virtual de autopeças (RPM Motors):
carrinho, pagamento, sucesso e falha.

> Projeto em desenvolvimento — este README será completado (seção 5.2) quando a
> aplicação estiver funcional: descrição do problema, técnicas usadas, como
> executar e melhorias possíveis.

## Estrutura

```
rpm-motors/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx          — ponto de entrada
│   ├── App.jsx             — configuração das 4 rotas
│   ├── config.js           — nome da loja (fonte única)
│   ├── pages/              — uma tela por rota (Carrinho, Pagamento, Sucesso, Falha)
│   ├── components/         — componentes reutilizáveis (ItemCarrinho, ResumoCompra)
│   ├── hooks/              — usePagamento (custom hook)
│   ├── utils/              — regras de negócio puras (pagamento.js)
│   ├── data/               — produtos.js (array fixo de produtos)
│   └── assets/
│       ├── styles/         — index.css
│       └── img/            — logo.svg
```

## Como executar (após `npm install`)

```
npm install
npm run dev
```
