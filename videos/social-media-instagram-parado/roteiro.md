# Social media atrás de lojas com o Instagram parado: roteiro e ficha de cena

> Pra social media (quem cuida do Instagram de empresas) que precisa achar clientes. ~70 s. Gancho no estilo do canal:
> situação + "se você fizer X, acontece Y", com o conflito na tela no 1º segundo; depois o personagem ("Esse é o
> Léo..."). O Mappoa é apresentado pelo que faz antes do nome (quem assiste nunca viu). Fecha com "Antes... Agora...",
> a pergunta pros comentários e o fim no computador com mappoa.com.
>
> Tamanho pensado pro crédito da ElevenLabs que sobra (1.879 caracteres): a narração tem uns 1.250.

## Roteiro

1. A loja tem Instagram. Se o último post é de 2023, ela precisa de você. *(gancho)*
2. Esse é o Léo. Ele é social media, mas a agenda tá vazia.
3. Se você é o Léo, posta no seu perfil e espera o cliente aparecer.
4. Mas passa um mês, e quem curtiu foi a sua mãe.
5. Então você vai atrás de quem precisa: loja com o Instagram parado.
6. Essa é a *prospecção ativa*.
7. Mas achar essas lojas na mão é abrir perfil por perfil, o dia inteiro.
8. Então você usa um site que procura as empresas pra você.
9. Você escreve "lojas de roupa em Goiânia", e vem a lista, com o Instagram de cada uma quando é público.
10. Esse é o *Mappoa*.
11. Aí você abre os perfis da lista e separa os parados: último post de meses atrás.
12. Mas se a sua mensagem diz "faço social media", a dona ignora.
13. Então você fala do perfil dela: "O último post de vocês foi em março. Bora voltar a aparecer?"
14. É por isso que perfil parado é ouro: a loja já sabe que precisa, só não tem tempo.
15. Antes, o Léo esperava curtida no post. Agora, ele acha as lojas paradas da cidade inteira.
16. Qual tipo de loja você atenderia primeiro? Comenta aí. No computador, digita mappoa.com e testa você também.

~215 palavras, uns 68 a 72 segundos. 3 ciclos "Mas → Então", cada problema nascendo da solução anterior: esperar o
cliente no próprio perfil → ninguém aparece (ir atrás: prospecção ativa) → achar as lojas na mão leva o dia (Mappoa) →
a mensagem genérica é ignorada (falar do perfil dela).

Temperos: humor seco ("quem curtiu foi a sua mãe"), "é por isso que" (frase 14), quebra de mito (perfil parado não é
loja que não liga: é loja sem tempo), situação concreta (o último post em março).

## Conferido com o produto (`canal/produto.md`)

- O Mappoa é descrito antes do nome ("um site que procura as empresas pra você") e depois nomeado (aprendizados: quem
  assiste nunca viu)
- Busca por segmento e cidade (passo 1); o Instagram "quando é público" (nem todo lead tem tudo)
- **Quem vê se o perfil está parado é o Léo** (frase 11: "você abre os perfis da lista e separa"): o vídeo não diz que
  o Mappoa mostra a data do último post, porque isso não está no produto
- A mensagem é do Léo e quem manda é ele: o Mappoa não envia nada sozinho
- Nenhum número de vendas, nenhuma promessa de que toda loja fecha, nada de preço nem plano
- Fim no computador com mappoa.com (aprendizados: nunca "link da Bio")

## Ficha de cena

**Cenário:** `cidade` (o padrão do canal), de dia, porque o vídeo é sobre as lojas de rua. A fileira de 3 lojinhas no
calçadão fica em `C.esquerda`, a partir de x -21 (lição técnica: os vasos do calçadão escondem o personagem perto de
x -14): a **Boutique Flor** (a da ponta, a loja da dona), o **Pet Amigo** e a **Doce Mel**. A mesa com o computador do
Léo fica em `C.direita`. Peças do cenário que entram nas frases: o banco da calçada (frase 4, ele espera sentado), os
prédios do outro lado da rua (frase 15, cheios de marcadores), os carros, o ônibus e o semáforo (no fundo, o tempo
todo). Foto: `referencias/cenarios/cidade.jpg`.
**Hora:** dia. **Personagens:** o do canal (menino de camiseta azul), que no vídeo se chama **Léo**, quase sempre em
`C.personagem`; e **a dona da boutique** (`K.boneco({ tipo: 'menina' })`, vestido vermelho), na porta da Boutique Flor.
**Sombra:** a sombra lisa (`sombraLisa()` de `videos/servico-b2b-sinais/cena.js`), sem riscos (aprendizados).

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Léo | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | `C.personagem` | todas |
| `dona` | a dona da Boutique Flor | `K.boneco({ tipo: 'menina' })` + `K.nomear` | 1,47, vestido vermelho `#d8433b` | na porta da boutique (~[-20,3, G, 3,3]) | 1, 12, 13, 14, 15 |
| `lojas` | a fileira de 3 lojinhas com toldo e placa: "Boutique Flor", "Pet Amigo", "Doce Mel" | 3 `K.modelo('kenney-cidade/building-small-a/b/c')` + `K.placa` num grupo + `K.nomear` | uns 4 de largura e 3,5 de altura cada | `C.esquerda`, x -21, -26,2 e -31,4 | 1, 5, 14, 15 |
| `boutique` | a 1ª loja, a da dona, com a vitrine de roupas (3 cabides coloridos) | a loja da ponta + `K.placa('Boutique Flor')` + `K.nomear` | placa rosa-clara com letra vinho | a ponta da fileira, mais perto do centro | 1, 5, 12, 14 |
| `perfil` | o celular gigante flutuando na frente da boutique, com o perfil desenhado da loja: o nome, 6 fotos cinza e "Último post: 2023", teia de aranha no canto | `K.celular()` escala 3,2 + tela desenhada + `K.nomear` | tela branca, fotos cinza, data em vermelho | flutuando na frente da boutique, a 1,8 de altura | 1, 11 |
| `poeira` | a poeira saindo do perfil parado | `K.poeira` | cinza | em volta do `perfil` | 1 |
| `agenda` | a agenda do Léo, aberta, com as páginas em branco | `K.pecas`: 2 caixas finas (páginas) + caixa (capa) + `K.nomear` | 0,7 × 0,5, capa azul `#2f6fd6`, páginas brancas | flutuando do lado dele | 2 |
| `celular` | o celular do Léo, com o post dele e o contador de curtidas | `K.celular()` escala 2,4 + tela desenhada + `K.nomear` | tela na cor do canal `#2fb5a6` | na mão direita dele | 3, 4 |
| `calendario` | o calendário de mesa que vira as folhas (um mês passando) | `K.pecas`: caixa + `K.placa` com o dia + `K.nomear` | 0,6 × 0,7, branco com topo vermelho | flutuando do lado do banco | 4 |
| `coracao` | o coração da curtida, com a fotinho "Mãe" | `K.pecas`: 2 esferas + cone (coração) + `K.placa` "Mãe" + `K.nomear` | 0,4, vermelho `#e8352b` | sai do celular e sobe | 4 |
| `lupa` | a lupa grande que o Léo segura, procurando as lojas | `K.pecas`: anel + cilindro (cabo) + `K.nomear` | aro raio 0,35, cabo 0,5, preto e azul-claro | na mão dele | 5, 6 |
| `perfis` | 6 cartões de perfis abertos em volta dele ("@loja1"... com a data) | 6 `K.placa` num grupo, girando + `K.nomear` | 0,7 × 0,9 cada, brancos | em roda em volta dele | 7 |
| `relogio` | o relógio que corre as horas | `K.pecas`: cilindro + 2 caixas (ponteiros) + `K.nomear` | raio 0,45, branco com aro preto | flutuando acima dos perfis | 7 |
| `computador` | a mesa com o computador do Léo (tela desenhada: a busca, mappoa.com) | `K.computador()` + `K.nomear` | mesa de 1,15 de largura; tela 0,7 | `C.direita` | 8, 9, 16 |
| `lista` | o painel grande do Mappoa com as lojas de roupa enchendo (nome, bairro, ícone rosa do Instagram); na frase 11, os perfis parados ganham a etiqueta "parado" e sobem pra cima | `K.telaCanvas` num grupo + `K.nomear` | 2,2 × 2,8, branco com a barra na cor do canal `#2fb5a6` | em pé, acima do computador | entra na 9; fica até a 11; volta na 15 |
| `envelope` | a mensagem "Faço social media" virando envelope | `K.placa` desenhada + `K.nomear` | 0,9 × 0,6, branco | voa do Léo até a dona | 12 |
| `balao` | o balão de fala do Léo com a mensagem certa | `K.placa` desenhada + `K.nomear` | 2,4 × 1,0, branco com borda verde | entre o Léo e a dona | 13 |
| `caixas` | as caixas de roupa que a dona equilibra, atendendo sozinha | `K.pecas`: 3 caixas empilhadas + `K.nomear` | 0,5 × 0,3 × 0,4 cada, papelão `#c79a5b` | nos braços da dona | 14 |
| `pins` | os marcadores verdes em cima das lojas e dos prédios do outro lado da rua (as lojas paradas achadas) | `K.pecas`: cone de ponta pra baixo + esfera, uns 12, num grupo + `K.nomear` | 0,5 de altura cada, cor do canal | em cima das lojas e dos prédios | 15 |
| `navegador` | a barra de endereço grande com "mappoa.com" | `K.placa` desenhada + `K.nomear` | 2,4 × 0,5, branca com letra preta e o cadeado | em pé, acima do computador | 16 |
| etiquetas, ✓/✗, setas, festa, suor | efeitos | `K.etiqueta`, `K.marca`, `K.seta`, `K.festa`, `menino.suar` | | em volta das peças | várias |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| loja, Instagram | 1 | a `boutique` e o `perfil` gigante na frente dela |
| último post, 2023 | 1 | "Último post: 2023" em vermelho no `perfil`, com a `poeira` |
| você (precisa de você) | 1 | a seta laranja apontando pro perfil + etiqueta "Precisa de você" |
| Léo, social media | 2 | o `personagem` + etiqueta azul "Léo · social media" |
| agenda vazia | 2 | a `agenda` abrindo com as páginas em branco |
| perfil, post, cliente | 3 | o `celular` na mão com o post dele |
| um mês | 4 | o `calendario` virando as folhas |
| curtiu, mãe | 4 | o `coracao` com "Mãe" saindo do celular |
| loja com Instagram parado | 5 | a `lupa` passando pelas `lojas` |
| prospecção ativa | 6 | o rótulo e a `lupa` brilhando |
| perfil por perfil, dia inteiro | 7 | os `perfis` girando e o `relogio` correndo |
| site que procura as empresas | 8 | o `computador` acendendo com a busca |
| lojas de roupa em Goiânia, lista, Instagram | 9 | a busca digitada e a `lista` com o ícone do Instagram |
| Mappoa | 10 | o rótulo e a `lista` girando |
| perfis da lista, parados, meses atrás | 11 | a `lista` com as etiquetas "parado" e o `perfil` de 2023 |
| mensagem, "faço social media", dona, ignora | 12 | o `envelope` chegando na `dona`, que nem olha |
| perfil dela, março, voltar a aparecer | 13 | o `balao` com a mensagem e a dona sorrindo |
| perfil parado, ouro, loja, sem tempo | 14 | a dona com as `caixas`, o perfil virando ouro |
| curtida, post | 15 | o coraçãozinho no "Antes" |
| lojas paradas da cidade inteira | 15 | os `pins` em cima das lojas e dos prédios |
| computador, mappoa.com | 16 | o `computador` e o `navegador` |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida): o calçadão de dia, a rua com os carros e o ônibus passando, o semáforo
trocando de cor, as árvores de calçada e os prédios coloridos do outro lado.

