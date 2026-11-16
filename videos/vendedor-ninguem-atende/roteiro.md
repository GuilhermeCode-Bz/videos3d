# Por que o seu vendedor liga e ninguém atende: roteiro e ficha de cena

## Roteiro

1. Esse é o Léo. Hoje ele ligou quarenta vezes pra empresas. Quantas atenderam? *(gancho)*
2. Nenhuma. Tocou, tocou… e nada.
3. Mas por que ninguém atende?
4. Do outro lado, o celular do dono mostra: número desconhecido. Ou pior: suspeita de spam.
5. E tem celular que nem toca: joga direto na caixa postal.
6. Então o Léo tenta o telefone fixo da clínica.
7. Mas quem atende é a recepção: "O doutor tá ocupado. Quer deixar recado?"
8. E o recado vai parar no fundo da gaveta.
9. Quando ele enfim fala com o dono, nem sabe o que a clínica faz.
10. Fala igual pra todo mundo e ouve: "Não tenho interesse."
11. O problema não é o telefone. É ligar no escuro.
12. Então ele abre o *Mappoa* e busca: clínicas veterinárias em São Paulo.
13. De uma vez, aparecem centenas de clínicas, só as que combinam com o que ele vende.
14. De cada uma, ele já vê o WhatsApp, o Instagram, o site e um resumo do negócio.
15. Então o Mappoa prepara uma mensagem pensada pra cada clínica, e ele manda no WhatsApp.
16. Agora o doutor sabe quem é o Léo antes do telefone tocar.
17. É por isso que vendedor bom não liga no escuro: liga sabendo pra quem.
18. Antes: quarenta ligações no escuro e nenhum alô.
19. Agora: centenas de clínicas certas, cada uma com o contato e a mensagem prontos.
20. E você: prefere ligar ou mandar mensagem primeiro? Comenta aí.
21. Use o Mappoa você também pelo link da Bio.

~230 palavras, uns 75 a 80 segundos (segundo vídeo do canal: um pouco mais de 1 minuto).

**O objetivo do vídeo (regra do canal):** leads com qualidade, em escala. A virada (frases 12 a 15) mostra as duas
coisas juntas: **centenas** de clínicas de uma vez (escala) e **só as que combinam** com o que ele vende, já com os
contatos e a mensagem (qualidade). O "Antes/Agora" fecha nisso: 40 ligações no escuro × centenas de clínicas certas.

## O que foi conferido

- **Número desconhecido e "suspeita de spam":** os celulares mostram quando o número não está na agenda, e o app de
  telefone do Android marca ligações suspeitas como spam. Muita gente não atende número que não conhece
- **"Tem celular que nem toca":** o iPhone tem a opção "Silenciar Ligações Desconhecidas", que manda número fora da
  agenda direto pra caixa postal, sem tocar (e há apps que bloqueiam spam no Android)
- **Mappoa** (do `canal/mappoa.md`): busca por segmento e cidade (frase 12; São Paulo, porque lá clínica veterinária
  passa fácil de centenas); "centenas" é a escala que o documento do Mappoa promete ("centenas de empresas");
  "só as que combinam com o que ele vende" é a aderência à oferta (frase 13); WhatsApp, Instagram, site e o resumo do negócio vêm do enriquecimento (frase 14;
  na tela, um cartão fica sem um ícone, porque nem todo lead tem tudo público); o Mappoa **prepara** a mensagem e
  **quem manda é o Léo** (frase 15)
- Nada de prometer venda: o doutor só **reconhece** o Léo quando o telefone toca (frase 16); a frase 19 fala de achar
  a clínica, o contato e a mensagem, não de cliente fechado. Sem preço, sem plano, sem número de resultado. "Quarenta
  ligações" é da história do Léo

## Ficha de cena

