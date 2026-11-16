# Se você esperar o primeiro cliente aparecer, vai ficar assim: roteiro e ficha de cena

> Gancho B do primeiro-cliente, que o dono adorou e pediu como próximo roteiro (11/11/2026). 1º quadro: o personagem no
> computador com uma barba branca até o chão, teia de aranha no monitor e as folhas do calendário voando.
> Cuidado: o dono não gosta de "ficar esperando indicação". A história é de quem **postou que tá disponível e sentou
> pra esperar o cliente aparecer**, e decide ir atrás, com o Mappoa achando as empresas.
> O Bruno acabou de virar web designer (o dono pediu o foco em web designer, 11/11/2026). A virada: a pizzaria do
> bairro não tem site e nem sabe que ele existe, e quem fecha é o outro web designer, que foi lá. O Bruno corta a
> barba, vai atrás, e o Mappoa mostra as pizzarias de Curitiba sem site.
> Feito com o que os aprendizados pedem: imagem absurda e enorme no 1º quadro, corte a cada ~0,8 s nos primeiros 3 s e
> a cada ~1,5 a 2 s depois, personagem já dentro da ação (sem "Esse é o ..."), o mappoa.com digitado no computador já na
> entrada do Mappoa, o Mappoa curto e começando pela lista, 45 a 60 s, e o Mappoa como **sistema** (nunca "um site").
> Primeiro vídeo com as peças novas do canal: barba e teia feitas no `cena.js`, as folhas do calendário
> (`K.folhasVento` de papel), o despertador e o celular gigante, as reações sentado, digitando, dormindo (Zzz),
> mao_na_testa, olha_relogio e comemorando, o balão de pensamento, a rua entre prédios, a fachada da pizzaria, o
> pizzaiolo e o vendedor (`K.personagem`) e as câmeras `K.seguir` e `K.heroi`.

## Roteiro

1. Se você esperar o primeiro cliente aparecer, vai ficar assim. *(gancho)*
2. O Bruno acabou de virar web designer. Postou "faço sites" e sentou pra esperar.
3. Passou um dia, uma semana, um mês. E o celular nem vibrou.
4. Só que a pizzaria do bairro não tem site, e nem sabe que o Bruno existe.
5. Quem aparece lá é outro web designer, que foi atrás. E fecha.
6. Aí o Bruno corta a barba e decide ir atrás também. Mas atrás de quem?
7. Ele digita mappoa.com no computador, e vem a lista das pizzarias de Curitiba sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Bruno esperava sentado. Agora, ele chega primeiro.
10. E você, tá esperando ou indo atrás? Comenta aí e segue pra achar o seu. No computador, digita mappoa.com e testa você também.

Cerca de 141 palavras, uns 48 segundos com o cartão de seguir, 10 frases (uns 790 caracteres da ElevenLabs; sobram
8.282, dá folgado).

**Onde o tempo vai:** gancho e dor (1 a 3) uns 11 s · a virada (4 a 6) uns 13 s · o Mappoa (7 e 8) uns 8 s, começando
pelo mappoa.com digitado e pela lista, dentro da história do Bruno · o fim (9 e 10) uns 14 s.

**Gancho escolhido:** A (a frase que o dono já aprovou). Opções:
- **A:** "Se você esperar o primeiro cliente aparecer, vai ficar assim." (no 1º quadro: a ponta de uma barba branca
  enrolada no chão; corte a cada ~0,8 s: a barba subindo até o rosto do Bruno sentado, a aranha descendo na teia do
  monitor, as folhas do calendário voando na cara da câmera, e o quadro aberto: ele dormindo na cadeira com a barba até
  o chão)
- **B:** "Ele postou 'faço sites'. Se ficar esperando, vira isso." (mesma imagem, mas a fala já apresenta a dor)
- **C:** "Esse cara tá esperando o primeiro cliente faz um ano." (mais engraçada, mas perde o "você")

**Capa:** "Esperando *cliente*?" (19 letras, cabe numa linha), com o Bruno dormindo na cadeira, a barba branca até o chão,
a teia no monitor e as folhas do calendário no ar.

## O que foi conferido

