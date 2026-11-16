# Web designer, planilha infinita: roteiro e ficha de cena

> Pedido do dono (16/11/2026): mais 2 roteiros no gancho novo "situação + então não faça isso", pra fazer junto com o
> canhao-de-mensagem (os 3 com o mesmo esqueleto, um cena.js só com o bloco CFG). Este é o da ideia A da conversa: o
> Mateus, que acabou de aprender a fazer site, procura cliente anotando empresa por empresa do Maps numa planilha de
> papel que não acaba nunca. A virada: o problema não é procurar, é procurar na mão. Nicho: clínicas de estética de
> Maringá. 50 a 55 s, com o Mappoa APRESENTADO (~17 s).

## Roteiro

1. Web designer, acabou de aprender a fazer site? Então não faça isso. *(gancho)*
2. O Mateus abriu o Google Maps e começou a anotar empresa por empresa.
3. Nome, telefone, se tem site... Três dias, e a planilha já dá a volta no quarteirão.
4. Mas metade já tem site. E a outra metade nem atende o telefone.
5. O problema não é procurar. É procurar na mão, uma por uma.
6. Aí ele decidiu investir o preço de um hambúrguer numa ferramenta que procura por ele.
7. No computador, digita mappoa.com e escreve: clínicas de estética em Maringá.
8. Em segundos vem a lista: setenta e duas clínicas, vinte e oito sem site, já com os contatos.
9. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
10. Ele abre uma clínica e já vê a nota pra oferta dele e a mensagem pronta.
11. Mandou pra vinte. Quase todas disseram não. Mas uma topou: o primeiro site vendido.
12. Antes, três dias de planilha. Agora, uma busca e ele já tá abordando.
13. Quantos dias você já perdeu montando planilha? Comenta o número. No computador, digita mappoa.com e acha as clínicas sem site da sua cidade.

Cerca de 165 palavras, uns 53 a 55 s com o cartão de seguir (uns 940 caracteres da ElevenLabs).

**Gancho escolhido:** A. Opções:
- **A:** "Web designer, acabou de aprender a fazer site? Então não faça isso." (o Mateus sentado numa mesinha no meio da rua,
  escrevendo numa planilha de papel que já sai rolando pela calçada, enrola o poste, passa por baixo de um carro e some
  na esquina; o "isso" é a caneta escrevendo)
- **B:** "Web designer, vai procurar cliente no Maps hoje? Então não faça isso." (mesma imagem; mais perto do canhão, os
  dois ficariam parecidos demais postados na mesma semana)
- **C:** "Acabou de aprender a fazer site? Então não faça isso." (mais curto, ~3 s; perde o "Web designer")

**Capa:** "*3 dias* de planilha?" (19 letras; diferente do "Não faça isso!" do canhão, pra não repetir), o Mateus
enrolado na planilha de papel que dá a volta no quarteirão.

## O que foi conferido

- Gancho novo: situação ("acabou de aprender a fazer site?") + "então não faça isso", com o "isso" na tela no 1º
  quadro (a planilha já rolando pela rua). Resposta na 2, virada na 5
- A dor é a DIFICULDADE DE ACHAR cliente: anotar empresa por empresa, ver se tem site, caçar telefone (aprendizados)
- Imagem absurda da dor no 1º quadro, nada de preparar a cena; cortes de ~0,7 s no começo
- Sem "Esse é o Mateus": ele entra já dentro da ação (2)
- Não é de graça: "decidiu investir o preço de um hambúrguer" (pastel, espetinho, torta, cuscuz e açaí já usados)
- O mappoa.com digitado "no computador" na entrada (7) e no fim (13)
- O Mappoa mostrado: a busca (7), a lista com o número e separada com/sem site (8), o nome numa frase só (9), uma
  empresa aberta com a nota (score de aderência) e a mensagem pronta (10). "Já com os contatos"
- "Em segundos" (8): a lista do Mappoa vem rápido; não é um número de tempo exato
- Quem manda é o Mateus (11); o Mappoa só prepara. Sem prometer venda: "quase todas disseram não"
- Números (3 dias, 72 clínicas, 28 sem site, nota 87, 20 mensagens) são da história
- Pedido do fim com pergunta ligada à história e resposta de um número; o "segue" fica só no cartão
- Empresas inventadas: Clínica Bella Pele (a aberta na 10 e a que topa na 11), Estética Viva Maringá, Espaço Renova e
  as outras da lista

