# O orçamento que vira fumaça

> Vídeo 5 do lote da nuvem no molde de 45 s (`canal/lote-nuvem-45s.md`), feito em 19/11/2026.
> Gancho, dor, rival e nicho da pauta ("Pesquisa de mercado (19/11/2026)"): o "gostei, vou ver e te falo" que some.
> Nicho e cidade inéditos: buffets infantis de Montes Claros (MG).

## Roteiro (43,0 s · 131 palavras · 9 frases + cartão)

1. Ele mandou o orçamento. E o cliente virou fumaça.
2. O Caio é web designer e manda orçamento pra todo mundo que pede preço no Instagram.
3. "Gostei, vou ver e te falo." Passou uma semana, um mês. E nada.
4. Só que o buffet infantil da esquina não tem site, e precisa.
5. Aí outro web designer bate lá, com o site já desenhado. E fecha.
6. Então o Caio abana a fumaça, decide investir e digita mappoa.com no computador. Vem a lista dos buffets infantis de Montes Claros sem site.
7. Esse é o *Mappoa*, um sistema que acha quem tem o problema que você resolve.
8. Antes, o cliente do Caio virava fumaça. Agora, ele só manda orçamento pra quem precisa de verdade.
9. Segue pra ver mais. No computador, digita mappoa.com e testa você também.
10. (cauda de 1,6 s) cartão de seguir com o botão virando "Seguindo"

**Capa:** "Virou *fumaça*?" com o cliente meio transparente, a fumaça subindo, o chapéu e o orçamento na mão.

**Checklist do molde:** 43,0 s · 131 palavras · 9 frases de 3,4 a 8 s · gancho de 9 palavras em 2,6 s, com a
metáfora já acontecendo no 1º quadro (o cliente meio transparente soltando fumaça) · o web designer na frase 2 (2,9 s)
· dor com o tempo passando (Dia 1 → 30) · a empresa do bairro sem site com a dor no balão · o rival que fecha · o
gesto da virada (abana a fumaça) com "decide investir" · "digita mappoa.com no computador" aos ~22,4 s, com a lista do
nicho na cidade · "Esse é o *Mappoa*" numa frase só · Antes x Agora voltando pra fumaça · o fim fixo, com o cartão na
palavra "Segue" · 4 cortes nos 3 primeiros segundos · uma etiqueta por frase · ~110 sons.

**O que apliquei do que o canal aprendeu:** gancho com imagem absurda e fim em aberto, sem "Web designer, ..." e sem
"Se X, Y"; o personagem do canal (menino de camiseta azul); o Mappoa como sistema e como decisão de investir (sem
valor, sem "grátis"); o kit do Mappoa (painel, lista, análise, robô); cadeira girando junto quando ele senta; câmera
fora da faixa dos carros na fachada; etiquetas em y 400 (600 no gancho); personagens virados pra câmera na conversa.

## A ficha de cena

### 1. Os cenários, a hora e o lugar do personagem

- **Fachada da loja Vento Sul** (`['fachada', { loja: 'loja' }, 'loja']`), de dia: o cliente que some (gancho e o
  "Antes"). Carros passando na rua; a vitrine com manequins e arara atrás dele
- **O quarto do Caio** (`home_office`), de dia: o computador do canal no meio (`COMP`), a cadeira giratória azul, a
  janela com a cidade. É onde ele manda orçamento, espera, abana a fumaça e acha a lista
- **Fachada do buffet** (`['fachada', { loja: 'salao' }, 'buffet']`): o Salão Bella vestido de buffet infantil (placa
  nova por cima, cartaz FESTAS INFANTIS com bolo nas vitrines, cavalete "Reserva só no Zap", três cachos de balões).
  A placa troca de BUFFET PULA-PULA (frases 4 e 5) pra BUFFET CASTELINHO (o "Agora" da frase 8)
- **Palco do Mappoa** (`mundo_mappoa`): a análise do Buffet Castelinho, o robô e o Caio

