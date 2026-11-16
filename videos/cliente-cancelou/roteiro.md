# O cliente cancelou hoje. Se ele era o único, você tá sem renda: roteiro e ficha de cena

> Ideia escolhida pelo dono em 11/11/2026, depois de ele lembrar que a dor do público é **achar o próximo cliente**.
> O Lucas, web designer, vivia de um cliente só (a manutenção do site de uma imobiliária, todo mês), e o cliente
> cancelou. A virada: o erro não foi perder o cliente, foi não saber quem seria o próximo; e o próximo é a empresa que
> já tem o problema que você resolve. Feito com o que a retenção ensinou: conflito na tela no 1º segundo (a mensagem
> "vamos encerrar" chegando), o personagem já dentro da ação (sem "Esse é o ..."), tempo na dor e na virada, o Mappoa
> curto, começando pelo mappoa.com digitado no computador e pela lista pronta, 45 a 60 s. O Mappoa é um **sistema de
> prospecção** (nunca "um site").

## Roteiro

1. O cliente cancelou hoje. Se ele era o único, você tá sem renda. *(gancho)*
2. O Lucas é web designer e cuidava do site de uma imobiliária, todo mês.
3. Sem esse contrato, o pagamento do mês sumiu, e a agenda ficou vazia.
4. Aí o Lucas decide ir atrás de cliente. Mas não sabe como, nem pra quem oferecer. *(o dono pediu: ele não espera indicação, vai atrás, mas fica perdido, 11/11/2026)*
5. O erro não foi perder o cliente. Foi não saber quem seria o próximo.
6. E o próximo cliente é a empresa que já tem o problema que você resolve.
7. Pra quem faz site, é a oficina que ainda não tem um.
8. Aí o Lucas digita mappoa.com no computador, e vem a lista das oficinas de Joinville sem site.
9. Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço.
10. Antes, um cancelamento zerava o mês. Agora, quando um cliente sai, o Lucas já tem a lista dos próximos.
11. Quantos clientes você tem hoje? Comenta aí e segue pra não ficar sem nenhum. No computador, digita mappoa.com e testa você também.

Cerca de 160 palavras, uns 52 segundos, 11 frases (uns 900 caracteres da ElevenLabs).

**Onde o tempo vai:** gancho e dor (1 a 4) uns 19 s · a virada (5 a 7) uns 11 s · o Mappoa (8 e 9) uns 9 s, começando
pelo mappoa.com digitado e pela lista, contado dentro da história do Lucas · o fim (10 e 11) uns 13 s.

**Gancho escolhido:** A (o "cancelou" chega na tela no 1º quadro e o "sem renda" dá o susto). Opções:
- **A:** "O cliente cancelou hoje. Se ele era o único, você tá sem renda." (na tela, no 1º quadro: o celular gigante com a
  mensagem "Oi, Lucas. Vamos encerrar o contrato do site." chegando, e o gráfico da renda despencando pro zero)
- **B:** "Chegou a mensagem: 'vamos cancelar'. Se você só tinha esse cliente, o mês acabou."
- **C:** "Seu único cliente cancelou. Se você não sabe quem é o próximo, começa do zero."

**Capa:** "Cliente *cancelou*?" (17 letras, cabe numa linha), com o Lucas desesperado, as mãos na cabeça, na frente do celular
gigante com o "Vamos encerrar o contrato" e o gráfico da renda no zero.

## O que foi conferido

- Sem preço, sem plano e sem número falado. "Todo mês" e "um cliente só" são da história do Lucas, não estatística. Na tela,
  o score só como "NN/100" da análise (é como o Mappoa mostra), sem total de leads no topo
- O que o Mappoa faz aqui está em `canal/produto.md`: a busca por segmento e cidade ("oficinas mecânicas em Joinville"), a
  lista já separada em COM SITE e SEM SITE (8) e a análise com o score, as dores e as oportunidades (9). Nada de "garante a
  venda", nem de "manda a mensagem sozinho"
