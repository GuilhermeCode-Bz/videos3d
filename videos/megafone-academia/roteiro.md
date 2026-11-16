# Tem uma empresa gritando por você a duas quadras (a academia): roteiro e ficha de cena

> O dono pediu outro vídeo com o MESMO gancho do megafone (empresa-gritando, 22,5 mil views), "igual só que diferente"
> (13/11/2026). Avisei que repetir o mesmo gancho já cansou a barba (13 mil → 4,2 mil → 1,6 mil) e ele escolheu igual
> mesmo. Então a frase 1 é a mesma, com a narração gravada copiada (não gasta crédito), e o 1º quadro é o mesmo
> megafone gigante, as ondas entortando os prédios e o web designer de fone sem ouvir. O que muda: quem grita é o
> personal da academia da esquina (com apito no pescoço), o web designer é o Murilo, a cidade é Maceió, e a história
> ganha o que a receita dos 3 mais vistos pede e o original não tinha: o RIVAL de moletom vermelho tira o fone, ouve e
> fecha o site primeiro; e, na virada, a rua inteira vira megafone (padaria, pet shop, ótica gritando também).
> Regras de 12-13/11 aplicadas: o Mappoa entra tarde e como decisão de investir ("investir uma tapioca"), mappoa.com
> digitado no computador na entrada, Mappoa como sistema, fim "Comenta a sua cidade e segue" (sem prometer mostrar
> nada), ~45 s.

## Roteiro

1. Tem uma empresa gritando por você a duas quadras. E você nem ouve. *(gancho, igual ao original)*
2. O Murilo é web designer e passa o dia de fone, mandando proposta pra outro estado.
3. Só que a academia da esquina não tem site. Quem procura não acha nem o horário.
4. Quem ouviu foi outro web designer. Chegou primeiro e fechou o site.
5. A empresa não vai te achar. Quem tem que ouvir é você.
6. Então o Murilo tira o fone e decide investir uma tapioca numa ferramenta que mostra quem tá gritando por site.
7. No computador, digita mappoa.com, e vem a lista das academias de Maceió sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Murilo só ouvia música. Agora, ele ouve quem tá chamando.
10. Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também.

Cerca de 142 palavras, uns 45 segundos com o cartão de seguir, 10 frases. Narração já gravada, copiada sem gastar
crédito: a 1 e a 8 (empresa-gritando) e a 10 (aquario-vazio). As outras 7 gastam uns 540 caracteres da ElevenLabs
(sobram 1.682).

**Onde o tempo vai:** gancho e dor (1 a 3) uns 13 s · o rival e a virada (4 e 5) uns 7 s · o Mappoa (6 a 8) uns 13 s,
começando pela decisão de investir e pelo mappoa.com digitado · o fim (9 e 10) uns 11 s.

**Gancho escolhido:** A (igual ao original, como o dono pediu). Opções:
- **A:** "Tem uma empresa gritando por você a duas quadras. E você nem ouve." (o mesmo 1º quadro: a boca do megafone
  enchendo a tela, a onda bate num prédio e ele entorta como gelatina, o Murilo de fone de olho fechado, e o quadro
  aberto com o personal no meio do calçadão, de apito no pescoço, e o balão "ALGUÉM FAZ MEU SITE?")
- **B:** "Tem uma academia gritando por você a duas quadras. E você de fone." (mesma imagem; muda uma palavra e não fica
  idêntico pra quem viu o primeiro, mas gasta crédito e entrega o nicho)

**Capa:** "Você não *ouve*?" (igual à do original), com o personal e o megafone gigante, as ondas entortando os
prédios e o Murilo de fone em primeiro plano, distraído.

## O que foi conferido

- Sem preço, sem plano e sem número falado. "Duas quadras" e "outro estado" são a história do Murilo. Na tela, o score
  só como "NN/100" da análise, sem total de leads
- O que o Mappoa faz aqui está em `canal/produto.md`: a busca por segmento e cidade ("academias em Maceió"), a lista
  separada SEM SITE (7) e a análise com o score, as dores e as oportunidades (8). "Mostra quem tá gritando por site" é a
  metáfora do vídeo pra lista das empresas sem site, nada além disso. Nada de "garante a venda" nem "manda a mensagem
  sozinho"
