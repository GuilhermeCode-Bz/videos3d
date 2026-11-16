# Tem cliente implorando por um site. E você passa reto: roteiro e ficha de cena

> Pedido do dono em 14/11/2026: "cliente implorando pra alguém fazer o site dele". É o conceito do campeão do canal (o
> megafone, 22,5 mil views: o cliente perto chamando e o web designer sem perceber), com uma METÁFORA nova pra não
> cansar: a dona da confeitaria do lado está **agarrada no tornozelo do web designer, implorando, sendo arrastada pelo
> calçadão e chorando dois jatos de lágrima**, e ele, de olho no celular, nem percebe e reclama que ninguém quer site.
> Receita dos 3 mais vistos: a dor é do PRÓPRIO web designer ("não tenho cliente"), falando com "você"; imagem absurda e
> engraçada no 1º quadro; a frase deixa a curiosidade aberta ("E você passa reto."); um rival que fecha o cliente; a
> virada de atitude (ele larga o celular e olha pro lado); o Mappoa entra tarde, como decisão de investir ("o preço de
> um bolo", que conversa com a confeitaria); ~46 s; fim com pergunta e comentário de uma palavra. A frase 8 tem a
> narração copiada do esperar-estatua (não gasta crédito).

## Roteiro

1. Tem cliente implorando por um site. E você passa reto. *(gancho)*
2. O Nico é web designer e reclama o dia inteiro que ninguém quer site.
3. Só que a confeitaria do lado não tem site. O cliente quer encomendar um bolo e não acha nada.
4. Quem viu foi outro web designer. Ela larga a perna do Nico e fecha com ele.
5. Cliente que implora não fica esperando. Quem olha primeiro, leva.
6. Então o Nico investe o preço de um bolo numa ferramenta que mostra quem precisa de site.
7. No computador, digita mappoa.com, e vem a lista das confeitarias de São Luís sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Nico passava reto. Agora, ele olha pro lado e chega primeiro.
10. E você, já passou reto por um cliente? Comenta EU. No computador, digita mappoa.com e testa você também.

O pedido de seguir fica só na tela (o cartão de seguir), sem falar.

Cerca de 145 palavras, uns 46 s com o cartão de seguir. Gasta uns 700 caracteres da ElevenLabs (a 8 reaproveitada;
sobram ~8.100).

**Capa:** "Você passa *reto*?" (17 letras, cabe numa linha), o Nico andando de olho no celular, e a confeiteira agarrada no
tornozelo dele, arrastada no chão, chorando dois jatos de lágrima, com a loja DOCE LUME e a etiqueta vermelha "Sem site"
atrás.

### Outros ganchos (o mesmo conceito, outra frase ou imagem)

- **A (o escolhido):** "Tem cliente implorando por um site. E você passa reto." · a confeiteira agarrada no tornozelo
  do Nico, arrastada pelo calçadão, chorando jatos; ele de olho no celular, sem perceber
- **B:** "Ela tá de joelhos por um site. E nenhum web designer aparece." · a confeiteira de joelhos no meio do calçadão,
  com uma placa "FAZ MEU SITE, POR FAVOR", a chuva caindo só em cima dela; web designers passando de fone
- **C:** "Esse cliente chorou tanto por um site que alagou a rua." · as lágrimas da confeiteira enchendo o calçadão até a
  canela, e o Nico passando de boia, olhando o celular

## O que foi conferido

- Sem preço, sem plano e sem número de venda. O Mappoa: busca por segmento e cidade ("confeitarias em São Luís"), a
  lista separada em SEM SITE e a análise com score, dores e oportunidades. Nada de "manda a mensagem sozinho" nem
  "garante a venda": quem vai até a confeitaria é o Nico
- Entra tarde (6), como decisão de investir ("o preço de um bolo"), sem valor exato e sem "grátis"
- O mappoa.com aparece já na entrada (7), digitado "no computador"
- Sem "Esse é o Nico": ele aparece dentro da ação (2), reclamando no celular com a dona ainda agarrada na perna
- Empresas inventadas: Confeitaria Doce Lume (a do lado, que o rival fecha) e, na lista, Bolo da Ilha, Doce Reviver,
  Ateliê Lençóis e Brigadeiro do Centro (a que o Nico fecha no "Agora"). Cidade nova no canal: São Luís, MA. Nicho novo:
  confeitaria
- Nome novo: Nico (já foram Enzo, Davi, Caio, Léo, Rafa, Vitor, Mateus, Lucas, Nando, Téo, Gui, Igor, Thiago, Pedro,
  Vini, Beto, Murilo, Bruno e José)
- A dona implorando é a imagem da dor (cliente perto precisando e o web designer sem ver); a dor continua sendo achar o
  próximo cliente, e a virada é sobre olhar pro lado e ir atrás, não sobre "esperar indicação"
- Fim: pergunta ligada à história + comentário de uma palavra (EU), que não pede resposta do dono e não promete mostrar
  nada. O "segue" fica só no cartão
- Diferente do megafone: lá a empresa grita de longe e ele está de fone; aqui ela está grudada nele, e o que cega é o
  celular

## Ficha de cena

**Cenários (três, com `K.cenarios`):** `rua_predios` de dia (1 a 5, 9 e 10: o calçadão, com a placa de poste DOCE LUME na
frente da loja PADARIA, que vira a confeitaria), `home_office` de dia (6 e 7: o computador do canal, com a cadeira
giratória no SEAT) e `mundo_mappoa` (8).
**Personagens:** o do canal, chamado Nico, em todas. A **confeiteira**, dona da Doce Lume (`K.personagem('dona')`, blazer
rosa #f06a9b, avental branco e chapéu de confeiteiro feitos no `cena.js`) na 1 a 4 e no "Antes" da 9; a **dona da
Brigadeiro do Centro** (`K.personagem('dona')`, blazer marrom-chocolate #6b3e26) no "Agora" da 9. O **rival** (moletom
vermelho) na 4 e no "Agora" da 9. O **cliente** com o celular (figurante) na 3. O **robô** na 8 e na 10. Pedestres do
cenário passando.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Nico, web designer | `K.boneco`, cores do canal | 1,47 | andando no calçadão; depois no quarto | 1 a 10 |
| `celular` | o celular do Nico, que ele não tira do olho | caixinha preta com a tela acesa (rede social rolando) | 0,08 × 0,15 | na mão dele, na frente do rosto | 1, 2, 4, 5 |
| `dona` | a confeiteira da Doce Lume | `K.personagem('dona')`, blazer rosa, avental branco e chapéu de confeiteiro | 1,47 | deitada de bruços no chão, agarrada no tornozelo dele (gancho); de pé na porta da loja (3, 4) | 1 a 4, 9 |
| `lagrimas` | os dois jatos de lágrima de desenho animado | `K.esguicho` saindo dos dois olhos dela, em arco pros lados, + `K.respingo` molhando o chão | azul-claro, ~1 m de arco | na cara da dona | 1, 2, 4, 9 |
| `poca` | a trilha molhada que ela deixa no chão | discos azul-claros finos e brilhantes no chão, atrás dela | ~0,6 de largura | no calçadão, na trilha | 1, 2 |
| `poeira` | a poeira do arrasto | `K.poof` pequenininho a cada ~0,4 s no corpo dela | escala 0,35 | atrás dela | 1, 2 |
| `balao` | o que o Nico reclama | `K.balaoFala` "Ninguém quer site..." | o padrão | em cima da cabeça dele | 2 |
| `placa_confeitaria` | a placa de poste da Doce Lume | `placaPoste` (como no esperar-estatua), virada pra +z | 1,4 de largura, rosa #f06a9b | no calçadão, na frente da PADARIA | 1, 3, 4, 9 |
| `loja_confeitaria` | a loja PADARIA do calçadão, que vira a confeitaria | `C.lojas` (id `padaria`) | o cenário | ao lado do calçadão | 3, 4, 9 |
| `bolo` | o bolo de três andares rosa com cereja | `K.pecas`: 3 cilindros, cobertura branca escorrendo, granulado e cereja | 0,5 de altura | na mão da dona (3) e no balcão da porta (4) | 3, 4 |
| `celular_cliente` | o celular do cliente buscando "Doce Lume encomenda bolo" | `K.m3d('celular_gigante')` com a busca vazia e o ✗ "Sem site" | escala ~0,7 | do lado da cabeça do cliente (mesma distância dele) | 3 |
| `cliente` | quem quer encomendar o bolo | figurante (`K.boneco` cores neutras) | 1,47 | parado perto da placa | 3 |
| `rival` | o outro web designer | `K.boneco`, moletom vermelho | 1,47 | vem pelo calçadão até a dona | 4, 9 |
| `contrato` | o contrato FECHADO do rival | folha + carimbo vermelho | 0,62 × 0,82 | entre o rival e a dona | 4 |
| `nota` | a nota com o desenho de um bolo | `K.pecas`: papel verde com um bolinho desenhado | 0,4 × 0,22 | na mão dele | 6 |
| `moeda` | a moeda que a nota vira | disco dourado | 0,2 | cai no computador | 6 |
| `monitor` | o computador do Nico | `K.computador` | escala 1,55 | na mesa do quarto | 6, 7 |
| `cadeira` | a cadeira giratória | `K.m3d('cadeira_giratoria')` no SEAT | escala 1 | na frente da mesa | 6, 7 |
| `navegador` | barra com mappoa.com | `K.painelMappoa` | 2,3 × 0,4 | acima do computador | 7, 10 |
| `tela` | a lista das confeitarias de São Luís, depois a análise da Brigadeiro do Centro | `K.painelMappoa` | 1,4 × 2,33 / 1,56 × 2,6 | sobe do computador / palco / na mão dele | 7, 8, 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, calçadão | 8, 10 |

### Teste dos substantivos

| A narração fala | Frase | Como |
|---|---|---|
| cliente implorando por um site | 1 | a `dona` agarrada no tornozelo dele, arrastada, chorando os `lagrimas`; balão dela "FAZ MEU SITE!" |
| você passa reto | 1 | o Nico andando de olho no `celular`, sem olhar pra baixo |
| web designer | 2 | etiqueta "Web designer" |
| reclama que ninguém quer site | 2 | `balao` "Ninguém quer site..." e ele bufando |
| confeitaria do lado, não tem site | 3 | a `placa_confeitaria` DOCE LUME com a etiqueta vermelha "Sem site"; a dona de pé na porta com o `bolo` |
| o cliente quer encomendar um bolo, não acha nada | 3 | o `cliente` com o `celular_cliente` na busca "Doce Lume encomenda" e o ✗ |
| outro web designer | 4 | o `rival` chega, etiqueta vermelha "Outro web designer" |
| larga a perna do Nico | 4 | a dona solta o tornozelo do Nico e agarra o braço do rival |
| fecha com ele | 4 | aperto de mão, `contrato` FECHADO |
| cliente que implora não fica esperando | 5 | o Nico finalmente olha pra baixo: a perna livre, a trilha de lágrima indo até a porta do rival |
| quem olha primeiro, leva | 5 | ele baixa o `celular` e olha pro lado; etiqueta "Olhe pro lado" |
| o preço de um bolo, ferramenta | 6 | a `nota` com o bolinho vira `moeda` e cai no `monitor`; etiqueta "Investir" |
| quem precisa de site | 6 | no monitor, o mapa com os pinos |
| mappoa.com, lista, confeitarias, São Luís, sem site | 7 | `navegador` e `tela` com "Confeitarias · São Luís, MA" e o grupo SEM SITE |
| Mappoa, sistema, precisa do seu serviço | 8 | rótulo "Mappoa", a análise da Brigadeiro do Centro com o score, o `robo` |
| antes passava reto | 9 | o gancho de novo, de outro ângulo: ele arrastando a dona sem ver |
| agora olha pro lado e chega primeiro | 9 | na porta da Brigadeiro do Centro, ele mostra a `tela` pra dona; o `rival` chega atrasado |
| já passou reto por um cliente, EU, mappoa.com | 10 | o Nico no calçadão, o celular no bolso; etiqueta "EU"; cartão de seguir; `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3,3 s
> "Tem cliente implorando por um site. E você passa reto."

- **NA TELA:** o calçadão; o Nico andando reto pra câmera, de olho no `celular`; no chão, atrás dele, a `dona`
  deitada de bruços, agarrada no tornozelo dele com as duas mãos, sendo arrastada, com dois `lagrimas` em arco saindo
  dos olhos e a `poca` molhando a trilha; a `poeira` subindo; pedestres olhando espantados
- **MOSTRA:** `["personagem", "dona", "lagrimas"]`
- **CENÁRIO:** `rua_predios` de dia, prédios altos dos dois lados, gente andando e um carro passando na esquina ao fundo
- **ENTRA AGORA:** tudo já no 1º quadro (a dona já agarrada); o balão dela "FAZ MEU SITE!" pula em "implorando"; em
  "reto", ele dá mais um passo e ela quica no chão
- **OBJETOS SE MEXENDO:** a dona deslizando no chão junto com o pé dele, o corpo balançando a cada passo; os jatos de
  lágrima batendo no chão e respingando; o celular dele com a tela rolando
- **PERSONAGEM:** anda com o celular na cara, distraído, rindo de algo na tela · em "reto": coça a cabeça
  (`coca_cabeca`), sem olhar pra baixo
- **INTERAÇÃO:** a dona puxa a perna dele e ele arrasta ela sem sentir; um pedestre aponta pra ela
- **CÂMERA:** 3 cortes rápidos (~1 s): **(1)** `K.seguir(menino, { lado: 'frente' })` baixinho, na altura do chão, a
  cara chorando dela e o pé dele no quadro (a ~2,5 m, sem colar) · **(2)** `K.mirar` de lado (~5°, logo depois de uma
  árvore da direita) na altura do rosto dele, o celular e a cara de distraído, ela embaixo · **(3)** aberto, de frente,
  `K.seguir` recuando, os dois inteiros e a trilha molhada atrás; topo livre pra frase da capa
- **EFEITOS VISUAIS:** balão de fala dela "FAZ MEU SITE!" · respingos das lágrimas · linhas de movimento do arrasto
- **SONS:** `whoosh` no 1º quadro · água espirrando (`pingo` repetido) · `passo` · arrasto (`whoosh` curto)

#### 2 · plano `reclama` · ~3,8 s
> "O Nico é web designer e reclama o dia inteiro que ninguém quer site."

- **NA TELA:** o Nico parado no meio do calçadão, ainda com a dona agarrada no pé chorando; ele digitando no celular e
  bufando; o `balao` "Ninguém quer site..." em cima da cabeça
- **MOSTRA:** `["personagem", "balao", "dona"]`
- **CENÁRIO:** `rua_predios` de dia, pedestres passando e desviando da poça
- **ENTRA AGORA:** etiqueta "Web designer" em "designer"; o balão em "reclama"; em "site", ele dá uma sacudidinha no pé
  (como quem tira um chiclete) e a dona nem solta
- **OBJETOS SE MEXENDO:** os jatos de lágrima; o celular; a poça crescendo
- **PERSONAGEM:** começa digitando no celular, de cara emburrada · em "ninguém": joga os braços pro alto, indignado
  (`bravo`), e volta pro celular
- **INTERAÇÃO:** ele sacode o pé; a dona aperta mais forte e chora mais (os jatos engrossam)
- **CÂMERA:** chegando · médio · esquerda ~20° · olho, ele e a dona inteiros → orbitando pra frente, parando com o balão no
  alto do quadro
- **EFEITOS VISUAIS:** etiqueta "Web designer" · balão "Ninguém quer site..." · nuvenzinha de raiva (`K.nuvemRaiva`)
- **SONS:** cliques do celular · bufada (`whoosh` grave) · `pingo` das lágrimas

#### 3 · plano `confeitaria` · ~5,5 s · jogo `falha`
> "Só que a confeitaria do lado não tem site. O cliente quer encomendar um bolo e não acha nada."

- **NA TELA:** do lado do calçadão, a `placa_confeitaria` DOCE LUME na frente da `loja_confeitaria`, com a etiqueta
  vermelha "Sem site"; a `dona` (agora de pé na porta, enxugando as lágrimas) segurando o `bolo` rosa; o `cliente`
  parado na frente da placa com o `celular_cliente` na busca "Doce Lume encomenda bolo", a lista vazia e o ✗
- **MOSTRA:** `["placa_confeitaria", "dona", "bolo"]` → `["cliente", "celular_cliente", "placa_confeitaria"]`
- **CENÁRIO:** `rua_predios` de dia
- **ENTRA AGORA:** a etiqueta "Sem site" em "site"; o celular sobe do lado da cabeça do cliente em "cliente"; o ✗ em
  "nada"; congela em "nada" (o jogo faz)
- **OBJETOS SE MEXENDO:** o bolo tremendo na mão dela (a cereja balança); o celular rolando a busca vazia
- **PERSONAGEM:** (o Nico de costas ao fundo, ainda no celular) · a dona mostra o bolo pra rua, esperançosa · o cliente
  coça a cabeça em "não acha" (`coca_cabeca`) e encolhe os ombros (`ombros`)
- **INTERAÇÃO:** o cliente olha o celular, olha o bolo da dona, e vai embora
- **CÂMERA:** 2 cortes: `K.ombro` por cima do ombro do Nico olhando a placa (o "do lado") → `K.mirar` fixo a ~4 m, de
  frente, a dona com o bolo, a placa e o cliente com o celular no quadro
- **EFEITOS VISUAIS:** etiqueta vermelha "Sem site" · ✗ no celular · balão de pensamento do cliente "Cadê o site?" ·
  congela (o jogo)
- **SONS:** `pop` do celular · `erro` do ✗ · o congela

#### 4 · plano `rival` · ~4,5 s · jogo `corrige`
> "Quem viu foi outro web designer. Ela larga a perna do Nico e fecha com ele."

- **NA TELA:** de volta ao calçadão, a dona agarrada no pé do Nico; o `rival` de moletom vermelho chega olhando pra
  baixo, vê ela e estende a mão; ela solta o tornozelo do Nico, pula de pé e agarra o braço do rival; aperto de mão e o
  `contrato` com o carimbo FECHADO na frente da placa DOCE LUME; o Nico segue olhando o celular, sem ver
- **MOSTRA:** `["rival", "dona", "personagem"]` → `["rival", "dona", "contrato"]`
- **CENÁRIO:** `rua_predios` de dia, pedestres passando
- **ENTRA AGORA:** a cor volta (o corrige); etiqueta vermelha "Outro web designer" em "designer"; ela solta em "larga"; o
  carimbo em "fecha"
- **OBJETOS SE MEXENDO:** os jatos de lágrima param (viram coraçõezinhos, `K.coracoes`) quando ela agarra o rival; o
  contrato aparece entre os dois e o carimbo desce
- **PERSONAGEM:** o rival olha pra baixo, sorri e estende a mão · a dona pula de alegria (`comemorando`) · o Nico: de
  costas, no celular, sem perceber nada (a graça)
- **INTERAÇÃO:** o rival ajuda a dona a levantar; aperto de mão; ela pega o contrato
- **CÂMERA:** `K.seguir(rival, { lado: 'tras' })` chegando (x ~0,4, logo depois de uma árvore da direita) → `K.mirar`
  fixo a ~3 m, de frente, no aperto de mão, o Nico ao fundo de costas
- **EFEITOS VISUAIS:** etiqueta "Outro web designer" · coraçõezinhos · carimbo FECHADO vermelho · ✓ em cima da dona
- **SONS:** `passo` · `baque` do carimbo · `certo`

#### 5 · plano `olha` · ~4 s
> "Cliente que implora não fica esperando. Quem olha primeiro, leva."

- **NA TELA:** o Nico, sozinho no calçadão; ele finalmente olha pra baixo: a perna livre e a trilha de lágrima que sai
  do pé dele e vai até a porta da Doce Lume, onde o rival e a dona entram de braço dado; ele baixa o `celular` e olha pro
  lado, pras outras lojas do calçadão
- **MOSTRA:** `["personagem", "poca", "loja_confeitaria"]` → `["personagem", "celular"]`
- **CENÁRIO:** `rua_predios`; a porta da loja fechando com o sino
- **ENTRA AGORA:** em "implora", ele olha pra baixo (a trilha de lágrima brilha); em "olha", ele guarda o celular no bolso;
  etiqueta verde "Olhe pro lado" em "primeiro"
- **OBJETOS SE MEXENDO:** a trilha molhada brilhando do pé dele até a porta; o celular indo pro bolso
- **PERSONAGEM:** começo: olha pro pé, pra trilha e pra porta, chocado (`susto`) · em "olha": guarda o celular e põe a
  mão na testa (`mao_na_testa`), depois olha pros lados, decidido
- **INTERAÇÃO:** ele guarda o celular no bolso
- **CÂMERA:** (1) `K.drone` descendo do alto, a trilha molhada desenhando o caminho do pé dele até a porta · (2) chegando
  · perto · frente · no rosto dele (a ~2,5 m)
- **EFEITOS VISUAIS:** a trilha brilhando · etiqueta verde "Olhe pro lado" · ! em cima da cabeça (`K.simbolo`)
- **SONS:** sino da porta · `estalo` do ! · `whoosh`

#### 6 · plano `investe` · ~5 s
> "Então o Nico investe o preço de um bolo numa ferramenta que mostra quem precisa de site."

- **NA TELA:** o quarto; ele de pé do lado da mesa, com a `nota` do bolinho na mão; ela vira `moeda` e cai no
  computador; no `monitor`, o mapa com os pinos
- **MOSTRA:** `["personagem", "nota", "monitor"]`
- **CENÁRIO:** `home_office` de dia, a `cadeira` giratória no SEAT
- **ENTRA AGORA:** etiqueta "Investir" em "investe"; a nota em "bolo"; a moeda em "ferramenta"; os pinos em "precisa"
- **OBJETOS SE MEXENDO:** a nota gira e vira moeda, a moeda cai em arco na tela; os pinos pulam no mapa
- **PERSONAGEM:** `sim` com a cabeça em "investe" · vira pro computador e senta em "ferramenta"
- **INTERAÇÃO:** ele joga a moeda no computador
- **CÂMERA:** chegando · médio · esquerda ~20° · olho → subindo · médio · frente, na tela (lado até 30°, sem 'alto': o
  quarto tem teto)
- **EFEITOS VISUAIS:** etiqueta "Investir" · pinos no mapa
- **SONS:** `pingo` da moeda · `estalo` dos pinos

#### 7 · plano `lista` · ~5 s
> "No computador, digita mappoa.com, e vem a lista das confeitarias de São Luís sem site."

- **NA TELA:** o `navegador` com mappoa.com sendo digitado; a `tela` sobe com "Confeitarias · São Luís, MA", o grupo SEM
  SITE e os cartões (Bolo da Ilha, Doce Reviver, Ateliê Lençóis, Brigadeiro do Centro)
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_office`
- **ENTRA AGORA:** as letras do mappoa.com uma a uma em "digita"; a tela sobe em "lista"; o grupo SEM SITE em "site"
- **OBJETOS SE MEXENDO:** os cartões entrando de cima pra baixo
- **PERSONAGEM:** sentado, `digitando` · em "site": aponta pra tela, sorrindo
- **INTERAÇÃO:** ele digita; a lista responde
- **CÂMERA:** chegando · perto no teclado → afastando · médio · frente
- **EFEITOS VISUAIS:** etiqueta verde "Sem site"
- **SONS:** cliques · `brilho` · `bip`

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** o padrão do canal: a análise da Brigadeiro do Centro ("Aderência 90/100", "Sem site: encomenda só pelo
  WhatsApp", "Site com cardápio de bolos e pedido de encomenda"), o `robo` e o Nico comemorando
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** rótulo amarelo "Mappoa" em "Mappoa"; o score em "precisa"
- **OBJETOS SE MEXENDO:** o score enchendo até 90
- **PERSONAGEM:** `comemorando` · em "serviço": joia pro robô
- **INTERAÇÃO:** o robô aponta a análise e o Nico bate na mão dele
- **CÂMERA:** como no esperar-estatua (orbitando · médio · frente)
- **EFEITOS VISUAIS:** rótulo "Mappoa"
- **SONS:** `brilho` · `certo`

#### 9 · plano `antes_agora` · ~4,3 s · jogo `avanca`
> "Antes, o Nico passava reto. Agora, ele olha pro lado e chega primeiro."

- **NA TELA:** (1) "Antes": o gancho de outro ângulo, ele arrastando a dona chorando sem ver · (2) "Agora": na outra ponta
  do calçadão, numa placa de poste BRIGADEIRO DO CENTRO, ele mostra a `tela` com a análise pra dona de blazer chocolate,
  que faz joia; o `rival` chega correndo atrás, atrasado, e põe a mão na testa
- **MOSTRA:** `["personagem", "dona"]` → `["personagem", "rival"]`
- **CENÁRIO:** `rua_predios` nos dois (o "Antes" no meio do calçadão, o "Agora" na outra ponta)
- **ENTRA AGORA:** a troca em "Agora"; ✓ e etiqueta verde "Chegou primeiro" em "primeiro"
- **OBJETOS SE MEXENDO:** (1) os jatos de lágrima e a poeira · (2) a tela na mão dele com o score
- **PERSONAGEM:** (1) no celular, distraído · (2) em "olha", vira a cabeça pro lado e anda até a porta; estende a tela
  pra dona, sorrindo; aperto de mão em "primeiro"
- **INTERAÇÃO:** a dona olha a tela e faz joia; aperto de mão
- **CÂMERA:** (1) `K.heroi` de baixo, do lado direito (diferente do gancho), ele e a dona contra os prédios gigantes ·
  (2) `K.mirar` fixo a ~4 m, de frente, na porta
- **EFEITOS VISUAIS:** ✓ · etiqueta verde "Chegou primeiro" · etiqueta vermelha "Atrasado" no rival
- **SONS:** `whoosh` na troca · `certo`

#### 10 · plano `segue` · ~7 s
> "E você, já passou reto por um cliente? Comenta EU. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Nico de pé no calçadão, olhando pra câmera, o celular no bolso; do lado dele, a trilha de lágrima já
  secando no chão; a etiqueta grande "EU" em cima dele; depois o cartão de seguir, mappoa.com digitado e o robô acenando
- **MOSTRA:** `["personagem", "poca", "navegador"]`
- **CENÁRIO:** `rua_predios` de dia
- **ENTRA AGORA:** etiqueta "EU" em "EU"; o cartão de seguir em "computador" (só na tela, sem falar); as letras em
  "digita"
- **OBJETOS SE MEXENDO:** a trilha molhada secando (sumindo); o botão do cartão virando "Seguindo"
- **PERSONAGEM:** em "você": abre os braços pra câmera, perguntando · em "EU": levanta a mão, meio envergonhado (a mão na
  nuca) · aponta pro cartão quando ele aparece · acena no fim
- **INTERAÇÃO:** ele olha pra trilha no chão e dá risada de si mesmo; depois aperta o botão do cartão
- **CÂMERA:** chegando · médio · esquerda ~15° · olho, ele e a trilha → o padrão do canal no cartão
- **EFEITOS VISUAIS:** etiqueta "EU" · cartão de seguir
- **SONS:** `estalo` · cliques · `ding`

**Cauda** · plano `cartao` · 1,6 s: o cartão em "Seguindo", o Nico e o robô acenando.
