// Boneco 2D do visual motion (o estilo da referência 3D motion: boneco de desenho chapado dentro do mundo 3D).
// No modo "visual": "motion", todo K.boneco vira um cartão virado pra câmera com o boneco desenhado em 2D (cabeça de
// feijão, corpo em gota, braço e perna de traço, contorno de tinta; desenho de zy-toon.js). O esqueleto 3D da Máquina
// continua por baixo, invisível: anda, aponta, reage, fala e pisca como sempre, e o cartão copia a pose dele a cada
// quadro (braço, perna, pulo, inclinação, boca, olho, humor e para onde ele olha). A revisão (--revisar) continua igual.
//
// Roupa e cores: as mesmas do K.boneco (op.cores) e, se quiser, op.desenho = { roupa, calca, sapato, cabelo, pele,
// gravata, cracha, oculos, vestido, cabeca: 'cabelo' | 'bone' | 'careca' }. Ex.: o chefe de terno:
//   K.boneco({ tipo: 'doutor', desenho: { roupa: '#1c2a52', gravata: '#e2332b', cabelo: '#c9ccd2', oculos: false } })
// op.desenho3d: true mantém o boneco 3D (sem cartão).
(function () {
  const K = window.K, T = window.Toon;
  if (!K || !T || K.boneco2d) return;
  const INK = T.INK, rad = (d) => (d * Math.PI) / 180;
  const ESCALA_PX = 1.7;               // pixels de textura por unidade de desenho (600 x 1000 → 1020 x 1700)
  const SU = 1.5 / 777;                // metros por unidade de desenho (adulto: 3,5 cabeças ≈ 777 unidades = 1,5 m)
  const CAMADA_ESQ = 7;                // camada do esqueleto (a câmera não desenha)
  const cartoes = [];

  const hexCss = (c, padrao) => {
    if (c == null) return padrao;
    if (typeof c === 'string') return c;
    return '#' + new THREE.Color(c).getHexString();
  };

  // Roupa do desenho a partir das cores do boneco
  function roupaDe(op, b) {
    const c = Object.assign({}, K.cores, op.cores || {}), d = op.desenho || {};
    const doutor = op.tipo === 'doutor', operario = op.tipo === 'operario', menina = op.tipo === 'menina';
    const moletom = op.roupa === 'moletom';
    const o = {
      jacket: hexCss(d.roupa, hexCss(menina ? c.vestido : moletom ? c.moletom : doutor ? (op.cores && op.cores.camisa) || '#1c2a52' : operario ? c.camiseta || '#f27c22' : c.camiseta, '#5aa7e8')),
      pants: hexCss(d.calca, hexCss(moletom || doutor || operario ? c.calca || '#2b3350' : c.bermuda, '#2b3350')),
      boots: hexCss(d.sapato, hexCss(doutor ? '#3a2a20' : operario ? '#2a221c' : null, INK)),
      skin: hexCss(d.pele, hexCss(c.pele, '#fbf3ea')),
      hat: d.cabeca === 'careca' ? null : d.cabeca === 'bone' || operario ? 'cap' : 'hair',
      hair: hexCss(d.cabelo, hexCss(doutor ? '#c9ccd2' : menina ? c.cabeloMenina : c.cabelo, '#1d1b22')),
      cap: hexCss(d.bone, hexCss(operario ? c.capacete || '#f5c518' : null, '#e2453c')),
      build: d.corpo || (op.crianca ? 'kid' : doutor ? 'stout' : 'adult'),
      dress: menina ? hexCss(d.vestido, hexCss(c.vestido, '#d8343a')) : null
    };
    o.gravata = d.gravata === undefined ? (doutor ? '#e2332b' : null) : d.gravata;
    o.cracha = !!d.cracha;
    o.oculos = d.oculos === undefined ? false : d.oculos;
    o.moustache = d.bigode || null;
    return o;
  }

  // Humor da Máquina → rosto do desenho
  Object.assign(T.FACE, {
    base: { eye: ['dot', 'dot'], brow: [0, -1], mouth: 'smirk' },
    fala: { eye: ['dot', 'dot'], brow: [-1, -2], mouth: 'grin' },
    triste: { eye: ['small', 'small'], brow: [-4, 3], mouth: 'frown' },
    bravo: { eye: ['dot', 'dot'], brow: [5, -3], mouth: 'teeth' },
    nojo: { eye: ['lid', 'lid'], brow: [3, -2], mouth: 'wave' },
    surpreso: { eye: ['dot', 'dot'], brow: [-6, -6], mouth: 'O' },
    feliz: { eye: ['happy', 'happy'], brow: [-3, -3], mouth: 'smileWide' },
    sorrisoFalso: { eye: ['happy', 'happy'], brow: [-2, -2], mouth: 'teeth' }
  });
  function rostoDe(b) {
    const h = b.humorAtual, aberta = b.bocaAberta && b.bocaAberta.visible;
    if (h === 'assustado') return 'shock';
    if (h === 'surpreso') return 'surpreso';
    if (h === 'feliz') return aberta ? 'relief_open' : 'feliz';
    if (h === 'triste') return 'triste';
    if (h === 'bravo') return 'bravo';
    if (h === 'nojo') return 'nojo';
    if (b.suando) return 'nervous';
    if (b.rosto2d) return b.rosto2d;     // o cena.js pode forçar: menino.rosto2d = 'sorrisoFalso' | 'laugh' | 'dazed' ...
    return aberta ? 'fala' : 'base';
  }

  // ---------- Desenho de um quadro ----------

  const vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3(), vO = new THREE.Vector3();
  function desenharQuadro(ct, cam) {
    const { b, o, pen, g2, cv } = ct;
    const card = ct.mesh, R = ct.R, U = ct.U, N = ct.N, s = ct.s;
    const proj = (v) => { vC.copy(v).sub(vO); return [vC.dot(R) / (SU * s), -vC.dot(U) / (SU * s), vC.dot(N) / (SU * s)]; };
    const mundo = (obj) => obj.getWorldPosition(new THREE.Vector3());

    g2.setTransform(1, 0, 0, 1, 0, 0);
    g2.clearRect(0, 0, cv.width, cv.height);
    g2.setTransform(ESCALA_PX, 0, 0, ESCALA_PX, 0, 0);

    const Bd = { adult: { a: 118, torso: 1.1, legs: 1.4, tw: 0.8 }, stout: { a: 118, torso: 1.15, legs: 1.32, tw: 0.95 }, kid: { a: 112, torso: 0.85, legs: 1.0, tw: 0.72 } }[o.build] || { a: 118, torso: 1.1, legs: 1.4, tw: 0.8 };
    // Para onde ele olha: frente, 3/4 ou de costas (pela direção do esqueleto em relação à câmera)
    const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(b.g.getWorldQuaternion(new THREE.Quaternion()));
    fwd.y = 0; fwd.normalize();
    const fx = fwd.dot(R), fz = fwd.dot(N);
    const costas = fz < -0.3, facing = fx > 0.42 ? 1 : fx < -0.42 ? -1 : 0;
    const H = T.headBlob(ct.seed, Bd.a, facing), W = 2 * H.a, HH = 2 * H.b, u = W / 100, sole = 975;
    const torsoBot = sole - Bd.legs * HH, chin = torsoBot - Bd.torso * HH, hc = chin - H.b, hipY = torsoBot - 0.12 * HH;
    const light = T.DEF_LIGHT, thick = T.thickAngle(light), ow = 5.6 * u;
    const legCol = INK, armCol = INK;

    // Inclinação do corpo e da cabeça (do esqueleto)
    const A = -(b.corpo.rotation.z * 180) / Math.PI * (costas ? -1 : 1);
    const Ah = A - (b.cabeca.rotation.z * 180) / Math.PI * (costas ? -1 : 1) * 1.2;
    const nod = b.cabeca.rotation.x * 30;

    // ---- pernas: do quadril ao pé do esqueleto, em traço preto ----
    pen.rot = null;
    const pernas = b.pernas.map((pe) => {
      const q = pe.quadril, pe3 = q.children.find((m) => m.isMesh && m.position.y < -0.5) || q.children[1] || q;
      const h3 = proj(mundo(q)), f3 = proj(mundo(pe3));
      return { dx: f3[0] - h3[0], dy: f3[1] - h3[1], lado: h3[0] < 0 ? -1 : 1, z: h3[2] };
    });
    pernas.sort((a, c) => a.z - c.z).forEach((pe) => {
      if (o.dress && Math.abs(pe.dx) < 40) {
        const fxp = 300 + pe.lado * 12 * u;
        pen.stroke([[fxp, sole - 0.4 * HH], [fxp + pe.lado * u, sole - 4 * u]], 5.8 * u, legCol);
        T.taper(pen, [fxp - pe.lado * 3 * u, sole - 4 * u], [fxp + pe.lado * 12 * u, sole - 3 * u], 8 * u, 7 * u, o.boots);
        return;
      }
      const hx = 300 + pe.lado * 15 * u;
      const k = Math.min(1.15, (Bd.legs * HH * 0.98) / Math.max(1, Math.hypot(pe.dx, pe.dy)));
      const fxp = hx + pe.dx * k * 0.95, fyp = Math.min(sole - 4 * u, hipY + pe.dy * k);
      const joelho = [(hx + fxp) / 2 + pe.lado * 2 * u, (hipY + fyp) / 2];
      pen.stroke(T.curve([hx, hipY], joelho, [fxp, fyp]), 5.8 * u, legCol);
      const dir = facing || pe.lado;
      pen.stroke([[fxp - dir * 3 * u, fyp], [fxp + dir * 13 * u, fyp + 0.5 * u]], 11 * u, INK);
      if (o.boots !== INK) pen.stroke([[fxp - dir * 3 * u, fyp], [fxp + dir * 13 * u, fyp + 0.5 * u]], 7.5 * u, o.boots);
    });

    // ---- tronco e braços: giram em volta do quadril ----
    pen.rot = A ? [rad(A), 300, hipY] : null;
    const TB = { a: ((Bd.tw / 2) * W) / 1.06, b: 0.5 * (torsoBot - (chin - 0.25 * HH)), nTop: 2.2, nBot: 2.6, egg: o.build === 'stout' ? 0.17 : 0.12,
      asym: 0.04 * facing, rot: 0, noise: 0.006, seed: ct.seed + 7 };
    const tcx = 300 + 3 * u * facing, tcy = torsoBot - TB.b, tp = T.blobPts(tcx, tcy, TB);
    const centro3 = proj(mundo(b.corpo));
    const bracos = b.bracos.map((br) => {
      const s3 = proj(mundo(br.ombro)), e3 = proj(mundo(br.cotovelo)), m = b.maos[b.bracos.indexOf(br)], h3 = proj(mundo(m));
      // ombro do desenho: do lado em que o ombro do esqueleto aparece (de perfil, os dois quase no meio)
      const ox = Math.max(-1, Math.min(1, (s3[0] - centro3[0]) / (0.27 / SU / s)));
      const S = [tcx + ox * 0.85 * TB.a, chin + 0.12 * HH];
      const k = 0.82;
      const E = [S[0] + (e3[0] - s3[0]) * k, S[1] + (e3[1] - s3[1]) * k];
      const Hd = [E[0] + (h3[0] - e3[0]) * k, E[1] + (h3[1] - e3[1]) * k];
      return { pts: [S, E, Hd], frente: h3[2] - centro3[2] > 0.09 / SU || (e3[2] - centro3[2] > 0.12 / SU), z: h3[2] };
    });
    const desenhaBraco = (a) => { pen.stroke(T.curve(a.pts[0], a.pts[1], a.pts[2]), 5.2 * u, armCol); pen.dot(a.pts[2][0], a.pts[2][1], 6 * u, INK); };
    const atras = costas ? bracos.filter((a) => a.frente) : bracos.filter((a) => !a.frente);
    const frente = costas ? bracos.filter((a) => !a.frente) : bracos.filter((a) => a.frente);
    atras.forEach(desenhaBraco);
    // tronco (ou vestido)
    if (o.dress) {
      const D = { a: 0.5 * W * 0.98, b: 0.5 * ((sole - 0.35 * HH) - (chin - 0.2 * HH)), nTop: 2.0, nBot: 3.0, egg: 0.35, asym: 0.03 * facing, rot: 0, noise: 0.006, seed: ct.seed + 9 };
      const dp = T.blobPts(300, sole - 0.35 * HH - D.b, D);
      pen.gradFill(dp, o.dress, T.mul(o.dress, [0.7, 0.72, 0.8]), light);
      pen.inkRing(dp, ow, thick);
    } else {
      pen.gradFill(tp, o.jacket, T.mul(o.jacket, [0.72, 0.74, 0.84]), light);
      if (!costas) pen.clip(tp, () => {
        if (o.gravata) {
          // colarinho branco e gravata
          pen.poly([[tcx - 16 * u, chin - 2 * u], [tcx, chin + 14 * u], [tcx + 16 * u, chin - 2 * u], [tcx + 10 * u, chin - 10 * u], [tcx - 10 * u, chin - 10 * u]], '#f4f5f7', 2.2 * u);
          pen.poly([[tcx - 5 * u, chin + 4 * u], [tcx + 5 * u, chin + 4 * u], [tcx + 7 * u, chin + 0.62 * HH], [tcx, chin + 0.72 * HH], [tcx - 7 * u, chin + 0.62 * HH]], o.gravata, 2.2 * u);
          pen.poly([[tcx - 6 * u, chin - 2 * u], [tcx + 6 * u, chin - 2 * u], [tcx + 5 * u, chin + 6 * u], [tcx - 5 * u, chin + 6 * u]], o.gravata, 2.2 * u);
        }
        if (o.cracha) {
          const bx = tcx + (o.gravata ? 18 : 6) * u * (facing || 1), by = chin + 0.42 * HH;
          pen.stroke([[tcx - 12 * u, chin], [bx - 4 * u, by - 9 * u]], 1.6 * u, '#2a5bd7');
          pen.stroke([[tcx + 12 * u, chin], [bx + 4 * u, by - 9 * u]], 1.6 * u, '#2a5bd7');
          pen.poly([[bx - 9 * u, by - 9 * u], [bx + 9 * u, by - 9 * u], [bx + 9 * u, by + 13 * u], [bx - 9 * u, by + 13 * u]], '#ffffff', 2 * u);
          pen.poly([[bx - 6 * u, by - 3 * u], [bx + 6 * u, by - 3 * u], [bx + 6 * u, by + 1 * u], [bx - 6 * u, by + 1 * u]], '#2a5bd7', 0);
        }
      });
      pen.inkRing(tp, ow, thick);
    }
    frente.forEach(desenhaBraco);

    // ---- cabeça ----
    const [cpx, cpy] = T.rotPts([[300, chin]], rad(A), 300, hipY)[0];
    pen.rot = Ah ? [rad(Ah), 300, chin, cpx - 300, cpy - chin] : (A ? [0, 300, chin, cpx - 300, cpy - chin] : null);
    const hp = T.blobPts(300, hc + nod * 0.2, H);
    if (costas) {
      pen.shadedFill(hp, o.hat === 'hair' ? o.hair : o.hat === 'cap' ? o.cap : o.skin, T.mul(o.hat === 'hair' ? o.hair : o.skin, [0.8, 0.8, 0.88]), light, H.a);
      pen.inkRing(hp, ow, thick);
    } else {
      pen.shadedFill(hp, o.skin, T.mul(o.skin, [0.95, 0.88, 0.88]), light, H.a);
      pen.inkRing(hp, ow, thick);
      if (o.hat) T.hatOn(pen, o, hp, H, 300, hc, light, ct.seed, facing, false);
      const olhoFechado = b.cabeca && b.cabeca.children.some((c) => c.isGroup && c.scale.y < 0.4);
      T.faceFront(pen, 300, hc + nod * 0.4, W, rostoDe(b), facing, facing * 0.6, olhoFechado ? 1 : 0, false, o.skin, o.moustache, o.build === 'stout');
      if (o.oculos) for (const sd of [-1, 1]) pen.ell(300 + 7 * u * facing + sd * 13 * u, hc + nod * 0.4, 12 * u, 11 * u, null, 3 * u);
      if (b.suando) pen.ell(300 + 44 * u * (facing || 1), hc - 26 * u, 3.5 * u, 6 * u, '#9fd4ff', 2 * u);
    }
    pen.rot = null;
    ct.tex.needsUpdate = true;
  }

  // ---------- Cartão ----------

  function criarCartao(b, op) {
    const cv = document.createElement('canvas');
    cv.width = Math.round(600 * ESCALA_PX); cv.height = Math.round(1000 * ESCALA_PX);
    const g2 = cv.getContext('2d');
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    // a sola (y = 975 no desenho) fica na origem do cartão
    const geo = new THREE.PlaneGeometry(600 * SU, 1000 * SU).translate(0, 475 * SU, 0);
    const mat = new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.45, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.cartao = true;
    mesh.castShadow = false; mesh.receiveShadow = false;
    mesh.renderOrder = 2;
    mesh.layers.enable(6);  // a máscara do contorno (zz-visual-motion.js)
    K.scene.add(mesh);
    const ct = { b, o: roupaDe(op, b), cv, g2, tex, mesh, pen: new T.Pen(g2), seed: op.semente || 3 + cartoes.length * 7,
      R: new THREE.Vector3(), U: new THREE.Vector3(0, 1, 0), N: new THREE.Vector3(), s: 1 };
    ct.pen.ol = 12;
    cartoes.push(ct);
    return ct;
  }

  function visivelNaCena(o) { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; }

  // Atualiza todos os cartões pra câmera atual (o visual motion chama antes de desenhar o quadro)
  const cTint = new THREE.Color();
  K.atualizarCartoes = function (cam) {
    cartoes.forEach((ct) => {
      const b = ct.b;
      if (!visivelNaCena(b.g) || !b.g.parent) { ct.mesh.visible = false; return; }
      ct.mesh.visible = true;
      b.g.updateMatrixWorld(true);
      const base = b.corpo.getWorldPosition(new THREE.Vector3());
      ct.s = b.g.getWorldScale(new THREE.Vector3()).y || 1;
      // de frente pra câmera, só girando em volta do eixo vertical
      const dx = cam.position.x - base.x, dz = cam.position.z - base.z, giro = Math.atan2(dx, dz);
      ct.mesh.position.copy(base);
      ct.mesh.rotation.set(0, giro, 0);
      ct.mesh.scale.setScalar(ct.s);
      ct.R.set(Math.cos(giro), 0, -Math.sin(giro));
      ct.N.set(Math.sin(giro), 0, Math.cos(giro));
      vO.copy(base);
      desenharQuadro(ct, cam);
      // luz da cena no cartão: de noite ele escurece e puxa pro azul
      const k = K.clamp(K.hemi.intensity / 1.7, 0.5, 1);
      cTint.copy(K.hemi.color).lerp(new THREE.Color(1, 1, 1), 0.55).multiplyScalar(k);
      ct.mesh.material.color.copy(cTint.r > 0.98 && cTint.g > 0.98 ? new THREE.Color(1, 1, 1) : cTint);
    });
  };
  K.cartoesBoneco = cartoes;

  // ---------- Ligando no K.boneco ----------

  const boneco0 = K.boneco;
  K.boneco = function (op = {}) {
    const b = boneco0(op);
    if (!K.motion || op.desenho3d) return b;
    // o esqueleto some da câmera (e da sombra), mas continua mexendo; o que ele segurar (op.segurar) continua aparecendo
    const esqueleto = new Set();
    b.g.traverse((m) => { if (m.isMesh) esqueleto.add(m); });
    esqueleto.forEach((m) => { if (!(m.material && m.material.transparent && m.material.map)) m.layers.set(CAMADA_ESQ); });
    b.cartao = criarCartao(b, op);
    b.desenho2d = true;
    return b;
  };
  K.boneco2d = true;
})();
