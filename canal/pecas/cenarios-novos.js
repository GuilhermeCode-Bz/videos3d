// Cenários novos do canal: K.cenario(nome, op)
//   'palco_show'       palco de show ('palco' sozinho continua sendo o estúdio da Máquina): cortina vermelha, telão (op.texto ou C.telao.desenhar), treliça com refletores
//                      coloridos e a plateia no escuro. O personagem fica no centro do palco (C.personagem)
//   'vazio_colorido'   fundo infinito em degradê com formas flutuando (pra explicar uma ideia sem lugar nenhum).
//                      op.cor: 'azul' | 'rosa' | 'verde' | 'laranja' | 'roxo'
//   'escritorio_vidro' escritório de empresa grande: janelão com a cidade, sala de reunião de vidro, mesas com monitor
//   'cafeteria'        balcão com a máquina de café, quadro de cardápio, mesinhas e luz quente
//   'supermercado'     corredores de prateleiras cheias, placa de oferta e o caixa
// Todos com C.personagem, C.centro, C.entrada, C.vista e C.lugares próprios (listados em cada um). Chão em y = 0.
(function () {
  const K = window.K;
  const PI = Math.PI;
  const ANTES = K.cenario;
  const V3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  const normal = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]+/g, '_');
  const APELIDOS = { show: 'palco_show', palco_show: 'palco_show', palco_de_show: 'palco_show', vazio_colorido: 'vazio_colorido', fundo_colorido: 'vazio_colorido', vazio: 'vazio_colorido', escritorio_vidro: 'escritorio_vidro', escritorio_corporativo: 'escritorio_vidro', cafeteria: 'cafeteria', cafe: 'cafeteria', supermercado: 'supermercado', mercado: 'supermercado' };

  function canvasTex(w, h, fn, rep = [1, 1]) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    fn(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]);
    return t;
  }
  function caixa(pai, tam, mat, pos, sombra = true) {
    const m = K.malha(new THREE.BoxGeometry(tam[0], tam[1], tam[2]), typeof mat === 'number' ? K.mat(mat) : mat, sombra);
    m.position.set(...pos); pai.add(m); return m;
  }
  function m3d(pai, nome, pos, giro, op) {
    if (!K.m3d) return null;
    try { const m = K.m3d(nome, op || {}); m.position.set(...pos); m.rotation.y = giro || 0; pai.add(m); return m; } catch (e) { return null; }
  }
  const solido = (m, f = 0.1) => { if (!m) return; m.updateMatrixWorld(true); const b = new THREE.Box3().setFromObject(m); if (!b.isEmpty()) K.obstaculos.push(b.expandByScalar(f)); };
  // Sala: piso, fundo, laterais e teto (paredes de dentro). Devolve as medidas
  function sala(C, g, o) {
    const { fundo = -5, esq = -7, dir = 7, alt = 4.4, frente = 12 } = o, L = dir - esq, cen = (esq + dir) / 2, P = frente - fundo;
    const parede = (w, h, mat, p, y) => { const m = K.malha(new THREE.PlaneGeometry(w, h), mat, false); m.receiveShadow = true; m.position.set(...p); m.rotation.y = y || 0; g.add(m); return m; };
    const piso = K.malha(new THREE.PlaneGeometry(L, P), o.piso || K.mat(0xd8d4cc), false);
    piso.rotation.x = -PI / 2; piso.position.set(cen, 0, (fundo + frente) / 2); piso.receiveShadow = true; g.add(piso);
    const fundoM = parede(L, alt, o.parede || K.mat(0xf0f2f5, { side: THREE.DoubleSide }), [cen, alt / 2, fundo]);
    parede(P, alt, o.lado || o.parede || K.mat(0xf0f2f5, { side: THREE.DoubleSide }), [esq, alt / 2, (fundo + frente) / 2], PI / 2);
    parede(P, alt, o.lado || o.parede || K.mat(0xf0f2f5, { side: THREE.DoubleSide }), [dir, alt / 2, (fundo + frente) / 2], -PI / 2);
    const teto = K.malha(new THREE.PlaneGeometry(L, P), K.mat(o.teto || 0xf7f8fa, { side: THREE.DoubleSide }), false); teto.rotation.x = PI / 2; teto.position.set(cen, alt, (fundo + frente) / 2); g.add(teto);
    K.obstaculos.push(new THREE.Box3(V3([esq - 2, 0, fundo - 2]), V3([dir + 2, alt + 3, fundo + 0.05])), new THREE.Box3(V3([esq - 2, 0, fundo]), V3([esq + 0.05, alt + 3, frente])), new THREE.Box3(V3([dir - 0.05, 0, fundo]), V3([dir + 2, alt + 3, frente])));
    C.ceu = 'interior'; C.neblina = [80, 300, 600]; C.fundo = [cen, 2, fundo];
    return { fundo, esq, dir, alt, frente, fundoM };
  }

  const FEITOS = {};

  // ---------- Palco de show ----------
  FEITOS.palco_show = (C, g, op) => {
    C.ceu = 'escuro'; C.neblina = [30, 90, 300]; C.caixaSombra = 14;
    const preto = K.mat(0x15161a, { roughness: 0.35, metalness: 0.2 });
    // Piso do palco (brilhante) e a frente do palco descendo pra plateia
    caixa(g, [16, 1.0, 8], preto, [0, -0.5, -1]);
    caixa(g, [16.2, 0.06, 0.2], K.mat(0xf5c518, { emissive: 0xf5c518, emissiveIntensity: 0.5 }), [0, 0.0, 3.0], false);
    caixa(g, [40, 0.2, 30], K.mat(0x0d0e11), [0, -1.1, 15], false);
    // Cortina vermelha (dobras) e as laterais
    const cortina = K.mat(0x9a1420, { roughness: 0.75 });
    for (let x = -8; x <= 8; x += 0.45) { const d = K.malha(new THREE.CylinderGeometry(0.26, 0.26, 7.5, 10), cortina); d.position.set(x, 3.75, -5.2); g.add(d); }
    [-1, 1].forEach((l) => { for (let k = 0; k < 4; k++) { const d = K.malha(new THREE.CylinderGeometry(0.3, 0.42, 7.5, 10), cortina); d.position.set(l * (7.4 + k * 0.4), 3.75, 1.5 - k * 0.6); g.add(d); } });
    caixa(g, [18, 1.2, 0.6], K.mat(0x7a0f18), [0, 7.2, 2.6]);
    // Telão
    const telao = K.telaCanvas(7.2, 3.4, 720);
    telao.m.position.set(0, 3.9, -4.85);
    telao.m.material.toneMapped = false;
    g.add(telao.m);
    caixa(g, [7.5, 3.7, 0.2], K.mat(0x1e1f22), [0, 3.9, -4.98]);
    const texto = op.texto || 'AO VIVO';
    telao.desenhar((c, w, h) => {
      const d = c.createLinearGradient(0, 0, w, h); d.addColorStop(0, '#1067f8'); d.addColorStop(1, '#8a4fd8'); c.fillStyle = d; c.fillRect(0, 0, w, h);
      c.font = `900 ${Math.min(150, (w * 1.5) / Math.max(4, texto.length))}px Montserrat, Arial`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#ffffff'; c.fillText(texto, w / 2, h / 2);
    }, texto);
    C.telao = telao;
    // Treliça com refletores coloridos (cones de luz) e a luz que cai no palco
    const trelica = K.mat(0x8a929c, { metalness: 0.6, roughness: 0.35 });
    caixa(g, [14, 0.25, 0.25], trelica, [0, 6.6, 1.0]);
    const CORES = [0xff3b6b, 0x3b8bff, 0xffd23f, 0x3bffb0, 0xb05aff, 0xff8a3b];
    const feixes = [];
    for (let i = 0; i < 6; i++) {
      const x = -6 + i * 2.4, cor = CORES[i];
      const r = K.malha(new THREE.CylinderGeometry(0.16, 0.22, 0.4, 12), K.mat(0x1e1f22), false); r.position.set(x, 6.35, 1.0); g.add(r);
      const lente = new THREE.Mesh(new THREE.CircleGeometry(0.15, 16), new THREE.MeshBasicMaterial({ color: cor })); lente.rotation.x = PI / 2; lente.position.set(x, 6.14, 1.0); g.add(lente);
      const feixe = new THREE.Mesh(new THREE.ConeGeometry(1.2, 6.2, 24, 1, true).translate(0, -3.1, 0), new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
      feixe.position.set(x, 6.2, 1.0); g.add(feixe); feixes.push({ feixe, x, fase: i * 1.3 });
      const poca = new THREE.Mesh(new THREE.CircleGeometry(1.1, 24).rotateX(-PI / 2), new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending })); g.add(poca); feixes[i].poca = poca;
    }
    K.vivo((t) => feixes.forEach((f) => { const a = Math.sin(t * 0.8 + f.fase) * 0.35; f.feixe.rotation.z = a; f.feixe.rotation.x = Math.cos(t * 0.6 + f.fase) * 0.15; f.poca.position.set(f.x + Math.sin(-a) * 6.2 * -1, 0.02, 1.0 + Math.sin(f.feixe.rotation.x) * 6.2); }));
    const luzPalco = new THREE.SpotLight(0xfff1d6, 55, 30, 0.5, 0.6, 1); luzPalco.position.set(0, 9, 7); luzPalco.target.position.set(0, 0, 0); g.add(luzPalco, luzPalco.target);
    // Plateia: cabeças e ombros no escuro, com celulares acesos
    const r = K.rand(5), pub = K.mat(0x23252b, { roughness: 1 });
    for (let fila = 0; fila < 5; fila++) for (let i = -9; i <= 9; i++) {
      if (r() < 0.15) continue;
      const x = i * 0.8 + (fila % 2) * 0.4 + (r() - 0.5) * 0.2, z = 4.6 + fila * 1.1, y = -1 + fila * 0.25;
      const om = K.malha(new THREE.SphereGeometry(0.32, 10, 8), pub, false); om.scale.set(1, 0.7, 0.6); om.position.set(x, y + 0.75, z); g.add(om);
      const cab = K.malha(new THREE.SphereGeometry(0.17, 10, 8), pub, false); cab.position.set(x, y + 1.15, z); g.add(cab);
      if (r() < 0.12) { const cel = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshBasicMaterial({ color: 0xcfe6ff })); cel.position.set(x + 0.15, y + 1.45, z - 0.25); g.add(cel); }
    }
    K.obstaculos.push(new THREE.Box3(V3([-12, 0, -8]), V3([12, 12, -5.0])));
    C.centro = [0, 0, 0]; C.personagem = [0, 0, 0.6]; C.esquerda = [-2.4, 0, 0.6]; C.direita = [2.4, 0, 0.6]; C.entrada = [-6.5, 0, 0]; C.fundo = [0, 3.9, -4.85];
    Object.assign(C.lugares, { telao: [0, 3.9, -4.85], plateia: [0, 0, 7], beira: [0, 0, 2.6] });
    C.vista = { pos: [0, 2.2, 11], alvo: [0, 2.2, -2] };
  };

  // ---------- Fundo colorido infinito ----------
  const PALETAS = { azul: ['#cfe6ff', '#7fb2ff', [0x1067f8, 0xffd23f, 0xffffff, 0x3fb8ff]], rosa: ['#ffe0ec', '#ff9ec2', [0xff4d8a, 0xffd23f, 0xffffff, 0x8a4fd8]], verde: ['#e2ffe9', '#8fe0a8', [0x2fb54a, 0xffd23f, 0xffffff, 0x1067f8]], laranja: ['#fff0dc', '#ffbb6b', [0xf39a1e, 0xe8352b, 0xffffff, 0x1067f8]], roxo: ['#efe3ff', '#b48aff', [0x8a4fd8, 0xffd23f, 0xffffff, 0xff4d8a]] };
  FEITOS.vazio_colorido = (C, g, op) => {
    const P = PALETAS[normal(op.cor || 'azul')] || PALETAS.azul;
    C.ceu = 'interior'; C.neblina = [200, 600, 900]; C.caixaSombra = 12;
    const tex = canvasTex(16, 256, (c, w, h) => { const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, P[1]); d.addColorStop(0.55, P[0]); d.addColorStop(1, P[0]); c.fillStyle = d; c.fillRect(0, 0, w, h); });
    const ceu = new THREE.Mesh(new THREE.SphereGeometry(120, 32, 16), new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false }));
    g.add(ceu);
    const chao = K.malha(new THREE.CircleGeometry(80, 64).rotateX(-PI / 2), K.mat(new THREE.Color(P[0]).getHex(), { roughness: 0.9 }), false);
    chao.receiveShadow = true; g.add(chao);
    // Formas flutuando
    const r = K.rand(op.seed || 13), formas = [];
    const geos = [new THREE.SphereGeometry(0.4, 24, 16), new THREE.TorusGeometry(0.4, 0.14, 12, 32), new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.ConeGeometry(0.4, 0.7, 24), new THREE.OctahedronGeometry(0.45, 0)];
    for (let i = 0; i < 16; i++) {
      const a = r() * PI * 2, d = 6 + r() * 12;
      const m = K.malha(geos[i % geos.length], K.mat(P[2][i % P[2].length], { roughness: 0.4 }));
      const base = [Math.sin(a) * d, 1.5 + r() * 6, -Math.abs(Math.cos(a) * d) - 2];
      m.position.set(...base); m.scale.setScalar(0.7 + r() * 1.2); g.add(m);
      formas.push({ m, base, f: r() * 6 });
    }
    K.vivo((t) => formas.forEach((o) => { o.m.position.y = o.base[1] + Math.sin(t * 0.8 + o.f) * 0.3; o.m.rotation.set(t * 0.3 + o.f, t * 0.4 + o.f, 0); }));
    C.centro = [0, 0, 0]; C.personagem = [1.2, 0, 0.6]; C.esquerda = [-2, 0, 0.4]; C.direita = [2.4, 0, 0.4]; C.entrada = [-5, 0, 2]; C.fundo = [0, 3, -12];
    C.vista = { pos: [0, 2, 10], alvo: [0, 1.6, -4] };
  };

  // ---------- Escritório de vidro ----------
  FEITOS.escritorio_vidro = (C, g, op) => {
    const noite = C.noite;
    const piso = K.mat(0xffffff, { map: canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#c9ccd1'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8bcc2'; c.lineWidth = 3; c.strokeRect(0, 0, w, h); }, [8, 8]), roughness: 0.3, metalness: 0.1 });
    const s = sala(C, g, { fundo: -6, esq: -8, dir: 8, alt: 4.2, frente: 12, piso, parede: K.mat(0xeef1f5, { side: THREE.DoubleSide }), lado: K.mat(0x2a3a5a, { side: THREE.DoubleSide }) });
    s.fundoM.visible = false;
    // Janelão com a cidade (de dia ou de noite)
    const cidade = canvasTex(1024, 384, (c, w, h) => {
      const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, noite ? '#0d1a3a' : '#7fbdf0'); d.addColorStop(1, noite ? '#3a3f6b' : '#d6ecfb'); c.fillStyle = d; c.fillRect(0, 0, w, h);
      const r = K.rand(9);
      for (let i = 0; i < 26; i++) { const x = i * 40 + r() * 10, bw = 30 + r() * 30, bh = 90 + r() * 240; c.fillStyle = noite ? '#1b2440' : ['#a9bbcb', '#93a7ba', '#bccbd8'][i % 3]; c.fillRect(x, h - bh, bw, bh); c.fillStyle = noite ? '#ffd98a' : 'rgba(255,255,255,.5)'; for (let y = h - bh + 8; y < h - 6; y += 14) for (let xx = x + 4; xx < x + bw - 6; xx += 10) if (r() < (noite ? 0.45 : 0.3)) c.fillRect(xx, y, 5, 7); }
    });
    const jan = new THREE.Mesh(new THREE.PlaneGeometry(16, 4.2), new THREE.MeshBasicMaterial({ map: cidade }));
    jan.position.set(0, 2.1, -6.05); g.add(jan);
    for (let x = -8; x <= 8; x += 2) caixa(g, [0.08, 4.2, 0.1], 0x3a3f4a, [x, 2.1, -5.98]);
    caixa(g, [16, 0.1, 0.1], 0x3a3f4a, [0, 0.5, -5.98]);
    // Parede da marca
    const logo = K.placa(op.texto || 'EMPRESA', { larg: 3, alt: 0.6, fundo: '#2a3a5a', cor: '#ffffff', borda: '#2a3a5a' });
    logo.position.set(-7.95, 2.8, 2.5); logo.rotation.y = PI / 2; g.add(logo);
    // Sala de reunião de vidro (à esquerda, no fundo)
    const vidro = new THREE.MeshStandardMaterial({ color: 0xcfe8f7, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.2, depthWrite: false, side: THREE.DoubleSide });
    const vid = (w, p, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, 3.2), vidro); m.position.set(...p); m.rotation.y = y || 0; m.renderOrder = 4; g.add(m); caixa(g, [y ? 0.06 : w, 0.08, y ? w : 0.06], 0x3a3f4a, [p[0], 3.24, p[2]]); };
    vid(6, [-5, 1.6, -1.0]); vid(5, [-2, 1.6, -3.5], PI / 2);
    caixa(g, [3.4, 0.08, 1.4], 0xf4f1ea, [-5, 0.76, -3.5]); [-6.4, -3.6].forEach((x) => caixa(g, [0.1, 0.72, 1.2], 0x3a3f4a, [x, 0.36, -3.5]));
    [-6.2, -5, -3.8].forEach((x) => { m3d(g, 'cadeira_giratoria', [x, 0, -2.6], PI); m3d(g, 'cadeira_giratoria', [x, 0, -4.4], 0); });
    m3d(g, 'tv_parede', [-5, 2.2, -5.95], 0, { l: 2.2 });
    // Mesas de trabalho com monitor
    [[1.5, -3.2], [4.5, -3.2], [1.5, -0.6], [4.5, -0.6]].forEach(([x, z], i) => { solido(m3d(g, 'mesa', [x, 0, z], 0)); m3d(g, 'monitor', [x - 0.3, 0.79, z - 0.2]); m3d(g, 'monitor', [x + 0.4, 0.79, z - 0.2]); m3d(g, 'cadeira_giratoria', [x, 0, z + 0.85], PI); if (i % 2) m3d(g, 'caneca', [x + 0.75, 0.79, z + 0.1]); });
    ['planta_alta', 'planta_alta', 'planta'].forEach((n, i) => m3d(g, n, [[7.3, 0, -5.3], [-0.8, 0, -5.3], [7.3, 0, 3]][i]));
    m3d(g, 'sofa', [6.6, 0, 6], -PI / 2);
    for (let x = -6; x <= 6; x += 3) for (let z = -4; z <= 8; z += 4) caixa(g, [1.6, 0.04, 0.3], K.mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.9 }), [x, 4.15, z], false);
    C.centro = [1.5, 0, 2]; C.personagem = [2.4, 0, 2.4]; C.esquerda = [0, 0, 2.2]; C.direita = [4.2, 0, 2.2]; C.entrada = [3, 0, 9];
    Object.assign(C.lugares, { janela: [0, 1.6, -5.6], reuniao: [-5, 0.8, -3.5], mesa: [1.5, 0.8, -0.6], logo: [-7.9, 2.8, 2.5], sofa: [6.6, 0.5, 6] });
    C.vista = { pos: [3.5, 2.4, 10], alvo: [-0.5, 1.6, -4] };
  };

  // ---------- Cafeteria ----------
  FEITOS.cafeteria = (C, g) => {
    const tijolo = canvasTex(256, 256, (c, w, h) => { c.fillStyle = '#d7cfc4'; c.fillRect(0, 0, w, h); const r = K.rand(3); for (let j = 0; j < 8; j++) for (let i = -1; i < 5; i++) { c.fillStyle = ['#8a4a35', '#9a5640', '#7a4030'][Math.floor(r() * 3)]; c.fillRect(i * 64 + (j % 2) * 32 + 3, j * 32 + 3, 58, 26); } }, [5, 2]);
    const piso = K.mat(0xffffff, { map: canvasTex(256, 256, (c, w, h) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#8a5f3c' : '#7a5234'; c.fillRect(0, (i * h) / 8, w, h / 8); } }, [4, 4]), roughness: 0.6 });
    const s = sala(C, g, { fundo: -4.4, esq: -6.5, dir: 6.5, alt: 4, frente: 10, piso, parede: K.mat(0xffffff, { map: tijolo, side: THREE.DoubleSide }), lado: K.mat(0xe9dcc8, { side: THREE.DoubleSide }), teto: 0x4a3426 });
    // Balcão com a máquina e as xícaras
    const bal = m3d(g, 'balcao', [-1.2, 0, -2.6], 0, { l: 5, faixa: 0x6b4a2f, tampo: 0x3a2a1e }); solido(bal);
    m3d(g, 'cafeteira', [-2.6, 1.08, -2.75]); m3d(g, 'cafeteira', [-2.0, 1.08, -2.75]); m3d(g, 'caixa_registradora', [0.8, 1.08, -2.6], 0.3);
    for (let i = 0; i < 4; i++) { const x = K.malha(new THREE.CylinderGeometry(0.06, 0.05, 0.09, 14), K.mat(0xffffff)); x.position.set(-0.8 + i * 0.22, 1.13, -2.4); g.add(x); }
    // Vitrine de doces
    caixa(g, [1.2, 0.5, 0.5], K.mat(0xcfe8f7, { transparent: true, opacity: 0.35 }), [-0.2, 1.33, -2.55], false);
    [0xf2b6c6, 0xb07a48, 0xffe0a3].forEach((c, i) => { const d = K.malha(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16), K.mat(c)); d.position.set(-0.55 + i * 0.35, 1.16, -2.55); g.add(d); });
    // Quadro do cardápio
    const menu = K.telaCanvas(3.2, 1.5, 640);
    menu.desenhar((c, w, h) => {
      c.fillStyle = '#1e2420'; c.fillRect(0, 0, w, h); c.strokeStyle = '#8b5b35'; c.lineWidth = 16; c.strokeRect(0, 0, w, h);
      c.fillStyle = '#ffffff'; c.font = '900 52px Montserrat, Arial'; c.textAlign = 'center'; c.fillText('CAFÉ', w / 2, 66);
      c.font = '700 30px Montserrat, Arial'; c.textAlign = 'left';
      [['Expresso', '6,00'], ['Cappuccino', '9,50'], ['Pão de queijo', '5,00'], ['Bolo do dia', '8,00']].forEach(([a, b], i) => { c.fillText(a, 50, 120 + i * 42); c.textAlign = 'right'; c.fillText(b, w - 50, 120 + i * 42); c.textAlign = 'left'; });
    }, 'm');
    menu.m.position.set(-1.2, 2.75, s.fundo + 0.05); g.add(menu.m);
    // Luminárias pendentes quentes, mesinhas e plantas
    [-3, -1.2, 0.6].forEach((x) => m3d(g, 'pendente', [x, 4, -2.4], 0, { cor: 0x2a2e33 }));
    [[3.2, -1.6], [3.2, 1.6], [0.4, 1.8], [-3.2, 1.4]].forEach(([x, z]) => { m3d(g, 'mesa_redonda', [x, 0, z], 0, { cor: 0xe9dcc8 }); m3d(g, 'cadeira', [x + 0.75, 0, z], -PI / 2, { cor: 0x6b4a2f }); m3d(g, 'cadeira', [x - 0.75, 0, z], PI / 2, { cor: 0x6b4a2f }); const x2 = K.malha(new THREE.CylinderGeometry(0.06, 0.05, 0.09, 14), K.mat(0xffffff)); x2.position.set(x + 0.15, 0.83, z); g.add(x2); });
    m3d(g, 'planta_alta', [5.9, 0, -3.8]); m3d(g, 'planta', [-5.9, 0, 3]);
    [-2.2, -0.2].forEach((x) => m3d(g, 'banqueta', [x, 0, -1.9], 0, { cor: 0x6b4a2f }));
    const luz = new THREE.PointLight(0xffc98a, 14, 14, 1.2); luz.position.set(-1, 3.2, -1); g.add(luz);
    C.centro = [0, 0, 0]; C.personagem = [1.4, 0, 0]; C.esquerda = [-1.4, 0, -1.4]; C.direita = [2.6, 0, 0.2]; C.entrada = [1, 0, 8];
    Object.assign(C.lugares, { balcao: [-1.2, 1.1, -2.6], cardapio: [-1.2, 2.75, s.fundo], mesa: [3.2, 0.8, -1.6], caixa: [0.8, 1.1, -2.6] });
    C.vista = { pos: [2.8, 2.2, 8.4], alvo: [-0.6, 1.5, -2.5] };
  };

  // ---------- Supermercado ----------
  FEITOS.supermercado = (C, g, op) => {
    const piso = K.mat(0xffffff, { map: canvasTex(128, 128, (c, w, h) => { c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#e2e4e0'; c.fillRect(0, 0, w / 2, h / 2); c.fillRect(w / 2, h / 2, w / 2, h / 2); }, [14, 14]), roughness: 0.3 });
    const s = sala(C, g, { fundo: -12, esq: -9, dir: 9, alt: 5, frente: 10, piso, parede: K.mat(0xf6f1e4, { side: THREE.DoubleSide }), lado: K.mat(0xf6f1e4, { side: THREE.DoubleSide }) });
    caixa(g, [18, 0.6, 0.05], K.mat(0xe8352b), [0, 4.2, s.fundo + 0.03], false);
    const r = K.rand(op.seed || 21), CORES = [0xe8352b, 0xf5c518, 0x2fb54a, 0x1067f8, 0xf39a1e, 0x8a4fd8, 0xffffff, 0xff4d8a, 0x3fb8c8];
    // Corredores de prateleiras (produtos em InstancedMesh)
    const geoP = new THREE.BoxGeometry(1, 1, 1), matP = K.mat(0xffffff, { roughness: 0.6 });
    const prods = new THREE.InstancedMesh(geoP, matP, 2400);
    prods.castShadow = true; prods.receiveShadow = true;
    let n = 0; const M = new THREE.Matrix4(), cor = new THREE.Color();
    const NOMES = ['BEBIDAS', 'MERCEARIA', 'LIMPEZA', 'HIGIENE'];
    [-6, -2, 2, 6].forEach((x, ci) => {
      const est = K.mat(0xd8dde3, { metalness: 0.3, roughness: 0.5 });
      caixa(g, [1.2, 2.2, 10], est, [x, 1.1, -5.5]);
      [0.15, 0.7, 1.25, 1.8].forEach((y) => [-1, 1].forEach((l) => {
        caixa(g, [0.35, 0.04, 10], est, [x + l * 0.78, y, -5.5], false);
        for (let z = -10.3; z < -0.8; z += 0.32) {
          if (n >= 2400) break;
          const w = 0.2 + r() * 0.08, h = 0.22 + r() * 0.24, d = 0.2;
          M.makeScale(d, h, w); M.setPosition(x + l * 0.8, y + 0.02 + h / 2, z);
          prods.setMatrixAt(n, M); prods.setColorAt(n, cor.setHex(CORES[Math.floor(r() * CORES.length)])); n++;
        }
      }));
      K.obstaculos.push(new THREE.Box3(V3([x - 1, 0, -10.6]), V3([x + 1, 2.4, -0.4])));
      const placa = K.placa(NOMES[ci], { larg: 1.8, alt: 0.45, fundo: '#1067f8', cor: '#ffffff', borda: '#1067f8' });
      placa.position.set(x, 3.4, -0.6); g.add(placa);
      const tras = placa.clone(); tras.rotation.y = PI; tras.position.z -= 0.01; g.add(tras);
      caixa(g, [0.02, 1.0, 0.02], 0x8a929c, [x, 4.1, -0.6], false);
    });
    prods.count = n; g.add(prods);
    // Placa de oferta e o caixa na frente
    const oferta = K.placa(op.texto || 'OFERTA!', { larg: 2.2, alt: 0.8, fundo: '#f5c518', cor: '#e8352b', borda: '#e8352b' });
    oferta.position.set(0, 3.0, s.fundo + 0.06); g.add(oferta);
    [[-4.5, 3.4], [0, 3.4]].forEach(([x, z]) => { const b = m3d(g, 'balcao', [x, 0, z], 0, { l: 2.2, faixa: 0xe8352b }); solido(b); m3d(g, 'caixa_registradora', [x - 0.5, 1.08, z], 0.2); caixa(g, [0.05, 2.4, 0.05], 0x8a929c, [x + 1.0, 1.2, z], false); const nn = K.placa(String(x < 0 ? 1 : 2), { larg: 0.4, alt: 0.4, fundo: '#e8352b', cor: '#ffffff', borda: '#ffffff' }); nn.position.set(x + 1.0, 2.6, z + 0.04); g.add(nn); });
    m3d(g, 'carrinho_compras', [4.2, 0, 2.6], -0.5);
    for (let x = -7; x <= 7; x += 3.5) for (let z = -10; z <= 6; z += 4) caixa(g, [2.2, 0.05, 0.3], K.mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 1 }), [x, 4.95, z], false);
    C.centro = [0, 0, -4]; C.personagem = [0, 0, -2.5]; C.esquerda = [-0.6, 0, -3]; C.direita = [0.6, 0, -3]; C.entrada = [0, 0, 8];
    Object.assign(C.lugares, { corredor: [0, 0, -5], corredor2: [-4, 0, -5], corredor3: [4, 0, -5], caixa: [0, 1.1, 3.4], oferta: [0, 3, s.fundo] });
    C.rua = { de: [0, 0, 0], ate: [0, 0, -10] };
    C.vista = { pos: [1.2, 2.4, 8.5], alvo: [0, 1.6, -6] };
  };

  K.cenario = function (nome, op = {}) {
    const chave = APELIDOS[normal(nome)];
    if (!chave) return ANTES(nome, op);
    const g = new THREE.Group(); g.name = 'cenario-' + chave; K.scene.add(g);
    const C = { nome: chave, grupo: g, noite: op.hora === 'noite', hora: op.hora || 'dia', centro: [0, 0, 0], personagem: [1.6, 0, 0.9], entrada: [-3, 0, 4.5], esquerda: [-2.6, 0, 0.4], direita: [2.9, 0, 0.3], fundo: [0, 3, -12], lugares: {}, objetos: {}, ceu: 'interior', neblina: [60, 220, 600], caixaSombra: 16, vista: { pos: [2.5, 2.2, 11], alvo: [0, 1.8, -8] } };
    FEITOS[chave](C, g, op);
    Object.entries(C.objetos).forEach(([n, o]) => (Array.isArray(o) ? o : [o]).forEach((x) => { if (x && (x.isObject3D || (x.g && x.g.isObject3D))) K.nomear(n, x); }));
    if (op.ceu) C.ceu = op.ceu;
    K.vivo(() => { if (Array.isArray(C.ceu)) K.ceu(...C.ceu); else K.ceu(C.ceu); K.neblina(...C.neblina); K.caixaSombra(C.caixaSombra); });
    C.lugares = Object.assign({ centro: C.centro, personagem: C.personagem, entrada: C.entrada, esquerda: C.esquerda, direita: C.direita, fundo: C.fundo }, C.lugares);
    K.cenarioAtual = C;
    return C;
  };
  K.CENARIOS_NOVOS = Object.keys(FEITOS);
})();
