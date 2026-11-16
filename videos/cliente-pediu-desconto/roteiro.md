# Você mandou o orçamento do site. Se o cliente pediu desconto, ele não era o seu cliente: roteiro e ficha de cena

> Versão nova do tema que foi bem (`cliente-ideal`: escolher pra quem vender), com outra roupa e falando com o web
> designer. Feita em cima da retenção dos dois vídeos que funcionaram (11/11/2026): gancho com ação na tela no 1º
> segundo, o personagem já dentro da ação (sem "Esse é o ..."), mais tempo na dor e na virada, o Mappoa curto e
> começando pelo resultado, 45 a 60 s.

## Roteiro

1. Você mandou o orçamento do site. Se o cliente pediu desconto, ele não era o seu cliente. *(gancho, a frase do dono)*
2. O Igor é web designer, e toda proposta volta igual: "faz mais barato?"
3. Ele baixa o preço, entrega, e ainda vem mudança de graça.
4. Mas o problema não é o preço. Pra quem pede desconto, site é gasto.
5. Pensa no pet shop sem site: o cliente procura e acha o concorrente.
6. Ou no que tem site em construção: o cliente entra e sai.
7. Esses já têm motivo pra pagar. Você não vende site: resolve o problema deles.
8. Mas achar um por um leva a tarde inteira.
9. Então você usa o *Mappoa*, um site que acha empresas: pet shops em Uberlândia, separados com site e sem site.
10. E analisa cada um: score de aderência, dores, oportunidades, objeções e a mensagem pronta.
11. Você só revisa e envia. Antes, o Igor brigava por desconto. Agora, chega em quem precisa dele.
12. Desconto é culpa do cliente ou de quem escolheu ele? Comenta aí e segue pro próximo nicho. No computador, digita mappoa.com e testa você também.

Cerca de 175 palavras, uns 55 a 60 segundos, 12 frases (uns 1.050 caracteres da ElevenLabs; sobram 3.852).

**Onde o tempo vai:** gancho e dor (1 a 3) uns 15 s · a virada (4 a 7) uns 16 s · a busca na mão (8) 3 s · o Mappoa
(9 e 10) uns 11 s, já começando pela lista pronta · o fim (11 e 12) uns 14 s.

**Gancho escolhido:** A, a frase do dono (é o pedido, e vira título e capa). Opções:
- **A:** "Você mandou o orçamento do site. Se o cliente pediu desconto, ele não era o seu cliente." (na tela, no 1º
  quadro: a mensagem "faz mais barato?" chegando no celular e a placa do orçamento encolhendo)
- **B:** "Chegou 'faz mais barato?'. Se você der o desconto, vai trabalhar de graça." (mais curto, mais seco)
- **C:** "O cliente pediu desconto. Se você aceitar, escolheu o cliente errado."

**Capa:** "Pediu *desconto*?" (17 letras, cabe numa linha), com o Igor de boca aberta e o celular gigante com
"faz mais barato?".

## O que foi conferido

- Sem preço em reais: o orçamento é uma placa escrita "ORÇAMENTO", que encolhe e vira "DESCONTO". Nenhum número de
  vendas, de clientes, de tempo ou de empresas encontradas é falado. A lista do Mappoa sai sem a contagem do topo (a
  busca é outra, não é a captura de verdade de 99)
- O score aparece na tela como "91/100", na análise de um pet shop inventado (o score de 0 a 100 existe na análise
  completa, `canal/produto.md`). É desenho da tela, não promessa: a narração não fala número
- A lista separa sozinha com site e sem site (`canal/produto.md`, captura). A análise completa tem score de aderência,
  dores, oportunidades, objeções e a mensagem pronta: é o pacote que o dono pediu pra mostrar (11/11/2026). As pílulas
  da tela resumem o que a análise escreveria pra quem faz site (presença digital fraca, site em construção), sem
  parecer um botão "site ruim"
