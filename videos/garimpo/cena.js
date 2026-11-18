// Lote "então não faça isso" (canal Mappoa): três vídeos com o mesmo esqueleto e o mesmo cena.js.
// Muda só a linha VID em cada pasta. Tudo o que é de cada vídeo (nome, comida, nicho, cidade, telas, etiquetas, o lugar
// da venda) fica no CFG; os planos do gancho à virada (e o "Antes") ficam em PV[VID]; os do Mappoa são iguais nos três.
// VID 'canhao': o Bruno num canhão gigante disparando a mesma mensagem pra cidade inteira (academias de Joinville).
// VID 'planilha': o Mateus anotando empresa por empresa numa planilha de papel que dá a volta no quarteirão (clínicas
//   de estética de Maringá).
// VID 'grupo': o post "Alguém faz site?" e a multidão de web designers atropelando o Henrique (óticas de Sorocaba).
// VID 'placa' (placa-na-rua): storytime em 1ª pessoa; a placa gigante FAÇO SITE na rua, o portfólio com 1 curtida, as abas do
//   Maps até o teto, o senhor que dá o conselho e que no fim é o dono da clínica (clínicas de Campinas).
// VID 'sobrinho' (sobrinho-de-14-anos): storytime em 1ª pessoa; o sobrinho de skate arranca o contrato, o orçamento
//   gigante, 'meu sobrinho faz de graça', um sobrinho em cada loja, as lojas com problema e, no fim, a mesma escola com o
//   site caído (escolas de inglês de Florianópolis).
// Lugares (K.cenarios): o calçadão entre prédios, o quarto de dia, a central e o palco do Mappoa, e o lugar da venda
// (a academia, a clínica ou a ótica do próprio calçadão). Cada plano começa com as linhas da ficha do roteiro.md.
// VID 'gui' (ninguem-responde): storytime em 1ª pessoa; o Gui soterrado pelas próprias mensagens, o post no grupo com 40
//   "eu também", o Instagram com 2 curtidas (uma dele), as 100 mensagens visualizadas nas lojas, os ✗ de quem já tinha
//   site e, no fim, o dono da clínica com 99 "oi, faço sites" no celular (clínicas de Campinas, frases do Mappoa da placa).
// VID 'dono' (caixa-de-entrada): narrativa em 3ª pessoa; o gancho é o dono da cafeteria com o celular explodindo de
//   "Oi, faço sites!" e jogando o celular no lixo; o Rodrigo tenta grupo, Instagram e 100 mensagens; no fim, o dono do
//   começo leu só a mensagem dele (cafeterias de Curitiba).
// VID 'batalha' (campo-de-batalha): narrativa em 3ª pessoa; o post "Alguém faz site?" no meio da rua vira uma guerra
//   de web designers (notebooks de escudo, balões de comentário como flechas, explosão) e o Caio leva um balão na cara;
//   no fim, a dona da floricultura era a dona do post e não leu nenhum comentário (floriculturas de Belo Horizonte).
// VID 'triturador' (triturador): narrativa em 3ª pessoa; uma esteira gigante leva centenas de "Oi, faço sites!" pra um
//   triturador de papel enorme na porta da lavanderia, que cospe confete; o Fábio corre atrás do balão dele; no fim, a
//   dona do triturador tirou só a mensagem dele da esteira (lavanderias de Juiz de Fora).
// VID 'garimpo' (garimpo): narrativa em 3ª pessoa; o Murilo peneira uma montanha de pedras-empresa na beira do rio com uma
//   peneira gigante; no dia um joga fora a Tinta Viva ("já tem site"); no fim, ela era o cliente: o site era só um
//   Instagram e a pedra racha com ouro dentro (estúdios de tatuagem de Blumenau).
(function () {
  const VID = 'garimpo';

  // ===================== CFG (o que muda em cada vídeo) =====================
  const TODOS = {
    canhao: {
      nome: 'Bruno', comida: 'açaí', palavraComida: 'açaí', nicho: 'Academias', estado: 'SC', cidade: 'Joinville',
      total: 87, com: 56, sem: 31, palavraTotal: 'oitenta', palavraSem: 'trinta',
      itens: [
        { nome: 'Academia Força Total', end: 'Rua XV de Novembro, 1500', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Joinville Fit Center', end: 'Av. Getúlio Vargas, 820', chips: ['tel', 'whats'] },
        { nome: 'Studio Corpo Ativo', end: 'Rua Blumenau, 310', chips: ['whats'] },
        { nome: 'Academia Pulso', end: 'Rua Dona Francisca, 2050', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Academia Força Total', score: 90, dores: ['Sem site: só tem Instagram', 'Aluno não acha o horário das turmas'], op: 'Site com as turmas e botão do WhatsApp', obj: '"O Instagram já resolve"', abordagem: 'Cite a turma nova de funcional e mostre quem procura academia no bairro.' },
      msg: 'Oi! Vi que a Academia Força Total abriu a turma de funcional, mas ainda não tem site. Faço sites pra academias aqui de Joinville. Posso te mostrar uma ideia?',
      venda: 'acad', palavraEnviadas: 'quinze', enviadas: 15, palavraNao: 'respondeu', palavraFim: 'venda', palavraAgora: 'Agora', palavraFimAgora: 'precisa',
      et: { total: '87 academias', sem: '31 sem site', nota: 'Nota 90', msg: 'Fala da academia', palavraMsg: 'dela', semResp: 'Sem resposta', venda: 'Primeira venda!', agora: 'Agora', fechou: 'Fechou' },
      cta: 'Quantas sem resposta? <em>Comenta o número</em>', palavraCta: 'mensagens', palavraNumero: 'número'
    },
    planilha: {
      nome: 'Mateus', comida: 'hambúrguer', palavraComida: 'hambúrguer', nicho: 'Clínicas de estética', estado: 'PR', cidade: 'Maringá',
      total: 72, com: 44, sem: 28, palavraTotal: 'setenta', palavraSem: 'vinte',
      itens: [
        { nome: 'Clínica Bella Pele', end: 'Av. Brasil, 3100', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Estética Viva Maringá', end: 'Av. Tiradentes, 640', chips: ['tel', 'insta'] },
        { nome: 'Espaço Renova', end: 'Rua Néo Alves Martins, 1180', chips: ['whats'] },
        { nome: 'Studio Pele de Seda', end: 'Av. Herval, 455', chips: ['whats', 'tel'] }
      ],
      analise: { nome: 'Clínica Bella Pele', score: 87, dores: ['Sem site próprio', 'Agenda só pelo WhatsApp'], op: 'Site com os tratamentos e agendamento online', obj: '"Minhas clientes vêm por indicação"', abordagem: 'Cite as avaliações boas e mostre quem procura estética na cidade.' },
      msg: 'Oi! Vi que a Clínica Bella Pele tem ótimas avaliações, mas ainda não tem site. Faço sites pra clínicas de estética aqui de Maringá. Posso te mostrar uma ideia?',
      venda: 'clinica', palavraEnviadas: 'vinte', enviadas: 20, palavraNao: 'não', palavraFim: 'vendido', palavraAgora: 'Agora', palavraFimAgora: 'abordando',
      et: { total: '72 clínicas', sem: '28 sem site', nota: 'Nota 87', msg: 'Mensagem pronta', palavraMsg: 'pronta', semResp: 'Não, obrigado', venda: '1º site vendido!', agora: 'Agora', fechou: 'Fechou' },
      cta: 'Quantos dias de planilha? <em>Comenta o número</em>', palavraCta: 'dias', palavraNumero: 'número'
    },
    grupo: {
      nome: 'Henrique', comida: 'coxinha', palavraComida: 'coxinha', nicho: 'Óticas', estado: 'SP', cidade: 'Sorocaba',
      total: 68, com: 43, sem: 25, palavraTotal: 'sessenta', palavraSem: 'vinte',
      itens: [
        { nome: 'Ótica Visão Clara', end: 'Rua XV de Novembro, 210', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Ótica Sorocabana', end: 'Av. General Carneiro, 990', chips: ['tel', 'whats'] },
        { nome: 'Óculos & Cia', end: 'Rua da Penha, 420', chips: ['whats'] },
        { nome: 'Ótica Bom Olhar', end: 'Av. Itavuvu, 1550', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Ótica Visão Clara', score: 88, dores: ['Sem site', 'Catálogo de armações só no WhatsApp'], op: 'Site com o catálogo e o agendamento do exame', obj: '"O WhatsApp já resolve"', abordagem: 'Elogie o catálogo de armações e mostre quem procura ótica na cidade.' },
      msg: 'Oi! Vi que a Ótica Visão Clara tem um catálogo de armações lindo no WhatsApp, mas ainda não tem site. Faço sites pra óticas aqui de Sorocaba. Posso te mostrar uma ideia?',
      venda: 'otica', palavraEnviadas: 'vinte', enviadas: 20, palavraNao: 'responderam', palavraFim: 'ninguém', palavraAgora: 'Agora', palavraFimAgora: 'primeiro',
      et: { total: '68 óticas', sem: '25 sem site', nota: 'Nota 88', msg: 'Mensagem pronta', palavraMsg: 'pronta', semResp: 'Sem resposta', venda: 'Sem disputa!', agora: 'Agora', fechou: 'Primeiro' },
      cta: 'Quantos comentários? <em>Comenta o número</em>', palavraCta: 'comentários', palavraNumero: 'número'
    },
    placa: {
      nome: 'Eu', comida: 'coxinha', palavraComida: 'decidi', nicho: 'Clínicas', estado: 'SP', cidade: 'Campinas',
      total: 214, com: 134, sem: 80, palavraTotal: 'lista', palavraSem: 'oitenta',
      itens: [
        { nome: 'Clínica Vida Campinas', end: 'Av. Norte-Sul, 1200', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Clínica Bem Estar', end: 'Rua Barão de Jaguara, 840', chips: ['tel', 'whats'] },
        { nome: 'Centro Médico Taquaral', end: 'Av. Heitor Penteado, 310', chips: ['whats'] },
        { nome: 'Clínica São Bento', end: 'Rua José Paulino, 1555', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Clínica Vida Campinas', score: 89, dores: ['Sem site', 'Agenda só pelo telefone'], op: 'Site com os tratamentos e o agendamento online', obj: '"Meus pacientes vêm por indicação"', abordagem: 'Cite as avaliações boas e mostre quem procura clínica em Campinas.' },
      msg: 'Oi! Vi que a Clínica Vida Campinas tem ótimas avaliações, mas ainda não tem site. Faço sites pra clínicas aqui de Campinas. Posso te mostrar uma ideia?',
      venda: 'clinica', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'aqui', palavraAgora: 'Agora', palavraFimAgora: 'né',
      et: { total: '214 clínicas', sem: '80 sem site', nota: 'Campanha', msg: 'Mensagem pronta', palavraMsg: 'pronta', semResp: 'Não, obrigado', venda: 'Pode vir aqui!', agora: 'Agora', fechou: 'Era ele!' },
      cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'mando',
      w: { digita: 'entrei', escreve: 'pesquisei' }
    },
    sobrinho: {
      nome: 'Eu', comida: 'coxinha', palavraComida: 'decidi', nicho: 'Escolas de inglês', estado: 'SC', cidade: 'Florianópolis',
      total: 90, com: 58, sem: 32, palavraTotal: 'noventa', palavraSem: 'trinta', foraDoAr: true,
      itens: [
        { nome: 'Floripa English School', end: 'Av. Beira-Mar Norte, 840', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Ilha Idiomas', end: 'Rua Lauro Linhares, 310', chips: ['tel', 'whats'] },
        { nome: 'Speak Up Idiomas', end: 'Rua Bocaiúva, 1200', chips: ['whats'] },
        { nome: 'Hello Kids Inglês', end: 'Rua Felipe Schmidt, 1555', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Floripa English School', score: 91, dores: ['Site fora do ar (erro 404)', 'Matrícula só pelo WhatsApp'], op: 'Site novo com as turmas e a matrícula online', obj: '"Meu sobrinho já fez o site"', abordagem: 'Avise que o site caiu e mostre quem procura curso de inglês em Florianópolis.' },
      msg: 'Oi! Vi que o site da Floripa English School está fora do ar, e quem procura curso de inglês aqui em Florianópolis não acha vocês. Faço sites pra escolas de idiomas. Posso te mostrar uma ideia?',
      venda: 'escola', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'hora', palavraAgora: 'Agora', palavraFimAgora: 'caído',
      et: { total: '90 escolas', sem: '32 fora do ar ou sem site', nota: 'Campanha', msg: 'Mensagem pronta', palavraMsg: 'pronta', semResp: 'Não, obrigado', venda: 'Respondeu na hora!', agora: 'Agora', fechou: 'Voltou!' },
      cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'mando',
      w: { digita: 'entrei', escreve: 'pesquisei' },
      funil: 'Escolas de inglês de Florianópolis',
      resp: { de: 'Speak Up Idiomas', antes: 'Oi! Vi que o site de vocês...', texto: 'Nosso site caiu! Socorro 🙏' }
    },
    gui: {
      nome: 'Gui', comida: 'coxinha', palavraComida: 'decidi', nicho: 'Clínicas', estado: 'SP', cidade: 'Campinas',
      total: 214, com: 134, sem: 80, palavraTotal: 'lista', palavraSem: 'oitenta',
      itens: [
        { nome: 'Clínica Vida Campinas', end: 'Av. Norte-Sul, 1200', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Clínica Bem Estar', end: 'Rua Barão de Jaguara, 840', chips: ['tel', 'whats'] },
        { nome: 'Centro Médico Taquaral', end: 'Av. Heitor Penteado, 310', chips: ['whats'] },
        { nome: 'Clínica São Bento', end: 'Rua José Paulino, 1555', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Clínica Vida Campinas', score: 89, dores: ['Sem site', 'Agenda só pelo telefone'], op: 'Site com os tratamentos e o agendamento online', obj: '"Meus pacientes vêm por indicação"', abordagem: 'Cite as avaliações boas e mostre quem procura clínica em Campinas.' },
      msg: 'Oi! Vi que a Clínica Vida Campinas tem ótimas avaliações, mas ainda não tem site. Faço sites pra clínicas aqui de Campinas. Posso te mostrar uma ideia?',
      venda: 'clinica', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'aqui', palavraAgora: 'Agora', palavraFimAgora: 'sites',
      et: { total: '214 clínicas', sem: '80 sem site', nota: 'Campanha', msg: 'Mensagem pronta', palavraMsg: 'pronta', semResp: 'Não, obrigado', venda: 'Pode vir aqui!', agora: 'Agora', fechou: 'O único diferente' },
      cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'mando',
      w: { digita: 'entrei', escreve: 'pesquisei' }
    },
    dono: {
      nome: 'Rodrigo', comida: 'coxinha', palavraComida: 'decidiu', nicho: 'Cafeterias', estado: 'PR', cidade: 'Curitiba',
      total: 158, com: 98, sem: 60, palavraTotal: 'lista', palavraSem: 'sessenta',
      itens: [
        { nome: 'Café Araucária', end: 'Rua XV de Novembro, 870', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Grão Curitibano', end: 'Av. Sete de Setembro, 2410', chips: ['tel', 'whats'] },
        { nome: 'Café do Largo', end: 'Largo da Ordem, 45', chips: ['whats'] },
        { nome: 'Empório Pinhão', end: 'Rua Mateus Leme, 1320', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Café Araucária', score: 91, dores: ['Sem site: só tem o Instagram', 'Cardápio só por foto no WhatsApp'], op: 'Site com o cardápio e o pedido pelo WhatsApp', obj: '"Já recebo mensagem demais"', abordagem: 'Elogie o café especial e mostre quem procura cafeteria em Curitiba.' },
      msg: 'Oi! Vi que o Café Araucária tem ótimas avaliações do café especial, mas ainda não tem site. Faço sites pra cafeterias aqui de Curitiba. Posso te mostrar uma ideia?',
      venda: 'cafe', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'amanhã', palavraAgora: 'Agora', palavraFimAgora: 'leu',
      et: { total: '158 cafeterias', sem: '60 sem site', nota: 'Campanha', msg: 'Mensagem personalizada', palavraMsg: 'cafeteria', semResp: 'Não, obrigado', venda: 'Passa aqui amanhã!', agora: 'Agora', fechou: 'A única que ele leu' },
      cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'mando',
      w: { digita: 'entrou', escreve: 'pesquisou', Postei: 'Postou', 'faço': 'Facebook', Quarenta: 'concorrente', 'também': 'comentou', Duas: 'Ninguém', Uma: 'viu', minha: 'viu', mandei: 'mandou', Visualizaram: 'Nenhuma', sumiram: 'respondeu', entendi: 'erro', decidi: 'decidiu', precisam: 'precisa', enviei: 'mandou', pronta: 'cafeteria' },
      funil: 'Cafeterias de Curitiba',
      resp: { de: 'Café Araucária', antes: 'Oi! Vi que o Café Araucária...', texto: 'Passa aqui amanhã! ☕' },
      insta0: true
    },
    batalha: {
      nome: 'Caio', comida: 'coxinha', palavraComida: 'decidiu', nicho: 'Floriculturas', estado: 'MG', cidade: 'Belo Horizonte',
      total: 110, com: 68, sem: 42, palavraTotal: 'cento', palavraSem: 'quarenta',
      itens: [
        { nome: 'Floricultura Ipê', end: 'Rua da Bahia, 1120', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Flor de Minas', end: 'Av. Afonso Pena, 2300', chips: ['tel', 'whats'] },
        { nome: 'Jardim Savassi', end: 'Rua Pernambuco, 640', chips: ['whats'] },
        { nome: 'Ateliê das Rosas', end: 'Av. do Contorno, 5100', chips: ['tel', 'insta'] }
      ],
      analise: { nome: 'Floricultura Ipê', score: 90, dores: ['Sem site: só tem o Instagram', 'Pedido de buquê só pelo WhatsApp'], op: 'Site com o catálogo e o pedido de entrega', obj: '"Já tenho Instagram"', abordagem: 'Elogie os arranjos e mostre quem procura floricultura em BH.' },
      msg: 'Oi! Vi que a Floricultura Ipê tem arranjos lindos no Instagram, mas ainda não tem site. Faço sites pra floriculturas aqui de BH. Posso te mostrar uma ideia?',
      venda: 'flor', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'agora', palavraAgora: 'Agora', palavraFimAgora: 'dele',
      et: { total: '110 floriculturas', sem: '42 sem site', nota: 'Campanha', msg: 'Feita pra cada uma', palavraMsg: 'feita', semResp: 'Não, obrigado', venda: 'Me liga agora!', agora: 'Agora', fechou: 'Só a dele' },
      cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'mando',
      w: { digita: 'entrou', escreve: 'buscou', Postei: 'postou', 'faço': 'grupo', Quarenta: 'Choveu', 'também': 'menos', Duas: 'Nenhum', Uma: 'cliente', minha: 'cliente', mandei: 'Mandou', Visualizaram: 'Só', sumiram: 'visualização', entendi: 'erro', decidi: 'decidiu', precisam: 'sem', enviei: 'recebeu', pronta: 'feita' },
      funil: 'Floriculturas de BH',
      resp: { de: 'Floricultura Ipê', antes: 'Oi! Vi que a Floricultura Ipê...', texto: 'Me liga agora! 🌷' },
      coment: ['Faço por R$ 150', 'Eu cobro menos!', 'Faço por 99', 'Faço por R$ 80', 'Mais barato aqui!', 'Faço por 50', 'Eu faço por 120', 'Me chama, cobro menos'],
      insta0: true
    }
  };
  TODOS.triturador = {
    nome: 'Fábio', comida: 'coxinha', palavraComida: 'decidiu', nicho: 'Lavanderias', estado: 'MG', cidade: 'Juiz de Fora',
    total: 96, com: 58, sem: 38, palavraTotal: 'noventa', palavraSem: 'trinta',
    itens: [
      { nome: 'Lavanderia Bolha', end: 'Rua Halfeld, 640', chips: ['whats', 'tel', 'insta'] },
      { nome: 'Lava & Passa JF', end: 'Av. Rio Branco, 2890', chips: ['tel', 'whats'] },
      { nome: 'Varal Express', end: 'Rua São João, 215', chips: ['whats'] },
      { nome: 'Lavô Lavanderia', end: 'Av. Barão do Rio Branco, 4100', chips: ['tel', 'insta'] }
    ],
    analise: { nome: 'Lavanderia Bolha', score: 89, dores: ['Sem site: só tem o Instagram', 'Coleta só agendada por ligação'], op: 'Site com a tabela de preços e o agendamento da coleta', obj: '"O pessoal liga mesmo"', abordagem: 'Elogie a entrega rápida e mostre quem procura lavanderia em Juiz de Fora.' },
    msg: 'Oi! Vi que a Lavanderia Bolha só agenda coleta por ligação e ainda não tem site. Faço sites pra lavanderias aqui de Juiz de Fora, com o agendamento online. Posso te mostrar?',
    venda: 'lav', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'hoje', palavraAgora: 'Agora', palavraFimAgora: 'esteira',
    et: { total: '96 lavanderias', sem: '38 sem site', nota: 'Campanha', msg: 'Fala do problema dela', palavraMsg: 'problema', semResp: 'Não, obrigado', venda: 'Passa aqui hoje!', agora: 'Agora', fechou: 'A única que ela tirou' },
    cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'mando',
    w: { digita: 'entrou', escreve: 'buscou', Postei: 'postou', 'faço': 'grupo', Quarenta: 'apareceu', 'também': 'concorrente', todo: 'mês', Duas: 'Ninguém', Uma: 'viu', minha: 'viu', mandei: 'Mandou', Visualizaram: 'Silêncio', sumiram: 'total', entendi: 'erro', decidi: 'decidiu', precisam: 'precisa', enviei: 'recebeu', pronta: 'problema' },
    funil: 'Lavanderias de Juiz de Fora',
    resp: { de: 'Lavanderia Bolha', antes: 'Oi! Vi que a Lavanderia Bolha...', texto: 'Passa aqui hoje! 🧺' },
    coment: ['Também faço!', 'Eu faço por menos', 'Chama eu!', 'Faço também 😎', 'Faço por R$ 99', 'Eu também faço', 'Inbox!', 'Me chama!'],
    insta0: true
  };
  TODOS.garimpo = {
    nome: 'Murilo', comida: 'coxinha', palavraComida: 'decidiu', nicho: 'Estúdios de tatuagem', estado: 'SC', cidade: 'Blumenau',
    total: 84, com: 53, sem: 31, palavraTotal: 'oitenta', palavraSem: 'trinta',
    itens: [
      { nome: 'Tinta Viva Tattoo', end: 'Rua XV de Novembro, 1050', chips: ['whats', 'tel', 'insta'] },
      { nome: 'Agulha de Ouro Studio', end: 'Rua 7 de Setembro, 420', chips: ['tel', 'whats'] },
      { nome: 'Blumenau Ink', end: 'Rua Itajaí, 2210', chips: ['whats'] },
      { nome: 'Traço Fino Tattoo', end: 'Rua Amazonas, 815', chips: ['tel', 'insta'] }
    ],
    analise: { nome: 'Tinta Viva Tattoo', score: 90, dores: ['O "site" é só o Instagram', 'Orçamento só pelo direct'], op: 'Site com o portfólio e o orçamento pelo WhatsApp', obj: '"Meu Instagram já é meu site"', abordagem: 'Elogie o traço fino e mostre quem procura tatuagem em Blumenau.' },
    msg: 'Oi! Vi que o link do site da Tinta Viva leva só pro Instagram. Faço sites pra estúdios de tatuagem aqui de Blumenau, com o portfólio e o orçamento. Posso te mostrar?',
    venda: 'tattoo', palavraEnviadas: 'trinta', enviadas: 30, palavraNao: 'não', palavraFim: 'hoje', palavraAgora: 'Agora', palavraFimAgora: 'tarde',
    et: { total: '84 estúdios', sem: '31 sem site', nota: 'Nota 90', msg: 'Fala do problema dele', palavraMsg: 'problema', semResp: 'Não, obrigado', venda: 'Passa aqui hoje!', agora: 'Agora', fechou: 'Era ouro!' },
    cta: 'Comenta a <em>sua cidade</em>', palavraCta: 'Comenta', palavraNumero: 'cidade',
    w: { digita: 'entrou', escreve: 'buscou', decidi: 'decidiu', precisam: 'pepitas' },
    resp: { de: 'Tinta Viva Tattoo', antes: 'Oi! Vi que o link da Tinta Viva...', texto: 'Passa aqui hoje! 🖤' }
  };
  const CFG = TODOS[VID];
  const W = (s) => (CFG.w && CFG.w[s]) || s;
  const LX = [-0.75, 0, 8.5 + 0.8]; // a lixeira do dono (gancho e reencontro)
  // ==========================================================================

  const PI = Math.PI;
  let bl, CS, Cr, M, menino, dono, robo, comp, cadeira, comidaG, moeda, navG, buscaP, listaP, telaM, telaQ, cel, FOV0;
  const tudo = [], fx = {}, multidao = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const PLAN_Q = [1.5, 0, -0.9];
  // Calçadão (rua_predios): o trecho de z 5,5 a 11,5 não tem árvore nos dois lados (esq. z 5 e 19, dir. z 12 e -2).
  // A cena fica em volta de CZ, no meio (x ~0,3); as câmeras olham pro -z de x entre -0,5 e 1,2 (fora das árvores)
  const CZ = 8.5;
  // Central e palco do Mappoa
  const LISTA_C = [-0.2, 1.7, 0.8];
  // Lugares da venda: academia por dentro, a recepção da clínica (dona na ponta do balcão, do lado de fora) e a ótica do calçadão
  const VENDA = {
    acad: { dono: [1.55, 0, -0.75], heroi: [0.35, 0, 0.35], de: [-1.6, 0, 2.6] },
    clinica: { dono: [-2.85, 0, -2.1], heroi: [-1.75, 0, -1.35], de: [0.6, 0, 1.6] },
    otica: { dono: [4.6, 0, 5.1], heroi: [3.5, 0, 5.4], de: [0.9, 0, 11] }
  };

  const LUGAR_COMUM = {
    investe: 'quarto', busca: 'quarto', lista: 'central_mappoa', mappoa: 'mundo_mappoa', analise: 'quarto', segue: 'quarto', cartao: 'quarto'
  };
  const LUGAR_VID = {
    canhao: { gancho: 'rua', qualquer: 'rua', errados: 'rua', ignorado: 'rua', virada: 'rua', capa: 'rua' },
    planilha: { gancho: 'rua', maps: 'quarto', planilha: 'rua', falha: 'rua', virada: 'rua', capa: 'rua' },
    grupo: { gancho: 'rua', post: 'quarto', comentarios: 'quarto', leilao: 'rua', virada: 'rua', capa: 'rua' },
    placa: { gancho: 'rua', portfolio: 'quarto', maps: 'quarto', placa: 'rua', conselho: 'rua', venda: 'quarto', reencontro: 'clinica', capa: 'rua' },
    sobrinho: { gancho: 'rua', orcamento: 'quarto', resposta: 'quarto', sobrinhos: 'rua', virada: 'rua', venda: 'quarto', reencontro: 'rua', capa: 'rua' },
    gui: { gancho: 'rua', grupo: 'quarto', insta: 'quarto', mensagens: 'rua', virada: 'rua', venda: 'quarto', reencontro: 'clinica', capa: 'rua' },
    dono: { gancho: 'rua', grupo: 'quarto', insta: 'quarto', mensagens: 'rua', virada: 'rua', venda: 'quarto', reencontro: 'rua', capa: 'rua' },
    batalha: { gancho: 'rua', grupo: 'quarto', insta: 'quarto', mensagens: 'rua', virada: 'rua', venda: 'quarto', reencontro: 'rua', capa: 'rua' },
    triturador: { gancho: 'rua', grupo: 'quarto', insta: 'quarto', mensagens: 'rua', virada: 'rua', venda: 'quarto', reencontro: 'rua', capa: 'rua' },
    garimpo: { gancho: 'campo', peneira: 'campo', dias: 'campo', cascalho: 'campo', venda: 'quarto', reencontro: 'campo', capa: 'campo' }
  }[VID];
  const lugarVenda = () => (CFG.venda === 'otica' ? 'rua' : CFG.venda);
  function lugarDe(B, tc) {
    if (VID === 'garimpo' && B.plano === 'antes_agora') return tc < quando('Agora', B, 0.3) - 0.05 ? 'campo' : 'quarto';
    if (VID === 'garimpo') return LUGAR_VID[B.plano] || LUGAR_COMUM[B.plano] || 'quarto';
    if (VID === 'placa' || VID === 'sobrinho' || VID === 'gui' || VID === 'dono' || VID === 'batalha' || VID === 'triturador') return LUGAR_VID[B.plano] || LUGAR_COMUM[B.plano] || 'quarto';
    if (B.plano === 'venda') return tc < quando('Mas', B, 0.55) ? 'quarto' : lugarVenda();
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'rua' : lugarVenda();
    return LUGAR_VID[B.plano] || LUGAR_COMUM[B.plano] || 'quarto';
  }

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    if (!g.parent) K.scene.add(g);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  function canvasTex(px, py, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = py;
    desenho(cv.getContext('2d'), px, py);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  function folha(l, a, px, desenho) {
    const t = canvasTex(px, Math.round((px * a) / l), desenho);
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }
  // placa de loja num poste, de frente pra +z (placa colada na fachada some de quina: lição do aspirador-de-cliente)
  function placaPoste(texto, fundo, corTxt) {
    const g = new THREE.Group();
    const poste = K.malha(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 10), K.mat(0x3a3f46)); poste.position.y = 1.3; g.add(poste);
    const p = folha(1.5, 0.7, 512, (c, w, h) => { rr(c, 0, 0, w, h, 26, fundo); c.strokeStyle = '#ffffff'; c.lineWidth = 10; c.beginPath(); c.roundRect(10, 10, w - 20, h - 20, 20); c.stroke(); txt(c, texto, w / 2, h / 2 + 4, h * 0.34, corTxt || '#fff', 900, 'center', w - 50); });
    p.position.y = 2.85; g.add(p);
    return g;
  }

  // ---------- Telas desenhadas ----------
  function telas() {
    const T = K.telasMappoa;
    T.buscaV = (c, w, h, e) => T.busca(c, w, h, { nicho: CFG.nicho, estado: CFG.estado, cidade: CFG.cidade, qtd: 'Todos os leads disponíveis', digitado: e.digitado, apertado: e.apertado });
    T.listaV = (c, w, h, e) => {
      const itens = CFG.itens.map((o) => Object.assign({}, o, { chips: e.chips ? o.chips : [] }));
      const cheio = e.total >= CFG.total;
      T.lista(c, w, h, { total: e.total, comSite: cheio ? CFG.com : Math.round((e.total * CFG.com) / CFG.total), semSite: cheio ? CFG.sem : Math.round((e.total * CFG.sem) / CFG.total), grupo: e.sem ? 'SEM SITE' : 'COM SITE', itens, n: e.n, sel: e.sem ? 0 : -1 });
      // o selo vermelho FORA DO AR ao lado do grupo (sobrinho: os sites caídos contam junto com os sem site)
      if (CFG.foraDoAr && e.sem) { rr(c, w - 200, 206, 180, 34, 17, '#e8352b'); txt(c, 'FORA DO AR', w - 110, 224, 20, '#fff', 900, 'center'); }
    };
    T.analiseV = (c, w, h, e) => {
      const k = K.clamp(e.score || 0), A = CFG.analise;
      T.analise(c, w, h, { nome: A.nome, ate: e.ate, aderencia: (A.score / 100) * k, dores: A.dores, oportunidades: [A.op], objecoes: [A.obj], abordagem: A.abordagem });
      if (e.ate >= 0) txt(c, Math.round(A.score * k) + '/100', w - 38, 216, 30, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.mensagemV = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: ' + CFG.analise.nome, digitado: e.digitado, texto: CFG.msg });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };
    // O post do grupo (genérico, sem a marca de nenhuma rede): a foto redonda da dona, o texto e o contador de comentários
    T.post = (c, w, h, e) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      rr(c, 0, 0, w, h * 0.13, 0, '#3b5ba9'); txt(c, 'Grupo: Empreendedores da Cidade', 24, h * 0.065, h * 0.05, '#fff', 800, 'left', w - 48);
      c.fillStyle = '#f2a7c3'; c.beginPath(); c.arc(70, h * 0.24, h * 0.07, 0, 7); c.fill();
      txt(c, 'Néia · Bazar da Néia', 130, h * 0.21, h * 0.045, '#111', 800); txt(c, 'agora mesmo', 130, h * 0.27, h * 0.035, '#6b7280', 700);
      txt(c, 'Alguém faz site?', w / 2, h * 0.52, h * 0.13, '#111', 900, 'center', w - 40);
      c.fillStyle = '#e5e7eb'; c.fillRect(20, h * 0.78, w - 40, 3);
      txt(c, '👍 ' + Math.max(3, Math.round((e.n || 0) / 4)), 30, h * 0.88, h * 0.05, '#3b5ba9', 800);
      txt(c, (e.n || 0) + ' comentários', w - 30, h * 0.88, h * 0.055, e.n > 20 ? '#e8352b' : '#4b5563', 900, 'right');
    };
    // O celular: a conversa com os vistos azuis e o "Bloqueado"
    T.conversa = (c, w, h, e) => {
      c.fillStyle = '#e9efe9'; c.fillRect(0, 0, w, h);
      rr(c, 0, 0, w, h * 0.1, 0, '#1f7a5a'); txt(c, 'Empresas', 20, h * 0.05, h * 0.04, '#fff', 800);
      for (let i = 0; i < 5; i++) {
        const y = h * (0.15 + i * 0.15);
        rr(c, w * 0.22, y, w * 0.72, h * 0.11, 16, '#d9fdd3'); txt(c, 'Oi, faço sites!', w * 0.27, y + h * 0.04, h * 0.035, '#111', 700);
        if (i < (e.vistos || 0)) txt(c, '✓✓', w * 0.9, y + h * 0.08, h * 0.035, '#34b7f1', 900, 'right');
      }
      if (e.bloq) { rr(c, w * 0.08, h * 0.4, w * 0.84, h * 0.2, 22, '#e8352b'); txt(c, 'Bloqueado', w / 2, h * 0.5, h * 0.07, '#fff', 900, 'center'); }
    };
    T.colunas = (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#1f7a44');
      ['NOME', 'TELEFONE', 'TEM SITE?'].forEach((s, i) => txt(c, s, (w / 3) * (i + 0.5), h / 2 + 3, h * 0.36, '#fff', 900, 'center', w / 3 - 16));
    };
    T.calendario = (c, w, h, e) => {
      rr(c, 0, 0, w, h, 20, '#ffffff'); rr(c, 0, 0, w, h * 0.32, 20, '#e8352b'); c.fillStyle = '#e8352b'; c.fillRect(0, h * 0.18, w, h * 0.14);
      txt(c, e.mes || 'NOVEMBRO', w / 2, h * 0.16, h * 0.13, '#fff', 900, 'center');
      txt(c, e.dia || 'SEG', w / 2, h * 0.66, h * 0.32, '#111', 900, 'center');
    };
    // Placa na rua: o relógio de parede, a campanha (funil) com as clínicas
    T.relogio = (c, w, h, e) => {
      rr(c, 0, 0, w, h, 24, e.noite ? '#0b1b3a' : '#1e1f22');
      txt(c, e.hora || '23:40', w / 2, h / 2 + 4, h * 0.55, e.noite ? '#ff5a4a' : '#7fe0a0', 900, 'center', w - 30);
    };
    // o site da escola fora do ar (o erro 404)
    T.erro404 = (c, w, h) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h); rr(c, 0, 0, w, h * 0.16, 0, '#e5e7eb'); txt(c, 'speakupidiomas.com.br', 20, h * 0.08, h * 0.07, '#4b5563', 700, 'left', w - 40); txt(c, '404', w / 2, h * 0.5, h * 0.36, '#e8352b', 900, 'center'); txt(c, 'Página não encontrada', w / 2, h * 0.8, h * 0.085, '#111', 800, 'center', w - 40); };
    // Gui: o post dele no grupo (genérico, sem a marca de nenhuma rede) e o inbox do dono da clínica
    T.postGui = (c, w, h, e) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      rr(c, 0, 0, w, h * 0.13, 0, '#3b5ba9'); txt(c, 'Grupo: Empreendedores de ' + CFG.cidade, 24, h * 0.065, h * 0.05, '#fff', 800, 'left', w - 48);
      c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(70, h * 0.24, h * 0.07, 0, 7); c.fill(); txt(c, CFG.nome[0], 70, h * 0.245, h * 0.08, '#fff', 900, 'center');
      txt(c, CFG.nome + ' · Web designer', 130, h * 0.21, h * 0.045, '#111', 800); txt(c, 'agora mesmo', 130, h * 0.27, h * 0.035, '#6b7280', 700);
      txt(c, 'Faço site! Me chama 🙂', w / 2, h * 0.52, h * 0.1, '#111', 900, 'center', w - 40);
      c.fillStyle = '#e5e7eb'; c.fillRect(20, h * 0.78, w - 40, 3);
      txt(c, '👍 1', 30, h * 0.88, h * 0.05, '#3b5ba9', 800);
      txt(c, (e.n || 0) + ' comentários', w - 30, h * 0.88, h * 0.055, e.n > 20 ? '#e8352b' : '#4b5563', 900, 'right');
    };
    T.inbox = (c, w, h, e) => {
      c.fillStyle = '#e9efe9'; c.fillRect(0, 0, w, h);
      rr(c, 0, 0, w, h * 0.09, 0, '#1f7a5a'); txt(c, 'Conversas', 24, h * 0.045, h * 0.04, '#fff', 800);
      const n = Math.min(9, e.n || 0);
      for (let i = 0; i < n; i++) {
        const y = h * (0.11 + i * 0.088);
        // dono: a 1ª conversa é a do Rodrigo, verde e lida (a única personalizada)
        if (e.destaque && i === 0) {
          rr(c, w * 0.04, y, w * 0.92, h * 0.076, 14, '#d9fdd3'); c.strokeStyle = '#00bc7b'; c.lineWidth = 6; c.beginPath(); c.roundRect(w * 0.04, y, w * 0.92, h * 0.076, 14); c.stroke();
          c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.12, y + h * 0.038, h * 0.026, 0, 7); c.fill();
          txt(c, CFG.nome + ' · Web designer', w * 0.2, y + h * 0.022, h * 0.022, '#111', 900, 'left', w * 0.6);
          txt(c, 'Oi! Vi que o ' + CFG.analise.nome + '...', w * 0.2, y + h * 0.054, h * 0.024, '#1f7a44', 800, 'left', w * 0.58);
          txt(c, '✓✓ Lida', w * 0.93, y + h * 0.054, h * 0.024, '#1067f8', 900, 'right');
          continue;
        }
        rr(c, w * 0.04, y, w * 0.92, h * 0.076, 14, '#ffffff');
        c.fillStyle = ['#9aa0a6', '#c98d5e', '#8a4fd8', '#3fb8ff', '#f39a1e'][i % 5]; c.beginPath(); c.arc(w * 0.12, y + h * 0.038, h * 0.026, 0, 7); c.fill();
        txt(c, '(19) 9' + (8100 + i * 377) + '-' + (2200 + i * 913), w * 0.2, y + h * 0.022, h * 0.022, '#111', 800, 'left', w * 0.6);
        txt(c, 'Oi, faço sites!', w * 0.2, y + h * 0.054, h * 0.026, '#4b5563', 700, 'left', w * 0.6);
        txt(c, '✓✓', w * 0.9, y + h * 0.054, h * 0.026, '#9aa0a6', 900, 'right');
      }
      if (n >= 9) { rr(c, w * 0.2, h * 0.9, w * 0.6, h * 0.075, 30, '#e8352b'); txt(c, '+ 90 iguais', w / 2, h * 0.937, h * 0.04, '#fff', 900, 'center'); }
    };
    // Batalha: o post da dona da floricultura (genérico, sem a marca de nenhuma rede) e o celular dela no fim
    T.postB = (c, w, h, e) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      rr(c, 0, 0, w, h * 0.13, 0, '#3b5ba9'); txt(c, 'Grupo: Empreendedores de BH', 24, h * 0.065, h * 0.05, '#fff', 800, 'left', w - 48);
      c.fillStyle = '#2f9a57'; c.beginPath(); c.arc(70, h * 0.24, h * 0.07, 0, 7); c.fill(); txt(c, 'L', 70, h * 0.245, h * 0.08, '#fff', 900, 'center');
      txt(c, 'Lu · Floricultura Ipê', 130, h * 0.21, h * 0.045, '#111', 800); txt(c, 'agora mesmo', 130, h * 0.27, h * 0.035, '#6b7280', 700);
      txt(c, 'Alguém faz site?', w / 2, h * 0.52, h * 0.14, '#111', 900, 'center', w - 40);
      c.fillStyle = '#e5e7eb'; c.fillRect(20, h * 0.78, w - 40, 3);
      txt(c, '👍 2', 30, h * 0.88, h * 0.05, '#3b5ba9', 800);
      txt(c, (e.n || 0) + ' comentários', w - 30, h * 0.88, h * 0.07, '#e8352b', 900, 'right');
    };
    T.lidas = (c, w, h, e) => {
      c.fillStyle = '#e9efe9'; c.fillRect(0, 0, w, h);
      rr(c, 0, 0, w, h * 0.09, 0, '#2f9a57'); txt(c, 'Floricultura Ipê', 24, h * 0.045, h * 0.04, '#fff', 800, 'left', w - 48);
      // a mensagem do Caio, verde e lida (aparece em "mensagem")
      if (e.dele) {
        const y = h * 0.13;
        rr(c, w * 0.04, y, w * 0.92, h * 0.2, 18, '#d9fdd3'); c.strokeStyle = '#00bc7b'; c.lineWidth = 8; c.beginPath(); c.roundRect(w * 0.04, y, w * 0.92, h * 0.2, 18); c.stroke();
        c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.14, y + h * 0.06, h * 0.035, 0, 7); c.fill(); txt(c, 'C', w * 0.14, y + h * 0.062, h * 0.04, '#fff', 900, 'center');
        txt(c, CFG.nome + ' · Web designer', w * 0.24, y + h * 0.05, h * 0.03, '#111', 900, 'left', w * 0.68);
        txt(c, 'Oi! Vi que a Floricultura Ipê', w * 0.08, y + h * 0.11, h * 0.03, '#1f7a44', 800, 'left', w * 0.84);
        txt(c, 'tem arranjos lindos...', w * 0.08, y + h * 0.15, h * 0.03, '#1f7a44', 800, 'left', w * 0.84);
        txt(c, '✓✓ Lida', w * 0.92, y + h * 0.05, h * 0.03, '#1067f8', 900, 'right');
      }
      // o post dela no grupo: 300 comentários, nenhum lido
      const y2 = h * 0.4;
      rr(c, w * 0.04, y2, w * 0.92, h * 0.44, 18, '#ffffff');
      txt(c, 'Seu post no grupo:', w * 0.08, y2 + h * 0.05, h * 0.028, '#6b7280', 800, 'left', w * 0.84);
      txt(c, 'Alguém faz site?', w / 2, y2 + h * 0.13, h * 0.055, '#111', 900, 'center', w * 0.84);
      txt(c, '💬 300 comentários', w / 2, y2 + h * 0.23, h * 0.045, '#4b5563', 900, 'center', w * 0.84);
      rr(c, w * 0.16, y2 + h * 0.29, w * 0.68, h * 0.1, 40, '#e8352b'); txt(c, 'NÃO LIDOS', w / 2, y2 + h * 0.34, h * 0.045, '#fff', 900, 'center');
    };
    T.funilV = (c, w, h, e) => T.funil(c, w, h, { nome: CFG.funil || 'Clínicas de Campinas', itens: CFG.itens, mover: e.mover });
  }
  // O portfólio no monitor (o site que ele fez pra mostrar)
  function telaPortfolio(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.16, 0, '#1067f8'); txt(c, 'Meu portfólio', w * 0.06, h * 0.08, h * 0.08, '#fff', 900, 'left', w * 0.9);
    [[0.06, 0.24], [0.52, 0.24], [0.06, 0.6], [0.52, 0.6]].forEach(([x, y], i) => { rr(c, w * x, h * y, w * 0.42, h * 0.3, 14, ['#ffd23f', '#3fb8ff', '#ff4d8a', '#2fb54a'][i]); rr(c, w * (x + 0.04), h * (y + 0.05), w * 0.25, h * 0.04, 6, '#ffffffcc'); });
  }
  // O celular: o post do portfólio com 1 curtida (da mãe)
  function celCurtida(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.06, h * 0.08, w * 0.88, h * 0.46, 18, '#3fb8ff'); txt(c, 'Meu portfólio', w / 2, h * 0.31, h * 0.06, '#fff', 900, 'center', w * 0.8);
    txt(c, '❤ 1 curtida', w * 0.08, h * 0.64, h * 0.07, '#e8352b', 900, 'left', w * 0.84);
    if (e.mae) { rr(c, w * 0.06, h * 0.74, w * 0.88, h * 0.16, 16, '#fde7ec'); txt(c, 'Mãe curtiu ❤', w / 2, h * 0.82, h * 0.06, '#b0244a', 900, 'center', w * 0.8); }
  }
  // O celular: a resposta da clínica
  function celResposta(c, w, h, e) {
    c.fillStyle = '#e9efe9'; c.fillRect(0, 0, w, h);
    const R = CFG.resp || { de: 'Clínica Vida', texto: 'Pode vir aqui! 😊', antes: 'Oi! Vi que a clínica...' };
    rr(c, 0, 0, w, h * 0.1, 0, '#1f7a5a'); txt(c, R.de, 20, h * 0.05, h * 0.045, '#fff', 800, 'left', w - 40);
    rr(c, w * 0.22, h * 0.16, w * 0.72, h * 0.14, 16, '#d9fdd3'); txt(c, R.antes || 'Oi! Vi que a clínica...', w * 0.26, h * 0.23, h * 0.035, '#111', 700, 'left', w * 0.64);
    if (e.chegou) { rr(c, w * 0.06, h * 0.4, w * 0.8, h * 0.2, 18, '#ffffff'); txt(c, R.texto, w * 0.1, h * 0.5, h * 0.06, '#111', 900, 'left', w * 0.72); }
  }
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  // O mapa da ferramenta (no monitor, depois de investir): os pinos de quem precisa de site
  function mapa(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Quem precisa de site', w * 0.05, h * 0.066, w * 0.05, '#fff', 800, 'left', w * 0.9);
    const P2 = [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]];
    P2.slice(0, e.n || 0).forEach(([x, y]) => {
      const px = w * x, py = h * y, r = w * 0.04;
      c.fillStyle = '#00bc7b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
    });
  }
  // A tela do computador antes da ferramenta: o Maps (planilha), o grupo (grupo) ou a conversa (canhão)
  function telaAntes(c, w, h) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#fff'; c.lineWidth = w * 0.03; [0.3, 0.6].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.05)); c.stroke(); });
    [[0.2, 0.45], [0.5, 0.6], [0.78, 0.5], [0.35, 0.82]].forEach(([x, y]) => { c.fillStyle = '#ea4335'; c.beginPath(); c.arc(w * x, h * y, w * 0.03, 0, 7); c.fill(); });
  }

  // ---------- A comida que vira moeda ----------
  function fazComida() {
    const g = new THREE.Group();
    if (CFG.comida === 'açaí') {
      const copo = K.malha(new THREE.CylinderGeometry(0.11, 0.08, 0.22, 20), K.mat(0x5b1f6b, { roughness: 0.5 })); copo.position.y = 0.11; g.add(copo);
      const topo = K.malha(new THREE.SphereGeometry(0.11, 16, 10, 0, PI * 2, 0, PI / 2), K.mat(0x7a2c8f, { roughness: 0.7 })); topo.position.y = 0.22; g.add(topo);
      const ban = K.malha(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), K.mat(0xf2e3a0)); ban.position.set(0.04, 0.31, 0.03); g.add(ban);
    } else if (CFG.comida === 'hambúrguer') {
      [[0.13, 0.05, 0xd99a4e, 0.03], [0.135, 0.035, 0x6b3a1e, 0.075], [0.14, 0.012, 0x4caf50, 0.1], [0.13, 0.06, 0xd99a4e, 0.135]].forEach(([r, a, cor, y]) => { const m = K.malha(new THREE.CylinderGeometry(r, r, a, 20), K.mat(cor, { roughness: 0.8 })); m.position.y = y; g.add(m); });
    } else {
      const cx = K.malha(new THREE.SphereGeometry(0.1, 18, 14), K.mat(0xe0962f, { roughness: 0.85 })); cx.scale.set(1, 1.35, 1); cx.position.y = 0.13; g.add(cx);
      const ponta = K.malha(new THREE.ConeGeometry(0.06, 0.12, 14), K.mat(0xe0962f, { roughness: 0.85 })); ponta.position.y = 0.29; g.add(ponta);
    }
    // a plaquinha "1 <COMIDA>"
    const pl = folha(0.42, 0.14, 320, (c, w, h) => { rr(c, 0, 0, w, h, 12, '#5fb86a'); txt(c, '1 ' + CFG.comida.toUpperCase(), w / 2, h / 2 + 2, h * 0.5, '#fff', 900, 'center', w - 20); });
    pl.position.set(0, 0.48, 0); g.add(pl); g.userData.pl = pl;
    return g;
  }

  // ===================================================================================================
  // Peças de cada vídeo (só a do VID entra na cena)
  // ===================================================================================================
  const X = {}; // tudo o que é do vídeo
  function montarCanhao() {
    // O canhão: cano verde inclinado pro alto, apontando pro -z, duas rodas pretas, base e a manivela; o ícone de balão no cano
    const g = new THREE.Group();
    const verde = K.mat(0x25a35a, { roughness: 0.35 }), preto = K.mat(0x1e1f22, { roughness: 0.5 }), cinza = K.mat(0x8a8f96, { metalness: 0.5, roughness: 0.4 });
    const cano = new THREE.Group(); cano.position.set(0, 1.05, 0); cano.rotation.x = 0.55; g.add(cano);
    const tubo = K.malha(new THREE.CylinderGeometry(0.42, 0.55, 3.0, 28).rotateX(-PI / 2), verde); tubo.position.z = -0.9; cano.add(tubo);
    const boca = K.malha(new THREE.TorusGeometry(0.44, 0.08, 12, 28), preto); boca.position.z = -2.4; cano.add(boca);
    const icone = folha(0.8, 0.6, 256, (c, w, h) => { rr(c, 10, 10, w - 20, h - 50, 40, '#ffffff'); c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(w * 0.3, h - 42); c.lineTo(w * 0.22, h - 6); c.lineTo(w * 0.48, h - 42); c.fill(); txt(c, 'Oi!', w / 2, h * 0.42, h * 0.32, '#25a35a', 900, 'center'); });
    icone.position.set(0, 0.5, -0.8); icone.rotation.x = -PI / 2 + 0.02; cano.add(icone);
    [-1, 1].forEach((l) => { const r = K.malha(new THREE.CylinderGeometry(0.62, 0.62, 0.18, 26).rotateZ(PI / 2), preto); r.position.set(l * 0.72, 0.62, 0.05); g.add(r); const c2 = K.malha(new THREE.CylinderGeometry(0.16, 0.16, 0.22, 14).rotateZ(PI / 2), cinza); c2.position.copy(r.position); g.add(c2); });
    const base = K.malha(new THREE.BoxGeometry(1.25, 0.32, 1.6), K.mat(0x8a5a2b, { roughness: 0.7 })); base.position.set(0, 0.55, 0.3); g.add(base);
    // a plataforma de trás, onde o Bruno fica em pé, e a manivela
    const plat = K.malha(new THREE.BoxGeometry(1.1, 0.5, 0.8), K.mat(0x6b4421, { roughness: 0.8 })); plat.position.set(0, 0.25, 1.35); g.add(plat);
    const manG = new THREE.Group(); manG.position.set(0.68, 1.05, 0.75); g.add(manG);
    const eixo = K.malha(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8).rotateZ(PI / 2), cinza); manG.add(eixo);
    const braco = K.malha(new THREE.BoxGeometry(0.05, 0.38, 0.05), cinza); braco.position.set(0.15, 0.17, 0); manG.add(braco);
    X.canhao = g; X.cano = cano; X.manivela = manG;
    guarda(g, 'canhao', [0.25, 0, CZ - 1.2]);
    X.PLAT = [0.25, 0.5, CZ + 0.15];
    // Os balões de mensagem "Oi, faço sites!" (mesma textura pra todos)
    const tex = canvasTex(384, 240, (c, w, h) => {
      rr(c, 6, 6, w - 12, h - 60, 46, '#ffffff'); c.strokeStyle = '#25d366'; c.lineWidth = 10; c.beginPath(); c.roundRect(6, 6, w - 12, h - 60, 46); c.stroke();
      c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(w * 0.24, h - 58); c.lineTo(w * 0.16, h - 8); c.lineTo(w * 0.42, h - 58); c.fill();
      txt(c, 'Oi, faço sites!', w / 2, (h - 54) / 2 + 6, 40, '#111', 900, 'center', w - 40);
    });
    X.matBalao = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    X.baloesG = new THREE.Group(); guarda(X.baloesG, 'baloes', [0, 0, 0]);
    X.baloes = [];
    const r = K.rand(21);
    for (let i = 0; i < 24; i++) {
      const b = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.47), X.matBalao);
      const lado = i % 2 ? 1 : -1;
      b.userData.alvo = [lado * 5.85, 3.2 + r() * 6, CZ - 4 - r() * 22];
      b.userData.fase = i * 0.27;
      X.baloesG.add(b); X.baloes.push(b);
    }
    X.volta = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.63), X.matBalao); guarda(X.volta, null);
    // A loja que acabou de fazer site novo e o banco (placas em poste, de frente pra +z)
    X.lojaNova = placaPoste('SITE NOVO!', '#f5c518', '#1e1f22'); guarda(X.lojaNova, 'loja_nova', [-4.3, 0, 2.2]);
    X.banco = placaPoste('$ BANCO', '#1b2a4a'); guarda(X.banco, 'banco', [4.3, 0, 0.6]);
    X.donaLoja = K.personagem('dona', { cores: { blazer: 0xe8794a } }); K.semNome(X.donaLoja.g);
    X.seguranca = K.personagem('dono', { cores: { terno: 0x1e1f22 } }); K.semNome(X.seguranca.g);
    // O contador de enviadas, o celular e o alvo
    X.alvo = new THREE.Group();
    [[1.0, 0xe8352b], [0.78, 0xffffff], [0.56, 0xe8352b], [0.34, 0xffffff], [0.14, 0x2fb54a]].forEach(([rad, cor], i) => { const d = K.malha(new THREE.CylinderGeometry(rad, rad, 0.06, 36).rotateX(PI / 2), K.mat(cor, { roughness: 0.5 })); d.position.z = i * 0.012; X.alvo.add(d); });
    const pe = K.malha(new THREE.BoxGeometry(0.12, 1.2, 0.12), K.mat(0x6b4421)); pe.position.set(0, -1.3, -0.05); X.alvo.add(pe);
    guarda(X.alvo, 'alvo', [0.25, 1.9, CZ - 3.2]);
    X.murchos = new THREE.Group(); guarda(X.murchos, null);
    for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.47), X.matBalao); b.rotation.set(-PI / 2, 0, i); b.position.set(-1.3 + (i % 3) * 1.1 + Math.sin(i) * 0.3, 0.02, CZ - 2.5 + Math.floor(i / 3) * 1.4); b.scale.set(0.9, 0.55, 1); X.murchos.add(b); }
  }

  function montarPlanilha() {
    // A mesinha escolar no calçadão (de frente pra câmera, +z), o banquinho e o diploma
    const mes = new THREE.Group();
    const mad = K.mat(0xc89a6a, { roughness: 0.7 }), ferro = K.mat(0x3a3f46, { roughness: 0.5 });
    const tampo = K.malha(new THREE.BoxGeometry(1.0, 0.05, 0.6), mad); tampo.position.y = 0.74; mes.add(tampo);
    [[-0.45, -0.25], [0.45, -0.25], [-0.45, 0.25], [0.45, 0.25]].forEach(([x, z]) => { const p = K.malha(new THREE.BoxGeometry(0.04, 0.72, 0.04), ferro); p.position.set(x, 0.36, z); mes.add(p); });
    const banq = K.malha(new THREE.BoxGeometry(0.42, 0.45, 0.4), mad); banq.position.set(0, 0.225, -0.62); mes.add(banq);
    const dip = folha(0.36, 0.26, 256, (c, w, h) => { rr(c, 0, 0, w, h, 8, '#fff7dc'); c.strokeStyle = '#c9a227'; c.lineWidth = 8; c.strokeRect(8, 8, w - 16, h - 16); txt(c, 'Curso de site', w / 2, h * 0.38, h * 0.16, '#5a3d10', 900, 'center'); txt(c, '✓', w / 2, h * 0.7, h * 0.3, '#2fb54a', 900, 'center'); });
    dip.position.set(0.32, 0.92, 0.12); dip.rotation.x = -0.35; mes.add(dip);
    X.MES = [0.3, 0, CZ + 0.45]; X.SENTA = [0.3, 0, CZ - 0.17];
    X.mesinha = mes; guarda(mes, 'mesinha', X.MES);
    X.caneta = new THREE.Group();
    const cc = K.malha(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 12), K.mat(0x1067f8, { roughness: 0.4 })); X.caneta.add(cc);
    const pt = K.malha(new THREE.ConeGeometry(0.025, 0.07, 12).rotateX(PI), K.mat(0xd8dde3)); pt.position.y = -0.22; X.caneta.add(pt);
    guarda(X.caneta, 'caneta');
    // A planilha de papel infinita: pedacinhos em fila por um caminho (da mesinha, pelo chão, enrolando a árvore,
    // embaixo do carro, até lá longe no fim da rua e voltando pelo outro lado até as costas dele)
    const tex = canvasTex(256, 160, (c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#b9c3cf'; c.lineWidth = 3; [0, 0.34, 0.67, 1].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * x, h); c.stroke(); });
      for (let y = 0; y <= h; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
      c.strokeStyle = '#2a4fb5'; c.lineWidth = 4; [20, 60, 100, 140].forEach((y, i) => { c.beginPath(); c.moveTo(10, y); for (let x = 10; x < w * (0.55 + (i % 2) * 0.3); x += 14) c.lineTo(x, y + Math.sin(x * 0.4 + i) * 4); c.stroke(); });
    });
    X.matPapel = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9, side: THREE.DoubleSide });
    const A = [-2.6, 5];
    const pts = [[0.05, 0.76, CZ + 0.5], [-0.25, 0.4, CZ + 0.9], [-0.6, 0.06, CZ + 1.1], [-1.4, 0.06, CZ + 0.2], [-2.0, 0.06, 6.2]];
    void A;
    pts.push([-1.6, 0.06, 4.4], [-1.0, 0.06, 3.0], [-0.9, 0.06, 1.2], [-0.95, 0.06, -1.0], [-0.9, 0.06, -12], [-0.6, 0.06, -26], [0.4, 0.06, -28], [1.3, 0.06, -25], [1.4, 0.06, -8], [1.3, 0.06, 2], [1.1, 0.06, 6.4], [0.75, 0.06, CZ - 1.3], [0.45, 0.7, CZ - 0.55]);
    X.curva = new THREE.CatmullRomCurve3(pts.map((p) => V(...p)));
    X.papelG = new THREE.Group(); guarda(X.papelG, 'planilha', [0, 0, 0]);
    X.pedacos = [];
    const N = 260, L = X.curva.getLength();
    for (let i = 0; i < N; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, (L / N) * 1.08), X.matPapel);
      const u = i / (N - 1), p = X.curva.getPointAt(u), t = X.curva.getTangentAt(u);
      m.position.copy(p);
      // deitado no chão, alinhado com o caminho; quando sobe (mesa, árvore), fica em pé
      const up = Math.abs(t.y) > 0.35 || p.y > 0.12 ? V(t.z, 0, -t.x).normalize() : V(0, 1, 0);
      const fr = t.clone().normalize(), dir = new THREE.Vector3().crossVectors(up, fr).normalize(), up2 = new THREE.Vector3().crossVectors(fr, dir);
      m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(dir, fr, up2));
      m.userData.p0 = m.position.clone(); m.userData.q0 = m.quaternion.clone(); m.userData.u = u;
      X.papelG.add(m); X.pedacos.push(m);
    }
    // O carro estacionado em cima da planilha
    X.carro = K.carro(0xe8352b); X.carro.scale.setScalar(1.2); X.carro.rotation.y = PI / 2; guarda(X.carro, 'carro', [-0.9, 0, 1.2]);
    // As colunas e o calendário acima da mesinha; as marcas ✓/✗ das linhas
    X.colunas = K.painelMappoa(1.7, 0.36, { px: 700, borda: '#1f7a44' }); guarda(X.colunas, 'colunas', [0.3, 2.75, CZ + 0.1]);
    X.cal = K.painelMappoa(0.6, 0.6, { px: 300, borda: '#e8352b' }); guarda(X.cal, 'calendario', [1.35, 2.2, CZ + 0.2]);
    // A recepcionista que não atende, com o telefone tocando no balcãozinho
    X.secretaria = K.personagem('secretaria'); K.semNome(X.secretaria.g); K.nomear('secretaria', X.secretaria.g);
    X.balcao = new THREE.Group();
    const bc = K.malha(new THREE.BoxGeometry(0.9, 1.0, 0.5), K.mat(0xf0e6d6, { roughness: 0.7 })); bc.position.y = 0.5; X.balcao.add(bc);
    X.fone = new THREE.Group(); const fb = K.malha(new THREE.BoxGeometry(0.26, 0.08, 0.2), K.mat(0xe8352b)); X.fone.add(fb); const fh = K.malha(new THREE.CapsuleGeometry(0.03, 0.2, 4, 8).rotateZ(PI / 2), K.mat(0xe8352b)); fh.position.y = 0.07; X.fone.add(fh);
    X.fone.position.set(0.2, 1.05, 0.05); X.balcao.add(X.fone);
    guarda(X.balcao, 'telefone', [-3.9, 0, 4.0]);
    X.tesoura = K.m3d('tesoura'); guarda(X.tesoura, 'tesoura', null, 2.6);
    X.planQ = K.m3d('planilha_gigante', { linhas: ['Clínica Sol', 'Estética Lumi', 'Spa Bem', 'Bella Pele', '', '', '', '', ''], colunas: ['Nome', 'Telefone', 'Cidade', 'Site'] });
    guarda(X.planQ, 'planilha_q', PLAN_Q);
    X.pinosMaps = [];
    for (let i = 0; i < 4; i++) X.pinosMaps.push(guarda(K.pinoMappoa('#ea4335', 0.35), null));
  }

  function montarGrupo() {
    // O post gigante deitado no meio do calçadão, e o mesmo post em pé acima do monitor
    X.POST = [0.25, 0.06, CZ - 3.6];
    X.postP = K.painelMappoa(3.0, 2.0, { px: 900, borda: '#cfd6e4' }); X.postP.g.rotation.x = -PI / 2; guarda(X.postP, 'post', X.POST);
    X.postQ = K.painelMappoa(1.5, 1.0, { px: 800, borda: '#cfd6e4' }); guarda(X.postQ, 'post_q', [-0.5, 2.2, -1.0]);
    X.postNovo = K.painelMappoa(3.0, 2.0, { px: 900, borda: '#cfd6e4' }); X.postNovo.g.rotation.x = -PI / 2; guarda(X.postNovo, 'post_novo', [0.25, 0.06, -9]);
    // A multidão de web designers, cada um com um notebook aberto
    const PELES = [0xe6b48a, 0xc98d5e, 0x8a5a3a, 0xf1c9a5, 0xa86b45], CAMISAS = [0xf39a1e, 0x2fb54a, 0x8a4fd8, 0xe8352b, 0x3fb8ff, 0xffd23f, 0xff4d8a, 0x6b7280], CABELOS = [0x1a1a1a, 0x5a3418, 0x7a4a22, 0xd9a520, 0x2a1a10];
    const r = K.rand(5);
    for (let i = 0; i < 18; i++) {
      const op = i % 3 === 2 ? { tipo: 'menina', cores: { vestido: CAMISAS[(i * 3) % 8], cabelo: CABELOS[i % 5], pele: PELES[(i * 2) % 5] } }
        : i % 4 === 1 ? { roupa: 'moletom', cores: { moletom: CAMISAS[(i * 5) % 8], calca: 0x2a2f3a, cabelo: CABELOS[(i + 2) % 5], pele: PELES[i % 5] } }
          : { roupa: 'camiseta', cores: { camiseta: CAMISAS[(i * 5 + 1) % 8], bermuda: 0x3a4250, cabelo: CABELOS[(i + 1) % 5], pele: PELES[(i + 3) % 5] } };
      const b = K.boneco(op); K.semNome(b.g);
      const nb = new THREE.Group();
      const base = K.malha(new THREE.BoxGeometry(0.34, 0.02, 0.24), K.mat(0x9aa0a6, { metalness: 0.4 })); nb.add(base);
      const tela = K.malha(new THREE.BoxGeometry(0.34, 0.22, 0.015), K.mat(0x2a2f3a)); tela.position.set(0, 0.11, -0.12); tela.rotation.x = -0.25; nb.add(tela);
      nb.position.set(0, 0.95, 0.3); b.g.add(nb);
      // de onde cada um vem: metade do fundo da rua (-z), metade de trás da câmera (+z); onde fica em volta do post
      // todos vêm do fundo da rua (-z), correndo na direção do post e de quem chega pela câmera
      const de = [-1.8 + r() * 3.8, 0, -10 - r() * 14];
      const a = (i / 18) * PI * 2, rad = 0.6 + (i % 3) * 0.5;
      const em = [X.POST[0] + Math.cos(a) * rad * 1.3, 0, X.POST[2] + Math.sin(a) * rad * 0.9];
      multidao.push({ b, de, em, fase: i * 1.37, vel: 0.85 + r() * 0.3 });
    }
    K.nomear('multidao', multidao[4].b.g);
    // A dona do bazar, o sobrinho e a placa do Bazar da Néia
    X.dona = K.personagem('dona', { cores: { blazer: 0xe04f8a, vestido: 0xf5d0dc } }); K.semNome(X.dona.g); K.nomear('dona', X.dona.g);
    X.sobrinho = K.boneco({ roupa: 'moletom', cores: { moletom: 0xf39a1e, punho: 0xc77a10, calca: 0x2a2f3a, cabelo: 0x1a1a1a, pele: 0xd9a07a } }); K.semNome(X.sobrinho.g); K.nomear('sobrinho', X.sobrinho.g);
    X.bazar = placaPoste('BAZAR DA NÉIA', '#e04f8a'); guarda(X.bazar, 'loja', [-4.2, 0, 3.6]);
    X.cal = K.painelMappoa(0.7, 0.7, { px: 300, borda: '#e8352b' }); guarda(X.cal, 'calendario', [-1.2, 4.2, CZ - 6]);
    // Os balões de comentário (no quarto, em volta do post)
    const frases = ['Faço!', 'Chama no privado', 'Eu!', 'Me chama', 'Faço por R$ 100', 'Eu faço!', 'Inbox', 'Tenho portfólio'];
    X.coment = [];
    X.comentG = new THREE.Group(); guarda(X.comentG, 'comentarios', [0, 0, 0]);
    const rr2 = K.rand(9);
    for (let i = 0; i < 26; i++) {
      const s = frases[i % frases.length];
      const m = folha(0.62, 0.3, 256, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 30, '#f0f2f5'); c.strokeStyle = '#cfd6e4'; c.lineWidth = 6; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 30); c.stroke(); txt(c, s, w / 2, h / 2 + 2, h * 0.32, '#111', 800, 'center', w - 24); });
      m.userData.pos = [-0.5 + (rr2() - 0.5) * 2.8, 1.35 + rr2() * 1.9, -0.95 + rr2() * 0.5];
      m.userData.t = i * 0.075;
      X.comentG.add(m); X.coment.push(m);
    }
    X.grande = folha(1.0, 0.45, 400, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 40, '#fff3c4'); c.strokeStyle = '#e8352b'; c.lineWidth = 10; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 40); c.stroke(); txt(c, 'Faço por R$ 100', w / 2, h / 2 + 3, h * 0.3, '#e8352b', 900, 'center', w - 30); });
    guarda(X.grande, null);
    X.plaq5 = folha(0.32, 0.32, 200, (c, w, h) => { rr(c, 0, 0, w, h, 30, '#9aa0a6'); txt(c, '5º', w / 2, h / 2 + 4, h * 0.55, '#fff', 900, 'center'); });
    guarda(X.plaq5, null);
    // Os pinos verdes "sem site" nas lojas do lado direito (o lado calmo da rua)
    X.pinosR = [];
    [11.0, 8.2, 5.4, 2.6, 0.4, -3.0].forEach((z) => X.pinosR.push(guarda(K.pinoMappoa('#00bc7b', 0.9), 'pinos', [5.2, 3.3, z])));
    // O dono da Ótica Visão Clara (o doutor de óculos) e o óculos gigante na placa
    X.oculos = new THREE.Group();
    [-1, 1].forEach((l) => { const a = K.malha(new THREE.TorusGeometry(0.32, 0.06, 10, 28), K.mat(0x1e1f22)); a.position.x = l * 0.42; X.oculos.add(a); });
    const ponte = K.malha(new THREE.BoxGeometry(0.22, 0.06, 0.06), K.mat(0x1e1f22)); X.oculos.add(ponte);
    // a ótica de verdade do calçadão (lado direito): o aperto de mão fica no meio do calçadão, na frente dela
    const ot = (Cr.lojas || []).filter((l) => l.id === 'otica').sort((a, b) => Math.abs(a.porta[2] - 5) - Math.abs(b.porta[2] - 5))[0];
    const pz = ot ? ot.porta[2] : 5.1, px = ot ? ot.porta[0] : 5.6, ld = ot ? ot.lado : 1;
    VENDA.otica = { dono: [ld * 1.9, 0, pz], heroi: [ld * 0.85, 0, pz + 0.25], de: [ld * 0.6, 0, pz + 9] };
    if (ot) K.nomear('loja_otica', ot.g);
    guarda(X.oculos, 'otica', [px - ld * 0.6, 3.9, pz]);
    X.oculos.rotation.y = ld > 0 ? -PI / 2 : PI / 2; K.lugar(X.oculos);
  }

  function montarPlaca() {
    // A placa de papelão gigante "FAÇO SITE" num cabo de madeira (o cabo nasce na mão dele; o papelão fica bem acima da cabeça)
    const g = new THREE.Group();
    const cabo = K.malha(new THREE.BoxGeometry(0.07, 1.7, 0.07), K.mat(0x8a5a2b, { roughness: 0.8 })); cabo.position.y = 0.85; g.add(cabo);
    const papelao = folha(2.6, 1.5, 900, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#c8995a'); c.fillStyle = '#b8874a'; for (let i = 0; i < 9; i++) c.fillRect(0, (h / 9) * i + 6, w, 3);
      c.strokeStyle = '#7a5a2a'; c.lineWidth = 10; c.beginPath(); c.roundRect(10, 10, w - 20, h - 20, 14); c.stroke();
      txt(c, 'FAÇO SITE', w / 2, h * 0.42, h * 0.3, '#1e1f22', 900, 'center', w - 60);
      txt(c, 'me chama!', w / 2, h * 0.75, h * 0.15, '#e8352b', 900, 'center', w - 60);
    });
    papelao.position.y = 2.35; g.add(papelao);
    X.placa = g; guarda(g, 'placa', [0, 0, 0]);
    X.PL = [0.4, 0, CZ];
    // O copinho no chão do lado dele e a moeda
    X.copo = K.malha(new THREE.CylinderGeometry(0.11, 0.08, 0.2, 18), K.mat(0xf4f1ea, { roughness: 0.6 })); guarda(X.copo, 'copo', [1.0, 0.1, CZ + 0.35]);
    X.moedaR = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(X.moedaR, 'moeda');
    // Gente passando pela calçada, sem olhar pra ele (vem do fundo da rua, -z, nas faixas x -1,1 e 1,9)
    const CAMISAS = [0xf39a1e, 0x2fb54a, 0x8a4fd8, 0xe8352b, 0x3fb8ff], PELES = [0xe6b48a, 0xc98d5e, 0x8a5a3a, 0xf1c9a5, 0xa86b45];
    X.gente = [];
    for (let i = 0; i < 5; i++) {
      const b = i % 2 ? K.boneco({ tipo: 'menina', cores: { vestido: CAMISAS[i], pele: PELES[i], cabelo: 0x2a1a10 } }) : K.boneco({ roupa: 'camiseta', cores: { camiseta: CAMISAS[i], bermuda: 0x3a4250, pele: PELES[i], cabelo: 0x1a1a1a } });
      K.semNome(b.g);
      const x = i % 2 ? -1.1 : 1.9;
      X.gente.push({ b, de: [x, 0, CZ - 12], ate: [x, 0, CZ + 0.8], fase: i * 1.3 });
    }
    K.nomear('gente', X.gente[0].b.g);
    // O calendário das semanas (no alto, à direita dele)
    X.cal = K.painelMappoa(0.8, 0.8, { px: 300, borda: '#e8352b' }); guarda(X.cal, 'calendario', [-1.3, 2.6, CZ + 0.4]);
    // No quarto: as abas do Maps empilhando do monitor até o teto e o relógio de parede
    X.abas = [];
    X.abasG = new THREE.Group(); guarda(X.abasG, 'abas', [0, 0, 0]);
    const texAba = canvasTex(400, 130, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 20, '#ffffff'); c.strokeStyle = '#cfd6e4'; c.lineWidth = 6; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 20); c.stroke(); c.fillStyle = '#ea4335'; c.beginPath(); c.arc(50, h / 2, 22, 0, 7); c.fill(); txt(c, 'Google Maps', 90, h / 2 + 2, 40, '#111', 800, 'left', w - 120); txt(c, '✕', w - 34, h / 2 + 2, 34, '#9aa0a6', 800, 'center'); });
    const matAba = new THREE.MeshBasicMaterial({ map: texAba, side: THREE.DoubleSide });
    for (let i = 0; i < 22; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.29), matAba);
      m.userData.pos = [-0.5 + Math.sin(i * 1.7) * 0.25, 1.75 + i * 0.13, -1.35 + (i % 2) * 0.02];
      m.userData.rz = Math.sin(i * 2.3) * 0.12;
      X.abasG.add(m); X.abas.push(m);
    }
    X.relogio = K.painelMappoa(0.7, 0.42, { px: 360, borda: '#1e1f22' }); guarda(X.relogio, 'relogio', [0.75, 2.35, -1.45]);
    // A placa encostada no quarto (frase 6: ela cai quando ele decide)
    X.placaQ = new THREE.Group();
    const pq = folha(1.3, 0.75, 500, (c, w, h) => { rr(c, 0, 0, w, h, 12, '#c8995a'); txt(c, 'FAÇO SITE', w / 2, h * 0.45, h * 0.3, '#1e1f22', 900, 'center', w - 40); txt(c, 'me chama!', w / 2, h * 0.78, h * 0.15, '#e8352b', 900, 'center', w - 40); });
    pq.position.y = 0.4; X.placaQ.add(pq);
    guarda(X.placaQ, 'placa_q', [1.55, 0, -0.95]);
    // Os pinos verdes nas lojas da rua (as que não têm site), perto da cena
    X.pinos = [];
    (Cr.lojas || []).filter((l) => Math.abs(l.placa[2] - CZ) < 10).slice(0, 6).forEach((l) => X.pinos.push(guarda(K.pinoMappoa('#00bc7b', 0.9), 'pinos', [l.placa[0] * 0.92, l.placa[1] + 1.2, l.placa[2]])));
  }

  // ---------- Sobrinho de 14 anos ----------
  const LIXO = [1.35, 0, -0.55];
  // o skate: tábua vermelha com a lixa preta e 4 rodinhas amarelas (comprido no z)
  function fazSkate() {
    const g = new THREE.Group();
    const tabua = K.malha(new THREE.BoxGeometry(0.26, 0.035, 0.82), K.mat(0xe8352b, { roughness: 0.5 })); tabua.position.y = 0.11; g.add(tabua);
    const lixa = K.malha(new THREE.BoxGeometry(0.24, 0.006, 0.72), K.mat(0x1e1f22, { roughness: 0.9 })); lixa.position.y = 0.13; g.add(lixa);
    [[-0.1, 0.27], [0.1, 0.27], [-0.1, -0.27], [0.1, -0.27]].forEach(([x, z]) => { const r = K.malha(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 14).rotateZ(PI / 2), K.mat(0xf5c518, { roughness: 0.4 })); r.position.set(x, 0.05, z); g.add(r); });
    return g;
  }
  // um menino de moletom (14 anos: um pouco menor) em cima de um skate preso nos pés dele
  function fazSobrinho(cor, pele, cabelo) {
    const b = K.boneco({ roupa: 'moletom', cores: { moletom: cor, punho: 0x2a2f3a, calca: 0x2a2f3a, cabelo, pele } });
    K.semNome(b.g); b.g.scale.setScalar(0.88);
    const sk = fazSkate(); sk.position.y = -0.13 / 0.88; sk.scale.setScalar(1 / 0.88); b.g.add(sk);
    b.skate = sk;
    return b;
  }
  // o menino no skate em pos, andando pro rumo (olhar = um ponto pra onde ele vai)
  function noSkate(b, pos, olhar) { b.g.visible = true; b.colocar(pos, olhar); b.g.position.y = 0.13; }
  function montarSobrinho() {
    // O sobrinho (laranja) e os outros sobrinhos das lojas
    X.sob = fazSobrinho(0xf39a1e, 0xd9a07a, 0x1a1a1a); K.nomear('sobrinho', X.sob.g); X.sobrinho = X.sob;
    X.sobs = [[0x2fb54a, 0xe6b48a, 0x7a4a22], [0x8a4fd8, 0x8a5a3a, 0x1a1a1a], [0x3fb8ff, 0xf1c9a5, 0xd9a520]].map(([c, p, h]) => ({ b: fazSobrinho(c, p, h) }));
    K.nomear('sobrinhos', X.sobs[0].b.g);
    // as lojas onde aparece um sobrinho: uma da esquerda e uma da direita perto da cena
    const perto = (lado, z) => (Cr.lojas || []).filter((l) => l.lado === lado && l.porta[2] < CZ + 1 && l.porta[2] > CZ - 12).sort((a, b) => Math.abs(a.porta[2] - z) - Math.abs(b.porta[2] - z))[0];
    X.lojaE = perto(-1, CZ - 3); X.lojaD = perto(1, CZ - 5);
    // o skate sozinho (o sobrinho sumiu)
    X.skateSo = fazSkate(); guarda(X.skateSo, 'skate');
    // o contrato (folha com a assinatura)
    X.contrato = folha(0.3, 0.4, 256, (c, w, h) => {
      rr(c, 0, 0, w, h, 10, '#ffffff'); txt(c, 'CONTRATO', w / 2, h * 0.13, h * 0.09, '#1e1f22', 900, 'center', w - 20);
      c.fillStyle = '#cfd6e4'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.12, h * (0.26 + i * 0.08), w * (i % 2 ? 0.62 : 0.76), h * 0.025);
      c.strokeStyle = '#1067f8'; c.lineWidth = 5; c.beginPath(); c.moveTo(w * 0.2, h * 0.86); c.bezierCurveTo(w * 0.35, h * 0.72, w * 0.45, h * 0.95, w * 0.75, h * 0.8); c.stroke();
    });
    guarda(X.contrato, 'contrato');
    // a escola de inglês do calçadão (placa num poste) e o site dela com o erro 404 (só no fim)
    X.escola = placaPoste('SPEAK UP IDIOMAS', '#1067f8'); guarda(X.escola, 'escola', [-2.3, 0, CZ - 0.6]);
    X.site = K.painelMappoa(1.5, 1.0, { px: 600, borda: '#1e1f22' }); guarda(X.site, 'site', [-0.9, 2.3, CZ - 1.8]);
    // o calendário dos meses (no alto, à esquerda de quem vem andando)
    X.cal = K.painelMappoa(0.8, 0.8, { px: 300, borda: '#e8352b' }); guarda(X.cal, 'calendario', [-1.2, 2.7, CZ + 1.0]);
    // Os pinos vermelhos das lojas com problema (lado esquerdo, perto da cena)
    X.alertas = [];
    (Cr.lojas || []).filter((l) => l.lado === -1 && l.placa[2] < CZ + 2 && l.placa[2] > CZ - 16).slice(0, 4).forEach((l) => X.alertas.push(guarda(K.pinoMappoa('#e8352b', 0.9), 'alertas', [l.placa[0] * 0.92, l.placa[1] + 1.2, l.placa[2]])));
    // No quarto: o orçamento gigante (a folha de cima com o título e a folha comprida que desenrola), o lixo e a bola de papel
    X.cab = folha(0.62, 0.3, 400, (c, w, h) => { rr(c, 0, 0, w, h, 10, '#ffffff'); rr(c, 0, 0, w, h * 0.36, 10, '#1067f8'); txt(c, 'ORÇAMENTO', w / 2, h * 0.19, h * 0.22, '#fff', 900, 'center', w - 20); txt(c, 'Speak Up Idiomas', w / 2, h * 0.62, h * 0.17, '#1e1f22', 800, 'center', w - 20); txt(c, 'tudo explicado ✓', w / 2, h * 0.85, h * 0.13, '#2fb54a', 800, 'center', w - 20); });
    guarda(X.cab, 'orcamento');
    const linhas = (c, w, h) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h); c.fillStyle = '#2fb54a'; c.font = `900 ${h * 0.3}px Montserrat, sans-serif`; c.textBaseline = 'middle'; c.fillText('✓', w * 0.06, h * 0.5); c.fillStyle = '#9aa5b5'; c.fillRect(w * 0.2, h * 0.42, w * 0.5, h * 0.14); c.fillStyle = '#1067f8'; c.fillRect(w * 0.76, h * 0.42, w * 0.16, h * 0.14); };
    X.texV = canvasTex(256, 64, linhas); X.texV.wrapS = X.texV.wrapT = THREE.RepeatWrapping;
    X.texF = X.texV.clone(); X.texF.needsUpdate = true;
    X.orcV = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: X.texV, side: THREE.DoubleSide })); guarda(X.orcV, null);
    X.orcF = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: X.texF, side: THREE.DoubleSide })); guarda(X.orcF, null);
    X.lixo = new THREE.Group();
    const balde = K.malha(new THREE.CylinderGeometry(0.2, 0.16, 0.42, 22, 1, true), K.mat(0x6b7280, { roughness: 0.6, side: THREE.DoubleSide })); balde.position.y = 0.21; X.lixo.add(balde);
    const fundo = K.malha(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 22), K.mat(0x4b5563)); fundo.position.y = 0.01; X.lixo.add(fundo);
    guarda(X.lixo, 'lixo', LIXO);
    X.bola = K.malha(new THREE.IcosahedronGeometry(0.1, 1), K.mat(0xf4f1ea, { roughness: 0.95, flatShading: true })); guarda(X.bola, null);
  }
  // a folha comprida do orçamento: do ponto top desce até o chão e depois corre pelo chão pro +z (k de 0 a 1)
  function folhaOrc(top, k, lf = 1.6) {
    const hv = Math.max(0.01, top[1] - 0.015), L = K.clamp(k) * (hv + lf);
    const a = Math.min(L, hv), b = Math.max(0, L - hv);
    X.orcV.visible = a > 0.01; X.orcV.scale.set(0.56, Math.max(a, 0.001), 1); X.orcV.position.set(top[0], top[1] - a / 2, top[2]); X.orcV.rotation.set(0, 0, 0);
    X.texV.repeat.set(1, Math.max(0.1, a / 0.16)); X.texV.offset.set(0, -a / 0.16);
    X.orcF.visible = b > 0.01; X.orcF.scale.set(0.56, Math.max(b, 0.001), 1); X.orcF.position.set(top[0], 0.015, top[2] + b / 2); X.orcF.rotation.set(-PI / 2, 0, 0);
    X.texF.repeat.set(1, Math.max(0.1, b / 0.16));
  }
  // as telas do quarto: o orçamento no monitor e o "Enviado"
  function telaOrc(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.18, 0, '#1067f8'); txt(c, 'Orçamento · Speak Up', w * 0.05, h * 0.09, h * 0.09, '#fff', 900, 'left', w * 0.9);
    for (let i = 0; i < 5; i++) { txt(c, '✓', w * 0.07, h * (0.3 + i * 0.12), h * 0.07, '#2fb54a', 900); rr(c, w * 0.15, h * (0.27 + i * 0.12), w * (0.5 + (i % 2) * 0.15), h * 0.05, 6, '#cfd6e4'); }
    if (e.enviado) { rr(c, w * 0.15, h * 0.32, w * 0.7, h * 0.36, 22, '#2fb54a'); txt(c, 'Enviado ✓', w / 2, h * 0.5, h * 0.14, '#fff', 900, 'center', w * 0.6); }
  }
  // o celular: a conversa com a escola (a resposta do dono)
  function celSob(c, w, h, e) {
    c.fillStyle = '#e9efe9'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.1, 0, '#1f7a5a'); txt(c, 'Speak Up Idiomas', 20, h * 0.05, h * 0.045, '#fff', 800, 'left', w - 40);
    rr(c, w * 0.22, h * 0.16, w * 0.72, h * 0.14, 16, '#d9fdd3'); txt(c, 'Segue o orçamento 📄', w * 0.26, h * 0.23, h * 0.035, '#111', 700, 'left', w * 0.64);
    if (e.chegou) { rr(c, w * 0.06, h * 0.38, w * 0.86, h * 0.26, 18, '#ffffff'); txt(c, 'Meu sobrinho', w * 0.1, h * 0.46, h * 0.06, '#111', 900, 'left', w * 0.78); txt(c, 'faz de graça 👍', w * 0.1, h * 0.56, h * 0.06, '#111', 900, 'left', w * 0.78); }
  }

  // ---------- Gui (ninguém responde) ----------
  // o balão verde "Oi, faço sites!" com o ✓✓ cinza (o mesmo desenho pro monte do gancho e pros que voam pras lojas)
  const desenhoMsg = (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 26, '#d9fdd3'); c.strokeStyle = '#9fd99a'; c.lineWidth = 5; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 26); c.stroke(); txt(c, 'Oi, faço sites!', w * 0.08, h * 0.5, h * 0.3, '#111', 800, 'left', w * 0.7); txt(c, '✓✓', w * 0.92, h * 0.68, h * 0.24, '#8a9399', 900, 'right'); };
  function montarGui() {
    X.G = [0.4, 0, CZ];
    const texMsg = canvasTex(256, 124, desenhoMsg);
    const matMsg = new THREE.MeshBasicMaterial({ map: texMsg, transparent: true, side: THREE.DoubleSide });
    // O monte de mensagens do gancho: caem do céu e param em volta dele, até a cintura (mais alto atrás e dos lados)
    X.msgs = []; X.msgsG = new THREE.Group(); guarda(X.msgsG, 'mensagens', [0, 0, 0]);
    const r = K.rand(11);
    for (let i = 0; i < 46; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.3), matMsg);
      const a = r() * PI * 2, rad = 0.35 + r() * 1.05;
      const frente = Math.max(0, Math.cos(a)); // a = 0 é o lado da câmera (+z): ali o monte fica baixo, pra não tapar ele
      const alt = Math.max(0.12, (1.15 - rad * 0.55) * (1 - frente * 0.55)) + r() * 0.15;
      m.userData.pos = [X.G[0] + Math.sin(a) * rad * 1.25, alt, X.G[2] + Math.cos(a) * rad];
      m.userData.t = i * 0.032; m.userData.rz = (r() - 0.5) * 0.7; m.userData.x0 = (r() - 0.5) * 2;
      X.msgsG.add(m); X.msgs.push(m);
    }
    // As mensagens que voam do celular pras lojas (frase 4) e as plaquinhas "✓✓ Visto" nas lojas
    X.voa = []; X.voaG = new THREE.Group(); guarda(X.voaG, 'voando', [0, 0, 0]);
    for (let i = 0; i < 12; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.24), matMsg); m.userData.i = i; X.voaG.add(m); X.voa.push(m); }
    X.lojasM = (Cr.lojas || []).filter((l) => Math.abs(l.placa[2] - CZ) < 9).slice(0, 6);
    X.vistos = []; X.vistosG = new THREE.Group(); guarda(X.vistosG, 'vistos', [0, 0, 0]);
    const texV = canvasTex(256, 110, (c, w, h) => { rr(c, 0, 0, w, h, 30, '#1067f8'); txt(c, '✓✓ Visto', w / 2, h / 2 + 3, h * 0.42, '#fff', 900, 'center', w - 20); });
    const matV = new THREE.MeshBasicMaterial({ map: texV, transparent: true, side: THREE.DoubleSide });
    X.lojasM.forEach((l) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.34), matV); m.userData.pos = [l.placa[0] * 0.8, l.placa[1] + 0.9, l.placa[2]]; X.vistosG.add(m); X.vistos.push(m); });
    // Os pinos vermelhos nas lojas da esquerda (as que já tinham site)
    X.alertas = [];
    (Cr.lojas || []).filter((l) => l.lado === -1 && l.placa[2] < CZ + 2 && l.placa[2] > CZ - 16).slice(0, 4).forEach((l) => X.alertas.push(guarda(K.pinoMappoa('#e8352b', 0.9), 'alertas', [l.placa[0] * 0.92, l.placa[1] + 1.2, l.placa[2]])));
    // No quarto: o post dele no grupo, os comentários "Eu também!" e o calendário
    X.postQ = K.painelMappoa(1.5, 1.0, { px: 800, borda: '#cfd6e4' }); guarda(X.postQ, 'post_q', [-0.5, 2.2, -1.0]);
    const frases = CFG.coment || ['Eu também!', 'Também faço!', 'Eu também 😅', 'Faço mais barato', 'Eu também!', 'Me chama também', 'Também!', 'Eu faço também'];
    X.coment = []; X.comentG = new THREE.Group(); guarda(X.comentG, 'comentarios', [0, 0, 0]);
    const r2 = K.rand(9);
    for (let i = 0; i < 26; i++) {
      const s = frases[i % frases.length];
      const m = folha(0.62, 0.3, 256, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 30, '#f0f2f5'); c.strokeStyle = '#cfd6e4'; c.lineWidth = 6; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 30); c.stroke(); txt(c, s, w / 2, h / 2 + 2, h * 0.3, '#111', 800, 'center', w - 24); });
      m.userData.pos = [-0.5 + (r2() - 0.5) * 2.8, 1.35 + r2() * 1.9, -0.95 + r2() * 0.5];
      m.userData.t = i * 0.06;
      X.comentG.add(m); X.coment.push(m);
    }
    X.cal = K.painelMappoa(0.7, 0.7, { px: 300, borda: '#e8352b' }); guarda(X.cal, 'calendario', [0.95, 2.3, -1.45]);
    // Na clínica: o celular do dono em tela grande, do lado dele
    X.inbox = K.painelMappoa(0.95, 1.6, { px: 600, borda: '#1e1f22' }); guarda(X.inbox, 'inbox', [-3.35, 2.05, -1.75]);
  }
  // Dono (caixa-de-entrada): as peças do Gui (balões, post, calendário, vistos, pinos, inbox) + a lixeira e a placa da
  // cafeteria; o inbox vai pro lado do dono, no calçadão
  function montarDono() {
    montarGui();
    X.lixeira = K.m3d('lixeira', { cor: 0x5b6470 }); X.lixeira.scale.setScalar(1.3); guarda(X.lixeira, 'lixeira', LX);
    X.placaCafe = placaPoste('Café Araucária', '#6b3a1e'); guarda(X.placaCafe, 'placa_cafe', [-0.3, 0, CZ - 1.4]);
    X.inbox.g.position.set(1.55, 2.0, CZ + 0.3); K.lugar(X.inbox.g);
  }
  // Batalha (campo-de-batalha): as peças do Gui (post dele, comentários, calendário, vistos, pinos) + o post gigante em
  // pé no meio da rua, os dois exércitos de web designers com notebook de escudo, os balões-flecha, o balão do tiro, a
  // dona da floricultura com a placa e o celular dela em tela grande
  const PB = [0.3, 2.6, CZ - 5.2]; // o meio do post gigante
  const MB = [0.3, 0, CZ + 0.9]; // o Caio no meio da guerra
  const RHB = [-0.45, 0, CZ + 2.9], DNB = [0.8, 0, CZ + 2.7], LIDAS = [1.65, 1.95, CZ + 2.85];
  function montarBatalha() {
    montarGui();
    // o post gigante "Alguém faz site?" num painel com duas pernas (de frente pra +z)
    X.postBG = new THREE.Group();
    [-1.25, 1.25].forEach((dx) => { const p = K.malha(new THREE.CylinderGeometry(0.07, 0.07, 1.6, 10), K.mat(0x3a3f46)); p.position.set(PB[0] + dx, 0.8, PB[2] - 0.05); X.postBG.add(p); });
    guarda(X.postBG, null);
    X.postB = K.painelMappoa(3.2, 2.13, { px: 900, borda: '#cfd6e4' }); guarda(X.postB, 'post', PB);
    // os dois exércitos: 8 de cada lado, em 2 filas, cada um com o notebook de escudo na frente do peito
    const PELES = [0xe6b48a, 0xc98d5e, 0x8a5a3a, 0xf1c9a5, 0xa86b45], CAMISAS = [0xf39a1e, 0x2fb54a, 0x8a4fd8, 0xe8352b, 0x3fb8ff, 0xffd23f, 0xff4d8a, 0x6b7280], CABELOS = [0x1a1a1a, 0x5a3418, 0x7a4a22, 0xd9a520, 0x2a1a10];
    const zs = [CZ - 4.2, CZ - 3.0, CZ - 1.8, CZ - 0.6];
    for (let i = 0; i < 16; i++) {
      const lado = i < 8 ? -1 : 1, j = i % 8;
      const op = i % 3 === 2 ? { tipo: 'menina', cores: { vestido: CAMISAS[(i * 3) % 8], cabelo: CABELOS[i % 5], pele: PELES[(i * 2) % 5] } }
        : i % 4 === 1 ? { roupa: 'moletom', cores: { moletom: CAMISAS[(i * 5) % 8], calca: 0x2a2f3a, cabelo: CABELOS[(i + 2) % 5], pele: PELES[i % 5] } }
          : { roupa: 'camiseta', cores: { camiseta: CAMISAS[(i * 5 + 1) % 8], bermuda: 0x3a4250, cabelo: CABELOS[(i + 1) % 5], pele: PELES[(i + 3) % 5] } };
      const b = K.boneco(op); K.semNome(b.g);
      // o escudo: a tampa do notebook em pé, cinza, com a tela escura virada pro dono
      const esc = new THREE.Group();
      const tampa = K.malha(new THREE.BoxGeometry(0.5, 0.36, 0.03), K.mat(0xb8bec6, { metalness: 0.5, roughness: 0.35 })); esc.add(tampa);
      const logo = K.malha(new THREE.CircleGeometry(0.05, 18), K.mat(0xffffff, { roughness: 0.3 })); logo.position.z = 0.017; esc.add(logo);
      const base = K.malha(new THREE.BoxGeometry(0.5, 0.025, 0.34), K.mat(0x8a9098, { metalness: 0.4 })); base.position.set(0, -0.19, -0.17); esc.add(base);
      esc.position.set(0.05, 1.02, 0.34); esc.rotation.x = -0.08; b.g.add(esc);
      const fila = j % 2, k = Math.floor(j / 2);
      const x = lado < 0 ? (fila ? -1.7 : -0.9) : (fila ? 2.3 : 1.5);
      multidao.push({ b, lado, base: [x, 0, zs[k] + fila * 0.3], fase: i * 1.37 });
    }
    K.nomear('multidao', multidao[2].b.g);
    // os balões-flecha (comentários voando de um lado pro outro)
    const frases = ['Eu faço!', 'Faço por 99!', 'Me chama!', 'Eu!', 'Mais barato!', 'Inbox!', 'Faço já!', 'Chama no privado'];
    X.flechas = []; X.flechasG = new THREE.Group(); guarda(X.flechasG, 'flechas', [0, 0, 0]);
    for (let i = 0; i < 24; i++) {
      const s = frases[i % frases.length], cor = ['#ffffff', '#fff3c4', '#e6f4ff'][i % 3];
      const m = folha(0.55, 0.26, 256, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 30, cor); c.strokeStyle = '#3b5ba9'; c.lineWidth = 6; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 30); c.stroke(); txt(c, s, w / 2, h / 2 + 2, h * 0.32, '#111', 900, 'center', w - 24); });
      m.userData.i = i; X.flechasG.add(m); X.flechas.push(m);
    }
    // o balão que acerta a cara dele
    X.tiro = folha(0.7, 0.33, 400, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 40, '#fff3c4'); c.strokeStyle = '#e8352b'; c.lineWidth = 10; c.beginPath(); c.roundRect(4, 4, w - 8, h - 8, 40); c.stroke(); txt(c, 'Faço por R$ 50!', w / 2, h / 2 + 3, h * 0.3, '#e8352b', 900, 'center', w - 30); });
    guarda(X.tiro, 'tiro');
    // a placa da floricultura e o celular da dona em tela grande
    X.placaFlor = placaPoste('Floricultura Ipê', '#2f9a57'); guarda(X.placaFlor, 'placa_flor', [-1.5, 0, CZ + 1.6]);
    X.lidas = K.painelMappoa(0.95, 1.6, { px: 600, borda: '#1e1f22' }); guarda(X.lidas, 'lidas', LIDAS);
  }
  // Triturador: as peças do Gui (post dele, comentários, calendário, vistos, pinos) + a esteira gigante subindo até a boca
  // do triturador de papel na porta da lavanderia, os balões andando nela, o balão amarelo do Fábio, o confete, o monte
  // de confete, a placa da lavanderia e a mensagem personalizada dele (verde) que a dona tira da esteira
  const TRI = [0.3, 0, CZ - 3.6]; // o triturador (a frente fica em z TRI-0,75... +0,75)
  const EA = [0.3, 0.75, CZ + 4.5], EB = [0.3, 2.45, CZ - 2.95]; // a esteira: do começo (perto da câmera) até a boca
  const BOCA = [0.3, 2.55, CZ - 3.2];
  const RHT = [-0.95, 0, CZ + 3.3], DNT = [1.3, 0, CZ + 3.2];
  const naEsteira = (u, dx = 0, dy = 0) => [EA[0] + (EB[0] - EA[0]) * u + dx, EA[1] + (EB[1] - EA[1]) * u + 0.08 + dy, EA[2] + (EB[2] - EA[2]) * u];
  function montarTriturador() {
    montarGui();
    // o triturador
    const tri = new THREE.Group();
    const corpo = K.malha(new THREE.BoxGeometry(2.2, 2.4, 1.5), K.mat(0x3a3f46, { roughness: 0.6 })); corpo.position.y = 1.2; tri.add(corpo);
    const tampa = K.malha(new THREE.BoxGeometry(2.3, 0.14, 1.6), K.mat(0x5b6470, { metalness: 0.4, roughness: 0.4 })); tampa.position.y = 2.45; tri.add(tampa);
    const fenda = K.malha(new THREE.BoxGeometry(1.75, 0.05, 0.5), K.mat(0x050505)); fenda.position.set(0, 2.53, 0.4); tri.add(fenda);
    X.rolos = [];
    [0.28, 0.52].forEach((z, k) => {
      const r = new THREE.Group(); r.position.set(0, 2.55, z);
      const cil = K.malha(new THREE.CylinderGeometry(0.1, 0.1, 1.6, 14), K.mat(0xb8bec6, { metalness: 0.7, roughness: 0.3 })); cil.rotation.z = PI / 2; r.add(cil);
      for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) { const d = K.malha(new THREE.BoxGeometry(0.06, 0.07, 0.05), K.mat(0xe6e8ec, { metalness: 0.7 })); const a = (j / 6) * PI * 2; d.position.set(-0.72 + i * 0.16, Math.cos(a) * 0.13, Math.sin(a) * 0.13); d.rotation.x = -a; r.add(d); }
      r.userData.lado = k ? -1 : 1; tri.add(r); X.rolos.push(r);
    });
    const rot = folha(1.9, 0.7, 700, (c, w, h) => { rr(c, 0, 0, w, h, 24, '#e8352b'); txt(c, 'CAIXA DE ENTRADA', w / 2, h * 0.42, h * 0.3, '#fff', 900, 'center', w - 40); txt(c, 'Oi, faço sites! → confete', w / 2, h * 0.78, h * 0.15, '#ffe1dd', 800, 'center', w - 40); });
    rot.position.set(0, 0.95, 0.76); tri.add(rot);
    const faixa = folha(2.2, 0.22, 700, (c, w, h) => { c.fillStyle = '#f5c518'; c.fillRect(0, 0, w, h); c.fillStyle = '#111'; for (let x = -h; x < w + h; x += h * 1.4) { c.beginPath(); c.moveTo(x, h); c.lineTo(x + h * 0.7, h); c.lineTo(x + h * 1.4, 0); c.lineTo(x + h * 0.7, 0); c.fill(); } });
    faixa.position.set(0, 1.75, 0.76); tri.add(faixa);
    X.luz = K.malha(new THREE.SphereGeometry(0.12, 14, 10), new THREE.MeshBasicMaterial({ color: 0xff2a1a })); X.luz.position.set(0.95, 2.62, 0.6); tri.add(X.luz);
    X.tri = guarda(tri, 'triturador', TRI);
    // a esteira: a lona com as listras andando, os trilhos e as pernas
    const L = Math.hypot(EB[1] - EA[1], EB[2] - EA[2]);
    const est = new THREE.Group();
    X.lonaTex = canvasTex(128, 128, (c, w, h) => { c.fillStyle = '#1d2024'; c.fillRect(0, 0, w, h); c.fillStyle = '#3a3f46'; c.fillRect(0, h * 0.42, w, h * 0.16); });
    X.lonaTex.wrapS = X.lonaTex.wrapT = THREE.RepeatWrapping; X.lonaTex.repeat.set(1, 14);
    const lona = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, L), new THREE.MeshStandardMaterial({ map: X.lonaTex, roughness: 0.8 })); est.add(lona);
    [-0.55, 0.55].forEach((dx) => { const t = K.malha(new THREE.BoxGeometry(0.08, 0.2, L), K.mat(0x8a9098, { metalness: 0.5 })); t.position.set(dx, 0.05, 0); est.add(t); });
    est.position.set(EA[0], (EA[1] + EB[1]) / 2, (EA[2] + EB[2]) / 2); est.rotation.x = Math.atan2(EB[1] - EA[1], EA[2] - EB[2]);
    const estG = new THREE.Group(); estG.add(est);
    for (let k = 0; k < 6; k++) { const p = naEsteira(0.05 + k * 0.17); [-0.48, 0.48].forEach((dx) => { const h = p[1] - 0.1; const perna = K.malha(new THREE.CylinderGeometry(0.05, 0.05, h, 8), K.mat(0x5b6470)); perna.position.set(p[0] + dx, h / 2, p[2]); estG.add(perna); }); }
    X.est = guarda(estG, 'esteira', [0, 0, 0]);
    // os balões andando na esteira (3 filas)
    const texMsg = canvasTex(256, 124, desenhoMsg);
    const matMsg = new THREE.MeshBasicMaterial({ map: texMsg, transparent: true, side: THREE.DoubleSide });
    X.fila = []; X.filaG = new THREE.Group(); guarda(X.filaG, 'fila', [0, 0, 0]);
    for (let i = 0; i < 54; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.3), matMsg); m.userData.fx = [-0.3, 0, 0.3][i % 3]; m.userData.fy = [0.2, 0.34, 0.26][i % 3]; m.userData.u0 = (Math.floor(i / 3) / 18 + (i % 3) * 0.019) % 1; X.filaG.add(m); X.fila.push(m); }
    // o balão amarelo do Fábio (o genérico do gancho) e a mensagem personalizada dele (o reencontro)
    X.meu = folha(0.75, 0.36, 420, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 36, '#ffe36b'); c.strokeStyle = '#e8352b'; c.lineWidth = 10; c.beginPath(); c.roundRect(5, 5, w - 10, h - 10, 34); c.stroke(); txt(c, 'Oi, faço sites!', w / 2, h * 0.42, h * 0.27, '#111', 900, 'center', w - 30); txt(c, '— Fábio', w / 2, h * 0.75, h * 0.17, '#a3261e', 900, 'center', w - 30); });
    guarda(X.meu, 'meu');
    X.minha = folha(0.85, 0.42, 460, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 36, '#2fb54a'); c.strokeStyle = '#ffd23f'; c.lineWidth = 12; c.beginPath(); c.roundRect(6, 6, w - 12, h - 12, 32); c.stroke(); txt(c, 'Oi! Vi que a', w / 2, h * 0.32, h * 0.2, '#fff', 900, 'center', w - 40); txt(c, 'Lavanderia Bolha...', w / 2, h * 0.6, h * 0.2, '#fff', 900, 'center', w - 40); txt(c, '✓✓ Lida', w * 0.86, h * 0.84, h * 0.13, '#eaffef', 900, 'right'); });
    guarda(X.minha, 'minha');
    // o confete: papeizinhos coloridos em chafariz saindo da boca
    const cores = [0xe8352b, 0xffd23f, 0x2fb54a, 0x3fb8ff, 0xff4d8a, 0xffffff].map((c) => new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
    const geoC = new THREE.PlaneGeometry(0.075, 0.05);
    X.conf = []; X.confG = new THREE.Group(); guarda(X.confG, 'confete', [0, 0, 0]);
    const r = K.rand(21);
    for (let i = 0; i < 170; i++) { const m = new THREE.Mesh(geoC, cores[i % 6]); m.userData.f = r(); m.userData.v = [(r() - 0.5) * 3.0, 3.2 + r() * 2.4, (r() - 0.55) * 2.6]; m.userData.g = r() * 6; X.confG.add(m); X.conf.push(m); }
    // o monte de confete do lado
    const texM = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#f2efe6'; c.fillRect(0, 0, w, h); const cs = ['#e8352b', '#ffd23f', '#2fb54a', '#3fb8ff', '#ff4d8a']; const rr2 = K.rand(5); for (let i = 0; i < 900; i++) { c.fillStyle = cs[i % 5]; c.fillRect(rr2() * w, rr2() * h, 7, 5); } });
    const monte = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.45, 24), new THREE.MeshStandardMaterial({ map: texM, roughness: 0.9 })); monte.position.y = 0.22;
    X.monte = guarda(monte, 'monte', [1.95, 0.22, CZ - 4.4]);
    X.placaLav = placaPoste('Lavanderia Bolha', '#2f8fd6'); guarda(X.placaLav, 'placa_lav', [2.2, 0, CZ - 1.6]);
  }
  // o celular: o post do Instagram com 2 curtidas; em "minha", a lista "Você curtiu"
  function celInsta(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.06, h * 0.06, w * 0.88, h * 0.42, 18, '#ff4d8a'); txt(c, 'Faço sites!', w / 2, h * 0.27, h * 0.07, '#fff', 900, 'center', w * 0.8);
    if (CFG.insta0) { txt(c, '👁 0 visualizações', w * 0.08, h * 0.56, h * 0.06, '#e8352b', 900, 'left', w * 0.84); txt(c, 'Dia ' + (e.dia || 20) + ' postando', w * 0.08, h * 0.68, h * 0.05, '#4b5563', 800, 'left', w * 0.84); return; }
    txt(c, '❤ 2 curtidas', w * 0.08, h * 0.56, h * 0.065, '#e8352b', 900, 'left', w * 0.84);
    if (e.minha) {
      rr(c, w * 0.06, h * 0.64, w * 0.88, h * 0.13, 14, '#fff3c4'); txt(c, 'Você curtiu', w * 0.1, h * 0.705, h * 0.055, '#111', 900, 'left', w * 0.8);
      rr(c, w * 0.06, h * 0.8, w * 0.88, h * 0.13, 14, '#f0f2f5'); txt(c, 'Mãe curtiu', w * 0.1, h * 0.865, h * 0.055, '#4b5563', 800, 'left', w * 0.8);
    }
  }

  // ---------- Garimpo: o campo na beira do rio ----------
  // a montanha de pedras-empresa atrás à esquerda; o Murilo na frente dela com a peneira gigante; o monte de cascalho
  // atrás à direita; a pedra da Tinta Viva jogada sozinha na grama da direita; o rio largo lá atrás
  const MT = [-0.7, 0, -2.6], MT_R = 1.9, MT_H = 3.6;
  const GM = [0.75, 0, -0.1], PN = [0.75, 0.74, 1.05], PN_R = 0.85;
  const CA = [2.45, 0, -1.1], P1 = [3.3, 0, 1.0];
  const MR = [2.45, 0, 1.3], DT = [4.15, 0, 0.8];
  const RZ = -6.4, RL = 3.2;
  const matPedra = (cor) => K.mat(cor, { roughness: 0.95, flatShading: true });
  function pedraGeo(r, seed) {
    const g = new THREE.IcosahedronGeometry(r, 0), p = g.attributes.position, rnd = K.rand(seed);
    const mapa = new Map();
    for (let i = 0; i < p.count; i++) {
      const k = p.getX(i).toFixed(3) + p.getY(i).toFixed(3) + p.getZ(i).toFixed(3);
      if (!mapa.has(k)) mapa.set(k, 0.82 + rnd() * 0.3);
      const f = mapa.get(k); p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * 0.8, p.getZ(i) * f);
    }
    g.computeVertexNormals();
    return g;
  }
  // plaquinha de empresa (fundo colorido, nome branco)
  function plaquinha(nome, cor, l = 0.56, a = 0.22) {
    return folha(l, a, 300, (c, w, h) => { rr(c, 2, 2, w - 4, h - 4, 18, cor); c.strokeStyle = '#ffffff'; c.lineWidth = 6; c.beginPath(); c.roundRect(5, 5, w - 10, h - 10, 14); c.stroke(); txt(c, nome, w / 2, h / 2 + 2, h * 0.42, '#fff', 900, 'center', w - 24); });
  }
  // a pílula colorida das pedras ("Já tem site", "Só Instagram")
  function pilula(texto, cor, l = 0.62, a = 0.17) {
    return folha(l, a, 360, (c, w, h) => { rr(c, 2, 2, w - 4, h - 4, h / 2, '#ffffff'); c.fillStyle = cor; c.beginPath(); c.arc(h * 0.55, h / 2, h * 0.22, 0, 7); c.fill(); txt(c, texto, h * 0.95, h / 2 + 2, h * 0.5, '#111', 900, 'left', w - h * 1.2); });
  }
  const NOMES = [['Padaria', '#e08a2f'], ['Pet Shop', '#2fa36b'], ['Oficina', '#5b6470'], ['Salão', '#d6458a'], ['Mercado', '#2f6fd6'], ['Farmácia', '#18a39a'], ['Academia', '#e8352b'], ['Pizzaria', '#c8372d'], ['Ótica', '#6b4fd6'], ['Clínica', '#1f9ad6'], ['Barbearia', '#3a2a22'], ['Lava-jato', '#2f8fd6'], ['Floricultura', '#c2367a'], ['Açougue', '#a3261e'], ['Papelaria', '#d6a02f'], ['Imobiliária', '#2f4f8a'], ['Sorveteria', '#e86fa0'], ['Advocacia', '#4a4f5a']];
  function fazPeneira(R, op = {}) {
    const g = new THREE.Group();
    const aro = K.malha(new THREE.CylinderGeometry(R, R, 0.17, 44, 1, true), K.mat(op.corAro || 0x9a6a3a, { side: THREE.DoubleSide, roughness: 0.7 })); g.add(aro);
    const borda = K.malha(new THREE.TorusGeometry(R, 0.035, 8, 44), K.mat(op.corBorda || 0x6b4524)); borda.rotation.x = PI / 2; borda.position.y = 0.085; g.add(borda);
    const tex = canvasTex(256, 256, (c, w, h) => { c.clearRect(0, 0, w, h); c.strokeStyle = '#3a3f46'; c.lineWidth = 3; for (let i = 0; i <= w; i += 14) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i, h); c.stroke(); c.beginPath(); c.moveTo(0, i); c.lineTo(w, i); c.stroke(); } });
    const tela = new THREE.Mesh(new THREE.CircleGeometry(R * 0.99, 44), new THREE.MeshStandardMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, roughness: 0.6, metalness: 0.3 }));
    tela.rotation.x = -PI / 2; tela.position.y = -0.06; g.add(tela);
    return g;
  }
  function montarGarimpo() {
    // o rio largo atrás (igual ao do aquario-vazio): a água, as margens e a correnteza
    const rio = new THREE.Group();
    const aguaMat = new THREE.MeshStandardMaterial({ color: 0x3a9be0, roughness: 0.12, metalness: 0.05, emissive: 0x0a2a40, emissiveIntensity: 0.4 });
    const agua = new THREE.Mesh(new THREE.BoxGeometry(90, 0.3, RL), aguaMat); agua.position.set(0, 0.06, RZ); rio.add(agua);
    const meio = new THREE.Mesh(new THREE.BoxGeometry(12, 0.3, RL), aguaMat); meio.position.set(0.8, 0.065, RZ); rio.add(meio); K.nomear('rio', meio);
    [-1, 1].forEach((l) => { const m = K.malha(new THREE.BoxGeometry(90, 0.24, 0.4), K.mat(0x8a6a45, { roughness: 1 })); m.position.set(0, 0.05, RZ + l * (RL / 2 + 0.15)); rio.add(m); });
    for (let i = 0; i < 26; i++) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(1.2 + (i % 3) * 0.6, 0.06), new THREE.MeshBasicMaterial({ color: 0xcdeeff, transparent: true, opacity: 0.6, depthWrite: false }));
      f.rotation.x = -PI / 2; f.position.set(-26 + i * 2.1, 0.215, RZ - 1.2 + ((i * 7) % 5) * 0.55); f.userData.x0 = f.position.x; rio.add(f);
    }
    K.vivo((t) => { aguaMat.emissiveIntensity = 0.38 + 0.12 * Math.sin(t * 2); rio.children.forEach((f) => { if (f.userData.x0 != null) f.position.x = f.userData.x0 + ((t * 0.9) % 2.1); }); });
    X.rio = guarda(rio, null, [0, 0, 0]);
    // a montanha de pedras: o cone de terra e as pedras por cima, as da frente com a plaquinha da empresa
    const mt = new THREE.Group();
    const cone = K.malha(new THREE.ConeGeometry(MT_R, MT_H, 30), matPedra(0x8b7d6b)); cone.position.y = MT_H / 2; mt.add(cone);
    const cores = [0x9a958c, 0xb3ada2, 0x8a847a, 0xa49d90, 0x7f7a72];
    const rnd = K.rand(41); let np = 0;
    for (let k = 0; k < 52; k++) {
      const h = 0.04 + rnd() * 0.86, a = rnd() * PI * 2, r = MT_R * (1 - h) + 0.05, s = 0.2 + rnd() * 0.17;
      const p = K.malha(pedraGeo(s, 100 + k), matPedra(cores[k % 5]));
      p.position.set(Math.cos(a) * r, h * MT_H, Math.sin(a) * r); p.rotation.set(rnd() * 3, rnd() * 3, 0); mt.add(p);
      if (Math.sin(a) > 0.15 && h < 0.8 && np < 18) {
        const [nome, cor] = NOMES[np % NOMES.length]; np++;
        const pl = plaquinha(nome, cor, 0.5, 0.2);
        pl.position.set(Math.cos(a) * (r + s * 0.9), h * MT_H + 0.05, Math.sin(a) * (r + s * 0.9)); pl.rotation.y = Math.atan2(Math.cos(a), Math.sin(a)); mt.add(pl);
      }
    }
    // a pedra escondida que brilha no gancho ("tem um cliente escondido")
    X.brilhaMat = K.mat(0xc9a43a, { roughness: 0.4, metalness: 0.5, flatShading: true, emissive: 0x000000 });
    X.brilha = K.malha(pedraGeo(0.3, 7), X.brilhaMat); X.brilha.position.set(0.25, 0.5 * MT_H, MT_R * 0.5 + 0.1); mt.add(X.brilha);
    X.mt = guarda(mt, 'montanha', MT);
    // a peneira gigante e as pedras pulando dentro
    X.pen = fazPeneira(PN_R);
    X.dentro = [];
    for (let i = 0; i < 9; i++) { const a = (i / 9) * PI * 2, r = i % 3 === 0 ? 0.15 : 0.5; const p = K.malha(pedraGeo(0.08 + (i % 3) * 0.02, 200 + i), matPedra(cores[i % 5])); p.userData.base = [Math.cos(a) * r, 0.03, Math.sin(a) * r]; X.pen.add(p); X.dentro.push(p); }
    // o cascalho da semana (pedrinhas cinza) que enche a peneira na frase 4
    X.miudo = new THREE.Group(); X.pen.add(X.miudo);
    for (let i = 0; i < 40; i++) { const a = rnd() * PI * 2, r = Math.sqrt(rnd()) * 0.72; const p = K.malha(pedraGeo(0.06 + rnd() * 0.04, 300 + i), matPedra(0x8a847a)); p.position.set(Math.cos(a) * r, 0.0 + rnd() * 0.06, Math.sin(a) * r); X.miudo.add(p); }
    guarda(X.pen, 'peneira', PN);
    // as pedras voando pro monte, cada uma com a pílula "Já tem site"
    X.voaP = []; X.tagsP = [];
    const vG = new THREE.Group(); guarda(vG, 'voando', [0, 0, 0]);
    for (let i = 0; i < 8; i++) {
      const p = K.malha(pedraGeo(0.2, 400 + i), matPedra(cores[i % 5])); vG.add(p); X.voaP.push(p);
      const tg = pilula(i % 3 === 2 ? 'Nem precisa' : 'Já tem site', i % 3 === 2 ? '#ff8a1f' : '#e8352b'); tg.position.set(0, 0.36, 0); p.add(tg); X.tagsP.push(tg);
    }
    // o monte de cascalho jogado fora
    const texC = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#9a958c'; c.fillRect(0, 0, w, h); const r2 = K.rand(9); for (let i = 0; i < 700; i++) { c.fillStyle = ['#7f7a72', '#b3ada2', '#6b665e', '#a49d90'][i % 4]; c.beginPath(); c.arc(r2() * w, r2() * h, 3 + r2() * 6, 0, 7); c.fill(); } });
    const casc = new THREE.Group();
    const cc = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.55, 26), new THREE.MeshStandardMaterial({ map: texC, roughness: 1, flatShading: true })); cc.position.y = 0.27; casc.add(cc);
    for (let i = 0; i < 14; i++) { const a = rnd() * PI * 2, r = 0.2 + rnd() * 0.55; const p = K.malha(pedraGeo(0.1 + rnd() * 0.07, 500 + i), matPedra(cores[i % 5])); p.position.set(Math.cos(a) * r, 0.5 * (1 - r / 0.8) + 0.05, Math.sin(a) * r); casc.add(p); }
    X.casc = guarda(casc, 'cascalho', CA);
    // as pedras que ele pega: a padaria (frase 2) e a oficina (frase 3)
    const pedraNome = (nome, cor, seed) => { const g = new THREE.Group(); g.add(K.malha(pedraGeo(0.3, seed), matPedra(0xa49d90))); const pl = plaquinha(nome, cor, 0.66, 0.24); pl.position.set(0, 0.42, 0); g.add(pl); g.userData.pl = pl; return g; };
    X.padaria = guarda(pedraNome('Padaria Pão Quente', '#e08a2f', 601), 'padaria');
    X.oficina = guarda(pedraNome('Oficina Pneu Bom', '#5b6470', 602), 'oficina');
    X.tagPad = pilula('Já tem site', '#e8352b'); X.padaria.add(X.tagPad); X.tagPad.position.set(0, 0.62, 0);
    X.tagOf = pilula('Já tem quem faça', '#ff8a1f', 0.78); X.oficina.add(X.tagOf); X.tagOf.position.set(0, 0.62, 0);
    // a primeira pedra: a Tinta Viva Tattoo, em duas metades (racha no fim) com a pepita dentro
    const p1 = new THREE.Group();
    X.p1a = K.malha(new THREE.SphereGeometry(0.42, 7, 5, 0, PI), matPedra(0x9a958c)); X.p1a.scale.y = 0.75; X.p1a.position.y = 0.32;
    X.p1b = K.malha(new THREE.SphereGeometry(0.42, 7, 5, PI, PI), matPedra(0x9a958c)); X.p1b.scale.y = 0.75; X.p1b.position.y = 0.32;
    p1.add(X.p1a, X.p1b);
    X.pep = K.malha(new THREE.IcosahedronGeometry(0.22, 0), K.mat(0xf5c518, { metalness: 0.85, roughness: 0.2, emissive: 0x8a6400, emissiveIntensity: 0.7, flatShading: true }));
    X.pep.position.y = 0.32; p1.add(X.pep);
    X.p1pl = plaquinha('Tinta Viva Tattoo', '#1e1f22', 0.8, 0.26); X.p1pl.position.set(0, 0.86, 0); p1.add(X.p1pl);
    X.p1tA = pilula('Já tem site', '#e8352b'); X.p1tA.position.set(0, 1.12, 0); p1.add(X.p1tA);
    X.p1tB = pilula('Só Instagram', '#ff8a1f', 0.7); X.p1tB.position.set(0, 1.12, 0); p1.add(X.p1tB);
    X.p1 = guarda(p1, 'pedra1', P1);
    // a pedra-banco onde ele senta cansado e o boleto do aluguel
    X.banco = K.malha(pedraGeo(0.42, 700), matPedra(0x8a847a)); X.banco.scale.y = 0.62; guarda(X.banco, 'banco', [GM[0], 0.24, GM[2] - 0.15]);
    X.boleto = folha(0.62, 0.42, 420, (c, w, h) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h); rr(c, 0, 0, w, h * 0.3, 0, '#e8352b'); txt(c, 'ALUGUEL', w / 2, h * 0.16, h * 0.2, '#fff', 900, 'center', w - 20); txt(c, 'VENCE HOJE', w / 2, h * 0.52, h * 0.19, '#e8352b', 900, 'center', w - 20); for (let i = 0; i < 14; i++) c.fillRect(w * 0.12 + i * w * 0.054, h * 0.72, i % 3 ? 3 : 7, h * 0.18); });
    guarda(X.boleto, 'boleto');
    // o chapéu de palha do garimpeiro (só no campo)
    const ch = new THREE.Group();
    const palha = K.mat(0xe2c27a, { roughness: 0.9 });
    const aba = K.malha(new THREE.CylinderGeometry(0.42, 0.44, 0.03, 30), palha); ch.add(aba);
    const copa = K.malha(new THREE.CylinderGeometry(0.2, 0.24, 0.17, 24), palha); copa.position.y = 0.09; ch.add(copa);
    const fita = K.malha(new THREE.CylinderGeometry(0.243, 0.243, 0.05, 24), K.mat(0x7a4a22)); fita.position.y = 0.04; ch.add(fita);
    ch.position.set(0, 0.31, -0.04); ch.rotation.x = -0.34; menino.cabeca.add(ch); X.chapeu = ch;
    // Quarto: as pepitas que pulam do monitor pra mesa no "Agora" e o escorredor de macarrão
    const ouro = K.mat(0xf5c518, { metalness: 0.85, roughness: 0.2, emissive: 0x8a6400, emissiveIntensity: 0.6, flatShading: true });
    X.pepG = new THREE.Group(); X.peps = [];
    for (let i = 0; i < 30; i++) { const p = K.malha(new THREE.IcosahedronGeometry(0.05 + (i % 3) * 0.012, 0), ouro); X.pepG.add(p); X.peps.push(p); }
    guarda(X.pepG, 'pepitas', [0, 0, 0]);
    const mac = fazPeneira(0.26, { corAro: 0xc9ccd1, corBorda: 0x9aa0a6 });
    const massa = K.mat(0xf2d16b, { roughness: 0.6 });
    for (let i = 0; i < 46; i++) { const a = rnd() * PI * 2, r = Math.sqrt(rnd()) * 0.2; const m = K.malha(new THREE.CylinderGeometry(0.009, 0.009, 0.2 + rnd() * 0.12, 5), massa); m.position.set(Math.cos(a) * r, 0.02 + rnd() * 0.1, Math.sin(a) * r); m.rotation.set(PI / 2 + (rnd() - 0.5) * 0.8, rnd() * 3, (rnd() - 0.5) * 0.8); mac.add(m); }
    X.vapor = [];
    for (let i = 0; i < 6; i++) { const v = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })); mac.add(v); X.vapor.push(v); }
    X.mac = guarda(mac, 'macarrao');
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    M = K.MAPPOA;
    const lista = [VID === 'garimpo' ? ['natureza', {}, 'campo'] : ['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], 'central_mappoa', 'mundo_mappoa'];
    if (CFG.venda === 'acad') lista.push(['academia', {}, 'acad']);
    if (CFG.venda === 'clinica') lista.push(['clinica_odonto', {}, 'clinica']);
    CS = K.cenarios(lista);
    Cr = CS.todos.rua;
    // as árvores e os bancos do calçadão (x ±2,6) perto da cena tampam a câmera: somem só neste trecho
    if (Cr && Cr.grupo) Cr.grupo.children.forEach((o) => { if (Math.abs(Math.abs(o.position.x) - 2.6) < 0.05 && o.position.z > CZ - 16 && o.position.z < CZ + 22) o.visible = false; });
    telas();

    // Personagens: o do canal, o dono do lugar da venda e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    if (VID === 'garimpo') dono = K.personagem('cliente_bravo', { cores: { camiseta: 0x1e1f22, gola: 0x1e1f22 }, humor: 'feliz' });
    else if (VID === 'triturador') dono = K.personagem('senhorinha');
    else if (VID === 'batalha') dono = K.personagem('dona', { cores: { blazer: 0x2f9a57, vestido: 0xf5e6c8 } });
    else if (VID === 'dono') { dono = K.personagem('pizzaiolo', { cores: { avental: 0x6b3a1e } }); if (dono.extras && dono.extras.chapeu) dono.extras.chapeu.visible = false; }
    else if (CFG.venda === 'acad') dono = K.personagem('personal');
    else if (CFG.venda === 'clinica' && VID !== 'placa' && VID !== 'gui') { dono = K.personagem('dentista', { cores: { cabelo: 0x5a3418 } }); if (dono.extras && dono.extras.mascara) dono.extras.mascara.visible = false; }
    else if (VID === 'sobrinho') dono = K.personagem('dono', { cores: { terno: 0x2f4f8a } });
    else dono = K.boneco({ tipo: 'doutor' });
    K.semNome(dono.g); K.nomear('dono', dono.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cadeira, a comida e a moeda, a barra e as telas
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    comidaG = fazComida(); guarda(comidaG, 'comida');
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, null);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    buscaP = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(buscaP, 'busca', TELA_Q);
    telaQ = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaQ, 'tela', TELA_Q);
    cel = K.celular(); guarda(cel, 'celular', null, 1.8);
    // Central e palco
    listaP = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(listaP, 'lista', LISTA_C);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    if (VID === 'canhao') montarCanhao();
    if (VID === 'planilha') montarPlanilha();
    if (VID === 'grupo') montarGrupo();
    if (VID === 'placa') montarPlaca();
    if (VID === 'sobrinho') montarSobrinho();
    if (VID === 'gui') montarGui();
    if (VID === 'dono') montarDono();
    if (VID === 'batalha') montarBatalha();
    if (VID === 'triturador') montarTriturador();
    if (VID === 'garimpo') montarGarimpo();

    // Efeitos
    fx.cont = K.contador(); fx.cont2 = K.contador();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo(); fx.simb4 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46); fx.poof3 = K.poof(7);
    fx.vel = K.velocidade();
    fx.grana = K.chuvaDinheiro();
    fx.estr = K.estrelinhas();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      web: e('Web designer', 'azul'), naoFaca: e('Não faça isso', 'vermelho'), investir: e('Investir', 'azul'),
      total: e(CFG.et.total, 'azul'), sem: e(CFG.et.sem, 'verde'), quem: e('Quem precisa de você', 'verde'),
      nota: e(CFG.et.nota, 'verde'), msg: e(CFG.et.msg, 'azul'), semResp: e(CFG.et.semResp, 'laranja'), venda: e(CFG.et.venda, 'verde'),
      antes: e('Antes', 'vermelho'), agora: e(CFG.et.agora, 'verde'), fechou: e(CFG.et.fechou, 'verde'),
      // do canhão
      mesma: e('A mesma mensagem', 'laranja'), qualquer: e('Qualquer empresa', 'laranja'), jaTem: e('Já tem site', 'vermelho'), bancoE: e('Banco?!', 'vermelho'),
      cem: e('100 enviadas', 'verde'), visto: e('Visualizou', 'azul'), bloq: e('Bloqueado', 'vermelho'), erro: e('O erro', 'vermelho'), quinze: e('15, não 100', 'azul'),
      // da planilha
      maps: e('Google Maps', 'azul'), umaUma: e('Uma por uma', 'laranja'), dias: e('3 dias', 'vermelho'), volta: e('Volta no quarteirão', 'laranja'),
      jaTemL: e('Já tem site', 'laranja'), naoAtende: e('Não atende', 'vermelho'), naMao: e('Na mão', 'vermelho'), procura: e('Procura por você', 'verde'), segundos: e('Em segundos', 'azul'),
      // do grupo
      comentar: e('Comentar rápido!', 'laranja'), quinto: e('5º', 'laranja'), coments: e('127 comentários', 'vermelho'), cemReais: e('R$ 100?!', 'vermelho'),
      sobrinho: e('O sobrinho', 'laranja'), amanha: e('Amanhã: de novo', 'vermelho'), x300: e('300 x 1', 'vermelho'), ninguem: e('Ninguém procurou', 'verde')
    };
    Object.assign(fx.et, { pedindo: e('Pedindo cliente', 'laranja'), portfolio: e('Portfólio postado', 'azul'), curtida: e('1 curtida', 'vermelho'), mae: e('Da minha mãe', 'laranja'), madrugada: e('3 da manhã', 'vermelho'), nada: e('Nada', 'vermelho'), zero: e('Zero cliente', 'vermelho'), esmola: e('R$ 1 de esmola', 'laranja'), ninguemP: e('Ninguém vai te procurar', 'laranja'), vaiAtras: e('Vai atrás', 'verde') });
    if (VID === 'sobrinho') Object.assign(fx.et, { quatorze: e('14 anos', 'vermelho'), escola: e('Escola de inglês', 'azul'), capricho: e('Caprichado', 'azul'), enviado: e('Enviado', 'verde'), deGraca: e('De graça', 'vermelho'), fechouSob: e('Fechou com o sobrinho', 'vermelho'), meses: e('3 meses sem cliente', 'vermelho'), cadaLoja: e('Um sobrinho em cada loja', 'laranja'), foraAr: e('Site fora do ar', 'vermelho'), semSite: e('Sem site', 'laranja'), mesma: e('A mesma escola', 'azul'), sumiu: e('O sobrinho sumiu', 'laranja'), caido: e('Site caído', 'vermelho') });
    if (VID === 'gui') Object.assign(fx.et, { gui: e('Gui, web designer', 'azul'), zeroResp: e('0 respostas', 'vermelho'), postado: e('Postado no grupo', 'azul'), euTambem: e('40 concorrentes', 'vermelho'), todoDia: e('Todo dia', 'azul'), duas: e('2 curtidas', 'vermelho'), minha: e('Uma era minha', 'laranja'), dia30: e('Dia 30', 'vermelho'), visto: e('Visualizou', 'azul'), sumiram: e('Visualizaram e sumiram', 'vermelho'), entendi: e('Pra quem?', 'laranja'), jaTinham: e('Já tinham site', 'vermelho'), noventa: e('99 "oi, faço sites"', 'laranja') });
    if (VID === 'dono') Object.assign(fx.et, { donoCafe: e('Dono da cafeteria', 'azul'), noventa: e('99 "oi, faço sites"', 'laranja'), lixo: e('Direto pro lixo', 'vermelho'), intro: e('Rodrigo, web designer', 'azul'), postado: e('Postado no grupo', 'azul'), euTambem: e('40 concorrentes', 'vermelho'), todoDia: e('Todo dia', 'azul'), duas: e('Ninguém viu', 'vermelho'), minha: e('Ninguém viu', 'vermelho'), dia30: e('A mesma pra todas', 'laranja'), visto: e('Visualizou', 'azul'), sumiram: e('Ninguém respondeu', 'vermelho'), entendi: e('A mesma mensagem', 'laranja'), jaTinham: e('Já tinham site', 'vermelho'), mesmoDono: e('O mesmo dono', 'azul'), unica: e('A única que ele leu', 'verde') });
    if (VID === 'batalha') Object.assign(fx.et, { trezentos: e('300 web designers', 'vermelho'), intro: e('Caio, web designer', 'azul'), postado: e('Postado no grupo', 'azul'), euTambem: e('Só concorrente', 'vermelho'), todoDia: e('Todo dia', 'azul'), duas: e('Nenhum cliente', 'vermelho'), minha: e('Nenhum cliente', 'vermelho'), dia30: e('A mesma pra todas', 'laranja'), visto: e('Visualizou', 'azul'), sumiram: e('Só visualização', 'vermelho'), mesmoPost: e('300 no mesmo post', 'vermelho'), entendi: e('Pra qualquer um', 'laranja'), jaTinham: e('Já tinham site', 'vermelho'), donaPost: e('A dona do post', 'azul'), naoLeu: e('0 de 300 lidos', 'vermelho') });
    if (VID === 'triturador') Object.assign(fx.et, { msgSua: e('Oi, faço sites!', 'laranja'), pro: e('Nunca foi lida', 'vermelho'), intro: e('Fábio, web designer', 'azul'), postado: e('Postado no grupo', 'azul'), euTambem: e('Só concorrente', 'vermelho'), todoDia: e('Um mês inteiro', 'azul'), duas: e('Ninguém viu', 'vermelho'), minha: e('Ninguém viu', 'vermelho'), dia30: e('A mesma pra todas', 'laranja'), visto: e('Visualizou', 'azul'), sumiram: e('Ninguém respondeu', 'vermelho'), iguais: e('Todas iguais', 'laranja'), jaTinham: e('Já tinham site', 'vermelho'), confete: e('Vira confete', 'vermelho'), donaTri: e('A dona do triturador', 'azul') });
    if (VID === 'garimpo') Object.assign(fx.et, { intro: e('Murilo, web designer', 'azul'), jaTem: e('Já tem site', 'vermelho'), umaUma: e('Uma por uma', 'laranja'), dia1: e('Dia 1', 'azul'), dia2: e('Dia 2', 'azul'), quemFaca: e('Já tem quem faça', 'laranja'), dia7: e('Dia 7: zero cliente', 'vermelho'), aluguel: e('Aluguel vencendo', 'laranja'), primeira: e('A primeira pedra', 'azul'), soInsta: e('Só Instagram', 'laranja'), escorredor: e('Escorredor de macarrão', 'laranja'), escondido: e('Tem um aqui', 'verde') });
    fx.expl = K.explosao ? K.explosao() : null; fx.poofB = K.poof(51); fx.poofC = K.poof(53);
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta(CFG.cta);
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  function cadeiraDoLado() { ve(cadeira); cadeira.position.set(-1.6, 0, -0.75); cadeira.rotation.set(0, 0.6, 0); }
  // de trás do monitor: o rosto dele sentado (o sentado olha o monitor, -z, e fica de costas pras câmeras de frente)
  const camRosto = (q) => K.mirar([K.lerp(1.55, 1.45, q), 1.55, K.lerp(-2.95, -2.85, q)], [-0.4, 1.05, -0.55]);
  // o celular na mão do personagem, de frente pra câmera
  function celularNa(b, desenho, chave) {
    ve(cel); const m = b.mao(1);
    cel.g.position.set(m[0], m[1] + 0.12, m[2] + 0.06); cel.g.lookAt(K.camera.position);
    cel.tela.desenhar(desenho, chave);
  }

  // ---------- Canhão ----------
  const boca = () => { X.canhao.updateMatrixWorld(true); return X.cano.localToWorld(V(0, 0, -2.5)).toArray(); };
  // o canhão disparando: balões saindo da boca em arco até as fachadas; tranco a cada disparo
  function canhaoAtira(tc, forca = 1, t0 = 0) {
    ve(X.canhao, X.baloesG);
    const b0 = boca();
    const per = 1.3;
    let tranco = 0;
    X.baloes.forEach((b, i) => {
      const t = tc - t0 - b.userData.fase;
      if (forca <= 0 || t < 0) { b.visible = false; return; }
      const q = (t % per) / per, k = Math.floor(t / per);
      const al = b.userData.alvo, z = al[2] - (k % 3) * 2.5;
      b.visible = true;
      const qq = Math.min(1, q * 1.25);
      b.position.set(K.lerp(b0[0], al[0] - Math.sign(al[0]) * 0.1, qq), K.lerp(b0[1], al[1], qq) + Math.sin(qq * PI) * 2.2, K.lerp(b0[2], z, qq));
      b.lookAt(K.camera.position);
      b.scale.setScalar(q > 0.8 ? 1 + (q - 0.8) * 0.5 : K.lerp(0.4, 1, Math.min(1, q * 4)));
      if (q < 0.05) tranco = Math.max(tranco, 1 - q / 0.05);
    });
    X.canhao.position.z = CZ - 1.2 + tranco * 0.12 * forca;
    X.manivela.rotation.x = tc * 9 * forca;
  }
  function brunoNoCanhao(olhar) { menino.colocar(X.PLAT, olhar || [0.25, 2.5, CZ - 8]); }

  // ---------- Planilha ----------
  // a planilha até o ponto u (0 a 1) do caminho; cortada: os pedaços depois de corte voam com o vento
  function papelAte(u, tc, corte = -1, voo = 0) {
    ve(X.papelG);
    X.pedacos.forEach((m) => {
      const uu = m.userData.u;
      m.visible = uu <= u;
      m.position.copy(m.userData.p0); m.quaternion.copy(m.userData.q0);
      if (corte >= 0 && uu < corte && uu > corte - 0.06 && voo > 0) {
        const s = (corte - uu) * 30;
        m.position.add(V(Math.sin(uu * 90) * voo * 1.5, voo * (1.5 + s), Math.cos(uu * 70) * voo));
        m.rotation.set(voo * 5 + uu * 40, voo * 3, voo * 4);
      }
    });
  }
  function mateusNaMesa(tc, olhar, escrevendo = true) {
    ve(X.mesinha);
    menino.colocar(X.SENTA, olhar || [0.3, 0.8, CZ + 3]);
    menino.sentar(1);
    if (escrevendo) { menino.reagir('digitando', tc * 2.2); }
    const m = menino.mao(1); ve(X.caneta);
    X.caneta.position.set(m[0], m[1] + 0.05, m[2] + 0.05); X.caneta.rotation.set(0.5 + Math.sin(tc * 20) * 0.15, 0, 0.3);
  }

  // ---------- Grupo ----------
  // a multidão: k de 0 a 1 do caminho até o post; pilha: em cima do post, empurrando
  function multidaoEm(tc, k, pilha, ate) {
    multidao.forEach((m, i) => {
      const b = m.b; b.g.visible = true;
      const dest = ate ? [ate[0] + (m.em[0] - X.POST[0]), 0, ate[2] + (m.em[2] - X.POST[2])] : m.em;
      const kk = K.clamp(k * m.vel * 1.1 - (i % 4) * 0.04);
      if (kk < 1) { b.irPara(m.de, dest, kk, tc + m.fase, { correr: true }); }
      else { b.colocar(dest, [X.POST[0] + (ate ? ate[0] - X.POST[0] : 0), 1, X.POST[2] + (ate ? ate[2] - X.POST[2] : 0)]); if (pilha) { b.correr(tc + m.fase, 1.4); b.g.position.y = Math.abs(Math.sin(tc * 6 + m.fase)) * 0.1; } }
      b.humor(i % 3 ? 'assustado' : 'bravo');
    });
  }
  // a multidão já no post, depois sai correndo pro post novo (k de 0 a 1)
  function multidaoVira(tc, k) {
    multidao.forEach((m, i) => {
      const b = m.b; b.g.visible = true;
      const de = m.em, ate = [m.em[0] + (Math.sin(i) * 0.6), 0, -9 + (m.em[2] - X.POST[2])];
      const kk = K.clamp(k * m.vel * 1.2 - (i % 5) * 0.05);
      if (kk <= 0) { b.colocar(de, [Cr ? -4.2 : 0, 1.5, 3.6]); b.humor('surpreso'); }
      else { b.irPara(de, ate, kk, tc + m.fase, { correr: true }); b.humor('assustado'); }
    });
  }

  // ===================================================================================================
  // Planos de cada vídeo: do gancho à virada, o "Antes" e a capa
  // ===================================================================================================
  const PV = {};
  PV.canhao = {
    gancho(B, tc) {
      // NA TELA: a rua; o Bruno em cima do canhão gigante disparando balões "Oi, faço sites!" pros prédios; em "isso", um balão volta na cara dele · MOSTRA: personagem, canhao, baloes
      const tD = quando('designer', B, 0.1), tN = quando('não', B, 0.7), tI = quando('isso', B, 0.92);
      // OBJETOS SE MEXENDO: o canhão já disparando no 1º quadro; o tranco a cada disparo
      canhaoAtira(tc, 1, B.inicio - 3);
      // o balão que volta: sai da boca, bate no prédio da esquerda e volta na cara dele em "isso"
      const tV0 = tI - 0.9, b0 = boca(), predio = [-5.8, 6.5, CZ - 6], cara = cabecaDe(menino, -0.1);
      if (tc > tV0) {
        ve(X.volta); const q = K.clamp((tc - tV0) / 0.9);
        const p = q < 0.55 ? [K.lerp(b0[0], predio[0], q / 0.55), K.lerp(b0[1], predio[1], q / 0.55) + Math.sin((q / 0.55) * PI) * 1.5, K.lerp(b0[2], predio[2], q / 0.55)]
          : [K.lerp(predio[0], cara[0], (q - 0.55) / 0.45), K.lerp(predio[1], cara[1] + 0.05, (q - 0.55) / 0.45), K.lerp(predio[2], cara[2] + 0.25, (q - 0.55) / 0.45)];
        X.volta.position.set(...p); X.volta.lookAt(K.camera.position);
      }
      // PERSONAGEM: em cima do canhão · começo: girando a manivela, rindo · em "isso": leva o balão na cara e cai sentado
      brunoNoCanhao(tc > tI ? [0.4, 1.4, CZ + 6] : [0.9, 1.0, CZ - 1.0]);
      if (tc > tI) { menino.reagir('susto', tc - tI); menino.humor('assustado'); fx.estr.em(cabecaDe(menino, 0.25), tc, { raio: 0.35 }); }
      else { menino.reagir('empurrando', tc - B.inicio); menino.humor('feliz'); }
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Não faça isso" em "não faça" · o ✗ em "isso"
      if (tc < tN) fx.et.web.em({ tela: [540, 430] }, tc - tD); else fx.et.naoFaca.em({ tela: [540, 430] }, tc - tN);
      // SONS: o estouro a cada disparo · whoosh · plaft em "isso"
      for (let k = 0; k < 8; k++) K.som('baque', B.inicio + k * 0.45, 0.35);
      K.som('whoosh', B.inicio + 0.2, 0.4); K.som('tampa', tI, 0.8);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto, de frente e de baixo, o canhão inteiro · (2) seguindo um balão até o prédio · (3) médio, esquerda, ele na manivela · (4) perto, de frente, o balão na cara
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.5, tI - 0.35);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(0.9, 0.7, q), 1.5, CZ + K.lerp(7.4, 6.8, q)], [0.25, 2.5, CZ - 1.5]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([0.6, K.lerp(3.0, 4.0, q), CZ + 3.0], [K.lerp(-1.5, -4.5, q), K.lerp(4, 6, q), CZ - K.lerp(4, 7, q)]); }
      else if (tc < c3) { const c = cabecaDe(menino, -0.3); const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(-2.3, -2.0, q), 2.5, CZ - K.lerp(2.4, 2.0, q)], [c[0], c[1] - 0.35, c[2]]); }
      else { const c = cabecaDe(menino, -0.6); K.mirar([c[0] + 0.5, c[1] + 0.7, c[2] + 4.3], c); }
      if (tc > tI) fx.simb.em(mais(cabecaDe(menino, 0.5), [0.45, 0, 0]), tc - tI, { tipo: '✗', tam: 0.7 });
    },
    qualquer(B, tc) {
      // NA TELA: os pinos do Maps em cima dos prédios; o canhão girando de um lado pro outro; os balões iguais grudando nas fachadas · MOSTRA: personagem, canhao, baloes
      const tMe = quando('mesma', B, 0.25), tQ = quando('qualquer', B, 0.55), tMa = quando('Maps', B, 0.9);
      canhaoAtira(tc, 1, B.inicio - 3);
      // OBJETOS SE MEXENDO: o canhão gira de um lado pro outro sem parar de disparar
      X.canhao.rotation.y = Math.sin(tc * 2.2) * 0.45;
      // PERSONAGEM: começo: volta a subir esfregando o rosto · em "qualquer": aponta qualquer prédio sem olhar
      brunoNoCanhao([Math.sin(tc * 2.2) * -6, 3, CZ - 8]);
      if (tc > tQ) { menino.apontar(0.9); menino.humor('feliz'); } else { menino.reagir('coca_cabeca', tc - B.inicio); menino.humor('normal'); }
      // EFEITOS VISUAIS: "A mesma mensagem" em "mesma" · "Qualquer empresa" em "qualquer"
      if (tc < tQ) fx.et.mesma.em({ tela: [540, 400] }, tc - tMe); else fx.et.qualquer.em({ tela: [540, 400] }, tc - tQ);
      // SONS: estouros · estalo a cada pino
      for (let k = 0; k < 6; k++) K.som('baque', B.inicio + 0.2 + k * 0.5, 0.3);
      for (let k = 0; k < 5; k++) K.som('estalo', tMa + k * 0.1, 0.25);
      // pinos do Maps nas fachadas, em "Maps"
      if (tc > tMa) [fx.simb2, fx.simb3, fx.simb4].forEach((s, i) => s.em([i === 1 ? 5.6 : -5.6, 5 + i, CZ - 4 - i * 3], tc - tMa - i * 0.1, { tipo: '!', tam: 0.9, som: false }));
      // CÂMERA: (1) subindo, aberto, de trás do canhão, a rua inteira · (2) chegando, médio, direita, os balões grudados
      X.canhao.updateMatrixWorld(true);
      if (tc < tQ) { const q = K.suave(pc(tc, B.inicio, tQ)); K.mirar([0.55, K.lerp(3.4, 4.6, q), CZ + 7.0], [0.0, 3.2, CZ - 10]); }
      else K.filmar([menino, cabecaDe(menino, 0.3), [-5.6, 6.0, CZ - 6], [-5.6, 4.0, CZ - 9]], 'chegando', pc(tc, tQ, B.ate), { plano: 'aberto', lado: 25, altura: 'olho', obstaculos: false });
    },
    errados(B, tc) {
      // NA TELA: a loja com "SITE NOVO!" recebe um balão; o banco recebe outro; a dona franze a testa; o segurança encara · MOSTRA: loja_nova, baloes, banco
      const tSi = quando('novo', B, 0.2), tRe = quando('Recebe', B, 0.3), tBa = quando('banco', B, 0.55), tTa = quando('também', B, 0.85);
      canhaoAtira(tc, 1, B.inicio - 3);
      ve(X.lojaNova, X.banco);
      X.donaLoja.g.visible = true; X.donaLoja.colocar([-3.6, 0, 2.6], [0.3, 1.5, CZ]); X.donaLoja.reagir(tc > tRe ? 'bravo' : 'segurando', tc - tRe);
      X.seguranca.g.visible = true; X.seguranca.colocar([3.6, 0, 1.0], [0.3, 1.5, CZ]); X.seguranca.reagir(tc > tTa ? 'bravo' : 'segurando', tc - tTa);
      // o balão grudado na placa (em "Recebe") e no banco (em "também"), escorregando devagar
      const gruda = (b, p, t0) => { if (tc < t0) { b.visible = false; return; } b.visible = true; b.userData.fixo = true; const q = K.clamp((tc - t0) / 0.3); b.position.set(K.lerp(p[0] + 3, p[0], q), p[1] - Math.max(0, tc - t0 - 0.3) * 0.08, p[2] + 0.06); b.rotation.set(0, 0, Math.sin(tc * 2) * 0.05); b.scale.setScalar(1); };
      gruda(X.baloes[0], [-4.3, 2.85, 2.25], tRe - 0.3); gruda(X.baloes[1], [4.3, 2.85, 0.65], tTa - 0.3);
      // PERSONAGEM: lá atrás no canhão · em "também": faz joinha sem perceber
      brunoNoCanhao(); if (tc > tTa) menino.reagir('sim', tc - tTa); else menino.reagir('empurrando', tc);
      // EFEITOS VISUAIS: "Já tem site" em "novo" · "Banco?!" em "banco"
      if (tc < tBa) fx.et.jaTem.em([-4.3, 3.8, 2.3], tc - tSi); else fx.et.bancoE.em([4.3, 3.8, 0.7], tc - tBa);
      // SONS: plaft · plaft · cri-cri
      K.som('tampa', tRe, 0.6); K.som('tampa', tTa, 0.6); K.som('zumbido', tTa + 0.3, 0.2);
      // CÂMERA: (1) chegando, médio, de frente, a loja com a placa · (2) passando, médio, o banco
      if (tc < tBa) { const q = K.suave(pc(tc, B.inicio, tBa)); K.mirar([K.lerp(0.9, 0.6, q), 3.2, CZ + K.lerp(4.6, 3.9, q)], [-4.0, 2.2, 2.3]); }
      else { const q = K.suave(pc(tc, tBa, B.ate)); K.mirar([K.lerp(0.0, 0.3, q), 3.2, CZ + K.lerp(4.4, 3.8, q)], [4.0, 2.2, 0.8]); }
    },
    ignorado(B, tc) {
      // NA TELA: o contador "Enviadas 0 → 100" acima do canhão; ele desce e olha o celular: os vistos azuis; o "Bloqueado" · MOSTRA: personagem, celular
      const tC = quando('Cem', B, 0.05), tVi = quando('Visualizou', B, 0.4), tBl = quando('Bloqueou', B, 0.85);
      ve(X.canhao); X.canhao.position.z = CZ - 1.2;
      // OBJETOS SE MEXENDO: o canhão solta fumaça e emperra
      fx.poof2.em(boca(), (tc - B.inicio) % 0.8, { escala: 0.8, cor: 0x9aa0a6 });
      fx.cont.em(mais(boca(), [0, 1.2, 0]), tc - tC, { de: 0, ate: 100, dur: 0.8, antes: 'Enviadas ', depois: '', cor: '#1f7a44' });
      // PERSONAGEM: começo: desce animado e pega o celular · em "Bloqueou": a cabeça cai pra trás
      const P0 = [1.1, 0, CZ + 0.9];
      menino.colocar(P0, [1.1, 1.4, CZ + 6]);
      if (tc > tBl) { menino.reagir('mao_na_testa', tc - tBl); menino.humor('triste'); } else { menino.reagir('celular', tc); menino.humor(tc > tVi ? 'triste' : 'feliz'); }
      const vistos = tc > tVi ? Math.min(5, 1 + Math.floor((tc - tVi) / 0.18)) : 0;
      celularNa(menino, (c, w, h) => K.telasMappoa.conversa(c, w, h, { vistos, bloq: tc > tBl }), 'v' + vistos + (tc > tBl));
      // EFEITOS VISUAIS: "100 enviadas" em "Cem" · "Visualizou" · "Bloqueado" em "Bloqueou"
      if (tc < tVi) fx.et.cem.em({ tela: [540, 400] }, tc - tC); else if (tc < tBl) fx.et.visto.em({ tela: [540, 400] }, tc - tVi); else fx.et.bloq.em({ tela: [540, 400] }, tc - tBl);
      if (tc > tBl) fx.simb.em(mais(cabecaDe(menino, 0.1), [0.55, 0, 0]), tc - tBl, { tipo: '✗', tam: 0.8 });
      // SONS: tique-tique do contador · pling dos vistos · errado em "Bloqueou"
      for (let k = 0; k < 5; k++) K.som('pingo', tVi + k * 0.18, 0.3);
      K.som('errado', tBl, 0.6); K.som('vapor', B.inicio + 0.1, 0.3);
      // CÂMERA: (1) afastando, médio, direita, o contador e o canhão soltando fumaça · (2) chegando, perto, de frente, ele e o ✗
      if (tc < tVi) { const q = K.suave(pc(tc, B.inicio, tVi)); K.mirar([K.lerp(1.6, 2.0, q), 2.4, CZ + K.lerp(4.6, 5.4, q)], [0.6, 2.2, CZ - 1.2]); }
      else { const c = cabecaDe(menino, -0.35); const q = K.suave(pc(tc, tVi, B.ate)); K.mirar([c[0] + 0.2, c[1] + 0.1, c[2] + K.lerp(3.0, 2.5, q)], c); }
    },
    virada(B, tc) {
      // NA TELA: o ✗ carimbado no canhão; o alvo sobe do chão; só 3 balões acertam o meio e brilham verde · MOSTRA: personagem, alvo, canhao
      const tE = quando('erro', B, 0.12), tMa = quando('mandar', B, 0.5), tPr = quando('precisa', B, 0.85);
      ve(X.canhao, X.murchos); X.canhao.position.z = CZ - 1.2;
      fx.simb.em(mais(boca(), [0, -0.4, 0.5]), tc - tE, { tipo: '✗', tam: 1.6 });
      // ENTRA AGORA: o alvo sobe do chão em "mandar pra"; os 3 balões no centro em "precisa"
      ve(X.alvo); const kA = K.suave(K.clamp((tc - tMa) / 0.45)); X.alvo.position.set(0.25, K.lerp(-1.0, 1.9, kA), CZ - 3.2); X.alvo.visible = tc > tMa - 0.05;
      [0, 1, 2].forEach((i) => { const b = X.baloes[i], t0 = tPr - 0.3 + i * 0.12; if (tc < t0) { b.visible = false; return; } ve(X.baloesG); b.visible = true; const q = K.clamp((tc - t0) / 0.3); b.position.set(0.25 + (i - 1) * 0.2, K.lerp(4, 1.9 + (i - 1) * 0.12, q), CZ - 3.0 + i * 0.01); b.rotation.set(0, 0, (i - 1) * 0.3); b.scale.setScalar(0.45); b.userData.fixo = true; });
      // PERSONAGEM: começo: olha o ✗ e coça a cabeça · em "precisa": arregala os olhos e aponta o meio do alvo
      menino.colocar([1.3, 0, CZ + 0.6], tc > tMa ? [0.25, 1.9, CZ - 3.2] : boca());
      if (tc > tPr) { menino.apontar(0.6); menino.humor('surpreso'); } else { menino.reagir('coca_cabeca', tc - B.inicio); menino.humor('triste'); }
      if (tc > tPr) fx.poof.em([0.25, 1.9, CZ - 2.9], tc - tPr, { escala: 0.6, cor: 0x2fb54a });
      // EFEITOS VISUAIS: "O erro" em "erro" · "Quem precisa de você" em "precisa"
      if (tc < tPr) fx.et.erro.em({ tela: [540, 400] }, tc - tE); else fx.et.quem.em({ tela: [540, 400] }, tc - tPr);
      // SONS: carimbo · zum do alvo · ding
      K.som('trava', tE, 0.6); K.som('whoosh', tMa, 0.4); K.som('ding', tPr, 0.6);
      // CÂMERA: (1) chegando, médio, esquerda, o canhão com o ✗ · (2) subindo, médio, de frente e de baixo, ele e o alvo
      if (tc < tMa) { const q = K.suave(pc(tc, B.inicio, tMa)); K.mirar([K.lerp(-0.4, -0.2, q), 2.0, CZ + K.lerp(5.0, 4.2, q)], [0.4, 1.8, CZ - 1.5]); }
      else { const q = K.suave(pc(tc, tMa, B.ate)); K.mirar([1.0, K.lerp(0.9, 1.4, q), CZ + K.lerp(5.4, 4.8, q)], [0.6, 1.7, CZ - 1.5]); }
    },
    antes(B, tc, tA) {
      // (1) Antes: a rua, o canhão emperrado soltando fumaça, os balões murchos no chão, ele sentado no canhão desanimado
      ve(X.canhao, X.murchos); X.canhao.position.z = CZ - 1.2;
      fx.poof2.em(boca(), (tc - B.inicio) % 0.8, { escala: 0.7, cor: 0x9aa0a6 });
      menino.colocar(mais(X.PLAT, [0, 0, 0.1]), [0.3, 1.0, CZ + 6]); menino.reagir('cansado', tc - B.inicio); menino.humor('triste');
      fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
      K.som('vapor', B.inicio + 0.2, 0.3); K.som('errado', B.inicio + 0.4, 0.3);
      const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([K.lerp(-0.3, -0.5, q), 2.0, CZ + K.lerp(4.6, 5.6, q)], [0.25, 1.4, CZ - 0.5]);
    },
    capa() {
      canhaoAtira(1.15, 1, -3);
      brunoNoCanhao([0.9, 1.4, CZ + 6]); menino.reagir('susto', 0.3); menino.humor('assustado');
      const cara = cabecaDe(menino, -0.1); ve(X.volta); X.volta.position.set(cara[0] + 0.35, cara[1] + 0.25, cara[2] + 0.6);
      K.mirar([0.9, 1.3, CZ + 6.2], [0.25, 2.1, CZ - 1.2]); X.volta.lookAt(K.camera.position);
    }
  };

  PV.planilha = {
    gancho(B, tc) {
      // NA TELA: a rua; o Mateus na mesinha escrevendo com a caneta gigante; a planilha de papel rolando pela rua, enrolando a árvore e passando embaixo do carro; o diploma "Curso de site ✓" · MOSTRA: personagem, planilha, mesinha
      const tD = quando('designer', B, 0.1), tAp = quando('aprender', B, 0.35), tN = quando('não', B, 0.7), tI = quando('isso', B, 0.92);
      ve(X.carro);
      // OBJETOS SE MEXENDO: a planilha já se desenrolando no 1º quadro
      papelAte(K.lerp(0.5, 0.66, pc(tc, B.inicio, B.ate)), tc);
      // PERSONAGEM: sentado · começo: escrevendo muito rápido · em "isso": para, olha pra câmera e levanta a caneta
      mateusNaMesa(tc, [0.3, 0.8, CZ + 4], tc < tI);
      if (tc > tI) { menino.reagir('surpreso', tc - tI); menino.humor('surpreso'); } else menino.humor('feliz');
      // EFEITOS VISUAIS: "Web designer" · "Não faça isso" · o ✗ em "isso"
      if (tc < tN) fx.et.web.em({ tela: [540, 430] }, tc - tD); else fx.et.naoFaca.em({ tela: [540, 430] }, tc - tN);
      if (tc > tI) fx.simb.em([0.3, 1.4, CZ + 1.1], tc - tI, { tipo: '✗', tam: 0.9 });
      if (tc > tAp && tc < tAp + 0.6) fx.poof.em([0.62, 0.95, CZ + 0.57], tc - tAp, { escala: 0.3 });
      // SONS: caneta riscando · papel · buzina · carimbo em "isso"
      for (let k = 0; k < 10; k++) K.som('clique', B.inicio + k * 0.15, 0.12);
      K.som('whoosh', B.inicio + 0.1, 0.3); K.som('buzina', B.inicio + 1.0, 0.25); K.som('trava', tI, 0.6);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto, alto, a rua com a planilha enrolando tudo · (2) baixo, a planilha embaixo do carro · (3) médio, esquerda, ele escrevendo e o diploma · (4) perto, de frente, ele com a caneta no ar
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.5, tI - 0.3);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.6, K.lerp(9, 8, q), CZ + K.lerp(9, 8, q)], [-0.6, 0, CZ - 4]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(0.5, 0.2, q), 0.9, K.lerp(7.2, 6.6, q)], [-0.9, 0.4, 1.2]); }
      else if (tc < c3) { const c = cabecaDe(menino, -0.4); const q = K.suave(pc(tc, c2, c3)); K.mirar([c[0] - 1.6, c[1] + 0.6, c[2] + K.lerp(4.0, 3.6, q)], [c[0], c[1] - 0.35, c[2] + 0.3]); }
      else { const c = cabecaDe(menino, -0.5); K.mirar([c[0] + 0.3, c[1] + 0.45, c[2] + 3.6], c); }
    },
    maps(B, tc) {
      // NA TELA: o quarto; ele com o celular do Maps; cada pino sai voando do celular e vira uma linha da planilha · MOSTRA: personagem, maps, planilha_q
      const tMa = quando('Maps', B, 0.35), tE = quando('empresa', B, 0.7);
      ve(comp); comp.tela.desenhar(telaAntes, 'antes'); cadeiraDoLado(); ve(X.planQ);
      // PERSONAGEM: começo: abre o celular empolgado · em "empresa": escreve copiando, olhando celular e papel
      menino.colocar([0.55, 0, -0.2], tc > tE ? [1.5, 1.2, -0.9] : [0.55, 1.4, 4]);
      if (tc > tE) menino.reagir('digitando', tc * 1.5); else menino.reagir('celular', tc);
      menino.humor('feliz');
      celularNa(menino, telaAntes, 'maps');
      // OBJETOS SE MEXENDO: os pinos voando em arco do celular até a planilha; a planilha preenchendo
      const m0 = menino.mao(1), dest = [1.5, 1.6, -0.85];
      X.pinosMaps.forEach((p, i) => { const t0 = tMa + i * 0.35; if (tc < t0) return; const q = K.clamp((tc - t0) / 0.5); if (q >= 1) return; ve(p); p.g.position.set(K.lerp(m0[0], dest[0], q), K.lerp(m0[1] + 0.2, dest[1] - i * 0.15, q) + Math.sin(q * PI) * 0.5, K.lerp(m0[2], dest[2], q)); p.em(tc, 1); K.som('estalo', t0 + 0.5, 0.25); });
      X.planQ.userData.m3d.preencher(K.clamp((tc - tMa) / 1.6) * 0.45);
      // EFEITOS VISUAIS: "Google Maps" em "Maps" · "Uma por uma" em "empresa"
      if (tc < tE) fx.et.maps.em({ tela: [540, 420] }, tc - tMa); else fx.et.umaUma.em({ tela: [540, 420] }, tc - tE);
      K.som('whoosh', tMa, 0.3);
      // CÂMERA: (1) chegando, médio, direita, ele, o celular e a planilha · (2) parado, perto, o celular e os pinos virando linhas
      if (tc < tE) K.filmar([menino, cabecaDe(menino, 0.2), [1.5, 1.6, -0.9]], 'chegando', pc(tc, B.inicio, tE), { plano: 'medio', lado: 22, altura: 'olho', tam: 2.0, obstaculos: false });
      else K.filmar([cabecaDe(menino, -0.3), [1.5, 1.8, -0.9], [1.5, 0.9, -0.9]], 'parado', pc(tc, tE, B.ate), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.7, obstaculos: false });
    },
    planilha(B, tc) {
      // NA TELA: o topo da planilha com as colunas; o calendário arrancando folhas; a planilha dando a volta no quarteirão e voltando pelas costas dele · MOSTRA: personagem, planilha, calendario
      const tNo = quando('Nome', B, 0.05), tTe = quando('telefone', B, 0.15), tSi = quando('site', B, 0.28), tTr = quando('Três', B, 0.4), tQu = quando('quarteirão', B, 0.88);
      ve(X.carro, X.colunas, X.cal);
      X.colunas.mostrar('colunas', {}); K.entrar(X.colunas.g, 'cai', tc - tNo, { altura: 2 });
      const dia = tc < tTr ? 'SEG' : tc < tTr + 0.35 ? 'TER' : tc < tTr + 0.7 ? 'QUA' : 'QUI';
      X.cal.mostrar('calendario', { dia }); if (tc > tTr && tc < tTr + 1.1) fx.poof.em([1.35, 2.5, CZ + 0.3], (tc - tTr) % 0.35, { escala: 0.25 });
      // OBJETOS SE MEXENDO: a planilha correndo pela rua até voltar nas costas dele em "quarteirão"
      papelAte(K.lerp(0.66, 1, pc(tc, tTr, tQu)), tc);
      // PERSONAGEM: começo: escrevendo com olheiras · em "quarteirão": sente o papel nas costas e olha pra trás
      mateusNaMesa(tc, tc > tQu ? [0.6, 0.8, CZ - 3] : [0.3, 0.8, CZ + 3], tc < tQu);
      if (tc > tQu) { menino.reagir('susto', tc - tQu); menino.humor('surpreso'); } else menino.humor('triste');
      // EFEITOS VISUAIS: "3 dias" em "Três" · "Volta no quarteirão" em "quarteirão"
      if (tc < tQu) fx.et.dias.em({ tela: [540, 420] }, tc - tTr); else fx.et.volta.em({ tela: [540, 420] }, tc - tQu);
      // SONS: folhas · papel · tique-taque
      [tNo, tTe, tSi].forEach((t) => K.som('estalo', t, 0.3)); for (let k = 0; k < 3; k++) K.som('whoosh', tTr + k * 0.35, 0.2); K.som('baque', tQu, 0.4);
      // CÂMERA: (1) chegando, perto, de frente, as colunas e a caneta · (2) subindo, aberto, alto, a planilha dando a volta
      if (tc < tTr) { const q = K.suave(pc(tc, B.inicio, tTr)); K.mirar([0.5, 2.1, CZ + K.lerp(4.4, 3.8, q)], [0.3, 1.8, CZ + 0.2]); }
      else { const q = K.suave(pc(tc, tTr, B.ate)); K.mirar([0.6, K.lerp(7, 14, q), CZ + K.lerp(8, 12, q)], [0.1, 0, CZ - K.lerp(6, 12, q)]); }
    },
    falha(B, tc) {
      // NA TELA: as linhas recebendo ✓ "já tem site"; a recepcionista no balcãozinho com o telefone tocando, sem atender · MOSTRA: planilha, telefone, personagem
      const tMe = quando('metade', B, 0.15), tOu = quando('outra', B, 0.5), tAt = quando('atende', B, 0.82), tTel = quando('telefone', B, 0.95);
      ve(X.carro); papelAte(1, tc); ve(X.balcao);
      // PERSONAGEM: começo: com o celular no ouvido, esperando · em "telefone": joga a cabeça na mesinha
      mateusNaMesa(tc, [0.3, 0.8, CZ + 3], false);
      if (tc > tTel) { menino.reagir('dormindo', tc - tTel); menino.humor('triste'); } else { menino.reagir('celular', tc); menino.humor('triste'); }
      X.secretaria.g.visible = true; X.secretaria.colocar([-3.9, 0, 4.55], [-3.9, 1.5, 9]); X.secretaria.reagir(tc > tAt ? 'ombros' : 'segurando', tc - tAt);
      // OBJETOS SE MEXENDO: o telefone pulando de tanto tocar
      if (tc > tOu) X.fone.position.y = 1.05 + Math.abs(Math.sin(tc * 30)) * 0.05;
      // ✓ laranja pipocando nas linhas perto da mesa (em "metade") e o ✗ "não atende" (em "atende")
      if (tc < tOu) [fx.simb2, fx.simb3, fx.simb4].forEach((s, i) => s.em([-0.4 + i * 0.45, 0.45 + i * 0.15, CZ + 1.6 - i * 0.2], tc - tMe - i * 0.2, { tipo: '✓', tam: 0.55, som: false }));
      else fx.simb.em([-3.4, 1.9, 4.2], tc - tAt, { tipo: '✗', tam: 0.8 });
      // EFEITOS VISUAIS: "Já tem site" em "metade" · "Não atende" em "atende"
      if (tc < tOu) fx.et.jaTemL.em({ tela: [540, 420] }, tc - tMe); else fx.et.naoAtende.em({ tela: [540, 420] }, tc - tAt);
      // SONS: tlin a cada ✓ · telefone tocando · errado · baque da cabeça
      for (let k = 0; k < 3; k++) K.som('pingo', tMe + k * 0.2, 0.3);
      for (let k = 0; k < 4; k++) K.som('bip', tOu + 0.1 + k * 0.25, 0.3);
      K.som('errado', tAt, 0.5); K.som('baque', tTel + 0.1, 0.4);
      // CÂMERA: (1) passando, médio, esquerda, as linhas com os ✓ · (2) fixa, a recepcionista e ele lá atrás
      if (tc < tOu) { const q = K.suave(pc(tc, B.inicio, tOu)); K.mirar([K.lerp(-0.5, 0.2, q), 1.8, CZ + 4.0], [0.0, 0.5, CZ + 1.0]); }
      else { const q = K.suave(pc(tc, tOu, B.ate)); K.mirar([K.lerp(0.9, 0.7, q), 2.1, CZ + K.lerp(1.8, 1.2, q)], [-3.0, 1.2, 4.3]); }
    },
    virada(B, tc) {
      // NA TELA: ele se levanta com a tesoura gigante; em "uma por uma", corta a planilha e os pedaços voam · MOSTRA: personagem, tesoura, planilha
      const tPr = quando('procurar', B, 0.12), tMa = quando('mão', B, 0.6), tUm = quando('uma', B, 0.75);
      ve(X.carro, X.mesinha);
      papelAte(1, tc, 0.45, tc > tUm ? (tc - tUm) * 0.9 : 0);
      // PERSONAGEM: começo: olha a planilha infinita, sério · em "uma por uma": corta com força
      menino.colocar([0.95, 0, CZ + 1.4], tc > tUm ? [-0.4, 0.4, CZ + 1.2] : [0.6, 1.4, CZ + 6]);
      if (tc > tUm) menino.reagir('empurrando', tc - tUm); else menino.reagir('erguendo', tc - tPr);
      menino.humor(tc > tMa ? 'bravo' : 'normal');
      ve(X.tesoura); const m = menino.mao(1); X.tesoura.position.set(m[0], m[1] - 0.1, m[2] + 0.1); X.tesoura.rotation.set(0, menino.g.rotation.y, tc > tUm ? 0.2 : Math.sin(tc * 6) * 0.2 + 0.5);
      if (tc > tUm) fx.poof.em([-0.4, 0.4, CZ + 1.2], tc - tUm, { escala: 0.6 });
      // EFEITOS VISUAIS: "Na mão" em "mão" · "Uma por uma" em "uma"
      if (tc < tUm) fx.et.naMao.em({ tela: [540, 400] }, tc - tMa); else fx.et.umaUma.em({ tela: [540, 400] }, tc - tUm);
      // SONS: zum · tesourada · papel voando
      K.som('whoosh', tPr, 0.4); K.som('metal', tUm, 0.6); K.som('whoosh', tUm + 0.1, 0.4);
      // CÂMERA: (1) chegando, médio, de frente e de baixo, ele levantando a tesoura · (2) passando, médio, direita, o corte
      if (tc < tMa) { const q = K.suave(pc(tc, B.inicio, tMa)); K.mirar([0.9, K.lerp(0.9, 1.1, q), CZ + K.lerp(6.0, 5.2, q)], [0.8, 1.4, CZ + 1.2]); }
      else { const q = K.suave(pc(tc, tMa, B.ate)); K.mirar([K.lerp(1.2, 0.8, q), 1.7, CZ + K.lerp(5.2, 4.6, q)], [0.1, 0.8, CZ + 1.2]); }
    },
    antes(B, tc, tA) {
      // (1) Antes: a rua, a mesinha e a planilha picada no chão, o calendário arrancando folhas
      ve(X.carro, X.cal); papelAte(1, tc, 0.45, 0.8);
      const dias = ['SEG', 'TER', 'QUA', 'QUI']; X.cal.mostrar('calendario', { dia: dias[Math.min(3, Math.floor((tc - B.inicio) / 0.35))] });
      mateusNaMesa(tc, [0.3, 0.8, CZ + 3], true); menino.humor('triste');
      fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
      K.som('whoosh', B.inicio + 0.2, 0.3); K.som('errado', B.inicio + 0.4, 0.3);
      const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([K.lerp(-0.2, -0.5, q), 2.2, CZ + K.lerp(4.2, 5.2, q)], [0.3, 1.2, CZ]);
    },
    capa() {
      ve(X.carro); papelAte(0.95, 0);
      mateusNaMesa(0.2, [0.3, 0.8, CZ + 4], false); menino.reagir('mao_na_testa', 0.6); menino.humor('triste');
      K.mirar([0.9, 3.4, CZ + 5.6], [0.0, 0.6, CZ - 1.5]);
    }
  };

  PV.grupo = {
    gancho(B, tc) {
      // NA TELA: o post gigante "Alguém faz site?" no meio do calçadão; a multidão de web designers correndo pra cima dele; o Henrique no meio, atropelado em "isso" · MOSTRA: personagem, post, multidao
      const tD = quando('designer', B, 0.1), tF = quando('Facebook', B, 0.4), tN = quando('não', B, 0.7), tI = quando('isso', B, 0.92);
      ve(X.postP); X.postP.mostrar('post', { n: 5 });
      // a multidão já correndo no 1º quadro; chega no post perto de "isso"
      multidaoEm(tc, K.lerp(0.45, 1, pc(tc, B.inicio, tI)), tc > tI);
      // PERSONAGEM: correndo · começo: corre com o notebook · em "isso": é atropelado e fica no chão, tonto
      const de = [0.95, 0, X.POST[2] + 4.4], ate = [0.9, 0, X.POST[2] + 1.6];
      if (tc < tI) { menino.irPara(de, ate, K.clamp(pc(tc, B.inicio, tI) * 0.95), tc, { correr: true }); menino.humor('bravo'); }
      else { menino.colocar(ate, [0.9, 0, CZ + 5]); menino.cair(K.clamp((tc - tI) / 0.25)); menino.humor('assustado'); fx.estr.em(mais(menino.g.position.toArray(), [0, 0.35, 0.9]), tc, { raio: 0.3 }); }
      // ENTRA AGORA: o post bate no chão (poeira) em "Facebook"
      fx.poof.em([X.POST[0] - 1.2, 0.3, X.POST[2]], tc - tF, { escala: 1.1, cor: 0xd8ccb4 });
      fx.poof2.em([X.POST[0] + 1.2, 0.3, X.POST[2]], tc - tF - 0.05, { escala: 1.1, cor: 0xd8ccb4 });
      // EFEITOS VISUAIS: "Web designer" · "Não faça isso" · o ✗ em "isso"
      if (tc < tN) fx.et.web.em({ tela: [540, 430] }, tc - tD); else fx.et.naoFaca.em({ tela: [540, 430] }, tc - tN);
      // SONS: passos de multidão · baque do post · plaft em "isso"
      for (let k = 0; k < 6; k++) K.som('passo', B.inicio + k * 0.4, 0.3);
      K.som('baque', tF, 0.7); K.som('tampa', tI, 0.8);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto, alto, o post e a multidão chegando · (2) baixo, de frente, a multidão vindo · (3) médio, esquerda, ele correndo · (4) de cima, ele no chão
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.5, tI - 0.1);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.6, K.lerp(6.2, 5.6, q), X.POST[2] + K.lerp(10.2, 9.6, q)], [0.3, 0.9, X.POST[2] + 0.5]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(-3.8, -3.5, q), 1.5, X.POST[2] - 0.2], [0.8, 1.0, X.POST[2] - 6]); }
      else if (tc < c3) { const c = mais(menino.g.position.toArray(), [0, 1.0, 0]); K.mirar([c[0] - 1.6, c[1] + 0.9, c[2] + 4.6], [c[0], c[1] - 0.05, c[2] - 1.2]); }
      else { const p = menino.g.position.toArray(); K.mirar([p[0] + 1.0, 3.0, p[2] + 4.8], [p[0], 0.5, p[2] - 0.5]); }
    },
    post(B, tc) {
      // NA TELA: o quarto; acima do monitor o post da dona do Bazar da Néia "Alguém faz site?"; ele sentado digitando muito rápido · MOSTRA: personagem, post_q, monitor
      const tP = quando('postou', B, 0.25), tCo = quando('correu', B, 0.75);
      ve(comp); comp.tela.desenhar(telaAntes, 'antes');
      ve(X.postQ); K.entrar(X.postQ.g, 'sobe', tc - tP, { dur: 0.4 }); X.postQ.mostrar('post', { n: tc > tCo ? 1 : 0 });
      // PERSONAGEM: sentado · começo: entediado, rolando · em "correu": arregala os olhos, digita rápido
      sentado([-0.5, 2.2, -1.0]);
      if (tc > tCo) { menino.reagir('digitando', tc * 2.5); menino.humor('surpreso'); fx.vel.em(mais(TECLADO, [0, 0.1, 0.3]), tc, { rumo: 0, raio: 0.4 }); }
      else { menino.reagir('digitando', tc * 0.6); menino.humor('normal'); }
      // o balão "Faço!" sobe do teclado até o post
      if (tc > tCo) { const b = X.coment[0], q = K.clamp((tc - tCo) / 0.5); ve(X.comentG); b.visible = true; b.position.set(-0.5, K.lerp(1.0, 1.65, q), K.lerp(-0.8, -0.95, q)); b.lookAt(K.camera.position); X.coment.slice(1).forEach((m) => { m.visible = false; }); }
      // EFEITOS VISUAIS: "Comentar rápido!" em "correu"
      fx.et.comentar.em({ tela: [540, 420] }, tc - tCo);
      // SONS: notificação · teclado rápido · whoosh do balão
      K.som('bip', tP, 0.5); for (let k = 0; k < 8; k++) K.som('clique', tCo + k * 0.07, 0.2); K.som('whoosh', tCo + 0.1, 0.3);
      // CÂMERA: (1) de trás do monitor, o rosto dele · (2) chegando, médio, direita, ele e o post
      if (tc < tCo) camRosto(K.suave(pc(tc, B.inicio, tCo)));
      else K.filmar([X.postQ, cabecaDe(menino, -0.2), MONITOR], 'chegando', pc(tc, tCo, B.ate), { plano: 'medio', lado: 24, altura: 'olho', tam: 2.0, obstaculos: false });
    },
    comentarios(B, tc) {
      // NA TELA: o post acima do monitor; a plaquinha "5º"; o contador 5 → 127; os balões de comentário cobrindo tudo; o balão "Faço por R$ 100" na cara dele · MOSTRA: personagem, post_q, comentarios
      const tQ = quando('quinto', B, 0.1), tDe = quando('Depois', B, 0.3), tCm = quando('comentários', B, 0.65), tRe = quando('reais', B, 0.92);
      ve(comp); comp.tela.desenhar(telaAntes, 'antes');
      const n = tc < tDe ? 5 : Math.round(K.lerp(5, 127, pc(tc, tDe, tCm)));
      ve(X.postQ); X.postQ.mostrar('post', { n });
      fx.cont.em([-0.5, 2.95, -0.9], tc - tDe, { de: 5, ate: 127, dur: Math.max(0.5, tCm - tDe), antes: '', depois: ' comentários', cor: '#e8352b', tam: 0.75 });
      // OBJETOS SE MEXENDO: os balões empilhando até tapar o monitor
      ve(X.comentG); X.coment.forEach((m) => { const t0 = tDe + m.userData.t; m.visible = tc > t0; if (!m.visible) return; m.position.set(...m.userData.pos); m.scale.setScalar(pop(tc - t0)); m.lookAt(K.camera.position); });
      // PERSONAGEM: começo: mostra o "5º" orgulhoso · em "reais": leva o balão na cara e cai pra trás
      menino.colocar(mais(EM_PE, [0.2, 0, 0.35]), [0.9, 1.4, 5]); cadeiraDoLado();
      if (tc > tRe) { menino.reagir('cai_sentado', tc - tRe); menino.humor('assustado'); }
      else if (tc > tDe) { menino.reagir('surpreso', tc - tDe); menino.humor('surpreso'); }
      else { menino.reagir('mostrando', tc - B.inicio); menino.humor('feliz'); }
      if (tc < tDe + 0.3) { ve(X.plaq5); const m = menino.mao(1); X.plaq5.position.set(m[0], m[1] + 0.25, m[2] + 0.08); X.plaq5.lookAt(K.camera.position); }
      if (tc > tRe - 0.35) { ve(X.grande); const c = cabecaDe(menino, -0.1), q = K.clamp((tc - tRe + 0.35) / 0.35); X.grande.position.set(K.lerp(-0.5, c[0], q), K.lerp(2.4, c[1], q), K.lerp(-0.9, c[2] + 0.35, q)); X.grande.lookAt(K.camera.position); }
      // EFEITOS VISUAIS: "5º" em "quinto" · "127 comentários" em "comentários" · "R$ 100?!" em "reais"
      if (tc < tCm) fx.et.quinto.em({ tela: [540, 400] }, tc - tQ); else if (tc < tRe) fx.et.coments.em({ tela: [540, 400] }, tc - tCm); else fx.et.cemReais.em({ tela: [540, 400] }, tc - tRe);
      // SONS: pling acelerando · plaft · rangido
      for (let k = 0; k < 6; k++) K.som('pingo', tDe + k * 0.16, 0.22); K.som('tampa', tRe, 0.7); K.som('range', tRe + 0.2, 0.3);
      // CÂMERA: (1) chegando, médio, de frente, ele com a plaquinha e o post · (2) afastando, médio, esquerda, os balões cobrindo tudo
      if (tc < tDe) K.filmar([menino, cabecaDe(menino, 0.3), [-0.5, 2.2, -1.0]], 'chegando', pc(tc, B.inicio, tDe), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.0, obstaculos: false });
      else { const q = K.suave(pc(tc, tDe, B.ate)); K.mirar([K.lerp(2.2, 2.6, q), 2.0, K.lerp(4.2, 4.8, q)], [0.0, 1.75, -0.5]); }
    },
    leilao(B, tc) {
      // NA TELA: (1) na porta do Bazar da Néia, a dona aperta a mão do sobrinho; a multidão olhando de longe; (2) o calendário vira "amanhã", um post novo cai e a multidão sai correndo, levando ele · MOSTRA: dona, sobrinho, multidao, personagem
      const tFe = quando('fechou', B, 0.12), tSo = quando('sobrinho', B, 0.3), tAm = quando('amanhã', B, 0.55), tLe = quando('leilão', B, 0.75), tPx = quando('próximo', B, 0.85);
      ve(X.postP, X.bazar); X.postP.mostrar('post', { n: 127 });
      X.dona.g.visible = true; X.sobrinho.g.visible = true;
      X.dona.colocar([-3.75, 0, 4.4], [-3.0, 1.3, 4.6]); X.sobrinho.colocar([-3.0, 0, 4.6], [-3.75, 1.3, 4.4]);
      if (tc > tFe) { X.dona.reagir('mostrando', tc - tFe); X.sobrinho.reagir('mostrando', tc - tFe); X.dona.humor('feliz'); X.sobrinho.humor('feliz'); }
      // a multidão no post, olhando; em "próximo" vira e sai correndo pro post novo
      multidaoVira(tc, tc > tPx ? (tc - tPx) / 1.2 : 0);
      if (tc > tPx - 0.3) { ve(X.postNovo); X.postNovo.mostrar('post', { n: 0 }); K.entrar(X.postNovo.g, 'cai', tc - tPx + 0.3, { altura: 5, destaque: false }); }
      // o calendário vira em "amanhã"
      if (tc > tAm) { ve(X.cal); X.cal.mostrar('calendario', { dia: tc > tAm + 0.3 ? 'AMANHÃ' : 'HOJE' }); }
      // PERSONAGEM: começo: olha o aperto de mão, desanimado · em "próximo": é arrastado pela multidão
      const P0 = [1.1, 0, X.POST[2] + 1.3];
      if (tc > tPx) { menino.irPara(P0, [1.0, 0, -7.5], K.clamp((tc - tPx) / 1.3), tc, { correr: true }); menino.humor('assustado'); }
      else { menino.colocar(P0, [-3.4, 1.3, 4.5]); menino.reagir('ombros', tc - tSo); menino.humor('triste'); }
      // EFEITOS VISUAIS: "O sobrinho" em "sobrinho" · "Amanhã: de novo" em "leilão"
      if (tc < tLe) fx.et.sobrinho.em([-3.4, 2.6, 4.5], tc - tSo); else fx.et.amanha.em({ tela: [540, 400] }, tc - tLe);
      // SONS: tapinha · errado · folha · passos de novo
      K.som('estalo', tFe + 0.2, 0.4); K.som('errado', tSo + 0.2, 0.4); K.som('whoosh', tAm, 0.3); K.som('baque', tPx + 0.2, 0.5);
      for (let k = 0; k < 4; k++) K.som('passo', tPx + 0.2 + k * 0.3, 0.3);
      // CÂMERA: (1) fixa da calçada oposta, a porta da loja com os dois e a multidão na borda · (2) passando, aberto, alto, a multidão virando
      if (tc < tAm) { const q = K.suave(pc(tc, B.inicio, tAm)); K.mirar([-4.9, 2.2, K.lerp(10.0, 9.4, q)], [-3.2, 1.3, 4.4]); }
      else { const q = K.suave(pc(tc, tAm, B.ate)); K.mirar([K.lerp(1.0, 0.4, q), K.lerp(5, 7, q), CZ + K.lerp(3, 4, q)], [0.2, 0.5, K.lerp(X.POST[2], -6, q)]); }
    },
    virada(B, tc) {
      // NA TELA: a multidão brigando em cima do post ("300 x 1"); a câmera vira pro outro lado da rua, calmo: as lojas com os pinos verdes "sem site" acendendo; ele sai da multidão e olha · MOSTRA: personagem, multidao, pinos
      const tTr = quando('trezentos', B, 0.3), tFo = quando('Fora', B, 0.5), tEm = quando('empresa', B, 0.72), tPr = quando('procurou', B, 0.95);
      ve(X.postP); X.postP.mostrar('post', { n: 127 });
      multidaoEm(tc, 1, true);
      // ENTRA AGORA: os pinos verdes um por um de "empresa" a "procurou"
      X.pinosR.forEach((p, i) => { const t0 = tEm + i * Math.max(0.08, (tPr - tEm) / 6); if (tc > t0) { ve(p); p.em(tc, pop(tc - t0)); K.som('estalo', t0, 0.25); } });
      // PERSONAGEM: começo: sai da multidão engatinhando · em "procurou": de pé, aponta as lojas
      const P0 = [1.0, 0, X.POST[2] + 1.5], P1 = [1.6, 0, X.POST[2] + 3.2];
      if (tc < tFo) { menino.irPara(P0, P1, pc(tc, B.inicio, tFo), tc, {}); menino.humor('triste'); }
      else { menino.colocar(P1, [5.2, 2.5, 5]); if (tc > tPr) { menino.apontar(0.7); menino.humor('surpreso'); } else { menino.reagir('surpreso', tc - tFo); menino.humor('surpreso'); } }
      // EFEITOS VISUAIS: "300 x 1" em "trezentos" · "Ninguém procurou" em "procurou"
      if (tc < tFo) fx.et.x300.em({ tela: [540, 400] }, tc - tTr); else fx.et.ninguem.em({ tela: [540, 400] }, tc - tPr);
      // SONS: briga abafada · silêncio · estalos · ding
      for (let k = 0; k < 3; k++) K.som('passo', B.inicio + k * 0.4, 0.25); K.som('ding', tPr, 0.6);
      // CÂMERA: (1) chegando, médio, de frente, a multidão em cima do post · (2) virando, aberto, as lojas da direita com os pinos e ele na frente
      if (tc < tFo) { const q = K.suave(pc(tc, B.inicio, tFo)); K.mirar([0.6, 3.0, X.POST[2] + K.lerp(7.5, 6.5, q)], [0.25, 0.7, X.POST[2]]); }
      else { const q = K.suave(pc(tc, tFo, B.ate)); K.mirar([K.lerp(0.2, -0.6, q), 2.4, X.POST[2] + K.lerp(6.5, 9.5, q)], [K.lerp(0.6, 4.5, q), 2.4, K.lerp(X.POST[2], 4.0, q)]); }
    },
    antes(B, tc, tA) {
      // (1) Antes: a multidão brigando em cima do post e ele no chão embaixo
      ve(X.postP); X.postP.mostrar('post', { n: 127 }); multidaoEm(tc, 1, true);
      const p = [0.9, 0, X.POST[2] + 1.6]; menino.colocar(p, [0.9, 0, CZ + 5]); menino.cair(1); menino.humor('triste');
      fx.estr.em(mais(p, [0, 0.35, 0.9]), tc, { raio: 0.3 });
      fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
      for (let k = 0; k < 3; k++) K.som('passo', B.inicio + k * 0.35, 0.25); K.som('errado', B.inicio + 0.4, 0.3);
      const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([0.6, K.lerp(5.5, 7, q), X.POST[2] + K.lerp(6, 7, q)], [0.25, 0.3, X.POST[2]]);
    },
    capa() {
      ve(X.postP); X.postP.mostrar('post', { n: 127 }); multidaoEm(1.2, 1, true);
      const p = [0.9, 0, X.POST[2] + 1.6]; menino.colocar(p, [0.9, 0, CZ + 5]); menino.cair(1); menino.humor('assustado');
      fx.estr.em(mais(p, [0, 0.35, 0.9]), 1.2, { raio: 0.3 });
      K.mirar([0.7, 3.4, X.POST[2] + 5.2], [0.4, 0.5, X.POST[2] + 0.3]);
    }
  };

  // ---------- Placa na rua ----------
  // a placa gigante presa na mão dele (o cabo sai da mão, o papelão bem acima da cabeça)
  function segurarPlaca(b, caida = 0) {
    ve(X.placa); b.g.updateMatrixWorld(true); const m = b.mao(1);
    X.placa.position.set(m[0], m[1] - 0.15, m[2] + 0.08);
    X.placa.rotation.set(-caida * 1.45, 0, caida * 0.2);
    if (caida > 0) X.placa.position.y = K.lerp(m[1] - 0.15, 0.05, caida);
  }
  // a gente passando, em fila, sem olhar pra ele
  function genteAnda(tc, vel = 1) {
    X.gente.forEach((p) => {
      p.b.g.visible = true;
      const k = (((tc * 0.12 * vel + p.fase * 0.2) % 1) + 1) % 1;
      p.b.irPara(p.de, p.ate, k, tc + p.fase, {});
      p.b.humor('normal');
    });
  }
  function emPePlaca(tc, humor) {
    menino.colocar(X.PL, [0.4, 1.4, CZ + 6]); menino.reagir('segurando', tc); menino.humor(humor || 'triste');
    segurarPlaca(menino); ve(X.copo);
  }

  PV.placa = {
    gancho(B, tc) {
      // NA TELA: o calçadão; ele pequenininho segurando a placa de papelão GIGANTE "FAÇO SITE"; as pessoas passando, ninguém olha · MOSTRA: personagem, placa, gente
      const tRu = quando('rua', B, 0.4), tPe = quando('pedindo', B, 0.7);
      emPePlaca(tc, tc > tPe ? 'triste' : 'normal');
      if (tc > tPe) menino.reagir('ombros', tc - tPe);
      genteAnda(tc, 1.4);
      // EFEITOS VISUAIS: "Pedindo cliente" em "pedindo"
      fx.et.pedindo.em({ tela: [540, 430] }, tc - tPe);
      // SONS: passos o tempo todo · vento · triste no fim
      for (let k = 0; k < 7; k++) K.som('passo', B.inicio + k * 0.38, 0.25);
      K.som('whoosh', B.inicio + 0.05, 0.4); K.som('errado', tPe + 0.2, 0.35);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto e alto, a placa enorme e ele pequeno · (2) de baixo, de frente, a placa · (3) médio, esquerda, o rosto · (4) passando, a gente indo embora
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.6, tRu);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.7, K.lerp(5.6, 5.0, q), CZ + K.lerp(9.5, 8.8, q)], [0.4, 1.7, CZ]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([0.5, 0.55, CZ + K.lerp(6.0, 5.4, q)], [0.4, 2.3, CZ]); }
      else if (tc < c3) { const c = cabecaDe(menino, -0.3); const q = K.suave(pc(tc, c2, c3)); K.mirar([c[0] - K.lerp(1.4, 1.2, q), c[1] + 0.35, c[2] + 3.2], [c[0], c[1] + 0.2, c[2]]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(3.0, 2.6, q), 1.9, CZ + 6.0], [0.4, 1.9, CZ - 0.5]); }
    },
    portfolio(B, tc) {
      // NA TELA: o quarto; ele sentado, o portfólio no monitor; em "curtida" ele de pé com o celular: "1 curtida · Mãe" · MOSTRA: personagem, monitor, celular
      const tPo = quando('postei', B, 0.35), tCu = quando('curtida', B, 0.7), tMa = quando('mãe', B, 0.92);
      ve(comp); comp.tela.desenhar(telaPortfolio, 'port');
      if (tc < tCu - 0.15) {
        // PERSONAGEM: começo: sentado montando o portfólio · em "postei": clica e comemora
        sentado(MONITOR);
        if (tc > tPo) { menino.reagir('vitoria', tc - tPo); menino.humor('feliz'); } else { menino.reagir('digitando', tc); menino.humor('feliz'); }
        fx.et.portfolio.em({ tela: [540, 420] }, tc - tPo);
        K.som('clique', tPo, 0.5); K.som('brilho', tPo + 0.1, 0.4);
        // CÂMERA: (1) de trás do monitor, o rosto dele animado
        camRosto(K.suave(pc(tc, B.inicio, tCu)));
      } else {
        // em "curtida": de pé, o celular com 1 curtida · em "mãe": olha pra câmera, desanimado
        cadeiraDoLado();
        menino.colocar(mais(EM_PE, [0, 0, 0.35]), [0.9, 1.4, 5]);
        menino.reagir('celular', tc); menino.humor(tc > tMa ? 'triste' : 'surpreso');
        celularNa(menino, (c, w, h) => celCurtida(c, w, h, { mae: tc > tMa }), 'cu' + (tc > tMa));
        if (tc < tMa) fx.et.curtida.em({ tela: [540, 400] }, tc - tCu); else fx.et.mae.em({ tela: [540, 400] }, tc - tMa);
        K.som('bip', tCu, 0.5); K.som('errado', tMa + 0.1, 0.4);
        // CÂMERA: (2) chegando, perto, de frente, ele e o celular
        K.filmar([menino, cabecaDe(menino, 0.35), cel.g.position.toArray()], 'chegando', pc(tc, tCu - 0.15, B.ate), { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 1.5 });
      }
    },
    maps(B, tc) {
      // NA TELA: o quarto de madrugada; as abas do Google Maps empilhando do monitor até o teto; o relógio 23:40 → 3:12; em "Nada" ele cai com a cara na mesa e o ✗ · MOSTRA: personagem, abas, relogio
      const tMa = quando('Maps', B, 0.25), tUm = quando('uma', B, 0.45), tMd = quando('madrugada', B, 0.75), tNa = quando('Nada', B, 0.9);
      ve(comp); comp.tela.desenhar(telaAntes, 'antes');
      // OBJETOS SE MEXENDO: uma aba nova a cada ~0,12 s a partir de "Maps"
      ve(X.abasG); const n = tc < tMa ? 0 : Math.min(X.abas.length, 1 + Math.floor((tc - tMa) / 0.12));
      X.abas.forEach((m, i) => { m.visible = i < n; if (!m.visible) return; m.position.set(...m.userData.pos); m.rotation.set(0, 0, m.userData.rz); m.scale.setScalar(pop(tc - tMa - i * 0.12)); });
      ve(X.relogio); X.relogio.mostrar('relogio', { hora: tc > tMd ? '03:12' : tc > tUm ? '01:05' : '23:40', noite: tc > tMd });
      // PERSONAGEM: sentado · começo: clica rápido, olhos arregalados · em "Nada": a cabeça cai na mesa
      sentado(MONITOR);
      if (tc > tNa) { menino.reagir('mao_na_testa', tc - tNa); menino.humor('triste'); } else { menino.reagir('digitando', tc * 2); menino.humor(tc > tMd ? 'triste' : 'normal'); }
      // EFEITOS VISUAIS: "Uma por uma" em "uma" · "3 da manhã" em "madrugada" · o ✗ em "Nada"
      if (tc < tMd) fx.et.umaUma.em({ tela: [540, 400] }, tc - tUm); else if (tc < tNa) fx.et.madrugada.em({ tela: [540, 400] }, tc - tMd); else fx.et.nada.em({ tela: [540, 400] }, tc - tNa);
      if (tc > tNa) fx.simb.em(mais(MONITOR, [0, 0.9, 0.3]), tc - tNa, { tipo: '✗', tam: 0.9 });
      // SONS: cliques rápidos · tique do relógio · errado em "Nada"
      for (let k = 0; k < 10; k++) K.som('clique', tMa + k * 0.12, 0.15);
      K.som('clique', tMd, 0.5); K.som('errado', tNa, 0.6);
      // CÂMERA: (1) afastando, fixa de fora (lição do grupo: K.mirar de [2,2, 2, 4,2]), as abas subindo · (2) de trás do monitor, o rosto
      if (tc < tMd) { const q = K.suave(pc(tc, B.inicio, tMd)); K.mirar([K.lerp(1.9, 2.2, q), 2.1, K.lerp(3.6, 4.2, q)], [-0.35, K.lerp(1.6, 2.4, q), -1.2]); }
      else camRosto(K.suave(pc(tc, tMd, B.ate)));
    },
    placa(B, tc) {
      // NA TELA: (1) a rua; o calendário vira SEMANA 1 → 3; (2) ele entra com a placa e para; (3) uma moeda cai no copinho: "R$ 1 de esmola" · MOSTRA: personagem, placa, calendario
      const tSe = quando('semanas', B, 0.1), tZe = quando('zero', B, 0.22), tPe = quando('Peguei', B, 0.35), tRu = quando('rua', B, 0.6), tGa = quando('Ganhei', B, 0.7), tEs = quando('esmola', B, 0.92);
      genteAnda(tc);
      ve(X.cal); X.cal.mostrar('calendario', { mes: 'SEMANA', dia: tc > tZe ? '3' : tc > tSe + 0.25 ? '2' : '1' });
      // PERSONAGEM: começo: entra andando com a placa · em "rua": para · em "esmola": olha a moeda, mão na testa
      const de = [-1.6, 0, CZ - 0.2];
      if (tc < tRu) { menino.irPara(de, X.PL, K.clamp(pc(tc, B.inicio, tRu)), tc, {}); menino.humor('triste'); segurarPlaca(menino); ve(X.copo); }
      else if (tc < tEs) emPePlaca(tc);
      else { emPePlaca(tc); menino.reagir('mao_na_testa', tc - tEs); }
      // a moeda cai do alto no copinho em "Ganhei"
      if (tc > tGa - 0.2) { ve(X.moedaR); const q = K.clamp((tc - tGa + 0.2) / 0.5); X.moedaR.position.set(K.lerp(1.9, 1.0, q), K.lerp(1.8, 0.24, q) + Math.sin(q * PI) * 0.5, CZ + 0.35); X.moedaR.rotation.set(tc * 9, 0, 0.3); }
      // EFEITOS VISUAIS: "Zero cliente" em "zero" · "R$ 1 de esmola" em "esmola"
      if (tc < tGa) fx.et.zero.em({ tela: [540, 400] }, tc - tZe); else fx.et.esmola.em({ tela: [540, 400] }, tc - tEs);
      // SONS: folhas do calendário · passos · plim da moeda
      K.som('whoosh', tSe + 0.25, 0.3); K.som('whoosh', tZe, 0.3); K.som('passo', tPe, 0.3); K.som('passo', tPe + 0.4, 0.3);
      K.som('pingo', tGa + 0.3, 0.6); K.som('errado', tEs + 0.1, 0.35);
      // CÂMERA: (1) chegando, médio, o calendário e ele entrando · (2) perto, de cima, o copinho com a moeda e ele
      if (tc < tGa) { const q = K.suave(pc(tc, B.inicio, tGa)); K.mirar([K.lerp(1.2, 0.9, q), 3.0, CZ + K.lerp(10.0, 9.0, q)], [-0.2, 1.9, CZ]); }
      else { const q = K.suave(pc(tc, tGa, B.ate)); K.mirar([K.lerp(2.4, 2.1, q), 1.9, CZ + K.lerp(3.4, 3.0, q)], [0.75, 0.9, CZ + 0.2]); }
    },
    conselho(B, tc) {
      // NA TELA: a rua; o senhor de óculos para na frente dele; em "precisa" os pinos verdes acendem nas lojas sem site · MOSTRA: personagem, dono, pinos
      const tPa = quando('parou', B, 0.18), tNi = quando('ninguém', B, 0.3), tVa = quando('Vai', B, 0.62), tPr = quando('precisa', B, 0.92);
      genteAnda(tc, 0.8);
      // PERSONAGEM: ele com a placa · em "Vai": abaixa a placa e olha as lojas
      menino.colocar(X.PL, tc > tVa ? [5, 2.5, CZ - 2] : [1.6, 1.4, CZ + 0.6]);
      if (tc > tVa) { menino.reagir('surpreso', tc - tVa); menino.humor('surpreso'); segurarPlaca(menino, K.clamp((tc - tVa) / 0.5)); }
      else { menino.reagir('segurando', tc); menino.humor('triste'); segurarPlaca(menino); }
      ve(X.copo);
      // o senhor: chega andando até "parou" · em "ninguém": balança a cabeça · em "Vai": aponta as lojas
      dono.g.visible = true; const D = [1.6, 0, CZ + 0.6];
      if (tc < tPa) { dono.irPara([1.9, 0, CZ - 4], D, K.clamp(pc(tc, B.inicio, tPa)), tc, {}); }
      else { dono.colocar(D, tc > tVa ? [5, 2.5, CZ - 2] : cabecaDe(menino, -0.5)); if (tc > tVa) dono.apontar(0.8); else dono.reagir('nao', tc - tNi); }
      dono.humor('normal');
      // ENTRA AGORA: os pinos verdes um por um de "quem" a "precisa"
      X.pinos.forEach((p, i) => { const t0 = tVa + 0.2 + i * Math.max(0.08, (tPr - tVa) / 7); if (tc > t0) { ve(p); p.em(tc, pop(tc - t0)); K.som('estalo', t0, 0.25); } });
      // EFEITOS VISUAIS: "Ninguém vai te procurar" em "ninguém" · "Vai atrás" em "Vai"
      if (tc < tVa) fx.et.ninguemP.em({ tela: [540, 400] }, tc - tNi); else fx.et.vaiAtras.em({ tela: [540, 400] }, tc - tVa);
      K.som('passo', B.inicio + 0.1, 0.3); K.som('passo', B.inicio + 0.5, 0.3); K.som('ding', tPr, 0.6); K.som('baque', tVa + 0.5, 0.4);
      // CÂMERA: (1) médio, de lado, os dois e a placa · (2) virando, aberto, as lojas com os pinos
      if (tc < tVa) { const q = K.suave(pc(tc, B.inicio, tVa)); K.mirar([K.lerp(-1.4, -1.1, q), 1.9, CZ + K.lerp(4.4, 3.8, q)], [1.0, 1.4, CZ + 0.3]); }
      else { const q = K.suave(pc(tc, tVa, B.ate)); K.mirar([K.lerp(-0.6, -1.3, q), K.lerp(2.4, 3.2, q), CZ + K.lerp(6.0, 8.5, q)], [K.lerp(1.0, 2.3, q), 2.0, K.lerp(CZ, CZ - 1.0, q)]); }
    },
    investe(B, tc) {
      // NA TELA: o quarto; a placa encostada cai em "decidi"; ele senta e o mapa com os pinos verdes acende no monitor · MOSTRA: personagem, monitor
      const tDe = quando(W('decidi'), B, 0.12), tIn = quando('investir', B, 0.25), tFe = quando('ferramenta', B, 0.45), tPr = quando(W('precisam'), B, 0.75);
      ve(comp);
      // OBJETOS SE MEXENDO: a placa tomba pra trás em "decidi" (no sobrinho: o lixo com o orçamento amassado)
      if (X.placaQ) { ve(X.placaQ); const qp = K.suave(K.clamp((tc - tDe) / 0.4)); X.placaQ.rotation.set(-qp * 1.5, 0, 0); X.placaQ.position.set(1.55, 0.02, -0.95); }
      if (X.lixo) { ve(X.lixo, X.bola); X.bola.position.set(...mais(LIXO, [0, 0.38, 0])); }
      const n = tc > tPr ? Math.min(6, 1 + Math.floor((tc - tPr) / 0.08)) : tc > tFe ? 1 : 0;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      // PERSONAGEM: começo: de pé, decidido, faz que sim · em "ferramenta": senta e digita
      if (tc < tFe) { cadeiraDoLado(); menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.reagir(tc > tDe ? 'sim' : 'pensando', tc - B.inicio); menino.humor(tc > tDe ? 'feliz' : 'normal'); }
      else { sentado(MONITOR); menino.reagir('digitando', tc); menino.humor('feliz'); }
      // EFEITOS VISUAIS: "Investir" em "investir" · "Quem precisa de você" em "precisam"
      if (tc < tPr) fx.et.investir.em({ tela: [540, 450] }, tc - tIn); else fx.et.quem.em({ tela: [540, 450] }, tc - tPr);
      K.som('baque', tDe + 0.35, 0.5); K.som('brilho', tFe, 0.5); for (let k = 0; k < 6; k++) K.som('estalo', tPr + k * 0.08, 0.2);
      // CÂMERA: (1) chegando, médio, ele decidido e a placa caindo · (2) de trás do monitor, o rosto com o mapa acendendo
      if (tc < tFe) K.filmar([menino, cabecaDe(menino, 0.4), X.lixo ? mais(LIXO, [0, 0.4, 0]) : [1.55, 0.6, -0.95]], 'chegando', pc(tc, B.inicio, tFe), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.25, obstaculos: false, tam: 1.7 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), cabecaDe(menino, 0)], 'subindo', pc(tc, tFe, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    campanha(B, tc) {
      // NA TELA: acima do monitor a campanha (o funil): a clínica passa de "Novos" pra "Contato enviado"; depois a mensagem personalizada se escrevendo · MOSTRA: tela, personagem, monitor
      const tCa = quando('campanha', B, 0.15), tEn = quando(W('enviei'), B, 0.45), tMe = quando('mensagem', B, 0.6), tPr = quando(W('pronta'), B, 0.92);
      ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      ve(telaQ); K.entrar(telaQ.g, 'sobe', tc - tCa + 0.2, { dur: 0.4 });
      if (tc < tMe) telaQ.mostrar('funilV', { mover: K.clamp((tc - tEn + 0.2) / 0.5) });
      else telaQ.mostrar('mensagemV', { digitado: Math.round(K.clamp((tc - tMe) / 0.9) * 20) / 20 });
      // PERSONAGEM: sentado clicando · em "pronta": de pé, aponta a tela
      if (tc < tPr) { sentado(TELA_Q); menino.reagir(tc < tEn ? 'digitando' : 'surpreso', tc - tCa); }
      else { cadeiraDoLado(); menino.colocar(mais(EM_PE, [0.2, 0, 0.2]), TELA_Q); menino.apontar(0.6); }
      menino.humor('feliz');
      if (tc < tMe) fx.et.nota.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCa); else fx.et.msg.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tMe);
      K.som('clique', tCa, 0.5); K.som('whoosh', tEn, 0.4); for (let k = 0; k < 6; k++) K.som('clique', tMe + k * 0.12, 0.15); K.som('ding', tPr, 0.5);
      // CÂMERA: (1) chegando, médio, direita, a campanha e ele · (2) parado, perto, de frente, a mensagem inteira
      if (tc < tMe) K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tMe), { plano: 'medio', lado: 18, altura: 'olho', tam: 1.6, obstaculos: false });
      else K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0])], 'parado', pc(tc, tMe, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.3, obstaculos: false });
    },
    venda(B, tc) {
      // NA TELA: (1) o contador "Enviadas 30" e os ✗ das respostas; (2) no celular chega "Pode vir aqui! 😊" · MOSTRA: personagem, celular
      const tTr = quando('trinta', B, 0.12), tNa = quando('não', B, 0.4), tMas = quando('Mas', B, 0.55), tRe = quando('respondeu', B, 0.68), tAq = quando(CFG.palavraFim, B, 0.92);
      ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      menino.colocar(mais(EM_PE, [0, 0, 0.35]), [0.9, 1.4, 5]);
      if (tc < tMas) {
        fx.cont.em(mais(EM_PE, [0.2, 2.75, 0.3]), tc - B.inicio, { de: 1, ate: 30, dur: Math.max(0.4, tTr - B.inicio + 0.2), antes: 'Enviadas ', depois: '', cor: '#1067f8' });
        const ps = [[-0.75, 1.5, 0.3], [0.75, 1.8, 0.2], [-0.55, 1.1, 0.4], [0.65, 1.2, 0.4]];
        [fx.simb, fx.simb3, fx.simb4].forEach((s, i) => { const dt = tc - (tNa - 0.35 + i * 0.12); if (dt > 0) s.em(mais(EM_PE, ps[i]), dt % 0.5, { tipo: '✗', tam: 0.55, som: false }); });
        // PERSONAGEM: começo: manda no celular · nos "não": ombros caídos
        if (tc > tNa) { menino.reagir('ombros', tc - tNa); menino.humor('triste'); } else { menino.reagir('celular', tc); menino.humor('normal'); }
        if (tc < tNa) celularNa(menino, (c, w, h) => K.telasMappoa.mensagemV(c, w, h, { digitado: 1 }), 'msg');
        fx.et.semResp.em({ tela: [540, 400] }, tc - tNa);
        K.som('whoosh', B.inicio + 0.1, 0.4); for (let k = 0; k < 4; k++) K.som('errado', tNa - 0.3 + k * 0.15, 0.12);
        // CÂMERA: (1) passando, médio, direita, ele e os ✗
        K.filmar([menino, cabecaDe(menino, 0.5), mais(EM_PE, [0.2, 2.75, 0.3]), mais(EM_PE, [-0.75, 1.3, 0.3]), mais(EM_PE, [0.75, 1.3, 0.3])], 'passando', pc(tc, B.inicio, tMas), { plano: 'medio', lado: 22, altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 2.0 });
      } else {
        // em "respondeu": o celular vibra com a resposta · em "aqui": pulinhos
        menino.reagir(tc > tAq ? 'comemorando' : 'celular', tc - tAq); menino.humor(tc > tRe ? 'feliz' : 'surpreso');
        celularNa(menino, (c, w, h) => celResposta(c, w, h, { chegou: tc > tRe }), 'r' + (tc > tRe));
        fx.et.venda.em({ tela: [540, 400] }, tc - tAq);
        if (tc > tRe) fx.simb.em(mais(cabecaDe(menino, 0.35), [0.5, 0, 0]), tc - tRe, { tipo: '!', tam: 0.7 });
        K.som('bip', tRe, 0.6); K.som('certo', tAq, 0.5);
        // CÂMERA: (2) chegando, perto, de frente, o celular e o rosto
        K.filmar([cel.g.position.toArray(), cabecaDe(menino, 0.25), menino], 'chegando', pc(tc, tMas, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 1.3 });
      }
    },
    reencontro(B, tc) {
      // NA TELA: a recepção da clínica; o dono de costas no balcão; em "senhor" ele se vira: é o senhor da rua; em "riu" ri; aperto de mão, ✓ e "Era ele!" · MOSTRA: personagem, dono
      const tCh = quando('Cheguei', B, 0.05), tDo = quando('dono', B, 0.3), tSe = quando('senhor', B, 0.5), tRi = quando('riu', B, 0.7), tNe = quando('né', B, 0.95);
      const L = VENDA.clinica;
      // PERSONAGEM: começo: entra andando · em "senhor": para, surpreso · em "né": aperta a mão, comemora
      if (tc < tDo) { menino.irPara(L.de, L.heroi, K.clamp(pc(tc, tCh, tDo)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(L.heroi, cabecaDe(dono, -0.5)); if (tc > tNe) menino.reagir('comemorando', tc - tNe); else menino.reagir('surpreso', tc - tSe); menino.humor(tc > tRi ? 'feliz' : 'surpreso'); }
      // o dono: de costas (olhando o balcão) até "senhor", depois vira pra ele e ri
      dono.g.visible = true;
      if (tc < tSe) { dono.colocar(L.dono, [L.dono[0] - 1.5, 1.2, L.dono[2] - 1.5]); dono.humor('normal'); }
      else { dono.colocar(L.dono, [L.heroi[0], 1.2, L.heroi[2]]); dono.reagir(tc > tRi ? 'mostrando' : 'surpreso', tc - tSe); dono.humor('feliz'); }
      // EFEITOS VISUAIS: "Era ele!" em "senhor" · o ✓ em "né" · o dinheiro
      fx.et.fechou.em({ tela: [540, 400] }, tc - tSe);
      fx.simb.em(cabecaDe(dono, 0.45), tc - tNe + 0.1, { tipo: '✓', tam: 1.0 });
      fx.grana.em(mais(L.heroi, [-0.4, 0, 0]), tc - tNe, { raio: 1.2, altura: 3, dur: 1.4 });
      K.som('passo', tCh + 0.1, 0.3); K.som('passo', tCh + 0.45, 0.3); K.som('whoosh', tSe, 0.4); K.som('ding', tSe + 0.1, 0.5); K.som('festa', tNe, 0.5);
      // CÂMERA: (1) chegando, médio, de frente, ele entrando e o dono de costas · (2) passando, médio, esquerda, o rosto do dono
      if (tc < tSe) K.filmar([dono, menino, cabecaDe(dono, 0.3), cabecaDe(menino, 0.3)], 'chegando', pc(tc, B.inicio, tSe), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.6, obstaculos: false });
      else K.filmar([dono, menino, cabecaDe(dono, 0.3), cabecaDe(menino, 0.3)], 'passando', pc(tc, tSe, B.ate), { plano: 'medio', lado: -20, altura: 'olho', tam: 1.5, obstaculos: false });
    },
    antes() {},
    capa() {
      genteAnda(1.5, 1.4);
      emPePlaca(1, 'triste'); menino.reagir('segurando', 1);
      K.mirar([0.6, 0.9, CZ + 6.2], [0.4, 2.0, CZ]);
    }
  };


  // ---------- Sobrinho de 14 anos ----------
  const GH = [0.95, 0, CZ + 0.2], GD = [-0.75, 0, CZ - 0.1], GK = [-1.55, 0, CZ + 0.45];
  // onde o sobrinho do gancho está no tempo tc: vem voando do fundo da rua, passa entre os dois em tG e freia do lado do dono
  function sobGancho(tc, t0, tG, tPa) {
    const S0 = [0.15, 0, CZ - 9], G = [0.2, 0, CZ + 0.2];
    if (tc < tG) { const q = K.clamp((tc - t0) / Math.max(0.3, tG - t0)); return { p: [K.lerp(S0[0], G[0], q), 0, K.lerp(S0[2], G[2], q)], olhar: [0.2, 1, CZ + 6], anda: true }; }
    const q = K.suave(K.clamp((tc - tG) / Math.max(0.3, tPa - tG)));
    const p = [K.lerp(G[0], GK[0], q), 0, K.lerp(G[2], GK[2], q) + Math.sin(q * PI) * 1.1];
    return { p, olhar: q < 1 ? [p[0] - 2, 1, p[2] + 1] : [GD[0], 1.2, GD[2]], anda: q < 1 };
  }
  // a câmera de uma loja da rua, do calçadão do lado oposto (o sobrinho na porta)
  function camLoja(l, q) {
    const L = l.lado, p = l.porta;
    K.mirar([-L * K.lerp(0.9, 0.6, q), 1.9, p[2] + K.lerp(4.8, 4.2, q)], [p[0] - L * 1.0, 1.6, p[2] - 0.3]);
  }
  const portaDe = (l) => [l.porta[0] - l.lado * 0.7, 0, l.porta[2] + 0.2];

  PV.sobrinho = {
    gancho(B, tc) {
      // NA TELA: o calçadão, a placa da escola; ele estende o contrato pro dono; o sobrinho de skate passa voando, arranca o contrato e entrega pro dono, que aperta a mão do menino; ele fica de boca aberta · MOSTRA: personagem, sobrinho, contrato
      const tCl = quando('cliente', B, 0.3), tSo = quando('sobrinho', B, 0.6), tCa = quando('catorze', B, 0.8);
      ve(X.escola);
      // OBJETOS SE MEXENDO: o sobrinho já vem voando no 1º quadro; arranca o contrato em "cliente"; entrega em "sobrinho"
      const s = sobGancho(tc, B.inicio - 0.6, tCl, tSo);
      noSkate(X.sob, s.p, s.olhar);
      if (s.anda) fx.vel.em(mais(s.p, [0, 0.7, 0]), tc, { rumo: X.sob.g.rotation.y, raio: 0.5 });
      if (tc > tCa) { X.sob.reagir('mostrando', tc - tCa); X.sob.humor('feliz'); } else if (tc > tCl) { X.sob.reagir('vitoria', tc - tCl); X.sob.humor('feliz'); } else X.sob.humor('feliz');
      // PERSONAGEM: começo: estende o contrato pro dono, sorrindo · em "cliente": leva o susto · depois: parado, de boca aberta
      if (tc < tCl) { menino.colocar(GH, [GD[0], 1.3, GD[2]]); menino.reagir('mostrando', tc - B.inicio); menino.humor('feliz'); }
      else { menino.colocar(GH, [X.sob.g.position.x, 1.1, X.sob.g.position.z]); menino.reagir(tc < tSo ? 'susto' : 'surpreso', tc - tCl); menino.humor('surpreso'); }
      // o dono: olha o contrato · em "sobrinho": vira pro menino · em "catorze": aperta a mão dele
      dono.g.visible = true;
      dono.colocar(GD, tc < tSo ? [GH[0], 1.3, GH[2]] : [X.sob.g.position.x, 1.1, X.sob.g.position.z]);
      if (tc > tCa) dono.reagir('mostrando', tc - tCa); else dono.reagir('segurando', tc);
      dono.humor('feliz');
      // o contrato: na mão dele, na do sobrinho (em "cliente") e na do dono (em "sobrinho")
      ve(X.contrato);
      const quem = tc < tCl ? menino : tc < tSo ? X.sob : dono;
      const m = quem.mao(1); X.contrato.position.set(m[0], m[1] + 0.18, m[2] + 0.05);
      // EFEITOS VISUAIS: "O sobrinho" em "sobrinho" · "14 anos" em "catorze" · o ✓ do aperto de mão
      if (tc < tCa) fx.et.sobrinho.em({ tela: [540, 430] }, tc - tSo); else fx.et.quatorze.em({ tela: [540, 430] }, tc - tCa);
      if (tc > tCa) fx.simb.em(mais(cabecaDe(dono, 0.4), [0.3, 0, 0]), tc - tCa, { tipo: '✓', tam: 0.7 });
      if (tc > tCl) fx.simb2.em(cabecaDe(menino, 0.35), tc - tCl, { tipo: '!', tam: 0.6, som: false });
      // SONS: o skate vindo · o puxão do contrato · o ding do aperto de mão
      K.som('whoosh', B.inicio + 0.05, 0.5); K.som('whoosh', tCl - 0.15, 0.6); K.som('estalo', tCl, 0.6); K.som('ding', tCa, 0.5); K.som('errado', tCa + 0.3, 0.35);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto e alto, o skate vindo pela rua · (2) de baixo, de frente, o puxão do contrato · (3) médio, direita, o sobrinho entregando pro dono · (4) perto, o rosto dele de boca aberta
      const c1 = B.inicio + 0.7, c2 = Math.max(c1 + 0.5, tCl + 0.35), c3 = Math.max(c2 + 0.5, tCa - 0.05);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.7, K.lerp(4.8, 4.2, q), CZ + K.lerp(9.0, 8.4, q)], [0.1, 1.0, CZ - 1.8]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(0.9, 0.7, q), 0.55, CZ + K.lerp(5.4, 5.0, q)], [0.2, 1.0, CZ]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(1.3, 1.1, q), 1.7, CZ + K.lerp(4.9, 4.5, q)], [-0.95, 1.2, CZ + 0.3]); }
      else { const c = cabecaDe(menino, -0.35); K.mirar([c[0] - 0.9, c[1] + 0.25, c[2] + 2.7], c); }
    },
    orcamento(B, tc) {
      // NA TELA: o quarto; ele sentado montando o orçamento no monitor; em "orçamento" de pé segurando a folha de cima, e a folha desenrola até o chão; em "explicado" o monitor mostra "Enviado ✓" · MOSTRA: personagem, orcamento, monitor
      const tEs = quando('escola', B, 0.15), tMa = quando('Mandei', B, 0.35), tOr = quando('orçamento', B, 0.5), tEx = quando('explicado', B, 0.9);
      ve(comp); comp.tela.desenhar((c, w, h) => telaOrc(c, w, h, { enviado: tc > tEx }), 'orc' + (tc > tEx));
      if (tc < tMa) {
        // PERSONAGEM: começo: sentado, digitando rápido, animado
        sentado(MONITOR); menino.reagir('digitando', tc * 1.6); menino.humor('feliz');
        fx.et.escola.em({ tela: [540, 420] }, tc - tEs);
        for (let k = 0; k < 6; k++) K.som('clique', B.inicio + 0.1 + k * 0.13, 0.15);
        // CÂMERA: (1) chegando, médio, por cima do ombro, o orçamento no monitor
        K.filmar([MONITOR, mais(MONITOR, [0, 0.4, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tMa), { plano: 'medio', lado: -25, altura: 'olho', tam: 1.6, obstaculos: false });
        return;
      }
      // em "Mandei": de pé, segurando a folha de cima · a folha desenrola até o chão e corre pro lado da câmera · em "explicado": comemora
      cadeiraDoLado();
      const P2 = [0.6, 0, 0.1];
      menino.colocar(P2, [0.8, 1.3, 5]);
      if (tc > tEx) { menino.reagir('vitoria', tc - tEx); menino.humor('feliz'); } else { menino.segurar(); menino.humor('feliz'); }
      const m0 = menino.mao(0), m1 = menino.mao(1), meio = [(m0[0] + m1[0]) / 2, (m0[1] + m1[1]) / 2, (m0[2] + m1[2]) / 2 + 0.04];
      const topo = tc > tEx ? [P2[0], 1.25, P2[2] + 0.45] : meio;
      ve(X.cab); X.cab.position.set(topo[0], topo[1] + 0.14, topo[2]);
      folhaOrc([topo[0], topo[1] - 0.01, topo[2] + 0.01], K.suave(pc(tc, tOr - 0.1, tEx)) * 0.97 + (tc > tEx ? 0.03 : 0), 1.7);
      if (tc > tEx) fx.simb.em(mais(MONITOR, [0, 0.8, 0.3]), tc - tEx, { tipo: '✓', tam: 0.7 });
      // EFEITOS VISUAIS: "Caprichado" em "orçamento" · "Enviado" em "explicado"
      if (tc < tEx) fx.et.capricho.em({ tela: [540, 400] }, tc - tOr); else fx.et.enviado.em({ tela: [540, 400] }, tc - tEx);
      // SONS: o papel desenrolando · o whoosh do envio
      for (let k = 0; k < 4; k++) K.som('whoosh', tOr + k * 0.3, 0.18); K.som('certo', tEx, 0.5);
      // CÂMERA: (2) médio, de frente, ele com a folha de cima · (3) descendo, de baixo, a folha correndo pelo chão
      const tC = K.lerp(tOr, tEx, 0.45);
      if (tc < tC) K.filmar([menino, cabecaDe(menino, 0.45), X.cab.position.toArray()], 'chegando', pc(tc, tMa, tC), { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.2, obstaculos: false, tam: 1.6 });
      else { const q = K.suave(pc(tc, tC, B.ate)); K.mirar([K.lerp(1.6, 1.4, q), K.lerp(0.6, 0.8, q), K.lerp(3.2, 2.9, q)], [0.6, K.lerp(0.4, 0.9, q), 0.6]); }
    },
    resposta(B, tc) {
      // NA TELA: ele de pé com o celular: chega "meu sobrinho faz de graça 👍"; o orçamento (da mesa até o chão) murcha, vira uma bola e cai no lixo · MOSTRA: personagem, celular, lixo
      const tRe = quando('respondeu', B, 0.15), tGr = quando('graça', B, 0.55), tFe = quando('fechou', B, 0.8);
      ve(comp, X.lixo); comp.tela.desenhar((c, w, h) => telaOrc(c, w, h, { enviado: true }), 'orctrue'); cadeiraDoLado();
      // OBJETOS SE MEXENDO: o orçamento pendurado da mesa · em "graça" enrola de volta · a bola voa pro lixo em "fechou"
      const TOP = [-0.5, 0.8, -0.82];
      const kOrc = 1 - K.suave(K.clamp((tc - tGr) / 0.45));
      if (kOrc > 0.01) folhaOrc(TOP, kOrc, 1.5);
      if (tc > tGr && tc < tGr + 0.6) fx.poof.em(TOP, tc - tGr - 0.3, { escala: 0.35 });
      const tB = Math.max(tGr + 0.45, tFe - 0.35);
      if (tc > tGr + 0.4) {
        ve(X.bola); const q = K.clamp((tc - tB) / 0.5), alvo = mais(LIXO, [0, 0.34, 0]);
        X.bola.position.set(K.lerp(TOP[0], alvo[0], q), K.lerp(TOP[1] + 0.1, alvo[1], q) + Math.sin(q * PI) * 0.7, K.lerp(TOP[2], alvo[2], q)); X.bola.rotation.set(tc * 6, tc * 4, 0);
      }
      // PERSONAGEM: começo: lê o celular, esperançoso · em "graça": o susto · em "fechou": mão na testa
      menino.colocar([0.75, 0, 0.05], [0.8, 1.4, 5]);
      if (tc > tFe) { menino.reagir('mao_na_testa', tc - tFe); menino.humor('triste'); }
      else { menino.reagir('celular', tc); menino.humor(tc > tGr ? 'triste' : 'normal'); }
      if (tc < tFe) celularNa(menino, (c, w, h) => celSob(c, w, h, { chegou: tc > tRe + 0.15 }), 'sob' + (tc > tRe + 0.15));
      // EFEITOS VISUAIS: "De graça" em "graça" · "Fechou com o sobrinho" em "fechou" · o ✗
      if (tc < tFe) fx.et.deGraca.em({ tela: [540, 400] }, tc - tGr); else fx.et.fechouSob.em({ tela: [540, 400] }, tc - tFe);
      if (tc > tFe) fx.simb.em(mais(cabecaDe(menino, 0.35), [0.45, 0, 0]), tc - tFe, { tipo: '✗', tam: 0.7 });
      // SONS: a notificação · o papel amassando · a bola caindo no lixo
      K.som('bip', tRe + 0.15, 0.6); K.som('vapor', tGr, 0.4); K.som('baque', tB + 0.5, 0.5); K.som('errado', tFe, 0.5);
      // CÂMERA: (1) chegando, perto, de frente, o celular e o rosto · (2) passando, médio, direita, o orçamento murchando e o lixo
      if (tc < tGr) K.filmar([cel.g.position.toArray(), cabecaDe(menino, 0.25), menino], 'chegando', pc(tc, B.inicio, tGr), { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 1.3 });
      else { const q = K.suave(pc(tc, tGr, B.ate)); K.mirar([K.lerp(2.3, 2.1, q), 1.8, K.lerp(3.4, 3.0, q)], [0.25, 0.75, -0.55]); }
    },
    sobrinhos(B, tc) {
      // NA TELA: (1) a rua; ele vem andando desanimado; o calendário MÊS 1 → 3; (2) ele aponta uma loja e aparece um sobrinho de skate na porta, acenando; (3) outra loja, outro sobrinho; (4) um terceiro passa de skate atrás dele · MOSTRA: personagem, sobrinhos, calendario
      const tTr = quando('três', B, 0.08), tSe = quando('sem', B, 0.28), tTo = quando('Toda', B, 0.45), tAc = quando('achava', B, 0.65), tSo = quando('sobrinho', B, 0.88);
      ve(X.cal); X.cal.mostrar('calendario', { mes: 'MÊS', dia: tc > tSe ? '3' : tc > tTr + 0.25 ? '2' : '1' });
      // PERSONAGEM: começo: anda devagar, triste · em "Toda": para e aponta a loja da esquerda · em "achava": a da direita · em "sobrinho": mão na testa
      const P0 = [0.4, 0, CZ - 2.2], P1 = [0.4, 0, CZ + 1.2];
      const LE = X.lojaE, LD = X.lojaD;
      if (tc < tTo) { menino.irPara(P0, P1, K.clamp(pc(tc, B.inicio, tTo)), tc, {}); menino.humor('triste'); }
      else if (tc < tSo) { const l = tc < tAc ? LE : LD; menino.colocar(P1, l ? [l.porta[0], 1.5, l.porta[2]] : [0.4, 1.4, CZ + 6]); menino.apontar(0.4); menino.humor('surpreso'); }
      else { menino.colocar(P1, [0.4, 1.4, CZ + 6]); menino.reagir('mao_na_testa', tc - tSo); menino.humor('triste'); }
      // ENTRA AGORA: o sobrinho da loja da esquerda em "Toda", o da direita em "achava" (poof), os dois acenando
      [[LE, tTo, 0], [LD, tAc, 1]].forEach(([l, t0, i]) => {
        if (!l || tc < t0) return;
        const s = X.sobs[i].b, p = portaDe(l);
        noSkate(s, p, [p[0] + l.lado * -3, 1.2, p[2] + 3]); s.acenar(tc, 1); s.humor('feliz');
        s.g.scale.setScalar(0.88 * pop(tc - t0));
        (i ? fx.poof2 : fx.poof).em(mais(p, [0, 0.8, 0]), tc - t0, { escala: 0.6 });
      });
      // o terceiro sobrinho passa de skate atrás dele em "sobrinho"
      if (tc > tSo - 0.2) { const q = K.clamp((tc - tSo + 0.2) / 1.3), s = X.sobs[2].b, p = [K.lerp(-2.0, 2.4, q), 0, CZ - 0.6]; noSkate(s, p, [p[0] + 3, 1, p[2]]); s.acenar(tc, 1); s.humor('feliz'); fx.vel.em(mais(p, [0, 0.7, 0]), tc, { rumo: s.g.rotation.y, raio: 0.45 }); }
      // EFEITOS VISUAIS: "3 meses" em "três" · "Um sobrinho em cada loja" em "sobrinho"
      if (tc < tTo) fx.et.meses.em({ tela: [540, 400] }, tc - tTr); else fx.et.cadaLoja.em({ tela: [540, 400] }, tc - tSo);
      // SONS: as folhas do calendário · passos · o poof de cada sobrinho · o skate passando
      K.som('whoosh', tTr + 0.25, 0.3); K.som('whoosh', tSe, 0.3); for (let k = 0; k < 4; k++) K.som('passo', B.inicio + 0.1 + k * 0.4, 0.25);
      K.som('estalo', tTo, 0.4); K.som('estalo', tAc, 0.4); K.som('whoosh', tSo, 0.5);
      // CÂMERA: (1) chegando, de frente, ele andando e o calendário · (2) a loja da esquerda, do calçadão oposto · (3) a da direita · (4) médio, de frente, ele e o sobrinho passando
      if (tc < tTo) { const q = K.suave(pc(tc, B.inicio, tTo)); K.mirar([0.6, 2.2, CZ + K.lerp(7.6, 6.9, q)], [-0.2, 1.8, CZ + 0.3]); }
      else if (tc < tAc && LE) camLoja(LE, K.suave(pc(tc, tTo, tAc)));
      else if (tc < tSo && LD) camLoja(LD, K.suave(pc(tc, tAc, tSo)));
      else { const q = K.suave(pc(tc, tSo, B.ate)); K.mirar([0.5, 1.8, CZ + K.lerp(5.6, 5.0, q)], [0.3, 1.2, CZ + 0.3]); }
    },
    virada(B, tc) {
      // NA TELA: ele para no meio da rua; em "entendi" a ideia; "Qualquer empresa" com o ✗; em "problema" acendem os pinos vermelhos nas lojas com problema: "Site fora do ar" e "Sem site" · MOSTRA: personagem, alertas
      const tEn = quando('entendi', B, 0.15), tQu = quando('qualquer', B, 0.4), tQm = quando('quem', B, 0.7), tPb = quando('problema', B, 0.92);
      const P = [-0.3, 0, CZ + 0.8];
      // PERSONAGEM: começo: cabisbaixo · em "entendi": a ideia, olhos arregalados · em "quem": aponta as lojas
      if (tc < tQm) { menino.colocar(P, [0.6, 1.4, CZ + 6]); if (tc > tEn) { menino.reagir('ideia', tc - tEn); menino.humor('surpreso'); } else { menino.reagir('triste', tc); menino.humor('triste'); } }
      else { menino.colocar(P, [-5, 3, CZ - 5]); menino.apontar(0.7); menino.humor('feliz'); }
      if (tc > tEn && tc < tQm) fx.simb2.em(cabecaDe(menino, 0.4), tc - tEn, { tipo: '!', tam: 0.7 });
      // ENTRA AGORA: os pinos vermelhos um por um de "quem" a "problema"
      X.alertas.forEach((p, i) => { const t0 = tQm + 0.1 + i * Math.max(0.1, (tPb - tQm) / 4); if (tc > t0) { ve(p); p.em(tc, pop(tc - t0)); K.som('estalo', t0, 0.25); } });
      // EFEITOS VISUAIS: "Qualquer empresa" e o ✗ em "qualquer" · "Site fora do ar" e "Sem site" nos pinos em "problema"
      if (tc < tQm) { fx.et.qualquer.em({ tela: [540, 400] }, tc - tQu); if (tc > tQu) fx.simb.em(mais(cabecaDe(menino, 0.3), [0.5, 0, 0]), tc - tQu, { tipo: '✗', tam: 0.6 }); }
      else {
        const a0 = X.alertas[0], a1 = X.alertas[1];
        if (a0) fx.et.foraAr.em(mais(a0.g.position.toArray(), [2.2, 0.9, 0]), tc - tPb + 0.2);
        if (a1) fx.et.semSite.em(mais(a1.g.position.toArray(), [2.2, 0.9, 0]), tc - tPb - 0.1);
      }
      K.som('ding', tEn, 0.5); K.som('errado', tQu, 0.4); K.som('bip', tPb, 0.5);
      // CÂMERA: (1) chegando, médio, de frente, ele tendo a ideia · (2) virando, do calçadão da direita, as lojas da esquerda com os pinos e ele na frente
      if (tc < tQm) K.filmar([menino, cabecaDe(menino, 0.55)], 'chegando', pc(tc, B.inicio, tQm), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.5 });
      else { const q = K.suave(pc(tc, tQm, B.ate)); K.mirar([K.lerp(1.6, 2.0, q), K.lerp(2.2, 2.8, q), CZ + K.lerp(5.0, 6.2, q)], [K.lerp(-1.5, -4.0, q), K.lerp(1.8, 3.4, q), CZ - K.lerp(1, 5, q)]); }
    },
    reencontro(B, tc) {
      // NA TELA: a porta da escola; o mesmo dono do começo, sem graça; o skate passa sozinho (o sobrinho sumiu); em "site" o 404 aparece atrás dele; em "caído" ele tomba, e os dois apertam a mão: ✓ "Voltou!" · MOSTRA: personagem, dono, site
      const tMe = quando('mesma', B, 0.12), tSo = quando('sobrinho', B, 0.4), tSi = quando('site', B, 0.7), tCa = quando('caído', B, 0.85);
      ve(X.escola);
      // o dono: na porta, sem graça (coça a cabeça) · no fim: aperta a mão dele, aliviado
      const tAp = Math.max(tCa, B.ate - 0.7);
      dono.g.visible = true; dono.colocar(GD, [GH[0], 1.3, GH[2]]);
      if (tc > tAp) { dono.reagir('mostrando', tc - tAp); dono.humor('feliz'); } else { dono.reagir('coca_cabeca', tc - B.inicio); dono.humor('triste'); }
      // PERSONAGEM: começo: chega andando · em "mesma": para, surpreso · no fim: aperta a mão e comemora
      if (tc < tMe) { menino.irPara([1.6, 0, CZ + 3.2], GH, K.clamp(pc(tc, B.inicio - 0.6, tMe)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(GH, [GD[0], 1.3, GD[2]]); if (tc > tAp) menino.reagir('mostrando', tc - tAp); else menino.reagir('surpreso', tc - tMe); menino.humor(tc > tAp ? 'feliz' : 'surpreso'); }
      // OBJETOS SE MEXENDO: o skate vazio rolando sozinho em "sobrinho"; o 404 cresce em "site" e tomba em "caído"
      if (tc > tSo - 0.15 && tc < tSi + 0.4) { ve(X.skateSo); const q = K.clamp((tc - tSo + 0.15) / 1.1); X.skateSo.position.set(K.lerp(-2.4, 2.6, q), 0, CZ + 1.5); X.skateSo.rotation.set(0, PI / 2, 0); }
      if (tc > tSi - 0.1) {
        ve(X.site); X.site.mostrar('erro404', {}); K.entrar(X.site.g, 'cresce', tc - tSi + 0.1, { dur: 0.3 });
        const qc = K.suave(K.clamp((tc - tCa) / 0.4)); X.site.g.rotation.set(0, 0, qc * 0.22); X.site.g.position.set(-0.9, 2.3 - qc * 0.15, CZ - 1.8);
      }
      // EFEITOS VISUAIS: "A mesma escola" em "mesma" · "Sumiu" em "sobrinho" · "Site caído" em "caído" · o ✓ e "Voltou!" no aperto de mão
      if (tc < tSo) fx.et.mesma.em({ tela: [540, 400] }, tc - tMe); else if (tc < tCa) fx.et.sumiu.em({ tela: [540, 400] }, tc - tSo); else if (tc < tAp + 0.2) fx.et.caido.em({ tela: [540, 400] }, tc - tCa); else fx.et.fechou.em({ tela: [540, 400] }, tc - tAp - 0.2);
      if (tc > tSi) fx.simb2.em([-0.2, 2.9, CZ - 1.6], tc - tSi, { tipo: '✗', tam: 0.6, som: false });
      if (tc > tAp) fx.simb.em([0.25, 2.25, CZ + 0.3], tc - tAp, { tipo: '✓', tam: 0.8 });
      // SONS: passos · o skate rolando · o erro do 404 · o ding do aperto de mão
      K.som('passo', B.inicio + 0.05, 0.3); K.som('passo', B.inicio + 0.4, 0.3); K.som('whoosh', tSo, 0.4); K.som('errado', tSi, 0.5); K.som('baque', tCa + 0.3, 0.4); K.som('certo', tAp, 0.6);
      // CÂMERA: (1) chegando, médio, de frente, o dono na porta da escola · (2) de baixo, o skate passando sozinho · (3) médio, direita, os dois e o 404 atrás
      if (tc < tSo) { const q = K.suave(pc(tc, B.inicio, tSo)); K.mirar([K.lerp(0.5, 0.3, q), 1.9, CZ + K.lerp(6.6, 6.0, q)], [0.1, 1.5, CZ - 0.2]); }
      else if (tc < tSi) { const q = K.suave(pc(tc, tSo, tSi)); K.mirar([K.lerp(0.4, 0.2, q), 0.9, CZ + K.lerp(6.4, 6.0, q)], [0.1, 0.95, CZ + 0.6]); }
      else { const q = K.suave(pc(tc, tSi, B.ate)); K.mirar([K.lerp(0.3, 0.1, q), 2.0, CZ + K.lerp(6.8, 6.3, q)], [-0.05, 1.75, CZ - 0.6]); }
    },
    antes() {},
    capa() {
      ve(X.escola);
      noSkate(X.sob, [0.15, 0, CZ + 0.4], [-1.5, 1, CZ + 1.6]); X.sob.reagir('vitoria', 0.3); X.sob.humor('feliz');
      menino.colocar(GH, [0.15, 1.1, CZ + 0.4]); menino.reagir('susto', 0.15); menino.humor('surpreso');
      dono.g.visible = true; dono.colocar(GD, [0.15, 1.1, CZ + 0.4]); dono.reagir('segurando', 0.5); dono.humor('feliz');
      ve(X.contrato); const m = X.sob.mao(1); X.contrato.position.set(m[0], m[1] + 0.18, m[2] + 0.05);
      K.mirar([0.7, 1.4, CZ + 5.4], [0.1, 1.3, CZ + 0.2]); X.contrato.lookAt(K.camera.position);
    }
  };
  PV.sobrinho.investe = PV.placa.investe;
  PV.sobrinho.campanha = PV.placa.campanha;
  PV.sobrinho.venda = PV.placa.venda;

  // ---------- Gui: ninguém responde ----------
  // o monte de mensagens: cada balão cai do céu no seu tempo e fica parado no lugar dele
  function monteMsgs(tc, t0, t1) {
    ve(X.msgsG);
    const n = X.msgs.length;
    X.msgs.forEach((m, i) => {
      const ti = t0 + (i / n) * Math.max(0.4, t1 - t0);
      m.visible = tc > ti; if (!m.visible) return;
      const q = K.clamp((tc - ti) / 0.42), p = m.userData.pos;
      m.position.set(p[0] + m.userData.x0 * (1 - q) * 0.5, K.lerp(6.0, p[1], q * q), p[2]);
      m.scale.setScalar(K.lerp(0.6, 1, q));
    });
  }
  PV.gui = {
    gancho(B, tc) {
      // NA TELA: o calçadão; já no 1º quadro chovem balões "Oi, faço sites!" do céu e viram um monte até a cintura dele, que digita no celular; em "Ninguém" ele para, ombros caídos · MOSTRA: personagem, mensagens, celular
      const tCe = quando('cem', B, 0.2), tNi = quando('Ninguém', B, 0.55);
      monteMsgs(tc, B.inicio - 0.9, tNi - 0.1);
      // PERSONAGEM: começo: digita no celular sem parar · em "Ninguém": abaixa o celular, ombros caídos, olha pra câmera
      menino.colocar(X.G, [0.4, 1.4, CZ + 6]);
      if (tc < tNi) { menino.reagir('celular', tc); menino.humor('normal'); celularNa(menino, (c, w, h) => T_conversa(c, w, h, { vistos: Math.min(5, Math.floor((tc - B.inicio + 0.5) / 0.3)) }), 'cv' + Math.min(5, Math.floor((tc - B.inicio + 0.5) / 0.3))); }
      else { menino.reagir('ombros', tc - tNi); menino.humor('triste'); }
      // EFEITOS VISUAIS: "Gui, web designer" no começo · "0 respostas" em "Ninguém"
      if (tc < tNi) fx.et.gui.em({ tela: [540, 430] }, tc - B.inicio - 0.05); else fx.et.zeroResp.em({ tela: [540, 430] }, tc - tNi);
      // SONS: um bip a cada mensagem que cai · whoosh · o errado em "Ninguém"
      K.som('whoosh', B.inicio + 0.02, 0.5); for (let k = 0; k < 9; k++) K.som('bip', B.inicio + k * Math.max(0.1, (tNi - B.inicio) / 9), 0.18);
      K.som('errado', tNi + 0.05, 0.6);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto e alto, o monte e ele pequeno · (2) de baixo, de frente, os balões caindo · (3) médio, esquerda, o rosto · (4) afastando, alto
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.4, tNi);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.7, K.lerp(5.6, 5.0, q), CZ + K.lerp(9.5, 8.8, q)], [0.4, 1.0, CZ]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([0.5, 0.6, CZ + K.lerp(5.4, 4.9, q)], [0.4, 2.1, CZ]); }
      else if (tc < c3) { const c = cabecaDe(menino, -0.3); const q = K.suave(pc(tc, c2, c3)); K.mirar([c[0] - K.lerp(1.4, 1.2, q), c[1] + 0.35, c[2] + 3.2], [c[0], c[1] + 0.05, c[2]]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([0.6, K.lerp(3.2, 4.4, q), CZ + K.lerp(4.8, 6.6, q)], [0.4, 0.9, CZ]); }
    },
    grupo(B, tc) {
      // NA TELA: o quarto; ele sentado posta; o post "Faço site! Me chama 🙂" sobe acima do monitor; em "Quarenta" os balões "Eu também!" pipocam em volta do post · MOSTRA: personagem, post_q, comentarios
      const tPo = quando(W('Postei'), B, 0.05), tFa = quando(W('faço'), B, 0.35), tQu = quando(W('Quarenta'), B, 0.55), tTa = quando(W('também'), B, 0.9);
      ve(comp); comp.tela.desenhar(telaAntes, 'antes');
      const n = tc < tQu ? 0 : Math.round(K.lerp(1, 40, pc(tc, tQu, tTa)));
      ve(X.postQ); K.entrar(X.postQ.g, 'sobe', tc - tFa + 0.2, { dur: 0.4 }); X.postQ.mostrar('postGui', { n });
      // OBJETOS SE MEXENDO: os balões "Eu também!" pipocando de "Quarenta" a "também"
      ve(X.comentG); X.coment.forEach((m, i) => { const t0 = tQu + i * Math.max(0.04, (tTa - tQu) / 26); m.visible = tc > t0; if (!m.visible) return; m.position.set(...m.userData.pos); m.scale.setScalar(pop(tc - t0)); });
      // PERSONAGEM: começo: sentado, digita animado · em "Quarenta": levanta assustado · em "também": mão na testa
      if (tc < tQu) { sentado([-0.5, 2.2, -1.0]); menino.reagir('digitando', tc * 1.4); menino.humor('feliz'); }
      else {
        cadeiraDoLado(); menino.colocar(mais(EM_PE, [0.2, 0, 0.35]), [0.9, 1.4, 5]);
        if (tc > tTa) { menino.reagir('mao_na_testa', tc - tTa); menino.humor('triste'); } else { menino.reagir('surpreso', tc - tQu); menino.humor('surpreso'); }
      }
      // EFEITOS VISUAIS: "Postado no grupo" em "faço" · "40 concorrentes" em "também"
      if (fx.et.intro && tc < tFa) fx.et.intro.em({ tela: [540, 420] }, tc - B.inicio - 0.05);
      else if (tc < tTa) fx.et.postado.em({ tela: [540, 420] }, tc - tFa); else fx.et.euTambem.em({ tela: [540, 420] }, tc - tTa);
      // SONS: teclado · bip do post · pling acelerando · errado
      for (let k = 0; k < 6; k++) K.som('clique', tPo + k * 0.1, 0.15); K.som('bip', tFa, 0.5);
      for (let k = 0; k < 8; k++) K.som('pingo', tQu + k * Math.max(0.08, (tTa - tQu) / 8), 0.2); K.som('errado', tTa, 0.5);
      // CÂMERA: (1) de trás do monitor, o rosto dele postando · (2) afastando, de fora, os balões tapando tudo · (3) médio, de frente, a mão na testa
      if (tc < tQu) camRosto(K.suave(pc(tc, B.inicio, tQu)));
      else if (tc < tTa) { const q = K.suave(pc(tc, tQu, tTa)); K.mirar([K.lerp(2.2, 2.6, q), 2.0, K.lerp(4.2, 4.8, q)], [0.0, 1.75, -0.5]); }
      else K.filmar([menino, cabecaDe(menino, 0.35), [-0.5, 2.2, -1.0]], 'chegando', pc(tc, tTa, B.ate), { plano: 'medio', lado: -12, altura: 'olho', tam: 2.0, obstaculos: false });
    },
    insta(B, tc) {
      // NA TELA: o quarto; o calendário vira DIA 1 → 20; ele de pé com o celular: "❤ 2 curtidas"; em "minha" a lista "Você curtiu" e ele coça a cabeça · MOSTRA: personagem, celular, calendario
      const tTo = quando(W('todo'), B, 0.25), tDu = quando(W('Duas'), B, 0.45), tUm = quando(W('Uma'), B, 0.75), tMi = quando(W('minha'), B, 0.9);
      ve(comp); comp.tela.desenhar(telaPortfolio, 'port'); cadeiraDoLado();
      const d = tc < tTo ? 1 : Math.min(20, 1 + Math.floor((tc - tTo) / 0.05));
      ve(X.cal); X.cal.mostrar('calendario', { mes: 'DIA', dia: String(d) });
      // PERSONAGEM: começo: posta no celular, esperançoso · em "Duas": olha o número, desanima · em "minha": coça a cabeça, sem graça
      menino.colocar(mais(EM_PE, [0, 0, 0.35]), [0.9, 1.4, 5]);
      if (tc < tMi) { menino.reagir('celular', tc); menino.humor(tc > tDu ? 'triste' : 'feliz'); celularNa(menino, (c, w, h) => celInsta(c, w, h, { minha: tc > tUm, dia: d }), 'in' + (tc > tUm) + d); }
      else { menino.reagir('coca_cabeca', tc - tMi); menino.humor('triste'); }
      // EFEITOS VISUAIS: "Todo dia" em "todo" · "2 curtidas" em "Duas" · "Uma era minha" em "Uma"
      if (tc < tDu) fx.et.todoDia.em({ tela: [540, 400] }, tc - tTo); else if (tc < tUm) fx.et.duas.em({ tela: [540, 400] }, tc - tDu); else fx.et.minha.em({ tela: [540, 400] }, tc - tUm);
      // SONS: as folhas do calendário · bip · errado
      for (let k = 0; k < 5; k++) K.som('whoosh', tTo + k * 0.18, 0.15); K.som('bip', tDu, 0.5); K.som('errado', tMi, 0.45);
      // CÂMERA: (1) afastando, de fora, o calendário virando e ele · (2) chegando, médio, de frente, o celular e o rosto · (3) passando, perto, esquerda
      if (tc < tDu) { const q = K.suave(pc(tc, B.inicio, tDu)); K.mirar([K.lerp(1.9, 2.3, q), 2.0, K.lerp(3.6, 4.1, q)], [0.75, 1.75, -0.7]); }
      else if (tc < tUm) K.filmar([menino, cabecaDe(menino, 0.35), cel.g.position.toArray()], 'chegando', pc(tc, tDu, tUm), { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 1.5 });
      else K.filmar([menino, cabecaDe(menino, 0.3)], 'passando', pc(tc, tUm, B.ate), { plano: 'perto', lado: -20, altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 1.3 });
    },
    mensagens(B, tc) {
      // NA TELA: o calçadão, "Dia 30"; ele digita e os balões voam do celular pras placas das lojas da esquerda ("Enviadas 100"); em "Visualizaram" o "✓✓ Visto" em cada loja; em "sumiram" as plaquinhas somem num poof · MOSTRA: personagem, voando, celular
      const tMa = quando(W('mandei'), B, 0.18), tCe = quando('cem', B, 0.5), tVi = quando(W('Visualizaram'), B, 0.68), tSu = quando(W('sumiram'), B, 0.9);
      const L = X.lojasM, nL = Math.max(1, L.length);
      // PERSONAGEM: começo: de costas pra câmera, digitando no celular · em "sumiram": vira pra câmera, ombros caídos
      if (tc < tSu) { menino.colocar(X.G, [-3.5, 1.6, CZ - 5]); menino.reagir('celular', tc); menino.humor(tc > tVi ? 'surpreso' : 'normal'); celularNa(menino, (c, w, h) => T_conversa(c, w, h, { vistos: tc > tVi ? 5 : 0 }), 'mv' + (tc > tVi)); }
      else { menino.colocar(X.G, [0.4, 1.4, CZ + 6]); menino.reagir('ombros', tc - tSu); menino.humor('triste'); }
      // OBJETOS SE MEXENDO: de "mandei" a "Visualizaram", os balões saem da mão em arco até as lojas, um atrás do outro
      ve(X.voaG); const m0 = menino.mao(1);
      X.voa.forEach((m, i) => {
        const per = 0.8, t = tc - tMa - i * 0.13; m.visible = false;
        if (t < 0 || tc > tVi + 0.2 || !L.length) return;
        const k = Math.floor(t / per), q = (t % per) / per, l = L[(i + k) % nL];
        const al = [l.placa[0] * 0.8, l.placa[1] + 0.2, l.placa[2]];
        m.visible = true;
        m.position.set(K.lerp(m0[0], al[0], q), K.lerp(m0[1] + 0.2, al[1], q) + Math.sin(q * PI) * 1.4, K.lerp(m0[2], al[2], q));
        m.scale.setScalar(K.lerp(0.5, 1, Math.min(1, q * 3)));
      });
      // o "✓✓ Visto" em cada loja em "Visualizaram"; em "sumiram" estoura e some
      ve(X.vistosG);
      X.vistos.forEach((m, j) => { const t0 = tVi + j * 0.08; m.visible = tc > t0 && tc < tSu + 0.15; if (!m.visible) return; m.position.set(...m.userData.pos); m.scale.setScalar(1.9 * pop(tc - t0)); });
      if (X.vistos[0]) fx.poof.em(X.vistos[0].userData.pos, tc - tSu - 0.1, { escala: 0.5 });
      if (X.vistos[1]) fx.poof2.em(X.vistos[1].userData.pos, tc - tSu - 0.15, { escala: 0.5 });
      if (tc < tVi) fx.cont.em(mais(X.G, [-0.9, 2.7, -1.2]), tc - tMa, { de: 1, ate: 100, dur: Math.max(0.5, tCe - tMa + 0.3), antes: 'Enviadas ', depois: '', cor: '#1067f8', tam: 0.7 });
      // EFEITOS VISUAIS: "Dia 30" em "dia" · "Visualizou" em "Visualizaram" · "Visualizaram e sumiram" em "sumiram"
      if (tc < tVi) fx.et.dia30.em({ tela: [540, 400] }, tc - B.inicio - 0.05); else if (tc < tSu) fx.et.visto.em({ tela: [540, 400] }, tc - tVi); else fx.et.sumiram.em({ tela: [540, 400] }, tc - tSu);
      // SONS: um whoosh por balão · bips dos vistos · o vapor do sumiço · errado
      for (let k = 0; k < 8; k++) K.som('whoosh', tMa + k * 0.16, 0.14);
      for (let k = 0; k < 3; k++) K.som('bip', tVi + k * 0.1, 0.25); K.som('vapor', tSu, 0.45); K.som('errado', tSu + 0.2, 0.45);
      // CÂMERA: (1) por cima do ombro, os balões indo pras lojas · (2) do calçadão da direita, as lojas da esquerda com os vistos · (3) perto, o rosto dele
      if (tc < tCe) { const q = K.suave(pc(tc, B.inicio, tCe)); K.mirar([K.lerp(1.9, 1.7, q), 2.7, CZ + K.lerp(5.0, 4.5, q)], [-1.4, 1.7, CZ - 3.5]); }
      else if (tc < tSu) { const q = K.suave(pc(tc, tCe, tSu)); K.mirar([K.lerp(1.6, 2.0, q), K.lerp(2.3, 2.7, q), CZ + K.lerp(5.0, 5.8, q)], [K.lerp(-2.0, -3.6, q), K.lerp(2.0, 2.9, q), CZ - K.lerp(1.5, 4.0, q)]); }
      else { const c = cabecaDe(menino, -0.3); K.mirar([c[0] + 1.1, c[1] + 0.3, c[2] + 3.0], [c[0], c[1] + 0.05, c[2]]); }
    },
    virada(B, tc) {
      // NA TELA: ele parado no meio da rua; em "entendi" a ideia (!); em "nem" acendem os pinos vermelhos ✗ nas lojas da esquerda: "Já tinham site"; ele aponta · MOSTRA: personagem, alertas
      const tEn = quando(W('entendi'), B, 0.15), tMa = quando('mandava', B, 0.4), tNe = quando('nem', B, 0.65), tPr = quando('precisava', B, 0.85);
      const P = [-0.3, 0, CZ + 0.8];
      // PERSONAGEM: começo: cabisbaixo · em "entendi": a ideia, olhos arregalados · em "nem": aponta as lojas
      if (tc < tNe) { menino.colocar(P, [0.6, 1.4, CZ + 6]); if (tc > tEn) { menino.reagir('ideia', tc - tEn); menino.humor('surpreso'); } else { menino.reagir('triste', tc); menino.humor('triste'); } }
      else { menino.colocar(P, [-5, 3, CZ - 5]); menino.apontar(0.7); menino.humor('surpreso'); }
      if (tc > tEn && tc < tNe) fx.simb2.em(cabecaDe(menino, 0.4), tc - tEn, { tipo: '!', tam: 0.7 });
      // ENTRA AGORA: os pinos vermelhos um por um de "nem" a "precisava"
      X.alertas.forEach((p, i) => { const t0 = tNe + i * Math.max(0.1, (tPr - tNe) / 4); if (tc > t0) { ve(p); p.em(tc, pop(tc - t0)); K.som('estalo', t0, 0.25); } });
      // EFEITOS VISUAIS: "Pra quem?" em "mandava" · "Já tinham site" no pino em "precisava"
      if (tc < tNe) fx.et.entendi.em({ tela: [540, 400] }, tc - tMa);
      else { const a0 = X.alertas[0]; if (a0) fx.et.jaTinham.em(mais(a0.g.position.toArray(), [2.2, 0.9, 0]), tc - tPr + 0.2); else fx.et.jaTinham.em({ tela: [540, 400] }, tc - tPr); }
      if (tc > tPr) fx.simb.em(mais(cabecaDe(menino, 0.3), [0.5, 0, 0]), tc - tPr, { tipo: '✗', tam: 0.6 });
      K.som('ding', tEn, 0.5); K.som('bip', tMa, 0.3); K.som('errado', tPr, 0.45);
      // CÂMERA: (1) chegando, médio, de frente, ele tendo a ideia · (2) virando, do calçadão da direita, as lojas da esquerda com os pinos
      if (tc < tNe) K.filmar([menino, cabecaDe(menino, 0.55)], 'chegando', pc(tc, B.inicio, tNe), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.5 });
      else { const q = K.suave(pc(tc, tNe, B.ate)); K.mirar([K.lerp(1.6, 2.0, q), K.lerp(2.2, 2.8, q), CZ + K.lerp(5.0, 6.2, q)], [K.lerp(-1.5, -4.0, q), K.lerp(1.8, 3.4, q), CZ - K.lerp(1, 5, q)]); }
    },
    reencontro(B, tc) {
      // NA TELA: a recepção da clínica; ele entra; em "falou" o dono levanta o celular e o inbox dele aparece grande: 99 "Oi, faço sites!"; em "único" ri e aponta; em "sites" aperto de mão, ✓ e dinheiro · MOSTRA: personagem, dono, inbox
      const tCh = quando('Cheguei', B, 0.03), tDo = quando('dono', B, 0.22), tFa = quando('falou', B, 0.32), tUn = quando('único', B, 0.6), tSi = quando('sites', B, 0.95);
      const tAp = Math.min(Math.max(tSi - 0.1, tUn + 0.4), B.ate - 0.5);
      const L = VENDA.clinica;
      // PERSONAGEM: começo: entra andando · em "falou": para, olha o inbox · no fim: aperta a mão e comemora
      if (tc < tDo) { menino.irPara(L.de, L.heroi, K.clamp(pc(tc, tCh - 0.3, tDo)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(L.heroi, tc < tUn ? [-3.35, 2.0, -1.75] : cabecaDe(dono, -0.5)); if (tc > tAp) menino.reagir('comemorando', tc - tAp); else menino.reagir('surpreso', tc - tFa); menino.humor(tc > tUn ? 'feliz' : 'surpreso'); }
      // o dono: olha ele · em "falou": aponta o inbox · em "único": ri, aponta pra ele · no fim: aperto de mão
      dono.g.visible = true; dono.colocar(L.dono, [L.heroi[0], 1.2, L.heroi[2]]);
      if (tc > tAp) dono.reagir('mostrando', tc - tAp); else if (tc > tUn) dono.apontar(0.6); else if (tc > tFa) dono.reagir('mostrando', tc - tFa); else dono.reagir('segurando', tc);
      dono.humor(tc > tUn ? 'feliz' : 'normal');
      // ENTRA AGORA: o inbox cresce em "falou" e as conversas "Oi, faço sites!" vão enchendo
      if (tc > tFa - 0.1) { ve(X.inbox); K.entrar(X.inbox.g, 'cresce', tc - tFa + 0.1, { dur: 0.3 }); X.inbox.mostrar('inbox', { n: Math.min(9, Math.floor((tc - tFa) / 0.09)) }); }
      // EFEITOS VISUAIS: '99 "oi, faço sites"' em "falou" · "O único diferente" e o ✓ no aperto de mão · o dinheiro
      if (tc < tAp) fx.et.noventa.em({ tela: [540, 400] }, tc - tFa - 0.3); else fx.et.fechou.em({ tela: [540, 400] }, tc - tAp);
      fx.simb.em(cabecaDe(dono, 0.45), tc - tAp, { tipo: '✓', tam: 1.0 });
      fx.grana.em(mais(L.heroi, [-0.4, 0, 0]), tc - tAp - 0.1, { raio: 1.2, altura: 3, dur: 1.4 });
      K.som('passo', tCh + 0.1, 0.3); K.som('passo', tCh + 0.45, 0.3); K.som('brilho', tFa, 0.4);
      for (let k = 0; k < 9; k++) K.som('bip', tFa + k * 0.09, 0.12); K.som('certo', tAp, 0.6); K.som('festa', tAp + 0.15, 0.5);
      // CÂMERA: (1) chegando, médio, de frente, ele entrando · (2) parado, médio, o inbox e o dono · (3) passando, médio, esquerda, o aperto de mão
      if (tc < tFa) K.filmar([dono, menino, cabecaDe(dono, 0.3), cabecaDe(menino, 0.3)], 'chegando', pc(tc, B.inicio, tFa), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.6, obstaculos: false });
      else if (tc < tUn) K.filmar([X.inbox, cabecaDe(dono, 0.2), dono], 'parado', pc(tc, tFa, tUn), { plano: 'medio', lado: 10, altura: 'olho', tam: 1.5, obstaculos: false });
      else K.filmar([dono, menino, cabecaDe(dono, 0.3), cabecaDe(menino, 0.3)], 'passando', pc(tc, tUn, B.ate), { plano: 'medio', lado: -20, altura: 'olho', tam: 1.5, obstaculos: false });
    },
    antes() {},
    capa() {
      monteMsgs(5, 0, 1);
      menino.colocar(X.G, [0.4, 1.4, CZ + 6]); menino.reagir('mao_na_testa', 0.5); menino.humor('triste');
      K.mirar([0.6, 1.8, CZ + 5.0], [0.4, 1.1, CZ]);
      encarar(); // a capa não passa pelo fim do cena(): os balões viram pra câmera aqui
    }
  };
  PV.gui.investe = PV.placa.investe;
  PV.gui.campanha = PV.placa.campanha;
  PV.gui.venda = PV.placa.venda;

  // ---------- Dono: caixa de entrada ----------
  const LXtopo = () => [LX[0], 0.8, LX[2]];
  PV.dono = {
    gancho(B, tc) {
      // NA TELA: o calçadão; o dono da cafeteria na frente da placa, o celular vibrando; chovem balões "Oi, faço sites!" e viram um monte até a cintura dele; em "mensagem" ele joga o celular na lixeira · MOSTRA: dono, mensagens, celular
      const tLe = quando('lê', B, 0.6), tJ = quando('mensagem', B, 0.88);
      monteMsgs(tc, B.inicio - 2.6, tJ);
      ve(X.lixeira, X.placaCafe);
      // PERSONAGEM: o dono · começo: olha o celular tremendo, surpreso · em "lê": bravo · em "mensagem": joga o celular no lixo
      dono.g.visible = true; dono.colocar(X.G, [0.4, 1.4, CZ + 6]);
      const nIb = Math.min(9, Math.floor((tc - B.inicio + 0.9) / 0.12));
      if (tc < tJ) {
        dono.reagir(tc > tLe ? 'bravo' : 'surpreso', tc - B.inicio); dono.humor(tc > tLe ? 'bravo' : 'surpreso');
        celularNa(dono, (c, w, h) => K.telasMappoa.inbox(c, w, h, { n: nIb }), 'ib' + nIb);
        cel.g.position.x += Math.sin(tc * 95) * 0.018; // vibrando
      } else {
        dono.reagir('bravo', tc - tJ); dono.humor('bravo');
        // INTERAÇÃO: o celular voa da mão dele em arco até a lixeira (0,45 s)
        const q = K.clamp((tc - tJ) / 0.45);
        if (q < 1) {
          ve(cel); const m = dono.mao(1), al = LXtopo();
          cel.g.position.set(K.lerp(m[0], al[0], q), K.lerp(m[1] + 0.12, al[1], q) + Math.sin(q * PI) * 0.9, K.lerp(m[2] + 0.06, al[2], q));
          cel.tela.desenhar((c, w, h) => K.telasMappoa.inbox(c, w, h, { n: 9 }), 'ib9');
        }
        fx.poof.em(LXtopo(), tc - tJ - 0.45, { escala: 0.4 });
        fx.simb.em(mais(LXtopo(), [0, 0.7, 0]), tc - tJ - 0.45, { tipo: '✗', tam: 0.6 });
      }
      // ENTRA AGORA: o contador de mensagens acima dele
      fx.cont.em(mais(X.G, [0.75, 1.95, 0.3]), tc - B.inicio + 0.5, { de: 1, ate: 99, dur: Math.max(0.6, tLe - B.inicio + 0.5), antes: '', depois: ' mensagens', cor: '#e8352b', tam: 0.7 });
      // EFEITOS VISUAIS: "Dono da cafeteria" no começo · '99 "oi, faço sites"' em "lê" · "Direto pro lixo" em "mensagem"
      if (tc < tLe) fx.et.donoCafe.em({ tela: [540, 430] }, tc - B.inicio + 0.2); else if (tc < tJ) fx.et.noventa.em({ tela: [540, 430] }, tc - tLe); else fx.et.lixo.em({ tela: [540, 430] }, tc - tJ);
      // SONS: whoosh · um bip por balão · baque e vapor na lixeira
      K.som('whoosh', B.inicio + 0.02, 0.5); for (let k = 0; k < 10; k++) K.som('bip', B.inicio + k * Math.max(0.1, (tJ - B.inicio) / 10), 0.18);
      K.som('whoosh', tJ, 0.4); K.som('baque', tJ + 0.45, 0.6); K.som('vapor', tJ + 0.5, 0.35);
      // CÂMERA: 4 cortes: (1) aberto e alto, o monte e ele pequeno · (2) de baixo, de frente, os balões caindo · (3) médio, esquerda, o rosto e o celular · (4) médio, direita, a lixeira
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.4, tJ);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.7, K.lerp(3.9, 3.5, q), CZ + K.lerp(6.6, 6.0, q)], [0.3, 1.15, CZ + 0.2]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([0.5, 0.6, CZ + K.lerp(5.4, 4.9, q)], [0.4, 2.1, CZ]); }
      else if (tc < c3) { const c = cabecaDe(dono, -0.3); const q = K.suave(pc(tc, c2, c3)); K.mirar([c[0] - K.lerp(1.4, 1.2, q), c[1] + 0.3, c[2] + 3.2], [c[0] - 0.1, c[1] - 0.1, c[2]]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(1.8, 1.5, q), K.lerp(2.0, 1.8, q), CZ + K.lerp(4.6, 4.0, q)], [-0.2, 0.9, CZ + 0.5]); }
    },
    reencontro(B, tc) {
      // NA TELA: o calçadão, a mesma cafeteria do gancho; o dono ainda no monte de balões, a lixeira; o Rodrigo chega; em "mensagem" o inbox do dono cresce: a do Rodrigo em cima, verde e lida · MOSTRA: personagem, dono, inbox
      const tCh = quando('Chegando', B, 0.03), tDo = quando('dono', B, 0.2), tCo = quando('começo', B, 0.35), tMe = quando('mensagem', B, 0.5), tUn = quando('única', B, 0.82), tLe = quando('leu', B, 0.95);
      const tFim = Math.min(tLe, B.ate - 0.5);
      monteMsgs(tc, tc - 20, tc - 19); ve(X.lixeira, X.placaCafe);
      const RH = [-0.95, 0, CZ + 1.75];
      // PERSONAGEM: Rodrigo · entra andando até "dono" · em "começo": para, surpreso · em "leu": comemora
      if (tc < tDo) { menino.irPara([-1.35, 0, CZ + 2.4], RH, K.clamp(pc(tc, tCh - 0.3, tDo)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(RH, tc < tMe ? cabecaDe(dono, -0.5) : [1.55, 2.0, CZ + 0.3]); if (tc > tFim) menino.reagir('comemorando', tc - tFim); else menino.reagir('surpreso', tc - tCo); menino.humor(tc > tUn ? 'feliz' : 'surpreso'); }
      // o dono: braços de bravo · em "começo": sorri e aponta pro Rodrigo · em "mensagem": mostra o inbox
      dono.g.visible = true; dono.colocar(X.G, tc < tCo ? [0.4, 1.4, CZ + 6] : cabecaDe(menino, -0.5));
      if (tc > tMe) dono.reagir('mostrando', tc - tMe); else if (tc > tCo) dono.apontar(0.6); else dono.reagir('bravo', tc);
      dono.humor(tc > tCo ? 'feliz' : 'bravo');
      // ENTRA AGORA: o inbox em "mensagem", a do Rodrigo em cima
      if (tc > tMe - 0.1) { ve(X.inbox); K.entrar(X.inbox.g, 'cresce', tc - tMe + 0.1, { dur: 0.3 }); X.inbox.g.position.set(1.55, 2.0, CZ + 0.3); X.inbox.g.rotation.set(0, 0, 0); X.inbox.mostrar('inbox', { n: Math.min(9, 1 + Math.floor((tc - tMe) / 0.08)), destaque: true }); }
      // EFEITOS VISUAIS: "O mesmo dono" em "começo" · "A única que ele leu" em "única" · ✓ e dinheiro no fim
      if (tc < tUn) fx.et.mesmoDono.em({ tela: [540, 400] }, tc - tCo); else fx.et.unica.em({ tela: [540, 400] }, tc - tUn);
      fx.simb.em(cabecaDe(dono, 0.45), tc - tFim, { tipo: '✓', tam: 1.0 });
      fx.grana.em(mais(RH, [0.3, 0, -0.4]), tc - tFim - 0.1, { raio: 1.2, altura: 3, dur: 1.4 });
      K.som('passo', tCh + 0.1, 0.3); K.som('passo', tCh + 0.45, 0.3); K.som('ding', tCo, 0.5); K.som('brilho', tMe, 0.4);
      for (let k = 0; k < 9; k++) K.som('bip', tMe + k * 0.08, 0.12); K.som('certo', tUn, 0.6); K.som('festa', tFim + 0.1, 0.5);
      // CÂMERA: (1) chegando, aberto, de frente, os dois e o monte · (2) médio, o rosto do dono · (3) parado, o inbox e o dono · (4) passando, esquerda, os dois
      if (tc < tCo) { const q = K.suave(pc(tc, B.inicio, tCo)); K.mirar([K.lerp(0.4, 0.15, q), 2.0, CZ + K.lerp(6.6, 6.0, q)], [-0.45, 1.0, CZ + 1.1]); }
      else if (tc < tMe) { const c = cabecaDe(dono, -0.3); const q = K.suave(pc(tc, tCo, tMe)); K.mirar([c[0] + K.lerp(1.2, 1.0, q), c[1] + 0.25, c[2] + 3.0], [c[0] + 0.1, c[1] - 0.15, c[2]]); }
      else if (tc < tUn) { const q = K.suave(pc(tc, tMe, tUn)); K.mirar([1.1, 1.9, CZ + K.lerp(5.9, 5.3, q)], [1.05, 1.55, CZ + 0.3]); }
      else { const q = K.suave(pc(tc, tUn, B.ate)); K.mirar([K.lerp(-1.9, -1.4, q), 1.8, CZ + K.lerp(6.0, 5.6, q)], [0.2, 1.35, CZ + 0.8]); }
    },
    antes() {},
    capa() {
      monteMsgs(5, 0, 1); ve(X.lixeira, X.placaCafe);
      dono.g.visible = true; dono.colocar(X.G, [0.4, 1.4, CZ + 6]); dono.reagir('bravo', 0.6); dono.humor('bravo');
      ve(cel); cel.g.position.set(-0.35, 1.45, CZ + 0.75); cel.g.rotation.set(0.4, 0, -0.5);
      cel.tela.desenhar((c, w, h) => K.telasMappoa.inbox(c, w, h, { n: 9 }), 'ib9');
      K.mirar([0.5, 1.8, CZ + 4.8], [0.1, 1.15, CZ + 0.4]);
      encarar(); // a capa não passa pelo fim do cena(): os balões viram pra câmera aqui
    }
  };
  ['grupo', 'insta', 'mensagens', 'virada'].forEach((k) => { PV.dono[k] = PV.gui[k]; });
  PV.dono.investe = PV.placa.investe;
  PV.dono.campanha = PV.placa.campanha;
  PV.dono.venda = PV.placa.venda;
  // ---------- Batalha: campo de batalha ----------
  // a guerra em volta do post gigante: os dois exércitos avançando e recuando, os balões-flecha cruzando o ar e a poeira
  function guerra(tc, B) {
    ve(X.postBG, X.postB);
    multidao.forEach((m) => {
      const b = m.b; b.g.visible = true;
      const av = 0.5 + 0.5 * Math.sin(tc * 2.6 + m.fase);
      const p = [m.base[0] - m.lado * 0.35 * av, 0, m.base[2]];
      b.colocar(p, [p[0] - m.lado * 3, 1.2, p[2] + 1.4]);
      b.correr(tc + m.fase, 1.3); b.humor(m.fase % 2 > 1 ? 'bravo' : 'assustado');
    });
    ve(X.flechasG);
    const per = 0.85;
    X.flechas.forEach((f, i) => {
      const t = tc + i * 0.29, k = Math.floor(t / per), q = (t % per) / per;
      const de = multidao[(i % 2 ? 0 : 8) + ((i * 3 + k) % 8)].b.g.position, ate = multidao[(i % 2 ? 8 : 0) + ((i * 5 + k * 3) % 8)].b.g.position;
      f.visible = true;
      f.position.set(K.lerp(de.x, ate.x, q), K.lerp(1.75, 1.45, q) + Math.sin(q * PI) * 1.3, K.lerp(de.z, ate.z, q) + Math.sin(q * PI) * 0.4);
      f.scale.setScalar(K.lerp(0.6, 1, Math.min(1, q * 4)));
    });
    // a poeira nos pés, pulando de soldado em soldado
    const kp = Math.floor(tc / 0.5), d1 = multidao[(kp * 5) % 16].b.g.position, d2 = multidao[(kp * 7 + 3) % 16].b.g.position;
    fx.poofB.em([d1.x, 0.15, d1.z], tc % 0.5, { escala: 0.55, cor: 0xd8ccb4, som: false });
    fx.poofC.em([d2.x, 0.15, d2.z], (tc + 0.25) % 0.5, { escala: 0.5, cor: 0xd8ccb4, som: false });
    if (B) { for (let k = 0; k < 6; k++) K.som('whoosh', B.inicio + 0.2 + k * 0.5, 0.12); for (let k = 0; k < 5; k++) K.som('passo', B.inicio + k * 0.4, 0.22); }
  }
  PV.batalha = {
    gancho(B, tc) {
      // NA TELA: o post gigante "Alguém faz site?" em pé no meio do calçadão; os dois exércitos de web designers com notebook de escudo; os balões-flecha; a explosão; o Caio no meio leva o balão na cara em "assim" · MOSTRA: personagem, post, multidao
      const tP = quando('post', B, 0.45), tA = quando('assim', B, 0.92), tEx = B.inicio + 0.75, t0 = tA - 0.4;
      guerra(tc, B);
      X.postB.mostrar('postB', { n: Math.round(K.lerp(40, 300, pc(tc, B.inicio, tA)) / 5) * 5 });
      // PERSONAGEM: começo: olha pros lados, assustado, se encolhendo · em "assim": leva o balão na cara e cai, tonto
      if (tc < tA) { menino.colocar(MB, [0.3 + Math.sin(tc * 3) * 2.2, 1.4, CZ + 6]); menino.reagir('susto', tc - B.inicio); menino.humor('assustado'); }
      else { menino.colocar(MB, [0.3, 1.4, CZ + 6]); menino.cair(K.clamp((tc - tA) / 0.3)); menino.humor('assustado'); fx.estr.em(mais(MB, [0, 0.35, 0.9]), tc, { raio: 0.3 }); }
      // INTERAÇÃO: o balão "Faço por R$ 50!" sai do exército da direita e acerta a cara dele
      if (tc > t0) {
        ve(X.tiro); const c = cabecaDe(menino, -0.12), cara = [c[0], c[1], c[2] + 0.3];
        if (tc < tA) { const de = multidao[8].b.g.position, q = K.clamp((tc - t0) / 0.4); X.tiro.position.set(K.lerp(de.x, cara[0], q), K.lerp(1.8, cara[1], q) + Math.sin(q * PI) * 0.7, K.lerp(de.z, cara[2], q)); X.tiro.scale.setScalar(K.lerp(0.6, 1, q)); }
        else if (tc < tA + 0.3) X.tiro.position.set(...cara);
        else { const q = K.clamp((tc - tA - 0.3) / 0.35); X.tiro.position.set(K.lerp(cara[0], MB[0] + 0.3, q), K.lerp(cara[1], 0.12, q), K.lerp(cara[2], MB[2] + 0.9, q)); }
      }
      // EFEITOS VISUAIS: "Web designer" no começo · "300 web designers" em "post"
      if (tc < tP) fx.et.web.em({ tela: [540, 430] }, tc - B.inicio + 0.1); else fx.et.trezentos.em({ tela: [540, 430] }, tc - tP);
      // SONS: whoosh das flechas · passos · o whoosh do tiro · plaft em "assim" (a explosão toca o estrondo sozinha)
      K.som('whoosh', B.inicio + 0.02, 0.5); K.som('whoosh', t0, 0.45); K.som('tampa', tA, 0.85);
      // CÂMERA: 4 cortes: (1) aberto, alto, de frente, o post e os dois exércitos · (2) de baixo, da direita, o exército da esquerda e a explosão · (3) médio, esquerda, o rosto dele · (4) médio, direita, ele caindo
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.4, tA - 0.05);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.6, K.lerp(5.6, 5.0, q), CZ + K.lerp(9.6, 8.8, q)], [0.3, 1.5, CZ - 2.0]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(1.2, 1.0, q), 0.6, CZ + K.lerp(4.6, 4.2, q)], [-0.6, 2.0, CZ - 3.6]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(-1.0, -0.8, q), 1.9, CZ + K.lerp(6.0, 5.4, q)], [0.25, 1.75, CZ - 1.6]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(1.6, 1.4, q), 1.7, CZ + K.lerp(4.4, 4.0, q)], [0.3, 0.75, CZ + 1.1]); }
      // a explosão vai depois da câmera (ela treme a câmera)
      if (fx.expl) fx.expl.em([0.3, 0.2, CZ - 2.6], tc - tEx, { escala: 0.55, forca: 0.7 });
    },
    virada(B, tc) {
      // NA TELA: (1) a guerra de novo atrás, ele sai andando do meio dela; (2) de "mandava" em diante, igual ao do Gui: os pinos vermelhos "Já tinham site" · MOSTRA: personagem, alertas
      const tEr = quando('erro', B, 0.08), tTr = quando('trezentos', B, 0.3), tMa = quando('mandava', B, 0.55);
      if (tc >= tMa) { PV.gui.virada(B, tc); return; }
      guerra(tc, B); X.postB.mostrar('postB', { n: 300 });
      // PERSONAGEM: sai da guerra, cabisbaixo, sacudindo a poeira
      menino.irPara([0.3, 0, CZ + 0.4], [-0.3, 0, CZ + 1.6], K.clamp(pc(tc, B.inicio, tMa) * 0.95), tc, {}); menino.humor('triste');
      // EFEITOS VISUAIS: "O erro" em "erro" · "300 no mesmo post" em "trezentos"
      if (tc < tTr) fx.et.erro.em({ tela: [540, 400] }, tc - tEr); else fx.et.mesmoPost.em({ tela: [540, 400] }, tc - tTr);
      K.som('errado', tTr + 0.1, 0.3);
      // CÂMERA: (1) parado, alto, de frente, a guerra atrás e ele vindo
      const q = K.suave(pc(tc, B.inicio, tMa)); K.mirar([K.lerp(0.9, 0.6, q), K.lerp(3.4, 2.8, q), CZ + K.lerp(8.2, 7.4, q)], [0.1, 1.5, CZ - 0.8]);
    },
    reencontro(B, tc) {
      // NA TELA: a guerra continua no fundo; na frente a placa da Floricultura Ipê, a Lu e o Caio chegando; em "post" ela aponta a guerra; em "nenhum" o celular dela em tela grande (300 comentários, NÃO LIDOS); em "mensagem" a do Caio verde e lida · MOSTRA: personagem, dono, lidas
      const tDa = quando('dona', B, 0.12), tPo = quando('post', B, 0.2), tNe = quando('nenhum', B, 0.45), tMe = quando('mensagem', B, 0.8), tDe = quando('dele', B, 0.95);
      const tFim = Math.min(tDe, B.ate - 0.5), olhaGuerra = tc > tPo && tc < tNe;
      guerra(tc, B); X.postB.mostrar('postB', { n: 300 }); ve(X.placaFlor);
      dono.g.visible = true; dono.colocar(DNB, [0.95, 1.2, CZ + 6]);
      // PERSONAGEM: Caio · entra andando até "dona" · em "post": olha a guerra · em "dele": comemora
      if (tc < tDa) { menino.irPara([-1.5, 0, CZ + 3.7], RHB, K.clamp(pc(tc, B.inicio - 0.4, tDa)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(RHB, olhaGuerra ? [PB[0], 2.0, PB[2]] : cabecaDe(dono, -0.5)); if (tc > tFim) menino.reagir('comemorando', tc - tFim); else menino.reagir('surpreso', tc - tDa); menino.humor(tc > tMe ? 'feliz' : 'surpreso'); }
      // a Lu · começo: sorri · em "post": aponta a guerra · em "nenhum": dá de ombros · em "mensagem": mostra o celular
      dono.colocar(DNB, olhaGuerra ? [PB[0] + 0.6, 2.2, PB[2]] : tc > tNe ? [0.9, 1.4, CZ + 8] : cabecaDe(menino, -0.5));
      if (tc > tMe) dono.reagir('mostrando', tc - tMe); else if (tc > tNe) dono.reagir('ombros', tc - tNe); else if (olhaGuerra) dono.apontar(0.7); else dono.reagir('segurando', tc);
      dono.humor(tc > tNe && tc < tMe ? 'normal' : 'feliz');
      // ENTRA AGORA: o celular dela em "nenhum"; a mensagem do Caio em "mensagem" (a posição vai depois do K.entrar)
      if (tc > tNe - 0.1) { ve(X.lidas); K.entrar(X.lidas.g, 'cresce', tc - tNe + 0.1, { dur: 0.3 }); X.lidas.g.position.set(...LIDAS); X.lidas.g.rotation.set(0, 0, 0); X.lidas.mostrar('lidas', { dele: tc > tMe }); }
      // EFEITOS VISUAIS: "A dona do post" em "dona" · "0 de 300 lidos" em "nenhum" · "Só a dele", ✓ e dinheiro no fim
      if (tc < tNe) fx.et.donaPost.em({ tela: [540, 400] }, tc - tDa); else if (tc < tFim) fx.et.naoLeu.em({ tela: [540, 400] }, tc - tNe); else fx.et.fechou.em({ tela: [540, 400] }, tc - tFim);
      fx.simb.em(cabecaDe(dono, 0.45), tc - tFim, { tipo: '✓', tam: 1.0 });
      fx.grana.em(mais(RHB, [0.6, 0, -0.2]), tc - tFim - 0.1, { raio: 1.2, altura: 3, dur: 1.4 });
      K.som('ding', tDa, 0.4); K.som('brilho', tNe, 0.4); K.som('errado', tNe + 0.25, 0.3);
      for (let k = 0; k < 3; k++) K.som('bip', tMe + k * 0.1, 0.2); K.som('certo', tFim, 0.6); K.som('festa', tFim + 0.1, 0.5);
      // CÂMERA: (1) chegando, médio, de frente, os dois · (2) afastando, alto, os dois de costas e a guerra inteira · (3) parado, médio, o celular dela · (4) passando, esquerda, os dois comemorando
      if (tc < tPo) { const q = K.suave(pc(tc, B.inicio, tPo)); K.mirar([K.lerp(0.5, 0.3, q), 1.9, CZ + K.lerp(8.8, 8.2, q)], [0.2, 1.2, CZ + 2.8]); }
      else if (tc < tNe) { const q = K.suave(pc(tc, tPo, tNe)); K.mirar([0.3, K.lerp(2.4, 3.2, q), CZ + K.lerp(8.6, 10.0, q)], [0.3, 1.6, CZ - 1.8]); }
      else if (tc < tFim) { const q = K.suave(pc(tc, tNe, tFim)); K.mirar([1.25, 1.9, CZ + K.lerp(8.2, 7.6, q)], [1.2, 1.55, CZ + 2.8]); }
      else { const q = K.suave(pc(tc, tFim, B.ate)); K.mirar([K.lerp(-1.3, -0.9, q), 2.0, CZ + K.lerp(9.0, 8.4, q)], [0.4, 1.3, CZ + 2.8]); }
    },
    antes() {},
    capa() {
      guerra(1.3, null); X.postB.mostrar('postB', { n: 300 });
      menino.colocar(MB, [0.6, 1.4, CZ + 6]); menino.reagir('susto', 0.3); menino.humor('assustado');
      X.flechas.forEach((f, i) => { if (i % 3) f.visible = false; });
      ve(X.tiro); const c = cabecaDe(menino, -0.12); X.tiro.position.set(c[0] + 0.42, c[1] - 0.12, c[2] + 0.3); X.tiro.scale.setScalar(0.8);
      K.mirar([0.9, 1.75, CZ + 5.0], [0.3, 1.45, CZ - 0.8]);
      if (fx.expl) fx.expl.em([0.3, 0.2, CZ - 2.6], 0.35, { escala: 0.55, forca: 0.5, som: false, tremer: false });
      encarar(); // a capa não passa pelo fim do cena(): os balões viram pra câmera aqui
      X.tiro.rotateZ(-0.35);
    }
  };
  ['grupo', 'insta', 'mensagens'].forEach((k) => { PV.batalha[k] = PV.gui[k]; });
  PV.batalha.investe = PV.placa.investe;
  PV.batalha.campanha = PV.placa.campanha;
  PV.batalha.venda = PV.placa.venda;
  // ---------- Triturador ----------
  // a máquina ligada: a esteira e os balões andando, os rolos girando, a luz piscando, o confete em chafariz
  // (forca > 1 = um estouro maior); sem: balões que não entram (o do Fábio anda à parte)
  function triturando(tc, B, forca = 1, deU = 0) {
    ve(X.tri, X.est, X.filaG, X.confG, X.monte, X.placaLav);
    X.lonaTex.offset.y = -tc * 2.8;
    X.rolos.forEach((r) => { r.rotation.x = tc * 14 * r.userData.lado; });
    X.luz.material.color.setHex(Math.floor(tc * 3) % 2 ? 0x5a0d08 : 0xff2a1a);
    X.fila.forEach((m) => {
      const u = (m.userData.u0 + tc * 0.2) % 1;
      m.visible = u > Math.max(0.015, deU) && u < 0.985; if (!m.visible) return;
      m.position.set(...naEsteira(u, m.userData.fx, m.userData.fy)); m.scale.setScalar(u > 0.95 ? (0.985 - u) / 0.035 : 1);
    });
    const per = 1.6;
    X.conf.forEach((m, i) => {
      const a = ((tc / per + m.userData.f) % 1) * per, f = forca, v = m.userData.v;
      m.visible = i < 170 * Math.min(1, 0.55 + 0.45 * f);
      const y = BOCA[1] + v[1] * a * (0.75 + 0.25 * f) - 4.9 * a * a;
      m.position.set(BOCA[0] + v[0] * a * (0.8 + 0.2 * f), Math.max(0.03, y), BOCA[2] + v[2] * a * (0.8 + 0.2 * f));
      if (y <= 0.03) m.rotation.set(-PI / 2, 0, m.userData.g); else m.rotation.set(a * 9 + m.userData.g, a * 6, m.userData.g);
    });
    if (B) { for (let k = 0; k < Math.floor(B.dur / 0.25); k++) K.som('clique', B.inicio + k * 0.25, 0.08); }
  }
  PV.triturador = {
    gancho(B, tc) {
      // NA TELA: a esteira gigante cheia de "Oi, faço sites!" subindo até o triturador na porta da lavanderia; o confete jorrando; o Fábio correndo do lado atrás do balão amarelo dele; em "cá" o balão some na boca · MOSTRA: personagem, triturador, esteira
      const tMe = quando('mensagem', B, 0.3), tCa = quando('cá', B, 0.92), tJ = tCa - 0.45;
      triturando(tc, B, tc > tCa && tc < tCa + 0.7 ? 2.2 : 1);
      // OBJETOS SE MEXENDO: o balão amarelo da metade da esteira até a boca em "cá"
      const u = K.lerp(0.45, 0.985, pc(tc, B.inicio, tCa));
      if (tc < tCa) { ve(X.meu); X.meu.position.set(...naEsteira(u, 0, 0.42)); X.meu.scale.setScalar(u > 0.95 ? Math.max(0.2, (0.985 - u) / 0.035) : 1); }
      // PERSONAGEM: começo: corre do lado da esteira, desesperado · antes de "cá": pula pra pegar · em "cá": cai de costas no confete
      const zM = naEsteira(Math.min(u, 0.985))[2], zF = Math.max(CZ - 2.2, zM + 0.6), P = [-0.85, 0, zF];
      if (tc < tJ) { menino.colocar(P, [-0.6, 1.6, zF - 5]); menino.correr(tc, 1.4); menino.humor('assustado'); }
      else if (tc < tCa) { menino.colocar(P, [0.3, 2.8, zF - 2]); menino.apontar(1); menino.g.position.y = Math.sin(pc(tc, tJ, tCa) * PI) * 0.45; menino.humor('assustado'); }
      else { menino.colocar([-0.85, 0, CZ - 2.2], [-0.85, 1.4, CZ + 6]); menino.cair(K.clamp((tc - tCa) / 0.3)); menino.humor('triste'); }
      // EFEITOS VISUAIS: "Web designer" no começo · "Oi, faço sites!" em "mensagem" · "Direto pro triturador" em "cá" · o poof de confete
      if (tc < tMe) fx.et.web.em({ tela: [540, 430] }, tc - B.inicio + 0.1); else if (tc < tCa) fx.et.msgSua.em({ tela: [540, 430] }, tc - tMe); else fx.et.pro.em({ tela: [540, 430] }, tc - tCa);
      // SONS: whoosh · o motor (cliques) · passos · vapor e estalo em "cá" · errado
      K.som('whoosh', B.inicio + 0.02, 0.5); for (let k = 0; k < 5; k++) K.som('passo', B.inicio + k * 0.3, 0.25);
      K.som('vapor', tCa, 0.6); K.som('estalo', tCa + 0.05, 0.5); K.som('errado', tCa + 0.35, 0.45);
      // CÂMERA: 4 cortes: (1) aberto e alto, de frente, a esteira inteira · (2) de baixo, direita, a boca engolindo · (3) médio, da frente dele, correndo pra câmera · (4) médio, de frente-esquerda, ele caído no confete
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.4, tCa - 0.05);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([1.0, K.lerp(4.8, 4.3, q), CZ + K.lerp(10.5, 9.6, q)], [0.2, 1.6, CZ - 1.8]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([2.1, 0.9, CZ + K.lerp(0.4, -0.1, q)], [0.4, 3.0, CZ - 3.3]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(-1.9, -1.8, q), 2.1, zF - 4.0], [-0.6, 1.4, zF + 0.3]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([-2.4, K.lerp(1.9, 2.3, q), CZ + K.lerp(1.6, 2.0, q)], [-0.6, 0.9, CZ - 2.4]); }
      fx.poof.em(BOCA, tc - tCa, { escala: 0.9 });
    },
    virada(B, tc) {
      // NA TELA: (1) ele do lado do começo da esteira, os balões todos iguais passando; (2) em "nem" os pinos vermelhos "Já tinham site" nas lojas da esquerda; (3) em "triturador" a boca engolindo e o confete estourando · MOSTRA: personagem, esteira, alertas
      const tEr = quando('erro', B, 0.08), tIg = quando('igual', B, 0.2), tNe = quando('nem', B, 0.4), tPr = quando('site', B, 0.6), tTr = quando('triturador', B, 0.88);
      triturando(tc, B, tc > tTr && tc < tTr + 0.7 ? 2.2 : 1);
      const P = [-0.95, 0, CZ + 3.0];
      // PERSONAGEM: começo: olha os balões passando, tem a ideia · em "nem": aponta as lojas · em "triturador": mão na testa
      if (tc < tNe) { menino.colocar(P, tc < tEr ? [0.3, 1.2, CZ + 2.0] : [-1.6, 1.5, CZ + 7]); if (tc > tEr) { menino.reagir('ideia', tc - tEr); menino.humor('surpreso'); } else { menino.reagir('triste', tc); menino.humor('triste'); } }
      else if (tc < tTr) { menino.colocar(P, [-5, 3, CZ - 5]); menino.apontar(0.7); menino.humor('surpreso'); }
      else { menino.colocar([-0.85, 0, CZ - 1.5], [0.3, 2.5, CZ - 3.2]); menino.reagir('mao_na_testa', tc - tTr); menino.humor('triste'); }
      if (tc > tEr && tc < tNe) fx.simb2.em(cabecaDe(menino, 0.4), tc - tEr, { tipo: '!', tam: 0.7 });
      // ENTRA AGORA: os pinos vermelhos um por um de "nem" a "site"
      if (tc < tTr) X.alertas.forEach((p, i) => { const t0 = tNe + i * Math.max(0.1, (tPr - tNe) / 4); if (tc > t0) { ve(p); p.em(tc, pop(tc - t0)); K.som('estalo', t0, 0.25); } });
      // EFEITOS VISUAIS: "O erro" · "Todas iguais" em "igual" · "Já tinham site" no pino · "Vira confete" e ✗ em "triturador"
      if (tc < tIg) fx.et.erro.em({ tela: [540, 400] }, tc - tEr); else if (tc < tNe) fx.et.iguais.em({ tela: [540, 400] }, tc - tIg);
      else if (tc < tTr) { const a0 = X.alertas[0]; if (a0) fx.et.jaTinham.em(mais(a0.g.position.toArray(), [2.2, 0.9, 0]), tc - tPr + 0.2); else fx.et.jaTinham.em({ tela: [540, 400] }, tc - tPr); }
      else fx.et.confete.em({ tela: [540, 400] }, tc - tTr);
      K.som('ding', tEr, 0.5); K.som('bip', tIg, 0.3); K.som('vapor', tTr, 0.5); K.som('errado', tTr + 0.2, 0.45);
      // CÂMERA: (1) chegando, médio, frente-esquerda, ele e a esteira · (2) virando, do calçadão da direita, as lojas com os pinos · (3) de baixo, de frente, a boca engolindo
      if (tc < tNe) { const q = K.suave(pc(tc, B.inicio, tNe)); K.mirar([K.lerp(-2.0, -1.7, q), 1.9, CZ + K.lerp(6.8, 6.1, q)], [-0.3, 1.3, CZ + 2.4]); }
      else if (tc < tTr) { const q = K.suave(pc(tc, tNe, tTr)); K.mirar([K.lerp(1.2, 1.4, q), K.lerp(3.4, 3.8, q), CZ + K.lerp(8.5, 9.2, q)], [K.lerp(-1.6, -2.8, q), K.lerp(2.0, 2.6, q), CZ - K.lerp(0, 2, q)]); }
      else { const q = K.suave(pc(tc, tTr, B.ate)); K.mirar([-2.6, 2.6, CZ + K.lerp(2.2, 1.8, q)], [-0.2, 1.9, CZ - 2.6]); fx.simb.em(mais(BOCA, [0, 0.9, 0.3]), tc - tTr - 0.2, { tipo: '✗', tam: 0.7 }); }
      fx.poof.em(BOCA, tc - tTr, { escala: 0.9 });
    },
    reencontro(B, tc) {
      // NA TELA: o triturador do gancho ainda engolindo; na frente o começo da esteira na cintura, a dona Cida do lado direito e o Fábio chegando pelo esquerdo; em "cem" o contador; em "dele" o balão verde dele entra na esteira; em "tirou" ela pega com a mão · MOSTRA: personagem, dono, minha
      const tDa = quando('dona', B, 0.08), tTr = quando('triturador', B, 0.2), tCe = quando('cem', B, 0.35), tDe = quando('dele', B, 0.5), tUn = quando('única', B, 0.62), tTi = quando('tirou', B, 0.75), tEs = quando('esteira', B, 0.92);
      const tFim = Math.min(tEs, B.ate - 0.5);
      triturando(tc, B, 1, 0.3); ve(X.placaLav);
      // PERSONAGEM: Fábio · entra andando até "dona" · em "triturador": olha o triturador, surpreso · no fim: comemora
      if (tc < tDa) { menino.irPara([-1.05, 0, CZ + 6.6], RHT, K.clamp(pc(tc, B.inicio - 0.4, tDa)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(RHT, tc > tTr && tc < tCe ? [0.3, 2.5, CZ - 3.6] : cabecaDe(dono, -0.5)); if (tc > tFim) menino.reagir('comemorando', tc - tFim); else menino.reagir('surpreso', tc - tDa); menino.humor(tc > tTi ? 'feliz' : 'surpreso'); }
      // a dona · começo: sorri · em "triturador": aponta o triturador · em "tirou": pega o balão e mostra
      dono.g.visible = true;
      if (tc > tTr && tc < tCe) { dono.colocar(DNT, [0.3, 2.5, CZ - 3.6]); dono.apontar(0.6); }
      else { dono.colocar(DNT, tc > tTi ? [0.6, 1.6, CZ + 8] : cabecaDe(menino, -0.5)); if (tc > tTi) dono.reagir('mostrando', tc - tTi); else dono.reagir('segurando', tc); }
      dono.humor('feliz');
      // ENTRA AGORA: o balão verde dele na esteira em "dele"; em "tirou" vai pra mão dela e fica do lado da cabeça
      if (tc > tDe) {
        ve(X.minha); const up = 0.02 + Math.min(tc, tTi) * 0 + (Math.min(tc, tTi) - tDe) * 0.2, pE = naEsteira(Math.min(0.17, up), 0, 0.3);
        const pM = mais(cabecaDe(dono, -0.1), [-0.4, 0.42, 0.15]);
        if (tc < tTi) { X.minha.position.set(...pE); X.minha.scale.setScalar(1 + 0.08 * Math.sin(tc * 12)); }
        else { const q = K.suave(K.clamp((tc - tTi) / 0.35)); X.minha.position.set(K.lerp(pE[0], pM[0], q), K.lerp(pE[1], pM[1], q), K.lerp(pE[2], pM[2], q)); X.minha.scale.setScalar(K.lerp(1, 1.25, q)); }
      }
      if (tc > tCe && tc < tDe + 0.3) fx.cont.em([0.3, 2.35, CZ + 2.0], tc - tCe, { de: 1, ate: 100, dur: Math.max(0.4, tDe - tCe), antes: '', depois: ' mensagens', cor: '#e8352b', tam: 0.7 });
      // EFEITOS VISUAIS: "A dona do triturador" · "A única que ela tirou" em "única" · ✓ e dinheiro no fim
      if (tc < tUn) fx.et.donaTri.em({ tela: [540, 400] }, tc - tDa); else fx.et.fechou.em({ tela: [540, 400] }, tc - tUn);
      fx.simb.em(cabecaDe(dono, 0.45), tc - tFim, { tipo: '✓', tam: 1.0 });
      fx.grana.em(mais(RHT, [0.9, 0, -0.3]), tc - tFim - 0.1, { raio: 1.2, altura: 3, dur: 1.4 });
      K.som('passo', B.inicio + 0.1, 0.3); K.som('passo', B.inicio + 0.45, 0.3); K.som('ding', tDa, 0.4);
      for (let k = 0; k < 6; k++) K.som('bip', tCe + k * 0.08, 0.15); K.som('brilho', tDe, 0.5); K.som('certo', tTi + 0.3, 0.6); K.som('festa', tFim + 0.1, 0.5);
      // CÂMERA: (1) chegando, médio, de frente, os dois e o triturador atrás · (2) afastando, alto, a esteira inteira · (3) parado, médio, a dona com o balão · (4) passando, esquerda, os dois comemorando
      if (tc < tCe) { const q = K.suave(pc(tc, B.inicio, tCe)); K.mirar([0.3, 2.6, CZ + K.lerp(10.2, 9.4, q)], [0.2, 1.2, CZ + 2.6]); }
      else if (tc < tTi) { const q = K.suave(pc(tc, tCe, tTi)); K.mirar([0.1, K.lerp(3.0, 3.6, q), CZ + K.lerp(8.6, 9.8, q)], [0.0, 1.3, CZ + 1.2]); }
      else if (tc < tFim) { const q = K.suave(pc(tc, tTi, tFim)); K.mirar([K.lerp(2.7, 2.5, q), 1.9, CZ + K.lerp(7.8, 7.4, q)], [1.4, 1.7, CZ + 3.2]); }
      else { const q = K.suave(pc(tc, tFim, B.ate)); K.mirar([K.lerp(-1.6, -1.2, q), 2.6, CZ + K.lerp(9.8, 9.2, q)], [0.2, 1.2, CZ + 3.2]); }
    },
    antes() {},
    capa() {
      triturando(1.0, null, 1.6, 0.5);
      ve(X.meu); X.meu.position.set(...naEsteira(0.74, -0.45, 0.5)); X.meu.scale.setScalar(1.2);
      menino.colocar([-0.85, 0, CZ - 1.4], [-2.4, 1.8, CZ + 2.4]); menino.reagir('susto', 0.3); menino.humor('assustado');
      K.mirar([-2.4, 2.2, CZ + 2.6], [-0.2, 1.75, CZ - 2.0]);
      encarar(); // a capa não passa pelo fim do cena(): os balões viram pra câmera aqui
      X.meu.rotateZ(0.15);
    }
  };
  ['grupo', 'insta', 'mensagens'].forEach((k) => { PV.triturador[k] = PV.gui[k]; });
  PV.triturador.investe = PV.placa.investe;
  PV.triturador.campanha = PV.placa.campanha;
  PV.triturador.venda = PV.placa.venda;
  // ---------- Garimpo ----------
  function garimpoReset(lugar) {
    X.chapeu.visible = lugar === 'campo';
    if (lugar === 'campo') ve(X.rio);
    X.mt.scale.setScalar(1); X.casc.scale.setScalar(1);
    X.brilhaMat.emissive.setHex(0x000000);
    X.pen.rotation.set(0, 0, 0); X.pen.scale.setScalar(1); X.miudo.visible = false; X.dentro.forEach((p) => { p.visible = true; });
    X.voaP.forEach((p) => { p.visible = false; });
    X.p1a.rotation.set(0, 0, 0); X.p1b.rotation.set(0, 0, 0); X.p1a.position.x = 0; X.p1b.position.x = 0;
    X.pep.visible = false; X.p1tA.visible = true; X.p1tB.visible = false; X.p1pl.visible = true;
    X.tagPad.visible = false; X.tagOf.visible = false;
  }
  // as plaquinhas soltas viram pra câmera (depois do K.mirar do quadro)
  function garimpoEncara() {
    [].concat(X.tagsP, [X.tagPad, X.tagOf, X.p1pl, X.p1tA, X.p1tB, X.boleto, X.padaria.userData.pl, X.oficina.userData.pl]).forEach((m) => {
      if (!m) return; let v = m.visible, o = m.parent; while (v && o) { v = o.visible; o = o.parent; }
      if (v) m.lookAt(K.camera.position);
    });
  }
  // o Murilo segurando a peneira gigante e chacoalhando (forca 0 = parada)
  function peneirando(tc, forca = 1, olhar) {
    ve(X.mt, X.casc, X.pen);
    menino.colocar(GM, olhar || [0.75, 1.3, 6]);
    menino.reagir('segurando', tc); menino.suar && forca > 0.5 && menino.suar(tc);
    const s = Math.sin(tc * 17) * forca;
    X.pen.position.set(PN[0] + s * 0.08, PN[1] + Math.abs(s) * 0.03, PN[2]);
    X.pen.rotation.set(-0.14, 0, s * 0.07);
    X.dentro.forEach((p, i) => { const b = p.userData.base; p.position.set(b[0], b[1] + Math.abs(Math.sin(tc * 9 + i * 1.3)) * 0.18 * forca, b[2]); p.rotation.set(tc * 3 * forca + i, i, 0); });
  }
  const PEN_TOPO = () => [X.pen.position.x, X.pen.position.y + 0.15, X.pen.position.z];
  // as pedras voando da peneira por cima do ombro até o monte (uma a cada "cada" s, de t0 a t1)
  function voarPedras(tc, t0, t1, cada = 0.35) {
    const de = PEN_TOPO(), ate = [CA[0], 0.5, CA[2]];
    X.voaP.forEach((p, i) => {
      const n = Math.floor(Math.max(0, tc - t0) / cada), k = n - ((n - i) % X.voaP.length + X.voaP.length) % X.voaP.length; // a pedra i voa nas vezes k ≡ i
      const ti = t0 + k * cada, q = (tc - ti) / 0.62;
      p.visible = k >= 0 && ti < t1 && q >= 0 && q < 1; if (!p.visible) return;
      p.position.set(K.lerp(de[0], ate[0], q) + (i % 3 - 1) * 0.15 * q, K.lerp(de[1], ate[1], q) + Math.sin(q * PI) * 1.6, K.lerp(de[2], ate[2], q));
      p.rotation.set(tc * 6 + i, tc * 4, 0);
    });
  }
  const arco = (o, de, ate, q, alt) => o.position.set(K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) + Math.sin(q * PI) * alt, K.lerp(de[2], ate[2], q));
  function cascalhoEm(tc, final) { ve(X.mt, X.casc); X.casc.scale.setScalar(final ? 2.3 : 1); if (final) X.mt.scale.set(0.82, 0.78, 0.82); }
  // o Murilo sentado na pedra, a peneira no chão na frente, cheia de pedrinha cinza
  function sentadoCansado(tc) {
    ve(X.banco, X.pen); menino.colocar([GM[0], 0, GM[2] + 0.15], [0.75, 0.6, 6]); menino.sentar(1, 0.48); menino.reagir('cansado', tc); menino.humor('triste');
    X.pen.position.set(GM[0], 0.12, GM[2] + 1.35); X.pen.rotation.set(0.3, 0, 0); X.pen.scale.setScalar(0.75);
    X.miudo.visible = true; X.dentro.forEach((p, i) => { p.visible = i % 3 === 0; const b = p.userData.base; p.position.set(b[0], b[1], b[2]); });
  }

  PV.garimpo = {
    gancho(B, tc) {
      // NA TELA: a montanha de pedras com plaquinha de empresa maior que ele; o Murilo de chapéu chacoalhando a peneira gigante; as pedras voando por cima do ombro pro monte · MOSTRA: personagem, montanha, peneira
      const tEs = quando('escondido', B, 0.5), tMo = quando('montanha', B, 0.85);
      // OBJETOS SE MEXENDO: a peneira sacudindo e as pedras pulando; uma pedra voando a cada 0,35 s
      peneirando(tc, tc < tMo ? 1 : 0.3, tc < tMo ? null : [MT[0], 2.2, MT[2]]);
      voarPedras(tc, B.inicio - 0.5, tMo + 0.2);
      // ENTRA AGORA: a pedra escondida brilha em "escondido"
      const br = K.clamp((tc - tEs) / 0.3); X.brilhaMat.emissive.setRGB(0.55 * br, 0.4 * br, 0.05 * br);
      // PERSONAGEM: começo: chacoalha com força, suando · em "montanha": para e olha a montanha, assustado
      menino.humor(tc < tMo ? 'bravo' : 'surpreso');
      // EFEITOS VISUAIS: "Web designer" no começo · "Tem um aqui" e as estrelinhas na pedra em "escondido"
      const pB = mais(MT, [X.brilha.position.x, X.brilha.position.y, X.brilha.position.z]);
      if (tc < tEs) fx.et.web.em({ tela: [540, 430] }, tc - B.inicio + 0.1); else fx.et.escondido.em(mais(pB, [0, 0.8, 0.3]), tc - tEs);
      if (tc > tEs) fx.estr.em(pB, tc - tEs, { raio: 0.45 });
      // SONS: whoosh · as pedras batendo · baques no monte · brilho em "escondido"
      K.som('whoosh', B.inicio + 0.02, 0.5); for (let k = 0; k < 6; k++) K.som('pedra', B.inicio + k * 0.35, 0.25); K.som('brilho', tEs, 0.6);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto e alto, de frente, a montanha inteira · (2) de baixo, direita, a peneira · (3) médio, frente-esquerda, o rosto · (4) afastando e subindo, a montanha com a pedra brilhando
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.4, tEs - 0.05);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.9, K.lerp(1.75, 1.65, q), K.lerp(7.6, 7.0, q)], [0.1, 1.85, -0.7]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(3.4, 3.1, q), 1.5, K.lerp(2.9, 2.6, q)], [0.6, 1.35, 0.1]); }
      else if (tc < c3) { const c = cabecaDe(menino, -0.3), q = K.suave(pc(tc, c2, c3)); K.mirar([c[0] - K.lerp(1.2, 1.0, q), c[1] + 0.35, c[2] + 3.0], [c[0] - 0.2, c[1] - 0.05, c[2]]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(1.5, 1.8, q), K.lerp(1.6, 1.9, q), K.lerp(5.8, 7.2, q)], [-0.3, 2.0, -1.6]); }
    },
    peneira(B, tc) {
      // NA TELA: a pedra "Padaria Pão Quente" sai da montanha e cai na peneira; ele chacoalha; ✗ e "Já tem site"; ele joga fora · MOSTRA: personagem, peneira, montanha
      const tEm = quando('empresa', B, 0.25), tPr = quando('precisa', B, 0.7), tSi = quando('site', B, 0.9);
      const tPega = B.inicio + 0.15;
      peneirando(tc, tc > tEm + 0.3 && tc < tSi ? 1 : 0.15, tc < tEm ? [MT[0], 1.6, MT[2] + 1] : null);
      // OBJETOS SE MEXENDO: a pedra da montanha até a peneira (em "empresa"), sacudindo, e pro monte em "site"
      ve(X.padaria); const de = [MT[0] + 0.9, 1.6, MT[2] + 1.3], pP = mais(PEN_TOPO(), [0, 0.05, 0]), ate = [CA[0], 0.6, CA[2]];
      if (tc < tPega) X.padaria.position.set(...de);
      else if (tc < tSi) arco(X.padaria, de, pP, K.suave(pc(tc, tPega, tEm + 0.1)), 0.9);
      else arco(X.padaria, pP, ate, K.clamp((tc - tSi) / 0.6), 1.5);
      X.padaria.visible = tc < tSi + 0.6;
      if (tc > tEm + 0.1 && tc < tSi) X.padaria.position.y += Math.abs(Math.sin(tc * 9)) * 0.15;
      X.tagPad.visible = tc > tPr;
      // PERSONAGEM: começo: olha a montanha e puxa a pedra · em "precisa": faz que não · em "site": joga fora
      if (tc < tEm) menino.humor('normal'); else if (tc > tPr) { menino.reagir('nao', tc - tPr); menino.humor('bravo'); } else menino.humor('surpreso');
      // EFEITOS VISUAIS: "Murilo, web designer" no começo · "Uma por uma" em "empresa" · ✗ em "precisa"
      if (tc < tEm) fx.et.intro.em({ tela: [540, 420] }, tc - B.inicio + 0.05); else fx.et.umaUma.em({ tela: [540, 420] }, tc - tEm);
      fx.simb.em(mais(PEN_TOPO(), [0.6, 0.7, 0.2]), tc - tPr, { tipo: '✗', tam: 0.6 });
      // SONS: estalo da pedra · chocalho · errado · baque
      K.som('pedra', tPega, 0.4); for (let k = 0; k < 4; k++) K.som('pedra', tEm + 0.3 + k * 0.25, 0.2); K.som('whoosh', tSi, 0.4); K.som('baque', tSi + 0.6, 0.4);
      // CÂMERA: (1) chegando, médio, da esquerda, ele e a montanha · (2) perto, de frente e de cima, a peneira com a pedra e o ✗
      if (tc < tEm + 0.3) { const q = K.suave(pc(tc, B.inicio, tEm + 0.3)); K.mirar([K.lerp(-2.4, -2.1, q), 2.0, K.lerp(5.0, 4.4, q)], [0.1, 1.5, -0.6]); }
      else { const q = K.suave(pc(tc, tEm + 0.3, B.ate)); K.mirar([K.lerp(1.4, 1.6, q), K.lerp(2.6, 2.4, q), K.lerp(4.2, 4.6, q)], [0.8, 1.35, 0.6]); }
    },
    dias(B, tc) {
      // NA TELA: "Dia 1": ele ergue a pedra Tinta Viva ("Já tem site") e joga longe, sozinha na grama da direita · "Dia 2": a pedra da oficina ("Já tem quem faça") vai pro monte · MOSTRA: personagem, pedra1, cascalho
      const tUm = quando('um', B, 0.08), tSi = quando('site', B, 0.38), tDo = quando('dois', B, 0.55), tFa = quando('faça', B, 0.9);
      ve(X.mt, X.casc, X.p1); X.casc.scale.setScalar(tc > tFa ? 1.35 : 1.15);
      const cima = mais(cabecaDe(menino, 0), [0, 0.55, 0.15]);
      // OBJETOS SE MEXENDO: a pedra1 nas mãos em cima da cabeça, depois em arco até P1 (fica lá); a oficina pro monte em "faça"
      menino.colocar(GM, tc < tSi ? [1.2, 1.4, 6] : tc < tDo ? [P1[0], 0.5, P1[2]] : [0.75, 1.4, 6]);
      if (tc < tSi) { menino.reagir('erguendo', tc - tUm); menino.humor('normal'); X.p1.position.set(...mais(cima, [0, -0.32, 0])); }
      else { X.p1.position.set(...P1); const q = K.clamp((tc - tSi) / 0.7); if (q < 1) arco(X.p1, mais(cima, [0, -0.32, 0]), P1, K.suave(q), 1.2); }
      if (tc > tSi && tc < tDo) { menino.apontar(0.4); menino.humor('bravo'); }
      if (tc > tDo) {
        ve(X.oficina); X.tagOf.visible = true;
        if (tc < tFa) { menino.reagir('erguendo', tc - tDo); menino.humor('triste'); X.oficina.position.set(...mais(cabecaDe(menino, 0), [0, 0.25, 0.15])); }
        else { const q = K.clamp((tc - tFa) / 0.6); arco(X.oficina, mais(cabecaDe(menino, 0), [0, 0.25, 0.15]), [CA[0], 0.8, CA[2]], q, 1.3); X.oficina.visible = q < 1; menino.reagir('ombros', tc - tFa); menino.humor('triste'); }
      }
      X.p1tA.visible = true;
      // EFEITOS VISUAIS: "Dia 1" · "Dia 2" (a pílula vermelha "Já tem site" está na pedra1; a laranja na da oficina)
      if (tc < tDo) fx.et.dia1.em({ tela: [540, 400] }, tc - tUm + 0.1); else fx.et.dia2.em({ tela: [540, 400] }, tc - tDo);
      K.som('whoosh', tSi, 0.5); K.som('baque', tSi + 0.7, 0.5); K.som('errado', tSi + 0.1, 0.35); K.som('whoosh', tFa, 0.4); K.som('baque', tFa + 0.6, 0.4);
      // CÂMERA: (1) médio, frente-direita, ele erguendo a pedra1 · (2) a pedra1 caindo sozinha na grama · (3) médio, esquerda, a segunda pedra
      if (tc < tSi) { const q = K.suave(pc(tc, B.inicio, tSi)); K.mirar([K.lerp(2.0, 1.8, q), 1.9, K.lerp(4.4, 4.0, q)], [0.75, 1.75, -0.1]); }
      else if (tc < tDo) { const q = K.suave(pc(tc, tSi, tDo)); K.mirar([K.lerp(1.0, 1.4, q), K.lerp(2.4, 2.1, q), K.lerp(5.6, 5.4, q)], [K.lerp(1.6, 2.6, q), 0.9, 0.4]); }
      else { const q = K.suave(pc(tc, tDo, B.ate)); K.mirar([K.lerp(-1.5, -1.2, q), 1.8, K.lerp(4.2, 4.6, q)], [0.9, 1.5, -0.4]); }
    },
    cascalho(B, tc) {
      // NA TELA: "Dia 7"; o monte de cascalho enorme e a montanha menor; ele sentado na pedra, cansado, a peneira no chão cheia de pedrinha cinza; em "aluguel" o boleto voa e para na frente dele · MOSTRA: personagem, peneira, cascalho
      const tCa = quando('cascalho', B, 0.45), tAl = quando('aluguel', B, 0.7);
      cascalhoEm(tc, true);
      // PERSONAGEM: começo: sentado, cansado · em "aluguel": susto, as mãos na cabeça
      sentadoCansado(tc);
      if (tc > tAl + 0.4) { menino.reagir('susto', tc - tAl - 0.4); menino.humor('assustado'); }
      // ENTRA AGORA: o boleto voando da esquerda, girando, até a frente do peito dele
      if (tc > tAl - 0.1) { ve(X.boleto); const ate = mais(cabecaDe(menino, -0.55), [0.0, 0.0, 0.45]), q = K.suave(K.clamp((tc - tAl + 0.1) / 0.5)); arco(X.boleto, [-2.5, 2.6, 1.5], ate, q, 0.6); }
      // EFEITOS VISUAIS: "Dia 7: zero cliente" · "Aluguel vencendo" em "aluguel"
      if (tc < tAl) fx.et.dia7.em({ tela: [540, 400] }, tc - B.inicio + 0.05); else fx.et.aluguel.em({ tela: [540, 400] }, tc - tAl);
      K.som('whoosh', B.inicio + 0.05, 0.25); K.som('pedra', tCa, 0.3); K.som('whoosh', tAl - 0.1, 0.5); K.som('errado', tAl + 0.4, 0.5);
      // CÂMERA: (1) afastando, alto, de frente, o monte enorme e ele pequeno · (2) perto, o rosto e o boleto
      if (tc < tAl + 0.3) { const q = K.suave(pc(tc, B.inicio, tAl + 0.3)); K.mirar([K.lerp(1.4, 1.7, q), K.lerp(2.3, 3.2, q), K.lerp(5.2, 6.8, q)], [1.2, 0.95, -0.5]); }
      else { const c = cabecaDe(menino, -0.3); K.mirar([c[0] + 0.6, c[1] + 0.15, c[2] + 2.6], [c[0], c[1] - 0.2, c[2]]); }
    },
    reencontro(B, tc) {
      // NA TELA: a pedra Tinta Viva sozinha na grama, o tatuador do lado; o Murilo chega; a etiqueta "Já tem site" vira "Só Instagram"; a pedra racha e a pepita de ouro sobe brilhando · MOSTRA: personagem, dono, pedra1
      const tPr = quando('primeira', B, 0.1), tJo = quando('jogou', B, 0.35), tSi = quando('site', B, 0.6), tIn = quando('Instagram', B, 0.85);
      const tRa = tIn + 0.1, tFim = Math.min(tRa + 0.7, B.ate - 0.4);
      ve(X.mt, X.casc, X.p1); X.casc.scale.setScalar(2.3); X.mt.scale.set(0.82, 0.78, 0.82); X.p1.position.set(...P1);
      // PERSONAGEM: começo: o Murilo chega andando · em "primeira": para, reconhece, mão na testa · depois da pepita: comemora
      if (tc < tPr) { menino.irPara([0.9, 0, 3.2], MR, K.clamp(pc(tc, B.inicio - 0.5, tPr)), tc, {}); menino.humor('normal'); }
      else { menino.colocar(MR, tc < tFim ? [P1[0], 0.4, P1[2]] : [4.0, 1.3, 2.5]); if (tc > tFim) menino.reagir('comemorando', tc - tFim); else if (tc > tRa) menino.reagir('surpreso', tc - tRa); else menino.reagir('mao_na_testa', tc - tPr); menino.humor(tc > tRa ? 'feliz' : 'surpreso'); }
      // o tatuador: aponta a pedra · no fim comemora junto
      dono.g.visible = true; dono.colocar(DT, tc < tFim ? [P1[0], 0.4, P1[2]] : cabecaDe(menino, -0.5));
      if (tc > tFim) dono.reagir('mostrando', tc - tFim); else if (tc > tJo) dono.apontar(0.2); else dono.reagir('segurando', tc);
      dono.humor('feliz');
      // OBJETOS SE MEXENDO: a etiqueta troca em "Instagram"; as metades abrem e a pepita sobe girando
      X.p1tA.visible = tc < tIn; X.p1tB.visible = tc >= tIn;
      const qa = K.suave(K.clamp((tc - tRa) / 0.35));
      X.p1a.rotation.z = qa * 0.9; X.p1b.rotation.z = -qa * 0.9; X.p1a.position.x = -qa * 0.12; X.p1b.position.x = qa * 0.12;
      X.p1pl.visible = qa < 0.5;
      if (tc > tRa) { X.pep.visible = true; X.pep.position.y = 0.32 + K.suave(K.clamp((tc - tRa) / 0.5)) * 0.75; X.pep.rotation.set(tc * 2, tc * 3, 0); X.pep.scale.setScalar(K.lerp(1, 1.5, K.clamp((tc - tRa) / 0.5))); }
      // EFEITOS VISUAIS: "A primeira pedra" · "Só Instagram" · estrelinhas na pepita · ✓ e o dinheiro no fim
      if (tc < tIn) fx.et.primeira.em({ tela: [540, 400] }, tc - tPr); else if (tc < tFim) fx.et.soInsta.em({ tela: [540, 400] }, tc - tIn); else fx.et.fechou.em({ tela: [540, 400] }, tc - tFim);
      if (tc > tRa) fx.estr.em(mais(P1, [0, 1.05, 0]), tc - tRa, { raio: 0.5 });
      fx.simb.em(cabecaDe(dono, 0.45), tc - tFim, { tipo: '✓', tam: 1.0 });
      fx.grana.em(mais(MR, [0.85, 0, -0.2]), tc - tFim - 0.1, { raio: 1.2, altura: 3, dur: 1.4 });
      K.som('passo', B.inicio + 0.1, 0.3); K.som('passo', B.inicio + 0.45, 0.3); K.som('ding', tPr, 0.4); K.som('bip', tIn, 0.4);
      K.som('racha', tRa, 0.6); K.som('brilho', tRa + 0.15, 0.6); K.som('certo', tFim, 0.6); K.som('festa', tFim + 0.1, 0.5);
      // CÂMERA: (1) chegando, médio, de frente, os dois e a pedra · (2) perto, a pedra rachando e a pepita · (3) passando, da esquerda, os dois comemorando
      if (tc < tSi) { const q = K.suave(pc(tc, B.inicio, tSi)); K.mirar([3.2, K.lerp(2.1, 1.9, q), K.lerp(7.6, 6.6, q)], [3.25, 1.0, 0.9]); }
      else if (tc < tFim) { const q = K.suave(pc(tc, tSi, tFim)); K.mirar([K.lerp(3.6, 3.4, q), K.lerp(2.0, 1.9, q), K.lerp(5.6, 5.1, q)], [3.3, 1.0, 1.0]); }
      else { const q = K.suave(pc(tc, tFim, B.ate)); K.mirar([K.lerp(1.6, 2.0, q), 2.0, K.lerp(6.6, 6.2, q)], [3.3, 1.1, 0.9]); }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o campo, ele sentado cansado no cascalho · (2) Agora: o quarto, as pepitas pulando do monitor pra mesa, "30" · (3) ele de pé com o escorredor cheio de macarrão soltando vapor · MOSTRA: personagem, pepitas, macarrao
      const tAg = quando('Agora', B, 0.3), tTa = quando('tarde', B, 0.55), tPe = quando('peneira', B, 0.68), tMa = quando('macarrão', B, 0.92);
      if (tc < tAg - 0.05) {
        cascalhoEm(tc, true); sentadoCansado(tc);
        fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio + 0.05);
        K.som('whoosh', B.inicio + 0.05, 0.3);
        const q = K.suave(pc(tc, B.inicio, tAg)); K.mirar([K.lerp(1.9, 2.2, q), K.lerp(2.6, 3.4, q), K.lerp(5.0, 6.4, q)], [1.2, 0.9, -0.5]);
        return;
      }
      ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      if (tc < tPe) {
        // Agora: as pepitas pulam do monitor em arco pra pilha na mesa (uma a cada 0,04 s)
        sentado(MONITOR); menino.reagir(tc > tTa ? 'comemorando' : 'digitando', tc - tTa); menino.humor('feliz');
        ve(X.pepG);
        const PIL = [0.15, 0.86, -1.05], tela = [MONITOR[0], MONITOR[1] + 0.05, MONITOR[2] + 0.1];
        X.peps.forEach((p, i) => {
          const t0 = tAg + i * 0.04, q = K.clamp((tc - t0) / 0.45); p.visible = tc > t0; if (!p.visible) return;
          const fim = [PIL[0] + ((i * 37) % 7 - 3) * 0.035, PIL[1] + Math.floor(i / 9) * 0.05, PIL[2] + ((i * 13) % 5 - 2) * 0.03];
          arco(p, tela, fim, q, 0.45); p.rotation.set(tc * 4 + i, i, 0);
        });
        fx.cont.em([-0.25, 1.55, -1.15], tc - tAg, { de: 1, ate: 30, dur: 1.2, antes: '', depois: ' pepitas', cor: '#c99a00', tam: 0.6 });
        fx.et.agora.em({ tela: [540, 380] }, tc - tAg);
        for (let k = 0; k < 8; k++) K.som('pingo', tAg + k * 0.12, 0.2); K.som('certo', tTa, 0.5);
        { const q = K.suave(pc(tc, tAg, tPe)); K.mirar([K.lerp(1.9, 1.7, q), 1.85, K.lerp(0.9, 0.6, q)], [-0.25, 1.15, -1.1]); }
        return;
      }
      // a peneira virou escorredor: de pé com o escorredor de macarrão, vapor subindo, rindo
      cadeiraDoLado(); menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.reagir('segurando', tc - tPe); menino.humor('feliz');
      menino.g.updateMatrixWorld(true); const m0 = menino.mao(0), m1 = menino.mao(1);
      ve(X.mac); X.mac.position.set((m0[0] + m1[0]) / 2, (m0[1] + m1[1]) / 2 + 0.05, (m0[2] + m1[2]) / 2 + 0.22); X.mac.rotation.set(0.35, 0, 0);
      X.vapor.forEach((v, i) => { const f = ((tc * 0.8 + i / 6) % 1); v.position.set(Math.sin(i * 2 + tc) * 0.1, 0.1 + f * 0.55, Math.cos(i * 3) * 0.08); v.scale.setScalar(0.6 + f * 1.4); v.material.opacity = 0.5 * (1 - f); });
      fx.et.escorredor.em({ tela: [540, 400] }, tc - tMa + 0.2);
      K.som('vapor', tPe + 0.1, 0.35); K.som('ding', tMa, 0.4);
      K.filmar([menino, cabecaDe(menino, 0.35), X.mac.position.toArray()], 'chegando', pc(tc, tPe, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.2, obstaculos: false, tam: 1.4 });
    },
    antes() {},
    capa() {
      peneirando(0.42, 1, [0.4, 1.6, 6]);
      voarPedras(0.42 + 0.15, 0, 9);
      menino.humor('assustado');
      X.brilhaMat.emissive.setRGB(0.55, 0.4, 0.05);
      K.mirar([1.5, 2.0, 4.6], [0.15, 1.6, -0.8]);
      encarar(); // a capa não passa pelo fim do cena(): as plaquinhas viram pra câmera aqui
    }
  };
  PV.garimpo.investe = PV.placa.investe;
  PV.garimpo.venda = PV.placa.venda;

  // a conversa do celular (o desenho T.conversa do kit, com os vistos)
  const T_conversa = (c, w, h, e) => K.telasMappoa.conversa(c, w, h, e);

  // ===================================================================================================
  // Planos do Mappoa (iguais nos três)
  // ===================================================================================================
  // o lugar da venda: o dono e o herói (a ótica fica no calçadão; a academia e a clínica, por dentro)
  function lugarDaVenda() {
    const L = VENDA[CFG.venda];
    if (CFG.venda === 'otica' && VID === 'grupo') ve(X.oculos);
    return L;
  }
  function camVenda(q) {
    const L = VENDA[CFG.venda];
    if (CFG.venda === 'otica') K.mirar([K.lerp(-0.4, -0.2, q), 1.8, L.dono[2] + K.lerp(4.8, 4.2, q)], [1.4, 1.3, L.dono[2]]);
    else K.filmar([dono, menino, cabecaDe(dono, 0.3), cabecaDe(menino, 0.3)], 'chegando', q, { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.5, obstaculos: false });
  }

  const COMUM = {
    investe(B, tc) {
      // NA TELA: ele de pé com a comida; ela vira moeda e cai no teclado; o mapa com os pinos acende no monitor · MOSTRA: personagem, comida, monitor
      const tIn = quando('investir', B, 0.22), tCo = quando(CFG.palavraComida, B, 0.45), tFe = quando('ferramenta', B, 0.62), tFi = B.ate - 0.35;
      ve(comp); cadeiraDoLado();
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      // PERSONAGEM: começo: olha a comida · em "<comida>": faz que sim, decidido
      if (tc < tCo) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tCo); else menino.reagir('digitando', tc);
      menino.humor(tc > tCo ? 'feliz' : 'normal');
      // ENTRA AGORA: a comida na mão em "investir"; o poof e a moeda em "ferramenta"; os pinos no fim
      const mao = menino.mao(1), cPos = mais(mao, [0.03, 0.03, 0.08]);
      if (tc > tIn - 0.35 && tc < tFe) { ve(comidaG); comidaG.position.set(...cPos); comidaG.rotation.set(0, Math.sin(tc * 1.2) * 0.3, 0); comidaG.scale.setScalar(pop(tc - tIn + 0.35)); comidaG.userData.pl.lookAt(K.camera.position); }
      if (tc > tFe) {
        fx.poof.em(mais(cPos, [0, 0.2, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(cPos[0], TECLADO[0], q), K.lerp(cPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(cPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tFi ? Math.min(6, 1 + Math.floor((tc - tFi) / 0.06)) : tc > tFe ? 1 : 0;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      // EFEITOS VISUAIS: "Investir" em "investir"
      fx.et.investir.em({ tela: [540, 470] }, tc - tIn);
      // SONS: poof · pingo · estalos dos pinos
      for (let k = 0; k < 6; k++) K.som('estalo', tFi + k * 0.06, 0.2);
      // CÂMERA: (1) chegando, médio, esquerda, ele com a comida · (2) subindo, médio, de frente, o monitor acendendo
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), cPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    busca(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a tela "Sua próxima busca" sobe com o nicho e a cidade · MOSTRA: navegador, busca, personagem
      const tPc = quando('computador', B, 0.05), tDi = quando(W('digita'), B, 0.15), tEs = quando(W('escreve'), B, 0.5), tNi = quando(CFG.nicho.split(' ')[0].toLowerCase(), B, 0.65), tCi = quando(CFG.cidade, B, 0.9);
      ve(comp, navG); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      // ENTRA AGORA: a barra em "computador", as letras em "digita"; a busca sobe em "escreve"; o nicho e a cidade digitados
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tEs - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tEs) {
        ve(buscaP); const q = K.suave(K.clamp((tc - tEs) / 0.4));
        buscaP.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); buscaP.g.scale.setScalar(K.lerp(0.4, 1, q));
        const dig = tc > tCi + 0.35 ? 1 : 0.98 * K.clamp((tc - tNi) / Math.max(0.3, tCi + 0.3 - tNi));
        buscaP.mostrar('buscaV', { digitado: Math.round(dig * 20) / 20, apertado: tc > B.ate - 0.3 });
        K.som('brilho', tEs, 0.5); K.som('clique', B.ate - 0.3, 0.6);
      }
      // PERSONAGEM: sentado digitando · no fim aperta o botão
      sentado(tc > tEs ? TELA_Q : MONITOR);
      if (tc > B.ate - 0.4) menino.apontar(0.6); else menino.reagir('digitando', tc);
      menino.humor('feliz');
      // CÂMERA: (1) até "escreve": chegando, perto, por cima do ombro, a barra · (2) parado, médio, de frente, a busca inteira
      if (tc < tEs) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tEs), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([buscaP, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0]), cabecaDe(menino, 0)], 'parado', pc(tc, tEs, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.4, obstaculos: false });
    },
    lista(B, tc) {
      // NA TELA: a central do Mappoa; a lista grande enchendo; o contador; o grupo SEM SITE; os chips de contato; ele e o robô · MOSTRA: lista, robo, personagem
      const tL = quando('lista', B, 0.12), tN = quando(CFG.palavraTotal, B, 0.3), tQ = quando(CFG.palavraSem, B, 0.6), tC = quando('contatos', B, 0.9);
      ve(listaP, robo); K.entrar(listaP.g, 'cai', tc - tL, { altura: 3 });
      // OBJETOS SE MEXENDO: o total sobe; os cartões descendo; os chips em "contatos"
      const total = tc < tN ? 0 : Math.round(K.lerp(5, CFG.total, pc(tc, tN, tQ - 0.1)));
      const n = tc < tN ? 0 : Math.min(4, 1 + Math.floor((tc - tN) / 0.25));
      listaP.mostrar('listaV', { total, n, sem: tc > tQ, chips: tc > tC });
      robo.g.position.set(-1.55, 0, 1.3); robo.g.rotation.y = 0.5; robo.em(tc, { acena: tc > tQ ? 1 : 0, mapa: false });
      // PERSONAGEM: começo: olha pra cima de boca aberta · em "contatos": comemora
      menino.colocar([1.2, 0, 1.6], [-0.2, 1.8, 0.8]);
      if (tc > tC) menino.reagir('comemorando', tc - tC); else if (tc > tQ) menino.apontar(0.6); else menino.reagir('surpreso', tc - B.inicio);
      menino.humor('feliz');
      // EFEITOS VISUAIS: o total · os sem site
      if (tc < tQ) fx.et.total.em(mais(LISTA_C, [0, 1.6, 0.2]), tc - tN); else fx.et.sem.em(mais(LISTA_C, [0, 1.6, 0.2]), tc - tQ);
      // SONS: brilho · bips · ding
      K.som('brilho', tL, 0.5); for (let k = 0; k < 6; k++) K.som('bip', tN + k * 0.15, 0.2); K.som('ding', tQ, 0.5); K.som('certo', tC, 0.4);
      // CÂMERA: (1) revelando, de frente e de baixo · (2) chegando, médio, esquerda, os chips
      if (tc < tQ) K.filmar([listaP, robo, menino], 'chegando', pc(tc, B.inicio, tQ), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([listaP, menino, robo], 'chegando', pc(tc, tQ, B.ate), { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca, o logo gigante; ele e o robô dos lados; a análise cai com o score enchendo · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseV', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: começo aponta o logo · em "serviço": comemora com o punho
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('vitoria', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      menino.humor('feliz');
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.quem.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, médio, de frente e de baixo · (2) passando, médio, esquerda
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    analise(B, tc) {
      // NA TELA: o quarto; acima do monitor a análise da empresa com a nota; depois a mensagem pronta · MOSTRA: tela, personagem, monitor
      const tAb = quando('abre', B, 0.08), tNo = quando(VID === 'canhao' ? 'noventa' : 'nota', B, 0.4), tMe = quando('mensagem', B, 0.75), tPr = quando(CFG.et.palavraMsg, B, 0.92);
      ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      ve(telaQ); K.entrar(telaQ.g, 'sobe', tc - tAb, { dur: 0.4 });
      // OBJETOS SE MEXENDO: o score girando a partir da "nota"; a mensagem se escrevendo a partir de "mensagem"
      if (tc < tMe) telaQ.mostrar('analiseV', { ate: tc > tNo + 0.4 ? 1 : 0, score: Math.round(K.clamp((tc - tNo) / 0.6) * 20) / 20 });
      else telaQ.mostrar('mensagemV', { digitado: Math.round(K.clamp((tc - tMe) / 0.9) * 20) / 20 });
      // PERSONAGEM: começo clica · no fim: vira pra câmera e aponta a tela
      if (tc < tPr) { sentado(TELA_Q); menino.reagir(tc < tNo ? 'digitando' : 'surpreso', tc - tAb); }
      else { cadeiraDoLado(); menino.colocar(mais(EM_PE, [0.2, 0, 0.2]), TELA_Q); menino.apontar(0.6); }
      menino.humor('feliz');
      // EFEITOS VISUAIS: a nota · a mensagem
      if (tc < tMe) fx.et.nota.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tNo); else fx.et.msg.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tPr);
      K.som('clique', tAb, 0.5); K.som('ding', tNo + 0.6, 0.5); for (let k = 0; k < 6; k++) K.som('clique', tMe + k * 0.12, 0.15);
      // CÂMERA: (1) chegando, médio, direita, a tela e ele · (2) parado, perto, de frente, a mensagem inteira
      if (tc < tMe) K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tMe), { plano: 'medio', lado: 18, altura: 'olho', tam: 1.6, obstaculos: false });
      else K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0])], 'parado', pc(tc, tMe, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.3, obstaculos: false });
    },
    venda(B, tc) {
      // NA TELA: (1) ele no quarto com o celular, "Enviadas" e os ✗; (2) o lugar da venda: o dono aperta a mão dele, o ✓ e o dinheiro · MOSTRA: personagem, celular, dono
      const tV = quando(CFG.palavraEnviadas, B, 0.12), tR = quando(CFG.palavraNao, B, 0.4), tMas = quando('Mas', B, 0.55), tT = quando('topou', B, 0.7), tPv = quando(CFG.palavraFim, B, 0.92);
      if (tc < tMas) {
        ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
        fx.cont.em(mais(EM_PE, [0.2, 2.75, 0.3]), tc - B.inicio, { de: 1, ate: CFG.enviadas, dur: Math.max(0.4, tV - B.inicio + 0.2), antes: 'Enviadas ', depois: '', cor: '#1067f8' });
        if (VID === 'canhao' && tc > tV) fx.simb2.em(mais(EM_PE, [-0.85, 2.0, 0.3]), tc - tV - 0.3, { tipo: '✗', tam: 0.5, som: false });
        const ps = [[-0.75, 1.5, 0.3], [0.75, 1.8, 0.2], [-0.55, 1.1, 0.4], [0.65, 1.2, 0.4]];
        [fx.simb, fx.simb3, fx.simb4].forEach((s, i) => { const dt = tc - (tR - 0.35 + i * 0.12); if (dt > 0) s.em(mais(EM_PE, ps[i]), dt % 0.5, { tipo: '✗', tam: 0.55, som: false }); });
        // PERSONAGEM: começo manda mensagem no celular · nos "não": ombros caídos
        menino.colocar(mais(EM_PE, [0, 0, 0.35]), [0.9, 1.4, 5]);
        if (tc > tR) { menino.reagir('ombros', tc - tR); menino.humor('triste'); } else { menino.reagir('celular', tc); menino.humor('normal'); }
        if (tc < tR) celularNa(menino, (c, w, h) => K.telasMappoa.mensagemV(c, w, h, { digitado: 1 }), 'msg');
        if (VID === 'canhao' && tc < tR) fx.et.quinze.em({ tela: [540, 400] }, tc - tV); else fx.et.semResp.em({ tela: [540, 400] }, tc - tR);
        K.som('whoosh', B.inicio + 0.1, 0.4); for (let k = 0; k < 4; k++) K.som('errado', tR - 0.3 + k * 0.15, 0.12);
        // CÂMERA: (1) passando, médio, direita, ele e os ✗
        K.filmar([menino, cabecaDe(menino, 0.5), mais(EM_PE, [0.2, 2.75, 0.3]), mais(EM_PE, [-0.75, 1.3, 0.3]), mais(EM_PE, [0.75, 1.3, 0.3])], 'passando', pc(tc, B.inicio, tMas), { plano: 'medio', lado: 22, altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 2.0 });
      } else {
        const L = lugarDaVenda();
        menino.colocar(L.heroi, cabecaDe(dono, -0.5)); dono.colocar(L.dono, [L.heroi[0], 1.2, L.heroi[2]]);
        // PERSONAGEM: ele · no fim: pulinhos; o dono · em "topou": faz que sim e estende a mão
        if (tc > tPv) menino.reagir('comemorando', tc - tPv); else menino.reagir('mostrando', tc - tMas);
        if (tc > tT) dono.reagir('mostrando', tc - tT); else dono.reagir('sim', tc - tMas);
        menino.humor('feliz'); dono.humor('feliz');
        if (CFG.venda === 'acad' && tc > tT) K.som('apito', tT, 0.3);
        camVenda(K.suave(pc(tc, tMas, B.ate)));
        // EFEITOS VISUAIS: o ✓ em "topou" · a etiqueta e o dinheiro no fim
        fx.simb.em(cabecaDe(dono, 0.45), tc - tT, { tipo: '✓', tam: 1.0 });
        fx.et.venda.em({ tela: [540, 400] }, tc - tPv);
        K.som('ding', tT, 0.5); K.som('certo', tT + 0.15, 0.6); K.som('festa', tPv, 0.5);
        fx.grana.em(mais(L.heroi, [-0.4, 0, 0]), tc - tPv, { raio: 1.2, altura: 3, dur: 1.4 });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a dor do gancho de novo; (2) Agora: ele chegando no dono, feliz, o ✓ · MOSTRA: personagem, dono
      const tA = quando('Agora', B, 0.45), tF = quando(CFG.palavraFimAgora, B, 0.92);
      if (tc < tA) { PV[VID].antes(B, tc, tA); return; }
      const L = lugarDaVenda();
      const ate = L.heroi;
      menino.irPara(L.de, ate, K.clamp((tc - tA + 0.1) / Math.max(0.6, tF - tA)), tc, { reto: true });
      if (tc > tF) { menino.colocar(ate, cabecaDe(dono, -0.5)); menino.reagir('vitoria', tc - tF); }
      menino.humor('feliz');
      dono.colocar(L.dono, menino.g.position.toArray()); dono.acenar(tc); dono.humor('feliz');
      fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
      fx.et.agora.em({ tela: [540, 380] }, tc - tA);
      fx.simb.em(cabecaDe(menino, 0.4), tc - tF, { tipo: '✓', tam: 1.1 });
      fx.et.fechou.em({ tela: [540, 470] }, tc - tF);
      K.som('whoosh', tA, 0.5); K.som('passo', tA + 0.2, 0.3); K.som('passo', tA + 0.45, 0.3); K.som('certo', tF, 0.6);
      // CÂMERA: (2) ele chegando no dono
      if (CFG.venda === 'otica') { const p = menino.g.position; K.mirar([-0.3, 1.7, p.z + 4.0], [K.lerp(p.x, 1.4, 0.5), 1.25, p.z - 0.6]); }
      else K.filmar([menino, dono, cabecaDe(menino, 0.3)], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.7, obstaculos: false });
    },
    segue(B, tc) {
      // NA TELA: ele de pé no quarto; a pergunta no topo; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando(CFG.palavraCta, B, 0.08), tN = quando(CFG.palavraNumero, B, 0.3), tPc = quando('computador', B, 0.45), tDi = quando('digita', B, 0.55), tSi = quando('sem', B, 0.85);
      if (tc < tPc) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tSi });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('estalo', tQ, 0.4); K.som('ding', tSi, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo aponta pra câmera · em "número": conta nos dedos (pensando) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else if (tc > tN) menino.reagir('pensando', tc - tN); else menino.apontar(1);
      menino.humor('feliz');
      if (tc > tN && tc < tPc) fx.simb2.em(cabecaDe(menino, 0.3), tc - tN, { tipo: '?', tam: 0.7 });
      // CÂMERA: (1) chegando, médio, de frente · (2) parado, aberto, de frente, topo livre pro cartão
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    }
  };

  // vira pra câmera (já posta neste quadro) tudo o que é placa solta: o lookAt antes do K.mirar usava a câmera do quadro anterior
  function encarar() {
    const lista = [].concat(X.baloes || [], X.flechas || [], X.tiro || [], X.fila || [], X.meu || [], X.minha || [], X.volta || [], X.coment || [], X.grande || [], X.plaq5 || [], X.contrato || [], X.cab || []);
    lista.forEach((m) => { if (m.visible && !m.userData.fixo) m.lookAt(K.camera.position); });
    if (comidaG.visible) comidaG.userData.pl.lookAt(K.camera.position);
    if (cel.g.visible) cel.g.lookAt(K.camera.position);
    if (X.abas) X.abas.forEach((m) => { if (m.visible) { m.lookAt(K.camera.position); m.rotateZ(m.userData.rz); } });
    if (X.msgs) X.msgs.forEach((m) => { if (m.visible) { m.lookAt(K.camera.position); m.rotateZ(m.userData.rz); } });
    [].concat(X.voa || [], X.vistos || []).forEach((m) => { if (m.visible) m.lookAt(K.camera.position); });
    if (VID === 'garimpo') garimpoEncara();
  }
  const P = Object.assign({}, COMUM, PV[VID]);
  delete P.antes;

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? LUGAR_VID.capa : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dono].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    multidao.forEach((m) => { m.b.g.visible = false; m.b.g.position.y = 0; });
    ['donaLoja', 'seguranca', 'secretaria', 'dona', 'sobrinho'].forEach((k) => { if (X[k]) X[k].g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0; menino.g.scale.setScalar(1);
    if (X.canhao) { X.canhao.rotation.y = 0; X.canhao.position.z = CZ - 1.2; X.baloes.forEach((b) => { b.visible = false; b.scale.setScalar(1); b.userData.fixo = false; }); }
    if (X.gente) X.gente.forEach((p) => { p.b.g.visible = false; });
    if (X.sobs) X.sobs.forEach((s) => { s.b.g.visible = false; s.b.g.position.y = 0; });
    if (X.sob) X.sob.g.position.y = 0;
    if (X.abas) X.abas.forEach((m) => { m.visible = false; });
    if (X.coment) X.coment.forEach((m) => { m.visible = false; });
    if (X.pedacos) X.pedacos.forEach((m) => { m.visible = false; });
    if (X.pinosMaps) X.pinosMaps.forEach((p) => { p.g.visible = false; });
    buscaP.g.scale.setScalar(1); buscaP.g.position.set(...TELA_Q); buscaP.g.rotation.set(0, 0, 0);
    telaQ.g.scale.setScalar(1); telaQ.g.position.set(...TELA_Q); telaQ.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (VID === 'garimpo') garimpoReset(plano === 'capa' ? 'campo' : lugarDe(B, tc));
    if (plano === 'capa') { PV[VID].capa(); return; }
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    encarar();
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
