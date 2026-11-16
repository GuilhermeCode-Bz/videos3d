# Você ainda procura clientes empresa por empresa no Google Maps?: roteiro e ficha de cena

## Roteiro

1. Você clicou na vigésima empresa do mapa. Se faltam oitenta, sua tarde acabou. *(gancho)*
2. Esse é o Lucas. Ele é gestor de tráfego e precisa de cliente pra ontem.
3. Se você é o Lucas, abre o mapa, digita "hamburgueria" e começa a clicar.
4. Clica na empresa, copia o nome, o telefone, abre o site, caça o Instagram.
5. Cola tudo na planilha. E vai pra próxima.
6. Mas se cada uma leva três minutos, cem empresas são cinco horas de clique.
7. Então você usa um site que procura pra você: escreve o tipo de empresa e a cidade.
8. Esse é o *Mappoa*.
9. Ele abre o Google Maps e vai salvando as empresas sozinho na sua lista.
10. Em poucos minutos, a lista que levava a tarde inteira tá pronta.
11. Mas nome de empresa sozinho não vende nada. Como você fala com ela?
12. Então ele junta os contatos que estão públicos: WhatsApp, telefone, site e Instagram.
13. Mas cem empresas numa planilha viram uma gaveta bagunçada.
14. Então elas vão pra um quadro, e você arrasta cada uma: novos, contato enviado, follow-up, respondeu.
15. É por isso que o concorrente sempre parece chegar antes de você.
16. Antes, o Lucas passava a tarde clicando no mapa. Agora, ele passa a tarde falando com empresas.
17. Quanto tempo você perde por dia no mapa? Comenta aí. No computador, digita mappoa.com e testa você também.

Cerca de 210 palavras, uns 70 a 78 segundos, 17 frases.

**Gancho escolhido:** o B, no estilo "situação + se você fizer X, acontece Y" (o dono escolheu em 10/11/2026). A frase dele, "Você ainda procura clientes empresa por empresa no Google Maps?", vira o título e a capa.

## O que foi conferido

- "Vigésima de cem": é a situação do gancho, a mesma conta das frases 5 e 6 (3 de 100 na planilha, 100 empresas = 5 horas)
- "Três minutos por empresa" é uma conta, não uma medida: a frase diz "se cada uma leva". 100 × 3 min = 300 min = 5 h
- O Mappoa captura em cima do Google Maps de verdade (a janela do robô abre o Maps no fundo: `canal/referencias/mappoa-fluxo.md`, passo 3). Na tela, o mapa é desenhado, sem a marca do Google
- "Em poucos minutos": a captura real deu 99 empresas em 2min 7s. Como o nicho aqui é outro (hamburguerias), o vídeo não fala número de empresas nem de tempo exato
- Os contatos dependem do que é público: a frase 12 diz "os contatos que estão públicos"
- O quadro tem as colunas de verdade (Novos, Contato enviado, Follow-up, Respondeu), e é a pessoa quem arrasta o cartão: o Mappoa não acompanha resposta sozinho
- O vídeo não promete cliente nem venda: fala em achar empresas e falar com elas
- O nome Mappoa só aparece depois de mostrar o que ele faz (frase 7 → 8)
- Sem preço e sem plano. O fim é no computador, com mappoa.com

## Ficha de cena

