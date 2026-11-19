# A loja que o ChatGPT não conhece (vídeo 7 do lote da nuvem, molde de 45 s)

> 19/11/2026, feito na nuvem a partir de `canal/lote-nuvem-45s.md`, sem pedir aprovação ("Jeito de trabalhar"). Tema 7
> da pesquisa de mercado (`canal/pauta.md`): a busca com IA só recomenda quem tem presença na internet. A dor de fundo
> é a do PRÓPRIO web designer (oferece site pra quem já tem e não acha cliente); a loja apagada pra IA é o cliente que
> ele não estava vendo.

**Gancho (escolhido entre 3):**
- A (escolhido, o da pauta): "Perguntaram pro ChatGPT onde tem chaveiro. Essa loja nem existe pra ele." · 1º quadro: o
  robô gigante da IA andando pela rua de noite, varrendo as lojas com a lanterna e passando reto pelo quiosque apagado
  do Seu Zé, que acena. 12 palavras, dito em 3,6 s, fim em aberto (por que não existe? o que isso tem a ver comigo?)
- B: "O robô iluminou a rua inteira. Menos a loja do Seu Zé."
- C: "A IA procurou um chaveiro na cidade toda. E passou reto por esse."

**Usei o que você me ensinou:** o molde de 45 s (130 palavras, 10 frases, 42,8 s), a metáfora absurda no 1º quadro
(nova no canal: o robô gigante com lanterna), o web designer na frase 2 aos 4,4 s, a dor com o tempo passando ("Trinta
dias", contador Dia 1 → 30), a empresa do bairro sem site com a dor escrita (o chat da IA: "Chaveiro do Zé: não
encontrado"), o rival que acende a luz primeiro e fecha, o gesto da virada ligado à metáfora (o Caio acende a PRÓPRIA
lanterna) junto da decisão de investir (sem valor, sem "grátis"), mappoa.com digitado no computador aos 22,5 s, o nome
numa frase só, Antes x Agora voltando pro robô e o fim fixo com o cartão no "Segue". Nicho e cidade inéditos:
chaveiros de Caruaru.

**Cenários:** a rua entre prédios de noite (`rua_predios`, `{ hora: 'noite' }`, as lojas acesas e o quiosque apagado),
o quarto do Caio (`home_office`) e o palco do Mappoa (`mundo_mappoa`). Foto: `referencias/cenarios/rua_predios.jpg`.

## Os objetos do vídeo

| Nome no código | O que é | Tamanho e cor | Onde fica | Frases |
|---|---|---|---|---|
| `robo_ia` | Robô gigante da IA (feito no cena.js): cinza claro, roxo, visor escuro com olhos azuis, "IA" aceso no peito, lanterna gigante na mão direita | 7 m de altura | anda no meio do calçadão (x 1,8) de z -11 a z -2 | 1 (e capa) |
| feixe do robô | Cone de luz amarela + a mancha onde bate | raio 1,6 m | da lanterna até as fachadas da direita | 1 |
| `quiosque` | Quiosque CHAVEIRO DO ZÉ: balcão de madeira, toldo listrado, placa, chave gigante em cima, chaves penduradas, lâmpada que acende | 2 x 3,6 m | lado esquerdo do calçadão [-1,5, 0, -5] | 1, 4, 5 |
| `chaveiro` | Seu Zé (K.personagem 'dono', paletó marrom) | normal | do lado do balcão [-0,35, 0, -4,45] | 1, 4, 5 |
| `chat` | Celular gigante com o chat do "Assistente de IA" | 1,6 m | do lado do quiosque [1,05, 0, -4,5] | 4 |
| `rival` | Outro web designer, moletom vermelho, com lanterna vermelha | normal | anda até o quiosque | 5 |
| `contrato` | Contrato "Site do Chaveiro do Zé" + carimbo FECHADO | 0,6 x 0,8 m | entre o rival e o Zé | 5 |
| `personagem` | O Caio (o menino do canal) | normal | quarto e rua | 2, 3, 6, 7, 8, 9, 10 |
| `monitor` | Computador do Caio (K.computador) | mesa normal | quarto [-0,5, 0, -1,3] | 2, 3, 6, 7, 9, 10 |
| `celular` | Celular gigante "Nenhuma mensagem", com o dia passando | 1,6 m | do lado da mesa [0,75, 0, -1,25] | 3 |
| `lanterna` | Lanterna de mão azul do Caio | 0,4 m | na mão / em cima da mesa | 6, 9, 10 |
| `navegador` | Barra com mappoa.com (K.painelMappoa) | 2,3 x 0,4 m | acima do computador | 6, 7, 10 |
| `tela` | Lista dos chaveiros de Caruaru SEM SITE / a análise do Chaveiro Agreste | 1,4 x 2,3 m | sobe do computador; no palco | 7, 8, 9 |
| `robo` | Robô do Mappoa | normal | palco e quarto | 8, 10 |
| `quiosque2` | Quiosque CHAVEIRO AGRESTE, apagado e depois aceso | 2 x 3,6 m | lado direito, mais pra frente [1,5, 0, 4] | 9 |
| `dona` | Dona do Chaveiro Agreste (K.personagem 'dona', blazer laranja) | normal | do lado do quiosque2 | 9 |