- O Mappoa é "um sistema que acha quem precisa do seu serviço" (9), o nome numa frase só, com 12 palavras, e o mappoa.com
  já entra na 8, digitado no computador, dentro da história. A assinatura do fim continua
- Sem "Esse é o Lucas": ele aparece já dentro da ação (frase 2)
- O fim dá motivo pra seguir ("segue pra não ficar sem nenhum") e a pergunta divide quem comenta (quem tem um cliente só
  e quem tem vários)
- Empresas inventadas: Imobiliária Lar Novo (o cliente que cancelou), Mecânica Boa Vista (o próximo) e as outras da
  lista. Cidade: Joinville, SC. Nicho de oficina, longe de comida, academia, salão e clínica dos vídeos anteriores
- Nenhuma frase repete os vídeos anteriores (a 9 é nova; o "já sabe quem é o próximo" do proximo-cliente virou "já tem a
  lista dos próximos")

## Ficha de cena

**Cenários (cinco, com `K.cenarios`):** `home_office` (1, 3, 4, 8, 10 "Antes" e 11: o quarto do Lucas, de dia; na 4 vira
noite), `cidade` (2: a calçada na frente da Imobiliária Lar Novo), `cidade_maquete` (5 e 6: a cidade em miniatura),
`oficina` (7 e o "Agora" da 10: a Mecânica Boa Vista) e `mundo_mappoa` (9: o palco da marca).
**Hora:** dia, menos no fim da 4 (a janela escurece enquanto ele espera).
**Peças dos cenários que entram:** a mesa, o ring light e a janela do quarto (1, 3, 4, 8, 11), os carros passando na rua
(2), os prédios e carrinhos da maquete (5 e 6), o elevador de carro e as ferramentas da oficina (7 e 10), o logo gigante e
os pinos (9).
**Personagens:** o do canal, chamado Lucas, em todas. A **dona da imobiliária** (`K.boneco` tipo menina, blazer cinza,
`K.semNome`) na 2. O **mecânico** (`K.boneco`, macacão azul-marinho, `K.semNome`) na 7 e no "Agora" da 10. **O robô do
Mappoa** só na 9 e na 11.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Lucas, o web designer | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 11 |
| `celular` | celular gigante com a conversa "Imobiliária Lar Novo": a mensagem "Oi, Lucas. Vamos encerrar o contrato do site." | `K.celular()` + tela desenhada | escala 5,5 (gancho) / 1,8 (na mão) | no ar, na frente / na mão | 1, 4, 7, 10, capa |
| `grafico` | o gráfico da renda do Lucas: as barras dos meses, a do mês caindo pro zero | `K.m3d('grafico_barras')` | 1,3, barras verdes que ficam vermelhas | no ar, ao lado do celular / na mesa | 1, 10 |
| `imobiliaria` | a fachada da Imobiliária Lar Novo, com a placa | prédio `kenney-cidade` + placa azul "Lar Novo Imóveis" | prédio 5× | calçada, a partir de x -21 | 2 |
| `dona` | a dona da imobiliária | `K.boneco` tipo menina, blazer cinza | 1,47 | na porta da imobiliária | 2 |
| `tablet` | o tablet com o site da imobiliária | `K.m3d('tablet')` + tela desenhada | 0,6 | na mão do Lucas | 2 |
| `calendario` | o calendário: os meses com ✓ (na 2) e depois as páginas em branco (na 3) | `K.m3d('calendario')` | 1,2, branco com faixa vermelha | no ar ao lado do Lucas / na parede | 2, 3 |
| `moedas` | as moedas do pagamento do mês, sumindo do pote | `K.m3d('moeda_contato')` × 5 + pote (`K.pecas` cilindro) | 0,35 cada, douradas | na mesa, ao lado do monitor | 3 |
| `monitor` | o computador do Lucas | `K.computador` com tela desenhada | escala 1,55 | mesa do home office | 3, 8, 11 |
| `mapa` | o Maps aberto no celular grande, cheio de pinos de empresa de todo tipo (padaria, academia, loja, clínica...) | `K.celular()` + tela desenhada, pinos com `K.m3d('pino')` saltando pra fora | celular escala 3, pinos 0,3 | no ar, na frente do Lucas | 4 |
| `duvidas` | os balões "Como?" e "Pra quem?" e os "?" girando na cabeça dele | `K.m3d('balao_chat')` × 2 + texto 3D "?" × 3 | 0,7, brancos | em volta da cabeça do Lucas | 4 |
| `interrogacoes` | os "?" em cima dos prédios da maquete | texto 3D "?" × 8 | 0,6, branco | em cima dos prédios | 5 |
| `alvos` | as oficinas que já têm o problema, acesas com um alvo em cima | `K.m3d('alvo')` × 3 + `K.m3d('prediozinho', { placa: 'OFICINA' })` × 3 | 0,9, vermelho e branco | no quarteirão do meio da maquete | 6 |
| `mecanico` | o dono da Mecânica Boa Vista | `K.boneco`, macacão azul-marinho | 1,47 | perto do elevador de carro | 7, 10 |
| `navegador` | barra grande com mappoa.com | `K.painelMappoa` | 2,5 × 0,42 | acima do computador | 8, 11 |
| `tela` | painel do Mappoa: a lista das oficinas de Joinville (COM SITE / SEM SITE), depois a análise da Mecânica Boa Vista | `K.painelMappoa` | 1,56 × 2,6 | sobe do computador / palco | 8, 9, 10 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, home office | 9, 11 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| cliente, cancelou | 1 | o `celular` gigante com o "Vamos encerrar o contrato do site." chegando |
| único, sem renda | 1 | etiqueta "Único cliente"; o `grafico` com a barra do mês despencando pro zero |
| web designer, site, imobiliária, todo mês | 2 | etiqueta "Web designer"; a `imobiliaria` com a `dona`; o `tablet` com o site; o `calendario` com um ✓ em cada mês |
| contrato, pagamento, agenda vazia | 3 | as `moedas` sumindo do pote; o `calendario` na parede com as páginas em branco |
| ir atrás de cliente | 4 | o Lucas levanta decidido e abre o `mapa` no celular |
| como, pra quem oferecer | 4 | os `duvidas`: os balões "Como?" e "Pra quem?" e os "?"; os pinos de todo tipo pulando do `mapa` |
| perder o cliente, próximo | 5 | a maquete: a imobiliária some; os `interrogacoes` em cima de todos os prédios |
| empresa, problema que você resolve | 6 | 3 oficinas sobem no quarteirão do meio com os `alvos` em cima |
| oficina, não tem site | 7 | a `oficina` com o `mecanico`; no `celular`, a ficha do Maps com "Site: —"; ✗ "Sem site" |
| mappoa.com, computador | 8 | o `navegador` com mappoa.com sendo digitado acima do `monitor` |
| lista, oficinas, Joinville, sem site | 8 | a `tela` subindo com "Oficinas mecânicas · Joinville, SC" e o grupo SEM SITE |
| Mappoa, sistema, precisa do seu serviço | 9 | rótulo "Mappoa"; a `tela` com a análise da Mecânica Boa Vista; o `robo` |
| cancelamento, mês zerado (antes) | 10 | o `celular` com o "Vamos encerrar" e o `grafico` no zero, em preto e branco |
| cliente sai, lista dos próximos (agora) | 10 | a mesma mensagem chega, e o Lucas, na oficina, mostra a `tela` com a lista |
| clientes, computador, mappoa.com | 11 | `monitor` e `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~4,5 s
> "O cliente cancelou hoje. Se ele era o único, você tá sem renda."

- **NA TELA:** no home office, o `celular` gigante no centro, de pé no ar, virado pra câmera, com a conversa de WhatsApp "Imobiliária Lar Novo"; a mensagem "Oi, Lucas. Vamos encerrar o contrato do site." chegando; à esquerda, o `grafico` com as barras dos meses; o Lucas à direita do celular, segurando o celular pequeno; atrás, a mesa e o monitor
- **MOSTRA:** `["celular", "grafico", "personagem"]`
- **CENÁRIO:** `home_office` de dia; o ring light e a planta atrás
- **ENTRA AGORA:** o balão "digitando..." já está no 1º quadro; na palavra "cancelou", a mensagem "Vamos encerrar o contrato do site." cai na conversa com um tranco; na palavra "único", o `grafico` surge à esquerda; na palavra "renda", a barra do mês despenca
- **OBJETOS SE MEXENDO:** o celular treme na chegada da mensagem; as barras do gráfico ficam vermelhas e a do mês cai até o zero na palavra "renda"
- **PERSONAGEM:** à direita do celular, de frente pra câmera · começo: `segurando` o celular, tranquilo · na palavra "cancelou": `susto` · na palavra "renda": `desespero`, as mãos na cabeça
- **INTERAÇÃO:** a mensagem chega no celular do Lucas, e a barra que despenca cai do lado dele
- **CÂMERA:** alvo `[celular, grafico, personagem]`, centro, celular ocupando 1/2 da altura · `chegando` · perto · frente · olho, topo livre (espacoCima 0,3) · começa já com a mensagem legível
- **EFEITOS VISUAIS:** a capa no topo ("Cliente *cancelou*?", o motor põe) · etiqueta laranja "Único cliente" (palavra "único") · ✗ vermelho em cima do gráfico (palavra "renda")
- **SONS:** `bip` da mensagem (palavra "cancelou") · `errado` (palavra "único") · `desliga` da barra caindo (palavra "renda")

#### 2 · plano `antes` · ~4,5 s
> "O Lucas é web designer e cuidava do site de uma imobiliária, todo mês."

- **NA TELA:** na calçada, a fachada da `imobiliaria` à esquerda, com a placa azul "Lar Novo Imóveis"; a `dona` na porta; o Lucas no centro, de frente pra ela, mostrando o `tablet` com o site da imobiliária; à direita, no ar, o `calendario`
- **MOSTRA:** `["imobiliaria", "personagem", "calendario"]`
- **CENÁRIO:** `cidade` de dia; os carros passando na rua atrás
- **ENTRA AGORA:** etiqueta "Web designer" na palavra "designer"; o site acende no tablet na palavra "site"; o `calendario` surge na palavra "todo"
- **OBJETOS SE MEXENDO:** as páginas do calendário viram uma atrás da outra a partir de "todo", cada uma ganhando um ✓ verde; a dona faz joia na palavra "imobiliária"
- **PERSONAGEM:** no centro, virado pra dona · começo: `mostrando` o tablet, animado · na palavra "mês": `vitoria` curta, tranquilo
- **INTERAÇÃO:** o Lucas mostra o site no tablet e a dona aprova com joia
- **CÂMERA:** alvo `[imobiliaria, personagem, calendario]`, centro · `passando` · médio · esquerda · olho (antes: chegando, perto, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · ✓ verde em cada página do calendário (a partir de "todo")
- **SONS:** `ding` (palavra "site") · `bip` a cada ✓ · carros passando (o cenário põe)

#### 3 · plano `vazia` · ~4,5 s
> "Sem esse contrato, o pagamento do mês sumiu, e a agenda ficou vazia."

- **NA TELA:** no home office, o `monitor` na mesa; ao lado, o pote com as `moedas`; na parede, o `calendario` grande; o Lucas sentado na cadeira, na frente da mesa
- **MOSTRA:** `["moedas", "calendario", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a janela clara
- **ENTRA AGORA:** o pote já cheio de moedas no 1º quadro; na palavra "contrato", um papel "Contrato" rasga no ar acima do pote
- **OBJETOS SE MEXENDO:** na palavra "sumiu", as moedas saem do pote voando pra cima, uma atrás da outra, e somem com um brilho; na palavra "vazia", as páginas do calendário viram todas em branco e ele desbota pra cinza
- **PERSONAGEM:** na cadeira, de frente pra câmera · começo: `pensando`, olhando o pote · na palavra "vazia": `triste`, olhando o calendário
- **INTERAÇÃO:** o Lucas tenta segurar a última moeda, que escapa da mão dele
- **CÂMERA:** alvo `[moedas, calendario, personagem]`, centro · `afastando` · médio · direita · baixo (antes: passando, médio, esquerda, olho: muda movimento, lado e altura)
- **EFEITOS VISUAIS:** etiqueta vermelha "Sem pagamento" (palavra "sumiu") · etiqueta vermelha "Agenda vazia" em cima do calendário (palavra "vazia")
- **SONS:** `rasga` do contrato (palavra "contrato") · `whoosh` das moedas sumindo (palavra "sumiu") · `desliga` (palavra "vazia")

#### 4 · plano `perdido` · ~5 s · jogo `falha`
> "Aí o Lucas decide ir atrás de cliente. Mas não sabe como, nem pra quem oferecer."

- **NA TELA:** no home office, o Lucas de pé no meio do quarto, com o `mapa` (o Maps no celular grande) no ar na frente dele, cheio de pinos de empresa de todo tipo; em volta da cabeça dele, os balões "Como?" e "Pra quem?" e os "?" girando
- **MOSTRA:** `["personagem", "mapa", "duvidas"]`
- **CENÁRIO:** `home_office` de dia; a mesa e a janela atrás
- **ENTRA AGORA:** o Lucas levanta da cadeira na palavra "decide"; o `mapa` abre na frente dele na palavra "atrás"; o balão "Como?" surge na palavra "como"; o balão "Pra quem?" e os "?" na palavra "quem"
- **OBJETOS SE MEXENDO:** a partir de "atrás", pinos de todo tipo (padaria, academia, loja, clínica, oficina) pulam pra fora do mapa, cada vez mais, até encher a frente dele; na palavra "oferecer", os pinos giram em volta dele, embaralhados
- **PERSONAGEM:** começo: `vitoria` curta, levanta decidido, arregaçando a manga · na palavra "como": `pensando`, coçando a cabeça · na palavra "quem": `confuso`, girando pra olhar os pinos de todos os lados
- **INTERAÇÃO:** o Lucas abre o mapa animado, e os pinos que pulam dele cercam e confundem ele
- **CÂMERA:** alvo `[personagem, mapa, duvidas]`, centro · `girando` · perto · esquerda · olho (antes: afastando, médio, direita, baixo) · altura "olho": o quarto tem teto
- **EFEITOS VISUAIS:** etiqueta verde "Vou atrás!" (palavra "decide") · balões brancos "Como?" e "Pra quem?" · no fim, congela em preto e branco (o jogo faz)
- **SONS:** `whoosh` dele levantando (palavra "decide") · `pop` em cada pino · `errado` (palavra "quem") · o congela do preto e branco (o jogo põe)

#### 5 · plano `erro` · ~4,5 s · jogo `corrige`
> "O erro não foi perder o cliente. Foi não saber quem seria o próximo."

- **NA TELA:** a cidade em miniatura vista de cima; o Lucas no meio, grande perto dos prédios pequenos; na palavra "cliente", a imobiliária (um `prediozinho` azul com a placa "Lar Novo") afunda no chão; depois, um "?" em cima de cada prédio em volta
- **MOSTRA:** `["personagem", "interrogacoes"]`
- **CENÁRIO:** `cidade_maquete`; os carrinhos andando nas ruas
- **ENTRA AGORA:** a cor volta no começo (o corrige); a imobiliária afunda na palavra "perder"; os `interrogacoes` surgem um a um a partir de "saber"
- **OBJETOS SE MEXENDO:** a imobiliária desce girando e some; os "?" pulam em cima dos prédios; na palavra "próximo", todos os "?" viram pro Lucas ao mesmo tempo
- **PERSONAGEM:** no centro da maquete · começo: `triste`, olhando o buraco onde estava a imobiliária · na palavra "próximo": `pensando`, a mão no queixo, girando pra olhar os "?"
- **INTERAÇÃO:** o Lucas gira no lugar e cada prédio que ele olha ganha um "?"
- **CÂMERA:** alvo `[personagem, interrogacoes]`, centro · `subindo` · aberto · frente · alto (na maquete a câmera fica alta pra não entrar nos prédios; pinos escondidos) (antes: girando, perto, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta laranja "O erro" (palavra "erro") · etiqueta branca "Quem é o próximo?" (palavra "próximo")
- **SONS:** `baque` da imobiliária afundando (palavra "perder") · `pop` em cada "?"

#### 6 · plano `virada` · ~4,5 s
> "E o próximo cliente é a empresa que já tem o problema que você resolve."

- **NA TELA:** a mesma cidade em miniatura; os "?" somem; no quarteirão do meio, atrás do Lucas, sobem 3 oficinas (`prediozinho` com a placa "OFICINA"), cada uma com um halo laranja e um `alvo` em cima; o Lucas na frente, apontando pra mais perto
- **MOSTRA:** `["alvos", "personagem"]`
- **CENÁRIO:** `cidade_maquete`, os carrinhos continuam andando
- **ENTRA AGORA:** os "?" estouram na palavra "próximo"; as 3 oficinas sobem do chão na palavra "empresa"; os halos acendem e os `alvos` caem em cima delas na palavra "problema"
- **OBJETOS SE MEXENDO:** os alvos caem do alto e giram meia volta; os halos pulsam em laranja; o resto da cidade fica um pouco mais escuro
- **PERSONAGEM:** no meio da maquete, de frente pros alvos · começo: `surpreso` · na palavra "resolve": `ideia` e `apontar` a oficina mais perto
- **INTERAÇÃO:** o Lucas aponta, e a oficina que ele aponta brilha mais forte
- **CÂMERA:** alvo `[alvos, personagem]`, centro · `revelando` · aberto · esquerda · cima (antes: subindo, aberto, frente, alto: muda movimento, lado e altura)
- **EFEITOS VISUAIS:** etiqueta laranja "Já tem o problema" (palavra "problema") · os alvos brilhando
- **SONS:** `pop` dos "?" estourando (palavra "próximo") · `ding` em cada alvo (palavra "problema")

#### 7 · plano `oficina` · ~3,5 s
> "Pra quem faz site, é a oficina que ainda não tem um."

- **NA TELA:** dentro da Mecânica Boa Vista, o elevador com um carro em cima à esquerda; o `mecanico` embaixo do carro, com a chave na mão; o Lucas à direita, com o `celular` na mão mostrando a ficha do Maps da oficina, a linha "Site:" vazia
- **MOSTRA:** `["mecanico", "celular", "personagem"]`
- **CENÁRIO:** `oficina` de dia; as ferramentas na parede, o elevador de carro
- **ENTRA AGORA:** o celular sobe na mão dele na palavra "oficina"; na palavra "não", a linha "Site: —" pisca em vermelho
- **OBJETOS SE MEXENDO:** o celular cresce na tela pra ficar legível; o carro desce um pouco no elevador; o mecânico sai de baixo do carro e acena
- **PERSONAGEM:** à direita do carro · começo: `segurando` o celular, olhando a ficha · na palavra "não": `apontar` o mecânico, com cara de "achei"
- **INTERAÇÃO:** o Lucas compara a ficha do Maps com a oficina na frente dele, e o mecânico acena
- **CÂMERA:** alvo `[mecanico, celular, personagem]`, centro · `chegando` · médio · direita · olho (antes: revelando, aberto, esquerda, cima) · altura "olho": a oficina tem teto
- **EFEITOS VISUAIS:** ✗ vermelho com etiqueta vermelha "Sem site" (palavra "não")
- **SONS:** `metal` da chave do mecânico (no começo) · `errado` (palavra "não")

#### 8 · plano `lista` · ~5 s
> "Aí o Lucas digita mappoa.com no computador, e vem a lista das oficinas de Joinville sem site."

- **NA TELA:** no home office de dia, o `navegador` grande acima do `monitor` com "mappoa.com" sendo digitado; depois a `tela` do Mappoa sobe do computador e fica no centro com "Meus leads", "Oficinas mecânicas · Joinville, SC" e o grupo SEM SITE com os cartões; o Lucas à direita
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a luz da tela acende a mesa
- **ENTRA AGORA:** o navegador surge na palavra "digita" e as letras entram até "computador" (uns 2 s); na palavra "lista", a `tela` sobe do monitor; na palavra "sem", a pílula laranja "SEM SITE" acende no topo do grupo
- **OBJETOS SE MEXENDO:** os cartões descem um a um a partir de "oficinas" (Mecânica Boa Vista, Auto Center Rota Sul, Oficina Dois Irmãos, Freios & Cia)
- **PERSONAGEM:** na cadeira, depois de pé · começo: `segurando`, teclando · na palavra "lista": `surpreso`, levanta e aponta a tela
- **INTERAÇÃO:** ele digita e o sistema responde com a lista
- **CÂMERA:** alvo `[navegador, tela, personagem]`, centro · `subindo` · médio · frente · olho (antes: chegando, médio, direita: muda movimento e lado) · lado "frente" porque o painel olha pro +z
- **EFEITOS VISUAIS:** o endereço mappoa.com grande e legível · etiqueta laranja "Sem site" (palavra "sem")
- **SONS:** `clique` em cada letra · `brilho` da tela subindo (palavra "lista") · `bip` em cada cartão

#### 9 · plano `mappoa` · ~4 s
> "Esse é o *Mappoa*, um sistema que acha quem precisa do seu serviço."

- **NA TELA:** no palco da marca, a `tela` no centro com a análise da Mecânica Boa Vista: "Dados da empresa", o círculo "Aderência à sua oferta 89/100", "Dores prováveis: sem site próprio, cliente só acha pelo Maps", "Oportunidades: site com orçamento pelo WhatsApp"; o `robo` à esquerda; o Lucas à direita
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** o rótulo "Mappoa" na palavra "Mappoa"; a `tela` cai na palavra "sistema"; o score enche na palavra "precisa"; as dores e oportunidades na palavra "serviço"
- **OBJETOS SE MEXENDO:** o anel do score enche de 0 até 89 de "precisa" a "serviço"; os blocos entram de cima pra baixo; o robô aponta a tela
- **PERSONAGEM:** à direita da tela · começo: `chamando` (puxa quem assiste pra ver) · na palavra "serviço": `vitoria`
- **INTERAÇÃO:** o robô entrega a análise e o Lucas comemora
- **CÂMERA:** alvo `[tela, robo, personagem]`, centro · `chegando` · médio · frente · baixo (antes: subindo, médio, frente, olho: muda movimento e altura)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" · etiqueta verde "Precisa de você" (palavra "precisa")
- **SONS:** `brilho` do rótulo · `ding` no score · `certo` (palavra "serviço")

#### 10 · plano `antes_agora` · ~6 s · jogo `avanca`
> "Antes, um cancelamento zerava o mês. Agora, quando um cliente sai, o Lucas já tem a lista dos próximos."

- **NA TELA:** dois momentos: (1) "Antes": o home office em preto e branco, o Lucas com as mãos na cabeça, o `celular` gigante com o "Vamos encerrar" e o `grafico` no zero; (2) "Agora": na oficina, o Lucas calmo, com o `celular` na mão, que recebe uma mensagem de cancelamento; ele vira o celular e mostra a `tela` com a lista das oficinas; o `mecanico` acenando ao lado
- **MOSTRA:** `["personagem", "tela", "mecanico"]`
- **CENÁRIO:** `home_office` → `oficina`
- **ENTRA AGORA:** o gráfico caindo no "Antes"; a oficina na palavra "Agora"; a mensagem chega no celular na palavra "sai"; a `tela` com a lista abre ao lado dele na palavra "lista"
- **OBJETOS SE MEXENDO:** no "Antes", a barra cai pro zero de novo; no "Agora", os cartões da lista descem um a um na palavra "próximos" e o primeiro acende verde
- **PERSONAGEM:** começo: `desespero` (no "Antes") · na palavra "sai": dá de ombros, tranquilo · na palavra "próximos": `mostrando` a lista pro mecânico
- **INTERAÇÃO:** o cancelamento chega e o Lucas, em vez de murchar, abre a lista dos próximos
- **CÂMERA:** (1) alvo `[personagem, celular, grafico]` · `afastando` · médio · direita · olho · (2) alvo `[personagem, tela, mecanico]` · `passando` · médio · esquerda · olho (antes: chegando, médio, frente, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Mês zerado" no "Antes" · etiqueta verde "Os próximos" (palavra "próximos")
- **SONS:** `errado` no "Antes" · `whoosh` na troca · `bip` da mensagem (palavra "sai") · `certo` (palavra "próximos")

#### 11 · plano `segue` · ~8,5 s
> "Quantos clientes você tem hoje? Comenta aí e segue pra não ficar sem nenhum. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Lucas na mesa do home office de dia, na frente do `monitor`; a pergunta no topo; depois o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando à esquerda; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office` de dia, a mesa e a janela clara
- **ENTRA AGORA:** a pergunta no topo na palavra "Quantos"; o cartão de seguir na palavra "segue"; o `navegador` surge na palavra "computador"; as letras a partir de "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde na palavra "testa"
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera, mostrando os dedos contando) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, monitor]`, centro · `parado` · aberto · frente · olho, topo livre (antes: passando, médio, esquerda: muda movimento, plano e lado)
- **EFEITOS VISUAIS:** a pergunta no topo · cartão de seguir no topo (palavra "segue")
- **SONS:** `brilho` do cartão · `clique` das letras · `ding` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Lucas acena e o robô acena ao lado dele.

**Capa:** o Lucas com as mãos na cabeça, cara de desespero, na frente do `celular` gigante com o "Vamos encerrar o
contrato do site." e o `grafico` com a barra do mês no zero. Frase: "Cliente *cancelou*?"

## As cenas em 2 linhas

1. O celular gigante recebe "Vamos encerrar o contrato do site", e o gráfico da renda despenca pro zero. / O Lucas leva um susto e põe as mãos na cabeça; a câmera chega de frente.
2. Na rua, a Imobiliária Lar Novo, e o calendário ganhando um ✓ a cada mês. / Ele mostra o site no tablet e a dona faz joia; a câmera passa pela esquerda.
3. As moedas saem voando do pote e o calendário da parede fica todo em branco. / Ele tenta segurar a última moeda e murcha; a câmera se afasta de baixo, pela direita.
4. Ele abre o Maps e pulam pinos de empresa de todo tipo, com os balões "Como?" e "Pra quem?" na cabeça dele. / Ele levanta decidido e fica perdido, girando no meio dos pinos; a câmera gira de perto.
5. Na cidade em miniatura, a imobiliária afunda e um "?" aparece em cima de cada prédio. / Ele gira olhando os "?" e fica pensando; a câmera sobe, do alto.
6. Os "?" estouram e sobem 3 oficinas, cada uma com um alvo em cima. / Ele tem a ideia e aponta a mais perto; a câmera revela de cima, pela esquerda.
7. Na oficina, o celular mostra a ficha do Maps sem site, e o mecânico acena. / Ele compara e aponta o mecânico; a câmera chega pela direita.
8. Ele digita mappoa.com no computador e a lista das oficinas de Joinville sem site sobe da tela. / Ele tecla, se surpreende e aponta; a câmera sobe de frente.
9. O nome Mappoa e a análise da oficina: o score enchendo até 89/100, as dores e as oportunidades. / Ele comemora com o robô; a câmera chega de baixo.
10. Antes: o "vamos encerrar" e o gráfico zerado, em preto e branco. Agora: chega outro cancelamento e ele só abre a lista dos próximos. / Ele se desespera, depois dá de ombros e mostra a lista pro mecânico; a câmera muda a cada parte.
11. A pergunta no topo, o cartão de seguir e mappoa.com sendo digitado. / O Lucas pergunta pra câmera, contando nos dedos, e digita; a câmera parada, aberta.
