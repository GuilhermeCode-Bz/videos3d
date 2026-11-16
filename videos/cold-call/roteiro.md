# Como funciona uma cold call: roteiro e ficha de cena

> Série "Como funciona a venda" (explica o conceito; o Mappoa entra só na parte de achar os contatos). ~88 s.
> Gancho no estilo do canal: situação + "se você fizer X, acontece Y", com o conflito na tela no 1º segundo; depois o
> personagem ("Esse é o Léo..."). Fecha com "Antes... Agora...", a pergunta pros comentários e o fim no computador com
> mappoa.com.

## Roteiro

1. O dono atendeu. Se você disser "tudo bem?", ele desliga. *(gancho)*
2. Esse é o Léo. Ele abriu uma agência de marketing, mas a agenda tá vazia.
3. Se você é o Léo, pega o telefone e liga pra empresas que nem te conhecem.
4. Essa é a *cold call*: a ligação fria.
5. Mas ele liga pra qualquer um: a pizzaria não precisa de agência, e a oficina nem atende.
6. Então você começa pela lista certa: só empresas que podem precisar de você.
7. No Mappoa, você busca "clínicas odontológicas em Campinas", e vem a lista com o telefone que estiver público.
8. Essa é a *lista de prospecção*.
9. Mas o doutor atende, e o Léo começa: "Oi, tudo bem? Como vai o senhor?" E ele desliga.
10. Então você vai direto: quem você é e por que ligou, numa frase só.
11. "Doutor, aqui é o Léo. Eu ajudo clínicas de Campinas a atrair pacientes novos."
12. Essa é a *abertura*.
13. Mas se você já sai vendendo o pacote, ele fecha a cara.
14. Então você pergunta do negócio dele: "Hoje, os pacientes novos chegam de onde?"
15. É por isso que vendedor bom fala menos e escuta mais.
16. Mas aí vem a frase clássica: "Me manda por e-mail."
17. Então você não discute: "Mando sim. E quinze minutinhos na quinta, pra eu te mostrar?"
18. Esse é o *próximo passo*. A ligação não vende: ela marca a conversa.
19. Igual primeiro encontro: ninguém pede em casamento no cafezinho.
20. Antes, o Léo ligava pra qualquer um e ouvia "tu tu tu". Agora, ele liga pra lista certa, com abertura, pergunta e
    próximo passo.
21. Qual frase você usa pra abrir uma ligação? Comenta aí. No computador, digita mappoa.com e testa você também.

~278 palavras, uns 85 a 90 segundos. 5 ciclos "Mas → Então" (lista certa → abertura → pergunta → objeção → próximo
passo), cada problema nascendo da solução anterior: achou pra quem ligar → errou o começo → acertou o começo mas saiu
vendendo → perguntou e veio a objeção → resolveu a objeção pedindo só a conversa.

Temperos: quebra de mito ("A ligação não vende: ela marca a conversa"), "é por isso que" (fala menos e escuta mais),
número concreto (quinze minutinhos, uma frase só), comparação caseira com humor (primeiro encontro / casamento no
cafezinho).

## Conferido com o produto (`canal/produto.md`) e com a série

- O Mappoa aparece só na frase 7 (achar as empresas certas, com o telefone): buscar por segmento e cidade é o passo 1
  dele. "O telefone que estiver público": nem todo lead tem tudo, depende do que é público
- O vídeo não diz que o Mappoa liga, marca reunião ou acompanha resposta: quem liga é o Léo
- Nenhum número de taxa de resposta, de vendas nem de reuniões marcadas (a pauta pediu). O "Antes/Agora" fala do jeito
  de ligar, não de resultado garantido
- Nada de preço nem plano. O fim é no computador, com mappoa.com (aprendizados: nunca "link da Bio")
- Conceito conferido: cold call é a ligação pra quem não te conhece e não pediu contato; o objetivo comum dela é marcar
  uma próxima conversa, não fechar a venda no telefone; abrir com "tudo bem?" genérico e sair vendendo são os erros
  mais citados; "me manda por e-mail" é a objeção clássica de quem quer encerrar. Simplificado, não inventado

## Ficha de cena

