// O orçamento que vira fumaça (canal Mappoa, lote da nuvem no molde de 45 s, 19/11/2026).
// O Caio, web designer, manda orçamento pra todo mundo que pede preço; o cliente lê, fala "vou ver e te falo" e vira
// fumaça (some num poof, só sobra o chapéu caindo). O buffet infantil da esquina, que precisa de site, fecha com outro
// web designer que foi atrás. O Caio abana a fumaça, investe e acha no Mappoa os buffets infantis de Montes Claros sem
// site. Agora ele só manda orçamento pra quem precisa, e esse cliente não some.
// Quatro lugares (K.cenarios): a fachada da loja (o cliente que some), o quarto do Caio (home_office), a fachada do
// buffet (o salão vestido de buffet: placa, balões, cartaz) e o palco do Mappoa. Cada plano começa com as linhas da
// ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, dono, dona, dona2, rival, robo, comp, cel, cadeira, telaC, telaM, navG, FOV0;
  let orc, chapeu, tablet, avioesG, placaB, baloesG, FOLHA_DM;
  const tudo = [], fx = {}, avioes = [], baloes = [], matsDono = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Caio no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const OLHA_CAM = [1.6, 1.1, 3.4], EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], CAD_LADO = [-1.6, 0, -0.75];
  // Fachadas (loja e buffet): a frente em z 0, a porta em x 1,6, a calçada até z 4,6
  const DX = 1.6;
  const DONO = [-1.0, 0, 2.4], HAT_CHAO = [-0.55, 0.05, 2.75], ORC_CHAO = [-1.45, 0.02, 2.95];
  const DONA = [DX + 1.2, 0, 2.15], RIVAL_F = [DX - 0.2, 0, 2.3], CAIO_F = [DX - 0.2, 0, 2.3], PLACA = [0, 3.55, 0.3];

  const LUGAR = { gancho: 'loja', manda: 'quarto', vacuo: 'quarto', buffet: 'buffet', rival: 'buffet', virada: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'buffet', segue: 'quarto', cartao: 'quarto', capa: 'loja' };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.42) ? 'loja' : 'buffet';
    return LUGAR[B.plano] || 'quarto';
  }

  const BUFFETS = [
    { nome: 'Buffet Castelinho', end: 'Rua Dom Pedro II, 410', chips: ['whats', 'insta'] },
    { nome: 'Festa Mágica Buffet', end: 'Av. Dep. Esteves Rodrigues, 1220', chips: ['tel', 'insta'] },
    { nome: 'Buffet Pirulito', end: 'Rua Coronel Celestino, 85', chips: ['whats'] },
    { nome: 'Espaço Balão Mágico', end: 'Av. Mestra Fininha, 640', chips: ['whats', 'tel'] }
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
  // peça que o plano move na mão (sem K.lugar)
  function solta(g, nome) { if (!g.parent) K.scene.add(g); if (nome) K.nomear(nome, g); tudo.push(g); return g; }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  function folha(l, a, px, desenho, op = {}) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const mat = op.basica === false ? K.mat(0xffffff, { map: t, side: THREE.DoubleSide, roughness: 0.8 }) : new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l, a), mat);
    let chave = null;
    m.userData.desenhar = (fn, k) => { if (k === chave) return; chave = k; const c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height); fn(c, cv.width, cv.height); t.needsUpdate = true; };
    m.userData.desenhar(desenho, 'ini');
    return m;
  }

  // ---------- Desenhos ----------
  function desenhaOrc(c, w, h) {
    rr(c, 0, 0, w, h, 14, '#ffffff');
    c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, h * 0.17);
    txt(c, 'ORÇAMENTO', w / 2, h * 0.09, w * 0.13, '#fff', 900, 'center');
    txt(c, 'Site profissional', w * 0.08, h * 0.26, w * 0.075, '#1e1f22', 800);
    c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.08, h * (0.36 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.84), h * 0.025);
    txt(c, 'Caio Web Design', w * 0.08, h * 0.88, w * 0.065, '#2f6fd6', 800);
  }
  // o direct do Instagram enchendo de "quanto custa?"
  const DMS = ['Quanto custa um site?', 'Me passa o preço?', 'Valor de um site?', 'Quanto fica?', 'Preço de site?'];
  function telaDM(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#f2f2f5'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Direct', w * 0.08, h * 0.05, w * 0.08, '#111', 900);
    for (let i = 0; i < Math.min(5, e.n); i++) {
      const y = h * (0.15 + i * 0.165);
      c.fillStyle = ['#e8537a', '#f59e0b', '#2fb5a6', '#7c3aed', '#2f6fd6'][i]; c.beginPath(); c.arc(w * 0.13, y + h * 0.05, w * 0.07, 0, 7); c.fill();
      rr(c, w * 0.24, y, w * 0.72, h * 0.1, 18, '#eef0f4');
      txt(c, DMS[i], w * 0.28, y + h * 0.05, w * 0.06, '#111', 800, 'left', w * 0.64);
    }
  }
  // a conversa com o cliente: o orçamento que o Caio mandou e o "vou ver e te falo"
  function telaChat(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.12);
    txt(c, 'Cliente', w * 0.08, h * 0.065, w * 0.08, '#fff', 800);
    rr(c, w * 0.3, h * 0.16, w * 0.64, h * 0.16, 14, '#dcf8c6');
    rr(c, w * 0.35, h * 0.185, w * 0.13, h * 0.11, 6, '#e8352b'); txt(c, 'PDF', w * 0.415, h * 0.24, w * 0.05, '#fff', 900, 'center');
    txt(c, 'Orçamento', w * 0.52, h * 0.22, w * 0.06, '#111', 800); txt(c, '✓✓', w * 0.82, h * 0.29, w * 0.05, '#34b7f1', 900);
    if (e.resp) { rr(c, w * 0.05, h * 0.37, w * 0.8, h * 0.17, 14, '#ffffff'); txt(c, 'Gostei, vou ver', w * 0.09, h * 0.42, w * 0.07, '#111', 800); txt(c, 'e te falo 👍', w * 0.09, h * 0.49, w * 0.07, '#111', 800); }
    if (e.dias) { rr(c, w * 0.2, h * 0.64, w * 0.6, h * 0.08, 20, 'rgba(0,0,0,.18)'); txt(c, e.dias, w / 2, h * 0.68, w * 0.055, '#fff', 800, 'center', w * 0.56); }
    if (e.visto) txt(c, 'visto por último há 30 dias', w / 2, h * 0.8, w * 0.05, '#666', 700, 'center', w * 0.9);
  }
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Caio Web Design', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // o site do buffet que o outro web designer leva pronto no tablet
  function siteBuffet(c, w, h) {
    rr(c, 0, 0, w, h, 22, '#1e1f22');
    const x0 = w * 0.05, y0 = h * 0.07, ww = w * 0.9, hh = h * 0.86;
    const d = c.createLinearGradient(0, y0, 0, y0 + hh * 0.5); d.addColorStop(0, '#ff7eb3'); d.addColorStop(1, '#ffb347'); c.fillStyle = d; c.fillRect(x0, y0, ww, hh * 0.5);
    txt(c, 'Buffet Pula-Pula', w / 2, y0 + hh * 0.17, w * 0.085, '#fff', 900, 'center', ww * 0.9);
    txt(c, 'Festas inesquecíveis', w / 2, y0 + hh * 0.33, w * 0.05, '#fff', 700, 'center');
    c.fillStyle = '#ffffff'; c.fillRect(x0, y0 + hh * 0.5, ww, hh * 0.5);
    rr(c, w * 0.3, y0 + hh * 0.62, w * 0.4, hh * 0.16, 30, '#25d366'); txt(c, 'Reservar', w / 2, y0 + hh * 0.7, w * 0.055, '#fff', 900, 'center');
  }
  function desenhaPlaca(nome, cor) {
    return (c, w, h) => { rr(c, 0, 0, w, h, 18, '#ffffff'); c.strokeStyle = cor; c.lineWidth = h * 0.08; c.strokeRect(h * 0.05, h * 0.05, w - h * 0.1, h * 0.9); txt(c, nome, w / 2, h / 2 + 2, h * 0.6, cor, 900, 'center', w * 0.92); };
  }

  // ---------- O avião de papel (o orçamento voando) ----------
  function aviao() {
    const geo = new THREE.BufferGeometry();
    const n = [0, 0, 0.26], tl = [-0.16, 0.02, -0.12], tr = [0.16, 0.02, -0.12], tm = [0, 0, -0.12], tk = [0, -0.07, -0.12];
    geo.setAttribute('position', new THREE.Float32BufferAttribute([...n, ...tl, ...tm, ...n, ...tm, ...tr, ...n, ...tm, ...tk], 3));
    geo.computeVertexNormals();
    const m = K.malha(geo, K.mat(0xffffff, { side: THREE.DoubleSide, roughness: 0.7 }), false);
    const faixa = K.malha(new THREE.BoxGeometry(0.012, 0.004, 0.2), K.mat(0x2f6fd6), false); faixa.position.set(0.06, 0.012, -0.02); m.add(faixa);
    m.scale.setScalar(1.5);
    return m;
  }
  // o avião i voando de "de" até "ate" (k de 0 a 1), com a ponta virada pra onde vai
  function voa(a, de, ate, k) {
    const ctrl = [(de[0] + ate[0]) / 2, Math.max(de[1], ate[1]) + 0.8, (de[2] + ate[2]) / 2];
    const p = (u) => [0, 1, 2].map((i) => (1 - u) * (1 - u) * de[i] + 2 * (1 - u) * u * ctrl[i] + u * u * ate[i]);
    const q = p(k), q2 = p(Math.min(1, k + 0.02));
    a.visible = true; a.position.set(...q); a.lookAt(V(...q2)); a.rotateZ(Math.sin(k * 9) * 0.3);
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['fachada', { loja: 'loja' }, 'loja'], ['home_office', {}, 'quarto'], ['fachada', { loja: 'salao' }, 'buffet'], 'mundo_mappoa']);
    const Cb = CS.todos.buffet;
    if (Cb.objetos && Cb.objetos.fachada) K.nomear('buffet', Cb.objetos.fachada);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaBuffets = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: BUFFETS, n: e.n, sel: e.sel, total: 64, comSite: 37, semSite: 27 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Buffets infantis · Montes Claros, MG', 36, 168, 21, M.marinho, 700, 'left', w - 72);
    };
    T.analiseBuffet = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Buffet Castelinho', ate: e.ate, aderencia: 0.93 * k,
        dores: ['Sem site: reserva só no WhatsApp', 'Não aparece pra quem busca festa'], oportunidades: ['Site com fotos das festas e o WhatsApp no topo'],
        objecoes: ['"A gente já tem Instagram"'], abordagem: 'Mostre quantas mães procuram buffet no Google e não acham o dele.'
      });
      if (e.ate >= 0) txt(c, Math.round(93 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Caio (do canal), o cliente que vira fumaça, a dona do Pula-Pula, a dona do Castelinho, o rival e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dono = K.personagem('dono'); K.semNome(dono.g); K.nomear('dono', dono.g);
    // os materiais do cliente viram só dele, pra ele poder sumir sem apagar mais ninguém
    dono.g.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => matsDono.push(m));
    });
    dona = K.personagem('dona', { cores: { blazer: 0xe8537a, vestido: 0xffffff } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    dona2 = K.personagem('dona', { cores: { blazer: 0x7c3aed, vestido: 0xf5c518, cabelo: 0x6b3a1a } }); K.semNome(dona2.g); K.nomear('dona2', dona2.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0x22a35a, punho: 0x178046, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xc98d5e } });
    K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O chapéu do cliente (fica na cabeça dele até o poof, depois cai girando)
    chapeu = new THREE.Group();
    const mc = K.mat(0x3a2a20, { roughness: 0.7 });
    const aba = K.malha(new THREE.CylinderGeometry(0.4, 0.4, 0.035, 32), mc); chapeu.add(aba);
    const copa = K.malha(new THREE.CylinderGeometry(0.24, 0.27, 0.26, 32), mc); copa.position.y = 0.14; chapeu.add(copa);
    const fita = K.malha(new THREE.CylinderGeometry(0.275, 0.275, 0.06, 32), K.mat(0xc8372d)); fita.position.y = 0.05; chapeu.add(fita);
    solta(chapeu, 'chapeu');
    // O orçamento (a folha na mão do cliente e, no fim, na mão do Caio)
    orc = folha(0.36, 0.48, 300, desenhaOrc); solta(orc, 'orcamento');
    // Os aviõezinhos de orçamento
    avioesG = new THREE.Group(); solta(avioesG, 'avioes');
    for (let i = 0; i < 7; i++) { const a = aviao(); avioesG.add(a); avioes.push(a); }

    // Quarto: o computador, a cadeira, o celular, a barra do endereço e as telas do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.celular(); solta(cel.g, 'celular');
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    tablet = folha(0.62, 0.44, 420, siteBuffet); solta(tablet, 'tablet');

    // O buffet: o salão vestido de buffet (a placa nova por cima, o cartaz na vitrine, o cavalete e os balões)
    placaB = folha(5.9, 0.8, 1200, desenhaPlaca('BUFFET PULA-PULA', '#e8537a'), { basica: false });
    placaB.position.set(PLACA[0], PLACA[1], 0.29); Cb.grupo.add(placaB);
    const cartaz = (l, a, x) => {
      const m = folha(l, a, 700, (c, w, h) => {
        const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, '#fff3c4'); d.addColorStop(1, '#ffd6e7'); c.fillStyle = d; c.fillRect(0, 0, w, h);
        txt(c, 'FESTAS', w / 2, h * 0.17, Math.min(w * 0.16, h * 0.17), '#e8537a', 900, 'center');
        txt(c, 'INFANTIS', w / 2, h * 0.33, Math.min(w * 0.13, h * 0.13), '#7c3aed', 900, 'center');
        // o bolo
        rr(c, w * 0.3, h * 0.62, w * 0.4, h * 0.22, 14, '#ff9ec4'); rr(c, w * 0.36, h * 0.46, w * 0.28, h * 0.17, 12, '#fff'); c.fillStyle = '#f5c518'; c.fillRect(w * 0.49, h * 0.38, w * 0.02, h * 0.08);
        [['#e8352b', 0.12, 0.55], ['#2f6fd6', 0.86, 0.5], ['#2fb54a', 0.18, 0.78], ['#f59e0b', 0.82, 0.78]].forEach(([cor, x, y]) => { c.fillStyle = cor; c.beginPath(); c.ellipse(w * x, h * y, w * 0.06, h * 0.075, 0, 0, 7); c.fill(); });
      }, { basica: false });
      m.position.set(x, 1.75, -0.16); Cb.grupo.add(m); return m;
    };
    cartaz(5.0, 2.35, -2.0); cartaz(1.85, 2.35, 3.6);
    const tampa = folha(2.1, 0.5, 500, (c, w, h) => { c.clearRect(0, 0, w, h); rr(c, 0, 0, w, h, 16, '#ffffff'); txt(c, 'FESTAS', w / 2, h / 2, h * 0.62, '#e8537a', 900, 'center'); }, { basica: false });
    tampa.position.set(-2.0, 2.6, -0.005); Cb.grupo.add(tampa);
    const cav = new THREE.Group(); cav.position.set(DX + 2.3, 0, 1.6); cav.rotation.y = -0.35; Cb.grupo.add(cav);
    const cq = folha(0.68, 0.88, 300, (c, w, h) => { rr(c, 0, 0, w, h, 10, '#2a2e33'); txt(c, 'RESERVA', w / 2, h * 0.3, w * 0.15, '#fff', 900, 'center'); txt(c, 'SÓ NO', w / 2, h * 0.48, w * 0.15, '#fff', 900, 'center'); txt(c, 'ZAP', w / 2, h * 0.68, w * 0.22, '#25d366', 900, 'center'); }, { basica: false });
    cq.position.set(0, 0.62, 0.15); cq.rotation.x = -0.18; cav.add(cq);
    baloesG = new THREE.Group(); Cb.grupo.add(baloesG); K.nomear('baloes', baloesG);
    const CORB = [0xe8352b, 0x2f6fd6, 0xf5c518, 0x2fb54a, 0xe8537a, 0x7c3aed];
    [[DX - 1.0, 0.35], [DX + 1.0, 0.35], [-4.6, 0.4]].forEach(([x, z], j) => {
      for (let i = 0; i < 5; i++) {
        const b = new THREE.Group();
        const bola = K.malha(new THREE.SphereGeometry(0.19, 20, 16), K.mat(CORB[(i + j * 2) % 6], { roughness: 0.35 })); bola.scale.set(1, 1.18, 1); b.add(bola);
        const fio = K.malha(new THREE.CylinderGeometry(0.005, 0.005, 1, 4), K.mat(0xffffff), false); b.add(fio);
        const base = [x + (i - 2) * 0.17, 2.35 + (i % 2) * 0.32 + (i === 2 ? 0.5 : 0), z + (i % 3) * 0.08];
        b.userData = { base, fio, fase: i * 1.3 + j };
        baloesG.add(b); baloes.push(b);
      }
    });

    // Efeitos
    fx.fumD = K.fumaca(15, 0xaab0b8, 20);
    fx.fumC = K.fumaca(21, 0xaab0b8, 10);
    fx.fumS = [K.fumaca(31, 0x9aa3ad, 16), K.fumaca(32, 0x9aa3ad, 16), K.fumaca(33, 0x9aa3ad, 16)];
    fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.cont = K.contador();
    fx.fala = K.balaoFala();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      sumiu: e('Sumiu!', 'vermelho'), todos: e('Pra todo mundo', 'laranja'), nada: e('Sem resposta', 'vermelho'), semSite: e('Sem site', 'vermelho'),
      outro: e('Fechou com outro', 'laranja'), investir: e('Investir', 'azul'), mc: e('Montes Claros', 'azul'), problema: e('Tem o problema', 'verde'),
      sumia: e('Sumia', 'vermelho'), precisa: e('Quem precisa', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  // o cliente ficando transparente: k = 0 normal, 1 quase sumido
  function fantasma(k) {
    matsDono.forEach((m) => { m.transparent = k > 0.01; m.opacity = 1 - 0.85 * k; m.depthWrite = k < 0.5; });
  }
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || OLHA_CAM);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  // o celular na mão, do lado da cabeça, virado pra câmera (chamar DEPOIS do K.filmar)
  function celNaMao(desenho, chave, esc = 1.8) {
    ve(cel); menino.g.updateMatrixWorld(true);
    const m = menino.mao(1); cel.g.position.set(m[0], m[1] + 0.12, m[2]); cel.g.scale.setScalar(esc);
    cel.g.lookAt(K.camera.position); cel.tela.desenhar(desenho, chave);
  }
  // a folha entre as mãos de quem segura (chamar DEPOIS do K.filmar)
  function folhaNaMao(b, f, esc = 1) {
    b.g.updateMatrixWorld(true);
    const a = b.mao(0), c = b.mao(1);
    f.visible = true; f.scale.setScalar(esc);
    f.position.set((a[0] + c[0]) / 2, (a[1] + c[1]) / 2 + 0.16, (a[2] + c[2]) / 2);
    f.lookAt(K.camera.position);
  }
  // o chapéu: na cabeça (k < 0) ou caindo girando até o chão (k de 0 a 1)
  function chapeuEm(b, k, dy = 0.24) {
    chapeu.visible = true;
    const top = cabecaDe(b, dy);
    if (k <= 0) { chapeu.position.set(...top); chapeu.rotation.set(-0.08, b.g.rotation.y, 0.06); chapeu.scale.setScalar(1); return; }
    const q = K.clamp(k), y = K.lerp(top[1] + 0.35, HAT_CHAO[1], q * q) + (q < 0.25 ? Math.sin(q / 0.25 * PI) * 0.25 : 0);
    chapeu.position.set(K.lerp(top[0], HAT_CHAO[0], q), Math.max(HAT_CHAO[1], y), K.lerp(top[2], HAT_CHAO[2], q));
    chapeu.rotation.set(q * 2.2 * (1 - q) + (q >= 1 ? 0 : 0), q * 7, (1 - q) * 0.8 + Math.sin(q * 12) * 0.25 * (1 - q));
  }
  // o orçamento caindo da mão do cliente até o chão (k de 0 a 1)
  function orcCaindo(k, de) {
    const q = K.clamp(k);
    orc.visible = true; orc.scale.setScalar(1);
    orc.position.set(K.lerp(de[0], ORC_CHAO[0], q) + Math.sin(q * 9) * 0.15 * (1 - q), K.lerp(de[1], ORC_CHAO[1], K.suave(q)), K.lerp(de[2], ORC_CHAO[2], q));
    orc.rotation.set(-PI / 2 * q + Math.sin(q * 7) * 0.4 * (1 - q), 0.3, Math.sin(q * 5) * 0.5 * (1 - q));
  }
  // o cliente lendo o orçamento e virando fumaça; tSome = instante do poof (o fade vai de k0 até 1)
  function clienteSumindo(tc, t0, tSome, k0) {
    const some = tc > tSome;
    if (!some) {
      dono.colocar(DONO, [0.2, 1.3, 9]); dono.reagir('segurando', tc - t0);
      if (tc > tSome - 0.6) dono.humor('surpreso');
      fantasma(K.lerp(k0, 0.75, pc(tc, t0, tSome)));
    }
    const fum = some ? 1 - pc(tc, tSome + 0.2, tSome + 1.2) : K.lerp(0.55, 1, pc(tc, t0, tSome));
    fx.fumD.em([DONO[0], 0.05, DONO[2]], tc + 3, { altura: 1.7, escala: 0.28, ritmo: 0.7, forca: fum * 0.85, vento: [0.18, 0.05] });
    fx.poof.em(mais(DONO, [0, 1.05, 0]), tc - tSome, { escala: 2.3, cor: 0xc4cad1 });
    fx.poof2.em(mais(DONO, [0, 0.45, 0]), tc - tSome - 0.06, { escala: 1.6, cor: 0xb3b9c1, som: false });
    return some;
  }
  // os balões balançando (no buffet)
  function baloesEm(tc) {
    baloes.forEach((b) => {
      const { base, fio, fase } = b.userData;
      const sx = Math.sin(tc * 1.3 + fase) * 0.05, sy = Math.sin(tc * 1.7 + fase) * 0.04;
      b.children[0].position.set(sx, sy, 0);
      const len = base[1] - 1.05;
      fio.scale.set(1, len, 1); fio.position.set(sx * 0.5, sy - 0.22 - len / 2 + 0.2, 0);
      b.position.set(base[0], base[1], base[2]);
    });
  }
  function buffetComo(nome, cor) { placaB.userData.desenhar(desenhaPlaca(nome, cor), nome); }

  const P = {
    gancho(B, tc) {
      // NA TELA: na calçada da loja Vento Sul, o cliente de terno e chapéu lendo o orçamento, já meio transparente, com fumaça subindo dos pés; em "fumaça", poof: ele some e o chapéu cai girando no chão · MOSTRA: dono, orcamento, chapeu
      const tOr = quando('orçamento', B, 0.3), tCl = quando('cliente', B, 0.55), tFu = quando('fumaça', B, 0.82);
      const tSome = tFu - 0.05;
      // PERSONAGEM: o cliente lendo · na palavra "cliente": susto · em "fumaça": some
      const some = clienteSumindo(tc, B.inicio - 0.6, tSome, 0.3);
      if (!some && tc > tCl) dono.humor('assustado');
      // CÂMERA: 4 cortes nos 3 primeiros segundos (a folha, os pés com a fumaça, o rosto sumindo, o quadro aberto)
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.4, c3 = Math.max(c2 + 0.45, tSome - 0.05);
      if (tc < c1) K.filmar([mais(DONO, [0.05, 1.15, 0.35]), cabecaDe(dono, 0.05)], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 15, altura: 'olho', tam: 1.0 });
      else if (tc < c2) K.filmar([mais(DONO, [0, 0.1, 0]), cabecaDe(dono, 0.35)], 'subindo', pc(tc, c1, c2), { plano: 'medio', lado: -25, altura: 'baixo', tam: 2.0 });
      else if (tc < c3) K.filmar([cabecaDe(dono, 0.45), mais(DONO, [0, 0.7, 0])], 'chegando', pc(tc, c2, c3), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.5 });
      else K.filmar([mais(DONO, [0, 0.05, 0]), mais(DONO, [0, 2.3, 0]), HAT_CHAO, ORC_CHAO], 'afastando', pc(tc, c3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.35, tam: 2.6 });
      // OBJETOS SE MEXENDO: o orçamento na mão e, no poof, caindo; o chapéu caindo girando
      if (!some) { folhaNaMao(dono, orc); chapeuEm(dono, -1); }
      else { orcCaindo(pc(tc, tSome, tSome + 0.9), mais(DONO, [0.05, 1.1, 0.3])); chapeuEm(dono, pc(tc, tSome, tSome + 0.6)); }
      // EFEITOS VISUAIS: "Sumiu!" em "fumaça"
      fx.et.sumiu.em({ tela: [540, 600] }, tc - tFu - 0.1);
      // SONS: zumbido e vapor no 1º segundo · whoosh em cada corte · ding em "orçamento" · estalo no poof · baque do chapéu
      K.som('zumbido', B.inicio, 0.5); K.som('vapor', B.inicio + 0.05, 0.5);
      [c1, c2, c3].forEach((c) => K.som('whoosh', c, 0.35));
      K.som('ding', tOr, 0.4); K.som('estalo', tSome, 0.6); K.som('baque', tSome + 0.6, 0.5); K.som('whoosh', tSome + 0.2, 0.2);
    },
    manda(B, tc) {
      // NA TELA: o quarto; o Caio sentado com o celular cheio de "Quanto custa?"; a cada um, ele joga um aviãozinho de orçamento que voa pra fora · MOSTRA: personagem, avioes, celular
      const tCa = quando('Caio', B, 0.05), tMa = quando('manda', B, 0.4), tTo = quando('todo', B, 0.62), tPr = quando('preço', B, 0.9);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      // PERSONAGEM: sentado, de lado pra câmera · começo no celular · em "manda": joga os aviões
      sentado([1.4, 1.2, 3.2]);
      if (tc < tMa) menino.reagir('celular', tc - B.inicio); else menino.reagir('empurrando', tc - tMa);
      menino.humor('feliz');
      // CÂMERA: (1) chegando · perto · lado 30 · (2) em "manda": passando · médio · lado -15 · (3) em "todo": afastando · aberto
      if (tc < tMa) K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.25, 0.7, 0.35])], 'chegando', pc(tc, B.inicio, tMa), { plano: 'perto', lado: 30, altura: 'olho', tam: 1.3 });
      else if (tc < tTo) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0, 0.15, 0.2]), mais(SEAT, [-0.6, 1.5, 0.7])], 'passando', pc(tc, tMa, tTo), { plano: 'perto', lado: -15, altura: 'olho', tam: 1.7 });
      else K.filmar([cabecaDe(menino, 0.5), mais(SEAT, [0, 0.1, 0.3]), mais(SEAT, [-0.8, 1.8, 0.9])], 'afastando', pc(tc, tTo, B.ate), { plano: 'perto', lado: 8, altura: 'baixo', tam: 2.0 });
      // OBJETOS SE MEXENDO: o celular enche de mensagens; os aviões saem da mão um atrás do outro
      ve(avioesG);
      const n = Math.max(1, Math.min(5, 1 + Math.floor((tc - tCa) / 0.5)));
      celNaMao((c, w, h) => telaDM(c, w, h, { n }), 'dm' + n);
      const mao = menino.mao(0);
      avioes.forEach((a, i) => {
        const t0 = tMa + i * 0.32; if (tc < t0) return;
        const k = (tc - t0) / 1.2; if (k > 1) return;
        voa(a, mao, [2.6 + i * 0.2, 2.3 + (i % 3) * 0.35, -2.4 + (i % 2) * 0.5], k);
        K.som('whoosh', t0, 0.18);
      });
      // EFEITOS VISUAIS: "Pra todo mundo" em "todo"
      fx.et.todos.em({ tela: [540, 400] }, tc - tTo);
      // SONS: ding a cada mensagem nova · whoosh de cada avião
      for (let i = 0; i < 5; i++) K.som('ding', tCa + i * 0.5, 0.22);
      void tPr;
    },
    vacuo(B, tc) {
      // NA TELA: (1) o celular grande: o orçamento enviado e o "Gostei, vou ver e te falo 👍"; (2) o Caio sentado esperando, o contador Dia 1 → 30, um fiozinho de fumaça saindo do celular; (3) "Nada": mão na testa · MOSTRA: personagem, celular
      const tGo = B.inicio + 0.05, tPa = quando('Passou', B, 0.35), tSe = quando('semana', B, 0.5), tMe = quando('mês', B, 0.68), tNa = quando('Nada', B, 0.88);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      sentado([1.4, 1.2, 3.2]);
      // PERSONAGEM: começo feliz, faz que sim · em "Passou": olha o relógio · em "mês": cochila · em "Nada": mão na testa
      if (tc < tPa) { menino.reagir('sim', tc - B.inicio); menino.humor('feliz'); }
      else if (tc < tMe) menino.reagir('olha_relogio', tc - tPa);
      else if (tc < tNa) menino.reagir('dormindo', tc - tMe);
      else menino.reagir('mao_na_testa', tc - tNa);
      // CÂMERA: (1) chegando · perto no celular e no rosto · lado -20 · (2) em "Passou": girando · médio · lado 15 · (3) em "Nada": chegando · perto · lado -8
      if (tc < tPa) K.filmar([mais(cabecaDe(menino, 0), [0.25, -0.15, 0.25]), cabecaDe(menino, 0.25), cabecaDe(menino, -0.55)], 'chegando', pc(tc, B.inicio, tPa), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.0 });
      else if (tc < tNa) K.filmar([cabecaDe(menino, 0.85), mais(SEAT, [0.1, 0.25, 0.35])], 'girando', pc(tc, tPa, tNa), { plano: 'perto', lado: 15, angulo: 25, altura: 'olho', tam: 1.6 });
      else K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.5), mais(cabecaDe(menino, 0), [0.3, -0.2, 0.3])], 'chegando', pc(tc, tNa, B.ate), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.2 });
      // OBJETOS SE MEXENDO: a resposta chega em "Gostei"; os dias passam; a conversa solta fumaça
      const dia = Math.round(K.lerp(1, 30, pc(tc, tPa, tMe + 0.3)));
      celNaMao((c, w, h) => telaChat(c, w, h, { resp: tc > tGo + 0.15, dias: tc > tPa ? 'Dia ' + dia : '', visto: tc > tNa }), 'ch' + (tc > tGo + 0.15) + (tc > tPa ? dia : 0) + (tc > tNa), tc < tPa ? 1.9 : 1.6);
      if (tc > tPa) fx.fumC.em(mais(cel.g.position.toArray(), [0, 0.3, 0]), tc, { altura: 1.2, escala: 0.25, ritmo: 0.6, forca: 0.8, vento: [0.1, 0] });
      if (tc < tNa) fx.cont.em(cabecaDe(menino, 0.75), tc - tPa, { de: 1, ate: 30, dur: Math.max(0.6, tMe - tPa + 0.3), antes: 'Dia ', depois: '', cor: '#e8352b', tam: 0.8 });
      // EFEITOS VISUAIS: "Sem resposta" em "Nada" (o congela em preto e branco o jogo faz)
      fx.et.nada.em({ tela: [540, 400] }, tc - tNa);
      // SONS: ding da resposta · whoosh em "semana" e "mês" · errado em "Nada"
      K.som('ding', tGo, 0.5); K.som('whoosh', tSe, 0.35); K.som('whoosh', tMe, 0.35); K.som('errado', tNa + 0.05, 0.45);
    },
    buffet(B, tc) {
      // NA TELA: a frente do Buffet Pula-Pula: a placa rosa, os balões, o cartaz FESTAS INFANTIS e o cavalete "Reserva só no Zap"; a dona na calçada com o celular; o balão "Ninguém acha a gente no Google..." · MOSTRA: buffet, dona, baloes
      const tBu = quando('buffet', B, 0.15), tSi = quando('site', B, 0.62), tPr = quando('precisa', B, 0.88);
      buffetComo('BUFFET PULA-PULA', '#e8537a'); baloesEm(tc);
      // PERSONAGEM: a dona · começo olhando o celular vazio · em "precisa": mão na testa
      dona.colocar(DONA, [DONA[0] - 0.8, 1.4, 9]);
      if (tc < tPr) dona.reagir('celular', tc - B.inicio); else dona.reagir('mao_na_testa', tc - tPr);
      // CÂMERA: (1) chegando · médio · frente (a fachada inteira com a dona) · (2) em "site": passando · perto · lado 30 · baixo
      const cv = tSi - 0.1;
      if (tc < cv) K.filmar([[0.6, 3.6, 0.3], mais(DONA, [0, 0.1, 0]), [-1.4, 1.0, 0.8], cabecaDe(dona, 0.3)], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: 10, altura: 'olho', tam: 3.0 });
      else K.filmar([cabecaDe(dona, 1.0), mais(DONA, [0, 0.2, 0]), mais(DONA, [-1.2, 2.2, 0.2])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: 30, altura: 'baixo', tam: 1.9 });
      // EFEITOS VISUAIS: o balão da dona em "site" · "Sem site" em "site" · ✗
      fx.fala.em(cabecaDe(dona, 0.15), tc - tSi, { texto: 'Ninguém acha a gente no Google...', lado: -1 });
      fx.et.semSite.em({ tela: [540, 400] }, tc - tSi);
      // SONS: whoosh na troca de lugar · estalo do balão · errado
      K.som('whoosh', B.inicio, 0.4); K.som('estalo', tSi, 0.5); K.som('errado', tPr, 0.35); K.som('ding', tBu, 0.25);
    },
    rival(B, tc) {
      // NA TELA: na calçada do buffet, o outro web designer (moletom verde) chega andando rápido, bate na porta e mostra o site pronto no tablet; a dona se surpreende e fecha: aperto de mão, ✓ · MOSTRA: rival, dona, tablet
      const tOu = quando('outro', B, 0.05), tBa = quando('bate', B, 0.3), tDe = quando('desenhado', B, 0.62), tFe = quando('fecha', B, 0.88);
      buffetComo('BUFFET PULA-PULA', '#e8537a'); baloesEm(tc);
      CS.todos.buffet.porta.abrirEm(tc - tBa - 0.2, 0.5);
      // PERSONAGEM: o rival anda até a porta · em "desenhado": mostra o tablet · em "fecha": aperta a mão
      const chega = K.clamp((tc - B.inicio + 0.2) / (tBa - B.inicio + 0.5));
      rival.irPara([RIVAL_F[0] - 5, 0, 2.6], RIVAL_F, chega, tc, { olhar: cabecaDe(dona, -0.4) });
      if (chega >= 1) { if (tc > tFe) rival.reagir('mostrando', tc - tFe); else if (tc > tDe) rival.reagir('segurando', tc - tDe); else rival.reagir('chamando', tc - tBa); }
      dona.colocar(DONA, chega >= 1 ? cabecaDe(rival, -0.4) : [DONA[0] - 0.8, 1.4, 9]);
      if (tc > tFe) dona.reagir('comemorando', tc - tFe); else if (tc > tDe) dona.reagir('surpreso', tc - tDe); else dona.reagir('celular', tc - B.inicio);
      // CÂMERA: (1) passando · médio · lado 20 (ele chegando) · (2) em "desenhado": chegando · perto · lado -20 (o tablet e a dona) · (3) em "fecha": parado · médio · frente · baixo
      if (tc < tDe) K.filmar([rival, mais(DONA, [0, 1.2, 0]), mais(RIVAL_F, [0, 0.1, 0])], 'passando', pc(tc, B.inicio, tDe), { plano: 'medio', lado: 20, altura: 'olho', tam: 3.0 });
      else if (tc < tFe) K.filmar([mais(RIVAL_F, [0.35, 1.25, 0.3]), cabecaDe(dona, 0.1), cabecaDe(rival, 0)], 'chegando', pc(tc, tDe, tFe), { plano: 'perto', lado: -20, altura: 'olho', tam: 1.7 });
      else K.filmar([mais(RIVAL_F, [0, 0.1, 0]), mais(DONA, [0, 0.1, 0]), mais(DONA, [-0.7, 2.7, 0]), PLACA], 'parado', pc(tc, tFe, B.ate), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 3.2 });
      // OBJETOS SE MEXENDO: o tablet sobe na mão dele em "desenhado"
      if (tc > tDe - 0.2) {
        rival.g.updateMatrixWorld(true); const m = rival.mao(1);
        ve(tablet); tablet.position.set(m[0] + 0.1, m[1] + 0.32, m[2] + 0.15); tablet.lookAt(K.camera.position); tablet.scale.setScalar(pop(tc - tDe + 0.2));
      }
      // EFEITOS VISUAIS: ✓ em "fecha" · "Fechou com outro" em "fecha"
      fx.simb.em(mais(DONA, [-0.7, 2.4, 0]), tc - tFe, { tipo: '✓', tam: 1.2 });
      fx.et.outro.em({ tela: [540, 400] }, tc - tFe);
      if (tc > tFe) K.tremer(tc - tFe, 0.35);
      // SONS: passos · duas batidas na porta em "bate" · certo e festa em "fecha"
      for (let k = 0; k < 5; k++) K.som('passo', B.inicio + k * 0.2, 0.3);
      K.som('madeira', tBa, 0.5); K.som('madeira', tBa + 0.18, 0.5); K.som('certo', tFe, 0.6); K.som('festa', tFe + 0.1, 0.4); K.som('whoosh', tOu, 0.3);
    },
    virada(B, tc) {
      // NA TELA: o quarto cheio de fumaça cinza; o Caio abana com os braços e a fumaça vai embora; "Investir"; ele senta e digita mappoa.com (a barra em cima do monitor); a lista dos buffets infantis de Montes Claros sobe do computador · MOSTRA: personagem, navegador, tela
      const tAb = quando('abana', B, 0.05), tDe = quando('decide', B, 0.2), tIn = quando('investir', B, 0.26), tDi = quando('digita', B, 0.33);
      const tPc = quando('computador', B, 0.47), tVe = quando('Vem', B, 0.53), tLi = quando('lista', B, 0.6), tBu = quando('buffets', B, 0.68), tMo = quando('Montes', B, 0.82);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      // OBJETOS SE MEXENDO: a fumaça enche o quarto e some de "abana" até "decide"
      const forca = 1 - pc(tc, tAb + 0.3, tDe + 0.5);
      [[-2.4, 0, -1.6], [2.0, 0, -1.9], [-0.4, 0, -2.9]].forEach((p, i) => fx.fumS[i].em(p, tc + i, { altura: 3.0, escala: 0.85, ritmo: 0.3, forca, vento: [i === 1 ? -0.12 : 0.12, 0] }));
      // PERSONAGEM: em pé, abanando · em "decide": vitória · em "digita": senta e digita · em "Vem": levanta e aponta a lista
      if (tc < tDe) { menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc * 2.2); menino.humor('bravo'); }
      else if (tc < tDi) { menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.reagir('vitoria', tc - tDe); }
      else if (tc < tVe) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tLi ? TELA_Q : [1.6, 1.1, 4]); if (tc > tLi + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tVe); }
      // ENTRA AGORA: a barra em "digita", com as letras; a lista sobe do monitor em "lista"
      if (tc > tDi - 0.1) {
        ve(navG); K.entrar(navG.g, 'cresce', tc - tDi + 0.1, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
        navG.mostrar('endereco', { letras, ir: tc > tPc });
      }
      if (tc > tLi) {
        ve(telaC); const q = K.suave(K.clamp((tc - tLi) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tBu ? 1 + Math.floor((tc - tBu) / 0.22) : 0;
        telaC.mostrar('listaBuffets', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
      }
      // CÂMERA: (1) chegando · médio · lado 20 (o quarto com fumaça) · (2) "decide": subindo · perto · lado -15 · baixo · (3) "digita": por cima do ombro, perto · lado -38 · (4) "Vem": chegando · médio · frente · (5) "Montes": passando · médio · lado 18
      if (tc < tDe) K.filmar([menino, cabecaDe(menino, 0.5), mais(EM_PE, [-0.6, 1.2, -0.4])], 'chegando', pc(tc, B.inicio, tDe), { plano: 'perto', lado: 15, altura: 'olho', tam: 1.8 });
      else if (tc < tDi) K.filmar([cabecaDe(menino, 0.45), cabecaDe(menino, -0.6)], 'subindo', pc(tc, tDe, tDi), { plano: 'perto', lado: -15, altura: 'baixo', tam: 1.5 });
      else if (tc < tVe) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, tDi, tVe), { plano: 'perto', lado: -30, altura: 'olho', tam: 1.7 });
      else if (tc < tMo) K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, tVe, tMo), { plano: 'medio', lado: 'frente', altura: 'olho' });
      else K.filmar([telaC, mais(TELA_Q, [0.55, 1.35, 0.2]), menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: 18, altura: 'olho', tam: 2.6 });
      // EFEITOS VISUAIS: "Investir" de "decide" até "digita" · $ · "Montes Claros" em "Montes"
      if (tc < tDi) { fx.et.investir.em({ tela: [540, 400] }, tc - tIn); fx.simb.em(cabecaDe(menino, 0.45), tc - tIn, { tipo: '$', tam: 0.7 }); }
      fx.et.mc.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tMo);
      // SONS: whoosh a cada abanada · ding em "investir" · cliques no "digita" · brilho e bips na lista
      for (let k = 0; k < 4; k++) K.som('whoosh', tAb + k * 0.28, 0.25);
      K.som('ding', tIn, 0.5);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      K.som('brilho', tLi, 0.5); for (let k = 0; k < 4; k++) K.som('bip', tBu + k * 0.22, 0.25);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Buffet Castelinho cai do alto (a nota sobe até 93/100, as dores e as oportunidades); o robô à esquerda acenando; o Caio à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.42), tPr = quando('problema', B, 0.65), tRe = quando('resolve', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3, destaque: false });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tRe - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseBuffet', { ate: tc > tRe ? 2 : tc > tPr ? 0 : -1, score: sc });
      robo.g.position.set(-1.7, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "resolve": comemorando
      menino.colocar([1.15, 0, 1.0], tc > tRe ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tRe) menino.reagir('comemorando', tc - tRe); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.problema.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6); K.som('ding', tPr, 0.4); K.som('certo', tRe, 0.5);
      // CÂMERA: (1) chegando · médio · frente · baixo · (2) em "acha": passando · médio · lado -14 · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: na loja, o cliente vira fumaça de novo e o chapéu cai; ✗ · (2) Agora: no Buffet Castelinho, o Caio chega e entrega o orçamento pra dona; ela segura, sorri e não some; ✓ · MOSTRA: personagem, dona2, orcamento
      const tFu = quando('fumaça', B, 0.3), tAg = quando('Agora', B, 0.42), tMa = quando('manda', B, 0.55), tPr = quando('precisa', B, 0.82), tVe = quando('verdade', B, 0.92);
      if (tc < tAg) {
        // Antes: o cliente some de novo (rápido), o ✗ em cima
        const tSome = tFu - 0.05;
        const some = clienteSumindo(tc, B.inicio - 1.2, tSome, 0.35);
        // CÂMERA: (1) afastando · médio · lado -20 (diferente do gancho)
        K.filmar([mais(DONO, [0, 0.1, 0]), cabecaDe(dono, 0.4), HAT_CHAO], 'afastando', pc(tc, B.inicio, tAg), { plano: 'medio', lado: -20, altura: 'olho', tam: 2.4 });
        if (!some) { folhaNaMao(dono, orc); chapeuEm(dono, -1); } else { orcCaindo(pc(tc, tSome, tSome + 0.7), mais(DONO, [0.05, 1.1, 0.3])); chapeuEm(dono, pc(tc, tSome, tSome + 0.5)); }
        fx.simb2.em(mais(DONO, [0.6, 2.3, 0]), tc - tSome, { tipo: '✗', tam: 1.1 });
        fx.et.sumia.em({ tela: [540, 400] }, tc - tSome);
        K.som('estalo', tSome, 0.5); K.som('errado', tSome + 0.1, 0.4);
        return;
      }
      // Agora: o Buffet Castelinho; o Caio chega, entrega o orçamento; a dona segura e comemora
      buffetComo('BUFFET CASTELINHO', '#7c3aed'); baloesEm(tc);
      const chega = K.clamp((tc - tAg + 0.15) / 0.55);
      menino.irPara([CAIO_F[0] - 2.4, 0, 2.6], CAIO_F, chega, tc, { olhar: [3.2, 1.2, 4.4] });
      if (chega >= 1) menino.colocar(CAIO_F, [3.2, 1.2, 4.4]);
      dona2.colocar(DONA, chega >= 1 ? [3.7, 1.2, 4.6] : [DONA[0] - 0.8, 1.4, 9]);
      if (chega >= 1) menino.reagir(tc > tPr ? 'vitoria' : 'mostrando', tc - (tc > tPr ? tPr : tMa));
      if (tc > tPr) dona2.reagir(tc > tVe ? 'comemorando' : 'sim', tc - tPr); else dona2.reagir('surpreso', tc - tAg);
      // CÂMERA: (2) o Agora de baixo pra cima: subindo · médio · lado 25 · baixo
      { const k = K.suave(pc(tc, tAg, B.ate)); K.mirar([K.lerp(6.6, 6.2, k), K.lerp(0.55, 0.95, k), K.lerp(6.0, 5.8, k)], [2.1, K.lerp(1.15, 1.3, k), 2.2]); }
      // OBJETOS SE MEXENDO: o orçamento passa da mão dele pra mão dela de "manda" a "precisa"
      if (chega >= 1) {
        const q = K.suave(pc(tc, tMa, tMa + 0.5));
        menino.g.updateMatrixWorld(true); dona2.g.updateMatrixWorld(true);
        const a = menino.mao(1), d0 = dona2.mao(0), d1 = dona2.mao(1), d = [(d0[0] + d1[0]) / 2, (d0[1] + d1[1]) / 2 + 0.16, (d0[2] + d1[2]) / 2];
        orc.visible = true; orc.scale.setScalar(1.15);
        orc.position.set(K.lerp(a[0], d[0], q), K.lerp(a[1] + 0.15, d[1], q), K.lerp(a[2] + 0.1, d[2] + 0.1, q)); orc.lookAt(K.camera.position);
      }
      fx.simb.em(mais(DONA, [0.1, 2.5, 0]), tc - tPr, { tipo: '✓', tam: 1.2 });
      fx.et.precisa.em({ tela: [540, 400] }, tc - tPr);
      K.som('whoosh', tAg, 0.45); K.som('passo', tAg + 0.15, 0.3); K.som('passo', tAg + 0.35, 0.3); K.som('certo', tPr, 0.6); K.som('festa', tVe, 0.4);
    },
    segue(B, tc) {
      // NA TELA: o Caio de pé no quarto; o cartão de seguir entra em "Segue"; a barra com mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (pra câmera) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando · médio · frente · topo livre · (2) em "computador": parado · aberto · frente
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
      // a capa vende "Virou fumaça?": o cliente meio transparente, com a fumaça subindo, o chapéu pulando da cabeça e o orçamento na mão
      dono.colocar(DONO, [0.6, 1.3, 9]); dono.reagir('segurando', 0.4); dono.humor('assustado'); fantasma(0.5);
      fx.fumD.em([DONO[0], 0.05, DONO[2]], 4.2, { altura: 1.7, escala: 0.28, ritmo: 0.7, forca: 0.85, vento: [0.18, 0.05] });
      K.filmar([cabecaDe(dono, 0.75), mais(DONO, [0, 0.35, 0]), mais(DONO, [0.6, 1.2, 0.3])], 'parado', 0, { plano: 'perto', lado: 18, altura: 'olho', espacoCima: 0.35, tam: 1.6 });
      folhaNaMao(dono, orc);
      chapeu.visible = true; const top = cabecaDe(dono, 0.55); chapeu.position.set(top[0] + 0.12, top[1], top[2]); chapeu.rotation.set(0.25, 0.4, -0.35);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const lugar = plano === 'capa' ? 'loja' : lugarDe(B, tc);
    CS.usar(lugar);
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dono, dona, dona2, rival].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    avioes.forEach((a) => { a.visible = false; });
    menino.g.position.y = 0; fantasma(0);
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    // a cadeira encostada do lado (só no quarto; quem senta põe ela no lugar)
    if (lugar === 'quarto') { ve(cadeira); cadeira.position.set(...CAD_LADO); cadeira.rotation.set(0, 0.9, 0); }
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
