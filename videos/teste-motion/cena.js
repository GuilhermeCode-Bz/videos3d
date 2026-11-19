// Duas profissões: ele faz o site mais bonito da cidade, só falta alguém pedir um (canal Mappoa, molde de 45 s).
// O Caio (o menino de camiseta azul do canal) pinta com um pincel o site gigante e brilhando no meio de uma praça vazia,
// com uma moita de feno rolando. Fazer site e achar cliente são duas profissões e o curso só ensinou a primeira; a
// clínica de fisioterapia do bairro fecha com outro web designer. Virada: ele larga o pincel e pega o mapa. Cinco
// lugares (K.cenarios): a praça (cidade de tarde), o quarto, o estúdio das duas placas, a clínica e o palco do Mappoa.
// Base: o cena.js do cliente-gritou-na-esquina (o bloco do Mappoa e o fim). Cada plano começa com as linhas da ficha.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, fisio, rival, dona, robo, comp, cad, telaC, telaM, navG, siteG, brilhoG, pincel, feno, mapaG, diploma;
  let placas, placaA, placaB, contrato, carimbo, FOV0;
  const tudo = [], fx = {}, estrelas = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Praça (cidade de tarde): o site gigante em cima de um tablado no meio do calçadão, virado pra +z; o Caio do lado direito
  const SITE = [0, 2.65, -0.6], SITE_L = 2.8, SITE_A = 4.4, CAIO_P = [1.85, 0.14, 0.55];
  // Quarto (home_office): o computador do Caio, a cadeira giratória na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  // Estúdio: as duas placas lado a lado e o Caio no meio, de frente
  const PLACA_A = [-1.2, 2.35, -0.6], PLACA_B = [1.2, 2.35, -0.6], CAIO_E = [0, 0, 0.7];
  // Clínica (consultorio): a fisioterapeuta perto da maca; o rival entra pela frente
  const FISIO = [-1.3, 0, -1.3], RIV_A = [4.8, 0, 1.6], RIV_B = [0.1, 0, -0.75];

  const LUGAR = {
    gancho: 'praca', retoca: 'quarto', duas: 'estudio', clinica: 'clinica', virada: 'praca', lista: 'quarto',
    mappoa: 'mundo_mappoa', segue: 'quarto', cartao: 'quarto', capa: 'praca'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.42) ? 'praca' : 'clinica';
    return LUGAR[B.plano] || 'quarto';
  }

  // As clínicas de fisioterapia de Pelotas sem site (nomes inventados)
  const CLINICAS = [
    { nome: 'Movimento Fisio', end: 'Rua XV de Novembro, 512', chips: ['whats', 'insta'] },
    { nome: 'Fisio Laranjal', end: 'Av. Rio Grande do Sul, 88', chips: ['tel', 'whats'] },
    { nome: 'Coluna & Postura', end: 'Rua Gonçalves Chaves, 230', chips: ['whats'] },
    { nome: 'ReabFisio Centro', end: 'Rua Andrade Neves, 1401', chips: ['tel', 'insta'] }
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

  // ---------- Telas desenhadas ----------
  // O site lindo do Caio (no telão da praça e no monitor). e.zoom: a lupa do pixel por pixel
  function siteLindo(c, w, h, e = {}) {
    c.fillStyle = '#fbfaf6'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, h * 0.45); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#6b4fd8');
    c.fillStyle = d; c.fillRect(0, 0, w, h * 0.42);
    rr(c, w * 0.06, h * 0.035, w * 0.12, w * 0.12, w * 0.03, '#ffffff');
    [0.5, 0.64, 0.78].forEach((x) => rr(c, w * x, h * 0.05, w * 0.1, h * 0.012, 6, 'rgba(255,255,255,0.8)'));
    txt(c, 'Caio Studio', w * 0.08, h * 0.17, w * 0.11, '#fff', 900, 'left', w * 0.84);
    txt(c, 'sites que encantam', w * 0.08, h * 0.24, w * 0.06, '#fff', 700, 'left', w * 0.84);
    rr(c, w * 0.08, h * 0.3, w * 0.42, h * 0.06, h * 0.03, '#f5c518'); txt(c, 'Fale comigo', w * 0.29, h * 0.33, w * 0.05, '#1b1b1b', 900, 'center');
    // as estrelinhas do hero
    c.fillStyle = 'rgba(255,255,255,0.9)';
    [[0.8, 0.2], [0.9, 0.31], [0.72, 0.34], [0.62, 0.14]].forEach(([x, y]) => { c.beginPath(); c.arc(w * x, h * y, w * 0.012, 0, PI * 2); c.fill(); });
    ['#c7f0ea', '#fde68a', '#e2d9ff', '#ffd6e0'].forEach((cor, i) => {
      const x = w * (0.06 + (i % 2) * 0.46), y = h * (0.47 + Math.floor(i / 2) * 0.24);
      rr(c, x, y, w * 0.42, h * 0.21, 14, '#ffffff'); rr(c, x + w * 0.02, y + h * 0.015, w * 0.38, h * 0.11, 10, cor);
      rr(c, x + w * 0.03, y + h * 0.145, w * 0.3, h * 0.014, 5, '#c9ced6'); rr(c, x + w * 0.03, y + h * 0.172, w * 0.2, h * 0.014, 5, '#dde1e7');
    });
    if (e.zoom) {
      const cx = w * 0.62, cy = h * 0.58, r = w * 0.22;
      c.save(); c.beginPath(); c.arc(cx, cy, r, 0, PI * 2); c.clip();
      const n = 7, s = (r * 2) / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { c.fillStyle = (i + j) % 2 ? '#c7f0ea' : '#bde9e2'; c.fillRect(cx - r + i * s, cy - r + j * s, s - 2, s - 2); }
      c.fillStyle = e.pixel ? '#2fb5a6' : '#e8352b'; c.fillRect(cx - s / 2, cy - s / 2, s - 2, s - 2);
      c.restore();
      c.strokeStyle = '#1b1b1b'; c.lineWidth = w * 0.02; c.beginPath(); c.arc(cx, cy, r, 0, PI * 2); c.stroke();
      c.beginPath(); c.moveTo(cx + r * 0.7, cy + r * 0.7); c.lineTo(cx + r * 1.25, cy + r * 1.25); c.lineWidth = w * 0.045; c.stroke();
    }
  }
  // Uma folha desenhada num plano (o contrato, o carimbo, o diploma, o mapa)
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }
  // As placas do estúdio: o título, o ícone (✓, ? ou ✗) e a cor do fundo
  function desenhaPlaca(c, w, h, titulo, icone) {
    const cor = icone === '✓' ? '#2fb54a' : icone === '✗' ? '#e8352b' : '#f39a1e';
    rr(c, 0, 0, w, h, 34, '#0b1b3a'); rr(c, 10, 10, w - 20, h - 20, 28, '#ffffff');
    txt(c, titulo, w / 2, h * 0.32, h * 0.17, '#0b1b3a', 900, 'center', w * 0.9);
    c.fillStyle = cor; c.beginPath(); c.arc(w / 2, h * 0.68, h * 0.2, 0, PI * 2); c.fill();
    txt(c, icone, w / 2, h * 0.69, h * 0.27, '#ffffff', 900, 'center');
  }

  // ---------- Peças feitas aqui ----------
  // O pincel: o cabo, a virola de metal, as cerdas e a ponta com tinta verde. Comprimento 1,29 no eixo +z (lookAt aponta a ponta)
  function fazPincel() {
    const g = new THREE.Group();
    const cabo = K.malha(new THREE.CylinderGeometry(0.035, 0.045, 0.9, 14).rotateX(PI / 2), K.mat(0xb5652b, { roughness: 0.5 }));
    cabo.position.z = 0.45;
    const virola = K.malha(new THREE.CylinderGeometry(0.052, 0.05, 0.13, 16).rotateX(PI / 2), K.mat(0xd8dde3, { metalness: 0.7, roughness: 0.3 }));
    virola.position.z = 0.96;
    const cerdas = K.malha(new THREE.CylinderGeometry(0.03, 0.06, 0.22, 16).rotateX(-PI / 2), K.mat(0xf2d8a6, { roughness: 0.8 }));
    cerdas.position.z = 1.13;
    const tinta = K.malha(new THREE.CylinderGeometry(0.012, 0.031, 0.08, 14).rotateX(-PI / 2), K.mat(0x2fb5a6, { roughness: 0.4 }));
    tinta.position.z = 1.25;
    g.add(cabo, virola, cerdas, tinta);
    return g;
  }
  // A moita de feno: anéis de palha emaranhados (rola sozinha pela praça)
  function fazFeno() {
    const g = new THREE.Group(), palha = K.mat(0xb88a4a, { roughness: 0.9 }), seca = K.mat(0x9a7038, { roughness: 0.9 });
    for (let i = 0; i < 9; i++) {
      const t = K.malha(new THREE.TorusGeometry(0.34 + (i % 3) * 0.05, 0.022, 6, 28), i % 2 ? palha : seca);
      t.rotation.set(i * 1.3, i * 0.7, i * 2.1); g.add(t);
    }
    const miolo = K.malha(new THREE.IcosahedronGeometry(0.22, 0), new THREE.MeshStandardMaterial({ color: 0x8a6230, wireframe: true }));
    g.add(miolo);
    return g;
  }
  // As estrelinhas do brilho (✦ subindo em volta do site e na ponta do pincel)
  function fazEstrela(i) {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const c = cv.getContext('2d'); c.font = '900 110px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillStyle = i % 2 ? '#fff6c2' : '#ffd84a'; c.fillText('✦', 64, 66);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }));
    s.visible = false; K.scene.add(s); return s;
  }
  // estrelinhas em volta de um centro (larg x alt), subindo e piscando
  function estrelasEm(centro, larg, alt, tc, forca = 1, esc = 0.28) {
    estrelas.forEach((s, i) => {
      const k = (tc * 0.45 + i / estrelas.length) % 1, l = ((i * 37) % 11) / 10 - 0.5;
      s.visible = forca > 0.01;
      s.position.set(centro[0] + l * larg, centro[1] - alt / 2 + k * alt, centro[2] + 0.25 + (i % 3) * 0.1);
      s.material.opacity = Math.sin(k * PI) * forca;
      s.scale.setScalar(esc * (0.6 + 0.4 * Math.sin(tc * 6 + i)));
    });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['cidade', { hora: 'tarde' }, 'praca'], ['home_office', {}, 'quarto'], ['estudio', { pedestal: false }, 'estudio'], ['consultorio', {}, 'clinica'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.siteLindo = (c, w, h, e) => siteLindo(c, w, h, e);
    T.listaFisio = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: CLINICAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Clínicas de fisioterapia · Pelotas, RS', 36, 168, 20, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseFisio = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Movimento Fisio', ate: e.ate, aderencia: 0.88 * k,
        dores: ['Sem site próprio', 'Agenda só pelo WhatsApp'], oportunidades: ['Site com os tratamentos e o agendamento online'],
        objecoes: ['"Meus pacientes vêm por indicação"'], abordagem: 'Mostre quem procura fisioterapia no bairro e não acha a clínica.'
      });
      if (e.ate >= 0) txt(c, Math.round(88 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Caio (do canal), a fisioterapeuta (jaleco), o rival de moletom vermelho, a dona da Movimento Fisio e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    fisio = K.personagem('dentista', { cores: { camisa: 0x2fb5a6, calca: 0x2f4a7a, cabelo: 0x3a2414, pele: 0xc98d5e } });
    if (fisio.extras && fisio.extras.mascara) fisio.extras.mascara.visible = false;
    K.semNome(fisio.g); K.nomear('fisio', fisio.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    dona = K.personagem('dona', { cores: { blazer: 0x2fb5a6, vestido: 0xffffff } }); K.semNome(dona.g); K.nomear('cliente', dona.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Praça: o tablado, o site gigante, o brilho atrás dele, o pincel, o feno e as estrelinhas
    const tablado = K.malha(new THREE.BoxGeometry(SITE_L + 0.8, 0.3, 1.0), K.mat(0x3a3f4a, { roughness: 0.7 }));
    tablado.position.set(SITE[0], 0.29, SITE[2]);
    siteG = K.painelMappoa(SITE_L, SITE_A, { px: 900, borda: '#0b1b3a' });
    siteG.g.add(tablado); tablado.position.set(0, 0.29 - SITE[1], 0);
    guarda(siteG, 'site', SITE);
    siteG.mostrar('siteLindo', {});
    brilhoG = new THREE.Mesh(new THREE.PlaneGeometry(SITE_L + 1.1, SITE_A + 1.1), new THREE.MeshBasicMaterial({ color: 0xffe27a, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending }));
    guarda(brilhoG, null, mais(SITE, [0, 0, -0.08]));
    pincel = fazPincel(); guarda(pincel, 'pincel');
    feno = fazFeno(); guarda(feno, 'feno');
    for (let i = 0; i < 10; i++) estrelas.push(fazEstrela(i));

    // O mapa de papel que ele pega na virada
    mapaG = new THREE.Group();
    mapaG.add(folha(0.78, 0.56, 420, (c, w, h) => {
      rr(c, 0, 0, w, h, 12, '#f6ecd2');
      c.fillStyle = '#cfe6b8'; [[0.06, 0.1, 0.3, 0.3], [0.55, 0.12, 0.38, 0.25], [0.1, 0.58, 0.35, 0.32], [0.6, 0.55, 0.3, 0.35]].forEach(([x, y, a, b]) => c.fillRect(w * x, h * y, w * a, h * b));
      c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.035; c.beginPath(); c.moveTo(0, h * 0.48); c.lineTo(w, h * 0.5); c.moveTo(w * 0.47, 0); c.lineTo(w * 0.5, h); c.stroke();
      c.strokeStyle = '#d9c9a2'; c.lineWidth = 3; [0.33, 0.66].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * x, h); c.stroke(); });
      [[0.25, 0.3], [0.72, 0.28], [0.3, 0.75], [0.78, 0.72], [0.52, 0.4]].forEach(([x, y]) => {
        c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * x, h * y - 10, 12, PI, 0); c.lineTo(w * x, h * y + 6); c.closePath(); c.fill();
        c.fillStyle = '#fff'; c.beginPath(); c.arc(w * x, h * y - 10, 5, 0, PI * 2); c.fill();
      });
      txt(c, 'CLIENTES', w / 2, h * 0.92, h * 0.09, '#0b1b3a', 900, 'center');
    }));
    guarda(mapaG, 'mapa');

    // Estúdio: as duas placas e o diploma do curso
    placas = new THREE.Group(); K.scene.add(placas);
    placaA = K.telaCanvas(2.0, 1.15, 600); placaB = K.telaCanvas(2.0, 1.15, 600);
    placaA.m.position.set(...PLACA_A); placaB.m.position.set(...PLACA_B);
    placas.add(placaA.m, placaB.m);
    [PLACA_A, PLACA_B].forEach((p) => {
      const haste = K.malha(new THREE.CylinderGeometry(0.04, 0.04, p[1] - 0.6, 10), K.mat(0x3a3f4a));
      haste.position.set(p[0], (p[1] - 0.6) / 2, p[2] - 0.05); placas.add(haste);
    });
    guarda(placas, 'profissoes');
    diploma = new THREE.Group();
    diploma.add(folha(0.62, 0.46, 420, (c, w, h) => {
      rr(c, 0, 0, w, h, 10, '#fffaf0'); c.strokeStyle = '#c9a227'; c.lineWidth = 8; c.strokeRect(12, 12, w - 24, h - 24);
      txt(c, 'DIPLOMA', w / 2, h * 0.2, h * 0.13, '#0b1b3a', 900, 'center');
      txt(c, 'Curso de Web Design', w / 2, h * 0.38, h * 0.08, '#4a4f58', 800, 'center', w * 0.86);
      txt(c, '✓ Fazer site', w * 0.16, h * 0.56, h * 0.08, '#2fb54a', 900);
      txt(c, '— Achar cliente', w * 0.16, h * 0.7, h * 0.08, '#b0b5bd', 800);
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.82, h * 0.78, h * 0.1, 0, PI * 2); c.fill();
    }));
    guarda(diploma, 'diploma');

    // Quarto: o computador, a cadeira, a barra do endereço e as telas do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria'); guarda(cad, null, SEAT);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Clínica: o contrato do rival com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site da clínica', w / 2, h * 0.22, w * 0.07, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    guarda(contrato, 'contrato');

    // Efeitos
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    fx.dias = K.contador();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      ninguem: e('0 pedidos', 'vermelho'), web: e('Web designer', 'azul'), pixel: e('Pixel por pixel', 'laranja'),
      duas: e('Duas profissões', 'laranja'), semSite: e('Sem site', 'vermelho'), outro: e('Outro web designer', 'vermelho'),
      investir: e('Investir', 'azul'), pelotas: e('Pelotas', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      soSite: e('Só fazia site', 'vermelho'), achou: e('Achou quem pede!', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    ve(cad);
    menino.colocar(SEAT, olhar || MONITOR);
    menino.sentar(1);
  }
  // o pincel saindo da mão e com a ponta encostada no alvo (o tamanho segue a distância)
  function pincelNa(mao, alvo, max = 1.3) {
    ve(pincel);
    const d = V(...alvo).distanceTo(V(...mao));
    pincel.position.set(...mao);
    pincel.scale.setScalar(Math.min(max, Math.max(0.25, d / 1.29)));
    pincel.lookAt(V(...alvo));
  }
  // o site gigante na praça, brilhando
  function siteBrilhando(tc, forca = 1) {
    ve(siteG, brilhoG);
    brilhoG.material.opacity = (0.28 + 0.14 * Math.sin(tc * 5)) * forca;
    estrelasEm(SITE, SITE_L + 0.6, SITE_A, tc, forca);
  }
  // o Caio pintando o site da praça com o pincel (a ponta passeia pelo canto direito do site)
  function caioPintando(tc, olhar) {
    menino.colocar(CAIO_P, olhar || [0.6, 1.9, -0.6]);
    menino.apontar(0.55 + 0.12 * Math.sin(tc * 5));
    menino.humor('feliz');
    const alvo = [0.95 + 0.18 * Math.sin(tc * 4.2), 1.75 + 0.22 * Math.sin(tc * 6.1), SITE[2] + 0.06];
    pincelNa(menino.mao(1), alvo);
    return alvo;
  }
  // a moita de feno rolando pela frente da praça (x0 = onde começa, vel em m/s)
  function fenoRolando(tc, t0, x0 = -7, vel = 3.4, z = 2.7) {
    ve(feno);
    const x = x0 + (tc - t0) * vel;
    feno.position.set(x, 0.14 + 0.4 + Math.abs(Math.sin((tc - t0) * 3.2)) * 0.28, z);
    feno.rotation.set(0.3, 0, -x / 0.42);
    return [x, 0.6, z];
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a praça vazia de tarde; o site gigante brilhando no meio, com estrelinhas; o Caio pintando o canto dele com o pincel; a moita de feno rolando na frente · MOSTRA: site, personagem, feno
      // CENÁRIO: a cidade de tarde, o calçadão sem ninguém, carros lá atrás (o cenário cuida)
      const tBo = quando('bonito', B, 0.25), tFa = quando('falta', B, 0.6), tPe = quando('pedir', B, 0.85);
      // PERSONAGEM: pinta caprichando · em "pedir": para, olha em volta (ninguém)
      siteBrilhando(tc);
      if (tc < tPe) caioPintando(tc);
      else { menino.colocar(CAIO_P, [3, 1.5, 6]); menino.reagir('duvida', tc - tPe); pincelNa(menino.mao(1), mais(menino.mao(1), [0.1, 1.2, 0.2]), 0.9); }
      // OBJETOS SE MEXENDO: o feno rola da esquerda pra direita, quicando
      const fp = fenoRolando(tc, B.inicio, -6.2, 3.2);
      // EFEITOS VISUAIS: estrelinhas no site · "0 pedidos" em "pedir"
      fx.et.ninguem.em({ tela: [540, 640] }, tc - tPe);
      // SONS: o brilho do site · whoosh do vento a cada corte · a pincelada · o feno quicando
      K.som('brilho', B.inicio + 0.02, 0.7); K.som('estalo', B.inicio + 0.75, 0.35); K.som('ding', tBo, 0.35);
      for (let k = 0; k < 4; k++) K.som('whoosh', B.inicio + 0.05 + k * 0.7, 0.35);
      for (let k = 0; k < 4; k++) K.som('passo', B.inicio + 1.5 + k * 0.33, 0.25);
      K.som('range', tFa, 0.35);
      // CÂMERA: 4 cortes (o site gigante de baixo, o Caio pintando, o feno passando rente ao chão, a praça inteira com o topo livre)
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = B.inicio + 2.15;
      if (tc < c1) { const k = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.6, 0.9, K.lerp(5.6, 5.0, k)], [0, 3.0, SITE[2]]); }
      else if (tc < c2) { const k = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(-0.2, 0.1, k), 1.65, 3.4], [1.35, 1.55, 0.1]); }
      else if (tc < c3) { const k = K.suave(pc(tc, c2, c3)); K.mirar([fp[0] - 0.4, 0.55, 6.0], [fp[0] + K.lerp(0.4, 0.8, k), 1.2, 0]); }
      else { const k = K.suave(pc(tc, c3, B.ate)); K.mirar([1.0, 2.0, K.lerp(10.2, 10.8, k)], [0.6, 2.6, -0.6]); }
    },
    retoca(B, tc) {
      // NA TELA: o quarto; o Caio sentado com um pincel pequeno retocando o site no monitor; a lupa no pixel; o contador "Dia 1 → Dia 90" · MOSTRA: personagem, monitor, pincel
      const tDe = quando('designer', B, 0.2), tMe = quando('meses', B, 0.45), tRe = quando('retocando', B, 0.55), tPx = quando('pixel', B, 0.8);
      ve(comp);
      // PERSONAGEM: sentado, debruçado no monitor, pintando · em "pixel": aproxima o rosto da tela
      sentado(MONITOR);
      menino.apontar(0.3 + 0.08 * Math.sin(tc * 7));
      menino.humor(tc > tMe ? 'triste' : 'feliz');
      const alvo = [MONITOR[0] + 0.12 + 0.08 * Math.sin(tc * 6), MONITOR[1] + 0.05 * Math.sin(tc * 9), MONITOR[2] + 0.07];
      pincelNa(menino.mao(1), alvo, 0.5);
      // OBJETOS SE MEXENDO: o monitor com o site; a lupa entra em "retocando" e o pixel vermelho vira verde em "pixel"
      const z = tc > tRe, px = tc > tPx + 0.2;
      comp.tela.desenhar((c, w, h) => siteLindo(c, w, h, { zoom: z, pixel: px }), 's' + z + px);
      // EFEITOS VISUAIS: "Web designer" em "designer" · o contador Dia 1 → 90 em "meses" · "Pixel por pixel" em "pixel"
      if (tc < tMe) fx.et.web.em({ tela: [540, 400] }, tc - tDe);
      else fx.dias.em(cabecaDe(menino, 0.55), tc - tMe, { de: 1, ate: 90, dur: 1.2, antes: 'Dia ', depois: '', cor: '#e8352b', tam: 0.8 });
      if (tc > tPx) fx.et.pixel.em({ tela: [540, 400] }, tc - tPx);
      // SONS: pinceladas (estalo) · cliques no pixel · o ding do pixel certo
      for (let k = 0; k < 6; k++) K.som('estalo', B.inicio + 0.15 + k * 0.32, 0.18);
      for (let k = 0; k < 6; k++) K.som('clique', tPx + k * 0.1, 0.25);
      K.som('ding', tPx + 0.2, 0.4);
      // CÂMERA: (1) até "meses": chegando · perto · frente-direita · olho · (2) passando · perto · esquerda, no monitor com a lupa
      const cv = tMe - 0.05;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 22, altura: 'olho', tam: 1.3 });
      else K.filmar([cabecaDe(menino, 0.5), MONITOR, mais(MONITOR, [0, 0.4, 0])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.5 });
    },
    duas(B, tc) {
      // NA TELA: o estúdio branco; duas placas: "FAZER SITE" ✓ e "ACHAR CLIENTE" ? que vira ✗; o Caio no meio segurando o diploma do curso · MOSTRA: profissoes, personagem, diploma
      const tFz = quando('fazer', B, 0.12), tAc = quando('achar', B, 0.25), tPr = quando('profissões', B, 0.42), tCu = quando('curso', B, 0.6), tPm = quando('primeira', B, 0.88);
      ve(placas);
      placaA.desenhar((c, w, h) => desenhaPlaca(c, w, h, 'FAZER SITE', '✓'), 'A');
      placaB.desenhar((c, w, h) => desenhaPlaca(c, w, h, 'ACHAR CLIENTE', tc > tPm ? '✗' : '?'), 'B' + (tc > tPm));
      // ENTRA AGORA: a placa A em "fazer", a placa B em "achar" (crescendo); o diploma em "curso"
      placaA.m.scale.setScalar(pop(tc - tFz + 0.1)); placaB.m.scale.setScalar(pop(tc - tAc + 0.1));
      // PERSONAGEM: aponta a placa A, depois a B coçando a cabeça · em "curso": mostra o diploma · em "primeira": ombros
      menino.colocar(CAIO_E, tc < tAc ? [-1.1, 1.6, 3.2] : tc < tCu ? [1.1, 1.6, 3.2] : [0, 1.5, 8]);
      if (tc < tAc) menino.apontar(0.7);
      else if (tc < tCu) menino.reagir('duvida', tc - tAc);
      else if (tc < tPm) menino.reagir('mostrando', tc - tCu);
      else menino.reagir('triste', tc - tPm);
      if (tc > tCu) {
        ve(diploma);
        const m = menino.mao(1);
        diploma.position.set(m[0] + 0.05, m[1] + 0.3, m[2] + 0.25);
        diploma.scale.setScalar(pop(tc - tCu));
      }
      // EFEITOS VISUAIS: "Duas profissões" em "profissões" · ✗ em "primeira"
      fx.et.duas.em({ tela: [540, 400] }, tc - tPr);
      if (tc > tPm) fx.simb.em(mais(PLACA_B, [0.75, 0.75, 0.2]), tc - tPm, { tipo: '✗', tam: 0.6 });
      // SONS: certo na placa A · a placa B entra com whoosh · o papel do diploma · errado em "primeira"
      K.som('certo', tFz + 0.1, 0.5); K.som('whoosh', tAc, 0.45); K.som('bip', tAc + 0.2, 0.3); K.som('tampa', tCu, 0.4); K.som('errado', tPm, 0.6);
      // CÂMERA: (1) até "achar": a placa A com ele · (2) rajada: a placa B · (3) em "curso": perto, o diploma e o rosto
      const c2 = tAc - 0.05, c3 = tCu - 0.1;
      if (tc < c2) K.mirar([-0.45, 1.9, K.lerp(7.2, 6.7, pc(tc, B.inicio, c2))], [-0.5, 1.75, 0]);
      else if (tc < c3) K.mirar([K.lerp(0.5, 0.7, pc(tc, c2, c3)), 1.9, 6.7], [0.55, 1.75, 0]);
      else K.mirar([0.35, 1.5, K.lerp(4.5, 4.1, pc(tc, c3, B.ate))], [0.1, 1.3, 0.7]);
    },
    clinica(B, tc) {
      // NA TELA: a clínica de fisioterapia; a fisioterapeuta perto da maca com o balão "Alguém faz meu site?"; o rival de moletom vermelho entra, aperto de mão e o contrato FECHADO · MOSTRA: fisio, rival, contrato
      const tCl = quando('clínica', B, 0.08), tSe = quando('sem', B, 0.3), tOu = quando('Outro', B, 0.45), tBa = quando('bateu', B, 0.68), tFe = quando('fechou', B, 0.9);
      // PERSONAGEM: a fisio arruma a maca e suspira (sem site) · o rival entra correndo e aperta a mão dela · em "fechou": ela comemora
      if (tc < tBa) {
        fisio.colocar(FISIO, tc < tSe ? [1.5, 1.4, 6] : [0.6, 1.4, 6]);
        if (tc < tSe) fisio.reagir('pensando', tc - B.inicio); else fisio.reagir('triste', tc - tSe);
        fx.fala.em(cabecaDe(fisio, 0.55), tc - tCl, { texto: 'Alguém faz meu site?', lado: 1 });
      }
      if (tc > tOu - 0.1) {
        const k = pc(tc, tOu - 0.1, tBa);
        if (k < 1) {
          rival.irPara(RIV_A, RIV_B, k, tc, { reto: true });
          fx.vel.em(mais(rival.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: rival.g.rotation.y });
        } else {
          rival.colocar(RIV_B, cabecaDe(fisio, -1.3)); rival.apontar(0.35); rival.humor('feliz');
          fisio.colocar(FISIO, cabecaDe(rival, -1.3)); fisio.humor('feliz');
          if (tc > tFe + 0.3) fisio.reagir('vitoria', tc - tFe - 0.3);
        }
      } else rival.g.visible = false;
      // INTERAÇÃO: o contrato aparece entre os dois e o carimbo FECHADO bate em "fechou"
      if (tc > tFe - 0.35) {
        ve(contrato);
        contrato.position.set((RIV_B[0] + FISIO[0]) / 2 + 0.2, 1.95, (RIV_B[2] + FISIO[2]) / 2 + 0.45);
        contrato.scale.setScalar(pop(tc - tFe + 0.35));
        carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
      }
      // EFEITOS VISUAIS: "Sem site" em "sem" · "Outro web designer" em "Outro"
      if (tc < tOu) fx.et.semSite.em({ tela: [540, 1560] }, tc - tSe); else fx.et.outro.em({ tela: [540, 1560] }, tc - tOu);
      // SONS: o balão · o errado do sem site · passos do rival · toc-toc em "bateu" · o carimbo · o congela é do jogo
      K.som('bip', tCl, 0.3); K.som('errado', tSe, 0.45); K.som('whoosh', tOu, 0.45);
      for (let k = 0; k < 3; k++) K.som('passo', tOu + 0.15 + k * 0.22, 0.3);
      K.som('madeira', tBa, 0.6); K.som('madeira', tBa + 0.18, 0.6); K.som('baque', tFe, 0.6);
      // CÂMERA: (1) chegando na fisio com a maca · (2) o rosto dela em "sem" · (3) o rival entrando · (4) o aperto de mão e o contrato
      if (tc < tSe) { const k = K.suave(pc(tc, B.inicio, tSe)); K.mirar([0.6, 1.65, K.lerp(4.4, 3.9, k)], [-1.4, 1.45, -1.4]); }
      else if (tc < tOu) K.mirar([-0.1, 1.65, K.lerp(2.3, 2.0, pc(tc, tSe, tOu))], [-1.3, 1.5, -1.3]);
      else if (tc < tBa) { const k = K.suave(pc(tc, tOu, tBa)); K.mirar([K.lerp(1.6, 1.3, k), 1.7, 5.6], [K.lerp(0.9, -0.2, k), 1.2, -0.6]); }
      else { const k = K.suave(pc(tc, tBa, B.ate)); K.mirar([K.lerp(1.9, 1.6, k), 1.7, 3.5], [-0.55, 1.4, -1.0]); }
    },
    virada(B, tc) {
      // NA TELA: a praça; o pincel cai no chão; o Caio pega o mapa de papel com os pinos e vira pra câmera, decidido · MOSTRA: personagem, mapa, pincel
      const tLa = quando('larga', B, 0.15), tMa = quando('mapa', B, 0.42), tIn = quando('investir', B, 0.68), tPr = quando('profissão', B, 0.92);
      siteBrilhando(tc, 0.6);
      // OBJETOS SE MEXENDO: o pincel na mão até "larga"; depois gira e cai deitado no chão
      if (tc < tLa) caioPintando(tc);
      else {
        menino.colocar(CAIO_P, tc < tMa ? [3.4, 1.2, 3.4] : [2.2, 1.45, 6]);
        menino.humor(tc > tMa ? 'feliz' : 'normal');
        ve(pincel);
        const k = K.clamp((tc - tLa) / 0.45), de = menino.mao(1);
        pincel.scale.setScalar(1.05);
        pincel.position.set(K.lerp(de[0], CAIO_P[0] - 0.2, k), K.lerp(de[1], 0.2, k * k), K.lerp(de[2], CAIO_P[2] + 0.55, k));
        pincel.rotation.set(-PI / 2 * (1 - k) + 0.02, 0.8 + k * 0.9, 0);
        if (tc < tMa) menino.reagir('pensando', tc - tLa);
        else if (tc < tIn) menino.reagir('segurando', tc - tMa);
        else menino.reagir('segurando', tc - tIn);
      }
      // ENTRA AGORA: o mapa de papel em "mapa", na frente do peito
      if (tc > tMa) {
        ve(mapaG);
        const a = menino.mao(0), b = menino.mao(1);
        mapaG.position.set((a[0] + b[0]) / 2, Math.min(1.05, (a[1] + b[1]) / 2), (a[2] + b[2]) / 2 + 0.3);
        mapaG.scale.setScalar(pop(tc - tMa));
      }
      // EFEITOS VISUAIS: o poof do mapa · "Investir" em "investir" · o ✓ em "profissão"
      fx.poof.em(mais(CAIO_P, [0.4, 1.4, 0.5]), tc - tMa, { escala: 0.3 });
      fx.et.investir.em({ tela: [540, 400] }, tc - tIn);
      if (tc > tPr) fx.simb.em(mais(CAIO_P, [0.7, 2.4, 0.3]), tc - tPr, { tipo: '✓', tam: 0.6 });
      // SONS: o pincel batendo no chão · o papel do mapa · o brilho do investir · certo
      K.som('madeira', tLa + 0.45, 0.6); K.som('whoosh', tLa, 0.35); K.som('tampa', tMa, 0.45); K.som('brilho', tIn, 0.5); K.som('certo', tPr, 0.5);
      // CÂMERA: (1) até "mapa": baixo, a mão e o pincel caindo · (2) rajada em "mapa": de frente, médio · (3) em "investir": de baixo pra cima, com o site atrás
      if (tc < tMa - 0.05) K.mirar([3.4, 1.0, K.lerp(3.1, 2.8, pc(tc, B.inicio, tMa))], [1.75, 0.8, 0.6]);
      else if (tc < tIn) K.mirar([2.3, 1.6, K.lerp(4.4, 4.0, pc(tc, tMa, tIn))], [1.7, 1.45, 0.4]);
      else K.mirar([2.6, 1.25, K.lerp(4.5, 4.1, pc(tc, tIn, B.ate))], [1.65, 1.6, 0.2]);
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do computador; a lista das clínicas de fisioterapia de Pelotas sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digita', B, 0.02), tL = quando('lista', B, 0.4), tAc = quando('clínicas', B, 0.5), tPe = quando('Pelotas', B, 0.75);
      ve(comp, navG, mapaG);
      mapaG.position.set(0.15, 0.82, -1.1); mapaG.rotation.set(-PI / 2 + 0.2, 0, 0.3); mapaG.scale.setScalar(0.9);
      comp.tela.desenhar((c, w, h) => siteLindo(c, w, h, {}), 'site');
      // ENTRA AGORA: a barra em "Digita", as letras logo depois; a lista sobe em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi - 0.1) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + 0.1 + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tAc ? 1 + Math.floor((tc - tAc) / 0.22) : 0;
        telaC.mostrar('listaFisio', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tAc + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo digitando · em "lista": levanta e aponta a Movimento Fisio
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.pelotas.em({ tela: [540, 400] }, tc - tPe);
      // CÂMERA: (1) até a lista: chegando · perto · no endereço e nas mãos · (2) afastando · médio · frente · olho
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Movimento Fisio; o robô à esquerda; o Caio à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseFisio', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "serviço": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) até "acha": chegando · médio · frente · baixo · (2) passando · médio · esquerda · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a praça, ele pintando o site sozinho e o feno passando; (2) Agora: na clínica Movimento Fisio, ele mostra a análise pra dona, que faz joia, ✓ "Achou quem pede!" · MOSTRA: personagem, cliente, tela
      const tA = quando('Agora', B, 0.45), tAc = quando('achar', B, 0.7), tPe = quando('pede', B, 0.9);
      if (tc < tA) {
        siteBrilhando(tc, 0.7); caioPintando(tc);
        const fp = fenoRolando(tc, B.inicio, -3.5, 3.0, 2.4); void fp;
        fx.et.soSite.em({ tela: [540, 400] }, tc - B.inicio - 0.2);
        K.som('whoosh', B.inicio + 0.2, 0.4); K.som('estalo', B.inicio + 0.6, 0.3);
        // CÂMERA: (1) afastando, a praça vazia
        const k = K.suave(pc(tc, B.inicio, tA));
        K.mirar([1.2, 1.9, K.lerp(7.0, 8.6, k)], [0.8, 2.0, -0.4]);
      } else {
        // Agora: entra na clínica com a análise na mão; a dona olha, faz sim e comemora em "pede"
        const kc = pc(tc, tA, tAc);
        if (kc < 1) menino.irPara([2.6, 0, 3.2], [0.35, 0, -0.35], kc, tc, { reto: true });
        else { menino.colocar([0.35, 0, -0.35], cabecaDe(dona, -1.3)); menino.reagir('mostrando', tc - tAc); }
        dona.colocar(FISIO, tc < tAc ? [1.0, 1.4, 3] : cabecaDe(menino, -1.3));
        if (tc > tPe) dona.reagir('vitoria', tc - tPe); else dona.humor(tc > tAc ? 'feliz' : 'normal');
        ve(telaM);
        const m = menino.mao(1); void m; telaM.g.position.set(0.8, 2.1, -0.05); telaM.g.rotation.set(0, -0.3, 0); telaM.g.scale.setScalar(0.34 * pop(tc - tA - 0.1));
        telaM.mostrar('analiseFisio', { ate: 2, score: 1 });
        if (tc > tPe) fx.simb.em(mais(FISIO, [0.5, 2.3, 0.5]), tc - tPe, { tipo: '✓', tam: 0.7 });
        fx.et.achou.em({ tela: [540, 400] }, tc - tPe);
        K.som('passo', tA + 0.2, 0.3); K.som('passo', tA + 0.45, 0.3); K.som('ding', tAc, 0.45); K.som('certo', tPe, 0.6);
        // CÂMERA: (2) chegando · médio · frente-direita · olho
        const k3 = K.suave(pc(tc, tA, B.ate));
        K.mirar([K.lerp(1.6, 1.2, k3), 1.75, K.lerp(5.6, 5.1, k3)], [-0.4, 1.3, -0.7]);
      }
    },
    segue(B, tc) {
      // NA TELA: o Caio de pé no quarto; o cartão de seguir entra em "Segue" e vira "Seguindo"; a barra com mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp); comp.tela.desenhar((c, w, h) => siteLindo(c, w, h, {}), 'site');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (aponta pra quem assiste) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar((c, w, h) => siteLindo(c, w, h, {}), 'site');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende "Ninguém pediu?": o Caio na frente, de pincel na mão e cara de dúvida, o site gigante brilhando atrás e o feno
      siteBrilhando(0.5, 1);
      menino.colocar([1.5, 0.14, 1.6], [2.2, 1.5, 9]);
      menino.reagir('duvida', 1); menino.humor('triste');
      pincelNa(menino.mao(1), mais(menino.mao(1), [0.15, 1.15, 0.1]), 0.9);
      fenoRolando(1, 0, -0.6, 0, 2.9);
      K.mirar([1.3, 1.95, 8.3], [0.75, 2.35, -0.2]);
    }
  };

  function encarar() {
    // folhas soltas viradas pra câmera (depois do plano, pra usar a câmera deste quadro)
    [contrato, mapaG, diploma].forEach((f) => { if (f.visible) f.lookAt(K.camera.position); });
    if (mapaG.visible && mapaG.parent && Math.abs(mapaG.position.y - 0.82) < 0.01) mapaG.rotation.set(-PI / 2 + 0.2, 0, 0.3);
    if (cad.visible) cad.rotation.y = menino.g.rotation.y;
  }

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, fisio, rival, dona].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    estrelas.forEach((s) => { s.visible = false; });
    menino.g.position.y = 0;
    pincel.rotation.set(0, 0, 0);
    mapaG.rotation.set(0, 0, 0); mapaG.scale.setScalar(1);
    placaA.m.scale.setScalar(1); placaB.m.scale.setScalar(1);
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    encarar();
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
