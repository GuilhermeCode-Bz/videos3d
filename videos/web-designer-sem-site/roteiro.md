# Web designer atrás de empresas sem site: roteiro e ficha de cena

> Primeiro vídeo do canal Mappoa (~60 s). Mecanismo do canal: começa apresentando o personagem com a dor ("Esse é o
> Rafa..."). Fechamento "Antes... Agora..." e chamada com uma pergunta pros comentários.

## Roteiro

1. Como achar as empresas da sua cidade que ainda não têm site? *(gancho)*
2. Esse é o Rafa. Ele faz sites lindos, mas não tem nenhum cliente.
3. Se você é o Rafa, sai na rua entrando loja por loja: "Vocês têm site?"
4. Mas no fim do dia são só doze lojas, e ele volta morto de cansaço.
5. Então você tenta pelo computador: procura empresa por empresa e anota tudo numa planilha.
6. Mas a planilha cresce devagar, e metade delas já tem site.
7. Então você usa uma ferramenta que procura por você: "padarias em Campinas".
8. E a lista enche: centenas de empresas, mostrando quem tem site e quem não tem, já com telefone e WhatsApp.
9. Esse é o *Mappoa*.
10. Mas mandar a mesma mensagem pra todo mundo tem cara de spam.
11. Então ele prepara uma mensagem pra cada empresa, falando do negócio dela. Quem envia é você.
12. É por isso que a mensagem fala do pão de queijo da padaria, e não "prezado cliente".
13. Antes, o Rafa batia de porta em porta. Agora, ele acha as empresas sem site da cidade inteira.
14. Qual tipo de empresa você quer achar primeiro? Comenta aí. Use o Mappoa você também pelo link da Bio.

~190 palavras, uns 60 a 65 segundos. 4 ciclos "Mas → Então".

## Conferido com o produto (`canal/produto.md`)

- Buscar por segmento e cidade ("padarias em Campinas"): é o passo 1 do Mappoa
- A lista em escala, com site, telefone e WhatsApp: é o enriquecimento (nem toda empresa tem tudo: depende do que é
  público; o vídeo não diz que "toda" empresa vem com tudo)
- A mensagem personalizada: o Mappoa **gera**; quem envia é a pessoa (a frase 11 diz isso com todas as letras)
- Nada de preço, plano, número de vendas ou promessa de que a empresa vira cliente
- O número "doze lojas num dia" é uma conta de cabeça (uns 40 minutos por loja, andando, esperando o dono e
  conversando): é o personagem, não uma estatística

## Ficha de cena

**Cenário:** `cidade` (o padrão do canal), de dia, porque o vídeo é sobre as lojas de rua da cidade. Peças do cenário
que entram nas frases: o calçadão onde ficam as lojas (o palco), o banco da calçada (frase 4, ele senta morto de
cansaço), os prédios do outro lado da rua (frase 13, cheios de marcadores verdes), os carros e o ônibus passando e o
semáforo trocando de cor (no fundo, o tempo todo). Foto: `referencias/cenarios/cidade.jpg`.
**Hora:** dia. **Personagem:** o do canal (menino de camiseta azul), que no vídeo se chama Rafa; quase sempre em
`C.personagem`; a mesa com o computador fica em `C.direita` e a fileira de lojas em `C.esquerda`.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `lojas` | a fileira de 3 lojinhas no calçadão, cada uma com a placa | grupo de `K.modelo('kenney-cidade/building-small-a/b/c')` + `K.placa` + `K.nomear('lojas', ...)` | cada loja uns 4 de largura e 3,5 de altura (porta na altura certa perto dele) | `C.esquerda`, de frente pra rua | 1, 3, 4, 13 |
| `padaria` | a 1ª loja, com a placa "Padaria" e uma vitrine | a loja da ponta + `K.placa('Padaria')` + `K.nomear` | placa creme com letra marrom | a ponta da fileira, mais perto do centro | 1, 3, 12 |
| `computador` | a mesa com o computador do Rafa | `K.computador()` + `K.nomear` (tela desenhada: busca, planilha, tela do Mappoa) | mesa de 1,15 de largura; tela 0,7 | `C.direita` | 2, 5, 6, 7, 8 |
| `planilha` | a planilha "flutuando" atrás do computador, com as linhas entrando uma por uma | `K.placa` (textura desenhada) + `K.nomear` | 1,6 × 1,2, branca com linhas cinza | em pé, atrás e acima do computador | 5, 6 (some na 7) |
| `lista` | o painel grande do Mappoa, com os cartões das empresas enchendo (nome, ícone de site ✓/✗, telefone e WhatsApp) | `K.telaCanvas` num grupo + `K.nomear` | 2,2 × 2,8, fundo branco com a barra na cor do canal `#2e9d5b` | em pé, acima do computador | entra na 8; fica até a 9 e volta na 13 |
| `celular` | o celular do Rafa com as mensagens | `K.celular()` + `K.nomear`, com `escala 3` pra ler na tela | tela 0,45 × 0,87 (já na escala) | na mão dele, ou flutuando do lado | 10, 11, 12 |
| `paodequeijo` | um pão de queijo gigante (o detalhe da mensagem) | `K.pecas`: esfera achatada | raio 0,35, amarelo-dourado `#e8b54a` | flutuando na frente da padaria | 12 |
| `pins` | os marcadores verdes em cima dos prédios do outro lado da rua (as empresas sem site achadas) | `K.pecas`: cone de ponta pra baixo + esfera, uns 12, num grupo + `K.nomear` | 0,5 de altura cada, verde do canal `#2e9d5b` | em cima dos prédios do cenário, do outro lado da rua | 13 |
| `personagem` | o Rafa | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | `C.personagem` | todas |
| bits, suor, contador, setas | efeitos | `K.bits`, `menino.suar`, `K.contador`, `K.seta` | | em volta das peças | 4, 8, 13 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| empresas, cidade | 1, 8, 13 | as `lojas`; os cartões da `lista`; os `pins` nos prédios |
| site | 1, 6, 8 | o ✓/✗ de "tem site" na planilha e nos cartões da lista |
| Rafa | 2 em diante | o `personagem` |
| sites lindos | 2 | a tela do `computador` mostrando um site bonito que ele fez |
| cliente | 2 | o contador "0 clientes" em cima dele |
| rua, loja | 3, 4 | o calçadão e as `lojas` |
| doze lojas | 4 | o `K.contador` subindo até 12 |
| cansaço | 4 | ele senta no banco, suando (`menino.suar`) |
| computador | 5 a 8 | o `computador` |
| planilha | 5, 6 | a `planilha` |
| ferramenta | 7 | a tela do `computador` com a busca |
| padarias em Campinas | 7 | a busca digitada letra por letra na tela |
| lista, centenas | 8 | a `lista` enchendo + contador subindo até "300+" |
| telefone, WhatsApp | 8 | os ícones de telefone e WhatsApp em cada cartão da lista |
| Mappoa | 9 | o rótulo "Mappoa" e o logo na barra da `lista` |
| mensagem, spam | 10, 11 | o `celular` com os balões |
| pão de queijo, padaria | 12 | o `paodequeijo` e a `padaria` |
| porta | 13 | a porta das `lojas` |
| link da Bio | 14 | o cartão de seguir com o @ |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida, ninguém programa): o calçadão da cidade de dia; do outro lado da rua,
os prédios coloridos e os altos atrás; carros e o ônibus passando na rua; o semáforo trocando de cor; pedestres
andando.

