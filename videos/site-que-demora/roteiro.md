# O site que demora pra abrir: roteiro e ficha de cena

> Vídeo 2 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: autoescolas de Goiânia. O site da Autoescola Via Certa, da dona Rita, fica rodando no celular e não
> abre. O aluno cansa de esperar e vai tirar a carta na autoescola da esquina. O Léo, web designer sem cliente, abre
> site por site na mão até de madrugada, e decide investir o valor de um lanche num sistema que mostra quais sites nem
> respondem.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (o aluno que virou esqueleto esperando na frente de uma barra de
> carregando do tamanho de um outdoor, com teia de aranha, e que desmonta no chão em "já foi"), cortes a cada ~0,8 s nos
> 3 primeiros segundos, problema que dá pra VER (a rodinha girando, os 3%), o personagem já dentro da ação (sem "Esse é
> o ..."), o Mappoa entrando tarde como decisão de investir (sem valor exato, nunca "grátis"), mappoa.com digitado no
> computador, o Mappoa como **sistema**, ~53 s e o pedido de comentário de UMA palavra no fim (ESPERAVA ou FECHAVA),
> sem prometer mandar nada. O fim amarra com o gancho: "chega antes do aluno virar esqueleto".

## Roteiro

1. O cliente clicou no site da autoescola. Se demora pra abrir, ele já foi. *(gancho, a frase da pauta)*
2. O Léo é web designer, tá sem cliente, e essa autoescola perde aluno todo dia.
3. No celular, o site da dona Rita fica rodando, rodando, e não abre.
4. O aluno cansou de esperar e foi tirar a carta na autoescola da esquina.
5. E o Léo abria site por site, procurando cliente na mão, até de madrugada.
6. Então ele resolveu investir o valor de um lanche num sistema que mostra quais sites nem respondem.
7. Digitou mappoa.com no computador, e veio a lista das autoescolas de Goiânia, com os sites que não responderam.
8. Esse é o *Mappoa*, que acha quem precisa do seu serviço, já com o contato.
9. O Léo manda a mensagem pronta pra dona Rita, e ela pede um site que abre rápido.
10. Antes, o Léo caçava cliente na mão. Agora, ele chega antes do aluno virar esqueleto.
11. E você, esperava carregar ou fechava? Comenta ESPERAVA ou FECHAVA e segue. No computador, digita mappoa.com e testa você também.

Cerca de 167 palavras, uns 53 s com o cartão de seguir (~950 caracteres da ElevenLabs; sobram ~9.100).

**Gancho:** a frase da pauta. Outras opções pensadas: "Três segundos carregando e o cliente já tá na outra
autoescola." e "O site da autoescola tá carregando desde o ano passado." Fiquei com a da pauta (é o estilo do canal:
situação + "se você fizer X, acontece Y") e a imagem absurda da pauta: o cliente virou esqueleto esperando.
1º quadro: no calçadão, na frente da AUTOESCOLA, um telão do tamanho de um outdoor com a rodinha girando e a barra parada
em 3%; embaixo, um esqueleto em pé, com o celular na mão e teia de aranha entre o crânio e o ombro.

**Capa:** "Ainda *carregando*?" (19 letras), com o esqueleto de celular na mão embaixo do telão dos 3%.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o valor de um lanche" é o espírito do investimento, sem valor
- O Mappoa não mede a velocidade do site (`canal/produto.md`): ele entra no site e marca se abriu, e um dos resultados
  é "não respondeu (demorou demais)". Por isso a narração diz "mostra quais sites nem respondem" e a lista mostra
  "Site não respondeu", nunca "site lento" medido em segundos
- O Mappoa gera a mensagem; quem manda é o Léo ("o Léo manda a mensagem pronta"). Nada de "garante a venda": a dona Rita
  só "pede um site"
- Telas desenhadas genéricas, autoescolas e endereços inventados, sem logo de nenhuma empresa real

## Cenários

