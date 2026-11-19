# Mês passado ele tinha três clientes (a montanha-russa)

> Vídeo 1 do lote da nuvem no molde de 45 s (`canal/lote-nuvem-45s.md`), feito em 19/11/2026 sem pedir aprovação.
> Tema e metáfora da "Pesquisa de mercado (19/11/2026)" de `canal/pauta.md`.

**Gancho (escolhido entre 3):**
- A (escolhido): "Mês passado ele tinha três clientes. Olha ele agora." · 9 palavras, 2,7 s, fim em aberto · 1º quadro: o
  carrinho vermelho despencando do pico com o Caíque gritando de braços pra cima, e o trilho desenhado como o gráfico
  do saldo (verde subindo, vermelho caindo, a placa SALDO DA CONTA)
- B: "Ele tinha três clientes. Agora ele grita toda vez que olha a conta."
- C: "A conta dele sobe e desce que nem montanha-russa." (entrega a metáfora no gancho)

**Usei o que você me ensinou:** molde de 45 s (130 palavras, 10 frases, 43,8 s), metáfora absurda NOVA no 1º quadro,
gancho em 3ª pessoa sem "Web designer," e sem "Se X, Y", o web designer na frase 2 (aos 3,1 s), a oficina do bairro sem
site, o rival que fecha, o gesto da virada (puxar o freio) com a decisão de investir (curta, sem valor e sem "grátis"),
mappoa.com digitado no computador aos 23 s, o nome numa frase só, Antes x Agora voltando pra metáfora e o fim fixo com o
cartão de seguir no "Segue". Nicho e cidade inéditos: oficinas de moto de Caxias do Sul.

**Texto (130 palavras, 43,8 s com o cartão):**

1. Mês passado ele tinha três clientes. Olha ele agora.
2. O Caíque é web designer e, quando tem cliente, esquece de procurar o próximo.
3. Entregou os três sites e o carrinho despencou. Passou um mês sem nenhum pedido.
4. Só que a oficina de moto da esquina não tem site. Nem o telefone aparece.
5. O colega dele procura cliente toda semana. Ele chegou primeiro e fechou.
6. Aí o Caíque puxa o freio, decide investir e digita mappoa.com no computador.
7. E vem a lista das oficinas de moto de Caxias do Sul sem site.
8. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
9. Antes, o Caíque vivia no sobe e desce. Agora, o carrinho dele só sobe.
10. Segue pra ver mais. No computador, digita mappoa.com e testa você também.

## Ficha de cena

**Cenários (K.cenarios):** `vazio_colorido` azul como o "parque" (fundo infinito, formas flutuando, nada pra câmera
bater), com o trilho feito no cena.js; `home_office` (o quarto do Caíque); `oficina` (a oficina de moto: o carro no
elevador, os pneus, o portão); `mundo_mappoa` (o palco do Mappoa). Ordem: parque → quarto → parque → oficina → parque
e quarto → palco → parque → quarto. Personagem: o menino de camiseta azul do canal, quase sempre sentado no carrinho
(filho do grupo do carrinho, que segue o trilho).

