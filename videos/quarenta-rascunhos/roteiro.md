# Quarenta rascunhos: roteiro e ficha de cena

> Vídeo 2 do lote da nuvem no molde de 45 s (`canal/lote-nuvem-45s.md`). Metáfora: o web designer soterrado até o
> pescoço em bolas de papel amassado (os rascunhos da mensagem que ele nunca manda). Dor: a vergonha de abordar.
> Rival: quem mandou a mensagem torta e fechou. Virada: ele sai do papel e investe no sistema; no fim, aperta Enviar
> até com a testa. Nicho e cidade: estúdios de fotografia de Jundiaí.

## Roteiro

1. Ele escreveu a mensagem quarenta vezes. E não mandou nenhuma. *(gancho, 10 palavras)*
2. O Nico é web designer e trava no Enviar: e se acharem ele amador? *(14)*
3. Apaga, reescreve, amassa. Uma semana depois, tá no rascunho quarenta e um. *(12)*
4. E o estúdio de fotografia da esquina continua sem site e sem cliente. *(13)*
5. Outro web designer manda uma mensagem torta, cheia de erro. E fecha. *(12)*
6. Então o Nico sai do papel e decide investir. *(9)*
7. Digita mappoa.com no computador e vem a lista dos estúdios de fotografia de Jundiaí sem site. *(16)*
8. Esse é o *Mappoa*, um sistema que mostra quem tem mais chance de te contratar. *(15)*
9. Antes, quarenta rascunhos pra ninguém. Agora, ele manda pra quem precisa. Aperta Enviar até com a testa. *(17)*
10. Segue pra ver mais. No computador, digita mappoa.com e testa você também. *(12)*

130 palavras, uns 43 s de fala + 1,6 s do cartão. mappoa.com na palavra ~71 (~22 s).

**Frase da capa (topo, desde o 1º quadro):** "Quarenta *rascunhos*?"

O que apliquei do canal: molde de 45 s (`canal/formato-campeao.md`), gancho em 3ª pessoa com fim em aberto (17/11),
o web designer na frase 2, a decisão de investir curta e sem valor (12/11), mappoa.com "no computador" na entrada do
Mappoa (11/11), o nome numa frase só, Antes x Agora voltando pra metáfora e o fim fixo de 17/11 com o cartão na
palavra "Segue".

## Conferido (nada inventado)

- A narração não traz número de pesquisa. "Quarenta" é o exagero da história, não um dado
- Jundiaí (SP) tem estúdios de fotografia; o nome do estúdio e os da lista são inventados

## Ficha de cena

**Cenários (4 lugares, `K.cenarios`):**
- `quarto` (`home_office` de dia) e `quarto_noite` (o mesmo de noite): o quarto do Nico, com a janela, o ring light e a
  mesa. O computador do canal fica em [-0,5, 0, -1,3], a cadeira giratória no SEAT [-0,5, 0, -0,62]
- `estudio` (fundo infinito lilás-claro, sem pedestal): vira o estúdio de fotografia da esquina, com o tripé e a câmera,
  2 softboxes, a banqueta de foto e o letreiro neon "FOCO ESTÚDIO"
- `mundo_mappoa`: o palco da marca, com o logo gigante (só no "Esse é o Mappoa")