### 2. Os objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `dono` | o cliente que pediu orçamento e some | `K.personagem('dono')` com os materiais clonados (fica transparente) | terno, 1,5 m | calçada da loja, `DONO` [-1, 0, 2,4] | 1 e 8 (Antes) |
| `chapeu` | o chapéu do cliente, o que sobra dele | grupo: aba, copa e fita (cilindros) | aba 0,8 m, marrom com fita vermelha | na cabeça; depois do poof cai girando até `HAT_CHAO` | 1, 8 e capa |
| `orcamento` | a folha do orçamento | plano com canvas "ORÇAMENTO · Site profissional · Caio Web Design" | 0,36 x 0,48, branca e azul | nas mãos do cliente; cai no chão; na 8, da mão do Caio pra mão da dona | 1, 8 e capa |
| `avioes` | os orçamentos virando aviõezinhos de papel | 7 aviões (geometria de 3 triângulos) | 0,55 m, brancos com faixa azul | saem da mão do Caio e voam pra fundo/direita | 2 |
| `celular` | o celular do Caio: o direct e a conversa | `K.celular()` na mão, virado pra câmera | escala 1,6 a 1,9 | do lado da cabeça | 2 e 3 |
| `buffet` | a fachada do buffet infantil | a fachada `salao` + placa, cartazes, cavalete | placa 5,9 x 0,8 rosa | z 0 | 4, 5 e 8 |
| `baloes` | os cachos de balões do buffet | 15 esferas coloridas com fio | 0,4 m cada | dos dois lados da porta e na ponta da vitrine | 4, 5 e 8 |
| `dona` | a dona do Buffet Pula-Pula | `K.personagem('dona')`, blazer rosa | 1,5 m | `DONA` [2,8, 0, 2,15] | 4 e 5 |
| `rival` | o outro web designer | `K.boneco` de moletom verde | 1,5 m | anda de x -3,6 até `RIVAL_F` | 5 |
| `tablet` | o site do buffet já pronto | plano com canvas "Buffet Pula-Pula · Reservar" | 0,62 x 0,44 | na mão do rival | 5 |
| `navegador` | a barra com mappoa.com | `K.painelMappoa(2,3, 0,4)` | | em cima do monitor | 6, 9 e cartão |
| `tela` | a lista e a análise do Mappoa | `K.painelMappoa` (lista dos buffets e análise do Castelinho, 93/100) | 1,4 x 2,33 e 1,56 x 2,6 | sobe do monitor (6) / cai no palco (7) | 6 e 7 |
| `robo` | o robô do Mappoa | `K.roboMappoa()` | | no palco e no quarto do fim | 7, 9 e cartão |
| `dona2` | a dona do Buffet Castelinho | `K.personagem('dona')`, blazer roxo, vestido amarelo | 1,5 m | `DONA` | 8 |
| `monitor` | o computador do Caio | `K.computador()` | | `COMP` | 2, 3, 6, 9 |
| fumaça | o cliente virando fumaça / o quarto cheio de fumaça | `K.fumaca` (cinza claro) e `K.poof` | | pés do cliente; celular; cantos do quarto | 1, 3, 6, 8 |

### 3. O teste dos substantivos

orçamento (1, 2, 8: a folha e os aviões) · cliente (1, 8: o dono) · fumaça (1, 6, 8: a fumaça e o poof) · web
designer (2: o Caio; 5: o rival) · Instagram (2: o direct no celular) · "Gostei, vou ver e te falo" (3: a conversa no
celular) · semana, mês (3: o contador Dia 1 → 30) · buffet infantil, esquina (4: a fachada do buffet) · site (4:
etiqueta "Sem site"; 5: o tablet) · porta (5: a porta abre quando ele bate) · computador, mappoa.com (6: a barra) ·
lista, buffets infantis, Montes Claros (6: a lista do Mappoa e a etiqueta) · Mappoa, sistema (7: o painel e o robô) ·
problema (7: as dores na análise) · quem precisa (8: a dona do Castelinho segurando o orçamento) · computador,
mappoa.com (9: a barra digitando).

