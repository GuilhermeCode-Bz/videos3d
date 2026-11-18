# A mesma segunda-feira: roteiro e ficha de cena

> Lote "3 vídeos totalmente diferentes" (18/11/2026, feito na nuvem). Formato novo: LOOP DE TEMPO. O Rafa, web
> designer, está preso na mesma segunda-feira e o dia só acaba quando ele fecha um cliente. Nada de "esperar o cliente
> com metáfora", nada de duplo sentido: é a regra do jogo (o loop) que dá a tensão, e o Mappoa é a saída do loop.

## Roteiro

1. O Rafa acordou na mesma segunda-feira. Pela quinta vez. *(gancho)*
2. Toda segunda, ele posta o portfólio e espera um cliente aparecer.
3. Às seis da tarde, zero clientes. E o dia volta pro começo.
4. Na sexta segunda, ele tenta panfleto na rua. Choveu.
5. Na sétima, ele entende: o dia só acaba se ele fechar um cliente.
6. Então ele decide investir o preço de um café num sistema que acha quem precisa de site.
7. No computador, ele digita mappoa.com, e vem a lista das barbearias de Recife sem site.
8. Esse é o *Mappoa*, um sistema que mostra quem tem mais chance de comprar.
9. Ele abre a Barbearia do Zé: o WhatsApp, nota 91 e a mensagem pronta.
10. Às cinco e cinquenta e nove, o Zé responde: fechado.
11. E pela primeira vez, o Rafa acorda numa terça.
12. Segue pra ver mais. No computador, digita mappoa.com e testa você também.

~130 palavras, uns 50 segundos.

**Ganchos pensados:** (A, escolhido) "O Rafa acordou na mesma segunda-feira. Pela quinta vez." · (B) "Faz cinco dias que
é segunda-feira pro Rafa." · (C) "O despertador do Rafa toca na mesma segunda há cinco dias." Fico com o A: a 2ª frase
curtinha ("Pela quinta vez.") deixa a curiosidade aberta e o despertador gigante pulando dá a imagem absurda.

**Do que aprendeu:** gancho em 3ª pessoa com imagem absurda e curiosidade aberta; HISTÓRIA com regra, tentativas,
tropeço e virada (Dia 5, 6, 7); o Mappoa é um capítulo (investe → digita mappoa.com → lista com número → nome numa
frase → abre UMA empresa com WhatsApp, score e mensagem); fim com punchline (acorda na terça) e o CTA novo.

**Cuidados do produto:** o Mappoa não manda mensagem sozinho nem fecha: o Rafa manda e o Zé responde. Sem valor, sem
"grátis": "investir o preço de um café".

## Ficha de cena

**Cenários:** `home_office` (o quarto do Rafa: frases 1-3, 5-7, 9-12), `rua_predios` (o panfleto na chuva: frase 4) e
`mundo_mappoa` (o palco da marca: frase 8). **Hora:** dia. **Personagem:** o do canal (Rafa), camiseta azul.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `despertador` | despertador gigante que pula tocando | `K.m3d('despertador', { tam: 2.6 })` | ~1,6 m, vermelho | chão do quarto, à direita da mesa | 1, 3, 5, 10, 11 |
| `calendario` | folha de calendário grande na parede: SEGUNDA / TERÇA | folha desenhada (canvas) | 1,0 × 1,2, branco e vermelho | parede do fundo, ao lado da janela | 1, 3, 11 |
| `folhas` | folhas do calendário voando de volta | 4 folhas desenhadas | 0,5 m | saem do calendário | 1, 3 |
| `monitor` | o computador do Rafa | `K.computador` | mesa de madeira | `[-0.5, 0, -1.3]` | 2, 5-7, 9-12 |
| `celular` | o celular na mão com o post do portfólio (1 curtida) e a resposta do Zé | `K.celular` | escala 1,8 | na mão do Rafa | 2, 10 |
| `relogio` | relógio de parede grande que gira pra trás | `K.m3d('relogio_parede')` escala 2 | branco e preto | parede do fundo | 3 |
| `panfletos` | os panfletos "FAÇO SITES" | folhas desenhadas | 0,3 m | na mão e caindo na calçada | 4 |
| `cafe` | a xícara de café que vira moeda | `K.m3d('caneca')` | branca | na mão do Rafa | 6 |
| `navegador` | a barra com mappoa.com | `K.painelMappoa(2.3, 0.4)` | branco, letras marinho | acima do computador | 7, 12 |
| `tela` | a tela do Mappoa (lista, análise, mensagem) | `K.painelMappoa` | 1,4 × 2,33 | do lado do computador / palco | 7-9 |
| `robo` | o robô do Mappoa | `K.roboMappoa` | | palco | 8, 12 |
| `contrato` | a folha com o carimbo FECHADO | folha desenhada | 0,6 × 0,8 | entre o celular e a câmera | 10 |
| `personagem` | o Rafa | `K.boneco` com as cores do canal | 1,47 m | o quarto, a rua, o palco | todas |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| segunda-feira, terça | 1, 3, 11 | o `calendario` (SEGUNDA, depois TERÇA) |
| quinta vez, sexta, sétima | 1, 4, 5 | etiqueta "Segunda nº 5 / 6 / 7" |
| portfólio, cliente | 2 | o post no `celular`, 1 curtida |
| seis da tarde, zero clientes | 3 | o `relogio` nas 6 e a etiqueta "0 clientes" |
| panfleto, rua, chuva | 4 | `panfletos`, a rua, `K.chuva` |
| café | 6 | a `cafe` que vira moeda |
| computador, mappoa.com | 7, 12 | `monitor` e `navegador` |
| lista, barbearias, Recife | 7 | a `tela` com a lista |
| Mappoa | 8 | o palco, o `robo` e o rótulo |
| Barbearia do Zé, WhatsApp, nota, mensagem | 9 | a `tela` com a análise (91/100) e a mensagem pronta |
| cinco e cinquenta e nove, Zé, fechado | 10 | o `despertador` nas 5:59, a resposta no `celular`, o `contrato` |