**Personagem:** o Nico, o menino do canal (camiseta azul `#2f6fd6`, bermuda `#2f6f5e`, tênis `#f4f1ea`, cabelo
`#7a4a22`, pele `#e6b48a`). **Outros:** a dona do estúdio (`K.personagem('dona')`), o outro web designer (moletom laranja)
e o robô do Mappoa.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Nico | `K.boneco` com as cores do canal | 1,47 | quarto, sentado no SEAT ou em pé | 1, 2, 3, 6, 7, 8, 9, 10 |
| `papel` | o monte de bolas de papel amassado (até ~420 bolas) | `THREE.InstancedMesh` de icosaedro amassado | monte de raio 1,2 e ~0,95 de alto, branco `#f4f1ea` | em volta do SEAT | 1, 3, 6, 9 |
| `celular` | o celular gigante com o rascunho e o botão Enviar | `K.m3d('celular_gigante')`, escala 1,45, tela desenhada | 1,16 × 2,3, preto | quarto, [0,55, 0, -0,3] | 1, 2, 3, 9 |
| `monitor` | o computador do Nico, com a mesa | `K.computador` | o do canal | [-0,5, 0, -1,3] | 2, 7, 10 |
| `cadeira` | cadeira giratória azul | `K.m3d('cadeira_giratoria')` | | SEAT | 1, 3, 6, 9 |
| `bola` | a bola que ele amassa e joga | 1 icosaedro igual aos do monte | 0,13 | na mão → voa pro monte | 3 |
| `estudio` | o estúdio: tripé + câmera, 2 softboxes, banqueta, letreiro | grupo próprio + `K.m3d('banqueta')` + `K.m3d('letreiro')` | tripé 1,5; softbox 1,9 | estúdio, em volta de [0, 0, -1] | 4, 5, 9 |
| `dona` | a dona do estúdio, fotógrafa | `K.personagem('dona')` | 1,5 | estúdio, [0,9, 0, 0,4] | 4, 5, 9 |
| `rival` | o outro web designer | `K.boneco` moletom laranja `#f08a24` | 1,47 | estúdio, chega de [-3, 0, 1,8] | 5 |
| `navegador` | a barra com mappoa.com sendo digitado | `K.painelMappoa(2,3, 0,4)` | | acima do monitor | 7, 10 |
| `tela` | a lista dos estúdios / a análise do estúdio | `K.painelMappoa` | 1,4 × 2,33 e 1,56 × 2,6 | quarto / palco | 7, 8 |
| `robo` | o robô do Mappoa | `K.roboMappoa()` | | palco / quarto | 8, 10 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| mensagem, rascunho, quarenta | 1, 3, 9 | o celular gigante com "Rascunho 40" e o texto; o monte de papel; o contador 1 → 41 |
| web designer | 2, 5 | etiqueta "Web designer" no Nico; o rival |
| Enviar | 1, 2, 9 | o botão verde grande na tela do celular |
| amador | 2 | o balão de pensamento "E se acharem que sou amador?" |
| semana | 3 | o quarto de noite e a etiqueta "Dia 7" |
| estúdio de fotografia, esquina | 4 | o estúdio com tripé, softbox e letreiro "FOCO ESTÚDIO", a dona com cara triste |
| site, cliente | 4 | etiqueta "Sem site" e o balão "Agenda vazia..." |
| mensagem torta, erro | 5 | o balão de fala do rival "oi faço sitee barato rs" e a etiqueta "Mensagem torta" |
| fecha | 5 | aperto de mão, ✓ e "Fechou" |
| papel (sai do papel) | 6 | ele explode o monte e sai de dentro |
| mappoa.com, computador | 7, 10 | a barra digitando no monitor |
| lista, estúdios, Jundiaí | 7 | a lista subindo do computador, "Estúdios de fotografia · Jundiaí, SP", etiqueta "Jundiaí" |
| Mappoa, sistema | 8 | o palco, o rótulo "Mappoa", a análise do Foco Estúdio |
| chance de te contratar | 8 | a aderência enchendo até 92/100 e a etiqueta "Mais chance" |
| testa | 9 | ele aperta o Enviar com a testa, de olho fechado |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida): no quarto, a janela com o céu (de noite na frase 3), a estante, o
ring light e as plantas; no estúdio, o fundo infinito liso; no palco, o logo gigante e os cartões flutuando.

#### 1 · plano `gancho` · ~3,5 s
> "Ele escreveu a mensagem quarenta vezes. E não mandou nenhuma."
- **NA TELA:** o Nico sentado na cadeira girada pra câmera, enterrado até o pescoço no monte de papel; à direita dele, o
  celular gigante em pé com o rascunho e o botão verde Enviar; o braço direito dele saindo do monte, o dedo tremendo
  perto do Enviar