### 4. Cena por cena

#### 1 · plano `gancho` · 2,6 s
> "Ele mandou o orçamento. E o cliente virou fumaça."

- NA TELA: no meio, o cliente de terno e chapéu na calçada da Vento Sul, já meio transparente, lendo o orçamento;
  fumaça cinza subindo dos pés; a frase da capa "Virou *fumaça*?" no topo
- MOSTRA: ["dono", "orcamento", "chapeu"]
- CENÁRIO: a fachada da loja de dia; a vitrine com manequins atrás; carros passando na rua (o cenário cuida)
- ENTRA AGORA: o poof grande na palavra "fumaça" (duas nuvens, no peito e nas pernas)
- OBJETOS SE MEXENDO: a fumaça sobe dos pés o tempo todo e engrossa até "fumaça"; ele vai ficando transparente (de 30%
  a 75%); em "fumaça" ele some; o chapéu dá um pulinho e cai girando até o chão; a folha cai balançando
- PERSONAGEM: o cliente na calçada, de frente pra câmera · começo: segurando a folha, lendo · em "cliente": cara de
  assustado · em "fumaça": some
- INTERAÇÃO: o orçamento faz o cliente sumir: ele lê e vira fumaça; o chapéu e a folha caem
- CÂMERA: 4 cortes · (1) 0 a 0,7 s: a folha e o rosto, chegando, perto, lado 15 · (2) 0,7 a 1,4 s: os pés com a fumaça
  até a cabeça, subindo, médio, lado -25, de baixo · (3) 1,4 s até o poof: o rosto sumindo, chegando, perto, lado 28 ·
  (4) do poof até o fim: aberto, frente, afastando, com o chapéu no chão e o topo livre
- EFEITOS VISUAIS: etiqueta vermelha "Sumiu!" em "fumaça" (y 600, por causa da frase da capa) · o poof
- SONS: zumbido e vapor no 1º segundo · whoosh em cada corte · ding em "orçamento" · estalo e whoosh no poof · baque
  do chapéu no chão

#### 2 · plano `manda` · 4,1 s
> "O Caio é web designer e manda orçamento pra todo mundo que pede preço no Instagram."

- NA TELA: o Caio sentado na cadeira azul do quarto, de lado pra câmera, com o celular cheio de "Quanto custa um site?"
  no direct; aviõezinhos de orçamento saindo da mão dele e voando pro fundo
- MOSTRA: ["personagem", "avioes", "celular"]
- CENÁRIO: o quarto de dia; o computador com o site dele; a janela com a cidade
- ENTRA AGORA: as mensagens no direct, uma a cada 0,5 s desde "Caio"; os aviões a partir de "manda", um a cada 0,32 s
- OBJETOS SE MEXENDO: cada avião sai da mão esquerda dele e voa em arco pra direita e pro fundo, balançando
- PERSONAGEM: sentado · começo: mexendo no celular, feliz · em "manda": joga os aviões (empurrando)
- INTERAÇÃO: o Caio joga os orçamentos (aviões) pra todo lado; o celular enche de pedidos de preço
- CÂMERA: (1) até "manda": chegando, perto, lado 30 (o rosto e o celular) · (2) até "todo": passando, perto, lado -15 ·
  (3) até o fim: afastando, perto, lado 8, de baixo (os aviões saindo) (antes: o aberto do gancho)
- EFEITOS VISUAIS: etiqueta laranja "Pra todo mundo" em "todo"
- SONS: ding a cada mensagem · whoosh de cada avião

#### 3 · plano `vacuo` · 4,8 s · jogo `falha`
> "'Gostei, vou ver e te falo.' Passou uma semana, um mês. E nada."

