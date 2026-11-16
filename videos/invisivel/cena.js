// Tem empresa precisando de você. Pra ela, você é invisível (canal Mappoa).
// O Vitor fica TRANSPARENTE na frente do salão (os materiais dele são clonados e a opacidade cai), a dona olha através
// dele e acena pro rival de moletom vermelho; na virada ele vai até ela e volta a ficar sólido. Quatro lugares
// (K.cenarios): o calçadão com a loja SALÃO, o quarto do Vitor, o salão de beleza por dentro e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, dona2, rival, robo, comp, telaC, telaM, navG, pino, FOV0;
  let cajG, moeda, contrato, carimbo, cadeira;
  const tudo = [], fx = {}, mats = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio do quarto, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  // Rua: a dona no meio do calçadão (perto da loja SALÃO), o Vitor na frente dela, o rival chegando por trás dele
  let DZ = -5, DONA_R = [-0.2, 0, -5];
  // Salão por dentro: a dona perto da cadeira do meio; a entrada; a dona do Studio Ininga perto da cadeira da esquerda
  const DONA_S = [0.7, 0, -1.6], ENTRADA = [3.2, 0, 4.2], RIV_S = [1.75, 0, -0.9], DONA2_S = [-2.3, 0, -1.4], VIT_S = [-1.2, 0, -0.7];

  const LUGAR = {
    gancho: 'rua', posta: 'quarto', salao: 'salao', rival: 'salao', vai: 'rua', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', antes_agora: 'rua', segue: 'quarto', cartao: 'quarto', capa: 'rua'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'rua' : 'salao';
    return LUGAR[B.plano] || 'quarto';
  }

  // O Salão Bella Fátima já fechou com o rival: na lista SEM SITE entram os outros
  const SALOES = [
    { nome: 'Studio Ininga Beauty', end: 'Rua Dep. Vitorino Correia, 1520', chips: ['whats', 'insta'] },
    { nome: 'Espaço Jóquei Hair', end: 'Av. Jóquei Clube, 710', chips: ['tel', 'insta'] },
    { nome: 'Salão Bela Centro', end: 'Rua Álvaro Mendes, 1290', chips: ['whats'] },
    { nome: 'Glam Piçarra', end: 'Av. Barão de Gurguéia, 2405', chips: ['whats', 'tel'] }
  ];

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

  // ---------- O Vitor transparente ----------
  // k = 0: normal · k = 1: quase sumido (opacidade 0,2), com um brilho azul claro
  function fantasma(k) {
    mats.forEach((m) => {
      m.transparent = k > 0.01;
      m.opacity = 1 - 0.8 * k;
      m.depthWrite = k < 0.5;
      if (m.emissive) m.emissive.setRGB(0.29 * k * 0.5, 0.59 * k * 0.5, 1.0 * k * 0.5);
    });
  }

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Vitor Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'portfólio', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // O post do Instagram: "Faço sites ✨" com 0 curtidas
  function post(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#f58529'); g.addColorStop(0.5, '#dd2a7b'); g.addColorStop(1, '#8134af');
    c.fillStyle = g; c.beginPath(); c.arc(w * 0.08, h * 0.09, h * 0.055, 0, PI * 2); c.fill();
    txt(c, '@vitor.webdesign', w * 0.15, h * 0.09, w * 0.04, '#111', 800);
    const d = c.createLinearGradient(0, h * 0.17, w, h * 0.72); d.addColorStop(0, '#2f6fd6'); d.addColorStop(1, '#2fb5a6');
    c.fillStyle = d; c.fillRect(w * 0.04, h * 0.17, w * 0.92, h * 0.55);
    txt(c, 'Faço sites ✨', w / 2, h * 0.44, w * 0.09, '#fff', 900, 'center');
    txt(c, '♡  💬  ➤', w * 0.06, h * 0.8, w * 0.05, '#111', 700);
    if (e.curtidas) txt(c, '0 curtidas', w * 0.06, h * 0.91, w * 0.055, '#e8352b', 900);
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

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], ['salao_beleza', {}, 'salao'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    // a loja SALÃO do calçadão; a dona fica logo depois de uma árvore da direita (z = 26 - 14k + 0,5)
    const sal = (Cr.lojas || []).find((l) => l.id === 'salao');
    if (sal) DZ = sal.porta[2];
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    DONA_R = [-0.6, 0, DZ];

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaSaloes = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: SALOES, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Salões de beleza · Teresina, PI', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseSalao = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Studio Ininga Beauty', ate: e.ate, aderencia: 0.88 * k,
        dores: ['Sem site próprio', 'Agenda só pelo WhatsApp'], oportunidades: ['Site com serviços, preços e agendamento online'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre quem procura salão no bairro e não acha os preços.'
      });
      if (e.ate >= 0) txt(c, Math.round(88 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Vitor (do canal), a dona do Salão Bella Fátima, a dona do Studio Ininga, o rival e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    // os materiais do Vitor viram só dele, pra ele poder ficar transparente sem apagar mais ninguém
    menino.g.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => mats.push(m));
    });
    dona = K.personagem('cabeleireira'); K.semNome(dona.g); K.nomear('dona', dona.g);
    dona2 = K.personagem('dona', { cores: { blazer: 0xe8537a, vestido: 0xffffff } }); K.semNome(dona2.g); K.nomear('dona2', dona2.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cajuína e a moeda, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    // a cadeira giratória do Vitor, na frente do computador (sem ela ele senta no ar)
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    cajG = new THREE.Group();
    const vidro = K.mat(0xd08a2a, { roughness: 0.25, metalness: 0.1 });
    const corpo = K.malha(new THREE.CylinderGeometry(0.075, 0.075, 0.24, 22), vidro); corpo.position.y = 0.12; cajG.add(corpo);
    const ombro = K.malha(new THREE.CylinderGeometry(0.03, 0.075, 0.08, 22), vidro); ombro.position.y = 0.28; cajG.add(ombro);
    const gargalo = K.malha(new THREE.CylinderGeometry(0.028, 0.03, 0.07, 16), vidro); gargalo.position.y = 0.355; cajG.add(gargalo);
    const tampa = K.malha(new THREE.CylinderGeometry(0.032, 0.032, 0.025, 16), K.mat(0xc9ccd1, { metalness: 0.6, roughness: 0.3 })); tampa.position.y = 0.4; cajG.add(tampa);
    const rot = K.malha(new THREE.CylinderGeometry(0.077, 0.077, 0.09, 22), K.mat(0xf4f1ea, { roughness: 0.8 })); rot.position.y = 0.12; cajG.add(rot);
    K.scene.add(cajG); K.nomear('cajuina', cajG); tudo.push(cajG);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 }));
    K.scene.add(moeda); tudo.push(moeda);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    pino = K.m3d('pino'); guarda(pino, 'pino', [0.9, 2.2, 0.3], 0.8);

    // Salão: o contrato do rival com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Salão Bella Fátima', w / 2, h * 0.22, w * 0.06, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    K.scene.add(contrato); K.nomear('contrato', contrato); tudo.push(contrato);

    // Efeitos
    fx.fala = K.balaoFala(); fx.fala2 = K.balaoFala();
    fx.pensa = K.balaoPensamento();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      invisivel: e('Invisível', 'azul'), web: e('Web designer', 'azul'), curtidas: e('0 clientes', 'vermelho'), semSite: e('Sem site', 'vermelho'),
      outro: e('Outro web designer', 'vermelho'), vai: e('Vai até ela', 'verde'), investir: e('Investir', 'azul'),
      teresina: e('Teresina', 'azul'), precisa: e('Quem precisa de você', 'verde'), primeiro: e('Primeiro!', 'verde'), cidade: e('Sua cidade?', 'laranja')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>a sua cidade</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  // A cena da rua: a dona olhando através do Vitor transparente e acenando pro rival
  const VIT_R = () => [0.15, 0, DZ + 1.4];
  function ruaInvisivel(tc, k, rivalK) {
    rival.irPara([-0.9, 0, DZ + 6.0], [-0.9, 0, DZ + 3.4], K.clamp(rivalK), tc, { reto: true });
    rival.humor('feliz');
    dona.colocar(DONA_R, cabecaDe(rival, -1.3));
    dona.humor('feliz');
    menino.colocar(VIT_R(), cabecaDe(dona, -1.3));
    fantasma(k);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a dona na porta do SALÃO com o balão "Preciso de um site!"; o Vitor transparente acenando na frente dela; ela acena pro rival através dele · MOSTRA: dona, personagem, rival
      const tPr = quando('precisando', B, 0.2), tEla = quando('ela', B, 0.55), tIn = quando('invisível', B, 0.85);
      const k = K.suave(pc(tc, tIn - 0.35, tIn + 0.15));
      const c1 = B.inicio + 0.9, c2 = Math.min(tEla + 0.45, B.ate - 1.0);
      ruaInvisivel(tc, k, pc(tc, c2, B.ate));
      // PERSONAGEM: o Vitor acena e pula · em "invisível": mão na testa. A dona procura · em "ela": acena pro rival
      if (tc < tIn) { menino.acenar(tc); menino.g.position.y = Math.abs(Math.sin(tc * 8)) * 0.08; } else menino.reagir('mao_na_testa', tc - tIn);
      if (tc > tEla) dona.acenar(tc); else dona.reagir('segurando', tc - B.inicio);
      if (tc > tEla) rival.acenar(tc);
      // EFEITOS VISUAIS: os balões · "Invisível" em "invisível"
      if (tc > B.inicio + 0.9) fx.fala.em(cabecaDe(dona, 0.35), tc - B.inicio - 0.9 + 0.3, { texto: 'Preciso de um site!', lado: -1 });
      if (tc < tIn) fx.fala2.em(cabecaDe(menino, 0.35), tc - tPr, { texto: 'Oi! Faço sites!', lado: 1 });
      fx.et.invisivel.em(cabecaDe(menino, 0.75), tc - tIn);
      // SONS
      K.som('estalo', B.inicio, 0.4); K.som('whoosh', tPr, 0.3); K.som('zap', tIn - 0.2, 0.5);
      // CÂMERA: 3 cortes: (1) o Vitor acenando, de frente · (2) o rosto da dona através dele · (3) os três, fixo no meio do calçadão
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([1.6, 1.6, DZ - K.lerp(3.6, 3.2, q)], [0.15, 1.25, DZ + 1.4]); }
      else if (tc < c2) { rival.g.visible = false; const q = K.suave(pc(tc, c1, c2)); K.mirar([-2.2, 1.7, DZ + K.lerp(4.9, 4.5, q)], [-0.2, 1.3, DZ + 0.7]); }
      else { const q = K.suave(pc(tc, c2, B.ate)); K.mirar([0.6, 1.9, DZ + K.lerp(8.4, 7.8, q)], [-0.1, 1.25, DZ + 1.8]); }
    },
    posta(B, tc) {
      // NA TELA: o quarto; o Vitor no computador com o portfólio, depois o post "Faço sites ✨" com 0 curtidas; ele olha o relógio · MOSTRA: personagem, monitor
      const tW = quando('designer', B, 0.12), tPo = quando('posta', B, 0.62), tEs = quando('esperando', B, 0.75), tVe = quando('ver', B, 0.92);
      ve(comp); fantasma(0);
      sentado(MONITOR);
      if (tc > tEs) menino.reagir('olha_relogio', tc - tEs); else menino.reagir('digitando', tc);
      menino.humor(tc > tEs ? 'triste' : 'feliz');
      if (tc < tPo) comp.tela.desenhar(siteDemo, 'demo');
      else comp.tela.desenhar((c, w, h) => post(c, w, h, { curtidas: tc > tVe - 0.3 }), 'post' + (tc > tVe - 0.3));
      if (tc < tPo) fx.et.web.em(cabecaDe(menino, 0.55), tc - tW); else fx.et.curtidas.em(mais(MONITOR, [0.6, 0.75, 0.3]), tc - tVe + 0.2);
      for (let k = 0; k < 8; k++) K.som('clique', B.inicio + 0.1 + k * 0.15, 0.25);
      K.som('brilho', tPo, 0.35); K.som('ding', tVe, 0.3);
      // CÂMERA: (1) chegando · perto · direita · olho · (2) passando · médio · esquerda · olho
      const cv = (tW + tPo) / 2 + 0.3;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 32, altura: 'olho', tam: 1.4 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, mais(MONITOR, [0, 0.4, 0])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -34, altura: 'olho', tam: 1.8 });
    },
    salao(B, tc) {
      // NA TELA: o salão por dentro; a dona perto da cadeira do meio, com o pensamento "Web designer? Nunca vi."; "Sem site" · MOSTRA: dona
      const tSa = quando('salão', B, 0.3), tNu = quando('nunca', B, 0.6), tOu = quando('ouviu', B, 0.7);
      dona.colocar(DONA_S, [1.4, 1.4, 6]);
      dona.humor('normal');
      if (tc > tNu) dona.reagir('ombros', tc - tNu); else { dona.reagir('segurando', tc - B.inicio); dona.g.rotation.y += Math.sin(tc * 4) * 0.12; }
      fx.et.semSite.em(cabecaDe(dona, 0.45), tc - tSa);
      fx.pensa.em(mais(cabecaDe(dona, 0.15), [0.35, 0, 0]), tc - tOu, { texto: 'Web designer? Nunca vi.' });
      K.som('estalo', tOu, 0.4); K.som('vapor', B.inicio + 0.1, 0.2);
      // CÂMERA: (1) chegando · perto · direita · olho · (2) girando · médio · esquerda · olho (o salão tem teto)
      const cv = (tSa + tNu) / 2;
      if (tc < cv) K.filmar([dona, cabecaDe(dona, 0.3)], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 22, altura: 'olho', tam: 1.5 });
      else K.filmar([dona, cabecaDe(dona, 0.9), [0, 1.8, -4.2]], 'girando', pc(tc, cv, B.ate), { plano: 'medio', lado: -22, angulo: 18, altura: 'olho', tam: 2.4 });
    },
    rival(B, tc) {
      // NA TELA: o rival entra no salão, aperto de mão com a dona e o contrato FECHADO · MOSTRA: rival, dona, contrato
      const tDe = quando('designer', B, 0.35), tPo = quando('porta', B, 0.62), tFe = quando('fechou', B, 0.82), tSi = quando('site', B, 0.95);
      const kAnda = pc(tc, B.inicio, tPo + 0.1);
      rival.irPara(ENTRADA, RIV_S, kAnda, tc, { reto: true });
      if (kAnda >= 1) { rival.colocar(RIV_S, cabecaDe(dona, -1.3)); rival.apontar(0.35); }
      rival.humor('feliz');
      dona.colocar(DONA_S, cabecaDe(rival, -1.3)); dona.humor('feliz');
      if (tc > tSi) dona.reagir('vitoria', tc - tSi); else if (kAnda >= 1) dona.apontar(0.35);
      fx.et.outro.em(cabecaDe(rival, 0.5), tc - tDe);
      const meio = [(RIV_S[0] + DONA_S[0]) / 2, 1.95, (RIV_S[2] + DONA_S[2]) / 2 + 0.3];
      K.som('passo', B.inicio + 0.3, 0.3); K.som('passo', B.inicio + 0.6, 0.3); K.som('baque', tFe, 0.6); K.som('certo', tSi, 0.4);
      // CÂMERA: (1) atrás do rival entrando · (2) chegando · médio · esquerda · olho no aperto de mão
      if (tc < tPo) K.filmar([rival, cabecaDe(rival, 0.2), dona], 'chegando', pc(tc, B.inicio, tPo), { plano: 'medio', lado: 'tras', altura: 'olho', tam: 2.4 });
      else K.filmar([rival, dona, meio], 'chegando', pc(tc, tPo, B.ate), { plano: 'medio', lado: -25, altura: 'olho', tam: 2.4 });
      contrato.visible = tc > tFe - 0.35;
      contrato.position.set(...meio); contrato.lookAt(K.camera.position);
      contrato.scale.setScalar(pop(tc - tFe + 0.35));
      carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
    },
    vai(B, tc) {
      // NA TELA: a rua; o Vitor transparente parado; em "vai" ele anda decidido até o salão e volta a ficar sólido · MOSTRA: personagem
      const tVa = quando('vai', B, 0.55), tEl = quando('ela', B, 0.9);
      const k = 1 - K.suave(pc(tc, tVa, tEl + 0.1));
      fantasma(k);
      const anda = pc(tc, tVa - 0.1, B.ate);
      menino.irPara([0.6, 0, DZ + 5.2], [0.4, 0, DZ + 2.4], anda, tc, { reto: true });
      if (anda <= 0) { menino.reagir('mao_na_testa', tc - B.inicio); menino.humor('triste'); } else menino.humor('bravo');
      if (k < 0.5) fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
      fx.et.vai.em(cabecaDe(menino, 0.6), tc - tEl);
      K.som('passo', tVa + 0.1, 0.35); K.som('passo', tVa + 0.4, 0.35); K.som('brilho', tEl, 0.6);
      // CÂMERA: fixa no meio do calçadão, do lado do salão, vendo ele chegar
      const q = K.suave(pc(tc, B.inicio, B.ate));
      K.mirar([0.15, 1.6, DZ - K.lerp(2.2, 1.6, q)], [0.5, 1.2, DZ + K.lerp(5.0, 2.6, q)]);
    },
    investe(B, tc) {
      // NA TELA: o quarto; ele de pé com a cajuína; ela vira moeda e cai no computador; no monitor, o mapa com os pinos · MOSTRA: personagem, cajuina, monitor
      const tDe = quando('decide', B, 0.15), tIn = quando('investir', B, 0.22), tCa = quando('cajuína', B, 0.32), tFe = quando('ferramenta', B, 0.5), tPr = quando('precisa', B, 0.8);
      ve(comp); fantasma(0);
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tDe) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tDe); else menino.reagir('digitando', tc);
      menino.humor(tc > tDe ? 'feliz' : 'normal');
      const mao = menino.mao(1), cajPos = mais(mao, [0.03, 0.02, 0.08]);
      if (tc > tCa - 0.35 && tc < tFe) { ve(cajG); cajG.position.set(...cajPos); cajG.rotation.set(0, tc * 0.8, 0.15); cajG.scale.setScalar(pop(tc - tCa + 0.35)); }
      if (tc > tFe) {
        fx.poof.em(mais(cajPos, [0, 0.2, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(cajPos[0], TECLADO[0], q), K.lerp(cajPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(cajPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tPr ? Math.min(6, 1 + Math.floor((tc - tPr) / 0.12)) : 1;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tPr + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) chegando · médio · nele com a cajuína · (2) subindo · médio · frente, na tela
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), cajPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista dos salões de Teresina sobe do computador · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.08), tDi = quando('digita', B, 0.18), tL = quando('lista', B, 0.6), tSa = quando('salões', B, 0.7), tTe = quando('Teresina', B, 0.82);
      ve(comp, navG); fantasma(0);
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tSa ? 1 + Math.floor((tc - tSa) / 0.22) : 0;
        telaC.mostrar('listaSaloes', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tSa + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.teresina.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tTe);
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Studio Ininga; o robô à esquerda; o Vitor à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      fantasma(0);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseSalao', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
      // NA TELA: (1) Antes: a rua, ele transparente, a dona olhando através dele; (2) Agora: no salão, ele sólido mostrando a análise pra dona2; o rival chega atrasado na porta · MOSTRA: personagem, dona2, rival
      const tA = quando('Agora', B, 0.45), tCh = quando('chega', B, 0.7), tPr = quando('primeiro', B, 0.88);
      if (tc < tA) {
        ruaInvisivel(tc, 1, 1);
        dona.acenar(tc); rival.acenar(tc); menino.reagir('mao_na_testa', tc - B.inicio);
        K.som('zap', B.inicio + 0.1, 0.3);
        // CÂMERA: (1) fixa no meio do calçadão, um pouco mais de lado que no gancho
        const q = K.suave(pc(tc, B.inicio, tA));
        K.mirar([K.lerp(0.9, 0.7, q), 1.75, DZ + 7.6], [-0.1, 1.25, DZ + 1.6]);
      } else {
        fantasma(0);
        // ele mostra a análise pra dona do Studio Ininga; ela faz joia; o rival chega atrasado na porta
        menino.colocar(VIT_S, cabecaDe(dona2, -1.3)); menino.humor('feliz');
        dona2.colocar(DONA2_S, cabecaDe(menino, -1.3)); dona2.humor('feliz');
        if (tc > tPr) dona2.reagir('vitoria', tc - tPr);
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.2, m[1] + 0.5, m[2] + 0.05); telaM.g.rotation.set(0, -0.6, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tA));
        telaM.mostrar('analiseSalao', { ate: 2, score: 1 });
        menino.reagir('mostrando', tc - tA);
        const kr = pc(tc, tA, tCh + 0.2);
        rival.irPara([2.4, 0, 4.2], [1.5, 0, 0.9], kr, tc, { reto: true });
        if (kr >= 1) { rival.colocar([1.5, 0, 0.9], cabecaDe(menino, -1.3)); rival.reagir('mao_na_testa', tc - tCh - 0.2); rival.humor('triste'); }
        if (tc > tPr) fx.simb.em(mais(VIT_S, [-0.5, 2.5, 0.3]), tc - tPr, { tipo: '✓', tam: 1.0 });
        fx.et.primeiro.em(mais(VIT_S, [-0.5, 3.2, 0.3]), tc - tPr);
        K.som('whoosh', tA, 0.5); K.som('certo', tPr, 0.6);
        // CÂMERA: (2) chegando · médio · frente · olho
        K.filmar([menino, dona2, rival, cabecaDe(menino, 0.3)], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: 15, altura: 'olho', tam: 2.4 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Vitor de pé no quarto; "Comenta a sua cidade" e o pino; o cartão de seguir; mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tCi = quando('cidade', B, 0.12), tSg = quando('segue', B, 0.3), tPc = quando('computador', B, 0.45), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fantasma(0);
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
      fantasma(0);
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // o Vitor transparente, de lado pra câmera, com a mão na testa; a dona acenando através dele pro rival
      ruaInvisivel(0.8, 1, 1);
      dona.acenar(0.8); rival.acenar(0.8); menino.reagir('mao_na_testa', 0.6);
      fx.fala.em(cabecaDe(dona, 0.35), 1, { texto: 'Preciso de um site!', lado: -1 });
      K.mirar([0.15, 1.85, DZ + 7.9], [-0.35, 1.3, DZ + 1.9]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona, dona2, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    fantasma(0);
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    if (plano !== 'capa' && lugarDe(B, tc) === 'quarto') { if (!cadeira.visible) { cadeira.position.set(SEAT[0], 0, SEAT[2] + 0.3); cadeira.rotation.set(0, PI, 0); ve(cadeira); } }
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