`rua_predios` (o calçadão de dia, com a loja trocada pra placa AUTOESCOLA VIA CERTA e o carro branco da autoescola
estacionado, com a placa no teto) → `home_office` (o quarto do Léo, de dia e de noite) → `mundo_mappoa` (o palco da
marca). A dona Rita é o `K.personagem('dona')` de blazer vermelho; o aluno é um `K.boneco` de moletom verde.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `carregando` | telão gigante (3,6 × 2,2) num pé duplo, com o site em branco, a rodinha girando e a barra em 3% | calçadão, na frente da autoescola | 1, capa |
| `esqueleto` | esqueleto de cor osso (crânio com queixo que mexe, costelas, braços segurando o celular, pernas), com teia de aranha | calçadão, embaixo do telão | 1, capa |
| `carro` | carro branco da autoescola (K.carro) com a placa "AUTOESCOLA" no teto | calçadão, do lado da loja | 1, 2, 3, 9, 10 |
| `placa` | a placa AUTOESCOLA VIA CERTA na frente da loja do calçadão | rua_predios | 1, 3 |
| `dona` | a dona Rita (K.personagem dona, blazer vermelho) | calçadão, do lado do carro | 2, 3, 9, 10 |
| `aluno` | moço de moletom verde (K.boneco) com o celular | calçadão | 4, 10 |
| `celular` | celular gigante: o site rodando, a mensagem do WhatsApp, o site novo | calçadão, na frente da dona Rita / do aluno | 3, 4, 9, 10 |
| `personagem` | o Léo (personagem do canal) | quarto, palco, calçadão | 2, 5, 6, 7, 8, 9, 10, 11 |
| `monitor` | computador do Léo com mesa | quarto | 2, 5, 6, 7, 9, 10, 11 |
| `abas` | torre de janelinhas de site abertas uma em cima da outra ("Carregando...", "Não abriu") | quarto de noite, do lado da mesa | 5, 10 |
| `despertador` | despertador com os ponteiros correndo até as 3h | mesa do quarto | 5 |
| `lanche` | um sanduíche (pão, hambúrguer, queijo, alface) na mão do Léo (o investimento) | quarto | 6 |
| `navegador` | a barra com mappoa.com | acima do monitor | 7, 11 |
| `tela` | painel do Mappoa: lista das autoescolas, o lead da Via Certa, a mensagem pronta | quarto, palco | 7, 8, 9 |
| `robo` | robô do Mappoa | palco, quarto | 8, 11 |

## Teste dos substantivos

cliente / site / autoescola (1: o esqueleto com o celular, o telão e a loja AUTOESCOLA) · demora (1: a rodinha e os
3%, etiqueta "Carregando há 3 anos...") · Léo / web designer / cliente (2: etiquetas) · autoescola / aluno (2: o carro e
a dona Rita, etiqueta "Perde aluno todo dia") · celular / site / dona Rita (3: o celular gigante rodando) · aluno /
esperar / carta / autoescola da esquina (4: o aluno olha o relógio e vai embora, etiqueta "Foi pra da esquina") · site
por site / madrugada (5: a torre de abas e o despertador nas 3h) · lanche / sistema / sites que não respondem (6: o
lanche entra no computador, etiqueta) · mappoa.com / computador / lista / autoescolas / Goiânia (7) · Mappoa / contato
(8: o lead com WhatsApp e telefone) · mensagem / dona Rita / site que abre rápido (9: o WhatsApp no celular dela e o
balão) · esqueleto (10: o aluno feliz com o site aberto, no lugar do esqueleto) · você / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,0 s
> "O cliente clicou no site da autoescola. Se demora pra abrir, ele já foi."

- NA TELA: no meio do calçadão, o telão gigante "Carregando... 3%" com a rodinha girando; embaixo, à direita do pé, o
  esqueleto em pé segurando o celular, com teia de aranha; ao fundo a placa AUTOESCOLA e o carro branco
- MOSTRA: ["carregando", "esqueleto"]
- CENÁRIO: a rua entre prédios de dia, gente andando, carros nas esquinas (o cenário cuida)
- ENTRA AGORA: nada entra: no 1º quadro o esqueleto já está lá, esperando; em "demora", a etiqueta
- OBJETOS SE MEXENDO: a rodinha girando o tempo todo; a barra tenta passar de 3% e volta; o queixo do esqueleto cai
  (palavra "clicou"); em "foi" o esqueleto desmonta e os ossos caem no chão, o crânio rolando