- NA TELA: (1) o celular grande do lado do rosto dele: o PDF do orçamento enviado e a resposta "Gostei, vou ver e te
  falo 👍" · (2) o Caio sentado esperando, o contador "Dia 1 → Dia 30" em cima da cabeça, um fio de fumaça saindo do
  celular · (3) "nada": mão na testa, "visto por último há 30 dias"
- MOSTRA: ["personagem", "celular"]
- CENÁRIO: o quarto de dia
- ENTRA AGORA: a resposta logo no começo; o contador em "Passou"; a fumacinha do celular em "Passou"
- OBJETOS SE MEXENDO: o contador corre de 1 a 30 de "Passou" até "mês"; a fumaça sobe do celular (a conversa virando
  fumaça)
- PERSONAGEM: sentado · começo: faz que sim, feliz · em "Passou": olha o relógio · em "mês": cochila · em "nada": mão na
  testa
- INTERAÇÃO: o celular deixa o Caio no vácuo: a conversa vira fumaça na mão dele
- CÂMERA: (1) chegando, perto, lado -20 (celular e rosto) · (2) em "Passou": girando, perto, lado 15 · (3) em "nada":
  chegando, perto, lado -8 (antes: os aviões, lado 8 de baixo)
- EFEITOS VISUAIS: contador vermelho "Dia N" · etiqueta vermelha "Sem resposta" em "nada" (o contador some) · congela
  em preto e branco no fim (o jogo)
- SONS: ding da resposta · whoosh em "semana" e "mês" · errado em "nada" · congela (o jogo)

#### 4 · plano `buffet` · 3,4 s · jogo `corrige`
> "Só que o buffet infantil da esquina não tem site, e precisa."

- NA TELA: a frente do Buffet Pula-Pula: placa rosa, balões, cartaz FESTAS INFANTIS com bolo, cavalete "Reserva só no
  Zap"; a dona na calçada com o celular; o balão "Ninguém acha a gente no Google..."
- MOSTRA: ["buffet", "dona", "baloes"]
- CENÁRIO: a fachada de dia, carros passando; os balões balançando
- ENTRA AGORA: o balão de fala da dona em "site"
- OBJETOS SE MEXENDO: os balões balançam com o vento o tempo todo
- PERSONAGEM: a dona na calçada, de frente · começo: olha o celular (sem reserva) · em "precisa": mão na testa
- INTERAÇÃO: a dona reclama pra quem passa: ninguém acha o buffet
- CÂMERA: (1) até "site": chegando, médio, lado 10 (a fachada com a dona) · (2) em "site": passando, perto, lado 30, de
  baixo (a dona e o balão) (antes: o rosto do Caio de perto)
- EFEITOS VISUAIS: balão de fala · etiqueta vermelha "Sem site" em "site"
- SONS: whoosh na troca de lugar · ding em "buffet" · estalo do balão · errado em "precisa"

#### 5 · plano `rival` · 4,1 s
> "Aí outro web designer bate lá, com o site já desenhado. E fecha."

- NA TELA: o outro web designer (moletom verde) chega andando pela calçada, bate, a porta abre; ele ergue o tablet com o
  site do Buffet Pula-Pula pronto; a dona se surpreende e comemora; ✓ verde
- MOSTRA: ["rival", "dona", "tablet"]
- CENÁRIO: a fachada do buffet; a porta abrindo com o sino
- ENTRA AGORA: o rival pela esquerda (desde o começo); o tablet em "desenhado"; o ✓ em "fecha"
- OBJETOS SE MEXENDO: a porta abre depois de "bate"; o tablet cresce na mão dele; a câmera treme em "fecha"
- PERSONAGEM: o rival anda até a porta · em "bate": chama · em "desenhado": segura o tablet · em "fecha": mostra; a dona:
  celular → surpresa → comemora
- INTERAÇÃO: o rival mostra o site pra dona e fecha o negócio com ela
- CÂMERA: (1) passando, médio, lado 20 (ele chegando) · (2) em "desenhado": chegando, perto, lado -20 (o tablet e a dona)
  · (3) em "fecha": parado, médio, frente, de baixo (antes: passando, perto, lado 30)