**Cenário:** `escritorio` (tema: trabalho, empresa), de dia. É o único cenário com duas mesas: a da **esquerda**
(`C.lugares.mesa`, x -3,6) vira a agência do Léo, e a da **direita** (`C.lugares.mesa2`, x 3,4) vira a clínica do
doutor. Entre as duas, uma **divisória** em pé (parede baixa no meio da sala) separa "os dois lugares", como uma tela
dividida: a ligação atravessa a divisória como ondas. Peças do cenário que entram nas frases: o janelão com a cidade
(frase 2 e 20), o quadro branco com o gráfico (frase 18, vira a agenda da quinta), o bebedouro (frase 15, o "cafezinho"
fica perto dele na 19). Foto: `referencias/cenarios/escritorio.jpg`.
**Hora:** dia. **Personagens:** o do canal (menino de camiseta azul), que no vídeo se chama **Léo**, quase sempre em
pé na frente da mesa da esquerda; e **o doutor** (`K.boneco({ tipo: 'doutor' })`, o dono da clínica), na mesa da
direita.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Léo | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | na frente da mesa da esquerda (~[-3,6, 0, -1,4]) | todas |
| `doutor` | o dono da clínica | `K.boneco({ tipo: 'doutor' })` + `K.nomear` | 1,6 de altura, jaleco branco | na frente da mesa da direita (~[3,4, 0, -1,6]) | 1, 9, 11, 13, 14, 16, 17 |
| `divisoria` | a parede baixa que separa a agência da clínica | `K.pecas`: caixa | 0,15 × 2,6 × 3,5, cinza-claro `#d9dde2` | no meio da sala, x 0, de z -4,4 até -0,9 | todas (fundo) |
| `celular` | o celular do Léo | `K.celular()` + `K.nomear`, escala 2,2 | na mão dele, ou flutuando do lado na cor do canal | na mão direita do Léo | 1, 3, 9, 10, 11, 14, 17 |
| `telefone` | o telefone fixo da clínica, que toca e treme | `K.pecas`: caixa + cilindro (fone) | base 0,35 × 0,1 × 0,25, vermelho `#e8352b`, fone preto | em cima da mesa da direita | 1, 9, 16 |
| `placa_clinica` | a placa na parede da clínica | `K.placa('Clínica Sorriso')` + `K.nomear` | 1,6 × 0,5, branca com letra verde-água | na parede do fundo, atrás do doutor | 1, 9 (fundo) |
| `agenda` | a agenda da semana do Léo, vazia (e na 18, com a quinta marcada) | `K.telaCanvas` num grupo + `K.nomear` (7 colunas: seg a dom) | 2,0 × 1,3, branca com a barra azul | em pé, flutuando acima da mesa do Léo | 2, 18, 20 |
| `computador` | o computador do Léo | o da mesa da esquerda: `K.computador()` posto em cima dela + `K.nomear` (tela desenhada: busca, lista, mappoa.com) | tela 0,7 | em cima da mesa da esquerda | 6, 7, 8, 21 |
| `contatos` | 3 cartões flutuando com quem ele ligou: "Pizzaria", "Oficina", "Padaria" | 3 `K.placa` com desenho (ícone + nome) num grupo + `K.nomear` | 0,9 × 0,5 cada, brancos | em leque, acima e à direita do Léo | 5 (somem na 6) |
| `lista` | o painel grande do Mappoa com as clínicas enchendo (nome, bairro, ícone de telefone) | `K.telaCanvas` num grupo + `K.nomear` | 2,2 × 2,8, branco com a barra na cor do canal `#2e9d5b` | em pé, acima do computador | entra na 7; fica até a 8; volta na 20 |
| `balao` | o balão de fala do Léo (o texto muda: "Oi, tudo bem?", a frase de abertura, a pergunta, "Mando sim...") | `K.placa` desenhada + `K.nomear` | 2,0 × 0,8, branco com borda preta, rabinho pra ele | em cima do Léo, um pouco pro lado da divisória | 1, 9, 11, 13, 14, 17 |
| `balao_dr` | o balão de fala do doutor ("Me manda por e-mail.", "Pode ser.") | `K.placa` desenhada + `K.nomear` | 1,8 × 0,7, branco | em cima do doutor | 16, 17 |
| `pacote` | uma caixa de presente com etiqueta "PACOTE R$" (o Léo empurrando a venda) | `K.pecas`: caixa + faixa | 0,6 × 0,5 × 0,6, roxa com faixa amarela | entre o Léo e a divisória | 13 |
| `orelha` | uma orelha gigante (escuta mais) | `K.pecas`: esfera achatada + anel, cor de pele | 0,8 de altura, `#e6b48a` | flutuando ao lado do Léo | 15 |
| `boca` | uma boca pequena que encolhe (fala menos) | `K.pecas`: esfera achatada vermelha | 0,35 de largura, `#c8442f` | flutuando do outro lado do Léo | 15 |
| `cafe` | a mesinha com 2 xícaras de cafezinho | `K.pecas`: cilindro (mesa redonda) + 2 cilindros (xícaras) | mesa raio 0,45, altura 0,75; xícaras brancas | no meio da sala, na frente da divisória | 19 |
| `anel` | a caixinha com o anel de noivado, abrindo | `K.pecas`: caixa vermelha + `anel` dourado + esfera azul (pedra) | caixa 0,2 de lado | em cima da mesinha do café | 19 |
| `navegador` | a barra de endereço grande, com "mappoa.com" | `K.placa` desenhada + `K.nomear` | 2,4 × 0,5, branca com letra preta e o cadeado | em pé, acima do computador | 21 |
| ondas, ✓/✗, contador, etiquetas, setas | efeitos | `K.ondas`, `K.marca`, `K.contador`, `K.etiqueta`, `K.seta`, `K.festa` | | em volta das peças | várias |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| dono | 1 | o `doutor` atendendo o `telefone` |
| "tudo bem?" | 1, 9 | o `balao` do Léo |
| desliga | 1, 9 | o doutor bate o fone no `telefone` e o ✗ vermelho + o "tu tu tu" |
| Léo | 2 em diante | o `personagem` |
| agência de marketing | 2 | etiqueta azul "Léo · agência de marketing" |
| agenda vazia | 2 | a `agenda` com os 7 dias em branco |
| telefone | 3 | o `celular` na mão dele, e as ondas saindo |
| empresas que nem te conhecem | 3 | as ondas batendo em 3 pontos de interrogação do outro lado da divisória |
| cold call, ligação fria | 4 | o rótulo "Cold call" e o celular "congelando" (gelo azul, `K.falhar 'congela'`) |
| pizzaria, oficina | 5 | os cartões `contatos` com ✗ |
| agência | 5 | etiqueta "Não precisa de agência" no cartão da pizzaria |
| lista certa, empresas | 6 | a tela do `computador` |
| Mappoa, busca, clínicas odontológicas em Campinas | 7 | a busca digitada na tela e a `lista` |
| telefone público | 7 | o ícone de telefone em cada linha da `lista` |
| lista de prospecção | 8 | o rótulo e a `lista` girando |
| doutor | 9 em diante | o `doutor` |
| "Como vai o senhor?" | 9 | o `balao` |
| frase só | 10 | o `balao` vazio com "1 frase" e o contador |
| clínicas, pacientes novos | 11 | o `balao` com o texto e a `placa_clinica` |
| abertura | 12 | o rótulo |
| pacote | 13 | o `pacote` |
| cara fechada | 13 | o doutor `bravo` |
| negócio, pacientes | 14 | o `balao` com a pergunta e o doutor `pensando` |
| fala menos, escuta mais | 15 | a `boca` encolhendo e a `orelha` crescendo |
| e-mail | 16 | o `balao_dr` "Me manda por e-mail." e um envelope de e-mail voando pro lixo |
| quinze minutinhos, quinta | 17, 18 | o `balao` e a `agenda` com a quinta pintada de verde |
| próximo passo, conversa | 18 | o rótulo e a `agenda` |
| primeiro encontro, casamento, cafezinho | 19 | a mesinha `cafe` com as 2 xícaras e o `anel` |
| lista certa, abertura, pergunta, próximo passo | 20 | a `lista` e 3 etiquetas verdes com ✓ |
| computador, mappoa.com | 21 | o `computador` e o `navegador` |
| ligação (comenta aí) | 21 | o cartão de seguir com o @ |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida, ninguém programa): o escritório claro, de carpete azul-acinzentado; o
janelão com a cidade lá fora no fundo; as plantas nos cantos; o quadro branco com o gráfico na parede da direita; a
divisória no meio separando a agência (esquerda) da clínica (direita).

#### 1 · plano `gancho` · ~3,5 s · `gancho`
> "O dono atendeu. Se você disser 'tudo bem?', ele desliga."

- **NA TELA:** o lado da clínica: o doutor em pé atrás da mesa da direita, com o fone na orelha; o telefone vermelho
  em cima da mesa; a placa "Clínica Sorriso" na parede atrás; o balão "Tudo bem?" entrando pela esquerda, por cima da
  divisória; a pergunta do gancho no topo
- **MOSTRA:** `["doutor", "telefone"]`
- **CENÁRIO:** a metade direita do escritório; atrás do doutor, a placa da clínica e a planta do canto; o janelão com a
  cidade de um lado
- **ENTRA AGORA:** o telefone já tocando e tremendo no 1º quadro (nada de cena parada); o balão "Tudo bem?" desliza da
  esquerda na palavra "tudo"
