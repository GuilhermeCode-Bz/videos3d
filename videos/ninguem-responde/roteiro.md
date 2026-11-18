# Ninguém responde (storytime em 1ª pessoa, mesmo estilo da placa-na-rua)

O Gui, web designer, conta a própria história: postou no grupo de Facebook (40 concorrentes comentaram "eu também"),
postou no Instagram todo dia (2 curtidas, uma era dele), mandou "oi, faço sites" pra 100 empresas (visualizaram e
sumiram). A virada: ele mandava pra quem nem precisava de site. Investe no sistema, acha as clínicas sem site e manda a
mensagem personalizada. Reviravolta no fim: o dono da clínica fechou com ele porque foi o único que não mandou
"oi, faço sites". ~58 s, 13 frases, voz Liam. Capa: "Ninguém *respondeu*?"

Base técnica: o cena.js da `placa-na-rua` / `sobrinho-de-14-anos` (mesmo esqueleto, VID novo `gui`). As frases 6 a 11 e
a 13 são as mesmas da placa-na-rua, palavra por palavra (clínicas de Campinas, 80 sem site): a narração delas já está
gravada e não gasta crédito da ElevenLabs (sobravam só 425 caracteres; as 6 frases novas têm 392).

Pedido do dono (17/11/2026): "o Gui não consegue arrumar clientes, nem em grupo de Facebook, nem por post, e as
mensagens que ele envia ninguém responde". Aplicado do canal: mais narrativa (passagem de tempo, tropeço, virada e
punchline no fim), o Mappoa como decisão de investir, mappoa.com no computador já na entrada, "Esse é o *Mappoa*" numa
frase só, o passo a passo na tela e o pedido de comentário "comenta a sua cidade" (o que mais deu comentário).

## Cenários

- `rua_predios` (o calçadão, de dia): gancho, mensagens, virada. As árvores e bancos perto da cena (CZ = 8,5) somem
- `home_office` (o quarto): grupo, Instagram, investe, busca, campanha, venda, segue
- `central_mappoa` e `mundo_mappoa`: a lista e o "Esse é o Mappoa"
- `clinica_odonto` (a recepção): o reencontro com o dono

## Objetos do vídeo

| Nome no código | O que é | Tamanho / cor | Onde fica | Frases |
|---|---|---|---|---|
| `personagem` | o Gui (menino de camiseta azul do canal) | 1,6 m | em toda frase | 1-13 |
| `mensagens` | balões verdes "Oi, faço sites!" com o ✓✓ cinza | 0,62 x 0,3 m, ~46 | chovendo do céu e virando um monte até a cintura dele | 1 |
| `celular` | o celular na mão (K.celular) | escala 1,8 | na mão dele | 1, 3, 4, 11 |
| `post_q` | o post dele no grupo: "Faço site! Me chama 🙂" | painel 1,5 x 1,0 m | acima do monitor | 2 |
| `comentarios` | balões "Eu também!", "Também faço!", "Faço mais barato" | 0,62 x 0,3 m, 26 | em volta do post, tapando tudo | 2 |
| `calendario` | o calendário DIA 1 → DIA 20 | painel 0,8 x 0,8 m | na parede do quarto | 3 |
| `voando` | os balões "Oi, faço sites!" saindo do celular pras lojas | 0,5 x 0,24 m, 12 | do celular até as placas das lojas | 4 |
| `vistos` | as plaquinhas azuis "✓✓ Visto" nas lojas | 0,7 x 0,3 m, 6 | nas placas das lojas perto da cena | 4 |
| `alertas` | os pinos vermelhos ✗ nas lojas que já tinham site | pino do Mappoa | nas lojas da esquerda | 5 |
| `monitor`, `navegador`, `busca`, `lista`, `tela`, `robo` | o kit do Mappoa (igual à placa-na-rua) | | quarto, central, palco | 6-11, 13 |
| `dono` | o dono da clínica (o doutor de jaleco, como na placa-na-rua) | | na ponta do balcão | 12 |
| `inbox` | o celular do dono em tela grande: 99 "Oi, faço sites!" | painel 0,95 x 1,6 m | do lado do dono | 12 |

## Teste dos substantivos

mensagens (1, 4: balões e celular) · grupo de Facebook (2: o post) · comentaram / eu também (2: balões) · Instagram,
curtidas (3: o celular com o post e o "Você curtiu") · dia trinta (4: etiqueta Dia 30) · cem empresas (4: contador e
as lojas) · visualizaram (4: "✓✓ Visto") · quem nem precisava de site (5: os ✗ "Já tinham site") · ferramenta, mappoa.com,
clínicas, lista, Mappoa, campanha, mensagem, trinta (6-11: o kit) · dono, "oi, faço sites" (12: o dono e o inbox dele) ·
cidade, computador (13: a chamada e a barra).

