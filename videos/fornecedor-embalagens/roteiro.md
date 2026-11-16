# O fornecedor que ninguém conhece: roteiro e ficha de cena

> Vídeo de personagem (~80 s). Quem tem produto bom pra vender pra outras empresas, mas não alcança os clientes:
> indicação é sorte, conteúdo orgânico demora, anúncio pago aparece pro público errado e custa caro. O jeito é ir atrás
> do cliente. Gancho no estilo do canal (situação + "se você fizer X, acontece Y", conflito na tela no 1º segundo);
> depois o personagem ("Esse é o Beto..."). Fecha com "Antes... Agora...", a pergunta pros comentários e o fim no
> computador com mappoa.com.

## Roteiro

1. A pizzaria abriu do lado. Se você não aparecer, ela compra caixa do concorrente. *(gancho)*
2. Esse é o Beto. Ele fabrica embalagem pra delivery: caixa de pizza, de hambúrguer, de marmita.
3. Caixa boa, preço justo. Mas quase nenhuma pizzaria conhece a marca dele.
4. Se você é o Beto, espera um cliente indicar o outro.
5. Mas pizzaiolo indica quando lembra: um pedido novo por mês, se der sorte.
6. Então você começa a postar foto de caixa no Instagram, todo dia.
7. Esse é o *conteúdo orgânico*.
8. Mas orgânico é igual plantar árvore: dá fruto, só que demora meses. E o estoque tá parado agora.
9. Então você parte pro *anúncio pago*.
10. Mas aí vem público, pixel, criativo, leilão... e o anúncio aparece pra quem quer comer pizza, não pra quem vende.
11. Então você faz o contrário: em vez de esperar o cliente te achar, você vai atrás dele.
12. Essa é a *prospecção ativa*.
13. É por isso que quem vende pra empresa sai na frente: o seu cliente tem nome, endereço e placa na rua.
14. Mas ir atrás de quem? Rodar a cidade de pizzaria em pizzaria gasta o dia e o tanque.
15. Então você começa pela lista: no Mappoa, busca "pizzarias em Goiânia", e vêm centenas, com o telefone e o WhatsApp
    que estiverem públicos.
16. E não para na pizza: hamburgueria, marmitaria, açaí. Cada busca é uma lista nova.
17. Aí você chama uma por uma, falando do negócio de cada uma. Quem fecha é você.
18. Antes, o Beto esperava a pizzaria lembrar dele. Agora, ele acha as pizzarias da cidade inteira.
19. E você, vende o quê, e pra quem? Comenta aí. No computador, digita mappoa.com e testa você também.

~255 palavras, uns 78 a 85 segundos. 5 ciclos "Mas → Então", cada problema nascendo da solução anterior: esperou
indicação → vem pouco → posta conteúdo → demora e o estoque parado → paga anúncio → aparece pro público errado → vai
atrás do cliente → atrás de quem, e rodar a cidade cansa → começa pela lista, e em escala (um segmento atrás do outro).

Temperos: comparação caseira (orgânico é plantar árvore), número concreto (um pedido por mês), "é por isso que"
(cliente de quem vende pra empresa tem placa na rua), humor seco (o anúncio aparece pra quem quer comer pizza; gasta o
dia e o tanque), quebra de mito (anúncio não acha empresa sozinho).

## Conferido com o produto (`canal/produto.md`)

- O Mappoa aparece nas frases 15 e 16 (achar as empresas certas, com os contatos, em escala): buscar por segmento e
  cidade é o passo 1 dele; "centenas" bate com o produto; "o telefone e o WhatsApp que estiverem públicos": nem todo
  lead tem tudo. A frase 16 é a força principal do produto: leads com qualidade, em escala
- O vídeo não diz que o Mappoa manda mensagem, acompanha resposta ou fecha venda: "você chama" e "quem fecha é você"
- Nada de preço, plano nem número de vendas. O "Antes/Agora" fala do jeito de achar cliente, não de resultado
- O vídeo não fala mal de conteúdo nem de anúncio: o orgânico funciona, só demora; o anúncio, sem segmentação boa,
  mostra pra muita gente que não é empresa (é o público final que mais vê anúncio de comida). "Um pedido por mês" é o
  personagem, não estatística
- Conceito conferido: prospecção ativa é a empresa escolher e abordar o cliente, no lugar de esperar indicação ou
  anúncio. Simplificado, não inventado
- Nenhuma frase repetida dos vídeos do web designer e da cold call

## Ficha de cena

