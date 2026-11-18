// Plantão: web designer sem cliente há três meses (canal Mappoa, feito na nuvem, 18/11/2026): TELEJORNAL DE PLANTÃO.
// O narrador é o âncora; na tela, a tarja do jornal (PLANTÃO · AO VIVO e a manchete de cada frase). O Lucas (o
// personagem do canal) está isolado no quarto com fita de "não ultrapasse" e sirenes; atualiza o portfólio pela décima
// vez; a vizinha dá entrevista na rua enquanto ele manda a mesma mensagem pra outro estado; as oficinas da rua dele
// seguem sem site; ele muda de estratégia, investe o preço de um lanche no Mappoa, acha as oficinas mecânicas de Porto
// Alegre sem site e abre a Oficina do Gaúcho (nota 92). Atualização: o dono respondeu e fechou. O Lucas passa bem.
// Lugares (K.cenarios): o quarto (home_office), a rua (rua_predios), a oficina e o palco do Mappoa. Cada plano começa
// com as linhas da ficha (NA TELA · MOSTRA · PERSONAGEM · CÂMERA · EFEITOS · SONS).
(function () {
  const PI = Math.PI;
  let bl, CS, menino, vizinha, mecanico, robo, comp, cad, navG, telaC, telaM, cel, moeda, lanche, FOV0;
  let tv, fita, sirenes, lampada, mic, baloes, placaSemSite, contrato, carro;
  const tudo = [], fx = {}, encarar = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const lerp3 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k), K.lerp(a[2], b[2], k)];
  const malha = (geo, cor, op = {}) => K.malha(geo, K.mat(cor, op));

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira no SEAT quando ele senta, encostada do lado se não
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62], CAD_LADO = [-1.6, 0, -0.75];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const CANTOS = [[-1.75, 0.45], [0.75, 0.45], [0.75, -2.2], [-1.75, -2.2]]; // os 4 cones da fita, em volta da mesa
  // Rua (rua_predios): a vizinha no calçadão, logo depois de uma árvore; o Lucas passando lá atrás
  const VZ = [0.35, 0, 12.5], RUA_LUCAS = [[-1.6, 0, 8.2], [0.2, 0, 8.6]];
  // Oficina: o carro no elevador em [-3.1, ·, -2.3]; o mecânico embaixo dele; o meio da oficina pro aperto de mão
  const MEC = [-3.0, 0, -1.55], LUC_OF = [-0.5, 0, 0.7], MEC_OF = [0.3, 0, 0.6];

  const LUGAR = {
    gancho: 'quarto', portfolio: 'quarto', vizinhos: 'rua', oficinas: 'oficina', fontes: 'quarto', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', ficha: 'quarto', atualizacao: 'oficina', passabem: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'quarto'
  };

  const OFICINAS = [
    { nome: 'Oficina do Gaúcho', end: 'Av. Assis Brasil, 2210', chips: ['whats', 'tel'] },
    { nome: 'Auto Center Farrapos', end: 'Av. Farrapos, 1580', chips: ['tel', 'insta'] },
    { nome: 'Mecânica Guaíba', end: 'Rua Voluntários da Pátria, 940', chips: ['whats'] },
    { nome: 'Freios e Cia Partenon', end: 'Av. Bento Gonçalves, 3305', chips: ['whats', 'insta'] }
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
  // plano com desenho em canvas: .userData.desenhar(fn, chave) redesenha só quando a chave muda
  function plano(w, h, px, fn, op = {}) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * h) / w);
    const cx = cv.getContext('2d');
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tx, transparent: true, side: op.dupla ? THREE.DoubleSide : THREE.FrontSide });
    if (op.tela) { mat.depthTest = false; mat.depthWrite = false; mat.fog = false; }
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    let chave = null;
    m.userData.desenhar = (f, k) => { if (k === chave) return; chave = k; cx.clearRect(0, 0, cv.width, cv.height); f(cx, cv.width, cv.height); tx.needsUpdate = true; };
    if (fn) m.userData.desenhar(fn, 'ini');
    return m;
  }

  // ---------- Telas e cartões desenhados ----------
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
  function siteLucas(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Lucas Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // o portfólio no monitor, com a versão subindo e o "Salvar"
  function portfolioTela(c, w, h, e) {
    siteLucas(c, w, h);
    rr(c, w * 0.6, h * 0.04, w * 0.36, h * 0.2, 12, '#0b1b3a');
    txt(c, 'Portfólio v' + e.v, w * 0.78, h * 0.14, w * 0.05, '#ffd23a', 900, 'center');
    if (e.salvo) { rr(c, w * 0.25, h * 0.55, w * 0.5, h * 0.22, 16, '#2fb54a'); txt(c, 'Salvo ✓ (de novo)', w * 0.5, h * 0.66, w * 0.05, '#fff', 900, 'center'); }
  }
  // o celular do Lucas: a caixa vazia
  function caixaVazia(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.13); txt(c, 'Clientes', w * 0.08, h * 0.066, w * 0.08, '#fff', 800);
    txt(c, '0', w / 2, h * 0.45, w * 0.4, '#e8352b', 900, 'center'); txt(c, 'mensagens', w / 2, h * 0.62, w * 0.09, '#4a4f58', 800, 'center');
  }
  // a mesma mensagem, mandada pra longe
  function msgLonge(c, w, h) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.12); txt(c, 'Empresa em Manaus', w * 0.06, h * 0.06, w * 0.065, '#fff', 800, 'left', w * 0.9);
    rr(c, w * 0.2, h * 0.2, w * 0.74, h * 0.22, 16, '#dcf8c6'); txt(c, 'Oi! Faço sites.', w * 0.25, h * 0.27, w * 0.075, '#111', 800); txt(c, 'Tem interesse?', w * 0.25, h * 0.35, w * 0.075, '#111', 800);
  }
  // a resposta do dono da oficina
  function zapGaucho(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.12); txt(c, 'Oficina do Gaúcho', w * 0.06, h * 0.06, w * 0.07, '#fff', 800, 'left', w * 0.9);
    rr(c, w * 0.06, h * 0.2, w * 0.78, h * 0.24, 16, '#ffffff'); txt(c, 'Bah, tchê! Quero', w * 0.1, h * 0.27, w * 0.075, '#111', 900); txt(c, 'o site. Fechado! 👍', w * 0.1, h * 0.36, w * 0.075, '#111', 900);
    if (e.ok) { rr(c, w * 0.3, h * 0.55, w * 0.64, h * 0.12, 16, '#dcf8c6'); txt(c, 'Combinado! ✓✓', w * 0.35, h * 0.61, w * 0.07, '#111', 800); }
  }
  function desenhaContrato(c, w, h) {
    rr(c, 0, 0, w, h, 16, '#fffdf4');
    c.strokeStyle = '#d9b44a'; c.lineWidth = 8; c.beginPath(); c.roundRect(10, 10, w - 20, h - 20, 12); c.stroke();
    txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.13, '#0b1b3a', 900, 'center');
    txt(c, 'Oficina do', w / 2, h * 0.26, w * 0.1, '#2fb5a6', 900, 'center'); txt(c, 'Gaúcho', w / 2, h * 0.36, w * 0.12, '#2fb5a6', 900, 'center');
    txt(c, 'Site novo', w / 2, h * 0.5, w * 0.08, '#3a3f48', 800, 'center');
    c.strokeStyle = '#2f6fd6'; c.lineWidth = 5; c.beginPath(); c.moveTo(w * 0.15, h * 0.7); c.bezierCurveTo(w * 0.3, h * 0.58, w * 0.4, h * 0.8, w * 0.55, h * 0.66); c.stroke();
    c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.75, h * 0.8, w * 0.12, 0, 7); c.fill();
    txt(c, '✓', w * 0.75, h * 0.8, w * 0.14, '#fff', 900, 'center');
    txt(c, 'FECHADO', w * 0.32, h * 0.86, w * 0.08, '#2fb54a', 900, 'center');
  }
  // a tarja do telejornal (cobre a tela inteira, por cima de tudo): PLANTÃO · AO VIVO em cima e a manchete embaixo
  function desenhaTarja(c, w, h, e) {
    c.clearRect(0, 0, w, h);
    if (e.flash > 0) { c.fillStyle = `rgba(232,53,43,${0.55 * e.flash})`; c.fillRect(0, 0, w, h); }
    // selo de cima (acima da frase da capa)
    rr(c, w * 0.04, h * 0.045, w * 0.36, h * 0.05, 10, '#e8352b');
    txt(c, 'PLANTÃO', w * 0.07, h * 0.07, h * 0.03, '#fff', 900);
    rr(c, w * 0.42, h * 0.045, w * 0.27, h * 0.05, 10, '#0b1b3a');
    if (e.pisca) { c.fillStyle = '#ff3b30'; c.beginPath(); c.arc(w * 0.46, h * 0.07, h * 0.009, 0, 7); c.fill(); }
    txt(c, 'AO VIVO', w * 0.49, h * 0.07, h * 0.024, '#fff', 900);
    if (!e.titulo) return;
    // a manchete (lower third), abaixo da legenda
    const y = h * 0.77;
    rr(c, w * 0.04, y, w * 0.26, h * 0.035, 8, e.cor || '#e8352b');
    txt(c, e.tag || 'URGENTE', w * 0.17, y + h * 0.0175, h * 0.021, '#fff', 900, 'center', w * 0.24);
    rr(c, w * 0.04, y + h * 0.04, w * 0.92, h * 0.065, 10, '#ffffff');
    c.fillStyle = e.cor || '#e8352b'; c.fillRect(w * 0.04, y + h * 0.04, w * 0.018, h * 0.065);
    txt(c, e.titulo, w * 0.08, y + h * 0.0725, h * 0.027, '#0b1b3a', 900, 'left', w * 0.86);
    if (e.sub) { rr(c, w * 0.04, y + h * 0.11, w * 0.62, h * 0.035, 8, '#0b1b3a'); txt(c, e.sub, w * 0.07, y + h * 0.1275, h * 0.02, '#fff', 800, 'left', w * 0.58); }
  }

  // ---------- Peças feitas aqui ----------
  // os cones e a fita amarela de "não ultrapasse" em volta da mesa do Lucas
  function fazFita() {
    const g = new THREE.Group();
    const pts = CANTOS.map(([x, z]) => V(x, 0, z));
    pts.forEach((p) => {
      const c = new THREE.Group(); c.position.copy(p); g.add(c);
      c.add(malha(new THREE.ConeGeometry(0.15, 0.55, 18), 0xf36b1e).translateY(0.3));
      c.add(malha(new THREE.CylinderGeometry(0.085, 0.105, 0.09, 18), 0xffffff).translateY(0.33));
      c.add(malha(new THREE.BoxGeometry(0.34, 0.04, 0.34), 0x2a2e33).translateY(0.02));
    });
    const desenho = (c, w, h) => {
      c.fillStyle = '#ffd400'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#111'; for (let x = -h; x < w; x += h * 1.4) { c.beginPath(); c.moveTo(x, h); c.lineTo(x + h * 0.5, 0); c.lineTo(x + h * 0.8, 0); c.lineTo(x + h * 0.3, h); c.fill(); }
      c.fillStyle = '#ffd400'; c.fillRect(0, h * 0.18, w, h * 0.64);
      for (let x = 10; x < w; x += 330) txt(c, 'NÃO ULTRAPASSE', x, h / 2, h * 0.5, '#111', 900);
    };
    for (let i = 0; i < 4; i++) {
      const a = pts[i], b = pts[(i + 1) % 4], L = a.distanceTo(b);
      // duas faces de um lado só, costas com costas: o letreiro sai certo dos dois lados (nunca espelhado)
      [0, PI].forEach((giro) => {
        const f = plano(L, 0.1, Math.round(L * 330), desenho);
        f.position.set((a.x + b.x) / 2, 0.52, (a.z + b.z) / 2);
        f.rotation.y = -Math.atan2(b.z - a.z, b.x - a.x) + giro;
        g.add(f);
      });
    }
    return g;
  }
  // o microfone da repórter (o braço entra pela direita da tela)
  function fazMic() {
    const g = new THREE.Group();
    g.add(malha(new THREE.CylinderGeometry(0.022, 0.018, 0.22, 14), 0x1d1f24).translateY(-0.11));
    g.add(malha(new THREE.SphereGeometry(0.05, 16, 12), 0x3a3f48, { roughness: 0.9 }));
    const cubo = plano(0.08, 0.05, 120, (c, w, h) => { rr(c, 0, 0, w, h, 6, '#e8352b'); txt(c, 'TV', w / 2, h / 2, h * 0.7, '#fff', 900, 'center'); }, { dupla: true });
    cubo.position.set(0, -0.06, 0.03); g.add(cubo);
    const braco = malha(new THREE.CylinderGeometry(0.045, 0.05, 0.9, 12), 0x8a4fd8); braco.rotation.z = PI / 2; braco.position.set(0.47, -0.2, 0); g.add(braco);
    const mao = malha(new THREE.SphereGeometry(0.05, 12, 10), 0xc98f62); mao.position.set(0.03, -0.2, 0); g.add(mao);
    return g;
  }
  // o lanche (o preço do investimento): pão, carne, queijo e alface
  function fazLanche() {
    const g = new THREE.Group();
    const pao = 0xe0a24a;
    const cima = malha(new THREE.SphereGeometry(0.1, 20, 10, 0, PI * 2, 0, PI / 2), pao); cima.scale.y = 0.6; cima.position.y = 0.05; g.add(cima);
    g.add(malha(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 20), pao).translateY(-0.04));
    g.add(malha(new THREE.CylinderGeometry(0.104, 0.104, 0.03, 20), 0x6b3a1e).translateY(-0.012));
    const q = malha(new THREE.BoxGeometry(0.17, 0.01, 0.17), 0xf5c518); q.position.y = 0.008; q.rotation.y = 0.4; g.add(q);
    g.add(malha(new THREE.CylinderGeometry(0.108, 0.108, 0.012, 20), 0x5bb24f).translateY(0.02));
    return g;
  }
  // as mensagens que voam pra longe ("pra outro estado")
  function fazBaloes() {
    return [0, 1, 2].map(() => plano(0.5, 0.2, 300, (c, w, h) => { rr(c, 4, 4, w - 8, h - 8, 24, '#dcf8c6'); txt(c, 'Oi! Faço sites.', w / 2, h / 2, h * 0.32, '#111', 800, 'center'); }, { dupla: true }));
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['rua_predios', {}, 'rua'], 'oficina', 'mundo_mappoa']);
    // na rua, as árvores e os bancos perto da entrevista ficam escondidos (senão tapam a câmera)
    CS.todos.rua.grupo.children.forEach((o) => { const x = Math.abs(o.position.x), z = o.position.z; if (x > 2.2 && x < 3.0 && z > 2 && z < 24) o.visible = false; });
    carro = CS.todos.oficina.objetos.carro;
    if (carro) K.nomear('oficina', carro);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaOficinas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: OFICINAS, n: e.n, sel: e.sel, total: 146, comSite: 98, semSite: 48 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Oficinas mecânicas · Porto Alegre, RS · 48 sem site', 36, 168, 19, M.marinho, 700, 'left', w - 72);
    };
    T.analiseGaucho = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Oficina do Gaúcho', ate: e.ate, aderencia: 0.92 * k,
        dores: ['Sem site: orçamento só pelo telefone', 'Some no Google pra quem procura mecânico na zona norte'], oportunidades: ['Site com os serviços e o WhatsApp do orçamento'],
        objecoes: ['"Cliente meu vem pelo boca a boca"'], abordagem: 'Mostre quanta gente procura mecânico na Assis Brasil e não acha a oficina dele.'
      });
      if (e.ate >= 0) txt(c, Math.round(92 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
      if (e.zap) { rr(c, w - 250, 132, 232, 44, 22, '#25d366'); txt(c, 'WhatsApp ✓', w - 134, 155, 22, '#fff', 900, 'center'); }
    };
    T.msgGaucho = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Oficina do Gaúcho (WhatsApp)', digitado: e.d, texto: 'Oi! Vi que a Oficina do Gaúcho ainda não tem site e o orçamento é só pelo telefone. Faço um site com os serviços e o WhatsApp. Te mostro uma ideia?' });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Lucas (do canal), a vizinha (Dona Cida), o mecânico (o dono da Oficina do Gaúcho) e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    vizinha = K.personagem('senhorinha'); K.semNome(vizinha.g); K.nomear('vizinha', vizinha.g);
    mecanico = K.personagem('entregador', { cores: { camiseta: 0x2f5d8a, calca: 0x2f5d8a, bone: 0xf39a1e, pele: 0xd9a27a } });
    if (mecanico.extras && mecanico.extras.bag) mecanico.extras.bag.visible = false;
    K.semNome(mecanico.g); K.nomear('mecanico', mecanico.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, CAD_LADO);
    fita = fazFita(); guarda(fita, 'fita');
    sirenes = [[0.55, 0.79, -1.15, 0xe8352b], [-1.55, 0.79, -1.15, 0x2f7fe0], [1.15, 0, 0.7, 0xe8352b]].map(([x, y, z, cor]) => { const s = K.m3d('sirene', { cor }); guarda(s, 'sirene', [x, y, z]); return s; });
    lampada = K.m3d('lampada_ideia'); guarda(lampada, null, null, 0.7);
    lanche = fazLanche(); guarda(lanche, 'pagamento', null, 1.3);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, 'pagamento');
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    cel = K.celular(); guarda(cel, 'celular', null, 1.8);
    // Rua
    mic = fazMic(); guarda(mic, 'microfone');
    baloes = fazBaloes(); baloes.forEach((b) => guarda(b, 'mensagem'));
    // Oficina
    placaSemSite = plano(1.3, 0.55, 520, (c, w, h) => { rr(c, 0, 0, w, h, 22, '#ffffff'); c.strokeStyle = '#e8352b'; c.lineWidth = 14; c.beginPath(); c.roundRect(7, 7, w - 14, h - 14, 18); c.stroke(); txt(c, '✗ SEM SITE', w / 2, h / 2 + 4, h * 0.42, '#e8352b', 900, 'center'); });
    guarda(placaSemSite, 'placa', [-3.45, 3.85, -4.45]);
    contrato = plano(0.42, 0.56, 360, desenhaContrato, { dupla: true }); guarda(contrato, 'contrato');

    // a tarja do jornal: um plano colado na frente da câmera (posto no fim de todo quadro)
    tv = plano(1, 1920 / 1080, 1080, null, { tela: true }); tv.renderOrder = 50; K.scene.add(tv); tv.visible = false; K.nomear('manchete', tv);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.cont = K.contador();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      zero: e('0 clientes', 'vermelho'), versao: e('10ª versão', 'laranja'), longe: e('1.100 km daqui 🚌', 'vermelho'), perto: e('A 100 m dele 📍', 'laranja'),
      estrategia: e('Nova estratégia', 'verde'), investir: e('Investir', 'azul'), poa: e('48 sem site', 'azul'), chance: e('Quem tem chance', 'verde'),
      zap: e('WhatsApp ✓', 'verde'), pronta: e('Mensagem pronta ✓', 'verde'), fechou: e('Fechou! ✓', 'verde'), proximo: e('Próximo cliente ➜', 'azul')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  function celNaMao(desenho, chave, esc = 1.8, quem = menino) {
    ve(cel); quem.g.updateMatrixWorld(true);
    const m = quem.mao(1); cel.g.position.set(m[0], m[1] + 0.12, m[2]); cel.g.scale.setScalar(esc);
    cel.g.lookAt(K.camera.position); cel.tela.desenhar(desenho, chave);
  }
  // a tarja do jornal nesta frase (chamar no plano; ela é posta na frente da câmera no fim do quadro)
  let tarja = null;
  const jornal = (e) => { tarja = e; };
  function porTarja(tc) {
    if (!tarja) { tv.visible = false; return; }
    const d = V(0, 0, -1).applyQuaternion(K.camera.quaternion), dist = 0.3;
    const h = 2 * dist * Math.tan((K.camera.fov * PI) / 360), w = h * K.camera.aspect;
    tv.visible = true; tv.position.copy(K.camera.position).addScaledVector(d, dist); tv.quaternion.copy(K.camera.quaternion);
    tv.scale.set(w, h / (1920 / 1080), 1);
    const pisca = Math.floor(tc * 2) % 2 === 0, fl = tarja.flash || 0;
    tv.userData.desenhar((c, W, H) => desenhaTarja(c, W, H, Object.assign({ pisca }, tarja, { flash: fl })), JSON.stringify([tarja.titulo, tarja.sub, tarja.tag, pisca, Math.round(fl * 10)]));
  }
  // o Lucas sentado na cadeira virado pra câmera (no meio da fita), largado
  function largado(olhar) { cad.position.set(...SEAT); menino.colocar(SEAT, olhar || [0.2, 1.2, 4]); menino.sentar(1); }
  const praCamera = (o) => encarar.push(o);

  const P = {
    gancho(B, tc) {
      // NA TELA: o quarto do Lucas isolado com fita amarela "NÃO ULTRAPASSE" e cones; duas sirenes girando na mesa e uma no
      // chão; o Lucas largado na cadeira com o celular "0 mensagens"; a tarja do jornal: PLANTÃO · AO VIVO e a manchete
      // "WEB DESIGNER HÁ 3 MESES SEM CLIENTE"; um clarão vermelho no 1º quadro · MOSTRA: personagem, manchete
      const tPl = B.inicio, tTr = quando('três', B, 0.6), tSe = quando('sem', B, 0.8);
      ve(comp, cad, fita); sirenes.forEach((s, i) => { ve(s); s.userData.m3d.em(tc + i * 0.4, 1); });
      comp.tela.desenhar(telaEscura, 'esc');
      // PERSONAGEM: largado na cadeira olhando o celular, triste · em "três meses": olha o relógio · em "sem cliente": chora
      largado([0.2, 1.0, 3]);
      if (tc < tTr) { menino.reagir('celular', tc - B.inicio); menino.humor('triste'); } else if (tc < tSe) menino.reagir('olha_relogio', tc - tTr); else menino.reagir('chorando', tc - tSe);
      // CÂMERA: 4 cortes rápidos: (1) aberta de frente, o quarto isolado com a fita e as sirenes · (2) de lado pela
      // direita, a sirene girando na frente e ele atrás · (3) em "três meses", perto dele de frente · (4) em "sem cliente", afastando
      const c1 = B.inicio + 0.8, c2 = Math.max(c1 + 0.7, tTr - 0.1), c3 = Math.max(c2 + 0.6, tSe - 0.1);
      if (tc < c1) { const k = pc(tc, B.inicio, c1); K.mirar([K.lerp(-0.2, -0.3, k), 1.9, K.lerp(4.6, 4.2, k)], [-0.45, 0.85, -0.7]); }
      else if (tc < c2) { const k = pc(tc, c1, c2); K.mirar([K.lerp(2.3, 2.1, k), 1.3, K.lerp(1.6, 1.4, k)], [-0.4, 0.9, -0.7]); }
      else if (tc < c3) { const k = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(-0.2, -0.3, k), 1.35, K.lerp(2.7, 2.4, k)], [-0.48, 0.95, -0.62]); }
      else { const k = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(-1.6, -1.9, k), 1.7, K.lerp(3.0, 3.5, k)], [-0.4, 0.85, -0.7]); }
      celNaMao(caixaVazia, 'vazio', 1.6);
      // EFEITOS VISUAIS: a tarja (com o clarão no começo) · o contador "Dia 90" em "três" · "0 clientes" e ✗ em "sem"
      jornal({ titulo: 'WEB DESIGNER HÁ 3 MESES SEM CLIENTE', sub: 'Plantão urgente · o caso Lucas', tag: 'URGENTE', flash: K.clamp(1 - (tc - tPl) / 0.35) });
      if (tc > tTr) fx.cont.em(cabecaDe(menino, 0.55), tc - tTr, { de: 1, ate: 90, dur: Math.max(0.5, tSe - tTr), antes: 'Dia ', depois: '', cor: '#e8352b', tam: 0.45 });
      fx.et.zero.em({ tela: [540, 600] }, tc - tSe);
      // SONS: a vinheta do plantão (brilho + zumbido da sirene) · ding no "três" · errado no "sem cliente"
      K.som('estrondo', tPl, 0.25); K.som('brilho', tPl, 0.5); K.som('zumbido', tPl + 0.1, 0.25); K.som('whoosh', c1, 0.25); K.som('whoosh', c2, 0.2); K.som('ding', tTr, 0.3); K.som('errado', tSe + 0.1, 0.45);
    },
    portfolio(B, tc) {
      // NA TELA: o Lucas sentado no computador; o monitor com o portfólio e o selo "Portfólio v1 → v10"; em "décima", o
      // "Salvo ✓ (de novo)"; a tarja: "VISTO ATUALIZANDO O PORTFÓLIO" · MOSTRA: personagem, monitor
      const tVi = quando('visto', B, 0.15), tAt = quando('atualizando', B, 0.45), tDe = quando('décima', B, 0.82);
      ve(comp, cad);
      const v = Math.max(1, Math.min(10, 1 + Math.floor(K.clamp((tc - tAt) / Math.max(0.4, tDe - tAt)) * 9)));
      comp.tela.desenhar((c, w, h) => portfolioTela(c, w, h, { v, salvo: tc > tDe }), 'p' + v + (tc > tDe));
      // PERSONAGEM: sentado, digitando sem parar · em "décima": vira pra câmera de lado e faz "sim", orgulhoso (o olhar pro lado direito)
      if (tc < tDe) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { sentado([0.45, 1.8, -1.0]); menino.reagir('sim', tc - tDe); menino.humor('feliz'); }
      // CÂMERA: (1) por cima do ombro, o monitor com o portfólio · (2) em "décima", de trás do monitor, o rosto dele (a lição do home_office)
      if (tc < tDe - 0.1) { const k = K.suave(pc(tc, B.inicio, tDe)); K.mirar([K.lerp(1.0, 0.85, k), 1.75, K.lerp(1.9, 1.6, k)], [-0.5, 1.05, -1.3]); }
      else { const k = pc(tc, tDe - 0.1, B.ate); K.mirar([K.lerp(1.5, 1.4, k), 1.55, -2.9], [-0.4, 1.05, -0.55]); }
      // EFEITOS VISUAIS: a tarja · "10ª versão" em "décima"
      jornal({ titulo: 'LUCAS FOI VISTO ATUALIZANDO O PORTFÓLIO', sub: 'pela 10ª vez', tag: 'EXCLUSIVO', cor: '#f39a1e' });
      fx.et.versao.em({ tela: [540, 400] }, tc - tDe);
      // SONS: o teclado (cliques) · o "salvo" (certo) em "décima"
      for (let k = 0; k < 9; k++) K.som('clique', tAt + k * 0.16, 0.2);
      K.som('certo', tDe, 0.4); K.som('whoosh', tVi, 0.2);
    },
    vizinhos(B, tc) {
      // NA TELA: a rua do Lucas; a Dona Cida (vizinha) dando entrevista no calçadão, o microfone da repórter entrando pela
      // direita; lá atrás, o Lucas andando com o celular e as mensagens voando pro alto, pra longe; a tarja "TESTEMUNHA" · MOSTRA: vizinha, personagem
      const tRe = quando('relatam', B, 0.15), tMe = quando('mensagem', B, 0.5), tOu = quando('outro', B, 0.78);
      // PERSONAGEM: andando devagar pelo calçadão, olhando o celular, mandando mensagem
      menino.irPara(RUA_LUCAS[0], RUA_LUCAS[1], pc(tc, B.inicio, B.ate), tc);
      menino.reagir('celular', tc - B.inicio);
      // a vizinha: fala pro microfone, gesticulando · em "outro estado": aponta pra longe
      const cv = tOu - 0.1;
      if (tc < cv) {
        vizinha.g.visible = true; vizinha.colocar(VZ, [0.3, 1.5, 16]);
        if (tc < tMe) vizinha.reagir('chamando', tc - tRe); else vizinha.apontar(0.7);
        ve(mic); const cab = cabecaDe(vizinha, -0.12); mic.position.set(cab[0] + 0.22, cab[1], cab[2] + 0.32); mic.rotation.set(0.3, 0, -0.5);
      }
      // CÂMERA: (1) de frente pra vizinha, a ~3,5 m, o Lucas lá atrás (K.mirar fixo no meio do calçadão) · (2) em "outro
      // estado", baixa perto do Lucas, as mensagens subindo
      if (tc < cv) { const k = pc(tc, B.inicio, cv); K.mirar([K.lerp(0.55, 0.45, k), 1.45, K.lerp(16.2, 15.9, k)], [0.05, 1.1, 11.0]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); const p = menino.g.position; K.mirar([p.x + K.lerp(1.4, 1.2, k), 1.15, p.z + K.lerp(3.2, 2.9, k)], [p.x - 0.1, 1.35, p.z]); }
      celNaMao(msgLonge, 'longe', 1.7);
      // OBJETOS SE MEXENDO: as mensagens saem do celular, uma a cada 0,4 s a partir de "mensagem", e voam pro alto e pra trás
      menino.g.updateMatrixWorld(true);
      const m = menino.mao(1);
      baloes.forEach((b, i) => {
        const t0 = tMe - 0.2 + i * 0.4, k = K.clamp((tc - t0) / 1.4);
        if (tc < t0 || k >= 1) return;
        ve(b); b.position.set(m[0] - k * 2.0, m[1] + 0.3 + k * 2.6, m[2] - k * 6); b.scale.setScalar(1 - k * 0.5); praCamera(b);
        K.som('whoosh', t0, 0.2);
      });
      // EFEITOS VISUAIS: a tarja "TESTEMUNHA" · "1.100 km daqui 🚌" em "outro"
      jornal({ titulo: '"ELE MANDA PRA EMPRESA DE OUTRO ESTADO"', sub: 'Dona Cida, vizinha', tag: 'TESTEMUNHA', cor: '#8a4fd8' });
      fx.et.longe.em({ tela: [540, 400] }, tc - tOu);
      // SONS: os passos · o "enviado" (pingo) de cada mensagem · errado em "outro estado"
      for (let k = 0; k < 6; k++) K.som('passo', B.inicio + k * 0.5, 0.15);
      K.som('pingo', tMe, 0.3); K.som('errado', tOu + 0.2, 0.35);
    },
    oficinas(B, tc) {
      // NA TELA: a oficina mecânica da rua dele: o carro no elevador e o mecânico embaixo, mexendo com a chave; na parede,
      // a placa "✗ SEM SITE"; em "cem metros", o contador "100 m" · MOSTRA: oficina, mecanico
      const tOf = quando('oficinas', B, 0.2), tSi = quando('site', B, 0.45), tCe = quando('cem', B, 0.8);
      ve(placaSemSite);
      // a placa "✗ SEM SITE" cai na parede em "site"
      placaSemSite.position.y = 3.85 + Math.max(0, K.queda(tc - tSi, 1.6, 0.35));
      if (tc < tSi) placaSemSite.visible = false;
      // PERSONAGEM (o mecânico): embaixo do carro, braços pra cima trabalhando · em "cem": vira e dá de ombros pra câmera
      mecanico.g.visible = true; menino.g.visible = false;
      if (tc < tCe) { mecanico.colocar(MEC, [-1.0, 1.6, 2.5]); mecanico.reagir('erguendo', tc - B.inicio); }
      else { mecanico.colocar(MEC, [0.5, 1.4, 4]); mecanico.reagir('ombros', tc - tCe); }
      // CÂMERA: (1) de frente-direita, o carro no elevador e o mecânico · (2) em "cem metros", afastando pela esquerda (a oficina inteira)
      const cv = Math.max(B.inicio + 1.2, tSi + 0.6);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(-1.0, -1.25, k), 1.2, K.lerp(2.3, 2.0, k)], [-2.85, 1.35, -1.75]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(-2.0, -2.2, k), 1.9, K.lerp(3.2, 3.8, k)], [-2.95, 1.9, -2.2]); }
      // EFEITOS VISUAIS: a tarja · o contador "100 m" e "A 100 m dele 📍" em "cem"
      jornal({ titulo: 'OFICINAS DA RUA DELE SEGUEM SEM SITE', sub: 'a menos de 100 metros', tag: 'ENQUANTO ISSO', cor: '#2f7fe0' });
      if (tc > tCe) fx.cont.em([-2.4, 2.3, -1.6], tc - tCe, { de: 0, ate: 100, dur: 0.5, antes: '', depois: ' m', cor: '#f39a1e', tam: 0.5 });
      fx.et.perto.em({ tela: [540, 400] }, tc - tCe);
      // SONS: metal da chave de roda · baque da placa · ding no "cem"
      for (let k = 0; k < 4; k++) K.som('metal', tOf + k * 0.5, 0.2);
      K.som('baque', tSi + 0.35, 0.4); K.som('ding', tCe, 0.35);
    },
    fontes(B, tc) {
      // NA TELA: de manhã, no quarto: a fita no chão sendo arrancada; o Lucas se levanta da cadeira e a lâmpada da ideia
      // acende em cima dele; a tarja "ELE MUDOU DE ESTRATÉGIA" · MOSTRA: personagem, manchete
      const tCo = quando('confirmam', B, 0.25), tMa = quando('manhã', B, 0.5), tMu = quando('mudou', B, 0.7);
      ve(comp, cad);
      comp.tela.desenhar(siteLucas, 'site');
      // a fita ainda em volta até "mudou" (aí some num poof)
      if (tc < tMu) ve(fita);
      // PERSONAGEM: sentado, pensando · em "manhã": se levanta · em "mudou": ideia, de pé no meio
      if (tc < tMa) { largado([0.2, 1.2, 4]); menino.reagir('pensando', tc - B.inicio); }
      else { menino.colocar(mais(SEAT, [0.7, 0, 0.6]), [0.2, 1.4, 4]); menino.reagir(tc < tMu ? 'erguendo' : 'ideia', tc - (tc < tMu ? tMa : tMu)); }
      // CÂMERA: (1) baixa de frente, devagar · (2) em "manhã", de baixo pra cima, ele de pé, decidido
      if (tc < tMa) { const k = pc(tc, B.inicio, tMa); K.mirar([K.lerp(0.9, 0.7, k), 1.2, K.lerp(2.8, 2.5, k)], [-0.45, 0.85, -0.62]); }
      else { const k = K.suave(pc(tc, tMa, B.ate)); K.mirar([K.lerp(0.9, 1.1, k), 0.8, K.lerp(3.0, 2.8, k)], [0.2, 1.25, 0.0]); }
      // OBJETOS: a lâmpada da ideia aparece em cima da cabeça em "mudou"
      if (tc > tMu) { ve(lampada); const cab = cabecaDe(menino, 0.35); lampada.position.set(...cab); lampada.scale.setScalar(0.7 * pop(tc - tMu)); }
      // EFEITOS VISUAIS: a tarja · poof na fita e "Nova estratégia" em "mudou"
      jornal({ titulo: 'ELE MUDOU DE ESTRATÉGIA', sub: 'fontes confirmam · hoje de manhã', tag: 'URGENTE' });
      fx.poof.em([-0.5, 0.5, 0.45], tc - tMu, { escala: 0.35 });
      fx.et.estrategia.em({ tela: [540, 400] }, tc - tMu);
      // SONS: whoosh em "manhã" · ding da ideia em "mudou"
      K.som('whoosh', tMa, 0.3); K.som('ding', tMu, 0.5); K.som('brilho', tMu + 0.1, 0.35); void tCo;
    },
    investe(B, tc) {
      // NA TELA: o Lucas de pé no quarto com o lanche; o lanche vira moeda e cai no teclado; a tela com os pinos · MOSTRA: personagem, pagamento, monitor
      const tIn = quando('investiu', B, 0.08), tLa = quando('lanche', B, 0.38), tSi = quando('sistema', B, 0.5), tSt = quando('site', B, 0.92);
      ve(comp, cad);
      // PERSONAGEM: segura o lanche · em "lanche": faz "sim" · em "sistema": vira pro computador e digita
      menino.colocar(EM_PE, tc < tSi + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tLa) menino.reagir('segurando', tc - B.inicio); else if (tc < tSi) menino.reagir('sim', tc - tLa); else menino.reagir('digitando', tc);
      menino.humor('feliz');
      menino.g.updateMatrixWorld(true);
      const pPos = mais(menino.mao(1), [0.03, 0.1, 0.06]);
      // OBJETOS: o lanche na mão; em "sistema", vira moeda e cai no teclado; a tela acende com os pinos em "site"
      if (tc < tSi) { ve(lanche); lanche.position.set(...pPos); lanche.rotation.set(0.2, tc, 0); lanche.scale.setScalar(1.3 * Math.max(0.6, pop(tc - tLa + 0.35))); }
      if (tc > tSi) {
        fx.poof.em(pPos, tc - tSi, { escala: 0.35 });
        const q = K.clamp((tc - tSi) / 0.45); moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tSi + 0.45, 0.6);
      }
      const n = tc > tSt - 0.4 ? Math.min(6, 1 + Math.floor((tc - tSt + 0.4) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => (tc > tSi ? mapaPinos(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tSi) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tSt - 0.4 + k * 0.12, 0.2);
      // EFEITOS VISUAIS: "Investir" em cima dele em "investiu"
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) perto dele com o lanche · (2) em "sistema", o monitor e ele juntos (K.mirar fixo)
      if (tc < tSi + 0.15) { const k = K.suave(pc(tc, B.inicio, tSi + 0.15)); K.mirar([K.lerp(0.75, 0.6, k), 1.55, K.lerp(3.2, 2.6, k)], [0.85, 1.15, -0.5]); }
      else { const k = K.suave(pc(tc, tSi + 0.15, B.ate)); K.mirar([K.lerp(0.6, 0.4, k), K.lerp(1.45, 1.65, k), K.lerp(3.8, 3.3, k)], [0.1, 1.2, -0.8]); }
      K.som('whoosh', tIn, 0.3);
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com sendo digitada; a lista das oficinas mecânicas de Porto Alegre sobe; "48 sem site" · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.04), tDi = quando('digitou', B, 0.12), tL = quando('lista', B, 0.45), tOf = quando('oficinas', B, 0.55), tSi = quando('site', B, 0.93);
      ve(comp, cad, navG);
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tOf ? 1 + Math.floor((tc - tOf) / 0.22) : 0;
        telaC.mostrar('listaOficinas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tOf + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5); K.som('festa', tSi, 0.35);
      }
      // PERSONAGEM: sentado digitando · em "lista": levanta surpreso e aponta a lista
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      // CÂMERA: (1) chegando perto da barra e do monitor · (2) em "lista", afastando: a lista e ele
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
      fx.et.poa.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tSi + 0.2);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Oficina do Gaúcho cai do alto; o robô acenando; o Lucas · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseGaucho', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
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
      // NA TELA: a ficha da Oficina do Gaúcho do lado do computador, o WhatsApp, a nota subindo até 92; em "mensagem", a
      // mensagem pronta sendo escrita · MOSTRA: tela, personagem
      const tAb = quando('Abriu', B, 0.05), tZa = quando('WhatsApp', B, 0.32), tNo = quando('nota', B, 0.45), tMs = quando('mensagem', B, 0.8), tPr = quando('pronta', B, 0.93);
      ve(comp, cad, telaC); comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      if (tc < tMs) telaC.mostrar('analiseGaucho', { ate: tc > tNo + 0.4 ? 1 : 0, score: K.clamp((tc - tNo) / 0.7), zap: tc > tZa });
      else telaC.mostrar('msgGaucho', { d: K.clamp((tc - tMs) / 1.0) });
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc < tPr ? TELA_Q : [1.6, 1.4, 5]);
      if (tc < tPr) menino.apontar(0.55 + Math.sin(tc * 3) * 0.05); else menino.reagir('sim', tc - tPr);
      K.som('clique', tAb, 0.4); K.som('ding', tZa, 0.35); for (let k = 0; k < 5; k++) K.som('bip', tNo + k * 0.12, 0.2); K.som('certo', tPr, 0.45);
      const cv = (tNo + tMs) / 2;
      if (tc < cv) K.filmar([telaC, mais(TELA_Q, [0, 1.0, 0]), mais(TELA_Q, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.5 });
      else K.filmar([telaC, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.9 });
      if (tc > tZa && tc < tMs) fx.et.zap.em({ tela: [540, 400] }, tc - tZa);
      fx.et.pronta.em({ tela: [540, 400] }, tc - tPr);
    },
    atualizacao(B, tc) {
      // NA TELA: na oficina, o dono (de boné e macacão) com o celular: "Bah, tchê! Quero o site. Fechado! 👍"; em "fechou",
      // ele e o Lucas apertam a mão e o contrato sobe entre os dois; a tarja "ATUALIZAÇÃO" · MOSTRA: mecanico, personagem, contrato
      const tAt = quando('Atualização', B, 0.05), tRe = quando('respondeu', B, 0.45), tFe = quando('fechou', B, 0.8);
      ve(placaSemSite); placaSemSite.position.y = 3.85;
      mecanico.g.visible = true;
      // PERSONAGEM: o Lucas chega andando até o meio da oficina · em "fechou": aperta a mão do dono e comemora
      // (cada um virado pra um ponto entre o outro e a câmera, pra não ficarem de costas)
      const meio = [(LUC_OF[0] + MEC_OF[0]) / 2, 1.3, (LUC_OF[2] + MEC_OF[2]) / 2 + 2.2];
      const kA = pc(tc, B.inicio, Math.max(B.inicio + 0.6, tRe - 0.2));
      if (kA < 1) menino.irPara(mais(LUC_OF, [-0.9, 0, 0.4]), LUC_OF, kA, tc); else menino.colocar(LUC_OF, meio);
      mecanico.colocar(MEC_OF, meio);
      const aperto = tc > tFe - 0.1;
      if (!aperto) { mecanico.reagir('celular', tc - B.inicio); if (kA >= 1) menino.reagir('surpreso', tc - tRe); }
      else {
        const v = Math.sin((tc - tFe) * 14) * 0.08;
        menino.pose({ x: -0.2, z: 0.1 }, { x: -1.15 + v, z: -0.35, c: -0.2 }); menino.humor('feliz');
        mecanico.pose({ x: -1.15 + v, z: 0.35, c: -0.2 }, { x: -0.2, z: 0.1 }); mecanico.humor('feliz');
      }
      // CÂMERA: (1) de frente, os dois no meio da oficina e o carro no fundo · (2) em "fechou", mais perto, o aperto e o contrato
      if (tc < tFe - 0.1) { const k = pc(tc, B.inicio, tFe - 0.1); K.mirar([K.lerp(-0.35, -0.2, k), 1.6, K.lerp(5.9, 5.6, k)], [-0.1, 1.15, 0.65]); }
      else { const k = K.suave(pc(tc, tFe - 0.1, B.ate)); K.mirar([K.lerp(0.3, 0.2, k), 1.5, K.lerp(5.0, 4.7, k)], [-0.1, 1.3, 0.65]); }
      if (!aperto) celNaMao((c, w, h) => zapGaucho(c, w, h, { ok: tc > tRe + 0.4 }), 'z' + (tc > tRe + 0.4), 1.7, mecanico); else cel.g.visible = false;
      // OBJETOS: o contrato sobe entre os dois em "fechou"
      if (aperto) { ve(contrato); const k = pop(tc - tFe); contrato.position.set(meio[0], 1.75 + 0.1 * k, LUC_OF[2] - 0.05); contrato.scale.setScalar(Math.max(0.0001, k)); praCamera(contrato); }
      // EFEITOS VISUAIS: a tarja "ATUALIZAÇÃO" · ✓ e "Fechou! ✓" em "fechou"
      jornal({ titulo: 'O DONO DA OFICINA RESPONDEU. E FECHOU.', sub: 'Oficina do Gaúcho · Porto Alegre', tag: 'ATUALIZAÇÃO', cor: '#2fb54a' });
      if (tc > tFe) fx.simb.em([meio[0] + 0.45, 2.15, LUC_OF[2]], tc - tFe, { tipo: '✓', tam: 0.45 });
      fx.et.fechou.em({ tela: [540, 400] }, tc - tFe);
      // SONS: passos · ding da mensagem em "respondeu" · festa em "fechou"
      for (let k = 0; k < 4; k++) K.som('passo', B.inicio + k * 0.3, 0.2);
      K.som('ding', tRe, 0.5); K.som('festa', tFe, 0.55); K.som('certo', tFe + 0.2, 0.4); void tAt;
    },
    passabem(B, tc) {
      // NA TELA: o Lucas no quarto, sem a fita, de boa, com a lista do lado; a próxima oficina da lista acende; a tarja
      // "LUCAS PASSA BEM" · MOSTRA: personagem, tela
      const tPa = quando('passa', B, 0.15), tPr = quando('próximo', B, 0.65), tLi = quando('lista', B, 0.9);
      ve(comp, cad, telaC); comp.tela.desenhar(siteLucas, 'site');
      telaC.mostrar('listaOficinas', { n: 4, sel: tc > tPr ? 1 : 0 });
      // PERSONAGEM: de pé, faz "sim" pra câmera, feliz · em "próximo": aponta a próxima da lista
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc < tPr ? [0.8, 1.4, 5] : TELA_Q);
      if (tc < tPr) menino.reagir('vitoria', tc - tPa); else menino.apontar(0.55);
      // CÂMERA: (1) chegando de frente nele · (2) em "próximo", a lista e ele, pela esquerda
      if (tc < tPr - 0.1) { const k = K.suave(pc(tc, B.inicio, tPr)); K.mirar([K.lerp(1.4, 1.2, k), 1.5, K.lerp(3.4, 2.9, k)], [0.75, 1.2, -0.35]); }
      else K.filmar([telaC, menino], 'chegando', pc(tc, tPr - 0.1, B.ate), { plano: 'medio', lado: -10, altura: 'olho', tam: 2.0 });
      // EFEITOS VISUAIS: a tarja · "Próximo cliente ➜" em "próximo"
      jornal({ titulo: 'LUCAS PASSA BEM', sub: 'e já tem o próximo cliente na lista', tag: 'BOA NOTÍCIA', cor: '#2fb54a' });
      fx.et.proximo.em({ tela: [540, 400] }, tc - tPr);
      // SONS: brilho em "passa" · bip na próxima da lista
      K.som('brilho', tPa, 0.4); K.som('bip', tPr, 0.4); K.som('ding', tLi, 0.3);
    },
    segue(B, tc) {
      // NA TELA: o Lucas de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o
      // robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteLucas, 'site');
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
      comp.tela.desenhar(siteLucas, 'site');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende o plantão: o Lucas largado na cadeira, isolado pela fita, as sirenes girando e a tarja do jornal
      ve(comp, cad, fita); sirenes.forEach((s, i) => { ve(s); s.userData.m3d.em(0.3 + i * 0.4, 1); });
      comp.tela.desenhar(telaEscura, 'esc');
      largado([0.2, 1.2, 4]); menino.reagir('celular', 0.6); menino.humor('triste');
      K.mirar([-0.25, 1.55, 3.4], [-0.45, 0.9, -0.7]);
      celNaMao(caixaVazia, 'vazio', 1.6);
      jornal({ titulo: 'WEB DESIGNER HÁ 3 MESES SEM CLIENTE', sub: 'Plantão urgente · o caso Lucas', tag: 'URGENTE' });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [vizinha, mecanico].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    menino.g.visible = true; menino.g.rotation.x = 0; menino.g.position.y = 0;
    tudo.forEach((g) => { g.visible = false; });
    encarar.length = 0; tarja = null;
    cad.position.set(...CAD_LADO); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    placaSemSite.position.set(-3.45, 3.85, -4.45);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // a cadeira gira junto com o Lucas quando ele está sentado nela (senão o encosto tapa ele)
    if (menino.g.visible && Math.hypot(menino.g.position.x - SEAT[0], menino.g.position.z - SEAT[2]) < 0.05) cad.rotation.y = menino.g.rotation.y;
    // balões e o contrato virados pra câmera, e a tarja na frente da câmera, depois do plano
    encarar.forEach((o) => o.lookAt(K.camera.position));
    porTarja(tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