## Ficha de cena

**Cenários (cinco, com `K.cenarios`):** `rua_predios` de dia (1, 3, 4, 5 e o "Antes" da 12) · `home_office` de dia
(2, 6, 7, 10, 13) · `central_mappoa` (8) · `mundo_mappoa` (9) · `clinica_odonto` como clínica de estética (11 e o
"Agora" da 12).
**Personagens:** o do canal, chamado Mateus, em todas · a dona da Clínica Bella Pele (personagem `dentista` de
jaleco, chamada de esteticista) na 11 e 12 · o robô do Mappoa na 8, 9 e 13 · uma recepcionista ao telefone
(personagem `secretaria`) na 4.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| mesinha | Mesinha escolar com cadeira, no meio do calçadão | caixas + K.m3d se houver | 0,8 m, madeira | calçadão, perto de uma árvore | 1, 3, 4, 12 |
| planilha | Planilha de papel infinita, com linhas e colunas desenhadas, rolando pela rua | fita comprida (PlaneGeometry larga, curvada por um caminho), textura de planilha | 0,9 m de largura, branca com linhas cinza | sai da mesinha, enrola o poste, passa embaixo de um carro e vai até a esquina | 1, 3, 4, 5, 12 |
| caneta | Caneta azul gigante na mão | cilindro + ponta | 0,4 m, azul | na mão dele | 1, 3 |
| maps | O celular com o Google Maps e os pinos | K.m3d('celular') + tela desenhada com pinos | escala 0,7 | na mão dele / na mesa | 2 |
| pinos | Pinos do Maps saindo do celular e virando linhas da planilha | K.pino do kit Mappoa, pequenos | vermelhos | do celular até a planilha | 2 |
| colunas | Etiquetas das colunas "NOME · TELEFONE · TEM SITE?" | plano desenhado | 1,6 m | no topo da planilha | 3 |
| calendario | Calendário arrancando folhas: SEG → TER → QUA | plano desenhado | 0,6 m | flutuando acima da mesinha | 3 |
| marcas | ✓ laranja "já tem site" e telefone com ✗ "não atende" pipocando nas linhas | planos desenhados | 0,35 m | sobre as linhas da planilha | 4 |
| telefone | Telefone de mesa da recepcionista tocando | K.m3d se houver, ou caixa + fone | — | na janela de um prédio | 4 |
| tesoura | Tesoura gigante que corta a planilha | K.m3d('tesoura') em escala 3 | prateada | na mão dele | 5 |
| hamburguer | O hambúrguer "1 HAMBÚRGUER" que vira moeda | esferas achatadas empilhadas + plano | 0,35 m | na mão dele | 6 |
| monitor | Computador com mesa | K.computador | mesa de madeira | home_office | 2, 6, 7, 10, 13 |
| cadeira | Cadeira giratória | K.m3d('cadeira_giratoria') | azul | no SEAT | 2, 6, 7, 10 |
| navegador | Barra com mappoa.com | K.painelMappoa | 2,3 m | acima do monitor | 7, 13 |
| busca | "Sua próxima busca: Clínicas de estética em Maringá, PR" | K.painelMappoa('busca') | 1,5 m | sobe do monitor | 7 |
| lista | "72 leads · 44 com site · 28 sem site" com os cartões e os chips | K.painelMappoa('lista') | 1,6 m em pé | central_mappoa | 8 |
| tela | Análise da Clínica Bella Pele (nota 87/100, dores: "sem site, agenda só pelo WhatsApp") e a mensagem pronta | K.painelMappoa('analise' → 'mensagem') | 1,5 m | mundo_mappoa (9) e acima do monitor (10) | 9, 10 |
| robo | Robô do Mappoa | K.roboMappoa | — | central, palco e quarto | 8, 9, 13 |
| celular | Celular dele com as 20 mensagens | K.m3d('celular') | escala 0,6 | na mão dele | 11 |
| dona | Dona da Clínica Bella Pele | personagem `dentista` | jaleco branco | na recepção da clínica | 11, 12 |

### Teste dos substantivos

