// Lote "então não faça isso" (canal Mappoa): três vídeos com o mesmo esqueleto e o mesmo cena.js.
// Muda só a linha VID em cada pasta. Tudo o que é de cada vídeo (nome, comida, nicho, cidade, telas, etiquetas, o lugar
// da venda) fica no CFG; os planos do gancho à virada (e o "Antes") ficam em PV[VID]; os do Mappoa são iguais nos três.
// VID 'canhao': o Bruno num canhão gigante disparando a mesma mensagem pra cidade inteira (academias de Joinville).
// VID 'planilha': o Mateus anotando empresa por empresa numa planilha de papel que dá a volta no quarteirão (clínicas
//   de estética de Maringá).
// VID 'grupo': o post "Alguém faz site?" e a multidão de web designers atropelando o Henrique (óticas de Sorocaba).
// Lugares (K.cenarios): o calçadão entre prédios, o quarto de dia, a central e o palco do Mappoa, e o lugar da venda
// (a academia, a clínica ou a ótica do próprio calçadão). Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const VID = 'grupo';

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
    }
  };
  const CFG = TODOS[VID];
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
    grupo: { gancho: 'rua', post: 'quarto', comentarios: 'quarto', leilao: 'rua', virada: 'rua', capa: 'rua' }
  }[VID];
  const lugarVenda = () => (CFG.venda === 'otica' ? 'rua' : CFG.venda);
  function lugarDe(B, tc) {
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

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    M = K.MAPPOA;
    const lista = [['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], 'central_mappoa', 'mundo_mappoa'];
    if (CFG.venda === 'acad') lista.push(['academia', {}, 'acad']);
    if (CFG.venda === 'clinica') lista.push(['clinica_odonto', {}, 'clinica']);
    CS = K.cenarios(lista);
    Cr = CS.todos.rua;
    // as árvores e os bancos do calçadão (x ±2,6) perto da cena tampam a câmera: somem só neste trecho
    if (Cr.grupo) Cr.grupo.children.forEach((o) => { if (Math.abs(Math.abs(o.position.x) - 2.6) < 0.05 && o.position.z > CZ - 16 && o.position.z < CZ + 22) o.visible = false; });
    telas();

    // Personagens: o do canal, o dono do lugar da venda e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    if (CFG.venda === 'acad') dono = K.personagem('personal');
    else if (CFG.venda === 'clinica') { dono = K.personagem('dentista', { cores: { cabelo: 0x5a3418 } }); if (dono.extras && dono.extras.mascara) dono.extras.mascara.visible = false; }
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
      const tPc = quando('computador', B, 0.05), tDi = quando('digita', B, 0.15), tEs = quando('escreve', B, 0.5), tNi = quando(CFG.nicho.split(' ')[0].toLowerCase(), B, 0.65), tCi = quando(CFG.cidade, B, 0.9);
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
    const lista = [].concat(X.baloes || [], X.volta || [], X.coment || [], X.grande || [], X.plaq5 || []);
    lista.forEach((m) => { if (m.visible && !m.userData.fixo) m.lookAt(K.camera.position); });
    if (comidaG.visible) comidaG.userData.pl.lookAt(K.camera.position);
    if (cel.g.visible) cel.g.lookAt(K.camera.position);
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
    if (X.coment) X.coment.forEach((m) => { m.visible = false; });
    if (X.pedacos) X.pedacos.forEach((m) => { m.visible = false; });
    if (X.pinosMaps) X.pinosMaps.forEach((p) => { p.g.visible = false; });
    buscaP.g.scale.setScalar(1); buscaP.g.position.set(...TELA_Q); buscaP.g.rotation.set(0, 0, 0);
    telaQ.g.scale.setScalar(1); telaQ.g.position.set(...TELA_Q); telaQ.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (plano === 'capa') { PV[VID].capa(); return; }
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    encarar();
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
