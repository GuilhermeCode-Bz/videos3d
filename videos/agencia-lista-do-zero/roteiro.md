# Montei uma lista de clientes para uma agência do zero: roteiro e ficha de cena

## Roteiro

1. Montei uma lista de clientes pra uma agência do zero. *(gancho)*
2. Esse é o José. Ele abriu a agência, mas a agenda tá vazia.
3. Se você é o José, espera indicação e fica olhando pro celular.
4. Mas indicação não paga o aluguel do mês que vem.
5. Então você vai atrás, e escolhe um tipo de empresa: estúdios de design em São Paulo.
6. Mas achar um por um no mapa leva o dia inteiro.
7. Então você usa um site que procura pra você: escreve o tipo de empresa e a cidade.
8. Esse é o *Mappoa*.
9. Ele abre o mapa e vai salvando as empresas na sua lista.
10. Em dois minutos, noventa e nove empresas.
11. Mas lista grande não é cliente. Quem você chama primeiro?
12. Então você separa: sessenta e cinco têm site, trinta e quatro não têm.
13. Aí a análise mostra as dores de cada empresa e como falar com ela.
14. Mas mensagem igual pra todo mundo vai pro lixo.
15. Então você pega a mensagem pronta, com o problema daquela empresa, e manda.
16. É por isso que lista boa não é a maior: é a que sabe com quem falar.
17. Antes, o José esperava indicação. Agora, ele tem noventa e nove empresas pra chamar.
18. Que tipo de empresa entrava na sua lista? Comenta aí. No computador, digita mappoa.com e testa você também.

Cerca de 190 palavras, uns 65 a 75 segundos, 18 frases.

## O que foi conferido

- 99 empresas, 2 minutos (2min 7s), 65 com site e 34 sem site: é a captura real do vídeo do produto, na busca de designers em São Paulo (`canal/referencias/mappoa-fluxo.md`). Por isso o nicho do vídeo é esse
- O vídeo não promete cliente nem venda: fala em empresas pra chamar
- A mensagem é gerada pelo Mappoa e quem envia é a pessoa: na frase 15 o José aperta o botão
- O nome Mappoa só aparece depois de mostrar o que ele faz
- Sem preço e sem plano

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `agencia` (frases 1 a 4, 7, 14 a 18: a vida do José), `cidade_maquete` (5 e 6: ele procurando na cidade), `central_mappoa` (8 a 10: o robô trabalhando), `mundo_mappoa` (11 a 13: a lista sendo separada).
**Hora:** interior. **Personagem:** o do canal, chamado José. **O robô é ajudante:** só aparece quando o Mappoa entra (frase 8 em diante).

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | José | `K.boneco`, cores do canal | 1,47 | muda por cenário | quase todas |
| `contador` | placa com o número da lista | `K.painelMappoa` pequeno + tela própria | 1,3 × 0,8 | ao lado do José | 1 |
| `agenda` | calendário vazio | `K.m3d('calendario')` | 1,1 | na parede, ao lado | 2 |
| `celular` | celular na mão, sem mensagem | `K.celular()` | escala 2,2 | na frente do José | 3 |
| `contas` | pilha de contas caindo | `K.m3d('pilha_papeis')` | 0,8 | no chão | 4 |
| `lupa` | lupa grande | `K.m3d('lupa')` | 1,2 | sobre a cidade | 5 |
| `prediozinhos` | a cidade em maquete | o cenário | | centro | 5 e 6 |
| `pinos` | pinos azuis brotando | `K.pinoMappoa` | 0,9 | sobre os prédios | 5 e 6 |
| `relogio` | relógio com o ponteiro correndo | `K.m3d('relogio_parede')` | 1,4 | acima da cidade | 6 |
| `tela` | painel com as telas do Mappoa | `K.painelMappoa` | 1,56 × 2,6 | muda por frase | 7, 9, 10, 12, 13, 15 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central e mundo | 8 a 13, 18 |
| `logo` | logo 3D | `K.logoMappoa` | 1,6 | central | 8 |
| `pilha` | pilha de cartões de empresa | `K.m3d('pilha_cartoes')` | 1,2 | centro do mundo | 11 |
| `peneira` | peneira separando os cartões | `K.peneiraMappoa` | 1 | no alto | 12 |
| `envelope` | envelopes iguais voando | `K.m3d('envelope')` | 0,7 | em direção à lixeira | 14 |
| `lixeira` | lixeira | `K.m3d('lixeira')` | 1,3 | à direita | 14 |
| `balao` | balão verde chegando | `K.m3d('balao_chat')` | 1,1 | acima da tela | 15 |
| `alvo` | alvo com flecha | `K.m3d('alvo')` | 1,4 | lado da lousa | 16 |
| `funil` | tela do funil com as empresas | `K.painelMappoa` largo | 2,5 × 1,56 | parede | 17 |
| `navegador` | barra grande com mappoa.com | `K.telaCanvas` | 2,4 × 0,4 | em cima do computador | 18 |
| `computador` | computador na mesa | `K.computador` | escala 1,6 | centro da agência | 7, 18 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| lista | 1, 9, 10, 11, 17 | `contador`, `tela`, `pilha` |
| agência | 1, 2 | o cenário `agencia`, com o letreiro |
| agenda | 2 | `agenda` |
| indicação, celular | 3 | `celular` sem nenhuma mensagem |
| aluguel | 4 | `contas`, com etiqueta "Aluguel" |
| estúdios de design, São Paulo | 5 | `prediozinhos` e etiqueta |
| mapa | 6, 9 | a maquete; a tela de captura |
| site, cidade | 7 | `computador` e `tela` de busca |
| empresas | 9 a 13, 17 | `tela`, `pilha` |
| dois minutos, noventa e nove | 10 | tela de resultado e etiqueta |
| site (com e sem) | 12 | `peneira` e etiquetas 65 e 34 |
| dores, análise | 13 | `tela` de análise |
| mensagem, lixo | 14 | `envelope`, `lixeira` |
| mensagem pronta | 15 | `tela` de mensagem, `balao` |
| indicação, empresas (fim) | 17 | `funil` com as empresas |
| computador, mappoa.com | 18 | `computador`, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3 s
> "Montei uma lista de clientes pra uma agência do zero."

