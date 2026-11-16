# Tem empresa precisando de você. Pra ela, você é invisível: roteiro e ficha de cena

> Vídeo 3 dos "Próximos 3" (pauta, 13/11/2026), feito direto sem aprovação no meio (o dono pediu, 14/11/2026), com os
> 1.143 créditos que sobravam. Receita dos 3 mais vistos: a dor é do PRÓPRIO web designer, sem cliente, falando com
> "você"; o gancho é uma METÁFORA absurda (ele fica transparente e a dona do salão olha através dele pra acenar pro
> rival); a frase deixa curiosidade aberta; rival que fecha o cliente; virada de atitude (se ela não te vê, você vai
> até ela: ele volta a ficar sólido); o Mappoa entra tarde como decisão de investir ("investir uma cajuína", a bebida
> de Teresina); ~43 s; fim "Comenta a sua cidade e segue". Frases 8 e 10 com a narração copiada (não gastam crédito).

## Roteiro

1. Tem empresa precisando de você. Pra ela, você é invisível. *(gancho)*
2. O Vitor é web designer, tem portfólio e Instagram bonito. E só posta esperando alguém ver.
3. Só que a dona do salão da esquina nunca ouviu falar dele.
4. Quem ela viu foi outro web designer, que bateu na porta e fechou o site.
5. Se ela não te vê, você vai até ela.
6. Então o Vitor decide investir uma cajuína numa ferramenta que mostra quem precisa de site.
7. No computador, digita mappoa.com, e vem a lista dos salões de Teresina sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Vitor era invisível. Agora, ele chega primeiro.
10. Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também.

Cerca de 128 palavras, uns 43 s com o cartão de seguir. Gasta uns 550 caracteres da ElevenLabs (sobram 1.143).

**Capa:** "Você é *invisível*?", o Vitor transparente na frente do salão e a dona acenando através dele.

## O que foi conferido

- Sem preço, sem plano e sem número falado. O score só como "NN/100" da análise
- O Mappoa: a busca por segmento e cidade ("salões de beleza em Teresina"), a lista SEM SITE e a análise com score,
  dores e oportunidades. Nada de "garante a venda" nem "manda a mensagem sozinho"
- Entra tarde (6), como decisão de investir ("investir uma cajuína"), sem valor exato e sem "grátis"
- Sem "Esse é o Vitor": ele aparece dentro da ação (2)
- Empresas inventadas: Salão Bella Fátima (o da esquina, que o rival fecha) e na lista Studio Ininga Beauty, Espaço Jóquei
  Hair, Salão Bela Centro e Glam Piçarra. Cidade nova: Teresina, PI. Salão já foi nicho em Campinas, com outra história
- O "invisível" é a imagem da dor (ninguém sabe que você existe); a dor continua sendo achar o próximo cliente

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `rua_predios` de dia (1, 5 e o "Antes" da 9: o calçadão com a loja SALÃO),
`home_office` de dia (2, 6, 7 e 10), `salao_beleza` (3, 4 e o "Agora" da 9: espelhos com luz, cadeiras, balcão) e
`mundo_mappoa` (8).
**Personagens:** o do canal, chamado Vitor, em todas, TRANSPARENTE (opacidade ~0,2, contorno azul claro) na 1, no começo
da 5 e no "Antes" da 9. A **dona** do Salão Bella Fátima (`K.personagem('cabeleireira')`) na 1, 3, 4, 5 e 9. O **rival**
(moletom vermelho) na 1, 4 e 9. A **dona do Studio Ininga** (`K.personagem('dona')`, blazer rosa) no "Agora" da 9. O
**robô** na 8 e na 10.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Vitor, web designer | `K.boneco`, cores do canal; materiais clonados pra ficar transparente | 1,47 | muda por cenário | 1 a 10 |
| `dona` | a dona do Salão Bella Fátima | `K.personagem('cabeleireira')` | 1,47 | na porta do SALÃO / perto das cadeiras | 1, 3, 4, 5, 9 |
| `rival` | o outro web designer | `K.boneco`, moletom vermelho | 1,47 | atrás do Vitor / entrando no salão | 1, 4, 9 |
| `loja_salao` | a loja SALÃO do calçadão | `C.lojas` | o cenário | atrás da dona | 1, 5, 9 |
| `celular` | o celular do Vitor com o post "Faço sites ✨ 0 curtidas" | tela do `K.computador` (Instagram desenhado) | — | no monitor | 2 |
| `monitor` | o computador do Vitor | `K.computador` | escala 1,55 | na mesa do quarto | 2, 6, 7, 10 |
| `contrato` | o contrato FECHADO do rival | folha + carimbo vermelho | 0,62 × 0,82 | entre o rival e a dona | 4 |
| `cajuina` | a garrafinha de cajuína | `K.pecas`: garrafa âmbar com rótulo | ~0,3 | na mão dele | 6 |
| `navegador` | barra com mappoa.com | `K.painelMappoa` | 2,3 × 0,4 | acima do computador | 7, 10 |
| `tela` | a lista dos salões de Teresina, depois a análise do Studio Ininga | `K.painelMappoa` | 1,4 × 2,33 / 1,56 × 2,6 | sobe do computador / palco / na mão dele | 7, 8, 9 |
| `dona2` | a dona do Studio Ininga Beauty | `K.personagem('dona')` | 1,47 | perto do balcão | 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, quarto | 8, 10 |