### Cena por cena

**O fundo:** o quarto do freelancer de dia (estante, janela com o céu, a mesa com o computador). Na rua: o calçadão
entre prédios, gente andando. No palco: o logo gigante, cartões e pinos flutuando.

#### 1 · plano `gancho` · ~4 s
> "O Rafa acordou na mesma segunda-feira. Pela quinta vez."
- NA TELA: o despertador gigante pulando e tocando do lado da mesa; o Rafa dormindo debruçado na mesa; o calendário SEGUNDA na parede
- MOSTRA: despertador, calendario, personagem
- CENÁRIO: o quarto de dia
- ENTRA AGORA: as folhas do calendário voando de volta pra parede em "mesma"
- OBJETOS SE MEXENDO: o despertador pula e balança o tempo todo; as folhas voam de volta
- PERSONAGEM: começo dormindo debruçado (Zzz) · em "acordou": pula de susto · em "quinta": mão na testa
- INTERAÇÃO: o despertador toca do lado dele
- CÂMERA: 1 (0-0,7 s) chegando, perto, no despertador, de baixo · 2 (0,7-1,4 s) no calendário com as folhas · 3 o Rafa de susto, médio, lado 25 · 4 em "quinta", mais perto
- EFEITOS VISUAIS: etiqueta laranja "Segunda nº 5" em "quinta"
- SONS: o toque (zumbido + ding repetido), rebobina nas folhas, susto (whoosh)

#### 2 · plano `posta` · ~3,5 s
> "Toda segunda, ele posta o portfólio e espera um cliente aparecer."
- NA TELA: o Rafa sentado de lado na cadeira com o celular grande na mão: o post "Projeto novo!" e 1 curtida
- MOSTRA: personagem, celular, monitor
- CENÁRIO: o quarto
- ENTRA AGORA: o post aparece em "posta"; a curtida em "espera"
- OBJETOS SE MEXENDO: o celular sobe pra frente do rosto
- PERSONAGEM: começo mexendo no celular · em "espera": olha o relógio do pulso
- INTERAÇÃO: ele posta e fica olhando a tela
- CÂMERA: 1 chegando, perto, lado 22 · 2 passando, lado -20
- EFEITOS VISUAIS: etiqueta "1 curtida" em "aparecer"
- SONS: cliques, ding fraco

#### 3 · plano `volta` · ~4 s
> "Às seis da tarde, zero clientes. E o dia volta pro começo."
- NA TELA: o relógio de parede nas 6; a etiqueta "0 clientes"; depois os ponteiros girando pra trás, clarão e o calendário voltando
- MOSTRA: relogio, personagem, calendario
- CENÁRIO: o quarto
- ENTRA AGORA: a etiqueta em "zero"; o giro pra trás em "volta"
- OBJETOS SE MEXENDO: os ponteiros giram pra trás, as folhas voltam pro calendário
- PERSONAGEM: começo triste olhando o celular · em "volta": susto, é puxado pra trás
- INTERAÇÃO: o dia "puxa" ele de volta
- CÂMERA: 1 no relógio, chegando · 2 abrindo pro quarto inteiro, afastando
- EFEITOS VISUAIS: "0 clientes" vermelho em "zero"; ✗; clarão branco em "começo"
- SONS: errado em "zero", rebobina em "volta"

#### 4 · plano `panfleto` · ~3,5 s
> "Na sexta segunda, ele tenta panfleto na rua. Choveu."
- NA TELA: o Rafa no calçadão com o bolo de panfletos FAÇO SITES, gente passando sem pegar; em "Choveu", a chuva cai e os panfletos caem no chão
- MOSTRA: personagem, panfletos
- CENÁRIO: a rua entre prédios de dia; gente andando
- ENTRA AGORA: a chuva em "Choveu"
- OBJETOS SE MEXENDO: um panfleto oferecido, depois todos caindo
- PERSONAGEM: começo oferecendo o panfleto (braço esticado) · em "Choveu": triste, encolhe os ombros
- INTERAÇÃO: ninguém pega o panfleto
- CÂMERA: 1 seguindo de frente · 2 de cima, a chuva caindo nele
- EFEITOS VISUAIS: etiqueta "Segunda nº 6" em "sexta"
- SONS: passos, chuva (respingo/água), errado

