# Vendedor de software sem clientes: roteiro e ficha de cena

> Pra quem vende software ou sistema (SaaS, sistema de gestão, de agendamento). ~75 s. Gancho no estilo do canal:
> situação + "se você fizer X, acontece Y", com o conflito na tela no 1º segundo; depois o personagem ("Esse é o
> Rafa..."). O Mappoa é apresentado pelo que faz antes do nome (quem assiste nunca viu). Fecha com "Antes... Agora...",
> a pergunta pros comentários e o fim no computador com mappoa.com.

## Roteiro

1. A dona do salão abriu sua mensagem. Se diz "conheça nosso sistema", ela apaga. *(gancho)*
2. Esse é o Rafa. Ele vende um sistema de agendamento, mas ninguém compra.
3. Se você é o Rafa, manda a mesma mensagem pra todo contato do celular.
4. Mas a padaria não marca horário, e a loja de roupa nem lê.
5. Então você manda só pra quem vive de horário marcado: salão, barbearia, clínica.
6. Esse é o *cliente ideal*.
7. Mas achar todos eles na mão leva o dia inteiro: Google, site, Instagram, planilha.
8. Então você usa um site que procura as empresas pra você.
9. Você escreve "salões de beleza em Curitiba", e vem a lista, com WhatsApp e Instagram quando estão públicos.
10. Esse é o *Mappoa*.
11. Mas a lista não vende sozinha: se a mensagem só fala do sistema, vai pro lixo.
12. Então você fala da dor dela: "Vi que vocês marcam pelo WhatsApp. Quantas clientes faltam sem avisar?"
13. No Mappoa, cada empresa vem com as dores dela, e a mensagem já sai pronta pra você mandar.
14. É por isso que ninguém compra um sistema: compra o problema resolvido.
15. Igual academia: ninguém paga pela esteira, paga pela calça que volta a servir.
16. Antes, o Rafa mandava "conheça nosso sistema" pra qualquer um. Agora, ele acha os salões certos e fala da dor de
    cada um.
17. Pra que tipo de empresa você vende o seu sistema? Comenta aí. No computador, digita mappoa.com e testa você também.

~225 palavras, uns 72 a 78 segundos. 3 ciclos "Mas → Então", cada problema nascendo da solução anterior: mandou pra todo
mundo → ninguém precisa (cliente ideal) → achar todos na mão demora (Mappoa) → a lista sem a mensagem certa não vende
(falar da dor).

Temperos: quebra de mito ("ninguém compra um sistema: compra o problema resolvido"), "é por isso que" (frase 14),
comparação caseira com humor (a esteira e a calça que volta a servir), situação concreta (clientes que faltam sem
avisar).

## Conferido com o produto (`canal/produto.md`)

- O Mappoa é descrito antes do nome ("um site que procura as empresas pra você") e depois nomeado (aprendizados:
  quem assiste nunca viu)
- Busca por segmento e cidade (passo 1); WhatsApp e Instagram "quando estão públicos" (nem todo lead tem tudo); as
  dores de cada empresa vêm da análise da IA (passo 3); a mensagem pronta é o passo 5. "Pronta pra você mandar": quem
  manda é o Rafa, o Mappoa não envia sozinho
- Nenhum número de vendas, nenhuma promessa de que todo salão compra, nada de preço nem plano
- Fim no computador com mappoa.com (aprendizados: nunca "link da Bio")

## Ficha de cena

**Cenário:** `escritorio` (tema: trabalho, empresa), de dia. As duas mesas viram dois lugares: a da **esquerda**
(`C.lugares.mesa`, x -3,6) é a mesa do Rafa, e a da **direita** (`C.lugares.mesa2`, x 3,4) vira o **salão da Bia**
(espelho, cadeira de salão e a placa "Salão da Bia"). Entre as duas, a **divisória** baixa no meio da sala, como uma
tela dividida: as mensagens atravessam por cima dela. Peças do cenário que entram nas frases: o janelão com a cidade
(frases 2 e 16), o quadro branco (frase 7, as horas passando), o computador da mesa (8, 9, 17).
Foto: `referencias/cenarios/escritorio.jpg`.
**Hora:** dia. **Personagens:** o do canal (menino de camiseta azul), que no vídeo se chama **Rafa**, quase sempre na
frente da mesa da esquerda; e **a Bia**, dona do salão (`K.boneco({ tipo: 'menina' })`), na frente da mesa da direita.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Rafa | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | na frente da mesa da esquerda (~[-3,6, 0, -1,4]) | todas |
| `bia` | a dona do salão | `K.boneco({ tipo: 'menina' })` + `K.nomear` | 1,47, vestido vermelho | na frente da mesa da direita (~[3,4, 0, -1,6]) | 1, 11, 12, 16 |
| `divisoria` | a parede baixa que separa o Rafa do salão | `K.pecas`: caixa | 0,15 × 2,6 × 3,5, cinza-claro `#d9dde2` | no meio da sala, x 0 | todas (fundo) |
| `salao` | o canto do salão: espelho redondo, cadeira de salão vermelha e a placa "Salão da Bia" | grupo de `K.pecas` + `K.placa` + `K.nomear` | espelho raio 0,5; cadeira 0,6 × 1,0; placa 1,6 × 0,5 | na parede atrás da mesa da direita | 1, 5, 11, 12, 16 |
| `celular` | o celular do Rafa | `K.celular()` + `K.nomear`, escala 2,2 | tela na cor do canal | na mão direita do Rafa | 3, 4 |
| `celular_bia` | o celular da Bia, onde a mensagem chega | `K.celular()` + `K.nomear`, escala 2,4, tela desenhada (a conversa do WhatsApp) | tela branca com balão verde | na mão da Bia, virado pra câmera | 1, 12 |
| `contatos` | 3 cartões: "Padaria", "Loja de roupa", "Mecânica", cada um com o ícone | 3 `K.placa` num grupo + `K.nomear` | 1,0 × 0,55 cada, brancos | em leque, do lado direito da divisória | 3, 4 (somem na 5) |
| `ideais` | 3 cartões com relógio: "Salão", "Barbearia", "Clínica" | 3 `K.placa` num grupo + `K.nomear` | 1,0 × 0,55 cada, brancos com borda verde | em leque, no mesmo lugar dos contatos | 5, 6 |
| `abas` | as 4 tarefas na mão: "Google", "Site", "Instagram", "Planilha" | 4 `K.placa` girando em volta do Rafa + `K.nomear` | 0,8 × 0,45 cada, coloridas | em roda em volta dele | 7 |
| `relogio` | o relógio de parede que corre as horas | `K.pecas`: cilindro + 2 caixas (ponteiros) | raio 0,45, branco com aro preto | na parede, acima do quadro branco | 7 |
| `computador` | o computador do Rafa (tela desenhada: a busca, mappoa.com) | `K.computador()` em cima da mesa da esquerda + `K.nomear` | tela 0,7 | em cima da mesa da esquerda | 8, 9, 13, 17 |
| `lista` | o painel grande do Mappoa com os salões enchendo (nome, bairro, ícone de WhatsApp e Instagram) | `K.telaCanvas` num grupo + `K.nomear` | 2,2 × 2,8, branco com a barra na cor do canal `#2fb5a6` | em pé, acima do computador | entra na 9; fica até a 10; volta na 16 |
| `envelope` | a mensagem "Conheça nosso sistema" virando envelope | `K.placa` desenhada + `K.nomear` | 0,9 × 0,6, branco | voa do Rafa pro salão | 11 |
| `lixeira` | a lixeira do lado da Bia | `K.pecas`: tubo cinza + aro | raio 0,3, altura 0,6, cinza `#7d8590` | no chão, do lado da Bia | 11 |
| `balao` | o balão de fala do Rafa com a mensagem certa | `K.placa` desenhada + `K.nomear` | 2,4 × 1,0, branco com borda verde | em cima do Rafa, perto da divisória | 12 |
| `ficha` | o cartão do salão no Mappoa: "Dores: clientes faltando, agenda no WhatsApp" e a mensagem pronta | `K.telaCanvas` num grupo + `K.nomear` | 2,0 × 2,4, branco, barra na cor do canal | em pé, acima do computador | 13 |
| `caixa` | uma caixa de software "SISTEMA" que se abre e mostra a agenda cheia | `K.pecas`: caixa + tampa + `K.placa` (agenda cheia) | 0,9 × 0,9 × 0,9, azul `#2f6fd6` | no meio da sala, na frente da divisória | 14 |
| `esteira` | a esteira de academia | `K.pecas`: caixa (base) + cilindros (rolos) + caixa (painel) | 1,6 × 0,25 × 0,6, cinza escuro | no meio da sala, na frente da divisória | 15 |
| `calca` | a calça jeans que volta a servir | `K.pecas`: 2 caixas (pernas) + caixa (cintura) | 0,6 × 1,0, azul jeans `#3b5f9a` | flutuando ao lado da esteira | 15 |
| `navegador` | a barra de endereço grande com "mappoa.com" | `K.placa` desenhada + `K.nomear` | 2,4 × 0,5, branca com letra preta e o cadeado | em pé, acima do computador | 17 |
| etiquetas, ✓/✗, setas, ondas, festa | efeitos | `K.etiqueta`, `K.marca`, `K.seta`, `K.ondas`, `K.festa` | | em volta das peças | várias |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| dona do salão | 1 | a `bia` com o `salao` atrás |
| mensagem, "conheça nosso sistema" | 1 | o `celular_bia` com o balão "Conheça nosso sistema" |
| apaga | 1 | a mensagem some da tela do celular + ✗ vermelho |
| Rafa | 2 em diante | o `personagem` |
| sistema de agendamento | 2 | etiqueta azul "Rafa · vende sistema de agendamento" + o computador com a agenda |
| ninguém compra | 2 | etiqueta vermelha "0 vendas" |
| mensagem, contato, celular | 3 | o `celular` na mão e os envelopes voando pros `contatos` |
| padaria, loja de roupa | 4 | os `contatos` ganhando ✗ |
| horário marcado, salão, barbearia, clínica | 5 | os cartões `ideais`, com o relógio |
| cliente ideal | 6 | o rótulo e os `ideais` brilhando |
| Google, site, Instagram, planilha | 7 | as `abas` girando em volta dele |
| dia inteiro | 7 | o `relogio` correndo e a janela escurecendo |
| site que procura as empresas | 8 | o `computador` acendendo com a busca |
| salões de beleza em Curitiba, lista, WhatsApp, Instagram | 9 | a busca digitada e a `lista` com os ícones |
| Mappoa | 10 | o rótulo e a `lista` girando |
| lista não vende sozinha, mensagem, lixo | 11 | o `envelope` voando pra `lixeira` |
| dor, WhatsApp, clientes que faltam | 12 | o `balao` chegando no `celular_bia` |
| dores, mensagem pronta | 13 | a `ficha` |
| sistema, problema resolvido | 14 | a `caixa` abrindo e a agenda cheia |
| academia, esteira, calça | 15 | a `esteira` e a `calca` |
| salões certos | 16 | a `lista` e a `bia` com ✓ |
| computador, mappoa.com | 17 | o `computador` e o `navegador` |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida): o escritório claro, de carpete azul-acinzentado; o janelão com a cidade
lá fora; as plantas nos cantos; o quadro branco; a divisória no meio separando a mesa do Rafa (esquerda) do salão da Bia
(direita).

