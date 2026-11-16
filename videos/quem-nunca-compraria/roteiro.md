# Pare de abordar empresas que nunca comprariam seu serviço: roteiro e ficha de cena

## Roteiro

1. A clínica tá lotada. Se você oferece mais pacientes, ela ri. *(gancho)*
2. Esse é o Pedro. Ele faz anúncio pra clínica de dentista.
3. Se você é o Pedro, pega todas as clínicas da cidade e manda a mesma proposta.
4. Mas uma tá lotada, outra já tem agência, outra fechou. Ninguém responde.
5. Então você só chama quem tem o problema que você resolve: Instagram parado, pouca avaliação.
6. Mas olhar isso clínica por clínica leva a semana inteira.
7. Então você usa um site que procura e analisa pra você: escreve o tipo de empresa e a cidade.
8. Esse é o *Mappoa*.
9. Ele acha as clínicas e traz cada uma com os contatos.
10. Mas lista cheia ainda tem quem nunca compraria. É vender guarda-chuva no deserto.
11. Então você pede a análise completa: ela mostra o quanto cada clínica combina com o que você vende.
12. Essa é a *aderência à oferta*.
13. Nota baixa, fica pra depois. Nota alta, você chama primeiro.
14. Mas até a clínica certa diz: "já tentei anúncio e não deu certo".
15. Então você abre as objeções prováveis e já chega com a resposta pronta.
16. É por isso que vender mais não é mandar mais proposta: é mandar pra quem precisa.
17. Antes, o Pedro mandava pra todo mundo. Agora, ele chama primeiro quem combina.
18. Qual empresa nunca compraria o seu serviço? Comenta aí. No computador, digita mappoa.com e testa você também.

Cerca de 240 palavras, uns 75 a 80 segundos, 18 frases (uns 1.400 caracteres da ElevenLabs; sobram 8.879).

**Opções de gancho:**
- **A (a minha):** "A clínica tá lotada. Se você oferece mais pacientes, ela ri." (conflito na tela no 1º segundo: o dentista rindo da proposta, a agenda cheia atrás; tem humor e já é o assunto do vídeo)
- **B:** "Você mandou proposta pra clínica. Se ela já tem agência, nem responde."
- **C (a frase do dono, direta):** "Pare de abordar empresas que nunca comprariam seu serviço."
A frase do dono vira o título e a capa em qualquer opção.

## O que foi conferido

- "Aderência à oferta", score, dores, objeções prováveis e abordagem recomendada são da análise completa (Inteligência comercial completa) do Mappoa (`canal/produto.md`, `canal/referencias/mappoa-fluxo.md`). O vídeo chama o score de "nota", pra ficar simples
- Nenhum número de captura: a única captura medida é a de designers em São Paulo (99 em 2min 7s). Aqui são clínicas, então a lista não diz quantas vieram
- O Mappoa não manda nada sozinho: ele mostra a análise e a resposta; quem chama é o Pedro (frases 13, 15 e 17)
- O vídeo não promete venda: fala em "chamar primeiro quem combina"
- O nome Mappoa só aparece depois de mostrar o que ele faz (frase 7 → 8)
- Sem preço e sem plano. Empresas da tela todas inventadas

## Ficha de cena

