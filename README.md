# RPM Motors

SPA em React que simula o checkout de uma concessionária de motos esportivas:
catálogo, carrinho, pagamento e resultado da compra.

Mini-Projeto Avaliativo — Front-End React T1/T2, Módulo 2, Semana 07.

🎥 **Vídeo de apresentação:** [assistir](COLE_AQUI_O_LINK_DO_VIDEO)

## O problema

Uma loja virtual precisa finalizar compras sem travamentos: o cliente confere os
produtos, preenche os dados do cartão e recebe resposta imediata na tela. Toda a
operação acontece no navegador — não há back-end nem gateway de pagamento real.

Além disso, compras com indício de fraude precisam ser bloqueadas e comunicadas
com clareza, e o usuário não pode enviar a mesma compra duas vezes por engano.

## Funcionalidades

- Catálogo com 6 motos (foto, nome e preço de tabela).
- Carrinho com 3 motos, exibindo quantidade, preço unitário, subtotal e total.
- Formulário de pagamento com máscara de digitação e validação de formato.
- Processamento assíncrono simulado, com botão bloqueado durante o envio.
- Telas separadas para compra aprovada e para tentativa de fraude.
- Navegação entre as quatro telas por rotas.

## Regra da simulação

Cartões em formato válido são aprovados, **exceto** quando os 16 dígitos são
todos iguais — nesse caso a compra falha e a aplicação exibe `Tentativa de golpe`.
A verificação considera só o número do cartão; bandeira, algoritmo de Luhn e data
de vencimento não são validados.

## Fluxo das telas

```
  /                      /pagamento                /sucesso
┌───────────┐          ┌────────────┐            ┌──────────┐
│ Catálogo  │ Finalizar│ Formulário │  aprovada  │ Compra   │
│ Carrinho  ├─────────►│ do cartão  ├───────────►│ aprovada │
│ Resumo    │  compra  │ + Resumo   │            └──────────┘
└───────────┘          └─────┬──────┘                 │ voltar
      ▲                      │ 16 dígitos iguais      │
      │                      ▼                        │
      │                ┌──────────────┐   /falha      │
      └────────────────┤ "Tentativa   │               │
        tentar de novo │  de golpe"   │◄──────────────┘
                       └──────────────┘
```

## Tecnologias

| Tecnologia                                         |       Uso                           |
|---                                                 |---                                  |
| React 18 (JSX, componentes funcionais)             | Interface                           |
| Vite 6                                             | Servidor de desenvolvimento e build |
| React Router 7                                     | Navegação entre as quatro telas     |
| React Hook Form                                    | Estado e submissão do formulário    |
| Zod                                                | Validação dos dados do cartão       |
| CSS puro (variáveis, Flexbox, Grid, media queries) | Estilos e responsividade            |
| ESLint                                             | Padronização do código              |

Sem TypeScript, Context API, biblioteca de estado global, axios ou framework de CSS.

## Técnicas aplicadas

- **Componentização:** três componentes reutilizáveis recebendo dados por props
  (`CardCatalogo`, `ItemCarrinho`, `ResumoCompra`).
- **Listas:** produtos renderizados com `map` e `key` estável (o `id` do produto).
- **Estado e eventos:** `useState` controlando o status do pagamento; eventos de
  digitação e submissão do formulário.
- **Custom hook:** `usePagamento` concentra o estado e o processamento da compra.
- **Módulos ES:** páginas, componentes, dados e regras de negócio separados em
  arquivos com `import`/`export`.
- **Promises e async/await:** simulação assíncrona do processamento.
- **Semântica e acessibilidade:** HTML semântico em JSX, `label` associado a cada
  campo, `role="alert"` e `aria-describedby` nos erros, foco visível.
- **Responsividade:** CSS Grid com uma coluna no celular, duas em tablet e três
  em desktop.

## Estrutura do projeto

