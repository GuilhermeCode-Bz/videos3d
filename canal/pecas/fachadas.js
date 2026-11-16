// Cenário 'fachada': a frente de uma loja vista da rua, com a porta que abre e o lado de dentro aparecendo pela
// vitrine, pro personagem chegar, abrir a porta e entrar (e o vídeo cortar pro cenário de dentro). op.loja escolhe qual:
//   'clinica' (Clínica Sorriso → por dentro: 'clinica_odonto') · 'academia' (Academia Treino → 'academia') · 'pizzaria'
//   (→ 'pizzaria') · 'salao' (Salão Bella → 'salao_beleza') · 'loja' (Vento Sul, roupas → 'loja_roupas')
// Apelidos: K.cenario('fachada_clinica'), 'fachada_academia'... op.hora = 'noite' acende a vitrine e a placa.
// A frente da loja fica em z = 0, virada pra +z; a calçada vai até z 4,6 e a rua passa na frente (carros). Chão em y = 0.
// C.porta.abrir(k) (0 fechada, 1 aberta) ou C.porta.abrirEm(tempo, dur) (abre com o sino 'ding'; tempo desde que
// começou). C.lugares: porta (na frente da porta, do lado de fora), dentro (passou da porta), vitrine, placa, calcada,
// rua, chegada (de onde ele vem andando pela calçada). op.fechado: a plaquinha da porta vira FECHADO. C.objetos: fachada, placa, porta, vitrine (pro "mostra").
(function () {
  const K = window.K;
  const PI = Math.PI;
  const V3 = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  const ANTES = K.cenario;
  const normal = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]+/g, '_');

  const LOJAS = {
    clinica: { nome: 'CLÍNICA SORRISO', curto: 'CLÍNICA', parede: 0xf4f7f9, faixa: 0x2fb5a6, placaFundo: '#ffffff', placaCor: '#2fb5a6', toldo: ['#2fb5a6', '#ffffff'], piso: 0xecf1f5, dentro: 0xd6f1ec, cavalete: 'AVALIAÇÃO\nGRÁTIS', icone: 'dente', vitrine: [['cadeira_dentista', [-2.4, 0, -2.2], PI / 2 + 0.3], ['planta', [-4.2, 0, -1.2]], ['dente', [-0.9, 1.6, -4.3]], ['balcao', [2.2, 0, -3.4], 0, { l: 2.2, faixa: 0x2fb5a6 }]], interior: 'clinica_odonto' },
    academia: { nome: 'ACADEMIA TREINO', curto: 'ACADEMIA', parede: 0x2a2e36, faixa: 0xffb020, placaFundo: '#1e1f22', placaCor: '#ffb020', toldo: ['#1e1f22', '#ffb020'], piso: 0x34383f, dentro: 0x6b7585, cavalete: '1ª AULA\nGRÁTIS', icone: 'haltere', vitrine: [['esteira', [-3.4, 0, -2.4], PI], ['esteira', [-1.6, 0, -2.4], PI], ['banco_academia', [2.6, 0, -2.8], PI / 2]], interior: 'academia' },
    pizzaria: { nome: 'PIZZARIA', curto: 'PIZZA', parede: 0xf0dfc8, faixa: 0xc8372d, placaFundo: '#c8372d', placaCor: '#ffffff', toldo: ['#c8372d', '#f4f1ea'], piso: 0xf1ede4, dentro: 0xf0dfc8, cavalete: 'PIZZA\nR$ 39,90', icone: 'pizza', vitrine: [['forno_pizza', [-2.8, 0, -3.6]], ['mesa_redonda', [2.4, 0, -2.4]], ['cadeira', [3.2, 0, -2.4], -PI / 2]], interior: 'pizzaria', mesasFora: true },
    salao: { nome: 'SALÃO BELLA', curto: 'SALÃO', parede: 0xfbe3ea, faixa: 0xe8537a, placaFundo: '#ffffff', placaCor: '#e8537a', toldo: ['#e8537a', '#ffffff'], piso: 0xfbf7f4, dentro: 0xf8d9e3, cavalete: 'ESCOVA\nHOJE', icone: 'tesoura', vitrine: [['espelho_salao', [-2.6, 1.85, -4.4]], ['cadeira_salao', [-2.6, 0, -3.2], PI], ['planta', [2.2, 0, -2.6]]], interior: 'salao_beleza' },
    loja: { nome: 'VENTO SUL', curto: 'LOJA', parede: 0xf5ece4, faixa: 0x2a2e33, placaFundo: '#2a2e33', placaCor: '#ffffff', toldo: ['#2a2e33', '#f5ece4'], piso: 0xd7bd97, dentro: 0xf5ece4, cavalete: 'LIQUIDA\n50% OFF', icone: 'sacola', vitrine: [['manequim', [-3.2, 0, -1.0], 0.3], ['manequim', [-1.8, 0, -1.0], -0.3], ['arara_roupas', [2.6, 0, -3.0]]], interior: 'loja_roupas' }
  };
  const APELIDOS = { fachada: null, fachada_clinica: 'clinica', fachada_dentista: 'clinica', fachada_academia: 'academia', fachada_pizzaria: 'pizzaria', fachada_salao: 'salao', fachada_loja: 'loja', fachada_loja_roupas: 'loja', frente_da_loja: null };
  const ALIAS_LOJA = { clinica_odonto: 'clinica', dentista: 'clinica', salao_beleza: 'salao', loja_roupas: 'loja', roupas: 'loja' };

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
    m.position.set(...pos);
    pai.add(m);
    return m;
  }
  function janelas(cor, noite, r, rep) {
    return canvasTex(128, 128, (c, w, h) => {
      c.fillStyle = hex(cor); c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(26, 22, 76, 74);
      c.fillStyle = noite && r() < 0.6 ? '#ffd98a' : noite ? '#1d2840' : '#6f9fcf'; c.fillRect(32, 28, 64, 62);
      c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(62, 28, 4, 62);
      c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(0, h - 8, w, 8);
    }, rep);
  }
  function m3d(pai, nome, pos, giro, op) {
    if (!K.m3d) return null;
    try {
      const m = K.m3d(nome, op || {});
      m.position.set(...pos);
      m.rotation.y = giro || 0;
      pai.add(m);
      return m;
    } catch (e) { return null; }
  }

  function fachada(C, g, op) {
    const id = ALIAS_LOJA[normal(op.loja || 'clinica')] || normal(op.loja || 'clinica');
    const L = LOJAS[id] || LOJAS.clinica;
    const noite = C.noite;
    const r = K.rand(op.seed || 11);
    C.ceu = 'dia';
    C.neblina = [60, 200, 500];
    C.caixaSombra = 16;
    C.loja = { id: LOJAS[id] ? id : 'clinica', nome: L.nome, interior: L.interior };
    const LARG = 10, ALT_T = 4.2, PROF = 7;
    const DX = 1.6, PW = 1.3, PH = 2.55;           // a porta: centro em x 1,6
    // ---- Chão: calçada, meio-fio, rua e a calçada do outro lado
    const calcada = canvasTex(256, 256, (c, w, h) => {
      c.fillStyle = '#ddd6c8'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c9c1b2'; c.lineWidth = 3;
      for (let i = 0; i <= 4; i++) { c.beginPath(); c.moveTo(0, (i * h) / 4); c.lineTo(w, (i * h) / 4); c.stroke(); c.beginPath(); c.moveTo((i * w) / 4, 0); c.lineTo((i * w) / 4, h); c.stroke(); }
    }, [30, 2]);
    const piso = K.malha(new THREE.PlaneGeometry(120, 4.6), K.mat(0xffffff, { map: calcada, roughness: 0.95 }), false);
    piso.rotation.x = -PI / 2; piso.position.set(0, 0, 2.3); piso.castShadow = false; piso.receiveShadow = true; g.add(piso);
    caixa(g, [120, 0.16, 0.3], K.mat(0xb0aaa0), [0, 0.0, 4.75], false);
    const asf = caixa(g, [120, 0.02, 8], K.mat(0x3d4147, { roughness: 0.95 }), [0, -0.02, 8.9], false); asf.receiveShadow = true;
    for (let x = -60; x < 60; x += 6) caixa(g, [3, 0.012, 0.18], K.mat(0xf5c518), [x, 0.0, 8.9], false);
    const piso2 = K.malha(new THREE.PlaneGeometry(120, 5), K.mat(0xffffff, { map: calcada, roughness: 0.95 }), false);
    piso2.rotation.x = -PI / 2; piso2.position.set(0, 0.0, 15.4); piso2.receiveShadow = true; g.add(piso2);
    // ---- A loja: térreo com vitrine e porta, andares em cima
    const loja = new THREE.Group();
    g.add(loja);
    const matP = K.mat(L.parede, { roughness: 0.8 });
    const matFaixa = K.mat(L.faixa, { roughness: 0.6 });
    const xa = -LARG / 2, vitrineL = [xa + 0.4, DX - PW / 2 - 0.35];   // vão da vitrine grande (de x a x)
    const vitrineR = [DX + PW / 2 + 0.35, LARG / 2 - 0.4];
    // Parede da frente em pedaços (deixa os vãos da vitrine e da porta)
    const yv0 = 0.55, yv1 = 3.0;
    const frente = (x0, x1, y0, y1) => caixa(loja, [x1 - x0, y1 - y0, 0.25], matP, [(x0 + x1) / 2, (y0 + y1) / 2, -0.125]);
    frente(xa, vitrineL[0], 0, ALT_T);
    frente(vitrineL[1], DX - PW / 2, 0, ALT_T);
    frente(DX + PW / 2, vitrineR[0], 0, ALT_T);
    frente(vitrineR[1], LARG / 2, 0, ALT_T);
    [vitrineL, vitrineR].forEach(([x0, x1]) => { frente(x0, x1, 0, yv0); frente(x0, x1, yv1, ALT_T); });
    frente(DX - PW / 2, DX + PW / 2, PH, ALT_T);
    caixa(loja, [LARG + 0.1, 0.18, 0.4], matFaixa, [0, 0.09, 0.05]);
    // Vidros (meio transparentes: o lado de dentro aparece)
    const matVidro = new THREE.MeshStandardMaterial({ color: noite ? 0xffe6b0 : 0xbfe0f5, transparent: true, opacity: noite ? 0.15 : 0.18, roughness: 0.05, metalness: 0.2, depthWrite: false });
    const vitrines = [vitrineL, vitrineR].map(([x0, x1]) => {
      const v = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, yv1 - yv0), matVidro);
      v.position.set((x0 + x1) / 2, (yv0 + yv1) / 2, -0.05);
      v.renderOrder = 4;
      loja.add(v);
      caixa(loja, [x1 - x0 + 0.1, 0.08, 0.12], K.mat(0x3a3f4a), [(x0 + x1) / 2, yv0, 0.0]);
      caixa(loja, [x1 - x0 + 0.1, 0.08, 0.12], K.mat(0x3a3f4a), [(x0 + x1) / 2, yv1, 0.0]);
      caixa(loja, [0.06, yv1 - yv0, 0.1], K.mat(0x3a3f4a), [(x0 + x1) / 2, (yv0 + yv1) / 2, 0.0]);
      return v;
    });
    // Nome pintado no vidro da vitrine grande
    const adesivo = K.placa(L.curto, { larg: 1.8, alt: 0.4, fundo: 'rgba(0,0,0,0)', cor: L.placaCor, borda: 'rgba(0,0,0,0)' });
    adesivo.material.transparent = true;
    adesivo.position.set((vitrineL[0] + vitrineL[1]) / 2, 2.6, -0.03);
    loja.add(adesivo);
    // Porta de vidro com moldura, que abre pra dentro (dobradiça do lado esquerdo)
    const porta = new THREE.Group();
    porta.position.set(DX - PW / 2, 0, -0.08);
    loja.add(porta);
    const folha = new THREE.Group();
    folha.position.x = PW / 2;
    porta.add(folha);
    const matMold = K.mat(0x3a3f4a, { metalness: 0.3, roughness: 0.4 });
    caixa(folha, [PW, 0.12, 0.06], matMold, [0, 0.06, 0]);
    caixa(folha, [PW, 0.12, 0.06], matMold, [0, PH - 0.06, 0]);
    caixa(folha, [0.1, PH, 0.06], matMold, [-PW / 2 + 0.05, PH / 2, 0]);
    caixa(folha, [0.1, PH, 0.06], matMold, [PW / 2 - 0.05, PH / 2, 0]);
    const vidroPorta = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.2, PH - 0.24), matVidro);
    vidroPorta.position.set(0, PH / 2, 0);
    vidroPorta.renderOrder = 4;
    folha.add(vidroPorta);
    caixa(folha, [0.05, 0.6, 0.05], K.mat(0xc9ccd1, { metalness: 0.7, roughness: 0.25 }), [PW / 2 - 0.22, 1.1, 0.07]);
    const aberto = K.placa(op.fechado ? 'FECHADO' : 'ABERTO', { larg: 0.5, alt: 0.2, fundo: op.fechado ? '#e8352b' : '#2fb54a', cor: '#ffffff', borda: '#ffffff' });
    aberto.position.set(0, 1.75, 0.04);
    folha.add(aberto);
    caixa(loja, [PW + 0.2, 0.12, 0.14], matMold, [DX, PH + 0.06, 0.0]);
    // Tapetinho de boas-vindas
    caixa(g, [1.2, 0.02, 0.7], K.mat(L.faixa), [DX, 0.01, 0.5], false);
    // ---- Por dentro: a sala (paredes viradas pra dentro), luz e os modelos que aparecem pela vitrine
    const dentro = new THREE.Group();
    loja.add(dentro);
    const matDentro = K.mat(L.dentro, { side: THREE.BackSide, roughness: 0.9 });
    const sala = K.malha(new THREE.BoxGeometry(LARG - 0.3, ALT_T - 0.05, PROF), matDentro, false);
    sala.position.set(0, ALT_T / 2, -PROF / 2 - 0.26);
    sala.castShadow = false;
    dentro.add(sala);
    const pisoD = K.malha(new THREE.PlaneGeometry(LARG - 0.3, PROF), K.mat(L.piso, { roughness: 0.6 }), false);
    pisoD.rotation.x = -PI / 2; pisoD.position.set(0, 0.01, -PROF / 2 - 0.26); dentro.add(pisoD);
    for (let k = 0; k < 3; k++) caixa(dentro, [1.6, 0.06, 0.4], K.mat(0xffffff, { emissive: 0xfff4d8, emissiveIntensity: 1 }), [-3 + k * 3, ALT_T - 0.1, -3], false);
    const luzDentro = new THREE.PointLight(0xfff1d6, noite ? 26 : 22, 14, 1.2);
    luzDentro.position.set(0, ALT_T - 0.6, -3);
    dentro.add(luzDentro);
    L.vitrine.forEach(([nome, pos, giro, o]) => m3d(dentro, nome, pos, giro, o));
    // ---- Fachada de cima: andares com janelas, platibanda, toldo e a placa grande
    const ANDARES = 2;
    const texJ = janelas(new THREE.Color(L.parede).multiplyScalar(0.92).getHex(), noite, r, [4, ANDARES]);
    const matJ = K.mat(0xffffff, { map: texJ, roughness: 0.85 });
    if (noite) { matJ.emissive = new THREE.Color(0xffffff); matJ.emissiveMap = texJ; matJ.emissiveIntensity = 0.45; }
    caixa(loja, [LARG, ANDARES * 3, PROF], [matJ, matJ, K.mat(0x8a8f96), matP, matJ, matJ], [0, ALT_T + ANDARES * 1.5, -PROF / 2]);
    caixa(loja, [LARG + 0.15, 0.45, PROF + 0.15], K.mat(new THREE.Color(L.parede).multiplyScalar(0.8).getHex()), [0, ALT_T + ANDARES * 3 + 0.22, -PROF / 2]);
    // Laterais e fundo do térreo (fechados)
    caixa(loja, [0.25, ALT_T, PROF], matP, [-LARG / 2 + 0.125, ALT_T / 2, -PROF / 2]);
    caixa(loja, [0.25, ALT_T, PROF], matP, [LARG / 2 - 0.125, ALT_T / 2, -PROF / 2]);
    // Faixa da placa e a placa grande com o nome
    caixa(loja, [LARG + 0.1, 0.9, 0.3], matFaixa, [0, 3.55, 0.05]);
    const placa = K.placa(L.nome, { larg: 5.8, alt: 0.72, fundo: L.placaFundo, cor: L.placaCor, borda: L.placaCor });
    placa.position.set(0, 3.55, 0.22);
    if (noite) { placa.material.emissive = new THREE.Color(0xffffff); placa.material.emissiveMap = placa.material.map; placa.material.emissiveIntensity = 0.8; }
    loja.add(placa);
    const ic = m3d(loja, L.icone, [-3.9, 3.25, 0.4], 0);
    if (ic) ic.scale.setScalar(L.icone === 'dente' ? 0.75 : 1.4);
    // Toldo em cima da vitrine grande e da pequena
    const texToldo = canvasTex(128, 32, (c, w, h) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? L.toldo[0] : L.toldo[1]; c.fillRect((i * w) / 8, 0, w / 8, h); } });
    [vitrineL, vitrineR].forEach(([x0, x1]) => {
      const t = K.malha(new THREE.BoxGeometry(x1 - x0 + 0.3, 0.06, 1.2), K.mat(0xffffff, { map: texToldo }));
      t.position.set((x0 + x1) / 2, 3.05, 0.55);
      t.rotation.x = 0.35;
      loja.add(t);
      caixa(loja, [x1 - x0 + 0.3, 0.2, 0.04], K.mat(new THREE.Color(L.toldo[0]).getHex()), [(x0 + x1) / 2, 2.78, 1.12], false);
    });
    // Luminárias de parede na faixa
    [-2.2, 4.0].forEach((x) => {
      const l = caixa(loja, [0.3, 0.16, 0.3], K.mat(0x3a3f4a), [x, 4.1, 0.35]);
      if (noite) { const h = K.halo(0xffe0a0, 1.6); h.position.set(x, 3.95, 0.5); loja.add(h); }
      return l;
    });
    // ---- Na calçada: cavalete com a promoção, vasos e (na pizzaria) mesinhas
    const cav = new THREE.Group();
    cav.position.set(DX + 2.3, 0, 1.6);
    cav.rotation.y = -0.35;
    const quadro = K.placa(L.cavalete, { larg: 0.62, alt: 0.82, fundo: '#2a2e33', cor: '#ffffff', borda: '#8b5b35' });
    quadro.position.set(0, 0.62, 0.12);
    quadro.rotation.x = -0.18;
    cav.add(quadro);
    const tras = quadro.clone();
    tras.position.z = -0.12; tras.rotation.set(0.18, PI, 0);
    cav.add(tras);
    g.add(cav);
    [xa + 0.6, DX + PW / 2 + 0.55].forEach((x) => m3d(g, 'planta', [x, 0, 0.55], 0));
    if (L.mesasFora) [[-3.4, 2.6], [-1.2, 2.8]].forEach(([x, z]) => { m3d(g, 'mesa_redonda', [x, 0, z]); m3d(g, 'cadeira', [x + 0.75, 0, z], -PI / 2); m3d(g, 'cadeira', [x - 0.75, 0, z], PI / 2); });
    // Poste e árvore na calçada
    const poste = new THREE.Group();
    poste.position.set(-6.5, 0, 4.1);
    const mp = K.mat(0x2f3540, { metalness: 0.3, roughness: 0.5 });
    const haste = K.malha(new THREE.CylinderGeometry(0.07, 0.1, 4.6, 8), mp); haste.position.y = 2.3; poste.add(haste);
    caixa(poste, [0.06, 0.06, 1.1], mp, [0, 4.55, -0.5]);
    caixa(poste, [0.36, 0.14, 0.5], K.mat(0xe9e4d6, { emissive: 0xffd88a, emissiveIntensity: noite ? 1.4 : 0 }), [0, 4.45, -1.0], false);
    g.add(poste);
    const arv = new THREE.Group();
    arv.position.set(7.2, 0, 3.6);
    const tronco = K.malha(new THREE.CylinderGeometry(0.1, 0.14, 2.4, 8), K.mat(0x6b4a2f)); tronco.position.y = 1.2; arv.add(tronco);
    for (let k = 0; k < 5; k++) { const f = K.malha(new THREE.IcosahedronGeometry(0.7 + r() * 0.3, 1), K.mat([0x3f8a35, 0x4f9a3a, 0x5aa845][k % 3])); f.position.set((r() - 0.5) * 0.9, 2.6 + r() * 0.8, (r() - 0.5) * 0.9); arv.add(f); }
    g.add(arv);
    // ---- Vizinhos dos dois lados e os prédios do outro lado da rua
    const CORES = [0xe9d9c0, 0xc9d6e3, 0xd9b8a0, 0xb8c9b0, 0xe0c0c0, 0xcfc6e0];
    const vizinho = (x, larg, giro, z) => {
      const cor = CORES[Math.floor(r() * CORES.length)], and = 2 + Math.floor(r() * 4);
      const v = new THREE.Group();
      v.position.set(x, 0, z);
      v.rotation.y = giro;
      const tj = janelas(cor, noite, r, [Math.round(larg / 2.6), and]);
      const mj = K.mat(0xffffff, { map: tj, roughness: 0.85 });
      if (noite) { mj.emissive = new THREE.Color(0xffffff); mj.emissiveMap = tj; mj.emissiveIntensity = 0.45; }
      caixa(v, [larg, and * 3, PROF], mj, [0, ALT_T + and * 1.5, -PROF / 2]);
      const terreo = K.mat(new THREE.Color(cor).multiplyScalar(0.7).getHex());
      caixa(v, [larg, ALT_T, PROF], terreo, [0, ALT_T / 2, -PROF / 2]);
      // Porta de enrolar (loja fechada) e uma faixa
      const tEnrolar = canvasTex(64, 64, (c, w, h) => { c.fillStyle = '#9aa0a6'; c.fillRect(0, 0, w, h); c.fillStyle = '#7d838a'; for (let i = 0; i < 8; i++) c.fillRect(0, i * 8, w, 2); });
      caixa(v, [larg - 1.2, 2.8, 0.05], K.mat(0xffffff, { map: tEnrolar }), [0, 1.4, 0.03], false);
      caixa(v, [larg + 0.05, 0.6, 0.2], K.mat(new THREE.Color(cor).multiplyScalar(0.55).getHex()), [0, 3.4, 0.05]);
      g.add(v);
    };
    vizinho(-LARG / 2 - 3.5, 7, 0, 0); vizinho(-LARG / 2 - 10.5, 7, 0, 0); vizinho(-LARG / 2 - 17.5, 7, 0, 0);
    vizinho(LARG / 2 + 3.5, 7, 0, 0); vizinho(LARG / 2 + 10.5, 7, 0, 0); vizinho(LARG / 2 + 17.5, 7, 0, 0);
    for (let x = -24.5; x <= 24.5; x += 7) vizinho(x, 7, PI, 18);
    K.obstaculos.push(new THREE.Box3(V3([-40, ALT_T, -30]), V3([40, 60, 0.05])));
    K.obstaculos.push(new THREE.Box3(V3([-40, 0, -30]), V3([-LARG / 2 + 0.05, ALT_T, 0.05])), new THREE.Box3(V3([LARG / 2 - 0.05, 0, -30]), V3([40, ALT_T, 0.05])));
    K.obstaculos.push(new THREE.Box3(V3([-40, 0, 17.9]), V3([40, 60, 40])));
    // ---- Carros passando
    const carros = [];
    [0xe8352b, 0x2f7fe0, 0xf5f5f5, 0xf5c518].forEach((cor, i) => {
      const car = K.carro(cor);
      g.add(car);
      car.scale.setScalar(1.35);
      carros.push({ car, mao: i % 2, fase: i * 47, vel: 8 + (i % 3) });
    });
    K.vivo((t) => carros.forEach(({ car, mao, fase, vel }) => {
      const x = (((t * vel + fase) % 120) + 120) % 120 - 60;
      car.position.set(mao ? -x : x, 0.0, mao ? 10.8 : 7.0);
      car.rotation.y = mao ? PI : 0;
    }));
    C.objetos.carros = carros.map((c) => c.car);
    // ---- A porta abrindo
    const abrir = (k) => { porta.rotation.y = 1.5 * K.clamp(k); };
    C.porta = {
      g: porta, abrir,
      // Abre com o sino; tempo: segundos desde que começou a abrir (negativo = fechada). Devolve o quanto abriu
      abrirEm(tempo, dur = 0.6, som = 'ding') {
        if (tempo < 0) { abrir(0); return 0; }
        const k = K.saiVolta(K.clamp(tempo / dur));
        abrir(k);
        if (som) K.som(som, K.tc - tempo, 0.6);
        return k;
      }
    };
    abrir(0);
    K.vivo(() => abrir(0));       // todo quadro começa com a porta fechada; o plano abre
    C.objetos.fachada = loja;
    C.objetos.placa = placa;
    C.objetos.porta = porta;
    C.objetos.vitrine = vitrines[0];
    C.centro = [DX, 0, 2];
    C.personagem = [DX, 0, 1.6];
    C.esquerda = [-1.5, 0, 2];
    C.direita = [4.5, 0, 2];
    C.entrada = [-8, 0, 2.6];
    C.fundo = [0, 3.5, 0];
    Object.assign(C.lugares, {
      porta: [DX, 0, 0.9], dentro: [DX, 0, -1.6], vitrine: [(vitrineL[0] + vitrineL[1]) / 2, 1.7, 0.6], placa: [0, 3.55, 0.3],
      calcada: [DX, 0, 2.4], rua: [0, 0, 8.9], chegada: [-9, 0, 2.6], cavalete: [DX + 2.3, 0.6, 1.6]
    });
    C.vista = { pos: [1.4, 1.9, 9.2], alvo: [0.6, 2.0, 0] };
  }

  K.cenario = function (nome, op = {}) {
    const n = normal(nome);
    if (!(n in APELIDOS)) return ANTES(nome, op);
    const opF = Object.assign({}, op);
    if (APELIDOS[n]) opF.loja = APELIDOS[n];
    const g = new THREE.Group();
    g.name = 'cenario-fachada';
    K.scene.add(g);
    const C = {
      nome: 'fachada', grupo: g, noite: op.hora === 'noite', hora: op.hora || 'dia', centro: [0, 0, 0], personagem: [1.6, 0, 0.9], entrada: [-3, 0, 4.5],
      esquerda: [-2.6, 0, 0.4], direita: [2.9, 0, 0.3], fundo: [0, 3, -12], lugares: {}, objetos: {}, ceu: 'dia', neblina: [60, 220, 600], caixaSombra: 16,
      vista: { pos: [2.5, 2.2, 11], alvo: [0, 1.8, -8] }
    };
    fachada(C, g, opF);
    Object.entries(C.objetos).forEach(([nm, o]) => (Array.isArray(o) ? o : [o]).forEach((x) => { if (x && (x.isObject3D || (x.g && x.g.isObject3D))) K.nomear(nm, x); }));
    if (op.hora === 'tarde') C.ceu = [C.ceu, 'tarde', 0.85];
    else if (op.hora === 'noite') C.ceu = ['noite', 'tarde', 0.28];
    if (op.ceu) C.ceu = op.ceu;
    K.vivo(() => { if (Array.isArray(C.ceu)) K.ceu(...C.ceu); else K.ceu(C.ceu); K.neblina(...C.neblina); K.caixaSombra(C.caixaSombra); });
    C.lugares = Object.assign({ centro: C.centro, personagem: C.personagem, entrada: C.entrada, esquerda: C.esquerda, direita: C.direita, fundo: C.fundo }, C.lugares);
    K.cenarioAtual = C;
    return C;
  };
  K.FACHADAS = Object.keys(LOJAS);
})();
