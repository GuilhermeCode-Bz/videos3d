# Plano de peças novas do canal

> Pedido do dono em 11/11/2026: mais objetos, cenários, personagens e animações (explosões e muito mais), e
> complementar os cenários que já existem (outros ângulos, como andar entre os prédios da cidade).
> Tudo entra em `canal/pecas/` (a versão nova da Máquina não apaga). Legenda: ✅ feito · 🔨 fazendo · ⬜ ainda não

## 1. Efeitos de impacto (os ganchos do 1º segundo) — `canal/pecas/efeitos.js`

| Efeito | Pra que serve no vídeo | |
|---|---|---|
| `K.explosao` | Clarão, bola de fogo, onda de choque, destroços, fumaça e tremida, com som. Proposta que explode, planilha que explode | ✅ |
| `K.poof` | Nuvenzinha de "apareceu/sumiu" (personagem ou peça surgindo do nada) | ✅ |
| `K.faiscas` | Curto-circuito, metal raspando, coisa "queimando" | ✅ |
| `K.raio` | Raio caindo do céu numa peça (ideia, castigo, choque) | ✅ |
| `K.chuvaDinheiro` | Notas e moedas caindo (cliente fechou, dinheiro entrando) | ✅ |
| `K.rachadura` | Chão rachando quando algo gigante cai (o pino gigante, a bomba) | ✅ |
| `K.velocidade` | Linhas de velocidade em volta de algo correndo ou voando | ✅ |
| `K.ondaChoque` | Só o anel de impacto no chão (pouso, soco na mesa) | ✅ |
| `K.bomba` | Bomba de desenho com pavio queimando (o "isso vai explodir") | ✅ |
| `K.dinamite` | Banana de dinamite com pavio | ✅ |
| `K.fogos`, `K.holofote`, `K.chuva` (e neve), `K.balaoPensamento`, `K.balaoFala`, `K.nuvemRaiva`, `K.simbolo`, `K.contador`, `K.folhasVento` | canal/pecas/efeitos-extra.js | ✅ |

## 2. Cenários que já existem, por dentro e de outros ângulos

| O que | Ideia | |
|---|---|---|
| Cidade: entre os prédios | `K.cenario('rua_predios')` (canal/pecas/cidade-ruas.js): calçadão comprido com prédios altos dos dois lados, 12 lojas dos nichos com toldo e placa, postes, árvores, gente andando, carros nas esquinas | ✅ |
| Cidade: vista de cima | `K.drone` desce do alto até o personagem | ✅ |
| Cidade: telhado | `C.lugares.telhado` na rua_predios | ✅ |
| Cidade à noite | `K.cenario('rua_predios', { hora: 'noite' })`: vitrines, placas, janelas e postes acesos | ✅ |
| Agência / home office | Ângulo da tela do computador (por cima do ombro), ângulo da porta | ⬜ |
| Lojas dos nichos | `K.cenario('fachada', { loja })` (canal/pecas/fachadas.js): a frente da clínica, academia, pizzaria, salão e loja de roupas, com a porta que abre e o lado de dentro aparecendo pela vitrine | ✅ |
| Câmeras prontas | `K.seguir` (atrás, na frente, de lado), `K.drone`, `K.heroi` (de baixo pra cima), `K.ombro` (canal/pecas/cameras.js) | ✅ |

## 3. Cenários novos

✅ Feitos (canal/pecas/cenarios-novos.js): palco_show, vazio_colorido, escritorio_vidro, cafeteria, supermercado. A rua
comercial é a rua_predios e o deserto já existia na Máquina ('deserto').
⬜ Ainda não: shopping · feira/barraca · estacionamento · banco · cartório/fila · aeroporto · estúdio de podcast · praia
com quiosque · coworking · oficina mecânica · restaurante.

## 4. Personagens novos (mesmo sistema do `K.boneco`: humor, pose, andar, correr)

✅ Feitos em `canal/pecas/personagens.js` (`K.personagem(tipo)`, foto em canal/pecas/fotos/personagens.jpg): dono, dona,
vendedor, dentista, entregador, pizzaiolo, personal, cliente_bravo, secretaria, senhorinha, cabeleireira.
⬜ Ainda não: moto do entregador, gerente de banco com cara própria, figurantes de rua variados, homem e mulher jovens
com roupa do dia a dia (calça jeans, camiseta).

## 5. Objetos novos

✅ Feitos (canal/pecas/objetos.js, 21): cofre, pilha_dinheiro, saco_dinheiro, celular_gigante, botao_vermelho,
rede_pesca, foguete_desenho, balanca, corrente_cadeado, despertador, calculadora, planilha_gigante, caixa_entrega,
moto_entrega, carrinho_compras, coroa, seta_crescimento, escada_sucesso, papel_amassado, presente, sirene. A porta que abre
está na fachada; ampulheta, alvo e ímã já existiam (K.m3d).
⬜ Ainda não: catapulta, elevador.

## 6. Animações novas pro personagem

✅ Feitas (canal/pecas/animacoes.js, 19 reações novas): sentado, digitando, celular, comemorando, cai_sentado,
bate_mesa, coca_cabeca, mao_na_testa, nao, sim, dancando, dormindo, correndo_assustado, carregando, olha_relogio,
chorando, desmaia, aplaudindo, ombros. Apontar e empurrar já existiam; abrir porta é a C.porta da fachada.
