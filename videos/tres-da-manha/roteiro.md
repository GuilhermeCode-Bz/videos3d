# Web designer, três da manhã: roteiro e ficha de cena

> Ideia escolhida pelo dono (14/11/2026): a dor é a DIFICULDADE DE ACHAR cliente, não a espera. O Felipe, web designer,
> passa a noite caçando cliente no Google Maps, aba por aba, e às 3 da manhã a planilha tem 2 linhas. Primeiro vídeo da
> regra nova: 50 a 55 s e o Mappoa APRESENTADO (uns 18 s: investir, mappoa.com no computador, a busca, a lista separada,
> o nome, uma empresa aberta com a nota e a mensagem pronta). Nicho: oficinas mecânicas de Londrina.

## Roteiro

1. Web designer, três da manhã. E a planilha ainda tem duas linhas. *(gancho)*
2. O Felipe passou a noite caçando cliente no Google Maps, oficina por oficina.
3. Abre o site: já tem. Abre outra: não acha o telefone.
4. Fuça o Instagram, procura o WhatsApp, copia na planilha. E começa de novo.
5. Seis horas depois: duas oficinas. E nem sabe se elas precisam de site.
6. Aí ele decidiu investir o preço de um pastel numa ferramenta de achar cliente.
7. No computador, digita mappoa.com e escreve: oficinas em Londrina.
8. E vem a lista: noventa e nove oficinas, quarenta sem site, já com os contatos.
9. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
10. Ele abre uma oficina e já vê a nota pra oferta dele e a mensagem pronta.
11. Mandou pra vinte. A maioria nem respondeu. Mas uma topou: a primeira venda.
12. Antes, a noite inteira pra achar duas. Agora, uma busca e ele vai atrás.
13. E você, até que horas já ficou trabalhando? Comenta a hora. No computador, digita mappoa.com e acha as empresas sem site da sua cidade.

Cerca de 170 palavras, uns 54 s com o cartão de seguir (uns 960 caracteres da ElevenLabs; sobram 7.644).

**Gancho escolhido:** A. Opções:
- **A:** "Web designer, três da manhã. E a planilha ainda tem duas linhas." (o Felipe com olheiras até o chão, as canecas
  de café empilhadas até o teto, o relógio 03:00 e a planilha gigante com só 2 linhas)
- **B:** "Web designer, se você procura cliente assim, vai ficar assim." (mesma imagem; mas é a frase da barba, e repetir
  a frase cansou)
- **C:** "Web designer, quanto tempo você perdeu procurando cliente hoje?" (mais fraco: pergunta sem imagem absurda)

**Capa:** "*3 da manhã* e nada?" (19 letras), o Felipe com as olheiras até o chão, a torre de canecas e a planilha com 2
linhas.

## O que foi conferido

- A dor é procurar e não achar (abrir site, caçar telefone, fuçar Instagram, copiar na planilha), como o dono pediu
- Não é de graça: "decidiu investir o preço de um pastel" (sem valor e sem "grátis")
- O mappoa.com digitado "no computador" já na entrada (7) e no fim (13)
- O Mappoa mostrado: a busca (7), a lista com o número e separada com/sem site (8), o nome numa frase só (9), uma
  empresa aberta com a nota (score de aderência) e a mensagem pronta (10). "Já com os contatos", nunca "o WhatsApp de
  todas" (nem todo lead tem tudo)
- Quem manda a mensagem é o Felipe (11); o Mappoa só prepara. Sem prometer venda: "a maioria nem respondeu"
- Os números (2 linhas, 6 horas, 99 oficinas, 40 sem site, nota 88, 20 mensagens) são da história, não estatística
- Sem "Esse é o Felipe": ele entra já dentro da ação
- O pedido do fim é pergunta pessoal e fácil de responder com a hora (o dono pediu, 14/11/2026; como o "comenta a sua cidade", que deu 31 comentários), sem prometer responder; o "segue" fica só no cartão; a assinatura
  diz o que a pessoa acha ("as empresas sem site da sua cidade")
- Empresas inventadas: Auto Center Tarumã (a aberta na 10 e a que topa na 11), Mecânica Bom Motor, Oficina do Zé
  Londrina e as outras da lista

