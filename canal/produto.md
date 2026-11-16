# Mappoa: o produto que os vídeos mostram

> Pra IA: ler antes de todo roteiro, cena, capa e texto de postar. Resumo do documento que o dono mandou em 03/11/2026,
> só com o que serve pros vídeos. Não inventar recurso, número, cliente nem resultado além do que está aqui.

## O que é

SaaS B2B de prospecção e captação de leads (https://mappoa.com). Ajuda quem vende pra empresas a encontrar centenas de
empresas que podem comprar o serviço dela, reunir os dados de contato e preparar a abordagem. Posicionamento: uma
ferramenta pra captação de leads e prospecção B2B. Não é "mais um CRM". A principal força (o dono reforçou em
04/11/2026): **leads com qualidade, em escala**. Muitas empresas de uma vez, e só as que combinam com a oferta, já com
os contatos. Todo vídeo leva a isso.

**Como chamar (o dono reforçou em 11/11/2026):** o Mappoa é um **sistema**, uma ferramenta de prospecção de clientes, nunca "um site". A dor é **encontrar o próximo cliente**, e ele acha os leads que **precisam do serviço** (com intenção de compra, nas palavras do dono), não qualquer empresa do Google Maps. Na tela isso aparece pela lista já separada (ex.: com site / sem site, pra quem vende site) e pela análise completa (score de aderência, dores, oportunidades). Não dizer que ele "lê a mente" do cliente nem que garante a venda: ele mostra quem tem mais chance de comprar.

## A dor (o começo de todo vídeo)

Não é não saber vender: é não saber onde achar os próximos 100, 500 ou 1.000 clientes. Sem o Mappoa a pessoa procura
empresa por empresa, entra em site, fuça o Instagram, caça telefone e WhatsApp, procura e-mail e monta planilha na mão.

Personagens de dor (quem assiste já sente isso):
- Gestor de tráfego que abriu a agência e não tem clientes ("Esse é o José...")
- Agência de marketing atrás de contratos novos (ex.: procurando clínicas odontológicas)
- Web designer procurando empresas sem site ou com site ruim
- Consultor montando lista de empresas de um setor
- Vendedor B2B que precisa de volume de contatos

## Como o Mappoa resolve (os passos que podem virar cenas)

1. Buscar empresas por segmento e cidade (ex.: "clínicas odontológicas em Araçatuba", "academias em Campinas")
2. Capturar os leads em escala (tem extensão do Chrome: "Mappoa — Captura de Leads")
3. Enriquecer: telefone, WhatsApp, site, e-mail, Instagram, LinkedIn, Facebook, CNPJ... (nem todo lead tem tudo:
   depende do que é público). Simples = 1 crédito por lead; completo = 3 créditos, com análise da IA (resumo do
   negócio, score, dores, oportunidades, sugestão de abordagem)
4. Organizar no CRM/Kanban do próprio Mappoa, sem planilha
5. Gerar mensagem personalizada pra WhatsApp, e-mail e Instagram, com o contexto da empresa

## Cuidados (o que o vídeo NUNCA diz)

- Não prometer que toda empresa vira cliente nem número de vendas: o Mappoa facilita achar e abordar, quem fecha é a
  pessoa
- Não dizer que o Mappoa envia as mensagens sozinho, acompanha respostas ou marca reuniões: ele gera a mensagem
- Não citar o valor nem o nome do plano no vídeo (os valores ainda mudam). Mas o vídeo deixa claro que o Mappoa é um
  INVESTIMENTO, pra filtrar quem só quer coisa de graça (estava chegando muito cadastro desqualificado): o personagem
  "decide investir o preço de uma pizza" numa ferramenta que traz todo dia empresa sem site. Nunca "grátis" nem "testa
  de graça" (você pediu, 12/11/2026)
- Falar do resultado, não da tecnologia: em vez de "enriqueça leads com IA", "ache as empresas, descubra como falar com
  elas e prepare a mensagem". Em vez de "plataforma com CRM", "pare de perder horas procurando empresa pra prospectar"
- Falar com quem já precisa prospectar (não atrair curioso que nunca vendeu nada)

## Na tela

- A "tela do Mappoa" é desenhada num computador ou celular da cena (`K.computador` / `K.celular`, com
  `c.tela.desenhar`): busca digitada, a lista de empresas enchendo, os ícones de WhatsApp / e-mail / Instagram
  aparecendo, o quadro do Kanban, a mensagem pronta
- O site e a extensão de verdade não aparecem no vídeo: é uma versão desenhada no visual do produto, com o kit de `canal/pecas/mappoa.js` e empresas inventadas
- Como cada tela é de verdade, o passo a passo completo e as cores: `canal/referencias/mappoa-fluxo.md`

## Como o Mappoa acha site ruim e desatualizado (lido no código do Mappoa em 11/11/2026)

> Pra IA: o que dá pra mostrar no vídeo sem inventar. Fonte: a pasta do projeto do Mappoa no computador do dono
> (captura, enriquecimento e análise). Não existe um "detector de site ruim" separado: quem aponta é a IA lendo o site.

**1. Captura (a extensão no Google Maps, grátis por lead)**
- Pega de cada empresa: nome, telefone, endereço, avaliações e o site que está no Maps
- Em "Meus leads", a lista já vem separada em COM SITE e SEM SITE (ex.: "99 leads · 65 com site · 34 sem site")
- Muita empresa põe Instagram, Facebook ou WhatsApp no lugar do site no Maps: o Mappoa percebe e conta como SEM site
  (o link vai pro campo da rede certa). Bom pro vídeo: "a loja acha que tem site, mas é só o Instagram"

**2. Enriquecimento "Contatos e presença digital" (1 crédito)**
- Entra no site de verdade (a página inicial e algumas páginas de dentro) e reúne e-mails, telefones, WhatsApp e as
  redes (Instagram, Facebook, LinkedIn, YouTube, TikTok), CNPJ e a descrição
- Marca se o site abriu: ok, fora do ar / não encontrado (404), não respondeu (demorou demais) ou bloqueado. Site que
  não abre é sinal concreto de site ruim
- Na tela do lead: blocos "Contatos", "Presença digital" (um cartão por canal achado) e "Dados da empresa"

**3. Enriquecimento "Inteligência comercial completa" (3 créditos) = a análise da IA**
- A IA lê o texto do site e devolve: resumo estratégico (o que a empresa faz, porte, público, posicionamento e
  **maturidade digital**), serviços, tecnologias, aderência à oferta de quem vende (**score de 0 a 100** e o porquê),
  **dores prováveis**, **oportunidades**, **objeções prováveis**, abordagem recomendada e as **mensagens prontas**
  (WhatsApp de até 480 letras, assunto e corpo de e-mail)
- A análise é feita em cima da oferta de quem usa: se a pessoa disse que faz sites, as dores e oportunidades saem
  pensando em site (ex.: site com cara de modelo pronto, em construção, parado, presença digital fraca)
- O próprio Mappoa, no guia de dentro do produto, diz que a IA "identifica oportunidades, como site desatualizado,
  Instagram parado, presença digital fraca e muito mais". Essa frase pode ser usada no vídeo
- Site quase vazio (com pouquíssimo texto, tipo "em construção") às vezes nem dá pra IA analisar: a análise volta
  como parcial e devolve parte dos créditos. Então "em construção" aparece mais pelo enriquecimento/presença digital
  do que por uma análise longa
- As mensagens são primeiro contato: apresentam quem envia, citam um detalhe real da empresa e terminam com um convite
  leve. Nunca prometem resultado. Quem envia é a pessoa (o Mappoa só abre o WhatsApp ou o e-mail com o texto pronto)

**Na tela do vídeo (o dono reforçou em 11/11/2026):** o enriquecimento completo é o pacote inteiro, e o vídeo pode mostrar tudo: os **dados da empresa**, a **análise**, a **aderência à sua oferta** com o **score**, as **dores**, as **oportunidades**, as **objeções** e a **mensagem pronta**. Os nomes dos blocos na tela do Mappoa: "Dados da empresa", "Análise completa", "Dores prováveis", "Oportunidades", "Objeções prováveis", "Abordagem recomendada" e o score "NN/100"

**O que NÃO dizer no vídeo**
- Que o Mappoa "dá nota pro design" ou "mede a velocidade do site": ele não faz isso
- Que ele vê o ano do site ou a data da última atualização: não existe um campo assim (só se a IA ler no texto)
- Que existe uma etiqueta oficial "site ruim" / "site desatualizado": isso aparece escrito nas **dores** e
  **oportunidades** da análise, não como uma etiqueta. No vídeo, as etiquetas da cena podem resumir o que a análise
  escreveu, mas sem parecer um botão do produto
