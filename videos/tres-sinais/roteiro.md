# Os 3 sinais: roteiro e ficha de cena

> Pedido do dono (19/11/2026): um vídeo que RESPONDE "como achar clientes pra vender site?". Escolhido "os 3 sinais"
> da pauta (seção "O vídeo responde..."). Molde de 45 s (`canal/formato-campeao.md`), visual motion (padrão do canal
> desde 19/11). A resposta é de verdade e dá pra testar sozinho: os 3 sinais são os que o Mappoa mostra na lista real
> (SEM SITE, o "site" que é só Instagram conta como sem site, e SITE COM PROBLEMA / site que não abre).
> 1º quadro: o Enzo de óculos de raio-X no meio do calçadão, e três lojas acendendo em vermelho, com 1, 2 e 3.

## Roteiro

1. Quer achar cliente pra vender site? Procura esses três sinais. *(gancho, 10 palavras)*
2. O Enzo é web designer e botou esse óculos pra caçar cliente. *(12)*
3. Sinal um: no Google Maps, a padaria não tem site nenhum. *(11)*
4. Sinal dois: a loja jura que tem site. Clica, e é só o Instagram. *(14)*
5. Sinal três: a farmácia tem site. Mas a página nem abre. *(11)*
6. Só que, loja por loja, o Enzo levou o dia inteiro. *(11, falha: congela em preto e branco)*
7. Aí ele tira o óculos, investe numa ferramenta e digita mappoa.com no computador. Vem a lista dos escritórios de Campinas, já separada: sem site e site com problema. *(28, corrige)*
8. Esse é o *Mappoa*, um sistema que acha na cidade inteira quem precisa de site. *(15)*
9. Antes, o Enzo caçava sinal loja por loja. Agora, a cidade inteira acende de uma vez. *(16, avança)*
10. Segue pra ver mais. No computador, digita mappoa.com e testa você também. *(12, o fim fixo)*
11. Cartão de seguir (1,6 s, sem fala).

**140 palavras, 10 frases**, uns 44 a 46 s com o cartão (voz Liam, ~185 palavras por minuto). Uns 800 caracteres da
ElevenLabs.

**Onde o tempo vai:** gancho 0 a ~3,5 s · o Enzo na frase 2, aos ~3,5 s · os 3 sinais de ~7 a ~19 s (a resposta) · a
dor do "loja por loja" até ~22 s · o gesto (tira o óculos) e o mappoa.com por volta dos 24 a 25 s · o nome · Antes x
Agora · o fim.

**Gancho escolhido:** A. Opções:
- **A:** "Quer achar cliente pra vender site? Procura esses três sinais." (é a pergunta que a pessoa digita na busca;
  fim em aberto: quais são os três?)
- **B:** "Esse óculos mostra quem vai te contratar. Olha os três sinais." (mais curioso, mas promete demais: óculos não
  "sabe" quem contrata)
- **C:** "Toda rua tem três lojas assim. E elas precisam de você." (bom, mas não diz que é a resposta pra achar cliente)

**Capa:** "Os 3 *sinais*" (13 letras), com o Enzo de óculos de raio-X e as três lojas acesas em vermelho com 1, 2 e 3.

## O que foi conferido

- A resposta é verdadeira e serve até sem o Mappoa: no Google Maps dá pra ver quem não tem site, quem pôs o Instagram
  no lugar do site e quem tem um site que não abre. O Mappoa faz o mesmo com a cidade inteira: a lista real separa
  SEM SITE e SITE COM PROBLEMA ("Maior chance de fechar um site novo"), e o Instagram no lugar do site conta como sem
  site (`canal/produto.md`). Sem número inventado na fala
- A tela do Mappoa é a tela real (conta de exemplo: 19 escritórios de Campinas, 13 com site, 6 sem site), por isso a
  narração fala "escritórios de Campinas". As lojas da rua (padaria, loja, farmácia) são inventadas e sem nome de verdade
- Molde de 45 s: gancho de 10 palavras com a pergunta da busca e o fim em aberto; o web designer na frase 2; a dor
  ("loja por loja, o dia inteiro") congelada; o gesto da virada ligado ao gancho (tira o óculos); a decisão de investir
  curta, sem valor e sem "grátis"; mappoa.com digitado no computador; o nome numa frase só; Antes x Agora voltando pra
  metáfora (os sinais acendendo); o fim fixo de 17/11
- Aqui não tem o rival: no lugar dele, a resposta (os 3 sinais). É um vídeo de "como fazer", feito pra salvar
- O Mappoa é um **sistema** (nunca "um site"); "acha quem precisa de site", sem prometer venda
- Nome novo no canal: Enzo. Nenhuma frase copiada de vídeo anterior

## Ficha de cena