#### 1 · plano `gancho` · ~4 s · `gancho`
> "A loja tem Instagram. Se o último post é de 2023, ela precisa de você."

- NA TELA: a Boutique Flor no centro, com a dona na porta, de braços cruzados; na frente da loja, flutuando, o celular
  gigante com o perfil dela: 6 fotos cinza, teia de aranha no canto e "Último post: 2023" em vermelho; a pergunta do
  gancho no topo
- MOSTRA: ["perfil", "boutique"]
- CENÁRIO: o calçadão com a fileira de lojas; atrás, a rua com um carro passando
- ENTRA AGORA: o `perfil` já está na tela no 1º quadro, chacoalhando (nada de cena parada); a data "2023" pisca em
  vermelho na palavra "2023"
- OBJETOS SE MEXENDO: o perfil treme e solta poeira desde o 1º quadro (`K.falhar 'treme'` + `K.poeira`); na palavra
  "você", a seta laranja entra da direita e aponta pro perfil
- PERSONAGEM: a dona (o Léo ainda não aparece) · começo: `cansado`, abanando o rosto · na palavra "2023": `triste`,
  olha o perfil
- INTERAÇÃO: o perfil parado solta poeira em cima da dona, que olha pra ele desanimada
- CÂMERA: alvo [perfil, boutique], no centro, 2/3 da altura · `mergulho` · `medio` · `frente` · altura `alto` → `olho`
  · topo livre (`espacoCima: 0.38`)
