# Web designer, seu Instagram tá lindo. E vazio: roteiro e ficha de cena

> História do dono (14/11/2026): o Lucas acabou de aprender a fazer sites, organizou o Instagram e postou todo dia;
> nenhum cliente, só 1 like de um aleatório; decidiu ir atrás; investiu numa ferramenta que acha empresas que precisam
> de site; ligou pra 30 empresas, 1 fechou: a primeira venda; quanto mais abordava, mais aprendia a vender; Antes x Agora.
> Gancho com a vibe da barba (a metáfora absurda da espera) e falando direto com o web designer. 50 a 55 s (o dono
> aprovou, 14/11/2026). Nicho: lojas de roupa de Londrina (a fachada pronta é de loja de roupa).

## Roteiro

1. Web designer, seu Instagram tá lindo. E vazio. *(gancho)*
2. O Lucas acabou de aprender a fazer sites. Organizou o Instagram e postou todo dia.
3. Três meses depois, nenhum cliente. Só uma curtida, de um perfil aleatório.
4. Aí ele parou de esperar e decidiu ir atrás dos clientes.
5. Investiu o preço de uma pizza numa ferramenta de achar cliente.
6. No computador, digita mappoa.com, e vem a lista das lojas de roupa de Londrina sem site.
7. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
8. Ele ligou pra trinta lojas. Vinte e nove disseram não.
9. Mas uma disse sim. E veio a primeira venda.
10. Quanto mais lojas ele chamava, mais aprendia a vender.
11. Antes, ele postava e esperava. Agora, ele vai atrás e fecha.
12. E você, posta e espera ou vai atrás? Comenta ATRÁS. No computador, digita mappoa.com e testa você também.

Cerca de 140 palavras, uns 50 s com o cartão de seguir (uns 820 caracteres da ElevenLabs).

**Gancho escolhido:** A. Opções:
- **A:** "Web designer, seu Instagram tá lindo. E vazio." (o palco de show gigante, o Instagram dele no telão, as cadeiras
  todas vazias e a moita de feno rolando)
- **B:** "Web designer, se você esperar o cliente no Instagram, vai ficar assim."
- **C:** "Web designer, três meses postando. Olha quem curtiu."

**Capa:** "Instagram *vazio*?" (17 letras), o Lucas sozinho no palco, o telão com o Instagram e as cadeiras vazias.

## O que foi conferido

- Sem preço do Mappoa: "o preço de uma pizza" e "investiu" (a decisão de investir, nunca "grátis")
- Os números (30 ligações, 29 nãos, 1 sim, "6 vendas" no contador da escada) são da história do Lucas, não estatística
- O Mappoa é "um sistema que acha quem precisa do seu serviço", o nome numa frase só; o mappoa.com digitado "no
  computador" já na entrada; a assinatura do fim continua
- Sem "Esse é o Lucas": ele entra já dentro da ação
- O pedido do fim é de uma palavra (ATRÁS), sem prometer responder; o "segue" fica só no cartão
- Empresas inventadas: Vento Sul Moda (a fachada pronta) e as outras da lista; o perfil "capinhas_top_88" é inventado

## Ficha de cena

**Cenários (seis, com `K.cenarios`):** `palco_show` sem a plateia de gente, com fileiras de cadeiras vermelhas vazias
(1 e o "Antes" da 11) · `home_office` (2 a 6, 8 e 12) · `mundo_mappoa` (7) · `fachada` da loja de roupa (9) ·
`vazio_colorido` verde (10) · `rua_predios` (o "Agora" da 11).
**Personagens:** o do canal, chamado Lucas, em todas · a dona da Vento Sul (`K.personagem('dona')`, blazer laranja) na
9 · o robô do Mappoa na 7 e na 12.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| telao | O Instagram do Lucas (foto, nome, 9 posts, "0 clientes") | telão do palco_show redesenhado | 7,2 x 3,4 m, branco | fundo do palco | 1, 11 |
| cadeiras | 44 cadeiras vazias da plateia | K.m3d('cadeira') | vermelhas, 4 fileiras | plateia (z 4,8 a 8,5) | 1, 11 |
| feno | Moita de feno rolando | 22 anéis finos + núcleo | 0,7 m, palha | rola na beira do palco | 1, 11 |
| celular | Celular gigante com o Instagram e a curtida | K.m3d('celular_gigante') | 0,8 x 1,6 m | quarto, à esquerda | 2, 3, 4 |
| monitor | Computador com mesa | K.computador | mesa de madeira | meio do quarto | 2 a 6, 8, 12 |
| cadeira | Cadeira giratória | K.m3d('cadeira_giratoria') | azul | na frente do computador | 2 a 6 |
| nota | A nota "1 PIZZA" | plano desenhado | 0,42 m, verde | na mão dele | 5 |
| navegador | Barra com mappoa.com | K.painelMappoa | 2,3 m | acima do monitor | 6, 12 |
| tela | Lista e análise do Mappoa | K.painelMappoa | 1,4 a 1,56 m | sobe do monitor / palco | 6, 7 |
| robo | Robô do Mappoa | K.roboMappoa | — | palco / quarto | 7, 12 |
| dona | Dona da Vento Sul Moda | K.personagem('dona') | blazer laranja | calçada da loja | 9 |
| loja | Fachada Vento Sul | cenário fachada | — | fundo | 9 |
| escada | Escada do sucesso | K.m3d('escada_sucesso') | 5 degraus azuis, escala 1,5 | fundo verde | 10 |