- **MOSTRA:** personagem, papel, celular
- **CENÁRIO:** o quarto de dia
- **ENTRA AGORA:** bolas de papel caindo do alto no monte (uma a cada ~0,4 s, desde o 1º quadro)
- **OBJETOS SE MEXENDO:** o celular vibra de leve; o contador da tela marca "Rascunho 40"; em "nenhuma" a tela pisca
  "0 enviadas"
- **PERSONAGEM:** começo: olho arregalado, suando, dedo tremendo (braço reto pra frente, chacoalhando) · em "nenhuma":
  recolhe o dedo e afunda um pouco no monte (cara triste)
- **INTERAÇÃO:** o dedo dele quase encosta no Enviar e volta
- **CÂMERA:** 4 cortes de ~0,8 s: (1) detalhe da tela "Rascunho 40" com o dedo, chegando · (2) uma bola caindo no monte,
  descendo, perto · (3) o rosto dele suando no meio do papel, perto, frente, olho · (4) afastando, o quadro inteiro,
  médio, lado 25, topo livre
- **EFEITOS VISUAIS:** etiqueta vermelha "40 rascunhos" em "quarenta" · ✗ vermelho e "0 enviadas" em "nenhuma"
- **SONS:** estrondo leve + whoosh no 1º quadro · baque de papel em cada bola · whoosh em cada corte · errado em "nenhuma"

#### 2 · plano `trava` · ~4 s
> "O Nico é web designer e trava no Enviar: e se acharem ele amador?"
- **NA TELA:** o quarto de dia, sem o monte (é antes); o Nico de pé na frente do celular gigante, com o rascunho 1 na tela
- **MOSTRA:** personagem, celular
- **CENÁRIO:** o quarto de dia; o computador ao fundo
- **ENTRA AGORA:** a etiqueta "Web designer" em "designer"; o balão de pensamento em "amador"
- **OBJETOS SE MEXENDO:** a tela do celular com "Rascunho 1" e o texto; o botão Enviar pulsa em "Enviar"
- **PERSONAGEM:** começo: anda até o celular, animado · em "trava": o dedo para no ar, tremendo · em "amador": mão na testa
- **INTERAÇÃO:** o dedo quase aperta o Enviar em "trava"
- **CÂMERA:** (1) passando, médio, lado -10, olho, ele e o celular · (2) de "Enviar": chegando, perto, lado 30, baixo, a
  mão e o botão com o rosto dele
- **EFEITOS VISUAIS:** "Web designer" azul em "designer" · balão "E se acharem que sou amador?" em "amador"
- **SONS:** passo, ding em "designer", trava em "trava", pingo em "amador"

#### 3 · plano `rascunhos` · ~4,5 s (jogo `falha`)
> "Apaga, reescreve, amassa. Uma semana depois, tá no rascunho quarenta e um."
- **NA TELA:** a rajada: a tela apagando, ele digitando, ele amassando; depois o quarto de noite com ele sentado no monte
  crescendo
- **MOSTRA:** personagem, papel, celular
- **CENÁRIO:** o quarto de dia até "semana"; de noite depois
- **ENTRA AGORA:** a bola amassada nas mãos em "amassa", jogada no monte; o monte cresce de "amassa" até o fim
- **OBJETOS SE MEXENDO:** a tela do celular: o texto some letra por letra em "Apaga", volta em "reescreve"; o contador
  sobe de 2 a 41
- **PERSONAGEM:** em "Apaga": bate a mão na testa · em "reescreve": digitando rápido · em "amassa": segura a bola e joga ·
  em "semana": sentado no monte, cara cansada · no fim: coça a cabeça
- **INTERAÇÃO:** ele amassa a bola e joga no monte
- **CÂMERA:** rajada de 3 cortes: (1) detalhe da tela apagando · (2) o rosto digitando, perto, lado -30 · (3) a bola na
  mão, perto, lado 20, baixo · (4) de "semana": girando, médio, olho, o monte e ele
- **EFEITOS VISUAIS:** etiqueta laranja "Dia 7" em "semana" · contador vermelho "Rascunho 41" · congela no fim (falha)
- **SONS:** tecla em rajada, estalo da bola, whoosh, baque, congela

