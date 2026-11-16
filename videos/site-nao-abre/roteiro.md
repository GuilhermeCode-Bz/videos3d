# O cliente clicou no site da clínica. Se a página não abre, ele liga pra outra: roteiro e ficha de cena

> Da pauta, seção "Web designer sem clientes" (11/11/2026). Feita no molde do `cliente-pediu-desconto`, com o que a
> retenção ensinou: gancho com ação na tela no 1º segundo, o personagem já dentro da ação (sem "Esse é o ..."), mais
> tempo na dor e na virada, o Mappoa curto e começando pelo resultado, 45 a 60 s. O Mappoa é um **sistema de
> prospecção** que acha o próximo cliente (nunca "um site").

## Roteiro

1. O cliente clicou no site da clínica. Se a página não abre, ele liga pra outra. *(gancho, a frase do dono)*
2. O Vini é web designer, oferece site pras clínicas e sempre ouve: "já temos site".
3. Ele risca a clínica da lista e vai pra próxima.
4. Só que tem clínica com site que nem abre.
5. O dono nem sabe. Quem clica vê o erro e liga pro concorrente.
6. Isso é um motivo concreto pra pagar: ninguém quer perder paciente por uma página quebrada.
7. E é a sua prova pronta pra abordagem: "testei o site de vocês e ele não abriu".
8. Mas testar clínica por clínica, na mão, leva o dia inteiro.
9. Aí o Vini abre a lista das clínicas de Londrina, com cada site já testado e as empresas que não têm site.
10. Esse é o *Mappoa*: ele acha o seu próximo cliente, quem precisa do seu serviço, já com os contatos.
11. Antes, o Vini ouvia "já temos site". Agora, chega mostrando o erro pra quem precisa dele.
12. Site fora do ar é culpa da clínica ou de quem fez o site? Comenta aí e segue pro próximo sinal de cliente. No computador, digita mappoa.com e testa você também.

Cerca de 180 palavras, uns 55 a 60 segundos, 12 frases (uns 1.050 caracteres da ElevenLabs; sobram 2.655).

**Onde o tempo vai:** gancho e dor (1 a 3) uns 13 s · a virada (4 a 7) uns 18 s · a busca na mão (8) 3 s · o Mappoa
(9 e 10) uns 10 s, já começando pela lista pronta e contado como parte da história do Vini, sem cara de anúncio · o fim (11 e 12) uns 14 s.

