// Personagens novos do canal, feitos em cima do K.boneco (andam, correm, reagem e fazem as caras igual ao personagem):
//   const dona = K.personagem('dona', { cores: { vestido: 0x1067f8 } })   → um boneco normal (dona.colocar, dona.reagir...)
// Tipos (K.PERSONAGENS): 'dono' (dono de empresa de terno, gravata, cabelo grisalho) · 'vendedor' (terno cinza, topete e
// pasta na mão) · 'dentista' (jaleco branco, máscara no pescoço) · 'entregador' (boné e a bag térmica nas costas) ·
// 'pizzaiolo' (avental, chapéu de cozinheiro e bigode) · 'personal' (camiseta de academia, boné virado e apito) ·
// 'cliente_bravo' (careca, camisa polo, sempre de cara fechada) · 'secretaria' (coque, headset e crachá) · 'senhorinha'
// (cabelo branco em coque, óculos, xale e bengala) · 'cabeleireira' (rabo de cavalo colorido e avental) · 'dona'
// (dona de empresa: blazer, cabelo solto e brinco). op.cores troca as cores (as mesmas chaves do K.boneco e as de cada
// tipo: cabelo, terno, camisa, gravata, chapeu, bag, avental...). op.humor: a cara de sempre (o reset volta pra ela).
// Os acessórios ficam em b.extras (b.extras.pasta, b.extras.bengala...), pra esconder ou mexer na cena.
(function () {
  const K = window.K;
  const PI = Math.PI;
  // Cores "marcadoras": o boneco base é feito com elas e as malhas dessas cores somem (cabelo do doutor, colete...)
  const SUMIR = { a: 0x010203, b: 0x020304, c: 0x030405, d: 0x040506, e: 0x050607 };
  const mesmaCor = (o, cor) => o.isMesh && o.material && o.material.color && o.material.color.equals(new THREE.Color(cor));
  function sumir(b, filtro) { b.g.traverse((o) => { if (o.isMesh && filtro(o)) o.visible = false; }); }
  const malha = (geo, cor, op) => K.malha(geo, K.mat(cor, op));
  function por(pai, m, pos, rot) { if (pos) m.position.set(...pos); if (rot) m.rotation.set(...rot); pai.add(m); return m; }

  // ---------- Peças de cabelo e roupa ----------
  function cabeloCurto(cab, cor, op = {}) {
    const g = new THREE.Group();
    const topo = malha(new THREE.SphereGeometry(0.228, 18, 10, 0, PI * 2, 0, PI * 0.52), cor);
    topo.scale.set(1.03, op.alto || 0.82, 1.06);
    por(g, topo, [0, 0.05, -0.04], [-0.22, 0, 0]);
    if (op.topete) por(g, malha(new THREE.CapsuleGeometry(0.06, 0.18, 6, 14).rotateZ(PI / 2), cor), [0.02, 0.19, 0.11], [-0.5, 0, -0.12]);
    else por(g, malha(new THREE.CapsuleGeometry(0.045, 0.22, 6, 14).rotateZ(PI / 2).scale(1, 0.7, 1.1), cor), [0.03, 0.15, 0.15], [-0.35, 0, -0.1]);
    [-1, 1].forEach((l) => por(g, malha(new THREE.SphereGeometry(0.06, 10, 8), cor), [l * 0.19, 0.02, -0.05], null).scale.set(0.6, 1.2, 1));
    cab.add(g);
    return g;
  }
  function careca(cab, cor) {
    const g = new THREE.Group();
    [-1, 1].forEach((l) => { const t = por(g, malha(new THREE.SphereGeometry(0.075, 10, 8), cor), [l * 0.19, 0.0, -0.07]); t.scale.set(0.7, 1, 1.4); });
    const nuca = por(g, malha(new THREE.SphereGeometry(0.1, 10, 8), cor), [0, -0.01, -0.17]); nuca.scale.set(1.6, 0.8, 0.7);
    cab.add(g);
    return g;
  }
  function coque(cab, cor) {
    const g = new THREE.Group();
    const topo = por(g, malha(new THREE.SphereGeometry(0.228, 18, 10, 0, PI * 2, 0, PI * 0.55), cor), [0, 0.04, -0.04], [-0.24, 0, 0]); topo.scale.set(1.04, 0.86, 1.07);
    // Franjinha de lado (a testa aparece)
    por(g, malha(new THREE.CapsuleGeometry(0.045, 0.16, 6, 14).rotateZ(PI / 2).scale(1, 0.7, 1.1), cor), [0.06, 0.16, 0.14], [-0.4, 0.2, -0.25]);
    por(g, malha(new THREE.SphereGeometry(0.1, 14, 10), cor), [0, 0.2, -0.17]);
    cab.add(g);
    return g;
  }
  function rabo(cab, cor, laco) {
    const g = coque(cab, cor);
    g.children[1].visible = false;
    const r = por(g, malha(new THREE.CapsuleGeometry(0.07, 0.26, 6, 14), cor), [0, -0.02, -0.25], [0.45, 0, 0]);
    r.scale.set(1, 1, 0.8);
    por(g, malha(new THREE.TorusGeometry(0.05, 0.02, 6, 14), laco), [0, 0.12, -0.21], [0.4 + PI / 2, 0, 0]);
    return g;
  }
  function soltoLongo(cab, cor) {
    const g = coque(cab, cor);
    g.children[1].visible = false;
    const costas = por(g, malha(new THREE.SphereGeometry(0.22, 14, 10), cor), [0, -0.1, -0.08]); costas.scale.set(1.12, 1.35, 0.8);
    [-1, 1].forEach((l) => { const m = por(g, malha(new THREE.CapsuleGeometry(0.06, 0.2, 6, 12), cor), [l * 0.19, -0.1, 0.02]); m.scale.set(0.8, 1, 0.9); });
    por(g, malha(new THREE.CapsuleGeometry(0.05, 0.22, 6, 14).rotateZ(PI / 2).scale(1, 0.7, 1.1), cor), [-0.04, 0.15, 0.15], [-0.35, 0, 0.18]);
    return g;
  }
  function oculos(cab, cor = 0x2a2a2a, escuro = false) {
    const g = new THREE.Group();
    const mat = K.mat(cor, { roughness: 0.4 });
    [-1, 1].forEach((l) => {
      por(g, new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.01, 8, 24), mat), [l * 0.077, 0.03, 0.212], [0, l * 0.2, 0]);
      if (escuro) por(g, new THREE.Mesh(new THREE.CircleGeometry(0.052, 20), new THREE.MeshBasicMaterial({ color: 0x15171c })), [l * 0.077, 0.03, 0.214], [0, l * 0.2, 0]);
      por(g, new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 0.22), mat), [l * 0.182, 0.035, 0.095], [0, -l * 0.43, 0]);
    });
    por(g, new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.04, 6).rotateZ(PI / 2), mat), [0, 0.04, 0.216]);
    cab.add(g);
    return g;
  }
  function bone(cab, cor, praTras = false) {
    const g = new THREE.Group();
    const c = por(g, malha(new THREE.SphereGeometry(0.235, 16, 8, 0, PI * 2, 0, PI * 0.5), cor), [0, 0.07, 0]); c.scale.set(1.03, 0.75, 1.05);
    por(g, malha(new THREE.CylinderGeometry(0.17, 0.17, 0.02, 16, 1, false, -PI / 2, PI), cor), [0, 0.075, 0.18]).scale.set(1, 1, 1.15);
    por(g, malha(new THREE.SphereGeometry(0.025, 8, 6), cor), [0, 0.25, 0]);
    if (praTras) g.rotation.y = PI;
    cab.add(g);
    return g;
  }
  function gravata(corpo, cor) {
    const g = new THREE.Group();
    por(g, malha(new THREE.BoxGeometry(0.06, 0.05, 0.04), cor), [0, 1.03, 0.19], [-0.5, 0, 0]);
    const lam = por(g, malha(new THREE.CylinderGeometry(0.05, 0.03, 0.32, 4), cor), [0, 0.86, 0.228], [-0.22, PI / 4, 0]);
    lam.scale.set(1, 1, 0.35);
    corpo.add(g);
    return g;
  }
  function avental(corpo, cor, alcas = true) {
    const g = new THREE.Group();
    const pano = por(g, malha(new THREE.CylinderGeometry(0.29, 0.3, 0.6, 20, 1, true, -0.9, 1.8), cor, { side: THREE.DoubleSide }), [0, 0.6, 0]);
    pano.scale.z = 0.88;
    por(g, malha(new THREE.BoxGeometry(0.2, 0.18, 0.02), cor), [0, 0.98, 0.205], [-0.35, 0, 0]);
    if (alcas) [-1, 1].forEach((l) => por(g, malha(new THREE.BoxGeometry(0.025, 0.2, 0.02), cor), [l * 0.09, 1.1, 0.12], [-0.6, 0, -l * 0.2]));
    corpo.add(g);
    return g;
  }
  function cracha(corpo, cor = 0x1067f8) {
    const g = new THREE.Group();
    por(g, malha(new THREE.BoxGeometry(0.1, 0.13, 0.012), 0xffffff), [-0.13, 0.86, 0.225], [-0.15, -0.35, 0]);
    por(g, malha(new THREE.BoxGeometry(0.1, 0.035, 0.014), cor), [-0.13, 0.905, 0.228], [-0.15, -0.35, 0]);
    corpo.add(g);
    return g;
  }
  // Na mão (b.maos[1] = mão direita da tela quando de frente)
  function naMao(b, lado, obj, pos, rot) { const m = b.maos[lado]; obj.position.set(...pos); if (rot) obj.rotation.set(...rot); m.add(obj); return obj; }

  // ---------- Bases: o boneco certo, sem o que não serve ----------
  // Adulto de calça (base 'operario' sem colete, capacete nem barba). tenis: troca a bota pelo tênis
  function baseCalca(op, cores, tenis) {
    const c = Object.assign({ colete: SUMIR.a, faixa: SUMIR.b, capacete: SUMIR.c, cabelo: SUMIR.d }, cores, op.cores || {});
    c.colete = SUMIR.a; c.faixa = SUMIR.b; c.capacete = SUMIR.c; const cab = c.cabelo; c.cabelo = SUMIR.d;
    const b = K.boneco(Object.assign({}, op, { tipo: 'operario', barba: false, cores: c }));
    sumir(b, (o) => [SUMIR.a, SUMIR.b, SUMIR.c, SUMIR.d].some((s) => mesmaCor(o, s)));
    if (tenis) sumir(b, (o) => o.geometry && o.geometry.parameters && o.geometry.parameters.radiusTop === 0.097);
    b.corCabelo = cab;
    return b;
  }
  // Terno ou jaleco (base 'doutor' sem o cabelo branco, o bigode, os óculos e o estetoscópio). curto: paletó na cintura
  function baseTerno(op, cores, curto) {
    const c = Object.assign({}, cores, op.cores || {});
    const cab = c.cabelo; c.cabelo = SUMIR.d;
    const gr = c.gravata; c.gravata = SUMIR.e;
    if (c.terno != null) c.jaleco = c.terno;
    const b = K.boneco(Object.assign({}, op, { tipo: 'doutor', cores: c }));
    sumir(b, (o) => mesmaCor(o, SUMIR.d) || mesmaCor(o, SUMIR.e) || mesmaCor(o, 0x3b2a1f) || mesmaCor(o, 0xc9ccd1) || (o.geometry && o.geometry.type === 'TubeGeometry'));
    // Sobrancelha normal (a do doutor é branca e cheia) e nariz do tamanho normal
    b.cabeca.traverse((o) => {
      if (o.isMesh && o.material && o.material.isMeshBasicMaterial && o.material.color.equals(new THREE.Color(0xd6d9dc))) { o.material.color.setHex(0x2a1a10); o.scale.set(1, 1, 1); }
      if (o.isMesh && Math.abs(o.position.z - 0.205) < 0.001 && Math.abs(o.position.y + 0.01) < 0.001) o.scale.setScalar(1);
    });
    if (curto) b.corpo.children.forEach((o) => {
      if (o.isMesh && o.geometry.type === 'LatheGeometry') { o.scale.y = 0.7; o.position.y = 0.34; }
      if (o.isMesh && mesmaCor(o, 0xdde3e2) && o.position.y < 0.5) o.position.y = 0.66;
    });
    const lapela = c.lapela ?? (c.terno != null ? new THREE.Color(c.terno).multiplyScalar(0.8).getHex() : null);
    if (lapela != null) b.corpo.traverse((o) => { if (o.isMesh && mesmaCor(o, 0xdde3e2)) o.material = K.mat(lapela); });
    b.corCabelo = cab;
    b.corGravata = gr;
    return b;
  }
  // Mulher adulta (base 'menina' sem as chuquinhas e os laços)
  function baseMulher(op, cores) {
    const c = Object.assign({}, cores, op.cores || {});
    const cab = c.cabeloMenina ?? c.cabelo; c.cabeloMenina = SUMIR.d;
    const b = K.boneco(Object.assign({}, op, { tipo: 'menina', cores: c }));
    sumir(b, (o) => mesmaCor(o, SUMIR.d) || mesmaCor(o, 0xffd23f));
    b.corCabelo = cab;
    return b;
  }

  const TIPOS = {
    dono(op) {
      const b = baseTerno(op, { terno: 0x1f2d4a, camisa: 0xf4f6f8, gravata: 0xc8372d, calca: 0x1f2d4a, sapato: 0x1e1f22, cabelo: 0x9aa0a6, pele: 0xe0a97e }, true);
      cabeloCurto(b.cabeca, b.corCabelo);
      gravata(b.corpo, b.corGravata);
      [-1, 1].forEach((l) => { const bg = por(b.cabeca, malha(new THREE.CapsuleGeometry(0.028, 0.06, 6, 12).rotateZ(PI / 2), b.corCabelo), [l * 0.045, -0.05, 0.198], [0, l * 0.35, -l * 0.25]); bg.visible = op.bigode !== false; });
      b.extras.relogio = por(b.maos[0].parent, malha(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 14), 0xd4af37, { metalness: 0.6, roughness: 0.3 }), [0, -0.2, 0]);
      return b;
    },
    vendedor(op) {
      const b = baseTerno(op, { terno: 0x8a9099, camisa: 0xffffff, gravata: 0x1067f8, calca: 0x6b7280, sapato: 0x4a2f22, cabelo: 0x3a2418, pele: 0xe6b48a }, true);
      cabeloCurto(b.cabeca, b.corCabelo, { topete: true });
      gravata(b.corpo, b.corGravata);
      const pasta = new THREE.Group();
      por(pasta, malha(new THREE.BoxGeometry(0.4, 0.3, 0.09), op.cores?.pasta ?? 0x4a2f22, { roughness: 0.5 }), [0, -0.2, 0]);
      por(pasta, malha(new THREE.TorusGeometry(0.05, 0.012, 6, 12, PI), 0x2a1a10), [0, -0.04, 0]);
      por(pasta, malha(new THREE.BoxGeometry(0.06, 0.03, 0.1), 0xd4af37, { metalness: 0.6 }), [0, -0.08, 0]);
      b.extras.pasta = naMao(b, 1, pasta, [0, 0, 0], [0, PI / 2, 0]);
      return b;
    },
    dentista(op) {
      const b = baseTerno(op, { jaleco: 0xf4f7f6, camisa: 0x8fd0ff, gravata: SUMIR.e, calca: 0x2a6fb5, sapato: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xd9a27a }, false);
      cabeloCurto(b.cabeca, b.corCabelo);
      const masc = por(b.cabeca, malha(new THREE.SphereGeometry(0.12, 14, 8, 0, PI * 2, PI * 0.35, PI * 0.4), op.cores?.mascara ?? 0x9fd8f0, { side: THREE.DoubleSide }), [0, -0.12, 0.1]);
      masc.scale.set(1.25, 1, 1.1);
      b.extras.mascara = masc;
      cracha(b.corpo, 0x2fb5a8);
      return b;
    },
    entregador(op) {
      const b = baseCalca(op, { camiseta: 0xe8352b, calca: 0x2a2e36, bota: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xb9805a }, true);
      cabeloCurto(b.cabeca, b.corCabelo);
      b.extras.bone = bone(b.cabeca, op.cores?.bone ?? 0xe8352b);
      const corBag = op.cores?.bag ?? 0xe8352b;
      const bag = new THREE.Group();
      por(bag, malha(new THREE.BoxGeometry(0.5, 0.5, 0.4), corBag, { roughness: 0.55 }), [0, 0, 0]);
      por(bag, malha(new THREE.BoxGeometry(0.52, 0.06, 0.42), 0xf4f1ea), [0, 0.22, 0]);
      const logo = K.placa('ENTREGA', { larg: 0.36, alt: 0.12, fundo: '#ffffff', cor: '#e8352b', borda: '#ffffff' });
      por(bag, logo, [0, 0.02, -0.205], [0, PI, 0]);
      bag.position.set(0, 0.92, -0.42);
      b.corpo.add(bag);
      [-1, 1].forEach((l) => por(b.corpo, malha(new THREE.BoxGeometry(0.05, 0.42, 0.03), 0x2a2e36), [l * 0.14, 0.86, 0.18], [-0.35, 0, l * 0.06]));
      b.extras.bag = bag;
      return b;
    },
    pizzaiolo(op) {
      const b = baseCalca(op, { camiseta: 0xf4f6f8, calca: 0x2a2e36, bota: 0x1e1f22, cabelo: 0x2a1a10, pele: 0xe0a97e }, true);
      cabeloCurto(b.cabeca, b.corCabelo);
      b.extras.avental = avental(b.corpo, op.cores?.avental ?? 0xc8372d);
      const ch = new THREE.Group();
      por(ch, malha(new THREE.CylinderGeometry(0.2, 0.19, 0.14, 18), 0xffffff), [0, 0.2, 0]);
      [[0, 0.36, 0, 0.17], [-0.1, 0.33, 0.04, 0.12], [0.1, 0.33, 0.04, 0.12], [0, 0.33, -0.09, 0.12]].forEach(([x, y, z, r]) => por(ch, malha(new THREE.SphereGeometry(r, 12, 10), 0xffffff), [x, y, z]));
      b.cabeca.add(ch);
      b.extras.chapeu = ch;
      [-1, 1].forEach((l) => por(b.cabeca, malha(new THREE.CapsuleGeometry(0.03, 0.07, 6, 12).rotateZ(PI / 2), b.corCabelo), [l * 0.05, -0.05, 0.198], [0, l * 0.35, -l * 0.4]));
      return b;
    },
    personal(op) {
      const b = baseCalca(op, { camiseta: 0x9be22f, calca: 0x1e1f22, bota: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xc98f62 }, true);
      cabeloCurto(b.cabeca, b.corCabelo);
      b.extras.bone = bone(b.cabeca, op.cores?.bone ?? 0x1e1f22, true);
      const cordao = por(b.corpo, malha(new THREE.TorusGeometry(0.15, 0.008, 6, 24), 0xe8352b), [0, 1.0, 0.03], [PI / 2 - 0.5, 0, 0]);
      b.extras.apito = por(b.corpo, malha(new THREE.CylinderGeometry(0.025, 0.025, 0.07, 10).rotateX(PI / 2), 0xc9ccd1, { metalness: 0.6, roughness: 0.3 }), [0, 0.88, 0.235]);
      b.extras.cordao = cordao;
      return b;
    },
    cliente_bravo(op) {
      const b = baseCalca(op, { camiseta: 0x3fb8c8, calca: 0x5a4a3a, bota: 0x4a2f22, cabelo: 0x3a2418, pele: 0xe6a07a }, true);
      careca(b.cabeca, b.corCabelo);
      b.extras.gola = por(b.corpo, malha(new THREE.TorusGeometry(0.14, 0.03, 6, 18), op.cores?.gola ?? 0xf4f6f8), [0, 1.05, 0.0], [PI / 2 - 0.25, 0, 0]);
      [-1, 1].forEach((l) => por(b.cabeca, malha(new THREE.CapsuleGeometry(0.028, 0.07, 6, 12).rotateZ(PI / 2), b.corCabelo), [l * 0.05, -0.05, 0.198], [0, l * 0.35, -l * 0.3]));
      if (!op.humor) b.humorPadrao = 'bravo';
      return b;
    },
    secretaria(op) {
      const b = baseMulher(op, { vestido: 0x2a4a7a, cabeloMenina: 0x5a3220, pele: 0xe6b48a, tenisBranco: 0x1e1f22 });
      coque(b.cabeca, b.corCabelo);
      const hs = new THREE.Group();
      por(hs, malha(new THREE.TorusGeometry(0.235, 0.014, 6, 24, PI), 0x2a2e36), [0, 0.02, 0], [0, 0, 0]);
      [-1, 1].forEach((l) => por(hs, malha(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 14).rotateZ(PI / 2), 0x2a2e36), [l * 0.225, 0.0, 0]));
      por(hs, malha(new THREE.CylinderGeometry(0.008, 0.008, 0.2, 6), 0x2a2e36), [0.17, -0.1, 0.09], [0.9, 0, 0.4]);
      por(hs, malha(new THREE.SphereGeometry(0.02, 8, 6), 0x2a2e36), [0.1, -0.14, 0.17]);
      b.cabeca.add(hs);
      b.extras.headset = hs;
      cracha(b.corpo);
      return b;
    },
    senhorinha(op) {
      const b = baseMulher(op, { vestido: 0x9a7ac8, cabeloMenina: 0xe9e9ea, pele: 0xe8b894, tenisBranco: 0x6b3f22 });
      coque(b.cabeca, b.corCabelo);
      oculos(b.cabeca, 0x6b4a8a);
      const xale = por(b.corpo, malha(new THREE.TorusGeometry(0.2, 0.06, 8, 24), op.cores?.xale ?? 0xc8372d), [0, 1.02, 0], [PI / 2 - 0.15, 0, 0]);
      xale.scale.set(1.15, 1, 1);
      b.extras.xale = xale;
      const bengala = new THREE.Group();
      por(bengala, malha(new THREE.CylinderGeometry(0.018, 0.018, 0.8, 8), 0x6b3f22), [0, -0.38, 0]);
      por(bengala, malha(new THREE.TorusGeometry(0.06, 0.018, 6, 12, PI), 0x6b3f22), [0.06, 0.02, 0]);
      b.extras.bengala = naMao(b, 1, bengala, [0, -0.02, 0.02]);
      return b;
    },
    cabeleireira(op) {
      const b = baseMulher(op, { vestido: 0x1e1f22, cabeloMenina: 0xb05ad8, pele: 0xd9a27a, tenisBranco: 0xf4f1ea });
      rabo(b.cabeca, b.corCabelo, op.cores?.laco ?? 0xff5a8a);
      b.extras.avental = avental(b.corpo, op.cores?.avental ?? 0x3a3f4a, false);
      return b;
    },
    dona(op) {
      const b = baseMulher(op, { vestido: 0xc8372d, cabeloMenina: 0x2a1a10, pele: 0xc98f62, tenisBranco: 0x1e1f22 });
      soltoLongo(b.cabeca, b.corCabelo);
      const corBlazer = op.cores?.blazer ?? 0x1e1f22;
      [-1, 1].forEach((l) => {
        const lado = por(b.corpo, malha(new THREE.SphereGeometry(0.268, 14, 10, l > 0 ? -PI * 0.08 : PI * 0.58, PI * 0.5, PI * 0.2, PI * 0.55), corBlazer, { side: THREE.DoubleSide }), [0, 0.8, 0]);
        lado.scale.set(0.92, 1.27, 0.88);
        por(b.corpo, malha(new THREE.SphereGeometry(0.07, 8, 6), corBlazer), [l * 0.24, 1.0, 0]);
        por(b.cabeca, malha(new THREE.SphereGeometry(0.022, 8, 6), 0xd4af37, { metalness: 0.7, roughness: 0.3 }), [l * 0.21, -0.07, 0.01]);
      });
      return b;
    }
  };
  const APELIDOS = { dono_de_empresa: 'dono', empresario: 'dono', chefe: 'dono', gerente: 'dono', dona_de_empresa: 'dona', empresaria: 'dona', motoboy: 'entregador', cliente: 'cliente_bravo', bravo: 'cliente_bravo', recepcionista: 'secretaria', vovo: 'senhorinha', idosa: 'senhorinha', personal_trainer: 'personal', cabeleireiro: 'cabeleireira', cozinheiro: 'pizzaiolo' };
  const normal = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]+/g, '_');

  // Personagem novo do canal: K.personagem('dono', { cores, humor }). Devolve um K.boneco normal com b.extras e b.tipoCanal
  K.personagem = function (tipo, op = {}) {
    const chave = APELIDOS[normal(tipo)] || normal(tipo);
    const fazer = TIPOS[chave];
    if (!fazer) throw new Error(`K.personagem: o tipo "${tipo}" não existe. Use um destes: ${Object.keys(TIPOS).join(', ')}`);
    const extras = {};
    // O boneco nasce aqui dentro; b.extras já existe quando o tipo monta os acessórios
    const orig = K.boneco;
    let feito = null;
    K.boneco = function (o) { const b = orig(o); b.extras = extras; feito = b; return b; };
    let b;
    try { b = fazer(op); } finally { K.boneco = orig; }
    b = b || feito;
    b.tipoCanal = chave;
    const humor = op.humor || b.humorPadrao;
    if (humor) {
      const reset = b.reset;
      b.reset = function (t) { reset(t); b.humor(humor); };
      b.humor(humor);
    }
    if (op.escala) b.g.scale.setScalar(op.escala);
    return b;
  };
  K.PERSONAGENS = Object.keys(TIPOS);
})();