## O teste dos substantivos

ChatGPT → o robô da IA (1) e o chat do celular (4) · chaveiro / loja → o quiosque do Zé (1, 4, 5) · Caio / web
designer → o menino (2) · site / quem já tem → o e-mail com as respostas "Já temos site" (2) · trinta dias / resposta /
celular / mesa → o contador Dia 1 → 30, "0 respostas", o celular gigante ao lado da mesa (3) · chaveiro da esquina /
apagado → o quiosque escuro entre as lojas acesas e o ✗ (4) · outro web designer / luz / fechou → o rival, a lanterna
dele acendendo o quiosque, o carimbo FECHADO (5) · lanterna / investir / mappoa.com / computador → a lanterna do Caio,
a etiqueta "Investir", a barra digitando (6) · lista / chaveiros de Caruaru / apagados pra IA → a lista SEM SITE e as
etiquetas "Caruaru" e "Invisíveis pra IA" (7) · Mappoa / sistema → o rótulo, o palco e a análise (8) · robô / IA não vê
→ o Antes no quarto e o Agora com a lanterna achando o quiosque apagado (9) · computador / mappoa.com → a barra e o
cartão de seguir (10).

## Frases e cenas

1. **gancho** (0,15 a 4,2 s) · "Perguntaram pro ChatGPT onde tem chaveiro. Essa loja nem existe pra ele." · MOSTRA: robo_ia, quiosque, chaveiro
   - NA TELA: a rua de noite com as lojas acesas; o robô gigante vindo pelo calçadão; o quiosque apagado à esquerda; o Seu Zé acenando
   - CENÁRIO: rua_predios de noite, gente andando, carros nas esquinas
   - ENTRA AGORA: o pensamento do robô "Onde tem chaveiro?" em "Perguntaram"
   - OBJETOS SE MEXENDO: o robô anda 9 m na frase; a lanterna varre as fachadas da direita e nunca o quiosque
   - PERSONAGEM: o Zé acena com os dois braços pro robô · em "existe" baixa os braços, triste
   - INTERAÇÃO: o feixe do robô passa reto pelo quiosque
   - CÂMERA: 4 cortes de ~0,75 s: (1) a cara do robô de baixo, (2) a lanterna batendo nas fachadas, (3) o quiosque apagado e o Zé acenando, (4) o quadro inteiro, topo livre pra frase da capa
   - EFEITOS VISUAIS: "Invisível pra IA?" no topo · etiqueta vermelha "Não existe" em "existe"
   - SONS: liga + zumbido no 0 s, passo gigante (baque + estrondo) a cada 0,75 s, whoosh em cada corte, ding em "chaveiro", errado em "existe"
2. **oferece** (4,3 a 7,6 s) · "O Caio é web designer e passa o dia oferecendo site pra quem já tem." · MOSTRA: personagem, monitor
   - NA TELA: o quarto; o Caio no computador; o e-mail "Proposta: faço sites" pra Padaria Pão Bom e as respostas "Já temos site" empilhando
   - PERSONAGEM: digitando animado · em "já": coça a cabeça
   - CÂMERA: (1) de trás do monitor, no rosto dele · (2) por cima do ombro, a tela com as respostas
   - EFEITOS VISUAIS: etiqueta laranja "Já têm site" em "oferecendo" · SONS: cliques, errado a cada resposta
3. **espera** (7,7 a 11,7 s) · "Trinta dias nisso. Nenhuma resposta, e o celular parado na mesa." · MOSTRA: personagem, celular
   - NA TELA: o celular gigante do lado da mesa com o dia passando e "Nenhuma mensagem"; papéis do calendário voando; o contador "Dia 1 → 30"
   - PERSONAGEM: sentado virado pro celular · olha o relógio · em "Nenhuma": mão na testa
   - CÂMERA: (1) frente-direita, chegando · (2) de frente, afastando
   - EFEITOS VISUAIS: contador laranja "Dia 30" · etiqueta vermelha "0 respostas" em "Nenhuma" · SONS: tique-taque, errado, desliga