#### 4 · plano `estudio` · ~4 s
> "E o estúdio de fotografia da esquina continua sem site e sem cliente."
- **NA TELA:** o estúdio: o letreiro "FOCO ESTÚDIO" no fundo, o tripé com a câmera, as 2 softboxes, a banqueta vazia;
  a dona do lado da câmera, olhando o celular
- **MOSTRA:** dona, estudio
- **CENÁRIO:** o fundo infinito lilás
- **ENTRA AGORA:** o letreiro acende em "estúdio"; o balão "Agenda vazia..." em "cliente"
- **OBJETOS SE MEXENDO:** o flash da câmera dispara sozinho em "fotografia" (clarão); a banqueta vazia gira devagar
- **PERSONAGEM:** a dona · começo: encolhe os ombros · em "cliente": cara triste, olha pros lados
- **INTERAÇÃO:** ela aperta o botão da câmera (o flash) sem ninguém na banqueta
- **CÂMERA:** (1) chegando, aberto, frente, olho, o estúdio inteiro · (2) de "site": passando, perto, lado 30, baixo, ela
- **EFEITOS VISUAIS:** "Sem site" vermelho em "site" · balão "Agenda vazia..." em "cliente"
- **SONS:** estalo do flash, brilho do letreiro, etiqueta, pingo

#### 5 · plano `rival` · ~4 s
> "Outro web designer manda uma mensagem torta, cheia de erro. E fecha."
- **NA TELA:** o rival entra no estúdio digitando no celular de mão; o balão dele "oi faço sitee barato rs" com os erros
  sublinhados em vermelho; a dona lê e aperta a mão dele
- **MOSTRA:** rival, dona
- **CENÁRIO:** o estúdio
- **ENTRA AGORA:** o balão em "mensagem"; ✓ e "Fechou" em "fecha"
- **OBJETOS SE MEXENDO:** o celular na mão do rival
- **PERSONAGEM:** o rival · começo: andando e digitando · em "fecha": aperta a mão · a dona: em "erro" olha o celular
  surpresa, em "fecha" comemora
- **INTERAÇÃO:** o aperto de mão
- **CÂMERA:** (1) chegando, médio, lado -20, olho, o rival com o balão · (2) de "fecha": parado, médio, lado 15, os dois
- **EFEITOS VISUAIS:** "Mensagem torta" laranja em "torta" · ✓ e "Fechou" verde em "fecha"
- **SONS:** clique das teclas, pingo da mensagem, certo, festa

#### 6 · plano `sai` · ~2,7 s (jogo `corrige`)
> "Então o Nico sai do papel e decide investir."
- **NA TELA:** o quarto de dia; o monte de papel explode pra todo lado e o Nico sai de dentro, de pé, punho pra cima
- **MOSTRA:** personagem, papel
- **CENÁRIO:** o quarto de dia
- **ENTRA AGORA:** em "sai": as bolas voam pra fora e caem no chão
- **OBJETOS SE MEXENDO:** a cadeira gira com o impulso
- **PERSONAGEM:** começo: sentado, olha pra cima com a ideia · em "sai": pula pra fora · em "investir": vitória
- **INTERAÇÃO:** ele empurra o papel pra fora
- **CÂMERA:** subindo, médio, lado 15, baixo, de baixo pra cima
- **EFEITOS VISUAIS:** "Bora!" verde em "investir" · poof em "sai"
- **SONS:** whoosh, estrondo leve, baques do papel caindo, brilho em "investir"

#### 7 · plano `lista` · ~5 s
> "Digita mappoa.com no computador e vem a lista dos estúdios de fotografia de Jundiaí sem site."
- **NA TELA:** a barra com mappoa.com acima do monitor sendo digitada; a lista dos estúdios sobe do computador; o Nico
  ao lado
- **MOSTRA:** navegador, tela, personagem
- **CENÁRIO:** o quarto de dia
- **ENTRA AGORA:** a barra em "Digita", as letras até "computador"; a lista sobe do monitor em "lista"; os estúdios
  entram um por um em "estúdios"
