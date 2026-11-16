# Quem vende serviço pra empresa: roteiro e ficha de cena

> Vídeo de personagem (~70 s). Pra quem vende serviço B2B (gestor de tráfego, social media, web designer, consultor):
> a proposta que fala do serviço vai pro lixo; a que fala do problema da empresa é lida. E o problema quase sempre tá à
> mostra: são os sinais de compra. Gancho no estilo do canal (situação + "se você fizer X, acontece Y", conflito na tela
> no 1º segundo); depois o personagem ("Esse é o Caio..."). Fecha com "Antes... Agora...", a pergunta pros comentários e
> o fim no computador com mappoa.com.

## Roteiro

1. A dona da academia abriu sua proposta. Se a primeira linha é "faço tráfego", ela apaga. *(gancho)*
2. Esse é o Caio. Ele é gestor de tráfego e vende serviço pra empresa.
3. Ele é bom no que faz. Mas a agenda dele tá vazia faz dois meses.
4. Se você é o Caio, manda a mesma proposta pra cinquenta empresas: "Faço tráfego pago, preço bom."
5. Mas empresa não compra tráfego. Ela compra cliente entrando pela porta.
6. Então você troca o assunto: em vez do seu serviço, você fala do problema dela.
7. Mas qual problema? Cada empresa tem um, e ninguém te conta.
8. Então você olha o que ela deixa à mostra: o Instagram parado desde março, o site que não abre no celular, nenhum
   anúncio no ar.
9. Esses são os *sinais de compra*.
10. É por isso que a academia de fachada linda e Instagram parado é o melhor cliente do bairro: o problema tá na cara.
11. Mas fuçar empresa por empresa leva a tarde inteira, e você acha cinco.
12. Então você começa pela lista: no Mappoa, busca "academias em Londrina", e vêm centenas, com o site e o Instagram
    que estiverem públicos.
13. E a análise de cada uma mostra as dores, as oportunidades e por onde começar a conversa.
14. Aí você chama primeiro quem tem o problema que você resolve. Quem fecha ainda é você.
15. Antes, o Caio falava do serviço dele pra qualquer um. Agora, ele chega na empresa certa, falando da dor dela.
16. E você, vende qual serviço, e pra que tipo de empresa? Comenta aí. No computador, digita mappoa.com e testa você
    também.

~220 palavras, uns 68 a 75 segundos. 4 ciclos "Mas → Então", cada problema nascendo da solução anterior: manda a mesma
proposta pra todo mundo → empresa não compra o serviço, compra o resultado → fala do problema dela → mas qual problema? →
olha os sinais que ela deixa à mostra → fuçar uma por uma cansa e rende pouco → começa pela lista, já com a análise.

Temperos: quebra de mito (empresa não compra tráfego, compra cliente entrando pela porta), número concreto (cinquenta
propostas; a tarde inteira pra achar cinco), "é por isso que" (a academia de fachada linda e Instagram parado), humor
seco ("ninguém te conta"; a proposta indo pro lixo), comparação na tela (a fachada bonita x o celular parado).

## Conferido com o produto (`canal/produto.md`)

- O Mappoa aparece nas frases 12 e 13: buscar por segmento e cidade é o passo 1 dele; "centenas" bate com o produto;
  "o site e o Instagram que estiverem públicos": nem todo lead tem tudo. A frase 13 é a análise do lead completo (resumo
  do negócio, dores, oportunidades, sugestão de abordagem): o vídeo diz "as dores, as oportunidades e por onde começar a
  conversa", sem inventar recurso
- O vídeo não diz que o Mappoa manda mensagem, acompanha resposta ou fecha venda: "você chama" e "quem fecha ainda é
  você"
- Nada de preço, plano nem número de vendas. O "Antes/Agora" fala do jeito de abordar, não de resultado
- "Sinais de compra" é um nome que vendas usa de verdade (o que a empresa mostra que indica que ela precisa do serviço).
  Os três sinais do vídeo são coisas que qualquer um vê de fora: o último post do Instagram, o site no celular e a
  biblioteca de anúncios (pública). O vídeo não diz que o Mappoa mostra a data do último post nem os anúncios: isso a
  pessoa olha (frase 8); o Mappoa traz o site, o Instagram e a análise (frases 12 e 13)
- "Cinquenta propostas", "dois meses" e "acha cinco numa tarde" são o personagem, não estatística
- Nenhuma frase repetida dos vídeos do web designer, da cold call e do fornecedor: aqui o assunto é ler o problema da
  empresa antes de abordar (o do web designer era achar quem não tem site e a mensagem personalizada)

## Ficha de cena