**Cenários (três, com `K.cenarios`):** `rua_predios` de dia (1 a 6 e a 9): o calçadão entre prédios; os sinais são
três lojas seguidas da fachada da esquerda (padaria, farmácia e loja do cenário). As árvores, os bancos e a gente
andando desse trecho somem pra câmera andar livre. `home_office` (7, 10 e o cartão): o quarto do Enzo.
`mundo_mappoa` (8): o palco da marca.
**Personagens:** o do canal (menino de camiseta azul, no desenho 2D do visual motion), chamado Enzo, em todas. O robô
do Mappoa na 8 e na 10.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Enzo | `K.boneco` com as cores do canal (cartão 2D) | 1,5 m | | todas |
| `oculos` | o óculos de raio-X: as lentes vermelhas brilhando na frente do rosto e dois feixes vermelhos saindo | óculos do desenho 2D + plano com canvas + dois cones transparentes | lentes 0,28 m | no rosto dele | 1 a 6, Antes da 9 |
| `padaria`, `loja`, `farmacia` | as três lojas do cenário, cada uma com uma moldura vermelha piscando e o número 1, 2, 3 | moldura de 4 barras + plaquinha redonda | 4,6 × 3,4 m | fachada da esquerda | 1, 3, 4, 5, 9 |
| `ficha` | a ficha do Google Maps que salta da loja: nome, nota, endereço e "Site: —" / "Site: instagram" / "Site: ..." | plano com canvas | 2,2 × 1,4 m | na frente da loja, no alto | 3, 4, 5 |
| `insta` | o "site" que é só um perfil de Instagram (fotos quadradas, "Seguir") | plano com canvas | 1,4 × 2 m | na frente da loja | 4 |
| `erro` | a janela do navegador com "Esta página não está disponível" e o rostinho triste | plano com canvas, tremendo | 2 × 1,4 m | na frente da farmácia | 5 |
| `relogio` | o contador de hora "8h → 18h" | `K.contador` | | em cima do Enzo | 6 |
| `monitor` | o computador do Enzo | `K.computador` com a tela de busca real do Mappoa | | quarto | 7, 10 |
| `navegador` | a barra com mappoa.com sendo digitado | `K.painelMappoa` | 2,3 × 0,4 | em cima do monitor | 7, 10 |
| `tela` | a lista real do Mappoa: SEM SITE e SITE COM PROBLEMA | `K.celularMappoa('lista')` gigante | 1,2 × 2,3 m | do lado do monitor; no palco | 7, 8 |
| `moeda` | a moeda do investimento caindo no teclado | cilindro dourado | 0,18 | da mão pro teclado | 7 |
| `robo` | o robô do Mappoa | `K.roboMappoa` | | palco; quarto | 8, 10 |
| `pinos` | os pinos verdes acendendo em todas as lojas da rua | `K.m3d`/cone verde com bolinha | 0,8 m | em cima de cada loja | 9 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| cliente, site, três sinais | 1 | as três lojas acesas com 1, 2, 3 |
| web designer, óculos, cliente | 2 | o Enzo com a etiqueta; ele põe o óculos; os feixes |
| Google Maps, padaria, site | 3 | a ficha do Maps saltando da padaria com "Site: —" |
| loja, site, Instagram | 4 | a ficha da loja com o link; o perfil do Instagram |
| farmácia, site, página | 5 | a ficha da farmácia; a janela de erro tremendo |
| loja por loja, dia inteiro | 6 | ele largado no meio-fio; o contador 8h → 18h |
| óculos, ferramenta, mappoa.com, computador | 7 | ele tira o óculos; a moeda; a barra; o computador |
| lista, escritórios, Campinas, sem site, site com problema | 7 | a tela real com os dois grupos |
| Mappoa, sistema, cidade | 8 | o rótulo MAPPOA, a lista rolando, o robô |
| Antes, loja por loja / Agora, cidade acende | 9 | ele de óculos numa loja só / os pinos verdes em todas |
| computador, mappoa.com | 10 | a barra digitada no quarto |

### Frase 1: gancho (0 a ~3,5 s)

- **NA TELA:** o Enzo de óculos de raio-X no meio do calçadão, os feixes vermelhos saindo das lentes; as três lojas da
  esquerda com a moldura vermelha piscando e as plaquinhas 1, 2 e 3. A frase da capa no topo
- **MOSTRA:** personagem, oculos, padaria
- **CENÁRIO:** a rua entre prédios de dia
- **ENTRA AGORA:** tudo já aceso no 1º quadro (o absurdo já acontecendo)
- **OBJETOS SE MEXENDO:** as molduras piscando, as plaquinhas pulando, os feixes varrendo
- **PERSONAGEM:** de óculos, olhando as lojas; em "três": aponta
- **CÂMERA:** 4 cortes de ~0,85 s: (1) perto, o rosto com o óculos brilhando; (2) a padaria acendendo; (3) a loja e a
  farmácia acendendo; (4) aberto, de frente, o Enzo e as três lojas, topo livre
- **EFEITOS VISUAIS:** "3 sinais" (laranja) em "sinais"
- **SONS:** estrondo + zumbido no 1º quadro; whoosh em cada corte; zap em cada loja acendendo

### Frase 2: o Enzo (~3,5 a ~7 s)