- EFEITOS VISUAIS: ✓ verde · etiqueta laranja "Fechou com outro" em "fecha"
- SONS: passos · duas batidas na porta (madeira) em "bate" · ding da porta · certo e festa em "fecha"

#### 6 · plano `virada` · 8,1 s
> "Então o Caio abana a fumaça, decide investir e digita mappoa.com no computador. Vem a lista dos buffets infantis de
> Montes Claros sem site."

- NA TELA: o quarto cheio de fumaça cinza (dos clientes que sumiram); o Caio em pé abanando; a fumaça some; "Investir"
  e o $; ele senta e digita mappoa.com na barra em cima do monitor; a lista dos buffets infantis de Montes Claros sobe do
  computador
- MOSTRA: ["personagem", "navegador", "tela"]
- CENÁRIO: o quarto de dia
- ENTRA AGORA: a barra em "digita" (as letras uma a uma); a lista em "lista"; os buffets um por um em "buffets"
- OBJETOS SE MEXENDO: a fumaça enche os cantos e vai embora de "abana" a "decide"; a lista sobe do monitor e cresce
- PERSONAGEM: em pé, abanando (bravo) · em "decide": vitória (braços pra cima) · em "digita": senta e digita · em "Vem":
  levanta, surpreso, e aponta a lista
- INTERAÇÃO: o Caio espanta a fumaça e digita o endereço; a lista aparece pra ele
- CÂMERA: 5 cortes · (1) chegando, perto, lado 15 (ele na fumaça) · (2) "decide": subindo, perto, lado -15, de baixo ·
  (3) "digita": chegando, perto, lado -30 (a barra) · (4) "Vem": chegando, médio, frente (a lista e ele) · (5) "Montes":
  passando, médio, lado 18 (antes: parado, frente, de baixo)
- EFEITOS VISUAIS: etiqueta azul "Investir" e o $ verde de "decide" a "digita" · etiqueta azul "Montes Claros" em
  "Montes"
- SONS: whoosh a cada abanada · ding em "investir" · 10 cliques no "digita" · brilho e 4 bips na lista

#### 7 · plano `mappoa` · 3,4 s
> "Esse é o *Mappoa*, um sistema que acha quem tem o problema que você resolve."

