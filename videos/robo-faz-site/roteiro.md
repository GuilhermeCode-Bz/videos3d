# O robô que faz site: roteiro e ficha de cena

> Vídeo 3 do lote da nuvem no molde de 45 s (`canal/lote-nuvem-45s.md`, 19/11/2026). Tema da pauta (pesquisa de
> mercado de 19/11): o medo de 2026, a IA fazendo site. 1º quadro: um robô gigante no meio do calçadão cuspindo sites
> prontos como uma impressora, a pilha subindo, e o Ravi pequenininho do lado, de braço cruzado.
> A virada vira o jogo: o robô faz o site, mas não bate na porta da marmoraria que nem sabe que precisa. Quem acha a
> empresa e fecha é gente. O Ravi descruza os braços, investe numa ferramenta e digita mappoa.com.
> Nicho e cidade inéditos: marmorarias de Feira de Santana (BA).

## Roteiro

1. Um robô faz site em dez segundos. E você continua sem cliente. *(gancho, 12 palavras)*
2. O Ravi é web designer e passa o dia de braço cruzado, com medo da IA. *(16)*
3. Baixou o preço, refez o portfólio. Trinta dias depois, nenhuma mensagem. *(11)*
4. Só que a marmoraria da esquina não tem site. E robô nenhum vai bater lá. *(15)*
5. Quem bateu lá foi outro web designer. E fechou. *(9, falha: congela em preto e branco)*
6. Aí o Ravi descruza os braços, investe numa ferramenta e digita mappoa.com no computador. Vem a lista das marmorarias de Feira de Santana sem site. *(23, corrige)*
7. Esse é o *Mappoa*, um sistema que mostra quem precisa do seu trabalho. *(13)*
8. Antes, o Ravi tinha medo do robô. Agora, o robô faz o site e o Ravi traz o cliente. *(19, avança)*
9. Segue pra ver mais. No computador, digita mappoa.com e testa você também. *(12, o fim fixo)*
10. Cartão de seguir (1,6 s, sem fala).

**130 palavras, 9 frases**, uns 43 a 45 s com o cartão (a ~185 palavras por minuto da voz Liam). Uns 760 caracteres
da ElevenLabs.

**Onde o tempo vai:** gancho 0 a ~4 s · o Ravi entra na frase 2, aos ~4 s · a dor com o tempo passando (3) até ~12 s ·
a marmoraria sem site (4) até ~17 s · o rival que fecha (5) até ~20 s · o gesto e o mappoa.com (6), dito por volta dos
22 a 23 s · o nome (7) · Antes x Agora (8) · o fim (9).

**Gancho escolhido:** A. Opções:
- **A:** "Um robô faz site em dez segundos. E você continua sem cliente." (a frase da pauta com "você" no lugar de "ele",
  como pede o molde; fim em aberto: por que, se o site ficou fácil?)
- **B:** "A IA já faz o seu trabalho. Então por que ninguém te contrata?" (mais polêmica, mas pergunta e explica demais)
- **C:** "Esse robô cospe um site por segundo. E não fechou nenhum cliente." (boa, mas tira o "você")

**Capa:** "Medo da *IA*?" (12 letras), com o robô gigante cuspindo sites e o Ravi pequeno de braço cruzado.

## O que foi conferido

- Molde de 45 s (`canal/formato-campeao.md`): 130 palavras, 9 frases; gancho de 12 palavras com "você" e o fim em
  aberto, sem "Se X, Y" e sem "Web designer, ..."; "O Ravi é web designer e..." na frase 2; dor com o tempo passando
  (3); a empresa do bairro sem site (4); o rival que fecha (5); o gesto da virada ligado ao gancho (descruza os braços)
  com a decisão de investir, curta, sem valor e sem "grátis" (6); mappoa.com digitado no computador com a lista do
  nicho na cidade (6); o nome numa frase só (7); Antes x Agora voltando pra metáfora (8); o fim fixo de 17/11 (9)
