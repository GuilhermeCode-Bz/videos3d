# Você atende qualquer um. É por isso que cobra pouco: roteiro e ficha de cena

> Série "Como funciona a venda": o vídeo explica o **cliente ideal** do web designer. A ótica: o Thiago sabe criar um
> ótimo site, mas não sabe vender nem prospectar. O cliente ideal dele vem de dois jeitos: a empresa **sem site** (ele
> cria do zero) e a empresa com **site ruim** (ele reforma). O Mappoa acha as duas, com os contatos, analisa o site e
> prepara a mensagem (pedido do dono, 10/11/2026).

## Roteiro

1. Você atende qualquer um. É por isso que cobra pouco. *(gancho, a frase do dono)*
2. Esse é o Thiago. Ele cria sites incríveis, mas não sabe vender.
3. Se você é o Thiago, espera indicação e pega quem aparecer: o primo, o vizinho, o amigo do amigo.
4. Mas quem aparece quer site baratinho. E você aceita, porque não tem outro.
5. Então você para de esperar e escolhe pra quem vender: a empresa que precisa de site.
6. Esse é o seu *cliente ideal*.
7. E ele vem de dois jeitos: a empresa sem site nenhum e a que tem um site ruim.
8. Mas achar essas empresas na mão é o que trava: abrir o mapa, entrar site por site, caçar telefone.
9. Então você usa um site que procura por você: escreve o tipo de empresa e a cidade.
10. Esse é o *Mappoa*.
11. Ele traz a lista já separada: quem tem site e quem não tem, com os contatos.
12. Quem não tem site, você oferece um do zero.
13. Mas quem tem site, como saber se é ruim?
14. Então você pede a análise completa: ela aponta o site com cara de modelo pronto ou ainda em construção.
15. E ele prepara a mensagem falando do site daquela empresa. Você só revisa e envia.
16. É por isso que quem escolhe o cliente não briga por preço: chega mostrando o que a empresa tá perdendo.
17. Antes, o Thiago esperava quem aparecesse. Agora, ele escolhe pra quem vende.
18. Você cria site do zero ou reforma site velho? Comenta aí. No computador, digita mappoa.com e testa você também.

Cerca de 235 palavras, uns 75 a 80 segundos, 18 frases, 4 ciclos "Mas → Então" (uns 1.400 caracteres da ElevenLabs; sobram 5.154).

**Opções de gancho:**
- **A (a frase do dono, a minha escolhida):** "Você atende qualquer um. É por isso que cobra pouco." (fala com "você", bate no bolso e abre o porquê)
- **B (situação + "se você fizer X, acontece Y"):** "O primo pediu um site. Se você aceita qualquer um, cobra o preço do primo."
- **C:** "Você cria site incrível. Se não sabe vender, cobra como iniciante."
A frase do dono vira o título e a capa em qualquer opção.

## O que foi conferido

- O conceito de cliente ideal: escolher pra quem vender (quem mais precisa do seu serviço) em vez de pegar quem aparecer. Quem pega qualquer um acaba com cliente que só quer preço. O vídeo explica o porquê; não promete que ele vai cobrar X a mais
- A lista do Mappoa separa sozinha COM SITE e SEM SITE, com os contatos (`canal/referencias/mappoa-fluxo.md`, passo 5). Nem toda empresa tem todo contato: a narração diz "com os contatos", sem "todos"
- "Site ruim" vem da **análise completa** (inteligência comercial completa): no vídeo do produto ela apontou site com cara de modelo pronto e em construção. São só esses dois exemplos que a narração fala
- A mensagem: o Mappoa **prepara**; quem envia é a pessoa (frase 15: "Você só revisa e envia"). O dono pediu "o Mappoa faz tudo": tudo o que dá pra fazer antes de enviar, ele faz (achar, separar, contatos, análise, mensagem). Enviar é o único clique do Thiago, porque o produto não envia sozinho
- "Primo, vizinho, amigo do amigo" e o "site baratinho" são o personagem, não estatística. Nenhum preço em reais na tela
- Sem número de captura (a busca é outra: barbearias), sem preço e sem plano. O nome Mappoa só aparece depois de mostrar o que ele faz (frase 9 → 10). Empresas inventadas
- Não repete os vídeos de web designer já feitos (Rafa: empresas sem site; Davi: site desatualizado): aqui o assunto é escolher o cliente, e as duas portas (criar e reformar) aparecem juntas

## Ficha de cena