- NA TELA: no palco do Mappoa, a análise do Buffet Castelinho cai do alto (aderência subindo até 93/100, as dores "Sem
  site: reserva só no WhatsApp" e "Não aparece pra quem busca festa", a oportunidade); o robô acenando à esquerda; o Caio
  à direita
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: o palco da marca, o logo gigante e os pinos (o cenário cuida)
- ENTRA AGORA: a análise caindo em "sistema" (sem o brilho amarelo); o rótulo MAPPOA em "Mappoa"
- OBJETOS SE MEXENDO: a nota sobe de "problema" a "resolve"; as dores aparecem em "problema"
- PERSONAGEM: o Caio · começo: chamando · em "resolve": comemorando
- INTERAÇÃO: o robô mostra a análise pro Caio
- CÂMERA: (1) chegando, médio, frente, de baixo · (2) em "acha": passando, médio, lado -14 (antes: passando, lado 18)
- EFEITOS VISUAIS: rótulo MAPPOA · etiqueta verde "Tem o problema" em "problema"
- SONS: brilho em "Mappoa" · ding em "problema" · certo em "resolve"

#### 8 · plano `antes_agora` · 5,6 s · jogo `avanca`
> "Antes, o cliente do Caio virava fumaça. Agora, ele só manda orçamento pra quem precisa de verdade."

- NA TELA: (1) Antes: na Vento Sul, o cliente transparente vira fumaça de novo, o chapéu cai, ✗ vermelho · (2) Agora: o
  Buffet Castelinho (placa roxa); o Caio chega e entrega o orçamento pra dona; ela segura, sorri e NÃO some; ✓ verde
- MOSTRA: ["personagem", "dona2", "orcamento"]
- CENÁRIO: a fachada da loja → a fachada do buffet (placa trocada pra BUFFET CASTELINHO), balões
- ENTRA AGORA: o poof em "fumaça"; o Caio pela esquerda em "Agora"; o ✓ em "precisa"
- OBJETOS SE MEXENDO: o chapéu cai; a folha passa da mão do Caio pras mãos da dona de "manda" a "precisa"
- PERSONAGEM: o Caio · chega andando · em "manda": mostra o orçamento · em "precisa": vitória; a dona: surpresa → faz
  que sim → comemora em "verdade"
- INTERAÇÃO: o Caio entrega o orçamento; a dona fica com ele (o cliente que precisa não some)
- CÂMERA: (1) Antes: afastando, médio, lado -20 (diferente do gancho) · (2) Agora: de baixo pra cima, subindo, do lado
  direito (K.mirar fixo de [6,6, 0,55, 6] pra [6,2, 0,95, 5,8]: fora da faixa dos carros), os dois virados pra câmera
- EFEITOS VISUAIS: ⏩ (o jogo) · etiqueta vermelha "Sumia" e ✗ no Antes · etiqueta verde "Quem precisa" e ✓ em
  "precisa"
- SONS: estalo e errado no Antes · whoosh e passos em "Agora" · certo em "precisa" · festa em "verdade"

#### 9 · plano `segue` · 4,4 s (e a cauda `cartao`, 1,6 s)
> "Segue pra ver mais. No computador, digita mappoa.com e testa você também."

- NA TELA: o Caio de pé no quarto; o cartão de seguir no topo, entrando em "Segue"; a barra mappoa.com digitando em
  "digita"; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: o quarto de dia
- ENTRA AGORA: o cartão em "Segue" (o botão vira "Seguindo"); a barra em "computador"
- OBJETOS SE MEXENDO: as letras de mappoa.com uma a uma; o botão Ir fica verde em "testa"
- PERSONAGEM: começo: chamando pra câmera · em "digita": digita · na cauda: acena
- INTERAÇÃO: o Caio digita o endereço na barra
- CÂMERA: (1) chegando, médio, frente, topo livre · (2) em "computador": parado, aberto, frente, topo livre
- EFEITOS VISUAIS: cartão de seguir · barra mappoa.com
- SONS: clique do botão Seguir · 10 cliques no "digita" · ding em "testa" · final na cauda

## Cada cena em 2 linhas

1. O cliente lendo o orçamento vai ficando transparente, solta fumaça e some num poof; só o chapéu cai girando. / Ele
   leva o susto e some; 4 cortes em 2,6 s, do papel ao quadro aberto.
2. O celular do Caio enche de "quanto custa?" e ele joga aviõezinhos de orçamento pra todo lado. / Sentado, feliz; a
   câmera passa de perto pelos dois lados.
3. "Gostei, vou ver e te falo", e os dias correm até 30 com a conversa soltando fumaça. / Ele espera, cochila e põe a
   mão na testa; congela em preto e branco.
4. O Buffet Pula-Pula, cheio de balões, sem site; a dona reclama que ninguém acha eles no Google. / Ela olha o celular
   vazio; a câmera chega de frente e passa de baixo.
5. Outro web designer bate na porta com o site pronto no tablet e fecha. / A dona comemora; ✓ e a câmera treme.
6. O quarto cheio de fumaça: o Caio abana, decide investir, digita mappoa.com e a lista dos buffets de Montes Claros
   sobe do computador. / Abana, comemora, digita e aponta; 5 cortes.
7. No palco do Mappoa, a análise do Buffet Castelinho com a nota 93/100 e as dores. / O robô acena e o Caio comemora.
8. Antes, o cliente sumia na fumaça; agora a dona do Castelinho pega o orçamento e não some. / O Caio entrega e os dois
   comemoram; a câmera sobe de baixo.
9. O cartão de seguir e mappoa.com digitado na barra. / O Caio chama, digita e acena.