- "Dez segundos" é a imagem da metáfora (o robô do gancho), não um dado de pesquisa. Sem número de pesquisa na fala
- O Mappoa é um **sistema** que mostra quem precisa do serviço (nunca "um site"); na tela, a lista das marmorarias
  sem site e a análise com o score NN/100, as dores e as oportunidades, do jeito do produto (`canal/pecas/mappoa.js`)
- A IA não é a vilã no fim: o robô vira ferramenta (faz o site) e o Ravi faz o que robô nenhum faz: achar a empresa e
  conversar com o dono. Tema bom pra comentário sem precisar pedir
- Empresas inventadas: Marmoraria São José (a da esquina, do Seu Zé), Mármores Princesa, Granitos Kalilândia, Pedra
  Nobre. Cidade: Feira de Santana, BA. Nome do personagem novo no canal: Ravi
- Nenhuma frase copiada de vídeo anterior (o "Esse é o Mappoa" desta vez fala de "trabalho" e "mostra")

## Ficha de cena

**Cenários (três, com `K.cenarios`):** `rua_predios` de dia (1, 4, 5, o Antes e o Agora da 8): o calçadão entre
prédios; o robô gigante fica no meio do calçadão, 16 m pra dentro da rua, e a Marmoraria São José na fachada da
esquerda (a loja do cenário com a placa nova por cima e uma placa num poste). As árvores e os bancos desse trecho
ficam escondidos pra câmera andar livre. `home_office` de dia (2, 3, 6, 9 e o cartão): o quarto do Ravi.
`mundo_mappoa` (7): o palco da marca.
**Peças dos cenários que entram:** os prédios altos e a gente andando (rua) · a mesa, o computador, a cadeira
giratória e a janela (quarto) · o logo gigante e os pinos (palco).
**Personagens:** o do canal (menino de camiseta azul), chamado Ravi, em todas. O **Seu Zé**, dono da marmoraria
(`K.personagem('dono')` de camisa cinza e avental de lona) na 4, 5 e 8. O **rival** (`K.boneco` de camiseta laranja e
boné) na 5. O **robô do Mappoa** na 7 e na 9.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `robo_ia` | o robô gigante que faz site: pernas, tronco com a fenda de impressora e "IA" no peito, cabeça com olhos azuis acesos e antena piscando, braços | `THREE.Group` de caixas, feito no `cena.js` | ~7 m de altura, cinza-claro `#cfd6df`, detalhes azul-escuro | rua, x 0, z = marmoraria - 16, de frente pra +z | 1, 4 (no fundo), 8 |
| `sites` | as folhas de site saindo da fenda do peito, voando em arco e caindo na pilha | 14 planos 1,1 × 0,8 com 4 desenhos de site | coloridos, "Site pronto ✓" | da fenda até a pilha na frente do robô | 1, 4, 8 |
| `pilha` | a pilha de sites prontos no chão | as próprias folhas, empilhadas | cresce até ~0,5 m | na frente do robô, x 1,2 | 1, 8 |
| `personagem` | o Ravi | `K.boneco` com as cores do canal | 1,47 m | | todas |
| `robozinho` | o mesmo robô em miniatura, na mesa do quarto, cuspindo sitezinhos | o mesmo grupo, escala 0,07 | ~0,5 m | na mesa, do lado do monitor | 2 |
| `monitor` | o computador do Ravi | `K.computador` | | quarto, [-0,5, 0, -1,3] | 2, 3, 6, 9 |
| `preco` | a etiqueta de preço "R$ 1.500" riscada que vira "R$ 400" | plano com canvas, na mão | 0,5 × 0,3, amarela | na mão dele | 3 |
| `celular` | o celular com "0 mensagens" | `K.celular()` | | na mão dele | 3 |
| `marmoraria` | a loja da esquerda com a placa MARMORARIA SÃO JOSÉ e a placa no poste | placa nova por cima da placa da loja + `placaPoste` | placa 4 × 1, fundo verde-escuro | fachada da esquerda | 4, 5, 8 |
| `marmore` | duas chapas de mármore em pé num cavalete e uma bancada | caixas brancas com veios | 1,6 × 1,1 cada | na calçada da marmoraria | 4, 5, 8 |
| `dono` | o Seu Zé | `K.personagem('dono')` + avental | | na frente da loja | 4, 5, 8 |
| `rival` | o outro web designer | `K.boneco` camiseta laranja | | chega pela rua | 5 |
| `navegador` | a barra com mappoa.com sendo digitado | `K.painelMappoa` | 2,3 × 0,4 | em cima do monitor | 6, 9 |
| `tela` | a lista das marmorarias e a análise da São José | `K.painelMappoa` | 1,4 × 2,33 e 1,56 × 2,6 | do lado do monitor; no palco | 6, 7, 8 |
| `moeda` | a moeda do investimento caindo no teclado | cilindro dourado | 0,18 | da mão pro teclado | 6 |
| `robo` | o robô do Mappoa | `K.roboMappoa` | | palco; quarto | 7, 9 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| robô | 1, 4, 8 | o `robo_ia` gigante (e o `robozinho` na 2) |
| site, dez segundos | 1 | as `sites` saindo; a etiqueta "10 segundos" |
| cliente | 1, 8 | a etiqueta "0 clientes" (1); o Seu Zé fechando (8) |
| web designer | 2, 5 | o Ravi com a etiqueta; o rival com a etiqueta |
| braço cruzado | 2, 6 | o Ravi de braço cruzado; descruza na 6 |
| IA | 2 | o robozinho na mesa e "IA faz site em 10 s" na tela |
| preço, portfólio | 3 | a etiqueta de preço; o site novo no monitor |
| trinta dias, mensagem | 3 | o contador "Dia 1 → 30"; o celular com "0 mensagens" |
| marmoraria, esquina | 4 | a loja da esquerda com a placa e o mármore |
| outro web designer, fechou | 5 | o rival e o aperto de mão |
| ferramenta, mappoa.com, computador | 6 | a moeda; a barra; o computador |
| lista, marmorarias, Feira de Santana | 6 | a `tela` com a lista e o título |
| Mappoa, sistema | 7 | o rótulo MAPPOA, a análise e o robô |
| Antes/Agora, robô faz o site | 8 | o robô cospe uma folha que cai na mão do Ravi, e ele entrega pro Seu Zé |
| computador, mappoa.com | 9 | a barra digitada no quarto |