**Gancho escolhido:** A, a frase do dono (é o pedido, e vira título e capa). Opções:
- **A:** "O cliente clicou no site da clínica. Se a página não abre, ele liga pra outra." (na tela, no 1º quadro: o
  dedo tocando "Clínica Sorriso" no celular gigante, a rodinha girando, o erro e o celular trocando pra "Ligando:
  Clínica Bem Estar")
- **B:** "A página da clínica não abriu. Se o cliente esperar 3 segundos, ele já foi." (tem número: descartado, não dá
  pra provar)
- **C:** "O site da clínica deu erro. Se ela não sabe, você tem um cliente."

**Capa:** "Site *fora do ar*?" (17 letras, cabe numa linha), com o paciente de boca aberta e o celular gigante com o
erro.

## O que foi conferido

- Sem preço em reais e sem número falado. Na tela, só o "404" do erro (é o nome do erro, e o Mappoa marca "não
  encontrado (404)") e nenhum total de leads (a lista sai sem a contagem do topo)
- O que o Mappoa faz aqui é o que está em `canal/produto.md`: a captura acha as clínicas no Maps, e o enriquecimento
  "Contatos e presença digital" entra no site e marca se ele **abriu**, está **fora do ar / não encontrado (404)**,
  **não respondeu** ou está **bloqueado**, e junta os contatos públicos (WhatsApp, telefone, e-mail). Não falo de
  análise da IA nem de mensagem pronta citando o erro: com o site fora do ar não tem texto pra IA ler
- Na tela, o status do site aparece como no bloco "Presença digital" do lead, não como um botão "site ruim"
- O Mappoa "acha o seu próximo cliente, quem precisa do seu serviço" (10); o "sistema de prospecção" fica na etiqueta
  da tela e no texto de postar, e o "site" só aparece no endereço mappoa.com do fim. A frase 9 mostra o resultado (a
  lista com cada site testado e as empresas sem site, que a captura separa sozinha) dentro da história do Vini, e só a
  10 dá o nome: pra não soar como anúncio (o dono pediu, 11/11/2026)
- Quem manda a mensagem é o Vini (frase 7: a prova é dele; frase 11: "chega mostrando o erro"). Nada de prometer venda
- Sem "Esse é o Vini": o Vini aparece já no telefone com a clínica (frase 2), com o nome dentro da ação
- Empresas inventadas: Clínica Sorriso (site fora do ar), Clínica Bem Estar (o concorrente) e as outras da lista.
  Cidade: Londrina, PR
- Nenhuma frase repete os vídeos anteriores; o "já temos site" é a dor que funcionou no `site-desatualizado`, com outra
  virada (o site que nem abre)

## Ficha de cena

**Cenários (seis, com `K.cenarios`):** `cidade` (1: a calçada na frente da Clínica Sorriso), `home_office` (2, 3, 7 e
12: o quarto do Vini, de dia), `clinica_odonto` (4, 5, 6 e o "Agora" da 11: a recepção da Clínica Sorriso),
`home_noite` (8: o mesmo quarto de noite), `central_mappoa` (9: a lista) e `mundo_mappoa` (10: o lead). **Hora:** dia,
menos na 8.
**Personagens:** o do canal, chamado Vini (da 2 em diante). O **paciente** (`K.boneco` de moletom verde, `K.semNome`,
com a mão no rosto: dor de dente) na 1, na 5 e na capa. O **dono da clínica** (`K.boneco({ tipo: 'doutor' })`,
`K.semNome`) na 5, na 6 e no "Agora" da 11. **O robô do Mappoa** só na 9, na 10 e na 12.

### Objetos do vídeo

| Nome | O que é | Feito com | Tamanho e cor | Onde fica | Aparece |
|---|---|---|---|---|---|
| `personagem` | Vini | `K.boneco`, cores do canal | 1,47 | muda por cenário | 2 a 12 |
| `paciente` | o cliente que clica no site | `K.boneco` moletom verde | 1,47 | calçada / recepção | 1, 5 |
| `dono` | o dentista dono da clínica | `K.boneco` tipo doutor | 1,47 | atrás do balcão | 5, 6, 11 |
| `celular` | celular gigante com o navegador: o link "Clínica Sorriso", a rodinha, o erro 404, a ligação pra outra | `K.celular()` + tela desenhada | escala 5,5 (gancho) / 1,8 (na mão) | no ar, na frente / na mão | 1, 2, 7, 11, capa |
| `clinica` | a fachada da Clínica Sorriso na cidade | prédio `kenney-cidade` + toldo verde-água + placa | prédio 5× | calçada | 1 |
| `lista` | a folha com as clínicas, riscadas uma a uma | `K.painelMappoa` desenhado como papel | 1,2 × 1,6, branco | no ar ao lado do Vini | 3 |
| `monitor` | o computador do Vini | `K.computador` com tela desenhada | escala 1,55 | mesa do home office | 2, 3, 7, 8, 12 |
| `tela_erro` | a TV/monitor do balcão da clínica com "Esta página não está disponível" | `K.painelMappoa` desenhado | 1,8 × 1,1 | acima do balcão | 4, 5, 6 |
| `cadeiras` | as cadeiras de espera vazias | do cenário `clinica_odonto` | | parede esquerda | 5 |
| `prancheta` | prancheta com checklist na mão do Vini | `K.m3d('lista_check')` | 0,9 | mão do Vini | 6 |
| `mensagem` | a conversa do Vini com a clínica: o print do erro e "testei o site de vocês e ele não abriu" | `K.painelMappoa` desenhado (chat) | 1,4 × 2,3 | na frente do monitor | 7 |
| `relogio` | relógio com os ponteiros correndo | `K.m3d('relogio_parede')` | 2,1 | parede do home office | 8 |
| `tela` | painel do Mappoa: a lista das clínicas com o status do site, depois o lead da Clínica Sorriso | `K.painelMappoa` | 1,56 × 2,6 | central / palco | 9, 10 |
| `robo` | robô do Mappoa | `K.roboMappoa` | 1,45 | central, palco, home office | 9, 10, 12 |
| `navegador` | barra grande com mappoa.com | `K.painelMappoa` | 2,5 × 0,42 | acima do computador | 12 |

### Teste dos substantivos

| A narração fala | Aparece na frase | Como |
|---|---|---|
| cliente, site, clínica | 1 | o `paciente` com a mão no rosto; o `celular` com o link "Clínica Sorriso"; a fachada `clinica` |
| página não abre, liga pra outra | 1 | a rodinha girando → o erro 404 → "Ligando: Clínica Bem Estar" |
| web designer, clínicas, "já temos site" | 2 | o Vini no `celular` com "Ligando: Clínica Sorriso"; etiqueta "Web designer"; balão "Já temos site" |
| lista, próxima | 3 | a `lista` com as clínicas; o risco vermelho passando por cima de uma e o dedo descendo pra próxima |
| site que nem abre | 4 | a `tela_erro` no balcão da clínica com "Esta página não está disponível · 404" |
| dono, erro, concorrente | 5 | o `dono` sorrindo atrás do balcão; o `paciente` na recepção olhando o erro e saindo com o celular no ouvido; etiqueta "Ligou pro concorrente" |
| motivo pra pagar, paciente, página quebrada | 6 | o Vini com a `prancheta` na frente da `tela_erro`; ✓ "Motivo pra pagar"; etiqueta "Paciente perdido" |
| prova, abordagem | 7 | a `mensagem` com o print do erro e o texto sendo digitado |
| clínica por clínica, dia inteiro | 8 | o `relogio` girando; o `monitor` trocando de clínica com a rodinha |
| lista, clínicas, Londrina, site testado, empresas sem site | 9 | a `tela` com "Clínicas odontológicas · Londrina, PR" e uma pílula de status em cada clínica |
| Mappoa, próximo cliente, quem precisa do seu serviço, contatos | 10 | rótulo "Mappoa"; a `tela` com o lead da Clínica Sorriso: "Presença digital: Site fora do ar (404)", WhatsApp, telefone; o `robo` |
| "já temos site" (antes), erro, quem precisa (agora) | 11 | o balão "Já temos site" em preto e branco → o Vini mostrando o `celular` com o erro pro `dono` |
| computador, mappoa.com | 12 | `monitor` e `navegador` |

### Cena por cena

#### 1 · plano `gancho` · ~5 s
> "O cliente clicou no site da clínica. Se a página não abre, ele liga pra outra."

- **NA TELA:** na calçada, o `celular` gigante no centro, de pé no ar, virado pra câmera, com a busca e o link azul "Clínica Sorriso · Site"; atrás e à direita, a fachada `clinica` (placa "Clínica Sorriso"); à esquerda, o `paciente` com a mão no rosto (dor de dente), olhando o celular
- **MOSTRA:** `["celular", "paciente"]`
- **CENÁRIO:** `cidade` de dia; carros passando atrás, a fachada da clínica
- **ENTRA AGORA:** o link já está no celular no 1º quadro; na palavra "clicou", um círculo de toque no link e a tela troca pra página em branco com a rodinha girando
- **OBJETOS SE MEXENDO:** a rodinha gira de "clicou" até "abre"; na palavra "abre", a tela troca pro erro "Esta página não está disponível · 404" com o celular dando um tranco; na palavra "liga", a tela troca pra "Ligando... Clínica Bem Estar" e o celular desce pro ouvido do paciente
- **PERSONAGEM:** o paciente à esquerda · começo: `segurando` (mão no rosto, olhando o celular) · na palavra "abre": `bravo` · na palavra "liga": vira de costas pra clínica e anda pra esquerda
- **INTERAÇÃO:** o toque do paciente abre o link, o erro irrita ele, e ele troca de clínica
- **CÂMERA:** alvo `[celular, paciente]`, centro, celular ocupando 1/2 da altura · `chegando` · perto · frente · olho, topo livre (espacoCima 0,3) · começa já com o link legível
- **EFEITOS VISUAIS:** a capa no topo ("Site *fora do ar*?", o motor põe) · ✗ vermelho ao lado do celular na palavra "abre"
- **SONS:** `clique` (palavra "clicou") · `zumbido` da rodinha · `errado` (palavra "abre") · `bip` da ligação (palavra "liga")

#### 2 · plano `vini` · ~4,5 s
> "O Vini é web designer, oferece site pras clínicas e sempre ouve: 'já temos site'."

- **NA TELA:** o Vini no centro, na frente da mesa, com o `celular` no ouvido (escala 1,8), "Ligando: Clínica Sorriso" na tela; o `monitor` atrás com o portfólio dele
- **MOSTRA:** `["personagem", "monitor"]`
- **CENÁRIO:** `home_office` de dia; o ring light e a planta
- **ENTRA AGORA:** etiqueta "Web designer" na palavra "designer"; o balão vermelho "Já temos site" na palavra "temos"
- **OBJETOS SE MEXENDO:** o portfólio rola devagar no monitor; o celular dá um tremidinho no "já"
- **PERSONAGEM:** em frente à mesa · começo: `mostrando` (fala animado no telefone, aponta o portfólio) · na palavra "ouve": `triste`
- **INTERAÇÃO:** ele oferece o site no telefone e leva o "não"
- **CÂMERA:** alvo `[personagem, monitor]`, centro · `passando` · médio · esquerda · olho (antes: chegando, perto, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Web designer" (palavra "designer") · etiqueta vermelha "\"Já temos site\"" (palavra "temos")
- **SONS:** `bip` da ligação (começo) · `errado` (palavra "temos")

#### 3 · plano `risca` · ~3 s · jogo `falha`
> "Ele risca a clínica da lista e vai pra próxima."

- **NA TELA:** a `lista` de papel grande, no ar ao lado do monitor, com cinco clínicas ("Clínica Sorriso", "OdontoVida", "Sorria Mais", "Dente de Leite", "Clínica Bem Estar"); o Vini à direita com a caneta
- **MOSTRA:** `["lista", "personagem"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** o risco vermelho atravessa "Clínica Sorriso" na palavra "risca"; a seta azul desce pra "OdontoVida" na palavra "próxima"
- **OBJETOS SE MEXENDO:** o risco cresce da esquerda pra direita; as duas primeiras já riscadas antes balançam
- **PERSONAGEM:** à direita da lista · começo: `empurrando` (risca com força) · na palavra "próxima": `cansado`
- **INTERAÇÃO:** ele risca a clínica que disse "já temos site"
- **CÂMERA:** alvo `[lista, personagem]`, centro · `afastando` · médio · direita · olho (antes: passando, médio, esquerda)
- **EFEITOS VISUAIS:** congela em preto e branco (o jogo faz)
- **SONS:** `rasga` ou `whoosh` do risco (palavra "risca") · `clique` (palavra "próxima")

#### 4 · plano `virada` · ~3 s · jogo `corrige`
> "Só que tem clínica com site que nem abre."

- **NA TELA:** a recepção da Clínica Sorriso; acima do balcão, a `tela_erro` grande com o site da clínica: primeiro a rodinha, depois "Esta página não está disponível · 404"; o Vini à frente do balcão, de costas pra câmera em 3/4, olhando a tela
- **MOSTRA:** `["tela_erro", "personagem"]`
- **CENÁRIO:** `clinica_odonto`; o letreiro "Sorriso", o dente na parede
- **ENTRA AGORA:** a `tela_erro` acende na palavra "clínica"; o erro na palavra "abre"
- **OBJETOS SE MEXENDO:** a rodinha gira de "clínica" a "abre"; na palavra "abre" a tela treme e fica vermelha
- **PERSONAGEM:** na frente do balcão · começo: `duvida` · na palavra "abre": `ideia`, apontando a tela
- **INTERAÇÃO:** ele descobre o erro e aponta
- **CÂMERA:** alvo `[tela_erro, personagem]`, centro · `girando` · médio · direita · baixo (antes: afastando, médio, direita, olho: muda movimento e altura)
- **EFEITOS VISUAIS:** etiqueta laranja "Site que nem abre" (palavra "abre")
- **SONS:** `zumbido` da rodinha · `ding` da ideia (palavra "abre")

#### 5 · plano `dono` · ~4 s
> "O dono nem sabe. Quem clica vê o erro e liga pro concorrente."

- **NA TELA:** atrás do balcão, o `dono` (doutor) sorrindo, de polegar pra cima; acima dele a `tela_erro` com o 404; na frente do balcão, o `paciente` com o `celular` (mão no rosto); as `cadeiras` de espera vazias à esquerda
- **MOSTRA:** `["dono", "paciente", "tela_erro"]`
- **CENÁRIO:** `clinica_odonto`; a recepção, as cadeiras vazias
- **ENTRA AGORA:** balão de pensamento "Tá tudo certo" em cima do dono na palavra "sabe"; o paciente entra pela direita até o balcão na palavra "clica"
- **OBJETOS SE MEXENDO:** o paciente olha o celular (erro) e, na palavra "concorrente", põe o celular no ouvido e sai andando pela direita; o dono continua sorrindo
- **PERSONAGEM:** o Vini fica fora desta (é a cena do dono e do paciente). O dono: começo `segurando` (feliz, polegar pra cima) · continua sem perceber. O paciente: `duvida` olhando o celular · na palavra "concorrente": `bravo` e sai
- **INTERAÇÃO:** o paciente desiste na cara do dono, que nem percebe
- **CÂMERA:** alvo `[dono, paciente, tela_erro]`, centro · `revelando` · aberto · esquerda · olho (antes: girando, médio, direita, baixo)
- **EFEITOS VISUAIS:** balão "Tá tudo certo" (palavra "sabe") · etiqueta vermelha "Ligou pro concorrente" em cima do paciente (palavra "concorrente")
- **SONS:** `ding` do balão · `bip` da ligação (palavra "liga") · `passo` (palavra "concorrente")

> Obs.: a frase 5 é a única sem o Vini, porque a dor aqui é da clínica. A revisão pode marcar "personagem parado": o
> "personagem" desta frase é o paciente.

#### 6 · plano `motivo` · ~4,5 s
> "Isso é um motivo concreto pra pagar: ninguém quer perder paciente por uma página quebrada."

- **NA TELA:** o Vini na frente do balcão com a `prancheta`, de frente pra câmera; atrás, a `tela_erro` com o 404; o `dono` atrás do balcão, agora preocupado
- **MOSTRA:** `["personagem", "tela_erro", "dono"]`
- **CENÁRIO:** `clinica_odonto`
- **ENTRA AGORA:** a `prancheta` sobe na mão dele na palavra "motivo"; ✓ verde ao lado da tela na palavra "pagar"; etiqueta na palavra "paciente"
- **OBJETOS SE MEXENDO:** a tela de erro pisca vermelho na palavra "quebrada"
- **PERSONAGEM:** o Vini anda até o balcão · começo: `segurando` a prancheta · na palavra "pagar": `vitoria`. O dono: `surpreso` na palavra "paciente"
- **INTERAÇÃO:** o Vini mostra a prancheta pro dono, que leva um susto com o paciente perdido
- **CÂMERA:** alvo `[personagem, tela_erro, dono]`, centro · `afastando` · médio · frente · olho (antes: revelando, aberto, esquerda)
- **EFEITOS VISUAIS:** ✓ verde (palavra "pagar") · etiqueta verde "Motivo pra pagar" (palavra "pagar") · etiqueta vermelha "Paciente perdido" (palavra "paciente")
- **SONS:** `certo` (palavra "pagar") · `errado` (palavra "quebrada")

#### 7 · plano `prova` · ~4,5 s
> "E é a sua prova pronta pra abordagem: 'testei o site de vocês e ele não abriu'."

- **NA TELA:** no home office, a `mensagem` grande na frente do monitor: uma conversa de WhatsApp "Clínica Sorriso", com o print do erro 404 já anexado e o texto sendo digitado; o Vini à direita, digitando no celular
- **MOSTRA:** `["mensagem", "personagem"]`
- **CENÁRIO:** `home_office` de dia
- **ENTRA AGORA:** o print do erro cai na conversa na palavra "prova"; o texto "Testei o site de vocês e ele não abriu" letra por letra a partir de "testei"
- **OBJETOS SE MEXENDO:** a conversa sobe quando o print entra; o cursor pisca
- **PERSONAGEM:** à direita · começo: `ideia` · na palavra "testei": `segurando` (digitando no celular)
- **INTERAÇÃO:** ele monta a mensagem com a prova do erro
- **CÂMERA:** alvo `[mensagem, personagem]`, centro · `chegando` · médio · esquerda · olho (antes: afastando, médio, frente)
- **EFEITOS VISUAIS:** etiqueta azul "Prova pronta" (palavra "prova")
- **SONS:** `whoosh` do print · `clique` das letras

#### 8 · plano `dia` · ~3 s · jogo `falha`
> "Mas testar clínica por clínica, na mão, leva o dia inteiro."

- **NA TELA:** o home office de noite; o `relogio` na parede com os ponteiros girando; o Vini na frente do `monitor`, que troca de clínica em clínica, cada uma com a rodinha girando
- **MOSTRA:** `["relogio", "personagem", "monitor"]`
- **CENÁRIO:** `home_noite` (a janela escura)
- **ENTRA AGORA:** o relógio gira na palavra "testar"; as clínicas trocam no monitor a partir de "clínica"
- **OBJETOS SE MEXENDO:** os ponteiros dão várias voltas a partir de "leva"; o nome da clínica muda no monitor a cada 0,4 s
- **PERSONAGEM:** na frente do monitor · começo: `pensando` · na palavra "dia": `cansado`, suando
- **INTERAÇÃO:** ele clica site por site e o relógio corre
- **CÂMERA:** alvo `[relogio, personagem, monitor]`, centro · `subindo` · médio · esquerda · baixo (antes: chegando, médio, esquerda, olho: muda movimento e altura)
- **EFEITOS VISUAIS:** etiqueta vermelha "O dia inteiro" (palavra "dia") · congela em preto e branco
- **SONS:** `clique` em cada clínica · `zumbido` do relógio (palavra "leva")

#### 9 · plano `lista` · ~5 s · jogo `corrige`
> "Aí o Vini abre a lista das clínicas de Londrina, com cada site já testado e as empresas que não têm site."

- **NA TELA:** na central, a `tela` grande no centro já com a lista pronta: "Meus leads", "Clínicas odontológicas · Londrina, PR", os cartões das clínicas; o `robo` à esquerda segurando o mapa; o Vini chegando pela direita
- **MOSTRA:** `["tela", "robo"]`
- **CENÁRIO:** `central_mappoa`, o mapa gigante com pontos brilhando
- **ENTRA AGORA:** a lista já está na tela no começo da frase (o resultado primeiro); a partir de "testado", a pílula do site aparece em cada cartão, uma atrás da outra: verde "Site abriu", vermelha "Fora do ar (404)", laranja "Não respondeu"
- **OBJETOS SE MEXENDO:** os cartões descem um a um a partir de "clínicas"; o cartão da Clínica Sorriso ganha borda azul quando a pílula vermelha entra; na palavra "não", a tela troca pro grupo SEM SITE (clínicas sem site nenhum, só com WhatsApp e telefone); o robô acena
- **PERSONAGEM:** anda da direita até perto da tela · começo: `surpreso` (vê a lista pronta) · na palavra "testado": `apontar` (a tela)
- **INTERAÇÃO:** o robô mostra a lista e o Vini aponta os status
- **CÂMERA:** alvo `[tela, robo]`, centro · `revelando` · médio · direita · olho (antes: subindo, médio, esquerda, baixo)
- **EFEITOS VISUAIS:** etiqueta verde "Cada site testado" (palavra "testado") · etiqueta laranja "Sem site" (palavra "não") · as pílulas na tela
- **SONS:** `bip` em cada cartão · `ding` em cada pílula

#### 10 · plano `mappoa` · ~5 s
> "Esse é o *Mappoa*: ele acha o seu próximo cliente, quem precisa do seu serviço, já com os contatos."

- **NA TELA:** no palco da marca, a `tela` com o lead da Clínica Sorriso no centro: "Dados da empresa", o bloco "Presença digital" com "Site: fora do ar (404)" em vermelho, e "Contatos" com WhatsApp e Telefone; o `robo` à esquerda; o Vini à direita
- **MOSTRA:** `["tela", "robo", "personagem"]`
- **CENÁRIO:** `mundo_mappoa`, o logo gigante atrás, pinos flutuando
- **ENTRA AGORA:** o rótulo "Mappoa" na palavra "Mappoa"; a `tela` cai na palavra "acha"; o bloco do site na palavra "precisa"; os contatos (WhatsApp, telefone) na palavra "contatos"
- **OBJETOS SE MEXENDO:** os blocos entram de cima pra baixo; o robô acena e aponta a tela
- **PERSONAGEM:** à direita · começo: `chamando` · na palavra "contatos": `vitoria`
- **INTERAÇÃO:** o robô entrega o lead e o Vini comemora
- **CÂMERA:** alvo `[tela, robo, personagem]`, centro · `chegando` · médio · frente · baixo (antes: revelando, médio, direita, olho)
- **EFEITOS VISUAIS:** rótulo amarelo "Mappoa" · etiqueta verde "Seu próximo cliente" (palavra "próximo")
- **SONS:** `brilho` do rótulo · `ding` em cada bloco

#### 11 · plano `antes_agora` · ~5,5 s · jogo `avanca`
> "Antes, o Vini ouvia 'já temos site'. Agora, chega mostrando o erro pra quem precisa dele."

- **NA TELA:** dois momentos: (1) "Antes": o home office em preto e branco, o Vini no telefone e o balão "Já temos site"; (2) "Agora": a recepção da clínica, o Vini no balcão mostrando o `celular` com o erro 404 pro `dono`, que olha surpreso e acena que sim
- **MOSTRA:** `["personagem", "dono", "celular"]`
- **CENÁRIO:** `home_office` → `clinica_odonto`
- **ENTRA AGORA:** o balão na palavra "temos"; a clínica na palavra "Agora"; o celular sobe na mão do Vini na palavra "mostrando"
- **OBJETOS SE MEXENDO:** o celular gira pro dono na palavra "erro"; na palavra "precisa", ✓ verde em cima do dono
- **PERSONAGEM:** começo: `triste` (no telefone) · na palavra "Agora": `mostrando` o celular · na palavra "precisa": `vitoria`. O dono: `surpreso`, depois `segurando` (concorda)
- **INTERAÇÃO:** o Vini mostra a prova e o dono entende o problema
- **CÂMERA:** (1) alvo `[personagem]` · `afastando` · médio · direita · olho · (2) alvo `[personagem, dono, celular]` · `chegando` · médio · frente · olho (antes: chegando, médio, frente, baixo)
- **EFEITOS VISUAIS:** etiqueta vermelha "\"Já temos site\"" no "Antes" · etiqueta verde "Quem precisa de você" (palavra "precisa")
- **SONS:** `errado` no "Antes" · `whoosh` na troca · `certo` (palavra "precisa")

#### 12 · plano `segue` · ~8 s
> "Site fora do ar é culpa da clínica ou de quem fez o site? Comenta aí e segue pro próximo sinal de cliente. No computador, digita mappoa.com e testa você também."

- **NA TELA:** o Vini no `monitor`; a pergunta no topo; depois o `navegador` enorme acima, com mappoa.com sendo digitado; o `robo` acenando à esquerda; o cartão de seguir no topo
- **MOSTRA:** `["personagem", "navegador", "monitor"]`
- **CENÁRIO:** `home_office`, a mesa
- **ENTRA AGORA:** a pergunta no topo na palavra "Site"; o cartão de seguir na palavra "segue"; o `navegador` surge na palavra "computador"; as letras em "digita"
- **OBJETOS SE MEXENDO:** mappoa.com letra por letra; o botão "Ir" fica verde em "testa"
- **PERSONAGEM:** começo: `chamando` (pergunta pra câmera) · na palavra "digita": `segurando`, teclando
- **INTERAÇÃO:** ele digita e o endereço aparece
- **CÂMERA:** alvo `[personagem, navegador, monitor]`, centro · `parado` · aberto · frente · olho, topo livre (antes: chegando, médio, frente: muda movimento e plano)
- **EFEITOS VISUAIS:** a pergunta no topo · cartão de seguir no topo (palavra "segue")
- **SONS:** `brilho` do cartão · `clique` das letras · `ding` do botão

**Cauda** · plano `cartao` · 1,6 s: o cartão fica em "Seguindo", o Vini acena e o robô acena ao lado dele.

**Capa:** o paciente de boca aberta, mão no rosto, atrás do `celular` gigante com o erro 404, e a fachada da Clínica
Sorriso atrás. Frase: "Site *fora do ar*?"

## As cenas em 2 linhas

1. O celular gigante: o dedo toca "Clínica Sorriso", a rodinha gira, dá erro 404 e o celular já liga pra outra clínica. / O paciente, com dor de dente, fica bravo e vai embora; a câmera chega de frente.
2. O Vini liga pra clínica e leva o "já temos site". / Ele mostra o portfólio animado e murcha; a câmera passa pela esquerda.
3. Uma folha com as clínicas: ele risca a Clínica Sorriso e desce pra próxima. / Ele risca com força e fica cansado; a câmera se afasta pela direita.
4. Na recepção da clínica, a tela do balcão tenta abrir o site e dá erro. / O Vini tem a ideia e aponta; a câmera gira de baixo.
5. O dono sorri achando que "tá tudo certo", e o paciente vê o erro e sai ligando pro concorrente. / O paciente vai embora bravo; a câmera revela a recepção pela esquerda.
6. O Vini com a prancheta: ✓ "Motivo pra pagar" e "Paciente perdido". / Ele comemora e o dono se assusta; a câmera se afasta de frente.
7. A conversa com a clínica: o print do erro entra e ele digita "testei o site de vocês e ele não abriu". / Ele tem a ideia e digita; a câmera chega pela esquerda.
8. De noite, o relógio gira e o monitor troca de clínica, uma rodinha atrás da outra. / Ele cansa; a câmera sobe pela esquerda.
9. O Vini abre a lista já pronta: clínicas de Londrina, cada uma com o status do site (abriu, fora do ar, não respondeu), e depois as que não têm site. / O Vini chega e aponta; a câmera revela pela direita.
10. O nome Mappoa e a ficha da Clínica Sorriso: "Site fora do ar (404)" e os contatos. / O Vini comemora com o robô; a câmera chega de baixo.
11. Antes: "já temos site" em preto e branco. Agora: o Vini mostra o erro no celular pro dono, que entende. / Ele murcha e depois comemora; a câmera muda a cada parte.
12. A pergunta no topo, o cartão de seguir e mappoa.com sendo digitado. / O Vini pergunta pra câmera e digita; a câmera parada, aberta.