- EFEITOS VISUAIS: a pergunta do gancho no topo (o motor põe) · "2023" piscando · etiqueta laranja "Precisa de você"
  (palavra "precisa") · a seta laranja (palavra "você")
- SONS: `range` do perfil tremendo no 1º quadro · `zap` na data piscando (palavra "2023") · `whoosh` da seta (palavra
  "você")

#### 2 · plano `leo` · ~3,5 s
> "Esse é o Léo. Ele é social media, mas a agenda tá vazia."

- NA TELA: o Léo no centro, no calçadão, de frente pra câmera; do lado dele, flutuando, a agenda azul abrindo com as
  páginas em branco
- MOSTRA: ["personagem", "agenda"]
- CENÁRIO: o calçadão; atrás, a rua com o ônibus passando e os prédios
- ENTRA AGORA: a etiqueta azul na palavra "Léo"; a agenda surge girando na palavra "agenda"
- OBJETOS SE MEXENDO: a agenda abre e as páginas viram sozinhas, todas em branco, na palavra "vazia"
- PERSONAGEM: em `C.personagem`, de frente pra câmera · começo: `mostrando` (se apresenta, confiante) · na palavra
  "vazia": `triste`, os ombros caem
- INTERAÇÃO: ele abre a agenda e desanima com as páginas em branco
- CÂMERA: alvo [personagem, agenda], no centro, metade da altura · `chegando` · `medio` · `perfil_direita` · altura
  `olho` (na frase 1: mergulho, médio, frente, na loja)
