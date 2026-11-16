# O site minúsculo no celular: roteiro e ficha de cena

> Vídeo 4 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: imobiliárias de Vitória. O site da Vitória Mar Imóveis, do seu Paulo, é lindo no computador, mas
> no celular vira um monte de letrinha (o site inteiro de computador espremido na tela pequena). O cliente, na praia,
> precisa de uma lupa gigante pra ler, aperta o botão errado e vai pra outra imobiliária. O Breno, web designer sem
> cliente, procura cliente um por um e decide investir o preço de uma moqueca num sistema que acha quem precisa de site.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (o cliente na areia com uma lupa do tamanho do tronco dele na
> frente de um celular mais alto que ele), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (o
> site de computador espremido no celular), o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa entrando
> tarde como decisão de investir (sem valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como
> **sistema**, ~54 s e o pedido de comentário de UMA palavra no fim (ZOOM ou FECHAVA), sem prometer mandar nada.
> Outro cenário e outra composição que os vídeos 1 a 3: a praia (orla de Vitória), a sala do Breno (de dia e de
> noite), o escritório da imobiliária e o palco da marca.

## Roteiro

1. O cliente abriu o site no celular. Se tá tudo minúsculo, ele fecha. *(gancho, a frase da pauta)*
2. O Breno é web designer, tá sem cliente, e essa imobiliária perde cliente assim.
3. No computador, o site do seu Paulo é lindo. No celular, vira letrinha.
4. O cliente errou o botão do apartamento e foi pra outra imobiliária.
5. E o Breno procurava cliente um por um, até tarde da noite.
6. Então ele decidiu investir o preço de uma moqueca num sistema que acha quem precisa de site.
7. Digitou mappoa.com no computador, e veio a lista das imobiliárias de Vitória, com e sem site.
8. Esse é o *Mappoa*: separa quem não tem site e mostra as dores de quem tem.
9. O Breno confere no celular, manda a mensagem pronta, e o seu Paulo pede um site novo.
10. Antes, o Breno caçava cliente. Agora, o site do seu Paulo cabe na palma da mão.
11. E você, dava zoom ou fechava? Comenta ZOOM ou FECHAVA e segue. No computador, digita mappoa.com e testa você também.

Cerca de 163 palavras, uns 54 s com o cartão de seguir (~950 caracteres da ElevenLabs; sobram ~7.300).

**Gancho:** a frase da pauta. Outras opções pensadas: "Esse cliente precisou de uma lupa pra ler o site da imobiliária." e "No celular, o site dessa imobiliária precisa de lupa." Fiquei com a da pauta (situação + "se você fizer X, acontece Y") e a
imagem absurda da pauta: o cliente com uma lupa gigante na frente do celular, aqui na areia da praia.
1º quadro: de perto, a lente da lupa com as letras do site enormes atrás do vidro; a câmera se afasta e aparece o
celular mais alto que o cliente, com o site inteiro de computador espremido em letrinhas, e o cliente segurando a lupa.

**Capa:** "Dá pra *ler isso*?" (16 letras), com o cliente de olho apertado atrás da lupa gigante, na frente do celular.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o preço de uma moqueca" (prato de Vitória) é o espírito do investimento
- O Mappoa **não** testa se o site funciona no celular nem dá nota pro design (`canal/produto.md`). A virada é ele achar
  as imobiliárias de Vitória, separar com site e sem site, e a análise da IA escrever as dores ("Site desatualizado",
  "Presença digital fraca", que o produto.md permite). Quem descobre que o site fica minúsculo é o **Breno**, abrindo
  o site no próprio celular ("o Breno confere no celular"). Nenhuma tela diz "site não funciona no celular detectado"
- O Mappoa gera a mensagem; quem manda é o Breno. Nada de "garante a venda": o seu Paulo só "pede um site novo"
- Telas desenhadas genéricas; imobiliárias, sites e endereços inventados (a Praia do Canto é só o bairro do anúncio)

## Cenários

`praia` (a orla de Vitória: o cliente, o celular gigante e a lupa; frases 1, 4, 10 e a capa) → `sala` (a sala do
Breno, com o computador na frente do tapete; de dia e de noite) → `escritorio` (a imobiliária do seu Paulo, com a tela
grande do site na parede da janela e a placa "VITÓRIA MAR IMÓVEIS") → `mundo_mappoa` (o palco da marca). O seu Paulo é
o `K.personagem('dono')` de terno azul-marinho; o cliente é um `K.boneco` de camiseta amarela e bermuda vermelha.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `celular` | celular gigante (2 × o normal, 3,2 m de altura): o site espremido; a página errada; o site novo; o WhatsApp | praia, escritório | 1, 3, 4, 9, 10, capa |
| `celular2` | outro celular gigante com o site da Ilha Imóveis, que cabe no celular | praia | 4 |
| `lupa` | lupa gigante: aro azul de 1,1 m, a lente com as letras aumentadas e o cabo até a mão do cliente | praia | 1, 10, capa |
| `cliente` | moço de camiseta amarela e bermuda vermelha (K.boneco) | praia | 1, 4, 10, capa |
| `personagem` | o Breno (personagem do canal) | sala, palco, praia | 2, 5, 6, 7, 8, 9, 10, 11 |
| `monitor` | computador do Breno com mesa e cadeira giratória | sala | 2, 5, 6, 7, 9, 11 |
| `dono` | o seu Paulo (K.personagem dono, terno azul-marinho) | escritório, praia | 2, 3, 9, 10 |
| `site` | tela grande do site da Vitória Mar Imóveis (3,0 × 1,9) na parede da janela | escritório | 2, 3, 9 |
| `celular_peq` | celular pequeno na mão do Breno, com o site espremido | sala | 9 |
| `canecas` | canecas de café se acumulando na mesa e no chão | sala de noite | 5, 10 |
| `moqueca` | panela de barro com a moqueca (o investimento) | sala | 6 |
| `navegador` | a barra com mappoa.com | acima do monitor | 7, 11 |
| `tela` | painel do Mappoa: a lista das imobiliárias, a análise, a mensagem pronta | sala, palco | 7, 8, 9 |
| `robo` | robô do Mappoa | palco, sala | 8, 11 |

## Teste dos substantivos

cliente / site / celular (1: o cliente, o celular gigante com o site) · minúsculo (1: as letrinhas e a lupa, etiqueta
"Tudo minúsculo") · fecha (1: a tela apaga com ✗) · Breno / web designer / cliente (2: etiquetas) · imobiliária (2: o
escritório com a placa, "Perde cliente") · computador / site / seu Paulo / lindo (3: a tela grande, "No computador ✓")
· celular / letrinha (3: o celular sobe com o site espremido, "No celular ✗") · botão / apartamento / outra imobiliária
(4: o dedo no botão errado, a página errada, o celular da Ilha Imóveis) · um por um / noite (5: a sala de noite, as
canecas, o Zzz) · moqueca / sistema / site (6: a panela de barro entra no computador) · mappoa.com / computador / lista
/ imobiliárias / Vitória / com e sem site (7) · Mappoa / sem site / dores (8: a análise com "Site desatualizado") ·
celular / mensagem / seu Paulo / site novo (9) · palma da mão (10: o site novo no celular do cliente, a lupa jogada na
areia) · você / zoom / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,0 s
> "O cliente abriu o site no celular. Se tá tudo minúsculo, ele fecha."

- NA TELA: a areia da praia, o mar e os coqueiros atrás; no meio, um celular gigante em pé, mais alto que o cliente,
  com o site inteiro de computador espremido em letrinhas; na frente da tela, a lente de uma lupa gigante, com as
  letras aumentadas atrás do vidro; à direita, o cliente de camiseta amarela segurando o cabo da lupa
- MOSTRA: ["celular", "lupa", "cliente"]
- CENÁRIO: praia, as ondas chegando e as gaivotas
- ENTRA AGORA: nada entra: no 1º quadro tudo já está lá; em "minúsculo", a etiqueta
- OBJETOS SE MEXENDO: a lupa treme um pouco (a mão dele); em "fecha" a tela do celular apaga com um ✗
- PERSONAGEM: o cliente · começo: segurando a lupa, de olho apertado · em "minúsculo": dúvida, nojo · em "fecha": faz
  que não
- INTERAÇÃO: o cliente aponta a lupa pro celular
- CÂMERA: 4 cortes · (1) 0–0,8 s: a lente de perto, afastando · (2) 0,8–1,6 s: de baixo, na areia, o celular gigante
  e o cliente · (3) 1,6 s até "fecha": girando em volta do cliente e da lupa, médio · (4) de "fecha" ao fim: perto,
  chegando, na cara dele com o ✗
- EFEITOS VISUAIS: etiqueta laranja "Tudo minúsculo" (palavra "minúsculo") · ✗ vermelho (palavra "fecha")
- SONS: whoosh no 1º quadro · ding em "minúsculo" · errado em "fecha"

#### 2 · plano `breno` · ~4,0 s
> "O Breno é web designer, tá sem cliente, e essa imobiliária perde cliente assim."

- NA TELA: (1) a sala de dia; o Breno sentado no computador com o portfólio · (2) em "imobiliária": o escritório da
  Vitória Mar Imóveis, a placa, a tela grande do site e o seu Paulo esperando, olhando o relógio
- MOSTRA: ["personagem", "monitor"]
- CENÁRIO: sala (sofá, estante, TV mudando de cor) → escritorio (janelão com a cidade)
- ENTRA AGORA: etiqueta "Web designer" (palavra "designer"); "Sem cliente" (palavra "cliente"); "Perde cliente"
  (palavra "perde")
- OBJETOS SE MEXENDO: o portfólio no monitor; no escritório, a tela do site
- PERSONAGEM: o Breno sentado · começo: digitando · em "cliente": coça a cabeça · o seu Paulo: olha o relógio
- INTERAÇÃO: o Breno digita; o seu Paulo espera do lado da tela
- CÂMERA: (1) até "imobiliária": passando, perto, direita, olho · (2) chegando, perto, frente, no seu Paulo e na tela
- EFEITOS VISUAIS: as etiquetas azul, vermelha e vermelha
- SONS: clique, pingo em "cliente", whoosh na troca, errado em "perde"

#### 3 · plano `site` · ~3,6 s · jogo `falha`
> "No computador, o site do seu Paulo é lindo. No celular, vira letrinha."

- NA TELA: o escritório; (1) a tela grande com o site bonito (a foto do prédio na orla, a busca e os apartamentos) e o
  seu Paulo orgulhoso · (2) em "celular": o celular gigante sobe do chão do lado dele, com o mesmo site espremido em
  letrinhas
- MOSTRA: ["site", "celular", "dono"]
- CENÁRIO: escritorio, o janelão com a cidade
- ENTRA AGORA: ✓ verde e "No computador" (palavra "lindo"); o celular sobe (palavra "celular")
- OBJETOS SE MEXENDO: o celular vibra em "letrinha"
- PERSONAGEM: o seu Paulo · começo: mostrando a tela, orgulhoso · em "letrinha": encolhe os ombros
- INTERAÇÃO: o seu Paulo apresenta o site com a mão
- CÂMERA: (1) até "celular": chegando, perto, frente, na tela · (2) passando, médio, no celular e no seu Paulo (frase
  2: perto, frente)
- EFEITOS VISUAIS: etiqueta verde "No computador" (palavra "lindo") · vermelha "No celular" (palavra "celular") · ✗
  (palavra "letrinha") · congela em preto e branco (o jogo)
- SONS: certo em "lindo" · whoosh em "celular" · errado em "letrinha"

#### 4 · plano `botao` · ~3,6 s
> "O cliente errou o botão do apartamento e foi pra outra imobiliária."

- NA TELA: a praia; o cliente na frente do celular gigante aperta a tela com o dedo; a tela troca pra uma página errada
  ("Política de privacidade"); do lado, aparece o celular da Ilha Imóveis, com o site que cabe no celular, e ele vai
  pra lá
- MOSTRA: ["cliente", "celular"]
- CENÁRIO: praia, o guarda-sol e o castelo de areia
- ENTRA AGORA: o celular da Ilha Imóveis sobe da areia (palavra "outra")
- OBJETOS SE MEXENDO: a tela troca em "errou"; o celular treme
- PERSONAGEM: o cliente · começo: apontando a tela · em "errou": mão na testa · em "outra": vai andando pro outro celular
- INTERAÇÃO: o cliente aperta a tela e troca de celular
- CÂMERA: (1) até "apartamento": chegando, perto, no dedo e na tela · (2) passando, médio, no cliente indo pro outro
  celular (frase 3: médio no escritório)
- EFEITOS VISUAIS: etiqueta vermelha "Botão errado!" (palavra "errou") · "Foi pra outra" vermelha (palavra "imobiliária")
- SONS: clique no dedo, errado em "errou", passos, whoosh em "outra"

#### 5 · plano `procura` · ~3,4 s
> "E o Breno procurava cliente um por um, até tarde da noite."

- NA TELA: a sala de noite; o Breno sentado no computador, a busca no Google; as canecas de café se acumulando na mesa
  e no chão
- MOSTRA: ["personagem", "canecas", "monitor"]
- CENÁRIO: sala de noite, o abajur aceso
- ENTRA AGORA: uma caneca a cada clique (a partir de "um")
- OBJETOS SE MEXENDO: cada caneca cai do alto na mesa ou no chão; a busca troca de resultado
- PERSONAGEM: sentado · começo: digitando · em "noite": cochila (Zzz)
- INTERAÇÃO: o Breno digita e as canecas se empilham
- CÂMERA: (1) até "por": girando, médio, esquerda · (2) passando, médio, nas canecas (frase 4: passando na praia)
- EFEITOS VISUAIS: etiqueta vermelha "Um por um..." (palavra "um")
- SONS: um clique por caneca

#### 6 · plano `investe` · ~4,2 s · jogo `corrige`
> "Então ele decidiu investir o preço de uma moqueca num sistema que acha quem precisa de site."

- NA TELA: a sala de dia; o Breno de pé ao lado da mesa com a panela de barro da moqueca na mão; a panela voa pro monitor
- MOSTRA: ["personagem", "moqueca", "monitor"]
- CENÁRIO: sala de dia
- ENTRA AGORA: a panela aparece na mão (palavra "investir") · a etiqueta verde "Investimento" (palavra "investir")
- OBJETOS SE MEXENDO: a panela voa em arco, girando e encolhendo, até o monitor e some num poof (palavra "sistema"); o
  monitor carrega (barra enchendo)
- PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
- INTERAÇÃO: o Breno "investe" a moqueca no computador
- CÂMERA: (1) até "sistema": chegando, perto, direita, olho · (2) passando, perto, esquerda (frase 5: médio nas canecas)
- EFEITOS VISUAIS: "Investimento" verde · "Acha quem precisa de site" verde (palavra "precisa")
- SONS: ding em "moqueca" · whoosh · brilho no poof · certo

#### 7 · plano `lista` · ~4,0 s
> "Digitou mappoa.com no computador, e veio a lista das imobiliárias de Vitória, com e sem site."

- NA TELA: a barra com mappoa.com acima do monitor; a lista das imobiliárias de Vitória sobe do computador, com as
  pílulas "com site" e "sem site"
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: sala de dia
- ENTRA AGORA: a barra cresce (palavra "Digitou"); a lista sobe do monitor (palavra "lista")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; as imobiliárias entrando uma por uma (palavra "imobiliárias")
- PERSONAGEM: começo: digitando · em "lista": levanta e aponta a Vitória Mar
- INTERAÇÃO: o Breno digita e aponta a lista
- CÂMERA: (1) por cima do ombro olhando o endereço, perto, esquerda · (2) chegando, médio, frente (frase 6: passando)
- EFEITOS VISUAIS: etiqueta azul "Vitória, ES" (palavra "Vitória")
- SONS: cliques, brilho, bips

#### 8 · plano `mappoa` · ~3,6 s
> "Esse é o *Mappoa*: separa quem não tem site e mostra as dores de quem tem."

- NA TELA: o palco da marca; a análise da Vitória Mar Imóveis (aderência, "DORES PROVÁVEIS": "Site desatualizado",
  "Presença digital fraca"; oportunidades); o robô e o Breno
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: mundo_mappoa, cartões e pinos flutuando
- ENTRA AGORA: o painel cai do alto (palavra "Mappoa")
- OBJETOS SE MEXENDO: os blocos da análise aparecem um por um (palavra "dores"); a barra da aderência enche
- PERSONAGEM: começo: chamando · em "tem" (o último): comemorando
- INTERAÇÃO: o robô acena e o Breno apresenta a análise
- CÂMERA: (1) chegando, médio, frente, baixo · (2) passando, médio, esquerda (frase 7: médio, frente, olho)
- EFEITOS VISUAIS: rótulo "Mappoa" · "Sem site e com site" verde (palavra "separa") · "Dores de cada uma" verde
  (palavra "dores")
- SONS: brilho, bips, certo

#### 9 · plano `mensagem` · ~4,0 s
> "O Breno confere no celular, manda a mensagem pronta, e o seu Paulo pede um site novo."

- NA TELA: (1) a sala: o Breno de pé com o celular pequeno perto do rosto, de olho apertado (o site espremido) · (2) em
  "manda": a mensagem pronta do Mappoa e ele aperta "Enviar pelo WhatsApp" · (3) em "Paulo": o escritório, o seu
  Paulo com o celular gigante mostrando a mensagem e a resposta dele
- MOSTRA: ["dono", "celular"]
- CENÁRIO: sala → escritorio
- ENTRA AGORA: a mensagem (palavra "manda"); a bolha da resposta (palavra "pede")
- OBJETOS SE MEXENDO: o celular gigante vibra quando a mensagem chega
- PERSONAGEM: o Breno aperta os olhos no celular, depois aponta o botão · o seu Paulo: lê, surpreso · em "pede": comemora
- INTERAÇÃO: o Breno confere e manda; o seu Paulo lê e responde
- CÂMERA: (1) até "manda": chegando, perto, no Breno e no celular pequeno · (2) até "Paulo": perto, frente, na tela ·
  (3) passando, perto, direita, no celular e no seu Paulo (frase 8: no palco)
- EFEITOS VISUAIS: "?" no Breno (palavra "confere") · balão de fala "Quero um site que abra no celular!" · ✓
- SONS: clique no enviar · pingo da mensagem · certo em "pede"

#### 10 · plano `antes_agora` · ~3,8 s · jogo `avanca`
> "Antes, o Breno caçava cliente. Agora, o site do seu Paulo cabe na palma da mão."

- NA TELA: (1) Antes: o Breno sentado de noite na sala, as canecas em volta · (2) Agora: na praia, o celular gigante
  com o site novo da Vitória Mar, grande e legível; o cliente joga a lupa na areia e comemora; o Breno e o seu Paulo do lado
- MOSTRA: ["personagem", "dono", "celular"]
- CENÁRIO: sala de noite → praia
- ENTRA AGORA: "Caçando cliente" vermelho (Antes); "Cabe no celular" verde (palavra "palma")
- OBJETOS SE MEXENDO: a lupa cai na areia (palavra "Paulo")
- PERSONAGEM: Antes: mão na testa · Agora: o cliente comemorando, o Breno vitória, o seu Paulo aplaudindo
- INTERAÇÃO: os três comemoram na frente do site novo
- CÂMERA: (1) afastando, médio, direita · (2) passando, médio, frente (frase 9: perto, direita)
- EFEITOS VISUAIS: as duas etiquetas · o ⏩ do jogo
- SONS: errado no Antes, certo no Agora

#### 11 · plano `segue` · ~6,5 s
> "E você, dava zoom ou fechava? Comenta ZOOM ou FECHAVA e segue. No computador, digita mappoa.com e testa você também."

- NA TELA: o Breno de pé na sala; a pergunta no topo; depois o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: sala de dia
- ENTRA AGORA: a pergunta (no começo); o cartão de seguir (palavra "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; o botão Seguir apertado
- PERSONAGEM: começo: chamando · em "digita": digitando
- INTERAÇÃO: o Breno digita mappoa.com; o robô acena
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- EFEITOS VISUAIS: a pergunta "Dava zoom ou fechava? Comenta ZOOM ou FECHAVA" · o cartão de seguir
- SONS: cliques, ding em "testa", o clique do Seguir
