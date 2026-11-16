# O portfólio só com o site do primo: roteiro e ficha de cena

> Vídeo 7 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: hamburguerias de Salvador. O Rafa, web designer começando, só tem UM projeto no portfólio: o site
> do lava-jato do primo. No 1º quadro, num palco de show, o portfólio dele é uma tela gigante e o primo, de camiseta
> laranja, está DENTRO da tela acenando pra cliente, que está na mesa de jurada de cara fechada. Ele fica preso no
> círculo "sem portfólio não fecha, sem fechar não tem portfólio", decide investir o preço de um acarajé num sistema que
> acha quem precisa de site, acha a Smash Bahia (só tinha Instagram), fecha o site dela, e esse vira o primeiro projeto
> de verdade do portfólio, do lado do primo.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (o primo acenando de dentro de uma tela de 4 metros num palco
> com refletores), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (o portfólio com 1 projeto só
> e a cliente dizendo não com a cabeça), o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa entrando tarde
> como decisão de investir (sem valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como
> **sistema**, ~54 s e o pedido de comentário de UMA palavra no fim (PRIMO ou CLIENTE), sem prometer mandar nada.
> Cenários diferentes dos vídeos 1 a 6: o `palco_show` (o show do portfólio), o `vazio_colorido` laranja (o círculo),
> a `agencia` coberta como COWORKING (a mesa do Rafa), a `fachada` da loja pizzaria coberta como SMASH BAHIA (a
> hamburgueria) e a `pizzaria` por dentro como a Smash Bahia.

## Roteiro

1. Seu portfólio só tem o site do seu primo. Se o cliente vê isso, ele não confia. *(gancho, a frase da pauta)*
2. O Rafa é web designer em Salvador, e o único site que ele fez foi o do primo.
3. Sem portfólio, ninguém fecha com ele. E sem fechar, ele nunca tem portfólio.
4. Então o Rafa decidiu investir o preço de um acarajé num sistema que acha quem precisa de site.
5. Digitou mappoa.com no computador, e veio a lista das hamburguerias de Salvador, com e sem site.
6. Esse é o *Mappoa*: mostra quem precisa de site e já deixa a mensagem pronta.
7. O Rafa mandou a mensagem pra Smash Bahia, que só tinha Instagram, e o seu Jorge respondeu.
8. Ele fechou o site da hamburgueria, com cardápio e pedido no WhatsApp.
9. E esse virou o primeiro projeto de verdade do portfólio, do lado do site do primo.
10. Antes, o portfólio era o primo. Agora, é cliente de verdade.
11. E o seu portfólio, tem primo? Comenta PRIMO ou CLIENTE e segue. No computador, digita mappoa.com e testa você também.

Cerca de 170 palavras, uns 54 s com o cartão de seguir (~980 caracteres da ElevenLabs; sobram ~4.600).

**Gancho:** a frase da pauta. Outras opções pensadas: "O único projeto do seu portfólio é o do primo. O cliente
percebe." e "O cliente abriu o seu portfólio. Se só tem o primo, ele fecha." Fiquei com a da pauta (situação + "se você
fizer X, acontece Y") e a imagem da pauta: o primo acenando de dentro da tela do portfólio.
1º quadro: o palco com os refletores coloridos, a tela gigante do portfólio ("Rafa Web · Portfólio · 1 projeto") e o
primo de camiseta laranja em pé DENTRO dela, acenando com os dois braços; o Rafa do lado, apontando a tela; a cliente
na mesa de jurada.

**Capa:** "Portfólio do *primo*?" (20 letras): o primo acenando de dentro da tela gigante do portfólio ("Lava-Jato do
Primo") e o Rafa na frente, com a mão na testa.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o preço de um acarajé" (o de Salvador) é o espírito do investimento
- A Smash Bahia "só tinha Instagram": o Mappoa conta Instagram no lugar do site como SEM site (`canal/produto.md`). A
  lista vem separada com e sem site, e a análise traz as dores ("Sem site, só Instagram", "Presença digital fraca") e a
  mensagem pronta
- O Mappoa gera a mensagem; quem manda é o Rafa. Nada de "garante a venda": o seu Jorge "respondeu", e quem fecha é o Rafa
- O "cardápio e pedido no WhatsApp" é o site que o Rafa fez, não um recurso do Mappoa
- Telas desenhadas genéricas; hamburguerias, sites e bairros inventados (os bairros são de Salvador)

## Cenários

`palco_show` (o show do portfólio: a tela gigante no meio do palco, o telão lá atrás, os refletores e a plateia; a mesa
de jurada da cliente à direita; frases 1, 2, 6, 9, 10 e a capa) → `vazio_colorido` laranja (o círculo: as duas placas e
as setas girando no chão; frase 3) → `agencia` coberta como COWORKING (a mesa do Rafa com o computador; frases 4, 5, 7 e
11) → `fachada` da pizzaria coberta como SMASH BAHIA, com as mesinhas na calçada (frase 7) → `pizzaria` por dentro como
a Smash Bahia (a placa, a TV com o site novo, o balcão; frase 8). A cliente do gancho é a `K.personagem('dona')`
(blazer vermelho), o seu Jorge é o `K.personagem('pizzaiolo')` (avental e chapéu) e o primo é um `K.boneco` de
camiseta laranja.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `portfolio` | a tela gigante do portfólio (4,4 x 3 m, moldura preta, pé), com o site "Rafa Web · Portfólio" e os cartões dos projetos | palco, x 0, z -2 | 1, 2, 9, 10, capa |
| `primo` | o primo (K.boneco, camiseta laranja), em pé dentro da tela | palco, x -1 | 1, 2, 9, 10, capa |
| `cliente` | a cliente (K.personagem dona, blazer vermelho), sentada na mesa de jurada | palco, x 3,8 | 1, 2, 10, capa |
| `mesa_jurada` | a mesa e a cadeira da cliente | palco | 1, 2, 10 |
| `personagem` | o Rafa (personagem do canal) | em todo lugar | 1-11 |
| `placas_ciclo` | as placas "PORTFÓLIO" e "CLIENTE" nos postes | vazio laranja | 3 |
| `setas` | duas setas curvas girando no chão em volta | vazio laranja | 3 |
| `monitor` | o computador do Rafa com a mesa e a cadeira | coworking | 4, 5, 7, 11 |
| `acaraje` | o acarajé (bolinho aberto, vatapá e camarão) no papel | coworking | 4 |
| `navegador` | a barra com mappoa.com | acima do monitor | 5, 11 |
| `tela` | painel do Mappoa: a lista das hamburguerias, a análise, a mensagem | coworking, palco | 5, 6, 7 |
| `telao` | o telão do palco: "PORTFÓLIO", depois a lista do Mappoa | palco | 1, 6 |
| `placa_smash` | placa, vitrine, ícone de hambúrguer e cavalete da SMASH BAHIA | fachada, dentro | 7, 8 |
| `dono` | o seu Jorge (K.personagem pizzaiolo) | fachada, dentro | 7, 8 |
| `celular` | celular gigante com o WhatsApp | fachada | 7 |
| `tv_site` | o site novo da Smash Bahia (cardápio e botão "Pedir no WhatsApp") na TV | dentro da Smash | 8 |
| `contrato` | papel "CONTRATO · SITE" com o carimbo FECHADO no balcão | dentro da Smash | 8 |
| `burger` | hambúrguer gigante no balcão | dentro da Smash | 8 |
| `robo` | robô do Mappoa acenando | coworking | 11 |

## Teste dos substantivos

portfólio / site do primo (1: a tela gigante com 1 projeto e o primo dentro) · cliente / não confia (1: a cliente na
mesa de jurada, "não" com a cabeça, ✗) · Rafa / web designer / Salvador (2: etiquetas) · único site / primo (2: "1
projeto" e o primo acenando) · portfólio / fecha / nunca (3: as placas PORTFÓLIO e CLIENTE e as setas girando) ·
acarajé / sistema / site (4) · mappoa.com / computador / lista / hamburguerias / Salvador / com e sem site (5) · Mappoa
/ quem precisa de site / mensagem pronta (6: o telão com a lista e o painel com a análise e a mensagem) · mensagem /
Smash Bahia / Instagram / seu Jorge / respondeu (7) · fechou / site / hamburgueria / cardápio / WhatsApp (8: a TV com o
site e o contrato) · primeiro projeto / portfólio / site do primo (9: o cartão novo entra do lado do primo) · antes /
primo / agora / cliente de verdade (10) · você / primo / cliente / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,3 s
> "Seu portfólio só tem o site do seu primo. Se o cliente vê isso, ele não confia."

- NA TELA: o palco de show escuro com os refletores; no meio, a tela gigante do portfólio ("Rafa Web · Portfólio ·
  Projetos: 1", o cartão "Lava-Jato do Primo" e um quadro vazio com "?"); o primo em pé dentro da tela, acenando; o Rafa
  à esquerda apontando a tela; a cliente na mesa de jurada à direita; o telão "PORTFÓLIO" lá atrás
- MOSTRA: ["portfolio", "primo", "cliente"]
- CENÁRIO: palco_show, refletores girando, a plateia no escuro com celulares acesos
- ENTRA AGORA: no 1º quadro tudo já está lá; o balão "Oi! Sou o primo!" (0,3 s); o ✗ em "confia"
- OBJETOS SE MEXENDO: o primo acena com os dois braços e pula; os refletores varrem o palco
- PERSONAGEM: o Rafa · começo: aponta a tela, orgulhoso · em "cliente": mão na testa · a cliente: em "vê", "não" com
  a cabeça, brava
- INTERAÇÃO: o Rafa apresenta a tela; o primo acena pra cliente
- CÂMERA: 4 cortes · (1) 0-0,8 s: aberto, de frente, a tela com o primo, o Rafa e a cliente · (2) 0,8-1,6 s: perto, de
  baixo, o primo acenando dentro da tela · (3) 1,6 s até "confia": de frente-lado pra cliente, ela de cara fechada na
  mesa de jurada · (4) de "confia" ao fim: perto, o Rafa com a mão na testa
- EFEITOS VISUAIS: balão de fala "Oi! Sou o primo!" · etiqueta vermelha "Só o primo" (palavra "primo") · ✗ vermelho
  (palavra "confia")
- SONS: whoosh no 1º quadro · pingo no balão · errado em "confia"

#### 2 · plano `rafa` · ~4,2 s
> "O Rafa é web designer em Salvador, e o único site que ele fez foi o do primo."

- NA TELA: o palco; o Rafa na frente da tela, sem graça; a tela com "Projetos: 1"; o primo acenando atrás
- MOSTRA: ["personagem", "portfolio", "primo"]
- CENÁRIO: palco_show
- ENTRA AGORA: etiqueta azul "Web designer" (palavra "designer"); azul "Salvador, BA" (palavra "Salvador"); vermelha
  "1 projeto só" (palavra "único")
- OBJETOS SE MEXENDO: o primo pula acenando; em "primo", o balão "De nada!"
- PERSONAGEM: o Rafa · começo: acena pra câmera, sem graça · em "único": encolhe os ombros ("sei lá")
- INTERAÇÃO: o Rafa aponta o primo com o polegar
- CÂMERA: (1) até "único": chegando, perto, frente-esquerda, no Rafa · (2) passando, médio, direita, na tela e no primo
  (frase 1: corte no Rafa de perto)
- EFEITOS VISUAIS: as três etiquetas · balão "De nada!"
- SONS: pingo em "designer", errado em "único"

#### 3 · plano `ciclo` · ~3,8 s · jogo `falha`
> "Sem portfólio, ninguém fecha com ele. E sem fechar, ele nunca tem portfólio."

- NA TELA: o fundo laranja infinito; à esquerda a placa azul "PORTFÓLIO", à direita a placa verde "CLIENTE"; duas setas
  brancas curvas girando no chão em volta; o Rafa correndo em círculo entre as placas
- MOSTRA: ["personagem", "placas_ciclo", "setas"]
- CENÁRIO: vazio_colorido laranja, as formas flutuando
- ENTRA AGORA: as placas caem do alto (começo); ✗ em cada placa (palavras "ninguém" e "nunca")
- OBJETOS SE MEXENDO: as setas giram sem parar; o Rafa corre o círculo
- PERSONAGEM: o Rafa · começo: correndo, assustado · em "nunca": cai sentado, tonto
- INTERAÇÃO: o Rafa corre atrás das setas e não sai do círculo
- CÂMERA: (1) até "fechar": girando, aberto, alto, de frente · (2) chegando, perto, nele caído (frase 2: médio, de lado)
- EFEITOS VISUAIS: ✗ nas placas · etiqueta vermelha "Ciclo sem fim" (palavra "fechar") · estrelinhas na cabeça · o
  congela em preto e branco (o jogo)
- SONS: passos rápidos · errado em "nunca" · baque ao cair

#### 4 · plano `investe` · ~4,0 s · jogo `corrige`
> "Então o Rafa decidiu investir o preço de um acarajé num sistema que acha quem precisa de site."

- NA TELA: o coworking (placa COWORKING, as mesas, o sofá); o Rafa de pé com o acarajé no papel; o acarajé vai pro
  monitor e some num poof; a tela "Carregando... → Pronto!"
- MOSTRA: ["personagem", "acaraje", "monitor"]
- CENÁRIO: agencia como coworking
- ENTRA AGORA: o acarajé na mão (palavra "investir"); "Investimento" (verde); "Acha quem precisa de site" (palavra
  "precisa")
- OBJETOS SE MEXENDO: em "sistema", o acarajé desliza até o monitor girando e some; a barra enche
- PERSONAGEM: começo: faz que sim, decidido · em "sistema": aponta o monitor · em "site": comemora
- INTERAÇÃO: o Rafa troca o acarajé pelo sistema
- CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, frente-esquerda (frase 3: no vazio laranja)
- EFEITOS VISUAIS: etiquetas verdes · poof · ✪ (o jogo corrige)
- SONS: ding em "acarajé", whoosh, brilho, certo em "site"

#### 5 · plano `lista` · ~4,4 s
> "Digitou mappoa.com no computador, e veio a lista das hamburguerias de Salvador, com e sem site."

- NA TELA: a barra com "mappoa.com" sendo digitado em cima do monitor; a lista das hamburguerias de Salvador subindo do
  computador, com "com site" / "sem site" em cada uma
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: coworking
- ENTRA AGORA: a barra (palavra "Digitou"); a lista (palavra "lista"); uma empresa por vez (palavra "hamburguerias")
- OBJETOS SE MEXENDO: as letras de mappoa.com; o botão "Ir" fica verde; a lista sobe e cresce
- PERSONAGEM: começo: sentado digitando · em "lista": levanta surpreso e aponta a lista
- INTERAÇÃO: o Rafa digita o endereço e aponta a lista
- CÂMERA: (1) por cima do ombro, perto, o endereço · (2) chegando, médio, de frente, a lista e ele
- EFEITOS VISUAIS: etiqueta azul "Salvador, BA" (palavra "Salvador")
- SONS: cliques do teclado, brilho na lista, bip por empresa

#### 6 · plano `mappoa` · ~4,0 s
> "Esse é o *Mappoa*: mostra quem precisa de site e já deixa a mensagem pronta."

- NA TELA: o palco de novo, agora com o telão mostrando a lista do Mappoa; o painel gigante com a análise da Smash Bahia
  (score, dores) e depois a mensagem pronta; o Rafa no palco, com o holofote nele
- MOSTRA: ["tela", "telao", "personagem"]
- CENÁRIO: palco_show
- ENTRA AGORA: o painel cai do alto (palavra "Mappoa"); o rótulo "Mappoa"; a mensagem pronta (palavra "mensagem")
- OBJETOS SE MEXENDO: o score subindo; as dores aparecendo uma por uma; a mensagem se escrevendo
- PERSONAGEM: começo: surpreso, olhando o painel · em "mensagem": braços pra cima, comemorando
- INTERAÇÃO: o Rafa aponta a análise
- CÂMERA: (1) até "mensagem": chegando, perto, frente, no painel e nele · (2) afastando, médio, esquerda, o telão e o painel
- EFEITOS VISUAIS: rótulo "Mappoa" · etiqueta verde "Quem precisa de site" (palavra "precisa") · verde "Mensagem
  pronta" (palavra "pronta")
- SONS: brilho em "Mappoa", certo em "pronta"

#### 7 · plano `mensagem` · ~4,4 s
> "O Rafa mandou a mensagem pra Smash Bahia, que só tinha Instagram, e o seu Jorge respondeu."

- NA TELA: (1) o coworking: o painel com a mensagem pronta pra Smash Bahia; o Rafa aperta enviar · (2) em "Jorge": a
  calçada da SMASH BAHIA (placa amarela, vitrine "SMASH BURGER", mesinhas); o seu Jorge com o celular gigante, que
  vibra com a mensagem e mostra a resposta
- MOSTRA: ["dono", "celular", "placa_smash"]
- CENÁRIO: coworking → fachada da Smash Bahia, carros passando
- ENTRA AGORA: etiqueta "Só Instagram" (palavra "Instagram"); a resposta "Quero um site!" (palavra "respondeu")
- OBJETOS SE MEXENDO: o celular vibra; a resposta aparece
- PERSONAGEM: o Rafa: aponta o botão de enviar · o seu Jorge: lê surpreso · em "respondeu": comemora
- INTERAÇÃO: o Rafa manda; o seu Jorge responde
- CÂMERA: (1) chegando, perto, frente, na tela e no Rafa · (2) passando, perto, direita, no celular e no seu Jorge
- EFEITOS VISUAIS: etiqueta laranja "Só Instagram" · balão "Quero um site!" · ✓
- SONS: clique em "mandou", pingo do celular, certo em "respondeu"

#### 8 · plano `fechou` · ~3,6 s
> "Ele fechou o site da hamburgueria, com cardápio e pedido no WhatsApp."

- NA TELA: dentro da Smash Bahia (placa SMASH BAHIA na parede de tijolo, o forno, o balcão com o hambúrguer gigante); a
  TV com o site novo (os burgers do cardápio e o botão verde "Pedir no WhatsApp"); o Rafa e o seu Jorge apertando a
  mão; o contrato no balcão
- MOSTRA: ["tv_site", "dono", "personagem"]
- CENÁRIO: pizzaria como a Smash Bahia
- ENTRA AGORA: o carimbo FECHADO no contrato (palavra "fechou"); o cardápio na TV (palavra "cardápio"); o botão do
  WhatsApp pisca (palavra "WhatsApp")
- OBJETOS SE MEXENDO: o carimbo bate; os burgers do cardápio aparecem um por um
- PERSONAGEM: o Rafa e o seu Jorge · começo: o aperto de mão · em "cardápio": o seu Jorge mostra a TV, o Rafa comemora
- INTERAÇÃO: o aperto de mão; o seu Jorge aponta o site
- CÂMERA: (1) até "cardápio": passando, perto, esquerda, no contrato e nos dois · (2) chegando, médio, frente, na TV
- EFEITOS VISUAIS: etiqueta verde "Primeiro cliente" (palavra "fechou") · ✓ na TV
- SONS: baque do carimbo, certo, ding em "WhatsApp"

#### 9 · plano `vira` · ~4,0 s
> "E esse virou o primeiro projeto de verdade do portfólio, do lado do site do primo."

- NA TELA: o palco; a tela gigante do portfólio; o cartão novo "Smash Bahia" entra no quadro vazio com o selo NOVO; o
  contador vira "Projetos: 2"; o primo, dentro da tela, aplaude
- MOSTRA: ["portfolio", "primo", "personagem"]
- CENÁRIO: palco_show
- ENTRA AGORA: o cartão novo (palavra "virou"); o selo "NOVO"; a etiqueta "Projeto de verdade" (palavra "verdade")
- OBJETOS SE MEXENDO: o cartão cresce no lugar do "?"; o número troca de 1 pra 2
- PERSONAGEM: o Rafa · começo: aponta o cartão novo · em "primo": comemora · o primo aplaude
- INTERAÇÃO: o Rafa mostra o projeto novo; o primo aplaude
- CÂMERA: (1) até "portfólio": chegando, perto, de frente, no cartão novo · (2) passando, médio, esquerda, o primo e o
  Rafa
- EFEITOS VISUAIS: etiqueta verde "Projeto de verdade" · ✓ · poof no cartão
- SONS: estalo no cartão, brilho, certo

#### 10 · plano `antes_agora` · ~3,6 s · jogo `avanca`
> "Antes, o portfólio era o primo. Agora, é cliente de verdade."

- NA TELA: (1) Antes: a tela só com o primo e o "?", a cliente de cara fechada dizendo não · (2) Agora: a tela com os
  dois cartões, a cliente aplaudindo e o Rafa agradecendo com o holofote nele
- MOSTRA: ["portfolio", "cliente", "personagem"]
- CENÁRIO: palco_show
- ENTRA AGORA: etiqueta "Antes: só o primo" (vermelha, começo); "Cliente de verdade" (verde, palavra "cliente"); ✓
- OBJETOS SE MEXENDO: o cartão novo acende; os refletores
- PERSONAGEM: o Rafa · antes: mão na testa · agora: comemora · a cliente: "não" → aplaude
- INTERAÇÃO: a cliente aplaude o portfólio
- CÂMERA: (1) parado, perto, de frente-lado pra cliente na mesa de jurada · (2) chegando, médio, de frente, o palco todo
- EFEITOS VISUAIS: as duas etiquetas, ✗ e ✓
- SONS: errado no "Antes", certo e palmas no "Agora"

#### 11 · plano `segue` · ~5,8 s
> "E o seu portfólio, tem primo? Comenta PRIMO ou CLIENTE e segue. No computador, digita mappoa.com e testa você também."

- NA TELA: o coworking; o Rafa de pé do lado do computador; a pergunta no topo; o cartão de seguir; a barra com
  mappoa.com; o robô do Mappoa acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: coworking
- ENTRA AGORA: a pergunta "Tem primo no portfólio? Comenta PRIMO ou CLIENTE" (começo); o cartão de seguir (palavra
  "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com; o botão Seguir apertado
- PERSONAGEM: começo: chamando, pra câmera · em "digita": digitando
- INTERAÇÃO: o Rafa digita mappoa.com
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, com o topo livre
- EFEITOS VISUAIS: a pergunta, o cartão de seguir
- SONS: cliques, ding em "testa", clique do Seguir