#### 1 · plano `gancho` · ~4 s
> "Como achar as empresas da sua cidade que ainda não têm site?"

- **NA TELA:** a fileira de lojas no centro, a padaria na frente; o Rafa embaixo, à direita delas, com uma lupa de
  dedo (a mão em cima dos olhos, procurando); a pergunta no topo
- **MOSTRA:** `["lojas", "personagem"]`
- **CENÁRIO:** o calçadão; atrás das lojas, os prédios altos; a rua com os carros passando à direita
- **ENTRA AGORA:** nada (o gancho mostra o lugar pronto)
- **OBJETOS SE MEXENDO:** os carros e o ônibus passando, o semáforo trocando (o cenário cuida); pontos de interrogação
  laranja pulam em cima de cada loja, um por um, na palavra "site"
- **PERSONAGEM:** em `C.personagem`, à direita das lojas, meio de frente pra câmera · começo: `pensando` · na palavra
  "site": `duvida`, olhando de uma loja pra outra
- **INTERAÇÃO:** ele olha as lojas, uma por uma, tentando adivinhar qual não tem site
- **CÂMERA:** alvo `[lojas, personagem]`, as lojas no centro, inteiras, uns 2/3 da altura · `mergulho` (desce do alto
  até a altura das lojas) · `medio` → `aberto` · um pouco pela direita (lado 20) · topo livre pra pergunta
  (`espacoCima: 0.35`)