### Os objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `trilho` | a montanha-russa com a forma do saldo | CatmullRom + tubos, dormentes e pilares | ~78 m no eixo x, picos de 9, 5 e 6 m; verde subindo, vermelho descendo | parque, z = -1 | 1, 3, 6, 9 |
| `subida` | o trecho final que só sobe | parte do trilho (x 28 a 44) | verde, de 2,6 a 9 m | parque | 9 |
| `carrinho` | o carrinho vermelho com o Caíque dentro | caixas, bico, barra amarela, rodas | 1 x 1,5 m, vermelho com faixa amarela | no trilho, no x de cada plano | 1, 3, 6, 9, capa |
| `alavanca` | o freio de mão do carrinho | haste + bola vermelha | 0,6 m | lado direito do carrinho | 6 |
| `placa` | SALDO DA CONTA | K.placa | 5,2 x 1,1, azul-marinho | acima do 1º pico | 1 |
| `calendario` | o calendário SEM PEDIDO, DIA 1 → 30 | telaCanvas num quadro com pé | 1,3 x 1,5 | do lado do vale (x 12,6) | 3 |
| sites | os 3 cartões SITE ENTREGUE ✓ | folhas desenhadas | 0,9 x 0,62 | saem voando do carrinho | 3 |
| `monitor` | o computador do Caíque | K.computador | mesa de madeira | quarto, [-0,5, 0, -1,3] | 2, 6, 7, 10 |
| `lembrete` | o post-it PROCURAR O PRÓXIMO CLIENTE! | 2 folhas (frente e verso) | 0,42 m, amarelo | no alto do monitor, cai | 2 |
| `moto` | a moto azul da oficina | K.m3d moto_entrega | escala 1,35 | oficina, [0,4, 0, -0,9] | 4, 5 |
| `mecanico` | o dono da oficina | K.personagem entregador (boné amarelo, sem a bag) | | do lado da moto | 4, 5 |
| `celular` | a busca "oficina de moto": Site —, Telefone — | K.m3d celular_gigante | 1,6 m | oficina, [1,75, 0, 0,75] | 4 |
| `rival` | o colega de moletom vermelho | K.boneco moletom | | entra pelo portão | 5 |
| `contrato` | CONTRATO + carimbo FECHADO | folhas | 0,62 x 0,82 | entre o rival e o mecânico | 5 |
| `navegador` | a barra com mappoa.com | K.painelMappoa | 2,3 x 0,4 | acima do computador | 6, 7, 10 |
| `tela` | a lista e a análise do Mappoa | K.painelMappoa | 1,4 x 2,33 e 1,56 x 2,6 | quarto e palco | 7, 8 |
| `robo` | o robô do Mappoa | K.roboMappoa | | palco e quarto | 8, 10 |
| pinos | os pinos de cliente brotando | K.m3d pino | 0,9 | do lado da subida | 9 |

### O teste dos substantivos

clientes (1: etiqueta "3 clientes" no pico) · web designer (2: etiqueta) · cliente / próximo (2: o post-it) · três
sites (3: os 3 cartões ENTREGUE) · carrinho (3: o carrinho) · mês, pedido (3: o calendário DIA 1 → 30 e "0 pedidos") ·
oficina de moto (4: o cenário, a moto e o mecânico) · site, telefone (4: o celular gigante) · colega (5: o rival) ·
semana (5: etiqueta "Procura toda semana") · fechou (5: o carimbo FECHADO) · freio (6: a alavanca e as faíscas) ·
investir (6: etiqueta e a moeda virando poof no teclado) · mappoa.com, computador (6: a barra digitando) · lista,
oficinas, Caxias do Sul (7: a lista e a etiqueta) · Mappoa, sistema, serviço (8: a análise e o robô) · sobe e desce
(9: o carrinho nos morros) · carrinho que só sobe (9: a subida verde com os pinos) · computador, mappoa.com (10: a barra).

### Cena por cena

#### 1 · plano `gancho` · 0,1 a 3,1 s
> "Mês passado ele tinha três clientes. Olha ele agora."

- NA TELA: o carrinho vermelho no meio, despencando do 1º pico; o Caíque dentro, de braços pra cima; o trilho em forma
  de gráfico atrás; a placa SALDO DA CONTA no alto à esquerda; a frase da capa no topo
- MOSTRA: ["carrinho", "trilho", "personagem"]
- CENÁRIO: o fundo azul infinito, com bolas, anéis e cubos flutuando e girando devagar (o cenário cuida)
- ENTRA AGORA: "3 clientes" verde em cima do pico (palavra "três"); "R$ 0" vermelho no topo (palavra "agora")
- OBJETOS SE MEXENDO: o carrinho sai do pico (x -7,3) e desce o morro cada vez mais rápido até o vale e o reto (x 3);
  as linhas de velocidade em volta dele na descida
- PERSONAGEM: sentado no carrinho · começo: gritando de braços pra cima, cara de pavor · na palavra "agora": encolhido,
  agarrado na barra, tremendo
- INTERAÇÃO: o carrinho arrasta ele morro abaixo; ele se agarra no carrinho no "agora"
- CÂMERA: 4 cortes de ~0,75 s: (1) o rosto gritando, perto, pela direita, chegando; (2) o carrinho despencando, médio,
  de frente, passando; (3) o trilho inteiro com a placa, aberto, de frente, afastando; (4) ele no vale, médio, lado 35,
  chegando, topo livre
- EFEITOS VISUAIS: as linhas de velocidade · "3 clientes" (palavra "três") · "R$ 0" (palavra "agora")
- SONS: estrondo, whoosh e o grito (zumbido) no 1º segundo · o trilho rangendo · whoosh em cada corte · baque no "agora"