web designer (etiqueta, 1) · aprender a fazer site (o diploma "Curso de site ✓" na mesinha, 1) · "isso" (a caneta
escrevendo e a planilha rolando, 1) · Mateus (2) · Google Maps (celular com os pinos, 2) · empresa por empresa (cada
pino vira uma linha, 2) · nome, telefone, site (as colunas, 3) · três dias (calendário, 3) · planilha, quarteirão (a
planilha enrolando a rua, 3) · metade tem site (✓ laranja, 4) · telefone / não atende (a recepcionista deixando tocar,
4) · procurar na mão (a mão dele com a caneta, 5) · uma por uma (as linhas acendendo devagar, 5) · investir,
hambúrguer (6) · ferramenta (moeda no teclado, 6) · computador, mappoa.com (7) · clínicas de estética em Maringá (7) ·
em segundos (o cronômetro "2 s" do lado da lista, 8) · lista, 72, 28 sem site, contatos (8) · Mappoa, sistema (9) ·
quem precisa (score, 9) · clínica, nota, oferta, mensagem pronta (10) · vinte (contador, 11) · "disseram não" (✗
cinzas, 11) · topou, primeiro site vendido (aperto de mão, ✓, dinheiro, 11) · Antes / Agora / três dias / busca (12) ·
dias / número (calendário, 13) · computador, mappoa.com, clínicas sem site (13).

### 1. gancho: "Web designer, acabou de aprender a fazer site? Então não faça isso."
- NA TELA: a rua entre prédios de dia; o Mateus sentado numa mesinha escolar no meio do calçadão, escrevendo rápido com
  uma caneta azul gigante; a planilha de papel saindo da mesinha e rolando pela calçada, enrolando um poste, passando
  embaixo de um carro estacionado e sumindo na esquina; em cima da mesinha um diploma "Curso de site ✓"
- MOSTRA: personagem, planilha, mesinha
- CENÁRIO: rua_predios de dia, gente pulando a planilha na calçada, um carro freando em cima dela
- ENTRA AGORA: a planilha já está rolando no 1º quadro; o diploma brilha em "aprender"; o ✗ vermelho carimba a planilha
  em "isso"
- OBJETOS SE MEXENDO: a planilha se desenrolando sem parar pela rua; um pedestre tropeça nela em "site"
- PERSONAGEM: sentado · começo: escrevendo muito rápido, com a língua de fora · em "isso": para, olha pra câmera e
  levanta a caneta, sem entender
- INTERAÇÃO: a caneta dele escreve e a planilha cresce
- CÂMERA: 4 cortes de ~0,7 s: (1) aberto, alto, a rua inteira com a planilha enrolando tudo e ele pequeno na mesinha ·
  (2) passando, baixo, seguindo a planilha por baixo do carro · (3) médio, esquerda, ele escrevendo e o diploma · (4)
  perto, de frente, ele parando com a caneta no ar em "isso"
- EFEITOS VISUAIS: "Web designer" (azul) em "designer" · "Não faça isso" (vermelho) em "não faça" · o ✗ em "isso"
- SONS: caneta riscando rápido · papel desenrolando · buzina do carro · carimbo em "isso"

### 2. maps: "O Mateus abriu o Google Maps e começou a anotar empresa por empresa."
- NA TELA: o quarto (home_office) de dia; ele com o celular do Maps cheio de pinos; cada pino sai voando do celular e
  vira uma linha escrita na planilha de papel no colo dele
- MOSTRA: personagem, maps, planilha
- CENÁRIO: home_office de dia
- ENTRA AGORA: o celular acende em "Maps"; um pino por vez em "empresa", "por", "empresa"
- OBJETOS SE MEXENDO: os pinos voando em arco do celular até a planilha; a planilha caindo da mesa até o chão
- PERSONAGEM: sentado · começo: abre o celular empolgado · em "empresa": escreve copiando, olhando celular e papel
- INTERAÇÃO: ele copia do celular pro papel
- CÂMERA: (1) chegando, médio, direita (até ~30°), ele, o celular e a planilha · (2) parado, perto, de cima do ombro, os
  pinos virando linhas
- EFEITOS VISUAIS: "Google Maps" (azul) em "Maps" · "Uma por uma" (laranja) em "empresa"
- SONS: whoosh · estalo a cada pino · caneta

### 3. planilha: "Nome, telefone, se tem site... Três dias, e a planilha já dá a volta no quarteirão."
- NA TELA: de volta à rua; o topo da planilha com as colunas "NOME · TELEFONE · TEM SITE?"; o calendário arrancando
  folhas SEG → TER → QUA acima da mesinha; a planilha dando a volta inteira no quarteirão e voltando por trás dele
