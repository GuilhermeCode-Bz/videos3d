# Como o Mappoa funciona de verdade (visto no vídeo do dono, 09/11/2026)

> Pra IA: ler junto com `canal/produto.md` antes de desenhar qualquer tela do Mappoa. Fonte: o vídeo em
> `canal/referencias/` (1:20), com um print a cada 3 s em `canal/referencias/mappoa-fluxo/`.
> Os prints têm nome de empresas e telefones de verdade: servem só de consulta. Nos vídeos, sempre empresas inventadas.

## O fluxo, na ordem

1. **Painel:** menu à esquerda (Dashboard, Encontrar novos leads, Meus leads, Campanhas, Tutorial e extensão, Assinatura,
   Indique e ganhe). Cartões de número: Total de leads, Enriquecidos com barra.
2. **"Sua próxima busca":** campos Nicho, Estado, Cidade e Quantidade máxima de novos leads. Abaixo, "Buscar Leads" com a
   frase montada ("Designer em São Paulo, SP") e o botão em degradê "Confirmar e buscar novos leads". Ao lado: "Extensão
   pronta" e o saldo. Nessa busca a tela avisa: no máximo 120 novos leads; empresa repetida não consome saldo.
3. **Captura em cima do Google Maps:** o Maps abre no fundo e uma janela branca fica na frente, com o robô, "Encontrando
   novos leads", a barra de progresso e 6 etapas que vão ficando verdes (Preparando captura, Conectando à extensão,
   Abrindo o Google Maps, Aguardando os resultados, Salvando novos leads, Finalizando). Contadores ao vivo: Encontrados,
   Novos, Existentes. O número grande sobe ("41/Máximo").
4. **Resultado:** Encontrados 99, Novos 99, Atualizados 0, Saldo consumido 99, **Duração 2min 7s**. Botões "Ver leads e
   continuar" (degradê) e "Nova captura".
5. **Meus leads:** "99 leads · 65 com site · 34 sem site", separados em grupos COM SITE e SEM SITE. Cada lead é um cartão
   branco: nome, endereço, etiqueta da busca, e chips coloridos de contato (WhatsApp verde, Telefone cinza, Site azul).
6. **Enriquecimento (a janela de escolha):** "Contatos e presença digital" (1 crédito/lead) ou "Inteligência comercial
   completa" (3 créditos/lead: presença digital, aderência à oferta e score, dores, oportunidades, objeções, abordagem
   pronta). Botão "Iniciar enriquecimento · 195 crédito(s)" para 65 empresas.
7. **Enriquecendo:** a mesma janela do robô, com etapas (Pedido registrado, Aguardando vaga na fila, Enriquecendo
   empresas, Finalizando resultados) e contadores (Selecionadas, Processando, Na fila, Concluídas).
8. **Lead enriquecido:** o cartão ganha a etiqueta verde "enriquecido", "Completo" e mais chips (E-mail azul, Instagram
   rosa, redes).
9. **Análise da empresa:** blocos Dados da empresa, Análise completa, Dores prováveis, Oportunidades, Objeções prováveis
   (lista em pílulas azuis), Abordagem recomendada, Serviços, Diferenciais, Especialidades, Palavras-chave, Missão.
10. **Campanha:** selecionar leads, "Adicionar à campanha", dar nome. Vira um funil Kanban que se arrasta: **Novos,
    Contato enviado, Follow-up, Respondeu** (borda de cima colorida em cada coluna). No topo, contagem de WhatsApp e
    e-mails do dia e o limite recomendado.
11. **Mensagem:** janela com o texto pronto para aquela empresa, que dá pra editar, e o botão "Enviar pelo WhatsApp". A
    pessoa é quem clica para enviar, lead por lead.

## O visual

- **Cores:** azul `#1067f8`, verde `#00bc7b`, azul-marinho do texto `#050d1c`, cinza do texto `#596571`, fundo `#f9fbfd`
  (branco quase azulado). Nos títulos, a última palavra vem em azul ("Meus **leads**", "Encontrar **novos leads**").
- **Botão principal:** degradê da esquerda para a direita, do azul para o verde.
- **Cartões:** brancos, bem arredondados, borda fina clara, sombra leve. Etapas concluídas ficam em verde-claro com ✓.
- **Fontes do site:** Space Grotesk nos títulos e DM Sans no texto.
- **O robô (mascote):** azul-claro, cabeça redonda com visor escuro e olhos azuis acesos, antena com bolinha, segurando
  um mapa aberto com um pino. Aparece nas janelas de captura e enriquecimento. Recorte: `mappoa-fluxo/robo.png`.
- **Logo:** o M feito de quarteirões de mapa em azul, verde e cinza (`canal/logo.png`).

## O que isso muda nos temas da pauta

- **Tempo:** a única captura medida aqui deu 99 empresas em 2min 7s (uns 47 por minuto) e a tela limita a busca a 120.
  "200 em menos de um minuto" não tem base nela. Número em vídeo só com captura real.
- **Site desatualizado:** a lista separa sozinha com site e sem site. "Desatualizado" vem da análise completa (no vídeo
  ela apontou site com cara de modelo pronto e em construção), então o vídeo precisa passar por ela.
- **"Nunca comprariam":** a resposta na tela é a aderência à oferta e o score, mais as objeções prováveis.
- **Google Maps na mão:** a cena da janela do robô trabalhando em cima do Maps é o contraste perfeito.

## A planilha exportada (do código do produto)

Faixa azul `#2563EB` com "MAPPOA — Leads Enriquecidos", faixa `#1D4ED8` com mappoa.com, data e quantidade, linha em branco e cabeçalho
marinho `#0F172A`. Colunas: Nome, Categoria, Endereço, Telefone, WhatsApp, E-mail, Instagram, Website, Facebook, LinkedIn, Descrição,
CNPJ, Status. Links sublinhados: WhatsApp `#25D366`, Instagram `#E4405F`, Site e e-mail azuis, Facebook `#1877F2`, LinkedIn `#0A66C2`.
Status: Enriquecido, Parcial, Falhou, Na fila, Novo. O código lido é de julho de 2026; nas cores da tela valem as do site de agora.