- O Mappoa não envia: "Você só revisa e envia" (frase 11)
- O fim não promete venda: "chega em quem precisa dele"
- O Mappoa é apresentado pelo que faz na mesma frase do nome ("um site que acha empresas"; depois o dono pediu "sistema", nunca "site", a partir dos próximos vídeos, 11/11/2026), e a tela já mostra a lista
  pronta quando a frase começa
- Sem "Esse é o Igor": o Igor aparece já recebendo a mensagem no gancho e é nomeado dentro da ação (frase 2)
- Empresas inventadas: Bicho Feliz (sem site), Pet Amigo (site em construção), Pet Center (o concorrente) e os outros
  pet shops da lista
- Nenhuma frase repete o `cliente-ideal` nem o `site-desatualizado`

## Ficha de cena

**Cenários (seis, com `K.cenarios`):** `home_office` (1, 2, 3, 11 e 12: o quarto do Igor, de dia), `home_noite` (8: o
mesmo quarto de noite), `sala_reuniao` (4: a reunião com o cliente do desconto), `cidade` (5, 6 e 7: a calçada com os
dois pet shops), `central_mappoa` (9: a lista) e `mundo_mappoa` (10: a análise). **Hora:** dia, menos na 8.
**Personagens:** o do canal, chamado Igor (presente em todas as frases). O **cliente do desconto** (`K.boneco` de moletom
cinza, `K.semNome`) na 4 e no "Antes" da 11. Dois **clientes da rua** (`K.boneco` de moletom, cores diferentes,
`K.semNome`) na 5 e na 6. O **cachorro** (`K.cachorro()`) na porta do Bicho Feliz, na 5 e na 7. **O robô do Mappoa** só
da 9 em diante.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Igor | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 12 |
| `celular` | celular grande com a conversa do WhatsApp (orçamento enviado ✓✓, "faz mais barato?") | `K.celular()` + tela desenhada | escala 2,4 | no ar, na frente do Igor | 1, 2, 11 e capa |
| `orcamento` | placa verde "ORÇAMENTO" que encolhe e vira a vermelha "DESCONTO" | `K.placa` × 2 | 1,3 × 0,55 | ao lado do celular / do monitor | 1, 3 |
| `monitor` | o computador do Igor, com o portfólio ou o site entregue | `K.computador` com tela desenhada | escala 1,55 | mesa do home office | 2, 3, 8, 11, 12 |
| `mudancas` | três bilhetes amarelos "Muda a cor", "Mais uma página", "Troca a foto" | `K.placa` × 3 | 1,0 × 0,4 | em volta do monitor | 3 |
| `cliente` | o cliente do desconto | `K.boneco` moletom cinza | 1,47 | do outro lado da mesa da sala | 4, 11 |
| `preco` | placa vermelha "PREÇO" que tomba | `K.placa` | 1,1 × 0,5 | em cima da mesa da sala | 4 |
| `pet_sem` | o pet shop Bicho Feliz, sem site, com a placa "Sem site" | prédio do pacote `kenney-cidade` + toldo + `K.placa` | prédio 5 × | calçada, à esquerda | 5, 7 |
| `pet_ruim` | o pet shop Pet Amigo, com o site em construção | prédio `kenney-cidade` + toldo + `K.placa` | prédio 5 × | calçada, à direita | 6, 7 |
| `cachorro` | vira-lata caramelo na porta do Bicho Feliz | `K.cachorro()` | escala 1 | porta do Bicho Feliz | 5, 7 |
| `rua1` | cliente da rua com o celular da busca | `K.boneco` moletom verde | 1,47 | calçada | 5 |
| `rua2` | cliente da rua com o celular do site velho | `K.boneco` moletom roxo | 1,47 | calçada | 6 |
| `cel_rua` | o celular grande da rua (a busca, depois o site em construção) | `K.celular()` + tela desenhada | escala 2,3 | na mão de quem está na rua | 5, 6 |
| `prancheta` | prancheta com checklist na mão do Igor | `K.m3d('lista_check')` | 1,2 | mão do Igor | 7 |
| `relogio` | relógio com os ponteiros correndo | `K.m3d('relogio_parede')` | 2,1 | parede do home office | 8 |
| `lupa` | lupa grande | `K.m3d('lupa')` | 1,1 | na mão do Igor / do robô | 8, 10 |
| `tela` | painel com as telas do Mappoa (lista, análise, mensagem) | `K.painelMappoa` | 1,56 × 2,6 | muda por frase | 9, 10, 11 |
| `mensagem` | segundo painel, com a mensagem pronta | `K.painelMappoa` | 1,2 × 2,0 | ao lado da análise | 10 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central, palco, home office | 9, 10, 12 |
| `balao` | balão verde de mensagem | `K.m3d('balao_chat')` | 0,95 | sobe da tela | 11 |
| `funil` | o quadro de campanha com os pet shops | `K.painelMappoa` largo, tela `funil` | 3 × 1,87 | parede do home office | 11 |
| `navegador` | barra grande com mappoa.com | `K.painelMappoa` | 2,5 × 0,42 | acima do computador | 12 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| orçamento, site | 1 | a bolha verde "Orçamento: site completo" no `celular` e a placa `orcamento` |
| cliente, desconto | 1 | a bolha "faz mais barato?" chegando; a placa vira "DESCONTO" |
| web designer, proposta | 2 | `monitor` com o portfólio; o `celular` enchendo de pedidos de desconto |
| preço, entrega, mudança, de graça | 3 | `orcamento` encolhendo; o monitor com "Site entregue ✓"; os bilhetes `mudancas`; etiqueta "De graça" |
| problema, preço | 4 | a placa `preco` tombando com ✗ |
| quem pede desconto, gasto | 4 | o `cliente` de braço cruzado; etiqueta vermelha "Site é gasto" |
| pet shop sem site, cliente, concorrente | 5 | `pet_sem` com "Sem site"; `rua1` buscando no `cel_rua` e indo embora; etiqueta "Achou o concorrente" |
| site em construção, cliente | 6 | `pet_ruim`; `rua2` com o `cel_rua` piscando "SITE EM CONSTRUÇÃO" e saindo |
| motivo pra pagar, problema | 7 | ✓ nos dois pet shops; o Igor com a `prancheta` |
| tarde inteira | 8 | `relogio` girando, a janela escurecendo, o Igor com a `lupa` no `monitor` |
| Mappoa, site, pet shops, Uberlândia, com/sem site | 9 | rótulo "Mappoa"; a `tela` de lista "Pet shops · Uberlândia, MG", grupos COM SITE e SEM SITE; o `robo` |
| score, dores, oportunidades, objeções, mensagem | 10 | a `tela` de análise enchendo bloco por bloco, "91/100"; a `mensagem` deslizando |
| revisa, envia | 11 | a `tela` de mensagem; o Igor aperta "Enviar pelo WhatsApp"; o `balao` |
| desconto (antes), quem precisa (agora) | 11 | o `celular` com "faz mais barato?" em P&B → o `funil` com os pet shops |
| computador, mappoa.com | 12 | `monitor` e `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~5 s
> "Você mandou o orçamento do site. Se o cliente pediu desconto, ele não era o seu cliente."

- **NA TELA:** no home office, o `celular` gigante no centro, de pé no ar, virado pra câmera, com a conversa: a bolha verde "Orçamento: site completo ✓✓" já enviada; à direita dele, a placa verde `orcamento`; o Igor logo atrás, à esquerda, olhando o celular
- **MOSTRA:** `["celular", "orcamento", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a janela com a cidade, o ring light, a estante
- **ENTRA AGORA:** a conversa já está no celular no 1º quadro; a bolha branca "faz mais barato?" sobe de baixo na tela do celular na palavra "desconto", com o celular vibrando
- **OBJETOS SE MEXENDO:** o celular vibra (treme rápido) na palavra "desconto"; a placa `orcamento` encolhe pela metade e desce a partir de "desconto" e troca pela vermelha "DESCONTO" na palavra "não"
- **PERSONAGEM:** atrás do celular, à esquerda · começo: `segurando` (estica a mão pro celular, satisfeito) · na palavra "desconto": `susto`
- **INTERAÇÃO:** a mensagem que chega assusta o Igor, e o preço encolhe na frente dele
- **CÂMERA:** alvo `[celular, orcamento, personagem]`, centro, celular ocupando 1/2 da altura · `chegando` · médio · frente · olho, topo livre (espacoCima 0,3) · começa já com a conversa legível
- **EFEITOS VISUAIS:** a capa no topo ("Pediu *desconto*?", o motor põe) · ✗ vermelho ao lado da placa na palavra "não"
- **SONS:** `bip` da notificação (palavra "desconto") · `zumbido` da vibração · `desliga` da placa encolhendo · `errado` (palavra "não")

#### 2 · plano `igor` · ~4 s
> "O Igor é web designer, e toda proposta volta igual: 'faz mais barato?'"

- **NA TELA:** o Igor no centro, na frente da mesa, com o `celular` na mão (menor, escala 1,6), e o `monitor` atrás com o portfólio bonito; no celular, as bolhas brancas empilhando
- **MOSTRA:** `["personagem", "monitor"]`
- **CENÁRIO:** `home_office` de dia; o ring light e a planta
- **ENTRA AGORA:** as bolhas "dá um descontinho?" (palavra "proposta") e "o sobrinho faz por menos" (palavra "igual") sobem no celular; a etiqueta na palavra "barato"
- **OBJETOS SE MEXENDO:** o portfólio rola devagar no monitor; o celular vibra a cada bolha
- **PERSONAGEM:** em `C.centro` · começo: `mostrando` (apresenta o monitor) · na palavra "igual": `bravo`, olhando o celular
- **INTERAÇÃO:** ele mostra o trabalho bonito e o celular responde com pedidos de desconto
- **CÂMERA:** alvo `[personagem, monitor]`, centro · `passando` · médio · esquerda · olho (antes: chegando, médio, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · etiqueta vermelha "Faz mais barato?" (palavra "barato")
- **SONS:** `bip` em cada bolha · `errado` (palavra "barato")

#### 3 · plano `de_graca` · ~4 s · jogo `falha`
> "Ele baixa o preço, entrega, e ainda vem mudança de graça."

- **NA TELA:** o `monitor` de perto, com "Site entregue ✓"; a placa `orcamento` pequenininha ao lado; em volta do monitor, os três bilhetes amarelos `mudancas` grudando; o Igor à direita, cansado
- **MOSTRA:** `["monitor", "mudancas", "personagem"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** os bilhetes caem um a um a partir de "mudança" ("Muda a cor", "Mais uma página", "Troca a foto")
- **OBJETOS SE MEXENDO:** a placa encolhe mais na palavra "baixa"; o monitor troca pro "Site entregue ✓" na palavra "entrega"; os bilhetes balançam
- **PERSONAGEM:** à direita do monitor · começo: `empurrando` (aperta enter, entrega) · na palavra "graça": `cansado`, suando
- **INTERAÇÃO:** ele entrega o site e os pedidos de mudança caem em cima do trabalho dele
- **CÂMERA:** alvo `[monitor, mudancas, personagem]`, centro · `afastando` · médio · direita · baixo (antes: passando, médio, esquerda, olho; dentro de casa a câmera alta passa do teto)
- **EFEITOS VISUAIS:** etiqueta vermelha "De graça" (palavra "graça") · congela em preto e branco (o jogo faz)
- **SONS:** `desliga` (palavra "baixa") · `ding` (palavra "entrega") · `tampa` em cada bilhete

#### 4 · plano `virada` · ~4,5 s · jogo `corrige`
> "Mas o problema não é o preço. Pra quem pede desconto, site é gasto."

- **NA TELA:** na sala de reunião, a `tv` na parede com a proposta do Igor; a placa `preco` em pé na mesa; o `cliente` do desconto do outro lado da mesa, de braço cruzado; o Igor à esquerda
- **MOSTRA:** `["cliente", "preco", "personagem"]`
- **CENÁRIO:** `sala_reuniao`; a mesa comprida e a lousa
- **ENTRA AGORA:** a placa `preco` já está na mesa; a etiqueta na palavra "gasto"
- **OBJETOS SE MEXENDO:** a placa `preco` tomba pra trás na palavra "preço" (K.falhar 'tomba'); a tela da TV acende na palavra "Pra"
- **PERSONAGEM:** o Igor à esquerda da mesa · começo: `duvida` (olha a placa) · na palavra "quem": `ideia`, apontando o cliente. O cliente: `bravo`, braço cruzado, olhando a TV
- **INTERAÇÃO:** o Igor derruba a ideia do preço e aponta o cliente: o problema é ele
- **CÂMERA:** alvo `[cliente, preco, personagem]`, centro · `girando` · médio · direita · olho (antes: afastando, perto, direita, alto: muda movimento, plano e altura)
- **EFEITOS VISUAIS:** ✗ vermelho na placa (palavra "preço") · etiqueta vermelha "Site é gasto" em cima do cliente (palavra "gasto")
- **SONS:** `baque` da placa (o K.falhar põe) · `ding` (palavra "quem") · `errado` (palavra "gasto")

#### 5 · plano `sem_site` · ~4 s
> "Pensa no pet shop sem site: o cliente procura e acha o concorrente."

- **NA TELA:** na calçada, o pet shop Bicho Feliz (`pet_sem`) com a placa vermelha "Sem site" acima do toldo e o `cachorro` na porta; na frente, `rua1` com o `cel_rua` mostrando a busca: "Bicho Feliz" sem nada e "Pet Center" em cima; o Igor à esquerda, olhando
- **MOSTRA:** `["pet_sem", "rua1", "personagem"]`
- **CENÁRIO:** `cidade` de dia; carros e ônibus passando atrás
- **ENTRA AGORA:** a placa "Sem site" cai na palavra "sem"; a busca aparece no celular na palavra "procura"
- **OBJETOS SE MEXENDO:** na palavra "concorrente", `rua1` vira e anda pra direita, saindo do pet shop; o cachorro abana o rabo e depois baixa a cabeça
- **PERSONAGEM:** o Igor à esquerda do pet shop · começo: `pensando` · na palavra "concorrente": `apontar` (o cliente indo embora). O `rua1`: `duvida` olhando o celular, depois anda
- **INTERAÇÃO:** o cliente procura, não acha o pet shop e vai embora; o Igor aponta o cliente perdido
- **CÂMERA:** alvo `[pet_sem, rua1, personagem]`, centro · `revelando` · aberto · esquerda · alto (antes: girando, médio, direita, olho)
- **EFEITOS VISUAIS:** etiqueta laranja "Achou o concorrente" em cima do `rua1` (palavra "concorrente")
- **SONS:** `baque` da placa (palavra "sem") · `clique` (palavra "procura") · `passo` (palavra "concorrente")

#### 6 · plano `em_construcao` · ~3,5 s
> "Ou no que tem site em construção: o cliente entra e sai."

- **NA TELA:** o pet shop Pet Amigo (`pet_ruim`) à direita; na frente, `rua2` com o `cel_rua` grande, virado pra câmera, piscando "SITE EM CONSTRUÇÃO"; o Igor à esquerda
- **MOSTRA:** `["cel_rua", "rua2"]` (o Pet Amigo fica atrás, no fundo)
- **CENÁRIO:** `cidade`; o semáforo trocando e os carros
- **ENTRA AGORA:** o site em construção aparece no celular na palavra "construção"
- **OBJETOS SE MEXENDO:** a faixa amarela pisca 3 vezes por segundo a partir de "construção"; na palavra "sai", o celular desce e o `rua2` anda pra direita
- **PERSONAGEM:** o Igor à esquerda · começo: `surpreso` · na palavra "sai": `mostrando` (abre os braços: "viu?"). O `rua2`: `duvida`, depois anda
- **INTERAÇÃO:** o site velho espanta o cliente; o Igor mostra a cena pra câmera
- **CÂMERA:** alvo `[cel_rua, rua2]`, centro · `chegando` · perto · frente · olho (antes: revelando, aberto, esquerda, alto)
- **EFEITOS VISUAIS:** ✗ vermelho ao lado do celular (palavra "sai")
- **SONS:** `zap` da faixa piscando (palavra "construção") · `passo` (palavra "sai")

#### 7 · plano `motivo` · ~4,5 s
> "Esses já têm motivo pra pagar. Você não vende site: resolve o problema deles."

- **NA TELA:** a calçada com os dois pet shops lado a lado; o Igor no meio, de frente pra câmera, com a `prancheta`; o `cachorro` na porta do Bicho Feliz
- **MOSTRA:** `["pet_sem", "pet_ruim", "personagem"]`
- **CENÁRIO:** `cidade`; os prédios do outro lado da rua, carros passando
- **ENTRA AGORA:** a `prancheta` sobe na mão dele na palavra "motivo"; as etiquetas verdes nas palavras "pagar" e "problema"
- **OBJETOS SE MEXENDO:** a placa "Sem site" do Bicho Feliz pisca verde; o cachorro abana o rabo e pula
- **PERSONAGEM:** entre os dois pet shops, andando pra frente · começo: `segurando` a prancheta · na palavra "resolve": `vitoria`
- **INTERAÇÃO:** ele aponta a prancheta pros dois pet shops, e o cachorro comemora junto
- **CÂMERA:** alvo `[pet_sem, pet_ruim, personagem]`, centro · `afastando` · aberto · frente · baixo (antes: chegando, perto, frente, olho: muda movimento, plano e altura)
- **EFEITOS VISUAIS:** ✓ verde em cima de cada pet shop (palavra "pagar") · etiqueta azul "Resolve o problema" (palavra "problema")
- **SONS:** `certo` (palavra "pagar") · `ding` (palavra "problema")

#### 8 · plano `tarde` · ~3 s · jogo `falha`
> "Mas achar um por um leva a tarde inteira."

- **NA TELA:** o home office de noite; o `relogio` na parede com os ponteiros girando; o Igor na frente do `monitor` com a `lupa`, que mostra um mapa com pinos e "pet shop em Uberlândia"
- **MOSTRA:** `["relogio", "personagem", "monitor"]`
- **CENÁRIO:** `home_noite` (a janela escura, as janelinhas da cidade acesas)
- **ENTRA AGORA:** o `relogio` gira na palavra "achar"; a lupa sobe na mão dele na palavra "um"
- **OBJETOS SE MEXENDO:** os ponteiros dão várias voltas a partir de "leva"; a lupa passa de um pino pro outro no mapa
- **PERSONAGEM:** na frente do monitor · começo: `pensando` (com a lupa) · na palavra "tarde": `cansado`
- **INTERAÇÃO:** ele procura pino por pino com a lupa, e o relógio corre em cima dele
- **CÂMERA:** alvo `[relogio, personagem, monitor]`, centro · `subindo` · médio · esquerda · baixo (antes: afastando, aberto, frente, baixo: muda movimento, plano e lado)
- **EFEITOS VISUAIS:** etiqueta vermelha "A tarde inteira" (palavra "tarde") · congela em preto e branco
- **SONS:** `zumbido` do relógio (palavra "leva") · `clique` da lupa em cada pino

#### 9 · plano `lista` · ~6 s · jogo `corrige`
> "Então você usa o *Mappoa*, um site que acha empresas: pet shops em Uberlândia, separados com site e sem site."

- **NA TELA:** na central, a `tela` grande no centro já com a lista pronta, "Meus leads", "Pet shops · Uberlândia, MG", o grupo COM SITE cheio de cartões; o `robo` à esquerda segurando o mapa; o Igor chegando pela direita
- **MOSTRA:** `["tela", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa gigante com pontos brilhando, os robôs do fundo
- **ENTRA AGORA:** a lista já está na tela no começo da frase (o resultado primeiro); o rótulo "Mappoa" na palavra "Mappoa"; o grupo SEM SITE na palavra "sem"
- **OBJETOS SE MEXENDO:** os cartões descem um a um do grupo COM SITE a partir de "pet"; na palavra "sem", a tela troca pro grupo SEM SITE; o robô acena
- **PERSONAGEM:** anda da direita até perto da tela · começo: `surpreso` (vê a lista pronta) · na palavra "separados": `apontar` (a tela)
- **INTERAÇÃO:** o robô mostra a lista e o Igor aponta os grupos
- **CÂMERA:** alvo `[tela, robo]`, centro · `revelando` · médio · direita · olho (antes: subindo, médio, esquerda, baixo)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" (palavra "Mappoa") · etiqueta azul "Com site" (palavra "com") · etiqueta verde "Sem site" (palavra "sem")
- **SONS:** `brilho` do rótulo · `bip` em cada cartão · `ding` na troca de grupo

#### 10 · plano `analise` · ~5 s
> "E analisa cada um: score de aderência, dores, oportunidades, objeções e a mensagem pronta."

- **NA TELA:** no palco da marca, a `tela` de análise do Pet Amigo no centro, enchendo bloco por bloco; o `robo` à esquerda passando a `lupa` nela; a `mensagem` desliza pra direita no fim; o Igor à direita
- **MOSTRA:** `["tela", "mensagem", "robo"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** a `tela` cai na palavra "analisa"; o score "91/100" e a barra na palavra "score"; as dores ("Presença digital fraca", "Site em construção") na palavra "dores"; as oportunidades ("Site novo com agendamento") em "oportunidades"; as objeções ("Acha que site é caro") em "objeções"; a `mensagem` desliza da direita na palavra "mensagem"
- **OBJETOS SE MEXENDO:** a barra do score enche da esquerda pra direita; a lupa do robô desce pela tela acompanhando cada bloco
- **PERSONAGEM:** à direita · começo: `pensando` · na palavra "mensagem": `ideia`
- **INTERAÇÃO:** o robô varre a análise com a lupa e o Igor reage à mensagem pronta
- **CÂMERA:** alvo `[tela, mensagem, robo]`, centro · `chegando` · médio · frente · baixo (antes: revelando, médio, direita, olho)
- **EFEITOS VISUAIS:** sem etiqueta (a tela é o texto, no máximo 2 textos)
- **SONS:** `ding` em cada bloco · `whoosh` da mensagem

Texto da mensagem na tela: "Oi! Procurei o Pet Amigo e o site de vocês ainda aparece em construção. Faço sites para pet shops. Posso te mostrar
uma ideia rápida?"

#### 11 · plano `antes_agora` · ~6 s · jogo `avanca`
> "Você só revisa e envia. Antes, o Igor brigava por desconto. Agora, chega em quem precisa dele."

- **NA TELA:** três momentos no home office: (1) a `tela` de mensagem na frente do monitor e o Igor apertando "Enviar pelo WhatsApp", com o `balao` subindo; (2) "Antes": o `celular` com "faz mais barato?" e o `cliente` do desconto, em preto e branco; (3) "Agora": o `funil` na parede com os pet shops e o Igor arrastando um cartão
- **MOSTRA:** `["funil", "personagem"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** o `balao` na palavra "envia"; o `celular` e o `cliente` na palavra "Antes"; o `funil` na palavra "Agora"
- **OBJETOS SE MEXENDO:** o balão sobe; o celular vibra no "Antes"; um cartão desliza de "Novos" pra "Contato enviado" a partir de "chega"
- **PERSONAGEM:** começo: `empurrando` (aperta o botão) · na palavra "Antes": `bravo` (com o celular) · na palavra "Agora": `mostrando` o funil · na palavra "precisa": `vitoria`
- **INTERAÇÃO:** ele aperta enviar; depois arrasta o cartão no funil
- **CÂMERA:** (1) alvo `[tela, personagem]` · `chegando` · médio · esquerda · olho · (2) alvo `[celular, cliente, personagem]` · `afastando` · médio · direita · alto · (3) alvo `[funil, personagem]` · `afastando` · aberto · frente · olho (antes: chegando, médio, frente, baixo)
- **EFEITOS VISUAIS:** etiqueta azul "Quem envia é você" (palavra "envia") · no "Antes", os dois bravos e o celular vibrando · etiqueta verde "Quem precisa de você" (palavra "precisa")
- **SONS:** `clique` + `ding` (palavra "envia") · `bip` no "Antes" · `certo` (palavra "precisa")

#### 12 · plano `segue` · ~8 s
> "Desconto é culpa do cliente ou de quem escolheu ele? Comenta aí e segue pro próximo nicho. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Igor no `monitor`; a pergunta no topo; depois o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando à esquerda; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** a pergunta no topo na palavra "Desconto"; o cartão de seguir na palavra "segue"; o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde em "testa"
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, monitor]`, centro · `parado` · aberto · frente · olho, topo livre (antes: afastando, aberto, frente: muda o movimento)
- **EFEITOS VISUAIS:** a pergunta no topo · cartão de seguir no topo (palavra "segue")
- **SONS:** `brilho` do cartão · `clique` das letras · `ding` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Igor acena e o robô acena ao lado dele.

**Capa:** o Igor de boca aberta, mãos pra cima, atrás do `celular` gigante com "faz mais barato?" e a placa vermelha
"DESCONTO". Frase: "Pediu *desconto*?"

## As cenas em 2 linhas

1. O celular gigante mostra o orçamento enviado; chega "faz mais barato?" e a placa do orçamento encolhe e vira "DESCONTO". / O Igor leva um susto atrás do celular; a câmera chega de frente.
2. O celular do Igor enche de pedidos ("dá um descontinho?", "o sobrinho faz por menos"). / Ele mostra o portfólio e fica bravo; a câmera passa pela esquerda.
3. O site é entregue e caem bilhetes de mudança em volta do monitor: "De graça". / Ele aperta enter e fica cansado; a câmera se afasta do alto.
4. Na sala de reunião, a placa "PREÇO" tomba; o cliente do braço cruzado ganha "Site é gasto". / O Igor tem a ideia e aponta o cliente; a câmera gira pela direita.
5. O pet shop Bicho Feliz tem "Sem site"; quem procura no celular vai pro concorrente. / O Igor aponta o cliente indo embora; a câmera revela a rua do alto.
6. O Pet Amigo: o celular do cliente pisca "site em construção" e ele sai. / O Igor abre os braços; a câmera chega pertinho do celular.
7. Os dois pet shops ganham ✓ "Já têm motivo pra pagar", e o cachorro comemora. / O Igor com a prancheta vibra; a câmera se afasta de baixo.
8. De noite, o relógio gira e o Igor procura pino por pino com a lupa. / Ele fica cansado; a câmera sobe pela esquerda.
9. A lista do Mappoa já pronta, pet shops em Uberlândia, com site e sem site. / O Igor chega e aponta; a câmera revela pela direita.
10. A análise do Pet Amigo enche: score, dores, oportunidades, objeções, e a mensagem pronta desliza do lado. / O Igor tem a ideia; a câmera chega de baixo.
11. Ele aperta enviar; no "Antes", o "faz mais barato?" em preto e branco; no "Agora", o funil com os pet shops. / Ele aperta, fica bravo e depois comemora; a câmera muda a cada parte.
12. A pergunta no topo, o cartão de seguir e mappoa.com sendo digitado. / O Igor pergunta pra câmera e digita; a câmera parada, aberta.
