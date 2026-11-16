# O cardápio em PDF: roteiro e ficha de cena

> Vídeo 9 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: restaurantes de Porto Alegre. O Bruno, web designer de Porto Alegre, caçava restaurante no mapa,
> um por um, e não sabia qual tinha site ruim. No 1º quadro, de noite, na calçada da CANTINA DO ARI, o cliente olha o
> celular e um PDF de trinta páginas gigantes desaba do céu em cima dele, até enterrar ele até o peito. O Bruno decide
> investir o preço de um xis num sistema que acha quem precisa de site, acha a Cantina do seu Ari na lista, abre o site
> e é só um PDF de trinta páginas, manda a mensagem pronta, o seu Ari topa, e o cliente do começo pede pelo cardápio
> novo, que abre no celular.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (as páginas gigantes desabando em cima do cliente), cortes a
> cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (a pilha de páginas, o "pág. 30 de 30"), o personagem
> já dentro da ação (sem "Esse é o ..."), o Mappoa entrando tarde como decisão de investir (o preço de um xis, sem
> valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como **sistema**, ~53 s e o pedido de
> comentário de UMA palavra no fim (ABRO ou FECHO), sem prometer mandar nada.
> Cenários diferentes dos vídeos 1 a 8: a `fachada` da pizzaria **de noite** coberta como CANTINA DO ARI (o gancho, o
> pedido e a porta certa), o `escritorio` (a mesa do Bruno, com o chimarrão), a `lua` (o Mappoa: o painel gigante
> flutuando, o Bruno de capacete de astronauta e a Terra no céu) e a `pizzaria` por dentro como a cantina.

## Roteiro

1. O cliente quer ver o cardápio. Se é um PDF gigante, ele pede no concorrente. *(gancho, a frase da pauta)*
2. O Bruno é web designer em Porto Alegre e caçava restaurante no mapa, um por um.
3. Achar restaurante é fácil. Difícil é saber qual tem site ruim, ou nem tem site.
4. Então o Bruno decidiu investir o preço de um xis num sistema que acha quem precisa de site.
5. Digitou mappoa.com no computador, e veio a lista dos restaurantes de Porto Alegre, com e sem site.
6. Esse é o *Mappoa*: separa com e sem site e mostra quem tem mais chance de comprar.
7. O Bruno abriu o site da Cantina do seu Ari: era só um PDF de trinta páginas.
8. Mandou a mensagem pronta, o seu Ari topou, e agora o cardápio abre no celular.
9. Antes, o Bruno caçava restaurante um por um. Agora, ele já sabe em qual porta bater.
10. E você, abre cardápio em PDF? Comenta ABRO ou FECHO e segue. No computador, digita mappoa.com e testa você também.

Cerca de 164 palavras, uns 53 s com o cartão de seguir (~880 caracteres da ElevenLabs; sobram ~2.800).

**Gancho:** a frase da pauta. Outras opções pensadas: "Trinta páginas de PDF pra ver o preço do galeto. Ele
desistiu na segunda." e "O cardápio não abriu no celular. A fome não espera." Fiquei com a da pauta (situação + "se
você fizer X, acontece Y") e a imagem da pauta: o PDF de trinta páginas desabando em cima do cliente.
1º quadro: a calçada da CANTINA DO ARI de noite, a placa acesa; o cliente pequeno no meio, olhando o celular; as
páginas gigantes do cardápio (com o selo vermelho "PDF") caindo do céu, as primeiras já no chão em volta dele.

**Capa:** "Cardápio em *PDF*?" (17 letras): o cliente enterrado até o peito na pilha de páginas, com a mão na testa,
páginas ainda caindo, a cantina acesa atrás.

## O que foi conferido

- Sem preço, sem plano e sem número falado do Mappoa; "o preço de um xis" (o lanche de Porto Alegre) é o espírito do
  investimento
- O Mappoa NÃO detecta cardápio em PDF: quem descobre é o Bruno, abrindo o site da cantina que veio na lista. O Mappoa
  faz o que o `canal/produto.md` permite: acha os restaurantes de Porto Alegre, separa com site e sem site, mostra o
  score de aderência ("mais chance de comprar") e deixa a mensagem pronta. As dores da análise são genéricas ("Presença
  digital fraca"), sem dizer que ele leu o PDF
- O Mappoa gera a mensagem; quem manda é o Bruno. O seu Ari "topou" a proposta do Bruno; o "cardápio que abre no
  celular" é o site que o Bruno fez, não um recurso do Mappoa
- Telas desenhadas genéricas; restaurantes e nomes inventados (os bairros são de Porto Alegre)

## Cenários

`fachada` da pizzaria de noite, coberta como CANTINA DO ARI (o gancho, o cliente pedindo pelo cardápio novo, o Bruno
batendo na porta certa e a capa; frases 1, 8, 9) → `escritorio` (a mesa do Bruno no meio da sala, o mapa no cavalete,
a planilha gigante, a cuia de chimarrão; frases 2, 3, 4, 5, 7, 9, 10) → `lua` (o painel gigante do Mappoa flutuando, o
Bruno de capacete de astronauta, a Terra no céu; frase 6) → `pizzaria` por dentro como a cantina (o seu Ari lendo a
mensagem no celular gigante; frase 8). O cliente é um `K.boneco` de camiseta vermelha; o seu Ari é o
`K.personagem('pizzaiolo')`.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `personagem` | o Bruno (personagem do canal) | em todo lugar | 2-10 |
| `cliente` | o cliente com fome (camiseta vermelha, celular na mão) | calçada da cantina, x 0, z 3,4 | 1, 8, capa |
| `paginas` | 30 páginas gigantes do cardápio (1,4 x 2 m), selo "PDF" e "pág. N de 30" | caindo do céu em volta do cliente | 1, capa |
| `placa_cantina` | placa "CANTINA DO ARI" por cima do letreiro da pizzaria (fora e dentro) | fachada e cantina | 1, 8, 9 |
| `mapa` | quadro num cavalete com o mapa de Porto Alegre e os pinos dos restaurantes | escritório, do lado da mesa | 2, 9 |
| `monitor` | o computador do Bruno com a mesa e a cadeira | escritório, x 0,6, z -0,4 | 2, 4, 5, 7, 10 |
| `cuia` | a cuia de chimarrão com a bomba | na mesa do Bruno | 2, 3 |
| `planilha` | planilha gigante enchendo de linhas, com "?" | escritório, atrás do Bruno | 3 |
| `xis` | o xis gaúcho (pão achatado, alface, tomate, ovo) | na mão do Bruno | 4 |
| `navegador` | a barra com mappoa.com | acima do monitor | 5, 10 |
| `tela` | painel do Mappoa: a lista dos restaurantes, a análise, a mensagem, o PDF aberto | escritório e lua | 5, 6, 7 |
| `robo` | robô do Mappoa | lua e escritório | 6, 10 |
| `dono` | o seu Ari (pizzaiolo, avental e chapéu) | cantina por dentro e porta | 8, 9 |
| `celular` | celular gigante com o WhatsApp | cantina por dentro | 8 |
| `galeto` | o prato com o galeto que chega na mesa do cliente | calçada | 8 |

## Teste dos substantivos

cliente / cardápio (1: o cliente com o celular e as páginas "CARDÁPIO") · PDF gigante (1: o selo "PDF" e as páginas de
2 m, etiqueta "PDF de 30 páginas") · concorrente (1: o celular com "Pedido feito · outro restaurante" e a etiqueta
"Pediu no concorrente") · Bruno / web designer / Porto Alegre (2: etiquetas) · restaurante / mapa / um por um (2: o
mapa no cavalete com os pinos acendendo um de cada vez) · achar / fácil / difícil / site ruim / sem site (3: etiquetas
"Fácil" e "Difícil", a planilha com "?") · investir / xis / sistema / site (4) · mappoa.com / computador / lista /
restaurantes / Porto Alegre / com e sem site (5) · Mappoa / com e sem site / mais chance de comprar (6: a lista
separada e o score) · Cantina do seu Ari / PDF / trinta páginas (7: o PDF aberto no painel, "1 de 30" até "30 de 30") ·
mensagem pronta / seu Ari / topou / cardápio / celular (8) · antes / um por um / agora / porta (9) · você / PDF /
comenta / mappoa.com (10).

## Ficha de cena

#### 1 · plano `gancho` · ~4,6 s
> "O cliente quer ver o cardápio. Se é um PDF gigante, ele pede no concorrente."

- NA TELA: a calçada da CANTINA DO ARI de noite (placa acesa, toldo, mesinhas); o cliente no meio, de frente pra
  câmera, olhando o celular; as páginas gigantes caindo do céu e a pilha crescendo em volta dele
- MOSTRA: ["cliente", "paginas", "placa_cantina"]
- CENÁRIO: fachada da pizzaria de noite, carros passando na rua, poste aceso
- ENTRA AGORA: no 1º quadro as primeiras páginas já estão no ar e duas no chão; uma página cai a cada ~0,12 s; a
  etiqueta "PDF de 30 páginas" (palavra "PDF"); "Pediu no concorrente" e o ✗ (palavra "concorrente")
- OBJETOS SE MEXENDO: as páginas caem girando e deitam na pilha, que sobe até o peito do cliente
- PERSONAGEM: o cliente · começo: olha o celular · em "gigante": mão na testa · em "concorrente": olha o celular de
  novo (o celular mostra "Pedido feito" em outro restaurante) e o balão "Vou pedir no outro!"
- INTERAÇÃO: as páginas enterram o cliente
- CÂMERA: 4 cortes · (1) 0-0,8 s: aberto, de baixo, as páginas caindo do céu e a placa · (2) 0,8-1,6 s: médio, de
  frente, o cliente com o celular · (3) 1,6 s até "concorrente": alto, de cima, a pilha crescendo · (4) de
  "concorrente" ao fim: perto, o cliente enterrado até o peito
- EFEITOS VISUAIS: etiqueta vermelha "PDF de 30 páginas" · "Pediu no concorrente" · ✗ · balão
- SONS: whoosh no 1º quadro · baque a cada página · errado em "concorrente"

#### 2 · plano `bruno` · ~4,7 s
> "O Bruno é web designer em Porto Alegre e caçava restaurante no mapa, um por um."

- NA TELA: o escritório; a mesa do Bruno no meio (computador com o mapa, a cuia de chimarrão); o cavalete com o mapa
  de Porto Alegre e os pinos dos restaurantes
- MOSTRA: ["personagem", "mapa", "monitor"]
- CENÁRIO: escritório, janelão com a cidade
- ENTRA AGORA: azul "Web designer" ("designer"); azul "Porto Alegre, RS" ("Porto"); em "mapa", os pinos acendem um de
  cada vez com um bip; "1 por 1" ("um")
- OBJETOS SE MEXENDO: o pino aceso pula de restaurante em restaurante
- PERSONAGEM: começo: sentado, toma o chimarrão · em "mapa": levanta e aponta pino por pino
- INTERAÇÃO: o Bruno aponta os pinos do mapa
- CÂMERA: (1) até "mapa": chegando, médio, frente-direita, ele e o computador · (2) passando, perto, esquerda, o mapa
- EFEITOS VISUAIS: etiquetas · contador "Restaurante 1, 2, 3..."
- SONS: pingo em "designer" · bip em cada pino

#### 3 · plano `dificil` · ~4,7 s
> "Achar restaurante é fácil. Difícil é saber qual tem site ruim, ou nem tem site."

- NA TELA: o escritório; a planilha gigante atrás do Bruno, enchendo de linhas; um "?" em cima de cada linha
- MOSTRA: ["personagem", "planilha"]
- ENTRA AGORA: verde "Fácil" ("fácil"); vermelha "Difícil" ("Difícil"); balão de pensamento "Qual tem site ruim?"
  ("ruim"); ✗ ("site" do fim)
- OBJETOS SE MEXENDO: a planilha enche de linhas de "fácil" até "Difícil"
- PERSONAGEM: começo: faz que sim, confiante · em "Difícil": coça a cabeça · em "nem": mão na testa
- CÂMERA: (1) até "Difícil": subindo, aberto, frente, a planilha inteira · (2) chegando, perto, direita, o rosto dele
- SONS: certo em "fácil" · errado em "Difícil"

#### 4 · plano `investe` · ~5,6 s
> "Então o Bruno decidiu investir o preço de um xis num sistema que acha quem precisa de site."

- NA TELA: a mesa do Bruno; o Bruno de pé com o xis na mão; o xis voa pro monitor e some num poof; a tela carrega
- MOSTRA: ["personagem", "xis", "monitor"]
- ENTRA AGORA: o xis aparece na mão em "investir"; verde "Investimento" ("investir"); "Acha quem precisa de site"
  ("precisa")
- OBJETOS SE MEXENDO: o xis gira e voa até o monitor em "sistema"; a barra "Carregando... / Pronto!"
- PERSONAGEM: faz que sim · em "sistema": aponta o monitor · em "site": comemora
- CÂMERA: (1) até "sistema": chegando, perto, esquerda, o xis · (2) passando, médio, direita, o monitor
- SONS: ding em "xis" · whoosh em "sistema" · brilho no poof · certo em "site"

#### 5 · plano `lista` · ~5,3 s
> "Digitou mappoa.com no computador, e veio a lista dos restaurantes de Porto Alegre, com e sem site."

- NA TELA: a barra com mappoa.com acima do monitor; a lista dos restaurantes de Porto Alegre sobe do computador
- MOSTRA: ["navegador", "tela", "personagem"]
- ENTRA AGORA: a barra cresce em "Digitou", as letras uma a uma; a lista sobe em "lista"; as linhas, uma a uma, com
  "com site" / "sem site"; azul "Porto Alegre, RS"
- PERSONAGEM: sentado digitando · em "lista": levanta e aponta
- CÂMERA: (1) por cima do ombro, o endereço · (2) chegando, médio, frente, a lista
- SONS: cliques nas letras · bip em cada linha · brilho na lista

#### 6 · plano `mappoa` · ~5,2 s
> "Esse é o *Mappoa*: separa com e sem site e mostra quem tem mais chance de comprar."

- NA TELA: a lua; o painel gigante do Mappoa flutuando (a lista separada, depois a análise com o score); o Bruno de
  capacete de astronauta; o robô do Mappoa flutuando; a Terra no céu
- MOSTRA: ["tela", "personagem", "robo"]
- ENTRA AGORA: o painel sobe do chão em "Mappoa"; o rótulo "Mappoa"; em "chance", a análise com o score subindo
- PERSONAGEM: surpreso · em "separa": aponta · em "chance": comemora em câmera lenta (pulinho na lua)
- CÂMERA: (1) até "chance": subindo, médio, esquerda · (2) chegando, perto, frente, o score
- EFEITOS VISUAIS: "Com e sem site" · "Mais chance de comprar"
- SONS: brilho em "Mappoa" · certo em "comprar"

#### 7 · plano `pdf` · ~5,0 s
> "O Bruno abriu o site da Cantina do seu Ari: era só um PDF de trinta páginas."

- NA TELA: o escritório; o painel com o PDF aberto (cardapio-cantina-ari.pdf, a página e o contador "1 de 30" que
  corre até "30 de 30")
- MOSTRA: ["tela", "personagem"]
- ENTRA AGORA: em "abriu" o PDF abre; em "trinta", o contador dispara; vermelha "Só um PDF" ("PDF")
- PERSONAGEM: aponta o PDF · em "PDF": cai sentado de susto
- CÂMERA: (1) até "PDF": chegando, perto, frente, o painel · (2) afastando, médio, esquerda, ele no chão
- SONS: clique em "abriu" · whoosh das páginas · errado em "PDF"

#### 8 · plano `topou` · ~4,7 s
> "Mandou a mensagem pronta, o seu Ari topou, e agora o cardápio abre no celular."

- NA TELA: (1) dentro da cantina: o seu Ari com o celular gigante mostrando a mensagem do Bruno · (2) em "agora": a
  calçada de noite, o cliente do começo sentado na mesinha, o celular mostrando o cardápio novo, e o galeto chegando
- MOSTRA: ["dono", "celular", "cliente"]
- ENTRA AGORA: a mensagem no celular ("mensagem"); balão "Topo!" ("topou"); verde "Abre no celular" ("celular"); o
  galeto aparece na mesa num poof
- PERSONAGEM: o seu Ari lê e comemora · o cliente toca no celular e comemora
- CÂMERA: (1) passando, perto, o seu Ari e o celular · (2) chegando, médio, o cliente na mesa
- SONS: pingo da mensagem · certo em "topou" · ding em "celular"

#### 9 · plano `antes_agora` · ~5,0 s
> "Antes, o Bruno caçava restaurante um por um. Agora, ele já sabe em qual porta bater."

- NA TELA: (1) Antes: o escritório, o Bruno cansado na frente do mapa · (2) Agora: a porta da CANTINA DO ARI de noite,
  o Bruno bate, a porta abre e o seu Ari aparece
- MOSTRA: ["personagem", "mapa", "placa_cantina"]
- ENTRA AGORA: vermelha "Antes: um por um" · verde "Agora: a porta certa" ("porta")
- PERSONAGEM: cansado · em "Agora": bate na porta; o seu Ari abre e acena
- CÂMERA: (1) parado, médio, de lado, o mapa · (2) seguindo de trás, o Bruno chegando na porta
- SONS: errado no antes · ding da porta abrindo

#### 10 · plano `segue` · ~6,3 s
> "E você, abre cardápio em PDF? Comenta ABRO ou FECHO e segue. No computador, digita mappoa.com e testa você também."

- NA TELA: a mesa do Bruno; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- ENTRA AGORA: a pergunta "Abre cardápio em PDF? Comenta ABRO ou FECHO"; o cartão de seguir em "segue"; a barra em
  "computador", as letras em "digita"
- PERSONAGEM: chamando · em "digita": digitando
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- SONS: cliques · ding em "testa"