**Cenário:** `cidade` (o padrão do canal), de dia: o vídeo é sobre lojas de rua (pizzarias, hamburguerias) e o
fornecedor que roda a cidade atrás delas. No calçadão, uma fileira de lojinhas (a partir de x -21, longe dos vasos do
calçadão; lição do web designer): a **pizzaria nova** ("Forno Bom", com faixa de inauguração) e, do lado, a
**fábrica do Beto** ("Beto Embalagens", com pilha de caixas na porta), mais 2 lojas de comida de enfeite. Peças do
cenário que entram nas frases: os carros passando (frase 1: a van do concorrente para na pizzaria; frase 14: o carro
do Beto rodando), os prédios do outro lado da rua (frase 13: as placas das lojas acendendo), a hora mudando de dia pra
noite (frase 14), o semáforo e os pedestres no fundo. Foto: `referencias/cenarios/cidade.jpg`.
**Hora:** dia (vira tarde e noite só na frase 14). **Personagens:** o do canal (menino de camiseta azul), que no vídeo
se chama **Beto**, quase sempre na frente da fábrica dele; e **a dona da pizzaria** (`K.boneco({ tipo: 'menina' })`),
que no gancho recebe caixas do concorrente e no fim é chamada pelo Beto.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Beto | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | na frente da fábrica (~[-26, 0, 2]) | todas |
| `dona` | a dona da pizzaria | `K.boneco({ tipo: 'menina' })` + `K.nomear` | ~1,4 de altura, vestido vermelho | na porta da pizzaria | 1, 17, 18 |
| `pizzaria` | a pizzaria nova, "Forno Bom", com faixa "Inauguração" | `K.modelo('kenney-cidade/building-small-a')` (escala 5) + `K.placa` + faixa (`K.placa`) + `K.nomear` | uns 4 de largura e 3,5 de altura; placa vermelha com letra branca | calçadão, x -21 | 1, 18 |
| `fabrica` | a lojinha do Beto, "Beto Embalagens" | `K.modelo('kenney-cidade/building-small-b')` (escala 5) + `K.placa` + `K.nomear` | igual; placa marrom-papelão com letra branca | colada na pizzaria, x -26 | 2, 3, 4 |
| `van` | o carro do concorrente, que entrega na pizzaria | `K.carro(0xf4f1ea)` + `K.placa('Embalagens Já')` na lateral + `K.nomear` | carro branco | estaciona na frente da pizzaria | 1, 18 |
| `caixas` | a pilha de caixas de pizza do Beto (empilhadas, papelão) | `K.pecas`: caixas finas empilhadas (umas 12) | cada uma 0,45 × 0,06 × 0,45, papelão `#c89b62` com o logo verde | na porta da fábrica | 2, 3, 8 |
| `kit_caixas` | as 3 embalagens: pizza, hambúrguer, marmita | `K.pecas`: caixa chata (pizza), caixinha com tampa (hambúrguer), pote retangular (marmita) | 0,5 de largura cada, papelão + logo verde | flutuando em fila na frente do Beto | 2 |
| `cadeira` | a cadeirinha em que ele espera na porta | `K.pecas`: caixas (assento, encosto, pés) | assento 0,5 × 0,5, a 0,45 do chão, listrada azul e branca | na frente da porta da fábrica | 4, 11 |
| `celular` | o celular do Beto (notificação, posts, mensagem) | `K.celular()` + `K.nomear`, escala 2,5 | tela desenhada na cor do canal | na mão dele ou flutuando do lado | 4, 5, 6, 17 |
| `calendario` | o calendário do mês, folhas virando, com um só dia marcado | `K.telaCanvas` num grupo + `K.nomear` | 1,6 × 1,8, branco com barra vermelha | flutuando acima do Beto | 5 |
| `vaso` | o vaso com a muda (o conteúdo orgânico) | `K.pecas`: tronco de cone + `K.flor` sem flor (só a muda) | vaso 0,4, terracota `#c8643c`; muda de 0,1 que cresce até 0,5 | no chão, na frente da pilha de caixas | 7, 8 |
| `maquina` | a máquina do anúncio: painel com botões, alavancas, as plaquinhas "público", "pixel", "criativo", "leilão", e um telão em cima | `K.pecas`: caixa grande + cilindros (botões) + caixas finas (alavancas) + 4 `K.placa` + `K.telaCanvas` (telão) | 1,8 × 2,2 × 0,8, cinza-azulado `#5b6b80` | `C.centro` | 9, 10 |
| `notas` | as notas de dinheiro voando pra boca da máquina | `K.pecas`: caixas bem finas, umas 10 | 0,3 × 0,15, verde `#7cc576` | da mão dele até a máquina | 10 |
| `seta` | a seta gigante que vira de "esperar" pra "ir atrás" | `K.seta` | 2,5 de comprimento, vermelha que vira verde | no chão, na frente da fábrica | 11 |
| `placas` | as placas das lojas do outro lado da rua (pizzaria, lanchonete, padaria...), acendendo verde uma a uma | `K.placa` × 6 num grupo + `K.nomear` | 1,4 × 0,4 cada, coloridas | na fachada dos prédios do outro lado da rua | 13 |
| `carro_beto` | o carro do Beto, com o porta-malas cheio de caixas e o marcador de gasolina | `K.carro(0x2f6fd6)` + caixinhas no teto + `K.nomear` | carro azul | andando pela rua | 14 |
| `computador` | a mesa com o computador do Beto | `K.computador()` + `K.nomear` (tela desenhada: a busca, a lista, mappoa.com) | mesa de 1,15 de largura; tela 0,7 | `C.direita` | 15, 16, 19 |
| `lista` | o painel grande do Mappoa, com as pizzarias enchendo (nome, bairro, ícone de telefone e de WhatsApp); na 16, abas novas no topo | `K.telaCanvas` num grupo + `K.nomear` | 2,2 × 2,8, branco com barra na cor do canal `#2e9d5b` | em pé, acima do computador | 15, 16, 17 |
| `navegador` | a barra de endereço grande, com "mappoa.com" | `K.placa` desenhada + `K.nomear` | 2,4 × 0,5, branca com letra preta e cadeado | em pé, acima do computador | 19 |
| ondas, ✓/✗, contador, etiquetas, rótulos, festa, poeira, fumaça | efeitos | `K.ondas`, `K.marca`, `K.contador`, `K.etiqueta`, `K.rotulo`, `K.festa`, `K.poeira`, `K.fumaca` | | em volta das peças | várias |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| pizzaria | 1, 18 | a `pizzaria` com a faixa de inauguração |
| caixa, concorrente | 1 | a `van` "Embalagens Já" descarregando caixas na pizzaria |
| Beto | 2 em diante | o `personagem` |
| embalagem, caixa de pizza, hambúrguer, marmita | 2 | as 3 do `kit_caixas`, uma em cada palavra |
| caixa boa, preço justo | 3 | ✓ verde e a etiqueta "Preço justo" na pilha de `caixas` |
| marca dele | 3 | a placa da `fabrica`, que ninguém olha |
| cliente indicar | 4 | o Beto na `cadeira` com o `celular` mudo |
| pizzaiolo, pedido por mês | 5 | o `calendario` com um dia marcado e o contador "1 pedido" |
| foto de caixa, Instagram, todo dia | 6 | o `celular` gigante com as fotos das caixas subindo e o contador de dias |
| conteúdo orgânico | 7 | o rótulo e o `vaso` com a muda |
| árvore, fruto, meses | 8 | a muda crescendo devagar no `vaso`, um frutinho minúsculo |
| estoque parado | 8 | a pilha de `caixas` crescendo e pegando poeira, com teia |
| anúncio pago | 9 | o rótulo e a `maquina` |
| público, pixel, criativo, leilão | 10 | as 4 plaquinhas da `maquina` |
| quem quer comer pizza | 10 | o telão da máquina mostra o anúncio chegando em gente comendo pizza no sofá (desenhada) |
| quem vende | 10 | o telão mostra a pizzaria com um ✗ (o anúncio não chega nela) |
| atrás dele | 11 | a `seta` virando e o Beto saindo |
| prospecção ativa | 12 | o rótulo |
| nome, endereço, placa na rua | 13 | as `placas` do outro lado da rua acendendo, cada uma com nome e endereço |
| cidade, tanque | 14 | o `carro_beto` rodando e o marcador de gasolina descendo |
| dia | 14 | o céu virando de dia pra noite |
| Mappoa, pizzarias em Goiânia | 15 | a busca digitada no `computador` e a `lista` |
| centenas, telefone, WhatsApp | 15 | o contador "300+" e os ícones nas linhas da `lista` |
| hamburgueria, marmitaria, açaí | 16 | as abas novas no topo da `lista`, uma em cada palavra |
| negócio de cada uma | 17 | o `celular` com a mensagem citando a pizzaria |
| quem fecha é você | 17 | ✓ verde e o Beto apertando o enviar |
| antes, agora | 18 | a cena do gancho em preto e branco; depois, colorida, com a dona recebendo as caixas do Beto |
| computador, mappoa.com | 19 | o `computador` e o `navegador` |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida, ninguém programa): o calçadão de dia, a rua com os carros e o ônibus
passando, o semáforo trocando de cor, os pedestres andando e os prédios coloridos do outro lado.

