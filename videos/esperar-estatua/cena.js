// Se você esperar o primeiro cliente parado, vai virar isso (canal Mappoa).
// O Enzo, web designer, pendura "faço sites" no peito, sobe num pedestal no meio do calçadão e espera tão parado que
// vira estátua de pedra, com pombo na cabeça. O rival passa do lado e fecha o pet shop da frente. O Enzo racha a pedra
// e vai atrás: investe "o preço de um banho e tosa", digita mappoa.com e vem a lista dos pet shops de Campo Grande sem
// site. Três lugares (K.cenarios): o calçadão (rua_predios), o quarto do Enzo (home_office) e o palco do Mappoa.
// A pedra: os materiais do Enzo são clonados (só dele) e puxados pro cinza-pedra dos pés pra cima (pedra(k)); os olhos
// (MeshBasic) ficam vivos, pra só eles se mexerem. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, dona2, rival, cliente, robo, cao, comp, telaC, telaM, navG, FOV0;
  let pedestal, plaq, note, teia, musgo, casaco, cal, nota, moeda, contrato, carimbo, cadeira, placaPet, placaPet2, cel;
  const tudo = [], fx = {}, pombos = [], cascas = [], mats = [], olhosM = [];
  const PEDRA = new THREE.Color(0x9a968e);
  let nivel = 0; // quanto do Enzo é pedra (0 nada, 1 inteiro), aplicado no fim de cada quadro
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
  // Rua: DZ = a faixa do pet shop (logo depois de uma árvore da direita, z = 26 - 14k + 0,5); o pedestal no meio do
  // calçadão, a dona na porta do pet shop (lado esquerdo). DZ2 = o outro pet shop do "Agora", 14 m pra frente
  let DZ = -5, DZ2 = -19;
  const PH = 0.9; // altura do pedestal
  let PED, DONA, CAO, CLI, DONA2, ENZO2;
  function lugaresRua() {
    PED = [0.9, 0, DZ + 1.2]; DONA = [-1.9, 0, DZ - 0.3]; CAO = [-1.35, 0, DZ + 0.35]; CLI = [-0.75, 0, DZ + 0.1];
    DONA2 = [-1.9, 0, DZ2 - 0.3]; ENZO2 = [-0.7, 0, DZ2 + 0.5];
  }
  lugaresRua();
  const TOPO = () => [PED[0], PH, PED[2]];
  const OLHAR_EST = () => [PED[0] - 1.2, 2.0, PED[2] + 6]; // a estátua olha a rua, um pouco pro lado do pet shop

  const LUGAR = {
    gancho: 'rua', disponivel: 'rua', esperando: 'rua', negocio: 'rua', outro: 'rua', decide: 'rua',
    investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'rua', segue: 'rua', cartao: 'rua', capa: 'rua'
  };

  // O Pet Shop Patinha Feliz já fechou com o rival: na lista SEM SITE entram os outros
  const PETS = [
    { nome: 'Banho & Tosa Pantanal', end: 'Av. Afonso Pena, 3120', chips: ['whats', 'insta'] },
    { nome: 'Pet Ipê', end: 'Rua 14 de Julho, 1780', chips: ['tel', 'insta'] },
    { nome: 'Cãopeão Pet', end: 'Av. Mato Grosso, 2250', chips: ['whats'] },
    { nome: 'Au Au Campo Grande', end: 'Rua Ceará, 940', chips: ['whats', 'tel'] }
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

  // ---------- Telas e placas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Enzo Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'portfólio', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
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
  function folha(l, a, px, desenho, padrao) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const mat = padrao ? K.mat(0xffffff, { map: t, roughness: 0.85, side: THREE.DoubleSide }) : new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide });
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), mat);
  }
  // Uma folha que dá pra redesenhar (o calendário)
  function quadro(l, a, px) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
    let chave = null;
    m.desenhar = (fn, k) => { if (k === chave) return; chave = k; fn(cv.getContext('2d'), cv.width, cv.height); t.needsUpdate = true; };
    return m;
  }
  function placaPoste(texto, cor) {
    const g = new THREE.Group();
    const pf = folha(1.9, 0.52, 640, (c, w, h) => {
      rr(c, 0, 0, w, h, h * 0.18, cor);
      c.strokeStyle = '#ffffff'; c.lineWidth = h * 0.06; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, h * 0.14); c.stroke();
      txt(c, texto, w / 2, h / 2 + 2, h * 0.42, '#ffffff', 900, 'center', w * 0.86);
      // a patinha
      c.fillStyle = 'rgba(255,255,255,.85)';
      [[0.07, 0.5, 0.11], [0.04, 0.3, 0.05], [0.09, 0.26, 0.05], [0.12, 0.33, 0.05]].forEach(([x, y, r]) => { c.beginPath(); c.arc(w * x, h * y, h * r, 0, PI * 2); c.fill(); });
    });
    pf.position.y = 2.45; g.add(pf);
    const poste = K.malha(new THREE.CylinderGeometry(0.04, 0.05, 2.25, 12), K.mat(0x3b4048, { metalness: 0.4 }));
    poste.position.y = 1.12; g.add(poste);
    return g;
  }
  function desenhaCal(c, w, h, dia) {
    rr(c, 0, 0, w, h, 18, '#ffffff');
    rr(c, 0, 0, w, h * 0.3, 18, '#e8352b'); c.fillStyle = '#e8352b'; c.fillRect(0, h * 0.18, w, h * 0.12);
    txt(c, 'MÊS 1', w / 2, h * 0.15, h * 0.13, '#ffffff', 900, 'center');
    txt(c, String(dia), w / 2, h * 0.64, h * 0.42, '#1b1d22', 900, 'center');
    [0.25, 0.75].forEach((x) => { c.fillStyle = '#5a5f68'; c.beginPath(); c.arc(w * x, h * 0.04, h * 0.03, 0, PI * 2); c.fill(); });
  }

  // ---------- O pombo ----------
  // de frente pra +z, pés na origem. em(pos, tc, { rumo, voo (0 pousado, 1 voando), bica (0 a 1) })
  function fazPombo() {
    const g = new THREE.Group();
    const cinza = K.mat(0x8a93a3, { roughness: 0.7 }), escuro = K.mat(0x5d6676, { roughness: 0.7 });
    const corpo = K.malha(new THREE.SphereGeometry(0.1, 16, 12), cinza); corpo.scale.set(0.8, 0.75, 1.25); corpo.position.y = 0.1; g.add(corpo);
    const cab = new THREE.Group(); cab.position.set(0, 0.17, 0.09); g.add(cab);
    const pesc = K.malha(new THREE.SphereGeometry(0.058, 14, 10), K.mat(0x3f8f6b, { metalness: 0.5, roughness: 0.35 })); pesc.position.set(0, -0.02, 0); cab.add(pesc);
    const cabeca = K.malha(new THREE.SphereGeometry(0.05, 14, 10), cinza); cabeca.position.set(0, 0.04, 0.03); cab.add(cabeca);
    const bico = K.malha(new THREE.ConeGeometry(0.014, 0.05, 8), K.mat(0xd9a066)); bico.rotation.x = PI / 2; bico.position.set(0, 0.035, 0.09); cab.add(bico);
    [-1, 1].forEach((s) => { const o = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 6), new THREE.MeshBasicMaterial({ color: 0xd8441c })); o.position.set(s * 0.038, 0.05, 0.05); cab.add(o); });
    const asas = [-1, 1].map((s) => {
      const piv = new THREE.Group(); piv.position.set(s * 0.065, 0.13, 0); g.add(piv);
      const a = K.malha(new THREE.SphereGeometry(0.1, 12, 8), escuro); a.scale.set(0.42 * 1, 0.12, 1.05); a.position.set(s * 0.035, 0, -0.01); piv.add(a);
      return { piv, s };
    });
    const rabo = K.malha(new THREE.BoxGeometry(0.09, 0.018, 0.11), escuro); rabo.position.set(0, 0.08, -0.15); rabo.rotation.x = -0.25; g.add(rabo);
    [-1, 1].forEach((s) => { const p = K.malha(new THREE.CylinderGeometry(0.006, 0.006, 0.05, 6), K.mat(0xc8604a)); p.position.set(s * 0.03, 0.025, 0.01); g.add(p); });
    g.scale.setScalar(1.3);
    g.em = (pos, tc, op = {}) => {
      g.visible = true; g.position.set(...pos); g.rotation.set(0, op.rumo || 0, 0);
      const voo = op.voo || 0;
      asas.forEach(({ piv, s }) => { piv.rotation.z = s * voo * (0.5 + Math.sin(tc * 34) * 0.9); });
      const b = op.bica || 0;
      cab.rotation.x = b * (0.5 + 0.5 * Math.sin(tc * 16)) * 0.9;
      cab.position.z = 0.09 + Math.sin(tc * 5) * 0.01 * (1 - voo);
    };
    return g;
  }
  // Pombo voando de "de" até "ate" (q de 0 a 1), com o arco e as asas batendo; pousado depois
  function voaPombo(p, q, de, ate, tc, op = {}) {
    if (q <= 0) { p.visible = false; return; }
    const pos = q < 1 ? lerp3(de, ate, K.suave(q)) : ate;
    if (q < 1) pos[1] += Math.sin(q * PI) * 0.6;
    const rumo = Math.atan2(ate[0] - de[0], ate[2] - de[2]);
    p.em(pos, tc, { rumo: q < 1 ? rumo : (op.rumo ?? 0), voo: q < 1 ? 1 : 0, bica: q >= 1 ? op.bica || 0 : 0 });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['rua_predios', {}, 'rua'], 'mundo_mappoa']);
    // o PET SHOP do lado esquerdo mais perto do meio (se não tiver, a loja da esquerda mais perto)
    const Cr = CS.todos.rua;
    const esq = (Cr.lojas || []).filter((l) => l.lado < 0 && l.porta[2] < 8 && l.porta[2] > -22);
    const pets = esq.filter((l) => l.id === 'petshop');
    const lista = (pets.length ? pets : esq).sort((a, b) => Math.abs(a.porta[2] + 5) - Math.abs(b.porta[2] + 5));
    const loja = lista[0];
    if (loja) DZ = loja.porta[2];
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    DZ2 = DZ - 14;
    lugaresRua();
    // a placa de poste do Pet Shop Patinha Feliz, atrás da dona, e a do Banho & Tosa Pantanal no "Agora"
    placaPet = placaPoste('PATINHA FELIZ', '#3fb8c8'); guarda(placaPet, 'loja_petshop', [-2.5, 0, DZ - 0.9]);
    placaPet2 = placaPoste('BANHO & TOSA', '#2fb54a'); guarda(placaPet2, 'loja_petshop2', [-2.5, 0, DZ2 - 0.9]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaPets = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: PETS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Pet shops · Campo Grande, MS', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analisePet = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Banho & Tosa Pantanal', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site: horário e preço só pelo WhatsApp', 'Cliente não acha o horário do banho'], oportunidades: ['Site com serviços, preços e agenda do banho'],
        objecoes: ['"Meu cliente é do bairro"'], abordagem: 'Mostre quem procura pet shop perto e não acha o horário.'
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

    // Personagens: o Enzo (do canal), a dona do Patinha Feliz, a dona do Banho & Tosa Pantanal, o rival, o cliente
    // que passa na rua, o robô e o cachorro do pet shop
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.personagem('dona', { cores: { blazer: 0x3fb8c8, vestido: 0xffffff } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    dona2 = K.personagem('dona', { cores: { blazer: 0xf39a1e, vestido: 0xffffff, cabelo: 0x1c120c } }); K.semNome(dona2.g); K.nomear('dona2', dona2.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    cliente = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf5c518, bermuda: 0x3a3f4a, tenis: 0xe8352b, cabelo: 0x1c120c, pele: 0xc98a5e } }); K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');
    cao = K.cachorro(); K.nomear('cachorro', cao.g);

    // O que vai preso no Enzo (vira pedra junto): a plaquinha "FAÇO SITES" no peito, o notebook, a teia e o musgo
    plaq = new THREE.Group();
    const pl = folha(0.55, 0.32, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 12, '#c9a26b'); c.strokeStyle = '#9a7646'; c.lineWidth = 6; c.strokeRect(10, 10, w - 20, h - 20);
      txt(c, 'FAÇO', w / 2, h * 0.33, h * 0.3, '#1b1d22', 900, 'center'); txt(c, 'SITES', w / 2, h * 0.7, h * 0.32, '#1b1d22', 900, 'center');
    }, true);
    plaq.add(pl);
    const barb = K.malha(new THREE.TorusGeometry(0.17, 0.006, 6, 24, PI), K.mat(0x8a6a44)); barb.position.set(0, 0.16, -0.02); plaq.add(barb);
    plaq.position.set(0, 0.98, 0.2); plaq.rotation.x = -0.12;
    menino.g.add(plaq); K.nomear('plaquinha', plaq);
    note = new THREE.Group();
    const cinzaN = K.mat(0x3a3f48, { roughness: 0.5, metalness: 0.3 });
    const base = K.malha(new THREE.BoxGeometry(0.4, 0.02, 0.27), cinzaN); note.add(base);
    const tampa = K.malha(new THREE.BoxGeometry(0.4, 0.27, 0.015), cinzaN); tampa.position.set(0, 0.13, -0.13); tampa.rotation.x = -0.25; note.add(tampa);
    const telaN = folha(0.36, 0.22, 300, (c, w, h) => siteDemo(c, w, h), true); telaN.position.set(0, 0.13, -0.12); telaN.rotation.x = -0.25; note.add(telaN);
    note.position.set(0, 0.82, 0.36);
    menino.g.add(note); K.nomear('notebook', note);
    // a teia de aranha entre a tampa do notebook e o braço (linhas brancas finas)
    const pts = [];
    for (let i = 0; i < 7; i++) { const a = (i / 6) * 1.2; pts.push(0.2, 0.24, -0.16, 0.2 + Math.cos(a) * 0.14, 0.24 - Math.sin(a) * 0.2, -0.16 + 0.12); }
    for (let r = 1; r <= 3; r++) for (let i = 0; i < 6; i++) { const a0 = (i / 6) * 1.2, a1 = ((i + 1) / 6) * 1.2, s = r / 3; pts.push(0.2 + Math.cos(a0) * 0.14 * s, 0.24 - Math.sin(a0) * 0.2 * s, -0.16 + 0.12 * s, 0.2 + Math.cos(a1) * 0.14 * s, 0.24 - Math.sin(a1) * 0.2 * s, -0.16 + 0.12 * s); }
    const gt = new THREE.BufferGeometry(); gt.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    teia = new THREE.LineSegments(gt, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
    note.add(teia);
    musgo = new THREE.Group();
    const verde = K.mat(0x5f8a3c, { roughness: 1 }), r = K.rand(5);
    [[0.12, 0.05, 0.1], [-0.1, 0.06, 0.12], [0.14, 0.02, -0.05], [-0.15, 0.03, 0], [0.2, 1.18, 0], [-0.21, 1.2, 0.02], [0.05, 0.4, 0.13]].forEach(([x, y, z]) => {
      const b = K.malha(new THREE.SphereGeometry(0.05 + r() * 0.04, 10, 8), verde, false); b.scale.y = 0.45; b.position.set(x, y, z); musgo.add(b);
    });
    menino.g.add(musgo);
    // os materiais do Enzo (e do que está preso nele) viram só dele, pra virar pedra sem pintar mais ninguém
    menino.g.traverse((o) => {
      if (!o.isMesh || !o.material || o === teia) return;
      if (o.parent === musgo) return;
      if (o.material.isMeshBasicMaterial) {
        // os olhos: a íris e a pupila (as bolinhas pequenas) andam pra "olhar"
        const rd = o.geometry && o.geometry.parameters && o.geometry.parameters.radius;
        if (rd && rd < 0.03) olhosM.push({ o, x: o.position.x, y: o.position.y });
        return;
      }
      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => mats.push({ m, o, cor: m.color ? m.color.clone() : null, r: m.roughness, me: m.metalness, em: m.emissive ? m.emissive.clone() : null }));
    });

    // O pedestal de pedra, com a plaquinha de bronze
    pedestal = new THREE.Group();
    const pedraM = K.mat(0x8d8a83, { roughness: 0.95 });
    const bloco = K.malha(new THREE.BoxGeometry(1.0, PH - 0.16, 1.0), pedraM); bloco.position.y = (PH - 0.16) / 2 + 0.08; pedestal.add(bloco);
    const pe = K.malha(new THREE.BoxGeometry(1.2, 0.08, 1.2), pedraM); pe.position.y = 0.04; pedestal.add(pe);
    const tope = K.malha(new THREE.BoxGeometry(1.15, 0.08, 1.15), pedraM); tope.position.y = PH - 0.04; pedestal.add(tope);
    const bronze = folha(0.62, 0.24, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 10, '#b08a3e'); c.strokeStyle = '#7a5e26'; c.lineWidth = 6; c.strokeRect(8, 8, w - 16, h - 16);
      txt(c, 'O WEB DESIGNER', w / 2, h * 0.36, h * 0.2, '#3a2a10', 900, 'center'); txt(c, 'QUE ESPERAVA · 2026', w / 2, h * 0.68, h * 0.17, '#3a2a10', 800, 'center');
    }, true);
    bronze.position.set(0, PH * 0.5, 0.505); pedestal.add(bronze);
    guarda(pedestal, 'pedestal', PED);
    // os cacos de pedra que voam quando ele racha
    const rc = K.rand(31), cacoM = K.mat(0x9a968e, { roughness: 0.95 });
    for (let i = 0; i < 16; i++) {
      const s = 0.05 + rc() * 0.12;
      const m = K.malha(new THREE.BoxGeometry(s, s * (0.6 + rc() * 0.6), s * (0.7 + rc() * 0.5)), cacoM);
      const a = rc() * PI * 2, v = 1.4 + rc() * 2.2;
      cascas.push({ m, v: [Math.cos(a) * v, 2.2 + rc() * 2.6, Math.sin(a) * v * 0.6 + 0.8], y0: 0.3 + rc() * 1.2, giro: (rc() - 0.5) * 14 });
      guarda(m, i === 0 ? 'cascas' : null);
    }
    // os pombos (o 1º é o que pousa na cabeça)
    for (let i = 0; i < 5; i++) { const p = fazPombo(); guarda(p, i === 0 ? 'pombo' : 'pombo' + i); pombos.push(p); }
    // o casaco que o pedestre pendura no braço da estátua
    casaco = new THREE.Group();
    const lã = K.mat(0x8a5a3a, { roughness: 0.9 });
    const corpoC = K.malha(new THREE.BoxGeometry(0.34, 0.5, 0.06), lã); corpoC.position.y = -0.27; casaco.add(corpoC);
    [-1, 1].forEach((s) => { const m = K.malha(new THREE.BoxGeometry(0.08, 0.42, 0.06), lã); m.position.set(s * 0.21, -0.26, 0); m.rotation.z = s * 0.12; casaco.add(m); });
    const gola = K.malha(new THREE.TorusGeometry(0.07, 0.025, 6, 14), K.mat(0x6a4028)); gola.rotation.x = PI / 2; gola.position.y = -0.02; casaco.add(gola);
    casaco.userData.e = 0.78; casaco.scale.setScalar(0.78); guarda(casaco, 'casaco');
    // o calendário que corre de 1 a 30
    cal = quadro(0.55, 0.62, 300); guarda(cal, 'calendario');
    // o celular do cliente
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular');

    // Quarto: o computador, a nota de "1 banho e tosa" e a moeda, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    nota = folha(0.42, 0.22, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#5fb86a'); c.strokeStyle = '#2f7a3a'; c.lineWidth = 6; c.beginPath(); c.roundRect(8, 8, w - 16, h - 16, 10); c.stroke();
      txt(c, '1 BANHO', w * 0.6, h * 0.36, h * 0.2, '#ffffff', 900, 'center'); txt(c, 'E TOSA', w * 0.6, h * 0.64, h * 0.2, '#ffffff', 900, 'center');
      c.fillStyle = '#ffffff';
      [[0.19, 0.58, 0.13], [0.11, 0.36, 0.06], [0.19, 0.3, 0.06], [0.27, 0.36, 0.06]].forEach(([x, y, r2]) => { c.beginPath(); c.arc(w * x, h * y, h * r2, 0, PI * 2); c.fill(); });
    });
    guarda(nota, 'nota');
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 }));
    guarda(moeda, null);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Rua: o contrato do rival com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Pet Shop Patinha Feliz', w / 2, h * 0.22, w * 0.055, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    guarda(contrato, 'contrato');

    // Efeitos
    fx.fala = K.balaoFala(); fx.pensa = K.balaoPensamento();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.racha = K.rachadura(); fx.onda = K.ondaChoque();
    fx.vel = K.velocidade();
    fx.vento = K.folhasVento(77, 40, { papel: true });
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      web: e('Web designer', 'azul'), dias: e('30 dias', 'laranja'), semSite: e('Sem site', 'vermelho'), outro: e('Outro web designer', 'vermelho'),
      estatua: e('Cliente não visita estátua', 'vermelho'), investir: e('Investir', 'azul'), cg: e('Campo Grande', 'azul'),
      quemPrecisa: e('Quem precisa de você', 'verde'), primeiro: e('Chegou primeiro', 'verde'), atrasado: e('Atrasado', 'vermelho'),
      pedra: e('PEDRA', 'vermelho'), atras: e('ATRÁS', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>PEDRA</em> ou <em>ATRÁS</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  // Só os olhos se mexem: dx (-1 esquerda da estátua, 1 direita), dy (-1 baixo, 1 cima)
  function olhos(dx, dy) { olhosM.forEach(({ o, x, y }) => { o.position.x = x + dx * 0.022; o.position.y = y + dy * 0.016; }); }
  // A pedra: k de 0 (normal) a 1 (inteiro), subindo dos pés pra cabeça
  function pedra(k) {
    menino.g.updateMatrixWorld(true);
    const pe = menino.g.position.y, h = k * 1.85 - 0.15, w = V(0, 0, 0);
    mats.forEach((e) => {
      const y = e.o.getWorldPosition(w).y - pe;
      const q = k >= 1 ? 1 : k <= 0 ? 0 : K.clamp((h - y) / 0.22 + 0.5);
      if (e.cor) e.m.color.copy(e.cor).lerp(PEDRA, q);
      if (e.r != null) e.m.roughness = K.lerp(e.r, 0.95, q);
      if (e.me != null) e.m.metalness = K.lerp(e.me, 0, q);
      if (e.em) e.m.emissive.copy(e.em).multiplyScalar(1 - q);
    });
  }
  // A estátua: o Enzo em cima do pedestal, segurando o notebook, duro
  function estatua(cara) {
    ve(pedestal);
    menino.colocar(TOPO(), OLHAR_EST()); menino.g.position.y = PH;
    menino.reagir('segurando', 0.4);
    menino.humor(cara || 'triste');
    note.visible = true; plaq.visible = true;
    nivel = 1;
  }
  const cabecaEst = () => cabecaDe(menino, 0.18);
  // os pombos pousados: 0 na cabeça, 1 e 2 nos ombros, 3 no notebook, 4 no pedestal
  function pombosPousados(tc, quantos = 5, bica = 0.4) {
    menino.g.updateMatrixWorld(true);
    const canto = (x, z) => mais(TOPO(), [x, 0, z]);
    const lugares = [cabecaDe(menino, 0.2), canto(-0.42, 0.38), canto(0.42, 0.3), canto(0.05, 0.48), canto(0.4, -0.4)];
    for (let i = 0; i < quantos; i++) pombos[i].em(lugares[i], tc + i * 0.7, { rumo: menino.g.rotation.y + (i - 2) * 0.5, bica: i === 0 ? bica : 0.25 });
  }
  // cliente andando de "de" até "ate" (frente da estátua, sem olhar pra ela)
  function passante(b, de, ate, k, tc) { ve(b); b.irPara(de, ate, k, tc, { reto: true }); if (k >= 1) b.colocar(ate, mais(ate, [0, 1, -3])); b.humor('normal'); }

  const P = {
    gancho(B, tc) {
      // NA TELA: o Enzo de pedra no pedestal, notebook com teia e a plaquinha; o pombo desce e pousa na cabeça; gente passando · MOSTRA: personagem, pedestal, pombo
      const tEs = quando('esperar', B, 0.2), tPa = quando('parado', B, 0.55), tIs = quando('isso', B, 0.9);
      estatua('triste'); teia.visible = true;
      // OBJETOS SE MEXENDO: o pombo voando e pousando em "parado", dando bicadinhas
      const cab = cabecaDe(menino, 0.2);
      voaPombo(pombos[0], pc(tc, tEs - 0.35, tPa), mais(cab, [2.6, 2.4, 1.2]), cab, tc, { rumo: menino.g.rotation.y, bica: 0.8 });
      // os pedestres passando na frente, sem olhar
      passante(cliente, [-1.5, 0, PED[2] + 4.0], [-1.5, 0, PED[2] - 5], pc(tc, B.inicio, B.ate + 0.8), tc);
      // PERSONAGEM: de pedra · em "isso": só os olhos se mexem, olhando pro pombo na cabeça
      if (tc > tIs) olhos(Math.sin(tc * 9) * 0.4, 1); else olhos(0, 0);
      if (tc > tIs) fx.simb.em(mais(cabecaDe(menino, 0.1), [0.35, 0.25, 0]), tc - tIs, { tipo: '!', tam: 0.5 });
      // SONS
      K.som('estalo', B.inicio, 0.4); K.som('whoosh', tEs, 0.35); K.som('pingo', tPa + 0.1, 0.3); K.som('pingo', tPa + 0.35, 0.3);
      // CÂMERA: 3 cortes: (1) o rosto de pedra e o pombo chegando · (2) de baixo, a estátua e os prédios · (3) aberto, de frente
      const c1 = Math.min(tPa + 0.15, B.inicio + 1.2), c2 = Math.min(c1 + 0.95, B.ate - 0.9);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([PED[0] + 0.8, 2.6, PED[2] + K.lerp(3.7, 3.3, q)], mais(cab, [0, -0.2, 0])); }
      else if (tc < c2) K.heroi(menino, pc(tc, c1, c2), { lado: 18, dist: 3.0, altura: -0.45, olhar: 1.7 });
      else { const q = K.suave(pc(tc, c2, B.ate)); K.mirar([K.lerp(0.6, 0.5, q), 2.4, PED[2] + K.lerp(8.6, 8.0, q)], [PED[0] - 0.2, 1.6, PED[2]]); }
    },
    disponivel(B, tc) {
      // NA TELA: o Enzo colorido do lado do pedestal; pendura a plaquinha e sobe no pedestal · MOSTRA: personagem, plaquinha, pedestal
      const tW = quando('designer', B, 0.15), tPe = quando('Pendurou', B, 0.3), tPt = quando('peito', B, 0.55), tPa = quando('parado', B, 0.75);
      ve(pedestal); nivel = 0;
      const CHAO = [PED[0] - 0.9, 0, PED[2] + 1.0];
      if (tc < tPa) {
        // PERSONAGEM: ajeitando a plaquinha no peito, orgulhoso
        menino.colocar(CHAO, [PED[0] - 0.4, 1.4, PED[2] + 6]);
        plaq.visible = tc > tPe;
        if (tc > tPe) { plaq.scale.setScalar(pop(tc - tPe)); menino.reagir(tc < tPt + 0.4 ? 'mostrando' : 'sim', tc - tPe); }
        else menino.reagir('chamando', tc - B.inicio);
        menino.humor('feliz');
      } else {
        // em "parado": sobe no pedestal com um pulinho, faz pose e congela
        const q = pc(tc, tPa, tPa + 0.4);
        const p = lerp3(CHAO, TOPO(), K.suave(q)); p[1] = K.lerp(0, PH, q) + Math.sin(q * PI) * 0.45;
        menino.colocar(p, OLHAR_EST()); menino.g.position.y = p[1];
        plaq.visible = true; note.visible = q >= 1;
        if (q < 1) menino.reagir('comemorando', tc - tPa); else menino.reagir('segurando', 0.4);
        menino.humor('feliz');
        if (q >= 1) fx.onda.em(TOPO(), tc - tPa - 0.4, { raio: 0.6, som: false });
      }
      fx.et.web.em(cabecaDe(menino, 0.5), tc - tW);
      // SONS
      K.som('passo', B.inicio + 0.2, 0.3); K.som('estalo', tPe, 0.4); K.som('baque', tPa + 0.4, 0.4);
      // CÂMERA: (1) chegando · médio · esquerda, nele e na plaquinha · (2) fixa a ~5 m de frente, um pouco de baixo
      if (tc < tPa) K.filmar([menino, cabecaDe(menino, 0.3), pedestal], 'chegando', pc(tc, B.inicio, tPa), { plano: 'medio', lado: -20, altura: 'olho', tam: 2.0 });
      else { const q = K.suave(pc(tc, tPa, B.ate)); K.mirar([PED[0] - 0.3, 1.25, PED[2] + K.lerp(5.4, 4.9, q)], [PED[0], 1.55, PED[2]]); }
    },
    esperando(B, tc) {
      // NA TELA: o calendário de 1 a 30; o Enzo vira pedra dos pés pra cabeça; musgo, teia e os pombos chegando · MOSTRA: personagem, calendario, pombo
      const tMe = quando('mês', B, 0.25), tPe = quando('pedra', B, 0.45), tPo = quando('pombo', B, 0.75), tAp = quando('apareceu', B, 0.92);
      estatua('feliz');
      // a pedra subindo em "pedra"; o sorriso murchando
      nivel = pc(tc, tPe - 0.35, tPe + 0.55);
      menino.humor(nivel > 0.5 ? 'triste' : 'feliz');
      musgo.visible = nivel > 0.6; musgo.scale.setScalar(Math.max(0.001, K.clamp((nivel - 0.6) / 0.4)));
      teia.visible = nivel > 0.8;
      // o calendário trocando de 1 a 30, com os papéis voando
      ve(cal); const CAL = [PED[0] - 0.85, 2.25, PED[2] + 0.7];
      cal.position.set(...CAL); cal.lookAt(K.camera.position);
      const dia = Math.max(1, Math.min(30, 1 + Math.floor(29 * pc(tc, B.inicio, tMe + 0.4))));
      cal.desenhar((c, w, h) => desenhaCal(c, w, h, dia), dia);
      if (tc < tPe) fx.vento.em(mais(CAL, [0.2, 0.2, 0.3]), tc, { rumo: 0.4, forca: 0.7 });
      fx.et.dias.em(mais(CAL, [0, 0.62, 0]), tc - tMe);
      // os pombos chegando um por um em "pombo"
      const cab = cabecaDe(menino, 0.2);
      if (tc < tPo) voaPombo(pombos[0], pc(tc, tPo - 0.6, tPo), mais(cab, [-2.5, 2.2, 1.5]), cab, tc);
      else { const n = Math.min(4, 1 + Math.floor((tc - tPo) / 0.18)); pombosPousados(tc, n); }
      // SONS
      for (let i = 0; i < 5; i++) K.som('whoosh', B.inicio + 0.1 + i * 0.2, 0.15);
      K.som('estalo', tPe, 0.5); K.som('pingo', tPo, 0.35); K.som('pingo', tPo + 0.2, 0.3);
      // CÂMERA: (1) orbitando · médio · da esquerda pra frente · (2) chegando no rosto de pedra com o pombo
      if (tc < tPo - 0.1) { const a = K.lerp(-0.75, -0.15, K.suave(pc(tc, B.inicio, tPo))); K.mirar([PED[0] + Math.sin(a) * 5.6, 2.2, PED[2] + Math.cos(a) * 5.6], [PED[0] - 0.4, 1.75, PED[2]]); }
      else { const q = K.suave(pc(tc, tPo - 0.1, B.ate)); K.mirar([PED[0] + 0.4, 2.5, PED[2] + K.lerp(3.6, 3.0, q)], mais(cab, [0, -0.25, 0])); }
    },
    negocio(B, tc) {
      // NA TELA: o Pet Shop Patinha Feliz com a dona e o cachorro; "Sem site"; o cliente com o celular sem achar o horário · MOSTRA: loja_petshop, dona, celular
      const tFr = quando('frente', B, 0.2), tSi = quando('site', B, 0.4), tCl = quando('cliente', B, 0.55), tNa = quando('acha', B, 0.7), tBa = quando('banho', B, 0.92);
      estatua('triste'); pombosPousados(tc, 3);
      // PERSONAGEM: (a estátua) os olhos virando pro pet shop em "frente"
      olhos(tc > tFr ? -1 : 0, 0);
      ve(placaPet);
      dona.colocar(DONA, tc > tNa ? cabecaDe(cliente, -1.3) : [0.5, 1.2, DZ + 6]); dona.humor('normal');
      if (tc > tNa + 0.3) dona.reagir('ombros', tc - tNa - 0.3); else dona.reagir('olha_relogio', tc - B.inicio);
      ve(cao); cao.em(CAO, tc, { rumo: 0.6, cara: 'feliz', abana: 1 });
      // o cliente com o celular: a busca "Patinha Feliz horário banho" e o ✗
      ve(cliente); cliente.colocar(CLI, [0.4, 1.3, DZ + 6]);
      if (tc > tNa) { cliente.reagir('coca_cabeca', tc - tNa); cliente.humor('triste'); } else { cliente.reagir('celular', tc - B.inicio); cliente.humor('normal'); }
      ve(cel);
      const cc = cabecaDe(cliente, -0.25); cel.position.set(cc[0] + 0.15, cc[1] - 0.45, cc[2] + 0.4); cel.scale.setScalar(0.5 * pop(tc - tCl + 0.3));
      cel.rotation.set(0, Math.atan2(K.camera.position.x - cc[0], K.camera.position.z - cc[2]), 0);
      cel.userData.m3d.mostrar({ itens: ['Busca: Patinha Feliz horário banho', 'Nenhum site encontrado', 'Só o Instagram, sem horário'], n: tc > tBa ? 3 : tc > tNa ? 2 : 1 });
      if (tc > tBa) fx.simb.em(mais(cc, [0.15, 0.45, 0.4]), tc - tBa, { tipo: '✗', tam: 0.6 });
      fx.et.semSite.em(mais(placaPet.position.toArray(), [0, 3.15, 0]), tc - tSi);
      fx.pensa.em(cabecaDe(cliente, 0.3), tc - tNa, { texto: 'Que horas abre?' });
      // SONS
      K.som('passo', B.inicio + 0.2, 0.25); K.som('errado', tBa, 0.5); K.som('estalo', tSi + 0.2, 0.35);
      // CÂMERA: (1) por cima do ombro de pedra do Enzo, olhando a loja · (2) fixa a ~4 m de frente, na porta
      if (tc < tSi) K.ombro(menino, [DONA[0], 1.6, DONA[2]], pc(tc, B.inicio, tSi), { lado: 1, dist: 2.3, altura: 1.6 });
      else { const q = K.suave(pc(tc, tSi, B.ate)); K.mirar([K.lerp(-0.1, -0.3, q), 1.8, DZ + K.lerp(5.8, 5.3, q)], [-1.3, 1.35, DZ + 0.1]); }
    },
    outro(B, tc) {
      // NA TELA: o rival passa do lado da estátua, dá um tapinha no pedestal e vai até a dona; aperto de mão e o contrato FECHADO · MOSTRA: rival, dona, loja_petshop
      const tDe = quando('designer', B, 0.2), tAt = quando('atrás', B, 0.4), tEn = quando('Entra', B, 0.55), tFe = quando('fecha', B, 0.9);
      estatua('triste'); pombosPousados(tc, 3);
      ve(placaPet);
      const RIV_A = [0.15, 0, PED[2] + 7.5], RIV_B = [-1.05, 0, DZ + 0.3];
      const kAnda = pc(tc, B.inicio, tEn + 0.15);
      ve(rival); rival.irPara(RIV_A, RIV_B, kAnda, tc, { reto: true });
      const perto = Math.abs(rival.g.position.z - PED[2]) < 0.8;
      if (kAnda >= 1) { rival.colocar(RIV_B, cabecaDe(dona, -1.3)); rival.apontar(0.35); }
      else if (perto) rival.apontar(0.5);
      rival.humor('feliz');
      dona.colocar(DONA, kAnda > 0.6 ? cabecaDe(rival, -1.3) : [0.5, 1.2, DZ + 6]); dona.humor('feliz');
      if (tc > tFe) dona.reagir('vitoria', tc - tFe); else if (kAnda >= 1) dona.apontar(0.35);
      ve(cao); cao.em(CAO, tc, { rumo: 0.9, cara: 'agitado', abana: 1, pula: tc > tFe ? 1 : 0 });
      // a estátua: só os olhos seguem o rival
      olhos(K.clamp((rival.g.position.x - PED[0]) * 0.8, -1, 1), -0.3);
      fx.et.outro.em(cabecaDe(rival, 0.5), tc - tDe);
      const meio = [(RIV_B[0] + DONA[0]) / 2, 1.95, (RIV_B[2] + DONA[2]) / 2 + 0.35];
      if (tc > tFe) fx.simb.em(mais(cabecaDe(dona, 0.3), [0, 0.3, 0]), tc - tFe, { tipo: '✓', tam: 0.8 });
      // SONS
      K.som('passo', B.inicio + 0.3, 0.3); K.som('passo', B.inicio + 0.7, 0.3); K.som('estalo', tAt, 0.3); K.som('baque', tFe, 0.6); K.som('certo', tFe + 0.25, 0.4);
      // CÂMERA: (1) atrás do rival andando, passando pela estátua · (2) fixa a ~3,5 m, de frente pro aperto de mão
      if (tc < tEn) { const p = rival.g.position; K.mirar([p.x + 0.4, 1.95, p.z + 4.2], [p.x - 0.3, 1.3, p.z - 2.5]); }
      else { const q = K.suave(pc(tc, tEn, B.ate)); K.mirar([K.lerp(0.8, 0.6, q), 1.65, DZ + K.lerp(4.3, 3.8, q)], [-1.4, 1.25, DZ + 0.1]); }
      contrato.visible = tc > tFe - 0.35;
      contrato.position.set(...meio); contrato.lookAt(K.camera.position);
      contrato.scale.setScalar(pop(tc - tFe + 0.35));
      carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
    },
    decide(B, tc) {
      // NA TELA: (1) um pedestre pendura o casaco no braço da estátua · (2) a pedra racha, os cacos voam, os pombos fogem e ele pula · MOSTRA: personagem, pedestal
      const tVi = quando('visita', B, 0.12), tEs = quando('estátua', B, 0.25), tRa = quando('racha', B, 0.55), tPd = quando('pedra', B, 0.65), tAt = quando('atrás', B, 0.92);
      if (tc < tRa) {
        estatua('triste'); pombosPousados(tc, 3);
        // o pedestre chega, pendura o casaco no braço de pedra e vai embora
        const kc = pc(tc, B.inicio - 0.2, tVi);
        const ALI = [PED[0] - 0.85, 0, PED[2] + 0.7];
        if (kc < 1) passante(cliente, [-0.6, 0, PED[2] + 4.5], ALI, kc, tc);
        else { ve(cliente); const k2 = pc(tc, tVi + 0.35, tRa + 0.4); cliente.irPara(ALI, [-0.9, 0, PED[2] - 4], k2, tc, { reto: true }); if (k2 <= 0) { cliente.colocar(ALI, cabecaDe(menino, -1)); cliente.reagir('mostrando', tc - tVi); } }
        if (tc > tVi) { ve(casaco); casaco.position.set(...mais(menino.mao(1), [0, 0.02, 0.02])); casaco.rotation.set(0, menino.g.rotation.y, 0); }
        olhos(tc > tVi ? 0.8 : 0, -0.6);
        menino.humor(tc > tVi ? 'bravo' : 'triste');
        fx.et.estatua.em(mais(TOPO(), [0, 2.05, 0]), tc - tEs);
        if (tc > tEs + 0.2) fx.simb.em(mais(TOPO(), [0.9, 1.9, 0]), tc - tEs - 0.2, { tipo: '✗', tam: 0.7 });
        K.som('estalo', tVi, 0.35); K.som('errado', tEs + 0.2, 0.4);
        // CÂMERA: (1) chegando · médio · direita, a estátua e o pedestre
        const q = K.suave(pc(tc, B.inicio, tRa));
        K.mirar([PED[0] + 1.7, 2.0, PED[2] + K.lerp(4.8, 4.2, q)], [PED[0] - 0.4, 1.6, PED[2]]);
      } else {
        // (2) a pedra trinca do peito pra fora, os cacos voam, os pombos fogem; ele sai colorido e pula do pedestal
        ve(pedestal);
        fx.racha.em(mais(PED, [0, 0.02, 0.75]), tc - tRa, { raio: 0.8 });
        const kp = pc(tc, tPd - 0.1, tPd + 0.25);
        nivel = 1 - kp;
        const pulo = pc(tc, tAt - 0.25, tAt + 0.2);
        const LAND = [PED[0] - 1.0, 0, PED[2] + 1.6];
        if (pulo <= 0) {
          menino.colocar(TOPO(), OLHAR_EST()); menino.g.position.y = PH;
          if (tc < tPd) { menino.reagir('segurando', 0.4); menino.g.position.x += Math.sin(tc * 60) * 0.015; }
          else menino.reagir('comemorando', tc - tPd);
        } else {
          const p = lerp3(TOPO(), LAND, K.suave(pulo)); p[1] = K.lerp(PH, 0, pulo) + Math.sin(pulo * PI) * 0.5;
          if (pulo < 1) { menino.colocar(p, [DONA[0], 1.2, DONA[2]]); menino.g.position.y = p[1]; menino.reagir('comemorando', tc - tAt); }
          else { const k3 = pc(tc, tAt + 0.2, B.ate + 0.6); menino.irPara(LAND, [DONA[0] + 1.1, 0, DONA[2] + 1.2], k3, tc, { reto: true }); }
        }
        menino.humor('bravo');
        plaq.visible = tc < tPd; note.visible = tc < tPd;
        // os cacos voando
        const t = tc - tPd;
        cascas.forEach((c) => {
          if (t < 0) { c.m.visible = false; return; }
          c.m.visible = true;
          const x = PED[0] + c.v[0] * t * 0.5, z = PED[2] + c.v[2] * t * 0.5;
          const y = Math.max(0.03, PH + c.y0 + c.v[1] * t - 4.9 * t * t);
          c.m.position.set(x, y, z); c.m.rotation.set(t * c.giro, t * c.giro * 0.7, 0);
        });
        // os pombos fugindo pro alto
        pombos.slice(0, 3).forEach((p, i) => { const tt = Math.max(0, tc - tPd); const cab = mais(TOPO(), [0, 1.6 + i * 0.1, 0]); p.em(mais(cab, [(i - 1) * tt * 2.2, tt * 3.2, tt * (1 + i)]), tc, { voo: 1, rumo: i - 1 }); });
        // o casaco voando longe
        if (tc < tPd + 0.8) { ve(casaco); const tq = Math.max(0, tc - tPd); casaco.position.set(PED[0] - 0.4 - tq * 2.5, Math.max(0.05, 1.8 + tq * 1.5 - 4.9 * tq * tq), PED[2] + 0.3 + tq); casaco.rotation.set(tq * 4, 0, tq * 6); }
        if (pulo >= 1) fx.onda.em(LAND, tc - tAt - 0.2, { raio: 1.0 });
        K.som('racha', tRa, 0.7); K.som('pedra', tPd, 0.8); K.som('whoosh', tPd + 0.1, 0.5); K.som('whoosh', tAt, 0.4);
        // CÂMERA: (2) fixa a ~6 m de frente, aberto, pros cacos caberem (a rachadura treme)
        K.mirar([PED[0] - 0.4, 2.1, PED[2] + 6.6], [PED[0] - 0.4, 1.4, PED[2] + 0.6]);
      }
    },
    investe(B, tc) {
      // NA TELA: o quarto; ele de pé com a nota de "1 banho e tosa"; ela vira moeda e cai no computador; o mapa com os pinos · MOSTRA: personagem, nota, monitor
      const tIn = quando('investe', B, 0.1), tTo = quando('tosa', B, 0.35), tFe = quando('ferramenta', B, 0.5), tPr = quando('precisa', B, 0.8);
      ve(comp);
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tIn) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tIn); else menino.reagir('digitando', tc);
      menino.humor(tc > tIn ? 'feliz' : 'normal');
      const mao = menino.mao(1), notaPos = mais(mao, [0.03, 0.08, 0.1]);
      if (tc > tTo - 0.35 && tc < tFe) { ve(nota); nota.position.set(...notaPos); nota.lookAt(K.camera.position); nota.rotation.z += Math.sin(tc * 3) * 0.1; nota.scale.setScalar(pop(tc - tTo + 0.35)); }
      if (tc > tFe) {
        fx.poof.em(mais(notaPos, [0, 0.15, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(notaPos[0], TECLADO[0], q), K.lerp(notaPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(notaPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      // a poeirinha de pedra caindo do ombro dele
      if (tc < tFe) fx.poof.em(cabecaDe(menino, -0.25), tc - B.inicio - 0.1, { escala: 0.2 });
      const n = tc > tPr ? Math.min(6, 1 + Math.floor((tc - tPr) / 0.12)) : 1;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tPr + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) chegando · médio · esquerda, nele com a nota · (2) subindo · médio · frente, na tela
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), notaPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista dos pet shops de Campo Grande sobe do computador · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.08), tDi = quando('digita', B, 0.18), tL = quando('lista', B, 0.55), tPs = quando('pet', B, 0.65), tCg = quando('Campo', B, 0.78);
      ve(comp, navG);
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tPs ? 1 + Math.floor((tc - tPs) / 0.22) : 0;
        telaC.mostrar('listaPets', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tPs + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      menino.humor('feliz');
      fx.et.cg.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCg);
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Banho & Tosa Pantanal; o robô à esquerda; o Enzo à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analisePet', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      menino.humor('feliz');
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.quemPrecisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: 14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a estátua com os pombos · (2) Agora: no Banho & Tosa Pantanal, ele mostra a análise pra dona, o cachorro pula; o rival chega atrasado · MOSTRA: personagem, dona
      const tA = quando('Agora', B, 0.45), tPr = quando('primeiro', B, 0.9);
      if (tc < tA) {
        estatua('triste'); pombosPousados(tc, 4); teia.visible = true; musgo.visible = true;
        K.som('pingo', B.inicio + 0.3, 0.25);
        // CÂMERA: (1) de baixo, do lado direito (diferente do gancho)
        K.heroi(menino, pc(tc, B.inicio, tA), { lado: -32, dist: 3.2, altura: -0.45, olhar: 1.6 });
      } else {
        ve(placaPet2); nivel = 0;
        menino.colocar(ENZO2, cabecaDe(dona2, -1.3)); menino.humor('feliz');
        dona2.colocar(DONA2, cabecaDe(menino, -1.3)); dona2.humor('feliz');
        if (tc > tPr) dona2.reagir('vitoria', tc - tPr); else dona2.reagir('surpreso', tc - tA);
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.15, m[1] + 0.5, m[2] + 0.1); telaM.g.rotation.set(0, -0.7, 0); telaM.g.scale.setScalar(0.34 * pop(tc - tA));
        telaM.mostrar('analisePet', { ate: 2, score: 1 });
        menino.reagir('mostrando', tc - tA);
        ve(cao); cao.em([DONA2[0] + 0.55, 0, DONA2[2] + 0.75], tc, { rumo: 0.8, cara: 'feliz', abana: 1, pula: 1 });
        const kr = pc(tc, tA, tPr + 0.1);
        ve(rival); rival.irPara([1.3, 0, DZ2 + 6], [0.6, 0, DZ2 + 1.7], kr, tc, { reto: true });
        if (kr >= 1) { rival.colocar([0.6, 0, DZ2 + 1.7], cabecaDe(menino, -1.3)); rival.reagir('mao_na_testa', tc - tPr - 0.1); rival.humor('triste'); fx.et.atrasado.em(cabecaDe(rival, 0.5), tc - tPr - 0.1); }
        if (tc > tPr) fx.simb.em(mais(ENZO2, [-0.5, 2.5, 0]), tc - tPr, { tipo: '✓', tam: 1.0 });
        fx.et.primeiro.em(mais(ENZO2, [-0.5, 3.15, 0]), tc - tPr);
        K.som('whoosh', tA, 0.5); K.som('certo', tPr, 0.6);
        // CÂMERA: (2) fixa a ~4 m, de frente, na porta
        const q = K.suave(pc(tc, tA, B.ate));
        K.mirar([K.lerp(0.6, 0.4, q), 1.75, DZ2 + K.lerp(5.4, 4.9, q)], [-1.1, 1.3, DZ2 + 0.2]);
      }
    },
    segue(B, tc) {
      // NA TELA: o pedestal vazio e rachado com um pombo; o Enzo do lado; PEDRA e ATRÁS; depois o cartão, mappoa.com e o robô · MOSTRA: personagem, pedestal, navegador
      const tVc = quando('você', B, 0.05), tPe = quando('PEDRA', B, 0.3), tAt = quando('ATRÁS', B, 0.4), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
      ve(pedestal); nivel = 0;
      fx.racha.em(mais(PED, [0, 0.02, 0.75]), 9, { raio: 0.8, som: false, poeira: false });
      // o pombo pulando de um lado pro outro do pedestal
      const lado = Math.floor(tc * 1.2) % 2 ? 0.25 : -0.25;
      pombos[0].em(mais(TOPO(), [lado, 0, 0.1]), tc, { rumo: lado > 0 ? -1.2 : 1.2, bica: 0.5 });
      const EZ = [PED[0] - 1.05, 0, PED[2] + 0.9];
      menino.colocar(EZ, [0.6, 1.4, PED[2] + 6]); menino.humor('feliz');
      if (tc > tPc) menino.apontar(1);
      else if (tc > tAt) menino.reagir('vitoria', tc - tAt);
      else if (tc > tPe) menino.apontar(0.35);
      else menino.reagir('chamando', tc - tVc);
      fx.et.pedra.em(mais(TOPO(), [0, 0.95, 0]), tc - tPe);
      fx.et.atras.em(cabecaDe(menino, 0.5), tc - tAt);
      if (tc < tPc) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tPc);
      ve(navG); navG.g.position.set(PED[0] - 0.6, 3.2, PED[2] + 0.4); navG.g.rotation.set(0, 0, 0); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      ve(robo); robo.g.position.set(PED[0] - 2.2, 0, PED[2] + 1.1); robo.g.rotation.y = 0.45; robo.em(tc, { acena: tc > tPc ? 1 : 0, mapa: false });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('estalo', tPe, 0.4); K.som('estalo', tAt, 0.4); K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: chegando · médio · esquerda, ele e o pedestal → aberto e parado no cartão
      if (tc < tPc - 0.3) { const q = K.suave(pc(tc, B.inicio, tPc - 0.3)); K.mirar([PED[0] + 0.1, 1.85, PED[2] + K.lerp(5.6, 5.0, q)], [PED[0] - 0.6, 1.5, PED[2] + 0.6]); }
      else K.mirar([PED[0] - 0.6, 2.2, PED[2] + 7.6], [PED[0] - 0.7, 2.0, PED[2] + 0.6]);
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(pedestal, navG, robo); nivel = 0;
      fx.racha.em(mais(PED, [0, 0.02, 0.75]), 9, { raio: 0.8, som: false, poeira: false });
      navG.g.position.set(PED[0] - 0.6, 3.2, PED[2] + 0.4); navG.mostrar('endereco', { letras: 10, ir: true });
      pombos[0].em(mais(TOPO(), [0, 0, 0.1]), tc, { bica: 0.5 });
      robo.g.position.set(PED[0] - 2.2, 0, PED[2] + 1.1); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([PED[0] - 1.05, 0, PED[2] + 0.9], [0.6, 1.4, PED[2] + 6]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.mirar([PED[0] - 0.6, 2.2, PED[2] + 7.6], [PED[0] - 0.7, 2.0, PED[2] + 0.6]);
    },
    capa() {
      // o Enzo de pedra no pedestal, a cara de espanto congelada, o pombo na cabeça; o pet shop com "Sem site" atrás
      estatua('susto'); teia.visible = true; pombosPousados(2, 2, 0);
      olhos(0, 1);
      ve(placaPet);
      dona.colocar(DONA, [0.5, 1.2, DZ + 6]); dona.humor('normal'); dona.reagir('olha_relogio', 0.5);
      K.mirar([PED[0] - 0.2, 2.3, PED[2] + 5.4], [PED[0] - 0.5, 1.75, PED[2]]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const lugar = LUGAR[B.plano] || 'rua';
    CS.usar(lugar);
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona, dona2, rival, cliente].forEach((b) => { b.g.visible = false; b.g.rotation.set(0, 0, 0); });
    menino.g.visible = true;
    tudo.forEach((g) => { g.visible = false; });
    pombos.forEach((p) => { p.visible = false; });
    cao.g.visible = false;
    menino.g.position.y = 0;
    plaq.visible = false; note.visible = false; teia.visible = false; musgo.visible = false; plaq.scale.setScalar(1); musgo.scale.setScalar(1);
    olhos(0, 0); nivel = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    navG.g.position.set(-0.35, 2.95, -0.95);
    contrato.scale.setScalar(1); carimbo.visible = false; cel.scale.setScalar(1);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    plaq.position.z = note.visible ? 0.5 : 0.2; plaq.position.y = note.visible ? 1.02 : 0.98;
    pedra(nivel);
    if (lugar === 'quarto' && !cadeira.visible) { cadeira.position.set(SEAT[0], 0, SEAT[2] + 0.3); cadeira.rotation.set(0, PI, 0); ve(cadeira); }
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