#### 1 · plano `gancho` · ~4 s · `gancho`
> "A dona do salão abriu sua mensagem. Se diz 'conheça nosso sistema', ela apaga."

- NA TELA: a Bia no centro, na frente da mesa da direita, segurando o celular grande virado pra câmera; na tela dele, o
  balão "Conheça nosso sistema"; o salão atrás dela (espelho, cadeira, placa); a pergunta do gancho no topo
- MOSTRA: ["bia", "celular_bia"]
- CENÁRIO: a metade direita do escritório, o salão; o janelão com a cidade no canto
- ENTRA AGORA: o celular já vibrando no 1º quadro (nada de cena parada); a mensagem "Conheça nosso sistema" aparece na
  tela na palavra "mensagem"
- OBJETOS SE MEXENDO: o celular treme com a notificação de 0 até "abriu"; na palavra "apaga", a mensagem escorrega pra
  fora da tela e some
- PERSONAGEM: a Bia (o Rafa não aparece: ele é quem mandou) · começo: `surpreso`, olha o celular · na palavra "apaga":
  `nojo`/`bravo`, passa o dedo e apaga
- INTERAÇÃO: a Bia abre a mensagem e apaga com o dedo
- CÂMERA: alvo [bia, celular_bia], no centro, 2/3 da altura · `revelando` (do celular de perto até ela inteira) ·
  `perto` → `medio` · `frente` · altura `olho` · topo livre (`espacoCima: 0.38`)
