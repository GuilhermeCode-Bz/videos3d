# Modelos 3D e cenários do canal

> Pra IA: ler antes de todo vídeo. Tudo fica em `canal/pecas/` (a versão nova da Máquina não apaga). Fotos: `videos/kit-mappoa/testes/folha.jpg` e `videos/kit-mappoa-2/testes/folha.jpg`.

## Como usar

Todo modelo existe de dois jeitos, e os dois são 3D de verdade:

- **Modelo pronto, peça única** (o pacote "Modelos do Mappoa", na aba Modelos 3D do painel, com foto): `K.modelo('mappoa-moveis/sofá', { escala: 5, pos: [x, y, z], giro: graus })`. Escala 5 é o tamanho certo perto do personagem, e todo modelo fica com a base no chão (y = 0). Pacotes: mappoa-moveis, mappoa-tecnologia, mappoa-vendas, mappoa-nichos, mappoa, mappoa-telas. É o jeito pra objeto parado ou que só se mexe inteiro. Lista na hora: `K.MODELOS`
- **Modelo com partes** (`K.m3d`, abaixo): pra quando uma parte se mexe, muda de cor ou de texto (robô acenando, barras do gráfico subindo, pinos brotando, tela que muda). **Tela de Mappoa em movimento ou perto da câmera: sempre `K.painelMappoa(...).mostrar(...)`**, porque o modelo pronto da tela é só pra ficar parado ao fundo (o texto dele sai quadriculado de perto)
- Mudou um modelo em `canal/pecas/`? Refazer o pacote: `node canal/ferramentas/assar-modelos.js` e `npm run painel -- --pacote canal/pacote-mappoa`

- Um modelo: `const m = K.m3d("caneca", { cor: 0x1067f8 }); m.position.set(1, 0.8, 0);`
- Trocar um modelo depois, em todos os vídeos e cenários: num arquivo novo `canal/pecas/z-trocas.js`, `K.m3d.trocar("caneca", (g, op) => { /* o modelo novo dentro do grupo g */ });`
- Um cenário: `const C = K.cenario("agencia");`
- Vários no mesmo vídeo: no montar, `CS = K.cenarios(["cidade", "agencia", "central_mappoa"]);`. No plano, `const C = CS.usar("agencia");` antes de colocar personagem e câmera. Peça do vídeo que só existe num lugar: criar uma vez e mostrar só nos planos dela

## Efeitos de impacto (canal/pecas/efeitos.js, foto em canal/pecas/fotos/efeitos.jpg)

Bons pro gancho do 1º segundo (a imagem grande e absurda). Criar no montar (`fx.exp = K.explosao()`) e chamar no plano
**depois do K.filmar** (eles tremem a câmera). `tempo` = segundos desde o estouro (negativo = ainda não aconteceu).

| Efeito | Uso |
|---|---|
| `K.explosao()` | `.em(pos, tempo, { escala, forca, cor: 'fogo' / 'azul' / 'verde', som, tremer, fumaca })`: clarão, bola de fogo, fumaça preta, destroços, faíscas, onda de choque e o som 'estrondo' |
| `K.poof()` | `.em(pos, tempo, { escala, cor })`: nuvenzinha e estrelinhas (algo aparece ou some) |
| `K.faiscas()` | `.em(pos, tc, { dir, forca, escala })`: faísca sem parar (curto-circuito, pavio) |
| `K.raio()` | `.em(alvo, tempo, { de, escala, cor })`: raio do céu com clarão e o som 'zap' |
| `K.chuvaDinheiro()` | `.em(centro, tempo, { raio, altura, dur, forca })`: notas de R$ e moedas caindo, e ficam no chão |
| `K.rachadura()` | `.em(pos, tempo, { raio })`: chão rachando com pedrinhas e poeira (fica rachado) |
| `K.ondaChoque()` | `.em(pos, tempo, { raio, som })`: anel de impacto no chão (pouso, soco na mesa) |
| `K.velocidade()` | `.em(pos, tc, { rumo, raio, comp })`: linhas de desenho em volta de quem corre |
| `K.bomba()` / `K.dinamite()` | `.em(pos, tc, { queimou: 0 a 1, treme: 0 a 1, escala, giro })`: pavio queimando com faísca. Pra estourar: parar de chamar e chamar a `K.explosao` no mesmo lugar |

## Rua entre prédios e câmeras andando (canal/pecas/cidade-ruas.js e cameras.js, foto em canal/pecas/fotos/rua-predios.jpg)

