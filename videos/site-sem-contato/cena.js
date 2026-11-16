// O site sem botão de contato (canal Mappoa).
// Cinco lugares (K.cenarios): o calçadão da cidade (a PAREDE LISA GIGANTE com o site da Vidraçaria Cristal pintado e
// nenhuma porta; do lado, a parede da Vidros Ipê com a porta verde), a oficina virada vidraçaria da dona Neide, a
// cozinha do Thiago (de dia e de noite) e a central do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, cli, neide, robo, comp, cel, cadeira, telaC, telaM, navG, muro, telaMuro, porta, viz, papel, soba, vidros, placaV, balc, fone, FOV0;
  const tudo = [], fx = {}, papeis = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Calçadão (cidade, chão em y 0,14): a parede gigante do site, virada pra +z; a parede da vizinha à direita
  const Y = 0.14, MURO = [-0.5, Y, -1.6], MW = 7.5, MH = 5.6, FRENTE = -1.6 + 0.18;
  const VIZ = [4.9, Y, -1.0], VIZ_ROT = -0.45;
  const VIZ_PORTA = [VIZ[0] + Math.sin(VIZ_ROT) * 0.75, Y, VIZ[2] + Math.cos(VIZ_ROT) * 0.75];
  const NEI_R = [-3.3, Y, -0.55], PORTA = [0.4, Y, FRENTE];
  // Na parede (em metros, no mundo): a foto do box, o endereço e o lugar onde devia estar o botão
  const pW = (u, v) => [MURO[0] - MW / 2 + 0.1 + u * (MW - 0.2), Y + 0.15 + (1 - v) * (MH - 0.3), FRENTE + 0.02];
  // Vidraçaria (oficina): o cavalete de vidros, o balcão com o telefone e a dona Neide
  const VIDROS = [-0.2, 0, -3.2], BALC = [2.0, 0, -1.5], FONE = [1.6, 1.12, -1.4], NEI = [0.75, 0, -0.95], CEL_V = [-0.55, 0, -1.3], CAM_V = [0.8, 1.6, 5];
  // Cozinha do Thiago: o computador no meio da cozinha, virado pra +z; a cadeira na frente dele
  const COMP = [0.6, 0, 0.6], MONITOR = [0.6, 1.185, 0.48], SEAT = [0.6, 0, 1.28];
  const EM_PE = [1.75, 0, 1.45], TELA_Q = [0.1, 1.45, 1.5], NAV = [0.75, 2.95, 0.95];
  const PAPEL = [[0.2, 0.79, 0.5], [1.0, 0.79, 0.42], [1.2, 0, 1.2], [-0.1, 0, 1.0], [1.45, 0, 0.7], [-0.3, 0, 1.6], [1.1, 0, 2.0], [0.0, 0, 2.1], [1.6, 0, 1.75], [-0.45, 0, 0.6]];

  const LUGAR = {
    gancho: 'rua', thiago: 'cozinha', site: 'rua', rodou: 'rua', procura: 'cozinha_noite', investe: 'cozinha', lista: 'cozinha',
    mappoa: 'central', mensagem: 'cozinha', antes_agora: 'cozinha_noite', segue: 'cozinha', cartao: 'cozinha', capa: 'rua'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'thiago') return tc < quando('vidraçaria', B, 0.6) ? 'cozinha' : 'vidro';
    if (B.plano === 'mensagem') return tc < quando('Neide', B, 0.62) ? 'cozinha' : 'vidro';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.4) ? 'cozinha_noite' : 'rua';
    return LUGAR[B.plano] || 'cozinha';
  }

  const VIDRACARIAS = [
    { nome: 'Vidraçaria Cristal', end: 'Rua Bahia, 1500', chips: ['tel', 'site'], site: true },
    { nome: 'Vidros Ipê', end: 'Av. Afonso Pena, 3100', chips: ['whats', 'site'], site: true },
    { nome: 'Box & Cia Vidros', end: 'Rua Maracaju, 820', chips: ['whats', 'insta'], site: false },
    { nome: 'Pantanal Temperados', end: 'Av. Mato Grosso, 2250', chips: ['tel'], site: false }
  ];

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
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };

  // ---------- O site da vidraçaria ----------
  // Foto do box de vidro (azulejo, vidro com reflexo e o chuveiro)
  function fotoBox(c, x, y, w, h) {
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    c.fillStyle = '#e9eef2'; c.fillRect(x, y, w, h);
    c.strokeStyle = '#cfd8df'; c.lineWidth = Math.max(1, w * 0.004);
    for (let yy = y; yy < y + h; yy += h * 0.12) { c.beginPath(); c.moveTo(x, yy); c.lineTo(x + w, yy); c.stroke(); }
    for (let xx = x; xx < x + w; xx += w * 0.08) { c.beginPath(); c.moveTo(xx, y); c.lineTo(xx, y + h); c.stroke(); }
    c.fillStyle = '#9aa5ae'; c.fillRect(x + w * 0.55, y + h * 0.12, w * 0.02, h * 0.2); c.beginPath(); c.arc(x + w * 0.56, y + h * 0.33, w * 0.04, 0, PI); c.fill();
    c.fillStyle = 'rgba(150,215,235,0.45)'; c.fillRect(x + w * 0.3, y + h * 0.05, w * 0.6, h * 0.92);
    c.strokeStyle = '#7d8a94'; c.lineWidth = Math.max(2, w * 0.012); c.strokeRect(x + w * 0.3, y + h * 0.05, w * 0.6, h * 0.92); c.beginPath(); c.moveTo(x + w * 0.6, y + h * 0.05); c.lineTo(x + w * 0.6, y + h * 0.97); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.55)'; c.beginPath(); c.moveTo(x + w * 0.36, y + h * 0.1); c.lineTo(x + w * 0.42, y + h * 0.1); c.lineTo(x + w * 0.34, y + h * 0.6); c.lineTo(x + w * 0.31, y + h * 0.6); c.fill();
    c.restore();
  }
  // O site da Vidraçaria Cristal: foto, serviços, endereço... e nenhum botão. e = { falta: mostra o tracejado vazio }
  function siteVidro(c, w, h, e = {}) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#0d3b5c'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Vidraçaria Cristal', w * 0.03, h * 0.05, h * 0.05, '#ffffff', 900, 'left', w * 0.45);
    ['Início', 'Serviços', 'Galeria', 'Sobre'].forEach((s, i) => txt(c, s, w * (0.6 + i * 0.1), h * 0.05, h * 0.028, '#cfe3f2', 700, 'center'));
    fotoBox(c, 0, h * 0.1, w, h * 0.4);
    c.fillStyle = 'rgba(13,59,92,0.62)'; c.fillRect(0, h * 0.1, w * 0.5, h * 0.4);
    txt(c, 'Vidros sob medida', w * 0.04, h * 0.21, h * 0.055, '#ffffff', 900, 'left', w * 0.44);
    txt(c, 'em Campo Grande', w * 0.04, h * 0.29, h * 0.055, '#ffffff', 900, 'left', w * 0.44);
    txt(c, 'Box, janelas, espelhos e vidro temperado', w * 0.04, h * 0.37, h * 0.026, '#dbe9f3', 600, 'left', w * 0.44);
    if (e.falta) {
      c.save(); c.setLineDash([h * 0.02, h * 0.012]); c.lineWidth = h * 0.008; c.strokeStyle = '#e8352b'; c.fillStyle = 'rgba(232,53,43,0.12)';
      c.beginPath(); c.roundRect(w * 0.04, h * 0.41, w * 0.3, h * 0.07, h * 0.035); c.fill(); c.stroke(); c.restore();
      txt(c, '?', w * 0.19, h * 0.447, h * 0.055, '#e8352b', 900, 'center');
    }
    ['Box de banheiro', 'Janelas de vidro', 'Espelhos'].forEach((t, i) => {
      const x = w * (0.04 + i * 0.32), y = h * 0.54, cw = w * 0.28, ch = h * 0.26;
      rr(c, x, y, cw, ch, h * 0.015, '#f1f5f9'); fotoBox(c, x, y, cw, ch * 0.62);
      txt(c, t, x + cw * 0.06, y + ch * 0.8, h * 0.034, '#0d3b5c', 900, 'left', cw * 0.9);
    });
    c.fillStyle = '#1b2733'; c.fillRect(0, h * 0.84, w, h * 0.16);
    c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.05, h * 0.89, h * 0.016, 0, 2 * PI); c.fill();
    txt(c, 'Rua Bahia, 1500 · Campo Grande, MS', w * 0.075, h * 0.89, h * 0.03, '#ffffff', 700, 'left', w * 0.6);
    txt(c, '© Vidraçaria Cristal · Todos os direitos reservados', w * 0.04, h * 0.95, h * 0.02, '#8a98a6', 600, 'left', w * 0.8);
  }
  // A parede da vizinha (Vidros Ipê), com o botão-porta verde
  function siteIpe(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#2e7d32'; c.fillRect(0, 0, w, h * 0.12);
    txt(c, 'Vidros Ipê', w / 2, h * 0.06, h * 0.06, '#ffffff', 900, 'center', w * 0.9);
    fotoBox(c, w * 0.06, h * 0.15, w * 0.88, h * 0.25);
    txt(c, 'Orçamento na hora', w / 2, h * 0.45, h * 0.042, '#1b2733', 900, 'center', w * 0.9);
  }
  // O que o monitor mostra na frase 9: o site rolando até o fim (k de 0 a 1), sem botão
  function siteRolando(c, w, h, k) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    c.save(); c.translate(0, -k * h * 0.6); siteVidro(c, w, h * 1.6); c.restore();
  }
  function celZap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Thiago · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, dona Neide! Vi o site', 'da Vidraçaria Cristal: tá', 'bonito, mas não achei', 'onde chamar no WhatsApp.', 'Posso te mostrar uma ideia?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) {
      rr(c, w * 0.17, h * 0.56, w * 0.78, h * 0.17, 16, '#d9fdd3');
      txt(c, 'Quero um site com', w * 0.21, h * 0.61, w * 0.06, '#111b21', 700, 'left', w * 0.7);
      txt(c, 'botão de WhatsApp!', w * 0.21, h * 0.67, w * 0.06, '#111b21', 700, 'left', w * 0.7);
    }
  }
  function portfolio(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Thiago Sites', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  function buscaGoogle(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.08, h * 0.08, w * 0.84, h * 0.14, h * 0.07, '#f1f3f4');
    txt(c, 'vidraçaria campo grande', w * 0.13, h * 0.15, h * 0.06, '#202124', 600, 'left', w * 0.75);
    for (let i = 0; i < 4; i++) { const y = h * (0.32 + i * 0.16); rr(c, w * 0.08, y, w * (0.5 + ((i + (e.n || 0)) % 3) * 0.1), h * 0.04, 4, '#1a0dab'); rr(c, w * 0.08, y + h * 0.06, w * 0.7, h * 0.03, 4, '#d0d4d9'); }
  }
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }

  // ---------- A parede gigante do site ----------
  function fazMuro() {
    const g = new THREE.Group();
    const corpo = K.malha(new THREE.BoxGeometry(MW, MH, 0.35), K.mat(0xe9edf1, { roughness: 0.7 })); corpo.position.y = MH / 2; g.add(corpo);
    const topo = K.malha(new THREE.BoxGeometry(MW + 0.2, 0.18, 0.5), K.mat(0x0d3b5c)); topo.position.y = MH + 0.09; g.add(topo);
    telaMuro = K.telaCanvas(MW - 0.2, MH - 0.3, 1100); telaMuro.m.position.set(0, (MH - 0.3) / 2 + 0.15, 0.181); g.add(telaMuro.m);
    return g;
  }
  // A porta verde "Chamar no WhatsApp" (o botão do site novo). Larg × alt, com o texto
  function fazPorta(larg, alt) {
    const g = new THREE.Group();
    const moldura = K.malha(new THREE.BoxGeometry(larg + 0.16, alt + 0.08, 0.12), K.mat(0x1b5e20)); moldura.position.y = alt / 2; g.add(moldura);
    const t = K.telaCanvas(larg, alt, 300); t.m.position.set(0, alt / 2, 0.065); g.add(t.m);
    t.desenhar((c, w, h) => {
      const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, '#34e07a'); d.addColorStop(1, '#1faa52'); c.fillStyle = d; c.fillRect(0, 0, w, h);
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w / 2, h * 0.3, w * 0.22, 0, 2 * PI); c.fill();
      c.fillStyle = '#25d366'; c.beginPath(); c.arc(w / 2, h * 0.3, w * 0.17, 0, 2 * PI); c.fill();
      c.fillStyle = '#ffffff'; c.beginPath(); c.roundRect(w * 0.44, h * 0.25, w * 0.12, h * 0.1, w * 0.03); c.fill();
      txt(c, 'Chamar no', w / 2, h * 0.56, w * 0.13, '#ffffff', 900, 'center', w * 0.9);
      txt(c, 'WhatsApp', w / 2, h * 0.66, w * 0.15, '#ffffff', 900, 'center', w * 0.9);
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w * 0.82, h * 0.82, w * 0.04, 0, 2 * PI); c.fill();
    }, 'p');
    const luz = new THREE.PointLight(0x5bff9a, 0, 4); luz.position.set(0, alt * 0.6, 0.6); g.add(luz); g.userData.luz = luz;
    return g;
  }
  function fazVizinha() {
    const g = new THREE.Group(), W = 2.6, H = 3.4;
    const corpo = K.malha(new THREE.BoxGeometry(W, H, 0.3), K.mat(0xf3efe6)); corpo.position.y = H / 2; g.add(corpo);
    const t = K.telaCanvas(W - 0.16, H - 0.2, 500); t.m.position.set(0, (H - 0.2) / 2 + 0.1, 0.155); g.add(t.m);
    t.desenhar((c, w, h) => siteIpe(c, w, h), 'ipe');
    const p = fazPorta(1.1, 1.75); p.position.z = 0.16; g.add(p); g.userData.porta = p;
    return g;
  }

  // ---------- A tigela de sobá (o investimento) ----------
  function fazSoba() {
    const g = new THREE.Group();
    const louca = K.mat(0xf6f4ee, { roughness: 0.35 });
    const tig = K.malha(new THREE.CylinderGeometry(0.2, 0.12, 0.15, 28), louca); tig.position.y = 0.075; g.add(tig);
    const borda = K.malha(new THREE.TorusGeometry(0.2, 0.015, 8, 28), K.mat(0xc8241c)); borda.rotation.x = PI / 2; borda.position.y = 0.15; g.add(borda);
    const caldo = K.malha(new THREE.CylinderGeometry(0.19, 0.19, 0.01, 28), K.mat(0xa8641e, { roughness: 0.4 })); caldo.position.y = 0.14; g.add(caldo);
    for (let i = 0; i < 7; i++) { const m = K.malha(new THREE.TorusGeometry(0.05 + (i % 3) * 0.02, 0.01, 6, 16), K.mat(0xf2d27a)); m.rotation.x = PI / 2; m.position.set(Math.cos(i * 1.7) * 0.07, 0.148, Math.sin(i * 1.7) * 0.07); g.add(m); }
    [[-0.08, 0.05], [0.06, -0.08], [0.09, 0.06]].forEach(([x, z], i) => { const o = K.malha(new THREE.BoxGeometry(0.11, 0.012, 0.025), K.mat(0xffcf3a)); o.position.set(x, 0.153, z); o.rotation.y = i * 1.2; g.add(o); });
    for (let i = 0; i < 8; i++) { const v = K.malha(new THREE.CylinderGeometry(0.01, 0.01, 0.02, 6), K.mat(0x3c9a3c)); v.position.set(Math.cos(i * 0.8) * 0.12, 0.152, Math.sin(i * 0.8) * 0.12); g.add(v); }
    [-0.02, 0.02].forEach((d) => { const h = K.malha(new THREE.CylinderGeometry(0.006, 0.006, 0.42, 6), K.mat(0x8b5b35)); h.position.set(0.1 + d, 0.25, -0.02); h.rotation.z = 0.9; g.add(h); });
    return g;
  }
  // O cavalete com as placas de vidro da vidraçaria
  function fazVidros() {
    const g = new THREE.Group(), metal = K.mat(0x5b6470, { metalness: 0.5 });
    [-1, 1].forEach((s) => { const p = K.malha(new THREE.BoxGeometry(0.08, 2.3, 0.08), metal); p.position.set(s * 1.0, 1.1, -0.1); p.rotation.x = -0.15; g.add(p); });
    const base = K.malha(new THREE.BoxGeometry(2.3, 0.1, 0.6), metal); base.position.y = 0.05; g.add(base);
    for (let i = 0; i < 5; i++) {
      const v = K.malha(new THREE.BoxGeometry(1.7, 2.0, 0.02), new THREE.MeshStandardMaterial({ color: 0xa8e4f2, transparent: true, opacity: 0.32, roughness: 0.05, metalness: 0.2 }), false);
      v.position.set(0, 1.08, 0.12 + i * 0.07); v.rotation.x = -0.15; g.add(v);
    }
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['cidade', {}, 'rua'], ['oficina', {}, 'vidro'], ['cozinha', {}, 'cozinha'], ['cozinha', { hora: 'noite' }, 'cozinha_noite'], ['central_mappoa', {}, 'central']]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaVidros = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'VIDRAÇARIAS', itens: VIDRACARIAS, n: e.n, sel: e.sel, total: 118, comSite: 74, semSite: 44 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Vidraçarias · Campo Grande, MS', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = VIDRACARIAS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseVidro = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Vidraçaria Cristal', aderencia: e.a, ate: e.ate,
      dores: ['Site desatualizado', 'Presença digital fraca'], oportunidades: ['Site novo que leve o cliente pro orçamento'],
      objecoes: ['"Já tenho site"'], abordagem: 'Comece pelo site: mostre o caminho do cliente até o orçamento.'
    });
    T.msgVidro = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Vidraçaria Cristal', texto: 'Oi, dona Neide! Vi o site da Vidraçaria Cristal: tá bonito, mas não achei onde chamar no WhatsApp. Faço sites que levam o cliente direto pro orçamento. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Thiago (do canal), a dona Neide, o cliente e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    neide = K.personagem('dona'); K.semNome(neide.g); K.nomear('dona', neide.g);
    cli = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xf08a24, bermuda: 0x3b5b8c, tenis: 0xffffff, cabelo: 0x2a1a10, pele: 0xc98f62 } });
    K.semNome(cli.g); K.nomear('cliente', cli.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O calçadão: a parede do site, a porta nova, a vizinha e o papel do orçamento
    muro = fazMuro(); guarda(muro, 'muro', MURO);
    porta = fazPorta(1.5, 2.5); guarda(porta, 'porta', mais(PORTA, [0, 0, 0.02]));
    viz = fazVizinha(); viz.rotation.y = VIZ_ROT; guarda(viz, 'vizinha', VIZ);
    papel = new THREE.Group();
    const tp = K.telaCanvas(0.26, 0.34, 200); papel.add(tp.m);
    tp.desenhar((c, w, h) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h); txt(c, 'ORÇAMENTO', w / 2, h * 0.14, w * 0.12, '#0d3b5c', 900, 'center', w * 0.9); for (let i = 0; i < 7; i++) rr(c, w * 0.1, h * (0.28 + i * 0.09), w * (0.5 + (i % 3) * 0.12), h * 0.025, 2, '#b9c2cb'); txt(c, 'Box 1,20 m', w * 0.1, h * 0.9, w * 0.08, '#e8352b', 800); }, 'o');
    const tpv = tp.m.clone(); tpv.rotation.y = PI; papel.add(tpv);
    guarda(papel, 'orcamento');

    // A vidraçaria: a placa, o cavalete de vidros, o balcão com o telefone e o celular gigante
    placaV = K.placa('VIDRAÇARIA CRISTAL', { larg: 3.2, alt: 0.62, fundo: '#0d3b5c', cor: '#ffffff', borda: '#ffffff' });
    placaV.position.set(-2.2, 3.8, -4.5); guarda(placaV, 'placa_vidro');
    vidros = fazVidros(); guarda(vidros, 'vidros', VIDROS);
    balc = K.m3d('balcao', { l: 2.0, faixa: 0x0d3b5c }); guarda(balc, 'balcao', BALC);
    fone = K.m3d('telefone_fixo'); guarda(fone, 'telefone', FONE);
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL_V);

    // A cozinha: o computador, a cadeira, os papéis, o sobá, a barra e as telas do Mappoa
    comp = K.computador({ corMesa: 0xc89a5c }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2fb5a6 }); guarda(cadeira, 'cadeira', SEAT);
    const gp = new THREE.Group();
    PAPEL.forEach((p, i) => { const m = K.m3d('papel_amassado'); m.position.set(...p); m.rotation.set(i, i * 1.3, 0); m.scale.setScalar(0.8); gp.add(m); papeis.push(m); });
    guarda(gp, 'papeis', [0, 0, 0]);
    soba = fazSoba(); guarda(soba, 'soba', [0, 1, 0], 1.5);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [0, 1.65, 0.3]);

    fx.poof = K.poof(61);
    fx.fala = K.balaoFala();
    fx.pensa = K.balaoPensamento();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      semBotao: e('Sem botão de contato', 'laranja'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'),
      perde: e('Perde orçamento', 'vermelho'), foto: e('Foto', 'verde'), endereco: e('Endereço', 'verde'), botao: e('Botão de WhatsApp?', 'vermelho'),
      pagina: e('A página inteira...', 'vermelho'), outra: e('Foi pra outra', 'vermelho'), umPor: e('Um por um...', 'vermelho'),
      invest: e('Investimento', 'verde'), precisa: e('Acha quem precisa de site', 'verde'), cg: e('Campo Grande, MS', 'azul'),
      precisa2: e('Acha quem precisa de site', 'verde'), dores: e('Dores de cada empresa', 'verde'), cacando: e('Caçando cliente', 'vermelho'),
      toque: e('Com um toque', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Achava o botão ou desistia? Comenta <em>ACHAVA</em> ou <em>DESISTIA</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function celTela(c0, desenho, chave) { c0.userData.m3d.tela.desenhar(desenho, chave); }
  const MAOS_NA_PAREDE = [{ x: -1.45, z: 0.1, c: -0.2 }, { x: -1.45, z: 0.1, c: -0.2 }];
  // O cliente com as mãos na parede, andando de lado de x0 até x1 (k de 0 a 1)
  function tateia(x0, x1, k, tc, bate) {
    const x = K.lerp(x0, x1, k), p = [x, Y, FRENTE + 0.42];
    cli.colocar(p, [x, 1.6, FRENTE - 2]);
    if (k > 0 && k < 1) cli.andar(tc, 0.5);
    const v = bate ? Math.abs(Math.sin(tc * 9)) * 0.25 : 0;
    cli.pose({ ...MAOS_NA_PAREDE[0], x: -1.45 + v }, { ...MAOS_NA_PAREDE[1], x: -1.45 - v * 0.5 });
    return p;
  }
  // O papel do orçamento na mão do cliente (ou caindo no chão, com q de 0 a 1)
  function papelNaMao(q = 0) {
    ve(papel);
    const m = cli.mao(1);
    papel.position.set(m[0], K.lerp(m[1] - 0.05, Y + 0.02, q * q), m[2] + 0.05 + q * 0.3);
    papel.rotation.set(-PI / 2 * q, cli.g.rotation.y, 0.2 * q);
  }
  // Os papéis amassados: n à vista, o último caindo do alto
  function empilha(n, tUlt, tc) {
    papeis.forEach((m, i) => {
      m.visible = i < n; m.position.set(...PAPEL[i]);
      if (i === n - 1 && tUlt != null) { const q = K.clamp((tc - tUlt) / 0.3); m.position.y = PAPEL[i][1] + (1 - q * q) * 1.2; }
    });
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o calçadão; a parede lisa gigante com o site e sem porta; o cliente minúsculo com as mãos na parede · MOSTRA: muro, cliente
      // CENÁRIO: cidade de dia, os carros e o ônibus passando atrás da parede
      const tCh = quando('chamar', B, 0.62), tDe = quando('desiste', B, 0.88);
      ve(muro); telaMuro.desenhar((c, w, h) => siteVidro(c, w, h), 'v0');
      // PERSONAGEM: o cliente · mãos na parede, andando de lado · em "chamar": olha pra cima, dúvida · em "desiste": larga os braços, triste
      // OBJETOS SE MEXENDO: ele vai tateando de lado; em "desiste" o papel cai
      if (tc < tDe) {
        tateia(-1.4, 0.7, pc(tc, B.inicio, tDe), tc, tc < tCh);
        cli.humor(tc > tCh ? 'assustado' : 'bravo');
        papelNaMao(0);
        for (let k = 0; k < 6; k++) K.som('clique', B.inicio + 0.2 + k * 0.35, 0.35);
      } else {
        cli.colocar([0.7, Y, FRENTE + 0.42], [1.2, 1.4, 6]); cli.reagir('triste', tc - tDe);
        papelNaMao(pc(tc, tDe, tDe + 0.45));
      }
      // EFEITOS VISUAIS: "Sem botão de contato" em "chamar" · balão "Cadê a porta?" · ✗ em "desiste"
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6;
      fx.pensa.em(cabecaDe(cli, 0.35), tc < tCh ? tc - c2 : -1, { texto: 'Cadê a porta?' });
      if (tc < tDe + 0.1) fx.et.semBotao.em([0.2, 3.3, FRENTE + 0.4], tc - tCh);
      K.som('whoosh', B.inicio + 0.02, 0.5); K.som('ding', tCh, 0.5); K.som('errado', tDe, 0.6);
      // CÂMERA: 4 cortes · (1) a parede gigante inteira e o cliente minúsculo · (2) de baixo, rente à parede, olhando pra cima · (3) passando, de lado · (4) perto, na cara dele
      const c3 = Math.max(B.inicio + 2.4, tDe);
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(2.4, 2.0, q), 1.5, K.lerp(7.2, 6.4, q)], [-0.5, 2.7, -1.6]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)), x = cli.g.position.x; K.mirar([x + K.lerp(2.6, 2.2, q), 0.35, K.lerp(1.9, 1.5, q)], [x - 0.6, 2.4, -1.5]); }
      else if (tc < c3) K.filmar([pW(0.2, 0.15), pW(0.6, 0.6), cabecaDe(cli, 0.2), [cli.g.position.x, Y + 0.05, cli.g.position.z]], 'passando', pc(tc, c2, c3), { plano: 'medio', lado: 22, altura: 'olho', tam: 3.2 });
      else { const q = K.suave(pc(tc, c3, B.ate)), h = cabecaDe(cli, -0.1); K.mirar([K.lerp(1.9, 1.5, q), 1.7, K.lerp(3.4, 2.6, q)], [h[0] - 0.2, h[1] + 0.1, h[2]]); }
      fx.simb.em(mais(cabecaDe(cli, 0), [0.45, 0.15, 0.25]), tc - tDe, { tipo: '✗', tam: 0.7 });
    },
    thiago(B, tc) {
      // NA TELA: (1) a cozinha; o Thiago no computador com o portfólio · (2) em "vidraçaria": a dona Neide do lado do telefone mudo · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.42), tV = quando('vidraçaria', B, 0.6), tP = quando('perde', B, 0.75);
      if (tc < tV) {
        ve(comp); comp.tela.desenhar(portfolio, 'port');
        // PERSONAGEM: começo digitando · em "cliente": coça a cabeça
        sentado(MONITOR);
        if (tc > tC) menino.reagir('coca_cabeca', tc - tC); else menino.reagir('digitando', tc);
        if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else fx.et.semCli.em(cabecaDe(menino, 0.5), tc - tC);
        K.som('clique', B.inicio + 0.1, 0.4); K.som('pingo', tC, 0.5);
        // CÂMERA: (1) passando, perto, direita
        K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tV), { plano: 'perto', lado: 55, altura: 'olho', tam: 1.6 });
      } else {
        // a dona Neide cansada do lado do telefone que não toca
        ve(placaV, vidros, balc, fone);
        neide.colocar(NEI, [1.4, 1.3, 2.5]); neide.reagir('cansado', tc - tV);
        fx.et.perde.em(cabecaDe(neide, 0.55), tc - tP);
        K.som('whoosh', tV, 0.5); K.som('errado', tP, 0.4);
        // CÂMERA: (2) chegando, perto, frente, na dona Neide e no telefone
        { const q = K.suave(pc(tc, tV, B.ate)); K.mirar([K.lerp(-0.6, -0.2, q), 1.7, K.lerp(4.4, 3.8, q)], [0.95, 1.3, -1.3]); }
      }
    },
    site(B, tc) {
      // NA TELA: a parede do site de frente; a dona Neide apresentando; ✓ na foto, ✓ no endereço, o tracejado vazio do botão · MOSTRA: muro, dona, cliente
      const tF = quando('foto', B, 0.25), tE = quando('endereço', B, 0.45), tN = quando('nenhum', B, 0.62), tB = quando('botão', B, 0.72);
      ve(muro); const falta = tc > tB - 0.05 && Math.floor((tc - tB) * 4) % 2 === 0;
      telaMuro.desenhar((c, w, h) => siteVidro(c, w, h, { falta: tc > tB - 0.05 && (falta || tc > tB + 1) }), 'v' + (tc > tB - 0.05 && (falta || tc > tB + 1)));
      // PERSONAGEM: a dona Neide · mostrando a parede, orgulhosa · em "nenhum": encolhe os ombros · o cliente olha pra cima
      neide.colocar(NEI_R, tc < tN ? pW(0.3, 0.3) : [0, 1.5, 6]);
      if (tc > tN) neide.reagir('ombros', tc - tN); else neide.reagir('mostrando', tc - B.inicio);
      cli.colocar([1.4, Y, FRENTE + 0.9], pW(0.2, 0.45)); cli.reagir('duvida', tc - B.inicio);
      // EFEITOS VISUAIS: "Foto" e ✓ · "Endereço" e ✓ · "Botão de WhatsApp?" e ✗
      fx.simb.em(mais(pW(0.75, 0.3), [0, 0, 0.3]), tc - tF, { tipo: '✓', tam: 0.9 });
      fx.simb2.em(mais(pW(0.55, 0.89), [0, 0.25, 0.3]), tc - tE, { tipo: '✓', tam: 0.9 });
      fx.simb3.em(mais(pW(0.38, 0.445), [0, 0, 0.3]), tc - tB, { tipo: '✗', tam: 0.9 });
      if (tc < tE) fx.et.foto.em(mais(pW(0.75, 0.15), [0, 0, 0.3]), tc - tF);
      else if (tc < tB) fx.et.endereco.em(mais(pW(0.35, 0.75), [0, 0, 0.3]), tc - tE);
      else fx.et.botao.em(mais(pW(0.19, 0.33), [0, 0, 0.3]), tc - tB);
      K.som('certo', tF, 0.5); K.som('certo', tE, 0.5); K.som('errado', tB, 0.6);
      // CÂMERA: (1) até "endereço": chegando, médio, frente · (2) passando, perto, direita, no tracejado e no cliente
      if (tc < tE) K.filmar([pW(0.05, 0.08), pW(0.95, 0.95), cabecaDe(neide, 0.2), mais(NEI_R, [0, 0.05, 0])], 'chegando', pc(tc, B.inicio, tE), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 3.0 });
      else K.filmar([pW(0.04, 0.38), pW(0.36, 0.5), cabecaDe(cli, 0.2), [1.4, Y + 0.05, FRENTE + 0.9]], 'passando', pc(tc, tE, B.ate), { plano: 'perto', lado: 18, altura: 'olho', tam: 2.4 });
    },
    rodou(B, tc) {
      // NA TELA: o cliente anda a parede inteira tateando; a parede da Vidros Ipê com a porta verde; ele vai pra lá · MOSTRA: cliente, vizinha
      const tPa = quando('página', B, 0.2), tCh = quando('chamou', B, 0.5), tL = quando('lado', B, 0.85);
      ve(muro, viz); telaMuro.desenhar((c, w, h) => siteVidro(c, w, h), 'v0');
      // PERSONAGEM: andando de lado, tateando · em "chamou": corre pra porta verde e comemora
      let pos;
      if (tc < tCh) { pos = tateia(-3.4, 2.6, pc(tc, B.inicio, tCh), tc, false); cli.humor('cansado'); papelNaMao(0); }
      else {
        const k = pc(tc, tCh, tCh + 0.7);
        if (k < 1) { cli.irPara([2.6, Y, FRENTE + 0.42], VIZ_PORTA, k, tc, { reto: true }); papelNaMao(0); }
        else { cli.colocar(VIZ_PORTA, mais(VIZ, [0, 1.2, 0])); cli.apontar(0.5); papelNaMao(0); if (tc > tL) cli.reagir('comemorando', tc - tL); }
        pos = cli.g.position.toArray();
      }
      // OBJETOS SE MEXENDO: a porta verde da vizinha brilha em "chamou"
      viz.userData.porta.userData.luz.intensity = tc > tCh ? 2.5 : 0;
      for (let k = 0; k < 6; k++) K.som('passo', B.inicio + 0.15 + k * 0.3, 0.3);
      // EFEITOS VISUAIS: "A página inteira..." em "página" · "Foi pra outra" em "lado"
      if (tc < tL) fx.et.pagina.em(mais(pos, [0, 2.3, 0]), tc - tPa); else fx.et.outra.em(mais(VIZ_PORTA, [0, 2.6, 0.2]), tc - tL);
      K.som('whoosh', tCh, 0.5); K.som('pingo', tL, 0.6);
      // CÂMERA: (1) acompanhando de lado · (2) chegando, perto, na porta verde e no cliente
      if (tc < tCh) K.filmar([mais(pos, [0, 1.9, 0]), mais(pos, [0, 0.05, 0]), mais(pos, [-1.4, 1.0, -0.4]), mais(pos, [1.4, 1.0, -0.4])], 'passando', pc(tc, B.inicio, tCh), { plano: 'medio', lado: 8, altura: 'olho', tam: 2.4 });
      else K.filmar([mais(VIZ, [0, 3.3, 0]), mais(VIZ_PORTA, [0, 0.1, 0]), cabecaDe(cli, 0.2), [2.6, Y + 1, FRENTE + 0.5]], 'chegando', pc(tc, tCh, B.ate), { plano: 'perto', lado: -10, altura: 'olho', tam: 2.8 });
    },
    procura(B, tc) {
      // NA TELA: a cozinha de noite; o Thiago no computador, a busca no Google; os papéis amassados se acumulando · MOSTRA: personagem, papeis, monitor
      const tU = quando('um', B, 0.3), tPo = quando('por', B, 0.45), tCz = quando('cozinha', B, 0.88);
      ve(comp, papeis[0].parent);
      // ENTRA AGORA: um papel a cada clique, a partir de "um"
      const passo = Math.max(0.16, (tCz - tU) / PAPEL.length), n = tc > tU ? Math.min(PAPEL.length, 1 + Math.floor((tc - tU) / passo)) : 0;
      empilha(n, n ? tU + (n - 1) * passo : null, tc);
      for (let k = 0; k < PAPEL.length; k++) K.som('clique', tU + k * passo, 0.3);
      comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n }), 'g' + n);
      // PERSONAGEM: digitando · em "cozinha": cansado, mão na testa
      sentado(MONITOR);
      if (tc > tCz) menino.reagir('mao_na_testa', tc - tCz); else menino.reagir('digitando', tc);
      fx.et.umPor.em(mais(SEAT, [0.9, 2.1, 0.3]), tc - tU);
      // CÂMERA: (1) até "por": girando, médio, esquerda · (2) afastando, médio, nos papéis
      if (tc < tPo) { const q = K.suave(pc(tc, B.inicio, tPo)); K.mirar([K.lerp(-1.2, -0.8, q), 1.75, K.lerp(-0.5, -0.8, q)], [0.75, 1.05, 1.15]); }
      else { const q = K.suave(pc(tc, tPo, B.ate)); K.mirar([K.lerp(3.2, 2.9, q), 2.1, K.lerp(-1.5, -1.1, q)], [0.75, 0.6, 1.35]); }
    },
    investe(B, tc) {
      // NA TELA: a cozinha de dia; o Thiago de pé com a tigela de sobá; a tigela vai pro monitor e some · MOSTRA: personagem, soba, monitor
      const tI = quando('investir', B, 0.2), tSb = quando('sobá', B, 0.38), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      ve(comp, soba);
      const k = pc(tc, tS, tS + 0.8);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10));
      // PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [1.9, 1.3, 7]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: a tigela na mão em "investir"; em "sistema", desliza pela mesa até o monitor, girando, e some num poof
      const m = menino.mao(1);
      if (tc < tS) { soba.position.set(m[0] + 0.05, m[1] - 0.08, m[2] + 0.12); soba.rotation.set(0, tc * 0.6, 0); soba.scale.setScalar(1.5 * pop(tc - tI)); }
      else {
        const q = K.suave(k), mesaY = 0.79;
        soba.position.set(K.lerp(m[0], MONITOR[0] + 0.1, q), q < 0.3 ? K.lerp(m[1] - 0.08, mesaY, q / 0.3) : mesaY + Math.max(0, (q - 0.8) * 1.5), K.lerp(m[2], MONITOR[2] + 0.18, q));
        soba.rotation.set(0, q * 7, 0); soba.scale.setScalar(1.5 * (1 - q * 0.8)); if (q >= 1) soba.visible = false;
      }
      fx.poof.em(mais(MONITOR, [0.1, 0, 0.2]), tc - tS - 0.8, { escala: 0.8 });
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.75, 0]), tc - tPr);
      K.som('ding', tSb, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.8, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), soba.position.toArray()], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [soba.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -10, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das vidraçarias de Campo Grande sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tV = quando('vidraçarias', B, 0.52), tCG = quando('Campo', B, 0.65);
      ve(comp, navG); comp.tela.desenhar(portfolio, 'port');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tV ? 1 + Math.floor((tc - tV) / 0.25) : 0;
        telaC.mostrar('listaVidros', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tV + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a Vidraçaria Cristal
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [2.6, 1.1, 7]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.cg.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCG);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: a central do Mappoa; a análise da Vidraçaria Cristal com as dores; o robô e o Thiago · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tA = quando('acha', B, 0.25), tDo = quando('dores', B, 0.65), tFim = Math.min(B.ate - 0.25, tDo + 0.7);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3 });
      const ate = tc > tA ? Math.min(4, 1 + Math.floor((tc - tA) / Math.max(0.2, (tFim - tA) / 3))) : 0;
      telaM.mostrar('analiseVidro', { a: Math.round(pc(tc, tM, tA + 0.4) * 0.86 * 20) / 20, ate });
      for (let k = 0; k < 4; k++) K.som('bip', tA + k * Math.max(0.2, (tFim - tA) / 3), 0.35);
      K.som('certo', tFim, 0.5);
      robo.g.position.set(-1.9, 0, 0.9); robo.g.rotation.y = 0.5; robo.em(tc, { acena: tc < tDo ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · no fim: comemorando
      menino.colocar([1.5, 0, 1.2], tc > tFim ? [0.6, 1.4, 6] : [0, 1.6, 0.3]);
      if (tc > tFim) menino.reagir('comemorando', tc - tFim); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      if (tc < tDo) fx.et.precisa2.em([0, 3.2, 0.5], tc - tA); else fx.et.dores.em([0, 3.2, 0.5], tc - tDo);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) passando, médio, esquerda
      if (tc < tDo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tDo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tDo, B.ate), { plano: 'medio', lado: -16, altura: 'olho', tam: 2.0 });
    },
    mensagem(B, tc) {
      // NA TELA: (1) o site da Vidraçaria Cristal rolando no monitor · (2) em "manda": a mensagem pronta · (3) em "Neide": a dona Neide com o celular gigante · MOSTRA: dona, celular
      const tCo = quando('confere', B, 0.08), tMa = quando('manda', B, 0.3), tNe = quando('Neide', B, 0.62), tPe = quando('pede', B, 0.75);
      if (tc < tNe) {
        ve(comp);
        if (tc < tMa) {
          // o site rolando até o fim: nenhum botão
          const k = Math.round(pc(tc, B.inicio, tMa - 0.1) * 12) / 12;
          comp.tela.desenhar((c, w, h) => siteRolando(c, w, h, k), 'rola' + k);
          sentado(MONITOR); menino.reagir('duvida', tc - B.inicio);
          fx.simb2.em(cabecaDe(menino, 0.3), tc - tCo, { tipo: '?' });
          K.filmar([MONITOR, mais(MONITOR, [0, 0.3, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tMa), { plano: 'perto', lado: 150, altura: 'olho', tam: 1.1 });
        } else {
          comp.tela.desenhar(portfolio, 'port');
          ve(telaC); telaC.mostrar('msgVidro', { d: Math.round(pc(tc, tMa, tMa + 0.4) * 20) / 20 });
          // PERSONAGEM: o Thiago aponta o botão de enviar
          menino.colocar([1.4, 0, 1.95], TELA_Q); menino.apontar(0.4);
          K.som('clique', tMa + 0.45, 0.6);
          K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, tMa, tNe), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
        }
      } else {
        ve(placaV, vidros, balc, fone, cel); cel.position.set(...CEL_V);
        cel.rotation.set(0, 0.35, 0);
        celTela(cel, (c, w, h) => celZap(c, w, h, { resp: tc > tPe }), 'z' + (tc > tPe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tNe);
        // PERSONAGEM: a dona Neide lê, surpresa · em "pede": comemora
        neide.colocar(NEI, tc < tPe ? mais(CEL_V, [0, 1.3, 0]) : CAM_V);
        if (tc > tPe) neide.reagir('comemorando', tc - tPe); else neide.reagir('surpreso', tc - tNe);
        fx.fala.em(cabecaDe(neide, 0.15), tc - tPe, { texto: 'Quero um site com botão de WhatsApp!' });
        K.som('pingo', tNe + 0.05, 0.6); K.som('certo', tPe, 0.6);
        // CÂMERA: (3) passando, perto, direita, no celular e na dona Neide
        K.filmar([mais(CEL_V, [0, 2.0, 0]), mais(CEL_V, [0, 0.5, 0]), cabecaDe(neide, 0.3)], 'passando', pc(tc, tNe, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.4 });
        fx.simb.em(mais(NEI, [0.3, 2.4, 0.3]), tc - tPe - 0.2, { tipo: '✓' });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Thiago de noite com os papéis · (2) Agora: a parede do site com a porta verde; o cliente toca; o Thiago e a dona Neide dos lados · MOSTRA: personagem, dona, porta
      const tA = quando('Agora', B, 0.4), tCh = quando('chama', B, 0.78), tTo = quando('toque', B, 0.9);
      if (tc < tA) {
        ve(comp, papeis[0].parent); comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n: 3 }), 'g3'); empilha(PAPEL.length, null, tc);
        sentado(MONITOR); menino.reagir('mao_na_testa', tc - B.inicio);
        fx.et.cacando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.4, 0.1, 0.8]), [1.6, 0.1, 2.0]], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 35, altura: 'olho', tam: 1.8 });
      } else {
        // ENTRA AGORA: a porta verde cresce na parede · OBJETOS SE MEXENDO: acende no toque
        ve(muro, porta); telaMuro.desenhar((c, w, h) => siteVidro(c, w, h), 'v0');
        porta.scale.set(1, pop(tc - tA), 1);
        porta.userData.luz.intensity = tc > tTo - 0.1 ? 3 : 0;
        const PC = [PORTA[0], Y, FRENTE + 0.55], TH = [PORTA[0] + 1.6, Y, FRENTE + 1.0], NE = [PORTA[0] - 1.6, Y, FRENTE + 1.0];
        cli.colocar(PC, tc < tTo + 0.3 ? mais(PORTA, [0, 1.3, -1]) : [0.4, 1.4, 6]);
        if (tc < tTo + 0.3) cli.apontar(0.4); else cli.reagir('comemorando', tc - tTo - 0.3);
        menino.colocar(TH, [0.4, 1.4, 6]); menino.reagir('vitoria', tc - tA);
        neide.colocar(NE, [0.4, 1.4, 6]); neide.reagir('aplaudindo', tc - tA);
        fx.et.toque.em(mais(PORTA, [0, 3.0, 0.4]), tc - tTo);
        K.som('whoosh', tA, 0.4); K.som('pingo', tTo, 0.6); K.som('certo', tTo + 0.2, 0.5);
        K.filmar([mais(PORTA, [0, 2.7, 0]), mais(TH, [0, 0.1, 0]), mais(NE, [0, 0.1, 0]), cabecaDe(cli, 0.2)], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.1 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Thiago de pé na cozinha; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(portfolio, 'port');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-0.6, 0, 2.0); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [1.9, 1.4, 8]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino, robo], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(portfolio, 'port');
      robo.g.position.set(-0.6, 0, 2.0); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [1.9, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // o cliente desesperado, de mãos na parede gigante do site, sem porta
      ve(muro); telaMuro.desenhar((c, w, h) => siteVidro(c, w, h), 'v0');
      cli.colocar([0.5, Y, FRENTE + 0.8], [1.8, 1.4, 4.4]); cli.reagir('mao_na_testa', 0.6); cli.humor('assustado');
      papelNaMao(0);
      K.mirar([1.7, 1.25, 3.9], [-0.1, 2.0, -1.6]);
      fx.simb.em(cabecaDe(cli, 0.3), 1, { tipo: '?', som: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cli, neide].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0; cli.humor('feliz'); menino.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(0, 1.65, 0.3); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1.5); porta.scale.set(1, 1, 1); porta.userData.luz.intensity = 0;
    if (viz.userData.porta) viz.userData.porta.userData.luz.intensity = 0;
    soba.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
