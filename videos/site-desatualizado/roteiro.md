# Como descobrir empresas com site desatualizado na sua cidade: roteiro e ficha de cena

## Roteiro

1. O cliente abriu o site da loja. Se tá "em construção", ele compra no vizinho. *(gancho)*
2. Esse é o Davi. Ele é web designer e tá sem nenhum cliente.
3. Se você é o Davi, liga pras lojas da cidade oferecendo site.
4. Mas toda loja responde igual: "a gente já tem site". E desliga.
5. Então você muda a pergunta: não é quem não tem site, é quem tem site ruim.
6. Aí você abre site por site, testa no celular e caça o ano lá no rodapé.
7. Mas numa tarde você confere dez sites. E a cidade tem centenas de lojas.
8. Então você usa um site que faz a busca por você: lojas de roupa em Ribeirão Preto.
9. Esse é o *Mappoa*.
10. Ele abre o mapa e traz as lojas, separando quem tem site e quem não tem.
11. Mas "tem site" não diz se o site presta.
12. Então a análise completa olha a presença digital de cada loja.
13. E aponta quando o site tem cara de modelo pronto ou ainda tá em construção.
14. Mas ligar dizendo "seu site é feio" acaba a conversa na hora.
15. Então ele prepara a mensagem falando do site daquela loja, com jeito. Quem envia é você.
16. É por isso que "a gente já tem site" deixa de ser o fim da conversa. Vira o começo.
17. Antes, o Davi ouvia "já temos site" e desligava. Agora, ele sabe quais sites precisam dele.
18. Qual tipo de empresa tem o pior site da sua cidade? Comenta aí. No computador, digita mappoa.com e testa você também.

Cerca de 225 palavras, uns 72 a 80 segundos, 18 frases. 4 ciclos "Mas → Então".

**Gancho escolhido:** A (situação + "se você fizer X, acontece Y", o estilo do canal). Opções:
- **A:** "O cliente abriu o site da loja. Se tá 'em construção', ele compra no vizinho." (o conflito na tela no 1º segundo: o site piscando e o cliente indo embora)
- **B:** "A loja disse 'a gente já tem site'. Se você desligar agora, perdeu o cliente." (fala direto com a dor do web designer)
- **C:** a frase do dono, "Como descobrir empresas com site desatualizado na sua cidade?" (é a busca que a pessoa digita; vira o título de qualquer jeito)

A frase do dono vira o **título** e a **capa** ("Site *desatualizado*?").

## O que foi conferido

- O vídeo não repete o do web designer sem site: aqui a empresa **tem** site, e o assunto é achar o site ruim
- A lista do Mappoa separa sozinha com site e sem site (`canal/referencias/mappoa-fluxo.md`, passo 5)
- "Desatualizado" vem da **inteligência comercial completa** (presença digital, dores, oportunidades, abordagem). No
  vídeo do produto ela apontou site com cara de modelo pronto e em construção: são só esses dois exemplos que a
  narração fala. Testar no celular e olhar o ano do rodapé é o Davi fazendo na mão (frase 6), não o Mappoa
- "Dez sites numa tarde" é o personagem, não estatística; "centenas de lojas" numa cidade grande é conta de cabeça
- Sem número de captura: a busca é outra (lojas de roupa), então nenhum número de empresas nem de tempo é falado. A
  contagem do topo da lista fica sem número na tela
- A mensagem é preparada pelo Mappoa e quem envia é a pessoa (a frase 15 diz)
- O fim não promete venda: "vira o começo da conversa"
- O nome Mappoa só aparece depois de mostrar o que ele faz (frase 8 → 9). Sem preço e sem plano. Fim no computador
- Empresas inventadas (Boutique Vento Sul, a do letreiro do cenário)

## Ficha de cena