### Teste dos substantivos

| A narração fala | Frase | Como |
|---|---|---|
| empresa precisando de você | 1 | a `dona` na porta do SALÃO, balão "Preciso de um site!" |
| você é invisível | 1 | o Vitor transparente na frente dela; ela olha através dele e acena pro `rival`; etiqueta "Invisível" |
| web designer, portfólio, Instagram | 2 | etiqueta "Web designer"; no `monitor`, o post "Faço sites ✨" |
| posta esperando alguém ver | 2 | o post com "0 curtidas" e ele olhando o relógio, entediado |
| dona do salão, nunca ouviu falar dele | 3 | a `dona` arrumando a cadeira; balão de pensamento "Web designer? Nunca vi."; etiqueta "Sem site" |
| outro web designer, bateu na porta, fechou o site | 4 | o `rival` entra no salão, aperto de mão e o `contrato` com o carimbo FECHADO |
| você vai até ela | 5 | na rua, o Vitor anda até a porta do salão e volta a ficar sólido; etiqueta "Vai até ela" |
| investir uma cajuína, ferramenta | 6 | a `cajuina` na mão dele vira moeda e cai no computador; etiqueta "Investir" |
| quem precisa de site | 6 | no monitor, o mapa com os pinos |
| mappoa.com, lista, salões, Teresina, sem site | 7 | `navegador` e `tela` com "Salões de beleza · Teresina, PI" e o grupo SEM SITE |
| Mappoa, sistema, precisa do seu serviço | 8 | rótulo "Mappoa", a análise do Studio Ininga com o score, o `robo` |
| antes invisível | 9 | a rua, ele transparente na frente do salão |
| agora chega primeiro | 9 | no salão, ele sólido mostrando a análise pra `dona2`; o rival chega atrasado na porta e põe a mão na testa |
| a sua cidade, segue, mappoa.com | 10 | etiqueta "Sua cidade?" e pino, cartão de seguir, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3,5 s
> "Tem empresa precisando de você. Pra ela, você é invisível."

- **NA TELA:** o calçadão; a `dona` na porta do SALÃO com o balão "Preciso de um site!"; bem na frente dela, o Vitor
  TRANSPARENTE acenando ("Oi! Faço sites!"); ela olha através dele e acena pro `rival`, que vem chegando atrás
- **MOSTRA:** `["dona", "personagem", "rival"]`
- **CENÁRIO:** `rua_predios` de dia, a gente andando
- **ENTRA AGORA:** o balão dela já no 1º quadro; o Vitor some (fica transparente) na palavra "invisível"
- **OBJETOS SE MEXENDO:** o corpo do Vitor apagando (opacidade 1 → 0,2); um brilho azul no contorno
- **PERSONAGEM:** o Vitor acena e pula na frente dela · em "invisível": fica transparente, `mao_na_testa`. A dona: olha
  pra rua, procurando · em "ela": acena pro rival, sorrindo, através do Vitor
- **INTERAÇÃO:** ela olha através dele e chama o outro
- **CÂMERA:** 3 cortes rápidos (~1 s): **(1)** o Vitor acenando, perto, de frente · **(2)** o rosto da dona olhando
  através dele, perto · **(3)** os três no calçadão, `K.mirar` fixo no meio da rua, topo livre pra capa
- **EFEITOS VISUAIS:** etiqueta "Invisível" (palavra "invisível") · balões
- **SONS:** `estalo` no 1º quadro · `whoosh` no corte · `zap` quando ele fica transparente

#### 2 · plano `posta` · ~5 s
> "O Vitor é web designer, tem portfólio e Instagram bonito. E só posta esperando alguém ver."

- **NA TELA:** o quarto; o Vitor sentado no `monitor`, com o portfólio e depois o post do Instagram "Faço sites ✨" com
  "0 curtidas"; ele olha o relógio e apoia o queixo
- **MOSTRA:** `["personagem", "monitor"]` · **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** etiqueta "Web designer" em "designer"; o post em "posta"; "0 curtidas" em "ver"
- **PERSONAGEM:** `digitando` · em "esperando": `olha_relogio`
- **CÂMERA:** 2 cortes: chegando · perto · direita · olho → passando · médio · esquerda · olho
- **SONS:** cliques · `ding` vazio em "ver"

#### 3 · plano `salao` · ~3,5 s · jogo `falha`
> "Só que a dona do salão da esquina nunca ouviu falar dele."