#### 2 · plano `trabalha` · 3,1 a 7,7 s
> "O Caíque é web designer e, quando tem cliente, esquece de procurar o próximo."

- NA TELA: o quarto; o Caíque sentado de frente pro computador; no monitor, os 3 projetos com as barras enchendo até
  ENTREGUE ✓; o post-it amarelo PROCURAR O PRÓXIMO CLIENTE! no alto do monitor
- MOSTRA: ["personagem", "monitor", "lembrete"]
- CENÁRIO: o home_office de dia, a janela com a cidade
- ENTRA AGORA: as barras enchendo desde o começo; "Web designer" (palavra "designer"); "Só trabalha" (palavra "cliente")
- OBJETOS SE MEXENDO: as barras dos 3 projetos de 0 a 100%; o post-it descola no "esquece" e cai girando até o chão
- PERSONAGEM: sentado na cadeira giratória · começo: digitando rápido · na palavra "esquece": dá de ombros sem olhar o
  post-it caindo e volta a digitar
- INTERAÇÃO: ele ignora o post-it, que cai do monitor
- CÂMERA: (1) por cima do ombro, perto, chegando, as barras na tela (lado 150) · (2) na palavra "cliente": de trás do
  monitor, o rosto dele concentrado e o post-it caindo (na frase 1: médio, de frente, no carrinho)
- EFEITOS VISUAIS: "Web designer" azul · "Só trabalha" laranja
- SONS: as teclas (14 cliques) · bip no "cliente" · whoosh do post-it caindo · o pingo dele no chão

#### 3 · plano `despenca` · 7,7 a 12,3 s · jogo `falha`
> "Entregou os três sites e o carrinho despencou. Passou um mês sem nenhum pedido."

- NA TELA: o carrinho no 2º pico; os 3 cartões SITE ENTREGUE ✓ voando; depois o carrinho no vale; o calendário SEM
  PEDIDO virando de DIA 1 a DIA 30 do lado
- MOSTRA: ["carrinho", "personagem", "calendario"]
- CENÁRIO: o parque azul, o trilho vermelho da descida na frente
- ENTRA AGORA: os 3 sites saindo do carrinho um a um (palavra "Entregou"); o calendário crescendo (palavra "mês");
  "0 pedidos" (palavra "pedido")
- OBJETOS SE MEXENDO: o carrinho parado no pico até "despencou", cai até o vale e rola devagar até parar no reto; as
  folhas do calendário virando rápido
- PERSONAGEM: no carrinho · começo: comemorando de braços pra cima · na palavra "despencou": gritando · na palavra
  "mês": largado, cabeça baixa, triste
- INTERAÇÃO: os sites saem das mãos dele; o calendário fica do lado, contando os dias sem pedido
- CÂMERA: (1) chegando, médio, lado -25, os sites voando · (2) descendo, médio, de frente, acompanhando a queda ·
  (3) chegando, perto, lado 20, ele e o calendário (na frase 2: o quarto)
- EFEITOS VISUAIS: os cartões ENTREGUE ✓ · "0 pedidos" vermelho · o congela em preto e branco no fim (o jogo)
- SONS: certo em cada site · range no pico · whoosh e o grito na queda · baque no vale · estalos das folhas

#### 4 · plano `oficina` · 12,3 a 16,3 s
> "Só que a oficina de moto da esquina não tem site. Nem o telefone aparece."

- NA TELA: a oficina; o mecânico de boné amarelo do lado da moto azul, com o balão "Cadê cliente?"; o cliente de roxo
  com o celular gigante: "oficina de moto", Moto da Esquina, Site —, Telefone —, ✗ Nada encontrado
- MOSTRA: ["mecanico", "moto", "celular"]
- CENÁRIO: a oficina: o carro azul no elevador, o portão, os pneus e o carrinho de ferramentas (o cenário cuida)
- ENTRA AGORA: o balão de pensamento (palavra "oficina"); o celular gigante crescendo (palavra "site"); o ✗ (palavra
  "aparece")
- OBJETOS SE MEXENDO: a busca sendo digitada letra por letra; o resultado aparece no "telefone"
- PERSONAGEM: o mecânico · começo: segurando a ferramenta, olhando pra rua · na palavra "site": triste, de braço caído.
  O cliente · começo: no celular · na palavra "aparece": faz não com a cabeça
