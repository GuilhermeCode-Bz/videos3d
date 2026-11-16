// O site minúsculo no celular (canal Mappoa).
// Cinco lugares (K.cenarios): a praia de Vitória (o cliente com a lupa gigante na frente do celular gigante), a sala do
// Breno (de dia e de noite), o escritório da Vitória Mar Imóveis do seu Paulo e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, cli, paulo, robo, comp, cel, cel2, desp, cadeira, telaC, telaM, navG, siteP, placaI, moqueca, lupa, lente, cabo, celPeq, FOV0;
  const tudo = [], fx = {}, canecas = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Sala do Breno: o computador na frente do tapete, virado pra +z; a cadeira na frente dele
  const COMP = [1.8, 0, 0.8], MONITOR = [1.8, 1.185, 0.68], SEAT = [1.8, 0, 1.48];
  const EM_PE = [2.95, 0, 1.65], TELA_Q = [1.3, 1.45, 1.7], NAV = [1.95, 2.95, 1.15], DESP = [1.25, 0.76, 0.95];
  const CANECA = [[2.4, 0.76, 0.7], [2.15, 0.76, 0.95], [2.55, 0, 1.35], [0.95, 0, 1.55], [2.85, 0, 0.95], [0.7, 0, 1.0], [2.4, 0, 2.0], [1.05, 0, 2.1], [0.55, 0, 1.75], [3.05, 0, 1.5]];
  // Escritório da imobiliária: a tela grande do site na parede da janela; o seu Paulo e o celular do lado
  const SITEP = [-1.0, 2.3, -4.2], PAULO = [0.55, 0, -2.7], CEL_S = [1.5, 0, -3.3], CEL_C = [0.3, 0, -2.55], CAM_C = [0.4, 1.6, 4.5];
  // Praia: o celular gigante, a lente da lupa na frente dele e o cliente do lado
  const CEL_P = [-0.6, 0, -0.9], LC = [-0.35, 1.7, -0.2], CLI = [0.95, 0, 0.15], CEL2 = [2.9, 0, -1.3], CLI2 = [2.15, 0, -0.25];
  const TELA_P = [CEL_P[0], 1.6, CEL_P[2] + 0.1];

  const LUGAR = {
    gancho: 'praia', breno: 'sala', site: 'imob', botao: 'praia', procura: 'sala_noite', investe: 'sala', lista: 'sala',
    mappoa: 'mundo_mappoa', mensagem: 'sala', antes_agora: 'sala_noite', segue: 'sala', cartao: 'sala', capa: 'praia'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'breno') return tc < quando('imobiliária', B, 0.6) ? 'sala' : 'imob';
    if (B.plano === 'mensagem') return tc < quando('Paulo', B, 0.62) ? 'sala' : 'imob';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.4) ? 'sala_noite' : 'praia';
    return LUGAR[B.plano] || 'sala';
  }

  const IMOBS = [
    { nome: 'Vitória Mar Imóveis', end: 'Av. Saturnino de Brito, 1200', chips: ['whats', 'site'], site: true },
    { nome: 'Ilha Imóveis', end: 'Rua Aleixo Netto, 540', chips: ['tel', 'site'], site: true },
    { nome: 'Casa Capixaba', end: 'Av. Nossa Senhora da Penha, 880', chips: ['whats', 'insta'], site: false },
    { nome: 'Orla Corretora', end: 'Rua Joaquim Lírio, 230', chips: ['tel'], site: false }
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

  // ---------- O site da imobiliária ----------
  // Foto do prédio na orla (o mar, a areia e os prédios)
  function fotoOrla(c, x, y, w, h) {
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#7cc4f0'); g.addColorStop(1, '#d6efff'); c.fillStyle = g; c.fillRect(x, y, w, h);
    c.fillStyle = '#1f8fc9'; c.fillRect(x, y + h * 0.72, w, h * 0.14);
    c.fillStyle = '#f2dfae'; c.fillRect(x, y + h * 0.86, w, h * 0.14);
    [[0.08, 0.35, 0.13], [0.24, 0.18, 0.15], [0.42, 0.28, 0.12], [0.58, 0.1, 0.16], [0.78, 0.3, 0.14]].forEach(([px, py, pw], i) => {
      c.fillStyle = ['#f4f1ea', '#e7ecf2', '#fbe8d0', '#ffffff', '#dde7ef'][i]; c.fillRect(x + w * px, y + h * py, w * pw, h * (0.72 - py));
      c.fillStyle = '#8fb8d8'; for (let yy = y + h * (py + 0.04); yy < y + h * 0.68; yy += h * 0.07) for (let xx = x + w * (px + 0.015); xx < x + w * (px + pw - 0.02); xx += w * 0.03) c.fillRect(xx, yy, w * 0.016, h * 0.035);
    });
    c.restore();
  }
  // O site de computador (deitado). Desenhado em w × h: no celular, ele é espremido inteiro (o problema do vídeo)
  function siteImob(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#0b3a5b'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Vitória Mar Imóveis', w * 0.03, h * 0.05, h * 0.05, '#ffffff', 900, 'left', w * 0.4);
    ['Comprar', 'Alugar', 'Lançamentos', 'Contato'].forEach((s, i) => txt(c, s, w * (0.6 + i * 0.1), h * 0.05, h * 0.026, '#cfe3f2', 700, 'center'));
    fotoOrla(c, 0, h * 0.1, w, h * 0.42);
    c.fillStyle = 'rgba(11,58,91,0.55)'; c.fillRect(0, h * 0.1, w * 0.52, h * 0.42);
    txt(c, 'Seu apartamento na', w * 0.04, h * 0.21, h * 0.055, '#ffffff', 900, 'left', w * 0.46);
    txt(c, 'orla de Vitória', w * 0.04, h * 0.29, h * 0.055, '#ffffff', 900, 'left', w * 0.46);
    rr(c, w * 0.04, h * 0.37, w * 0.36, h * 0.08, h * 0.02, '#ffffff'); txt(c, 'Bairro, cidade...', w * 0.06, h * 0.41, h * 0.026, '#9aa59e', 600);
    rr(c, w * 0.32, h * 0.38, w * 0.07, h * 0.06, h * 0.02, '#f08a24'); txt(c, 'Buscar', w * 0.355, h * 0.41, h * 0.022, '#ffffff', 800, 'center');
    ['Apto 3 quartos', 'Cobertura duplex', 'Apto 2 quartos'].forEach((t, i) => {
      const x = w * (0.04 + i * 0.32), y = h * 0.57, cw = w * 0.28, ch = h * 0.39;
      rr(c, x, y, cw, ch, h * 0.015, '#f1f5f9'); fotoOrla(c, x, y, cw, ch * 0.5);
      txt(c, t, x + cw * 0.06, y + ch * 0.6, h * 0.034, '#0b3a5b', 900, 'left', cw * 0.9);
      txt(c, ['Praia do Canto', 'Mata da Praia', 'Jardim da Penha'][i], x + cw * 0.06, y + ch * 0.71, h * 0.024, '#6b7280', 700, 'left', cw * 0.9);
      rr(c, x + cw * 0.06, y + ch * 0.79, cw * 0.5, ch * 0.13, h * 0.012, '#2fb5a6'); txt(c, 'Ver detalhes', x + cw * 0.31, y + ch * 0.855, h * 0.022, '#ffffff', 800, 'center');
    });
  }
  const barraCel = (c, w, h, url) => { c.fillStyle = '#e9edf2'; c.fillRect(0, 0, w, h * 0.06); rr(c, w * 0.05, h * 0.012, w * 0.9, h * 0.036, h * 0.018, '#ffffff'); txt(c, url, w * 0.09, h * 0.03, h * 0.018, '#4b5563', 600, 'left', w * 0.82); };
  // O site de computador espremido no celular: tudo minúsculo. e = { apagado }
  function siteEspremido(c, w, h, e = {}) {
    if (e.apagado) { c.fillStyle = '#0b0f16'; c.fillRect(0, 0, w, h); txt(c, '✕', w / 2, h * 0.45, w * 0.3, '#e8352b', 900, 'center'); return; }
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    barraCel(c, w, h, 'vitoriamarimoveis.com.br');
    const k = w / 1600; c.save(); c.translate(0, h * 0.065); c.scale(k, k); siteImob(c, 1600, 1000); c.restore();
    // o resto da página, em letrinhas
    const y0 = h * 0.065 + 1000 * k + h * 0.02;
    txt(c, 'Lançamentos em Vitória e região metropolitana', w * 0.03, y0, w * 0.028, '#0b3a5b', 800, 'left', w * 0.94);
    for (let i = 0; i < 4; i++) { rr(c, w * (0.03 + i * 0.24), y0 + h * 0.02, w * 0.21, h * 0.07, 3, '#e6eef5'); rr(c, w * (0.04 + i * 0.24), y0 + h * 0.1, w * 0.15, h * 0.008, 2, '#9aa5b1'); }
    for (let i = 0; i < 22; i++) rr(c, w * 0.03, y0 + h * (0.14 + i * 0.016), w * (0.55 + ((i * 37) % 40) / 100), h * 0.006, 2, i % 6 === 0 ? '#6b7280' : '#c2c9d1');
    rr(c, w * 0.03, h * 0.93, w * 0.94, h * 0.05, 2, '#0b3a5b');
  }
  // A página errada (o botão minúsculo levou pra cá)
  function paginaErrada(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    barraCel(c, w, h, 'vitoriamarimoveis.com.br/privacidade');
    txt(c, 'Política de privacidade', w * 0.06, h * 0.11, w * 0.065, '#0b3a5b', 900, 'left', w * 0.9);
    for (let i = 0; i < 40; i++) rr(c, w * 0.06, h * (0.16 + i * 0.02), w * (0.6 + ((i * 29) % 30) / 100), h * 0.007, 2, '#c2c9d1');
  }
  // O site que cabe no celular (o da Ilha Imóveis, e depois o novo da Vitória Mar)
  function siteCelular(c, w, h, e = {}) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    barraCel(c, w, h, e.url || 'ilhaimoveis.com.br');
    c.fillStyle = e.cor || '#d6336c'; c.fillRect(0, h * 0.06, w, h * 0.09);
    txt(c, e.nome || 'Ilha Imóveis', w / 2, h * 0.105, w * 0.085, '#ffffff', 900, 'center', w * 0.9);
    fotoOrla(c, w * 0.05, h * 0.18, w * 0.9, h * 0.3);
    txt(c, 'Apto 3 quartos', w * 0.06, h * 0.53, w * 0.1, '#0b3a5b', 900, 'left', w * 0.9);
    txt(c, 'Praia do Canto', w * 0.06, h * 0.59, w * 0.07, '#6b7280', 700, 'left', w * 0.9);
    rr(c, w * 0.06, h * 0.64, w * 0.88, h * 0.09, h * 0.045, '#25d366'); txt(c, 'Chamar no WhatsApp', w / 2, h * 0.685, w * 0.07, '#ffffff', 900, 'center', w * 0.85);
    rr(c, w * 0.06, h * 0.76, w * 0.88, h * 0.09, h * 0.045, e.cor || '#d6336c'); txt(c, 'Ver fotos', w / 2, h * 0.805, w * 0.07, '#ffffff', 900, 'center', w * 0.85);
  }
  // O que a lente da lupa mostra: o pedaço do site aumentado
  function lenteSite(c, w, h, e = {}) {
    if (e.apagado) { c.fillStyle = '#0b0f16'; c.fillRect(0, 0, w, h); return; }
    // o 1º anúncio ("Apto 3 quartos", "Praia do Canto", "Ver detalhes") aumentado
    const s = w / 260; c.save(); c.scale(s, s); c.translate(-50, -690); siteImob(c, 1600, 1000); c.restore();
    c.fillStyle = 'rgba(190,230,255,0.18)'; c.fillRect(0, 0, w, h);
  }
  function celZap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Breno · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, seu Paulo! Abri o site', 'da Vitória Mar no celular', 'e as letras ficam bem', 'pequenas. Faço sites que', 'cabem em qualquer tela.'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) {
      rr(c, w * 0.17, h * 0.56, w * 0.78, h * 0.17, 16, '#d9fdd3');
      txt(c, 'Quero um site que', w * 0.21, h * 0.61, w * 0.06, '#111b21', 700, 'left', w * 0.7);
      txt(c, 'abra no celular!', w * 0.21, h * 0.67, w * 0.06, '#111b21', 700, 'left', w * 0.7);
    }
  }
  function portfolio(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Breno Sites', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que cabem no celular', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  function buscaGoogle(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.08, h * 0.08, w * 0.84, h * 0.14, h * 0.07, '#f1f3f4');
    txt(c, 'imobiliária vitória es', w * 0.13, h * 0.15, h * 0.06, '#202124', 600, 'left', w * 0.75);
    for (let i = 0; i < 4; i++) { const y = h * (0.32 + i * 0.16); rr(c, w * 0.08, y, w * (0.5 + ((i + (e.n || 0)) % 3) * 0.1), h * 0.04, 4, '#1a0dab'); rr(c, w * 0.08, y + h * 0.06, w * 0.7, h * 0.03, 4, '#d0d4d9'); }
  }
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }

  // ---------- A lupa gigante: aro, lente com as letras aumentadas e o cabo até a mão ----------
  function fazLupa() {
    const g = new THREE.Group();
    g.add(K.malha(new THREE.TorusGeometry(0.55, 0.07, 16, 48), K.mat(0x1067f8, { roughness: 0.3 })));
    lente = K.telaCanvas(1.1, 1.1, 320); lente.m.geometry = new THREE.CircleGeometry(0.53, 48); lente.m.position.z = 0.005; g.add(lente.m);
    const tras = K.malha(new THREE.CircleGeometry(0.53, 48), new THREE.MeshStandardMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.4, roughness: 0.05 }), false);
    tras.rotation.y = PI; tras.position.z = -0.005; g.add(tras);
    // brilho do vidro
    const br = K.malha(new THREE.RingGeometry(0.34, 0.4, 32, 1, 2.2, 0.9), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 }), false); br.position.z = 0.01; g.add(br);
    cabo = K.malha(new THREE.CylinderGeometry(0.06, 0.075, 1, 12), K.mat(0x050d1c, { roughness: 0.5 })); g.add(cabo);
    poeCabo([0.4, -0.4, 0], [0.9, -0.9, 0]);
    return g;
  }
  // O cabo vai do aro (a) até a mão (b), em coordenadas da lupa
  function poeCabo(a, b) {
    const va = V(...a), vb = V(...b), d = vb.clone().sub(va), L = Math.max(0.3, d.length());
    cabo.position.copy(va.clone().add(vb).multiplyScalar(0.5));
    cabo.scale.set(1, L, 1);
    cabo.quaternion.setFromUnitVectors(V(0, 1, 0), d.normalize());
  }
  // A lupa na frente do celular, com o cabo na mão do cliente
  function lupaNaMao(tc, treme = 1) {
    ve(lupa);
    lupa.rotation.set(0, 0, 0);
    lupa.position.set(LC[0] + Math.sin(tc * 7) * 0.01 * treme, LC[1] + Math.sin(tc * 5.3) * 0.012 * treme, LC[2]);
    const m = cli.mao(1);
    poeCabo([0.39, -0.39, 0], [m[0] - lupa.position.x, m[1] - lupa.position.y, m[2] - lupa.position.z]);
  }

  // ---------- A panela de barro da moqueca (o investimento) ----------
  function fazMoqueca() {
    const g = new THREE.Group();
    const barro = K.mat(0x5a3020, { roughness: 0.8 });
    const p = K.malha(new THREE.CylinderGeometry(0.2, 0.15, 0.12, 24), barro); p.position.y = 0.06; g.add(p);
    const borda = K.malha(new THREE.TorusGeometry(0.2, 0.02, 8, 24), barro); borda.rotation.x = PI / 2; borda.position.y = 0.12; g.add(borda);
    const caldo = K.malha(new THREE.CylinderGeometry(0.185, 0.185, 0.01, 24), K.mat(0xe0702a, { roughness: 0.6 })); caldo.position.y = 0.115; g.add(caldo);
    [[-0.07, 0.03], [0.06, -0.05], [0.02, 0.08]].forEach(([x, z]) => { const f = K.malha(new THREE.BoxGeometry(0.09, 0.03, 0.06), K.mat(0xf6efe2)); f.position.set(x, 0.125, z); f.rotation.y = x * 9; g.add(f); });
    for (let i = 0; i < 6; i++) { const v = K.malha(new THREE.SphereGeometry(0.018, 8, 6), K.mat(i % 2 ? 0x3c9a3c : 0xe8352b)); v.position.set(Math.cos(i) * 0.12, 0.128, Math.sin(i) * 0.12); g.add(v); }
    [-1, 1].forEach((s) => { const a = K.malha(new THREE.TorusGeometry(0.04, 0.014, 6, 12, PI), barro); a.position.set(s * 0.22, 0.1, 0); a.rotation.set(0, s > 0 ? -PI / 2 : PI / 2, 0); g.add(a); });
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['praia', {}, 'praia'], ['sala', {}, 'sala'], ['sala', { hora: 'noite' }, 'sala_noite'], ['escritorio', {}, 'imob'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.siteImob = (c, w, h) => siteImob(c, w, h);
    T.listaImobs = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'IMOBILIÁRIAS', itens: IMOBS, n: e.n, sel: e.sel, total: 142, comSite: 97, semSite: 45 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Imobiliárias · Vitória, ES', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = IMOBS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseImob = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Vitória Mar Imóveis', aderencia: e.a, ate: e.ate,
      dores: ['Site desatualizado', 'Presença digital fraca'], oportunidades: ['Site novo com os imóveis em destaque'],
      objecoes: ['"Já tenho site"'], abordagem: 'Comece pelo site: mostre como ele aparece pro cliente.'
    });
    T.msgImob = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Vitória Mar Imóveis', texto: 'Oi, seu Paulo! Abri o site da Vitória Mar Imóveis no celular e as letras ficam bem pequenas. Faço sites que cabem em qualquer tela. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Breno (do canal), o seu Paulo, o cliente e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    paulo = K.personagem('dono'); K.semNome(paulo.g); K.nomear('dono', paulo.g);
    cli = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf5c518, bermuda: 0xd9534f, tenis: 0xffffff, cabelo: 0x2a1a10, pele: 0xc98f62 } });
    K.semNome(cli.g); K.nomear('cliente', cli.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A praia: o celular gigante, o outro celular e a lupa
    cel = K.m3d('celular_gigante', { tam: 2.0 }); guarda(cel, 'celular', CEL_P);
    cel2 = K.m3d('celular_gigante', { tam: 2.0 }); guarda(cel2, 'celular2', CEL2);
    lupa = fazLupa(); guarda(lupa, 'lupa', LC);

    // O escritório: a tela grande do site e a placa
    siteP = K.painelMappoa(3.0, 1.9, { px: 900, borda: '#22262e' }); guarda(siteP, 'site', SITEP);
    placaI = K.placa('VITÓRIA MAR IMÓVEIS', { larg: 2.8, alt: 0.45, fundo: '#0b3a5b', cor: '#ffffff', borda: '#ffffff' });
    placaI.position.set(SITEP[0], 3.85, -4.3); guarda(placaI, 'placa_imob');

    // A sala: o computador, a cadeira, o despertador, as canecas, a moqueca, a barra e as telas do Mappoa
    comp = K.computador({ corMesa: 0xe9dcc8 }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2fb5a6 }); guarda(cadeira, 'cadeira', SEAT);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    const gc = new THREE.Group();
    CANECA.forEach((p, i) => { const m = K.m3d('caneca', { cor: [0xffffff, 0xe8352b, 0x1067f8, 0xf5c518][i % 4] }); m.position.set(...p); m.rotation.y = i * 1.1; m.scale.setScalar(1.3); gc.add(m); canecas.push(m); });
    guarda(gc, 'canecas', [0, 0, 0]);
    celPeq = new THREE.Group();
    celPeq.add(K.malha(new THREE.BoxGeometry(0.09, 0.17, 0.014), K.mat(0x1e1f22)));
    const tp = K.telaCanvas(0.08, 0.15, 160); tp.m.position.z = 0.008; celPeq.add(tp.m);
    tp.desenhar((c, w, h) => siteEspremido(c, w, h), 'p');
    guarda(celPeq, 'celular_peq');
    moqueca = fazMoqueca(); guarda(moqueca, 'moqueca', [0, 1, 0], 1.6);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    fx.poof = K.poof(61);
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      minus: e('Tudo minúsculo', 'laranja'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'),
      perde: e('Perde cliente', 'vermelho'), noComp: e('No computador', 'verde'), noCel: e('No celular', 'vermelho'),
      errado: e('Botão errado!', 'vermelho'), outra: e('Foi pra outra', 'vermelho'), umPor: e('Um por um...', 'vermelho'),
      invest: e('Investimento', 'verde'), precisa: e('Acha quem precisa de site', 'verde'), vitoria: e('Vitória, ES', 'azul'),
      separa: e('Sem site e com site', 'verde'), dores: e('Dores de cada uma', 'verde'), cacando: e('Caçando cliente', 'vermelho'),
      cabe: e('Cabe no celular', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Dava zoom ou fechava? Comenta <em>ZOOM</em> ou <em>FECHAVA</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function celTela(c0, desenho, chave) { c0.userData.m3d.tela.desenhar(desenho, chave); }
  // As canecas: n à vista, a última caindo do alto
  function empilha(n, tUlt, tc) {
    canecas.forEach((m, i) => {
      m.visible = i < n; m.position.set(...CANECA[i]);
      if (i === n - 1 && tUlt != null) { const q = K.clamp((tc - tUlt) / 0.3); m.position.y = CANECA[i][1] + (1 - q * q) * 1.2; }
    });
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a areia; o celular gigante com o site espremido; a lente da lupa na frente; o cliente segurando o cabo · MOSTRA: celular, lupa, cliente
      // CENÁRIO: praia, as ondas chegando e as gaivotas
      const tMi = quando('minúsculo', B, 0.62), tFe = quando('fecha', B, 0.88);
      ve(cel); cel.position.set(...CEL_P); cel.rotation.set(0, 0, 0);
      // OBJETOS SE MEXENDO: a lupa treme; em "fecha" a tela apaga com o ✗
      const apagado = tc > tFe;
      celTela(cel, (c, w, h) => siteEspremido(c, w, h, { apagado }), 'esp' + apagado);
      lente.desenhar((c, w, h) => lenteSite(c, w, h, { apagado }), 'len' + apagado);
      // PERSONAGEM: o cliente · segurando a lupa, de olho apertado · em "minúsculo": dúvida · em "fecha": faz que não
      // em "fecha" ele vira pra quem assiste, fazendo que não
      cli.colocar(CLI, tc > tFe ? [0.6, 1.5, 5] : mais(TELA_P, [0.3, 0, 0]));
      if (tc > tFe) cli.reagir('nao', tc - tFe); else if (tc > tMi) cli.reagir('duvida', tc - tMi); else cli.reagir('segurando', tc - B.inicio);
      cli.humor('nojo');
      lupaNaMao(tc);
      // EFEITOS VISUAIS: "Tudo minúsculo" em "minúsculo"
      if (tc < tFe + 0.1) fx.et.minus.em(mais(TELA_P, [0.2, 1.75, 0.3]), tc - tMi);
      K.som('whoosh', B.inicio + 0.02, 0.5); K.som('ding', tMi, 0.5); K.som('errado', tFe, 0.6);
      // CÂMERA: 4 cortes · (1) a lente de perto, afastando · (2) de baixo, na areia · (3) girando no cliente e na lupa · (4) perto, na cara dele
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(B.inicio + 2.4, tFe);
      const L = lupa.position;
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)), d = K.lerp(1.5, 2.9, q); K.mirar([L.x + 0.15 + 0.3 * q, L.y + 0.05, L.z + d], [L.x + 0.2 * q, L.y - 0.15 * q, L.z]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(0.1, 0.5, q), 0.35, K.lerp(4.3, 3.7, q)], [0.0, 1.75, -0.6]); }
      else if (tc < c3) K.filmar([mais(TELA_P, [0, 1.2, 0]), [L.x, L.y, L.z], cabecaDe(cli, 0.2), mais(CLI, [0, 0.05, 0])], 'girando', pc(tc, c2, c3), { plano: 'medio', lado: -12, angulo: 20, altura: 'olho', tam: 1.8 });
      else { const q = K.suave(pc(tc, c3, B.ate)), h = cabecaDe(cli, -0.1); K.mirar([K.lerp(1.0, 0.75, q), 1.6, K.lerp(3.6, 2.7, q)], [h[0] - 0.45, h[1] - 0.2, h[2]]); }
      fx.simb.em(mais(cabecaDe(cli, 0), [0.5, 0.1, 0.25]), tc - tFe, { tipo: '✗', tam: 0.7 });
    },
    breno(B, tc) {
      // NA TELA: (1) a sala; o Breno no computador com o portfólio · (2) em "imobiliária": o seu Paulo do lado da tela do site · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.42), tI = quando('imobiliária', B, 0.6), tP = quando('perde', B, 0.75);
      if (tc < tI) {
        ve(comp); comp.tela.desenhar(portfolio, 'port');
        // PERSONAGEM: começo digitando · em "cliente": coça a cabeça
        sentado(MONITOR);
        if (tc > tC) menino.reagir('coca_cabeca', tc - tC); else menino.reagir('digitando', tc);
        // EFEITOS VISUAIS: "Web designer" · "Sem cliente"
        if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else fx.et.semCli.em(cabecaDe(menino, 0.5), tc - tC);
        K.som('clique', B.inicio + 0.1, 0.4); K.som('pingo', tC, 0.5);
        // CÂMERA: (1) passando, perto, direita
        K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tI), { plano: 'perto', lado: 60, altura: 'olho', tam: 1.6 });
      } else {
        // o seu Paulo do lado da tela do site, olhando o relógio
        ve(siteP, placaI); siteP.mostrar('siteImob', {});
        paulo.colocar(PAULO, CAM_C); paulo.reagir('olha_relogio', tc - tI);
        fx.et.perde.em(cabecaDe(paulo, 0.55), tc - tP);
        K.som('whoosh', tI, 0.5); K.som('errado', tP, 0.4);
        // CÂMERA: (2) chegando, perto, frente, no seu Paulo e na tela
        K.filmar([siteP, cabecaDe(paulo, 0.2), mais(PAULO, [0, 0.05, 0])], 'chegando', pc(tc, tI, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.2 });
      }
    },
    site(B, tc) {
      // NA TELA: (1) a tela grande com o site bonito e o seu Paulo orgulhoso · (2) em "celular": o celular gigante sobe com o site espremido · MOSTRA: site, celular, dono
      const tLi = quando('lindo', B, 0.42), tCe = quando('celular', B, 0.6), tLe = quando('letrinha', B, 0.88);
      ve(siteP, placaI); siteP.mostrar('siteImob', {});
      // ENTRA AGORA: o celular sobe em "celular" · OBJETOS SE MEXENDO: vibra em "letrinha"
      if (tc > tCe - 0.05) {
        ve(cel); cel.position.set(...CEL_S); cel.rotation.set(0, -0.25, 0); cel.scale.setScalar(1.4);
        celTela(cel, (c, w, h) => siteEspremido(c, w, h), 'esp' + false);
        K.entrar(cel, 'sobe', tc - tCe + 0.05, { dur: 0.3 });
        if (tc > tLe && cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tLe);
      }
      // PERSONAGEM: mostrando a tela, orgulhoso · em "letrinha": encolhe os ombros
      paulo.colocar(PAULO, tc < tCe ? SITEP : CAM_C);
      if (tc > tLe) paulo.reagir('ombros', tc - tLe); else paulo.reagir('mostrando', tc - B.inicio);
      // EFEITOS VISUAIS: "No computador" e ✓ em "lindo" · "No celular" em "celular" · ✗ em "letrinha"
      if (tc < tCe) fx.et.noComp.em(mais(SITEP, [0.6, 1.2, 0.3]), tc - tLi); else fx.et.noCel.em(mais(CEL_S, [0, 2.45, 0.2]), tc - tCe);
      fx.simb.em(mais(SITEP, [1.1, 0.4, 0.4]), tc < tCe ? tc - tLi : -1, { tipo: '✓', tam: 0.8 });
      fx.simb2.em(mais(CEL_S, [0.55, 1.6, 0.3]), tc - tLe, { tipo: '✗', tam: 0.7 });
      K.som('certo', tLi, 0.5); K.som('whoosh', tCe, 0.5); K.som('errado', tLe, 0.6);
      // CÂMERA: (1) até "celular": chegando, perto, frente, na tela · (2) passando, médio, no celular e no seu Paulo
      if (tc < tCe) K.filmar([siteP, mais(SITEP, [0, -1.0, 0]), cabecaDe(paulo, 0)], 'chegando', pc(tc, B.inicio, tCe), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.6 });
      else K.filmar([mais(CEL_S, [0, 2.3, 0]), mais(CEL_S, [0, 0.2, 0]), cabecaDe(paulo, 0.2), mais(PAULO, [0, 0.05, 0])], 'passando', pc(tc, tCe, B.ate), { plano: 'medio', lado: 14, altura: 'olho', tam: 2.4 });
    },
    botao(B, tc) {
      // NA TELA: a praia; o cliente aperta a tela do celular gigante; a página errada; o celular da Ilha Imóveis sobe e ele vai pra lá · MOSTRA: cliente, celular
      const tEr = quando('errou', B, 0.2), tAp = quando('apartamento', B, 0.4), tOu = quando('outra', B, 0.65), tIm = quando('imobiliária', B, 0.85);
      ve(cel); cel.position.set(...CEL_P); cel.rotation.set(0, 0.2, 0);
      // OBJETOS SE MEXENDO: a tela troca pra página errada em "errou"; o celular treme
      if (tc > tEr) celTela(cel, paginaErrada, 'errada'); else celTela(cel, (c, w, h) => siteEspremido(c, w, h), 'esp' + false);
      if (tc > tEr && tc < tEr + 0.4 && cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tEr);
      // ENTRA AGORA: o celular da Ilha Imóveis sobe da areia em "outra"
      if (tc > tOu - 0.05) { ve(cel2); cel2.position.set(...CEL2); cel2.rotation.set(0, -0.35, 0); celTela(cel2, (c, w, h) => siteCelular(c, w, h), 'ilha'); K.entrar(cel2, 'sobe', tc - tOu + 0.05, { dur: 0.35 }); }
      // PERSONAGEM: apontando a tela · em "errou": mão na testa · em "outra": vai andando pro outro celular
      if (tc < tOu) {
        cli.colocar(CLI, TELA_P);
        if (tc > tEr) cli.reagir('mao_na_testa', tc - tEr); else cli.apontar(0.8);
      } else {
        cli.irPara(CLI, CLI2, K.clamp((tc - tOu) / 1.0), tc, { reto: true });
        if (tc > tOu + 1.0) { cli.colocar(CLI2, mais(CEL2, [0, 1.6, 0])); cli.reagir('comemorando', tc - tOu - 1.0); }
        for (let k = 0; k < 4; k++) K.som('passo', tOu + 0.1 + k * 0.25, 0.3);
      }
      // EFEITOS VISUAIS: "Botão errado!" em "errou" · "Foi pra outra" em "imobiliária"
      if (tc < tIm) fx.et.errado.em(mais(TELA_P, [0.1, 1.75, 0.3]), tc - tEr); else fx.et.outra.em(cabecaDe(cli, 0.55), tc - tIm);
      K.som('clique', B.inicio + 0.25, 0.5); K.som('errado', tEr, 0.5); K.som('whoosh', tOu, 0.5);
      // CÂMERA: (1) até "apartamento": chegando, perto, no dedo e na tela · (2) passando, médio, no cliente indo pro outro celular
      if (tc < tAp + 0.15) K.filmar([mais(TELA_P, [0, 1.3, 0]), mais(TELA_P, [0, -0.9, 0]), cabecaDe(cli, 0)], 'chegando', pc(tc, B.inicio, tAp + 0.15), { plano: 'perto', lado: 18, altura: 'olho', tam: 2.4 });
      else K.filmar([mais(TELA_P, [0, 1.3, 0]), mais(CEL2, [0, 3.2, 0]), mais(CEL2, [0, 0.2, 0]), cabecaDe(cli, 0.2), mais(CLI, [0, 0.05, 0])], 'passando', pc(tc, tAp + 0.15, B.ate), { plano: 'medio', lado: -6, altura: 'olho', tam: 3.0 });
    },
    procura(B, tc) {
      // NA TELA: a sala de noite; o Breno no computador, a busca no Google; as canecas se acumulando · MOSTRA: personagem, canecas, monitor
      const tU = quando('um', B, 0.3), tPo = quando('por', B, 0.45), tN = quando('noite', B, 0.88);
      ve(comp, desp, canecas[0].parent);
      // ENTRA AGORA: uma caneca a cada clique, a partir de "um"
      const passo = Math.max(0.18, (tN - tU) / CANECA.length), n = tc > tU ? Math.min(CANECA.length, 1 + Math.floor((tc - tU) / passo)) : 0;
      empilha(n, n ? tU + (n - 1) * passo : null, tc);
      for (let k = 0; k < CANECA.length; k++) K.som('clique', tU + k * passo, 0.3);
      comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n }), 'g' + n);
      desp.userData.m3d.horas(22 + pc(tc, B.inicio, tN) * 4);
      // PERSONAGEM: digitando · em "noite": cochila (Zzz)
      sentado(MONITOR);
      if (tc > tN) menino.reagir('dormindo', tc - tN); else menino.reagir('digitando', tc);
      fx.et.umPor.em(mais(SEAT, [0.9, 2.1, 0.3]), tc - tU);
      // CÂMERA: (1) até "por": girando, médio, esquerda · (2) passando, médio, nas canecas
      // (a câmera fica do lado do monitor, pra ver a cara dele e as canecas em volta)
      if (tc < tPo) { const q = K.suave(pc(tc, B.inicio, tPo)); K.mirar([K.lerp(0.0, 0.4, q), 1.75, K.lerp(-0.3, -0.6, q)], [1.95, 1.05, 1.35]); }
      else { const q = K.suave(pc(tc, tPo, B.ate)); K.mirar([K.lerp(4.4, 4.1, q), 2.1, K.lerp(-1.3, -0.9, q)], [1.95, 0.6, 1.55]); }
    },
    investe(B, tc) {
      // NA TELA: a sala de dia; o Breno de pé com a panela da moqueca; a panela voa pro monitor · MOSTRA: personagem, moqueca, monitor
      const tI = quando('investir', B, 0.2), tMo = quando('moqueca', B, 0.38), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      ve(comp, moqueca);
      const k = pc(tc, tS, tS + 0.9);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10));
      // PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [2.9, 1.3, 7]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: a panela na mão em "investir"; em "sistema", voa girando até o monitor e some num poof
      const m = menino.mao(1);
      if (tc < tS) { moqueca.position.set(m[0] + 0.05, m[1] - 0.05, m[2] + 0.12); moqueca.rotation.set(0.15, tc * 0.8, 0); moqueca.scale.setScalar(1.6 * pop(tc - tI)); }
      else { const q = K.suave(k); moqueca.position.set(K.lerp(m[0], MONITOR[0] + 0.2, q), K.lerp(m[1], MONITOR[1] + 0.1, q) + Math.sin(q * PI) * 0.5, K.lerp(m[2], MONITOR[2] + 0.15, q)); moqueca.rotation.set(q * 2, q * 6, 0); moqueca.scale.setScalar(1.6 * (1 - q * 0.85)); if (q >= 1) moqueca.visible = false; }
      fx.poof.em(mais(MONITOR, [0.2, 0.1, 0.2]), tc - tS - 0.9, { escala: 0.8 });
      // EFEITOS VISUAIS: "Investimento" em "investir" · "Acha quem precisa de site" em "precisa"
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.75, 0]), tc - tPr);
      K.som('ding', tMo, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.9, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), moqueca], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [moqueca.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das imobiliárias de Vitória sobe do computador; o Breno ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tIm = quando('imobiliárias', B, 0.52), tV = quando('Vitória', B, 0.65);
      ve(comp, navG); comp.tela.desenhar(portfolio, 'port');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tIm ? 1 + Math.floor((tc - tIm) / 0.25) : 0;
        telaC.mostrar('listaImobs', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tIm + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a Vitória Mar
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [3.6, 1.1, 7]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.vitoria.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tV);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a análise da Vitória Mar Imóveis com as dores; o robô e o Breno · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tSe = quando('separa', B, 0.25), tDo = quando('dores', B, 0.65), tFim = Math.min(B.ate - 0.25, tDo + 0.7);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3 });
      // OBJETOS SE MEXENDO: os blocos da análise aparecem um por um a partir de "separa"; a aderência enche
      const ate = tc > tSe ? Math.min(4, 1 + Math.floor((tc - tSe) / Math.max(0.2, (tFim - tSe) / 3))) : 0;
      telaM.mostrar('analiseImob', { a: Math.round(pc(tc, tM, tSe + 0.4) * 0.84 * 20) / 20, ate });
      for (let k = 0; k < 4; k++) K.som('bip', tSe + k * Math.max(0.2, (tFim - tSe) / 3), 0.35);
      K.som('certo', tFim, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tDo ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · no fim: comemorando
      menino.colocar([1.45, 0, 1.0], tc > tFim ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tFim) menino.reagir('comemorando', tc - tFim); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      if (tc < tDo) fx.et.separa.em([-0.35, 3.2, 0.3], tc - tSe); else fx.et.dores.em([-0.35, 3.2, 0.3], tc - tDo);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) passando, médio, esquerda
      if (tc < tDo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tDo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tDo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    mensagem(B, tc) {
      // NA TELA: (1) o Breno de olho apertado no celular pequeno · (2) em "manda": a mensagem pronta · (3) em "Paulo": o seu Paulo com o celular gigante · MOSTRA: dono, celular
      const tCo = quando('confere', B, 0.08), tMa = quando('manda', B, 0.3), tPa = quando('Paulo', B, 0.62), tPe = quando('pede', B, 0.75);
      if (tc < tPa) {
        ve(comp); comp.tela.desenhar(portfolio, 'port');
        const ME = mais(EM_PE, [0.35, 0, 0.1]);
        if (tc < tMa) {
          // o celular pequeno perto do rosto, o site espremido
          ve(celPeq);
          menino.colocar(ME, [3.6, 1.2, 7]); menino.reagir('segurando', tc - B.inicio); menino.humor('nojo');
          const m = menino.mao(1); celPeq.position.set(m[0], m[1] + 0.12, m[2] + 0.06); celPeq.rotation.set(-0.2, menino.g.rotation.y, 0);
          fx.simb2.em(cabecaDe(menino, 0.3), tc - tCo, { tipo: '?' });
          K.filmar([cabecaDe(menino, 0.1), celPeq.position.toArray()], 'chegando', pc(tc, B.inicio, tMa), { plano: 'perto', lado: 15, altura: 'olho', tam: 1.1 });
        } else {
          ve(telaC); telaC.mostrar('msgImob', { d: Math.round(pc(tc, tMa, tMa + 0.4) * 20) / 20 });
          // PERSONAGEM: o Breno aponta o botão de enviar
          menino.colocar([2.4, 0, 1.95], TELA_Q); menino.apontar(0.4);
          K.som('clique', tMa + 0.45, 0.6);
          K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, tMa, tPa), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
        }
      } else {
        ve(siteP, placaI); siteP.mostrar('siteImob', {});
        ve(cel); cel.position.set(...CEL_C); cel.scale.setScalar(1.5);
        cel.rotation.set(0, Math.atan2(CAM_C[0] - CEL_C[0], CAM_C[2] - CEL_C[2]) * 0.6 + 0.3, 0);
        celTela(cel, (c, w, h) => celZap(c, w, h, { resp: tc > tPe }), 'z' + (tc > tPe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tPa);
        // PERSONAGEM: o seu Paulo lê, surpreso · em "pede": comemora
        const PL = mais(CEL_C, [0.95, 0, -0.35]);
        paulo.colocar(PL, tc < tPe ? mais(CEL_C, [0, 1.3, 0]) : CAM_C);
        if (tc > tPe) paulo.reagir('comemorando', tc - tPe); else paulo.reagir('surpreso', tc - tPa);
        fx.fala.em(cabecaDe(paulo, 0.15), tc - tPe, { texto: 'Quero um site que abra no celular!' });
        K.som('pingo', tPa + 0.05, 0.6); K.som('certo', tPe, 0.6);
        // CÂMERA: (3) passando, perto, direita, no celular e no seu Paulo
        K.filmar([mais(CEL_C, [0, 2.2, 0]), mais(CEL_C, [0, 0.6, 0]), cabecaDe(paulo, 0.3)], 'passando', pc(tc, tPa, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.4 });
        fx.simb.em(mais(PL, [0.3, 2.4, 0.3]), tc - tPe - 0.2, { tipo: '✓' });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Breno de noite com as canecas · (2) Agora: na praia, o site novo no celular gigante; a lupa na areia; o cliente, o Breno e o seu Paulo · MOSTRA: personagem, dono, celular
      const tA = quando('Agora', B, 0.4), tPa = quando('Paulo', B, 0.6), tPl = quando('palma', B, 0.8);
      if (tc < tA) {
        ve(comp, canecas[0].parent); comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n: 3 }), 'g3'); empilha(CANECA.length, null, tc);
        sentado(MONITOR); menino.reagir('mao_na_testa', tc - B.inicio);
        fx.et.cacando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.4, 0.1, 0.8]), [2.9, 0.1, 2.0]], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 35, altura: 'olho', tam: 1.8 });
      } else {
        // OBJETOS SE MEXENDO: o site novo da Vitória Mar no celular gigante; a lupa cai na areia em "Paulo"
        ve(cel); cel.position.set(...CEL_P); cel.rotation.set(0, 0, 0);
        celTela(cel, (c, w, h) => siteCelular(c, w, h, { nome: 'Vitória Mar Imóveis', cor: '#0b3a5b', url: 'vitoriamarimoveis.com.br' }), 'novo');
        ve(lupa); const q = K.suave(pc(tc, tPa, tPa + 0.35));
        lupa.position.set(K.lerp(0.2, 0.25, q), K.lerp(1.5, 0.08, q), K.lerp(0.4, 0.95, q)); lupa.rotation.set(-PI / 2 * q, 0, 0.6 * q);
        poeCabo([0.4, -0.4, 0], [0.9, -0.9, 0]);
        if (q < 1) { const m = cli.mao(1); lupa.position.set(K.lerp(m[0] - 0.8, 0.25, q), K.lerp(m[1] + 0.8, 0.08, q), K.lerp(m[2], 0.95, q)); }
        const EN = [1.75, 0, 0.6], PL = [-1.55, 0, 0.45];
        cli.colocar(CLI, [0.6, 1.4, 5]); cli.reagir(tc > tPa ? 'comemorando' : 'segurando', tc - (tc > tPa ? tPa : tA)); cli.humor('feliz');
        menino.colocar(EN, [0.6, 1.4, 5]); menino.reagir('vitoria', tc - tA);
        paulo.colocar(PL, [0.6, 1.4, 5]); paulo.reagir('aplaudindo', tc - tA);
        fx.et.cabe.em(mais(TELA_P, [0.4, 1.85, 0.3]), tc - tPl);
        K.som('whoosh', tPa, 0.4); K.som('certo', tPl, 0.6);
        K.filmar([mais(TELA_P, [0, 1.5, 0]), mais(EN, [0, 0.2, 0]), mais(PL, [0, 0.2, 0]), cabecaDe(cli, 0.2), mais(CLI, [0, 0.05, 0])], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.3 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Breno de pé na sala; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(portfolio, 'port');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(0.55, 0, 2.1); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
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
      robo.g.position.set(0.55, 0, 2.1); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [2.9, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // o cliente de olho apertado atrás da lupa gigante, na frente do celular com o site espremido
      ve(cel); cel.position.set(...CEL_P); cel.rotation.set(0, 0, 0);
      celTela(cel, (c, w, h) => siteEspremido(c, w, h), 'esp' + false);
      lente.desenhar((c, w, h) => lenteSite(c, w, h), 'len' + false);
      cli.colocar(CLI, mais(TELA_P, [0.3, 0, 0])); cli.reagir('duvida', 0.6); cli.humor('nojo');
      lupaNaMao(0, 0);
      K.mirar([1.55, 1.75, 4.6], [0.05, 1.7, -0.5]);
      fx.simb.em(cabecaDe(cli, 0.3), 1, { tipo: '?', som: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'praia' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cli, paulo].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0; cli.humor('feliz'); menino.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(2.0); cel2.scale.setScalar(2.0);
    moqueca.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
