# Você ligou o aspirador de cliente no máximo: roteiro e ficha de cena

> Ideia escolhida pelo dono em 14/11/2026 (a 2ª da leva "objeto que promete cliente e traz a coisa errada", que nasceu
> do ímã que só puxa boleto). Receita dos 3 mais vistos: a dor é do PRÓPRIO web designer, sem cliente, falando com
> "você"; o gancho é uma METÁFORA absurda (um aspirador gigante sugando de tudo, menos cliente); a frase deixa a
> curiosidade aberta ("Olha o que veio."); rival que fecha o cliente; virada de atitude (não é puxar todo mundo, é ir em
> quem precisa); o Mappoa entra tarde como decisão de investir ("o preço de uma lavagem", que conversa com o lava-jato);
> ~45 s; fim "Comenta a sua cidade e segue". Frases 8 e 10 com a narração copiada do invisível (não gastam crédito).

## Roteiro

1. Você ligou o aspirador de cliente no máximo. Olha o que veio. *(gancho)*
2. O Davi é web designer e mandou "faço sites" pra quinhentos números de uma vez.
3. Veio o primo pedindo de graça, gente que já tem site e um "quanto é?" que sumiu.
4. Enquanto isso, outro web designer foi direto no lava-jato sem site e fechou.
5. Não é puxar todo mundo. É ir em quem precisa de você.
6. Então o Davi investe o preço de uma lavagem numa ferramenta que mostra quem precisa de site.
7. No computador, digita mappoa.com, e vem a lista dos lava-jatos de Cuiabá sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Davi puxava qualquer um. Agora, ele vai direto no cliente.
10. Qual foi a proposta mais absurda que já te enviaram? No computador, digita mappoa.com e testa você também.

O pedido de seguir fica só na tela (o cartão de seguir), sem falar.

Cerca de 139 palavras, uns 46 s com o cartão de seguir. Gasta uns 670 caracteres da ElevenLabs (só a 8 reaproveitada).

**Capa:** "Aspirador de *cliente*?", o Davi segurando o aspirador gigante com a cara de desespero, e saindo do bocal o
primo, um gato, uma bota e balões de "quanto é?".

## O que foi conferido

- Sem preço, sem plano e sem número de venda. O "quinhentos números" é o que o Davi fez (o erro), não resultado do Mappoa
- O Mappoa: busca por segmento e cidade ("lava-jatos em Cuiabá"), a lista SEM SITE e a análise com score, dores e
  oportunidades. Nada de "manda a mensagem sozinho" nem "garante a venda". Quem vai até o lava-jato é o Davi
- O disparo em massa é mostrado como o erro (puxar todo mundo); o Mappoa não aparece disparando nada
- Entra tarde (6), como decisão de investir ("o preço de uma lavagem"), sem valor exato e sem "grátis"
- Sem "Esse é o Davi": ele aparece dentro da ação (2), segurando o aspirador
- Empresas inventadas: Lava-Jato Brilho Total (o que o rival fecha) e, na lista, Lava Rápido Pantanal, Auto Spa
  Coxipó, Lava-Jato do Porto e Espuma Cuiabana. Cidade nova no canal: Cuiabá, MT. Nicho novo: lava-jato
