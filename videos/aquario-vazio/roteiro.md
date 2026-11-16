# Você tá pescando cliente onde não tem peixe: roteiro e ficha de cena

> Vídeo 2 dos "Próximos 3" (13/11/2026), feito direto, sem aprovação no meio (o dono pediu). Receita da análise dos 3
> mais vistos: a dor é do PRÓPRIO web designer (não tem cliente) e fala com "você"; o gancho é uma METÁFORA absurda
> (pescar num aquário vazio com um rio lotado do lado), sem "Se X, acontece Y", e deixa a curiosidade aberta; uma ideia
> de atitude (o problema não é a isca, é o lugar) com um rival que puxa o cliente e a virada do personagem; o Mappoa
> entra tarde, como decisão de investir ("o preço de um corte de cabelo"); 43-45 s; no fim, "Comenta a sua cidade",
> sem prometer mostrar nada.
> O Léo manda "faço sites" pra quem já tem site e pra grupo cheio de web designer, e nada morde. Outro web designer
> joga a rede no rio e puxa uma barbearia. O Léo troca de lugar: investe numa ferramenta que mostra onde estão os
> peixes (as barbearias de João Pessoa sem site).

## Roteiro

1. Você tá pescando cliente onde não tem peixe. *(gancho)*
2. O Léo é web designer e manda "faço sites" pra quem já tem site e pra grupo cheio de web designer.
3. Joga a isca o dia inteiro, e nada morde.
4. Enquanto isso, outro web designer joga a rede no rio e puxa uma barbearia.
5. O problema não é a isca. É o lugar.
6. Então o Léo decide investir o preço de um corte de cabelo numa ferramenta que mostra onde estão os peixes.
7. Digita mappoa.com no computador, e vem a lista das barbearias de João Pessoa sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Léo pescava no aquário. Agora, ele joga a isca onde tem peixe.
10. Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também.

Cerca de 120 palavras, uns 44 s com o cartão de seguir, 10 frases, ~700 caracteres. A frase 8 é igual à do
empresa-gritando (a narração é copiada de lá, não gasta crédito); a 10 é a mesma do leilão (copiada se já estiver
gravada lá). Crédito novo: ~630.

**Onde o tempo vai:** gancho e dor (1 a 3) uns 11 s · o rival e a virada (4 e 5) uns 7 s · o Mappoa (6 a 8) uns 13 s,
com o mappoa.com digitado e a lista · o fim (9 e 10) uns 11 s, mais o cartão.

**Gancho escolhido:** A (a frase da pauta). Opções:
- **A:** "Você tá pescando cliente onde não tem peixe." (1º quadro: a isca balançando dentro de um aquário vazio;
  cortes de ~0,8 s: os peixes pulando no rio do lado, a cara de tédio do Léo de vara na mão, o quadro inteiro)
- **B:** "Seu cliente tá pulando aqui do lado. E você pescando no aquário." (mesma imagem; explica demais)
- **C:** "O aquário tá vazio. O rio tá lotado." (curiosa, mas não fala com "você")

**Capa:** "Cadê o *peixe*?" (15 letras), o Léo de vara na mão na frente do aquário vazio, mão na testa, e o rio com os
peixes pulando atrás.

## O que foi conferido

- Sem preço, sem plano e sem número falado. "O preço de um corte de cabelo" é o espírito do "investir uma pizza", sem
  valor e nunca "grátis"
- O que o Mappoa faz aqui (`canal/produto.md`): a busca por segmento e cidade ("barbearias em João Pessoa"), a lista
  separada SEM SITE (7) e a análise com o score, as dores e as oportunidades (8, na tela). O "mostra onde estão os
  peixes" é a lista de quem não tem site; nada de "garante cliente"
- O Mappoa é "ferramenta" na 6 e "sistema" na 8 (o nome numa frase só); o mappoa.com já entra na 7, digitado no
  computador. Assinatura do fim igual
- Sem "Esse é o Léo": ele aparece dentro da ação (2)
- O fim é o "Comenta a sua cidade", sem prometer mostrar nada
- Empresas inventadas: Barbearia Cabo Branco, Dom Bigode, Navalha de Tambaú, Barbearia Manaíra. Cidade: João Pessoa, PB
  (nicho e cidade novos no canal)
- O aquário é a imagem da dor (procurar cliente onde não tem); a dor continua sendo achar o próximo cliente

## Ficha de cena