- **OBJETOS SE MEXENDO:** o telefone treme tocando do 0 ao "atendeu" (`K.falhar 'treme'`) e as ondinhas saem dele; o
  doutor tira o fone do gancho na palavra "atendeu"; na palavra "desliga", ele bate o fone de volta e o telefone pula
- **PERSONAGEM:** o doutor (o Léo não aparece: ele é a voz do balão) · começo: atende, `surpreso` · na palavra
  "desliga": `bravo`, bate o fone
- **INTERAÇÃO:** o doutor atende o telefone e bate o fone no gancho quando o "tudo bem?" chega nele
- **CÂMERA:** alvo `[doutor, telefone]`, no centro, uns 2/3 da altura · `revelando` (começa no telefone tremendo, de
  perto, e abre até o doutor inteiro) · `perto` → `medio` · `frente` · altura `olho` · topo livre pra pergunta
  (`espacoCima: 0.38`)
- **EFEITOS VISUAIS:** a pergunta do gancho no topo (o motor põe) · ondinhas do toque (`K.ondas`) · o balão "Tudo bem?"
  (palavra "tudo") · ✗ vermelho grande na palavra "desliga"
- **SONS:** `zumbido` + `bip` do telefone tocando desde o 1º quadro · `clique` do fone (palavra "atendeu") · `baque` do
  fone batendo + `desliga` (palavra "desliga")

#### 2 · plano `leo` · ~4 s
> "Esse é o Léo. Ele abriu uma agência de marketing, mas a agenda tá vazia."

- **NA TELA:** o Léo no centro, na frente da mesa da esquerda; acima da mesa, a agenda da semana com os 7 dias em
  branco; o janelão com a cidade atrás
- **MOSTRA:** `["personagem", "agenda"]`
- **CENÁRIO:** a metade esquerda do escritório (a agência); a mesa com o computador e a cadeira; a cidade no janelão
- **ENTRA AGORA:** a `agenda`, crescendo acima da mesa na palavra "agenda"
- **OBJETOS SE MEXENDO:** a agenda abre e as 7 colunas aparecem uma por uma, todas vazias; uma bolinha de feno (uma
  bola de poeira) rola pela agenda na palavra "vazia"
- **PERSONAGEM:** na frente da mesa da esquerda, de frente pra câmera · começo: `mostrando` (abre os braços, todo
  orgulhoso da agência) · na palavra "vazia": `triste`, os ombros caem
- **INTERAÇÃO:** ele apresenta a agência com os braços e olha pra agenda vazia quando ela abre
- **CÂMERA:** alvo `[personagem, agenda]`, ele no centro, inteiro, metade da altura · `chegando` · `medio` ·
  `perfil_direita` (um pouco pela direita) · altura `olho` (na frase 1: revelando, perto→médio, de frente, no doutor)
- **EFEITOS VISUAIS:** etiqueta azul "Léo · agência de marketing" (palavra "Léo") · etiqueta vermelha "0 reuniões"
  em cima da agenda (palavra "vazia")
- **SONS:** `ding` da etiqueta (o kit põe) · `brilho` da agenda (palavra "agenda") · `errado` baixinho (palavra
  "vazia")

#### 3 · plano `liga` · ~4 s
> "Se você é o Léo, pega o telefone e liga pra empresas que nem te conhecem."

- **NA TELA:** o Léo no centro-esquerda, com o celular grande na mão e na orelha; as ondas da ligação saindo do celular
  e atravessando a divisória; do outro lado, 3 pontos de interrogação flutuando (as empresas desconhecidas)
- **MOSTRA:** `["personagem", "celular", "divisoria"]`
- **CENÁRIO:** a sala inteira, de lado: as duas metades e a divisória no meio
- **ENTRA AGORA:** o `celular`, subindo pra mão dele na palavra "telefone"; as ondas na palavra "liga"; os 3 "?" laranja
  surgindo do outro lado da divisória na palavra "conhecem"
- **OBJETOS SE MEXENDO:** o celular sobe da mesa pra mão e pra orelha; as ondas (`K.ondas`) viajam da esquerda pra
  direita por cima da divisória; os "?" pulam um de cada vez
- **PERSONAGEM:** na frente da mesa, virado pra divisória · começo: `ideia` (pega o celular, decidido) · na palavra
  "liga": `segurando` o celular na orelha, andando de um lado pro outro (2 passos)
- **INTERAÇÃO:** ele pega o celular e liga; as ondas saem do celular dele pros "?"
- **CÂMERA:** alvo `[personagem, celular, divisoria]` · `passando` (desliza da esquerda pra direita, seguindo as
  ondas) · `aberto` · `frente` · altura `alto` (na frase 2: chegando, médio, perfil direita, olho)
- **EFEITOS VISUAIS:** as ondas · os "?" laranja (palavra "conhecem")
- **SONS:** `whoosh` do celular subindo (palavra "telefone") · `bip bip` da discagem (palavra "liga") · `estalo` de
  cada "?" (palavra "conhecem")

#### 4 · plano `cold_rotulo` · ~2 s
> "Essa é a *cold call*: a ligação fria."

- **NA TELA:** o celular do Léo no centro, grande, ficando coberto de gelo azul; o rótulo "Cold call" do lado
- **MOSTRA:** `["celular"]`
- **CENÁRIO:** atrás, desfocado, o janelão com a cidade
- **ENTRA AGORA:** o gelo no celular (`K.falhar(celular, 'congela')`) na palavra "fria"; o rótulo na palavra "cold"
- **OBJETOS SE MEXENDO:** o celular gira devagar no ar, e o gelo cresce por cima dele na palavra "fria"; a respiração
  do Léo vira fumacinha branca (`K.fumaca`) do lado
- **PERSONAGEM:** ao lado do celular, de perfil, só o ombro e a cabeça no quadro · na palavra "fria": treme de frio
  (`cansado` com `suar` trocado por fumacinha)
- **INTERAÇÃO:** o celular "esfria" o Léo: ele treme quando o gelo cresce
- **CÂMERA:** alvo `celular`, no centro, ocupando metade da tela · `girando` · `detalhe` · `esquerda` · altura
  `olho` (na frase 3: passando, aberto, frente, alto)
- **EFEITOS VISUAIS:** o rótulo amarelo "Cold call" (palavra "cold") · o gelo azul · etiqueta azul "Ligação fria"
  (palavra "fria")
- **SONS:** o som do rótulo (o kit põe) · `estalo` do gelo (o `K.falhar 'congela'` põe)

#### 5 · plano `qualquer` · ~5 s · jogo `falha`
> "Mas ele liga pra qualquer um: a pizzaria não precisa de agência, e a oficina nem atende."