- Nome novo: Davi (já foram Caio, Léo, Rafa, Vitor, Mateus, Lucas, Nando, Téo, Gui, Igor, Thiago, Pedro, Vini, Beto e Murilo)
- O aspirador é a imagem da dor (puxar qualquer um e não vir cliente); a dor continua sendo achar o próximo cliente
- Comentário pedido pelo dono (14/11/2026), em forma de pergunta: "Qual foi a proposta mais absurda que já te
  enviaram?". Puxa uma história pessoal, conversa com o primo e o "quanto é?" da frase 3, e não promete mostrar nada
  pra quem comentar. O "segue" não vai na fala: só no cartão de seguir da tela

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `home_office` de dia (1, 2, 3, 6, 7 e o "Antes" da 9, 10), `rua_predios` de dia
(4 e 5: o calçadão com a loja LAVA-JATO), `oficina` (o "Agora" da 9: o lava-jato por dentro, com a placa trocada pra
"Lava-Jato" e um carro com espuma) e `mundo_mappoa` (8).
**Personagens:** o do canal, chamado Davi, em todas. O **primo** (`K.boneco`, boné virado e camiseta amarela) na 1 e na 3.
O **dono** do Lava-Jato Brilho Total (`K.personagem` operário, macacão azul e balde) na 4. O **rival** (moletom vermelho)
na 4 e na 9. O **dono do Lava Rápido Pantanal** (operário, macacão verde) no "Agora" da 9. O **robô** na 8 e na 10.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Davi, web designer | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 10 |
| `aspirador` | o aspirador de cliente gigante, com a etiqueta "CLIENTES" | peça nova em `canal/pecas/objetos.js`: corpo vermelho redondo com rodinhas, mangueira sanfonada cinza, bocal largo, botão "MÁX" que acende; `ligar(k)` treme e gira o ar | corpo 1,2 m, mangueira 2,5 m, vermelho #d93a2f | no chão do quarto, o bocal virado pra janela | 1, 3, 9 |
| `sugados` | o que vem voando pro bocal | folhas (`K.folhasVento`), um gato, uma bota, uma meia, uma pantufa, o boleto, balões "quanto é?" | pequenos, cada um ~0,3 | voam da janela até o bocal | 1, 3 |
| `primo` | o primo pedindo site de graça | `K.boneco`, boné virado, camiseta amarela | 1,47 (sugado, gira no ar) | sai do bocal | 1, 3 |
| `monitor` | o computador do Davi | `K.computador` | escala 1,55 | na mesa do quarto | 2, 6, 7, 10 |
| `disparo` | a tela "Enviando 'faço sites' pra 500 contatos", barra enchendo | tela do `K.computador` | — | no monitor | 2 |
| `contador` | "0 / 500" subindo até "500 / 500" | `K.contador` | amarelo | acima do monitor | 2 |
| `balao_quanto` | o balão "quanto é?" que some | `K.balaoFala` | branco | sai do bocal e estoura | 3 |
| `loja_lavajato` | a loja LAVA-JATO do calçadão | `C.lojas` com a placa redesenhada | o cenário | lado esquerdo do calçadão | 4, 5 |
| `dono` | o dono do Lava-Jato Brilho Total | `K.personagem('operario')`, macacão azul, balde | 1,47 | na porta do LAVA-JATO | 4 |
| `rival` | o outro web designer | `K.boneco`, moletom vermelho | 1,47 | andando no calçadão / na porta | 4, 9 |
| `contrato` | o contrato FECHADO do rival | folha + carimbo vermelho | 0,62 × 0,82 | entre o rival e o dono | 4 |
| `nota` | a nota de "1 lavagem" | `K.pecas`: papel verde com um carrinho e espuma | 0,4 × 0,22 | na mão dele | 6 |
| `navegador` | barra com mappoa.com | `K.painelMappoa` | 2,3 × 0,4 | acima do computador | 7, 10 |
| `tela` | a lista dos lava-jatos de Cuiabá, depois a análise do Lava Rápido Pantanal | `K.painelMappoa` | 1,4 × 2,33 / 1,56 × 2,6 | sobe do computador / palco / na mão dele | 7, 8, 9 |
| `carro` | o carro coberto de espuma | o carro do cenário `oficina` + espuma (esferas brancas) | o cenário | no meio da oficina | 9 |
| `dono2` | o dono do Lava Rápido Pantanal | `K.personagem('operario')`, macacão verde | 1,47 | ao lado do carro | 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, quarto | 8, 10 |

### Teste dos substantivos