**Cenários (cinco, com `K.cenarios`):** `cidade` (frases 1 e 5: a rua das lojas), `home_office` (2, 3, 6, 7, 8, 15,
17 e 18: o quarto do Davi), `loja_roupas` (4, 14 e 16: a Boutique Vento Sul, com o computador velho no balcão),
`central_mappoa` (9 e 10: o robô trabalhando), `mundo_mappoa` (11 a 13: o palco da marca, onde as lojas viram cartões).
**Hora:** cidade de dia; o `home_office` vira noite na frase 7 (segundo `home_office` com `{ hora: 'noite' }`).
**Personagens:** o do canal, chamado Davi. A **dona da loja** (`K.boneco({ tipo: 'menina' })`, cabelo preso, sem nome
de personagem: `K.semNome`) nas frases 4, 14 e 16. O **cliente** do gancho (`K.boneco` de moletom cinza, `K.semNome`)
só na frase 1. **O robô do Mappoa é ajudante:** só aparece da frase 9 em diante.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Davi | `K.boneco`, cores do canal | 1,47 | muda por cenário | 2 a 8, 10 a 18 |
| `cliente` | o cliente do gancho | `K.boneco` moletom cinza | 1,47 | calçada da cidade | 1 |
| `dona` | a dona da Boutique Vento Sul | `K.boneco` menina, vestido rosa | 1,47 | atrás do balcão | 4, 14, 16 |
| `celular` | celular grande na mão do cliente, com o site velho | `K.celular()` + tela desenhada | escala 2,2 | na mão do cliente | 1 |
| `vitrine` | a loja vizinha, iluminada | placa "Loja Nova" (`K.placa`) + `K.m3d('sacola')` | placa 2 × 0,6 | à direita na calçada | 1 |
| `monitor` | o computador do Davi, com o portfólio | `K.computador` com tela desenhada | escala 1,6 | mesa do home office | 2, 6, 8, 15, 18 |
| `agenda` | calendário vazio | `K.m3d('calendario')` | 1,1 | parede, ao lado da mesa | 2 |
| `telefone` | telefone de mesa | `K.m3d('telefone_fixo')` | 0,5 | mesa | 3 |
| `ondas` | sinal saindo do telefone | `K.ondas` | | do telefone pra direita | 3 |
| `site_velho` | computador bege com o site parado em 2014 piscando "SITE EM CONSTRUÇÃO" | `K.siteAntigoMappoa({ nome: 'BOUTIQUE VENTO SUL' })` | 1,5 × 1,3 | balcão da loja / palco | 4, 13, 14, 16 e na capa |
| `lupa` | lupa grande | `K.m3d('lupa')` | 1,2 | na mão do Davi, na calçada | 5 |
| `placas` | duas placas: "Sem site" e "Site ruim" | `K.placa` | 1,4 × 0,5 cada | acima das lojas | 5 |
| `relogio` | relógio com ponteiros correndo | `K.m3d('relogio_parede')` | 1,3 | parede do home office | 7 |
| `contador` | número de sites conferidos | `K.contador()` | | ao lado do Davi | 6 (3) e 7 (10) |
| `tela` | painel com as telas do Mappoa | `K.painelMappoa` | 1,56 × 2,6 | muda por frase | 8, 10, 12, 13, 15 |
| `logo` | logo 3D | `K.logoMappoa` | 1,6 | central | 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central e palco | 9 a 13, 18 |
| `cartoes` | cartões de lojas, todos com o chip azul "Site" | `K.cartaoLeadMappoa` × 5 | 1 × 0,6 | flutuando no palco | 11 |
| `funil` | o quadro de campanha com as lojas | `K.painelMappoa` largo, tela `funil` | 2,5 × 1,56 | parede do home office | 17 |
| `navegador` | barra grande com mappoa.com | `K.telaCanvas` | 2,4 × 0,4 | acima do computador | 18 |
| `balao` | balão verde de mensagem | `K.m3d('balao_chat')` | 1,1 | acima da tela / do telefone da dona | 15, 16 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| cliente, site, loja | 1 | `cliente` com o `celular` mostrando o site velho |
| "em construção" | 1, 13 | a faixa amarela piscando no `celular` e no `site_velho` |
| vizinho | 1 | `vitrine` da loja nova ao lado |
| web designer | 2 | `monitor` com sites bonitos do portfólio |
| cliente (nenhum) | 2 | `agenda` vazia |
| lojas, cidade | 3 | `telefone` com `ondas` saindo |
| "a gente já tem site", desliga | 4 | `dona` no telefone, `site_velho` no balcão |
| pergunta, site ruim | 5 | `placas` "Sem site" ✗ → "Site ruim" ✓ |
| celular, rodapé | 6 | `monitor` com o rodapé "© 2014"; o Davi com o celular na mão |
| tarde, dez sites | 7 | `relogio`, janela escurecendo, `contador` 10 |
| centenas de lojas | 7 | etiqueta "Centenas na cidade" |
| site que faz a busca, Ribeirão Preto | 8 | `tela` de busca com "lojas de roupa" e Ribeirão Preto |
| Mappoa | 9 | `logo` e `robo` |
| mapa, lojas, com/sem site | 10 | o mapa da central, `tela` de lista com os grupos |
| "presta" | 11 | `cartoes` todos com "Site", ponto de interrogação |
| análise completa, presença digital | 12 | `tela` de enriquecer com "Inteligência comercial completa" |
| modelo pronto, em construção | 13 | `tela` de análise com as duas dores + `site_velho` piscando |
| "seu site é feio" | 14 | `dona` brava desligando |
| mensagem, enviar | 15 | `tela` de mensagem, o Davi aperta "Enviar pelo WhatsApp", `balao` |
| começo da conversa | 16 | `dona` sorrindo, `balao` chegando |
| antes/agora | 17 | Davi desligando em P&B → `funil` com as lojas |
| computador, mappoa.com | 18 | `monitor`, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~4 s
> "O cliente abriu o site da loja. Se tá 'em construção', ele compra no vizinho."