- EFEITOS VISUAIS: a pergunta do gancho no topo (o motor põe) · ondinhas da notificação (`K.ondas`) · ✗ vermelho grande
  na palavra "apaga"
- SONS: `bip` da notificação no 1º quadro · `whoosh` da mensagem saindo (palavra "apaga") · `errado` (palavra "apaga")

#### 2 · plano `rafa` · ~4 s
> "Esse é o Rafa. Ele vende um sistema de agendamento, mas ninguém compra."

- NA TELA: o Rafa no centro, na frente da mesa da esquerda; o computador atrás com uma agenda bonita na tela; o janelão
  com a cidade
- MOSTRA: ["personagem", "computador"]
- CENÁRIO: a metade esquerda do escritório; a mesa, a cadeira e a cidade no janelão
- ENTRA AGORA: a tela do computador acende com a agenda do sistema na palavra "sistema"
- OBJETOS SE MEXENDO: a tela acende; na palavra "ninguém", um cursor fica piscando sozinho na tela, sem venda nenhuma
- PERSONAGEM: na frente da mesa, de frente pra câmera · começo: `mostrando` (apresenta o sistema, orgulhoso) · na palavra
  "ninguém": `triste`, os ombros caem
- INTERAÇÃO: ele aponta o sistema na tela e desanima quando nada acontece
- CÂMERA: alvo [personagem, computador], ele no centro, inteiro, metade da altura · `chegando` · `medio` ·
  `perfil_direita` · altura `olho` (na frase 1: revelando, perto→médio, de frente, na Bia)
