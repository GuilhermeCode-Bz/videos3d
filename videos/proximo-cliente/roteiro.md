# Deu um trabalhão fechar o último cliente. Se você não sabe quem é o próximo, vai sofrer tudo de novo: roteiro e ficha de cena

> Da pauta, seção "Web designer sem clientes" (ideia do dono, 11/11/2026): a dor de não saber pra quem vender. O último
> cliente veio depois de muita mensagem, ligação e espera, e acabou. A virada: o próximo cliente é a empresa que já tem
> o problema que você resolve. Feito com o que a retenção ensinou: ação na tela no 1º segundo, o personagem já dentro da
> ação (sem "Esse é o ..."), tempo na dor e na virada, o Mappoa curto, começando pelo mappoa.com digitado no computador
> e pela lista pronta, 45 a 60 s. O Mappoa é um **sistema de prospecção** que acha o próximo cliente (nunca "um site").

## Roteiro

1. Deu um trabalhão fechar o último cliente. Se você não sabe quem é o próximo, vai sofrer tudo de novo. *(gancho, a frase do dono)*
2. O Nando é web designer. Pra fechar a academia, foram semanas de mensagem, ligação e espera.
3. O site ficou pronto, o dinheiro entrou... e a agenda ficou vazia de novo.
4. Aí ele manda "oi, faço sites" pra qualquer empresa do Maps, e quase ninguém responde.
5. O seu próximo cliente não é qualquer empresa. É a que já tem o problema que você resolve.
6. Pra quem faz site, é o salão sem site, ou com o Instagram no lugar dele.
7. Só que descobrir isso empresa por empresa é o mesmo trabalhão de antes.
8. Aí o Nando digita mappoa.com no computador, e vem a lista dos salões de Campinas sem site.
9. Esse é o *Mappoa*, um sistema que acha o seu próximo cliente e mostra quem tem mais chance de comprar.
10. Antes, cada cliente era um trabalhão. Agora, o Nando já sabe quem é o próximo.
11. Qual cliente deu mais trabalho pra você fechar? Comenta aí e segue pra achar o próximo. No computador, digita mappoa.com e testa você também.

Cerca de 185 palavras, uns 58 segundos, 11 frases (uns 1.010 caracteres da ElevenLabs; sobram 1.668, então dá pra
este vídeo e uma ou duas frases refeitas, não pra refazer tudo).

**Onde o tempo vai:** gancho e dor (1 a 4) uns 20 s · a virada (5 e 6) uns 9 s · o trabalho na mão (7) 3 s · o Mappoa
(8 e 9) uns 10 s, começando pelo mappoa.com digitado e pela lista, contado dentro da história do Nando · o fim (10 e 11)
uns 14 s.

**Gancho escolhido:** A, a frase do dono (é o pedido; o "trabalhão" volta na 7 e na 10 e amarra o vídeo). Opções:
- **A:** "Deu um trabalhão fechar o último cliente. Se você não sabe quem é o próximo, vai sofrer tudo de novo." (na tela,
  no 1º quadro: o celular gigante com as mensagens empilhando, "Visualizado", "Vou ver e te falo", e o Nando suando do lado)
- **B:** "Você fechou um cliente depois de semanas. Se não sabe quem é o próximo, volta pro zero."
- **C:** "Seu último cliente acabou. Se o próximo depende de sorte, a agenda fica vazia."

**Capa:** "Quem é o *próximo*?" (18 letras, cabe numa linha), com o Nando desesperado, as mãos na cabeça, no meio das
mensagens sem resposta e um "?" gigante.

## O que foi conferido

- Sem preço, sem plano e sem número falado. "Semanas" é da história do Nando, não estatística. Na tela, o score só como
  "NN/100" da análise (é como o Mappoa mostra), sem total de leads no topo
- O que o Mappoa faz aqui está em `canal/produto.md`: a captura acha os salões no Maps e já separa COM SITE e SEM
  SITE, e quem pôs o Instagram no lugar do site conta como sem site (frase 6 e 8). A análise completa mostra a aderência
  à oferta com o score, as dores e as oportunidades: é o "mostra quem tem mais chance de comprar" (9). Nada de "garante a
  venda" nem de "manda a mensagem sozinho"
