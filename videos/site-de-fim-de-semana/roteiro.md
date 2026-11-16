# O site feito no fim de semana: roteiro e ficha de cena

> Vídeo 1 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: padarias de Recife. O seu Zé, dono da padaria, fez o site sozinho num fim de semana: o telefone
> está errado e o cardápio é uma foto torta. O cliente liga, o número não existe, e ele compra na concorrente. O Caio,
> web designer sem cliente, decide investir o preço de um café num sistema que acha site assim todo dia.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (o site gigante do seu Zé preso com fita crepe, as partes
> despencando em cima dele), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (o telefone errado,
> a foto torta), o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa entrando tarde como decisão de investir
> (sem valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como **sistema**, ~52 s e o pedido de
> comentário de UMA palavra no fim (ATRÁS ou ESPERAVA), sem prometer mandar nada.

## Roteiro

1. O dono fez o site sozinho no fim de semana. Se ficou assim, ele precisa de você. *(gancho)*
2. O Caio é web designer, tá sem cliente, e nem sabe que essa padaria existe.
3. No site do seu Zé, o telefone tá errado e o cardápio é uma foto torta.
4. O cliente ligou, o número não existe, e ele foi comprar na concorrente.
5. E o Caio procura cliente um por um no Google, até de madrugada.
6. Então ele decidiu investir o preço de um café num sistema que acha site assim todo dia.
7. Digitou mappoa.com no computador, e veio a lista das padarias de Recife com site fraco.
8. Esse é o *Mappoa*, que mostra quem tem mais chance de comprar o seu site.
9. O Caio mostra pro seu Zé o que o cliente vê. E ele topa refazer.
10. Antes, o Caio caçava cliente. Agora, ele acha quem já precisa dele.
11. E você, ia atrás do seu Zé ou esperava? Comenta ATRÁS ou ESPERAVA e segue. No computador, digita mappoa.com e testa você também.

Cerca de 165 palavras, uns 52 s com o cartão de seguir (~880 caracteres da ElevenLabs).

**Gancho:** a frase da pauta. 1º quadro: um telão do tamanho de um outdoor no meio do calçadão, na frente da padaria,
com o site do seu Zé colado com fita crepe; o título "PADARIA DO ZÉ" já está despencando, e as outras partes (a foto
do pão, o botão do telefone, o "cardápio em breve") caem uma por uma em cima do seu Zé, que se protege e cai sentado.

**Capa:** "Site de *domingo*?" (17 letras), com o seu Zé desesperado embaixo do telão e as partes caindo.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o preço de um café" é o espírito do investimento, sem valor
- O Mappoa não dá nota pro design: a narração diz "mostra quem tem mais chance de comprar o seu site" (o score de
  aderência) e a lista mostra o que a análise escreveu em cada site (dores e oportunidades, como em `canal/produto.md`).
  "Site fraco" é o resumo da análise ("presença digital fraca", "site com cara de modelo pronto"), não uma etiqueta do
  produto
- O telefone errado aparece pelo próprio site (o número que não chama), não por um recurso do Mappoa
- Nada de "garante a venda": o seu Zé só "topa refazer"
- Telas desenhadas genéricas, sem logo de nenhuma empresa real

## Cenários

`rua_predios` (o calçadão com a loja PADARIA, de dia: gente andando) → `home_office` (o quarto do Caio, de dia e de
noite) → `cafeteria` (a padaria do seu Zé por dentro: balcão, vitrine de doces, quadro do cardápio, luz quente) →
`mundo_mappoa` (o palco da marca). O seu Zé é o `K.personagem('pizzaiolo')` com avental marrom: chapéu de cozinheiro
e bigode, cara de padeiro.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `telao` | telão gigante (3,6 × 2,5) num pé duplo, com o fundo do site e os buracos das partes | calçadão, na frente da padaria | 1, capa |
| `titulo`, `foto`, `fone`, `breve` | as 4 partes do site, cada uma com 2 fitas crepe nos cantos | coladas no telão, depois caídas no chão | 1, capa |
| `dono` | o seu Zé (pizzaiolo de avental marrom) | calçadão; ponta do balcão da padaria | 1, 3, 9, 10 |
| `padaria` | a loja PADARIA do calçadão | rua_predios | 1, 4 |
| `personagem` | o Caio (personagem do canal) | quarto, padaria | 2, 5, 6, 7, 8, 9, 10, 11 |
| `monitor` | computador do Caio com mesa | quarto | 2, 5, 6, 7, 10, 11 |
| `site` | o site do seu Zé inteiro (painel), com o telefone e a foto torta | padaria, perto do balcão | 3 |
| `cliente` | moço de moletom verde (K.boneco) com o celular | calçadão | 4 |
| `celular` | celular gigante com a ligação "número não existe" | calçadão, na frente do cliente | 4 |
| `planilha` | planilha gigante enchendo devagar | quarto de noite | 5 |
| `despertador` | despertador com os ponteiros correndo até as 3h | mesa do quarto | 5 |
| `caneca` | a caneca de café na mão do Caio (o investimento) | quarto | 6 |
| `navegador` | a barra com mappoa.com | acima do monitor | 7, 11 |
| `tela` | painel do Mappoa: lista das padarias e análise | quarto, palco, mão do Caio | 7, 8, 9, 10 |
| `robo` | robô do Mappoa | palco, quarto | 8, 11 |

## Teste dos substantivos

dono / site / fim de semana (1: o telão com as partes coladas com fita e a etiqueta "Feito no fim de semana") · você (1,
✗ e o seu Zé) · Caio / web designer / cliente (2, etiquetas) · padaria (1, 4: a loja PADARIA; 2: o balão) · telefone /
cardápio / foto torta (3: o site com o número e a foto torta, etiquetas) · cliente / número (4: o celular gigante
"número não existe") · concorrente (4: etiqueta, ele vai embora andando) · Google / um por um / madrugada (5: a busca no
monitor, a planilha e o despertador nas 3h) · café / sistema (6: a caneca entra no computador) · mappoa.com / computador /
lista / padarias / Recife (7) · Mappoa / site (8) · o que o cliente vê (9: a análise na mão do Caio) · cliente (10) ·
você / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,3 s
> "O dono fez o site sozinho no fim de semana. Se ficou assim, ele precisa de você."

- NA TELA: no meio do calçadão, o telão gigante com o site do seu Zé colado com fita crepe; o seu Zé embaixo, à direita
  do pé do telão; as partes despencando; a loja PADARIA ao fundo, à direita
- MOSTRA: ["telao", "dono"]
- CENÁRIO: a rua entre prédios de dia, gente andando e carros nas esquinas (o cenário cuida)
- ENTRA AGORA: nada entra: no 1º quadro o título "PADARIA DO ZÉ" já está soltando e cai; depois a foto (em "sozinho"),
  o botão do telefone (em "semana") e o "cardápio em breve" (em "assim")
- OBJETOS SE MEXENDO: cada parte tremendo na fita, depois caindo em queda livre, girando e ficando deitada no chão em
  volta do seu Zé, com poeira na batida; o telão balança a cada parte que sai
- PERSONAGEM: o seu Zé de frente pra câmera, olhando pra cima · começo: susto · em "semana": mão na testa · em "assim":
  cai sentado
- INTERAÇÃO: as partes do site caem em cima do seu Zé, que se protege
- CÂMERA: 4 cortes · (1) 0–0,8 s: o título caindo, de baixo, perto · (2) 0,8–1,6 s: o seu Zé de perto, de lado, a foto
  caindo nele · (3) 1,6–2,4 s: o telão inteiro, afastando, de frente · (4) do resto: passando, médio, direita, com o ✗
- EFEITOS VISUAIS: poeira em cada batida · etiqueta laranja "Feito no fim de semana" (palavra "semana") · ✗ vermelho
  enorme no telão (palavra "assim")
- SONS: estalo da fita a cada parte que solta · baque em cada batida · errado no ✗

#### 2 · plano `caio` · ~3,8 s · o Caio
> "O Caio é web designer, tá sem cliente, e nem sabe que essa padaria existe."

- NA TELA: o quarto do Caio de dia; ele sentado no computador com o site de exemplo dele
- MOSTRA: ["personagem", "monitor"]
- CENÁRIO: home_office de dia, a janela clara
- ENTRA AGORA: etiqueta "Web designer" (palavra "designer"); "Sem cliente" (palavra "cliente"); o balão de pensamento
  "Cadê cliente?" (palavra "sabe")
- OBJETOS SE MEXENDO: o site de exemplo rolando no monitor
- PERSONAGEM: sentado · começo: digitando · em "cliente": coça a cabeça · em "sabe": encolhe os ombros
- INTERAÇÃO: o Caio digita no computador
- CÂMERA: (1) até "sabe": passando, perto, direita, olho · (2) chegando, perto, frente, baixo (gancho: médio, frente)
- EFEITOS VISUAIS: as etiquetas azul e vermelha, o balão
- SONS: cliques, pingo em "cliente", whoosh do balão

#### 3 · plano `site` · ~3,9 s · jogo `falha`
> "No site do seu Zé, o telefone tá errado e o cardápio é uma foto torta."

- NA TELA: a padaria por dentro; o site do seu Zé num painel grande perto do balcão; o seu Zé na ponta do balcão,
  orgulhoso
- MOSTRA: ["site", "dono"]
- CENÁRIO: a cafeteria (a padaria), luz quente, o balcão e a vitrine de doces atrás
- ENTRA AGORA: o painel cresce (palavra "site")
- OBJETOS SE MEXENDO: o número do telefone fica vermelho e pisca (palavra "telefone"); a foto do cardápio entorta de vez
  (palavra "torta")
- PERSONAGEM: o seu Zé · começo: mostrando o site, orgulhoso · em "torta": encolhe os ombros
- INTERAÇÃO: o seu Zé apresenta o site com a mão
- CÂMERA: (1) até "telefone": chegando, médio, frente, olho · (2) girando, perto, esquerda, olho (frase 2: perto,
  frente, baixo)
- EFEITOS VISUAIS: etiqueta vermelha "Telefone errado" (palavra "errado") · "Foto torta" (palavra "torta") · ✗ · no fim
  congela em preto e branco (o jogo)
- SONS: ding da vitrine no começo · errado em "errado" · range em "torta"

#### 4 · plano `cliente` · ~3,5 s
> "O cliente ligou, o número não existe, e ele foi comprar na concorrente."

- NA TELA: o calçadão na frente da PADARIA; o cliente de moletom com o celular gigante do lado: "Ligando..." e depois
  "Número não existe"
- MOSTRA: ["cliente", "celular"]
- CENÁRIO: a rua de dia, gente andando
- ENTRA AGORA: o celular gigante sobe do chão (palavra "ligou")
- OBJETOS SE MEXENDO: a tela troca pra "Número não existe" (palavra "existe"); o celular vibra
- PERSONAGEM: o cliente · começo: no celular · em "existe": faz que não · em "concorrente": vai embora andando
- INTERAÇÃO: o cliente liga pelo celular gigante
- CÂMERA: (1) até "existe": chegando, perto, direita, olho · (2) seguindo o cliente de trás, andando (frase 3: girando,
  perto, esquerda)
- EFEITOS VISUAIS: ✗ no celular (palavra "existe") · etiqueta vermelha "Foi pra concorrente" (palavra "concorrente")
- SONS: bip-bip da ligação · errado em "existe" · passos

#### 5 · plano `procura` · ~3,6 s
> "E o Caio procura cliente um por um no Google, até de madrugada."

- NA TELA: o quarto de noite; o Caio digitando; no monitor, a busca genérica; a planilha gigante enchendo devagar; o
  despertador correndo até as 3h
- MOSTRA: ["personagem", "planilha", "despertador"]
- CENÁRIO: home_office de noite, a janela escura
- ENTRA AGORA: nada (o quarto já é dele); a etiqueta "Um por um..." (palavra "um")
- OBJETOS SE MEXENDO: a planilha preenche bem devagar; os ponteiros giram rápido; o despertador toca em "madrugada"
- PERSONAGEM: sentado · começo: digitando · em "madrugada": cochila (Zzz)
- INTERAÇÃO: o Caio digita; o despertador acorda ele
- CÂMERA: (1) até "um": girando, médio, esquerda · (2) chegando, médio, na planilha e no despertador (frase 4: seguindo
  de trás na rua)
- EFEITOS VISUAIS: "Um por um..." vermelho · os Zzz
- SONS: cliques, o toque do despertador

#### 6 · plano `investe` · ~4,6 s · jogo `corrige`
> "Então ele decidiu investir o preço de um café num sistema que acha site assim todo dia."

- NA TELA: o quarto de dia; o Caio de pé ao lado da mesa com a caneca de café; a caneca voa pro monitor
- MOSTRA: ["personagem", "caneca", "monitor"]
- CENÁRIO: home_office de dia
- ENTRA AGORA: a caneca aparece na mão (palavra "café") · a etiqueta verde "Investimento" (palavra "investir")
- OBJETOS SE MEXENDO: a caneca voa em arco, encolhendo, até o monitor e some num poof (palavra "sistema"); o monitor
  carrega (barra enchendo)
- PERSONAGEM: de pé · começo: faz que sim (decidiu) · em "sistema": aponta o monitor · em "todo": comemora
- INTERAÇÃO: o Caio "investe" a caneca no computador
- CÂMERA: (1) até "sistema": chegando, perto, direita, olho · (2) passando, perto, esquerda, olho (frase 5: médio na
  planilha)
- EFEITOS VISUAIS: "Investimento" verde · "Acha site assim todo dia" verde (palavra "todo")
- SONS: ding em "café" · whoosh da caneca · brilho no poof

#### 7 · plano `lista` · ~3,9 s
> "Digitou mappoa.com no computador, e veio a lista das padarias de Recife com site fraco."

- NA TELA: a barra com mappoa.com acima do monitor; a lista das padarias de Recife sobe do computador, cada uma com o
  ponto fraco do site
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: home_office de dia
- ENTRA AGORA: a barra cresce (palavra "Digitou"); a lista sobe do monitor (palavra "lista")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; as padarias entrando uma por uma (palavra "padarias")
- PERSONAGEM: começo: digitando · em "lista": levanta e aponta a Padaria do Zé
- INTERAÇÃO: o Caio digita e aponta a lista
- CÂMERA: (1) por cima do ombro olhando o endereço, perto, esquerda · (2) chegando, médio, frente (frase 6: passando,
  esquerda)
- EFEITOS VISUAIS: etiqueta azul "Recife" (palavra "Recife")
- SONS: cliques, brilho, bips

#### 8 · plano `mappoa` · ~3,6 s
> "Esse é o *Mappoa*, que mostra quem tem mais chance de comprar o seu site."

- NA TELA: o palco da marca; a análise da Padaria do Zé (score, dores e oportunidades); o robô e o Caio
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: mundo_mappoa, cartões e pinos flutuando
- ENTRA AGORA: a análise cai do alto (palavra "Mappoa")
- OBJETOS SE MEXENDO: o score enche até 91 (palavra "chance"); as dores e oportunidades aparecem (palavra "site")
- PERSONAGEM: começo: chamando · em "site": comemorando
- INTERAÇÃO: o robô acena e o Caio apresenta a análise
- CÂMERA: (1) chegando, médio, frente, baixo · (2) passando, médio, esquerda (frase 7: médio, frente)
- EFEITOS VISUAIS: rótulo "Mappoa" · "Mais chance de comprar" verde
- SONS: brilho, ding, certo

#### 9 · plano `mostra` · ~3,4 s
> "O Caio mostra pro seu Zé o que o cliente vê. E ele topa refazer."

- NA TELA: a padaria por dentro; o Caio com a análise na mão; o seu Zé na ponta do balcão
- MOSTRA: ["personagem", "dono", "tela"]
- CENÁRIO: a cafeteria, luz quente
- ENTRA AGORA: a análise na mão do Caio (palavra "mostra"); o balão "Bora refazer!" (palavra "topa")
- OBJETOS SE MEXENDO: o painel na mão balança com o gesto
- PERSONAGEM: o Caio mostrando · o seu Zé surpreso (palavra "vê") · em "topa": o seu Zé comemora
- INTERAÇÃO: o Caio mostra a tela pro seu Zé
- CÂMERA: (1) até "vê": chegando, médio, frente · (2) passando, perto, direita (frase 8: no palco)
- EFEITOS VISUAIS: "O que o cliente vê" laranja · balão de fala · ✓
- SONS: certo em "topa"

#### 10 · plano `antes_agora` · ~3,6 s · jogo `avanca`
> "Antes, o Caio caçava cliente. Agora, ele acha quem já precisa dele."

- NA TELA: (1) Antes: o Caio sentado de noite com o celular "0" · (2) Agora: na padaria com o seu Zé, os dois
  comemorando, o site novo no painel
- MOSTRA: ["personagem", "dono"]
- CENÁRIO: o quarto de noite → a padaria
- ENTRA AGORA: "Caçando cliente" vermelho (Antes); "Achou quem precisa" verde (palavra "precisa")
- OBJETOS SE MEXENDO: o celular "0"; o painel do site novo brilhando
- PERSONAGEM: Antes: mão na testa · Agora: vitória, o seu Zé aplaudindo
- INTERAÇÃO: o Caio e o seu Zé comemoram juntos
- CÂMERA: (1) afastando, médio, direita · (2) passando, médio, esquerda (frase 9: perto, direita)
- EFEITOS VISUAIS: as duas etiquetas · o ⏩ do jogo
- SONS: errado no Antes, certo no Agora

#### 11 · plano `segue` · ~6,5 s
> "E você, ia atrás do seu Zé ou esperava? Comenta ATRÁS ou ESPERAVA e segue. No computador, digita mappoa.com e testa
> você também."

- NA TELA: o Caio de pé no quarto; a pergunta no topo; depois o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: home_office de dia
- ENTRA AGORA: a pergunta (no começo); o cartão de seguir (palavra "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; o botão Seguir apertado
- PERSONAGEM: começo: chamando (aponta pra quem assiste) · em "digita": digitando
- INTERAÇÃO: o Caio digita mappoa.com; o robô acena
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- EFEITOS VISUAIS: a pergunta "Ia atrás ou esperava? Comenta ATRÁS ou ESPERAVA" · o cartão de seguir
- SONS: cliques, ding em "testa", o clique do Seguir