**Cenários (cinco, com `K.cenarios`):** `home_office` (1, 2, 3, 4, 9, 15, 17, 18: o quarto do Thiago), `cidade` (5, 6, 7, 12: a rua com as duas empresas), `cidade_maquete` (8: achar na mão), `central_mappoa` (10, 11: o robô trabalhando), `mundo_mappoa` (13, 14, 16: o palco da marca, onde a análise acontece).
**Hora:** tudo de dia. **Personagem:** o do canal, chamado Thiago, web designer; fica quase sempre em `C.personagem`. **Os "quem aparece" (frase 3 e 4):** três `K.boneco` com `K.semNome` (primo de boné, vizinho de moletom cinza, amigo de camiseta laranja). **Os donos das empresas (frase 7 e 12):** o dono da barbearia (`K.boneco` menino, camiseta preta, `K.semNome`). **O robô é ajudante:** só entra com o Mappoa (frase 10 em diante).
**As duas empresas da rua:** a **Barbearia do Zé** (sem site: placa "Sem site" vermelha) e a **Barbearia Navalha** (com o `site_velho` piscando "EM CONSTRUÇÃO" na vitrine). Lojas próprias a partir de x -21 (lição da cidade).
**Câmera nos lugares fechados** (home_office, central): só altura `olho` ou `baixo`, sem `mergulho` nem `descendo` (lição do teto). Na maquete: altura `alto`.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Thiago | `K.boneco`, cores do canal | 1,47 | muda por cenário | todas menos a 10 |
| `placa` | placa "ATENDO QUALQUER UM" | `K.telaCanvas` numa placa com haste | 1,3 × 0,6, amarela, letra preta | na mão do Thiago | 1 |
| `preco` | etiqueta de preço que murcha | `K.telaCanvas` em forma de etiqueta ("PREÇO" → "BARATINHO") | de 1,0 × 0,7 até 0,4; verde → vermelha | à esquerda do Thiago | 1, 4 |
| `monitor` | o computador do Thiago, com um site lindo no portfólio | `K.computador` com tela desenhada (site moderno, degradê, "Portfólio") | escala 1,6 | mesa do home office | 2, 3, 9, 15, 18 |
| `celular` | celular sem mensagem nenhuma | `K.celular()` com a tela "0 mensagens" | escala 1,8 | na mão do Thiago | 3 |
| `quem_aparece` | primo, vizinho e amigo do amigo | `K.boneco` × 3, `K.semNome` | 1,47 | entram pela porta do quarto | 3, 4 |
| `rascunho` | papel com um site feio rabiscado ("faz igual esse, mas barato") | `K.telaCanvas` numa placa | 0,6 × 0,8, branco | na mão do primo | 4 |
| `alvo` | alvo com a flecha | `K.m3d('alvo')` | 1,2 | no meio da rua | 5, 6 |
| `barbearia_sem` | a Barbearia do Zé, sem site | `K.m3d('prediozinho', { placa: 'Barbearia do Zé' })` + `K.placa` "Sem site" | 2,2 de altura | à esquerda na calçada (x -22) | 5, 7, 12 |
| `barbearia_ruim` | a Barbearia Navalha, com o site velho | `K.m3d('prediozinho', { placa: 'Barbearia Navalha' })` | 2,2 de altura | à direita na calçada (x -26) | 5, 7 |
| `site_velho` | computador bege com o site piscando "EM CONSTRUÇÃO" | `K.siteAntigoMappoa({ nome: 'BARBEARIA NAVALHA' })` | 1,5 × 1,3 | na vitrine da Navalha; depois no palco | 7, 13, 14 |
| `dono` | o dono da Barbearia do Zé | `K.boneco` menino, camiseta preta, `K.semNome` | 1,47 | na porta da barbearia | 7, 12 |
| `predios` | a cidade cheia de empresas | os prédios da `cidade_maquete` + `K.m3d('prediozinho')` × 6 | 1,2 | espalhados | 8 |
| `relogio` | relógio com ponteiros correndo | `K.m3d('relogio_parede')` | 1,0, flutuando | acima do Thiago na maquete | 8 |
| `lupa` | lupa grande | `K.lupaMappoa` | 1,2 | na mão do Thiago | 8 |
| `tela` | painel com as telas do Mappoa | `K.painelMappoa(1.56, 2.6)` | 1,56 × 2,6 | muda por frase | 9, 11, 14, 15 |
| `logo` | logo 3D | `K.logoMappoa` | 1,6 | centro da central | 10 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central e palco | 10, 11, 14, 18 |
| `moedas` | moedas de contato | `K.moedaContatoMappoa` (whats, tel, insta, site) | 0,45 | do mapa até a lista | 11 |
| `cartoes` | cartões de empresa caindo nos dois montes | `K.cartaoLeadMappoa` × 6 | 0,6 | no palco | 16 |
| `pedido` | prancheta "Site novo" | `K.m3d('lista_check')` | 0,6 | na mão do Thiago, mostrando pro dono | 12 |
| `mensagem` | a mensagem pronta, grande | `K.painelMappoa` com a tela da mensagem pronta | 1,56 × 2,6 | sobe do monitor | 15 |
| `navegador` | barra grande com mappoa.com | `K.telaCanvas` | 2,4 × 0,4 | em cima do monitor | 18 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| qualquer um, cobra pouco | 1 | `placa` "ATENDO QUALQUER UM" e `preco` murchando |
| sites incríveis, vender | 2 | `monitor` com o site lindo; etiqueta "Não sabe vender" |
| indicação, primo, vizinho, amigo do amigo | 3 | `celular` sem mensagem; `quem_aparece` entrando um por um |
| site baratinho | 4 | `rascunho` do primo e `preco` virando "BARATINHO" |
| empresa que precisa de site | 5 | `alvo` na rua e as duas barbearias |
| cliente ideal | 6 | `alvo` de perto, a flecha no centro |
| sem site, site ruim | 7 | `barbearia_sem` com a placa "Sem site"; `site_velho` na vitrine da Navalha |
| mapa, site por site, telefone | 8 | `cidade_maquete`, `lupa`, `relogio` correndo; ícones de site e telefone piscando nos prédios |
| site, tipo de empresa, cidade | 9 | `monitor` e `tela` de busca: "barbearias", "Goiânia" |
| Mappoa | 10 | `logo` e `robo` |
| lista separada, contatos | 11 | `tela` de lista "COM SITE / SEM SITE" e `moedas` |
| do zero | 12 | `pedido` "Site novo" pro `dono` da `barbearia_sem` |
| site ruim | 13 | `site_velho` no palco, com um "?" |
| análise completa, modelo pronto, em construção | 14 | `tela` da análise com os dois apontamentos e o `site_velho` ao lado |
| mensagem, site daquela empresa | 15 | `mensagem` subindo do `monitor` |
| preço, o que a empresa perde | 16 | `cartoes` e etiqueta "O que ela perde" |
| esperava, escolhe | 17 | o Thiago esperando (preto e branco) → escolhendo os cartões no monitor |
| computador, mappoa.com | 18 | `monitor`, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3 s
> "Você atende qualquer um. É por isso que cobra pouco."