- EFEITOS VISUAIS: etiqueta azul "Léo · social media" (palavra "Léo") · etiqueta vermelha "0 clientes" (palavra
  "vazia")
- SONS: `ding` da etiqueta (o kit põe) · `whoosh` das páginas virando (palavra "vazia")

#### 3 · plano `posta` · ~3,5 s
> "Se você é o Léo, posta no seu perfil e espera o cliente aparecer."

- NA TELA: o Léo à direita, com o celular na mão; na tela, o post dele "Faço social media!"; ele senta no banco da
  calçada e fica esperando, olhando a rua
- MOSTRA: ["personagem", "celular"]
- CENÁRIO: o banco da calçada (`C.lugares.banco`); atrás, a rua com os carros
- ENTRA AGORA: o celular sobe pra mão dele na palavra "posta"; o post aparece na tela (palavra "perfil")
- OBJETOS SE MEXENDO: o post sobe na tela do celular; uma setinha de "enviar" sai do celular (palavra "posta")
- PERSONAGEM: começo: `segurando` o celular, aperta postar (`ideia`) · na palavra "espera": anda até o banco e senta,
  olhando de um lado pro outro (`pensando`)
- INTERAÇÃO: ele posta no celular e fica esperando o cliente chegar
- CÂMERA: alvo [personagem, celular] · `passando` (seguindo ele até o banco) · `aberto` · `frente` · altura `alto` (na
  frase 2: chegando, médio, perfil direita, olho)
- EFEITOS VISUAIS: etiqueta laranja "Esperando..." (palavra "espera")
- SONS: `clique` do postar (palavra "posta") · `passo` dele andando até o banco

#### 4 · plano `mae` · ~3,5 s · jogo `falha`
> "Mas passa um mês, e quem curtiu foi a sua mãe."

- NA TELA: o Léo sentado no banco, de lado; o calendário do lado dele virando as folhas; do celular sai um coração
  vermelho com a etiqueta "Mãe"
- MOSTRA: ["calendario", "coracao", "personagem"]
- CENÁRIO: o banco; atrás, a rua: o semáforo troca de cor várias vezes (o tempo passando)
- ENTRA AGORA: o calendário cai do alto na palavra "passa"; o coração sobe do celular na palavra "curtiu"
- OBJETOS SE MEXENDO: as folhas do calendário voam uma por uma (de 1 a 30) a partir de "mês"; o coração sobe meio metro
  e para no ar, sozinho
- PERSONAGEM: no banco · começo: `cansado`, queixo na mão · na palavra "mãe": `surpreso` e depois `triste`, olha o
  coração
- INTERAÇÃO: o celular dele solta só um coração, e ele olha pro coração sem acreditar
- CÂMERA: alvo [calendario, coracao, personagem] · `chegando` · `perto` · `perfil_esquerda` · altura `olho` (na frase 3:
  passando, aberto, frente, alto)
- EFEITOS VISUAIS: etiqueta vermelha "1 curtida" (palavra "curtiu") · o rótulo "Mãe" no coração · no fim, preto e
  branco (o jogo faz)
- SONS: `whoosh` das folhas voando · `pingo` do coração (palavra "curtiu") · o congela do jogo

#### 5 · plano `vai_atras` · ~4 s · jogo `corrige`
> "Então você vai atrás de quem precisa: loja com o Instagram parado."

- NA TELA: o Léo andando pelo calçadão na frente das 3 lojas, com uma lupa grande na mão; a lupa passa pela Boutique
  Flor e acende
