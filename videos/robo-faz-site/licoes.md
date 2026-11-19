# Lições do vídeo robo-faz-site (pra juntar no canal/ no computador do dono)

## Pro canal/historico.md

- 19/11/2026 · robo-faz-site (vídeo 3 do lote da nuvem, molde de 45 s) · feito na nuvem do roteiro ao render, sem pedir aprovação: robô gigante cuspindo sites no calçadão, o Ravi de braço cruzado com medo da IA, a Marmoraria São José sem site, o rival que fecha, descruza os braços e digita mappoa.com (marmorarias de Feira de Santana). 130 palavras, 43,3 s com o cartão, 692 caracteres da ElevenLabs (voz Liam), mappoa.com falado aos 22,7 s. Capa "Medo da *IA*?"
- 19/11/2026 · a ElevenLabs paga funcionou na nuvem: a 1ª chave ainda era a conta grátis ("Free Tier access has been disabled"); o dono trocou pela chave da conta paga (Starter, 30.791 caracteres) e gravou de primeira

## Pro canal/aprendizados.md (Lições técnicas)

- Na nuvem, conferir o plano da chave antes de gravar: `curl -sS https://api.elevenlabs.io/v1/user/subscription -H "xi-api-key: proxy-injected"` mostra o "tier" (free = bloqueada na nuvem; starter ou maior = grava). Com a conta paga, a revisão sem --voz-teste grava a narração uma vez e o render reaproveita (robo-faz-site, 19/11/2026)
- Braço cruzado no K.boneco: o b.pose não gira o ombro em y, então o cotovelo dobrado só levanta o antebraço pra frente (parece punho fechado no peito). Depois do pose: x -0,45/-0,6, z ~0,04, c -1,7/-1,6 e `br.ombro.rotation.y = -br.lado * 1.2` em cada braço; o antebraço atravessa a barriga (robo-faz-site, 19/11/2026)
- Na rua_predios, a cena na frente de uma loja fica embaixo da PLACA (loja.placa), não da porta (loja.porta fica ~2 m pro lado): com a câmera na porta, a placa sai cortada e o dono fora do quadro. A placa de bandeira da loja (perpendicular, y ~4,6) fica de fora da placa nova por cima: esconder as malhas da loja com y entre 4,3 e 5,1 (robo-faz-site, 19/11/2026)
- Na rua_predios, os figurantes da calçada (x ±3,3 e ±4) passam na frente de quem está na porta da loja, e `visible = false` não vale porque a rua chama colocar() neles a cada quadro (liga de novo): encolher (scale 0,0001) os que estão no trecho da cena, e voltar pra 1 fora dele (robo-faz-site, 19/11/2026)
- Texto desenhado em canvas pequeno (etiqueta de preço de 400 px) com fonte grande sai cortado no próprio desenho e a revisão não pega: passar o maxWidth no fillText (robo-faz-site, 19/11/2026)
- Objeto na mão do lado da cabeça (etiqueta, celular): posicionar pela cabeça + o vetor da direita da câmera (`V(1,0,0).applyQuaternion(K.camera.quaternion)`) depois da câmera, não pela mão; com a pose 'celular' a mão fica atrás do corpo e o objeto some (robo-faz-site, 19/11/2026)
- No vídeo em pé, pra caber o personagem perto e um objeto gigante longe no mesmo quadro (o robô a 25 m), calcular os ângulos: a largura que aparece é ~29° (14,5° pra cada lado); afastar a câmera até o espalhamento caber e mirar no meio dos dois (robo-faz-site, 19/11/2026)
- O vídeo saiu com 174 efeitos sonoros (o molde pede ~100): o clique + bip da "impressora" a cada folha do robô (a cada 0,28 s) somou demais. Em efeito que se repete rápido, um som a cada 2 ou 3 repetições, sem o bip (robo-faz-site, 19/11/2026)
