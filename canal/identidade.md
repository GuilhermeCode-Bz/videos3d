# Identidade visual do canal

> É isso que faz o seu vídeo não parecer com o de ninguém. O `/instalar` preenche com você.
> O `/novo-video` copia o bloco "No roteiro.json" pra todo vídeo novo.

## Personagem

curioso e dedicado, esforçado

- Tipo: `menino` ou `menina`
- Roupa: `camiseta` (camiseta + bermuda) ou `moletom` (moletom com capuz, mochila, calça)
- Cores que dá pra trocar: `camiseta`, `bermuda`, `tenis`, `cabelo`, `pele`, `moletom`, `punho`, `calca`, `mochila`, `vestido`
- Acessório opcional: `capacete` = `obra` ou `espaco`

## Cenário e hora padrão

Cidade (`cidade`), de dia. Cada vídeo pode ter o seu cenário, o que combinar com o tema; este é o do canal quando o tema não pede outro.

Cenários prontos (o lugar inteiro, com céu, luz e o que se mexe; fotos e qual usar pra cada tema em
`referencias/cenarios.md`): `construcao`, `natureza`, `cidade`, `casa`, `cozinha`, `sala`, `praia`, `fundo_do_mar`,
`espaco`, `lua`, `fazenda`, `floresta`, `deserto`, `consultorio`, `oficina`, `escritorio`, `estudio`. Horas: `dia`,
`tarde`, `noite`. No `cena.js`: `K.cenario('construcao', { hora: 'dia' })`; no `roteiro.json` da montagem: `"cenario"`.
(Os lugares simples de antes, `quintal`, `praia`, `cozinha`, `espaco`, `lua` e `escuro`, continuam valendo no campo
`"lugar"`.)

## Estilo

Redondo e caprichado: sombreamento liso, quinas arredondadas e cenário vivo.

**Visual do canal: motion (19/11/2026, aprovado).** O jeito da referência 3D motion (VIDEOS CHAT/ANALISE REFERENCIA): boneco
2D de desenho chapado (cabeça de feijão, corpo em gota, braço e perna de traço preto, contorno de tinta) dentro de um mundo
3D pintado com traço preto em toda quina; cor por clima da cena (`"clima"` na frase: normal, isolamento, ameaca, noite,
verdade, virada), com o vermelho só no que é ameaça; câmera sempre andando, com fusão curta entre os planos; legenda
branca de 1 ou 2 palavras, mais baixa; placa impressa nos objetos. Cenários da referência: `escritorio_azul`,
`sala_verde` e `predio_noite`. As telas de celular, monitor e notebook mostram as **telas reais do Mappoa**
(`K.celularMappoa`, `K.monitorMappoa`, `K.notebookMappoa`). Tudo em `canal/pecas/zz-*.js`; liga com `"visual": "motion"`.

- `"estilo": "redondo"`: sombreamento liso, quinas arredondadas, cenário vivo (flores, arbustos, borboletas, pássaros,
  pólen, vento), sombra macia, personagem com olho de verdade
- `"fps": 60`: movimento mais fluido (o render leva o dobro do tempo)
- `"efeitos": {"abaixa": true}`: os efeitos sonoros ficam por baixo da voz, sem estourar

## Voz

narrador homem, voz clara e animada, em português do Brasil

**Escolhida:** Liam (ElevenLabs, voz padrão "Energetic, Social Media Creator", id `TX3LPaxmHKxFdv7VOQHJ`). Plano
grátis: as vozes brasileiras da biblioteca não funcionam pela API, e o grátis não permite monetizar. No plano pago,
dá pra trocar por uma brasileira (ex.: Marcio, `plASsyS7JE6GCAvx9uIc`).

De onde a voz vem, a pessoa escolhe na instalação (`comandos/instalar.md`, passo 3). A escolha vira a linha `"voz"` do
bloco "No roteiro.json", lá embaixo (sem essa linha, o `npm run conferir` avisa que falta escolher a voz):
- **ElevenLabs** (a melhor; plano grátis pra testar, pago pra monetizar; a chave fica no arquivo `.env`, salva pela
  janelinha do `npm run chave`):
  `"voz": {"motor": "elevenlabs", "id": "<id da voz>", "velocidade": 1.1, "acelerar": "auto"},`
- **VoiceStudio** (grátis, roda no computador; abrir o programa antes de cada vídeo; passo a passo em
  `comandos/voicestudio.md`):
  `"voz": {"motor": "voicestudio", "id": "<nome da voz no VoiceStudio>", "idioma": "pt-BR", "acelerar": "auto"},`
  (com outro motor do VoiceStudio, junte `"modelo": "voxcpm2"` ou `"modelo": "moss-tts-nano"`; sem ele, é o OmniVoice)
- **Voz do computador** (robótica, só pra testar): `"voz": {"motor": "teste"},`

## Cor do canal

`#2fb5a6`. Vai na palavra em destaque da capa e no botão "Seguir" do fim. Escolha uma cor sua, que combine
com o personagem. O texto em cima dela sai preto ou branco sozinho, o que ler melhor.

## Fim do vídeo

No fim de todo vídeo entra um cartão de seguir no topo da tela: o logo, o @ do canal e o botão "+ Seguir", que é apertado
e vira "Seguindo". O personagem aponta pro cartão e acena.

## Logo

Coloque o logo do canal em `canal/logo.png` (quadrado). Ele aparece redondo no cartão de seguir do fim. Sem logo, o
cartão mostra a inicial do canal na cor do canal.

## No roteiro.json

```json
"cor": "#2fb5a6",
"arroba": "@mappoa_leads",
"estilo": "redondo",
"visual": "motion",
"fps": 60,
"efeitos": {"abaixa": true},
"personagem": {"tipo": "menino", "roupa": "camiseta", "cores": {"camiseta": "#2f6fd6", "bermuda": "#2f6f5e", "tenis": "#f4f1ea", "cabelo": "#7a4a22", "pele": "#e6b48a"}},
"cenario": "cidade",
"hora": "dia",
"voz": {"motor": "elevenlabs", "id": "TX3LPaxmHKxFdv7VOQHJ", "velocidade": 1.1, "acelerar": "auto"}
```
