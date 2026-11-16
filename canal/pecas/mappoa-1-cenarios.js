// Cenários do canal, montados com os modelos de K.m3d: K.cenario('agencia'), 'home_office', 'sala_reuniao', 'clinica_odonto',
// 'academia', 'salao_beleza', 'pizzaria', 'loja_roupas', 'central_mappoa', 'mundo_mappoa', 'cidade_maquete'
// Vários no mesmo vídeo: const CS = K.cenarios(['cidade', 'agencia', 'central_mappoa']); no montar. No plano: const C = CS.usar('agencia');
(function () {
  const K = window.K;
  const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
  const NOVOS = {};
  const normal = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[\s-]+/g, '_');

  function tex(px, fn, rx = 1, ry = 1) {
    const cv = document.createElement('canvas'); cv.width = cv.height = px; fn(cv.getContext('2d'), px, px);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); return t;
  }
  const PISOS = {
    madeira: (a = '#b98a5a', b = '#a97b4e') => tex(512, (c, w, h) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? a : b; c.fillRect(0, (i * h) / 8, w, h / 8); c.fillStyle = 'rgba(60,35,15,.3)'; c.fillRect(0, (i * h) / 8, w, 2); c.fillRect(((i * 3) % 8) * (w / 8), (i * h) / 8, 3, h / 8); } }, 3, 3),
    azulejo: (a = '#f4f6f8', b = '#e3e8ee') => tex(256, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); c.fillStyle = b; c.fillRect(0, 0, w / 2, h / 2); c.fillRect(w / 2, h / 2, w / 2, h / 2); }, 8, 8),
    xadrez: () => PISOS.azulejo('#f1ede4', '#2d3038'),
    carpete: (a = '#7d8ea3') => tex(128, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); const r = K.rand(7); for (let i = 0; i < 900; i++) { c.fillStyle = r() < 0.5 ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.08)'; c.fillRect(r() * w, r() * h, 2, 2); } }, 6, 6),
    borracha: () => tex(256, (c, w, h) => { c.fillStyle = '#34383f'; c.fillRect(0, 0, w, h); c.strokeStyle = '#272a30'; c.lineWidth = 6; c.strokeRect(0, 0, w, h); const r = K.rand(3); for (let i = 0; i < 300; i++) { c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(r() * w, r() * h, 2, 2); } }, 6, 6),
    grade: (a = '#0a1830', b = 'rgba(79,227,255,.3)') => tex(256, (c, w, h) => { c.fillStyle = a; c.fillRect(0, 0, w, h); c.strokeStyle = b; c.lineWidth = 3; c.strokeRect(0, 0, w, h); }, 10, 10)
  };

  // A sala: piso, fundo, laterais e teto. Devolve as medidas
  function comodo(C, g, o) {
    const { fundo = -4.4, esq = -6.4, dir = 6.4, alt = 4.6 } = o, L = dir - esq, cen = (esq + dir) / 2;
    const parede = (w, h, c, p, y) => { const m = K.malha(new THREE.PlaneGeometry(w, h), K.mat(c, { side: THREE.DoubleSide }), false); m.castShadow = false; m.receiveShadow = true; m.position.set(...p); m.rotation.y = y || 0; g.add(m); return m; };
    const piso = K.malha(new THREE.PlaneGeometry(L, 18), K.mat(0xffffff, { map: o.piso, roughness: 0.75 }), false);
    piso.rotation.x = -Math.PI / 2; piso.position.set(cen, 0, fundo + 9); piso.castShadow = false; piso.receiveShadow = true; g.add(piso);
    parede(L, alt, o.parede || 0xf0f2f5, [cen, alt / 2, fundo]);
    parede(18, alt, o.lado || o.parede || 0xf0f2f5, [esq, alt / 2, fundo + 9], Math.PI / 2);
    parede(18, alt, o.lado || o.parede || 0xf0f2f5, [dir, alt / 2, fundo + 9], -Math.PI / 2);
    const teto = K.malha(new THREE.PlaneGeometry(L, 18), K.mat(o.teto || 0xf7f8fa, { side: THREE.DoubleSide }), false); teto.rotation.x = Math.PI / 2; teto.position.set(cen, alt, fundo + 9); teto.castShadow = false; g.add(teto);
    K.obstaculos.push(new THREE.Box3(V([esq - 1, 0, fundo - 1]), V([dir + 1, alt + 3, fundo + 0.05])), new THREE.Box3(V([esq - 1, 0, fundo]), V([esq + 0.05, alt + 3, fundo + 18])), new THREE.Box3(V([dir - 0.05, 0, fundo]), V([dir + 1, alt + 3, fundo + 18])));
    C.ceu = 'interior'; C.neblina = [80, 300, 600]; C.fundo = [cen, 2.2, fundo]; C.entrada = [3.5, 0, 5];
    C.vista = { pos: [3.2, 2.4, 8.4], alvo: [-0.8, 1.5, -2] };
    return { fundo, esq, dir, alt };
  }
  const colocador = (g) => (nome, pos, giro, op) => { const m = K.m3d(nome, op); m.position.set(...pos); m.rotation.y = giro || 0; g.add(m); return m; };
  const solido = (m, f = 0.15) => { m.updateMatrixWorld(true); const b = new THREE.Box3().setFromObject(m); if (!b.isEmpty()) K.obstaculos.push(b.expandByScalar(f)); };
  const faixa = (g, l, a, cor, p) => K.m3d.h.cx(g, [l, a, 0.03], cor, p, { r: 0, sombra: false });
  const PI = Math.PI;

  function posto(p, g, x, z, op = {}) {
    const m = p('mesa', [x, 0, z], op.giro || 0, { cor: op.corMesa }); solido(m);
    const t = new THREE.Group(); t.position.set(x, 0.79, z - 0.1); t.rotation.y = op.giro || 0; g.add(t);
    const mon = K.m3d('monitor', { desenho: op.desenho }); mon.position.set(0, 0, -0.1); t.add(mon);
    const c = K.m3d('caneca', { cor: op.caneca }); c.position.set(0.68, 0, 0.1); t.add(c);
    p('cadeira_giratoria', [x, 0, z + 0.85], (op.giro || 0) + PI);
  }

  NOVOS.agencia = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.madeira(), parede: 0x123a7a, lado: 0xf3f5f8 }), p = colocador(g);
    p('letreiro', [-0.4, 3.2, s.fundo + 0.05], 0, { texto: 'AGÊNCIA', l: 3.4, a: 0.8 });
    p('quadro_postits', [-2.6, 1.75, s.fundo + 0.05]); p('lousa', [2.4, 1.75, s.fundo + 0.05]);
    posto(p, g, -3.7, -2.3); posto(p, g, 3.6, -2.5, { caneca: 0x00bc7b });
    p('sofa', [-5.2, 0, 1.4], PI / 2); p('planta_alta', [-5.6, 0, -3.6]); p('planta', [5.6, 0, -3.6]); p('estante', [6.1, 0, 0.6], -PI / 2);
    p('tapete', [0, 0, 0.8], 0, { l: 4.2, p: 3, cor: 0x2f6fd6, cor2: 0xdbe7f7 }); p('quadro_parede', [-6.34, 2.3, 1.4], PI / 2);
    [-3.7, 3.6, -0.3].forEach((x) => p('pendente', [x, 4.6, -2.4], 0, { cor: 0x00bc7b }));
    Object.assign(C.lugares, { mural: [-2.6, 1.75, s.fundo], lousa: [2.4, 1.75, s.fundo], sofa: [-5.2, 0.5, 1.4], mesa: [-3.7, 0.8, -2.3], mesa2: [3.6, 0.8, -2.5] });
  };

  NOVOS.home_office = (C, g, op) => {
    const s = comodo(C, g, { piso: PISOS.madeira('#9d7a58', '#8f6f50'), parede: 0x3b4a63, lado: 0xdfe4ea, dir: 5.2, esq: -5.2, fundo: -3.6, alt: 4 }), p = colocador(g), noite = op.hora === 'noite';
    K.m3d.h.pl(g, 3, 1.9, (c, w, h) => { const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, noite ? '#101d3a' : '#79bdf0'); d.addColorStop(1, noite ? '#39406b' : '#d9eefc'); c.fillStyle = d; c.fillRect(0, 0, w, h); const r = K.rand(5); for (let i = 0; i < 12; i++) { const x = i * 30, a = 50 + r() * 110; c.fillStyle = noite ? '#1b2440' : '#a9bbcb'; c.fillRect(x, h - a, 26, a); } }, [-1.9, 2.2, s.fundo + 0.04]);
    K.m3d.h.cx(g, [3.14, 2.04, 0.04], 0xf4f4f2, [-1.9, 2.2, s.fundo + 0.01], { r: 0 });
    const m = p('mesa', [1.6, 0, -2.6], 0, { cor: 0xf1ede4 }); solido(m);
    [[1.1, 0.79, -2.8], [2.05, 0.79, -2.8]].forEach((q) => p('monitor', q));
    p('cadeira_giratoria', [1.6, 0, -1.8], PI, { cor: 0x1067f8 }); p('ring_light', [3.05, 0, -2.6]); p('headset', [0.82, 0.79, -2.45]); p('caneca', [2.35, 0.79, -2.35], 0, { cor: 0xf59e0b });
    p('estante', [4.9, 0, 0], -PI / 2, { seed: 8 }); p('planta', [-4.4, 0, -2.9], 0, { vaso: 0x2f3540 }); p('tapete', [0, 0, 0.8], 0, { l: 3.6, p: 2.8, cor: 0x596571, cor2: 0xe9edf3 }); p('poltrona', [-3.9, 0, 0.6], PI / 2); p('pendente', [-2.6, 4, -0.8], 0, { cor: 0xf59e0b }); p('calendario', [-5.17, 1.9, 1.6], PI / 2); p('pilha_papeis', [1.15, 0.79, -2.38], 0, { n: 8 });
    C.vista = { pos: [2.6, 2.2, 7.4], alvo: [-0.4, 1.4, -2] }; Object.assign(C.lugares, { mesa: [1.6, 0.8, -2.6], janela: [-1.9, 2.2, s.fundo] });
  };

  NOVOS.sala_reuniao = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.carpete('#6d7f97'), parede: 0xe7ebf0, lado: 0xd7dee7 }), p = colocador(g);
    p('tv_parede', [0, 2.3, s.fundo + 0.05], 0, { l: 3.8, desenho: (c, w, h) => { c.fillStyle = '#f4f8fd'; c.fillRect(0, 0, w, h); [[.15, .3], [.32, .45], [.49, .4], [.66, .62], [.8, .78]].forEach(([x, a], i) => { c.fillStyle = i < 3 ? '#1067f8' : '#00bc7b'; c.fillRect(w * x, h * 0.92 - h * a, w * 0.1, h * a); }); } });
    K.m3d.h.cx(g, [5.2, 0.09, 1.6], 0x4a3627, [0, 0.76, -2.5], { r: 0.04 }); [-2, 2].forEach((x) => K.m3d.h.cx(g, [0.3, 0.72, 1], 0x2a2e33, [x, 0.36, -2.5]));
    [-2, -0.7, 0.7, 2].forEach((x) => { p('cadeira_giratoria', [x, 0, -1.3], PI); p('cadeira_giratoria', [x, 0, -3.7], 0); p('notebook', [x, 0.81, -2.1], PI); });
    K.obstaculos.push(new THREE.Box3(V([-2.8, 0, -3.5]), V([2.8, 1, -1.5])));
    p('planta_alta', [-5.5, 0, -3.5]); p('planta_alta', [5.5, 0, -3.5]); p('lousa', [6.34, 1.9, 0.4], -PI / 2); p('quadro_parede', [-6.34, 2.2, 0], PI / 2); p('relogio_parede', [-3.6, 3.2, s.fundo + 0.05]); p('bebedouro', [-5.7, 0, 2.2]);
    [-1.8, 1.8].forEach((x) => p('pendente', [x, 4.6, -2.5]));
    Object.assign(C.lugares, { mesa: [0, 0.8, -2.5], tv: [0, 2.3, s.fundo], lousa: [6.3, 1.9, 0.4] });
  };

  NOVOS.clinica_odonto = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.azulejo('#f7f9fb', '#ecf1f5'), parede: 0xd6f1ec, lado: 0xf3f7f8 }), p = colocador(g), h = K.m3d.h;
    p('letreiro', [-0.6, 3.5, s.fundo + 0.05], 0, { texto: 'Sorriso', cor: '#2fb5a6', l: 3, a: 0.75 });
    const d = p('dente', [-3.4, 2.1, s.fundo + 0.45]); d.scale.setScalar(1.3); h.ci(g, [0.9, 0.9, 0.04], 0x2fb5a6, [-3.4, 3.05, s.fundo + 0.04], { giro: [PI / 2, 0, 0], seg: 44 });
    const b = p('balcao', [-0.6, 0, -2.6], 0, { l: 3.4, faixa: 0x2fb5a6, tampo: 0xf4f7f9 }); solido(b); p('monitor', [-1.2, 1.13, -2.75]); p('telefone_fixo', [0.5, 1.13, -2.55]); p('planta', [1.5, 1.13, -2.65], 0).scale.setScalar(0.45);
    p('cadeira_dentista', [4.2, 0, -2.3], -0.4); p('quadro_parede', [2.3, 2.5, s.fundo + 0.05], 0, { fundo: '#d6f1ec' });
    [-1, 0, 1, 2].forEach((i) => p('cadeira', [-5.9, 0, 1 + i * 0.75], PI / 2, { cor: 0x2fb5a6 }));
    p('tv_parede', [-6.34, 2.6, 1.4], PI / 2, { l: 1.8 }); p('planta_alta', [5.7, 0, 1.6]); p('bebedouro', [5.7, 0, 0]); p('relogio_parede', [3.8, 3.6, s.fundo + 0.05]);
    Object.assign(C.lugares, { balcao: [-0.6, 1.1, -2.6], dente: [-3.4, 2.6, s.fundo + 0.5], cadeira: [4.2, 0.7, -2.3], espera: [-5.5, 0.5, 1.4] });
  };

  NOVOS.academia = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.borracha(), parede: 0x6b7585, lado: 0x7a8494, teto: 0x98a1b0 }), p = colocador(g), h = K.m3d.h;
    faixa(g, 12.8, 0.34, 0xf59e0b, [0, 1.2, s.fundo + 0.03]); p('letreiro', [0, 3.5, s.fundo + 0.05], 0, { texto: 'TREINO', cor: '#ffb020', l: 3.4, a: 0.85 });
    h.pl(g, 6, 1.6, (c, w, H) => { const d = c.createLinearGradient(0, 0, w, H); d.addColorStop(0, '#dcebf5'); d.addColorStop(1, '#a9c3d6'); c.fillStyle = d; c.fillRect(0, 0, w, H); c.fillStyle = 'rgba(255,255,255,.55)'; [[.2, .08], [.34, .04], [.68, .1]].forEach(([x, l]) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * (x + l), 0); c.lineTo(w * (x + l - .12), H); c.lineTo(w * (x - .12), H); c.fill(); }); }, [0, 1.85, s.fundo + 0.05], null, 900);
    [-4.6, -3.1, 3.4, 4.9].forEach((x) => solido(p('esteira', [x, 0, -2.8], PI)));
    solido(p('banco_academia', [-1.5, 0, -2.5])); solido(p('banco_academia', [1.5, 0, -2.5]));
    const su = new THREE.Group(); su.position.set(5.6, 0, 1.2); g.add(su);
    h.cx(su, [0.5, 0.05, 2.8], 0x8a929c, [0, 0.45, 0]); h.cx(su, [0.5, 0.05, 2.8], 0x8a929c, [0, 0.95, 0]);
    [-1.3, 1.3].forEach((z) => h.cx(su, [0.46, 1.05, 0.06], 0x5b6470, [0, 0.52, z]));
    for (let i = 0; i < 5; i++) { [0.47, 0.97].forEach((y) => { const m = K.m3d('haltere', { cor2: [0xf59e0b, 0xe8352b, 0x1067f8][i % 3] }); m.position.set(0, y, -1 + i * 0.5); m.rotation.y = PI / 2; su.add(m); }); }
    [-5.3, 0].forEach((x) => [-1, 1].forEach((_, j) => p('haltere', [x + j * 0.8 - 0.4, 0, 2.2 + (x ? 1 : 3)], 0.3 * j)));
    [-3.4, 0, 3.4].forEach((x) => p('pendente', [x, 4.6, -1.2], 0, { cor: 0x4b525c }));
    Object.assign(C.lugares, { espelho: [0, 2.1, s.fundo], esteira: [-4.6, 1, -2.8], banco: [-1.5, 0.6, -2.5], halteres: [5.6, 1, 1.2] });
  };

  NOVOS.salao_beleza = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.azulejo('#fbf7f4', '#f0e8e2'), parede: 0xf8d9e3, lado: 0xfbf0f2 }), p = colocador(g), h = K.m3d.h;
    p('letreiro', [0, 3.75, s.fundo + 0.05], 0, { texto: 'Bella', cor: '#e8537a', l: 2.4, a: 0.7 });
    [-3.2, 0, 3.2].forEach((x, i) => { p('espelho_salao', [x, 1.85, s.fundo + 0.06]); h.cx(g, [1.5, 0.06, 0.4], 0xf4f1ea, [x, 0.92, s.fundo + 0.22]); p('cadeira_salao', [x, 0, -2.5], PI); p('secador', [x + 0.45, 1.06, s.fundo + 0.22], 0.2, { cor: [0xe8537a, 0x1067f8, 0xf59e0b][i] }).scale.setScalar(0.55); });
    h.cx(g, [2.4, 0.05, 0.3], 0xb07a48, [-6.2, 1.9, 1.1], { giro: [0, PI / 2, 0] }); for (let i = 0; i < 6; i++) h.ci(g, [0.07, 0.07, 0.3], [0xe8537a, 0xffffff, 0x2fb5a6][i % 3], [-6.2, 2.08, 0.1 + i * 0.4]);
    p('planta_alta', [5.6, 0, -3.5]); p('planta', [-5.6, 0, -3.5], 0, { vaso: 0xe8537a }); const b = p('balcao', [4.8, 0, 2.2], -PI / 2, { l: 2.2, faixa: 0xe8537a, tampo: 0xfbf7f4 }); solido(b); p('caixa_registradora', [4.8, 1.13, 2.2], -PI / 2);
    [-3.2, 0, 3.2].forEach((x) => p('pendente', [x, 4.6, -1], 0, { cor: 0xe8537a }));
    Object.assign(C.lugares, { espelho: [0, 1.85, s.fundo], cadeira: [0, 0.8, -2.5], balcao: [4.8, 1.1, 2.2] });
  };

  NOVOS.pizzaria = (C, g) => {
    const tijolo = tex(256, (c, w, h) => { c.fillStyle = '#d7cfc4'; c.fillRect(0, 0, w, h); const r = K.rand(3); for (let j = 0; j < 8; j++) for (let i = -1; i < 5; i++) { c.fillStyle = ['#a9583f', '#b4644a', '#9c4f38'][Math.floor(r() * 3)]; c.fillRect(i * 64 + (j % 2) * 32 + 3, j * 32 + 3, 58, 26); } }, 6, 3);
    const s = comodo(C, g, { piso: PISOS.xadrez(), parede: 0xf0dfc8, lado: 0xf0dfc8, teto: 0xe9dcc8 }), p = colocador(g), h = K.m3d.h;
    const mur = K.malha(new THREE.PlaneGeometry(12.8, 4.6), K.mat(0xffffff, { map: tijolo }), false); mur.position.set(0, 2.3, s.fundo + 0.02); mur.castShadow = false; g.add(mur);
    solido(p('forno_pizza', [-3, 0, -3.3])); p('letreiro', [2, 3.3, s.fundo + 0.06], 0, { texto: 'PIZZA', cor: '#ff5a3c', l: 2.6, a: 0.75 });
    const b = p('balcao', [2.2, 0, -2.6], 0, { l: 3.6, faixa: 0xe8352b, cor: 0xf4ead7, tampo: 0x7b5a3c }); solido(b);
    p('pizza', [1.4, 1.12, -2.6]).scale.setScalar(0.72); p('caixa_registradora', [3.3, 1.12, -2.6]); const cx0 = p('caixa_pizza', [2.3, 1.12, -2.6], 0.2); cx0.scale.setScalar(0.5); for (let i = 0; i < 6; i++) p('caixa_pizza', [5.6, 0.14 * i, -3], 0.1 * i).scale.setScalar(0.72);
    [[-4.8, 1.2], [4.9, 1.6], [-4.7, 3.8]].forEach(([x, z]) => { solido(p('mesa_redonda', [x, 0, z], 0, { cor: 0xf6f1e7 })); [0, 2.1, 4.2].forEach((a) => p('banqueta', [x + Math.cos(a) * 0.95, 0, z + Math.sin(a) * 0.95])); });
    [2.2, -0.1].forEach((x) => p('pendente', [x, 4.6, -2.4], 0, { cor: 0xe8352b }));
    h.cx(g, [1.5, 1, 0.04], 0x2a2e33, [5, 2.5, s.fundo + 0.06]);
    Object.assign(C.lugares, { forno: [-3, 1.1, -2.6], balcao: [2.2, 1.1, -2.6], mesa: [-4.8, 0.8, 1.2] });
  };

  NOVOS.loja_roupas = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.madeira('#d7bd97', '#cbb089'), parede: 0xf5ece4, lado: 0xfaf5f0 }), p = colocador(g), h = K.m3d.h;
    p('letreiro', [0, 3.6, s.fundo + 0.05], 0, { texto: 'Vento Sul', cor: '#e8537a', l: 3.6, a: 0.8 });
    h.cx(g, [8.4, 2.5, 0.05], 0xe9d9ca, [0, 1.65, s.fundo + 0.02], { r: 0 });
    [-2.6, 0, 2.6].forEach((x, i) => solido(p('arara_roupas', [x, 0, -3.2], 0, { cores: [[0xe8537a, 0xf4f1ea, 0x2a2e33, 0xf59e0b, 0x1067f8, 0xe8352b], [0x00bc7b, 0x1067f8, 0xf4f1ea, 0x7a4fd6, 0xe8537a, 0x2a2e33], [0xf59e0b, 0xe8352b, 0xf4f1ea, 0x2a2e33, 0x00bc7b, 0x7a4fd6]][i] })));
    p('manequim', [-5, 0, -1.6], 0.5, { cor: 0xe8352b }); p('manequim', [-3.9, 0, -2], 0.3, { cor: 0x1067f8 }); p('manequim', [5.1, 0, -1.8], -0.4, { cor: 0x00bc7b });
    const b = p('balcao', [4.9, 0, 1.6], -PI / 2, { l: 2.4, faixa: 0xe8537a, cor: 0xfaf5f0, tampo: 0xb07a48 }); solido(b); p('caixa_registradora', [4.9, 1.13, 1.2], -PI / 2); p('sacola', [4.9, 1.13, 2.2], -PI / 2);
    p('espelho_salao', [-6.34, 1.6, 1.2], PI / 2); p('planta_alta', [-5.7, 0, 3.5]); p('poltrona', [-5.4, 0, -3.5], 0.6, { cor: 0xe8537a }); p('tapete', [0, 0, 0.9], 0, { l: 3.6, p: 2.6, cor: 0xe8537a, cor2: 0xfdeef2 });
    [-2.6, 0, 2.6].forEach((x) => p('pendente', [x, 4.6, -1.6], 0, { cor: 0xb07a48 }));
    Object.assign(C.lugares, { arara: [0, 1.2, -3.2], balcao: [4.9, 1.1, 1.6], espelho: [-6.3, 1.6, 1.2] });
  };

  NOVOS.central_mappoa = (C, g) => {
    const s = comodo(C, g, { piso: PISOS.grade(), parede: 0x10264a, lado: 0x16305a, teto: 0x1c3a68 }), p = colocador(g), h = K.m3d.h;
    h.pl(g, 10.6, 3.5, (c, w, H) => {
      c.fillStyle = '#0d2346'; c.fillRect(0, 0, w, H); c.strokeStyle = 'rgba(79,227,255,.55)'; c.lineWidth = 5; const r = K.rand(14);
      for (let i = 0; i < 16; i++) { c.beginPath(); c.moveTo(r() * w, 0); c.lineTo(r() * w, H); c.stroke(); c.beginPath(); c.moveTo(0, r() * H); c.lineTo(w, r() * H); c.stroke(); }
      for (let i = 0; i < 46; i++) { const x = r() * w, y = r() * H, cor = r() < 0.6 ? '#2d8bff' : '#00e39a'; c.shadowColor = cor; c.shadowBlur = 22; c.fillStyle = cor; c.beginPath(); c.arc(x, y, 12, 0, 7); c.fill(); }
      c.shadowBlur = 0;
    }, [0, 2.5, s.fundo + 0.04], null, 1500);
    h.cx(g, [10.9, 3.76, 0.03], 0x1067f8, [0, 2.5, s.fundo + 0.01], { r: 0, sombra: false });
    [-3.5, 3.5].forEach((x) => { const m = p('mesa', [x, 0, -2.2], 0, { cor: 0x1b2d4a }); solido(m); [-0.5, 0.5].forEach((d) => p('monitor', [x + d, 0.79, -2.35])); });
    const r1 = p('robo', [-3.5, 0, -1.3], PI), r2 = p('robo', [3.5, 0, -1.3], PI); K.vivo((t) => { r1.userData.m3d.em(t, { olhar: [0.15, 0] }); r2.userData.m3d.em(t + 1.3, { olhar: [-0.15, 0] }); });
    p('letreiro', [0, 4.42, s.fundo + 0.06], 0, { texto: 'MAPPOA', l: 2, a: 0.34 });
    const lg = p('logo', [-5.7, 2.6, 0.8], PI / 2, { tam: 1.1 }); void lg; p('logo', [5.7, 2.6, 0.8], -PI / 2, { tam: 1.1 });
    [-3.5, 0, 3.5].forEach((x) => { const l = K.m3d('pendente', { cor: 0x1067f8 }); l.position.set(x, 4.6, 0.4); g.add(l); });
    C.vista = { pos: [2.4, 2.1, 8.4], alvo: [-0.4, 1.9, -3] };
    Object.assign(C.lugares, { mapa: [0, 2.5, s.fundo], mesa: [-3.5, 0.8, -2.2], mesa2: [3.5, 0.8, -2.2] });
    C.objetos.robos = [r1, r2];
  };

  NOVOS.mundo_mappoa = (C, g) => {
    C.ceu = 'interior'; C.neblina = [80, 300, 600]; const p = colocador(g);
    const ch = K.malha(new THREE.CircleGeometry(40, 64), K.mat(0xffffff, { map: PISOS.grade('#f4f8fd', 'rgba(16,103,248,.16)'), roughness: 0.6 }), false); ch.rotation.x = -PI / 2; ch.castShadow = false; ch.receiveShadow = true; g.add(ch);
    const ceuT = tex(512, (c, w, h) => { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#cfe2ff'); d.addColorStop(0.5, '#e7f7ff'); d.addColorStop(1, '#ccf5e5'); c.fillStyle = d; c.fillRect(0, 0, w, h); });
    const fundoM = new THREE.Mesh(new THREE.CylinderGeometry(38, 38, 40, 48, 1, true), new THREE.MeshBasicMaterial({ map: ceuT, side: THREE.BackSide })); fundoM.position.y = 18; g.add(fundoM);
    const flutua = [];
    const logo = p('logo', [0, 4.2, -9], 0, { tam: 5 }); flutua.push([logo, 4.2, 0]);
    K.MAPPOA.exemplos.forEach((l, i) => { const a = -1.2 + (i / 5) * 2.4, c = p('cartao_lead', [Math.sin(a) * 6.4, 1.4 + (i % 3) * 1.15, -3.6 - Math.cos(a) * 2], -a * 0.6, { lead: l }); flutua.push([c, c.position.y, i]); });
    [[-4.6, -1.4], [4.8, -2.2], [-2.6, -6], [3.2, -6.6], [-6.8, -5.4], [6.8, -4.8]].forEach(([x, z], i) => { const m = p('pino', [x, 0, z], 0, { tam: 1.4 + (i % 3) * 0.7, cor: i % 2 ? '#00bc7b' : '#1067f8' }); void m; });
    K.vivo((t) => flutua.forEach(([o, y, f]) => { o.position.y = y + Math.sin(t * 1.1 + f) * 0.09; }));
    C.fundo = [0, 4, -9]; C.vista = { pos: [2.2, 2.2, 9], alvo: [-0.3, 2.2, -4] }; C.entrada = [-3, 0, 5];
    Object.assign(C.lugares, { logo: [0, 4.2, -9] }); C.objetos.logo3d = logo;
  };

  NOVOS.cidade_maquete = (C, g) => {
    C.ceu = 'interior'; C.neblina = [120, 400, 800]; C.caixaSombra = 26; const p = colocador(g), h = K.m3d.h, r = K.rand(21), passo = 3.4, n = 5;
    const chao = K.malha(new THREE.PlaneGeometry(80, 80), K.mat(0xc6cdd8), false); chao.rotation.x = -PI / 2; chao.castShadow = false; chao.receiveShadow = true; g.add(chao);
    const fundoM = new THREE.Mesh(new THREE.CylinderGeometry(38, 38, 40, 48, 1, true), new THREE.MeshBasicMaterial({ color: 0xdcecff, side: THREE.BackSide })); fundoM.position.y = 18; g.add(fundoM);
    const cor = [0x1067f8, 0x37b03f, 0xe6eaf0, 0x7da8f5, 0x8bd4a0, 0xcfd0d6], nomes = ['CLÍNICA', 'LOJA', 'PADARIA', 'ACADEMIA', 'SALÃO', 'PIZZA'];
    for (let i = -n; i <= n; i++) for (let j = -n; j <= n; j++) {
      const x = i * passo, z = j * passo; h.cx(g, [2.7, 0.12, 2.7], i % 2 ? 0xeef2f6 : 0xdfeee4, [x, 0.06, z], { r: 0.04, sombra: false });
      if (Math.abs(i) <= 0 && Math.abs(j) <= 0) continue;
      const q = 1 + Math.floor(r() * 2);
      for (let k = 0; k < q; k++) { const a = 0.7 + r() * 1.9, m = p('prediozinho', [x + (q > 1 ? (k ? 0.65 : -0.65) : 0), 0.12, z], [0, 0, PI / 2][Math.floor(r() * 3)], { cor: cor[Math.floor(r() * 6)], a: a + 0.3, placa: nomes[Math.floor(r() * 6)] }); m.scale.setScalar(q > 1 ? 0.95 : 1.25); }
    }
    const carros = [0, 1, 2, 3, 4, 5].map((i) => { const c = K.carro([0xe8352b, 0xffc531, 0xf4f1ea][i % 3]); c.g ? g.add(c.g) : g.add(c); const o = c.g || c; o.scale.setScalar(0.42); return o; });
    K.vivo((t) => carros.forEach((o, i) => { const L = 34, d = ((t * 2.4 + i * 9) % L) - L / 2; if (i % 2) { o.position.set(passo * ((i % 3) - 1) + 1.7, 0.04, d); o.rotation.y = PI / 2; } else { o.position.set(d, 0.04, passo * ((i % 3) - 1) + 1.7); o.rotation.y = 0; } }));
    C.personagem = [1.3, 0.12, 0.7]; C.esquerda = [-1, 0.12, 0.3]; C.direita = [1, 0.12, 0.3]; C.entrada = [1.7, 0, 6]; C.fundo = [0, 2, -12]; C.vista = { pos: [6.5, 8.5, 12], alvo: [0, 0.5, 0] };
  };

  const original = K.cenario;
  K.cenario = function (nome, op = {}) {
    const chave = normal(nome), fazer = NOVOS[chave];
    if (!fazer) return original(nome, op);
    const g = new THREE.Group(); g.name = 'cenario-' + chave; K.scene.add(g);
    const C = { nome: chave, grupo: g, noite: op.hora === 'noite', hora: op.hora || 'dia', centro: [0, 0, 0], personagem: [1.6, 0, 0.9], entrada: [-3, 0, 4.5], esquerda: [-2.6, 0, 0.4], direita: [2.9, 0, 0.3], fundo: [0, 3, -12], lugares: {}, objetos: {}, ceu: 'interior', neblina: [60, 220, 600], caixaSombra: 16, vista: { pos: [2.5, 2.2, 11], alvo: [0, 1.8, -8] } };
    fazer(C, g, op);
    Object.entries(C.objetos).forEach(([n, o]) => (Array.isArray(o) ? o : [o]).forEach((x) => { if (x && (x.isObject3D || (x.g && x.g.isObject3D))) K.nomear(n, x); }));
    K.vivo(() => { if (Array.isArray(C.ceu)) K.ceu(...C.ceu); else K.ceu(C.ceu); K.neblina(...C.neblina); K.caixaSombra(C.caixaSombra); });
    C.lugares = Object.assign({ centro: C.centro, personagem: C.personagem, entrada: C.entrada, esquerda: C.esquerda, direita: C.direita, fundo: C.fundo }, C.lugares);
    K.cenarioAtual = C; return C;
  };
  K.CENARIOS_CANAL = Object.keys(NOVOS);

  // Vários cenários no mesmo vídeo: cada um fica guardado, escondido, e CS.usar(nome) mostra só ele, com o céu e os limites da câmera dele
  K.cenarios = function (lista) {
    const todos = {}, ordem = [];
    lista.forEach((item) => {
      const [nome, op, apelido] = Array.isArray(item) ? item : [item, {}];
      const antes = new Set(K.scene.children), ob = K.obstaculos.length;
      const C = K.cenario(nome, op || {});
      K.scene.children.slice().forEach((o) => { if (!antes.has(o) && o !== C.grupo && !o.isLight && !o.isCamera) C.grupo.add(o); });
      C.solidos = K.obstaculos.splice(ob); C.grupo.visible = false;
      const id = apelido || C.nome; todos[id] = C; ordem.push(id);
    });
    let atual = null;
    return {
      todos, ordem,
      usar(id) {
        const C = todos[id]; if (!C) throw new Error(`CS.usar: o cenário "${id}" não foi carregado. Carregados: ${ordem.join(', ')}`);
        if (atual !== id) { ordem.forEach((n) => { todos[n].grupo.visible = n === id; }); K.obstaculos.length = 0; K.obstaculos.push(...C.solidos); atual = id; K.cenarioAtual = C; }
        if (Array.isArray(C.ceu)) K.ceu(...C.ceu); else K.ceu(C.ceu);
        K.neblina(...C.neblina); K.caixaSombra(C.caixaSombra); return C;
      }
    };
  };
})();