### Frase 1: gancho (0 a ~4 s)

- **NA TELA:** o robô gigante no meio do calçadão, a fenda do peito cuspindo um site a cada 0,3 s; a pilha subindo na
  frente dele; o Ravi pequeno do lado direito, de braço cruzado. A frase da capa no topo
- **MOSTRA:** robo_ia, sites, personagem
- **CENÁRIO:** a rua entre prédios de dia, gente andando lá no fundo
- **ENTRA AGORA:** as folhas já saindo no 1º quadro (o absurdo já acontecendo)
- **OBJETOS SE MEXENDO:** cada folha sai da fenda, voa num arco de ~3 m girando e cai deitada na pilha; os olhos
  piscam; a antena acende e apaga; o braço direito do robô sobe e desce como alavanca de impressora
- **PERSONAGEM:** de braço cruzado, cara fechada; em "você": vira a cabeça pra câmera, de cara triste
- **INTERAÇÃO:** uma folha cai do lado dele e ele nem olha
- **CÂMERA:** 4 cortes de ~0,9 s: (1) de baixo, a fenda cuspindo uma folha na direção da câmera; (2) a pilha de
  sites crescendo, de lado, na altura do chão; (3) o rosto do Ravi de braço cruzado, de frente, perto; (4) aberto,
  o robô inteiro e o Ravi pequeno, de frente, com o topo livre
- **EFEITOS VISUAIS:** "10 segundos" (laranja) em "segundos"; "0 clientes" (vermelho) em "cliente"
- **SONS:** estrondo + zumbido no 1º quadro; whoosh em cada corte; bip e clique de impressora a cada folha; errado em
  "cliente"

### Frase 2: o Ravi (4 a ~9 s)

- **NA TELA:** o quarto; o Ravi de pé do lado da mesa, de braço cruzado, encolhido; na mesa o robozinho cuspindo
  sitezinhos; o monitor com a notícia "IA faz site em 10 segundos"
