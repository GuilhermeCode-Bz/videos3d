# Lições do vídeo orcamento-fumaca (lote da nuvem, 19/11/2026)

> Pra juntar no computador do dono: as linhas de "Histórico" vão pro `canal/historico.md` e as de "Lições técnicas"
> pra seção de mesmo nome do `canal/aprendizados.md`.

## Histórico

- 19/11/2026 · orcamento-fumaca · vídeo 5 do lote da nuvem no molde de 45 s (canal/lote-nuvem-45s.md) → roteiro, cena.js, revisão APROVADA, prévias conferidas e render feitos na nuvem sem pedir aprovação; 43,0 s, 131 palavras, 9 frases; gancho "Ele mandou o orçamento. E o cliente virou fumaça." (o cliente meio transparente soltando fumaça, poof e só o chapéu caindo); nicho buffets infantis de Montes Claros; mappoa.com digitado aos ~22,4 s
- 19/11/2026 · orcamento-fumaca · a ElevenLabs da conta paga funcionou na nuvem depois que o dono trocou a chave (NODE_USE_ENV_PROXY=1 e ELEVENLABS_API_KEY=proxy-injected no .env) → 834 caracteres gastos no vídeo (688 na 1ª gravação + 146 de duas frases reescritas pra chegar nos 43 s)
- 19/11/2026 · orcamento-fumaca · na pauta (Pesquisa de mercado), marcar o tema 5 com Roteiro ✅ e Vídeo ✅

## Lições técnicas

- Na nuvem com a conta paga da ElevenLabs, a voz grava normal: `NODE_USE_ENV_PROXY=1` na frente do comando e `ELEVENLABS_API_KEY=proxy-injected` no `.env`; testar antes com `node motor/testar-voz.js <id> --texto "Teste."` (13 caracteres). A voz do computador (espeak-ng) instala na nuvem com `apt-get update && apt-get install -y espeak-ng` (orcamento-fumaca, 19/11/2026)
- Personagem "virando fumaça": clonar os materiais do K.personagem no montar e baixar a opacidade aos poucos (0,3 → 0,75), com um K.fumaca de escala ~0,28 e altura ~1,7 saindo dos pés; escala 0,55 enche o quadro e tapa o personagem (a revisão APROVA assim mesmo). No sumiço, dois K.poof (escala 2,3 no peito e 1,6 nas pernas) e o chapéu como peça solta na cena, seguindo a cabeça até o poof e depois caindo (orcamento-fumaca, 19/11/2026)
- Folha segurada com as duas mãos (posição entre b.mao(0) e b.mao(1)): com a reação 'susto' os braços sobem e a folha tapa o rosto; pra cara de susto segurando papel, manter 'segurando' e trocar só o humor ('assustado') (orcamento-fumaca, 19/11/2026)
- Fachada do canal (z 0, carros nas faixas z 7 e 10,8): câmera de conversa de baixo pra cima a ~3,5 m corta os dois personagens e, mais longe na frente, o carro passa na lente. Filmar da diagonal da direita, fora da faixa dos carros (K.mirar de ~[6,6, 0,55, 6] pra [2,1, 1,2, 2,2]), e virar cada personagem pra um ponto entre o outro e a câmera, senão um fica de costas (orcamento-fumaca, 19/11/2026)
- Loja nova sem fachada pronta (buffet): vestir a fachada 'salao' com uma placa nova por cima (z 0,29), cartazes atrás do vidro da vitrine (z -0,16), um tampão em cima do adesivo do vidro (z -0,005) e uma folha nova no cavalete, tudo como filho de C.grupo (assim só aparece nesse cenário); a placa redesenhada por plano vira outra loja (Pula-Pula → Castelinho) (orcamento-fumaca, 19/11/2026)
- K.fumaca enchendo um quarto (home_office): emissores perto da câmera (z > 0) cobrem a tela toda; pôr os emissores no fundo e nos cantos (z ≤ -1,6) com escala ~0,85 e filmar o personagem com plano perto (orcamento-fumaca, 19/11/2026)
- Aviõezinhos jogados pelo personagem: mandar pra direção oposta à câmera (fundo), senão passam colados na lente; o avião é um BufferGeometry de 3 triângulos, voando numa curva com lookAt no próximo ponto (orcamento-fumaca, 19/11/2026)
