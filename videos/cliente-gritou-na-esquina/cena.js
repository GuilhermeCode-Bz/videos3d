// Um cliente gritou por ele na esquina. E ele tava de fone (canal Mappoa).
// A imagem do campeão empresa-gritando (o megafone gigante, as ondas, os prédios entortando e o fone) com gancho novo em
// 3ª pessoa: o instrutor do Pilates Icaraí grita no megafone, o Heitor passa de fone, o rival de moletom vermelho ouve e
// fecha primeiro e, na virada, o Heitor tira o fone e a rua inteira está gritando (padeiro, dona do pet shop e dono da
// ótica com megafones). Base: o cena.js do megafone-academia, com o fim novo (Segue pra ver mais). Quatro lugares
// (K.cenarios): o calçadão, o quarto do Heitor, a academia por dentro e o palco do Mappoa. Cada plano começa com as
// linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, personal, aluno, rival, robo, comp, cel, megaG, telaC, telaM, navG, foneG, foneMesa, rivalFone, pino, FOV0;
  let tapG, moeda, contrato, carimbo, megsG;
  const tudo = [], fx = {}, avioes = [], aneis = [], notas = [], lojistas = [], megs = [], aneisL = [];
  let predios = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Heitor no meio do quarto, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  let JANELA = [-1.9, 2.2, -3.4];
  // Rua entre prédios: o personal no meio do calçadão, perto da loja ACADEMIA; o Heitor andando na frente dele
  let DZ = -5, PERS_R = [-0.2, 0, -5];
  // Academia por dentro: o personal entre o banco e as esteiras, o aluno e o celular gigante
  const PERS_A = [2.3, 0, -1.3], ALU = [0.75, 0, 0.75], CEL = [-0.35, 0, 0.55];
  // Os três lojistas no calçadão (padeiro, dona do pet shop, dono da ótica), fora da faixa das árvores (x ±2,6)
  let L_POS = [];

  const LUGAR = {
    gancho: 'rua', longe: 'quarto', academia: 'acad', rival: 'rua', ouvir: 'rua', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', antes_agora: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'rua'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.42) ? 'quarto' : 'rua';
    return LUGAR[B.plano] || 'quarto';
  }

  // O Pilates Icaraí já fechou com o rival: na lista SEM SITE entram os outros estúdios de Niterói
  const ACADS = [
    { nome: 'Studio Pilates Ingá', end: 'Rua Tiradentes, 148', chips: ['whats', 'insta'] },
    { nome: 'Core Santa Rosa', end: 'Rua Santa Rosa, 390', chips: ['tel', 'insta'] },
    { nome: 'Equilíbrio Pilates', end: 'Av. Roberto Silveira, 211', chips: ['whats'] },
    { nome: 'Pilates Camboinhas', end: 'Av. Central, 77', chips: ['whats', 'tel'] }
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
  // A proposta "faço sites" indo pra empresa de outro estado
  function emailLonge(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.05, h * 0.06, w * 0.9, h * 0.14, 10, '#e7eefb');
    txt(c, 'Para: contato@empresa-sp.com', w * 0.09, h * 0.13, w * 0.045, '#2f4a7a', 700, 'left', w * 0.82);
    txt(c, 'Proposta: faço sites.', w * 0.09, h * 0.36, w * 0.07, '#111', 900, 'left', w * 0.84);
    txt(c, 'Enviadas hoje: ' + (e.n || 0), w * 0.09, h * 0.55, w * 0.055, '#4a4f58', 700);
    txt(c, 'Respostas: 0', w * 0.09, h * 0.7, w * 0.055, '#e8352b', 800);
  }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Heitor Web Design', w * 0.06, h * 0.13, w * 0.072, '#fff', 900); txt(c, 'sites rápidos e bonitos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // O mapa da ferramenta: os pinos das empresas sem site, cada um com um megafone pequeno e as ondas
  function mapaGrito(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    [0.3, 0.7].forEach((x) => { c.beginPath(); c.moveTo(w * x, 0); c.lineTo(w * (x - 0.05), h); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Quem tá gritando por site', w * 0.05, h * 0.066, w * 0.05, '#fff', 800, 'left', w * 0.9);
    const P = [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]];
    P.slice(0, e.n || 0).forEach(([x, y], i) => {
      const px = w * x, py = h * y, r = w * 0.04;
      c.strokeStyle = 'rgba(47,181,166,0.8)'; c.lineWidth = w * 0.008;
      [1, 2].forEach((k) => { c.beginPath(); c.arc(px + r * 1.2, py - r * 1.6, r * k * 0.9, -0.7, 0.7); c.stroke(); });
      c.fillStyle = '#f39a1e'; c.beginPath(); c.moveTo(px - r * 0.2, py - r * 1.9); c.lineTo(px + r * 1.1, py - r * 2.6); c.lineTo(px + r * 1.1, py - r * 0.9); c.lineTo(px - r * 0.2, py - r * 1.4); c.fill();
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
      void i;
    });
  }
  // O celular do aluno: a busca "Pilates Icaraí" e o resultado sem site
  const BUSCA = 'Pilates Icaraí';
  function busca(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.05, '#111', 800);
    rr(c, w * 0.06, h * 0.07, w * 0.88, h * 0.07, 40, '#eef1f5');
    txt(c, BUSCA.slice(0, e.letras) + (e.letras < BUSCA.length ? '|' : ''), w * 0.12, h * 0.105, w * 0.062, '#111', 700, 'left', w * 0.78);
    if (e.res) {
      rr(c, w * 0.06, h * 0.18, w * 0.88, h * 0.34, 18, '#f7f9fc');
      txt(c, BUSCA, w * 0.11, h * 0.23, w * 0.075, '#111', 900, 'left', w * 0.8);
      txt(c, '★★★★★ 4,8 · Estúdio de pilates', w * 0.11, h * 0.29, w * 0.05, '#d97706', 800, 'left', w * 0.8);
      txt(c, 'Niterói, RJ', w * 0.11, h * 0.34, w * 0.05, '#4a4f58', 700);
      txt(c, 'Site:  —', w * 0.11, h * 0.43, w * 0.075, '#e8352b', 900);
    }
    if (e.erro) {
      rr(c, w * 0.06, h * 0.58, w * 0.88, h * 0.3, 18, '#fde8e7');
      c.strokeStyle = '#e8352b'; c.lineWidth = w * 0.03; c.lineCap = 'round';
      const cx = w / 2, cy = h * 0.67, r = w * 0.08;
      c.beginPath(); c.moveTo(cx - r, cy - r); c.lineTo(cx + r, cy + r); c.moveTo(cx + r, cy - r); c.lineTo(cx - r, cy + r); c.stroke();
      txt(c, 'Horário não', w / 2, h * 0.79, w * 0.07, '#b42318', 900, 'center');
      txt(c, 'encontrado', w / 2, h * 0.84, w * 0.07, '#b42318', 900, 'center');
    }
  }
  // Uma folha desenhada num plano (o contrato e o carimbo)
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }

  // ---------- O fone de ouvido (arco por cima da cabeça e as conchas nas orelhas) ----------
  function fazFone(cor = 0x2fb5a6) {
    const g = new THREE.Group();
    const preto = K.mat(0x22252b, { roughness: 0.5 }), verde = K.mat(cor, { roughness: 0.45 });
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

  // ---------- Os megafones, as ondas do som e os prédios entortando ----------
  const ESC_MEGA = 2.4, ESC_LOJA = 1.15;
  // aponta o megafone pra frente de quem segura (rumo) e pra cima (subir, em radianos); o cabo fica na mão
  function megafoneNa(b, subir, mg = megaG, esc = ESC_MEGA) {
    ve(mg);
    b.g.updateMatrixWorld(true);
    const r = b.g.rotation.y, dx = Math.sin(r), dz = Math.cos(r);
    mg.scale.setScalar(esc);
    mg.rotation.set(0, Math.atan2(-dz, dx), subir);
    mg.position.set(0, 0, 0); mg.updateMatrixWorld(true);
    const cabo = V(-0.3, -0.25, 0).applyMatrix4(mg.matrixWorld).sub(V(0, 0, 0).applyMatrix4(mg.matrixWorld));
    const m = b.mao(1);
    mg.position.set(m[0] - cabo.x, m[1] - cabo.y, m[2] - cabo.z);
    mg.updateMatrixWorld(true);
  }
  const bocaMega = (mg = megaG) => { mg.updateMatrixWorld(true); return V(0.42, 0, 0).applyMatrix4(mg.matrixWorld); };
  const rumoMega = (mg = megaG) => { const a = V(0, 0, 0).applyMatrix4(mg.matrixWorld); return bocaMega(mg).sub(a).normalize(); };
  // os anéis saem da boca do megafone e crescem pela rua (tudo em função do tempo)
  function ondasEm(tc, forca = 1, longe = 16, mg = megaG, lista = aneis, esc = 1) {
    const o = bocaMega(mg), d = rumoMega(mg);
    lista.forEach((a, i) => {
      const k = (tc * 1.25 + i / lista.length) % 1;
      a.visible = forca > 0.01;
      a.position.copy(o).addScaledVector(d, 0.2 + k * longe);
      a.lookAt(a.position.clone().add(d));
      a.scale.setScalar((0.7 + k * 7.5) * esc);
      a.children.forEach((m, j) => { m.material.opacity = (1 - k) * (j ? 0.3 : 0.55) * forca; });
    });
  }
  function fazAneis(n, lista) {
    for (let i = 0; i < n; i++) {
      const a = new THREE.Group();
      const branco = new THREE.Mesh(new THREE.RingGeometry(0.86, 1.0, 64), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      const verde = new THREE.Mesh(new THREE.RingGeometry(1.0, 1.07, 64), new THREE.MeshBasicMaterial({ color: 0x2fb5a6, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
      a.add(branco, verde); a.visible = false; K.scene.add(a); lista.push(a);
    }
  }
  // cada prédio perto de quem grita balança como gelatina quando a onda passa por ele
  function prediosTremem(tc, forca, zc = DZ) {
    predios.forEach((p) => {
      const dist = Math.abs(p.z - zc);
      const amp = forca * K.clamp(1 - dist / 30);
      const w = amp > 0 ? Math.sin(tc * 9 - dist * 0.7) * amp : 0;
      p.g.rotation.x = w * 0.045;
      p.g.scale.set(1 - w * 0.025, 1 + w * 0.03, 1);
    });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], ['academia', {}, 'acad'], 'mundo_mappoa']);
    const Cr = CS.todos.rua, Cq = CS.todos.quarto;
    if (Cq.lugares.janela) JANELA = Cq.lugares.janela;
    // a loja ACADEMIA do calçadão e os prédios em volta dela
    const acad = (Cr.lojas || []).find((l) => l.id === 'academia');
    if (acad) { DZ = acad.porta[2]; K.nomear('loja_academia', acad.g); }
    // as árvores do lado direito ficam a cada 14 m (z = 26 - 14k): o personal fica logo depois de uma
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    PERS_R = [-0.2, 0, DZ];
    L_POS = [[-0.9, 0, DZ + 0.4], [1.0, 0, DZ - 2.4], [-0.7, 0, DZ - 5.2]];
    predios = (Cr.lojas || []).map((l) => { l.g.rotation.order = 'YXZ'; return { g: l.g, z: l.g.position.z }; });

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaAcads = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: ACADS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Estúdios de pilates · Niterói, RJ', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseAcad = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Studio Pilates Ingá', ate: e.ate, aderencia: 0.89 * k,
        dores: ['Sem site próprio', 'Horário só no Instagram'], oportunidades: ['Site com horários, planos e aula experimental pelo WhatsApp'],
        objecoes: ['"As alunas já me acham no Instagram"'], abordagem: 'Mostre quem procura pilates no bairro e não acha o horário.'
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

    // Personagens: o Heitor (do canal), o instrutor do Pilates Icaraí (o personal do kit), o aluno, o rival, os lojistas e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    personal = K.personagem('personal'); K.semNome(personal.g); K.nomear('personal', personal.g);
    aluno = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x1067f8, bermuda: 0x1e1f22, tenis: 0xffffff, cabelo: 0x2a1a10, pele: 0xc98d5e } }); K.semNome(aluno.g); K.nomear('aluno', aluno.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    const padeiro = K.personagem('pizzaiolo', { cores: { avental: 0xf5e6c4 } });
    const donaPet = K.personagem('dona', { cores: { blazer: 0x3fb8c8, vestido: 0xffffff } });
    const donoOtica = K.personagem('dono', { cores: { terno: 0x2a3a5a } });
    [padeiro, donaPet, donoOtica].forEach((b) => { K.semNome(b.g); lojistas.push(b); });
    K.nomear('lojista', padeiro.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O fone na cabeça do Heitor, o mesmo fone em cima da mesa e o fone do rival (vermelho)
    foneG = fazFone(); menino.cabeca.add(foneG); K.nomear('fone', foneG);
    foneMesa = fazFone(); foneMesa.rotation.set(-PI / 2 + 0.15, 0, 0); guarda(foneMesa, null, [0.15, 0.8, -1.15]);
    rivalFone = fazFone(0xd8343a); rival.cabeca.add(rivalFone);
    for (let i = 0; i < 4; i++) notas.push(fazNota(i));

    // O megafone gigante e os anéis das ondas; os três megafones dos lojistas, com os anéis deles
    megaG = K.m3d('megafone', { cor: 0xf39a1e }); guarda(megaG, 'megafone');
    fazAneis(6, aneis);
    megsG = new THREE.Group(); K.scene.add(megsG); K.nomear('megafones', megsG); tudo.push(megsG);
    for (let i = 0; i < 3; i++) { const m = K.m3d('megafone', { cor: 0xf39a1e }); megsG.add(m); megs.push(m); const l = []; fazAneis(4, l); aneisL.push(l); }

    // Quarto: o computador, as propostas "faço sites", o biscoito Globo e a moeda, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    const avG = new THREE.Group(); K.scene.add(avG); K.nomear('propostas', avG); tudo.push(avG);
    for (let i = 0; i < 4; i++) { const e = K.m3d('envelope'); e.scale.setScalar(0.32); avG.add(e); avioes.push(e); }
    tapG = new THREE.Group();
    // o biscoito Globo: a argola de polvilho saindo do saquinho
    const argola = K.malha(new THREE.TorusGeometry(0.12, 0.04, 14, 32), K.mat(0xf3e2bd, { roughness: 0.9 }));
    argola.position.set(0, 0.13, 0);
    const saco = K.malha(new THREE.BoxGeometry(0.22, 0.2, 0.06), K.mat(0xffffff, { roughness: 0.6 }));
    const faixa = K.malha(new THREE.BoxGeometry(0.225, 0.06, 0.065), K.mat(0xd8343a, { roughness: 0.5 }));
    faixa.position.set(0, -0.02, 0);
    const faixa2 = K.malha(new THREE.BoxGeometry(0.225, 0.025, 0.066), K.mat(0x2f6fd6, { roughness: 0.5 }));
    faixa2.position.set(0, -0.065, 0);
    tapG.add(argola, saco, faixa, faixa2);
    K.scene.add(tapG); K.nomear('biscoito', tapG); tudo.push(tapG);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 }));
    K.scene.add(moeda); tudo.push(moeda);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    pino = K.m3d('pino'); guarda(pino, 'pino', [0.9, 2.2, 0.3], 0.8);

    // Rua: o contrato do rival com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Pilates Icaraí', w / 2, h * 0.22, w * 0.065, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    K.scene.add(contrato); K.nomear('contrato', contrato); tudo.push(contrato);

    // Academia: o celular gigante do aluno
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CEL);

    // Efeitos
    fx.grito = K.balaoFala(); K.nomear('grito', fx.grito.g);
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      quadras: e('Na esquina', 'laranja'), web: e('Web designer', 'azul'), longe: e('Outro estado →', 'laranja'), semSite: e('Sem site', 'vermelho'),
      outro: e('Outro web designer', 'vermelho'), errado: e('Pro lado errado', 'laranja'), investir: e('Investir', 'azul'),
      maceio: e('Niterói', 'azul'), precisa: e('Quem precisa de você', 'verde'), musica: e('Só música', 'vermelho'),
      ouviu: e('Primeiro!', 'verde'), tirou: e('Tirou o fone', 'azul')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    menino.sentar(1);
  }
  // O personal no meio do calçadão, gritando no megafone gigante (subir: o quanto aponta pro alto)
  function personalGritando(tc, subir, olhar) {
    personal.colocar(PERS_R, olhar || [PERS_R[0] + 7, 1.5, DZ + 8]);
    personal.apontar(0.75 + subir * 0.6);
    personal.humor('bravo');
    personal.g.rotation.x = -0.06 - Math.abs(Math.sin(tc * 9)) * 0.03;
    megafoneNa(personal, subir);
  }
  // Um lojista gritando no megafone dele, pro alto ou pra quem passa
  function lojistaGritando(i, tc, subir, olhar, pos) {
    const b = lojistas[i];
    b.colocar(pos || L_POS[i], olhar || mais(pos || L_POS[i], [1.5 - i, 1.5, 8]));
    b.apontar(0.75 + subir * 0.6);
    b.humor('bravo');
    b.g.rotation.x = -0.05 - Math.abs(Math.sin(tc * 9 + i)) * 0.03;
    ve(megsG);
    megafoneNa(b, subir, megs[i], ESC_LOJA);
  }
  // O Heitor andando no calçadão de fone, de olho fechado, balançando a cabeça
  function muriloAndando(tc, x, de, ate, rumo = 1) {
    ve(foneG);
    menino.irPara([0.85, 0, DZ + de], [0.85, 0, DZ + ate], K.clamp(x), tc, { reto: true });
    menino.humor('feliz');
    menino.cabeca.rotation.z = Math.sin(tc * 7) * 0.14;
    notasEm(cabecaDe(menino, 0), tc);
    void rumo;
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o personal no meio do calçadão com o megafone gigante e o balão "ALGUÉM FAZ MEU SITE?"; as ondas e os prédios entortando; o Heitor de fone, andando na frente · MOSTRA: personal, megafone, personagem
      // CENÁRIO: a rua entre prédios de dia, a gente andando (o cenário cuida)
      const tG = quando('gritou', B, 0.15), tQ = quando('esquina', B, 0.45), tO = quando('fone', B, 0.92);
      // PERSONAGEM: o personal grita (corpo pra trás) · o Heitor anda de olho fechado, balançando a cabeça
      personalGritando(tc, 0.32);
      muriloAndando(tc, pc(tc, B.inicio - 1, B.ate + 1), 1.6, 3.0);
      // OBJETOS SE MEXENDO: os anéis saindo a cada ~0,4 s; os prédios balançando
      ondasEm(tc, 1);
      prediosTremem(tc, 1);
      // EFEITOS VISUAIS: o balão em "gritou" · "Na esquina" no último corte
      fx.grito.em(mais(bocaMega().toArray(), [0, 0.6, 0]), tc - tG + 0.3, { texto: 'ALGUÉM FAZ MEU SITE?', lado: -1 });
      // SONS: o apito do personal · o grito (zumbido) com eco · whoosh a cada onda · o tremor
      K.som('apito', B.inicio, 0.35); K.som('zumbido', B.inicio + 0.05, 0.5); K.som('estrondo', B.inicio + 0.1, 0.35);
      for (let k = 0; k < 5; k++) K.som('whoosh', B.inicio + 0.2 + k * 0.8, 0.35);
      K.som('range', tQ, 0.4); K.som('ding', tO, 0.3);
      // CÂMERA: 4 cortes (a boca do megafone, o prédio entortando, o quadro inteiro em "na esquina", o Heitor de fone em "E ele tava de fone")
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(B.inicio + 2.1, quando('ele', B, 0.6) - 0.05);
      const boca = bocaMega().toArray();
      if (tc < c1) {
        K.filmar([boca, mais(boca, [0, 0.9, 0]), mais(boca, [0, -0.6, 0])], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 2.2, obstaculos: false });
      } else if (tc < c2) {
        const pr = predios.filter((p) => p.g.position.x > 0).sort((a, b) => Math.abs(a.z - DZ - 3) - Math.abs(b.z - DZ - 3))[0];
        const zb = pr ? pr.z : DZ, k = pc(tc, c1, c2);
        K.mirar([-2.2, K.lerp(1.2, 1.8, k), zb + 9 - k], [5.6, K.lerp(7, 10, k), zb]);
      } else if (tc < c3) {
        fx.et.quadras.em(mais(cabecaDe(personal, 0), [0.9, 0.2, 1.2]), tc - c2);
        K.filmar([personal, boca, mais(boca, [0, 1.0, 0]), menino], 'afastando', pc(tc, c2, c3), { plano: 'medio', lado: 4, altura: 'olho', espacoCima: 0.22, tam: 3.4 });
      } else {
        K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.9)], 'chegando', pc(tc, c3, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.7 });
      }
    },
    longe(B, tc) {
      // NA TELA: o quarto de dia; o Heitor de fone digitando; as propostas "faço sites" saindo do computador e fugindo pela janela · MOSTRA: personagem, monitor, propostas
      const tW = quando('designer', B, 0.15), tF = quando('fone', B, 0.38), tM = quando('mandando', B, 0.5), tE = quando('estado', B, 0.92);
      ve(comp); ve(foneG);
      // PERSONAGEM: começo digitando, balançando a cabeça · em "estado": vira e aponta a janela, animado
      sentado(MONITOR);
      if (tc > tE) { menino.reagir('comemorando', tc - tE); } else { menino.reagir('digitando', tc); menino.cabeca.rotation.z = Math.sin(tc * 7) * 0.12; }
      notasEm(cabecaDe(menino, 0), tc);
      const enviadas = tc > tM ? 1 + Math.floor((tc - tM) / 0.4) : 0;
      comp.tela.desenhar((c, w, h) => emailLonge(c, w, h, { n: enviadas }), 'mail' + enviadas);
      // ENTRA AGORA e OBJETOS SE MEXENDO: uma proposta a cada ~0,4 s, do monitor em arco até a janela, encolhendo
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
      // CÂMERA: (1) até "fone": chegando · médio · frente · olho · (2) passando · médio · esquerda · olho
      const cv = (tF + tM) / 2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.5, 0]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 22, altura: 'olho', tam: 1.3 });
      else K.filmar([cabecaDe(menino, 0.1), MONITOR, JANELA], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.9 });
    },
    academia(B, tc) {
      // NA TELA: a academia por dentro; o personal perto do banco e das esteiras; o aluno com o celular gigante: "Pilates Icaraí", "Site: —", "Horário não encontrado" · MOSTRA: personal, aluno, celular
      // CENÁRIO: a academia, as esteiras, os halteres e o espelho (o cenário cuida)
      const tSi = quando('site', B, 0.35), tPr = quando('procura', B, 0.55), tAc = quando('acha', B, 0.75), tHo = quando('horário', B, 0.92);
      // PERSONAGEM: o personal segura o halter olhando a porta · em "horário": encolhe os ombros. O aluno digita · em "acha": faz não com a cabeça
      personal.colocar(PERS_A, tc > tPr ? cabecaDe(aluno, -0.4) : [1.0, 1.2, 6]);
      if (tc > tHo) personal.reagir('ombros', tc - tHo); else { personal.reagir('segurando', tc - B.inicio); personal.g.rotation.y += Math.sin(tc * 5) * 0.08; }
      aluno.colocar(ALU, mais(CEL, [0, 1.0, 0]));
      if (tc > tAc) aluno.reagir('nao', tc - tAc); else aluno.reagir('celular', tc - B.inicio);
      // ENTRA AGORA: o celular gigante sobe na palavra "procura"; o resultado e o ✗ em "horário"
      ve(cel); K.entrar(cel, 'cresce', tc - tPr, { dur: 0.35 });
      cel.rotation.set(0, Math.atan2(-1.6 - CEL[0], 6 - CEL[2]), 0);
      const letras = Math.max(0, Math.min(BUSCA.length, Math.floor((tc - tPr) / 0.05)));
      cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { letras, res: tc > tAc - 0.25, erro: tc > tHo }), 'b' + letras + (tc > tAc - 0.25) + (tc > tHo));
      // EFEITOS VISUAIS: "Sem site" em "site" · ✗ em "horário" (o congela em preto e branco o jogo faz)
      fx.et.semSite.em(cabecaDe(personal, 0.4), tc - tSi);
      if (tc > tHo) fx.simb.em(mais(CEL, [0.5, 2.0, 0.1]), tc - tHo, { tipo: '✗', tam: 0.9 });
      // SONS: o apito · cliques do celular · errado em "horário"
      K.som('apito', B.inicio + 0.1, 0.25);
      for (let k = 0; k < 10; k++) K.som('clique', tPr + k * 0.06, 0.2);
      K.som('errado', tHo, 0.6);
      // CÂMERA: (1) até "site": girando · médio · direita · olho · (2) chegando · perto · esquerda · olho
      const cv = (tSi + tPr) / 2;
      if (tc < cv) K.filmar([personal, cabecaDe(personal, 0.5), [3.4, 1.0, -2.8]], 'girando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 25, angulo: 20, altura: 'olho', tam: 2.1 });
      else K.filmar([aluno, mais(CEL, [0, 0.2, 0]), mais(CEL, [0, 1.7, 0]), cabecaDe(personal, 0.2)], 'chegando', pc(tc, cv, B.ate), { plano: 'perto', lado: -14, altura: 'olho', tam: 1.5 });
    },
    rival(B, tc) {
      // NA TELA: a rua; o personal gritando; o rival de moletom vermelho tira o fone, corre até ele, aperto de mão e o contrato FECHADO; o Heitor de fone lá no fundo · MOSTRA: rival, personal, contrato
      const tDe = quando('designer', B, 0.4), tCh = quando('Chegou', B, 0.5), tFe = quando('fechou', B, 0.82), tSi = quando('site', B, 0.95);
      // o Heitor lá atrás do personal, de fone, indo embora sem ver
      muriloAndando(tc, pc(tc, B.inicio, B.ate + 0.5), -3.0, -5.5);
      menino.g.rotation.y = PI;
      const RIV_A = [0.5, 0, DZ + 8], RIV_B = [0.5, 0, DZ + 1.15];
      if (tc < tCh) {
        // PERSONAGEM: o rival tira o fone e vira pro grito · depois corre até o personal
        personalGritando(tc, 0.5);
        ondasEm(tc, 1, 14); prediosTremem(tc, 1);
        fx.grito.em(mais(bocaMega().toArray(), [0, 0.6, 0]), 1, { texto: 'ALGUÉM FAZ MEU SITE?', lado: -1 });
        const tira = K.suave(pc(tc, B.inicio, B.inicio + 0.3));
        rivalFone.visible = tira < 1; rivalFone.position.y = 0.3 * tira; rivalFone.rotation.z = -0.6 * tira;
        const k = pc(tc, B.inicio + 0.3, tCh + 0.15);
        rival.irPara(RIV_A, RIV_B, k, tc, { reto: true });
        if (k > 0 && k < 1) fx.vel.em(mais(rival.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: rival.g.rotation.y });
        fx.et.outro.em(cabecaDe(rival, 0.5), tc - tDe);
        K.som('whoosh', B.inicio + 0.35, 0.45); K.som('passo', B.inicio + 0.6, 0.3); K.som('passo', B.inicio + 0.85, 0.3);
        // CÂMERA: (1) atrás do rival, no meio do calçadão (fora das árvores), vendo ele correr até o personal
        const kc = K.suave(pc(tc, B.inicio, tCh));
        K.mirar([0.4, K.lerp(2.3, 2.0, kc), DZ + K.lerp(11.5, 10.2, kc)], [0.2, 1.3, DZ + K.lerp(4.5, 1.5, kc)]);
      } else {
        // INTERAÇÃO: o aperto de mão; o personal baixa o megafone; o contrato aparece e o carimbo FECHADO bate em "fechou"
        rival.colocar(RIV_B, cabecaDe(personal, -1.3));
        personal.colocar(PERS_R, cabecaDe(rival, -1.3));
        personal.humor('feliz');
        const desce = K.suave(pc(tc, tCh, tCh + 0.4));
        // o megafone sobe reto pro céu (não tampa o aperto de mão)
        megafoneNa(personal, K.lerp(0.5, 1.45, desce));
        if (tc > tSi) personal.reagir('vitoria', tc - tSi);
        rival.apontar(0.35); rival.humor('feliz');
        const meio = [(RIV_B[0] + PERS_R[0]) / 2 + 0.15, 1.9, (RIV_B[2] + PERS_R[2]) / 2 + 0.35];
        // CÂMERA: (2) passando · médio · esquerda · olho, com o Heitor pequeno no fundo
        const kp = K.suave(pc(tc, tCh, B.ate));
        K.mirar([K.lerp(-0.9, -0.4, kp), 1.8, DZ + 5.4], [0.15, 1.35, DZ + 0.5]);
        contrato.visible = tc > tFe - 0.35;
        contrato.position.set(...meio); contrato.lookAt(K.camera.position);
        contrato.scale.setScalar(pop(tc - tFe + 0.35));
        carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
        K.som('baque', tFe, 0.6); K.som('certo', tSi, 0.4);
      }
    },
    ouvir(B, tc) {
      // NA TELA: o Heitor de fone parado no calçadão; em "tira" ele tira o fone; em "rua" o padeiro, a dona do pet shop e o dono da ótica aparecem gritando nos megafones, a rua tremendo · MOSTRA: megafones, personagem, fone
      // CENÁRIO: a rua entre prédios de dia; os prédios balançam com as ondas
      const tTi = quando('tira', B, 0.2), tRu = quando('rua', B, 0.6), tGr = quando('gritando', B, 0.85);
      // ENTRA AGORA: os 3 megafones um atrás do outro, a partir de "rua"
      lojistas.forEach((b, i) => {
        const t0 = tRu - 0.1 + i * 0.25;
        lojistaGritando(i, tc, 0.9);
        megs[i].scale.setScalar(ESC_LOJA * pop(tc - t0));
        if (tc > t0) ondasEm(tc + i * 0.3, 1, 9, megs[i], aneisL[i], 0.6);
        b.g.visible = tc > t0 - 0.05;
        K.som('zumbido', t0, 0.3);
      });
      prediosTremem(tc, tc > tRu ? 1.4 : 0, DZ - 2);
      // PERSONAGEM: começo andando de fone, balançando a cabeça · em "tira": para e puxa o fone pro pescoço · em "rua": susto, vira pra rua
      if (tc < tTi) {
        muriloAndando(tc, pc(tc, B.inicio - 0.6, tTi), 3.4, 4.6);
      } else {
        ve(foneG);
        const olha = tc < tRu ? [1.6, 1.5, DZ + 12] : [-0.4, 1.6, DZ - 2.4];
        menino.colocar([0.85, 0, DZ + 4.6], olha);
        if (tc < tRu) menino.reagir('segurando', tc - tTi); else menino.reagir('surpreso', tc - tRu);
        const k = K.suave(pc(tc, tTi, tTi + 0.35));
        foneG.position.set(0, -0.42 * k, 0.06 * k); foneG.rotation.x = 0.5 * k;
        fx.et.tirou.em({ tela: [540, 400] }, tc - tTi);
        if (tc > tRu) fx.simb2.em(cabecaDe(menino, 0.35), tc - tRu, { tipo: '!', tam: 0.8 });
      }
      // EFEITOS VISUAIS: "Tirou o fone" em "tira" · "!" em "rua" · "Pro lado errado" some; a rua grita
      // SONS: a música corta em "fone" (desliga) · o zumbido de cada megafone · o tremor em "gritando"
      K.som('desliga', tTi + 0.2, 0.5); K.som('ding', tRu, 0.5); K.som('estrondo', tGr, 0.3); K.som('whoosh', tRu, 0.4);
      // CÂMERA: (1) até o meio entre "tira" e "rua": de frente pra ele, perto, chegando · (2) do alto, descendo por cima do ombro dele, a rua inteira com os megafones
      const cv = (tTi + tRu) / 2 + 0.15;
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([0.7, 1.7, DZ + K.lerp(10.4, 9.4, k)], [0.8, 1.35, DZ + 4.4]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([1.4, K.lerp(6.6, 5.4, k), DZ + 12.2], [0.3, 1.2, DZ + 1.3]); }
    },
    investe(B, tc) {
      // NA TELA: o quarto; o fone largado na mesa; o biscoito Globo na mão vira moeda e cai no computador; na tela, os pinos com megafones · MOSTRA: personagem, biscoito, monitor
      const tFo = B.inicio, tDe = quando('decidiu', B, 0.12), tIn = quando('investir', B, 0.22), tTa = quando('biscoito', B, 0.38), tFe = quando('sistema', B, 0.55), tGr = quando('gritando', B, 0.82);
      ve(comp, foneMesa);
      // PERSONAGEM: começo segurando o biscoito, pensando · em "decidiu": olha o biscoito e faz sim · em "sistema": joga a moeda no computador e digita
      // de pé do lado da mesa, virado pra câmera; em "ferramenta" vira pro computador
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tDe) menino.reagir('segurando', tc - B.inicio);
      else if (tc < tFe) menino.reagir('sim', tc - tDe);
      else menino.reagir('digitando', tc);
      menino.humor(tc > tDe ? 'feliz' : 'normal');
      // OBJETOS SE MEXENDO: o biscoito na mão (de "biscoito" até "sistema"), o poof, a moeda caindo no teclado
      const mao = menino.mao(1), tapPos = mais(mao, [0.05, 0.12, 0.08]);
      if (tc > tTa - 0.35 && tc < tFe) { ve(tapG); tapG.position.set(...tapPos); tapG.rotation.set(0, Math.sin(tc * 2) * 0.4 + 0.3, 0.1); tapG.scale.setScalar(pop(tc - tTa + 0.35)); }
      if (tc > tFe) {
        fx.poof.em(tapPos, tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = q < 1 || tc < tFe + 1.2;
        moeda.position.set(K.lerp(tapPos[0], TECLADO[0], q), K.lerp(tapPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4 + (q >= 1 ? Math.abs(Math.sin((tc - tFe - 0.45) * 12)) * 0.06 * Math.max(0, 1 - (tc - tFe - 0.45) * 2) : 0), K.lerp(tapPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapaGrito(c, w, h, { n: tc > tGr ? Math.min(6, 1 + Math.floor((tc - tGr) / 0.12)) : 1 }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + (tc > tGr ? Math.min(6, 1 + Math.floor((tc - tGr) / 0.12)) : 1));
      for (let k = 0; k < 6; k++) K.som('estalo', tGr + k * 0.12, 0.2);
      // EFEITOS VISUAIS: "Investir" em "investir"
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      K.som('estalo', tTa - 0.3, 0.4); void tFo;
      // CÂMERA: (1) até "ferramenta": chegando · perto · direita · olho, nele com o biscoito · (2) subindo · médio · frente · olho, na tela com os pinos
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), tapPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do computador; a lista dos estúdios de pilates de Niterói sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.02), tPc = quando('computador', B, 0.3), tL = quando('lista', B, 0.55), tAc = quando('estúdios', B, 0.65), tMc = quando('Niterói', B, 0.85);
      ve(comp, navG, foneMesa);
      comp.tela.desenhar((c, w, h) => mapaGrito(c, w, h, { n: 6 }), 'm6');
      // ENTRA AGORA: a barra em "Digitou", as letras logo depois; a lista sobe em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi + 0.15, { dur: 0.3 }); void tPc;
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi - 0.1) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + 0.1 + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tAc ? 1 + Math.floor((tc - tAc) / 0.22) : 0;
        telaC.mostrar('listaAcads', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tAc + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo digitando · em "lista": levanta e aponta o Studio Pilates Ingá
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.maceio.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tMc);
      // CÂMERA: (1) até a lista: chegando · perto · no endereço e nas mãos · (2) afastando · médio · frente · olho
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Studio Pilates Ingá; o robô à esquerda; o Heitor à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseAcad', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
      // NA TELA: (1) Antes: de fone, só na música, as propostas fugindo; (2) Agora: sem fone na rua, vira pro grito do padeiro; (3) chega primeiro, mostra a análise, o padeiro baixa o megafone e faz joia, "Primeiro!" · MOSTRA: personagem, lojista, tela
      const tA = quando('Agora', B, 0.45), tOv = tA + 0.25, tQu = quando('primeiro', B, 0.72) - 0.25, tCh = quando('ouvir', B, 0.9);
      const padeiro = lojistas[0];
      if (tc < tA) {
        ve(comp, foneG); comp.tela.desenhar((c, w, h) => emailLonge(c, w, h, { n: 37 }), 'mail37');
        sentado(MONITOR); menino.reagir('digitando', tc); menino.cabeca.rotation.z = Math.sin(tc * 7) * 0.14; notasEm(cabecaDe(menino, 0), tc);
        ve(avioesG());
        avioes.forEach((e, i) => {
          const q = (tc * 0.9 + i * 0.25) % 1, de = mais(MONITOR, [0, 0.35, 0.15]);
          e.visible = true;
          e.position.set(K.lerp(de[0], JANELA[0], q), K.lerp(de[1], JANELA[1], q) + Math.sin(q * PI) * 0.9, K.lerp(de[2], JANELA[2], q) + Math.sin(q * PI) * 0.8);
          e.rotation.set(0.2, q * 3, 0); e.scale.setScalar(0.32 * (1 - q * 0.75));
        });
        fx.et.musica.em(cabecaDe(menino, 0.6), tc - B.inicio - 0.2);
        K.som('whoosh', B.inicio + 0.3, 0.4);
        // CÂMERA: (1) afastando · médio · direita · olho
        K.filmar([cabecaDe(menino, 0.3), MONITOR, JANELA], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 28, altura: 'olho', tam: 2.2 });
      } else if (tc < tQu) {
        // a rua: ele anda sem fone; em "ouve" vira a cabeça pro grito do padeiro, que está no lugar do personal
        menino.irPara([0.85, 0, DZ + 9], [0.85, 0, DZ + 3.4], K.clamp((tc - tA + 0.2) / (tQu - tA + 0.6)), tc, { reto: true });
        if (tc > tOv) menino.cabeca.rotation.y = 0.5 * K.suave(pc(tc, tOv, tOv + 0.2));
        lojistaGritando(0, tc, 0.6, null, PERS_R);
        ondasEm(tc, 0.7, 9, megs[0], aneisL[0], 0.6); prediosTremem(tc, 0.4);
        K.som('zumbido', tA + 0.05, 0.35); K.som('whoosh', tA, 0.5); K.som('passo', tA + 0.2, 0.3);
        // CÂMERA: (2) de baixo pra cima, com os prédios gigantes atrás
        const kh = K.suave(pc(tc, tA, tQu));
        K.mirar([0.5, 0.55, DZ + 12.3], [0.75, K.lerp(2.4, 2.8, kh), DZ + 5]);
      } else {
        // ele chega no padeiro e mostra a análise; o padeiro baixa o megafone e faz joia
        menino.colocar([0.85, 0, DZ + 1.3], cabecaDe(padeiro, -1.3));
        padeiro.colocar(PERS_R, cabecaDe(menino, -1.3)); padeiro.humor('feliz');
        const desce = K.suave(pc(tc, tQu, tQu + 0.45));
        if (tc > tCh) padeiro.reagir('vitoria', tc - tCh); else padeiro.apontar(0.6 - desce * 0.6);
        ve(megsG); megafoneNa(padeiro, K.lerp(0.3, -0.9, desce), megs[0], ESC_LOJA);
        ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.25, m[1] + 0.5, m[2] - 0.05); telaM.g.rotation.set(0, -0.9, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tQu));
        telaM.mostrar('analiseAcad', { ate: 2, score: 1 });
        menino.reagir('mostrando', tc - tQu);
        if (tc > tCh) fx.simb.em(mais(PERS_R, [0.6, 2.35, 0.6]), tc - tCh, { tipo: '✓', tam: 0.75 });
        fx.et.ouviu.em({ tela: [540, 400] }, tc - tCh);
        K.som('certo', tCh, 0.6);
        // CÂMERA: (3) chegando · médio · esquerda · olho
        const k3 = K.suave(pc(tc, tQu, B.ate));
        K.mirar([-0.9, 1.75, DZ + K.lerp(6.2, 5.6, k3)], [0.35, 1.45, DZ + 0.6]);
      }
    },
    segue(B, tc) {
      // NA TELA: o Heitor de pé no quarto; o cartão de seguir entra em "Segue" e vira "Seguindo"; a barra com mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      // EFEITOS VISUAIS: o cartão de seguir junto com o "Segue"
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, foneMesa); comp.tela.desenhar(siteDemo, 'demo');
      // ENTRA AGORA: a barra em "computador"; as letras a partir de "digita"
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      // SONS: o clique do seguir · as teclas · o ding em "testa"
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (aponta pra quem assiste) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
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
      personalGritando(0.4, 0.32);
      // a capa vende "Ele tava de fone": o Heitor grande na frente, de fone e sorrindo, e o megafone gritando atrás dele
      muriloAndando(0.7, 0.9, 1.6, 3.0);
      ondasEm(0.55, 1); prediosTremem(0.5, 1);
      const boca = bocaMega().toArray();
      K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.9), boca], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.3, tam: 2.2 });
    }
  };
  const avioesG = () => avioes[0].parent;

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, personal, aluno, rival, ...lojistas].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    foneG.visible = false; foneG.rotation.set(0, 0, 0); foneG.position.set(0, 0, 0);
    rivalFone.visible = true; rivalFone.rotation.set(0, 0, 0); rivalFone.position.set(0, 0, 0);
    menino.cabeca.rotation.z = 0; menino.cabeca.rotation.y = 0;
    aneis.forEach((a) => { a.visible = false; });
    aneisL.forEach((l) => l.forEach((a) => { a.visible = false; }));
    megs.forEach((m) => { m.visible = false; });
    notas.forEach((s) => { s.visible = false; });
    avioes.forEach((e) => { e.visible = false; });
    prediosTremem(tc, 0);
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1); cel.position.set(...CEL);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
