# Você e mais oitenta brigando por um cliente só: roteiro e ficha de cena

> Vídeo 1 dos "Próximos 3" da pauta (13/11/2026), feito direto sem aprovação no meio (o dono pediu: "só me traz
> pronto"). Receita da análise dos 3 mais vistos (megafone 22,5 mil, barba 13 mil): a dor do PRÓPRIO web designer sem
> cliente, falando com "você"; o gancho é uma METÁFORA absurda (um leilão ao contrário, oitenta web designers levantando
> plaquinha de preço pra uma empresa só); a frase deixa curiosidade aberta, sem "Se X, Y"; uma ideia de atitude (pare de
> brigar por cliente, vá onde ninguém está) com rival que leva o projeto (R$ 150) e a virada do personagem (larga a
> plaquinha); o Mappoa como decisão de investir ("o preço de um lanche"); ~44 s; fim "Comenta a sua cidade", sem
> prometer nada.

## Roteiro

1. Você e mais oitenta brigando por um cliente só. *(gancho)*
2. O Caio é web designer e disputa cada projeto em site de freela e grupo de Facebook.
3. Sempre tem alguém mais barato. Dessa vez, levou quem cobrou cento e cinquenta reais.
4. Aí o Caio largou a plaquinha. Em vez de brigar, foi onde ninguém estava.
5. Ele decidiu investir o preço de um lanche num sistema que mostra quem precisa de site e ninguém tá oferecendo.
6. No computador, digitou mappoa.com. Veio a lista das óticas de Aracaju sem site.
7. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço. *(áudio copiado do empresa-gritando: não gasta)*
8. Antes, o Caio brigava com oitenta. Agora, ele chega sozinho.
9. Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também.

124 palavras, 9 frases, uns 44 s com o cartão de seguir. **ElevenLabs:** 683 caracteres, 618 pagos (a frase 7 vem
pronta). O saldo (1.970) é dividido com o vídeo do aquário: dá.

**Onde o tempo vai:** gancho e dor (1 a 3) uns 14 s · a virada (4) uns 4 s · o Mappoa (5 a 7) uns 14 s · o fim (8 e 9)
uns 11 s.

**Gancho escolhido:** A (a frase da pauta). Opções:
- **A:** "Você e mais oitenta brigando por um cliente só." (o leilão ao contrário: as plaquinhas subindo e os lances
  caindo no telão, R$ 800 → R$ 500 → R$ 200, e o martelo batendo; a metáfora sem explicar o que é)
- **B:** "Oitenta web designers. Um cliente. Quem cobra menos leva." (entrega a conclusão no gancho, o erro dos medianos)
- **C:** "Tem um leilão acontecendo agora. E o prêmio é você mais barato." (mais curiosa, mas longa e abstrata)

**Capa:** "Você e mais *80*?" (15 letras), o leilão visto de trás da dona: a multidão de plaquinhas, o telão com o lance
e o Caio na frente, de mão na testa.

## O que foi conferido

- Do que aprendi: dor do próprio web designer, metáfora absurda no 1º quadro, curiosidade aberta, rival que leva o
  cliente, virada do personagem, Mappoa como decisão de investir (sem valor e sem "grátis"), mappoa.com digitado no
  computador já na entrada do Mappoa, cortes a cada ~0,8 s nos 3 primeiros segundos, "Comenta a sua cidade" sem prometer
  mostrar nada, ~44 s, cartão de seguir
- Sem "Esse é o Caio": ele aparece dentro da ação (2)
- O Mappoa: "sistema que mostra quem precisa de site" (a lista SEM SITE da busca por segmento e cidade) e a análise com
  o score. "Ninguém tá oferecendo" é a ideia do dono na pauta (a empresa sem site é quem ainda não foi atendida); na
  tela não aparece nenhum número de propostas inventado pro Mappoa
- Nomes inventados: Ótica Visão Clara (a da dona), Ótica Farol, Óticas Atalaia, Ótica do Mercado. Cidade: Aracaju, SE
  (nicho e cidade novos no canal). "Facebook" só falado; na tela, um grupo genérico ("Sites Aracaju"), sem marca
- R$ 800, R$ 500, R$ 200 e R$ 150 são os lances do leilão (a história), não preço do Mappoa

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `palco_show` como o LEILÃO (1, 3, 4 e o "Antes" da 8: o telão com o lance, a
cortina vermelha, os refletores e a plateia no escuro), `home_office` de dia (2, 5, 6, 9), `mundo_mappoa` (7) e
`rua_predios` de dia (o "Agora" da 8: a loja ÓTICA do calçadão).
**Personagens:** o do canal, chamado Caio (camiseta azul). O **rival** (K.boneco, moletom vermelho). A **dona** da
ótica (`K.personagem('dona')`, blazer azul-marinho e os óculos redondos grandes feitos no `cena.js`). A **multidão**:
21 web designers (K.boneco com cores variadas, meninos e meninas), cada um com a sua plaquinha. O **robô do Mappoa** na
7 e na 9.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| placas | plaquinhas de lance "R$ 800" | K.telaCanvas nos dois lados + cabo | 0,55 x 0,38, branca, número preto | na mão erguida de cada um da multidão | 1, 3, 4, 8 |
| placa_caio | a plaquinha do Caio | igual, borda azul | 0,55 x 0,38 | na mão do Caio; cai no chão na 4 | 3, 4 |
| martelo | martelo de leilão | cilindros (cabo e cabeça) + bloquinho | madeira | na mesa da dona, no palco | 1, 3 |
| mesa_leilao | o púlpito da dona | caixa com faixa "LEILÃO" | azul-marinho | palco, z -3 | 1, 3, 4, 8 |
| telao | o lance atual | telão do palco_show | 7,2 x 3,4 | fundo do palco | 1, 3, 4 |
| oculos | óculos da dona da ótica | dois toros + ponte | preto | na cabeça da dona | 1, 3, 8 |
| monitor | computador do Caio | K.computador | mesa clara | quarto | 2, 5, 6, 9 |
| baloes | "Faço por R$ 300!" etc. | K.balaoFala | branco | em volta do monitor | 2 |
| lanche | o investimento | grupo de cilindros (pão, carne, queijo) | 1,8x | na mão do Caio, voa pro monitor | 5 |
| navegador | barra com mappoa.com | K.painelMappoa | 2,3 x 0,4 | em cima do monitor | 6, 9 |
| tela | lista e análise do Mappoa | K.painelMappoa | 1,4 x 2,33 / 1,56 x 2,6 | quarto / palco da marca | 6, 7 |
| robo | robô do Mappoa | K.roboMappoa | — | palco da marca, quarto | 7, 9 |
| pino | pino do mapa | K.m3d('pino') | 0,8x | quarto | 9 |

**Teste dos substantivos:** oitenta (a multidão + "+80" na etiqueta), cliente (a dona no púlpito), web designer
(etiqueta), projeto / site de freela / grupo de Facebook (as duas telas do monitor), mais barato / cento e cinquenta
(a placa R$ 150 do rival e o telão), plaquinha (a placa do Caio caindo), lanche (o lanche), sistema (a tela), óticas de
Aracaju (a lista), Mappoa (o palco), oitenta (a multidão no Antes), sozinho (o Caio sozinho na porta da ótica), cidade
(o pino), computador e mappoa.com (a barra).

### 1. Gancho: "Você e mais oitenta brigando por um cliente só."
- NA TELA: o palco do leilão; a dona atrás do púlpito com o martelo; na frente dela a multidão de web designers
  levantando plaquinhas; o telão "SITE DA ÓTICA · LANCE R$ 800" · MOSTRA: multidao, placas, dona, martelo
- O QUE SE MEXE: as plaquinhas sobem e descem em ondas; o telão cai de R$ 800 (0 s) pra R$ 500 (~0,8 s) e R$ 200
  (~1,6 s); as plaquinhas trocam junto · em "só": o martelo bate (onda de choque e estalo)
- PERSONAGEM: a multidão de braço erguido, aflita · a dona olhando de um pro outro e batendo o martelo em "só"
- CÂMERA (corte a cada ~0,8 s): (1) plaquinhas R$ 800 de perto, de trás da dona, chegando · (2) o telão R$ 500 com as
  plaquinhas em primeiro plano, subindo · (3) a cara da multidão erguendo R$ 200, passando · (4) aberto: a dona bate o
  martelo, a multidão inteira na frente, afastando · ETIQUETA: "+80 web designers"
- SONS: burburinho (zumbido baixo), bip a cada lance, estalo e estrondo do martelo

### 2. "O Caio é web designer e disputa cada projeto em site de freela e grupo de Facebook."
- NA TELA: o quarto de dia; o Caio no computador; a tela do site de freela "Site pra ótica · 87 propostas" (o número
  subindo) · em "grupo": a tela do grupo "Sites Aracaju: alguém faz site barato?" e os balões saindo do monitor
  ("Faço por R$ 300!", "Faço por R$ 250!", "Eu faço!") · MOSTRA: personagem, monitor
- PERSONAGEM: digita rápido · em "Facebook": coça a cabeça (aflito)
- CÂMERA: (1) chegando, perto, direita, olho · (2) em "grupo": passando, médio, esquerda, com os balões
- ETIQUETA: "Web designer" em "designer" · SONS: cliques, bip a cada balão

### 3. "Sempre tem alguém mais barato. Dessa vez, levou quem cobrou cento e cinquenta reais."
- NA TELA: o leilão de novo; o Caio no meio da multidão erguendo "R$ 200"; o rival (moletom vermelho) do lado dele ·
  em "levou": o rival ergue "R$ 150" mais alto · em "cinquenta": o martelo bate e o telão vira "VENDIDO · R$ 150"
  MOSTRA: personagem, rival, martelo
- PERSONAGEM: o Caio erguendo a placa, confiante · em "cinquenta": triste, de ombros caídos. O rival comemora
- CÂMERA: (1) chegando, perto, no Caio e na placa · (2) em "Dessa": o rival erguendo, subindo · (3) em "cinquenta": a
  dona com o martelo e o rival, médio · EFEITO: ✗ em cima do Caio · SONS: bip, estalo do martelo, errado

### 4. "Aí o Caio largou a plaquinha. Em vez de brigar, foi onde ninguém estava."
- NA TELA: o Caio abre a mão e a plaquinha cai no chão; ele vira de costas pro leilão e anda pra fora do palco; atrás,
  a multidão continua erguendo placas e o telão segue caindo (R$ 120, R$ 100) · MOSTRA: personagem, placa_caio, multidao
- PERSONAGEM: olha a placa, decide (ideia) · anda decidido pra fora
- CÂMERA: (1) perto, a mão e a placa caindo, descendo · (2) em "brigar": seguindo o Caio de frente, a multidão atrás
- ETIQUETA: "Fora do leilão" em "plaquinha", "Onde ninguém está" em "ninguém" · SONS: placa batendo, whoosh, passos

### 5. "Ele decidiu investir o preço de um lanche num sistema que mostra quem precisa de site e ninguém tá oferecendo."
- NA TELA: o quarto; o Caio de pé com o lanche na mão · em "sistema": o lanche voa girando pro monitor e some num poof;
  a tela acende · MOSTRA: personagem, lanche, monitor
- PERSONAGEM: olha o lanche e faz que sim · aponta o monitor · em "oferecendo": comemora
- CÂMERA: (1) chegando, perto, direita · (2) em "sistema": passando, perto, no monitor
- ETIQUETA: "Investimento" em "investir", "Ninguém oferecendo" em "oferecendo" · SONS: ding, whoosh, brilho, certo

### 6. "No computador, digitou mappoa.com. Veio a lista das óticas de Aracaju sem site."
- NA TELA: a barra com "mappoa.com" sendo digitado, grande · em "lista": a lista SEM SITE das óticas de Aracaju sobe do
  computador (Ótica Visão Clara, Ótica Farol, Óticas Atalaia, Ótica do Mercado) · MOSTRA: navegador, tela, personagem
- PERSONAGEM: digitando · em "lista": levanta e aponta a primeira
- CÂMERA: (1) chegando, perto, no endereço · (2) subindo, médio, frente, na lista · ETIQUETA: "Aracaju" · SONS: cliques, bip

### 7. "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."
- NA TELA: o palco da marca; a análise da Ótica Visão Clara (score, dores, oportunidade); o robô acenando; o Caio à
  direita · MOSTRA: tela, robo, personagem
- CÂMERA: (1) chegando, médio, frente, baixo · (2) passando, médio, esquerda · RÓTULO: "Mappoa" · ETIQUETA: "Quem
  precisa de você"

### 8. "Antes, o Caio brigava com oitenta. Agora, ele chega sozinho."
- NA TELA: (1) Antes: o leilão, o Caio espremido na multidão de placas · (2) Agora: o calçadão de dia, a loja ÓTICA, a
  dona de óculos na porta; o Caio chega sozinho com a análise e ela faz joia · MOSTRA: personagem, dona
- CÂMERA: (1) afastando, médio, de trás da dona · (2) andando junto (K.mirar), depois passando, médio
- ETIQUETA: "Brigando com 80" no Antes, "Sozinho" no Agora · EFEITO: ✓ · SONS: errado, whoosh, certo

### 9. "Comenta a sua cidade e segue. No computador, digita mappoa.com e testa você também."
- NA TELA: o quarto; "Comenta a sua cidade" no topo e o pino caindo · em "segue": o cartão de seguir · a barra com
  mappoa.com · o robô acenando · MOSTRA: personagem, navegador, monitor
- PERSONAGEM: chamando (aponta pra quem assiste) · em "digita": digitando
- CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
