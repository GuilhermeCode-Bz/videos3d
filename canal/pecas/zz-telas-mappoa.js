// Telas reais do Mappoa (as gravações do produto, em canal/telas-mappoa/, carregadas por zy-telas-mappoa-dados.js) dentro
// de aparelhos: celular, monitor e notebook. A conta é a de exemplo, com empresas fictícias.
//   const cel = K.celularMappoa('lista', { tam: 1 })     celular em pé (0,17 x 0,33 m com tam 1), tela vertical: o topo
//                                                         do app e um pedaço da tela real (rolável)
//   const mon = K.monitorMappoa('busca', { tam: 1 })     monitor na mesa (tela de 0,9 m), a tela inteira com a barra do
//                                                         navegador "mappoa.com"
//   const nb = K.notebookMappoa('campanha', { tam: 1 })  notebook aberto, idem
//   aparelho.mostrar('analise', { rolar: 0.5, toque: [x, y] })   troca a tela (rolar de 0 a 1 desce a tela do celular;
//                                                         toque: um dedo/clique em [x, y] de 0 a 1 na tela)
//   aparelho.g é o grupo (posição, giro, K.nomear); aparelho.tela é a malha da tela (o "mostra" e o mergulho da câmera)
// Telas: perfil publico demo busca pesquisa lista canais analise enriquecimento campanha funil mensagem editor
// (K.TELAS_MAPPOA lista as que estão carregadas). Pra acrescentar uma tela: pôr o .jpg em canal/telas-mappoa/ e rodar
// node canal/ferramentas/telas-mappoa.js
(function () {
  const K = window.K, D = window.TELAS_MAPPOA || {};
  if (!K || K.celularMappoa) return;
  const IMG = {};
  window.ESPERAR = window.ESPERAR || [];
  Object.entries(D).forEach(([n, src]) => {
    const im = new Image(); im.src = src; IMG[n] = im;
    window.ESPERAR.push(im.decode().catch(() => {}));
  });
  K.TELAS_MAPPOA = Object.keys(D);

  // O pedaço de cada tela que vai no celular (x, y, largura, altura no 1280 x 720)
  const RECORTE = {
    perfil: [690, 200, 500, 360], publico: [700, 150, 480, 450], demo: [480, 140, 320, 420],
    busca: [303, 160, 455, 425], pesquisa: [760, 255, 392, 430],
    // a lista vira uma coluna comprida: a coluna da esquerda e, embaixo, a da direita (da tela sem o balão do tour)
    lista: [['lista', 258, 100, 470, 620], ['canais', 730, 170, 470, 550]], canais: [['canais', 258, 100, 470, 620], ['canais', 730, 170, 470, 550]],
    analise: [795, 50, 455, 670], enriquecimento: [320, 140, 830, 570], campanha: [210, 212, 450, 480], funil: [200, 190, 420, 330],
    mensagem: [980, 250, 290, 450], editor: [389, 108, 503, 505]
  };
  const FUNDO = '#0b1220';

  // Barra do navegador com o endereço (monitor e notebook)
  function barraNavegador(c, w, hb) {
    c.fillStyle = '#e9edf3'; c.fillRect(0, 0, w, hb);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((cor, i) => { c.fillStyle = cor; c.beginPath(); c.arc(24 + i * 26, hb / 2, 8, 0, 7); c.fill(); });
    c.fillStyle = '#ffffff'; c.beginPath(); c.roundRect(120, 9, w - 240, hb - 18, (hb - 18) / 2); c.fill();
    c.fillStyle = '#1b1b22'; c.font = `600 ${Math.round(hb * 0.42)}px Montserrat, sans-serif`; c.textAlign = 'left'; c.textBaseline = 'middle';
    c.fillText('🔒 mappoa.com', 140, hb / 2 + 1);
  }
  function dedo(c, x, y, r) {
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.arc(x, y, r * 1.8, 0, 7); c.fill();
    c.fillStyle = 'rgba(16,103,248,.85)'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
  }

  // Desenha a tela no canvas do aparelho
  function desenharCelular(c, w, h, nome, op) {
    c.fillStyle = FUNDO; c.fillRect(0, 0, w, h);
    const im = IMG[nome];
    // barra de status e o topo do app (o logo da própria tela real)
    c.fillStyle = '#ffffff'; c.font = '700 26px Montserrat, sans-serif'; c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillText('9:41', 34, 34);
    c.textAlign = 'right'; c.fillText('▮▮▮ ◉', w - 30, 34);
    const topo = 66, hTopo = 74;
    if (im && im.complete && IMG.lista) { c.drawImage(IMG.lista, 8, 6, 80, 28, 24, topo + 10, 80 * 2.0, 28 * 2.0); }
    c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(0, topo + hTopo, w, 2);
    if (!im || !im.complete) return;
    // um ou mais pedaços empilhados: [x, y, l, a] ou [[nome, x, y, l, a], ...]
    let partes = op.recorte || RECORTE[nome] || [0, 0, 1280, 720];
    if (!Array.isArray(partes[0])) partes = [[nome, ...partes]];
    const y0 = topo + hTopo + 14, livre = h - y0 - 20, esc = (w - 24) / partes[0][3];
    const alt = partes.reduce((t, p) => t + p[4] * esc, 0);
    const desce = alt > livre ? (alt - livre) * K.clamp(op.rolar || 0) : 0;
    c.save(); c.beginPath(); c.rect(0, y0, w, livre + 20); c.clip();
    c.filter = 'brightness(1.18) contrast(1.08) saturate(1.12)';
    let y = y0 - desce;
    partes.forEach(([n, sx, sy, sw, sh]) => { const fonte = IMG[n] || im; if (fonte.complete) c.drawImage(fonte, sx, sy, sw, sh, 12, y, w - 24, sh * esc); y += sh * esc; });
    c.filter = 'none';
    c.restore();
    if (op.toque) dedo(c, op.toque[0] * w, op.toque[1] * h, 22);
  }
  function desenharTelaCheia(c, w, h, nome, op) {
    c.fillStyle = FUNDO; c.fillRect(0, 0, w, h);
    const hb = Math.round(h * 0.075);
    barraNavegador(c, w, hb);
    const im = IMG[nome];
    if (!im || !im.complete) return;
    const [sx, sy, sw, sh] = op.recorte || [0, 0, 1280, 720];
    c.filter = 'brightness(1.12) contrast(1.06)';
    c.drawImage(im, sx, sy, sw, sh, 0, hb, w, h - hb);
    c.filter = 'none';
    if (op.toque) dedo(c, op.toque[0] * w, hb + op.toque[1] * (h - hb), 14);
  }

  function telaDe(larg, alt, px, desenho) {
    const cv = document.createElement('canvas');
    cv.width = px; cv.height = Math.round((px * alt) / larg);
    const c = cv.getContext('2d');
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(larg, alt), new THREE.MeshBasicMaterial({ map: tex }));
    let chave = '';
    const mostrar = (nome, op = {}) => {
      const k = nome + JSON.stringify(op);
      if (k === chave) return;
      const im = IMG[nome], pronta = !!(im && im.complete && im.naturalWidth);
      chave = pronta ? k : ''; desenho(c, cv.width, cv.height, nome, op); tex.needsUpdate = true;
    };
    return { mesh, mostrar };
  }
  // Caixa de quina arredondada em 2D, extrudada (corpo de celular e de tela)
  function laje(w, h, d, r, mat) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const geo = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false, curveSegments: 8 }).translate(0, 0, -d / 2);
    return K.malha(geo, mat);
  }

  K.celularMappoa = function (nome = 'lista', op = {}) {
    const k = op.tam || 1, g = new THREE.Group();
    const w = 0.17 * k, h = 0.33 * k;
    g.add(laje(w, h, 0.018 * k, 0.025 * k, K.mat(op.cor || 0x1b1d24, { roughness: 0.4 })));
    const t = telaDe(w * 0.9, h * 0.93, 600, desenharCelular);
    t.mesh.position.z = 0.0095 * k; g.add(t.mesh);
    const ilha = K.malha(new THREE.CapsuleGeometry(0.006 * k, 0.03 * k, 4, 8).rotateZ(Math.PI / 2), K.mat(0x050608), false);
    ilha.position.set(0, h * 0.44, 0.0105 * k); g.add(ilha);
    K.scene.add(g);
    t.mostrar(nome, op);
    return { g, tela: t.mesh, mostrar: t.mostrar, larg: w, alt: h };
  };

  K.monitorMappoa = function (nome = 'busca', op = {}) {
    const k = op.tam || 1, g = new THREE.Group();
    const w = 0.9 * k, h = 0.54 * k;
    const corpo = laje(w + 0.03 * k, h + 0.03 * k, 0.035 * k, 0.02 * k, K.mat(0x1b1d24, { roughness: 0.5 }));
    corpo.position.y = 0.2 * k + h / 2; g.add(corpo);
    const t = telaDe(w, h, 1280, desenharTelaCheia);
    t.mesh.position.set(0, 0.2 * k + h / 2, 0.0185 * k); g.add(t.mesh);
    const haste = K.malha(new THREE.BoxGeometry(0.06 * k, 0.24 * k, 0.04 * k), K.mat(0x2a2d35)); haste.position.set(0, 0.12 * k, -0.03 * k); g.add(haste);
    const pe = K.malha(new THREE.BoxGeometry(0.3 * k, 0.02 * k, 0.2 * k), K.mat(0x2a2d35)); pe.position.set(0, 0.01 * k, -0.02 * k); g.add(pe);
    K.scene.add(g);
    t.mostrar(nome, op);
    return { g, tela: t.mesh, mostrar: t.mostrar, larg: w, alt: h };
  };

  K.notebookMappoa = function (nome = 'campanha', op = {}) {
    const k = op.tam || 1, g = new THREE.Group();
    const w = 0.6 * k, h = 0.38 * k;
    const base = K.malha(new THREE.BoxGeometry(w + 0.04 * k, 0.022 * k, 0.42 * k), K.mat(0xc9ced6, { roughness: 0.45 })); base.position.y = 0.011 * k; g.add(base);
    const teclado = K.malha(new THREE.BoxGeometry(w * 0.85, 0.004 * k, 0.2 * k), K.mat(0x2a2d35)); teclado.position.set(0, 0.023 * k, -0.04 * k); g.add(teclado);
    const tampa = new THREE.Group(); tampa.position.set(0, 0.022 * k, -0.21 * k); tampa.rotation.x = -0.28; g.add(tampa);
    const costas = laje(w + 0.04 * k, h + 0.04 * k, 0.014 * k, 0.015 * k, K.mat(0xc9ced6, { roughness: 0.45 })); costas.position.y = (h + 0.04 * k) / 2; tampa.add(costas);
    const t = telaDe(w, h, 1100, desenharTelaCheia);
    t.mesh.position.set(0, (h + 0.04 * k) / 2, 0.0075 * k); tampa.add(t.mesh);
    K.scene.add(g);
    t.mostrar(nome, op);
    return { g, tela: t.mesh, mostrar: t.mostrar, tampa, larg: w, alt: h };
  };
})();