### Teste dos substantivos

web designer (1, etiqueta na 2) · Instagram (telão 1, celular 2) · cadeiras vazias = "vazio" (1) · sites (monitor 2) ·
posts / "todo dia" (celular 2) · três meses (contador Dia 1 → 90, 3) · cliente (etiqueta "0 clientes", 3) · curtida e
perfil aleatório (notificação e ❤, 3) · ir atrás (etiqueta "Bora atrás!", 4) · pizza (nota, 5) · ferramenta (mapa no
monitor, 5) · computador e mappoa.com (6) · lista, lojas de roupa, Londrina (6) · Mappoa, sistema (7) · trinta lojas e
nãos (lista de ligações, contador, ✗, 8) · sim e primeira venda (balão, ✓, dinheiro, 9) · aprender a vender (escada e
contador de vendas, 10) · Antes / Agora / fecha (palco vazio x rua, ✓ "Fechou", 11) · ATRÁS, computador (12).

### 1. gancho: "Web designer, seu Instagram tá lindo. E vazio."
- NA TELA: o palco de show enorme, o telão gigante com o Instagram do Lucas, ele pequeno no holofote; na frente, as
  fileiras de cadeiras vermelhas vazias
- MOSTRA: personagem, telao, cadeiras
- CENÁRIO: palco_show sem plateia; os refletores coloridos girando
- ENTRA AGORA: os posts do telão pipocam de "Instagram" a "lindo"; a moita de feno entra rolando pela esquerda em "vazio"
- OBJETOS SE MEXENDO: a moita atravessa o palco quicando, de x -6,5 a 6,5
- PERSONAGEM: no meio do palco · começo comemorando orgulhoso · em "lindo": mostra o telão · em "vazio": encolhe os ombros, cara triste
- INTERAÇÃO: ele aponta o próprio Instagram no telão
- CÂMERA: 4 cortes de ~0,7 s: (1) da última fileira, por cima das cadeiras vazias, o palco e o telão; (2) o telão de
  perto, de frente; (3) girando em volta dele, médio, de baixo; (4) baixa na beira do palco, a moita passando na frente
- EFEITOS VISUAIS: "0 clientes" (vermelho) em cima dele em "vazio"
- SONS: brilho e estalos dos posts em "Instagram" · vento (whoosh) com a moita · errado de leve

### 2. posta: "O Lucas acabou de aprender a fazer sites. Organizou o Instagram e postou todo dia."
- NA TELA: o quarto; ele sentado digitando, o site de exemplo no monitor; depois de pé do lado do celular gigante, que
  enche de posts
- MOSTRA: personagem, celular
- CENÁRIO: o quarto de dia (janela, ring light)
- ENTRA AGORA: o celular gigante cresce em "Organizou"; 3 posts em "Instagram" e um por vez de "postou" até "dia"
- OBJETOS SE MEXENDO: o feed do celular enchendo até 12 posts
- PERSONAGEM: começo digitando · em "sites": vitória sentado · de "Organizou": de pé mostrando o celular · em "dia": pulinhos
- INTERAÇÃO: ele mostra o celular com o Instagram
- CÂMERA: (1) chegando, perto, esquerda, no rosto e no monitor · (2) passando, perto, de frente e de baixo, ele e o celular
- EFEITOS VISUAIS: "Web designer" (azul) em "sites" · "Todo dia" (verde) em "postou"
- SONS: teclado · ding em "sites" · whoosh em "Organizou" · estalo a cada post

### 3. curtida: "Três meses depois, nenhum cliente. Só uma curtida, de um perfil aleatório." (jogo: falha)
- NA TELA: ele sentado de frente pro celular "0 clientes"; os papéis do calendário voando; o contador "Dia 1 → Dia 90";
  a notificação "capinhas_top_88 curtiu sua foto"