- MOSTRA: ["personagem", "lupa", "lojas"]
- CENÁRIO: a fileira de lojas; atrás, os prédios altos; a rua com os carros
- ENTRA AGORA: a lupa sobe pra mão dele na palavra "atrás"; um "?" laranja em cima de cada loja na palavra "loja"
- OBJETOS SE MEXENDO: a lupa vai da direita pra esquerda, de loja em loja; na palavra "parado", ela para na Boutique
  Flor, que acende (`K.brilhar`)
- PERSONAGEM: anda de `C.personagem` até a frente das lojas · começo: `ideia`, levanta do banco · na palavra "parado":
  `apontar` a boutique
- INTERAÇÃO: ele procura com a lupa e acha a loja com o perfil parado
- CÂMERA: alvo [personagem, lojas] · `passando` (da direita pra esquerda, junto com ele) · `medio` · `frente` · altura
  `olho` (na frase 4: chegando, perto, perfil esquerda, olho)
- EFEITOS VISUAIS: os "?" laranja em cima das lojas · ✓ verde em cima da boutique (palavra "parado")
- SONS: `passo` dele andando · `brilho` da boutique acendendo (palavra "parado")

#### 6 · plano `prospeccao_rotulo` · ~2 s
> "Essa é a *prospecção ativa*."

- NA TELA: a lupa no centro, grande, brilhando, com a boutique aparecendo dentro dela; o rótulo grande "Prospecção
  ativa"
- MOSTRA: ["lupa"]
- CENÁRIO: atrás, desfocado, a fileira de lojas
- ENTRA AGORA: o rótulo (palavra "prospecção")
- OBJETOS SE MEXENDO: a lupa gira meia volta no ar e brilha
- PERSONAGEM: no canto de baixo, segurando a lupa no alto · `vitoria`
- INTERAÇÃO: ele ergue a lupa como um troféu
- CÂMERA: alvo lupa · `girando` · `perto` · `perfil_direita` · altura `baixo` (na frase 5: passando, médio, frente,
  olho)
- EFEITOS VISUAIS: o rótulo amarelo "Prospecção ativa" · o brilho (`K.brilhar`)
- SONS: `brilho` do rótulo (o kit põe)

#### 7 · plano `na_mao` · ~4,5 s · jogo `falha`
> "Mas achar essas lojas na mão é abrir perfil por perfil, o dia inteiro."

- NA TELA: o Léo no centro, com o celular na mão, e 6 cartões de perfis girando em volta dele, cada vez mais rápido;
  acima, o relógio correndo as horas
- MOSTRA: ["personagem", "perfis", "relogio"]
- CENÁRIO: o calçadão; atrás, a rua: a luz ficando de tarde
- ENTRA AGORA: os cartões entram um por um a partir da palavra "perfil"; o relógio cai do alto na palavra "dia"
- OBJETOS SE MEXENDO: os cartões giram em volta dele, cada vez mais rápido; os ponteiros do relógio dão várias voltas a
  partir de "dia"
- PERSONAGEM: em `C.personagem` · começo: `pensando`, rolando o celular · na palavra "inteiro": `cansado`, suando
  (`suar`)
- INTERAÇÃO: os perfis rodeiam e cansam ele
- CÂMERA: alvo [personagem, perfis] · `girando` (sentido contrário) · `medio` · `frente` · altura `alto` (na frase 6:
  girando, perto, perfil direita, baixo)
- EFEITOS VISUAIS: etiqueta vermelha "8 horas" (palavra "inteiro") · o suor · no fim, preto e branco (o jogo faz)
- SONS: `clique` de cada cartão · `zumbido` do relógio correndo · o congela do jogo

#### 8 · plano `site` · ~3 s · jogo `corrige`
> "Então você usa um site que procura as empresas pra você."

- NA TELA: a mesa com o computador no centro, a tela acendendo com uma caixa de busca e uma lupa; o Léo chegando do lado
- MOSTRA: ["computador", "personagem"]
- CENÁRIO: `C.direita`, o calçadão; atrás, os carros passando
- ENTRA AGORA: a lupa e a caixa de busca na tela (palavra "site")
- OBJETOS SE MEXENDO: os perfis da frase 7 caem e somem; a lupa da tela gira procurando
- PERSONAGEM: anda até a mesa · começo: `surpreso` · na palavra "procura": `ideia`, apontando pra tela
- INTERAÇÃO: ele vai até o computador e aponta a busca
- CÂMERA: alvo [computador, personagem] · `chegando` · `medio` · `perfil_esquerda` · altura `olho` (na frase 7: girando,
  médio, frente, alto)
