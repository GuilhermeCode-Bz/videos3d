// Tem uma empresa gritando por você a duas quadras (canal Mappoa).
// Quatro lugares no mesmo vídeo (K.cenarios): o calçadão entre prédios (com a loja CAFÉ), o quarto do Davi, a cafeteria
// por dentro e o palco do Mappoa. O megafone gigante, as ondas do som, os prédios entortando e o fone de ouvido são
// feitos aqui. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, cliente, robo, comp, cel, megaG, telaC, telaM, navG, foneG, foneMesa, pino, FOV0;
  const tudo = [], fx = {}, avioes = [], aneis = [], notas = [];
  let predios = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Davi no meio do quarto, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4];
  let JANELA = [-1.9, 2.2, -3.4];
  // Rua entre prédios: a porta da loja CAFÉ; a dona no meio do calçadão, o Davi andando na frente dela
  let DZ = -5, DONA_R = [-0.2, 0, -5];
  // Cafeteria por dentro: a dona na ponta do balcão (do lado de fora), a cliente e o celular gigante
  const DONA_C = [1.95, 0, -2.25], CLI = [0.75, 0, 0.75], CEL = [-0.35, 0, 0.55];

  const LUGAR = {
    gancho: 'rua', longe: 'quarto', cafeteria: 'cafe', ouvir: 'rua', lista: 'quarto', mappoa: 'mundo_mappoa',
    antes_agora: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'rua'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.42) ? 'quarto' : 'rua';
    return LUGAR[B.plano] || 'quarto';
  }

  const CAFES = [
    { nome: 'Café Maré', end: 'Rua Bocaiúva, 214', chips: ['whats', 'insta'] },
    { nome: 'Grão da Ilha Cafeteria', end: 'Av. Beira-Mar Norte, 3110', chips: ['tel', 'insta'] },
    { nome: 'Café Lagoa', end: 'Rua Laurindo Januário, 88', chips: ['whats'] },
    { nome: 'Doce Ponte Café', end: 'Rua Felipe Schmidt, 640', chips: ['whats', 'tel'] }
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
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  // O e-mail "faço sites" indo pra empresa de outro estado
  function emailLonge(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.05, h * 0.06, w * 0.9, h * 0.14, 10, '#e7eefb');
    txt(c, 'Para: empresa@outroestado.com', w * 0.09, h * 0.13, w * 0.045, '#2f4a7a', 700, 'left', w * 0.82);
    txt(c, 'Oi! Faço sites.', w * 0.09, h * 0.36, w * 0.08, '#111', 900);
    txt(c, 'Enviadas hoje: ' + (e.n || 0), w * 0.09, h * 0.55, w * 0.055, '#4a4f58', 700);
    txt(c, 'Respostas: 0', w * 0.09, h * 0.7, w * 0.055, '#e8352b', 800);
  }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Davi Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites rápidos e bonitos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // O celular da cliente: a busca "Café Maré" e o resultado sem site
  function busca(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.05, '#111', 800);
    rr(c, w * 0.06, h * 0.07, w * 0.88, h * 0.07, 40, '#eef1f5');
    txt(c, 'Café Maré'.slice(0, e.letras) + (e.letras < 9 ? '|' : ''), w * 0.12, h * 0.105, w * 0.065, '#111', 700);
    if (e.res) {
      rr(c, w * 0.06, h * 0.18, w * 0.88, h * 0.34, 18, '#f7f9fc');
      txt(c, 'Café Maré', w * 0.11, h * 0.23, w * 0.08, '#111', 900);
      txt(c, '★★★★★ 4,8 · Cafeteria', w * 0.11, h * 0.29, w * 0.05, '#d97706', 800, 'left', w * 0.8);
      txt(c, 'Florianópolis, SC', w * 0.11, h * 0.34, w * 0.05, '#4a4f58', 700);
      txt(c, 'Site:  —', w * 0.11, h * 0.43, w * 0.075, '#e8352b', 900);
    }
    if (e.erro) {
      rr(c, w * 0.06, h * 0.58, w * 0.88, h * 0.3, 18, '#fde8e7');
      c.strokeStyle = '#e8352b'; c.lineWidth = w * 0.03; c.lineCap = 'round';
      const cx = w / 2, cy = h * 0.67, r = w * 0.08;
      c.beginPath(); c.moveTo(cx - r, cy - r); c.lineTo(cx + r, cy + r); c.moveTo(cx + r, cy - r); c.lineTo(cx - r, cy + r); c.stroke();
      txt(c, 'Cardápio não', w / 2, h * 0.79, w * 0.07, '#b42318', 900, 'center');
      txt(c, 'encontrado', w / 2, h * 0.84, w * 0.07, '#b42318', 900, 'center');
    }
  }

  // ---------- O fone de ouvido (arco por cima da cabeça e as conchas nas orelhas) ----------
  function fazFone() {
    const g = new THREE.Group();
    const preto = K.mat(0x22252b, { roughness: 0.5 }), verde = K.mat(0x2fb5a6, { roughness: 0.45 });
    const arco = K.malha(new THREE.TorusGeometry(0.255, 0.028, 10, 32, PI), preto);
    arco.position.set(0, 0.0, -0.01); g.add(arco);
    [-1, 1].forEach((l) => {
      const concha = K.malha(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 20).rotateZ(PI / 2), verde);
      concha.position.set(l * 0.255, -0.02, -0.01); g.add(concha);
      const almo = K.malha(new THREE.CylinderGeometry(0.075, 0.075, 0.03, 18).rotateZ(PI / 2), preto);
      almo.position.set(l * 0.215, -0.02, -0.01); g.add(almo);
    });
    return g;
  }
  // As notinhas de música saindo do fone (♪ subindo em volta da cabeça)
  function fazNota(i) {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const c = cv.getContext('2d'); c.font = '900 110px Arial'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillStyle = '#ffffff'; c.fillText(i % 2 ? '♫' : '♪', 66, 68); c.fillStyle = '#2fb5a6'; c.fillText(i % 2 ? '♫' : '♪', 62, 64);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false }));
    s.scale.set(0.22, 0.22, 1); s.visible = false; K.scene.add(s); return s;
  }
  function notasEm(cab, tc, forca = 1) {
    notas.forEach((s, i) => {
      const k = (tc * 0.7 + i / notas.length) % 1;
      s.visible = forca > 0.01;
      const l = i % 2 ? 1 : -1;
      s.position.set(cab[0] + l * (0.3 + k * 0.25), cab[1] - 0.05 + k * 0.7, cab[2] + Math.sin(tc * 3 + i) * 0.1);
      s.material.opacity = Math.sin(k * PI) * forca;
    });
  }

  // ---------- O megafone gigante na mão da dona, as ondas do som e os prédios entortando ----------
  const ESC_MEGA = 2.4;
  // aponta o megafone pra frente da dona (rumo) e pra cima (subir, em radianos); o cabo fica na mão
  function megafoneNa(b, subir) {
    ve(megaG);
    b.g.updateMatrixWorld(true);
    const r = b.g.rotation.y, dx = Math.sin(r), dz = Math.cos(r);
    megaG.scale.setScalar(ESC_MEGA);
    megaG.rotation.set(0, Math.atan2(-dz, dx), subir);
    megaG.position.set(0, 0, 0); megaG.updateMatrixWorld(true);
    const cabo = V(-0.3, -0.25, 0).applyMatrix4(megaG.matrixWorld);
    const m = b.mao(1);
    megaG.position.set(m[0] - cabo.x, m[1] - cabo.y, m[2] - cabo.z);
    megaG.updateMatrixWorld(true);
  }
  const bocaMega = () => { megaG.updateMatrixWorld(true); return V(0.42, 0, 0).applyMatrix4(megaG.matrixWorld); };
  const rumoMega = () => { const a = V(0, 0, 0).applyMatrix4(megaG.matrixWorld); return bocaMega().sub(a).normalize(); };
  // os anéis saem da boca do megafone e crescem pela rua (tudo em função do tempo)
  function ondasEm(tc, forca = 1, longe = 16) {
    const o = bocaMega(), d = rumoMega();
    aneis.forEach((a, i) => {
      const k = (tc * 1.25 + i / aneis.length) % 1;
      a.visible = forca > 0.01;
      a.position.copy(o).addScaledVector(d, 0.2 + k * longe);
      a.lookAt(a.position.clone().add(d));
      a.scale.setScalar(0.7 + k * 7.5);
      a.children.forEach((m, j) => { m.material.opacity = (1 - k) * (j ? 0.3 : 0.55) * forca; });
    });
  }
  // cada prédio perto da dona balança como gelatina quando a onda passa por ele
  function prediosTremem(tc, forca) {
    predios.forEach((p) => {
      const dist = Math.abs(p.z - DZ);
      const amp = forca * K.clamp(1 - dist / 30);
      const w = amp > 0 ? Math.sin(tc * 9 - dist * 0.7) * amp : 0;
      p.g.rotation.x = w * 0.045;
      p.g.scale.set(1 - w * 0.025, 1 + w * 0.03, 1);
    });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], ['cafeteria', {}, 'cafe'], 'mundo_mappoa']);
    const Cr = CS.todos.rua, Cq = CS.todos.quarto;
    if (Cq.lugares.janela) JANELA = Cq.lugares.janela;
    // a loja CAFÉ do calçadão e os prédios em volta dela
    const cafe = (Cr.lojas || []).find((l) => l.id === 'cafe');
    if (cafe) { DZ = cafe.porta[2]; K.nomear('cafe', cafe.g); }
    // as árvores do lado direito ficam a cada 14 m (z = 26 - 14k): a dona fica logo depois de uma, pra nenhuma ficar entre ela e a câmera
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    DONA_R = [-0.2, 0, DZ];
    predios = (Cr.lojas || []).map((l) => { l.g.rotation.order = 'YXZ'; return { g: l.g, z: l.g.position.z }; });

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaCafes = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: CAFES, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Cafeterias · Florianópolis, SC', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseCafe = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Café Maré', ate: e.ate, aderencia: 0.89 * k,
        dores: ['Sem site próprio', 'Cardápio só no Instagram'], oportunidades: ['Site com cardápio e pedido pelo WhatsApp'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre quem procura café no bairro e não acha o cardápio.'
      });
      if (e.ate >= 0) txt(c, Math.round(89 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Davi (do canal), a dona da Café Maré (blazer café e avental creme), a cliente e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.personagem('dona', { cores: { blazer: 0x6b4a2f, vestido: 0xf2e6d0 } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    const avental = K.malha(new THREE.BoxGeometry(0.34, 0.5, 0.02), K.mat(0xf4ead8, { roughness: 0.9 }));
    avental.position.set(0, 0.62, 0.255); dona.corpo.add(avental);
    cliente = K.boneco({ tipo: 'menina', cores: { vestido: 0xf5c518, cabelo: 0x2a1a10, pele: 0xc98d5e } }); K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O fone na cabeça do Davi e o mesmo fone em cima da mesa (depois que ele tira)
    foneG = fazFone(); menino.cabeca.add(foneG); K.nomear('fone', foneG);
    foneMesa = fazFone(); foneMesa.rotation.set(-PI / 2 + 0.15, 0, 0); guarda(foneMesa, null, [0.15, 0.8, -1.15]);
    for (let i = 0; i < 4; i++) notas.push(fazNota(i));

    // O megafone gigante e os anéis das ondas
    megaG = K.m3d('megafone', { cor: 0xf39a1e }); guarda(megaG, 'megafone');
    for (let i = 0; i < 6; i++) {
      const a = new THREE.Group();
      const branco = new THREE.Mesh(new THREE.RingGeometry(0.86, 1.0, 64), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      const verde = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.07, 64), new THREE.MeshBasicMaterial({ color: 0x2fb5a6, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      a.add(branco, verde); a.visible = false; K.scene.add(a); aneis.push(a);
    }

    // Quarto: o computador com a mesa, os envelopes "faço sites", a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    const avG = new THREE.Group(); K.scene.add(avG); K.nomear('avioes', avG); tudo.push(avG);
    for (let i = 0; i < 4; i++) { const e = K.m3d('envelope'); e.scale.setScalar(0.32); avG.add(e); avioes.push(e); }
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    pino = K.m3d('pino'); guarda(pino, 'pino', [0.9, 2.2, 0.3], 0.8);

    // Cafeteria: o celular gigante da cliente
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CEL);

    // Efeitos
    fx.grito = K.balaoFala(); K.nomear('grito', fx.grito.g);
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      quadras: e('2 quadras', 'laranja'), web: e('Web designer', 'azul'), longe: e('Outro estado →', 'laranja'), semSite: e('Sem site', 'vermelho'),
      errado: e('Pro lado errado', 'laranja'), floripa: e('Florianópolis', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      procurando: e('Procurando longe', 'vermelho'), lado: e('Do lado!', 'verde'), cidade: e('Sem site?', 'vermelho')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>a sua cidade</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    menino.sentar(1);
  }
  // A dona no meio do calçadão, gritando no megafone (subir: o quanto aponta pro alto)
  function donaGritando(tc, subir, olhar) {
    dona.colocar(DONA_R, olhar || [DONA_R[0] + 7, 1.5, DZ + 8]);
    dona.apontar(0.75 + subir * 0.6);
    dona.humor('bravo');
    dona.g.rotation.x = -0.06 - Math.abs(Math.sin(tc * 9)) * 0.03;
    megafoneNa(dona, subir);
  }
  // O Davi andando no calçadão de fone, de olho fechado, balançando a cabeça
  function daviAndando(tc, x, de, ate) {
    ve(foneG);
    menino.irPara([0.85, 0, DZ + de], [0.85, 0, DZ + ate], K.clamp(x), tc, { reto: true });
    menino.humor('feliz');
    menino.cabeca.rotation.z = Math.sin(tc * 7) * 0.14;
    notasEm(cabecaDe(menino, 0), tc);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a dona no meio do calçadão com o megafone gigante e o balão "ALGUÉM FAZ MEU SITE?"; as ondas e os prédios entortando; o Davi de fone, andando na frente · MOSTRA: dona, megafone, personagem
      // CENÁRIO: a rua entre prédios de dia, a gente andando (o cenário cuida)
      const tG = quando('gritando', B, 0.2), tQ = quando('quadras', B, 0.48), tVc = quando('você', B, 0.2), tO = quando('ouve', B, 0.92);
      // PERSONAGEM: a dona grita (corpo pra trás) · em "você": aponta pra ele. O Davi anda de olho fechado, balançando a cabeça
      donaGritando(tc, 0.32);
      daviAndando(tc, pc(tc, B.inicio - 1, B.ate + 1), 1.6, 3.0);
      if (tc > tO) menino.humor('feliz');
      // OBJETOS SE MEXENDO: os anéis saindo a cada ~0,4 s; os prédios balançando
      ondasEm(tc, 1);
      prediosTremem(tc, 1);
      // EFEITOS VISUAIS: o balão em "gritando" · "2 quadras" em "quadras"
      fx.grito.em(mais(bocaMega().toArray(), [0, 0.6, 0]), tc - tG + 0.3, { texto: 'ALGUÉM FAZ MEU SITE?', lado: -1 });
      // SONS: o grito (zumbido) com eco · whoosh a cada onda · o tremor
      K.som('zumbido', B.inicio, 0.5); K.som('estrondo', B.inicio + 0.05, 0.35);
      for (let k = 0; k < 5; k++) K.som('whoosh', B.inicio + 0.2 + k * 0.8, 0.35);
      K.som('range', tQ, 0.4); K.som('ding', tO, 0.3); void tVc;
      // CÂMERA: 4 cortes de ~0,8 s (a boca do megafone, o prédio entortando, o fone, o quadro inteiro)
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = B.inicio + 2.4;
      const boca = bocaMega().toArray();
      if (tc < c1) {
        K.filmar([boca, mais(boca, [0, 0.9, 0]), mais(boca, [0, -0.6, 0])], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 2.2, obstaculos: false });
      } else if (tc < c2) {
        const pr = predios.filter((p) => p.g.position.x > 0).sort((a, b) => Math.abs(a.z - DZ - 3) - Math.abs(b.z - DZ - 3))[0];
        const zb = pr ? pr.z : DZ, k = pc(tc, c1, c2);
        K.mirar([-2.2, K.lerp(1.2, 1.8, k), zb + 9 - k], [5.6, K.lerp(7, 10, k), zb]);
      } else if (tc < c3) {
        K.filmar([cabecaDe(menino, 0.15), cabecaDe(menino, -0.35)], 'passando', pc(tc, c2, c3), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.0 });
      } else {
        fx.et.quadras.em(mais(cabecaDe(dona, 0), [0.9, 0.2, 1.2]), tc - c3);
        K.filmar([dona, boca, mais(boca, [0, 1.0, 0]), menino], 'afastando', pc(tc, c3, B.ate), { plano: 'medio', lado: 4, altura: 'olho', espacoCima: 0.22, tam: 3.4 });
      }
    },
    longe(B, tc) {
      // NA TELA: o quarto de dia; o Davi de fone digitando; os envelopes "faço sites" saindo do computador e fugindo pela janela · MOSTRA: personagem, monitor, avioes
      // CENÁRIO: o quarto de dia, a janela clara (o cenário cuida)
      const tW = quando('designer', B, 0.15), tF = quando('fone', B, 0.38), tM = quando('mandando', B, 0.5), tE = quando('estado', B, 0.92);
      ve(comp); ve(foneG);
      // PERSONAGEM: começo digitando, balançando a cabeça · em "estado": vira e aponta a janela, animado
      sentado(MONITOR);
      if (tc > tE) { menino.reagir('comemorando', tc - tE); } else { menino.reagir('digitando', tc); menino.cabeca.rotation.z = Math.sin(tc * 7) * 0.12; }
      notasEm(cabecaDe(menino, 0), tc);
      const enviadas = tc > tM ? 1 + Math.floor((tc - tM) / 0.4) : 0;
      comp.tela.desenhar((c, w, h) => emailLonge(c, w, h, { n: enviadas }), 'mail' + enviadas);
      // ENTRA AGORA e OBJETOS SE MEXENDO: um envelope a cada ~0,4 s, do monitor em arco até a janela, encolhendo
      ve(avioesG());
      avioes.forEach((e, i) => {
        const k = (tc - tM - i * 0.4) / 1.1;
        e.visible = k > 0;
        if (!e.visible) return;
        const q = k % 1, de = mais(MONITOR, [0, 0.35, 0.15]), ate = JANELA;
        e.position.set(K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) + Math.sin(q * PI) * 0.9, K.lerp(de[2], ate[2], q) + Math.sin(q * PI) * 0.8);
        e.rotation.set(0.2, q * 3, Math.sin(q * 6) * 0.3);
        e.scale.setScalar(0.32 * (1 - q * 0.75));
        if (k > 0 && k < 0.05) K.som('whoosh', tM + i * 0.4, 0.35);
      });
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Outro estado →" em "estado"
      if (tc < tM) fx.et.web.em(cabecaDe(menino, 0.55), tc - tW); else fx.et.longe.em(mais(JANELA, [0.7, 0.75, 0.6]), tc - tM - 0.4);
      for (let k = 0; k < 8; k++) K.som('clique', B.inicio + 0.1 + k * 0.15, 0.25);
      void tF;
      // CÂMERA: (1) até "fone": chegando · médio · frente · olho · (2) passando · médio · esquerda · olho
      const cv = (tF + tM) / 2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 22, altura: 'olho', tam: 1.3 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, JANELA], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.9 });
    },
    cafeteria(B, tc) {
      // NA TELA: a cafeteria por dentro; a dona na ponta do balcão; a cliente com o celular gigante: "Café Maré", "Site: —", "Cardápio não encontrado" · MOSTRA: dona, cliente, celular
      // CENÁRIO: a cafeteria, luz quente; o vapor da máquina
      const tSi = quando('site', B, 0.35), tPr = quando('procura', B, 0.55), tAc = quando('acha', B, 0.75), tCa = quando('cardápio', B, 0.92);
      // PERSONAGEM: a dona passa o pano no balcão olhando a porta · em "cardápio": encolhe os ombros. A cliente digita · em "acha": faz não com a cabeça
      dona.colocar(DONA_C, tc > tPr ? cabecaDe(cliente, -0.4) : [1.0, 1.2, 6]);
      if (tc > tCa) dona.reagir('ombros', tc - tCa); else { dona.reagir('segurando', tc - B.inicio); dona.g.rotation.y += Math.sin(tc * 5) * 0.08; }
      cliente.colocar(CLI, mais(CEL, [0, 1.0, 0]));
      if (tc > tAc) cliente.reagir('nao', tc - tAc); else cliente.reagir('celular', tc - B.inicio);
      // ENTRA AGORA: o celular gigante sobe na palavra "procura"; o resultado e o ✗ em "cardápio"
      ve(cel); K.entrar(cel, 'cresce', tc - tPr, { dur: 0.35 });
      cel.rotation.set(0, Math.atan2(-1.6 - CEL[0], 6 - CEL[2]), 0);
      const letras = Math.max(0, Math.min(9, Math.floor((tc - tPr) / 0.07)));
      cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { letras, res: tc > tAc - 0.25, erro: tc > tCa }), 'b' + letras + (tc > tAc - 0.25) + (tc > tCa));
      // EFEITOS VISUAIS: "Sem site" em "site" · ✗ em "cardápio" (o congela em preto e branco o jogo faz)
      fx.et.semSite.em(cabecaDe(dona, 0.4), tc - tSi);
      if (tc > tCa) fx.simb.em(mais(CEL, [0.5, 2.0, 0.1]), tc - tCa, { tipo: '✗', tam: 0.9 });
      // SONS: vapor · cliques do celular · errado em "cardápio"
      K.som('vapor', B.inicio + 0.1, 0.35);
      for (let k = 0; k < 9; k++) K.som('clique', tPr + k * 0.07, 0.2);
      K.som('errado', tCa, 0.6);
      // CÂMERA: (1) até "site": girando · médio · direita · olho · (2) chegando · perto · esquerda · olho
      const cv = (tSi + tPr) / 2;
      if (tc < cv) K.filmar([dona, cabecaDe(dona, 0.5), [1.0, 1.1, -2.6]], 'girando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 25, angulo: 20, altura: 'olho', tam: 1.9 });
      else K.filmar([cliente, mais(CEL, [0, 0.2, 0]), mais(CEL, [0, 1.7, 0]), cabecaDe(dona, 0.2)], 'chegando', pc(tc, cv, B.ate), { plano: 'perto', lado: -14, altura: 'olho', tam: 1.5 });
    },
    ouvir(B, tc) {
      // NA TELA: a rua de novo; a dona grita pro céu e as ondas batem nos prédios; o Davi para, tira um lado do fone e olha pra trás · MOSTRA: personagem, fone, dona
      const tAc = quando('achar', B, 0.3), tOu = quando('ouvir', B, 0.72), tVc = quando('você', B, 0.9);
      // PERSONAGEM: a dona grita pro alto; depois baixa o megafone na direção dele. O Davi anda de fone · em "você": para, mão na orelha, olha pra trás
      const subir = tc < tOu ? 0.9 : K.lerp(0.9, 0.15, K.suave(pc(tc, tOu, tOu + 0.4)));
      donaGritando(tc, subir, tc < tOu ? null : cabecaDe(menino, -1.4));
      ondasEm(tc, 1, 14);
      prediosTremem(tc, 1.2);
      fx.grito.em(mais(bocaMega().toArray(), [0, 0.6, 0]), 1, { texto: 'ALGUÉM FAZ MEU SITE?', lado: -1 });
      if (tc < tVc) {
        daviAndando(tc, pc(tc, B.inicio - 0.6, tVc), 2.6, 4.6);
      } else {
        ve(foneG); menino.colocar([0.85, 0, DZ + 4.6], [-4, 1.5, DZ + 3.2]);
        menino.reagir('surpreso', tc - tVc);
        foneG.rotation.z = -0.5 * K.suave(pc(tc, tVc, tVc + 0.25)); foneG.position.y = 0.06 * K.suave(pc(tc, tVc, tVc + 0.25));
        fx.simb2.em(cabecaDe(menino, 0.35), tc - tVc, { tipo: '!', tam: 0.8 });
      }
      // EFEITOS VISUAIS: "Pro lado errado" em "achar"
      if (tc < tOu) fx.et.errado.em(mais(DONA_R, [0.4, 4.6, 1.5]), tc - tAc);
      K.som('zumbido', B.inicio + 0.1, 0.4); K.som('whoosh', tAc, 0.4); K.som('desliga', tOu, 0.5); K.som('ding', tVc, 0.6);
      // CÂMERA: (1) até "achar": subindo · médio · direita · baixo · (2) de "Quem": anda junto, de frente pra ele, com a dona atrás
      const cv = tAc + 0.35;
      if (tc < cv) { const boca = bocaMega().toArray(); K.filmar([dona, boca, mais(boca, [0, 2.4, 0])], 'subindo', pc(tc, B.inicio, cv), { plano: 'medio', lado: 35, altura: 'baixo', tam: 3.4 }); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([0.7, 1.7, DZ + K.lerp(8.6, 7.8, k)], [0.35, 1.35, DZ + 1.5]); }
    },
    lista(B, tc) {
      // NA TELA: o Davi tira o fone; abre o computador; a barra com mappoa.com; a lista das cafeterias sobe do computador · MOSTRA: navegador, tela, personagem
      const tF = quando('fone', B, 0.1), tAb = quando('abre', B, 0.2), tDi = quando('digita', B, 0.32), tL = quando('lista', B, 0.6), tCa = quando('cafeterias', B, 0.7), tFl = quando('Florianópolis', B, 0.85);
      ve(comp, navG);
      // ENTRA AGORA: o fone sai em "fone"; a tela acende em "abre"; a barra em "digita"; a lista sobe em "lista"
      if (tc < tF + 0.25) { ve(foneG); foneG.position.y = 0.15 * K.suave(pc(tc, tF - 0.1, tF + 0.25)); }
      else ve(foneMesa);
      if (tc > tAb) comp.tela.desenhar(siteDemo, 'demo'); else comp.tela.desenhar(telaEscura, 'escura');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      K.som('liga', tAb, 0.5);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tCa ? 1 + Math.floor((tc - tCa) / 0.22) : 0;
        telaC.mostrar('listaCafes', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tCa + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo tira o fone e digita · em "lista": levanta e aponta a Café Maré
      if (tc < tL) { sentado(MONITOR); if (tc < tF + 0.3) menino.reagir('segurando', tc - B.inicio); else menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.floripa.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tFl);
      // CÂMERA: (1) até a lista: chegando · perto · no endereço e nas mãos · (2) chegando · médio · frente · olho
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'subindo', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Café Maré; o robô à esquerda; o Davi à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseCafe', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
      // NA TELA: (1) Antes: de fone, os envelopes fugindo; (2) Agora: andando rápido na rua com a análise; (3) mostra pra dona, ela baixa o megafone e faz joia · MOSTRA: personagem, dona, megafone
      const tA = quando('Agora', B, 0.42), tCh = quando('chamando', B, 0.78), tL = quando('lado', B, 0.92);
      if (tc < tA) {
        ve(comp, foneG); comp.tela.desenhar((c, w, h) => emailLonge(c, w, h, { n: 37 }), 'mail37');
        sentado(MONITOR); menino.reagir('digitando', tc); notasEm(cabecaDe(menino, 0), tc);
        ve(avioesG());
        avioes.forEach((e, i) => {
          const q = (tc * 0.9 + i * 0.25) % 1, de = mais(MONITOR, [0, 0.35, 0.15]);
          e.visible = true;
          e.position.set(K.lerp(de[0], JANELA[0], q), K.lerp(de[1], JANELA[1], q) + Math.sin(q * PI) * 0.9, K.lerp(de[2], JANELA[2], q) + Math.sin(q * PI) * 0.8);
          e.rotation.set(0.2, q * 3, 0); e.scale.setScalar(0.32 * (1 - q * 0.75));
        });
        fx.et.procurando.em(cabecaDe(menino, 0.6), tc - B.inicio - 0.2);
        K.som('whoosh', B.inicio + 0.3, 0.4); K.som('errado', B.inicio + 0.5, 0.35);
        // CÂMERA: (1) afastando · médio · direita · olho
        K.filmar([cabecaDe(menino, 0.3), MONITOR, JANELA], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 28, altura: 'olho', tam: 2.2 });
      } else if (tc < tCh) {
        // a rua: ele anda rápido, sem fone, decidido; a dona lá na frente com o megafone
        menino.irPara([0.85, 0, DZ + 9], [0.85, 0, DZ + 2.6], K.clamp((tc - tA + 0.2) / (tCh - tA + 0.4)), tc, { reto: true });
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        donaGritando(tc, 0.6); ondasEm(tc, 0.6, 10); prediosTremem(tc, 0.5);
        K.som('whoosh', tA, 0.5); K.som('passo', tA + 0.2, 0.3); K.som('passo', tA + 0.45, 0.3);
        // CÂMERA: (2) de baixo pra cima, com os prédios gigantes atrás
        K.heroi(menino, pc(tc, tA, tCh), { dist: 5.2, lado: 8, altura: 0.5, olhar: 2.0 });
      } else {
        // ele chega na dona e mostra a análise; ela baixa o megafone e faz joia
        menino.colocar([0.85, 0, DZ + 1.3], cabecaDe(dona, -1.3));
        dona.colocar(DONA_R, cabecaDe(menino, -1.3));
        const desce = K.suave(pc(tc, tCh, tCh + 0.5));
        if (tc > tL) dona.reagir('vitoria', tc - tL); else dona.apontar(0.6 - desce * 0.6);
        megafoneNa(dona, K.lerp(0.3, -0.9, desce));
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.25, m[1] + 0.5, m[2] - 0.05); telaM.g.rotation.set(0, -0.9, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tCh));
        telaM.mostrar('analiseCafe', { ate: 2, score: 1 });
        menino.reagir('mostrando', tc - tCh);
        if (tc > tL) fx.simb.em(mais(DONA_R, [0.5, 2.6, 0.6]), tc - tL, { tipo: '✓', tam: 1.1 });
        fx.et.lado.em(mais(DONA_R, [0.5, 3.4, 0.6]), tc - tL);
        K.som('certo', tL, 0.6);
        // CÂMERA: (3) passando · médio · esquerda · olho
        K.filmar([menino, dona, mais(DONA_R, [0.5, 2.9, 0.6])], 'passando', pc(tc, tCh, B.ate), { plano: 'medio', lado: -30, altura: 'olho', tam: 2.6 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Davi de pé no quarto; "Comenta a sua cidade" no topo e o pino; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tCi = quando('cidade', B, 0.12), tSi = quando('site', B, 0.4), tSg = quando('segue', B, 0.5), tPc = quando('computador', B, 0.62), tDi = quando('digita', B, 0.7), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, foneMesa); comp.tela.desenhar(siteDemo, 'demo');
      if (tc < tPc) {
        ve(pino); const q = K.clamp((tc - tCi) / 0.5); pino.visible = tc > tCi;
        pino.position.set(1.05, K.lerp(3.6, 1.75, K.saiVolta(q)), 0.25); pino.rotation.y = tc * 1.5;
        fx.et.cidade.em([1.05, 2.75, 0.25], tc - tSi);
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
      // CÂMERA: (1) até "ver": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), [1.05, 2.0, 0.25]], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo, foneMesa); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      donaGritando(0.4, 0.32);
      daviAndando(0.7, 0.75, 1.6, 3.0);
      ondasEm(0.55, 1); prediosTremem(0.5, 1);
      fx.grito.em(mais(bocaMega().toArray(), [0, 0.6, 0]), 1, { texto: 'ALGUÉM FAZ MEU SITE?', lado: -1 });
      const boca = bocaMega().toArray();
      K.filmar([dona, boca, mais(boca, [0, 1.0, 0]), menino], 'parado', 0, { plano: 'medio', lado: 4, altura: 'olho', espacoCima: 0.25, tam: 3.4 });
    }
  };
  const avioesG = () => avioes[0].parent;

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona, cliente].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    foneG.visible = false; foneG.rotation.set(0, 0, 0); foneG.position.set(0, 0, 0);
    menino.cabeca.rotation.z = 0;
    aneis.forEach((a) => { a.visible = false; });
    notas.forEach((s) => { s.visible = false; });
    avioes.forEach((e) => { e.visible = false; });
    prediosTremem(tc, 0);
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1); cel.position.set(...CEL);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
