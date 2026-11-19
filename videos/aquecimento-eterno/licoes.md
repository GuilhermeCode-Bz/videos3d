# Lições do vídeo aquecimento-eterno (pra juntar no computador do dono)

## Linhas pro canal/historico.md

- 19/11/2026 · aquecimento-eterno (vídeo 4 do lote da nuvem no molde de 45 s) · feito na nuvem do roteiro ao render, sem pedir aprovação. Pedro, escolas de música de Chapecó, gancho "Ele tá se alongando pra ir atrás de cliente. Faz seis meses.", capa "Ainda *aquecendo*?". 132 palavras, 9 frases, 43,3 s com o cartão, voz Liam (ElevenLabs paga, 693 créditos). Revisão APROVADA na 6ª rodada; um render só
- 19/11/2026 · a chave da ElevenLabs que estava na nuvem era de conta grátis ("Free Tier access has been disabled"); o dono trocou pela da conta paga e a narração gravou na nuvem de primeira

## Linhas pras "Lições técnicas" de canal/aprendizados.md

- Na nuvem, a ElevenLabs paga funciona: `NODE_USE_ENV_PROXY=1` na frente do comando e `ELEVENLABS_API_KEY=proxy-injected` no `.env`. Antes de tudo, `curl https://api.elevenlabs.io/v1/user/subscription` mostra o "tier": "free" = a chave ligada é a grátis e vai recusar gravar (aquecimento-eterno, 19/11/2026)
- A câmera do canal é bem mais fechada do que parece (vertical ~31° de abertura na prática): a 2,3 m o quadro mostra só ~1,3 m de altura. Pra o personagem inteiro com K.mirar, ficar a 3,8 m ou mais dele; close do tênis/pé com o corpo inteiro: câmera baixa (y 0,5) a ~3,9 m olhando y 0,8. A revisão marca "colado" quando ele passa de 85% da altura (aquecimento-eterno, 19/11/2026)
- Na rua_predios, câmera de corrida "de frente" (K.mirar na frente de quem corre, olhando pra trás) deixa quem está mais à frente na pista ATRÁS da câmera, e a revisão marca "colado" (o boneco atrás da câmera). Esconder quem fica atrás (a dona esperando na escola) só nesse corte. Pra achar quem é, um console.error no fim do cena() com K.medir([]).bonecos mostra o "atras" de cada um (aquecimento-eterno, 19/11/2026)
- No home_office, o personagem sentado na cadeira giratória (girada pro monitor) some atrás do encosto pra câmera de frente/diagonal: pra digitar o mappoa.com, deixar ele DE PÉ do lado da mesa (EM_PE, olhando o MONITOR, reagir 'digitando'), como no segue (aquecimento-eterno, 19/11/2026)
- Faixa/banner feito com a `folha` de um lado só fica espelhado quando a câmera passa pro outro lado: clonar a folha com rotation.y = PI (a faixa CLIENTES da chegada). As linhas de velocidade (K.velocidade) andam no eixo x do grupo: pra quem corre no eixo z (calçadão), rumo PI/2; com rumo PI elas cruzam a tela na frente do rosto (aquecimento-eterno, 19/11/2026)
- Teia de aranha nos pés: fios 3D (cilindros de 0,005 entre pontos) saindo do tênis pro chão em raios, com anéis ligando os raios, mais 3 planos com a teia desenhada (frente e lados); aparece de qualquer ângulo. O alongamento: b.pose com os dois braços em z ~2,7 e b.corpo.rotation.z = sen(t)·0,12 (zerar no começo do cena(), porque o corpo leva as pernas junto) (aquecimento-eterno, 19/11/2026)
- Balão de fala (K.balaoFala) é largo (1,6 m) e no vídeo em pé corta na borda: fx.fala.g.scale.setScalar(0.75) e câmera centrada entre a pessoa e o balão; esconder o balão no corte de baixo pra cima, senão tapa o rosto (aquecimento-eterno, 19/11/2026)