- EFEITOS VISUAIS: etiqueta azul "Procura por você" (palavra "procura")
- SONS: `liga` da tela (palavra "site") · `whoosh` dos perfis caindo

#### 9 · plano `busca` · ~5 s
> "Você escreve 'lojas de roupa em Goiânia', e vem a lista, com o Instagram de cada uma quando é público."

- NA TELA: o computador embaixo; acima dele, o painel grande do Mappoa subindo e enchendo de lojas de roupa, linha por
  linha, cada uma com o ícone rosa do Instagram; o Léo do lado
- MOSTRA: ["lista", "computador"]
- CENÁRIO: o calçadão; atrás, a rua
- ENTRA AGORA: as letras da busca aparecem uma a uma (palavra "escreve"); a `lista` sobe do computador (palavra
  "lista"); os ícones nas linhas (palavra "Instagram")
- OBJETOS SE MEXENDO: a lista sobe 1,5 metro e as linhas entram de cima pra baixo, até 8 lojas
- PERSONAGEM: na frente da mesa · começo: digitando (`segurando`) · na palavra "lista": `surpreso`, dá um passo pra trás
- INTERAÇÃO: ele digita e a lista sobe na frente dele
- CÂMERA: alvo [lista, computador] · `subindo` (acompanhando a lista) · `medio` · `frente` · altura `olho` → `alto` (na
  frase 8: chegando, médio, perfil esquerda, olho)
- EFEITOS VISUAIS: contador "8 lojas" crescendo · os ícones
- SONS: `clique` das teclas · `brilho` de cada linha · `ding` no fim

#### 10 · plano `mappoa_rotulo` · ~2 s
> "Esse é o *Mappoa*."

- NA TELA: a lista no centro, grande, girando e brilhando; o rótulo grande "Mappoa"
- MOSTRA: ["lista"]
- CENÁRIO: atrás, desfocado, o calçadão e a rua
- ENTRA AGORA: o rótulo (palavra "Mappoa")
- OBJETOS SE MEXENDO: a lista gira meia volta e brilha
- PERSONAGEM: no canto de baixo · `vitoria`
- INTERAÇÃO: ele comemora a lista
- CÂMERA: alvo lista · `girando` · `perto` · `perfil_direita` · altura `baixo` (na frase 9: subindo, médio, frente)
- EFEITOS VISUAIS: o rótulo amarelo "Mappoa" · o brilho
- SONS: `brilho` do rótulo (o kit põe)

#### 11 · plano `parados` · ~4 s
> "Aí você abre os perfis da lista e separa os parados: último post de meses atrás."

- NA TELA: a lista no centro; o Léo toca numa linha e o perfil gigante de 2023 abre do lado dela; as lojas paradas
  ganham a etiqueta laranja "parado" e sobem pro topo da lista
- MOSTRA: ["lista", "perfil", "personagem"]
- CENÁRIO: a mesa e o computador; atrás, a rua
- ENTRA AGORA: o `perfil` desliza da lista pro lado (palavra "abre"); as etiquetas "parado" carimbam as linhas (palavra
  "parados")
- OBJETOS SE MEXENDO: o perfil abre e fecha 2 vezes (um de cada loja); as 3 linhas paradas trocam de lugar e sobem pro
  topo (palavra "separa")
- PERSONAGEM: na frente da mesa · começo: `apontar` a linha da lista · na palavra "parados": `ideia`, separa com a mão
  (`empurrando`)
- INTERAÇÃO: ele abre os perfis e arrasta os parados pra cima da lista
- CÂMERA: alvo [lista, perfil] · `afastando` · `medio` · `perfil_esquerda` · altura `olho` (na frase 10: girando, perto,
  perfil direita, baixo)
- EFEITOS VISUAIS: as etiquetas laranja "parado" nas linhas · etiqueta azul "Você que olha" (palavra "abre")
- SONS: `clique` (palavra "abre") · `trava` de cada carimbo "parado" (palavra "parados")

#### 12 · plano `ignora` · ~4 s · jogo `falha`
> "Mas se a sua mensagem diz 'faço social media', a dona ignora."

- NA TELA: o calçadão visto de cima: o Léo à direita solta um envelope "Faço social media" que voa até a dona, na porta
  da boutique; ela vira de costas e o envelope cai no chão
- MOSTRA: ["envelope", "dona", "boutique"]
- CENÁRIO: a boutique e a rua de cima; um carro passando
- ENTRA AGORA: o envelope (palavra "mensagem")
- OBJETOS SE MEXENDO: o envelope voa em arco da direita pra esquerda; na palavra "ignora", bate na dona e cai no chão,
  murcho (`K.falhar 'murcha'`)