`const C = K.cenario('rua_predios')` (ou `{ hora: 'noite' }`): calçadão comprido no eixo z, prédios altos dos dois lados, lojas
embaixo (CLÍNICA, PIZZARIA, ACADEMIA, SALÃO, PADARIA, FARMÁCIA, LOJA, CAFÉ, MERCADO, ÓTICA, PET SHOP, DENTISTA), gente
andando e carros nas esquinas. Chão em y = 0.
- Andar: `menino.irPara(C.rua.de, C.rua.ate, B.p, tc, { reto: true })` (ou um trecho, ex.: de [0.9, 0, 6] até [0.9, 0, -6])
- Lojas: `C.lojas` (cada uma com nome, id, lado, porta e placa), `C.lugares.clinica` etc. (a porta) e o nome
  `loja_clinica` pro "mostra". Também C.lugares.inicio, meio, fim, esquina e telhado
- Câmeras (no lugar do K.filmar, depois de colocar o personagem; desviam dos prédios sozinhas):
  `K.seguir(menino, { lado: 'tras' | 'frente' | 'direita' | 'esquerda' | graus, dist, altura })` anda junto ·
  `K.drone(menino, B.p)` desce do alto · `K.heroi(menino, B.p)` de baixo pra cima com os prédios gigantes ·
  `K.ombro(menino, ponto, B.p)` por cima do ombro olhando a placa da loja
- Telhado: `menino.colocar(C.lugares.telhado, [-10, C.lugares.telhado[1], C.lugares.telhado[2] - 3])` e filmar com
  `K.seguir(menino, { lado: 145, dist: 5.5, altura: 0.6, olhar: 0.2 })` (de fora, no ar) ou `K.drone(menino, p, { de: 9, ate: 5, dist: 4, lado: -120 })`

## Personagens novos (canal/pecas/personagens.js, foto em canal/pecas/fotos/personagens.jpg)

`const dono = K.personagem('dono')` no montar: é um K.boneco normal (colocar, irPara, andar, correr, reagir, humor).
Tipos: `dono` (dono de empresa de terno) · `dona` (dona de empresa, blazer) · `vendedor` (terno cinza e pasta) ·
`dentista` (jaleco e máscara) · `entregador` (boné e bag de entrega) · `pizzaiolo` (avental e chapéu) · `personal`
(camiseta de academia e apito) · `cliente_bravo` (sempre de cara fechada) · `secretaria` (coque, headset e crachá) ·
`senhorinha` (óculos, xale e bengala) · `cabeleireira` (rabo de cavalo roxo e avental).
- Cores: `K.personagem('dona', { cores: { vestido: 0x1067f8, blazer: 0xffffff } })` (terno, camisa, gravata, calca, pele,
  cabelo, bone, bag, avental, xale...). Cara de sempre: `{ humor: 'triste' }`. Tamanho: `{ escala: 1.1 }`
- Acessórios em `b.extras` (pasta, bag, bengala, chapeu, mascara, headset...): `b.extras.pasta.visible = false`
- Bom pros nichos: a dentista na clínica, o pizzaiolo na pizzaria, o personal na academia, a cabeleireira no salão, a
  secretária atendendo o telefone, o cliente bravo e a dona de empresa como "o cliente" do personagem do canal

## Fachada das lojas (canal/pecas/fachadas.js, foto em canal/pecas/fotos/fachadas.jpg)

`K.cenario('fachada', { loja: 'clinica' })` (ou `'fachada_clinica'`): a frente da loja vista da rua, com a placa, o toldo, a
vitrine (o lado de dentro aparece), a porta de vidro que abre, o cavalete da promoção na calçada e carros passando.
Lojas: `clinica` (Clínica Sorriso) · `academia` (Academia Treino) · `pizzaria` (com mesinhas na calçada) · `salao`
(Salão Bella) · `loja` (Vento Sul, roupas). `{ hora: 'noite' }` acende tudo; `{ fechado: true }` põe FECHADO na porta.
- Os nomes combinam com o lado de dentro: `C.loja.interior` diz o cenário de dentro ('clinica_odonto', 'academia',
  'pizzaria', 'salao_beleza', 'loja_roupas'). Pra entrar e cortar pra dentro: `K.cenarios([['fachada', { loja: 'clinica' }, 'fora'], 'clinica_odonto'])`
- Entrar: `menino.irPara(C.lugares.chegada, C.lugares.porta, x, tc)`, depois `C.porta.abrirEm(tempo)` (abre com o sino) e
  `menino.irPara(C.lugares.porta, C.lugares.dentro, x, tc)`. A porta fecha sozinha em todo quadro que não chama
- Lugares: chegada, calcada, porta, dentro, vitrine, placa, cavalete, rua. Nomes pro "mostra": fachada, placa, porta, vitrine
- Câmeras boas: `K.mirar(C.vista.pos, C.vista.alvo)` (de frente, do outro lado da rua) e `K.seguir(menino, { lado: 'tras' })`
  chegando na porta

## Objetos novos (canal/pecas/objetos.js, foto em canal/pecas/fotos/objetos.jpg)