#### 5 · plano `regra` · ~3,5 s
> "Na sétima, ele entende: o dia só acaba se ele fechar um cliente."
- NA TELA: de novo o despertador tocando; o Rafa dá um tapa nele e para; balão de pensamento "Fechar 1 cliente"
- MOSTRA: personagem, despertador
- ENTRA AGORA: o balão em "entende"
- PERSONAGEM: começo bravo, bate no despertador · em "fechar": ideia (aponta pra cima)
- CÂMERA: 1 de baixo, o despertador grande · 2 chegando no rosto dele, médio
- EFEITOS VISUAIS: etiqueta "Segunda nº 7"; balão "Fechar 1 cliente"
- SONS: baque no tapa, ding da ideia

#### 6 · plano `investe` · ~4 s
> "Então ele decide investir o preço de um café num sistema que acha quem precisa de site."
- NA TELA: o Rafa de pé do lado da mesa com a xícara de café; a xícara vira moeda e cai no teclado; a tela mostra o mapa com pinos
- MOSTRA: personagem, cafe, monitor
- ENTRA AGORA: o poof em "sistema"
- PERSONAGEM: segurando o café · em "decide": sim com a cabeça · em "sistema": digita
- CÂMERA: 1 chegando nele · 2 subindo pra tela
- EFEITOS VISUAIS: "Investir" azul em "investir"
- SONS: estalo, pingo da moeda, estalinhos dos pinos

#### 7 · plano `lista` · ~4 s
> "No computador, ele digita mappoa.com, e vem a lista das barbearias de Recife sem site."
- NA TELA: a barra mappoa.com sendo digitada acima do computador; a lista sobe: "Barbearias · Recife", SEM SITE 41
- MOSTRA: navegador, tela, personagem
- ENTRA AGORA: a barra em "computador"; a lista em "lista"
- PERSONAGEM: digitando · em "lista": levanta e aponta
- CÂMERA: 1 perto no endereço · 2 afastando, frente
- EFEITOS VISUAIS: "Recife" azul em "Recife"
- SONS: teclas, brilho, bips

#### 8 · plano `mappoa` · ~3,5 s
> "Esse é o Mappoa, um sistema que mostra quem tem mais chance de comprar."
- NA TELA: o palco da marca; a tela grande cai do alto com a análise; o robô acenando; o Rafa do lado
- MOSTRA: tela, robo, personagem
- PERSONAGEM: chamando · em "comprar": comemora
- CÂMERA: 1 chegando, de baixo · 2 passando
- EFEITOS VISUAIS: o rótulo "Mappoa"; "Quem tem chance" verde
- SONS: brilho, ding, certo

#### 9 · plano `empresa` · ~4 s
> "Ele abre a Barbearia do Zé: o WhatsApp, nota 91 e a mensagem pronta."
- NA TELA: a tela do lado do computador: a ficha da Barbearia do Zé com o WhatsApp, a barra subindo até 91/100; em "mensagem", vira a mensagem pronta
- MOSTRA: tela, personagem, monitor
- PERSONAGEM: sentado, clica · em "pronta": vira pra câmera, sim
- CÂMERA: 1 perto da tela, lado -15 · 2 chegando, frente
- EFEITOS VISUAIS: "WhatsApp ✓" verde; "91/100"
- SONS: clique, bip na nota, certo

#### 10 · plano `fecha` · ~3,5 s
> "Às cinco e cinquenta e nove, o Zé responde: fechado."
- NA TELA: o despertador grande nas 5:59; o Rafa com o celular: "Fechado! 👊"; o contrato com o carimbo FECHADO
- MOSTRA: despertador, celular, personagem
- PERSONAGEM: começo roendo a unha olhando o celular · em "fechado": comemora pulando
- CÂMERA: 1 no despertador · 2 nele com o celular, médio
- EFEITOS VISUAIS: carimbo FECHADO em "fechado"; ✓
- SONS: tic-tac (clique), ding da mensagem, festa

#### 11 · plano `terca` · ~3 s
> "E pela primeira vez, o Rafa acorda numa terça."
- NA TELA: o quarto de manhã; o calendário vira pra TERÇA; o despertador tocando normal; o Rafa espreguiça e sorri
- MOSTRA: calendario, personagem, despertador
- PERSONAGEM: começo dormindo · em "terça": acorda e comemora
- CÂMERA: 1 no calendário virando · 2 nele de frente, chegando
- EFEITOS VISUAIS: etiqueta verde "Terça!" em "terça"
- SONS: ding, festa

#### 12 · plano `segue` · ~4 s
> "Segue pra ver mais. No computador, digita mappoa.com e testa você também."
- NA TELA: o cartão de seguir entra em "Segue" e vira "Seguindo"; a barra mappoa.com sendo digitada em "digita"; o robô acenando
- MOSTRA: personagem, navegador, monitor
- PERSONAGEM: chamando · em "digita": digitando
- CÂMERA: 1 chegando · 2 parado, aberto, topo livre
- SONS: clique do seguir, teclas, ding