4. **apagado** (11,8 a 16,2 s, jogo `falha`) · "Só que o chaveiro da esquina não tem site. Pro ChatGPT, ele tá apagado." · MOSTRA: quiosque, chaveiro, chat
   - NA TELA: o quiosque escuro entre as lojas acesas; o Zé triste; o celular gigante com o chat: "Onde tem chaveiro em Caruaru?" → "Chaves Centro, Rei do Segredo (os dois têm site)" → "Chaveiro do Zé: não encontrado"
   - PERSONAGEM: o Zé segurando o pano, triste · em "apagado": encolhe os ombros
   - CÂMERA: (1) chegando no quiosque com as lojas acesas atrás · (2) o Zé e o chat de frente
   - EFEITOS VISUAIS: etiqueta vermelha "Sem site" em "site" · ✗ em "apagado" · congela em preto e branco · SONS: bip, errado, desliga
5. **rival** (16,3 a 19,3 s, jogo `corrige`) · "Outro web designer acendeu a luz dele primeiro. E fechou." · MOSTRA: rival, quiosque, contrato
   - NA TELA: o rival de moletom vermelho chega apontando a lanterna; em "acendeu" o quiosque acende inteiro (placa, lâmpada, toldo); aperto de mão e o contrato FECHADO
   - PERSONAGEM: o rival anda até o balcão · o Zé leva um susto quando acende · em "fechou" comemora
   - CÂMERA: (1) atrás do rival, o feixe dele no quiosque · (2) os dois de frente com o quiosque aceso atrás
   - EFEITOS VISUAIS: etiqueta vermelha "Outro web designer" · carimbo FECHADO · SONS: passos, liga, brilho, baque, certo
6. **lanterna** (19,4 a 24,7 s) · "Aí o Caio acende a lanterna, decide investir e digita mappoa.com no computador." · MOSTRA: personagem, lanterna, navegador
   - NA TELA: o quarto; o Caio acende a lanterna azul (o feixe na parede); em "investir" vira pra câmera e ergue a lanterna; em "digita" senta e a barra mappoa.com aparece acima do computador
   - PERSONAGEM: de perfil apontando a lanterna · faz sim com a cabeça em "investir" · digitando
   - CÂMERA: (1) de perfil · (2) de frente, ele com a lanterna pro alto · (3) chegando na barra e no monitor
   - EFEITOS VISUAIS: etiqueta azul "Investir" · SONS: clique da lanterna, liga, ding, as teclas
7. **lista** (24,8 a 28,9 s) · "Vem a lista dos chaveiros de Caruaru sem site, todos apagados pra IA." · MOSTRA: tela, personagem, monitor
   - NA TELA: a lista SEM SITE sobe do computador (Chaveiro Agreste, Chave Mestra, Chaveiro Boa Vista, Chaves 24h Salgado)
   - PERSONAGEM: levanta surpreso · aponta o Chaveiro Agreste em "Caruaru" · comemora em "apagados"
   - CÂMERA: (1) subindo de frente · (2) passando pela esquerda
   - EFEITOS VISUAIS: etiqueta azul "Caruaru" · etiqueta laranja "Invisíveis pra IA" · SONS: brilho, bip a cada empresa, ding
8. **mappoa** (29,0 a 32,2 s) · "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço." · MOSTRA: tela, robo, personagem
   - NA TELA: o palco do Mappoa; a análise do Chaveiro Agreste (88/100, dores, oportunidade, abordagem); o robô do Mappoa acenando; o Caio comemorando
   - CÂMERA: (1) chegando de baixo · (2) passando pela esquerda
   - EFEITOS VISUAIS: rótulo MAPPOA · etiqueta verde "Quem precisa de você" · SONS: brilho, ding, certo
9. **antes_agora** (32,3 a 36,8 s, jogo `avanca`) · "Antes, o Caio passava reto que nem o robô. Agora, ele acha quem a IA não vê." · MOSTRA: personagem, quiosque2, dona
   - NA TELA: Antes: o quarto, ele triste mandando "faço sites" pra quem já tem · Agora: a rua de noite, ele chega de lanterna acesa no CHAVEIRO AGRESTE apagado, que acende; mostra a análise; a dona comemora, ✓
   - CÂMERA: (1) de trás do monitor, no rosto dele · (2) de baixo pra cima, atrás dele, o feixe achando a placa · (3) os dois de frente com o quiosque aceso
   - EFEITOS VISUAIS: etiqueta laranja "Já têm site" no Antes · etiqueta verde "Achou primeiro!" e ✓ no Agora · SONS: whoosh, passos, liga, brilho, certo
10. **segue** (36,9 a 41,1 s) · "Segue pra ver mais. No computador, digita mappoa.com e testa você também." · MOSTRA: personagem, navegador, monitor
    - NA TELA: o cartão de seguir entra no "Segue" e vira "Seguindo"; a barra digita mappoa.com; o robô do Mappoa acena; a lanterna em cima da mesa
    - CÂMERA: (1) chegando de frente · (2) parado, aberto, topo livre · SONS: o clique do seguir, as teclas, ding
11. **cartao** (cauda, 1,6 s): o cartão "Seguindo", a barra com mappoa.com, o Caio acenando · SOM: final

Cada plano do `cena.js` começa com as linhas desta ficha em comentário.
