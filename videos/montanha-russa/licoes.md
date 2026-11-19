# Lições e histórico: montanha-russa (19/11/2026, nuvem)

> Pra juntar no computador do dono: as linhas de "Histórico" vão pro `canal/historico.md` e as de "Lições técnicas"
> pra seção "Lições técnicas" de `canal/aprendizados.md`.

## Histórico

- 19/11/2026 · montanha-russa (vídeo 1 do lote da nuvem no molde de 45 s) · feito sem pedir aprovação, como pede o
  `canal/lote-nuvem-45s.md`: gancho "Mês passado ele tinha três clientes. Olha ele agora." (o Caíque gritando no
  carrinho que despenca, o trilho é o gráfico do saldo), oficinas de moto de Caxias do Sul, virada "puxa o freio",
  130 palavras, 43,8 s com o cartão, mappoa.com aos 23 s, 1 render só
- 19/11/2026 · a primeira chave da ElevenLabs da nuvem ainda respondia como plano grátis ("Free Tier access has been
  disabled"); o dono trocou a chave e a nova (plano Starter, 30.791 caracteres) gravou na hora

## Lições técnicas

- Na nuvem, a ElevenLabs paga funciona: `ELEVENLABS_API_KEY=proxy-injected` no `.env` e `NODE_USE_ENV_PROXY=1` na frente do comando. Antes de tudo, testar com `curl https://api.elevenlabs.io/v1/user/subscription -H "xi-api-key: proxy-injected"`: se o "tier" vier "free", a chave do proxy ainda é a antiga e a gravação vai recusar (montanha-russa, 19/11/2026)
- Montanha-russa (ou qualquer coisa que anda num trilho): o trilho é uma CatmullRomCurve3 com getPointAt/getTangentAt; o carrinho vai no ponto com carro.lookAt(ponto + tangente) e o personagem vira FILHO do carrinho (carro.add(menino.g), menino.colocar local, menino.sentar(1, 0.3)), assim ele inclina junto na descida. No cena() de todo quadro, devolver o menino pra cena (K.scene.add(menino.g)), senão ele some nos outros lugares. Trilho colorido pelo declive (verde subindo, vermelho descendo) em pedaços de tubo (montanha-russa, 19/11/2026)
- No home_office, K.mirar de [0,6, 1,6, 4,2] já fica fora do quarto (o quadro saiu todo creme) e de 4,8 a câmera é empurrada pra perto da barra do navegador: com ele de pé no EM_PE, usar K.filmar([navG, comp, menino], 'chegando', p, { plano: 'medio', lado: 12, altura: 'olho', obstaculos: false }) (montanha-russa, 19/11/2026)
- A revisão confere o "mostra" só nas amostras de 37%, 63% e 90% da frase: peça que só aparece no começo de uma frase com dois lugares (a alavanca do freio, até 30%) reprova como "não aparece". Deixar no "mostra" só o que fica na tela a partir do meio da frase (montanha-russa, 19/11/2026)
- Post-it ou placa que a câmera vê dos dois lados: duas folhas FrontSide de costas uma pra outra (a segunda com rotation.y = PI); com DoubleSide o texto aparece espelhado por trás (montanha-russa, 19/11/2026)
- Capa com o personagem no carrinho na descida: câmera na frente do carrinho (lado ~75, tam 1,9) olhando pra cima do trilho fica dramática, mas o rosto aponta pro chão; levantar a cabeça só na capa (menino.cabeca.rotation.x = -0,75) (montanha-russa, 19/11/2026)
- Defeitos que ficaram no vídeo pronto (não renderizei de novo, como o dono pediu): (1) na oficina, a câmera "passando" do rival entrando pelo portão (lado 15, alvo o rival lá no fundo) encostou numa parede e uma faixa cinza tapa metade do quadro por ~1 s, com o rival pequeno no fundo. Pra quem entra pelo portão da oficina (fundo, x 3,2), filmar com K.mirar fixo de dentro da oficina (ex.: de [0,5, 1,7, 4] olhando [2, 1,2, -2]) e não pôr só o personagem do fundo no alvo; (2) a placa SALDO DA CONTA aparece cortada atrás da frase da capa no corte 1 do gancho em alguns quadros: placa alta perto do pico vai mais pro fundo ou some nos closes (montanha-russa, 19/11/2026)

## Resultado

- 43,8 s, 130 palavras, 10 frases, 1 render só (19,5 min de quadros), vídeo conferido com o ffmpeg (inteiro)
- Gasto: 698 créditos da ElevenLabs (sobraram 30.497) e ~17,5 milhões de tokens da IA (quase tudo relido da memória)