- EFEITOS VISUAIS: etiqueta azul "Rafa · vende sistema" (palavra "Rafa") · etiqueta vermelha "0 vendas" (palavra
  "ninguém")
- SONS: `ding` da etiqueta (o kit põe) · `liga` da tela (palavra "sistema") · `errado` baixinho (palavra "ninguém")

#### 3 · plano `manda` · ~4 s
> "Se você é o Rafa, manda a mesma mensagem pra todo contato do celular."

- NA TELA: o Rafa à esquerda, com o celular na mão; 3 envelopes voando do celular por cima da divisória até os 3
  cartões do outro lado: "Padaria", "Loja de roupa", "Mecânica"
- MOSTRA: ["personagem", "celular", "contatos"]
- CENÁRIO: a sala inteira de lado, as duas metades e a divisória
- ENTRA AGORA: o celular sobe pra mão dele na palavra "manda"; os cartões `contatos` surgem um a um na palavra
  "contato"; os envelopes saem na palavra "mesma"
- OBJETOS SE MEXENDO: os 3 envelopes iguais viajam em arco da esquerda pra direita e batem nos cartões
- PERSONAGEM: na frente da mesa, virado pra divisória · começo: `ideia` (pega o celular) · na palavra "todo": aperta
  enviar várias vezes (`segurando`, polegar batendo)
- INTERAÇÃO: ele dispara as mensagens do celular; elas chegam nos cartões
- CÂMERA: alvo [personagem, celular, contatos] · `passando` (da esquerda pra direita, seguindo os envelopes) · `aberto` ·
  `frente` · altura `alto` (na frase 2: chegando, médio, perfil direita, olho)
- EFEITOS VISUAIS: os envelopes · etiqueta laranja "A mesma pra todos" (palavra "mesma")
- SONS: `whoosh` de cada envelope · `bip` do enviar (palavra "manda")

#### 4 · plano `ninguem` · ~4 s · jogo `falha`
> "Mas a padaria não marca horário, e a loja de roupa nem lê."

- NA TELA: os 3 cartões no centro, grandes; o envelope da padaria quicando de volta; o da loja de roupa parado, fechado,
  pegando poeira; o Rafa pequeno do lado esquerdo esperando
- MOSTRA: ["contatos"]
- CENÁRIO: atrás dos cartões, a metade direita da sala, o salão desfocado
- ENTRA AGORA: ✗ no cartão "Padaria" (palavra "padaria"); ✗ no cartão "Loja de roupa" (palavra "lê")
- OBJETOS SE MEXENDO: o cartão da padaria treme e o envelope volta (`K.falhar 'treme'`); o da loja tomba devagar
  (`K.falhar 'tomba'`) na palavra "lê"
- PERSONAGEM: à esquerda, com o celular · começo: `duvida`, olhando o celular · na palavra "lê": `triste`
- INTERAÇÃO: os cartões rejeitam as mensagens dele
- CÂMERA: alvo contatos, no centro, 2/3 da tela · `chegando` · `perto` · `perfil_esquerda` · altura `olho` (na frase 3:
  passando, aberto, frente, alto)
- EFEITOS VISUAIS: ✗ vermelho em cada cartão · etiqueta vermelha "Não precisa" (palavra "horário") · no fim, preto e
  branco (o jogo faz)
- SONS: `baque` do envelope voltando · `errado` em cada ✗ (o kit põe) · o congela do jogo

#### 5 · plano `ideais` · ~4 s · jogo `corrige`
> "Então você manda só pra quem vive de horário marcado: salão, barbearia, clínica."

- NA TELA: no lugar dos contatos, os 3 cartões novos com relógio: "Salão", "Barbearia", "Clínica"; o Rafa à esquerda,
  apontando pra eles
- MOSTRA: ["ideais", "personagem"]
- CENÁRIO: as duas metades; atrás dos cartões, o salão da Bia aparecendo
- ENTRA AGORA: cada cartão entra girando na palavra dele ("salão", "barbearia", "clínica")
- OBJETOS SE MEXENDO: os cartões antigos somem; os novos giram e param, um a um; os relógios dos cartões andam
- PERSONAGEM: anda 1 passo pra divisória · começo: `ideia` · na palavra "salão": `apontar` cada cartão
- INTERAÇÃO: ele aponta e cada cartão aparece onde ele aponta
- CÂMERA: alvo [ideais, personagem] · `subindo` · `medio` · `frente` · altura `baixo` → `olho` (na frase 4: chegando,
  perto, perfil esquerda, olho)