- **MOSTRA:** personagem, monitor, robozinho
- **CENÁRIO:** o quarto de dia, a janela clara
- **ENTRA AGORA:** o robozinho já na mesa; a notícia acende em "medo"
- **OBJETOS SE MEXENDO:** os sitezinhos saindo do robozinho e caindo na mesa
- **PERSONAGEM:** braço cruzado batendo o pé; em "medo": treme e faz cara de assustado
- **INTERAÇÃO:** ele olha pro robozinho e pro monitor, com medo
- **CÂMERA:** (1) chegando, médio, de frente-direita, olho; (2) em "medo": perto, da esquerda, o monitor e o rosto
- **EFEITOS VISUAIS:** "Web designer" (azul) em "designer"; "Medo da IA" (laranja) e "!" em "medo"
- **SONS:** clique dos sitezinhos; whoosh no corte; zumbido baixo no medo

### Frase 3: o tempo passando (~9 a ~12 s)

- **NA TELA:** (1) o Ravi com a etiqueta de preço "R$ 1.500" na mão, que leva um risco e vira "R$ 400"; (2) ele
  sentado digitando, o monitor com o portfólio novo; (3) de pé com o celular "0 mensagens", o contador "Dia 30"
- **MOSTRA:** personagem, preco, celular
- **CENÁRIO:** o quarto
- **ENTRA AGORA:** a etiqueta no começo; o portfólio em "refez"; o celular e o contador em "Trinta"
- **OBJETOS SE MEXENDO:** o risco vermelho atravessa o preço; o contador de 1 a 30
- **PERSONAGEM:** mostra o preço; digita rápido; em "nenhuma": ombros caídos, triste
- **INTERAÇÃO:** segura a etiqueta, digita no teclado, olha o celular
- **CÂMERA:** 3 cortes: perto na etiqueta e no rosto; atrás do monitor, ele digitando; médio de frente com o celular
- **EFEITOS VISUAIS:** "Dia 1 → 30" (contador vermelho); ✗ em "mensagem"
- **SONS:** errado no risco; cliques; bip do contador; errado no fim

### Frase 4: a marmoraria (~12 a ~17 s)

- **NA TELA:** a calçada da esquerda; a Marmoraria São José com a placa; as chapas de mármore; o Seu Zé passando a
  flanela numa chapa e o balão "Orçamento? Só vindo aqui!"; lá no fundo da rua, o robô gigante cuspindo sites pro
  outro lado
- **MOSTRA:** marmoraria, dono, marmore
- **CENÁRIO:** a rua de dia, gente andando
- **ENTRA AGORA:** o balão em "site"; o ✗ em cima do robô em "nenhum"
- **OBJETOS SE MEXENDO:** as folhas do robô voando longe; a flanela indo e voltando
- **PERSONAGEM:** o Seu Zé lustra o mármore; em "site": vira pra câmera e encolhe os ombros
- **INTERAÇÃO:** a flanela na chapa
- **CÂMERA:** (1) chegando de frente pra loja, médio; (2) em "robô": afastando pela rua, o robô gigante no fundo
- **EFEITOS VISUAIS:** "Sem site" (vermelho) em "site"; ✗ no robô em "nenhum"
- **SONS:** passos e gente (o cenário); etiqueta; errado em "nenhum"

### Frase 5: o rival (~17 a ~20 s)

- **NA TELA:** o outro web designer chega andando, bate na porta (vidro), aperta a mão do Seu Zé
- **MOSTRA:** rival, dono, marmoraria
- **CENÁRIO:** a rua
- **ENTRA AGORA:** o rival vem andando pela calçada desde o começo
- **OBJETOS SE MEXENDO:** o rival anda até a loja
- **PERSONAGEM:** (o rival) bate de leve com a mão; em "fechou": aperto de mão, o Seu Zé feliz
- **INTERAÇÃO:** o aperto de mão
- **CÂMERA:** (1) seguindo o rival de trás; (2) em "fechou": médio, de lado, os dois apertando a mão
- **EFEITOS VISUAIS:** "Outro web designer" (laranja); ✓ e "Fechou!" (vermelho, é a dor do Ravi) em "fechou";
  congela em preto e branco (jogo falha)
