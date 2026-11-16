# A foto que tá em mil sites: roteiro e ficha de cena

> Vídeo 3 do "Lote de 10" (pedido em 12/11/2026: tudo sem pedir aprovação, uma sessão por vídeo). Nicho: web designer.
> Negócio e cidade: nutricionistas de Florianópolis. O site da doutora Carla usa uma foto de banco de imagens (a moça
> loira sorrindo com a salada), que está em mil outros sites. O paciente acha a mesma moça em outro site e marca com
> outra nutri. O Enzo, web designer sem cliente, procura cliente um por um no Google e decide investir o preço de uma
> marmita num sistema que acha quem precisa de site.
> Aplicado dos aprendizados: imagem absurda no 1º quadro (um corredor sem fim de telas, todas com a mesma moça sorrindo
> igual, que piscam juntas em "percebe"), cortes a cada ~0,8 s nos 3 primeiros segundos, problema que dá pra VER (a
> mesma foto em dois sites no celular), o personagem já dentro da ação (sem "Esse é o ..."), o Mappoa entrando tarde
> como decisão de investir (sem valor exato, nunca "grátis"), mappoa.com digitado no computador, o Mappoa como
> **sistema**, ~55 s e o pedido de comentário de UMA palavra no fim (CONFIAVA ou DESCONFIAVA), sem prometer mandar nada.
> Outro cenário e outra composição que os vídeos 1 e 2: o corredor infinito (vazio_colorido), o coworking de vidro
> (escritorio_vidro), o consultório e a cafeteria.

## Roteiro

1. O site da nutricionista tem a mesma foto de mil outros. Se o cliente percebe, ele desconfia. *(gancho, a frase da pauta)*
2. O Enzo é web designer, tá sem cliente, e essa nutri perde paciente por uma foto.
3. No site da doutora Carla, a moça da salada nem é ela.
4. O paciente achou a mesma moça em outro site e marcou com outra nutri.
5. E o Enzo procurava cliente um por um no Google, até de madrugada.
6. Então ele decidiu investir o preço de uma marmita num sistema que acha quem precisa de site.
7. Digitou mappoa.com no computador, e veio a lista das nutricionistas de Florianópolis, com e sem site.
8. Esse é o *Mappoa*, que mostra as dores de cada uma, como site com cara de modelo pronto.
9. O Enzo manda a mensagem pronta, e a Carla pede um site com fotos dela.
10. Antes, o Enzo caçava cliente na mão. Agora, o site da Carla tem a cara dela.
11. E você, confiava nessa foto? Comenta CONFIAVA ou DESCONFIAVA e segue. No computador, digita mappoa.com e testa você também.

Cerca de 169 palavras, uns 55 s com o cartão de seguir (~1.000 caracteres da ElevenLabs; sobram ~8.200).

**Gancho:** a frase da pauta. Outras opções pensadas: "Essa moça sorridente tá em mil sites de nutricionista." e
"A nutricionista do site nem é a nutricionista." Fiquei com a da pauta (situação + "se você fizer X, acontece Y") e a
imagem absurda da pauta: o corredor sem fim de telas com a mesma moça sorrindo igual, e o paciente no meio.
1º quadro: de perto, uma tela com a moça loira sorrindo com a salada; a câmera se afasta e aparecem dezenas de telas
iguais dos dois lados de um corredor que some no horizonte.

**Capa:** "Já viu *essa moça*?" (18 letras), com o paciente desconfiado no meio do corredor de telas iguais.

## O que foi conferido

- Sem preço, sem plano e sem número falado; "o preço de uma marmita" é o espírito do investimento, sem valor
- O Mappoa **não** detecta foto de banco de imagens nem dá nota pro design (`canal/produto.md`). A virada é ele achar as
  nutricionistas de Florianópolis, separar com site e sem site, e a análise da IA escrever as dores. "Site com cara de
  modelo pronto" é um exemplo de dor que o próprio produto.md cita pra quem vende site. Nenhuma tela diz "foto de banco
  detectada"
- O Mappoa gera a mensagem; quem manda é o Enzo ("o Enzo manda a mensagem pronta"). Nada de "garante a venda": a Carla
  só "pede um site"
- Telas desenhadas genéricas, nutricionistas, sites e endereços inventados; a moça da foto é um desenho, não uma foto
  de nenhum banco de imagens de verdade