**Cenários (seis, com `K.cenarios`):** `clinica_odonto` (1, 14, 15: o cliente), `sala_reuniao` (2, 6, 7, 17, 18: o escritório do Pedro, com a TV na parede), `cidade_maquete` (3 a 5: a cidade toda de clínicas), `central_mappoa` (8 e 9: o robô trabalhando), `deserto` (10: a piada do guarda-chuva), `mundo_mappoa` (11 a 13 e 16: a análise e a peneira).
**Hora:** interior; o deserto de dia. **Personagem:** o do canal, chamado Pedro, gestor de tráfego. **O dentista:** `K.boneco({ tipo: 'doutor' })`. **O robô é ajudante:** só entra com o Mappoa (frase 8 em diante).

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Pedro | `K.boneco`, cores do canal | 1,47 | muda por cenário | todas menos a 8 |
| `dentista` | o dono da clínica | `K.boneco({ tipo: 'doutor' })` | 1,6 | atrás do balcão da clínica | 1, 14, 15 |
| `agenda` | agenda da clínica toda marcada | `K.telaCanvas` numa placa (grade de dias, todos com ✕ vermelho, "LOTADA") | 1,2 × 0,9, branca e vermelha | na parede atrás do dentista | 1 |
| `proposta` | cartaz da proposta "+ pacientes" | `K.telaCanvas` numa placa | 0,8 × 0,55, azul | na mão do Pedro | 1 |
| `computador` | notebook do Pedro | `K.m3d('notebook')` | escala do canal | mesa da sala | 2, 7, 17, 18 |
| `predios` | as clínicas da cidade em miniatura | `K.m3d('prediozinho', { placa })` × 6 | 1,2 de altura, placas "Clínica" | espalhados na maquete | 3, 4, 5 |
| `envelopes` | propostas iguais voando | `K.m3d('envelope')` × 6 | 0,4, brancos | saem do Pedro pros prédios | 3, 4 |
| `placas` | os avisos das três clínicas | `K.etiqueta` em cima de cada prédio | vermelho | em cima de 3 prédios | 4 |
| `lupa` | lupa grande | `K.lupaMappoa` | 1,2 | na mão do Pedro, sobre a maquete | 5 |
| `relogio` | relógio com o ponteiro correndo | `K.m3d('relogio_parede')` | 1,2 | parede da sala | 6 |
| `papeis` | pilha de papéis com prints de clínicas | `K.m3d('pilha_papeis')` | 0,8 | na mesa | 6 |
| `calendario` | calendário passando as folhas | `K.m3d('calendario')` | 0,9 | ao lado do relógio | 6 |
| `tela` | painel com as telas do Mappoa | `K.painelMappoa(1.56, 2.6)` | 1,56 × 2,6 | muda por frase | 7, 9, 11, 12, 15 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central e mundo | 8, 9, 11, 13, 18 |
| `logo` | logo 3D | `K.logoMappoa` | 1,6 | centro da central | 8 |
| `moedas` | moedas de contato voando pra tela | `K.moedaContatoMappoa` (whats, tel, insta, site) | 0,45 | da maquete do mapa até a tela | 9 |
| `guardachuva` | guarda-chuva aberto | `K.pecas` (funil + cilindro), como no modelo-de-cena | 1,1 de diâmetro, azul | na mão do Pedro | 10 |
| `sol` | sol forte com ondas de calor | `K.halo` + `K.ondas` | amarelo | no alto | 10 |
| `cacto` | cacto do deserto | `K.pecas` (cilindros verdes) | 1,8 | à direita do Pedro | 10 |
| `peneira` | peneira separando os cartões | `K.peneiraMappoa` | 1,2 | no alto do palco | 13 |
| `cartoes` | cartões de clínica caindo | `K.cartaoLeadMappoa` × 6 | 0,6 | da peneira pros dois montes | 13 |
| `balao` | balão de fala da objeção | `K.telaCanvas` numa placa (balão branco) | 1,4 × 0,6 | acima do dentista | 14 |
| `alvo_clinica` | a clínica certa acendendo | `K.m3d('prediozinho')` verde | 1,4 | centro do palco | 16 |
| `pilha_envelopes` | montanha de envelopes cinzas | `K.m3d('envelope')` × 10 | 0,4, cinzas | à esquerda, no chão | 16 |
| `tv` | a TV da sala com o funil | `C.lugares.tv` + `K.painelMappoa` largo com a tela `funil` | 2,5 × 1,56 | parede da sala | 17 |
| `navegador` | barra grande com mappoa.com | `K.telaCanvas` | 2,4 × 0,4 | em cima do notebook | 18 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| clínica (lotada), pacientes | 1 | `dentista`, `agenda` com "LOTADA", `proposta` "+ pacientes" |
| anúncio, clínica de dentista | 2 | `computador` com um anúncio de dente; o dente da clínica na TV |
| clínicas da cidade, proposta | 3 | `predios` com placa "Clínica" e `envelopes` iguais |
| lotada, agência, fechou | 4 | `placas` nos três prédios |
| Instagram parado, pouca avaliação | 5 | etiquetas nos prédios que acendem; ícone do Instagram e estrelas |
| semana inteira | 6 | `calendario` passando as folhas e `relogio` correndo |
| site, tipo de empresa, cidade | 7 | `computador` e `tela` de busca: "clínicas odontológicas", "Campinas" |
| Mappoa | 8 | `logo` e `robo` |
| clínicas, contatos | 9 | `tela` de lista e `moedas` de contato |
| guarda-chuva, deserto | 10 | `guardachuva`, cenário `deserto`, `sol`, `cacto` |
| análise completa | 11 | `tela` enriquecer → análise |
| aderência à oferta | 12 | a barra da `tela` de análise, de perto |
| nota baixa, nota alta | 13 | `peneira` e `cartoes` com a nota |
| "já tentei anúncio" | 14 | `balao` em cima do `dentista` |
| objeções prováveis, resposta | 15 | `tela` de análise com o bloco das objeções e a abordagem |
| proposta (mais), quem precisa | 16 | `pilha_envelopes` e `alvo_clinica` |
| todo mundo, quem combina | 17 | `tv` com o funil, só as clínicas de nota alta |
| computador, mappoa.com | 18 | `computador`, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3 s
> "A clínica tá lotada. Se você oferece mais pacientes, ela ri."

