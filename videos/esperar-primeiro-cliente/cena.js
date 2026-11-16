// Se você esperar o primeiro cliente aparecer, vai ficar assim (canal Mappoa).
// Cinco lugares no mesmo vídeo (K.cenarios): o quarto de dia e de noite, a fachada da pizzaria, a rua entre prédios e o
// palco do Mappoa. A barba e a teia de aranha são feitas aqui. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, pizzaiolo, rival, robo, comp, cel, desp, cadeira, tesoura, telaC, telaM, navG, FOV0;
  let barbaG, barbaTopo, teia, aranha, fio;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Bruno (com mesa) no meio do quarto, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const OLHA_CAM = [1.6, 1.1, 3.4];             // pra onde ele fica virado dormindo (a cadeira girada pra câmera)
  const CEL = [-1.6, 0, -0.1], DESP = [-0.08, 0.76, -1.2], EM_PE = [0.65, 0, -0.45];
  const TELA_Q = [-1.0, 1.45, -0.4];
  // Pizzaria (fachada): a porta em x DX; o pizzaiolo na calçada, o outro web designer chega pela esquerda
  let DX = 0, PZ = [1.2, 0, 2.2], RIVAL_F = [-0.2, 0, 2.3], BRUNO_F = [-0.2, 0, 2.4];
  // Rua entre prédios: a porta da PIZZARIA
  let RUA_PZ = [0.9, 0, -10];

  const LUGAR = {
    gancho: 'quarto', disponivel: 'quarto', esperando: 'quarto', pizzaria: 'pizzaria', outro: 'rua', decide: 'quarto',
    lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'quarto'
  };
  // O lugar de cada instante (as trocas dentro da frase ficam aqui, antes do plano)
  function lugarDe(B, tc) {
    if (B.plano === 'esperando') {
      const tD = quando('dia', B, 0.12), tS = quando('semana', B, 0.3), tM = quando('mês', B, 0.48), tE = quando('celular', B, 0.7);
      if (tc > tD && tc < tS) return 'quarto_noite';
      if (tc > tM && tc < tE) return 'quarto_noite';
      return 'quarto';
    }
    if (B.plano === 'outro') return tc < quando('atrás', B, 0.55) ? 'rua' : 'pizzaria';
    if (B.plano === 'antes_agora') { const tA = quando('Agora', B, 0.45), tC = quando('chega', B, 0.72); return tc < tA ? 'quarto' : tc < tC ? 'rua' : 'pizzaria'; }
    return LUGAR[B.plano] || 'quarto';
  }

  const PIZZAS = [
    { nome: 'Pizzaria Forno da Vila', end: 'Rua Mateus Leme, 812', chips: ['whats', 'tel'] },
    { nome: 'Bella Massa Pizzaria', end: 'Av. Sete de Setembro, 3020', chips: ['tel', 'insta'] },
    { nome: 'Pizza do Largo', end: 'Rua São Francisco, 145', chips: ['whats'] },
    { nome: 'Nonna Rosa Pizzas', end: 'Av. República Argentina, 1990', chips: ['whats', 'insta'] }
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

  // ---------- Telas desenhadas ----------
  // O monitor dormindo (tela escura) e o site de exemplo
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); txt(c, 'Nenhuma mensagem', w / 2, h / 2, w * 0.07, '#4a5568', 700, 'center'); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Bruno Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites bonitos e rápidos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // O post no celular gigante: "Faço sites! Chama no direct", com zero curtidas
  function post(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.05, '#111', 800);
    c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.13, h * 0.1, w * 0.06, 0, 7); c.fill();
    txt(c, 'bruno.webdesign', w * 0.23, h * 0.1, w * 0.055, '#111', 800, 'left', w * 0.7);
    if (e.ok) {
      const d = c.createLinearGradient(0, h * 0.15, 0, h * 0.6); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6');
      c.fillStyle = d; c.fillRect(0, h * 0.15, w, h * 0.45);
      txt(c, 'FAÇO', w / 2, h * 0.3, w * 0.18, '#fff', 900, 'center'); txt(c, 'SITES!', w / 2, h * 0.43, w * 0.18, '#fff', 900, 'center');
      txt(c, 'Chama no direct', w / 2, h * 0.53, w * 0.07, '#fff', 800, 'center');
      txt(c, '♡  ' + (e.curt || 0) + ' curtidas', w * 0.08, h * 0.66, w * 0.065, '#111', 800);
      txt(c, 'Tô disponível pra novos clientes', w * 0.08, h * 0.73, w * 0.05, '#4a4f58', 700, 'left', w * 0.86);
    } else { txt(c, 'Publicando...', w / 2, h * 0.38, w * 0.07, '#9aa0a6', 700, 'center'); }
  }
  // A tela travada: zero mensagens
  function vazio(c, w, h, e) {
    const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, e.noite ? '#0e1630' : '#3a6fd8'); d.addColorStop(1, '#4b3a8f'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, e.hora || '9:41', w / 2, h * 0.14, w * 0.2, '#fff', 300, 'center');
    txt(c, e.data || 'Dia 1', w / 2, h * 0.22, w * 0.06, 'rgba(255,255,255,.85)', 700, 'center');
    txt(c, '0', w / 2, h * 0.48, w * 0.42, '#ffffff', 900, 'center');
    txt(c, 'mensagens', w / 2, h * 0.62, w * 0.09, '#ffffff', 800, 'center');
  }
  // A teia de aranha: fios saindo do canto de cima e os anéis
  function desenhaTeia(c, w, h) {
    c.clearRect(0, 0, w, h);
    c.strokeStyle = 'rgba(255,255,255,0.92)'; c.lineWidth = 3; c.lineCap = 'round';
    const raios = 9, R = w * 1.02;
    const ang = (i) => (i / (raios - 1)) * (PI / 2);
    for (let i = 0; i < raios; i++) { c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(ang(i)) * R, Math.sin(ang(i)) * R); c.stroke(); }
    c.lineWidth = 2.2;
    for (let a = 1; a <= 7; a++) {
      const r0 = (a / 7.5) * R; c.beginPath();
      for (let i = 0; i < raios; i++) { const r = r0 * (0.93 + ((i * 37 + a * 11) % 10) / 70); const x = Math.cos(ang(i)) * r, y = Math.sin(ang(i)) * r; if (i === 0) c.moveTo(x, y); else c.quadraticCurveTo(Math.cos(ang(i - 0.5)) * r * 0.9, Math.sin(ang(i - 0.5)) * r * 0.9, x, y); }
      c.stroke();
    }
  }

  // ---------- A barba (cresce do queixo até o chão e enrola no tapete) ----------
  const barbaMat = () => K.mat(0xf2f1ec, { roughness: 0.95 });
  function barba(k) {
    if (k <= 0.001) return;
    barbaTopo.visible = true;
    barbaTopo.scale.setScalar(K.lerp(0.55, 1, K.clamp(k * 3)));
    if (k < 0.06) return;
    menino.g.updateMatrixWorld(true);
    const q = menino.cabeca.localToWorld(V(0, -0.27, 0.1));
    const r = menino.g.rotation.y, f = V(Math.sin(r), 0, Math.cos(r)), lado = V(Math.cos(r), 0, -Math.sin(r));
    const b = menino.g.position.clone(); b.y = 0;
    const em = (fw, y, s = 0) => b.clone().addScaledVector(f, fw).addScaledVector(lado, s).setY(y);
    const pts = [q, q.clone().addScaledVector(f, 0.1).setY(q.y - 0.22), em(0.36, 0.62), em(0.52, 0.34), em(0.62, 0.06)];
    const Q = em(0.92, 0, 0.05);
    for (let i = 0; i <= 14; i++) {
      const a = -PI / 2 + i * 0.6, rad = 0.3 * (1 - i / 18);
      pts.push(Q.clone().addScaledVector(f, Math.sin(a) * rad).addScaledVector(lado, Math.cos(a) * rad).setY(0.05 + i * 0.006));
    }
    // três mechas: a do meio grossa e as dos lados mais finas, todas afinando até a ponta
    while (barbaG.children.length) { const m = barbaG.children.pop(); m.geometry.dispose(); }
    [[0, 0.095], [-1, 0.06], [1, 0.06]].forEach(([l, raio], j) => {
      const ps = pts.map((p, i) => { const abre = i === 0 ? 0.04 : i < 5 ? 0.075 : 0.03; return p.clone().addScaledVector(lado, l * abre).setY(p.y + (i >= 5 ? j * 0.012 : 0)); });
      const todos = new THREE.CatmullRomCurve3(ps).getSpacedPoints(80), n = Math.max(3, Math.ceil(todos.length * K.clamp(k)));
      const parte = new THREE.CatmullRomCurve3(todos.slice(0, n)), seg = Math.max(4, n), rad = 10;
      const geo = new THREE.TubeGeometry(parte, seg, raio, rad, false), pos = geo.attributes.position, c = new THREE.Vector3(), v = new THREE.Vector3();
      for (let i = 0; i <= seg; i++) {
        parte.getPointAt(i / seg, c); const u = (i / seg) * (n / todos.length), s = K.lerp(1.35, 0.45, u) * (i === seg ? 0.3 : 1);
        for (let r = 0; r <= rad; r++) { const id = i * (rad + 1) + r; v.fromBufferAttribute(pos, id).sub(c).multiplyScalar(s).add(c); pos.setXYZ(id, v.x, v.y, v.z); }
      }
      geo.computeVertexNormals();
      const m = K.malha(geo, fx.matBarba); m.castShadow = true; barbaG.add(m);
    });
    barbaG.visible = true;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['home_office', { hora: 'noite' }, 'quarto_noite'], ['fachada', { loja: 'pizzaria' }, 'pizzaria'], ['rua_predios', {}, 'rua'], 'mundo_mappoa']);
    const Cf = CS.todos.pizzaria; DX = Cf.lugares.porta[0];
    PZ = [DX + 1.25, 0, 2.25]; RIVAL_F = [DX - 0.15, 0, 2.35]; BRUNO_F = [DX - 0.15, 0, 2.4];
    if (Cf.objetos && Cf.objetos.fachada) K.nomear('pizzaria', Cf.objetos.fachada);
    const Cr = CS.todos.rua; if (Cr.lugares.pizzaria) RUA_PZ = Cr.lugares.pizzaria;

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaPizzas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: PIZZAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Pizzarias · Curitiba, PR', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analisePizza = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Pizzaria Forno da Vila', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site próprio', 'Cardápio só em foto'], oportunidades: ['Site com cardápio e pedido pelo WhatsApp'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre quem procura pizza no Google e acha outra pizzaria.'
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

    // Personagens: o Bruno (do canal), o pizzaiolo, o outro web designer e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    pizzaiolo = K.personagem('pizzaiolo'); K.semNome(pizzaiolo.g); K.nomear('pizzaiolo', pizzaiolo.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xf08a24, punho: 0xd9731a, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xc98d5e } });
    K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // A barba: o topo preso no queixo (com o bigode) e a parte comprida feita de novo a cada quadro
    fx.matBarba = barbaMat();
    barbaTopo = new THREE.Group();
    const queixo = K.malha(new THREE.SphereGeometry(0.15, 18, 14), fx.matBarba); queixo.scale.set(1.2, 1.35, 0.85); queixo.position.set(0, -0.2, 0.12); barbaTopo.add(queixo);
    const bigode = K.malha(new THREE.CapsuleGeometry(0.035, 0.16, 6, 12).rotateZ(PI / 2), fx.matBarba); bigode.position.set(0, -0.085, 0.205); barbaTopo.add(bigode);
    menino.cabeca.add(barbaTopo); barbaTopo.visible = false;
    barbaG = new THREE.Group(); K.scene.add(barbaG); K.nomear('barba', barbaG);

    // Quarto: o computador com a mesa, a teia no canto do monitor, a aranha no fio, a cadeira, o celular gigante e o despertador
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    const cv = document.createElement('canvas'); cv.width = cv.height = 512; desenhaTeia(cv.getContext('2d'), 512, 512);
    const texTeia = new THREE.CanvasTexture(cv); texTeia.colorSpace = THREE.SRGBColorSpace;
    teia = new THREE.Group();
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ map: texTeia, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
    pl.position.set(-0.12, -0.12, 0); teia.add(pl);
    const pl2 = pl.clone(); pl2.scale.set(-0.8, 0.8, 1); pl2.position.set(0.62, -0.1, 0); teia.add(pl2);
    teia.position.set(-0.37 - 0.0, comp.y0 + 0.67, -0.095);
    comp.g.add(teia); K.nomear('teia', teia);
    aranha = new THREE.Group();
    const preto = K.mat(0x15161a, { roughness: 0.6 });
    const corpoA = K.malha(new THREE.SphereGeometry(0.04, 12, 10), preto); aranha.add(corpoA);
    const cabA = K.malha(new THREE.SphereGeometry(0.024, 10, 8), preto); cabA.position.set(0, 0.035, 0.02); aranha.add(cabA);
    for (let i = 0; i < 8; i++) { const l = i < 4 ? -1 : 1, j = i % 4; const p = K.malha(new THREE.BoxGeometry(0.11, 0.008, 0.008), preto); p.position.set(l * 0.055, 0.005 - j * 0.006, -0.03 + j * 0.022); p.rotation.set(0, l * (j - 1.5) * 0.3, -l * 0.5); aranha.add(p); }
    [-1, 1].forEach((l) => { const o = K.malha(new THREE.SphereGeometry(0.008, 6, 6), K.mat(0xffffff)); o.position.set(l * 0.01, 0.045, 0.04); aranha.add(o); });
    fio = K.malha(new THREE.CylinderGeometry(0.0025, 0.0025, 1, 4), K.mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.4 }));
    comp.g.add(aranha, fio);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CEL);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    tesoura = K.m3d('tesoura'); guarda(tesoura, 'tesoura', [0, 1, 0], 0.8);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Efeitos
    fx.folhas = K.folhasVento(77, 46, { papel: true });
    fx.rajada = K.folhasVento(91, 26, { papel: true });
    fx.cont = K.contador();
    fx.pensa = K.balaoPensamento(); K.nomear('pensamento', fx.pensa.g);
    fx.duvida = K.balaoPensamento();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      dia365: e('Dia 365', 'vermelho'), web: e('Web designer', 'azul'), sites: e('Faço sites!', 'verde'), zero: e('0 mensagens', 'vermelho'),
      semSite: e('Sem site', 'vermelho'), quem: e('Bruno? Quem?', 'laranja'), foi: e('Foi atrás', 'vermelho'), fechou: e('Fechou', 'verde'),
      bora: e('Bora!', 'verde'), curitiba: e('Curitiba', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      esperando: e('Esperando', 'vermelho'), primeiro: e('Chegou primeiro', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Você tá esperando ou indo atrás? <em>Comenta aí</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  // O Bruno sentado: na frente do computador (pc) ou com a cadeira girada pra câmera (dormindo)
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || OLHA_CAM);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  // A teia e a aranha descendo no fio (desce = quanto já desceu, de 0 a 1)
  function aranhaEm(desce, t) {
    teia.visible = true; aranha.visible = true; fio.visible = true;
    const y0 = comp.y0 + 0.67, L = 0.05 + 0.32 * desce + Math.sin(t * 5) * 0.01 * desce;
    aranha.position.set(0.1, y0 - L, -0.07); aranha.rotation.set(0, Math.sin(t * 1.3) * 0.3, 0);
    fio.scale.set(1, L, 1); fio.position.set(0.1, y0 - L / 2, -0.07);
  }
  const sala = (tc, forca = 1) => fx.folhas.em([0, 0, -0.4], tc, { largura: 9, forca });
  function celTela(fn, chave) { const a = cel.userData.m3d; a.tela.desenhar(fn, chave); }

  const P = {
    gancho(B, tc) {
      // NA TELA: o Bruno dormindo na cadeira, a barba até o chão enrolada no tapete; a teia no monitor; as folhas voando · MOSTRA: personagem, barba, teia
      // CENÁRIO: o quarto de dia; a janela, o ring light, a mesa (o cenário cuida)
      const tCl = quando('cliente', B, 0.45), tAp = quando('aparecer', B, 0.62), tAs = quando('assim', B, 0.9);
      ve(comp); comp.tela.desenhar(telaEscura, 'escura');
      // PERSONAGEM: começo dormindo, os Zzz · em "assim": acorda de susto
      sentado(OLHA_CAM);
      if (tc > tAs) { menino.reagir('susto', tc - tAs); menino.g.rotation.y += Math.sin(K.clamp((tc - tAs) / 0.3) * PI) * 0.12; } else menino.reagir('dormindo', tc);
      barba(1);
      // ENTRA AGORA: a aranha desce em "cliente"; a rajada de folhas passa em "aparecer"
      aranhaEm(K.suave(pc(tc, tCl, tCl + 0.5)), tc);
      sala(tc + 3);
      // CÂMERA: 4 cortes de ~0,75 s (a barba subindo, a teia, as folhas, o quadro inteiro)
      const d = B.dur, c1 = B.inicio + d * 0.25, c2 = B.inicio + d * 0.48, c3 = B.inicio + d * 0.7;
      const queixo = cabecaDe(menino, -0.35), poca = mais(SEAT, [0.55, 0.1, 0.8]), teiaP = mais(MONITOR, [-0.28, 0.17, 0.05]);
      if (tc < c1) {
        K.filmar([poca, queixo], 'subindo', pc(tc, B.inicio, c1), { plano: 'perto', lado: 40, altura: 'baixo', tam: 0.9, obstaculos: false });
      } else if (tc < c2) {
        K.filmar([teiaP, mais(teiaP, [0.15, -0.3, 0])], 'chegando', pc(tc, c1, c2), { plano: 'perto', lado: -25, altura: 'olho', tam: 0.6 });
      } else if (tc < c3) {
        fx.rajada.em(mais(SEAT, [0.6, -0.2, 1.6]), tc * 1.6 + 2, { largura: 4, forca: 1 });
        K.filmar([cabecaDe(menino, 0), mais(SEAT, [0, 0.6, 0.4])], 'passando', pc(tc, c2, c3), { plano: 'perto', lado: 15, altura: 'olho', tam: 1.0, obstaculos: false });
        K.som('whoosh', c2, 0.6);
      } else {
        K.filmar([cabecaDe(menino, 0.3), poca, MONITOR, mais(SEAT, [0, 0.2, 0])], 'afastando', pc(tc, c3, B.ate), { plano: 'perto', lado: 30, altura: 'olho', espacoCima: 0.3, tam: 1.25 });
        fx.et.dia365.em(cabecaDe(menino, 0.55), tc - c3);
      }
      // SONS: whoosh das folhas em "aparecer" · susto em "assim"
      K.som('whoosh', tAp, 0.5); K.som('estalo', tAs, 0.6);
    },
    disponivel(B, tc) {
      // NA TELA: o quarto de dia, sem barba; o Bruno de pé e o celular gigante com o post "Faço sites!"; depois ele senta · MOSTRA: personagem, celular
      const tW = quando('designer', B, 0.22), tP = quando('Postou', B, 0.45), tSi = quando('sites', B, 0.58), tSe = quando('sentou', B, 0.72), tE = quando('esperar', B, 0.9);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      // ENTRA AGORA: o celular gigante sobe da mesa em "Postou"; o post aparece em "sites"
      ve(cel); K.entrar(cel, 'cresce', tc - tP, { dur: 0.35 });
      cel.rotation.set(0, Math.atan2(0.4 - CEL[0], 2.6 - CEL[2]), 0);
      celTela((c, w, h) => post(c, w, h, { ok: tc > tSi, curt: 0 }), 'post' + (tc > tSi));
      // PERSONAGEM: começo comemorando · em "Postou": aponta o celular · em "sentou": senta e cruza os braços
      if (tc < tSe) {
        menino.colocar([-0.45, 0, 0.35], tc > tP ? mais(CEL, [0, 1.0, 0]) : [1.2, 1.1, 4]);
        if (tc > tP) menino.apontar(0.7); else menino.reagir('comemorando', tc - B.inicio);
      } else {
        sentado(mais(CEL, [0, 1, 0])); menino.reagir('segurando', tc - tSe); menino.humor('feliz');
      }
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Faço sites!" em "sites"
      if (tc < tSi) fx.et.web.em(cabecaDe(menino, 0.5), tc - tW); else fx.et.sites.em(mais(CEL, [0, 1.95, 0]), tc - tSi);
      K.som('estalo', tP, 0.5); K.som('ding', tSi, 0.6); K.som('whoosh', tSe, 0.5);
      // CÂMERA: (1) passando · médio · esquerda · olho · (2) de "sentou": chegando · perto · frente · baixo
      if (tc < tSe) K.filmar([menino, mais(CEL, [0, 0.8, 0]), mais(CEL, [0, 1.6, 0])], 'passando', pc(tc, B.inicio, tSe), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.4 });
      else K.filmar([mais(SEAT, [0, 0.9, 0]), mais(CEL, [0, 0.8, 0]), mais(CEL, [0, 1.6, 0])], 'chegando', pc(tc, tSe, B.ate), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 1.4 });
      void tE;
    },
    esperando(B, tc) {
      // NA TELA: o Bruno sentado de frente pro celular "0 mensagens"; a janela trocando dia e noite; o despertador; o contador; a barba crescendo · MOSTRA: personagem, celular, barba
      const tD = quando('dia', B, 0.12), tS = quando('semana', B, 0.3), tM = quando('mês', B, 0.48), tE = quando('celular', B, 0.7), tV = quando('vibrou', B, 0.88);
      const noite = (tc > tD && tc < tS) || (tc > tM && tc < tE);
      ve(comp, cel, desp); comp.tela.desenhar(telaEscura, 'escura');
      cel.rotation.set(0, Math.atan2(0.4 - CEL[0], 2.6 - CEL[2]), 0);
      const dia = Math.round(K.lerp(1, 30, pc(tc, tD, tM)));
      celTela((c, w, h) => vazio(c, w, h, { noite, hora: noite ? '23:58' : '9:41', data: 'Dia ' + dia }), 'vazio' + noite + dia);
      if (tc > tV) cel.userData.m3d.vibrar(tc - tV, Math.max(0, 1 - (tc - tV) * 3));
      // OBJETOS SE MEXENDO: o despertador gira os ponteiros e toca em "dia"; a barba cresce de "dia" a "mês"; a teia surge em "semana"
      desp.userData.m3d.horas(7 + (tc - B.inicio) * 9);
      if (tc > tD && tc < tD + 0.6) desp.userData.m3d.tocar(tc - tD);
      barba(K.lerp(0.05, 1, K.suave(pc(tc, tD, tM + 0.2))));
      if (tc > tS) aranhaEm(K.clamp((tc - tS) / 0.8), tc);
      sala(tc, tc > tD ? 0.7 : 0.25);
      fx.cont.em(mais(SEAT, [0.1, 2.25, 0.2]), tc - tD, { de: 1, ate: 30, dur: Math.max(0.5, tM - tD), antes: 'Dia ', depois: '', cor: '#e8352b' });
      // PERSONAGEM: começo olha o relógio · em "semana": dormindo · em "vibrou": acorda e põe a mão na testa
      sentado(mais(CEL, [0, 0.9, 0]));
      if (tc > tV) menino.reagir('mao_na_testa', tc - tV); else if (tc > tS) menino.reagir('dormindo', tc); else menino.reagir('olha_relogio', tc - B.inicio);
      // EFEITOS VISUAIS: "0 mensagens" em "vibrou" (o congela em preto e branco o jogo faz)
      fx.et.zero.em(mais(CEL, [0, 1.95, 0]), tc - tV);
      for (let i = 0; i < 6; i++) K.som('ding', tD + i * 0.07, 0.25);
      K.som('whoosh', tS, 0.4); K.som('whoosh', tM, 0.4); K.som('pingo', tV, 0.5);
      // CÂMERA: (1) até "mês": girando · médio · direita · olho · (2) de "celular": chegando · perto · esquerda · olho
      if (tc < tE) K.filmar([cabecaDe(menino, 0.2), mais(SEAT, [0.4, 0.1, 0.8]), mais(CEL, [0, 1.5, 0])], 'girando', pc(tc, B.inicio, tE), { plano: 'perto', lado: 10, angulo: 30, altura: 'olho', tam: 1.3 });
      else K.filmar([mais(CEL, [0, 0.4, 0]), mais(CEL, [0, 1.6, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, tE, B.ate), { plano: 'perto', lado: -15, altura: 'olho', tam: 1.4 });
    },
    pizzaria(B, tc) {
      // NA TELA: a frente da pizzaria, as mesinhas vazias; o pizzaiolo na calçada com o balão "Cardápio só no papel..." · MOSTRA: pizzaria, pizzaiolo, pensamento
      // CENÁRIO: a fachada da pizzaria de dia; os carros passando (o cenário cuida)
      const tSi = quando('site', B, 0.35), tSa = quando('sabe', B, 0.6), tEx = quando('existe', B, 0.88);
      // PERSONAGEM: o pizzaiolo · começo encolhe os ombros · em "sabe": olha a rua dos dois lados
      if (tc > tSa) { const a = Math.sin((tc - tSa) * 4); pizzaiolo.colocar(PZ, [PZ[0] + a * 4, 1.4, 8]); pizzaiolo.humor('surpreso'); }
      else { pizzaiolo.colocar(PZ, [PZ[0] - 0.5, 1.2, 8]); pizzaiolo.reagir('ombros', tc - B.inicio); }
      // ENTRA AGORA: o balão em "site"; a etiqueta "Bruno? Quem?" em "existe"
      fx.pensa.em(cabecaDe(pizzaiolo, 0.15), tc - tSi, { texto: 'Cardápio só no papel...' });
      fx.et.semSite.em(mais(Cf().lugares.placa, [-1.6, -0.5, 0.6]), tc - tSi);
      if (tc > tEx) fx.simb.em(cabecaDe(pizzaiolo, 0.1), tc - tEx, { tipo: '?' });
      fx.et.quem.em(mais(PZ, [-1.5, 2.2, 0.4]), tc - tEx);
      K.som('estalo', tSi, 0.5);
      // CÂMERA: (1) até "site": chegando de frente, do outro lado da rua · (2) passando · perto · direita · baixo
      const cv = (tSi + tSa) / 2;
      if (tc < cv) K.filmar([Cf().lugares.placa, mais(PZ, [0, 0.2, 0]), mais(PZ, [0, 1.8, 0]), [DX - 2.5, 1, 1.5]], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 3.2 });
      else K.filmar([mais(PZ, [0, 0.9, 0]), cabecaDe(pizzaiolo, 1.2), mais(PZ, [-1.4, 2.2, 0.4])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: 30, altura: 'baixo', tam: 1.6 });
    },
    outro(B, tc) {
      // NA TELA: (1) a rua entre prédios, o outro web designer andando rápido até a PIZZARIA; (2) a fachada: o aperto de mão e o ✓ · MOSTRA: rival, pizzaiolo, pizzaria
      const tA = quando('atrás', B, 0.55), tF = quando('fecha', B, 0.85);
      if (tc < tA) {
        // CENÁRIO: a rua entre prédios, a gente andando (o cenário cuida)
        const de = [0.9, 0, RUA_PZ[2] + 16], ate = [0.9, 0, RUA_PZ[2] + 6];
        rival.irPara(de, ate, K.clamp((tc - B.inicio + 0.6) / (tA - B.inicio + 1.6)), tc, { reto: true });
        fx.vel.em(mais(rival.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: rival.g.rotation.y });
        for (let k = 0; k < 6; k++) K.som('passo', B.inicio + k * 0.22, 0.3);
        fx.et.foi.em(cabecaDe(rival, 0.4), tc - (tA - 0.6));
        // CÂMERA: (1) anda junto, atrás dele
        K.seguir(rival, { lado: 'tras', dist: 3.6, altura: 1.5 });
      } else {
        // a fachada: ele chega, aperta a mão do pizzaiolo; o pizzaiolo comemora
        rival.irPara(mais(RIVAL_F, [-1.4, 0, 0.2]), RIVAL_F, K.clamp((tc - tA) / 0.45), tc, { olhar: PZ });
        pizzaiolo.colocar(PZ, cabecaDe(rival, -0.4));
        if (tc > tF) { rival.reagir('mostrando', tc - tF); pizzaiolo.reagir(tc > tF + 0.4 ? 'comemorando' : 'mostrando', tc - tF); }
        else pizzaiolo.reagir('surpreso', tc - tA);
        Cf().porta.abrir(0);
        fx.simb.em(mais(PZ, [-0.7, 2.4, 0]), tc - tF, { tipo: '✓', tam: 1.3 });
        fx.poof.em(mais(PZ, [-0.7, 1.2, 0]), tc - tF, { escala: 0.8 });
        fx.et.fechou.em(mais(PZ, [-0.7, 3.2, 0]), tc - tF);
        K.som('ding', tA + 0.1, 0.5); K.som('certo', tF, 0.7);
        // CÂMERA: (2) parado · médio · esquerda · olho
        K.filmar([mais(RIVAL_F, [0, 1, 0]), mais(PZ, [0, 1, 0]), mais(PZ, [-0.7, 2.6, 0]), Cf().lugares.placa], 'parado', pc(tc, tA, B.ate), { plano: 'medio', lado: -22, altura: 'olho', tam: 2.6 });
        K.tremer(tc - tF, 0.4);
      }
    },
    decide(B, tc) {
      // NA TELA: o quarto de dia; o Bruno de barba corta com a tesoura; poof; levanta; o balão "Atrás de quem?" · MOSTRA: personagem, barba, tesoura
      const tC = quando('corta', B, 0.1), tB = quando('barba', B, 0.22), tD = quando('decide', B, 0.38), tQ = quando('quem', B, 0.88);
      ve(comp); comp.tela.desenhar(telaEscura, 'escura');
      // PERSONAGEM: começo sentado, cortando · em "decide": levanta e ergue o punho · em "quem": coça a cabeça
      if (tc < tD) {
        sentado(OLHA_CAM); menino.reagir('segurando', tc - B.inicio);
        if (tc < tB + 0.05) barba(1);
      } else {
        ve(cadeira); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, 0.6 + K.suave(pc(tc, tD, tD + 0.6)) * 1.2, 0);
        menino.colocar(mais(SEAT, [0.45, 0, 0.5]), [1.6, 1.1, 4]);
        if (tc > tQ) menino.reagir('coca_cabeca', tc - tQ); else menino.reagir('vitoria', tc - tD);
      }
      ve(tesoura); { const m = menino.mao(1); tesoura.position.set(m[0], m[1] + 0.02, m[2] + 0.05); tesoura.rotation.set(0.2, menino.g.rotation.y, -1.2 + (tc < tB + 0.1 ? Math.sin(tc * 22) * 0.25 : 0)); }
      fx.poof.em(cabecaDe(menino, -0.75), tc - tB, { escala: 1.4 });
      fx.poof2.em(mais(SEAT, [0.5, 0.2, 0.9]), tc - tB - 0.05, { escala: 1.2, som: false });
      // EFEITOS VISUAIS: "Bora!" em "decide" · o balão "Atrás de quem?" e os ? em "quem"
      if (tc < tQ) fx.et.bora.em(cabecaDe(menino, 0.5), tc - tD);
      else { fx.duvida.em(cabecaDe(menino, 0.05), tc - tQ, { texto: 'Atrás de quem?' }); fx.simb2.em(cabecaDe(menino, 0.1).map((v, i) => v + [-0.55, 0, 0.1][i]), tc - tQ - 0.1, { tipo: '?', som: false }); }
      for (let k = 0; k < 4; k++) K.som('clique', tC + k * 0.1, 0.4);
      K.som('whoosh', tD, 0.5);
      // CÂMERA: (1) até "barba": chegando · perto · frente · olho · (2) de "decide": subindo · médio · direita · baixo
      const cc = tB + 0.35;
      if (tc < cc) K.filmar([cabecaDe(menino, -0.1), cabecaDe(menino, -0.75), mais(SEAT, [0.5, 0.15, 0.9])], 'chegando', pc(tc, B.inicio, cc), { plano: 'perto', lado: 20, altura: 'olho', tam: 1.1 });
      else K.filmar([menino, cabecaDe(menino, 0.9)], 'subindo', pc(tc, cc, B.ate), { plano: 'medio', lado: 15, altura: 'baixo', tam: 2.2 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a lista das pizzarias sobe do computador; o Bruno ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.05), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tP = quando('pizzarias', B, 0.62), tCu = quando('Curitiba', B, 0.8);
      ve(comp, navG); comp.tela.desenhar(siteDemo, 'demo');
      // ENTRA AGORA: a barra em "digita" e as letras até "computador"; a lista sobe do monitor em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tP ? 1 + Math.floor((tc - tP) / 0.22) : 0;
        telaC.mostrar('listaPizzas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tP + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo digitando · em "vem": levanta e aponta a Pizzaria Forno da Vila
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.curitiba.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCu);
      // CÂMERA: (1) até "computador": por cima do ombro, olhando o endereço · (2) subindo · médio · frente · olho
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Pizzaria Forno da Vila; o robô à esquerda; o Bruno à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: o score enche de "precisa" a "serviço"; as dores e oportunidades em "serviço"
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analisePizza', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
      // NA TELA: (1) Antes: dormindo de barba, a teia; (2) Agora: andando rápido na rua com a análise; (3) a pizzaria: mostra a análise e o pizzaiolo faz joia · MOSTRA: personagem, pizzaria, pizzaiolo
      const tA = quando('Agora', B, 0.45), tC = quando('chega', B, 0.72), tPr = quando('primeiro', B, 0.88);
      if (tc < tA) {
        ve(comp); comp.tela.desenhar(telaEscura, 'escura');
        sentado(OLHA_CAM); menino.reagir('dormindo', tc); barba(1); aranhaEm(1, tc); sala(tc);
        fx.et.esperando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        // CÂMERA: (1) afastando · médio · direita · olho
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.55, 0.1, 0.8]), MONITOR], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 35, altura: 'olho', tam: 1.6, obstaculos: false });
      } else if (tc < tC) {
        // a rua: ele anda rápido, decidido, com a tela do Mappoa na mão
        const de = [0.9, 0, RUA_PZ[2] + 14], ate = [0.9, 0, RUA_PZ[2] + 8];
        menino.irPara(de, ate, K.clamp((tc - tA + 0.3) / (tC - tA + 0.8)), tc, { reto: true });
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        K.som('whoosh', tA, 0.5); K.som('passo', tA + 0.2, 0.3); K.som('passo', tA + 0.45, 0.3);
        // CÂMERA: (2) de baixo pra cima, com os prédios gigantes atrás
        K.heroi(menino, pc(tc, tA, tC));
      } else {
        // a fachada: ele chega primeiro e mostra a análise; o pizzaiolo faz joia
        menino.irPara(mais(BRUNO_F, [-1.2, 0, 0.2]), BRUNO_F, K.clamp((tc - tC) / 0.4), tc, { olhar: PZ });
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] + 0.2, m[1] + 0.5, m[2] + 0.2); telaM.g.rotation.set(0, 0.5, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tC - 0.2));
        telaM.mostrar('analisePizza', { ate: 2, score: 1 });
        if (tc > tPr) menino.reagir('mostrando', tc - tPr);
        pizzaiolo.colocar(PZ, cabecaDe(menino, -0.4));
        if (tc > tPr + 0.2) pizzaiolo.reagir('vitoria', tc - tPr - 0.2); else pizzaiolo.reagir('surpreso', tc - tC);
        Cf().porta.abrirEm(tc - tC, 0.4);
        fx.et.primeiro.em(mais(BRUNO_F, [0.5, 2.5, 0.2]), tc - tPr);
        K.som('certo', tPr, 0.6);
        // CÂMERA: (3) passando · médio · esquerda · olho
        K.filmar([mais(BRUNO_F, [0, 1, 0]), mais(PZ, [0, 1, 0]), Cf().lugares.placa], 'passando', pc(tc, tC, B.ate), { plano: 'medio', lado: -25, altura: 'olho', tam: 2.6 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Bruno de pé no quarto; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('você', B, 0.02), tSg = quando('segue', B, 0.35), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteDemo, 'demo');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (pergunta pra câmera) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) até "seu": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
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
      ve(comp); comp.tela.desenhar(telaEscura, 'escura');
      sentado(OLHA_CAM); menino.reagir('dormindo', 1.2); barba(1); aranhaEm(1, 0.4); sala(2.2);
      K.filmar([cabecaDe(menino, 0.25), mais(SEAT, [0.6, 0.05, 0.9]), mais(MONITOR, [-0.28, 0.2, 0])], 'parado', 0, { plano: 'perto', lado: 22, altura: 'olho', espacoCima: 0.28, tam: 1.05 });
    }
  };
  const Cf = () => CS.todos.pizzaria;

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'quarto' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, pizzaiolo, rival].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    barbaG.visible = false; barbaTopo.visible = false; teia.visible = false; aranha.visible = false; fio.visible = false;
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1); cel.position.set(...CEL);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