**Cenário:** `cidade` (o padrão do canal), de dia, porque o cliente do Caio são as empresas de rua do bairro. No
calçadão, uma fileira de 3 lojinhas (a partir de x -21, longe dos vasos do calçadão; lição do web designer): a
**academia** ("Ponto Fit", fachada caprichada, a mais perto do centro), o **pet shop** ("Pet Amigo") e a **clínica**
("Sorriso"). Na outra ponta do calçadão (`C.direita`), a **mesa do Caio** com o computador. Peças do cenário que entram
nas frases: os carros e o ônibus passando (frase 5: pedestres atravessando na faixa pra entrar na academia), o banco da
calçada (frase 3: ele senta com a agenda vazia), a lixeira da calçada (frase 1 e 4: as propostas caindo nela), os
prédios do outro lado da rua (frase 15: as janelas das empresas certas acendendo em verde), a hora mudando de dia pra
tarde (frase 11). Foto: `referencias/cenarios/cidade.jpg`.
**Hora:** dia (vira tarde só na frase 11 e volta na 12). **Personagens:** o do canal (menino de camiseta azul), que no
vídeo se chama **Caio**; e **a dona da academia** (`K.boneco({ tipo: 'menina' })`), na porta da academia, com o celular
na mão (frases 1, 5, 10, 14 e 15).

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Caio | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | `C.personagem`; na mesa em `C.direita` | todas |
| `dona` | a dona da academia | `K.boneco({ tipo: 'menina' })` + `K.nomear` | ~1,4 de altura, vestido vermelho | na porta da academia | 1, 5, 10, 14, 15 |
| `academia` | a academia "Ponto Fit": fachada caprichada, placa grande, vitrine com halteres | `K.modelo('kenney-cidade/building-small-a')` (escala 5) + `K.placa('PONTO FIT')` + 2 halteres de `K.pecas` na vitrine + `K.nomear` | uns 4 de largura e 3,5 de altura; placa laranja com letra branca | calçadão, x -21 | 1, 5, 8, 9, 10, 14, 15 |
| `lojas` | as 3 lojas juntas (academia, pet shop "Pet Amigo" e clínica "Sorriso") | grupo das 3 fachadas (`building-small-a/b/c`, escala 5) + `K.placa` em cada + `K.nomear` | cada uma uns 4 × 3,5; placas laranja, azul e branca | calçadão, x -21, -26 e -31 | 4, 7, 11 |
| `computador` | a mesa com o computador do Caio | `K.computador()` + `K.nomear` (tela desenhada: a proposta, a busca, a barra com mappoa.com) | mesa de 1,15 de largura; tela 0,7 | `C.direita` | 2, 4, 12, 16 |
| `celular` | o celular da dona, com a proposta aberta e o dedo arrastando pra apagar | `K.celular()` + `K.nomear`, escala 3 | tela desenhada: e-mail "Faço tráfego pago..." e a lixeirinha | flutuando grande do lado dela | 1 |
| `proposta` | a folha da proposta igual ("Faço tráfego pago, preço bom.") e as cópias dela voando | `K.placa` (folha branca com o texto) + `K.nomear`; as cópias: 8 placas iguais menores | 0,8 × 1,1, branca com faixa azul | sai do computador | 4 (e volta pequena na 15) |
| `lixeira` | a lixeira da calçada, onde as propostas caem | `K.pecas`: tubo + tampa, verde-escuro | 0,9 de altura, raio 0,35, `#2f5f3a` | na frente da academia, à direita da porta | 1, 4 |
| `agenda` | a agenda aberta do Caio, as páginas em branco virando | `K.telaCanvas` num grupo + `K.nomear` | 1,4 × 1,0, capa azul, páginas brancas com "SEM REUNIÃO" | na mão dele, crescendo pra flutuar do lado | 3 |
| `clientes_porta` | 3 figurantes entrando pela porta da academia | `K.boneco` (menino e menina, cores variadas) + `K.semNome` em cada; o grupo com `K.nomear` | do tamanho do personagem | da faixa de pedestre até a porta | 5 |
| `balao_servico` | o balão de fala do Caio, que troca de "MEU SERVIÇO" pra "O SEU PROBLEMA" | `K.telaCanvas` num grupo + `K.nomear` | 1,6 × 0,7, branco; o texto azul vira laranja | em cima dele | 6 |
| `interrogacoes` | 3 pontos de interrogação gigantes, um em cima de cada loja | `K.placa('?')` (redondo, laranja) × 3 num grupo + `K.nomear` | 0,8 de altura cada | em cima das 3 lojas | 7 |
| `lupa` | a lupa grande na mão do Caio | `K.pecas`: anel (aro) + disco transparente + cilindro (cabo) | aro de raio 0,3, cabo marrom 0,4 | na mão direita dele | 8, 9 |
| `sinais` | os 3 sinais em cima da academia: o celular com "Último post: março", o site com "Não abre no celular" e o painel "0 anúncios no ar" | 3 cartões `K.telaCanvas` num grupo + `K.nomear` | cada um 0,9 × 1,1, branco com ícone vermelho | flutuando em leque acima da academia | 8, 9 (o 1º volta na 10) |
| `relogio` | o relógio de parede gigante, os ponteiros girando rápido | `K.pecas`: cilindro achatado (mostrador) + 2 caixas finas (ponteiros) | raio 0,7, branco com aro preto | flutuando acima do Caio | 11 |
| `lista` | o painel do Mappoa, com os cartões das academias enchendo (nome, ícone de site, Instagram e WhatsApp) | `K.telaCanvas` num grupo + `K.nomear` | 2,2 × 2,8, fundo branco com a barra na cor do canal `#2e9d5b` | em pé, acima do computador | entra na 12; volta na 16 |
| `analise` | o cartão da análise de uma academia: "Dores", "Oportunidades", "Comece por" | `K.telaCanvas` num grupo + `K.nomear` | 1,6 × 1,9, branco, títulos verdes do canal | sai da lista e vem pra frente | 13 |
| `pins` | marcadores verdes nos prédios do outro lado da rua (as empresas certas) | `K.pecas`: cone de ponta pra baixo + esfera, uns 6, num grupo + `K.nomear` | 0,5 de altura, verde do canal | em cima de alguns prédios do cenário | 15 |
| bits, seta, contador, ondas | efeitos | `K.bits`, `K.seta`, `K.contador`, `K.ondas` | | em volta das peças | 2, 4, 11, 12, 14 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| dona da academia | 1 | a `dona` na porta da `academia` |
| proposta | 1, 4 | o `celular` com o e-mail (1); a `proposta` saindo do computador (4) |
| "faço tráfego" (a primeira linha) | 1, 4 | a linha escrita no `celular` e na `proposta` |
| apaga | 1 | o dedo dela arrastando o e-mail pra lixeirinha; a proposta cai na `lixeira` |
| Caio, gestor de tráfego | 2 | o `personagem` + etiqueta "Caio · gestor de tráfego" |
| empresa | 2, 4, 7, 11 | as `lojas` |
| agenda vazia, dois meses | 3 | a `agenda` com as páginas em branco virando + "2 meses" |
| cinquenta empresas | 4 | as cópias da `proposta` voando + contador "50" |
| cliente entrando pela porta | 5 | os `clientes_porta` entrando na `academia` |
| tráfego (o que ela não compra) | 5 | etiqueta riscada "Tráfego" |
| assunto, serviço, problema | 6 | o `balao_servico` trocando de texto |
| problema, ninguém te conta | 7 | as `interrogacoes` em cima das lojas; a dona de braços cruzados (não aparece: fica dentro da loja) |
| Instagram parado, março | 8 | o 1º cartão de `sinais` |
| site que não abre no celular | 8 | o 2º cartão de `sinais` |
| anúncio no ar | 8 | o 3º cartão de `sinais` ("0 anúncios") |
| sinais de compra | 9 | os `sinais` brilhando + rótulo "Sinais de compra" |
| fachada linda, Instagram parado | 10 | a `academia` de fachada caprichada + o celular da dona com o feed parado |
| bairro | 10 | o calçadão inteiro, as lojas e os prédios do cenário |
| tarde inteira, cinco | 11 | o `relogio` girando, o céu virando tarde, contador "5" |
| lista, Mappoa | 12 | a `lista` subindo do `computador` |
| "academias em Londrina" | 12 | a busca digitada na tela do `computador` |
| centenas, site, Instagram | 12 | os cartões da `lista` + contador "300+", ícones em cada cartão |
| análise, dores, oportunidades, conversa | 13 | o cartão `analise` com os 3 títulos |
| chama primeiro | 14 | as ondas saindo do celular dele até a `dona` |
| antes / agora | 15 | as propostas cinza voando pra todo lado (antes); os `pins` verdes e a dona acenando (agora) |
| computador, mappoa.com | 16 | o `computador` com mappoa.com na barra de endereço, grande |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida, ninguém programa): o calçadão da cidade de dia; do outro lado da rua,
os prédios coloridos e os altos atrás; carros e o ônibus passando na rua; o semáforo trocando de cor; pedestres
andando.