- **EFEITOS VISUAIS:** a pergunta da capa no topo (o motor põe) · os "?" laranja em cima das lojas (palavra "site")
- **SONS:** whoosh da câmera descendo · um `bip` pra cada "?" (palavra "site")

#### 2 · plano `rafa` · ~4 s
> "Esse é o Rafa. Ele faz sites lindos, mas não tem nenhum cliente."

- **NA TELA:** o Rafa no centro, grande, do lado da mesa com o computador; na tela, um site bonito (o que ele fez);
  em cima dele, o contador "0 clientes"
- **MOSTRA:** `["personagem", "computador"]`
- **CENÁRIO:** o calçadão; atrás, a rua com um carro passando e os prédios do outro lado
- **ENTRA AGORA:** o contador "0 clientes", surgindo em cima dele na palavra "nenhum"
- **OBJETOS SE MEXENDO:** a tela do computador passa por 3 sites bonitos (troca a cada ~0,7 s, a partir de "sites")
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera, do lado do computador · começo: `mostrando` a tela,
  orgulhoso · na palavra "nenhum": `triste`, os ombros caem
- **INTERAÇÃO:** ele mostra os sites que fez na tela do computador, todo orgulhoso, e murcha quando aparece o zero
- **CÂMERA:** alvo `[personagem, computador]`, ele no centro, inteiro, ocupando metade da altura · `chegando` · `perto`
  · `frente` · altura `olho` (na frase 1: mergulho, médio, de cima)
- **EFEITOS VISUAIS:** etiqueta azul "Rafa · web designer" do lado dele (palavra "Rafa") · contador vermelho "0
  clientes" em cima dele (palavra "nenhum")
- **SONS:** `ding` na etiqueta (o kit põe) · `errado` no zero (palavra "nenhum")

#### 3 · plano `rua` · ~4 s
> "Se você é o Rafa, sai na rua entrando loja por loja: 'Vocês têm site?'"

- **NA TELA:** a fileira de lojas, a padaria no centro; o Rafa andando pelo calçadão na frente delas, da direita pra
  esquerda; um balão de fala "Vocês têm site?" saindo dele
- **MOSTRA:** `["padaria", "personagem"]`
- **CENÁRIO:** o calçadão com as lojas; atrás do Rafa, a rua com o ônibus passando
- **ENTRA AGORA:** o balão "Vocês têm site?" (placa branca), surgindo em cima dele na palavra "Vocês"
- **OBJETOS SE MEXENDO:** o Rafa anda de uma porta até a outra; a porta da padaria acende (brilho) quando ele chega
  nela
- **PERSONAGEM:** anda de `C.entrada` até a porta da padaria na 1ª metade, olhando as placas · na palavra "Vocês":
  `chamando` (a mão do lado da boca), virado pra porta
- **INTERAÇÃO:** ele chega na porta da padaria e pergunta pra dentro da loja
- **CÂMERA:** alvo `[padaria, personagem]`, a padaria no centro · `passando` (desliza de lado, acompanhando ele) ·
  `medio` · `direita` · altura `olho` (na frase 2: chegando, perto, de frente)
- **EFEITOS VISUAIS:** o balão de fala "Vocês têm site?" (palavra "Vocês")
- **SONS:** `passo` enquanto ele anda · `clique` do balão aparecendo (palavra "Vocês") · `buzina` de um carro lá atrás,
  baixinho

#### 4 · plano `cansaco` · ~4 s · jogo `falha`
> "Mas no fim do dia são só doze lojas, e ele volta morto de cansaço."

- **NA TELA:** o banco da calçada no centro; o Rafa largado no banco, suando; o contador subindo até 12; as lojas
  atrás, mais ao fundo; o céu ficando alaranjado (fim do dia)
- **MOSTRA:** `["personagem"]` (o banco é um lugar do cenário, `C.lugares.banco`, não um objeto com nome)
- **CENÁRIO:** o calçadão no fim da tarde (o céu muda pra `tarde` nesta frase); o semáforo trocando atrás
- **ENTRA AGORA:** o contador "lojas visitadas", surgindo em cima dele (palavra "doze"), subindo de 1 até 12 rapidinho
- **OBJETOS SE MEXENDO:** o contador conta de 1 a 12 em 1 s; as gotas de suor pulam da cabeça dele a partir de
  "cansaço"; o céu escurece um pouco pro laranja