- INTERAÇÃO: o cliente procura a oficina e não acha; o mecânico espera cliente do lado
- CÂMERA: (1) girando, médio, lado 20, o mecânico e a moto · (2) na palavra "site": chegando, perto, lado -10, o
  celular e o cliente (na frase 3: o parque)
- EFEITOS VISUAIS: "Sem site" vermelho · ✗ vermelho · o balão "Cadê cliente?"
- SONS: metal da ferramenta · as teclas do celular · bip no "telefone" · errado no "aparece"

#### 5 · plano `rival` · 16,3 a 20,2 s
> "O colega dele procura cliente toda semana. Ele chegou primeiro e fechou."

- NA TELA: o rival de moletom vermelho entrando pelo portão; o mecânico do lado da moto; depois o aperto de mão e o
  CONTRATO com o carimbo FECHADO entre os dois
- MOSTRA: ["rival", "mecanico", "contrato"]
- CENÁRIO: a oficina, o portão de enrolar com a luz entrando
- ENTRA AGORA: o rival pelo portão (desde o começo); "Procura toda semana" (palavra "semana"); o contrato (logo antes de
  "fechou") e o carimbo (palavra "fechou")
- OBJETOS SE MEXENDO: o rival anda do portão até o mecânico; o carimbo bate grande e assenta
- PERSONAGEM: o rival · começo: andando rápido · na palavra "chegou": aperto de mão, feliz. O mecânico · começo: triste
  · na palavra "semana": surpreso · depois de "fechou": comemora
- INTERAÇÃO: o aperto de mão e o contrato fechado
- CÂMERA: (1) passando, médio, lado 15, o rival chegando · (2) na palavra "chegou": chegando, médio, lado -18, o aperto
  de mão e o contrato (na frase 4: perto, no celular)
- EFEITOS VISUAIS: "Procura toda semana" laranja · o carimbo FECHADO
- SONS: passos · range do portão · whoosh no "chegou" · baque do carimbo · certo

#### 6 · plano `freio` · 20,2 a 24,8 s · jogo `corrige`
> "Aí o Caíque puxa o freio, decide investir e digita mappoa.com no computador."

- NA TELA: (parque) o carrinho chegando na beira do 3º pico, com a descida na frente; ele puxa a alavanca e o carrinho
  trava com faíscas; (quarto, a partir de "decide") o Caíque de pé, a barra do navegador aparecendo, e ele digitando
  mappoa.com
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: o parque, depois o quarto
- ENTRA AGORA: as faíscas e "Freio!" (palavra "freio"); a barra do navegador (palavra "decide"); "Investir" e o poof no
  teclado (palavra "investir"); as letras de mappoa.com (palavra "digita")
- OBJETOS SE MEXENDO: o carrinho sobe até a beira e para tremendo; a alavanca vai pra trás; as letras aparecem uma a uma
- PERSONAGEM: começo: olho arregalado vendo a descida · na palavra "puxa": puxa a alavanca com força · depois do
  "freio": aliviado · no quarto: ideia, faz sim no "investir", senta e digita
- INTERAÇÃO: ele puxa a alavanca e o carrinho para; ele digita o endereço no computador
- CÂMERA: (1) chegando, médio, de frente, o carrinho e a descida · (2) na palavra "puxa": girando, perto, lado 60, a mão
  na alavanca e as faíscas · (3) no quarto: chegando, médio, lado 12, ele, o computador e a barra · (4) na palavra
  "digita": chegando, perto, lado -24, a barra (na frase 5: a oficina)
- EFEITOS VISUAIS: as faíscas · "Freio!" azul · "Investir" azul · o poof
- SONS: cliques da corrente · trava da alavanca · range do freio · zap · brilho · ding · as teclas

#### 7 · plano `lista` · 24,8 a 28,5 s
> "E vem a lista das oficinas de moto de Caxias do Sul sem site."

- NA TELA: a barra mappoa.com no alto; a lista do Mappoa subindo do computador: Oficinas de moto · Caxias do Sul, RS,
  SEM SITE, Serra Motos, Moto Peças Galópolis, Garagem Duas Rodas, Oficina do Tchê; o Caíque de pé apontando
- MOSTRA: ["tela", "personagem", "navegador"]
- CENÁRIO: o quarto
- ENTRA AGORA: a lista sobe do computador (palavra "lista"); uma oficina a cada 0,25 s (palavra "oficinas"); "Caxias do
  Sul" (palavra "Caxias")
