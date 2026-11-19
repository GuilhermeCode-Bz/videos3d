# Lições do vídeo chatgpt-nao-conhece (pra juntar no computador do dono)

## Linhas pro canal/historico.md

- 19/11/2026 · chatgpt-nao-conhece · vídeo 7 do lote da nuvem (molde de 45 s), feito sem pedir aprovação: o robô gigante da IA com lanterna passa reto pelo quiosque apagado do Seu Zé; o Caio oferece site pra quem já tem, 30 dias sem resposta, o rival acende a luz do chaveiro primeiro e fecha; o Caio acende a própria lanterna, investe e digita mappoa.com; chaveiros de Caruaru sem site; Antes x Agora com o Chaveiro Agreste acendendo. 130 palavras, 10 frases, 42,8 s; capa "Invisível pra IA?"
- 19/11/2026 · chatgpt-nao-conhece · a conta paga da ElevenLabs funcionou na nuvem (o dono trocou a chave no meio da sessão): 694 caracteres pra narração inteira, gravada uma vez na 1ª revisão e reaproveitada nas prévias e no render
- 19/11/2026 · chatgpt-nao-conhece · revisão APROVADA de primeira, mas a folha e as prévias mostraram 9 cenas pra melhorar (quadro todo creme, personagem cortado, de costas ou tapado); 4 rodadas de prévias até tudo certo, render completo uma vez só
- 19/11/2026 · chatgpt-nao-conhece · render completo (38 min na nuvem, 42,75 s, 1080x1920, 60 fps), conferido com o ffmpeg (inteiro) e quadro a quadro: só ficou o balão "Onde tem chaveiro?" cortado no 1º corte do gancho; sem render de novo, a pedido do dono

## Linhas pro canal/aprendizados.md

### Roteiro e narração

- 130 palavras dão 42,8 s com o cartão (182 palavras/min): no molde de 45 s, mirar 133 a 136 palavras pra cair dentro dos 43 a 46 s (chatgpt-nao-conhece, 19/11/2026)

### Lições técnicas

- Na nuvem com a conta PAGA, a ElevenLabs grava normal: `.env` com `ELEVENLABS_API_KEY=proxy-injected` e `NODE_USE_ENV_PROXY=1` na frente de todo comando do render (revisar, prévia, capa e o completo). O `npm run instalar` não baixa o Chromium na nuvem (internet bloqueada), mas acha o Google Chrome e funciona; a voz de teste (espeak-ng) não instala, e com a voz do canal ela nem faz falta (chatgpt-nao-conhece, 19/11/2026)
- No home_office, K.filmar 'chegando' com o alvo perto da parede do fundo (o feixe da lanterna na parede) deu o quadro TODO CREME e a revisão APROVOU (o quadro da folha era outro instante). Na frase com o personagem de pé e uma coisa na parede, K.mirar fixo de ~2 m na frente-direita dele. E o personagem sentado na cadeira giratória, filmado de trás, some atrás do encosto: por cima do ombro, com a câmera a 2,3 m de altura e ~2 m atrás dele (a menos de 1 m da cabeça a revisão marca "colado") (chatgpt-nao-conhece, 19/11/2026)
- Luz de lanterna sem SpotLight: cone aberto (ConeGeometry com openEnded, MeshBasicMaterial aditivo, opacidade ~0,2, depthWrite false), ponta na boca da lanterna e esticado até o alvo (scale.z = distância / altura do cone, g.lookAt(alvo)), mais uma mancha redonda aditiva onde bate. "Loja apagada que acende": placa com MeshStandardMaterial com emissiveMap = a própria textura (emissiveIntensity de 0 a 0,9), a cor do toldo e da placa escurecida (color.setScalar 0,25 a 1), uma lâmpada com K.halo e um PointLight sem sombra. Funções fazFeixe, fazLanterna e fazQuiosque em videos/chatgpt-nao-conhece/cena.js (chatgpt-nao-conhece, 19/11/2026)
- Na rua_predios de noite, um quiosque posto no meio do calçadão (x ±1,5) virado pra +z aparece bem em todas as câmeras que olham a rua, diferente da placa colada na fachada. As árvores e bancos (filhos de C.grupo em x ±2,6) escondidos de z -27 a z 21 deixaram as câmeras livres (chatgpt-nao-conhece, 19/11/2026)
- Robô gigante (7 m) andando pro lado da câmera: no gancho, o corte da cara dele fica bom com a câmera a ~7 m na frente, na altura do peito (y 4,4) olhando a cabeça; de y 2,6 olhando pra cima só aparece o peito. Personagem pequeno acenando pro gigante fica de costas pra câmera: virar ele pra um ponto entre o gigante e a câmera (chatgpt-nao-conhece, 19/11/2026)
- Personagem mostrando uma tela pra outro do lado: com a tela na mão do lado do outro, ela tapa a cara dele. Segurar com a mão do lado de fora (menino.mao(0) quando o outro está à direita), escala ~0,34 (chatgpt-nao-conhece, 19/11/2026)
- Balão de pensamento (K.balaoPensamento) num personagem gigante, com a câmera perto da cabeça dele: o balão sai pra cima e pro lado e fica cortado no canto da tela (no 1º corte do gancho só aparecia "eiro?"), e nem a revisão nem as prévias pegaram, porque o quadro conferido era outro instante. Prévia sempre no 1º corte, a 0,3-0,5 s; e no gigante pôr o balão do lado da cabeça, na altura dos olhos, ou trocar por uma etiqueta na tela (chatgpt-nao-conhece, 19/11/2026)
