// O web designer em seu habitat natural (canal Mappoa, feito na nuvem, 18/11/2026): DOCUMENTÁRIO DE BICHO. O narrador
// observa o Caio (o personagem do canal) na floresta como se fosse um animal: escondido atrás de um arbusto esperando,
// fazendo a "dança do portfólio" com o celular, os clientes passando direto, a estação seca comendo miojo no tronco e,
// num comportamento raro, ele vai atrás. No quarto ele investe o preço de um açaí no Mappoa, acha as clínicas de
// estética de Belém sem site (29) e abre a Clínica Bella Pele (nota 87). De volta à floresta, a cliente não foge:
// responde. Ele evolui: de caçado a caçador (com os binóculos).
// Três lugares (K.cenarios): a floresta (habitat), o quarto (home_office) e o palco do Mappoa. Cada plano começa com as
// linhas da ficha (NA TELA · MOSTRA · PERSONAGEM · CÂMERA · EFEITOS · SONS).
(function () {
  const PI = Math.PI;
  let bl, CS, menino, cliente, robo, comp, cad, navG, telaC, telaM, cel, moeda, acai, miojo, arbusto, binoc, note, mascara, FOV0;
  const tudo = [], fx = {}, clientes = [];
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
  // Floresta (clareira no meio): o Caio atrás do arbusto; a trilha dos clientes atrás dele (z -2,3); o tronco à esquerda
  const TOCA = [0.4, 0, -0.25], ARB = [0.45, 0, 0.42], TRILHA_Z = -2.3;
  const TRONCO_SENTA = [-4.8, 0, -2.98];

  const LUGAR = { gancho: 'mata', danca: 'mata', passam: 'mata', miojo: 'mata', vai: 'mata', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', ficha: 'quarto', responde: 'mata', evolui: 'mata', segue: 'quarto', cartao: 'quarto', capa: 'mata' };

  const CLINICAS = [
    { nome: 'Clínica Bella Pele', end: 'Av. Nazaré, 1020', chips: ['whats', 'insta'] },
    { nome: 'Espaço Derma Belém', end: 'Tv. Quintino Bocaiúva, 455', chips: ['tel', 'insta'] },
    { nome: 'Studio Pele de Seda', end: 'Rua dos Mundurucus, 88', chips: ['whats'] },
    { nome: 'Renova Umarizal', end: 'Av. Visc. de Souza Franco, 310', chips: ['whats', 'tel'] }
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
  function siteCaio(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Caio Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // o post do portfólio no celular (a "dança"): o post e as curtidas paradas no zero
  function postPortfolio(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.14, h * 0.07, w * 0.06, 0, 7); c.fill();
    txt(c, 'caio.webdesign', w * 0.24, h * 0.07, w * 0.065, '#111', 800);
    const d = c.createLinearGradient(0, h * 0.12, 0, h * 0.6); d.addColorStop(0, ['#f39a1e', '#2fb5a6', '#c0267a'][e.k % 3]); d.addColorStop(1, '#2f6fd6');
    c.fillStyle = d; c.fillRect(0, h * 0.12, w, h * 0.46);
    txt(c, 'Meu', w / 2, h * 0.28, w * 0.14, '#fff', 900, 'center'); txt(c, 'portfólio ✨', w / 2, h * 0.4, w * 0.13, '#fff', 900, 'center');
    txt(c, '♡ 0 curtidas', w * 0.08, h * 0.66, w * 0.085, '#e8352b', 900);
    txt(c, 'Clientes: 0', w * 0.08, h * 0.76, w * 0.07, '#4a4f58', 800);
  }
  // a conversa com a Bella Pele: a mensagem do Caio e a resposta
  function zapBella(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.12);
    txt(c, 'Clínica Bella Pele', w * 0.08, h * 0.065, w * 0.075, '#fff', 800, 'left', w * 0.85);
    rr(c, w * 0.22, h * 0.17, w * 0.72, h * 0.25, 16, '#dcf8c6');
    txt(c, 'Oi! Vi que a clínica', w * 0.27, h * 0.22, w * 0.058, '#111', 700); txt(c, 'não tem site. Te', w * 0.27, h * 0.28, w * 0.058, '#111', 700); txt(c, 'mostro uma ideia?', w * 0.27, h * 0.34, w * 0.058, '#111', 700);
    if (e.resp) { rr(c, w * 0.06, h * 0.5, w * 0.7, h * 0.17, 16, '#ffffff'); txt(c, 'Oi, Caio! Quero', w * 0.11, h * 0.55, w * 0.075, '#111', 900); txt(c, 'sim, me mostra! 😊', w * 0.11, h * 0.62, w * 0.075, '#111', 900); }
  }

  // ---------- Peças feitas aqui ----------
  // o arbusto onde o Caio se esconde: bolas de folhagem em volta de um ponto
  function fazArbusto() {
    const g = new THREE.Group();
    const cores = [0x3f8f3a, 0x4fa444, 0x357a32, 0x5bb24f];
    [[0, 0.42, 0, 0.5], [-0.42, 0.32, 0.05, 0.38], [0.42, 0.34, 0.02, 0.4], [-0.18, 0.66, -0.05, 0.34], [0.22, 0.7, 0.02, 0.32], [0, 0.25, 0.25, 0.34]].forEach(([x, y, z, r], i) => {
      const m = K.malha(new THREE.IcosahedronGeometry(r, 1), K.mat(cores[i % 4], { roughness: 0.95, flatShading: true }));
      m.position.set(x, y, z); m.scale.set(1.15, 0.85, 0.9); g.add(m);
    });
    return g;
  }
  // a tigela de miojo com o macarrão em espiral e o garfo
  function fazMiojo() {
    const g = new THREE.Group();
    const tig = K.malha(new THREE.CylinderGeometry(0.15, 0.1, 0.11, 24, 1, true), K.mat(0xe8352b, { roughness: 0.5, side: THREE.DoubleSide })); g.add(tig);
    const fundo = K.malha(new THREE.CircleGeometry(0.1, 20), K.mat(0xe8352b)); fundo.rotation.x = -PI / 2; fundo.position.y = -0.054; g.add(fundo);
    const caldo = K.malha(new THREE.CircleGeometry(0.143, 24), K.mat(0xe8b84a, { roughness: 0.4 })); caldo.rotation.x = -PI / 2; caldo.position.y = 0.04; g.add(caldo);
    for (let i = 0; i < 9; i++) { const n = K.malha(new THREE.TorusGeometry(0.03 + (i % 3) * 0.018, 0.007, 6, 18), K.mat(0xf3d36b, { roughness: 0.6 })); n.position.set(Math.cos(i * 2.1) * 0.05, 0.047, Math.sin(i * 2.1) * 0.05); n.rotation.x = -PI / 2 + (i % 2) * 0.3; g.add(n); }
    const garfo = K.malha(new THREE.BoxGeometry(0.012, 0.012, 0.26), K.mat(0xd6dbe3, { metalness: 0.6 })); garfo.position.set(0.03, 0.1, 0); garfo.rotation.set(-1.0, 0.3, 0); g.add(garfo);
    return g;
  }
  // o copo de açaí com granola e a colher
  function fazAcai() {
    const g = new THREE.Group();
    g.add(K.malha(new THREE.CylinderGeometry(0.085, 0.062, 0.2, 22), K.mat(0xffffff, { roughness: 0.4 })));
    const topo = K.malha(new THREE.SphereGeometry(0.083, 20, 10, 0, PI * 2, 0, PI / 2), K.mat(0x4b1d5e, { roughness: 0.5 })); topo.position.y = 0.1; topo.scale.y = 0.55; g.add(topo);
    for (let i = 0; i < 7; i++) { const gr = K.malha(new THREE.SphereGeometry(0.012, 6, 5), K.mat(0xc8913f)); gr.position.set(Math.cos(i) * 0.045, 0.135, Math.sin(i) * 0.045); g.add(gr); }
    const faixa = K.malha(new THREE.CylinderGeometry(0.081, 0.073, 0.06, 22), K.mat(0x7a2b8f)); g.add(faixa);
    const col = K.malha(new THREE.BoxGeometry(0.02, 0.18, 0.008), K.mat(0xf39a1e)); col.position.set(0.03, 0.17, 0); col.rotation.z = -0.3; g.add(col);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['floresta', {}, 'mata'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaClinicas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: CLINICAS, n: e.n, sel: e.sel, total: 72, comSite: 43, semSite: 29 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Clínicas de estética · Belém, PA · 29 sem site', 36, 168, 19, M.marinho, 700, 'left', w - 72);
    };
    T.analiseBella = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Clínica Bella Pele', ate: e.ate, aderencia: 0.87 * k,
        dores: ['Sem site: agenda só pelo WhatsApp', 'Some no Google pra quem procura estética em Nazaré'], oportunidades: ['Site com os tratamentos e o WhatsApp no topo'],
        objecoes: ['"Minhas clientes vêm por indicação"'], abordagem: 'Mostre quanta gente procura limpeza de pele em Belém e não acha a clínica dela.'
      });
      if (e.ate >= 0) txt(c, Math.round(87 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
      if (e.zap) { rr(c, w - 250, 132, 232, 44, 22, '#25d366'); txt(c, 'WhatsApp ✓', w - 134, 155, 22, '#fff', 900, 'center'); }
    };
    T.msgBella = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Clínica Bella Pele (WhatsApp)', digitado: e.d, texto: 'Oi! Vi que a Clínica Bella Pele ainda não tem site e a agenda é só pelo WhatsApp. Faço um site com os tratamentos e o agendamento. Te mostro uma ideia?' });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Caio (do canal), os clientes que passam direto, a dona da Bella Pele e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    [K.personagem('dono', { cores: { terno: 0x2a3a5a } }), K.personagem('pizzaiolo'), K.personagem('dona', { cores: { blazer: 0x3fb8c8, vestido: 0xffffff } })].forEach((b) => { K.semNome(b.g); clientes.push(b); });
    K.nomear('clientes', clientes[0].g); K.nomear('clientes', clientes[1].g); K.nomear('clientes', clientes[2].g);
    cliente = K.personagem('dona', { cores: { blazer: 0xe86fa5, vestido: 0xffffff } }); K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Floresta: o arbusto, o notebook, o miojo e os binóculos
    arbusto = fazArbusto(); guarda(arbusto, 'arbusto', ARB);
    note = K.m3d('notebook'); guarda(note, null, null, 0.7);
    miojo = fazMiojo(); guarda(miojo, 'miojo', null, 1.2);
    binoc = K.m3d('binoculos'); guarda(binoc, 'binoculos', null, 0.42);
    cel = K.celular(); guarda(cel, 'celular', null, 1.8);

    // Quarto
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, CAD_LADO);
    acai = fazAcai(); guarda(acai, 'pagamento', null, 1.3);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, 'pagamento');
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // A máscara de binóculo do documentário (na frente da câmera, só no 1º corte do gancho e na volta pra floresta)
    const cv = document.createElement('canvas'); cv.width = 540; cv.height = 960;
    const cx = cv.getContext('2d');
    cx.fillStyle = '#05070a'; cx.fillRect(0, 0, 540, 960);
    cx.globalCompositeOperation = 'destination-out';
    [[165, 480], [375, 480]].forEach(([x, y]) => { const gr = cx.createRadialGradient(x, y, 120, x, y, 182); gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = gr; cx.beginPath(); cx.arc(x, y, 182, 0, 7); cx.fill(); });
    cx.globalCompositeOperation = 'source-over';
    cx.fillStyle = '#e8352b'; cx.beginPath(); cx.arc(48, 70, 12, 0, 7); cx.fill();
    cx.font = '900 30px Montserrat, sans-serif'; cx.fillStyle = '#ffffff'; cx.textBaseline = 'middle'; cx.fillText('REC', 70, 71);
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
    mascara = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tx, transparent: true, depthTest: false, depthWrite: false }));
    mascara.renderOrder = 40; mascara.visible = false; K.scene.add(mascara);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.fala = K.balaoFala();
    fx.cont = K.contador();
    fx.folhas = K.folhasVento(77, 50);
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      especie: e('Webdesignerus esperandus', 'azul'), danca: e('Dança do portfólio', 'laranja'), direto: e('Passam direto', 'vermelho'),
      seca: e('Estação seca ☀️', 'laranja'), raro: e('Comportamento raro!', 'verde'), investir: e('Investir', 'azul'),
      belem: e('29 sem site', 'azul'), chance: e('Quem tem chance', 'verde'), zap: e('WhatsApp ✓', 'verde'),
      naoFugiu: e('Não fugiu!', 'verde'), cacado: e('Caçado', 'vermelho'), cacador: e('Caçador ✓', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // a máscara de binóculo (chamar DEPOIS da câmera)
  function binoculo(forca) {
    if (forca <= 0.01) { mascara.visible = false; return; }
    const d = V(0, 0, -1).applyQuaternion(K.camera.quaternion), dist = 0.3;
    const h = 2 * dist * Math.tan((K.camera.fov * PI) / 360), w = h * K.camera.aspect;
    mascara.visible = true; mascara.position.copy(K.camera.position).addScaledVector(d, dist); mascara.quaternion.copy(K.camera.quaternion);
    mascara.scale.set(w * 1.02, h * 1.02, 1); mascara.material.opacity = forca;
  }
  // algo na mão do Caio, do lado da cabeça, virado pra câmera (chamar DEPOIS da câmera)
  function celNaMao(desenho, chave, esc = 1.8) {
    ve(cel); menino.g.updateMatrixWorld(true);
    const m = menino.mao(1); cel.g.position.set(m[0], m[1] + 0.12, m[2]); cel.g.scale.setScalar(esc);
    cel.g.lookAt(K.camera.position); cel.tela.desenhar(desenho, chave);
  }
  // o notebook aberto na mão, na frente da barriga (ele esperando)
  function noteNaMao() {
    ve(note); menino.g.updateMatrixWorld(true);
    const a = menino.mao(0), b = menino.mao(1);
    const f = V(0, 0, 1).applyQuaternion(menino.g.quaternion);
    note.position.set((a[0] + b[0]) / 2 + f.x * 0.12, Math.min(0.95, (a[1] + b[1]) / 2 - 0.1), (a[2] + b[2]) / 2 + f.z * 0.12);
    note.rotation.set(0, menino.g.rotation.y, 0);
  }
  // um cliente andando pela trilha de x0 a x1 (k de 0 a 1), olhando de lado pro Caio no meio do caminho
  function passa(b, x0, x1, k, tc) {
    const de = [x0, 0, TRILHA_Z], ate = [x1, 0, TRILHA_Z];
    b.g.visible = true; b.irPara(de, ate, K.clamp(k), tc);
    const x = K.lerp(x0, x1, K.clamp(k));
    if (Math.abs(x - TOCA[0]) < 1.4) b.humor('duvida');
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a clareira da floresta; o Caio atrás do arbusto, com o notebook aberto, esperando · MOSTRA: personagem, arbusto
      // CENÁRIO: a floresta (árvores, samambaias, riacho lá atrás, borboletas: o cenário cuida)
      const tHa = quando('habitat', B, 0.4), tEs = quando('Esperando', B, 0.82);
      ve(arbusto);
      // PERSONAGEM: de pé atrás do arbusto, espiando de um lado pro outro · em "Esperando": olha o relógio do pulso
      menino.colocar(TOCA, [K.lerp(-1.5, 2.5, 0.5 + 0.5 * Math.sin(tc * 1.6)), 1.3, 4]);
      if (tc < tEs) menino.reagir('pensando', tc - B.inicio); else menino.reagir('olha_relogio', tc - tEs);
      // CÂMERA: (1) de longe pelo binóculo, chegando devagar · (2) em "Esperando", perto dele, de frente
      const cv = Math.max(B.inicio + 1.2, tEs - 0.15);
      if (tc < cv) K.mirar([K.lerp(1.8, 1.4, pc(tc, B.inicio, cv)), 1.45, K.lerp(9.0, 7.2, pc(tc, B.inicio, cv))], [0.4, 1.0, 0]);
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(1.5, 1.3, k), 1.95, K.lerp(4.4, 3.8, k)], [0.42, 1.2, 0]); }
      noteNaMao();
      binoculo(tc < cv ? 1 : 0);
      // EFEITOS VISUAIS: o nome da "espécie" em "habitat" · o relógio (! ) em "Esperando"
      fx.et.especie.em({ tela: [540, 1100] }, tc - tHa);
      if (tc > tEs) fx.simb.em(cabecaDe(menino, 0.5), tc - tEs, { tipo: '…', tam: 0.5 });
      // SONS: pássaros da floresta (o cenário) · um ding no relógio
      K.som('whoosh', B.inicio, 0.25); K.som('ding', tEs + 0.3, 0.3);
    },
    danca(B, tc) {
      // NA TELA: o Caio no meio da clareira dançando com o celular no alto: o post "Meu portfólio ✨" e 0 curtidas · MOSTRA: personagem, celular
      const tAt = quando('atrair', B, 0.15), tDa = quando('dança', B, 0.45), tIn = quando('Instagram', B, 0.85);
      ve(arbusto);
      const POS = [0.9, 0, 1.0];
      // PERSONAGEM: em "dança": dança girando o corpo, celular na mão · antes: ajeita o celular
      menino.colocar(POS, [0.9 + Math.sin(tc * 2.2) * 2, 1.3, 6]);
      if (tc < tDa) menino.reagir('celular', tc - B.inicio); else menino.reagir('dancando', tc - tDa);
      menino.humor('feliz');
      // CÂMERA: (1) chegando de frente · (2) girando em volta dele na dança
      if (tc < tDa) K.filmar([cabecaDe(menino, 0.3), mais(POS, [0, 0.4, 0])], 'chegando', pc(tc, B.inicio, tDa), { plano: 'medio', lado: -15, altura: 'olho', tam: 1.9 });
      else K.filmar([cabecaDe(menino, 0.3), mais(POS, [0, 0.4, 0])], 'girando', pc(tc, tDa, B.ate), { plano: 'medio', lado: 10, altura: 'olho', tam: 2.0, angulo: 40 });
      // OBJETOS: o celular com o post (troca de cor a cada passo da dança)
      celNaMao((c, w, h) => postPortfolio(c, w, h, { k: Math.floor(tc * 2) }), 'pp' + Math.floor(tc * 2), 1.7);
      // EFEITOS VISUAIS: "Dança do portfólio" em "dança" · ✨ no "Instagram"
      fx.et.danca.em({ tela: [540, 400] }, tc - tDa);
      if (tc > tIn) fx.simb.em(mais(cabecaDe(menino, 0.3), [0.5, 0.2, 0]), tc - tIn, { tipo: '♡', tam: 0.45 });
      // SONS: whoosh nos passos · clique no post
      for (let k = 0; k < 4; k++) K.som('whoosh', tDa + k * 0.45, 0.2);
      K.som('clique', tAt, 0.3); K.som('ding', tIn, 0.25);
    },
    passam(B, tc) {
      // NA TELA: três clientes andando pela trilha atrás do Caio; olham de lado e passam direto; ele chama, eles nem param · MOSTRA: clientes, personagem
      const tCl = quando('clientes', B, 0.15), tDe = quando('desconfiadas', B, 0.5), tDi = quando('direto', B, 0.85);
      ve(arbusto);
      // OBJETOS SE MEXENDO: os clientes andam da esquerda pra direita, um atrás do outro
      clientes.forEach((b, i) => passa(b, -6.5 - i * 1.6, 6.5 - i * 1.6, pc(tc, B.inicio - 0.3, B.ate + 0.6), tc));
      // PERSONAGEM: chamando os clientes, virado pra eles · em "direto": triste
      const meio = clientes[1].g.position;
      menino.colocar([0.6, 0, 0.6], [meio.x, 1.4, meio.z]);
      if (tc < tDi) menino.reagir('chamando', tc - tCl); else menino.reagir('triste', tc - tDi);
      // CÂMERA: (1) plano aberto, a trilha e o Caio na frente, de lado · (2) passando, mais perto dele
      const cv = (tDe + tDi) / 2;
      if (tc < cv) K.mirar([K.lerp(2.6, 2.0, pc(tc, B.inicio, cv)), 1.9, 6.6], [0.2, 1.0, -1.0]);
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(2.6, 2.2, k), 1.75, K.lerp(4.8, 4.4, k)], [0.1, 1.1, -0.7]); }
      // EFEITOS VISUAIS: "?" em cima de quem passa em "desconfiadas" · "Passam direto" e ✗ em "direto"
      if (tc > tDe && tc < tDi) fx.simb.em(cabecaDe(clientes[1], 0.45), tc - tDe, { tipo: '?', tam: 0.45 });
      fx.et.direto.em({ tela: [540, 400] }, tc - tDi);
      if (tc > tDi) fx.simb2.em(mais(cabecaDe(menino, 0.4), [0.4, 0, 0]), tc - tDi, { tipo: '✗', tam: 0.5 });
      // SONS: passos · errado
      for (let k = 0; k < 6; k++) K.som('passo', B.inicio + k * 0.4, 0.2);
      K.som('errado', tDi + 0.1, 0.45);
    },
    miojo(B, tc) {
      // NA TELA: o Caio sentado no tronco caído comendo miojo da tigela; o contador "Dia 1 → 40"; folhas secas voando · MOSTRA: personagem, miojo
      const tSe = quando('seca', B, 0.15), tMi = quando('miojo', B, 0.6), tQu = quando('quarenta', B, 0.8);
      // PERSONAGEM: sentado no tronco, cansado · em "miojo": come (a tigela sobe na boca) · em "quarenta": chora
      menino.colocar(TRONCO_SENTA, [-3.4, 1.2, 3]); menino.sentar(1, 0.52);
      if (tc < tQu) { menino.reagir('cansado', tc - B.inicio); menino.segurar && menino.segurar(1); } else menino.reagir('chorando', tc - tQu);
      // CÂMERA: (1) de longe, o tronco e o calor (chegando) · (2) perto dele com a tigela, de frente
      const cv = Math.max(B.inicio + 0.9, tMi - 0.2);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(-2.9, -3.3, k), 2.0, K.lerp(3.2, 2.4, k)], [-4.8, 0.9, -3.0]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-3.7, -3.9, k), 1.6, K.lerp(0.6, 0.2, k)], [-4.8, 1.0, -3.0]); }
      // OBJETOS: a tigela nas mãos; em "miojo" sobe até a boca
      ve(miojo); menino.g.updateMatrixWorld(true);
      const a = menino.mao(0), b = menino.mao(1), boca = cabecaDe(menino, -0.12);
      const sob = tc > tMi && tc < tQu ? Math.sin(K.clamp((tc - tMi) / 0.6) * PI) : 0;
      const fr = V(0, 0, 1).applyQuaternion(menino.g.quaternion), pe = menino.g.position;
      const m0 = [pe.x + fr.x * 0.4, 0.74, pe.z + fr.z * 0.4]; void a; void b;
      miojo.position.set(K.lerp(m0[0], boca[0], sob * 0.2), K.lerp(m0[1], boca[1] - 0.25, sob * 0.2), K.lerp(m0[2], boca[2] + 0.2, sob * 0.2));
      miojo.rotation.set(0.25 + sob * 0.4, 0, 0);
      // EFEITOS VISUAIS: "Estação seca" e as folhas secas em "seca" · o contador dos dias até 40
      if (tc < tMi + 0.3) fx.et.seca.em({ tela: [540, 400] }, tc - tSe);
      if (tc > tSe) fx.folhas.em(mais(TRONCO_SENTA, [0, 0, 0]), tc - tSe, { forca: 0.7 });
      fx.cont.em([TRONCO_SENTA[0] - 0.1, 1.78, TRONCO_SENTA[2] + 0.1], tc - tMi, { de: 1, ate: 40, dur: Math.max(0.6, tQu - tMi + 0.3), antes: 'Dia ', depois: '', cor: '#e8352b', tam: 0.85 });
      // SONS: o vento (folhas) · slurp (respingo) em "miojo"
      K.som('whoosh', tSe, 0.3); K.som('respingo', tMi + 0.3, 0.35);
    },
    vai(B, tc) {
      // NA TELA: o Caio de pé no meio da clareira tem a ideia e sai correndo pela trilha · MOSTRA: personagem
      const tRa = quando('raro', B, 0.4), tVa = quando('vai', B, 0.75), tAt = quando('atrás', B, 0.88);
      ve(arbusto);
      const POS = [0.9, 0, 1.0], FIM = [4.6, 0, -4.5];
      // PERSONAGEM: em "raro": ideia · em "vai": vira e corre pela trilha
      if (tc < tVa) { menino.colocar(POS, [1.2, 1.4, 6]); menino.reagir(tc < tRa ? 'duvida' : 'ideia', tc - (tc < tRa ? B.inicio : tRa)); }
      else menino.irPara(POS, FIM, pc(tc, tVa, tVa + 1.6), tc, { correr: true });
      // CÂMERA: (1) de baixo pra cima, o herói (chegando) · (2) em "vai", fixa vendo ele correr pra longe
      if (tc < tVa) K.heroi(menino, pc(tc, B.inicio, tVa), { lado: 20, dist: 2.8 });
      else K.mirar([1.6, 1.6, 4.4], mais(menino.g.position.toArray(), [0, 0.9, 0]));
      // EFEITOS VISUAIS: "Comportamento raro!" em "raro" · ! em "vai" · poeira na saída
      fx.et.raro.em({ tela: [540, 400] }, tc - tRa);
      if (tc > tRa && tc < tVa) fx.simb.em(cabecaDe(menino, 0.5), tc - tRa, { tipo: '!', tam: 0.55 });
      if (tc > tVa) fx.poof.em(mais(POS, [0, 0.15, 0]), tc - tVa, { escala: 0.5 });
      // SONS: ding da ideia · whoosh na corrida
      K.som('ding', tRa, 0.45); K.som('whoosh', tVa, 0.5);
      for (let k = 0; k < 5; k++) K.som('passo', tVa + 0.1 + k * 0.2, 0.25);
      void tAt;
    },
    investe(B, tc) {
      // NA TELA: o Caio de pé no quarto com o copo de açaí; o açaí vira moeda e cai no teclado; a tela com os pinos · MOSTRA: personagem, pagamento, monitor
      const tDe = quando('decide', B, 0.08), tIn = quando('investir', B, 0.2), tAc = quando('açaí', B, 0.4), tSi = quando('sistema', B, 0.55), tSt = quando('site', B, 0.92);
      ve(comp, cad);
      menino.colocar(EM_PE, tc < tSi + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tDe) menino.reagir('segurando', tc - B.inicio); else if (tc < tSi) menino.reagir('sim', tc - tDe); else menino.reagir('digitando', tc);
      menino.humor(tc > tDe ? 'feliz' : 'normal');
      menino.g.updateMatrixWorld(true);
      const pPos = mais(menino.mao(1), [0.03, 0.1, 0.06]);
      if (tc < tSi) { ve(acai); acai.position.set(...pPos); acai.rotation.set(0, tc, 0.1); acai.scale.setScalar(1.3 * Math.max(0.6, pop(tc - tAc + 0.35))); }
      if (tc > tSi) {
        fx.poof.em(pPos, tc - tSi, { escala: 0.35 });
        const q = K.clamp((tc - tSi) / 0.45); moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tSi + 0.45, 0.6);
      }
      const n = tc > tSt - 0.4 ? Math.min(6, 1 + Math.floor((tc - tSt + 0.4) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => (tc > tSi ? mapaPinos(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tSi) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tSt - 0.4 + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      if (tc < tSi + 0.15) { const k = K.suave(pc(tc, B.inicio, tSi + 0.15)); K.mirar([K.lerp(0.75, 0.6, k), 1.55, K.lerp(3.2, 2.6, k)], [0.85, 1.15, -0.5]); }
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tSi + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com; a lista das clínicas de estética de Belém sobe; "29 sem site" · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.04), tDi = quando('digita', B, 0.12), tL = quando('lista', B, 0.45), tCl = quando('clínicas', B, 0.55), tNo = quando('nove', B, 0.93);
      ve(comp, cad, navG);
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tCl ? 1 + Math.floor((tc - tCl) / 0.22) : 0;
        telaC.mostrar('listaClinicas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tCl + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5); K.som('festa', tNo, 0.35);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
      fx.et.belem.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tNo + 0.2);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Clínica Bella Pele cai do alto; o robô; o Caio · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseBella', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5); K.som('brilho', tM, 0.6);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    ficha(B, tc) {
      // NA TELA: a ficha da Clínica Bella Pele do lado do computador, o WhatsApp, a nota subindo até 87; em "mensagem", a mensagem pronta · MOSTRA: tela, personagem
      const tAb = quando('abre', B, 0.08), tZa = quando('WhatsApp', B, 0.35), tNo = quando('nota', B, 0.5), tMs = quando('mensagem', B, 0.8), tPr = quando('pronta', B, 0.93);
      ve(comp, cad, telaC); comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      if (tc < tMs) telaC.mostrar('analiseBella', { ate: tc > tNo + 0.4 ? 1 : 0, score: K.clamp((tc - tNo) / 0.7), zap: tc > tZa });
      else telaC.mostrar('msgBella', { d: K.clamp((tc - tMs) / 1.0) });
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc < tPr ? TELA_Q : [1.6, 1.4, 5]);
      if (tc < tPr) menino.apontar(0.55 + Math.sin(tc * 3) * 0.05); else menino.reagir('sim', tc - tPr);
      K.som('clique', tAb, 0.4); K.som('ding', tZa, 0.35); for (let k = 0; k < 5; k++) K.som('bip', tNo + k * 0.12, 0.2); K.som('certo', tPr, 0.45);
      const cv = (tNo + tMs) / 2;
      if (tc < cv) K.filmar([telaC, mais(TELA_Q, [0, 1.0, 0]), mais(TELA_Q, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.5 });
      else K.filmar([telaC, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.9 });
      if (tc > tZa && tc < tMs) fx.et.zap.em({ tela: [540, 400] }, tc - tZa);
    },
    responde(B, tc) {
      // NA TELA: de volta à floresta (pelo binóculo): a dona da Bella Pele vem pela trilha e, em vez de passar, para e responde; o Caio com o celular: "Quero sim!" · MOSTRA: personagem, celular, cliente
      const tPr = quando('primeira', B, 0.15), tFu = quando('fugiu', B, 0.45), tRe = quando('Respondeu', B, 0.8);
      ve(arbusto);
      const CL = [-0.6, 0, -0.9], ME = [0.85, 0, 0.3];
      // OBJETOS SE MEXENDO: a cliente chega andando pela trilha e para na frente dele
      cliente.g.visible = true;
      const k = pc(tc, B.inicio, tFu);
      if (k < 1) cliente.irPara([-5.5, 0, TRILHA_Z], CL, k, tc, { olhar: cabecaDe(menino, 0) }); else { cliente.colocar(CL, [ME[0] + 0.4, 1.4, ME[2] + 2.2]); if (tc > tRe) cliente.reagir('sim', tc - tRe); else cliente.humor('feliz'); }
      // PERSONAGEM: com o celular, olhando a tela · em "fugiu": surpreso · em "Respondeu": comemora
      menino.colocar(ME, tc < tRe ? [ME[0] + 0.5, 1.4, 4] : [0.2, 1.4, 5]);
      if (tc < tFu) menino.reagir('celular', tc - B.inicio); else if (tc < tRe) menino.reagir('surpreso', tc - tFu); else menino.reagir('comemorando', tc - tRe);
      // CÂMERA: (1) pelo binóculo, de longe, a cliente chegando · (2) os dois de frente, chegando
      const cv = Math.max(B.inicio + 0.9, tFu - 0.1);
      if (tc < cv) K.mirar([K.lerp(1.2, 0.9, pc(tc, B.inicio, cv)), 1.5, K.lerp(8.5, 7.4, pc(tc, B.inicio, cv))], [-0.6, 1.0, -0.6]);
      else K.filmar([cabecaDe(menino, 0.3), cabecaDe(cliente, 0.3), mais(ME, [0, 0.4, 0]), mais(CL, [0, 0.4, 0])], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 12, altura: 'olho', tam: 2.2 });
      binoculo(tc < cv ? 1 : 0);
      if (tc > cv) celNaMao((c, w, h) => zapBella(c, w, h, { resp: tc > tRe - 0.3 }), 'z' + (tc > tRe - 0.3), 1.7); else cel.g.visible = false;
      // EFEITOS VISUAIS: "Não fugiu!" em "fugiu" · o balão "Quero sim!" e ✓ em "Respondeu"
      if (tc > tFu) fx.et.naoFugiu.em({ tela: [540, 400] }, tc - tFu);
      fx.fala.em(cabecaDe(cliente, 0.05), tc - tRe, { texto: 'Quero sim!', lado: -1 });
      // SONS: passos · ding da mensagem · certo
      for (let k2 = 0; k2 < 5; k2++) K.som('passo', B.inicio + k2 * 0.35, 0.2);
      K.som('ding', tRe, 0.6); K.som('certo', tRe + 0.3, 0.45);
      void tPr;
    },
    evolui(B, tc) {
      // NA TELA: o Caio no meio da clareira com os binóculos; poof: vira caçador (pose de vitória); "Caçado" riscado e "Caçador ✓" · MOSTRA: personagem
      const tEv = quando('evolui', B, 0.35), tCa = quando('caçado', B, 0.65), tCr = quando('caçador', B, 0.88);
      const POS = [0.9, 0, 1.0];
      // PERSONAGEM: antes de "evolui": olhando pelo binóculo, procurando · em "evolui": poof e pose de vitória · em "caçador": aponta pra câmera
      menino.colocar(POS, tc < tEv ? [K.lerp(-3, 3, pc(tc, B.inicio, tEv)), 1.5, 5] : [1.2, 1.4, 6]);
      if (tc < tEv) menino.reagir('erguendo', tc - B.inicio); else if (tc < tCr) menino.reagir('vitoria', tc - tEv); else menino.apontar(0.45);
      // CÂMERA: (1) chegando de frente nele procurando · (2) em "evolui", herói de baixo pra cima
      if (tc < tEv) K.filmar([cabecaDe(menino, 0.3), mais(POS, [0, 0.5, 0])], 'chegando', pc(tc, B.inicio, tEv), { plano: 'medio', lado: -12, altura: 'olho', tam: 1.9 });
      else K.heroi(menino, pc(tc, tEv, B.ate), { lado: 18, dist: 3.0 });
      // OBJETOS: os binóculos no olho (antes) e na mão (depois)
      ve(binoc); menino.g.updateMatrixWorld(true);
      if (tc < tEv) { const cab = cabecaDe(menino, -0.02), f = V(0, 0, 1).applyQuaternion(menino.g.quaternion); binoc.position.set(cab[0] + f.x * 0.28, cab[1], cab[2] + f.z * 0.28); binoc.rotation.set(0, menino.g.rotation.y, 0); }
      else { const m = menino.mao(1); binoc.position.set(m[0], m[1] + 0.05, m[2]); binoc.rotation.set(0.3, menino.g.rotation.y, 0); }
      // EFEITOS VISUAIS: poof em "evolui" · "Caçado" (com ✗) em "caçado" · "Caçador ✓" em "caçador"
      fx.poof.em(mais(POS, [0, 0.9, 0]), tc - tEv, { escala: 0.7 });
      if (tc < tCr) fx.et.cacado.em({ tela: [540, 400] }, tc - tCa); else fx.et.cacador.em({ tela: [540, 400] }, tc - tCr);
      if (tc > tCa && tc < tCr) fx.simb.em(mais(cabecaDe(menino, 0.5), [-0.4, 0, 0]), tc - tCa, { tipo: '✗', tam: 0.45 });
      if (tc > tCr) fx.simb2.em(mais(cabecaDe(menino, 0.5), [0.45, 0, 0]), tc - tCr, { tipo: '✓', tam: 0.5 });
      // SONS: poof (whoosh) · errado no "caçado" · festa no "caçador"
      K.som('whoosh', tEv, 0.5); K.som('errado', tCa, 0.3); K.som('festa', tCr, 0.55);
    },
    segue(B, tc) {
      // NA TELA: o Caio de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteCaio, 'caio');
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
      comp.tela.desenhar(siteCaio, 'caio');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende o "habitat natural": o Caio atrás do arbusto, com o notebook, olhando pra câmera, desconfiado
      ve(arbusto);
      menino.colocar(TOCA, [1.3, 1.4, 5]); menino.reagir('duvida', 0.6);
      K.filmar([cabecaDe(menino, 0.35), mais(ARB, [0, 0.45, 0]), mais(TOCA, [0, 0.5, 0])], 'parado', 0, { plano: 'perto', lado: 15, altura: 'olho', espacoCima: 0.4, tam: 1.75 });
      noteNaMao();
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cliente, ...clientes].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    mascara.visible = false;
    cad.position.set(...CAD_LADO); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // a cadeira gira junto com o Caio quando ele está sentado nela (senão o encosto tapa ele)
    if (menino.g.visible && Math.hypot(menino.g.position.x - SEAT[0], menino.g.position.z - SEAT[2]) < 0.05) cad.rotation.y = menino.g.rotation.y;
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