- OBJETOS SE MEXENDO: a lista cresce e sobe até o lado dele
- PERSONAGEM: começo: surpreso · na palavra "Caxias": aponta a Serra Motos
- INTERAÇÃO: ele aponta a primeira oficina da lista
- CÂMERA: afastando, médio, de frente (na frase 6: perto, na barra)
- EFEITOS VISUAIS: "Caxias do Sul" azul
- SONS: brilho no "lista" · bip em cada oficina · certo no "site"

#### 8 · plano `mappoa` · 28,5 a 32,6 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- NA TELA: o palco do Mappoa; a análise da Serra Motos caindo do alto (aderência 91/100, dores, oportunidade); o robô à
  esquerda; o Caíque à direita
- MOSTRA: ["tela", "robo", "personagem"]
- CENÁRIO: o mundo_mappoa: o logo gigante, os cartões e os pinos flutuando
- ENTRA AGORA: o rótulo MAPPOA (palavra "Mappoa"); a tela cai (palavra "sistema"); "Quem precisa de você" (palavra
  "precisa")
- OBJETOS SE MEXENDO: a barra de aderência enche até 91/100; o robô acena
- PERSONAGEM: começo: chamando · na palavra "serviço": comemorando
- INTERAÇÃO: ele e o robô apresentam a análise
- CÂMERA: (1) chegando, médio, de frente, baixo · (2) na palavra "acha": passando, médio, lado -14 (na frase 7: afastando)
- EFEITOS VISUAIS: o rótulo MAPPOA · "Quem precisa de você" verde
- SONS: brilho · ding · certo

#### 9 · plano `antes_agora` · 32,6 a 38,1 s · jogo `avanca`
> "Antes, o Caíque vivia no sobe e desce. Agora, o carrinho dele só sobe."

- NA TELA: Antes: o carrinho correndo nos morros (vermelho e verde), ele tonto; Agora: o carrinho no trilho verde que só
  sobe, com os pinos de cliente brotando do lado
- MOSTRA: ["personagem", "carrinho", "subida"]
- CENÁRIO: o parque azul
- ENTRA AGORA: "Sobe e desce" (palavra "sobe"); os pinos um a um (palavra "Agora"); "Só sobe" e o ✓ (palavra "só")
- OBJETOS SE MEXENDO: o carrinho de x 0,5 a 9,5 nos morros; depois sobe firme de x 30,5 a 37,5
- PERSONAGEM: Antes: gritando, a cabeça balançando, tonto · Agora: feliz, acenando
- INTERAÇÃO: o trilho chacoalha ele; na subida ele acena pros pinos de cliente
- CÂMERA: (1) passando, médio, de frente, nos morros · (2) na palavra "Agora": subindo, médio, lado 30, de baixo (na
  frase 8: o palco)
- EFEITOS VISUAIS: ⏩ do jogo · "Sobe e desce" vermelho · "Só sobe" verde · ✓
- SONS: whoosh · range · o grito · avanca · bip em cada pino · certo

#### 10 · plano `segue` · 38,1 a 42,2 s
> "Segue pra ver mais. No computador, digita mappoa.com e testa você também."

- NA TELA: o Caíque de pé no quarto; o cartão de seguir no topo (entra no "Segue", vira "Seguindo"); a barra digitando
  mappoa.com; o robô acenando
- MOSTRA: ["personagem", "navegador", "monitor"]
- CENÁRIO: o quarto
- ENTRA AGORA: o cartão (palavra "Segue"); a barra (palavra "computador"); as letras (palavra "digita")
- OBJETOS SE MEXENDO: o botão Seguir vira Seguindo; as letras de mappoa.com; o botão Ir fica verde no "testa"
- PERSONAGEM: começo: chamando, apontando pra quem assiste · na palavra "digita": digitando
- INTERAÇÃO: ele digita o endereço
- CÂMERA: (1) chegando, médio, de frente, topo livre · (2) parado, aberto, de frente, topo livre (na frase 9: de baixo)
- EFEITOS VISUAIS: o cartão de seguir · a barra
- SONS: clique do seguir · as teclas · ding no "testa"

#### cauda · plano `cartao` · 1,6 s
O cartão fica, o Caíque acena, o robô acena; som `final`.

**Capa:** "Sobe e *desce*?" · o carrinho na descida visto de frente, ele gritando de braços pra cima, o trilho subindo
atrás.
