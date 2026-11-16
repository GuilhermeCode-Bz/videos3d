// O portfólio só com o site do primo (canal Mappoa).
// Cinco lugares (K.cenarios): o palco de show (a tela gigante do portfólio, com o primo em pé DENTRO dela, e a cliente
// na mesa de jurada), o fundo laranja infinito (o círculo "sem portfólio / sem cliente"), a agência coberta como
// COWORKING (a mesa do Rafa), a fachada da pizzaria coberta como SMASH BAHIA e a pizzaria por dentro como a Smash Bahia.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, primo, dona, jorge, robo, comp, cel, cadeira, telaC, telaM, navG, acaraje, contrato, contratoT, tvT, tvG;
  let port, portT, mesaJ, cadJ, placaPort, placaCli, setas, smashFora, smashDentro, burger, cowork, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Palco: a tela do portfólio no meio (abertura de 4,4 x 3 m, de y 0,75 a 3,75, em z -2); o primo em pé na borda de baixo
  const PW = 3.0, PH = 4.0, PY = 0.75, PZ = -2.0;
  const P_TL = [-PW / 2, PY + PH, PZ], P_BR = [PW / 2, PY, PZ], P_CEN = [0, PY + PH / 2, PZ];
  const PRIMO = [-0.6, PY, -1.72], SLOT2 = [0, 3.55, PZ - 0.1];
  const RAFA_P = [-1.45, 0, 0.5], DONA_P = [1.9, 0, 2.5];
  const DIR_D = (() => { const dx = -DONA_P[0], dz = PZ - DONA_P[2], n = Math.hypot(dx, dz); return [dx / n, dz / n]; })();
  const MESA_J = [DONA_P[0] + DIR_D[0] * 0.8, 0, DONA_P[2] + DIR_D[1] * 0.8];
  const CAM_DONA = [4.1, 1.75, -1.0];
  const TELA_P = [-0.5, 1.95, 0.3], RAFA_M = [0.75, 0, 1.0];
  // Coworking (agência): o computador virado pra +z, a cadeira na frente
  const COMP = [0.4, 0, 0.2], MONITOR = [0.4, 1.185, 0.08], SEAT = [0.4, 0, 0.88];
  const EM_PE = [1.55, 0, 1.05], TELA_Q = [-0.1, 1.45, 1.1], NAV = [0.55, 2.95, 0.55];
  // Fachada da Smash Bahia (a porta em x 1,6) e dentro dela (o balcão em z -2,6)
  const JORGE_FORA = [0.5, 0, 1.3], CEL_FORA = [-0.7, 0, 1.15];
  const TV_S = [-0.6, 2.6, -4.3], CONTRATO = [0.75, 1.14, -2.3], BURGER = [1.45, 1.12, -2.35], JORGE_D = [0.05, 0, -1.65], RAFA_D = [-1.05, 0, -1.5];
  // O círculo (vazio laranja)
  const CIRC = [0, 0, 0.3], RAIO = 1.15, PL_PORT = [-1.3, 0, -1.3], PL_CLI = [1.3, 0, -1.3];

  const LUGAR = {
    gancho: 'show', rafa: 'show', ciclo: 'loop', investe: 'mesa', lista: 'mesa', mappoa: 'show', fechou: 'smash',
    vira: 'show', antes_agora: 'show', segue: 'mesa', cartao: 'mesa', capa: 'show'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'mensagem') return tc < quando('Jorge', B, 0.75) ? 'mesa' : 'fora';
    return LUGAR[B.plano] || 'mesa';
  }

  const HAMBS = [
    { nome: 'Smash Bahia', end: 'Rio Vermelho', chips: ['whats', 'insta'], site: false },
    { nome: 'Burger do Farol', end: 'Barra', chips: ['tel', 'site'], site: true },
    { nome: 'Pelô Burger', end: 'Pelourinho', chips: ['insta'], site: false },
    { nome: 'Brasa Itapuã', end: 'Itapuã', chips: ['whats', 'site'], site: true }
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
  const plano = (larg, alt, px, fn, transp) => { const t = K.telaCanvas(larg, alt, px); if (transp) { t.m.material.transparent = true; } t.desenhar(fn, 'x'); return t; };
  const caixa = (pai, d, mat, p) => { const m = K.malha(new THREE.BoxGeometry(...d), mat); m.position.set(...p); pai.add(m); return m; };

  // ---------- Desenhos ----------
  function burgerDesenho(c, x, y, r) {
    c.fillStyle = '#e9a23b'; c.beginPath(); c.arc(x, y - r * 0.15, r, PI, 2 * PI); c.fill();
    rr(c, x - r * 1.05, y - r * 0.1, r * 2.1, r * 0.22, r * 0.1, '#3fa34d');
    rr(c, x - r * 1.0, y + r * 0.08, r * 2.0, r * 0.18, r * 0.06, '#ffc928');
    rr(c, x - r * 1.0, y + r * 0.22, r * 2.0, r * 0.32, r * 0.14, '#5a3420');
    rr(c, x - r * 0.95, y + r * 0.56, r * 1.9, r * 0.32, r * 0.14, '#e9a23b');
    c.fillStyle = '#fff6dc'; [[-0.4, -0.6], [0.1, -0.75], [0.5, -0.5], [-0.1, -0.4]].forEach(([a, b]) => { c.beginPath(); c.ellipse(x + a * r, y + b * r, r * 0.07, r * 0.035, 0.4, 0, 2 * PI); c.fill(); });
  }
  // O site novo da Smash Bahia (na TV e no cartão do portfólio): e.n = quantos burgers do cardápio, e.zap = o botão aceso
  function siteSmash(c, w, h, e = {}) {
    c.fillStyle = '#1d1a17'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#ffc928'; c.fillRect(0, 0, w, h * 0.17);
    txt(c, 'SMASH BAHIA', w * 0.05, h * 0.085, h * 0.09, '#1d1a17', 900, 'left', w * 0.6);
    ['Cardápio', 'Onde fica'].forEach((s, i) => txt(c, s, w * (0.74 + i * 0.15), h * 0.085, h * 0.045, '#1d1a17', 800, 'center'));
    txt(c, 'O smash mais', w * 0.05, h * 0.29, h * 0.075, '#ffffff', 900, 'left', w * 0.55);
    txt(c, 'baiano do Rio Vermelho', w * 0.05, h * 0.38, h * 0.05, '#ffc928', 800, 'left', w * 0.55);
    burgerDesenho(c, w * 0.8, h * 0.33, h * 0.13);
    const n = e.n == null ? 3 : e.n;
    ['Smash Duplo', 'Acarajé Burger', 'Cheddar Bahia'].forEach((s, i) => {
      if (i >= n) return;
      const x = w * (0.05 + i * 0.31);
      rr(c, x, h * 0.5, w * 0.28, h * 0.3, h * 0.03, '#2c2824');
      burgerDesenho(c, x + w * 0.14, h * 0.62, h * 0.07);
      txt(c, s, x + w * 0.14, h * 0.74, h * 0.04, '#ffffff', 800, 'center', w * 0.26);
    });
    rr(c, w * 0.25, h * 0.85, w * 0.5, h * 0.1, h * 0.05, e.zap ? '#2fd66b' : '#25b05a');
    txt(c, 'Pedir no WhatsApp', w * 0.5, h * 0.9, h * 0.048, '#ffffff', 900, 'center', w * 0.46);
  }
  // A tela do portfólio: e.n = número de projetos, e.novo = 0 a 1 (o cartão da Smash entrando)
  function portfolioTela(c, w, h, e = {}) {
    c.fillStyle = '#eef3f8'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.11);
    txt(c, 'Rafa Web', w * 0.05, h * 0.04, h * 0.042, '#ffffff', 900, 'left', w * 0.5);
    txt(c, 'Portfólio', w * 0.05, h * 0.08, h * 0.03, '#e0fffb', 800, 'left', w * 0.5);
    rr(c, w * 0.56, h * 0.025, w * 0.4, h * 0.06, h * 0.03, '#ffffff');
    txt(c, `Projetos: ${e.n || 1}`, w * 0.76, h * 0.056, h * 0.036, (e.n || 1) > 1 ? '#1faa52' : '#e8352b', 900, 'center', w * 0.38);
    // cartão 2 (em cima): vazio (?) ou a Smash Bahia
    const k = e.novo || 0, x0 = w * 0.05, y0 = h * 0.13, cw = w * 0.9, ch = h * 0.34;
    c.setLineDash([18, 14]); c.strokeStyle = '#9aa5ae'; c.lineWidth = 6; c.beginPath(); c.roundRect(x0, y0, cw, ch, 18); c.stroke(); c.setLineDash([]);
    if (k < 0.05) { txt(c, '?', x0 + cw / 2, y0 + ch * 0.42, ch * 0.55, '#b9c2ca', 900, 'center'); txt(c, 'Projeto 2', x0 + cw / 2, y0 + ch * 0.86, h * 0.032, '#9aa5ae', 800, 'center'); }
    else {
      c.save(); c.translate(x0 + cw / 2, y0 + ch / 2); const s = K.saiVolta(K.clamp(k)); c.scale(s, s); c.translate(-cw / 2, -ch / 2);
      rr(c, 0, 0, cw, ch, 18, '#ffffff');
      c.save(); c.beginPath(); c.roundRect(cw * 0.02, ch * 0.17, cw * 0.96, ch * 0.8, 10); c.clip(); c.translate(cw * 0.02, ch * 0.17); siteSmash(c, cw * 0.96, ch * 0.8, { n: 3 }); c.restore();
      rr(c, 0, 0, cw, ch * 0.15, 18, '#1faa52'); txt(c, 'Smash Bahia', cw / 2, ch * 0.075, ch * 0.1, '#ffffff', 900, 'center', cw * 0.9);
      c.restore();
      if (k > 0.6) { c.save(); c.translate(x0 + cw * 0.9, y0 + ch * 0.05); c.rotate(0.3); rr(c, -w * 0.1, -h * 0.025, w * 0.2, h * 0.05, h * 0.025, '#e8352b'); txt(c, 'NOVO', 0, 0, h * 0.03, '#ffffff', 900, 'center'); c.restore(); }
    }
    // cartão 1 (embaixo): o lava-jato do primo (o primo fica em pé na frente dele, à esquerda)
    rr(c, w * 0.05, h * 0.5, w * 0.9, h * 0.47, 18, '#cfe6ff');
    rr(c, w * 0.05, h * 0.5, w * 0.9, h * 0.065, 18, '#ff8a1e');
    txt(c, 'Lava-Jato do Primo', w * 0.93, h * 0.533, h * 0.034, '#ffffff', 900, 'right', w * 0.5);
    c.fillStyle = 'rgba(47,111,214,.22)'; for (let i = 0; i < 12; i++) { c.beginPath(); c.arc(w * (0.12 + (i % 4) * 0.24), h * (0.62 + Math.floor(i / 4) * 0.12), h * 0.035, 0, 2 * PI); c.fill(); }
    txt(c, 'Projeto 1', w * 0.93, h * 0.6, h * 0.028, '#2f6fd6', 800, 'right', w * 0.4);
  }
  // O portfólio pequeno do Rafa (no monitor dele, deitado)
  function siteRafa(c, w, h) {
    c.fillStyle = '#eef3f8'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.25);
    txt(c, 'Rafa Web · Portfólio', w * 0.05, h * 0.125, h * 0.1, '#ffffff', 900, 'left', w * 0.9);
    rr(c, w * 0.05, h * 0.35, w * 0.42, h * 0.55, 10, '#cfe6ff'); txt(c, 'Lava-Jato do Primo', w * 0.26, h * 0.62, h * 0.065, '#2f6fd6', 900, 'center', w * 0.4);
    c.setLineDash([10, 8]); c.strokeStyle = '#9aa5ae'; c.lineWidth = 4; c.beginPath(); c.roundRect(w * 0.53, h * 0.35, w * 0.42, h * 0.55, 10); c.stroke(); c.setLineDash([]);
    txt(c, '?', w * 0.74, h * 0.62, h * 0.25, '#b9c2ca', 900, 'center');
  }
  function telaoTexto(c, w, h) {
    const d = c.createLinearGradient(0, 0, w, h); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, 'PORTFÓLIO', w / 2, h / 2, h * 0.36, '#ffffff', 900, 'center', w * 0.92);
  }
  // O telão com a lista do Mappoa (hamburguerias de Salvador, com e sem site)
  function telaoLista(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, 'Hamburguerias · Salvador, BA', w * 0.04, h * 0.1, h * 0.08, '#ffffff', 900, 'left', w * 0.7);
    rr(c, w * 0.72, h * 0.04, w * 0.24, h * 0.12, h * 0.06, '#2fb5a6'); txt(c, '148 empresas', w * 0.84, h * 0.1, h * 0.055, '#ffffff', 900, 'center', w * 0.22);
    HAMBS.forEach((b, i) => {
      if (i >= (e.n || 0)) return;
      const y = h * (0.24 + i * 0.19);
      rr(c, w * 0.04, y, w * 0.92, h * 0.16, h * 0.03, i === 0 ? '#16406e' : '#123459');
      txt(c, b.nome, w * 0.07, y + h * 0.08, h * 0.07, '#ffffff', 800, 'left', w * 0.5);
      txt(c, b.end, w * 0.5, y + h * 0.08, h * 0.05, '#9fb6d3', 700, 'left', w * 0.2);
      rr(c, w * 0.76, y + h * 0.035, w * 0.17, h * 0.09, h * 0.045, b.site ? '#e6f0ff' : '#fff4dc');
      txt(c, b.site ? 'com site' : 'sem site', w * 0.845, y + h * 0.08, h * 0.045, b.site ? '#1454c0' : '#d97706', 900, 'center', w * 0.16);
    });
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
    txt(c, 'Rafa · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, seu Jorge! Vi o Insta', 'da Smash Bahia: os burgers', 'são lindos, mas não achei', 'um site com o cardápio.', 'Posso te mostrar uma ideia?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) {
      rr(c, w * 0.17, h * 0.56, w * 0.78, h * 0.12, 16, '#d9fdd3');
      txt(c, 'Quero um site!', w * 0.21, h * 0.62, w * 0.065, '#111b21', 700, 'left', w * 0.7);
    }
  }
  function contratoDesenho(c, w, h, k) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, 'CONTRATO', w / 2, h * 0.1, w * 0.12, '#1b2733', 900, 'center', w * 0.9);
    txt(c, 'Site novo · Smash Bahia', w / 2, h * 0.19, w * 0.06, '#5b6470', 700, 'center', w * 0.9);
    for (let i = 0; i < 8; i++) rr(c, w * 0.1, h * (0.28 + i * 0.06), w * (0.55 + (i % 3) * 0.1), h * 0.018, 2, '#c3cad2');
    c.strokeStyle = '#1b2733'; c.lineWidth = 3; c.beginPath(); c.moveTo(w * 0.55, h * 0.86); c.bezierCurveTo(w * 0.65, h * 0.78, w * 0.7, h * 0.92, w * 0.85, h * 0.84); c.stroke();
    if (k > 0) {
      c.save(); c.translate(w * 0.5, h * 0.62); c.rotate(-0.25); c.scale(1 + (1 - k) * 1.5, 1 + (1 - k) * 1.5); c.globalAlpha = Math.min(1, k * 1.5);
      c.strokeStyle = '#e8352b'; c.lineWidth = w * 0.025; c.strokeRect(-w * 0.36, -h * 0.07, w * 0.72, h * 0.14);
      txt(c, 'FECHADO', 0, 0, w * 0.13, '#e8352b', 900, 'center'); c.restore();
    }
  }

  // ---------- Peças feitas aqui ----------
  // A tela gigante do portfólio (frente pra +z): a moldura, a borda de baixo onde o primo pisa e o pé
  function fazPortfolio() {
    const g = new THREE.Group(), preto = K.mat(0x1b1f26, { roughness: 0.4, metalness: 0.2 });
    portT = K.telaCanvas(PW, PH, 900); portT.m.position.set(0, PY + PH / 2, -0.12); portT.m.material.toneMapped = false; g.add(portT.m);
    caixa(g, [PW + 0.6, 0.3, 0.5], preto, [0, PY + PH + 0.15, 0]);
    caixa(g, [0.3, PH + 0.6, 0.5], preto, [-PW / 2 - 0.15, PY + PH / 2, 0]);
    caixa(g, [0.3, PH + 0.6, 0.5], preto, [PW / 2 + 0.15, PY + PH / 2, 0]);
    caixa(g, [PW + 0.6, 0.12, 0.9], preto, [0, PY - 0.06, 0.15]);
    caixa(g, [PW + 0.6, PH + 0.6, 0.1], preto, [0, PY + PH / 2, -0.22]);
    caixa(g, [0.6, PY - 0.1, 0.4], preto, [0, (PY - 0.1) / 2, -0.1]);
    caixa(g, [2.4, 0.08, 1.3], preto, [0, 0.04, 0]);
    const cam = K.malha(new THREE.SphereGeometry(0.07, 12, 8), K.mat(0x4fe3ff, { emissive: 0x4fe3ff, emissiveIntensity: 0.8 })); cam.position.set(0, PY + PH + 0.15, 0.26); g.add(cam);
    return g;
  }
  // O acarajé no papel (o investimento)
  function fazAcaraje() {
    const g = new THREE.Group();
    const papel = K.malha(new THREE.BoxGeometry(0.42, 0.01, 0.42), K.mat(0xf6f1e4)); papel.position.y = 0.005; papel.rotation.y = 0.5; g.add(papel);
    [-1, 1].forEach((l) => { const m = K.malha(new THREE.SphereGeometry(0.15, 18, 12, 0, PI), K.mat(0xc46a22, { roughness: 0.85 })); m.scale.set(1.15, 0.7, 0.75); m.rotation.set(-PI / 2 + l * 0.35, 0, 0); m.position.set(0, 0.1, l * 0.035); g.add(m); });
    const vat = K.malha(new THREE.SphereGeometry(0.12, 14, 10), K.mat(0xf2b52a, { roughness: 0.7 })); vat.scale.set(1.1, 0.45, 0.5); vat.position.set(0, 0.13, 0); g.add(vat);
    for (let i = 0; i < 3; i++) { const cam = K.malha(new THREE.TorusGeometry(0.035, 0.014, 6, 12, PI * 1.3), K.mat(0xff7a4a)); cam.position.set(-0.08 + i * 0.08, 0.17, 0); cam.rotation.set(0, 0, i); g.add(cam); }
    const ver = K.malha(new THREE.BoxGeometry(0.2, 0.02, 0.05), K.mat(0x3a9a3a)); ver.position.set(0.02, 0.16, 0.02); g.add(ver);
    return g;
  }
  // O hambúrguer gigante (no balcão e no lugar do ícone da pizzaria)
  function fazBurger() {
    const g = new THREE.Group();
    const pao = K.mat(0xe2a040, { roughness: 0.6 });
    const topo = K.malha(new THREE.SphereGeometry(0.3, 24, 14, 0, 2 * PI, 0, PI / 2), pao); topo.scale.set(1, 0.7, 1); topo.position.y = 0.36; g.add(topo);
    const alf = K.malha(new THREE.CylinderGeometry(0.33, 0.33, 0.03, 24), K.mat(0x3fa34d)); alf.position.y = 0.34; g.add(alf);
    const quei = K.malha(new THREE.BoxGeometry(0.5, 0.025, 0.5), K.mat(0xffc928)); quei.position.y = 0.31; quei.rotation.y = 0.4; g.add(quei);
    const carne = K.malha(new THREE.CylinderGeometry(0.31, 0.31, 0.1, 24), K.mat(0x5a3420, { roughness: 0.9 })); carne.position.y = 0.24; g.add(carne);
    const base = K.malha(new THREE.CylinderGeometry(0.29, 0.27, 0.12, 24), pao); base.position.y = 0.13; g.add(base);
    for (let i = 0; i < 7; i++) { const s = K.malha(new THREE.SphereGeometry(0.02, 6, 5), K.mat(0xfff6dc)); const a = i * 0.9; s.position.set(Math.cos(a) * 0.17, 0.53 + (i % 2) * 0.01, Math.sin(a) * 0.17); g.add(s); }
    return g;
  }
  // As placas do círculo, num poste
  function fazPlacaPoste(texto, cor) {
    const g = new THREE.Group();
    const poste = K.malha(new THREE.CylinderGeometry(0.06, 0.08, 2.6, 10), K.mat(0x2a2e33)); poste.position.y = 1.3; g.add(poste);
    const p = K.placa(texto, { larg: 1.75, alt: 0.6, fundo: cor, cor: '#ffffff', borda: '#ffffff' }); p.position.set(0, 2.6, 0.08); g.add(p);
    return g;
  }
  // As duas setas curvas no chão, girando em volta do círculo
  function fazSetas() {
    const g = new THREE.Group(), m = K.mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.35 });
    [0, PI].forEach((a0) => {
      const arco = K.malha(new THREE.TorusGeometry(1.75, 0.09, 8, 40, PI * 0.72), m); arco.rotation.set(-PI / 2, 0, a0); arco.position.y = 0.06; g.add(arco);
      const ang = a0 + PI * 0.72, ponta = K.malha(new THREE.ConeGeometry(0.26, 0.5, 14), m);
      ponta.position.set(Math.cos(ang) * 1.75, 0.08, -Math.sin(ang) * 1.75); ponta.rotation.set(PI / 2, 0, 0); ponta.rotation.order = 'YXZ'; ponta.rotation.y = ang + PI; g.add(ponta);
    });
    return g;
  }
  // A cara da Smash Bahia por cima da fachada da pizzaria (a placa, as vitrines, o ícone e o cavalete)
  function fazSmashFora() {
    const g = new THREE.Group(), DX = 1.6;
    const placa = plano(5.9, 0.78, 900, (c, w, h) => { rr(c, 0, 0, w, h, h * 0.2, '#ffc928'); txt(c, 'SMASH BAHIA', w / 2, h * 0.53, h * 0.6, '#1d1a17', 900, 'center', w * 0.92); });
    placa.m.position.set(0, 3.55, 0.25); g.add(placa.m);
    const b = fazBurger(); b.scale.setScalar(1.6); b.position.set(-3.9, 2.7, 0.75); g.add(b);
    const cartaz = plano(5.25, 2.5, 700, (c, w, h) => {
      c.fillStyle = '#1d1a17'; c.fillRect(0, 0, w, h);
      txt(c, 'SMASH', w * 0.06, h * 0.25, h * 0.2, '#ffc928', 900, 'left', w * 0.5); txt(c, 'BURGER', w * 0.06, h * 0.45, h * 0.2, '#ffffff', 900, 'left', w * 0.5);
      txt(c, 'Rio Vermelho · Salvador', w * 0.06, h * 0.65, h * 0.07, '#ffc928', 700, 'left', w * 0.5);
      burgerDesenho(c, w * 0.75, h * 0.48, h * 0.25);
    });
    cartaz.m.position.set(-2.0, 1.78, 0.085); g.add(cartaz.m);
    const p2 = plano(2.1, 2.5, 300, (c, w, h) => { c.fillStyle = '#ffc928'; c.fillRect(0, 0, w, h); txt(c, 'PEÇA', w / 2, h * 0.3, h * 0.12, '#1d1a17', 900, 'center'); txt(c, 'PELO', w / 2, h * 0.45, h * 0.12, '#1d1a17', 900, 'center'); txt(c, 'INSTA', w / 2, h * 0.62, h * 0.14, '#c13584', 900, 'center'); });
    p2.m.position.set(3.6, 1.78, 0.085); g.add(p2.m);
    const cav = new THREE.Group(); cav.position.set(DX + 2.3, 0, 1.6); cav.rotation.y = -0.35; g.add(cav);
    const q = plano(0.66, 0.86, 200, (c, w, h) => { c.fillStyle = '#2a2e33'; c.fillRect(0, 0, w, h); txt(c, 'SMASH', w / 2, h * 0.3, w * 0.2, '#ffc928', 900, 'center'); txt(c, 'DUPLO', w / 2, h * 0.5, w * 0.2, '#ffffff', 900, 'center'); txt(c, 'HOJE', w / 2, h * 0.72, w * 0.14, '#ffc928', 800, 'center', w * 0.9); });
    q.m.position.set(0, 0.62, 0.14); q.m.rotation.x = -0.18; cav.add(q.m);
    return g;
  }
  // Dentro da Smash Bahia: a placa por cima do letreiro PIZZA
  function fazSmashDentro() {
    const g = new THREE.Group();
    const p = plano(3.0, 0.95, 600, (c, w, h) => { rr(c, 0, 0, w, h, h * 0.2, '#1d1a17'); txt(c, 'SMASH BAHIA', w / 2, h * 0.53, h * 0.55, '#ffc928', 900, 'center', w * 0.9); });
    p.m.position.set(2.0, 3.3, -4.28); g.add(p.m);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['palco_show', { texto: 'PORTFÓLIO' }, 'show'], ['vazio_colorido', { cor: 'laranja' }, 'loop'], ['agencia', {}, 'mesa'], ['fachada', { loja: 'pizzaria' }, 'fora'], ['pizzaria', {}, 'smash']]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaHamb = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'HAMBURGUERIAS', itens: HAMBS, n: e.n, sel: e.sel, total: 148, comSite: 61, semSite: 87 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Hamburguerias · Salvador, BA', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = HAMBS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseSmash = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Smash Bahia', aderencia: e.a, ate: e.ate,
      dores: ['Sem site: só Instagram', 'Presença digital fraca'], oportunidades: ['Site com cardápio e pedido no WhatsApp'],
      objecoes: ['"O Instagram já resolve"'], abordagem: 'Elogie os burgers e mostre o cardápio num site.'
    });
    T.msgSmash = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Smash Bahia', texto: 'Oi, seu Jorge! Vi o Instagram da Smash Bahia: os burgers são lindos, mas não achei um site com o cardápio. Faço sites pra hamburguerias aqui em Salvador. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Rafa (do canal), o primo, a cliente, o seu Jorge e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    primo = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xff8a1e, bermuda: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xb9805a } });
    K.semNome(primo.g); K.nomear('primo', primo.g);
    dona = K.personagem('dona', { cores: { blazer: 0xe8352b } }); K.semNome(dona.g); K.nomear('cliente', dona.g);
    jorge = K.personagem('pizzaiolo'); K.semNome(jorge.g); K.nomear('dono', jorge.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');
    K.nomear('telao', CS.todos.show.telao.m);

    // O palco: a tela do portfólio, a mesa de jurada da cliente
    port = fazPortfolio(); guarda(port, 'portfolio', [0, 0, PZ]);
    mesaJ = K.m3d('mesa', { cor: 0x2a2e33 }); mesaJ.rotation.y = Math.atan2(-DIR_D[0], -DIR_D[1]); guarda(mesaJ, 'mesa_jurada', MESA_J);
    cadJ = K.m3d('cadeira', { cor: 0xe8352b }); cadJ.rotation.y = Math.atan2(DIR_D[0], DIR_D[1]); guarda(cadJ, 'mesa_jurada', DONA_P);
    // O círculo
    const gp = new THREE.Group(); placaPort = fazPlacaPoste('PORTFÓLIO', '#1067f8'); placaPort.position.set(...PL_PORT); placaPort.rotation.y = 0.35;
    placaCli = fazPlacaPoste('CLIENTE', '#1faa52'); placaCli.position.set(...PL_CLI); placaCli.rotation.y = -0.35; gp.add(placaPort, placaCli);
    guarda(gp, 'placas_ciclo', [0, 0, 0]);
    setas = fazSetas(); guarda(setas, 'setas', CIRC);
    // O coworking: a placa, o computador, a cadeira, o acarajé, a barra e as telas do Mappoa
    cowork = plano(3.6, 0.9, 700, (c, w, h) => { rr(c, 0, 0, w, h, h * 0.2, '#123a7a'); txt(c, 'COWORKING', w / 2, h * 0.54, h * 0.6, '#4fe3ff', 900, 'center', w * 0.9); });
    guarda(cowork.m, null, [-0.4, 3.2, -4.3]);
    comp = K.computador({ corMesa: 0xc89a5c }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2fb5a6 }); guarda(cadeira, 'cadeira', SEAT);
    acaraje = fazAcaraje(); guarda(acaraje, 'acaraje', [0, 1, 0], 1.5);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', TELA_P);
    // A Smash Bahia: de fora e de dentro, o celular, a TV, o contrato e o hambúrguer
    smashFora = fazSmashFora(); guarda(smashFora, 'placa_smash');
    smashDentro = fazSmashDentro(); guarda(smashDentro, 'placa_smash');
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL_FORA);
    tvG = new THREE.Group();
    const moldura = K.malha(new THREE.BoxGeometry(2.3, 1.4, 0.08), K.mat(0x1b1f26)); tvG.add(moldura);
    tvT = K.telaCanvas(2.18, 1.28, 900); tvT.m.position.z = 0.045; tvG.add(tvT.m);
    guarda(tvG, 'tv_site', TV_S);
    contratoT = K.telaCanvas(0.5, 0.66, 300); contrato = new THREE.Group(); contrato.add(contratoT.m); contratoT.m.rotation.x = -PI / 2;
    guarda(contrato, 'contrato', CONTRATO);
    burger = fazBurger(); guarda(burger, 'burger', BURGER, 1.1);

    fx.poof = K.poof(61);
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.holo = K.holofote();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      soPrimo: e('Só o primo', 'vermelho'), web: e('Web designer', 'azul'), ssa: e('Salvador, BA', 'azul'), um: e('1 projeto só', 'vermelho'),
      ciclo: e('Ciclo sem fim', 'vermelho'), invest: e('Investimento', 'verde'), precisa: e('Acha quem precisa de site', 'verde'),
      ssa2: e('Salvador, BA', 'azul'), quem: e('Quem precisa de site', 'verde'), pronta: e('Mensagem pronta', 'verde'),
      insta: e('Só Instagram', 'laranja'), primeiro: e('Primeiro cliente', 'verde'), verdade: e('Projeto de verdade', 'verde'),
      antes: e('Antes: só o primo', 'vermelho'), cliente: e('Cliente de verdade', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Tem primo no portfólio? Comenta <em>PRIMO</em> ou <em>CLIENTE</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function celTela(c0, desenho, chave) { c0.userData.m3d.tela.desenhar(desenho, chave); }
  // O palco com a tela do portfólio (n projetos, novo de 0 a 1) e o primo dentro dela
  function palco(n, novo, tc, gesto) {
    ve(port); portT.desenhar((c, w, h) => portfolioTela(c, w, h, { n, novo }), 'p' + n + '_' + Math.round(novo * 12));
    CS.todos.show.telao.desenhar(telaoTexto, 'port');
    primo.g.scale.setScalar(1.2);
    primo.colocar(PRIMO, [0.3, 1.6, 6]);
    if (gesto === 'aplaude') primo.reagir('aplaudindo', tc);
    else { primo.acenar(tc * 1.4); primo.g.position.y = PY + Math.abs(Math.sin(tc * 5)) * 0.08; }
    primo.humor('feliz');
  }
  function jurada(humor, reacao, t0) {
    ve(mesaJ, cadJ);
    dona.colocar(DONA_P, [0, 1.6, PZ]); dona.sentar(1);
    if (reacao) dona.reagir(reacao, t0);
    dona.humor(humor);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o palco; a tela gigante do portfólio com 1 projeto; o primo em pé dentro dela acenando; o Rafa apontando; a cliente na mesa de jurada · MOSTRA: portfolio, primo, cliente
      // CENÁRIO: palco_show, refletores, plateia no escuro
      const tPr = quando('primo', B, 0.4), tCl = quando('cliente', B, 0.6), tVe = quando('vê', B, 0.7), tCo = quando('confia', B, 0.92);
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(c2 + 0.6, tCo);
      // OBJETOS SE MEXENDO: o primo acena e pula dentro da tela
      palco(1, 0, tc);
      // PERSONAGEM: o Rafa aponta a tela, orgulhoso · em "cliente": mão na testa · a cliente: em "vê", "não" com a cabeça
      menino.colocar(RAFA_P, tc < tCl ? cabecaDe(primo, -0.3) : [0.5, 1.4, 7]);
      if (tc < tCl) { menino.apontar(0.6); menino.humor('feliz'); } else { menino.reagir('mao_na_testa', tc - tCl); menino.humor('triste'); }
      jurada('bravo', tc > tVe ? 'nao' : null, tc - tVe);
      // EFEITOS VISUAIS: balão "Oi! Sou o primo!" · "Só o primo" em "primo" · ✗ em "confia"
      K.som('whoosh', B.inicio + 0.02, 0.6); K.som('pingo', B.inicio + 0.3, 0.5); K.som('errado', tCo, 0.6);
      // CÂMERA: 4 cortes · (1) aberto, de frente · (2) perto, de baixo, o primo · (3) de frente pra cliente · (4) perto, o Rafa
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(0.3, 0.15, q), 2.7, K.lerp(9.4, 8.6, q)], [0.1, 2.5, -1.0]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(0.5, 0.3, q), 1.5, K.lerp(2.9, 2.6, q)], [-0.6, 2.15, -1.72]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar(mais(CAM_DONA, [0, q * 0.1, 0]), mais(DONA_P, [0, 1.1, 0])); }
      else K.filmar([cabecaDe(menino, 0.3), mais(RAFA_P, [0, 0.05, 0]), mais(RAFA_P, [0.9, 1.0, -0.6])], 'chegando', pc(tc, c3, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 1.6 });
      if (tc < c2) fx.fala.em(cabecaDe(primo, 0.15), tc - B.inicio - 0.3, { texto: 'Oi! Sou o primo!' });
      else if (tc < c3) fx.et.soPrimo.em(mais(MESA_J, [0, 1.0, 0]), tc - Math.max(tPr, c2));
      fx.simb.em(tc < c3 ? mais(DONA_P, [0.5, 1.6, 0.2]) : mais(RAFA_P, [0.6, 2.0, 0.2]), tc - tCo, { tipo: '✗', tam: 0.7 });
    },
    rafa(B, tc) {
      // NA TELA: o palco; o Rafa na frente da tela, sem graça; "Projetos: 1"; o primo acenando atrás · MOSTRA: personagem, portfolio, primo
      const tD = quando('designer', B, 0.2), tS = quando('Salvador', B, 0.35), tU = quando('único', B, 0.55), tPr = quando('primo', B, 0.92);
      palco(1, 0, tc);
      const ONDE = [-1.2, 0, 1.2];
      // PERSONAGEM: acena pra câmera, sem graça · em "único": encolhe os ombros · em "primo": aponta o primo com o polegar
      menino.colocar(ONDE, tc < tPr ? [-1.2, 1.4, 8] : cabecaDe(primo, -0.3));
      if (tc > tPr) menino.apontar(0.7); else if (tc > tU) menino.reagir('ombros', tc - tU); else menino.acenar(tc);
      menino.humor(tc > tU ? 'triste' : 'feliz');
      // EFEITOS VISUAIS: "Web designer" · "Salvador, BA" · "1 projeto só" · balão "De nada!"
      if (tc < tS) fx.et.web.em(cabecaDe(menino, 0.55), tc - tD); else if (tc < tU) fx.et.ssa.em(cabecaDe(menino, 0.55), tc - tS);
      K.som('pingo', tD, 0.5); K.som('errado', tU, 0.5);
      // CÂMERA: (1) até "único": chegando, perto, frente-esquerda · (2) passando, médio, direita, na tela e no primo
      if (tc < tU) K.filmar([cabecaDe(menino, 0.3), mais(ONDE, [0, 0.05, 0])], 'chegando', pc(tc, B.inicio, tU), { plano: 'perto', lado: -25, altura: 'olho', tam: 1.7 });
      else {
        const q = K.suave(pc(tc, tU, B.ate));
        K.mirar([K.lerp(1.1, 0.3, q), 2.6, K.lerp(7.4, 6.8, q)], [-0.3, 2.5, -1.6]);
        fx.et.um.em([0.6, PY + PH + 0.05, PZ + 0.5], tc - tU);
      }
      fx.fala.em(cabecaDe(primo, 0.15), tc - tPr, { texto: 'De nada!' });
    },
    ciclo(B, tc) {
      // NA TELA: o fundo laranja; as placas PORTFÓLIO e CLIENTE; as setas girando; o Rafa correndo em círculo · MOSTRA: personagem, placas_ciclo, setas
      const tNg = quando('ninguém', B, 0.25), tFe = quando('fechar', B, 0.6), tNu = quando('nunca', B, 0.8);
      ve(placaPort.parent, setas);
      // ENTRA AGORA: as placas caem do alto
      K.entrar(placaPort.parent, 'cai', tc - B.inicio, { altura: 3, destaque: false });
      // OBJETOS SE MEXENDO: as setas giram sem parar
      setas.rotation.y = -tc * 1.6;
      // PERSONAGEM: correndo em círculo, assustado · em "nunca": cai sentado, tonto
      const PC = (a) => [CIRC[0] + Math.sin(a) * RAIO, 0, CIRC[2] + Math.cos(a) * RAIO];
      if (tc < tNu) { const a = (tc - B.inicio) * 2.4; menino.irPara(PC(a - 0.25), PC(a + 0.25), 0.5, tc, { correr: true }); menino.humor('assustado'); }
      else { const a = (tNu - B.inicio) * 2.4; menino.colocar(PC(a), [0, 1.2, 8]); menino.reagir('cai_sentado', tc - tNu); menino.humor('triste'); fx.poof.em(cabecaDe(menino, 0.1), tc - tNu - 0.3, { escala: 0.5 }); }
      for (let k = 0; k < 8; k++) K.som('passo', B.inicio + 0.1 + k * 0.22, 0.3);
      K.som('errado', tNg, 0.4); K.som('errado', tNu, 0.5); K.som('baque', tNu + 0.3, 0.6);
      // EFEITOS VISUAIS: ✗ nas placas · "Ciclo sem fim" em "fechar"
      fx.simb.em(mais(PL_PORT, [0.6, 3.1, 0.2]), tc - tNg, { tipo: '✗', tam: 0.7 });
      fx.simb2.em(mais(PL_CLI, [-0.6, 3.1, 0.2]), tc - tNu, { tipo: '✗', tam: 0.7, som: false });
      // CÂMERA: (1) até "nunca": girando, aberto, alto, de frente · (2) chegando, perto, nele caído
      if (tc < tNu - 0.2) {
        { const q = K.suave(pc(tc, B.inicio, tNu)), a = K.lerp(-0.2, 0.2, q); K.mirar([Math.sin(a) * 9.2, 3.4, 0.3 + Math.cos(a) * 9.2], [0, 1.4, -0.4]); }
        fx.et.ciclo.em([0, 3.3, -1.3], tc - tFe);
      } else K.filmar([cabecaDe(menino, 0.3), mais(menino.g.position.toArray(), [0, 0.05, 0]), mais(PL_CLI, [0, 2.9, 0])], 'chegando', pc(tc, tNu - 0.2, B.ate), { plano: 'perto', lado: -20, altura: 'olho', tam: 2.0 });
    },
    investe(B, tc) {
      // NA TELA: o coworking; o Rafa de pé com o acarajé; o acarajé vai pro monitor e some · MOSTRA: personagem, acaraje, monitor
      const tI = quando('investir', B, 0.2), tAc = quando('acarajé', B, 0.38), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      ve(comp, acaraje, cowork.m);
      const k = pc(tc, tS, tS + 0.8);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10));
      // PERSONAGEM: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [1.2, 1.3, 8]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: o acarajé na mão em "investir"; em "sistema", desliza até o monitor girando e some num poof
      const m = menino.mao(1);
      if (tc < tS) { acaraje.position.set(m[0] + 0.05, m[1] - 0.08, m[2] + 0.12); acaraje.rotation.set(0, tc * 0.6, 0); acaraje.scale.setScalar(1.5 * pop(tc - tI)); }
      else {
        const q = K.suave(k), mesaY = 0.79;
        acaraje.position.set(K.lerp(m[0], MONITOR[0] + 0.1, q), q < 0.3 ? K.lerp(m[1] - 0.08, mesaY, q / 0.3) : mesaY + Math.max(0, (q - 0.8) * 1.5), K.lerp(m[2], MONITOR[2] + 0.18, q));
        acaraje.rotation.set(0, q * 7, 0); acaraje.scale.setScalar(1.5 * (1 - q * 0.8)); if (q >= 1) acaraje.visible = false;
      }
      fx.poof.em(mais(MONITOR, [0.1, 0, 0.2]), tc - tS - 0.8, { escala: 0.8 });
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.75, 0]), tc - tPr);
      K.som('ding', tAc, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.8, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, frente-esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), acaraje.position.toArray()], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [acaraje.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -10, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das hamburguerias de Salvador sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tH = quando('hamburguerias', B, 0.52), tSa = quando('Salvador', B, 0.7);
      ve(comp, navG, cowork.m); comp.tela.desenhar(siteRafa, 'port');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tH ? 1 + Math.floor((tc - tH) / 0.25) : 0;
        telaC.mostrar('listaHamb', { n: Math.min(4, n), sel: n >= 2 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tH + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a lista
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 8]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.ssa2.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tSa);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco; o telão com a lista do Mappoa; o painel gigante com a análise da Smash Bahia e depois a mensagem pronta; o Rafa com o holofote · MOSTRA: tela, telao, personagem
      const tM = quando('Mappoa', B, 0.1), tPr = quando('precisa', B, 0.35), tMe = quando('mensagem', B, 0.75), tPo = quando('pronta', B, 0.9);
      const C = CS.todos.show;
      const nL = Math.min(4, Math.max(0, Math.floor((tc - B.inicio) / 0.3) + 1));
      C.telao.desenhar((c, w, h) => telaoLista(c, w, h, { n: nL }), 'lista' + nL);
      ve(telaM); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3, destaque: false });
      telaM.g.scale.setScalar(1.1); telaM.g.rotation.set(0, 0.15, 0);
      if (tc < tMe) { const ate = tc > tM + 0.3 ? Math.min(4, 1 + Math.floor((tc - tM - 0.3) / 0.35)) : 0; telaM.mostrar('analiseSmash', { a: Math.round(pc(tc, tM, tM + 0.9) * 0.91 * 20) / 20, ate }); }
      else telaM.mostrar('msgSmash', { d: Math.round(pc(tc, tMe, tPo + 0.3) * 20) / 20 });
      fx.holo.em(mais(RAFA_M, [0, 0, 0]), { abertura: 1.0 });
      // PERSONAGEM: surpreso, olhando o painel · em "precisa": aponta a análise · em "mensagem": braços pra cima
      menino.colocar(RAFA_M, tc > tMe ? [1.0, 1.4, 7] : TELA_P);
      if (tc > tMe) menino.reagir('comemorando', tc - tMe); else if (tc > tPr) menino.apontar(0.5); else menino.reagir('surpreso', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.som('brilho', tM, 0.6); K.som('certo', tPo, 0.5);
      // CÂMERA: (1) até "mensagem": chegando, perto, frente, no painel e nele · (2) afastando, médio, esquerda, o telão e o painel
            if (tc < tMe) { const q = K.suave(pc(tc, B.inicio, tMe)); K.mirar([K.lerp(0.6, 0.2, q), 2.2, K.lerp(9.6, 8.8, q)], [0.1, 1.95, 0.3]); }
      else { const q = K.suave(pc(tc, tMe, B.ate)); K.mirar([K.lerp(-0.6, -1.1, q), 2.8, K.lerp(9.0, 10.4, q)], [0, 2.9, -1.5]); }
      if (tc < tMe) fx.et.quem.em(mais(TELA_P, [0.5, 1.75, 0.4]), tc - tPr); else fx.et.pronta.em(mais(TELA_P, [0.5, 1.75, 0.4]), tc - tPo);
    },
    mensagem(B, tc) {
      // NA TELA: (1) o coworking: a mensagem pronta pra Smash Bahia, o Rafa aperta enviar · (2) em "Jorge": a calçada da SMASH BAHIA, o seu Jorge com o celular gigante · MOSTRA: dono, celular, placa_smash
      const tMa = quando('mandou', B, 0.08), tIn = quando('Instagram', B, 0.55), tJo = quando('Jorge', B, 0.75), tRe = quando('respondeu', B, 0.88);
      if (tc < tJo) {
        ve(comp, telaC, cowork.m); comp.tela.desenhar(siteRafa, 'port');
        telaC.mostrar('msgSmash', { d: 1 });
        // PERSONAGEM: o Rafa aponta o botão de enviar
        menino.colocar([-0.65, 0, 1.95], TELA_Q); if (tc > tMa) menino.apontar(0.4); else menino.reagir('sim', tc - B.inicio);
        fx.et.insta.em(mais(TELA_Q, [0, 1.45, 0.2]), tc - tIn);
        K.som('clique', tMa + 0.3, 0.6); K.som('whoosh', tMa + 0.35, 0.4);
        // CÂMERA: (1) chegando, perto, frente, na tela e no Rafa
        K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tJo), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
      } else {
        ve(smashFora, cel); cel.position.set(...CEL_FORA); cel.rotation.set(0, 0.35, 0);
        celTela(cel, (c, w, h) => celZap(c, w, h, { resp: tc > tRe }), 'z' + (tc > tRe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tJo);
        // PERSONAGEM: o seu Jorge lê, surpreso · em "respondeu": comemora
        jorge.colocar(JORGE_FORA, tc < tRe ? mais(CEL_FORA, [0, 1.3, 0]) : [1.0, 1.4, 6]);
        if (tc > tRe) jorge.reagir('comemorando', tc - tRe); else jorge.reagir('surpreso', tc - tJo);
        fx.fala.em(cabecaDe(jorge, 0.15), tc - tRe, { texto: 'Quero um site!' });
        K.som('pingo', tJo + 0.05, 0.6); K.som('certo', tRe, 0.6);
        // CÂMERA: (2) passando, perto, direita, no celular e no seu Jorge
        K.filmar([mais(CEL_FORA, [0, 2.0, 0]), mais(CEL_FORA, [0, 0.5, 0]), cabecaDe(jorge, 0.3)], 'passando', pc(tc, tJo, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.4 });
        fx.simb.em(mais(JORGE_FORA, [0.4, 2.4, 0.3]), tc - tRe - 0.2, { tipo: '✓' });
      }
    },
    fechou(B, tc) {
      // NA TELA: dentro da Smash Bahia; a TV com o site novo; o Rafa e o seu Jorge apertando a mão; o contrato no balcão · MOSTRA: tv_site, dono, personagem
      const tF = quando('fechou', B, 0.08), tCa = quando('cardápio', B, 0.55), tW = quando('WhatsApp', B, 0.9);
      ve(tvG, contrato, smashDentro, burger);
      const nB = tc < tCa ? 0 : Math.min(3, 1 + Math.floor((tc - tCa) / 0.2));
      const zap = tc > tW && Math.floor((tc - tW) * 6) % 2 === 0;
      tvT.desenhar((c, w, h) => siteSmash(c, w, h, { n: nB, zap }), 'tv' + nB + (zap ? 'z' : ''));
      const kc = pc(tc, tF + 0.1, tF + 0.35);
      contratoT.desenhar((c, w, h) => contratoDesenho(c, w, h, kc), 'k' + Math.round(kc * 8));
      // PERSONAGEM: o aperto de mão · em "cardápio": o seu Jorge mostra a TV, o Rafa comemora
      if (tc < tCa) {
        menino.colocar(RAFA_D, mais(JORGE_D, [0, 1.2, 0])); menino.apontar(0.25); menino.humor('feliz');
        jorge.colocar(JORGE_D, mais(RAFA_D, [0, 1.2, 0])); jorge.apontar(0.25); jorge.humor('feliz');
      } else {
        menino.colocar(RAFA_D, [0.6, 1.4, 6]); menino.reagir('comemorando', tc - tCa);
        jorge.colocar(JORGE_D, TV_S); jorge.reagir('mostrando', tc - tCa);
      }
      K.som('baque', tF + 0.3, 0.6); K.som('certo', tF + 0.4, 0.5); K.som('ding', tW, 0.6);
      // EFEITOS VISUAIS: "Primeiro cliente" em "fechou" · ✓ na TV
      // CÂMERA: (1) até "cardápio": passando, perto, esquerda, no contrato e nos dois · (2) chegando, médio, frente, na TV
      if (tc < tCa) {
        { const q = K.suave(pc(tc, B.inicio, tCa)); K.mirar([K.lerp(-1.1, -0.3, q), 1.8, 3.0], [-0.15, 1.15, -1.9]); }
        fx.et.primeiro.em(mais(CONTRATO, [-0.5, 1.1, 0.4]), tc - tF - 0.2);
      } else {
        { const q = K.suave(pc(tc, tCa, B.ate)); K.mirar([-0.4, 2.0, K.lerp(4.2, 3.5, q)], [-0.45, 1.75, -3.0]); }
        fx.simb.em(mais(TV_S, [0.95, 0.6, 0.3]), tc - tW, { tipo: '✓', tam: 0.6 });
      }
    },
    vira(B, tc) {
      // NA TELA: o palco; o cartão novo da Smash Bahia entra no quadro vazio; "Projetos: 2"; o primo aplaude · MOSTRA: portfolio, primo, personagem
      const tV = quando('virou', B, 0.1), tPo = quando('portfólio', B, 0.6), tVe = quando('verdade', B, 0.45), tPr = quando('primo', B, 0.93);
      const novo = pc(tc, tV, tV + 0.5);
      palco(novo > 0.3 ? 2 : 1, novo, tc, 'aplaude');
      fx.poof.em(SLOT2.map((v, i) => (i === 2 ? v + 0.4 : v)), tc - tV, { escala: 1.0 });
      // PERSONAGEM: o Rafa aponta o cartão novo · em "primo": comemora
      menino.colocar(RAFA_P, tc < tPr ? SLOT2 : [0, 1.4, 7]);
      if (tc > tPr) menino.reagir('comemorando', tc - tPr); else menino.apontar(0.6);
      K.som('estalo', tV, 0.6); K.som('brilho', tV + 0.2, 0.5); K.som('certo', tVe, 0.5); K.som('pingo', tPr, 0.5);
      // CÂMERA: (1) até "portfólio": chegando, perto, de frente, no cartão novo · (2) passando, médio, esquerda, o primo e o Rafa
      if (tc < tPo) {
        { const q = K.suave(pc(tc, B.inicio, tPo)); K.mirar([0.1, 3.2, K.lerp(5.6, 4.9, q)], [0, 3.2, -2]); }
        fx.et.verdade.em(mais(SLOT2, [0, 1.5, 0.5]), tc - tVe);
      } else {
        { const q = K.suave(pc(tc, tPo, B.ate)); K.mirar([K.lerp(-1.6, -0.8, q), 2.5, 7.8], [-0.4, 2.4, -1.2]); }
        fx.simb2.em(cabecaDe(primo, 0.35), tc - tPr, { tipo: '+1', tam: 0.6 });
        fx.simb.em(mais(SLOT2, [0.9, 1.3, 0.4]), tc - tPo, { tipo: '✓', tam: 0.7 });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a tela só com o primo, a cliente dizendo não · (2) Agora: os dois cartões, a cliente aplaudindo e o Rafa com o holofote · MOSTRA: portfolio, cliente, personagem
      const tA = quando('Agora', B, 0.5), tCl = quando('cliente', B, 0.75);
      if (tc < tA) {
        palco(1, 0, tc);
        jurada('bravo', 'nao', tc - B.inicio);
        menino.colocar(RAFA_P, [0.5, 1.4, 7]); menino.reagir('mao_na_testa', tc - B.inicio); menino.humor('triste');
        fx.et.antes.em(mais(DONA_P, [0, 1.95, 0]), tc - B.inicio - 0.1);
        fx.simb.em(mais(DONA_P, [0.5, 1.5, 0.2]), tc - B.inicio - 0.4, { tipo: '✗', tam: 0.6 });
        K.som('errado', B.inicio + 0.3, 0.4);
        // CÂMERA: (1) parado, perto, de frente pra cliente, a mesa de jurada
        K.mirar(mais(CAM_DONA, [0.3, 0.1, -0.3]), mais(DONA_P, [0, 1.05, 0]));
      } else {
        palco(2, 1, tc);
        ve(mesaJ, cadJ); dona.colocar(mais(DONA_P, [0, 0, 0.2]), [0, 1.6, PZ]); dona.reagir('aplaudindo', tc - tA); dona.humor('feliz');
        menino.colocar(mais(RAFA_P, [0.4, 0, 0.6]), [0.6, 1.4, 7]); menino.reagir('comemorando', tc - tA);
        fx.holo.em(mais(RAFA_P, [0.4, 0, 0.6]), { abertura: 1.0 });
        fx.et.cliente.em(mais(SLOT2, [0, 1.5, 0.5]), tc - tCl);
        fx.simb.em(mais(DONA_P, [0.5, 2.0, 0.4]), tc - tCl - 0.2, { tipo: '✓', tam: 0.6 });
        K.som('certo', tA + 0.1, 0.5); K.som('festa', tA + 0.2, 0.4);
        // CÂMERA: (2) chegando, médio, de frente, o palco todo
        { const q = K.suave(pc(tc, tA, B.ate)); K.mirar([0.25, 2.7, K.lerp(9.2, 8.4, q)], [0.15, 2.5, -1.0]); }
      }
    },
    segue(B, tc) {
      // NA TELA: o coworking; o Rafa de pé; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG, cowork.m); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteRafa, 'port');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-0.8, 0, 1.6); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [1.0, 1.4, 8]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
      else K.filmar([navG, comp, menino, robo], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo, cowork.m); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteRafa, 'port');
      robo.g.position.set(-0.8, 0, 1.6); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [1.0, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      // o primo acenando de dentro da tela gigante, o Rafa com a mão na testa e a cliente de cara fechada
      palco(1, 0, 0.35);
      jurada('bravo', 'nao', 0.3);
      menino.colocar([-0.75, 0, 1.6], [-0.3, 1.6, 6]); menino.reagir('mao_na_testa', 0.6); menino.humor('triste');
      K.mirar([-0.3, 2.0, 7.2], [-0.45, 2.35, -1.2]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'show' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, primo, dona, jorge].forEach((b) => { b.g.visible = false; b.g.scale.set(1, 1, 1); b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    if (fx.holo) fx.holo.esconder();
    menino.g.position.y = 0; menino.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(...TELA_P); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1.5);
    acaraje.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