- PERSONAGEM: o esqueleto (não é boneco) · começo: parado com o celular · em "clicou": o queixo cai · em "foi":
  desmonta
- INTERAÇÃO: o esqueleto segura o celular apontado pro telão
- CÂMERA: 4 cortes · (1) 0–0,8 s: o crânio e o celular de perto, chegando · (2) 0,8–1,6 s: o telão de baixo,
  subindo, com o esqueleto na frente · (3) 1,6 s até "foi": tudo, afastando, de frente · (4) de "foi" ao fim: passando,
  médio, direita, com o ✗
- EFEITOS VISUAIS: etiqueta laranja "Carregando há 3 anos..." (palavra "demora") · ✗ vermelho enorme no telão (palavra
  "foi") · poeira na batida dos ossos
- SONS: clique no 1º quadro · estalo do queixo · madeira (os ossos batendo) em "foi" · errado no ✗

#### 2 · plano `leo` · ~4,0 s
> "O Léo é web designer, tá sem cliente, e essa autoescola perde aluno todo dia."

- NA TELA: (1) o quarto do Léo de dia; ele sentado no computador com o site de exemplo dele · (2) em "autoescola": o
  calçadão, a dona Rita do lado do carro da autoescola, olhando a rua vazia
- MOSTRA: ["personagem", "monitor"]
- CENÁRIO: home_office de dia → a rua
- ENTRA AGORA: etiqueta "Web designer" (palavra "designer"); "Sem cliente" (palavra "cliente"); "Perde aluno todo dia"
  (palavra "aluno")
- OBJETOS SE MEXENDO: o site de exemplo no monitor; na rua, gente passando reto
- PERSONAGEM: o Léo sentado · começo: digitando · em "cliente": coça a cabeça · a dona Rita: olha o relógio
- INTERAÇÃO: o Léo digita no computador; a dona Rita espera do lado do carro
- CÂMERA: (1) até "autoescola": passando, perto, direita, olho · (2) chegando, médio, frente, no carro e na dona Rita
  (gancho: passando, médio, direita)
- EFEITOS VISUAIS: as etiquetas azul, vermelha e vermelha
- SONS: cliques, pingo em "cliente", whoosh na troca

#### 3 · plano `site` · ~3,6 s · jogo `falha`
> "No celular, o site da dona Rita fica rodando, rodando, e não abre."

- NA TELA: o calçadão na frente da AUTOESCOLA; o celular gigante com a barra do endereço e a rodinha girando; a dona
  Rita do lado dele, orgulhosa
- MOSTRA: ["celular", "dona"]
- CENÁRIO: a rua de dia
- ENTRA AGORA: o celular sobe do chão (palavra "celular")
- OBJETOS SE MEXENDO: a rodinha gira cada vez mais devagar; em "não abre" a tela fica cinza com "Não foi possível
  carregar"
- PERSONAGEM: a dona Rita · começo: mostrando o celular, orgulhosa · em "abre": encolhe os ombros
- INTERAÇÃO: a dona Rita apresenta o site com a mão
- CÂMERA: (1) até "rodando": chegando, perto, frente, no celular · (2) girando, médio, esquerda, no celular e na dona Rita
  (frase 2: médio, frente)
- EFEITOS VISUAIS: etiqueta vermelha "Não abre" (palavra "abre") · ✗ · no fim congela em preto e branco (o jogo)
- SONS: clique em "celular" · range em "rodando" · errado em "abre"

#### 4 · plano `aluno` · ~3,6 s
> "O aluno cansou de esperar e foi tirar a carta na autoescola da esquina."

