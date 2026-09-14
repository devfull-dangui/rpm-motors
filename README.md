# RPM Motors

SPA em React que simula o **checkout de uma concessionária de motos esportivas**:
o cliente confere o carrinho, informa os dados do cartão e recebe a confirmação
da compra — ou o bloqueio por tentativa de fraude.

> Mini-Projeto Avaliativo — Front-End React T1/T2, Módulo 2, Semana 07.

---

## Sumário

- [O problema](#o-problema)
- [Vídeo de apresentação](#vídeo-de-apresentação)
- [Funcionalidades](#funcionalidades)
- [A regra da simulação](#a-regra-da-simulação)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar](#como-executar)
- [Como testar o fluxo](#como-testar-o-fluxo)
- [Decisões técnicas](#decisões-técnicas)
- [Investigação com o debugger](#investigação-com-o-debugger)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)
- [Melhorias futuras](#melhorias-futuras)
- [Créditos das imagens](#créditos-das-imagens)

---

## O problema

Uma loja virtual precisa de uma interface de finalização de compra que funcione
sem travamentos: o cliente navega, preenche os dados e recebe resposta imediata
na tela. O desafio aqui é construir essa experiência **inteiramente no
navegador** — sem back-end e sem gateway de pagamento real — garantindo que:

1. os valores exibidos sejam sempre calculados a partir dos dados, nunca escritos à mão;
2. o formulário recuse dados em formato inválido antes de processar qualquer coisa;
3. a compra com indício de fraude seja bloqueada e comunicada claramente;
4. o usuário nunca consiga enviar a mesma compra duas vezes por engano.

## Vídeo de apresentação

🎥 **[Assistir à demonstração (7 min)](COLE_AQUI_O_LINK_DO_VIDEO)**

## Funcionalidades

- **Catálogo** com 6 motos esportivas, com foto, nome e preço unitário real de tabela.
- **Carrinho** com 3 motos selecionadas, exibindo quantidade, preço unitário e
  subtotal de cada item, e o total da compra formatado em reais.
- **Formulário de pagamento** com máscara de digitação (a pessoa digita só
  números, a página insere os separadores) e validação de formato em tempo de envio.
- **Processamento assíncrono simulado**, com feedback visual e bloqueio do botão
  para impedir envio duplicado.
- **Telas de resultado** distintas para compra aprovada e para tentativa de fraude.
- **Navegação entre as quatro telas** por rotas.

## A regra da simulação

Qualquer cartão em formato válido é aprovado, **exceto** quando os 16 dígitos
forem todos iguais — nesse caso a compra falha e a aplicação exibe a mensagem
`tentativa de golpe`.

Essa verificação considera apenas o número do cartão. Bandeira, algoritmo de
Luhn e data de vencimento não são validados, por não fazerem parte do escopo.

Vale destacar uma decisão de arquitetura: **validação de formato e regra de
negócio vivem em camadas separadas**. O schema do Zod (em `pages/Pagamento.jsx`)
só responde "esses dados estão no formato certo?"; quem responde "essa compra é
legítima?" é `utils/pagamento.js`, através do hook `usePagamento`. Por isso um
cartão com dígitos repetidos **não** produz erro de campo — ele passa na
validação, é processado e leva à tela de falha, como o fluxo exige.

## Tecnologias

| Tecnologia | Para quê |
|---|---|
| React 18 (JSX, componentes funcionais) | Construção da interface |
| Vite 6 | Servidor de desenvolvimento e build |
| React Router 7 | Navegação entre as quatro telas |
| React Hook Form | Estado e submissão do formulário |
| Zod | Schema de validação dos dados do cartão |
| CSS puro (variáveis, Flexbox, Grid, media queries) | Estilos e responsividade |
| ESLint | Padronização do código |

Sem TypeScript, sem Context API, sem biblioteca de estado global, sem axios e
sem framework de CSS — tudo em JavaScript e CSS escritos à mão.

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
    ├── config.js            → identidade da loja (nome)
    ├── pages/
    │   ├── Carrinho.jsx     → banner, catálogo, carrinho e resumo
    │   ├── Pagamento.jsx    → formulário do cartão e envio
    │   ├── Sucesso.jsx      → confirmação da compra
    │   └── Falha.jsx        → aviso de tentativa de golpe
    ├── components/
    │   ├── CardCatalogo.jsx → card de uma moto no catálogo
    │   ├── ItemCarrinho.jsx → card de um item do carrinho
    │   └── ResumoCompra.jsx → caixa de total (usada em duas telas)
    ├── hooks/
    │   └── usePagamento.js  → estado e processamento da compra
    ├── utils/
    │   ├── carrinho.js      → itens do carrinho e cálculo do total
    │   ├── pagamento.js     → regra de fraude e limpeza do número
    │   ├── formatacao.js    → formatação de valores em reais
    │   └── mascaras.js      → máscaras de digitação do formulário
    ├── data/
    │   └── produtos.js      → catálogo e seleção do carrinho
    └── assets/
        ├── styles/index.css → design system da loja
        └── img/logo.svg     → identidade visual
```

### Fluxo da aplicação

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
      └────────────────┤ "tentativa   │               │
        tentar de novo │  de golpe"   │◄──────────────┘
                       └──────────────┘
```

## Como executar

**Pré-requisitos:** Node.js 20.12 ou superior e npm.

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd rpm-motors

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

Acesse o endereço exibido no terminal (por padrão `http://localhost:5173`).

Outros scripts disponíveis:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve localmente o build de produção
npm run lint      # roda o ESLint
```

## Como testar o fluxo

Na tela de pagamento, digite **apenas números** — a formatação é automática.

| Cenário | Número do cartão | Resultado esperado |
|---|---|---|
| Compra aprovada | `4111 2222 3333 4444` | Vai para a tela de sucesso |
| Tentativa de golpe | `1111 1111 1111 1111` | Vai para a tela de falha |
| Formato inválido | `4111` (incompleto) | Permanece no formulário, com mensagem de erro |
| Mês inválido | validade `13/28` | Permanece no formulário, com mensagem de erro |

Preencha validade com 4 dígitos (ex.: `1228` → vira `12/28`) e CVV com 3 dígitos.

## Decisões técnicas

**Por que o total nunca diverge entre as telas.** O RF04 exige que o total
mostrado no pagamento corresponda ao resumo do carrinho. Em vez de repetir o
cálculo em cada página — que é exatamente como esse tipo de bug nasce —, as
funções `obterItensDoCarrinho()` e `calcularTotal()` moram em
`utils/carrinho.js`, e as duas telas importam de lá. Os valores são iguais **por
construção**, não por coincidência, e nenhum estado precisa ser compartilhado
entre as rotas.

**Por que máscara não é validação.** As funções de `utils/mascaras.js` cortam o
excesso de dígitos e inserem os separadores enquanto a pessoa digita, mas isso é
conforto visual: qualquer limite aplicado no input pode ser contornado. A regra
que de fato decide se os dados são aceitos é o schema do Zod, aplicado na
submissão.

**Por que CSS escrito à mão.** Um framework de CSS resolveria o visual mais
rápido, mas a responsividade é uma competência avaliada neste módulo — e código
que a gente não escreve é código que a gente não sabe explicar. O arquivo
`index.css` define um pequeno design system próprio (variáveis de cor e
espaçamento, `.container`, `.grid`, `.card`, `.btn`, `.campo`), o que evita
repetição sem trazer dependência externa.

**Por que a seleção do carrinho é fixa.** Os itens e as quantidades vêm marcados
na própria fonte de dados (`noCarrinho` em `produtos.js`), sem inclusão ou
remoção pela interface, conforme o escopo definido para o projeto. Trocar quais
motos estão no carrinho é alternar `true`/`false` naquele arquivo.

## Investigação com o debugger

> ⚠️ **Preencha esta seção com a sua própria investigação antes de entregar.**
> Sugestão de investigação rápida (leva ~5 minutos e rende bem no vídeo):
>
> 1. Abra o DevTools (F12) → aba **Sources** → arquivo `src/hooks/usePagamento.js`.
> 2. Coloque um breakpoint na linha do `const numero = limparNumeroCartao(...)`.
> 3. Preencha o cartão como `1111-1111 1111 1111` e envie o formulário.
> 4. Com a execução pausada, observe no painel **Scope**: `dados.numeroCartao`
>    ainda tem os separadores? O que `limparNumeroCartao` devolve? E o que
>    `ehTentativaDeGolpe` retorna na linha seguinte?
> 5. Descreva aqui o que você observou e o que isso confirmou sobre a regra.

Durante o desenvolvimento, também foram investigados dois problemas reais de
dependências, usando o próprio npm como ferramenta de diagnóstico:

- **`ERESOLVE` no `npm install`**: o `eslint-plugin-react-hooks@4` declarava
  compatibilidade apenas até o ESLint 8, enquanto o projeto pedia ESLint 9. A
  saída do erro apontava a `peerDependency` conflitante; a correção foi subir o
  plugin para a versão 5, e não mascarar o conflito com `--legacy-peer-deps`.
- **Vulnerabilidades reportadas pelo `npm audit`**: o relatório em texto não
  deixava claro qual pacote respondia pela severidade *high*. Rodar
  `npm audit --json` revelou o advisory exato (um bypass de leitura de arquivos
  no servidor de desenvolvimento do Vite, específico de Windows), que só tem
  correção a partir do Vite 6.4.3. A dependência foi atualizada de forma
  cirúrgica, em vez de aceitar o `npm audit fix --force` — que subiria o Vite
  três versões major de uma vez. Resultado: **0 vulnerabilidades**.

## Acessibilidade e responsividade

- HTML semântico em JSX: `main`, `header`, `section`, `article`, hierarquia de
  títulos `h1` → `h2` → `h3`.
- Todos os campos têm `label` associado por `htmlFor`/`id`.
- Erros de validação usam `role="alert"`, `aria-invalid` e `aria-describedby`,
  de modo que leitores de tela anunciem o problema e saibam a que campo ele pertence.
- Foco visível com contorno na cor da marca (`:focus-visible`).
- Imagens do catálogo têm texto alternativo; o logo é decorativo e usa `alt=""`.
- Layout em uma coluna no celular, duas em tablet e três em desktop, via CSS Grid
  e media queries. Os botões ocupam a largura total em telas estreitas.

## Melhorias futuras

- Preservar a posição do cursor ao editar um campo com máscara no meio do texto.
- Permitir montar o carrinho a partir do catálogo, com `useState` controlando a seleção.
- Carregar o catálogo de uma API com `useEffect` e `fetch`, tratando os estados
  de carregando, vazio e erro.
- Hospedar as imagens no próprio projeto, em vez de carregá-las de fonte externa.
- Testes automatizados para as funções puras (`ehTentativaDeGolpe`, máscaras e
  cálculo do total), que hoje foram verificadas manualmente.

## Créditos das imagens

As fotos das motos vêm do **Wikimedia Commons**, sob licenças livres, e são
carregadas diretamente de lá através de URLs estáveis (`Special:FilePath`).
Os endereços de cada imagem estão em `src/data/produtos.js`.

---

Desenvolvido por **Deborah Dangui** — Front-End React, Módulo 2.