## Cenários

`vazio_colorido` roxo (o corredor infinito de telas, só no gancho e na capa) → `escritorio_vidro` (o coworking do Enzo, de
dia e de noite) → `consultorio` (o consultório da doutora Carla, com a tela grande do site dela na parede e a balança) →
`cafeteria` (onde o paciente procura nutri no celular) → `mundo_mappoa` (o palco da marca). A Carla é o
`K.personagem('dona')` de blazer branco (o jaleco); o paciente é um `K.boneco` de moletom laranja.

## Objetos do vídeo

| Nome no código | O que é | Onde | Frases |
|---|---|---|---|
| `telas` | corredor de 64 telas (1,5 × 1,0) em duas fileiras dos dois lados, cada uma um site de nutri com a mesma moça | vazio_colorido | 1, capa |
| `paciente` | moço de moletom laranja (K.boneco) com um celular pequeno na mão | corredor, cafeteria | 1, 4, 10 |
| `personagem` | o Enzo (personagem do canal) | coworking, consultório, palco | 2, 5, 6, 7, 8, 9, 10, 11 |
| `monitor` | computador do Enzo com mesa | coworking | 2, 5, 6, 7, 9, 10, 11 |
| `dona` | a doutora Carla (K.personagem dona, blazer branco) | consultório | 2, 3, 9, 10 |
| `site` | tela grande do site da Carla na parede (3,0 × 1,9): a moça da salada; no fim, a foto da Carla | consultório | 2, 3, 10 |
| `celular` | celular gigante: os dois sites com a mesma moça; a mensagem do WhatsApp | cafeteria, consultório | 4, 9 |
| `papeis` | bolinhas de papel amassado se amontoando em volta da mesa | coworking de noite | 5, 10 |
| `despertador` | despertador com os ponteiros correndo até as 3h | mesa do coworking | 5 |
| `marmita` | marmita fit (arroz, frango, brócolis, cenoura) na mão do Enzo (o investimento) | coworking | 6 |
| `navegador` | a barra com mappoa.com | acima do monitor | 7, 11 |
| `tela` | painel do Mappoa: a lista das nutricionistas, a análise da Carla, a mensagem pronta | coworking, palco | 7, 8, 9 |
| `robo` | robô do Mappoa | palco, coworking | 8, 11 |

## Teste dos substantivos

site / nutricionista / foto / mil outros (1: o corredor de telas, etiqueta "A mesma foto em mil sites") · cliente /
percebe / desconfia (1: o paciente no meio, as moças piscando juntas, "?") · Enzo / web designer / cliente (2: etiquetas)
· nutri / paciente / foto (2: a Carla do lado da tela do site, etiqueta "Perde paciente") · site / doutora Carla / moça /
salada (3: a tela grande com a moça e a Carla do lado, morena, etiqueta "Não é ela") · paciente / mesma moça / outro
site / outra nutri (4: o celular troca de site e a moça é a mesma, etiqueta "A mesma moça!") · Google / um por um /
madrugada (5: a busca no monitor, os papéis amassados e o despertador nas 3h) · marmita / sistema / site (6: a marmita
entra no computador) · mappoa.com / computador / lista / nutricionistas / Florianópolis / com e sem site (7) · Mappoa /
dores / modelo pronto (8: a análise com "Site com cara de modelo pronto") · mensagem / Carla / fotos dela (9: o WhatsApp
no celular dela e o balão) · cara dela (10: a tela do site agora com a foto da Carla) · você / comenta / mappoa.com (11).

## Ficha de cena

#### 1 · plano `gancho` · ~4,5 s
> "O site da nutricionista tem a mesma foto de mil outros. Se o cliente percebe, ele desconfia."

- NA TELA: um corredor sem fim de telas dos dois lados, em duas fileiras, cada uma um site de nutricionista diferente
  (nome no topo), todas com a mesma moça loira sorrindo com a salada; no meio do corredor, o paciente de moletom laranja
  com o celular na mão, olhando de um lado pro outro
- MOSTRA: ["telas", "paciente"]
- CENÁRIO: vazio_colorido roxo, formas flutuando no fundo
- ENTRA AGORA: nada entra: no 1º quadro as telas já estão lá; em "mesma", a etiqueta
- OBJETOS SE MEXENDO: as moças balançam a cabeça igual, sincronizadas; em "percebe" todas piscam juntas; em
  "desconfia" as molduras ficam vermelhas, uma onda do fundo pra frente