- NA TELA: o calçadão; o aluno de moletom com o celular gigante do lado, ainda rodando
- MOSTRA: ["aluno", "celular"]
- CENÁRIO: a rua de dia, gente andando
- ENTRA AGORA: etiqueta "Foi pra da esquina" (palavra "esquina")
- OBJETOS SE MEXENDO: a rodinha girando; o celular vibra em "cansou"
- PERSONAGEM: o aluno · começo: olha o relógio · em "cansou": faz que não · em "foi": vai embora andando
- INTERAÇÃO: o aluno larga o celular e sai
- CÂMERA: (1) até "foi": chegando, perto, direita, olho · (2) seguindo o aluno de trás (frase 3: girando, esquerda)
- EFEITOS VISUAIS: "?" e depois a etiqueta vermelha
- SONS: bip, errado em "cansou", passos

#### 5 · plano `procura` · ~3,8 s
> "E o Léo abria site por site, procurando cliente na mão, até de madrugada."

- NA TELA: o quarto de noite; o Léo digitando; a torre de abas crescendo do lado da mesa, cada aba "Carregando..." ou
  "Não abriu"; o despertador correndo até as 3h
- MOSTRA: ["personagem", "abas", "despertador"]
- CENÁRIO: home_office de noite, a janela escura
- ENTRA AGORA: as abas, uma por uma, empilhando (a partir de "site")
- OBJETOS SE MEXENDO: a torre balança; os ponteiros giram rápido; o despertador toca em "madrugada"
- PERSONAGEM: sentado · começo: digitando · em "madrugada": cochila (Zzz)
- INTERAÇÃO: o Léo digita e cada clique abre uma aba
- CÂMERA: (1) até "procurando": girando, médio, esquerda · (2) passando, médio, na torre e no despertador (frase 4:
  seguindo de trás na rua)
- EFEITOS VISUAIS: etiqueta vermelha "Site por site..." (palavra "site")
- SONS: um clique por aba, o toque do despertador

#### 6 · plano `investe` · ~4,6 s · jogo `corrige`
> "Então ele resolveu investir o valor de um lanche num sistema que mostra quais sites nem respondem."

- NA TELA: o quarto de dia; o Léo de pé ao lado da mesa com o lanche na mão; o lanche voa pro monitor
- MOSTRA: ["personagem", "lanche", "monitor"]
- CENÁRIO: home_office de dia
- ENTRA AGORA: o lanche aparece na mão (palavra "lanche") · a etiqueta verde "Investimento" (palavra "investir")
- OBJETOS SE MEXENDO: o lanche voa em arco, girando e encolhendo, até o monitor e some num poof (palavra "sistema"); o
  monitor carrega (barra enchendo)
- PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "respondem": comemora
- INTERAÇÃO: o Léo "investe" o lanche no computador
- CÂMERA: (1) até "sistema": chegando, perto, direita, olho · (2) passando, perto, esquerda (frase 5: médio na torre)
- EFEITOS VISUAIS: "Investimento" verde · "Mostra quem não respondeu" verde (palavra "respondem")
- SONS: ding em "lanche" · whoosh · brilho no poof · certo

#### 7 · plano `lista` · ~4,2 s
> "Digitou mappoa.com no computador, e veio a lista das autoescolas de Goiânia, com os sites que não responderam."

- NA TELA: a barra com mappoa.com acima do monitor; a lista das autoescolas de Goiânia sobe do computador, cada uma com
  a pílula laranja "Site não respondeu"
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: home_office de dia
- ENTRA AGORA: a barra cresce (palavra "Digitou"); a lista sobe do monitor (palavra "lista")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; as autoescolas entrando uma por uma (palavra "autoescolas")
- PERSONAGEM: começo: digitando · em "lista": levanta e aponta a Via Certa
- INTERAÇÃO: o Léo digita e aponta a lista
- CÂMERA: (1) por cima do ombro olhando o endereço, perto, esquerda · (2) chegando, médio, frente (frase 6: passando)
- EFEITOS VISUAIS: etiqueta azul "Goiânia" (palavra "Goiânia")
- SONS: cliques, brilho, bips

#### 8 · plano `mappoa` · ~3,6 s
> "Esse é o *Mappoa*, que acha quem precisa do seu serviço, já com o contato."

