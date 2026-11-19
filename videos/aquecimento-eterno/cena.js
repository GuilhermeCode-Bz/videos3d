// O aquecimento eterno (canal Mappoa, feito na nuvem, 19/11/2026, molde de 45 s). O Pedro (o personagem do canal) está
// na largada de uma corrida no calçadão, se alongando há seis meses, com teia de aranha nos tênis, enquanto os outros já
// cruzam a faixa CLIENTES. A escola de música da esquina (sem site) não espera; outro web designer larga sem estar pronto
// e fecha. Ele arrebenta a teia, investe no Mappoa e, no Agora, larga na frente e chega primeiro.
// Três lugares (K.cenarios): a rua (rua_predios), o quarto do Pedro (home_office) e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, rival, dona, robo, comp, cad, navG, telaC, telaM, faixaG, fita, contrato, carimbo, FOV0;
  let teia, aranha, linha, cert, port, pilha, placa, violao;
  const tudo = [], fx = {}, corredores = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  // Rua: a largada em DZ + 10, a chegada (faixa CLIENTES) em DZ + 1, a escola de música em DZ - 7
  let DZ = -5;
  const LARG = () => DZ + 10, CHEG = () => DZ + 1, ESC = () => DZ - 7;
  const PED = () => [0.85, 0, LARG()];
  const OLHA = () => [0.6, 1.5, LARG() + 6];          // o Pedro alonga virado pra câmera (de costas pra corrida)
  const DONA = () => [1.15, 0, ESC() + 0.45], PLACA = () => [1.4, 0, ESC() - 0.3];

  const LUGAR = { gancho: 'rua', curso: 'rua', meses: 'rua', escola: 'rua', rival: 'rua', virada: 'rua', mappoa: 'mundo_mappoa', antes_agora: 'rua', segue: 'quarto', cartao: 'quarto', capa: 'rua' };
  function lugarDe(B, tc) {
    if (B.plano === 'virada') return tc < quando('computador', B, 0.33) - 0.05 ? 'rua' : 'quarto';
    return LUGAR[B.plano] || 'quarto';
  }

  const ESCOLAS = [
    { nome: 'Escola Sol Maior', end: 'Av. Getúlio Vargas, 1450', chips: ['whats', 'insta'] },
    { nome: 'Conservatório Oeste', end: 'Rua Marechal Deodoro, 312', chips: ['tel', 'insta'] },
    { nome: 'Studio Clave de Sol', end: 'Av. Fernando Machado, 88', chips: ['whats'] },
    { nome: 'Escola Harmonia', end: 'Rua Barão do Rio Branco, 540', chips: ['whats', 'tel'] }
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
  // peça que muda de lugar todo quadro (sem K.lugar, pra o kit não devolver ela pro lugar guardado)
  function solta(g, nome) { if (!g.parent) K.scene.add(g); if (nome) K.nomear(nome, g); g.visible = false; tudo.push(g); return g; }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }
  // um fio (cilindro fino) entre dois pontos
  function fioEntre(g, a, b, r, mat) {
    const va = V(...a), vb = V(...b), d = vb.clone().sub(va), L = d.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, L, 5), mat);
    m.position.copy(va).addScaledVector(d, 0.5);
    m.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
    g.add(m);
  }

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteEscola(c, w, h) {
    c.fillStyle = '#fbf7ff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#6b3fc4'; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Escola Sol Maior', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'aulas de violão, piano e canto', w * 0.06, h * 0.24, w * 0.042, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#e3d5ff', '#fde68a', '#c7f0ea'][i]); });
  }
  function mapaPinos(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    [0.3, 0.7].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * (x - 0.05), h); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Escolas de música sem site', w * 0.05, h * 0.066, w * 0.05, '#fff', 800, 'left', w * 0.9);
    [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]].slice(0, e.n || 0).forEach(([x, y]) => {
      const px = w * x, py = h * y, r = w * 0.045;
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
    });
  }
  // teia redonda (pros planos de frente e de lado nos pés)
  function desenhaTeia(c, w, h) {
    c.clearRect(0, 0, w, h);
    c.strokeStyle = 'rgba(255,255,255,0.95)'; c.lineCap = 'round';
    const cx = w / 2, cy = h * 0.55, R = w * 0.5, raios = 12;
    c.lineWidth = 4;
    for (let i = 0; i < raios; i++) { const a = (i / raios) * PI * 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); c.stroke(); }
    c.lineWidth = 3;
    for (let k = 1; k <= 6; k++) {
      const r0 = (k / 6.3) * R; c.beginPath();
      for (let i = 0; i <= raios; i++) { const a = (i / raios) * PI * 2, r = r0 * (0.92 + ((i * 37 + k * 11) % 10) / 80); const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; if (i === 0) c.moveTo(x, y); else c.lineTo(x, y); }
      c.stroke();
    }
  }

  // ---------- A teia nos tênis (fios 3D, aparecem de qualquer lado) ----------
  function fazTeia() {
    const g = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xf4f4f4, transparent: true, opacity: 0.92 });
    [-0.09, 0.09].forEach((fxp, j) => {
      const topo = [fxp, 0.13, 0.03], canela = [fxp, 0.34, 0.0];
      const n = 9, pts = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * PI * 2 + j * 0.35;
        const ch = [fxp + Math.cos(a) * 0.36, 0.008, 0.03 + Math.sin(a) * 0.36];
        pts.push(ch);
        fioEntre(g, topo, ch, 0.0055, mat);
        if (i % 2 === 0) fioEntre(g, canela, [fxp + Math.cos(a) * 0.46, 0.008, 0.03 + Math.sin(a) * 0.46], 0.0045, mat);
      }
      [0.3, 0.55, 0.8].forEach((u) => {
        for (let i = 0; i < n; i++) {
          const a = pts[i], b = pts[(i + 1) % n];
          const pa = [K.lerp(topo[0], a[0], u), K.lerp(topo[1], a[1], u), K.lerp(topo[2], a[2], u)];
          const pb = [K.lerp(topo[0], b[0], u), K.lerp(topo[1], b[1], u), K.lerp(topo[2], b[2], u)];
          fioEntre(g, pa, pb, 0.004, mat);
        }
      });
    });
    // fios de um tênis pro outro e subindo nas canelas
    fioEntre(g, [-0.09, 0.1, 0.07], [0.09, 0.1, 0.07], 0.005, mat);
    fioEntre(g, [-0.09, 0.24, 0.02], [0.09, 0.08, 0.08], 0.004, mat);
    fioEntre(g, [0.09, 0.26, 0.02], [-0.09, 0.07, 0.08], 0.004, mat);
    fioEntre(g, [-0.09, 0.38, -0.02], [0.09, 0.3, 0.0], 0.004, mat);
    // as teias redondas desenhadas: na frente dos tênis e dos lados
    const cv = document.createElement('canvas'); cv.width = cv.height = 512; desenhaTeia(cv.getContext('2d'), 512, 512);
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    const mt = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.42), mt); p1.position.set(0, 0.2, 0.13); g.add(p1);
    [-1, 1].forEach((l) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.36), mt); p.position.set(l * 0.2, 0.17, 0.02); p.rotation.y = PI / 2; g.add(p); });
    return g;
  }
  function fazAranha() {
    const a = new THREE.Group();
    const preto = K.mat(0x15161a, { roughness: 0.6 });
    a.add(K.malha(new THREE.SphereGeometry(0.045, 12, 10), preto));
    const cab = K.malha(new THREE.SphereGeometry(0.027, 10, 8), preto); cab.position.set(0, 0.01, 0.045); a.add(cab);
    for (let i = 0; i < 8; i++) { const l = i < 4 ? -1 : 1, j = i % 4; const p = K.malha(new THREE.BoxGeometry(0.12, 0.009, 0.009), preto); p.position.set(l * 0.06, -0.005, -0.03 + j * 0.022); p.rotation.set(0, l * (j - 1.5) * 0.3, -l * 0.45); a.add(p); }
    [-1, 1].forEach((l) => { const o = K.malha(new THREE.SphereGeometry(0.009, 6, 6), K.mat(0xffffff)); o.position.set(l * 0.012, 0.025, 0.066); a.add(o); });
    return a;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    const sal = (Cr.lojas || []).find((l) => l.id === 'salao');
    if (sal) DZ = sal.porta[2];
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    // esconde as árvores e bancos do trecho inteiro (largada, chegada e escola), pra câmera andar livre
    (Cr.grupo ? Cr.grupo.children : []).forEach((o) => { if (Math.abs(Math.abs(o.position.x) - 2.6) < 0.45 && o.position.z > DZ - 17 && o.position.z < DZ + 24) o.visible = false; });

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaEscolas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: ESCOLAS, n: e.n, sel: e.sel, total: 57, comSite: 36, semSite: 21 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Escolas de música · Chapecó, SC · 21 sem site', 36, 168, 20, M.marinho, 700, 'left', w - 72);
    };
    T.analiseEscola = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Escola Sol Maior', ate: e.ate, aderencia: 0.92 * k,
        dores: ['Sem site: matrícula só pelo WhatsApp', 'Não aparece pra quem procura aula de violão'], oportunidades: ['Site com as aulas, os horários e a matrícula'],
        objecoes: ['"Os alunos chegam por indicação"'], abordagem: 'Mostre quem procura aula de música em Chapecó e não acha a escola.'
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

    // Personagens: o Pedro (do canal), o rival, a dona da escola, os 3 corredores e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xf08a24, punho: 0xd9731a, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xc98d5e } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    dona = K.personagem('dona', { cores: { blazer: 0x7b4bd1, vestido: 0xffffff } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    [[0xe8352b, 0x2a2f3a, 0x3b2314, 0xd9a07a], [0x2fb54a, 0x1f2a44, 0x111111, 0xb87a52], [0xf5c518, 0x3a3f4a, 0x6b3b1e, 0xe6b48a]].forEach(([cam, ber, cab, pel]) => {
      const b = K.boneco({ roupa: 'camiseta', cores: { camiseta: cam, bermuda: ber, tenis: 0xffffff, cabelo: cab, pele: pel } }); K.semNome(b.g); corredores.push(b);
    });
    K.nomear('corredores', corredores[0].g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A teia e a aranha nos tênis (ficam na largada; o Pedro alonga sem tirar os pés do lugar)
    teia = solta(fazTeia(), 'teia');
    aranha = solta(fazAranha());
    linha = solta(folha(3.6, 0.6, 900, (c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, h * 0.62, w, h * 0.38);
      txt(c, 'LARGADA', w / 2, h * 0.3, h * 0.42, '#ffffff', 900, 'center');
    }), 'largada');
    linha.rotation.x = -PI / 2;

    // Os certificados e o portfólio (folhas que ele ergue) e a pilha de certificados no chão
    cert = solta(folha(0.72, 0.52, 500, (c, w, h) => {
      rr(c, 0, 0, w, h, 16, '#fffaf0'); c.strokeStyle = '#c9a227'; c.lineWidth = 10; c.strokeRect(14, 14, w - 28, h - 28);
      txt(c, 'CERTIFICADO', w / 2, h * 0.26, w * 0.1, '#7a5a10', 900, 'center');
      txt(c, 'Curso nº 14', w / 2, h * 0.5, w * 0.13, '#1e1f22', 900, 'center');
      txt(c, 'Web design avançado', w / 2, h * 0.7, w * 0.06, '#4a4f58', 700, 'center');
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.84, h * 0.8, h * 0.1, 0, 7); c.fill();
    }), 'certificado');
    port = solta(folha(0.72, 0.52, 500, (c, w, h) => {
      rr(c, 0, 0, w, h, 16, '#2f6fd6');
      txt(c, 'PORTFÓLIO', w / 2, h * 0.3, w * 0.13, '#ffffff', 900, 'center');
      txt(c, 'versão 12', w / 2, h * 0.55, w * 0.1, '#ffe27a', 900, 'center');
      [0, 1, 2].forEach((i) => rr(c, w * (0.1 + i * 0.28), h * 0.7, w * 0.24, h * 0.18, 8, ['#c7f0ea', '#fde68a', '#fecaca'][i]));
    }), 'portfolio');
    pilha = new THREE.Group();
    for (let i = 0; i < 14; i++) {
      const p = K.malha(new THREE.BoxGeometry(0.56, 0.035, 0.4), K.mat(i % 2 ? 0xfffaf0 : 0xf3e7c4, { roughness: 0.9 }));
      p.position.set(Math.sin(i * 2.1) * 0.03, 0.018 + i * 0.037, Math.cos(i * 1.7) * 0.03); p.rotation.y = Math.sin(i * 3.3) * 0.2; pilha.add(p);
      const fita2 = K.malha(new THREE.BoxGeometry(0.06, 0.037, 0.402), K.mat(0xc9a227)); fita2.position.copy(p.position); fita2.rotation.y = p.rotation.y; pilha.add(fita2);
    }
    solta(pilha, 'pilha');

    // A chegada: dois postes, a fita e a faixa CLIENTES
    faixaG = new THREE.Group();
    [-1, 1].forEach((l) => { const p = K.malha(new THREE.CylinderGeometry(0.07, 0.07, 3.0, 12), K.mat(0xffffff, { roughness: 0.5 })); p.position.set(0.25 + l * 1.75, 1.5, 0); faixaG.add(p); });
    const ban = folha(3.7, 0.7, 800, (c, w, h) => { rr(c, 0, 0, w, h, 20, '#2fb5a6'); txt(c, 'CLIENTES', w / 2, h / 2 + 4, h * 0.6, '#fff', 900, 'center'); });
    ban.position.set(0.25, 3.0, 0.02); faixaG.add(ban);
    const ban2 = ban.clone(); ban2.rotation.y = PI; ban2.position.z = -0.02; faixaG.add(ban2);
    fita = K.malha(new THREE.BoxGeometry(3.5, 0.08, 0.02), K.mat(0xd8343a, { roughness: 0.5 })); fita.position.set(0.25, 1.05, 0); faixaG.add(fita);
    guarda(faixaG, 'faixa', [0, 0, 0]);

    // A escola de música: a placa num poste no calçadão (de frente pra +z) e o violão encostado
    placa = new THREE.Group();
    const poste = K.malha(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 12), K.mat(0x3a3f4a)); poste.position.y = 1.6; placa.add(poste);
    const pl = folha(1.7, 0.85, 800, (c, w, h) => {
      rr(c, 0, 0, w, h, 26, '#6b3fc4');
      txt(c, '♪ ESCOLA DE MÚSICA', w / 2, h * 0.3, h * 0.17, '#ffe27a', 900, 'center', w * 0.92);
      txt(c, 'Sol Maior', w / 2, h * 0.62, h * 0.3, '#ffffff', 900, 'center', w * 0.92);
      txt(c, 'violão · piano · canto', w / 2, h * 0.86, h * 0.1, '#e3d5ff', 700, 'center');
    });
    pl.position.set(0, 2.8, 0.08); placa.add(pl);
    guarda(placa, 'placa', PLACA());
    violao = new THREE.Group();
    const madeira = K.mat(0xc8843a, { roughness: 0.5 }), escura = K.mat(0x5a3418, { roughness: 0.6 });
    const b1 = K.malha(new THREE.SphereGeometry(0.2, 20, 14), madeira); b1.scale.set(1, 1, 0.35); b1.position.y = 0.22; violao.add(b1);
    const b2 = K.malha(new THREE.SphereGeometry(0.15, 20, 14), madeira); b2.scale.set(1, 1, 0.35); b2.position.y = 0.48; violao.add(b2);
    const boca = K.malha(new THREE.CylinderGeometry(0.055, 0.055, 0.02, 18).rotateX(PI / 2), K.mat(0x1a0e06)); boca.position.set(0, 0.36, 0.07); violao.add(boca);
    const braco = K.malha(new THREE.BoxGeometry(0.06, 0.48, 0.035), escura); braco.position.y = 0.84; violao.add(braco);
    const cab = K.malha(new THREE.BoxGeometry(0.09, 0.14, 0.04), escura); cab.position.y = 1.12; violao.add(cab);
    violao.rotation.z = -0.2;
    guarda(violao, 'violao', mais(PLACA(), [0.32, 0, 0.12]));

    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site da Escola Sol Maior', w / 2, h * 0.22, w * 0.06, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    solta(contrato, 'contrato');

    // Quarto
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, [-1.6, 0, -0.75]);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46); fx.vel = K.velocidade(); fx.vel2 = K.velocidade();
    fx.fala = K.balaoFala(); K.nomear('balao', fx.fala.g);
    fx.cont = K.contador();
    fx.papel = K.folhasVento(77, 40, { papel: true });
    fx.festa = K.festa([0.25, 0, 0]);
    fx.festa2 = K.festa([1.0, 0, 0], 7);
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      seis: e('6 meses aquecendo', 'vermelho'), web: e('Web designer', 'azul'), curso: e('Mais um curso', 'vermelho'),
      meses: e('6 meses', 'vermelho'), semSite: e('Sem site', 'vermelho'), fechou: e('Fechou', 'verde'),
      investir: e('Decidiu investir', 'verde'), chapeco: e('21 sem site', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      aquecendo: e('Aquecendo', 'vermelho'), primeiro: e('Chegou primeiro', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); cad.rotation.y = PI; menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // alongamento: braços pra cima, o corpo balançando de um lado pro outro (lento < 1 = mais devagar)
  function alonga(b, t, lento = 1) {
    const s = Math.sin(t * 2.2 * lento);
    b.pose({ x: 0, z: 2.7 + 0.12 * s, c: 0.35 }, { x: 0, z: 2.7 - 0.12 * s, c: 0.35 });
    b.corpo.rotation.z = s * 0.12;
  }
  // o Pedro na largada (virado pra câmera) com a teia e a aranha nos pés (k = o tamanho da teia, de 0 a 1)
  function naLargada(k, tc) {
    menino.colocar(PED(), OLHA());
    const ry = menino.g.rotation.y;
    if (k > 0.01) {
      teia.visible = true; teia.position.set(...PED()); teia.rotation.set(0, ry, 0); teia.scale.set(K.lerp(0.5, 1, k), k, K.lerp(0.5, 1, k));
      aranha.visible = true;
      const ax = 0.09 + Math.sin(tc * 1.3) * 0.03, az = 0.06;
      aranha.position.set(PED()[0] + Math.cos(ry) * ax + Math.sin(ry) * az, 0.17, PED()[2] - Math.sin(ry) * ax + Math.cos(ry) * az);
      aranha.rotation.set(0, ry + Math.sin(tc * 2) * 0.4, 0);
    }
    linha.visible = true; linha.position.set(0.25, 0.012, LARG() - 0.35);
  }
  function chegada(rompida) {
    ve(faixaG); fita.visible = true; faixaG.position.set(0, 0, CHEG());
    if (rompida > 0) { fita.scale.x = Math.max(0.05, 1 - rompida); fita.rotation.z = rompida * 0.6; fita.position.y = 1.05 - rompida * 0.6; } else { fita.scale.x = 1; fita.rotation.z = 0; fita.position.y = 1.05; }
  }
  // um corredor na pista x, na posição z (correndo pra -z)
  function corre(b, x, z, tc, vel = 1) { b.irPara([x, 0, z + 1], [x, 0, z - 1], 0.5, tc, { correr: true, reto: true, vel }); }
  function escola(humor = 'normal') {
    ve(placa, violao);
    dona.colocar(DONA(), [0.0, 1.5, ESC() + 6]); dona.humor(humor);
  }
  // câmera da corrida no meio do calçadão: na frente de quem corre (olhando pra ele) ou na diagonal
  function camCorrida(b, modo, dist = 6.5) {
    const z = b.g.position.z, x = b.g.position.x;
    if (modo === 'frente') K.mirar([0.25, 1.7, z - dist], [x * 0.5 + 0.12, 1.1, z]);
    else K.mirar([1.9, 1.5, z - dist * 0.6], [x, 1.1, z]);
  }
  // vira pra câmera (já posta neste quadro) as folhas soltas
  function encarar(...o) { o.forEach((g) => { if (g.visible) g.lookAt(K.camera.position); }); }

  const P = {
    gancho(B, tc) {
      // NA TELA: o Pedro na largada virado pra câmera, alongando; a teia nos tênis; atrás, os corredores rompendo a fita da faixa CLIENTES · MOSTRA: personagem, teia, faixa
      const tCl = quando('cliente', B, 0.6), tMe = quando('meses', B, 0.92);
      naLargada(1, tc);
      // PERSONAGEM: alonga balançando, feliz · em "meses": boceja (cansado)
      if (tc > tMe) menino.reagir('cansado', tc - tMe); else { alonga(menino, tc); menino.humor('feliz'); }
      // OBJETOS SE MEXENDO: os 3 corredores já perto da chegada; o 1º rompe a fita
      const t0 = tc - B.inicio;
      const zs = [CHEG() + 2.2 - t0 * 2.2, CHEG() + 3.0 - t0 * 2.1, CHEG() + 3.8 - t0 * 2.0];
      [-0.7, -0.15, 0.45].forEach((x, i) => corre(corredores[i], x, Math.max(zs[i], CHEG() - 3.5 - i * 0.4), tc + i * 0.3));
      const rompe = K.clamp((CHEG() - zs[0]) / 0.6);
      chegada(rompe);
      const tRompe = B.inicio + 2.2 / 2.2;
      fx.festa.g.position.set(0.25, 0, CHEG() - 0.8); fx.festa.em(tc - tRompe);
      // CÂMERA: 4 cortes de ~0,8 s (aberto de frente · o tênis com a teia · a fita rompendo · o rosto, topo livre)
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = B.inicio + 2.4;
      if (tc < c1) K.mirar([0.55, 1.75, LARG() + 4.6], [0.4, 1.3, LARG() - 4]);
      else if (tc < c2) K.mirar([1.75, 0.5, LARG() + 3.9], [0.85, 0.8, LARG()]);
      else if (tc < c3) K.mirar([2.2, 1.2, CHEG() - 6.2], [0.0, 1.35, CHEG() + 0.6]);
      else K.mirar([0.65, 1.6, LARG() + 4.3], [0.8, 1.3, LARG()]);
      // EFEITOS VISUAIS: "6 meses aquecendo" no último corte
      fx.et.seis.em({ tela: [540, 600] }, tc - c3);
      // SONS: apito no 1º quadro · estrondo e whoosh no começo · whoosh em cada corte · passos · festa
      K.som('apito', B.inicio + 0.02, 0.45); K.som('estrondo', B.inicio + 0.12, 0.45); K.som('whoosh', B.inicio + 0.15, 0.5);
      K.som('whoosh', c1, 0.4); K.som('range', c1 + 0.1, 0.35); K.som('whoosh', c2, 0.4); K.som('whoosh', c3, 0.4);
      for (let i = 0; i < 8; i++) K.som('passo', B.inicio + 0.1 + i * 0.28, 0.22);
      void tCl;
    },
    curso(B, tc) {
      // NA TELA: o Pedro ergue o certificado "Curso nº 14", depois o "PORTFÓLIO v12"; a pilha de certificados cresce · MOSTRA: personagem, certificado, teia
      const tW = quando('designer', B, 0.2), tLa = quando('largar', B, 0.4), tCu = quando('curso', B, 0.62), tPo = quando('portfólio', B, 0.9);
      naLargada(1, tc);
      // pilha do lado dele: cresce em "curso" e em "portfólio"
      ve(pilha); pilha.position.set(1.75, 0, LARG() + 0.15); pilha.rotation.y = 0.3;
      const nP = 8 + (tc > tCu ? 1 : 0) + (tc > tPo ? 1 : 0);
      pilha.children.forEach((m, i) => { m.visible = Math.floor(i / 2) < nP; });
      // CÂMERA: (1) diagonal da esquerda, médio · (2) em "curso": da direita, mais perto, a folha e o rosto
      if (tc < tCu - 0.1) K.mirar([-0.7, 1.5, LARG() + 3.9], [1.05, 1.15, LARG()]);
      else K.mirar([2.3, 1.8, LARG() + 3.9], [1.0, 1.55, LARG()]);
      // PERSONAGEM: começo alongando · em "curso": ergue o certificado · em "portfólio": ergue o portfólio
      if (tc < tCu - 0.15) { alonga(menino, tc, 0.8); menino.humor('feliz'); }
      else { menino.reagir('erguendo', tc - tCu + 0.15); menino.humor('feliz'); }
      const folhaAgora = tc < tCu - 0.15 ? null : tc < tPo - 0.05 ? cert : port;
      if (folhaAgora) {
        ve(folhaAgora); const p = cabecaDe(menino, 0.55);
        folhaAgora.position.set(p[0], p[1], p[2] + 0.12); folhaAgora.scale.setScalar(pop(tc - (folhaAgora === cert ? tCu - 0.15 : tPo - 0.05)));
      }
      encarar(cert, port);
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Mais um curso" em "curso"
      if (tc < tCu - 0.1) fx.et.web.em({ tela: [540, 400] }, tc - tW); else fx.et.curso.em({ tela: [540, 400] }, tc - tCu);
      // SONS
      K.som('estalo', tLa, 0.4); K.som('brilho', tCu - 0.1, 0.5); K.som('ding', tCu, 0.45); K.som('baque', tCu + 0.2, 0.35);
      K.som('whoosh', tCu - 0.1, 0.4); K.som('brilho', tPo - 0.05, 0.45); K.som('baque', tPo + 0.15, 0.35); K.som('etiqueta', tW, 0.3);
    },
    meses(B, tc) {
      // NA TELA: o contador "Mês 1 → 6"; os papéis voando; a teia crescendo até a canela · MOSTRA: personagem, teia
      const tMe = quando('mês', B, 0.05), tTr = quando('três', B, 0.25), tSe = quando('seis', B, 0.45), tTe = quando('teia', B, 0.65), tTn = quando('tênis', B, 0.9);
      const kT = K.lerp(0.55, 1.15, K.suave(pc(tc, B.inicio, tTn)));
      naLargada(1, tc); teia.scale.set(Math.min(1.1, kT), kT, Math.min(1.1, kT));
      ve(pilha); pilha.position.set(1.75, 0, LARG() + 0.15); pilha.rotation.y = 0.3; pilha.children.forEach((m, i) => { m.visible = Math.floor(i / 2) < 10 + (tc > tTr ? 2 : 0) + (tc > tSe ? 2 : 0); });
      fx.papel.em([0.85, 0.5, LARG() + 1.0], tc, { largura: 6, forca: 0.8 });
      // PERSONAGEM: alongando mais devagar · em "seis": cansado · em "teia": olha pro pé (triste)
      if (tc < tSe) { alonga(menino, tc, 0.45); menino.humor('normal'); }
      else if (tc < tTe) menino.reagir('cansado', tc - tSe);
      else { menino.reagir('triste', tc - tTe); menino.cabeca.rotation.x = 0.45; }
      // EFEITOS VISUAIS: o contador · "6 meses" em "seis"
      fx.cont.em([0.85, 2.45, LARG()], tc - tMe, { de: 1, ate: 6, dur: Math.max(0.4, tSe - tMe), antes: 'Mês ', depois: '', cor: '#e8352b', tam: 0.8 });
      fx.et.meses.em({ tela: [540, 400] }, tc - tSe);
      // CÂMERA: rajada (de frente · do lado esquerdo · do alto · o tênis)
      if (tc < tTr) K.mirar([0.6, 1.6, LARG() + 5.2], [0.75, 1.3, LARG()]);
      else if (tc < tSe) K.mirar([-1.9, 1.3, LARG() + 2.9], [0.85, 1.0, LARG()]);
      else if (tc < tTe) K.mirar([2.3, 3.4, LARG() + 3.3], [0.85, 0.85, LARG()]);
      else K.mirar([1.75, 0.5, LARG() + 3.9], [0.85, 0.8, LARG()]);
      K.som('whoosh', tTr, 0.4); K.som('whoosh', tSe, 0.4); K.som('whoosh', tTe, 0.4); K.som('range', tTe + 0.1, 0.45); K.som('pingo', tTn, 0.35);
    },
    escola(B, tc) {
      // NA TELA: a placa "Escola de Música Sol Maior" no poste, o violão; a dona com o balão "Alguém faz meu site?" · MOSTRA: dona, placa
      const tEs = quando('escola', B, 0.12), tSi = quando('site', B, 0.45), tEp = quando('espera', B, 0.75), tNi = quando('ninguém', B, 0.9);
      escola(tc > tEp ? 'bravo' : 'normal');
      // PERSONAGEM: a dona · começo chamando pra rua · em "site": mostrando · em "espera": olha o relógio
      if (tc > tEp) dona.reagir('olha_relogio', tc - tEp);
      else if (tc > tSi) dona.reagir('mostrando', tc - tSi);
      else dona.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) aberto, a placa e a dona · (2) em "site": mais perto, a dona e o balão · (3) em "espera": baixo, de lado
      if (tc < tSi) K.mirar([-0.4, 1.9, ESC() + 7.0], [1.1, 1.75, ESC()]);
      else if (tc < tEp) K.mirar([0.2, 1.85, ESC() + 5.3], [0.85, 2.0, ESC() + 0.2]);
      else K.mirar([-0.2, 1.0, ESC() + 3.6], [1.15, 1.6, ESC() + 0.3]);
      // EFEITOS VISUAIS: o balão e "Sem site" em "site" · "!" em "ninguém"
      fx.fala.g.scale.setScalar(0.75);
      if (tc < tEp + 0.2) fx.fala.em(cabecaDe(dona, -0.15), tc - tSi + 0.1, { texto: 'Alguém faz meu site?', lado: -1 });
      fx.et.semSite.em({ tela: [540, 400] }, tc - tSi);
      if (tc > tNi) fx.simb.em(cabecaDe(dona, 0.45), tc - tNi, { tipo: '!', tam: 0.7 });
      K.som('estalo', tEs, 0.4); K.som('pingo', tSi, 0.45); K.som('whoosh', tSi - 0.05, 0.35); K.som('whoosh', tEp - 0.05, 0.35);
      for (let i = 0; i < 4; i++) K.som('clique', tEp + 0.15 + i * 0.18, 0.3);
      K.som('errado', tNi, 0.4);
    },
    rival(B, tc) {
      // NA TELA: o rival de moletom laranja larga, passa o Pedro alongando e chega na escola; aperta a mão da dona; contrato FECHADO · MOSTRA: rival, dona
      const tCh = quando('chegou', B, 0.08), tLa = quando('largou', B, 0.5), tPr = quando('pronto', B, 0.72), tFe = quando('fechou', B, 0.92);
      escola('normal');
      const tChega = tPr + 0.25;
      if (tc < tChega) {
        // corre da largada até a escola; o Pedro fica alongando lá atrás
        naLargada(1, tc); alonga(menino, tc, 0.6);
        const z = K.lerp(LARG() - 2.2, ESC() + 1.8, pc(tc, B.inicio, tChega));
        corre(rival, -0.3, z, tc, 1.2); rival.humor('feliz');
        fx.vel.em(mais(rival.g.position.toArray(), [0, 0.75, 0]), tc, { rumo: PI / 2, raio: 0.7, comp: 1.4 });
        dona.reagir('chamando', tc - B.inicio);
        // CÂMERA: (1) de frente pro rival, acompanhando · (2) em "largou": a diagonal
        if (tc < tLa) { camCorrida(rival, 'frente', 6.2); dona.g.visible = false; } else K.mirar([-1.5, 1.6, ESC() - 3.2], [rival.g.position.x + 0.6, 1.2, rival.g.position.z - 0.8]);
      } else {
        // na escola: o aperto de mão, o contrato FECHADO
        rival.colocar([0.3, 0, ESC() + 0.7], [1.0, 0, ESC() + 3.5]); dona.olharPara([0.0, 0, ESC() + 3.5]);
        if (tc > tFe) { rival.apontar(0.35); dona.reagir('comemorando', tc - tFe); } else { rival.reagir('mostrando', tc - tChega); dona.reagir('surpreso', tc - tChega); }
        rival.humor('feliz'); dona.humor('feliz');
        K.mirar([-0.9, 1.8, ESC() + 6.6], [0.75, 1.55, ESC() + 0.4]);
        if (tc > tFe - 0.2) {
          ve(contrato); contrato.position.set(0.05, 2.45, ESC() + 0.9); contrato.scale.setScalar(pop(tc - tFe + 0.2));
          carimbo.visible = tc > tFe + 0.1; carimbo.scale.setScalar(tc > tFe + 0.1 ? K.lerp(1.8, 1, K.suave(pc(tc, tFe + 0.1, tFe + 0.25))) : 0.001);
          encarar(contrato);
        }
        fx.simb2.em([0.65, 2.55, ESC() + 0.9], tc - tFe, { tipo: '✓', tam: 0.8 });
        fx.et.fechou.em({ tela: [540, 400] }, tc - tFe);
      }
      for (let i = 0; i < 8; i++) K.som('passo', B.inicio + 0.1 + i * 0.22, 0.25);
      K.som('whoosh', tCh, 0.45); K.som('whoosh', tLa, 0.4); K.som('whoosh', tChega, 0.4); K.som('festa', tFe, 0.45); K.som('baque', tFe + 0.12, 0.5); K.som('certo', tFe + 0.05, 0.5);
    },
    virada(B, tc) {
      // NA TELA: (rua) ele arrebenta a teia e ergue o punho; (quarto) digita mappoa.com e a lista das escolas de música de Chapecó sobe · MOSTRA: navegador, tela, personagem
      const tAr = quando('arrebenta', B, 0.08), tDe = quando('decide', B, 0.2), tCo = quando('computador', B, 0.33), tDi = quando('digita', B, 0.4);
      const tL = quando('lista', B, 0.6), tEs = quando('escolas', B, 0.7), tSi = quando('sem', B, 0.92);
      if (tc < tCo - 0.05) {
        // a rua: a teia rompe (os fios esticam e somem), poof pequeno do lado; ele ergue o punho
        const q = K.clamp((tc - tAr) / 0.35);
        naLargada(1, tc);
        if (tc > tAr) { teia.scale.set(1 + q * 0.4, 1 - q, 1 + q * 0.4); if (q >= 1) teia.visible = false; aranha.position.x += q * 0.6; aranha.position.y += Math.sin(q * PI) * 0.4; }
        fx.poof.em([PED()[0] + 0.45, 0.25, PED()[2] + 0.2], tc - tAr, { escala: 0.35 });
        if (tc < tDe) { menino.reagir('empurrando', tc - B.inicio); menino.pernasEm(Math.sin(tc * 14) * 0.5, -Math.sin(tc * 14) * 0.5); menino.humor('bravo'); }
        else { menino.reagir('vitoria', tc - tDe); menino.humor('feliz'); }
        fx.et.investir.em({ tela: [540, 400] }, tc - tDe);
        // CÂMERA: (1) o tênis, baixo · (2) em "decide": médio, de frente
        if (tc < tDe) K.mirar([0.15, 0.5, LARG() + 3.9], [0.85, 0.82, LARG()]);
        else K.mirar([0.6, 1.45, LARG() + 4.4], [0.8, 1.25, LARG()]);
      } else {
        // o quarto: digita mappoa.com, a lista sobe do monitor
        ve(comp, cad, navG);
        comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: tc > tL ? 6 : 0 }), 'm' + (tc > tL));
        K.entrar(navG.g, 'cresce', tc - tCo + 0.1, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
        navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
        if (tc > tL) {
          ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
          telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
          const n = tc > tEs ? 1 + Math.floor((tc - tEs) / 0.22) : 0;
          telaC.mostrar('listaEscolas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        }
        if (tc < tL) { menino.colocar(EM_PE, MONITOR); menino.reagir('digitando', tc); }
        else { menino.colocar(mais(EM_PE, [-0.15, 0, 0.35]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); menino.humor('feliz'); }
        // CÂMERA: (3) por cima do ombro no endereço · (4) em "lista": de frente, a lista e ele
        if (tc < tL) K.filmar([navG, MONITOR, menino, cabecaDe(menino, 0.2)], 'chegando', pc(tc, tCo, tL), { plano: 'perto', lado: 26, altura: 'olho', tam: 1.55 });
        else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
        fx.et.chapeco.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tSi + 0.1);
      }
      // SONS
      K.som('range', tAr, 0.5); K.som('estalo', tAr + 0.2, 0.5); K.som('whoosh', tDe, 0.45); K.som('etiqueta', tDe + 0.05, 0.3); K.som('whoosh', tCo - 0.05, 0.45);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      K.som('brilho', tL, 0.5); for (let k = 0; k < 4; k++) K.som('bip', tEs + k * 0.22, 0.25); K.som('festa', tSi, 0.35);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Escola Sol Maior cai do alto, nota 92; o robô acena; o Pedro do lado · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tPr = quando('precisa', B, 0.7), tAg = quando('agora', B, 0.93);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tAg - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseEscola', { ate: tc > tAg ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tAg, 0.5); K.som('brilho', tM, 0.6); K.som('baque', tS + 0.3, 0.4); K.som('whoosh', tMo, 0.35);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tAg ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tAg) menino.reagir('comemorando', tc - tAg); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (Antes) alongando com a teia; (Agora) correndo pelo calçadão e chegando na escola: a dona aperta a mão dele, confete · MOSTRA: personagem, dona
      const tAq = quando('aquecia', B, 0.2), tAg = quando('Agora', B, 0.45), tLa = quando('larga', B, 0.6), tPr = quando('primeiro', B, 0.92);
      escola('normal');
      const tChega = Math.max(tAg + 0.6, tPr - 0.45);
      if (tc < tAg) {
        naLargada(1, tc); alonga(menino, tc, 0.5); menino.humor('normal');
        dona.reagir('olha_relogio', tc - B.inicio);
        fx.et.aquecendo.em({ tela: [540, 400] }, tc - B.inicio - 0.15);
        K.mirar([1.4, 1.55, LARG() + 4.3], [0.8, 1.2, LARG()]);
      } else if (tc < tChega) {
        linha.visible = true; linha.position.set(0.25, 0.012, LARG() - 0.35);
        const z = K.lerp(LARG() - 0.5, ESC() + 1.6, pc(tc, tAg, tChega));
        corre(menino, 0.85, z, tc, 1.25); menino.humor('feliz');
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.75, 0]), tc, { rumo: PI / 2, raio: 0.7, comp: 1.4 });
        dona.reagir('chamando', tc - tAg);
        camCorrida(menino, 'frente', 6.3); if (K.camera.position.z < DONA()[2] + 0.5) dona.g.visible = false;
      } else {
        menino.colocar([0.3, 0, ESC() + 0.75], [1.0, 0, ESC() + 3.5]); dona.olharPara([0.0, 0, ESC() + 3.5]);
        if (tc > tPr) { menino.reagir('vitoria', tc - tPr); dona.reagir('aplaudindo', tc - tPr); } else { menino.reagir('mostrando', tc - tChega); dona.reagir('surpreso', tc - tChega); }
        menino.humor('feliz'); dona.humor('feliz');
        K.mirar([-0.9, 1.8, ESC() + 6.6], [0.75, 1.55, ESC() + 0.4]);
        fx.simb2.em([0.3, 2.65, ESC() + 0.9], tc - tPr, { tipo: '✓', tam: 0.8 });
        fx.festa2.g.position.set(0.9, 0, ESC() + 0.6); fx.festa2.em(tc - tPr);
        fx.et.primeiro.em({ tela: [540, 400] }, tc - tPr);
      }
      K.som('errado', B.inicio + 0.25, 0.35); K.som('whoosh', tAg, 0.5);
      for (let i = 0; i < 6; i++) K.som('passo', tAg + 0.15 + i * 0.2, 0.25);
      K.som('whoosh', tChega, 0.4); K.som('certo', tPr, 0.55); void tAq; void tLa;
    },
    segue(B, tc) {
      // NA TELA: o Pedro de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteEscola, 'escola');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9); K.som('whoosh', tPc - 0.3, 0.35);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      menino.humor('feliz');
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, cad, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteEscola, 'escola');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa: o Pedro na largada alongando, a teia nos tênis, a faixa CLIENTES e os corredores chegando lá atrás
      naLargada(1, 0.4); alonga(menino, 0.35); menino.humor('feliz');
      [-0.7, -0.15, 0.45].forEach((x, i) => corre(corredores[i], x, CHEG() + 0.6 + i * 0.9, 0.3 + i * 0.25));
      chegada(0);
      K.mirar([0.6, 1.5, LARG() + 3.9], [0.65, 1.3, LARG() - 2]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, rival, dona, ...corredores].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; b.corpo.rotation.set(0, 0, 0); b.cabeca.rotation.x = 0; b.parado(); });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    cad.position.set(-1.6, 0, -0.75); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