#### 1 · plano `gancho` · ~5 s · jogo `falha`
> "A dona da academia abriu sua proposta. Se a primeira linha é 'faço tráfego', ela apaga."

- **NA TELA:** a dona da academia no centro, na porta da Ponto Fit, com o celular grande flutuando do lado dela (à
  direita, na altura do peito); na tela, o e-mail "Faço tráfego pago, preço bom"; a lixeira à direita da porta; a
  pergunta da capa no topo
- **MOSTRA:** `["dona", "celular"]`
- **CENÁRIO:** a fachada laranja da academia atrás dela, com os halteres na vitrine; a rua com um carro passando
- **ENTRA AGORA:** o celular, surgindo do lado dela (`surge`) já no começo; a folha da proposta, saindo do celular e
  caindo na lixeira na palavra "apaga"
- **OBJETOS SE MEXENDO:** a tela do celular rola até a 1ª linha (palavra "primeira"); a linha "Faço tráfego" acende em
  vermelho (palavra "tráfego"); o e-mail desliza pro lado e some (palavra "apaga"); a folha cai rodando dentro da lixeira
- **PERSONAGEM:** a dona (personagem desta cena), na porta, de frente pra câmera · começo: lendo o celular (`segurando`)
  · na palavra "tráfego": `bravo` (revira o olho) · na palavra "apaga": arrasta o dedo
- **INTERAÇÃO:** ela apaga a proposta com o dedo e a folha cai na lixeira
- **CÂMERA:** alvo `[dona, celular]`, os dois no centro, inteiros, uns 2/3 da altura · `revelando` (começa no celular e
  abre até a dona e a porta) · `medio` · um pouco pela direita (lado 20) · altura `olho` · topo livre pra pergunta
  (`espacoCima: 0.35`)
- **EFEITOS VISUAIS:** a pergunta da capa no topo (o motor põe) · ✗ vermelho em cima do celular (palavra "apaga") · no
  fim, congela em preto e branco (o jogo faz)
- **SONS:** `bip` do e-mail abrindo (começo) · `whoosh` do e-mail deslizando (palavra "apaga") · `tampa` da lixeira
  (a folha caindo) · o congela (o jogo põe)

#### 2 · plano `caio` · ~4 s · jogo `corrige`
> "Esse é o Caio. Ele é gestor de tráfego e vende serviço pra empresa."

- **NA TELA:** o Caio no centro, grande, do lado da mesa com o computador (à direita dele); na tela do computador, um
  gráfico de anúncio subindo (o trabalho dele); a etiqueta azul do lado dele
