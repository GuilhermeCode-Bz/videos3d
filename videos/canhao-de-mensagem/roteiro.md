# Web designer, canhão de mensagem: roteiro e ficha de cena

> Pedido do dono (16/11/2026): testar o gancho novo "apresenta uma situação + então não faça isso", na opção C ("Vai
> mandar mensagem pra uma empresa hoje? Então não faça isso."). O Bruno, web designer, dispara a mesma mensagem pra
> qualquer empresa do Maps com um canhão gigante, e ninguém responde. A virada: o erro não é mandar mensagem, é mandar
> pra quem não precisa de você. Nicho: academias de Joinville. Regra dos 50 a 55 s, com o Mappoa APRESENTADO (~17 s).

## Roteiro

1. Web designer, vai mandar mensagem pra uma empresa hoje? Então não faça isso. *(gancho)*
2. O Bruno manda a mesma mensagem pra qualquer empresa que aparece no Maps.
3. A loja que acabou de fazer site novo? Recebe. O banco? Recebe também.
4. Cem mensagens no dia. Visualizou, não respondeu. Bloqueou.
5. O erro não é mandar mensagem. É mandar pra quem nem precisa de você.
6. Aí ele decidiu investir o preço de um açaí numa ferramenta que mostra quem precisa.
7. No computador, digita mappoa.com e escreve: academias em Joinville.
8. E vem a lista: oitenta e sete academias, trinta e uma sem site, já com os contatos.
9. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
10. Ele abre uma academia: nota noventa pra oferta dele e a mensagem pronta, falando dela.
11. Mandou pra quinze, não pra cem. A maioria não respondeu. Mas uma topou: a primeira venda.
12. Antes, cem mensagens pro nada. Agora, menos mensagem, e pra quem precisa.
13. Quantas mensagens você já mandou sem resposta? Comenta o número. No computador, digita mappoa.com e acha as academias sem site da sua cidade.

Cerca de 165 palavras, uns 52 a 55 s com o cartão de seguir (uns 930 caracteres da ElevenLabs).

**Gancho escolhido:** A. Opções:
- **A:** "Web designer, vai mandar mensagem pra uma empresa hoje? Então não faça isso." (o Bruno em cima de um canhão
  gigante disparando balões de mensagem "Oi, faço sites!" pra cidade inteira, e um balão quica num prédio e volta na
  cara dele. Fala com o web designer e deixa a curiosidade aberta: o que é o "isso"?)
- **B:** "Vai mandar mensagem pra empresa hoje? Então não faça isso." (mesma imagem, mais curta: 10 palavras, ~3 s; perde o
  "Web designer", que chama o nicho)
- **C:** "Mandou cem mensagens e ninguém respondeu? Então não faça isso." (mais fraco: entrega o resultado antes da
  curiosidade)

**Capa:** "*Não faça* isso!" (15 letras), o Bruno no canhão de mensagens com o balão voltando na cara dele.

## O que foi conferido

- Gancho novo: situação ("vai mandar mensagem hoje?") + "então não faça isso", com o "isso" acontecendo na tela no 1º
  quadro (o canhão já disparando). A resposta do "isso" vem na 2 e a virada na 5
- A dor é achar o próximo cliente: ele não sabe quem precisa do serviço, então manda pra qualquer um (aprendizados)
- Imagem absurda da dor no 1º quadro (o canhão de mensagens), nada de preparar a cena; cortes de ~0,7 s no começo
- Sem "Esse é o Bruno": ele entra já dentro da ação (2)
- Não é de graça: "decidiu investir o preço de um açaí" (sem valor e sem "grátis"; pastel, espetinho, torta e cuscuz
  já foram usados)
- O mappoa.com digitado "no computador" na entrada (7) e no fim (13)
- O Mappoa mostrado: a busca (7), a lista com o número e separada com/sem site (8), o nome numa frase só (9), uma
  empresa aberta com a nota (score de aderência) e a mensagem pronta que cita a empresa (10). "Já com os contatos",
  nunca "o WhatsApp de todas"
- Quem manda é o Bruno (11); o Mappoa só prepara a mensagem. Sem prometer venda: "a maioria não respondeu"
- Os números (100 mensagens, 87 academias, 31 sem site, nota 90, 15 mensagens) são da história, não estatística
- O pedido do fim é pergunta pessoal ligada à história e fácil de responder com um número, sem prometer resposta; o
  "segue" fica só no cartão; a assinatura diz o que a pessoa acha ("as academias sem site da sua cidade")
- Empresas inventadas: Academia Força Total (a aberta na 10 e a que topa na 11), Loja Vitrine Nova (a do site novo na
  3), Banco Central da Esquina (o banco da 3) e as outras da lista

## Ficha de cena

**Cenários (cinco, com `K.cenarios`):** `rua_predios` de dia (1 a 5, e o "Antes" da 12) · `home_office` de dia (6, 7,
10, 13) · `central_mappoa` (8) · `mundo_mappoa` (9) · `academia` (11 e o "Agora" da 12).
**Personagens:** o do canal, chamado Bruno, em todas · o dono da Academia Força Total (personagem `personal`, camiseta
de academia e apito) na 11 e 12 · o robô do Mappoa na 8, 9 e 13 · donos de loja na janela/porta na 3 e 4 (bonecos de
fundo).

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| canhao | Canhão gigante de disparar mensagem | cilindro grosso inclinado + 2 rodas + base, com o ícone de balão de conversa pintado | 3 m de cano, verde WhatsApp com rodas pretas | no meio do calçadão, apontado pros prédios | 1, 2, 4, 12 |
| baloes | Balões de mensagem "Oi, faço sites!" voando | planos desenhados (balão branco com bordinha verde e o texto) | 0,7 x 0,45 m cada, ~20 | saem da boca do canhão em arco | 1, 2, 3, 4 |
| balao_volta | O balão que quica no prédio e volta na cara | um dos balões, maior | 0,9 m | do prédio até o rosto dele | 1 |
| loja_nova | Loja com placa "SITE NOVO!" e um notebook brilhando na vitrine | fachada da rua_predios + placa num poste | placa 1,2 m, amarela | lado direito da rua | 3 |
| banco | Banco com cofre e placa "BANCO" | fachada + placa num poste com cifrão | placa 1,2 m, azul-escura | lado esquerdo da rua | 3 |
| contador | Contador "Enviadas 0 → 100" | plano desenhado | 0,8 m, branco com número verde | flutuando acima do canhão | 4 |
| vistos | Os dois tracinhos azuis de visualizado e o ✗ "Bloqueado" | planos desenhados | 0,5 m, azul e vermelho | pipocando em volta dele | 4 |
| celular | Celular dele com a conversa | K.m3d('celular') | escala 0,6 | na mão dele | 4, 11 |
| alvo | Um alvo de dardos com só 3 balões no centro | círculos vermelhos e brancos | 1,6 m | aparece na rua na frente dele | 5 |
| nota | A nota "1 AÇAÍ" (um copo de açaí que vira moeda) | copo roxo + plano desenhado | 0,4 m, roxo | na mão dele | 6 |
| monitor | Computador com mesa | K.computador | mesa de madeira | home_office | 6, 7, 10, 13 |
| cadeira | Cadeira giratória | K.m3d('cadeira_giratoria') | azul | no SEAT | 6, 7, 10 |
| navegador | Barra com mappoa.com | K.painelMappoa | 2,3 m | acima do monitor | 7, 13 |
| busca | A tela "Sua próxima busca: Academias em Joinville, SC" | K.painelMappoa('busca') | 1,5 m | sobe do monitor | 7 |
| lista | "87 leads · 56 com site · 31 sem site" com os cartões e os chips de contato | K.painelMappoa('lista') | 1,6 m em pé | central_mappoa, no mapa | 8 |
| tela | A análise da Academia Força Total (nota 90/100, dores: "sem site, só Instagram") e a mensagem pronta citando "vi que vocês abriram a turma de funcional" | K.painelMappoa('analise' → 'mensagem') | 1,5 m | mundo_mappoa (9) e acima do monitor (10) | 9, 10 |
| robo | Robô do Mappoa | K.roboMappoa | — | central, palco e quarto | 8, 9, 13 |
| dono | Dono da Academia Força Total | personagem `personal` | camiseta de academia, apito | na frente das esteiras | 11, 12 |
| esteira | Esteiras e halteres da academia | peças do cenário academia | — | fundo | 11, 12 |

### Teste dos substantivos

web designer (etiqueta, 1) · mensagem (os balões, 1) · empresa (os prédios, 1) · "isso" (o canhão disparando, 1) ·
Bruno (2) · mesma mensagem (todos os balões iguais "Oi, faço sites!", 2) · qualquer empresa / Maps (os pinos do Maps
nos prédios sendo atingidos um por um, 2) · loja / site novo (a placa "SITE NOVO!", 3) · banco (a fachada do banco, 3)
· cem mensagens (contador 0 → 100, 4) · visualizou (tracinhos azuis, 4) · bloqueou (✗ "Bloqueado", 4) · erro (o ✗
gigante no canhão, 5) · quem precisa (o alvo com os 3 balões no centro, 5) · investir / açaí (o copo "1 AÇAÍ", 6) ·
ferramenta (moeda caindo no teclado, 6) · computador e mappoa.com (barra, 7) · academias em Joinville (a busca, 7) ·
lista, 87, 31 sem site, contatos (a lista e os chips, 8) · Mappoa, sistema (logo e rótulo, 9) · serviço / quem precisa
(o score enchendo, 9) · uma academia, nota 90, oferta, mensagem pronta (a análise 90/100 e a mensagem, 10) · quinze /
cem (contador 15 ao lado do 100 riscado, 11) · "não respondeu" (✗ cinzas, 11) · topou, primeira venda (aperto de mão,
✓, dinheiro, 11) · Antes / Agora (a rua com o canhão x a academia, 12) · número (o "?" com o contador, 13) ·
computador, mappoa.com, academias sem site (13).

### 1. gancho: "Web designer, vai mandar mensagem pra uma empresa hoje? Então não faça isso."
- NA TELA: a rua entre prédios de dia; o Bruno em cima de um canhão gigante verde no meio do calçadão, disparando
  balões de mensagem "Oi, faço sites!" pra todos os prédios; os balões batendo nas fachadas; em "isso", um balão quica
  num prédio e volta direto na cara dele
- MOSTRA: personagem, canhao, baloes
- CENÁRIO: rua_predios de dia, os carros passando, gente na calçada se abaixando dos balões
- ENTRA AGORA: o canhão já está disparando no 1º quadro (nada de preparar); um balão sai a cada ~0,3 s; o balão que
  volta em "isso"
- OBJETOS SE MEXENDO: o canhão dá tranco pra trás a cada disparo; os balões em arco até os prédios; o balao_volta
  quica e acerta o rosto dele em "isso"
- PERSONAGEM: em cima do canhão · começo: girando a manivela com força, rindo · em "isso": leva o balão na cara e cai
  sentado em cima do canhão
- INTERAÇÃO: ele gira a manivela e o canhão dispara; o balão acerta ele
- CÂMERA: 4 cortes de ~0,7 s: (1) aberto, de frente e de baixo, o canhão inteiro disparando e ele em cima · (2) passando,
  médio, seguindo um balão até bater no prédio · (3) médio, esquerda, ele girando a manivela · (4) perto, de frente, o
  balão voltando na cara dele em "isso"
- EFEITOS VISUAIS: "Web designer" (azul) em "designer" · "Não faça isso" (vermelho) em "não faça" · o ✗ vermelho em
  "isso"
- SONS: estouro do canhão a cada disparo · whoosh dos balões · plaft do balão na cara em "isso"

### 2. qualquer: "O Bruno manda a mesma mensagem pra qualquer empresa que aparece no Maps."
- NA TELA: os pinos do Maps vermelhos em cima de todos os prédios da rua; o canhão girando pra mirar um por um; os
  balões todos iguais "Oi, faço sites!" grudando nas fachadas
- MOSTRA: personagem, canhao, baloes
- CENÁRIO: rua_predios de dia
- ENTRA AGORA: os pinos pipocam em "Maps"; os balões grudam um em cada prédio de "mesma" a "empresa"
- OBJETOS SE MEXENDO: o canhão gira de um lado pro outro sem parar de disparar
- PERSONAGEM: começo: volta a subir no canhão esfregando o rosto · em "qualquer": aponta qualquer prédio sem olhar
- INTERAÇÃO: ele vira o canhão com a manivela
- CÂMERA: (1) subindo, aberto, de trás do canhão, a rua inteira com os pinos · (2) chegando, médio, direita, os balões
  iguais grudados lado a lado
- EFEITOS VISUAIS: "A mesma mensagem" (laranja) em "mesma" · "Qualquer empresa" (laranja) em "qualquer"
- SONS: estouros · estalo a cada pino

### 3. errados: "A loja que acabou de fazer site novo? Recebe. O banco? Recebe também."
- NA TELA: (1) a loja com a placa amarela "SITE NOVO!" e o notebook brilhando na vitrine; um balão gruda bem na placa;
  o dono da loja na porta olha e franze a testa; (2) o banco com a placa azul e o cofre; outro balão bate no vidro e o
  segurança encara
- MOSTRA: loja_nova, baloes, banco
- CENÁRIO: rua_predios de dia
- ENTRA AGORA: a placa "SITE NOVO!" brilha em "site novo"; o balão gruda em "Recebe"; o banco em "banco"; o 2º balão em
  "também"
- OBJETOS SE MEXENDO: o balão escorrega devagar pela placa
- PERSONAGEM: ao fundo, em cima do canhão, disparando · em "também": faz joinha, sem perceber
- INTERAÇÃO: o balão dele acerta a loja e o banco
- CÂMERA: (1) chegando, médio, de frente, a loja com a placa · (2) passando, médio, esquerda, o banco e o canhão lá
  atrás
- EFEITOS VISUAIS: "Já tem site" (vermelho) em "site novo" · "Banco?!" (vermelho) em "banco"
- SONS: plaft · plaft · cri-cri

### 4. ignorado: "Cem mensagens no dia. Visualizou, não respondeu. Bloqueou." (jogo: falha)
- NA TELA: o contador "Enviadas 0 → 100" correndo acima do canhão; depois ele desce e olha o celular: os tracinhos azuis
  de visualizado pipocando em volta, um por um; no fim o ✗ vermelho "Bloqueado" gigante
- MOSTRA: personagem, contador, celular, vistos
- CENÁRIO: rua_predios, a tarde caindo
- ENTRA AGORA: o contador em "Cem"; os tracinhos em "Visualizou"; o ✗ em "Bloqueou"
- OBJETOS SE MEXENDO: o canhão solta fumaça e emperra; os tracinhos azuis pipocando
- PERSONAGEM: começo: desce do canhão animado e pega o celular · em "Bloqueou": a cabeça cai pra trás, desanimado
- INTERAÇÃO: ele rola a conversa no celular
- CÂMERA: (1) afastando, médio, direita, o contador e o canhão soltando fumaça · (2) chegando, perto, de frente, ele e o
  ✗ do lado da cabeça
- EFEITOS VISUAIS: "100 enviadas" (verde) em "Cem" · "Visualizou" (azul) · "Bloqueado" (vermelho) em "Bloqueou"
- SONS: tique-tique do contador · pling-pling dos vistos · errado em "Bloqueou"

### 5. virada: "O erro não é mandar mensagem. É mandar pra quem nem precisa de você."
- NA TELA: o ✗ gigante carimbado no canhão; um alvo de dardos aparece na rua na frente dele; em "precisa", só 3 balões
  acertam o meio do alvo e brilham verde; os outros caem no chão
- MOSTRA: personagem, alvo, canhao
- CENÁRIO: rua_predios
- ENTRA AGORA: o ✗ carimba em "erro"; o alvo sobe do chão em "mandar pra"; os 3 balões no centro em "precisa"
- OBJETOS SE MEXENDO: os balões errados murchando no chão
- PERSONAGEM: começo: olha o ✗, coça a cabeça · em "precisa": arregala os olhos e aponta o meio do alvo
- INTERAÇÃO: ele puxa o alvo pra perto com as mãos
- CÂMERA: (1) chegando, médio, esquerda, o canhão com o ✗ · (2) subindo, médio, de frente e de baixo, ele e o alvo
- EFEITOS VISUAIS: "O erro" (vermelho) em "erro" · "Quem precisa de você" (verde) em "precisa"
- SONS: carimbo · zum do alvo subindo · ding em "precisa"

### 6. investe: "Aí ele decidiu investir o preço de um açaí numa ferramenta que mostra quem precisa." (jogo: corrige)
- NA TELA: o quarto (home_office) de dia; ele de pé com um copo de açaí na mão, escrito "1 AÇAÍ"; o copo vira moeda e cai
  no teclado; o mapa com pinos acende no monitor
- MOSTRA: personagem, nota, monitor
- CENÁRIO: home_office de dia
- ENTRA AGORA: o copo em "investir"; o poof e a moeda em "ferramenta"; os pinos em "precisa"
- OBJETOS SE MEXENDO: a moeda em arco até o teclado
- PERSONAGEM: começo: olha o copo com dó · em "açaí": faz que sim, decidido
- INTERAÇÃO: ele paga com o copo (a moeda cai no computador)
- CÂMERA: (1) chegando, médio, esquerda, ele com o açaí · (2) subindo, médio, de frente, o monitor acendendo
- EFEITOS VISUAIS: "Investir" (azul) em "investir"
- SONS: poof · pingo da moeda · estalos dos pinos

### 7. busca: "No computador, digita mappoa.com e escreve: academias em Joinville."
- NA TELA: a barra do navegador grande acima do monitor com mappoa.com sendo digitado; a tela "Sua próxima busca" sobe
  do monitor com "Academias" e "Joinville, SC" sendo escritos e o botão em degradê "Buscar"
- MOSTRA: navegador, busca, personagem
- CENÁRIO: home_office de dia
- ENTRA AGORA: a barra em "computador", as letras em "digita"; a busca sobe em "escreve"; as letras de "academias" e
  "Joinville"; o botão brilha no fim
- OBJETOS SE MEXENDO: a tela da busca sobe crescendo do monitor
- PERSONAGEM: sentado digitando · no fim: aperta o botão com o dedo
- INTERAÇÃO: digita o endereço e a busca
- CÂMERA: (1) de trás do monitor (a câmera do tres-da-manha), a barra e o rosto dele · (2) parado, médio, de frente e um
  pouco de baixo, a busca inteira
- EFEITOS VISUAIS: nenhum além da tela (a barra é o destaque)
- SONS: cliques do teclado · clique do botão

### 8. lista: "E vem a lista: oitenta e sete academias, trinta e uma sem site, já com os contatos."
- NA TELA: a central do Mappoa, o mapa gigante de Joinville na parede; a lista grande em pé na frente do mapa enchendo
  de cartões; o contador 0 → 87; a separação "56 com site · 31 sem site" com o grupo SEM SITE destacado; os chips de
  WhatsApp, telefone e e-mail nos cartões; o Bruno e o robô do lado
- MOSTRA: lista, robo, personagem
- CENÁRIO: central_mappoa, os robôs trabalhando nas mesas
- ENTRA AGORA: a lista cai do alto em "lista"; o contador corre em "oitenta e sete"; o grupo SEM SITE acende em
  "trinta"; os chips pipocam em "contatos"
- OBJETOS SE MEXENDO: os cartões descendo um a um; o robô aponta o grupo SEM SITE
- PERSONAGEM: começo: olha pra cima de boca aberta · em "contatos": comemora
- INTERAÇÃO: o robô e o Bruno apontam juntos o grupo SEM SITE
- CÂMERA: (1) revelando, aberto, de frente e de baixo, a lista inteira e o mapa · (2) chegando, médio, esquerda, os chips
- EFEITOS VISUAIS: "87 academias" (azul) em "oitenta" · "31 sem site" (verde) em "trinta"
- SONS: brilho · bips a cada cartão · ding em "trinta"

### 9. mappoa: "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."
- NA TELA: o palco da marca, o logo gigante; o Bruno e o robô dos lados; o alvo da frase 5 volta pequeno no canto e a
  tela da análise cai na frente com o score enchendo até 90/100
- MOSTRA: tela, robo, personagem
- CENÁRIO: mundo_mappoa, os cartões e pinos flutuando
- ENTRA AGORA: o rótulo "Mappoa" em "Mappoa"; a tela cai em "sistema"; o score enche de "precisa" a "serviço"
- OBJETOS SE MEXENDO: o robô acena; os pinos giram no fundo
- PERSONAGEM: começo: aponta o logo · em "serviço": comemora com o punho
- INTERAÇÃO: o Bruno e o robô batem as mãos
- CÂMERA: (1) chegando, médio, de frente e de baixo, o logo e os dois · (2) passando, médio, esquerda, a tela com o score
- EFEITOS VISUAIS: o rótulo "Mappoa" · "Quem precisa de você" (verde) em "precisa"
- SONS: brilho · ding · certo

### 10. analise: "Ele abre uma academia: nota noventa pra oferta dele e a mensagem pronta, falando dela."
- NA TELA: o quarto de novo; acima do monitor, a tela da Academia Força Total: "Dados da empresa", a nota 90/100
  grande, "Dores prováveis: sem site, só Instagram"; depois a tela vira a mensagem pronta do WhatsApp com a frase
  "vi que vocês abriram a turma de funcional" grifada e o botão verde
- MOSTRA: tela, personagem, monitor
- CENÁRIO: home_office de dia
- ENTRA AGORA: a tela sobe em "abre"; o 90/100 em "noventa"; a tela vira a mensagem em "mensagem"; o grifo em "dela"
- OBJETOS SE MEXENDO: o score girando até 90; as linhas da mensagem se escrevendo
- PERSONAGEM: sentado · começo: clica · em "dela": vira pra câmera e aponta o grifo
- INTERAÇÃO: ele clica na academia e a tela troca
- CÂMERA: (1) chegando, médio, direita (ângulo pequeno, o painel olha pro +z), de baixo, a tela e ele · (2) parado,
  perto, de frente, a mensagem inteira
- EFEITOS VISUAIS: "Nota 90" (verde) em "noventa" · "Fala da academia" (azul) em "dela"
- SONS: clique · ding do score · teclinhas da mensagem

### 11. venda: "Mandou pra quinze, não pra cem. A maioria não respondeu. Mas uma topou: a primeira venda."
- NA TELA: (1) ele com o celular, o contador "15" grande do lado do "100" riscado; os ✗ cinzas "sem resposta" pipocando;
  (2) a academia: o dono de camiseta de academia, com apito no pescoço, aperta a mão do Bruno; as esteiras atrás; o ✓ e
  a chuva de dinheiro
- MOSTRA: personagem, celular, dono
- CENÁRIO: home_office → academia (esteiras, halteres, espelho)
- ENTRA AGORA: o "15" em "quinze", o risco no "100" em "cem"; os ✗ em "maioria"; a academia em "Mas"; o ✓ e o aperto
  em "topou"; o dinheiro em "venda"
- OBJETOS SE MEXENDO: os ✗ pipocando e sumindo; as notas caindo; uma esteira rodando
- PERSONAGEM: o Bruno · começo: manda mensagem no celular · em "respondeu": ombros caídos · em "venda": pulinhos; o
  dono · em "topou": apita, faz que sim e estende a mão
- INTERAÇÃO: o aperto de mão
- CÂMERA: (1) passando, médio, direita, ele e os ✗ · (2) chegando, médio, de frente, o aperto de mão com as esteiras atrás
- EFEITOS VISUAIS: "15, não 100" (azul) em "quinze" · "Sem resposta" (cinza) em "respondeu" · "Primeira venda!" (verde)
  em "venda"
- SONS: whoosh das mensagens · errado baixinho · apito · festa

### 12. antes_agora: "Antes, cem mensagens pro nada. Agora, menos mensagem, e pra quem precisa." (jogo: avança)
- NA TELA: (1) Antes: a rua, o canhão emperrado soltando fumaça, os balões murchos no chão; (2) Agora: a academia, ele
  entrando com o notebook, o dono acenando, o ✓ "Fechou"
- MOSTRA: personagem, canhao, dono
- CENÁRIO: rua_predios → academia
- ENTRA AGORA: a academia em "Agora"; o ✓ em "precisa"
- OBJETOS SE MEXENDO: (Antes) um balão murchando; (Agora) as linhas de velocidade
- PERSONAGEM: Antes: sentado no canhão, desanimado · Agora: anda rápido, feliz, e acena pro dono
- INTERAÇÃO: Antes, sozinho com o canhão; Agora, chegando no dono da academia
- CÂMERA: (1) afastando, médio, esquerda, o canhão · (2) K.heroi, de baixo pra cima, ele chegando
- EFEITOS VISUAIS: "Antes" (vermelho) · "Agora" (verde) · "Fechou" (verde) em "precisa"
- SONS: fumaça chiando · whoosh · passos · certo

### 13. segue: "Quantas mensagens você já mandou sem resposta? Comenta o número. No computador, digita mappoa.com e acha as academias sem site da sua cidade."
- NA TELA: ele de pé no quarto; a pergunta no topo com o contador "?" girando; depois a barra com mappoa.com, a lista
  "sem site" pequena aparecendo embaixo, o robô acenando e o cartão de seguir
- MOSTRA: personagem, navegador, monitor
- CENÁRIO: home_office de dia
- ENTRA AGORA: a pergunta em "mensagens"; o "?" girando em "número"; a barra em "computador"; as letras em "digita"; a
  lista em "sem site"
- OBJETOS SE MEXENDO: o robô acena; o botão Seguir é apertado
- PERSONAGEM: começo: aponta pra câmera · em "número": conta nos dedos · em "digita": digitando
- INTERAÇÃO: ele digita o endereço
- CÂMERA: (1) chegando, médio, de frente · (2) parado, aberto, de frente, topo livre pro cartão
- EFEITOS VISUAIS: "Quantas sem resposta? Comenta o número" · o cartão de seguir
- SONS: estalo · cliques · ding · clique do Seguir