- PERSONAGEM: o Léo · começo: `chamando` (manda confiante) · na palavra "ignora": `susto` · a dona: `bravo`, vira de
  costas
- INTERAÇÃO: a dona dá as costas pro envelope dele
- CÂMERA: alvo [envelope, dona, boutique] · `afastando` · `aberto` · `frente` · altura `cima` (na frase 11: afastando,
  médio, perfil esquerda, olho; aqui muda o plano e a altura)
- EFEITOS VISUAIS: ✗ vermelho em cima do envelope no chão (palavra "ignora") · no fim, preto e branco
- SONS: `whoosh` do envelope · `baque` dele no chão (palavra "ignora") · o congela do jogo

#### 13 · plano `perfil_dela` · ~5 s · jogo `corrige`
> "Então você fala do perfil dela: 'O último post de vocês foi em março. Bora voltar a aparecer?'"

- NA TELA: o balão verde do Léo chega até a dona; ela lê e sorri; atrás dela, na vitrine da boutique, as roupas
  acendem como se a loja voltasse a aparecer
- MOSTRA: ["balao", "dona", "boutique"]
- CENÁRIO: a boutique de perto: a placa "Boutique Flor", a vitrine com os cabides coloridos
- ENTRA AGORA: o balão (palavra "perfil"); a palavra "março" fica laranja dentro do balão (palavra "março"); a vitrine
  acende (palavra "aparecer")
- OBJETOS SE MEXENDO: o balão desliza da direita até a frente da dona; os cabides da vitrine giram um pouquinho e brilham
- PERSONAGEM: a dona · começo: `duvida`, lê o balão · na palavra "aparecer": `surpreso` → `feliz`, aponta a vitrine · o
  Léo entra pela direita, de lado, `mostrando`
- INTERAÇÃO: a mensagem do Léo faz a dona olhar pra própria loja e sorrir
- CÂMERA: alvo [dona, balao] · `passando` (por cima do ombro dela) · `medio` · `perfil_direita` · altura `olho` (na
  frase 12: afastando, aberto, frente, cima)
- EFEITOS VISUAIS: ✓ verde no balão (palavra "aparecer") · o brilho na vitrine
- SONS: `bip` da mensagem chegando (palavra "perfil") · `certo` (palavra "aparecer")

#### 14 · plano `ouro` · ~4,5 s
> "É por isso que perfil parado é ouro: a loja já sabe que precisa, só não tem tempo."

- NA TELA: a dona no centro, na porta da boutique, equilibrando uma pilha de caixas de roupa; do lado, o perfil parado
  fica dourado; o relógio da loja girando
- MOSTRA: ["dona", "caixas", "perfil"]
- CENÁRIO: a boutique; um cliente entrando na loja (a vida real); o ônibus passando atrás
- ENTRA AGORA: o perfil volta e fica dourado na palavra "ouro"; as caixas caem uma por uma nos braços dela (palavra
  "tempo")
- OBJETOS SE MEXENDO: o perfil gira e troca de cinza pra dourado; as caixas empilham e balançam (`K.falhar 'treme'`)
- PERSONAGEM: a dona · começo: `segurando`, carregando as caixas · na palavra "tempo": `cansado`, suando · o Léo do lado
  da boutique: `ideia`, aponta o perfil dourado
- INTERAÇÃO: as caixas não deixam a dona mexer no celular: o Léo aponta que é aí que ele entra
- CÂMERA: alvo [dona, caixas, perfil] · `revelando` · `medio` · `frente` · altura `baixo` (na frase 13: passando,
  médio, perfil direita, olho)
- EFEITOS VISUAIS: o perfil dourado com o brilho · etiqueta laranja "Sem tempo" (palavra "tempo")
- SONS: `brilho` do ouro (palavra "ouro") · `baque` das caixas (palavra "tempo")

#### 15 · plano `antes_agora` · ~5,5 s · jogo `avanca` (⏩)
> "Antes, o Léo esperava curtida no post. Agora, ele acha as lojas paradas da cidade inteira."

- NA TELA: começo em preto e branco: o Léo largado no banco, um coraçãozinho só; ⏩; depois, em cor: a cidade de cima,
  com os marcadores verdes brotando em cima das lojas e dos prédios do outro lado da rua, e a dona acenando