| A narração fala | Frase | Como |
|---|---|---|
| aspirador de cliente, no máximo | 1 | o `aspirador` gigante com a etiqueta "CLIENTES", o botão "MÁX" acendendo e tremendo |
| olha o que veio | 1 | entram pelo bocal folhas, a bota, o gato, o `primo` girando no ar |
| web designer | 2 | etiqueta "Web designer" |
| "faço sites", quinhentos números, de uma vez | 2 | no `monitor`, o `disparo`; o `contador` 0 → 500 |
| o primo pedindo de graça | 3 | o `primo` sai do bocal com o balão "Faz de graça?" |
| gente que já tem site | 3 | uma tela de site pronto vem voando e bate na cara dele, com o ✗ |
| um "quanto é?" que sumiu | 3 | o `balao_quanto` sai do bocal e estoura (poof) |
| outro web designer, lava-jato sem site, fechou | 4 | o `rival` vai até o `dono` na porta do `loja_lavajato` (etiqueta vermelha "Sem site"), aperto de mão, `contrato` FECHADO |
| não é puxar todo mundo | 5 | o Davi desliga o aspirador (ele murcha), etiqueta "Não é todo mundo" com ✗ |
| ir em quem precisa de você | 5 | ele anda até a porta de outra loja com a etiqueta verde "Precisa de você" |
| o preço de uma lavagem, ferramenta | 6 | a `nota` de "1 lavagem" vira moeda e cai no computador; etiqueta "Investir" |
| quem precisa de site | 6 | no monitor, o mapa com os pinos |
| mappoa.com, lista, lava-jatos, Cuiabá, sem site | 7 | `navegador` e `tela` com "Lava-jatos · Cuiabá, MT" e o grupo SEM SITE |
| Mappoa, sistema, precisa do seu serviço | 8 | rótulo "Mappoa", a análise do Lava Rápido Pantanal com o score, o `robo` |
| antes puxava qualquer um | 9 | o quarto, ele com o aspirador cheio de tralha |
| agora vai direto no cliente | 9 | no lava-jato, ele mostrando a análise pro `dono2` ao lado do `carro` de espuma; joia |
| a proposta mais absurda, te enviaram, mappoa.com | 10 | balão "Faz de graça que eu divulgo!" saindo do bocal e etiqueta "A mais absurda?", cartão de seguir, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3,5 s
> "Você ligou o aspirador de cliente no máximo. Olha o que veio."

- **NA TELA:** o quarto; o Davi de pé segurando o bocal do `aspirador` gigante com as duas mãos, apontado pra janela
  aberta; o corpo vermelho com a etiqueta "CLIENTES" tremendo atrás dele; em "veio", entram voando pela janela folhas,
  uma bota, um gato e o `primo` girando no ar, todos indo pro bocal
- **MOSTRA:** `["aspirador", "personagem", "primo"]`
- **CENÁRIO:** `home_office` de dia, a cortina sendo puxada pro bocal
- **ENTRA AGORA:** o aspirador já no 1º quadro; o botão "MÁX" acende na palavra "máximo"; os `sugados` em "veio"
  (um a cada ~0,25 s), o `primo` por último
- **OBJETOS SE MEXENDO:** o corpo do aspirador tremendo (cada vez mais em "máximo"); a mangueira balançando; os
  `sugados` em curva da janela até o bocal, girando; a cortina esticada pra dentro
- **PERSONAGEM:** o Davi firme, puxando o bocal, sorrindo confiante · em "veio": arregala os olhos e é puxado um passo
  pra trás quando o primo bate no bocal
- **INTERAÇÃO:** ele segura o bocal; a bota bate na cabeça dele; o primo para entalado no bocal, acenando
- **CÂMERA:** 3 cortes rápidos (~1 s): **(1)** o botão "MÁX" acendendo, perto, na altura dele (com o Davi atrás, sem
  colar na lente) · **(2)** o Davi segurando o bocal, médio, de frente, a janela atrás · **(3)** aberto, de lado ~25°, o
  aspirador inteiro, o Davi e a tralha voando; topo livre pra frase da capa
- **EFEITOS VISUAIS:** etiqueta "Aspirador de cliente" (palavra "aspirador") · linhas de vento (`K.folhasVento`) · ✗ no
  primo entalado em "veio"
- **SONS:** `estalo` no 1º quadro · ronco do aspirador (o `zap` grave em loop, ou `whoosh` repetido) · `baque` da bota

#### 2 · plano `dispara` · ~4,5 s
> "O Davi é web designer e mandou 'faço sites' pra quinhentos números de uma vez."