- MOSTRA: personagem, celular
- CENÁRIO: o quarto, com os papéis voando
- ENTRA AGORA: a notificação e o ❤ em "curtida"
- OBJETOS SE MEXENDO: o celular vibra em "curtida"; os papéis voam de "Três" a "nenhum"
- PERSONAGEM: começo olha o relógio · em "curtida": se anima · em "aleatório": mão na testa
- INTERAÇÃO: ele olha o celular
- CÂMERA: (1) girando, médio, direita · (2) chegando, perto, esquerda, no celular e no rosto
- EFEITOS VISUAIS: "0 clientes" em "nenhum" · ❤ em "curtida" · "Perfil aleatório" (laranja) em "aleatório"
- SONS: whoosh · ding da curtida · pingo

### 4. decide: "Aí ele parou de esperar e decidiu ir atrás dos clientes." (jogo: corrige)
- NA TELA: ele bate na mesa, o celular gigante some num poof, ele levanta e a cadeira gira
- MOSTRA: personagem, cadeira
- CENÁRIO: o quarto
- ENTRA AGORA: o poof em "esperar"
- OBJETOS SE MEXENDO: o celular encolhe e some; a cadeira gira em "decidiu"
- PERSONAGEM: começo mão na testa · em "parou": bate na mesa · em "decidiu": levanta e ergue o punho
- INTERAÇÃO: o soco na mesa; a cadeira girando quando ele levanta
- CÂMERA: (1) chegando, perto, direita · (2) subindo, médio, de frente e de baixo
- EFEITOS VISUAIS: "Bora atrás!" (verde) em "atrás"
- SONS: baque · whoosh · ding

### 5. investe: "Investiu o preço de uma pizza numa ferramenta de achar cliente."
- NA TELA: ele de pé com a nota "1 PIZZA"; ela vira moeda e cai no teclado; o mapa com pinos no monitor
- MOSTRA: personagem, nota, monitor
- CENÁRIO: o quarto
- ENTRA AGORA: a nota em "Investiu"; o poof e a moeda em "ferramenta"; os pinos em "cliente"
- OBJETOS SE MEXENDO: a moeda em arco até o teclado
- PERSONAGEM: começo segurando a nota · em "pizza": faz que sim · em "ferramenta": digita
- INTERAÇÃO: ele paga com a nota (a moeda cai no computador)
- CÂMERA: (1) chegando, médio, esquerda, nele com a nota · (2) subindo, médio, de frente, no monitor
- EFEITOS VISUAIS: "Investir" (azul)
- SONS: pingo da moeda · estalos dos pinos

### 6. lista: "No computador, digita mappoa.com, e vem a lista das lojas de roupa de Londrina sem site."
- NA TELA: a barra com mappoa.com acima do monitor; a lista "Lojas de roupa · Londrina, PR" sobe do computador
- MOSTRA: navegador, tela, personagem
- CENÁRIO: o quarto
- ENTRA AGORA: a barra em "computador", as letras de "digita"; a lista em "lista"; as lojas uma a uma em "lojas"
- OBJETOS SE MEXENDO: a lista sobe crescendo do monitor
- PERSONAGEM: começo digitando · depois levanta e aponta a Vento Sul Moda
- INTERAÇÃO: digita o endereço; aponta a loja
- CÂMERA: (1) chegando, perto, por cima do ombro · (2) chegando, médio, de frente
- EFEITOS VISUAIS: "Londrina" (azul)
- SONS: cliques · brilho · bips das lojas

### 7. mappoa: "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."
- NA TELA: o palco do Mappoa; a análise da Vento Sul Moda (score, dores, oportunidade); o robô e o Lucas
- MOSTRA: tela, robo, personagem
- CENÁRIO: mundo_mappoa, o logo gigante
- ENTRA AGORA: a tela cai em "sistema"; o score enche de "precisa" a "serviço"
- OBJETOS SE MEXENDO: o robô acena
- PERSONAGEM: começo chamando · em "serviço": comemorando
- INTERAÇÃO: o Lucas e o robô em volta da análise
- CÂMERA: (1) chegando, médio, de frente e de baixo · (2) passando, médio, esquerda
- EFEITOS VISUAIS: o rótulo "Mappoa" · "Quem precisa de você" (verde)
- SONS: brilho · ding · certo

### 8. liga: "Ele ligou pra trinta lojas. Vinte e nove disseram não."
- NA TELA: ele de pé no quarto falando no telefone, andando de um lado pro outro; no monitor, a lista de ligações sendo
  riscada; ✗ vermelhos pipocando em volta; o contador "Ligação 1 → 30"
