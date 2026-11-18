// Eu sou uma pizzaria (canal Mappoa, feito na nuvem, 18/11/2026): quem conta a história é a EMPRESA, em 1ª pessoa. A
// fachada da pizzaria tem olhos, sobrancelhas e uma boca que fala. Os web designers passam na frente olhando o celular;
// o cliente procura no Google e acha a do lado; do outro lado da cidade, o Téo (o personagem do canal) manda 50
// propostas e nada, investe "o preço de uma pizza minha" no Mappoa, acha a pizzaria (a 3ª da lista), abre a ficha e no
// dia seguinte entra pela porta já sabendo tudo. Fim: fila na porta e os outros web designers ainda olhando o celular.
// Três lugares (K.cenarios): a fachada da pizzaria, o quarto do Téo (home_office) e o palco do Mappoa.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, robo, comp, cad, navG, telaC, telaM, cel, celC, moeda, pizzaM, FOV0, face, cliente;
  const tudo = [], fx = {}, envs = [], designers = [], fila = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Téo no meio, virado pra +z
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  let JANELA = [-1.9, 2.2, -3.6];
  // Fachada: a cara da pizzaria em cima da placa (olhos em y 5,7, boca em y 4,7), a calçada em z ~2,4
  const OLHOS = [0, 5.75, 0.35], BOCA = [0, 4.72, 0.34], ESC_F = 0.6;
  let PORTA = [1.6, 0, 0.9], CHEGADA = [-9, 0, 2.6];

  const LUGAR = { gancho: 'fora', passam: 'fora', google: 'fora', teo: 'quarto', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', ficha: 'quarto', porta: 'fora', forno: 'fora', outros: 'fora', segue: 'quarto', cartao: 'quarto', capa: 'fora' };

  const PIZZAS = [
    { nome: 'Pizzaria Forno Velho', end: 'Rua Barão de Jaguara, 812', chips: ['tel'] },
    { nome: 'Cantina do Cambuí', end: 'Rua Coronel Quirino, 140', chips: ['whats', 'insta'] },
    { nome: 'Pizzaria Bella Nona', end: 'Av. Andrade Neves, 455', chips: ['whats', 'insta'] },
    { nome: 'Pizza na Pedra Taquaral', end: 'Av. Heitor Penteado, 77', chips: ['whats'] }
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
  function emailLonge(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.05, h * 0.06, w * 0.9, h * 0.14, 10, '#e7eefb');
    txt(c, 'Para: empresa@outro-estado.com', w * 0.09, h * 0.13, w * 0.042, '#2f4a7a', 700, 'left', w * 0.82);
    txt(c, 'Proposta: faço sites.', w * 0.09, h * 0.36, w * 0.07, '#111', 900, 'left', w * 0.84);
    txt(c, 'Enviadas: ' + (e.n || 0), w * 0.09, h * 0.55, w * 0.06, '#4a4f58', 800);
    txt(c, 'Respostas: 0', w * 0.09, h * 0.7, w * 0.06, '#e8352b', 900);
  }
  function mapaPinos(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    [0.3, 0.7].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * (x - 0.05), h); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Quem precisa de site', w * 0.05, h * 0.066, w * 0.055, '#fff', 800, 'left', w * 0.9);
    [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]].slice(0, e.n || 0).forEach(([x, y]) => {
      const px = w * x, py = h * y, r = w * 0.045;
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
    });
  }
  function siteNona(c, w, h) {
    c.fillStyle = '#fff7ee'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#c8372d'; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Pizzaria Bella Nona', w * 0.06, h * 0.13, w * 0.07, '#fff', 900, 'left', w * 0.9); txt(c, 'peça pelo WhatsApp', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); c.fillStyle = ['#f4b942', '#e8763a', '#d8343a'][i]; c.beginPath(); c.arc(w * (0.195 + i * 0.31), h * 0.6, w * 0.08, 0, 7); c.fill(); });
  }
  // o celular do cliente: a busca "pizzaria perto de mim" e a da vizinha em primeiro
  const BUSCA = 'pizzaria perto de mim';
  function busca(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.06, h * 0.05, w * 0.88, h * 0.08, 40, '#eef1f5');
    txt(c, BUSCA.slice(0, e.letras) + (e.letras < BUSCA.length ? '|' : ''), w * 0.12, h * 0.09, w * 0.058, '#111', 700, 'left', w * 0.78);
    if (e.res) {
      rr(c, w * 0.06, h * 0.17, w * 0.88, h * 0.3, 18, '#eaf7ee');
      txt(c, 'Pizzaria Vizinha', w * 0.11, h * 0.22, w * 0.075, '#111', 900, 'left', w * 0.8);
      txt(c, '★★★★★ 4,7 · aqui do lado', w * 0.11, h * 0.28, w * 0.05, '#d97706', 800, 'left', w * 0.8);
      txt(c, 'Site ✓  Cardápio ✓', w * 0.11, h * 0.37, w * 0.065, '#16a34a', 900);
      rr(c, w * 0.06, h * 0.52, w * 0.88, h * 0.2, 18, '#f7f9fc');
      txt(c, 'Pizzaria Bella Nona', w * 0.11, h * 0.57, w * 0.06, '#888', 800, 'left', w * 0.8);
      txt(c, 'Site: —', w * 0.11, h * 0.65, w * 0.065, '#e8352b', 900);
    }
  }

  // ---------- A cara da pizzaria ----------
  function fazFace() {
    const g = new THREE.Group();
    const branco = K.mat(0xffffff, { roughness: 0.35 }), preto = K.mat(0x1b1b1f, { roughness: 0.3 }), parede = K.mat(0x7a3b22, { roughness: 0.6 });
    const olhos = [-1, 1].map((l) => {
      const o = new THREE.Group(); o.position.set(l * 1.75, 0, 0); g.add(o);
      const bola = K.malha(new THREE.SphereGeometry(0.85, 32, 20), branco); bola.scale.set(1, 1.15, 0.38); o.add(bola);
      const pupila = K.malha(new THREE.SphereGeometry(0.36, 24, 16), preto); pupila.scale.set(1, 1, 0.4); pupila.position.z = 0.3; o.add(pupila);
      const brilho = K.malha(new THREE.SphereGeometry(0.09, 12, 8), branco); brilho.position.set(0.12, 0.14, 0.15); pupila.add(brilho);
      const sobr = K.malha(new THREE.BoxGeometry(1.3, 0.2, 0.2), parede); sobr.position.set(0, 1.25, 0.15); o.add(sobr);
      return { o, bola, pupila, sobr, l };
    });
    const boca = new THREE.Group(); boca.position.set(BOCA[0] - OLHOS[0], BOCA[1] - OLHOS[1], BOCA[2] - OLHOS[2]); g.add(boca);
    const dentro = K.malha(new THREE.CircleGeometry(0.8, 40), K.mat(0x5a0f14, { roughness: 0.8 })); boca.add(dentro);
    const lingua = K.malha(new THREE.CircleGeometry(0.45, 30), K.mat(0xe0525a, { roughness: 0.8 })); lingua.position.set(0, -0.35, 0.01); lingua.scale.set(1, 0.5, 1); boca.add(lingua);
    const lagrima = K.malha(new THREE.SphereGeometry(0.16, 16, 12), K.mat(0x7cc6ff, { roughness: 0.1, transparent: true, opacity: 0.9 })); g.add(lagrima);
    g.position.set(...OLHOS); g.scale.setScalar(ESC_F);
    // olhar: um ponto do mundo · humor: 'triste', 'feliz', 'bravo', 'normal' · fala: 0 a 1 (boca abrindo) · piscar: 0 a 1
    function em(tc, op = {}) {
      const { olhar = [0, 4, 12], humor = 'normal', fala = 0.6, chorar = 0 } = op;
      g.visible = true;
      const pis = (tc % 3.1) < 0.12 ? 0.1 : 1;
      olhos.forEach((e) => {
        const c = V(OLHOS[0] + e.l * 1.75 * ESC_F, OLHOS[1], OLHOS[2]);
        const d = V(...olhar).sub(c).normalize();
        e.pupila.position.set(d.x * 0.38, d.y * 0.4, 0.3);
        e.bola.scale.y = 1.15 * pis; e.pupila.scale.y = pis;
        const ang = { triste: 0.35, feliz: -0.15, bravo: -0.4, normal: 0 }[humor] || 0;
        e.sobr.rotation.z = -e.l * ang; e.sobr.position.y = humor === 'feliz' ? 1.38 : humor === 'triste' ? 1.15 : 1.25;
      });
      const abre = fala > 0 ? 0.12 + Math.abs(Math.sin(tc * 13)) * 0.5 * fala + Math.abs(Math.sin(tc * 7.3)) * 0.2 * fala : 0.1;
      const sorri = humor === 'feliz' ? 1.35 : humor === 'triste' ? 0.8 : 1;
      boca.scale.set(sorri, abre, 1);
      lagrima.visible = chorar > 0;
      if (chorar > 0) { const k = (tc * 0.8) % 1; lagrima.position.set(-1.75, -0.95 - k * 2.6, 0.35); lagrima.scale.set(1, 1.3, 1); }
    }
    return { g, em };
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['fachada', { loja: 'pizzaria' }, 'fora'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);
    const Cf = CS.todos.fora, Cq = CS.todos.quarto;
    if (Cf.lugares.porta) PORTA = Cf.lugares.porta;
    if (Cf.lugares.chegada) CHEGADA = Cf.lugares.chegada;
    if (Cq.lugares.janela) JANELA = Cq.lugares.janela;

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaPizzas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: PIZZAS, n: e.n, sel: e.sel, total: 132, comSite: 88, semSite: 44 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Pizzarias · Campinas, SP · 44 sem site', 36, 168, 21, M.marinho, 700, 'left', w - 72);
    };
    T.analiseNona = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Pizzaria Bella Nona', ate: e.ate, aderencia: 0.88 * k,
        dores: ['Sem site nem cardápio online', 'Cliente acha a concorrente no Google'], oportunidades: ['Site com cardápio e pedido pelo WhatsApp'],
        objecoes: ['"O pessoal já pede pelo telefone"'], abordagem: 'Mostre a busca "pizzaria perto de mim" e quem aparece no lugar dela.'
      });
      if (e.ate >= 0) txt(c, Math.round(88 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
      if (e.zap) { rr(c, w - 250, 132, 232, 44, 22, '#25d366'); txt(c, 'WhatsApp ✓', w - 134, 155, 22, '#fff', 900, 'center'); }
    };
    T.msgNona = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Pizzaria Bella Nona (WhatsApp)', digitado: e.d, texto: 'Oi! Procurei "pizzaria perto de mim" no bairro de vocês e apareceu a concorrente. Faço um site com cardápio e pedido pelo WhatsApp. Te mostro?' });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Téo (do canal), os 3 web designers que passam, o cliente com o celular, a fila e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    const CD = [
      { moletom: 0x6b7280, punho: 0x4b5563, calca: 0x1f2937, mochila: 0x111827, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a },
      { moletom: 0x7c3aed, punho: 0x5b21b6, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x3b2314, pele: 0xc98d5e },
      { moletom: 0x0f766e, punho: 0x115e59, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xf4f1ea, cabelo: 0x111111, pele: 0x8d5a3b }
    ];
    CD.forEach((cores, i) => { const d = K.boneco({ roupa: 'moletom', cores }); K.semNome(d.g); const c = K.celular(); c.g.scale.setScalar(1.6); K.scene.add(c.g); c.tela.desenhar((cc, w, h) => { cc.fillStyle = '#e9eef6'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#2f6fd6'; cc.fillRect(0, 0, w, h * 0.12); }, 'x'); designers.push({ b: d, cel: c }); });
    K.nomear('designers', designers[0].b.g);
    cliente = K.personagem('dona', { cores: { blazer: 0xf39a1e, vestido: 0xffffff } }); K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    for (let i = 0; i < 5; i++) {
      const f = i % 2 ? K.personagem('dono', { cores: { terno: [0x2a3a5a, 0x5a2a2a, 0x2a5a3a][i % 3] } }) : K.boneco({ roupa: 'camiseta', cores: { camiseta: [0xf39a1e, 0xe8352b, 0x16a34a][i % 3], bermuda: 0x1f2937, tenis: 0xffffff, cabelo: 0x2a1a10, pele: [0xe6b48a, 0xc98d5e, 0x8d5a3b][i % 3] } });
      K.semNome(f.g); fila.push(f);
    }
    K.nomear('fila', fila[0].g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A cara da pizzaria
    face = fazFace(); K.scene.add(face.g); K.nomear('olhos', face.g); tudo.push(face.g);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', [2.4, 0, 3.2]);

    // Quarto: o computador, a cadeira, as propostas, a pizza que vira moeda, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); cad.rotation.y = PI; guarda(cad, null, SEAT);
    const avG = new THREE.Group(); guarda(avG, 'propostas');
    for (let i = 0; i < 5; i++) { const e = K.m3d('envelope'); e.scale.setScalar(0.32); avG.add(e); envs.push(e); }
    pizzaM = K.m3d('pizza'); guarda(pizzaM, 'pizza', null, 0.9);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    celC = K.celular(); guarda(celC, null, null, 1.6);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.fala = K.balaoFala();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      semSite: e('Sem site', 'vermelho'), celular: e('Olhando o celular', 'laranja'), vizinha: e('A do lado', 'vermelho'),
      propostas: e('50 propostas', 'laranja'), zero: e('0 respostas', 'vermelho'), investir: e('Investir', 'azul'),
      terceira: e('Eu!', 'verde'), chance: e('Quem tem chance', 'verde'), zap: e('WhatsApp ✓', 'verde'),
      sabia: e('Já sabia tudo', 'verde'), forno: e('Forno não para', 'verde'), ainda: e('Ainda no celular', 'laranja')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); cad.rotation.y = PI; menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // os web designers andando pela calçada, olhando o celular (x: 0 a 1 no caminho, cada um com um atraso)
  function designersPassando(tc, x, n = 3, de = -7, ate = 7) {
    designers.slice(0, n).forEach((d, i) => {
      const k = K.clamp(x * 1.25 - i * 0.12);
      const z = 3.3 + (i % 2) * 0.5, xi = de - i * 1.6;
      d.b.irPara([xi, 0, z], [ate - i * 1.6, 0, z], k, tc + i * 0.3, { reto: true });
      d.b.humor('normal'); d.b.cabeca.rotation.x = 0.45;
      d.b.g.updateMatrixWorld(true);
      const m = d.b.mao(1); d.cel.g.visible = true; d.cel.g.position.set(m[0], m[1] + 0.1, m[2]);
      d.cel.g.rotation.set(-0.9, d.b.g.rotation.y, 0);
      d.b.pose({ x: -0.9, z: 0.15, c: -1.4 }, { x: -0.9, z: 0.15, c: -1.4 });
    });
  }
  const face0 = (B, tc, op) => face.em(tc, Object.assign({ fala: 0.7 }, op));

  const P = {
    gancho(B, tc) {
      // NA TELA: a fachada da pizzaria com olhos, sobrancelhas tristes e a boca falando; uma lágrima escorrendo; o Téo pequeno na calçada · MOSTRA: fachada, olhos, personagem
      // CENÁRIO: a frente da pizzaria de dia, com o toldo, as mesinhas, o cavalete e carros passando (o cenário cuida)
      const tPi = quando('pizzaria', B, 0.25), tNi = quando('ninguém', B, 0.5), tSi = quando('site', B, 0.92);
      // PERSONAGEM: a pizzaria fala triste, olhando pra câmera · em "ninguém": a lágrima · o Téo ainda não; quem passa é um designer no celular
      face0(B, tc, { humor: 'triste', olhar: K.camera.position.toArray(), chorar: tc > tNi ? 1 : 0 });
      designersPassando(tc, pc(tc, B.inicio - 0.5, B.ate + 3), 1);
      // SONS: o sino da porta, um ding triste em "site"
      K.som('ding', B.inicio + 0.05, 0.3); K.som('pingo', tNi + 0.2, 0.4); K.som('errado', tSi, 0.35);
      // CÂMERA: 3 cortes (os olhos de perto, chegando; a fachada inteira com a placa; a boca e a lágrima em "ninguém")
      const c1 = B.inicio + 0.75, c2 = Math.max(c1 + 0.6, tNi - 0.05);
      if (tc < c1) K.mirar([0.3, 5.5, K.lerp(8.2, 7.0, pc(tc, B.inicio, c1))], [0, 5.5, 0]);
      else if (tc < c2) K.mirar([K.lerp(-1.0, -0.5, pc(tc, c1, c2)), 3.4, 7.8], [0, 4.0, 0]);
      else K.mirar([0.6, 5.0, K.lerp(7.8, 7.0, pc(tc, c2, B.ate))], [-0.3, 5.1, 0]);
      // a cara olha pra câmera (depois de filmar)
      face0(B, tc, { humor: 'triste', olhar: K.camera.position.toArray(), chorar: tc > tNi ? 1 : 0 });
      // EFEITOS VISUAIS: "Sem site" em "site"
      fx.et.semSite.em({ tela: [540, 600] }, tc - tSi);
      void tPi;
    },
    passam(B, tc) {
      // NA TELA: os 3 web designers passando na calçada, de cabeça baixa no celular; os olhos da pizzaria seguindo eles · MOSTRA: fachada, olhos, designers
      const tDe = quando('designer', B, 0.3), tFr = quando('frente', B, 0.5), tCe = quando('celular', B, 0.9);
      designersPassando(tc, pc(tc, B.inicio - 0.2, B.ate + 0.2), 3, -6.5, 7);
      const alvo = cabecaDe(designers[0].b, 0);
      // PERSONAGEM: a pizzaria acompanha com os olhos · em "celular": sobrancelha brava
      face0(B, tc, { humor: tc > tCe ? 'bravo' : 'normal', olhar: alvo });
      K.som('passo', B.inicio + 0.2, 0.3); K.som('passo', B.inicio + 0.6, 0.3); K.som('clique', tCe, 0.3);
      // CÂMERA: (1) seguindo de lado os designers, com a fachada atrás · (2) de cima dos olhos, olhando eles lá embaixo
      const cv = (tFr + tCe) / 2;
      if (tc < cv) K.filmar([designers[0].b, alvo, cabecaDe(designers[1].b, 0)], 'passando', pc(tc, B.inicio, cv), { plano: 'medio', lado: 12, altura: 'olho', tam: 2.6 });
      else K.mirar([0.3, 5.4, 7.6], [0, 5.4, 0]);
      face0(B, tc, { humor: tc > tCe ? 'bravo' : 'normal', olhar: alvo });
      fx.et.celular.em({ tela: [540, 400] }, tc - tDe);
    },
    google(B, tc) {
      // NA TELA: a cliente na calçada com o celular gigante: "pizzaria perto de mim" → a Pizzaria Vizinha com site; a nossa com "Site: —" · MOSTRA: celular, cliente, fachada
      const tPr = quando('procura', B, 0.2), tGo = quando('Google', B, 0.4), tAc = quando('acha', B, 0.6), tLa = quando('lado', B, 0.92);
      const POS = [3.3, 0, 3.6];
      cliente.colocar(POS, [1.0, 1.5, 7]);
      if (tc > tLa) cliente.reagir('ombros', tc - tLa); else cliente.reagir('celular', tc - B.inicio);
      ve(cel); K.entrar(cel, 'cresce', tc - tPr, { dur: 0.35 });
      cel.position.set(2.3, 0, 3.6); cel.rotation.set(0, 0.35, 0);
      const letras = Math.max(0, Math.min(BUSCA.length, Math.floor((tc - tGo) / 0.04)));
      cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { letras, res: tc > tAc }), 'b' + letras + (tc > tAc));
      for (let k = 0; k < 8; k++) K.som('clique', tGo + k * 0.05, 0.2);
      K.som('errado', tLa, 0.5);
      // CÂMERA: (1) chegando no celular gigante · (2) a fachada triste atrás, com a cliente virando pro lado
      const cv = tAc + 0.6;
      if (tc < cv) K.filmar([[2.3, 2.2, 3.6], [2.3, 0.5, 3.6], cabecaDe(cliente, 0.2)], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: -25, altura: 'olho', tam: 2.6 });
      else K.mirar([-0.6, 3.6, 7.8], [1.4, 3.6, 1.5]);
      face0(B, tc, { humor: 'triste', olhar: cabecaDe(cliente, 0), chorar: tc > tLa ? 1 : 0 });
      if (tc > tLa) fx.et.vizinha.em({ tela: [540, 400] }, tc - tLa);
    },
    teo(B, tc) {
      // NA TELA: o quarto do Téo; ele digitando; as propostas saindo do computador e fugindo pela janela; "Enviadas: 50 · Respostas: 0" · MOSTRA: personagem, monitor, propostas
      const tTe = quando('Téo', B, 0.2), tCi = quando('cinquenta', B, 0.55), tZe = quando('Zero', B, 0.85);
      ve(comp, cad);
      sentado(MONITOR);
      if (tc > tZe) menino.reagir('mao_na_testa', tc - tZe); else menino.reagir('digitando', tc);
      const n = Math.min(50, Math.max(0, Math.round(50 * pc(tc, tTe, tCi + 0.3))));
      comp.tela.desenhar((c, w, h) => emailLonge(c, w, h, { n }), 'mail' + n);
      ve(envs[0].parent);
      envs.forEach((e, i) => {
        const k = (tc - tTe - i * 0.3) / 1.1;
        e.visible = k > 0 && tc < tZe + 0.2; if (!e.visible) return;
        const q = k % 1, de = mais(MONITOR, [0, 0.35, 0.15]), ate = JANELA;
        e.position.set(K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) + Math.sin(q * PI) * 0.9, K.lerp(de[2], ate[2], q) + Math.sin(q * PI) * 0.8);
        e.rotation.set(0.2, q * 3, Math.sin(q * 6) * 0.3); e.scale.setScalar(0.32 * (1 - q * 0.75));
      });
      for (let k = 0; k < 5; k++) K.som('whoosh', tTe + k * 0.3, 0.3);
      K.som('errado', tZe, 0.5);
      // CÂMERA: (1) chegando, perto, de frente-direita · (2) passando, a janela com as propostas sumindo
      const cv = (tCi + tZe) / 2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 35, altura: 'olho', tam: 1.6 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, JANELA], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.9 });
      if (tc < tZe) fx.et.propostas.em(cabecaDe(menino, 0.55), tc - tCi); else fx.et.zero.em({ tela: [540, 400] }, tc - tZe);
    },
    investe(B, tc) {
      // NA TELA: o Téo de pé com uma pizza na mão; a pizza vira moeda e cai no teclado; a tela com os pinos · MOSTRA: personagem, pizza, monitor
      const tDe = quando('decidiu', B, 0.1), tIn = quando('investir', B, 0.2), tPi = quando('pizza', B, 0.35), tSi = quando('sistema', B, 0.55), tSt = quando('site', B, 0.92);
      ve(comp, cad);
      menino.colocar(EM_PE, tc < tSi + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tDe) menino.reagir('segurando', tc - B.inicio); else if (tc < tSi) menino.reagir('sim', tc - tDe); else menino.reagir('digitando', tc);
      menino.humor(tc > tDe ? 'feliz' : 'normal');
      menino.g.updateMatrixWorld(true);
      const pPos = mais(menino.mao(1), [0.05, 0.08, 0.1]);
      if (tc < tSi) { ve(pizzaM); pizzaM.position.set(...pPos); pizzaM.rotation.set(0.5, tc, 0); pizzaM.scale.setScalar(0.9 * pop(tc - tPi + 0.35)); }
      if (tc > tSi) {
        fx.poof.em(pPos, tc - tSi, { escala: 0.35 });
        const q = K.clamp((tc - tSi) / 0.45); moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tSi + 0.45, 0.6);
      }
      const n = tc > tSt - 0.4 ? Math.min(6, 1 + Math.floor((tc - tSt + 0.4) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => (tc > tSi ? mapaPinos(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tSi) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tSt - 0.4 + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      if (tc < tSi + 0.15) { const k = K.suave(pc(tc, B.inicio, tSi + 0.15)); K.mirar([K.lerp(0.75, 0.6, k), 1.55, K.lerp(3.2, 2.6, k)], [0.85, 1.15, -0.5]); }
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tSi + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com acima do computador; a lista das pizzarias de Campinas sobe; a 3ª (Bella Nona) acende em "terceira" · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.04), tDi = quando('digitou', B, 0.12), tL = quando('lista', B, 0.45), tPz = quando('pizzarias', B, 0.55), tTe = quando('terceira', B, 0.93);
      ve(comp, cad, navG);
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tPz ? 1 + Math.floor((tc - tPz) / 0.22) : 0;
        telaC.mostrar('listaPizzas', { n: Math.min(4, n), sel: tc > tTe - 0.1 ? 2 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tPz + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5); K.som('ding', tTe, 0.5);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
      fx.et.terceira.em(mais(TELA_Q, [0.75, 0.2, 0.2]), tc - tTe);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Bella Nona cai do alto; o robô à esquerda; o Téo à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseNona', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5); K.som('brilho', tM, 0.6);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    ficha(B, tc) {
      // NA TELA: a tela do lado do computador: a ficha da Bella Nona, o WhatsApp, a nota subindo até 88; em "mensagem", a mensagem pronta · MOSTRA: tela, personagem
      const tAb = quando('abriu', B, 0.08), tZa = quando('WhatsApp', B, 0.35), tNo = quando('nota', B, 0.5), tMs = quando('mensagem', B, 0.8), tPr = quando('pronta', B, 0.93);
      ve(comp, cad, telaC); comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      if (tc < tMs) telaC.mostrar('analiseNona', { ate: tc > tNo + 0.4 ? 1 : 0, score: K.clamp((tc - tNo) / 0.7), zap: tc > tZa });
      else telaC.mostrar('msgNona', { d: K.clamp((tc - tMs) / 1.0) });
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc < tPr ? TELA_Q : [1.6, 1.4, 5]);
      if (tc < tPr) menino.apontar(0.55 + Math.sin(tc * 3) * 0.05); else menino.reagir('sim', tc - tPr);
      K.som('clique', tAb, 0.4); K.som('ding', tZa, 0.35); for (let k = 0; k < 5; k++) K.som('bip', tNo + k * 0.12, 0.2); K.som('certo', tPr, 0.45);
      const cv = (tNo + tMs) / 2;
      if (tc < cv) K.filmar([telaC, mais(TELA_Q, [0, 1.0, 0]), mais(TELA_Q, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.5 });
      else K.filmar([telaC, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.9 });
      if (tc > tZa && tc < tMs) fx.et.zap.em({ tela: [540, 400] }, tc - tZa);
    },
    porta(B, tc) {
      // NA TELA: o Téo chega andando pela calçada com o notebook; a porta abre com o sino; os olhos da pizzaria descem até ele, surpresos · MOSTRA: personagem, porta, olhos
      const C = CS.todos.fora;
      const tSe = quando('seguinte', B, 0.15), tEn = quando('entrou', B, 0.35), tPo = quando('porta', B, 0.5), tSa = quando('sabendo', B, 0.75), tMi = quando('mim', B, 0.95);
      // PERSONAGEM: anda até a porta · em "porta": a porta abre e ele para · em "sabendo": vira e mostra a ficha no celular
      if (tc < tPo) menino.irPara(CHEGADA, PORTA, K.clamp((tc - B.inicio + 0.6) / (tPo - B.inicio + 0.6)), tc);
      else { menino.colocar(PORTA, tc < tSa ? mais(PORTA, [0, 1.5, -3]) : [1.0, 5.5, 0.4]); if (tc > tSa) menino.reagir('mostrando', tc - tSa); else menino.humor('feliz'); }
      if (tc > tPo) C.porta.abrirEm(tc - tPo);
      K.som('passo', B.inicio + 0.2, 0.3); K.som('passo', B.inicio + 0.6, 0.3);
      // CÂMERA: (1) seguindo ele de trás, chegando na porta · (2) de baixo, a fachada inteira com os olhos olhando ele
      const cv = tPo + 0.1;
      if (tc < cv) K.seguir(menino, { lado: 'tras', dist: 4.2, altura: 0.9 });
      else K.mirar([PORTA[0] + 1.4, 1.8, 7.8], [PORTA[0] - 0.3, 2.6, 0.6]);
      face0(B, tc, { humor: tc > tSa ? 'feliz' : 'normal', olhar: cabecaDe(menino, 0) });
      if (tc > tSa) {
        ve(celC); const cab = cabecaDe(menino, 0.1);
        celC.g.position.set(cab[0] + 0.45, cab[1] + 0.05, cab[2] + 0.2); celC.g.scale.setScalar(1.6); celC.g.lookAt(K.camera.position);
        celC.tela.desenhar((c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); txt(c, 'Bella Nona', w * 0.08, h * 0.1, w * 0.1, '#0b1b3a', 900); txt(c, '88/100', w * 0.08, h * 0.25, w * 0.15, '#16a34a', 900); txt(c, 'WhatsApp ✓', w * 0.08, h * 0.4, w * 0.09, '#25d366', 900); }, 'cc');
        fx.et.sabia.em({ tela: [540, 400] }, tc - tSa);
      }
      if (tc > tMi - 0.1) fx.simb.em(mais(OLHOS, [2.9, 0.6, 0.6]), tc - tMi + 0.1, { tipo: '❤', tam: 0.9 });
      K.som('ding', tSa, 0.4); void tSe; void tEn;
    },
    forno(B, tc) {
      // NA TELA: a fachada feliz, a fila de clientes na porta, o site no celular gigante; a boca sorrindo · MOSTRA: fachada, olhos, fila
      const tSi = quando('site', B, 0.35), tFo = quando('forno', B, 0.7), tPa = quando('para', B, 0.92);
      fila.forEach((f, i) => {
        f.g.visible = true;
        const p = [PORTA[0] - 0.9 - i * 0.8, 0, 1.55 + (i % 2) * 0.2];
        f.colocar(p, mais(PORTA, [0, 1.4, 0]));
        if (tc > tFo + i * 0.08) f.reagir('vitoria', tc - tFo - i * 0.08); else f.humor('feliz');
      });
      ve(cel); cel.position.set(4.3, 0, 2.4); cel.rotation.set(0, -0.35, 0); cel.userData.m3d.tela.desenhar(siteNona, 'site');
      K.entrar(cel, 'cresce', tc - tSi, { dur: 0.35 });
      K.som('brilho', tSi, 0.5); K.som('festa', tFo, 0.5); K.som('ding', tPa, 0.4);
      // CÂMERA: (1) a fila e o celular com o site, afastando · (2) a cara feliz de baixo
      const cv = (tSi + tFo) / 2 + 0.2;
      if (tc < cv) K.mirar([K.lerp(1.4, 1.8, pc(tc, B.inicio, cv)), 2.3, K.lerp(7.0, 7.7, pc(tc, B.inicio, cv))], [0.6, 1.7, 1.6]);
      else K.mirar([-0.4, 2.2, 7.7], [0, 4.6, 0]);
      face0(B, tc, { humor: 'feliz', olhar: K.camera.position.toArray() });
      fx.et.forno.em({ tela: [540, 400] }, tc - tFo);
    },
    outros(B, tc) {
      // NA TELA: os 3 web designers passando de novo no celular, sem ver a fila; os olhos da pizzaria rolam pro lado, de deboche · MOSTRA: designers, fachada, olhos
      const tOu = quando('outros', B, 0.2), tPa = quando('passam', B, 0.55), tCe = quando('celular', B, 0.9);
      designersPassando(tc, pc(tc, B.inicio - 0.3, B.ate + 0.3), 3, 7, -6.5);
      designers.forEach((d) => { d.b.g.rotation.y += 0; });
      // PERSONAGEM: a pizzaria olha pros designers · em "celular": revira os olhos (pupila pra cima)
      const ol = tc > tCe ? [0, 12, 2] : cabecaDe(designers[1].b, 0);
      // CÂMERA: (1) baixa, na calçada, com os designers passando na frente da fachada · (2) a cara de perto, revirando os olhos
      const cv = (tPa + tCe) / 2;
      const d1 = cabecaDe(designers[1].b, 0);
      if (tc < cv) K.filmar([designers[1].b, d1, cabecaDe(designers[0].b, 0)], 'passando', pc(tc, B.inicio, cv), { plano: 'medio', lado: -12, altura: 'olho', tam: 2.6 });
      else K.mirar([0.3, 5.4, 7.6], [0, 5.4, 0]);
      face0(B, tc, { humor: tc > tCe ? 'bravo' : 'normal', olhar: ol });
      fx.et.ainda.em({ tela: [540, 400] }, tc - tPa);
      K.som('passo', B.inicio + 0.2, 0.3); K.som('passo', B.inicio + 0.7, 0.3); K.som('whoosh', tCe, 0.4); void tOu;
    },
    segue(B, tc) {
      // NA TELA: o Téo de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteNona, 'nona');
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
      fx.seguir.em(9); ve(comp, cad, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteNona, 'nona');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende "Ninguém me viu": a fachada chorando de frente e um web designer passando no celular
      designersPassando(0.5, 0.42, 1);
      K.mirar([0.2, 3.9, 7.8], [0, 4.4, 0]);
      face.em(0.4, { humor: 'triste', olhar: K.camera.position.toArray(), chorar: 1, fala: 0 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cliente, ...fila, ...designers.map((d) => d.b)].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    designers.forEach((d) => { d.cel.g.visible = false; d.b.cabeca.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    cad.position.set(-1.6, 0, -0.75); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
