# Se você esperar o primeiro cliente parado, vai virar isso: roteiro e ficha de cena

> Pedido do dono em 14/11/2026: "Esperar o primeiro cliente aparecer - webdesigner". É o conceito do campeão (a barba,
> 13 mil views), mas o mesmo gancho repetido cansou (13 mil → 4,2 mil → 2,1 mil → 1,6 mil). Então fica o conceito e muda a
> METÁFORA: o web designer esperou tão parado que virou **estátua de pedra** no meio do calçadão, com pombo na cabeça.
> Receita dos 3 mais vistos: a dor é do PRÓPRIO web designer ("não tenho cliente"), falando com "você"; o gancho é uma
> imagem absurda no 1º quadro; a frase deixa a curiosidade aberta ("...vai virar isso."); rival que fecha o cliente;
> virada de atitude (ele racha a pedra e vai atrás); o Mappoa entra tarde, como decisão de investir ("o preço de um banho
> e tosa", que conversa com o pet shop); ~47 s; fim com pergunta e comentário de uma palavra. A frase 9 tem a narração
> copiada do aspirador-de-cliente (não gasta crédito).

## Roteiro

1. Se você esperar o primeiro cliente parado, vai virar isso. *(gancho)*
2. O Enzo é web designer. Pendurou "faço sites" no peito e ficou parado esperando.
3. Passou um mês, ele virou pedra. Só o pombo apareceu.
4. Só que o pet shop da frente não tem site, e o cliente nem acha o horário do banho.
5. Aí passa outro web designer, que foi atrás. Entra no pet shop e fecha.
6. Cliente não visita estátua. Então o Enzo racha a pedra e decide ir atrás.
7. Ele investe o preço de um banho e tosa numa ferramenta que mostra quem precisa de site.
8. No computador, digita mappoa.com, e vem a lista dos pet shops de Campo Grande sem site.
9. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
10. Antes, o Enzo esperava parado. Agora, ele chega primeiro.
11. E você, ficava parado ou ia atrás? Comenta PEDRA ou ATRÁS. No computador, digita mappoa.com e testa você também.

O pedido de seguir fica só na tela (o cartão de seguir), sem falar.

Cerca de 150 palavras, uns 47 s com o cartão de seguir. Gasta uns 780 caracteres da ElevenLabs (a 9 reaproveitada;
sobram ~9.440).

**Capa:** "Virou *estátua*?", o Enzo de pedra cinza no pedestal com a placa "FAÇO SITES" no peito, um pombo na cabeça, a
cara de espanto congelada, e atrás dele o pet shop com a etiqueta vermelha "Sem site".

### Outros ganchos (o mesmo conceito, outra imagem)

- **A (o escolhido):** "Se você esperar o primeiro cliente parado, vai virar isso." · o Enzo de pedra no pedestal, o pombo
  pousando na cabeça, gente passando sem olhar
- **B:** "Se você esperar o cliente aparecer, sua agenda vira isso." · a mesa e o computador do Enzo no meio do deserto, um
  feno rolando e um urubu pousando no monitor
- **C:** "Esse web designer esperou tanto o primeiro cliente que virou peça de museu." · o Enzo dentro de uma vitrine de
  vidro com a plaquinha "Web designer esperando cliente, 2026"

## O que foi conferido

- Sem preço, sem plano e sem número de venda. O Mappoa: busca por segmento e cidade ("pet shops em Campo Grande"), a
  lista separada em SEM SITE e a análise com score, dores e oportunidades. Nada de "manda a mensagem sozinho" nem
  "garante a venda": quem vai até o pet shop é o Enzo
- Entra tarde (7), como decisão de investir ("o preço de um banho e tosa"), sem valor exato e sem "grátis"
- O mappoa.com aparece já na entrada (8), digitado "no computador"
- Sem "Esse é o Enzo": ele aparece dentro da ação (2), pendurando a plaquinha
- Empresas inventadas: Pet Shop Patinha Feliz (o que o rival fecha, o da frente da estátua) e, na lista, Banho & Tosa
  Pantanal, Pet Ipê, Cãopeão Pet e Au Au Campo Grande. Cidade nova no canal: Campo Grande, MS. Nicho novo: pet shop
- Nome novo: Enzo (já foram Davi, Caio, Léo, Rafa, Vitor, Mateus, Lucas, Nando, Téo, Gui, Igor, Thiago, Pedro, Vini,
  Beto, Murilo, Bruno e José)
- A estátua é a imagem da dor (ficar parado esperando); a dor continua sendo achar o próximo cliente, e a virada é
  sobre ir atrás, não sobre "esperar indicação"
- Fim: pergunta ligada à história + comentário de uma palavra (PEDRA ou ATRÁS), que não pede resposta do dono e não
  promete mostrar nada. O "segue" fica só no cartão

## Ficha de cena

**Cenários (três, com `K.cenarios`):** `rua_predios` de dia (1 a 6, 10 e 11: o calçadão, com a estátua no pedestal bem na
frente da loja PET SHOP), `home_office` de dia (7 e 8: o computador do canal, com a cadeira giratória no SEAT) e
`mundo_mappoa` (9).
**Personagens:** o do canal, chamado Enzo, em todas (de pedra de 1 a 6, de cor normal a partir do meio da 6). A **dona**
do Pet Shop Patinha Feliz (`K.personagem('dona')`, blazer azul-piscina) na 4, 5 e 10, com o **cachorro** (`K.cachorro()`)
do lado. O **rival** (moletom vermelho) na 5 e no "Agora" da 10. O **robô** na 9 e na 11. Pedestres do cenário passando.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Enzo, web designer (de pedra e depois normal) | `K.boneco`, cores do canal; a versão de pedra com os materiais clonados em cinza-pedra #9a968e, sem brilho (como o invisível fez com a transparência) | 1,47 | em cima do pedestal; depois no chão, no quarto e no pet shop | 1 a 11 |
| `pedestal` | o pedestal de pedra da estátua | `K.pecas`: caixa de pedra com a borda chanfrada e uma plaquinha de bronze "O WEB DESIGNER QUE ESPERAVA · 2026" | 1,1 × 0,9 × 1,1, cinza #8d8a83, plaquinha bronze #b08a3e | no meio do calçadão, de frente pro PET SHOP | 1, 2, 3, 5, 6, 10 |
| `plaquinha` | a placa "FAÇO SITES" pendurada no peito | `K.pecas`: placa de papelão com barbante no pescoço, texto em canvas | 0,55 × 0,32, papelão #c9a26b, letra preta; de pedra junto com ele | no peito do Enzo | 1 a 6, 10 |
| `notebook` | o notebook aberto nas mãos da estátua, com teia de aranha | `K.pecas`: tampa e teclado; teia = linhas finas brancas entre a tampa e o braço | 0,4 × 0,28, de pedra | nas mãos dele | 1, 3 |
| `pombo` | o pombo que pousa na cabeça e mais uns no ombro e no pedestal | peça nova no `cena.js`: corpo oval cinza-azulado, pescoço verde brilhante, bico, asinhas que batem | 0,22 de comprimento, #7d8796 / #3f8f6b | voa e pousa na cabeça; 3 a 5 no ombro e no pedestal | 1, 3, 6, 10 |
| `musgo` | o musgo e a teia que crescem na estátua com o tempo | esferas achatadas verdes nos pés e ombros; teia entre o braço e o notebook | pequenas, verde #5f8a3c | no corpo de pedra | 3 |
| `calendario` | as folhas do calendário voando ("um mês") | `K.folhasVento(…, { papel: true })` + um calendário de parede com o número trocando 1 → 30 | 0,5 × 0,6 | flutuando ao lado da estátua | 3 |
| `loja_petshop` | a loja PET SHOP do calçadão, a "da frente" | `C.lojas` (id `petshop`) com a placa redesenhada "Pet Shop Patinha Feliz" | o cenário | do lado do calçadão de frente pra estátua | 4, 5, 10 |
| `dona` | a dona do Pet Shop Patinha Feliz | `K.personagem('dona')`, blazer azul-piscina #3fb8c8 | 1,47 | na porta do PET SHOP | 4, 5, 10 |
| `cachorro` | o cachorro do pet shop, todo molhado de espuma | `K.cachorro()` + bolinhas de espuma brancas | escala 1 | do lado da dona | 4, 5, 10 |
| `celular` | o celular do cliente procurando "pet shop horário banho" | `K.m3d('celular_gigante')` com a busca e o ✗ "Sem site" | escala ~0,7 | do lado da cabeça de um pedestre, perto da loja | 4 |
| `rival` | o outro web designer | `K.boneco`, moletom vermelho | 1,47 | andando no calçadão até a porta | 5, 10 |
| `contrato` | o contrato FECHADO do rival | folha + carimbo vermelho | 0,62 × 0,82 | entre o rival e a dona | 5 |
| `cascas` | os pedaços de pedra que voam quando ele racha | `K.rachadura()` no pedestal + ~14 cacos cinza (caixinhas irregulares) que voam e caem | 0,05 a 0,2 | em volta do corpo dele | 6 |
| `nota` | a nota de "1 banho e tosa" | `K.pecas`: papel verde com uma patinha e uma bolha | 0,4 × 0,22 | na mão dele | 7 |
| `monitor` | o computador do Enzo | `K.computador` | escala 1,55 | na mesa do quarto | 7, 8 |
| `navegador` | barra com mappoa.com | `K.painelMappoa` | 2,3 × 0,4 | acima do computador | 8, 11 |
| `tela` | a lista dos pet shops de Campo Grande, depois a análise do Banho & Tosa Pantanal | `K.painelMappoa` | 1,4 × 2,33 / 1,56 × 2,6 | sobe do computador / palco / na mão dele | 8, 9, 10 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, calçadão | 9, 11 |

### Teste dos substantivos

| A narração fala | Frase | Como |
|---|---|---|
| esperar o primeiro cliente parado, vai virar isso | 1 | o Enzo de pedra no `pedestal`, o `pombo` pousando na cabeça, pedestres passando sem olhar |
| web designer | 2 | etiqueta "Web designer" |
| "faço sites" no peito | 2 | ele pendura a `plaquinha` "FAÇO SITES" no pescoço |
| ficou parado esperando | 2 | ele sobe no `pedestal`, cruza os braços com o `notebook` e para |
| passou um mês | 3 | o `calendario` trocando de 1 a 30, as folhas voando |
| virou pedra | 3 | a cor dele vira cinza-pedra dos pés pra cima, o `musgo` e a teia aparecem |
| só o pombo apareceu | 3 | o `pombo` pousa na cabeça; mais 3 no ombro |
| pet shop da frente, não tem site | 4 | a `loja_petshop` com a etiqueta vermelha "Sem site" na placa |
| o cliente nem acha o horário do banho | 4 | um pedestre com o `celular` na busca "Patinha Feliz horário banho" e o ✗ |
| outro web designer, foi atrás | 5 | o `rival` passa do lado da estátua sem parar |
| entra no pet shop e fecha | 5 | aperto de mão com a `dona` na porta, `contrato` FECHADO, o `cachorro` abanando |
| cliente não visita estátua | 6 | a estátua sozinha, um pedestre passa e pendura o casaco no braço dela |
| racha a pedra | 6 | `K.rachadura` no pedestal, a pedra trinca, os `cascas` voam, os pombos fogem |
| decide ir atrás | 6 | ele, já colorido, pula do pedestal e sai andando |
| o preço de um banho e tosa, ferramenta | 7 | a `nota` "1 banho e tosa" vira moeda e cai no `monitor`; etiqueta "Investir" |
| quem precisa de site | 7 | no monitor, o mapa com os pinos |
| mappoa.com, lista, pet shops, Campo Grande, sem site | 8 | `navegador` e `tela` com "Pet shops · Campo Grande, MS" e o grupo SEM SITE |
| Mappoa, sistema, precisa do seu serviço | 9 | rótulo "Mappoa", a análise do Banho & Tosa Pantanal com o score, o `robo` |
| antes esperava parado | 10 | a estátua no pedestal, com os pombos |
| agora chega primeiro | 10 | na porta de outro pet shop, ele mostra a análise pra dona; o `rival` chega atrasado |
| ficava parado ou ia atrás, PEDRA ou ATRÁS, mappoa.com | 11 | o pedestal vazio com um pombo só; etiquetas PEDRA e ATRÁS; cartão de seguir; `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3,5 s
> "Se você esperar o primeiro cliente parado, vai virar isso."

- **NA TELA:** o calçadão; no meio dele, o Enzo inteiro de pedra cinza em cima do `pedestal`, de pé, segurando o
  `notebook` aberto com teia de aranha, a `plaquinha` "FAÇO SITES" no peito e a cara de espera congelada; um `pombo`
  desce voando e pousa na cabeça dele; dois pedestres passam pela frente sem olhar
- **MOSTRA:** `["personagem", "pedestal", "pombo"]`
- **CENÁRIO:** `rua_predios` de dia, prédios altos dos dois lados, gente andando e um carro passando na esquina ao fundo
- **ENTRA AGORA:** a estátua já no 1º quadro; o pombo entra voando do alto em "esperar" e pousa em "parado"; a plaquinha
  de bronze do pedestal aparece no corte 3
- **OBJETOS SE MEXENDO:** o pombo batendo as asas e pousando (dá duas bicadinhas na cabeça de pedra); os pedestres
  andando; folhas soltas passando no chão
- **PERSONAGEM:** de pedra, sem se mexer · em "isso": só os olhos (a única coisa viva) se mexem e olham pro pombo na
  cabeça, desesperados (o único movimento dele, pra dar o susto)
- **INTERAÇÃO:** o pombo pousa e bica a cabeça dele; um pedestre esbarra no pedestal e nem olha
- **CÂMERA:** 3 cortes rápidos (~1 s): **(1)** o rosto de pedra e o pombo chegando, médio-perto, de frente, a câmera a
  ~2,5 m (sem colar) · **(2)** `K.heroi`, de baixo pra cima, a estátua contra os prédios gigantes · **(3)** aberto, de
  frente ~5° (logo depois de uma árvore da direita), a estátua inteira no meio do calçadão e os pedestres passando; topo
  livre pra frase da capa
- **EFEITOS VISUAIS:** linhas de "tremidinha" nos olhos em "isso" · etiqueta "Web designer esperando" bem pequena no
  pedestal no corte 3
- **SONS:** `estalo` no 1º quadro · bater de asas (`whoosh` curto) · `pingo` das bicadinhas

#### 2 · plano `disponivel` · ~4,5 s
> "O Enzo é web designer. Pendurou 'faço sites' no peito e ficou parado esperando."

- **NA TELA:** o Enzo colorido (o começo da história), no chão, do lado do `pedestal` vazio; ele pendura a `plaquinha`
  "FAÇO SITES" no pescoço, sobe no pedestal com o `notebook` e fica parado, de braços prontos, olhando a rua
- **MOSTRA:** `["personagem", "plaquinha", "pedestal"]`
- **CENÁRIO:** `rua_predios` de dia, pedestres passando
- **ENTRA AGORA:** etiqueta "Web designer" em "designer"; a plaquinha sobe pro pescoço em "pendurou"; ele sobe no pedestal
  em "parado"
- **OBJETOS SE MEXENDO:** a plaquinha balançando no barbante; o notebook abrindo
- **PERSONAGEM:** ajeitando a plaquinha no peito, sorrindo orgulhoso · em "parado": sobe no pedestal com um pulinho,
  faz pose (peito estufado) e congela
- **INTERAÇÃO:** ele pendura a plaquinha e dá dois tapinhas nela; depois sobe no pedestal
- **CÂMERA:** 2 cortes: chegando · médio · esquerda ~20° · olho, nele e na plaquinha → `K.mirar` fixo a ~5 m, de frente,
  um pouco de baixo, ele em cima do pedestal inteiro
- **EFEITOS VISUAIS:** etiqueta "Web designer"
- **SONS:** `passo` · `pop` da plaquinha · `baque` leve do pulo no pedestal

#### 3 · plano `esperando` · ~3,5 s · jogo `falha`
> "Passou um mês, ele virou pedra. Só o pombo apareceu."

- **NA TELA:** o `calendario` ao lado da estátua trocando de 1 a 30 bem rápido, com as folhas voando; a cor do Enzo vira
  cinza-pedra dos pés pra cima; o `musgo` e a teia aparecem; o `pombo` pousa na cabeça e mais 3 no ombro e no notebook
- **MOSTRA:** `["personagem", "calendario", "pombo"]`
- **CENÁRIO:** `rua_predios`, o céu passando de dia pra tarde e voltando (o tempo correndo); pedestres passando rápido
  (acelerados)
- **ENTRA AGORA:** o calendário em "mês"; a pedra subindo em "pedra" (dos pés à cabeça em ~0,8 s); os pombos em "pombo";
  congela em "apareceu" (o jogo faz)
- **OBJETOS SE MEXENDO:** as folhas do calendário voando; o musgo crescendo nos pés; os pombos chegando um por um
- **PERSONAGEM:** começo: sorriso esperançoso, olhando o celular a cada folha · em "pedra": o sorriso vai murchando e
  vira pedra no meio da cara de tédio
- **INTERAÇÃO:** os pombos pousam nele e um faz ninho no notebook
- **CÂMERA:** orbitando · médio · da esquerda pra frente · olho, a estátua e o calendário no centro → chegando · perto ·
  frente · no rosto de pedra com o pombo (a ~2,5 m)
- **EFEITOS VISUAIS:** etiqueta "30 dias" em cima do calendário · congela (o jogo)
- **SONS:** folhas de papel (`whoosh` curto repetido) · `estalo` da pedra · arrulho (`pingo` grave) dos pombos · o congela

#### 4 · plano `negocio` · ~4,5 s · jogo `corrige`
> "Só que o pet shop da frente não tem site, e o cliente nem acha o horário do banho."

- **NA TELA:** do outro lado do calçadão, a `loja_petshop` "Pet Shop Patinha Feliz", com a `dona` na porta e o `cachorro`
  coberto de espuma do lado; a etiqueta vermelha "Sem site" na placa; um pedestre parado perto da loja com o `celular`
  na busca "Patinha Feliz horário banho" e o ✗; a estátua pequena ao fundo, à esquerda
- **MOSTRA:** `["loja_petshop", "dona", "celular"]`
- **CENÁRIO:** `rua_predios` de dia
- **ENTRA AGORA:** a cor volta (o corrige); a etiqueta "Sem site" em "site"; o celular sobe do lado da cabeça do pedestre
  em "cliente"; o ✗ em "banho"
- **OBJETOS SE MEXENDO:** o cachorro abanando o rabo e sacudindo a espuma; o celular rolando a busca vazia
- **PERSONAGEM:** (o Enzo de pedra ao fundo, os olhos virando pra loja em "frente") · a dona varre a calçada e olha o
  relógio · o pedestre coça a cabeça em "nem acha" (`coca_cabeca`) e vai embora
- **INTERAÇÃO:** o pedestre mostra o celular pra dona, que dá de ombros (`ombros`)
- **CÂMERA:** 2 cortes: `K.ombro` por cima do ombro de pedra do Enzo olhando a loja (o "da frente") · → `K.mirar` fixo a
  ~4 m, de frente, na porta, a dona, o cachorro e o celular no quadro
- **EFEITOS VISUAIS:** etiqueta vermelha "Sem site" · ✗ no celular · balão de pensamento do pedestre "Que horas abre?"
- **SONS:** `passo` · `erro` do ✗ · latido curto (`pop`)

#### 5 · plano `outro` · ~4 s
> "Aí passa outro web designer, que foi atrás. Entra no pet shop e fecha."

- **NA TELA:** o `rival` de moletom vermelho vem andando pelo calçadão, passa do lado da estátua, olha pra ela de
  relance, ri e segue reto até a porta do pet shop; aperto de mão com a `dona` e o `contrato` com o carimbo FECHADO; o
  `cachorro` pula nele
- **MOSTRA:** `["rival", "pedestal", "dona"]` → `["rival", "dona", "loja_petshop"]`
- **CENÁRIO:** `rua_predios` de dia, pedestres passando
- **ENTRA AGORA:** etiqueta vermelha "Outro web designer" em "designer"; o carimbo em "fecha"
- **OBJETOS SE MEXENDO:** o contrato aparece entre os dois e o carimbo desce; o cachorro pulando
- **PERSONAGEM:** o rival anda decidido e dá um tapinha no pedestal ao passar · a dona sorri e faz joia em "fecha" · o
  Enzo de pedra: só os olhos seguem o rival, e uma rachadurinha aparece na testa de raiva
- **INTERAÇÃO:** o rival bate no pedestal; aperto de mão; a dona pega o contrato
- **CÂMERA:** `K.seguir(rival, { lado: 'tras' })` passando pela estátua (x ~0,4, logo depois de uma árvore da direita) →
  `K.mirar` fixo a ~3 m, de frente, no aperto de mão
- **EFEITOS VISUAIS:** etiqueta "Outro web designer" · carimbo FECHADO vermelho · ✓ em cima da dona
- **SONS:** `passo` · `baque` do carimbo · `certo`

#### 6 · plano `decide` · ~4,5 s
> "Cliente não visita estátua. Então o Enzo racha a pedra e decide ir atrás."

- **NA TELA:** (1) a estátua sozinha; um pedestre passa e pendura o casaco no braço de pedra dela, como num cabide;
  etiqueta "Cliente não visita estátua ✗" · (2) a pedra trinca do peito pra fora (`K.rachadura` no pedestal), os
  `cascas` voam pra todo lado, os pombos fogem, e o Enzo sai colorido, joga o casaco longe e pula do pedestal
- **MOSTRA:** `["personagem", "pedestal"]` → `["personagem", "cascas", "pombo"]`
- **CENÁRIO:** `rua_predios`; os pedestres param e olham na rachadura
- **ENTRA AGORA:** o casaco em "visita"; a 1ª trinca em "racha"; os cacos e os pombos em "pedra"; ele pula em "atrás"
- **OBJETOS SE MEXENDO:** os cacos em arco caindo no chão e quicando; os pombos voando pra cima; a plaquinha "FAÇO
  SITES" cai no chão
- **PERSONAGEM:** começo: de pedra, os olhos virando pro casaco, indignado · em "racha": estica os braços com força
  (a pedra estoura), sacode a poeira · em "atrás": pula e sai andando pra loja, decidido
- **INTERAÇÃO:** o pedestre pendura o casaco nele; ele joga o casaco pro lado; pisa na plaquinha caída
- **CÂMERA:** (1) chegando · médio · direita ~20° · olho, a estátua e o pedestre · (2) `K.mirar` fixo a ~5 m de frente
  (aberto, pros cacos caberem), com tremida da rachadura
- **EFEITOS VISUAIS:** etiqueta "Cliente não visita estátua" com ✗ · `K.rachadura` · `K.ondaChoque` no pulo · poeira
- **SONS:** `estalo` · `baque` grande da pedra estourando · bater de asas · `whoosh`

#### 7 · plano `investe` · ~5 s
> "Ele investe o preço de um banho e tosa numa ferramenta que mostra quem precisa de site."

- **NA TELA:** o quarto; ele de pé do lado da mesa (ainda com poeira de pedra no ombro) com a `nota` de "1 banho e tosa"
  na mão; ela vira moeda e cai no computador; no `monitor`, o mapa com os pinos
- **MOSTRA:** `["personagem", "nota", "monitor"]`
- **CENÁRIO:** `home_office` de dia, a cadeira giratória no SEAT
- **ENTRA AGORA:** etiqueta "Investir" em "investe"; a nota em "tosa"; a moeda em "ferramenta"; os pinos em "precisa"
- **OBJETOS SE MEXENDO:** a nota gira e vira moeda, a moeda cai em arco na tela; os pinos pulam no mapa
- **PERSONAGEM:** `sim` com a cabeça em "investe" · vira pro computador e senta em "ferramenta"
- **INTERAÇÃO:** ele joga a moeda no computador
- **CÂMERA:** chegando · médio · esquerda ~20° · olho → subindo · médio · frente, na tela (lado até 30°, sem 'alto': o
  quarto tem teto)
- **EFEITOS VISUAIS:** etiqueta "Investir" · pinos no mapa · poeirinha caindo do ombro dele
- **SONS:** `pingo` da moeda · `estalo` dos pinos

#### 8 · plano `lista` · ~5 s
> "No computador, digita mappoa.com, e vem a lista dos pet shops de Campo Grande sem site."

- **NA TELA:** o `navegador` com mappoa.com sendo digitado; a `tela` sobe com "Pet shops · Campo Grande, MS", o grupo SEM
  SITE e os cartões (Banho & Tosa Pantanal, Pet Ipê, Cãopeão Pet, Au Au Campo Grande)
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_office`
- **ENTRA AGORA:** as letras do mappoa.com uma a uma em "digita"; a tela sobe em "lista"; o grupo SEM SITE em "site"
- **OBJETOS SE MEXENDO:** os cartões entrando de cima pra baixo
- **PERSONAGEM:** sentado, `digitando` · em "site": aponta pra tela, sorrindo
- **INTERAÇÃO:** ele digita; a lista responde
- **CÂMERA:** chegando · perto no teclado → afastando · médio · frente
- **EFEITOS VISUAIS:** etiqueta verde "Sem site"
- **SONS:** cliques · `brilho` · `bip`

#### 9 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** o padrão do canal: a análise do Banho & Tosa Pantanal ("Aderência 91/100", "Sem site: horário e preço só
  pelo WhatsApp", "Site com serviços, preços e agenda do banho"), o `robo` e o Enzo comemorando
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** rótulo amarelo "Mappoa" em "Mappoa"; o score em "precisa"
- **OBJETOS SE MEXENDO:** o score enchendo até 91
- **PERSONAGEM:** `comemorando` · em "serviço": joia pro robô
- **INTERAÇÃO:** o robô aponta a análise e o Enzo bate na mão dele
- **CÂMERA:** como no aspirador-de-cliente (orbitando · médio · frente)
- **EFEITOS VISUAIS:** rótulo "Mappoa"
- **SONS:** `brilho` · `certo`

#### 10 · plano `antes_agora` · ~4 s · jogo `avanca`
> "Antes, o Enzo esperava parado. Agora, ele chega primeiro."

- **NA TELA:** (1) "Antes": a estátua de pedra no pedestal com os pombos, o calendário passando · (2) "Agora": na porta
  da loja PET SHOP (mais pra frente no calçadão, redesenhada "Banho & Tosa Pantanal"), ele mostra a `tela` com a análise
  pra `dona`, que faz joia, e o `cachorro` pula de alegria; o `rival` chega correndo atrás, atrasado, e põe a mão na
  testa
- **MOSTRA:** `["personagem", "pedestal"]` → `["personagem", "dona", "rival"]`
- **CENÁRIO:** `rua_predios` nos dois (o "Antes" no meio do calçadão, o "Agora" na outra ponta)
- **ENTRA AGORA:** a troca em "Agora"; ✓ e etiqueta verde "Chegou primeiro" em "primeiro"
- **OBJETOS SE MEXENDO:** (1) as folhas do calendário · (2) o cachorro pulando, a espuma voando
- **PERSONAGEM:** (1) de pedra, olhos parados · (2) estende a tela pra dona, sorrindo; aperto de mão em "primeiro"
- **INTERAÇÃO:** a dona olha a tela e faz joia; aperto de mão
- **CÂMERA:** (1) `K.heroi` de baixo, a estátua contra os prédios (diferente do gancho: do lado direito) · (2)
  `K.mirar` fixo a ~4 m, de frente, na porta
- **EFEITOS VISUAIS:** ✓ · etiqueta verde "Chegou primeiro" · etiqueta vermelha "Atrasado" no rival
- **SONS:** `whoosh` na troca · `certo`

#### 11 · plano `segue` · ~7 s
> "E você, ficava parado ou ia atrás? Comenta PEDRA ou ATRÁS. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o pedestal vazio, rachado, com um pombo só em cima, olhando em volta; o Enzo de pé do lado dele, olhando
  pra câmera; duas etiquetas grandes: cinza "PEDRA" (em cima do pedestal) e verde "ATRÁS" (em cima dele); depois o
  cartão de seguir, mappoa.com digitado e o robô acenando
- **MOSTRA:** `["personagem", "pedestal", "pombo", "navegador"]`
- **CENÁRIO:** `rua_predios` de dia
- **ENTRA AGORA:** etiqueta "PEDRA" em "PEDRA"; etiqueta "ATRÁS" em "ATRÁS"; o cartão de seguir em "computador" (só na
  tela, sem falar); as letras em "digita"
- **OBJETOS SE MEXENDO:** o pombo pulando de um lado pro outro do pedestal; o botão do cartão virando "Seguindo"
- **PERSONAGEM:** em "você": abre os braços pra câmera, perguntando · em "PEDRA": aponta pro pedestal · em "ATRÁS":
  aponta pra si, com joia · aponta pro cartão quando ele aparece · acena no fim
- **INTERAÇÃO:** ele espanta o pombo do pedestal com a mão; depois aperta o botão do cartão
- **CÂMERA:** chegando · médio · esquerda ~15° · olho, ele e o pedestal → o padrão do canal no cartão
- **EFEITOS VISUAIS:** etiquetas PEDRA e ATRÁS · cartão de seguir
- **SONS:** `estalo` · cliques · `ding`

**Cauda** · plano `cartao` · 1,6 s: o cartão em "Seguindo", o Enzo e o robô acenando, o pombo pousado no pedestal vazio.