**Cenários (quatro, com `K.cenarios`):** `cidade_maquete` (frases 1, 4 e 15: o Lucas pequeno no meio do "mapa", correndo de empresa em empresa), `home_office` (2, 3, 5, 6, 7, 13, 14, 16 e 17: o quarto dele, onde a tarde vira noite pela janela), `central_mappoa` (8 a 10: o robô trabalhando em cima do mapa gigante), `mundo_mappoa` (11 e 12: o cartão de uma empresa ganhando os contatos).
**Hora:** dia no `home_office`; na frase 6 a janela passa pra noite (`{ hora: 'noite' }` num segundo `home_office` ou o céu da janela trocado). **Personagem:** o do canal, chamado Lucas. **O robô é ajudante:** só aparece quando o Mappoa entra (frase 8 em diante). **Concorrente** (só na 15): um segundo boneco, de moletom cinza.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Lucas | `K.boneco`, cores do canal | 1,47 | muda por cenário | todas, menos a 8 |
| `pinos` | pinos azuis de empresa brotando na maquete | `K.pinoMappoa` / `K.m3d('pino')` | 0,9, azul `#1067f8` | em cima dos prédios | 1, 4, 15 |
| `pino_grande` | o pino que cai na frente dele | `K.m3d('pino')` | 1,6, azul | na frente do Lucas | 1 |
| `contador` | placa "20 / 100" | `K.painelMappoa` pequeno + tela própria | 1,3 × 0,8 | ao lado do Lucas, no alto | 1 |
| `computador` | monitor na mesa do quarto | `K.computador` | escala 1,6 | `C.lugares.mesa` | 3, 5, 7, 17 |
| `tela` | painel com as telas (mapa com a busca, planilha, busca do Mappoa, captura, quadro) | `K.painelMappoa` | 1,56 × 2,6 (em pé) ou 2,5 × 1,56 (deitado) | sobe do monitor ou fica na parede | 3, 5, 7, 9, 10, 14 |
| `cartao` | cartão branco de uma empresa ("Hamburgueria do Zé") | `K.m3d('cartao_lead')` | 1,2 | na mão do Lucas / no centro do mundo | 4, 11, 12 |
| `icones` | quatro moedas de contato (nome, telefone, site, Instagram / WhatsApp) | `K.m3d('moeda_contato')` com cores | 0,5 cada | voam até o cartão | 4, 12 |
| `planilha` | folha de planilha com poucas linhas | `K.painelMappoa` (tela de planilha) | 1,56 × 2,6 | sobe do monitor | 5 |
| `relogio` | relógio de parede com o ponteiro correndo | `K.m3d('relogio_parede')` | 1,2 | parede do quarto, ao lado da janela | 6 |
| `janela` | a janela do quarto, dia → noite | o cenário (`C.lugares.janela`) | | parede do fundo | 6 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central e mundo | 8 a 12, 17 |
| `logo` | logo 3D | `K.logoMappoa` | 1,6 | central | 8 |
| `mapa` | mapa gigante da central | o cenário (`C.lugares.mapa`) | | parede da central | 9 |
| `gaveta` | arquivo de gavetas transbordando de papel | `K.m3d('arquivo')` + `K.m3d('pilha_papeis')` | 1,2 | ao lado da mesa | 13 |
| `quadro` | tela do funil Kanban de 4 colunas | `K.painelMappoa` largo | 2,5 × 1,56 | parede do quarto | 14, 16 |
| `concorrente` | outro vendedor, já com a empresa | `K.boneco` moletom cinza | 1,47 | ao lado do prédio novo | 15 |
| `predio_novo` | prediozinho com placa "Inauguração" | `K.m3d('prediozinho', { placa: 'Inauguração' })` | 1,4 | centro da maquete | 15 |
| `balao` | balão verde de conversa saindo do concorrente | `K.m3d('balao_chat')` | 0,9 | acima do concorrente | 15 |
| `navegador` | barra grande com mappoa.com | `K.telaCanvas` | 2,4 × 0,4 | em cima do computador | 17 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| empresa, mapa, vigésima, oitenta, tarde | 1 | a maquete (o "mapa"), o `contador` "20 / 100", os 80 `pinos` cinza brotando e a luz caindo |
| gestor de tráfego, cliente | 2 | `personagem` com etiqueta "Gestor de tráfego"; o letreiro do quarto |
| mapa, hamburgueria, clicar | 3 | `tela` com o mapa desenhado e "hamburgueria" sendo digitado; pinos na tela |
| empresa, nome, telefone, site, Instagram | 4 | `cartao` e os `icones` voando até a mão dele |
| planilha | 5 | `planilha` com 3 linhas |
| três minutos, cem empresas, cinco horas | 6 | `relogio` girando, etiquetas "3 min" e "100 = 5 horas"; `janela` virando noite |
| site, tipo de empresa, cidade | 7 | `tela` de busca do Mappoa: Nicho "Hamburgueria", Cidade "Curitiba" |
| Mappoa | 8 | `logo` e rótulo amarelo |
| Google Maps, lista, empresas | 9 | `mapa` gigante; `tela` de captura com as etapas ficando verdes |
| lista, tarde | 10 | `tela` de "captura concluída"; etiqueta "Poucos minutos" |
| nome de empresa | 11 | `cartao` só com o nome, sem nenhum contato |
| WhatsApp, telefone, site, Instagram | 12 | `icones` encaixando no `cartao` |
| planilha, gaveta | 13 | `gaveta` transbordando de papel |
| quadro, novos, contato enviado, follow-up, respondeu | 14 | `quadro` com as 4 colunas; cartão arrastado |
| concorrente | 15 | `concorrente` e `predio_novo` |
| mapa, empresas (antes / agora) | 16 | `quadro` cheio; o Lucas no computador |
| computador, mappoa.com | 17 | `computador`, `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~3,5 s
> "Você clicou na vigésima empresa do mapa. Se faltam oitenta, sua tarde acabou."

- **NA TELA:** a cidade em maquete vista de cima; o Lucas pequeno no centro, de frente; um `pino_grande` azul despencando na frente dele já no 1º quadro; o `contador` "20 / 100" no alto, à direita dele; 20 pinos verdes (as já clicadas) perto dele e, depois, 80 `pinos` cinza brotando na cidade inteira
- **MOSTRA:** `["personagem", "pino_grande", "contador"]`
- **CENÁRIO:** `cidade_maquete`, os carrinhos andando nas ruas; a luz cai pra fim de tarde na palavra "tarde"
- **ENTRA AGORA:** o `pino_grande` cai do alto no 1º segundo (palavra "Você"); o `contador` cai na palavra "vigésima"; os 80 `pinos` cinza brotam a partir de "oitenta", em onda, dos mais perto pros mais longe
- **OBJETOS SE MEXENDO:** o pino grande crava no chão e balança; o contador quica e pisca "20"; os pinos cinza sobem dos telhados com um quique
- **PERSONAGEM:** em `C.centro`, de frente pra câmera · começo: `susto` (o pino cai na frente dele) · na palavra "acabou": `cansado`, olhando a cidade cheia de pinos
- **INTERAÇÃO:** o pino quase acerta ele; os pinos cinza brotam em volta e ele gira a cabeça acompanhando
- **CÂMERA:** alvo `[personagem, pino_grande, contador]`, centro, ocupando ~1/2 da altura · `afastando` · médio · frente · alto, com topo livre pro texto
- **EFEITOS VISUAIS:** etiqueta laranja "Faltam 80" na palavra "oitenta" · etiqueta vermelha "Tarde perdida" na palavra "acabou"
- **SONS:** baque do pino grande (1º segundo) · `ding` no contador · `bip` em sequência nos pinos cinza · `errado` em "acabou"

#### 2 · plano `lucas` · ~3,5 s
> "Esse é o Lucas. Ele é gestor de tráfego e precisa de cliente pra ontem."

- **NA TELA:** no quarto (home office), o Lucas no centro, na frente da mesa; o `computador` atrás dele à esquerda; o letreiro e a janela de dia ao fundo
- **MOSTRA:** `["personagem", "computador"]`
- **CENÁRIO:** `home_office`, de dia; o sol entrando pela janela
- **ENTRA AGORA:** o Lucas entra andando pela direita na palavra "Lucas"
- **OBJETOS SE MEXENDO:** o monitor liga (tela azul) na palavra "tráfego"
- **PERSONAGEM:** anda de `C.entrada` até `C.centro` · começo: anda, acenando · na palavra "ontem": `duvida`, abrindo os braços
- **INTERAÇÃO:** ele aponta o computador quando fala "tráfego"
- **CÂMERA:** alvo `[personagem, computador]`, centro · `chegando` · médio · esquerda · olho (antes: afastando, frente, cima)
- **EFEITOS VISUAIS:** etiqueta azul "Gestor de tráfego" na palavra "tráfego" · etiqueta laranja "Cliente pra ontem" na palavra "ontem"
- **SONS:** passos · `ding` na etiqueta

#### 3 · plano `digita` · ~3,5 s
> "Se você é o Lucas, abre o mapa, digita 'hamburgueria' e começa a clicar."

- **NA TELA:** o Lucas sentado diante do `computador`; a `tela` grande subindo do monitor com um mapa desenhado e a caixa de busca; "hamburgueria" sendo digitado letra por letra; pinos vermelhos aparecendo no mapa da tela
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** a `tela` sobe do monitor na palavra "mapa"
- **OBJETOS SE MEXENDO:** as letras de "hamburgueria" na palavra "digita"; o cursor clica no 1º pino na palavra "clicar"
- **PERSONAGEM:** diante da mesa · começo: `segurando` (mãos no teclado) · na palavra "clicar": `apontar` pra tela
- **INTERAÇÃO:** ele digita e a tela responde; ele aponta o pino que vai clicar
- **CÂMERA:** alvo `[tela, personagem]`, centro · `subindo` · médio · frente · baixo (antes: chegando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** sem etiqueta (a tela é o texto)
- **SONS:** `clique` de teclado em "digita" · `clique` em "clicar"

#### 4 · plano `caca` · ~4 s
> "Clica na empresa, copia o nome, o telefone, abre o site, caça o Instagram."

- **NA TELA:** de volta à maquete, de perto: o Lucas pulando de um prédio pro outro; em cada prédio salta um `icone` (nome, telefone, site, Instagram) que ele agarra e junta no `cartao` que segura
- **MOSTRA:** `["personagem", "cartao"]`
- **CENÁRIO:** `cidade_maquete`, um quarteirão de perto, carrinhos passando
- **ENTRA AGORA:** cada `icone` salta de um prédio na sua palavra: "nome", "telefone", "site", "Instagram"
- **OBJETOS SE MEXENDO:** os ícones sobem em arco e caem no cartão; o cartão balança a cada um
- **PERSONAGEM:** corre de prédio em prédio (`irPara`, correndo) · começo: `correr` · na palavra "Instagram": `cansado`, ofegante, suando
- **INTERAÇÃO:** ele pega cada ícone no ar e põe no cartão
- **CÂMERA:** alvo `[personagem, cartao]`, centro · `passando` · médio · direita · alto, acompanhando a corrida (antes: subindo, médio, frente, baixo)
- **EFEITOS VISUAIS:** os chips coloridos entrando no cartão (Telefone, Site, Instagram) · etiqueta laranja "Tudo na mão" na palavra "Instagram"
- **SONS:** `bip` em cada ícone · whoosh dos pulos

#### 5 · plano `planilha` · ~2,5 s
> "Cola tudo na planilha. E vai pra próxima."

- **NA TELA:** o Lucas de volta à mesa; a `planilha` subindo do monitor, com só 3 linhas preenchidas e o resto em branco; o cursor volta pro mapa
- **MOSTRA:** `["planilha", "personagem"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** a `planilha` sobe na palavra "planilha"; a 3ª linha se escreve na palavra "tudo"
- **OBJETOS SE MEXENDO:** a linha nova pisca; na palavra "próxima" a planilha desce um pouco, de volta pro monitor
- **PERSONAGEM:** diante da tela · começo: `empurrando` (colando com as duas mãos) · na palavra "próxima": `triste`, olhando as linhas vazias
- **INTERAÇÃO:** ele "cola" a linha na planilha com o gesto das mãos
- **CÂMERA:** alvo `[planilha, personagem]`, centro · `revelando` · médio · direita · olho (antes: passando, médio, alto)
- **EFEITOS VISUAIS:** etiqueta laranja "3 de 100" na palavra "próxima"
- **SONS:** `clique` em "cola" · suspiro (`errado` baixinho) em "próxima"

#### 6 · plano `cinco_horas` · ~4 s · jogo `falha`
> "Mas se cada uma leva três minutos, cem empresas são cinco horas de clique."

- **NA TELA:** o quarto inteiro: o `relogio` grande na parede com o ponteiro correndo; a `janela` ao lado passando de dia pra noite; o Lucas largado na cadeira na frente do computador
- **MOSTRA:** `["relogio", "personagem"]` (a janela é do cenário e entra no alvo da câmera)
- **CENÁRIO:** `home_office`; a luz do quarto escurece junto com a janela
- **ENTRA AGORA:** o `relogio` cresce na parede na palavra "minutos"
- **OBJETOS SE MEXENDO:** o ponteiro gira várias voltas a partir de "cem"; o céu da janela vai do azul ao azul-escuro com prédios acesos na palavra "horas"
- **PERSONAGEM:** na cadeira · começo: `pensando` (fazendo a conta) · na palavra "horas": `cansado`, a cabeça caindo pra frente
- **INTERAÇÃO:** ele olha o relógio girar e desaba
- **CÂMERA:** alvo `[relogio, janela, personagem]`, centro · `chegando` · aberto · frente · olho (antes: revelando, médio, direita, olho; muda o plano e o lado)
- **EFEITOS VISUAIS:** etiqueta laranja "3 min cada" na palavra "minutos" · etiqueta vermelha "100 = 5 horas" na palavra "horas" · congela em preto e branco (o jogo faz)
- **SONS:** tique-taque acelerado (`zumbido`) em "cem" · o congela do jogo

#### 7 · plano `busca` · ~4 s · jogo `corrige`
> "Então você usa um site que procura pra você: escreve o tipo de empresa e a cidade."

- **NA TELA:** o Lucas no computador, aceso de novo; a `tela` da busca do Mappoa (sem o nome ainda) subindo do monitor: campos Nicho e Cidade e o botão em degradê azul → verde
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `home_office`, a luz volta
- **ENTRA AGORA:** a `tela` sobe na palavra "site"
- **OBJETOS SE MEXENDO:** "Hamburgueria" é digitado no Nicho em "tipo"; "Curitiba" na Cidade em "cidade"
- **PERSONAGEM:** diante da tela · começo: `ideia` · na palavra "cidade": `apontar` pro botão
- **INTERAÇÃO:** ele digita e aponta o botão de buscar
- **CÂMERA:** alvo `[tela, personagem]`, centro · `girando` · médio · esquerda · olho (antes: descendo, aberto, frente, alto)
- **EFEITOS VISUAIS:** brilho azul em volta da tela na palavra "site"
- **SONS:** `clique` em "escreve" e em "cidade"

#### 8 · plano `mappoa_rotulo` · ~1,5 s
> "Esse é o *Mappoa*."

- **NA TELA:** na central, o `logo` grande no centro; o `robo` ao lado, acenando; o mapa gigante atrás
- **MOSTRA:** `["logo", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa com pontos brilhando
- **ENTRA AGORA:** o robô desliza da esquerda; o logo gira na palavra "Mappoa"
- **OBJETOS SE MEXENDO:** o logo dá uma volta rápida e para de frente
- **PERSONAGEM:** o Lucas não aparece (é a hora do robô ser apresentado)
- **INTERAÇÃO:** o robô aponta o logo e acena
- **CÂMERA:** alvo `[logo, robo]`, centro · `chegando` · médio · frente · olho (antes: girando, médio, esquerda)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa"
- **SONS:** `brilho` do rótulo

#### 9 · plano `captura` · ~3,5 s
> "Ele abre o Google Maps e vai salvando as empresas sozinho na sua lista."

- **NA TELA:** o `robo` de costas pra câmera, de frente pro `mapa` gigante; a `tela` de captura à direita: a janela branca com o robô, "Encontrando novos leads", a barra e as etapas ficando verdes
- **MOSTRA:** `["robo", "tela"]` (o mapa gigante é a parede da central, atrás deles)
- **CENÁRIO:** `central_mappoa`, os pontos do mapa piscando
- **ENTRA AGORA:** a `tela` desliza da direita na palavra "Maps"
- **OBJETOS SE MEXENDO:** a barra enche; as etapas viram ✓ verde uma a uma; o contador "Encontrados" sobe; pontos azuis descem do mapa até a tela em "salvando"
- **PERSONAGEM:** o robô aponta o mapa e depois a tela · o Lucas entra pequeno pela direita na palavra "sozinho", `surpreso`
- **INTERAÇÃO:** o robô aponta o mapa e os números da tela sobem
- **CÂMERA:** alvo `[robo, tela]`, centro · `passando` · médio · direita · baixo (antes: chegando, perto, frente)
- **EFEITOS VISUAIS:** pontos azuis voando do mapa pra tela
- **SONS:** `bip` em sequência na palavra "salvando"

#### 10 · plano `pronta` · ~3 s
> "Em poucos minutos, a lista que levava a tarde inteira tá pronta."

- **NA TELA:** a `tela` de "captura concluída" bem grande no centro, com o ✓ verde e a lista de cartões; o `robo` comemorando embaixo; o Lucas no canto direito
- **MOSTRA:** `["tela", "personagem"]`
- **CENÁRIO:** `central_mappoa`, fundo desfocado pelo enquadramento
- **ENTRA AGORA:** o verde de "concluída" na palavra "pronta"
- **OBJETOS SE MEXENDO:** a lista de empresas rola pra baixo cheia na palavra "lista"
- **PERSONAGEM:** no canto · começo: `surpreso` · na palavra "pronta": `vitoria`
- **INTERAÇÃO:** o robô bate na mão do Lucas (os dois comemoram)
- **CÂMERA:** alvo `[tela, personagem]`, centro · `chegando` · médio · esquerda · olho (antes: passando, médio, direita, baixo)
- **EFEITOS VISUAIS:** etiqueta verde "Poucos minutos" na palavra "minutos"
- **SONS:** `certo` na palavra "pronta"

#### 11 · plano `so_nome` · ~3 s · jogo `falha`
> "Mas nome de empresa sozinho não vende nada. Como você fala com ela?"

- **NA TELA:** no palco da marca, o `cartao` gigante "Hamburgueria do Zé" no centro, com os espaços dos contatos vazios (tracejados); o Lucas ao lado coçando a cabeça
- **MOSTRA:** `["cartao", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, cartões e pinos flutuando atrás
- **ENTRA AGORA:** o `cartao` sobe do chão na palavra "nome"
- **OBJETOS SE MEXENDO:** os espaços vazios piscam em vermelho na palavra "nada"
- **PERSONAGEM:** à direita do cartão · começo: `mostrando` o cartão · na palavra "fala": `duvida`
- **INTERAÇÃO:** ele vira o cartão procurando o telefone atrás e não acha
- **CÂMERA:** alvo `[cartao, personagem]`, centro · `subindo` · médio · frente · olho (antes: chegando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta laranja "Só o nome?" na palavra "nada" · congela em preto e branco
- **SONS:** `errado` na palavra "nada"

#### 12 · plano `contatos` · ~4 s · jogo `corrige`
> "Então ele junta os contatos que estão públicos: WhatsApp, telefone, site e Instagram."

- **NA TELA:** o mesmo `cartao` no centro; o `robo` à esquerda jogando os `icones` coloridos, que encaixam nos espaços: WhatsApp verde, telefone cinza, site azul, Instagram rosa; o Lucas à direita
- **MOSTRA:** `["cartao", "icones", "robo"]`
- **CENÁRIO:** `mundo_mappoa`
- **ENTRA AGORA:** cada `icone` voa da mão do robô na sua palavra
- **OBJETOS SE MEXENDO:** os ícones giram no ar e encaixam com um clique; o cartão ganha a etiqueta verde "enriquecido" no fim
- **PERSONAGEM:** à direita · começo: `surpreso` · na palavra "Instagram": `vitoria`
- **INTERAÇÃO:** o robô joga, o cartão recebe, o Lucas comemora
- **CÂMERA:** alvo `[cartao, robo]`, centro · `revelando` · médio · esquerda · olho (antes: subindo, médio, frente)
- **EFEITOS VISUAIS:** cada chip com a cor do produto · ✓ verde no cartão na palavra "Instagram"
- **SONS:** `ding` em cada ícone

#### 13 · plano `gaveta` · ~3 s · jogo `falha`
> "Mas cem empresas numa planilha viram uma gaveta bagunçada."

- **NA TELA:** no quarto, a `gaveta` (o arquivo) ao lado da mesa explodindo de papel; folhas voando em volta do Lucas
- **MOSTRA:** `["gaveta", "personagem"]`
- **CENÁRIO:** `home_office`, de dia
- **ENTRA AGORA:** a gaveta abre de supetão na palavra "gaveta"
- **OBJETOS SE MEXENDO:** a pilha de papéis sobe e as folhas se espalham pelo chão em "bagunçada"
- **PERSONAGEM:** ao lado do arquivo · começo: `empurrando` (tentando fechar a gaveta) · na palavra "bagunçada": `susto`
- **INTERAÇÃO:** ele empurra a gaveta e ela abre de novo, jogando papel nele
- **CÂMERA:** alvo `[gaveta, personagem]`, centro · `passando` · médio · direita · olho (antes: revelando, médio, esquerda; muda o lugar e o lado)
- **EFEITOS VISUAIS:** etiqueta vermelha "Bagunça" na palavra "bagunçada" · congela em preto e branco
- **SONS:** baque da gaveta · whoosh dos papéis

#### 14 · plano `quadro` · ~5 s · jogo `corrige`
> "Então elas vão pra um quadro, e você arrasta cada uma: novos, contato enviado, follow-up, respondeu."

- **NA TELA:** o `quadro` largo na parede do quarto com as 4 colunas (bordas de cima coloridas); o Lucas na frente arrastando um cartão de coluna em coluna
- **MOSTRA:** `["quadro", "personagem"]`
- **CENÁRIO:** `home_office`, a parede do fundo
- **ENTRA AGORA:** o `quadro` acende na parede na palavra "quadro"
- **OBJETOS SE MEXENDO:** um cartão anda pela coluna certa em cada palavra: "novos" → "enviado" → "follow-up" → "respondeu"
- **PERSONAGEM:** na frente do quadro · começo: `mostrando` · na palavra "respondeu": `vitoria`
- **INTERAÇÃO:** a mão dele acompanha o cartão andando
- **CÂMERA:** alvo `[quadro, personagem]`, centro · `afastando` · médio · esquerda · olho (antes: passando, médio, direita)
- **EFEITOS VISUAIS:** ✓ verde na coluna "Respondeu" na palavra "respondeu"
- **SONS:** whoosh do cartão em cada coluna · `certo` em "respondeu"

#### 15 · plano `concorrente` · ~3 s
> "É por isso que o concorrente sempre parece chegar antes de você."

- **NA TELA:** na maquete, o `predio_novo` com a placa "Inauguração" no centro; o `concorrente` já na porta, com o `balao` verde em cima; o Lucas chegando correndo pela esquerda, atrasado, com o mapa na mão
- **MOSTRA:** `["predio_novo", "concorrente", "personagem"]`
- **CENÁRIO:** `cidade_maquete`, os carrinhos passando
- **ENTRA AGORA:** o `predio_novo` sobe do chão na palavra "concorrente"; o `balao` na palavra "antes"
- **OBJETOS SE MEXENDO:** a placa balança; o balão sobe
- **PERSONAGEM:** corre de `C.entrada` até perto do prédio · começo: `correr` · na palavra "você": `bravo`, parando de supetão
- **INTERAÇÃO:** o concorrente acena pro Lucas, que chega tarde
- **CÂMERA:** alvo `[predio_novo, concorrente, personagem]`, centro · `girando` · médio · esquerda · alto (antes: afastando, médio, esquerda, olho; muda o lugar e a altura)
- **EFEITOS VISUAIS:** etiqueta laranja "Chegou antes" na palavra "antes"
- **SONS:** `ding` do balão · freada dos pés

#### 16 · plano `antes_agora` · ~5 s · jogo `avanca`
> "Antes, o Lucas passava a tarde clicando no mapa. Agora, ele passa a tarde falando com empresas."

- **NA TELA:** primeiro o Lucas cansado na frente do computador, com o mapa na tela; depois do ⏩, o `quadro` na parede cheio de cartões e ele de pé, na frente dele
- **MOSTRA:** `["quadro", "personagem"]`
- **CENÁRIO:** `home_office`, de dia
- **ENTRA AGORA:** o `quadro` acende cheio na palavra "Agora"
- **OBJETOS SE MEXENDO:** dois cartões deslizam de "Novos" pra "Contato enviado" em "falando"
- **PERSONAGEM:** começo: `cansado` na cadeira · na palavra "Agora": levanta e anda até a parede, `mostrando`
- **INTERAÇÃO:** ele arrasta um cartão no quadro
- **CÂMERA:** antes: alvo `[tela, personagem]` · depois: alvo `[quadro, personagem]`, centro · `chegando` · médio · frente · olho e depois baixo (antes: girando, médio, esquerda, alto)
- **EFEITOS VISUAIS:** etiqueta verde "Falando com empresas" na palavra "falando"
- **SONS:** `avanca` do jogo · `certo` em "empresas"

#### 17 · plano `segue` · ~6 s
> "Quanto tempo você perde por dia no mapa? Comenta aí. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Lucas no `computador`; o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando ao lado; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "computador"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde
- **PERSONAGEM:** começo: `chamando` (falando com a câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, computador]`, centro · `parado` · aberto · frente · olho, topo livre (antes: chegando, médio, direita, baixo)
- **EFEITOS VISUAIS:** cartão de seguir no topo
- **SONS:** `brilho` do cartão · `clique` do botão

**Cauda** · plano `cartao_fim` · 1,6 s: o cartão de seguir vira "Seguindo", o Lucas acena e o robô acena ao lado dele.

**Capa:** o Lucas desesperado, pequeno no meio da maquete coberta de pinos, com um pino enorme caindo na frente dele; o robô chegando pelo lado com a lista pronta. Frase: "Ainda no *Google Maps*?" (em destaque, na cor do canal).