**Cenário:** `escritorio` (janelão com a cidade lá fora, duas mesas com computador, quadro branco, plantas, bebedouro e
arquivo), porque o assunto é trabalho de vendedor, dentro de empresa. Dois cantos do mesmo cenário viram dois lugares:
a **mesa do Léo** (`C.centro`, com o computador) e a **clínica veterinária** (em volta da `mesa2`, com a placa
"CLÍNICA VET", o doutor, o cachorro e o balcão da recepção). A câmera filma cada canto de um lado diferente, então
parecem lugares separados. Peças do cenário nas frases: o janelão com os prédios (frases 11 e 17), a `mesa2` (a mesa
do doutor), o quadro branco e as plantas no fundo. Foto: `referencias/cenarios/escritorio.jpg`.
**Hora:** dia. Na frase 11 o escritório escurece de propósito (só a luz do celular do Léo) e na 17 tudo acende de novo;
na 18 ("Antes"), céu de tarde.
**Personagens:** o Léo é o menino do canal (camiseta azul, cabelo castanho), quase sempre em `C.personagem`, à direita
da mesa dele. O doutor (`K.boneco({ tipo: 'doutor' })`) é o dono da clínica, atrás da `mesa2`. A recepcionista
(`K.boneco({ tipo: 'menina' })`) fica no balcão, na frente da `mesa2`.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | o Léo, o vendedor | `K.boneco` com as cores de `canal/identidade.md` | 1,47 de altura | `C.personagem` | 1 a 3, 6, 9, 11 a 15, 17 a 21 |
| `celular_leo` | o celular do Léo, na mão dele | `K.celular()` + `K.nomear` | ~0,16 × 0,3; tela desenhada: "Chamando…", "40 ligações" | na mão direita dele (`menino.mao(1)`) | 1 a 3, 6, 9, 11, 18 |
| `computador` | a mesa do Léo com o computador | `K.computador()` + `K.nomear` | mesa ~1,2 × 0,75; tela desenhada | `C.centro` | 1, 12 a 15, 19 a 21 (tela do Mappoa de 12 em diante) |
| `contador` | o número grande de ligações | `K.contador()` | branco, grande | do lado da cabeça do Léo | 1, 2, 18 |
| `doutor` | o dono da clínica, velhinho de jaleco | `K.boneco({ tipo: 'doutor' })` + `K.nomear` | ~1,6 de altura | atrás da `mesa2` | 4, 5, 7, 8, 10, 16, 19 |
| `cachorro` | o paciente do doutor, vira-lata caramelo | `K.cachorro()` + `K.nomear` | do tamanho de verdade | em cima da `mesa2`, do lado do doutor | 4, 5, 7, 8, 10, 16, 19 |
| `placa_clinica` | a placa da clínica | `K.placa('CLÍNICA VET')` | 1,4 × 0,35, branca com letras verde-escuras | na parede atrás da `mesa2`, y ≈ 2,3 | 4, 5, 7, 8, 10, 16 |
| `celular_doutor` | o celular do doutor | `K.celular()` + `K.nomear` | ~0,16 × 0,3; tela: "Número desconhecido", "Suspeita de spam", "Caixa postal", a mensagem do Léo, "Léo chamando" | em cima da `mesa2` (4, 5) e na mão dele (16) | 4, 5, 16 |
| `recepcionista` | a moça da recepção | `K.boneco({ tipo: 'menina' })` + `K.nomear` | 1,47 | atrás do balcão | 7, 8 |
| `balcao` | o balcão da recepção, com a gaveta | `K.pecas`: caixa + a gaveta (caixa que desliza) | 1,2 × 1,0 × 0,5, madeira clara | na frente da `mesa2` | 7, 8 |
| `telefone_fixo` | o telefone de mesa da clínica | `K.pecas`: base (caixa) + fone (caixa arredondada) | 0,25 × 0,1 × 0,2, bege | em cima do balcão; o fone sobe pra orelha dela na 7 | 6, 7 |
| `recado` | o papelzinho amarelo do recado | `K.placa` pequena | 0,15 × 0,15, amarelo com rabisco | do balcão pra dentro da gaveta | 8 |
| `fala_recepcao` | o balão de fala da recepcionista | `K.placa` desenhada (balão branco) | 1,2 × 0,5 | em cima da cabeça dela | 7 |
| `fala_doutor` | o balão de fala do doutor | `K.placa` desenhada (balão branco, letras vermelhas) | 1,2 × 0,4 | em cima da cabeça dele | 10 |
| `duvida` | o balão com "?" | `K.placa('?')` redonda | 0,4, branco com "?" azul | em cima da cabeça do Léo | 3, 9 |
| `empresas` | os cartões das clínicas saindo da tela | `THREE.Group` de 8 `K.placa` + `K.nomear` | cada um 0,7 × 0,22, branco com borda verde `#2e9d5b`; 3 deles cinza | em leque à esquerda da tela | 13, 14, 19 |
| `icones` | WhatsApp, Instagram, site e o resumo do lado de cada cartão | esferas achatadas + uma barrinha de texto | raio 0,06; verde, rosa, cinza, azul | à direita de cada cartão | 14, 19 |
| `mensagem` | o balão verde com a mensagem pronta | `K.placa` desenhada + `K.nomear` | 1,0 × 0,6, verde-claro | sai da tela do computador | 15, 19 |
| `janela` | o janelão com a cidade lá fora | o cenário (`C.lugares.janela`) | | parede do fundo | 11, 17 |
| etiquetas, ✓/✗, rótulo, festa, suor, ondas do toque | efeitos e textos | `K.etiqueta`, `K.marca`, `K.rotulo`, `K.festa`, `menino.suar`, `K.ondas` | | em volta | várias |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| Léo, vendedor | 1 a 21 | o `personagem` |
| quarenta vezes / ligações | 1, 18 | o `contador` subindo até 40; na 18, "40 ligações · 0 alô" |
| empresas | 1 | os prédios pelo janelão atrás dele e a tela "Chamando…" do `celular_leo` |
| tocou | 2 | as ondas do toque saindo do `celular_leo` e o som de chamada |
| celular do dono | 4, 5 | o `celular_doutor` em cima da `mesa2` |
| número desconhecido, suspeita de spam | 4 | a tela do `celular_doutor` trocando de uma pra outra |
| caixa postal | 5 | a tela do `celular_doutor`: "Caixa postal", sem tocar |
| telefone fixo, clínica | 6 | o `telefone_fixo` no balcão, tocando; a `placa_clinica` |
| recepção, doutor ocupado, recado | 7 | a `recepcionista` atende; o `doutor` atrás cuidando do `cachorro`; o `fala_recepcao` |
| gaveta, recado | 8 | o `recado` caindo dentro da gaveta do `balcao` |
| dono, o que a clínica faz | 9 | o `doutor` ao telefone; o `duvida` em cima do Léo |
| "Não tenho interesse" | 10 | o `fala_doutor` |
| telefone, escuro | 11 | o `celular_leo` aceso no escritório escurecido |
| Mappoa, clínicas veterinárias em Ribeirão Preto | 12 | a tela verde do Mappoa no `computador`, com a busca digitada; rótulo "Mappoa" |
| lista, clínicas que combinam | 13 | os cartões das `empresas`; os que combinam ganham ✓ verde, os cinza somem |
| WhatsApp, Instagram, site, resumo | 14 | os `icones` do lado dos cartões |
| mensagem, WhatsApp | 15 | a `mensagem` saindo da tela; o Léo aperta "enviar" no celular |
| doutor, telefone tocar | 16 | o `celular_doutor` na mão do doutor: a mensagem e depois "Léo chamando" |
| vendedor bom | 17 | o Léo na frente do janelão, os prédios acendendo |
| alô | 18 | o `contador` "0 alô" |
| clínica, contato, mensagem certa | 19 | `empresas`, `icones` e `mensagem` juntos, o doutor ao fundo |
| link da Bio | 21 | o cartão de seguir com o @ |