- **NA TELA:** na agência, o `contador` grande no centro marcando 0; o José à direita; a parede azul com o letreiro AGÊNCIA atrás
- **MOSTRA:** `["contador", "personagem"]`
- **CENÁRIO:** `agencia`; mural, mesas vazias, luzes pendentes acesas
- **ENTRA AGORA:** o `contador` cai do alto logo no 1º segundo, na palavra "lista"
- **OBJETOS SE MEXENDO:** o `contador` quica ao cair e o número sobe de 0 para 99 na palavra "zero"
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera · começo: `susto` · na palavra "zero": `apontar`
- **INTERAÇÃO:** o contador cai perto dele e assusta; ele aponta o número subindo
- **CÂMERA:** alvo `[contador, personagem]`, centro · `mergulho` · médio · frente · alto, com topo livre
- **EFEITOS VISUAIS:** etiqueta azul "Do zero" na palavra "zero"
- **SONS:** baque do contador (palavra "lista") · `ding` no número (palavra "zero")

#### 2 · plano `jose` · ~3 s
> "Esse é o José. Ele abriu a agência, mas a agenda tá vazia."

- **NA TELA:** José no centro, à frente; à esquerda dele a `agenda` vazia
- **MOSTRA:** `["personagem", "agenda"]`
- **CENÁRIO:** `agencia`; as cadeiras e mesas vazias atrás
- **ENTRA AGORA:** a `agenda` gira e aparece na palavra "agenda"
- **OBJETOS SE MEXENDO:** a agenda balança de leve depois de entrar; as luzes pendentes fixas
- **PERSONAGEM:** em `C.centro` · começo: `mostrando` · na palavra "vazia": `triste`
- **INTERAÇÃO:** ele aponta a agenda e murcha ao ver que está vazia
- **CÂMERA:** alvo `[personagem, agenda]`, centro · `chegando` · perto · esquerda · olho (antes: mergulho, médio, frente)
- **EFEITOS VISUAIS:** etiqueta vermelha "Sem clientes" na palavra "vazia"
- **SONS:** whoosh da agenda (palavra "agenda") · `errado` (palavra "vazia")