- **NA TELA:** o quarto do Thiago; ele no centro, erguendo a `placa` "ATENDO QUALQUER UM"; à esquerda dele, a `preco` grande e verde, que murcha e cai
- **MOSTRA:** `["personagem", "placa", "preco"]`
- **CENÁRIO:** `home_office` de dia; a mesa com o computador e a janela atrás
- **ENTRA AGORA:** a `placa` já está erguida no 1º quadro (o conflito no 1º segundo); a `preco` já está lá, grande
- **OBJETOS SE MEXENDO:** a placa balança de um lado pro outro no 1º segundo; a `preco` encolhe de 1,0 pra 0,4 e desce meio metro aos trancos a partir de "cobra", e fica vermelha em "pouco"
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera · começo: `erguendo` (a placa no alto, animado) · na palavra "pouco": `susto` (olha a etiqueta murchar)
- **INTERAÇÃO:** ele ergue a placa todo orgulhoso e a etiqueta de preço murcha do lado dele
- **CÂMERA:** alvo `[personagem, placa, preco]`, centro, 2/3 da altura · `revelando` · aberto · frente · olho, topo livre (espacoCima 0,38) pro título
- **EFEITOS VISUAIS:** seta vermelha pra baixo ao lado da `preco` em "cobra" · etiqueta vermelha "Cobra pouco" na palavra "pouco"
- **SONS:** `whoosh` da placa (1º segundo) · `desliga` na etiqueta encolhendo · `errado` em "pouco"

#### 2 · plano `thiago` · ~3 s
> "Esse é o Thiago. Ele cria sites incríveis, mas não sabe vender."