- **NA TELA:** a recepção da clínica; o `dentista` no centro, atrás do balcão; a `agenda` toda marcada na parede atrás dele, com "LOTADA"; o Pedro à direita, de frente pro dentista, segurando a `proposta` "+ pacientes"
- **MOSTRA:** `["dentista", "agenda", "personagem"]`
- **CENÁRIO:** `clinica_odonto`; o dente gigante na parede, a cadeira de dentista no fundo, as cadeiras de espera
- **ENTRA AGORA:** a `agenda` já está lá (o conflito no 1º segundo); a `proposta` sobe até a mão do Pedro na palavra "oferece"
- **OBJETOS SE MEXENDO:** os ✕ vermelhos da agenda aparecem um atrás do outro no 1º segundo, até "LOTADA" piscar na palavra "lotada"; a proposta treme quando o dentista ri
- **PERSONAGEM:** Pedro à direita do balcão, olhando o dentista · começo: `mostrando` (estende a proposta) · na palavra "ri": `susto`. O dentista: começo `pensando` · na palavra "ri": `vitoria` (gargalhando, corpo balançando)
- **INTERAÇÃO:** o Pedro estende a proposta; o dentista aponta a agenda cheia e ri da cara dele
- **CÂMERA:** alvo `[dentista, agenda, personagem]`, centro, ocupando 2/3 da altura · `mergulho` · médio · frente · alto, topo livre (espacoCima 0,38) pro título
- **EFEITOS VISUAIS:** etiqueta vermelha "Agenda lotada" na palavra "lotada" · "HAHA" laranja em cima do dentista na palavra "ri"
- **SONS:** `zap` dos ✕ entrando (1º segundo) · `errado` na palavra "ri"

#### 2 · plano `pedro` · ~3 s
> "Esse é o Pedro. Ele faz anúncio pra clínica de dentista."

- **NA TELA:** a sala de reunião do Pedro; ele no centro, à frente da mesa; o `computador` aberto à esquerda dele, com um anúncio de clínica (um dente e "Agende já") na tela
- **MOSTRA:** `["personagem", "computador"]`
- **CENÁRIO:** `sala_reuniao`; a mesa comprida e a TV com gráfico atrás
- **ENTRA AGORA:** o anúncio aparece na tela do notebook na palavra "anúncio"
- **OBJETOS SE MEXENDO:** o anúncio pisca e sobe uma curtida na tela do notebook na palavra "dentista"
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera · começo: `chamando` (acena, se apresentando) · na palavra "anúncio": `mostrando` (aponta o notebook)
- **INTERAÇÃO:** ele mostra o anúncio que fez no notebook
- **CÂMERA:** alvo `[personagem, notebook]`, centro · `chegando` · perto · esquerda · olho (antes: mergulho, médio, frente, alto)
- **EFEITOS VISUAIS:** etiqueta azul "Gestor de tráfego" na palavra "Pedro"
- **SONS:** `ding` na etiqueta · `clique` na palavra "anúncio"