- PERSONAGEM: o paciente · começo: olha pra esquerda e pra direita (vira o corpo) · em "percebe": surpreso · em
  "desconfia": dúvida, cara de nojo
- INTERAÇÃO: o paciente olha as telas e segura o celular
- CÂMERA: 4 cortes · (1) 0–0,8 s: uma tela da esquerda de perto, afastando · (2) 0,8–1,6 s: baixo, no meio do corredor,
  chegando, o corredor sumindo no fundo · (3) 1,6 s até "desconfia": girando em volta do paciente, médio · (4) de
  "desconfia" ao fim: perto, chegando, na cara dele, com o "?" e o ✗
- EFEITOS VISUAIS: etiqueta laranja "A mesma foto em mil sites" (palavra "mesma") · "?" na cabeça (palavra "percebe") ·
  ✗ vermelho (palavra "desconfia")
- SONS: whoosh no 1º quadro · ding em "percebe" (as piscadas) · errado em "desconfia"

#### 2 · plano `enzo` · ~4,0 s
> "O Enzo é web designer, tá sem cliente, e essa nutri perde paciente por uma foto."

- NA TELA: (1) o coworking de vidro de dia; o Enzo sentado no computador com o portfólio dele · (2) em "nutri": o
  consultório, a doutora Carla do lado da tela grande do site dela, a sala de espera vazia
- MOSTRA: ["personagem", "monitor"]
- CENÁRIO: escritorio_vidro de dia (a cidade no janelão) → consultorio
- ENTRA AGORA: etiqueta "Web designer" (palavra "designer"); "Sem cliente" (palavra "cliente"); "Perde paciente"
  (palavra "paciente")
- OBJETOS SE MEXENDO: o portfólio no monitor; no consultório, a moça da tela balançando
- PERSONAGEM: o Enzo sentado · começo: digitando · em "cliente": coça a cabeça · a Carla: olha o relógio
- INTERAÇÃO: o Enzo digita; a Carla espera do lado da tela
- CÂMERA: (1) até "nutri": passando, perto, direita, olho · (2) chegando, médio, frente, na Carla e na tela
- EFEITOS VISUAIS: as etiquetas azul, vermelha e vermelha
- SONS: cliques, pingo em "cliente", whoosh na troca

#### 3 · plano `site` · ~3,2 s · jogo `falha`
> "No site da doutora Carla, a moça da salada nem é ela."

- NA TELA: o consultório; a tela grande do site "Nutri Carla Souza" com a moça loira da salada; a Carla, morena, do lado,
  apontando orgulhosa
- MOSTRA: ["site", "dona"]
- CENÁRIO: consultório, a balança e a maca ao lado
- ENTRA AGORA: a tela acende do preto (palavra "site")
- OBJETOS SE MEXENDO: a moça da tela sorri; em "nem é ela" um círculo vermelho em volta da moça na tela
- PERSONAGEM: a Carla · começo: mostrando a tela · em "ela": encolhe os ombros
- INTERAÇÃO: a Carla apresenta o site com a mão
- CÂMERA: (1) até "moça": chegando, perto, frente, na tela · (2) passando, médio, esquerda, na Carla e na moça lado a
  lado (frase 2: médio, frente)
- EFEITOS VISUAIS: etiqueta vermelha "Não é ela" (palavra "ela") · ✗ · no fim congela em preto e branco (o jogo)
- SONS: clique em "site" · errado em "ela"

#### 4 · plano `paciente` · ~3,6 s
> "O paciente achou a mesma moça em outro site e marcou com outra nutri."

- NA TELA: a cafeteria; o paciente de pé com o celular gigante do lado: primeiro o site da Nutri Carla, depois o da
  "Vida Leve Nutrição", com a mesma moça