- O Mappoa é "um sistema que acha o seu próximo cliente" (9), o nome numa frase só, e o mappoa.com já entra na 8, digitado
  no computador, dentro da história (o dono pediu, 11/11/2026). A assinatura do fim continua
- Sem "Esse é o Nando": ele aparece já dentro da ação (frase 2)
- O fim dá motivo pra seguir ("segue pra achar o próximo"), porque os vídeos que foram bem trouxeram só 1 seguidor cada
- Empresas inventadas: Academia Força Total (o último cliente), Salão Bella Vista (o próximo) e os outros da lista.
  Cidade: Campinas, SP
- Nenhuma frase repete os vídeos anteriores (a 9 é nova: no site-nao-abre era "ele acha o seu próximo cliente, quem
  precisa do seu serviço, já com os contatos")

## Ficha de cena

**Cenários (seis, com `K.cenarios`):** `home_office` (1, 3, 11: o quarto do Nando, de dia), `academia` (2: a Academia
Força Total, o último cliente), `cidade_maquete` (4 e 5: a cidade em miniatura, o "Maps" em 3D), `cidade` (6 e o "Agora"
da 10: a calçada na frente do Salão Bella Vista), `home_noite` (7 e 8: o mesmo quarto de noite) e
`mundo_mappoa` (9: o palco da marca). **Hora:** dia, menos na 7 e na 8.
**Peças dos cenários que entram:** as esteiras e o espelho da academia (2), os prédios e carrinhos da maquete (4 e 5),
os carros passando na rua da cidade (6 e 10), a janela escura do quarto (7 e 8), o logo gigante e os pinos (9).
**Personagens:** o do canal, chamado Nando, em todas. O **dono da academia** (`K.boneco`, regata vermelha, `K.semNome`)
na 2. A **dona do salão** (`K.boneco` tipo menina, jaleco rosa, `K.semNome`) na 6 e no "Agora" da 10. **O robô
do Mappoa** só na 9 e na 11.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Nando, o web designer | `K.boneco`, cores do canal | 1,47 | muda por cenário | 1 a 11 |
| `celular` | celular gigante com a conversa: as mensagens empilhando ("Visualizado", "Vou ver e te falo", "Me chama semana que vem") e depois "Fechado ✓" | `K.celular()` + tela desenhada | escala 5,5 (gancho) / 1,8 (na mão) | no ar, na frente / na mão | 1, 6, 10, capa |
| `calendario` | a agenda do Nando, as páginas em branco | `K.m3d('calendario')` | 1,2, branco com faixa vermelha | no ar ao lado do celular / na parede | 1, 3 |
| `dono` | o dono da academia | `K.boneco` regata vermelha | 1,47 | encostado na esteira | 2 |
| `balao` | balão de conversa (as mensagens) | `K.m3d('balao_chat')` | 0,7, azul | no ar, acima do Nando | 2 |
| `telefone` | o telefone (as ligações) | `K.m3d('telefone_fixo')` | 0,7, preto | no ar, acima do Nando | 2 |
| `ampulheta` | a ampulheta (a espera) | `K.m3d('ampulheta')` | 0,8, areia dourada | no ar, acima do Nando / na mesa à noite | 2, 7 |
| `monitor` | o computador do Nando | `K.computador` com tela desenhada | escala 1,55 | mesa do home office | 3, 7, 8, 11 |
| `moedas` | as moedas do pagamento caindo no pote | `K.m3d('moeda_contato')` × 5 + pote (`K.pecas` cilindro) | 0,35 cada, douradas | na mesa, ao lado do monitor | 3 |
| `envelopes` | as mensagens "oi, faço sites" voando pros prédios e voltando | `K.m3d('envelope')` × 8 | 0,5, brancos | saem do Nando pros prédios da maquete | 4 |
| `alvos` | os poucos prédios que já têm o problema, acesos com um alvo em cima | `K.m3d('alvo')` × 3 | 0,9, vermelho e branco | em cima de 3 prédios da maquete | 5 |
| `salao` | a fachada do Salão Bella Vista, sem site, com a placa do Instagram | prédio `kenney-cidade` + toldo rosa + placa | prédio 5× | calçada, a partir de x -21 | 6, 10 |
| `abas` | as abas do navegador abrindo uma atrás da outra (Maps, site, Instagram) | `K.painelMappoa` desenhado | 1,8 × 1,1 | na frente do monitor, de noite | 7 |
| `navegador` | barra grande com mappoa.com | `K.painelMappoa` | 2,5 × 0,42 | acima do computador | 8, 11 |
| `tela` | painel do Mappoa: a lista dos salões de Campinas (COM SITE / SEM SITE), depois a análise do Salão Bella Vista | `K.painelMappoa` | 1,56 × 2,6 | sobe do computador / palco | 8, 9 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | palco, home office | 9, 11 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| trabalhão, último cliente | 1 | o `celular` com as mensagens empilhando e o "Fechado ✓" no fim; o Nando suando |
| próximo, tudo de novo | 1 | o `calendario` em branco com o "?" vermelho; a conversa volta pro começo |
| web designer, academia | 2 | etiqueta "Web designer"; a academia com as esteiras e o `dono` encostado nelas |
| mensagem, ligação, espera | 2 | o `balao`, o `telefone` e a `ampulheta` surgindo em cima do Nando, um em cada palavra |
| site pronto, dinheiro, agenda vazia | 3 | o `monitor` com o site da academia e o ✓; as `moedas` caindo no pote; o `calendario` na parede em branco |
| "oi, faço sites", qualquer empresa, Maps | 4 | os `envelopes` voando pros prédios da `cidade_maquete` (o Maps em 3D); balão "Oi, faço sites" |
| quase ninguém responde | 4 | os envelopes voltando com ✗ e "Visualizado" |
| próximo cliente, qualquer empresa, problema que você resolve | 5 | a maquete fica cinza e só 3 prédios acendem com os `alvos` |
| salão sem site, Instagram no lugar | 6 | a fachada `salao`; no `celular`, a ficha do Maps com "Site: instagram.com/salaobellavista"; ✗ "Sem site" |
| empresa por empresa, mesmo trabalhão | 7 | as `abas` abrindo uma atrás da outra; a `ampulheta` virando; os balões da 1 voltando em preto e branco |
| mappoa.com, computador | 8 | o `navegador` com mappoa.com sendo digitado acima do `monitor` |
| lista, salões, Campinas, sem site | 8 | a `tela` subindo do computador com "Salões de beleza · Campinas, SP" e o grupo SEM SITE |
| Mappoa, sistema, próximo cliente, chance de comprar | 9 | rótulo "Mappoa"; a `tela` com a análise do Bella Vista: "Aderência à sua oferta 92/100", "Dores prováveis", "Oportunidades"; o `robo` |
| trabalhão (antes), próximo (agora) | 10 | o celular cheio de mensagens em preto e branco → o Nando na frente do `salao` com o lead no celular, a dona acenando |
| cliente, computador, mappoa.com | 11 | `monitor` e `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~5,5 s
> "Deu um trabalhão fechar o último cliente. Se você não sabe quem é o próximo, vai sofrer tudo de novo."

- **NA TELA:** no home office, o `celular` gigante no centro, de pé no ar, virado pra câmera, com uma conversa de WhatsApp "Academia Força Total" cheia de mensagens do Nando e as respostas "Visualizado", "Vou ver e te falo", "Me chama semana que vem"; o Nando à direita do celular, suando, digitando; atrás, a mesa e o monitor
- **MOSTRA:** `["celular", "personagem"]`
- **CENÁRIO:** `home_office` de dia; o ring light e a planta atrás
- **ENTRA AGORA:** as mensagens já estão subindo no 1º quadro (uma nova a cada 0,4 s); na palavra "fechar", a última resposta "Fechado! ✓" chega em verde; na palavra "próximo", o `calendario` surge à esquerda do celular, com a página em branco e um "?" vermelho
- **OBJETOS SE MEXENDO:** a conversa rola pra cima rápido de "Deu" até "fechar"; o celular dá um tranco no "Fechado"; na palavra "próximo", as páginas do calendário viram em branco, uma atrás da outra; na palavra "tudo", a conversa volta pro topo vazia e as mensagens recomeçam a subir
- **PERSONAGEM:** à direita do celular, de frente pra câmera · começo: `cansado`, suando, digitando no celular pequeno · na palavra "fechar": `vitoria` curta (cai sentado de alívio) · na palavra "próximo": `susto`
- **INTERAÇÃO:** o Nando digita e as mensagens dele sobem; o "?" do calendário assusta ele
- **CÂMERA:** alvo `[celular, personagem]`, centro, celular ocupando 1/2 da altura · `chegando` · perto · frente · olho, topo livre (espacoCima 0,3) · começa já com as mensagens legíveis
- **EFEITOS VISUAIS:** a capa no topo ("Quem é o *próximo*?", o motor põe) · ✓ verde no "Fechado" (palavra "fechar") · "?" vermelho grande no calendário (palavra "próximo")
- **SONS:** `bip` a cada mensagem (do começo até "fechar") · `certo` (palavra "fechar") · `errado` (palavra "próximo") · `whoosh` da conversa recomeçando (palavra "tudo")

#### 2 · plano `ultimo` · ~5 s
> "O Nando é web designer. Pra fechar a academia, foram semanas de mensagem, ligação e espera."

- **NA TELA:** na Academia Força Total, o Nando no centro, perto da esteira; o `dono` encostado na esteira, de braços cruzados; as esteiras e o espelho atrás; em cima do Nando, surgindo um por um, o `balao`, o `telefone` e a `ampulheta`
- **MOSTRA:** `["personagem", "dono", "ampulheta"]`
- **CENÁRIO:** `academia`; as esteiras, o espelho e os halteres
- **ENTRA AGORA:** etiqueta "Web designer" na palavra "designer"; o `balao` surge na palavra "mensagem", o `telefone` na palavra "ligação", a `ampulheta` na palavra "espera"
- **OBJETOS SE MEXENDO:** o balão pula; o telefone treme tocando; a ampulheta vira e a areia escorre; na palavra "espera", os três ficam girando devagar em volta da cabeça do Nando
- **PERSONAGEM:** perto da esteira, olhando o dono · começo: `mostrando` (apresenta o site no tablet, animado) · na palavra "espera": `cansado`, os ombros caindo
- **INTERAÇÃO:** o Nando tenta convencer o dono, que demora a responder: o dono só descruza os braços no fim e faz joia
- **CÂMERA:** alvo `[personagem, dono, ampulheta]`, centro · `passando` · médio · esquerda · olho (antes: chegando, perto, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · etiqueta laranja "Semanas" (palavra "semanas")
- **SONS:** `bip` (palavra "mensagem") · `apito` de telefone tocando (palavra "ligação") · `zumbido` da ampulheta (palavra "espera")

#### 3 · plano `vazia` · ~4 s
> "O site ficou pronto, o dinheiro entrou... e a agenda ficou vazia de novo."

- **NA TELA:** no home office, o `monitor` na mesa com o site da Academia Força Total pronto; ao lado, o pote com as `moedas` caindo; na parede, o `calendario` grande; o Nando sentado na cadeira, na frente da mesa
- **MOSTRA:** `["monitor", "calendario", "personagem"]`
- **CENÁRIO:** `home_office` de dia; a janela clara
- **ENTRA AGORA:** o site aparece no monitor com ✓ na palavra "pronto"; as moedas caem no pote na palavra "dinheiro"; o calendário acende na parede na palavra "agenda"
- **OBJETOS SE MEXENDO:** as moedas caem do alto, uma atrás da outra, e quicam no pote; na palavra "vazia", as páginas do calendário viram todas em branco e ele desbota pra cinza
- **PERSONAGEM:** na cadeira, de frente pra câmera · começo: `vitoria` (comemora o site) · na palavra "vazia": `triste`, olhando o calendário
- **INTERAÇÃO:** o Nando entrega o site e recebe as moedas; o calendário vazio derruba o ânimo dele
- **CÂMERA:** alvo `[monitor, calendario, personagem]`, centro · `afastando` · médio · direita · baixo (antes: passando, médio, esquerda, olho: muda movimento, lado e altura)
- **EFEITOS VISUAIS:** ✓ verde no monitor (palavra "pronto") · etiqueta vermelha "Agenda vazia" em cima do calendário (palavra "vazia")
- **SONS:** `ding` (palavra "pronto") · `metal` das moedas caindo (palavra "dinheiro") · `desliga` (palavra "vazia")

#### 4 · plano `qualquer` · ~4,5 s · jogo `falha`
> "Aí ele manda 'oi, faço sites' pra qualquer empresa do Maps, e quase ninguém responde."

- **NA TELA:** a cidade em miniatura vista de cima (o Maps em 3D); o Nando no meio, grande perto dos prédios pequenos; os `envelopes` saindo da mão dele pra todos os lados, um pra cada prédio; o balão "Oi, faço sites" em cima dele
- **MOSTRA:** `["envelopes", "personagem"]`
- **CENÁRIO:** `cidade_maquete`; os carrinhos andando nas ruas, os prédios coloridos
- **ENTRA AGORA:** o balão "Oi, faço sites" na palavra "manda"; os envelopes saem a partir de "qualquer", um a cada 0,2 s
- **OBJETOS SE MEXENDO:** os envelopes voam em arco do Nando até os prédios; na palavra "ninguém", quase todos voltam batendo e caem no chão em volta dele; só um fica no prédio
- **PERSONAGEM:** no centro da maquete · começo: `empurrando` (arremessa os envelopes, girando pra cada lado) · na palavra "ninguém": `triste`, os envelopes caindo nele
- **INTERAÇÃO:** ele atira as mensagens pros prédios e elas voltam nele
- **CÂMERA:** alvo `[personagem, envelopes]`, centro · `subindo` · aberto · frente · alto (na maquete a câmera fica alta pra não entrar nos prédios) (antes: afastando, médio, direita, baixo)
- **EFEITOS VISUAIS:** balão branco "Oi, faço sites" (palavra "manda") · etiqueta vermelha "Ninguém responde" (palavra "ninguém") · ✗ vermelho em cima da etiqueta · no fim, congela em preto e branco (o jogo faz)
- **SONS:** `whoosh` a cada envelope · `baque` dos envelopes voltando (palavra "ninguém") · o congela do preto e branco (o jogo põe)

#### 5 · plano `virada` · ~5 s · jogo `corrige`
> "O seu próximo cliente não é qualquer empresa. É a que já tem o problema que você resolve."

- **NA TELA:** a mesma cidade em miniatura; no quarteirão do meio, atrás do Nando, sobem 3 salões (`predios` com a placa "SALÃO"), cada um com um halo laranja e um `alvo` em cima; o Nando na frente, apontando pro mais perto
- **MOSTRA:** `["alvos", "personagem"]`
- **CENÁRIO:** `cidade_maquete`, os carrinhos continuam andando
- **ENTRA AGORA:** na palavra "qualquer", os 3 salões sobem do chão; na palavra "problema", os halos acendem e os `alvos` caem em cima deles, um atrás do outro
- **OBJETOS SE MEXENDO:** os envelopes do chão somem; os alvos caem do alto e giram meia volta; os halos dos 3 salões pulsam em laranja
- **PERSONAGEM:** no meio da maquete, de frente pros alvos · começo: `pensando` · na palavra "problema": `ideia` e `apontar` o prédio mais perto
- **INTERAÇÃO:** o Nando aponta e o prédio que ele aponta brilha mais forte
- **CÂMERA:** alvo `[alvos, personagem]`, centro · `revelando` · aberto · esquerda · cima (antes: subindo, aberto, frente, alto: muda movimento, lado e altura)
- **EFEITOS VISUAIS:** etiqueta laranja "Já tem o problema" (palavra "problema") · os alvos brilhando
- **SONS:** `desliga` (palavra "qualquer") · `ding` em cada alvo (palavra "problema")

#### 6 · plano `salao` · ~4,5 s
> "Pra quem faz site, é o salão sem site, ou com o Instagram no lugar dele."

- **NA TELA:** na calçada, a fachada do Salão Bella Vista à esquerda, com o toldo rosa e uma placa com o ícone do Instagram onde estaria o site; o Nando à direita, de frente, com o `celular` na mão mostrando a ficha do Maps do salão; a `dona` na porta
- **MOSTRA:** `["salao", "celular", "personagem"]`
- **CENÁRIO:** `cidade` de dia; os carros passando na rua atrás
- **ENTRA AGORA:** o celular sobe na mão dele na palavra "salao"; na palavra "Instagram", a linha "Site:" da ficha troca pra "instagram.com/salaobellavista" e acende rosa
- **OBJETOS SE MEXENDO:** o celular cresce na tela pra ficar legível; a placa do Instagram balança na fachada; a dona acena da porta
- **PERSONAGEM:** à direita da fachada · começo: `segurando` o celular, olhando a ficha · na palavra "Instagram": `surpreso`, apontando a placa
- **INTERAÇÃO:** o Nando compara a ficha do Maps com a placa e descobre que o "site" é o Instagram
- **CÂMERA:** alvo `[salao, celular, personagem]`, centro · `chegando` · médio · direita · olho (antes: revelando, aberto, esquerda, cima)
- **EFEITOS VISUAIS:** ✗ vermelho com etiqueta vermelha "Sem site" (palavra "sem") · etiqueta laranja "Só o Instagram" (palavra "Instagram")
- **SONS:** `errado` (palavra "sem") · `clique` (palavra "Instagram") · carros passando (o cenário põe)

#### 7 · plano `trabalhao` · ~3,5 s · jogo `falha`
> "Só que descobrir isso empresa por empresa é o mesmo trabalhão de antes."

- **NA TELA:** o home office de noite; as `abas` abrindo na frente do monitor, uma em cima da outra (Maps, site que não abre, Instagram, Maps de novo); a `ampulheta` na mesa; o Nando na cadeira
- **MOSTRA:** `["abas", "ampulheta", "personagem"]`
- **CENÁRIO:** `home_noite`, a janela escura
- **ENTRA AGORA:** as abas a partir de "empresa", uma a cada 0,35 s; na palavra "trabalhão", os balões da conversa da frase 1 surgem em volta, em preto e branco
- **OBJETOS SE MEXENDO:** a pilha de abas cresce de baixo pra cima; a ampulheta vira de novo na palavra "trabalhão"
- **PERSONAGEM:** na cadeira, de frente pro monitor em 3/4 · começo: `pensando` (clica rápido) · na palavra "trabalhão": `cansado`, a cabeça caindo na mesa
- **INTERAÇÃO:** ele clica e as abas se empilham em cima dele
- **CÂMERA:** alvo `[abas, ampulheta, personagem]`, centro · `girando` · perto · esquerda · olho (antes: chegando, médio, direita, olho: muda movimento, plano e lado)
- **EFEITOS VISUAIS:** etiqueta vermelha "O mesmo trabalhão" (palavra "trabalhão") · congela em preto e branco (o jogo faz)
- **SONS:** `clique` em cada aba · `zumbido` da ampulheta (palavra "trabalhão")

#### 8 · plano `lista` · ~5 s · jogo `corrige`
> "Aí o Nando digita mappoa.com no computador, e vem a lista dos salões de Campinas sem site."

- **NA TELA:** no mesmo quarto de noite, o `navegador` grande acima do `monitor` com "mappoa.com" sendo digitado; depois a `tela` do Mappoa sobe do computador e fica no centro com "Meus leads", "Salões de beleza · Campinas, SP" e o grupo SEM SITE com os cartões; o Nando à direita
- **MOSTRA:** `["navegador", "tela", "personagem"]`
- **CENÁRIO:** `home_noite`; a luz da tela acende o quarto
- **ENTRA AGORA:** as abas da 7 somem no começo; o navegador surge na palavra "digita" e as letras entram até "computador" (uns 2 s); na palavra "lista", a `tela` sobe do monitor; na palavra "sem", a pílula laranja "SEM SITE" acende no topo do grupo
- **OBJETOS SE MEXENDO:** os cartões descem um a um a partir de "salões" (Bella Vista, Studio Charme, Espaço Beleza Pura, Unhas & Cia); um deles com o chip rosa "Instagram no lugar do site"
- **PERSONAGEM:** na cadeira, depois de pé · começo: `segurando`, teclando · na palavra "lista": `surpreso`, levanta e aponta a tela
- **INTERAÇÃO:** ele digita e o sistema responde com a lista
- **CÂMERA:** alvo `[navegador, tela, personagem]`, centro · `subindo` · médio · frente · olho (antes: girando, perto, esquerda: muda movimento, plano e lado)
- **EFEITOS VISUAIS:** o endereço mappoa.com grande e legível · etiqueta laranja "Sem site" (palavra "sem")
- **SONS:** `clique` em cada letra · `brilho` da tela subindo (palavra "lista") · `bip` em cada cartão

#### 9 · plano `mappoa` · ~5 s
> "Esse é o *Mappoa*, um sistema que acha o seu próximo cliente e mostra quem tem mais chance de comprar."

- **NA TELA:** no palco da marca, a `tela` no centro com a análise do Salão Bella Vista: "Dados da empresa", o círculo "Aderência à sua oferta 92/100", "Dores prováveis: sem site próprio, agenda só pelo Instagram", "Oportunidades: site com agendamento online"; o `robo` à esquerda; o Nando à direita
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** o rótulo "Mappoa" na palavra "Mappoa"; a `tela` cai na palavra "sistema"; o score enche na palavra "chance"; as dores e oportunidades na palavra "comprar"
- **OBJETOS SE MEXENDO:** o anel do score enche de 0 até 92 de "chance" a "comprar"; os blocos entram de cima pra baixo; o robô aponta a tela
- **PERSONAGEM:** à direita da tela · começo: `chamando` (puxa quem assiste pra ver) · na palavra "próximo": `vitoria`
- **INTERAÇÃO:** o robô entrega a análise e o Nando comemora o próximo cliente
- **CÂMERA:** alvo `[tela, robo, personagem]`, centro · `chegando` · médio · frente · baixo (antes: subindo, médio, frente, olho: muda movimento e altura)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" · etiqueta verde "Seu próximo cliente" (palavra "próximo")
- **SONS:** `brilho` do rótulo · `ding` no score · `certo` (palavra "comprar")

#### 10 · plano `antes_agora` · ~5 s · jogo `avanca`
> "Antes, cada cliente era um trabalhão. Agora, o Nando já sabe quem é o próximo."

- **NA TELA:** dois momentos: (1) "Antes": o home office em preto e branco, o Nando largado na cadeira e o celular gigante cheio de "Visualizado"; (2) "Agora": a calçada na frente do Salão Bella Vista, o Nando chegando com o `celular` mostrando o cartão "Próximo: Bella Vista", a `dona` acenando na porta
- **MOSTRA:** `["personagem", "salao", "celular"]`
- **CENÁRIO:** `home_office` → `cidade`
- **ENTRA AGORA:** os "Visualizado" empilhando no "Antes"; a calçada na palavra "Agora"; o celular sobe na mão dele na palavra "sabe"
- **OBJETOS SE MEXENDO:** no "Antes", a conversa rola sem parar; no "Agora", o Nando anda até a porta e o cartão do celular acende verde na palavra "próximo"
- **PERSONAGEM:** começo: `cansado` (no "Antes") · na palavra "Agora": anda confiante até o salão · na palavra "próximo": `mostrando` o celular pra dona
- **INTERAÇÃO:** o Nando chega sabendo quem é o cliente, e a dona recebe ele
- **CÂMERA:** (1) alvo `[personagem]` · `afastando` · médio · direita · olho · (2) alvo `[personagem, salao, celular]` · `passando` · médio · esquerda · olho (antes: chegando, médio, frente, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Trabalhão" no "Antes" · etiqueta verde "O próximo cliente" (palavra "próximo")
- **SONS:** `errado` no "Antes" · `whoosh` na troca · `certo` (palavra "próximo")

#### 11 · plano `segue` · ~8,5 s
> "Qual cliente deu mais trabalho pra você fechar? Comenta aí e segue pra achar o próximo. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Nando na mesa do home office de dia, na frente do `monitor`; a pergunta no topo; depois o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando à esquerda; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office` de dia, a mesa e a janela clara
- **ENTRA AGORA:** a pergunta no topo na palavra "Qual"; o cartão de seguir na palavra "segue"; o `navegador` surge na palavra "computador"; as letras a partir de "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde na palavra "testa"
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, monitor]`, centro · `parado` · aberto · frente · olho, topo livre (antes: passando, médio, esquerda: muda movimento, plano e lado)
- **EFEITOS VISUAIS:** a pergunta no topo · cartão de seguir no topo (palavra "segue")
- **SONS:** `brilho` do cartão · `clique` das letras · `ding` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Nando acena e o robô acena ao lado dele.

**Capa:** o Nando com as mãos na cabeça, cara de desespero, na frente do `celular` gigante cheio de "Visualizado", e o
`calendario` em branco com o "?" vermelho. Frase: "Quem é o *próximo*?"

## As cenas em 2 linhas

1. O celular gigante enche de mensagens sem resposta até chegar o "Fechado!", e logo aparece a agenda em branco com um "?". / O Nando, suando, comemora e leva um susto; a câmera chega de frente.
2. Na academia, surgem em cima dele um balão de mensagem, um telefone tocando e uma ampulheta. / Ele mostra o site pro dono e vai cansando até o dono fazer joia; a câmera passa pela esquerda.
3. O site pronto no monitor, as moedas caindo no pote, e o calendário da parede fica todo em branco. / Ele comemora e murcha; a câmera se afasta de baixo, pela direita.
4. Na cidade em miniatura (o Maps), ele joga envelopes "oi, faço sites" pra todo prédio, e quase todos voltam. / Ele arremessa e os envelopes caem em cima dele; a câmera sobe, do alto.
5. No meio da cidade sobem 3 salões, que acendem com um alvo em cima. / Ele tem a ideia e aponta o mais perto; a câmera revela de cima, pela esquerda.
6. Na rua, o salão tem uma placa do Instagram no lugar do site, e o celular mostra a mesma coisa no Maps. / Ele compara e se surpreende; a câmera chega pela direita.
7. De noite, abas e mais abas se empilham no computador e a ampulheta vira de novo. / Ele clica rápido e cai cansado na mesa; a câmera gira de perto.
8. Ele digita mappoa.com no computador e a lista dos salões de Campinas sem site sobe da tela. / Ele tecla, se surpreende e aponta; a câmera sobe de frente.
9. O nome Mappoa e a análise do salão: o score enchendo até 92/100, as dores e as oportunidades. / Ele comemora com o robô; a câmera chega de baixo.
10. Antes: o celular cheio de "Visualizado" em preto e branco. Agora: ele chega no salão já sabendo que é o próximo. / Ele murcha e depois mostra o celular pra dona; a câmera muda a cada parte.
11. A pergunta no topo, o cartão de seguir e mappoa.com sendo digitado. / O Nando pergunta pra câmera e digita; a câmera parada, aberta.