## Ficha de cena

**Cenários (cinco, com `K.cenarios`):** `home_office` de noite (1 a 7, a 10 e o "Antes" da 12, 13) · `cidade_maquete`
de noite (2, o Felipe gigante procurando com a lanterna) · `central_mappoa` (8) · `mundo_mappoa` (9) · `oficina` (11 e o
"Agora" da 12).
**Personagens:** o do canal, chamado Felipe, em todas · o dono da Auto Center Tarumã (`K.personagem('operario')`,
macacão azul) na 11 · o robô do Mappoa na 8, 9 e 13.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| olheiras | Olheiras roxas escorrendo até o chão | 2 tubos (TubeGeometry) do olho até o chão, afinando | roxo escuro | no rosto dele | 1, 5, 12 |
| canecas | Torre de canecas de café até o teto | 14 cilindros com alça, empilhados tortos | brancas e marrons | ao lado do monitor | 1, 5, 12 |
| relogio | Relógio digital 03:00 | plano desenhado, números vermelhos | 0,5 m | parede, acima do monitor | 1, 5 |
| planilha | Planilha gigante com 2 linhas preenchidas e o resto vazio | K.painelMappoa('planilha') ou plano desenhado | 1,6 x 2,2 m, branca | flutuando ao lado da mesa | 1, 4, 5, 12 |
| monitor | Computador com mesa | K.computador | mesa de madeira | meio do quarto | 1 a 7, 10, 13 |
| cadeira | Cadeira giratória | K.m3d('cadeira_giratoria') | azul | no SEAT | 1 a 7, 10 |
| abas | Abas do navegador pipocando (Maps, site, Instagram) | planos desenhados, empilhando | 0,6 x 0,4 m cada | em volta do monitor | 3, 4 |
| lanterna | Lanterna na mão do Felipe gigante | K.m3d ou cilindro + luz amarela | — | na mão dele | 2 |
| nota | A nota "1 PASTEL" | plano desenhado | 0,42 m, verde | na mão dele | 6 |
| navegador | Barra com mappoa.com | K.painelMappoa | 2,3 m | acima do monitor | 7, 13 |
| busca | A tela "Sua próxima busca: Oficinas em Londrina, PR" | K.painelMappoa('busca') | 1,5 m | sobe do monitor | 7 |
| lista | "99 leads · 59 com site · 40 sem site" com os cartões e os chips de contato | K.painelMappoa('lista') | 1,6 m em pé | central_mappoa, no mapa | 8 |
| tela | A análise da Auto Center Tarumã (nota 88/100, dores) e a mensagem pronta | K.painelMappoa('analise' → 'mensagem') | 1,5 m | mundo_mappoa (9) e acima do monitor (10) | 9, 10 |
| robo | Robô do Mappoa | K.roboMappoa | — | central, palco e quarto | 8, 9, 13 |
| celular | Celular com as 20 mensagens e o "Topo!" | K.m3d('celular') | 0,6 de escala | na mão dele | 11 |
| dono | Dono da Auto Center Tarumã | K.personagem('operario') | macacão azul | na frente do elevador de carro | 11 |
| carro | Carro no elevador da oficina | peça do cenário oficina | — | fundo | 11, 12 |

### Teste dos substantivos

web designer (etiqueta, 1) · três da manhã (relógio 03:00, 1) · planilha e duas linhas (planilha gigante, 1) · Felipe
(2) · noite (cidade de noite, 2) · Google Maps (os pinos da cidade_maquete, 2) · oficina por oficina (a lanterna
apontando uma oficina de cada vez, 2) · site e telefone (abas: o site com ✓ "já tem", a aba do telefone com "?", 3) ·
Instagram, WhatsApp, planilha (abas e a linha copiada, 4) · seis horas (relógio 21:00 → 03:00, 5) · duas oficinas (as 2
linhas, 5) · "precisam de site?" (o "?" gigante, 5) · investir, pastel (nota "1 PASTEL", 6) · ferramenta (moeda caindo
no teclado, 6) · computador e mappoa.com (barra, 7) · oficinas em Londrina (a busca, 7) · lista, 99, 40 sem site,
contatos (a lista e os chips, 8) · Mappoa, sistema (logo e rótulo, 9) · serviço / quem precisa (o score enchendo, 9) ·
uma oficina, nota, oferta, mensagem pronta (a análise 88/100 e a mensagem, 10) · vinte mensagens (contador, 11) · "não
respondeu" (✗ cinzas, 11) · topou, primeira venda (aperto de mão, ✓, dinheiro, 11) · Antes / Agora / busca (quarto x
oficina, 12) · horas (relógio, 13) · computador, mappoa.com, empresas sem site (13).

