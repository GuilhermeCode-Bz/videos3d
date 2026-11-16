// O site feito no fim de semana (canal Mappoa).
// Quatro lugares (K.cenarios): o calçadão entre prédios com a PADARIA (o telão com o site do seu Zé colado com fita
// crepe), o quarto do Caio (de dia e de noite), a padaria por dentro (a cafeteria) e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, cliente, ze, robo, comp, cel, celP, desp, cadeira, plan, caneca, telao, siteP, telaC, telaM, telaR, navG, FOV0;
  const tudo = [], fx = {}, pecas = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Caio no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], PLAN = [1.5, 0, -0.9], DESP = [-0.08, 0.76, -1.2], CELP = [-1.6, 0, -0.1];
  // Calçadão: DZ = logo depois de uma árvore da direita, perto da PADARIA; o telão no meio, o seu Zé na frente
  let DZ = -5, TEL = [-0.35, 2.45, -6.2], ZE_R = [0.55, 0, -4.9], CEL_R = [-0.4, 0, -3.6], CLI_R = [0.75, 0, -2.8];
  const TW = 3.6, TH = 2.5;
  // Padaria por dentro (cafeteria): o seu Zé na ponta do balcão, do lado de fora; o site num painel do lado dele
  const ZE_C = [1.95, 0, -2.1], SITE_C = [0.45, 1.75, -1.35], CAIO_C = [1.05, 0, -0.85];

  const LUGAR = {
    gancho: 'rua', caio: 'quarto', site: 'padaria', cliente: 'rua', procura: 'quarto_noite', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', mostra: 'padaria', antes_agora: 'quarto_noite', segue: 'quarto', cartao: 'quarto', capa: 'rua'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'quarto_noite' : 'padaria';
    return LUGAR[B.plano] || 'quarto';
  }

  const PADARIAS = [
    { nome: 'Padaria do Zé', end: 'Rua da Aurora, 512 · Recife', chips: ['tel', 'site'] },
    { nome: 'Pão Quente Boa Viagem', end: 'Av. Conselheiro Aguiar, 2280', chips: ['whats', 'site'] },
    { nome: 'Panificadora Casa Forte', end: 'Rua Dom Bosco, 140', chips: ['tel', 'site', 'insta'] },
    { nome: 'Padaria Estrela do Recife', end: 'Rua do Hospício, 77', chips: ['whats', 'site'] }
  ];
  const FRACO = ['telefone errado', 'site parado', 'sem cardápio', 'feito em casa'];

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (!g.parent) K.scene.add(g);
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max, fonte = 'Montserrat, sans-serif') => { c.font = `${peso} ${tam}px ${fonte}`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  const COMIC = '"Comic Sans MS", "Comic Neue", cursive';

  // ---------- O site do seu Zé (feito no fim de semana) ----------
  // As 4 partes, cada uma desenhada no seu tamanho (larg x alt em metros) e o lugar dela no telão (x, y, giro)
  const PARTES = [
    { nome: 'titulo', tam: [3.1, 0.55], pos: [0, 0.85], giro: -0.03, desenho: (c, w, h) => {
      const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#ff3fd2'); d.addColorStop(1, '#7a2cff'); c.fillStyle = d; c.fillRect(0, 0, w, h);
      txt(c, 'PADARIA DO ZÉ', w / 2, h / 2 + 4, h * 0.62, '#ffe600', 900, 'center', w * 0.94, COMIC);
    } },
    { nome: 'foto', tam: [1.35, 1.0], pos: [-0.85, -0.18], giro: 0.14, desenho: (c, w, h) => {
      c.fillStyle = '#9fd4ff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(w * 0.5, h * 0.66, w * 0.4, h * 0.15, 0, 0, 7); c.fill();
      c.fillStyle = '#c8873e'; c.beginPath(); c.ellipse(w * 0.5, h * 0.52, w * 0.33, h * 0.22, -0.1, 0, 7); c.fill();
      c.strokeStyle = '#8a5520'; c.lineWidth = w * 0.02; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(w * (0.36 + i * 0.12), h * 0.4); c.lineTo(w * (0.42 + i * 0.12), h * 0.62); c.stroke(); }
      txt(c, 'NOSSO CARDÁPIO', w * 0.08, h * 0.13, h * 0.11, '#e8352b', 900, 'left', w * 0.9, COMIC);
    } },
    { nome: 'fone', tam: [1.45, 0.42], pos: [0.8, 0.14], giro: 0.04, desenho: (c, w, h) => {
      rr(c, 0, 0, w, h, h * 0.3, '#e8352b');
      txt(c, 'LIGUE: (81) 9999-000', w / 2, h / 2 + 2, h * 0.36, '#ffffff', 900, 'center', w * 0.92, COMIC);
    } },
    { nome: 'breve', tam: [1.45, 0.45], pos: [0.8, -0.55], giro: -0.06, desenho: (c, w, h) => {
      c.fillStyle = '#00c853'; c.fillRect(0, 0, w, h);
      txt(c, 'Cardápio em breve!!!', w / 2, h / 2 + 2, h * 0.34, '#fffb00', 900, 'center', w * 0.92, COMIC);
    } }
  ];
  // Onde cada parte cai no chão, em volta do seu Zé (dx, dz a partir do ZE_R) e quanto gira
  const POUSO = [[-1.25, 0.35, 0.5], [-0.35, 0.75, -0.9], [0.75, -0.25, 0.7], [-0.4, -0.35, -0.4]];

  // O fundo do telão: amarelo, as marcas vazias onde as partes estavam e o rodapé
  function telaoFundo(c, w, h) {
    c.fillStyle = '#fff6b8'; c.fillRect(0, 0, w, h);
    const s = w / TW;
    c.setLineDash([w * 0.012, w * 0.01]); c.strokeStyle = '#c9b37a'; c.lineWidth = w * 0.004;
    PARTES.forEach((p) => { const cx = w / 2 + p.pos[0] * s, cy = h / 2 - p.pos[1] * s; c.strokeRect(cx - (p.tam[0] * s) / 2, cy - (p.tam[1] * s) / 2, p.tam[0] * s, p.tam[1] * s); });
    c.setLineDash([]);
    txt(c, '© feito pelo Zé no domingo', w / 2, h * 0.95, h * 0.04, '#9a8a5a', 700, 'center', w * 0.9, COMIC);
  }
  // Uma parte do site: a placa colorida, as costas e duas fitas crepe nos cantos
  function fazParte(p) {
    const g = new THREE.Group();
    const t = K.telaCanvas(p.tam[0], p.tam[1], Math.round(220 * p.tam[0]));
    t.desenhar(p.desenho, 'x'); t.m.position.z = 0.012; g.add(t.m);
    const costas = K.malha(new THREE.BoxGeometry(p.tam[0], p.tam[1], 0.02), K.mat(0xe8e2d4), true); g.add(costas);
    const fita = K.mat(0xe6d3a3, { roughness: 0.9 });
    [[-1, 1, -0.7], [1, 1, 0.7], [1, -1, -0.7]].slice(0, p.tam[1] > 0.6 ? 3 : 2).forEach(([sx, sy, r]) => {
      const f = K.malha(new THREE.BoxGeometry(0.34, 0.1, 0.006), fita, false);
      f.position.set(sx * (p.tam[0] / 2 - 0.05), sy * (p.tam[1] / 2 - 0.04), 0.022); f.rotation.z = r; g.add(f);
    });
    return g;
  }
  // A parte i no instante tc, soltando em tD: antes treme na fita; depois cai, gira e fica deitada no chão
  function parteEm(i, tc, tD) {
    const p = PARTES[i], g = pecas[i], po = POUSO[i];
    g.visible = true;
    const sx = TEL[0] + p.pos[0], sy = TEL[1] + p.pos[1], sz = TEL[2] + 0.1;
    const dt = tc - tD, G = 13, y0 = sy - 0.04, T = Math.sqrt((2 * y0) / G);
    if (dt < 0) {
      const tr = K.clamp(1 + dt / 1.2);
      g.position.set(sx, sy, sz); g.rotation.set(-0.12 * tr, 0, p.giro + Math.sin(tc * 15 + i * 2) * 0.05 * tr);
      return false;
    }
    const q = K.clamp(dt / T);
    const px = K.lerp(sx, ZE_R[0] + po[0], q), pz = K.lerp(sz, ZE_R[2] + po[1], q);
    const py = dt < T ? sy - 0.5 * G * dt * dt : 0.04;
    g.position.set(px, Math.max(0.04, py), pz);
    g.rotation.set(-PI / 2 * K.suave(q), 0, p.giro + po[2] * q + (q < 1 ? Math.sin(q * PI) * 0.6 : 0));
    return dt >= T ? tD + T : false;
  }
  const quedaT = (i) => Math.sqrt((2 * (TEL[1] + PARTES[i].pos[1] - 0.04)) / 13);

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Caio Sites', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que vendem', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A busca no monitor de madrugada: uma barra e resultados genéricos, um por um
  function buscaNoite(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.08, h * 0.08, w * 0.84, h * 0.13, h * 0.065, '#eef1f5');
    txt(c, 'empresa precisando de site', w * 0.14, h * 0.145, w * 0.05, '#333', 700, 'left', w * 0.72);
    for (let i = 0; i < 4; i++) {
      const y = h * (0.3 + i * 0.17), ok = i < (e.n || 0);
      rr(c, w * 0.08, y, w * 0.84, h * 0.13, 8, ok ? '#f7f9fc' : '#fbfbfb');
      if (ok) { txt(c, ['Resultado 1 de 3.000', 'Empresa? Sem contato', 'Já tem site', 'Página não encontrada'][i], w * 0.12, y + h * 0.065, w * 0.045, '#1a4fd6', 700, 'left', w * 0.76); }
    }
  }
  // O monitor carregando o sistema (a caneca de café "entrou")
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }
  function vazio(c, w, h) {
    const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, '#3a6fd8'); d.addColorStop(1, '#4b3a8f'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, '3:12', w / 2, h * 0.14, w * 0.2, '#fff', 300, 'center');
    txt(c, '0', w / 2, h * 0.48, w * 0.42, '#ffffff', 900, 'center');
    txt(c, 'clientes', w / 2, h * 0.62, w * 0.09, '#ffffff', 800, 'center');
  }
  // A ligação no celular do cliente: "Ligando..." e depois "Número não existe"
  function ligacao(c, w, h, e) {
    c.fillStyle = e.erro ? '#2a0f12' : '#10202f'; c.fillRect(0, 0, w, h);
    txt(c, 'Padaria do Zé', w / 2, h * 0.2, w * 0.08, '#ffffff', 800, 'center', w * 0.9);
    txt(c, '(81) 9999-000', w / 2, h * 0.3, w * 0.07, '#b9c6d6', 700, 'center', w * 0.9);
    if (!e.erro) txt(c, 'Ligando' + '...'.slice(0, 1 + Math.floor((e.t || 0) * 3) % 3), w / 2, h * 0.5, w * 0.08, '#7fe3c5', 800, 'center');
    else { txt(c, 'Número', w / 2, h * 0.48, w * 0.1, '#ff6b5e', 900, 'center'); txt(c, 'não existe', w / 2, h * 0.58, w * 0.1, '#ff6b5e', 900, 'center'); }
    c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w / 2, h * 0.8, w * 0.1, 0, 7); c.fill();
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], ['home_office', { hora: 'noite' }, 'quarto_noite'], ['cafeteria', {}, 'padaria'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    const pad = (Cr.lojas || []).find((l) => l.id === 'padaria');
    if (pad) { DZ = pad.porta[2]; K.nomear('padaria', pad.g); }
    // as árvores da direita ficam a cada 14 m (z = 26 - 14k): a cena fica logo depois de uma, pra nenhuma tampar a câmera
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    TEL = [-0.35, 2.45, DZ - 1.3]; ZE_R = [0.55, 0, DZ]; CEL_R = [-0.35, 0, DZ + 0.4]; CLI_R = [0.75, 0, DZ + 1.3];

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaPadarias = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'COM SITE', itens: PADARIAS, n: e.n, sel: e.sel, total: 212, comSite: 131, semSite: 81 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Padarias · Recife, PE', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) { const y = 248 + i * 140; rr(c, w - 196, y + 12, 160, 28, 14, '#fff4dc'); txt(c, FRACO[i], w - 116, y + 27, 15, '#d97706', 800, 'center', 150); }
    };
    T.analisePadaria = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Padaria do Zé', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Site feito em casa, com cara de modelo pronto', 'O telefone do site não chama'], oportunidades: ['Site novo com cardápio e pedido pelo WhatsApp'],
        objecoes: ['"Eu mesmo fiz o site"'], abordagem: 'Mostre o que o cliente vê quando tenta ligar.'
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
    // O site do seu Zé inteiro (painel na padaria): o telefone vermelho piscando (hl) e a foto entortando (tort)
    T.siteZe = (c, w, h, e) => {
      c.fillStyle = '#fff6b8'; c.fillRect(0, 0, w, h);
      const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#ff3fd2'); d.addColorStop(1, '#7a2cff'); c.fillStyle = d; c.fillRect(0, 0, w, 86);
      txt(c, 'PADARIA DO ZÉ', w / 2, 46, 52, '#ffe600', 900, 'center', w * 0.94, COMIC);
      c.save(); c.translate(150, 230); c.rotate(0.1 + (e.tort || 0) * 0.35);
      c.fillStyle = '#9fd4ff'; c.fillRect(-115, -90, 230, 180);
      c.fillStyle = '#c8873e'; c.beginPath(); c.ellipse(0, 10, 80, 45, -0.1, 0, 7); c.fill();
      txt(c, 'CARDÁPIO', -100, -68, 22, '#e8352b', 900, 'left', 200, COMIC); c.restore();
      const pis = e.hl && Math.sin((e.t || 0) * 12) > -0.2;
      rr(c, 300, 140, 220, 70, 20, pis ? '#ff1a1a' : '#e8352b');
      txt(c, 'LIGUE: (81) 9999-000', 410, 176, 22, '#ffffff', 900, 'center', 205, COMIC);
      if (e.hl) { c.strokeStyle = '#ff1a1a'; c.lineWidth = 6; c.strokeRect(292, 132, 236, 86); }
      c.fillStyle = '#00c853'; c.fillRect(300, 240, 220, 60);
      txt(c, 'Cardápio em breve!!!', 410, 271, 20, '#fffb00', 900, 'center', 205, COMIC);
      txt(c, '© feito pelo Zé no domingo', w / 2, h - 22, 16, '#9a8a5a', 700, 'center', w * 0.9, COMIC);
    };
    // O site novo, feito pelo Caio (no "Agora")
    T.siteNovo = (c, w, h) => {
      c.fillStyle = '#fffaf2'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#7a4a22'; c.fillRect(0, 0, w, 86); txt(c, 'Padaria do Zé', 30, 46, 40, '#fff4dc', 900);
      rr(c, 30, 116, 230, 180, 18, '#e9c79a'); c.fillStyle = '#c8873e'; c.beginPath(); c.ellipse(145, 210, 80, 45, 0, 0, 7); c.fill();
      txt(c, 'Pão quentinho', 290, 140, 26, '#3a2a1e', 800); txt(c, 'todo dia às 6h', 290, 176, 20, '#7a4a22', 700);
      rr(c, 290, 210, 220, 56, 28, '#16a34a'); txt(c, 'Pedir no WhatsApp', 400, 238, 20, '#fff', 800, 'center', 205);
      txt(c, 'Cardápio · Horários · Endereço', w / 2, h - 30, 18, '#7a4a22', 700, 'center');
    };

    // Personagens: o Caio (do canal), o seu Zé (padeiro), o cliente e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    ze = K.personagem('pizzaiolo', { cores: { avental: 0xb5733a } }); K.semNome(ze.g); K.nomear('dono', ze.g);
    cliente = K.boneco({ roupa: 'moletom', cores: { moletom: 0x2fa86a, punho: 0x23824f, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xc98d5e } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O telão: moldura escura, o fundo do site e o pé duplo
    telao = new THREE.Group();
    const mold = K.malha(new THREE.BoxGeometry(TW + 0.2, TH + 0.2, 0.18), K.mat(0x22262e), true); mold.position.z = -0.1; telao.add(mold);
    const fundo = K.telaCanvas(TW, TH, 900); fundo.desenhar(telaoFundo, 'f'); fundo.m.position.z = 0.002; telao.add(fundo.m);
    [-1.4, 1.4].forEach((x) => { const pe = K.malha(new THREE.CylinderGeometry(0.07, 0.09, TEL[1] - TH / 2 + 0.1, 12), K.mat(0x3a3f4a, { metalness: 0.4 })); pe.position.set(x, -(TEL[1] - TH / 2 + 0.1) / 2 - TH / 2 + 0.05, -0.1); telao.add(pe); });
    guarda(telao, 'telao', TEL);
    PARTES.forEach((p) => { const g = fazParte(p); guarda(g, p.nome); pecas.push(g); });

    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante', { tam: 1.7 }); guarda(cel, 'celular', CEL_R);
    celP = K.m3d('celular_gigante'); guarda(celP, 'celular2', CELP);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    plan = K.m3d('planilha_gigante', { linhas: ['Padaria Pão Bom', 'Panificadora Real', 'Padaria Sol', 'Pão & Cia', 'Padaria Avenida', 'Doce Pão', 'Padaria Central', 'Pão Nosso', 'Padaria Estrela'] }); guarda(plan, 'planilha', PLAN);
    caneca = K.m3d('caneca', { cor: 0xffffff }); guarda(caneca, 'caneca', [0, 1, 0], 1.8);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    siteP = K.painelMappoa(1.9, 1.4, { px: 900, borda: '#22262e' }); guarda(siteP, 'site', SITE_C);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    telaR = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaR, 'tela', [0, 1.5, 2]);

    fx.poeira = [0, 1, 2, 3].map((i) => K.poof(40 + i));
    fx.poof = K.poof(61);
    fx.papeis = K.folhasVento(77, 40, { papel: true });
    fx.pensa = K.balaoPensamento(); fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      fds: e('Feito no fim de semana', 'laranja'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'),
      fone: e('Telefone errado', 'vermelho'), torta: e('Foto torta', 'vermelho'), conc: e('Foi pra concorrente', 'vermelho'),
      umUm: e('Um por um...', 'vermelho'), invest: e('Investimento', 'verde'), todo: e('Acha site assim todo dia', 'verde'),
      recife: e('Recife', 'azul'), chance: e('Mais chance de comprar', 'verde'), ve: e('O que o cliente vê', 'laranja'),
      cacando: e('Caçando cliente', 'vermelho'), achou: e('Achou quem precisa', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Ia atrás ou esperava? Comenta <em>ATRÁS</em> ou <em>ESPERAVA</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  const CAM_R = () => [0.6, 1.5, DZ + 9];
  const slot = (i) => [TEL[0] + PARTES[i].pos[0], TEL[1] + PARTES[i].pos[1], TEL[2] + 0.1];
  // As 4 partes no instante tc (soltando nos instantes ts), com a poeira e o baque de cada batida
  function partes(tc, ts, som = true) {
    ve(telao);
    telao.rotation.set(0, 0, Math.sin(tc * 9) * 0.012 * ts.filter((t) => tc > t && tc < t + 0.8).length);
    ts.forEach((t, i) => {
      const bate = parteEm(i, tc, t), tb = t + quedaT(i);
      fx.poeira[i].em([ZE_R[0] + POUSO[i][0], 0.15, ZE_R[2] + POUSO[i][1]], tc - tb, { escala: 0.8 });
      if (som) { K.som('estalo', t, 0.5); K.som('baque', tb, 0.6); }
      void bate;
    });
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o telão gigante com o site do seu Zé colado com fita crepe; o seu Zé embaixo; as partes despencando · MOSTRA: telao, dono
      // CENÁRIO: a rua entre prédios de dia, gente andando (o cenário cuida)
      const tSo = quando('sozinho', B, 0.2), tSe = quando('semana', B, 0.45), tAs = quando('assim', B, 0.65), tVo = quando('você', B, 0.92);
      // ENTRA AGORA e OBJETOS SE MEXENDO: o título já soltando no 1º quadro; a foto em "sozinho"; o telefone em "semana"; o "em breve" em "assim"
      partes(tc, [B.inicio - 0.12, tSo - 0.15, tSe - 0.1, tAs - 0.1]);
      // PERSONAGEM: o seu Zé · começo: susto · em "semana": mão na testa · em "assim": cai sentado · em "você": aponta pra quem assiste
      ze.colocar(ZE_R, CAM_R());
      if (tc > tVo) ze.apontar(0.3); else if (tc > tAs) ze.reagir('cai_sentado', tc - tAs); else if (tc > tSe) ze.reagir('mao_na_testa', tc - tSe); else ze.reagir('susto', tc - B.inicio);
      // EFEITOS VISUAIS: "Feito no fim de semana" em "semana" · ✗ enorme no telão em "assim"
      fx.et.fds.em(mais(TEL, [0, TH / 2 + 0.45, 0.3]), tc - tSe);
      fx.simb.em(mais(TEL, [0, 0.1, 0.4]), tc - tAs - 0.15, { tipo: '✗', tam: 2.0 });
      K.som('errado', tAs + 0.15, 0.6);
      // CÂMERA: 4 cortes de ~0,8 s · (1) o título caindo, de baixo · (2) o seu Zé de perto · (3) o telão inteiro · (4) passando, com o ✗
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(B.inicio + 2.4, tAs - 0.1);
      if (tc < c1) K.filmar([slot(0), mais(slot(0), [0, -1.1, 0]), cabecaDe(ze, 0)], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 12, altura: 'baixo', tam: 2.6 });
      else if (tc < c2) K.filmar([cabecaDe(ze, 0.2), mais(ZE_R, [0, 0.9, 0]), slot(1)], 'passando', pc(tc, c1, c2), { plano: 'perto', lado: -10, altura: 'olho', tam: 2.2 });
      else if (tc < c3) K.filmar([telao, mais(TEL, [0, TH / 2 + 0.6, 0]), mais(ZE_R, [0, 0.2, 0])], 'afastando', pc(tc, c2, c3), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 4.0 });
      else K.filmar([telao, mais(ZE_R, [0.6, 0.2, 0.6]), mais(TEL, [0, TH / 2, 0])], 'passando', pc(tc, c3, B.ate), { plano: 'medio', lado: 16, altura: 'olho', tam: 4.0 });
    },
    caio(B, tc) {
      // NA TELA: o quarto; o Caio no computador com o site dele; o balão "Cadê cliente?" · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.4), tS = quando('sabe', B, 0.62), tP = quando('padaria', B, 0.85);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      // PERSONAGEM: começo digitando · em "cliente": coça a cabeça · em "sabe": encolhe os ombros
      sentado(tc < tS ? MONITOR : [1.6, 1.1, 4]);
      if (tc > tS) menino.reagir('ombros', tc - tS); else if (tc > tC) menino.reagir('coca_cabeca', tc - tC); else menino.reagir('digitando', tc);
      // EFEITOS VISUAIS: "Web designer" · "Sem cliente" · balão em "sabe" · "?" em "padaria"
      if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else if (tc < tS) fx.et.semCli.em(cabecaDe(menino, 0.5), tc - tC);
      fx.pensa.em(mais(cabecaDe(menino, 0.1), [-0.45, 0, 0]), tc - tS, { texto: 'Cadê cliente?' });
      fx.simb2.em(mais(cabecaDe(menino, 0.1), [0.6, 0.2, 0.1]), tc - tP, { tipo: '?' });
      K.som('clique', B.inicio + 0.1, 0.4); K.som('pingo', tC, 0.5); K.som('whoosh', tS, 0.5);
      // CÂMERA: (1) passando, perto, direita · (2) de "sabe": chegando de frente, baixo
      if (tc < tS) K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 60, altura: 'olho', tam: 1.6 });
      else K.filmar([mais(SEAT, [0, 0.9, 0]), cabecaDe(menino, 0.9)], 'chegando', pc(tc, tS, B.ate), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 1.6 });
    },
    site(B, tc) {
      // NA TELA: a padaria por dentro; o site do seu Zé no painel; o seu Zé na ponta do balcão, orgulhoso · MOSTRA: site, dono
      // CENÁRIO: a cafeteria (padaria), luz quente
      const tS = quando('site', B, 0.1), tF = quando('telefone', B, 0.35), tE = quando('errado', B, 0.5), tC = quando('cardápio', B, 0.65), tT = quando('torta', B, 0.92);
      ve(siteP); K.entrar(siteP.g, 'cresce', tc - tS, { dur: 0.35 });
      // OBJETOS SE MEXENDO: o telefone vermelho piscando em "telefone"; a foto entortando em "torta"
      siteP.mostrar('siteZe', { hl: tc > tF, t: Math.round(tc * 10) / 10, tort: pc(tc, tT - 0.3, tT + 0.2) });
      // PERSONAGEM: o seu Zé mostrando o site, orgulhoso · em "torta": encolhe os ombros
      ze.colocar(ZE_C, tc < tT ? SITE_C : [0.8, 1.5, 5]);
      if (tc > tT) ze.reagir('ombros', tc - tT); else ze.reagir('mostrando', tc - B.inicio);
      // EFEITOS VISUAIS: "Telefone errado" · "Foto torta" · ✗
      if (tc < tC) fx.et.fone.em(mais(SITE_C, [0.45, 1.0, 0.1]), tc - tE); else fx.et.torta.em(mais(SITE_C, [-0.45, 1.0, 0.1]), tc - tT);
      fx.simb.em(mais(SITE_C, [-0.5, 0, 0.3]), tc - tT, { tipo: '✗', tam: 0.9 });
      K.som('ding', B.inicio + 0.05, 0.4); K.som('errado', tE, 0.6); K.som('range', tT, 0.5);
      // CÂMERA: (1) até "telefone": chegando, médio, frente · (2) girando, perto, esquerda
      if (tc < tF) K.filmar([siteP, ze, mais(SITE_C, [0, 1.1, 0])], 'chegando', pc(tc, B.inicio, tF), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.6 });
      else K.filmar([siteP, cabecaDe(ze, 0), mais(SITE_C, [0, 1.1, 0])], 'girando', pc(tc, tF, B.ate), { plano: 'perto', lado: -14, angulo: 20, altura: 'olho', tam: 2.2 });
    },
    cliente(B, tc) {
      // NA TELA: o calçadão na frente da PADARIA; o cliente com o celular gigante: "Ligando..." e "Número não existe" · MOSTRA: cliente, celular
      const tL = quando('ligou', B, 0.12), tEx = quando('existe', B, 0.45), tCo = quando('concorrente', B, 0.85);
      const tFoi = quando('foi', B, 0.65);
      // ENTRA AGORA: o celular sobe do chão em "ligou"
      ve(cel); K.entrar(cel, 'sobe', tc - tL + 0.3, { dur: 0.3 });
      cel.rotation.set(0, Math.atan2(CAM_R()[0] - CEL_R[0], CAM_R()[2] - CEL_R[2]) * 0.6 + 0.35, 0);
      cel.userData.m3d.tela.desenhar((c, w, h) => ligacao(c, w, h, { erro: tc > tEx, t: tc - tL }), 'l' + (tc > tEx ? 'e' : Math.floor((tc - tL) * 3) % 3));
      if (tc > tEx && cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tEx);
      // PERSONAGEM: no celular · em "existe": faz que não · em "foi": vai embora andando
      if (tc < tFoi) { cliente.colocar(CLI_R, mais(CEL_R, [0, 1.2, 0])); cliente.reagir(tc > tEx ? 'nao' : 'celular', tc - (tc > tEx ? tEx : B.inicio)); }
      else { cliente.irPara(CLI_R, [0.85, 0, CLI_R[2] - 6], K.clamp((tc - tFoi) / 2.2), tc, { reto: true }); for (let k = 0; k < 5; k++) K.som('passo', tFoi + k * 0.28, 0.3); }
      // EFEITOS VISUAIS: ✗ no celular em "existe" · "Foi pra concorrente" em "concorrente"
      fx.simb.em(mais(CEL_R, [0, 2.1, 0.3]), tc - tEx, { tipo: '✗', tam: 1.0 });
      fx.et.conc.em(cabecaDe(cliente, 0.55), tc - tCo);
      for (let k = 0; k < 3; k++) K.som('bip', tL + 0.1 + k * 0.35, 0.35);
      K.som('errado', tEx, 0.6);
      // CÂMERA: (1) até "foi": chegando, perto, direita · (2) seguindo o cliente de trás
      if (tc < tFoi) K.filmar([cabecaDe(cliente, 0), mais(CEL_R, [0, 1.9, 0]), mais(CEL_R, [0, 0.3, 0]), mais(CLI_R, [0, 0.2, 0])], 'chegando', pc(tc, B.inicio, tFoi), { plano: 'perto', lado: 18, altura: 'olho', tam: 2.4 });
      else K.seguir(cliente, { lado: 'tras', dist: 3.6, altura: 1.5 });
    },
    procura(B, tc) {
      // NA TELA: o quarto de noite; o Caio digitando; a busca no monitor; a planilha enchendo devagar; o despertador até as 3h · MOSTRA: personagem, planilha, despertador
      const tU = quando('um', B, 0.35), tG = quando('Google', B, 0.55), tM = quando('madrugada', B, 0.88);
      ve(comp, plan, desp);
      const n = tc > tG ? 1 + Math.floor((tc - tG) / 0.3) : 0;
      comp.tela.desenhar((c, w, h) => buscaNoite(c, w, h, { n }), 'bn' + Math.min(4, n));
      plan.rotation.set(0, -0.6, 0);
      // OBJETOS SE MEXENDO: a planilha bem devagar; os ponteiros correndo; o despertador toca em "madrugada"
      plan.userData.m3d.preencher(K.lerp(0.04, 0.16, pc(tc, B.inicio, B.ate)));
      desp.userData.m3d.horas(22 + pc(tc, B.inicio, tM) * 5);
      if (tc > tM) desp.userData.m3d.tocar(tc - tM);
      // PERSONAGEM: digitando · em "madrugada": cochila (Zzz)
      sentado(MONITOR);
      if (tc > tM) menino.reagir('dormindo', tc - tM); else menino.reagir('digitando', tc);
      fx.et.umUm.em(mais(PLAN, [0, 2.6, 0.2]), tc - tU);
      for (let k = 0; k < 8; k++) K.som('clique', B.inicio + 0.1 + k * 0.18, 0.25);
      K.som('apito', tM + 0.1, 0.4);
      // CÂMERA: (1) até "um": girando, médio, esquerda · (2) chegando, médio, na planilha e no despertador
      if (tc < tU) K.filmar([cabecaDe(menino, 0.2), MONITOR, mais(SEAT, [0, 0.3, 0.4])], 'girando', pc(tc, B.inicio, tU), { plano: 'medio', lado: 28, angulo: 20, altura: 'olho', tam: 1.8 });
      else K.filmar([mais(PLAN, [0, 0.6, 0]), mais(PLAN, [0, 2.3, 0]), cabecaDe(menino, 0)], 'passando', pc(tc, tU, B.ate), { plano: 'medio', lado: -10, altura: 'olho', tam: 2.6 });
    },
    investe(B, tc) {
      // NA TELA: o quarto de dia; o Caio de pé com a caneca de café; a caneca voa pro monitor e ele carrega · MOSTRA: personagem, caneca, monitor
      const tI = quando('investir', B, 0.2), tC = quando('café', B, 0.4), tS = quando('sistema', B, 0.55), tT = quando('todo', B, 0.88);
      ve(comp, caneca);
      const k = pc(tc, tS, tS + 0.55);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tT) }), 'inv' + Math.round(pc(tc, tS + 0.4, tT) * 10));
      // PERSONAGEM: de pé · começo: faz que sim (decidiu) · em "sistema": aponta o monitor · em "todo": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [0.8, 1.3, 4]);
      if (tc > tT) menino.reagir('comemorando', tc - tT); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: a caneca na mão em "café"; em "sistema", voa encolhendo até o monitor e some num poof
      const m = menino.mao(1);
      if (tc < tS) { caneca.position.set(m[0] + 0.05, m[1] - 0.12, m[2] + 0.1); caneca.scale.setScalar(1.8 * pop(tc - tC + 0.2)); }
      else { const q = K.suave(k); caneca.position.set(K.lerp(m[0], MONITOR[0] + 0.2, q), K.lerp(m[1], MONITOR[1] + 0.1, q) + Math.sin(q * PI) * 0.5, K.lerp(m[2], MONITOR[2] + 0.15, q)); caneca.rotation.set(0, q * 6, 0); caneca.scale.setScalar(1.8 * (1 - q * 0.85)); if (q >= 1) caneca.visible = false; }
      fx.poof.em(mais(MONITOR, [0.2, 0.1, 0.2]), tc - tS - 0.55, { escala: 0.8 });
      // EFEITOS VISUAIS: "Investimento" em "investir" · "Acha site assim todo dia" em "todo"
      if (tc < tT) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.todo.em(mais(MONITOR, [0, 0.75, 0]), tc - tT);
      K.som('ding', tC, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.55, 0.5); K.som('certo', tT, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0])], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)], 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das padarias de Recife sobe do computador; o Caio ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.48), tPa = quando('padarias', B, 0.6), tR = quando('Recife', B, 0.78);
      ve(comp, navG); comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tPa ? 1 + Math.floor((tc - tPa) / 0.22) : 0;
        telaC.mostrar('listaPadarias', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tPa + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a Padaria do Zé
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.recife.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tR);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a análise da Padaria do Zé; o robô e o Caio · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tMo = quando('mostra', B, 0.35), tCh = quando('chance', B, 0.6), tSi = quando('site', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tSi - tCh)) * 20) / 20;
      telaM.mostrar('analisePadaria', { ate: tc > tSi - 0.25 ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tSi - 0.25, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "site": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tSi - 0.25 ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSi - 0.25) menino.reagir('comemorando', tc - tSi + 0.25); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) passando, médio, esquerda
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    mostra(B, tc) {
      // NA TELA: a padaria por dentro; o Caio com a análise na mão; o seu Zé na ponta do balcão · MOSTRA: personagem, dono, tela
      const tMo = quando('mostra', B, 0.15), tVe = quando('vê', B, 0.45), tTo = quando('topa', B, 0.78);
      // PERSONAGEM: o Caio mostrando · o seu Zé surpreso em "vê" · em "topa": comemora
      menino.colocar(CAIO_C, cabecaDe(ze, -0.5));
      menino.reagir('mostrando', tc - B.inicio);
      ze.colocar(ZE_C, cabecaDe(menino, -0.5));
      if (tc > tTo) ze.reagir('comemorando', tc - tTo); else if (tc > tVe) ze.reagir('surpreso', tc - tVe); else ze.reagir('duvida', tc - B.inicio);
      ve(telaR); const m = menino.mao(1); telaR.g.position.set(m[0] + 0.2, m[1] + 0.45, m[2] + 0.1); telaR.g.rotation.set(0, 0.35, 0); telaR.g.scale.setScalar(0.42 * pop(tc - tMo + 0.2));
      telaR.mostrar('analisePadaria', { ate: 2, score: 1 });
      // EFEITOS VISUAIS: "O que o cliente vê" em "vê" · balão "Bora refazer!" e ✓ em "topa"
      if (tc < tTo) fx.et.ve.em(mais(CAIO_C, [-0.3, 2.6, 0.2]), tc - tVe);
      fx.fala.em(cabecaDe(ze, 0.15), tc - tTo, { texto: 'Bora refazer!' });
      fx.simb.em(mais(ZE_C, [-0.7, 2.4, 0.3]), tc - tTo - 0.2, { tipo: '✓' });
      K.som('certo', tTo, 0.7);
      // CÂMERA: (1) até "vê": chegando, médio, frente · (2) passando, perto, direita
      if (tc < tVe) K.filmar([mais(CAIO_C, [0, 1, 0]), mais(ZE_C, [0, 1, 0]), telaR], 'chegando', pc(tc, B.inicio, tVe), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.3 });
      else K.filmar([cabecaDe(menino, 0), cabecaDe(ze, 0.3), telaR], 'passando', pc(tc, tVe, B.ate), { plano: 'perto', lado: 22, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Caio sentado de noite com o celular "0"; (2) Agora: na padaria com o seu Zé e o site novo · MOSTRA: personagem, dono
      const tA = quando('Agora', B, 0.45), tP = quando('precisa', B, 0.85);
      if (tc < tA) {
        ve(comp, celP); comp.tela.desenhar(telaEscura, 'escura');
        celP.rotation.set(0, Math.atan2(0.4 - CELP[0], 2.6 - CELP[2]), 0);
        celP.userData.m3d.tela.desenhar(vazio, 'vazio');
        sentado(mais(CELP, [0, 0.9, 0])); menino.reagir('mao_na_testa', tc - B.inicio);
        fx.et.cacando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.4, 0.1, 0.8]), mais(CELP, [0, 1.5, 0])], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 25, altura: 'olho', tam: 1.6 });
      } else {
        ve(siteP); siteP.mostrar('siteNovo', {});
        menino.colocar(CAIO_C, cabecaDe(ze, -0.5)); menino.reagir('vitoria', tc - tA);
        ze.colocar(ZE_C, cabecaDe(menino, -0.5)); ze.reagir('aplaudindo', tc - tA);
        fx.et.achou.em(mais(CAIO_C, [0.2, 2.5, 0.2]), tc - tP);
        K.som('certo', tP, 0.6);
        K.filmar([mais(CAIO_C, [0, 1, 0]), mais(ZE_C, [0, 1, 0]), siteP], 'passando', pc(tc, tA, B.ate), { plano: 'perto', lado: -18, altura: 'olho', tam: 2.4 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Caio de pé no quarto; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteDemo, 'demo');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (aponta pra quem assiste) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
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
      // o título e o telefone já no chão, a foto caindo em cima dele, o "em breve" soltando
      partes(0, [-1.4, -0.3, -1.0, 0.4], false);
      ze.colocar(ZE_R, CAM_R()); ze.reagir('susto', 0.5); ze.humor('assustado');
      fx.simb.em(mais(TEL, [0.75, 0.35, 0.4]), 1, { tipo: '✗', tam: 1.4, som: false });
      K.filmar([telao, mais(TEL, [0, TH / 2 + 0.3, 0]), mais(ZE_R, [0, 0.2, 0.5])], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.22, tam: 3.6 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cliente, ze].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    telao.rotation.set(0, 0, 0);
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    siteP.g.scale.setScalar(1); siteP.g.position.set(...SITE_C); siteP.g.rotation.set(0, -0.12, 0);
    cel.position.set(...CEL_R); celP.scale.setScalar(1); celP.position.set(...CELP);
    caneca.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