- **NA TELA:** o Enzo de frente, ainda sem o óculos; em "óculos" ele põe o óculos e as lentes acendem
- **MOSTRA:** personagem, oculos
- **PERSONAGEM:** mostrando; põe o óculos; cara de decidido
- **CÂMERA:** (1) médio chegando, de frente; (2) em "óculos": perto, o rosto
- **EFEITOS VISUAIS:** "Web designer" (azul) em "designer"
- **SONS:** whoosh no corte; liga quando acende

### Frase 3: sinal um (~7 a ~10,5 s)

- **NA TELA:** o feixe batendo na padaria; a ficha do Maps salta: "Padaria Pão Dourado ★4,7 · Site: —" e o ✗ vermelho
- **MOSTRA:** padaria, ficha, personagem
- **PERSONAGEM:** olha a padaria, aponta
- **CÂMERA:** (1) por cima do ombro dele, a padaria; (2) em "site": perto da ficha
- **EFEITOS VISUAIS:** a plaquinha 1 grande; "Sem site" (vermelho) em "site"
- **SONS:** zap; etiqueta; errado no ✗

### Frase 4: sinal dois (~10,5 a ~15 s)

- **NA TELA:** a loja; a ficha com "Site: instagram.com/lojabella"; em "Clica" um dedo clica e abre o perfil do Instagram
- **MOSTRA:** loja, ficha, insta
- **PERSONAGEM:** desconfiado; em "Instagram": cara de "ahá"
- **CÂMERA:** (1) chegando na loja de lado; (2) em "Clica": perto, o perfil abrindo
- **EFEITOS VISUAIS:** a plaquinha 2; "Só Instagram" (laranja)
- **SONS:** zap; clique; etiqueta

### Frase 5: sinal três (~15 a ~18,5 s)

- **NA TELA:** a farmácia; a ficha com o site; a janela do navegador abre e mostra "Esta página não está disponível",
  tremendo
- **MOSTRA:** farmacia, erro, personagem
- **PERSONAGEM:** surpreso
- **CÂMERA:** (1) da rua, a farmácia; (2) em "abre": perto, a janela de erro
- **EFEITOS VISUAIS:** a plaquinha 3; "Site não abre" (vermelho)
- **SONS:** zap; errado; racha

### Frase 6: loja por loja (~18,5 a ~22 s)

- **NA TELA:** o Enzo largado sentado no meio do calçadão, suado, o óculos torto; o contador de hora sobe de 8h a 18h
- **MOSTRA:** personagem, relogio
- **PERSONAGEM:** cansado
- **CÂMERA:** de cima, afastando: ele pequeno no meio da rua comprida (a quantidade de lojas que faltam)
- **EFEITOS VISUAIS:** "O dia inteiro" (vermelho); o jogo congela em preto e branco
- **SONS:** congela (o jogo); errado

### Frase 7: a virada e a lista (~22 a ~31 s)

- **NA TELA:** (1) no quarto, ele tira o óculos; (2) a moeda cai no teclado, "Investir"; (3) a barra mappoa.com
  digitada; (4) a lista real sobe: SEM SITE e SITE COM PROBLEMA
- **MOSTRA:** personagem, navegador, tela
- **PERSONAGEM:** tira o óculos decidido; põe a moeda; digita; em "lista": levanta e aponta
- **CÂMERA:** perto no rosto; o monitor e ele; chegando no endereço; afastando, a lista
- **EFEITOS VISUAIS:** "Investir" (azul); "Campinas" (azul)
- **SONS:** whoosh; pingo da moeda; cliques; brilho; bips

### Frase 8: o Mappoa (~31 a ~35 s)

- **NA TELA:** o palco; a lista real gigante rolando; o robô acenando; o Enzo chamando
- **MOSTRA:** tela, robo, personagem
- **CÂMERA:** chegando de baixo; passando da esquerda
- **EFEITOS VISUAIS:** o rótulo MAPPOA; "Quem precisa de site" (verde)
- **SONS:** brilho; ding; certo

### Frase 9: Antes x Agora (~35 a ~40 s)

- **NA TELA:** (Antes) o Enzo de óculos numa loja só, apertando os olhos; (Agora) sem óculos, no meio da rua, e os
  pinos verdes acendendo em todas as lojas dos dois lados, um atrás do outro
- **MOSTRA:** personagem, pinos
- **CÂMERA:** (1) perto, o Enzo e uma loja; (2) de baixo pra cima, a rua inteira com os pinos
- **EFEITOS VISUAIS:** "Loja por loja" (vermelho); "A cidade inteira" (verde)
- **SONS:** zumbido; avança (o jogo); bip em cada pino; festa

### Frase 10: o fim (~40 a ~44 s) e o cartão

- **NA TELA:** o quarto; o cartão de seguir entra em "Segue"; a barra mappoa.com digitada em "digita"; o robô acenando
- **MOSTRA:** personagem, navegador, monitor
- **CÂMERA:** médio chegando, de frente; aberto parado
- **SONS:** clique do botão; cliques do teclado; ding; final
