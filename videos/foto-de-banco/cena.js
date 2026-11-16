// A foto que tá em mil sites (canal Mappoa).
// Seis lugares (K.cenarios): o corredor infinito de telas com a mesma moça (vazio_colorido roxo), o coworking de vidro
// do Enzo (de dia e de noite), o consultório da doutora Carla, a cafeteria do paciente e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let placaN, bl, CS, menino, pac, carla, robo, comp, cel, desp, cadeira, telaC, telaM, navG, siteP, marmita, corredor, celPeq, FOV0;
  const tudo = [], fx = {}, papeis = [], molduras = [], variantes = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Coworking (escritorio_vidro): o computador do Enzo na frente, virado pra +z; a cadeira na frente dele
  const COMP = [1.5, 0, 2.3], MONITOR = [1.5, 1.185, 2.18], SEAT = [1.5, 0, 2.98];
  const EM_PE = [2.65, 0, 3.15], TELA_Q = [1.0, 1.45, 3.2], NAV = [1.65, 2.95, 2.65], DESP = [1.92, 0.76, 2.4];
  const PAPEL = [[2.3, 2.6], [2.55, 3.05], [0.7, 2.75], [2.35, 3.5], [0.55, 3.25], [2.75, 2.45], [0.8, 3.7], [2.6, 3.75], [0.45, 2.4], [2.95, 3.3]];
  // Consultório: a tela grande do site na parede do fundo, a Carla do lado
  const SITEP = [-0.6, 2.3, -3.88], CARLA = [1.35, 0, -3.0], CEL_C = [0.3, 0, -2.55], CAM_C = [0.4, 1.6, 4.5];
  // Cafeteria: o paciente no corredor livre entre as mesas
  const PAC = [-0.9, 0, -0.6], CEL_F = [-1.85, 0, -0.3], CAM_F = [-0.9, 1.6, 4];
  // Corredor de telas: o paciente no meio
  const PAC_G = [0, 0, -1.0];

  const LUGAR = {
    gancho: 'corredor', enzo: 'cowork', site: 'consultorio', paciente: 'cafeteria', procura: 'cowork_noite', investe: 'cowork',
    lista: 'cowork', mappoa: 'mundo_mappoa', mensagem: 'cowork', antes_agora: 'cowork_noite', segue: 'cowork', cartao: 'cowork', capa: 'corredor'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'enzo') return tc < quando('nutri', B, 0.6) ? 'cowork' : 'consultorio';
    if (B.plano === 'mensagem') return tc < quando('Carla', B, 0.5) ? 'cowork' : 'consultorio';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'cowork_noite' : 'consultorio';
    return LUGAR[B.plano] || 'cowork';
  }

  const SITES = [
    { nome: 'Nutri Carla Souza', cor: '#2fb5a6' }, { nome: 'Vida Leve Nutrição', cor: '#e07a3a' }, { nome: 'NutriFloripa', cor: '#5b7be0' },
    { nome: 'Corpo em Dia', cor: '#d6336c' }, { nome: 'Nutri Bem-Estar', cor: '#3c9a4a' }, { nome: 'Dra. Ana Nutri', cor: '#8a4fd8' }
  ];
  const NUTRIS = [
    { nome: 'Nutri Carla Souza', end: 'Rua Bocaiúva, 2120 · Centro', chips: ['whats', 'site'], site: true },
    { nome: 'Vida Leve Nutrição', end: 'Av. Beira-Mar Norte, 4100', chips: ['tel', 'site'], site: true },
    { nome: 'Nutri Ana Ribeiro', end: 'Rua Lauro Linhares, 870', chips: ['whats', 'insta'], site: false },
    { nome: 'Espaço Nutrir', end: 'Rod. SC-401, 6200', chips: ['tel'], site: false }
  ];

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (!g.parent) K.scene.add(g);
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  const elipse = (c, x, y, rx, ry, f) => { c.fillStyle = f; c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, PI * 2); c.fill(); };

  // ---------- A moça da foto de banco (desenho): loira, sorriso enorme, segurando a salada ----------
  // e = { pisca: olhos fechados, tilt: cabeça inclinada (rad) }
  function moca(c, cx, cy, s, e = {}) {
    // blusa branca e pescoço
    rr(c, cx - s * 0.75, cy + s * 0.55, s * 1.5, s * 0.9, s * 0.4, '#ffffff');
    rr(c, cx - s * 0.12, cy + s * 0.32, s * 0.24, s * 0.35, s * 0.08, '#f2c09c');
    c.save(); c.translate(cx, cy); c.rotate(e.tilt || 0);
    elipse(c, 0, s * 0.02, s * 0.62, s * 0.7, '#f2c14e');           // cabelo atrás
    elipse(c, 0, 0, s * 0.42, s * 0.5, '#f6c9a6');                  // rosto
    c.fillStyle = '#f2c14e'; c.beginPath(); c.ellipse(-s * 0.1, -s * 0.36, s * 0.42, s * 0.2, -0.35, 0, PI * 2); c.fill();  // franja
    elipse(c, -s * 0.24, s * 0.16, s * 0.08, s * 0.05, '#f7a3a3'); elipse(c, s * 0.24, s * 0.16, s * 0.08, s * 0.05, '#f7a3a3');
    c.strokeStyle = '#3a2418'; c.lineWidth = s * 0.05; c.lineCap = 'round';
    [-1, 1].forEach((l) => {
      if (e.pisca) { c.beginPath(); c.arc(l * s * 0.16, -s * 0.02, s * 0.07, 0.15 * PI, 0.85 * PI); c.stroke(); }
      else { elipse(c, l * s * 0.16, -s * 0.03, s * 0.055, s * 0.07, '#3a2418'); elipse(c, l * s * 0.16 + s * 0.02, -s * 0.05, s * 0.018, s * 0.022, '#ffffff'); }
    });
    // o sorriso enorme, com os dentes
    c.fillStyle = '#b8323a'; c.beginPath(); c.moveTo(-s * 0.22, s * 0.17); c.quadraticCurveTo(0, s * 0.5, s * 0.22, s * 0.17); c.closePath(); c.fill();
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(-s * 0.2, s * 0.18); c.quadraticCurveTo(0, s * 0.27, s * 0.2, s * 0.18); c.closePath(); c.fill();
    c.restore();
    // a tigela de salada na frente
    c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(cx, cy + s * 0.8, s * 0.48, s * 0.28, 0, 0, PI); c.fill();
    ['#5cb848', '#3c9a3c', '#7fd36a', '#5cb848', '#3c9a3c'].forEach((cor, i) => elipse(c, cx - s * 0.32 + i * s * 0.16, cy + s * 0.76, s * 0.12, s * 0.08, cor));
    [-0.18, 0.1, 0.3].forEach((dx) => elipse(c, cx + dx * s, cy + s * 0.72, s * 0.055, s * 0.055, '#e8352b'));
    elipse(c, cx, cy + s * 0.8, s * 0.48, s * 0.04, '#e9edf2');
  }
  // A doutora Carla de verdade: morena, cabelo comprido, jaleco branco, sorriso calmo, prancheta
  function carlaFoto(c, cx, cy, s) {
    elipse(c, 0 + cx, cy + s * 0.15, s * 0.6, s * 0.85, '#2a1a10');
    rr(c, cx - s * 0.75, cy + s * 0.55, s * 1.5, s * 0.9, s * 0.4, '#ffffff');
    c.fillStyle = '#2fb5a6'; c.beginPath(); c.moveTo(cx - s * 0.18, cy + s * 0.56); c.lineTo(cx, cy + s * 0.9); c.lineTo(cx + s * 0.18, cy + s * 0.56); c.fill();
    rr(c, cx - s * 0.12, cy + s * 0.32, s * 0.24, s * 0.32, s * 0.08, '#b87d52');
    elipse(c, cx, cy, s * 0.4, s * 0.48, '#c98f62');
    c.fillStyle = '#2a1a10'; c.beginPath(); c.ellipse(cx + s * 0.08, cy - s * 0.36, s * 0.42, s * 0.18, 0.3, 0, PI * 2); c.fill();
    [-1, 1].forEach((l) => elipse(c, cx + l * s * 0.15, cy - s * 0.02, s * 0.05, s * 0.06, '#2a1a10'));
    c.strokeStyle = '#7a2a22'; c.lineWidth = s * 0.05; c.lineCap = 'round'; c.beginPath(); c.arc(cx, cy + s * 0.12, s * 0.14, 0.2 * PI, 0.8 * PI); c.stroke();
    rr(c, cx + s * 0.25, cy + s * 0.72, s * 0.4, s * 0.5, s * 0.05, '#c89a6a'); rr(c, cx + s * 0.29, cy + s * 0.78, s * 0.32, s * 0.4, s * 0.03, '#ffffff');
  }
  // O site de nutri (deitado): faixa com o nome, a frase, o botão e a foto à direita. e = { nome, cor, pisca, tilt, real, preto, circulo }
  function siteNutri(c, w, h, e = {}) {
    if (e.preto) { c.fillStyle = '#0b0f16'; c.fillRect(0, 0, w, h); return; }
    c.fillStyle = '#f7fbf8'; c.fillRect(0, 0, w, h);
    c.fillStyle = e.cor || '#2fb5a6'; c.fillRect(0, 0, w, h * 0.16);
    txt(c, e.nome || 'Nutri', w * 0.04, h * 0.085, h * 0.085, '#ffffff', 900, 'left', w * 0.6);
    ['Início', 'Sobre', 'Contato'].forEach((s, i) => txt(c, s, w * (0.68 + i * 0.12), h * 0.085, h * 0.036, '#ffffff', 700, 'center'));
    txt(c, e.real ? 'Nutrição com quem' : 'Sua melhor versão', w * 0.05, h * 0.36, h * 0.075, '#1b2a2a', 900, 'left', w * 0.45);
    txt(c, e.real ? 'te conhece' : 'começa aqui', w * 0.05, h * 0.47, h * 0.075, '#1b2a2a', 900, 'left', w * 0.45);
    txt(c, 'Consultas em Florianópolis', w * 0.05, h * 0.58, h * 0.042, '#6b7280', 700, 'left', w * 0.45);
    rr(c, w * 0.05, h * 0.68, w * 0.3, h * 0.12, h * 0.06, e.cor || '#2fb5a6'); txt(c, 'Agende sua consulta', w * 0.2, h * 0.74, h * 0.04, '#ffffff', 800, 'center', w * 0.28);
    rr(c, w * 0.53, h * 0.22, w * 0.43, h * 0.74, h * 0.05, e.real ? '#e3f4f1' : '#e9f7ee');
    c.save(); c.beginPath(); c.roundRect(w * 0.53, h * 0.22, w * 0.43, h * 0.74, h * 0.05); c.clip();
    if (e.real) carlaFoto(c, w * 0.745, h * 0.5, h * 0.3); else moca(c, w * 0.745, h * 0.48, h * 0.3, e);
    c.restore();
    if (e.circulo) { c.strokeStyle = '#e8352b'; c.lineWidth = h * 0.025; c.beginPath(); c.ellipse(w * 0.745, h * 0.55, w * 0.2, h * 0.38, 0, 0, PI * 2 * Math.min(1, e.circulo)); c.stroke(); }
  }
  // O mesmo site no celular (em pé)
  function celNutri(c, w, h, e = {}) {
    c.fillStyle = '#f7fbf8'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#e9edf2'; c.fillRect(0, 0, w, h * 0.075);
    rr(c, w * 0.05, h * 0.015, w * 0.9, h * 0.045, h * 0.022, '#ffffff');
    txt(c, (e.nome || 'nutri').toLowerCase().replace(/[ .-]/g, '').normalize('NFD').replace(/[̀-ͯ]/g, '') + '.com.br', w * 0.09, h * 0.038, h * 0.022, '#4b5563', 600, 'left', w * 0.82);
    c.fillStyle = e.cor || '#2fb5a6'; c.fillRect(0, h * 0.075, w, h * 0.09);
    txt(c, e.nome || 'Nutri', w / 2, h * 0.12, w * 0.075, '#ffffff', 900, 'center', w * 0.9);
    rr(c, w * 0.06, h * 0.19, w * 0.88, h * 0.42, w * 0.05, '#e9f7ee');
    c.save(); c.beginPath(); c.roundRect(w * 0.06, h * 0.19, w * 0.88, h * 0.42, w * 0.05); c.clip(); moca(c, w / 2, h * 0.36, w * 0.3, e); c.restore();
    txt(c, 'Sua melhor versão', w / 2, h * 0.67, w * 0.075, '#1b2a2a', 900, 'center', w * 0.9);
    txt(c, 'começa aqui', w / 2, h * 0.72, w * 0.075, '#1b2a2a', 900, 'center', w * 0.9);
    rr(c, w * 0.12, h * 0.79, w * 0.76, h * 0.07, h * 0.035, e.cor || '#2fb5a6'); txt(c, 'Agende sua consulta', w / 2, h * 0.825, w * 0.058, '#fff', 800, 'center', w * 0.7);
  }
  function celZap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Enzo · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, Carla! Vi o site da', 'Nutri Carla Souza: ele', 'parece um modelo pronto.', 'Faço sites com a cara de', 'cada nutri. Posso mostrar?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) {
      rr(c, w * 0.17, h * 0.56, w * 0.78, h * 0.17, 16, '#d9fdd3');
      txt(c, 'Quero um site com', w * 0.21, h * 0.61, w * 0.06, '#111b21', 700, 'left', w * 0.7);
      txt(c, 'fotos minhas! 🥗', w * 0.21, h * 0.67, w * 0.06, '#111b21', 700, 'left', w * 0.7);
    }
  }
  function portfolio(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Enzo Web', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites com a sua cara', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  function buscaGoogle(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.08, h * 0.08, w * 0.84, h * 0.14, h * 0.07, '#f1f3f4');
    txt(c, 'nutricionista florianópolis', w * 0.13, h * 0.15, h * 0.06, '#202124', 600, 'left', w * 0.75);
    for (let i = 0; i < 4; i++) { const y = h * (0.32 + i * 0.16); rr(c, w * 0.08, y, w * (0.5 + ((i + (e.n || 0)) % 3) * 0.1), h * 0.04, 4, '#1a0dab'); rr(c, w * 0.08, y + h * 0.06, w * 0.7, h * 0.03, 4, '#d0d4d9'); }
  }
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }

  // ---------- O corredor sem fim de telas (todas com a mesma moça) ----------
  function fazCorredor() {
    const g = new THREE.Group();
    SITES.forEach(() => variantes.push(K.telaCanvas(1.5, 1.0, 360)));
    const matM = K.mat(0x2a2440, { roughness: 0.5 }), geoM = new THREE.BoxGeometry(1.6, 1.1, 0.06);
    let k = 0;
    for (let i = 0; i < 16; i++) for (let row = 0; row < 2; row++) [-1, 1].forEach((s) => {
      const t = new THREE.Group();
      const mold = K.malha(geoM, matM); t.add(mold);
      const v = variantes[(i * 2 + row + (s > 0 ? 3 : 0)) % SITES.length];
      const tela = new THREE.Mesh(v.m.geometry, v.m.material); tela.position.z = 0.035; t.add(tela);
      t.position.set(s * 1.9, 1.05 + row * 1.2, 1.5 - i * 2.0); t.rotation.y = -s * 0.95;
      g.add(t); molduras.push({ mold, d: i, k: k++ });
    });
    // o pé de cada coluna, pra parecer uma parede de telas
    for (let i = 0; i < 16; i++) [-1, 1].forEach((s) => { const p = K.malha(new THREE.CylinderGeometry(0.04, 0.05, 0.5, 8), K.mat(0x3a3450)); p.position.set(s * 1.9, 0.25, 1.5 - i * 2.0); g.add(p); });
    return g;
  }
  function desenhaCorredor(e) {
    variantes.forEach((v, i) => v.desenhar((c, w, h) => siteNutri(c, w, h, Object.assign({}, SITES[i], e)), 'v' + JSON.stringify(e)));
  }

  // ---------- A marmita fit (o investimento) ----------
  function fazMarmita() {
    const g = new THREE.Group();
    const base = K.malha(new THREE.BoxGeometry(0.34, 0.08, 0.24), K.mat(0x1e1f22, { roughness: 0.5 })); base.position.y = 0.04; g.add(base);
    const arroz = K.malha(new THREE.BoxGeometry(0.15, 0.03, 0.2), K.mat(0xfaf7ee)); arroz.position.set(-0.08, 0.09, 0); g.add(arroz);
    const frango = K.malha(new THREE.BoxGeometry(0.12, 0.035, 0.09), K.mat(0xc98a48)); frango.position.set(0.09, 0.095, -0.05); g.add(frango);
    for (let i = 0; i < 4; i++) { const b = K.malha(new THREE.SphereGeometry(0.03, 10, 8), K.mat(0x3c9a3c)); b.position.set(0.06 + (i % 2) * 0.05, 0.1, 0.04 + Math.floor(i / 2) * 0.04); g.add(b); }
    const cen = K.malha(new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8), K.mat(0xf08a24)); cen.rotation.z = PI / 2; cen.position.set(0.1, 0.1, 0.08); g.add(cen);
    const tampa = K.malha(new THREE.BoxGeometry(0.35, 0.012, 0.25), new THREE.MeshStandardMaterial({ color: 0xe8f4ff, transparent: true, opacity: 0.35 }), false); tampa.position.set(0, 0.16, -0.12); tampa.rotation.x = -0.9; g.add(tampa);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['vazio_colorido', { cor: 'roxo' }, 'corredor'], ['escritorio_vidro', { texto: 'COWORKING' }, 'cowork'], ['escritorio_vidro', { hora: 'noite', texto: 'COWORKING' }, 'cowork_noite'], 'consultorio', 'cafeteria', 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.siteCarla = (c, w, h, e) => siteNutri(c, w, h, Object.assign({ nome: 'Nutri Carla Souza', cor: '#2fb5a6' }, e));
    T.listaNutris = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'NUTRICIONISTAS', itens: NUTRIS, n: e.n, sel: e.sel, total: 186, comSite: 119, semSite: 67 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Nutricionistas · Florianópolis, SC', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = NUTRIS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseCarla = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Nutri Carla Souza', aderencia: e.a, ate: e.ate,
      dores: ['Site com cara de modelo pronto', 'Presença digital fraca'], oportunidades: ['Site com fotos reais do consultório'],
      objecoes: ['"Já tenho site"'], abordagem: 'Comece pelo site dela: mostre que ele parece um modelo pronto.'
    });
    T.msgCarla = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Nutri Carla Souza', texto: 'Oi, Carla! Vi o site da Nutri Carla Souza: ele parece um modelo pronto. Faço sites com a cara de cada nutricionista. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Enzo (do canal), a doutora Carla, o paciente e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    carla = K.personagem('dona', { cores: { blazer: 0xffffff, vestido: 0x2fb5a6 } }); K.semNome(carla.g); K.nomear('dona', carla.g);
    pac = K.boneco({ roupa: 'moletom', cores: { moletom: 0xf08a24, punho: 0xc96a12, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xe0a97e } });
    K.semNome(pac.g); K.nomear('paciente', pac.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O corredor de telas e o celular pequeno na mão do paciente
    corredor = fazCorredor(); guarda(corredor, 'telas', [0, 0, 0]);
    celPeq = new THREE.Group();
    celPeq.add(K.malha(new THREE.BoxGeometry(0.08, 0.15, 0.014), K.mat(0x1e1f22)));
    const tp = K.telaCanvas(0.07, 0.13, 100); tp.m.position.z = 0.008; celPeq.add(tp.m);
    tp.desenhar((c, w, h) => { c.fillStyle = '#e9f7ee'; c.fillRect(0, 0, w, h); moca(c, w / 2, h * 0.4, w * 0.3); }, 'p');
    guarda(celPeq, 'celular_peq');

    // A tela grande do site da Carla na parede do consultório, e a placa
    siteP = K.painelMappoa(3.0, 1.9, { px: 900, borda: '#22262e' }); guarda(siteP, 'site', SITEP);
    const placa = placaN = K.placa('NUTRI CARLA SOUZA', { larg: 2.4, alt: 0.42, fundo: '#2fb5a6', cor: '#ffffff', borda: '#ffffff' });
    placa.position.set(SITEP[0], 3.65, -4.12); guarda(placa, 'placa_nutri');

    comp = K.computador({ corMesa: 0xe9dcc8 }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2fb5a6 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL_F);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    const gp = new THREE.Group();
    PAPEL.forEach(([x, z], i) => { const p = K.m3d('papel_amassado'); p.position.set(x, 0, z); p.rotation.y = i * 1.3; p.scale.setScalar(0.9 + (i % 3) * 0.15); gp.add(p); papeis.push(p); });
    guarda(gp, 'papeis', [0, 0, 0]);
    marmita = fazMarmita(); guarda(marmita, 'marmita', [0, 1, 0], 1.8);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    fx.poof = K.poof(61);
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      mesma: e('A mesma foto em mil sites', 'laranja'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'),
      perde: e('Perde paciente', 'vermelho'), naoE: e('Não é ela', 'vermelho'), mesmaMoca: e('A mesma moça!', 'laranja'),
      outra: e('Marcou com outra', 'vermelho'), umPor: e('Um por um...', 'vermelho'), invest: e('Investimento', 'verde'),
      precisa: e('Acha quem precisa de site', 'verde'), floripa: e('Florianópolis', 'azul'), dores: e('Dores de cada uma', 'verde'),
      cacando: e('Caçando cliente', 'vermelho'), real: e('Foto de verdade', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Confiava nessa foto? Comenta <em>CONFIAVA</em> ou <em>DESCONFIAVA</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  // O celular gigante virado pra uma câmera, com uma tela
  function celEm(pos, cam, desenho, chave) {
    ve(cel); cel.position.set(...pos);
    cel.rotation.set(0, Math.atan2(cam[0] - pos[0], cam[2] - pos[2]) * 0.6 + 0.3, 0);
    cel.userData.m3d.tela.desenhar(desenho, chave);
  }
  // As bolinhas de papel: n no chão, a última voando da mão
  function amontoa(n, tUlt, tc) {
    papeis.forEach((p, i) => {
      p.visible = i < n;
      const [x, z] = PAPEL[i]; p.position.set(x, 0, z);
      if (i === n - 1 && tUlt != null) {
        const q = K.clamp((tc - tUlt) / 0.35), m = menino.mao(1);
        p.position.set(K.lerp(m[0], x, q), K.lerp(m[1], 0, q) + Math.sin(q * PI) * 0.4, K.lerp(m[2], z, q));
      }
    });
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o corredor sem fim de telas com a mesma moça; o paciente no meio com o celular · MOSTRA: telas, paciente
      // CENÁRIO: vazio_colorido roxo, formas flutuando no fundo
      const tMe = quando('mesma', B, 0.25), tPe = quando('percebe', B, 0.62), tDe = quando('desconfia', B, 0.85);
      ve(corredor, celPeq);
      // OBJETOS SE MEXENDO: as moças balançam a cabeça juntas; em "percebe" piscam todas; em "desconfia" as molduras ficam vermelhas
      const pisca = (tc > tPe && tc < tPe + 0.3) || (tc > tPe + 0.55 && tc < tPe + 0.8);
      desenhaCorredor({ pisca, tilt: Math.round(Math.sin(tc * 3) * 4) / 50 });
      molduras.forEach((m) => { m.mold.material = (tc - tDe) * 18 > m.d ? fx.matVermelho : fx.matMold; });
      // PERSONAGEM: o paciente · olha pra esquerda e pra direita · em "percebe": surpreso · em "desconfia": dúvida, nojo
      const olhar = tc < tPe ? (Math.sin((tc - B.inicio) * 3.2) > 0 ? [-1.9, 1.6, PAC_G[2] - 1.5] : [1.9, 1.6, PAC_G[2] - 1.5]) : [0, 1.5, 4];
      pac.colocar(PAC_G, olhar);
      if (tc > tDe) { pac.reagir('duvida', tc - tDe); pac.humor('nojo'); } else if (tc > tPe) pac.reagir('surpreso', tc - tPe); else pac.reagir('segurando', tc - B.inicio);
      const m = pac.mao(1); celPeq.position.set(m[0], m[1] + 0.05, m[2] + 0.05); celPeq.rotation.set(-0.5, pac.g.rotation.y, 0);
      // EFEITOS VISUAIS: "A mesma foto em mil sites" em "mesma" · "?" em "percebe" · ✗ em "desconfia"
      if (tc < Math.max(B.inicio + 2.4, tDe)) fx.et.mesma.em(mais(cabecaDe(pac, 0), [0.15, 0.25, 0.3]), tc - tMe);
      K.som('whoosh', B.inicio + 0.02, 0.5); K.som('ding', tPe, 0.5); K.som('ding', tPe + 0.55, 0.35); K.som('errado', tDe, 0.6);
      // CÂMERA: 4 cortes de ~0,8 s · (1) uma tela de perto, afastando · (2) baixo, no meio do corredor · (3) girando · (4) perto, na cara dele
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(B.inicio + 2.4, tDe);
      if (tc < c1) {
        const q = K.suave(pc(tc, B.inicio, c1)), alvo = [-1.9, 1.05, 1.5], n = [Math.sin(0.95), 0, Math.cos(0.95)], d = K.lerp(1.15, 2.4, q);
        K.mirar([alvo[0] + n[0] * d + 0.15, alvo[1] + 0.15, alvo[2] + n[2] * d], [alvo[0] + 0.3 * q, alvo[1] + 0.1, alvo[2] - 0.4 * q]);
      } else if (tc < c2) {
        const q = K.suave(pc(tc, c1, c2));
        K.mirar([0.25, 0.55, K.lerp(4.6, 3.4, q)], [0, 1.55, -7]);
      } else if (tc < c3) K.filmar([cabecaDe(pac, 0.2), mais(PAC_G, [0, 0.1, 0]), [-1.6, 1.7, PAC_G[2] - 0.6], [1.6, 1.7, PAC_G[2] - 0.6]], 'girando', pc(tc, c2, c3), { plano: 'medio', lado: 'frente', angulo: 30, altura: 'olho', tam: 2.0 });
      else K.filmar([cabecaDe(pac, 0.35), cabecaDe(pac, -0.6)], 'chegando', pc(tc, c3, B.ate), { plano: 'medio', lado: 12, altura: 'olho', tam: 1.7 });
      fx.simb.em(cabecaDe(pac, 0.3), tc - tPe, { tipo: '?' });
      fx.simb2.em(mais(cabecaDe(pac, 0), [0.55, 0.1, 0.2]), tc - tDe, { tipo: '✗', tam: 0.7 });
    },
    enzo(B, tc) {
      // NA TELA: (1) o coworking; o Enzo no computador com o portfólio · (2) em "nutri": a Carla do lado da tela do site · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.42), tN = quando('nutri', B, 0.6), tP = quando('paciente', B, 0.75);
      if (tc < tN) {
        ve(comp); comp.tela.desenhar(portfolio, 'port');
        // PERSONAGEM: começo digitando · em "cliente": coça a cabeça
        sentado(MONITOR);
        if (tc > tC) menino.reagir('coca_cabeca', tc - tC); else menino.reagir('digitando', tc);
        // EFEITOS VISUAIS: "Web designer" · "Sem cliente"
        if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else fx.et.semCli.em(cabecaDe(menino, 0.5), tc - tC);
        K.som('clique', B.inicio + 0.1, 0.4); K.som('pingo', tC, 0.5);
        // CÂMERA: (1) passando, perto, direita
        K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tN), { plano: 'perto', lado: 60, altura: 'olho', tam: 1.6 });
      } else {
        // a Carla do lado da tela do site, olhando o relógio
        ve(siteP, placaN); siteP.mostrar('siteCarla', { tilt: Math.round(Math.sin(tc * 3) * 4) / 50 });
        carla.colocar(CARLA, CAM_C); carla.reagir('olha_relogio', tc - tN);
        fx.et.perde.em(cabecaDe(carla, 0.55), tc - tP);
        K.som('whoosh', tN, 0.5); K.som('errado', tP, 0.4);
        // CÂMERA: (2) chegando, médio, frente, na Carla e na tela
        K.filmar([siteP, cabecaDe(carla, 0.2), mais(CARLA, [0, 0.05, 0])], 'chegando', pc(tc, tN, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.2 });
      }
    },
    site(B, tc) {
      // NA TELA: a tela grande do site "Nutri Carla Souza" com a moça da salada; a Carla, morena, do lado · MOSTRA: site, dona
      const tS = quando('site', B, 0.08), tMo = quando('moça', B, 0.5), tE = quando('ela', B, 0.9);
      ve(siteP, placaN);
      // ENTRA AGORA: a tela acende do preto em "site" · OBJETOS SE MEXENDO: em "nem é ela" o círculo vermelho na moça
      siteP.mostrar('siteCarla', { preto: tc < tS + 0.1, tilt: Math.round(Math.sin(tc * 3) * 4) / 50, circulo: tc > tE - 0.2 ? Math.round(pc(tc, tE - 0.2, tE + 0.2) * 10) / 10 : 0 });
      // PERSONAGEM: a Carla mostrando a tela, orgulhosa · em "ela": encolhe os ombros
      carla.colocar(CARLA, tc < tE ? SITEP : CAM_C);
      if (tc > tE) carla.reagir('ombros', tc - tE); else carla.reagir('mostrando', tc - B.inicio);
      // EFEITOS VISUAIS: "Não é ela" e ✗ em "ela"
      fx.et.naoE.em(mais(SITEP, [0.7, 1.2, 0.3]), tc - tE);
      K.som('clique', tS, 0.4); K.som('errado', tE, 0.6);
      // CÂMERA: (1) até "moça": chegando, perto, frente, na tela · (2) passando, médio, esquerda, na Carla e na moça
      if (tc < tMo) K.filmar([siteP, mais(SITEP, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, tMo), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.6 });
      else K.filmar([mais(SITEP, [0.7, 0, 0]), cabecaDe(carla, 0.2), mais(CARLA, [0, 0.05, 0])], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -18, altura: 'olho', tam: 2.4 });
      fx.simb.em(mais(SITEP, [0.65, -0.2, 0.4]), tc - tE, { tipo: '✗', tam: 0.9 });
    },
    paciente(B, tc) {
      // NA TELA: a cafeteria; o paciente com o celular gigante: o site da Nutri Carla, depois o da Vida Leve, com a mesma moça · MOSTRA: paciente, celular
      const tMe = quando('mesma', B, 0.3), tOu = quando('outro', B, 0.5), tMa = quando('marcou', B, 0.7), tNu = quando('nutri', B, 0.9);
      const s = tc < tOu ? SITES[0] : SITES[1];
      celEm(CEL_F, CAM_F, (c, w, h) => celNutri(c, w, h, s), 'c' + s.nome);
      K.entrar(cel, 'sobe', tc - B.inicio + 0.05, { dur: 0.3 });
      if (tc > tMa && cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tMa);
      // PERSONAGEM: olhando o celular · em "mesma": surpreso · em "marcou": faz que não e sai andando
      if (tc < tMa + 0.5) { pac.colocar(PAC, mais(CEL_F, [0, 1.2, 0])); pac.reagir(tc > tMa ? 'nao' : tc > tMe ? 'surpreso' : 'pensando', tc - (tc > tMa ? tMa : tc > tMe ? tMe : B.inicio)); }
      else { pac.irPara(PAC, [1.6, 0, -0.3], K.clamp((tc - tMa - 0.5) / 1.6), tc, { reto: true }); for (let k = 0; k < 5; k++) K.som('passo', tMa + 0.5 + k * 0.28, 0.3); }
      // EFEITOS VISUAIS: "?" em "mesma" · "A mesma moça!" em "outro" · "Marcou com outra" em "nutri"
      fx.simb2.em(cabecaDe(pac, 0.3), tc - tMe, { tipo: '?' });
      if (tc < tNu) fx.et.mesmaMoca.em(mais(CEL_F, [0, 2.55, 0.2]), tc - tOu); else fx.et.outra.em(cabecaDe(pac, 0.55), tc - tNu);
      K.som('bip', B.inicio + 0.1, 0.35); K.som('range', tOu, 0.4); K.som('errado', tMa, 0.5);
      // CÂMERA: (1) até "outro": chegando, perto, no celular · (2) passando, médio, no paciente saindo
      if (tc < tOu) K.filmar([mais(CEL_F, [0, 2.2, 0]), mais(CEL_F, [0, 0.4, 0]), cabecaDe(pac, 0)], 'chegando', pc(tc, B.inicio, tOu), { plano: 'perto', lado: -6, altura: 'olho', tam: 2.4 });
      else K.filmar([mais(CEL_F, [0, 2.2, 0]), mais(CEL_F, [0, 0.3, 0]), cabecaDe(pac, 0.2), [1.0, 1.0, -0.4]], 'passando', pc(tc, tOu, B.ate), { plano: 'medio', lado: 4, altura: 'olho', tam: 2.8 });
    },
    procura(B, tc) {
      // NA TELA: o coworking de noite; o Enzo digitando; as bolinhas de papel se amontoando; o despertador até as 3h · MOSTRA: personagem, papeis, despertador
      const tU = quando('um', B, 0.3), tG = quando('Google', B, 0.55), tM = quando('madrugada', B, 0.88);
      ve(comp, desp, papeis[0].parent);
      // ENTRA AGORA: uma bolinha de papel por clique, a partir de "um"
      const passo = Math.max(0.2, (tM - tU) / PAPEL.length), n = tc > tU ? Math.min(PAPEL.length, 1 + Math.floor((tc - tU) / passo)) : 0;
      amontoa(n, n ? tU + (n - 1) * passo : null, tc);
      for (let k = 0; k < PAPEL.length; k++) K.som('clique', tU + k * passo, 0.3);
      comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n }), 'g' + n);
      // OBJETOS SE MEXENDO: os ponteiros correndo; o despertador toca em "madrugada"
      desp.userData.m3d.horas(22 + pc(tc, B.inicio, tM) * 5);
      if (tc > tM) desp.userData.m3d.tocar(tc - tM);
      // PERSONAGEM: digitando · em "madrugada": cochila (Zzz)
      sentado(MONITOR);
      if (tc > tM) menino.reagir('dormindo', tc - tM); else menino.reagir('digitando', tc);
      fx.et.umPor.em(mais(SEAT, [0.9, 2.1, 0.3]), tc - tU);
      K.som('apito', tM + 0.1, 0.4);
      // CÂMERA: (1) até "Google": girando, médio, esquerda · (2) passando, médio, nos papéis e no despertador
      if (tc < tG) K.filmar([cabecaDe(menino, 0.2), MONITOR, mais(SEAT, [0, 0.3, 0.4])], 'girando', pc(tc, B.inicio, tG), { plano: 'medio', lado: -30, angulo: 20, altura: 'olho', tam: 1.8 });
      else K.filmar([DESP, cabecaDe(menino, 0), [2.6, 0.1, 3.4], [0.6, 0.1, 3.4]], 'passando', pc(tc, tG, B.ate), { plano: 'medio', lado: 10, altura: 'olho', tam: 2.4 });
    },
    investe(B, tc) {
      // NA TELA: o coworking de dia; o Enzo de pé com a marmita; a marmita voa pro monitor · MOSTRA: personagem, marmita, monitor
      const tI = quando('investir', B, 0.2), tMa = quando('marmita', B, 0.38), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      ve(comp, marmita);
      const k = pc(tc, tS, tS + 0.9);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10));
      // PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [2.9, 1.3, 7]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: a marmita na mão em "investir"; em "sistema", voa girando até o monitor e some num poof
      const m = menino.mao(1);
      if (tc < tS) { marmita.position.set(m[0] + 0.05, m[1] - 0.05, m[2] + 0.12); marmita.rotation.set(0.15, tc * 0.8, 0); marmita.scale.setScalar(1.8 * pop(tc - tI)); }
      else { const q = K.suave(k); marmita.position.set(K.lerp(m[0], MONITOR[0] + 0.2, q), K.lerp(m[1], MONITOR[1] + 0.1, q) + Math.sin(q * PI) * 0.5, K.lerp(m[2], MONITOR[2] + 0.15, q)); marmita.rotation.set(q * 2, q * 6, 0); marmita.scale.setScalar(1.8 * (1 - q * 0.85)); if (q >= 1) marmita.visible = false; }
      fx.poof.em(mais(MONITOR, [0.2, 0.1, 0.2]), tc - tS - 0.9, { escala: 0.8 });
      // EFEITOS VISUAIS: "Investimento" em "investir" · "Acha quem precisa de site" em "precisa"
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.75, 0]), tc - tPr);
      K.som('ding', tMa, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.9, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), marmita], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [marmita.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das nutricionistas de Florianópolis sobe do computador; o Enzo ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tNu = quando('nutricionistas', B, 0.52), tF = quando('Florianópolis', B, 0.65);
      ve(comp, navG); comp.tela.desenhar(portfolio, 'port');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tNu ? 1 + Math.floor((tc - tNu) / 0.25) : 0;
        telaC.mostrar('listaNutris', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tNu + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a Nutri Carla
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [3.6, 1.1, 7]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.floripa.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tF);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a análise da Nutri Carla com as dores; o robô e o Enzo · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tDo = quando('dores', B, 0.35), tMo = quando('modelo', B, 0.8), tPr = quando('pronto', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3 });
      // OBJETOS SE MEXENDO: os blocos da análise aparecem um por um a partir de "dores"; a aderência enche
      const ate = tc > tDo ? Math.min(4, 1 + Math.floor((tc - tDo) / Math.max(0.2, (tMo - tDo) / 3))) : 0;
      telaM.mostrar('analiseCarla', { a: Math.round(pc(tc, tM, tDo) * 0.86 * 20) / 20, ate });
      for (let k = 0; k < 4; k++) K.som('bip', tDo + k * Math.max(0.2, (tMo - tDo) / 3), 0.35);
      K.som('certo', tPr, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tDo ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "pronto": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tPr ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tPr) menino.reagir('comemorando', tc - tPr); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.dores.em([-0.35, 3.2, 0.3], tc - tMo);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) passando, médio, esquerda
      if (tc < tDo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tDo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tDo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    mensagem(B, tc) {
      // NA TELA: (1) o coworking: o Enzo na frente da mensagem pronta · (2) em "Carla": a Carla com o celular gigante e a resposta · MOSTRA: dona, celular
      const tMa = quando('manda', B, 0.1), tCa = quando('Carla', B, 0.5), tPe = quando('pede', B, 0.72);
      if (tc < tCa) {
        ve(comp, telaC); comp.tela.desenhar(portfolio, 'port');
        telaC.mostrar('msgCarla', { d: Math.round(pc(tc, B.inicio, tMa + 0.3) * 20) / 20 });
        // PERSONAGEM: o Enzo aponta o botão de enviar
        menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tMa) menino.apontar(0.4); else menino.reagir('mostrando', tc - B.inicio);
        K.som('clique', tMa + 0.2, 0.6);
        // CÂMERA: (1) chegando, perto, frente, na tela
        K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tCa), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
      } else {
        ve(siteP, placaN); siteP.mostrar('siteCarla', {});
        celEm(CEL_C, CAM_C, (c, w, h) => celZap(c, w, h, { resp: tc > tPe }), 'z' + (tc > tPe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tCa);
        // PERSONAGEM: a Carla lê, surpresa · em "pede": comemora
        const CL = mais(CEL_C, [0.95, 0, -0.35]);
        carla.colocar(CL, tc < tPe ? mais(CEL_C, [0, 1.3, 0]) : CAM_C);
        if (tc > tPe) carla.reagir('comemorando', tc - tPe); else carla.reagir('surpreso', tc - tCa);
        fx.fala.em(cabecaDe(carla, 0.15), tc - tPe, { texto: 'Quero um site com fotos minhas!' });
        K.som('pingo', tCa + 0.05, 0.6); K.som('certo', tPe, 0.6);
        // CÂMERA: (2) passando, perto, direita, no celular e na Carla
        K.filmar([mais(CEL_C, [0, 2.2, 0]), mais(CEL_C, [0, 0.6, 0]), cabecaDe(carla, 0.3)], 'passando', pc(tc, tCa, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.4 });
        fx.simb.em(mais(CL, [0.3, 2.4, 0.3]), tc - tPe - 0.2, { tipo: '✓' });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Enzo de noite com os papéis amassados · (2) Agora: no consultório, o site com a foto da Carla; o Enzo, a Carla e o paciente · MOSTRA: personagem, dona
      const tA = quando('Agora', B, 0.45), tCa = quando('Carla', B, 0.7), tCr = quando('cara', B, 0.88);
      if (tc < tA) {
        ve(comp, papeis[0].parent); comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n: 3 }), 'g3'); amontoa(PAPEL.length, null, tc);
        sentado(MONITOR); menino.reagir('mao_na_testa', tc - B.inicio);
        fx.et.cacando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.4, 0.1, 0.8]), [2.6, 0.1, 3.4]], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 35, altura: 'olho', tam: 1.8 });
      } else {
        // OBJETOS SE MEXENDO: a tela do site troca a moça pela Carla de verdade em "Carla"
        ve(siteP, placaN); siteP.mostrar('siteCarla', { real: tc > tCa });
        const EN = [0.55, 0, -2.4], CL = [1.55, 0, -2.75], PA = [-0.5, 0, -2.1];
        menino.colocar(EN, CAM_C); menino.reagir('vitoria', tc - tA);
        carla.colocar(CL, tc > tCa ? SITEP : CAM_C); carla.reagir('aplaudindo', tc - tA);
        pac.colocar(PA, tc > tCa ? SITEP : CAM_C); pac.reagir('comemorando', tc - tCr);
        fx.et.real.em(mais(SITEP, [0.75, 1.25, 0.3]), tc - tCr);
        K.som('brilho', tCa, 0.5); K.som('certo', tCr, 0.6);
        K.filmar([siteP, mais(EN, [0, 0.2, 0]), cabecaDe(carla, 0.2), mais(PA, [0, 0.2, 0])], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.8 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Enzo de pé no coworking; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(portfolio, 'port');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(0.25, 0, 2.6); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [2.9, 1.4, 8]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino, robo], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(portfolio, 'port');
      robo.g.position.set(0.25, 0, 2.6); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [2.9, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // o paciente desconfiado no meio do corredor de telas iguais
      ve(corredor, celPeq);
      desenhaCorredor({ pisca: false, tilt: 0 });
      molduras.forEach((m) => { m.mold.material = fx.matMold; });
      pac.colocar(PAC_G, [0, 1.5, 4]); pac.reagir('duvida', 0.6); pac.humor('nojo');
      const m = pac.mao(1); celPeq.position.set(m[0], m[1] + 0.05, m[2] + 0.05); celPeq.rotation.set(-0.5, pac.g.rotation.y, 0);
      K.mirar([0.35, 1.45, PAC_G[2] + 3.4], [0, 1.55, PAC_G[2] - 2.5]);
      fx.simb.em(cabecaDe(pac, 0.3), 1, { tipo: '?', som: false });
    }
  };

  function cena(tc, t, plano) {
    if (!fx.matMold) { fx.matMold = molduras[0].mold.material; fx.matVermelho = K.mat(0xe8352b, { emissive: 0xe8352b, emissiveIntensity: 0.6 }); }
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'corredor' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, pac, carla].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0; pac.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.position.set(...CEL_F); cel.scale.setScalar(1.5);
    marmita.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