#### 1 · plano `gancho` · ~4 s · `gancho`
> "A pizzaria abriu do lado. Se você não aparecer, ela compra caixa do concorrente."

- **NA TELA:** a pizzaria nova no centro, com a faixa "Inauguração"; a dona na porta; a van branca "Embalagens Já"
  estacionando na frente dela; à esquerda, de canto, a fábrica do Beto com a porta fechada; a pergunta do gancho no topo
- **MOSTRA:** `["pizzaria", "van", "dona"]`
- **CENÁRIO:** o calçadão; carros passando na rua atrás da van; um pedestre cruzando
- **ENTRA AGORA:** a van, já chegando no 1º quadro (vinda da direita, freando); a pilha de caixas saindo da van na
  palavra "compra"
- **OBJETOS SE MEXENDO:** a van anda uns 6 m e freia na frente da pizzaria na palavra "aparecer"; a faixa de
  inauguração balança; na palavra "concorrente", 3 caixas pulam da van pros braços da dona
- **PERSONAGEM:** a dona na porta da pizzaria · começo: `chamando` (acena pra van) · na palavra "concorrente":
  `segurando` as caixas, feliz. O Beto aparece pequeno na porta da fábrica, à esquerda, levando um `susto`
- **INTERAÇÃO:** a dona recebe as caixas da van do concorrente, bem do lado da fábrica do Beto
- **CÂMERA:** alvo `[pizzaria, van, dona]`, no centro, 2/3 da altura · `revelando` (começa na van freando, de perto,
  abre até a fachada) · `perto` → `aberto` · `frente` · altura `olho` · topo livre pra pergunta (`espacoCima: 0.38`)
- **EFEITOS VISUAIS:** a pergunta do gancho no topo (o motor põe) · etiqueta vermelha "Concorrente" na van (palavra
  "concorrente") · ✗ vermelho em cima da fábrica do Beto (palavra "concorrente")
- **SONS:** `buzina` + freada da van (palavra "abriu") · `whoosh` das caixas · `errado` (palavra "concorrente")

#### 2 · plano `beto` · ~4 s
> "Esse é o Beto. Ele fabrica embalagem pra delivery: caixa de pizza, de hambúrguer, de marmita."

- **NA TELA:** o Beto no centro, na frente da fábrica; as 3 embalagens aparecendo em fila na frente dele; a pilha de
  caixas na porta, atrás
- **MOSTRA:** `["personagem", "kit_caixas"]`
- **CENÁRIO:** a fachada "Beto Embalagens"; o ônibus passando no fundo
- **ENTRA AGORA:** a caixa de pizza na palavra "pizza", a de hambúrguer em "hambúrguer", o pote de marmita em
  "marmita", cada uma girando pro lugar
- **OBJETOS SE MEXENDO:** cada embalagem gira no ar e pousa na fila; a caixa de pizza abre e fecha a tampa uma vez
- **PERSONAGEM:** na frente da fábrica, de frente pra câmera · começo: `mostrando` (abre os braços pra fábrica) · na
  palavra "pizza": `apontar` pra cada caixa que entra
- **INTERAÇÃO:** ele apresenta cada embalagem com a mão, e a caixa de pizza abre quando ele aponta
- **CÂMERA:** alvo `[personagem, kit_caixas]`, no centro, metade da altura · `chegando` · `medio` · `perfil_direita` ·
  altura `olho` (na frase 1: revelando, perto→aberto, frente, olho)
- **EFEITOS VISUAIS:** etiqueta azul "Beto · fábrica de embalagens" (palavra "Beto")
- **SONS:** `ding` da etiqueta (o kit põe) · `madeira` (papelão) de cada caixa pousando · `tampa` da caixa de pizza

#### 3 · plano `ninguem` · ~3 s
> "Caixa boa, preço justo. Mas quase nenhuma pizzaria conhece a marca dele."

- **NA TELA:** a pilha de caixas no centro, com ✓; a placa da fábrica acima; os pedestres passando reto na calçada sem
  olhar
- **MOSTRA:** `["caixas", "fabrica"]`
- **CENÁRIO:** a fachada da fábrica; pedestres do cenário passando na frente
- **ENTRA AGORA:** ✓ verde em cima da pilha na palavra "boa"; a etiqueta "Preço justo" na palavra "justo"
- **OBJETOS SE MEXENDO:** a placa "Beto Embalagens" pisca e apaga na palavra "conhece" (`K.falhar 'apaga'`); os
  pedestres passam reto
- **PERSONAGEM:** do lado da pilha · começo: bate na pilha, orgulhoso (`vitoria`) · na palavra "nenhuma": `triste`,
  os ombros caem olhando os pedestres
- **INTERAÇÃO:** ele dá um tapinha na pilha de caixas; a placa dele apaga sobre a cabeça dele
- **CÂMERA:** alvo `[caixas, fabrica]` · `subindo` (da pilha até a placa) · `perto` · `esquerda` · altura `baixo` (na
  frase 2: chegando, médio, perfil direita, olho)
- **EFEITOS VISUAIS:** ✓ verde (palavra "boa") · etiqueta verde "Preço justo" (palavra "justo") · etiqueta vermelha
  "Ninguém conhece" (palavra "marca")