- O Mappoa entra tarde (6), como decisão de investir ("investir uma tapioca"), sem valor exato e sem "grátis"
- Sem "Esse é o Murilo": ele aparece já dentro da ação (frase 2)
- O fim é "Comenta a sua cidade e segue", sem prometer mostrar nada
- Empresas inventadas: Academia Ponta Verde Fit (a da esquina) e as outras da lista (Pajuçara Treino, Studio Jatiúca,
  Força Mar Academia). Cidade: Maceió, AL (nova no canal). Academia já foi nicho em Natal (esperar-portfolio), mas
  cidade, nome e história são novos
- A frase 4 não repete o original: o rival (moletom vermelho, o mesmo dos outros vídeos) é a novidade
- A frase 5 continua fazendo sentido depois do rival: a academia já fechou, mas a rua inteira tem outras empresas
  gritando (padaria, pet shop e ótica pegam megafone também)

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `rua_predios` de dia (1, 4, 5 e o "Agora" da 9: o calçadão entre prédios, com
a loja ACADEMIA embaixo, e a PADARIA, o PET SHOP e a ÓTICA), `home_office` de dia (2, 6, 7, o "Antes" da 9 e a 10),
`academia` (3: as esteiras paradas, os halteres, o espelho) e `mundo_mappoa` (8: o palco da marca).
**Peças dos cenários que entram:** os prédios altos (que entortam com as ondas), a gente andando, as árvores, a loja
ACADEMIA, a PADARIA, o PET SHOP e a ÓTICA · a mesa, o monitor, a cadeira giratória e a janela do quarto · as esteiras,
os bancos, os halteres e o espelho da academia · o logo gigante e os pinos do palco.
**Personagens:** o do canal, chamado Murilo, em todas, com o `fone` até a 6. O **personal** da Ponta Verde Fit
(`K.personagem('personal')`, camiseta de academia e apito) na 1, 3, 4 e 9. O **rival** (`K.boneco` com moletom vermelho,
como no aquario-vazio e no leilao-de-freela) na 4. O **aluno** (`K.boneco`, regata) na 3. Três **figurantes lojistas**
(padeiro, dona do pet shop, dono da ótica) na 5. O **robô do Mappoa** na 8 e na 10.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Murilo, web designer | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 10 |
| `fone` | o fone de ouvido grande, com as notinhas saindo | `K.pecas`, igual ao do empresa-gritando (arco + 2 conchas) | preto `#22252b`, conchas verde-água `#2fb5a6` | na cabeça dele | 1, 2, 4, 5, 6 (sai), 9 (Antes), capa |
| `personal` | o personal e dono da Ponta Verde Fit | `K.personagem('personal')` | 1,47 (1,8 no gancho) | no meio do calçadão / perto das esteiras | 1, 3, 4, 9 |
| `megafone` | o megafone gigante | `K.m3d('megafone')` | `tam` ~3, laranja `#f39a1e` | na mão do personal, apontado pro alto | 1, 4, 9, capa |
| `ondas` | as ondas do som | `K.pecas`: 5 anéis que crescem e somem (igual ao original) | 0,5 a 6 m, brancas semitransparentes com borda verde-água | saem da boca do megafone | 1, 4, 5, capa |
| `predios` | os prédios entortando com a onda | as caixas do cenário, balançando | o cenário | dos dois lados do calçadão | 1, 4, 5 |
| `grito` | o balão "ALGUÉM FAZ MEU SITE?" | `K.balaoFala()` | grande, branco, letra preta | em cima do megafone | 1, 4, capa |
| `academia_loja` | a loja ACADEMIA da rua | a loja `academia` de `C.lojas` (`loja_academia` no mostra) | o cenário | atrás do personal | 1, 4, 9 |
| `notas` | as notinhas de música saindo do fone | `K.pecas`: sprites ♪ | pequenas, verde-água | em volta da cabeça dele | 1, 2, 4, 9 (Antes) |
| `propostas` | as propostas "faço sites" voando pra longe pela janela | `K.m3d('envelope')` × 4 em arco | 0,35, brancos | saem do computador e somem na janela | 2, 9 (Antes) |
| `monitor` | o computador do Murilo | `K.computador`, tela desenhada | escala 1,55 | na mesa do quarto | 2, 6, 7, 9, 10 |
| `aluno` | quem quer treinar, procurando a academia no celular | `K.boneco` com regata azul | 1,3 | entre as esteiras | 3 |
| `celular` | o celular gigante com a busca "Ponta Verde Fit", "Site: —" e o ✗ "Horário não encontrado" | `K.m3d('celular_gigante')` | ~1,6 de altura, escala ~0,7 (lição do cardapio-em-pdf) | em pé do lado da cabeça do aluno | 3 |
| `rival` | o outro web designer | `K.boneco`, moletom vermelho `#d63b3b` | 1,47 | na calçada da frente, depois na porta da academia | 4 |
| `contrato` | o contrato carimbado FECHADO | `K.pecas`: folha + carimbo vermelho | 0,5 × 0,7, branco com carimbo vermelho | entre o rival e o personal | 4 |
| `megafones` | os megafones das outras lojas | `K.m3d('megafone')` × 3, tamanho normal | `tam` ~1,2, laranja | na mão dos 3 lojistas, na porta da PADARIA, do PET SHOP e da ÓTICA | 5 |
| `tapioca` | a tapioca que ele troca pelo sistema | `K.pecas`: meia-lua branca dobrada com recheio | ~0,3, branca e coco | na mão dele | 6 |
| `navegador` | barra grande com mappoa.com | `K.painelMappoa` | 2,5 × 0,42 | acima do computador | 7, 10 |
| `tela` | o painel do Mappoa: a lista das academias de Maceió, depois a análise da Ponta Verde Fit | `K.painelMappoa` | 1,56 × 2,6 | sobe do computador / palco / na mão dele | 7, 8, 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, quarto | 8, 10 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| empresa gritando | 1 | o `personal` com o `megafone` gigante e o balão `grito` "ALGUÉM FAZ MEU SITE?" |
| duas quadras | 1 | o calçadão com a loja ACADEMIA lá atrás e o Murilo andando na mesma rua; etiqueta "2 quadras" |
| você nem ouve | 1 | o Murilo de `fone`, de olho fechado, e as `ondas` passando por cima dele |
| web designer | 2 | etiqueta azul "Web designer" |
| passa o dia de fone | 2 | o `fone` e as `notas`, ele digitando |
| proposta, outro estado | 2 | as `propostas` "faço sites" saindo do computador e voando pela janela; etiqueta laranja "Outro estado →" |
| academia da esquina, não tem site | 3 | a `academia` por dentro (esteiras, halteres, espelho), o `personal`; etiqueta vermelha "Sem site" |
| quem procura | 3 | o `aluno` digitando no `celular` gigante: "Ponta Verde Fit" |
| não acha nem o horário | 3 | no celular, "Site: —" e o ✗ vermelho "Horário não encontrado" |
| outro web designer | 4 | o `rival` de moletom vermelho tira o fone e vira pro grito; etiqueta vermelha "Outro web designer" |
| chegou primeiro, fechou o site | 4 | ele corre até o personal, aperto de mão, o `contrato` carimbado FECHADO |
| a empresa não vai te achar | 5 | a rua inteira: a padaria, o pet shop e a ótica pegam os `megafones` e gritam também, pro céu |
| quem tem que ouvir é você | 5 | uma onda chega no Murilo; ele para e tira um lado do fone |
| tira o fone | 6 | ele põe o `fone` na mesa do quarto |
| investir uma tapioca | 6 | a `tapioca` na mão dele vira moeda e cai no computador; etiqueta "Investir" |
| ferramenta que mostra quem tá gritando por site | 6 | na tela do computador, os pinos com megafones pequenos piscando no mapa |
| computador, mappoa.com | 7 | o `navegador` com mappoa.com sendo digitado acima do `monitor` |
| lista, academias, Maceió, sem site | 7 | a `tela` subindo com "Academias · Maceió, AL", o grupo SEM SITE e os cartões |
| Mappoa, sistema, precisa do seu serviço | 8 | rótulo "Mappoa"; a `tela` com a análise da Ponta Verde Fit e o score; o `robo` |
| antes, só ouvia música | 9 | ele de fone no quarto, as notas e as propostas voando pela janela |
| agora, ouve quem tá chamando | 9 | ele sem fone no calçadão, vira pro megafone da padaria e vai até ela com a `tela` na mão |
| a sua cidade | 10 | etiqueta "Sua cidade?" e o pino do mapa |
| segue | 10 | o cartão de seguir |
| computador, mappoa.com | 10 | `monitor` e `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~4 s
> "Tem uma empresa gritando por você a duas quadras. E você nem ouve."

- **NA TELA:** o calçadão entre prédios de dia; no meio, o `personal` da Ponta Verde Fit (um pouco maior que o normal,
  apito no pescoço), virado na diagonal, segurando o `megafone` gigante pra frente e pro alto, com o balão `grito`
  "ALGUÉM FAZ MEU SITE?"; as `ondas` saindo em anéis e os `predios` entortando como gelatina; a loja ACADEMIA atrás
  dele; uns 6 m na frente, de costas pra ele, o Murilo andando com o `fone`, de olho fechado, e as `notas` saindo
- **MOSTRA:** `["personal", "megafone", "personagem"]`
- **CENÁRIO:** `rua_predios` de dia; a gente andando, as árvores; os figurantes tampam os ouvidos
- **ENTRA AGORA:** tudo no 1º quadro (a boca do megafone com a 1ª onda saindo); o balão estoura na palavra
  "gritando"; a etiqueta "2 quadras" na palavra "quadras"
- **OBJETOS SE MEXENDO:** um anel a cada ~0,4 s, crescendo até 6 m; cada prédio que a onda toca entorta e volta
  (rotation.z até ~0,06, escala x 1,05); as janelas piscam; folhas voam; as notinhas sobem do fone
- **PERSONAGEM:** o Murilo anda devagar na direção da câmera, de olho fechado, balançando a cabeça (`dancando` leve) ·
  na palavra "ouve": a onda passa por cima dele, o cabelo voa, e ele nem percebe (sorrisinho). O personal: começo,
  grita no megafone (o corpo pra trás com a força) · na palavra "você": aponta pra ele com a outra mão
- **INTERAÇÃO:** as ondas do personal batem nos prédios e passam por cima do Murilo, que não ouve nada
- **CÂMERA:** 4 cortes rápidos (~0,8 s cada), como no original: **(1)** alvo a boca do `megafone` com a onda vindo na
  lente · `chegando` · perto · frente · baixo · **(2)** alvo um `predio` entortando · `subindo` · médio · direita ·
  baixo · **(3)** alvo a cabeça do Murilo com o `fone` e as notas · `passando` · perto · frente · olho · **(4)** de
  "a duas quadras" até o fim: alvo `[personal, megafone, personagem]` · `afastando` · aberto · frente (3/4 esquerda) ·
  olho, topo livre pra capa (a cena logo depois de uma árvore da direita, lição do empresa-gritando)
- **EFEITOS VISUAIS:** a capa no topo ("Você não *ouve*?") · o balão "ALGUÉM FAZ MEU SITE?" (palavra "gritando") ·
  etiqueta branca "2 quadras" (palavra "quadras") · as notinhas
- **SONS:** `megafone`/`grito` com eco · `apito` curto no começo (a marca do personal) · `whoosh` a cada onda ·
  `tremor` dos prédios · `boing` do prédio · música abafada do fone (palavra "ouve")

#### 2 · plano `longe` · ~4,5 s
> "O Murilo é web designer e passa o dia de fone, mandando proposta pra outro estado."

- **NA TELA:** o quarto do Murilo de dia; ele na cadeira giratória, de `fone`, digitando no `monitor`; a cada tecla uma
  proposta (`propostas`, envelope com "faço sites") sai do computador, dá a volta na sala e foge pela janela; a
  etiqueta "Outro estado →" com a seta pra janela
- **MOSTRA:** `["personagem", "monitor", "propostas"]`
- **CENÁRIO:** `home_office` de dia; a janela clara
- **ENTRA AGORA:** a etiqueta azul "Web designer" na palavra "designer"; as propostas a partir de "mandando" (uma a
  cada ~0,4 s); a etiqueta laranja "Outro estado →" na palavra "estado"
- **OBJETOS SE MEXENDO:** as propostas saem girando, fazem um arco e encolhem até sumir na janela; as notinhas sobem
- **PERSONAGEM:** começo: `digitando`, balançando a cabeça no ritmo · na palavra "estado": gira na cadeira e aponta a
  janela, animado (`comemorando` sentado)
- **INTERAÇÃO:** ele digita e cada proposta vai embora pela janela
- **CÂMERA:** 2 cortes: **(1)** até "fone": alvo `[personagem, monitor]` · `chegando` · médio · frente · olho · **(2)**
  de "mandando": alvo as `propostas` e a janela · `passando` · médio · esquerda (até ~30°, lição do home_office) · olho
  (antes: afastando, aberto, frente, na rua) · altura "olho": o quarto tem teto
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · "faço sites" em cada envelope · etiqueta
  laranja "Outro estado →" (palavra "estado")
- **SONS:** `clique` do teclado · `whoosh` de cada proposta · música abafada do fone

#### 3 · plano `academia` · ~4,5 s · jogo `falha`
> "Só que a academia da esquina não tem site. Quem procura não acha nem o horário."

- **NA TELA:** dentro da `academia`: as esteiras paradas, os halteres e o espelho; o `personal` perto das esteiras, de
  apito; na frente, o `aluno` de regata com o `celular` gigante em pé do lado da cabeça dele; no celular, a busca
  "Ponta Verde Fit" e o resultado: "Site: —" e o ✗ vermelho "Horário não encontrado"
- **MOSTRA:** `["personal", "aluno", "celular"]`
- **CENÁRIO:** `academia` de dia; o espelho refletindo, uma esteira girando vazia
- **ENTRA AGORA:** a etiqueta vermelha "Sem site" em cima do personal na palavra "site"; o celular gigante sobe do chão
  na palavra "procura"; "Site: —" e o ✗ na palavra "horário"
- **OBJETOS SE MEXENDO:** a esteira vazia girando; a busca digitada letra por letra; o ✗ pula; na palavra "horário"
  tudo congela em preto e branco (o jogo faz)
- **PERSONAGEM:** o personal: começo, levanta um halter, olhando pra porta, esperando · na palavra "horário": `ombros`.
  O aluno: digita no celular · na palavra "acha": `nao` com a cabeça e vira pra ir embora
- **INTERAÇÃO:** o aluno procura a academia no celular, não acha o horário e vira as costas
- **CÂMERA:** 2 cortes: **(1)** até "site": alvo `[personal, esteiras]` · `orbita` lenta · médio · direita · olho ·
  **(2)** de "Quem procura": alvo `[aluno, celular]` com o personal ao fundo · `chegando` · perto · esquerda · olho
  (antes: passando, médio, esquerda: aqui mais perto) · altura "olho": a academia tem teto
- **EFEITOS VISUAIS:** etiqueta vermelha "Sem site" (palavra "site") · a tela do celular · ✗ vermelho "Horário não
  encontrado" (palavra "horário") · congela em preto e branco (o jogo faz)
- **SONS:** `clique` das letras no celular · `erro` (palavra "horário") · o congela (o jogo põe)

#### 4 · plano `rival` · ~3,5 s · jogo `corrige`
> "Quem ouviu foi outro web designer. Chegou primeiro e fechou o site."

- **NA TELA:** a cor volta; o calçadão: o personal gritando no megafone; na calçada da frente, o `rival` de moletom
  vermelho tira o fone, vira pro grito e corre até ele; os dois apertam a mão na porta da academia e o `contrato`
  carimbado FECHADO aparece entre eles; lá no fundo, o Murilo passa de fone, de olho fechado
- **MOSTRA:** `["rival", "personal", "contrato"]`
- **CENÁRIO:** `rua_predios` de dia; os prédios balançando
- **ENTRA AGORA:** a cor volta no começo (o corrige); a etiqueta vermelha "Outro web designer" na palavra "designer";
  o contrato e o carimbo FECHADO na palavra "fechou"
- **OBJETOS SE MEXENDO:** as ondas batem nos prédios; o rival corre com as linhas de velocidade (`K.velocidade`); o
  carimbo bate no contrato; o megafone desce quando o personal aperta a mão
- **PERSONAGEM:** o rival: começo, tira o fone e vira a cabeça pro grito · na palavra "primeiro": chega correndo e
  aperta a mão do personal. O personal: grita, depois baixa o megafone e faz joia · o Murilo, ao fundo, passa
  balançando a cabeça, sem ver
- **INTERAÇÃO:** o rival ouve o grito, chega primeiro e fecha com o personal; o Murilo nem vê
- **CÂMERA:** 2 cortes: **(1)** até "designer": `K.seguir(rival, { lado: 'frente' })` correndo, com o personal atrás
  · **(2)** de "Chegou": alvo `[rival, personal, contrato]` · `passando` · médio · esquerda · olho, com o Murilo
  pequeno no fundo (antes: chegando, perto, esquerda, na academia)
- **EFEITOS VISUAIS:** etiqueta vermelha "Outro web designer" (palavra "designer") · carimbo vermelho FECHADO (palavra
  "fechou")
- **SONS:** `whoosh` da corrida · `passo` · `carimbo` (palavra "fechou") · música abafada do fone do Murilo no fundo

#### 5 · plano `ouvir` · ~3,5 s
> "A empresa não vai te achar. Quem tem que ouvir é você."

- **NA TELA:** o calçadão: na porta da PADARIA, do PET SHOP e da ÓTICA, três lojistas pegam `megafones` e gritam pro
  céu; as `ondas` de todos sobem e se cruzam, os prédios entortam mais; no meio, o Murilo andando de fone; na palavra
  "você", ele para, tira um lado do fone e olha pra trás
- **MOSTRA:** `["megafones", "personagem", "fone"]`
- **CENÁRIO:** `rua_predios` de dia; os prédios balançando, os figurantes tampando o ouvido
- **ENTRA AGORA:** os 3 megafones um atrás do outro, a partir de "empresa"; a etiqueta laranja "Pro lado errado" em
  cima das ondas na palavra "achar"; o "!" amarelo em cima do Murilo na palavra "você"
- **OBJETOS SE MEXENDO:** as ondas sobem pro céu e batem nos prédios; na palavra "você", uma onda vem rente ao chão e
  bate nas costas dele; as notinhas do fone param
- **PERSONAGEM:** o Murilo: começo, andando de olho fechado · na palavra "você": para, tira o fone de um lado (a mão na
  orelha) e olha pra trás, `surpreso`. Os lojistas: gritam pro alto e, na palavra "você", viram o megafone pra ele
- **INTERAÇÃO:** as ondas dos lojistas chegam nele e ele finalmente ouve
- **CÂMERA:** 2 cortes: **(1)** até "achar": `K.drone` descendo do alto sobre o calçadão, com os 3 megafones e as
  ondas se cruzando · **(2)** de "Quem tem": `K.seguir(murilo, { lado: 'frente' })` parando junto com ele (antes:
  K.seguir do rival e passando, médio)
- **EFEITOS VISUAIS:** etiqueta laranja "Pro lado errado" (palavra "achar") · "!" amarelo (palavra "você")
- **SONS:** os megafones com eco, um em cima do outro · a música do fone corta seca (palavra "ouvir") · `ding`/`!`
  (palavra "você")

#### 6 · plano `investe` · ~6 s
> "Então o Murilo tira o fone e decide investir uma tapioca numa ferramenta que mostra quem tá gritando por site."

- **NA TELA:** no quarto, o Murilo tira o `fone` e põe na mesa; na mão, a `tapioca`; ele olha pra ela, decide, e ela
  vira uma moeda dourada que cai na tela do `monitor`; na tela, um mapa com pinos piscando, cada um com um megafone
  pequeno saindo
- **MOSTRA:** `["personagem", "tapioca", "monitor"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** o fone sai da cabeça na palavra "fone"; a tapioca na mão na palavra "tapioca"; a moeda cai na palavra
  "ferramenta"; os pinos com megafone na tela na palavra "gritando"
- **OBJETOS SE MEXENDO:** o fone pousa na mesa; a tapioca gira e vira moeda (`K.poof` pequeno); a moeda cai quicando
  no teclado; os pinos pulam na tela um a um
- **PERSONAGEM:** começo: tira o fone com as duas mãos · na palavra "decide": olha a tapioca, `sim` com a cabeça, e
  joga a moeda no computador
- **INTERAÇÃO:** ele troca a tapioca pela ferramenta e a tela responde com os pinos
- **CÂMERA:** 2 cortes: **(1)** até "tapioca": alvo `[personagem, tapioca]` · `chegando` · perto · direita (até 30°) ·
  olho · **(2)** de "numa ferramenta": alvo `[monitor, personagem]` · `subindo` · médio · frente · olho (antes:
  K.seguir de frente na rua)
- **EFEITOS VISUAIS:** etiqueta azul "Investir" (palavra "investir") · os pinos com megafone na tela (palavra
  "gritando")
- **SONS:** o fone pousando · `moeda` (palavra "ferramenta") · `pop` de cada pino

#### 7 · plano `lista` · ~4,5 s
> "No computador, digita mappoa.com, e vem a lista das academias de Maceió sem site."

- **NA TELA:** o `navegador` grande acima do `monitor` com "mappoa.com" sendo digitado; depois a `tela` do Mappoa sobe
  do computador e fica no centro com "Academias · Maceió, AL", o grupo SEM SITE e os cartões; o Murilo à direita
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a luz da tela acende a mesa
- **ENTRA AGORA:** o navegador surge em "computador" e as letras entram até "mappoa.com" (uns 2 s); a `tela` sobe na
  palavra "lista"; os cartões descem um a um a partir de "academias"
- **OBJETOS SE MEXENDO:** os cartões descem (Ponta Verde Fit, Pajuçara Treino, Studio Jatiúca, Força Mar Academia), o
  primeiro com a borda verde
- **PERSONAGEM:** começo: `digitando` · na palavra "lista": `surpreso`, levanta e aponta a Pajuçara Treino (a Ponta
  Verde já foi do rival: o cartão dela aparece riscado, "já tem site")
- **INTERAÇÃO:** ele digita e o sistema responde com a lista; ele escolhe a próxima
- **CÂMERA:** 2 cortes: **(1)** até "mappoa.com": alvo o `navegador` com as mãos no teclado · `chegando` · perto ·
  frente · olho · **(2)** de "e vem": alvo `[navegador, tela, personagem]` · `afastando` · médio · frente · olho ·
  lado "frente" porque o painel olha pro +z (antes: subindo, médio, frente: aqui afastando)
- **EFEITOS VISUAIS:** o endereço mappoa.com grande e legível · etiqueta azul "Maceió" (palavra "Maceió")
- **SONS:** `clique` em cada letra · `brilho` da tela subindo (palavra "lista") · `bip` em cada cartão

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** no palco da marca, a `tela` no centro com a análise da Pajuçara Treino: o círculo "Aderência à sua
  oferta 87/100", "Dores prováveis: sem site próprio, horário só no Instagram", "Oportunidades: site com horário,
  planos e matrícula pelo WhatsApp"; o `robo` à esquerda; o Murilo à direita
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** o rótulo "Mappoa" na palavra "Mappoa"; a `tela` cai na palavra "sistema"; o score enche na palavra
  "precisa"; as dores e oportunidades na palavra "serviço"
- **OBJETOS SE MEXENDO:** o anel do score enche de 0 até 87; os blocos entram de cima pra baixo; o robô aponta a tela
- **PERSONAGEM:** à direita · começo: `chamando` · na palavra "serviço": `comemorando`
- **INTERAÇÃO:** o robô entrega a análise e o Murilo comemora
- **CÂMERA:** 2 cortes: **(1)** até "sistema": alvo o rótulo e a `tela` caindo · `chegando` · médio · frente · baixo ·
  **(2)** de "que acha": alvo `[tela, robo, personagem]` · `passando` · médio · esquerda · olho (antes: afastando,
  médio, frente, olho)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" · etiqueta verde "Quem precisa de você" (palavra "precisa")
- **SONS:** `brilho` do rótulo · `ding` no score · `certo` (palavra "serviço")

#### 9 · plano `antes_agora` · ~5 s · jogo `avanca`
> "Antes, o Murilo só ouvia música. Agora, ele ouve quem tá chamando."

- **NA TELA:** (1) "Antes": o quarto, o Murilo de fone balançando a cabeça, as notas e as propostas fugindo pela
  janela; (2) "Agora": o calçadão, ele sem fone, com a `tela` na mão; o padeiro grita no megafone na porta da
  PADARIA e ele vira pro grito; (3) ele chega e mostra a análise, o padeiro baixa o megafone e faz joia; sobe o ✓
- **MOSTRA:** `["personagem", "megafones", "tela"]`
- **CENÁRIO:** `home_office` → `rua_predios` (os prédios param de balançar quando ele chega)
- **ENTRA AGORA:** a rua na palavra "Agora"; ele vira pro grito na palavra "ouve"; o ✓ na palavra "chamando"
- **OBJETOS SE MEXENDO:** no "Antes", as notas e as propostas; no "Agora", as linhas de velocidade nos pés dele; o
  megafone do padeiro desce; as ondas param
- **PERSONAGEM:** começo: `dancando` sentado, de fone (Antes) · na palavra "ouve": vira a cabeça pro grito, a mão na
  orelha · na palavra "chamando": anda até o padeiro e `mostrando` a tela. O padeiro: baixa o megafone e faz joia
- **INTERAÇÃO:** ele ouve o padeiro, vai até ele e mostra a análise
- **CÂMERA:** 3 cortes: **(1)** alvo `[personagem, monitor]` · `afastando` · médio · direita · olho · **(2)**
  `K.heroi(murilo)`, de baixo pra cima com os prédios atrás, ele virando pro grito · **(3)** alvo `[personagem,
  padeiro, megafone]` · `passando` · médio · esquerda · olho (antes: chegando e passando no palco)
- **EFEITOS VISUAIS:** etiqueta vermelha "Só música" no "Antes" · ✓ verde e etiqueta verde "Ouviu!" (palavra
  "chamando")
- **SONS:** música do fone no "Antes" · `whoosh` na troca · megafone do padeiro · `certo` (palavra "chamando")

#### 10 · plano `segue` · ~7 s
> "Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Murilo de pé na frente do `monitor` no quarto; no ar, a etiqueta grande "Sua cidade?" com um pino de
  mapa; o cartão de seguir no topo; depois o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo`
  acenando à esquerda
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** a etiqueta "Sua cidade?" e o pino na palavra "cidade"; o cartão de seguir na palavra "segue"; o
  `navegador` na palavra "computador"; as letras a partir de "digita"
- **OBJETOS SE MEXENDO:** o pino cai quicando; mappoa.com letra por letra; o botão "Ir" fica verde na palavra "testa"
- **PERSONAGEM:** começo: `chamando` (aponta pra câmera) · na palavra "digita": `digitando`
- **INTERAÇÃO:** ele aponta pra quem assiste, depois digita e o endereço aparece
- **CÂMERA:** 2 cortes: **(1)** até "segue": alvo `[personagem]` com o pino · `chegando` · médio · frente · olho ·
  **(2)** de "No computador": alvo `[personagem, navegador, monitor]` · `parado` · aberto · frente · olho, topo livre
  (antes: K.heroi e passando, na rua)
- **EFEITOS VISUAIS:** etiqueta "Sua cidade?" + pino (palavra "cidade") · cartão de seguir no topo (palavra "segue")
- **SONS:** `pop` do pino · `brilho` do cartão · `clique` das letras · `ding` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Murilo acena e o robô acena ao lado dele.

**Capa:** o calçadão, o personal no meio com o `megafone` gigante e o apito, as `ondas` entortando os prédios, o balão
"ALGUÉM FAZ MEU SITE?" e o Murilo de fone em primeiro plano, de olho fechado. Frase: "Você não *ouve*?"

## As cenas em 2 linhas

1. O personal da academia grita "ALGUÉM FAZ MEU SITE?" num megafone gigante no meio da rua, e as ondas entortam os prédios. / O Murilo passa de fone, de olho fechado, e nem ouve; a câmera corta 4 vezes bem rápido: o megafone, o prédio, o fone e o quadro inteiro.
2. No quarto, ele digita de fone e cada proposta "faço sites" sai voando pela janela pra outro estado. / Ele balança a cabeça e aponta a janela todo animado; a câmera chega de frente e depois passa pela esquerda.
3. Na academia, o aluno procura a Ponta Verde Fit no celular gigante: "Site: —" e "Horário não encontrado". / O personal encolhe os ombros perto das esteiras e o aluno vai embora; a câmera gira em volta e depois chega no celular.
4. Na rua, o outro web designer, de moletom vermelho, tira o fone, ouve o grito e corre até o personal: aperto de mão e carimbo FECHADO. / O Murilo passa lá no fundo, de fone, sem ver; a câmera corre junto com o rival e depois passa pelos dois.
5. A padaria, o pet shop e a ótica pegam megafones e gritam também; a rua inteira treme. / Uma onda chega no Murilo, ele para e tira um lado do fone; a câmera desce do alto e depois para de frente com ele.
6. No quarto, ele tira o fone e a tapioca na mão vira moeda, que cai no computador; na tela, pinos com megafones piscam. / Ele balança a cabeça, decidido; a câmera chega perto e depois sobe de frente.
7. Ele digita mappoa.com e sobe a lista das academias de Maceió sem site (a Ponta Verde já riscada). / Ele aponta a próxima, a Pajuçara Treino; a câmera chega no teclado e depois se afasta de frente.
8. O nome Mappoa e a análise da Pajuçara Treino: o score enchendo até 87/100, as dores e as oportunidades. / Ele comemora com o robô; a câmera chega de baixo e depois passa pela esquerda.
9. Antes: ele de fone, só na música. Agora: ele ouve o padeiro gritando na rua, vai até ele e mostra a análise. / O padeiro baixa o megafone e faz joia; a câmera muda 3 vezes (o quarto, de baixo pra cima na rua, os dois juntos).
10. "Sua cidade?" com um pino de mapa, o cartão de seguir e mappoa.com sendo digitado. / O Murilo aponta pra câmera e digita; a câmera chega e depois fica parada, aberta.