**Cenários (três, com `K.cenarios`):** `natureza` de dia (1, 3, 4, 5, 6, 9: o campo com um rio largo atravessando
atrás, feito no `cena.js`, o aquário vazio no suporte e o Léo de vara), `home_office` de dia (2, 7, 10 e o cartão) e
`mundo_mappoa` (8).
**Personagens:** o do canal, chamado Léo, em todas. O **rival**, outro web designer de moletom vermelho, na 4 e na 5.
O **robô do Mappoa** na 8 e na 10.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Léo, web designer | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 10 |
| `aquario` | o aquário vazio, com água e nenhum peixe | `cena.js`: caixa de vidro, água, borda preta, suporte de madeira | 1,3 × 0,9 × 0,75, no suporte de 0,7 | na frente do Léo, no campo | 1, 3, 5, 9, capa |
| `vara` | a vara de pescar, a linha e a isca (minhoca rosa no anzol) | `cena.js`: cilindros e um toro | 2,2 m, marrom e preta | nas mãos do Léo | 1, 3, 5, 9, capa |
| `rio` | o rio largo com os peixes pulando | `cena.js`: faixa de água azul e as margens | 80 × 3,2 m | atrás, cruzando o campo | 1, 3, 4, 5, 6, 9 |
| `peixes` | os peixes coloridos pulando do rio, com o respingo | `K.peixe` × 9 e anéis de água | 0,7 m, laranja, amarelo, azul, rosa | no rio | 1, 4, 5, 6, 9 |
| `rival` | o outro web designer | `K.boneco` moletom vermelho | 1,47 | na margem do rio | 4, 5 |
| `rede` | a rede de pescar do rival | `K.m3d('rede_pesca')` | escala 1,6 | nas mãos do rival | 4 |
| `barbearia` | a barbearia em miniatura que sai na rede | `K.m3d('prediozinho', { placa: 'BARBEARIA' })` | escala 0,45, vermelha | dentro da rede | 4 |
| `monitor` | o computador do Léo | `K.computador` | escala 1,55 | na mesa do quarto | 2, 7, 10 |
| `avioes` | as mensagens "faço sites" | `K.m3d('envelope')` × 4 | 0,32, brancos | do computador até o aquário do quarto | 2 |
| `aquarinho` | o mesmo aquário vazio, no quarto | o aquário em escala 0,75 | — | embaixo da janela | 2 |
| `tesoura` | a tesoura do "preço de um corte" | `K.m3d('tesoura')` | escala 1,4 | girando na mão do Léo | 6 |
| `tela` | o painel do Mappoa (mapa na 6, lista na 7, análise na 8 e 9) | `K.painelMappoa` | 1,4 × 2,33 / 1,56 × 2,6 | do lado do Léo / no palco | 6, 7, 8, 9 |
| `navegador` | a barra com mappoa.com | `K.painelMappoa` | 2,3 × 0,4 | acima do computador | 7, 10 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, quarto | 8, 10 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| pescando, cliente | 1 | o Léo de `vara`, a isca balançando no `aquario` |
| onde não tem peixe | 1 | o `aquario` vazio; o `rio` com os `peixes` pulando do lado |
| web designer | 2 | etiqueta azul "Web designer" |
| "faço sites" | 2 | a tela do computador com "Oi! Faço sites." e os `avioes` |
| quem já tem site | 2 | etiqueta laranja "Já tem site" |
| grupo cheio de web designer | 2 | a tela vira o grupo "Web Designers JP" com todo mundo mandando "Faço sites!" |
| isca, nada morde | 3 | a minhoca parada no `aquario` vazio; etiqueta vermelha "0 mordidas" |
| outro web designer, rede, rio | 4 | o `rival` de moletom joga a `rede` no `rio` |
| barbearia | 4 | a `barbearia` em miniatura sai na rede, com peixes pulando |
| isca / lugar | 5 | a isca com ✓ "Isca boa"; depois ✗ no aquário e ✓ no rio |
| preço de um corte de cabelo | 6 | a `tesoura` girando na mão dele; etiqueta "O preço de um corte" |
| ferramenta, onde estão os peixes | 6 | a `tela` sobe do chão com o mapa e os pinos; o rio atrás |
| mappoa.com, computador | 7 | o `navegador` com mappoa.com digitado acima do `monitor` |
| lista, barbearias, João Pessoa, sem site | 7 | a `tela` com "Barbearias · João Pessoa, PB" e o grupo SEM SITE |
| Mappoa, sistema, seu serviço | 8 | rótulo "Mappoa"; a análise da Barbearia Cabo Branco; o `robo` |
| aquário (antes) / onde tem peixe (agora) | 9 | o Léo no aquário vazio; depois na margem do rio, a vara envergando e o peixe pulando |
| sua cidade, segue, computador, mappoa.com | 10 | "Comenta a sua cidade", o cartão de seguir, o `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3 s
> "Você tá pescando cliente onde não tem peixe."

- **NA TELA:** o campo de dia; o aquário vazio no suporte, a isca balançando dentro da água; o Léo de vara na mão, cara de tédio; atrás, o rio largo cheio de peixes pulando
- **MOSTRA:** `["personagem", "aquario", "rio"]`
- **ENTRA AGORA:** tudo já no 1º quadro; uma bolha solitária sobe no aquário
- **OBJETOS SE MEXENDO:** a isca balança; os peixes pulam em arco e caem com respingo; a água brilha
- **PERSONAGEM:** segura a vara, a cabeça apoiada de tédio · na palavra "peixe": olha pro rio, sem entender
- **CÂMERA:** 4 cortes de ~0,8 s: **(1)** a isca dentro do aquário · `chegando` · perto · frente · olho · **(2)** os peixes pulando no rio · `passando` · médio · frente · baixo · **(3)** a cara do Léo com a vara · `chegando` · perto · esquerda · olho · **(4)** `[personagem, aquario, rio]` · `afastando` · aberto · frente · olho, topo livre pra capa
- **EFEITOS VISUAIS:** a capa no topo · as bolhas · os respingos
- **SONS:** `respingo` dos peixes · `bolhas` · `pingo`

#### 2 · plano `longe` · ~6 s
> "O Léo é web designer e manda "faço sites" pra quem já tem site e pra grupo cheio de web designer."

- **NA TELA:** o quarto de dia; o Léo digitando; cada envelope sai do computador e cai dentro do aquário vazio embaixo da janela; a tela do computador vira o grupo "Web Designers JP"
- **MOSTRA:** `["personagem", "monitor", "avioes"]`
- **ENTRA AGORA:** "Web designer" na palavra "designer"; os envelopes a partir de "manda"; "Já tem site" na palavra "tem"; o grupo na palavra "grupo"
- **PERSONAGEM:** começo: `digitando` animado · na palavra "grupo": se recosta e espera, `olha_relogio`
- **CÂMERA:** 2 cortes: **(1)** `[personagem, monitor]` · `chegando` · perto · direita · olho · **(2)** de "pra quem": `[monitor, avioes, aquarinho]` · `passando` · médio · esquerda · olho (o quarto tem teto: altura olho)
- **SONS:** `clique` do teclado · `whoosh` e `respingo` de cada envelope

#### 3 · plano `nada` · ~2,5 s · jogo `falha`
> "Joga a isca o dia inteiro, e nada morde."

- **NA TELA:** o campo; o Léo de vara no aquário; o céu passando pra tarde; a isca parada; etiqueta "0 mordidas"
- **MOSTRA:** `["personagem", "aquario", "vara"]`
- **PERSONAGEM:** `olha_relogio` · na palavra "nada": `triste`, os ombros caem
- **CÂMERA:** 2 cortes: **(1)** a isca no aquário · `descendo` · perto · direita · olho · **(2)** `[personagem, aquario]` · `chegando` · médio · esquerda · olho; congela em preto e branco no fim (o jogo faz)
- **SONS:** `pingo` · `errado` (o congela, o jogo põe)

#### 4 · plano `rival` · ~4,5 s
> "Enquanto isso, outro web designer joga a rede no rio e puxa uma barbearia."

- **NA TELA:** a margem do rio; o rival de moletom vermelho joga a rede na água cheia de peixes e puxa: dentro da rede, uma barbearia em miniatura, com peixes pulando em volta
- **MOSTRA:** `["rival", "rede", "rio"]` (a `barbearia` sai na palavra "barbearia")
- **ENTRA AGORA:** etiqueta laranja "Outro web designer" na palavra "designer"; a rede entra na água em "rio"; a barbearia sai em "puxa"
- **PERSONAGEM:** o rival: `segurando` a rede, joga e puxa · na palavra "barbearia": `vitoria`. O Léo, longe, olha
- **CÂMERA:** 2 cortes: **(1)** `[rival, rede, rio]` · `passando` · médio · direita · olho · **(2)** de "puxa": a rede com a barbearia saindo · `subindo` · perto · frente · baixo
- **SONS:** `whoosh` da rede · `agua` · `respingo` · `certo` (palavra "barbearia")

#### 5 · plano `lugar` · ~3 s · jogo `corrige`
> "O problema não é a isca. É o lugar."

- **NA TELA:** a cor volta; a isca de perto com o ✓ "Isca boa"; depois, do alto: o aquário vazio com ✗ e o rio cheio com ✓
- **MOSTRA:** `["aquario", "rio", "personagem"]`
- **ENTRA AGORA:** "Isca boa" na palavra "isca"; o ✗ e o ✓ na palavra "lugar"
- **PERSONAGEM:** o Léo olha a isca · na palavra "lugar": `ideia`, olha pro rio
- **CÂMERA:** 2 cortes: **(1)** a isca · `chegando` · perto · esquerda · olho · **(2)** `[aquario, rio, personagem]` · `subindo` · aberto · frente · alto
- **SONS:** `certo` (isca) · `errado` no aquário, `ding` no rio

#### 6 · plano `investe` · ~5,5 s
> "Então o Léo decide investir o preço de um corte de cabelo numa ferramenta que mostra onde estão os peixes."

- **NA TELA:** o Léo larga a vara no chão; uma tesoura gira na mão dele ("O preço de um corte"); na palavra "ferramenta", o painel do Mappoa sobe do chão do lado dele com o mapa e os pinos; o rio com os peixes atrás
- **MOSTRA:** `["personagem", "tesoura", "tela"]`
- **ENTRA AGORA:** a tesoura na palavra "corte"; a tela em "ferramenta"; os pinos em "peixes"
- **PERSONAGEM:** `pensando` · na palavra "investir": `mostrando` a tesoura · em "peixes": aponta a tela
- **CÂMERA:** 2 cortes: **(1)** `[personagem, tesoura]` · `chegando` · perto · direita · olho · **(2)** `[personagem, tela]` · `passando` · médio · frente · olho
- **SONS:** `madeira` da vara no chão · `brilho` da tesoura · `bip` dos pinos

#### 7 · plano `lista` · ~5 s
> "Digita mappoa.com no computador, e vem a lista das barbearias de João Pessoa sem site."

- **NA TELA:** no quarto, o `navegador` acima do computador com mappoa.com sendo digitado; a `tela` sobe com "Barbearias · João Pessoa, PB", o grupo SEM SITE e os cartões
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CÂMERA:** 2 cortes: **(1)** o endereço e as mãos · `chegando` · perto · esquerda · olho · **(2)** `[navegador, tela, personagem]` · `subindo` · médio · frente · olho
- **SONS:** `clique` de cada letra · `brilho` · `bip` em cada cartão

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** no palco da marca, a análise da Barbearia Cabo Branco (91/100, "Sem site próprio", "Agenda só pelo WhatsApp", "Site com agendamento online"); o robô e o Léo
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CÂMERA:** 2 cortes: `chegando` · médio · frente · baixo → `passando` · médio · esquerda · olho
- **SONS:** `brilho` · `ding` · `certo`

#### 9 · plano `antes_agora` · ~5 s · jogo `avanca`
> "Antes, o Léo pescava no aquário. Agora, ele joga a isca onde tem peixe."

- **NA TELA:** (1) Antes: o Léo no aquário vazio, de tédio; (2) Agora: na margem do rio, joga a isca e a vara enverga; um peixe pula na isca; ✓ verde e "Barbearias sem site"
- **MOSTRA:** `["personagem", "rio", "vara"]`
- **CÂMERA:** 3 cortes: **(1)** `[personagem, aquario]` · `afastando` · médio · direita · olho · **(2)** o Léo na margem · `chegando` · médio · trás-direita · olho · **(3)** a vara envergando e o peixe · `subindo` · perto · frente · baixo
- **SONS:** `whoosh` do arremesso · `respingo` · `certo`

#### 10 · plano `segue` · ~6 s
> "Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o quarto; "Comenta a sua cidade" no topo com o pino caindo; o cartão de seguir em "segue"; o `navegador` com mappoa.com; o robô acenando
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CÂMERA:** `chegando` · médio · frente → `parado` · aberto · frente, topo livre
- **SONS:** `estalo` do pino · `clique` das letras · `ding`

**Cauda** · plano `cartao` · 1,6 s: o cartão em "Seguindo", o Léo e o robô acenam.

## As cenas em 2 linhas

1. A isca balança num aquário vazio; o rio do lado tá lotado de peixes pulando. / O Léo de vara, de tédio; 4 cortes rápidos.
2. No quarto, cada "faço sites" cai no aquário vazio embaixo da janela; o computador vira um grupo só de web designer. / Ele digita animado e depois espera.
3. O dia inteiro de vara no aquário, nada morde. / Ele olha o relógio e murcha; congela.
4. O outro web designer joga a rede no rio e puxa uma barbearia em miniatura. / Ele comemora; o Léo olha de longe.
5. A isca tá boa (✓); o lugar é que tá errado (✗ no aquário, ✓ no rio). / A câmera sobe e mostra os dois.
6. Ele larga a vara, gira a tesoura do "preço de um corte" e o painel do Mappoa sobe com o mapa. / Ele aponta o mapa.
7. mappoa.com digitado e a lista das barbearias de João Pessoa sem site.
8. O nome Mappoa e a análise da barbearia, com o robô.
9. Antes no aquário, agora no rio: a vara enverga e o peixe pula. ✓
10. "Comenta a sua cidade", o cartão de seguir e mappoa.com.