- **SONS:** `certo` (palavra "boa") · `desliga` da placa apagando (o `K.falhar` põe)

#### 4 · plano `espera` · ~3 s · jogo `falha`
> "Se você é o Beto, espera um cliente indicar o outro."

- **NA TELA:** o Beto sentado na cadeirinha na porta, olhando o celular mudo; uma teia crescendo do canto da porta; um
  relógio acima dele com os ponteiros girando
- **MOSTRA:** `["personagem", "cadeira", "celular"]`
- **CENÁRIO:** a calçada na frente da fábrica; carros passando rápido no fundo (o tempo correndo)
- **ENTRA AGORA:** a teia, surgindo no canto da porta na palavra "espera"; o relógio, crescendo na palavra "indicar"
- **OBJETOS SE MEXENDO:** os ponteiros dão 3 voltas rápidas; a teia vai do canto da porta até a cadeira; o celular
  fica com a tela apagada
- **PERSONAGEM:** sentado, de lado pra câmera · começo: `cansado` (boceja) · na palavra "indicar": sacode o celular
  perto da orelha (`duvida`)
- **INTERAÇÃO:** ele sacode o celular esperando tocar; a teia gruda na cadeira dele
- **CÂMERA:** alvo `[personagem, cadeira]` · `girando` (meia volta) · `medio` · `direita` · altura `alto` (na frase 3:
  subindo, perto, esquerda, baixo)
- **EFEITOS VISUAIS:** etiqueta laranja "Esperando indicação" (palavra "indicar") · congela em preto e branco (o jogo)
- **SONS:** `range` do tique-taque (palavra "espera") · o congela (o jogo)

#### 5 · plano `um_por_mes` · ~4 s · jogo `falha`
> "Mas pizzaiolo indica quando lembra: um pedido novo por mês, se der sorte."

- **NA TELA:** o calendário grande no centro, virando as folhas; o Beto à esquerda, olhando pra cima; o celular vibrando
  uma vez
- **MOSTRA:** `["calendario", "personagem"]`
- **CENÁRIO:** atrás, desfocado, a fábrica e a rua
- **ENTRA AGORA:** o calendário, caindo do alto na palavra "pizzaiolo"; o contador "1" na palavra "pedido"
- **OBJETOS SE MEXENDO:** as folhas viram rápido (uns 30 dias) até um único dia pintado de verde na palavra "mês"; o
  celular treme uma vez na palavra "lembra" (`K.falhar 'treme'` curto)
- **PERSONAGEM:** à esquerda do calendário · começo: `pensando` (contando nos dedos) · na palavra "sorte": cruza os
  dedos, `triste`
- **INTERAÇÃO:** o celular vibra na mão dele e ele comemora pequeno; o calendário segue virando e ele murcha
- **CÂMERA:** alvo `calendario`, no centro, 2/3 da altura · `subindo` · `perto` · `frente` · altura `baixo` → `olho`
  (na frase 4: girando, médio, direita, alto)
- **EFEITOS VISUAIS:** contador "1" com legenda "pedido por mês" (palavra "pedido") · etiqueta vermelha "Se der sorte"
  (palavra "sorte") · congela em preto e branco (o jogo)
- **SONS:** `whoosh` + `baque` do calendário (o kit põe) · `bip` do celular (palavra "lembra") · `zumbido` das folhas ·
  o congela (o jogo)

#### 6 · plano `posta` · ~4 s
> "Então você começa a postar foto de caixa no Instagram, todo dia."

- **NA TELA:** o Beto no centro-esquerda, fotografando a caixa de pizza com o celular; o celular gigante do lado, com as
  fotos das caixas subindo; o contador de dias no canto
- **MOSTRA:** `["personagem", "celular"]`
- **CENÁRIO:** a calçada na frente da fábrica; o semáforo trocando de cor várias vezes (os dias passando)
- **ENTRA AGORA:** o celular gigante, subindo do lado dele na palavra "postar"; o contador, na palavra "dia"
- **OBJETOS SE MEXENDO:** a cada clique, uma foto de caixa sobe na tela do celular gigante; o contador vai de "Dia 1"
  até "Dia 30"; o coraçãozinho embaixo de cada foto fica em "3 curtidas"
- **PERSONAGEM:** de frente pra câmera · começo: `ideia` · na palavra "foto": `segurando` o celular apontado pra caixa,
  agachando pra pegar o ângulo
- **INTERAÇÃO:** ele fotografa a caixa e cada foto vai pro celular gigante
- **CÂMERA:** alvo `[personagem, celular]` · `afastando` · `medio` · `perfil_esquerda` · altura `olho` (na frase 5:
  subindo, perto, frente, baixo→olho)
- **EFEITOS VISUAIS:** contador "Dia 30" (palavra "dia") · etiqueta azul "3 curtidas" (palavra "Instagram")
- **SONS:** `whoosh` do celular subindo (o kit põe) · `clique` de cada foto · `ding` do contador

#### 7 · plano `organico_rotulo` · ~2 s
> "Esse é o *conteúdo orgânico*."

- **NA TELA:** o vaso no chão, no centro, com uma mudinha minúscula; o rótulo do lado; o Beto ajoelhado regando
- **MOSTRA:** `["vaso"]`
- **CENÁRIO:** a calçada de pertinho; o chão de pedra do calçadão; a pilha de caixas desfocada atrás
- **ENTRA AGORA:** o vaso, brotando do chão na palavra "esse"; o rótulo na palavra "orgânico"
- **OBJETOS SE MEXENDO:** a muda sai da terra (0,1) e balança de leve; o vaso gira devagar
- **PERSONAGEM:** ajoelhado ao lado do vaso, só o tronco no quadro · começo: rega a muda com o `K.regador`
- **INTERAÇÃO:** ele rega a muda e ela se mexe um tiquinho
- **CÂMERA:** alvo `vaso`, no centro, metade da tela · `girando` · `detalhe` · `direita` · altura `alto` (na frase 6:
  afastando, médio, perfil esquerda, olho)
- **EFEITOS VISUAIS:** o rótulo amarelo "Conteúdo orgânico" (palavra "orgânico") · os pingos do regador (`K.pingos`)
- **SONS:** o som do rótulo (o kit põe) · `agua` do regador (palavra "esse")

#### 8 · plano `estoque` · ~5 s · jogo `falha`
> "Mas orgânico é igual plantar árvore: dá fruto, só que demora meses. E o estoque tá parado agora."

