# Chegou depois: roteiro e ficha de cena

> Vídeo 6 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: escolas de idiomas de Belo Horizonte. O Igor, web designer sem cliente, levou a semana inteira
> caçando escola no Google, uma por uma, e só na sexta achou a Escola Fala BH, da dona Lúcia. Outro web designer (moletom
> vermelho) achou na segunda e fechou o site novo antes. No 1º quadro, o outro passa VOANDO na frente do Igor pela porta
> de vidro da escola, e a porta bate na cara dele: o Igor fica achatado no vidro, vendo o aperto de mão lá dentro. O Igor
> decide investir o preço de um tropeiro (o prato de BH) num sistema que acha quem precisa de site, e na segunda cedo é
> ele quem bate primeiro na porta de outra escola.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (um homem voando de peixinho pela porta, com as linhas de
> velocidade, e o Igor correndo atrás), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (a porta
> fechada na cara = o cliente que outro fechou antes), o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa
> entrando tarde como decisão de investir (sem valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa
> como **sistema**, ~52 s e o pedido de comentário de UMA palavra no fim (PRIMEIRO ou DEPOIS), sem prometer mandar nada.
> Outro cenário e outra composição que os vídeos 1 a 5: a `fachada` de uma escola com a porta de vidro que abre de
> verdade (filmada também DE DENTRO, pelo vidro), o quintal da `casa` do Igor (de dia e de tarde), a sala de aula da
> escola (`sala_reuniao`, com a TV mostrando o site novo) e a `cidade_maquete` com o Igor gigante no lugar do palco ou
> da central do Mappoa. A 2ª escola (Speak Up, do seu Márcio) é outra fachada, verde-água.

## Roteiro

1. A escola do lado fechou o site com outro. Se você chegou depois, chegou tarde. *(gancho, a frase da pauta)*
2. O Igor é web designer, tá sem cliente, e acabou de levar essa porta na cara.
3. Ele passou a semana caçando escola de idiomas no Google, uma por uma.
4. Achou a da dona Lúcia na sexta. O outro web designer achou na segunda.
5. Quando o Igor chegou, ela já tinha fechado o site novo com ele.
6. Então o Igor decidiu investir o preço de um tropeiro num sistema que acha quem precisa de site.
7. Digitou mappoa.com no computador, e veio a lista das escolas de idiomas de BH, com e sem site.
8. Esse é o *Mappoa*: mostra quem precisa de site, pra você não chegar depois.
9. Na segunda cedo, ele mandou a mensagem pronta, e o seu Márcio, de outra escola, pediu um site.
10. Antes, o Igor chegava depois. Agora, a porta abre pra ele primeiro.
11. E você, chega primeiro ou depois? Comenta PRIMEIRO ou DEPOIS e segue. No computador, digita mappoa.com e testa você também.

Cerca de 165 palavras, uns 52 s com o cartão de seguir (~950 caracteres da ElevenLabs; sobram ~5.500).

**Gancho:** a frase da pauta. Outras opções pensadas: "Ele chegou um dia depois. A porta já tinha fechado." e "O
outro web designer passou voando. O cliente era seu." Fiquei com a da pauta (situação + "se você fizer X, acontece Y")
e a imagem da pauta: o outro passando na frente pela porta e a porta batendo na cara do Igor.
1º quadro: o outro web designer, de moletom vermelho, voando de peixinho pela porta aberta da escola, com as linhas de
velocidade, e o Igor correndo atrás; em ~0,9 s a porta bate e ele fica achatado no vidro.

**Capa:** "Chegou *tarde*?" (14 letras), vista de dentro da escola: o Igor achatado no vidro da porta, com a plaquinha
FECHADO, e o aperto de mão do outro com a dona Lúcia na frente.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o preço de um tropeiro" (o feijão tropeiro de BH) é o espírito do
  investimento
- O Mappoa **não** avisa quem acabou de abrir nem "quem chegou primeiro" (`canal/produto.md`). A virada é ele achar as
  escolas de idiomas de BH de uma vez, separar com site e sem site, e a análise da IA escrever as dores ("Site
  desatualizado", "Presença digital fraca", que o produto.md permite). "Pra você não chegar depois" quer dizer: com a
  lista na mão, o Igor não passa mais a semana caçando uma por uma no Google
- O Mappoa gera a mensagem; quem manda é o Igor. Nada de "garante a venda": o seu Márcio só "pediu um site"
- Telas desenhadas genéricas; escolas, sites e endereços inventados

## Cenários

`fachada` (loja salão, coberta com a placa "ESCOLA FALA BH", os cartazes de matrícula nas vitrines e o cavalete; frases
1, 2, 4, 10 e a capa; a câmera também fica DENTRO da loja olhando a porta) → `casa` (o quintal do Igor: a mesa com o
computador e o calendário grande no gramado, a casa atrás; de dia e de tarde) → `sala_reuniao` (a sala de aula da escola,
com a TV mostrando o site novo) → `cidade_maquete` (BH em miniatura, o Igor gigante) → a 2ª `fachada` (loja clínica,
verde-água, coberta como "SPEAK UP IDIOMAS"; frases 9 e 10). A dona Lúcia é o `K.personagem('dona')`, o seu Márcio é o
`K.personagem('dono')` e o outro web designer é um `K.boneco` de moletom vermelho.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `porta` | a porta de vidro da escola (a do cenário), que abre e bate | fachada, x 1,6 | 1, 2, 4, 10, capa |
| `placa_escola` | placa "ESCOLA FALA BH" (ou "SPEAK UP IDIOMAS") e os cartazes "MATRÍCULAS ABERTAS" nas vitrines | fachada | 1, 2, 4, 9, 10 |
| `fechado` | plaquinha vermelha FECHADO no vidro da porta | na porta | 1, 2, 10, capa |
| `outro` | o outro web designer (K.boneco, moletom vermelho, calça escura) | fachada, sala | 1, 4, 5, 10, capa |
| `dona` | a dona Lúcia (K.personagem dona) | dentro da escola, sala | 1, 5, capa |
| `personagem` | o Igor (personagem do canal) | em todo lugar | 1-11 |
| `monitor` | computador do Igor com mesa e cadeira, no quintal | casa | 3, 6, 7, 9, 11 |
| `calendario` | calendário grande num cavalete, com o dia da semana (SEG... SEX) | casa, fachada | 3, 4, 9 |
| `tv_site` | o site novo da Escola Fala BH na TV da sala | sala | 5 |
| `contrato` | papel "CONTRATO · SITE NOVO" com o carimbo FECHADO | mesa da sala | 5 |
| `tropeiro` | prato de feijão tropeiro (feijão, farofa, couve, ovo, torresmo, linguiça) | casa | 6 |
| `navegador` | a barra com mappoa.com | acima do monitor | 7, 11 |
| `tela` | painel do Mappoa: a lista das escolas, a análise, a mensagem pronta | casa, maquete | 7, 8, 9 |
| `pinos` | pinos do mapa brotando nas escolas da maquete | maquete | 8 |
| `dono` | o seu Márcio (K.personagem dono) | 2ª fachada | 9, 10 |
| `celular` | celular gigante com o WhatsApp | 2ª fachada | 9 |
| `robo` | robô do Mappoa acenando | casa | 11 |

## Teste dos substantivos

escola do lado / fechou / site (1: a fachada da Escola Fala BH, a porta batendo, a plaquinha FECHADO) · outro (1: o de
moletom vermelho voando) · chegou depois / tarde (1: o Igor achatado no vidro, ✗) · Igor / web designer / cliente (2:
etiquetas) · porta na cara (2: a porta com FECHADO e ele caído) · semana / escola de idiomas / Google / uma por uma (3: o
calendário virando SEG→SEX, a busca no monitor, os papéis voando) · dona Lúcia / sexta (4: o calendário SEX, ✗) · outro
web designer / segunda (4: o calendário SEG e a porta abrindo pra ele, ✓) · Igor chegou / site novo / fechado (5: a TV
com o site novo, o contrato carimbado, o Igor na porta da sala) · tropeiro / sistema / site (6) · mappoa.com /
computador / lista / escolas de idiomas / BH / com e sem site (7) · Mappoa / quem precisa de site / chegar depois (8: os
pinos e a análise) · segunda cedo / mensagem / seu Márcio / outra escola / site (9) · chegava depois (10: Antes, o vidro)
· porta abre / primeiro (10: Agora, a porta da Speak Up abrindo) · você / primeiro / depois / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,2 s
> "A escola do lado fechou o site com outro. Se você chegou depois, chegou tarde."

- NA TELA: a calçada da Escola Fala BH (placa rosa, cartazes "MATRÍCULAS ABERTAS" nas vitrines, a porta de vidro aberta);
  o outro web designer de moletom vermelho voando de peixinho pela porta; o Igor correndo atrás; depois o Igor achatado
  no vidro da porta fechada
- MOSTRA: ["porta", "personagem"]
- CENÁRIO: fachada de dia, os carros passando na rua
- ENTRA AGORA: nada entra: no 1º quadro tudo já está lá; a plaquinha FECHADO vira no vidro quando a porta bate (~0,9 s)
- OBJETOS SE MEXENDO: o outro voa da calçada pra dentro (0-0,7 s); a porta bate de aberta pra fechada (0,8-0,95 s); o
  Igor se achata no vidro (0,95 s) e escorrega devagar até "tarde"
- PERSONAGEM: o Igor · começo: correndo, assustado · na batida: achatado, olhos fechados · em "tarde": escorrega, triste
  · o outro e a dona Lúcia, lá dentro: o aperto de mão
- INTERAÇÃO: o outro passa pela porta; a porta bate na cara do Igor
- CÂMERA: 4 cortes · (1) 0-0,8 s: de fora, da rua, a porta e os dois correndo · (2) 0,8-1,6 s: de baixo, de lado, a
  porta batendo e o Igor colando no vidro · (3) 1,6 s até "tarde": DE DENTRO da escola, o aperto de mão na frente e o
  Igor achatado no vidro atrás · (4) de "tarde" ao fim: de fora, perto, ele escorregando
- EFEITOS VISUAIS: linhas de velocidade no outro · onda de choque na batida · etiqueta vermelha "Fechou com outro"
  (palavra "fechou") · ✗ vermelho (palavra "tarde")
- SONS: whoosh no 1º quadro · passos · baque na batida · errado em "tarde"

#### 2 · plano `igor` · ~4,0 s
> "O Igor é web designer, tá sem cliente, e acabou de levar essa porta na cara."

- NA TELA: a calçada; o Igor caído sentado na frente da porta fechada, com a plaquinha FECHADO; em "porta", a porta de
  perto com FECHADO
- MOSTRA: ["personagem", "porta"]
- CENÁRIO: fachada, carros passando
- ENTRA AGORA: etiqueta "Web designer" (palavra "designer"); "Sem cliente" (palavra "cliente"); "Porta na cara"
  (palavra "porta")
- OBJETOS SE MEXENDO: estrelinhas (poof) em volta da cabeça dele no começo
- PERSONAGEM: começo: cai sentado, tonto · em "cliente": coça a cabeça · em "porta": aponta a porta, bravo
- INTERAÇÃO: o Igor aponta a porta que bateu nele
- CÂMERA: (1) até "porta": chegando, perto, frente-esquerda, olho · (2) passando, perto, direita, na porta e nele
  (frase 1: de fora, perto, de frente)
- EFEITOS VISUAIS: as etiquetas azul, vermelha e vermelha
- SONS: pingo em "cliente", errado em "porta"

#### 3 · plano `procura` · ~3,6 s
> "Ele passou a semana caçando escola de idiomas no Google, uma por uma."

- NA TELA: o quintal da casa do Igor, de tarde; o Igor sentado no computador com a busca do Google; do lado, o calendário
  grande virando SEG, TER, QUA, QUI, SEX; papéis voando
- MOSTRA: ["personagem", "calendario", "monitor"]
- CENÁRIO: casa de tarde, a árvore com o balanço, a casa atrás
- ENTRA AGORA: cada dia do calendário (a partir de "semana"); a etiqueta "Uma por uma..." (palavra "uma")
- OBJETOS SE MEXENDO: a folha do calendário vira e voa a cada dia; a busca troca de resultado
- PERSONAGEM: sentado · começo: digitando · em "uma": mão na testa, cansado
- INTERAÇÃO: o Igor digita a busca; o calendário corre
- CÂMERA: (1) até "Google": girando, médio, esquerda, no calendário e nele · (2) afastando, médio, direita (frase 2: na
  calçada)
- EFEITOS VISUAIS: etiqueta vermelha "Uma por uma..." · papéis voando
- SONS: um clique por dia, whoosh das folhas

#### 4 · plano `achou` · ~3,8 s · jogo `falha`
> "Achou a da dona Lúcia na sexta. O outro web designer achou na segunda."

- NA TELA: (1) o quintal: o Igor de pé, comemorando, o calendário em SEX e o site da Fala BH no monitor · (2) em "outro":
  a calçada da Fala BH; o outro de moletom vermelho chegando, a porta abrindo pra ele, e o calendário grande em SEG do lado
- MOSTRA: ["personagem", "calendario", "outro"]
- CENÁRIO: casa de dia → fachada
- ENTRA AGORA: ✗ vermelho em "sexta"; o calendário SEG e o ✓ verde em "segunda"
- OBJETOS SE MEXENDO: a porta abre pro outro (palavra "segunda"), com o sino
- PERSONAGEM: o Igor · começo: comemorando · em "sexta": a cara cai · o outro: chega andando e entra feliz
- INTERAÇÃO: a porta se abre pro outro
- CÂMERA: (1) até "outro": chegando, perto, frente · (2) passando, médio, de fora, a porta e o outro (frase 3: médio,
  afastando)
- EFEITOS VISUAIS: etiqueta vermelha "Sexta" e ✗ · verde "Segunda" e ✓ · congela em preto e branco (o jogo)
- SONS: errado em "sexta" · ding da porta e certo em "segunda"

#### 5 · plano `fechou` · ~3,4 s
> "Quando o Igor chegou, ela já tinha fechado o site novo com ele."

- NA TELA: a sala de aula da escola; a TV com o site novo da Escola Fala BH; a dona Lúcia e o outro na frente da TV, ela
  mostrando o site; o contrato na mesa; o Igor chegando pela direita
- MOSTRA: ["tv_site", "dona", "outro"]
- CENÁRIO: sala_reuniao (a mesa comprida, as cadeiras, os notebooks, a lousa)
- ENTRA AGORA: o site novo na TV acende (começo); o carimbo FECHADO no contrato (palavra "fechado")
- OBJETOS SE MEXENDO: o carimbo bate no contrato
- PERSONAGEM: a dona Lúcia mostrando a TV · o outro comemorando · o Igor: chega e em "fechado" fica triste
- INTERAÇÃO: a dona Lúcia apresenta o site do outro; o Igor vê
- CÂMERA: (1) até "fechado": chegando, médio, frente · (2) passando, perto, esquerda, no contrato e no Igor (frase 4: de
  fora)
- EFEITOS VISUAIS: etiqueta vermelha "Site fechado" (palavra "fechado") · ✓ no contrato
- SONS: whoosh, baque do carimbo

#### 6 · plano `investe` · ~4,2 s · jogo `corrige`
> "Então o Igor decidiu investir o preço de um tropeiro num sistema que acha quem precisa de site."

- NA TELA: o quintal de dia; o Igor de pé ao lado da mesa com o prato de feijão tropeiro; o prato desliza até o monitor e
  some num poof; o monitor carrega
- MOSTRA: ["personagem", "tropeiro", "monitor"]
- CENÁRIO: casa de dia
- ENTRA AGORA: o prato aparece na mão (palavra "investir") · a etiqueta verde "Investimento"
- OBJETOS SE MEXENDO: o prato vai pro monitor girando e encolhendo e some num poof (palavra "sistema"); a barra enche
- PERSONAGEM: começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
- INTERAÇÃO: o Igor "investe" o tropeiro no computador
- CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda (frase 5: na sala)
- EFEITOS VISUAIS: "Investimento" verde · "Acha quem precisa de site" verde (palavra "precisa")
- SONS: ding em "tropeiro" · whoosh · brilho no poof · certo

#### 7 · plano `lista` · ~4,2 s
> "Digitou mappoa.com no computador, e veio a lista das escolas de idiomas de BH, com e sem site."

- NA TELA: a barra com mappoa.com acima do monitor; a lista das escolas de idiomas de BH sobe do computador, com as
  pílulas "com site" e "sem site"
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: casa de dia
- ENTRA AGORA: a barra cresce (palavra "Digitou"); a lista sobe do monitor (palavra "lista")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; as escolas entrando uma por uma
- PERSONAGEM: começo: digitando · em "lista": levanta e aponta a lista
- INTERAÇÃO: o Igor digita e aponta a lista
- CÂMERA: (1) por cima do ombro olhando o endereço, perto, esquerda · (2) chegando, médio, frente (frase 6: passando)
- EFEITOS VISUAIS: etiqueta azul "Belo Horizonte, MG" (palavra "BH")
- SONS: cliques, brilho, bips

#### 8 · plano `mappoa` · ~3,6 s
> "Esse é o *Mappoa*: mostra quem precisa de site, pra você não chegar depois."

- NA TELA: BH em miniatura; o Igor gigante no meio dos prediozinhos; o painel do Mappoa flutuando com a análise da Speak
  Up (aderência, "DORES PROVÁVEIS"); os pinos vermelhos brotando nas escolas
- MOSTRA: ["tela", "pinos", "personagem"]
- CENÁRIO: cidade_maquete, os carrinhos andando nas ruas
- ENTRA AGORA: o painel cai do alto (palavra "Mappoa"); os pinos brotam um por um (palavra "precisa")
- OBJETOS SE MEXENDO: os blocos da análise aparecendo; os pinos pulando
- PERSONAGEM: começo: surpreso, olhando os pinos · em "depois": ergue os braços
- INTERAÇÃO: o Igor aponta os pinos das escolas
- CÂMERA: (1) chegando, perto, frente, alto, no painel e nele · (2) afastando, perto, esquerda, alto, nos pinos (frase
  7: médio, frente, no quintal)
- EFEITOS VISUAIS: rótulo "Mappoa" · "Quem precisa de site" verde · "Antes dos outros" verde (palavra "depois")
- SONS: brilho, estalos dos pinos, certo

#### 9 · plano `mensagem` · ~4,4 s
> "Na segunda cedo, ele mandou a mensagem pronta, e o seu Márcio, de outra escola, pediu um site."

- NA TELA: (1) o quintal: o calendário em SEG, o Igor de pé apontando a mensagem pronta do Mappoa · (2) em "Márcio": a
  fachada verde-água da Speak Up Idiomas; o seu Márcio na calçada com o celular gigante mostrando a mensagem e a resposta
- MOSTRA: ["dono", "celular"]
- CENÁRIO: casa de dia → 2ª fachada
- ENTRA AGORA: a mensagem (palavra "mandou"); a bolha da resposta (palavra "pediu")
- OBJETOS SE MEXENDO: o celular gigante vibra quando a mensagem chega
- PERSONAGEM: o Igor aponta o enviar · o seu Márcio: lê, surpreso · em "pediu": comemora
- INTERAÇÃO: o Igor manda; o seu Márcio lê e responde
- CÂMERA: (1) até "Márcio": chegando, perto, frente, na tela e no Igor · (2) passando, perto, direita, no celular e no
  seu Márcio (frase 8: na maquete)
- EFEITOS VISUAIS: etiqueta verde "Segunda cedo" (palavra "segunda") · balão de fala "Quero um site novo!" · ✓
- SONS: clique no enviar · pingo da mensagem · certo em "pediu"

#### 10 · plano `antes_agora` · ~3,6 s · jogo `avanca`
> "Antes, o Igor chegava depois. Agora, a porta abre pra ele primeiro."

- NA TELA: (1) Antes: a porta rosa da Fala BH fechada, o Igor achatado no vidro com FECHADO · (2) Agora: a porta da
  Speak Up abrindo, o seu Márcio lá dentro acenando, o Igor entrando; atrás, o outro de moletom vermelho chega correndo e
  leva a porta na cara
- MOSTRA: ["personagem", "porta", "dono"]
- CENÁRIO: fachada → 2ª fachada
- ENTRA AGORA: "Chegava depois" vermelho (Antes); a porta abre (palavra "abre"); "Primeiro" verde (palavra "primeiro")
- OBJETOS SE MEXENDO: a porta abre com o sino; fecha de novo na cara do outro
- PERSONAGEM: Antes: achatado, triste · Agora: o Igor entra comemorando, o seu Márcio acenando, o outro achatado no vidro
- INTERAÇÃO: a porta abre pro Igor e bate no outro
- CÂMERA: (1) parado, perto, de lado, na porta · (2) chegando, médio, frente (frase 9: perto, direita)
- EFEITOS VISUAIS: as duas etiquetas · o ⏩ do jogo
- SONS: errado no Antes, ding e certo no Agora, baque no outro

#### 11 · plano `segue` · ~6,5 s
> "E você, chega primeiro ou depois? Comenta PRIMEIRO ou DEPOIS e segue. No computador, digita mappoa.com e testa você também."

- NA TELA: o Igor de pé no quintal; a pergunta no topo; depois o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: casa de dia
- ENTRA AGORA: a pergunta (no começo); o cartão de seguir (palavra "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; o botão Seguir apertado
- PERSONAGEM: começo: chamando · em "digita": digitando
- INTERAÇÃO: o Igor digita mappoa.com; o robô acena
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- EFEITOS VISUAIS: a pergunta "Chega primeiro ou depois? Comenta PRIMEIRO ou DEPOIS" · o cartão de seguir
- SONS: cliques, ding em "testa", o clique do Seguir
