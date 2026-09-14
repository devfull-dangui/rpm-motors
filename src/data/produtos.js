// RF01 — Catálogo da loja: array de objetos com id, nome, preço unitário e
// quantidade. RF02 — Carrinho fixo: quais itens estão no carrinho e em que
// quantidade já vem definido aqui, na fonte de dados (`noCarrinho`), sem
// inclusão/remoção pela interface.
//
// Catálogo RPM Motors — motos esportivas 0km, com preço sugerido de tabela no
// Brasil (2026) e foto real (Wikimedia Commons, licença livre). Fontes e datas
// de consulta documentadas em claude/estrutura-do-projeto.md, no projeto.
const produtos = [
  {
    id: 1,
    nome: 'Yamaha YZF-R3',
    precoUnitario: 37090.0,
    quantidade: 1,
    noCarrinho: true,
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_YZF-R3_2022_v1.jpg',
  },
  {
    id: 2,
    nome: 'Kawasaki Ninja 400',
    precoUnitario: 29695.0,
    quantidade: 1,
    noCarrinho: true,
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kawasaki_Ninja_400.jpg',
  },
  {
    id: 3,
    nome: 'Honda CBR 650R',
    precoUnitario: 53790.0,
    quantidade: 1,
    noCarrinho: true,
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/2021_Honda_CBR650R.png',
  },
  {
    id: 4,
    nome: 'Yamaha YZF-R1',
    precoUnitario: 125990.0,
    quantidade: 1,
    noCarrinho: false,
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/2014_Yamaha_YZF-R1.JPG',
  },
  {
    id: 5,
    nome: 'BMW S 1000 RR',
    precoUnitario: 139900.0,
    quantidade: 1,
    noCarrinho: false,
    imagem: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_BMW_S1000RR.jpg',
  },
  {
    id: 6,
    nome: 'Ducati Panigale V4 S',
    precoUnitario: 169990.0,
    quantidade: 1,
    noCarrinho: false,
    imagem:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_Panigale_V4_R_%283%29.jpg',
  },
]

export default produtos