- **PERSONAGEM:** chega arrastando os pés até o banco na 1ª metade · na palavra "cansaço": `cansado`, larga o corpo e
  sua (`menino.suar`)
- **INTERAÇÃO:** ele desaba no banco, e o banco é o único que "recebe" ele no fim do dia
- **CÂMERA:** alvo `[banco, personagem]`, o banco no centro · `descendo` · `medio` · `esquerda` · do `alto` (na frase
  3: passando, médio, direita, altura olho)
- **EFEITOS VISUAIS:** contador azul "12 lojas" (palavra "doze") · etiqueta vermelha "1 dia inteiro" e ✗ em cima dela
  (palavra "cansaço") · no fim, congela em preto e branco (o `jogo` faz)
- **SONS:** `bip` a cada número do contador · `baque` quando ele cai no banco (palavra "cansaço") · o congela (o `jogo`
  põe)

#### 5 · plano `planilha` · ~5 s · jogo `corrige`
> "Então você tenta pelo computador: procura empresa por empresa e anota tudo numa planilha."

- **NA TELA:** a mesa com o computador no centro; o Rafa sentado na frente, digitando; atrás e acima do computador, a
  planilha flutuando, com as primeiras linhas entrando
- **MOSTRA:** `["computador", "planilha", "personagem"]`
- **CENÁRIO:** de volta ao dia; atrás da mesa, o calçadão e a rua com carros passando
- **ENTRA AGORA:** a `planilha`, crescendo atrás do computador (`cresce`) na palavra "planilha"
- **OBJETOS SE MEXENDO:** a cena volta a ter cor (o `jogo` corrige); na tela do computador, uma página de busca
  passando, uma empresa de cada vez; na planilha, 3 linhas entram uma por uma (nome da empresa, telefone, "tem site?")
- **PERSONAGEM:** em pé na frente da mesa, de lado pra câmera, de frente pro computador · começo: `segurando` (as mãos
  no teclado, digitando) · na palavra "planilha": `apontar` pra planilha
- **INTERAÇÃO:** ele digita no teclado e as linhas aparecem na planilha conforme ele anota
- **CÂMERA:** alvo `[computador, planilha, personagem]`, o computador no centro · `subindo` · `medio` ·
  `perfil_direita` · altura `olho` (na frase 4: descendo, do alto, esquerda)
- **EFEITOS VISUAIS:** etiqueta azul "Empresa por empresa" em cima do computador (palavra "empresa")
- **SONS:** `clique` do teclado, rapidinho, a frase toda · `brilho` da planilha crescendo (palavra "planilha"; o
  `K.entraNo` põe)

#### 6 · plano `devagar` · ~4 s · jogo `falha`
> "Mas a planilha cresce devagar, e metade delas já tem site."

- **NA TELA:** a planilha grande no centro, de perto, com 6 linhas; metade das linhas ganha um ✗ vermelho "já tem
  site"; o Rafa na beira do quadro, embaixo à direita
- **MOSTRA:** `["planilha"]`
- **CENÁRIO:** atrás da planilha, os prédios do outro lado da rua (desfocados pela distância)
- **ENTRA AGORA:** os ✗ vermelhos em 3 das 6 linhas, um por um, na palavra "metade"
- **OBJETOS SE MEXENDO:** uma linha nova entra bem devagar, letra por letra, no começo (a planilha "cresce devagar"); na
  palavra "metade", 3 linhas ficam cinza e ganham o ✗, e a planilha treme (`K.falhar(planilha, 'treme')`)
- **PERSONAGEM:** embaixo, à direita da planilha · começo: `cansado` (bocejando) · na palavra "metade": `bravo`
- **INTERAÇÃO:** a planilha frustra o Rafa: o trabalho dele vai sendo riscado na frente dele
- **CÂMERA:** alvo a `planilha`, no centro, ocupando quase a tela toda · `chegando` · `detalhe` · `frente` · altura
  `olho` (na frase 5: subindo, médio, de perfil)
- **EFEITOS VISUAIS:** os ✗ vermelhos nas linhas · etiqueta vermelha "Já tem site" (palavra "metade") · no fim,
  congela em preto e branco (o `jogo` faz)
- **SONS:** `clique` lento das letras no começo · `errado` a cada ✗ (palavra "metade") · `range` da planilha tremendo
  · o congela (o `jogo` põe)

#### 7 · plano `busca` · ~4 s · jogo `conserta` (⏪)
> "Então você usa uma ferramenta que procura por você: 'padarias em Campinas'."

