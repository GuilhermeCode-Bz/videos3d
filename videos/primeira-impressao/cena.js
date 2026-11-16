// O cliente achou dois advogados (canal Mappoa).
// Lugares (K.cenarios): o fundo azul com a balança gigante, o escritório de vidro do Dr. Paulo, o quarto do Téo, o palco
// do Mappoa e o fundo verde da análise. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, cliente, dono, robo, comp, cadeira, bal, paulo, lima, siteL, siteP, telaC, telaM, telaR, telaA, navG, binoc, trofeu, medalha, cel, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  const BAL = [0, 0, -0.6], CLI = [0, 0, 2.4];                       // fundo azul: a balança e a cliente na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62], EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  const DONO = [1.5, 0, 0.55], CELE = [0.3, 0, 0.9];                  // escritório: o Dr. Paulo na frente da mesa
  const LUGAR = {
    gancho: 'azul', menor: 'azul', paulo: 'escritorio', teo: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa',
    analise: 'verde', mensagem: 'quarto', antes_agora: 'azul', segue: 'quarto', cartao: 'quarto', capa: 'azul'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'mensagem') return tc < quando('Paulo', B, 0.5) - 0.15 ? 'quarto' : 'escritorio';
    return LUGAR[B.plano] || 'quarto';
  }

  const ADVS = [
    { nome: 'Paulo Advocacia', end: 'Rua Batista de Carvalho, 4-30 · Bauru', chips: ['whats', 'tel'] },
    { nome: 'Martins & Souza Advogados', end: 'Av. Getúlio Vargas, 12-55', chips: ['tel'] },
    { nome: 'Dra. Renata Alves', end: 'Rua Gustavo Maciel, 9-10', chips: ['whats', 'insta'] },
    { nome: 'Escritório Ferraz', end: 'Av. Nações Unidas, 21-80', chips: ['whats'] }
  ];

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };

  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Téo Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites pra quem quer ser achado', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A mensagem no celular do Dr. Paulo: a do Téo e a resposta dele
  function zap(c, w, h, e) {
    c.fillStyle = '#efe7dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#128c7e'; c.fillRect(0, 0, w, h * 0.12); txt(c, 'Téo Design', w * 0.08, h * 0.07, w * 0.065, '#fff', 800);
    rr(c, w * 0.05, h * 0.17, w * 0.8, h * 0.33, 24, '#ffffff');
    const msg = ['Oi, Dr. Paulo! Quem procura', 'advogado em Bauru acha os', 'escritórios com site primeiro.', 'Posso te mostrar uma ideia?'];
    msg.forEach((s, i) => txt(c, s, w * 0.09, h * (0.22 + i * 0.07), w * 0.052, '#111', 600, 'left', w * 0.72));
    if (e.resp) { rr(c, w * 0.3, h * 0.56, w * 0.65, h * 0.11, 24, '#d9fdd3'); txt(c, 'Vamos conversar!', w * 0.35, h * 0.615, w * 0.065, '#111', 800, 'left', w * 0.58); }
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['vazio_colorido', { cor: 'azul' }, 'azul'], ['vazio_colorido', { cor: 'verde' }, 'verde'], ['escritorio_vidro', {}, 'escritorio'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaAdv = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: e.grupo || 'SEM SITE', total: 86, comSite: 51, semSite: 35, itens: ADVS, n: e.n, sel: e.sel });
      if (e.busca) { c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke(); txt(c, 'Advogados · Bauru, SP', 36, 168, 21, M.marinho, 700, 'left', w - 72); }
    };
    T.analiseAdv = (c, w, h, e) => {
      const k = K.clamp(e.score == null ? 1 : e.score);
      T.analise(c, w, h, {
        nome: 'Paulo Advocacia', ate: e.ate, aderencia: 0.9 * k,
        dores: ['Sem site próprio', 'Parece menor do que é pra quem pesquisa'], oportunidades: ['Site com as áreas de atuação e contato direto'],
        objecoes: ['"Meus clientes vêm por indicação"'], abordagem: 'Mostre como o escritório aparece pra quem compara advogados.'
      });
      if (e.ate >= 0) txt(c, Math.round(90 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };
    // A telinha de site em cima do escritório (a Dra. Lima tem; o Dr. Paulo ganha no fim)
    T.siteMini = (c, w, h, e) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = e.cor || '#1e3a8a'; c.fillRect(0, 0, w, h * 0.38);
      txt(c, e.nome || 'Lima Advocacia', w / 2, h * 0.19, h * 0.13, '#fff', 900, 'center', w * 0.9);
      ['Áreas de atuação', 'Fale com a gente'].forEach((s, i) => { rr(c, w * 0.08, h * (0.47 + i * 0.24), w * 0.84, h * 0.18, 10, '#eef2ff'); txt(c, s, w / 2, h * (0.56 + i * 0.24), h * 0.09, '#1e3a8a', 800, 'center'); });
    };

    // Personagens
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    cliente = K.boneco({ roupa: 'moletom', cores: { moletom: 0x8b5cf6, punho: 0x6d3fd6, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x3a2214, pele: 0xd9a27a } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    dono = K.personagem('dono'); K.semNome(dono.g); K.nomear('dono', dono.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A balança gigante e os dois escritórios nos pratos (filhos dos pratos, sobem e descem junto)
    bal = K.m3d('balanca', { tam: 3.2 }); guarda(bal, 'balanca', BAL);
    const [pE, pD] = bal.userData.m3d.pratos;
    paulo = K.m3d('prediozinho', { placa: 'DR. PAULO', cor: 0x8a929c }); paulo.scale.setScalar(0.3); paulo.position.set(0, -0.6, 0); pE.p.add(paulo); K.nomear('paulo_mini', paulo);
    lima = K.m3d('prediozinho', { placa: 'DRA. LIMA', cor: 0x1067f8 }); lima.scale.setScalar(0.3); lima.position.set(0, -0.6, 0); pD.p.add(lima);
    siteL = K.painelMappoa(0.32, 0.24, { px: 400 }); siteL.g.position.set(0, -0.05, 0.05); pD.p.add(siteL.g); K.nomear('site_lima', siteL.g);
    siteP = K.painelMappoa(0.32, 0.24, { px: 400 }); siteP.g.position.set(0, -0.05, 0.05); pE.p.add(siteP.g);
    siteL.mostrar('siteMini', {}); siteP.mostrar('siteMini', { nome: 'Paulo Advocacia', cor: '#0f766e' });

    // Escritório: o troféu e a medalha na mesa; o celular gigante
    trofeu = K.m3d('trofeu'); guarda(trofeu, 'trofeu', [1.05, 0.79, -0.45], 0.9);
    medalha = K.m3d('medalha'); guarda(medalha, 'medalha', [1.95, 0.79, -0.45], 0.9);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CELE);

    // Quarto
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    binoc = K.m3d('binoculos'); guarda(binoc, 'binoculos', [0, 1.4, 0], 0.32);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    telaR = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaR, 'tela', [0, 1.5, 0]);
    telaA = K.painelMappoa(1.7, 2.8, { px: 800 }); guarda(telaA, 'tela', [-0.6, 1.75, -0.4]);

    fx.onda = K.ondaChoque(); fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.pensa = K.balaoPensamento(); fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      semSite: e('Sem site', 'vermelho'), comSite: e('Tem site', 'verde'), menor: e('Parece menor', 'vermelho'), existe: e('Ainda existe?', 'laranja'),
      otimo: e('Ótimo advogado', 'verde'), semSite2: e('Sem site', 'vermelho'), web: e('Web designer', 'azul'), bauru: e('Bauru', 'azul'),
      dor: e('A dor dele', 'laranja'), antes: e('Antes', 'vermelho'), agora: e('Agora', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Você contrataria alguém sem site? <em>Comenta aí</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  const ondeE = (o, dy = 0) => { o.updateMatrixWorld(true); const p = o.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  // A balança: k de -1 (pende pro Dr. Paulo) a 1 (pende pra Dra. Lima); siteP = o Dr. Paulo já tem site
  function balanca(k, op = {}) {
    ve(bal); bal.rotation.set(0, 0, 0);
    bal.userData.m3d.pender(k);
    paulo.visible = op.semPaulo ? false : true; paulo.scale.setScalar(0.3 * (op.escP == null ? 1 : op.escP));
    siteL.g.visible = op.siteL !== false; siteL.g.scale.setScalar(op.escL == null ? 1 : op.escL);
    siteP.g.visible = !!op.siteP; siteP.g.scale.setScalar(op.escS == null ? 1 : op.escS);
    bal.updateMatrixWorld(true);
  }
  const PP = () => ondeE(paulo, 0.35), PL = () => ondeE(lima, 0.35);

  const P = {
    gancho(B, tc) {
      // NA TELA: fundo azul; a balança gigante despenca com os dois escritórios; a cliente na frente · MOSTRA: balanca, cliente
      const tD = quando('dois', B, 0.15), tSi = quando('site', B, 0.45), tO = quando('outro', B, 0.62), tE = quando('escolheu', B, 0.88);
      // OBJETOS SE MEXENDO: a telinha de site da Dra. Lima acende em "site"; em "escolheu" a balança pende pra ela
      const k = K.suave(pc(tc, tE, tE + 0.35));
      balanca(k, { escL: tc < tSi ? 0.0001 : K.saiVolta(K.clamp((tc - tSi) / 0.35)) });
      // ENTRA AGORA: a balança cai no 1º quadro
      K.entrar(bal, 'cai', tc - B.inicio + 0.05, { altura: 8, dur: 0.4, som: false, destaque: false });
      const tImp = B.inicio + 0.42;
      fx.onda.em([BAL[0], 0.02, BAL[2]], tc - tImp, { raio: 3.5, som: false }); K.som('estrondo', tImp, 0.7);
      // PERSONAGEM: a cliente com o celular olha um e outro · em "escolheu": aponta a Dra. Lima
      cliente.colocar(CLI, tc < tO ? PP() : PL());
      if (tc > tE) cliente.apontar(0.7); else cliente.reagir('celular', tc - B.inicio);
      // EFEITOS VISUAIS: "Tem site" na Lima em "site", "Sem site" no Paulo em "outro"; ✓ e ✗ em "escolheu"
      fx.et.comSite.em(mais(PL(), [0, 1.3, 0.3]), tc - tSi); fx.et.semSite.em(mais(PP(), [0, 1.0, 0.3]), tc - tO);
      fx.simb.em(mais(PL(), [0.9, 0.4, 0.4]), tc - tE, { tipo: '✓', tam: 1.4 }); fx.simb2.em(mais(PP(), [-0.9, 0.4, 0.4]), tc - tE - 0.1, { tipo: '✗', tam: 1.4, som: false });
      K.som('ding', tSi, 0.5); K.som('errado', tO, 0.4); K.som('certo', tE, 0.7);
      // CÂMERA: 4 cortes de ~0,8 s · (1) de baixo, o impacto · (2) o prato do Dr. Paulo · (3) o da Dra. Lima · (4) aberto
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = tO + 0.4;
      if (tc < c1) { K.filmar([mais(BAL, [0, 0.3, 0]), mais(BAL, [0, 5, 0]), PP(), PL()], 'chegando', pc(tc, B.inicio, c1), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 4.0 }); K.tremer(tc - tImp, 0.8); }
      else if (tc < c2) K.filmar([PP(), mais(PP(), [0, -0.5, 0])], 'chegando', pc(tc, c1, c2), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.6 });
      else if (tc < c3) K.filmar([PL(), mais(PL(), [0, 0.9, 0])], 'passando', pc(tc, c2, c3), { plano: 'perto', lado: 20, altura: 'olho', tam: 1.8 });
      else K.filmar([PP(), PL(), mais(CLI, [0, 0.3, 0]), mais(BAL, [0, 5, 0])], 'afastando', pc(tc, c3, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 4.6 });
    },
    menor(B, tc) {
      // NA TELA: a balança pendida pra Dra. Lima; o escritório do Dr. Paulo encolhe e some · MOSTRA: balanca
      const tMe = quando('menor', B, 0.4), tEx = quando('existe', B, 0.85);
      const enc = K.lerp(1, 0.45, K.suave(pc(tc, tMe - 0.3, tMe + 0.3)));
      balanca(1, { escP: enc, semPaulo: tc > tEx + 0.05 });
      fx.poof.em(PP(), tc - tEx, { escala: 1.2 });
      if (tc < tEx) fx.et.menor.em(mais(PP(), [0, 0.9, 0.3]), tc - tMe);
      if (tc > tEx) { fx.simb.em(mais(PP(), [0, 0.3, 0.3]), tc - tEx, { tipo: '?', tam: 1.3 }); fx.et.existe.em(mais(PP(), [0, 1.1, 0.3]), tc - tEx); }
      K.som('whoosh', tMe, 0.5);
      // CÂMERA: (1) girando em volta do prato dele, perto · (2) de "existe": afastando
      if (tc < tEx - 0.3) K.filmar([PP(), mais(PP(), [0, 0.9, 0])], 'girando', pc(tc, B.inicio, tEx - 0.3), { plano: 'perto', lado: -25, angulo: 30, altura: 'olho', tam: 2.0 });
      else K.filmar([PP(), PL(), mais(PP(), [0, 1.2, 0])], 'afastando', pc(tc, tEx - 0.3, B.ate), { plano: 'medio', lado: -10, altura: 'olho', tam: 3.8 });
    },
    paulo(B, tc) {
      // NA TELA: o escritório de vidro; o Dr. Paulo na frente da mesa, o troféu e a medalha · MOSTRA: dono, trofeu
      const tO = quando('ótimo', B, 0.3), tSi = quando('site', B, 0.9);
      ve(trofeu, medalha);
      trofeu.rotation.y = (tc - B.inicio) * 1.2;
      // PERSONAGEM: aponta o troféu, orgulhoso · em "site": encolhe os ombros
      dono.colocar(DONO, [1.2, 1.5, 6]);
      if (tc > tSi) dono.reagir('ombros', tc - tSi); else if (tc > tO) { dono.apontar(0.5); dono.humor('feliz'); } else dono.reagir('mostrando', tc - B.inicio);
      fx.et.otimo.em(mais(DONO, [-0.4, 2.3, 0.2]), tc - tO);
      if (tc > tSi) fx.et.semSite2.em(mais(DONO, [0.4, 2.0, 0.2]), tc - tSi);
      K.som('brilho', tO, 0.5); K.som('errado', tSi, 0.5);
      // CÂMERA: (1) chegando, médio, frente · (2) de "ótimo": passando, perto
      if (tc < tO) K.filmar([mais(DONO, [0, 0.2, 0]), cabecaDe(dono, 0.3), [1.05, 1.1, -0.45]], 'chegando', pc(tc, B.inicio, tO), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.4 });
      else K.filmar([cabecaDe(dono, 0.2), [1.05, 1.0, -0.45], [1.95, 1.0, -0.45]], 'passando', pc(tc, tO, B.ate), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.7 });
    },
    teo(B, tc) {
      // NA TELA: o quarto; o Téo de pé com o binóculo, procurando de um lado pro outro · MOSTRA: personagem, binoculos
      const tW = quando('designer', B, 0.2), tCa = quando('caçando', B, 0.4), tN = quando('sabe', B, 0.65), tEx = quando('existe', B, 0.9);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      const varre = Math.sin((tc - B.inicio) * 2.4) * 2.2;
      menino.colocar(EM_PE, [EM_PE[0] + varre, 1.4, 4]);
      if (tc > tEx) { menino.reagir('coca_cabeca', tc - tEx); }
      else { menino.reagir('segurando', tc - B.inicio); ve(binoc); const c = cabecaDe(menino, 0); const r = menino.g.rotation.y; binoc.position.set(c[0] + Math.sin(r) * 0.28, c[1] + 0.02, c[2] + Math.cos(r) * 0.28); binoc.rotation.set(0, r, 0); }
      fx.et.web.em(cabecaDe(menino, 0.5), tc - tW);
      if (tc > tN) fx.pensa.em(mais(cabecaDe(menino, 0.1), [-0.45, 0, 0]), tc - tN, { texto: 'Cadê o cliente?' });
      if (tc > tEx) fx.simb.em(cabecaDe(menino, 0.15).map((v, i) => v + [0.5, 0.2, 0][i]), tc - tEx, { tipo: '?' });
      K.som('whoosh', tCa, 0.4); K.som('pingo', tEx, 0.5);
      // CÂMERA: (1) passando de lado · (2) de "sabe": chegando de frente, baixo
      if (tc < tN) K.filmar([cabecaDe(menino, 0), mais(EM_PE, [0, 0.4, 0])], 'passando', pc(tc, B.inicio, tN), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.5 });
      else K.filmar([mais(EM_PE, [0, 0.5, 0]), cabecaDe(menino, 0.8)], 'chegando', pc(tc, tN, B.ate), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista dos advogados de Bauru sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.05), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tA = quando('advogados', B, 0.62), tBa = quando('Bauru', B, 0.8);
      ve(comp, navG); comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tA ? 1 + Math.floor((tc - tA) / 0.22) : 0;
        telaC.mostrar('listaAdv', { busca: true, n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tA + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.bauru.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tBa);
      // CÂMERA: (1) por cima do ombro · (2) chegando de frente
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a lista com COM SITE e SEM SITE; o robô e o Téo · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.08), tS = quando('separa', B, 0.3), tN = quando('não', B, 0.55), tPr = quando('precisa', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3 });
      // OBJETOS SE MEXENDO: o grupo COM SITE, depois SEM SITE em "não"; a análise em "precisa"
      if (tc < tPr - 0.1) telaM.mostrar('listaAdv', { grupo: tc < tN ? 'COM SITE' : 'SEM SITE', n: 4, sel: tc > tN ? 0 : -1, itens: ADVS });
      else telaM.mostrar('analiseAdv', { ate: 2, score: pc(tc, tPr - 0.1, tPr + 0.5) });
      K.som('clique', tN, 0.5); K.som('ding', tPr, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tN ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tPr ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tPr) menino.reagir('comemorando', tc - tPr); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) de "separa": passando, médio
      if (tc < tS) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tS), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, mais(telaM.g.position.toArray(), [0, 1.2, 0]), menino], 'passando', pc(tc, tS, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    analise(B, tc) {
      // NA TELA: fundo verde; a análise do Dr. Paulo, grande; a miniatura dele ao lado, crescendo · MOSTRA: tela, paulo_mini
      const tD = quando('dor', B, 0.3), tMe = quando('menor', B, 0.75);
      ve(telaA); K.entrar(telaA.g, 'cresce', tc - B.inicio, { dur: 0.35 });
      telaA.mostrar('analiseAdv', { ate: tc > tD ? 2 : 0, score: 1 });
      // a miniatura do Dr. Paulo no chão, ao lado da tela: cresce em "menor do que é"
      ve(paulo); K.scene.attach(paulo); paulo.position.set(1.2, 0, 0.2); paulo.rotation.set(0, -0.4, 0);
      paulo.scale.setScalar(K.lerp(0.6, 1.5, K.suave(pc(tc, tMe, tMe + 0.6))));
      fx.et.dor.em([-0.6, 3.5, -0.2], tc - tD);
      if (tc > tMe) fx.poof2.em([1.2, 0.8, 0.4], tc - tMe, { escala: 0.8 });
      K.som('ding', tD, 0.5); K.som('brilho', tMe, 0.5);
      // CÂMERA: (1) chegando perto da tela · (2) de "menor": girando, médio
      if (tc < tMe) K.filmar([[-0.6, 2.4, -0.4], [-0.6, 1.0, -0.4], [-0.6, 3.1, -0.4]], 'chegando', pc(tc, B.inicio, tMe), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.3 });
      else K.filmar([[-0.6, 1.7, -0.4], [1.2, 0.3, 0.2], [1.2, 1.9, 0.2]], 'girando', pc(tc, tMe, B.ate), { plano: 'medio', lado: 15, angulo: 25, altura: 'olho', tam: 2.5 });
    },
    mensagem(B, tc) {
      // NA TELA: (1) o quarto, o Téo com a mensagem pronta; (2) o escritório, o Dr. Paulo lê no celular gigante e responde · MOSTRA: personagem, dono, celular
      const tP = quando('Paulo', B, 0.5) - 0.15, tR = quando('responde', B, 0.7), tV = quando('vamos', B, 0.85);
      if (tc < tP) {
        ve(comp); comp.tela.desenhar(siteDemo, 'demo');
        menino.colocar(EM_PE, [EM_PE[0] - 1.4, 1.5, EM_PE[2] + 0.6]); menino.reagir('mostrando', tc - B.inicio);
        ve(telaR); const m = menino.mao(1); telaR.g.position.set(m[0] - 0.35, m[1] + 0.55, m[2] + 0.25); telaR.g.rotation.set(0, 0.6, 0); telaR.g.scale.setScalar(0.5);
        telaR.mostrar('mensagem', { para: 'Para: Paulo Advocacia', texto: 'Oi, Dr. Paulo! Quem procura advogado em Bauru acha os escritórios com site primeiro. Posso te mostrar uma ideia?', digitado: pc(tc, B.inicio, tP - 0.3) });
        K.som('whoosh', tP - 0.2, 0.5);
        K.filmar([cabecaDe(menino, 0), telaR, mais(telaR.g.position.toArray(), [0, 0.5, 0])], 'passando', pc(tc, B.inicio, tP), { plano: 'perto', lado: -25, altura: 'olho', tam: 1.6 });
      } else {
        ve(cel); cel.rotation.set(0, 0.5, 0); cel.userData.m3d.tela.desenhar((c, w, h) => zap(c, w, h, { resp: tc > tV }), 'zap' + (tc > tV));
        if (tc < tR) cel.userData.m3d.vibrar(tc - tP, 0.6);
        dono.colocar(mais(CELE, [1.0, 0, 0.3]), tc > tV ? [1.4, 1.5, 6] : [0.6, 1.5, 6]);
        if (tc > tV) dono.reagir('vitoria', tc - tV); else dono.reagir('surpreso', tc - tP);
        if (tc > tV) fx.fala.em(cabecaDe(dono, 0.15), tc - tV, { texto: 'Vamos conversar!' });
        K.som('pingo', tP + 0.05, 0.5); K.som('certo', tV, 0.6);
        K.filmar([mais(CELE, [0, 1.2, 0]), cabecaDe(dono, 0.3), mais(CELE, [1.0, 0.3, 0.3])], 'chegando', pc(tc, tP, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.9 });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: a balança: Antes pende pra Dra. Lima; Agora o Dr. Paulo ganha a telinha de site e a balança vira · MOSTRA: balanca
      const tA = quando('Agora', B, 0.45), tV = quando('vira', B, 0.65);
      const k = tc < tV ? 1 : K.lerp(1, -1, K.suave(pc(tc, tV, tV + 0.6)));
      balanca(k, { siteP: tc > tA, escS: tc > tA ? K.saiVolta(K.clamp((tc - tA) / 0.35)) : 1 });
      if (tc < tA) fx.et.antes.em(mais(PL(), [0, 1.3, 0.3]), tc - B.inicio - 0.2);
      else fx.et.agora.em(mais(PP(), [0, 1.3, 0.3]), tc - tA);
      if (tc > tA) fx.poof.em(mais(PP(), [0, 0.3, 0.3]), tc - tA, { escala: 0.8 });
      fx.simb.em(mais(PP(), [-0.9, 0.4, 0.4]), tc - tV - 0.5, { tipo: '✓', tam: 1.4 });
      K.som('errado', B.inicio + 0.3, 0.4); K.som('brilho', tA, 0.5); K.som('certo', tV + 0.5, 0.7);
      // CÂMERA: (1) afastando · (2) de "Agora": girando, perto do prato do Dr. Paulo · (3) aberto
      if (tc < tA) K.filmar([PL(), PP(), mais(BAL, [0, 5, 0])], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 20, altura: 'olho', tam: 5.0 });
      else if (tc < tV + 0.2) K.filmar([PP(), mais(PP(), [0, 1.1, 0])], 'girando', pc(tc, tA, tV + 0.2), { plano: 'perto', lado: -15, angulo: 25, altura: 'olho', tam: 2.0 });
      else K.filmar([PP(), PL(), mais(BAL, [0, 4.8, 0])], 'chegando', pc(tc, tV + 0.2, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 5.4 });
    },
    segue(B, tc) {
      // NA TELA: o Téo no quarto; a pergunta; a barra com mappoa.com; o robô; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('contrataria', B, 0.05), tCo = quando('Comenta', B, 0.4), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      const tSg = tCo + 0.5;
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteDemo, 'demo');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      balanca(1, {});
      cliente.colocar(CLI, PL()); cliente.apontar(0.7);
      fx.simb.em(mais(PL(), [0.9, 0.4, 0.4]), 1, { tipo: '✓', tam: 1.4, som: false });
      K.filmar([PP(), PL(), mais(CLI, [0, 0.3, 0]), mais(BAL, [0, 5, 0])], 'parado', 0, { plano: 'medio', lado: 8, altura: 'olho', espacoCima: 0.3, tam: 4.4 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'azul' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cliente, dono].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    // a miniatura do Dr. Paulo volta pro prato (a análise tira ela de lá)
    const pE = bal.userData.m3d.pratos[0].p; if (paulo.parent !== pE) { pE.add(paulo); }
    paulo.position.set(0, -0.6, 0); paulo.rotation.set(0, 0, 0); paulo.scale.setScalar(0.3); paulo.visible = true;
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    telaA.g.scale.setScalar(1); telaA.g.position.set(-0.6, 1.75, -0.4);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
