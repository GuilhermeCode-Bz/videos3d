// Quarenta rascunhos (canal Mappoa): o Nico soterrado em bolas de papel amassado, com o dedo tremendo no Enviar.
// Quatro lugares (K.cenarios): o quarto de dia e de noite, o estúdio de fotografia (fundo infinito) e o palco do Mappoa.
// O monte de papel é um InstancedMesh feito aqui (cresce, explode e fica espalhado no chão). Cada plano começa com as
// linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, rival, robo, comp, cel, cadeira, telaC, telaM, navG, FOV0, celRival;
  let papelM, bola, caem = [], estudioG, flash, letreiro, banqueta;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador com a mesa, a cadeira na frente (SEAT) e o celular gigante à direita dele
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const OLHA_CAM = [1.4, 1.1, 3.4];             // sentado no monte, virado pra câmera (e um pouco pro celular)
  const CEL = [0.32, 0, -0.38], CEL_ESC = 1.45;  // o celular gigante (frente pra câmera, girado um pouco pro Nico)
  const CEL_GIRO = Math.atan2(-0.6 - CEL[0], 3.4 - CEL[2]);
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  const PILHA = [SEAT[0] + 0.05, 0, SEAT[2] + 0.12];
  const DIANTE_CEL = [CEL[0] - 0.62, 0, CEL[2] + 0.3];   // em pé, do lado esquerdo do celular
  // Estúdio (fundo infinito): banqueta de foto, tripé, softboxes, letreiro; a dona do lado da câmera
  const LETR = [-0.1, 2.55, -2.6], BANQ = [-0.7, 0, -1.3], TRIPE = [0.55, 0, 0.5], DONA = [1.2, 0, 0.95], RIV_DE = [-3.4, 0, 2.6], RIV_ATE = [0.35, 0, 1.45];

  const LUGAR = {
    gancho: 'quarto', trava: 'quarto', rascunhos: 'quarto', estudio: 'estudio', rival: 'estudio', sai: 'quarto',
    lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'quarto'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'rascunhos') return tc < quando('semana', B, 0.5) - 0.1 ? 'quarto' : 'quarto_noite';
    if (B.plano === 'antes_agora') return tc < quando('testa', B, 0.92) - 0.05 ? 'quarto' : 'estudio';
    return LUGAR[B.plano] || 'quarto';
  }

  const ESTUDIOS = [
    { nome: 'Foco Estúdio Fotografia', end: 'Rua Barão de Jundiaí, 410', chips: ['whats', 'insta'] },
    { nome: 'Estúdio Lente Viva', end: 'Av. Jundiaí, 1250', chips: ['whats', 'tel'] },
    { nome: 'Clique Arte Fotografia', end: 'Rua do Rosário, 88', chips: ['insta'] },
    { nome: 'Studio Luz da Serra', end: 'Av. Nove de Julho, 3020', chips: ['whats', 'insta'] }
  ];
  const RASCUNHO = 'Oi! Vi que o estúdio ainda não tem site e pensei que';

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
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  function quebra(c, s, x, y, maxW, lh, tam, cor, peso = 600) {
    c.font = `${peso} ${tam}px Montserrat, sans-serif`; let l = '', yy = y;
    s.split(' ').forEach((p) => { const t = l ? l + ' ' + p : p; if (c.measureText(t).width > maxW && l) { txt(c, l, x, yy, tam, cor, peso); yy += lh; l = p; } else l = t; });
    if (l) txt(c, l, x, yy, tam, cor, peso);
  }

  // ---------- A tela do celular gigante: o chat com o Foco Estúdio, o rascunho e o botão Enviar ----------
  // e: { n (nº do rascunho), letras (0 a 1 do texto), estado: 'rascunho' | 'enviada' | 'zero', pulso (0 a 1) }
  function zap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#0b7a68'; c.fillRect(0, 0, w, h * 0.1);
    c.fillStyle = '#f2c46d'; c.beginPath(); c.arc(w * 0.12, h * 0.05, w * 0.055, 0, 7); c.fill();
    txt(c, 'Foco Estúdio', w * 0.22, h * 0.05, w * 0.07, '#fff', 800, 'left', w * 0.72);
    if (e.estado === 'enviada') {
      rr(c, w * 0.18, h * 0.16, w * 0.76, h * 0.22, 18, '#d9fdd3');
      quebra(c, RASCUNHO + ' posso te ajudar.', w * 0.22, h * 0.2, w * 0.68, h * 0.036, w * 0.048, '#1e1f22', 600);
      txt(c, 'Enviada ✓✓', w * 0.9, h * 0.355, w * 0.045, '#34b7f1', 800, 'right');
      rr(c, w * 0.08, h * 0.44, w * 0.84, h * 0.12, 36, '#25d366');
      txt(c, 'ENVIADA!', w / 2, h * 0.5, w * 0.11, '#fff', 900, 'center');
      return;
    }
    // o número do rascunho, numa pílula vermelha
    rr(c, w * 0.2, h * 0.115, w * 0.6, h * 0.05, 22, '#e8352b');
    txt(c, 'Rascunho ' + (e.n || 1), w / 2, h * 0.14, w * 0.065, '#fff', 900, 'center');
    // a caixa do texto, com o cursor piscando
    rr(c, w * 0.05, h * 0.185, w * 0.9, h * 0.235, 22, '#ffffff');
    const k = e.letras == null ? 1 : K.clamp(e.letras), s = RASCUNHO.slice(0, Math.round(RASCUNHO.length * k));
    quebra(c, s + (Math.floor((K.tc || 0) * 3) % 2 ? '|' : ' '), w * 0.1, h * 0.225, w * 0.8, h * 0.042, w * 0.058, '#1e1f22', 600);
    // o botão Enviar, grande, no meio da tela (onde o dedo e a testa chegam)
    const p = e.pulso || 0, esc = 1 + Math.sin(p * PI) * 0.08;
    c.save(); c.translate(w / 2, h * 0.5); c.scale(esc, esc);
    rr(c, -w * 0.42, -h * 0.06, w * 0.84, h * 0.12, 36, '#25d366');
    txt(c, 'ENVIAR ➤', 0, 0, w * 0.11, '#fff', 900, 'center');
    c.restore();
    if (e.estado === 'zero') { rr(c, w * 0.1, h * 0.62, w * 0.8, h * 0.1, 20, '#ffffff'); txt(c, '0 enviadas', w / 2, h * 0.67, w * 0.1, '#e8352b', 900, 'center'); }
    else { txt(c, 'enviadas: 0', w / 2, h * 0.67, w * 0.07, '#7a7f87', 800, 'center'); }
  }
  // o monitor do Nico: o site de exemplo dele
  function siteNico(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Nico Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites rápidos e bonitos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }

  // ---------- O monte de papel amassado (InstancedMesh) ----------
  const N = 440, base = [], voo = [];
  function geoPapel() {
    const geo = new THREE.IcosahedronGeometry(0.12, 1), r = K.rand(9), p = geo.attributes.position, mapa = new Map();
    for (let i = 0; i < p.count; i++) { const k = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`; if (!mapa.has(k)) mapa.set(k, 0.78 + r() * 0.4); const f = mapa.get(k); p.setXYZ(i, p.getX(i) * f, p.getY(i) * f, p.getZ(i) * f); }
    geo.computeVertexNormals();
    return geo;
  }
  function montarPapel() {
    const geo = geoPapel(), mat = K.mat(0xffffff, { flatShading: true, roughness: 0.9 });
    papelM = new THREE.InstancedMesh(geo, mat, N);
    papelM.castShadow = true; papelM.receiveShadow = true; papelM.frustumCulled = false;
    const r = K.rand(17), R = 1.25, H = 0.8;
    const frente = V(OLHA_CAM[0] - SEAT[0], 0, OLHA_CAM[2] - SEAT[2]).normalize();
    const rosto = V(SEAT[0], 0, SEAT[2]).addScaledVector(frente, 0.22);
    const pts = [];
    let tent = 0;
    while (pts.length < N && tent < 20000) {
      tent++;
      const a = r() * PI * 2, d = Math.sqrt(r()) * R, x = PILHA[0] + Math.cos(a) * d, z = PILHA[2] + Math.sin(a) * d;
      const h = H * Math.pow(Math.max(0, 1 - (d / R) * (d / R)), 0.65) + 0.08;
      const y = Math.max(0.07, h - r() * r() * h);
      // o rosto e o pescoço ficam de fora
      if (y > 0.55 && Math.hypot(x - rosto.x, z - rosto.z) < 0.42) continue;
      const s = 0.8 + r() * 0.5;
      pts.push({ p: V(x, y, z), s, rot: new THREE.Euler(r() * 6, r() * 6, r() * 6), c: r() });
    }
    pts.sort((a, b) => a.p.y - b.p.y);
    const cor = new THREE.Color();
    pts.forEach((q, i) => {
      base.push(q);
      cor.set(q.c < 0.12 ? 0xfff3c4 : q.c < 0.22 ? 0xe9eef7 : 0xf7f5ef); papelM.setColorAt(i, cor);
      // pra onde cada bola voa quando ele sai do papel (e onde fica no chão depois)
      const dir = V(q.p.x - PILHA[0], 0, q.p.z - PILHA[2]); if (dir.lengthSq() < 1e-4) dir.set(r() - 0.5, 0, r() - 0.5); dir.normalize();
      let dist = q.p.distanceTo(V(PILHA[0], q.p.y, PILHA[2])) + 0.5 + r() * 1.3;
      // encolhe o voo até caber no quarto (sem fazer fila na parede nem na frente da câmera)
      for (let k = 0; k < 8; k++) { const x = PILHA[0] + dir.x * dist, z = PILHA[2] + dir.z * dist; if (x > -2.2 && x < 2.2 && z > -0.9 && z < 1.5) break; dist *= 0.82; }
      const fim = V(PILHA[0] + dir.x * dist, 0.1 * q.s, PILHA[2] + dir.z * dist);
      if (fim.z < -0.6 && fim.x > -1.3 && fim.x < 0.3) fim.z = -0.6 + r() * 0.3;   // não em cima da mesa
      voo.push({ fim, atraso: r() * 0.12, dur: 0.5 + r() * 0.35, alto: 0.5 + r() * 0.9, gira: (r() - 0.5) * 14 });
    });
    if (papelM.instanceColor) papelM.instanceColor.needsUpdate = true;
    K.scene.add(papelM); K.nomear('papel', papelM);
    // a bola que ele amassa na mão e as que caem do alto no gancho
    bola = K.malha(geo, K.mat(0xffffff, { flatShading: true, roughness: 0.9 })); K.scene.add(bola);
    for (let i = 0; i < 4; i++) { const m = K.malha(geo, mat); m.scale.setScalar(1.1); K.scene.add(m); caem.push(m); }
  }
  const mm = new THREE.Matrix4(), qq = new THREE.Quaternion(), ss = new THREE.Vector3(), ee = new THREE.Euler();
  // modo 'monte': as k*N bolas de baixo · modo 'voa': t segundos depois de ele sair do papel (t grande = tudo no chão)
  function papel(modo, x) {
    papelM.visible = true;
    if (modo === 'monte') {
      const n = Math.max(1, Math.round(N * K.clamp(x)));
      for (let i = 0; i < n; i++) { const q = base[i]; qq.setFromEuler(q.rot); ss.setScalar(q.s); mm.compose(q.p, qq, ss); papelM.setMatrixAt(i, mm); }
      papelM.count = n;
    } else {
      for (let i = 0; i < N; i++) {
        const q = base[i], v = voo[i], u = K.clamp((x - v.atraso) / v.dur), p = q.p.clone().lerp(v.fim, u);
        p.y = K.lerp(q.p.y, v.fim.y, u) + 4 * v.alto * u * (1 - u);
        ee.set(q.rot.x + v.gira * u, q.rot.y, q.rot.z + v.gira * u * 0.5); qq.setFromEuler(ee); ss.setScalar(q.s); mm.compose(p, qq, ss); papelM.setMatrixAt(i, mm);
      }
      papelM.count = N;
    }
    papelM.instanceMatrix.needsUpdate = true;
    papelM.computeBoundingBox(); papelM.computeBoundingSphere();
  }
  // as bolas caindo do alto no monte (gancho): uma a cada "cada" segundos desde t0
  function chuvaPapel(tc, t0, cada) {
    caem.forEach((m, i) => {
      const t = tc - (t0 + i * cada); if (t < 0 || t > 0.5) return;
      const u = K.clamp(t / 0.42), alvo = base[N - 1 - i * 23].p;
      m.visible = true; m.position.set(alvo.x + (1 - u) * 0.3, K.lerp(2.9, alvo.y + 0.08, u * u), alvo.z + (1 - u) * 0.2);
      m.rotation.set(t * 9, t * 5, 0);
      if (t < 0.02) K.som('baque', t0 + i * cada + 0.42, 0.35);
    });
  }

  // ---------- O estúdio de fotografia (montado no fundo infinito) ----------
  function montarEstudio() {
    estudioG = new THREE.Group();
    const preto = K.mat(0x22252b, { roughness: 0.5 }), metal = K.mat(0x8c939c, { metalness: 0.5, roughness: 0.35 });
    // o tripé com a câmera, virado pra banqueta
    const tri = new THREE.Group(); tri.position.set(...TRIPE); estudioG.add(tri);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * PI * 2 + 0.3, perna = K.malha(new THREE.CylinderGeometry(0.018, 0.018, 1.32, 8), metal);
      perna.position.set(Math.cos(a) * 0.2, 0.64, Math.sin(a) * 0.2); perna.rotation.set(Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3); tri.add(perna);
    }
    const haste = K.malha(new THREE.CylinderGeometry(0.022, 0.022, 0.3, 8), metal); haste.position.y = 1.35; tri.add(haste);
    const cam = new THREE.Group(); cam.position.y = 1.55; tri.add(cam);
    cam.add(K.malha(new THREE.BoxGeometry(0.3, 0.2, 0.16), preto));
    const lente = K.malha(new THREE.CylinderGeometry(0.075, 0.085, 0.2, 18).rotateX(PI / 2), preto); lente.position.z = 0.17; cam.add(lente);
    const vidro = K.malha(new THREE.CircleGeometry(0.062, 18), K.mat(0x335577, { metalness: 0.8, roughness: 0.1 })); vidro.position.z = 0.272; cam.add(vidro);
    const topo = K.malha(new THREE.BoxGeometry(0.12, 0.07, 0.1), preto); topo.position.set(0, 0.13, 0.02); cam.add(topo);
    tri.lookAt(BANQ[0], 0, BANQ[2]);
    flash = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
    flash.position.set(0, 0.16, 0.05); cam.add(flash);
    // as duas softboxes (luz de estúdio): pé, caixa e a frente branca acesa
    [[-2.1, 0, -0.4], [1.0, 0, -2.4]].forEach((p) => {
      const sb = new THREE.Group(); sb.position.set(...p); estudioG.add(sb);
      const pe = K.malha(new THREE.CylinderGeometry(0.025, 0.025, 1.7, 8), preto); pe.position.y = 0.85; sb.add(pe);
      [0, 2.1, 4.2].forEach((a) => { const b = K.malha(new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6), preto); b.position.set(Math.cos(a) * 0.18, 0.12, Math.sin(a) * 0.18); b.rotation.set(Math.sin(a) * 1.1, 0, -Math.cos(a) * 1.1); sb.add(b); });
      const cx = K.malha(new THREE.BoxGeometry(0.8, 0.8, 0.38), preto); cx.position.set(0, 1.85, 0); sb.add(cx);
      const luz = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 0.72), new THREE.MeshBasicMaterial({ color: 0xfffaf0 })); luz.position.set(0, 1.85, 0.195); sb.add(luz);
      sb.lookAt(BANQ[0], 0, BANQ[2]);
    });
    K.scene.add(estudioG); K.nomear('estudio', estudioG); K.lugar(estudioG); tudo.push(estudioG);
    banqueta = K.m3d('banqueta', { cor: 0xe8352b }); guarda(banqueta, null, BANQ);
    letreiro = K.m3d('letreiro', { texto: 'FOCO ESTÚDIO', cor: '#ff4f9a', l: 3.7, a: 0.55 }); guarda(letreiro, null, LETR);
    const placa = K.malha(new THREE.BoxGeometry(3.9, 0.8, 0.06), K.mat(0x2a1f3d, { roughness: 0.6 })); placa.position.set(LETR[0], LETR[1], LETR[2] - 0.05); estudioG.add(placa);
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['home_office', { hora: 'noite' }, 'quarto_noite'], ['estudio', { cor: 0xe6def3, pedestal: false }, 'estudio'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaEstudios = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: ESTUDIOS, n: e.n, sel: e.sel, total: 87, comSite: 58, semSite: 29 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Estúdios de fotografia · Jundiaí, SP', 36, 168, 21, M.marinho, 700, 'left', w - 72);
    };
    T.analiseEstudio = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Foco Estúdio Fotografia', ate: e.ate, aderencia: 0.92 * k,
        dores: ['Sem site próprio', 'Agenda só pelo direct'], oportunidades: ['Site com portfólio e agenda online'],
        objecoes: ['"O Instagram já mostra as fotos"'], abordagem: 'Mostre quem procura ensaio no Google e acha outro estúdio.'
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

    // Personagens: o Nico (do canal), a dona do estúdio, o outro web designer e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.personagem('dona', { cores: { blazer: 0x8b5cf6 } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xf08a24, punho: 0xd9731a, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xc98d5e } });
    K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');
    celRival = K.celular(); celRival.g.scale.setScalar(1.6); tudo.push(celRival.g);

    // Quarto: o computador com a mesa, a cadeira, o celular gigante e o monte de papel
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante'); cel.rotation.set(0, CEL_GIRO, 0); guarda(cel, 'celular', CEL, CEL_ESC);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    montarPapel();
    montarEstudio();

    // Efeitos
    fx.cont = K.contador();
    fx.pensa = K.balaoPensamento(); fx.pensa2 = K.balaoPensamento();
    fx.fala = K.balaoFala(); fx.fala2 = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.marcaX = K.marca('errado'); fx.marcaOk = K.marca('certo');
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      r40: e('40 rascunhos', 'vermelho'), zero: e('0 enviadas', 'vermelho'), web: e('Web designer', 'azul'), dia7: e('Dia 7', 'laranja'),
      semSite: e('Sem site', 'vermelho'), torta: e('Mensagem torta', 'laranja'), fechou: e('Fechou', 'verde'), bora: e('Bora!', 'verde'),
      jundiai: e('Jundiaí', 'azul'), chance: e('Mais chance', 'verde'), ninguem: e('Pra ninguém', 'vermelho'), precisa: e('Pra quem precisa', 'verde'),
      respondeu: e('Respondeu!', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || OLHA_CAM);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function celTela(e) { ve(cel); cel.userData.m3d.tela.desenhar((c, w, h) => zap(c, w, h, e), JSON.stringify(e) + (Math.floor((K.tc || 0) * 3) % 2)); }
  // onde fica o botão Enviar no mundo
  function botao() { cel.updateMatrixWorld(true); const p = cel.localToWorld(V(0, 0.8, 0.07)); return [p.x, p.y, p.z]; }
  const celTopo = () => { cel.updateMatrixWorld(true); const p = cel.localToWorld(V(0, 1.45, 0.07)); return [p.x, p.y, p.z]; };
  // o dedo tremendo na direção do Enviar
  function dedoTremendo(tc, forca = 1) {
    menino.apontar(0.55);
    const br = menino.bracos[1];
    br.ombro.rotation.x += Math.sin(tc * 47) * 0.06 * forca; br.ombro.rotation.z += Math.sin(tc * 39 + 1) * 0.05 * forca;
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o Nico enterrado até o pescoço no papel, o celular gigante com "Rascunho 40" e o dedo tremendo · MOSTRA: personagem, papel, celular
      const tQ = quando('quarenta', B, 0.35), tN = quando('nenhuma', B, 0.85);
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      sentado(OLHA_CAM);
      papel('monte', 1);
      // ENTRA AGORA: bolas de papel caindo do alto
      chuvaPapel(tc, B.inicio - 0.25, 0.42);
      // OBJETOS SE MEXENDO: o celular vibra; "0 enviadas" em "nenhuma"
      celTela({ n: 40, letras: 1, estado: tc > tN ? 'zero' : 'rascunho', pulso: (tc * 2) % 1 });
      cel.userData.m3d.vibrar(tc, 0.6);
      // PERSONAGEM: dedo tremendo, suando · em "nenhuma": recolhe e afunda triste
      if (tc < tN) { dedoTremendo(tc, 1); menino.humor('assustado'); menino.suar(tc); }
      else { menino.reagir('triste', tc - tN); }
      // CÂMERA: 4 cortes de ~0,8 s
      const d = B.dur, c1 = B.inicio + d * 0.23, c2 = B.inicio + d * 0.46, c3 = B.inicio + d * 0.68;
      const bt = botao();
      if (tc < c1) {
        K.filmar([bt, celTopo(), menino.mao(1)], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 12, altura: 'olho', tam: 0.9 });
      } else if (tc < c2) {
        const alvo = base[N - 1 - 23].p;
        K.filmar([[alvo.x, alvo.y + 0.4, alvo.z], cabecaDe(menino, -0.1), [alvo.x, alvo.y - 0.1, alvo.z]], 'descendo', pc(tc, c1, c2), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.1 });
        K.som('whoosh', c1, 0.5);
      } else if (tc < c3) {
        K.filmar([cabecaDe(menino, 0.15), cabecaDe(menino, -0.35), bt], 'chegando', pc(tc, c2, c3), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.0 });
        K.som('whoosh', c2, 0.5);
      } else {
        K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.45), botao(), mais(PILHA, [-0.3, 0.5, 0.7])], 'afastando', pc(tc, c3, B.ate), { plano: 'perto', lado: -6, altura: 'olho', espacoCima: 0.22, tam: 1.05 });
        K.som('whoosh', c3, 0.5);
      }
      // EFEITOS VISUAIS: "40 rascunhos" em "quarenta" · ✗ em "nenhuma"
      if (tc < tN) fx.et.r40.em({ tela: [540, 600] }, tc - tQ);
      else { fx.et.zero.em({ tela: [540, 600] }, tc - tN); fx.marcaX.em({ tela: [820, 470] }, tc - tN); }
      // SONS: estrondo + whoosh no 1º quadro
      K.som('estrondo', B.inicio + 0.05, 0.35); K.som('whoosh', B.inicio + 0.05, 0.6); K.som('zumbido', B.inicio + 0.2, 0.25);
      K.som('trava', tQ, 0.4);
    },
    trava(B, tc) {
      // NA TELA: o quarto de dia sem o monte; o Nico de pé do lado do celular gigante com o rascunho 1 · MOSTRA: personagem, celular
      const tW = quando('designer', B, 0.3), tT = quando('trava', B, 0.42), tE = quando('Enviar', B, 0.55), tA = quando('amador', B, 0.9);
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      celTela({ n: 1, letras: K.clamp((tc - B.inicio) / 1.2), estado: 'rascunho', pulso: tc > tE ? pc(tc, tE, tE + 0.5) : 0 });
      // PERSONAGEM: anda até o celular · em "trava": dedo parado, tremendo · em "amador": mão na testa
      const olha = [1.0, 1.2, 3.6];
      if (tc < tT) { menino.irPara(mais(DIANTE_CEL, [-1.2, 0, 0.5]), DIANTE_CEL, pc(tc, B.inicio, tT), tc, { olhar: olha }); }
      else { menino.colocar(DIANTE_CEL, olha); if (tc < tA) { dedoTremendo(tc, 1.2); menino.humor('assustado'); } else menino.reagir('mao_na_testa', tc - tA); }
      // EFEITOS VISUAIS: "Web designer" em "designer" · o balão em "amador"
      if (tc < tA) fx.et.web.em(cabecaDe(menino, 0.55), tc - tW);
      fx.pensa.em(cabecaDe(menino, 0.1), tc - tA + 0.25, { texto: 'E se acharem que sou amador?' });
      K.som('passo', B.inicio + 0.1, 0.3); K.som('passo', B.inicio + 0.4, 0.3); K.som('passo', B.inicio + 0.7, 0.3);
      K.som('ding', tW, 0.4); K.som('trava', tT, 0.6); K.som('pingo', tA - 0.25, 0.5);
      // CÂMERA: (1) passando · médio · lado -10 · (2) de "Enviar": chegando · perto · lado 30 · baixo
      if (tc < tE) K.filmar([menino, celTopo(), botao()], 'passando', pc(tc, B.inicio, tE), { plano: 'medio', lado: -10, altura: 'olho', tam: 2.1 });
      else { K.filmar([botao(), cabecaDe(menino, 0.15), menino.mao(1)], 'chegando', pc(tc, tE, B.ate), { plano: 'perto', lado: 30, altura: 'baixo', tam: 1.5 }); K.som('whoosh', tE, 0.4); }
    },
    rascunhos(B, tc) {
      // NA TELA: rajada (tela apagando, ele digitando, ele amassando); depois o quarto de noite com o monte crescendo · MOSTRA: personagem, papel
      const tAp = quando('Apaga', B, 0.03), tRe = quando('reescreve', B, 0.16), tAm = quando('amassa', B, 0.3), tSe = quando('semana', B, 0.5), tUm = quando('um', B, 0.95);
      const noite = tc >= tSe - 0.1;
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      // OBJETOS SE MEXENDO: o texto some em "Apaga" e volta em "reescreve"; o rascunho sobe
      const letras = tc < tRe ? 1 - pc(tc, tAp, tRe) : pc(tc, tRe, tAm);
      const n = noite ? Math.round(K.lerp(8, 41, pc(tc, tSe, tUm))) : 2 + (tc > tAm ? 1 : 0);
      celTela({ n, letras: noite ? 1 : letras, estado: 'rascunho', pulso: 0 });
      // ENTRA AGORA: o monte cresce
      papel('monte', noite ? K.lerp(0.55, 0.92, pc(tc, tSe, B.ate)) : K.lerp(0.12, 0.3, pc(tc, B.inicio, tSe)));
      sentado(noite ? OLHA_CAM : [CEL[0], 1.2, CEL[2] + 0.6]);
      // PERSONAGEM: "Apaga" mão na testa · "reescreve" digitando · "amassa" segura e joga · "semana" cansado · fim coça a cabeça
      const tJoga = tAm + 0.45;
      if (tc < tRe) menino.reagir('mao_na_testa', tc - tAp);
      else if (tc < tAm) menino.reagir('digitando', tc);
      else if (tc < tSe - 0.1) {
        if (tc < tJoga) menino.segurar(); else menino.reagir('mostrando', tc - tJoga);
      } else if (tc < tUm - 0.5) menino.reagir('cansado', tc - tSe); else menino.reagir('coca_cabeca', tc - tUm + 0.5);
      // INTERAÇÃO: a bola amassada nas mãos e jogada no monte
      if (tc > tAm && tc < tSe - 0.1) {
        const m0 = menino.mao(0), m1 = menino.mao(1), mid = V((m0[0] + m1[0]) / 2, (m0[1] + m1[1]) / 2, (m0[2] + m1[2]) / 2);
        bola.visible = true;
        if (tc < tJoga) { bola.position.copy(mid); bola.scale.setScalar(K.lerp(1.8, 1.1, pc(tc, tAm, tJoga))); bola.rotation.set(tc * 6, tc * 4, 0); }
        else { const u = pc(tc, tJoga, tJoga + 0.45), alvo = base[Math.round(N * 0.3)].p; bola.position.set(K.lerp(mid.x, alvo.x + 0.5, u), K.lerp(mid.y, alvo.y + 0.2, u) + 4 * 0.5 * u * (1 - u), K.lerp(mid.z, alvo.z + 0.5, u)); bola.rotation.set(tc * 9, 0, tc * 5); }
      }
      // EFEITOS VISUAIS: "Dia 7" em "semana" · o contador
      if (noite) {
        fx.et.dia7.em({ tela: [540, 400] }, tc - tSe);
        fx.cont.em(mais(PILHA, [0.1, 2.05, 0.2]), tc - tSe - 0.2, { de: 8, ate: 41, dur: Math.max(0.5, tUm - tSe - 0.2), antes: 'Rascunho ', depois: '', cor: '#e8352b' });
      }
      // SONS: teclas em rajada, estalo da bola, whoosh, baque
      for (let k = 0; k < 8; k++) K.som('clique', tRe + k * 0.06, 0.3);
      K.som('estalo', tAm, 0.6); K.som('estalo', tAm + 0.15, 0.4); K.som('whoosh', tJoga, 0.5); K.som('baque', tJoga + 0.45, 0.4);
      K.som('whoosh', tSe - 0.1, 0.5); K.som('apito', tAp, 0.15);
      // CÂMERA: rajada de 3 cortes + girando de noite
      if (tc < tRe) K.filmar([botao(), celTopo()], 'chegando', pc(tc, B.inicio, tRe), { plano: 'perto', lado: 5, altura: 'olho', tam: 1.0 });
      else if (tc < tAm) { K.filmar([cabecaDe(menino, 0.1), cabecaDe(menino, -0.5)], 'passando', pc(tc, tRe, tAm), { plano: 'perto', lado: -25, altura: 'olho', tam: 1.0 }); K.som('whoosh', tRe, 0.4); }
      else if (tc < tSe - 0.1) { K.filmar([cabecaDe(menino, 0), mais(SEAT, [0.2, 0.75, 0.5]), mais(PILHA, [0.6, 0.4, 0.6])], 'chegando', pc(tc, tAm, tSe), { plano: 'perto', lado: 20, altura: 'baixo', tam: 1.3 }); K.som('whoosh', tAm, 0.4); }
      else K.filmar([cabecaDe(menino, 0.3), mais(PILHA, [-1.0, 0.1, 0.5]), mais(PILHA, [1.0, 0.1, 0.5]), mais(PILHA, [0.1, 2.1, 0.2])], 'girando', pc(tc, tSe, B.ate), { plano: 'perto', lado: 10, angulo: 25, altura: 'olho', tam: 1.7 });
    },
    estudio(B, tc) {
      // NA TELA: o estúdio com o letreiro, o tripé, as softboxes, a banqueta vazia; a dona do lado da câmera · MOSTRA: dona, estudio
      const tEs = quando('estúdio', B, 0.12), tF = quando('fotografia', B, 0.3), tSi = quando('site', B, 0.65), tCl = quando('cliente', B, 0.9);
      ve(estudioG, banqueta, letreiro);
      K.entrar(letreiro, 'surge', tc - tEs, { dur: 0.3 });
      banqueta.rotation.set(0, (tc - B.inicio) * 0.8, 0);
      // OBJETOS SE MEXENDO: o flash dispara em "fotografia" (sem ninguém na banqueta)
      flash.material.opacity = tc > tF ? Math.max(0, 1 - (tc - tF) / 0.25) : 0; flash.scale.setScalar(1 + (tc > tF ? (tc - tF) * 4 : 0));
      // PERSONAGEM: a dona · começo encolhe os ombros · em "cliente": cara triste, olhando os lados
      if (tc < tSi) { dona.colocar(DONA, [0.6, 1.2, 5]); dona.reagir('ombros', tc - B.inicio); }
      else { const a = Math.sin((tc - tSi) * 3.5); dona.colocar(DONA, [DONA[0] + a * 3, 1.3, 6]); dona.reagir('triste', tc - tSi); }
      // EFEITOS VISUAIS: "Sem site" em "site" · balão "Agenda vazia..." em "cliente"
      fx.et.semSite.em({ tela: [540, 400] }, tc - tSi);
      fx.pensa.em(cabecaDe(dona, 0.1), tc - tCl, { texto: 'Agenda vazia...' });
      K.som('brilho', tEs, 0.5); K.som('estalo', tF, 0.7); K.som('pingo', tCl, 0.5);
      // CÂMERA: (1) chegando · aberto · frente · (2) passando · perto · lado 30 · baixo
      if (tc < tSi) K.filmar([[TRIPE[0], 1.6, TRIPE[2]], mais(BANQ, [0, 0.8, 0]), mais(DONA, [0, 1.75, 0]), mais(DONA, [0, 0.1, 0])], 'chegando', pc(tc, B.inicio, tSi), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.2 });
      else { K.filmar([cabecaDe(dona, 0.2), mais(DONA, [0, 0.3, 0]), [TRIPE[0], 1.6, TRIPE[2]]], 'passando', pc(tc, tSi, B.ate), { plano: 'perto', lado: 30, altura: 'baixo', tam: 1.9 }); K.som('whoosh', tSi, 0.4); }
    },
    rival(B, tc) {
      // NA TELA: o rival entra digitando no celular; o balão da mensagem torta; o aperto de mão · MOSTRA: rival, dona
      const tM = quando('mensagem', B, 0.3), tTo = quando('torta', B, 0.4), tEr = quando('erro', B, 0.62), tF = quando('fecha', B, 0.88);
      ve(estudioG, banqueta, letreiro);
      // PERSONAGEM: o rival anda digitando · em "fecha": aperta a mão
      const chega = tF - 0.35;
      if (tc < chega) { rival.irPara(RIV_DE, RIV_ATE, pc(tc, B.inicio - 0.3, chega), tc, { olhar: DONA }); rival.reagir('celular', tc); }
      else { rival.colocar(RIV_ATE, mais(DONA, [0, 1.2, 0])); if (tc > tF) rival.reagir('mostrando', tc - tF); else rival.reagir('celular', tc); }
      // o celular na mão do rival
      ve(celRival); { const m = rival.mao(1); celRival.g.position.set(m[0], m[1] + 0.12, m[2]); celRival.g.rotation.set(-0.3, rival.g.rotation.y, 0); }
      celRival.tela.desenhar((c, w, h) => { c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h); rr(c, w * 0.1, h * 0.4, w * 0.8, h * 0.2, 10, '#d9fdd3'); }, 'r');
      // a dona · em "erro": surpresa olhando o celular · em "fecha": comemora
      dona.colocar(DONA, cabecaDe(rival, -0.4));
      if (tc > tF + 0.3) dona.reagir('comemorando', tc - tF); else if (tc > tEr) dona.reagir('celular', tc - tEr); else dona.reagir('surpreso', tc - B.inicio);
      // EFEITOS VISUAIS: o balão da mensagem torta · "Mensagem torta" · ✓ e "Fechou"
      if (tc < tF) fx.fala.em(cabecaDe(rival, 0.05), tc - tM, { texto: 'oi faço sitee barato rs' });
      if (tc < tF) fx.et.torta.em({ tela: [540, 400] }, tc - tTo);
      else { fx.et.fechou.em({ tela: [540, 400] }, tc - tF); fx.simb.em(mais(RIV_ATE, [0.4, 2.3, -0.2]), tc - tF, { tipo: '✓', tam: 1.2 }); }
      for (let k = 0; k < 6; k++) K.som('clique', B.inicio + 0.2 + k * 0.1, 0.25);
      K.som('pingo', tM, 0.5); K.som('errado', tEr, 0.3); K.som('certo', tF, 0.7); K.som('festa', tF + 0.1, 0.4);
      // CÂMERA: (1) chegando · médio · lado -20 · (2) parado · médio · lado 15 · os dois
      if (tc < tF - 0.1) K.filmar([rival, cabecaDe(rival, 0.75)], 'chegando', pc(tc, B.inicio, tF - 0.1), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.8 });
      else { K.filmar([mais(RIV_ATE, [0, 1, 0]), mais(DONA, [0, 1, 0]), mais(RIV_ATE, [0.4, 2.3, -0.2]), mais(RIV_ATE, [0, 0.1, 0]), mais(DONA, [0, 0.1, 0])], 'parado', pc(tc, tF - 0.1, B.ate), { plano: 'perto', lado: 15, altura: 'olho', tam: 1.8 }); K.som('whoosh', tF - 0.1, 0.4); }
    },
    sai(B, tc) {
      // NA TELA: o monte explode e o Nico sai de dentro, de pé, com o punho pra cima · MOSTRA: personagem, papel
      const tS = quando('sai', B, 0.3), tI = quando('investir', B, 0.85);
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      // ENTRA AGORA: em "sai", as bolas voam e caem no chão
      if (tc < tS) papel('monte', 1); else papel('voa', tc - tS);
      // PERSONAGEM: começo sentado, com a ideia · em "sai": pula pra fora · em "investir": vitória
      if (tc < tS) { sentado(OLHA_CAM); menino.reagir('ideia', tc - B.inicio); }
      else {
        ve(cadeira); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, 0.4 + K.suave(pc(tc, tS, tS + 0.6)) * 1.6, 0);
        const u = pc(tc, tS, tS + 0.45), p = [K.lerp(SEAT[0], SEAT[0] + 0.5, u), 0, K.lerp(SEAT[2], SEAT[2] + 0.75, u)];
        menino.colocar(p, [1.0, 1.1, 4]); menino.g.position.y = Math.sin(u * PI) * 0.35;
        if (tc > tI) menino.reagir('vitoria', tc - tI); else menino.reagir('erguendo', tc - tS);
      }
      fx.poof.em(mais(PILHA, [0, 0.9, 0.2]), tc - tS, { escala: 0.9 });
      // EFEITOS VISUAIS: "Bora!" em "investir"
      fx.et.bora.em({ tela: [540, 400] }, tc - tI);
      K.som('whoosh', tS - 0.05, 0.6); K.som('estrondo', tS, 0.3);
      for (let k = 0; k < 6; k++) K.som('baque', tS + 0.5 + k * 0.08, 0.25);
      K.som('brilho', tI, 0.6);
      // CÂMERA: subindo · médio · lado 15 · baixo
      K.filmar([mais(SEAT, [0.5, 0, 0.75]), mais(SEAT, [0.5, 1.9, 0.75]), mais(PILHA, [-0.8, 0.2, 0.3]), mais(PILHA, [0.8, 0.2, 0.3])], 'subindo', B.p, { plano: 'perto', lado: 15, altura: 'baixo', tam: 2.0 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a lista dos estúdios sobe do computador; o Nico ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digita', B, 0.03), tC = quando('computador', B, 0.25), tL = quando('lista', B, 0.45), tEs = quando('estúdios', B, 0.55), tJ = quando('Jundiaí', B, 0.8);
      ve(comp, navG); comp.tela.desenhar(siteNico, 'nico');
      papel('voa', 99);
      // ENTRA AGORA: a barra em "Digita" e as letras até "computador"; a lista sobe em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tEs ? 1 + Math.floor((tc - tEs) / 0.22) : 0;
        telaC.mostrar('listaEstudios', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tEs + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo digitando · em "vem": levanta e aponta o Foco Estúdio
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.jundiai.em({ tela: [540, 400] }, tc - tJ);
      // CÂMERA: (1) por cima do ombro · (2) chegando · médio · frente
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else { K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' }); K.som('whoosh', vem, 0.4); }
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Foco Estúdio; o robô à esquerda; o Nico à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.42), tCh = quando('chance', B, 0.72), tCo = quando('contratar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: a aderência enche de "chance" a "contratar"
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseEstudio', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "contratar": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando · médio · frente · baixo · (2) passando · médio · lado -14
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else { K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 }); K.som('whoosh', tMo, 0.4); }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: enterrado no papel · (2) Agora: de pé no celular, aperta o Enviar com a testa · (3) o estúdio: a dona comemora · MOSTRA: personagem, celular
      const tAg = quando('Agora', B, 0.38), tAp = quando('Aperta', B, 0.66), tTe = quando('testa', B, 0.92);
      const tBate = (tAp + tTe) / 2 + 0.1, tEst = tTe - 0.05;
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      if (tc < tAg) {
        sentado(OLHA_CAM); papel('monte', 1); dedoTremendo(tc, 1); menino.humor('assustado');
        celTela({ n: 40, letras: 1, estado: 'rascunho', pulso: 0 });
        fx.et.ninguem.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
        K.som('errado', B.inicio + 0.25, 0.4);
        // CÂMERA: (1) afastando · médio · lado 35
        K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.45), botao()], 'afastando', pc(tc, B.inicio, tAg), { plano: 'perto', lado: -18, altura: 'olho', tam: 1.1 });
      } else if (tc < tEst) {
        papel('voa', 99);
        const enviou = tc > tBate;
        celTela({ n: 1, letras: 1, estado: enviou ? 'enviada' : 'rascunho', pulso: 0 });
        // PERSONAGEM: decidido; inclina e bate a testa no Enviar, de olho fechado
        const frente = [CEL[0] - Math.sin(CEL_GIRO) * -0.0, 0, CEL[2]];
        const pos = mais(frente, [Math.sin(CEL_GIRO) * 0.95, 0, Math.cos(CEL_GIRO) * 0.95]);
        if (tc < tAp) { menino.colocar(mais(pos, [-0.15, 0, 0.1]), [1.0, 1.2, 4]); menino.reagir('vitoria', tc - tAg); fx.et.precisa.em({ tela: [540, 400] }, tc - tAg - 0.1); }
        else {
          menino.colocar(pos, [CEL[0], 1.0, CEL[2]]);
          const k = K.clamp((tc - tAp) / Math.max(0.2, tBate - tAp)), volta = K.clamp((tc - tBate) / 0.35);
          menino.corpo.rotation.x = 0.5 * K.suave(k) * (1 - 0.5 * volta);
          menino.cabeca.rotation.x = 0.25 * K.suave(k);
          menino.pose({ z: 0.5 }, { z: 0.5 });
          if (tc < tBate + 0.1) { menino.humor('bravo'); const ol = menino.cabeca.children.find((c) => c.isGroup && c.children.length >= 2 && Math.abs(c.position.y - 0.03) < 1e-6); if (ol) ol.scale.y = 0.1; }
          else menino.humor('feliz');
          if (tc > tBate) { cel.userData.m3d.vibrar(tc - tBate, Math.max(0, 1 - (tc - tBate) * 3)); fx.simb.em(mais(celTopo(), [0.3, 0.3, 0.1]), tc - tBate, { tipo: '✓', tam: 1.1 }); }
        }
        K.som('avanca', tAg, 0.5); K.som('baque', tBate, 0.7); K.som('whoosh', tBate + 0.05, 0.5);
        // CÂMERA: (2) passando · médio, depois de perfil na testa
        if (tc < tAp) K.filmar([menino, celTopo(), botao()], 'passando', pc(tc, tAg, tAp), { plano: 'medio', lado: 10, altura: 'olho', tam: 2.0 });
        else { K.filmar([botao(), cabecaDe(menino, 0.1), celTopo(), mais(pos, [0, 0.1, 0])], 'chegando', pc(tc, tAp, tEst), { plano: 'perto', lado: -75, altura: 'olho', tam: 1.6 }); K.som('whoosh', tAp, 0.4); }
      } else {
        // o estúdio: a dona recebe a mensagem e comemora
        ve(estudioG, banqueta, letreiro);
        dona.colocar(DONA, [0.6, 1.3, 5]);
        if (tc > tEst + 0.35) dona.reagir('comemorando', tc - tEst); else dona.reagir('celular', tc - tEst);
        fx.fala2.em(cabecaDe(dona, 0.05), tc - tEst - 0.25, { texto: 'Bora fazer o site!' });
        fx.et.respondeu.em({ tela: [540, 400] }, tc - tEst);
        K.som('pingo', tEst, 0.6); K.som('certo', tEst + 0.3, 0.6); K.som('festa', tEst + 0.35, 0.4);
        // CÂMERA: (3) chegando · médio · frente
        K.filmar([dona, cabecaDe(dona, 0.6), [TRIPE[0], 1.6, TRIPE[2]]], 'chegando', pc(tc, tEst, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.2 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Nico de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com digitada em "digita"; o robô · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      papel('voa', 99);
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteNico, 'nico');
      papel('voa', 99);
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende o absurdo: ele enterrado no papel, suando, o dedo tremendo no Enviar gigante
      ve(comp); comp.tela.desenhar(siteNico, 'nico');
      sentado(OLHA_CAM); papel('monte', 1); dedoTremendo(0.3, 1); menino.humor('assustado'); menino.suar(0.5);
      celTela({ n: 40, letras: 1, estado: 'rascunho', pulso: 0 });
      K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.45), botao(), mais(PILHA, [-0.3, 0.5, 0.7])], 'parado', 0, { plano: 'perto', lado: -6, altura: 'olho', espacoCima: 0.26, tam: 1.05 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'quarto' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona, rival].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    papelM.visible = false; bola.visible = false; caem.forEach((m) => { m.visible = false; });
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(CEL_ESC); cel.position.set(...CEL); cel.rotation.set(0, CEL_GIRO, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