- **OBJETOS SE MEXENDO:** o botão "Ir" fica verde em "lista"
- **PERSONAGEM:** começo: digitando · em "lista": levanta surpreso · depois aponta o Foco Estúdio
- **INTERAÇÃO:** ele aponta o primeiro da lista
- **CÂMERA:** (1) por cima do ombro, chegando, perto, lado -38, olho · (2) chegando, médio, frente, olho
- **EFEITOS VISUAIS:** "Jundiaí" azul em "Jundiaí"
- **SONS:** clique em rajada, bip a cada estúdio, brilho em "lista"

#### 8 · plano `mappoa` · ~4,5 s
> "Esse é o *Mappoa*, um sistema que mostra quem tem mais chance de te contratar."
- **NA TELA:** no palco, a análise do Foco Estúdio; o robô à esquerda acenando; o Nico à direita
- **MOSTRA:** tela, robo, personagem
- **CENÁRIO:** o palco da marca, o logo gigante atrás
- **ENTRA AGORA:** a tela cai do alto em "sistema"
- **OBJETOS SE MEXENDO:** a aderência enche de "chance" a "contratar" (até 92/100)
- **PERSONAGEM:** começo: chamando · em "contratar": comemorando
- **INTERAÇÃO:** o robô acena pro Nico
- **CÂMERA:** (1) chegando, médio, frente, baixo · (2) de "mostra": passando, médio, lado -14, olho
- **EFEITOS VISUAIS:** rótulo "Mappoa" em "Mappoa" · "Mais chance" verde em "chance"
- **SONS:** brilho, ding, certo

#### 9 · plano `antes_agora` · ~5,5 s (jogo `avanca`)
> "Antes, quarenta rascunhos pra ninguém. Agora, ele manda pra quem precisa. Aperta Enviar até com a testa."
- **NA TELA:** (1) Antes: enterrado no papel, dedo tremendo · (2) Agora: de pé na frente do celular gigante com a
  mensagem pro Foco Estúdio; ele fecha o olho e aperta o Enviar com a testa · (3) o estúdio: a dona recebe e comemora
- **MOSTRA:** personagem, celular
- **CENÁRIO:** o quarto, depois o estúdio
- **ENTRA AGORA:** em "testa": a tela vira "Enviada ✓"; no estúdio, o balão "Bora fazer!"
- **OBJETOS SE MEXENDO:** o celular balança com a cabeçada
- **PERSONAGEM:** Antes: dedo tremendo · Agora: decidido, inclina e bate a testa no Enviar · a dona comemora
- **INTERAÇÃO:** a testa no botão
- **CÂMERA:** (1) afastando, médio, lado 35 · (2) passando, perto, perfil, olho, a testa e o botão · (3) chegando, médio,
  frente, a dona
- **EFEITOS VISUAIS:** "Pra ninguém" vermelho · "Pra quem precisa" verde · "Enviada!" e ✓
- **SONS:** errado, avanca, baque da testa, whoosh, pingo, certo, festa

#### 10 · plano `segue` · ~4 s (+ `cartao` na cauda, 1,6 s)
> "Segue pra ver mais. No computador, digita mappoa.com e testa você também."
- **NA TELA:** o Nico de pé no quarto, o cartão de seguir entra em "Segue"; a barra mappoa.com digitada em "digita"; o
  robô acenando
- **MOSTRA:** personagem, navegador, monitor
- **CENÁRIO:** o quarto de dia
- **ENTRA AGORA:** o cartão em "Segue" (o botão vira "Seguindo"); a barra em "computador"
- **OBJETOS SE MEXENDO:** as letras de mappoa.com; o "Ir" fica verde em "testa"
- **PERSONAGEM:** começo: chamando pra câmera · em "digita": digitando
- **INTERAÇÃO:** ele digita o endereço
- **CÂMERA:** (1) chegando, médio, frente, topo livre · (2) parado, aberto, frente, topo livre
- **EFEITOS VISUAIS:** o cartão de seguir
- **SONS:** clique do Seguir, clique em rajada, ding, final no cartão