#### 3 · plano `celular` · ~3 s
> "Se você é o José, espera indicação e fica olhando pro celular."

- **NA TELA:** José sentado no sofá da agência, segurando o `celular` grande com a tela "0 mensagens"
- **MOSTRA:** `["personagem", "celular"]`
- **CENÁRIO:** `agencia`; canto do sofá e da planta
- **ENTRA AGORA:** nada novo além do celular, subindo até a mão na palavra "celular"
- **OBJETOS SE MEXENDO:** o relógio da tela do celular passa; o celular treme uma vez e não chega nada
- **PERSONAGEM:** ao lado do sofá · começo: `pensando` · na palavra "celular": `segurando`
- **INTERAÇÃO:** ele encara o celular e nada acontece
- **CÂMERA:** alvo `[celular, personagem]`, centro · `passando` · médio · direita · olho (antes: chegando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta laranja "Esperando indicação" na palavra "indicação"
- **SONS:** `bip` fraco na palavra "celular"

#### 4 · plano `aluguel` · ~3 s · jogo `falha`
> "Mas indicação não paga o aluguel do mês que vem."

- **NA TELA:** a pilha de `contas` caindo em cima do José, no centro da agência
- **MOSTRA:** `["contas", "personagem"]`
- **CENÁRIO:** `agencia`; atrás, o mural
- **ENTRA AGORA:** as `contas` caem do alto na palavra "aluguel"
- **OBJETOS SE MEXENDO:** a pilha cai e quica; o topo balança
- **PERSONAGEM:** em `C.centro`, à direita da pilha · começo: `duvida` · na palavra "aluguel": `cansado`
- **INTERAÇÃO:** a pilha cai na frente dele e ele desaba
- **CÂMERA:** alvo `[contas, personagem]`, centro · `descendo` · médio · frente · alto (antes: passando, médio, direita; muda altura e lado)
- **EFEITOS VISUAIS:** etiqueta vermelha "Aluguel" na palavra "aluguel" · congela em preto e branco (o jogo faz)
- **SONS:** baque da pilha (palavra "aluguel")

#### 5 · plano `escolhe` · ~5 s · jogo `corrige`
> "Então você vai atrás, e escolhe um tipo de empresa: estúdios de design em São Paulo."

- **NA TELA:** a cidade em maquete vista de cima; José andando sobre ela; a `lupa` grande no centro; pinos azuis brotando nos prédios
- **MOSTRA:** `["personagem", "lupa"]`
- **CENÁRIO:** `cidade_maquete`, com os carrinhos andando
- **ENTRA AGORA:** a `lupa` cai na palavra "atrás"; os `pinos` brotam na palavra "design", um a um
- **OBJETOS SE MEXENDO:** a lupa desliza sobre os prédios da esquerda pra direita; os pinos surgem
- **PERSONAGEM:** anda de `C.entrada` até `C.personagem` · começo: anda · na palavra "design": `ideia`
- **INTERAÇÃO:** ele aponta a lupa pra região e os pinos aparecem onde ele aponta
- **CÂMERA:** alvo `[lupa, personagem]`, centro · `subindo` · aberto · direita · cima (antes: descendo, médio, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Estúdios de design · São Paulo" na palavra "design"
- **SONS:** whoosh da lupa (palavra "atrás") · `bip` em cada pino

#### 6 · plano `um_por_um` · ~3 s · jogo `falha`
> "Mas achar um por um no mapa leva o dia inteiro."

- **NA TELA:** a mesma maquete de mais perto; José correndo de um prédio a outro; o `relogio` gigante no alto, o ponteiro girando rápido
- **MOSTRA:** `["relogio", "personagem"]`
- **CENÁRIO:** `cidade_maquete`, um quarteirão de perto
- **ENTRA AGORA:** o `relogio` cai na palavra "dia"
- **OBJETOS SE MEXENDO:** os ponteiros giram várias voltas a partir de "dia"
- **PERSONAGEM:** correndo entre os prédios · começo: `correr` · na palavra "inteiro": `cansado`
- **INTERAÇÃO:** o relógio gira em cima dele e ele cansa
- **CÂMERA:** alvo `[relogio, personagem]`, centro · `chegando` · perto · esquerda · baixo (antes: subindo, aberto, direita)
- **EFEITOS VISUAIS:** etiqueta vermelha "Um por um" na palavra "um" · congela em preto e branco
- **SONS:** `zumbido` do relógio (palavra "dia")

#### 7 · plano `site` · ~4 s · jogo `corrige`
> "Então você usa um site que procura pra você: escreve o tipo de empresa e a cidade."

- **NA TELA:** de volta à agência, José no `computador`, no centro; a `tela` de busca subindo do monitor, grande, com as letras sendo digitadas
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `agencia`, a mesa principal
- **ENTRA AGORA:** a `tela` sobe do monitor na palavra "site"
- **OBJETOS SE MEXENDO:** a palavra "designers" é digitada em "escreve"; a cidade aparece em "cidade"
- **PERSONAGEM:** diante do computador · começo: `segurando` · na palavra "cidade": `apontar`
- **INTERAÇÃO:** ele digita e a tela responde
- **CÂMERA:** alvo `[tela, personagem]`, centro · `revelando` · médio · frente · olho (antes: chegando, perto, esquerda, baixo)
- **EFEITOS VISUAIS:** sem etiqueta (a tela é o texto)
- **SONS:** `clique` em "escreve"

#### 8 · plano `mappoa_rotulo` · ~1,5 s
> "Esse é o *Mappoa*."

- **NA TELA:** na central, o `logo` grande no centro; o `robo` ao lado, acenando; o mapa gigante atrás
- **MOSTRA:** `["logo", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa com pontos brilhando
- **ENTRA AGORA:** o robô desliza da esquerda; o logo gira na palavra "Mappoa"
- **OBJETOS SE MEXENDO:** o logo gira uma volta rápida
- **PERSONAGEM:** o José não aparece (só o robô, na hora de ser apresentado)
- **INTERAÇÃO:** o robô aponta o logo
- **CÂMERA:** alvo `logo`, centro · `girando` · perto · frente · olho (antes: revelando, médio)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa"
- **SONS:** `brilho` do rótulo

#### 9 · plano `captura` · ~3 s
> "Ele abre o mapa e vai salvando as empresas na sua lista."

- **NA TELA:** o `robo` em frente ao mapa gigante; a `tela` de captura à direita, com as etapas ficando verdes
- **MOSTRA:** `["robo", "tela"]`
- **CENÁRIO:** `central_mappoa`
- **ENTRA AGORA:** a `tela` desliza da direita na palavra "mapa"
- **OBJETOS SE MEXENDO:** a barra enche de 0 a 80%; o número sobe; as etapas ficam verdes
- **PERSONAGEM:** o robô opera; o José entra pequeno à direita, surpreso, na palavra "salvando"
- **INTERAÇÃO:** o robô aponta o mapa e os números da tela sobem
- **CÂMERA:** alvo `[robo, tela]`, centro · `passando` · médio · direita · olho (antes: girando, perto)
- **EFEITOS VISUAIS:** pontos azuis descendo do mapa até a tela
- **SONS:** `bip` em sequência na palavra "salvando"

#### 10 · plano `noventa_e_nove` · ~2,5 s
> "Em dois minutos, noventa e nove empresas."

- **NA TELA:** a `tela` de resultado bem grande no centro, com o 99 azul; o `robo` comemorando embaixo
- **MOSTRA:** `["tela"]`
- **CENÁRIO:** `central_mappoa`, fundo desfocado pelo enquadramento
- **ENTRA AGORA:** o verde de "captura concluída" na palavra "minutos"
- **OBJETOS SE MEXENDO:** o número sobe até 99 na palavra "noventa"
- **PERSONAGEM:** o José no canto, `surpreso` · na palavra "empresas": `vitoria`
- **INTERAÇÃO:** o José reage ao número
- **CÂMERA:** alvo `tela`, centro · `chegando` · perto · frente · olho (antes: passando, médio, direita)
- **EFEITOS VISUAIS:** etiqueta verde "2 minutos" na palavra "minutos"
- **SONS:** `certo` na palavra "empresas"

#### 11 · plano `quem_primeiro` · ~3 s · jogo `falha`
> "Mas lista grande não é cliente. Quem você chama primeiro?"

- **NA TELA:** no palco da marca, uma `pilha` enorme de cartões; José olhando pra cima, perdido; o logo gigante ao fundo
- **MOSTRA:** `["pilha", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, cartões e pinos flutuando
- **ENTRA AGORA:** a `pilha` sobe do chão na palavra "lista"
- **OBJETOS SE MEXENDO:** a pilha balança e inclina na palavra "primeiro"
- **PERSONAGEM:** ao lado da pilha · começo: `surpreso` · na palavra "primeiro": `duvida`
- **INTERAÇÃO:** a pilha balança na direção dele
- **CÂMERA:** alvo `[pilha, personagem]`, centro · `mergulho` · aberto · esquerda · alto (antes: chegando, perto, frente)
- **EFEITOS VISUAIS:** etiqueta laranja "Quem primeiro?" · congela em preto e branco
- **SONS:** `range` da pilha

#### 12 · plano `separa` · ~4 s · jogo `corrige`
> "Então você separa: sessenta e cinco têm site, trinta e quatro não têm."

- **NA TELA:** a `peneira` no alto, agitando; embaixo, dois montes de cartões: azul à esquerda, verde à direita; o `robo` segurando a peneira; José apontando os montes
- **MOSTRA:** `["peneira", "robo"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** a `peneira` cai na palavra "separa"; o monte esquerdo em "sessenta"; o direito em "trinta"
- **OBJETOS SE MEXENDO:** a peneira balança; os cartões caem nos montes
- **PERSONAGEM:** à direita · começo: `apontar` · na palavra "trinta": `vitoria`
- **INTERAÇÃO:** o robô balança a peneira, e os cartões caem na frente do José
- **CÂMERA:** alvo `[peneira, robo]`, centro · `subindo` · médio · direita · baixo (antes: mergulho, aberto)
- **EFEITOS VISUAIS:** etiqueta azul "65 com site" (palavra "sessenta") · etiqueta verde "34 sem site" (palavra "trinta")
- **SONS:** whoosh da peneira · `ding` em cada etiqueta

#### 13 · plano `analise` · ~3 s
> "Aí a análise mostra as dores de cada empresa e como falar com ela."

- **NA TELA:** a `tela` de análise grande no centro; o `robo` apontando; José lendo
- **MOSTRA:** `["tela", "robo"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** a `tela` desliza na palavra "análise"
- **OBJETOS SE MEXENDO:** os blocos da análise aparecem um a um, em "dores" e "falar"
- **PERSONAGEM:** o José à direita · começo: `pensando` · na palavra "falar": `ideia`
- **INTERAÇÃO:** ele lê e tem a ideia
- **CÂMERA:** alvo `tela`, centro · `chegando` · perto · esquerda · olho (antes: subindo, médio, direita)
- **EFEITOS VISUAIS:** brilho azul em volta da tela
- **SONS:** `clique` em cada bloco

#### 14 · plano `lixo` · ~2,5 s · jogo `falha`
> "Mas mensagem igual pra todo mundo vai pro lixo."

- **NA TELA:** na agência, vários `envelope` iguais voando da mão do José até a `lixeira`, à direita
- **MOSTRA:** `["envelope", "lixeira", "personagem"]`
- **CENÁRIO:** `agencia`
- **ENTRA AGORA:** os envelopes saem na palavra "igual"
- **OBJETOS SE MEXENDO:** seis envelopes em arco caem na lixeira, em "lixo"
- **PERSONAGEM:** à esquerda · começo: `empurrando` · na palavra "lixo": `triste`
- **INTERAÇÃO:** ele lança os envelopes e vê cair no lixo
- **CÂMERA:** alvo `[envelope, lixeira, personagem]`, centro · `passando` · médio · frente · olho (antes: chegando, perto, esquerda)
- **EFEITOS VISUAIS:** ✗ vermelho na lixeira na palavra "lixo" · congela em preto e branco
- **SONS:** whoosh em cada envelope · `errado` em "lixo"

#### 15 · plano `mensagem` · ~4 s · jogo `corrige`
> "Então você pega a mensagem pronta, com o problema daquela empresa, e manda."

- **NA TELA:** a `tela` de mensagem na frente; o José aperta o botão "Enviar pelo WhatsApp"; sobe o `balao` verde
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `agencia`, a mesa
- **ENTRA AGORA:** a tela sobe na palavra "mensagem"; o `balao` sai na palavra "manda"
- **OBJETOS SE MEXENDO:** o texto se escreve; o balão sobe do alto da tela
- **PERSONAGEM:** diante da tela · começo: `mostrando` · na palavra "manda": `vitoria`
- **INTERAÇÃO:** ele aperta o botão com a mão
- **CÂMERA:** alvo `[tela, personagem]`, centro · `subindo` · médio · direita · baixo (antes: passando, médio, frente)
- **EFEITOS VISUAIS:** ✓ verde em cima do balão na palavra "manda"
- **SONS:** `clique` e `ding` em "manda"

#### 16 · plano `alvo` · ~3 s
> "É por isso que lista boa não é a maior: é a que sabe com quem falar."

- **NA TELA:** o `alvo` na frente da lousa, com a flecha acertando; o José comemorando à direita
- **MOSTRA:** `["alvo", "personagem"]`
- **CENÁRIO:** `agencia`, o mural atrás
- **ENTRA AGORA:** a `flecha` crava na palavra "falar"
- **OBJETOS SE MEXENDO:** o alvo treme com a flecha
- **PERSONAGEM:** à direita · começo: `pensando` · na palavra "falar": `apontar`
- **INTERAÇÃO:** o José aponta e a flecha acerta o centro
- **CÂMERA:** alvo `alvo`, centro · `revelando` · perto · esquerda · olho (antes: subindo, médio, direita)
- **EFEITOS VISUAIS:** etiqueta verde "Com quem falar" na palavra "falar"
- **SONS:** `estalo` na flecha

#### 17 · plano `antes_agora` · ~4 s · jogo `avanca`
> "Antes, o José esperava indicação. Agora, ele tem noventa e nove empresas pra chamar."

- **NA TELA:** primeiro o José no sofá olhando o celular, em preto e branco; depois o `funil` na parede cheio de empresas e ele na frente, trabalhando
- **MOSTRA:** `["funil", "personagem"]`
- **CENÁRIO:** `agencia`
- **ENTRA AGORA:** o `funil` acende na palavra "Agora"
- **OBJETOS SE MEXENDO:** um cartão desliza de "Novos" para "Contato enviado"
- **PERSONAGEM:** começo: `triste` no sofá · na palavra "Agora": anda até a parede, `mostrando`
- **INTERAÇÃO:** ele arrasta o cartão no funil
- **CÂMERA:** alvo `[funil, personagem]`, centro · `afastando` · aberto · frente · olho (antes: revelando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta azul "99 pra chamar" na palavra "chamar"
- **SONS:** `avanca` do jogo · `certo` em "chamar"

#### 18 · plano `segue` · ~5 s
> "Que tipo de empresa entrava na sua lista? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o José no `computador`; o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "computador"]`
- **CENÁRIO:** `agencia`, a mesa principal
- **ENTRA AGORA:** o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde
- **PERSONAGEM:** começo: `chamando` · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, computador]`, centro · `parado` · aberto · frente · olho, topo livre (antes: afastando, aberto)
- **EFEITOS VISUAIS:** cartão de seguir no topo
- **SONS:** `brilho` do cartão · `clique` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o José acena e o robô acena ao lado dele.

**Capa:** o José desesperado na frente do contador em zero, o robô chegando com a pilha de empresas. Frase: "Lista do *zero*".