No catálogo do K.m3d, base no chão e frente pra +z: `const c = K.m3d('cofre'); c.position.set(x, 0, z)` (`{ tam: 3 }` = gigante,
bom pro gancho). Os que se mexem têm os comandos em `c.userData.m3d` (chamar no plano; todo quadro volta ao neutro):
- Dinheiro: `cofre` (abrir(k), girar(t)) · `pilha_dinheiro` (crescer(k)) · `saco_dinheiro`
- Telas: `celular_gigante` (mostrar({ itens: [...], n }), vibrar(t)) · `calculadora` ({ texto }) · `planilha_gigante`
  (preencher(k), { linhas, colunas })
- Ganchos e metáforas: `botao_vermelho` (apertar(k)) · `rede_pesca` · `foguete_desenho` (bocal, pro K.jatoFoguete) ·
  `balanca` (pender(-1 a 1)) · `corrente_cadeado` (abrir(k)) · `despertador` (tocar(t), horas(h)) · `seta_crescimento`
  (crescer(k)) · `escada_sucesso` (crescer(k)) · `coroa` · `papel_amassado` · `presente` (abrir(k)) · `sirene` (em(t))
- Entrega e compras: `caixa_entrega` (abrir(k)) · `moto_entrega` (rodar(t, vel), selim) · `carrinho_compras`

## Animações novas (canal/pecas/animacoes.js, foto em canal/pecas/fotos/animacoes.jpg)

Valem pra todo personagem (o do canal, os K.personagem e os figurantes): `menino.reagir('nome', t)`, como as reações
de sempre. `sentado` (ou menino.sentar(1) antes de outra reação: ele senta e depois digita) · `digitando` · `celular` ·
`comemorando` (pulinhos) · `cai_sentado` · `bate_mesa` · `coca_cabeca` · `mao_na_testa` · `nao` · `sim` · `dancando` ·
`dormindo` (Zzz) · `correndo_assustado` · `carregando` (`const p = menino.carregar()`: o ponto entre as mãos, pra pôr a
caixa) · `olha_relogio` · `chorando` (lágrimas) · `desmaia` · `aplaudindo` · `ombros` ("sei lá")

## Efeitos extras (canal/pecas/efeitos-extra.js, foto em canal/pecas/fotos/efeitos-extra.jpg)

Criar no montar, chamar `.em(...)` no plano: `K.fogos()` (céu de noite) · `K.holofote()` (luz de palco num ponto) ·
`K.chuva()` / `K.chuva(7, { neve: true })` · `K.balaoPensamento()` (`.em(cabeca, tempo, { texto: 'Onde acho cliente?' })`) ·
`K.balaoFala()` (`{ texto: 'Achei 200 clientes!' }`) · `K.nuvemRaiva()` (em cima da cabeça) · `K.simbolo()` (`{ tipo: '?' }`:
? ! $ ✓ ✗ ❤ +1) · `K.contador()` (`{ de: 0, ate: 200, depois: ' clientes' }`, com cliques e ding) · `K.folhasVento()` (ou
`K.folhasVento(77, 70, { papel: true })`: papéis voando). cabeca = `menino.cabeca.getWorldPosition(new THREE.Vector3()).toArray()`

## Mais cenários (canal/pecas/cenarios-novos.js, foto em canal/pecas/fotos/cenarios-novos.jpg)

- `palco_show` (`{ texto: '200 CLIENTES' }` no telão; C.telao.desenhar pra trocar): cortina, refletores coloridos, plateia.
  'palco' sozinho continua sendo o estúdio da Máquina
- `vazio_colorido` (`{ cor: 'azul' | 'rosa' | 'verde' | 'laranja' | 'roxo' }`): fundo infinito com formas flutuando
- `escritorio_vidro` (`{ hora: 'noite' }`, `{ texto }` na parede da marca): janelão com a cidade, sala de reunião de vidro
- `cafeteria`: balcão, máquina de café, cardápio, mesinhas · `supermercado` (`{ texto }` na placa de oferta): corredores
  de prateleiras (C.lugares.corredor, corredor2, corredor3), os caixas e o carrinho

## Cenários novos

| Nome | O lugar | Lugares extras em C.lugares |
|---|---|---|
| `agencia` | Agência de marketing: neon, mural, lousa, mesas | mural, lousa, sofa, mesa, mesa2 |
| `home_office` | Quarto do freelancer (`{ hora: "noite" }` escurece a janela) | mesa, janela |
| `sala_reuniao` | Mesa comprida, TV com gráfico | mesa, tv, lousa |
| `clinica_odonto` | Recepção, dente na parede, cadeira de dentista | balcao, dente, cadeira, espera |
| `academia` | Esteiras, bancos, espelho, halteres | espelho, esteira, banco, halteres |
| `salao_beleza` | Espelhos com luz, cadeiras, balcão | espelho, cadeira, balcao |
| `pizzaria` | Forno a lenha, parede de tijolo, piso xadrez | forno, balcao, mesa |
| `loja_roupas` | Araras, manequins, caixa, espelho | arara, balcao, espelho |
| `central_mappoa` | Sala de controle com mapa gigante e robôs | mapa, mesa, mesa2 |
| `mundo_mappoa` | Palco da marca: logo gigante, cartões e pinos flutuando | logo |
| `cidade_maquete` | A cidade vista de cima, em miniatura, com carrinhos | (personagem no centro) |

