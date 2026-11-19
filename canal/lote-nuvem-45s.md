# Lote da nuvem no molde de 45 s (19/11/2026)

> Pra IA da nuvem: o dono abre 7 sessões, uma por vídeo, e manda só "Faz o vídeo N do canal/lote-nuvem-45s.md".
> Este arquivo é o pedido inteiro. Vá do roteiro ao `video.mp4` renderizado SEM pedir aprovação de nada.

## O pedido do dono

- 7 vídeos novos, um por sessão, em paralelo, no molde de 45 s que ele escolheu em 19/11/2026.
- "Só pare quando terminar de renderizar."
- "Revisa a cena bem revisado pra não renderizar mais de uma vez" (o render demora).
- "Se ficar com algum erro depois de renderizado não tem problema, só aprende pra não errar de novo": depois do
  render, NÃO renderizar de novo por defeito de cena; anotar a lição.

## Os 7 vídeos

O gancho, o 1º quadro, a dor, o rival, a virada e o nicho de cada um estão em `canal/pauta.md`, seção "Pesquisa de
mercado (19/11/2026)". Pode ajustar a frase do gancho se achar uma melhor, mantendo a metáfora.

| N | Tema | Pasta |
|---|---|---|
| 1 | A montanha-russa | `videos/montanha-russa/` |
| 2 | Quarenta rascunhos | `videos/quarenta-rascunhos/` |
| 3 | O robô que faz site | `videos/robo-faz-site/` |
| 4 | O aquecimento eterno | `videos/aquecimento-eterno/` |
| 5 | O orçamento que vira fumaça | `videos/orcamento-fumaca/` |
| 6 | Duas profissões | `videos/duas-profissoes/` |
| 7 | A loja que o ChatGPT não conhece | `videos/chatgpt-nao-conhece/` |

## Antes de começar

1. Seguir o `AGENTS.md`: `npm run conferir` (se faltar instalar, `npm run instalar`).
2. Ler `canal/formato-campeao.md`, `canal/aprendizados.md` inteiro (com "Lições técnicas" e as notas da nuvem),
   `canal/identidade.md`, `canal/modelos-3d.md`, `comandos/novo-video.md` e `referencias/COMO-FAZER-O-VIDEO.md`.

## Regras do roteiro (o molde de 45 s vale mais que qualquer regra antiga de 50-55 s)

- 43 a 46 s, 130 a 140 palavras, 8 a 10 frases, cada frase de 3 a 5 s.
- Gancho de até 13 palavras, dito em até 4 s, com o fim em aberto. Sem "Web designer, ..." e sem "Se X, acontece Y".
- O web designer entra na frase 2, antes dos 5 s ("O [nome] é web designer e...").
- Dor com o tempo passando → a empresa do bairro sem site → o rival que fecha → o gesto da virada com a decisão de
  investir (curta, nunca "grátis", sem valor).
- "digita mappoa.com no computador" entre os 18 e os 24 s, com a lista do nicho na cidade.
- "Esse é o *Mappoa*, ..." numa frase só. Nada depois dele além do Antes x Agora.
- Fim fixo: "Segue pra ver mais. No computador, digita mappoa.com e testa você também.", com o cartão de seguir
  entrando na palavra "Segue".
- Ritmo: 3 a 4 cortes nos 3 primeiros segundos, depois 1 a cada 1,6 a 2,1 s; ~100 sons; uma etiqueta por frase.
- O personagem é sempre o menino de camiseta azul do canal. Tudo do Mappoa sai de `canal/pecas/mappoa.js`.
- Nicho e cidade inéditos (os da pauta). Nenhuma frase copiada de vídeo anterior.
- Legenda de postar no formato curto de 17/11 (está em aprendizados).

## Voz

- A do canal (ElevenLabs, voz Liam, como em `canal/identidade.md`). A conta agora é paga (30.791 caracteres em
  19/11); antes a nuvem bloqueava a conta grátis. Ainda não foi testada na nuvem com a conta paga.
- Testar a chave logo no começo (`npm run vozes`; em aprendizados está como a chave funciona na nuvem).
- Se a ElevenLabs recusar gravar: NÃO ficar tentando. Fazer roteiro, `cena.js`, revisão APROVADA (com a "voz muda"
  de aprendizados), capa e `publicacao.md`, enviar o branch e dizer claramente que falta só o render com a voz.

## Revisão antes do render (caprichar aqui: é UM render só)

1. `--revisar` com a voz do canal até `RESULTADO: APROVADO`.
2. Abrir a `testes/folha.jpg` e conferir frase por frase.
3. Tirar prévias (`--previa`) dos pontos de risco e ABRIR as imagens: o 1º segundo, cada troca de cenário, a
   entrada do Mappoa, o Antes x Agora e o cartão.
4. Procurar: quadro todo bege, creme ou verde (câmera atravessando parede, teto ou árvore), personagem de costas ou
   tapado, objeto cortado na borda, etiqueta em cima da legenda, fumaça ou efeito tapando o personagem.
5. Abrir a `capa.png`.
6. Só então o render completo. Depois, conferir o arquivo com o ffmpeg do `ffmpeg-static`
   (`-v error -i video.mp4 -f null -`: sem saída = inteiro).

## Pra não dar conflito com as outras 6 sessões

- Mexer SÓ na pasta do seu vídeo.
- NÃO editar `canal/pauta.md`, `canal/historico.md` nem `canal/aprendizados.md`. No lugar, escrever em
  `videos/<pasta>/licoes.md` as linhas que iriam pro histórico e as lições técnicas (uma por linha, no formato do
  aprendizados). Elas são juntadas depois, no computador do dono.
- Não mexer em `motor/` nem em `canal/pecas/`. Peça nova vai dentro do `cena.js` do vídeo.

## Pronto quer dizer

- Na pasta: `roteiro.md`, `roteiro.json`, `cena.js`, `capa.png`, `publicacao.md`, `custos.json`
  (`npm run custos -- <pasta>`) e `licoes.md`, tudo enviado pro GitHub no branch da sessão.
- O `video.mp4` renderizado e conferido. Ele não sobe pro GitHub: entregar o arquivo pro dono baixar na sessão.
- No relatório final: a duração, o nº de palavras, os créditos gastos e qualquer defeito que ficou.