- **SONS:** passos; toc-toc (madeira); certo no aperto; congela

### Frase 6: a virada e o mappoa.com (~20 a ~28 s)

- **NA TELA:** (1) o Ravi de braço cruzado descruza e fecha o punho, decidido; (2) a moeda cai no teclado e a etiqueta
  "Investir"; (3) sentado, a barra mappoa.com sendo digitada; (4) a lista das marmorarias de Feira de Santana subindo
  do computador
- **MOSTRA:** personagem, navegador, tela
- **CENÁRIO:** o quarto
- **ENTRA AGORA:** a moeda em "investe"; a barra em "digita"; a lista em "lista"
- **OBJETOS SE MEXENDO:** a moeda girando até o teclado; as letras; os itens da lista um a um
- **PERSONAGEM:** descruza em "descruza"; senta e digita; em "lista": levanta e aponta a São José
- **INTERAÇÃO:** joga a moeda, digita, aponta
- **CÂMERA:** 4 cortes: perto do rosto e dos braços; médio da mão e do teclado; perto do endereço; médio da lista
- **EFEITOS VISUAIS:** "Investir" (azul); "Feira de Santana" (azul) em "Feira"
- **SONS:** whoosh (corrige); pingo da moeda; cliques; brilho e bips da lista

### Frase 7: o nome (~28 a ~32 s)

- **NA TELA:** no palco do Mappoa, a análise da Marmoraria São José cai do alto; o robô do Mappoa acenando; o Ravi
- **MOSTRA:** tela, robo, personagem
- **CENÁRIO:** o palco da marca
- **ENTRA AGORA:** a tela em "sistema"; o score em "precisa"
- **OBJETOS SE MEXENDO:** o score sobe até 91/100
- **PERSONAGEM:** chamando; em "trabalho": comemorando
- **INTERAÇÃO:** aponta a tela
- **CÂMERA:** (1) chegando, médio, de baixo; (2) passando, médio, da esquerda
- **EFEITOS VISUAIS:** rótulo MAPPOA em "Mappoa"; "Quem precisa de você" (verde) em "precisa"
- **SONS:** brilho; ding; certo

### Frase 8: Antes x Agora (~32 a ~38 s)

- **NA TELA:** (Antes) na rua, o Ravi de braço cruzado tremendo na frente do robô gigante; (Agora) na marmoraria, o
  robô cospe uma folha que voa até a mão do Ravi, ele entrega pro Seu Zé e os dois apertam a mão
- **MOSTRA:** personagem, robo_ia, dono
- **CENÁRIO:** a rua
- **ENTRA AGORA:** a folha voando em "faz"; o aperto em "cliente"
- **OBJETOS SE MEXENDO:** a folha do robô até a mão dele
- **PERSONAGEM:** (Antes) treme; (Agora) pega a folha, entrega, aperta a mão
- **INTERAÇÃO:** a folha passa da mão do Ravi pra do Seu Zé
- **CÂMERA:** (1) Antes: o Ravi pequeno de costas olhando o robô; (2) Agora: de baixo pra cima, o Ravi e o Seu Zé com
  o robô no fundo; (3) em "cliente": médio, o aperto de mão
- **EFEITOS VISUAIS:** "Medo" (vermelho) no Antes; "Você traz o cliente" (verde) e ✓ em "cliente"
- **SONS:** avança; whoosh da folha; certo e festa

### Frase 9: o fim (~38 a ~43 s) e o cartão

- **NA TELA:** o quarto; o cartão de seguir entra em "Segue" e o botão vira "Seguindo"; a barra mappoa.com digitada
  em "digita"; o robô do Mappoa acenando
- **MOSTRA:** personagem, navegador, monitor
- **PERSONAGEM:** chamando quem assiste; em "digita": digitando
- **CÂMERA:** (1) chegando, médio, de frente; (2) aberto, parado, topo livre
- **SONS:** clique do botão seguir; cliques; ding; final no cartão
