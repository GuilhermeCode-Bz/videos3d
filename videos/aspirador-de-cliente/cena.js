// Você ligou o aspirador de cliente no máximo (canal Mappoa).
// O Davi segura o bocal do aspirador gigante (K.m3d('aspirador_gigante'), canal/pecas/objetos-aspirador.js) e vem de
// tudo voando: folhas, uma bota, o gato e o primo. Depois o aspirador "devolve" o primo pedindo de graça, um site pronto
// e um "quanto é?" que some. O rival vai direto no lava-jato sem site e fecha. Quatro lugares (K.cenarios): o quarto do
// Davi, o calçadão com a loja LAVA-JATO, o lava-jato por dentro (a oficina com a placa trocada) e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, primo, dono, dono2, rival, robo, gato, comp, telaC, telaM, navG, FOV0;
  let asp, A, bota, folhas, siteVoa, nota, moeda, contrato, carimbo, cadeira, placaRua, placaOf, carroE, espuma;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, q) => [K.lerp(a[0], b[0], q), K.lerp(a[1], b[1], q), K.lerp(a[2], b[2], q)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  // A cena do aspirador (o computador some): o Davi no meio do tapete, olhando pra esquerda, de onde a tralha vem voando
  const DV = [0.5, 0, 0.7], DE_ONDE = [-4.2, 1.9, 2.6], ASP = [2.0, 0, 0.1];
  // O aspirador desligado no canto (nas outras frases do quarto)
  const ASP_CANTO = [2.6, 0, -1.4], BOC_CANTO = [2.0, 0.14, -0.55];
  // Rua: a loja que vira LAVA-JATO; o dono na frente dela
  let DZ = -5, LX = -3.6, lojaRua = null;
  // Lava-jato por dentro (a oficina): o carro com espuma, o Davi, o dono do Lava Rápido Pantanal
  const CARRO = [1.2, 0, -0.9], DAVI_L = [-0.6, 0, 1.2], DONO2_L = [-1.7, 0, 0.5];

  const LUGAR = {
    gancho: 'quarto', dispara: 'quarto', tralha: 'quarto', rival: 'rua', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', segue: 'quarto', cartao: 'quarto', capa: 'quarto'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'virada') return tc < quando('ir', B, 0.5) - 0.05 ? 'quarto' : 'rua';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'quarto' : 'lava';
    return LUGAR[B.plano] || 'quarto';
  }

  // O Lava-Jato Brilho Total já fechou com o rival: na lista SEM SITE entram os outros
  const LAVAS = [
    { nome: 'Lava Rápido Pantanal', end: 'Av. Miguel Sutil, 4120', chips: ['whats', 'insta'] },
    { nome: 'Auto Spa Coxipó', end: 'Av. Fernando Corrêa, 2210', chips: ['tel', 'insta'] },
    { nome: 'Lava-Jato do Porto', end: 'Rua 13 de Junho, 980', chips: ['whats'] },
    { nome: 'Espuma Cuiabana', end: 'Av. Rubens de Mendonça, 1550', chips: ['whats', 'tel'] }
  ];

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

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Davi Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'portfólio', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // O disparo em massa: "Enviando 'faço sites'" e a barra enchendo
  function disparo(c, w, h, e) {
    c.fillStyle = '#0f1724'; c.fillRect(0, 0, w, h);
    txt(c, 'Enviando “faço sites”…', w * 0.06, h * 0.18, w * 0.07, '#ffffff', 900, 'left', w * 0.9);
    rr(c, w * 0.06, h * 0.36, w * 0.88, h * 0.12, h * 0.06, '#26324a');
    rr(c, w * 0.06, h * 0.36, Math.max(h * 0.12, w * 0.88 * e.k), h * 0.12, h * 0.06, '#25d366');
    txt(c, `${Math.round(500 * e.k)} / 500 contatos`, w * 0.06, h * 0.62, w * 0.06, '#cfd8e6', 800);
    for (let i = 0; i < 3; i++) { rr(c, w * 0.06, h * (0.72 + i * 0.08), w * (0.5 + 0.12 * i), h * 0.045, 6, '#1f2a3d'); }
  }
  // O mapa da ferramenta: os pinos de quem precisa de site
  function mapa(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    [0.3, 0.7].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * (x - 0.05), h); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Quem precisa de site', w * 0.05, h * 0.066, w * 0.05, '#fff', 800, 'left', w * 0.9);
    const P = [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]];
    P.slice(0, e.n || 0).forEach(([x, y]) => {
      const px = w * x, py = h * y, r = w * 0.04;
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
    });
  }
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }
  function placa(texto, l, a) {
    return folha(l, a, 640, (c, w, h) => {
      rr(c, 0, 0, w, h, h * 0.18, '#1f8fd6');
      c.strokeStyle = '#ffffff'; c.lineWidth = h * 0.06; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, h * 0.14); c.stroke();
      txt(c, texto, w / 2, h / 2 + 2, h * 0.5, '#ffffff', 900, 'center', w * 0.9);
      [[0.08, 0.3], [0.92, 0.7], [0.12, 0.75]].forEach(([x, y]) => { c.fillStyle = 'rgba(255,255,255,.8)'; c.beginPath(); c.arc(w * x, h * y, h * 0.07, 0, PI * 2); c.fill(); });
    });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['rua_predios', {}, 'rua'], ['oficina', {}, 'lava'], 'mundo_mappoa']);
    // a loja do calçadão que vira LAVA-JATO: a primeira do lado esquerdo perto do meio; o dono fica logo depois de uma
    // árvore da direita (z = 26 - 14k + 0,5)
    const Cr = CS.todos.rua;
    const lojas = (Cr.lojas || []).filter((l) => l.lado < 0 && l.porta[2] < 8 && l.porta[2] > -26);
    lojas.sort((a, b) => Math.abs(a.porta[2] + 5) - Math.abs(b.porta[2] + 5));
    lojaRua = lojas[0] || (Cr.lojas || [])[0];
    if (lojaRua) { DZ = lojaRua.porta[2]; LX = lojaRua.porta[0]; }
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    if (lojaRua) {
      // placa de poste do lava-jato, logo atrás do dono, de frente pra quem olha o calçadão (+z)
      placaRua = new THREE.Group();
      const pf = placa('LAVA-JATO', 1.7, 0.5); pf.position.y = 2.45; placaRua.add(pf);
      const poste = K.malha(new THREE.CylinderGeometry(0.04, 0.05, 2.25, 12), K.mat(0x3b4048, { metalness: 0.4 }));
      poste.position.y = 1.12; placaRua.add(poste);
      placaRua.position.set(-2.45, 0, DZ - 0.6);
      K.scene.add(placaRua); K.nomear('loja_lavajato', placaRua); tudo.push(placaRua);
    }
    // a placa OFICINA vira LAVA-JATO
    placaOf = placa('LAVA-JATO', 2.3, 0.6); placaOf.position.set(-2.2, 3.8, -4.54);
    K.scene.add(placaOf); tudo.push(placaOf);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaLavas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: LAVAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Lava-jatos · Cuiabá, MT', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseLava = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Lava Rápido Pantanal', ate: e.ate, aderencia: 0.9 * k,
        dores: ['Sem site, orçamento só pelo WhatsApp', 'Ninguém acha o preço da lavagem'], oportunidades: ['Site com serviços, preços e horário pra agendar a lavagem'],
        objecoes: ['"Meu cliente é do bairro"'], abordagem: 'Mostre quem procura lava-jato perto e não acha o preço.'
      });
      if (e.ate >= 0) txt(c, Math.round(90 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Davi (do canal), o primo, o dono do Brilho Total, o dono do Lava Rápido Pantanal, o rival e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    primo = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf5c518, bermuda: 0x3a3f4a, tenis: 0xe8352b, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(primo.g); K.nomear('primo', primo.g);
    dono = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf39a1e, bermuda: 0x2a3a5a, tenis: 0x2a2f3a, cabelo: 0x3a2414, pele: 0xc98a5e } }); K.semNome(dono.g); K.nomear('dono', dono.g);
    dono2 = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2fb54a, bermuda: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x5a3a22, pele: 0xe0a77c } }); K.semNome(dono2.g); K.nomear('dono2', dono2.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');
    gato = K.gato(); K.nomear('gato', gato.g);

    // O aspirador gigante
    asp = K.m3d('aspirador_gigante', { texto: 'CLIENTES' }); A = asp.userData.m3d; guarda(asp, 'aspirador', ASP);
    // A tralha que voa: a bota, as folhas e o site pronto
    bota = new THREE.Group();
    const couro = K.mat(0x7a4a22, { roughness: 0.8 });
    const cano = K.malha(new THREE.BoxGeometry(0.16, 0.3, 0.18), couro); cano.position.y = 0.2; bota.add(cano);
    const pe = K.malha(new THREE.BoxGeometry(0.17, 0.11, 0.34), couro); pe.position.set(0, 0.055, 0.08); bota.add(pe);
    const sola = K.malha(new THREE.BoxGeometry(0.18, 0.03, 0.36), K.mat(0x2a2016)); sola.position.set(0, 0.0, 0.08); bota.add(sola);
    guarda(bota, 'bota');
    folhas = [0x4caf50, 0x7cb342, 0x388e3c, 0x9ccc65].map((cor) => {
      const f = K.malha(new THREE.CircleGeometry(0.11, 14), K.mat(cor, { side: THREE.DoubleSide }), false); f.scale.set(1, 0.55, 1);
      K.scene.add(f); tudo.push(f); return f;
    });
    siteVoa = folha(0.9, 0.58, 480, (c, w, h) => {
      rr(c, 0, 0, w, h, 16, '#1b2230'); siteDemo(c, w, h * 0.92);
      txt(c, 'Já tenho site!', w / 2, h * 0.72, w * 0.1, '#e8352b', 900, 'center');
    });
    K.scene.add(siteVoa); tudo.push(siteVoa);

    // Quarto: o computador, a nota de "1 lavagem" e a moeda, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    nota = folha(0.42, 0.22, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#5fb86a'); c.strokeStyle = '#2f7a3a'; c.lineWidth = 6; c.beginPath(); c.roundRect(8, 8, w - 16, h - 16, 10); c.stroke();
      txt(c, '1 LAVAGEM', w * 0.58, h * 0.5, h * 0.24, '#ffffff', 900, 'center');
      // o carrinho com espuma
      rr(c, w * 0.08, h * 0.45, w * 0.22, h * 0.2, 8, '#2f6fd6'); rr(c, w * 0.12, h * 0.33, w * 0.13, h * 0.14, 6, '#2f6fd6');
      [0.13, 0.25].forEach((x) => { c.fillStyle = '#1b1d22'; c.beginPath(); c.arc(w * x, h * 0.68, h * 0.06, 0, PI * 2); c.fill(); });
      [[0.1, 0.28], [0.18, 0.22], [0.27, 0.3]].forEach(([x, y]) => { c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w * x, h * y, h * 0.07, 0, PI * 2); c.fill(); });
    });
    K.scene.add(nota); K.nomear('nota', nota); tudo.push(nota);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 }));
    K.scene.add(moeda); tudo.push(moeda);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Rua: o contrato do rival com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Lava-Jato Brilho Total', w / 2, h * 0.22, w * 0.055, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    K.scene.add(contrato); K.nomear('contrato', contrato); tudo.push(contrato);

    // Lava-jato: o carro coberto de espuma
    carroE = new THREE.Group();
    const car = K.carro(0x2fb5a6); const carG = car.g || car; carG.scale.setScalar(1.35); carroE.add(carG);
    espuma = [];
    const r = K.rand(9), matE = K.mat(0xffffff, { roughness: 0.9 });
    for (let i = 0; i < 26; i++) {
      const b = K.malha(new THREE.SphereGeometry(0.09 + r() * 0.12, 12, 10), matE, false);
      b.position.set((r() - 0.5) * 2.4, 0.75 + r() * 0.55, (r() - 0.5) * 1.0); carroE.add(b); espuma.push({ b, y: b.position.y, f: r() * 6 });
    }
    carroE.rotation.y = 0.35;
    guarda(carroE, 'carro_espuma', CARRO);

    // Efeitos
    fx.fala = K.balaoFala(); fx.fala2 = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    fx.vento = K.folhasVento(77, 40, { papel: true });
    fx.cont = K.contador();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      aspirador: e('Aspirador de cliente', 'vermelho'), web: e('Web designer', 'azul'), jaTem: e('Já tem site', 'vermelho'),
      outro: e('Outro web designer', 'vermelho'), semSite: e('Sem site', 'vermelho'), todo: e('Todo mundo', 'vermelho'), precisa: e('Precisa de você', 'verde'),
      investir: e('Investir', 'azul'), cuiaba: e('Cuiabá', 'azul'), quemPrecisa: e('Quem precisa de você', 'verde'), direto: e('Direto no cliente', 'verde'),
      absurda: e('A mais absurda?', 'laranja')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual a proposta <em>mais absurda</em>?');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  // O aspirador no meio do quarto, com o Davi segurando o bocal apontado pra esquerda (de onde vem a tralha)
  function aspiradorLigado(tc, forca) {
    ve(asp);
    const d = [DV[0] - ASP[0], DV[2] - ASP[2]];
    asp.position.set(...ASP); asp.rotation.set(0, Math.atan2(d[0], d[1]), 0);
    menino.colocar(DV, [DE_ONDE[0], 1.0, DE_ONDE[2]]);
    const f = V(DE_ONDE[0] - DV[0], 0, DE_ONDE[2] - DV[2]).normalize();
    const boc = [DV[0] + f.x * 0.62, 1.0, DV[2] + f.z * 0.62];
    A.bocal(boc, DE_ONDE);
    if (forca > 0) A.ligar(tc, forca);
    return A.boca();
  }
  // O aspirador desligado no canto, com o bocal no chão
  function aspiradorCanto() {
    ve(asp); asp.position.set(...ASP_CANTO); asp.rotation.set(0, -PI / 2 + 0.5, 0);
    A.bocal(BOC_CANTO, [BOC_CANTO[0] - 0.3, 0.05, BOC_CANTO[2] + 1.2]);
  }
  // Algo voando de um ponto até a boca do bocal, girando (q de 0 a 1); no fim some lá dentro
  function voa(obj, q, de, ate, giro = 1, arco = 0.5) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (q <= 0 || q >= 1) { g.visible = false; return; }
    g.visible = true;
    const p = lerp3(de, ate, K.suave(q)); p[1] += Math.sin(q * PI) * arco;
    g.position.set(...p);
    g.rotation.set(q * 7 * giro, q * 5 * giro, q * 3);
    g.scale.setScalar(q > 0.85 ? K.lerp(1, 0.3, (q - 0.85) / 0.15) : 1);
  }
  // A tralha do gancho: folhas, a bota, o gato e o primo entalado no bocal
  function tralhaVoando(tc, t0, boca, primoFica = true) {
    folhas.forEach((f, i) => voa(f, pc(tc, t0 + i * 0.18, t0 + i * 0.18 + 0.7), mais(DE_ONDE, [0, -0.4 + i * 0.25, i * 0.3]), boca, 1.5));
    voa(bota, pc(tc, t0 + 0.3, t0 + 1.0), mais(DE_ONDE, [0, 0.2, -0.4]), boca, 1);
    const qg = pc(tc, t0 + 0.55, t0 + 1.3);
    if (qg > 0 && qg < 1) { const p = lerp3(mais(DE_ONDE, [0, 0.4, 0.4]), boca, K.suave(qg)); p[1] += Math.sin(qg * PI) * 0.6; gato.em(p, tc, { giro: qg * 9, abre: 1, escala: qg > 0.85 ? 0.6 : 1 }); }
    else gato.esconder();
    // o primo vem girando e fica entalado na frente do bocal, acenando
    const qp = pc(tc, t0 + 0.8, t0 + 1.6);
    if (qp > 0) {
      ve(primo);
      const fim = mais(boca, [-0.35, -0.95, 0.15]);
      if (qp < 1 || !primoFica) {
        // o MEIO do corpo segue o caminho (o pé é a origem do boneco): gira em estrela, de lado pra câmera
        const c = lerp3(mais(DE_ONDE, [0, 0.1, 0]), mais(fim, [0, 0.75, 0]), K.suave(qp)); c[1] += Math.sin(qp * PI) * 0.5;
        primo.g.rotation.set(0, 0.3, (1 - qp) * 5);
        const up = V(0, 0.75, 0).applyEuler(primo.g.rotation);
        primo.g.position.set(c[0] - up.x, c[1] - up.y, c[2] - up.z);
        primo.reagir('susto', tc - t0);
      } else {
        primo.colocar(fim, cabecaDe(menino, -0.3)); primo.g.rotation.z = 0.25; primo.acenar(tc); primo.humor('feliz');
      }
      return qp >= 1;
    }
    return false;
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o quarto; o Davi segurando o bocal do aspirador gigante; folhas, bota, gato e o primo vindo voando · MOSTRA: aspirador, personagem, primo
      const tAs = quando('aspirador', B, 0.25), tMx = quando('máximo', B, 0.5), tVe = quando('veio', B, 0.9);
      // ENTRA AGORA / OBJETOS SE MEXENDO: o botão MÁX acende em "máximo" e o corpo treme cada vez mais
      const forca = tc < tMx ? 0.35 : 1;
      const boca = aspiradorLigado(tc, forca);
      const chegou = tralhaVoando(tc, tMx - 0.1, boca);
      // PERSONAGEM: firme, puxando o bocal, confiante · em "veio": arregala os olhos e é puxado pra trás
      if (tc < tVe) { menino.reagir('segurando', tc - B.inicio); menino.humor('feliz'); }
      else { menino.reagir('susto', tc - tVe); menino.g.position.x += 0.12 * K.suave(pc(tc, tVe, tVe + 0.3)); }
      // EFEITOS VISUAIS: "Aspirador de cliente" · o vento · ✗ no primo entalado
      // (sem etiqueta aqui: o topo já tem a pergunta "Aspirador de cliente?" e embaixo vai a legenda)
      fx.vento.em(mais(DE_ONDE, [2.2, 0, -0.8]), tc, { rumo: Math.atan2(DV[2] - DE_ONDE[2], DV[0] - DE_ONDE[0]), forca: tc > tMx ? 1 : 0.3 });
      if (chegou) fx.simb.em(cabecaDe(primo, 0.4), tc - (tMx + 1.5), { tipo: '✗', tam: 0.8 });
      // SONS
      K.som('estalo', B.inicio, 0.4); K.som('vapor', tMx - 0.1, 0.5, 2.2); K.som('whoosh', tMx + 0.2, 0.4); K.som('baque', tMx + 0.95, 0.5); K.som('whoosh', tMx + 0.8, 0.4);
      // CÂMERA: 3 cortes: (1) o botão MÁX acendendo · (2) o Davi segurando o bocal · (3) aberto: o aspirador, o Davi e a tralha
      const c1 = Math.min(tMx + 0.3, B.inicio + 1.4), c2 = Math.min(c1 + 0.9, B.ate - 0.9);
      const bt = asp.position.toArray(); bt[1] = 1.0;
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([bt[0] + 1.1, 1.75, bt[2] + K.lerp(2.6, 2.2, q)], [bt[0] - 0.4, 1.05, bt[2]]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(-1.4, -1.2, q), 1.55, DV[2] + 3.1], [DV[0] - 0.3, 1.15, DV[2]]); }
      else { const q = K.suave(pc(tc, c2, B.ate)); K.mirar([K.lerp(1.5, 1.3, q), 2.4, K.lerp(10.2, 9.6, q)], [0.35, 1.25, 0.4]); }
    },
    dispara(B, tc) {
      // NA TELA: o Davi sentado no computador; a tela "Enviando 'faço sites'…" e a barra; o contador 0 → 500 · MOSTRA: personagem, monitor
      const tW = quando('designer', B, 0.12), tMa = quando('mandou', B, 0.3), tQu = quando('quinhentos', B, 0.55), tVz = quando('vez', B, 0.95);
      ve(comp); aspiradorCanto();
      sentado(MONITOR);
      // PERSONAGEM: digitando · em "vez": bate na mesa, satisfeito
      if (tc > tVz) { menino.reagir('bate_mesa', tc - tVz); menino.humor('feliz'); } else menino.reagir('digitando', tc);
      const k = K.clamp((tc - tMa) / Math.max(0.5, tVz - tMa));
      if (tc < tMa) comp.tela.desenhar(siteDemo, 'demo');
      else comp.tela.desenhar((c, w, h) => disparo(c, w, h, { k }), 'd' + Math.round(k * 40));
      // OBJETOS SE MEXENDO: os papéis de mensagem saindo voando do computador
      if (tc > tMa) fx.vento.em(mais(MONITOR, [0.3, 0.9, 0.4]), tc, { rumo: 0.6, forca: 0.8 });
      // EFEITOS VISUAIS: "Web designer" · o contador
      fx.et.web.em(cabecaDe(menino, 0.55), tc - tW);
      fx.cont.em(mais(MONITOR, [0, 0.95, 0.1]), tc - tQu, { de: 0, ate: 500, dur: Math.max(0.6, tVz - tQu), depois: ' mensagens' });
      // SONS
      for (let i = 0; i < 8; i++) K.som('clique', B.inicio + 0.1 + i * 0.15, 0.25);
      for (let i = 0; i < 4; i++) K.som('whoosh', tMa + 0.2 + i * 0.35, 0.15);
      K.som('ding', tVz, 0.4);
      // CÂMERA: (1) chegando · perto · direita · olho · (2) afastando · médio · esquerda · olho, com o contador no alvo
      const cv = (tW + tQu) / 2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.4 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, mais(MONITOR, [0, 1.0, 0])], 'afastando', pc(tc, cv, B.ate), { plano: 'medio', lado: -26, altura: 'olho', tam: 2.1 });
    },
    tralha(B, tc) {
      // NA TELA: o aspirador ligado; do bocal saem o primo ("Faz de graça?"), um site pronto que bate na cara dele e um "quanto é?" que estoura · MOSTRA: aspirador, primo, personagem
      const tPr = quando('primo', B, 0.12), tSi = quando('site', B, 0.55), tQu = quando('quanto', B, 0.72), tSu = quando('sumiu', B, 0.92);
      const boca = aspiradorLigado(tc, 0.6);
      // no chão, a tralha que já veio: a bota e as folhas
      ve(bota); bota.position.set(DV[0] - 1.3, 0, DV[2] + 0.5); bota.rotation.set(0, 0.8, PI / 2);
      folhas.forEach((f, i) => { f.visible = true; f.position.set(DV[0] - 1.6 + i * 0.35, 0.01, DV[2] + 0.9 - i * 0.2); f.rotation.set(-PI / 2, 0, i); });
      // o primo é cuspido do bocal e cai sentado do lado do Davi
      ve(primo);
      const qp = pc(tc, tPr - 0.2, tPr + 0.35);
      const fimP = [DV[0] - 1.1, 0, DV[2] + 0.9];
      if (qp < 1) { const p = lerp3(mais(boca, [0, -0.8, 0]), fimP, K.suave(qp)); p[1] = Math.max(0, p[1] + Math.sin(qp * PI) * 0.6); primo.g.position.set(...p); primo.g.rotation.set(0, 0, (1 - qp) * 1.2); primo.reagir('susto', tc - tPr); }
      else { primo.colocar(fimP, cabecaDe(menino, -1.3)); primo.reagir('chamando', tc - tPr); primo.humor('feliz'); }
      fx.fala.em(cabecaDe(primo, 0.3), tc - tPr - 0.3, { texto: 'Faz de graça?', lado: -1 });
      // a tela do site pronto sai do bocal e bate na cara dele
      const qs = pc(tc, tSi - 0.35, tSi + 0.05);
      const rosto = cabecaDe(menino, -0.05);
      if (tc > tSi - 0.35 && tc < tQu + 0.1) {
        siteVoa.visible = true;
        const p = qs < 1 ? lerp3(boca, mais(rosto, [-0.25, 0, 0.1]), K.suave(qs)) : mais(rosto, [-0.25, -0.15 * pc(tc, tSi, tQu), 0.1]);
        siteVoa.position.set(...p); siteVoa.lookAt(K.camera.position); siteVoa.rotation.z += (1 - qs) * 3;
      }
      if (tc > tSi) fx.simb2.em(mais(rosto, [0.1, 0.55, 0]), tc - tSi, { tipo: '✗', tam: 0.7 });
      fx.et.jaTem.em(mais(rosto, [0, 0.95, 0]), tc - tSi);
      // o balão "quanto é?" sai do bocal, sobe e estoura em "sumiu"
      if (tc < tSu) fx.fala2.em(mais(boca, [0.1, 0.5 + 0.4 * pc(tc, tQu, tSu), 0]), tc - tQu, { texto: 'Quanto é?', lado: 1 });
      fx.poof.em(mais(boca, [0.1, 0.9, 0]), tc - tSu, { escala: 0.4 });
      // PERSONAGEM: segurando o bocal · em "site": cambaleia · em "sumiu": dá de ombros
      if (tc > tSu) { menino.reagir('ombros', tc - tSu); menino.humor('triste'); }
      else if (tc > tSi) { menino.reagir('susto', tc - tSi); menino.g.position.x += 0.1 * Math.sin(K.clamp((tc - tSi) / 0.4) * PI); }
      else menino.reagir('segurando', tc - B.inicio);
      // SONS
      K.som('vapor', B.inicio, 0.3, 1.2); K.som('estalo', tPr, 0.4); K.som('baque', tSi + 0.05, 0.6); K.som('estalo', tQu, 0.3); K.som('zap', tSu, 0.4);
      // CÂMERA: (1) chegando · médio · frente, o bocal e o Davi · (2) passando · médio · direita, pro balão
      const cv = (tSi + tQu) / 2 + 0.15;
      if (tc < cv) K.filmar([boca, menino, primo], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: -12, altura: 'olho', tam: 2.4 });
      else K.filmar([boca, mais(boca, [0, 0.9, 0]), menino], 'passando', pc(tc, cv, B.ate), { plano: 'medio', lado: 22, altura: 'olho', tam: 2.2 });
    },
    rival(B, tc) {
      // NA TELA: o calçadão; o rival anda reto até o dono na porta do LAVA-JATO; aperto de mão e o contrato FECHADO · MOSTRA: rival, dono, contrato
      const tDe = quando('designer', B, 0.3), tLa = quando('lava-jato', B, 0.6), tSi = quando('site', B, 0.75), tFe = quando('fechou', B, 0.9);
      const DONO_R = [-1.7, 0, DZ], RIV_A = [0.5, 0, DZ + 8.5], RIV_B = [-0.75, 0, DZ + 0.55];
      const kAnda = pc(tc, B.inicio, tLa + 0.15);
      rival.irPara(RIV_A, RIV_B, kAnda, tc, { reto: true });
      if (kAnda >= 1) { rival.colocar(RIV_B, cabecaDe(dono, -1.3)); rival.apontar(0.35); }
      rival.humor('feliz');
      dono.colocar(DONO_R, kAnda > 0.6 ? cabecaDe(rival, -1.3) : [4, 1.2, DZ + 6]); dono.humor('feliz');
      // PERSONAGEM: o dono segura o balde de espuma · em "fechou": joia
      if (tc > tFe) dono.reagir('vitoria', tc - tFe); else if (kAnda >= 1) dono.apontar(0.35); else dono.reagir('segurando', tc - B.inicio);
      // EFEITOS VISUAIS: "Outro web designer" · "Sem site" na placa · carimbo FECHADO · ✓
      fx.et.outro.em(cabecaDe(rival, 0.5), tc - tDe);
      if (lojaRua) fx.et.semSite.em(mais(placaRua.position.toArray(), [0, 3.15, 0]), tc - tSi);
      const meio = [(RIV_B[0] + DONO_R[0]) / 2, 1.95, (RIV_B[2] + DONO_R[2]) / 2 + 0.35];
      if (tc > tFe) fx.simb.em(mais(cabecaDe(dono, 0.3), [0, 0.3, 0]), tc - tFe, { tipo: '✓', tam: 0.8 });
      // SONS
      K.som('passo', B.inicio + 0.3, 0.3); K.som('passo', B.inicio + 0.7, 0.3); K.som('passo', B.inicio + 1.1, 0.3); K.som('baque', tFe, 0.6); K.som('certo', tFe + 0.25, 0.4);
      // CÂMERA: (1) atrás do rival andando · (2) fixa a ~3,5 m, de frente pro aperto de mão
      if (tc < tLa) { const p = rival.g.position; K.mirar([p.x + 0.5, 1.9, p.z + 4.2], [p.x - 0.5, 1.2, p.z - 2.5]); }
      else { const q = K.suave(pc(tc, tLa, B.ate)); K.mirar([K.lerp(0.9, 0.7, q), 1.65, DZ + K.lerp(4.3, 3.8, q)], [-1.15, 1.25, DZ + 0.2]); }
      contrato.visible = tc > tFe - 0.35;
      contrato.position.set(...meio); contrato.lookAt(K.camera.position);
      contrato.scale.setScalar(pop(tc - tFe + 0.35));
      carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
    },
    virada(B, tc) {
      // NA TELA: (1) o Davi desliga o aspirador, que murcha e derruba a tralha · (2) na rua, ele anda decidido até a porta do LAVA-JATO · MOSTRA: personagem
      const tPu = quando('puxar', B, 0.2), tIr = quando('ir', B, 0.5), tPr = quando('precisa', B, 0.8);
      if (tc < tIr - 0.05) {
        // (1) o aspirador desliga em "puxar" e murcha; a tralha cai no chão
        const kd = pc(tc, tPu, tPu + 0.5);
        aspiradorLigado(tc, 1 - kd);
        A.murcha(kd);
        ve(bota); bota.position.set(DV[0] - 1.1, Math.max(0, 0.9 * (1 - kd * 2)), DV[2] + 0.6); bota.rotation.set(0, 0.8, PI / 2 * K.clamp(kd * 2));
        folhas.forEach((f, i) => { f.visible = true; f.position.set(DV[0] - 1.4 + i * 0.3, Math.max(0.01, 1.2 * (1 - kd * 1.6)), DV[2] + 0.9 - i * 0.2); f.rotation.set(-PI / 2, 0, i + kd * 3); });
        // PERSONAGEM: aperta o botão e balança a cabeça
        if (tc < tPu) menino.reagir('segurando', tc - B.inicio); else menino.reagir('nao', tc - tPu);
        menino.humor('normal');
        fx.et.todo.em(mais(asp.position.toArray(), [0, 1.6, 0]), tc - tPu);
        if (tc > tPu + 0.2) fx.simb.em(mais(asp.position.toArray(), [0, 2.2, 0]), tc - tPu - 0.2, { tipo: '✗', tam: 0.8 });
        K.som('bip', tPu, 0.5); K.som('baque', tPu + 0.4, 0.5);
        // CÂMERA: (1) chegando · médio · esquerda, no botão e nele
        K.filmar([asp, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, B.inicio, tIr), { plano: 'medio', lado: 18, altura: 'olho', tam: 2.6 });
      } else {
        // (2) a rua: ele anda decidido até a porta do LAVA-JATO
        const anda = pc(tc, tIr - 0.05, B.ate);
        menino.irPara([0.55, 0, DZ + 6.0], [-0.5, 0, DZ + 1.6], anda, tc, { reto: true });
        menino.humor('bravo');
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        fx.et.precisa.em(lojaRua ? mais(placaRua.position.toArray(), [0, 3.15, 0]) : cabecaDe(menino, 0.6), tc - tPr);
        if (tc > tPr) fx.simb2.em(cabecaDe(menino, 0.45), tc - tPr, { tipo: '✓', tam: 0.7 });
        K.som('passo', tIr + 0.1, 0.35); K.som('passo', tIr + 0.4, 0.35); K.som('brilho', tPr, 0.6);
        // CÂMERA: (2) fixa no meio do calçadão, vendo ele chegar
        const q = K.suave(pc(tc, tIr, B.ate));
        K.mirar([0.2, 1.65, DZ - K.lerp(2.2, 1.7, q)], [-0.3, 1.25, DZ + K.lerp(5.0, 2.4, q)]);
      }
    },
    investe(B, tc) {
      // NA TELA: o quarto; ele de pé com a nota de "1 lavagem"; ela vira moeda e cai no computador; o mapa com os pinos · MOSTRA: personagem, nota, monitor
      const tIn = quando('investe', B, 0.12), tLa = quando('lavagem', B, 0.3), tFe = quando('ferramenta', B, 0.5), tPr = quando('precisa', B, 0.8);
      ve(comp); aspiradorCanto();
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tIn) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tIn); else menino.reagir('digitando', tc);
      menino.humor(tc > tIn ? 'feliz' : 'normal');
      const mao = menino.mao(1), notaPos = mais(mao, [0.03, 0.08, 0.1]);
      if (tc > tLa - 0.35 && tc < tFe) { ve(nota); nota.position.set(...notaPos); nota.lookAt(K.camera.position); nota.rotation.z += Math.sin(tc * 3) * 0.1; nota.scale.setScalar(pop(tc - tLa + 0.35)); }
      if (tc > tFe) {
        fx.poof.em(mais(notaPos, [0, 0.15, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(notaPos[0], TECLADO[0], q), K.lerp(notaPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(notaPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tPr ? Math.min(6, 1 + Math.floor((tc - tPr) / 0.12)) : 1;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tPr + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) chegando · médio · nele com a nota · (2) subindo · médio · frente, na tela
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), notaPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista dos lava-jatos de Cuiabá sobe do computador · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.08), tDi = quando('digita', B, 0.18), tL = quando('lista', B, 0.6), tLj = quando('lava-jatos', B, 0.7), tCu = quando('Cuiabá', B, 0.82);
      ve(comp, navG); aspiradorCanto();
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tLj ? 1 + Math.floor((tc - tLj) / 0.22) : 0;
        telaC.mostrar('listaLavas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tLj + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.cuiaba.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCu);
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Lava Rápido Pantanal; o robô à esquerda; o Davi à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseLava', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.quemPrecisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o quarto, ele com o aspirador e a tralha voando · (2) Agora: no lava-jato, ele mostra a análise pro dono2 do lado do carro de espuma; o rival chega atrasado · MOSTRA: personagem, dono2
      const tA = quando('Agora', B, 0.45), tDi = quando('direto', B, 0.75), tCl = quando('cliente', B, 0.9);
      if (tc < tA) {
        const boca = aspiradorLigado(tc, 1);
        tralhaVoando(tc, B.inicio - 0.6, boca);
        menino.reagir('susto', tc - B.inicio); menino.g.position.x += Math.sin(tc * 14) * 0.04;
        K.som('vapor', B.inicio, 0.3, 1.2);
        // CÂMERA: (1) aberto, fixo, um pouco mais de lado que no gancho
        const q = K.suave(pc(tc, B.inicio, tA));
        K.mirar([K.lerp(-0.2, 0.1, q), 2.3, 8.8], [0.35, 1.25, 0.5]);
      } else {
        // (2) ele mostra a análise pro dono do Lava Rápido Pantanal; joia; o rival chega atrasado
        ve(carroE, placaOf);
        espuma.forEach((e) => { e.b.position.y = e.y + Math.sin(tc * 2 + e.f) * 0.03; });
        menino.colocar(DAVI_L, cabecaDe(dono2, -1.3)); menino.humor('feliz');
        dono2.colocar(DONO2_L, cabecaDe(menino, -1.3)); dono2.humor('feliz');
        if (tc > tCl) dono2.reagir('vitoria', tc - tCl); else dono2.reagir('surpreso', tc - tA);
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.2, m[1] + 0.5, m[2] + 0.05); telaM.g.rotation.set(0, -0.6, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tA));
        telaM.mostrar('analiseLava', { ate: 2, score: 1 });
        menino.reagir('mostrando', tc - tA);
        const kr = pc(tc, tA, tDi + 0.2);
        rival.irPara([3.6, 0, 4.4], [1.9, 0, 1.9], kr, tc, { reto: true });
        if (kr >= 1) { rival.colocar([1.9, 0, 1.9], cabecaDe(menino, -1.3)); rival.reagir('mao_na_testa', tc - tDi - 0.2); rival.humor('triste'); }
        if (tc > tCl) fx.simb.em(mais(DAVI_L, [-0.5, 2.5, 0]), tc - tCl, { tipo: '✓', tam: 1.0 });
        fx.et.direto.em(mais(DAVI_L, [-0.5, 3.15, 0]), tc - tCl);
        K.som('whoosh', tA, 0.5); K.som('certo', tCl, 0.6);
        // CÂMERA: (2) chegando · médio · frente · olho (a oficina tem teto)
        K.filmar([menino, dono2, cabecaDe(menino, 0.3)], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: 12, altura: 'olho', tam: 2.0 });
      }
    },
    segue(B, tc) {
      // NA TELA: o aspirador no canto cospe o balão "Faz de graça que eu divulgo!"; "A mais absurda?"; depois o cartão de seguir, mappoa.com e o robô acenando · MOSTRA: personagem, navegador, monitor
      const tPo = quando('proposta', B, 0.12), tAb = quando('absurda', B, 0.22), tEn = quando('enviaram', B, 0.36), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      aspiradorCanto();
      // o gato dormindo em cima do aspirador
      gato.em(mais(ASP_CANTO, [0, 1.1, 0]), tc, { sentado: 1, cara: 'dormindo', rumo: 0.6 });
      // a pergunta na tela até o cartão de seguir entrar (o seguir é só na tela, sem falar)
      if (tc < tPc) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tPc);
      const boca = A.boca();
      if (tc < tPc) {
        // o aspirador dá um soluço e cospe o balão
        if (tc > tPo - 0.2 && tc < tPo + 0.2) A.ligar(tc, 0.8);
        fx.fala.em(mais(boca, [0, 0.55, 0]), tc - tPo, { texto: 'Faz de graça que eu divulgo!', lado: -1 });
        fx.et.absurda.em(mais(boca, [-0.3, 2.05, 0]), tc - tAb);
        K.som('estalo', tPo, 0.5);
      }
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: revira os olhos pro balão · em "enviaram?": abre os braços pra câmera · digita · aponta pro cartão
      menino.colocar(EM_PE, tc > tDi ? MONITOR : tc < tEn ? boca : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc);
      else if (tc > tPc) menino.apontar(1);
      else if (tc > tEn) { menino.reagir('chamando', tc - tEn); menino.humor('feliz'); }
      else if (tc > tAb) menino.reagir('mao_na_testa', tc - tAb);
      else menino.reagir('duvida', tc - B.inicio);
      // CÂMERA: chegando · médio · esquerda, nele e no aspirador → o padrão do canal no cartão
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), boca, mais(boca, [0, 1.1, 0])], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 14, altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      aspiradorCanto();
      gato.em(mais(ASP_CANTO, [0, 1.1, 0]), tc, { sentado: 1, cara: 'dormindo', rumo: 0.6 });
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // o Davi segurando o bocal com cara de susto; a tralha no ar e o primo chegando
      const boca = aspiradorLigado(1.15, 1);
      tralhaVoando(1.15, 0.0, boca, false);
      menino.reagir('susto', 0.3); menino.humor('susto');
      K.mirar([1.2, 2.3, 9.0], [0.2, 1.3, 0.5]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const lugar = plano === 'capa' ? 'quarto' : lugarDe(B, tc);
    CS.usar(lugar);
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, primo, dono, dono2, rival].forEach((b) => { b.g.visible = false; b.g.rotation.set(0, 0, 0); });
    tudo.forEach((g) => { g.visible = false; });
    gato.esconder();
    if (placaRua) placaRua.visible = lugar === 'rua';
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    if (lugar === 'lava') placaOf.visible = true;
    if (plano !== 'capa' && lugar === 'quarto' && B.plano !== 'gancho' && B.plano !== 'tralha' && !(B.plano === 'virada') && !(B.plano === 'antes_agora')) {
      if (!cadeira.visible) { cadeira.position.set(SEAT[0], 0, SEAT[2] + 0.3); cadeira.rotation.set(0, PI, 0); ve(cadeira); }
    }
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