- NA TELA: o palco da marca; o lead da Autoescola Via Certa (dados da empresa, "Site não respondeu", os contatos
  WhatsApp, telefone e Instagram); o robô e o Léo
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: mundo_mappoa, cartões e pinos flutuando
- ENTRA AGORA: o painel cai do alto (palavra "Mappoa")
- OBJETOS SE MEXENDO: os contatos aparecem um por um (palavra "contato")
- PERSONAGEM: começo: chamando · em "contato": comemorando
- INTERAÇÃO: o robô acena e o Léo apresenta o lead
- CÂMERA: (1) chegando, médio, frente, baixo · (2) passando, médio, esquerda (frase 7: médio, frente, olho)
- EFEITOS VISUAIS: rótulo "Mappoa" · "Já com o contato" verde
- SONS: brilho, ding, certo

#### 9 · plano `mensagem` · ~3,8 s
> "O Léo manda a mensagem pronta pra dona Rita, e ela pede um site que abre rápido."

- NA TELA: (1) o quarto: o Léo na frente da mensagem pronta do Mappoa, clicando em "Enviar pelo WhatsApp" · (2) em
  "dona": o calçadão, a dona Rita com o celular gigante mostrando a mensagem do Léo e a resposta dela
- MOSTRA: ["dona", "celular"]
- CENÁRIO: home_office → a rua
- ENTRA AGORA: a bolha da mensagem (palavra "dona"); a bolha da resposta (palavra "pede")
- OBJETOS SE MEXENDO: o celular vibra quando a mensagem chega
- PERSONAGEM: o Léo aponta o botão · a dona Rita: lê no celular, surpresa · em "pede": comemora
- INTERAÇÃO: o Léo manda; a dona Rita lê e responde
- CÂMERA: (1) até "dona": chegando, perto, frente, na tela · (2) passando, perto, direita, no celular e na dona Rita
  (frase 8: no palco)
- EFEITOS VISUAIS: balão de fala "Quero um site que abre rápido!" · ✓
- SONS: clique no enviar · pingo da mensagem · certo em "pede"

#### 10 · plano `antes_agora` · ~3,9 s · jogo `avanca`
> "Antes, o Léo caçava cliente na mão. Agora, ele chega antes do aluno virar esqueleto."

- NA TELA: (1) Antes: o Léo sentado de noite, a torre de abas do lado · (2) Agora: no calçadão, o Léo e a dona Rita do
  lado do carro, o aluno com o celular aberto no site novo
- MOSTRA: ["personagem", "dona"]
- CENÁRIO: o quarto de noite → a rua
- ENTRA AGORA: "Caçando cliente" vermelho (Antes); "Abriu na hora" verde (palavra "esqueleto")
- OBJETOS SE MEXENDO: no Agora, o celular gigante mostra o site novo da Via Certa, aberto
- PERSONAGEM: Antes: mão na testa · Agora: o Léo vitória, a dona Rita aplaudindo, o aluno comemorando
- INTERAÇÃO: os três comemoram juntos
- CÂMERA: (1) afastando, médio, direita · (2) passando, médio, esquerda (frase 9: perto, direita)
- EFEITOS VISUAIS: as duas etiquetas · o ⏩ do jogo
- SONS: errado no Antes, certo no Agora

#### 11 · plano `segue` · ~6,5 s
> "E você, esperava carregar ou fechava? Comenta ESPERAVA ou FECHAVA e segue. No computador, digita mappoa.com e testa
> você também."

- NA TELA: o Léo de pé no quarto; a pergunta no topo; depois o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: home_office de dia
- ENTRA AGORA: a pergunta (no começo); o cartão de seguir (palavra "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; o botão Seguir apertado
- PERSONAGEM: começo: chamando · em "digita": digitando
- INTERAÇÃO: o Léo digita mappoa.com; o robô acena
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- EFEITOS VISUAIS: a pergunta "Esperava carregar ou fechava? Comenta ESPERAVA ou FECHAVA" · o cartão de seguir
- SONS: cliques, ding em "testa", o clique do Seguir