- MOSTRA: personagem, planilha, calendario
- CENÁRIO: rua_predios, a luz mudando de manhã pra tarde e de novo pra manhã
- ENTRA AGORA: cada coluna em "Nome", "telefone", "site"; as folhas do calendário em "Três dias"; a ponta da planilha
  chega por trás dele em "quarteirão"
- OBJETOS SE MEXENDO: as folhas do calendário voando; a planilha correndo pela rua
- PERSONAGEM: começo: escrevendo, com olheiras crescendo · em "quarteirão": sente o papel bater nas costas e olha pra trás
- INTERAÇÃO: a ponta da planilha cutuca as costas dele
- CÂMERA: (1) chegando, perto, de frente, as colunas e a caneta · (2) subindo, aberto, alto, a planilha dando a volta
- EFEITOS VISUAIS: "3 dias" (vermelho) em "Três" · "Volta no quarteirão" (laranja) em "quarteirão"
- SONS: folhas de calendário · papel · tique-taque

### 4. falha: "Mas metade já tem site. E a outra metade nem atende o telefone." (jogo: falha)
- NA TELA: as linhas da planilha recebendo ✓ laranja "já tem site" uma atrás da outra; depois, numa janela de prédio, a
  recepcionista lixando a unha com o telefone tocando do lado, sem atender; os ✗ "não atende" pipocando nas linhas
- MOSTRA: planilha, marcas, telefone, personagem
- CENÁRIO: rua_predios
- ENTRA AGORA: os ✓ laranja em "metade"; a janela em "outra"; os ✗ em "atende"
- OBJETOS SE MEXENDO: o telefone pulando de tanto tocar; as marcas pipocando em fila
- PERSONAGEM: começo: com o celular no ouvido, esperando · em "telefone": joga a cabeça na mesinha
- INTERAÇÃO: ele liga e o telefone da recepcionista toca; ela ignora
- CÂMERA: (1) passando, médio, esquerda, as linhas com os ✓ · (2) K.mirar fixo da calçada oposta, a janela e ele lá
  embaixo
- EFEITOS VISUAIS: "Já tem site" (laranja) em "metade" · "Não atende" (vermelho) em "atende"
- SONS: tlin a cada ✓ · telefone tocando · errado · baque da cabeça

### 5. virada: "O problema não é procurar. É procurar na mão, uma por uma."
- NA TELA: ele se levanta com uma tesoura gigante; em "na mão", a mão dele com a caneta aparece grande e cansada,
  tremendo; em "uma por uma" ele corta a planilha e ela cai no chão em pedaços
- MOSTRA: personagem, tesoura, planilha
- CENÁRIO: rua_predios
- ENTRA AGORA: a tesoura em "procurar" (o 2º); o corte em "uma"
- OBJETOS SE MEXENDO: os pedaços da planilha voando com o vento
- PERSONAGEM: começo: olha a planilha infinita, sério · em "uma por uma": corta com força
- INTERAÇÃO: ele corta a planilha com a tesoura
- CÂMERA: (1) chegando, médio, de frente e de baixo, ele levantando a tesoura · (2) passando, médio, direita, o corte
- EFEITOS VISUAIS: "Na mão" (vermelho) em "mão" · "Uma por uma" (laranja) em "uma"
- SONS: zum · tesourada · papel voando

### 6. investe: "Aí ele decidiu investir o preço de um hambúrguer numa ferramenta que procura por ele." (jogo: corrige)
- NA TELA: o quarto de dia; ele de pé com um hambúrguer na mão com a plaquinha "1 HAMBÚRGUER"; o hambúrguer vira moeda e
  cai no teclado; o monitor acende com uma lupa girando sozinha em cima do mapa
- MOSTRA: personagem, hamburguer, monitor
- CENÁRIO: home_office de dia
- ENTRA AGORA: o hambúrguer em "investir"; o poof e a moeda em "ferramenta"; a lupa em "procura"
- OBJETOS SE MEXENDO: a moeda em arco até o teclado; a lupa varrendo o mapa sozinha
- PERSONAGEM: começo: dá uma última olhada no hambúrguer · em "hambúrguer": faz que sim, decidido
- INTERAÇÃO: ele paga com o hambúrguer (a moeda cai no computador)
- CÂMERA: (1) chegando, médio, esquerda, ele com o hambúrguer · (2) subindo, médio, de frente, o monitor com a lupa
- EFEITOS VISUAIS: "Investir" (azul) em "investir" · "Procura por você" (verde) em "procura"
- SONS: poof · pingo da moeda · brilho