#### 3 · plano `dispara` · ~4 s
> "Se você é o Pedro, pega todas as clínicas da cidade e manda a mesma proposta."

- **NA TELA:** a cidade em maquete; o Pedro à esquerda, no meio das ruas; seis `predios` com a placa "Clínica" espalhados; os `envelopes` iguais saindo dele em arco, um pra cada prédio
- **MOSTRA:** `["personagem", "predios", "envelopes"]`
- **CENÁRIO:** `cidade_maquete`, com os carrinhos andando nas ruas
- **ENTRA AGORA:** os `predios` brotam do chão na palavra "clínicas", um por um; os `envelopes` saem na palavra "manda"
- **OBJETOS SE MEXENDO:** os seis envelopes voam em arco da mão do Pedro até cada prédio, um a cada 0,15 s, a partir de "manda"
- **PERSONAGEM:** em `C.esquerda` · começo: `pensando` (olha a cidade) · na palavra "manda": `empurrando` (lança os envelopes)
- **INTERAÇÃO:** ele joga a mesma proposta em todas as clínicas
- **CÂMERA:** alvo `[personagem, predios]`, centro · `passando` · médio · direita · olho (antes: chegando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta laranja "A mesma proposta" na palavra "mesma"
- **SONS:** `bip` em cada prédio brotando · `whoosh` em cada envelope

#### 4 · plano `ninguem` · ~4 s · jogo `falha`
> "Mas uma tá lotada, outra já tem agência, outra fechou. Ninguém responde."

- **NA TELA:** a maquete vista de cima; três prédios no centro com etiqueta vermelha em cima; os envelopes batendo neles e caindo no chão; o Pedro embaixo, à direita, esperando
- **MOSTRA:** `["predios", "personagem"]`
- **CENÁRIO:** `cidade_maquete`, de cima, os carrinhos passando
- **ENTRA AGORA:** etiqueta "Lotada" no 1º prédio (palavra "lotada"), "Já tem agência" no 2º (palavra "agência"), "Fechou" no 3º (palavra "fechou")
- **OBJETOS SE MEXENDO:** em cada palavra, o envelope daquele prédio quica e cai; o 3º prédio apaga as luzes (`K.falhar` 'apaga') em "fechou"
- **PERSONAGEM:** à direita dos prédios, olhando pra eles · começo: `duvida` · na palavra "Ninguém": `triste`
- **INTERAÇÃO:** as clínicas devolvem os envelopes e ele murcha
- **CÂMERA:** alvo `[predios, personagem]`, centro · `descendo` · aberto · frente · cima (antes: passando, médio, direita, olho)
- **EFEITOS VISUAIS:** as três etiquetas vermelhas (no máximo 2 juntas: a 1ª some quando entra a 3ª) · ✗ vermelho na palavra "Ninguém" · congela em preto e branco (o jogo)
- **SONS:** `baque` em cada envelope · `desliga` no prédio apagando · `errado` em "Ninguém"

#### 5 · plano `filtro` · ~4,5 s · jogo `corrige`
> "Então você só chama quem tem o problema que você resolve: Instagram parado, pouca avaliação."

- **NA TELA:** a maquete de perto; o Pedro com a `lupa` grande na mão, no centro; dois prédios na frente dele acendendo em verde; os outros ficam cinzas
- **MOSTRA:** `["lupa", "personagem", "predios"]`
- **CENÁRIO:** `cidade_maquete`, uma rua com dois prédios
- **ENTRA AGORA:** a `lupa` desliza até a mão dele na palavra "chama"
- **OBJETOS SE MEXENDO:** a lupa passa da esquerda pra direita por cima dos prédios; o 1º prédio acende verde na palavra "Instagram", o 2º na palavra "avaliação"; os outros desbotam
- **PERSONAGEM:** em `C.personagem` · começo: `segurando` a lupa · na palavra "avaliação": `ideia`
- **INTERAÇÃO:** ele passa a lupa e os prédios certos acendem onde ela passa
- **CÂMERA:** alvo `[lupa, personagem]`, centro · `subindo` · médio · esquerda · baixo (antes: descendo, aberto, frente, cima)
- **EFEITOS VISUAIS:** etiqueta laranja "Instagram parado" (palavra "Instagram") · etiqueta laranja "Pouca avaliação" (palavra "avaliação"), cada uma em cima do seu prédio
- **SONS:** `whoosh` da lupa · `brilho` em cada prédio acendendo

#### 6 · plano `semana` · ~3 s · jogo `falha`
> "Mas olhar isso clínica por clínica leva a semana inteira."

- **NA TELA:** na sala, o Pedro na mesa, no centro, atrás da `papeis` crescendo; o `relogio` na parede com o ponteiro rodando rápido; o `calendario` ao lado, soltando as folhas
- **MOSTRA:** `["relogio", "calendario", "personagem"]`
- **CENÁRIO:** `sala_reuniao`, a mesa comprida
- **ENTRA AGORA:** a pilha de `papeis` cresce na palavra "clínica"; o calendário começa a soltar folhas na palavra "semana"
- **OBJETOS SE MEXENDO:** os ponteiros dão várias voltas a partir de "olhar"; cinco folhas do calendário voam (seg, ter, qua, qui, sex) a partir de "semana"
- **PERSONAGEM:** atrás da mesa · começo: `pensando` (mexendo nos papéis) · na palavra "inteira": `cansado` (suando)
- **INTERAÇÃO:** a pilha cresce na frente dele e o relógio corre por cima dele
- **CÂMERA:** alvo `[relogio, calendario, personagem]`, centro · `chegando` · perto · direita · alto (antes: subindo, médio, esquerda, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Uma por uma" na palavra "clínica" · congela em preto e branco
- **SONS:** `zumbido` do relógio · `whoosh` das folhas

#### 7 · plano `site` · ~4,5 s · jogo `corrige`
> "Então você usa um site que procura e analisa pra você: escreve o tipo de empresa e a cidade."

- **NA TELA:** a sala; o Pedro no `computador`, à direita; a `tela` de busca subindo do notebook, grande, no centro, com "clínicas odontológicas" sendo digitado e "Campinas" na cidade
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `sala_reuniao`, a ponta da mesa
- **ENTRA AGORA:** a `tela` sobe do notebook na palavra "site"
- **OBJETOS SE MEXENDO:** o nicho é digitado letra por letra a partir de "escreve"; a cidade aparece em "cidade"; o botão "Buscar leads" fica apertado no fim
- **PERSONAGEM:** diante do notebook · começo: `segurando` (digitando) · na palavra "cidade": `apontar` pra tela
- **INTERAÇÃO:** ele digita e a tela responde
- **CÂMERA:** alvo `[tela, personagem]`, centro · `revelando` · médio · frente · olho (antes: chegando, perto, direita, alto)
- **EFEITOS VISUAIS:** sem etiqueta (a tela é o texto)
- **SONS:** `clique` em "escreve" · `clique` no botão

#### 8 · plano `mappoa_rotulo` · ~1,5 s
> "Esse é o *Mappoa*."

- **NA TELA:** na central, o `logo` grande no centro; o `robo` à esquerda dele, acenando; o mapa gigante atrás
- **MOSTRA:** `["logo", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa da parede com pontos brilhando
- **ENTRA AGORA:** o `logo` gira e cresce na palavra "Mappoa"
- **OBJETOS SE MEXENDO:** o logo dá uma volta rápida; o robô acena
- **PERSONAGEM:** o Pedro não aparece (é a vez do robô ser apresentado) · o robô: começo acena · na palavra "Mappoa": aponta o logo
- **INTERAÇÃO:** o robô apresenta o logo
- **CÂMERA:** alvo `logo`, centro · `girando` · perto · direita · olho (antes: revelando, médio, frente)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa"
- **SONS:** `brilho` do rótulo

#### 9 · plano `contatos` · ~3 s
> "Ele acha as clínicas e traz cada uma com os contatos."

- **NA TELA:** o `robo` à esquerda, na frente do mapa; a `tela` com a lista de clínicas (inventadas) à direita; as `moedas` de contato (WhatsApp, telefone, Instagram, site) voando do mapa pra dentro dos cartões da lista
- **MOSTRA:** `["robo", "tela"]`
- **CENÁRIO:** `central_mappoa`, os robôs do fundo trabalhando nas mesas
- **ENTRA AGORA:** a `tela` desliza da direita na palavra "clínicas"; as `moedas` saem na palavra "contatos"
- **OBJETOS SE MEXENDO:** os cartões da lista entram um por um (n de 0 a 4) a partir de "acha"; as moedas voam em arco e somem no cartão
- **PERSONAGEM:** o robô opera o mapa (começo: aponta o mapa · na palavra "contatos": acena pra tela); o Pedro entra pequeno à direita, `surpreso`, na palavra "traz"
- **INTERAÇÃO:** o robô tira os contatos do mapa e manda pra lista
- **CÂMERA:** alvo `[robo, tela]`, centro · `passando` · médio · esquerda · olho (antes: girando, perto, direita)
- **EFEITOS VISUAIS:** etiqueta verde "Com os contatos" na palavra "contatos"
- **SONS:** `bip` em cada cartão · `ding` em cada moeda

#### 10 · plano `deserto` · ~4 s · jogo `falha`
> "Mas lista cheia ainda tem quem nunca compraria. É vender guarda-chuva no deserto."

- **NA TELA:** o deserto de dia; o Pedro no centro com o `guardachuva` aberto, oferecendo; o `cacto` à direita dele; o `sol` enorme no alto, com ondas de calor
- **MOSTRA:** `["personagem", "guardachuva", "cacto"]`
- **CENÁRIO:** `deserto`, as dunas e o calor tremendo o ar
- **ENTRA AGORA:** o corte pro deserto na palavra "nunca"; o `guardachuva` abre na palavra "guarda-chuva"
- **OBJETOS SE MEXENDO:** o guarda-chuva abre de fechado pra aberto (escala de 0,2 a 1); as ondas de calor sobem; o cacto balança "não" de um lado pro outro na palavra "deserto"
- **PERSONAGEM:** em `C.personagem`, virado pro cacto · começo: `mostrando` (oferece o guarda-chuva) · na palavra "deserto": `cansado` (suando)
- **INTERAÇÃO:** ele oferece o guarda-chuva pro cacto e o cacto recusa
- **CÂMERA:** alvo `[personagem, guardachuva, cacto]`, centro · `chegando` · aberto · direita · baixo (antes: passando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Nunca compraria" na palavra "nunca" · congela em preto e branco
- **SONS:** `whoosh` do corte · `estalo` do guarda-chuva abrindo · `errado` em "deserto"

#### 11 · plano `analise` · ~4,5 s · jogo `corrige`
> "Então você pede a análise completa: ela mostra o quanto cada clínica combina com o que você vende."

- **NA TELA:** o palco da marca; a `tela` no centro, primeiro com a escolha "Inteligência comercial completa", depois a análise da clínica com a barra de aderência enchendo; o `robo` à esquerda; o Pedro à direita
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, cartões e pinos flutuando atrás
- **ENTRA AGORA:** a `tela` cai do alto na palavra "análise"; troca pra análise na palavra "mostra"
- **OBJETOS SE MEXENDO:** a opção "completa" fica marcada em "completa"; a barra de aderência enche de 0 a 82% a partir de "combina"
- **PERSONAGEM:** à direita da tela · começo: `apontar` (escolhe a opção) · na palavra "combina": `surpreso`
- **INTERAÇÃO:** ele aperta a opção e a tela mostra a análise
- **CÂMERA:** alvo `[tela, personagem]`, centro · `subindo` · médio · frente · olho (antes: chegando, aberto, direita, baixo)
- **EFEITOS VISUAIS:** brilho azul em volta da tela em "mostra"
- **SONS:** `clique` em "completa" · `liga` na barra enchendo

#### 12 · plano `aderencia_rotulo` · ~1,5 s
> "Essa é a *aderência à oferta*."

- **NA TELA:** a barra "Aderência à sua oferta" bem grande, ocupando o meio da tela (a `tela` de perto)
- **MOSTRA:** `["tela"]`
- **CENÁRIO:** `mundo_mappoa`, desfocado pelo enquadramento
- **ENTRA AGORA:** nada novo; o brilho amarelo na barra
- **OBJETOS SE MEXENDO:** a barra pulsa uma vez quando o nome aparece
- **PERSONAGEM:** a mão do Pedro entra pela direita, apontando a barra (`apontar`)
- **INTERAÇÃO:** ele aponta a barra
- **CÂMERA:** alvo a barra da `tela` (ponto no alto da tela), centro · `girando` · perto · esquerda · olho (antes: subindo, médio, frente)
- **EFEITOS VISUAIS:** rótulo amarelo "Aderência à oferta"
- **SONS:** `brilho` do rótulo

#### 13 · plano `peneira` · ~3 s
> "Nota baixa, fica pra depois. Nota alta, você chama primeiro."

- **NA TELA:** a `peneira` no alto, segurada pelo `robo`; os `cartoes` caindo: os de nota baixa (cinzas) escorregam pra esquerda num monte "Depois"; os de nota alta (verdes) sobem pra direita num pódio "Primeiro"; o Pedro embaixo, à direita
- **MOSTRA:** `["peneira", "cartoes", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante ao fundo
- **ENTRA AGORA:** a `peneira` cai na 1ª palavra; os cartões cinzas em "baixa"; os verdes em "alta"
- **OBJETOS SE MEXENDO:** a peneira balança; 3 cartões cinzas caem pra esquerda a partir de "baixa"; 3 verdes sobem pra direita a partir de "alta"
- **PERSONAGEM:** à direita · começo: `duvida` · na palavra "primeiro": `vitoria`, pegando o 1º cartão verde
- **INTERAÇÃO:** o robô peneira e o Pedro pega o cartão de cima
- **CÂMERA:** alvo `[peneira, cartoes, personagem]`, centro · `mergulho` · aberto · frente · alto (antes: girando, perto, esquerda)
- **EFEITOS VISUAIS:** etiqueta vermelha "Depois" (palavra "depois") · etiqueta verde "Primeiro" (palavra "primeiro")
- **SONS:** `whoosh` da peneira · `errado` baixinho em "depois" · `certo` em "primeiro"

#### 14 · plano `objecao` · ~3 s · jogo `falha`
> "Mas até a clínica certa diz: "já tentei anúncio e não deu certo"."

- **NA TELA:** de volta à clínica; o `dentista` no centro, de braços cruzados; o `balao` de fala acima dele com a frase; o Pedro à esquerda
- **MOSTRA:** `["dentista", "balao", "personagem"]`
- **CENÁRIO:** `clinica_odonto`, a recepção vazia (agora não é a lotada)
- **ENTRA AGORA:** o `balao` cresce acima do dentista na palavra "diz"
- **OBJETOS SE MEXENDO:** a frase do balão se escreve; o balão treme em "não deu certo"
- **PERSONAGEM:** à esquerda do balcão · começo: `chamando` (cumprimenta) · na palavra "certo" (a última): `susto`. O dentista: `bravo`, cruzando os braços
- **INTERAÇÃO:** o dentista barra o Pedro com a objeção
- **CÂMERA:** alvo `[dentista, balao, personagem]`, centro · `chegando` · médio · esquerda · olho (antes: mergulho, aberto, frente, alto)
- **EFEITOS VISUAIS:** o balão · congela em preto e branco
- **SONS:** `bip` do balão · `errado` no fim

#### 15 · plano `resposta` · ~4 s · jogo `corrige`
> "Então você abre as objeções prováveis e já chega com a resposta pronta."

- **NA TELA:** na clínica, a `tela` de análise flutuando ao lado do Pedro, com o bloco "OBJEÇÕES PROVÁVEIS" ("Já tentei anúncio e não funcionou") e a "Abordagem recomendada" embaixo; o dentista à direita descruza os braços
- **MOSTRA:** `["tela", "personagem", "dentista"]`
- **CENÁRIO:** `clinica_odonto`, o balcão
- **ENTRA AGORA:** a `tela` sobe do chão ao lado do Pedro na palavra "abre"
- **OBJETOS SE MEXENDO:** o bloco das objeções acende em "objeções"; a abordagem aparece em "resposta"
- **PERSONAGEM:** à esquerda da tela · começo: `mostrando` a tela · na palavra "pronta": `ideia`. O dentista: começo `bravo` · em "pronta": `surpreso`
- **INTERAÇÃO:** o Pedro mostra a resposta e o dentista se interessa
- **CÂMERA:** alvo `[tela, personagem]`, centro · `subindo` · perto · direita · baixo (antes: chegando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** ✓ verde ao lado da tela na palavra "pronta"
- **SONS:** `clique` em "abre" · `certo` em "pronta"

#### 16 · plano `por_isso` · ~4 s
> "É por isso que vender mais não é mandar mais proposta: é mandar pra quem precisa."

- **NA TELA:** o palco; à esquerda, a `pilha_envelopes` cinzas, enorme e esquecida; à direita, a `alvo_clinica` verde, acesa; o Pedro no meio, mandando um envelope só pra ela
- **MOSTRA:** `["pilha_envelopes", "alvo_clinica", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, os pinos flutuando
- **ENTRA AGORA:** a pilha cai do alto na palavra "proposta"; a clínica verde sobe do chão na palavra "precisa"
- **OBJETOS SE MEXENDO:** a pilha desmorona um pouco; um envelope sai da mão do Pedro e entra na porta da clínica verde, que acende e solta um balão de conversa, na palavra "precisa"
- **PERSONAGEM:** no meio · começo: `pensando` olhando a pilha · na palavra "precisa": `empurrando` (manda o envelope) e depois `vitoria`
- **INTERAÇÃO:** ele ignora a pilha e manda um envelope só, pra clínica certa
- **CÂMERA:** alvo `[pilha_envelopes, alvo_clinica, personagem]`, centro · `revelando` · médio · frente · alto (antes: subindo, perto, direita, baixo)
- **EFEITOS VISUAIS:** etiqueta laranja "Pra quem precisa" na palavra "precisa"
- **SONS:** `baque` da pilha · `whoosh` do envelope · `ding` da clínica

#### 17 · plano `antes_agora` · ~4 s · jogo `avanca`
> "Antes, o Pedro mandava pra todo mundo. Agora, ele chama primeiro quem combina."

- **NA TELA:** na sala, primeiro o Pedro jogando envelopes pra todo lado, em preto e branco; depois a `tv` na parede com o funil, as clínicas de nota alta em "Novos", e ele na frente arrastando um cartão pra "Contato enviado"
- **MOSTRA:** `["tv", "personagem"]`
- **CENÁRIO:** `sala_reuniao`
- **ENTRA AGORA:** o funil acende na `tv` na palavra "Agora"
- **OBJETOS SE MEXENDO:** um cartão desliza de "Novos" pra "Contato enviado" na palavra "combina"
- **PERSONAGEM:** começo: `empurrando` envelopes, em preto e branco · na palavra "Agora": vai até a TV, `mostrando`
- **INTERAÇÃO:** ele arrasta o cartão no funil
- **CÂMERA:** alvo `[tv, personagem]`, centro · `afastando` · médio · esquerda · olho (antes: revelando, médio, frente, alto)
- **EFEITOS VISUAIS:** etiqueta verde "Quem combina primeiro" na palavra "combina"
- **SONS:** `avanca` do jogo · `certo` em "combina"

#### 18 · plano `segue` · ~5 s
> "Qual empresa nunca compraria o seu serviço? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Pedro no `computador`, no centro; o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando ao lado; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "computador"]`
- **CENÁRIO:** `sala_reuniao`, a mesa
- **ENTRA AGORA:** o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece grande
- **CÂMERA:** alvo `[personagem, navegador, notebook]`, centro · `parado` · aberto · frente · olho, topo livre (antes: afastando, médio, esquerda)
- **EFEITOS VISUAIS:** cartão de seguir no topo
- **SONS:** `brilho` do cartão · `clique` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Pedro acena e o robô acena ao lado.

**Capa:** o Pedro desesperado com a proposta na mão, e o dentista rindo atrás do balcão com a agenda LOTADA. Frase: "Quem *nunca* compra?".