- **MOSTRA:** `["personagem", "computador"]`
- **CENÁRIO:** a outra ponta do calçadão, longe das lojas; atrás, a rua com o ônibus passando e os prédios do outro lado
- **ENTRA AGORA:** a etiqueta "Caio · gestor de tráfego" (palavra "Caio"); os bits saindo do computador em direção às
  lojas, lá longe (palavra "empresa")
- **OBJETOS SE MEXENDO:** o gráfico da tela sobe, barra por barra (a partir de "tráfego"); os bits correm do computador
  pra esquerda (palavra "empresa")
- **PERSONAGEM:** em `C.direita`, do lado da mesa, de frente pra câmera · começo: `mostrando` a tela, orgulhoso · na
  palavra "empresa": `apontar` pra esquerda, pras lojas
- **INTERAÇÃO:** ele mostra o gráfico na tela e aponta pras empresas lá longe
- **CÂMERA:** alvo `[personagem, computador]`, ele no centro, inteiro, metade da altura · `chegando` · `perto` · `frente`
  · altura `olho` (na frase 1: revelando, médio, pela direita)
- **EFEITOS VISUAIS:** etiqueta azul "Caio · gestor de tráfego" (palavra "Caio") · os bits verdes
- **SONS:** `ding` da etiqueta (o kit põe) · `zumbido` leve dos bits (palavra "empresa")

#### 3 · plano `agenda` · ~4 s · jogo `falha`
> "Ele é bom no que faz. Mas a agenda dele tá vazia faz dois meses."

- **NA TELA:** o Caio sentado no banco da calçada, no centro; a agenda aberta flutuando grande do lado esquerdo dele,
  as páginas em branco virando; o contador "2 meses" em cima
- **MOSTRA:** `["agenda", "personagem"]`
- **CENÁRIO:** o banco da calçada (`C.lugares.banco`); atrás, o ponto de ônibus e um carro passando
- **ENTRA AGORA:** a agenda, crescendo da mão dele (`cresce`) na palavra "agenda"; o contador "2 meses" (palavra
  "meses")
- **OBJETOS SE MEXENDO:** as páginas viram uma atrás da outra, todas em branco com "SEM REUNIÃO" (de "vazia" até o fim)
- **PERSONAGEM:** sentado no banco, de frente pra câmera · começo: `vitoria` curtinha (é bom no que faz) · na palavra
  "vazia": `triste`, ombros caem
- **INTERAÇÃO:** ele abre a agenda e ela mostra só página em branco
- **CÂMERA:** alvo `[agenda, personagem]`, a agenda no centro, ocupando metade da tela · `subindo` · `medio` ·
  `esquerda` · altura `baixo` (na frase 2: chegando, perto, de frente)
- **EFEITOS VISUAIS:** etiqueta verde "Bom no que faz" (palavra "bom") · contador vermelho "2 meses" (palavra "meses") ·
  congela em preto e branco (o jogo)
- **SONS:** `certo` na etiqueta verde · `madeira` das páginas virando (palavra "vazia") · `errado` no contador

#### 4 · plano `cinquenta` · ~5 s · jogo `falha`
> "Se você é o Caio, manda a mesma proposta pra cinquenta empresas: 'Faço tráfego pago, preço bom.'"

- **NA TELA:** a folha da proposta saindo do computador no centro e virando várias cópias, que voam em leque pra
  esquerda, até as lojas; o Caio na mesa, à direita do computador; o contador "50" em cima
- **MOSTRA:** `["proposta", "computador", "personagem"]`
- **CENÁRIO:** o calçadão de lado, as 3 lojas lá no fundo à esquerda; a lixeira na frente da academia
- **ENTRA AGORA:** a `proposta`, subindo da tela do computador (`sobe`) na palavra "proposta"; as cópias se multiplicando
  na palavra "cinquenta"
- **OBJETOS SE MEXENDO:** as 8 cópias voam do computador pras lojas em arco, uma depois da outra (de "cinquenta" até o
  fim); quando chegam, caem uma por uma na lixeira
- **PERSONAGEM:** na mesa, digitando (`segurando` na frente do teclado) · na palavra "cinquenta": aperta o botão
  (`empurrando`) e fica olhando as folhas irem embora, `surpreso` no fim
- **INTERAÇÃO:** ele dispara as propostas do computador e vê todas caírem na lixeira
- **CÂMERA:** alvo `[computador, proposta, personagem]`, o computador no centro · `passando` · `medio` · `perfil_direita`
  · altura `alto` (na frase 3: subindo, médio, pela esquerda e baixa)
- **EFEITOS VISUAIS:** contador azul "50" subindo de 1 a 50 (palavra "cinquenta") · a frase "Faço tráfego pago, preço
  bom" na folha · congela em preto e branco (o jogo)
- **SONS:** `whoosh` de cada cópia voando · `tampa` da lixeira várias vezes · `clique` do botão (palavra "cinquenta")

#### 5 · plano `porta` · ~4 s · jogo `corrige`
> "Mas empresa não compra tráfego. Ela compra cliente entrando pela porta."

- **NA TELA:** a porta da academia no centro; 3 clientes atravessando a faixa de pedestre e entrando, um atrás do
  outro; a dona na porta, recebendo; a etiqueta "Tráfego" riscada em cima
- **MOSTRA:** `["academia", "clientes_porta"]`
- **CENÁRIO:** a faixa de pedestre na frente, o semáforo fechado pros carros (o carro parado esperando)
- **ENTRA AGORA:** a etiqueta "Tráfego" com um ✗ (palavra "tráfego"); os 3 clientes, saindo da faixa (palavra "cliente")
- **OBJETOS SE MEXENDO:** os clientes andam da faixa até a porta, um a cada 0,4 s, e somem lá dentro; a porta acende
  (brilho) cada vez que um entra