- Sem preço, sem plano e sem número falado. "Um dia, uma semana, um mês" é a história do Bruno, não estatística. Na tela,
  o score só como "NN/100" da análise (é como o Mappoa mostra), sem total de leads
- O que o Mappoa faz aqui está em `canal/produto.md`: a busca por segmento e cidade ("pizzarias em Curitiba"), a lista
  (7) e a análise com o score, as dores e as oportunidades (8, na tela). Nada de "garante a venda", nem de "manda a
  mensagem sozinho"
- O Mappoa é "um sistema que acha quem precisa do seu serviço" (8), o nome numa frase só, com 12 palavras, e o
  mappoa.com já entra na 7, digitado no computador. A assinatura do fim continua
- Sem "Esse é o Bruno": ele aparece já dentro da ação (frase 2)
- Nada de "esperar indicação": o Bruno postou e esperou o cliente aparecer; o outro web designer "foi atrás" e fecha; o
  Bruno decide ir atrás também. A dor é achar o primeiro cliente
- O fim dá motivo pra seguir ("segue pra achar o seu") e a pergunta divide quem comenta (esperando x indo atrás)
- Empresas inventadas: Pizzaria Forno da Vila (a do bairro) e as outras da lista. Cidade: Curitiba, PR. Nicho de
  pizzaria sem site, longe da floricultura e de Sorocaba do vídeo anterior
