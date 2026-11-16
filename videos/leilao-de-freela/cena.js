// Você e mais oitenta brigando por um cliente só (canal Mappoa).
// Quatro lugares (K.cenarios): o palco_show como o LEILÃO (a dona da ótica no púlpito com o martelo, a multidão de web
// designers com as plaquinhas de lance e o telão com o lance caindo), o quarto do Caio, o palco do Mappoa e o calçadão
// com a loja ÓTICA. As plaquinhas, o martelo, o púlpito, os óculos da dona e o lanche são feitos aqui. Cada plano começa
// com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, rival, robo, comp, telaC, telaM, navG, foneMesa, pino, lanche, martelo, pulpito, placaCaio, placaRival, FOV0;
  let texMult, texCaio, texRival, telao;
  const tudo = [], fx = {}, multidao = [], placas = [], baloes = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Leilão (palco_show): a dona atrás do púlpito, de frente pra multidão (+z); a multidão olhando pra ela
  const DONA_P = [0, 0, -3.35], PULP = [0, 0, -2.8], OLHA_DONA = [0, 1.5, -3.35];
  const CAIO = [0.45, 0, -1.5], RIVAL = [1.35, 0, -1.5];
  const VAGAS = [];
  [-3.15, -2.25, -1.35, -0.45, 2.25, 3.15].forEach((x) => VAGAS.push([x, 0, -1.5]));
  [-2.7, -1.8, -0.9, 0, 0.9, 1.8, 2.7].forEach((x) => VAGAS.push([x, 0, -0.5]));
  [-3.0, -2.1, -1.2, -0.3, 1.3, 2.2, 3.1].forEach((x) => VAGAS.push([x, 0, 0.5]));
  // Quarto (home_office): o computador no meio, virado pra +z
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  // Calçadão: a loja ÓTICA e a dona na frente dela
  let DZ = -5, DONA_R = [-0.2, 0, -5];

  const LUGAR = { gancho: 'leilao', disputa: 'quarto', rival: 'leilao', larga: 'leilao', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', segue: 'quarto', cartao: 'quarto', capa: 'leilao' };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.5) ? 'leilao' : 'rua';
    return LUGAR[B.plano] || 'quarto';
  }

  const OTICAS = [
    { nome: 'Ótica Visão Clara', end: 'Rua Laranjeiras, 312', chips: ['whats', 'insta'] },
    { nome: 'Ótica Farol', end: 'Av. Beira Mar, 1450', chips: ['tel', 'insta'] },
    { nome: 'Óticas Atalaia', end: 'Rua Itabaiana, 88', chips: ['whats'] },
    { nome: 'Ótica do Mercado', end: 'Rua João Pessoa, 640', chips: ['whats', 'tel'] }
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

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  // A plaquinha de lance: "R$ 800" (borda: a cor de quem segura)
  function placaDesenho(c, w, h, valor, borda) {
    c.fillStyle = borda; c.fillRect(0, 0, w, h);
    rr(c, w * 0.05, h * 0.07, w * 0.9, h * 0.86, 12, '#ffffff');
    txt(c, 'R$ ' + valor, w / 2, h * 0.53, h * 0.5, '#111', 900, 'center', w * 0.86);
  }
  // O telão do leilão: o lance atual caindo, ou VENDIDO
  function telaoLance(c, w, h, e) {
    const d = c.createLinearGradient(0, 0, w, h); d.addColorStop(0, '#16213a'); d.addColorStop(1, '#3a1a4a'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, 'SITE DA ÓTICA', w / 2, h * 0.17, h * 0.13, '#9fb3d9', 900, 'center');
    if (e.vendido) {
      txt(c, 'VENDIDO', w / 2, h * 0.47, h * 0.26, '#ff4d4d', 900, 'center');
      txt(c, 'R$ ' + e.valor, w / 2, h * 0.78, h * 0.24, '#ffd23f', 900, 'center');
    } else {
      txt(c, 'LANCE', w / 2, h * 0.36, h * 0.12, '#ffffff', 800, 'center');
      txt(c, 'R$ ' + e.valor, w / 2, h * 0.66, h * 0.36, '#ffd23f', 900, 'center');
    }
  }
  // O site de freela: o projeto e as propostas subindo
  function freela(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#18a058'; c.fillRect(0, 0, w, h * 0.16);
    txt(c, 'Projetos Freela', w * 0.06, h * 0.08, w * 0.06, '#fff', 900);
    rr(c, w * 0.05, h * 0.22, w * 0.9, h * 0.7, 12, '#ffffff');
    txt(c, 'Site pra ótica', w * 0.1, h * 0.33, w * 0.075, '#111', 900);
    txt(c, 'Aracaju · a combinar', w * 0.1, h * 0.45, w * 0.045, '#4a4f58', 700);
    txt(c, 'Propostas:', w * 0.1, h * 0.65, w * 0.06, '#4a4f58', 800);
    txt(c, String(e.n), w * 0.62, h * 0.65, w * 0.12, '#e8352b', 900);
  }
  // O grupo: "alguém faz site barato?" e os comentários
  function grupo(c, w, h, e) {
    c.fillStyle = '#eef1f5'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#2d5fb8'; c.fillRect(0, 0, w, h * 0.16);
    txt(c, 'Grupo · Sites Aracaju', w * 0.06, h * 0.08, w * 0.055, '#fff', 900);
    rr(c, w * 0.05, h * 0.22, w * 0.9, h * 0.34, 12, '#ffffff');
    txt(c, 'Alguém faz site', w * 0.1, h * 0.32, w * 0.07, '#111', 900);
    txt(c, 'barato?', w * 0.1, h * 0.45, w * 0.07, '#111', 900);
    txt(c, 'Comentários: ' + e.n, w * 0.08, h * 0.7, w * 0.06, '#e8352b', 900);
  }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Caio Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que vendem', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A tela do sistema acendendo depois do lanche
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#f4f7fb'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#0b1f3f'; c.fillRect(0, 0, w, h * 0.16);
    txt(c, 'Quem precisa de site', w * 0.06, h * 0.08, w * 0.055, '#fff', 900, 'left', w * 0.88);
    for (let i = 0; i < 4; i++) {
      const y = h * (0.24 + i * 0.18), on = e.k > i / 4;
      rr(c, w * 0.06, y, w * 0.88, h * 0.14, 10, on ? '#ffffff' : '#e3e8ef');
      if (on) { rr(c, w * 0.62, y + h * 0.035, w * 0.28, h * 0.07, 12, '#fff4dc'); txt(c, 'sem site', w * 0.76, y + h * 0.07, w * 0.04, '#d97706', 800, 'center'); rr(c, w * 0.1, y + h * 0.045, w * 0.4, h * 0.05, 6, '#c9d3e0'); }
    }
  }

  // ---------- Peças feitas aqui ----------
  // Plaquinha de lance: cabo de madeira e a placa com o número nos dois lados (origem na mão)
  function fazPlaca(tex, borda) {
    const g = new THREE.Group();
    const cabo = K.malha(new THREE.CylinderGeometry(0.018, 0.018, 0.55, 8), K.mat(0xb07a45)); cabo.position.y = 0.24; g.add(cabo);
    const fundo = K.malha(new THREE.BoxGeometry(0.6, 0.42, 0.02), K.mat(borda)); fundo.position.y = 0.66; g.add(fundo);
    [1, -1].forEach((l) => {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 0.4), new THREE.MeshBasicMaterial({ map: tex }));
      f.position.set(0, 0.66, l * 0.012); if (l < 0) f.rotation.y = PI; g.add(f);
    });
    g.visible = false; K.scene.add(g);
    return g;
  }
  // Martelo de leilão (origem no cabo, na mão; a cabeça em cima)
  function fazMartelo() {
    const g = new THREE.Group(), mad = K.mat(0x7a4a22, { roughness: 0.5 }), oura = K.mat(0xd9a520, { roughness: 0.35, metalness: 0.4 });
    const cabo = K.malha(new THREE.CylinderGeometry(0.025, 0.03, 0.42, 10), mad); cabo.position.y = 0.21; g.add(cabo);
    const cab = K.malha(new THREE.CylinderGeometry(0.075, 0.075, 0.28, 16).rotateZ(PI / 2), mad); cab.position.y = 0.44; g.add(cab);
    [-1, 1].forEach((l) => { const a = K.malha(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16).rotateZ(PI / 2), oura); a.position.set(l * 0.1, 0.44, 0); g.add(a); });
    return g;
  }
  // O púlpito do leilão, com a faixa LEILÃO na frente
  function fazPulpito() {
    const g = new THREE.Group();
    const corpo = K.malha(new THREE.BoxGeometry(1.5, 1.0, 0.5), K.mat(0x1b2a4a, { roughness: 0.5 })); corpo.position.y = 0.5; g.add(corpo);
    const tampo = K.malha(new THREE.BoxGeometry(1.65, 0.06, 0.62), K.mat(0x7a4a22)); tampo.position.y = 1.03; g.add(tampo);
    const bloco = K.malha(new THREE.CylinderGeometry(0.13, 0.15, 0.06, 18), K.mat(0x5a3418)); bloco.position.set(0.32, 1.09, 0.08); g.add(bloco);
    const t = K.telaCanvas(1.3, 0.34, 400);
    t.desenhar((c, w, h) => { c.fillStyle = '#d9a520'; c.fillRect(0, 0, w, h); txt(c, 'LEILÃO', w / 2, h * 0.55, h * 0.7, '#1b2a4a', 900, 'center'); }, 'l');
    t.m.position.set(0, 0.72, 0.256); g.add(t.m);
    return g;
  }
  // Óculos redondos grandes da dona da ótica
  function fazOculos() {
    const g = new THREE.Group(), preto = K.mat(0x1a1a1a, { roughness: 0.4 });
    [-1, 1].forEach((l) => { const r = K.malha(new THREE.TorusGeometry(0.062, 0.012, 8, 24), preto); r.position.set(l * 0.075, 0.03, 0.205); g.add(r); });
    const ponte = K.malha(new THREE.BoxGeometry(0.03, 0.012, 0.012), preto); ponte.position.set(0, 0.04, 0.21); g.add(ponte);
    return g;
  }
  function fazLanche() {
    const g = new THREE.Group();
    const b = K.malha(new THREE.CylinderGeometry(0.13, 0.12, 0.05, 20), K.mat(0xd9984a, { roughness: 0.7 })); b.position.y = 0.025; g.add(b);
    const carne = K.malha(new THREE.CylinderGeometry(0.135, 0.135, 0.045, 20), K.mat(0x5a3020)); carne.position.y = 0.07; g.add(carne);
    const queijo = K.malha(new THREE.BoxGeometry(0.25, 0.012, 0.25), K.mat(0xffc93c)); queijo.position.y = 0.097; queijo.rotation.y = PI / 4; g.add(queijo);
    const alface = K.malha(new THREE.CylinderGeometry(0.148, 0.148, 0.016, 20), K.mat(0x5cb848)); alface.position.y = 0.108; g.add(alface);
    const topo = K.malha(new THREE.SphereGeometry(0.135, 20, 12, 0, PI * 2, 0, PI / 2), K.mat(0xe0a458, { roughness: 0.6 })); topo.position.y = 0.115; topo.scale.y = 0.75; g.add(topo);
    return g;
  }
  function fazFone() {
    const g = new THREE.Group();
    const preto = K.mat(0x22252b, { roughness: 0.5 }), verde = K.mat(0x2fb5a6, { roughness: 0.45 });
    g.add(K.malha(new THREE.TorusGeometry(0.255, 0.028, 10, 32, PI), preto));
    [-1, 1].forEach((l) => { const c = K.malha(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 20).rotateZ(PI / 2), verde); c.position.set(l * 0.255, -0.02, -0.01); g.add(c); });
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['palco_show', { texto: 'LEILÃO' }, 'leilao'], ['home_office', {}, 'quarto'], 'mundo_mappoa', ['rua_predios', {}, 'rua']]);
    telao = CS.todos.leilao.telao; K.nomear('telao', telao.m);
    const Cr = CS.todos.rua;
    const ot = (Cr.lojas || []).find((l) => l.id === 'otica');
    if (ot) { DZ = ot.porta[2]; K.nomear('loja_otica', ot.g); }
    // as árvores do lado direito ficam a cada 14 m (z = 26 - 14k): a dona logo depois de uma
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    DONA_R = [-0.2, 0, DZ];

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaOticas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: OTICAS, n: e.n, sel: e.sel, total: 74, comSite: 41, semSite: 33 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Óticas · Aracaju, SE', 36, 168, 21, M.marinho, 700, 'left', w - 72);
    };
    T.analiseOtica = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Ótica Visão Clara', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site próprio', 'Armações só no Instagram'], oportunidades: ['Site com as armações e o WhatsApp'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre quem procura ótica no bairro e não acha as armações.'
      });
      if (e.ate >= 0) txt(c, Math.round(91 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Caio (do canal), o rival (moletom vermelho), a dona da ótica (blazer marinho e óculos) e a multidão
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8352b, punho: 0xa8241c, calca: 0x2a2f3a, cabelo: 0x1a1a1a, pele: 0xc98d5e } });
    K.semNome(rival.g); K.nomear('rival', rival.g);
    dona = K.personagem('dona', { cores: { blazer: 0x1b2a4a, vestido: 0xf2e6d0 } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    dona.cabeca.add(fazOculos());
    const PELES = [0xe6b48a, 0xc98d5e, 0x8a5a3a, 0xf1c9a5, 0xa86b45], CAMISAS = [0xf39a1e, 0x2fb54a, 0x8a4fd8, 0xe8352b, 0x3fb8ff, 0xffd23f, 0xff4d8a, 0x6b7280], CABELOS = [0x1a1a1a, 0x5a3418, 0x7a4a22, 0xd9a520, 0x2a1a10];
    VAGAS.forEach((p, i) => {
      const op = i % 3 === 2
        ? { tipo: 'menina', cores: { vestido: CAMISAS[(i * 3) % 8], cabelo: CABELOS[i % 5], pele: PELES[(i * 2) % 5] } }
        : i % 4 === 1
          ? { roupa: 'moletom', cores: { moletom: CAMISAS[(i * 5) % 8], calca: 0x2a2f3a, cabelo: CABELOS[(i + 2) % 5], pele: PELES[i % 5] } }
          : { roupa: 'camiseta', cores: { camiseta: CAMISAS[(i * 5 + 1) % 8], bermuda: 0x3a4250, cabelo: CABELOS[(i + 1) % 5], pele: PELES[(i + 3) % 5] } };
      const b = K.boneco(op); K.semNome(b.g);
      multidao.push({ b, p, fase: i * 1.37 + (i % 3) * 0.6 });
    });
    K.nomear('multidao', multidao[3].b.g);

    // As plaquinhas: a da multidão é uma textura só (o lance da vez); a do Caio e a do rival têm a sua
    texMult = K.telaCanvas(0.58, 0.4, 256); texCaio = K.telaCanvas(0.58, 0.4, 256); texRival = K.telaCanvas(0.58, 0.4, 256);
    const placasG = new THREE.Group(); K.scene.add(placasG); K.nomear('placas', placasG); tudo.push(placasG);
    multidao.forEach((m) => { const pl = fazPlaca(texMult.tex, 0x2a2f3a); K.scene.remove(pl); placasG.add(pl); m.placa = pl; placas.push(pl); });
    placaCaio = fazPlaca(texCaio.tex, 0x2f6fd6); K.nomear('placa_caio', placaCaio);
    placaRival = fazPlaca(texRival.tex, 0xd8352b); K.nomear('placa_rival', placaRival);

    // O púlpito e o martelo
    pulpito = fazPulpito(); guarda(pulpito, 'mesa_leilao', PULP);
    martelo = fazMartelo(); martelo.scale.setScalar(1.35); K.scene.add(martelo); K.nomear('martelo', martelo); tudo.push(martelo);

    // Quarto: o computador, o fone na mesa, a barra do endereço, as telas do Mappoa, o lanche e o pino
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    foneMesa = fazFone(); foneMesa.rotation.set(-PI / 2 + 0.15, 0, 0); guarda(foneMesa, null, [0.15, 0.8, -1.15]);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    lanche = fazLanche(); guarda(lanche, 'lanche', [0, 1, 0], 1.8);
    pino = K.m3d('pino'); guarda(pino, 'pino', [0.9, 2.2, 0.3], 0.8);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Efeitos
    for (let i = 0; i < 3; i++) baloes.push(K.balaoFala());
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.onda = K.ondaChoque();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      oitenta: e('+80 web designers', 'laranja'), web: e('Web designer', 'azul'), propostas: e('87 propostas', 'vermelho'),
      barato: e('Mais barato', 'vermelho'), fora: e('Fora do leilão', 'verde'), ninguem: e('Onde ninguém está', 'verde'),
      invest: e('Investimento', 'azul'), oferece: e('Ninguém oferecendo', 'verde'), aracaju: e('Aracaju', 'azul'),
      precisa: e('Quem precisa de você', 'verde'), brigando: e('Brigando com 80', 'vermelho'), sozinho: e('Sozinho', 'verde'),
      cidade: e('Sua cidade?', 'azul')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>a sua cidade</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // a placa na mão erguida de quem segura (virada pra onde a pessoa olha)
  function placaNa(pl, b, alto) {
    b.apontar(alto);
    b.g.updateMatrixWorld(true);
    const m = b.mao(1);
    pl.visible = true; pl.position.set(m[0], m[1], m[2]); pl.rotation.set(0, b.g.rotation.y, 0);
  }
  // o lance da vez em todas as plaquinhas da multidão
  const lanceMult = (v) => texMult.desenhar((c, w, h) => placaDesenho(c, w, h, v, '#2a2f3a'), 'm' + v);
  const lanceCaio = (v) => texCaio.desenhar((c, w, h) => placaDesenho(c, w, h, v, '#2f6fd6'), 'c' + v);
  const lanceRival = (v) => texRival.desenhar((c, w, h) => placaDesenho(c, w, h, v, '#d8352b'), 'r' + v);
  const telaoEm = (valor, vendido) => telao.desenhar((c, w, h) => telaoLance(c, w, h, { valor, vendido }), 't' + valor + (vendido ? 'v' : ''));
  // a multidão erguendo as plaquinhas em ondas (forca: o quanto ergue)
  function multidaoEm(tc, forca = 1) {
    multidao.forEach((m, i) => {
      const b = m.b;
      b.g.visible = true;
      b.colocar(m.p, [OLHA_DONA[0] + (m.p[0] - OLHA_DONA[0]) * 0.3, 1.5, OLHA_DONA[2]]);
      b.humor(i % 3 ? 'assustado' : 'bravo');
      const w = Math.max(0, Math.sin(tc * 5.2 + m.fase));
      placaNa(m.placa, b, K.lerp(0.35, 0.65 + 0.35 * w, forca));
      b.g.position.y = forca * Math.max(0, Math.sin(tc * 5.2 + m.fase)) * 0.06;
    });
  }
  // a dona da ótica no púlpito com o martelo. tBate: quando o martelo bate (ou null)
  function donaLeilao(tc, tBate, olhar) {
    dona.colocar(DONA_P, olhar || [Math.sin(tc * 1.6) * 2.5, 1.5, 0]);
    let alto = 0.4, giro = 0.5;
    if (tBate != null) {
      const d = tc - tBate;
      if (d > -0.4 && d < 0) { alto = K.lerp(0.4, 0.95, K.suave(pc(tc, tBate - 0.4, tBate - 0.1))); giro = K.lerp(0.5, -0.5, K.suave(pc(tc, tBate - 0.4, tBate - 0.1))); }
      else if (d >= 0) { const q = K.clamp(d / 0.08); alto = K.lerp(0.95, 0.12, q); giro = K.lerp(-0.5, 1.45, q); }
    }
    dona.apontar(alto);
    dona.humor(tBate != null && tc > tBate ? 'feliz' : 'surpreso');
    dona.g.updateMatrixWorld(true);
    const m = dona.mao(1);
    martelo.visible = true; martelo.position.set(m[0], m[1], m[2]); martelo.rotation.set(giro, 0, 0);
  }
  const cabecaMartelo = () => { martelo.updateMatrixWorld(true); return V(0, 0.44, 0).applyMatrix4(martelo.matrixWorld).toArray(); };
  function batida(tc, tBate) {
    if (tc < tBate) return;
    fx.onda.em(cabecaMartelo(), tc - tBate, { raio: 1.2 });
  }
  function caioNoLeilao(alto) {
    menino.colocar(CAIO, [OLHA_DONA[0] + 0.3, 1.5, OLHA_DONA[2]]);
    placaNa(placaCaio, menino, alto);
  }
  function rivalNoLeilao(alto) {
    rival.g.visible = true;
    rival.colocar(RIVAL, [0.4, 1.5, OLHA_DONA[2]]);
    placaNa(placaRival, rival, alto);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o leilão; a dona no púlpito com o martelo; a multidão erguendo plaquinhas; o telão com o lance · MOSTRA: multidao, placas, dona, martelo
      // CENÁRIO: palco_show (cortina, refletores, plateia no escuro)
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = B.inicio + 2.4;
      const tSo = Math.max(c3 + 0.1, quando('só', B, 0.92));
      // OBJETOS SE MEXENDO: o lance cai de R$ 800 pra 500 e 200 a cada corte; as plaquinhas trocam junto
      const v = tc < c1 ? 800 : tc < c2 ? 500 : 200;
      telaoEm(v); lanceMult(v); lanceCaio(v);
      // PERSONAGEM: a multidão erguendo em ondas; a dona olhando de um pro outro e batendo o martelo em "só"
      multidaoEm(tc, 1);
      caioNoLeilao(0.65 + 0.35 * Math.max(0, Math.sin(tc * 5 + 2)));
      menino.humor('assustado');
      donaLeilao(tc, tSo);
      batida(tc, tSo);
      // SONS: burburinho, bip a cada lance, o martelo
      K.som('zumbido', B.inicio, 0.25); K.som('bip', B.inicio + 0.05, 0.4); K.som('bip', c1, 0.4); K.som('bip', c2, 0.4);
      K.som('estalo', tSo, 0.9); K.som('estrondo', tSo + 0.02, 0.35);
      // CÂMERA: 4 cortes de ~0,8 s
      if (tc < c1) {
        // (1) plaquinhas R$ 800 de perto, de trás da dona, chegando
        const k = K.suave(pc(tc, B.inicio, c1));
        K.mirar([-1.2, K.lerp(3.8, 3.5, k), -4.7], [K.lerp(0.1, 0.4, k), 1.8, 0.1]);
      } else if (tc < c2) {
        // (2) o telão R$ 500 com as plaquinhas na frente, subindo
        const k = K.suave(pc(tc, c1, c2));
        K.mirar([1.2, K.lerp(2.0, 2.6, k), 5.5], [0, 3.4, -4.85]);
      } else if (tc < c3) {
        // (3) a cara da multidão erguendo R$ 200, passando
        const k = K.suave(pc(tc, c2, c3));
        K.mirar([K.lerp(-4.6, -3.6, k), 2.9, -3.8], [K.lerp(-0.6, 0.4, k), 1.8, -0.5]);
      } else {
        // (4) aberto: a dona bate o martelo, a multidão inteira na frente, afastando
        const k = K.suave(pc(tc, c3, B.ate + 0.3));
        K.mirar([K.lerp(5.4, 6.0, k), 3.6, K.lerp(-4.5, -4.2, k)], [0.7, 1.5, -2.5]);
        fx.et.oitenta.em([-1.6, 3.2, -0.5], tc - c3);
      }
    },
    disputa(B, tc) {
      // NA TELA: o quarto; o Caio no computador; o site de freela com as propostas subindo · em "grupo": o grupo e os balões · MOSTRA: personagem, monitor
      const tW = quando('designer', B, 0.2), tPj = quando('projeto', B, 0.4), tG = quando('grupo', B, 0.7), tF = quando('Facebook', B, 0.85);
      ve(comp, foneMesa);
      // PERSONAGEM: digitando rápido · em "Facebook": coça a cabeça
      sentado(MONITOR);
      if (tc > tF) menino.reagir('coca_cabeca', tc - tF); else menino.reagir('digitando', tc);
      // OBJETOS SE MEXENDO: as propostas subindo; em "grupo" o grupo e os comentários subindo
      if (tc < tG) { const n = Math.min(87, Math.round(12 + 75 * K.suave(pc(tc, tPj - 0.3, tG)))); comp.tela.desenhar((c, w, h) => freela(c, w, h, { n }), 'f' + n); }
      else { const n = Math.min(64, Math.round(3 + 61 * pc(tc, tG, B.ate))); comp.tela.desenhar((c, w, h) => grupo(c, w, h, { n }), 'g' + n); }
      // EFEITOS VISUAIS: "Web designer" em "designer" · "87 propostas" em "projeto" · os balões em "grupo"
      if (tc < tPj) fx.et.web.em(cabecaDe(menino, 0.55), tc - tW); else if (tc < tG) fx.et.propostas.em(mais(MONITOR, [0.6, 0.85, 0.2]), tc - tPj);
      const TX = ['Faço por R$ 300!', 'Faço por R$ 250!', 'Eu faço!'], PS = [[-1.35, 2.1, -1.1], [0.35, 2.3, -1.1], [-0.5, 2.65, -1.2]];
      baloes.forEach((bf, i) => { const t0 = tG + i * 0.3; if (tc > t0) bf.em(PS[i], tc - t0, { texto: TX[i], lado: i % 2 ? 1 : -1 }); });
      // SONS: cliques, bip a cada balão
      for (let k = 0; k < 8; k++) K.som('clique', B.inicio + 0.1 + k * 0.15, 0.25);
      for (let i = 0; i < 3; i++) K.som('bip', tG + i * 0.3, 0.35);
      // CÂMERA: (1) chegando · perto · direita · olho · (2) em "grupo": passando · médio · esquerda, com os balões
      const cv = (tPj + tG) / 2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 22, altura: 'olho', tam: 1.3 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, mais(MONITOR, [0, 0.9, 0])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.9 });
    },
    rival(B, tc) {
      // NA TELA: o leilão; o Caio erguendo R$ 200; o rival ergue R$ 150 em "levou"; o martelo bate em "cinquenta" e o telão vira VENDIDO · MOSTRA: personagem, rival, martelo
      const tBa = quando('barato', B, 0.3), tDe = quando('Dessa', B, 0.4), tLe = quando('levou', B, 0.55), tCi = quando('cinquenta', B, 0.85);
      const vendeu = tc > tCi;
      telaoEm(tc < tLe ? 200 : 150, vendeu); lanceMult(200); lanceCaio(200); lanceRival(150);
      multidaoEm(tc, vendeu ? 0.25 : 1);
      // PERSONAGEM: o Caio erguendo, confiante · em "cinquenta": triste. O rival ergue em "levou" e comemora
      caioNoLeilao(vendeu ? 0.2 : 0.95);
      if (vendeu) { menino.humor('triste'); menino.cabeca.rotation.x = 0.25; } else menino.humor('bravo');
      if (tc < tLe) { rivalNoLeilao(0.3); rival.humor('feliz'); }
      else if (!vendeu) { rivalNoLeilao(1); rival.humor('feliz'); rival.g.position.y = rival.pular(K.clamp((tc - tLe) / 0.5), 0.35); placaNa(placaRival, rival, 1); }
      else { rivalNoLeilao(1); rival.reagir('vitoria', tc - tCi); placaNa(placaRival, rival, 1); }
      donaLeilao(tc, tCi, tc > tLe ? cabecaDe(rival, -1.3) : null);
      batida(tc, tCi);
      // EFEITOS VISUAIS: "Mais barato" em "barato" · ✗ em cima do Caio em "cinquenta"
      if (tc < tDe) fx.et.barato.em([2.4, 3.1, -1.5], tc - tBa);
      if (vendeu) fx.simb.em(cabecaDe(menino, 0.45), tc - tCi, { tipo: '✗', tam: 0.7 });
      // SONS: bip do lance, o martelo, errado
      K.som('zumbido', B.inicio, 0.2); K.som('bip', tLe, 0.5); K.som('estalo', tCi, 0.9); K.som('errado', tCi + 0.15, 0.5);
      // CÂMERA: (1) o Caio e a placa · (2) em "Dessa": o rival erguendo, subindo · (3) em "cinquenta": a dona, o martelo, o rival e o Caio
      if (tc < tDe) { const k = K.suave(pc(tc, B.inicio, tDe)); K.mirar([K.lerp(3.2, 2.8, k), 2.8, -4.6], [0.6, 1.6, -1.5]); }
      else if (tc < tCi) { const k = K.suave(pc(tc, tDe, tCi)); K.mirar([4.4, K.lerp(1.7, 2.3, k), -4.4], [1.2, 1.9, -1.5]); }
      else { const k = K.suave(pc(tc, tCi, B.ate)); K.mirar([K.lerp(5.6, 6.1, k), 3.2, K.lerp(-4.4, -4.1, k)], [0.7, 1.5, -2.5]); }
    },
    larga(B, tc) {
      // NA TELA: a plaquinha do Caio cai no chão; ele vira e sai do leilão; atrás, a multidão continua e o lance segue caindo · MOSTRA: personagem, placa_caio, multidao
      const tPl = quando('plaquinha', B, 0.3), tBr = quando('brigar', B, 0.6), tNi = quando('ninguém', B, 0.85);
      const v = tc < tBr ? 130 : 100;
      telaoEm(v); lanceMult(v); lanceCaio(200);
      multidaoEm(tc, 1);
      donaLeilao(tc, null);
      rival.g.visible = false;
      const tSolta = B.inicio + 0.25;
      if (tc < tBr) {
        // PERSONAGEM: olha a placa e abre a mão; em "plaquinha", tem a ideia
        menino.colocar(CAIO, [0.6, 1.5, 3]);
        if (tc > tPl) menino.reagir('ideia', tc - tPl); else menino.humor('triste');
        // OBJETOS SE MEXENDO: a placa escorrega da mão e cai deitada no chão
        const q = K.clamp((tc - tSolta) / 0.45), m = menino.mao(1);
        placaCaio.visible = true;
        placaCaio.position.set(m[0] + 0.1, K.lerp(m[1], 0.02, q * q), m[2] + 0.25 * q);
        placaCaio.rotation.set(-PI / 2 * q, menino.g.rotation.y, 0.3 * q);
        if (q >= 1) K.som('estalo', tSolta + 0.45, 0.5);
        fx.et.fora.em(cabecaDe(menino, 0.6), tc - tPl);
        // CÂMERA: (1) perto, no Caio e na placa caindo, descendo
        const k = K.suave(pc(tc, B.inicio, tBr));
        K.mirar([2.6, K.lerp(2.8, 2.1, k), -4.6], [0.5, K.lerp(1.5, 0.8, k), -1.5]);
      } else {
        // PERSONAGEM: anda decidido pra fora do leilão, pra frente do palco
        const pos = menino.irPara([0.6, 0, -2.0], [5.2, 0, -2.0], pc(tc, tBr - 0.1, B.ate + 0.3), tc, { reto: true });
        menino.humor('feliz');
        placaCaio.visible = true; placaCaio.position.set(0.55, 0.02, -1.25); placaCaio.rotation.set(-PI / 2, 0, 0.3);
        fx.vel.em(mais(pos, [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        fx.et.ninguem.em(mais(pos, [0.1, 2.0, 0]), tc - tNi);
        K.som('whoosh', tBr, 0.5); K.som('passo', tBr + 0.2, 0.3); K.som('passo', tBr + 0.5, 0.3); K.som('passo', tBr + 0.8, 0.3);
        // CÂMERA: (2) de frente pra ele, andando junto, com o leilão atrás
        const p = menino.g.position;
        K.mirar([p.x + 4.2, 2.4, p.z - 2.2], [p.x - 0.8, 1.4, p.z + 0.4]);
      }
    },
    investe(B, tc) {
      // NA TELA: o quarto; o Caio de pé com o lanche; em "sistema" o lanche voa pro monitor; a tela acende · MOSTRA: personagem, lanche, monitor
      const tI = quando('investir', B, 0.15), tL = quando('lanche', B, 0.3), tS = quando('sistema', B, 0.45), tPr = quando('precisa', B, 0.65), tO = quando('oferecendo', B, 0.92);
      ve(comp, lanche, foneMesa);
      const k = pc(tc, tS, tS + 0.9);
      if (tc < tS + 0.6) comp.tela.desenhar(telaEscura, 'escura');
      else { const kk = Math.round(pc(tc, tS + 0.6, tO) * 8) / 8; comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: kk }), 'inv' + kk); }
      // PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "oferecendo": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [0.8, 1.3, 4]);
      if (tc > tO) menino.reagir('comemorando', tc - tO); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: o lanche na mão; em "sistema", voa girando até o monitor e some num poof
      const m = menino.mao(1);
      if (tc < tS) { lanche.position.set(m[0] + 0.05, m[1] - 0.05, m[2] + 0.12); lanche.rotation.set(0.2, tc, 0); lanche.scale.setScalar(1.8 * pop(tc - tI)); }
      else { const q = K.suave(k); lanche.position.set(K.lerp(m[0], MONITOR[0] + 0.2, q), K.lerp(m[1], MONITOR[1] + 0.1, q) + Math.sin(q * PI) * 0.5, K.lerp(m[2], MONITOR[2] + 0.15, q)); lanche.rotation.set(q * 2, q * 6, 0); lanche.scale.setScalar(1.8 * (1 - q * 0.85)); if (q >= 1) lanche.visible = false; }
      fx.poof.em(mais(MONITOR, [0.2, 0.1, 0.2]), tc - tS - 0.9, { escala: 0.8 });
      // EFEITOS VISUAIS: "Investimento" em "investir" · "Ninguém oferecendo" em "precisa"
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.oferece.em(mais(MONITOR, [0, 0.8, 0]), tc - tPr);
      K.som('ding', tL, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.9, 0.5); K.som('certo', tO, 0.5);
      // CÂMERA: (1) até "sistema": chegando · perto · direita · (2) passando · perto · no monitor
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), lanche.position.toArray()], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.8, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [lanche.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com sendo digitado; a lista SEM SITE das óticas de Aracaju sobe do computador · MOSTRA: navegador, tela, personagem
      const tC = quando('computador', B, 0.08), tDi = quando('digitou', B, 0.18), tL = quando('lista', B, 0.6), tOt = quando('óticas', B, 0.72), tAr = quando('Aracaju', B, 0.85);
      ve(comp, navG, foneMesa); comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tC, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.15 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tOt ? 1 + Math.floor((tc - tOt) / 0.2) : 0;
        telaC.mostrar('listaOticas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tOt + k * 0.2, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a primeira
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.aracaju.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tAr);
      // CÂMERA: (1) até a lista: chegando · perto · no endereço · (2) subindo · médio · frente
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'subindo', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a análise da Ótica Visão Clara; o robô à esquerda; o Caio à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseOtica', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · chamando · em "serviço": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) até "acha": chegando · médio · frente · baixo · (2) passando · médio · esquerda · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Caio espremido no leilão · (2) Agora: o calçadão, a loja ÓTICA; o Caio chega sozinho e a dona faz joia · MOSTRA: personagem, dona
      const tAg = quando('Agora', B, 0.5), tCh = quando('chega', B, 0.7), tSo = quando('sozinho', B, 0.88);
      if (tc < tAg) {
        telaoEm(90); lanceMult(90); lanceCaio(90);
        multidaoEm(tc, 1);
        caioNoLeilao(0.65 + 0.3 * Math.max(0, Math.sin(tc * 5)));
        menino.humor('assustado');
        donaLeilao(tc, null);
        fx.et.brigando.em([0.45, 3.0, -1.5], tc - B.inicio - 0.2);
        K.som('zumbido', B.inicio, 0.3); K.som('errado', B.inicio + 0.4, 0.35);
        // CÂMERA: (1) de trás da dona, afastando
        const k = K.suave(pc(tc, B.inicio, tAg));
        K.mirar([K.lerp(-3.4, -4.4, k), 3.0, K.lerp(-4.0, -4.6, k)], [0.45, 1.7, -1.5]);
      } else if (tc < tSo) {
        // o calçadão: ele anda rápido, sozinho; a dona da ótica lá na frente
        menino.irPara([0.85, 0, DZ + 9], [0.85, 0, DZ + 2.6], K.clamp((tc - tAg + 0.2) / (tSo - tAg + 0.2)), tc, { reto: true });
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        // a dona fica atrás da câmera do herói: aparece quando ele chega
        K.som('whoosh', tAg, 0.5); K.som('passo', tAg + 0.2, 0.3); K.som('passo', tAg + 0.45, 0.3);
        // CÂMERA: (2) anda junto, de frente pra ele, com a dona atrás
        K.heroi(menino, pc(tc, tAg, tSo), { dist: 5.2, lado: 8, altura: 0.5, olhar: 2.0 });
      } else {
        // ele chega com a análise; ela faz joia
        menino.colocar([0.85, 0, DZ + 1.3], cabecaDe(dona, -1.3));
        dona.colocar(DONA_R, cabecaDe(menino, -1.3));
        dona.reagir('vitoria', tc - tSo);
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.25, m[1] + 0.5, m[2] - 0.05); telaM.g.rotation.set(0, -0.9, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tSo + 0.2));
        telaM.mostrar('analiseOtica', { ate: 2, score: 1 });
        menino.reagir('mostrando', tc - tSo);
        fx.simb.em(mais(DONA_R, [0.5, 2.6, 0.6]), tc - tSo, { tipo: '✓', tam: 1.1 });
        fx.et.sozinho.em(mais(DONA_R, [0.5, 3.4, 0.6]), tc - tSo);
        K.som('certo', tSo, 0.6);
        // CÂMERA: (3) passando · médio · esquerda
        K.filmar([menino, dona, mais(DONA_R, [0.5, 2.9, 0.6])], 'passando', pc(tc, tSo, B.ate), { plano: 'medio', lado: -30, altura: 'olho', tam: 2.6 });
      }
      void tCh;
    },
    segue(B, tc) {
      // NA TELA: o quarto; "Comenta a sua cidade" no topo e o pino; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tCi = quando('cidade', B, 0.12), tSg = quando('segue', B, 0.3), tPc = quando('computador', B, 0.45), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.85);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, foneMesa); comp.tela.desenhar(siteDemo, 'demo');
      if (tc < tPc) {
        ve(pino); const q = K.clamp((tc - tCi) / 0.5); pino.visible = tc > tCi;
        pino.position.set(1.05, K.lerp(3.6, 1.75, K.saiVolta(q)), 0.25); pino.rotation.y = tc * 1.5;
        fx.et.cidade.em([1.05, 2.75, 0.25], tc - tCi - 0.3);
        K.som('estalo', tCi, 0.5);
      }
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: chamando (aponta pra quem assiste) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando · médio · frente · (2) parado · aberto · frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), [1.05, 2.0, 0.25]], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo, foneMesa); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a multidão erguendo as plaquinhas, a dona de costas com o martelo no alto e o Caio de frente, mão na testa
      telaoEm(200); lanceMult(200); lanceCaio(200);
      multidaoEm(0.3, 1);
      menino.colocar(CAIO, [1.3, 2.2, -4.6]);
      menino.reagir('mao_na_testa', 0.8);
      donaLeilao(0, 0.2);
      dona.apontar(0.95); dona.g.updateMatrixWorld(true);
      { const m = dona.mao(1); martelo.position.set(m[0], m[1], m[2]); martelo.rotation.set(-0.5, 0, 0); }
      K.mirar([1.5, 2.5, -4.6], [0.4, 1.6, -1.5]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'leilao' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; b.g.position.y = 0; });
    multidao.forEach((m) => { m.b.g.visible = false; m.b.g.position.y = 0; });
    tudo.forEach((g) => { g.visible = false; });
    [placaCaio, placaRival, martelo].forEach((g) => { g.visible = false; });
    placas.forEach((g) => { g.visible = false; });
    menino.cabeca.rotation.x = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    lanche.scale.setScalar(1.8); lanche.rotation.set(0, 0, 0);
    const lug = plano === 'capa' ? 'leilao' : lugarDe(B, tc);
    if (lug === 'leilao') { ve(pulpito); placas[0].parent.visible = true; }
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