- **PERSONAGEM:** o Caio aparece à direita, na beira do calçadão, de frente pra porta · começo: `duvida` · na palavra
  "porta": `ideia` (a lâmpada acende)
- **INTERAÇÃO:** a dona recebe os clientes na porta (`acenar`); o Caio entende vendo eles entrarem
- **CÂMERA:** alvo `[academia, clientes_porta]`, a porta no centro · `chegando` · `aberto` · `frente` · altura `olho`
  (na frase 4: passando, médio, de perfil e alto)
- **EFEITOS VISUAIS:** etiqueta vermelha "Tráfego" + ✗ do lado (palavra "tráfego") · etiqueta verde "Cliente na porta"
  + ✓ (palavra "porta")
- **SONS:** `errado` no ✗ · `passo` dos clientes · `ding` da porta a cada um · `certo` no ✓

#### 6 · plano `assunto` · ~4 s · jogo `corrige`
> "Então você troca o assunto: em vez do seu serviço, você fala do problema dela."

- **NA TELA:** o Caio no centro, de pé no calçadão; o balão de fala em cima dele, com "MEU SERVIÇO", que gira e vira
  "O SEU PROBLEMA"
- **MOSTRA:** `["balao_servico", "personagem"]`
- **CENÁRIO:** atrás dele, a academia de lado e os prédios do outro lado da rua; o ônibus passando
- **ENTRA AGORA:** o balão, surgindo em cima dele (palavra "assunto")
- **OBJETOS SE MEXENDO:** o balão dá meia-volta no ar e troca de lado (palavra "problema"): o azul "MEU SERVIÇO" vira o
  laranja "O SEU PROBLEMA"
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera · começo: `mostrando` (aponta pro próprio peito) · na palavra
  "problema": `chamando` (abre a mão pra frente, pra empresa)
- **INTERAÇÃO:** ele vira o balão com a mão, como quem vira uma placa
- **CÂMERA:** alvo `[balao_servico, personagem]` no centro · `girando` · `perto` · de `frente` pra `direita` · altura
  `olho` (na frase 5: chegando, aberto, de frente)
- **EFEITOS VISUAIS:** o balão girando · etiqueta laranja "Fale da dor dela" (palavra "dela")
- **SONS:** `whoosh` do balão girando (palavra "problema") · o da etiqueta

#### 7 · plano `qual` · ~4 s · jogo `falha`
> "Mas qual problema? Cada empresa tem um, e ninguém te conta."

- **NA TELA:** as 3 lojas lado a lado no centro, cada uma com um "?" laranja gigante em cima; o Caio na frente delas,
  pequeno, de costas pra gente olhando pra cima (só no começo) e depois virando pra câmera
- **MOSTRA:** `["lojas", "interrogacoes"]`
- **CENÁRIO:** o calçadão; atrás das lojas, os prédios altos; um pedestre passando
- **ENTRA AGORA:** os 3 "?" caindo em cima das lojas, um por loja (palavra "cada")
- **OBJETOS SE MEXENDO:** os "?" quicam e balançam devagar; as portas das 3 lojas se fecham na palavra "ninguém"
- **PERSONAGEM:** no calçadão, na frente da academia · começo: `pensando` · na palavra "ninguém": vira pra câmera,
  `duvida` com as mãos abertas
- **INTERAÇÃO:** ele olha de um "?" pro outro, e as portas fecham na cara dele
- **CÂMERA:** alvo `[lojas, interrogacoes]`, as 3 lojas inteiras no centro · `afastando` · `aberto` · `esquerda` · altura
  `alto` (na frase 6: girando, perto, de frente)
- **EFEITOS VISUAIS:** os "?" laranja · etiqueta vermelha "Ninguém te conta" (palavra "ninguém") · congela (o jogo)
- **SONS:** `bip` pra cada "?" · `madeira` das portas fechando (palavra "ninguém")

#### 8 · plano `lupa` · ~6 s · jogo `corrige`
> "Então você olha o que ela deixa à mostra: o Instagram parado desde março, o site que não abre no celular, nenhum
> anúncio no ar."

- **NA TELA:** a fachada da academia no centro; o Caio na frente, segurando a lupa; em cima da academia, os 3 cartões
  de sinal aparecendo em leque, um de cada vez
- **MOSTRA:** `["sinais", "academia", "personagem"]`
- **CENÁRIO:** a academia de frente, com os halteres na vitrine; a rua atrás da câmera (carros passando no reflexo)
- **ENTRA AGORA:** a lupa na mão dele (`surge`, começo); o cartão "Último post: março" (palavra "Instagram"); o cartão
  "Não abre no celular" (palavra "site"); o cartão "0 anúncios no ar" (palavra "anúncio")
- **OBJETOS SE MEXENDO:** cada cartão desliza de dentro da fachada pra cima (`desliza`); a lupa passa de um ponto da
  fachada pro outro, acompanhando os cartões
- **PERSONAGEM:** na frente da academia, de 3/4 pra câmera · começo: `segurando` a lupa, encostando na fachada · a cada
  cartão, aponta pra ele (`apontar`, palavra "site") · no fim, `surpreso`
- **INTERAÇÃO:** a lupa dele "puxa" cada sinal de dentro da fachada
- **CÂMERA:** alvo `[sinais, academia, personagem]`, os cartões no centro · `subindo` (dos pés dele até os cartões) ·
  `medio` · `perfil_esquerda` · altura `olho` (na frase 7: afastando, aberto, pela esquerda e alto)
