// Tem cliente implorando por um site. E você passa reto (canal Mappoa).
// O Nico, web designer, anda pelo calçadão de olho no celular reclamando que ninguém quer site, e nem percebe a
// confeiteira da Doce Lume deitada no chão, agarrada no tornozelo dele, sendo arrastada e chorando dois jatos de
// lágrima. O rival olha pra baixo e fecha o site com ela. O Nico vê a trilha de lágrima, guarda o celular e vai atrás:
// investe "o preço de um bolo", digita mappoa.com e vem a lista das confeitarias de São Luís sem site.
// Três lugares (K.cenarios): o calçadão (rua_predios), o quarto do Nico (home_office) e o palco do Mappoa.
// A dona arrastada: K.personagem deitado de bruços (rotation.x = 90°, a cabeça pro +z), os braços pra cima (que viram
// pra frente) e a cabeça levantada olhando pra frente; o corpo é empurrado pra as mãos ficarem no tornozelo dele.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dona, dona2, rival, cliente, robo, comp, telaC, telaM, navG, FOV0;
  let lagG, celN, bolo, celC, contrato, carimbo, nota, moeda, cadeira, placaDoce, placaBrig, trilha, chapeu;
  const tudo = [], fx = {};
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
  // Rua: DZ = a faixa da confeitaria (logo depois de uma árvore da direita, z = 26 - 14k + 0,5). O Nico anda na faixa
  // x 0,7 do calçadão, pro +z; a confeiteira na porta (lado esquerdo). DZ2 = a Brigadeiro do Centro do "Agora"
  let DZ = -5, DZ2 = -19;
  const XN = 0.7; // a faixa onde o Nico anda
  let DONA, CLI, DONA2, NICO2;
  function lugaresRua() {
    DONA = [-1.9, 0, DZ - 0.3]; CLI = [-0.8, 0, DZ + 0.4];
    DONA2 = [-1.9, 0, DZ2 - 0.3]; NICO2 = [-0.7, 0, DZ2 + 0.5];
  }
  lugaresRua();

  const LUGAR = {
    gancho: 'rua', reclama: 'rua', confeitaria: 'rua', rival: 'rua', olha: 'rua',
    investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'rua', segue: 'rua', cartao: 'rua', capa: 'rua'
  };

  // A Doce Lume já fechou com o rival: na lista SEM SITE entram as outras
  const DOCES = [
    { nome: 'Brigadeiro do Centro', end: 'Rua Grande, 1210', chips: ['whats', 'insta'] },
    { nome: 'Bolo da Ilha', end: 'Av. dos Holandeses, 880', chips: ['tel', 'insta'] },
    { nome: 'Doce Reviver', end: 'Rua do Giz, 145', chips: ['whats'] },
    { nome: 'Ateliê Lençóis', end: 'Av. Colares Moreira, 2300', chips: ['whats', 'tel'] }
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
  // A rede social que o Nico rola no celular
  function feed(c, w, h, k) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const off = (k * h * 0.8) % (h * 0.5);
    for (let i = -1; i < 4; i++) {
      const y = i * h * 0.5 - off;
      rr(c, w * 0.06, y + h * 0.04, w * 0.88, h * 0.3, 12, ['#ffd6e5', '#c7f0ea', '#fde68a', '#c7d7fe'][(i + 4) % 4]);
      c.fillStyle = '#d6dbe3'; c.fillRect(w * 0.06, y + h * 0.37, w * 0.6, h * 0.03);
    }
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
  // Uma folha que dá pra redesenhar (a tela do celular do Nico)
  function quadro(l, a, px) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t }));
    let chave = null;
    m.desenhar = (fn, k) => { if (k === chave) return; chave = k; fn(cv.getContext('2d'), cv.width, cv.height); t.needsUpdate = true; };
    return m;
  }
  // Placa de loja num poste do calçadão, de frente pra +z (a placa na fachada fica de quina e some)
  function placaPoste(texto, cor) {
    const g = new THREE.Group();
    const pf = folha(1.9, 0.52, 640, (c, w, h) => {
      rr(c, 0, 0, w, h, h * 0.18, cor);
      c.strokeStyle = '#ffffff'; c.lineWidth = h * 0.06; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, h * 0.14); c.stroke();
      txt(c, texto, w / 2 + h * 0.18, h / 2 + 2, h * 0.4, '#ffffff', 900, 'center', w * 0.78);
      // o bolinho
      const bx = w * 0.085, by = h * 0.56;
      rr(c, bx - h * 0.16, by - h * 0.02, h * 0.32, h * 0.2, 6, 'rgba(255,255,255,.9)');
      rr(c, bx - h * 0.11, by - h * 0.17, h * 0.22, h * 0.16, 6, 'rgba(255,255,255,.9)');
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(bx, by - h * 0.23, h * 0.05, 0, PI * 2); c.fill();
    });
    pf.position.y = 2.45; g.add(pf);
    const poste = K.malha(new THREE.CylinderGeometry(0.04, 0.05, 2.25, 12), K.mat(0x3b4048, { metalness: 0.4 }));
    poste.position.y = 1.12; g.add(poste);
    return g;
  }

  // ---------- O jato de lágrima (de desenho animado: gotinhas finas em arco) ----------
  function fazJato(seed, n = 34) {
    const r = K.rand(seed), g = new THREE.Group();
    const mat = K.mat(0x9fd8ff, { roughness: 0.05, metalness: 0.15, transparent: true, opacity: 0.92 });
    const geo = new THREE.SphereGeometry(0.022, 8, 6);
    const ps = [];
    for (let i = 0; i < n; i++) { const m = K.malha(geo, mat, false); ps.push({ m, fase: i / n, jx: r() - 0.5, jy: r() - 0.5, jz: r() - 0.5, s: 0.7 + r() * 0.6 }); g.add(m); }
    g.visible = false; K.scene.add(g);
    return {
      esconder() { g.visible = false; },
      em(o, dir, vel, t) {
        g.visible = true;
        ps.forEach((p) => {
          const tau = ((t * 1.6 + p.fase) % 1) * 0.55;
          const vx = (dir[0] + p.jx * 0.08) * vel, vy = (dir[1] + p.jy * 0.08) * vel, vz = (dir[2] + p.jz * 0.08) * vel;
          const y = o[1] + vy * tau - 4.9 * tau * tau;
          p.m.visible = y > 0.02;
          p.m.position.set(o[0] + vx * tau, y, o[2] + vz * tau); p.m.scale.setScalar(p.s);
        });
      }
    };
  }

  // ---------- O bolo de três andares ----------
  function fazBolo() {
    const g = new THREE.Group();
    const rosa = K.mat(0xf58bb0, { roughness: 0.55 }), creme = K.mat(0xfff6ec, { roughness: 0.4 });
    [[0.22, 0.13, 0], [0.165, 0.12, 0.13], [0.11, 0.11, 0.25]].forEach(([r, h, y]) => {
      const m = K.malha(new THREE.CylinderGeometry(r, r, h, 28), rosa); m.position.y = y + h / 2; g.add(m);
      const c = K.malha(new THREE.TorusGeometry(r, 0.022, 8, 28), creme); c.rotation.x = PI / 2; c.position.y = y + h; g.add(c);
    });
    const prato = K.malha(new THREE.CylinderGeometry(0.28, 0.28, 0.02, 28), K.mat(0xffffff, { roughness: 0.3 })); prato.position.y = -0.01; g.add(prato);
    const cereja = K.malha(new THREE.SphereGeometry(0.04, 14, 10), K.mat(0xd8243a, { roughness: 0.25 })); cereja.position.y = 0.4; g.add(cereja);
    g.userData.cereja = cereja;
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['rua_predios', {}, 'rua'], 'mundo_mappoa']);
    // a PADARIA do lado esquerdo mais perto do meio (vira a Doce Lume)
    const Cr = CS.todos.rua;
    const esq = (Cr.lojas || []).filter((l) => l.lado < 0 && l.porta[2] < 8 && l.porta[2] > -22);
    const pads = esq.filter((l) => l.id === 'padaria');
    const lista = (pads.length ? pads : esq).sort((a, b) => Math.abs(a.porta[2] + 5) - Math.abs(b.porta[2] + 5));
    if (lista[0]) DZ = lista[0].porta[2];
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    DZ2 = DZ - 14;
    lugaresRua();
    placaDoce = placaPoste('DOCE LUME', '#f06a9b'); guarda(placaDoce, 'placa_confeitaria', [-2.5, 0, DZ - 0.9]);
    placaBrig = placaPoste('BRIGADEIRO', '#6b3e26'); guarda(placaBrig, 'placa_brigadeiro', [-2.5, 0, DZ2 - 0.9]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaDoces = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: DOCES, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Confeitarias · São Luís, MA', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseDoce = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Brigadeiro do Centro', ate: e.ate, aderencia: 0.9 * k,
        dores: ['Sem site: encomenda só pelo WhatsApp', 'Cliente não acha o cardápio de bolos'], oportunidades: ['Site com cardápio de bolos e pedido de encomenda'],
        objecoes: ['"Meu cliente me chama no Insta"'], abordagem: 'Mostre quem procura bolo de encomenda e não acha o cardápio.'
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

    // Personagens: o Nico (do canal), a confeiteira da Doce Lume, a dona da Brigadeiro do Centro, o rival, o cliente
    // e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.personagem('dona', { cores: { blazer: 0xf06a9b, vestido: 0xffffff, cabelo: 0x3a2416 } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    dona2 = K.personagem('dona', { cores: { blazer: 0x6b3e26, vestido: 0xfff1dc, cabelo: 0x1c120c, pele: 0xb9805a } }); K.semNome(dona2.g); K.nomear('dona2', dona2.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    cliente = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf5c518, bermuda: 0x3a3f4a, tenis: 0xe8352b, cabelo: 0x1c120c, pele: 0xc98a5e } }); K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');
    // o chapéu de confeiteiro, preso na cabeça da dona
    chapeu = new THREE.Group();
    const branco = K.mat(0xffffff, { roughness: 0.6 });
    const faixa = K.malha(new THREE.CylinderGeometry(0.2, 0.2, 0.12, 24), branco); chapeu.add(faixa);
    [[0, 0.13, 0], [0.1, 0.11, 0.04], [-0.1, 0.11, 0.04], [0, 0.11, -0.1]].forEach(([x, y, z]) => { const s = K.malha(new THREE.SphereGeometry(0.13, 16, 12), branco); s.position.set(x, y, z); chapeu.add(s); });
    chapeu.position.set(0, 0.3, -0.02); chapeu.rotation.x = -0.15;
    dona.cabeca.add(chapeu);

    // O celular do Nico (a tela rolando o feed)
    celN = new THREE.Group();
    const caixa = K.malha(new THREE.BoxGeometry(0.085, 0.16, 0.014), K.mat(0x1b1d22, { roughness: 0.35, metalness: 0.4 })); celN.add(caixa);
    celN.userData.tela = quadro(0.074, 0.142, 120); celN.userData.tela.position.z = 0.008; celN.add(celN.userData.tela);
    guarda(celN, 'celular');

    // As lágrimas: dois jatos (um por olho), os respingos no chão e a trilha molhada
    fx.jatoE = fazJato(3); fx.jatoD = fazJato(4);
    // as lágrimas escorrendo no rosto (a peça com nome pro 'mostra'; os jatos saem daqui)
    lagG = new THREE.Group();
    const aguaM = K.mat(0x9fd8ff, { roughness: 0.05, metalness: 0.2 });
    [-1, 1].forEach((s) => { const m = K.malha(new THREE.SphereGeometry(0.045, 10, 8), aguaM, false); m.scale.set(0.7, 1.6, 0.6); m.position.set(s * 0.1, -0.02, 0.19); lagG.add(m); });
    dona.cabeca.add(lagG); guarda(lagG, 'lagrimas');
    fx.resp = K.respingo(6, 0x9fd8ff, 16); fx.resp2 = K.respingo(7, 0x9fd8ff, 16);
    trilha = K.malha(new THREE.PlaneGeometry(0.55, 1).rotateX(-PI / 2).translate(0, 0, -0.5), new THREE.MeshStandardMaterial({ color: 0x8fcfff, roughness: 0.05, metalness: 0.25, transparent: true, opacity: 0.7, depthWrite: false }), false);
    trilha.receiveShadow = false; guarda(trilha, 'poca');

    // O bolo da Doce Lume e o celular do cliente
    bolo = fazBolo(); guarda(bolo, 'bolo');
    celC = K.m3d('celular_gigante'); guarda(celC, 'celular_cliente');

    // Quarto: o computador, a nota com o bolinho e a moeda, a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    nota = folha(0.42, 0.22, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#5fb86a'); c.strokeStyle = '#2f7a3a'; c.lineWidth = 6; c.beginPath(); c.roundRect(8, 8, w - 16, h - 16, 10); c.stroke();
      txt(c, '1 BOLO', w * 0.62, h * 0.5, h * 0.26, '#ffffff', 900, 'center');
      c.fillStyle = '#ffffff'; rr(c, w * 0.1, h * 0.52, w * 0.2, h * 0.24, 6, '#ffffff'); rr(c, w * 0.13, h * 0.32, w * 0.14, h * 0.2, 6, '#ffffff');
      c.beginPath(); c.arc(w * 0.2, h * 0.25, h * 0.06, 0, PI * 2); c.fill();
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
      txt(c, 'Site da Confeitaria Doce Lume', w / 2, h * 0.22, w * 0.055, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    guarda(contrato, 'contrato');

    // Efeitos
    fx.fala = K.balaoFala(); fx.fala2 = K.balaoFala(); fx.pensa = K.balaoPensamento();
    fx.raiva = K.nuvemRaiva();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    fx.cor = K.coracoes(23, 9);
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      web: e('Web designer', 'azul'), semSite: e('Sem site', 'vermelho'), outro: e('Outro web designer', 'vermelho'),
      olhe: e('Olhe pro lado', 'verde'), investir: e('Investir', 'azul'), sl: e('São Luís', 'azul'),
      quemPrecisa: e('Quem precisa de você', 'verde'), primeiro: e('Chegou primeiro', 'verde'), atrasado: e('Atrasado', 'vermelho'),
      eu: e('EU', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Comenta <em>EU</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  // O tornozelo esquerdo do Nico (onde a dona agarra)
  function tornozelo(b) { b.g.updateMatrixWorld(true); return b.g.localToWorld(V(0.11, 0.1, -0.02)).toArray(); }
  // O Nico de olho no celular: o braço direito dobrado na frente do rosto, a cabeça baixa, a tela rolando
  function noCelular(b, tc, andando) {
    if (!andando) b.pose({ x: -0.2, z: 0.12, c: -0.3 }, { x: -1.05, z: 0.3, c: -1.35 });
    else b.pose({ x: -0.3 * Math.sin(tc * 8), z: 0.12 }, { x: -1.05, z: 0.3, c: -1.35 });
    b.cabeca.rotation.x = 0.32;
    ve(celN);
    const m = b.mao(1);
    celN.position.set(m[0], m[1] + 0.1, m[2]);
    celN.lookAt(...cabecaDe(b, 0));
    celN.userData.tela.desenhar((c, w, h) => feed(c, w, h, tc * 0.6), Math.floor(tc * 15));
  }
  // A dona deitada de bruços, agarrada no tornozelo (pe), chorando. forca: quanto ela chora (os jatos)
  function arrastada(b, pe, tc, forca = 1, rumo = -0.5) {
    b.colocar([0, 0, 0], 0);
    b.pose({ x: 0, z: 2.95, c: -0.15 + Math.sin(tc * 9) * 0.08 }, { x: 0, z: 2.95, c: -0.15 - Math.sin(tc * 9) * 0.08 });
    b.pernasEm(0.25 + Math.sin(tc * 11) * 0.25, 0.25 - Math.sin(tc * 11) * 0.25);
    b.humor('triste');
    b.g.rotation.set(PI / 2 - 0.06, rumo, 0, 'YXZ');
    b.cabeca.rotation.set(-1.45, 0, 0.55 + Math.sin(tc * 7) * 0.1, "XZY");
    // empurra o corpo pra as duas mãos ficarem no tornozelo
    const mE = b.mao(0), mD = b.mao(1);
    const meio = [(mE[0] + mD[0]) / 2, (mE[1] + mD[1]) / 2, (mE[2] + mD[2]) / 2];
    b.g.position.set(pe[0] - meio[0], 0.2 + Math.abs(Math.sin(tc * 6)) * 0.04, pe[2] - meio[2]);
    if (forca > 0) lagrimas(b, tc, forca);
  }
  // Os dois jatos saindo dos olhos, em arco pros lados, e os respingos no chão
  function lagrimas(b, tc, forca) {
    if (b === dona) ve(lagG);
    b.g.updateMatrixWorld(true);
    const o = b.cabeca.localToWorld(V(0, 0, 0));
    [[-1, fx.jatoE, fx.resp], [1, fx.jatoD, fx.resp2]].forEach(([s, j, r]) => {
      const olho = b.cabeca.localToWorld(V(s * 0.09, 0.04, 0.2)).toArray();
      const d = b.cabeca.localToWorld(V(s * 1, 0.9, 0.35)).sub(o).normalize();
      j.em(olho, [d.x, Math.max(0.35, d.y), d.z], 2.0 * forca, tc);
      r.em([olho[0] + d.x * 1.0 * forca, 0.02, olho[2] + d.z * 1.0 * forca], (tc * 1.7 + (s > 0 ? 0.5 : 0)) % 1.2, 0.5);
    });
  }
  // A trilha molhada no chão, de "de" até "ate" (pontos no chão)
  function trilhaEntre(de, ate, opac = 0.7) {
    ve(trilha);
    const dx = ate[0] - de[0], dz = ate[2] - de[2], L = Math.max(0.05, Math.hypot(dx, dz));
    trilha.position.set(de[0], 0.015, de[2]);
    trilha.rotation.set(0, Math.atan2(-dx, -dz), 0);
    trilha.scale.set(1, 1, L);
    trilha.material.opacity = opac;
  }
  // Nico andando pela faixa XN, de z0 até z1 (k de 0 a 1)
  function nicoAnda(z0, z1, k, tc) {
    menino.irPara([XN, 0, z0], [XN, 0, z1], k, tc, { reto: true });
    if (k >= 1) menino.colocar([XN, 0, z1], 0);
    noCelular(menino, tc, k > 0 && k < 1);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o Nico andando de olho no celular; a dona deitada, agarrada no tornozelo, arrastada, chorando dois jatos · MOSTRA: personagem, dona, lagrimas
      const tIm = quando('implorando', B, 0.25), tRe = quando('reto', B, 0.9);
      const Z0 = DZ + 1.2, Z1 = DZ + 3.6;
      const k = pc(tc, B.inicio - 0.3, B.ate + 0.3);
      nicoAnda(Z0, Z1, k, tc);
      if (tc > tRe) menino.cabeca.rotation.z = 0.15;
      menino.humor('feliz');
      // a dona arrastada junto com o pé dele, a trilha molhada atrás
      ve(dona); const pe = tornozelo(menino);
      arrastada(dona, pe, tc, 1);
      trilhaEntre([XN - 0.1, 0, dona.g.position.z - 1.4], [XN - 0.1, 0, DZ - 4]);
      fx.vel.em([dona.g.position.x, 0.25, dona.g.position.z - 0.6], tc, { rumo: 0, raio: 0.5, comp: 1.0 });
      // EFEITOS: o balão dela "FAZ MEU SITE!" em "implorando"
      fx.fala.em(cabecaDe(dona, 0.55), tc - Math.max(tIm, B.inicio + 2.0), { texto: 'FAZ MEU SITE!' });
      // SONS
      K.som('whoosh', B.inicio, 0.5); K.som('esguicho', B.inicio + 0.05, 0.35); K.som('passo', B.inicio + 0.5, 0.3); K.som('passo', B.inicio + 1.4, 0.3); K.som('respingo', tRe, 0.4);
      // CÂMERA: 3 cortes rápidos: (1) baixinho de frente, a cara chorando dela e o pé dele · (2) na altura do rosto dele,
      // de lado pequeno · (3) aberto, de frente, os dois inteiros e a trilha
      const c1 = B.inicio + 1.0, c2 = B.inicio + 2.0;
      const pn = menino.g.position;
      const cd = cabecaDe(dona, 0);
      if (tc < c1) K.mirar([pn.x + 2.6, 2.6, pn.z + 3.0], [pn.x + 0.35, 0.65, pn.z - 0.8]);
      else if (tc < c2) K.mirar([cd[0] + 1.9, 1.05, cd[2] + 2.6], [cd[0] + 0.1, 0.5, cd[2] - 0.2]);
      else K.mirar([pn.x + 0.9, 2.6, pn.z + 6.0], [pn.x + 0.35, 0.85, pn.z - 1.0]);
    },
    reclama(B, tc) {
      // NA TELA: o Nico parado, digitando no celular e bufando; a dona agarrada no pé, chorando; o balão "Ninguém quer site..." · MOSTRA: personagem, dona
      const tW = quando('designer', B, 0.2), tRc = quando('reclama', B, 0.4), tNi = quando('ninguém', B, 0.7), tSi = quando('site', B, 0.92);
      const NZ = DZ + 4.2;
      menino.colocar([XN, 0, NZ], 0.25);
      if (tc > tNi && tc < tNi + 0.8) { menino.reagir('bravo', tc - tNi); celN.visible = false; }
      else noCelular(menino, tc, false);
      menino.humor(tc > tRc ? 'bravo' : 'normal');
      // em "site", ele sacode o pé (como quem tira um chiclete)
      const sac = tc > tSi ? Math.sin((tc - tSi) * 30) * 0.12 * (1 - pc(tc, tSi, tSi + 0.6)) : 0;
      ve(dona); const pe = tornozelo(menino); pe[0] += sac;
      arrastada(dona, pe, tc, tc > tSi ? 1.35 : 1);
      trilhaEntre([XN - 0.1, 0, dona.g.position.z - 1.4], [XN - 0.1, 0, DZ - 3]);
      fx.et.web.em(cabecaDe(menino, 0.55), tc - tW);
      fx.fala.em(cabecaDe(menino, 0.3), tc - tRc, { texto: 'Ninguém quer site...' });
      fx.raiva.em(cabecaDe(menino, 1.05), tc - tNi, { forca: 0.8 });
      // SONS
      for (let i = 0; i < 6; i++) K.som('clique', B.inicio + 0.15 + i * 0.12, 0.2);
      K.som('whoosh', tNi, 0.35); K.som('pingo', B.inicio + 0.6, 0.3); K.som('pingo', tSi + 0.1, 0.3);
      // CÂMERA: chegando · médio · esquerda, ele e a dona inteiros → orbitando pra frente
      const q = K.suave(pc(tc, B.inicio, B.ate));
      const a = K.lerp(0.45, 0.15, q), d = K.lerp(6.0, 5.4, q);
      K.mirar([XN + 0.4 + Math.sin(a) * d, 2.5, NZ - 1.0 + Math.cos(a) * d], [XN + 0.25, 0.8, NZ - 1.1]);
    },
    confeitaria(B, tc) {
      // NA TELA: a placa DOCE LUME com "Sem site"; a confeiteira de pé na porta com o bolo; o cliente com o celular buscando, o ✗ · MOSTRA: placa_confeitaria, dona, cliente
      const tSi = quando('site', B, 0.3), tCl = quando('cliente', B, 0.45), tBo = quando('bolo', B, 0.7), tNa = quando('nada', B, 0.92);
      ve(placaDoce);
      // o Nico ao fundo, de costas, no celular
      menino.colocar([1.3, 0, DZ + 3.0], PI * 0.85); noCelular(menino, tc, false);
      // a dona de pé na porta, enxugando as lágrimas, mostrando o bolo pra rua
      dona.colocar(DONA, [0.6, 1.2, DZ + 6]);
      dona.reagir('segurando', tc - B.inicio); dona.humor(tc > tNa ? 'triste' : 'feliz');
      ve(bolo); const mE = dona.mao(0), mD = dona.mao(1);
      bolo.position.set((mE[0] + mD[0]) / 2, (mE[1] + mD[1]) / 2 + 0.02, (mE[2] + mD[2]) / 2 + 0.05);
      bolo.rotation.set(0, 0, Math.sin(tc * 9) * 0.03);
      bolo.userData.cereja.position.x = Math.sin(tc * 12) * 0.015;
      // o cliente com o celular: a busca "Doce Lume encomenda bolo" e o ✗
      ve(cliente); cliente.colocar(CLI, [0.4, 1.3, DZ + 6]);
      if (tc > tNa) { cliente.reagir('ombros', tc - tNa); cliente.humor('triste'); }
      else if (tc > tBo) { cliente.reagir('coca_cabeca', tc - tBo); cliente.humor('normal'); }
      else { cliente.reagir('celular', tc - B.inicio); cliente.humor('normal'); }
      ve(celC);
      const cc = cabecaDe(cliente, -0.25); celC.position.set(cc[0] + 0.55, cc[1] - 0.45, cc[2] + 0.1); celC.scale.setScalar(0.55 * pop(tc - tCl + 0.3));
      celC.rotation.set(0, Math.atan2(K.camera.position.x - cc[0], K.camera.position.z - cc[2]), 0);
      celC.userData.m3d.mostrar({ itens: ['Busca: Doce Lume encomenda bolo', 'Nenhum site encontrado', 'Sem cardápio, sem preço'], n: tc > tNa ? 3 : tc > tBo ? 2 : 1 });
      fx.et.semSite.em(mais(placaDoce.position.toArray(), [0, 3.15, 0]), tc - tSi);
      fx.pensa.em(cabecaDe(cliente, 0.3), tc - tBo, { texto: 'Cadê o site?' });
      // SONS
      K.som('estalo', tSi + 0.1, 0.35); K.som('bip', tCl, 0.3); K.som('errado', tNa, 0.5);
      // CÂMERA: (1) por cima do ombro do Nico, olhando a placa · (2) fixa a ~4,5 m de frente, a dona, a placa e o cliente
      if (tc < tCl) K.ombro(menino, [DONA[0], 1.7, DONA[2]], pc(tc, B.inicio, tCl), { lado: -1, dist: 2.7, altura: 1.85 });
      else {
        const q = K.suave(pc(tc, tCl, B.ate));
        K.mirar([K.lerp(-0.2, -0.4, q), 1.8, DZ + K.lerp(6.0, 5.5, q)], [-1.35, 1.4, DZ + 0.1]);
        if (tc > tNa) fx.simb.em(mais(cc, [0.55, 0.5, 0.1]), tc - tNa, { tipo: '✗', tam: 0.6 });
      }
    },
    rival(B, tc) {
      // NA TELA: a dona agarrada no pé do Nico; o rival chega, olha pra baixo, estende a mão; ela solta e agarra ele; o contrato FECHADO · MOSTRA: rival, dona, personagem
      const tDe = quando('designer', B, 0.2), tLa = quando('larga', B, 0.5), tFe = quando('fecha', B, 0.88);
      ve(placaDoce);
      const NZ = DZ + 1.6;
      menino.colocar([XN, 0, NZ], 0.15); noCelular(menino, tc, false); menino.humor('feliz');
      // o rival vem pelo calçadão até perto da dona
      const RIV_A = [-0.2, 0, NZ + 6.5], RIV_B = [-0.35, 0, NZ - 0.35];
      const kAnda = pc(tc, B.inicio, tLa - 0.15);
      ve(rival); rival.irPara(RIV_A, RIV_B, kAnda, tc, { reto: true });
      ve(dona);
      if (tc < tLa) {
        if (kAnda >= 1) { rival.colocar(RIV_B, [XN, 0, NZ - 1.4]); rival.apontar(-0.2); rival.cabeca.rotation.x = 0.4; }
        rival.humor('feliz');
        arrastada(dona, tornozelo(menino), tc, 1);
        trilhaEntre([XN - 0.1, 0, dona.g.position.z - 1.4], [XN - 0.1, 0, DZ - 3]);
      } else {
        // ela pula de pé e agarra o braço do rival; depois o aperto de mão e o contrato
        const DN = [-1.0, 0, NZ - 0.6];
        rival.colocar(RIV_B, [DN[0], 1.2, DN[2]]); rival.humor('feliz');
        dona.colocar(DN, [RIV_B[0], 1.2, RIV_B[2]]); dona.humor('feliz');
        if (tc < tFe) { dona.reagir('comemorando', tc - tLa); rival.apontar(0.2); }
        else { dona.reagir('vitoria', tc - tFe); rival.reagir('mostrando', tc - tFe); }
        fx.cor.em(cabecaDe(dona, 0.2), tc - tLa, 1);
        const meio = [(RIV_B[0] + DN[0]) / 2, 1.95, (RIV_B[2] + DN[2]) / 2 + 0.35];
        contrato.visible = tc > tFe - 0.35;
        contrato.position.set(...meio); contrato.lookAt(K.camera.position);
        contrato.scale.setScalar(pop(tc - tFe + 0.35));
        carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
        if (tc > tFe) fx.simb.em(mais(cabecaDe(dona, 0.3), [0, 0.3, 0]), tc - tFe, { tipo: '✓', tam: 0.8 });
        trilhaEntre([XN - 0.1, 0, NZ - 1.9], [XN - 0.1, 0, DZ - 3]);
      }
      fx.et.outro.em(cabecaDe(rival, 0.5), tc - tDe);
      // SONS
      K.som('passo', B.inicio + 0.3, 0.3); K.som('passo', B.inicio + 0.7, 0.3); K.som('whoosh', tLa, 0.4); K.som('baque', tFe, 0.6); K.som('certo', tFe + 0.25, 0.4);
      // CÂMERA: (1) atrás do rival chegando · (2) fixa a ~3,8 m, de frente pro aperto de mão, o Nico ao lado no celular
      if (tc < tLa - 0.2) { const p = rival.g.position; K.mirar([p.x + 0.45, 1.95, p.z + 3.8], [p.x - 0.1, 0.9, p.z - 2.2]); }
      else { const q = K.suave(pc(tc, tLa - 0.2, B.ate)); K.mirar([K.lerp(0.45, 0.3, q), 1.9, NZ + K.lerp(5.4, 5.0, q)], [-0.15, 1.05, NZ - 0.6]); }
    },
    olha(B, tc) {
      // NA TELA: o Nico sozinho; ele olha pra baixo: a perna livre e a trilha de lágrima até a porta; guarda o celular e olha pro lado · MOSTRA: personagem, poca
      const tIm = quando('implora', B, 0.15), tOl = quando('olha', B, 0.6), tPr = quando('primeiro', B, 0.75);
      const NZ = DZ + 1.6;
      ve(placaDoce);
      // a trilha brilhando do pé dele até a porta da Doce Lume
      const brilho = 0.55 + 0.3 * Math.sin(tc * 6);
      trilhaEntre([XN - 0.05, 0, NZ - 0.2], [DONA[0] + 0.2, 0, DONA[2] + 0.2], brilho);
      menino.colocar([XN, 0, NZ], tc < tOl ? [DONA[0], 0, DONA[2]] : [XN + 3, 1.4, NZ + 3]);
      if (tc < tIm) noCelular(menino, tc, false);
      else if (tc < tOl) { menino.reagir('susto', tc - tIm); menino.cabeca.rotation.x = 0.45; }
      else menino.reagir('mao_na_testa', tc - tOl);
      if (tc > tPr) menino.humor('feliz');
      fx.et.olhe.em(cabecaDe(menino, 0.6), tc - tPr);
      if (tc > tIm) fx.simb.em(mais(cabecaDe(menino, 0.2), [0.35, 0.2, 0]), tc - tIm, { tipo: '!', tam: 0.55 });
      // SONS
      K.som('estalo', tIm, 0.4); K.som('whoosh', tOl, 0.35); K.som('brilho', tPr, 0.4);
      // CÂMERA: (1) do alto, descendo, a trilha do pé dele até a porta · (2) chegando no rosto dele
      if (tc < tOl) K.drone(menino, pc(tc, B.inicio, tOl), { de: 9, ate: 4.2, dist: 4.2, giro: 30, lado: 20 });
      else { const q = K.suave(pc(tc, tOl, B.ate)); const c = cabecaDe(menino, 0); K.mirar([c[0] + 0.5, c[1] + 0.1, c[2] + K.lerp(2.9, 2.5, q)], [c[0], c[1] - 0.15, c[2]]); }
    },
    investe(B, tc) {
      // NA TELA: o quarto; ele de pé com a nota do bolinho; ela vira moeda e cai no computador; o mapa com os pinos · MOSTRA: personagem, nota, monitor
      const tIn = quando('investe', B, 0.1), tBo = quando('bolo', B, 0.35), tFe = quando('ferramenta', B, 0.5), tPr = quando('precisa', B, 0.8);
      ve(comp);
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tIn) menino.reagir('segurando', tc - B.inicio); else if (tc < tFe) menino.reagir('sim', tc - tIn); else menino.reagir('digitando', tc);
      menino.humor(tc > tIn ? 'feliz' : 'normal');
      const mao = menino.mao(1), notaPos = mais(mao, [0.03, 0.08, 0.1]);
      if (tc > tBo - 0.35 && tc < tFe) { ve(nota); nota.position.set(...notaPos); nota.lookAt(K.camera.position); nota.rotation.z += Math.sin(tc * 3) * 0.1; nota.scale.setScalar(pop(tc - tBo + 0.35)); }
      if (tc > tFe) {
        fx.poof.em(mais(notaPos, [0, 0.15, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(notaPos[0], TECLADO[0], q), K.lerp(notaPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(notaPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tPr ? Math.min(6, 1 + Math.floor((tc - tPr) / 0.12)) : 1;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tFe) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tPr + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) chegando · médio · esquerda, nele com a nota · (2) subindo · médio · frente, na tela
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), notaPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das confeitarias de São Luís sobe do computador · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.08), tDi = quando('digita', B, 0.18), tL = quando('lista', B, 0.55), tCf = quando('confeitarias', B, 0.65), tSl = quando('Luís', B, 0.78);
      ve(comp, navG);
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tCf ? 1 + Math.floor((tc - tCf) / 0.22) : 0;
        telaC.mostrar('listaDoces', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tCf + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      menino.humor('feliz');
      fx.et.sl.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tSl);
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Brigadeiro do Centro; o robô à esquerda; o Nico à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseDoce', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
      // NA TELA: (1) Antes: ele arrastando a dona chorando, no celular · (2) Agora: na Brigadeiro do Centro, ele mostra a análise pra dona; o rival chega atrasado · MOSTRA: personagem, dona2
      const tA = quando('Agora', B, 0.4), tOl = quando('olha', B, 0.6), tPr = quando('primeiro', B, 0.9);
      if (tc < tA) {
        ve(placaDoce);
        nicoAnda(DZ + 1.0, DZ + 2.6, pc(tc, B.inicio - 0.5, tA + 0.5), tc); menino.humor('feliz');
        ve(dona); arrastada(dona, tornozelo(menino), tc, 1);
        trilhaEntre([XN - 0.1, 0, dona.g.position.z - 1.4], [XN - 0.1, 0, DZ - 4]);
        K.som('esguicho', B.inicio, 0.3);
        // CÂMERA: (1) de baixo, do lado direito (diferente do gancho)
        K.heroi(menino, pc(tc, B.inicio, tA), { lado: -35, dist: 3.4, altura: 0.25, olhar: 1.2 });
      } else {
        ve(placaBrig);
        // em "olha": ele vira a cabeça e chega na porta; estende a tela pra dona
        const kc = pc(tc, tA, tOl + 0.3);
        if (kc < 1) { menino.irPara([XN, 0, DZ2 + 2.6], NICO2, kc, tc, { reto: true }); }
        else { menino.colocar(NICO2, cabecaDe(dona2, -1.3)); menino.reagir('mostrando', tc - tOl - 0.3); }
        menino.humor('feliz');
        dona2.colocar(DONA2, cabecaDe(menino, -1.3)); dona2.humor('feliz');
        if (tc > tPr) dona2.reagir('vitoria', tc - tPr); else dona2.reagir('surpreso', tc - tA);
        if (kc >= 1) { ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.15, m[1] + 0.5, m[2] + 0.1); telaM.g.rotation.set(0, -0.7, 0); telaM.g.scale.setScalar(0.34 * pop(tc - tOl - 0.3)); telaM.mostrar('analiseDoce', { ate: 2, score: 1 }); }
        const kr = pc(tc, tA + 0.3, tPr + 0.1);
        ve(rival); rival.irPara([1.3, 0, DZ2 + 6], [0.6, 0, DZ2 + 1.7], kr, tc, { reto: true, correr: true });
        if (kr >= 1) { rival.colocar([0.6, 0, DZ2 + 1.7], cabecaDe(menino, -1.3)); rival.reagir('mao_na_testa', tc - tPr - 0.1); rival.humor('triste'); fx.et.atrasado.em(cabecaDe(rival, 0.5), tc - tPr - 0.1); }
        if (tc > tPr) fx.simb.em(mais(NICO2, [-0.5, 2.5, 0]), tc - tPr, { tipo: '✓', tam: 1.0 });
        fx.et.primeiro.em(mais(NICO2, [-0.5, 3.15, 0]), tc - tPr);
        K.som('whoosh', tA, 0.5); K.som('certo', tPr, 0.6);
        // CÂMERA: (2) fixa a ~5 m, de frente, na porta
        const q = K.suave(pc(tc, tA, B.ate));
        K.mirar([K.lerp(0.6, 0.4, q), 1.75, DZ2 + K.lerp(5.6, 5.0, q)], [-1.0, 1.3, DZ2 + 0.3]);
      }
    },
    segue(B, tc) {
      // NA TELA: o Nico no calçadão olhando pra câmera, o celular no bolso, a trilha secando; "EU"; depois o cartão, mappoa.com e o robô · MOSTRA: personagem, navegador
      const tVc = quando('você', B, 0.05), tCl = quando('cliente', B, 0.25), tEu = quando('EU', B, 0.35), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
      const NP = [XN - 0.3, 0, DZ + 1.6];
      trilhaEntre([NP[0] + 0.3, 0, NP[2] - 0.3], [NP[0] + 0.3, 0, DZ - 4], 0.6 * (1 - pc(tc, B.inicio, tPc)));
      menino.colocar(NP, [0.3, 1.4, NP[2] + 6]); menino.humor('feliz');
      if (tc > tPc) menino.apontar(1);
      else if (tc > tEu) { menino.pose({}, { x: -2.6, z: 0.2, c: -1.6 }); menino.humor('surpreso'); }
      else if (tc > tCl) { menino.cabeca.rotation.x = 0.35; menino.reagir('duvida', tc - tCl); }
      else menino.reagir('chamando', tc - tVc);
      fx.et.eu.em(cabecaDe(menino, 0.55), tc - tEu);
      if (tc < tPc) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tPc);
      ve(navG); navG.g.position.set(NP[0] - 0.2, 3.2, NP[2] - 0.5); navG.g.rotation.set(0, 0, 0); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      ve(robo); robo.g.position.set(NP[0] - 1.5, 0, NP[2] - 0.2); robo.g.rotation.y = 0.45; robo.em(tc, { acena: tc > tPc ? 1 : 0, mapa: false });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('estalo', tEu, 0.4); K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: chegando · médio · esquerda, ele e a trilha → aberto e parado no cartão
      if (tc < tPc - 0.3) { const q = K.suave(pc(tc, B.inicio, tPc - 0.3)); K.mirar([NP[0] + 0.5, 1.8, NP[2] + K.lerp(4.8, 4.2, q)], [NP[0], 1.25, NP[2]]); }
      else K.mirar([NP[0] - 0.4, 2.2, NP[2] + 6.8], [NP[0] - 0.4, 1.9, NP[2] - 0.3]);
    },
    cartao(B, tc) {
      const NP = [XN - 0.3, 0, DZ + 1.6];
      fx.seguir.em(9); ve(navG, robo);
      navG.g.position.set(NP[0] - 0.2, 3.2, NP[2] - 0.5); navG.mostrar('endereco', { letras: 10, ir: true });
      robo.g.position.set(NP[0] - 1.5, 0, NP[2] - 0.2); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(NP, [0.3, 1.4, NP[2] + 6]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.mirar([NP[0] - 0.4, 2.2, NP[2] + 6.8], [NP[0] - 0.4, 1.9, NP[2] - 0.3]);
    },
    capa() {
      // o Nico andando no celular; a confeiteira agarrada no tornozelo, chorando dois jatos; a Doce Lume com "Sem site" atrás
      ve(placaDoce);
      const z = DZ + 2.2;
      menino.colocar([XN, 0, z], 0); menino.andar(0.4, 1); noCelular(menino, 0.4, true); menino.humor('feliz');
      ve(dona); arrastada(dona, tornozelo(menino), 0.55, 1.1);
      trilhaEntre([XN - 0.1, 0, dona.g.position.z - 1.4], [XN - 0.1, 0, DZ - 4]);
      fx.et.semSite.em(mais(placaDoce.position.toArray(), [0, 3.15, 0]), 2);
      K.mirar([XN + 2.3, 2.3, z + 4.0], [XN + 0.15, 0.85, z - 0.8]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const lugar = LUGAR[B.plano] || 'rua';
    CS.usar(lugar);
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dona, dona2, rival, cliente].forEach((b) => { b.g.visible = false; b.g.rotation.set(0, 0, 0); b.cabeca.rotation.set(0, 0, 0); });
    menino.g.visible = true;
    tudo.forEach((g) => { g.visible = false; });
    [fx.jatoE, fx.jatoD, fx.resp, fx.resp2].forEach((f) => f.esconder && f.esconder());
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    navG.g.position.set(-0.35, 2.95, -0.95);
    contrato.scale.setScalar(1); carimbo.visible = false; celC.scale.setScalar(1);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // de pé: a cadeira vazia fica de lado, encostada na mesa (na frente ela tapava o computador)
    if (lugar === 'quarto' && !cadeira.visible) { cadeira.position.set(-1.6, 0, -0.75); cadeira.rotation.set(0, 1.1, 0); ve(cadeira); }
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
