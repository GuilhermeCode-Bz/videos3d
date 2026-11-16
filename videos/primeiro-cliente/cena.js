// Seu primeiro cliente tá a duas quadras. Se você não for lá, outro vai (canal Mappoa).
// Quatro cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  let bl, CS, C, menino, florista, vulto, robo, comp, cel, note, capelo, cert, pinoG, poeira, festa, flor, fichaM, telaC, telaM, navG, binoc;
  const tudo = [], fx = {}, longe = [], longeX = [], trilha = [], pinos = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k), K.lerp(a[2], b[2], k)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'cidade', formado: 'home_office', longe: 'cidade_maquete', perto: 'cidade_maquete', floricultura: 'cidade',
    sualista: 'cidade_maquete', lista: 'home_office', mappoa: 'mundo_mappoa', antes_agora: 'cidade_maquete',
    segue: 'home_office', cartao: 'home_office', capa: 'cidade'
  };
  // Home office: o computador do Mateus na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33], M_HO = [0.6, 0, 0.35], CERT = [1.25, 2.25, -0.95];
  // Cidade: o calçadão em y = 0,14; a floricultura a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, FL_X = -24.5, FL_Z = -0.3, PINO_G = [-20.6, G, 3.0], M_GAN = [-18.6, G, 5.2];
  const FLORISTA = [-25.3, G, 3.5], M_CID = [-22.6, G, 4.3], M_CID0 = [-18.8, G, 4.9], FICHA = [-21.0, 2.2, 3.2];
  const VULTO0 = [-12.5, G, 5.6], VULTO1 = [-23.6, G, 3.9];
  // Maquete: o Mateus no quarteirão do meio; a floricultura duas quadras à direita (x 6,8)
  const M_MQ = [0.55, 0.12, 0.75], FLOR_MQ = [6.8, 4.1, 0], CEL_MQ = [-0.5, 2.7, 2.5], GIG = 2.4, CAB = [0, 4.1, 0], MEIO = [0, 2.0, 0];
  const LONGE = [[-2.4, 4.6, -4.2], [0.6, 5.3, -5.0], [3.6, 4.6, -4.2]];
  const LONGE_T = ['Empresa grande', 'Grupo de freela', 'Cliente de fora'];
  const S = 3.4, PY = 3.9;
  const PINOS = [[2, 0], [1, 0], [0, -1], [1, 1], [-1, 1], [-1, -1], [1, -2], [-2, 0], [3, 1], [-3, -2], [2, 3], [-2, 3], [3, -3], [-4, 1]].map(([i, j]) => [i * S, PY, j * S]);
  const ONDA = [0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
  const FLORES = [
    { nome: 'Floricultura Jardim Sol', end: 'Rua das Acácias, 214', chips: ['whats', 'tel'] },
    { nome: 'Flor de Lis Presentes', end: 'Av. São Paulo, 1530', chips: ['tel', 'insta'] },
    { nome: 'Casa das Orquídeas', end: 'Rua Pe. Luiz, 88', chips: ['whats'] },
    { nome: 'Floricultura Primavera', end: 'Av. Itavuvu, 2410', chips: ['whats', 'insta'] }
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
  // O site de exemplo que o Mateus fez no curso
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Seu site aqui', w * 0.06, h * 0.13, w * 0.08, '#fff', 900); txt(c, 'bonito, rápido e no celular', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // O Maps no celular: o pontinho azul "Você" e, a duas quadras, o pino vermelho
  function mapaPerto(c, w, h, pino) {
    c.fillStyle = '#e8eee4'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.05;
    for (let i = 1; i < 5; i++) { c.beginPath(); c.moveTo(0, h * i / 5); c.lineTo(w, h * i / 5); c.stroke(); c.beginPath(); c.moveTo(w * i / 4, 0); c.lineTo(w * i / 4, h); c.stroke(); }
    rr(c, w * 0.04, h * 0.03, w * 0.92, h * 0.07, h * 0.035, '#fff'); txt(c, 'perto de mim', w * 0.09, h * 0.065, w * 0.06, '#5f6368', 700, 'left', w * 0.8);
    const vx = w * 0.25, vy = h * 0.6, px = w * 0.75, py = h * 0.4;
    c.setLineDash([w * 0.03, w * 0.03]); c.strokeStyle = '#1067f8'; c.lineWidth = w * 0.02;
    c.beginPath(); c.moveTo(vx, vy); c.lineTo(px, vy); c.lineTo(px, py); c.stroke(); c.setLineDash([]);
    c.fillStyle = 'rgba(16,103,248,.25)'; c.beginPath(); c.arc(vx, vy, w * 0.09, 0, 7); c.fill();
    c.fillStyle = '#1067f8'; c.beginPath(); c.arc(vx, vy, w * 0.045, 0, 7); c.fill();
    txt(c, 'Você', vx, vy + h * 0.07, w * 0.065, '#1067f8', 900, 'center');
    if (pino) {
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(px, py - w * 0.06, w * 0.07, Math.PI, 0); c.lineTo(px, py + w * 0.04); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - w * 0.06, w * 0.028, 0, 7); c.fill();
      rr(c, w * 0.48, py - h * 0.17, w * 0.48, h * 0.065, h * 0.03, '#fff'); txt(c, '2 quadras', w * 0.72, py - h * 0.137, w * 0.06, '#e8352b', 900, 'center');
    }
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['cidade', 'home_office', 'cidade_maquete', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A ficha da floricultura no Maps: a linha "Site" vazia
    T.fichaFlor = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      const f = w * 0.065;
      rr(c, w * 0.04, h * 0.03, w * 0.92, h * 0.08, h * 0.035, '#f1f3f4'); txt(c, 'floricultura perto de mim', w * 0.09, h * 0.07, f * 0.8, '#202124', 700, 'left', w * 0.8);
      c.fillStyle = '#dcefd6'; c.fillRect(0, h * 0.13, w, h * 0.2);
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w / 2, h * 0.22, w * 0.05, 0, 7); c.fill();
      txt(c, 'Floricultura Jardim Sol', w * 0.06, h * 0.39, f * 1.05, '#202124', 900, 'left', w * 0.88);
      txt(c, '★★★★★  Floricultura', w * 0.06, h * 0.46, f * 0.8, '#f9ab00', 800, 'left', w * 0.88);
      rr(c, w * 0.06, h * 0.52, w * 0.4, h * 0.075, h * 0.035, '#1067f8'); txt(c, 'Ligar', w * 0.26, h * 0.557, f * 0.9, '#fff', 800, 'center');
      txt(c, 'Site:', w * 0.06, h * 0.69, f * 1.1, '#5f6368', 800);
      if (e.vazio) { rr(c, w * 0.04, h * 0.74, w * 0.92, h * 0.11, h * 0.03, '#fde8e8'); txt(c, '— não tem', w * 0.08, h * 0.795, f * 1.2, '#c0262d', 900); }
      else txt(c, 'carregando...', w * 0.06, h * 0.79, f * 0.9, '#9aa0a6', 700);
    };
    // A lista das floriculturas de Sorocaba, no grupo SEM SITE, sem os totais da captura
    T.listaFlores = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: FLORES, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Floriculturas · Sorocaba, SP', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      if (e.pilula) { rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center'); }
    };
    // A análise da Floricultura Jardim Sol: a aderência com o score, as dores e as oportunidades
    T.analiseFlor = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Floricultura Jardim Sol', ate: e.ate, aderencia: 0.87 * k,
        dores: ['Sem site próprio', 'Pedido só por telefone'], oportunidades: ['Site com catálogo e pedido pelo WhatsApp'],
        objecoes: ['"Meus clientes já me conhecem"'], abordagem: 'Mostre quem procura flores no Google e acha outra loja.'
      });
      if (e.ate >= 0) { txt(c, Math.round(87 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right'); }
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Mateus (do canal), a florista, o outro web designer (vulto cinza) e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    florista = K.boneco({ tipo: 'menina', roupa: 'camiseta', cores: { camiseta: 0x3f9a4a, bermuda: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x5a2e12, pele: 0xd9a070 } });
    K.semNome(florista.g); K.nomear('florista', florista.g);
    vulto = K.boneco({ roupa: 'moletom', cores: { moletom: 0x8a929c, punho: 0x6b7280, calca: 0x4b5563, mochila: 0x6b7280, tenis: 0x374151, cabelo: 0x374151, pele: 0x9ca3af } });
    K.semNome(vulto.g); K.nomear('vulto', vulto.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Cidade: a fachada da Floricultura Jardim Sol, com a placa e os vasos de flor na calçada
    flor = new THREE.Group(); flor.position.set(FL_X, G, FL_Z); K.scene.add(flor);
    K.modelo('kenney-cidade/building-small-c', { escala: 5, pos: [0, 0, 0], pai: flor });
    const placa = K.placa('Jardim Sol Flores', { larg: 2.8, alt: 0.7, fundo: '#ecfbe9', cor: '#2f8a3a', borda: '#2f8a3a' }); K.scene.remove(placa); placa.position.set(0, 3.15, 2.62); flor.add(placa);
    const CORES_FLOR = [0xff5a8a, 0xffd23f, 0xb57cff, 0xff7a1a];
    [-1.6, -0.55, 0.55, 1.6].forEach((x, i) => {
      const v = K.m3d('planta', { vaso: 0xe8a15a }); K.scene.remove(v); v.position.set(x, 0, 3.0); v.scale.setScalar(0.75); flor.add(v);
      for (let k = 0; k < 4; k++) K.peca({ forma: 'esfera', tam: [0.09], cor: CORES_FLOR[(i + k) % 4], pos: [x + Math.sin(k * 1.7) * 0.18, 1.0 + (k % 2) * 0.08, 3.0 + Math.cos(k * 1.7) * 0.18] }, flor);
    });
    guarda(flor, 'floricultura');
    // O pino gigante do mapa e a poeira da batida
    pinoG = K.m3d('pino', { cor: '#e8352b', tam: 6 }); guarda(pinoG, 'pinogigante', PINO_G);
    poeira = K.poeira(7, 0xd8ccb4, 30);
    // A ficha do Maps da floricultura
    fichaM = K.painelMappoa(1.3, 1.7, { px: 600, borda: '#dadce0' }); guarda(fichaM, 'fichamaps', FICHA);

    // Home office: o computador, o notebook, o certificado, o capelo e a barra do endereço
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    note = K.m3d('notebook'); guarda(note, 'notebook', mais(M_GAN, [0.3, 1.0, 0.4]), 0.8);
    cert = K.placa('Certificado\nWeb Design ✓', { larg: 0.95, alt: 0.65, fundo: '#fffaf0', cor: '#1d4ed8', borda: '#1d4ed8' }); guarda(cert, 'certificado', CERT);
    capelo = new THREE.Group(); K.scene.add(capelo);
    K.peca({ forma: 'caixa', tam: [0.46, 0.04, 0.46], cor: 0x111827, pos: [0, 0.12, 0] }, capelo);
    K.peca({ forma: 'cilindro', tam: [0.16, 0.12], cor: 0x111827, pos: [0, 0.05, 0] }, capelo);
    K.peca({ forma: 'esfera', tam: [0.045], cor: 0xffc531, pos: [0.2, 0.05, 0.2] }, capelo);
    guarda(capelo, 'capelo');
    festa = K.festa(mais(M_HO, [0, 1.6, 0]), 5);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Maquete: o binóculo, os balões lá longe (com e sem ✗), o celular com o Maps, a trilha e os pinos das empresas sem site
    binoc = K.m3d('binoculos'); guarda(binoc, 'binoculos', mais(M_MQ, [0, 3.1, -0.6]), 2.1);
    LONGE.forEach((p, i) => {
      longe.push(guarda(K.placa(LONGE_T[i], { larg: 3.0, alt: 0.85, fundo: '#ffffff', cor: '#0f172a', borda: '#1067f8' }), 'longe', p));
      longeX.push(guarda(K.placa('✗ ' + LONGE_T[i], { larg: 3.0, alt: 0.85, fundo: '#fde8e8', cor: '#c0262d', borda: '#e8352b' }), 'longe', p));
    });
    cel = K.celular(); guarda(cel, 'celular', CEL_MQ, 3);
    const branco = K.mat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.4 });
    const CAMINHO = [[M_MQ[0], M_MQ[2]], [1.7, 1.7], [6.8, 1.7], [6.8, 1.35]];
    for (let s = 0; s < CAMINHO.length - 1; s++) {
      const [a, b] = [CAMINHO[s], CAMINHO[s + 1]], n = Math.max(2, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.35));
      for (let k = 0; k < n; k++) { const m = K.malha(new THREE.SphereGeometry(0.08, 12, 10), branco); K.scene.add(m); trilha.push(guarda(m, 'trilha', [K.lerp(a[0], b[0], k / n), 0.2, K.lerp(a[1], b[1], k / n)])); }
    }
    fx.pinoMq = guarda(K.m3d('pino', { cor: '#e8352b', tam: 1.1 }), 'pino_mq', FLOR_MQ);
    PINOS.forEach((p) => pinos.push(guarda(K.m3d('pino', { cor: '#e8352b', tam: 0.9 }), 'pinos', p)));

    // As telas do Mappoa: a lista (sobe do computador) e a análise (no palco e na mão dele, na rua)
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [-0.45, 1.75, 0.15]);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      quadras: e('2 quadras', 'laranja'), outro: e('Outro chegou antes', 'vermelho'), design: e('Web design ✓', 'azul'), cliente1: e('1º cliente?', 'laranja'),
      nada: e('Nada', 'vermelho'), quadras2: e('2 quadras', 'laranja'), maps: e('No Maps', 'azul'), semSite: e('Sem site', 'vermelho'),
      rua: e('Sua rua', 'azul'), bairro: e('Seu bairro', 'azul'), cidade: e('Sua cidade', 'azul'), lista: e('Sua lista', 'verde'),
      semSite2: e('Sem site', 'laranja'), naCidade: e('Na sua cidade', 'verde'), longeDemais: e('Longe demais', 'vermelho'), quadras3: e('A 2 quadras', 'verde')
    };
    fx.errado = K.marca('errado');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Onde você procurou o seu primeiro cliente? <em>Comenta aí</em>');
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  // O binóculo nos olhos: os dois braços erguidos e o binóculo entre as mãos
  function binoculo(op = {}) {
    menino.pose({ x: -1.75, z: -0.25, c: -1.6 }, { x: -1.75, z: -0.25, c: -1.6 });
    const a = menino.mao(0), b = menino.mao(1);
    binoc.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 0.06, (a[2] + b[2]) / 2); binoc.rotation.set(0, menino.g.rotation.y, 0);
    if (op.baixo) binoc.position.y -= 0.0;
  }
  // A queda do pino gigante: chega no chão em tB
  function pinoCaindo(tc, tB, t0) {
    const q = K.clamp((tc - t0) / Math.max(0.2, tB - t0));
    const y = G + (1 - q * q) * 5;
    const dt = tc - tB, bal = dt > 0 ? Math.sin(dt * 9) * Math.exp(-dt * 3) * 0.18 : 0;
    pinoG.position.set(PINO_G[0], dt > 0 ? G - 0.25 * K.clamp(dt / 0.15) : y, PINO_G[2]); pinoG.rotation.set(0, 0, bal);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o pino gigante caindo no centro; a floricultura à esquerda; a florista na porta; o Mateus à direita com o notebook · MOSTRA: pinogigante, floricultura, personagem
      // CENÁRIO: a cidade de dia; os carros e o ônibus passando (o cenário cuida)
      const tB = Math.min(quando('cliente', B, 0.2), B.inicio + 0.75), tQ = quando('quadras', B, 0.4), tO = quando('outro', B, 0.85);
      ve(flor, pinoG);
      // ENTRA AGORA: o pino já caindo no 1º quadro; crava no asfalto em "cliente"; a poeira sobe na batida
      pinoCaindo(tc, tB, B.inicio - 0.25);
      poeira.em(PINO_G, tc - tB, 2.6, 1.6);
      // PERSONAGEM: começo susto olhando pra cima · em "cliente": cai sentado, o notebook voando · em "outro": surpreso, olhando o vulto
      menino.colocar(M_GAN, tc > tO ? VULTO1 : PINO_G);
      if (tc > tO) menino.reagir('surpreso', tc - tO); else if (tc > tB) { menino.reagir('susto', tc - tB); menino.humor('assustado'); menino.suar(tc - tB); }
      else menino.reagir('susto', B.t);
      ve(note);
      if (tc < tB) { const m = menino.mao(1); note.position.set(m[0], m[1] + 0.05, m[2] + 0.1); note.rotation.set(-0.4, 0, 0); }
      else { const q = K.clamp((tc - tB) / 0.7); note.position.set(M_GAN[0] + 0.9 * q, G + 0.05 + Math.sin(q * Math.PI) * 1.2 + (1 - q) * 0.9, M_GAN[2] + 0.5 * q); note.rotation.set(-0.4 + q * 5, q * 2, 0); }
      // o outro web designer passa correndo pra floricultura em "outro"
      if (tc > tO - 0.2) { const p = vulto.irPara(VULTO0, VULTO1, K.clamp((tc - tO + 0.2) / 1.0), tc, { correr: true, olhar: FLORISTA }); void p; }
      // a florista na porta, olhando o pino
      florista.colocar(FLORISTA, tc > tO ? VULTO1 : PINO_G); florista.reagir(tc > tB ? 'surpreso' : 'segurando', tc > tB ? tc - tB : B.t);
      // EFEITOS VISUAIS: "2 quadras" em "quadras" · "Outro chegou antes" em "outro"
      if (tc < tO) fx.et.quadras.em(mais(PINO_G, [2.0, 1.6, 1.2]), tc - tQ); else fx.et.outro.em(mais(VULTO1, [0.5, 2.3, 0.6]), tc - tO);
      K.som('whoosh', B.inicio, 0.6); K.som('estrondo', tB, 0.9); K.som('baque', tB + 0.3, 0.5); K.som('buzina', tB + 0.45, 0.4); K.som('passo', tO, 0.4);
      // CÂMERA: mergulho · médio · frente · baixo, topo livre; tranco na batida
      K.filmar([mais(PINO_G, [0, 6.2, 0]), mais(PINO_G, [0, 0.2, 0]), mais([FL_X, G, FL_Z], [0.6, 3.2, 2.6]), mais(M_GAN, [0, 1.0, 0])], 'chegando', B.p, { plano: 'medio', lado: 0, altura: 'baixo', espacoCima: 0.3, tam: 1.0 });
      K.tremer(tc - tB, 1.8);
    },
    formado(B, tc) {
      // NA TELA: o Mateus na frente da mesa com o capelo; o certificado atrás; o site de exemplo no monitor · MOSTRA: personagem, certificado, monitor
      // CENÁRIO: home office de dia; o ring light e a janela clara (o cenário cuida)
      const tC = quando('curso', B, 0.2), tD = quando('design', B, 0.4), tDo = quando('doido', B, 0.6), tS = quando('site', B, 0.9);
      ve(comp, cert, capelo);
      comp.tela.desenhar((c, w, h) => (tc > tS ? siteDemo(c, w, h) : (c.fillStyle = '#1b2430', c.fillRect(0, 0, w, h))), tc > tS ? 'demo' : 'preto');
      // ENTRA AGORA: o certificado cai na parede em "curso"
      cert.scale.setScalar(pop(tc - tC)); cert.position.set(CERT[0], CERT[1] + (1 - K.clamp((tc - tC) / 0.3)) * 0.6, CERT[2]);
      // PERSONAGEM: começo vitória · em "doido": pula animado e aponta o monitor
      menino.colocar(M_HO, tc > tDo ? MONITOR : [0.6, 1.4, 5]);
      let alt = 0;
      if (tc > tDo + 0.55) menino.apontar(0.4);
      else if (tc > tDo) alt = menino.pular(K.clamp((tc - tDo) / 0.55), 0.45);
      else menino.reagir('vitoria', B.t);
      menino.g.position.y = alt;
      // OBJETOS SE MEXENDO: o capelo vai pro alto em "design", gira duas voltas e volta pra mão dele
      const m = menino.mao(1), q = K.clamp((tc - tD) / 0.8);
      capelo.position.set(m[0], m[1] + 0.08 + Math.sin(q * Math.PI) * 1.3, m[2]); capelo.rotation.set(q * 0.6, q * Math.PI * 4, 0);
      festa.em(tc - tDo);
      // EFEITOS VISUAIS: "Web design ✓" em "design" · "1º cliente?" em "site"
      if (tc < tS) fx.et.design.em(mais(M_HO, [0, 2.15, 0]), tc - tD); else fx.et.cliente1.em(mais(MONITOR, [0, 0.95, 0.3]), tc - tS);
      K.som('trava', tC + 0.25, 0.5); K.som('whoosh', tD, 0.5); K.som('ding', tS, 0.5);
      // CÂMERA: passando · médio · esquerda · olho
      K.filmar([mais(M_HO, [0, 1.0, 0]), CERT, MONITOR], 'passando', B.p, { plano: 'perto', lado: -14, altura: 'olho', tam: 1.1, obstaculos: false });
    },
    longe(B, tc) {
      // NA TELA: a maquete; o Mateus com o binóculo, olhando o horizonte; lá no fundo, os 3 balões · MOSTRA: personagem, binoculos, longe
      // CENÁRIO: os carrinhos andando nas ruas (o cenário cuida)
      const tP = quando('procura', B, 0.12), tw = [quando('grande', B, 0.35), quando('freela', B, 0.55), quando('fora', B, 0.75)], tN = quando('nada', B, 0.92);
      ve(binoc);
      // ENTRA AGORA: os balões surgem um a um; cada um ganha o ✗ logo depois; em "nada" murcham e caem
      LONGE.forEach((p, i) => {
        if (tc < tw[i]) return;
        const x = tc > tw[i] + 0.35, cai = K.clamp((tc - tN) / 0.5);
        const o = x ? longeX[i] : longe[i]; ve(o);
        o.scale.setScalar(pop(tc - tw[i]) * (1 - cai * 0.6)); o.position.set(p[0], p[1] - cai * cai * 3, p[2]);
        K.som('errado', tw[i] + 0.35, 0.35);
      });
      // PERSONAGEM: começo segurando o binóculo nos olhos · em "nada": triste, abaixa o binóculo
      menino.colocar(M_MQ, [0.4, 4, -6]);
      if (tc > tN) { menino.reagir('triste', tc - tN); const m = menino.mao(1); binoc.position.set(m[0], m[1], m[2]); }
      else if (tc > tP) binoculo(); else { menino.reagir('segurando', B.t); const m = menino.mao(1); binoc.position.set(m[0], m[1] + 0.05, m[2]); }
      fx.et.nada.em(mais(M_MQ, CAB), tc - tN);
      K.som('clique', tP, 0.4); K.som('desliga', tN, 0.5);
      // CÂMERA: subindo · aberto · direita · alto
      K.filmar([mais(M_MQ, MEIO), mais(M_MQ, CAB), ...LONGE], 'subindo', B.p, { plano: 'perto', lado: 35, altura: 'alto', tam: 0.85 });
    },
    perto(B, tc) {
      // NA TELA: a maquete; o celular grande com o Maps; a trilha pontilhada até o pino a duas quadras · MOSTRA: celular, trilha, personagem
      const tV = quando('vê', B, 0.25), tP = quando('perto', B, 0.6), tM = quando('Maps', B, 0.9);
      ve(cel);
      // ENTRA AGORA: o celular cresce na frente dele em "vê"; o pino pula no Maps e na maquete em "perto"
      cel.g.scale.setScalar(2.4 * pop(tc - tV)); cel.g.position.set(...CEL_MQ); cel.g.rotation.set(-0.15, 0.2, 0);
      cel.tela.desenhar((c, w, h) => mapaPerto(c, w, h, tc > tP), tc > tP ? 'mapaP' : 'mapa');
      if (tc > tP) { ve(fx.pinoMq); const d = tc - tP; fx.pinoMq.position.set(FLOR_MQ[0], FLOR_MQ[1] + Math.abs(Math.sin(d * 7)) * Math.exp(-d * 2) * 0.8, FLOR_MQ[2]); fx.pinoMq.scale.setScalar(pop(d)); }
      // OBJETOS SE MEXENDO: as bolinhas da trilha acendem uma a uma, da casa dele até o pino
      const nT = Math.floor(K.clamp((tc - tP) / Math.max(0.4, tM - tP)) * trilha.length);
      trilha.forEach((b, i) => { if (i < nT) { ve(b); b.scale.setScalar(pop(tc - tP - i * 0.02)); } });
      // PERSONAGEM: começo dúvida olhando o celular · em "perto": surpreso e aponta o pino
      menino.colocar(M_MQ, tc > tP ? FLOR_MQ : CEL_MQ);
      if (tc > tP + 0.4) menino.apontar(0.2); else if (tc > tP) menino.reagir('surpreso', tc - tP); else menino.reagir('duvida', B.t);
      // EFEITOS VISUAIS: "2 quadras" em "perto" · "No Maps" em "Maps"
      if (tc < tM) fx.et.quadras2.em([4.2, 1.4, 1.7], tc - tP); else fx.et.maps.em(mais(CEL_MQ, [0, 1.75, 0]), tc - tM);
      K.som('bip', tV, 0.5); K.som('estalo', tP, 0.5); K.som('ding', tM, 0.5);
      // CÂMERA: mergulho · médio · esquerda · cima
      K.filmar([CEL_MQ, mais(M_MQ, MEIO), mais(M_MQ, CAB), [3.6, 0.2, 1.7]], 'mergulho', B.p, { plano: 'perto', lado: -25, altura: 'alto', tam: 1.0 });
    },
    floricultura(B, tc) {
      // NA TELA: a floricultura à esquerda; a florista na porta; a ficha do Maps no ar; o Mateus chegando · MOSTRA: floricultura, fichamaps, personagem
      // CENÁRIO: a cidade de dia; os carros passando (o cenário cuida)
      const tQ = quando('quadras', B, 0.1), tF = quando('floricultura', B, 0.45), tN = quando('não', B, 0.7), tNe = quando('nenhum', B, 0.9);
      ve(flor);
      // ENTRA AGORA: a ficha desliza de cima em "floricultura"; "Site: —" pisca em vermelho em "não"
      if (tc > tF) {
        ve(fichaM); const q = K.suave(K.clamp((tc - tF) / 0.4));
        fichaM.g.position.set(FICHA[0], FICHA[1] + (1 - q) * 2, FICHA[2]); fichaM.g.rotation.set(0, 0.25, Math.sin(tc * 2) * 0.02);
        fichaM.mostrar('fichaFlor', { vazio: tc > tN && (tc - tN > 0.6 || Math.floor((tc - tN) * 8) % 2 === 0) });
      }
      // PERSONAGEM: começo andando, olhando a placa · em "não": aponta a ficha
      const p = menino.irPara(M_CID0, M_CID, K.clamp((tc - tQ) / 1.1), tc, { olhar: FICHA });
      if (tc > tN) menino.apontar(0.6);
      // a florista acena com a mão
      florista.colocar(FLORISTA, p); if (tc > tN) florista.acenar(tc); else florista.reagir('mostrando', B.t);
      for (let k = 0; k < 4; k++) K.som('passo', tQ + k * 0.28, 0.25);
      K.som('errado', tN, 0.5);
      // CÂMERA: chegando · médio · direita · olho
      K.filmar([mais([FL_X, G, FL_Z], [0.4, 3.1, 2.6]), FICHA, mais(M_CID, [0, 1.0, 0]), mais(FLORISTA, [0, 0.9, 0])], 'chegando', B.p, { plano: 'perto', lado: 20, altura: 'olho', tam: 1.0 });
      // EFEITOS VISUAIS: ✗ "Sem site" em "não"
      fx.et.semSite.em(mais(FICHA, [0, 1.25, 0.2]), tc - tN);
      const [x, y] = K.tela(mais(FICHA, [0.3, -0.25, 0.1]));
      fx.errado.em({ tela: [x, y] }, tc - tNe);
    },
    sualista(B, tc) {
      // NA TELA: a maquete de cima; o Mateus no meio; os pinos brotando em onda: rua, bairro, cidade; no fim, a fila em cima dele · MOSTRA: pinos, personagem
      const tR = quando('rua', B, 0.3), tB = quando('bairro', B, 0.45), tC = quando('cidade', B, 0.6), tL = quando('lista', B, 0.92);
      const tOnda = [tR, tB, tC];
      // OBJETOS SE MEXENDO: cada pino brota do telhado na sua onda; em "lista", todos voam pra fila em cima dele
      pinos.forEach((p, i) => {
        const t0 = tOnda[ONDA[i]] + (i % 6) * 0.06; if (tc < t0) return; ve(p);
        const fila = [M_MQ[0] + (i - 6.5) * 0.4, 4.9, M_MQ[2]];
        const q = K.suave(K.clamp((tc - tL - i * 0.03) / 0.5));
        p.position.set(...lerp3(PINOS[i], fila, q)); p.position.y += Math.sin(q * Math.PI) * 1.2;
        p.scale.setScalar(pop(tc - t0) * K.lerp(1, 0.4, q));
        if (i % 2 === 0) K.som('estalo', t0, 0.25);
      });
      tOnda.forEach((t) => K.som('whoosh', t, 0.35));
      // PERSONAGEM: começo surpreso, girando pra olhar os pinos · em "lista": ideia e ergue os braços
      const qi = Math.max(0, Math.min(13, Math.floor((tc - tR) / 0.15)));
      menino.colocar(M_MQ, tc > tL ? [0.6, 1.4, 6] : PINOS[qi]);
      if (tc > tL + 0.35) menino.reagir('erguendo', tc - tL - 0.35); else if (tc > tL) menino.reagir('ideia', tc - tL); else menino.reagir('surpreso', B.t);
      // EFEITOS VISUAIS: "Sua rua", "Seu bairro", "Sua cidade" · "Sua lista"
      const topo = mais(M_MQ, CAB);
      if (tc < tB) fx.et.rua.em(topo, tc - tR); else if (tc < tC) fx.et.bairro.em(topo, tc - tB); else if (tc < tL) fx.et.cidade.em(topo, tc - tC); else fx.et.lista.em(mais(M_MQ, [0, 6.0, 0]), tc - tL);
      K.som('certo', tL, 0.6);
      // CÂMERA: afastando · aberto · frente · alto
      K.filmar([mais(M_MQ, MEIO), mais(M_MQ, CAB), PINOS[1], PINOS[2], PINOS[3]], 'afastando', B.p, { plano: 'perto', lado: 'frente', altura: 'alto', tam: 0.85 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a lista do Mappoa sobe do computador; o Mateus à direita · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.1), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tF = quando('floriculturas', B, 0.65), tS = quando('sem', B, 0.88);
      ve(comp, navG); comp.tela.desenhar((c, w, h) => siteDemo(c, w, h), 'demo');
      // ENTRA AGORA: a barra em "digita" e as letras até "computador"; a lista sobe do monitor em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(-0.45, K.lerp(0.9, 1.6, q), K.lerp(-1.0, 0.15, q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tF ? 1 + Math.floor((tc - tF) / 0.25) : 0;
        telaC.mostrar('listaFlores', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1, pilula: tc > tS });
        for (let k = 0; k < 4; k++) K.som('bip', tF + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo segurando (teclando) · em "lista": surpreso e aponta a floricultura na tela
      menino.colocar([1.2, 0, 0.75], tc > tL ? [-0.45, 1.6, 0.15] : MONITOR);
      if (tc > tL + 0.5) menino.apontar(0.6); else if (tc > tL) menino.reagir('surpreso', tc - tL); else menino.reagir('segurando', B.t);
      fx.et.semSite2.em([0.75, 3.05, 0.3], tc - tS);
      // CÂMERA: subindo · médio · frente · olho
      K.filmar([navG, [-0.45, 1.6, 0.15], [-0.45, 0.5, 0.15], menino], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Floricultura Jardim Sol; o robô à esquerda; o Mateus à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tCi = quando('cidade', B, 0.55), tPr = quando('precisa', B, 0.7), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: o score enche de "precisa" a "serviço"; as dores e oportunidades em "serviço"
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseFlor', { ate: tc > tSv ? 2 : 0, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "serviço": vitória
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('vitoria', tc - tSv); else menino.reagir('chamando', B.t);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.naCidade.em([-0.35, 3.2, 0.3], tc - tCi);
      K.som('brilho', tM, 0.6);
      // CÂMERA: chegando · médio · frente · baixo
      K.filmar([telaM, robo, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) "Antes": a maquete, o binóculo virado pros balões com ✗; (2) "Agora": a rua, o Mateus mostrando a análise pra florista · MOSTRA: personagem, floricultura, florista
      const tMu = quando('mundo', B, 0.2), tG = quando('Agora', B, 0.45), tCo = quando('começa', B, 0.65), tR = quando('rua', B, 0.9);
      if (tc < tG) {
        ve(binoc); LONGE.forEach((p, i) => { ve(longeX[i]); longeX[i].position.set(...p); longeX[i].scale.setScalar(1); });
        menino.colocar(M_MQ, [0.4, 4, -6]); binoculo(); menino.humor('cansado');
        fx.et.longeDemais.em(mais(M_MQ, CAB), tc - tMu);
        K.som('errado', tMu, 0.5);
        K.filmar([mais(M_MQ, MEIO), mais(M_MQ, CAB), ...LONGE], 'descendo', K.clamp((tc - B.inicio) / Math.max(0.4, tG - B.inicio)), { plano: 'perto', lado: 40, altura: 'alto', tam: 0.85 });
      } else {
        ve(flor);
        // o Mateus anda até a porta e mostra a análise na tela pra florista
        const de = mais(M_CID0, [-0.8, 0, 0]), ate = [-23.6, G, 4.4];
        const p = menino.irPara(de, ate, K.clamp((tc - tG) / 0.9), tc, { olhar: FLORISTA });
        if (tc > tCo) {
          ve(telaM); const m = menino.mao(1); telaM.g.position.set(m[0] - 0.15, m[1] + 0.55, m[2] + 0.25); telaM.g.rotation.set(0, -0.5, 0); telaM.g.scale.setScalar(0.42 * pop(tc - tCo));
          telaM.mostrar('analiseFlor', { ate: 2, score: 1 });
          menino.reagir('mostrando', tc - tCo);
        }
        florista.colocar(FLORISTA, p);
        if (tc > tR) florista.reagir('vitoria', tc - tR); else florista.reagir('surpreso', tc - tG);
        fx.et.quadras3.em(mais(ate, [0.3, 2.4, 0.3]), tc - tR);
        K.som('whoosh', tG, 0.5); K.som('passo', tG + 0.2, 0.3); K.som('passo', tG + 0.5, 0.3); K.som('certo', tR, 0.6);
        K.filmar([mais(ate, [0, 1.0, 0]), mais(FLORISTA, [0, 1.0, 0]), mais([FL_X, G, FL_Z], [0.4, 3.1, 2.6])], 'passando', K.clamp((tc - tG) / (B.ate - tG)), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.1 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Mateus no computador; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Onde', B, 0.02), tSg = quando('segue', B, 0.35), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => siteDemo(c, w, h), 'demo');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], tc > tDi ? [-0.45, 1.6, -1.25] : [0.5, 1.4, 5]);
      if (tc > tDi) menino.reagir('segurando', tc - tDi); else menino.reagir('chamando', B.t);
      K.filmar([navG, comp, menino], 'parado', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar((c, w, h) => siteDemo(c, w, h), 'demo');
      robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], [0.5, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(flor, pinoG, note); pinoG.position.set(PINO_G[0], G - 0.25, PINO_G[2]); pinoG.rotation.set(0, 0, 0.05);
      poeira.em(PINO_G, 0.35, 2.6, 1.6);
      menino.colocar(mais(M_GAN, [-0.6, 0, 0.6]), [0.6, 1.4, 8]); menino.cair(0.75); menino.humor('assustado'); menino.suar(1);
      note.position.set(M_GAN[0] + 0.2, G + 1.5, M_GAN[2] + 1.0); note.rotation.set(0.6, 0.8, 0.3);
      florista.colocar(FLORISTA, PINO_G); florista.reagir('surpreso', 0.5);
      K.filmar([mais(PINO_G, [0, 6.1, 0]), mais(PINO_G, [0, 0.2, 0]), mais(M_GAN, [-0.6, 0.8, 0.6])], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'baixo', espacoCima: 0.22, tam: 1.3, obstaculos: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const agora = B.plano === 'antes_agora' && tc >= quando('Agora', B, 0.45);
    C = CS.usar(agora ? 'cidade' : LUGAR[B.plano] || 'home_office');
    [menino, florista, vulto].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0; menino.g.scale.setScalar(LUGAR[B.plano] === 'cidade_maquete' && !agora ? GIG : 1);
    pinoG.position.set(...PINO_G); pinoG.rotation.set(0, 0, 0);
    cel.g.scale.setScalar(2.4); cel.g.position.set(...CEL_MQ); cel.g.rotation.set(0, 0, 0);
    telaC.g.scale.setScalar(1); telaC.g.position.set(-0.45, 1.6, 0.15); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