### 1. gancho: "Web designer, três da manhã. E a planilha ainda tem duas linhas."
- NA TELA: o quarto de noite, só a luz azul do monitor; o Felipe sentado com olheiras roxas escorrendo até o chão; a
  torre de canecas de café até o teto, torta, do lado do monitor; o relógio 03:00 piscando na parede; a planilha gigante
  flutuando, com 2 linhas preenchidas e o resto vazio
- MOSTRA: personagem, olheiras, canecas, planilha
- CENÁRIO: home_office de noite, a janela escura com a lua
- ENTRA AGORA: o relógio pisca 03:00 em "três"; a planilha desce do alto em "planilha"; as 2 linhas se acendem em "duas"
- OBJETOS SE MEXENDO: a torre de canecas balança e uma caneca cai lá de cima em "manhã" (quica no chão); as olheiras
  pingam e escorrem mais um pouco
- PERSONAGEM: sentado · começo: cabeça caindo de sono, acorda num susto · em "duas": olha a planilha e põe a mão na testa
- INTERAÇÃO: ele esfrega os olhos e as olheiras escorrem; olha a planilha vazia
- CÂMERA: 4 cortes de ~0,7 s: (1) aberto, de frente e de baixo, o quarto inteiro com a torre de canecas até o teto e ele
  pequeno; (2) o relógio 03:00 de perto; (3) perto, esquerda, no rosto com as olheiras até o chão; (4) médio, direita,
  ele e a planilha com as 2 linhas
- EFEITOS VISUAIS: "Web designer" (azul) em "designer" · "2 linhas" (vermelho) em "duas"
- SONS: tique-taque · baque da caneca caindo · errado de leve em "duas"

### 2. caca: "O Felipe passou a noite caçando cliente no Google Maps, oficina por oficina."
- NA TELA: a cidade em maquete de noite; o Felipe gigante (escala 2,4), de olheiras, andando entre os prédios com uma
  lanterna; o facho amarelo para em uma oficina de cada vez e acende um pino
- MOSTRA: personagem, lanterna
- CENÁRIO: cidade_maquete de noite, os carrinhos passando
- ENTRA AGORA: um pino acende em "Maps"; um pino por vez em "oficina", "por", "oficina"
- OBJETOS SE MEXENDO: o facho da lanterna varre a cidade da esquerda pra direita
- PERSONAGEM: gigante, curvado, procurando · começo: aponta a lanterna · em "oficina": agacha e espia uma oficina
- INTERAÇÃO: o facho da lanterna em cada oficina
- CÂMERA: (1) alto, chegando, médio, de frente, ele gigante e a cidade · (2) passando, perto, direita, o facho e um pino
- EFEITOS VISUAIS: "Google Maps" (azul) em "Maps"
- SONS: whoosh · estalo a cada pino

### 3. abas: "Abre o site: já tem. Abre outra: não acha o telefone."
- NA TELA: o quarto; ele sentado; as abas pipocando em volta do monitor: o site de uma oficina com ✓ "já tem site"; outra
  aba com o ícone de telefone e um "?" vermelho
- MOSTRA: personagem, abas, monitor
- CENÁRIO: o quarto de noite
- ENTRA AGORA: a 1ª aba em "site"; o ✓ em "tem"; a 2ª aba em "outra"; o "?" em "telefone"
- OBJETOS SE MEXENDO: as abas saltam do monitor e ficam flutuando
- PERSONAGEM: digitando · em "tem": bufa e fecha a aba com um tapa · em "telefone": coça a cabeça
- INTERAÇÃO: ele dá um tapa na aba e ela some num poof
- CÂMERA: (1) chegando, perto, por cima do ombro, o monitor e a 1ª aba · (2) passando, médio, de frente, ele e as 2 abas
- EFEITOS VISUAIS: "Já tem site" (laranja) em "tem" · "Cadê o telefone?" (vermelho) em "telefone"
- SONS: clique · poof · pingo