- MOSTRA: ["personagem", "pins", "lojas"]
- CENÁRIO: a cidade inteira: o calçadão, a rua, os prédios coloridos e os altos atrás
- ENTRA AGORA: o coraçãozinho (palavra "curtida"); os marcadores brotam um por um a partir da palavra "Agora"
- OBJETOS SE MEXENDO: o coração murcha; ⏩; os marcadores caem do alto e quicam em cima de cada loja e prédio
- PERSONAGEM: começo: `cansado` no banco · na palavra "Agora": `vitoria`, levanta num pulo e aponta os marcadores
- INTERAÇÃO: ele aponta e os marcadores brotam nas lojas da cidade
- CÂMERA: alvo [personagem, pins, lojas] · `afastando` · `aberto` · `frente` · altura `alto` (na frase 14: revelando,
  médio, frente, baixo)
- EFEITOS VISUAIS: preto e branco no "Antes" · ⏩ (o jogo faz) · contador de marcadores · `K.festa` baixinho
- SONS: `desliga` do coração murchando · o avança (o jogo) · `brilho` de cada marcador

#### 16 · plano `segue` · ~6 s · cauda `cartao`
> "Qual tipo de loja você atenderia primeiro? Comenta aí. No computador, digita mappoa.com e testa você também."

- NA TELA: o Léo na frente do computador, de frente pra câmera; acima do computador, a barra de endereço grande
  "mappoa.com"; o cartão de seguir no topo
- MOSTRA: ["personagem", "navegador", "computador"]
- CENÁRIO: a mesa no calçadão; a rua atrás
- ENTRA AGORA: o `navegador` cresce (palavra "computador"); as letras de "mappoa.com" aparecem uma a uma (palavra
  "digita")
- OBJETOS SE MEXENDO: as letras entrando; o cadeado brilha
- PERSONAGEM: começo: `chamando` (pergunta pra quem assiste) · na palavra "digita": digita e depois `apontar` pro
  endereço
- INTERAÇÃO: ele digita o endereço no computador e aponta
- CÂMERA: alvo [personagem, navegador] · `chegando` devagar · `aberto` · `perfil_esquerda` leve · altura `olho` · topo
  livre (`espacoCima: 0.4`) (na frase 15: afastando, aberto, frente, alto)
- EFEITOS VISUAIS: o cartão de seguir (cauda) · o endereço grande
- SONS: `clique` das teclas · `ding` no fim

## Cada cena em 2 linhas

1. Na frente da Boutique Flor, um celular gigante treme soltando poeira: "Último post: 2023". / A dona olha
   desanimada; a câmera desce do alto até a loja.
2. O Léo se apresenta e abre a agenda: todas as páginas em branco, "0 clientes". / Ele desanima; a câmera chega de lado.
3. Ele posta "Faço social media!" no celular e senta no banco esperando. / Anda até o banco; a câmera passa de cima.
4. O calendário vira um mês inteiro e do celular sai um coração só, escrito "Mãe". / Ele não acredita; a câmera chega
   pertinho.
5. Com uma lupa gigante, ele passa pelas lojas e acha a boutique de perfil parado. / Ele aponta; a câmera anda junto.
6. A lupa gira e brilha, com o nome "Prospecção ativa". / Ele ergue a lupa como troféu; a câmera gira de baixo.
7. Seis perfis giram em volta dele e o relógio corre o dia inteiro. / Ele cansa e sua; a câmera gira de cima.
8. O computador da calçada acende com uma lupa procurando. / Ele chega e aponta; a câmera chega de lado.
9. Ele digita "lojas de roupa em Goiânia" e o painel sobe cheio de lojas com Instagram. / Ele se assusta de alegria; a
   câmera sobe junto.
10. O painel gira e brilha, com o nome "Mappoa". / Ele comemora; a câmera olha de baixo.
11. Ele abre os perfis da lista e as lojas paradas ganham o carimbo "parado" e sobem pro topo. / Ele separa com a mão; a
    câmera se afasta de lado.
12. Vista de cima: o envelope "Faço social media" voa até a dona, que vira de costas. / Ele leva um susto; a câmera se
    afasta, do alto.
13. A mensagem certa chega, a dona sorri e a vitrine dela acende. / Ela aponta a vitrine; a câmera passa pelo ombro dela.
14. A dona equilibra uma pilha de caixas e o perfil parado vira ouro do lado. / O Léo aponta o ouro; a câmera revela de
    baixo.
15. Preto e branco: ele largado no banco com uma curtida. ⏩ Cor: marcadores brotam nas lojas da cidade inteira. / Ele
    levanta num pulo; a câmera se afasta pro alto.
16. Ele pergunta pra quem assiste e digita "mappoa.com" no computador, com o endereço grande; o cartão de seguir no
    topo. / Ele digita e aponta; a câmera de frente.
