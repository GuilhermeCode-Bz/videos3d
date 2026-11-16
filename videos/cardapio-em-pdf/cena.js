// O cardápio em PDF (canal Mappoa).
// Quatro lugares (K.cenarios): a fachada da pizzaria de noite coberta como CANTINA DO ARI (as páginas gigantes do PDF
// desabando em cima do cliente), o escritório (a mesa do Bruno no meio, o mapa e a planilha no cavalete, a cuia de
// chimarrão), a lua (o painel gigante do Mappoa flutuando, o Bruno de capacete) e a pizzaria por dentro como a cantina.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, CUR, menino, cliente, ari, robo, comp, cel, cadeira, telaC, telaM, navG, xis, cuia, FOV0, capEsp;
  let paginasG, paginas = [], placaFora, placaDentro, mapaG, mapaT, planG, planT, foneG, foneT, galeto;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Fachada (a porta em x 1,6, a calçada até z ~4,6, as mesinhas em x -1,2 e -3,4): o cliente e a pilha de páginas
  const CLI = [0.9, 0, 3.3], NPAG = 30;
  const MESA_F = [-1.2, 0, 2.8], CLI_SENTA = [-0.45, 0, 2.8], GALETO = [-1.2, 0.78, 2.8], FONE_F = [-1.5, 2.05, 3.5];
  const PORTA = [1.6, 0, 0.9], ARI_PORTA = [1.6, 0, -0.9];
  // Escritório: o computador do Bruno no meio da sala, virado pra +z; o cavalete (mapa / planilha) à esquerda
  const COMP = [0.6, 0, -0.6], MONITOR = [0.6, 1.185, -0.72], SEAT = [0.6, 0, 0.08];
  const EM_PE = [1.75, 0, 0.25], TELA_Q = [0.1, 1.45, 0.3], NAV = [0.75, 2.95, -0.25];
  const CAV = [-1.6, 0, -0.5], QUADRO = [-1.6, 1.75, -0.45], DIANTE_CAV = [-0.55, 0, 0.55];
  const CUIA = [1.15, 0.79, -0.45];
  // Lua: o painel flutuando, o Bruno e o robô
  const TELA_L = [-0.45, 2.1, -0.4], BRUNO_L = [1.0, 0, 0.9], ROBO_L = [-1.75, 0.8, 1.0];
  // Cantina por dentro (pizzaria): o balcão em z -2,6; o seu Ari e o celular gigante na frente dele
  const ARI_D = [-0.05, 0, -1.4], CEL_D = [-0.95, 0, -1.25];

  const LUGAR = {
    gancho: 'fora', bruno: 'sala', dificil: 'sala', investe: 'sala', lista: 'sala', mappoa: 'lua', pdf: 'sala',
    segue: 'sala', cartao: 'sala', capa: 'fora'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'topou') return tc < quando('agora', B, 0.62) ? 'cantina' : 'fora';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.48) ? 'sala' : 'fora';
    return LUGAR[B.plano] || 'sala';
  }

  const RESTS = [
    { nome: 'Cantina do Ari', end: 'Cidade Baixa', chips: ['tel', 'site'], site: true },
    { nome: 'Galeteria Serrana', end: 'Menino Deus', chips: ['whats', 'insta'], site: false },
    { nome: 'Bistrô Guaíba', end: 'Moinhos de Vento', chips: ['tel', 'site'], site: true },
    { nome: 'Xis do Gringo', end: 'Bom Fim', chips: ['insta'], site: false }
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
  const cil = (pai, r1, r2, h, mat, p, seg = 18) => { const m = K.malha(new THREE.CylinderGeometry(r1, r2, h, seg), mat); m.position.set(...p); pai.add(m); return m; };

  // ---------- Desenhos ----------
  // Uma página do cardápio em PDF (n de 30), com o selo vermelho "PDF"
  function paginaDesenho(c, w, h, n) {
    c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#8b1e1e'; c.fillRect(0, 0, w, h * 0.13);
    txt(c, 'CANTINA DO ARI', w * 0.06, h * 0.065, h * 0.055, '#ffe9b0', 900, 'left', w * 0.6);
    rr(c, w * 0.7, h * 0.02, w * 0.26, h * 0.09, h * 0.02, '#e8352b'); txt(c, 'PDF', w * 0.83, h * 0.066, h * 0.06, '#ffffff', 900, 'center');
    txt(c, 'CARDÁPIO', w / 2, h * 0.21, h * 0.07, '#3a1d12', 900, 'center', w * 0.9);
    for (let i = 0; i < 9; i++) {
      const y = h * (0.3 + i * 0.065);
      c.fillStyle = '#b9ab98'; c.fillRect(w * 0.08, y, w * (0.42 + ((i * 7 + n) % 4) * 0.06), h * 0.014);
      c.fillStyle = '#d6cbbb'; c.fillRect(w * 0.08, y + h * 0.022, w * 0.3, h * 0.01);
      txt(c, '.......', w * 0.74, y + h * 0.008, h * 0.03, '#b9ab98', 800, 'center');
    }
    rr(c, w * 0.18, h * 0.88, w * 0.64, h * 0.08, h * 0.04, '#3a1d12');
    txt(c, `pág. ${n} de 30`, w / 2, h * 0.92, h * 0.05, '#ffffff', 900, 'center', w * 0.6);
  }
  // O mapa de Porto Alegre com os pinos dos restaurantes (ativo = o pino da vez)
  const PINOS = [[0.42, 0.3], [0.62, 0.22], [0.55, 0.48], [0.78, 0.4], [0.68, 0.66], [0.45, 0.72], [0.86, 0.75], [0.32, 0.55]];
  function mapaDesenho(c, w, h, ativo) {
    c.fillStyle = '#eef1e6'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#9fd0f0'; c.beginPath(); c.moveTo(0, 0); c.lineTo(w * 0.22, 0); c.bezierCurveTo(w * 0.3, h * 0.3, w * 0.12, h * 0.6, w * 0.24, h); c.lineTo(0, h); c.fill();
    txt(c, 'Guaíba', w * 0.1, h * 0.5, h * 0.05, '#3a7fb0', 800, 'center');
    c.strokeStyle = '#ffffff'; c.lineWidth = h * 0.02;
    for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(w * 0.22, h * i / 6); c.lineTo(w, h * i / 6 + h * 0.03); c.stroke(); }
    for (let i = 1; i < 5; i++) { c.beginPath(); c.moveTo(w * (0.25 + i * 0.17), 0); c.lineTo(w * (0.22 + i * 0.17), h); c.stroke(); }
    rr(c, 0, 0, w, h * 0.12, 0, '#ffffff'); txt(c, 'restaurantes em Porto Alegre', w * 0.04, h * 0.06, h * 0.055, '#5b6470', 700, 'left', w * 0.92);
    PINOS.forEach(([x, y], i) => {
      const at = i === ativo, ja = i < ativo, s = at ? 1.5 : 1;
      c.fillStyle = at ? '#e8352b' : ja ? '#9aa0a6' : '#c0392b';
      c.beginPath(); c.arc(w * x, h * y - h * 0.03 * s, h * 0.03 * s, PI, 0); c.lineTo(w * x, h * y + h * 0.02); c.fill();
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w * x, h * y - h * 0.03 * s, h * 0.011 * s, 0, 2 * PI); c.fill();
    });
  }
  // A planilha na mão: restaurante, telefone e a coluna do site, toda com "?"
  function planilhaDesenho(c, w, h, n) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const lh = h / 8.4;
    c.fillStyle = '#1f7a44'; c.fillRect(0, 0, w, lh * 1.4);
    txt(c, 'Restaurante', 14, lh * 0.7, lh * 0.5, '#ffffff', 800); txt(c, 'Telefone', w * 0.5, lh * 0.7, lh * 0.5, '#ffffff', 800); txt(c, 'Site?', w * 0.8, lh * 0.7, lh * 0.5, '#ffffff', 800);
    ['Cantina do Ari', 'Galeteria Serrana', 'Bistrô Guaíba', 'Xis do Gringo', 'Churrascaria Pampa', 'Café da Redenção', 'Sushi Moinhos'].forEach((r, i) => {
      const y = lh * 1.4 + i * lh;
      if (i % 2) { c.fillStyle = '#eef6f0'; c.fillRect(0, y, w, lh); }
      if (i < n) {
        txt(c, r, 14, y + lh / 2, lh * 0.45, '#1e1f22', 700, 'left', w * 0.46);
        c.fillStyle = '#9aa0a6'; c.fillRect(w * 0.5, y + lh * 0.38, w * 0.22, lh * 0.24);
        txt(c, '?', w * 0.86, y + lh / 2, lh * 0.7, '#e8352b', 900, 'center');
      }
      c.strokeStyle = '#c9d6cc'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y + lh); c.lineTo(w, y + lh); c.stroke();
    });
  }
  // O celular (de perto): pedido no concorrente, ou o cardápio novo da cantina
  function foneDesenho(c, w, h, e) {
    if (e.modo === 'outro') {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#e8352b'; c.fillRect(0, 0, w, h * 0.12);
      txt(c, 'Outro restaurante', w / 2, h * 0.06, w * 0.08, '#ffffff', 900, 'center', w * 0.9);
      c.fillStyle = '#1faa52'; c.beginPath(); c.arc(w / 2, h * 0.4, w * 0.2, 0, 2 * PI); c.fill();
      c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.04; c.beginPath(); c.moveTo(w * 0.41, h * 0.4); c.lineTo(w * 0.48, h * 0.45); c.lineTo(w * 0.6, h * 0.34); c.stroke();
      txt(c, 'Pedido feito!', w / 2, h * 0.62, w * 0.1, '#1e1f22', 900, 'center', w * 0.9);
      txt(c, 'Chega em 30 min', w / 2, h * 0.7, w * 0.065, '#5b6470', 700, 'center', w * 0.9);
      return;
    }
    c.fillStyle = '#fff8ee'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#8b1e1e'; c.fillRect(0, 0, w, h * 0.14);
    txt(c, 'CANTINA DO ARI', w / 2, h * 0.07, w * 0.085, '#ffe9b0', 900, 'center', w * 0.9);
    [['Galeto', 'R$'], ['Polenta frita', 'R$'], ['Massa da casa', 'R$'], ['Pizza', 'R$']].forEach(([n], i) => {
      const y = h * (0.19 + i * 0.15);
      rr(c, w * 0.06, y, w * 0.88, h * 0.12, 14, '#ffffff');
      c.fillStyle = ['#e0a33a', '#f5d36b', '#e8a07a', '#e8352b'][i]; c.beginPath(); c.arc(w * 0.18, y + h * 0.06, h * 0.04, 0, 2 * PI); c.fill();
      txt(c, n, w * 0.3, y + h * 0.06, w * 0.07, '#3a1d12', 800, 'left', w * 0.6);
    });
    rr(c, w * 0.1, h * 0.83, w * 0.8, h * 0.1, h * 0.05, e.pediu ? '#2fd66b' : '#1faa52');
    txt(c, e.pediu ? 'Pedido feito ✓' : 'Pedir', w / 2, h * 0.88, w * 0.08, '#ffffff', 900, 'center');
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
    txt(c, 'Bruno · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, seu Ari! Abri o cardápio', 'da Cantina no celular e é', 'um PDF bem comprido.', 'Faço cardápio que abre', 'rapidinho. Posso mostrar?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) { rr(c, w * 0.12, h * 0.56, w * 0.83, h * 0.12, 16, '#d9fdd3'); txt(c, 'Topo! Vem aqui amanhã.', w * 0.16, h * 0.62, w * 0.058, '#111b21', 700, 'left', w * 0.76); }
  }
  function siteBruno(c, w, h) {
    c.fillStyle = '#eef3f8'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.25);
    txt(c, 'Bruno · Sites', w * 0.05, h * 0.125, h * 0.1, '#ffffff', 900, 'left', w * 0.9);
    for (let i = 0; i < 3; i++) rr(c, w * (0.05 + i * 0.31), h * 0.35, w * 0.28, h * 0.55, 10, ['#cfe6ff', '#ffe4ec', '#fff1c7'][i]);
  }

  // ---------- Peças feitas aqui ----------
  // As 30 páginas do PDF (cada uma um quadro deitado com frente e verso)
  function fazPaginas() {
    const g = new THREE.Group(); K.scene.add(g);
    const verso = K.mat(0xf2efe6, { roughness: 0.9 });
    for (let i = 0; i < NPAG; i++) {
      const p = new THREE.Group();
      const t = K.telaCanvas(1.4, 2.0, 260); t.desenhar((c, w, h) => paginaDesenho(c, w, h, i + 1), 'p' + i);
      const pl = new THREE.Group(); pl.rotation.x = -PI / 2; p.add(pl);
      t.m.position.z = 0.012; pl.add(t.m);
      caixa(pl, [1.4, 2.0, 0.02], verso, [0, 0, 0]);
      g.add(p);
      paginas.push({ g: p, jx: Math.sin(i * 2.7) * 0.32, jz: Math.cos(i * 1.9) * 0.28, rz: Math.sin(i * 4.1) * 0.7, gira: 1.2 + (i % 3) * 0.5 });
    }
    return g;
  }
  // Uma página no tempo t (segundos desde o começo do gancho): cai do céu girando e deita na pilha
  function paginasEm(t) {
    ve(paginasG);
    paginas.forEach((pg, i) => {
      const tl = -0.3 + i * 0.115, cai = 1.1, chao = 0.02 + i * 0.03;
      const g = pg.g;
      if (t < tl - cai) { g.visible = false; return; }
      g.visible = true;
      const q = K.clamp((t - (tl - cai)) / cai), r = 1 - q;
      g.position.set(CLI[0] + pg.jx * (0.4 + q * 0.6) + r * Math.sin(i) * 1.5, chao + (8.5 - chao) * r * r * (1 + 0.0 * q), CLI[2] + pg.jz + r * Math.cos(i * 1.3) * 1.0);
      g.rotation.set(r * pg.gira * 1.3, pg.rz + r * 2.2, r * pg.gira * 0.7);
    });
  }
  // Placa CANTINA DO ARI por cima do letreiro da pizzaria (fora: em cima da porta; dentro: na parede do fundo)
  function fazPlaca(larg, alt) {
    return plano(larg, alt, 900, (c, w, h) => { rr(c, 0, 0, w, h, h * 0.2, '#8b1e1e'); txt(c, 'CANTINA DO ARI', w / 2, h * 0.54, h * 0.58, '#ffe9b0', 900, 'center', w * 0.92); });
  }
  // Um cavalete com um quadro desenhado (o mapa ou a planilha)
  function fazCavalete(t) {
    const g = new THREE.Group(), m = K.mat(0x8b5b35);
    [-0.75, 0.75].forEach((x) => { const p = cil(g, 0.035, 0.04, 2.5, m, [x, 1.25, -0.1], 8); p.rotation.x = 0.06; });
    caixa(g, [1.95, 1.45, 0.04], K.mat(0xf4f1ea), [0, 1.75, -0.03]);
    t.m.position.set(0, 1.75, 0); g.add(t.m);
    return g;
  }
  // O xis gaúcho: pão achatado, alface, tomate, ovo
  function fazXis() {
    const g = new THREE.Group(), pao = K.mat(0xe0a95a, { roughness: 0.7 });
    const p1 = cil(g, 0.2, 0.21, 0.05, pao, [0, 0.025, 0], 24); const p2 = cil(g, 0.21, 0.2, 0.06, pao, [0, 0.16, 0], 24); p2.scale.y = 1.2;
    cil(g, 0.225, 0.225, 0.02, K.mat(0x5fb83a), [0, 0.06, 0], 20);
    cil(g, 0.19, 0.19, 0.025, K.mat(0x7a3b1e), [0, 0.085, 0], 20);
    cil(g, 0.17, 0.17, 0.015, K.mat(0xfff7e6), [0, 0.107, 0], 20);
    const gema = K.malha(new THREE.SphereGeometry(0.06, 12, 8), K.mat(0xf5b316)); gema.scale.y = 0.4; gema.position.set(0.03, 0.116, 0.02); g.add(gema);
    cil(g, 0.2, 0.2, 0.012, K.mat(0xe8352b), [0, 0.125, 0], 20);
    void p1;
    return g;
  }
  // A cuia de chimarrão com a bomba
  function fazCuia() {
    const g = new THREE.Group();
    const cu = K.malha(new THREE.SphereGeometry(0.09, 16, 12), K.mat(0x5a3b1e, { roughness: 0.6 })); cu.scale.set(1, 1.15, 1); cu.position.y = 0.1; g.add(cu);
    cil(g, 0.075, 0.075, 0.01, K.mat(0x4f9a3a), [0, 0.2, 0], 14);
    const b = cil(g, 0.009, 0.009, 0.28, K.mat(0xd8dde3, { metalness: 0.8, roughness: 0.25 }), [0.03, 0.26, 0], 8); b.rotation.z = -0.3;
    return g;
  }
  // O prato com o galeto e a polenta frita
  function fazGaleto() {
    const g = new THREE.Group();
    cil(g, 0.3, 0.26, 0.03, K.mat(0xffffff, { roughness: 0.4 }), [0, 0.015, 0], 24);
    const f = K.malha(new THREE.SphereGeometry(0.13, 16, 12), K.mat(0xc9782e, { roughness: 0.5 })); f.scale.set(1.2, 0.7, 0.9); f.position.y = 0.1; g.add(f);
    [-1, 1].forEach((l) => { const c = K.malha(new THREE.SphereGeometry(0.05, 10, 8), K.mat(0xb8682a)); c.scale.set(1.6, 0.8, 0.8); c.position.set(0.15 * l, 0.07, 0.1); g.add(c); });
    for (let i = 0; i < 4; i++) caixa(g, [0.04, 0.04, 0.14], K.mat(0xf5d36b), [-0.18 + i * 0.05, 0.05, -0.16]);
    return g;
  }
  // O celular de perto, flutuando do lado de quem segura
  function fazFone() {
    const g = new THREE.Group();
    const corpo = K.malha(new THREE.BoxGeometry(0.66, 1.3, 0.06), K.mat(0x1e1f22, { roughness: 0.4 })); g.add(corpo);
    foneT = K.telaCanvas(0.58, 1.18, 420); foneT.m.position.z = 0.035; g.add(foneT.m);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['fachada', { loja: 'pizzaria', hora: 'noite' }, 'fora'], ['escritorio', {}, 'sala'], ['lua', {}, 'lua'], ['pizzaria', {}, 'cantina']]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaRest = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'RESTAURANTES', itens: RESTS, n: e.n, sel: e.sel, total: 214, comSite: 88, semSite: 126 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Restaurantes · Porto Alegre, RS', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = RESTS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseAri = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Cantina do Ari', aderencia: e.a, ate: e.ate,
      dores: ['Presença digital fraca', 'Pedidos só por telefone'], oportunidades: ['Site com cardápio fácil'],
      objecoes: ['"O pessoal já me conhece"'], abordagem: 'Elogie a casa e mostre um cardápio que abre no celular.'
    });
    T.msgAri = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Cantina do Ari', texto: 'Oi, seu Ari! Abri o cardápio da Cantina no celular e é um PDF bem comprido. Faço sites pra restaurantes aqui em Porto Alegre, com cardápio que abre rapidinho. Posso te mostrar uma ideia?', digitado: e.d });
    T.pdfAri = (c, w, h, e) => {
      c.fillStyle = '#3a3d42'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#26282c'; c.fillRect(0, 0, w, 90);
      txt(c, 'cardapio-cantina-ari.pdf', 24, 45, 26, '#ffffff', 700, 'left', w * 0.7);
      rr(c, w - 150, 22, 130, 46, 23, '#e8352b'); txt(c, `${e.p} / 30`, w - 85, 46, 24, '#ffffff', 900, 'center');
      const pw = w * 0.78, ph = pw * 1.42, x0 = (w - pw) / 2, off = (e.rolo || 0) % 1;
      for (let k = -1; k <= 1; k++) {
        const y = 120 + (k - off) * (ph + 24);
        if (y > h || y + ph < 90) continue;
        c.save(); c.beginPath(); c.rect(0, 90, w, h - 90); c.clip(); c.translate(x0, y); paginaDesenho(c, pw, ph, Math.max(1, Math.min(30, e.p + k))); c.restore();
      }
      rr(c, w - 16, 100 + (h - 160) * ((e.p - 1) / 29), 10, 60, 5, '#9aa0a6');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Bruno (do canal), o cliente, o seu Ari e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    const nAntes = menino.cabeca.children.length;
    menino.capaceteEspacial();
    capEsp = menino.cabeca.children[nAntes] || null;
    cliente = K.boneco({ cores: { camiseta: 0xe8352b, bermuda: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1e1e1e, pele: 0xc68e62 } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    ari = K.personagem('pizzaiolo'); K.semNome(ari.g); K.nomear('dono', ari.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A calçada: as páginas, a placa, o celular de perto e o galeto
    paginasG = fazPaginas(); guarda(paginasG, 'paginas', [0, 0, 0]);
    placaFora = fazPlaca(5.9, 0.78); guarda(placaFora.m, 'placa_cantina', [0, 3.55, 0.27]);
    placaDentro = fazPlaca(3.0, 0.95); guarda(placaDentro.m, 'placa_cantina', [2.0, 3.3, -4.27]);
    const fone = fazFone(); guarda(fone, null, FONE_F); foneG = fone;
    galeto = fazGaleto(); guarda(galeto, 'galeto', GALETO);
    // O escritório: o computador, a cadeira, o cavalete (mapa e planilha), a cuia, o xis, a barra e as telas
    comp = K.computador({ corMesa: 0x8b6a4a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    mapaT = K.telaCanvas(1.85, 1.35, 700); mapaG = fazCavalete(mapaT); mapaG.rotation.y = 0.3; guarda(mapaG, 'mapa', CAV);
    planT = K.telaCanvas(1.85, 1.35, 700); planG = fazCavalete(planT); planG.rotation.y = 0.3; guarda(planG, 'planilha', CAV);
    cuia = fazCuia(); guarda(cuia, 'cuia', CUIA);
    xis = fazXis(); guarda(xis, 'xis', [0, 1, 0], 1.3);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.7, 2.8, { px: 800 }); guarda(telaM, 'tela', TELA_L);
    // A cantina por dentro: o celular gigante
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL_D);

    fx.poof = K.poof(61);
    fx.fala = K.balaoFala();
    fx.pensa = K.balaoPensamento();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.onda = K.ondaChoque();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      pdf: e('PDF de 30 páginas', 'vermelho'), conc: e('Pediu no concorrente', 'vermelho'),
      web: e('Web designer', 'azul'), poa: e('Porto Alegre, RS', 'azul'), um: e('Um por um', 'laranja'),
      facil: e('Fácil', 'verde'), dificil: e('Difícil', 'vermelho'),
      invest: e('Investimento', 'verde'), precisa: e('Acha quem precisa de site', 'verde'),
      poa2: e('Porto Alegre, RS', 'azul'), separa: e('Com e sem site', 'verde'), chance: e('Mais chance de comprar', 'verde'),
      sopdf: e('Só um PDF', 'vermelho'), celular: e('Abre no celular', 'verde'),
      antes: e('Antes: um por um', 'vermelho'), porta: e('Agora: a porta certa', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Abre cardápio em PDF? Comenta <em>ABRO</em> ou <em>FECHO</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function sala(op = {}) {
    ve(comp, cuia, cadeira);
    comp.tela.desenhar(op.tela || siteBruno, op.chave || 'port');
    if (!op.sentado) { cadeira.position.set(SEAT[0], 0, SEAT[2] + 0.25); cadeira.rotation.set(0, 0, 0); }
  }
  function mapa(ativo) { ve(mapaG); mapaT.desenhar((c, w, h) => mapaDesenho(c, w, h, ativo), 'm' + ativo); }
  function fone(pos, e, giro = 0) {
    ve(foneG); foneG.position.set(...pos); foneG.rotation.set(0, giro, 0);
    foneT.desenhar((c, w, h) => foneDesenho(c, w, h, e), JSON.stringify(e));
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a calçada da CANTINA DO ARI de noite; o cliente olhando o celular; as páginas gigantes caindo e a pilha subindo · MOSTRA: cliente, paginas, placa_cantina
      // CENÁRIO: fachada da pizzaria de noite, carros passando
      const tGi = quando('gigante', B, 0.55), tCo = quando('concorrente', B, 0.88), tPdf = quando('PDF', B, 0.45);
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(c2 + 0.6, tCo - 0.15);
      ve(placaFora.m);
      // OBJETOS SE MEXENDO: as páginas caem girando e deitam na pilha
      paginasEm(tc - B.inicio);
      for (let i = 3; i < NPAG; i += 3) K.som('baque', B.inicio - 0.3 + i * 0.115, 0.35);
      // PERSONAGEM: olha o celular · em "gigante": mão na testa · em "concorrente": olha o celular de novo
      cliente.colocar(CLI, [CLI[0] - 0.2, 1.4, 9]);
      if (tc < tGi) cliente.reagir('celular', tc - B.inicio);
      else if (tc < tCo) { cliente.reagir('mao_na_testa', tc - tGi); cliente.humor('assustado'); }
      else { cliente.reagir('celular', tc - tCo); cliente.humor('feliz'); }
      K.som('whoosh', B.inicio + 0.02, 0.6); K.som('errado', tCo, 0.6);
      // CÂMERA: 4 cortes · (1) aberto, de baixo, as páginas caindo do céu · (2) médio, de frente · (3) alto, de cima · (4) perto, enterrado
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(3.2, 2.8, q), 0.7, K.lerp(10.5, 10.0, q)], [0.6, 3.2, 2.5]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(1.4, 1.1, q), 1.7, K.lerp(8.2, 7.6, q)], [0.85, 1.4, 3.0]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(-1.2, -0.6, q), 6.2, K.lerp(8.6, 8.0, q)], [0.9, 0.9, 3.0]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(1.9, 1.6, q), 1.6, K.lerp(7.4, 6.8, q)], [0.6, 1.35, 3.3]); }
      // EFEITOS VISUAIS: "PDF de 30 páginas" · "Pediu no concorrente" · ✗ · o celular de perto · balão
      if (tc > c1 && tc < c3) fx.et.pdf.em(mais(CLI, [0, 2.4, 0.2]), tc - Math.max(tPdf, c1));
      if (tc >= c3) {
        fone(mais(CLI, [-0.6, 1.85, 0.35]), { modo: 'outro' }, 0.2);
        foneG.scale.setScalar(0.6 * pop(tc - tCo));
        fx.et.conc.em(mais(CLI, [0.35, 2.45, 0.35]), tc - tCo);
        fx.simb.em(mais(CLI, [0.75, 2.0, 0.3]), tc - tCo - 0.2, { tipo: '✗', tam: 0.55 });
      }
    },
    bruno(B, tc) {
      // NA TELA: o escritório; a mesa do Bruno no meio (o computador com o mapa, a cuia); o cavalete com o mapa e os pinos · MOSTRA: personagem, mapa, monitor
      const tD = quando('designer', B, 0.2), tPo = quando('Porto', B, 0.35), tMa = quando('mapa', B, 0.68), tUm = quando('um', B, 0.85);
      const ativo = tc < tMa ? 0 : Math.min(PINOS.length - 1, Math.floor((tc - tMa) / 0.3));
      sala({ tela: (c, w, h) => mapaDesenho(c, w, h, ativo), chave: 'mm' + ativo, sentado: tc < tMa });
      mapa(ativo);
      for (let k = 0; k < 5; k++) K.som('bip', tMa + k * 0.3, 0.3);
      K.som('pingo', tD, 0.5);
      // PERSONAGEM: sentado, toma o chimarrão · em "mapa": levanta e aponta pino por pino
      if (tc < tMa) {
        sentado(MONITOR); menino.reagir('digitando', tc);
        // a cuia vai na mão em "Porto"
        if (tc > tPo - 0.3 && tc < tMa - 0.2) { const m = menino.mao(0); cuia.position.set(m[0], m[1] - 0.1, m[2] + 0.05); }
      } else {
        menino.colocar(DIANTE_CAV, QUADRO); menino.apontar(0.55 + Math.sin((tc - tMa) * 10) * 0.08); menino.humor('triste');
      }
      // CÂMERA: (1) até "mapa": chegando, médio, frente-direita, ele e o computador · (2) passando, perto, esquerda, o mapa
      if (tc < tMa) {
        { const q = K.suave(pc(tc, B.inicio, tMa)); K.mirar([K.lerp(2.9, 2.5, q), 1.85, K.lerp(-3.3, -3.0, q)], [0.5, 1.25, 0.1]); }
        if (tc < tPo) fx.et.web.em(cabecaDe(menino, 0.55), tc - tD); else fx.et.poa.em(cabecaDe(menino, 0.55), tc - tPo);
      } else {
        { const q = K.suave(pc(tc, tMa, B.ate)); K.mirar([K.lerp(-2.6, -2.0, q), 1.9, K.lerp(4.6, 4.4, q)], [-1.15, 1.6, -0.4]); }
        fx.et.um.em(mais(QUADRO, [0.3, 1.0, 0.3]), tc - tUm);
      }
    },
    dificil(B, tc) {
      // NA TELA: o escritório; a planilha gigante no cavalete, enchendo de linhas com "?" na coluna do site · MOSTRA: personagem, planilha
      const tF = quando('fácil', B, 0.25), tDi = quando('Difícil', B, 0.38), tRu = quando('ruim', B, 0.65), tNe = quando('nem', B, 0.8);
      sala({});
      ve(planG);
      const n = Math.min(7, Math.floor(pc(tc, B.inicio + 0.1, tDi) * 7.99));
      planT.desenhar((c, w, h) => planilhaDesenho(c, w, h, n), 'pl' + n);
      for (let k = 0; k < 7; k++) K.som('clique', B.inicio + 0.1 + k * (tDi - B.inicio - 0.1) / 7, 0.25);
      K.som('certo', tF, 0.5); K.som('errado', tDi, 0.6);
      // PERSONAGEM: faz que sim · em "Difícil": coça a cabeça · em "nem": mão na testa
      menino.colocar(DIANTE_CAV, tc < tDi ? QUADRO : [0.0, 1.5, 8]);
      if (tc < tDi) { menino.reagir('sim', tc - B.inicio); menino.humor('feliz'); }
      else if (tc < tNe) { menino.reagir('coca_cabeca', tc - tDi); menino.humor('triste'); }
      else { menino.reagir('mao_na_testa', tc - tNe); menino.humor('triste'); }
      // CÂMERA: (1) até "Difícil": subindo, aberto, frente · (2) chegando, perto, direita, o rosto
      if (tc < tDi) {
        { const q = K.suave(pc(tc, B.inicio, tDi)); K.mirar([-0.6, K.lerp(1.2, 1.9, q), K.lerp(6.6, 6.2, q)], [-1.1, 1.55, -0.4]); }
        fx.et.facil.em(mais(QUADRO, [0.2, 1.05, 0.3]), tc - tF);
      } else {
        { const q = K.suave(pc(tc, tDi, B.ate)); K.mirar([K.lerp(1.6, 1.3, q), 1.75, K.lerp(4.3, 3.8, q)], [-0.7, 1.45, 0.2]); }
        fx.et.dificil.em(mais(QUADRO, [0.4, 1.05, 0.3]), tc - tDi);
        fx.pensa.em(cabecaDe(menino, 0.2), tc - tRu, { texto: 'Qual tem site ruim?' });
        fx.simb.em(mais(QUADRO, [0.95, 0.6, 0.3]), tc - tNe, { tipo: '✗', tam: 0.5 });
      }
    },
    investe(B, tc) {
      // NA TELA: a mesa do Bruno; o Bruno de pé com o xis; o xis voa pro monitor e some num poof · MOSTRA: personagem, xis, monitor
      const tI = quando('investir', B, 0.2), tX = quando('xis', B, 0.42), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      const k = pc(tc, tS, tS + 0.8);
      sala({ tela: (c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), chave: 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10) });
      ve(xis);
      // PERSONAGEM: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [2.6, 1.3, 8]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: o xis na mão em "investir"; em "sistema", voa girando até o monitor e some
      const m = menino.mao(1);
      if (tc < tS) { xis.position.set(m[0] + 0.05, m[1] - 0.1, m[2] + 0.12); xis.rotation.set(0.3, tc * 0.8, 0); xis.scale.setScalar(1.3 * pop(tc - tI)); }
      else {
        const q = K.suave(k);
        xis.position.set(K.lerp(m[0], MONITOR[0], q), K.lerp(m[1], MONITOR[1], q) + Math.sin(q * PI) * 0.5, K.lerp(m[2], MONITOR[2] + 0.15, q));
        xis.rotation.set(q * 6, q * 4, 0); xis.scale.setScalar(1.3 * (1 - q * 0.85)); if (q >= 1) xis.visible = false;
      }
      fx.poof.em(mais(MONITOR, [0, 0, 0.2]), tc - tS - 0.8, { escala: 0.8 });
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.8, 0]), tc - tPr);
      K.som('ding', tX, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.8, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, esquerda, o xis · (2) passando, médio, direita, o monitor
      if (tc < tS) { const q = K.suave(pc(tc, B.inicio, tS)); K.mirar([K.lerp(4.6, 4.2, q), 1.8, K.lerp(4.9, 4.4, q)], [1.5, 1.35, 0.1]); }
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.8, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [xis.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'medio', lado: 25, altura: 'olho', tam: 2.0 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista dos restaurantes de Porto Alegre sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tR = quando('restaurantes', B, 0.5), tPo = quando('Porto', B, 0.7);
      sala({ sentado: true }); ve(navG);
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tR ? 1 + Math.floor((tc - tR) / 0.25) : 0;
        telaC.mostrar('listaRest', { n: Math.min(4, n), sel: n >= 2 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tR + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a lista
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [2.0, 1.1, 8]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.poa2.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tPo);
      // CÂMERA: (1) por cima do ombro, o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: a lua; o painel gigante do Mappoa flutuando (a lista separada, depois a análise com o score); o Bruno de capacete; o robô flutuando; a Terra no céu · MOSTRA: tela, personagem, robo
      const tM = quando('Mappoa', B, 0.1), tSe = quando('separa', B, 0.3), tCh = quando('chance', B, 0.78), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo);
      menino.capaceteEspacial();
      // ENTRA AGORA: o painel sobe do chão em "Mappoa", balançando devagar
      const kS = K.suave(pc(tc, tM - 0.25, tM + 0.35)), boia = Math.sin(tc * 1.6) * 0.06;
      telaM.g.position.set(TELA_L[0], K.lerp(0.4, TELA_L[1], kS) + boia, TELA_L[2]); telaM.g.scale.set(1, Math.max(0.05, kS), 1); telaM.g.rotation.set(0, 0.15, 0);
      if (tc < tCh) { const n = tc > tSe ? 1 + Math.floor((tc - tSe) / 0.22) : 0; telaM.mostrar('listaRest', { n: Math.min(4, n), sel: -1 }); }
      else telaM.mostrar('analiseAri', { a: Math.round(pc(tc, tCh, tCh + 0.7) * 0.88 * 20) / 20, ate: Math.min(4, 1 + Math.floor((tc - tCh) / 0.25)) });
      robo.g.position.set(ROBO_L[0], ROBO_L[1] + Math.sin(tc * 2) * 0.12, ROBO_L[2]); robo.g.rotation.set(0, 0.5, Math.sin(tc * 1.3) * 0.15); robo.em(tc, { acena: tc > tCo ? 1 : 0, mapa: true });
      // PERSONAGEM: surpreso · em "separa": aponta · em "chance": pulinho de comemoração
      menino.colocar(BRUNO_L, tc > tCh ? [1.2, 1.4, 7] : TELA_L);
      if (tc > tCh) { menino.reagir('comemorando', tc - tCh); menino.g.position.y = Math.max(0, Math.sin(K.clamp((tc - tCh) / 1.2) * PI)) * 0.5; }
      else if (tc > tSe) menino.apontar(0.55); else menino.reagir('surpreso', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.som('brilho', tM, 0.6); K.som('certo', tCo, 0.5);
      // CÂMERA: (1) até "chance": subindo, médio, esquerda · (2) chegando, perto, frente, o score
      if (tc < tCh) { const q = K.suave(pc(tc, B.inicio, tCh)); K.mirar([K.lerp(-1.6, -1.1, q), K.lerp(1.2, 2.0, q), K.lerp(10.6, 9.8, q)], [-0.3, 1.8, 0.0]); fx.et.separa.em(cabecaDe(menino, 0.75), tc - tSe); }
      else { const q = K.suave(pc(tc, tCh, B.ate)); K.mirar([K.lerp(1.0, 0.6, q), 2.0, K.lerp(9.2, 8.6, q)], [-0.3, 1.9, 0.0]); fx.et.chance.em(cabecaDe(menino, 0.75), tc - tCh); }
    },
    pdf(B, tc) {
      // NA TELA: o escritório; o painel com o PDF aberto e o contador "1 / 30" correndo até "30 / 30" · MOSTRA: tela, personagem
      const tAb = quando('abriu', B, 0.12), tTr = quando('trinta', B, 0.85), tPd = quando('PDF', B, 0.75);
      sala({});
      ve(telaC);
      const corre = pc(tc, tTr - 0.6, tTr + 0.5), p = tc < tAb ? 1 : Math.max(1, Math.round(1 + corre * 29));
      telaC.mostrar('pdfAri', { p, rolo: corre * 29 });
      // PERSONAGEM: aponta o PDF · em "PDF": cai sentado de susto
      menino.colocar([-0.75, 0, 1.6], TELA_Q);
      if (tc < tPd) { if (tc > tAb) menino.apontar(0.5); else menino.reagir('sim', tc - B.inicio); }
      else { menino.reagir('cai_sentado', tc - tPd); menino.humor('assustado'); }
      K.som('clique', tAb, 0.6); for (let k = 0; k < 8; k++) K.som('whoosh', tTr - 0.6 + k * 0.14, 0.2); K.som('errado', tPd, 0.6);
      // CÂMERA: (1) até "PDF": chegando, perto, frente, o painel · (2) afastando, médio, esquerda, ele no chão
      if (tc < tPd) K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tPd), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
      else {
        { const q = K.suave(pc(tc, tPd, B.ate)); K.mirar([K.lerp(-2.4, -2.9, q), 1.7, K.lerp(5.2, 5.8, q)], [-0.25, 1.2, 0.8]); }
        fx.et.sopdf.em(mais(TELA_Q, [0, 1.45, 0.2]), tc - tPd);
        fx.simb.em(mais(TELA_Q, [0.75, 1.0, 0.3]), tc - tPd - 0.2, { tipo: '!', tam: 0.5 });
      }
    },
    topou(B, tc) {
      // NA TELA: (1) a cantina por dentro: o seu Ari com o celular gigante e a mensagem do Bruno · (2) em "agora": a calçada de noite, o cliente na mesinha, o celular com o cardápio novo e o galeto · MOSTRA: cliente, galeto
      const tMe = quando('mensagem', B, 0.12), tTo = quando('topou', B, 0.42), tAg = quando('agora', B, 0.62), tCe = quando('celular', B, 0.92);
      if (tc < tAg) {
        ve(placaDentro.m, cel); cel.position.set(...CEL_D); cel.rotation.set(0, 0.5, 0);
        cel.userData.m3d.tela.desenhar((c, w, h) => celZap(c, w, h, { resp: tc > tTo }), 'z' + (tc > tTo ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tMe);
        // PERSONAGEM: o seu Ari lê · em "topou": comemora
        ari.colocar(ARI_D, tc < tTo ? mais(CEL_D, [0, 1.3, 0]) : [0.4, 1.4, 7]);
        if (tc > tTo) ari.reagir('comemorando', tc - tTo); else ari.reagir('surpreso', tc - B.inicio);
        fx.fala.em(cabecaDe(ari, 0.2), tc - tTo, { texto: 'Topo!' });
        K.som('pingo', tMe, 0.6); K.som('certo', tTo, 0.6);
        // CÂMERA: (1) passando, perto, o seu Ari e o celular
        { const q = K.suave(pc(tc, B.inicio, tAg)); K.mirar([K.lerp(1.0, 0.4, q), 1.75, 3.9], [-0.55, 1.45, -1.3]); }
      } else {
        ve(placaFora.m, galeto);
        galeto.scale.setScalar(pop(tc - tAg - 0.3));
        fx.simb2.em(mais(GALETO, [-0.55, 0.4, 0.3]), tc - tAg - 0.4, { tipo: '✓', tam: 0.4 });
        // PERSONAGEM: o cliente sentado na mesinha, toca no celular · em "celular": comemora
        cliente.colocar(CLI_SENTA, mais(MESA_F, [0, 0.9, 0])); cliente.sentar(1);
        if (tc > tCe) cliente.reagir('comemorando', tc - tCe); else cliente.reagir('celular', tc - tAg);
        cliente.humor('feliz');
        fone(FONE_F, { modo: 'cantina', pediu: tc > tCe }, -0.75);
        foneG.scale.setScalar(0.8 * pop(tc - tAg));
        K.som('ding', tCe, 0.6);
        // CÂMERA: (2) chegando, médio, o cliente na mesa
        { const q = K.suave(pc(tc, tAg, B.ate)); K.mirar([K.lerp(-3.9, -3.5, q), 1.75, K.lerp(6.6, 6.1, q)], [-0.95, 1.3, 2.9]); }
        fx.et.celular.em(mais(FONE_F, [0, 0.95, 0.1]), tc - tCe);
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o escritório, o Bruno cansado na frente do mapa · (2) Agora: a porta da CANTINA DO ARI, o Bruno bate e o seu Ari abre · MOSTRA: personagem, placa_cantina
      const tA = quando('Agora', B, 0.48), tPo = quando('porta', B, 0.85);
      if (tc < tA) {
        sala({}); mapa(Math.floor((tc - B.inicio) * 4) % PINOS.length);
        menino.colocar(DIANTE_CAV, QUADRO); menino.reagir('cansado', tc - B.inicio); menino.humor('triste');
        fx.et.antes.em(mais(QUADRO, [0.2, 1.05, 0.3]), tc - B.inicio - 0.1);
        K.som('errado', B.inicio + 0.3, 0.4);
        // CÂMERA: (1) parado, médio, de lado, o mapa
        K.mirar([1.6, 1.8, 4.4], [-1.1, 1.45, -0.2]);
      } else {
        ve(placaFora.m);
        // PERSONAGEM: o Bruno anda até a porta e bate · a porta abre e o seu Ari acena
        const chega = pc(tc, tA, tA + 0.8);
        menino.colocar([K.lerp(-0.6, PORTA[0], chega), 0, K.lerp(3.2, PORTA[2] + 0.35, chega)], mais(PORTA, [0, 1.3, -1]));
        if (chega < 1) menino.andar(tc); else if (tc < tPo) menino.apontar(0.6 + Math.abs(Math.sin((tc - tA) * 12)) * 0.12); else { menino.reagir('comemorando', tc - tPo); menino.humor('feliz'); }
        if (CUR && CUR.porta) CUR.porta.abrirEm(tc - tPo);
        if (tc > tPo) { ari.colocar(ARI_PORTA, cabecaDe(menino, -0.3)); ari.acenar(tc); ari.humor('feliz'); }
        K.som('baque', tA + 0.9, 0.35); K.som('baque', tA + 1.1, 0.35);
        fx.et.porta.em(mais(PORTA, [0, 2.6, 0.3]), tc - tPo);
        // CÂMERA: (2) de trás, seguindo o Bruno até a porta
        { const q = K.suave(pc(tc, tA, B.ate)); K.mirar([K.lerp(-0.4, 0.8, q), 2.0, K.lerp(7.6, 5.6, q)], [1.4, 1.5, 0.8]); }
      }
    },
    segue(B, tc) {
      // NA TELA: a mesa do Bruno; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      sala({}); ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-0.6, 0, 0.9); robo.g.rotation.set(0, 0.45, 0); robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [1.6, 1.4, 8]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
      else K.filmar([navG, comp, menino, robo], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); sala({}); ve(navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      robo.g.position.set(-0.6, 0, 0.9); robo.g.rotation.set(0, 0.45, 0); robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [1.6, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      // o cliente enterrado até o peito na pilha de páginas, mão na testa, páginas ainda caindo, a cantina acesa atrás
      ve(placaFora.m);
      paginasEm(3.5);
      cliente.colocar(CLI, [CLI[0] - 0.3, 1.5, 9]); cliente.reagir('mao_na_testa', 0.6); cliente.humor('assustado');
      K.mirar([1.7, 2.5, 7.2], [0.9, 1.35, 3.3]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CUR = CS.usar(plano === 'capa' ? 'fora' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cliente, ari].forEach((b) => { b.g.visible = false; b.g.scale.set(1, 1, 1); b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    if (capEsp) capEsp.visible = false;
    menino.g.position.y = 0; menino.humor('feliz'); cliente.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(...TELA_L); telaM.g.rotation.set(0, 0, 0);
    foneG.scale.setScalar(1); galeto.scale.setScalar(1);
    cuia.position.set(...CUIA); xis.rotation.set(0, 0, 0);
    cel.scale.setScalar(1.5);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