### Cena por cena

**O fundo de todas as cenas** (o cenário cuida): o escritório de dia, chão de carpete cinza; o janelão com os prédios
da cidade; as mesas com computador, o quadro branco, as plantas, o bebedouro e o arquivo. Na mesa do Léo, o
computador dele. No canto da clínica, a placa "CLÍNICA VET" na parede, a `mesa2` com o cachorro em cima e, na frente, o
balcão da recepção.

#### 1 · plano `gancho` · ~5 s
> "Esse é o Léo. Hoje ele ligou quarenta vezes pra empresas. Quantas atenderam?"

- **NA TELA:** o Léo no centro, de pé à direita da mesa dele, com o celular na orelha; o computador desligado à
  esquerda; o janelão com os prédios atrás; o contador do lado da cabeça dele; a pergunta no topo
- **MOSTRA:** `["personagem", "celular_leo"]`
- **CENÁRIO:** o escritório de dia; pelo janelão, os prédios da cidade (cada prédio, uma empresa que ele tentou)
- **ENTRA AGORA:** o `celular_leo` já está na mão; o `contador` aparece na palavra "quarenta"
- **OBJETOS SE MEXENDO:** o contador corre de 1 até 40 entre "quarenta" e "empresas"; a tela do celular pisca
  "Chamando…" a cada número
- **PERSONAGEM:** em `C.personagem`, de frente pra câmera · começo: acena (`acenar`, "Esse é o Léo") · na palavra
  "quarenta": `chamando` com o celular na orelha, batendo o pé
- **INTERAÇÃO:** ele leva o celular à orelha e liga de novo a cada número do contador
- **CÂMERA:** alvo `[personagem, celular_leo]`, ele no centro, inteiro, uns 2/3 da altura · `revelando` (começa no
  celular e abre até ele inteiro) · `aberto` · `frente` · altura `olho` · topo livre pra pergunta (`espacoCima: 0.35`)
- **EFEITOS VISUAIS:** a pergunta da capa no topo (o motor põe) · o contador "40 ligações" (palavra "quarenta")
- **SONS:** `bip` a cada número do contador · `clique` no "atenderam?"

#### 2 · plano `nenhuma` · ~3 s
> "Nenhuma. Tocou, tocou… e nada."

- **NA TELA:** o celular do Léo grande no centro, na mão dele, com a tela "Chamando…"; o rosto dele em cima, à direita
- **MOSTRA:** `["celular_leo"]`
- **CENÁRIO:** atrás, desfocado, o janelão e o quadro branco
- **ENTRA AGORA:** as ondas do toque, saindo do celular (palavra "Tocou")
- **OBJETOS SE MEXENDO:** as ondas saem do celular duas vezes ("tocou, tocou"); na palavra "nada", a tela troca pra
  "Chamada encerrada" e apaga (`K.falhar(celular_leo, 'apaga')`)
- **PERSONAGEM:** em `C.personagem`, olhando o celular · começo: `duvida`, balançando o celular · na palavra "nada":
  `triste`, os ombros caindo