- MOSTRA: ["paciente", "celular"]
- CENÁRIO: cafeteria, as luminárias quentes e o cardápio ao fundo
- ENTRA AGORA: o celular sobe do chão (no começo); o outro site desliza (palavra "outro")
- OBJETOS SE MEXENDO: a tela do celular troca de site em "outro"; o celular vibra em "marcou"
- PERSONAGEM: o paciente · começo: olhando o celular · em "mesma": surpreso · em "marcou": faz que não e sai andando
- INTERAÇÃO: o paciente olha o celular e vai embora
- CÂMERA: (1) até "outro": chegando, perto, frente-esquerda, no celular · (2) passando, médio, no paciente saindo
  (frase 3: médio, esquerda, no consultório)
- EFEITOS VISUAIS: etiqueta laranja "A mesma moça!" (palavra "outro") · "?" (palavra "mesma") · "Marcou com outra"
  vermelha (palavra "nutri")
- SONS: bip, range na troca, errado em "marcou"

#### 5 · plano `procura` · ~3,6 s
> "E o Enzo procurava cliente um por um no Google, até de madrugada."

- NA TELA: o coworking de noite, a cidade acesa no janelão; o Enzo digitando; as bolinhas de papel amassado se
  amontoando em volta da mesa; o despertador correndo até as 3h
- MOSTRA: ["personagem", "papeis", "despertador"]
- CENÁRIO: escritorio_vidro de noite
- ENTRA AGORA: uma bolinha de papel por clique (a partir de "um")
- OBJETOS SE MEXENDO: cada bolinha voa da mão pro chão; os ponteiros giram rápido; o despertador toca em "madrugada"
- PERSONAGEM: sentado · começo: digitando · em "madrugada": cochila (Zzz)
- INTERAÇÃO: o Enzo amassa e joga
- CÂMERA: (1) até "Google": girando, médio, esquerda · (2) passando, médio, nos papéis e no despertador (frase 4:
  passando na cafeteria)
- EFEITOS VISUAIS: etiqueta vermelha "Um por um..." (palavra "um")
- SONS: um clique por bolinha, o toque do despertador

#### 6 · plano `investe` · ~4,2 s · jogo `corrige`
> "Então ele decidiu investir o preço de uma marmita num sistema que acha quem precisa de site."

- NA TELA: o coworking de dia; o Enzo de pé ao lado da mesa com a marmita na mão; a marmita voa pro monitor
- MOSTRA: ["personagem", "marmita", "monitor"]
- CENÁRIO: escritorio_vidro de dia
- ENTRA AGORA: a marmita aparece na mão (palavra "investir") · a etiqueta verde "Investimento" (palavra "investir")
- OBJETOS SE MEXENDO: a marmita voa em arco, girando e encolhendo, até o monitor e some num poof (palavra "sistema"); o
  monitor carrega (barra enchendo)
- PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
- INTERAÇÃO: o Enzo "investe" a marmita no computador
- CÂMERA: (1) até "sistema": chegando, perto, direita, olho · (2) passando, perto, esquerda (frase 5: médio nos papéis)
- EFEITOS VISUAIS: "Investimento" verde · "Acha quem precisa de site" verde (palavra "precisa")
- SONS: ding em "marmita" · whoosh · brilho no poof · certo

#### 7 · plano `lista` · ~4,0 s
> "Digitou mappoa.com no computador, e veio a lista das nutricionistas de Florianópolis, com e sem site."

- NA TELA: a barra com mappoa.com acima do monitor; a lista das nutricionistas de Florianópolis sobe do computador, com
  as pílulas "com site" e "sem site"
- MOSTRA: ["navegador", "tela", "personagem"]
- CENÁRIO: escritorio_vidro de dia
- ENTRA AGORA: a barra cresce (palavra "Digitou"); a lista sobe do monitor (palavra "lista")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; as nutricionistas entrando uma por uma (palavra "nutricionistas")
- PERSONAGEM: começo: digitando · em "lista": levanta e aponta a Nutri Carla
- INTERAÇÃO: o Enzo digita e aponta a lista
- CÂMERA: (1) por cima do ombro olhando o endereço, perto, esquerda · (2) chegando, médio, frente (frase 6: passando)
- EFEITOS VISUAIS: etiqueta azul "Florianópolis" (palavra "Florianópolis")
- SONS: cliques, brilho, bips

#### 8 · plano `mappoa` · ~3,8 s
> "Esse é o *Mappoa*, que mostra as dores de cada uma, como site com cara de modelo pronto."