- **EFEITOS VISUAIS:** os 3 cartões com ícone vermelho (cada um na sua palavra) · nada mais (já são 3 coisas)
- **SONS:** `zap` a cada cartão (palavras "Instagram", "site" e "anúncio")

#### 9 · plano `sinais_rotulo` · ~2 s
> "Esses são os *sinais de compra*."

- **NA TELA:** só os 3 cartões de sinal, grandes, brilhando em amarelo no centro; o rótulo "SINAIS DE COMPRA"
  embaixo deles; a ponta da lupa na beira
- **MOSTRA:** `["sinais"]`
- **CENÁRIO:** o topo da fachada laranja da academia atrás, desfocado; o céu azul
- **ENTRA AGORA:** o rótulo "Sinais de compra" (palavra "sinais")
- **OBJETOS SE MEXENDO:** os 3 cartões giram devagar e brilham (`K.brilhar`)
- **PERSONAGEM:** na beira de baixo, só a cabeça e a lupa erguida · `erguendo` a lupa (frase curta: uma ação)
- **INTERAÇÃO:** ele ergue a lupa e os cartões brilham
- **CÂMERA:** alvo `sinais`, no centro, 2/3 da tela · `girando` · `perto` · `frente` · altura `baixo` (na frase 8:
  subindo, médio, de perfil)
- **EFEITOS VISUAIS:** rótulo amarelo "SINAIS DE COMPRA" (palavra "sinais") · o brilho amarelo
- **SONS:** `brilho` (o rótulo põe)

#### 10 · plano `fachada` · ~6 s
> "É por isso que a academia de fachada linda e Instagram parado é o melhor cliente do bairro: o problema tá na cara."

- **NA TELA:** a academia inteira, bonita, no centro; a dona na porta com o celular na mão; o 1º cartão de sinal
  ("Último post: março") voltando e ficando ao lado dela; o Caio entrando pela direita
- **MOSTRA:** `["academia", "dona", "sinais"]`
- **CENÁRIO:** o bairro: o calçadão inteiro, o pet shop e a clínica do lado, a rua com o ônibus passando, os prédios do
  outro lado (a vida real do bairro)
- **ENTRA AGORA:** a placa da academia acende com brilho (palavra "linda"); o cartão do Instagram volta pro lado da dona
  (palavra "Instagram")
- **OBJETOS SE MEXENDO:** a placa "PONTO FIT" pisca de brilho; um carro passa na frente
- **PERSONAGEM:** o Caio anda da direita até perto da dona (1ª metade) · na palavra "cara": `apontar` pro cartão, com um
  sorriso (`ideia`); a dona coça a cabeça (`duvida`)
- **INTERAÇÃO:** ele aponta o cartão do Instagram parado do lado da fachada linda
- **CÂMERA:** alvo `[academia, dona, sinais]`, a fachada no centro · `revelando` · `aberto` · `direita` · altura `olho`
  (na frase 9: girando, perto, de baixo)
- **EFEITOS VISUAIS:** etiqueta verde "Fachada linda" (palavra "linda") · etiqueta vermelha "Instagram parado" (palavra
  "parado") · as duas lado a lado
- **SONS:** `brilho` na placa · o das etiquetas · `ding` na palavra "cara"

#### 11 · plano `tarde` · ~4 s · jogo `falha`
> "Mas fuçar empresa por empresa leva a tarde inteira, e você acha cinco."

- **NA TELA:** o Caio no centro, andando de loja em loja com a lupa, cansado; o relógio gigante flutuando em cima dele,
  os ponteiros girando rápido; o céu ficando laranja; o contador "5" no fim
- **MOSTRA:** `["relogio", "personagem", "lojas"]`
- **CENÁRIO:** as 3 lojas atrás dele; o céu virando tarde (`K.ceu('dia', 'tarde', x)`); as sombras crescendo
- **ENTRA AGORA:** o relógio, caindo em cima dele (palavra "fuçar"); o contador "5" (palavra "cinco")
- **OBJETOS SE MEXENDO:** os ponteiros dão 4 voltas rápidas; o céu muda de azul pra laranja (de "tarde" até o fim)
- **PERSONAGEM:** anda da academia até a clínica (1ª metade) · na palavra "cinco": `cansado`, suando (`suar`)
- **INTERAÇÃO:** ele passa a lupa em cada loja e o relógio corre em cima da cabeça dele
- **CÂMERA:** alvo `[relogio, personagem]`, no centro · `passando` (acompanha ele) · `medio` · `perfil_direita` · altura
  `alto` (na frase 10: revelando, aberto, pela direita)
- **EFEITOS VISUAIS:** o contador vermelho "5" com a legenda "empresas" (palavra "cinco") · congela (o jogo)
- **SONS:** `range` do relógio girando · `passo` · `errado` no contador

#### 12 · plano `lista` · ~6 s · jogo `corrige`
> "Então você começa pela lista: no Mappoa, busca 'academias em Londrina', e vêm centenas, com o site e o Instagram
> que estiverem públicos."

- **NA TELA:** o computador no centro, na mesa; na tela, a busca "academias em Londrina" sendo digitada; o painel do
  Mappoa subindo de trás da tela e enchendo de cartões; o Caio à direita, digitando; o contador "300+" no topo
