// Cenários do visual motion, com as cores e a luz da referência 3D motion (VIDEOS CHAT/ANALISE REFERENCIA):
//   K.cenario('escritorio_azul')  escritório claro: parede branca com faixa verde-água, carpete azul-cobalto, teto de
//                                 placas com luz, janelão com a cidade, baias com mesa, monitor e cadeira, estante de
//                                 livros coloridos, mural de cortiça, bebedouro, porta com placa
//   K.cenario('sala_verde')       a sala isolada: tijolo verde-menta, piso de ladrilho azul-acinzentado, faixa de sol
//                                 amarela na parede, mesa cinza de metal com gavetas, relógio de borda vermelha, porta azul
//   K.cenario('predio_noite')     o prédio de escritórios à noite: fachada azul-marinho cheia de janelas, umas acesas e
//                                 quentes, outros prédios atrás e o céu roxo-escuro (op.janela = [andar, coluna] da janela
//                                 acesa principal, que vira C.lugares.janela)
// Lugares (C.lugares) e objetos com nome (C.objetos) pra câmera e pro "mostra" do roteiro.json. Melhor com "visual":
// "motion" (contorno e sombreado pintado), mas funciona sem.
(function () {
  const K = window.K;
  if (!K || K.cenariosMotion) return;
  const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  const PI = Math.PI;

  // ---------- Ajudantes ----------
  const tex = (w, h, fn, rx = 1, ry = 1) => {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h; fn(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry);
    t.anisotropy = 8; return t;
  };
  const mat = (cor, op = {}) => K.mat(cor, Object.assign({ roughness: 0.9 }, op));
  function caixa(pai, tam, cor, pos, rot, op = {}) {
    const m = K.malha(new THREE.BoxGeometry(...tam), cor && cor.isMaterial ? cor : mat(cor, op), op.sombra !== false);
    m.position.set(...pos); if (rot) m.rotation.set(...rot); pai.add(m); return m;
  }
  function cil(pai, rt, rb, a, cor, pos, op = {}) {
    const m = K.malha(new THREE.CylinderGeometry(rt, rb, a, op.lados || 24), cor && cor.isMaterial ? cor : mat(cor, op));
    m.position.set(...pos); if (op.rot) m.rotation.set(...op.rot); pai.add(m); return m;
  }
  function plano(pai, w, h, material, pos, rot) {
    const m = K.malha(new THREE.PlaneGeometry(w, h), material, false);
    m.castShadow = false; m.receiveShadow = true; m.position.set(...pos); if (rot) m.rotation.set(...rot); pai.add(m); return m;
  }
  const grupo = (pai, pos = [0, 0, 0], giro = 0) => { const g = new THREE.Group(); g.position.set(...pos); g.rotation.y = giro; pai.add(g); return g; };
  const solido = (o, f = 0.12) => { o.updateMatrixWorld(true); const b = new THREE.Box3().setFromObject(o); if (!b.isEmpty()) K.obstaculos.push(b.expandByScalar(f)); };
  // Placa impressa colada (papel com fita): o letreiro que explica a cena sem narração
  function placaPapel(pai, linhas, op = {}) {
    const { larg = 0.9, alt = 0.5, fundo = '#fbfaf6', cores = ['#1d3b9a', '#e2332b'], fita = true } = op;
    const px = 600, cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round(px * alt / larg);
    const c = cv.getContext('2d');
    c.fillStyle = fundo; c.fillRect(0, 0, cv.width, cv.height);
    c.strokeStyle = '#1b1b22'; c.lineWidth = 10; c.strokeRect(5, 5, cv.width - 10, cv.height - 10);
    const ls = [].concat(linhas), tam = Math.min(110, (cv.height * 0.72) / ls.length);
    ls.forEach((l, i) => {
      c.font = `900 ${tam}px Montserrat, 'Arial Black', sans-serif`; c.fillStyle = cores[i % cores.length]; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(l, cv.width / 2, cv.height / 2 + (i - (ls.length - 1) / 2) * tam * 1.08, cv.width - 50);
    });
    if (fita) { c.fillStyle = 'rgba(240,214,140,.85)'; [[30, 10], [cv.width - 130, 10]].forEach(([x, y]) => { c.save(); c.translate(x + 50, y + 12); c.rotate(-0.2); c.fillRect(-55, -14, 110, 28); c.restore(); }); }
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const m = K.malha(new THREE.BoxGeometry(larg, alt, 0.012), [mat(0xf0efe8), mat(0xf0efe8), mat(0xf0efe8), mat(0xf0efe8), mat(0xffffff, { map: t }), mat(0xf0efe8)], false);
    pai.add(m); return m;
  }
  K.placaPapel = (linhas, op = {}) => { const m = placaPapel(K.scene, linhas, op); return m; };

  // Sala: piso, paredes (fundo, esquerda, direita) e teto, com os limites pra câmera
  function sala(C, g, o) {
    const { fundo, esq, dir, alt, frente = fundo + 16 } = o, L = dir - esq, P = frente - fundo, cx = (esq + dir) / 2, cz = (fundo + frente) / 2;
    plano(g, L, P, o.piso, [cx, 0, cz], [-PI / 2, 0, 0]);
    plano(g, L, alt, o.parede, [cx, alt / 2, fundo]);
    plano(g, P, alt, o.paredeLado || o.parede, [esq, alt / 2, cz], [0, PI / 2, 0]);
    plano(g, P, alt, o.paredeLado || o.parede, [dir, alt / 2, cz], [0, -PI / 2, 0]);
    if (o.teto) plano(g, L, P, o.teto, [cx, alt, cz], [PI / 2, 0, 0]);
    K.obstaculos.push(new THREE.Box3(V([esq - 2, -1, fundo - 2]), V([dir + 2, alt + 4, fundo + 0.05])),
      new THREE.Box3(V([esq - 2, -1, fundo]), V([esq + 0.05, alt + 4, frente])), new THREE.Box3(V([dir - 0.05, -1, fundo]), V([dir + 2, alt + 4, frente])),
      new THREE.Box3(V([esq - 2, alt - 0.05, fundo]), V([dir + 2, alt + 4, frente])));
  }

  // Móveis do escritório
  function cadeira(pai, pos, giro, cor = 0x8ea3c8) {
    const c = grupo(pai, pos, giro);
    caixa(c, [0.52, 0.09, 0.5], cor, [0, 0.5, 0]);
    caixa(c, [0.5, 0.6, 0.08], cor, [0, 0.88, -0.23], [-0.08, 0, 0]);
    cil(c, 0.035, 0.035, 0.42, 0x3a3f4a, [0, 0.27, 0]);
    for (let k = 0; k < 5; k++) { const a = (k / 5) * PI * 2; caixa(c, [0.34, 0.035, 0.05], 0x3a3f4a, [Math.cos(a) * 0.15, 0.05, Math.sin(a) * 0.15], [0, -a, 0]); }
    return c;
  }
  function monitor(pai, pos, giro, tela = 0x9fd1ff) {
    const m = grupo(pai, pos, giro);
    caixa(m, [0.62, 0.4, 0.04], 0x22252c, [0, 0.33, 0]);
    caixa(m, [0.56, 0.34, 0.01], mat(tela, { emissive: tela, emissiveIntensity: 0.45 }), [0, 0.33, 0.022], null, { sombra: false });
    caixa(m, [0.05, 0.14, 0.04], 0x22252c, [0, 0.07, -0.01]);
    caixa(m, [0.24, 0.02, 0.16], 0x22252c, [0, 0.01, 0]);
    return m;
  }
  function mesa(pai, pos, giro, op = {}) {
    const m = grupo(pai, pos, giro);
    caixa(m, [1.5, 0.05, 0.75], op.tampo || 0xf4f4f1, [0, 0.74, 0]);
    caixa(m, [0.05, 0.72, 0.7], op.lado || 0xb9c1cf, [-0.72, 0.36, 0]);
    caixa(m, [0.05, 0.72, 0.7], op.lado || 0xb9c1cf, [0.72, 0.36, 0]);
    if (op.gavetas !== false) {
      const gv = caixa(m, [0.42, 0.62, 0.68], op.gaveteiro || 0xc9d0dc, [0.48, 0.38, 0]);
      for (let k = 0; k < 3; k++) caixa(m, [0.3, 0.025, 0.02], 0x2a2d35, [0.48, 0.2 + k * 0.2, 0.345]);
      gv.name = 'gaveteiro';
    }
    if (op.divisoria) caixa(m, [1.55, 0.5, 0.05], op.divisoria, [0, 0.99, -0.4]);
    if (op.monitor !== false) monitor(m, [-0.15, 0.765, -0.2], 0, op.tela);
    if (op.cadeira !== false) cadeira(m, [-0.1, 0, 0.62], PI + (op.giroCadeira || 0));
    return m;
  }
  function estante(pai, pos, giro, seed = 5) {
    const e = grupo(pai, pos, giro), r = K.rand(seed);
    const CORES = [0xe2332b, 0xf5c518, 0x2fb54a, 0x2f6fd6, 0x8a4fd8, 0xf39a1e, 0x26a7a1, 0xffffff];
    caixa(e, [1.4, 1.9, 0.38], 0xeef0f3, [0, 0.95, 0]);
    for (let n = 0; n < 4; n++) {
      const y = 0.12 + n * 0.46;
      caixa(e, [1.32, 0.03, 0.34], 0xd6dbe3, [0, y, 0.03]);
      let x = -0.62;
      while (x < 0.6) {
        const w = 0.04 + r() * 0.05, h = 0.28 + r() * 0.1;
        caixa(e, [w, h, 0.26], CORES[Math.floor(r() * CORES.length)], [x + w / 2, y + 0.015 + h / 2, 0.06], [0, 0, r() < 0.08 ? 0.18 : 0]);
        x += w + 0.008;
      }
    }
    return e;
  }
  function mural(pai, pos, giro) {
    const m = grupo(pai, pos, giro);
    const papeis = tex(512, 340, (c, w, h) => {
      c.fillStyle = '#c98a4a'; c.fillRect(0, 0, w, h);
      const r = K.rand(3);
      for (let i = 0; i < 400; i++) { c.fillStyle = r() < 0.5 ? 'rgba(90,50,20,.18)' : 'rgba(255,220,170,.15)'; c.fillRect(r() * w, r() * h, 3, 3); }
      [['#ffffff', 30, 30, 120, 150], ['#fff27a', 175, 40, 110, 110], ['#ffffff', 310, 25, 160, 120], ['#9fd4ff', 60, 200, 130, 110], ['#ffffff', 230, 175, 120, 140], ['#ffb3c1', 380, 180, 100, 100]]
        .forEach(([cor, x, y, ww, hh], i) => { c.save(); c.translate(x + ww / 2, y + hh / 2); c.rotate((r() - 0.5) * 0.15); c.fillStyle = cor; c.fillRect(-ww / 2, -hh / 2, ww, hh);
          c.fillStyle = i % 2 ? '#e2332b' : '#1d3b9a'; for (let l = 0; l < 4; l++) c.fillRect(-ww / 2 + 12, -hh / 2 + 18 + l * 20, ww - 24 - (l % 2) * 20, 6);
          c.fillStyle = '#e2332b'; c.beginPath(); c.arc(0, -hh / 2 + 6, 6, 0, 7); c.fill(); c.restore(); });
    });
    caixa(m, [1.3, 0.86, 0.05], 0x8a5a2a, [0, 0, 0]);
    caixa(m, [1.2, 0.76, 0.02], mat(0xffffff, { map: papeis }), [0, 0, 0.03], null, { sombra: false });
    return m;
  }
  function bebedouro(pai, pos) {
    const b = grupo(pai, pos);
    caixa(b, [0.42, 0.95, 0.42], 0xf4f4f2, [0, 0.475, 0]);
    cil(b, 0.17, 0.17, 0.42, mat(0x7cc4ff, { transparent: true, opacity: 0.75 }), [0, 1.17, 0]);
    caixa(b, [0.08, 0.06, 0.06], 0x2f6fd6, [-0.08, 0.72, 0.22]); caixa(b, [0.08, 0.06, 0.06], 0xe2332b, [0.08, 0.72, 0.22]);
    return b;
  }
  function planta(pai, pos, tam = 1) {
    const p = grupo(pai, pos);
    cil(p, 0.18 * tam, 0.14 * tam, 0.32 * tam, 0xe8643c, [0, 0.16 * tam, 0]);
    const r = K.rand(9);
    for (let k = 0; k < 7; k++) { const a = (k / 7) * PI * 2, f = K.malha(new THREE.SphereGeometry(0.13 * tam, 12, 8), mat(k % 2 ? 0x3f9a4a : 0x2f8a3d));
      f.scale.set(0.45, 1.6, 0.25); f.position.set(Math.sin(a) * 0.09 * tam, (0.48 + r() * 0.12) * tam, Math.cos(a) * 0.09 * tam); f.rotation.set(Math.cos(a) * 0.45, a, -Math.sin(a) * 0.45); p.add(f); }
    return p;
  }
  function relogio(pai, pos, giro, tam = 0.36) {
    const r = grupo(pai, pos, giro);
    const face = tex(256, 256, (c, w) => {
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w / 2, w / 2, w / 2, 0, 7); c.fill();
      c.fillStyle = '#1b1b22'; c.font = '700 26px Montserrat, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      for (let i = 1; i <= 12; i++) { const a = (i / 12) * PI * 2 - PI / 2; c.fillText(String(i), w / 2 + Math.cos(a) * 96, w / 2 + Math.sin(a) * 96); }
      for (let i = 0; i < 60; i++) { const a = (i / 60) * PI * 2; c.fillRect(w / 2 + Math.cos(a) * 118 - 1, w / 2 + Math.sin(a) * 118 - 1, i % 5 ? 2 : 4, i % 5 ? 2 : 4); }
    });
    cil(r, tam, tam, 0.06, 0xe2332b, [0, 0, 0], { rot: [PI / 2, 0, 0], lados: 40 });
    const f = K.malha(new THREE.CircleGeometry(tam * 0.86, 40), new THREE.MeshBasicMaterial({ map: face }), false); f.position.z = 0.032; r.add(f);
    const hora = caixa(r, [0.022, tam * 0.5, 0.01], 0x1b1b22, [0, 0, 0.04], null, { sombra: false });
    const min = caixa(r, [0.016, tam * 0.72, 0.01], 0x1b1b22, [0, 0, 0.045], null, { sombra: false });
    const seg = caixa(r, [0.008, tam * 0.75, 0.01], 0xe2332b, [0, 0, 0.05], null, { sombra: false });
    [hora, min, seg].forEach((p, i) => { p.geometry.translate(0, [tam * 0.22, tam * 0.33, tam * 0.3][i], 0); p.position.y = 0; });
    // os ponteiros andam com o tempo da cena (o segundo dá um tique por segundo)
    K.vivo((tc) => { seg.rotation.z = -Math.floor(tc) * (PI / 30); min.rotation.z = -(tc / 60) * PI * 2 - 1.2; hora.rotation.z = -2.6 - tc * 0.002; });
    return r;
  }
  function porta(pai, pos, giro, op = {}) {
    const p = grupo(pai, pos, giro);
    caixa(p, [1.08, 2.18, 0.08], op.batente || 0xe9ecf1, [0, 1.09, 0]);
    const folha = grupo(p, [-0.48, 0, 0.05]);
    caixa(folha, [0.96, 2.06, 0.05], op.cor || 0xa9c6ea, [0.48, 1.04, 0]);
    caixa(folha, [0.3, 0.42, 0.06], mat(0xd8ecff, { emissive: 0x8fb8e8, emissiveIntensity: 0.25 }), [0.48, 1.55, 0.005]);
    cil(folha, 0.03, 0.03, 0.16, 0xc9ccd2, [0.84, 1.0, 0.07], { rot: [0, 0, PI / 2] });
    p.folha = folha;
    if (op.placa) { const pl = placaPapel(folha, op.placa, { larg: 0.62, alt: 0.4 }); pl.position.set(0.48, 1.12, 0.035); pl.rotation.z = -0.03; }
    return p;
  }

  // ---------- Escritório azul ----------
  function escritorio_azul(C, g, op) {
    const fundo = -6, esq = -6.5, dir = 6.5, alt = 3.3;
    const carpete = tex(64, 64, (c, w, h) => { c.fillStyle = '#1652e0'; c.fillRect(0, 0, w, h); c.fillStyle = 'rgba(0,0,40,.08)'; c.fillRect(0, 0, w, 2); c.fillRect(0, 0, 2, h); }, 8, 10);
    const parede = tex(256, 512, (c, w, h) => {
      c.fillStyle = '#eef0f3'; c.fillRect(0, 0, w, h);
      const y = h * (1 - 1.0 / alt); c.fillStyle = '#35b3a2'; c.fillRect(0, y - 9, w, 18); c.fillStyle = '#1f7d73'; c.fillRect(0, y + 9, w, 3);
      c.fillStyle = '#d9dde4'; c.fillRect(0, h - 22, w, 22);
    }, 4, 1);
    const teto = tex(256, 256, (c, w, h) => {
      c.fillStyle = '#f6f7f9'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c8ced8'; c.lineWidth = 4; for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(i * w / 4, 0); c.lineTo(i * w / 4, h); c.moveTo(0, i * h / 4); c.lineTo(w, i * h / 4); c.stroke(); }
    }, 6, 7);
    sala(C, g, { fundo, esq, dir, alt, frente: 10, piso: mat(0xffffff, { map: carpete }), parede: mat(0xffffff, { map: parede, side: THREE.DoubleSide }), teto: mat(0xffffff, { map: teto, side: THREE.DoubleSide }) });
    // luminárias do teto
    for (let x = -4; x <= 4; x += 2.7) for (let z = -4.5; z <= 6; z += 3.2) caixa(g, [1.1, 0.04, 0.55], mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.9 }), [x, alt - 0.03, z], null, { sombra: false });
    // janelão com a cidade (fundo)
    const cidade = tex(1024, 400, (c, w, h) => {
      const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#3f8ff0'); gr.addColorStop(1, '#a9d6ff'); c.fillStyle = gr; c.fillRect(0, 0, w, h);
      const r = K.rand(17);
      for (let i = 0; i < 26; i++) { const x = i * 42 - 12, l = 36 + r() * 22, a = 120 + r() * 230; c.fillStyle = ['#2e6fd6', '#4a86e6', '#2a5fc0', '#5b95ec'][i % 4]; c.fillRect(x, h - a, l, a);
        c.fillStyle = 'rgba(220,240,255,.7)'; for (let y = h - a + 10; y < h - 8; y += 16) for (let xx = x + 5; xx < x + l - 5; xx += 9) c.fillRect(xx, y, 5, 8); }
    });
    caixa(g, [9, 1.9, 0.05], mat(0xffffff, { map: cidade, emissive: 0xffffff, emissiveMap: cidade, emissiveIntensity: 0.55 }), [0, 1.95, fundo + 0.03], null, { sombra: false });
    for (let x = -4.5; x <= 4.5; x += 1.5) caixa(g, [0.07, 1.95, 0.1], 0x2a2d35, [x, 1.95, fundo + 0.06]);
    [1.0, 2.9].forEach((y) => caixa(g, [9.1, 0.07, 0.1], 0x2a2d35, [0, y, fundo + 0.06]));
    // baias: duas fileiras de mesas viradas uma pra outra
    const mesas = [];
    [[-2.6, -3.2], [0, -3.2], [2.6, -3.2], [-2.6, -0.4], [0, -0.4], [2.6, -0.4]].forEach(([x, z], i) => {
      const m = mesa(g, [x, 0, z], i < 3 ? 0 : 0, { divisoria: i % 3 === 1 ? 0xe8643c : 0xd6dbe3, tela: [0x9fd1ff, 0xbde3ff, 0x8fc6ff][i % 3] }); solido(m, 0.05); mesas.push(m);
    });
    // a mesa do personagem, na frente (C.lugares.mesa)
    const minha = mesa(g, [4.3, 0, 3.6], -PI / 2, { divisoria: false, tela: 0xbde3ff }); mesas.push(minha);
    const caneca = cil(minha, 0.055, 0.05, 0.13, 0xffffff, [0.5, 0.835, 0.12]);
    const etq = placaPapel(minha, 'KEN', { larg: 0.28, alt: 0.1, fita: false }); etq.position.set(-0.4, 0.8, 0.28); etq.rotation.x = -1.1;
    C.objetos.caneca = caneca; C.objetos.mesa = minha;
    // estantes, mural, bebedouro, plantas, porta
    C.objetos.estante = [estante(g, [-6.2, 0, -2.5], PI / 2, 4), estante(g, [-6.2, 0, -0.9], PI / 2, 8)];
    C.objetos.estante.forEach((e) => solido(e, 0.05));
    C.objetos.mural = mural(g, [-6.45, 1.75, 1.5], PI / 2);
    C.objetos.bebedouro = bebedouro(g, [-5.9, 0, 3.6]); solido(C.objetos.bebedouro, 0.05);
    planta(g, [5.9, 0, -5.4]); planta(g, [-5.9, 0, -5.4], 1.2); planta(g, [5.9, 0, 4.5], 0.9);
    C.objetos.porta = porta(g, [6.45, 0, 1.2], -PI / 2, { placa: op.placa || ['SALA DE', 'ESPERA'] });
    Object.assign(C.lugares, { mesa: [4.3, 0.8, 3.6], monitor: [4.1, 1.1, 3.75], cadeira: [3.7, 0, 3.7], porta: [6.3, 1.1, 1.2], janela: [0, 1.95, fundo], estante: [-6.1, 1.0, -1.7], mural: [-6.4, 1.75, 1.5], corredor: [-1.3, 0, 1.4], bebedouro: [-5.9, 1, 3.6] });
    C.ceu = 'interior'; C.neblina = [60, 200, 400]; C.fundo = [0, 1.9, fundo];
    C.entrada = [5.5, 0, 1.2]; C.personagem = [0.3, 0, 1.6]; C.centro = [0, 0, 0.6];
    C.vista = { pos: [3.2, 2.0, 7.5], alvo: [-0.5, 1.1, -1.5] };
    C.caixaSombra = 12;
  }

  // ---------- Sala verde ----------
  function sala_verde(C, g, op) {
    const fundo = -3, esq = -3.2, dir = 3.2, alt = 3.0;
    const tijolo = tex(512, 512, (c, w, h) => {
      c.fillStyle = '#5f9c6b'; c.fillRect(0, 0, w, h);
      const r = K.rand(21), bw = 128, bh = 48;
      for (let y = 0, l = 0; y < h; y += bh, l++) for (let x = (l % 2) * -bw / 2; x < w; x += bw) {
        const v = 0.94 + r() * 0.1; c.fillStyle = `rgb(${Math.round(124 * v)},${Math.round(184 * v)},${Math.round(136 * v)})`; c.fillRect(x + 4, y + 4, bw - 8, bh - 8);
        c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(x + 4, y + 4, bw - 8, 6);
      }
    }, 3, 1.4);
    const ladrilho = tex(256, 256, (c, w, h) => {
      c.fillStyle = '#6f88bd'; c.fillRect(0, 0, w, h);
      [[0, 0, '#8aa2d2'], [1, 1, '#8aa2d2'], [1, 0, '#7f98ca'], [0, 1, '#7f98ca']].forEach(([i, j, cor]) => { c.fillStyle = cor; c.fillRect(i * w / 2 + 3, j * h / 2 + 3, w / 2 - 6, h / 2 - 6); });
    }, 5, 7);
    sala(C, g, { fundo, esq, dir, alt, frente: 7, piso: mat(0xffffff, { map: ladrilho }), parede: mat(0xffffff, { map: tijolo, side: THREE.DoubleSide }), teto: mat(0xf4f5f7, { side: THREE.DoubleSide }) });
    caixa(g, [6.4, 0.12, 0.04], 0x4f8a5c, [0, 0.06, fundo + 0.02]);
    // a faixa de sol amarela que entra pela janela (do lado de fora, à direita), em diagonal na parede do fundo e no chão
    const sol = new THREE.MeshBasicMaterial({ color: 0xf6d65a, transparent: true, opacity: 0.78, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
    const faixaParede = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 5.2), sol); faixaParede.position.set(-0.6, 1.7, fundo + 0.012); faixaParede.rotation.z = -1.0; g.add(faixaParede);
    const faixaChao = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 2.6), sol); faixaChao.rotation.set(-PI / 2, 0, -0.6); faixaChao.position.set(1.7, 0.012, 0.2); g.add(faixaChao);
    const cortaParede = (m) => { m.onBeforeRender = () => {}; };
    cortaParede(faixaParede);
    C.objetos.sol = [faixaParede, faixaChao];
    // a mesa de metal sozinha, a cadeira, a bandeja vazia e o relógio
    const m = mesa(g, [0, 0, -1.6], 0, { tampo: 0xd5dbe3, lado: 0xaeb7c5, gaveteiro: 0xbfc7d3, monitor: false, divisoria: false });
    solido(m, 0.05);
    const bandeja = grupo(m, [-0.35, 0.765, 0.05]);
    caixa(bandeja, [0.48, 0.02, 0.34], 0x2f6fd6, [0, 0, 0]);
    [[0, 0.17], [0, -0.17]].forEach(([x, z]) => caixa(bandeja, [0.48, 0.07, 0.02], 0x2f6fd6, [x, 0.035, z]));
    [[0.24, 0], [-0.24, 0]].forEach(([x, z]) => caixa(bandeja, [0.02, 0.07, 0.34], 0x2f6fd6, [x, 0.035, z]));
    const etq = placaPapel(bandeja, 'A FAZER', { larg: 0.3, alt: 0.07, fita: false, cores: ['#1d3b9a'] }); etq.position.set(0, 0.035, 0.18);
    C.objetos.bandeja = bandeja; C.objetos.mesa = m;
    C.objetos.relogio = relogio(g, [1.3, 2.3, fundo + 0.06], 0);
    C.objetos.porta = porta(g, [-3.15, 0, 1.6], PI / 2, { cor: 0xa9c6ea, placa: op.placa || null });
    const est = estante(g, [3.0, 0, -0.6], -PI / 2, 12); solido(est, 0.05); est.scale.set(0.8, 0.85, 0.8);
    caixa(g, [0.5, 0.35, 0.4], 0xe8643c, [2.6, 0.175, 2.4], [0, 0.4, 0]);
    Object.assign(C.lugares, { mesa: [0, 0.8, -1.6], cadeira: [-0.1, 0, -0.98], relogio: [1.3, 2.3, fundo], porta: [-3.0, 1.1, 1.6], sol: [-0.4, 1.6, fundo], bandeja: [-0.35, 0.8, -1.55] });
    C.ceu = 'interior'; C.neblina = [60, 200, 400]; C.fundo = [0, 1.5, fundo];
    C.entrada = [-2.6, 0, 1.6]; C.personagem = [0.6, 0, -0.4]; C.centro = [0, 0, 0];
    C.vista = { pos: [1.8, 1.7, 4.6], alvo: [-0.2, 1.0, -1.6] };
    C.caixaSombra = 8;
  }

  // ---------- Prédio à noite ----------
  // Janela pintada: o interior visto de fora (gradiente, mesa, cadeira, monitor), apagada, acesa fria ou acesa quente
  function texJanela(tipo, seed) {
    return tex(256, 192, (c, w, h) => {
      const r = K.rand(seed);
      const [a, b] = { apagada: ['#122c9a', '#2350c8'], fria: ['#6fb2ff', '#c4e6ff'], quente: ['#ffd36e', '#fff1c4'] }[tipo];
      const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); c.fillStyle = gr; c.fillRect(0, 0, w, h);
      const sil = tipo === 'apagada' ? 'rgba(8,20,90,.55)' : tipo === 'fria' ? 'rgba(30,70,170,.5)' : 'rgba(150,90,30,.45)';
      c.fillStyle = sil;
      if (tipo === 'quente') { // estante com livros
        for (let x = 14; x < 90; x += 9) c.fillRect(x, 40 + r() * 10, 7, 50);
        c.fillRect(10, 92, 84, 6); c.fillRect(150, 110, 70, 10); c.fillRect(160, 120, 8, 50); c.fillRect(205, 120, 8, 50);
      } else {
        const n = 1 + Math.floor(r() * 2);
        for (let k = 0; k < n; k++) { const x = 20 + r() * 150; c.fillRect(x, 120, 80, 9); c.fillRect(x + 8, 129, 7, 45); c.fillRect(x + 64, 129, 7, 45); c.fillRect(x + 20, 86, 36, 30); }
      }
      c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.moveTo(w * 0.55, 0); c.lineTo(w * 0.75, 0); c.lineTo(w * 0.35, h); c.lineTo(w * 0.15, h); c.fill();
    });
  }
  function predio_noite(C, g, op) {
    const andares = 10, colunas = 5, la = 1.7, aa = 1.3, x0 = -((colunas - 1) * la) / 2;
    const [aAndar, aCol] = op.janela || [3, 2];
    const fachada = grupo(g, [0, 0, -2]);
    const larg = colunas * la + 0.5, alto = andares * aa + 0.8;
    caixa(fachada, [larg, alto, 1.4], 0x0f1f6e, [0, alto / 2, -0.7]);
    const r = K.rand(31), mats = {};
    const matJ = (tipo, k) => { const key = tipo + k; if (!mats[key]) { const t = texJanela(tipo, 40 + k); mats[key] = new THREE.MeshBasicMaterial({ map: t }); } return mats[key]; };
    for (let a = 0; a < andares; a++) for (let c = 0; c < colunas; c++) {
      const principal = a === aAndar && c === aCol, tipo = principal ? 'quente' : r() < 0.3 ? 'fria' : 'apagada';
      const j = plano(fachada, la * 0.84, aa * 0.74, matJ(tipo, Math.floor(r() * 4)), [x0 + c * la, 0.5 + a * aa + aa * 0.42, 0.012]);
      if (principal) { C.objetos.janela = j; caixa(fachada, [la * 0.95, 0.07, 0.28], 0xcfd5e0, [x0 + c * la, 0.5 + a * aa + 0.02, 0.14]); }
    }
    // caixilhos: pilares e lajes
    for (let c = 0; c <= colunas; c++) caixa(fachada, [0.12, alto, 0.12], 0x0a165a, [x0 - la / 2 + c * la, alto / 2, 0.05], null, { sombra: false });
    for (let a = 0; a <= andares; a++) caixa(fachada, [larg, 0.12, 0.16], 0x2541b8, [0, 0.5 + a * aa - 0.04, 0.06], null, { sombra: false });
    // a cidade: prédios com janelinhas acesas
    const PREDIOS = [[-9, 18, -10], [8.5, 14, -9], [-15, 10, -16], [15, 12, -15], [3, 8, -22], [-4, 20, -26], [11, 22, -30]];
    PREDIOS.forEach(([x, h, z], i) => {
      const cor = [0x1a2f8f, 0x172a86, 0x24389c, 0x203596, 0x2a44a6, 0x1d3392, 0x2a48b0][i];
      caixa(g, [5, h, 4], cor, [x, h / 2, z], null, { sombra: false });
      const jan = tex(128, 256, (c2, w, hh) => { c2.fillStyle = 'rgba(0,0,0,0)'; c2.clearRect(0, 0, w, hh); for (let y = 8; y < hh - 8; y += 16) for (let xx = 8; xx < w - 8; xx += 14) if (r() < 0.32) { c2.fillStyle = r() < 0.25 ? '#ffd98a' : '#8cc4ff'; c2.fillRect(xx, y, 7, 9); } });
      const pj = plano(g, 4.6, h - 1, new THREE.MeshBasicMaterial({ map: jan, transparent: true }), [x, h / 2, z + 2.02]);
      pj.renderOrder = 1;
    });
    caixa(g, [80, 0.1, 60], 0x0b1450, [0, -0.05, 0], null, { sombra: false });
    Object.assign(C.lugares, { janela: [x0 + aCol * la, 0.5 + aAndar * aa + aa * 0.42, -1.95], predio: [0, alto / 2, -2], topo: [0, alto, -2] });
    C.ceu = ['noite', 'tarde', 0.3]; C.neblina = [45, 160, 400];
    C.fundo = [0, 6, -10]; C.centro = [0, 5, -2]; C.personagem = [0, 0, 2];
    C.vista = { pos: [-7.5, 1.6, 12], alvo: [-0.5, 7.5, -2] };
    C.caixaSombra = 16;
  }

  const NOVOS = { escritorio_azul, sala_verde, predio_noite };
  const original = K.cenario;
  K.cenario = function (nome, op = {}) {
    const chave = String(nome).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]+/g, '_');
    const fazer = NOVOS[chave];
    if (!fazer) return original(nome, op);
    const g = new THREE.Group(); g.name = 'cenario-' + chave; K.scene.add(g);
    const C = { nome: chave, grupo: g, noite: op.hora === 'noite', hora: op.hora || 'dia', centro: [0, 0, 0], personagem: [1.6, 0, 0.9], entrada: [-3, 0, 4.5], esquerda: [-2.6, 0, 0.4], direita: [2.9, 0, 0.3], fundo: [0, 3, -12], lugares: {}, objetos: {}, ceu: 'interior', neblina: [60, 220, 600], caixaSombra: 16, vista: { pos: [2.5, 2.2, 11], alvo: [0, 1.8, -8] } };
    fazer(C, g, op);
    Object.entries(C.objetos).forEach(([n, o]) => (Array.isArray(o) ? o : [o]).forEach((x) => { if (x && (x.isObject3D || (x.g && x.g.isObject3D))) K.nomear(n, x); }));
    K.vivo(() => { if (Array.isArray(C.ceu)) K.ceu(...C.ceu); else K.ceu(C.ceu); K.neblina(...C.neblina); K.caixaSombra(C.caixaSombra); });
    C.lugares = Object.assign({ centro: C.centro, personagem: C.personagem, entrada: C.entrada, esquerda: C.esquerda, direita: C.direita, fundo: C.fundo }, C.lugares);
    K.cenarioAtual = C;
    return C;
  };
  K.CENARIOS_MOTION = Object.keys(NOVOS);
  K.cenariosMotion = true;
})();