- **NA TELA:** o Davi sentado no `monitor` com a tela do `disparo` ("Enviando 'faço sites'..."), a barra enchendo, e o
  `contador` em cima subindo de 0 a 500
- **MOSTRA:** `["personagem", "monitor", "contador"]`
- **CENÁRIO:** `home_office` de dia; o aspirador desligado no canto, ao fundo
- **ENTRA AGORA:** etiqueta "Web designer" em "designer"; o disparo em "mandou"; o contador começa em "quinhentos" e
  chega no fim em "vez"
- **OBJETOS SE MEXENDO:** a barra de envio enchendo; os aviõezinhos de mensagem saindo da tela e voando pra fora do
  quadro, dezenas
- **PERSONAGEM:** sentado na cadeira giratória, `digitando` · em "vez": bate a mão na mesa, satisfeito, e cruza os braços
- **INTERAÇÃO:** ele aperta Enter com força; a tela responde com o disparo
- **CÂMERA:** 2 cortes: chegando · perto · direita ~25° · olho no rosto e na tela → afastando · médio · esquerda ~20° ·
  olho, com o contador no alto dentro do alvo
- **EFEITOS VISUAIS:** etiqueta "Web designer" · contador amarelo "0 / 500" → "500 / 500"
- **SONS:** cliques do teclado · `whoosh` curtinho de cada aviãozinho (poucos) · `ding` no 500

#### 3 · plano `tralha` · ~4,5 s · jogo `falha`
> "Veio o primo pedindo de graça, gente que já tem site e um 'quanto é?' que sumiu."

- **NA TELA:** o aspirador ligado de novo; do bocal saem, um por vez: o `primo` com o balão "Faz de graça?", uma tela
  de site pronto que bate na cara do Davi (✗ "Já tem site"), e o `balao_quanto` "quanto é?" que estoura e some
- **MOSTRA:** `["aspirador", "primo", "personagem"]`
- **CENÁRIO:** `home_office`, o quarto agora cheio de folhas e tralha no chão
- **ENTRA AGORA:** o primo em "primo"; a tela de site em "site"; o balão em "quanto"; o poof em "sumiu"; congela em
  "sumiu" (o jogo faz)
- **OBJETOS SE MEXENDO:** o primo cai sentado do bocal e se levanta; a tela de site gira e bate; o balão sobe e estoura
- **PERSONAGEM:** o Davi segurando o bocal · em "site": a tela bate e ele cambaleia · em "sumiu": `ombros`, cara de
  decepção
- **INTERAÇÃO:** o primo cutuca o Davi com o balão; a tela de site acerta o rosto dele
- **CÂMERA:** chegando · médio · frente ~10° · olho, o bocal e o Davi no centro → passando · médio · direita ~25° · olho
  pro balão
- **EFEITOS VISUAIS:** balão "Faz de graça?" · ✗ "Já tem site" · `K.poof` do "quanto é?" · congela (o jogo)
- **SONS:** `estalo` do balão · `baque` da tela · poof · o congela (o jogo)

#### 4 · plano `rival` · ~4 s · jogo `corrige`
> "Enquanto isso, outro web designer foi direto no lava-jato sem site e fechou."

- **NA TELA:** o calçadão; o `rival` anda reto até a porta da `loja_lavajato`, onde o `dono` de macacão e balde espera;
  aperto de mão e o `contrato` com o carimbo FECHADO
- **MOSTRA:** `["rival", "dono", "loja_lavajato"]`
- **CENÁRIO:** `rua_predios` de dia, pedestres e o carro passando no fundo
- **ENTRA AGORA:** a cor volta (o corrige); etiqueta vermelha "Outro web designer" em "designer"; etiqueta "Sem site" na
  placa em "site"; o carimbo em "fechou"
- **OBJETOS SE MEXENDO:** o contrato aparece entre os dois e o carimbo desce; espuma pingando do balde
- **PERSONAGEM:** o rival anda decidido, sem olhar pros lados, e estende a mão · o dono sorri e faz joia em "fechou"
- **INTERAÇÃO:** aperto de mão; o dono pega o contrato
- **CÂMERA:** `K.seguir(rival, { lado: 'tras' })` no calçadão (x ~0,4, logo depois de uma árvore da direita) → `K.mirar`
  fixo a ~3 m, de frente, no aperto de mão