- **NA TELA:** o computador no centro, de perto, a tela grande; na tela, a busca desenhada na cor do canal sendo
  digitada: "padarias em Campinas"; o Rafa do lado, digitando; a planilha some
- **MOSTRA:** `["computador", "personagem"]`
- **CENÁRIO:** atrás, a rua com o semáforo ficando verde (combina com a solução)
- **ENTRA AGORA:** a tela nova (a busca), na palavra "ferramenta"; o texto "padarias em Campinas", letra por letra, na
  palavra "padarias"
- **OBJETOS SE MEXENDO:** a cena volta no tempo (⏪) até antes da planilha, e a planilha encolhe e some; as letras da
  busca entram uma por uma; o botão "Buscar" pisca verde no fim
- **PERSONAGEM:** na frente da mesa, à esquerda do computador · depois do ⏪: `surpreso` · na palavra "padarias":
  `ideia` (pulinho, dedo pra cima) e volta a digitar (`segurando`)
- **INTERAÇÃO:** ele digita a busca no teclado e aperta o botão
- **CÂMERA:** alvo `computador` (a tela), no centro, ocupando metade da tela · `girando` · `perto` · `esquerda` · do
  `alto` (com `B.q`, o tempo depois do ⏪) (na frase 6: chegando, detalhe, de frente)
- **EFEITOS VISUAIS:** o ⏪ do jogo · a busca digitada na tela · etiqueta verde "Procura por você" (palavra
  "ferramenta")
- **SONS:** rebobina do ⏪ (o `jogo` põe) · `clique` de cada letra · `bip` no botão Buscar (fim da frase)

#### 8 · plano `lista` · ~6 s · jogo `corrige`
> "E a lista enche: centenas de empresas, mostrando quem tem site e quem não tem, já com telefone e WhatsApp."

- **NA TELA:** o painel grande da lista em cima do computador, no centro; os cartões das empresas caindo no painel, de
  cima pra baixo, cada um com o nome, o ícone de site (✓ verde ou ✗ cinza), o telefone e o ícone do WhatsApp; o
  contador subindo; o Rafa embaixo, olhando pra cima de boca aberta
- **MOSTRA:** `["lista", "personagem"]`
- **CENÁRIO:** o calçadão; atrás do painel, os prédios do outro lado da rua e o ônibus passando
- **ENTRA AGORA:** a `lista`, subindo de dentro da tela do computador (`sobe`) na palavra "lista"; os cartões caindo
  um atrás do outro a partir de "centenas"; os ícones de telefone e WhatsApp acendendo em cada cartão na palavra
  "WhatsApp"
- **OBJETOS SE MEXENDO:** os bits verdes sobem do computador pra lista o tempo todo (os dados chegando); a lista rola
  pra baixo, cada vez mais rápido; o contador vai de 0 a "300+"; na palavra "não tem", os cartões sem site ganham uma
  faixa verde "sem site"
- **PERSONAGEM:** em `C.personagem`, embaixo, à esquerda da lista, olhando pra cima · começo: `surpreso` · na palavra
  "WhatsApp": `vitoria` (braços pra cima)
- **INTERAÇÃO:** a lista cresce em cima da cabeça dele e o deixa de boca aberta; ele comemora quando aparecem os
  contatos
- **CÂMERA:** alvo `[lista, personagem]`, a lista no centro e inteira, uns 2/3 da altura · `revelando` (do computador
  até a lista inteira) · `medio` · `frente` · de `baixo` (na frase 7: girando, perto, de cima)
- **EFEITOS VISUAIS:** os bits verdes subindo (`K.bits`) · contador verde "300+ empresas" (palavra "centenas") ·
  etiqueta verde "Sem site" do lado da lista (palavra "não tem")
- **SONS:** `whoosh` da lista subindo (o `K.entraNo` põe) · `bip` rapidinho a cada cartão · `certo` nos ícones (palavra
  "WhatsApp")

#### 9 · plano `mappoa_rotulo` · ~1 s
> "Esse é o *Mappoa*."

- **NA TELA:** a lista do Mappoa brilhando, ocupando a tela de cima a baixo, com a barra verde e o nome no topo; o
  rótulo "Mappoa"