- **NA TELA:** o Thiago à direita da mesa; o `monitor` à esquerda com um site lindo (cabeçalho em degradê, fotos, botão) no portfólio
- **MOSTRA:** `["personagem", "monitor"]`
- **CENÁRIO:** `home_office`, a mesa e a janela
- **ENTRA AGORA:** o site lindo aparece no monitor, rolando, na palavra "incríveis"
- **OBJETOS SE MEXENDO:** o site do monitor rola de cima pra baixo a partir de "cria"; três estrelinhas sobem do monitor em "incríveis"
- **PERSONAGEM:** ao lado da mesa, de frente pra câmera · começo: `mostrando` (orgulhoso, aponta o site) · na palavra "vender": `triste` (os ombros caem)
- **INTERAÇÃO:** ele mostra o site que fez e murcha ao lembrar que não vende
- **CÂMERA:** alvo `[personagem, monitor]`, centro · `chegando` · perto · esquerda · olho (antes: revelando, aberto, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" na palavra "Thiago" · etiqueta vermelha "Não sabe vender" na palavra "vender" (a azul some antes)
- **SONS:** `brilho` das estrelinhas · `ding` na etiqueta azul · `errado` baixinho em "vender"

#### 3 · plano `espera` · ~4,5 s
> "Se você é o Thiago, espera indicação e pega quem aparecer: o primo, o vizinho, o amigo do amigo."

- **NA TELA:** o Thiago no centro, sentado na cadeira, com o `celular` na mão mostrando "0 mensagens"; a porta do quarto à direita, por onde os três `quem_aparece` entram um atrás do outro
- **MOSTRA:** `["personagem", "celular", "quem_aparece"]`
- **CENÁRIO:** `home_office`, o relógio da parede e a porta
- **ENTRA AGORA:** o primo entra pela porta na palavra "primo", o vizinho em "vizinho", o amigo em "amigo"
- **OBJETOS SE MEXENDO:** o celular vibra uma vez em "indicação" e continua com "0 mensagens"; cada boneco anda da porta até a fila na frente do Thiago (1,5 m)
- **PERSONAGEM:** sentado em `C.personagem` · começo: `pensando` (olha o celular, esperando) · na palavra "aparecer": `surpreso`, levanta pra receber
- **INTERAÇÃO:** ninguém escreve no celular; quem entra é o primo, o vizinho e o amigo
- **CÂMERA:** alvo `[personagem, quem_aparece]`, centro · `passando` · médio · direita · olho (antes: chegando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta laranja "Quem aparecer" na palavra "aparecer"
- **SONS:** `bip` do celular vibrando · `passo` em cada boneco entrando

#### 4 · plano `baratinho` · ~4 s · jogo `falha`
> "Mas quem aparece quer site baratinho. E você aceita, porque não tem outro."

- **NA TELA:** os três `quem_aparece` em fila na frente do Thiago; o primo na frente, estendendo o `rascunho` ("faz igual esse, mas barato"); a `preco` entre eles, encolhendo
- **MOSTRA:** `["quem_aparece", "preco", "personagem"]`
- **CENÁRIO:** `home_office`, a mesa atrás
- **ENTRA AGORA:** o `rascunho` sobe na mão do primo na palavra "quer"; a `preco` volta na palavra "baratinho"
- **OBJETOS SE MEXENDO:** a `preco` perde um pedaço (de 0,7 pra 0,4) e o texto troca pra "BARATINHO" em "baratinho"; em "aceita", a etiqueta passa da mão do primo pra mão do Thiago
- **PERSONAGEM:** à esquerda da fila · começo: `duvida` (olha o rascunho) · na palavra "aceita": `cansado` (pega a etiqueta, contrariado)
- **INTERAÇÃO:** o primo empurra o preço pra baixo e o Thiago aceita
- **CÂMERA:** alvo `[quem_aparece, preco, personagem]`, centro · `chegando` · perto · frente · baixo (antes: passando, médio, direita, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Site baratinho" na palavra "baratinho" · congela em preto e branco (o jogo)
- **SONS:** `racha` da etiqueta rasgando · `errado` em "outro"

#### 5 · plano `escolhe` · ~4,5 s · jogo `corrige`
> "Então você para de esperar e escolhe pra quem vender: a empresa que precisa de site."

- **NA TELA:** a rua da cidade; o Thiago à esquerda, com uma flecha na mão; o `alvo` grande no meio da calçada; atrás dele, as duas barbearias (`barbearia_sem` e `barbearia_ruim`)
- **MOSTRA:** `["alvo", "personagem", "barbearia_sem"]`
- **CENÁRIO:** `cidade` de dia; os carros e o ônibus passando, o semáforo trocando
- **ENTRA AGORA:** o corte pra rua na palavra "esperar"; o `alvo` sobe do chão na palavra "escolhe"
- **OBJETOS SE MEXENDO:** a flecha sai da mão do Thiago e crava no centro do alvo na palavra "empresa"; as duas barbearias acendem a vitrine em "site"
- **PERSONAGEM:** em `C.esquerda`, virado pro alvo · começo: `pensando` (mira) · na palavra "empresa": `empurrando` (lança a flecha) e depois `vitoria`
- **INTERAÇÃO:** ele lança a flecha e acerta o alvo na frente das barbearias
- **CÂMERA:** alvo `[alvo, personagem, barbearia_sem]`, centro · `subindo` · médio · direita · baixo (antes: chegando, perto, frente, baixo; muda lado e movimento)
- **EFEITOS VISUAIS:** etiqueta verde "Quem precisa de site" na palavra "site" · ✓ verde ao lado do alvo
- **SONS:** `whoosh` da flecha · `trava` cravando · `certo` no ✓

#### 6 · plano `ideal_rotulo` · ~1,5 s
> "Esse é o seu *cliente ideal*."

- **NA TELA:** o `alvo` de perto, ocupando o meio da tela, com a flecha no centro brilhando
- **MOSTRA:** `["alvo"]`
- **CENÁRIO:** `cidade`, a calçada atrás, desfocada pelo enquadramento
- **ENTRA AGORA:** nada novo; o brilho amarelo no centro do alvo
- **OBJETOS SE MEXENDO:** o alvo dá um quarto de volta devagar; a flecha vibra
- **PERSONAGEM:** a mão do Thiago entra pela esquerda apontando o centro (`apontar`)
- **INTERAÇÃO:** ele aponta onde a flecha cravou
- **CÂMERA:** alvo `alvo`, centro, metade da tela · `girando` · perto · esquerda · olho (antes: subindo, médio, direita, baixo)
- **EFEITOS VISUAIS:** rótulo amarelo "Cliente ideal"
- **SONS:** `brilho` do rótulo

#### 7 · plano `dois_jeitos` · ~4,5 s
> "E ele vem de dois jeitos: a empresa sem site nenhum e a que tem um site ruim."

- **NA TELA:** as duas barbearias lado a lado no centro; à esquerda, a Barbearia do Zé com a placa vermelha "Sem site" e o `dono` na porta; à direita, a Barbearia Navalha com o `site_velho` na vitrine, piscando "EM CONSTRUÇÃO"; o Thiago na calçada, entre as duas, de frente pra câmera
- **MOSTRA:** `["barbearia_sem", "barbearia_ruim", "site_velho"]`
- **CENÁRIO:** `cidade`, os carros passando na frente
- **ENTRA AGORA:** a placa "Sem site" cai em cima da porta do Zé na palavra "nenhum"; o `site_velho` acende na vitrine da Navalha na palavra "ruim"
- **OBJETOS SE MEXENDO:** a placa balança depois de cair; o site velho pisca três vezes "EM CONSTRUÇÃO" a partir de "ruim"
- **PERSONAGEM:** no meio das duas · começo: `apontar` pra esquerda (o Zé) em "sem site" · na palavra "ruim": `apontar` pra direita (a Navalha) e depois `ideia`. O dono: `duvida`, coçando a cabeça
- **INTERAÇÃO:** ele aponta uma empresa de cada vez: uma pra criar, outra pra reformar
- **CÂMERA:** alvo `[barbearia_sem, barbearia_ruim, personagem]`, centro · `revelando` · aberto · frente · olho (antes: girando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta verde "Criar do zero" em cima do Zé (palavra "nenhum") · etiqueta laranja "Reformar" em cima da Navalha (palavra "ruim")
- **SONS:** `baque` da placa caindo · `zap` do site piscando

#### 8 · plano `na_mao` · ~5 s · jogo `falha`
> "Mas achar essas empresas na mão é o que trava: abrir o mapa, entrar site por site, caçar telefone."

- **NA TELA:** a cidade em maquete, enorme; o Thiago no centro, com a `lupa`; os `predios` em volta, cada um com um ícone (mapa, site, telefone) piscando; o `relogio` flutuando acima dele, com o ponteiro correndo
- **MOSTRA:** `["personagem", "lupa", "relogio"]`
- **CENÁRIO:** `cidade_maquete`, os carrinhos nas ruas
- **ENTRA AGORA:** o corte pra maquete na palavra "achar"; o `relogio` cai do alto em "trava"
- **OBJETOS SE MEXENDO:** a lupa passa de um prédio pro outro a cada verbo ("mapa", "site", "telefone"), e o ícone daquele prédio acende; o ponteiro do relógio dá várias voltas a partir de "trava"
- **PERSONAGEM:** no centro · começo: `segurando` a lupa, andando de prédio em prédio · na palavra "telefone": `cansado` (suando)
- **INTERAÇÃO:** ele corre com a lupa de prédio em prédio e o relógio corre por cima dele
- **CÂMERA:** alvo `[personagem, relogio]`, centro · `afastando` · médio · direita · alto (antes: revelando, aberto, frente, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Uma por uma" na palavra "trava" · congela em preto e branco
- **SONS:** `clique` em cada ícone · `zumbido` do relógio · `errado` no fim

#### 9 · plano `site` · ~4,5 s · jogo `corrige`
> "Então você usa um site que procura por você: escreve o tipo de empresa e a cidade."

- **NA TELA:** no quarto; o Thiago no `monitor`, à direita; a `tela` de busca subindo do monitor, grande, no centro, com "barbearias" sendo digitado e "Goiânia" na cidade
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** a `tela` sobe do monitor na palavra "site"
- **OBJETOS SE MEXENDO:** "barbearias" é digitado letra por letra a partir de "escreve"; "Goiânia" aparece em "cidade"; o botão "Buscar leads" fica apertado no fim
- **PERSONAGEM:** diante do monitor · começo: `segurando` (digitando) · na palavra "cidade": `apontar` pra tela
- **INTERAÇÃO:** ele digita e a tela responde
- **CÂMERA:** alvo `[tela, personagem]`, centro · `chegando` · médio · frente · olho (antes: afastando, médio, direita, alto; muda movimento, lado e altura)
- **EFEITOS VISUAIS:** sem etiqueta (a tela é o texto)
- **SONS:** `clique` em "escreve" · `clique` no botão

#### 10 · plano `mappoa_rotulo` · ~1,5 s
> "Esse é o *Mappoa*."

- **NA TELA:** na central, o `logo` grande no centro; o `robo` à esquerda dele, acenando; o mapa gigante atrás
- **MOSTRA:** `["logo", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa da parede com pontos brilhando
- **ENTRA AGORA:** o `logo` gira e cresce na palavra "Mappoa"
- **OBJETOS SE MEXENDO:** o logo dá uma volta rápida; o robô acena
- **PERSONAGEM:** o Thiago não aparece (é a vez do robô) · o robô: começo acena · na palavra "Mappoa": aponta o logo
- **INTERAÇÃO:** o robô apresenta o logo
- **CÂMERA:** alvo `logo`, centro · `girando` · perto · direita · olho (antes: chegando, médio, frente)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa"
- **SONS:** `brilho` do rótulo

#### 11 · plano `lista` · ~4 s
> "Ele traz a lista já separada: quem tem site e quem não tem, com os contatos."

- **NA TELA:** o `robo` à esquerda, na frente do mapa; a `tela` com a lista de barbearias (inventadas) no centro-direita, dividida em COM SITE e SEM SITE; as `moedas` de contato voando do mapa pros cartões; o Thiago pequeno à direita
- **MOSTRA:** `["robo", "tela"]`
- **CENÁRIO:** `central_mappoa`, os robôs do fundo nas mesas
- **ENTRA AGORA:** a `tela` desliza da direita na palavra "lista"; as `moedas` saem em "contatos"
- **OBJETOS SE MEXENDO:** os cartões entram um por um a partir de "lista"; o título do grupo COM SITE acende em "tem site", o SEM SITE em "não tem"; as quatro moedas voam em arco e somem nos cartões em "contatos"
- **PERSONAGEM:** o robô: começo aponta o mapa · em "contatos": acena pra tela. O Thiago entra à direita, `surpreso`, na palavra "separada"
- **INTERAÇÃO:** o robô tira as empresas do mapa e separa em dois grupos pro Thiago
- **CÂMERA:** alvo `[robo, tela]`, centro · `passando` · médio · esquerda · olho (antes: girando, perto, direita)
- **EFEITOS VISUAIS:** etiqueta verde "Com os contatos" na palavra "contatos"
- **SONS:** `bip` em cada cartão · `ding` em cada moeda

#### 12 · plano `do_zero` · ~3 s
> "Quem não tem site, você oferece um do zero."

- **NA TELA:** de volta à rua; a Barbearia do Zé no centro, ainda com a placa "Sem site"; o `dono` na porta; o Thiago à esquerda, estendendo a `pedido` "Site novo"
- **MOSTRA:** `["barbearia_sem", "dono", "personagem"]`
- **CENÁRIO:** `cidade`, um carro passando
- **ENTRA AGORA:** a `pedido` sobe até a mão do Thiago na palavra "oferece"
- **OBJETOS SE MEXENDO:** em "zero", a placa vermelha "Sem site" vira de verso e mostra "Site novo" verde, e a vitrine da barbearia acende
- **PERSONAGEM:** em `C.esquerda`, virado pro dono · começo: `chamando` (cumprimenta) · na palavra "zero": `mostrando` (entrega a prancheta). O dono: `surpreso` em "zero"
- **INTERAÇÃO:** ele oferece o site novo e a placa da barbearia vira
- **CÂMERA:** alvo `[barbearia_sem, dono, personagem]`, centro · `chegando` · perto · direita · baixo (antes: passando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta verde "Site do zero" na palavra "zero" · ✓ verde
- **SONS:** `estalo` da placa virando · `certo` no ✓

#### 13 · plano `como_saber` · ~2,5 s · jogo `falha`
> "Mas quem tem site, como saber se é ruim?"

- **NA TELA:** o palco da marca; o `site_velho` no centro, sobre um pedestal, com um "?" enorme em cima; o Thiago à direita, coçando a cabeça
- **MOSTRA:** `["site_velho", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, cartões e pinos flutuando atrás
- **ENTRA AGORA:** o `site_velho` cai do alto no pedestal na palavra "site"; o "?" surge em "ruim"
- **OBJETOS SE MEXENDO:** a tela do site velho troca sozinha entre um site normal e o "EM CONSTRUÇÃO", sem dar pra ter certeza; o "?" balança
- **PERSONAGEM:** à direita do pedestal · começo: `duvida` (olha a tela) · na palavra "ruim": `pensando`
- **INTERAÇÃO:** o site muda na frente dele e ele não consegue decidir
- **CÂMERA:** alvo `[site_velho, personagem]`, centro · `mergulho` · médio · frente · alto (antes: chegando, perto, direita, baixo)
- **EFEITOS VISUAIS:** "?" laranja em cima do site em "ruim" · congela em preto e branco
- **SONS:** `baque` do site no pedestal · `zap` da tela trocando

#### 14 · plano `analise` · ~5 s · jogo `corrige`
> "Então você pede a análise completa: ela aponta o site com cara de modelo pronto ou ainda em construção."

- **NA TELA:** o palco; a `tela` no centro, primeiro com a escolha "Inteligência comercial completa", depois a análise da Barbearia Navalha; o `site_velho` à esquerda; o `robo` à direita, com uma lupa
- **MOSTRA:** `["tela", "site_velho", "robo"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante ao fundo
- **ENTRA AGORA:** a `tela` cai do alto na palavra "análise"; o robô entra pela direita em "aponta"
- **OBJETOS SE MEXENDO:** a opção "completa" fica marcada em "completa"; em "modelo pronto", acende na análise a linha "Site com cara de modelo pronto"; em "construção", a linha "Site em construção"; o robô passa a lupa no site velho
- **PERSONAGEM:** o Thiago na beirada esquerda, ao lado do site velho · começo: `apontar` (escolhe a opção completa) · na palavra "construção": `surpreso`
- **INTERAÇÃO:** o robô examina o site velho e a análise mostra o que está errado nele
- **CÂMERA:** alvo `[tela, site_velho, robo]`, centro · `subindo` · médio · esquerda · olho (antes: mergulho, médio, frente, alto)
- **EFEITOS VISUAIS:** etiqueta laranja "Modelo pronto" (palavra "pronto") · etiqueta vermelha "Em construção" (palavra "construção"); a laranja some quando a vermelha entra
- **SONS:** `clique` em "completa" · `bip` em cada linha acendendo

#### 15 · plano `mensagem` · ~4 s
> "E ele prepara a mensagem falando do site daquela empresa. Você só revisa e envia."

- **NA TELA:** no quarto; a `mensagem` pronta subindo do `monitor`, grande no centro, com o texto "Oi, vi o site da Navalha..." e o botão "Enviar pelo WhatsApp"; o Thiago à esquerda, diante do monitor
- **MOSTRA:** `["mensagem", "personagem"]`
- **CENÁRIO:** `home_office`, a janela de dia atrás
- **ENTRA AGORA:** a `mensagem` sobe do monitor na palavra "prepara"
- **OBJETOS SE MEXENDO:** o texto da mensagem se escreve sozinho a partir de "mensagem"; o nome "Navalha" acende em "daquela"; o botão "Enviar" fica verde e é apertado em "envia"
- **PERSONAGEM:** diante do monitor · começo: `surpreso` (olha a mensagem se escrever) · na palavra "envia": `apontar` (aperta o botão) e depois `vitoria`
- **INTERAÇÃO:** a mensagem chega pronta e ele só aperta enviar
- **CÂMERA:** alvo `[mensagem, personagem]`, centro · `chegando` · perto · direita · baixo (antes: subindo, médio, esquerda, olho)
- **EFEITOS VISUAIS:** ✓ verde ao lado do botão na palavra "envia"
- **SONS:** `clique` do botão · `ding` da mensagem enviada

#### 16 · plano `por_isso` · ~4,5 s
> "É por isso que quem escolhe o cliente não briga por preço: chega mostrando o que a empresa tá perdendo."

- **NA TELA:** o palco; à esquerda, a `preco` pequena e vermelha caindo num monte de cartões cinzas ("quem aparece"); à direita, os `cartoes` verdes das duas barbearias num pódio; o Thiago no meio, mostrando o cartão da Navalha com o site velho
- **MOSTRA:** `["cartoes", "preco", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, os pinos flutuando
- **ENTRA AGORA:** a `preco` cai do alto no monte cinza na palavra "preço"; os `cartoes` verdes sobem do chão em "mostrando"
- **OBJETOS SE MEXENDO:** a etiqueta quica e some no monte em "preço"; o cartão da Navalha cresce na mão do Thiago e solta um "📉 clientes indo embora" em "perdendo"
- **PERSONAGEM:** no meio · começo: `pensando`, olhando a etiqueta cair · na palavra "mostrando": `mostrando` o cartão, depois `vitoria`
- **INTERAÇÃO:** ele larga a briga do preço e mostra pra empresa o que ela perde
- **CÂMERA:** alvo `[cartoes, preco, personagem]`, centro · `revelando` · aberto · frente · olho (antes: chegando, perto, direita, baixo)
- **EFEITOS VISUAIS:** ✗ vermelho na etiqueta de preço em "preço" · etiqueta verde "O que ela perde" na palavra "perdendo"
- **SONS:** `baque` da etiqueta · `brilho` dos cartões subindo · `certo` em "perdendo"

#### 17 · plano `antes_agora` · ~4,5 s · jogo `avanca`
> "Antes, o Thiago esperava quem aparecesse. Agora, ele escolhe pra quem vende."

- **NA TELA:** no quarto; primeiro, em preto e branco, o Thiago sentado olhando o `celular` com "0 mensagens"; depois, colorido, ele de pé diante do `funil` (a campanha do Mappoa, grande acima da mesa) com as barbearias sem site e as de site ruim, puxando um cartão pra "Contato enviado"
- **MOSTRA:** `["personagem", "funil"]`
- **CENÁRIO:** `home_office`, a janela de dia
- **ENTRA AGORA:** a lista acende no monitor na palavra "Agora"; as cores voltam junto
- **OBJETOS SE MEXENDO:** o celular cai da mão dele no "aparecesse"; em "escolhe", um cartão sai do grupo SEM SITE e outro do COM SITE e vão pra um quadro "Campanha" ao lado
- **PERSONAGEM:** começo: `triste`, sentado com o celular · na palavra "Agora": levanta e vai até o monitor, `apontar`, depois `vitoria` em "vende"
- **INTERAÇÃO:** ele larga o celular parado e escolhe os cartões no monitor
- **CÂMERA:** alvo `[personagem, monitor]`, centro · `afastando` · médio · esquerda · olho (antes: revelando, aberto, frente)
- **EFEITOS VISUAIS:** etiqueta verde "Ele escolhe" na palavra "escolhe"
- **SONS:** `avanca` do jogo · `baque` do celular · `festa` em "vende"

#### 18 · plano `segue` · ~5,5 s
> "Você cria site do zero ou reforma site velho? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Thiago no `monitor`, no centro; o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando ao lado; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office`, a mesa e a janela
- **ENTRA AGORA:** o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde no fim
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece grande
- **CÂMERA:** alvo `[personagem, navegador, monitor]`, centro · `parado` · aberto · frente · olho, topo livre (antes: afastando, médio, esquerda)
- **EFEITOS VISUAIS:** cartão de seguir no topo
- **SONS:** `brilho` do cartão · `clique` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Thiago acena e o robô acena ao lado.

**Capa:** o Thiago desesperado segurando a placa "ATENDO QUALQUER UM", com a etiqueta de preço murchando do lado e o site lindo no monitor atrás. Frase: "Por que você *cobra pouco*?" (cabe numa linha: 21 letras).
