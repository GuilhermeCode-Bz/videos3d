# Site de graça pra ganhar experiência: roteiro e ficha de cena

> Vídeo 8 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: clínicas de estética de Manaus. O Lucas, web designer de Manaus, já fez seis sites de graça "pra
> ganhar experiência" (da tia, do vizinho, da academia do amigo) e recebeu tapinha nas costas. No 1º quadro, num campo
> aberto, ele está atrás de uma mesinha com a faixa "SITES DE GRAÇA", entregando sites embrulhados de presente pra uma
> fila que vai até as montanhas. A conta de luz cai do céu em cima dele, ele decide investir o preço de um tacacá num
> sistema que acha quem precisa de site, acha a Clínica Bella Pele (só tinha Instagram), manda a mensagem, manda o
> orçamento, e sai o primeiro site pago.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (a fila sem fim de gente recebendo site embrulhado de
> presente), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (a fila, os presentes, a conta de
> luz), o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa entrando tarde como decisão de investir (sem
> valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como **sistema**, ~52 s e o pedido de
> comentário de UMA palavra no fim (EU ou NUNCA), sem prometer mandar nada.
> Cenários diferentes dos vídeos 1 a 7: o `natureza` (o campo com a fila sem fim), a `academia` (a academia do amigo),
> o `estudio` claro sem pedestal (a mesa do Lucas), o `estudio` azul-escuro com pedestal (o Mappoa) e o `salao_beleza`
> coberto como CLÍNICA BELLA PELE.

## Roteiro

1. Você fez o site de graça pra ganhar experiência. Se ninguém paga, vira hobby. *(gancho, a frase da pauta)*
2. O Lucas é web designer em Manaus e já fez seis sites assim: pra tia, pro vizinho, pro amigo.
3. Experiência ele ganhou. Mas tapinha nas costas não paga a conta de luz.
4. Então o Lucas decidiu investir o preço de um tacacá num sistema que acha quem precisa de site.
5. Digitou mappoa.com no computador, e veio a lista das clínicas de estética de Manaus, com e sem site.
6. Esse é o *Mappoa*: mostra quem tem mais chance de comprar e já deixa a mensagem pronta.
7. O Lucas mandou a mensagem pra Bella Pele, que só tinha Instagram, e a doutora Yara respondeu.
8. Mandou o orçamento, ela topou, e saiu o primeiro site pago, com agenda online.
9. Antes, ele dava site de presente. Agora, site é trabalho, e trabalho se cobra.
10. E você, já fez site de graça? Comenta EU ou NUNCA e segue. No computador, digita mappoa.com e testa você também.

Cerca de 160 palavras, uns 52 s com o cartão de seguir (~920 caracteres da ElevenLabs; sobram ~3.700).

**Gancho:** a frase da pauta. Outras opções pensadas: "Você deu o sexto site de presente. Ninguém pagou nenhum." e
"Site de graça dá experiência. Mas não paga o aluguel." Fiquei com a da pauta (situação + "se você fizer X, acontece
Y") e a imagem da pauta: a fila sem fim recebendo site embrulhado de presente.
1º quadro: o campo verde com as montanhas; a mesinha com a faixa amarela "SITES DE GRAÇA" e a pilha de caixas de
presente; o Lucas entregando uma caixa pra primeira pessoa; a fila de gente indo até sumir no horizonte.

**Capa:** "Site de *graça*?" (15 letras): o Lucas atrás da mesa cheia de presentes, com a mão na testa, e a fila sem
fim atrás dele.

## O que foi conferido

- Sem preço, sem plano e sem número falado do Mappoa; "o preço de um tacacá" (o de Manaus) é o espírito do investimento
- A Bella Pele "só tinha Instagram": o Mappoa conta Instagram no lugar do site como SEM site (`canal/produto.md`). A
  lista vem separada com e sem site; a análise traz o score de aderência, as dores ("Sem site: só Instagram",
  "Presença digital fraca") e a mensagem pronta. "Quem tem mais chance de comprar" é o score (permitido)
- O Mappoa gera a mensagem; quem manda é o Lucas. Nada de "garante a venda": a doutora "respondeu" e "topou" o
  orçamento que o Lucas mandou. A "agenda online" é o site que o Lucas fez, não um recurso do Mappoa
- "De graça" fala só dos sites do Lucas, nunca do Mappoa
- Telas desenhadas genéricas; clínicas e nomes inventados (os bairros são de Manaus)

## Cenários

`natureza` (o campo: a mesinha com a faixa, a pilha de presentes e a fila sem fim; frases 1, 3, 9 e a capa) →
`academia` (a academia do amigo, com a TV do site que ele fez de graça; frase 2) → `estudio` claro, sem pedestal, como
a mesa do Lucas (o computador, a cadeira, o quadro "LUCAS · WEB DESIGN"; frases 4, 5, 7 e 10) → `estudio`
azul-escuro, com pedestal (o painel gigante do Mappoa; frase 6) → `salao_beleza` coberto como CLÍNICA BELLA PELE
(frases 7 e 8). O amigo é o `K.personagem('personal')`, a doutora Yara é a `K.personagem('dona')` de blazer branco, e
a fila é feita de figurantes (`K.boneco`, os de perto) e silhuetas simples (os de longe).

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `personagem` | o Lucas (personagem do canal) | em todo lugar | 1-10 |
| `mesa_graca` | mesinha branca com a faixa amarela "SITES DE GRAÇA" em dois postes | campo, x -1, z 3 | 1, 3, 9, capa |
| `presentes` | pilha de caixas de presente (azul, rosa, verde) com a etiqueta "site" | na mesa e no chão | 1, 9, capa |
| `presente` | a caixa que o Lucas entrega (na mão dele, depois na da 1ª pessoa) | campo | 1, 9 |
| `fila` | a fila: 10 figurantes perto e ~30 silhuetas indo até as montanhas | campo, pra trás | 1, 9, capa |
| `amigo` | o amigo da academia (K.personagem personal) | academia | 2 |
| `tv_academia` | TV com o site "Academia do Beto" que o Lucas fez de graça | academia | 2 |
| `boleto` | a conta de luz gigante (2 x 2,8 m, "CONTA DE LUZ · VENCE HOJE") | campo | 3 |
| `monitor` | o computador do Lucas com a mesa e a cadeira | estúdio claro | 4, 5, 7, 10 |
| `tacaca` | a cuia de tacacá (caldo amarelo, jambu verde, camarão) | estúdio claro | 4 |
| `navegador` | a barra com mappoa.com | acima do monitor | 5, 10 |
| `tela` | painel do Mappoa: a lista das clínicas, a análise, a mensagem | estúdio claro e escuro | 5, 6, 7 |
| `dona` | a doutora Yara (K.personagem dona, blazer branco) | clínica | 7, 8, 9 |
| `celular` | celular gigante com o WhatsApp | clínica | 7 |
| `placa_bella` | placa "BELLA PELE · ESTÉTICA" por cima do letreiro do salão | clínica | 7, 8 |
| `tv_site` | o site novo da Bella Pele (agenda online) numa TV no pé | clínica | 8 |
| `contrato` | papel "ORÇAMENTO · SITE" com o carimbo PAGO | clínica | 8 |
| `robo` | robô do Mappoa acenando | estúdio claro | 10 |

## Teste dos substantivos

site / de graça / experiência (1: a faixa "SITES DE GRAÇA" e os presentes) · ninguém paga / hobby (1: a fila sem fim
e a etiqueta "Vira hobby") · Lucas / web designer / Manaus (2: etiquetas) · seis sites / tia / vizinho / amigo (2: o
contador "6 sites · R$ 0" e o amigo na academia com o site dele na TV) · experiência (3: etiqueta) · tapinha nas
costas (2 e 3: o amigo bate nas costas; 3: o balão "Valeu!") · conta de luz (3: o boleto gigante) · tacacá / sistema /
site (4) · mappoa.com / computador / lista / clínicas de estética / Manaus / com e sem site (5) · Mappoa / mais chance
de comprar / mensagem pronta (6: o score e a mensagem) · mensagem / Bella Pele / Instagram / doutora Yara / respondeu
(7) · orçamento / topou / site pago / agenda online (8: o contrato PAGO e a TV com a agenda) · antes / presente /
agora / trabalho / cobra (9: a fila e depois a mesa com "ORÇAMENTO") · você / site de graça / comenta / mappoa.com (10).

## Ficha de cena

#### 1 · plano `gancho` · ~4,3 s
> "Você fez o site de graça pra ganhar experiência. Se ninguém paga, vira hobby."

- NA TELA: o campo verde com as montanhas; à esquerda, a mesinha com a faixa amarela "SITES DE GRAÇA" e a pilha de
  presentes; o Lucas atrás dela; a 1ª pessoa da fila na frente da mesa; a fila indo pra trás até sumir no horizonte
- MOSTRA: ["personagem", "fila", "presentes"]
- CENÁRIO: natureza, borboletas e pássaros, nuvens
- ENTRA AGORA: no 1º quadro tudo já está lá; a caixa passa da mão do Lucas pra da 1ª pessoa (palavra "graça"); a
  etiqueta "Vira hobby" e o ✗ (palavra "hobby")
- OBJETOS SE MEXENDO: a caixa de presente indo de mão em mão; a fila balançando, gente olhando o relógio
- PERSONAGEM: o Lucas · começo: entrega a caixa sorrindo · em "paga": mão na testa, triste · a 1ª pessoa: recebe e
  sai feliz
- INTERAÇÃO: o Lucas entrega o site embrulhado pra fila
- CÂMERA: 4 cortes · (1) 0-0,8 s: aberto, alto, de trás da mesa pra frente, a fila sem fim · (2) 0,8-1,6 s: perto, de
  frente, a caixa passando de mão · (3) 1,6 s até "paga": teleobjetiva pela fila, as cabeças até o horizonte · (4) de
  "paga" ao fim: perto, o Lucas com a mão na testa
- EFEITOS VISUAIS: etiqueta vermelha "Vira hobby" (palavra "hobby") · ✗ vermelho
- SONS: whoosh no 1º quadro · pingo na entrega · errado em "hobby"

#### 2 · plano `lucas` · ~4,5 s
> "O Lucas é web designer em Manaus e já fez seis sites assim: pra tia, pro vizinho, pro amigo."

- NA TELA: a academia (TREINO, esteiras, halteres); a TV no pé com o site "Academia do Beto"; o Lucas e o amigo
  (personal, camiseta e apito) na frente dela
- MOSTRA: ["personagem", "amigo", "tv_academia"]
- CENÁRIO: academia
- ENTRA AGORA: etiqueta azul "Web designer" (palavra "designer"); azul "Manaus, AM" (palavra "Manaus"); o contador
  vermelho "6 sites · R$ 0" (palavra "seis")
- OBJETOS SE MEXENDO: a TV acende com o site; o contador
- PERSONAGEM: o Lucas · começo: mostra a TV, orgulhoso · em "amigo": o amigo dá um tapinha nas costas dele e o balão
  "Valeu, mano!" sai; o Lucas sorri sem graça
- INTERAÇÃO: o amigo bate nas costas do Lucas
- CÂMERA: (1) até "seis": chegando, perto, frente-esquerda, no Lucas e na TV · (2) passando, médio, direita, os dois
- EFEITOS VISUAIS: as etiquetas · o contador · balão "Valeu, mano!"
- SONS: pingo em "designer", errado em "seis", tapa em "amigo"

#### 3 · plano `conta` · ~3,8 s · jogo `falha`
> "Experiência ele ganhou. Mas tapinha nas costas não paga a conta de luz."

- NA TELA: o campo de novo, vazio: a fila foi embora, a mesa sem presentes; o Lucas sozinho atrás da mesa; a conta de
  luz gigante cai do céu do lado dele
- MOSTRA: ["personagem", "boleto", "mesa_graca"]
- CENÁRIO: natureza, o vento
- ENTRA AGORA: etiqueta verde "+ Experiência" (palavra "ganhou"); o boleto cai (palavra "conta")
- OBJETOS SE MEXENDO: o boleto cai girando e bate no chão; poeira
- PERSONAGEM: o Lucas · começo: faz "sim" com a cabeça, conformado · em "conta": cai sentado com o susto
- INTERAÇÃO: o boleto despenca do lado dele
- CÂMERA: (1) até "conta": chegando, médio, frente, o Lucas e a mesa vazia · (2) de baixo, aberto, o boleto gigante e ele
  caído
- EFEITOS VISUAIS: etiqueta verde "+ Experiência" · etiqueta vermelha "Conta de luz" · onda de choque no chão · o
  congela em preto e branco (o jogo)
- SONS: whoosh na queda, baque, errado

#### 4 · plano `investe` · ~4,2 s · jogo `corrige`
> "Então o Lucas decidiu investir o preço de um tacacá num sistema que acha quem precisa de site."

- NA TELA: o estúdio claro com a mesa do Lucas (computador, cadeira, quadro "LUCAS · WEB DESIGN"); o Lucas de pé com a
  cuia de tacacá; a cuia vai pro monitor e some num poof; a tela "Carregando... → Pronto!"
- MOSTRA: ["personagem", "tacaca", "monitor"]
- CENÁRIO: estudio claro
- ENTRA AGORA: a cuia na mão (palavra "investir"); "Investimento" (verde); "Acha quem precisa de site" (palavra
  "precisa")
- OBJETOS SE MEXENDO: em "sistema", a cuia desliza até o monitor girando e some; a barra enche
- PERSONAGEM: começo: faz que sim, decidido · em "sistema": aponta o monitor · em "site": comemora
- INTERAÇÃO: o Lucas troca o tacacá pelo sistema
- CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, frente-esquerda
- EFEITOS VISUAIS: etiquetas verdes · poof · ✪ (o jogo corrige)
- SONS: ding em "tacacá", whoosh, brilho, certo em "site"

#### 5 · plano `lista` · ~4,6 s
> "Digitou mappoa.com no computador, e veio a lista das clínicas de estética de Manaus, com e sem site."

- NA TELA: a barra com "mappoa.com" sendo digitado em cima do monitor; a lista das clínicas de estética de Manaus
  subindo do computador, com "com site" / "sem site" em cada uma
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: estudio claro
- ENTRA AGORA: a barra (palavra "Digitou"); a lista (palavra "lista"); uma clínica por vez (palavra "clínicas")
- OBJETOS SE MEXENDO: as letras de mappoa.com; o botão "Ir" fica verde; a lista sobe e cresce
- PERSONAGEM: começo: sentado digitando · em "lista": levanta surpreso e aponta a lista
- INTERAÇÃO: o Lucas digita o endereço e aponta a lista
- CÂMERA: (1) por cima do ombro, perto, o endereço · (2) chegando, médio, de frente, a lista e ele
- EFEITOS VISUAIS: etiqueta azul "Manaus, AM" (palavra "Manaus")
- SONS: cliques do teclado, brilho na lista, bip por clínica

#### 6 · plano `mappoa` · ~4,2 s
> "Esse é o *Mappoa*: mostra quem tem mais chance de comprar e já deixa a mensagem pronta."

- NA TELA: o estúdio azul-escuro; no pedestal, o painel gigante do Mappoa com a análise da Bella Pele (score subindo,
  dores) e depois a mensagem pronta; o Lucas do lado, com o holofote nele
- MOSTRA: ["tela", "personagem"]
- CENÁRIO: estudio escuro com pedestal
- ENTRA AGORA: o painel sobe do pedestal (palavra "Mappoa"); o rótulo "Mappoa"; a mensagem pronta (palavra "mensagem")
- OBJETOS SE MEXENDO: o score subindo; as dores aparecendo uma por uma; a mensagem se escrevendo
- PERSONAGEM: começo: surpreso, olhando o painel · em "chance": aponta o score · em "mensagem": braços pra cima
- INTERAÇÃO: o Lucas aponta a análise
- CÂMERA: (1) até "mensagem": subindo, médio, frente-esquerda, o painel e ele · (2) chegando, perto, direita, a mensagem
- EFEITOS VISUAIS: rótulo "Mappoa" · etiqueta verde "Mais chance de comprar" (palavra "chance") · verde "Mensagem
  pronta" (palavra "pronta")
- SONS: brilho em "Mappoa", certo em "pronta"

#### 7 · plano `mensagem` · ~4,4 s
> "O Lucas mandou a mensagem pra Bella Pele, que só tinha Instagram, e a doutora Yara respondeu."

- NA TELA: (1) o estúdio claro: o painel com a mensagem pronta pra Bella Pele; o Lucas aperta enviar · (2) em "doutora":
  a CLÍNICA BELLA PELE (paredes rosa, espelhos com luz, cadeiras); a doutora Yara de blazer branco com o celular
  gigante, que vibra e mostra a resposta
- MOSTRA: ["dona", "celular"]
- CENÁRIO: estudio claro → salao_beleza como Bella Pele
- ENTRA AGORA: etiqueta "Só Instagram" (palavra "Instagram"); a resposta "Me manda um orçamento!" (palavra "respondeu")
- OBJETOS SE MEXENDO: o celular vibra; a resposta aparece
- PERSONAGEM: o Lucas: aponta o botão de enviar · a doutora: lê surpresa · em "respondeu": comemora
- INTERAÇÃO: o Lucas manda; a doutora responde
- CÂMERA: (1) chegando, perto, frente, na tela e no Lucas · (2) passando, perto, esquerda, no celular e na doutora
- EFEITOS VISUAIS: etiqueta laranja "Só Instagram" · balão "Me manda um orçamento!" · ✓
- SONS: clique em "mandou", pingo do celular, certo em "respondeu"

#### 8 · plano `fechou` · ~3,8 s
> "Mandou o orçamento, ela topou, e saiu o primeiro site pago, com agenda online."

- NA TELA: dentro da Bella Pele; a TV no pé com o site novo (os horários da agenda online e o botão "Agendar"); o
  Lucas e a doutora apertando a mão; o papel "ORÇAMENTO" no balcãozinho com o carimbo PAGO
- MOSTRA: ["tv_site", "dona", "personagem"]
- CENÁRIO: salao_beleza como Bella Pele
- ENTRA AGORA: o carimbo PAGO (palavra "topou"); a etiqueta "Primeiro site pago" (palavra "pago"); os horários na TV
  (palavra "agenda")
- OBJETOS SE MEXENDO: o carimbo bate; os horários aparecem um por um
- PERSONAGEM: o Lucas e a doutora · começo: o aperto de mão · em "pago": o Lucas comemora, a doutora mostra a TV
- INTERAÇÃO: o aperto de mão; a doutora aponta o site
- CÂMERA: (1) até "pago": passando, perto, direita, no papel e nos dois · (2) chegando, médio, frente, na TV
- EFEITOS VISUAIS: etiqueta verde "Primeiro site pago" · ✓ na TV
- SONS: baque do carimbo, certo, ding em "agenda"

#### 9 · plano `antes_agora` · ~3,8 s · jogo `avanca`
> "Antes, ele dava site de presente. Agora, site é trabalho, e trabalho se cobra."

- NA TELA: (1) Antes: o campo com a fila sem fim e o Lucas entregando presente · (2) Agora: o mesmo campo, a fila sumiu,
  a faixa da mesa virou "SITES · ORÇAMENTO" e a doutora Yara aperta a mão do Lucas
- MOSTRA: ["mesa_graca", "personagem"]
- CENÁRIO: natureza
- ENTRA AGORA: etiqueta "Antes: de presente" (vermelha, começo); a faixa nova (palavra "Agora"); "Trabalho se cobra"
  (verde, palavra "cobra"); ✓
- OBJETOS SE MEXENDO: a caixa passando de mão; a faixa troca
- PERSONAGEM: o Lucas · antes: entrega cansado · agora: aperta a mão da doutora e comemora
- INTERAÇÃO: antes ele dá; agora ele fecha
- CÂMERA: (1) parado, médio, de lado, a mesa e a fila · (2) chegando, médio, de frente, a mesa nova
- EFEITOS VISUAIS: as duas etiquetas, ✗ e ✓
- SONS: errado no "Antes", certo e moedinha no "Agora"

#### 10 · plano `segue` · ~5,8 s
> "E você, já fez site de graça? Comenta EU ou NUNCA e segue. No computador, digita mappoa.com e testa você também."

- NA TELA: o estúdio claro; o Lucas de pé do lado do computador; a pergunta no topo; o cartão de seguir; a barra com
  mappoa.com; o robô do Mappoa acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: estudio claro
- ENTRA AGORA: a pergunta "Já fez site de graça? Comenta EU ou NUNCA" (começo); o cartão de seguir (palavra "segue");
  a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com; o botão Seguir apertado
- PERSONAGEM: começo: chamando, pra câmera · em "digita": digitando
- INTERAÇÃO: o Lucas digita mappoa.com
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, com o topo livre
- EFEITOS VISUAIS: a pergunta, o cartão de seguir
- SONS: cliques, ding em "testa", clique do Seguir