- NA TELA: o palco da marca; a análise da Nutri Carla Souza (aderência, "DORES PROVÁVEIS": "Site com cara de modelo
  pronto", "Presença digital fraca"; oportunidades); o robô e o Enzo
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: mundo_mappoa, cartões e pinos flutuando
- ENTRA AGORA: o painel cai do alto (palavra "Mappoa")
- OBJETOS SE MEXENDO: os blocos da análise aparecem um por um (palavra "dores"); a barra da aderência enche
- PERSONAGEM: começo: chamando · em "pronto": comemorando
- INTERAÇÃO: o robô acena e o Enzo apresenta a análise
- CÂMERA: (1) chegando, médio, frente, baixo · (2) passando, médio, esquerda (frase 7: médio, frente, olho)
- EFEITOS VISUAIS: rótulo "Mappoa" · "Dores de cada uma" verde (palavra "modelo")
- SONS: brilho, bips, certo

#### 9 · plano `mensagem` · ~3,6 s
> "O Enzo manda a mensagem pronta, e a Carla pede um site com fotos dela."

- NA TELA: (1) o coworking: o Enzo na frente da mensagem pronta do Mappoa, clicando em "Enviar pelo WhatsApp" · (2) em
  "Carla": o consultório, a Carla com o celular gigante mostrando a mensagem do Enzo e a resposta dela
- MOSTRA: ["dona", "celular"]
- CENÁRIO: escritorio_vidro → consultorio
- ENTRA AGORA: a bolha da mensagem (palavra "Carla"); a bolha da resposta (palavra "pede")
- OBJETOS SE MEXENDO: o celular vibra quando a mensagem chega
- PERSONAGEM: o Enzo aponta o botão · a Carla: lê no celular, surpresa · em "pede": comemora
- INTERAÇÃO: o Enzo manda; a Carla lê e responde
- CÂMERA: (1) até "Carla": chegando, perto, frente, na tela · (2) passando, perto, direita, no celular e na Carla
  (frase 8: no palco)
- EFEITOS VISUAIS: balão de fala "Quero um site com fotos minhas!" · ✓
- SONS: clique no enviar · pingo da mensagem · certo em "pede"

#### 10 · plano `antes_agora` · ~3,8 s · jogo `avanca`
> "Antes, o Enzo caçava cliente na mão. Agora, o site da Carla tem a cara dela."

- NA TELA: (1) Antes: o Enzo sentado de noite no coworking, os papéis amassados em volta · (2) Agora: no consultório, a
  tela grande do site com a foto da Carla de verdade (morena, de jaleco), o Enzo e a Carla do lado, o paciente voltando
- MOSTRA: ["personagem", "dona"]
- CENÁRIO: o coworking de noite → o consultório
- ENTRA AGORA: "Caçando cliente" vermelho (Antes); "Foto de verdade" verde (palavra "cara")
- OBJETOS SE MEXENDO: no Agora, a tela do site troca a moça pela Carla (palavra "Carla")
- PERSONAGEM: Antes: mão na testa · Agora: o Enzo vitória, a Carla aplaudindo, o paciente comemorando
- INTERAÇÃO: os três comemoram juntos na frente do site novo
- CÂMERA: (1) afastando, médio, direita · (2) passando, médio, frente (frase 9: perto, direita)
- EFEITOS VISUAIS: as duas etiquetas · o ⏩ do jogo
- SONS: errado no Antes, certo no Agora

#### 11 · plano `segue` · ~6,5 s
> "E você, confiava nessa foto? Comenta CONFIAVA ou DESCONFIAVA e segue. No computador, digita mappoa.com e testa você
> também."

- NA TELA: o Enzo de pé no coworking; a pergunta no topo; depois o cartão de seguir; a barra com mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: escritorio_vidro de dia
- ENTRA AGORA: a pergunta (no começo); o cartão de seguir (palavra "segue"); a barra (palavra "computador")
- OBJETOS SE MEXENDO: as letras de mappoa.com digitadas; o botão Seguir apertado
- PERSONAGEM: começo: chamando · em "digita": digitando
- INTERAÇÃO: o Enzo digita mappoa.com; o robô acena
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
- EFEITOS VISUAIS: a pergunta "Confiava nessa foto? Comenta CONFIAVA ou DESCONFIAVA" · o cartão de seguir
- SONS: cliques, ding em "testa", o clique do Seguir