- **MOSTRA:** `["lista", "computador", "personagem"]`
- **CENÁRIO:** de volta à mesa dele, de dia de novo (o céu volta); a rua e os prédios atrás
- **ENTRA AGORA:** a `lista`, subindo da tela (`sobe`) na palavra "Mappoa"; os cartões entrando um a um (palavra
  "centenas")
- **OBJETOS SE MEXENDO:** a busca é digitada letra por letra (de "busca" a "Londrina"); os cartões descem rolando na
  lista; os ícones de site e Instagram acendem em cada cartão (palavra "site")
- **PERSONAGEM:** na mesa, de 3/4 · começo: digitando (`segurando`) · na palavra "centenas": `surpreso`, se afasta da
  tela
- **INTERAÇÃO:** ele digita a busca e a lista enche na frente dele
- **CÂMERA:** alvo `[lista, computador]`, a lista no centro, 2/3 da altura · `subindo` (do teclado até o topo da lista) ·
  `medio` · `frente` · altura `olho` (na frase 11: passando, médio, de perfil e alto)
- **EFEITOS VISUAIS:** contador verde "300+" (palavra "centenas") · os ícones de site e Instagram em cada cartão
- **SONS:** `clique` das teclas · `whoosh` da lista subindo · `bip` a cada cartão

#### 13 · plano `analise` · ~5 s
> "E a análise de cada uma mostra as dores, as oportunidades e por onde começar a conversa."

- **NA TELA:** o cartão da análise grande no centro, saído da lista: o nome "Ponto Fit" em cima e os 3 blocos aparecendo
  um por vez ("Dores: Instagram parado", "Oportunidades: anúncio local", "Comece por: o post de março"); o Caio à
  esquerda, embaixo, lendo
- **MOSTRA:** `["analise", "personagem"]`
- **CENÁRIO:** a lista desfocada atrás do cartão; a rua atrás
- **ENTRA AGORA:** o cartão `analise`, deslizando pra frente da lista (`desliza`, palavra "análise"); cada bloco
  acendendo na sua palavra ("dores", "oportunidades", "conversa")
- **OBJETOS SE MEXENDO:** o cartão vem da lista pra frente e cresce; os 3 blocos entram de cima pra baixo
- **PERSONAGEM:** à esquerda do cartão · começo: `pensando` (lendo) · na palavra "conversa": `ideia`
- **INTERAÇÃO:** ele lê o cartão e marca com o dedo o bloco "Comece por"
- **CÂMERA:** alvo `analise`, no centro, ocupando 2/3 · `chegando` · `perto` · `esquerda` · altura `olho` (na frase 12:
  subindo, médio, de frente)
- **EFEITOS VISUAIS:** os 3 blocos com ponto verde (cada um na sua palavra) · ✓ verde do lado do "Comece por" (palavra
  "conversa")
- **SONS:** `bip` pra cada bloco · `certo` no ✓

#### 14 · plano `chama` · ~4 s · jogo `corrige`
> "Aí você chama primeiro quem tem o problema que você resolve. Quem fecha ainda é você."

- **NA TELA:** o Caio à direita com o celular na mão; ondas saindo do celular dele e cruzando o calçadão até a dona, na
  porta da academia, à esquerda; ela olhando o celular dela e sorrindo
- **MOSTRA:** `["personagem", "dona", "academia"]`
- **CENÁRIO:** o calçadão de ponta a ponta; o semáforo e um carro passando entre os dois
- **ENTRA AGORA:** as ondas, saindo do celular dele (palavra "chama"); a etiqueta "Quem fecha é você" (palavra "fecha")
- **OBJETOS SE MEXENDO:** as ondas atravessam da direita pra esquerda; o celular dela acende
- **PERSONAGEM:** o Caio, de pé, de perfil pra dona · começo: `chamando` · na palavra "fecha": `vitoria` (punho fechado)
- **INTERAÇÃO:** a mensagem dele chega no celular dela, que sorri e acena de volta
- **CÂMERA:** alvo `[personagem, dona]` · `passando` (de um pro outro) · `aberto` · `tras` meio de lado (lado 160, por
  trás do Caio, olhando a dona) · altura `olho` (na frase 13: chegando, perto, pela esquerda)
- **EFEITOS VISUAIS:** as ondas verdes · etiqueta verde "Quem fecha é você" (palavra "fecha")
- **SONS:** `ondas` (palavra "chama") · `ding` no celular dela · o da etiqueta

#### 15 · plano `antes_agora` · ~6 s
> "Antes, o Caio falava do serviço dele pra qualquer um. Agora, ele chega na empresa certa, falando da dor dela."

- **NA TELA:** 1ª metade ("Antes"): o Caio no meio do calçadão, jogando folhas de proposta cinza pra todo lado, que
  caem no chão; 2ª metade ("Agora"): os pins verdes brotando nos prédios do outro lado da rua e na academia; ele andando
  direto até a dona, que aperta a mão dele
- **MOSTRA:** `["personagem", "pins", "dona"]`
- **CENÁRIO:** a rua inteira vista de cima: o calçadão, as lojas, a faixa, os prédios do outro lado
- **ENTRA AGORA:** as propostas cinza (palavra "Antes"); os pins, caindo um a um em cima dos prédios (palavra "Agora")
- **OBJETOS SE MEXENDO:** as folhas voam e caem; depois os pins caem quicando; ele anda até a dona
- **PERSONAGEM:** 1ª metade: `empurrando` (jogando as folhas), cara `cansado` · na palavra "Agora": anda até a dona e
  `comemorar` curtinho