- **EFEITOS VISUAIS:** etiquetas · carimbo FECHADO vermelho · ✓ em cima do dono
- **SONS:** `passo` · `baque` do carimbo · `certo`

#### 5 · plano `virada` · ~3,5 s
> "Não é puxar todo mundo. É ir em quem precisa de você."

- **NA TELA:** (1) no quarto, o Davi aperta o botão e o aspirador desliga, murcha e solta toda a tralha no chão;
  etiqueta vermelha "Todo mundo ✗" · (2) no calçadão, ele anda até a porta de uma loja com a etiqueta verde
  "Precisa de você"
- **MOSTRA:** `["personagem", "aspirador"]` → `["personagem", "loja_lavajato"]`
- **CENÁRIO:** `home_office` → `rua_predios`
- **ENTRA AGORA:** o desligar em "puxar"; o corte pra rua em "ir"; a etiqueta verde em "precisa"
- **OBJETOS SE MEXENDO:** o aspirador murchando (escala do corpo 1 → 0,85) e a tralha caindo; a mangueira despenca
- **PERSONAGEM:** começo: apertando o botão, `nao` com a cabeça · em "ir": anda decidido, de peito aberto
- **INTERAÇÃO:** ele aperta o botão "MÁX", que apaga; depois empurra a porta da loja
- **CÂMERA:** (1) chegando · médio · esquerda ~20° · olho, no botão e nele · (2) `K.mirar` fixo no meio do calçadão
  (x ~0,5), com ele vindo pra câmera
- **EFEITOS VISUAIS:** etiqueta "Todo mundo" com ✗ · etiqueta verde "Precisa de você" · ✓
- **SONS:** `bip` do botão · ronco morrendo · `baque` da tralha · `passo` · `brilho`

#### 6 · plano `investe` · ~5 s
> "Então o Davi investe o preço de uma lavagem numa ferramenta que mostra quem precisa de site."

- **NA TELA:** o quarto; ele de pé do lado da mesa com a `nota` de "1 lavagem" na mão; ela vira moeda e cai no
  computador; no monitor, o mapa com os pinos
- **MOSTRA:** `["personagem", "nota", "monitor"]`
- **CENÁRIO:** `home_office` de dia, o aspirador desligado no canto, ao fundo
- **ENTRA AGORA:** etiqueta "Investir" em "investe"; a nota em "lavagem"; a moeda em "ferramenta"; os pinos em "precisa"
- **OBJETOS SE MEXENDO:** a nota gira e vira moeda, a moeda cai em arco na tela; os pinos pulam no mapa
- **PERSONAGEM:** `sim` com a cabeça em "investe" · vira pro computador em "ferramenta"
- **INTERAÇÃO:** ele joga a moeda no computador
- **CÂMERA:** chegando · médio · frente → subindo · médio · frente, na tela
- **EFEITOS VISUAIS:** etiqueta "Investir" · pinos no mapa
- **SONS:** `pingo` da moeda · `estalo` dos pinos

#### 7 · plano `lista` · ~5 s
> "No computador, digita mappoa.com, e vem a lista dos lava-jatos de Cuiabá sem site."