### 4. fuca: "Fuça o Instagram, procura o WhatsApp, copia na planilha. E começa de novo."
- NA TELA: mais abas empilhando (Instagram rosa, WhatsApp verde) até virar uma montanha em volta dele; uma linha voando
  da aba pra planilha gigante; em "de novo" as abas todas se fecham de uma vez e voltam a pipocar
- MOSTRA: personagem, abas, planilha
- CENÁRIO: o quarto de noite
- ENTRA AGORA: a aba do Instagram em "Instagram", a do WhatsApp em "WhatsApp"; a linha voa em "copia"
- OBJETOS SE MEXENDO: as abas giram em volta dele como um redemoinho em "começa"
- PERSONAGEM: digitando rápido · em "copia": arrasta com a mão a linha pra planilha · em "novo": cai a cabeça na mesa
- INTERAÇÃO: ele puxa a linha no ar até a planilha
- CÂMERA: (1) girando, médio, esquerda, o redemoinho de abas · (2) subindo, médio, de frente e de baixo, ele e a planilha
- EFEITOS VISUAIS: "De novo..." (cinza) em "novo"
- SONS: teclado rápido · whoosh · baque da cabeça na mesa

### 5. duas: "Seis horas depois: duas oficinas. E nem sabe se elas precisam de site." (jogo: falha)
- NA TELA: o relógio correndo 21:00 → 03:00; a torre de canecas cresce mais; as olheiras chegam no chão e fazem poça;
  a planilha com as 2 linhas; um "?" gigante em cima das 2 linhas
- MOSTRA: personagem, relogio, planilha, canecas
- CENÁRIO: o quarto de noite
- ENTRA AGORA: as canecas empilham uma por vez de "Seis" a "depois"; o "?" cai em "sabe"
- OBJETOS SE MEXENDO: os números do relógio correndo
- PERSONAGEM: começo: olha o relógio, desesperado · em "site": encolhe os ombros
- INTERAÇÃO: ele aponta as 2 linhas da planilha
- CÂMERA: (1) afastando, médio, direita, o relógio e a torre · (2) chegando, perto, de frente, ele e o "?"
- EFEITOS VISUAIS: "6 horas" (vermelho) em "Seis" · "Precisam?" (laranja) em "site"
- SONS: tique-taque rápido · tlin de caneca a cada uma · errado em "site"

### 6. investe: "Aí ele decidiu investir o preço de um pastel numa ferramenta de achar cliente." (jogo: corrige)
- NA TELA: ele de pé, bate na mesa; a torre de canecas desaba atrás dele; a nota "1 PASTEL" na mão vira moeda e cai no
  teclado; o mapa com pinos acende no monitor
- MOSTRA: personagem, nota, monitor
- CENÁRIO: o quarto de noite
- ENTRA AGORA: a nota em "investir"; o poof e a moeda em "ferramenta"; os pinos em "cliente"
- OBJETOS SE MEXENDO: as canecas caindo; a moeda em arco até o teclado
- PERSONAGEM: começo: bate na mesa e levanta · em "pastel": faz que sim, decidido
- INTERAÇÃO: ele paga com a nota (a moeda cai no computador)
- CÂMERA: (1) chegando, médio, esquerda, ele com a nota e as canecas caindo · (2) subindo, médio, de frente, o monitor
- EFEITOS VISUAIS: "Investir" (azul) em "investir"
- SONS: baque · canecas tilintando · pingo da moeda · estalos dos pinos

### 7. busca: "No computador, digita mappoa.com e escreve: oficinas em Londrina."
- NA TELA: a barra do navegador grande acima do monitor com mappoa.com sendo digitado; a tela "Sua próxima busca" sobe
  do monitor com "Oficinas mecânicas" e "Londrina, PR" sendo escritos e o botão em degradê "Buscar"