- EFEITOS VISUAIS: ✓ verde em cada cartão
- SONS: `brilho` de cada cartão · `certo` (palavra "clínica")

#### 6 · plano `ideal_rotulo` · ~2 s
> "Esse é o *cliente ideal*."

- NA TELA: os 3 cartões `ideais` no centro, brilhando; o rótulo grande "Cliente ideal"
- MOSTRA: ["ideais"]
- CENÁRIO: atrás, desfocado, o janelão com a cidade
- ENTRA AGORA: o rótulo (palavra "cliente")
- OBJETOS SE MEXENDO: os cartões giram juntos meia volta e brilham
- PERSONAGEM: à esquerda, de canto · `vitoria`, soquinho no ar
- INTERAÇÃO: ele comemora os cartões
- CÂMERA: alvo ideais · `girando` · `perto` · `perfil_direita` · altura `baixo` (na frase 5: subindo, médio, frente)
- EFEITOS VISUAIS: o rótulo amarelo "Cliente ideal" · o brilho (`K.brilhar`)
- SONS: `brilho` do rótulo (o kit põe)

#### 7 · plano `na_mao` · ~5 s · jogo `falha`
> "Mas achar todos eles na mão leva o dia inteiro: Google, site, Instagram, planilha."

- NA TELA: o Rafa no centro, sentado de lado na mesa, com 4 cartões girando em volta da cabeça: "Google", "Site",
  "Instagram", "Planilha"; o relógio na parede correndo as horas; a luz da janela ficando de tarde
- MOSTRA: ["personagem", "abas", "relogio"]
- CENÁRIO: a mesa da esquerda e o computador; o relógio flutuando do lado conta o tempo passando
- ENTRA AGORA: cada cartão entra na palavra dele ("Google", "site", "Instagram", "planilha"); o relógio aparece na
  palavra "dia"
- OBJETOS SE MEXENDO: os cartões giram em volta da cabeça dele, cada vez mais rápido; os ponteiros do relógio dão várias
  voltas a partir de "dia"
- PERSONAGEM: na frente da mesa · começo: `pensando` · na palavra "inteiro": `cansado`, suando (`suar`)
- INTERAÇÃO: os cartões rodeiam e cansam ele
- CÂMERA: alvo [personagem, abas] · `girando` (sentido contrário) · `medio` · `frente` · altura `alto` (na frase 6:
  girando, perto, perfil direita, baixo)
- EFEITOS VISUAIS: etiqueta vermelha "8 horas" (palavra "inteiro") · suor · no fim, preto e branco (o jogo faz)
- SONS: `clique` de cada cartão · `zumbido` do relógio correndo · congela do jogo

#### 8 · plano `site` · ~3 s · jogo `corrige`
> "Então você usa um site que procura as empresas pra você."

- NA TELA: o computador do Rafa no centro, a tela acendendo com uma caixa de busca e uma lupa; o Rafa do lado,
  sentando na frente dele
- MOSTRA: ["computador", "personagem"]
- CENÁRIO: a mesa da esquerda, a cadeira; os cartões da frase 7 caem e somem
- ENTRA AGORA: a lupa e a caixa de busca na tela (palavra "site")
- OBJETOS SE MEXENDO: as `abas` caem no chão e somem; a lupa na tela gira procurando
- PERSONAGEM: anda até a mesa · começo: `surpreso` · na palavra "procura": `ideia`, apontando pra tela
- INTERAÇÃO: ele vai até o computador e aponta a busca
- CÂMERA: alvo [computador, personagem] · `chegando` · `medio` · `perfil_esquerda` · altura `olho` (na frase 7: girando,
  médio, frente, alto)
- EFEITOS VISUAIS: etiqueta azul "Procura por você" (palavra "procura")
- SONS: `liga` (palavra "site") · `whoosh` das abas caindo

#### 9 · plano `busca` · ~5 s
> "Você escreve 'salões de beleza em Curitiba', e vem a lista, com WhatsApp e Instagram quando estão públicos."

- NA TELA: o computador embaixo; acima dele, o painel grande do Mappoa subindo e enchendo de salões, linha por linha,
  cada um com o ícone verde do WhatsApp e o rosa do Instagram; o Rafa do lado
- MOSTRA: ["lista", "computador"]
- CENÁRIO: a mesa da esquerda; o janelão atrás
- ENTRA AGORA: as letras da busca aparecem uma a uma (palavra "escreve"); a `lista` sobe do computador (palavra
  "lista"); os ícones nas linhas (palavra "WhatsApp")