### 7. busca: "No computador, digita mappoa.com e escreve: clínicas de estética em Maringá."
- NA TELA: a barra do navegador grande acima do monitor com mappoa.com sendo digitado; a tela "Sua próxima busca" sobe
  do monitor com "Clínicas de estética" e "Maringá, PR" sendo escritos e o botão em degradê "Buscar"
- MOSTRA: navegador, busca, personagem
- CENÁRIO: home_office de dia
- ENTRA AGORA: a barra em "computador", as letras em "digita"; a busca sobe em "escreve"; as letras de "clínicas" e
  "Maringá"; o botão brilha no fim
- OBJETOS SE MEXENDO: a tela da busca sobe crescendo do monitor
- PERSONAGEM: sentado digitando · no fim: aperta o botão com o dedo
- INTERAÇÃO: digita o endereço e a busca
- CÂMERA: (1) de trás do monitor (a câmera do tres-da-manha), a barra e o rosto dele · (2) parado, médio, de frente e um
  pouco de baixo, a busca inteira
- EFEITOS VISUAIS: nenhum além da tela
- SONS: cliques do teclado · clique do botão

### 8. lista: "Em segundos vem a lista: setenta e duas clínicas, vinte e oito sem site, já com os contatos."
- NA TELA: a central do Mappoa, o mapa gigante de Maringá na parede; um cronômetro pequeno marcando "2 s"; a lista em pé
  enchendo de cartões; o contador 0 → 72; "44 com site · 28 sem site" com o grupo SEM SITE destacado; os chips de
  WhatsApp, telefone e e-mail; o Mateus e o robô do lado, ele segurando um pedacinho da planilha velha
- MOSTRA: lista, robo, personagem
- CENÁRIO: central_mappoa
- ENTRA AGORA: o cronômetro em "segundos"; a lista cai em "lista"; o contador em "setenta"; o grupo SEM SITE em "vinte";
  os chips em "contatos"
- OBJETOS SE MEXENDO: os cartões descendo; o pedacinho de planilha cai da mão dele
- PERSONAGEM: começo: olha o cronômetro e a lista, de boca aberta · em "contatos": solta o papel e comemora
- INTERAÇÃO: o robô aponta o grupo SEM SITE e o Mateus aponta junto
- CÂMERA: (1) revelando, aberto, de frente e de baixo, a lista e o mapa · (2) chegando, médio, esquerda, os chips
- EFEITOS VISUAIS: "Em segundos" (azul) em "segundos" · "72 clínicas" (azul) · "28 sem site" (verde) em "vinte"
- SONS: brilho · bips · ding em "vinte"

### 9. mappoa: "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."
- NA TELA: o palco da marca, o logo gigante; o Mateus e o robô dos lados; a tela da análise cai na frente com o score
  enchendo até 87/100
- MOSTRA: tela, robo, personagem
- CENÁRIO: mundo_mappoa
- ENTRA AGORA: o rótulo "Mappoa" em "Mappoa"; a tela em "sistema"; o score de "precisa" a "serviço"
- OBJETOS SE MEXENDO: o robô acena; os pinos giram no fundo
- PERSONAGEM: começo: aponta o logo · em "serviço": comemora com o punho
- INTERAÇÃO: o Mateus e o robô batem as mãos
- CÂMERA: (1) chegando, médio, de frente e de baixo, o logo e os dois · (2) passando, médio, esquerda, a tela com o score
- EFEITOS VISUAIS: o rótulo "Mappoa" · "Quem precisa de você" (verde) em "precisa"
- SONS: brilho · ding · certo

### 10. analise: "Ele abre uma clínica e já vê a nota pra oferta dele e a mensagem pronta."
- NA TELA: o quarto; acima do monitor, a tela da Clínica Bella Pele: "Dados da empresa", a nota 87/100 grande, "Dores
  prováveis: sem site, agenda só pelo WhatsApp"; depois a tela vira a mensagem pronta do WhatsApp com o botão verde
