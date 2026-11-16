// Web designer, seu Instagram tá lindo. E vazio (canal Mappoa).
// O Lucas acabou de aprender a fazer sites, organiza o Instagram e posta todo dia. O gancho é a metáfora: ele sozinho
// num palco de show, o Instagram lindo no telão gigante e a plateia inteira de cadeiras vazias, com uma moita de feno
// rolando. Três meses e só 1 curtida de um perfil aleatório. Ele para de esperar, investe "o preço de uma pizza",
// digita mappoa.com, liga pra 30 lojas de roupa de Londrina, 29 dizem não e 1 diz sim: a primeira venda. Quanto mais
// ele chama, mais aprende (a escada). Antes x Agora.
// Seis lugares (K.cenarios): o palco de show, o quarto (home_office), o palco do Mappoa, a fachada da loja, o fundo
// verde da escada e a rua entre prédios. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, robo, comp, cel, cadeira, nota, moeda, telaC, telaM, navG, escada, feno, cadeiras, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira na frente; o celular gigante à esquerda
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const CEL = [-1.6, 0, -0.1];
  // Palco de show: o Lucas no meio do palco; o telão no fundo; as cadeiras vazias na plateia
  const PALCO = [0, 0, 0.8], TELAO = [0, 3.9, -4.85];
  // Fachada da loja: a porta em x DX; a dona na calçada
  let DX = 0, DONA = [1.2, 0, 2.2], LUCAS_F = [-0.2, 0, 2.4];
  // Rua entre prédios
  let RUA_Z = -10;
  // Escada (fundo verde)
  const ESC_S = 1.5, ESC_N = 5;

  const LUGAR = {
    gancho: 'palco', posta: 'quarto', curtida: 'quarto', decide: 'quarto', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', liga: 'quarto', venda: 'loja', aprende: 'escada', segue: 'quarto', cartao: 'quarto', capa: 'palco'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'palco' : 'rua';
    return LUGAR[B.plano] || 'quarto';
  }

  const LOJAS = [
    { nome: 'Vento Sul Moda', end: 'Av. Higienópolis, 1180', chips: ['whats', 'insta'] },
    { nome: 'Ateliê Pé Vermelho', end: 'Rua Sergipe, 640', chips: ['tel', 'insta'] },
    { nome: 'Closet da Gleba', end: 'Av. Madre Leônia, 2210', chips: ['whats'] },
    { nome: 'Boutique Ipê', end: 'Rua Pernambuco, 315', chips: ['whats', 'tel'] }
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
  const CORES_POST = [['#2fb5a6', '#2f6fd6'], ['#f59e0b', '#e8352b'], ['#8a4fd8', '#ff4d8a'], ['#1067f8', '#3bffb0'], ['#ffd23f', '#f08a24'], ['#2f6f5e', '#2fb5a6'], ['#ff4d8a', '#ffd23f'], ['#3a6fd8', '#8a4fd8'], ['#2fb54a', '#1067f8']];
  // Um post bonito (um "site" desenhado no quadradinho)
  function postinho(c, x, y, s, i) {
    const [a, b] = CORES_POST[i % CORES_POST.length];
    const d = c.createLinearGradient(x, y, x + s, y + s); d.addColorStop(0, a); d.addColorStop(1, b);
    c.fillStyle = d; c.fillRect(x, y, s, s);
    rr(c, x + s * 0.12, y + s * 0.18, s * 0.76, s * 0.6, s * 0.05, 'rgba(255,255,255,.92)');
    rr(c, x + s * 0.12, y + s * 0.18, s * 0.76, s * 0.12, s * 0.05, 'rgba(0,0,0,.12)');
    rr(c, x + s * 0.18, y + s * 0.38, s * 0.4, s * 0.06, 3, a); rr(c, x + s * 0.18, y + s * 0.5, s * 0.55, s * 0.05, 3, '#d6dbe3');
    rr(c, x + s * 0.18, y + s * 0.62, s * 0.25, s * 0.08, 6, b);
  }
  // O perfil do Instagram no telão (deitado): a foto, o nome, os números e a grade de posts
  function telaoPerfil(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const r = h * 0.17, cx0 = w * 0.13, cy0 = h * 0.3;
    const d = c.createLinearGradient(cx0 - r, cy0 - r, cx0 + r, cy0 + r); d.addColorStop(0, '#f59e0b'); d.addColorStop(0.5, '#e8352b'); d.addColorStop(1, '#8a4fd8');
    c.fillStyle = d; c.beginPath(); c.arc(cx0, cy0, r * 1.12, 0, 7); c.fill();
    c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(cx0, cy0, r, 0, 7); c.fill();
    txt(c, 'L', cx0, cy0 + 2, r * 1.1, '#fff', 900, 'center');
    txt(c, 'lucas.webdesign', w * 0.04, h * 0.6, h * 0.075, '#111', 900, 'left', w * 0.24);
    txt(c, 'Sites bonitos e rápidos ✨', w * 0.04, h * 0.7, h * 0.05, '#4a4f58', 700, 'left', w * 0.24);
    [['9', 'posts'], [String(e.curt || 0), 'curtida'], ['0', 'clientes']].forEach(([n, l], i) => {
      const x = w * 0.06 + i * w * 0.085;
      txt(c, n, x, h * 0.83, h * 0.08, i === 2 ? '#e8352b' : '#111', 900, 'center');
      txt(c, l, x, h * 0.92, h * 0.042, '#4a4f58', 700, 'center');
    });
    const s = h * 0.29, gx = w * 0.33, gy = h * 0.06, gap = h * 0.025;
    for (let i = 0; i < 9; i++) {
      const col = i % 5, lin = Math.floor(i / 5);
      if (i >= (e.n == null ? 9 : e.n)) continue;
      postinho(c, gx + col * (s * 1.1 + gap), gy + lin * (s * 1.1 + gap) + s * 0.05, s * 1.1, i);
    }
    if ((e.n == null ? 9 : e.n) >= 9) { rr(c, gx + 4 * (s * 1.1 + gap), gy + (s * 1.1 + gap) + s * 0.05, s * 1.1, s * 1.1, 8, '#f1f3f6'); txt(c, '+', gx + 4 * (s * 1.1 + gap) + s * 0.55, gy + (s * 1.1 + gap) + s * 0.6, s * 0.5, '#c3c8d0', 700, 'center'); }
  }
  // O Instagram no celular gigante (em pé)
  function celPerfil(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.05, '#111', 800);
    c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.17, h * 0.13, w * 0.1, 0, 7); c.fill();
    txt(c, 'L', w * 0.17, h * 0.13 + 2, w * 0.1, '#fff', 900, 'center');
    txt(c, 'lucas.webdesign', w * 0.32, h * 0.11, w * 0.06, '#111', 900, 'left', w * 0.64);
    txt(c, (e.n || 0) + ' posts · 0 clientes', w * 0.32, h * 0.16, w * 0.045, '#4a4f58', 700, 'left', w * 0.64);
    const s = (w - 4 * 6) / 3;
    for (let i = 0; i < (e.n || 0) && i < 12; i++) postinho(c, 6 + (i % 3) * (s + 6), h * 0.24 + Math.floor(i / 3) * (s + 6), s, i);
  }
  // O celular depois de três meses: zero mensagens; com a notificação da curtida aleatória
  function celVazio(c, w, h, e) {
    const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, '#3a6fd8'); d.addColorStop(1, '#4b3a8f'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w / 2, h * 0.12, w * 0.2, '#fff', 300, 'center');
    txt(c, 'Dia ' + (e.dia || 1), w / 2, h * 0.2, w * 0.065, 'rgba(255,255,255,.85)', 700, 'center');
    if (!e.curtida) {
      txt(c, '0', w / 2, h * 0.47, w * 0.42, '#ffffff', 900, 'center');
      txt(c, 'clientes', w / 2, h * 0.61, w * 0.09, '#ffffff', 800, 'center');
    } else {
      rr(c, w * 0.05, h * 0.3, w * 0.9, h * 0.15, 22, 'rgba(255,255,255,.95)');
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.17, h * 0.375, w * 0.075, 0, 7); c.fill();
      txt(c, '❤', w * 0.17, h * 0.378, w * 0.08, '#fff', 900, 'center');
      txt(c, 'capinhas_top_88', w * 0.28, h * 0.355, w * 0.055, '#1e1f22', 900, 'left', w * 0.64);
      txt(c, 'curtiu sua foto', w * 0.28, h * 0.4, w * 0.05, '#4a4f58', 700, 'left', w * 0.64);
      txt(c, '0 clientes', w / 2, h * 0.62, w * 0.11, '#ffffff', 900, 'center');
    }
  }
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Lucas Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites bonitos e rápidos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A lista de ligações no monitor: as lojas riscadas uma a uma
  function listaLigacoes(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.16, 0, '#0b1b3a'); txt(c, 'Ligações: ' + (e.n || 0) + ' de 30', w * 0.05, h * 0.08, w * 0.06, '#fff', 800, 'left', w * 0.9);
    for (let i = 0; i < 6; i++) {
      const y = h * (0.24 + i * 0.13), feito = i < Math.min(6, e.n || 0);
      c.fillStyle = '#eef1f5'; c.fillRect(w * 0.05, y - h * 0.045, w * 0.9, h * 0.09);
      txt(c, ['Vento Sul Moda', 'Ateliê Pé Vermelho', 'Closet da Gleba', 'Boutique Ipê', 'Moda Norte', 'Lojinha da Vila'][i], w * 0.09, y, w * 0.05, '#1e1f22', 700, 'left', w * 0.65);
      if (feito) txt(c, i === 0 && e.sim ? '✓' : '✗', w * 0.88, y, w * 0.07, i === 0 && e.sim ? '#2fb54a' : '#e8352b', 900, 'center');
    }
  }
  // O mapa da ferramenta (no monitor, logo depois de investir): os pinos de quem precisa de site
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

  // ---------- A moita de feno (rola pelo palco vazio) ----------
  function fazFeno() {
    const g = new THREE.Group(), r = K.rand(17);
    const mats = [K.mat(0xb8904a, { roughness: 1 }), K.mat(0x9c7638, { roughness: 1 }), K.mat(0xd1ad66, { roughness: 1 })];
    for (let i = 0; i < 22; i++) {
      const m = K.malha(new THREE.TorusGeometry(0.26 + r() * 0.1, 0.014, 5, 22), mats[i % 3]);
      m.rotation.set(r() * PI, r() * PI, r() * PI); g.add(m);
    }
    const nucleo = K.malha(new THREE.IcosahedronGeometry(0.2, 1), K.mat(0x8a6a30, { roughness: 1, wireframe: true })); g.add(nucleo);
    return g;
  }
  // A moita rolando de xa a xb (k de 0 a 1), quicando
  function fenoEm(k, xa, xb, z) {
    ve(feno);
    const x = K.lerp(xa, xb, k);
    feno.position.set(x, 0.33 + Math.abs(Math.sin(k * PI * 5)) * 0.25, z);
    feno.rotation.set(0, 0, -x / 0.33);
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['palco_show', { texto: 'LUCAS' }, 'palco'], ['home_office', {}, 'quarto'], 'mundo_mappoa', ['fachada', { loja: 'loja' }, 'loja'], ['vazio_colorido', { cor: 'verde' }, 'escada'], ['rua_predios', {}, 'rua']]);

    // Palco: tira a plateia de gente (fica só o escuro) e põe as fileiras de cadeiras vazias, com uma luz fraca nelas
    const Cp = CS.todos.palco, ref = new THREE.Color(0x23252b), celRef = new THREE.Color(0xcfe6ff);
    Cp.grupo.traverse((o) => {
      if (!o.isMesh || !o.material || !o.material.color) return;
      const c = o.material.color;
      const perto = (a) => Math.abs(c.r - a.r) + Math.abs(c.g - a.g) + Math.abs(c.b - a.b) < 0.02;
      if ((perto(ref) && o.position.z > 4) || (perto(celRef) && o.position.z > 4)) o.visible = false;
    });
    cadeiras = new THREE.Group();
    for (let fila = 0; fila < 4; fila++) for (let i = -5; i <= 5; i++) {
      const ch = K.m3d('cadeira', { cor: 0x9a1420 });
      ch.position.set(i * 0.85 + (fila % 2) * 0.42, -1.0, 4.8 + fila * 1.25); ch.rotation.y = PI; ch.scale.setScalar(1.15);
      cadeiras.add(ch);
    }
    Cp.grupo.add(cadeiras); K.nomear('cadeiras', cadeiras);
    const luzPlateia = new THREE.PointLight(0xffe7c4, 22, 16, 1.2); luzPlateia.position.set(0, 3.2, 7.5); Cp.grupo.add(luzPlateia);
    K.nomear('telao', Cp.telao.m);

    // Fachada da loja
    const Cf = CS.todos.loja; DX = Cf.lugares.porta[0];
    DONA = [DX + 1.25, 0, 2.25]; LUCAS_F = [DX - 0.15, 0, 2.4];
    if (Cf.objetos && Cf.objetos.fachada) K.nomear('loja', Cf.objetos.fachada);
    else if (Cf.grupo) K.nomear('loja', Cf.grupo);
    const Cr = CS.todos.rua; if (Cr.lugares && Cr.lugares.pizzaria) RUA_Z = Cr.lugares.pizzaria[2];

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaLojas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: LOJAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Lojas de roupa · Londrina, PR', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseLoja = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Vento Sul Moda', ate: e.ate, aderencia: 0.9 * k,
        dores: ['Sem site: as peças só no Instagram', 'Cliente não acha o endereço nem o horário'], oportunidades: ['Site com catálogo e botão do WhatsApp'],
        objecoes: ['"Meu Instagram já vende"'], abordagem: 'Mostre quem procura loja de roupa no Google e acha a concorrente.'
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

    // Personagens: o Lucas (do canal), a dona da Vento Sul e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.personagem('dona', { cores: { blazer: 0xe86a3a, vestido: 0xfff1dc, cabelo: 0x3a2416 } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cadeira, o celular gigante, a nota da pizza e a moeda, a barra do endereço e as telas
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CEL);
    nota = folha(0.42, 0.22, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#5fb86a'); c.strokeStyle = '#2f7a3a'; c.lineWidth = 6; c.beginPath(); c.roundRect(8, 8, w - 16, h - 16, 10); c.stroke();
      txt(c, '1 PIZZA', w * 0.62, h * 0.5, h * 0.26, '#ffffff', 900, 'center');
      // a fatia de pizza
      c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(w * 0.08, h * 0.25); c.lineTo(w * 0.32, h * 0.25); c.lineTo(w * 0.2, h * 0.8); c.closePath(); c.fill();
      c.fillStyle = '#e8352b'; [[0.16, 0.36], [0.24, 0.4], [0.2, 0.55]].forEach(([x, y]) => { c.beginPath(); c.arc(w * x, h * y, h * 0.045, 0, 7); c.fill(); });
      c.fillStyle = '#c9822f'; c.fillRect(w * 0.08, h * 0.22, w * 0.24, h * 0.06);
    });
    guarda(nota, 'nota');
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 }));
    guarda(moeda, null);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Palco e fundo verde: a moita de feno e a escada
    feno = fazFeno(); guarda(feno, 'feno');
    escada = K.m3d('escada_sucesso', { degraus: ESC_N }); guarda(escada, 'escada', [0, 0, 0], ESC_S);

    // Efeitos
    fx.holo = K.holofote();
    fx.folhas = K.folhasVento(77, 46, { papel: true });
    fx.cont = K.contador();
    fx.fala = K.balaoFala(); fx.fala2 = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo(); fx.simb4 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.vel = K.velocidade();
    fx.grana = K.chuvaDinheiro();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      zero: e('0 clientes', 'vermelho'), web: e('Web designer', 'azul'), todo: e('Todo dia', 'verde'), tres: e('3 meses', 'vermelho'),
      aleatorio: e('Perfil aleatório', 'laranja'), bora: e('Bora atrás!', 'verde'), investir: e('Investir', 'azul'), londrina: e('Londrina', 'azul'),
      precisa: e('Quem precisa de você', 'verde'), nao29: e('29 nãos', 'vermelho'), venda: e('Primeira venda!', 'verde'),
      abordagem: e('Abordagem melhor', 'azul'), maisSim: e('Mais sim', 'verde'), esperando: e('Esperando', 'vermelho'), fechou: e('Fechou', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Posta e espera ou vai atrás? <em>Comenta ATRÁS</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  const celTela = (fn, chave) => cel.userData.m3d.tela.desenhar(fn, chave);
  const virarCel = () => cel.rotation.set(0, Math.atan2(0.4 - CEL[0], 2.6 - CEL[2]), 0);
  const telao = (fn, chave) => CS.todos.palco.telao.desenhar(fn, chave);
  // O palco vazio: o Lucas no meio, o holofote nele e o Instagram no telão
  function palcoVazio(n, curt) {
    telao((c, w, h) => telaoPerfil(c, w, h, { n, curt }), 'perfil' + n + '-' + curt);
    fx.holo.em(PALCO, { de: [0.8, 6.4, 1.6], abertura: 1.0, forca: 1 });
  }
  // A posição de cima do degrau j da escada (no fundo verde)
  function degrau(j) {
    const x = (-((ESC_N - 1) * 0.55) / 2 + j * 0.55) * ESC_S;
    return [x, 0.3 * (j + 1) * ESC_S, 0.1];
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o palco de show enorme; o Instagram do Lucas no telão gigante; o Lucas sozinho no holofote; as cadeiras vazias e a moita de feno · MOSTRA: personagem, telao, cadeiras
      // CENÁRIO: palco_show sem plateia: só cadeiras vazias; os refletores coloridos girando (o cenário cuida)
      const tW = B.inicio, tI = quando('Instagram', B, 0.25), tL = quando('lindo', B, 0.5), tV = quando('vazio', B, 0.82);
      // OBJETOS SE MEXENDO: os posts do telão pipocam de "Instagram" a "lindo"; a moita de feno rola pelo palco em "vazio"
      const n = tc < tI ? 9 : Math.min(9, Math.floor(K.lerp(3, 9.99, pc(tc, tI, tL))));
      palcoVazio(n, 0);
      if (tc > tV - 0.55) fenoEm(pc(tc, tV - 0.55, B.ate + 0.3), -3.5, 3.0, 2.0);
      // PERSONAGEM: começo abre os braços orgulhoso pro telão · em "lindo": mostrando o telão · em "vazio": olha a plateia e encolhe os ombros
      if (tc > tV) { menino.colocar(PALCO, [0, 1.2, 8]); menino.reagir('ombros', tc - tV); menino.humor('triste'); }
      else if (tc > tL) { menino.colocar(PALCO, [0, 1.2, 8]); menino.reagir('mostrando', tc - tL); menino.humor('feliz'); }
      else { menino.colocar(PALCO, [0, 1.2, 8]); menino.reagir('comemorando', tc - tW); menino.humor('feliz'); }
      // EFEITOS VISUAIS: "0 clientes" em "vazio"
      fx.et.zero.em(cabecaDe(menino, 0.6), tc - tV);
      // SONS: brilho em "Instagram" · os posts estalando · o vento (whoosh) com a moita em "vazio" · errado
      K.som('brilho', tI, 0.4); for (let k = 0; k < 5; k++) K.som('estalo', tI + k * 0.12, 0.2);
      K.som('whoosh', tV - 0.2, 0.7); K.som('errado', tV + 0.3, 0.35);
      // CÂMERA: 4 cortes de ~0,7 s: (1) da plateia: as cadeiras vazias na frente, o palco e o telão · (2) o telão de perto · (3) o Lucas no holofote · (4) baixa, a moita passando com ele atrás
      const c1 = Math.min(B.inicio + 0.7, tI + 0.1), c2 = tL, c3 = tV - 0.4;
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.4, 3.6, K.lerp(14.5, 13.6, q)], [0, 1.7, 1.5]); }
      else if (tc < c2) K.filmar([mais(TELAO, [-2.6, -1.2, 0]), mais(TELAO, [2.6, 1.2, 0])], 'chegando', pc(tc, c1, c2), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.4 });
      else if (tc < c3) K.filmar([menino, cabecaDe(menino, 0.3)], 'girando', pc(tc, c2, c3), { plano: 'medio', lado: 20, altura: 'baixo', tam: 1.5 });
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(-0.6, -1.2, q), 0.7, 7.8], [0.2, 1.2, 0.8]); }
    },
    posta(B, tc) {
      // NA TELA: o quarto de dia; o Lucas no computador com o site de exemplo; depois o celular gigante com o Instagram enchendo de posts · MOSTRA: personagem, celular
      const tAp = quando('aprender', B, 0.12), tSi = quando('sites', B, 0.3), tO = quando('Organizou', B, 0.42), tI = quando('Instagram', B, 0.55), tP = quando('postou', B, 0.7), tD = quando('dia', B, 0.92);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      // ENTRA AGORA: o celular gigante cresce em "Organizou"; os posts aparecem um a um de "postou" até "dia"
      ve(cel); virarCel(); K.entrar(cel, 'cresce', tc - tO, { dur: 0.35 });
      const n = tc < tI ? 0 : tc < tP ? 3 : Math.min(12, 3 + Math.floor(pc(tc, tP, tD + 0.2) * 9.99));
      celTela((c, w, h) => celPerfil(c, w, h, { n }), 'perfil' + n);
      // PERSONAGEM: começo digitando no computador (aprendendo) · em "sites": comemora sentado · de "Organizou": de pé do lado do celular, mostrando · em "dia": comemorando
      if (tc < tO) { ve(cadeira); menino.colocar(EM_PE, [0.8, 1.4, 5]); if (tc > tSi) menino.reagir('vitoria', tc - tSi); else menino.apontar(0.5); menino.humor('feliz'); }
      else { menino.colocar([-0.7, 0, 0.75], tc > tD ? [1.2, 1.2, 4] : mais(CEL, [0, 1.0, 0])); if (tc > tD) menino.reagir('comemorando', tc - tD); else menino.reagir('mostrando', tc - tO); menino.humor('feliz'); }
      // EFEITOS VISUAIS: "Web designer" em "sites" · "Todo dia" em "postou"
      if (tc < tO) fx.et.web.em(cabecaDe(menino, 0.5), tc - tSi); else fx.et.todo.em(mais(CEL, [0, 1.95, 0]), tc - tP);
      // SONS: clique do teclado · ding em "sites" · whoosh em "Organizou" · estalo a cada post
      for (let k = 0; k < 6; k++) K.som('clique', tAp + k * 0.09, 0.2);
      K.som('ding', tSi, 0.5); K.som('whoosh', tO, 0.5);
      for (let k = 0; k < 6; k++) K.som('estalo', tP + k * 0.12, 0.2);
      // CÂMERA: (1) até "Organizou": chegando · perto · esquerda · olho, no Lucas e no monitor · (2) passando · médio · frente · baixo, no celular e nele
      if (tc < tO) K.filmar([menino, cabecaDe(menino, 0.5), MONITOR], 'chegando', pc(tc, B.inicio, tO), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.5, obstaculos: false });
      else K.filmar([menino, cabecaDe(menino, 0.3), mais(CEL, [-0.4, 0.2, 0]), mais(CEL, [0, 1.65, 0])], 'passando', pc(tc, tO, B.ate), { plano: 'perto', lado: 12, altura: 'olho', tam: 1.9 });
    },
    curtida(B, tc) {
      // NA TELA: o Lucas sentado de frente pro celular gigante "0 clientes"; os papéis do calendário voando; o contador de dias; a notificação da curtida · MOSTRA: personagem, celular
      const tT = quando('Três', B, 0.02), tN = quando('nenhum', B, 0.25), tC = quando('curtida', B, 0.5), tA = quando('aleatório', B, 0.85);
      ve(comp, cel); comp.tela.desenhar(telaEscura, 'escura'); virarCel();
      const dia = Math.round(K.lerp(1, 90, pc(tc, tT, tN)));
      celTela((c, w, h) => celVazio(c, w, h, { dia, curtida: tc > tC }), 'v' + dia + (tc > tC));
      if (tc > tC) cel.userData.m3d.vibrar(tc - tC, Math.max(0, 1 - (tc - tC) * 2.5));
      // OBJETOS SE MEXENDO: os papéis do calendário voando de "Três" a "nenhum"; o contador de "Dia 1" a "Dia 90"
      fx.folhas.em([0, 0, -0.4], tc, { largura: 9, forca: tc < tN + 0.3 ? 1 : 0.2 });
      fx.cont.em(mais(SEAT, [0.2, 2.25, 0.2]), tc - tT, { de: 1, ate: 90, dur: Math.max(0.5, tN - tT), antes: 'Dia ', depois: '', cor: '#e8352b' });
      // PERSONAGEM: começo olha o relógio · em "curtida": se anima (o coração) · em "aleatório": mão na testa
      sentado(mais(CEL, [0, 0.9, 0]));
      if (tc > tA) { menino.reagir('mao_na_testa', tc - tA); menino.humor('triste'); }
      else if (tc > tC) { menino.reagir('surpreso', tc - tC); menino.humor('feliz'); }
      else menino.reagir('olha_relogio', tc - B.inicio);
      // EFEITOS VISUAIS: "0 clientes" em "nenhum" · o ❤ saindo do celular em "curtida" · "Perfil aleatório" em "aleatório"
      if (tc < tC) fx.et.zero.em(mais(CEL, [0, 1.95, 0]), tc - tN);
      else { fx.simb.em(mais(CEL, [0.1, 1.9, 0.2]), tc - tC, { tipo: '❤', tam: 1.2 }); fx.et.aleatorio.em(mais(CEL, [0.2, 2.35, 0]), tc - tA); }
      // SONS: whoosh dos papéis · ding da curtida · pingo em "aleatório"
      K.som('whoosh', tT, 0.5); K.som('ding', tC, 0.6); K.som('pingo', tA, 0.5);
      // CÂMERA: (1) até "curtida": girando · médio · direita · olho · (2) chegando · perto · esquerda, no celular e no rosto
      if (tc < tC) K.filmar([cabecaDe(menino, 0.2), mais(SEAT, [0.4, 0.1, 0.8]), mais(CEL, [0, 1.5, 0])], 'girando', pc(tc, B.inicio, tC), { plano: 'perto', lado: 10, angulo: 30, altura: 'olho', tam: 1.35 });
      else K.filmar([mais(CEL, [0, 0.5, 0]), mais(CEL, [0, 1.7, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, tC, B.ate), { plano: 'perto', lado: -15, altura: 'olho', tam: 1.4 });
    },
    decide(B, tc) {
      // NA TELA: o quarto; o Lucas bate na mesa, o celular gigante some num poof, ele levanta girando a cadeira · MOSTRA: personagem, cadeira
      const tP = quando('parou', B, 0.12), tE = quando('esperar', B, 0.3), tD = quando('decidiu', B, 0.5), tA = quando('atrás', B, 0.75);
      ve(comp); comp.tela.desenhar(telaEscura, 'escura');
      // OBJETOS SE MEXENDO: o celular gigante encolhe e some em "esperar" (poof)
      if (tc < tE + 0.3) { ve(cel); virarCel(); cel.scale.setScalar(tc < tE ? 1 : Math.max(0.001, 1 - (tc - tE) / 0.3)); celTela((c, w, h) => celVazio(c, w, h, { dia: 90, curtida: true }), 'v90true'); }
      fx.poof.em(mais(CEL, [0, 0.8, 0]), tc - tE, { escala: 1.3 });
      // PERSONAGEM: começo sentado, bate na mesa em "parou" · em "decidiu": levanta, a cadeira gira, ergue o punho
      if (tc < tD) { sentado(mais(CEL, [0, 0.9, 0])); if (tc > tP) menino.reagir('bate_mesa', tc - tP); else menino.reagir('mao_na_testa', tc - B.inicio); }
      else {
        ve(cadeira); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, -0.8 + K.suave(pc(tc, tD, tD + 0.6)) * 2.4, 0);
        menino.colocar(mais(SEAT, [0.45, 0, 0.55]), [1.4, 1.1, 4]); menino.reagir('vitoria', tc - tD); menino.humor('feliz');
      }
      // EFEITOS VISUAIS: "Bora atrás!" em "atrás"
      fx.et.bora.em(cabecaDe(menino, 0.5), tc - tA);
      K.som('baque', tP, 0.5); K.som('whoosh', tD, 0.5); K.som('ding', tA, 0.4);
      // CÂMERA: (1) até "decidiu": chegando · perto · direita · olho · (2) subindo · médio · frente · baixo
      if (tc < tD) K.filmar([cabecaDe(menino, 0), mais(SEAT, [0, 0.5, 0]), mais(CEL, [0, 1.2, 0])], 'chegando', pc(tc, B.inicio, tD), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.4 });
      else K.filmar([menino, cabecaDe(menino, 0.8), cadeira], 'subindo', pc(tc, tD, B.ate), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.1 });
    },
    investe(B, tc) {
      // NA TELA: o quarto; ele de pé com a nota "1 PIZZA"; ela vira moeda e cai no teclado; o mapa com os pinos no monitor · MOSTRA: personagem, nota, monitor
      const tIn = quando('Investiu', B, 0.05), tPz = quando('pizza', B, 0.35), tFe = quando('ferramenta', B, 0.55), tCl = quando('cliente', B, 0.85);
      ve(comp);
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      // PERSONAGEM: começo segurando a nota · em "pizza": faz que sim · em "ferramenta": digita
      if (tc < tPz) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tPz); else menino.reagir('digitando', tc);
      menino.humor(tc > tPz ? 'feliz' : 'normal');
      // ENTRA AGORA: a nota na mão até "ferramenta"; ela vira moeda (poof) e cai no teclado; o mapa enche de pinos em "cliente"
      const mao = menino.mao(1), notaPos = mais(mao, [0.03, 0.08, 0.1]);
      if (tc < tFe) { ve(nota); nota.position.set(...notaPos); nota.lookAt(K.camera.position); nota.rotation.z += Math.sin(tc * 3) * 0.1; nota.scale.setScalar(pop(tc - tIn + 0.3)); }
      if (tc > tFe) {
        fx.poof.em(mais(notaPos, [0, 0.15, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(notaPos[0], TECLADO[0], q), K.lerp(notaPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(notaPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tCl ? Math.min(6, 1 + Math.floor((tc - tCl) / 0.1)) : 1;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tCl + k * 0.1, 0.2);
      // EFEITOS VISUAIS: "Investir" em "Investiu"
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) chegando · médio · esquerda, nele com a nota · (2) subindo · médio · frente, na tela
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), notaPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a lista das lojas de roupa de Londrina sobe do computador; o Lucas ao lado · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.05), tDi = quando('digita', B, 0.15), tL = quando('lista', B, 0.5), tLo = quando('lojas', B, 0.62), tLd = quando('Londrina', B, 0.8);
      ve(comp, navG); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      // ENTRA AGORA: a barra em "computador" e as letras a partir de "digita"; a lista sobe do monitor em "lista"
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tDi + tL) / 2 + 0.2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const nn = tc > tLo ? 1 + Math.floor((tc - tLo) / 0.22) : 0;
        telaC.mostrar('listaLojas', { n: Math.min(4, nn), sel: nn >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tLo + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo digitando · depois levanta e aponta a Vento Sul Moda
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      // EFEITOS VISUAIS: "Londrina" em "Londrina"
      fx.et.londrina.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tLd);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando · médio · frente · olho
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco da marca, a análise da Vento Sul Moda; o robô à esquerda; o Lucas à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco do Mappoa, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: o score enche de "precisa" a "serviço"; as dores e oportunidades em "serviço"
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseLoja', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "serviço": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) até "acha": chegando · médio · frente · baixo · (2) passando · médio · esquerda · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    liga(B, tc) {
      // NA TELA: o quarto; o Lucas de pé falando no telefone, a lista de ligações no monitor sendo riscada; os ✗ pipocando; o contador até 30 · MOSTRA: personagem, monitor
      const tL = quando('ligou', B, 0.05), tT = quando('trinta', B, 0.3), tV = quando('Vinte', B, 0.5), tN = quando('não', B, 0.88);
      ve(comp);
      const nL = Math.round(K.lerp(1, 30, pc(tc, tL, tN)));
      comp.tela.desenhar((c, w, h) => listaLigacoes(c, w, h, { n: nL }), 'lig' + nL);
      // OBJETOS SE MEXENDO: o contador de ligações de 1 a 30; um ✗ vermelho pipoca em volta dele a cada ligação
      if (tc < tN) fx.cont.em(mais(EM_PE, [0.2, 2.75, 0.3]), tc - tL, { de: 1, ate: 30, dur: Math.max(0.5, tN - tL), antes: '', depois: ' ligações', cor: '#1067f8' });
      const ps = [[-0.75, 1.5, 0.3], [0.75, 1.8, 0.2], [-0.55, 1.1, 0.4], [0.65, 1.2, 0.4]];
      [fx.simb, fx.simb2, fx.simb3, fx.simb4].forEach((s, i) => {
        const per = 0.5, t0 = tT + i * 0.12, dt = tc - t0;
        if (dt > 0 && tc < tN) s.em(mais(EM_PE, ps[i]), dt % per, { tipo: '✗', tam: 0.6, som: false });
      });
      for (let k = 0; k < 8; k++) K.som('errado', tT + k * 0.25, 0.12);
      // PERSONAGEM: começo falando no telefone, andando de um lado pro outro · em "não": mão na testa
      const x = Math.sin((tc - B.inicio) * 2.2) * 0.35;
      menino.colocar(mais(EM_PE, [x, 0, 0.35]), [0.9, 1.4, 5]);
      if (tc > tN) { menino.reagir('mao_na_testa', tc - tN); menino.humor('triste'); } else menino.reagir('celular', tc);
      // EFEITOS VISUAIS: o balão "Não, obrigado." de "trinta" a "Vinte" · "29 nãos" em "não"
      if (tc > tT && tc < tN) fx.fala.em(mais(cabecaDe(menino, 0.2), [-0.45, 0, 0]), tc - tT, { texto: 'Não, obrigado.' });
      fx.et.nao29.em(cabecaDe(menino, 0.55), tc - tN);
      K.som('errado', tN, 0.5);
      // CÂMERA: (1) até "Vinte": passando · médio · direita · olho · (2) chegando · perto · frente · olho
      if (tc < tV) K.filmar([menino, cabecaDe(menino, 0.5), mais(EM_PE, [0.2, 2.75, 0.3])], 'passando', pc(tc, B.inicio, tV), { plano: 'perto', lado: 22, altura: 'olho', espacoCima: 0.2, obstaculos: false, tam: 1.9 });
      else K.filmar([menino, cabecaDe(menino, 0.6), mais(EM_PE, [0.7, 1.2, 0.35]), mais(EM_PE, [-0.7, 1.2, 0.35])], 'chegando', pc(tc, tV, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.6, obstaculos: false });
    },
    venda(B, tc) {
      // NA TELA: a frente da loja Vento Sul; a dona na calçada diz "Sim! Quero o site"; o aperto de mão; a chuva de dinheiro e o ✓ · MOSTRA: personagem, dona, loja
      // CENÁRIO: a fachada da loja de roupa de dia; os carros passando (o cenário cuida)
      const tS = quando('sim', B, 0.2), tV = quando('veio', B, 0.5), tPv = quando('venda', B, 0.85);
      const Cf = CS.todos.loja;
      menino.colocar(LUCAS_F, DONA); dona.colocar(DONA, cabecaDe(menino, -0.4));
      // PERSONAGEM: o Lucas · começo mostrando a proposta · em "venda": comemorando · a dona · em "sim": faz que sim · em "veio": mostrando (aperto)
      if (tc > tPv) menino.reagir('comemorando', tc - tPv); else menino.reagir('mostrando', tc - B.inicio);
      if (tc > tV) dona.reagir('mostrando', tc - tV); else if (tc > tS) dona.reagir('sim', tc - tS); else dona.reagir('surpreso', tc - B.inicio);
      menino.humor(tc > tS ? 'feliz' : 'normal'); dona.humor('feliz');
      Cf.porta.abrirEm(tc - B.inicio, 0.4);
      // EFEITOS VISUAIS: o balão "Sim! Quero o site!" em "sim" · o ✓ e o poof em "veio" · a chuva de dinheiro e "Primeira venda!" em "venda"
      if (tc < tPv) fx.fala.em(cabecaDe(dona, 0.15), tc - tS, { texto: 'Sim! Quero o site!' });
      fx.simb.em(mais(DONA, [-0.7, 2.4, 0]), tc - tV, { tipo: '✓', tam: 1.3 });
      fx.poof.em(mais(DONA, [-0.7, 1.2, 0]), tc - tV, { escala: 0.8 });
      fx.et.venda.em(mais(LUCAS_F, [0.4, 2.7, 0.2]), tc - tPv);
      K.som('ding', tS, 0.5); K.som('certo', tV, 0.7); K.som('festa', tPv, 0.5);
      // CÂMERA: (1) até "veio": chegando · médio · frente · olho · (2) passando · perto · esquerda · baixo
      if (tc < tV) K.filmar([mais(LUCAS_F, [0, 0.2, 0]), cabecaDe(menino, 0.2), mais(DONA, [0, 0.2, 0]), cabecaDe(dona, 0.6)], 'chegando', pc(tc, B.inicio, tV), { plano: 'perto', lado: 15, altura: 'olho', tam: 2.0 });
      else K.filmar([mais(LUCAS_F, [0, 1, 0]), mais(DONA, [0, 1, 0]), mais(LUCAS_F, [0.4, 2.7, 0.2])], 'passando', pc(tc, tV, B.ate), { plano: 'perto', lado: -25, altura: 'baixo', tam: 2.0 });
      fx.grana.em(mais(LUCAS_F, [0.6, 0, 0]), tc - tPv, { raio: 1.4, altura: 3.2, dur: 1.5 });
      K.tremer(tc - tV, 0.3);
    },
    aprende(B, tc) {
      // NA TELA: o fundo verde; a escada do sucesso crescendo degrau por degrau e o Lucas subindo; o contador de vendas · MOSTRA: personagem, escada
      // CENÁRIO: vazio_colorido verde, as formas flutuando (o cenário cuida)
      const tQ = quando('Quanto', B, 0.03), tCh = quando('chamava', B, 0.35), tAp = quando('aprendia', B, 0.6), tV = quando('vender', B, 0.88);
      // OBJETOS SE MEXENDO: a escada cresce de "Quanto" até "vender"; o Lucas pula de degrau em degrau
      const k = K.suave(pc(tc, tQ, tV));
      ve(escada); escada.userData.m3d.crescer(k);
      const f = k * ESC_N - 0.5, j = Math.max(0, Math.min(ESC_N - 1, Math.floor(f))), r = K.clamp(f - j);
      const a = j > 0 ? degrau(j - 1) : [degrau(0)[0] - 0.9, 0, 0.1], b = degrau(j);
      const pulo = K.suave(K.clamp(r * 2.2));
      const pos = [K.lerp(a[0], b[0], pulo), 0, 0.1];
      menino.colocar(pos, [pos[0] + 1.5, 1.4, 6]);
      menino.g.position.y = K.lerp(a[1], b[1], pulo) + Math.sin(pulo * PI) * 0.35;
      // PERSONAGEM: sobe pulando · em "vender": comemorando lá em cima
      if (tc > tV) menino.reagir('comemorando', tc - tV); else menino.reagir('vitoria', tc - B.inicio);
      menino.humor('feliz');
      // EFEITOS VISUAIS: o contador de vendas 1 → 6 · "Abordagem melhor" em "chamava" · "Mais sim" em "aprendia"
      fx.cont.em([-0.9, 3.9, 0.5], tc - tQ, { de: 1, ate: 6, dur: Math.max(0.5, tV - tQ), antes: '', depois: ' vendas', cor: '#2fb54a' });
      if (tc < tAp) fx.et.abordagem.em(cabecaDe(menino, 0.55), tc - tCh); else fx.et.maisSim.em(cabecaDe(menino, 0.55), tc - tAp);
      for (let i = 0; i < ESC_N; i++) K.som('estalo', tQ + ((i + 0.5) / ESC_N) * (tV - tQ), 0.3);
      K.som('certo', tV, 0.5);
      // CÂMERA: (1) até "aprendia": subindo · médio · direita · olho · (2) afastando · médio · frente · baixo, a escada inteira
      const topo = degrau(ESC_N - 1);
      if (tc < tAp) K.filmar([menino, cabecaDe(menino, 0.4), degrau(Math.min(ESC_N - 1, j + 1))], 'subindo', pc(tc, B.inicio, tAp), { plano: 'medio', lado: 25, altura: 'olho', tam: 2.2 });
      else { const q = K.suave(pc(tc, tAp, B.ate)); K.mirar([0.6, 2.9, K.lerp(10, 11.5, q)], [0.5, 2.5, 0]); }
      void topo;
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o palco vazio, o Instagram no telão, a moita rolando, "Esperando"; (2) Agora: ele andando rápido na rua entre prédios e "Fechou" · MOSTRA: personagem
      const tA = quando('Agora', B, 0.45), tF = quando('fecha', B, 0.9);
      if (tc < tA) {
        palcoVazio(9, 1);
        fenoEm(pc(tc, B.inicio, tA + 0.3), 6.5, -6.5, 2.1);
        menino.colocar(PALCO, [0, 1.2, 8]); menino.reagir('olha_relogio', tc - B.inicio); menino.humor('triste');
        fx.et.esperando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4); K.som('whoosh', B.inicio, 0.5);
        // CÂMERA: (1) da plateia, afastando, as cadeiras vazias na frente
        const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([-0.8, 3.0, K.lerp(10.5, 13, q)], [0, 1.6, 1.2]);
      } else {
        // a rua: ele anda rápido, decidido, com a análise na mão; em "fecha", o ✓ e "Fechou"
        const de = [0.9, 0, RUA_Z + 14], ate = [0.9, 0, RUA_Z + 7];
        menino.irPara(de, ate, K.clamp((tc - tA + 0.3) / (B.ate - tA + 0.6)), tc, { reto: true });
        menino.humor('feliz');
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        fx.simb.em(cabecaDe(menino, 0.4), tc - tF, { tipo: '✓', tam: 1.1 });
        fx.et.fechou.em(cabecaDe(menino, 0.9), tc - tF);
        K.som('whoosh', tA, 0.5); K.som('passo', tA + 0.2, 0.3); K.som('passo', tA + 0.45, 0.3); K.som('certo', tF, 0.6);
        // CÂMERA: (2) de baixo pra cima, com os prédios gigantes atrás
        K.heroi(menino, pc(tc, tA, B.ate));
      }
    },
    segue(B, tc) {
      // NA TELA: o Lucas de pé no quarto; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('você', B, 0.02), tAt = quando('ATRÁS', B, 0.38), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteDemo, 'demo');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('estalo', tAt, 0.4); K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (pergunta pra câmera) · em "ATRÁS": aponta pra câmera · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else if (tc > tAt) menino.apontar(1); else menino.reagir('chamando', tc - B.inicio);
      menino.humor('feliz');
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
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
      palcoVazio(9, 0);
      fenoEm(0.62, -6.5, 6.5, 2.0);
      menino.colocar(PALCO, [0, 1.2, 8]); menino.reagir('ombros', 0.4); menino.humor('triste');
      K.mirar([0.4, 3.4, 13.8], [0, 1.8, 1.5]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'palco' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1); cel.position.set(...CEL);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