- **NA TELA:** o Léo no canto de baixo à esquerda, com o celular; em leque, acima e à direita dele, 3 cartões de
  contato: "Pizzaria" (fatia de pizza), "Oficina" (chave inglesa), "Padaria" (pão); o cartão de cada um ganha um ✗
- **MOSTRA:** `["contatos", "personagem"]`
- **CENÁRIO:** a agência; o computador desligado na mesa atrás dele
- **ENTRA AGORA:** os 3 cartões `contatos`, caindo do alto um por um, na palavra "qualquer"
- **OBJETOS SE MEXENDO:** os cartões caem e balançam; na palavra "pizzaria", o cartão da pizzaria fica cinza e ganha ✗;
  na palavra "oficina", o cartão da oficina toca (treme) sem ninguém atender e ganha ✗; no fim, os 3 tombam pra trás
  (`K.falhar 'tomba'`)
- **PERSONAGEM:** embaixo à esquerda, de frente pra câmera, com o celular na orelha · começo: `duvida`, olhando os
  cartões · na palavra "oficina": `bravo`, sacode o celular
- **INTERAÇÃO:** cada cartão que ele liga responde com um ✗; a oficina deixa ele esperando
- **CÂMERA:** alvo `[contatos, personagem]`, os cartões no centro · `subindo` · `medio` · `direita` · altura `baixo`
  (na frase 4: girando, detalhe, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Não precisa de agência" no cartão da pizzaria (palavra "pizzaria") · ✗ em
  cada cartão (palavras "pizzaria" e "oficina") · no fim, congela em preto e branco (o `jogo` faz)
- **SONS:** `whoosh` de cada cartão caindo · `errado` (palavra "pizzaria") · `zumbido` do toque sem resposta (palavra
  "oficina") · o congela (o `jogo` põe)

#### 6 · plano `lista_certa` · ~4 s · jogo `corrige`
> "Então você começa pela lista certa: só empresas que podem precisar de você."

- **NA TELA:** a mesa da esquerda com o computador no centro; o Léo sentando na cadeira na frente dele; na tela, uma
  lista em branco com o título "Quem pode precisar de mim?"; os cartões de antes somem
- **MOSTRA:** `["computador", "personagem"]`
- **CENÁRIO:** de volta às cores; a agência, com o janelão atrás do computador
- **ENTRA AGORA:** a tela do computador acende (palavra "lista")
- **OBJETOS SE MEXENDO:** a cena volta a ter cor (o `jogo` corrige); os 3 cartões encolhem e somem; a tela liga e o
  título é digitado; um filtro (funil verde) aparece no canto da tela na palavra "só"
- **PERSONAGEM:** anda até a mesa e fica de frente pro computador, meio de lado pra câmera · começo: andando ·
  na palavra "precisar": `ideia` (dedo pra cima)
- **INTERAÇÃO:** ele liga o computador e começa a montar a lista
- **CÂMERA:** alvo `[computador, personagem]`, o computador no centro · `chegando` · `medio` · `perfil_esquerda` ·
  altura `olho` (na frase 5: subindo, médio, direita, baixo)
- **EFEITOS VISUAIS:** etiqueta verde "Lista certa" em cima do computador (palavra "lista") · o funil na tela (palavra
  "só")
- **SONS:** `liga` do computador (palavra "lista") · `passo` enquanto ele anda · `clique` do teclado

#### 7 · plano `busca` · ~6 s
> "No Mappoa, você busca 'clínicas odontológicas em Campinas', e vem a lista com o telefone que estiver público."

- **NA TELA:** o computador embaixo, no centro; acima dele, subindo, o painel grande da `lista` do Mappoa, na cor do
  canal, enchendo de clínicas (nome, bairro e o ícone de telefone); o Léo do lado, digitando
- **MOSTRA:** `["lista", "computador"]`
- **CENÁRIO:** a agência; o janelão com a cidade atrás do painel (as clínicas são da cidade lá fora)
- **ENTRA AGORA:** a busca na tela, letra por letra, na palavra "busca"; o painel `lista` subindo do computador na
  palavra "lista"
- **OBJETOS SE MEXENDO:** as letras de "clínicas odontológicas em Campinas" entram uma por uma; o painel sobe e os
  cartões das clínicas descem enchendo, um atrás do outro, rápido; na palavra "telefone", o ícone de telefone acende
  verde em cada linha (e em umas, cinza: "sem telefone público")
- **PERSONAGEM:** à esquerda do computador · começo: `segurando` (digitando) · na palavra "lista": `surpreso`, se
  afasta um passo, olhando o painel subir
- **INTERAÇÃO:** ele digita a busca e o computador "responde" soltando o painel pra cima
- **CÂMERA:** alvo `[lista, computador]`, o painel no centro · `subindo` (acompanha o painel do computador até o topo)
  · `medio` → `aberto` · `frente` · altura `olho` → `alto` (na frase 6: chegando, médio, perfil esquerda, olho)
- **EFEITOS VISUAIS:** a busca na tela · contador verde subindo "clínicas: 1 → 100+" do lado do painel (palavra
  "lista") · etiqueta azul "Telefone público" (palavra "telefone")
- **SONS:** `clique` das teclas · `whoosh` do painel subindo · `bip` de cada cartão chegando · `certo` (palavra
  "telefone")

#### 8 · plano `lista_rotulo` · ~2 s
> "Essa é a *lista de prospecção*."

- **NA TELA:** só o painel da lista, de perto, no centro, com as clínicas e os telefones; o rótulo "Lista de
  prospecção" embaixo dele
- **MOSTRA:** `["lista"]`
- **CENÁRIO:** atrás, desfocado, o janelão e a cidade
- **ENTRA AGORA:** o rótulo, na palavra "lista"
- **OBJETOS SE MEXENDO:** o painel gira um pouco no ar (meia volta pra um lado e volta) e brilha amarelo (`K.brilhar`)
- **PERSONAGEM:** na beira de baixo, à esquerda, só da cintura pra cima · na palavra "prospecção": `vitoria` (soquinho
  no ar)
- **INTERAÇÃO:** ele comemora a lista pronta, apontando pra ela
- **CÂMERA:** alvo `lista`, no centro, 2/3 da tela · `girando` · `perto` · `direita` · altura `baixo` (olhando de
  baixo pro painel) (na frase 7: subindo, médio→aberto, frente, olho→alto)
- **EFEITOS VISUAIS:** o rótulo amarelo "Lista de prospecção" · o brilho amarelo
- **SONS:** o som do rótulo (o kit põe) · `brilho`

#### 9 · plano `tudo_bem` · ~5 s · jogo `falha`
> "Mas o doutor atende, e o Léo começa: 'Oi, tudo bem? Como vai o senhor?' E ele desliga."

- **NA TELA:** a sala inteira, as duas metades: o Léo à esquerda com o celular; o doutor à direita com o fone; a
  divisória no meio; o balão do Léo crescendo; no fim, o fone batendo e o ✗
- **MOSTRA:** `["personagem", "doutor", "balao"]`
- **CENÁRIO:** as duas mesas; o janelão atrás das duas
- **ENTRA AGORA:** o `balao` do Léo, na palavra "Oi" ("Oi, tudo bem?"), e na palavra "Como" ele aumenta ("Oi, tudo bem?
  Como vai o senhor?")
- **OBJETOS SE MEXENDO:** o telefone da clínica treme, o doutor atende (palavra "atende"); as ondas vão do Léo pro doutor;
  o balão do Léo cresce e empurra por cima da divisória na palavra "Como"; na palavra "desliga", o doutor bate o fone e
  as ondas se quebram no meio, caindo no chão como cacos
- **PERSONAGEM:** o Léo à esquerda, virado pra divisória, com o celular · começo: `mostrando` (todo simpático, falando
  com a mão) · na palavra "desliga": `susto`. O doutor: atende `duvida`, desliga `bravo`
- **INTERAÇÃO:** o "tudo bem?" do Léo chega no doutor e o doutor desliga na cara dele
- **CÂMERA:** alvo `[personagem, doutor]`, a divisória no centro · `afastando` · `aberto` · `frente` · altura `cima`
  (vista de cima, como uma planta das duas salas) (na frase 8: girando, perto, direita, baixo)
- **EFEITOS VISUAIS:** o balão · etiqueta vermelha "Genérico" (palavra "senhor") · ✗ em cima do doutor (palavra
  "desliga") · no fim, congela em preto e branco (o `jogo` faz)
- **SONS:** `zumbido` do toque · `clique` do fone (palavra "atende") · `baque` + `desliga` (palavra "desliga") · o
  congela (o `jogo` põe)

#### 10 · plano `direto` · ~4 s · jogo `conserta` (⏪, `rebobina` 0,6)
> "Então você vai direto: quem você é e por que ligou, numa frase só."

- **NA TELA:** o Léo de perto, no centro, com o celular; ao lado dele, um balão vazio com 2 caixinhas: "Quem é você" e
  "Por que ligou"; em cima, o contador "1 frase"
- **MOSTRA:** `["personagem", "balao"]`
- **CENÁRIO:** a agência, a mesa e a planta atrás dele
- **ENTRA AGORA:** a caixinha "Quem é você" na palavra "quem"; a caixinha "Por que ligou" na palavra "ligou"; o contador
  "1 frase" na palavra "frase"
- **OBJETOS SE MEXENDO:** a cena volta no tempo (⏪) até antes do "tudo bem?", e o balão genérico encolhe e some; as 2
  caixinhas entram de lados opostos e se juntam numa linha só (palavra "frase")
- **PERSONAGEM:** na frente da mesa, de frente pra câmera · depois do ⏪: `pensando` (mão no queixo) · na palavra "frase":
  `ideia` (dedo pra cima)
- **INTERAÇÃO:** ele junta as duas caixinhas com as mãos, como quem encaixa peças
- **CÂMERA:** alvo `[personagem, balao]`, no centro · `chegando` · `perto` · `perfil_direita` · altura `olho` (com
  `B.q`, o tempo depois do ⏪) (na frase 9: afastando, aberto, frente, de cima)
- **EFEITOS VISUAIS:** o ⏪ do jogo · as 2 caixinhas azuis · o contador "1 frase" (palavra "frase")
- **SONS:** o rebobina (o `jogo` põe) · `trava` quando as caixinhas encaixam (palavra "frase")

#### 11 · plano `fala_abertura` · ~5 s
> "'Doutor, aqui é o Léo. Eu ajudo clínicas de Campinas a atrair pacientes novos.'"

- **NA TELA:** a sala de novo, pelo lado do doutor: o doutor em primeiro plano, à direita, com o fone; a placa da
  clínica atrás; o balão do Léo chegando por cima da divisória com a frase inteira; o Léo lá atrás, do outro lado
- **MOSTRA:** `["doutor", "balao"]`
- **CENÁRIO:** a clínica (metade direita), a placa "Clínica Sorriso", a planta do canto
- **ENTRA AGORA:** o balão com "Doutor, aqui é o Léo." na palavra "Doutor" e a 2ª linha "Ajudo clínicas a atrair
  pacientes novos" na palavra "ajudo"
- **OBJETOS SE MEXENDO:** as ondas vão do Léo pro doutor, agora calmas e certinhas; o balão atravessa a divisória e para
  em cima do doutor; na palavra "pacientes", 3 bonequinhos de paciente (cilindro + esfera, coloridos) pulam pra dentro
  da placa da clínica
- **PERSONAGEM:** o doutor, de frente pra câmera, com o fone · começo: `duvida` (sobrancelha levantada) · na palavra
  "pacientes": `surpreso`, interessado. O Léo, lá atrás: `chamando` (a mão do lado da boca)
- **INTERAÇÃO:** a frase do Léo chega no doutor e prende a atenção dele: ele não desliga
- **CÂMERA:** alvo `[doutor, balao]`, o doutor no centro · `passando` · `medio` · `perfil_esquerda` (por cima do ombro
  do doutor, olhando pra divisória) · altura `olho` (na frase 10: chegando, perto, perfil direita, olho)
- **EFEITOS VISUAIS:** o balão com a frase (2 linhas) · ✓ verde do lado do balão (palavra "novos")
- **SONS:** `bip` das ondas · `estalo` dos bonequinhos pulando (palavra "pacientes") · `certo` (palavra "novos")

#### 12 · plano `abertura_rotulo` · ~1,5 s
> "Essa é a *abertura*."

- **NA TELA:** o balão da abertura no centro, grande, brilhando; o rótulo "Abertura" embaixo
- **MOSTRA:** `["balao"]`
- **CENÁRIO:** atrás, a divisória e o janelão
- **ENTRA AGORA:** o rótulo, na palavra "abertura"
- **OBJETOS SE MEXENDO:** o balão gira meia volta e brilha amarelo (`K.brilhar`)
- **PERSONAGEM:** o Léo embaixo, na beira do quadro · na palavra "abertura": `apontar` pro balão
- **INTERAÇÃO:** ele aponta pra frase que acabou de dizer
- **CÂMERA:** alvo `balao`, no centro, metade da tela · `girando` · `detalhe` · `frente` · altura `baixo` (na frase 11:
  passando, médio, perfil esquerda, olho)
- **EFEITOS VISUAIS:** o rótulo amarelo "Abertura" · o brilho amarelo
- **SONS:** o som do rótulo (o kit põe) · `brilho`

#### 13 · plano `vendendo` · ~4 s · jogo `falha`
> "Mas se você já sai vendendo o pacote, ele fecha a cara."

- **NA TELA:** o Léo à esquerda empurrando uma caixa de presente roxa "PACOTE" contra a divisória; do outro lado, o
  doutor de braços cruzados; o balão do Léo cheio de "!!!"
- **MOSTRA:** `["pacote", "personagem", "doutor"]`
- **CENÁRIO:** as duas metades, a divisória no meio
- **ENTRA AGORA:** o `pacote`, caindo do alto na frente do Léo, na palavra "pacote"
- **OBJETOS SE MEXENDO:** o pacote cai e quica; o Léo empurra ele até a divisória; o pacote bate e treme
  (`K.falhar 'treme'`); na palavra "cara", o doutor vira de lado e o balão do Léo murcha (`K.falhar(balao, 'murcha')`)
- **PERSONAGEM:** o Léo · começo: `empurrando` o pacote · na palavra "cara": `susto`. O doutor: `bravo` na palavra
  "cara", vira o rosto
- **INTERAÇÃO:** o Léo empurra o pacote pra cima do doutor e o doutor fecha a cara
- **CÂMERA:** alvo `[pacote, personagem, doutor]` · `descendo` · `medio` · `tras` virado um pouco pra direita (vê os
  dois de lado, de trás do Léo) · altura `alto` (na frase 12: girando, detalhe, frente, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Cedo demais" (palavra "vendendo") · ✗ em cima do doutor (palavra "cara") ·
  no fim, congela em preto e branco (o `jogo` faz)
- **SONS:** `baque` do pacote caindo (palavra "pacote"; o kit põe) · `range` do pacote contra a divisória · `errado`
  (palavra "cara") · o congela

#### 14 · plano `pergunta` · ~5 s · jogo `corrige`
> "Então você pergunta do negócio dele: 'Hoje, os pacientes novos chegam de onde?'"

- **NA TELA:** o doutor no centro-direita, de frente, pensando com o fone; o balão do Léo com a pergunta em cima dele;
  em volta do doutor, surgindo, 3 ícones de onde vêm os pacientes: "Indicação", "Instagram", "Google" com "?"
- **MOSTRA:** `["doutor", "balao"]`
- **CENÁRIO:** a clínica; a placa atrás; o quadro branco com o gráfico na parede da direita
- **ENTRA AGORA:** o balão com a pergunta, na palavra "Hoje"; os 3 ícones subindo em volta do doutor na palavra "onde"
- **OBJETOS SE MEXENDO:** a cena volta a ter cor (o `jogo` corrige) e o pacote some; o balão chega leve, sem empurrar;
  os 3 ícones sobem e giram em volta da cabeça do doutor
- **PERSONAGEM:** o doutor · começo: `duvida` · na palavra "onde": `pensando` (mão no queixo, falando bastante: boca
  mexendo, `falar`). O Léo, do outro lado, ao fundo: `segurando` o celular, ouvindo
- **INTERAÇÃO:** a pergunta do Léo faz o doutor pensar e começar a falar do negócio dele
- **CÂMERA:** alvo `[doutor, balao]`, o doutor no centro · `chegando` · `perto` · `frente` · altura `olho` (na frase
  13: descendo, médio, de trás, alto)
- **EFEITOS VISUAIS:** o balão com a pergunta · etiqueta azul "Pergunta do negócio" (palavra "negócio") · os 3 ícones
  (palavra "onde")
- **SONS:** `clique` do balão (palavra "Hoje") · `ding` de cada ícone (palavra "onde")

#### 15 · plano `escuta` · ~3 s
> "É por isso que vendedor bom fala menos e escuta mais."

- **NA TELA:** o Léo no centro, perto do bebedouro, com o celular na orelha; do lado esquerdo dele, uma boca vermelha
  encolhendo; do lado direito, uma orelha gigante crescendo
- **MOSTRA:** `["personagem", "orelha", "boca"]`
- **CENÁRIO:** o canto da agência com o bebedouro (o assunto vira a vida real: o vendedor na pausa do café, ouvindo)
- **ENTRA AGORA:** a `boca`, surgindo na palavra "fala"; a `orelha`, crescendo na palavra "escuta"
- **OBJETOS SE MEXENDO:** a boca encolhe até ficar pequenininha (palavra "menos"); a orelha cresce até ficar do tamanho
  da cabeça dele (palavra "mais"); o bebedouro solta umas bolhas
- **PERSONAGEM:** ao lado do bebedouro, de frente pra câmera · começo: `pensando` · na palavra "escuta": inclina a
  cabeça pra orelha, ouvindo, `surpreso`
- **INTERAÇÃO:** ele aponta pra boca encolhendo e depois encosta a mão na orelha gigante
- **CÂMERA:** alvo `[personagem, orelha, boca]`, ele no centro · `revelando` · `medio` · `esquerda` · altura `olho`
  (na frase 14: chegando, perto, frente, olho)
- **EFEITOS VISUAIS:** etiqueta laranja "Fala menos" (palavra "menos") · etiqueta verde "Escuta mais" (palavra "mais")
- **SONS:** `bolhas` do bebedouro · `estalo` da boca encolhendo · `brilho` da orelha crescendo

#### 16 · plano `email` · ~3,5 s · jogo `falha`
> "Mas aí vem a frase clássica: 'Me manda por e-mail.'"

- **NA TELA:** o doutor no centro, de perto, com o fone; o balão dele "Me manda por e-mail."; um envelope de e-mail
  saindo do balão, voando e caindo numa lixeira do lado da mesa
- **MOSTRA:** `["doutor", "balao_dr"]`
- **CENÁRIO:** a clínica; o telefone vermelho na mesa
- **ENTRA AGORA:** o `balao_dr`, na palavra "manda"; o envelope, na palavra "e-mail"; a lixeirinha, na palavra
  "clássica"
- **OBJETOS SE MEXENDO:** o envelope sai voando do balão, dá uma volta no ar e cai dentro da lixeira (palavra "e-mail")
- **PERSONAGEM:** o doutor · começo: `cansado` (olha o relógio, com pressa) · na palavra "e-mail": `mostrando` (faz o
  gesto de "manda aí" com a mão, educado e querendo desligar)
- **INTERAÇÃO:** o doutor "despacha" o Léo pro e-mail, e o e-mail vai direto pro lixo
- **CÂMERA:** alvo `[doutor, balao_dr]`, no centro · `girando` · `perto` · `perfil_direita` · altura `baixo` (na
  frase 15: revelando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** o balão do doutor · etiqueta laranja "A frase clássica" (palavra "clássica") · ✗ no envelope
  quando cai no lixo · no fim, congela em preto e branco
- **SONS:** `whoosh` do envelope · `tampa` da lixeira (palavra "e-mail") · o congela

#### 17 · plano `quinta` · ~5 s · jogo `corrige`
> "Então você não discute: 'Mando sim. E quinze minutinhos na quinta, pra eu te mostrar?'"

- **NA TELA:** a sala inteira de novo, de lado: o Léo à esquerda, calmo, com o celular; o doutor à direita; os dois
  balões; no fim, o doutor fazendo joinha com o balão "Pode ser."
- **MOSTRA:** `["personagem", "doutor", "balao"]`
- **CENÁRIO:** as duas metades e a divisória; o janelão atrás
- **ENTRA AGORA:** o balão do Léo "Mando sim." na palavra "Mando"; a 2ª linha "15 min na quinta?" na palavra "quinze";
  o balão do doutor "Pode ser." na palavra "mostrar"
- **OBJETOS SE MEXENDO:** a cena volta a ter cor (o `jogo` corrige); as ondas vão e voltam devagar (conversa); um
  reloginho de 15 minutos aparece do lado do balão do Léo e dá uma volta (palavra "minutinhos")
- **PERSONAGEM:** o Léo · começo: `mostrando` (palma aberta, sem brigar) · na palavra "mostrar": `vitoria` contida. O
  doutor: `duvida` → `ideia` (joinha) na palavra "mostrar"
- **INTERAÇÃO:** o Léo concorda com o doutor e oferece uma coisa pequena; o doutor aceita
- **CÂMERA:** alvo `[personagem, doutor]`, a divisória no centro · `passando` · `aberto` · `frente` · altura `olho`
  (na frase 16: girando, perto, perfil direita, baixo)
- **EFEITOS VISUAIS:** os dois balões · o reloginho "15 min" (palavra "minutinhos") · ✓ verde no balão do doutor
  (palavra "mostrar")
- **SONS:** `clique` de cada balão · `ding` do reloginho · `certo` (palavra "mostrar")

#### 18 · plano `proximo_passo` · ~4 s
> "Esse é o *próximo passo*. A ligação não vende: ela marca a conversa."

- **NA TELA:** a agenda da semana grande, no centro, de perto; a quinta pintando de verde com "Conversa 15 min ·
  Clínica Sorriso"; o rótulo "Próximo passo"; o Léo embaixo, comemorando
- **MOSTRA:** `["agenda"]`
- **CENÁRIO:** a agência; atrás da agenda, o quadro branco com o gráfico
- **ENTRA AGORA:** o rótulo, na palavra "próximo"; o bloco verde da quinta, descendo e encaixando na agenda na palavra
  "marca"
- **OBJETOS SE MEXENDO:** a agenda brilha (`K.brilhar`); um carimbo "VENDIDO" desce, para no ar, ganha ✗ e some (palavra
  "vende"); o bloco verde da quinta encaixa (palavra "marca")
- **PERSONAGEM:** embaixo, à direita da agenda · começo: `apontar` pra agenda · na palavra "conversa": `comemorar`
- **INTERAÇÃO:** ele aponta pro dia marcado e comemora
- **CÂMERA:** alvo `agenda`, no centro, 2/3 da tela · `subindo` · `perto` · `perfil_esquerda` · altura `olho` (na
  frase 17: passando, aberto, frente, olho)
- **EFEITOS VISUAIS:** o rótulo amarelo "Próximo passo" · o carimbo "VENDIDO" com ✗ (palavra "vende") · etiqueta verde
  "Marca a conversa" (palavra "marca") (no máximo 2 textos de cada vez: o rótulo sai antes da etiqueta)
- **SONS:** o som do rótulo · `errado` no carimbo (palavra "vende") · `trava` do bloco encaixando (palavra "marca")

#### 19 · plano `encontro` · ~3 s
> "Igual primeiro encontro: ninguém pede em casamento no cafezinho."

- **NA TELA:** a mesinha redonda com 2 xícaras de café no centro, perto do bebedouro; em cima dela, uma caixinha
  vermelha que abre e mostra o anel; o Léo do lado, de olhos arregalados
- **MOSTRA:** `["cafe", "anel"]`
- **CENÁRIO:** o canto do bebedouro da agência (o "cafezinho" do escritório)
- **ENTRA AGORA:** a mesinha `cafe`, subindo do chão na palavra "encontro"; a caixinha com o `anel`, caindo em cima da
  mesa na palavra "casamento"
- **OBJETOS SE MEXENDO:** o vapor sobe das xícaras (`K.fumaca`); a caixinha abre e o anel brilha (palavra
  "casamento"); um coraçãozinho sai e estoura (palavra "cafezinho")
- **PERSONAGEM:** atrás da mesinha, de frente pra câmera · começo: `segurando` uma xícara, todo à vontade · na
  palavra "casamento": `susto`, quase derruba o café
- **INTERAÇÃO:** o anel aparecendo na mesa assusta o Léo
- **CÂMERA:** alvo `[cafe, anel]`, a mesinha no centro · `mergulho` · `perto` · `direita` · do `alto` (na frase 18:
  subindo, perto, perfil esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta laranja "Cedo demais!" (palavra "casamento") · ✗ em cima da caixinha (palavra
  "cafezinho") · o vapor do café · o coração
- **SONS:** `brilho` do anel (palavra "casamento") · `estalo` do coração · `errado` baixinho (palavra "cafezinho")

#### 20 · plano `antes_agora` · ~7 s · jogo `avanca` (⏩)
> "Antes, o Léo ligava pra qualquer um e ouvia 'tu tu tu'. Agora, ele liga pra lista certa, com abertura, pergunta e
> próximo passo."

- **NA TELA:** 1ª metade ("Antes"): a cena em preto e branco, o Léo largado na cadeira com o celular, os cartões da
  pizzaria e da oficina com ✗ em volta, o "tu tu tu" escrito saindo do celular. 2ª metade ("Agora"): cor de novo, o
  painel da lista do Mappoa do lado dele e 3 etiquetas verdes com ✓ subindo, uma por palavra
- **MOSTRA:** `["personagem", "lista"]`
- **CENÁRIO:** a agência inteira, com o janelão e a cidade; na 2ª metade, a luz do dia mais forte no janelão
- **ENTRA AGORA:** os cartões e o "tu tu tu" (palavra "tu"); a `lista` (palavra "lista"); as etiquetas "Abertura",
  "Pergunta", "Próximo passo" (cada uma na sua palavra)
- **OBJETOS SE MEXENDO:** na 1ª metade, os "tu tu tu" saem do celular e caem no chão; na palavra "Agora", a cena ganha
  cor (⏩), os cartões somem e a lista sobe; as 3 etiquetas sobem empilhando ao lado dele
- **PERSONAGEM:** começo: `cansado` na cadeira · na palavra "Agora": levanta num pulo e `vitoria`, apontando cada
  etiqueta que sobe (`apontar`)
- **INTERAÇÃO:** no "Antes", o celular derruba ele de cansaço; no "Agora", ele levanta e monta a ligação peça por peça
- **CÂMERA:** alvo `[personagem, lista]`, ele no centro · `afastando` · `medio` → `aberto` · `frente` · altura `alto`
  (na frase 19: mergulho, perto, direita, de cima)
- **EFEITOS VISUAIS:** o preto e branco no "Antes" · etiquetas vermelhas "Qualquer um" e "tu tu tu" (palavras
  "qualquer" e "tu") · ⏩ (palavra "Agora") · 3 etiquetas verdes com ✓ ("Abertura", "Pergunta", "Próximo passo"), saindo
  as vermelhas antes (no máximo 2 textos de cada vez: as etiquetas verdes empilham numa placa só, com os 3 itens)
- **SONS:** `desliga` repetido 3 vezes, baixinho (palavra "tu") · o ⏩ (o `jogo` põe) · `certo` em cada etiqueta verde

#### 21 · plano `segue` · ~6 s
> "Qual frase você usa pra abrir uma ligação? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Léo sentado na frente do computador da agência, digitando; acima do computador, a barra de endereço
  grande com "mappoa.com" sendo digitado letra por letra, legível; no topo, o cartão de seguir
- **MOSTRA:** `["navegador", "computador", "personagem"]`
- **CENÁRIO:** a agência; o janelão com a cidade atrás
- **ENTRA AGORA:** um balão de comentário (💬) saindo dele na palavra "Comenta"; a barra `navegador`, crescendo acima do
  computador na palavra "computador"; "mappoa.com" letra por letra na palavra "digita"; o cartão de seguir no topo (o
  kit põe)
- **OBJETOS SE MEXENDO:** o balão de comentário sobe e estoura; as letras de "mappoa.com" entram uma por uma; o botão
  "Ir" pisca verde na palavra "testa"
- **PERSONAGEM:** começo: de frente pra câmera, `chamando` (pergunta pra quem assiste) · na palavra "computador": vira
  pro computador e digita (`segurando`), e na palavra "testa" aponta pra barra (`apontar`)
- **INTERAÇÃO:** ele digita mappoa.com no computador e aponta pro endereço
- **CÂMERA:** alvo `[navegador, computador, personagem]`, a barra no centro · `chegando` · `aberto` · `frente` · altura
  `olho` · topo livre pro cartão de seguir (`espacoCima: 0.4`) (na frase 20: afastando, médio→aberto, frente, alto)
- **EFEITOS VISUAIS:** o balão de comentário (palavra "Comenta") · a barra com "mappoa.com" grande · o cartão de seguir
  no topo
- **SONS:** `estalo` do balão · `clique` de cada letra · `ding` no "Ir" (palavra "testa")

#### cauda · plano `cartao` · 1,6 s
- O cartão de seguir no topo, o botão "+ Seguir" vira "Seguindo"; o Léo aponta pro cartão e acena; a barra
  "mappoa.com" continua lá embaixo, legível; câmera `parado`, `aberto`, topo livre

## Cada cena em 2 linhas

1. O telefone vermelho da clínica toca e treme; o dono atende, chega um "Tudo bem?" e ele bate o fone na cara. / O
   doutor atende e desliga bravo; a câmera começa no telefone e abre até ele.
2. O Léo na agência dele, e uma agenda da semana abre do lado, toda vazia. / Ele se apresenta orgulhoso e murcha; a
   câmera chega de lado.
3. O Léo pega o celular e liga; as ondas atravessam a divisória e batem em pontos de interrogação. / Ele anda falando
   no celular; a câmera passa de lado, vendo a sala inteira de cima.
4. O celular dele congela, coberto de gelo azul, com o nome "Cold call". / Ele treme de frio; a câmera gira pertinho
   do celular.
5. Caem 3 cartões: pizzaria, oficina, padaria, e cada um ganha um ✗. / Ele fica bravo sacudindo o celular; a câmera
   sobe de baixo.
6. A cor volta, os cartões somem e o computador acende com "Lista certa". / Ele anda até a mesa e tem a ideia; a
   câmera chega de lado.
7. Ele digita "clínicas odontológicas em Campinas" e o painel do Mappoa sobe, enchendo de clínicas com telefone. / Ele
   se afasta surpreso; a câmera sobe junto com o painel.
8. O painel gira e brilha, com o nome "Lista de prospecção". / Ele dá um soquinho no ar; a câmera olha de baixo.
9. A sala vista de cima: o Léo solta "Oi, tudo bem? Como vai o senhor?" e o doutor desliga na cara. / O Léo leva um
   susto; a câmera se afasta, de cima.
10. ⏪ Volta no tempo; duas caixinhas "Quem é você" e "Por que ligou" se juntam numa frase só. / Ele pensa e tem a
    ideia; a câmera chega pertinho, de lado.
11. A frase certa atravessa a divisória e chega no doutor; bonequinhos de paciente pulam pra placa da clínica. / O
    doutor fica interessado; a câmera passa por cima do ombro dele.
12. O balão da abertura gira e brilha, com o nome "Abertura". / O Léo aponta; a câmera gira de baixo.
13. O Léo empurra uma caixa de presente "PACOTE" contra a divisória, e o doutor fecha a cara. / Susto do Léo, doutor
    bravo; a câmera desce, de trás do Léo.
14. A pergunta "Os pacientes novos chegam de onde?" chega, e em volta do doutor surgem Indicação, Instagram e Google. /
    O doutor pensa e começa a falar; a câmera chega de frente.
15. Do lado do Léo, a boca encolhe e uma orelha gigante cresce, perto do bebedouro. / Ele inclina a cabeça pra escutar;
    a câmera revela de lado.
16. O doutor diz "Me manda por e-mail" e o envelope voa direto pra lixeira. / Ele faz o gesto de "manda aí"; a câmera
    gira de baixo.
17. O Léo responde "Mando sim. 15 min na quinta?" e o doutor faz joinha: "Pode ser." / Os dois conversam calmos; a
    câmera passa de frente pela sala.
18. A agenda volta e a quinta pinta de verde; o carimbo "VENDIDO" ganha ✗. / Ele aponta e comemora; a câmera sobe de
    lado.
19. Uma mesinha de café, e de repente uma caixinha com anel de noivado abre em cima dela. / O Léo quase derruba o café;
    a câmera mergulha de cima.
20. Preto e branco: o Léo largado, "tu tu tu" caindo do celular. Depois cor: a lista e 3 ✓ (abertura, pergunta,
    próximo passo). / Ele levanta num pulo e aponta cada um; a câmera se afasta.
21. O Léo pergunta pra quem assiste e digita "mappoa.com" no computador, com o endereço grande; o cartão de seguir no
    topo. / Ele digita e aponta pro endereço; a câmera chega de frente.