- **INTERAÇÃO:** antes, ele joga papel pra todo lado; agora, vai direto na dona e ela aperta a mão dele (`acenar`)
- **CÂMERA:** alvo `[personagem, dona, pins]` · `mergulho` (de cima, descendo até o calçadão) · `aberto` · `direita` ·
  altura `cima` → `alto` (na frase 14: passando, aberto, por trás)
- **EFEITOS VISUAIS:** etiqueta cinza "Antes: pra qualquer um" (palavra "Antes") · etiqueta verde "Agora: a dor certa"
  (palavra "Agora") · confete pequeno no aperto de mão
- **SONS:** `whoosh` das folhas · `baque` dos pins caindo · `festa` curta no aperto de mão

#### 16 · plano `segue` · ~6 s
> "E você, vende qual serviço, e pra que tipo de empresa? Comenta aí. No computador, digita mappoa.com e testa você
> também."

- **NA TELA:** 1ª metade: o Caio no centro, virado pra câmera, perguntando, com um balão de comentário ("💬") do lado;
  2ª metade: o computador no centro, a barra do navegador com "mappoa.com" sendo digitado, grande e legível; a lista do
  Mappoa atrás; o cartão de seguir no topo
- **MOSTRA:** `["computador", "personagem"]`
- **CENÁRIO:** a mesa no calçadão, de dia; a rua atrás
- **ENTRA AGORA:** o balão de comentário (palavra "Comenta"); "mappoa.com" digitado letra por letra na barra (palavra
  "mappoa"); o cartão de seguir no topo (o kit põe)
- **OBJETOS SE MEXENDO:** a barra do navegador cresce na tela do computador; as letras entram uma a uma
- **PERSONAGEM:** começo: `chamando` (fala com a câmera) · na palavra "computador": senta na mesa e digita (`segurando`)
  · no fim, aponta pro endereço (`apontar`)
- **INTERAÇÃO:** ele digita mappoa.com no computador
- **CÂMERA:** alvo `[personagem]` → `[computador]` · `parado` respirando, `aberto` · `frente` · altura `olho` · topo livre
  pro cartão (`espacoCima: 0.4`) (na frase 15: mergulho, aberto, de cima)
- **EFEITOS VISUAIS:** o balão de comentário · "mappoa.com" grande na tela · o cartão de seguir no topo
- **SONS:** `bip` do balão · `clique` das teclas · o clique do "Seguir" (o kit põe)

**Cauda (`cartao`, 1,6 s):** o cartão de seguir fica no topo, o Caio aponta pra ele e acena; o computador com
mappoa.com continua na tela.

## Em palavras simples (cena por cena)

1. A dona da academia abre a proposta no celular, lê "Faço tráfego" e arrasta pro lixo; a folha cai na lixeira da rua. /
   Ela revira o olho; a câmera começa no celular e abre até ela na porta.
2. O Caio na mesa dele, com um gráfico de anúncio subindo no computador. / Ele mostra a tela, orgulhoso, e aponta pras
   lojas lá longe; a câmera chega perto, de frente.
3. Sentado no banco, ele abre a agenda e só tem página em branco: "2 meses". / Ele murcha; a câmera sobe de baixo, pelo
   lado esquerdo.
4. Uma folha de proposta sai do computador e vira cinquenta, que voam até as lojas e caem na lixeira. / Ele aperta o botão
   e fica olhando; a câmera passa de lado, do alto.
5. Três clientes atravessam a faixa e entram na academia; "Tráfego" com ✗, "Cliente na porta" com ✓. / Ele tem a ideia;
   a câmera chega aberta, de frente pra porta.
6. Um balão em cima dele gira e troca de "MEU SERVIÇO" pra "O SEU PROBLEMA". / Ele vira o balão com a mão; a câmera
   gira em volta, pertinho.
7. Um "?" gigante cai em cima de cada loja e as portas fecham. / Ele abre as mãos sem saber; a câmera se afasta, do alto.
8. Com uma lupa, ele puxa de dentro da academia 3 cartões: "Último post: março", "Não abre no celular", "0 anúncios". /
   Ele aponta cada um; a câmera sobe dos pés dele até os cartões, de perfil.
9. Os 3 cartões brilham, com o nome "SINAIS DE COMPRA". / Ele ergue a lupa; a câmera gira, de baixo.
10. A academia linda, com a placa brilhando, e do lado o cartão "Instagram parado". / Ele chega e aponta, a dona coça a
    cabeça; a câmera revela o bairro todo.
11. Ele anda de loja em loja com a lupa, um relógio gigante gira em cima dele e o céu fica laranja: "5 empresas". / Ele
    sua de cansaço; a câmera acompanha de lado, do alto.
12. No computador, ele busca "academias em Londrina" e o painel do Mappoa sobe enchendo de empresas: "300+". / Ele se
    espanta; a câmera sobe do teclado até o topo da lista.
13. Sai da lista o cartão da análise da Ponto Fit: dores, oportunidades e por onde começar. / Ele lê e tem a ideia; a
    câmera chega perto, pela esquerda.
14. Ondas saem do celular dele e chegam no da dona, que sorri. "Quem fecha é você". / Ele comemora; a câmera passa por
    trás dele, olhando a dona.
15. Antes: ele jogando folhas cinza pra todo lado. Agora: pins verdes brotam nos prédios e ele aperta a mão da dona. / A
    câmera desce do alto até o calçadão.
16. Ele pergunta pra câmera e depois digita mappoa.com no computador, bem grande; o cartão de seguir aparece. / A câmera
    fica de frente, respirando.
