// Você é melhor que o concorrente (canal Mappoa).
// Lugares (K.cenarios): a rua entre prédios (a corrida e o cliente pesquisando), a oficina do seu Jorge, o quarto do Gui e
// o palco do Mappoa. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, jorge, rival, cliente, robo, comp, cadeira, fog, fog2, jato, jato2, trofeu, cel, desp, banq, telaC, telaM, telaR, navG, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62], EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  // Rua: a pista da corrida no calçadão (z vai de Z0 até Z1), duas faixas em x
  let Z0 = 10, Z1 = -14; const XJ = -0.4, XR = 0.85;
  const em = (x, k) => [x, 0, K.lerp(Z0, Z1, k)];
  // Oficina: o Jorge no meio, a bancada, a banqueta
  let JO = [0.6, 0, 1.4], BANC = [-4, 1, 1.4], BANQ = [1.4, 0, 0.6], GUI_O = [-0.6, 0, 1.6];

  const LUGAR = {
    gancho: 'rua', jorge: 'oficina', busca: 'rua', parada: 'oficina', gui: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa',
    prova: 'oficina', antes_agora: 'rua', segue: 'quarto', cartao: 'quarto', capa: 'rua'
  };
  const lugarDe = (B) => LUGAR[B.plano] || 'quarto';

  const OFICINAS = [
    { nome: 'Oficina do Jorge', end: 'Rua Governador Pedro de Toledo, 1530 · Piracicaba', chips: ['whats', 'tel'] },
    { nome: 'Mecânica Santa Rita', end: 'Av. Independência, 2280', chips: ['tel'] },
    { nome: 'Auto Peças e Serviços Lima', end: 'Rua do Rosário, 940', chips: ['whats'] },
    { nome: 'Funilaria Nova Era', end: 'Av. Armando de Salles Oliveira, 610', chips: ['whats', 'insta'] }
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
    txt(c, 'Gui Web', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites pra quem trabalha bem', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A busca no celular do cliente: só o Auto Center Rápido aparece (com site), e um mapa com um pino só
  function busca(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const q = 'oficina mecânica', n = Math.floor(q.length * K.clamp(e.d == null ? 1 : e.d));
    rr(c, w * 0.06, h * 0.22, w * 0.88, h * 0.07, h * 0.035, '#eef1f5');
    txt(c, q.slice(0, n) + (n < q.length ? '|' : ''), w * 0.12, h * 0.255, w * 0.06, '#111', 700, 'left', w * 0.76);
    if (e.ok) {
      rr(c, w * 0.06, h * 0.32, w * 0.88, h * 0.24, 18, '#e7eef6');
      c.fillStyle = '#d2dbe6'; for (let i = 0; i < 5; i++) c.fillRect(w * 0.06, h * (0.35 + i * 0.045), w * 0.88, h * 0.008);
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.62, h * 0.41, w * 0.05, 0, 7); c.fill();
      rr(c, w * 0.05, h * 0.6, w * 0.9, h * 0.2, 18, '#f7f9fc');
      txt(c, 'Auto Center Rápido', w * 0.1, h * 0.65, w * 0.065, '#1a4fd6', 800, 'left', w * 0.8);
      txt(c, '★ 4,6 · do outro lado da rua', w * 0.1, h * 0.705, w * 0.045, '#e3a008', 800, 'left', w * 0.8);
      txt(c, 'Site · Ligar · Rota', w * 0.1, h * 0.755, w * 0.05, '#2b8a3e', 800);
      txt(c, 'Oficina do Jorge: sem site', w / 2, h * 0.87, w * 0.05, '#c0392b', 800, 'center');
    }
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], 'oficina', ['home_office', {}, 'quarto'], 'mundo_mappoa']);
    const Cr = CS.todos.rua; if (Cr.rua && Cr.rua.de) { Z0 = Math.max(Cr.rua.de[2], Cr.rua.ate[2]) - 6; Z1 = Z0 - 24; }
    const Co = CS.todos.oficina;
    if (Co.lugares.bancada) BANC = Co.lugares.bancada;
    JO = mais(Co.centro || [0, 0, 0], [0.6, 0, 1.4]); BANQ = mais(JO, [0.9, 0, -0.6]); GUI_O = mais(JO, [-1.3, 0, 0.2]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaOfi = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: OFICINAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Oficinas mecânicas · Piracicaba, SP', 36, 168, 20, M.marinho, 700, 'left', w - 72);
    };
    T.analiseOfi = (c, w, h, e) => {
      const k = K.clamp(e.score == null ? 1 : e.score);
      T.analise(c, w, h, {
        nome: 'Oficina do Jorge', ate: e.ate, aderencia: 0.92 * k,
        dores: ['Sem site próprio', 'Quem pesquisa acha o concorrente'], oportunidades: ['Site com serviços, fotos e botão do WhatsApp'],
        objecoes: ['"Meu cliente é do bairro"'], abordagem: 'Mostre a busca do bairro: quem aparece é a oficina do lado.'
      });
      if (e.ate >= 0) txt(c, Math.round(92 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Gui (do canal), o seu Jorge (macacão azul), o dono do Auto Center e o cliente
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    jorge = K.boneco({ roupa: 'moletom', cores: { moletom: 0x1f4e8c, punho: 0x173c6b, calca: 0x1f4e8c, mochila: 0x1f4e8c, tenis: 0x2b2b2b, cabelo: 0x9a9a9a, pele: 0xc98d5e } });
    K.semNome(jorge.g); K.nomear('jorge', jorge.g);
    rival = K.personagem('dono'); K.semNome(rival.g); K.nomear('rival', rival.g);
    cliente = K.boneco({ roupa: 'moletom', cores: { moletom: 0xf08a24, punho: 0xd9731a, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xe6b48a } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Os foguetes nas costas (filhos de quem carrega) e o jato
    fog = K.m3d('foguete_desenho'); fog.scale.setScalar(0.55); fog.position.set(0, 0.55, -0.32); fog.rotation.set(-0.25, 0, 0); rival.g.add(fog); K.nomear('foguete', fog);
    fog2 = K.m3d('foguete_desenho', { cor: 0x2fb5a6 }); fog2.scale.setScalar(0.55); fog2.position.set(0, 0.55, -0.32); fog2.rotation.set(-0.25, 0, 0); jorge.g.add(fog2); K.nomear('foguete2', fog2);
    jato = K.jatoFoguete(31); jato2 = K.jatoFoguete(47);

    trofeu = K.m3d('trofeu'); guarda(trofeu, 'trofeu', [0, 1, 0], 0.8);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', [0, 0, 0]);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', BANC, 1.1);
    banq = K.m3d('banqueta'); guarda(banq, 'banqueta', BANQ);

    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    telaR = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaR, 'tela', [0, 1.5, 0]);

    fx.vel = K.velocidade(); fx.vel2 = K.velocidade(); fx.poof = K.poof(); fx.poeira = K.folhasVento(91, 40, { papel: true });
    fx.pensa = K.balaoPensamento(); fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      melhor: e('Melhor', 'verde'), temSite: e('Tem site', 'azul'), bairro: e('Melhor do bairro', 'verde'), justo: e('Preço justo', 'verde'),
      vizinho: e('Só acha a do vizinho', 'vermelho'), parada: e('Parada', 'vermelho'), web: e('Web designer', 'azul'), pira: e('Piracicaba', 'azul'),
      precisa: e('Quem precisa de você', 'verde'), google: e('No Google, vão pro vizinho', 'laranja'), antes: e('Antes', 'vermelho'), agora: e('Agora aparece', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Já perdeu cliente pra alguém pior? <em>Comenta aí</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  // O jato saindo do bocal do foguete (preso nas costas de quem carrega)
  function jatoDe(f, j, tc, forca = 1) {
    f.updateMatrixWorld(true);
    const p = f.localToWorld(V(0, 0.25, 0)), q = new THREE.Quaternion(); f.getWorldQuaternion(q);
    j.em(p.toArray(), tc, { comp: 1.4 * forca, larg: 0.35, forca, quat: q });
  }
  function trofeuNaMao(b) { ve(trofeu); const m = b.mao(1); trofeu.position.set(m[0], m[1] + 0.05, m[2]); trofeu.rotation.set(0, b.g.rotation.y, 0); }

  const P = {
    gancho(B, tc) {
      // NA TELA: o calçadão; o Jorge corre com o troféu; o rival passa voando de foguete · MOSTRA: jorge, rival, foguete
      // CENÁRIO: rua entre prédios, gente andando (o cenário cuida)
      const tMe = quando('melhor', B, 0.12), tSi = quando('site', B, 0.45), tSa = quando('saber', B, 0.92);
      const t = tc - B.inicio;
      // PERSONAGEM: o Jorge correndo com o troféu · em "saber": para e põe a mão na testa
      const kJ = 0.08 + Math.min(t, tSa - B.inicio) * 0.035;
      if (tc < tSa) jorge.irPara(em(XJ, 0), em(XJ, 1), kJ, tc, { reto: true }); else { jorge.colocar(em(XJ, kJ), em(XR, 0.9)); jorge.reagir('mao_na_testa', tc - tSa); }
      trofeuNaMao(jorge);
      // O rival: atrás até "site"; com o foguete aceso, passa voando
      const vo = K.suave(pc(tc, tSi, tSi + 1.4)), kR = 0.04 + Math.min(t, tSi - B.inicio) * 0.03 + vo * 0.75;
      fog.visible = tc > tSi; rival.irPara(em(XR, 0), em(XR, 1), kR, tc, { reto: true });
      if (tc > tSi) { rival.g.position.y = Math.sin(vo * PI) * 0.6; jatoDe(fog, jato, tc); fx.vel.em(mais(rival.g.position.toArray(), [0, 0.7, 0]), tc, { rumo: PI }); }
      if (tc > tSa) rival.reagir('comemorando', tc - tSa);
      fx.vel2.em(mais(jorge.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: PI, raio: 0.5 });
      // EFEITOS VISUAIS: "Melhor" no Jorge; "Tem site" no rival
      const cFim = tSi + 1.2;
      if (tc < tSi) fx.et.melhor.em(cabecaDe(jorge, 0.45), tc - tMe);
      else if (tc < cFim) fx.et.temSite.em(cabecaDe(rival, 0.45), tc - tSi - 0.15);
      for (let k = 0; k < 8; k++) K.som('passo', B.inicio + k * 0.22, 0.3);
      K.som('whoosh', tSi, 0.7); K.som('estrondo', tSi + 0.05, 0.4); K.som('errado', tSa, 0.4);
      // CÂMERA: 4 cortes · (1) de frente pros dois · (2) o troféu de perto · (3) o jato passando · (4) herói no Jorge
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = tSi + 1.2;
      if (tc < c1) K.seguir(jorge, { lado: 'frente', dist: 4.2, altura: 1.3 });
      else if (tc < c2) K.seguir(jorge, { lado: 'frente', dist: 2.3, altura: 1.2 });
      else if (tc < tSi) K.seguir(jorge, { lado: 'frente', dist: 4.6, altura: 2.2 });
      else if (tc < c3) K.seguir(rival, { lado: 'frente', dist: 4.2, altura: 1.6 });
      else K.seguir(jorge, { lado: 'tras', dist: 4.2, altura: 2.6 });
    },
    jorge(B, tc) {
      // NA TELA: a oficina; o carro no elevador; o Jorge com o troféu na bancada · MOSTRA: jorge, trofeu
      const tO = quando('oficina', B, 0.25), tC = quando('Conserta', B, 0.55), tJ = quando('justo', B, 0.9);
      
      jorge.colocar(JO, [JO[0] + 1, 1.4, JO[2] + 6]);
      if (tc > tJ) jorge.reagir('vitoria', tc - tJ); else if (tc > tC) jorge.reagir('mostrando', tc - tC); else jorge.reagir('comemorando', tc - B.inicio);
      trofeuNaMao(jorge); trofeu.scale.setScalar(1.0);
      if (tc < tJ - 0.2) fx.et.bairro.em(cabecaDe(jorge, 0.5), tc - tO);
      if (tc > tJ - 0.2) fx.et.justo.em(mais(cabecaDe(jorge, 0.5), [0, -0.4, 0]), tc - tJ + 0.2);
      fx.simb.em(cabecaDe(jorge, 0.1).map((v, i) => v + [0.7, 0, 0][i]), tc - tC, { tipo: '✓' });
      K.som('brilho', tO, 0.5); K.som('certo', tJ, 0.6);
      // CÂMERA: (1) chegando, médio · (2) de "Conserta": girando, perto
      if (tc < tC) K.filmar([mais(JO, [0, 0.2, 0]), cabecaDe(jorge, 0.6)], 'chegando', pc(tc, B.inicio, tC), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.4 });
      else K.filmar([cabecaDe(jorge, 0.3), mais(JO, [0, 0.3, 0])], 'girando', pc(tc, tC, B.ate), { plano: 'perto', lado: -20, angulo: 25, altura: 'olho', tam: 1.9 });
    },
    busca(B, tc) {
      // NA TELA: o calçadão; o cliente com o celular gigante; só aparece o Auto Center Rápido · MOSTRA: cliente, celular
      const tP = quando('pesquisa', B, 0.1), tAc = quando('acha', B, 0.45), tR = quando('rua', B, 0.7), tSi = quando('site', B, 0.92);
      const CC = em(XJ, 0.35), CEL = mais(CC, [1.2, 0, -0.5]);
      ve(cel); cel.position.set(...CEL); cel.rotation.set(0, -0.5, 0);
      cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { d: pc(tc, tP, tAc), ok: tc > tAc }), 'b' + Math.round(pc(tc, tP, tAc) * 16) + (tc > tAc));
      for (let i = 0; i < 6; i++) K.som('clique', tP + i * 0.08, 0.25);
      cliente.colocar(CC, mais(CEL, [0, 1.3, 0]));
      if (tc > tSi) cliente.reagir('sim', tc - tSi); else cliente.reagir('celular', tc - B.inicio);
      fx.et.vizinho.em(mais(CEL, [0, 2.5, 0.2]), tc - tR);
      K.som('ding', tAc, 0.5); K.som('errado', tR, 0.5);
      // CÂMERA: (1) chegando na tela · (2) de "rua": passando, médio, com o cliente
      if (tc < tR) K.filmar([mais(CEL, [0, 1.0, 0.1]), mais(CEL, [0, 2.0, 0.1])], 'chegando', pc(tc, B.inicio, tR), { plano: 'perto', lado: -15, altura: 'olho', tam: 1.8 });
      else K.filmar([cabecaDe(cliente, 0), mais(CEL, [0, 1.5, 0]), mais(CC, [0, 0.2, 0])], 'passando', pc(tc, tR, B.ate), { plano: 'medio', lado: -40, altura: 'olho', tam: 2.4 });
    },
    parada(B, tc) {
      // NA TELA: a oficina vazia; o Jorge sentado na banqueta olhando o relógio; a poeira no ar · MOSTRA: jorge, despertador
      const tPa = quando('parada', B, 0.3), tPo = quando('poeira', B, 0.85);
      ve(desp, banq); desp.position.set(BANQ[0] - 0.9, 0, BANQ[2] + 0.2); desp.scale.setScalar(1.5); desp.userData.m3d.horas(9 + (tc - B.inicio) * 3);
      jorge.colocar(BANQ, mais(BANC, [0, 0.2, 0])); jorge.sentar(1);
      if (tc > tPo) jorge.reagir('dormindo', tc); else jorge.reagir('olha_relogio', tc - B.inicio);
      fx.poeira.em(mais(BANQ, [0, 0, 0]), tc, { largura: 5, forca: 0.35 });
      fx.et.parada.em(mais(BANQ, [0, 2.3, 0.2]), tc - tPa);
      K.som('pingo', tPa, 0.5);
      // CÂMERA: afastando, médio, de lado
      K.filmar([cabecaDe(jorge, 0.3), mais(BANQ, [0, 0.1, 0.4]), [BANQ[0] - 0.9, 0.4, BANQ[2] + 0.2]], 'afastando', pc(tc, B.inicio, B.ate), { plano: 'medio', lado: 30, altura: 'olho', tam: 2.4 });
    },
    gui(B, tc) {
      // NA TELA: o quarto; o Gui no computador; os "?" e o balão "Cadê os seus Jorges?" · MOSTRA: personagem, monitor
      const tW = quando('designer', B, 0.12), tPr = quando('problema', B, 0.55), tJ = quando('Jorges', B, 0.85);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      sentado(tc < tPr ? MONITOR : [1.6, 1.1, 4]);
      if (tc > tPr) menino.reagir('coca_cabeca', tc - tPr); else menino.reagir('digitando', tc);
      fx.et.web.em(cabecaDe(menino, 0.5), tc - tW);
      if (tc > tPr) fx.pensa.em(mais(cabecaDe(menino, 0.1), [-0.45, 0, 0]), tc - tPr, { texto: 'Cadê os seus Jorges?' });
      fx.simb.em(cabecaDe(menino, 0.2).map((v, i) => v + [0.6, 0.1, 0][i]), tc - tJ, { tipo: '?' });
      fx.simb2.em(cabecaDe(menino, 0.2).map((v, i) => v + [0.75, 0.6, 0][i]), tc - tJ - 0.15, { tipo: '?', som: false });
      K.som('clique', B.inicio + 0.1, 0.4); K.som('whoosh', tPr, 0.5);
      // CÂMERA: (1) passando de lado · (2) de "problema": chegando de frente, baixo
      if (tc < tPr) K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tPr), { plano: 'perto', lado: 70, altura: 'olho', tam: 1.6 });
      else K.filmar([mais(SEAT, [0, 0.9, 0]), cabecaDe(menino, 0.9)], 'chegando', pc(tc, tPr, B.ate), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 1.8 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das oficinas de Piracicaba sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.05), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tO = quando('oficinas', B, 0.62), tPi = quando('Piracicaba', B, 0.8);
      ve(comp, navG); comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tO ? 1 + Math.floor((tc - tO) / 0.22) : 0;
        telaC.mostrar('listaOfi', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tO + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.pira.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tPi);
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a análise da Oficina do Jorge; o robô e o Gui · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.08), tS = quando('sistema', B, 0.22), tPr = quando('precisa', B, 0.45), tCo = quando('contato', B, 0.7), tA = quando('análise', B, 0.85);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      if (tc < tA) telaM.mostrar('listaOfi', { n: 4, sel: tc > tCo ? 0 : -1 });
      else telaM.mostrar('analiseOfi', { ate: 2, score: pc(tc, tA, tA + 0.5) });
      K.som('ding', tPr, 0.4); K.som('certo', tA, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tA ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tA) menino.reagir('comemorando', tc - tA); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      if (tc < tPr) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tPr), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tPr, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    prova(B, tc) {
      // NA TELA: a oficina; o Gui mostra a análise; o Jorge se espanta e aperta a mão · MOSTRA: personagem, jorge, tela
      const tPr = quando('prova', B, 0.35), tG = quando('Google', B, 0.6), tV = quando('vizinho', B, 0.9);
      menino.irPara(mais(GUI_O, [-1.6, 0, 0.6]), GUI_O, K.clamp((tc - B.inicio) / 0.6), tc, { olhar: cabecaDe(jorge, -0.5) });
      if (tc > tPr) menino.reagir('mostrando', tc - tPr);
      ve(telaR); const m = menino.mao(1); telaR.g.position.set(m[0] + 0.25, m[1] + 0.45, m[2] + 0.2); telaR.g.rotation.set(0, 0.5, 0); telaR.g.scale.setScalar(0.42 * K.saiVolta(K.clamp((tc - tPr + 0.2) / 0.35)) + 0.0001);
      telaR.mostrar('analiseOfi', { ate: 2, score: 1 });
      jorge.colocar(JO, cabecaDe(menino, -0.5));
      if (tc > tV) jorge.reagir('mostrando', tc - tV); else if (tc > tG) jorge.reagir('surpreso', tc - tG); else jorge.reagir('ombros', tc - B.inicio);
      fx.et.google.em(mais(GUI_O, [0, 2.6, 0.2]), tc - tG);
      fx.simb.em(mais(JO, [-0.6, 2.4, 0.2]), tc - tV, { tipo: '✓', tam: 1.3 });
      K.som('brilho', tPr, 0.5); K.som('certo', tV, 0.6);
      // CÂMERA: (1) chegando, médio, frente · (2) de "Google": passando, perto
      if (tc < tG) K.filmar([mais(GUI_O, [0, 1, 0]), mais(JO, [0, 1, 0])], 'chegando', pc(tc, B.inicio, tG), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.8 });
      else K.filmar([cabecaDe(menino, 0), cabecaDe(jorge, 0), telaR], 'passando', pc(tc, tG, B.ate), { plano: 'perto', lado: 25, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: o calçadão; Antes o rival passa voando; Agora o Jorge também tem foguete e voa do lado · MOSTRA: jorge, foguete2
      const tA = quando('Agora', B, 0.45), tAp = quando('aparece', B, 0.8);
      const t = tc - B.inicio;
      if (tc < tA) {
        fog.visible = true; const kR = 0.1 + t * 0.25;
        rival.irPara(em(XR, 0), em(XR, 1), kR, tc, { reto: true }); rival.g.position.y = 0.4; jatoDe(fog, jato, tc);
        jorge.colocar(em(XJ, 0.3), em(XR, 1)); jorge.reagir('mao_na_testa', t); trofeuNaMao(jorge);
        fx.et.antes.em(cabecaDe(jorge, 0.45), t - 0.2);
        K.som('whoosh', B.inicio + 0.2, 0.6);
        K.seguir(jorge, { lado: 'tras', dist: 4.2, altura: 2.6 });
      } else {
        // os dois voando lado a lado
        fog.visible = true; fog2.visible = true;
        const k = 0.3 + (tc - tA) * 0.12;
        jorge.irPara(em(XJ, 0), em(XJ, 1), k, tc, { reto: true }); jorge.g.position.y = 0.5 + Math.sin(tc * 3) * 0.05;
        rival.irPara(em(XR, 0), em(XR, 1), k - 0.01, tc, { reto: true }); rival.g.position.y = 0.5;
        jatoDe(fog2, jato2, tc); jatoDe(fog, jato, tc);
        if (tc > tAp) jorge.reagir('vitoria', tc - tAp);
        if (tc < tAp) fx.et.agora.em(cabecaDe(jorge, 0.45), tc - tA - 0.1);
        K.som('whoosh', tA, 0.7); K.som('certo', tAp, 0.6);
        if (tc < tAp) K.seguir(jorge, { lado: 'frente', dist: 4.4, altura: 1.6 });
        else K.heroi(jorge, pc(tc, tAp, B.ate));
      }
    },
    segue(B, tc) {
      // NA TELA: o Gui no quarto; a pergunta; a barra com mappoa.com; o robô; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('perdeu', B, 0.05), tCo = quando('Comenta', B, 0.4), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
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
      fog.visible = true;
      jorge.colocar(em(XJ, 0.3), em(XJ, 1)); jorge.reagir('mao_na_testa', 0.6); trofeuNaMao(jorge);
      rival.colocar(em(XR, 0.38), em(XR, 1)); rival.g.position.y = 0.5; rival.reagir('comemorando', 0.4); jatoDe(fog, jato, 0.5);
      K.filmar([cabecaDe(jorge, 0.3), cabecaDe(rival, 0.3), em(XJ, 0.3)], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.3, tam: 3.0 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, jorge, rival, cliente].forEach((b) => { b.g.visible = false; b.g.position.y = 0; });
    tudo.forEach((g) => { g.visible = false; });
    fog.visible = false; fog2.visible = false;
    trofeu.scale.setScalar(0.8);
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
