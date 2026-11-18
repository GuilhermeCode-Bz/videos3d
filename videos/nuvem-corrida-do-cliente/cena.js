// Corrida pelo cliente (canal Mappoa, feito na nuvem, 18/11/2026): narração de LOCUTOR ESPORTIVO. Dois web designers
// disputam o mesmo cliente (a dona do Studio Glam, na linha de chegada com a faixa CLIENTE) no calçadão. O Davi (o
// personagem do canal) sai na frente carregando uma planilha gigante nas costas e para em cada loja ("não, não e
// não"); o rival de moletom vermelho corre direto e fecha. No REPLAY aparece o segredo: o celular do rival com a lista.
// O Davi investe o preço de um isotônico no Mappoa, acha o Studio Glam e ganha a segunda prova sem a planilha.
// Três lugares (K.cenarios): a rua (rua_predios), o quarto do Davi (home_office) e o palco do Mappoa.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, rival, dona, robo, comp, cad, navG, telaC, telaM, celR, moeda, iso, planilha, faixaG, fita, medalha, contrato, carimbo, FOV0;
  const tudo = [], fx = {}, lojistas = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  // Rua: a largada em DZ + 14, a chegada (a faixa CLIENTE) em DZ; o Davi corre em x 0,85 e o rival em x -0,4
  let DZ = -5;
  const XD = 0.85, XR = -0.4;
  const LARG = () => DZ + 14, CHEG = () => DZ + 0.4;

  const LUGAR = { gancho: 'rua', planilha: 'rua', lojas: 'rua', rival: 'rua', fim1: 'rua', replay: 'rua', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', ficha: 'quarto', vitoria: 'rua', segue: 'quarto', cartao: 'quarto', capa: 'rua' };

  const SALOES = [
    { nome: 'Studio Glam', end: 'Rua 9, 312 · Setor Oeste', chips: ['whats', 'insta'] },
    { nome: 'Espaço Bella Cor', end: 'Av. T-63, 1200', chips: ['tel', 'insta'] },
    { nome: 'Salão Cachos de Ouro', end: 'Rua 24, 88 · Centro', chips: ['whats'] },
    { nome: 'Divas Hair Goiânia', end: 'Av. 85, 455', chips: ['whats', 'tel'] }
  ];

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
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function mapaPinos(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    [0.3, 0.7].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * (x - 0.05), h); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Quem precisa de site', w * 0.05, h * 0.066, w * 0.055, '#fff', 800, 'left', w * 0.9);
    [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]].slice(0, e.n || 0).forEach(([x, y]) => {
      const px = w * x, py = h * y, r = w * 0.045;
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
    });
  }
  function siteGlam(c, w, h) {
    c.fillStyle = '#fff5fb'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#c0267a'; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Studio Glam', w * 0.06, h * 0.13, w * 0.08, '#fff', 900); txt(c, 'agende pelo WhatsApp', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#f9c6e0', '#fde68a', '#e9d5ff'][i]); });
  }
  // a planilha nas costas do Davi: dezenas de linhas de empresas, quase todas com "?"
  function desenhaPlanilha(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1f7a3f'; c.fillRect(0, 0, w, h * 0.08);
    txt(c, 'EMPRESAS (na mão)', w * 0.04, h * 0.04, w * 0.06, '#fff', 900);
    c.strokeStyle = '#c9d2dc'; c.lineWidth = 2;
    for (let i = 1; i < 24; i++) { const y = h * 0.08 + i * h * 0.038; c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
    [0.45, 0.72].forEach((x) => { c.beginPath(); c.moveTo(w * x, h * 0.08); c.lineTo(w * x, h); c.stroke(); });
    const nomes = ['Loja A', 'Padaria', 'Ótica', 'Café', 'Pet shop', 'Farmácia', 'Mercado', 'Salão?', 'Clínica', 'Academia', 'Pizzaria', 'Dentista'];
    for (let i = 0; i < 23; i++) { const y = h * 0.08 + (i + 0.5) * h * 0.038; txt(c, nomes[i % nomes.length], w * 0.03, y, w * 0.045, '#333', 700); txt(c, '?', w * 0.56, y, w * 0.05, '#e8352b', 900); txt(c, '?', w * 0.83, y, w * 0.05, '#e8352b', 900); }
  }
  // o celular do rival: a lista de quem não tem site (o segredo do replay)
  function listaRival(c, w, h) {
    c.fillStyle = '#f5f8fc'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#0b1b3a'; c.fillRect(0, 0, w, h * 0.12);
    txt(c, 'Sem site · perto', w * 0.06, h * 0.06, w * 0.08, '#fff', 900, 'left', w * 0.9);
    ['Studio Glam', 'Bella Cor', 'Cachos'].forEach((s, i) => {
      rr(c, w * 0.05, h * (0.16 + i * 0.16), w * 0.9, h * 0.13, 12, i === 0 ? '#dff7ec' : '#ffffff');
      txt(c, s, w * 0.1, h * (0.2 + i * 0.16), w * 0.085, '#0b1b3a', 900, 'left', w * 0.6);
      txt(c, 'sem site', w * 0.1, h * (0.255 + i * 0.16), w * 0.06, '#d97706', 800);
    });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    const sal = (Cr.lojas || []).find((l) => l.id === 'salao');
    if (sal) DZ = sal.porta[2];
    // as árvores da direita ficam a cada 14 m (z = 26 - 14k): a chegada fica logo depois de uma
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    // esconde as árvores e bancos do trecho da corrida (lição planilha-infinita), pra câmera andar livre
    (Cr.grupo ? Cr.grupo.children : []).forEach((o) => { if (Math.abs(Math.abs(o.position.x) - 2.6) < 0.4 && o.position.z > DZ - 4 && o.position.z < DZ + 18) o.visible = false; });

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaSaloes = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: SALOES, n: e.n, sel: e.sel, total: 104, comSite: 66, semSite: 38 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Salões de beleza · Goiânia, GO · 38 sem site', 36, 168, 20, M.marinho, 700, 'left', w - 72);
    };
    T.analiseGlam = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Studio Glam', ate: e.ate, aderencia: 0.9 * k,
        dores: ['Sem site: agenda só pelo Instagram', 'Não aparece pra quem procura no bairro'], oportunidades: ['Site com agendamento e o WhatsApp no topo'],
        objecoes: ['"Minhas clientes me acham no Instagram"'], abordagem: 'Mostre quem procura salão no Setor Oeste e não acha o dela.'
      });
      if (e.ate >= 0) txt(c, Math.round(90 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
      if (e.zap) { rr(c, w - 250, 132, 232, 44, 22, '#25d366'); txt(c, 'WhatsApp ✓', w - 134, 155, 22, '#fff', 900, 'center'); }
    };
    T.msgGlam = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Studio Glam (WhatsApp)', digitado: e.d, texto: 'Oi! Vi que o Studio Glam ainda não tem site e a agenda é só pelo Instagram. Faço um site com agendamento pelo WhatsApp. Te mostro uma ideia?' });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Davi (do canal), o rival, a dona do Studio Glam, os três lojistas e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    dona = K.personagem('cabeleireira'); K.semNome(dona.g); K.nomear('dona', dona.g);
    [K.personagem('pizzaiolo'), K.personagem('dono', { cores: { terno: 0x2a3a5a } }), K.personagem('dona', { cores: { blazer: 0x3fb8c8, vestido: 0xffffff } })].forEach((b) => { K.semNome(b.g); lojistas.push(b); });
    K.nomear('lojista', lojistas[0].g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A planilha gigante nas costas do Davi (presa no corpo dele)
    planilha = new THREE.Group();
    const pf = folha(1.25, 1.7, 500, desenhaPlanilha); pf.position.set(0, 0, 0); planilha.add(pf);
    const grossa = K.malha(new THREE.BoxGeometry(1.25, 1.7, 0.18), K.mat(0xf2f2ee, { roughness: 0.9 })); grossa.position.z = -0.1; planilha.add(grossa);
    planilha.rotation.set(0.15, PI, 0); planilha.position.set(0, 1.25, -0.42);
    menino.g.add(planilha); K.nomear('planilha', planilha);

    // A linha de chegada: dois postes, a fita e a faixa CLIENTE em cima
    faixaG = new THREE.Group();
    [-1, 1].forEach((l) => { const p = K.malha(new THREE.CylinderGeometry(0.07, 0.07, 3.0, 12), K.mat(0xffffff, { roughness: 0.5 })); p.position.set(0.25 + l * 1.75, 1.5, 0); faixaG.add(p); });
    const ban = folha(3.7, 0.7, 800, (c, w, h) => { rr(c, 0, 0, w, h, 20, '#2fb5a6'); txt(c, 'CLIENTE', w / 2, h / 2 + 4, h * 0.6, '#fff', 900, 'center'); });
    ban.position.set(0.25, 3.0, 0); faixaG.add(ban);
    fita = K.malha(new THREE.BoxGeometry(3.5, 0.08, 0.02), K.mat(0xd8343a, { roughness: 0.5 })); fita.position.set(0.25, 1.05, 0); faixaG.add(fita);
    guarda(faixaG, 'faixa', [0, 0, 0]);
    celR = K.celular(); guarda(celR, 'celular', null, 1.8);
    medalha = K.m3d('medalha'); guarda(medalha, 'medalha', null, 0.9);

    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Studio Glam', w / 2, h * 0.22, w * 0.065, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    guarda(contrato, 'contrato');

    // Quarto
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, [-1.6, 0, -0.75]);
    iso = new THREE.Group();
    const garrafa = K.malha(new THREE.CylinderGeometry(0.07, 0.08, 0.32, 20), K.mat(0x2f9be8, { roughness: 0.3, transparent: true, opacity: 0.85 })); iso.add(garrafa);
    const tampa = K.malha(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 14), K.mat(0xf39a1e)); tampa.position.y = 0.19; iso.add(tampa);
    const rot = K.malha(new THREE.CylinderGeometry(0.082, 0.082, 0.12, 20), K.mat(0xffffff)); iso.add(rot);
    guarda(iso, 'isotonico');
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo();
    fx.poof = K.poof(); fx.vel = K.velocidade(); fx.vel2 = K.velocidade(); fx.onda = K.ondaChoque();
    fx.fala = K.balaoFala();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      largada: e('LARGADA!', 'laranja'), quilos: e('40 kg de planilha', 'vermelho'), nao: e('Não! Não! Não!', 'vermelho'),
      direto: e('Direto!', 'azul'), venceu: e('Rival venceu', 'vermelho'), replay: e('⏪ REPLAY', 'laranja'),
      investir: e('Investir', 'azul'), goiania: e('38 sem site', 'azul'), chance: e('Quem tem chance', 'verde'),
      zap: e('WhatsApp ✓', 'verde'), primeiro: e('1º lugar!', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); cad.rotation.y = PI; menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // corrida: x de 0 a 1 entre a largada e a chegada (z), na pista de cada um
  const pista = (x, k) => [x, 0, K.lerp(LARG(), CHEG(), k)];
  function correndo(b, x, k, tc, op = {}) {
    b.irPara(pista(x, -0.2), pista(x, 1.2), K.clamp((k + 0.2) / 1.4), tc, { correr: true, reto: true });
    void op;
  }
  function fitaEm(rompida) {
    fita.visible = true; ve(faixaG); faixaG.position.set(0, 0, CHEG() - 0.5);
    if (rompida > 0) { fita.scale.x = Math.max(0.05, 1 - rompida); fita.rotation.z = rompida * 0.6; fita.position.y = 1.05 - rompida * 0.6; } else { fita.scale.x = 1; fita.rotation.z = 0; fita.position.y = 1.05; }
  }
  function donaNaChegada(tc, humor = 'normal') { dona.colocar([0.25, 0, CHEG() - 2.2], [0.25, 1.5, CHEG() + 6]); dona.humor(humor); void tc; }

  // câmeras da corrida no meio do calçadão (x 0,25, longe das árvores): na frente de quem corre, atrás ou na diagonal
  function camCorrida(b, modo, dist = 6.5) {
    const z = b.g.position.z, x = b.g.position.x;
    if (modo === 'frente') K.mirar([0.25, 1.7, z - dist], [x * 0.5 + 0.12, 1.1, z]);
    else if (modo === 'tras') K.mirar([0.25, 2.0, z + dist], [x * 0.5 + 0.12, 1.2, z - 2]);
    else K.mirar([1.9, 1.5, z - dist * 0.6], [x, 1.1, z]);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a largada no calçadão: o Davi (com a planilha) e o rival lado a lado; o tiro (onda de choque) em "largada"; os dois disparam; a faixa CLIENTE lá no fim · MOSTRA: personagem, rival, faixa
      const tLa = quando('largada', B, 0.2), tDo = quando('Dois', B, 0.45), tCl = quando('cliente', B, 0.85);
      fitaEm(0);
      const k = K.clamp((tc - tLa) / 9) * 0.6;
      correndo(menino, XD, tc > tLa ? k : 0, tc); correndo(rival, XR, tc > tLa ? k * 0.95 : 0, tc);
      if (tc < tLa) { menino.colocar(pista(XD, 0), pista(XD, 1)); rival.colocar(pista(XR, 0), pista(XR, 1)); menino.reagir('empurrando', tc); rival.reagir('empurrando', tc); }
      menino.humor('bravo'); rival.humor('bravo');
      // CÂMERA: 3 cortes (de frente, baixo, os dois na largada; do alto, a rua comprida até a faixa; de frente seguindo os dois)
      const c1 = Math.max(B.inicio + 0.7, tLa + 0.35), c2 = Math.max(c1 + 0.7, tCl - 0.2);
      if (tc < c1) K.mirar([0.25, 1.1, LARG() - 7.5], [0.25, 1.1, LARG()]);
      else if (tc < c2) K.mirar([0.3, K.lerp(9, 7.5, pc(tc, c1, c2)), LARG() + 4], [0.25, 0.5, CHEG() + 2]);
      else camCorrida(menino, 'frente', 7);
      // EFEITOS VISUAIS: a onda de choque e "LARGADA!" em "largada" · linhas de velocidade
      fx.onda.em([0.25, 0.05, LARG()], tc - tLa, { raio: 2.5, som: false });
      fx.et.largada.em({ tela: [540, 600] }, tc - tLa);
      if (tc > tLa) { fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: PI }); fx.vel2.em(mais(rival.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: PI }); }
      // SONS: o tiro (estrondo) · whoosh · passos · a torcida em "cliente"
      K.som('estrondo', tLa, 0.6); K.som('whoosh', tLa + 0.1, 0.5); K.som('apito', B.inicio + 0.05, 0.3); K.som('festa', tCl, 0.3);
      for (let i = 0; i < 6; i++) K.som('passo', tLa + 0.2 + i * 0.25, 0.25);
      void tDo;
    },
    planilha(B, tc) {
      // NA TELA: o Davi correndo na frente com a planilha gigante nas costas, suando; o rival atrás · MOSTRA: personagem, planilha
      const tSa = quando('sai', B, 0.15), tCa = quando('carregando', B, 0.45), tQu = quando('quilos', B, 0.9);
      fitaEm(0);
      const k = 0.08 + pc(tc, B.inicio, B.ate) * 0.12;
      correndo(menino, XD, k, tc); correndo(rival, XR, k - 0.05, tc);
      menino.reagir(tc > tCa ? 'cansado' : 'bravo', tc - tCa); menino.g.rotation.x = 0.15;
      planilha.rotation.z = Math.sin(tc * 9) * 0.06;
      // CÂMERA: (1) do lado, travelling, os dois · (2) de frente, perto, o Davi suando com a planilha
      const cv = (tSa + tQu) / 2;
      if (tc < cv) camCorrida(menino, 'diagonal', 6);
      else camCorrida(menino, 'frente', 4.6);
      fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: PI });
      fx.et.quilos.em({ tela: [540, 400] }, tc - tQu + 0.3);
      K.som('passo', B.inicio + 0.2, 0.3); K.som('passo', B.inicio + 0.6, 0.3); K.som('range', tCa, 0.35); K.som('passo', tQu, 0.3);
    },
    lojas(B, tc) {
      // NA TELA: três lojistas no calçadão; o Davi para em cada um e pergunta; cada um faz "não" e aparece um ✗ · MOSTRA: personagem, lojista, planilha
      const tPa = quando('para', B, 0.15), tN1 = quando('não', B, 0.65);
      const tN2 = tN1 + 0.38, tN3 = tN1 + 0.76;
      fitaEm(0);
      const L = [[2.0, 0, LARG() - 3.5], [2.0, 0, LARG() - 5.2], [2.0, 0, LARG() - 6.9]];
      lojistas.forEach((b, i) => { b.g.visible = true; b.colocar(L[i], mais(L[i], [-2, 1.4, 1])); });
      // o Davi vai de lojista em lojista: em cada "não" ele está no da vez
      const i = tc < tN1 ? 0 : tc < tN2 ? 1 : 2;
      const de = i === 0 ? [XD, 0, LARG() - 2.6] : mais(L[i - 1], [-0.9, 0, 0]), ate = mais(L[i], [-0.9, 0, 0]);
      const t0 = i === 0 ? B.inicio : [tN1, tN2][i - 1] + 0.05, t1 = t0 + 0.25;
      if (tc < t1) menino.irPara(de, ate, pc(tc, t0, t1), tc, { reto: true });
      else { menino.colocar(ate, cabecaDe(lojistas[i], -0.3)); menino.reagir('mostrando', tc - t1); }
      [tN1, tN2, tN3].forEach((tn, j) => {
        if (tc > tn && j <= i) { lojistas[j].reagir('nao', tc - tn); [fx.simb, fx.simb2, fx.simb3][j].em(cabecaDe(lojistas[j], 0.45), tc - tn, { tipo: '✗', tam: 0.55 }); }
        K.som('errado', tn, 0.4);
      });
      // CÂMERA: do outro lado do calçadão, acompanhando o Davi de loja em loja
      const pz = menino.g.position.z;
      K.mirar([-1.6, 1.9, pz + 4.6], [1.4, 1.3, pz - 0.6]);
      fx.et.nao.em({ tela: [540, 400] }, tc - tN1);
      void tPa;
    },
    rival(B, tc) {
      // NA TELA: o rival correndo direto pelo calçadão, rápido, com linhas de velocidade; ao fundo, o Davi parado numa loja · MOSTRA: rival, faixa
      const tEn = quando('Enquanto', B, 0.1), tDi = quando('direto', B, 0.4), tNe = quando('nenhuma', B, 0.92);
      fitaEm(0);
      const k = K.lerp(0.45, 0.8, pc(tc, B.inicio, B.ate));
      correndo(rival, XR, k, tc); rival.humor('feliz');
      menino.g.visible = false;
      // CÂMERA: (1) de frente pro rival, seguindo · (2) de trás dele, a faixa CLIENTE chegando
      const cv = (tDi + tNe) / 2;
      if (tc < cv) camCorrida(rival, 'frente', 6.5);
      else camCorrida(rival, 'tras', 5.5);
      fx.vel.em(mais(rival.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: PI });
      fx.et.direto.em({ tela: [540, 400] }, tc - tDi);
      K.som('whoosh', tDi, 0.5); for (let i = 0; i < 6; i++) K.som('passo', B.inicio + i * 0.25, 0.25); void tEn;
    },
    fim1(B, tc) {
      // NA TELA: o rival rompe a fita, aperta a mão da dona do Studio Glam, contrato FECHADO; o Davi chega depois e a planilha cai em cima dele · MOSTRA: rival, contrato, personagem
      const tFi = quando('Fim', B, 0.05), tFe = quando('fecha', B, 0.35), tDa = quando('Davi', B, 0.6), tPl = quando('planilha', B, 0.92);
      donaNaChegada(tc, 'feliz');
      const kR = pc(tc, B.inicio, tFe - 0.15);
      if (tc < tFe - 0.15) { correndo(rival, XR, K.lerp(0.85, 1.05, kR), tc); fitaEm(0); }
      else { fitaEm(K.clamp((tc - tFe + 0.15) / 0.3)); rival.colocar([0.0, 0, CHEG() - 1.4], cabecaDe(dona, -1.3)); rival.apontar(0.35); rival.humor('feliz'); dona.colocar([0.6, 0, CHEG() - 1.9], cabecaDe(rival, -1.3)); dona.humor('feliz'); }
      // o Davi chega depois, cansado; em "planilha", a planilha cai em cima dele
      if (tc < tDa) menino.g.visible = false;
      else if (tc < tPl) { correndo(menino, XD, K.lerp(0.75, 0.95, pc(tc, tDa, tPl)), tc); menino.reagir('cansado', tc - tDa); }
      else { menino.colocar(pista(XD, 0.97), [0, 1.4, CHEG() + 6]); menino.reagir('cai_sentado', tc - tPl); planilha.position.set(0, 1.0 - K.clamp((tc - tPl) / 0.3) * 0.6, 0.1); planilha.rotation.set(-1.2 * K.clamp((tc - tPl) / 0.3), PI, 0); }
      // CÂMERA: (1) baixo, a fita rompendo · (2) o aperto de mão com o contrato · (3) o Davi chegando e caindo
      if (tc < tFe + 0.3) K.mirar([1.8, 0.8, CHEG() + 4.2], [0.1, 1.1, CHEG() - 0.6]);
      else if (tc < tDa) K.mirar([1.6, 1.7, CHEG() + 2.6], [0.3, 1.4, CHEG() - 1.6]);
      else K.mirar([-1.4, 1.7, CHEG() + 4.6], [0.6, 1.1, CHEG() + 1.0]);
      if (tc > tFe && tc < tDa + 0.5) {
        ve(contrato); const m = [0.3, 2.15, CHEG() - 1.3];
        contrato.position.set(...m); contrato.lookAt(K.camera.position); contrato.scale.setScalar(pop(tc - tFe));
        carimbo.visible = tc > tFe + 0.25; carimbo.scale.setScalar(tc > tFe + 0.25 ? K.lerp(1.8, 1, K.suave(pc(tc, tFe + 0.25, tFe + 0.4))) : 0.001);
      }
      fx.et.venceu.em({ tela: [540, 400] }, tc - tFe);
      K.som('festa', tFe - 0.1, 0.5); K.som('baque', tFe + 0.25, 0.6); K.som('baque', tPl + 0.2, 0.6); void tFi;
    },
    replay(B, tc) {
      // NA TELA: "⏪ REPLAY"; o rival correndo de novo em câmera lenta, e a câmera chega no celular dele: a lista "Sem site · perto" com o Studio Glam · MOSTRA: rival, celular
      const tRe = quando('Replay', B, 0.05), tCe = quando('celular', B, 0.3), tMo = quando('mostrava', B, 0.55), tSi = quando('site', B, 0.92);
      fitaEm(0); donaNaChegada(tc, 'normal');
      const k = K.lerp(0.4, 0.5, pc(tc, B.inicio, B.ate));
      correndo(rival, XR, k, tc * 0.35); rival.humor('feliz');
      rival.pose({ x: -0.3, z: 0.2 }, { x: -1.1, z: 0.2, c: -1.4 });
      // CÂMERA: (1) de lado, câmera lenta · (2) por cima do ombro dele, no celular
      const cv = tCe + 0.1;
      const r = rival.g.position.toArray();
      if (tc < cv) K.mirar([r[0] - 3.4, 1.4, r[2] - 1.5], mais(r, [0, 1.1, 0]));
      else K.mirar([r[0] - 1.2, 2.3, r[2] + 1.9], [r[0] + 0.2, 1.2, r[2] - 0.4]);
      ve(celR); rival.g.updateMatrixWorld(true);
      const m = rival.mao(1); celR.g.position.set(m[0], m[1] + 0.12, m[2]); celR.g.scale.setScalar(1.8); celR.g.lookAt(K.camera.position);
      celR.tela.desenhar(listaRival, 'lr');
      fx.et.replay.em({ tela: [540, 400] }, tc - tRe + 0.1);
      if (tc > tMo) fx.simb.em(mais(celR.g.position.toArray(), [0.35, 0.35, 0]), tc - tMo, { tipo: '!', tam: 0.5 });
      K.som('rebobina', tRe, 0.6); K.som('ding', tMo, 0.4); K.som('brilho', tSi, 0.4);
    },
    investe(B, tc) {
      // NA TELA: o Davi de pé no quarto com o isotônico; o isotônico vira moeda e cai no teclado; a tela com os pinos · MOSTRA: personagem, isotonico, monitor
      const tPe = quando('pensa', B, 0.12), tIn = quando('investe', B, 0.25), tIs = quando('isotônico', B, 0.42), tSi = quando('sistema', B, 0.55), tSt = quando('site', B, 0.92);
      ve(comp, cad);
      menino.colocar(EM_PE, tc < tSi + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tPe) menino.reagir('segurando', tc - B.inicio); else if (tc < tSi) menino.reagir('sim', tc - tPe); else menino.reagir('digitando', tc);
      menino.humor(tc > tPe ? 'feliz' : 'normal');
      menino.g.updateMatrixWorld(true);
      const pPos = mais(menino.mao(1), [0.03, 0.12, 0.06]);
      if (tc < tSi) { ve(iso); iso.position.set(...pPos); iso.rotation.set(0, tc, 0.1); iso.scale.setScalar(pop(tc - tIs + 0.35)); }
      if (tc > tSi) {
        fx.poof.em(pPos, tc - tSi, { escala: 0.35 });
        const q = K.clamp((tc - tSi) / 0.45); moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tSi + 0.45, 0.6);
      }
      const n = tc > tSt - 0.4 ? Math.min(6, 1 + Math.floor((tc - tSt + 0.4) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => (tc > tSi ? mapaPinos(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tSi) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tSt - 0.4 + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      if (tc < tSi + 0.15) { const k = K.suave(pc(tc, B.inicio, tSi + 0.15)); K.mirar([K.lerp(0.75, 0.6, k), 1.55, K.lerp(3.2, 2.6, k)], [0.85, 1.15, -0.5]); }
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tSi + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com; a lista dos salões de Goiânia sobe; "38 sem site" · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.04), tDi = quando('digita', B, 0.12), tL = quando('lista', B, 0.45), tSa = quando('salões', B, 0.55), tTr = quando('oito', B, 0.93);
      ve(comp, cad, navG);
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tSa ? 1 + Math.floor((tc - tSa) / 0.22) : 0;
        telaC.mostrar('listaSaloes', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tSa + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5); K.som('festa', tTr, 0.35);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
      fx.et.goiania.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tTr + 0.2);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Studio Glam cai do alto; o robô; o Davi · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseGlam', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5); K.som('brilho', tM, 0.6);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    ficha(B, tc) {
      // NA TELA: a ficha do Studio Glam do lado do computador, o WhatsApp, a nota subindo até 90; em "mensagem", a mensagem pronta · MOSTRA: tela, personagem
      const tAb = quando('abre', B, 0.08), tZa = quando('WhatsApp', B, 0.35), tNo = quando('nota', B, 0.5), tMs = quando('mensagem', B, 0.8), tPr = quando('pronta', B, 0.93);
      ve(comp, cad, telaC); comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      if (tc < tMs) telaC.mostrar('analiseGlam', { ate: tc > tNo + 0.4 ? 1 : 0, score: K.clamp((tc - tNo) / 0.7), zap: tc > tZa });
      else telaC.mostrar('msgGlam', { d: K.clamp((tc - tMs) / 1.0) });
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc < tPr ? TELA_Q : [1.6, 1.4, 5]);
      if (tc < tPr) menino.apontar(0.55 + Math.sin(tc * 3) * 0.05); else menino.reagir('sim', tc - tPr);
      K.som('clique', tAb, 0.4); K.som('ding', tZa, 0.35); for (let k = 0; k < 5; k++) K.som('bip', tNo + k * 0.12, 0.2); K.som('certo', tPr, 0.45);
      const cv = (tNo + tMs) / 2;
      if (tc < cv) K.filmar([telaC, mais(TELA_Q, [0, 1.0, 0]), mais(TELA_Q, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.5 });
      else K.filmar([telaC, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.9 });
      if (tc > tZa && tc < tMs) fx.et.zap.em({ tela: [540, 400] }, tc - tZa);
    },
    vitoria(B, tc) {
      // NA TELA: segunda prova: o Davi sem a planilha corre direto e rompe a fita primeiro; a dona do Studio Glam comemora; a medalha; o rival atrás, de mão na testa · MOSTRA: personagem, faixa, medalha
      const tSe = quando('Segunda', B, 0.08), tDi = quando('direto', B, 0.35), tSe2 = quando('planilha', B, 0.55), tCr = quando('cruza', B, 0.75), tPr = quando('primeiro', B, 0.93);
      planilha.visible = false;
      const tChega = tCr + 0.15;
      if (tc < tChega) { correndo(menino, XD, K.lerp(0.35, 1.0, pc(tc, B.inicio, tChega)), tc); correndo(rival, XR, K.lerp(0.2, 0.7, pc(tc, B.inicio, tChega)), tc); fitaEm(0); }
      else {
        fitaEm(K.clamp((tc - tChega) / 0.3));
        menino.colocar([XD - 0.3, 0, CHEG() - 1.2], [0.6, 1.5, CHEG() + 6]); menino.reagir('vitoria', tc - tChega);
        rival.colocar(pista(XR, 0.82), [0, 1.4, CHEG()]); rival.reagir('mao_na_testa', tc - tChega);
        dona.colocar([0.0, 0, CHEG() - 1.9], cabecaDe(menino, -1.3)); dona.reagir('aplaudindo', tc - tChega);
        ve(medalha); const cab = cabecaDe(menino, -0.75); medalha.position.set(cab[0], cab[1], cab[2] + 0.22); medalha.rotation.set(0, 0, 0); medalha.scale.setScalar(0.9 * pop(tc - tPr + 0.1));
      }
      // CÂMERA: (1) de frente seguindo o Davi correndo · (2) baixo, ele rompendo a fita · (3) a comemoração com a medalha
      if (tc < tCr - 0.3) camCorrida(menino, 'frente', 6.5);
      else if (tc < tPr) K.mirar([1.9, 0.8, CHEG() + 4.0], [0.4, 1.1, CHEG() - 0.6]);
      else K.mirar([0.9, 1.6, CHEG() + 2.4], [0.5, 1.3, CHEG() - 1.2]);
      if (tc < tChega) fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: PI, comp: 1.4 });
      fx.et.primeiro.em({ tela: [540, 400] }, tc - tPr);
      K.som('apito', tSe, 0.35); K.som('whoosh', tDi, 0.5); K.som('festa', tChega, 0.6); K.som('ding', tPr, 0.5);
      for (let i = 0; i < 6; i++) K.som('passo', B.inicio + 0.2 + i * 0.22, 0.25); void tSe2;
    },
    segue(B, tc) {
      // NA TELA: o Davi de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      planilha.visible = false;
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteGlam, 'glam');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo, medalha); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      const cab = cabecaDe(menino, -0.75); medalha.position.set(cab[0], cab[1], cab[2] + 0.2); medalha.rotation.set(0, menino.g.rotation.y, 0); medalha.scale.setScalar(0.9);
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      planilha.visible = false;
      fx.seguir.em(9); ve(comp, cad, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteGlam, 'glam');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende a corrida: o Davi de frente, correndo com a planilha gigante, o rival do lado e a faixa CLIENTE atrás
      fitaEm(0); donaNaChegada(0, 'feliz');
      correndo(menino, XD, 0.3, 0.4); correndo(rival, XR, 0.29, 0.55);
      menino.reagir('cansado', 1); menino.g.rotation.x = 0.15;
      const p = menino.g.position.toArray();
      K.mirar([0.3, 1.5, p[2] - 3.8], [0.25, 1.25, p[2]]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, rival, dona, ...lojistas].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    const naRua = (plano === 'capa' ? 'rua' : LUGAR[B.plano]) === 'rua';
    planilha.visible = naRua && !['vitoria'].includes(B.plano); planilha.position.set(0, 1.25, -0.42); planilha.rotation.set(0.15, PI, 0);
    cad.position.set(-1.6, 0, -0.75); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