- **INTERAÇÃO:** ele sacode o celular esperando alguém atender; a tela apaga na mão dele
- **CÂMERA:** alvo `celular_leo` (com a cabeça dele na beira de cima), no centro, ocupando metade da tela · `chegando` ·
  `perto` · `direita` · do `alto` (na frase 1: revelando, aberto, frente, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "0 atenderam" (palavra "Nenhuma") · ✗ vermelho em cima dela (palavra "nada")
- **SONS:** `apito` de chamada nas duas palavras "tocou" · `desliga` do celular apagando (palavra "nada"; o `K.falhar`
  põe) · o da etiqueta

#### 3 · plano `por_que` · ~2 s
> "Mas por que ninguém atende?"

- **NA TELA:** o Léo no centro, da cintura pra cima, coçando a cabeça com o celular na outra mão; o balão "?" em cima
  da cabeça dele
- **MOSTRA:** `["personagem", "duvida"]`
- **CENÁRIO:** atrás, o quadro branco e a planta
- **ENTRA AGORA:** o balão `duvida`, crescendo em cima da cabeça (palavra "por")
- **OBJETOS SE MEXENDO:** o balão cresce com um pulinho e balança de leve
- **PERSONAGEM:** em `C.personagem`, de frente · começo: `pensando` · na palavra "atende": `duvida`, abrindo os braços
- **INTERAÇÃO:** ele olha pro celular apagado e depois pra câmera, sem entender
- **CÂMERA:** alvo `[personagem, duvida]`, no centro · `girando` · `medio` · `esquerda` · altura `olho` (na frase 2:
  chegando, perto, direita, do alto)
- **EFEITOS VISUAIS:** o balão "?"
- **SONS:** `estalo` do balão aparecendo (palavra "por")

#### 4 · plano `desconhecido` · ~5 s
> "Do outro lado, o celular do dono mostra: número desconhecido. Ou pior: suspeita de spam."

- **NA TELA:** o celular do doutor grande no centro, em cima da mesa dele, vibrando, com a tela "Número desconhecido";
  atrás, desfocados, o doutor examinando o cachorro e a placa "CLÍNICA VET"
- **MOSTRA:** `["celular_doutor"]`
- **CENÁRIO:** o canto da clínica: a `mesa2`, a placa na parede, uma planta do lado
- **ENTRA AGORA:** o canto da clínica inteiro (o corte "do outro lado" mostra outro lugar); a tela "Suspeita de spam"
  (palavra "spam")
- **OBJETOS SE MEXENDO:** o celular vibra na mesa (treme de lado) desde o começo; na palavra "desconhecido", a tela
  mostra "Número desconhecido" com um ícone de pessoa cinza; na palavra "spam", a tela fica vermelha com
  "Suspeita de spam" e um ⚠
- **PERSONAGEM:** o Léo não aparece. O doutor atrás da mesa, olhando o cachorro · começo: `segurando` o cachorro
  (examinando) · na palavra "spam": vira a cara pro celular, `bravo`
- **INTERAÇÃO:** o celular vibra pedindo atenção; o doutor olha de canto e ignora
- **CÂMERA:** alvo `celular_doutor`, no centro, ocupando a tela quase toda · `chegando` · `detalhe` · `frente` · de
  `cima` (na frase 3: girando, médio, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta azul "Número desconhecido" (palavra "desconhecido") · etiqueta vermelha "Spam?" (palavra
  "spam")
- **SONS:** `zumbido` do celular vibrando · `errado` (palavra "spam") · o das etiquetas

#### 5 · plano `caixa_postal` · ~3 s · jogo `falha`
> "E tem celular que nem toca: joga direto na caixa postal."

- **NA TELA:** a mesa do doutor no centro, com o celular quieto em cima; o doutor atrás dela, à esquerda, ocupado com o
  cachorro; a placa "CLÍNICA VET" no alto
- **MOSTRA:** `["celular_doutor", "doutor"]`
- **CENÁRIO:** o canto da clínica; atrás, a planta e o quadro branco
- **ENTRA AGORA:** a etiqueta "Caixa postal" (palavra "caixa")
- **OBJETOS SE MEXENDO:** o celular fica parado, sem vibrar (palavra "nem toca"); a tela só acende uma vez, com o
  ícone da fita da caixa postal, e apaga (`K.falhar(celular_doutor, 'apaga')`, palavra "postal"); o cachorro abana o
  rabo; no fim, congela em preto e branco
- **PERSONAGEM:** o doutor, atrás da mesa · começo: `segurando` o cachorro, sorrindo pra ele · na palavra "postal":
  `mostrando` o cachorro (nem percebe o celular)
- **INTERAÇÃO:** o doutor cuida do cachorro; o celular apaga do lado dele sem ninguém ver
- **CÂMERA:** alvo `[celular_doutor, doutor]`, a mesa no centro · `passando` · `medio` · `perfil_direita` · de `baixo`
  (na frase 4: chegando, detalhe, frente, de cima)
- **EFEITOS VISUAIS:** etiqueta vermelha "Direto pra caixa postal" (palavra "caixa") · ✗ do lado dela (palavra
  "postal") · congela em preto e branco (o `jogo` faz)
- **SONS:** `desliga` do celular apagando (o `K.falhar` põe) · o da etiqueta · o congela (o `jogo` põe)

#### 6 · plano `fixo` · ~3 s · jogo `corrige`
> "Então o Léo tenta o telefone fixo da clínica."

- **NA TELA:** o telefone fixo da clínica no centro, em cima do balcão, tocando e pulando; o Léo, do lado dele, à
  direita, com o celular na orelha, discando (os dois no mesmo quadro, como se a ligação ligasse um ao outro)
- **MOSTRA:** `["telefone_fixo", "personagem"]`
- **CENÁRIO:** o balcão da recepção, com a placa "CLÍNICA VET" atrás
- **ENTRA AGORA:** o `telefone_fixo`, caindo em cima do balcão (`cai`, palavra "tenta"); a linha pontilhada de
  sinal (`K.fluxo`) do celular dele até o telefone (palavra "fixo")
- **OBJETOS SE MEXENDO:** o telefone pula de leve a cada toque, a partir de "fixo"; os pontinhos correm do celular até
  o telefone
- **PERSONAGEM:** o Léo anda de `C.entrada` até a beira do balcão na 1ª metade · começo: `ideia` (dedo pra cima) · na
  palavra "fixo": `chamando`, celular na orelha
- **INTERAÇÃO:** ele disca e o telefone da clínica começa a tocar
- **CÂMERA:** alvo `[telefone_fixo, personagem]`, o telefone no centro · `subindo` · `medio` · `frente` · do `alto` (na
  frase 5: passando, médio, perfil direito, de baixo)
- **EFEITOS VISUAIS:** etiqueta azul "Telefone fixo" (palavra "fixo") · os pontinhos do sinal
- **SONS:** `baque` do telefone caindo no balcão · `apito` de chamada (palavra "fixo"), duas vezes

#### 7 · plano `recepcao` · ~4 s
> "Mas quem atende é a recepção: 'O doutor tá ocupado. Quer deixar recado?'"

- **NA TELA:** a recepcionista no centro, atrás do balcão, com o fone na orelha e o balão de fala em cima; o doutor
  atrás dela, à esquerda, com o cachorro
- **MOSTRA:** `["recepcionista", "fala_recepcao"]`
- **CENÁRIO:** o canto da clínica: a `mesa2` com o cachorro, a placa na parede
- **ENTRA AGORA:** a `recepcionista` (já atrás do balcão); o fone sobe do telefone pra orelha dela (palavra "atende");
  o balão `fala_recepcao` (palavra "ocupado")
- **OBJETOS SE MEXENDO:** o fone sobe até a orelha dela; o balão cresce com o texto "O doutor tá ocupado… deixa
  recado?"; atrás, o doutor dá um biscoito pro cachorro
- **PERSONAGEM:** o Léo não aparece. A recepcionista · começo: `segurando` o fone · na palavra "ocupado": aponta pro
  doutor atrás dela (`mostrando`). O doutor · `segurando` o cachorro o tempo todo
- **INTERAÇÃO:** ela atende e aponta pro doutor ocupado; ele nem olha
- **CÂMERA:** alvo `[recepcionista, fala_recepcao]`, ela no centro, da cintura pra cima · `chegando` · `perto` ·
  `esquerda` · altura `olho` (na frase 6: subindo, médio, frente, do alto)
- **EFEITOS VISUAIS:** o balão de fala · etiqueta laranja "Recepção" (palavra "recepção")
- **SONS:** `clique` do fone tirado do gancho (palavra "atende") · o da etiqueta

#### 8 · plano `gaveta` · ~3 s · jogo `falha`
> "E o recado vai parar no fundo da gaveta."

- **NA TELA:** a gaveta do balcão aberta no centro, vista de cima; o papelzinho amarelo do recado caindo dentro, em
  cima de uma pilha de outros recados; a mão da recepcionista em cima
- **MOSTRA:** `["recado", "balcao"]`
- **CENÁRIO:** o chão da clínica e a base da `mesa2` atrás
- **ENTRA AGORA:** o `recado` (palavra "recado"), escorregando do balcão; a gaveta se abre (palavra "parar")
- **OBJETOS SE MEXENDO:** a gaveta desliza pra fora; o recado cai girando lá dentro, em cima dos outros 5 papeizinhos;
  na palavra "fundo", a gaveta fecha com força
- **PERSONAGEM:** a recepcionista atrás do balcão · começo: `segurando` o recado · na palavra "gaveta": fecha a gaveta
  (`empurrando`) e volta a sorrir
- **INTERAÇÃO:** ela joga o recado na gaveta e fecha
- **CÂMERA:** alvo `[recado, balcao]`, a gaveta no centro · `descendo` · `perto` · `direita` · de `cima` (na frase 7:
  chegando, perto, esquerda, olho)
- **EFEITOS VISUAIS:** etiqueta vermelha "Recado esquecido" (palavra "fundo") · congela em preto e branco (o `jogo`)
- **SONS:** `madeira` da gaveta abrindo · `tampa` da gaveta batendo (palavra "fundo") · o congela

#### 9 · plano `nem_sabe` · ~4 s
> "Quando ele enfim fala com o dono, nem sabe o que a clínica faz."

- **NA TELA:** o Léo no centro, com o celular na orelha, suando; o balão "?" em cima dele com "Clínica de quê?"; o
  computador desligado atrás
- **MOSTRA:** `["personagem", "duvida"]`
- **CENÁRIO:** a mesa do Léo, com o janelão atrás
- **ENTRA AGORA:** o balão `duvida`, agora com "Clínica de quê?" (palavra "sabe")
- **OBJETOS SE MEXENDO:** o balão cresce; as gotas de suor escorrem a partir de "nem"
- **PERSONAGEM:** em `C.personagem` · começo: `surpreso`, alegre (alguém atendeu!) · na palavra "nem": `susto`, suando
  (`menino.suar`)
- **INTERAÇÃO:** ele escuta a voz do dono e trava, sem saber o que dizer
- **CÂMERA:** alvo `[personagem, duvida]`, no centro · `revelando` · `medio` · `perfil_esquerda` · altura `olho` (na
  frase 8: descendo, perto, direita, de cima)
- **EFEITOS VISUAIS:** o balão "Clínica de quê?" · as gotas de suor
- **SONS:** `ding` de alguém atendendo (palavra "fala") · `estalo` do balão (palavra "sabe")

#### 10 · plano `sem_interesse` · ~3 s
> "Fala igual pra todo mundo e ouve: 'Não tenho interesse.'"

- **NA TELA:** o doutor no centro, atrás da mesa dele, com o celular na orelha e o balão "Não tenho interesse." em
  cima; o cachorro do lado, de orelha em pé
- **MOSTRA:** `["doutor", "fala_doutor"]`
- **CENÁRIO:** o canto da clínica, com a placa "CLÍNICA VET"
- **ENTRA AGORA:** o balão `fala_doutor` (palavra "interesse")
- **OBJETOS SE MEXENDO:** o balão cresce; na palavra "interesse", o doutor baixa o celular e desliga (o celular apaga)
- **PERSONAGEM:** o Léo não aparece. O doutor · começo: `cansado` (ouvindo o discurso de sempre) · na palavra
  "interesse": `bravo`, desligando
- **INTERAÇÃO:** o doutor desliga na cara do Léo; o cachorro late junto
- **CÂMERA:** alvo `[doutor, fala_doutor]`, no centro · `chegando` · `perto` · `frente` · de `baixo` (na frase 9:
  revelando, médio, perfil esquerdo, olho)
- **EFEITOS VISUAIS:** o balão · etiqueta vermelha "Discurso igual pra todos" (palavra "igual")
- **SONS:** `desliga` (palavra "interesse") · o da etiqueta

#### 11 · plano `no_escuro` · ~3 s · jogo `falha`
> "O problema não é o telefone. É ligar no escuro."

- **NA TELA:** o escritório inteiro escurecendo; o Léo no centro, iluminado só pela luz do celular dele; o janelão
  atrás, escurecendo também
- **MOSTRA:** `["personagem", "celular_leo"]`
- **CENÁRIO:** o escritório com a luz apagando (`K.ceu` vai pra noite, de propósito, só nesta frase)
- **ENTRA AGORA:** o escuro (palavra "escuro")
- **OBJETOS SE MEXENDO:** a luz do escritório cai até quase preto entre "ligar" e "escuro"; a tela do celular brilha
  (`K.halo`); no fim, congela em preto e branco
- **PERSONAGEM:** em `C.personagem` · começo: `mostrando` o celular ("não é o telefone") · na palavra "escuro":
  `triste`, tateando o ar
- **INTERAÇÃO:** o celular é a única luz em volta dele
- **CÂMERA:** alvo `[personagem, celular_leo]` · `afastando` · `aberto` · `frente` · do `alto` (na frase 10: chegando,
  perto, frente, de baixo; aqui muda o plano e a altura)
- **EFEITOS VISUAIS:** etiqueta laranja "Ligar no escuro" (palavra "escuro") · o brilho do celular · congela em preto
  e branco
- **SONS:** `desliga` da luz apagando (palavra "escuro") · o congela

#### 12 · plano `mappoa` · ~4 s · jogo `corrige`
> "Então ele abre o *Mappoa* e busca: clínicas veterinárias em São Paulo."

- **NA TELA:** a tela do computador grande no centro, verde, com "Mappoa" em cima e a barra de busca; as mãos do Léo
  no teclado, à direita
- **MOSTRA:** `["computador"]`
- **CENÁRIO:** o escritório de volta ao dia
- **ENTRA AGORA:** a tela do Mappoa, acendendo de baixo pra cima (palavra "Mappoa")
- **OBJETOS SE MEXENDO:** na palavra "busca", "clínicas veterinárias em São Paulo" aparece letra por letra
- **PERSONAGEM:** em `C.personagem`, de lado pra tela · começo: `ideia` · na palavra "busca": `empurrando` (digitando)
- **INTERAÇÃO:** ele abre o Mappoa e digita; o texto aparece no ritmo dos dedos
- **CÂMERA:** alvo `computador`, a tela no centro, ocupando 2/3 · `chegando` · `perto` · `perfil_direita` · altura
  `olho` (na frase 11: afastando, aberto, frente, do alto)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" (palavra "Mappoa") · o texto digitando
- **SONS:** `liga` da tela · `clique` das teclas (palavra "busca") · o do rótulo

#### 13 · plano `lista` · ~5 s
> "De uma vez, aparecem centenas de clínicas, só as que combinam com o que ele vende."

- **NA TELA:** o computador à direita; uma enxurrada de cartões de clínicas saindo da tela e formando uma coluna alta à
  esquerda (8 de frente e mais fileiras atrás, sumindo na profundidade, dando a ideia de centenas); o contador subindo;
  os cinza somem e ficam só os verdes com ✓; o Léo à direita
- **MOSTRA:** `["empresas", "computador"]`
- **CENÁRIO:** atrás, o janelão com a cidade
- **ENTRA AGORA:** os cartões das `empresas`, jorrando da tela bem rápido (palavra "vez"); o contador (palavra
  "centenas"); os ✓ (palavra "combinam")
- **OBJETOS SE MEXENDO:** os cartões saem em rajada, girando, e empilham em fileiras; o contador corre de 0 até
  "centenas"; na palavra "combinam", os cartões cinza (os que não combinam) encolhem e somem, e os que ficam ganham a
  borda verde e um ✓, um atrás do outro
- **PERSONAGEM:** em `C.personagem` · começo: `surpreso`, de boca aberta com a quantidade · na palavra "combinam":
  `mostrando` os cartões verdes
- **INTERAÇÃO:** a tela joga os cartões no ar e ele mostra os que combinam
- **CÂMERA:** alvo `[empresas, computador]`, os cartões no centro · `subindo` · `medio` · `esquerda` · do `alto` (na
  frase 12: chegando, perto, perfil direito, olho)
- **EFEITOS VISUAIS:** contador "+ centenas de clínicas" (palavra "centenas") · etiqueta verde "Só as que combinam"
  (palavra "combinam")
- **SONS:** `whoosh` da rajada (palavra "vez") · `bip` rápido do contador · `certo` (palavra "combinam")

#### 14 · plano `contatos` · ~5 s
> "De cada uma, ele já vê o WhatsApp, o Instagram, o site e um resumo do negócio."

- **NA TELA:** a coluna de cartões grande no centro; do lado de cada um, os ícones crescendo um tipo por vez; o Léo
  embaixo, à direita, apontando
- **MOSTRA:** `["empresas", "icones"]`
- **CENÁRIO:** atrás, o janelão desfocado
- **ENTRA AGORA:** os `icones`, um tipo por palavra (`cresce`): verde do WhatsApp ("WhatsApp"), rosa do Instagram
  ("Instagram"), cinza do site ("site"), a barrinha azul de texto ("resumo"); num cartão, um ícone fica faltando
- **OBJETOS SE MEXENDO:** cada ícone cresce com um pulinho; na palavra "resumo", o cartão de cima abre e mostra 3
  linhas de texto
- **PERSONAGEM:** em `C.personagem` · começo: `mostrando` · na palavra "resumo": aponta (`apontar`) pro cartão aberto
- **INTERAÇÃO:** ele aponta pra cada ícone na hora em que aparece
- **CÂMERA:** alvo `[empresas, icones]`, no centro, 2/3 da tela · `girando` · `perto` · `frente` · altura `olho` (na
  frase 13: subindo, médio, esquerda, do alto)
- **EFEITOS VISUAIS:** os ícones · etiqueta azul "Resumo do negócio" (palavra "resumo")
- **SONS:** `ding` em cada ícone · o da etiqueta

#### 15 · plano `mensagem` · ~5 s · jogo `corrige`
> "Então o Mappoa prepara uma mensagem pensada pra cada clínica, e ele manda no WhatsApp."

- **NA TELA:** o computador no centro, com o balão verde da mensagem saindo da tela; o Léo à direita, com o celular
  na mão, apertando "enviar"
- **MOSTRA:** `["mensagem", "computador"]`
- **CENÁRIO:** atrás, o janelão com a cidade
- **ENTRA AGORA:** a `mensagem`, deslizando de dentro da tela pra frente (palavra "mensagem"); o `celular_leo` na mão
  dele (palavra "manda")
- **OBJETOS SE MEXENDO:** a tela mostra "escrevendo…" (palavra "prepara"); o balão sai, cresce e o texto aparece: "Oi,
  doutor! Vi que a clínica atende cães e gatos em Ribeirão…"; na palavra "manda", o balão encolhe e voa pro celular do
  Léo, com um aviãozinho de "enviado"
- **PERSONAGEM:** em `C.personagem` · começo: `surpreso`, lendo · na palavra "manda": `segurando` o celular e apertando
  enviar
- **INTERAÇÃO:** o Mappoa prepara, e quem aperta enviar é ele
- **CÂMERA:** alvo `[mensagem, computador]`, o balão no centro · `passando` · `medio` · `direita` · do `alto` (na
  frase 14: girando, perto, frente, olho)
- **EFEITOS VISUAIS:** etiqueta verde "Mensagem pronta" (palavra "cada") · ✓ verde do lado (palavra "manda")
- **SONS:** `whoosh` do balão saindo · `clique` do enviar · `ding` de enviado (palavra "WhatsApp")

#### 16 · plano `doutor_sabe` · ~4 s
> "Agora o doutor sabe quem é o Léo antes do telefone tocar."

- **NA TELA:** o doutor no centro, atrás da mesa, lendo a mensagem no celular e sorrindo; o cachorro do lado; a placa
  "CLÍNICA VET" atrás; depois a tela vira "Léo chamando" e ele atende
- **MOSTRA:** `["doutor", "celular_doutor"]`
- **CENÁRIO:** o canto da clínica, de dia
- **ENTRA AGORA:** a mensagem na tela do celular dele (começo); a tela "Léo chamando" (palavra "tocar")
- **OBJETOS SE MEXENDO:** o celular vibra na mão dele (palavra "tocar"); o cachorro abana o rabo; ondas do toque
- **PERSONAGEM:** o Léo não aparece. O doutor · começo: `pensando`, lendo, com um sorriso · na palavra "tocar":
  `surpreso` e feliz, leva o celular à orelha
- **INTERAÇÃO:** o doutor reconhece o nome na tela e atende
- **CÂMERA:** alvo `[doutor, celular_doutor]`, no centro · `chegando` · `perto` · `esquerda` · de `baixo` (na frase
  15: passando, médio, direita, do alto)
- **EFEITOS VISUAIS:** etiqueta verde "Já sabe quem é" (palavra "sabe") · ✓ (palavra "tocar")
- **SONS:** `zumbido` do celular vibrando (palavra "tocar") · `ding` · o da etiqueta

#### 17 · plano `sabendo` · ~4 s
> "É por isso que vendedor bom não liga no escuro: liga sabendo pra quem."

- **NA TELA:** o janelão no centro, com os prédios da cidade; o Léo embaixo, na frente da janela, apontando pra fora
- **MOSTRA:** `["janela", "personagem"]`
- **CENÁRIO:** a vida real é o assunto: a cidade cheia de prédios, cada um uma empresa
- **ENTRA AGORA:** os pontinhos verdes nas janelas dos prédios lá fora (palavra "sabendo")
- **OBJETOS SE MEXENDO:** o escritório começa meio escuro e acende de vez na palavra "liga"; os pontinhos verdes
  acendem nos prédios, um atrás do outro, a partir de "sabendo"
- **PERSONAGEM:** anda até a frente do janelão na 1ª metade · na palavra "sabendo": aponta pra fora (`apontar`) e dá
  um pulinho (`ideia`)
- **INTERAÇÃO:** ele aponta e os prédios acendem onde ele aponta
- **CÂMERA:** alvo `[personagem, janela]` · `revelando` · `aberto` · `frente` · de `baixo` (na frase 16: chegando,
  perto, esquerda, de baixo; aqui muda o plano e o lado)
- **EFEITOS VISUAIS:** etiqueta laranja "Liga sabendo pra quem" (palavra "sabendo") · os pontinhos verdes
- **SONS:** `liga` da luz acendendo (palavra "liga") · `bip` dos pontinhos · o da etiqueta

#### 18 · plano `antes` · ~3 s
> "Antes: quarenta ligações no escuro e nenhum alô."

- **NA TELA:** o Léo no centro, encostado na mesa, de tarde, com o celular apagado; o contador "40" do lado dele
- **MOSTRA:** `["personagem", "celular_leo"]`
- **CENÁRIO:** o janelão com o céu de tarde, alaranjado
- **ENTRA AGORA:** o contador "40 ligações" (palavra "quarenta"); o "0 alô" (palavra "alô")
- **OBJETOS SE MEXENDO:** o céu escurece de leve; o celular apaga na mão dele
- **PERSONAGEM:** em `C.personagem` · começo: `cansado` · na palavra "nenhum": `triste`, suando
- **INTERAÇÃO:** ele olha o celular apagado e desanima
- **CÂMERA:** alvo `[personagem, celular_leo]` · `afastando` · `medio` · `esquerda` · do `alto` (na frase 17:
  revelando, aberto, frente, de baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "Antes: 0 alô" (palavra "Antes") · o contador "40"
- **SONS:** `errado` (palavra "nenhum") · o da etiqueta

#### 19 · plano `agora` · ~4 s
> "Agora: centenas de clínicas certas, cada uma com o contato e a mensagem prontos."

- **NA TELA:** tudo junto e colorido: o computador verde no centro, a coluna alta de cartões verdes com os ícones à
  esquerda, o balão da mensagem em cima da mesa; o Léo à direita, comemorando; confete caindo
- **MOSTRA:** `["empresas", "mensagem", "personagem"]`
- **CENÁRIO:** o escritório de dia, com a cidade ensolarada
- **ENTRA AGORA:** as `empresas`, a coluna inteira de uma vez (palavra "centenas"); os `icones` (palavra "contato"); a
  `mensagem` (palavra "mensagem"); o confete (palavra "prontos")
- **OBJETOS SE MEXENDO:** os cartões brilham em onda, de cima pra baixo; cada coisa pisca quando é dita; o confete cai
- **PERSONAGEM:** em `C.personagem` · começo: `vitoria` · na palavra "prontos": `comemorar`
- **INTERAÇÃO:** ele mostra a coluna de clínicas e comemora no fim
- **CÂMERA:** alvo `[empresas, mensagem, personagem]` · `girando` · `medio` · `direita` · altura `olho` (na frase 18:
  afastando, médio, esquerda, do alto)
- **EFEITOS VISUAIS:** etiqueta verde "Agora: centenas de clínicas certas" (palavra "Agora") · ✓ na mensagem · confete
  (`K.festa`)
- **SONS:** `brilho` (palavra "centenas") · `certo` (palavra "mensagem") · `festa` no fim

#### 20 · plano `pergunta` · ~4 s
> "E você: prefere ligar ou mandar mensagem primeiro? Comenta aí."

- **NA TELA:** o Léo no centro, de frente, falando com quem assiste; na mão esquerda o celular, e em cima de cada mão
  um ícone: 📞 e 💬
- **MOSTRA:** `["personagem"]`
- **CENÁRIO:** atrás, a mesa com o computador verde e o janelão
- **ENTRA AGORA:** a etiqueta "Ligar" (palavra "ligar") e a etiqueta "Mensagem" (palavra "mensagem")
- **OBJETOS SE MEXENDO:** as duas etiquetas balançam como uma balança, uma sobe e a outra desce
- **PERSONAGEM:** em `C.personagem`, olhando pra câmera · começo: `chamando` ("E você") · na palavra "Comenta":
  `mostrando`, a mão apontando pra baixo (pros comentários)
- **INTERAÇÃO:** ele pesa as duas opções nas mãos e passa a pergunta pra quem assiste
- **CÂMERA:** alvo `personagem`, da cintura pra cima · `chegando` · `perto` · `frente` · altura `olho` (na frase 19:
  girando, médio, direita, olho)
- **EFEITOS VISUAIS:** etiqueta azul "Ligar?" (palavra "ligar") · etiqueta verde "Mensagem?" (palavra "mensagem")
- **SONS:** `bip` (palavra "Comenta") · o das etiquetas

#### 21 · plano `segue` · ~3 s
> "Use o Mappoa você também pelo link da Bio."

- **NA TELA:** o cartão de seguir no topo; a mesa com o computador verde no meio; o Léo inteiro embaixo, à direita,
  apontando pro cartão
- **MOSTRA:** `["personagem"]`
- **CENÁRIO:** o escritório inteiro, com o janelão e a cidade
- **ENTRA AGORA:** o cartão de seguir (palavra "Mappoa")
- **OBJETOS SE MEXENDO:** o botão "+ Seguir" é apertado e vira "Seguindo"
- **PERSONAGEM:** em `C.personagem`, feliz · começo: `mostrando` a tela verde · na palavra "Bio": aponta pro cartão
  (`apontar(1)`)
- **INTERAÇÃO:** ele aponta pro cartão de seguir
- **CÂMERA:** alvo `[computador, personagem]` · `parado` · `aberto` · `espacoCima: 0.45` (na frase 20: chegando, perto,
  frente)
- **EFEITOS VISUAIS:** o cartão de seguir, com o @mappoa_leads e o botão
- **SONS:** `brilho` do cartão (palavra "Mappoa") · `clique` do botão

**Cauda (`cartao`, 1,6 s):** o cartão fica e o Léo acena, com a mesma câmera; toca o som `final`.

## Em palavras simples (o que vai pra pessoa aprovar)

1. O Léo no escritório, celular na orelha, e o contador correndo até 40. / Ele acena e liga de novo; a câmera abre do
   celular até ele.
2. O celular dele de pertinho: toca, toca, e a tela apaga. / Ele sacode o celular e murcha.
3. Um balão "?" em cima da cabeça dele. / Ele abre os braços sem entender; a câmera gira.
4. Do outro lado: o celular do doutor vibrando, "Número desconhecido" e depois "Suspeita de spam". / O doutor cuidando
   de um cachorro olha torto pro celular.
5. O celular do doutor nem toca: só acende "Caixa postal" e apaga. / Ele nem percebe; congela.
6. O telefone fixo da clínica cai no balcão e começa a tocar. / O Léo liga de novo, com ideia nova.
7. A recepcionista atende: "O doutor tá ocupado, deixa recado?". / Ela aponta pro doutor, que dá biscoito pro cachorro.
8. O recado amarelo cai no fundo da gaveta, em cima de outros, e a gaveta fecha. / Congela.
9. Alguém atende, mas o Léo trava: balão "Clínica de quê?". / Ele sua; a câmera abre de lado.
10. O doutor: "Não tenho interesse." e desliga. / O cachorro late junto.
11. O escritório escurece e só o celular do Léo brilha: "Ligar no escuro". / Congela.
12. Volta a luz: a tela verde do Mappoa, ele digita "clínicas veterinárias em São Paulo". / Pulinho de ideia.
13. Uma enxurrada de cartões de clínicas jorra da tela e o contador sobe até "centenas"; as que não combinam somem e
    as que ficam ganham ✓ verde. / Ele fica de boca aberta; a câmera sobe.
14. Do lado de cada cartão: WhatsApp, Instagram, site e o resumo. / Ele aponta cada um.
15. Um balão de mensagem sai da tela, já escrito pro doutor, e ele aperta enviar no celular.
16. O doutor lê a mensagem, sorri, e a tela vira "Léo chamando". / Ele atende feliz; a câmera chega de baixo.
17. O Léo vai até a janela, a luz acende e os prédios lá fora ganham pontinhos verdes. / A câmera abre até a cidade.
18. "Antes": de tarde, 40 ligações no escuro e 0 alô. / Ele desanima; a câmera se afasta.
19. "Agora": a coluna de centenas de clínicas certas, com os contatos e a mensagem, e confete. / Ele comemora.
20. Ele pergunta: "prefere ligar ou mandar mensagem primeiro?". / A câmera chega perto.
21. O cartão de seguir aparece e o botão vira "Seguindo". / Ele aponta pro cartão.
