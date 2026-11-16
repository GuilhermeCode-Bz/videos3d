// Site de graça pra ganhar experiência (canal Mappoa).
// Cinco lugares (K.cenarios): o campo aberto (a mesinha "SITES DE GRAÇA" e a fila sem fim até as montanhas), a
// academia do amigo, o estúdio claro como a mesa do Lucas (com a rede), o estúdio azul-escuro com o pedestal (o painel
// gigante do Mappoa) e o salão de beleza coberto como CLÍNICA BELLA PELE.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, amigo, yara, robo, comp, cel, cadeira, telaC, telaM, navG, tacaca, contrato, contratoT, tvT, tvG, FOV0;
  let mesaG, faixaT, faixaT2, pilha, presente, filaG, figs = [], boleto, tvA, tvAT, quadroL, rede, placaBella, mesinha;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Campo: a mesa em z 3 (o Lucas atrás dela, em z 3,8, de frente pra fila); a fila vai pra -z, até as montanhas
  const MESA = [-1.0, 0, 3.0], LUCAS_C = [-1.0, 0, 3.8], FRENTE = [-0.9, 0, 4.7];
  const filaPos = (s) => [-0.5 + s * 0.1 + Math.sin(s * 0.18) * 0.7, 0, 2.2 - s * 1.0];
  const BOLETO = [0.75, 0, 4.4];
  // Academia: a TV no pé, o Lucas e o amigo na frente dela
  const TVA = [0, 1.75, -0.9], LUCAS_A = [-0.55, 0, 0.7], AMIGO = [0.3, 0, 0.75];
  // Estúdio claro (a mesa do Lucas): o computador virado pra +z, a cadeira na frente
  const COMP = [0, 0, 0], MONITOR = [0, 1.185, -0.12], SEAT = [0, 0, 0.68];
  const EM_PE = [1.15, 0, 0.85], TELA_Q = [-0.5, 1.45, 0.9], NAV = [0.15, 2.95, 0.35];
  // Estúdio escuro: o painel em cima do pedestal
  const TELA_P = [-0.35, 2.0, -0.3], LUCAS_P = [1.05, 0.18, 0.75];
  // Clínica (salão): o celular, a doutora, a mesinha do orçamento e a TV com o site novo
  const CEL = [-2.3, 0, 0.6], YARA_M = [-1.25, 0, 1.0];
  const MESINHA = [0.3, 0, 1.0], CONTRATO = [0.3, 0.83, 1.0], LUCAS_S = [-0.55, 0, 1.15], YARA_S = [1.15, 0, 1.15], TV_S = [0.3, 1.95, -1.1];

  const LUGAR = {
    gancho: 'campo', lucas: 'treino', conta: 'campo', investe: 'mesa', lista: 'mesa', mappoa: 'palco', fechou: 'clinica',
    antes_agora: 'campo', segue: 'mesa', cartao: 'mesa', capa: 'campo'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'mensagem') return tc < quando('doutora', B, 0.72) ? 'mesa' : 'clinica';
    return LUGAR[B.plano] || 'mesa';
  }

  const CLINICAS = [
    { nome: 'Bella Pele Estética', end: 'Adrianópolis', chips: ['whats', 'insta'], site: false },
    { nome: 'Pele de Seda', end: 'Vieiralves', chips: ['tel', 'site'], site: true },
    { nome: 'Studio Jambu', end: 'Ponta Negra', chips: ['insta'], site: false },
    { nome: 'Estética Rio Negro', end: 'Parque Dez', chips: ['whats', 'site'], site: true }
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
  const plano = (larg, alt, px, fn) => { const t = K.telaCanvas(larg, alt, px); t.desenhar(fn, 'x'); return t; };
  const caixa = (pai, d, mat, p) => { const m = K.malha(new THREE.BoxGeometry(...d), mat); m.position.set(...p); pai.add(m); return m; };

  // ---------- Desenhos ----------
  function faixaDesenho(c, w, h, cobra) {
    rr(c, 0, 0, w, h, h * 0.18, cobra ? '#1faa52' : '#ffc928');
    txt(c, cobra ? 'SITES · ORÇAMENTO' : 'SITES DE GRAÇA', w / 2, h * 0.54, h * 0.5, cobra ? '#ffffff' : '#c81e3a', 900, 'center', w * 0.92);
  }
  // O site que o Lucas fez de graça pra academia do amigo
  function siteAcademia(c, w, h) {
    c.fillStyle = '#1b1f26'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#ffb020'; c.fillRect(0, 0, w, h * 0.18);
    txt(c, 'ACADEMIA DO BETO', w * 0.05, h * 0.09, h * 0.09, '#1b1f26', 900, 'left', w * 0.9);
    txt(c, 'Treine com a gente', w * 0.05, h * 0.36, h * 0.1, '#ffffff', 900, 'left', w * 0.6);
    txt(c, 'Manaus · AM', w * 0.05, h * 0.5, h * 0.06, '#ffb020', 800, 'left', w * 0.6);
    rr(c, w * 0.05, h * 0.62, w * 0.36, h * 0.13, h * 0.06, '#ffb020'); txt(c, 'Matricule-se', w * 0.23, h * 0.685, h * 0.055, '#1b1f26', 900, 'center');
    c.fillStyle = '#ffb020'; rr(c, w * 0.68, h * 0.42, w * 0.22, h * 0.06, h * 0.03, '#ffb020'); c.beginPath(); c.arc(w * 0.68, h * 0.45, h * 0.09, 0, 2 * PI); c.arc(w * 0.9, h * 0.45, h * 0.09, 0, 2 * PI); c.fill();
    txt(c, 'Feito por Lucas · de graça', w * 0.95, h * 0.92, h * 0.045, '#9aa5ae', 700, 'right', w * 0.9);
  }
  function boletoDesenho(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1067f8'; c.fillRect(0, 0, w, h * 0.16);
    txt(c, 'CONTA DE LUZ', w / 2, h * 0.08, h * 0.08, '#ffffff', 900, 'center', w * 0.9);
    txt(c, 'Lucas · Manaus', w * 0.08, h * 0.22, h * 0.04, '#5b6470', 700, 'left', w * 0.8);
    for (let i = 0; i < 6; i++) rr(c, w * 0.08, h * (0.29 + i * 0.055), w * (0.5 + (i % 3) * 0.12), h * 0.018, 3, '#c3cad2');
    rr(c, w * 0.08, h * 0.63, w * 0.84, h * 0.12, h * 0.02, '#ffe4e1');
    txt(c, 'VENCE HOJE', w / 2, h * 0.69, h * 0.075, '#e8352b', 900, 'center', w * 0.8);
    c.fillStyle = '#1b2733'; for (let i = 0; i < 46; i++) { const lw = (i % 3 === 0 ? 3 : 1.5) * (w / 300); c.fillRect(w * 0.08 + i * (w * 0.84 / 46), h * 0.81, lw, h * 0.13); }
  }
  // O site novo da Bella Pele (agenda online): e.n = quantos horários, e.ag = o botão aceso
  function siteBella(c, w, h, e = {}) {
    c.fillStyle = '#fff6f8'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#e8537a'; c.fillRect(0, 0, w, h * 0.17);
    txt(c, 'BELLA PELE', w * 0.05, h * 0.085, h * 0.09, '#ffffff', 900, 'left', w * 0.6);
    txt(c, 'Estética · Manaus', w * 0.95, h * 0.085, h * 0.05, '#ffe4ec', 800, 'right', w * 0.4);
    txt(c, 'Agende online', w * 0.05, h * 0.29, h * 0.08, '#4a1d2c', 900, 'left', w * 0.6);
    const n = e.n == null ? 6 : e.n;
    ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'].forEach((s, i) => {
      if (i >= n) return;
      const x = w * (0.05 + (i % 3) * 0.31), y = h * (0.4 + Math.floor(i / 3) * 0.2);
      rr(c, x, y, w * 0.28, h * 0.15, h * 0.03, i === 1 ? '#e8537a' : '#ffffff');
      c.strokeStyle = '#f2b8c8'; c.lineWidth = 3; c.beginPath(); c.roundRect(x, y, w * 0.28, h * 0.15, h * 0.03); c.stroke();
      txt(c, s, x + w * 0.14, y + h * 0.075, h * 0.06, i === 1 ? '#ffffff' : '#4a1d2c', 900, 'center');
    });
    rr(c, w * 0.25, h * 0.84, w * 0.5, h * 0.11, h * 0.055, e.ag ? '#2fd66b' : '#25b05a');
    txt(c, 'Agendar no WhatsApp', w * 0.5, h * 0.895, h * 0.048, '#ffffff', 900, 'center', w * 0.46);
  }
  function siteLucas(c, w, h) {
    c.fillStyle = '#eef3f8'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.25);
    txt(c, 'Lucas · Web Design', w * 0.05, h * 0.125, h * 0.1, '#ffffff', 900, 'left', w * 0.9);
    for (let i = 0; i < 3; i++) rr(c, w * (0.05 + i * 0.31), h * 0.35, w * 0.28, h * 0.55, 10, ['#cfe6ff', '#ffe4ec', '#fff1c7'][i]);
  }
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }
  function celZap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Lucas · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, doutora Yara! Vi o Insta', 'da Bella Pele: os resultados', 'são lindos, mas não achei', 'um site pra agendar.', 'Posso te mostrar uma ideia?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) {
      rr(c, w * 0.12, h * 0.56, w * 0.83, h * 0.12, 16, '#d9fdd3');
      txt(c, 'Me manda um orçamento!', w * 0.16, h * 0.62, w * 0.058, '#111b21', 700, 'left', w * 0.76);
    }
  }
  function contratoDesenho(c, w, h, k) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, 'ORÇAMENTO', w / 2, h * 0.1, w * 0.12, '#1b2733', 900, 'center', w * 0.9);
    txt(c, 'Site novo · Bella Pele', w / 2, h * 0.19, w * 0.06, '#5b6470', 700, 'center', w * 0.9);
    for (let i = 0; i < 8; i++) rr(c, w * 0.1, h * (0.28 + i * 0.06), w * (0.55 + (i % 3) * 0.1), h * 0.018, 2, '#c3cad2');
    c.strokeStyle = '#1b2733'; c.lineWidth = 3; c.beginPath(); c.moveTo(w * 0.55, h * 0.86); c.bezierCurveTo(w * 0.65, h * 0.78, w * 0.7, h * 0.92, w * 0.85, h * 0.84); c.stroke();
    if (k > 0) {
      c.save(); c.translate(w * 0.5, h * 0.62); c.rotate(-0.25); c.scale(1 + (1 - k) * 1.5, 1 + (1 - k) * 1.5); c.globalAlpha = Math.min(1, k * 1.5);
      c.strokeStyle = '#1faa52'; c.lineWidth = w * 0.025; c.strokeRect(-w * 0.3, -h * 0.07, w * 0.6, h * 0.14);
      txt(c, 'PAGO', 0, 0, w * 0.14, '#1faa52', 900, 'center'); c.restore();
    }
  }

  // ---------- Peças feitas aqui ----------
  // A mesinha com toalha branca e a faixa nos dois postes (frente e verso legíveis)
  function fazMesa() {
    const g = new THREE.Group(), branco = K.mat(0xf8f6f0, { roughness: 0.8 }), poste = K.mat(0x6b4a2e);
    caixa(g, [1.7, 0.06, 0.85], branco, [0, 0.8, 0]);
    caixa(g, [1.72, 0.55, 0.87], branco, [0, 0.52, 0]);
    [-1, 1].forEach((l) => { const p = K.malha(new THREE.CylinderGeometry(0.05, 0.06, 2.9, 10), poste); p.position.set(l * 1.35, 1.45, 0.25); g.add(p); });
    faixaT = K.telaCanvas(2.7, 0.62, 700); faixaT.m.position.set(0, 2.55, 0.28); g.add(faixaT.m);
    faixaT2 = K.telaCanvas(2.7, 0.62, 700); faixaT2.m.position.set(0, 2.55, 0.22); faixaT2.m.rotation.y = PI; g.add(faixaT2.m);
    return g;
  }
  // A pilha de presentes: em cima da mesa e no chão do lado
  function fazPilha() {
    const g = new THREE.Group(), cores = [[0x1067f8, 0xf5c518], [0xe8537a, 0xffffff], [0x1faa52, 0xf5c518], [0xf39a1e, 0x1067f8], [0x8a4fd8, 0xffffff]];
    const pos = [[-0.55, 0.83, 0.05, 0.75], [-0.05, 0.83, -0.1, 0.65], [0.5, 0.83, 0.1, 0.7], [-0.3, 1.25, 0.0, 0.55], [-1.75, 0, 0.3, 1.0], [-1.7, 0.48, 0.3, 0.8], [-2.25, 0, 0.0, 0.9], [-1.95, 0, -0.55, 0.85], [-2.0, 0.85, -0.1, 0.6]];
    pos.forEach(([x, y, z, s], i) => { const p = K.m3d('presente', { cor: cores[i % 5][0], fita: cores[i % 5][1] }); p.scale.setScalar(s); p.position.set(x, y, z); p.rotation.y = i * 0.7; g.add(p); });
    return g;
  }
  // Silhueta simples (os da fila que ficam longe)
  const GEO_C = new THREE.CylinderGeometry(0.2, 0.24, 0.95, 10), GEO_H = new THREE.SphereGeometry(0.2, 12, 10);
  function silhueta(cor, pele) {
    const g = new THREE.Group();
    const c = K.malha(GEO_C, K.mat(cor)); c.position.y = 0.75; g.add(c);
    const pe = K.malha(new THREE.CylinderGeometry(0.17, 0.15, 0.3, 8), K.mat(0x2a2f3a)); pe.position.y = 0.15; g.add(pe);
    const h = K.malha(GEO_H, K.mat(pele)); h.position.y = 1.42; g.add(h);
    return g;
  }
  // A fila: 10 figurantes de perto e silhuetas até o horizonte
  function fazFila() {
    const g = new THREE.Group(); K.scene.add(g);
    const CORES = [0xe8352b, 0xf5c518, 0x8a4fd8, 0x1faa52, 0xff8a1e, 0xe8537a, 0x3fb8c8, 0x2a2f3a, 0xffffff, 0x1067f8];
    const PELES = [0xe6b48a, 0xb9805a, 0x8d5a3b, 0xf1c9a5, 0xc68e62];
    for (let i = 0; i < 10; i++) {
      const op = i % 3 === 1 ? { tipo: 'menina', cores: { vestido: CORES[i], pele: PELES[i % 5] } } : { cores: { camiseta: CORES[i], bermuda: 0x2a2f3a, pele: PELES[i % 5], cabelo: [0x2a1a10, 0x1e1e1e, 0x7a4a22][i % 3] } };
      const b = K.boneco(op);
      const k = K.bonecos.indexOf(b); if (k >= 0) K.bonecos.splice(k, 1);
      K.semNome(b.g); g.add(b.g); figs.push(b);
    }
    for (let s = 10; s <= 40; s++) {
      const p = filaPos(s), si = silhueta(CORES[s % 10], PELES[s % 5]);
      si.position.set(p[0] + Math.sin(s * 2.3) * 0.15, 0, p[2]); si.rotation.y = 0; g.add(si);
    }
    return g;
  }
  // A conta de luz gigante, em pé num pezinho
  function fazBoleto() {
    const g = new THREE.Group();
    const t = K.telaCanvas(2.0, 2.8, 700); t.desenhar(boletoDesenho, 'b'); t.m.position.y = 1.4; g.add(t.m);
    const tras = K.malha(new THREE.BoxGeometry(2.02, 2.82, 0.03), K.mat(0xf2f2ee)); tras.position.set(0, 1.4, -0.03); g.add(tras);
    return g;
  }
  // A cuia de tacacá (o investimento): caldo amarelo, jambu e camarão, num apoio de palha
  function fazTacaca() {
    const g = new THREE.Group();
    const apoio = K.malha(new THREE.TorusGeometry(0.12, 0.035, 8, 20), K.mat(0xc9a46a, { roughness: 0.9 })); apoio.rotation.x = PI / 2; apoio.position.y = 0.035; g.add(apoio);
    const cuia = K.malha(new THREE.SphereGeometry(0.2, 22, 12, 0, 2 * PI, PI / 2, PI / 2), K.mat(0x4a2c16, { roughness: 0.6, side: THREE.DoubleSide })); cuia.position.y = 0.22; g.add(cuia);
    const caldo = K.malha(new THREE.CircleGeometry(0.185, 24), K.mat(0xe8b830, { roughness: 0.3 })); caldo.rotation.x = -PI / 2; caldo.position.y = 0.2; g.add(caldo);
    for (let i = 0; i < 6; i++) { const f = K.malha(new THREE.SphereGeometry(0.05, 8, 6), K.mat(0x2f8a2f)); f.scale.set(1, 0.25, 0.6); const a = i * 1.05; f.position.set(Math.cos(a) * 0.09, 0.21, Math.sin(a) * 0.09); f.rotation.y = a; g.add(f); }
    for (let i = 0; i < 3; i++) { const cam = K.malha(new THREE.TorusGeometry(0.035, 0.014, 6, 12, PI * 1.3), K.mat(0xff7a4a)); cam.position.set(-0.07 + i * 0.07, 0.22, 0.03 * (i - 1)); cam.rotation.set(PI / 2, 0, i); g.add(cam); }
    return g;
  }
  // A rede de dormir (o canto do Lucas em Manaus), em dois postes
  function fazRede() {
    const g = new THREE.Group(), poste = K.mat(0x8a5a32);
    [-1.4, 1.4].forEach((x) => { const p = K.malha(new THREE.CylinderGeometry(0.07, 0.08, 2.0, 10), poste); p.position.set(x, 1.0, 0); g.add(p); });
    const cv = new THREE.CatmullRomCurve3([V(-1.35, 1.6, 0), V(-0.6, 0.95, 0), V(0, 0.85, 0), V(0.6, 0.95, 0), V(1.35, 1.6, 0)]);
    const m = K.malha(new THREE.TubeGeometry(cv, 30, 0.2, 10, false), K.mat(0xf39a1e, { roughness: 0.9, side: THREE.DoubleSide }));
    m.scale.set(1, 0.55, 1.6); g.add(m);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['natureza', {}, 'campo'], ['academia', {}, 'treino'], ['estudio', { cor: 0xdff3ee, pedestal: false }, 'mesa'], ['estudio', { cor: 0x16284a }, 'palco'], ['salao_beleza', {}, 'clinica']]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaClin = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'CLÍNICAS DE ESTÉTICA', itens: CLINICAS, n: e.n, sel: e.sel, total: 126, comSite: 52, semSite: 74 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Clínicas de estética · Manaus, AM', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = CLINICAS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseBella = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Bella Pele Estética', aderencia: e.a, ate: e.ate,
      dores: ['Sem site: só Instagram', 'Agenda só pelo direct'], oportunidades: ['Site com agenda online'],
      objecoes: ['"O Instagram já resolve"'], abordagem: 'Elogie os resultados e mostre a agenda num site.'
    });
    T.msgBella = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Bella Pele Estética', texto: 'Oi, doutora Yara! Vi o Instagram da Bella Pele: os resultados são lindos, mas não achei um site pra agendar. Faço sites pra clínicas aqui em Manaus. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Lucas (do canal), o amigo da academia, a doutora Yara e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    amigo = K.personagem('personal'); K.semNome(amigo.g); K.nomear('amigo', amigo.g);
    yara = K.personagem('dona', { cores: { blazer: 0xffffff, vestido: 0xe8537a } }); K.semNome(yara.g); K.nomear('dona', yara.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O campo: a mesa com a faixa, a pilha de presentes, a caixa da entrega, a fila e a conta de luz
    mesaG = fazMesa(); guarda(mesaG, 'mesa_graca', MESA);
    pilha = fazPilha(); guarda(pilha, 'presentes', MESA);
    presente = K.m3d('presente', { cor: 0xe8537a, fita: 0xffffff }); guarda(presente, 'presentes', [0, 1, 0], 0.6);
    filaG = fazFila(); guarda(filaG, 'fila', [0, 0, 0]);
    boleto = fazBoleto(); guarda(boleto, 'boleto', BOLETO);
    // A academia: a TV no pé com o site do amigo
    tvA = new THREE.Group();
    caixa(tvA, [2.0, 1.25, 0.08], K.mat(0x1b1f26), [0, 0, 0]);
    tvAT = K.telaCanvas(1.88, 1.13, 800); tvAT.m.position.z = 0.045; tvA.add(tvAT.m); tvAT.desenhar(siteAcademia, 'a');
    caixa(tvA, [0.12, 1.2, 0.12], K.mat(0x2a2e33), [0, -1.2, -0.05]); caixa(tvA, [0.9, 0.06, 0.6], K.mat(0x2a2e33), [0, -1.72, -0.05]);
    guarda(tvA, 'tv_academia', TVA);
    // A mesa do Lucas: o computador, a cadeira, o quadro, a rede, o tacacá, a barra e as telas do Mappoa
    comp = K.computador({ corMesa: 0xc89a5c }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2fb5a6 }); guarda(cadeira, 'cadeira', SEAT);
    quadroL = plano(2.6, 0.8, 700, (c, w, h) => { rr(c, 0, 0, w, h, h * 0.2, '#123a7a'); txt(c, 'LUCAS · WEB DESIGN', w / 2, h * 0.54, h * 0.42, '#4fe3ff', 900, 'center', w * 0.9); });
    guarda(quadroL.m, null, [-2.3, 2.3, -2.8]);
    rede = fazRede(); rede.rotation.y = -0.3; rede.scale.setScalar(0.8); guarda(rede, null, [3.2, 0, -3.4]);
    tacaca = fazTacaca(); guarda(tacaca, 'tacaca', [0, 1, 0], 1.4);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.7, 2.8, { px: 800 }); guarda(telaM, 'tela', TELA_P);
    // A Bella Pele: a placa, o celular, a TV, a mesinha e o orçamento
    placaBella = plano(3.8, 0.85, 800, (c, w, h) => { rr(c, 0, 0, w, h, h * 0.25, '#ffffff'); txt(c, 'BELLA PELE · ESTÉTICA', w / 2, h * 0.54, h * 0.46, '#e8537a', 900, 'center', w * 0.92); });
    guarda(placaBella.m, null, [0, 3.75, -4.28]);
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL);
    tvG = new THREE.Group();
    caixa(tvG, [2.1, 1.3, 0.08], K.mat(0x1b1f26), [0, 0, 0]);
    tvT = K.telaCanvas(1.98, 1.18, 900); tvT.m.position.z = 0.045; tvG.add(tvT.m);
    caixa(tvG, [0.12, 1.4, 0.12], K.mat(0xd8d2cc), [0, -1.3, -0.05]); caixa(tvG, [0.9, 0.06, 0.6], K.mat(0xd8d2cc), [0, -1.92, -0.05]);
    guarda(tvG, 'tv_site', TV_S);
    mesinha = new THREE.Group();
    const mm = K.malha(new THREE.CylinderGeometry(0.45, 0.45, 0.05, 24), K.mat(0xfbf7f4)); mm.position.y = 0.8; mesinha.add(mm);
    const pm = K.malha(new THREE.CylinderGeometry(0.06, 0.08, 0.8, 10), K.mat(0xe8537a)); pm.position.y = 0.4; mesinha.add(pm);
    guarda(mesinha, null, MESINHA);
    contratoT = K.telaCanvas(0.5, 0.66, 300); contrato = new THREE.Group(); contrato.add(contratoT.m); contratoT.m.rotation.x = -PI / 2;
    guarda(contrato, 'contrato', CONTRATO);

    fx.poof = K.poof(61);
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.holo = K.holofote();
    fx.onda = K.ondaChoque();
    fx.cont = K.contador();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      hobby: e('Vira hobby', 'vermelho'), web: e('Web designer', 'azul'), mao: e('Manaus, AM', 'azul'),
      exp: e('+ Experiência', 'verde'), luz: e('Conta de luz', 'vermelho'), invest: e('Investimento', 'verde'), precisa: e('Acha quem precisa de site', 'verde'),
      mao2: e('Manaus, AM', 'azul'), chance: e('Mais chance de comprar', 'verde'), pronta: e('Mensagem pronta', 'verde'),
      insta: e('Só Instagram', 'laranja'), pago: e('Primeiro site pago', 'verde'),
      antes: e('Antes: de presente', 'vermelho'), cobra: e('Trabalho se cobra', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Já fez site de graça? Comenta <em>EU</em> ou <em>NUNCA</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function celTela(c0, desenho, chave) { c0.userData.m3d.tela.desenhar(desenho, chave); }
  // O campo: a mesa com a faixa (cobra = a faixa nova), a pilha e a fila (comFila)
  function campo(tc, op = {}) {
    ve(mesaG);
    faixaT.desenhar((c, w, h) => faixaDesenho(c, w, h, op.cobra), op.cobra ? 'c' : 'g');
    faixaT2.desenhar((c, w, h) => faixaDesenho(c, w, h, op.cobra), op.cobra ? 'c' : 'g');
    if (op.pilha !== false) ve(pilha);
    if (op.fila) {
      ve(filaG);
      figs.forEach((b, i) => {
        const p = filaPos(i), prox = i === 0 ? cabecaDe(menino, -0.4) : mais(filaPos(i - 1), [0, 1.2, 0]);
        b.colocar(p, prox);
        if (i === 0) { if (op.recebeu) b.reagir('comemorando', tc - op.recebeu); else b.humor('feliz'); }
        else if (i % 3 === 2) b.reagir('olha_relogio', tc + i);
        else if (i % 4 === 1) b.reagir('cansado', tc + i);
        else b.humor(i % 2 ? 'feliz' : 'triste');
        b.g.position.y = Math.abs(Math.sin(tc * 2 + i)) * 0.02;
      });
    }
  }
  // A caixa de presente da mão do Lucas pra mão da 1ª pessoa (k de 0 a 1)
  function entrega(k) {
    ve(presente);
    const a = menino.mao(1), b = figs[0].mao(0), q = K.suave(K.clamp(k));
    presente.position.set(K.lerp(a[0], b[0], q), K.lerp(a[1], b[1], q) - 0.12 + Math.sin(q * PI) * 0.15, K.lerp(a[2], b[2], q));
    presente.rotation.set(0, q * 0.8, 0);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o campo; a mesa com a faixa "SITES DE GRAÇA" e a pilha de presentes; o Lucas atrás dela; a fila sem fim · MOSTRA: personagem, fila, presentes
      // CENÁRIO: natureza, borboletas e pássaros
      const tGr = quando('graça', B, 0.15), tPa = quando('paga', B, 0.7), tHo = quando('hobby', B, 0.9);
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(c2 + 0.6, tPa);
      // ENTRA AGORA: a caixa passa da mão do Lucas pra da 1ª pessoa em "graça"
      const kE = pc(tc, Math.min(tGr, B.inicio + 0.6), Math.min(tGr, B.inicio + 0.6) + 0.6);
      campo(tc, { fila: true, recebeu: kE >= 1 ? Math.min(tGr, B.inicio + 0.6) + 0.6 : null });
      // PERSONAGEM: entrega sorrindo · em "paga": mão na testa, virado pra câmera
      if (tc < c3) { menino.colocar(LUCAS_C, cabecaDe(figs[0], -0.3)); menino.apontar(0.55); menino.humor('feliz'); }
      else { menino.colocar(FRENTE, [-0.6, 1.5, 9]); menino.reagir('mao_na_testa', tc - c3); menino.humor('triste'); }
      if (tc < c3) entrega(kE);
      K.som('whoosh', B.inicio + 0.02, 0.6); K.som('pingo', Math.min(tGr, B.inicio + 0.6) + 0.5, 0.5); K.som('errado', tHo, 0.6);
      // CÂMERA: 4 cortes · (1) aberto, alto, de trás da mesa, a fila sem fim · (2) perto, de lado, a caixa passando · (3) tele pela fila · (4) perto, o Lucas
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(-1.6, -1.3, q), 4.1, K.lerp(10.8, 10.0, q)], [0.4, 0.9, -12]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([-3.4, 1.6, K.lerp(2.0, 2.3, q)], [-0.75, 1.15, 3.0]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(2.3, 2.0, q), 2.3, 5.2], [0.6, 1.2, -16]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([-0.7, 1.8, K.lerp(10.6, 9.8, q)], [-0.6, 1.35, 3.0]); }
      if (tc > c3) fx.et.hobby.em(mais(FRENTE, [0.9, 2.05, 0]), tc - tHo);
      fx.simb.em(mais(FRENTE, [-0.6, 2.0, 0.2]), tc - tHo, { tipo: '✗', tam: 0.6 });
    },
    lucas(B, tc) {
      // NA TELA: a academia; a TV no pé com o site "Academia do Beto"; o Lucas e o amigo na frente · MOSTRA: personagem, amigo, tv_academia
      const tD = quando('designer', B, 0.2), tM = quando('Manaus', B, 0.32), tS = quando('seis', B, 0.45), tA = quando('amigo', B, 0.9);
      ve(tvA);
      // PERSONAGEM: o Lucas mostra a TV, orgulhoso · em "amigo": o amigo bate nas costas dele
      menino.colocar(LUCAS_A, tc < tS ? TVA : [-0.3, 1.4, 7]);
      if (tc < tS) { menino.apontar(0.6); menino.humor('feliz'); } else if (tc < tA) { menino.reagir('ombros', tc - tS); } else { menino.reagir('sim', tc - tA); menino.humor('feliz'); }
      amigo.colocar(AMIGO, tc < tA - 0.3 ? [-0.6, 1.4, 7] : cabecaDe(menino, -0.5));
      if (tc > tA - 0.3) amigo.apontar(0.25 + Math.abs(Math.sin((tc - tA) * 9)) * 0.15); else amigo.reagir('sim', tc - B.inicio);
      amigo.humor('feliz');
      // EFEITOS VISUAIS: "Web designer" · "Manaus, AM" · o contador "6 sites · R$ 0" · balão "Valeu, mano!"
      K.som('pingo', tD, 0.5); K.som('errado', tS, 0.5); K.som('estalo', tA + 0.05, 0.6);
      // CÂMERA: (1) até "seis": chegando, perto, frente-esquerda · (2) passando, médio, direita, os dois
      if (tc < tS) {
        { const q = K.suave(pc(tc, B.inicio, tS)); K.mirar([K.lerp(-2.6, -2.1, q), 1.8, K.lerp(6.4, 5.6, q)], [-0.3, 1.45, 0.0]); }
        if (tc < tM) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else fx.et.mao.em(cabecaDe(menino, 0.5), tc - tM);
      } else {
        { const q = K.suave(pc(tc, tS, B.ate)); K.mirar([K.lerp(2.2, 1.4, q), 2.0, 7.0], [-0.1, 1.6, -0.3]); }
        fx.cont.em('6 sites · R$ 0', [0.0, 3.05, -0.9], tc - tS, 'de graça');
        fx.fala.em(cabecaDe(amigo, 0.15), tc - tA, { texto: 'Valeu, mano!' });
      }
    },
    conta(B, tc) {
      // NA TELA: o campo vazio: a fila foi embora, a mesa sem presentes; o Lucas sozinho; a conta de luz cai do céu · MOSTRA: personagem, boleto, mesa_graca
      const tG = quando('ganhou', B, 0.18), tCo = quando('conta', B, 0.82);
      campo(tc, { pilha: false });
      // OBJETOS SE MEXENDO: o boleto cai girando e bate no chão em "conta"
      const tQ = tCo - 0.35, kq = pc(tc, tQ, tCo);
      if (tc > tQ) { ve(boleto); boleto.position.set(BOLETO[0], K.lerp(9, 0, kq * kq), BOLETO[2]); boleto.rotation.set(0, (1 - kq) * 2.5, (1 - kq) * 0.6); }
      // PERSONAGEM: faz "sim", conformado · em "conta": cai sentado
      menino.colocar(FRENTE, [-0.5, 1.5, 9]);
      if (tc < tCo) { menino.reagir('sim', tc - B.inicio); menino.humor('feliz'); } else { menino.reagir('cai_sentado', tc - tCo); menino.humor('assustado'); }
      K.som('whoosh', tQ, 0.6); K.som('baque', tCo, 0.8); K.som('errado', tCo + 0.15, 0.5);
      // CÂMERA: (1) até "conta": chegando, médio, frente · (2) de baixo, aberto, o boleto gigante e ele caído
      if (tc < tQ) {
        { const q = K.suave(pc(tc, B.inicio, tQ)); K.mirar([K.lerp(-0.2, -0.5, q), 2.0, K.lerp(11.8, 10.6, q)], [-0.5, 1.35, 3.2]); }
        fx.et.exp.em(mais(FRENTE, [0, 2.1, 0]), tc - tG);
      } else {
        { const q = K.suave(pc(tc, tQ, B.ate)); K.mirar([K.lerp(1.0, 0.7, q), 0.8, K.lerp(11.4, 10.6, q)], [-0.1, 1.7, 3.8]); }
        fx.et.luz.em(mais(BOLETO, [0, 3.2, 0.1]), tc - tCo - 0.1);
        fx.onda.em(mais(BOLETO, [0, 0.02, 0]), tc - tCo, { raio: 2.2 });
        fx.poof.em(cabecaDe(menino, 0.0), tc - tCo - 0.3, { escala: 0.5 });
      }
    },
    investe(B, tc) {
      // NA TELA: o estúdio claro com a mesa do Lucas; o Lucas de pé com a cuia de tacacá; a cuia vai pro monitor e some · MOSTRA: personagem, tacaca, monitor
      const tI = quando('investir', B, 0.2), tT = quando('tacacá', B, 0.4), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      ve(comp, tacaca, quadroL.m, rede);
      const k = pc(tc, tS, tS + 0.8);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10));
      // PERSONAGEM: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [1.2, 1.3, 8]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: a cuia na mão em "investir"; em "sistema", desliza até o monitor girando e some num poof
      const m = menino.mao(1);
      if (tc < tS) { tacaca.position.set(m[0] + 0.05, m[1] - 0.12, m[2] + 0.12); tacaca.rotation.set(0, tc * 0.6, 0); tacaca.scale.setScalar(1.4 * pop(tc - tI)); }
      else {
        const q = K.suave(k), mesaY = 0.79;
        tacaca.position.set(K.lerp(m[0], MONITOR[0] + 0.1, q), q < 0.3 ? K.lerp(m[1] - 0.12, mesaY, q / 0.3) : mesaY + Math.max(0, (q - 0.8) * 1.5), K.lerp(m[2], MONITOR[2] + 0.3, q));
        tacaca.rotation.set(0, q * 7, 0); tacaca.scale.setScalar(1.4 * (1 - q * 0.8)); if (q >= 1) tacaca.visible = false;
      }
      fx.poof.em(mais(MONITOR, [0.1, 0, 0.3]), tc - tS - 0.8, { escala: 0.8 });
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.75, 0]), tc - tPr);
      K.som('ding', tT, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.8, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, frente-esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), tacaca.position.toArray()], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [tacaca.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -10, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das clínicas de estética de Manaus sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tCl = quando('clínicas', B, 0.5), tMa = quando('Manaus', B, 0.7);
      ve(comp, navG, quadroL.m, rede); comp.tela.desenhar(siteLucas, 'port');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tCl ? 1 + Math.floor((tc - tCl) / 0.25) : 0;
        telaC.mostrar('listaClin', { n: Math.min(4, n), sel: n >= 2 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tCl + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a lista
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 8]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.mao2.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tMa);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o estúdio azul-escuro; no pedestal, o painel gigante com a análise da Bella Pele e depois a mensagem; o Lucas com o holofote · MOSTRA: tela, personagem
      const tM = quando('Mappoa', B, 0.1), tCh = quando('chance', B, 0.4), tMe = quando('mensagem', B, 0.8), tPo = quando('pronta', B, 0.92);
      ve(telaM);
      // ENTRA AGORA: o painel sobe do pedestal em "Mappoa"
      const kS = K.suave(pc(tc, tM - 0.25, tM + 0.35));
      telaM.g.position.set(TELA_P[0], K.lerp(0.4, TELA_P[1], kS), TELA_P[2]); telaM.g.scale.set(1, Math.max(0.05, kS), 1); telaM.g.rotation.set(0, 0.12, 0);
      if (tc < tMe) { const ate = tc > tM + 0.3 ? Math.min(4, 1 + Math.floor((tc - tM - 0.3) / 0.35)) : 0; telaM.mostrar('analiseBella', { a: Math.round(pc(tc, tM, tM + 0.9) * 0.92 * 20) / 20, ate }); }
      else telaM.mostrar('msgBella', { d: Math.round(pc(tc, tMe, tPo + 0.3) * 20) / 20 });
      fx.holo.em(LUCAS_P, { abertura: 1.0 });
      // PERSONAGEM: surpreso · em "chance": aponta o score · em "mensagem": braços pra cima
      menino.colocar(LUCAS_P, tc > tMe ? [1.4, 1.4, 7] : TELA_P);
      if (tc > tMe) menino.reagir('comemorando', tc - tMe); else if (tc > tCh) menino.apontar(0.55); else menino.reagir('surpreso', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.som('brilho', tM, 0.6); K.som('certo', tPo, 0.5);
      // CÂMERA: (1) até "mensagem": subindo, médio, frente-esquerda · (2) chegando, perto, direita, a mensagem
      if (tc < tMe) { const q = K.suave(pc(tc, B.inicio, tMe)); K.mirar([K.lerp(-1.6, -1.2, q), K.lerp(1.2, 2.1, q), K.lerp(7.6, 7.0, q)], [0.25, 1.9, -0.1]); }
      else { const q = K.suave(pc(tc, tMe, B.ate)); K.mirar([K.lerp(2.0, 1.6, q), 2.0, K.lerp(5.6, 5.0, q)], [0.1, 1.95, -0.2]); }
      if (tc < tMe) fx.et.chance.em(mais(TELA_P, [0.4, 1.75, 0.4]), tc - tCh); else fx.et.pronta.em(mais(TELA_P, [0.4, 1.75, 0.4]), tc - tPo);
    },
    mensagem(B, tc) {
      // NA TELA: (1) a mesa do Lucas: a mensagem pronta pra Bella Pele, ele aperta enviar · (2) em "doutora": a CLÍNICA BELLA PELE, a doutora Yara com o celular gigante · MOSTRA: dona, celular, placa_bella
      const tMa = quando('mandou', B, 0.08), tIn = quando('Instagram', B, 0.55), tDo = quando('doutora', B, 0.72), tRe = quando('respondeu', B, 0.88);
      if (tc < tDo) {
        ve(comp, telaC, quadroL.m, rede); comp.tela.desenhar(siteLucas, 'port');
        telaC.mostrar('msgBella', { d: 1 });
        // PERSONAGEM: o Lucas aponta o botão de enviar
        menino.colocar([-0.65, 0, 1.95], TELA_Q); if (tc > tMa) menino.apontar(0.4); else menino.reagir('sim', tc - B.inicio);
        fx.et.insta.em(mais(TELA_Q, [0, 1.45, 0.2]), tc - tIn);
        K.som('clique', tMa + 0.3, 0.6); K.som('whoosh', tMa + 0.35, 0.4);
        // CÂMERA: (1) chegando, perto, frente, na tela e no Lucas
        K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tDo), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
      } else {
        ve(placaBella.m, cel); cel.position.set(...CEL); cel.rotation.set(0, 0.45, 0);
        celTela(cel, (c, w, h) => celZap(c, w, h, { resp: tc > tRe }), 'z' + (tc > tRe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tDo);
        // PERSONAGEM: a doutora lê, surpresa · em "respondeu": comemora
        yara.colocar(YARA_M, tc < tRe ? mais(CEL, [0, 1.3, 0]) : [0.2, 1.4, 7]);
        if (tc > tRe) yara.reagir('comemorando', tc - tRe); else yara.reagir('surpreso', tc - tDo);
        fx.fala.em(cabecaDe(yara, 0.15), tc - tRe, { texto: 'Me manda um orçamento!' });
        K.som('pingo', tDo + 0.05, 0.6); K.som('certo', tRe, 0.6);
        // CÂMERA: (2) passando, perto, no celular e na doutora
        { const q = K.suave(pc(tc, tDo, B.ate)); K.mirar([K.lerp(-0.4, 0.1, q), 1.75, 5.0], [-1.7, 1.45, 0.7]); }
        fx.simb.em(mais(YARA_M, [0.45, 2.3, 0.3]), tc - tRe - 0.2, { tipo: '✓' });
      }
    },
    fechou(B, tc) {
      // NA TELA: dentro da Bella Pele; a TV com o site novo (agenda online); o Lucas e a doutora apertando a mão; o orçamento com o carimbo PAGO · MOSTRA: tv_site, dona, personagem
      const tT = quando('topou', B, 0.3), tPg = quando('pago', B, 0.65), tAg = quando('agenda', B, 0.85);
      ve(tvG, contrato, mesinha, placaBella.m);
      const nB = tc < tAg ? 0 : Math.min(6, 1 + Math.floor((tc - tAg) / 0.12));
      const ag = tc > tAg + 0.5 && Math.floor((tc - tAg) * 6) % 2 === 0;
      tvT.desenhar((c, w, h) => siteBella(c, w, h, { n: nB, ag }), 'tv' + nB + (ag ? 'a' : ''));
      const kc = pc(tc, tT, tT + 0.25);
      contratoT.desenhar((c, w, h) => contratoDesenho(c, w, h, kc), 'k' + Math.round(kc * 8));
      // PERSONAGEM: o aperto de mão · em "pago": o Lucas comemora, a doutora mostra a TV
      if (tc < tPg) {
        menino.colocar(LUCAS_S, mais(YARA_S, [0, 1.2, 0])); menino.apontar(0.25); menino.humor('feliz');
        yara.colocar(YARA_S, mais(LUCAS_S, [0, 1.2, 0])); yara.apontar(0.25); yara.humor('feliz');
      } else {
        menino.colocar(LUCAS_S, [0.2, 1.4, 6]); menino.reagir('comemorando', tc - tPg);
        yara.colocar(YARA_S, TV_S); yara.reagir('mostrando', tc - tPg);
      }
      K.som('baque', tT + 0.2, 0.6); K.som('certo', tT + 0.3, 0.5); K.som('ding', tAg, 0.6);
      // CÂMERA: (1) até "pago": passando, perto, direita, no papel e nos dois · (2) chegando, médio, frente, na TV
      if (tc < tPg) {
        { const q = K.suave(pc(tc, B.inicio, tPg)); K.mirar([K.lerp(3.2, 2.4, q), 2.0, 5.6], [0.3, 1.2, 0.9]); }
      } else {
        { const q = K.suave(pc(tc, tPg, B.ate)); K.mirar([0.3, 2.1, K.lerp(7.6, 6.8, q)], [0.3, 1.7, -0.4]); }
        fx.et.pago.em(mais(TV_S, [0, 1.0, 0.3]), tc - tPg);
        fx.simb.em(mais(TV_S, [0.95, 0.5, 0.3]), tc - tAg, { tipo: '✓', tam: 0.6 });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o campo com a fila e o Lucas entregando presente · (2) Agora: a fila sumiu, a faixa virou "SITES · ORÇAMENTO" e a doutora aperta a mão do Lucas · MOSTRA: mesa_graca, personagem
      const tA = quando('Agora', B, 0.45), tCo = quando('cobra', B, 0.92);
      if (tc < tA) {
        campo(tc, { fila: true });
        menino.colocar(LUCAS_C, cabecaDe(figs[0], -0.3)); menino.apontar(0.5); menino.reagir('cansado', tc - B.inicio);
        entrega(pc(tc, B.inicio + 0.2, B.inicio + 0.9));
        fx.et.antes.em(mais(MESA, [0, 3.2, 0]), tc - B.inicio - 0.1);
        fx.simb.em(mais(MESA, [1.0, 3.0, 0.2]), tc - B.inicio - 0.4, { tipo: '✗', tam: 0.6 });
        K.som('errado', B.inicio + 0.3, 0.4);
        // CÂMERA: (1) parado, médio, de lado, a mesa e a fila
        K.mirar([3.8, 2.2, 5.6], [-0.4, 1.2, 0.8]);
      } else {
        campo(tc, { cobra: true, pilha: false });
        const L = [-1.45, 0, 4.5], Y = [-0.55, 0, 4.5];
        if (tc < tCo) { menino.colocar(L, mais(Y, [0, 1.2, 0])); menino.apontar(0.25); yara.colocar(Y, mais(L, [0, 1.2, 0])); yara.apontar(0.25); }
        else { menino.colocar(L, [-0.6, 1.4, 9]); menino.reagir('comemorando', tc - tCo); yara.colocar(Y, [-0.6, 1.4, 9]); yara.reagir('aplaudindo', tc - tCo); }
        menino.humor('feliz'); yara.humor('feliz');
        fx.poof.em(mais(MESA, [0, 2.6, 0.4]), tc - tA, { escala: 0.9 });
        fx.et.cobra.em(mais(MESA, [0, 3.3, 0.3]), tc - tCo);
        fx.simb.em(mais(Y, [0.5, 2.0, 0.2]), tc - tCo - 0.2, { tipo: '✓', tam: 0.6 });
        K.som('certo', tA + 0.1, 0.5); K.som('festa', tCo, 0.4);
        // CÂMERA: (2) chegando, médio, de frente, a mesa nova
        { const q = K.suave(pc(tc, tA, B.ate)); K.mirar([-0.6, 2.0, K.lerp(10.8, 9.8, q)], [-0.9, 1.7, 3.4]); }
      }
    },
    segue(B, tc) {
      // NA TELA: a mesa do Lucas; o Lucas de pé; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG, quadroL.m, rede); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteLucas, 'port');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.0, 0, 1.4); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [1.0, 1.4, 8]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
      else K.filmar([navG, comp, menino, robo], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo, quadroL.m, rede); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteLucas, 'port');
      robo.g.position.set(-1.0, 0, 1.4); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [1.0, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      // o Lucas na frente da mesa cheia de presentes, mão na testa, e a fila sem fim atrás
      campo(0.5, { fila: true });
      menino.colocar(FRENTE, [-0.6, 1.5, 9]); menino.reagir('mao_na_testa', 0.6); menino.humor('triste');
      K.mirar([-1.0, 2.3, 11.6], [-0.75, 1.7, 1.0]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'campo' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, amigo, yara].forEach((b) => { b.g.visible = false; b.g.scale.set(1, 1, 1); b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    if (fx.holo) fx.holo.esconder();
    menino.g.position.y = 0; menino.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(...TELA_P); telaM.g.rotation.set(0, 0, 0);
    boleto.position.set(...BOLETO); boleto.rotation.set(0, 0, 0);
    cel.scale.setScalar(1.5);
    tacaca.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