- MOSTRA: personagem, monitor
- CENÁRIO: o quarto
- ENTRA AGORA: o contador em "ligou"; os ✗ a partir de "trinta"
- OBJETOS SE MEXENDO: os ✗ aparecendo e sumindo em 4 lugares
- PERSONAGEM: começo falando no telefone, andando · em "não": mão na testa
- INTERAÇÃO: o telefone no ouvido
- CÂMERA: (1) passando, médio, direita · (2) chegando, perto, de frente
- EFEITOS VISUAIS: o balão "Não, obrigado." · "29 nãos" (vermelho) em "não"
- SONS: errado baixinho a cada ✗ · errado em "não"

### 9. venda: "Mas uma disse sim. E veio a primeira venda."
- NA TELA: a frente da Vento Sul; a dona na calçada diz "Sim! Quero o site!"; o ✓; a chuva de dinheiro
- MOSTRA: personagem, dona, loja
- CENÁRIO: a fachada da loja de dia, a porta abrindo, os carros passando
- ENTRA AGORA: o balão em "sim"; o ✓ e o poof em "veio"; o dinheiro em "venda"
- OBJETOS SE MEXENDO: as notas e moedas caindo em volta dele
- PERSONAGEM: o Lucas · começo mostrando a proposta · em "venda": pulinhos · a dona · em "sim": faz que sim · em "veio": mostrando
- INTERAÇÃO: os dois de frente um pro outro fechando
- CÂMERA: (1) chegando, médio, de frente · (2) passando, perto, esquerda, de baixo
- EFEITOS VISUAIS: "Primeira venda!" (verde)
- SONS: ding · certo · festa

### 10. aprende: "Quanto mais lojas ele chamava, mais aprendia a vender."
- NA TELA: o fundo verde; a escada do sucesso crescendo degrau por degrau, o Lucas subindo pulando; o contador "1 → 6 vendas"
- MOSTRA: personagem, escada
- CENÁRIO: vazio_colorido verde, as formas flutuando
- ENTRA AGORA: cada degrau cresce antes de ele pular; a bandeira no topo em "vender"
- OBJETOS SE MEXENDO: a escada crescendo
- PERSONAGEM: sobe pulando com o punho erguido · em "vender": pulinhos lá no topo
- INTERAÇÃO: ele pula de degrau em degrau
- CÂMERA: (1) subindo junto, médio, direita · (2) afastando, médio, de frente e de baixo, a escada inteira
- EFEITOS VISUAIS: "Abordagem melhor" (azul) em "chamava" · "Mais sim" (verde) em "aprendia"
- SONS: estalo a cada degrau · certo

### 11. antes_agora: "Antes, ele postava e esperava. Agora, ele vai atrás e fecha." (jogo: avança)
- NA TELA: (1) Antes: o palco vazio de novo, a moita rolando, ele olhando o relógio; (2) Agora: ele andando rápido na
  rua entre prédios, o ✓ e "Fechou"
- MOSTRA: personagem
- CENÁRIO: palco_show → rua_predios
- ENTRA AGORA: a rua em "Agora"; o ✓ em "fecha"
- OBJETOS SE MEXENDO: a moita (Antes); as linhas de velocidade (Agora)
- PERSONAGEM: Antes: olha o relógio, triste · Agora: anda rápido, feliz
- INTERAÇÃO: Antes sozinho no palco; Agora indo até as lojas
- CÂMERA: (1) da plateia, afastando · (2) de baixo pra cima, com os prédios atrás (K.heroi)
- EFEITOS VISUAIS: "Esperando" (vermelho) · "Fechou" (verde)
- SONS: whoosh · passos · certo

### 12. segue: "E você, posta e espera ou vai atrás? Comenta ATRÁS. No computador, digita mappoa.com e testa você também."
- NA TELA: ele de pé no quarto; a pergunta no topo; depois a barra com mappoa.com, o robô acenando e o cartão de seguir
- MOSTRA: personagem, navegador, monitor
- CENÁRIO: o quarto
- ENTRA AGORA: a barra em "computador"; as letras em "digita"
- OBJETOS SE MEXENDO: o robô acena; o botão Seguir é apertado
- PERSONAGEM: começo chamando pra câmera · em "ATRÁS": aponta pra câmera · em "digita": digitando
- INTERAÇÃO: ele digita o endereço
- CÂMERA: (1) chegando, médio, de frente · (2) parado, aberto, de frente, topo livre pro cartão
- EFEITOS VISUAIS: "Posta e espera ou vai atrás? Comenta ATRÁS" · o cartão de seguir
- SONS: estalo · cliques · ding · clique do Seguir