- OBJETOS SE MEXENDO: a lista sobe 1,5 metro e as linhas entram de cima pra baixo, até 8 salões
- PERSONAGEM: na frente da mesa · começo: digitando (`segurando`) · na palavra "lista": `surpreso`, se afasta um passo
- INTERAÇÃO: ele digita e a lista sobe na frente dele
- CÂMERA: alvo [lista, computador] · `subindo` (acompanhando a lista) · `medio` · `frente` · altura `olho` → `alto` (na
  frase 8: chegando, médio, perfil esquerda, olho)
- EFEITOS VISUAIS: contador "8 salões" crescendo · os ícones
- SONS: `clique` das teclas · `brilho` de cada linha · `ding` no fim

#### 10 · plano `mappoa_rotulo` · ~2 s
> "Esse é o *Mappoa*."

- NA TELA: a lista no centro, grande, girando e brilhando; o rótulo grande "Mappoa"
- MOSTRA: ["lista"]
- CENÁRIO: atrás, desfocado, a mesa e a janela
- ENTRA AGORA: o rótulo (palavra "Mappoa")
- OBJETOS SE MEXENDO: a lista gira meia volta e brilha
- PERSONAGEM: no canto de baixo · `vitoria`
- INTERAÇÃO: ele comemora a lista
- CÂMERA: alvo lista · `girando` · `perto` · `perfil_direita` · altura `baixo` (na frase 9: subindo, médio, frente)
- EFEITOS VISUAIS: o rótulo amarelo "Mappoa" · o brilho
- SONS: `brilho` do rótulo (o kit põe)

#### 11 · plano `lixo` · ~4 s · jogo `falha`
> "Mas a lista não vende sozinha: se a mensagem só fala do sistema, vai pro lixo."

- NA TELA: a sala vista de cima: o Rafa à esquerda solta um envelope "Conheça nosso sistema" que voa por cima da
  divisória; a Bia à direita pega, faz cara feia e joga na lixeira do lado dela
- MOSTRA: ["envelope", "lixeira", "bia"]
- CENÁRIO: as duas metades de cima; o salão da Bia
- ENTRA AGORA: o envelope (palavra "mensagem"); a lixeira já está no chão
- OBJETOS SE MEXENDO: o envelope voa em arco da esquerda pra direita; na palavra "lixo", cai dentro da lixeira, que
  balança (`K.falhar 'treme'`)
- PERSONAGEM: o Rafa · começo: `chamando` (manda confiante) · na palavra "lixo": `susto` · a Bia: `bravo`, joga fora
- INTERAÇÃO: a Bia pega o envelope dele e joga no lixo
- CÂMERA: alvo [envelope, bia, lixeira] · `afastando` · `aberto` · `frente` · altura `cima` (na frase 10: girando,
  perto, perfil direita, baixo)
- EFEITOS VISUAIS: ✗ vermelho em cima da lixeira (palavra "lixo") · no fim, preto e branco
- SONS: `whoosh` do envelope · `tampa` da lixeira (palavra "lixo") · congela do jogo

#### 12 · plano `dor` · ~5 s · jogo `corrige`
> "Então você fala da dor dela: 'Vi que vocês marcam pelo WhatsApp. Quantas clientes faltam sem avisar?'"

- NA TELA: o balão verde do Rafa atravessa a divisória e chega no celular da Bia; ela lê e se anima; o salão atrás
  dela, com a cadeira vazia (a cliente que faltou)
- MOSTRA: ["balao", "bia", "celular_bia"]
- CENÁRIO: o salão: espelho, a cadeira vazia, a placa
- ENTRA AGORA: o balão (palavra "dor"); a mensagem na tela do celular dela (palavra "WhatsApp"); a etiqueta "Cadeira
  vazia" na cadeira (palavra "faltam")
- OBJETOS SE MEXENDO: o balão desliza por cima da divisória até o celular; a cadeira gira um pouquinho (vazia)
- PERSONAGEM: a Bia · começo: `duvida`, olha o celular · na palavra "faltam": `surpreso`, aponta a cadeira vazia (é a
  dor dela)
- INTERAÇÃO: a mensagem do Rafa chega e faz a Bia olhar pra cadeira vazia
- CÂMERA: alvo [bia, celular_bia, balao] · `passando` (por cima do ombro dela) · `medio` · `perfil_esquerda` · altura
  `olho` (na frase 11: afastando, aberto, frente, cima)
- EFEITOS VISUAIS: etiqueta laranja "Cadeira vazia" (palavra "faltam") · ✓ verde no balão
- SONS: `bip` da mensagem chegando (palavra "WhatsApp") · `certo` (palavra "avisar")