- **NA TELA:** o vaso à esquerda, a muda crescendo bem devagar; à direita, a pilha de caixas crescendo até passar da
  altura do Beto, pegando poeira e teia; o Beto no meio
- **MOSTRA:** `["vaso", "caixas", "personagem"]`
- **CENÁRIO:** a porta da fábrica; o céu escurece e clareia 3 vezes bem rápido atrás (os dias passando)
- **ENTRA AGORA:** um frutinho vermelho minúsculo na ponta da muda na palavra "fruto"; caixas novas caindo em cima da
  pilha na palavra "estoque"
- **OBJETOS SE MEXENDO:** a muda cresce de 0,1 até 0,5 entre "árvore" e "meses" (devagar, de propósito); na palavra
  "estoque", 6 caixas caem uma a uma em cima da pilha, que fica torta; na palavra "parado", sobe poeira dela (`K.poeira`)
  e a pilha balança (`K.falhar 'treme'`)
- **PERSONAGEM:** entre o vaso e a pilha · começo: `cansado`, batendo o pé, regador na mão · na palavra "estoque":
  `susto`, segura a pilha que balança (`empurrando`)
- **INTERAÇÃO:** ele rega a muda que mal cresce; depois segura a pilha de caixas que quase cai em cima dele
- **CÂMERA:** alvo `[vaso, caixas, personagem]` · `passando` (da muda até a pilha) · `medio` · `frente` · altura `olho`
  (na frase 7: girando, detalhe, direita, alto)
- **EFEITOS VISUAIS:** etiqueta laranja "Leva meses" (palavra "meses") · etiqueta vermelha "Estoque parado" na pilha
  (palavra "parado") · congela em preto e branco (o jogo)
- **SONS:** `brilho` do frutinho (palavra "fruto") · `madeira` de cada caixa caindo (palavra "estoque") · `range` da
  pilha balançando · o congela (o jogo)

#### 9 · plano `anuncio_rotulo` · ~2 s
> "Então você parte pro *anúncio pago*."

- **NA TELA:** a máquina do anúncio no centro, grande, cheia de botões e alavancas, com o telão em cima; o Beto
  chegando com um maço de notas; o rótulo no topo
- **MOSTRA:** `["maquina", "personagem"]`
- **CENÁRIO:** a máquina no meio do calçadão (`C.centro`); atrás, a rua e os prédios
- **ENTRA AGORA:** a máquina, caindo do alto na palavra "parte"; o rótulo na palavra "anúncio"
- **OBJETOS SE MEXENDO:** a máquina cai e quica; os botões acendem em sequência; o telão liga com chiado
- **PERSONAGEM:** anda até a frente da máquina · começo: `vitoria` (confiante) · na palavra "pago": `erguendo` o maço
  de notas
- **INTERAÇÃO:** ele chega na máquina e estica o dinheiro pra ela
- **CÂMERA:** alvo `[maquina, personagem]` · `mergulho` (do alto até o plano) · `medio` · `perfil_direita` · altura
  `cima` → `olho` (na frase 8: passando, médio, frente, olho)
- **EFEITOS VISUAIS:** o rótulo amarelo "Anúncio pago" (palavra "anúncio") · as luzinhas da máquina
- **SONS:** `whoosh` + `metal` da máquina caindo (palavra "parte") · `liga` da máquina · o som do rótulo

#### 10 · plano `publico_errado` · ~6 s · jogo `falha`
> "Mas aí vem público, pixel, criativo, leilão... e o anúncio aparece pra quem quer comer pizza, não pra quem vende."

- **NA TELA:** a máquina no centro, as 4 plaquinhas acendendo uma por uma; as notas voando da mão do Beto pra máquina;
  no telão, primeiro um sofá com uma pessoa comendo pizza (com ✓ de "anúncio entregue"), depois uma pizzaria com ✗
- **MOSTRA:** `["maquina", "notas", "personagem"]`
- **CENÁRIO:** o calçadão; um carro passando atrás na palavra "leilão"
- **ENTRA AGORA:** as plaquinhas "Público", "Pixel", "Criativo", "Leilão", uma em cada palavra; as notas saindo da mão
  dele na palavra "anúncio"; a imagem do sofá no telão na palavra "comer"; a da pizzaria com ✗ na palavra "vende"
- **OBJETOS SE MEXENDO:** cada plaquinha pisca quando é falada; as alavancas mexem sozinhas; as notas voam em fila,
  girando, da mão dele pra boca da máquina; na palavra "vende", a máquina treme e solta fumacinha (`K.falhar 'treme'` +
  `K.fumaca`)
- **PERSONAGEM:** à esquerda da máquina · começo: `duvida` (coça a cabeça a cada plaquinha) · na palavra "pizza":
  `bravo`, aponta pro telão com as mãos vazias
- **INTERAÇÃO:** ele aperta um botão aleatório na palavra "criativo"; a máquina puxa o dinheiro da mão dele e mostra o
  anúncio pra pessoa errada
- **CÂMERA:** alvo `[maquina, notas]` · `chegando` (termina no telão) · `perto` · `frente` · altura `olho` (na frase 9:
  mergulho, médio, perfil direita, cima→olho)
- **EFEITOS VISUAIS:** as 4 plaquinhas · etiqueta laranja "Quer comer pizza" no telão (palavra "comer") · ✗ vermelho na
  pizzaria do telão (palavra "vende") · congela em preto e branco (o jogo)
- **SONS:** `bip` em cada plaquinha (4) · `whoosh` das notas (palavra "anúncio") · `range` + `vapor` da máquina (palavra
  "vende") · o congela (o jogo)

#### 11 · plano `contrario` · ~4 s
> "Então você faz o contrário: em vez de esperar o cliente te achar, você vai atrás dele."

- **NA TELA:** a seta gigante no chão, na frente da fábrica, apontando pra porta; na palavra "contrário", ela gira e
  aponta pra rua e fica verde; o Beto levanta da cadeira e sai com uma caixa de amostra debaixo do braço
- **MOSTRA:** `["seta", "personagem"]`
- **CENÁRIO:** a fachada da fábrica e a calçada; os carros passando na rua
- **ENTRA AGORA:** a seta, deslizando no chão na palavra "faz"
- **OBJETOS SE MEXENDO:** a seta vermelha aponta pra porta e, na palavra "contrário", gira meia volta e fica verde; a
  cadeirinha tomba pra trás quando ele levanta (`K.falhar 'tomba'`)