- **MOSTRA:** `["lista"]`
- **CENÁRIO:** os prédios do outro lado da rua, lá atrás (a câmera está perto)
- **ENTRA AGORA:** nada
- **OBJETOS SE MEXENDO:** a lista brilha amarelo (`K.brilhar`) enquanto a câmera gira em volta dela
- **PERSONAGEM:** em `C.personagem`, `mostrando` a lista (no close ele sai do quadro, e tudo bem: a frase é curta)
- **INTERAÇÃO:** nenhuma na tela (ele está fora do quadro)
- **CÂMERA:** alvo a `lista`, no centro, ocupando a tela de cima a baixo · `girando` pro outro lado (`sentido: -1`) ·
  `perto` · do `alto` (ângulo 30) · topo livre pro rótulo (na frase 8: revelando, médio, de baixo)
- **EFEITOS VISUAIS:** o brilho amarelo na lista · rótulo amarelo "Mappoa" no topo
- **SONS:** o do rótulo (o kit põe)

#### 10 · plano `spam` · ~4 s · jogo `falha`
> "Mas mandar a mesma mensagem pra todo mundo tem cara de spam."

- **NA TELA:** o celular grande no centro, flutuando na frente do Rafa; na tela dele, a mesma mensagem ("Olá, prezado
  cliente! Faço sites...") copiada 5 vezes, uma embaixo da outra; o Rafa atrás, segurando o celular
- **MOSTRA:** `["celular", "personagem"]`
- **CENÁRIO:** o calçadão; atrás, a rua com um carro passando
- **ENTRA AGORA:** o `celular`, subindo do bolso dele até a frente do peito (`sobe`) no começo; os balões iguais,
  um atrás do outro, a partir de "mesma"
- **OBJETOS SE MEXENDO:** os 5 balões iguais entram rápido, um por segundo; na palavra "spam", o celular treme e a
  tela pisca vermelho (`K.falhar(celular, 'pisca')`)
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera, segurando o celular · começo: `segurando`, digitando com o
  dedo · na palavra "spam": `susto`
- **INTERAÇÃO:** ele aperta "enviar" várias vezes e o celular reclama na mão dele
- **CÂMERA:** alvo `celular`, no centro, ocupando metade da tela, o rosto dele embaixo · `chegando` · `perto` ·
  `direita` · altura `olho` (na frase 9: girando, perto, do alto, na lista)
- **EFEITOS VISUAIS:** os balões iguais na tela do celular · etiqueta vermelha "Cara de spam" e ✗ em cima dela
  (palavra "spam") · no fim, congela em preto e branco (o `jogo` faz)
- **SONS:** `clique` a cada balão · `zap` do celular piscando (palavra "spam"; o `K.falhar` põe) · o congela (o `jogo`
  põe)

#### 11 · plano `mensagem` · ~5 s · jogo `corrige`
> "Então ele prepara uma mensagem pra cada empresa, falando do negócio dela. Quem envia é você."

- **NA TELA:** o celular no centro, com uma mensagem nova, diferente, sendo escrita sozinha ("Oi, Padaria Bom Dia! Vi
  que vocês são famosos pelo pão de queijo..."); do lado do celular, 3 cartõezinhos das empresas (padaria, pet shop,
  barbearia), cada um com a sua mensagem; o Rafa segurando o celular, com o dedo em cima do botão de enviar
- **MOSTRA:** `["celular", "personagem"]`
- **CENÁRIO:** o calçadão de volta à cor; atrás, as lojas da frase 3
- **ENTRA AGORA:** a mensagem nova, escrita letra por letra na tela, na palavra "mensagem"; os 3 cartõezinhos,
  surgindo um por um do lado do celular, na palavra "cada"
- **OBJETOS SE MEXENDO:** a cena volta a ter cor (o `jogo` corrige); as letras da mensagem entram; os cartõezinhos
  giram e param de frente; na palavra "você", o botão "Enviar" fica verde
- **PERSONAGEM:** em `C.personagem`, segurando o celular · começo: `pensando` (lendo a mensagem) · na palavra "você":
  aponta pra câmera (`apontar`), como quem diz "você decide"
- **INTERAÇÃO:** o Mappoa escreve a mensagem e o Rafa segura o dedo em cima do botão: quem aperta é ele
- **CÂMERA:** alvo `[celular, personagem]`, o celular no centro · `subindo` · `medio` · `esquerda` · altura `olho` (na
  frase 10: chegando, perto, direita)
- **EFEITOS VISUAIS:** etiqueta verde "Uma pra cada empresa" (palavra "cada") · etiqueta azul "Quem envia é você"
  (palavra "envia"), com ✓ verde do lado
- **SONS:** `clique` das letras · `brilho` dos cartõezinhos (palavra "cada") · `certo` no botão (palavra "você")

#### 12 · plano `paodequeijo` · ~4 s
> "É por isso que a mensagem fala do pão de queijo da padaria, e não 'prezado cliente'."

- **NA TELA:** a padaria no centro, com a placa; na frente da vitrine, o pão de queijo gigante flutuando e girando; o
  balão da mensagem com "pão de queijo" em destaque; o Rafa na calçada, na frente da padaria, mostrando o celular pra
  porta
- **MOSTRA:** `["padaria", "paodequeijo"]`
- **CENÁRIO:** a vida real é o assunto: a padaria no calçadão, com os pedestres passando e o ônibus atrás
- **ENTRA AGORA:** o `paodequeijo`, crescendo na frente da vitrine (`cresce`) na palavra "pão"; uma placa riscada
  "Prezado cliente" caindo no chão na palavra "prezado"
- **OBJETOS SE MEXENDO:** o pão de queijo gira devagar e solta brilhinhos; a placa "Prezado cliente" cai, quica e fica
  cinza no chão
- **PERSONAGEM:** na frente da padaria, à direita · começo: `mostrando` o celular pra padaria · na palavra "prezado":
  `duvida` com uma careta, chutando a plaquinha pra longe
- **INTERAÇÃO:** ele mostra a mensagem pra padaria, e chuta pra longe o "prezado cliente"
- **CÂMERA:** alvo `[padaria, paodequeijo]`, a padaria no centro · `revelando` (do pão de queijo até a padaria
  inteira) · `medio` · `direita` · de `baixo` (na frase 11: subindo, médio, esquerda, altura olho)
- **EFEITOS VISUAIS:** etiqueta laranja "Fala do negócio dela" (palavra "pão") · ✗ vermelho na placa "Prezado
  cliente" (palavra "prezado")
- **SONS:** `brilho` do pão de queijo crescendo (o `K.entrar` põe) · `baque` da plaquinha caindo (palavra "prezado") ·
  `whoosh` do chute

#### 13 · plano `antes_agora` · ~6 s
> "Antes, o Rafa batia de porta em porta. Agora, ele acha as empresas sem site da cidade inteira."

- **NA TELA:** 1ª metade: o Rafa batendo na porta das lojas, uma por uma (em preto e branco, como lembrança); 2ª
  metade: a cidade inteira, os prédios do outro lado da rua com os marcadores verdes brotando em cima, um atrás do
  outro, e o Rafa no calçadão com a lista do Mappoa atrás dele
- **MOSTRA:** `["personagem", "pins"]`
- **CENÁRIO:** a cidade toda: as lojas, a rua com os carros, os prédios coloridos e os altos atrás
- **ENTRA AGORA:** na palavra "Agora": a cor volta e os `pins` verdes surgem em cima dos prédios (`surge`), um atrás do
  outro, uns 12 em 1,5 s; a `lista` volta atrás dele
- **OBJETOS SE MEXENDO:** na 1ª metade, ele anda de porta em porta (preto e branco); na 2ª metade, os pins quicam ao
  aparecer e ficam pulsando; a câmera abre até a cidade inteira
- **PERSONAGEM:** 1ª metade: anda de uma porta até a outra e bate (`empurrando`), cansado · na palavra "Agora": vira
  pra câmera e `comemorar`, apontando pros prédios
- **INTERAÇÃO:** na 1ª metade, ele bate nas portas; na 2ª, ele aponta e os pins aparecem onde ele aponta
- **CÂMERA:** alvo `[personagem, pins]` · `afastando` (de perto dele até a cidade inteira) · `perto` → `aberto` ·
  `esquerda` · do `alto` (na frase 12: revelando, médio, de baixo, direita)
- **EFEITOS VISUAIS:** etiqueta cinza "Antes" na 1ª metade, com o preto e branco · etiqueta verde "Agora" (palavra
  "Agora") · os pins verdes · contador "cidade inteira" fica de fora (no máximo 2 textos)
- **SONS:** `madeira` da batida na porta, 2 vezes · `brilho` de cada pin aparecendo (palavra "Agora") · `festa` no fim

#### 14 · plano `segue` · ~5 s
> "Qual tipo de empresa você quer achar primeiro? Comenta aí. Use o Mappoa você também pelo link da Bio."

- **NA TELA:** o cartão de seguir no topo; a pergunta "Qual empresa você quer achar?" em destaque; as lojas e a lista
  no meio; o Rafa inteiro embaixo, apontando pro cartão
- **MOSTRA:** `["personagem", "lojas"]`
- **CENÁRIO:** o calçadão com as lojas; atrás, a rua e os prédios com os pins verdes
- **ENTRA AGORA:** a chamada no topo (`K.cta`), na palavra "Qual"; o cartão de seguir, na palavra "Use"
- **OBJETOS SE MEXENDO:** o botão "+ Seguir" é apertado e vira "Seguindo"; os pins continuam pulsando lá atrás
- **PERSONAGEM:** em `C.personagem` · começo: `chamando`, com a mão no ouvido ("comenta aí") · na palavra "Bio":
  aponta pro cartão (`apontar` pro alto)
- **INTERAÇÃO:** ele chama quem assiste pra comentar e aponta pro botão de seguir
- **CÂMERA:** alvo `[lojas, personagem]` · `parado` (respirando) · `aberto` (com o topo livre, o médio corta ele) ·
  `frente` · `espacoCima: 0.45` (na frase 13: afastando, do alto, esquerda)
- **EFEITOS VISUAIS:** a chamada no topo "Qual empresa você quer achar? <em>Comenta aí</em>" · o cartão de seguir, com o
  @mappoa_leads e o botão
- **SONS:** `ding` da chamada (palavra "Qual") · `brilho` do cartão (palavra "Use") · `clique` do botão

**Cauda (`cartao`, 1,6 s):** o cartão fica e o Rafa acena (`chamando`), com a mesma câmera; toca o som `final`.

## Capa

O Rafa no centro, com cara de desespero (`susto`), as duas mãos na cabeça, do lado do computador com a tela "0
clientes" em vermelho; atrás, a fileira de lojas com os "?" em cima; no canto, a lista verde do Mappoa saindo da tela,
como a solução. Texto no topo: **"EMPRESAS SEM SITE?"**, com "SEM SITE" na cor do canal.

## Em palavras simples (o que vai pra pessoa aprovar)

1. A câmera desce do alto até uma fileira de lojinhas na rua, e aparecem "?" em cima de cada uma. / O Rafa olha de
   loja em loja, em dúvida; a pergunta fica no topo.
2. O Rafa mostra os sites bonitos que fez no computador, e aparece "0 clientes" em cima dele. / Ele murcha; a câmera
   chega pertinho, de frente.
3. Ele anda pela calçada e pergunta na porta da padaria: "Vocês têm site?". / A câmera passa de lado, acompanhando.
4. O céu fica laranja, o contador vai até 12 lojas e ele desaba no banco, suando. / A câmera desce do alto; congela
   em preto e branco.
5. Ele digita no computador e uma planilha aparece flutuando atrás, com as linhas entrando. / A câmera sobe, de perfil.
6. A planilha cresce devagar, e metade das linhas ganha um ✗ "Já tem site". / Ele fica bravo; a câmera chega bem
   pertinho da planilha.
7. ⏪ Volta no tempo, a planilha some, e na tela ele digita "padarias em Campinas". / Ele tem a ideia; a câmera gira
   em volta do computador, do alto.
8. Uma lista gigante sobe do computador e enche de empresas, com "sem site", telefone e WhatsApp. / Ele comemora de
   braços pra cima; a câmera revela a lista de baixo pra cima.
9. A lista brilha amarela: "Mappoa". / A câmera gira em volta dela.
10. No celular, a mesma mensagem copiada 5 vezes, e o celular pisca vermelho: "Cara de spam". / Ele leva um susto; a
    câmera chega perto do celular.
11. Uma mensagem nova e diferente se escreve sozinha, e surgem os cartõezinhos das empresas. / Ele aponta pra quem
    assiste ("quem envia é você"); a câmera sobe.
12. Um pão de queijo gigante aparece girando na frente da padaria, e o "Prezado cliente" cai no chão. / Ele chuta a
    plaquinha pra longe; a câmera revela a padaria de baixo.
13. Em preto e branco, ele bate de porta em porta; no "Agora", a cor volta e os prédios da cidade se enchem de
    marcadores verdes. / Ele comemora apontando; a câmera se afasta até a cidade inteira.
14. A pergunta pros comentários e o cartão de seguir aparecem no topo. / Ele chama quem assiste e aponta pro cartão;
    a câmera fica parada.