```
rpm-motors/
├── index.html               → ponto de entrada HTML
├── package.json             → dependências e scripts
├── vite.config.js           → configuração do Vite
├── eslint.config.js         → regras de lint
└── src/
    ├── main.jsx             → monta a aplicação no DOM
    ├── App.jsx              → configuração das quatro rotas
    ├── config.js            → nome da loja
    ├── pages/
    │   ├── Carrinho.jsx     → banner, catálogo, carrinho e resumo
    │   ├── Pagamento.jsx    → formulário do cartão
    │   ├── Sucesso.jsx      → compra aprovada
    │   └── Falha.jsx        → tentativa de golpe
    ├── components/
    │   ├── CardCatalogo.jsx → card de uma moto no catálogo
    │   ├── ItemCarrinho.jsx → card de um item do carrinho
    │   └── ResumoCompra.jsx → caixa de total
    ├── hooks/
    │   └── usePagamento.js  → estado e processamento da compra
    ├── utils/
    │   ├── carrinho.js      → itens do carrinho e cálculo do total
    │   ├── pagamento.js     → regra de fraude e limpeza do número
    │   ├── formatacao.js    → formatação em reais
    │   └── mascaras.js      → máscaras de digitação
    ├── data/
    │   └── produtos.js      → catálogo e seleção do carrinho
    └── assets/
        ├── styles/index.css → estilos da aplicação
        └── img/logo.svg     → logo
```

## Como executar

Pré-requisitos: Node.js 20.12 ou superior e npm.

```bash
git clone <url-do-repositorio>
cd rpm-motors
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Outros scripts: `npm run build` (versão de produção), `npm run preview` (serve o
build) e `npm run lint` (ESLint).

## Como testar

Na tela de pagamento digite **apenas números** — a formatação é automática.

|       Cenário      |         Cartão        | Resultado                         |
|---                 |---                    |---                                |
| Compra aprovada    | `4111 2222 3333 4444` | Tela de sucesso                   |
| Tentativa de golpe | `1111 1111 1111 1111` | Tela de falha                     |
| Formato incompleto | `4111`                | Permanece no formulário, com erro |
| Mês inválido       | validade `13/28`      | Permanece no formulário, com erro |

Validade: 4 dígitos (`1228` vira `12/28`). CVV: 3 dígitos.

## Decisões técnicas

- **Total único:** `utils/carrinho.js` calcula os itens e o total; carrinho e
  pagamento importam do mesmo módulo, então os valores nunca divergem.
- **Máscara não é validação:** as máscaras formatam a digitação, mas quem decide
  se os dados são aceitos é o schema do Zod, na submissão.
- **Formato e regra de negócio separados:** o Zod valida o formato do cartão;
  a regra de fraude vive em `utils/pagamento.js`, chamada pelo hook. Por isso um
  cartão com dígitos repetidos passa na validação e leva à tela de falha, em vez
  de virar erro de campo.
- **Carrinho fixo:** os itens vêm marcados na fonte de dados (`noCarrinho` em
  `produtos.js`), sem inclusão ou remoção pela interface.

## Investigação com o debugger

> Preencher com a investigação feita antes da entrega.
>
> Sugestão: DevTools (F12) → aba Sources → `src/hooks/usePagamento.js` →
> breakpoint na linha do `limparNumeroCartao`. Envie o cartão `1111-1111 1111 1111`
> e observe no painel Scope o valor antes e depois da limpeza, e o retorno de
> `ehTentativaDeGolpe`.

Durante o desenvolvimento também foram investigados dois problemas de
dependências: um conflito de `peerDependency` no `npm install` (ESLint 9 contra
um plugin que só aceitava a versão 8) e vulnerabilidades reportadas pelo
`npm audit`, identificadas com `npm audit --json` e corrigidas com atualizações
pontuais de versão, sem `--force`.

## Melhorias futuras

- Manter a posição do cursor ao editar um campo com máscara no meio do texto.
- Permitir montar o carrinho a partir do catálogo, com `useState` na seleção.
- Carregar o catálogo de uma API com `useEffect` e `fetch`, tratando os estados
  de carregando, vazio e erro.
- Hospedar as imagens no próprio projeto.
- Testes automatizados para as funções puras (regra de fraude, máscaras e total).

## Créditos das imagens

Fotos das motos: Wikimedia Commons, sob licenças livres, carregadas por URLs
estáveis. Os endereços estão em `src/data/produtos.js`.

---

Desenvolvido por **Glória Stephane Dangui** — Front-End React, Módulo 2.