- **NA TELA:** na calçada da cidade, o `cliente` no centro segurando o `celular` grande virado pra câmera, com o site velho (fundo cinza, faixa azul, "SITE EM CONSTRUÇÃO" amarelo piscando); à direita, a `vitrine` da loja nova com a placa iluminada
- **MOSTRA:** `["celular", "cliente"]`
- **CENÁRIO:** `cidade` de dia; carros e ônibus passando atrás, semáforo trocando, pedestres
- **ENTRA AGORA:** o site aparece no celular logo no 1º quadro (já aberto, sem espera); a `vitrine` acende (surge) na palavra "vizinho"
- **OBJETOS SE MEXENDO:** a faixa "em construção" pisca 3 vezes por segundo a partir de "construção"; o celular treme na mão
- **PERSONAGEM:** o cliente em `C.centro` · começo: `duvida`, olhando o celular · na palavra "vizinho": vira e anda pra direita, até a vitrine
- **INTERAÇÃO:** o site piscando espanta o cliente, que larga a loja e vai pro vizinho
- **CÂMERA:** alvo `[celular, cliente]`, centro, 2/3 da altura · `mergulho` · médio · frente · alto, topo livre (espacoCima 0,35) · termina com o cliente indo pra direita
- **EFEITOS VISUAIS:** ✗ vermelho em cima do celular na palavra "construção" · etiqueta verde "Comprou no vizinho" em cima da vitrine na palavra "vizinho"
- **SONS:** `zap` do site piscando (palavra "construção") · `passo` do cliente (palavra "vizinho") · `ding` da vitrine

#### 2 · plano `davi` · ~3 s
> "Esse é o Davi. Ele é web designer e tá sem nenhum cliente."