- MOSTRA: tela, personagem, monitor
- CENÁRIO: home_office de dia
- ENTRA AGORA: a tela sobe em "abre"; o 87/100 em "nota"; a mensagem em "mensagem"
- OBJETOS SE MEXENDO: o score girando até 87; as linhas da mensagem se escrevendo
- PERSONAGEM: sentado · começo: clica · em "pronta": vira pra câmera e aponta a tela
- INTERAÇÃO: ele clica na clínica e a tela troca
- CÂMERA: (1) chegando, médio, direita com ângulo pequeno, de baixo, a tela e ele · (2) parado, perto, de frente, a
  mensagem inteira
- EFEITOS VISUAIS: "Nota 87" (verde) em "nota" · "Mensagem pronta" (azul) em "pronta"
- SONS: clique · ding do score · teclinhas

### 11. venda: "Mandou pra vinte. Quase todas disseram não. Mas uma topou: o primeiro site vendido."
- NA TELA: (1) ele com o celular, o contador "Enviadas 1 → 20" e os ✗ cinzas "não, obrigado" pipocando; (2) a clínica de
  estética: a dona de jaleco na recepção aperta a mão do Mateus; atrás, a maca e as plantas; o ✓ e a chuva de dinheiro
- MOSTRA: personagem, celular, dona
- CENÁRIO: home_office → clinica_odonto como clínica de estética
- ENTRA AGORA: o contador em "vinte"; os ✗ em "não"; a clínica em "Mas"; o ✓ e o aperto em "topou"; o dinheiro em
  "vendido"
- OBJETOS SE MEXENDO: os ✗ pipocando e sumindo; as notas caindo
- PERSONAGEM: o Mateus · começo: manda mensagem · em "não": ombros caídos · em "vendido": pulinhos; a dona · em
  "topou": sorri e estende a mão
- INTERAÇÃO: o aperto de mão
- CÂMERA: (1) passando, médio, direita, ele e os ✗ · (2) chegando, médio, de frente, altura do olho, o aperto de mão
- EFEITOS VISUAIS: "Não, obrigado" (cinza) em "não" · "1º site vendido!" (verde) em "vendido"
- SONS: whoosh · errado baixinho · ding · festa

### 12. antes_agora: "Antes, três dias de planilha. Agora, uma busca e ele já tá abordando." (jogo: avança)
- NA TELA: (1) Antes: a rua, a mesinha e a planilha infinita picada no chão, o calendário arrancando folhas; (2) Agora: a
  clínica, ele entrando com o notebook, a dona acenando, o ✓ "Fechou"
- MOSTRA: personagem, planilha, dona
- CENÁRIO: rua_predios → clinica_odonto
- ENTRA AGORA: a clínica em "Agora"; o ✓ em "abordando"
- OBJETOS SE MEXENDO: (Antes) os pedaços de papel voando; (Agora) as linhas de velocidade
- PERSONAGEM: Antes: sentado na mesinha, olheiras · Agora: anda rápido, feliz, e acena pra dona
- INTERAÇÃO: Antes, sozinho com a planilha; Agora, chegando na dona da clínica
- CÂMERA: (1) afastando, médio, esquerda, a rua com a planilha · (2) K.heroi, de baixo pra cima (altura "olho" no teto
  da clínica), ele chegando
- EFEITOS VISUAIS: "Antes" (vermelho) · "Agora" (verde) · "Fechou" (verde) em "abordando"
- SONS: papel · whoosh · passos · certo

### 13. segue: "Quantos dias você já perdeu montando planilha? Comenta o número. No computador, digita mappoa.com e acha as clínicas sem site da sua cidade."
- NA TELA: ele de pé no quarto; a pergunta no topo com o calendário arrancando folhas do lado; depois a barra com
  mappoa.com, a lista "sem site" pequena embaixo, o robô acenando e o cartão de seguir
- MOSTRA: personagem, navegador, monitor
- CENÁRIO: home_office de dia
- ENTRA AGORA: a pergunta em "dias"; o calendário em "número"; a barra em "computador"; as letras em "digita"; a lista em
  "sem site"
- OBJETOS SE MEXENDO: o robô acena; o botão Seguir é apertado
- PERSONAGEM: começo: aponta pra câmera · em "número": conta nos dedos · em "digita": digitando
- INTERAÇÃO: ele digita o endereço
- CÂMERA: (1) chegando, médio, de frente · (2) parado, aberto, de frente, topo livre pro cartão
- EFEITOS VISUAIS: "Quantos dias de planilha? Comenta o número" · o cartão de seguir
- SONS: estalo · cliques · ding · clique do Seguir
