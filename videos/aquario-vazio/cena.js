// Você tá pescando cliente onde não tem peixe (canal Mappoa).
// Três lugares (K.cenarios): o campo (natureza) com um rio largo atrás, feito aqui, e o aquário vazio na frente do Léo;
// o quarto do Léo; o palco do Mappoa. O aquário, o rio, os peixes pulando, a vara, a rede do rival e a barbearia em
// miniatura são feitos aqui. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, rival, robo, comp, telaC, telaM, navG, pino, tesoura, FOV0;
  let aquario, aquarinho, rioG, aguaMat, varaG, vara, linha, isca, redeW, rede, aro, barb;
  const tudo = [], fx = {}, avioes = [], peixes = [], respingos = [], bolhas = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Campo: o rio cruza atrás (eixo x, centro em z RZ); o aquário no suporte; o Léo do lado, de vara; o rival na margem
  const RZ = -4.6, RL = 3.2;
  const AQ = [0.5, 0, -0.5], TANQUE = [0.5, 1.15, -0.5];
  const LEO = [-0.9, 0, 0.4], OLHA_AQ = [0.6, 1.1, 0.2];
  const PONTA = [0.4, 2.45, -0.45], ISCA = [0.5, 1.0, -0.5];
  const RIV = [2.8, 0, -2.3];
  const MARGEM = [-1.4, 0, -2.4];
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira na frente; o aquário pequeno embaixo da janela
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  const AQQ = [-1.95, 0, -2.75], AQQ_TOPO = [-1.95, 1.2, -2.75];
  // Campo: onde a tela do Mappoa sobe na frase 6
  const TELA_C = [0.55, 1.45, 0.95];

  const LUGAR = {
    gancho: 'campo', longe: 'quarto', nada: 'campo', rival: 'campo', lugar: 'campo', investe: 'campo', lista: 'quarto',
    mappoa: 'mundo_mappoa', antes_agora: 'campo', segue: 'quarto', cartao: 'quarto', capa: 'campo'
  };

  const BARBS = [
    { nome: 'Barbearia Cabo Branco', end: 'Av. Cabo Branco, 2150', chips: ['whats', 'insta'] },
    { nome: 'Dom Bigode Barbearia', end: 'Rua Infante Dom Henrique, 410', chips: ['tel', 'insta'] },
    { nome: 'Navalha de Tambaú', end: 'Av. Olinda, 77', chips: ['whats'] },
    { nome: 'Barbearia Manaíra', end: 'Rua Esperidião Rosas, 512', chips: ['whats', 'tel'] }
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
  // O e-mail "faço sites" pra uma padaria que já tem site
  function emailJaTem(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.05, h * 0.06, w * 0.9, h * 0.14, 10, '#e7eefb');
    txt(c, 'Para: Padaria Sol', w * 0.09, h * 0.13, w * 0.05, '#2f4a7a', 700, 'left', w * 0.82);
    txt(c, 'Oi! Faço sites.', w * 0.09, h * 0.34, w * 0.08, '#111', 900);
    rr(c, w * 0.07, h * 0.48, w * 0.86, h * 0.16, 10, '#e3f7ec');
    txt(c, 'padariasol.com.br  ✓ site no ar', w * 0.1, h * 0.56, w * 0.045, '#15803d', 800, 'left', w * 0.8);
    txt(c, 'Enviadas hoje: ' + (e.n || 0) + ' · Respostas: 0', w * 0.09, h * 0.78, w * 0.045, '#e8352b', 800, 'left', w * 0.84);
  }
  // O grupo cheio de web designer, todo mundo mandando "Faço sites!"
  function grupoWD(c, w, h, e) {
    c.fillStyle = '#eae6df'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#1f8a70'; c.fillRect(0, 0, w, h * 0.17);
    txt(c, 'Web Designers JP', w * 0.06, h * 0.07, w * 0.06, '#fff', 900);
    txt(c, '2.341 membros', w * 0.06, h * 0.13, w * 0.04, '#d6f5ea', 700);
    const nomes = ['Ana · web designer', 'Caio · web designer', 'Rafa · web designer', 'Você'];
    const n = Math.min(4, e.n || 0);
    for (let i = 0; i < n; i++) {
      const eu = i === 3, y = h * (0.22 + i * 0.19), x = eu ? w * 0.36 : w * 0.05;
      rr(c, x, y, w * 0.58, h * 0.16, 12, eu ? '#d9fdd3' : '#ffffff');
      txt(c, nomes[i], x + w * 0.03, y + h * 0.045, w * 0.036, eu ? '#15803d' : '#2f6fd6', 800, 'left', w * 0.52);
      txt(c, 'Faço sites!', x + w * 0.03, y + h * 0.11, w * 0.06, '#111', 900);
    }
  }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Léo Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites rápidos e bonitos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }

  // ---------- O aquário vazio (vidro, água, areia e o suporte de madeira) ----------
  function fazAquario() {
    const g = new THREE.Group();
    const madeira = K.mat(0x8b5b35, { roughness: 0.8 }), preto = K.mat(0x22252b, { roughness: 0.5 });
    const sup = K.malha(new THREE.BoxGeometry(1.42, 0.7, 0.86), madeira); sup.position.y = 0.35; g.add(sup);
    const areia = K.malha(new THREE.BoxGeometry(1.26, 0.08, 0.7), K.mat(0xe8d6a0)); areia.position.y = 0.74; g.add(areia);
    const agua = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.68, 0.69), new THREE.MeshStandardMaterial({ color: 0x5bc0eb, transparent: true, opacity: 0.33, roughness: 0.05, depthWrite: false }));
    agua.position.y = 1.12; g.add(agua);
    const vidro = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.74), new THREE.MeshStandardMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.16, roughness: 0.02, metalness: 0.1, depthWrite: false }));
    vidro.position.y = 1.15; g.add(vidro);
    // a borda preta em cima e embaixo, e as quinas
    [0.71, 1.59].forEach((y) => {
      [[1.34, 0.05, 0.05, 0, 0.37], [1.34, 0.05, 0.05, 0, -0.37], [0.05, 0.05, 0.78, 0.65, 0], [0.05, 0.05, 0.78, -0.65, 0]].forEach(([a, b, c, x, z]) => {
        const m = K.malha(new THREE.BoxGeometry(a, b, c), preto); m.position.set(x, y, z); g.add(m);
      });
    });
    [[0.65, 0.37], [-0.65, 0.37], [0.65, -0.37], [-0.65, -0.37]].forEach(([x, z]) => { const m = K.malha(new THREE.BoxGeometry(0.04, 0.9, 0.04), preto); m.position.set(x, 1.15, z); g.add(m); });
    return g;
  }

  // ---------- O rio largo atrás (água azul brilhando e as margens de terra) ----------
  function fazRio() {
    const g = new THREE.Group();
    aguaMat = new THREE.MeshStandardMaterial({ color: 0x3a9be0, roughness: 0.12, metalness: 0.05, emissive: 0x0a2a40, emissiveIntensity: 0.4 });
    const agua = new THREE.Mesh(new THREE.BoxGeometry(90, 0.3, RL), aguaMat); agua.position.set(0, 0.06, RZ); agua.receiveShadow = true; g.add(agua);
    // o trecho do meio, que aparece na tela, leva o nome 'rio' pra revisão (o rio inteiro, de 90 m, fica atrás da câmera)
    const meio = new THREE.Mesh(new THREE.BoxGeometry(12, 0.3, RL), aguaMat); meio.position.set(0.8, 0.065, RZ); g.add(meio); K.nomear('rio', meio);
    [-1, 1].forEach((l) => { const m = K.malha(new THREE.BoxGeometry(90, 0.24, 0.4), K.mat(0x8a6a45, { roughness: 1 })); m.position.set(0, 0.05, RZ + l * (RL / 2 + 0.15)); g.add(m); });
    // as faixinhas claras da correnteza
    for (let i = 0; i < 26; i++) {
      const f = new THREE.Mesh(new THREE.PlaneGeometry(1.2 + (i % 3) * 0.6, 0.06), new THREE.MeshBasicMaterial({ color: 0xcdeeff, transparent: true, opacity: 0.6, depthWrite: false }));
      f.rotation.x = -PI / 2; f.position.set(-26 + i * 2.1, 0.215, RZ - 1.2 + ((i * 7) % 5) * 0.55); f.userData.x0 = f.position.x; g.add(f);
    }
    K.vivo((t) => {
      aguaMat.emissiveIntensity = 0.38 + 0.12 * Math.sin(t * 2);
      g.children.forEach((f) => { if (f.userData.x0 != null) f.position.x = f.userData.x0 + ((t * 0.9) % 2.1); });
    });
    return g;
  }
  // Os peixes pulando em arco no rio, com o respingo onde caem (tudo em função do tempo)
  // nenhum peixe pula atrás do aquário (x de -0,2 a 1,2): visto pelo vidro, parecia estar dentro dele
  const X_PEIXE = [-6.4, -5.0, -3.6, 2.8, 4.0, 5.2, 6.4, 7.6, -7.8];
  const CORES_PEIXE = [0xf7941d, 0xf5c518, 0x3a7be0, 0xff6b8a, 0x2fb54a, 0xf7941d, 0xe8352b, 0xf5c518, 0x9b5de5];
  function peixesEm(tc, forca = 1) {
    if (forca <= 0) return;
    peixes.forEach((p, i) => {
      const Tp = 1.6 + (i % 3) * 0.2, k = ((tc + i * 0.37) / Tp) % 1, dir = i % 2 ? -1 : 1;
      const x0 = X_PEIXE[i], z = RZ + ((i % 3) - 1) * 0.8;
      const r = respingos[i];
      if (k < 0.55) {
        const q = k / 0.55;
        p.em([x0 + dir * (q - 0.5) * 1.5, 0.2 + Math.sin(q * PI) * 1.45, z], tc, dir > 0 ? 0 : PI);
        p.g.rotation.z = (0.5 - q) * 2.2;
        r.visible = q < 0.18;
        if (r.visible) { r.position.set(x0 - dir * 0.75, 0.23, z); const s = 1 + q * 14; r.scale.set(s, s, s); r.material.opacity = 0.8 * (1 - q / 0.18); }
      } else {
        const q = (k - 0.55) / 0.45;
        r.visible = q < 0.45;
        if (r.visible) { r.position.set(x0 + dir * 0.75, 0.23, z); const s = 1 + q * 7; r.scale.set(s, s, s); r.material.opacity = 0.85 * (1 - q / 0.45); }
      }
    });
  }

  // ---------- A vara, a linha e a isca (a minhoca no anzol) ----------
  const UP = V(0, 1, 0);
  function barraEntre(m, a, b) {
    const va = V(...a), d = V(...b).sub(va), L = d.length();
    m.position.copy(va); m.quaternion.setFromUnitVectors(UP, d.normalize()); m.scale.set(1, L, 1);
  }
  function fazVara() {
    const g = new THREE.Group();
    const geo = new THREE.CylinderGeometry(0.018, 0.035, 1, 10).translate(0, 0.5, 0);
    vara = K.malha(geo, K.mat(0x6b4a2e, { roughness: 0.6 })); g.add(vara);
    const cabo = K.malha(new THREE.CylinderGeometry(0.045, 0.045, 0.32, 12).translate(0, 0.16, 0), K.mat(0x22252b)); vara.add(cabo);
    const mol = K.malha(new THREE.CylinderGeometry(0.07, 0.07, 0.07, 14).rotateZ(PI / 2), K.mat(0xc9ccd2, { metalness: 0.5 })); mol.position.set(0.06, 0.24, 0); vara.add(mol);
    linha = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1, 5).translate(0, 0.5, 0), new THREE.MeshBasicMaterial({ color: 0xf4f4f4 })); g.add(linha);
    isca = new THREE.Group();
    const minhoca = K.malha(new THREE.TorusGeometry(0.06, 0.022, 8, 16, PI * 1.5), K.mat(0xff7aa2, { roughness: 0.5 })); minhoca.rotation.y = PI / 2; isca.add(minhoca);
    const anzol = K.malha(new THREE.TorusGeometry(0.035, 0.007, 6, 12, PI * 1.2), K.mat(0xb8bcc4, { metalness: 0.7 })); anzol.position.y = -0.03; isca.add(anzol);
    const boia = K.malha(new THREE.SphereGeometry(0.05, 12, 10), K.mat(0xe8352b)); boia.position.y = 0.42; isca.add(boia);
    g.add(isca);
    return g;
  }
  // a vara sai da mão direita até a ponta; a linha desce da ponta até a isca
  function varaEm(b, ponta, iscaPos) {
    ve(varaG);
    const m = b.mao(1), d = V(...ponta).sub(V(...m)).normalize();
    const base = [m[0] - d.x * 0.35, m[1] - d.y * 0.35, m[2] - d.z * 0.35];
    barraEntre(vara, base, ponta);
    barraEntre(linha, iscaPos, ponta);
    isca.position.set(...iscaPos);
  }
  const iscaBalanca = (tc) => [ISCA[0] + Math.sin(tc * 1.7) * 0.05, ISCA[1] + Math.sin(tc * 2.3) * 0.03, ISCA[2]];
  // a bolha solitária subindo no aquário vazio
  function bolhasEm(tc) {
    bolhas.forEach((s, i) => {
      const k = (tc * 0.45 + i * 0.5) % 1;
      s.visible = true;
      s.position.set(TANQUE[0] - 0.3 + i * 0.5 + Math.sin(tc * 4 + i) * 0.03, 0.82 + k * 0.62, TANQUE[2] + 0.1);
      s.scale.setScalar(0.6 + k * 0.6);
    });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['natureza', {}, 'campo'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaBarbs = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: BARBS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Barbearias · João Pessoa, PB', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.mapaPeixes = (c, w, h, e) => { T.mapaBusca(c, w, h, { termo: 'barbearias em João Pessoa', pinos: e.pinos }); };
    T.analiseBarb = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Barbearia Cabo Branco', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site próprio', 'Agenda só pelo WhatsApp'], oportunidades: ['Site com agendamento online'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre quem procura barbearia no bairro e não acha.'
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

    // Personagens: o Léo (do canal), o rival de moletom vermelho e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } });
    K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Campo: o aquário, o rio, os peixes, a vara
    aquario = fazAquario(); guarda(aquario, 'aquario', AQ);
    rioG = fazRio(); guarda(rioG);
    for (let i = 0; i < 9; i++) {
      const p = K.peixe(CORES_PEIXE[i], 1.7); peixes.push(p);
      const r = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.05, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      r.rotation.x = -PI / 2; r.visible = false; K.scene.add(r); respingos.push(r);
    }
    for (let i = 0; i < 2; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, roughness: 0.05 }));
      s.visible = false; K.scene.add(s); bolhas.push(s);
    }
    varaG = fazVara(); guarda(varaG, 'vara');

    // O rival: a rede de pescar (gira no punho) e a barbearia em miniatura que sai dentro dela
    redeW = new THREE.Group(); redeW.rotation.order = 'YXZ';
    rede = K.m3d('rede_pesca'); rede.scale.setScalar(1.4); rede.position.y = -0.42; redeW.add(rede);
    aro = new THREE.Object3D(); aro.position.set(0, 1.65, 0); rede.add(aro);
    guarda(redeW, 'rede');
    barb = K.m3d('prediozinho', { placa: 'BARBEARIA', cor: 0xd8343a }); guarda(barb, 'barbearia', null, 0.42);

    // Quarto: o computador, o aquário pequeno, os envelopes, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    aquarinho = fazAquario(); guarda(aquarinho, 'aquarinho', AQQ, 0.75);
    const avG = new THREE.Group(); K.scene.add(avG); K.nomear('avioes', avG); tudo.push(avG);
    for (let i = 0; i < 4; i++) { const e = K.m3d('envelope'); e.scale.setScalar(0.32); avG.add(e); avioes.push(e); }
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    pino = K.m3d('pino'); guarda(pino, 'pino', [0.9, 2.2, 0.3], 0.8);
    tesoura = K.m3d('tesoura'); guarda(tesoura, 'tesoura', null, 1.5);

    // Efeitos
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      web: e('Web designer', 'azul'), jaTem: e('Já tem site', 'laranja'), grupo: e('Só web designer', 'vermelho'),
      zero: e('0 mordidas', 'vermelho'), outro: e('Outro web designer', 'laranja'), barb: e('Barbearia', 'verde'),
      isca: e('Isca boa', 'verde'), peixe: e('Aqui tem peixe', 'verde'), corte: e('O preço de um corte', 'laranja'),
      jp: e('João Pessoa', 'azul'), precisa: e('Quem precisa de você', 'verde'), aquario: e('Aquário', 'vermelho'),
      semSite: e('Barbearias sem site', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>a sua cidade</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // O Léo de vara no aquário vazio (a isca balançando dentro da água)
  function pescandoNoAquario(tc, olhar) {
    ve(aquario);
    menino.colocar(LEO, olhar || OLHA_AQ);
    menino.segurar();
    varaEm(menino, PONTA, iscaBalanca(tc));
    bolhasEm(tc);
  }
  // O rival na margem com a rede: th = o quanto a rede tomba pra frente (0 em pé, ~1,95 dentro d'água)
  function rivalComRede(th) {
    rival.colocar(RIV, [RIV[0], 1, RZ]);
    rival.segurar();
    const m0 = rival.mao(0), m1 = rival.mao(1);
    redeW.position.set((m0[0] + m1[0]) / 2, (m0[1] + m1[1]) / 2, (m0[2] + m1[2]) / 2);
    redeW.rotation.set(th, PI, 0);
    ve(redeW);
    redeW.updateMatrixWorld(true);
    return aro.getWorldPosition(V(0, 0, 0)).toArray();
  }
  function somRespingos(B) { for (let k = 0; k * 0.75 < B.dur; k++) K.som('respingo', B.inicio + 0.25 + k * 0.75, 0.22); }

  const P = {
    gancho(B, tc) {
      // NA TELA: a isca balançando no aquário vazio; o Léo de vara, de tédio; o rio lotado de peixes pulando · MOSTRA: personagem, aquario, rio
      // CENÁRIO: o campo de dia (o cenário cuida); o rio e os peixes (feitos aqui)
      const tPx = quando('peixe', B, 0.9);
      ve(rioG);
      // PERSONAGEM: segura a vara de tédio · em "peixe": olha pro rio
      pescandoNoAquario(tc, tc > tPx ? [1.5, 1.0, RZ] : null);
      menino.humor(tc > tPx ? 'surpreso' : 'triste');
      if (tc < tPx) menino.cabeca.rotation.z = 0.12;
      // OBJETOS SE MEXENDO: os peixes pulando e caindo com respingo
      peixesEm(tc, 1);
      // SONS: respingos · bolhas
      somRespingos(B); K.som('bolhas', B.inicio + 0.05, 0.35);
      // CÂMERA: 4 cortes de ~0,7 s (a isca no aquário, os peixes no rio, a cara do Léo, o quadro inteiro)
      const c1 = B.inicio + 0.25 * B.dur, c2 = B.inicio + 0.5 * B.dur, c3 = B.inicio + 0.74 * B.dur;
      if (tc < c1) {
        K.filmar([mais(ISCA, [0, -0.25, 0]), mais(ISCA, [0, 0.5, 0]), mais(TANQUE, [-0.6, 0, 0]), mais(TANQUE, [0.6, 0, 0])], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 'frente', altura: 'olho', obstaculos: false });
      } else if (tc < c2) {
        const k = pc(tc, c1, c2);
        K.mirar([K.lerp(1.2, 2.0, k), 0.55, 1.4], [2.6, 1.1, RZ]);
      } else if (tc < c3) {
        K.filmar([cabecaDe(menino, 0.15), cabecaDe(menino, -0.4), mais(LEO, [0.5, 1.6, 0])], 'chegando', pc(tc, c2, c3), { plano: 'perto', lado: 40, altura: 'olho', tam: 1.2 });
      } else {
        const k = K.suave(pc(tc, c3, B.ate)); K.mirar([0.1, 1.6, K.lerp(5.6, 6.8, k)], [0.1, 1.4, -0.6]);
      }
    },
    longe(B, tc) {
      // NA TELA: o quarto de dia; o Léo digitando; os envelopes "faço sites" caindo no aquário vazio embaixo da janela; o grupo de web designers · MOSTRA: personagem, monitor, avioes
      const tW = quando('designer', B, 0.12), tM = quando('manda', B, 0.25), tT = quando('tem', B, 0.5), tG = quando('grupo', B, 0.7);
      ve(comp, aquarinho);
      // PERSONAGEM: começo digitando animado · em "grupo": se recosta e espera, olhando o relógio
      sentado(MONITOR);
      if (tc > tG + 0.3) menino.reagir('olha_relogio', tc - tG - 0.3); else { menino.reagir('digitando', tc); menino.humor('feliz'); }
      const enviadas = tc > tM ? 1 + Math.floor((tc - tM) / 0.4) : 0;
      if (tc < tG) comp.tela.desenhar((c, w, h) => emailJaTem(c, w, h, { n: enviadas }), 'mail' + enviadas);
      else { const n = 1 + Math.floor((tc - tG) / 0.3); comp.tela.desenhar((c, w, h) => grupoWD(c, w, h, { n }), 'grupo' + Math.min(4, n)); }
      // OBJETOS SE MEXENDO: um envelope a cada ~0,4 s, do monitor em arco até o aquário, e afunda
      ve(avioes[0].parent);
      avioes.forEach((e, i) => {
        const k = (tc - tM - i * 0.4) / 1.2;
        e.visible = k > 0;
        if (!e.visible) return;
        const q = k % 1, de = mais(MONITOR, [0, 0.35, 0.15]), ate = AQQ_TOPO;
        const voo = K.clamp(q / 0.75), afunda = K.clamp((q - 0.75) / 0.25);
        e.position.set(K.lerp(de[0], ate[0], voo), K.lerp(de[1], ate[1], voo) + Math.sin(voo * PI) * 0.9 - afunda * 0.4, K.lerp(de[2], ate[2], voo) + Math.sin(voo * PI) * 0.5);
        e.rotation.set(0.2, voo * 3, Math.sin(voo * 6) * 0.3);
        e.scale.setScalar(0.3 * (1 - afunda * 0.3));
        if (k > 0 && k < 0.05) { K.som('whoosh', tM + i * 0.4, 0.3); K.som('respingo', tM + i * 0.4 + 0.9, 0.25); }
      });
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Já tem site" em "tem" · "Só web designer" em "grupo"
      if (tc < tT) fx.et.web.em(cabecaDe(menino, 0.55), tc - tW);
      else if (tc < tG) fx.et.jaTem.em(mais(AQQ_TOPO, [0.25, 0.75, 0.3]), tc - tT);
      else fx.et.grupo.em(mais(MONITOR, [0, 0.95, 0.3]), tc - tG);
      for (let k = 0; k < 10; k++) K.som('clique', B.inicio + 0.1 + k * 0.15, 0.25);
      K.som('bip', tG, 0.4);
      // CÂMERA: (1) até "manda": chegando · perto · direita · olho · (2) passando · médio · esquerda · olho
      const cv = tM + 0.2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 22, altura: 'olho', tam: 1.3 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, AQQ_TOPO, mais(AQQ, [0, 0.3, 0])], 'passando', pc(tc, cv, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    nada(B, tc) {
      // NA TELA: o Léo de vara no aquário; o céu passando pra tarde; a isca parada; "0 mordidas" · MOSTRA: personagem, aquario, vara
      const tN = quando('nada', B, 0.7);
      ve(rioG);
      // CENÁRIO: o dia passando (o céu vai pra tarde)
      K.ceu('dia', 'tarde', 0.75 * K.suave(pc(tc, B.inicio, B.ate)));
      // PERSONAGEM: olha o relógio · em "nada": murcha, triste
      pescandoNoAquario(tc * 0.3);
      if (tc > tN) { menino.reagir('triste', tc - tN); menino.segurar(); varaEm(menino, mais(PONTA, [0, -0.25, 0]), mais(ISCA, [0, -0.1, 0])); }
      else { menino.reagir('olha_relogio', tc - B.inicio); varaEm(menino, PONTA, iscaBalanca(tc * 0.3)); }
      peixesEm(tc, 1);
      fx.et.zero.em(mais(TANQUE, [-0.2, 0.75, 0.4]), tc - tN);
      K.som('pingo', B.inicio + 0.3, 0.4);
      // CÂMERA: (1) até "nada": a isca · descendo · perto · direita · olho · (2) chegando · médio · esquerda · olho (congela no fim: o jogo faz)
      if (tc < tN - 0.1) K.filmar([mais(ISCA, [0, -0.2, 0]), mais(ISCA, [0, 0.6, 0]), TANQUE], 'descendo', pc(tc, B.inicio, tN - 0.1), { plano: 'perto', lado: 18, altura: 'olho', tam: 1.4, obstaculos: false });
      else K.filmar([menino, aquario], 'chegando', pc(tc, tN - 0.1, B.ate), { plano: 'perto', lado: 22, altura: 'olho' });
    },
    rival(B, tc) {
      // NA TELA: na margem do rio, o rival joga a rede na água cheia de peixes e puxa uma barbearia em miniatura · MOSTRA: rival, rede, rio
      const tD = quando('designer', B, 0.3), tR = quando('rio', B, 0.55), tP = quando('puxa', B, 0.72), tB = quando('barbearia', B, 0.85);
      ve(rioG);
      // PERSONAGEM: o rival segura a rede, joga em "rio", puxa em "puxa" · em "barbearia": comemora. O Léo, de vara no aquário, olha
      let th;
      if (tc < tR - 0.35) th = 0.35 + Math.sin(tc * 3) * 0.06;
      else if (tc < tP) th = K.lerp(0.35, 1.95, K.suave(pc(tc, tR - 0.35, tR)));
      else th = K.lerp(1.95, 0.55, K.suave(pc(tc, tP, tP + 0.5)));
      const aroP = rivalComRede(th);
      if (tc > tB) rival.humor('feliz');
      // a barbearia aparece dentro da rede quando ela sai da água
      if (tc > tP) { ve(barb); barb.position.set(aroP[0], aroP[1] - 0.28, aroP[2]); barb.rotation.set(0, 0.35, Math.sin(tc * 6) * 0.08); }
      pescandoNoAquario(tc, tc > tP ? [RIV[0], 1.2, RIV[2]] : null);
      if (tc > tP) menino.humor('surpreso');
      peixesEm(tc, 1);
      // EFEITOS VISUAIS: "Outro web designer" em "designer" · "Barbearia" em "barbearia"
      if (tc < tP) fx.et.outro.em(cabecaDe(rival, 0.5), tc - tD);
      else fx.et.barb.em(mais(aroP, [0.1, 0.55, 0]), tc - tB);
      if (tc > tB) fx.simb.em(mais(aroP, [-0.55, 0.3, 0]), tc - tB, { tipo: '✓', tam: 0.7 });
      // SONS: whoosh da rede · água · respingo · certo
      K.som('whoosh', tR - 0.35, 0.45); K.som('agua', tR, 0.5); K.som('respingo', tP, 0.5); K.som('certo', tB, 0.6);
      somRespingos(B);
      // CÂMERA: (1) até "puxa": passando · médio · direita · olho · (2) a rede saindo · subindo · perto · frente · baixo
      if (tc < tP) K.filmar([rival, cabecaDe(rival, 0.3), [RIV[0], 0.3, RZ], [1.2, 0.3, RZ + 0.8]], 'chegando', pc(tc, B.inicio, tP), { plano: 'perto', lado: 30, altura: 'olho' });
      else K.filmar([aroP, mais(aroP, [0, -0.5, 0]), cabecaDe(rival, 0)], 'subindo', pc(tc, tP, B.ate), { plano: 'perto', lado: 20, altura: 'baixo', tam: 1.8 });
    },
    lugar(B, tc) {
      // NA TELA: a cor volta; a isca de perto com "Isca boa"; depois do alto: o aquário vazio com ✗ e o rio cheio com ✓ · MOSTRA: aquario, rio, personagem
      const tI = quando('isca', B, 0.3), tL = quando('lugar', B, 0.85);
      ve(rioG);
      pescandoNoAquario(tc, tc > tL ? [1.5, 1.0, RZ] : null);
      // PERSONAGEM: olha a isca · em "lugar": ideia, olha pro rio
      if (tc > tL) { menino.reagir('ideia', tc - tL); menino.segurar(); varaEm(menino, PONTA, iscaBalanca(tc)); }
      peixesEm(tc, 1);
      // EFEITOS VISUAIS: "Isca boa" em "isca" · ✗ no aquário e ✓ no rio em "lugar"
      const cv = (tI + tL) / 2 + 0.15;
      if (tc < cv) fx.et.isca.em(mais(ISCA, [0.15, 0.75, 0.3]), tc - tI);
      else {
        fx.simb.em(mais(TANQUE, [0, 1.0, 0]), tc - tL, { tipo: '✗', tam: 0.9 });
        fx.simb2.em([2.6, 1.9, RZ], tc - tL - 0.15, { tipo: '✓', tam: 1.1 });
        fx.et.peixe.em([2.6, 2.8, RZ], tc - tL - 0.15);
      }
      K.som('certo', tI, 0.4); K.som('errado', tL, 0.4); K.som('ding', tL + 0.15, 0.5);
      // CÂMERA: (1) a isca · chegando · perto · esquerda · olho · (2) subindo · aberto · frente · alto
      if (tc < cv) K.filmar([mais(ISCA, [0, -0.2, 0]), mais(ISCA, [0, 0.9, 0]), mais(ISCA, [0.4, 0.3, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.3, obstaculos: false });
      else K.filmar([menino, aquario, [2.6, 1.0, RZ], [2.6, 2.4, RZ]], 'subindo', pc(tc, cv, B.ate), { plano: 'medio', lado: 10, altura: 'olho' });
    },
    investe(B, tc) {
      // NA TELA: o Léo larga a vara; a tesoura gira na mão dele ("O preço de um corte"); o painel sobe do chão com o mapa e os pinos · MOSTRA: personagem, tesoura, tela
      const tIv = quando('investir', B, 0.25), tC = quando('corte', B, 0.4), tF = quando('ferramenta', B, 0.62), tPx = quando('peixes', B, 0.92);
      ve(rioG, aquario);
      peixesEm(tc, 1);
      // a vara no chão
      ve(varaG); barraEntre(vara, [-0.4, 0.04, 0.95], [1.4, 0.04, 0.2]); linha.visible = false; isca.position.set(1.45, 0.06, 0.25);
      // PERSONAGEM: pensando · em "investir": mostrando a tesoura · em "peixes": aponta a tela
      if (tc < tF) {
        menino.colocar(LEO, [1.2, 1.2, 3]);
        if (tc < tIv) menino.reagir('pensando', tc - B.inicio); else menino.reagir('mostrando', tc - tIv);
        if (tc > tC - 0.1) { ve(tesoura); const m = menino.mao(1); tesoura.position.set(m[0], m[1] + 0.2, m[2] + 0.05); tesoura.rotation.set(0.3, tc * 4, 0); tesoura.scale.setScalar(1.5 * pop(tc - tC + 0.1)); }
        fx.et.corte.em(cabecaDe(menino, 0.5), tc - tC);
      } else {
        menino.colocar(mais(LEO, [0.1, 0, 0.1]), tc > tPx ? TELA_C : [1.0, 1.3, 4]);
        if (tc > tPx) menino.apontar(0.55); else menino.reagir('surpreso', tc - tF);
        ve(telaC); const q = K.suave(K.clamp((tc - tF) / 0.5));
        telaC.g.position.set(TELA_C[0], K.lerp(-1.0, TELA_C[1], q), TELA_C[2]); telaC.g.rotation.set(0, -0.2, 0);
        const pinos = tc > tPx - 0.4 ? Math.min(9, 1 + Math.floor((tc - tPx + 0.4) / 0.12)) : 0;
        telaC.mostrar('mapaPeixes', { pinos });
        for (let k = 0; k < 5; k++) K.som('bip', tPx - 0.4 + k * 0.12, 0.25);
      }
      K.som('madeira', B.inicio + 0.1, 0.4); K.som('brilho', tC, 0.45); K.som('liga', tF, 0.5);
      // CÂMERA: (1) chegando · perto · direita · olho · (2) passando · médio · frente · olho
      if (tc < tF) K.filmar([cabecaDe(menino, 0.25), mais(LEO, [0, 0.8, 0]), mais(menino.mao(1), [0, 0.3, 0])], 'chegando', pc(tc, B.inicio, tF), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.4 });
      else K.filmar([menino, cabecaDe(menino, 0.3), mais(TELA_C, [0.7, 1.15, 0]), mais(TELA_C, [0.7, -1.2, 0])], 'chegando', pc(tc, tF, B.ate), { plano: 'medio', lado: 6, altura: 'olho' });
    },
    lista(B, tc) {
      // NA TELA: no quarto, a barra com mappoa.com; a lista das barbearias de João Pessoa sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digita', B, 0.02), tL = quando('lista', B, 0.55), tBa = quando('barbearias', B, 0.65), tJp = quando('Pessoa', B, 0.8);
      ve(comp, navG);
      comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.09)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.09, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tBa ? 1 + Math.floor((tc - tBa) / 0.22) : 0;
        telaC.mostrar('listaBarbs', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tBa + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo digitando · em "lista": levanta e aponta a primeira barbearia
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.jp.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tJp);
      // CÂMERA: (1) até a lista: chegando · perto · no endereço e nas mãos · (2) subindo · médio · frente · olho
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'subindo', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Barbearia Cabo Branco; o robô à esquerda; o Léo à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseBarb', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: no aquário vazio, de tédio; (2) Agora: na margem do rio, joga a isca; (3) a vara enverga, o peixe pula na isca, ✓ · MOSTRA: personagem, rio, vara
      const tA = quando('Agora', B, 0.45), tJ = quando('joga', B, 0.6), tPx = quando('peixe', B, 0.92);
      ve(rioG);
      peixesEm(tc, 1);
      if (tc < tA) {
        // Antes: o aquário vazio, a cara de tédio
        pescandoNoAquario(tc * 0.4); menino.humor('triste'); menino.cabeca.rotation.z = 0.14;
        fx.et.aquario.em(mais(TANQUE, [0, 0.95, 0.3]), tc - B.inicio - 0.15);
        K.som('pingo', B.inicio + 0.3, 0.35);
        // CÂMERA: (1) afastando · médio · direita · olho
        K.filmar([menino, aquario, mais(TANQUE, [0, 1.1, 0])], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 28, altura: 'olho', tam: 2.4 });
        return;
      }
      // Agora: na margem, de frente pro rio; a isca vai pra água; em "peixe" um peixe pula na isca e a vara enverga
      ve(aquario);
      menino.colocar(MARGEM, [MARGEM[0] + 0.3, 1.0, RZ]);
      menino.segurar(); menino.humor('feliz');
      const agua = [MARGEM[0] + 1.25, 0.22, RZ + 0.2];
      const lanc = K.suave(pc(tc, tJ - 0.2, tJ + 0.3));
      const pontaNormal = [MARGEM[0] + 1.0, 2.35, MARGEM[2] - 1.3];
      if (tc < tPx) {
        const ip = [K.lerp(MARGEM[0] + 0.3, agua[0], lanc), K.lerp(1.3, agua[1], lanc) + Math.sin(lanc * PI) * 0.8, K.lerp(MARGEM[2] - 1.0, agua[2], lanc)];
        varaEm(menino, pontaNormal, ip);
      } else {
        const k = K.clamp((tc - tPx) / 0.45), sobe = K.saiVolta(k);
        const ip = [agua[0], K.lerp(agua[1], 1.25, sobe), agua[2] + 0.1];
        const ponta = mais(pontaNormal, [0, -0.55 * sobe + Math.sin(tc * 18) * 0.04, 0.25 * sobe]);
        varaEm(menino, ponta, ip);
        // o peixe fisgado, se debatendo na ponta da linha
        const p = peixes[0]; p.em(mais(ip, [0, -0.25, 0]), tc, PI / 2); p.g.rotation.z = -1.3 + Math.sin(tc * 20) * 0.35; p.g.scale.setScalar(1.25);
        menino.reagir('vitoria', tc - tPx);
        menino.segurar();
        fx.simb.em(mais(ip, [-0.7, 0.4, 0]), tc - tPx - 0.2, { tipo: '✓', tam: 0.8 });
        fx.et.semSite.em(mais(ip, [0.9, 0.55, 0]), tc - tPx - 0.2);
      }
      K.som('whoosh', tA, 0.5); K.som('whoosh', tJ - 0.2, 0.4); K.som('agua', tJ + 0.3, 0.4); K.som('respingo', tPx, 0.6); K.som('certo', tPx + 0.2, 0.6);
      // CÂMERA: (2) do outro lado do rio, de frente pra ele · chegando · (3) a vara envergando e o peixe · subindo · perto · baixo
      if (tc < tPx) { const k = K.suave(pc(tc, tA, tPx)); K.mirar([MARGEM[0] + K.lerp(1.6, 1.1, k), 1.5, RZ - K.lerp(6.2, 5.0, k)], [MARGEM[0] + 0.2, 1.15, MARGEM[2] - 0.6]); }
      else { const k = K.suave(pc(tc, tPx, B.ate)); K.mirar([MARGEM[0] + 1.6, K.lerp(1.0, 1.3, k), RZ - K.lerp(5.4, 4.8, k)], [MARGEM[0] + 0.6, 1.3, MARGEM[2] - 0.7]); }
    },
    segue(B, tc) {
      // NA TELA: o Léo de pé no quarto; "Comenta a sua cidade" no topo e o pino; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tCi = quando('cidade', B, 0.12), tSg = quando('segue', B, 0.3), tPc = quando('computador', B, 0.45), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      if (tc < tPc) {
        ve(pino); const q = K.clamp((tc - tCi) / 0.5); pino.visible = tc > tCi;
        pino.position.set(1.05, K.lerp(3.6, 1.75, K.saiVolta(q)), 0.25); pino.rotation.y = tc * 1.5;
        K.som('estalo', tCi, 0.5);
      }
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (aponta pra quem assiste) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
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
      ve(rioG);
      // o Léo virado pra câmera, de vara no aquário vazio, mão na testa; os peixes pulando no rio atrás
      pescandoNoAquario(0.6, [-0.3, 1.3, 5]);
      menino.reagir('mao_na_testa', 0.8);
      varaEm(menino, PONTA, ISCA);
      peixesEm(0.62, 1);
      // um peixe grande pulando no rio, logo atrás e do lado do aquário (fora do vidro)
      const p = peixes[3]; p.em([1.2, 2.35, RZ + 1.0], 0.6, PI); p.g.rotation.z = 0.5; p.g.scale.setScalar(2.4);
      K.mirar([0.1, 1.65, 6.8], [0.1, 1.5, -0.6]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'campo' : (LUGAR[B.plano] || 'quarto'));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    menino.cabeca.rotation.z = 0;
    peixes.forEach((p) => { p.g.visible = false; p.g.scale.setScalar(1.7); });
    respingos.forEach((r) => { r.visible = false; });
    bolhas.forEach((s) => { s.visible = false; });
    avioes.forEach((e) => { e.visible = false; });
    linha.visible = true;
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
