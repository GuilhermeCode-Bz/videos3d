// O robô que faz site (canal Mappoa, feito na nuvem, 19/11/2026, molde de 45 s).
// Um robô gigante no meio do calçadão cospe sites prontos como uma impressora e o Ravi (o personagem do canal) fica
// pequenininho do lado, de braço cruzado, com medo da IA. Ele baixa o preço, refaz o portfólio e nada. A marmoraria da
// esquina não tem site, e robô nenhum bate lá: quem bate é outro web designer, que fecha. O Ravi descruza os braços,
// investe e digita mappoa.com: a lista das marmorarias de Feira de Santana sem site. No fim, o robô faz o site e o Ravi
// traz o cliente.
// Três lugares (K.cenarios): o calçadão entre prédios (o robô gigante e a Marmoraria São José), o quarto do Ravi e o
// palco do Mappoa. O robô, as folhas de site, a pilha, a placa da marmoraria e o mármore são feitos aqui. Cada plano
// começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dono, rival, robo, comp, cad, navG, telaC, telaM, cel, moeda, preco, folhaAg, FOV0;
  let RIA, RMINI, EG, EM; const marmG = []; // o robô gigante, o robozinho da mesa e os emissores de folhas de cada um
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira no SEAT quando ele senta, encostada do lado se não
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62], CAD_LADO = [-1.6, 0, -0.75];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const MINI = [0.12, 0.8, -1.38]; // o robozinho em cima da mesa, do lado do monitor
  // Rua entre prédios: a marmoraria na fachada da esquerda (a farmácia do cenário, com a placa nova) em z = MZ;
  // o robô gigante no meio do calçadão, 16 m pra dentro da rua (z = RZ), de frente pra +z (pra marmoraria)
  let MZ = 6.9, RZ = -9.1, PLACA_LOJA = [-5.95, 3.6, 6.9];
  const RAVI_G = () => [2.0, 0, RZ + 3.6];
  const DONO_P = () => [-4.7, 0, MZ + 0.15];
  const MARM_P = () => [-4.75, 0, MZ + 1.7];
  const RIVAL_FIM = () => [-3.65, 0, MZ + 0.2];
  const RAVI_M = () => [-2.85, 0, MZ + 0.5];
  const DONO_AG = () => [-3.9, 0, MZ + 0.2];

  const LUGAR = { gancho: 'rua', medo: 'quarto', tempo: 'quarto', marmoraria: 'rua', rival: 'rua', lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'rua', segue: 'quarto', cartao: 'quarto', capa: 'rua' };

  const MARMS = [
    { nome: 'Marmoraria São José', end: 'Av. Maria Quitéria, 945', chips: ['whats', 'tel'] },
    { nome: 'Mármores Princesa', end: 'Av. Getúlio Vargas, 1820', chips: ['tel', 'insta'] },
    { nome: 'Granitos Kalilândia', end: 'Rua Sales Barbosa, 310', chips: ['whats'] },
    { nome: 'Pedra Nobre Marmoraria', end: 'Av. João Durval, 2140', chips: ['whats', 'insta'] }
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
  function canvasTex(w, h, desenho) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    desenho(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  }
  function folha(l, a, px, desenho) {
    const t = canvasTex(px, Math.round((px * a) / l), desenho);
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  // a notícia no monitor: "IA faz site em 10 segundos"
  function noticiaIA(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.2, 0, '#e8352b'); txt(c, 'URGENTE', w * 0.06, h * 0.1, w * 0.07, '#fff', 900);
    txt(c, 'IA faz site', w * 0.06, h * 0.36, w * 0.1, '#111', 900, 'left', w * 0.9);
    txt(c, 'em 10 segundos', w * 0.06, h * 0.52, w * 0.1, '#111', 900, 'left', w * 0.9);
    txt(c, '"Web designer vai acabar?"', w * 0.06, h * 0.72, w * 0.055, '#4a4f58', 800, 'left', w * 0.9);
  }
  function siteRavi(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Ravi Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'portfólio novo ✨', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // o celular: nenhuma mensagem
  function zeroMsg(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.12);
    txt(c, 'Conversas', w * 0.08, h * 0.065, w * 0.08, '#fff', 800);
    txt(c, '0', w / 2, h * 0.42, w * 0.42, '#e8352b', 900, 'center');
    txt(c, 'mensagens', w / 2, h * 0.62, w * 0.1, '#4a4f58', 900, 'center');
    txt(c, 'novas', w / 2, h * 0.71, w * 0.1, '#4a4f58', 900, 'center');
  }
  // a etiqueta de preço: R$ 1.500 riscado e R$ 400 embaixo
  function etiquetaPreco(c, w, h, e) {
    rr(c, 0, 0, w, h, 26, '#f5c518');
    c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w * 0.08, h * 0.5, h * 0.08, 0, 7); c.fill();
    txt(c, 'R$ 1.500', w * 0.56, h * (e.novo ? 0.32 : 0.5), h * (e.novo ? 0.3 : 0.42), '#1e1f22', 900, 'center', w * 0.74);
    if (e.risco > 0) {
      c.strokeStyle = '#e8352b'; c.lineWidth = h * 0.07; c.lineCap = 'round';
      const y = h * (e.novo ? 0.32 : 0.5);
      c.beginPath(); c.moveTo(w * 0.2, y + h * 0.06); c.lineTo(w * (0.2 + 0.72 * e.risco), y - h * 0.06); c.stroke();
    }
    if (e.novo) txt(c, 'R$ 400', w * 0.56, h * 0.72, h * 0.34, '#e8352b', 900, 'center', w * 0.74);
  }
  // cada folha de site que o robô cospe (4 desenhos)
  const SITES = [['Padaria Sol', '#f39a1e'], ['Pet Amigo', '#2fb5a6'], ['Studio Fit', '#c0267a'], ['Ótica Luz', '#2f6fd6']];
  function desenhoSite(i) {
    return (c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#1e1f22'; c.lineWidth = 6; c.strokeRect(3, 3, w - 6, h - 6);
      c.fillStyle = SITES[i][1]; c.fillRect(6, 6, w - 12, h * 0.3);
      txt(c, SITES[i][0], w * 0.07, h * 0.18, h * 0.13, '#fff', 900, 'left', w * 0.86);
      [0, 1, 2].forEach((k) => rr(c, w * (0.07 + k * 0.3), h * 0.42, w * 0.26, h * 0.26, 8, '#e9edf3'));
      rr(c, w * 0.5, h * 0.76, w * 0.43, h * 0.16, 18, '#22a35a'); txt(c, 'Pronto ✓', w * 0.715, h * 0.84, h * 0.1, '#fff', 900, 'center');
    };
  }
  let MAT_SITES = [];

  // ---------- Peças feitas aqui ----------
  // O robô gigante que faz site: pernas, tronco com a fenda de impressora e "IA" no peito, cabeça com olhos azuis e a
  // antena. ~7 m de altura, de frente pra +z. r.fenda = o ponto (local) de onde saem as folhas
  function fazRoboIA() {
    const g = new THREE.Group();
    const cinza = K.mat(0xcfd6df, { roughness: 0.45, metalness: 0.15 }), escuro = K.mat(0x23324a, { roughness: 0.55 }), azul = K.mat(0x2f6fd6, { roughness: 0.4 });
    [-0.75, 0.75].forEach((x) => {
      const p = K.malha(new THREE.BoxGeometry(0.8, 2.2, 0.9), escuro); p.position.set(x, 1.1, 0); g.add(p);
      const pe = K.malha(new THREE.BoxGeometry(1.05, 0.35, 1.35), azul); pe.position.set(x, 0.18, 0.15); g.add(pe);
    });
    const tronco = K.malha(new THREE.BoxGeometry(3.0, 2.6, 1.8), cinza); tronco.position.y = 3.5; g.add(tronco);
    const fenda = K.malha(new THREE.BoxGeometry(1.8, 0.24, 0.1), new THREE.MeshBasicMaterial({ color: 0x0b1220 })); fenda.position.set(0, 3.15, 0.91); g.add(fenda);
    const labio = K.malha(new THREE.BoxGeometry(2.0, 0.09, 0.4), azul); labio.position.set(0, 2.99, 1.05); g.add(labio);
    const ia = folha(1.1, 0.6, 256, (c, w, h) => { rr(c, 0, 0, w, h, 34, '#2f6fd6'); txt(c, 'IA', w / 2, h / 2 + 6, h * 0.72, '#fff', 900, 'center'); });
    ia.position.set(0, 4.2, 0.911); g.add(ia);
    const luzes = [];
    [-1.1, 1.1].forEach((x) => { const l = new THREE.Mesh(new THREE.CircleGeometry(0.12, 18), new THREE.MeshBasicMaterial({ color: 0x22a35a })); l.position.set(x, 4.3, 0.912); g.add(l); luzes.push(l); });
    const pesc = K.malha(new THREE.BoxGeometry(0.7, 0.3, 0.7), escuro); pesc.position.y = 4.95; g.add(pesc);
    const cab = K.malha(new THREE.BoxGeometry(2.0, 1.35, 1.5), cinza); cab.position.y = 5.75; g.add(cab);
    const visor = K.malha(new THREE.BoxGeometry(1.7, 0.6, 0.06), escuro); visor.position.set(0, 5.85, 0.76); g.add(visor);
    const olhoM = new THREE.MeshBasicMaterial({ color: 0x6ff3ff });
    const olhos = [-0.45, 0.45].map((x) => { const o = new THREE.Mesh(new THREE.CircleGeometry(0.2, 22), olhoM); o.position.set(x, 5.86, 0.8); g.add(o); return o; });
    const boca = K.malha(new THREE.BoxGeometry(0.9, 0.12, 0.06), escuro); boca.position.set(0, 5.32, 0.76); g.add(boca);
    const ant = K.malha(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 10), escuro); ant.position.y = 6.75; g.add(ant);
    const bola = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), new THREE.MeshBasicMaterial({ color: 0xe8352b })); bola.position.y = 7.15; g.add(bola);
    const bracos = [-1, 1].map((l) => {
      const om = new THREE.Group(); om.position.set(l * 1.8, 4.55, 0); g.add(om);
      const b = K.malha(new THREE.BoxGeometry(0.6, 2.2, 0.65), cinza); b.position.y = -1.0; om.add(b);
      const mao = K.malha(new THREE.BoxGeometry(0.75, 0.5, 0.75), azul); mao.position.y = -2.25; om.add(mao);
      return om;
    });
    return { g, fenda: [0, 3.15, 1.08], olhos, bola, bracos, luzes };
  }
  // o robô vivo: pisca os olhos, a antena acende e apaga, o braço sobe e desce como alavanca de impressora
  function roboVivo(R, tc, forca = 1) {
    const pis = (tc % 2.6) < 0.12 ? 0.12 : 1;
    R.olhos.forEach((o) => { o.scale.y = pis; });
    R.bola.material.color.setHex(Math.floor(tc * 3) % 2 ? 0xe8352b : 0xff9a8a);
    R.luzes.forEach((l, i) => l.material.color.setHex(Math.floor(tc * 6 + i) % 2 ? 0x22a35a : 0xb8f5cf));
    R.bracos[1].rotation.x = -0.25 - Math.abs(Math.sin(tc * PI / 0.28)) * 0.35 * forca;
    R.bracos[0].rotation.x = -0.1;
    R.g.position.y = (R.y0 || 0) + Math.abs(Math.sin(tc * PI / 0.28)) * 0.04 * forca * R.g.scale.x;
  }
  // As folhas que o robô cospe e a pilha na frente dele. esc = tamanho da folha; pilhaRel = onde fica a pilha (no robô)
  function fazEmissor(R, n, esc, pilhaRel, nome) {
    const folhas = [];
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1.1 * esc, 0.8 * esc), MAT_SITES[i % 4]);
      m.visible = false; K.scene.add(m); folhas.push(m);
      if (nome) K.nomear(nome, m);
    }
    const pilha = new THREE.Group(); const camadas = [];
    const cores = [0xf4f6fa, 0xe3eeff, 0xfff1d6, 0xdff5ef];
    for (let i = 0; i < 44; i++) {
      const c = K.malha(new THREE.BoxGeometry(1.1 * esc, 0.035 * esc, 0.8 * esc), K.mat(cores[i % 4], { roughness: 0.85 }));
      c.position.set(Math.sin(i * 7.3) * 0.07 * esc, (i + 0.5) * 0.035 * esc, Math.cos(i * 5.1) * 0.07 * esc); c.rotation.y = Math.sin(i * 12.9) * 0.35;
      pilha.add(c); camadas.push(c);
    }
    const topo = new THREE.Mesh(new THREE.PlaneGeometry(1.1 * esc, 0.8 * esc), MAT_SITES[2]); topo.rotation.x = -PI / 2; pilha.add(topo);
    pilha.visible = false; K.scene.add(pilha);
    if (nome) K.nomear('pilha', pilha);
    return { R, folhas, pilha, camadas, topo, esc, pilhaRel };
  }
  // Uma folha sai da fenda a cada dt s desde t0; voa num arco em voo s e cai deitada na pilha, que vai crescendo
  // (base = quantas folhas a pilha já tinha). Devolve quantas já saíram
  function emite(E, tc, t0, dt, op = {}) {
    const { voo = 0.85, arco = 1.6, base = 6, max = 44 } = op;
    const R = E.R; R.g.updateMatrixWorld(true);
    const S = R.g.localToWorld(V(...R.fenda));
    const P0 = R.g.localToWorld(V(...E.pilhaRel));
    const sk = R.g.scale.x;
    const kNow = Math.floor((tc - t0) / dt);
    const caidas = Math.max(0, Math.floor((tc - t0 - voo) / dt) + 1);
    const nP = Math.min(max, base + caidas);
    ve(E.pilha); E.pilha.position.copy(P0); E.pilha.rotation.y = R.g.rotation.y;
    E.camadas.forEach((c, i) => { c.visible = i < nP; });
    const h = nP * 0.035 * E.esc;
    E.topo.visible = nP > 0; E.topo.position.y = h + 0.003;
    E.folhas.forEach((m) => { m.visible = false; });
    for (let m = 0; m < E.folhas.length; m++) {
      const k = kNow - m;
      if (k < 0) continue;
      const age = tc - (t0 + k * dt);
      if (age < 0 || age > voo) continue;
      const f = E.folhas[k % E.folhas.length], q = age / voo;
      const L = P0.clone().add(V(Math.sin(k * 3.7) * 0.12 * E.esc, h + 0.02, Math.cos(k * 2.3) * 0.12 * E.esc));
      f.visible = true;
      f.material = MAT_SITES[k % 4];
      f.position.set(K.lerp(S.x, L.x, q), K.lerp(S.y, L.y, q) + Math.sin(q * PI) * arco * sk + (1 - q) * 0.0, K.lerp(S.z, L.z, q));
      f.rotation.set(K.lerp(0.2, -PI / 2, K.suave(q)), R.g.rotation.y + (1 - q) * Math.sin(k) * 1.2, (1 - q) * age * 4);
    }
    return kNow + 1;
  }
  // sons da impressora: um clique por folha e um bip a cada duas, só dentro do trecho [de, ate)
  function sonsImpressora(t0, dt, de, ate, vol = 0.22) {
    for (let k = Math.max(0, Math.ceil((de - t0) / dt)); t0 + k * dt < ate; k++) {
      K.som('clique', t0 + k * dt, vol);
      if (k % 2 === 0) K.som('bip', t0 + k * dt + 0.05, vol * 0.8);
    }
  }
  // placa de loja num poste, de frente pra +z (placa colada na fachada some de quina: lição do aspirador-de-cliente)
  function placaPoste(texto, fundo, corTxt) {
    const g = new THREE.Group();
    const poste = K.malha(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 10), K.mat(0x3a3f46)); poste.position.y = 1.3; g.add(poste);
    const p = folha(1.7, 0.6, 512, (c, w, h) => { rr(c, 0, 0, w, h, 26, fundo); c.strokeStyle = '#ffffff'; c.lineWidth = 10; c.beginPath(); c.roundRect(10, 10, w - 20, h - 20, 20); c.stroke(); txt(c, texto, w / 2, h / 2 + 4, h * 0.36, corTxt || '#fff', 900, 'center', w - 50); });
    p.position.y = 2.85; g.add(p);
    return g;
  }
  // chapa de mármore branca com veios cinza
  const texMarmore = () => canvasTex(256, 192, (c, w, h) => {
    c.fillStyle = '#f3f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(120,120,130,0.55)'; c.lineWidth = 3;
    for (let i = 0; i < 7; i++) { c.beginPath(); let x = Math.random() * w, y = 0; c.moveTo(x, y); while (y < h) { x += (Math.random() - 0.5) * 40; y += 18; c.lineTo(x, y); } c.stroke(); }
  });
  function fazMarmore() {
    const g = new THREE.Group();
    const mt = K.mat(0xffffff, { map: texMarmore(), roughness: 0.25 });
    const pes = K.mat(0x6b5a45, { roughness: 0.9 });
    // o cavalete em A e duas chapas em pé encostadas nele (de frente pra +x, pra rua)
    const base = K.malha(new THREE.BoxGeometry(0.5, 0.1, 2.0), pes); base.position.y = 0.05; g.add(base);
    const ca = K.malha(new THREE.BoxGeometry(0.08, 1.2, 1.9), pes); ca.position.set(-0.05, 0.65, 0); g.add(ca);
    [0, 1].forEach((i) => { const ch = K.malha(new THREE.BoxGeometry(0.04, 1.1, 1.6), mt); ch.position.set(0.06 + i * 0.07, 0.68, (i - 0.5) * 0.12); ch.rotation.z = -0.12; g.add(ch); });
    // a bancada com uma chapa deitada e a flanela
    const banc = K.malha(new THREE.BoxGeometry(1.0, 0.8, 0.6), pes); banc.position.set(0.3, 0.4, -2.4); g.add(banc);
    const tampo = K.malha(new THREE.BoxGeometry(1.1, 0.05, 0.7), mt); tampo.position.set(0.3, 0.83, -2.4); g.add(tampo);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);
    MAT_SITES = [0, 1, 2, 3].map((i) => new THREE.MeshBasicMaterial({ map: canvasTex(256, 186, desenhoSite(i)), side: THREE.DoubleSide }));

    // A marmoraria: a farmácia da esquerda do calçadão, com a placa nova por cima
    const Cr = CS.todos.rua;
    const loja = (Cr.lojas || []).find((l) => l.id === 'farmacia' && l.lado < 0) || (Cr.lojas || []).find((l) => l.lado < 0);
    if (loja) {
      MZ = loja.porta[2]; PLACA_LOJA = loja.placa;
      loja.g.updateMatrixWorld(true);
      loja.g.traverse((o) => { if (!o.isMesh) return; const p = o.getWorldPosition(V(0, 0, 0)); if (p.y > 4.3 && p.y < 5.1 && p.x > -6.5 && p.x < -4.2) o.visible = false; });
    }
    MZ = PLACA_LOJA[2]; // a cena da marmoraria fica no meio da fachada, embaixo da placa
    RZ = MZ - 16;
    // as árvores, bancos e floreiras desse trecho do calçadão somem (a câmera anda livre)
    if (Cr && Cr.grupo) Cr.grupo.children.forEach((o) => { const p = o.position; if (Math.abs(p.x) > 1.5 && Math.abs(p.x) < 5.5 && p.z > RZ - 10 && p.z < MZ + 14) o.visible = false; });

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaMarm = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: MARMS, n: e.n, sel: e.sel, total: 47, comSite: 26, semSite: 21 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Marmorarias · Feira de Santana, BA', 36, 168, 20, M.marinho, 700, 'left', w - 72);
    };
    T.analiseMarm = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Marmoraria São José', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site: orçamento só indo na loja', 'Não aparece pra quem procura bancada de granito'], oportunidades: ['Site com as pedras, fotos das obras e orçamento pelo WhatsApp'],
        objecoes: ['"Meus clientes vêm por indicação"'], abordagem: 'Mostre quem procura bancada de mármore em Feira e não acha a loja dele.'
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

    // Personagens: o Ravi (do canal), o Seu Zé (dono da marmoraria, com avental de lona), o rival e o robô do Mappoa
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dono = K.personagem('dono', { cores: { terno: 0x6b7078 } }); K.semNome(dono.g); K.nomear('dono', dono.g);
    const avental = K.malha(new THREE.BoxGeometry(0.36, 0.55, 0.02), K.mat(0x8a6a44, { roughness: 0.95 }));
    avental.position.set(0, 0.6, 0.26); dono.corpo.add(avental);
    rival = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf39a1e, bermuda: 0x3a3f46, tenis: 0x222222, cabelo: 0x1d140c, pele: 0xb57b52 } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O robô gigante (rua) e o robozinho (mesa do quarto), cada um com as suas folhas e a sua pilha
    RIA = fazRoboIA(); guarda(RIA.g, 'robo_ia', [0, 0, RZ]);
    EG = fazEmissor(RIA, 8, 1, [-1.35, 0, 2.9], 'sites');
    RMINI = fazRoboIA(); guarda(RMINI.g, 'robozinho', MINI, 0.075);
    EM = fazEmissor(RMINI, 5, 0.11, [-3.2, 0, 4], null);
    RIA.y0 = 0; RMINI.y0 = MINI[1];
    SITES.push(['Marmoraria São José', '#1f4d3a']);
    folhaAg = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.8), new THREE.MeshBasicMaterial({ map: canvasTex(256, 186, desenhoSite(4)), side: THREE.DoubleSide })); guarda(folhaAg, 'sites');

    // A marmoraria: a placa grande por cima da placa da loja, a placa no poste e o mármore
    const placa = folha(3.6, 1.0, 1024, (c, w, h) => { rr(c, 0, 0, w, h, 30, '#1f4d3a'); c.strokeStyle = '#e8e2d0'; c.lineWidth = 12; c.beginPath(); c.roundRect(14, 14, w - 28, h - 28, 22); c.stroke(); txt(c, 'MARMORARIA SÃO JOSÉ', w / 2, h * 0.42, h * 0.3, '#ffffff', 900, 'center', w - 80); txt(c, 'mármore · granito · pias', w / 2, h * 0.76, h * 0.15, '#e8e2d0', 700, 'center', w - 80); });
    placa.rotation.y = PI / 2; marmG.push(placa); guarda(placa, 'marmoraria', [PLACA_LOJA[0] + 0.18, PLACA_LOJA[1], PLACA_LOJA[2]]);
    marmG.push(guarda(placaPoste('MARMORARIA', '#1f4d3a'), 'marmoraria', [-3.3, 0, MZ - 2.6]));
    marmG.push(guarda(fazMarmore(), 'marmore', MARM_P()));

    // Quarto: o computador, a cadeira, a barra do endereço, as telas do Mappoa, o celular, a etiqueta e a moeda
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, CAD_LADO);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    cel = K.celular(); guarda(cel, 'celular', null, 1.8);
    preco = folha(0.5, 0.3, 400, (c, w, h) => etiquetaPreco(c, w, h, { risco: 0 })); guarda(preco, 'preco');
    preco.userData.desenhos = [0, 0.25, 0.5, 0.75, 1].map((r) => canvasTex(400, 240, (c, w, h) => etiquetaPreco(c, w, h, { risco: r, novo: r >= 1 })));
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, 'moeda');

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.fala = K.balaoFala();
    fx.cont = K.contador();
    fx.poof = K.poof();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      seg: e('10 segundos', 'laranja'), zero: e('0 clientes', 'vermelho'), web: e('Web designer', 'azul'), medo: e('Medo da IA', 'laranja'),
      preco: e('Preço lá embaixo', 'laranja'), semSite: e('Sem site', 'vermelho'), outro: e('Outro web designer', 'laranja'), fechou: e('Fechou com outro', 'vermelho'),
      investir: e('Investir', 'azul'), feira: e('Feira de Santana', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      antes: e('Medo', 'vermelho'), traz: e('Você traz o cliente', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // braço cruzado (k de 0 a 1: 0 = solto, 1 = cruzado)
  function cruza(b, k = 1) {
    b.pose({ x: -0.45 * k, z: 0.12 - 0.08 * k, c: -1.7 * k }, { x: -0.6 * k, z: 0.12 - 0.08 * k, c: -1.6 * k });
    b.bracos.forEach((br) => { br.ombro.rotation.y = -br.lado * 1.2 * k; });
  }
  // estende a mão direita pra frente (aperto de mão)
  const aperto = (b, k = 1) => b.pose({}, { x: -1.2 * k, z: 0.12 - 0.05 * k, c: -0.25 * k });
  // algo na mão do Ravi, do lado da cabeça, virado pra câmera (chamar DEPOIS da câmera)
  function naMao(obj, esc, dy = 0.12) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    ve(g); menino.g.updateMatrixWorld(true);
    const m = menino.mao(1); g.position.set(m[0], m[1] + dy, m[2]); g.scale.setScalar(esc);
    g.lookAt(K.camera.position);
  }
  // algo do lado da cabeça do Ravi, puxado pro meio da tela e virado pra câmera (chamar DEPOIS da câmera)
  function aoLado(obj, esc, dx, dy) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    ve(g); const c = V(...cabecaDe(menino, 0));
    const dir = V(1, 0, 0).applyQuaternion(K.camera.quaternion);
    g.position.copy(c).addScaledVector(dir, dx).add(V(0, dy, 0)); g.scale.setScalar(esc);
    g.lookAt(K.camera.position);
  }
  // o Ravi tremendo de medo (balança o corpo de leve)
  const treme = (b, tc, f = 1) => { b.g.position.x += Math.sin(tc * 55) * 0.012 * f; };

  const P = {
    gancho(B, tc) {
      // NA TELA: o robô gigante no meio do calçadão, a fenda do peito cuspindo um site a cada 0,28 s; a pilha subindo; o Ravi pequeno do lado direito, de braço cruzado · MOSTRA: robo_ia, sites, personagem
      // CENÁRIO: a rua entre prédios de dia, gente andando lá no fundo (o cenário cuida)
      const tSe = quando('segundos', B, 0.35), tVc = quando('você', B, 0.55), tCl = quando('cliente', B, 0.92);
      // ENTRA AGORA e OBJETOS SE MEXENDO: as folhas já saindo no 1º quadro; os olhos piscam; o braço sobe e desce
      ve(RIA.g); roboVivo(RIA, tc);
      const t0 = B.inicio - 1.4;
      emite(EG, tc, t0, 0.28, { base: 8 });
      sonsImpressora(t0, 0.28, B.inicio, B.ate + 0.05);
      // PERSONAGEM: de braço cruzado, cara fechada · em "você": olha pra câmera, triste
      menino.colocar(RAVI_G(), [3.4, 1.5, RZ + 9]);
      menino.parado(); cruza(menino, 1); menino.humor(tc < tVc ? 'bravo' : 'triste');
      // SONS: estrondo + zumbido no 1º quadro · whoosh em cada corte · errado em "cliente"
      K.som('estrondo', B.inicio + 0.03, 0.35); K.som('zumbido', B.inicio, 0.45);
      K.som('errado', tCl, 0.5);
      // CÂMERA: 4 cortes de ~0,9 s: (1) de baixo, a fenda cuspindo folha; (2) a pilha, rente ao chão; (3) o rosto do Ravi; (4) aberto, de frente, topo livre
      const c1 = B.inicio + 0.85, c2 = B.inicio + 1.7, c3 = B.inicio + 2.55;
      [c1, c2, c3].forEach((c) => K.som('whoosh', c, 0.35));
      if (tc < c1) { const k = K.suave(pc(tc, B.inicio, c1)); K.mirar([0.7, 1.3, RZ + K.lerp(6.2, 5.4, k)], [0, 3.4, RZ + 1]); }
      else if (tc < c2) { const k = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(-3.9, -3.5, k), 0.75, RZ + 6.0], [-1.25, 0.55, RZ + 2.9]); }
      else if (tc < c3) { const k = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(3.2, 3.0, k), 1.55, RZ + K.lerp(7.0, 6.6, k)], [2.0, 1.15, RZ + 3.6]); }
      else { const k = K.suave(pc(tc, c3, B.ate)); K.mirar([1.4, 2.4, RZ + K.lerp(14.5, 15.5, k)], [0.5, 3.6, RZ + 1]); }
      // EFEITOS VISUAIS: "10 segundos" em "segundos" · "0 clientes" em "cliente"
      if (tc < tCl) fx.et.seg.em({ tela: [540, 600] }, tc - tSe); else fx.et.zero.em({ tela: [540, 600] }, tc - tCl);
    },
    medo(B, tc) {
      // NA TELA: o quarto; o Ravi de pé do lado da mesa, de braço cruzado; o robozinho na mesa cuspindo sitezinhos; o monitor com "IA faz site em 10 segundos" · MOSTRA: personagem, monitor, robozinho
      // CENÁRIO: o quarto de dia, a janela clara
      const tWe = quando('designer', B, 0.2), tCr = quando('cruzado', B, 0.6), tMe = quando('medo', B, 0.8);
      ve(comp, cad, RMINI.g); roboVivo(RMINI, tc, 0.5);
      // OBJETOS SE MEXENDO: os sitezinhos saindo do robozinho e caindo na mesa
      emite(EM, tc, B.inicio - 0.6, 0.35, { arco: 4, base: 4, voo: 0.6 });
      comp.tela.desenhar(noticiaIA, 'noticia');
      // PERSONAGEM: braço cruzado batendo o pé · em "medo": treme, cara de assustado
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.parado(); cruza(menino, 1);
      menino.pernasEm(0, tc < tMe ? Math.max(0, Math.sin(tc * 10)) * -0.25 : 0);
      menino.humor(tc < tMe ? 'bravo' : 'assustado');
      if (tc > tMe) treme(menino, tc);
      // CÂMERA: (1) chegando, médio, de frente-direita · (2) em "medo": perto, da esquerda, o robozinho e o rosto
      const cv = Math.max(B.inicio + 1.2, tMe - 0.25);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(1.1, 0.85, k), 1.55, K.lerp(3.4, 2.8, k)], [0.3, 1.1, -0.7]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-0.75, -0.6, k), 1.55, K.lerp(2.5, 2.25, k)], [0.4, 1.15, -0.75]); }
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Medo da IA" e "!" em "medo"
      if (tc < tMe) fx.et.web.em({ tela: [540, 400] }, tc - tWe); else fx.et.medo.em({ tela: [540, 400] }, tc - tMe);
      if (tc > tMe) fx.simb.em(cabecaDe(menino, 0.42), tc - tMe, { tipo: '!', tam: 0.4 });
      // SONS: cliques dos sitezinhos · whoosh no corte · zumbido baixo no medo
      sonsImpressora(B.inicio - 0.6, 0.35, B.inicio, B.ate, 0.15);
      K.som('whoosh', cv, 0.35); K.som('zumbido', tMe, 0.3); K.som('etiqueta', tWe, 0.4); void tCr;
    },
    tempo(B, tc) {
      // NA TELA: (1) a etiqueta "R$ 1.500" na mão, riscada, vira "R$ 400"; (2) sentado digitando, o portfólio novo; (3) de pé com o celular "0 mensagens" e o contador "Dia 30" · MOSTRA: personagem, preco, celular
      const tPr = quando('preço', B, 0.15), tRe = quando('refez', B, 0.3), tTr = quando('Trinta', B, 0.55), tNe = quando('nenhuma', B, 0.82);
      ve(comp, cad);
      const c1 = Math.max(B.inicio + 0.6, tRe - 0.05), c2 = Math.max(c1 + 0.6, tTr - 0.05);
      if (tc < c1) {
        // PERSONAGEM: mostra a etiqueta pra câmera
        comp.tela.desenhar(noticiaIA, 'noticia');
        menino.colocar(EM_PE, [0.9, 1.4, 5]); menino.humor('triste'); menino.reagir('mostrando', tc - B.inicio);
        menino.pose({}, { x: -0.3, z: 1.35, c: -1.6 });
        // CÂMERA: (1) perto, a etiqueta e o rosto
        K.mirar([1.45, 1.6, 2.6], [1.12, 1.38, -0.45]);
        const r = K.clamp((tc - tPr) / 0.35);
        const i = Math.min(4, Math.floor(r * 4.999));
        preco.material.map = preco.userData.desenhos[i]; preco.material.needsUpdate = true;
        aoLado(preco, 0.8, 0.42, 0.22);
        // EFEITOS VISUAIS: "Preço lá embaixo" · SONS: errado no risco
        fx.et.preco.em({ tela: [540, 400] }, tc - tPr - 0.2);
        K.som('errado', tPr + 0.1, 0.4);
      } else if (tc < c2) {
        // PERSONAGEM: sentado, digitando rápido · o monitor com o portfólio novo
        comp.tela.desenhar(siteRavi, 'ravi');
        sentado(MONITOR); menino.reagir('digitando', tc);
        for (let k = 0; k < 8; k++) K.som('clique', c1 + k * 0.08, 0.25);
        K.som('brilho', c1 + 0.2, 0.35);
        // CÂMERA: (2) chegando, perto, da esquerda: o monitor e ele
        { const k = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(1.5, 1.3, k), 1.65, K.lerp(0.8, 0.55, k)], [-0.35, 1.1, -0.85]); }
      } else {
        // PERSONAGEM: de pé com o celular · em "nenhuma": ombros caídos, triste
        comp.tela.desenhar(siteRavi, 'ravi');
        menino.colocar(EM_PE, [0.9, 1.4, 5]);
        if (tc < tNe) menino.reagir('celular', tc - c2); else menino.reagir('triste', tc - tNe);
        // CÂMERA: (3) médio, de frente
        { const k = K.suave(pc(tc, c2, B.ate)); K.mirar([K.lerp(0.95, 0.75, k), 1.6, K.lerp(3.3, 3.0, k)], [0.6, 1.35, -0.45]); }
        cel.tela.desenhar(zeroMsg, 'zero');
        aoLado(cel, 1.6, 0.44, -0.05);
        // EFEITOS VISUAIS: o contador "Dia 1 → 30" · ✗ em "nenhuma"
        fx.cont.em([0.62, 2.15, -0.3], tc - tTr, { de: 1, ate: 30, dur: Math.max(0.5, tNe - tTr), antes: 'Dia ', depois: '', cor: '#e8352b', tam: 0.55 });
        if (tc > tNe) fx.simb.em(mais(cabecaDe(menino, 0.35), [0.45, 0, 0]), tc - tNe, { tipo: '✗', tam: 0.45 });
        K.som('errado', tNe + 0.1, 0.45);
      }
      K.som('whoosh', c1, 0.3); K.som('whoosh', c2, 0.3);
    },
    marmoraria(B, tc) {
      // NA TELA: a calçada da esquerda; a Marmoraria São José com a placa; o mármore; o Seu Zé lustrando a chapa, o balão "Orçamento? Só vindo aqui!"; lá no fundo, o robô gigante cuspindo sites · MOSTRA: marmoraria, dono, marmore
      // CENÁRIO: a rua de dia, gente andando
      const tMa = quando('marmoraria', B, 0.12), tSi = quando('site', B, 0.45), tRo = quando('robô', B, 0.58), tNe = quando('nenhum', B, 0.65);
      ve(RIA.g, ...marmG); roboVivo(RIA, tc);
      emite(EG, tc, B.inicio - 3, 0.28, { base: 30 });
      // PERSONAGEM: o Seu Zé passa a flanela na chapa · em "site": vira pra câmera e encolhe os ombros
      const DP = DONO_P();
      if (tc < tSi) { dono.colocar(DP, mais(MARM_P(), [0.3, 0.8, -2.4])); dono.reagir('segurando', tc - B.inicio); dono.pose({}, { x: -1.1 + Math.sin(tc * 8) * 0.25, z: 0.2, c: -0.5 }); }
      else { dono.colocar(DP, [2.6, 1.4, MZ + 4.5]); dono.reagir('ombros', tc - tSi); }
      dono.humor(tc < tSi ? 'normal' : 'triste');
      // CÂMERA: (1) chegando de frente pra loja, médio · (2) em "robô": de longe, o robô no fundo da rua
      const cv = Math.max(B.inicio + 1.0, tRo - 0.15);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(4.8, 4.2, k), 2.2, PLACA_LOJA[2] + K.lerp(4.0, 3.4, k)], [-4.6, 1.95, PLACA_LOJA[2] + 0.4]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-1.7, -1.3, k), 1.6, MZ + K.lerp(4.2, 5.0, k)], [-0.6, 3.4, RZ]); }
      // EFEITOS VISUAIS: o balão em "site" · "Sem site" em "site" · ✗ no robô em "nenhum"
      if (tc < cv) fx.fala.em(cabecaDe(dono, 0.05), tc - tSi + 0.25, { texto: 'Orçamento? Só vindo aqui!', lado: 1 });
      fx.et.semSite.em({ tela: [540, 400] }, tc - tSi);
      if (tc > tNe) fx.simb.em([0, 8.2, RZ + 1], tc - tNe, { tipo: '✗', tam: 2.2 });
      // SONS: etiqueta em "site" · errado em "nenhum" · whoosh no corte · a impressora lá longe
      K.som('etiqueta', tSi, 0.45); K.som('errado', tNe, 0.5); K.som('whoosh', cv, 0.35); K.som('ding', tMa, 0.25);
      sonsImpressora(B.inicio - 3, 0.28, cv, B.ate, 0.1);
    },
    rival(B, tc) {
      // NA TELA: o outro web designer chega andando pela calçada, bate no vidro, aperta a mão do Seu Zé · MOSTRA: rival, dono, marmoraria
      const tBa = quando('bateu', B, 0.12), tOu = quando('outro', B, 0.4), tFe = quando('fechou', B, 0.85);
      // OBJETOS SE MEXENDO: o rival anda até a loja
      ve(...marmG);
      const DE = [-3.0, 0, MZ + 7.5], ATE = RIVAL_FIM(), DP = DONO_P();
      const chega = Math.max(B.inicio + 0.8, tFe - 0.55);
      if (tc < chega) rival.irPara(DE, ATE, pc(tc, B.inicio - 0.6, chega), tc, { olhar: cabecaDe(dono, -1.4) });
      else rival.colocar(ATE, [DP[0], 1.4, DP[2] + 0.7]);
      rival.humor('feliz');
      // PERSONAGEM: o Seu Zé olha quem chegou · em "fechou": aperto de mão, feliz
      dono.colocar(DP, tc < chega ? [-2.0, 1.4, MZ + 5] : [ATE[0], 1.4, ATE[2] + 0.7]);
      if (tc > tFe - 0.15) { dono.parado(); rival.parado(); aperto(dono, 1); aperto(rival, 1); dono.humor('feliz'); }
      else if (tc > chega) { dono.parado(); rival.parado(); aperto(rival, K.clamp((tc - chega) / 0.3)); dono.humor('surpreso'); }
      else dono.humor('normal');
      // CÂMERA: (1) seguindo o rival de trás · (2) médio, de lado, os dois apertando a mão
      const cv = Math.max(B.inicio + 0.9, Math.min(chega, tFe - 0.4));
      if (tc < cv) { const rp = rival.g.position; K.mirar([-1.3, 1.9, rp.z + 4.6], [-3.3, 1.0, rp.z - 1.2]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-2.2, -2.5, k), 1.55, MZ + K.lerp(4.9, 4.5, k)], [-4.2, 1.15, MZ + 0.15]); }
      // EFEITOS VISUAIS: "Outro web designer" em "outro" · ✓ e "Fechou com outro" em "fechou" (o jogo congela)
      if (tc < tFe) fx.et.outro.em({ tela: [540, 400] }, tc - tOu); else fx.et.fechou.em({ tela: [540, 400] }, tc - tFe);
      if (tc > tFe) fx.simb.em(mais(cabecaDe(rival, 0.3), [-0.4, 0, 0]), tc - tFe, { tipo: '✓', tam: 0.5 });
      // SONS: passos · toc-toc (madeira) em "bateu" · certo em "fechou"
      for (let k = 0; k < 5; k++) K.som('passo', B.inicio + k * 0.3, 0.25);
      K.som('madeira', tBa, 0.4); K.som('madeira', tBa + 0.15, 0.4);
      K.som('certo', tFe, 0.5); K.som('whoosh', cv, 0.3);
    },
    lista(B, tc) {
      // NA TELA: (1) o Ravi descruza os braços; (2) a moeda cai no teclado, "Investir"; (3) a barra mappoa.com; (4) a lista das marmorarias de Feira de Santana sobe · MOSTRA: personagem, navegador, tela
      const tDe = quando('descruza', B, 0.08), tIn = quando('investe', B, 0.25), tDi = quando('digita', B, 0.4), tL = quando('lista', B, 0.62), tMa = quando('marmorarias', B, 0.7), tFe = quando('Feira', B, 0.8);
      ve(comp, cad);
      const c1 = Math.max(B.inicio + 0.6, tIn - 0.1);
      if (tc < tDi - 0.1) comp.tela.desenhar(siteRavi, 'ravi');
      if (tc < c1) {
        // PERSONAGEM: braço cruzado → em "descruza": solta os braços e fecha o punho, decidido
        menino.colocar(EM_PE, [0.9, 1.4, 5]);
        const k = 1 - K.suave(pc(tc, tDe, tDe + 0.35));
        if (k > 0.02) { menino.parado(); cruza(menino, k); menino.humor('bravo'); } else menino.reagir('vitoria', tc - tDe - 0.35);
        // CÂMERA: (1) perto, o rosto e os braços
        { const kk = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(1.15, 1.0, kk), 1.45, K.lerp(2.7, 2.4, kk)], [0.68, 1.12, -0.45]); }
        K.som('whoosh', tDe, 0.4);
      } else if (tc < tDi) {
        // INTERAÇÃO: a moeda sai da mão e cai no teclado
        menino.colocar(EM_PE, [-0.2, 1.3, 2.5]); menino.reagir('mostrando', tc - c1);
        menino.g.updateMatrixWorld(true);
        const pPos = mais(menino.mao(1), [0, 0.08, 0]), q = K.clamp((tc - tIn) / 0.45);
        moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tIn + 0.45, 0.6);
        fx.et.investir.em({ tela: [540, 400] }, tc - tIn);
        // CÂMERA: (2) o monitor e ele, fixa (lição: K.mirar no home_office)
        { const k = K.suave(pc(tc, c1, tDi)); K.mirar([K.lerp(0.6, 0.45, k), K.lerp(1.45, 1.6, k), K.lerp(3.8, 3.4, k)], [0.1, 1.2, -0.8]); }
      } else {
        ve(navG);
        K.entrar(navG.g, 'cresce', tc - tDi + 0.1, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
        navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
        for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
        if (tc > tL) {
          ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
          telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
          const n = tc > tMa ? 1 + Math.floor((tc - tMa) / 0.22) : 0;
          telaC.mostrar('listaMarm', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
          for (let k = 0; k < 4; k++) K.som('bip', tMa + k * 0.22, 0.25);
          K.som('brilho', tL, 0.5);
        }
        comp.tela.desenhar(siteRavi, 'ravi');
        // PERSONAGEM: sentado digitando · em "lista": levanta e aponta a São José
        if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
        else { menino.colocar(mais(EM_PE, [0.05, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
        // CÂMERA: (3) chegando, perto, no endereço e no monitor · (4) afastando, médio, de frente: a lista
        if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, tDi, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
        else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
        fx.et.feira.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tFe);
        K.som('whoosh', tL, 0.3);
      }
      K.som('whoosh', c1, 0.3); K.som('whoosh', tDi, 0.3);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Marmoraria São José cai do alto; o robô do Mappoa; o Ravi · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tPr = quando('precisa', B, 0.7), tTr = quando('trabalho', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tTr - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseMarm', { ate: tc > tTr ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tTr, 0.5); K.som('brilho', tM, 0.6); K.som('baque', tS + 0.3, 0.35);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "trabalho": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tTr ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tTr) menino.reagir('comemorando', tc - tTr); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      // CÂMERA: (1) chegando, médio, de baixo · (2) passando, médio, da esquerda
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
      K.som('whoosh', tMo, 0.3);
    },
    antes_agora(B, tc) {
      // NA TELA: (Antes) o Ravi de braço cruzado tremendo na frente do robô gigante; (Agora) na marmoraria, o robô cospe uma folha que voa até a mão do Ravi, ele entrega pro Seu Zé e os dois apertam a mão · MOSTRA: personagem, robo_ia, dono
      const tAg = quando('Agora', B, 0.38), tFa = quando('faz', B, 0.55), tTr = quando('traz', B, 0.85), tCl = quando('cliente', B, 0.93);
      ve(RIA.g); roboVivo(RIA, tc);
      if (tc < tAg) {
        emite(EG, tc, B.inicio - 2, 0.28, { base: 20 });
        // PERSONAGEM: de braço cruzado, tremendo, olhando o robô
        menino.colocar(RAVI_G(), [0.2, 3.0, RZ + 1.5]); menino.parado(); cruza(menino, 1); menino.humor('assustado'); treme(menino, tc);
        // CÂMERA: (1) o Ravi pequeno de trás, o robô enorme na frente
        { const k = K.suave(pc(tc, B.inicio, tAg)); K.mirar([K.lerp(4.0, 3.7, k), 1.7, RZ + K.lerp(11.4, 10.8, k)], [1.0, 3.2, RZ + 1]); }
        fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.15);
        K.som('zumbido', B.inicio + 0.1, 0.3);
        sonsImpressora(B.inicio - 2, 0.28, B.inicio, tAg, 0.12);
      } else {
        emite(EG, tc, B.inicio - 2, 0.28, { base: 20 });
        ve(...marmG);
        const RM = RAVI_M(), DP = DONO_AG();
        // a folha especial: sai da fenda em "faz", voa até a mão do Ravi; em "traz" passa pra mão do Seu Zé
        const S = RIA.g.localToWorld(V(...RIA.fenda));
        const cv2 = Math.max(tAg + 0.9, tTr - 0.2);
        // PERSONAGEM: o Ravi pega a folha e entrega · em "cliente": aperto de mão, os dois felizes
        menino.colocar(RM, tc < tFa + 0.9 ? [-1.0, 3.0, RZ] : [DP[0], 1.4, DP[2] + 0.8]);
        dono.colocar(DP, [RM[0], 1.4, RM[2] + 0.8]);
        if (tc < tCl) { menino.reagir(tc < tFa + 0.9 ? 'erguendo' : 'mostrando', tc - tFa); dono.reagir('surpreso', tc - tAg); }
        else { menino.parado(); dono.parado(); aperto(menino, 1); aperto(dono, 1); menino.humor('feliz'); dono.reagir('vitoria', tc - tCl); aperto(dono, 1); }
        // CÂMERA: (2) de baixo pra cima, o Ravi e o Seu Zé com o robô no fundo · (3) em "traz": médio, o aperto de mão
        if (tc < cv2) { const k = K.suave(pc(tc, tAg, cv2)); K.mirar([-1.2, 0.8, MZ + K.lerp(11.8, 11.2, k)], [-2.25, 2.4, MZ - 3.5]); }
        else { const k = K.suave(pc(tc, cv2, B.ate)); K.mirar([K.lerp(-2.9, -3.05, k), 1.55, MZ + K.lerp(4.8, 4.5, k)], [-3.4, 1.15, MZ + 0.3]); }
        ve(folhaAg); menino.g.updateMatrixWorld(true); dono.g.updateMatrixWorld(true);
        const q = K.clamp((tc - tFa) / 1.0);
        if (tc < tFa) folhaAg.visible = false;
        else if (q < 1) { const m = menino.mao(1); folhaAg.position.set(K.lerp(S.x, m[0], q), K.lerp(S.y, m[1] + 0.3, q) + Math.sin(q * PI) * 4.5, K.lerp(S.z, m[2], q)); folhaAg.rotation.set(q * 6, q * 3, 0); folhaAg.scale.setScalar(K.lerp(1, 0.55, q)); }
        else { const m = tc < tTr ? menino.mao(1) : dono.mao(1); folhaAg.position.set(m[0], m[1] + 0.3, m[2]); folhaAg.scale.setScalar(0.55); folhaAg.lookAt(K.camera.position); }
        // EFEITOS VISUAIS: "Você traz o cliente" e ✓ em "cliente"
        fx.et.traz.em({ tela: [540, 400] }, tc - tTr);
        if (tc > tCl) fx.simb.em(mais(cabecaDe(dono, 0.3), [0.3, 0, 0]), tc - tCl, { tipo: '✓', tam: 0.5 });
        // SONS: whoosh da folha · certo e festa
        K.som('whoosh', tFa, 0.5); K.som('clique', tFa, 0.3); K.som('estalo', tFa + 1.0, 0.4); K.som('whoosh', cv2, 0.3);
        K.som('certo', tCl, 0.55); K.som('festa', tCl + 0.1, 0.4);
      }
    },
    segue(B, tc) {
      // NA TELA: o Ravi de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteRavi, 'ravi');
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
      K.som('whoosh', tPc - 0.3, 0.3);
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, cad, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteRavi, 'ravi');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende o medo da IA: o robô gigante cuspindo sites e o Ravi pequeno, de braço cruzado, olhando pra câmera
      ve(RIA.g); roboVivo(RIA, 0.5);
      emite(EG, 2.0, 0, 0.28, { base: 14 });
      menino.colocar(RAVI_G(), [3.0, 1.5, RZ + 12]); menino.parado(); cruza(menino, 1); menino.humor('bravo');
      K.mirar([1.4, 2.3, RZ + 14.5], [0.6, 3.4, RZ + 1]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dono, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    [EG, EM].forEach((E) => { E.pilha.visible = false; E.folhas.forEach((m) => { m.visible = false; }); });
    menino.g.position.y = 0;
    cad.position.set(...CAD_LADO); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    // a gente que anda na calçada da esquerda some no trecho da marmoraria (não passa na frente do Seu Zé). A rua liga
    // o figurante de novo a cada quadro (colocar), então ele encolhe em vez de sumir
    CS.todos.rua.grupo.children.forEach((o) => {
      if (!o.isGroup || Math.abs(Math.abs(o.position.x) - 3.65) > 0.45) return;
      const some = o.position.x < 0 && o.position.z > MZ - 6 && o.position.z < MZ + 11;
      o.scale.setScalar(some ? 0.0001 : 1);
    });
    P[B.plano](B, tc);
    // a cadeira gira junto com o Ravi quando ele está sentado nela (senão o encosto tapa ele)
    if (menino.g.visible && Math.hypot(menino.g.position.x - SEAT[0], menino.g.position.z - SEAT[2]) < 0.05) cad.rotation.y = menino.g.rotation.y;
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