#### 13 · plano `ficha` · ~4 s
> "No Mappoa, cada empresa vem com as dores dela, e a mensagem já sai pronta pra você mandar."

- NA TELA: acima do computador, o cartão do "Salão da Bia" no Mappoa: em cima, "Dores: clientes faltando · agenda no
  WhatsApp"; embaixo, a mensagem pronta; o Rafa do lado
- MOSTRA: ["ficha", "personagem"]
- CENÁRIO: a mesa da esquerda e o computador
- ENTRA AGORA: a `ficha` cresce do computador (palavra "empresa"); as dores aparecem linha por linha (palavra "dores");
  a mensagem se escreve sozinha (palavra "mensagem")
- OBJETOS SE MEXENDO: a ficha cresce; as linhas entram de cima pra baixo
- PERSONAGEM: na frente da mesa · começo: `pensando`, lendo · na palavra "pronta": `mostrando`, oferecendo pra câmera
- INTERAÇÃO: ele lê a ficha e mostra a mensagem
- CÂMERA: alvo [ficha, personagem] · `chegando` · `medio` · `perfil_direita` · altura `baixo` (na frase 12: passando,
  médio, perfil esquerda, olho)
- EFEITOS VISUAIS: etiqueta azul "Você que manda" (palavra "mandar")
- SONS: `brilho` da ficha · `clique` das linhas

#### 14 · plano `caixa` · ~4 s
> "É por isso que ninguém compra um sistema: compra o problema resolvido."

- NA TELA: no meio da sala, uma caixa azul "SISTEMA"; o Rafa do lado; a tampa abre e sai de dentro uma agenda cheia, sem
  buraco, com ✓ verde
- MOSTRA: ["caixa", "personagem"]
- CENÁRIO: o meio da sala, a divisória atrás, a cidade no janelão
- ENTRA AGORA: a caixa cai do alto (palavra "sistema"); a agenda cheia sobe de dentro (palavra "resolvido")
- OBJETOS SE MEXENDO: a caixa cai e quica; a tampa abre e voa; a agenda sobe meio metro e brilha
- PERSONAGEM: do lado da caixa · começo: `duvida`, olhando a caixa · na palavra "problema": abre a tampa (`erguendo`)
- INTERAÇÃO: ele abre a caixa e mostra o que tem dentro
- CÂMERA: alvo [caixa, personagem] · `revelando` · `medio` · `frente` · altura `olho` (na frase 13: chegando, médio,
  perfil direita, baixo)
- EFEITOS VISUAIS: ✗ em cima da palavra "SISTEMA" (palavra "ninguém") · ✓ verde na agenda (palavra "resolvido")
- SONS: `baque` da caixa · `tampa` · `brilho` (palavra "resolvido")

#### 15 · plano `esteira` · ~4 s
> "Igual academia: ninguém paga pela esteira, paga pela calça que volta a servir."

- NA TELA: no meio da sala, uma esteira de academia com o Rafa correndo em cima; do lado, uma calça jeans flutuando que
  fecha o botão sozinha
- MOSTRA: ["esteira", "calca", "personagem"]
- CENÁRIO: o meio da sala; atrás, a divisória e o bebedouro
- ENTRA AGORA: a esteira surge (palavra "academia"); a calça cai do alto (palavra "calça")
- OBJETOS SE MEXENDO: os rolos da esteira giram; a calça encolhe um pouco e ganha um ✓ (volta a servir)
- PERSONAGEM: correndo na esteira (`correr`) · na palavra "servir": `vitoria`, pula da esteira
- INTERAÇÃO: ele corre na esteira e comemora a calça
- CÂMERA: alvo [esteira, personagem, calca] · `passando` · `medio` · `perfil_esquerda` · altura `olho` (na frase 14:
  revelando, médio, frente)
- EFEITOS VISUAIS: etiqueta laranja "O que ele quer" na calça (palavra "calça") · ✓ verde
- SONS: `zumbido` da esteira · `whoosh` da calça · `festa` baixinho (palavra "servir")

#### 16 · plano `antes_agora` · ~6 s · jogo `avanca` (⏩)
> "Antes, o Rafa mandava 'conheça nosso sistema' pra qualquer um. Agora, ele acha os salões certos e fala da dor de cada
> um."

- NA TELA: começo em preto e branco: o Rafa largado na cadeira, envelopes caindo no chão; ⏪; depois, em cor: a lista do
  Mappoa acima da mesa e, do outro lado, a Bia respondendo com joinha