- MOSTRA: navegador, busca, personagem
- CENÁRIO: o quarto de noite
- ENTRA AGORA: a barra em "computador", as letras em "digita"; a busca sobe em "escreve"; as letras de "oficinas" e
  "Londrina"; o botão brilha no fim
- OBJETOS SE MEXENDO: a tela da busca sobe crescendo do monitor
- PERSONAGEM: sentado digitando · no fim: aperta o botão com o dedo
- INTERAÇÃO: digita o endereço e a busca
- CÂMERA: (1) chegando, perto, por cima do ombro, a barra · (2) parado, médio, de frente e um pouco de baixo, a busca inteira
- EFEITOS VISUAIS: nenhum além da tela (a barra é o destaque)
- SONS: cliques do teclado · clique do botão

### 8. lista: "E vem a lista: noventa e nove oficinas, quarenta sem site, já com os contatos."
- NA TELA: a central do Mappoa, o mapa gigante de Londrina na parede; a lista grande em pé na frente do mapa enchendo
  de cartões; o contador 0 → 99; a separação "59 com site · 40 sem site" com o grupo SEM SITE destacado; os chips de
  WhatsApp, telefone e e-mail aparecendo nos cartões; o Felipe e o robô do lado
- MOSTRA: lista, robo, personagem
- CENÁRIO: central_mappoa, os robôs trabalhando nas mesas
- ENTRA AGORA: a lista cai do alto em "lista"; o contador corre em "noventa e nove"; o grupo SEM SITE acende em
  "quarenta"; os chips pipocam em "contatos"
- OBJETOS SE MEXENDO: os cartões descendo um a um; o robô aponta o grupo SEM SITE
- PERSONAGEM: começo: olha pra cima de boca aberta · em "contatos": comemora
- INTERAÇÃO: o robô e o Felipe apontam juntos o grupo SEM SITE
- CÂMERA: (1) revelando, aberto, de frente e de baixo, a lista inteira e o mapa · (2) chegando, médio, esquerda, os chips
- EFEITOS VISUAIS: "99 oficinas" (azul) em "noventa" · "40 sem site" (verde) em "quarenta"
- SONS: brilho · bips a cada cartão · ding em "quarenta"

### 9. mappoa: "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."
- NA TELA: o palco da marca, o logo gigante; o Felipe e o robô dos lados; a tela da análise cai na frente com o score
  enchendo até 88/100
- MOSTRA: tela, robo, personagem
- CENÁRIO: mundo_mappoa, os cartões e pinos flutuando
- ENTRA AGORA: o rótulo "Mappoa" em "Mappoa"; a tela cai em "sistema"; o score enche de "precisa" a "serviço"
- OBJETOS SE MEXENDO: o robô acena; os pinos giram no fundo
- PERSONAGEM: começo: aponta o logo · em "serviço": comemora com o punho
- INTERAÇÃO: o Felipe e o robô batem as mãos
- CÂMERA: (1) chegando, médio, de frente e de baixo, o logo e os dois · (2) passando, médio, esquerda, a tela com o score
- EFEITOS VISUAIS: o rótulo "Mappoa" · "Quem precisa de você" (verde) em "precisa"
- SONS: brilho · ding · certo

### 10. analise: "Ele abre uma oficina e já vê a nota pra oferta dele e a mensagem pronta."
- NA TELA: o quarto de novo, agora com a luz acesa e as olheiras menores; acima do monitor, a tela da Auto Center
  Tarumã: "Dados da empresa", a nota 88/100 grande, "Dores prováveis: sem site, só Instagram"; depois a tela vira a
  mensagem pronta do WhatsApp com o botão verde
- MOSTRA: tela, personagem, monitor
- CENÁRIO: o quarto (a janela clareando, amanhecendo)
- ENTRA AGORA: a tela sobe em "abre"; o 88/100 em "nota"; a tela vira a mensagem em "mensagem"
- OBJETOS SE MEXENDO: o número do score girando até 88; as linhas da mensagem se escrevendo
- PERSONAGEM: sentado · começo: clica · em "pronta": vira pra câmera e aponta a tela
- INTERAÇÃO: ele clica na oficina e a tela troca
- CÂMERA: (1) chegando, médio, direita, de baixo, a tela e ele · (2) parado, perto, de frente, a mensagem inteira
- EFEITOS VISUAIS: "Nota 88" (verde) em "nota" · "Mensagem pronta" (azul) em "pronta"
- SONS: clique · ding do score · teclinhas da mensagem