## Frase por frase

| # | Narração | Na tela (plano) |
|---|---|---|
| 1 | Eu mandei cem mensagens. Ninguém respondeu. | `gancho` · Calçadão. Já no 1º quadro chovem balões "Oi, faço sites!" do céu e viram um monte até a cintura dele, que digita no celular sem parar. Em "Ninguém": silêncio, ele para, ombros caídos, "0 respostas". 4 cortes de ~0,7 s: aberto e alto (o monte e ele pequeno) → de baixo, de frente (balões caindo) → médio, esquerda, o rosto → afastando, alto |
| 2 | Postei no grupo de Facebook: faço site. Quarenta comentaram: eu também. | `grupo` · Quarto. Ele sentado posta; o post "Faço site! Me chama 🙂" sobe acima do monitor. Em "Quarenta" ele levanta e os balões "Eu também!" pipocam em volta do post (contador 0 → 40). Em "também": mão na testa. Câmera: de trás do monitor, o rosto → afastando de fora, os balões tapando tudo |
| 3 | Postei no Instagram todo dia. Duas curtidas. Uma era minha. | `insta` · Quarto. O calendário vira DIA 1 → 20; ele de pé com o celular: "❤ 2 curtidas". Em "minha" a lista mostra "Você curtiu" e ele coça a cabeça, sem graça. Câmera: médio, o calendário e ele → perto, de frente, celular e rosto → passando, esquerda |
| 4 | No dia trinta, mandei "oi, faço sites" pra cem empresas. Visualizaram e sumiram. | `mensagens` · Calçadão, "Dia 30". Ele digita e os balões voam do celular pras placas das lojas (contador "Enviadas 100"). Em "Visualizaram" aparece "✓✓ Visto" em cada loja; em "sumiram" as plaquinhas somem num poof, ombros caídos. Câmera: por cima do ombro, rua abaixo → as lojas de lado → perto, o rosto |
| 5 | Até que eu entendi: eu mandava pra quem nem precisava de site. | `virada` · Calçadão. Em "entendi" a ideia (!). Em "precisava" os pinos vermelhos ✗ acendem nas lojas: "Já tinham site". Ele aponta. Câmera: chegando, médio → virando pras lojas da esquerda |
| 6 | Naquela noite, decidi investir numa ferramenta que acha as empresas que precisam do meu serviço. | `investe` · igual à placa-na-rua (sem a placa): decidido, senta, o mapa com os pinos verdes acende |
| 7 | No computador, entrei no mappoa.com e pesquisei: clínicas em Campinas. | `busca` · a barra com mappoa.com sendo digitado; a busca sobe |
| 8 | E veio uma lista com oitenta clínicas sem site. | `lista` · a central do Mappoa, a lista enchendo, o grupo SEM SITE |
| 9 | Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço. | `mappoa` · o palco, o logo, o robô e a análise com o score |
| 10 | Criei minha campanha no Mappoa e enviei a mensagem personalizada, já pronta. | `campanha` · o funil e a mensagem com o nome da clínica se escrevendo |
| 11 | Mandei pra trinta. Quase todas disseram não. Mas uma respondeu: pode vir aqui. | `venda` · "Enviadas 30", os ✗ e "Pode vir aqui! 😊" no celular |
| 12 | Cheguei lá, e o dono falou: você foi o único que não mandou "oi, faço sites". | `reencontro` · Recepção da clínica. Ele entra; em "falou" o dono mostra o celular e o inbox dele aparece grande: 99 "Oi, faço sites!". Em "único" ele ri e aponta pro Gui; em "sites" aperto de mão, ✓, dinheiro e "O único diferente". Câmera: chegando, de frente → parado, o inbox e o dono → passando, esquerda, os dois |
| 13 | Comenta a sua cidade que eu te mando quantas empresas aí não têm site. No computador, digita mappoa.com e acha as clínicas sem site perto de você. | `segue` · ele no quarto apontando pra câmera; "Comenta a sua cidade"; a barra mappoa.com; o cartão de seguir |

## Por que deve funcionar

- O gancho é a dor exata de quem assiste (mensagem sem resposta) com uma imagem absurda no 1º quadro: ele soterrado
  pelas próprias mensagens
- Três tentativas que todo web designer já fez, com passagem de tempo (DIA 1 → 20 → 30) e uma piada em cada uma
- A punchline fecha a história e prova o ponto sem explicar: a mensagem personalizada é o que fez ele ser escolhido