- Nenhuma frase repete os vídeos anteriores

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `home_office` de dia (1, 2, 6, 7, 10, o "Antes" da 9) e de noite (3, o
dia e a noite se trocando), `rua_predios` (5 e o "Agora" da 9: o calçadão entre prédios, com a PIZZARIA embaixo),
`fachada` da pizzaria (4, o fim da 5 e o fim da 9) e `mundo_mappoa` (8: o palco da marca).
**Peças dos cenários que entram:** a mesa, os monitores, a cadeira giratória, o ring light, a janela e o calendário
da parede do quarto · os prédios, a gente andando e as lojas da rua · a placa PIZZARIA, o toldo, a vitrine com o forno,
as mesinhas da calçada e a porta que abre com o sino da fachada · o logo gigante e os pinos do palco.
**Personagens:** o do canal, chamado Bruno, em todas. O **pizzaiolo** (`K.personagem('pizzaiolo')`, o dono da
Pizzaria Forno da Vila) na 4, na 5 e na 9. O **outro web designer** (`K.personagem('vendedor')` sem o paletó: camiseta laranja, mochila com notebook) só na 5.
O **robô do Mappoa** na 8 e na 10.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Bruno, que acabou de virar web designer | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 10 |
| `barba` | a barba branca que cresce até o chão e se enrola no tapete | `K.pecas` no `cena.js`: tubo afinando (curva do queixo até o chão) + rolo no chão | do queixo (y ~1,2) até o chão, branca `#f4f4f2` | presa no queixo dele | 1, 3, 6 (some), 9 (Antes), capa |
| `teia` | a teia de aranha no canto do monitor, com a aranha descendo no fio | plano com a teia desenhada (linhas brancas) + aranha (`K.pecas` esferas pretas) | 0,6 × 0,6, branca | canto de cima do `monitor` | 1, 3, 9 (Antes), capa |
| `monitor` | o computador do Bruno | `K.computador`, tela desenhada | escala 1,55 | na mesa dele, de lado pra câmera | 1, 2, 3, 6, 7, 10 |
| `calendario` | as folhas do calendário voando | `K.folhasVento(…, { papel: true })` + o `calendario` da parede | folhas brancas com o número | saem da parede e voam pela sala | 1, 3, capa |
| `celular` | o celular gigante com o post "Faço sites! Chama no direct" e as notificações: zero | `K.m3d('celular_gigante')` | ~1,6 de altura | em pé na mesa, do lado dele | 2, 3 |
| `despertador` | o despertador tocando e girando os ponteiros (o tempo passando) | `K.m3d('despertador')` | 0,4 | na mesa | 3 |
| `contador` | "dias esperando" contando | `K.contador()` | grande, branco | no ar, em cima dele | 3 |
| `pizzaria` | a frente da Pizzaria Forno da Vila | cenário `fachada` loja `pizzaria` | o cenário | a fachada | 4, 5, 9 |
| `pizzaiolo` | o dono da pizzaria | `K.personagem('pizzaiolo')` | 1,47 | na porta / na calçada | 4, 5, 9 |
| `pensamento` | o balão de pensamento do pizzaiolo: "Cardápio só no papel..." | `K.balaoPensamento()` | sprite | em cima da cabeça dele | 4 |
| `rival` | o outro web designer, com a mochila e o notebook | `K.personagem('vendedor')` | 1,47 | anda no calçadão e chega na pizzaria | 5 |
| `aperto` | o aperto de mão e o ✓ do "fechou" | `K.simbolo({ tipo: '✓' })` + `K.poof` | grande, verde | entre o rival e o pizzaiolo | 5 |
| `tesoura` | a tesoura que corta a barba | `K.m3d('tesoura')` | 0,5 | na mão dele | 6 |
| `duvida` | o balão "Atrás de quem?" e os pontos de interrogação | `K.balaoPensamento()` + `K.simbolo({ tipo: '?' })` | sprite | em cima da cabeça dele | 6 |
| `navegador` | barra grande com mappoa.com | `K.painelMappoa` | 2,5 × 0,42 | acima do computador | 7, 10 |
| `tela` | o painel do Mappoa: a lista das pizzarias de Curitiba, depois a análise da Pizzaria Forno da Vila | `K.painelMappoa` | 1,56 × 2,6 | sobe do computador / palco / na mão dele | 7, 8, 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, home office | 8, 10 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| esperar, primeiro cliente, assim | 1 | a `barba` até o chão, a `teia` no `monitor`, o `calendario` voando, ele dormindo na cadeira |
| web designer | 2 | etiqueta azul "Web designer" e o post no `celular` com um site de exemplo |
| "faço sites" | 2 | o post "Faço sites! Chama no direct" no `celular` gigante |
| sentou pra esperar | 2 | ele senta na cadeira giratória e cruza os braços |
| um dia, uma semana, um mês | 3 | a janela troca dia e noite, o `despertador` gira, o `contador` de dias sobe, a `barba` cresce |
| celular nem vibrou | 3 | o `celular` com "0 mensagens" e um grilo (som) |
| pizzaria do bairro, não tem site | 4 | a fachada da `pizzaria`, o `pensamento` e a etiqueta "Sem site"; "Cardápio só no papel..." |
| nem sabe que o Bruno existe | 4 | o pizzaiolo olhando a rua dos dois lados, ninguém; etiqueta "Bruno? Quem?" |
| outro web designer, foi atrás | 5 | o `rival` de mochila andando rápido no calçadão até a PIZZARIA |
| fecha | 5 | o aperto de mão com o pizzaiolo e o ✓ verde "Fechou" |
| corta a barba | 6 | a `tesoura` e a `barba` sumindo num poof |
| atrás de quem | 6 | o balão `duvida` "Atrás de quem?" e os ? |
| mappoa.com, computador | 7 | o `navegador` com mappoa.com sendo digitado acima do `monitor` |
| lista, pizzarias, Curitiba | 7 | a `tela` subindo com "Pizzarias · Curitiba, PR", o grupo SEM SITE e os cartões |
| Mappoa, sistema, precisa do seu serviço | 8 | rótulo "Mappoa"; a `tela` com a análise da Pizzaria Forno da Vila e o score; o `robo` |
| esperava sentado (antes) | 9 | ele de barba dormindo na cadeira, a `teia` |
| chega primeiro (agora) | 9 | ele andando no calçadão até a pizzaria, mostra a análise e o pizzaiolo faz joia |
| computador, mappoa.com | 10 | `monitor` e `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3 s
> "Se você esperar o primeiro cliente aparecer, vai ficar assim."

- **NA TELA:** o quarto do Bruno; ele sentado na cadeira giratória, de lado pra câmera, na frente do `monitor`, dormindo, com a `barba` branca saindo do queixo, descendo até o chão e enrolada no tapete; no canto do monitor, a `teia` com a aranha descendo no fio; as folhas do `calendario` voando pela sala
- **MOSTRA:** `["personagem", "barba", "teia"]`
- **CENÁRIO:** `home_office` de dia; a janela clara, o ring light, a mesa
- **ENTRA AGORA:** tudo já está no 1º quadro (a ponta da barba enrolada no chão); a aranha desce no fio na palavra "cliente"; uma rajada de folhas do calendário passa na frente da câmera na palavra "aparecer"
- **OBJETOS SE MEXENDO:** as folhas voam da parede pra direita, girando; a barba balança de leve com o ronco; a aranha desce uns 30 cm e quica no fio; a teia treme
- **PERSONAGEM:** sentado, cabeça caída de lado · começo: `dormindo`, com os Zzz saindo · na palavra "assim": acorda de susto (`susto`, olho aberto), e a cadeira gira um pouco
- **INTERAÇÃO:** o vento das folhas balança a barba; ele acorda com o susto bem no "assim"
- **CÂMERA:** 4 cortes rápidos (~0,75 s cada): **(1)** alvo a ponta da barba no chão, `subindo` do chão até o queixo dele · perto · lado direito · baixo · **(2)** alvo a `teia` e a aranha no canto do monitor · `chegando` · perto · frente · olho · **(3)** alvo as folhas passando com o calendário da parede ao fundo · `passando` · perto · esquerda · olho · **(4)** alvo `[personagem, barba, teia]` inteiros · `afastando` · médio · direita (3/4) · olho, topo livre pra capa. Altura sempre "olho" ou "baixo": o quarto tem teto
- **EFEITOS VISUAIS:** a capa no topo ("Esperando *cliente*?", o motor põe) · os Zzz · etiqueta branca "Dia 365" em cima dele no corte 4
- **SONS:** `ronco`/`zzz` no começo · `whoosh` das folhas (palavra "aparecer") · `susto` (palavra "assim")

#### 2 · plano `disponivel` · ~4,5 s
> "O Bruno acabou de virar web designer. Postou "faço sites" e sentou pra esperar."

- **NA TELA:** o mesmo quarto, de dia, sem barba (é o dia 1); o Bruno de pé, no centro, na frente da mesa, com o `celular` gigante em pé do lado dele; no celular, o post "Faço sites! Chama no direct" com o foguinho do anúncio; depois ele senta na cadeira e cruza os braços
- **MOSTRA:** `["personagem", "celular"]`
- **CENÁRIO:** `home_office` de dia; a luz da janela
- **ENTRA AGORA:** a etiqueta azul "Web designer" na palavra "designer"; o `celular` gigante sobe da mesa na palavra "Postou"; o post aparece dentro dele na palavra "sites"; a cadeira desliza pra trás dele na palavra "sentou"
- **OBJETOS SE MEXENDO:** o celular cresce do chão girando de frente; o post desce na tela com coraçõezinhos; na palavra "esperar", a câmera para e ele cruza os braços
- **PERSONAGEM:** começo de pé, `comemorando` (pulinhos, todo animado) · na palavra "Postou": aponta o celular · na palavra "sentou": `sentado`, cruza os braços, sorrindo, olhando o celular
- **INTERAÇÃO:** ele aponta o post no celular e senta virado pra ele, esperando
- **CÂMERA:** 2 cortes: **(1)** até "sites": alvo `[personagem, celular]` · `passando` · médio · esquerda · olho · **(2)** de "sentou" até o fim: alvo `[personagem, celular]` · `chegando` · perto · frente · baixo (antes: afastando, médio, direita, olho)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · etiqueta verde "Faço sites!" (palavra "sites")
- **SONS:** `pop` do celular (palavra "Postou") · `ding` do post (palavra "sites") · `whoosh` da cadeira (palavra "sentou")

#### 3 · plano `esperando` · ~4 s · jogo `falha`
> "Passou um dia, uma semana, um mês. E o celular nem vibrou."

- **NA TELA:** o Bruno sentado de frente pro `celular` gigante, que mostra "0 mensagens"; a janela do quarto pisca entre dia e noite; o `despertador` na mesa com os ponteiros girando; o `contador` "Dia 1 → 30" em cima dele; a `barba` crescendo do queixo até o chão; a `teia` aparecendo no monitor; folhas do calendário voando
- **MOSTRA:** `["personagem", "celular", "barba"]`
- **CENÁRIO:** `home_office` trocando de dia pra noite a cada palavra ("dia", "semana", "mês")
- **ENTRA AGORA:** a noite na palavra "dia", o dia na palavra "semana", a noite na palavra "mês"; o despertador toca na palavra "dia"; o contador começa na palavra "dia" e chega em 30 na palavra "mês"; a teia surge na palavra "semana"
- **OBJETOS SE MEXENDO:** a barba vai de 10 cm a até o chão entre "dia" e "mês"; os ponteiros do despertador giram rápido; as folhas do calendário voam a cada troca; na palavra "vibrou", o celular dá um tremidinho que não é nada (fica "0 mensagens") e tudo congela em preto e branco (o jogo faz)
- **PERSONAGEM:** sentado · começo: `olha_relogio`, impaciente · na palavra "semana": `dormindo` (Zzz) · na palavra "vibrou": acorda, olha o celular e faz `mao_na_testa`
- **INTERAÇÃO:** ele olha o relógio, cochila, e quando acorda o celular continua vazio
- **CÂMERA:** 2 cortes: **(1)** até "mês": alvo `[personagem, celular, barba]` · `orbita` lenta · médio · direita · olho · **(2)** de "E o celular" até o fim: alvo o `celular` com a cara dele de lado · `chegando` · perto · esquerda · olho (antes: chegando, perto, frente, baixo)
- **EFEITOS VISUAIS:** o contador "Dia 1 → Dia 30" · etiqueta vermelha "0 mensagens" (palavra "vibrou") · congela em preto e branco (o jogo faz)
- **SONS:** `alarme`/`trim` do despertador (palavra "dia") · `tique` rápido do relógio · `grilo` (palavra "vibrou") · o congela (o jogo põe)

#### 4 · plano `pizzaria` · ~4,5 s · jogo `corrige`
> "Só que a pizzaria do bairro não tem site, e nem sabe que o Bruno existe."

- **NA TELA:** a cor volta; a frente da `pizzaria`, com a placa PIZZARIA, o toldo vermelho e branco, as mesinhas vazias na calçada e o forno na vitrine; o `pizzaiolo` na calçada, na frente da porta, com o `pensamento` "Cardápio só no papel..." em cima da cabeça; ele olha a rua de um lado e do outro, sem ninguém
- **MOSTRA:** `["pizzaria", "pizzaiolo", "pensamento"]`
- **CENÁRIO:** `fachada` da pizzaria de dia; os carros passando na rua
- **ENTRA AGORA:** a cor volta no começo (o corrige); o `pensamento` estoura em cima da cabeça dele na palavra "site"; a etiqueta "Bruno? Quem?" na palavra "existe"
- **OBJETOS SE MEXENDO:** o carro passa na frente; o cavalete "PIZZA" balança; o balão flutua de leve
- **PERSONAGEM:** o pizzaiolo, na calçada · começo: `ombros`, encolhe os ombros olhando as mesas vazias · na palavra "sabe": olha pra esquerda e pra direita da rua (`nao`, procurando), com cara de dúvida
- **INTERAÇÃO:** o pizzaiolo procura em volta e não acha ninguém pra ajudar
- **CÂMERA:** 2 cortes: **(1)** até "site": alvo `[pizzaria, pizzaiolo]` · `chegando` de frente, do outro lado da rua · médio · frente · olho · **(2)** de "e nem" até o fim: alvo `[pizzaiolo, pensamento]` · `passando` · perto · direita · baixo (antes: chegando, perto, esquerda, olho)
- **EFEITOS VISUAIS:** o balão "Cardápio só no papel..." (palavra "site") · etiqueta laranja "Bruno? Quem?" (palavra "existe")
- **SONS:** o carro passando · `pop` do balão (palavra "site") · `duvida` (palavra "existe")

#### 5 · plano `outro` · ~3,5 s
> "Quem aparece lá é outro web designer, que foi atrás. E fecha."

- **NA TELA:** (1) a rua entre prédios: o `rival` de camiseta laranja e mochila andando rápido no calçadão, na direção da loja PIZZARIA lá na frente; (2) a fachada: ele chega, aperta a mão do `pizzaiolo` e sobe o ✓ verde "Fechou"
- **MOSTRA:** `["rival", "pizzaiolo", "pizzaria"]`
- **CENÁRIO:** `rua_predios` de dia (a gente andando, os prédios altos) → `fachada` da pizzaria
- **ENTRA AGORA:** o rival já andando no 1º quadro; na palavra "atrás", corte pra fachada com ele chegando; o aperto de mão e o ✓ na palavra "fecha"
- **OBJETOS SE MEXENDO:** a pasta balança na mão dele; as linhas de velocidade (`K.velocidade`) em volta das pernas; na palavra "fecha", o poof de estrelinhas e o ✓ pulando
- **PERSONAGEM:** o rival anda rápido e decidido · na palavra "fecha": aperta a mão do pizzaiolo; o pizzaiolo `comemorando`
- **INTERAÇÃO:** o rival chega e fecha com o pizzaiolo
- **CÂMERA:** 2 cortes: **(1)** até "atrás": `K.seguir(rival, { lado: 'tras' })`, andando junto, por trás, com a placa PIZZARIA lá na frente · **(2)** de "E fecha": alvo `[rival, pizzaiolo, pizzaria]` · `parado` com um tranquinho · médio · esquerda · olho (antes: passando, perto, direita, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Foi atrás" em cima do rival (palavra "atrás") · ✓ verde gigante e etiqueta verde "Fechou" (palavra "fecha")
- **SONS:** `passo` rápido · `sino` da porta · `certo` (palavra "fecha")

#### 6 · plano `decide` · ~4,5 s
> "Aí o Bruno corta a barba e decide ir atrás também. Mas atrás de quem?"

- **NA TELA:** o quarto de dia; o Bruno de barba até o chão, sentado, pega a `tesoura`; a barba some num poof; ele levanta da cadeira, decidido; depois o balão `duvida` "Atrás de quem?" em cima da cabeça, com os ? pulando
- **MOSTRA:** `["personagem", "barba", "tesoura"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** a `tesoura` na mão dele na palavra "corta"; o poof da barba na palavra "barba"; ele levanta na palavra "decide"; o balão e os ? na palavra "quem"
- **OBJETOS SE MEXENDO:** a tesoura faz "tec-tec" abrindo e fechando; a barba vira nuvem e estrelinhas; a cadeira giratória roda pra trás quando ele levanta
- **PERSONAGEM:** começo: sentado, cortando · na palavra "decide": levanta e ergue o punho (`vitoria`) · na palavra "quem": `coca_cabeca`, sem saber pra onde ir
- **INTERAÇÃO:** ele corta a barba com a tesoura; levanta; o balão de dúvida aparece em cima dele
- **CÂMERA:** 2 cortes: **(1)** até "barba": alvo o rosto dele, a barba e a tesoura · `chegando` · perto · frente · olho · **(2)** de "e decide": alvo `[personagem]` inteiro com o balão · `subindo` · médio · direita · baixo (antes: K.seguir por trás e parado, médio, esquerda)
- **EFEITOS VISUAIS:** o poof · etiqueta verde "Bora!" (palavra "decide") · o balão "Atrás de quem?" e os ? (palavra "quem")
- **SONS:** `tesoura`/`clique` (palavra "corta") · `poof` (palavra "barba") · `whoosh` (palavra "decide") · `duvida` (palavra "quem")

#### 7 · plano `lista` · ~4,5 s
> "Ele digita mappoa.com no computador, e vem a lista das pizzarias de Curitiba sem site."

- **NA TELA:** no quarto, o `navegador` grande acima do `monitor` com "mappoa.com" sendo digitado; depois a `tela` do Mappoa sobe do computador e fica no centro com "Pizzarias · Curitiba, PR", o grupo SEM SITE e os cartões das pizzarias; o Bruno à direita
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a luz da tela acende a mesa
- **ENTRA AGORA:** o navegador surge na palavra "digita" e as letras entram até "computador" (uns 2 s); a `tela` sobe do monitor na palavra "lista"; os cartões descem um a um a partir de "pizzarias"
- **OBJETOS SE MEXENDO:** os cartões descem (Pizzaria Forno da Vila, Bella Massa, Pizza do Largo, Nonna Rosa), o primeiro com a borda verde
- **PERSONAGEM:** começo: `digitando` · na palavra "lista": `surpreso`, levanta e aponta a Pizzaria Forno da Vila na tela
- **INTERAÇÃO:** ele digita e o sistema responde com a lista; ele reconhece a pizzaria do bairro e aponta
- **CÂMERA:** 2 cortes: **(1)** até "computador": alvo o `navegador` com as mãos dele no teclado · `chegando` · perto · frente · olho · **(2)** de "e vem": alvo `[navegador, tela, personagem]` · `subindo` · médio · frente · olho · lado "frente" porque o painel olha pro +z (antes: chegando e subindo, perto e médio, frente e direita)
- **EFEITOS VISUAIS:** o endereço mappoa.com grande e legível · etiqueta azul "Curitiba" (palavra "Curitiba")
- **SONS:** `clique` em cada letra · `brilho` da tela subindo (palavra "lista") · `bip` em cada cartão

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** no palco da marca, a `tela` no centro com a análise da Pizzaria Forno da Vila: o círculo "Aderência à sua oferta 91/100", "Dores prováveis: sem site próprio, cardápio só em foto", "Oportunidades: site com cardápio e pedido pelo WhatsApp"; o `robo` à esquerda; o Bruno à direita
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** o rótulo "Mappoa" na palavra "Mappoa"; a `tela` cai na palavra "sistema"; o score enche na palavra "precisa"; as dores e oportunidades na palavra "serviço"
- **OBJETOS SE MEXENDO:** o anel do score enche de 0 até 91; os blocos entram de cima pra baixo; o robô aponta a tela
- **PERSONAGEM:** à direita da tela · começo: `chamando` · na palavra "serviço": `comemorando` (pulinhos)
- **INTERAÇÃO:** o robô entrega a análise e o Bruno comemora
- **CÂMERA:** 2 cortes: **(1)** até "sistema": alvo o rótulo e a `tela` caindo · `chegando` · médio · frente · baixo · **(2)** de "que acha": alvo `[tela, robo, personagem]` · `passando` · médio · esquerda · olho (antes: subindo, médio, frente, olho)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" · etiqueta verde "Quem precisa de você" (palavra "precisa")
- **SONS:** `brilho` do rótulo · `ding` no score · `certo` (palavra "serviço")

#### 9 · plano `antes_agora` · ~5 s · jogo `avanca`
> "Antes, o Bruno esperava sentado. Agora, ele chega primeiro."

- **NA TELA:** (1) "Antes": o quarto, o Bruno dormindo na cadeira com a `barba` até o chão e a `teia` no monitor; (2) "Agora": a rua entre prédios, ele andando rápido no calçadão com a `tela` na mão; (3) a fachada da `pizzaria`: ele chega, mostra a análise pro `pizzaiolo`, que faz joia
- **MOSTRA:** `["personagem", "pizzaria", "pizzaiolo"]`
- **CENÁRIO:** `home_office` → `rua_predios` → `fachada` da pizzaria
- **ENTRA AGORA:** a rua na palavra "Agora"; a fachada na palavra "chega"; a análise abre na mão dele na palavra "primeiro"
- **OBJETOS SE MEXENDO:** no "Antes", as folhas do calendário voando; no "Agora", as linhas de velocidade; na fachada, a porta abre com o sino
- **PERSONAGEM:** começo: `dormindo` (Antes) · na palavra "Agora": anda rápido, decidido · na palavra "primeiro": `mostrando` a tela pro pizzaiolo
- **INTERAÇÃO:** no fim, o Bruno mostra a análise e o pizzaiolo aprova com joia (`vitoria`)
- **CÂMERA:** 3 cortes: **(1)** alvo `[personagem, barba]` · `afastando` · médio · direita · olho · **(2)** `K.heroi(menino)`, de baixo pra cima com os prédios gigantes atrás · **(3)** alvo `[personagem, pizzaiolo, pizzaria]` · `passando` · médio · esquerda · olho (antes: chegando e passando, médio, frente e esquerda)
- **EFEITOS VISUAIS:** etiqueta vermelha "Esperando" no "Antes" · etiqueta verde "Chegou primeiro" (palavra "primeiro")
- **SONS:** `ronco` no "Antes" · `whoosh` na troca · `passo` dele · `sino` da porta · `certo` (palavra "primeiro")

#### 10 · plano `segue` · ~8 s
> "E você, tá esperando ou indo atrás? Comenta aí e segue pra achar o seu. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Bruno de pé na frente do `monitor` no quarto de dia; a pergunta no topo; depois o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando à esquerda; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** a pergunta no topo na palavra "você"; o cartão de seguir na palavra "segue"; o `navegador` na palavra "computador"; as letras a partir de "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde na palavra "testa"
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `digitando`
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** 2 cortes: **(1)** até "seu": alvo `[personagem]` · `chegando` · médio · frente · olho · **(2)** de "No computador": alvo `[personagem, navegador, monitor]` · `parado` · aberto · frente · olho, topo livre (antes: K.heroi e passando)
- **EFEITOS VISUAIS:** a pergunta no topo · cartão de seguir no topo (palavra "segue")
- **SONS:** `brilho` do cartão · `clique` das letras · `ding` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Bruno acena e o robô acena ao lado dele.

**Capa:** o Bruno dormindo na cadeira, de lado, com a `barba` branca descendo até o chão e enrolada no tapete, a `teia`
com a aranha no monitor e as folhas do calendário no ar. Frase: "Esperando *cliente*?"

## As cenas em 2 linhas

1. O Bruno dorme na frente do computador com uma barba branca até o chão, teia de aranha no monitor e as folhas do calendário voando. / Ele acorda de susto no "assim"; a câmera corta 4 vezes bem rápido: a barba, a teia, as folhas e o quadro inteiro.
2. Ele posta "Faço sites! Chama no direct" num celular gigante. / Ele pula animado e senta pra esperar de braços cruzados; a câmera passa pela esquerda e depois chega de baixo.
3. A janela vira noite e dia, o despertador gira, o contador vai até o dia 30 e a barba cresce; o celular continua com "0 mensagens". / Ele olha o relógio, cochila e põe a mão na testa; a câmera gira em volta e depois chega no celular.
4. A Pizzaria Forno da Vila com as mesinhas vazias e o pizzaiolo pensando "Cardápio só no papel...". / Ele olha a rua dos dois lados e não acha ninguém; a câmera chega do outro lado da rua e depois passa de baixo.
5. Outro web designer de mochila anda rápido entre os prédios até a pizzaria e fecha com um aperto de mão. / O pizzaiolo comemora e sobe um ✓ verde; a câmera anda atrás do rival e depois para de lado.
6. O Bruno corta a barba com uma tesoura (poof!) e levanta decidido, mas aparece o balão "Atrás de quem?". / Ele ergue o punho e coça a cabeça; a câmera chega no rosto e depois sobe de baixo.
7. Ele digita mappoa.com no computador e sobe a lista das pizzarias de Curitiba sem site. / Ele digita e aponta a pizzaria do bairro; a câmera chega no teclado e depois sobe de frente.
8. O nome Mappoa e a análise da pizzaria: o score enchendo até 91/100, as dores e as oportunidades. / Ele comemora com o robô; a câmera chega de baixo e depois passa pela esquerda.
9. Antes: ele dormindo de barba. Agora: ele anda rápido entre os prédios e chega na pizzaria com a análise na mão. / O pizzaiolo faz joia; a câmera muda 3 vezes (o quarto, de baixo pra cima na rua, a porta).
10. A pergunta no topo, o cartão de seguir e mappoa.com sendo digitado. / O Bruno pergunta pra câmera e digita; a câmera chega e depois fica parada, aberta.