Todos têm também C.centro, C.personagem, C.entrada, C.esquerda, C.direita, C.fundo e C.vista, como os cenários da Máquina.

## Quais cenários em cada vídeo da pauta

| Vídeo | Sequência sugerida |
|---|---|
| Procurar cliente na mão no Google Maps | `home_office` → `cidade_maquete` → `central_mappoa` → `home_office` |
| Possíveis clientes para uma agência | `agencia` → `central_mappoa` → `mundo_mappoa` → `agencia` |
| Empresas com site desatualizado | `cidade` → `loja_roupas` → `central_mappoa` → `home_office` |
| Lista de clientes do zero | `agencia` → `cidade_maquete` → `central_mappoa` → `sala_reuniao` |
| O nicho e a cidade de quem comenta | `home_office` → o lugar do nicho → `central_mappoa` |
| Quem nunca compraria | `sala_reuniao` → `cidade_maquete` com a peneira → `mundo_mappoa` |
| A IA que analisa o potencial | `central_mappoa` → `clinica_odonto` ou `academia` → `sala_reuniao` |

## Modelos (nome pro K.m3d)

### Móveis e complementos de cenário (27)

`mesa` Mesa de trabalho · `mesa_redonda` Mesa redonda · `cadeira` Cadeira · `cadeira_giratoria` Cadeira giratória · `sofa` Sofá · `poltrona` Poltrona · `estante` Estante com livros · `arquivo` Arquivo de gavetas · `planta` Planta no vaso · `planta_alta` Planta alta · `luminaria` Luminária de pé · `ring_light` Ring light · `pendente` Luz pendente (origem no teto) · `tapete` Tapete · `quadro_parede` Quadro de parede · `quadro_postits` Mural de post-its · `lousa` Quadro branco com gráfico · `relogio_parede` Relógio de parede · `bebedouro` Bebedouro · `lixeira` Lixeira · `balcao` Balcão · `banqueta` Banqueta · `cabideiro` Cabideiro · `ar_condicionado` Ar-condicionado · `tv_parede` TV de parede · `cafeteira` Cafeteira · `letreiro` Letreiro neon (op.texto)

### Escritório e tecnologia (12)

`notebook` Notebook · `monitor` Monitor · `tablet` Tablet · `headset` Headset · `telefone_fixo` Telefone de mesa · `impressora` Impressora · `pilha_papeis` Pilha de papéis · `pasta` Pasta de documentos · `caneca` Caneca · `calendario` Calendário · `post_it` Post-it · `lista_check` Prancheta com checklist

### Vendas e marketing (18)

`megafone` Megafone · `alvo` Alvo com flecha · `ima` Ímã que atrai clientes · `balao_chat` Balão de conversa · `envelope` Envelope · `lampada_ideia` Lâmpada de ideia · `ampulheta` Ampulheta · `trofeu` Troféu · `cartao_visita` Cartão de visita · `prediozinho` Empresa em miniatura (op.placa) · `placa_aberto` Placa "Aberto" · `grafico_barras` Gráfico de barras em 3D · `binoculos` Binóculos · `escudo_ok` Escudo com ✓ · `medalha` Medalha · `sino` Sino de notificação · `chave` Chave · `pilha_cartoes` Pilha de cartões de empresas

### Nichos (clínica, academia, salão, comida, loja) (16)

`dente` Dente · `cadeira_dentista` Cadeira de dentista · `haltere` Haltere · `esteira` Esteira · `banco_academia` Banco com barra · `secador` Secador · `tesoura` Tesoura · `espelho_salao` Espelho com luzes · `cadeira_salao` Cadeira de salão · `pizza` Pizza · `caixa_pizza` Caixa de pizza (op.aberta) · `forno_pizza` Forno a lenha · `arara_roupas` Arara de roupas · `manequim` Manequim · `caixa_registradora` Caixa do comércio · `sacola` Sacola de compras

### Mappoa (11)

`robo` Robô do Mappoa · `logo` Logo 3D · `pino` Pino de mapa · `mapa` Mapa da cidade com pinos · `lupa` Lupa · `funil` Funil de 4 andares · `peneira` Peneira · `site_antigo` Computador com site antigo · `cartao_lead` Cartão de empresa · `moeda_contato` Moeda de contato · `painel` Painel com tela do Mappoa
