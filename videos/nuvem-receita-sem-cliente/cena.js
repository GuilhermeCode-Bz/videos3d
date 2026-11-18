// Receita de como ficar sem cliente (canal Mappoa, feito na nuvem, 18/11/2026): PROGRAMA DE CULINÁRIA AO CONTRÁRIO. O
// Beto (o personagem do canal, de chapéu de chef e avental) apresenta, "ao vivo", a receita pra nunca ter cliente: o
// portfólio escondido na panela, três posts pra doze pessoas, o "oi, tudo bem?" de tempero e seis meses no forno
// esperando indicação. Queima. Ele troca o ingrediente: no quarto, investe o preço de um pastel no Mappoa, acha os pet
// shops de Belo Horizonte sem site e abre o Pet Feliz (nota 89). De volta à cozinha, o primeiro cliente sai do forno.
// Três lugares (K.cenarios): a cozinha (o programa), o quarto (home_office) e o palco do Mappoa. Cada plano começa com as
// linhas da ficha do roteiro.md (NA TELA · MOSTRA · PERSONAGEM · CÂMERA · EFEITOS · SONS).
(function () {
  const PI = Math.PI;
  let bl, CS, menino, robo, comp, cad, navG, telaC, telaM, cel, moeda, pastel, FOV0;
  let ilhaG, panela, forno, portfolio, saleiro, concha, contrato, lista, aoVivo, chapeu, avental;
  const tudo = [], fx = {}, posts = [], baloes = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Cozinha: a bancada do programa no meio (o Beto atrás dela, de frente pra câmera), a panela à direita dele e o forno
  // à esquerda da bancada, com a porta virada pra câmera (+z)
  const ILHA = [0.3, 0, -0.9], BETO = [0.3, 0, -1.75], PAN = [0.9, 0.92, -0.85];
  const FORNO = [-1.85, 0, -0.85], BOCA = [-1.85, 0.45, -0.4], DENTRO = [-1.85, 0.2, -0.9], AO_FORNO = [-0.95, 0, 0.1];
  const OLHA_CAM = [0.3, 1.3, 6];
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira no SEAT quando ele senta, encostada do lado se não
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62], CAD_LADO = [-1.6, 0, -0.75];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];

  const LUGAR = { gancho: 'cozinha', portfolio: 'cozinha', posts: 'cozinha', tempero: 'cozinha', forno: 'cozinha', queimou: 'cozinha', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', ficha: 'quarto', pronto: 'cozinha', segue: 'quarto', cartao: 'quarto', capa: 'cozinha' };

  const PETS = [
    { nome: 'Pet Feliz', end: 'Rua Pernambuco, 640', chips: ['whats', 'insta'] },
    { nome: 'Bicho Mimado', end: 'Av. do Contorno, 3210', chips: ['tel', 'insta'] },
    { nome: 'Patas & Cia', end: 'Rua Itapecerica, 155', chips: ['whats'] },
    { nome: 'Amigo Fiel Pet Shop', end: 'Av. Amazonas, 4870', chips: ['whats', 'tel'] }
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
  // plano com um desenho em canvas (as duas faces)
  function quadro(w, h, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round(px * h / w);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4;
    return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, transparent: true, side: THREE.DoubleSide }));
  }

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
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
  function siteBeto(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Beto Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // o perfil do Instagram dele no celular: 3 posts por dia e 12 seguidores
  function perfil(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.2, h * 0.12, w * 0.12, 0, 7); c.fill();
    txt(c, 'beto.webdesign', w * 0.38, h * 0.08, w * 0.06, '#111', 800, 'left', w * 0.6);
    txt(c, String(e.seg), w * 0.5, h * 0.15, w * 0.11, e.seg <= 12 ? '#e8352b' : '#111', 900, 'center');
    txt(c, 'seguidores', w * 0.5, h * 0.21, w * 0.055, '#4a4f58', 700, 'center');
    for (let i = 0; i < 9; i++) { const x = (i % 3) * w / 3, y = h * 0.3 + Math.floor(i / 3) * w / 3; rr(c, x + 3, y + 3, w / 3 - 6, w / 3 - 6, 6, ['#f39a1e', '#2fb5a6', '#c0267a', '#2f6fd6'][i % 4]); txt(c, '♡ 0', x + w / 6, y + w / 6, w * 0.06, '#fff', 900, 'center'); }
  }
  // o "oi, tudo bem?" no balão verde do WhatsApp, com os ✓✓ cinza (ninguém leu)
  function balaoOi(c, w, h) {
    rr(c, 4, 4, w - 8, h - 8, h * 0.3, '#dcf8c6');
    txt(c, 'oi, tudo bem?', w * 0.08, h * 0.5, h * 0.36, '#111', 800, 'left', w * 0.66);
    txt(c, '✓✓', w * 0.92, h * 0.62, h * 0.26, '#9aa59e', 900, 'right');
  }

  // ---------- Peças feitas aqui ----------
  // a bancada do programa: madeira com pedra em cima e a faixa do programa na frente
  function fazIlha() {
    const g = new THREE.Group();
    const caixa = K.malha(new THREE.BoxGeometry(2.3, 0.88, 0.8), K.mat(0x2f6fd6, { roughness: 0.6 })); caixa.position.y = 0.44; g.add(caixa);
    const pedra = K.malha(new THREE.BoxGeometry(2.42, 0.06, 0.9), K.mat(0xf4f1ea, { roughness: 0.35 })); pedra.position.y = 0.91; g.add(pedra);
    const faixa = quadro(1.9, 0.42, 760, (c, w, h) => {
      rr(c, 0, 0, w, h, h * 0.25, '#ffffff');
      txt(c, '🍳 COZINHA DO BETO', w / 2, h * 0.36, h * 0.3, '#2f6fd6', 900, 'center');
      txt(c, 'receitas que dão errado', w / 2, h * 0.73, h * 0.2, '#e8352b', 800, 'center');
    });
    faixa.position.set(0, 0.5, 0.405); g.add(faixa);
    return g;
  }
  // a panela grande e vermelha, com a tampa (g.userData.tampa) e o caldo (g.userData.caldo); base em y = 0
  function fazPanela() {
    const g = new THREE.Group();
    const mat = K.mat(0xe8352b, { roughness: 0.35, metalness: 0.15 });
    const corpo = K.malha(new THREE.CylinderGeometry(0.32, 0.29, 0.34, 32, 1, true), K.mat(0xe8352b, { roughness: 0.35, metalness: 0.15, side: THREE.DoubleSide })); corpo.position.y = 0.17; g.add(corpo);
    const fundo = K.malha(new THREE.CircleGeometry(0.29, 28), mat); fundo.rotation.x = -PI / 2; fundo.position.y = 0.005; g.add(fundo);
    const aro = K.malha(new THREE.TorusGeometry(0.32, 0.018, 8, 36), K.mat(0xc9ccd1, { metalness: 0.7, roughness: 0.25 })); aro.rotation.x = PI / 2; aro.position.y = 0.34; g.add(aro);
    [-1, 1].forEach((l) => { const a = K.malha(new THREE.TorusGeometry(0.06, 0.018, 8, 16, PI), K.mat(0x2a2e33)); a.position.set(l * 0.35, 0.26, 0); a.rotation.set(0, l > 0 ? -PI / 2 : PI / 2, 0); g.add(a); });
    const caldo = K.malha(new THREE.CircleGeometry(0.305, 28), K.mat(0x8a6a3a, { roughness: 0.5 })); caldo.rotation.x = -PI / 2; caldo.position.y = 0.27; g.add(caldo);
    const tampa = new THREE.Group(); tampa.position.y = 0.345; g.add(tampa);
    const disco = K.malha(new THREE.SphereGeometry(0.33, 28, 8, 0, PI * 2, 0, 0.42), K.mat(0xc9ccd1, { metalness: 0.65, roughness: 0.25 })); disco.scale.y = 0.55; disco.position.y = -0.27; tampa.add(disco);
    const pega = K.malha(new THREE.SphereGeometry(0.045, 12, 10), K.mat(0x2a2e33)); pega.position.y = 0.09; tampa.add(pega);
    g.userData = { tampa, caldo, matCorpo: corpo.material, mat };
    return g;
  }
  // o forno de chão: corpo creme, a porta que abre pra baixo (g.userData.porta), o vidro e o fundo que acendem
  function fazForno() {
    const g = new THREE.Group();
    const creme = K.mat(0xf4f1ea, { roughness: 0.45 }), escuro = K.mat(0x2a2e33, { roughness: 0.4 });
    const W = 1.0, H = 0.95, D = 0.75, e = 0.06;
    const pc = (s, p, m) => { const x = K.malha(new THREE.BoxGeometry(...s), m); x.position.set(...p); g.add(x); return x; };
    pc([e, H, D], [-W / 2 + e / 2, H / 2, 0], creme); pc([e, H, D], [W / 2 - e / 2, H / 2, 0], creme);
    pc([W, e, D], [0, e / 2 + 0.06, 0], creme); pc([W, 0.06, D], [0, 0.03, 0], escuro);
    pc([W, 0.2, D], [0, H - 0.1, 0], creme);
    const brasa = K.mat(0x3a2a20, { roughness: 0.8, emissive: 0xff6a10, emissiveIntensity: 0 });
    pc([W, H, e], [0, H / 2, -D / 2 + e / 2], brasa);
    pc([W - 0.12, 0.02, D - 0.1], [0, 0.42, 0], K.mat(0x9aa0a6, { metalness: 0.7 }));
    const forro = K.malha(new THREE.BoxGeometry(W - 0.13, H - 0.33, D - 0.08), K.mat(0x24201c, { roughness: 0.9, side: THREE.BackSide })); forro.position.set(0, 0.45, 0); g.add(forro);
    // painel de cima: 4 botões e o relógio
    pc([W - 0.04, 0.16, 0.02], [0, H - 0.1, D / 2 + 0.005], escuro);
    [-0.36, -0.22, 0.22, 0.36].forEach((x) => { const b = K.malha(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 14), K.mat(0xc9ccd1, { metalness: 0.6 })); b.rotation.x = PI / 2; b.position.set(x, H - 0.1, D / 2 + 0.03); g.add(b); });
    const rel = quadro(0.24, 0.1, 240, (c, w, h) => { rr(c, 0, 0, w, h, 8, '#10151c'); txt(c, '06:00', w / 2, h / 2 + 2, h * 0.62, '#4dff9a', 800, 'center'); });
    rel.position.set(0, H - 0.1, D / 2 + 0.02); g.add(rel);
    // a porta: dobradiça embaixo, na frente
    const porta = new THREE.Group(); porta.position.set(0, 0.1, D / 2); g.add(porta);
    const folha = K.malha(new THREE.BoxGeometry(W - 0.04, 0.64, 0.05), creme); folha.position.set(0, 0.32, 0.025); porta.add(folha);
    const vidro = K.mat(0x1b1f26, { roughness: 0.1, emissive: 0xff7a1a, emissiveIntensity: 0 });
    const v = K.malha(new THREE.BoxGeometry(W - 0.3, 0.32, 0.02), vidro); v.position.set(0, 0.3, 0.055); porta.add(v);
    const puxador = K.malha(new THREE.CylinderGeometry(0.018, 0.018, W - 0.24, 10), K.mat(0xc9ccd1, { metalness: 0.8, roughness: 0.2 })); puxador.rotation.z = PI / 2; puxador.position.set(0, 0.56, 0.1); porta.add(puxador);
    [-1, 1].forEach((l) => { const s = K.malha(new THREE.BoxGeometry(0.03, 0.03, 0.06), K.mat(0xc9ccd1, { metalness: 0.8 })); s.position.set(l * (W - 0.3) / 2, 0.56, 0.07); porta.add(s); });
    g.userData = { porta, brasa, vidro };
    return g;
  }
  // o portfólio bonito: pasta com a capa colorida
  function fazPortfolio() {
    const g = new THREE.Group();
    const lomb = K.malha(new THREE.BoxGeometry(0.4, 0.5, 0.05), K.mat(0x7a2b8f)); g.add(lomb);
    const capa = quadro(0.38, 0.48, 380, (c, w, h) => {
      const d = c.createLinearGradient(0, 0, w, h); d.addColorStop(0, '#f39a1e'); d.addColorStop(0.5, '#c0267a'); d.addColorStop(1, '#2f6fd6');
      rr(c, 0, 0, w, h, 14, d);
      txt(c, 'MEU', w / 2, h * 0.32, w * 0.15, '#fff', 900, 'center');
      txt(c, 'PORTFÓLIO', w / 2, h * 0.47, w * 0.15, '#fff', 900, 'center', w * 0.9);
      txt(c, '✨ ✨ ✨', w / 2, h * 0.68, w * 0.11, '#fff', 900, 'center');
    });
    capa.position.z = 0.027; g.add(capa);
    return g;
  }
  // um post do Instagram (quadrado colorido com o coração no 0)
  function fazPost(i) {
    return quadro(0.32, 0.32, 256, (c, w, h) => {
      rr(c, 0, 0, w, h, 16, '#ffffff');
      rr(c, 10, 10, w - 20, h * 0.68, 10, ['#f39a1e', '#2fb5a6', '#c0267a'][i]);
      txt(c, ['Dica de site!', 'Novo layout', 'Bom dia ☀️'][i], w / 2, h * 0.42, w * 0.11, '#fff', 900, 'center', w * 0.85);
      txt(c, '♡ 0', w * 0.12, h * 0.86, w * 0.11, '#e8352b', 900, 'left');
    });
  }
  // o saleiro do "oi, tudo bem?"
  function fazSaleiro() {
    const g = new THREE.Group();
    const vid = K.malha(new THREE.CylinderGeometry(0.1, 0.11, 0.26, 20), K.mat(0xdff3f1, { roughness: 0.1, transparent: true, opacity: 0.85 })); vid.position.y = 0.13; g.add(vid);
    const sal = K.malha(new THREE.CylinderGeometry(0.095, 0.105, 0.16, 20), K.mat(0x25d366, { roughness: 0.6 })); sal.position.y = 0.09; g.add(sal);
    const tampa = K.malha(new THREE.SphereGeometry(0.105, 18, 10, 0, PI * 2, 0, PI / 2), K.mat(0xc9ccd1, { metalness: 0.7, roughness: 0.25 })); tampa.position.y = 0.26; g.add(tampa);
    const rot = quadro(0.2, 0.09, 220, (c, w, h) => { rr(c, 0, 0, w, h, 10, '#ffffff'); txt(c, 'oi, tudo bem?', w / 2, h / 2 + 1, h * 0.42, '#075e54', 900, 'center', w * 0.92); });
    rot.position.set(0, 0.12, 0.112); g.add(rot);
    return g;
  }
  // a concha grande do chef
  function fazConcha() {
    const g = new THREE.Group();
    const cabo = K.malha(new THREE.CylinderGeometry(0.018, 0.018, 0.5, 10), K.mat(0xc9ccd1, { metalness: 0.7, roughness: 0.25 })); cabo.position.y = 0.2; g.add(cabo);
    const cuia = K.malha(new THREE.SphereGeometry(0.09, 16, 10, 0, PI * 2, PI / 2, PI / 2), K.mat(0xc9ccd1, { metalness: 0.7, roughness: 0.25, side: THREE.DoubleSide })); cuia.position.y = -0.05; g.add(cuia);
    return g;
  }
  // o pastel (o preço do investimento)
  function fazPastel() {
    const g = new THREE.Group();
    const m = K.malha(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 24, 1, false, 0, PI), K.mat(0xe8b04a, { roughness: 0.55 })); m.scale.set(1, 1, 0.75); g.add(m);
    for (let i = 0; i < 9; i++) { const d = K.malha(new THREE.SphereGeometry(0.018, 6, 5), K.mat(0xc98a2e)); d.position.set(Math.cos(i * PI / 8) * 0.16, 0, Math.sin(i * PI / 8) * 0.12); g.add(d); }
    g.rotation.x = PI / 2;
    const p = new THREE.Group(); p.add(g); return p;
  }
  // o contrato do primeiro cliente, numa assadeira dourada
  function fazContrato() {
    const g = new THREE.Group();
    const ass = K.malha(new THREE.BoxGeometry(0.62, 0.035, 0.46), K.mat(0xd8a43a, { metalness: 0.6, roughness: 0.3 })); g.add(ass);
    const folha = quadro(0.44, 0.58, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#fffdf4');
      c.strokeStyle = '#d8a43a'; c.lineWidth = 10; c.strokeRect(12, 12, w - 24, h - 24);
      txt(c, 'CONTRATO', w / 2, h * 0.16, w * 0.13, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Pet Feliz', w / 2, h * 0.32, w * 0.085, '#2f6fd6', 800, 'center', w * 0.86);
      for (let i = 0; i < 4; i++) rr(c, w * 0.14, h * (0.44 + i * 0.07), w * (0.72 - (i % 2) * 0.15), 7, 3, '#c9ccd1');
      txt(c, '1º cliente ✓', w / 2, h * 0.84, w * 0.11, '#1aa35a', 900, 'center');
    });
    folha.position.set(0, 0.3, -0.05); folha.rotation.x = -0.15; g.add(folha);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios(['cozinha', ['home_office', {}, 'quarto'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaPets = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: PETS, n: e.n, sel: e.sel, total: 96, comSite: 61, semSite: 35 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Pet shops · Belo Horizonte, MG · 35 sem site', 36, 168, 19, M.marinho, 700, 'left', w - 72);
    };
    T.analisePet = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Pet Feliz', ate: e.ate, aderencia: 0.89 * k,
        dores: ['Sem site: banho e tosa só pelo WhatsApp', 'Some no Google pra quem procura pet shop na Savassi'], oportunidades: ['Site com o agendamento de banho e tosa'],
        objecoes: ['"Meus clientes me acham no Instagram"'], abordagem: 'Mostre quanta gente procura banho e tosa na Savassi e não acha o Pet Feliz.'
      });
      if (e.ate >= 0) txt(c, Math.round(89 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
      if (e.zap) { rr(c, w - 250, 132, 232, 44, 22, '#25d366'); txt(c, 'WhatsApp ✓', w - 134, 155, 22, '#fff', 900, 'center'); }
    };
    T.msgPet = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Pet Feliz (WhatsApp)', digitado: e.d, texto: 'Oi! Vi que o Pet Feliz ainda não tem site e o banho e tosa é marcado só pelo WhatsApp. Faço um site com o agendamento online. Te mostro uma ideia?' });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Beto (do canal, de chapéu de chef e avental) e o robô do Mappoa
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    chapeu = new THREE.Group();
    const branco = K.mat(0xffffff, { roughness: 0.8 });
    const faixaCh = K.malha(new THREE.CylinderGeometry(0.21, 0.2, 0.14, 20), branco); faixaCh.position.y = 0.2; chapeu.add(faixaCh);
    [[0, 0.37, 0, 0.18], [-0.11, 0.33, 0.04, 0.13], [0.11, 0.33, 0.04, 0.13], [0, 0.33, -0.1, 0.13]].forEach(([x, y, z, r]) => { const s = K.malha(new THREE.SphereGeometry(r, 14, 10), branco); s.position.set(x, y, z); chapeu.add(s); });
    chapeu.rotation.x = -0.15;
    menino.cabeca.add(chapeu);
    avental = new THREE.Group();
    const pano = K.malha(new THREE.CylinderGeometry(0.27, 0.29, 0.5, 20, 1, true, -0.85, 1.7), K.mat(0xffffff, { roughness: 0.85, side: THREE.DoubleSide })); pano.position.y = 0.55; pano.scale.z = 0.95; avental.add(pano);
    const bolso = K.malha(new THREE.BoxGeometry(0.16, 0.08, 0.01), K.mat(0xe8352b)); bolso.position.set(0, 0.5, 0.275); avental.add(bolso);
    menino.corpo.add(avental);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Cozinha: a bancada, a panela, o forno, o portfólio, os posts, o saleiro e os balões, a concha e o contrato
    ilhaG = fazIlha(); guarda(ilhaG, null, ILHA);
    panela = fazPanela(); guarda(panela, 'panela', PAN);
    forno = fazForno(); guarda(forno, 'forno', FORNO);
    portfolio = fazPortfolio(); guarda(portfolio, 'portfolio');
    [0, 1, 2].forEach((i) => { const p = fazPost(i); guarda(p, null); posts.push(p); });
    saleiro = fazSaleiro(); guarda(saleiro, null);
    for (let i = 0; i < 4; i++) { const b = quadro(0.62, 0.2, 400, balaoOi); guarda(b, 'mensagem'); baloes.push(b); }
    concha = fazConcha(); guarda(concha, null);
    contrato = fazContrato(); guarda(contrato, 'contrato');
    lista = K.m3d('lista_check'); guarda(lista, null, null, 0.9);
    cel = K.celular(); guarda(cel, 'celular', null, 1.8);

    // Quarto
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, CAD_LADO);
    pastel = fazPastel(); guarda(pastel, 'pagamento', null, 1.3);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, 'pagamento');
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // A moldura do "AO VIVO" do programa (na frente da câmera, só no 1º corte do gancho)
    const cv = document.createElement('canvas'); cv.width = 540; cv.height = 960;
    const cx = cv.getContext('2d');
    cx.strokeStyle = 'rgba(255,255,255,0.9)'; cx.lineWidth = 8; cx.beginPath(); cx.roundRect(14, 14, 512, 932, 26); cx.stroke();
    rr(cx, 34, 44, 168, 52, 26, '#e8352b');
    cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(62, 70, 9, 0, 7); cx.fill();
    txt(cx, 'AO VIVO', 80, 71, 26, '#fff', 900);
    rr(cx, 214, 44, 292, 52, 26, 'rgba(11,27,58,0.85)');
    txt(cx, 'Cozinha do Beto', 360, 71, 25, '#fff', 800, 'center', 270);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
    aoVivo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthTest: false, depthWrite: false }));
    aoVivo.renderOrder = 40; aoVivo.visible = false; K.scene.add(aoVivo);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof();
    fx.cont = K.contador();
    fx.vapor = K.fumaca(15, 0xffffff, 14);
    fx.fumaca = K.fumaca(16, 0x26221f, 22); K.nomear('fumaca', fx.fumaca.g);
    fx.folhas = K.folhasVento(77, 70, { papel: true });
    fx.festa = K.festa([-1.0, 1.2, 0.1]);
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      receita: e('Rende: 0 clientes', 'vermelho'), i1: e('1. Portfólio escondido', 'laranja'), i2: e('2. Post pra 12 pessoas', 'laranja'),
      i3: e('3. "Oi, tudo bem?"', 'laranja'), i4: e('4. Esperar 6 meses', 'laranja'), queimou: e('Queimou ✗', 'vermelho'), certinho: e('Seguiu certinho', 'azul'),
      investir: e('Investir', 'azul'), bh: e('35 sem site', 'azul'), chance: e('Quem tem chance', 'verde'), zap: e('WhatsApp ✓', 'verde'),
      temperada: e('Mensagem temperada 🧂', 'verde'), cliente: e('1º cliente ✓', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // o Beto atrás da bancada, de frente pra câmera
  function noPrograma(olhar) { ve(panela, forno); menino.colocar(BETO, olhar || OLHA_CAM); }
  // a moldura "AO VIVO" (chamar DEPOIS da câmera)
  function moldura(forca) {
    if (forca <= 0.01) { aoVivo.visible = false; return; }
    const d = V(0, 0, -1).applyQuaternion(K.camera.quaternion), dist = 0.3;
    const h = 2 * dist * Math.tan((K.camera.fov * PI) / 360), w = h * K.camera.aspect;
    aoVivo.visible = true; aoVivo.position.copy(K.camera.position).addScaledVector(d, dist); aoVivo.quaternion.copy(K.camera.quaternion);
    aoVivo.scale.set(w, h, 1); aoVivo.material.opacity = forca;
  }
  // a tampa da panela: aberta (0 = fechada, 1 = levantada de lado), com tremidinha quando ferve
  function tampa(aberta, treme = 0, t = 0) {
    const tp = panela.userData.tampa;
    tp.position.set(aberta * 0.22, 0.345 + aberta * 0.28 + treme * Math.abs(Math.sin(t * 23)) * 0.03, aberta * 0.05);
    tp.rotation.set(0, 0, -aberta * 0.9 + treme * Math.sin(t * 31) * 0.06);
  }
  // a panela queimada (preta) ou normal
  function queimada(k) {
    const c = new THREE.Color(0xe8352b).lerp(new THREE.Color(0x1d1a18), k);
    panela.userData.matCorpo.color.copy(c); panela.userData.mat.color.copy(c);
    panela.userData.caldo.material.color.set(k > 0.5 ? 0x14110f : 0x8a6a3a);
  }
  // o forno: porta (0 fechada, 1 aberta), aceso (0 a 1)
  function fornoEm(porta, aceso) {
    forno.userData.porta.rotation.x = K.clamp(porta) * 1.45;
    forno.userData.brasa.emissiveIntensity = aceso * 0.9;
    forno.userData.vidro.emissiveIntensity = aceso * 0.7;
  }
  // algo na mão direita do Beto, virado pra câmera (chamar DEPOIS da câmera)
  function naMao(obj, esc, dy = 0.12) {
    ve(obj); menino.g.updateMatrixWorld(true);
    const m = menino.mao(1); obj.position.set(m[0], m[1] + dy, m[2]); obj.scale.setScalar(esc);
    obj.lookAt(K.camera.position);
  }
  function celNaMao(desenho, chave, esc = 1.8) { naMao(cel.g, esc); cel.tela.desenhar(desenho, chave); }
  // a concha na mão direita, em pé
  function conchaNaMao() {
    ve(concha); menino.g.updateMatrixWorld(true);
    const m = menino.mao(1); concha.position.set(m[0], m[1] + 0.05, m[2]); concha.rotation.set(0, menino.g.rotation.y, -0.25);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o programa de culinária "AO VIVO": a bancada azul, a panela vermelha fervendo e soltando fumaça preta, o Beto de chef com a concha · MOSTRA: personagem, panela
      // CENÁRIO: a cozinha (fogão, geladeira, azulejo e a janela atrás)
      const tHo = quando('Hoje', B, 0.02), tRe = quando('receita', B, 0.5), tNu = quando('nunca', B, 0.72), tCl = quando('cliente', B, 0.85);
      noPrograma();
      // PERSONAGEM: falando com a câmera, a concha na mão · em "receita": abre o braço apresentando a panela · em "cliente": mão na testa
      if (tc < tRe) { menino.reagir('chamando', tc - B.inicio); menino.falar(tc); }
      else if (tc < tCl) { menino.reagir('mostrando', tc - tRe); menino.falar(tc); }
      else menino.reagir('mao_na_testa', tc - tCl);
      menino.humor(tc < tCl ? 'feliz' : 'triste');
      // OBJETOS SE MEXENDO: a tampa treme fervendo · em "receita" pula com um poof · fumaça preta saindo
      const pula = tc > tRe ? Math.sin(K.clamp((tc - tRe) / 0.5) * PI) : 0;
      tampa(pula * 0.8, 1, tc);
      // CÂMERA: (1) aberta, de frente, a moldura do AO VIVO · (2) em ~0,8 s, de lado na panela · (3) em "receita", perto dele de frente
      const c1 = B.inicio + 0.8, c2 = Math.max(c1 + 0.6, tRe - 0.05);
      if (tc < c1) K.mirar([K.lerp(0.9, 0.7, pc(tc, B.inicio, c1)), 1.75, K.lerp(5.0, 4.6, pc(tc, B.inicio, c1))], [0.45, 1.15, -0.9]);
      else if (tc < c2) { const k = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(2.3, 2.1, k), 1.55, K.lerp(1.2, 1.0, k)], [0.75, 1.15, -1.0]); }
      else { const k = K.suave(pc(tc, c2, B.ate)); K.mirar([K.lerp(0.75, 0.65, k), 1.6, K.lerp(2.5, 2.2, k)], [0.55, 1.3, -1.2]); }
      moldura(tc < c1 ? 1 : 0);
      conchaNaMao();
      // EFEITOS VISUAIS: fumaça preta e vapor da panela · poof em "receita" · "Receita do fracasso" em "receita" · ✗ em "cliente"
      fx.fumaca.em(mais(PAN, [0, 0.4, 0]), tc, { altura: 1.8, escala: 0.32, vento: [0.15, -0.35], ritmo: 0.6, forca: 0.8 });
      fx.poof.em(mais(PAN, [0.1, 0.7, -0.2]), tc - tRe, { escala: 0.18 });
      fx.et.receita.em({ tela: [540, 560] }, tc - tRe);
      if (tc > tCl) fx.simb.em(mais(cabecaDe(menino, 0.45), [0.45, 0, 0]), tc - tCl, { tipo: '✗', tam: 0.5 });
      // SONS: bolhas fervendo · tampa pulando em "receita" · errado em "cliente"
      K.som('bolhas', B.inicio, 0.35, B.dur); K.som('tampa', tRe, 0.5); K.som('errado', tCl + 0.1, 0.35); void tHo; void tNu;
    },
    portfolio(B, tc) {
      // NA TELA: o Beto ergue o portfólio colorido ✨; em "não mostre" esconde dentro da panela e fecha a tampa · MOSTRA: personagem, portfolio, panela
      const tPr = quando('Primeiro', B, 0.05), tPo = quando('portfólio', B, 0.3), tNa = quando('não', B, 0.6), tNi = quando('ninguém', B, 0.85);
      noPrograma();
      // PERSONAGEM: ergue o portfólio, orgulhoso · em "não": vira pra panela e põe dentro · em "ninguém": ombros ("sei lá")
      if (tc < tNa) { menino.reagir('erguendo', tc - tPo); menino.humor('feliz'); }
      else if (tc < tNi) { menino.colocar(BETO, mais(PAN, [0, 0.3, 0])); menino.reagir('segurando', tc - tNa); }
      else menino.reagir('ombros', tc - tNi);
      // OBJETOS SE MEXENDO: o portfólio na mão (alto) · em "não" voa pra dentro da panela · a tampa fecha em "ninguém"
      const k = pc(tc, tNa, tNa + 0.45);
      tampa(tc < tNa ? 0.9 : tc < tNi ? 0.9 : 1 - K.suave(pc(tc, tNi, tNi + 0.2)), 0, tc);
      // CÂMERA: (1) chegando de frente-esquerda nele com o portfólio · (2) em "não", de cima do lado da panela
      const cv = tNa - 0.05;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.3), mais(BETO, [0.25, 1.75, 0.3]), mais(BETO, [0, 0.9, 0.4])], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: -20, altura: 'olho', tam: 1.6, obstaculos: false });
      else { const q = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(1.9, 1.7, q), 2.05, K.lerp(0.6, 0.45, q)], [0.75, 1.05, -0.95]); }
      if (tc < tNa) { menino.g.updateMatrixWorld(true); const a = menino.mao(0), b = menino.mao(1); ve(portfolio); portfolio.position.set((a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 0.22, (a[2] + b[2]) / 2 + 0.12); portfolio.rotation.set(0, 0, Math.sin(tc * 3) * 0.08); portfolio.scale.setScalar(1); }
      else if (k < 1) { ve(portfolio); const de = mais(BETO, [0.3, 1.5, 0.3]); portfolio.position.set(K.lerp(de[0], PAN[0], k), K.lerp(de[1], PAN[1] + 0.3, k) + Math.sin(k * PI) * 0.3, K.lerp(de[2], PAN[2], k)); portfolio.rotation.set(k * 1.4, 0, k * 0.6); portfolio.scale.setScalar(K.lerp(1, 0.55, k)); }
      // EFEITOS VISUAIS: "1. Portfólio escondido" em "Primeiro" · ✨ no "portfólio" · ✗ em "ninguém"
      fx.et.i1.em({ tela: [540, 400] }, tc - tPr);
      if (tc > tPo && tc < tNa) fx.simb.em(mais(cabecaDe(menino, 0.5), [-0.45, 0, 0]), tc - tPo, { tipo: '+1', tam: 0.4 });
      if (tc > tNi) fx.simb2.em(mais(PAN, [0, 0.95, 0]), tc - tNi, { tipo: '✗', tam: 0.45 });
      // SONS: brilho no portfólio · whoosh no arremesso · tampa fechando
      K.som('brilho', tPo, 0.35); K.som('whoosh', tNa, 0.4); K.som('tampa', tNi + 0.15, 0.55);
    },
    posts(B, tc) {
      // NA TELA: três posts do Instagram saltam e caem na panela, um por um; em "Para um público", o celular com 12 seguidores · MOSTRA: personagem, celular, panela
      const tJu = quando('Junte', B, 0.03), tTr = quando('três', B, 0.15), tPa = quando('Para', B, 0.55), tDo = quando('doze', B, 0.82);
      noPrograma(tc < tPa ? mais(PAN, [0, 0.4, 0]) : OLHA_CAM);
      tampa(tc < tPa ? 0.9 : 0, 0, tc);
      // PERSONAGEM: joga os posts na panela, um por um · em "Para": pega o celular e mostra · em "doze": cara de decepção
      if (tc < tPa) menino.reagir('empurrando', tc - tJu); else if (tc < tDo) menino.reagir('celular', tc - tPa); else { menino.reagir('triste', tc - tDo); }
      // OBJETOS SE MEXENDO: os 3 posts sobem da bancada e caem dentro da panela (a cada 0,35 s depois de "três")
      posts.forEach((p, i) => {
        const t0 = tTr + i * 0.35, k = pc(tc, t0, t0 + 0.55);
        if (tc < t0 || k >= 1) return;
        ve(p); const de = mais(BETO, [0.35, 1.25, 0.45]);
        p.position.set(K.lerp(de[0], PAN[0], k), K.lerp(de[1], PAN[1] + 0.25, k) + Math.sin(k * PI) * 0.55, K.lerp(de[2], PAN[2], k));
        p.rotation.set(-0.4, k * 2.5, 0); p.scale.setScalar(1 - k * 0.4);
        K.som('pingo', t0 + 0.5, 0.35);
      });
      // CÂMERA: (1) de lado, da altura da panela, os posts voando · (2) em "Para", perto dele com o celular, de frente
      if (tc < tPa) { const q = K.suave(pc(tc, B.inicio, tPa)); K.mirar([K.lerp(2.6, 2.3, q), 1.85, K.lerp(-0.2, 0.2, q)], [0.7, 1.25, -1.05]); }
      else K.filmar([cabecaDe(menino, 0.3), mais(BETO, [0.3, 1.0, 0.3])], 'chegando', pc(tc, tPa, B.ate), { plano: 'perto', lado: 12, altura: 'olho', tam: 1.35, obstaculos: false });
      if (tc > tPa) celNaMao((c, w, h) => perfil(c, w, h, { seg: 12 }), 'p12', 1.7);
      // EFEITOS VISUAIS: "2. Post pra 12 pessoas" em "Junte" · o contador "12 seguidores" em "doze"
      fx.et.i2.em({ tela: [540, 400] }, tc - tJu);
      if (tc > tDo - 0.1) fx.simb.em(mais(cabecaDe(menino, 0.5), [0.45, 0, 0]), tc - tDo, { tipo: '?', tam: 0.45 });
      // SONS: whoosh nos posts · clique no celular · errado no "doze"
      K.som('whoosh', tTr, 0.3); K.som('clique', tPa, 0.4); K.som('errado', tDo + 0.1, 0.3);
    },
    tempero(B, tc) {
      // NA TELA: o Beto sacode o saleiro verde "oi, tudo bem?" em cima da panela; os balões "oi, tudo bem?" ✓✓ caem dentro · MOSTRA: personagem, mensagem, panela
      const tTe = quando('Tempere', B, 0.05), tOi = quando('oi,', B, 0.35), tNi = quando('ninguém', B, 0.7), tRe = quando('responde', B, 0.85);
      noPrograma(mais(PAN, [0, 0.3, 0]));
      tampa(0.9, 0, tc);
      // PERSONAGEM: sacode o saleiro (o braço sobe e desce) · em "ninguém": espera olhando a panela, depois "sei lá"
      if (tc < tNi) { menino.reagir('erguendo', tc - tTe); } else menino.reagir(tc < tRe ? 'duvida' : 'ombros', tc - tNi);
      // CÂMERA: (1) de baixo, de frente-direita, o saleiro sacudindo em cima da panela · (2) em "ninguém", aberta de frente, os balões parados na panela
      const cv = tNi - 0.05;
      if (tc < cv) K.filmar([mais(PAN, [0, 1.0, 0]), mais(PAN, [0, 0.2, 0]), cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 28, altura: 'baixo', tam: 1.35, obstaculos: false });
      else { const q = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(0.85, 0.75, q), 1.7, K.lerp(3.1, 2.8, q)], [0.6, 1.2, -1.0]); }
      // OBJETOS SE MEXENDO: o saleiro sacode em cima da panela · os balões "oi, tudo bem?" saem dele e caem dentro (um a cada 0,3 s)
      const sac = tc < tNi ? Math.sin(tc * 18) * 0.12 : 0;
      ve(saleiro); saleiro.position.set(PAN[0] - 0.05, PAN[1] + 0.85 + sac, PAN[2] + 0.05); saleiro.rotation.set(0, 0, PI * 0.82);
      baloes.forEach((b, i) => {
        const t0 = tOi + i * 0.28; if (tc < t0) return;
        const k = pc(tc, t0, t0 + 0.6);
        ve(b); b.position.set(PAN[0] + (i - 1.5) * 0.18, K.lerp(PAN[1] + 0.8, PAN[1] + 0.42 + i * 0.05, K.suave(k)), PAN[2] + 0.15 + (i % 2) * 0.05);
        b.lookAt(K.camera.position); b.scale.setScalar(K.lerp(0.4, 1, K.clamp(k * 2)));
        K.som('bip', t0, 0.2);
      });
      // EFEITOS VISUAIS: "3. 'Oi, tudo bem?'" em "Tempere" · "…" em "ninguém" (ninguém responde)
      fx.et.i3.em({ tela: [540, 400] }, tc - tTe);
      if (tc > tNi) fx.simb.em(mais(PAN, [0, 1.15, 0]), tc - tNi, { tipo: '…', tam: 0.45 });
      // SONS: chacoalhar (estalo) do saleiro · silêncio em "ninguém" (só um grilo de "zumbido" baixinho)
      for (let k = 0; k < 5; k++) K.som('estalo', tTe + 0.1 + k * 0.18, 0.15);
      K.som('zumbido', tNi, 0.12, 0.8);
    },
    forno(B, tc) {
      // NA TELA: na frente do forno: o Beto põe a panela dentro e fecha a porta; o forno acende; o contador "Mês 1 → 6"; folhas do calendário voando; ele dorme encostado · MOSTRA: forno, personagem
      const tDe = quando('Deixe', B, 0.03), tFo = quando('forno', B, 0.2), tEs = quando('esperando', B, 0.35), tSe = quando('seis', B, 0.72);
      ve(forno);
      const fecha = tEs + 0.15;
      // PERSONAGEM: carrega a panela até a boca do forno e põe dentro · em "esperando": olha o relógio · em "seis meses": dorme em pé (Zzz)
      menino.colocar(AO_FORNO, tc < fecha ? BOCA : [0.5, 1.3, 5]);
      if (tc < fecha) menino.reagir('carregando', tc - B.inicio); else if (tc < tSe) menino.reagir('olha_relogio', tc - fecha); else menino.reagir('dormindo', tc - tSe);
      // OBJETOS SE MEXENDO: a porta abre em "Deixe" e fecha depois de "esperando"; a panela vai da mão pra dentro do forno; o forno acende
      fornoEm(tc < tFo ? pc(tc, B.inicio, tDe + 0.3) : 1 - pc(tc, tEs, fecha), tc > fecha ? 0.6 + 0.4 * Math.sin(tc * 4) : 0);
      ve(panela); tampa(0, 0, tc);
      menino.g.updateMatrixWorld(true);
      const m = menino.carregar ? menino.carregar() : menino.mao(1);
      const k = pc(tc, tFo - 0.1, tEs);
      panela.position.set(K.lerp(m[0], DENTRO[0], k), K.lerp(m[1] - 0.2, DENTRO[1], k), K.lerp(m[2], DENTRO[2], k)); panela.scale.setScalar(K.lerp(0.75, 0.68, k));
      // CÂMERA: (1) de frente-direita, os dois (ele e o forno) · (2) em "seis", baixa, de frente pro vidro do forno, ele dormindo do lado
      const cv = tSe - 0.15;
      if (tc < cv) K.filmar([mais(FORNO, [0, 0.95, 0.3]), mais(FORNO, [0, 0.1, 0.4]), cabecaDe(menino, 0.25)], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: 20, altura: 'olho', tam: 1.9, obstaculos: false });
      else { const q = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-1.75, -1.6, q), 1.15, K.lerp(4.3, 3.9, q)], [-1.25, 0.8, -0.5]); }
      // EFEITOS VISUAIS: "4. Esperar 6 meses" em "Deixe" · o contador "Mês 1 → 6" em "seis" · as folhas do calendário voando
      fx.et.i4.em({ tela: [540, 400] }, tc - tDe);
      fx.cont.em(mais(FORNO, [0, 1.45, 0.3]), tc - tEs, { de: 1, ate: 6, dur: Math.max(0.6, B.ate - tEs - 0.3), antes: 'Mês ', depois: '', cor: '#e8352b', tam: 0.75 });
      if (tc > tSe) fx.folhas.em(mais(FORNO, [0.4, 0.4, 0.8]), tc - tSe, { forca: 0.7 });
      // SONS: a porta rangendo · tampa (a porta fechando) · o forno ligando (fogo baixinho) · tique do relógio
      K.som('range', tDe, 0.35); K.som('tampa', fecha, 0.45); K.som('fogo', fecha, 0.18, 1.2);
      for (let q = 0; q < 6; q++) K.som('clique', tEs + q * 0.3, 0.15);
    },
    queimou(B, tc) {
      // NA TELA: o Beto do lado do forno com a prancheta da receita: tudo ✓; em "queimou" a porta abre sozinha, fumaça preta, a panela preta lá dentro · MOSTRA: personagem, fumaca, forno
      const tBe = quando('Beto', B, 0.05), tCe = quando('certinho', B, 0.45), tQu = quando('queimou', B, 0.8);
      ve(forno, panela);
      panela.position.set(...DENTRO); panela.scale.setScalar(0.68); tampa(0, 0, tc);
      queimada(tc > tQu ? 1 : 0);
      // PERSONAGEM: lendo a prancheta, orgulhoso (sim com a cabeça) · em "queimou": susto, e depois chora
      menino.colocar(AO_FORNO, tc < tQu ? [0.4, 1.3, 5] : BOCA);
      if (tc < tCe) menino.reagir('mostrando', tc - tBe); else if (tc < tQu) menino.reagir('sim', tc - tCe); else menino.reagir(tc < tQu + 0.7 ? 'susto' : 'chorando', tc - tQu);
      // OBJETOS SE MEXENDO: a porta estoura aberta em "queimou" · a fumaça preta sai da boca do forno
      fornoEm(tc > tQu ? K.saiVolta(pc(tc, tQu, tQu + 0.3)) : 0, tc > tQu ? 0.3 : 0.8);
      // CÂMERA: (1) perto dele com a prancheta, de frente-esquerda · (2) em "queimou", aberta de frente, o forno soltando fumaça (treme)
      const cv = tQu - 0.05;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.3), mais(AO_FORNO, [0, 1.0, 0.3])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -18, altura: 'olho', tam: 1.4, obstaculos: false });
      else { const q = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-0.55, -0.7, q), 1.5, K.lerp(3.8, 3.4, q)], [-1.35, 0.95, -0.6]); K.tremer(tc - tQu, 0.5); }
      if (tc < tQu) { menino.g.updateMatrixWorld(true); const m = menino.mao(1); ve(lista); lista.position.set(m[0], m[1] + 0.1, m[2] + 0.05); lista.rotation.set(-0.3, menino.g.rotation.y, 0); }
      // EFEITOS VISUAIS: "Seguiu certinho" em "certinho" · "Queimou ✗" e a fumaça preta em "queimou"
      if (tc < tQu) fx.et.certinho.em({ tela: [540, 400] }, tc - tCe); else fx.et.queimou.em({ tela: [540, 400] }, tc - tQu);
      if (tc > tCe && tc < tQu) fx.simb.em(mais(cabecaDe(menino, 0.5), [0.4, 0, 0]), tc - tCe, { tipo: '✓', tam: 0.45 });
      if (tc > tQu) { fx.fumaca.em(mais(BOCA, [0, 0.15, -0.1]), tc - tQu, { altura: 2.0, escala: 0.45, vento: [0.12, 0.05], ritmo: 0.9, forca: 0.85 * K.clamp((tc - tQu) / 0.25) }); fx.poof.em(mais(BOCA, [0, 0.2, 0]), tc - tQu, { escala: 0.3, cor: 0x3a3330 }); }
      // SONS: certo no "certinho" · estrondo e vapor em "queimou"
      K.som('certo', tCe, 0.35); K.som('estrondo', tQu, 0.45); K.som('vapor', tQu + 0.1, 0.5);
    },
    investe(B, tc) {
      // NA TELA: o Beto de pé no quarto com o pastel; o pastel vira moeda e cai no teclado; a tela com os pinos · MOSTRA: personagem, pagamento, monitor
      const tTr = quando('trocou', B, 0.12), tIn = quando('investiu', B, 0.3), tPa = quando('pastel', B, 0.45), tSi = quando('sistema', B, 0.55), tSt = quando('site', B, 0.92);
      ve(comp, cad);
      // PERSONAGEM: com o pastel na mão · em "trocou": "sim" decidido · em "sistema": vira pro computador e digita
      menino.colocar(EM_PE, tc < tSi + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tTr) menino.reagir('segurando', tc - B.inicio); else if (tc < tSi) menino.reagir('sim', tc - tTr); else menino.reagir('digitando', tc);
      menino.humor(tc > tTr ? 'feliz' : 'normal');
      menino.g.updateMatrixWorld(true);
      const pPos = mais(menino.mao(1), [0.03, 0.1, 0.06]);
      // OBJETOS SE MEXENDO: o pastel cresce na mão em "pastel" · em "sistema" vira moeda que cai no teclado · os pinos brotam no mapa em "site"
      if (tc < tSi) { ve(pastel); pastel.position.set(...pPos); pastel.rotation.set(0, tc, 0.1); pastel.scale.setScalar(1.3 * Math.max(0.6, pop(tc - tPa + 0.35))); }
      if (tc > tSi) {
        fx.poof.em(pPos, tc - tSi, { escala: 0.35 });
        const q = K.clamp((tc - tSi) / 0.45); moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tSi + 0.45, 0.6);
      }
      const n = tc > tSt - 0.4 ? Math.min(6, 1 + Math.floor((tc - tSt + 0.4) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => (tc > tSi ? mapaPinos(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tSi) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tSt - 0.4 + k * 0.12, 0.2);
      // EFEITOS VISUAIS: "Investir" em "investiu"
      fx.et.investir.em(cabecaDe(menino, 0.65), tc - tIn);
      // CÂMERA: (1) perto dele com o pastel, de frente-direita · (2) em "sistema", subindo do monitor
      if (tc < tSi + 0.15) { const k = K.suave(pc(tc, B.inicio, tSi + 0.15)); K.mirar([K.lerp(0.75, 0.6, k), 1.6, K.lerp(3.2, 2.6, k)], [0.85, 1.2, -0.5]); }
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tSi + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
      // SONS: whoosh na troca · pingo da moeda · estalos dos pinos
      K.som('whoosh', tTr, 0.3);
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com; a lista dos pet shops de Belo Horizonte sobe; "35 sem site" · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.04), tDi = quando('digitou', B, 0.12), tL = quando('lista', B, 0.45), tPe = quando('pet', B, 0.55), tSi = quando('site', B, 0.93);
      ve(comp, cad, navG);
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      // OBJETOS SE MEXENDO: a barra cresce em "computador" e digita mappoa.com · em "lista", a tela da lista sobe do monitor e os pet shops entram um por um
      K.entrar(navG.g, 'cresce', tc - tPc + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tPe ? 1 + Math.floor((tc - tPe) / 0.22) : 0;
        telaC.mostrar('listaPets', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tPe + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5); K.som('festa', tSi, 0.35);
      }
      // PERSONAGEM: sentado digitando · em "lista": levanta surpreso e aponta a lista
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      // CÂMERA: (1) perto da barra e dele digitando, de frente-esquerda · (2) em "lista", afastando de frente
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
      // EFEITOS VISUAIS: "35 sem site" em "site"
      fx.et.bh.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tSi + 0.2);
    },
    mappoa(B, tc) {
      // NA TELA: no palco do Mappoa, a análise do Pet Feliz cai do alto; o robô acenando; o Beto de chef chamando · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analisePet', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5); K.som('brilho', tM, 0.6);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando, mostrando a tela · em "comprar": comemora
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      // EFEITOS VISUAIS: o rótulo "Mappoa" em "Mappoa" · "Quem tem chance" em "chance"
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      // CÂMERA: (1) baixa de frente, chegando · (2) em "mostra", passando de lado
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    ficha(B, tc) {
      // NA TELA: a ficha do Pet Feliz do lado do computador, o WhatsApp, a nota subindo até 89; em "mensagem", a mensagem pronta e o saleiro temperando · MOSTRA: tela, personagem
      const tAb = quando('Abriu', B, 0.08), tZa = quando('WhatsApp', B, 0.35), tNo = quando('nota', B, 0.5), tMs = quando('mensagem', B, 0.8), tTp = quando('temperada', B, 0.93);
      ve(comp, cad, telaC); comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      if (tc < tMs) telaC.mostrar('analisePet', { ate: tc > tNo + 0.4 ? 1 : 0, score: K.clamp((tc - tNo) / 0.7), zap: tc > tZa });
      else telaC.mostrar('msgPet', { d: K.clamp((tc - tMs) / 1.0) });
      // PERSONAGEM: aponta a ficha · em "temperada": sacode o saleiro em cima da tela, satisfeito
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q);
      if (tc < tTp) menino.apontar(0.55 + Math.sin(tc * 3) * 0.05); else { menino.reagir('erguendo', tc - tTp); menino.humor('feliz'); }
      K.som('clique', tAb, 0.4); K.som('ding', tZa, 0.35); for (let k = 0; k < 5; k++) K.som('bip', tNo + k * 0.12, 0.2); K.som('certo', tTp, 0.45);
      // CÂMERA: (1) perto da ficha · (2) no meio, dele com a tela
      const cv = (tNo + tMs) / 2;
      if (tc < cv) K.filmar([telaC, mais(TELA_Q, [0, 1.0, 0]), mais(TELA_Q, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.5 });
      else K.filmar([telaC, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.9 });
      // OBJETOS: o saleiro na mão dele em "temperada", sacudindo em cima da tela
      if (tc > tTp - 0.1) { menino.g.updateMatrixWorld(true); const m = menino.mao(1); ve(saleiro); saleiro.position.set(m[0], m[1] + 0.05 + Math.sin(tc * 18) * 0.05, m[2]); saleiro.rotation.set(0, 0, PI * 0.75); for (let k = 0; k < 3; k++) K.som('estalo', tTp + k * 0.15, 0.15); }
      // EFEITOS VISUAIS: "WhatsApp ✓" em "WhatsApp" · "Mensagem temperada 🧂" em "temperada"
      if (tc > tZa && tc < tMs) fx.et.zap.em({ tela: [540, 400] }, tc - tZa);
      if (tc > tTp) fx.et.temperada.em({ tela: [540, 400] }, tc - tTp);
    },
    pronto(B, tc) {
      // NA TELA: de volta ao programa: a porta do forno abre com luz dourada e sai a assadeira com o CONTRATO do Pet Feliz; o Beto ergue e comemora · MOSTRA: personagem, contrato, forno
      const tRe = quando('Resultado', B, 0.05), tPr = quando('primeiro', B, 0.3), tSa = quando('saindo', B, 0.6), tFo = quando('forno', B, 0.85);
      ve(forno);
      queimada(0);
      // OBJETOS SE MEXENDO: a porta abre em "Resultado", o forno brilha · em "primeiro" o contrato sai da boca do forno e sobe até a mão dele
      fornoEm(K.suave(pc(tc, tRe, tRe + 0.4)), 1);
      const k = K.suave(pc(tc, tPr, tSa + 0.2));
      // PERSONAGEM: espiando a porta · em "saindo": pega o contrato e ergue · em "forno": comemora (pulinhos)
      menino.colocar(AO_FORNO, tc < tFo ? BOCA : [0.2, 1.3, 5]);
      if (tc < tSa) menino.reagir('surpreso', tc - tRe); else if (tc < tFo) menino.reagir('erguendo', tc - tSa); else menino.reagir('comemorando', tc - tFo);
      menino.humor('feliz');
      menino.g.updateMatrixWorld(true);
      const m0 = menino.mao(0), m1 = menino.mao(1), alto = [(m0[0] + m1[0]) / 2, Math.max(m0[1], m1[1]) + 0.1, (m0[2] + m1[2]) / 2 + 0.1];
      ve(contrato); contrato.position.set(K.lerp(DENTRO[0], alto[0], k), K.lerp(DENTRO[1] + 0.25, alto[1], k), K.lerp(DENTRO[2], alto[2], k)); contrato.rotation.set(0, K.lerp(0, 0.5, k), 0);
      // CÂMERA: (1) baixa, de frente pro forno abrindo · (2) em "saindo", de baixo pra cima nele erguendo o contrato
      const cv = tSa - 0.05;
      if (tc < cv) { const q = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(-1.3, -1.45, q), 0.85, K.lerp(2.6, 2.2, q)], [-1.65, 0.55, -0.7]); }
      else { const q = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-0.05, -0.2, q), 0.9, K.lerp(4.2, 3.9, q)], [-1.0, 1.25, 0.0]); }
      // EFEITOS VISUAIS: vapor dourado da boca do forno · "1º cliente ✓" em "primeiro" · confete em "forno"
      fx.vapor.em(mais(BOCA, [0, 0.2, -0.15]), tc - tRe, { altura: 1.2, escala: 0.25, vento: [0.05, -0.1], ritmo: 0.7, forca: 0.6 });
      fx.et.cliente.em({ tela: [540, 400] }, tc - tPr);
      if (tc > tFo) fx.festa.em ? fx.festa.em(tc - tFo) : null;
      // SONS: porta rangendo · brilho no contrato · festa no "forno"
      K.som('range', tRe, 0.3); K.som('brilho', tPr, 0.5); K.som('festa', tFo, 0.55);
    },
    segue(B, tc) {
      // NA TELA: o Beto de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteBeto, 'beto');
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
      comp.tela.desenhar(siteBeto, 'beto');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende a "receita do fracasso": o Beto de chef atrás da bancada, a panela queimada soltando fumaça preta
      noPrograma([0.6, 1.4, 5]); menino.reagir('mao_na_testa', 0.6); menino.humor('triste');
      queimada(1); tampa(0.8, 0, 0);
      K.mirar([0.75, 1.65, 3.4], [0.6, 1.25, -1.0]);
      fx.fumaca.em(mais(PAN, [0, 0.4, 0]), 2.3, { altura: 1.8, escala: 0.4, vento: [0.15, -0.35], ritmo: 0.6, forca: 0.85 });
      conchaNaMao();
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    menino.g.visible = false; menino.g.rotation.x = 0;
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    aoVivo.visible = false;
    const cozinha = LUGAR[B.plano] === 'cozinha';
    ilhaG.visible = cozinha;
    panela.position.set(...PAN); panela.scale.setScalar(1); panela.rotation.set(0, 0, 0); queimada(0); tampa(0, 0, 0); fornoEm(0, 0);
    cad.position.set(...CAD_LADO); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // a cadeira gira junto com o Beto quando ele está sentado nela (senão o encosto tapa ele)
    if (menino.g.visible && Math.hypot(menino.g.position.x - SEAT[0], menino.g.position.z - SEAT[2]) < 0.05) cad.rotation.y = menino.g.rotation.y;
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