- **NA TELA:** o `navegador` com mappoa.com sendo digitado; a `tela` sobe com "Lava-jatos · Cuiabá, MT", o grupo SEM
  SITE e os cartões (Lava Rápido Pantanal, Auto Spa Coxipó, Lava-Jato do Porto, Espuma Cuiabana)
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_office`
- **ENTRA AGORA:** as letras do mappoa.com uma a uma em "digita"; a tela sobe em "lista"; o grupo SEM SITE em "site"
- **OBJETOS SE MEXENDO:** os cartões entrando de cima pra baixo
- **PERSONAGEM:** `digitando` · em "site": aponta pra tela, sorrindo
- **INTERAÇÃO:** ele digita; a lista responde
- **CÂMERA:** chegando · perto no teclado → afastando · médio · frente
- **EFEITOS VISUAIS:** etiqueta verde "Sem site"
- **SONS:** cliques · `brilho` · `bip`

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** igual ao padrão do canal: a análise do Lava Rápido Pantanal ("Aderência 90/100", "Sem site, orçamento
  só pelo WhatsApp", "Site com serviços, preços e horário pra agendar a lavagem"), o `robo` e o Davi comemorando
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** rótulo amarelo "Mappoa" em "Mappoa"; o score em "precisa"
- **OBJETOS SE MEXENDO:** o score enchendo até 90
- **PERSONAGEM:** `comemorando` · em "serviço": joia pro robô
- **INTERAÇÃO:** o robô aponta a análise e o Davi bate na mão dele
- **CÂMERA:** como no invisível (orbitando · médio · frente)
- **EFEITOS VISUAIS:** rótulo "Mappoa"
- **SONS:** `brilho` · `certo`

#### 9 · plano `antes_agora` · ~4 s · jogo `avanca`
> "Antes, o Davi puxava qualquer um. Agora, ele vai direto no cliente."

- **NA TELA:** (1) "Antes": no quarto, ele com o aspirador ligado e a tralha voando (gato, bota, primo) · (2) "Agora":
  no lava-jato, ao lado do `carro` coberto de espuma, ele mostra a análise pro `dono2`, que faz joia; o `rival` aparece
  na porta, atrasado, e põe a mão na testa
- **MOSTRA:** `["personagem", "aspirador"]` → `["personagem", "dono2", "carro"]`
- **CENÁRIO:** `home_office` → `oficina` com a placa "Lava-Jato" e espuma no chão
- **ENTRA AGORA:** a troca em "Agora"; ✓ e etiqueta verde "Direto no cliente" em "cliente"
- **OBJETOS SE MEXENDO:** (1) a tralha voando · (2) bolhas de espuma subindo do carro
- **PERSONAGEM:** (1) puxado pelo bocal, cambaleando · (2) estende a `tela` com a análise pro dono2, sorrindo
- **INTERAÇÃO:** o dono2 olha a tela e faz joia; aperto de mão
- **CÂMERA:** (1) aberto · esquerda ~25° · olho no quarto · (2) chegando · médio · frente · olho no lava-jato (sem
  'alto': a oficina tem teto)
- **EFEITOS VISUAIS:** ✓ · etiqueta verde "Direto no cliente"
- **SONS:** `whoosh` na troca · `certo`

#### 10 · plano `segue` · ~7 s
> "Qual foi a proposta mais absurda que já te enviaram? No computador, digita mappoa.com e testa você também."

- **NA TELA:** o aspirador no canto dá um último soluço e cospe um balão "Faz de graça que eu divulgo!"; o Davi olha pra
  câmera e revira os olhos; etiqueta amarela "A mais absurda?"; depois, o cartão de seguir, mappoa.com digitado e o
  robô acenando; o gato dormindo em cima do aspirador
- **MOSTRA:** `["personagem", "aspirador", "navegador", "monitor"]`
- **CENÁRIO:** `home_office`
- **ENTRA AGORA:** o balão em "proposta"; a etiqueta "A mais absurda?" em "absurda"; o cartão de seguir em "computador"
  (só na tela, sem falar); as letras em "digita"
- **OBJETOS SE MEXENDO:** o aspirador tremendo uma vez e o balão subindo; o botão do cartão virando "Seguindo"
- **PERSONAGEM:** revira os olhos pro balão em "absurda" (`mao_na_testa`) · em "enviaram?": abre os braços pra câmera,
  perguntando · aponta pro cartão quando ele aparece · acena no fim
- **INTERAÇÃO:** ele empurra o balão pra longe com a mão; depois aperta o botão do cartão
- **CÂMERA:** chegando · médio · esquerda ~20° · olho, nele e no aspirador → o padrão do canal (como no invisível) no cartão
- **EFEITOS VISUAIS:** balão de fala · etiqueta "A mais absurda?" · cartão de seguir
- **SONS:** `estalo` · cliques · `ding`

**Cauda** · plano `cartao` · 1,6 s: o cartão em "Seguindo", o Davi e o robô acenando, o gato dormindo no aspirador.
