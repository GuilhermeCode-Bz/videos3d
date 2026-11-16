// Cenário 'rua_predios' (apelidos: 'entre_predios', 'calcadao', 'rua_comercial'): um calçadão comprido no meio de
// prédios altos dos dois lados, com as lojas embaixo (clínica, pizzaria, academia, salão, padaria...: os nichos do
// Mappoa), postes, árvores, bancos, gente andando e ruas com carro cruzando nas duas pontas. Pro personagem andar
// entre os prédios. O calçadão vai ao longo do eixo z (de z 40, perto, até z -50, longe); o chão fica em y = 0.
// C.rua = { de, ate }: o caminho do meio (andar com menino.irPara(C.rua.de, C.rua.ate, x, tc)). C.lojas: cada loja
// com { nome, porta, placa, lado }. C.lugares: inicio, meio, fim, esquina, telhado (o alto de um prédio, pra olhar a
// rua lá de cima) e a porta de cada loja (clinica, pizzaria, academia...). op.hora = 'noite' acende tudo.
// As câmeras pra filmar andando (K.seguir, K.drone, K.heroi, K.ombro) estão em canal/pecas/cameras.js.
(function () {
  const K = window.K;
  const PI = Math.PI;
  const V3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  const ANTES = K.cenario;
  const APELIDOS = { rua_predios: 'rua_predios', entre_predios: 'rua_predios', calcadao: 'rua_predios', rua_comercial: 'rua_predios', rua_de_lojas: 'rua_predios' };
  const normal = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]+/g, '_');

  function canvasTex(w, h, fn, rep = [1, 1]) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    fn(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(rep[0], rep[1]);
    return t;
  }
  const hex = (c) => '#' + c.toString(16).padStart(6, '0');
  function caixa(pai, tam, mat, pos, sombra = true) {
    const m = K.malha(new THREE.BoxGeometry(tam[0], tam[1], tam[2]), mat, sombra);
    m.position.set(pos[0], pos[1], pos[2]);
    pai.add(m);
    return m;
  }
  function cil(pai, rc, rb, alt, mat, pos, lados = 12) {
    const m = K.malha(new THREE.CylinderGeometry(rc, rb, alt, lados), mat);
    m.position.set(pos[0], pos[1], pos[2]);
    pai.add(m);
    return m;
  }

  // Fachada de um andar com uma janela (repete em x pelas janelas e em y pelos andares)
  function texFachada(cor, r, noite, estilo) {
    return canvasTex(128, 128, (c, w, h) => {
      c.fillStyle = hex(cor); c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(0,0,0,0.10)'; c.fillRect(0, h - 10, w, 10);
      const acesa = noite && r() < 0.55;
      const vidro = acesa ? (r() < 0.5 ? '#ffe3a1' : '#ffd27a') : noite ? '#1d2840' : '#6f9fcf';
      c.fillStyle = 'rgba(255,255,255,0.85)';
      if (estilo === 0) { c.fillRect(26, 22, 76, 74); c.fillStyle = vidro; c.fillRect(32, 28, 64, 62); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(62, 28, 4, 62); }
      else if (estilo === 1) { c.fillRect(14, 30, 100, 52); c.fillStyle = vidro; c.fillRect(19, 35, 90, 42); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(62, 35, 4, 42); c.fillStyle = 'rgba(0,0,0,0.18)'; c.fillRect(10, 86, 108, 8); }
      else { c.fillRect(38, 16, 52, 88); c.fillStyle = vidro; c.fillRect(43, 21, 42, 78); c.fillStyle = 'rgba(0,0,0,0.2)'; c.fillRect(34, 100, 60, 8); }
      if (!acesa && !noite) { c.fillStyle = 'rgba(255,255,255,0.35)'; c.beginPath(); c.moveTo(36, 30); c.lineTo(52, 30); c.lineTo(36, 50); c.fill(); }
    });
  }
  function texToldo(a, b) {
    return canvasTex(128, 32, (c, w, h) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? a : b; c.fillRect((i * w) / 8, 0, w / 8, h); } });
  }
  const texPiso = (a, b, rep) => canvasTex(256, 256, (c, w, h) => {
    c.fillStyle = a; c.fillRect(0, 0, w, h);
    c.strokeStyle = b; c.lineWidth = 3;
    for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(0, (i * h) / 4); c.lineTo(w, (i * h) / 4); c.stroke(); }
    for (let j = 0; j < 4; j++) for (let i = 0; i <= 2; i++) { const x = ((i + (j % 2) * 0.5) * w) / 2; c.beginPath(); c.moveTo(x, (j * h) / 4); c.lineTo(x, ((j + 1) * h) / 4); c.stroke(); }
  }, rep);

  const LOJAS = [
    { nome: 'CLÍNICA', id: 'clinica', fundo: '#ffffff', cor: '#1067f8', toldo: ['#1067f8', '#ffffff'] },
    { nome: 'PIZZARIA', id: 'pizzaria', fundo: '#c8372d', cor: '#ffffff', toldo: ['#c8372d', '#f4f1ea'] },
    { nome: 'ACADEMIA', id: 'academia', fundo: '#1e1f22', cor: '#f5c518', toldo: ['#1e1f22', '#f5c518'] },
    { nome: 'SALÃO', id: 'salao', fundo: '#f4c6d6', cor: '#8a2a5a', toldo: ['#d85a8a', '#ffffff'] },
    { nome: 'PADARIA', id: 'padaria', fundo: '#f5e6c4', cor: '#7a4a22', toldo: ['#b5733a', '#f5e6c4'] },
    { nome: 'FARMÁCIA', id: 'farmacia', fundo: '#2fb54a', cor: '#ffffff', toldo: ['#2fb54a', '#ffffff'] },
    { nome: 'LOJA', id: 'loja', fundo: '#8a4fd8', cor: '#ffffff', toldo: ['#8a4fd8', '#efe6ff'] },
    { nome: 'CAFÉ', id: 'cafe', fundo: '#4a2f22', cor: '#f5e6c4', toldo: ['#4a2f22', '#e9d3b0'] },
    { nome: 'MERCADO', id: 'mercado', fundo: '#f39a1e', cor: '#ffffff', toldo: ['#f39a1e', '#ffffff'] },
    { nome: 'ÓTICA', id: 'otica', fundo: '#2a3a5a', cor: '#ffffff', toldo: ['#2a3a5a', '#d9e4f5'] },
    { nome: 'PET SHOP', id: 'petshop', fundo: '#3fb8c8', cor: '#ffffff', toldo: ['#3fb8c8', '#ffffff'] },
    { nome: 'DENTISTA', id: 'dentista', fundo: '#e8f4ff', cor: '#1067f8', toldo: ['#5aa0f0', '#ffffff'] }
  ];
  const CORES_PREDIO = [0xe9d9c0, 0xc9d6e3, 0xd9b8a0, 0xf0e6d2, 0xb8c9b0, 0xe0c0c0, 0xcfc6e0, 0xd8d0c4, 0xa9bccd, 0xe6d3a8];

  // Prédio com a fachada virada pra +z (local), a frente em z = 0 e o fundo pra -z. Térreo com loja (se loja)
  function predio(C, g, r, op) {
    const { larg, andares, prof = 9, loja, noite, cor } = op;
    const p = new THREE.Group();
    const TERREO = 3.6, PE = 3;
    const alt = TERREO + andares * PE;
    const estilo = Math.floor(r() * 3);
    const tex = texFachada(cor, r, noite, estilo);
    tex.repeat.set(Math.max(1, Math.round(larg / 2.6)), andares);
    const matF = K.mat(0xffffff, { map: tex, roughness: 0.85 });
    if (noite) { matF.emissive = new THREE.Color(0xffffff); matF.emissiveMap = tex; matF.emissiveIntensity = 0.55; }
    const matTopo = K.mat(0x8a8f96);
    const mats = [matF, matF, matTopo, matTopo, matF, matF];
    const corpo = K.malha(new THREE.BoxGeometry(larg, andares * PE, prof), mats);
    corpo.position.set(0, TERREO + (andares * PE) / 2, -prof / 2);
    p.add(corpo);
    // Platibanda e a laje entre o térreo e os andares
    const corEsc = new THREE.Color(cor).multiplyScalar(0.78).getHex();
    caixa(p, [larg + 0.12, 0.5, prof + 0.12], K.mat(corEsc), [0, alt + 0.25, -prof / 2]);
    caixa(p, [larg + 0.2, 0.3, 0.5], K.mat(0xf2efe8), [0, TERREO, 0.1]);
    // Térreo
    const matT = K.mat(new THREE.Color(cor).multiplyScalar(0.62).getHex());
    caixa(p, [larg, TERREO, prof], matT, [0, TERREO / 2, -prof / 2]);
    const info = { alt, frente: 0 };
    if (loja) {
      const vidro = K.mat(noite ? 0xffe2a8 : 0x9cc8ea, { roughness: 0.15, metalness: 0.1, emissive: noite ? 0xffc870 : 0x203040, emissiveIntensity: noite ? 0.8 : 0.15 });
      const lv = larg - 2.2;
      caixa(p, [lv, 2.1, 0.06], vidro, [-0.8, 1.35, 0.03], false);
      caixa(p, [lv + 0.16, 0.1, 0.14], K.mat(0x3a3f4a), [-0.8, 0.28, 0.05]);
      // Porta
      caixa(p, [1.1, 2.4, 0.06], K.mat(0x3a3f4a), [larg / 2 - 0.9, 1.2, 0.03], false);
      caixa(p, [0.86, 2.1, 0.07], vidro, [larg / 2 - 0.9, 1.15, 0.04], false);
      // Toldo inclinado
      const toldo = K.malha(new THREE.BoxGeometry(larg - 0.3, 0.08, 1.4), K.mat(0xffffff, { map: texToldo(loja.toldo[0], loja.toldo[1]) }));
      toldo.position.set(0, 2.85, 0.6);
      toldo.rotation.x = 0.32;
      p.add(toldo);
      caixa(p, [larg - 0.3, 0.22, 0.04], K.mat(new THREE.Color(loja.toldo[0]).getHex()), [0, 2.6, 1.27], false);
      // Placa com o nome
      const placa = K.placa(loja.nome, { larg: Math.min(larg - 0.6, 3.4), alt: 0.62, fundo: loja.fundo, cor: loja.cor, borda: loja.cor });
      placa.position.set(0, 3.25, 0.12);
      if (noite) { placa.material.emissive = new THREE.Color(0xffffff); placa.material.emissiveMap = placa.material.map; placa.material.emissiveIntensity = 0.7; }
      p.add(placa);
      // Placa de bandeira (perpendicular à fachada)
      const band = K.placa(loja.nome, { larg: 1.1, alt: 0.42, fundo: loja.fundo, cor: loja.cor, borda: loja.cor });
      band.position.set(larg / 2 - 0.25, 4.6, 0.7);
      band.rotation.y = PI / 2;
      const bandTras = band.clone();
      bandTras.rotation.y = -PI / 2;
      bandTras.position.x -= 0.01;
      p.add(band, bandTras);
      caixa(p, [0.05, 0.05, 0.6], K.mat(0x3a3f4a), [larg / 2 - 0.25, 4.88, 0.35], false);
      // Vasinho na porta
      const vaso = cil(p, 0.22, 0.17, 0.42, K.mat(0xb9b3a8), [larg / 2 - 1.75, 0.21, 0.35]);
      [0, 1, 2].forEach((k) => { const f = K.malha(new THREE.IcosahedronGeometry(0.17, 0), K.mat(k ? 0x3f8a35 : 0x4f9a3a)); f.position.set(Math.sin(k * 2) * 0.1, 0.32 + k * 0.06, Math.cos(k * 2) * 0.1); vaso.add(f); });
      info.loja = loja; info.placa = placa; info.porta = [larg / 2 - 0.9, 0, 0.8];
    }
    g.add(p);
    return { g: p, info };
  }

  function poste(g, pos, giro, noite, halos) {
    const p = new THREE.Group();
    p.position.set(...pos);
    p.rotation.y = giro;
    const mat = K.mat(0x2f3540, { metalness: 0.3, roughness: 0.5 });
    cil(p, 0.07, 0.1, 4.6, mat, [0, 2.3, 0], 8);
    caixa(p, [0.06, 0.06, 1.1], mat, [0, 4.55, 0.5]);
    const lamp = caixa(p, [0.36, 0.14, 0.5], K.mat(noite ? 0xfff2c4 : 0xe9e4d6, { emissive: 0xffd88a, emissiveIntensity: noite ? 1.4 : 0 }), [0, 4.45, 1.0], false);
    g.add(p);
    if (noite) halos.push(lamp);
  }
  function arvore(g, pos, s, r) {
    const a = new THREE.Group();
    a.position.set(...pos);
    caixa(a, [1.3, 0.45, 1.3], K.mat(0x9a948a), [0, 0.22, 0]);
    caixa(a, [1.1, 0.06, 1.1], K.mat(0x5a4632), [0, 0.46, 0], false);
    cil(a, 0.09 * s, 0.13 * s, 2.2 * s, K.mat(0x6b4a2f), [0, 0.45 + 1.1 * s, 0], 8);
    for (let k = 0; k < 5; k++) {
      const m = K.malha(new THREE.IcosahedronGeometry((0.65 + r() * 0.3) * s, 1), K.mat([0x3f8a35, 0x4f9a3a, 0x5aa845][k % 3]));
      m.position.set((r() - 0.5) * 0.9 * s, (2.5 + r() * 0.8) * s, (r() - 0.5) * 0.9 * s);
      a.add(m);
    }
    g.add(a);
    K.vivo((t) => { a.rotation.z = Math.sin(t * 0.9 + pos[2]) * 0.015; });
  }
  function banco(g, pos, giro) {
    const b = new THREE.Group();
    b.position.set(...pos);
    b.rotation.y = giro;
    const mad = K.mat(0x8b5b35), fe = K.mat(0x3b4048);
    caixa(b, [1.8, 0.08, 0.5], mad, [0, 0.48, 0]);
    caixa(b, [1.8, 0.36, 0.06], mad, [0, 0.76, -0.24]);
    [-0.75, 0.75].forEach((x) => caixa(b, [0.08, 0.48, 0.45], fe, [x, 0.24, 0]));
    g.add(b);
  }
  function figurante(g, op) {
    const b = K.boneco(op);
    const i = K.bonecos.indexOf(b);
    if (i >= 0) K.bonecos.splice(i, 1);
    K.semNome(b.g);
    g.add(b.g);
    return b;
  }

  function ruaPredios(C, g, op) {
    const r = K.rand(op.seed || 31);
    const noite = C.noite;
    const Z0 = 42, Z1 = -52, LARG = 12, X = LARG / 2;
    C.ceu = 'dia';
    C.neblina = [70, 220, 520];
    C.caixaSombra = 22;
    // Chão: calçadão de pedra, faixa de piso diferente no meio e as calçadas encostadas nos prédios
    const comp = Z0 - Z1;
    const piso = K.malha(new THREE.PlaneGeometry(LARG, comp), K.mat(0xffffff, { map: texPiso('#ddd6c8', '#c9c1b2', [LARG / 3, comp / 3]), roughness: 0.95 }), false);
    piso.rotation.x = -PI / 2;
    piso.position.set(0, 0, (Z0 + Z1) / 2);
    piso.castShadow = false; piso.receiveShadow = true;
    g.add(piso);
    const meio = K.malha(new THREE.PlaneGeometry(2.4, comp), K.mat(0xffffff, { map: texPiso('#c9b9a0', '#b5a68c', [1, comp / 2.4]), roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -1 }), false);
    meio.rotation.x = -PI / 2;
    meio.position.set(0, 0.003, (Z0 + Z1) / 2);
    meio.castShadow = false; meio.receiveShadow = true;
    g.add(meio);
    // Ruas que cruzam nas duas pontas, com faixa de pedestre
    const asfalto = K.mat(0x3d4147, { roughness: 0.95 });
    const cruzamentos = [Z1 - 4.5, Z0 + 4.5];
    cruzamentos.forEach((z) => {
      caixa(g, [200, 0.04, 9], asfalto, [0, 0.0, z], false).receiveShadow = true;
      for (let x = -100; x < 100; x += 6) caixa(g, [3, 0.012, 0.18], K.mat(0xf5c518), [x, 0.03, z], false);
      for (let k = -5; k <= 5; k++) caixa(g, [0.6, 0.012, 3.2], K.mat(0xf4f4f0), [k * 1.1, 0.03, z + (z < 0 ? 2.6 : -2.6)], false);
    });
    // Prédios dos dois lados (lado -1 = esquerda de quem olha pro fundo, fachada virada pra +x)
    const lojas = [];
    let iLoja = 0;
    const predios = [];
    [-1, 1].forEach((lado) => {
      let z = Z0;
      while (z > Z1 + 2) {
        const larg = Math.min(z - Z1, 5 + Math.floor(r() * 3));
        if (larg < 3) break;
        const temLoja = r() < 0.85;
        const loja = temLoja ? LOJAS[iLoja++ % LOJAS.length] : null;
        const andares = 3 + Math.floor(r() * 6);
        const pr = predio(C, g, r, { larg, andares, loja, noite, cor: CORES_PREDIO[Math.floor(r() * CORES_PREDIO.length)] });
        const zc = z - larg / 2;
        pr.g.position.set(lado * X, 0, zc);
        pr.g.rotation.y = lado < 0 ? PI / 2 : -PI / 2;
        predios.push({ lado, zc, larg, alt: pr.info.alt, g: pr.g });
        if (loja) {
          pr.g.updateMatrixWorld(true);
          const porta = V3(pr.info.porta).applyMatrix4(pr.g.matrixWorld).toArray();
          const placa = pr.info.placa.getWorldPosition(new THREE.Vector3()).toArray();
          lojas.push({ nome: loja.nome, id: loja.id, lado, porta, placa, g: pr.g });
          if (!C.objetos['loja_' + loja.id]) C.objetos['loja_' + loja.id] = pr.g;
          if (!C.lugares[loja.id]) C.lugares[loja.id] = porta;
        }
        z -= larg;
      }
      K.obstaculos.push(new THREE.Box3(V3([lado < 0 ? -X - 12 : X - 0.05, 0, Z1 - 1]), V3([lado < 0 ? -X + 0.05 : X + 12, 60, Z0 + 1])));
    });
    // Prédios que fecham as duas pontas (do outro lado das ruas) e os altos lá atrás
    [[Z1 - 9.5, 0], [Z0 + 9.5, PI]].forEach(([z, giro]) => {
      for (let x = -30; x < 30; x += 7) {
        const pr = predio(C, g, r, { larg: 7, andares: 4 + Math.floor(r() * 5), loja: r() < 0.6 ? LOJAS[iLoja++ % LOJAS.length] : null, noite, cor: CORES_PREDIO[Math.floor(r() * CORES_PREDIO.length)] });
        pr.g.position.set(x + 3.5, 0, z);
        pr.g.rotation.y = giro;
      }
      K.obstaculos.push(new THREE.Box3(V3([-40, 0, Math.min(z, z + (giro ? 12 : -12))]), V3([40, 60, Math.max(z, z + (giro ? 12 : -12))])));
    });
    [[-24, -80, 34, 8, 0xc5cfd8], [-6, -90, 44, 9, 0xa9c4e0], [14, -84, 30, 8, 0xd9d2c5], [30, -92, 40, 9, 0xe0c7a8], [-30, 85, 30, 8, 0xc9d6c2], [10, 90, 40, 9, 0xd4c9b8]].forEach(([x, z, and, l, cor]) => {
      const p = K.predio(and, l, l, cor);
      g.add(p.g);
      p.g.position.set(x, 0, z);
      p.g.scale.setScalar(1.6);
      if (noite) p.g.children.forEach((c) => { if (c.isInstancedMesh) c.material = K.mat(0xffe6a8, { emissive: 0xffd27a, emissiveIntensity: 0.9 }); });
    });
    // Postes, árvores, bancos, lixeiras e floreiras ao longo do calçadão
    const halos = [];
    // O poste nunca fica na frente da placa de uma loja: vai pro lado até sair
    const livre = (lado, z) => {
      for (let k = 0; k < 12; k++) {
        const zz = z - k * 0.5;
        if (!lojas.some((l) => l.lado === lado && Math.abs(l.placa[2] - zz) < 2.4)) return zz;
      }
      return z;
    };
    for (let z = Z0 - 4; z > Z1 + 2; z -= 11) {
      poste(g, [-X + 0.8, 0, livre(-1, z)], PI / 2, noite, halos);
      poste(g, [X - 0.8, 0, livre(1, z - 5.5)], -PI / 2, noite, halos);
    }
    for (let z = Z0 - 9; z > Z1 + 4; z -= 14) {
      arvore(g, [-2.6, 0, z], 1, r);
      arvore(g, [2.6, 0, z - 7], 1, r);
      banco(g, [-2.6, 0, z - 2.2], PI / 2);
      banco(g, [2.6, 0, z - 9.2], -PI / 2);
    }
    for (let z = Z0 - 13; z > Z1 + 2; z -= 17) {
      cil(g, 0.26, 0.22, 0.8, K.mat(0x2f9e4f), [-X + 0.5, 0.4, z]);
      cil(g, 0.26, 0.22, 0.8, K.mat(0x2f9e4f), [X - 0.5, 0.4, z - 8]);
    }
    if (noite) halos.forEach((l) => { const h = K.halo(0xffd88a, 2.2); l.updateMatrixWorld(true); h.position.copy(l.getWorldPosition(new THREE.Vector3())); g.add(h); });
    // Gente andando perto das lojas (figurantes, longe do meio, onde anda o personagem)
    const CORES = [0x8a4fd8, 0xe8352b, 0x2fb54a, 0xf39a1e, 0x3fb8c8, 0x5a6a7a];
    const andantes = [0, 1, 2, 3, 4, 5].map((i) => figurante(g, i % 3 === 1 ? { tipo: 'menina', cores: { vestido: CORES[i] } } : { cores: { camiseta: CORES[i], cabelo: [0x2a1a10, 0x7a4a22, 0x1e1e1e][i % 3] } }));
    K.vivo((t) => andantes.forEach((b, i) => {
      b.reset(t);
      const L = Z0 - Z1 - 6, dir = i % 2 ? -1 : 1;
      const d = (((t * (0.95 + (i % 3) * 0.12) + i * 13.7) % L) + L) % L;
      const z = dir > 0 ? Z1 + 3 + d : Z0 - 3 - d;
      const x = (i < 3 ? -1 : 1) * (X - 2 - (i % 2) * 0.7);
      b.colocar([x, 0, z], dir > 0 ? 0 : PI);
      b.andar(t, 0.9);
    }));
    // Carros cruzando nas duas ruas
    const carros = [];
    [0xe8352b, 0x2f7fe0, 0xf5f5f5, 0xf5c518, 0x3a3f4a, 0x2fb54a].forEach((cor, i) => {
      const car = K.carro(cor);
      g.add(car);
      car.scale.setScalar(1.35);
      carros.push({ car, z: cruzamentos[i % 2] + (i % 4 < 2 ? -2 : 2), dir: i % 4 < 2 ? 1 : -1, fase: i * 41, vel: 8 + (i % 3) });
    });
    K.vivo((t) => carros.forEach(({ car, z, dir, fase, vel }) => {
      const x = (((t * vel + fase) % 160) + 160) % 160 - 80;
      car.position.set(dir * x, 0.03, z);
      car.rotation.y = dir > 0 ? 0 : PI;
    }));
    C.objetos.carros = carros.map((c) => c.car);
    // Um prédio da direita, perto do meio, com o telhado liberado (o personagem lá em cima olhando a rua)
    const alvoTeto = predios.filter((p) => p.lado > 0).sort((a, b) => Math.abs(a.zc + 8) - Math.abs(b.zc + 8))[0];
    if (alvoTeto) {
      const h = alvoTeto.alt + 0.5;
      caixa(g, [6, 0.02, alvoTeto.larg - 0.3], K.mat(0x9aa0a6), [X + 4.5, h + 0.01, alvoTeto.zc], false).receiveShadow = true;
      caixa(g, [1.6, 1.2, 1.6], K.mat(0x8a8f96), [X + 6.5, h + 0.6, alvoTeto.zc - 1]);
      const caixaDagua = cil(g, 0.7, 0.7, 1.2, K.mat(0x3a8fe0), [X + 7.5, h + 0.6, alvoTeto.zc + 1], 16);
      caixaDagua.castShadow = true;
      C.lugares.telhado = [X + 0.45, h, alvoTeto.zc];
    }
    C.lojas = lojas;
    C.rua = { de: [0.9, 0, Z0 - 6], ate: [0.9, 0, Z1 + 8] };
    C.centro = [0, 0, 0];
    C.personagem = [0.9, 0, 0.5];
    C.esquerda = [-1.4, 0, 0.3];
    C.direita = [2.4, 0, 0.3];
    C.entrada = [0.9, 0, 12];
    C.fundo = [0, 6, Z1 - 9.5];
    Object.assign(C.lugares, { inicio: C.rua.de, meio: [0.9, 0, -5], fim: C.rua.ate, esquina: [0, 0, Z1 - 1] });
    C.vista = { pos: [0.4, 3.2, 26], alvo: [0, 4.5, -30] };
  }

  K.cenario = function (nome, op = {}) {
    const chave = APELIDOS[normal(nome)];
    if (!chave) return ANTES(nome, op);
    const g = new THREE.Group();
    g.name = 'cenario-' + chave;
    K.scene.add(g);
    const C = {
      nome: chave, grupo: g, noite: op.hora === 'noite', hora: op.hora || 'dia', centro: [0, 0, 0], personagem: [1.6, 0, 0.9], entrada: [-3, 0, 4.5],
      esquerda: [-2.6, 0, 0.4], direita: [2.9, 0, 0.3], fundo: [0, 3, -12], lugares: {}, objetos: {}, ceu: 'dia', neblina: [60, 220, 600], caixaSombra: 16,
      vista: { pos: [2.5, 2.2, 11], alvo: [0, 1.8, -8] }
    };
    ruaPredios(C, g, op);
    Object.entries(C.objetos).forEach(([n, o]) => (Array.isArray(o) ? o : [o]).forEach((x) => { if (x && (x.isObject3D || (x.g && x.g.isObject3D))) K.nomear(n, x); }));
    if (op.hora === 'tarde') C.ceu = [C.ceu, 'tarde', 0.85];
    else if (op.hora === 'noite') C.ceu = ['noite', 'tarde', 0.28];
    if (op.ceu) C.ceu = op.ceu;
    K.vivo(() => { if (Array.isArray(C.ceu)) K.ceu(...C.ceu); else K.ceu(C.ceu); K.neblina(...C.neblina); K.caixaSombra(C.caixaSombra); });
    C.lugares = Object.assign({ centro: C.centro, personagem: C.personagem, entrada: C.entrada, esquerda: C.esquerda, direita: C.direita, fundo: C.fundo }, C.lugares);
    K.cenarioAtual = C;
    return C;
  };
  K.CENARIOS_RUA = ['rua_predios'];
})();