### 11. venda: "Mandou pra vinte. A maioria nem respondeu. Mas uma topou: a primeira venda."
- NA TELA: (1) ele de pé com o celular, o contador "Enviadas 1 → 20" e os ✗ cinzas "sem resposta" pipocando em volta;
  (2) a oficina: o dono da Auto Center Tarumã de macacão, limpando a mão no pano, aperta a mão do Felipe; o carro no
  elevador atrás; o ✓ e a chuva de dinheiro
- MOSTRA: personagem, celular, dono
- CENÁRIO: o quarto → oficina (o carro no elevador, as ferramentas na parede)
- ENTRA AGORA: o contador em "vinte"; os ✗ em "maioria"; a oficina em "Mas"; o ✓ e o aperto em "topou"; o dinheiro em
  "venda"
- OBJETOS SE MEXENDO: os ✗ pipocando e sumindo; as notas caindo
- PERSONAGEM: o Felipe · começo: manda mensagem no celular · em "respondeu": ombros caídos · em "venda": pulinhos; o
  dono · em "topou": faz que sim e estende a mão
- INTERAÇÃO: o aperto de mão
- CÂMERA: (1) passando, médio, direita, ele e os ✗ · (2) chegando, médio, de frente, o aperto de mão com o carro atrás
- EFEITOS VISUAIS: "Sem resposta" (cinza) em "respondeu" · "Primeira venda!" (verde) em "venda"
- SONS: whoosh das mensagens · errado baixinho · ding · festa

### 12. antes_agora: "Antes, a noite inteira pra achar duas. Agora, uma busca e ele vai atrás." (jogo: avança)
- NA TELA: (1) Antes: o quarto de noite, as olheiras, a torre de canecas, a planilha com 2 linhas; (2) Agora: de dia, ele
  sem olheiras, entrando na oficina com o notebook, o ✓ "Fechou"
- MOSTRA: personagem, planilha
- CENÁRIO: home_office de noite → oficina de dia
- ENTRA AGORA: a oficina em "Agora"; o ✓ em "atrás"
- OBJETOS SE MEXENDO: (Antes) uma caneca caindo; (Agora) as linhas de velocidade
- PERSONAGEM: Antes: cabeça caindo de sono · Agora: anda rápido, feliz, e acena pro dono
- INTERAÇÃO: Antes, sozinho com a planilha; Agora, chegando no dono da oficina
- CÂMERA: (1) afastando, médio, esquerda, o quarto · (2) K.heroi, de baixo pra cima, ele chegando
- EFEITOS VISUAIS: "Antes" (vermelho) · "Agora" (verde) · "Fechou" (verde) em "atrás"
- SONS: tique-taque · whoosh · passos · certo

### 13. segue: "E você, até que horas já ficou trabalhando? Comenta a hora. No computador, digita mappoa.com e acha as empresas sem site da sua cidade."
- NA TELA: ele de pé no quarto, de dia; a pergunta no topo; depois a barra com mappoa.com, a lista "sem site" pequena
  aparecendo embaixo, o robô acenando e o cartão de seguir
- MOSTRA: personagem, navegador, monitor
- CENÁRIO: o quarto de dia
- ENTRA AGORA: a pergunta em "horas"; o relógio 03:00 piscando do lado em "hora"; a barra em "computador"; as letras em "digita"; a lista em "sem site"
- OBJETOS SE MEXENDO: o robô acena; o botão Seguir é apertado
- PERSONAGEM: começo: aponta pra câmera · em "hora": aponta o relógio do pulso · em "digita": digitando
- INTERAÇÃO: ele digita o endereço
- CÂMERA: (1) chegando, médio, de frente · (2) parado, aberto, de frente, topo livre pro cartão
- EFEITOS VISUAIS: "Até que horas você trabalha? Comenta a hora" · o cartão de seguir
- SONS: estalo · cliques · ding · clique do Seguir
