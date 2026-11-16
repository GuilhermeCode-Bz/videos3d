# O site sem botão de contato: roteiro e ficha de cena

> Vídeo 5 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: vidraçarias de Campo Grande. O site da Vidraçaria Cristal, da dona Neide, tem foto, tem endereço,
> mas não tem nenhum jeito de chamar: nem WhatsApp, nem telefone, nem formulário. No vídeo, o site é uma PAREDE LISA
> GIGANTE no calçadão, com o site pintado nela e nenhuma porta: o cliente, com o pedido de orçamento na mão, tateia a
> parede procurando por onde entrar, desiste e entra na vidraçaria do lado, que tem uma porta verde "Chamar no
> WhatsApp". O Thiago, web designer sem cliente, procura cliente um por um na mesa da cozinha e decide investir o preço
> de um sobá (o prato de Campo Grande) num sistema que acha quem precisa de site.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (o cliente minúsculo com as mãos na parede lisa de 6 m, sem
> porta), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (a parede sem porta = o site sem botão),
> o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa entrando tarde como decisão de investir (sem valor
> exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como **sistema**, ~53 s e o pedido de comentário
> de UMA palavra no fim (ACHAVA ou DESISTIA), sem prometer mandar nada.
> Outro cenário e outra composição que os vídeos 1 a 4: o calçadão da `cidade` com a parede gigante (o 1 e o 2 eram a
> rua entre prédios, de frente pra uma loja), a `oficina` virada vidraçaria (cavaletes de vidro), a `cozinha` do Thiago
> (de dia e de noite) e a `central_mappoa` (sala de controle com o mapa, no lugar do palco da marca).

## Roteiro

1. O cliente quer pedir orçamento. Se o site não tem como chamar, ele desiste. *(gancho, a frase da pauta)*
2. O Thiago é web designer, tá sem cliente, e essa vidraçaria perde orçamento assim.
3. O site da dona Neide tem foto, tem endereço, e nenhum botão de WhatsApp.
4. O cliente rodou a página inteira e chamou a vidraçaria do lado.
5. E o Thiago procurava cliente um por um, na mesa da cozinha.
6. Então ele decidiu investir o preço de um sobá num sistema que acha quem precisa de site.
7. Digitou mappoa.com no computador, e veio a lista das vidraçarias de Campo Grande, com e sem site.
8. Esse é o *Mappoa*: acha quem precisa de site e mostra as dores de cada empresa.
9. O Thiago confere o site, manda a mensagem pronta, e a dona Neide pede um site novo.
10. Antes, o Thiago caçava cliente. Agora, o cliente da dona Neide chama com um toque.
11. E você, achava o botão ou desistia? Comenta ACHAVA ou DESISTIA e segue. No computador, digita mappoa.com e testa você também.

Cerca de 165 palavras, uns 53 s com o cartão de seguir (~950 caracteres da ElevenLabs; sobram ~6.400).

**Gancho:** a frase da pauta. Outras opções pensadas: "Esse cliente tá procurando a porta do site há dez minutos." e
"O site da vidraçaria é uma parede: bonita, e sem porta." Fiquei com a da pauta (situação + "se você fizer X, acontece
Y") e a imagem da pauta: o cliente procurando a porta numa parede lisa gigante, que aqui É o site da vidraçaria.
1º quadro: a parede de 6 m com o site pintado, sem porta nenhuma, e o cliente minúsculo tateando com as duas mãos;
depois, de baixo, rente à parede, a altura dela em cima dele.

**Capa:** "Cadê o *botão*?" (14 letras), com o cliente desesperado, de mãos na parede gigante do site.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o preço de um sobá" (o prato típico de Campo Grande) é o espírito do
  investimento
- O Mappoa **não** detecta site sem botão de contato (`canal/produto.md`). A virada é ele achar as vidraçarias de Campo
  Grande, separar com site e sem site, e a análise da IA escrever as dores ("Site desatualizado", "Presença digital
  fraca", que o produto.md permite). Quem descobre que o site não tem botão é o **Thiago**, abrindo o site ("o Thiago
  confere o site"). Nenhuma tela diz "site sem botão detectado"
- O Mappoa gera a mensagem; quem manda é o Thiago. Nada de "garante a venda": a dona Neide só "pede um site novo"
- Telas desenhadas genéricas; vidraçarias, sites e endereços inventados

## Cenários

`cidade` (o calçadão: a parede gigante do site e a parede da vidraçaria do lado; frases 1, 3, 4, 10 e a capa) →
`oficina` virada vidraçaria (placa "VIDRAÇARIA CRISTAL" e os cavaletes com placas de vidro; frases 2 e 9) → `cozinha`
(a mesa do Thiago no meio da cozinha; de dia e de noite) → `central_mappoa` (a sala de controle com o mapa e os robôs).
A dona Neide é o `K.personagem('dona')`; o cliente é um `K.boneco` de camiseta laranja e bermuda jeans.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `muro` | parede lisa gigante (7,5 × 5,6 m) com o site da Vidraçaria Cristal pintado: foto do box, endereço, nenhum botão | calçadão, x -0,5, z -1,6 | 1, 3, 4, 10, capa |
| `porta` | a porta verde "Chamar no WhatsApp" que aparece na parede do site novo | na parede, x 0,4 | 10 |
| `vizinha` | parede menor (2,6 × 3,4 m) da Vidros Ipê, com o botão-porta verde "Chamar no WhatsApp" | calçadão, x 5,3 | 4 |
| `cliente` | moço de camiseta laranja e bermuda jeans (K.boneco), com o papel do orçamento | calçadão | 1, 3, 4, 10, capa |
| `orcamento` | papel "ORÇAMENTO" na mão do cliente | mão dele | 1, 4 |
| `dona` | a dona Neide (K.personagem dona) | vidraçaria, calçadão | 2, 3, 9, 10 |
| `vidros` | cavalete com 5 placas de vidro | vidraçaria | 2, 9 |
| `telefone` | telefone mudo no balcão da vidraçaria | vidraçaria | 2 |
| `celular` | celular gigante com o WhatsApp | vidraçaria | 9 |
| `personagem` | o Thiago (personagem do canal) | cozinha, central, calçadão | 2, 5, 6, 7, 8, 9, 10, 11 |
| `monitor` | computador do Thiago com mesa e cadeira, no meio da cozinha | cozinha | 2, 5, 6, 7, 9, 11 |
| `papeis` | bolas de papel amassado se acumulando na mesa e no chão | cozinha de noite | 5, 10 |
| `soba` | tigela de sobá (caldo, macarrão, omelete, cebolinha e os hashis) | cozinha | 6 |
| `navegador` | a barra com mappoa.com | acima do monitor | 7, 11 |
| `tela` | painel do Mappoa: a lista das vidraçarias, a análise, a mensagem pronta | cozinha, central | 7, 8, 9 |
| `robo` | robô do Mappoa | central, cozinha | 8, 11 |

## Teste dos substantivos

cliente / orçamento (1: o cliente com o papel "ORÇAMENTO") · site / chamar (1: a parede do site sem porta, etiqueta "Sem
botão de contato") · desiste (1: ele larga o papel, ✗) · Thiago / web designer / cliente (2: etiquetas) · vidraçaria /
orçamento (2: a vidraçaria com a placa, o telefone mudo, "Perde orçamento") · site / dona Neide / foto / endereço (3:
a parede, ✓ na foto e ✓ no endereço) · botão de WhatsApp (3: o quadrado tracejado vazio com ✗) · página inteira (4: o
cliente anda a parede toda) · vidraçaria do lado (4: a parede da Vidros Ipê com a porta verde) · um por um / mesa da
cozinha (5: a cozinha de noite, os papéis amassados) · sobá / sistema / site (6) · mappoa.com / computador / lista /
vidraçarias / Campo Grande / com e sem site (7) · Mappoa / precisa de site / dores (8: a análise) · site / mensagem /
dona Neide / site novo (9) · caçava cliente (10: Antes, a cozinha) · com um toque (10: a porta verde na parede) · você
/ achava / desistia / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,0 s
> "O cliente quer pedir orçamento. Se o site não tem como chamar, ele desiste."

- NA TELA: o calçadão; no meio, uma parede lisa gigante, mais alta que um sobrado, com o site da Vidraçaria Cristal
  pintado (o topo azul-marinho com o nome, a foto do box de vidro, os serviços e o endereço embaixo) e nenhuma porta; o
  cliente de camiseta laranja, minúsculo, com as duas mãos espalmadas na parede, o papel "ORÇAMENTO" na mão
- MOSTRA: ["muro", "cliente"]
- CENÁRIO: cidade de dia, os carros e o ônibus passando atrás da parede, o semáforo
- ENTRA AGORA: nada entra: no 1º quadro tudo já está lá; em "chamar", a etiqueta
- OBJETOS SE MEXENDO: o cliente vai tateando a parede de lado; em "desiste" o papel cai no chão
- PERSONAGEM: o cliente · começo: mãos na parede (empurrando), andando de lado · em "chamar": olha pra cima, dúvida ·
  em "desiste": larga os braços, triste
- INTERAÇÃO: o cliente tateia e bate na parede do site
- CÂMERA: 4 cortes · (1) 0–0,8 s: a parede gigante inteira e o cliente minúsculo, chegando · (2) 0,8–1,6 s: de
  baixo, rente à parede, olhando pra cima · (3) 1,6 s até "desiste": passando, médio, de lado · (4) de
  "desiste" ao fim: chegando, perto, na cara dele
- EFEITOS VISUAIS: etiqueta laranja "Sem botão de contato" (palavra "chamar") · balão "Cadê a porta?" (começo do
  corte 3) · ✗ vermelho (palavra "desiste")
- SONS: whoosh no 1º quadro · toc-toc (cliques) nas batidas · errado em "desiste"

#### 2 · plano `thiago` · ~4,2 s
> "O Thiago é web designer, tá sem cliente, e essa vidraçaria perde orçamento assim."

- NA TELA: (1) a cozinha de dia; o Thiago sentado no computador, no meio da cozinha, com o portfólio na tela · (2) em
  "vidraçaria": a vidraçaria, a placa "VIDRAÇARIA CRISTAL", o cavalete com as placas de vidro e a dona Neide no balcão
  do lado do telefone mudo
- MOSTRA: ["personagem", "monitor"]
- CENÁRIO: cozinha (a geladeira, a janela) → oficina virada vidraçaria (o portão de enrolar com luz entrando)
- ENTRA AGORA: etiqueta "Web designer" (palavra "designer"); "Sem cliente" (palavra "cliente"); "Perde orçamento"
  (palavra "perde")
- OBJETOS SE MEXENDO: o portfólio no monitor; o telefone da vidraçaria parado
- PERSONAGEM: o Thiago sentado · começo: digitando · em "cliente": coça a cabeça · a dona Neide: cansada, olhando o
  telefone
- INTERAÇÃO: o Thiago digita; a dona Neide espera o telefone tocar
- CÂMERA: (1) até "vidraçaria": passando, perto, direita, olho · (2) chegando, perto, frente, na dona Neide e no
  telefone (frase 1: perto, na cara do cliente)
- EFEITOS VISUAIS: as etiquetas azul, vermelha e vermelha
- SONS: clique, pingo em "cliente", whoosh na troca, errado em "perde"

#### 3 · plano `site` · ~3,8 s · jogo `falha`
> "O site da dona Neide tem foto, tem endereço, e nenhum botão de WhatsApp."

- NA TELA: o calçadão; a parede do site de frente; a dona Neide do lado esquerdo apresentando a parede, orgulhosa; o
  cliente na frente da parede; em "foto", ✓ na foto do box; em "endereço", ✓ no endereço; em "botão", aparece um
  quadrado tracejado vermelho vazio onde devia estar o botão
- MOSTRA: ["muro", "dona", "cliente"]
- CENÁRIO: cidade, os carros passando
- ENTRA AGORA: ✓ "Foto" (palavra "foto"); ✓ "Endereço" (palavra "endereço"); o tracejado e ✗ (palavra "botão")
- OBJETOS SE MEXENDO: o tracejado pisca
- PERSONAGEM: a dona Neide · começo: mostrando a parede, orgulhosa · em "nenhum": encolhe os ombros · o cliente: olha
  pra cima
- INTERAÇÃO: a dona Neide apresenta o site; o cliente procura
- CÂMERA: (1) até "endereço": chegando, médio, frente, na parede e na dona Neide · (2) passando, perto, direita, no
  tracejado vazio e no cliente (frase 2: perto na vidraçaria)
- EFEITOS VISUAIS: etiquetas verdes "Foto" e "Endereço" · vermelha "Botão de WhatsApp?" (palavra "botão") · ✓ ✓ ✗ ·
  congela em preto e branco (o jogo)
- SONS: certo em "foto" e "endereço" · errado em "botão"

#### 4 · plano `rodou` · ~3,4 s
> "O cliente rodou a página inteira e chamou a vidraçaria do lado."

- NA TELA: o calçadão; o cliente anda a parede inteira, da esquerda pra direita, tateando; do lado direito, a parede
  menor da Vidros Ipê, com a porta verde "Chamar no WhatsApp"; ele entra por ela
- MOSTRA: ["cliente", "vizinha"]
- CENÁRIO: cidade, o semáforo trocando
- ENTRA AGORA: a porta verde da vizinha acende (palavra "chamou")
- OBJETOS SE MEXENDO: o papel do orçamento na mão; a porta verde brilha
- PERSONAGEM: o cliente · começo: andando de lado, tateando · em "chamou": corre pra porta verde e comemora
- INTERAÇÃO: o cliente tateia a parede e aperta a porta verde da vizinha
- CÂMERA: (1) até "chamou": acompanhando de lado (passando, médio, frente) · (2) chegando, perto, na porta verde e no
  cliente (frase 3: perto, direita)
- EFEITOS VISUAIS: etiqueta vermelha "A página inteira..." (palavra "página") · verde "Foi pra outra" (palavra "lado")
- SONS: passos, whoosh em "chamou", pingo do WhatsApp

#### 5 · plano `procura` · ~3,2 s
> "E o Thiago procurava cliente um por um, na mesa da cozinha."

- NA TELA: a cozinha de noite; o Thiago sentado no computador, a busca no Google; bolas de papel amassado caindo e se
  acumulando na mesa e no chão
- MOSTRA: ["personagem", "papeis", "monitor"]
- CENÁRIO: cozinha de noite, a janela escura
- ENTRA AGORA: uma bola de papel a cada clique (a partir de "um")
- OBJETOS SE MEXENDO: cada papel cai do alto; a busca troca de resultado
- PERSONAGEM: sentado · começo: digitando · em "cozinha": cansado, mão na testa
- INTERAÇÃO: o Thiago digita e amassa papel
- CÂMERA: (1) até "por": girando, médio, esquerda · (2) afastando, médio, nos papéis (frase 4: na rua)
- EFEITOS VISUAIS: etiqueta vermelha "Um por um..." (palavra "um")
- SONS: um clique por papel

#### 6 · plano `investe` · ~4,2 s · jogo `corrige`
> "Então ele decidiu investir o preço de um sobá num sistema que acha quem precisa de site."

- NA TELA: a cozinha de dia; o Thiago de pé ao lado da mesa com a tigela de sobá na mão (o caldo, o macarrão, a
  omelete e os hashis); a tigela desliza pela mesa até o monitor e some num poof; o monitor carrega
- MOSTRA: ["personagem", "soba", "monitor"]
- CENÁRIO: cozinha de dia
- ENTRA AGORA: a tigela aparece na mão (palavra "investir") · a etiqueta verde "Investimento"
- OBJETOS SE MEXENDO: a tigela vai pro monitor girando e encolhendo e some num poof (palavra "sistema"); a barra enche
- PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
- INTERAÇÃO: o Thiago "investe" o sobá no computador
- CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda (frase 5: médio nos papéis)
- EFEITOS VISUAIS: "Investimento" verde · "Acha quem precisa de site" verde (palavra "precisa")
- SONS: ding em "sobá" · whoosh · brilho no poof · certo

#### 7 · plano `lista` · ~4,2 s
> "Digitou mappoa.com no computador, e veio a lista das vidraçarias de Campo Grande, com e sem site."

- NA TELA: a barra com mappoa.com acima do monitor; a lista das vidraçarias de Campo Grande sobe do computador, com as
  pílulas "com site" e "sem site"
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: cozinha de dia
- ENTRA AGORA: a barra cresce (palavra "Digitou"); a lista sobe do monitor (palavra "lista")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; as vidraçarias entrando uma por uma
- PERSONAGEM: começo: digitando · em "lista": levanta e aponta a Vidraçaria Cristal
- INTERAÇÃO: o Thiago digita e aponta a lista
- CÂMERA: (1) por cima do ombro olhando o endereço, perto, esquerda · (2) chegando, médio, frente (frase 6: passando)
- EFEITOS VISUAIS: etiqueta azul "Campo Grande, MS" (palavra "Campo")
- SONS: cliques, brilho, bips

#### 8 · plano `mappoa` · ~3,8 s
> "Esse é o *Mappoa*: acha quem precisa de site e mostra as dores de cada empresa."

- NA TELA: a central do Mappoa (o mapa com os pontos acesos na parede, as mesas e os robôs); o painel com a análise da
  Vidraçaria Cristal (aderência, "DORES PROVÁVEIS": "Site desatualizado", "Presença digital fraca"); o robô e o Thiago
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: central_mappoa, o mapa brilhando, os robôs das mesas mexendo a cabeça
- ENTRA AGORA: o painel cai do alto (palavra "Mappoa")
- OBJETOS SE MEXENDO: os blocos da análise aparecem um por um (palavra "dores"); a aderência enche
- PERSONAGEM: começo: chamando · no fim: comemorando
- INTERAÇÃO: o robô acena e o Thiago apresenta a análise
- CÂMERA: (1) chegando, médio, frente, baixo · (2) passando, médio, esquerda (frase 7: médio, frente)
- EFEITOS VISUAIS: rótulo "Mappoa" · "Acha quem precisa de site" verde · "Dores de cada empresa" verde (palavra "dores")
- SONS: brilho, bips, certo

#### 9 · plano `mensagem` · ~4,2 s
> "O Thiago confere o site, manda a mensagem pronta, e a dona Neide pede um site novo."

- NA TELA: (1) a cozinha: o Thiago sentado, o site da Vidraçaria Cristal no monitor rolando até o fim, sem botão ·
  (2) em "manda": a mensagem pronta do Mappoa e ele aperta "Enviar pelo WhatsApp" · (3) em "Neide": a vidraçaria, a
  dona Neide com o celular gigante mostrando a mensagem e a resposta dela
- MOSTRA: ["dona", "celular"]
- CENÁRIO: cozinha → vidraçaria
- ENTRA AGORA: a mensagem (palavra "manda"); a bolha da resposta (palavra "pede")
- OBJETOS SE MEXENDO: o site rola no monitor; o celular gigante vibra quando a mensagem chega
- PERSONAGEM: o Thiago procura o botão (dúvida), depois aponta o enviar · a dona Neide: lê, surpresa · em "pede":
  comemora
- INTERAÇÃO: o Thiago confere e manda; a dona Neide lê e responde
- CÂMERA: (1) até "manda": chegando, perto, por cima do ombro, no monitor · (2) até "Neide": perto, frente, na tela ·
  (3) passando, perto, direita, no celular e na dona Neide (frase 8: na central)
- EFEITOS VISUAIS: "?" no Thiago (palavra "confere") · balão de fala "Quero um site com botão de WhatsApp!" · ✓
- SONS: clique no enviar · pingo da mensagem · certo em "pede"

#### 10 · plano `antes_agora` · ~3,8 s · jogo `avanca`
> "Antes, o Thiago caçava cliente. Agora, o cliente da dona Neide chama com um toque."

- NA TELA: (1) Antes: o Thiago sentado de noite na cozinha, os papéis amassados em volta · (2) Agora: no calçadão, a
  parede do site agora com uma porta verde enorme "Chamar no WhatsApp"; o cliente toca a porta e ela acende; o Thiago e
  a dona Neide dos lados
- MOSTRA: ["personagem", "dona", "porta"]
- CENÁRIO: cozinha de noite → cidade de dia
- ENTRA AGORA: "Caçando cliente" vermelho (Antes); a porta verde cresce na parede (palavra "Agora"); "Com um toque"
  verde (palavra "toque")
- OBJETOS SE MEXENDO: a porta acende quando o cliente toca (palavra "toque")
- PERSONAGEM: Antes: mão na testa · Agora: o cliente toca a porta e comemora, o Thiago vitória, a dona Neide aplaudindo
- INTERAÇÃO: o cliente aperta a porta-botão
- CÂMERA: (1) afastando, médio, direita · (2) chegando, médio, frente (frase 9: perto, direita)
- EFEITOS VISUAIS: as duas etiquetas · o ⏩ do jogo
- SONS: errado no Antes, pingo e certo no Agora

#### 11 · plano `segue` · ~6,5 s
> "E você, achava o botão ou desistia? Comenta ACHAVA ou DESISTIA e segue. No computador, digita mappoa.com e testa você também."

- NA TELA: o Thiago de pé na cozinha; a pergunta no topo; depois o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: cozinha de dia
- ENTRA AGORA: a pergunta (no começo); o cartão de seguir (palavra "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; o botão Seguir apertado
- PERSONAGEM: começo: chamando · em "digita": digitando
- INTERAÇÃO: o Thiago digita mappoa.com; o robô acena
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- EFEITOS VISUAIS: a pergunta "Achava o botão ou desistia? Comenta ACHAVA ou DESISTIA" · o cartão de seguir
- SONS: cliques, ding em "testa", o clique do Seguir