- **PERSONAGEM:** começa sentado na cadeira · começo: `ideia` (levanta de um pulo na palavra "contrário") · na palavra
  "atrás": anda decidido pela calçada, com uma caixa de pizza debaixo do braço
- **INTERAÇÃO:** ele chuta a cadeira ao levantar, pega uma caixa da pilha e pisa na seta pra sair
- **CÂMERA:** alvo `[seta, personagem]` · `subindo` · `aberto` · `perfil_esquerda` · altura `alto` (na frase 10:
  chegando, perto, frente, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Esperar" na seta antes de girar (palavra "esperar") · etiqueta verde "Ir
  atrás" depois (palavra "atrás")
- **SONS:** `whoosh` da seta girando (palavra "contrário") · `baque` da cadeira tombando · `passo` dele andando

#### 12 · plano `ativa_rotulo` · ~2 s
> "Essa é a *prospecção ativa*."

- **NA TELA:** o Beto no centro, andando firme na direção da câmera pela calçada, com a caixa de amostra; o rótulo no
  topo
- **MOSTRA:** `["personagem"]`
- **CENÁRIO:** o calçadão comprido atrás dele, os prédios e o semáforo
- **ENTRA AGORA:** o rótulo, na palavra "prospecção"
- **OBJETOS SE MEXENDO:** ele anda uns 3 m na direção da câmera; poeirinha saindo dos pés (`K.poeira`)
- **PERSONAGEM:** andando de frente pra câmera · começo: `vitoria`, passo firme, erguendo a caixa
- **INTERAÇÃO:** ele mostra a caixa de amostra pra câmera, como quem chega pra vender
- **CÂMERA:** alvo `personagem`, inteiro, 2/3 da altura · `afastando` (a câmera recua enquanto ele avança) · `medio` ·
  `frente` · altura `baixo` (na frase 11: subindo, aberto, perfil esquerda, alto)
- **EFEITOS VISUAIS:** o rótulo amarelo "Prospecção ativa" (palavra "prospecção") · a poeirinha
- **SONS:** o som do rótulo (o kit põe) · `passo` a cada passo

#### 13 · plano `placa_na_rua` · ~5 s
> "É por isso que quem vende pra empresa sai na frente: o seu cliente tem nome, endereço e placa na rua."

- **NA TELA:** o outro lado da rua, com os prédios; as placas das lojas (pizzaria, lanchonete, padaria, açaí...)
  acendendo verde uma a uma; o Beto na beira da calçada, de costas pra câmera, olhando e apontando
- **MOSTRA:** `["placas", "personagem"]`
- **CENÁRIO:** a rua de verdade, com os carros passando no meio e os prédios coloridos do outro lado
- **ENTRA AGORA:** as placas, acendendo verde: a 1ª na palavra "nome", a 2ª em "endereço", as outras 4 juntas em
  "placa"
- **OBJETOS SE MEXENDO:** cada placa acende e pula um pouquinho; um carro passa entre ele e as placas na palavra
  "frente"
- **PERSONAGEM:** na beira da calçada, virado pra rua (de costas pra câmera, de propósito) · começo: `pensando` · na
  palavra "placa": `apontar` pra cada placa que acende
- **INTERAÇÃO:** ele aponta e cada placa acende quando o dedo dele passa
- **CÂMERA:** alvo `[placas, personagem]` · `revelando` (começa no ombro dele e abre até a rua inteira) · `perto` →
  `aberto` · `tras` (por cima do ombro dele) · altura `olho` (na frase 12: afastando, médio, frente, baixo)
- **EFEITOS VISUAIS:** etiqueta azul "Nome" e "Endereço" nas 2 primeiras placas (palavras "nome" e "endereço") ·
  etiqueta verde "Seu cliente tá na rua" (palavra "rua")
- **SONS:** `ding` de cada placa acendendo · `buzina` do carro passando (palavra "frente")

#### 14 · plano `rodar_cidade` · ~4 s · jogo `falha`
> "Mas ir atrás de quem? Rodar a cidade de pizzaria em pizzaria gasta o dia e o tanque."

- **NA TELA:** o carro azul do Beto rodando pela rua, com caixas no teto; o marcador de gasolina grande no canto,
  descendo; o céu passando de dia pra tarde e noite; as janelas e os postes acendendo
- **MOSTRA:** `["carro_beto"]`
- **CENÁRIO:** a rua inteira, de cima; a hora muda: `dia` → `tarde` → `noite` (`K.ceu('dia', 'tarde', x)` e depois
  `'tarde', 'noite'`); os postes acendem
- **ENTRA AGORA:** 3 pontos de interrogação laranja em cima das lojas, na palavra "quem"; o marcador de gasolina, na
  palavra "tanque"
- **OBJETOS SE MEXENDO:** o carro anda de um lado da rua até o outro (uns 30 m), para em 2 lojas e segue; o ponteiro da
  gasolina desce de cheio pra vazio; o sol desce
- **PERSONAGEM:** dentro do carro, a cabeça pra fora da janela · começo: `duvida` (olha pros lados na palavra "quem") ·
  na palavra "tanque": `cansado`, suando (`suar`), a cabeça tomba
- **INTERAÇÃO:** ele dirige de loja em loja; o carro engasga e solta fumacinha no fim
- **CÂMERA:** alvo `carro_beto` · `passando` (acompanha o carro) · `aberto` · `perfil_direita` · altura `cima` (na
  frase 13: revelando, perto→aberto, trás, olho)
- **EFEITOS VISUAIS:** os "?" laranja (palavra "quem") · o marcador de gasolina descendo (contador "⛽" com legenda
  "tanque") · etiqueta vermelha "O dia inteiro" (palavra "dia") · congela em preto e branco (o jogo)
- **SONS:** `turbina` (o motor do carro) · `buzina` curta · `desliga` do carro engasgando (palavra "tanque") · o
  congela (o jogo)

#### 15 · plano `lista` · ~7 s
> "Então você começa pela lista: no Mappoa, busca 'pizzarias em Goiânia', e vêm centenas, com o telefone e o WhatsApp
> que estiverem públicos."

- **NA TELA:** a mesa com o computador no centro-baixo; o Beto sentado digitando; acima do computador, o painel do
  Mappoa enchendo de pizzarias (nome, bairro, ícone de telefone, ícone de WhatsApp); o contador em cima
- **MOSTRA:** `["computador", "lista", "personagem"]`
- **CENÁRIO:** de dia de novo; a mesa em `C.direita`, no calçadão; os prédios atrás do painel
- **ENTRA AGORA:** a busca digitada na tela, letra por letra, na palavra "busca"; a lista, crescendo acima do
  computador na palavra "centenas"
- **OBJETOS SE MEXENDO:** as linhas da lista descem enchendo o painel, rápido (umas 12 visíveis, rolando); os ícones de
  telefone e WhatsApp acendem nas linhas na palavra "WhatsApp" (nem todas: umas só com telefone, de propósito)
- **PERSONAGEM:** sentado na frente do computador · começo: digitando (`segurando`, as mãos no teclado) · na palavra
  "centenas": `surpreso`, se joga pra trás na cadeira
- **INTERAÇÃO:** ele digita a busca e a lista sobe do computador dele
- **CÂMERA:** alvo `[computador, lista]` · `subindo` (da tela até o topo do painel) · `medio` · `frente` · altura `olho`
  → `alto` (na frase 14: passando, aberto, perfil direita, cima)
- **EFEITOS VISUAIS:** etiqueta azul "Mappoa" (palavra "Mappoa") · contador "300+" com legenda "pizzarias" (palavra
  "centenas") · etiqueta verde "Telefone e WhatsApp" (palavra "WhatsApp")
- **SONS:** `clique` das teclas (palavra "busca") · `brilho` da lista (o kit põe) · `bip` rápido de cada linha · `ding`
  do contador

#### 16 · plano `escala` · ~4 s
> "E não para na pizza: hamburgueria, marmitaria, açaí. Cada busca é uma lista nova."

- **NA TELA:** o painel do Mappoa no centro, grande; no topo dele, abas novas entrando uma por uma ("Hamburguerias",
  "Marmitarias", "Açaí"); a cada aba, a lista troca e enche de novo; as 3 embalagens do Beto flutuando do lado, cada
  uma acendendo com a sua aba
- **MOSTRA:** `["lista", "kit_caixas"]`
- **CENÁRIO:** os prédios do outro lado da rua atrás do painel, desfocados
- **ENTRA AGORA:** a aba "Hamburguerias" na palavra "hamburgueria", "Marmitarias" em "marmitaria", "Açaí" em "açaí";
  as 3 embalagens do `kit_caixas`, deslizando da direita na palavra "pizza"
- **OBJETOS SE MEXENDO:** a cada aba, a lista desliza pro lado e uma lista nova sobe enchendo; a embalagem que combina
  (hambúrguer, marmita, pote) gira e brilha junto
- **PERSONAGEM:** em pé do lado do painel · começo: `mostrando` (passa a mão pelas abas) · na palavra "nova":
  `vitoria`, soco no ar
- **INTERAÇÃO:** ele toca cada aba e a lista troca
- **CÂMERA:** alvo `[lista, kit_caixas]` · `girando` (um quarto de volta em volta do painel) · `perto` ·
  `perfil_esquerda` · altura `olho` (na frase 15: subindo, médio, frente, olho→alto)
- **EFEITOS VISUAIS:** as abas (uma por palavra) · contador "+3 listas" (palavra "nova") · etiqueta laranja "Cada busca,
  uma lista" (palavra "busca")
- **SONS:** `clique` de cada aba · `whoosh` da lista trocando · `ding` do contador

#### 17 · plano `chama` · ~4 s
> "Aí você chama uma por uma, falando do negócio de cada uma. Quem fecha é você."

- **NA TELA:** o celular grande no centro, com a mensagem sendo escrita: "Oi! Vi que a Forno Bom abriu essa semana.
  Posso te mandar uma amostra da caixa?"; o Beto do lado digitando; a lista desfocada atrás
- **MOSTRA:** `["celular", "personagem"]`
- **CENÁRIO:** a mesa e o painel do Mappoa desfocados atrás
- **ENTRA AGORA:** a linha da "Forno Bom", saindo da lista e voando pro celular na palavra "uma"; a mensagem, palavra por
  palavra, na palavra "negócio"
- **OBJETOS SE MEXENDO:** a linha voa da lista até o celular; a mensagem vai sendo escrita; o botão de enviar pisca e
  ele aperta na palavra "fecha"
- **PERSONAGEM:** em pé ao lado do celular gigante · começo: digitando, concentrado (`pensando`) · na palavra "fecha":
  aperta o enviar e dá um soco no ar (`vitoria`)
- **INTERAÇÃO:** ele puxa a linha da lista pro celular e aperta o enviar
- **CÂMERA:** alvo `celular`, no centro, 2/3 da tela · `chegando` · `detalhe` · `frente` · altura `olho` (na frase 16:
  girando, perto, perfil esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta azul "Fala do negócio dela" (palavra "negócio") · ✓ verde (palavra "fecha") · etiqueta
  laranja "Quem fecha é você" (palavra "você")
- **SONS:** `whoosh` da linha voando (palavra "uma") · `clique` das teclas · `ding` do enviar (palavra "fecha")

#### 18 · plano `antes_agora` · ~6 s
> "Antes, o Beto esperava a pizzaria lembrar dele. Agora, ele acha as pizzarias da cidade inteira."

- **NA TELA:** primeiro (no "Antes"), a cena do gancho em preto e branco: a van do concorrente entregando caixas na
  Forno Bom, o Beto na cadeira; depois (no "Agora"), a cor volta: o Beto chega na pizzaria com a pilha de caixas dele e
  entrega pra dona, que sorri; a câmera abre e, nos prédios da cidade, marcadores verdes aparecem em várias lojas
- **MOSTRA:** `["personagem", "dona", "pizzaria"]`
- **CENÁRIO:** as duas fachadas, como no gancho; no "Agora", o dia claro e, ao abrir, a cidade inteira com os prédios
- **ENTRA AGORA:** a van, de novo (no "Antes"); a cor da cena, voltando na palavra "Agora"; os marcadores verdes nos
  prédios, na palavra "cidade"
- **OBJETOS SE MEXENDO:** no "Antes", a van entrega e vai embora, tudo em preto e branco; na palavra "Agora", a cor
  volta: o Beto anda até a dona (uns 4 m) com as caixas e entrega; a faixa de inauguração balança; os marcadores sobem
  dos telhados um atrás do outro
- **PERSONAGEM:** no "Antes": sentado na cadeira, `cansado` · na palavra "acha": entrega as caixas pra dona e aperta a
  mão dela (`mostrando`)
- **INTERAÇÃO:** ele entrega a pilha de caixas e a dona recebe sorrindo
- **CÂMERA:** alvo `[personagem, dona, pizzaria]` · `afastando` (de perto da entrega até a cidade com os marcadores) ·
  `medio` → `aberto` · `frente` · altura `alto` (na frase 17: chegando, detalhe, frente, olho)
- **EFEITOS VISUAIS:** "ANTES" no topo, em preto e branco (palavra "Antes") · "AGORA" em verde (palavra "Agora") · ✓
  verde em cima da pizzaria quando ela recebe · os marcadores verdes · confete pequeno (`K.festa`)
- **SONS:** o congela do preto e branco (palavra "Antes") · `brilho` da cor voltando (palavra "Agora") · `madeira` das
  caixas · `festa` baixinho

#### 19 · plano `fim` · ~6 s · `segue`
> "E você, vende o quê, e pra quem? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Beto no centro, do lado da mesa com o computador; acima, um balão com "Vende o quê? Pra quem?" e
  depois a barra de endereço grande com "mappoa.com"; o cartão de seguir no topo no fim
- **MOSTRA:** `["personagem", "computador", "navegador"]`
- **CENÁRIO:** o calçadão de dia; o ônibus passando atrás
- **ENTRA AGORA:** o balão da pergunta na palavra "vende"; o navegador, crescendo acima do computador na palavra
  "mappoa"
- **OBJETOS SE MEXENDO:** o balão pula e some na palavra "computador"; o "mappoa.com" é digitado letra por letra na
  barra; o cartão de seguir entra no topo e o botão vira "Seguindo" (o motor faz)
- **PERSONAGEM:** de frente pra câmera, do lado da mesa · começo: `duvida`, apontando pra câmera, perguntando · na
  palavra "mappoa": digita no teclado e aponta pro endereço; no fim, aponta pro cartão de seguir e acena (o motor faz)
- **INTERAÇÃO:** ele pergunta pra câmera, digita o endereço e aponta pro cartão de seguir
- **CÂMERA:** alvo `[personagem, computador, navegador]` · `parado` · `aberto` · `frente` · altura `olho` · topo livre
  pro cartão (`espacoCima: 0.4`) (na frase 18: afastando, médio→aberto, frente, alto)
- **EFEITOS VISUAIS:** o balão da pergunta · a barra "mappoa.com", grande e legível · o cartão de seguir (o motor põe)
- **SONS:** `ding` do balão · `clique` das teclas (palavra "mappoa") · o som do cartão de seguir (o motor põe)

## Em 2 linhas por cena (pra pessoa)

1. Uma pizzaria nova abre e a van do concorrente para na porta, entregando as caixas. / A dona recebe feliz, e o Beto
   leva um susto na porta do lado; a câmera abre da van até a fachada.
2. O Beto na porta da fábrica, e as 3 embalagens aparecem: pizza, hambúrguer e marmita. / Ele apresenta cada uma com a
   mão; a câmera chega pelo lado.
3. A pilha de caixas ganha ✓ e "preço justo", mas a placa da fábrica apaga e o povo passa reto. / Ele dá um tapinha
   orgulhoso nas caixas e murcha; a câmera sobe da pilha até a placa.
4. Ele sentado na porta, com a teia crescendo e o relógio girando. / Ele boceja e sacode o celular mudo; a câmera gira
   em volta, do alto.
5. Um calendário gigante vira o mês inteiro, com um pedido só marcado. / Ele conta nos dedos e cruza os dedos; a
   câmera sobe pelo calendário.
6. Ele fotografa caixa todo dia e o celular gigante enche de fotos com "3 curtidas". / Ele se agacha pra pegar o
   ângulo; a câmera se afasta.
7. Um vaso com uma mudinha minúscula: "Conteúdo orgânico". / Ele rega; a câmera gira de pertinho.
8. A muda mal cresce enquanto a pilha de caixas cresce, pega poeira e quase cai. / Ele segura a pilha balançando; a
   câmera passa da muda até as caixas.
9. Uma máquina cheia de botões cai no meio da calçada: "Anúncio pago". / Ele chega confiante com o dinheiro; a câmera
   mergulha do alto.
10. A máquina engole o dinheiro e o telão mostra o anúncio chegando em alguém comendo pizza no sofá, não na pizzaria. /
    Ele aponta bravo pro telão; a câmera chega no telão.
11. A seta no chão gira de "esperar" pra "ir atrás" e a cadeira tomba. / Ele pega uma caixa de amostra e sai; a câmera
    sobe pela lateral.
12. Ele vem andando firme com a caixa: "Prospecção ativa". / Ele mostra a caixa pra câmera; a câmera recua na frente
    dele.
13. As placas das lojas do outro lado da rua acendem verde, uma por uma. / Ele aponta cada uma; a câmera abre por cima
    do ombro dele.
14. O carro dele roda de pizzaria em pizzaria, o dia vira noite e a gasolina acaba. / Ele chega suado e o carro
    engasga; a câmera acompanha do alto.
15. No computador, ele busca "pizzarias em Goiânia" e o painel do Mappoa enche, com telefone e WhatsApp. / Ele se joga
    pra trás de surpresa; a câmera sobe pelo painel.
16. Abas novas no painel (hamburguerias, marmitarias, açaí) e a lista enche de novo em cada uma. / Ele passa a mão
    nas abas e soca o ar; a câmera gira em volta.
17. A mensagem pra "Forno Bom" aparece no celular, oferecendo uma amostra, e ele envia. / Ele aperta o enviar e
    comemora; a câmera chega bem pertinho do celular.
18. O gancho de novo em preto e branco; aí a cor volta e o Beto entrega as caixas dele na pizzaria, e a cidade enche de
    marcadores verdes. / Ele aperta a mão da dona; a câmera se afasta até a cidade.
19. A pergunta "Vende o quê? Pra quem?" e depois "mappoa.com" no computador. / Ele pergunta, digita e aponta pro
    cartão de seguir; câmera aberta, de frente.