- MOSTRA: ["personagem", "lista", "bia"]
- CENÁRIO: a sala inteira; a cidade no janelão
- ENTRA AGORA: os envelopes caindo (palavra "qualquer"); a lista (palavra "Agora"); o ✓ em cima da Bia (palavra "dor")
- OBJETOS SE MEXENDO: os envelopes caem; ⏪; a lista sobe; o balão verde atravessa a divisória
- PERSONAGEM: começo: `cansado` na cadeira · na palavra "Agora": `vitoria`, levanta num pulo e aponta a lista
- INTERAÇÃO: ele aponta a lista e a Bia responde
- CÂMERA: alvo [personagem, lista, bia] · `afastando` · `aberto` · `frente` · altura `alto` (na frase 15: passando,
  médio, perfil esquerda, olho)
- EFEITOS VISUAIS: preto e branco no "Antes" · ⏪ (o jogo faz) · ✓ verde em cima da Bia
- SONS: `baque` dos envelopes · rebobina (o jogo) · `certo` (palavra "dor")

#### 17 · plano `segue` · ~6 s · cauda `cartao`
> "Pra que tipo de empresa você vende o seu sistema? Comenta aí. No computador, digita mappoa.com e testa você também."

- NA TELA: o Rafa na frente do computador, de frente pra câmera; acima do computador, a barra de endereço grande
  "mappoa.com"; o cartão de seguir no topo
- MOSTRA: ["personagem", "navegador", "computador"]
- CENÁRIO: a mesa da esquerda; a cidade no janelão
- ENTRA AGORA: o `navegador` cresce (palavra "computador"); as letras de "mappoa.com" aparecem uma a uma (palavra
  "digita")
- OBJETOS SE MEXENDO: as letras entrando; o cadeado brilha
- PERSONAGEM: começo: `chamando` (pergunta pra quem assiste) · na palavra "digita": digita e depois `apontar` pro
  endereço
- INTERAÇÃO: ele digita o endereço no computador e aponta
- CÂMERA: alvo [personagem, navegador] · `parado` → `chegando` devagar · `aberto` · `frente` · altura `olho` · topo
  livre (`espacoCima: 0.4`) (na frase 16: afastando, aberto, frente, alto)
- EFEITOS VISUAIS: o cartão de seguir (cauda) · o endereço grande
- SONS: `clique` das teclas · `ding` no fim

## Cada cena em 2 linhas

1. A Bia, dona do salão, recebe "Conheça nosso sistema" no celular e apaga na hora. / Ela faz cara feia e passa o dedo;
   a câmera abre do celular até ela.
2. O Rafa apresenta o sistema de agendamento no computador, mas aparece "0 vendas". / Ele estava orgulhoso e desanima;
   a câmera chega de lado.
3. Ele dispara a mesma mensagem pra Padaria, Loja de roupa e Mecânica. / Aperta enviar sem parar; a câmera passa de lado,
   de cima.
4. A padaria devolve o envelope e a loja nem abre: dois ✗. / Ele fica triste; a câmera chega pertinho dos cartões.
5. No lugar, entram Salão, Barbearia e Clínica, com relógio. / Ele tem a ideia e aponta cada um; a câmera sobe de baixo.
6. Os 3 cartões brilham com o nome "Cliente ideal". / Ele dá um soquinho no ar; a câmera gira de baixo.
7. Google, Site, Instagram e Planilha giram em volta da cabeça dele e o relógio corre o dia. / Ele cansa e sua; a câmera
   gira de cima.
8. O computador acende com uma lupa procurando. / Ele chega surpreso e aponta; a câmera chega de lado.
9. Ele digita "salões de beleza em Curitiba" e o painel sobe enchendo de salões com WhatsApp e Instagram. / Ele se
   afasta surpreso; a câmera sobe junto.
10. O painel gira e brilha, com o nome "Mappoa". / Ele comemora; a câmera olha de baixo.
11. Vista de cima: o envelope "Conheça nosso sistema" voa até a Bia, que joga no lixo. / Ele leva um susto; a câmera se
    afasta, de cima.
12. A mensagem certa chega no celular da Bia e ela aponta a cadeira vazia do salão. / Ela se surpreende; a câmera passa
    pelo ombro dela.
13. O cartão do salão no Mappoa mostra as dores e a mensagem pronta. / Ele lê e mostra pra câmera; a câmera chega de
    baixo.
14. Uma caixa "SISTEMA" cai, ele abre e de dentro sobe uma agenda cheia. / Ele abre a tampa; a câmera revela de frente.
15. Ele corre numa esteira e do lado uma calça jeans fecha o botão. / Ele pula comemorando; a câmera passa de lado.
16. Preto e branco: ele largado com envelopes no chão. ⏪ Cor: a lista no alto e a Bia faz joinha. / Ele levanta num
    pulo; a câmera se afasta.
17. Ele pergunta pra quem assiste e digita "mappoa.com" no computador, com o endereço grande; o cartão de seguir no
    topo. / Ele digita e aponta; a câmera de frente.
