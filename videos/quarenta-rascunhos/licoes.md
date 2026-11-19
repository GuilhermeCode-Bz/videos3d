# Lições do vídeo quarenta-rascunhos (pra juntar no computador do dono)

## Pro canal/historico.md

- 19/11/2026 · quarenta-rascunhos · vídeo 2 do lote da nuvem no molde de 45 s, feito do roteiro ao render sem pedir aprovação: o Nico soterrado em 40 bolas de papel (rascunhos), o estúdio de fotografia da esquina sem site, o rival da mensagem torta que fecha, ele "sai do papel", mappoa.com com os estúdios de fotografia de Jundiaí, Antes x Agora com o Enviar apertado com a testa. 45,0 s, 130 palavras, 10 frases
- 19/11/2026 · nuvem · a ElevenLabs funcionou na nuvem com a chave nova do plano pago (Starter, 30.791 caracteres): a chave antiga ainda era a do plano grátis e voltava "Free Tier access has been disabled"; o dono trocou a chave e passou a gravar

## Pra canal/pauta.md

- Pesquisa de mercado (19/11/2026), tema 2 (`quarenta-rascunhos`): Roteiro ✅, Vídeo ✅

## Pra "Lições técnicas" de canal/aprendizados.md

- Na nuvem, a ElevenLabs paga funciona com `NODE_USE_ENV_PROXY=1` na frente do comando e `ELEVENLABS_API_KEY=proxy-injected` no `.env`. Se voltar "Free Tier access has been disabled" mesmo com o plano pago, a chave salva na nuvem ainda é a da conta grátis: trocar a chave no ambiente (testar com `curl https://api.elevenlabs.io/v1/user/subscription`, que mostra o "tier") (quarenta-rascunhos, 19/11/2026)
- A narração com `alvoPpm: 190` deu 42,8 s pra 130 palavras (abaixo do molde de 43 a 46 s). Com `alvoPpm: 180` deu 45,0 s, sem gastar crédito de novo (a aceleração é feita depois, na voz já gravada) (quarenta-rascunhos, 19/11/2026)
- Monte de coisa (papel amassado, bolinhas): um THREE.InstancedMesh com ~440 bolas ordenadas de baixo pra cima, e `mesh.count` faz o monte crescer; pra explodir, cada bola tem um ponto final no chão e um arco. Deixar um buraco no monte na frente do rosto (bolas acima de y 0,55 a menos de 0,42 m do rosto não entram), senão ele some até o nariz. Os pontos finais no chão precisam caber no quarto (encolher o voo), senão fazem um muro de papel na frente da câmera da frase seguinte. E `computeBoundingBox`/`computeBoundingSphere` depois de mexer, pra revisão achar o "papel" (quarenta-rascunhos, 19/11/2026)
- Plano com o personagem enterrado/pequeno e muita coisa no alvo do K.filmar (as pontas do monte, o topo do celular gigante) deixa ele minúsculo, e a revisão aprova assim mesmo. No gancho e na capa, mirar só no rosto (acima e abaixo), no botão e num ponto da frente do monte, plano 'perto', tam ~1,05 (quarenta-rascunhos, 19/11/2026)
- No estúdio (fundo infinito), plano 'aberto' com o letreiro e as softboxes no alvo deixa os personagens do tamanho de uma formiga: 'perto', tam ~2,2, só a pessoa, o tripé e a banqueta. O letreiro (K.m3d('letreiro')) não encolhe a letra pra caber: com texto de 12 letras usar l 3,7 e a 0,55, e uma placa escura atrás, porque em fundo claro o neon some (quarenta-rascunhos, 19/11/2026)
- Cabeçada (bater a testa num botão): menino.corpo.rotation.x tomba o corpo a partir do pé, então a cabeça vai ~0,6 m pra frente com 0,5 rad. Pôr o personagem a ~0,95 m da tela, senão a cabeça entra no objeto e some (quarenta-rascunhos, 19/11/2026)