- **NA TELA:** no home office, o Davi no centro na frente da mesa; o `monitor` atrás dele com um site bonito do portfólio (cards coloridos); a `agenda` na parede, à esquerda, vazia
- **MOSTRA:** `["personagem", "monitor"]`
- **CENÁRIO:** `home_office` de dia; a janela com a cidade azul, o ring light, a estante
- **ENTRA AGORA:** a `agenda` gira na palavra "cliente"
- **OBJETOS SE MEXENDO:** o site do monitor rola devagar pra baixo (mostrando o capricho); a agenda balança depois de entrar
- **PERSONAGEM:** em `C.centro` · começo: `mostrando` (apresenta o monitor) · na palavra "nenhum": `triste`
- **INTERAÇÃO:** ele mostra o trabalho bonito e murcha ao olhar a agenda vazia
- **CÂMERA:** alvo `[personagem, monitor]`, centro · `chegando` · perto · esquerda · olho (antes: mergulho, médio, frente, alto)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · etiqueta vermelha "0 clientes" (palavra "nenhum")
- **SONS:** whoosh da agenda (palavra "cliente") · `errado` (palavra "nenhum")

#### 3 · plano `liga` · ~3 s
> "Se você é o Davi, liga pras lojas da cidade oferecendo site."

- **NA TELA:** o Davi sentado de lado na mesa, com o fone do `telefone` na orelha; as `ondas` saindo do telefone pra direita; o monitor com o portfólio
- **MOSTRA:** `["personagem", "telefone"]`
- **CENÁRIO:** `home_office`; a poltrona e a planta ao fundo
- **ENTRA AGORA:** o `telefone` sobe da mesa na palavra "liga"; as ondas começam na palavra "lojas"
- **OBJETOS SE MEXENDO:** as ondas saem em anéis, uma a cada 0,4 s, a partir de "lojas"
- **PERSONAGEM:** ao lado da mesa · começo: `segurando` (o fone) · na palavra "oferecendo": `chamando` (falando animado)
- **INTERAÇÃO:** ele pega o fone e o sinal sai do telefone
- **CÂMERA:** alvo `[telefone, personagem]`, centro · `passando` · médio · direita · olho (antes: chegando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta laranja "Oferecendo site" na palavra "oferecendo"
- **SONS:** `bip` de discagem (palavra "liga") · `bip` do sinal (palavra "lojas")

#### 4 · plano `ja_tem` · ~3,5 s · jogo `falha`
> "Mas toda loja responde igual: 'a gente já tem site'. E desliga."

- **NA TELA:** na Boutique Vento Sul, a `dona` atrás do balcão, com o celular na orelha; em cima do balcão, ao lado dela, o `site_velho` bege piscando "SITE EM CONSTRUÇÃO"; as araras coloridas atrás
- **MOSTRA:** `["dona", "site_velho"]`
- **CENÁRIO:** `loja_roupas`; o letreiro rosa "Vento Sul", as araras, os manequins
- **ENTRA AGORA:** o `site_velho` já está no balcão (a ironia: ela tem site, e ele tá parado)
- **OBJETOS SE MEXENDO:** a faixa do site pisca; na palavra "desliga" o celular desce da orelha
- **PERSONAGEM:** a dona · começo: `chamando` (responde no telefone) · na palavra "desliga": `bravo` e abaixa o celular. O Davi não aparece
- **INTERAÇÃO:** ela aponta o computador velho com orgulho na palavra "site" e desliga
- **CÂMERA:** alvo `[dona, site_velho]`, centro · `descendo` · médio · frente · alto (antes: passando, médio, direita, olho)
- **EFEITOS VISUAIS:** etiqueta azul "A gente já tem site" (palavra "tem") · ✗ vermelho na palavra "desliga" · congela em preto e branco (o jogo faz)
- **SONS:** `desliga` na palavra "desliga"

#### 5 · plano `pergunta` · ~4 s · jogo `corrige`
> "Então você muda a pergunta: não é quem não tem site, é quem tem site ruim."

- **NA TELA:** na calçada da cidade, o Davi com a `lupa` grande na mão, de frente pras lojas; acima dele as duas `placas`: à esquerda "Sem site", à direita "Site ruim"
- **MOSTRA:** `["personagem", "placas"]`
- **CENÁRIO:** `cidade`; os prédios coloridos do outro lado da rua, carros passando
- **ENTRA AGORA:** a `lupa` cai na mão dele na palavra "pergunta"; a placa "Sem site" cai na palavra "não"; a placa "Site ruim" cai na palavra "ruim"
- **OBJETOS SE MEXENDO:** a placa "Sem site" tomba de lado na palavra "ruim" (K.falhar 'tomba'); a lupa balança de um lado pro outro
- **PERSONAGEM:** em `C.personagem` · começo: `ideia` · na palavra "ruim": `apontar` (a placa nova)
- **INTERAÇÃO:** ele aponta a lupa pra placa certa e a errada cai
- **CÂMERA:** alvo `[personagem, placas]`, centro · `subindo` · aberto · esquerda · baixo (antes: descendo, médio, frente, alto)
- **EFEITOS VISUAIS:** ✗ em cima de "Sem site" (palavra "não") · ✓ em cima de "Site ruim" (palavra "ruim")
- **SONS:** whoosh da lupa · `baque` da placa caindo · `certo` (palavra "ruim")

#### 6 · plano `na_mao` · ~4 s
> "Aí você abre site por site, testa no celular e caça o ano lá no rodapé."

- **NA TELA:** no home office, o `monitor` de perto, trocando de site (três sites velhos diferentes); o Davi à direita, com o celular na mão; o `contador` marcando 1, 2, 3
- **MOSTRA:** `["monitor", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a janela clara
- **ENTRA AGORA:** o `contador` surge na palavra "site"
- **OBJETOS SE MEXENDO:** o monitor troca de site a cada ~1 s (cliques); na palavra "rodapé" a tela rola até o fim e aparece "© 2014" em vermelho
- **PERSONAGEM:** à direita do monitor · começo: `pensando` · na palavra "celular": `segurando` (levanta o celular e compara) · na palavra "rodapé": `surpreso`
- **INTERAÇÃO:** ele clica e o site troca; aproxima o celular da tela
- **CÂMERA:** alvo `[monitor, personagem]`, centro · `chegando` · perto · direita · olho (antes: subindo, aberto, esquerda, baixo)
- **EFEITOS VISUAIS:** etiqueta laranja "© 2014" no rodapé (palavra "rodapé") · o contador 1 → 2 → 3
- **SONS:** `clique` em cada troca · `bip` na palavra "rodapé"

#### 7 · plano `dez_sites` · ~4 s · jogo `falha`
> "Mas numa tarde você confere dez sites. E a cidade tem centenas de lojas."

- **NA TELA:** o home office de noite; o `relogio` na parede com os ponteiros girando; o Davi caído na cadeira, cansado; o `contador` marcando 10
- **MOSTRA:** `["relogio", "personagem"]`
- **CENÁRIO:** `home_office` de noite (a janela escura, as janelinhas da cidade acesas)
- **ENTRA AGORA:** o `relogio` gira na palavra "tarde"; a etiqueta na palavra "centenas"
- **OBJETOS SE MEXENDO:** os ponteiros dão várias voltas a partir de "tarde"; o contador vai de 3 a 10 em "dez"
- **PERSONAGEM:** na cadeira · começo: `cansado` · na palavra "centenas": `susto`
- **INTERAÇÃO:** o relógio gira em cima dele e o número das lojas assusta
- **CÂMERA:** alvo `[relogio, personagem]`, centro · `afastando` · médio · frente · alto (antes: chegando, perto, direita, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Centenas na cidade" (palavra "centenas") · congela em preto e branco
- **SONS:** `zumbido` do relógio (palavra "tarde") · `estrondo` leve em "centenas"

#### 8 · plano `busca` · ~4,5 s · jogo `corrige`
> "Então você usa um site que faz a busca por você: lojas de roupa em Ribeirão Preto."

- **NA TELA:** de dia de novo; a `tela` de busca subindo do `monitor`, grande, com "lojas de roupa" sendo digitado e a cidade aparecendo; o Davi à esquerda, digitando
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** a `tela` sobe do monitor na palavra "site"
- **OBJETOS SE MEXENDO:** "lojas de roupa" letra por letra em "lojas"; "Ribeirão Preto" e "SP" aparecem em "Ribeirão"; o botão afunda em "Preto"
- **PERSONAGEM:** diante do monitor · começo: `segurando` (digitando) · na palavra "Ribeirão": `apontar` (a tela)
- **INTERAÇÃO:** ele digita e a tela responde
- **CÂMERA:** alvo `[tela, personagem]`, centro · `revelando` · médio · esquerda · olho (antes: afastando, médio, frente, alto)
- **EFEITOS VISUAIS:** sem etiqueta (a tela é o texto)
- **SONS:** `clique` em "lojas" · `clique` em "Preto"

#### 9 · plano `mappoa_rotulo` · ~1,5 s
> "Esse é o *Mappoa*."

- **NA TELA:** na central, o `logo` grande no centro; o `robo` à direita, acenando; o mapa gigante atrás
- **MOSTRA:** `["logo", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa com pontos brilhando
- **ENTRA AGORA:** o robô desliza da direita; o logo gira na palavra "Mappoa"
- **OBJETOS SE MEXENDO:** o logo dá uma volta rápida
- **PERSONAGEM:** o Davi não aparece; o robô acena e aponta o logo
- **INTERAÇÃO:** o robô apresenta o logo
- **CÂMERA:** alvo `logo`, centro · `girando` · perto · frente · olho (antes: revelando, médio, esquerda)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa"
- **SONS:** `brilho` do rótulo

#### 10 · plano `separa` · ~4 s
> "Ele abre o mapa e traz as lojas, separando quem tem site e quem não tem."

- **NA TELA:** o `robo` na frente do mapa gigante; a `tela` de lista à direita, com o grupo "COM SITE" enchendo de cartões; o Davi entra pequeno à esquerda
- **MOSTRA:** `["robo", "tela"]`
- **CENÁRIO:** `central_mappoa`, as mesas e os robôs do fundo
- **ENTRA AGORA:** a `tela` desliza da direita na palavra "mapa"; o Davi entra andando na palavra "separando"
- **OBJETOS SE MEXENDO:** os cartões aparecem um por um na lista (de 0 a 5) a partir de "lojas"; na palavra "não" a tela troca pro grupo "SEM SITE"
- **PERSONAGEM:** o Davi · começo: anda até perto do robô · na palavra "não": `surpreso`
- **INTERAÇÃO:** o robô aponta o mapa e as lojas caem na tela
- **CÂMERA:** alvo `[robo, tela]`, centro · `passando` · médio · direita · olho (antes: girando, perto, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Com site" (palavra "tem") · etiqueta verde "Sem site" (palavra "não")
- **SONS:** `bip` em cada cartão · `ding` na troca de grupo

#### 11 · plano `presta` · ~2,5 s · jogo `falha`
> "Mas 'tem site' não diz se o site presta."

- **NA TELA:** no palco da marca, cinco `cartoes` de lojas flutuando em arco, todos com o chip azul "Site"; o Davi embaixo, olhando pra cima
- **MOSTRA:** `["cartoes", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** os cartões sobem do chão, um atrás do outro, na palavra "site"
- **OBJETOS SE MEXENDO:** os cartões giram devagar no ar; na palavra "presta" todos tremem
- **PERSONAGEM:** abaixo dos cartões · começo: `surpreso` · na palavra "presta": `duvida`
- **INTERAÇÃO:** os cartões cercam o Davi e ele não sabe qual escolher
- **CÂMERA:** alvo `[cartoes, personagem]`, centro · `mergulho` · aberto · esquerda · alto (antes: passando, médio, direita, olho)
- **EFEITOS VISUAIS:** etiqueta laranja "Bom ou ruim?" (palavra "presta") · congela em preto e branco
- **SONS:** whoosh dos cartões · `range` no tremor

#### 12 · plano `analise` · ~3,5 s · jogo `corrige`
> "Então a análise completa olha a presença digital de cada loja."

- **NA TELA:** a `tela` de enriquecer no centro, com "Inteligência comercial completa" marcada; o `robo` ao lado, segurando a lupa e passando ela por um cartão; o Davi à direita
- **MOSTRA:** `["tela", "robo"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** a `tela` cai na palavra "análise"; a marcação azul aparece na palavra "completa"
- **OBJETOS SE MEXENDO:** a lupa do robô passa da esquerda pra direita sobre a tela a partir de "presença"
- **PERSONAGEM:** o Davi à direita · começo: `pensando` · na palavra "loja": `ideia`
- **INTERAÇÃO:** o robô varre a tela com a lupa e o Davi entende
- **CÂMERA:** alvo `[tela, robo]`, centro · `subindo` · médio · direita · baixo (antes: mergulho, aberto, esquerda, alto)
- **EFEITOS VISUAIS:** brilho azul em volta da tela (palavra "completa")
- **SONS:** `clique` (palavra "completa") · `zumbido` leve da lupa

#### 13 · plano `aponta` · ~4 s
> "E aponta quando o site tem cara de modelo pronto ou ainda tá em construção."

- **NA TELA:** a `tela` de análise à esquerda, com as dores em pílulas azuis; à direita, o `site_velho` bege surgindo e piscando "SITE EM CONSTRUÇÃO"; o robô apontando
- **MOSTRA:** `["tela", "site_velho"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** o `site_velho` cresce na palavra "site"; a pílula "Site com cara de modelo pronto" em "modelo"; a pílula "Site em construção" em "construção"
- **OBJETOS SE MEXENDO:** a faixa amarela do site velho pisca a partir de "construção"; o computador treme (K.falhar 'pisca')
- **PERSONAGEM:** o Davi atrás do site velho, à direita · começo: `apontar` · na palavra "construção": `vitoria` (achou!)
- **INTERAÇÃO:** o robô aponta a dor na tela e o Davi aponta o site velho
- **CÂMERA:** alvo `[tela, site_velho]`, centro · `chegando` · perto · esquerda · olho (antes: subindo, médio, direita, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Site desatualizado" em cima do site velho (palavra "construção")
- **SONS:** `ding` em cada pílula · `zap` da faixa piscando

#### 14 · plano `feio` · ~3 s · jogo `falha`
> "Mas ligar dizendo 'seu site é feio' acaba a conversa na hora."

- **NA TELA:** de volta à loja, a `dona` atrás do balcão, com o celular na orelha, ficando vermelha; o `site_velho` ao lado
- **MOSTRA:** `["dona", "site_velho"]`
- **CENÁRIO:** `loja_roupas`, as araras e o espelho
- **ENTRA AGORA:** nada novo; o rosto dela fica vermelho na palavra "feio"
- **OBJETOS SE MEXENDO:** o celular desce com força na palavra "hora"; o site velho treme
- **PERSONAGEM:** a dona · começo: `surpreso` · na palavra "feio": `bravo`, desliga. O Davi não aparece
- **INTERAÇÃO:** a frase ofende a dona e ela corta a ligação
- **CÂMERA:** alvo `[dona, site_velho]`, centro · `chegando` · perto · direita · baixo (antes: chegando, perto, esquerda, olho: muda lado e altura)
- **EFEITOS VISUAIS:** etiqueta vermelha "Seu site é feio" (palavra "feio") · ✗ (palavra "hora") · congela em preto e branco
- **SONS:** `errado` (palavra "feio") · `desliga` (palavra "hora")

#### 15 · plano `mensagem` · ~4,5 s · jogo `corrige`
> "Então ele prepara a mensagem falando do site daquela loja, com jeito. Quem envia é você."

- **NA TELA:** no home office, a `tela` de mensagem na frente do monitor: "Para: Boutique Vento Sul" e o texto se escrevendo; o Davi do lado aperta o botão "Enviar pelo WhatsApp"; o `balao` verde sobe
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** a tela sobe na palavra "mensagem"; o `balao` sai na palavra "envia"
- **OBJETOS SE MEXENDO:** o texto se escreve de "mensagem" até "jeito"; o balão sobe do alto da tela
- **PERSONAGEM:** diante da tela · começo: `mostrando` · na palavra "envia": `empurrando` (aperta o botão) e depois `vitoria`
- **INTERAÇÃO:** ele aperta o botão com a mão e a mensagem sai
- **CÂMERA:** alvo `[tela, personagem]`, centro · `girando` · médio · frente · olho (antes: chegando, perto, direita, baixo)
- **EFEITOS VISUAIS:** etiqueta azul "Quem envia é você" (palavra "você") · ✓ verde em cima do balão (palavra "envia")
- **SONS:** `clique` (palavra "envia") · `ding`

Texto da mensagem na tela: "Oi! Vi que a página da loja de vocês ainda aparece em construção. Faço sites para lojas
de roupa. Posso te mostrar uma ideia rápida?"

#### 16 · plano `comeco` · ~4 s
> "É por isso que 'a gente já tem site' deixa de ser o fim da conversa. Vira o começo."

- **NA TELA:** na loja, a `dona` atrás do balcão lendo o celular e sorrindo; o `balao` verde chegando até ela; o `site_velho` ao lado ainda piscando
- **MOSTRA:** `["dona", "balao"]`
- **CENÁRIO:** `loja_roupas`, uma cliente passando nas araras (figurante parado ao fundo, opcional)
- **ENTRA AGORA:** o `balao` desliza da esquerda até ela na palavra "conversa"
- **OBJETOS SE MEXENDO:** o balão pousa e pulsa; na palavra "começo" ela responde e um segundo balão branco sobe
- **PERSONAGEM:** a dona · começo: `pensando` (lendo) · na palavra "começo": `ideia` e sorri
- **INTERAÇÃO:** a mensagem chega e ela responde
- **CÂMERA:** alvo `[dona, balao]`, centro · `revelando` · médio · esquerda · olho (antes: girando, médio, frente)
- **EFEITOS VISUAIS:** etiqueta verde "Começo da conversa" (palavra "começo")
- **SONS:** `bip` do balão chegando · `certo` (palavra "começo")

#### 17 · plano `antes_agora` · ~4,5 s · jogo `avanca`
> "Antes, o Davi ouvia 'já temos site' e desligava. Agora, ele sabe quais sites precisam dele."

- **NA TELA:** primeiro o Davi com o fone, abaixando ele, em preto e branco; depois o `funil` na parede com as lojas, colorido, e ele na frente arrastando um cartão
- **MOSTRA:** `["funil", "personagem"]`
- **CENÁRIO:** `home_office`
- **ENTRA AGORA:** o `funil` acende na palavra "Agora"
- **OBJETOS SE MEXENDO:** um cartão desliza de "Novos" pra "Contato enviado" a partir de "sabe"
- **PERSONAGEM:** começo: `triste` (abaixa o fone) · na palavra "Agora": `mostrando` (o funil)
- **INTERAÇÃO:** ele arrasta o cartão no funil
- **CÂMERA:** alvo `[funil, personagem]`, centro · `afastando` · aberto · frente · olho (antes: revelando, médio, esquerda)
- **EFEITOS VISUAIS:** preto e branco no "Antes" · etiqueta azul "Sites que precisam de você" (palavra "dele")
- **SONS:** `avanca` do jogo · `certo` (palavra "dele")

#### 18 · plano `segue` · ~6 s
> "Qual tipo de empresa tem o pior site da sua cidade? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Davi no `monitor`; o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando ao lado; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, monitor]`, centro · `parado` · aberto · frente · olho, topo livre (antes: afastando, aberto, frente: muda o movimento)
- **EFEITOS VISUAIS:** cartão de seguir no topo
- **SONS:** `brilho` do cartão · `clique` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Davi acena e o robô acena ao lado dele.

**Capa:** o Davi de olho arregalado, mãos na cabeça, na frente do `site_velho` gigante piscando "SITE EM CONSTRUÇÃO";
o robô chegando com a lupa. Frase: "Site *desatualizado*?"