- **NA TELA:** dentro do `salao_beleza`: a `dona` ao lado da cadeira do meio, com o balão de pensamento "Web designer?
  Nunca vi."; etiqueta vermelha "Sem site"
- **MOSTRA:** `["dona"]` · **CENÁRIO:** `salao_beleza`, os espelhos com luz
- **ENTRA AGORA:** "Sem site" em "salão"; o pensamento em "ouviu"; congela em "dele" (o jogo faz)
- **PERSONAGEM:** arruma o cabelo no espelho · em "nunca": `ombros`
- **CÂMERA:** chegando · perto · direita · olho → girando · médio · esquerda · olho
- **SONS:** `estalo` do pensamento · o congela (o jogo)

#### 4 · plano `rival` · ~4 s · jogo `corrige`
> "Quem ela viu foi outro web designer, que bateu na porta e fechou o site."

- **NA TELA:** o `rival` entra no salão pela porta, a `dona` vai até ele, aperto de mão e o `contrato` com o carimbo
  FECHADO
- **MOSTRA:** `["rival", "dona", "contrato"]` · **CENÁRIO:** `salao_beleza`
- **ENTRA AGORA:** a cor volta (o corrige); etiqueta vermelha "Outro web designer" em "designer"; o carimbo em "fechou"
- **PERSONAGEM:** o rival anda até ela e estende a mão · a dona sorri e faz joia em "site"
- **CÂMERA:** seguindo o rival de trás → chegando · médio · esquerda · olho no aperto de mão
- **SONS:** `passo` · `baque` do carimbo · `certo`

#### 5 · plano `vai` · ~3 s
> "Se ela não te vê, você vai até ela."

- **NA TELA:** a rua; o Vitor transparente parado; em "vai" ele dá o primeiro passo decidido até a porta do SALÃO e o
  corpo volta a ficar sólido; etiqueta verde "Vai até ela"
- **MOSTRA:** `["personagem", "loja_salao"]` · **CENÁRIO:** `rua_predios`
- **PERSONAGEM:** começo cabisbaixo, transparente · em "vai": anda decidido; em "ela" já está sólido
- **CÂMERA:** `K.mirar` fixo no meio do calçadão, chegando junto com ele
- **SONS:** `passo` · `brilho` quando fica sólido

#### 6 · plano `investe` · ~5 s
> "Então o Vitor decide investir uma cajuína numa ferramenta que mostra quem precisa de site."

- **NA TELA:** o quarto; ele de pé do lado da mesa com a `cajuina`; ela vira moeda e cai no computador; no monitor, o
  mapa com os pinos
- **MOSTRA:** `["personagem", "cajuina", "monitor"]`
- **ENTRA AGORA:** etiqueta "Investir" em "investir"; a garrafa em "cajuína"; a moeda em "ferramenta"; os pinos em
  "precisa"
- **PERSONAGEM:** `sim` com a cabeça em "decide" · vira pro computador em "ferramenta"
- **CÂMERA:** chegando · médio · frente → subindo · médio · frente, na tela
- **SONS:** `pingo` da moeda · `estalo` dos pinos

#### 7 · plano `lista` · ~5 s
> "No computador, digita mappoa.com, e vem a lista dos salões de Teresina sem site."

- **NA TELA:** o `navegador` com mappoa.com sendo digitado; a `tela` sobe com "Salões de beleza · Teresina, PI", SEM SITE e
  os cartões
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CÂMERA:** chegando · perto no teclado → afastando · médio · frente · **SONS:** cliques, `brilho`, `bip`

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- Igual ao padrão do canal: a análise do Studio Ininga Beauty ("Aderência 88/100", "Sem site próprio, agenda só pelo
  WhatsApp", "Site com serviços, preços e agendamento online"), o `robo` e o Vitor comemorando
- **MOSTRA:** `["tela", "robo", "personagem"]`

#### 9 · plano `antes_agora` · ~4 s · jogo `avanca`
> "Antes, o Vitor era invisível. Agora, ele chega primeiro."

- **NA TELA:** (1) "Antes": a rua, ele transparente na frente do SALÃO, a dona olhando através dele; (2) "Agora": no
  salão, ele sólido mostrando a análise pra `dona2`, que faz joia; o `rival` chega atrasado na porta e põe a mão na testa
- **MOSTRA:** `["personagem", "dona2", "rival"]`
- **ENTRA AGORA:** a troca em "Agora"; ✓ e etiqueta verde "Primeiro!" em "primeiro"
- **CÂMERA:** (1) `K.mirar` fixo na rua · (2) chegando · médio · frente no salão · **SONS:** `whoosh`, `certo`

#### 10 · plano `segue` · ~7 s
> "Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também."

- Igual ao padrão do canal: "Sua cidade?" com o pino, o cartão de seguir, mappoa.com digitado e o robô acenando
- **MOSTRA:** `["personagem", "navegador", "monitor"]`

**Cauda** · plano `cartao` · 1,6 s: o cartão em "Seguindo", o Vitor e o robô acenando.
