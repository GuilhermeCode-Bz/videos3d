// Lote "várias empresas em segundos" (canal Mappoa): três vídeos com a mesma estrutura e o mesmo cena.js.
// Tudo o que muda (a metáfora do gancho, o nome, a comida, o nicho, a cidade, as telas e as etiquetas) fica no bloco CFG.
// tipo 'pinca': cata empresa de uma em uma com pinça; o rival puxa todas com um ímã gigante.
// tipo 'ampulheta': ele dentro de uma ampulheta gigante, a areia subindo; o rival acha a cidade e vai almoçar.
// tipo 'lupa': ele de lupa num mapa gigante no chão; o rival acende o mapa inteiro de uma vez.
// Lugares (K.cenarios): o fundo colorido da metáfora, o quarto de dia e de noite e o palco do Mappoa.
(function () {
  // ===================== CFG (o que muda em cada vídeo) =====================
  const CFG = {
    tipo: 'lupa', cor: 'verde', nome: 'Samuel', comida: 'cuscuz',
    nicho: 'Lojas de móveis', cidade: 'Campina Grande, PB', etCidade: 'Campina Grande',
    planilha: ['Móveis Lar'],
    itens: [
      { nome: 'Casa & Cia Móveis', end: 'Rua Maciel Pinheiro, 450', chips: ['whats', 'insta'] },
      { nome: 'Móveis Borborema', end: 'Av. Floriano Peixoto, 1200', chips: ['tel', 'insta'] },
      { nome: 'Móveis Prata', end: 'Av. Brasília, 880', chips: ['whats'] },
      { nome: 'Lar Bodocongó', end: 'Rua Aprígio Veloso, 300', chips: ['whats', 'tel'] }
    ],
    analise: { nome: 'Casa & Cia Móveis', score: 84, dor2: 'Catálogo só no Instagram', op: 'Site com catálogo e orçamento pelo WhatsApp', abordagem: 'Mostre quem procura móveis na cidade e não acha o catálogo.' },
    et: { gancho: 'Rua por rua', resultado: 'Achou 1. Faltam todas', virada: 'Ferramenta boa!', antes: 'De lupa', agora: 'A cidade inteira' }
  };;
  // ==========================================================================

  const PI = Math.PI;
  let bl, CS, menino, rival, robo, comp, telaC, telaM, navG, pino, cadeira, plan, desp, FOV0;
  let ferr, ima, ampG, areia, fio, areiaCima, comidaG, moeda, mapaChao;
  const tudo = [], fx = {}, pinos = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const PLAN = [1.5, 0, -0.9], DESP = [-0.08, 0.76, -1.2];
  // No fundo colorido: o herói, o rival e o monte de empresas (pinos)
  const HEROI = CFG.tipo === 'ampulheta' ? [0, 0, -0.4] : [1.2, 0, 0.5];
  const RIVAL = [-1.0, 0, 1.0];
  const MONTE = [0.1, 0, -0.9];

  const LUGAR = { gancho: 'meta', dor: 'quarto', resultado: 'noite', rival: 'meta', virada: 'meta', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'meta', segue: 'quarto', cartao: 'quarto', capa: 'meta' };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'meta' : 'quarto';
    return LUGAR[B.plano] || 'quarto';
  }

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  const solta = (g) => { K.scene.add(g); tudo.push(g); return g; };

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, CFG.nome + ' Web Design', w * 0.06, h * 0.13, w * 0.072, '#fff', 900, 'left', w * 0.9); txt(c, 'sites rápidos e bonitos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A busca no mapa, uma empresa por vez: o cartão abre, "Site?" e passa pra próxima
  function umaPorUma(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.025;
    [0.3, 0.62].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.05)); c.stroke(); });
    rr(c, w * 0.04, h * 0.05, w * 0.92, h * 0.13, 30, '#ffffff');
    txt(c, CFG.nicho.toLowerCase() + ' perto de mim', w * 0.09, h * 0.115, w * 0.045, '#4a4f58', 700, 'left', w * 0.82);
    rr(c, w * 0.06, h * 0.5, w * 0.88, h * 0.42, 18, '#ffffff');
    const n = e.n % CFG.planilha.length;
    txt(c, CFG.planilha[n], w * 0.1, h * 0.6, w * 0.065, '#111', 900, 'left', w * 0.8);
    txt(c, '★★★★☆ · ' + CFG.etCidade, w * 0.1, h * 0.69, w * 0.045, '#d97706', 800, 'left', w * 0.8);
    txt(c, 'Site: ?', w * 0.1, h * 0.8, w * 0.06, '#e8352b', 900);
    txt(c, 'empresa ' + (e.n + 1) + ' de ???', w * 0.1, h * 0.88, w * 0.04, '#4a4f58', 700);
  }
  // O mapa da ferramenta: os pinos aparecendo todos de uma vez
  function mapaTela(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.02;
    for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(0, (h * i) / 6); c.lineTo(w, (h * i) / 6 + h * 0.04); c.stroke(); c.beginPath(); c.moveTo((w * i) / 6, 0); c.lineTo((w * i) / 6 - w * 0.04, h); c.stroke(); }
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'A cidade inteira', w * 0.05, h * 0.066, w * 0.05, '#fff', 800, 'left', w * 0.9);
    const r = K.rand(7);
    for (let i = 0; i < (e.n || 0); i++) {
      const px = w * (0.06 + r() * 0.88), py = h * (0.2 + r() * 0.75), rr2 = w * 0.022;
      c.fillStyle = i % 3 ? '#e8352b' : '#2fb5a6'; c.beginPath(); c.arc(px, py - rr2, rr2, PI, 0); c.lineTo(px, py + rr2 * 0.6); c.closePath(); c.fill();
    }
  }

  // ---------- Peças da metáfora ----------
  function fazPino(cor) {
    const g = new THREE.Group();
    const m = K.mat(cor, { roughness: 0.4 });
    const ponta = K.malha(new THREE.ConeGeometry(0.07, 0.18, 14).rotateX(PI), m); ponta.position.y = 0.09; g.add(ponta);
    const bola = K.malha(new THREE.SphereGeometry(0.085, 16, 12), m); bola.position.y = 0.22; g.add(bola);
    const furo = K.malha(new THREE.SphereGeometry(0.035, 10, 8), K.mat(0xffffff)); furo.position.set(0, 0.23, 0.065); g.add(furo);
    return g;
  }
  // a pinça: duas hastes prateadas abrindo em V
  function fazPinca() {
    const g = new THREE.Group(), m = K.mat(0xc9ccd1, { metalness: 0.7, roughness: 0.3 });
    [-1, 1].forEach((l) => { const h = K.malha(new THREE.BoxGeometry(0.03, 0.02, 0.62), m); h.position.set(l * 0.035, 0, 0.3); h.rotation.y = -l * 0.07; g.add(h); });
    return g;
  }
  // o ímã gigante em U, vermelho com as pontas prateadas
  function fazIma() {
    const g = new THREE.Group();
    const u = K.malha(new THREE.TorusGeometry(0.42, 0.15, 14, 28, PI), K.mat(0xe8352b, { roughness: 0.4 })); u.rotation.z = PI; g.add(u);
    [-1, 1].forEach((l) => { const p = K.malha(new THREE.BoxGeometry(0.3, 0.34, 0.3), K.mat(0xd8dde3, { metalness: 0.7, roughness: 0.3 })); p.position.set(l * 0.42, 0.17, 0); g.add(p); });
    return g;
  }
  // a lupa gigante: aro preto, vidro azulado e cabo
  function fazLupa() {
    const g = new THREE.Group();
    const aro = K.malha(new THREE.TorusGeometry(0.42, 0.055, 12, 36), K.mat(0x1e1f22, { roughness: 0.4 })); g.add(aro);
    const vidro = new THREE.Mesh(new THREE.CircleGeometry(0.4, 36), new THREE.MeshStandardMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide })); g.add(vidro);
    const cabo = K.malha(new THREE.CylinderGeometry(0.05, 0.06, 0.6, 14), K.mat(0x7a4a22, { roughness: 0.6 })); cabo.position.y = -0.75; g.add(cabo);
    return g;
  }
  // a ampulheta gigante: dois bulbos de vidro, as tampas de madeira e os pilares; a areia de baixo cresce em volta dele
  function fazAmpulheta() {
    const g = new THREE.Group();
    const vid = new THREE.MeshStandardMaterial({ color: 0xdff3ff, transparent: true, opacity: 0.22, depthWrite: false, roughness: 0.1, side: THREE.DoubleSide });
    const madeira = K.mat(0x8a5a2b, { roughness: 0.6 });
    const baixo = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 1.45, 2.2, 32, 1, true), vid); baixo.position.y = 1.1; g.add(baixo);
    const cima = new THREE.Mesh(new THREE.CylinderGeometry(1.45, 0.12, 2.2, 32, 1, true), vid); cima.position.y = 3.3; g.add(cima);
    [0.06, 4.46].forEach((y) => { const t = K.malha(new THREE.CylinderGeometry(1.75, 1.75, 0.14, 32), madeira); t.position.y = y; g.add(t); });
    for (let i = 0; i < 3; i++) { const a = (i / 3) * PI * 2 + 0.5; const p = K.malha(new THREE.CylinderGeometry(0.07, 0.07, 4.4, 10), madeira); p.position.set(Math.sin(a) * 1.62, 2.26, Math.cos(a) * 1.62); g.add(p); }
    return g;
  }
  // a comida que ele troca pela ferramenta
  function fazComida() {
    const g = new THREE.Group();
    if (CFG.comida === 'espetinho') {
      const p = K.malha(new THREE.CylinderGeometry(0.008, 0.008, 0.45, 6), K.mat(0xd9b77a)); p.position.y = 0.12; g.add(p);
      [0, 1, 2].forEach((i) => { const c = K.malha(new THREE.BoxGeometry(0.07, 0.07, 0.07), K.mat([0x8a3b1e, 0xb5562b, 0x8a3b1e][i], { roughness: 0.8 })); c.position.y = 0.2 + i * 0.09 - 0.09; g.add(c); });
    } else if (CFG.comida === 'torta') {
      const f = K.malha(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 20, 1, false, 0, PI / 3), K.mat(0xf0c98a, { roughness: 0.8 })); f.position.y = 0.04; g.add(f);
      const t = K.malha(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 20, 1, false, 0, PI / 3), K.mat(0xe8794a)); t.position.y = 0.09; g.add(t);
    } else {
      const d = K.malha(new THREE.SphereGeometry(0.13, 20, 12, 0, PI * 2, 0, PI / 2), K.mat(0xf5c518, { roughness: 0.9 })); g.add(d);
      const prato = K.malha(new THREE.CylinderGeometry(0.17, 0.15, 0.02, 20), K.mat(0xffffff)); prato.position.y = -0.01; g.add(prato);
    }
    return g;
  }
  // o mapa gigante no chão (só na lupa): quadras, ruas e telhados
  function fazMapaChao() {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1024;
    const c = cv.getContext('2d');
    c.fillStyle = '#dfe9e2'; c.fillRect(0, 0, 1024, 1024);
    const r = K.rand(3);
    for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) rr(c, i * 85 + 10, j * 85 + 10, 65, 65, 6, ['#f4ead8', '#e6d6c0', '#d9e4ef', '#f0dcdc'][Math.floor(r() * 4)]);
    c.strokeStyle = '#ffffff'; c.lineWidth = 14; c.beginPath(); c.moveTo(0, 512); c.lineTo(1024, 470); c.stroke(); c.beginPath(); c.moveTo(430, 0); c.lineTo(520, 1024); c.stroke();
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }));
    m.rotation.x = -PI / 2; m.position.set(0, 0.01, -1.5); m.receiveShadow = true;
    return m;
  }
  // onde cada pino fica: no monte (pinça), espalhado no mapa (lupa) ou chovendo em volta do rival (ampulheta)
  function lugarPino(i) {
    const r = K.rand(11 + i)();
    const r2 = K.rand(99 + i)();
    if (CFG.tipo === 'pinca') { const a = r * PI * 2, d = Math.sqrt(r2) * 1.1; return [MONTE[0] + Math.sin(a) * d, Math.max(0, 0.75 - d * 0.6) * (0.4 + r2 * 0.6), MONTE[2] + Math.cos(a) * d * 0.7]; }
    if (CFG.tipo === 'lupa') return [-5 + r * 10, 0.02, -6.5 + r2 * 8];
    return [RIVAL[0] - 2.2 + r * 4.4, 0, RIVAL[2] - 3.5 + r2 * 3.2];
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['vazio_colorido', { cor: CFG.cor }, 'meta'], ['home_office', {}, 'quarto'], ['home_office', { hora: 'noite' }, 'noite'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaLote = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: CFG.itens, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, CFG.nicho + ' · ' + CFG.cidade, 36, 158, 19, M.marinho, 800, 'left', w - 72);
      txt(c, '99 leads · 65 com site · 34 sem site', 36, 181, 15, '#1f7a44', 800, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseLote = (c, w, h, e) => {
      const k = K.clamp(e.score || 0), A = CFG.analise;
      T.analise(c, w, h, {
        nome: A.nome, ate: e.ate, aderencia: (A.score / 100) * k,
        dores: ['Sem site próprio', A.dor2], oportunidades: [A.op], objecoes: ['"O Instagram já resolve"'], abordagem: A.abordagem
      });
      if (e.ate >= 0) txt(c, Math.round(A.score * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o herói (do canal), o rival de moletom vermelho e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A metáfora: a ferramenta do herói (pinça, celular na ampulheta ou lupa), o ímã do rival, a ampulheta, o mapa e os pinos
    if (CFG.tipo === 'pinca') ferr = fazPinca();
    else if (CFG.tipo === 'lupa') ferr = fazLupa();
    else { const cel = K.celular(); ferr = cel.g && cel.g.isObject3D ? cel.g : cel; }
    solta(ferr); K.nomear('ferramenta', ferr);
    ima = solta(fazIma()); K.nomear('ima', ima);
    if (CFG.tipo === 'ampulheta') {
      ampG = solta(fazAmpulheta()); ampG.position.set(HEROI[0], 0, HEROI[2]); K.nomear('ampulheta', ampG);
      areia = K.malha(new THREE.ConeGeometry(1.35, 1, 32), K.mat(0xe9c27a, { roughness: 0.95 })); solta(areia);
      areiaCima = K.malha(new THREE.ConeGeometry(1.3, 1, 32).rotateX(PI), K.mat(0xe9c27a, { roughness: 0.95 })); solta(areiaCima);
      fio = K.malha(new THREE.CylinderGeometry(0.04, 0.04, 1, 8), K.mat(0xe9c27a)); solta(fio);
    }
    if (CFG.tipo === 'lupa') { mapaChao = solta(fazMapaChao()); K.nomear('mapa', mapaChao); }
    const pinosG = solta(new THREE.Group()); K.nomear('pinos', pinosG);
    for (let i = 0; i < 70; i++) { const p = fazPino(i % 3 ? 0xe8352b : 0x2fb5a6); pinosG.add(p); pinos.push(p); }

    // Quarto: o computador, a cadeira, a planilha, o despertador, a comida e a moeda, a barra e as telas
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    const vazias = ['', '', '', '', '', '', '', '', ''];
    plan = K.m3d('planilha_gigante', { linhas: CFG.planilha.concat(vazias).slice(0, 9), colunas: ['Empresa', 'Telefone', 'Cidade', 'Site'] }); guarda(plan, 'planilha', PLAN);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    comidaG = solta(fazComida()); K.nomear('comida', comidaG);
    moeda = solta(K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })));
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    pino = K.m3d('pino'); guarda(pino, 'pino', [0.9, 2.2, 0.3], 0.8);

    // Efeitos
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof();
    fx.cont = K.contador();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      gancho: e(CFG.et.gancho, 'laranja'), web: e('Web designer', 'azul'), resultado: e(CFG.et.resultado, 'vermelho'),
      outro: e('Outro web designer', 'vermelho'), virada: e(CFG.et.virada, 'verde'), investir: e('Investir', 'azul'),
      cidade2: e(CFG.etCidade, 'azul'), precisa: e('Quem precisa de você', 'verde'), antes: e(CFG.et.antes, 'vermelho'),
      agora: e(CFG.et.agora, 'verde'), cidade: e('Sua cidade?', 'laranja')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>a sua cidade</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  // a ferramenta na mão do herói, apontada pra um ponto (a pinça e a lupa); o celular só na mão
  function ferramentaNa(alvo) {
    ve(ferr);
    const m = menino.mao(1);
    if (CFG.tipo === 'ampulheta') { ferr.position.set(m[0], m[1] - 0.05, m[2] + 0.05); ferr.rotation.set(-0.4, menino.g.rotation.y, 0); ferr.scale.setScalar(0.5); return; }
    ferr.position.set(...m);
    if (CFG.tipo === 'lupa') {
      // a lupa deitada em cima do mapa, com o cabo na mão
      ferr.position.set(alvo[0], 0.9, alvo[2]); ferr.rotation.set(-PI / 2 + 0.35, 0, 0);
      return;
    }
    ferr.lookAt(V(...alvo));
  }
  // os pinos: todos no lugar; quantos aparecem (n), e quantos já foram puxados pelo ímã (k de 0 a 1)
  function pinosEm(tc, n, ima01 = 0, alvoIma) {
    pinos.forEach((p, i) => {
      p.visible = i < n;
      if (!p.visible) return;
      const base = lugarPino(i);
      const k = K.clamp(ima01 * 1.6 - (i / pinos.length) * 0.6);
      if (alvoIma && k > 0) p.position.set(K.lerp(base[0], alvoIma[0], k), K.lerp(base[1], alvoIma[1], k) + Math.sin(k * PI) * 0.8, K.lerp(base[2], alvoIma[2], k));
      else p.position.set(...base);
      p.rotation.set(0, i, 0);
      p.scale.setScalar(CFG.tipo === 'lupa' ? 1.6 : 1);
    });
  }
  // a cena da metáfora com o herói na luta (k: o quanto já avançou na frase)
  function heroiNaLuta(tc, k) {
    if (CFG.tipo === 'pinca') {
      menino.colocar(HEROI, mais(MONTE, [0, 0.3, 0]));
      menino.humor('triste');
      pinosEm(tc, 70);
      // um pino sai do monte, na ponta da pinça, devagar
      const q = (tc * 0.45) % 1, p0 = pinos[0];
      const de = lugarPino(0), ate = mais(HEROI, [-0.5, 1.0, 0.25]);
      p0.position.set(K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) + Math.sin(q * PI) * 0.3, K.lerp(de[2], ate[2], q));
      ferramentaNa(p0.position.toArray());
      menino.apontar(0.25);
      menino.g.position.y = 0;
    } else if (CFG.tipo === 'ampulheta') {
      ve(ampG, areia, areiaCima, fio);
      menino.colocar(HEROI, [0.6, 1.4, 6]);
      menino.reagir('celular', tc);
      ferramentaNa();
      const alt = K.lerp(0.35, 1.05, k);
      areia.scale.set(1, alt, 1); areia.position.set(HEROI[0], alt / 2, HEROI[2]);
      areiaCima.scale.set(1, K.lerp(0.9, 0.3, k), 1); areiaCima.position.set(HEROI[0], 3.3 + 0.45 * K.lerp(0.9, 0.3, k) / 0.9 * 0.9 - 0.2, HEROI[2]);
      fio.scale.set(1, 2.2 - alt + 0.2, 1); fio.position.set(HEROI[0] + 0.25, alt + (2.2 - alt) / 2, HEROI[2] + 0.2);
      menino.humor('triste');
    } else {
      ve(mapaChao);
      menino.colocar(HEROI, [0.2, 0, -0.6]);
      menino.humor('triste');
      pinosEm(tc, 0);
      const alvo = [K.lerp(-0.6, 0.6, (Math.sin(tc * 1.4) + 1) / 2), 0, -0.2];
      ferramentaNa(alvo);
      menino.apontar(0.15);
    }
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a metáfora no 1º quadro: a pinça catando um pino do monte / ele dentro da ampulheta gigante com a areia subindo / ele de lupa num mapa gigante · MOSTRA: personagem, ferramenta
      const tM = quando(CFG.tipo === 'ampulheta' ? 'três' : CFG.tipo === 'lupa' ? 'gigante' : 'pinça', B, 0.85);
      heroiNaLuta(tc, pc(tc, B.inicio, B.ate));
      if (tc < B.inicio + 1.8) fx.et.gancho.em(CFG.tipo === 'pinca' ? mais(MONTE, [0, 1.3, 0]) : cabecaDe(menino, 0.6), tc - B.inicio - 0.6);
      K.som('estalo', B.inicio, 0.4); K.som('whoosh', B.inicio + 0.9, 0.3); K.som('errado', tM, 0.4);
      if (CFG.tipo === 'ampulheta') K.som('agua', B.inicio, 0.3);
      // CÂMERA: 3 cortes: (1) a ferramenta de perto · (2) o rosto dele · (3) a metáfora inteira, topo livre pra capa
      const c1 = B.inicio + 0.9, c2 = B.inicio + 1.8;
      const fp = ferr.position.toArray();
      if (tc < c1) K.filmar([fp, mais(fp, [0, 0.3, 0]), cabecaDe(menino, -0.2)], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.4, obstaculos: false });
      else if (tc < c2) K.filmar([cabecaDe(menino, 0.15), cabecaDe(menino, -0.5)], 'passando', pc(tc, c1, c2), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.3, obstaculos: false });
      else K.filmar(CFG.tipo === 'ampulheta' ? [ampG, [0, 4.5, HEROI[2]], menino] : CFG.tipo === 'lupa' ? [menino, [-3, 0, -4], [3, 0, -4], [0, 0, 1]] : [menino, MONTE, mais(MONTE, [0, 0.8, 0])], 'afastando', pc(tc, c2, B.ate), { plano: 'medio', lado: 12, altura: CFG.tipo === 'lupa' ? 'alto' : 'olho', espacoCima: 0.25, tam: CFG.tipo === 'ampulheta' ? 5.0 : 3.2, obstaculos: false });
    },
    dor(B, tc) {
      // NA TELA: o quarto; ele sentado no computador abrindo uma empresa por vez no mapa ("Site: ?") · MOSTRA: personagem, monitor
      const tW = quando('designer', B, 0.15), tUm = quando(CFG.tipo === 'lupa' ? 'rua' : CFG.tipo === 'ampulheta' ? 'copiando' : 'abre', B, 0.45);
      ve(comp);
      sentado(MONITOR);
      menino.reagir('digitando', tc); menino.humor(tc > tUm ? 'triste' : 'normal');
      const n = tc > tUm ? Math.floor((tc - tUm) / 0.7) : 0;
      comp.tela.desenhar((c, w, h) => umaPorUma(c, w, h, { n }), 'u' + n);
      for (let k = 0; k < 6; k++) K.som('clique', tUm + k * 0.7, 0.3);
      fx.et.web.em(cabecaDe(menino, 0.55), tc - tW);
      // CÂMERA: (1) chegando · perto · direita · olho · (2) passando · perto · esquerda · olho, na tela
      const cv = (tW + tUm) / 2 + 0.3;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 32, altura: 'olho', tam: 1.4 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, mais(MONITOR, [0, 0.4, 0])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -34, altura: 'olho', tam: 1.8 });
    },
    resultado(B, tc) {
      // NA TELA: o quarto de noite; a planilha gigante com poucas linhas; o despertador girando; ele cansado · MOSTRA: personagem, planilha
      ve(comp, plan, desp);
      comp.tela.desenhar((c, w, h) => umaPorUma(c, w, h, { n: 9 }), 'u9');
      plan.userData.m3d.preencher((CFG.planilha.length / 9) * K.clamp(pc(tc, B.inicio, B.inicio + B.dur * 0.6)));
      desp.userData.m3d.horas(8 + pc(tc, B.inicio, B.ate) * 11);
      const tFi = B.inicio + B.dur * 0.6;
      if (tc > tFi) desp.userData.m3d.tocar(tc - tFi, 0.6);
      sentado([1.5, 1.6, -0.9]);
      if (tc > tFi) menino.reagir('mao_na_testa', tc - tFi); else menino.reagir('digitando', tc);
      menino.humor('triste');
      fx.et.resultado.em(mais(PLAN, [0, 2.85, 0.1]), tc - tFi);
      K.som('range', B.inicio + 0.2, 0.3); K.som('errado', tFi, 0.4);
      // CÂMERA: girando · médio · esquerda · olho (de noite)
      K.filmar([cabecaDe(menino, 0.1), mais(PLAN, [0, 1.75, 0]), MONITOR], 'girando', pc(tc, B.inicio, B.ate), { plano: 'medio', lado: -25, angulo: 18, altura: 'olho', tam: 2.4 });
    },
    rival(B, tc) {
      // NA TELA: no mesmo fundo colorido, o rival de moletom vermelho pega a cidade inteira de uma vez (o ímã puxa o monte / os pinos chovem / o mapa acende todo); o contador sobe até 99 · MOSTRA: rival, personagem, pinos
      const tDe = quando('designer', B, 0.3), tV = quando(CFG.tipo === 'ampulheta' ? 'segundos' : CFG.tipo === 'lupa' ? 'acendeu' : 'pegou', B, 0.5);
      heroiNaLuta(tc, 1);
      rival.colocar(RIVAL, mais(MONTE, [0, 0.5, 0])); rival.humor('feliz');
      fx.et.outro.em(cabecaDe(rival, 0.55), tc - tDe);
      const k = K.clamp((tc - tV) / 0.9);
      if (CFG.tipo === 'pinca') {
        ve(ima); const m = rival.mao(1); ima.position.set(m[0] + 0.25, m[1] + 0.25, m[2] + 0.1); ima.rotation.set(0, PI / 2, -0.5);
        rival.apontar(0.6);
        pinosEm(tc, 70, k, ima.position.toArray());
      } else if (CFG.tipo === 'lupa') {
        pinosEm(tc, Math.round(70 * k));
        if (tc > tV) rival.reagir('comemorando', tc - tV); else rival.apontar(0.8);
      } else {
        // os pinos chovem em volta do rival; ele acena e vai almoçar
        pinos.forEach((p, i) => { const b = lugarPino(i), t0 = tV + (i % 20) * 0.03; p.visible = tc > t0; p.position.set(b[0], Math.max(0, 3.5 - (tc - t0) * 9), b[2]); p.scale.setScalar(1.3); });
        if (tc > tV + 0.7) { rival.irPara(RIVAL, mais(RIVAL, [-2.5, 0, 1.5]), pc(tc, tV + 0.7, B.ate + 0.4), tc, { reto: true }); rival.acenar(tc); } else rival.reagir('comemorando', tc - tV);
      }
      if (tc > tV) menino.reagir('surpreso', tc - tV);
      fx.cont.em(mais(cabecaDe(rival, 0.9), [1.0, 0, 0]), tc - tV, { de: 0, ate: 99, dur: 0.8, antes: '+', depois: ' empresas', cor: '#1f7a44' });
      K.som('whoosh', tV, 0.6); K.som('ding', tV + 0.85, 0.5);
      // CÂMERA: (1) o rival, chegando · médio · frente · (2) os dois e os pinos, médio · direita
      const cv = tV + 0.1;
      if (tc < cv) K.filmar([rival, cabecaDe(rival, 0.3)], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: -10, altura: 'olho', tam: 1.8, obstaculos: false });
      else if (CFG.tipo === 'ampulheta') K.filmar([rival, menino, cabecaDe(rival, 0.7), [0, 4.4, HEROI[2]]], 'passando', pc(tc, cv, B.ate), { plano: 'medio', lado: 15, altura: 'olho', tam: 4.2, obstaculos: false });
      else { const q = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(0.4, 0.0, q), CFG.tipo === 'lupa' ? 3.6 : 2.1, 8.4], [0.1, CFG.tipo === 'lupa' ? 0.7 : 1.05, 0.0]); }
    },
    virada(B, tc) {
      // NA TELA: o herói larga a ferramenta (a pinça e a lupa voam pra longe; a ampulheta some num poof e a areia vai junto); a etiqueta verde da virada · MOSTRA: personagem, ferramenta
      const tF = quando(CFG.tipo === 'pinca' ? 'ferramenta' : CFG.tipo === 'lupa' ? 'ferramenta' : 'Falta', B, 0.6);
      heroiNaLuta(tc, 1);
      const voa = K.clamp((tc - tF) / 0.6);
      if (tc > tF) {
        menino.reagir('bate_mesa', tc - tF); menino.humor('bravo');
        if (CFG.tipo === 'ampulheta') { fx.poof.em([HEROI[0], 2.2, HEROI[2]], tc - tF, { escala: 2.2 }); const s = Math.max(0.0001, 1 - voa * 1.4); ampG.scale.setScalar(s); areia.scale.multiplyScalar(s); areiaCima.visible = fio.visible = s > 0.3; }
        else { ferr.position.add(V(1.5 * voa, 2.5 * voa, -2 * voa)); ferr.rotation.z += voa * 6; }
      } else menino.reagir('mao_na_testa', tc - B.inicio);
      fx.et.virada.em(cabecaDe(menino, 0.6), tc - tF);
      K.som('whoosh', tF, 0.6); K.som('brilho', tF + 0.3, 0.4);
      // CÂMERA: subindo · médio · frente · baixo (de baixo pra cima, ele decidido)
      K.filmar([menino, cabecaDe(menino, 0.6)], 'subindo', pc(tc, B.inicio, B.ate), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0, obstaculos: false });
    },
    investe(B, tc) {
      // NA TELA: o quarto; ele de pé com a comida; ela vira moeda e cai no computador; no monitor, a cidade inteira cheia de pinos · MOSTRA: personagem, comida, monitor
      const tDe = quando('decide', B, 0.15), tIn = quando('investir', B, 0.22), tCo = quando(CFG.comida === 'torta' ? 'torta' : CFG.comida, B, 0.32), tFe = quando('ferramenta', B, 0.5), tSe = quando('segundos', B, 0.88);
      ve(comp);
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tDe) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tDe); else menino.reagir('digitando', tc);
      menino.humor(tc > tDe ? 'feliz' : 'normal');
      const mao = menino.mao(1), cPos = mais(mao, [0.03, 0.03, 0.08]);
      if (tc > tCo - 0.35 && tc < tFe) { ve(comidaG); comidaG.position.set(...cPos); comidaG.rotation.set(0, tc * 0.8, 0.15); comidaG.scale.setScalar(pop(tc - tCo + 0.35)); }
      if (tc > tFe) {
        fx.poof.em(mais(cPos, [0, 0.2, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(cPos[0], TECLADO[0], q), K.lerp(cPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(cPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tSe - 0.3 ? 60 : tc > tFe ? 4 : 0;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapaTela(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      K.som('estalo', tSe - 0.3, 0.5);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), cPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: mappoa.com digitado; a lista sobe do computador com "99 leads · 65 com site · 34 sem site" e o grupo SEM SITE; o contador correndo · MOSTRA: navegador, tela, personagem
      const tDi = quando('mappoa.com', B, 0.08), tL = quando('lista', B, 0.45), tCi = quando(CFG.etCidade.split(' ')[0], B, 0.62), tSe = quando('separada', B, 0.72);
      ve(comp, navG);
      comp.tela.desenhar((c, w, h) => mapaTela(c, w, h, { n: 60 }), 'm60');
      K.entrar(navG.g, 'cresce', tc - B.inicio + 0.1, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi + 0.3) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi - 0.3 + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tSe ? 1 + Math.floor((tc - tSe) / 0.2) : 0;
        telaC.mostrar('listaLote', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tSe + k * 0.2, 0.25);
        K.som('brilho', tL, 0.5);
        if (tc < tCi) fx.cont.em(mais(TELA_Q, [0.15, 1.0, 0.25]), tc - tL, { de: 0, ate: 99, dur: 0.7, antes: '', depois: ' leads', cor: '#1f7a44', tam: 0.8 });
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.cidade2.em(mais(TELA_Q, [0.75, 0.9, 0.2]), tc - tCi);
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da primeira empresa SEM SITE; o robô à esquerda; o herói à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseLote', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a metáfora, ele na luta; (2) Agora: o quarto, a lista cheia subindo e ele comemorando · MOSTRA: personagem, tela
      const tA = quando('Agora', B, 0.45);
      if (tc < tA) {
        heroiNaLuta(tc, 0.7);
        fx.et.antes.em(cabecaDe(menino, 0.6), tc - B.inicio - 0.15);
        K.som('errado', B.inicio + 0.3, 0.35);
        K.filmar([menino, cabecaDe(menino, 0.5)], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: -20, altura: 'olho', tam: 2.2, obstaculos: false });
      } else {
        ve(comp, telaC);
        comp.tela.desenhar((c, w, h) => mapaTela(c, w, h, { n: 60 }), 'm60');
        telaC.mostrar('listaLote', { n: 4, sel: 0 });
        menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), [0.8, 1.4, 5]);
        menino.reagir('comemorando', tc - tA); menino.humor('feliz');
        fx.cont.em(mais(TELA_Q, [0.15, 1.0, 0.25]), tc - tA, { de: 0, ate: 99, dur: 0.5, antes: '', depois: ' leads', cor: '#1f7a44', tam: 0.8 });
        fx.et.agora.em(cabecaDe(menino, 0.6), tc - tA - 0.2);
        K.som('whoosh', tA, 0.5); K.som('certo', tA + 0.5, 0.5);
        K.filmar([telaC, menino, cabecaDe(menino, 0.5)], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: 12, altura: 'olho', tam: 1.7 });
      }
    },
    segue(B, tc) {
      // NA TELA: ele de pé no quarto; "Comenta a sua cidade" e o pino; o cartão de seguir; mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tCi = quando('cidade', B, 0.12), tSg = quando('segue', B, 0.3), tPc = quando('computador', B, 0.45), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      if (tc < tPc) {
        ve(pino); const q = K.clamp((tc - tCi) / 0.5); pino.visible = tc > tCi;
        pino.position.set(1.05, K.lerp(3.6, 1.75, K.saiVolta(q)), 0.25); pino.rotation.y = tc * 1.5;
        fx.et.cidade.em([1.05, 2.75, 0.25], tc - tCi - 0.15);
        K.som('estalo', tCi, 0.5);
      }
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), [1.05, 2.0, 0.25]], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      heroiNaLuta(1.2, 0.8);
      if (CFG.tipo !== 'ampulheta') menino.colocar(HEROI, [2.4, 1.3, 4.2]);
      menino.reagir('mao_na_testa', 0.6);
      if (CFG.tipo !== 'ampulheta') ferramentaNa(CFG.tipo === 'pinca' ? pinos[0].position.toArray() : [0.2, 0, -0.2]);
      // capa de perto: ele com a mão na testa e a metáfora do lado (a ampulheta inteira de longe)
      if (CFG.tipo === 'pinca') K.mirar([1.9, 1.45, 3.4], [0.55, 0.95, -0.3]);
      else if (CFG.tipo === 'lupa') K.mirar([1.75, 2.0, 3.5], [0.8, 0.8, -0.3]);
      else K.filmar([ampG, [0, 4.5, HEROI[2]], menino], 'parado', 0, { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.3, tam: 5.0, obstaculos: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const lugar = plano === 'capa' ? 'meta' : lugarDe(B, tc);
    CS.usar(lugar);
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    pinos.forEach((p) => { p.visible = false; });
    menino.g.position.y = 0;
    if (ampG) ampG.scale.setScalar(1);
    ferr.rotation.set(0, 0, 0); ferr.scale.setScalar(1);
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // pinos e o grupo deles só no fundo colorido
    if (lugar === 'meta') { const pg = pinos[0].parent; pg.visible = true; }
    // no quarto, a cadeira fica sempre na cena (vazia e empurrada pra trás quando ele está de pé)
    if ((lugar === 'quarto' || lugar === 'noite') && !cadeira.visible) { cadeira.position.set(-2.0, 0, -0.9); cadeira.rotation.set(0, PI / 2, 0); ve(cadeira); }
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
