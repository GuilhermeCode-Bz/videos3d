// Chegou depois (canal Mappoa).
// Cinco lugares (K.cenarios): a fachada da Escola Fala BH (a loja salão coberta com a placa, os cartazes e o cavalete da
// escola; a porta de vidro abre e BATE, e a câmera também filma de dentro, pelo vidro), o quintal da casa do Igor (de dia
// e de tarde), a sala de aula da escola (sala_reuniao, com a TV do site novo), BH em miniatura (cidade_maquete, o Igor
// gigante) e a fachada verde-água da Speak Up Idiomas (a loja clínica coberta).
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, outro, lucia, marcio, robo, comp, cel, cadeira, telaC, telaM, navG, cal, calT, tropeiro, contrato, contratoT, tvT, tvG;
  let escFala, escSpeak, fechado, fechado2, salaFora, FOV0;
  const tudo = [], fx = {}, pinos = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, q) => [K.lerp(a[0], b[0], q), K.lerp(a[1], b[1], q), K.lerp(a[2], b[2], q)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Fachada (as duas escolas, mesmo desenho): a porta de vidro em x 1,6, fechada em z -0,08; a calçada vai até z 4,6
  const DX = 1.6, NA_PORTA = [DX, 0, 0.13], VIDRO_FECHADO = [DX, 1.75, -0.02];
  const DENTRO_OUTRO = [0.95, 0, -1.9], DENTRO_LUCIA = [2.35, 0, -1.9], CAM_DENTRO = [1.72, 1.38, -5.4];
  const CAL_FORA = [3.6, 0, 1.1], MARCIO_FORA = [0.0, 0, 1.5], CEL_FORA = [-1.15, 0, 1.3], MARCIO_DENTRO = [2.6, 0, -1.4];
  // Quintal (casa): o computador virado pra +z, a cadeira na frente; a casa fica atrás (z -11)
  const COMP = [2.4, 0, 0.0], MONITOR = [2.4, 1.185, -0.12], SEAT = [2.4, 0, 0.68];
  const EM_PE = [3.55, 0, 0.85], TELA_Q = [1.9, 1.45, 0.9], NAV = [2.55, 2.95, 0.35], CAL_Q = [1.05, 0, 0.15];
  // Sala de aula (sala_reuniao): a TV no fundo (z -4,4), a mesa comprida em z -2,5
  const TV = [0, 2.3, -4.3], CONTRATO = [0.35, 0.83, -1.95], LUCIA_S = [-1.3, 0, -0.55], OUTRO_S = [0.9, 0, -0.45], IGOR_S0 = [4.6, 0, 2.6], IGOR_S = [3.1, 0, 0.9];
  // Maquete: o Igor gigante no quarteirão do meio; o painel flutuando à esquerda; os pinos nas escolas
  const M_MQ = [0.55, 0.12, 0.75], GIG = 2.4, CAB = [0, 4.1, 0], MEIO = [0, 2.0, 0], TELA_MQ = [-2.4, 3.6, 1.6];
  const S = 3.4, PY = 3.9;
  const PINOS = [[1, -1], [-1, -1], [2, 0], [-2, 1], [1, -2], [-1, -2], [2, -1], [0, -2]].map(([i, j]) => [i * S, PY, j * S]);

  const LUGAR = {
    gancho: 'fora', igor: 'fora', procura: 'casa_tarde', achou: 'casa', fechou: 'escola', investe: 'casa', lista: 'casa',
    mappoa: 'maquete', mensagem: 'casa', antes_agora: 'fora', segue: 'casa', cartao: 'casa', capa: 'fora'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'achou') return tc < quando('outro', B, 0.5) ? 'casa' : 'fora';
    if (B.plano === 'mensagem') return tc < quando('Márcio', B, 0.55) ? 'casa' : 'fora2';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'fora' : 'fora2';
    return LUGAR[B.plano] || 'casa';
  }

  const ESCOLAS = [
    { nome: 'Escola Fala BH', end: 'Rua Pernambuco, 840', chips: ['tel', 'site'], site: true },
    { nome: 'Speak Up Idiomas', end: 'Av. do Contorno, 5200', chips: ['whats', 'site'], site: true },
    { nome: 'Hello Savassi', end: 'Rua Antônio de Albuquerque, 310', chips: ['whats', 'insta'], site: false },
    { nome: 'Idiomas Pampulha', end: 'Av. Otacílio Negrão, 1100', chips: ['tel'], site: false }
  ];
  const DIAS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];

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
  const plano = (larg, alt, px, fn, transp) => { const t = K.telaCanvas(larg, alt, px); if (transp) { t.m.material.transparent = true; } t.desenhar(fn, 'x'); return t; };

  // ---------- A cara da escola (cobre a placa, as vitrines, o ícone e o cavalete da loja do cenário) ----------
  // e = { nome, sub, cor (fundo da placa), texto, cartaz (cor do cartaz) }
  function fazEscola(e) {
    const g = new THREE.Group();
    const placa = plano(5.9, 0.78, 900, (c, w, h) => {
      rr(c, 0, 0, w, h, h * 0.2, e.cor); c.strokeStyle = e.texto; c.lineWidth = h * 0.06; c.beginPath(); c.roundRect(h * 0.05, h * 0.05, w - h * 0.1, h * 0.9, h * 0.18); c.stroke();
      txt(c, e.nome, w / 2, h * 0.53, h * 0.56, e.texto, 900, 'center', w * 0.92);
    });
    placa.m.position.set(0, 3.55, 0.25); g.add(placa.m);
    // o ícone: um balão de conversa com "ABC" (no lugar da tesoura ou do dente)
    const ic = plano(1.05, 1.05, 256, (c, w, h) => {
      c.clearRect(0, 0, w, h); c.fillStyle = e.texto; c.beginPath(); c.arc(w / 2, h * 0.45, w * 0.42, 0, 2 * PI); c.fill();
      c.beginPath(); c.moveTo(w * 0.3, h * 0.75); c.lineTo(w * 0.2, h * 0.98); c.lineTo(w * 0.52, h * 0.82); c.fill();
      txt(c, 'ABC', w / 2, h * 0.46, w * 0.28, e.cor, 900, 'center');
    }, true);
    ic.m.position.set(-3.9, 3.25, 0.62); g.add(ic.m);
    // os cartazes "MATRÍCULAS ABERTAS" nas duas vitrines
    const cartaz = (c, w, h, grande) => {
      c.fillStyle = e.cartaz; c.fillRect(0, 0, w, h);
      c.fillStyle = 'rgba(255,255,255,0.16)'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(w * (0.1 + i * 0.18), h * (i % 2 ? 0.2 : 0.85), h * 0.12, 0, 2 * PI); c.fill(); }
      if (grande) {
        txt(c, 'MATRÍCULAS', w / 2, h * 0.24, h * 0.15, '#ffffff', 900, 'center', w * 0.9);
        txt(c, 'ABERTAS', w / 2, h * 0.42, h * 0.15, '#ffd23f', 900, 'center', w * 0.9);
        ['Inglês', 'Espanhol', 'Francês'].forEach((s, i) => { rr(c, w * (0.08 + i * 0.3), h * 0.58, w * 0.26, h * 0.14, h * 0.07, '#ffffff'); txt(c, s, w * (0.21 + i * 0.3), h * 0.655, h * 0.07, e.cartaz, 900, 'center', w * 0.24); });
        txt(c, e.sub, w / 2, h * 0.86, h * 0.075, '#ffffff', 700, 'center', w * 0.9);
      } else {
        txt(c, 'Hello!', w / 2, h * 0.3, h * 0.17, '#ffffff', 900, 'center', w * 0.9);
        txt(c, '¡Hola!', w / 2, h * 0.52, h * 0.15, '#ffd23f', 900, 'center', w * 0.9);
        txt(c, 'Bonjour!', w / 2, h * 0.72, h * 0.13, '#ffffff', 900, 'center', w * 0.9);
      }
    };
    const p1 = plano(5.25, 2.5, 700, (c, w, h) => cartaz(c, w, h, true)); p1.m.position.set(-2.0, 1.78, 0.085); g.add(p1.m);
    const p2 = plano(2.1, 2.5, 300, (c, w, h) => cartaz(c, w, h, false)); p2.m.position.set(3.6, 1.78, 0.085); g.add(p2.m);
    // o cavalete da calçada (o mesmo lugar e giro do cavalete do cenário, com a frente da escola)
    const cav = new THREE.Group(); cav.position.set(DX + 2.3, 0, 1.6); cav.rotation.y = -0.35; g.add(cav);
    const q = plano(0.66, 0.86, 200, (c, w, h) => { c.fillStyle = '#2a2e33'; c.fillRect(0, 0, w, h); txt(c, 'TURMAS', w / 2, h * 0.3, w * 0.2, '#ffffff', 900, 'center'); txt(c, 'INGLÊS', w / 2, h * 0.5, w * 0.2, '#ffd23f', 900, 'center'); txt(c, 'TURMAS NOVAS', w / 2, h * 0.72, w * 0.11, '#ffffff', 800, 'center', w * 0.9); });
    q.m.position.set(0, 0.62, 0.14); q.m.rotation.x = -0.18; cav.add(q.m);
    return g;
  }

  // ---------- As telas desenhadas ----------
  // O site da Escola Fala BH (o site novo na TV, e o que o Igor acha no Google)
  function siteFala(c, w, h, novo) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, h * 0.6); d.addColorStop(0, novo ? '#e8537a' : '#c9c9c9'); d.addColorStop(1, novo ? '#7a3cf0' : '#9a9a9a');
    c.fillStyle = d; c.fillRect(0, 0, w, h * 0.6);
    txt(c, 'Escola Fala BH', w * 0.05, h * 0.09, h * 0.065, '#ffffff', 900, 'left', w * 0.5);
    ['Cursos', 'Turmas', 'Contato'].forEach((s, i) => txt(c, s, w * (0.66 + i * 0.11), h * 0.09, h * 0.035, '#ffffff', 700, 'center'));
    txt(c, 'Fale inglês', w * 0.05, h * 0.27, h * 0.1, '#ffffff', 900, 'left', w * 0.55);
    txt(c, 'em 6 meses', w * 0.05, h * 0.39, h * 0.1, '#ffd23f', 900, 'left', w * 0.55);
    if (novo) { rr(c, w * 0.05, h * 0.47, w * 0.27, h * 0.08, h * 0.04, '#ffffff'); txt(c, 'Matricule-se', w * 0.185, h * 0.51, h * 0.04, '#e8537a', 900, 'center', w * 0.25); }
    c.fillStyle = 'rgba(255,255,255,0.22)'; c.beginPath(); c.arc(w * 0.78, h * 0.36, h * 0.2, 0, 2 * PI); c.fill();
    txt(c, 'Hi!', w * 0.78, h * 0.36, h * 0.12, '#ffffff', 900, 'center');
    ['Inglês', 'Espanhol', 'Francês'].forEach((t, i) => { const x = w * (0.05 + i * 0.315); rr(c, x, h * 0.66, w * 0.28, h * 0.27, h * 0.02, '#f4f1fb'); txt(c, t, x + w * 0.14, h * 0.76, h * 0.05, '#4b2a8a', 900, 'center', w * 0.26); rr(c, x + w * 0.04, h * 0.84, w * 0.2, h * 0.025, 4, '#cfc6e8'); });
  }
  function buscaGoogle(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.08, h * 0.08, w * 0.84, h * 0.14, h * 0.07, '#f1f3f4');
    txt(c, 'escola de idiomas bh', w * 0.13, h * 0.15, h * 0.06, '#202124', 600, 'left', w * 0.75);
    for (let i = 0; i < 4; i++) { const y = h * (0.32 + i * 0.16); rr(c, w * 0.08, y, w * (0.5 + ((i + (e.n || 0)) % 3) * 0.1), h * 0.04, 4, '#1a0dab'); rr(c, w * 0.08, y + h * 0.06, w * 0.7, h * 0.03, 4, '#d0d4d9'); }
  }
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }
  function portfolio(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Igor Web', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites pra escolas e cursos', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A folha do calendário: o dia em destaque (cor: 'vermelho' | 'verde' | 'normal')
  function folhaCal(c, w, h, dia, cor) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    const topo = cor === 'verde' ? '#1faa52' : cor === 'vermelho' ? '#e8352b' : '#2f6fd6';
    c.fillStyle = topo; c.fillRect(0, 0, w, h * 0.24);
    txt(c, 'NOVEMBRO', w / 2, h * 0.12, h * 0.1, '#ffffff', 900, 'center', w * 0.9);
    txt(c, dia, w / 2, h * 0.55, h * 0.36, topo, 900, 'center', w * 0.9);
    const n = { SEG: 'segunda', TER: 'terça', QUA: 'quarta', QUI: 'quinta', SEX: 'sexta' }[dia] || '';
    txt(c, n, w / 2, h * 0.84, h * 0.1, '#5b6470', 800, 'center', w * 0.9);
    c.fillStyle = '#9aa5ae'; [0.25, 0.5, 0.75].forEach((x) => { c.beginPath(); c.arc(w * x, h * 0.02, w * 0.03, 0, 2 * PI); c.fill(); });
  }
  function celZap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Igor · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    rr(c, w * 0.05, h * 0.14, w * 0.82, h * 0.36, 16, '#ffffff');
    ['Oi, seu Márcio! Vi o site', 'da Speak Up: dá pra', 'deixar a matrícula bem', 'mais fácil pelo celular.', 'Posso te mostrar uma ideia?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.75));
    if (e.resp) {
      rr(c, w * 0.17, h * 0.56, w * 0.78, h * 0.12, 16, '#d9fdd3');
      txt(c, 'Quero um site novo!', w * 0.21, h * 0.62, w * 0.06, '#111b21', 700, 'left', w * 0.7);
    }
  }

  // ---------- O prato de feijão tropeiro (o investimento) ----------
  function fazTropeiro() {
    const g = new THREE.Group();
    const prato = K.malha(new THREE.CylinderGeometry(0.26, 0.2, 0.04, 30), K.mat(0xf6f4ee, { roughness: 0.35 })); prato.position.y = 0.02; g.add(prato);
    const aba = K.malha(new THREE.TorusGeometry(0.25, 0.012, 8, 30), K.mat(0xd9d3c4)); aba.rotation.x = PI / 2; aba.position.y = 0.04; g.add(aba);
    const monte = K.malha(new THREE.SphereGeometry(0.17, 18, 12), K.mat(0xb07a3a, { roughness: 0.9 })); monte.scale.set(1, 0.42, 1); monte.position.set(-0.03, 0.05, 0); g.add(monte);
    for (let i = 0; i < 14; i++) { const f = K.malha(new THREE.SphereGeometry(0.018, 6, 5), K.mat(0x5a3a22)); f.position.set(-0.03 + Math.cos(i * 2.1) * 0.1, 0.1 + (i % 3) * 0.008, Math.sin(i * 2.1) * 0.1); g.add(f); }
    for (let i = 0; i < 5; i++) { const cv = K.malha(new THREE.BoxGeometry(0.09, 0.01, 0.025), K.mat(0x2f8a2f)); cv.position.set(0.12 + Math.cos(i) * 0.04, 0.06, -0.08 + i * 0.035); cv.rotation.y = i * 0.7; g.add(cv); }
    const clara = K.malha(new THREE.CylinderGeometry(0.075, 0.075, 0.012, 20), K.mat(0xffffff)); clara.position.set(0.1, 0.1, 0.08); g.add(clara);
    const gema = K.malha(new THREE.SphereGeometry(0.03, 12, 8), K.mat(0xffb320)); gema.scale.set(1, 0.6, 1); gema.position.set(0.1, 0.112, 0.08); g.add(gema);
    [[-0.15, 0.1], [-0.12, -0.12], [0.02, -0.15]].forEach(([x, z], i) => { const t = K.malha(new THREE.BoxGeometry(0.06, 0.035, 0.04), K.mat(0xd99a3a)); t.position.set(x, 0.075, z); t.rotation.y = i; g.add(t); });
    [[0.05, 0.14], [-0.06, 0.15]].forEach(([x, z]) => { const l = K.malha(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 12), K.mat(0x9a3a24)); l.position.set(x, 0.07, z); g.add(l); });
    return g;
  }
  // O calendário grande num cavalete (frente pra +z): calT.desenhar(folha)
  function fazCalendario() {
    const g = new THREE.Group(), madeira = K.mat(0x8b5b35);
    [-0.4, 0.4].forEach((x) => { const p = K.malha(new THREE.BoxGeometry(0.06, 1.9, 0.06), madeira); p.position.set(x, 0.95, -0.12); p.rotation.x = 0.12; g.add(p); });
    const p3 = K.malha(new THREE.BoxGeometry(0.06, 1.8, 0.06), madeira); p3.position.set(0, 0.9, -0.42); p3.rotation.x = -0.3; g.add(p3);
    const fundo = K.malha(new THREE.BoxGeometry(0.98, 1.12, 0.05), K.mat(0x3a3f4a)); fundo.position.set(0, 1.45, -0.05); fundo.rotation.x = 0.12; g.add(fundo);
    calT = K.telaCanvas(0.9, 1.04, 360); calT.m.position.set(0, 1.45, -0.02); calT.m.rotation.x = 0.12; g.add(calT.m);
    return g;
  }
  // O contrato na mesa (deitado), com o carimbo FECHADO (k de 0 a 1)
  function contratoDesenho(c, w, h, k) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, 'CONTRATO', w / 2, h * 0.1, w * 0.12, '#1b2733', 900, 'center', w * 0.9);
    txt(c, 'Site novo · Escola Fala BH', w / 2, h * 0.19, w * 0.06, '#5b6470', 700, 'center', w * 0.9);
    for (let i = 0; i < 8; i++) rr(c, w * 0.1, h * (0.28 + i * 0.06), w * (0.55 + (i % 3) * 0.1), h * 0.018, 2, '#c3cad2');
    c.strokeStyle = '#1b2733'; c.lineWidth = 3; c.beginPath(); c.moveTo(w * 0.55, h * 0.86); c.bezierCurveTo(w * 0.65, h * 0.78, w * 0.7, h * 0.92, w * 0.85, h * 0.84); c.stroke();
    if (k > 0) {
      c.save(); c.translate(w * 0.5, h * 0.62); c.rotate(-0.25); c.scale(1 + (1 - k) * 1.5, 1 + (1 - k) * 1.5); c.globalAlpha = Math.min(1, k * 1.5);
      c.strokeStyle = '#e8352b'; c.lineWidth = w * 0.025; c.strokeRect(-w * 0.36, -h * 0.07, w * 0.72, h * 0.14);
      txt(c, 'FECHADO', 0, 0, w * 0.13, '#e8352b', 900, 'center'); c.restore();
    }
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['fachada', { loja: 'salao' }, 'fora'], ['casa', {}, 'casa'], ['casa', { hora: 'tarde' }, 'casa_tarde'], ['sala_reuniao', {}, 'escola'], ['cidade_maquete', {}, 'maquete'], ['fachada', { loja: 'clinica' }, 'fora2']]);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaEscolas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'ESCOLAS DE IDIOMAS', itens: ESCOLAS, n: e.n, sel: e.sel, total: 132, comSite: 87, semSite: 45 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Escolas de idiomas · Belo Horizonte, MG', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) {
        const y = 248 + i * 140, s = ESCOLAS[i].site;
        rr(c, w - 166, y + 12, 130, 28, 14, s ? '#e6f0ff' : '#fff4dc'); txt(c, s ? 'com site' : 'sem site', w - 101, y + 27, 16, s ? '#1454c0' : '#d97706', 800, 'center', 120);
      }
    };
    T.analiseSpeak = (c, w, h, e) => T.analise(c, w, h, {
      nome: 'Speak Up Idiomas', aderencia: e.a, ate: e.ate,
      dores: ['Site desatualizado', 'Presença digital fraca'], oportunidades: ['Site novo com matrícula pelo celular'],
      objecoes: ['"Já tenho site"'], abordagem: 'Comece pelo site: mostre como o aluno chega até a matrícula.'
    });
    T.msgSpeak = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Speak Up Idiomas', texto: 'Oi, seu Márcio! Vi o site da Speak Up Idiomas: dá pra deixar a matrícula bem mais fácil pelo celular. Faço sites pra escolas aqui em BH. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Igor (do canal), o outro web designer, a dona Lúcia, o seu Márcio e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    outro = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } });
    K.semNome(outro.g); K.nomear('outro', outro.g);
    lucia = K.personagem('dona', { cores: { blazer: 0x7a3cf0 } }); K.semNome(lucia.g); K.nomear('dona', lucia.g);
    marcio = K.personagem('dono'); K.semNome(marcio.g); K.nomear('dono', marcio.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // As duas escolas (por cima das fachadas do cenário) e a plaquinha FECHADO na porta de cada uma
    escFala = fazEscola({ nome: 'ESCOLA FALA BH', sub: 'Savassi · Belo Horizonte', cor: '#e8537a', texto: '#ffffff', cartaz: '#7a3cf0' }); guarda(escFala, 'placa_escola');
    escSpeak = fazEscola({ nome: 'SPEAK UP IDIOMAS', sub: 'Funcionários · Belo Horizonte', cor: '#ffffff', texto: '#1a8f84', cartaz: '#1a8f84' }); guarda(escSpeak, 'placa_escola');
    const plaquinha = () => K.placa('FECHADO', { larg: 0.6, alt: 0.24, fundo: '#e8352b', cor: '#ffffff', borda: '#ffffff' });
    fechado = plaquinha(); fechado.position.set(0, 1.75, 0.05); CS.todos.fora.porta.g.children[0].add(fechado); K.nomear('fechado', fechado);
    fechado2 = plaquinha(); fechado2.position.set(0, 1.75, 0.05); CS.todos.fora2.porta.g.children[0].add(fechado2);
    // a sala de dentro da loja é uma caixa com as paredes viradas pra dentro: a parede da frente tapa a porta vista de dentro, então ela some nas câmeras de dentro
    CS.todos.fora.grupo.traverse((o) => { if (!salaFora && o.isMesh && o.geometry && o.geometry.type === 'BoxGeometry' && o.material && o.material.side === THREE.BackSide) salaFora = o; });
    // os móveis do salão que aparecem pela porta (a planta tapava a dona Lúcia na câmera de dentro) ficam escondidos
    if (salaFora) salaFora.parent.children.forEach((o) => { if (o.isGroup) o.visible = false; });

    // O quintal: o computador, a cadeira, o calendário, o tropeiro, a barra e as telas do Mappoa
    comp = K.computador({ corMesa: 0xc89a5c }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2fb5a6 }); guarda(cadeira, 'cadeira', SEAT);
    cal = fazCalendario(); guarda(cal, 'calendario', CAL_Q);
    tropeiro = fazTropeiro(); guarda(tropeiro, 'tropeiro', [0, 1, 0], 1.5);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', NAV);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', TELA_MQ);

    // A sala de aula: o site novo na TV e o contrato na mesa
    tvG = new THREE.Group();
    const moldura = K.malha(new THREE.BoxGeometry(3.85, 2.2, 0.08), K.mat(0x1b1f26)); tvG.add(moldura);
    tvT = K.telaCanvas(3.7, 2.05, 900); tvT.m.position.z = 0.045; tvG.add(tvT.m);
    guarda(tvG, 'tv_site', TV);
    contratoT = K.telaCanvas(0.5, 0.66, 300); contrato = new THREE.Group(); contrato.add(contratoT.m); contratoT.m.rotation.x = -PI / 2;
    guarda(contrato, 'contrato', CONTRATO);

    // A maquete: os pinos nas escolas e o celular gigante do seu Márcio
    const gp = new THREE.Group();
    PINOS.forEach((p) => { const m = K.m3d('pino', { cor: '#e8352b', tam: 0.9 }); m.position.set(...p); gp.add(m); pinos.push(m); });
    guarda(gp, 'pinos', [0, 0, 0]);
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL_FORA);

    fx.poof = K.poof(61);
    fx.onda = K.ondaChoque();
    fx.vel = K.velocidade();
    fx.folhas = K.folhasVento(77, 40, { papel: true });
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      fechou: e('Fechou com outro', 'vermelho'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'), cara: e('Porta na cara', 'vermelho'),
      umaPor: e('Uma por uma...', 'vermelho'), sexta: e('Sexta', 'vermelho'), segunda: e('Segunda', 'verde'), siteF: e('Site fechado', 'vermelho'),
      invest: e('Investimento', 'verde'), precisa: e('Acha quem precisa de site', 'verde'), bh: e('Belo Horizonte, MG', 'azul'),
      quem: e('Quem precisa de site', 'verde'), antes: e('Antes dos outros', 'verde'), segCedo: e('Segunda cedo', 'verde'),
      depois: e('Chegava depois', 'vermelho'), primeiro: e('Primeiro', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Chega primeiro ou depois? Comenta <em>PRIMEIRO</em> ou <em>DEPOIS</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function celTela(c0, desenho, chave) { c0.userData.m3d.tela.desenhar(desenho, chave); }
  const porta = (id) => CS.todos[id].porta;
  // Alguém achatado no vidro da porta fechada (b: o boneco; k: quanto achatou, 0 a 1)
  function achatado(b, k, tc) {
    b.colocar(NA_PORTA, [DX, 1.4, -3]);
    b.g.scale.set(1 + 0.14 * k, 1 + 0.03 * k, 1 - 0.62 * k);
    b.pose({ x: -1.45, z: 0.25, c: -0.2 }, { x: -1.45, z: 0.25, c: -0.2 });
    b.humor('assustado');
  }
  // O outro de peixinho, voando pra -z (de z0 até z1, q de 0 a 1)
  function voando(q, tc) {
    const z = K.lerp(2.8, -1.7, q);
    outro.colocar([DX, 0.7 + Math.sin(q * PI) * 0.15, z], [DX, 0.7, -8]);
    outro.reagir('erguendo', 0.5); outro.humor('feliz');
    outro.g.rotation.x = -1.3;
    return [DX, 0.85, z];
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a calçada da Escola Fala BH; o outro voando de peixinho pela porta; o Igor correndo atrás; depois achatado no vidro · MOSTRA: porta, personagem
      // CENÁRIO: fachada de dia, os carros passando
      const tFe = quando('fechou', B, 0.12), tTa = quando('tarde', B, 0.9);
      const tBate = B.inicio + 0.95, c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(c2 + 0.6, tTa);
      ve(escFala);
      // OBJETOS SE MEXENDO: o outro voa pra dentro (0-0,7 s); a porta bate (0,8-0,95 s); o Igor achata no vidro (0,95 s)
      const kPorta = tc < c1 ? 1 : 1 - K.clamp((tc - c1) / 0.15);
      porta('fora').abrir(kPorta);
      fechado.visible = tc > tBate;
      if (tc >= c3) { /* de fora, perto: só o Igor caído */ }
      else if (tc < c2) {
        const q = pc(tc, B.inicio, B.inicio + 0.75);
        if (q < 1) { const p = voando(q, tc); fx.vel.em(p, tc, { rumo: PI / 2, raio: 0.6, comp: 1.8 }); }
        else { outro.colocar(DENTRO_OUTRO, DENTRO_LUCIA); outro.reagir('vitoria', tc - B.inicio - 0.75); }
      } else {
        // lá dentro: o aperto de mão
        outro.colocar(DENTRO_OUTRO, mais(DENTRO_LUCIA, [0, 1.2, 0])); outro.apontar(0.25); outro.humor('feliz');
      }
      if (tc < c3) { lucia.colocar(DENTRO_LUCIA, mais(DENTRO_OUTRO, [0, 1.2, 0])); if (tc > c2) lucia.apontar(0.25); else lucia.reagir('surpreso', tc - B.inicio); }
      // PERSONAGEM: o Igor · correndo, assustado · na batida: achatado · em "tarde": cai pra trás, triste
      if (tc < tBate) { menino.irPara([-0.2, 0, 3.0], NA_PORTA, pc(tc, B.inicio, tBate), tc, { correr: true }); menino.humor('assustado'); }
      else if (tc < c3) achatado(menino, K.clamp((tc - tBate) / 0.08), tc);
      else { menino.colocar([DX, 0, 0.25], [DX, 1.4, -3]); menino.cair(pc(tc, c3, c3 + 0.6)); menino.humor('triste'); }
      for (let k = 0; k < 4; k++) K.som('passo', B.inicio + 0.1 + k * 0.2, 0.35);
      K.som('whoosh', B.inicio + 0.02, 0.6); K.som('baque', tBate, 0.9); K.som('errado', tTa, 0.6);
      // EFEITOS VISUAIS: "Fechou com outro" em "fechou" · ✗ em "tarde"
      // CÂMERA: 4 cortes · (1) da rua, a porta e os dois · (2) de baixo, de lado, a batida · (3) DE DENTRO, o aperto de mão e o Igor no vidro · (4) de fora, perto
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(2.5, 2.2, q), 1.7, K.lerp(7.8, 7.0, q)], [0.9, 1.2, 1.0]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(-1.0, -0.8, q), 0.7, K.lerp(1.7, 1.5, q)], [1.6, 1.35, 0.05]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); if (salaFora) salaFora.visible = false; K.mirar(mais(CAM_DENTRO, [0, 0, q * 0.5]), [DX, 1.28, 0.1]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([DX + 0.5, K.lerp(2.9, 2.6, q), K.lerp(4.0, 3.6, q)], [DX, 0.6, 0.8]); }
      if (tc > tBate && tc < c2) fx.simb2.em([DX - 0.35, 2.15, 0.3], tc - tBate, { tipo: '!', tam: 0.6, som: false });
      if (tc < c3 && tc > c2) fx.et.fechou.em([DX, 0.45, -0.6], tc - Math.max(tFe, c2));
      else if (tc < c2) fx.et.fechou.em([DX - 1.0, 0.5, 1.4], tc - tFe);
      fx.simb.em([DX + 0.55, 1.6, 0.6], tc - tTa, { tipo: '✗', tam: 0.7 });
    },
    igor(B, tc) {
      // NA TELA: a calçada; o Igor caído sentado na frente da porta fechada com FECHADO · MOSTRA: personagem, porta
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.42), tP = quando('porta', B, 0.78);
      ve(escFala); fechado.visible = true;
      const ONDE = [DX - 0.2, 0, 1.15];
      // PERSONAGEM: cai sentado, tonto · em "cliente": coça a cabeça · em "porta": aponta a porta, bravo
      if (tc < tP) {
        menino.colocar(ONDE, [DX + 1.5, 1.0, 6]);
        if (tc > tC) { menino.sentar(1); menino.reagir('coca_cabeca', tc - tC); } else menino.reagir('cai_sentado', tc - B.inicio + 0.4);
      } else { menino.colocar(mais(ONDE, [0.3, 0, 0.2]), [DX, 1.5, -2]); menino.apontar(0.5); menino.humor('bravo'); }
      // OBJETOS SE MEXENDO: estrelinhas em volta da cabeça no começo
      fx.poof.em(cabecaDe(menino, 0.15), tc - B.inicio - 0.05, { escala: 0.5 });
      // EFEITOS VISUAIS: "Web designer" · "Sem cliente" · "Porta na cara"
      if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.55), tc - tD); else if (tc < tP) fx.et.semCli.em(cabecaDe(menino, 0.55), tc - tC);
      K.som('pingo', tC, 0.5); K.som('errado', tP, 0.5);
      // CÂMERA: (1) chegando, perto, frente-esquerda · (2) passando, perto, direita, na porta e nele
      if (tc < tP) K.filmar([cabecaDe(menino, 0.3), mais(ONDE, [0, 0.05, 0]), VIDRO_FECHADO], 'chegando', pc(tc, B.inicio, tP), { plano: 'perto', lado: -25, altura: 'olho', tam: 1.9 });
      else {
        K.filmar([VIDRO_FECHADO, mais(VIDRO_FECHADO, [0, 0.6, 0]), cabecaDe(menino, 0.2), mais(ONDE, [0.3, 0.05, 0.2])], 'passando', pc(tc, tP, B.ate), { plano: 'perto', lado: 30, altura: 'olho', tam: 2.0 });
        fx.et.cara.em(mais(VIDRO_FECHADO, [0, 0.55, 0.3]), tc - tP);
      }
    },
    procura(B, tc) {
      // NA TELA: o quintal de tarde; o Igor no computador com a busca; o calendário virando SEG... SEX; papéis voando · MOSTRA: personagem, calendario, monitor
      const tSe = quando('semana', B, 0.2), tG = quando('Google', B, 0.7), tU = quando('uma', B, 0.82);
      ve(comp, cal);
      // ENTRA AGORA: cada dia do calendário a partir de "semana"
      const passo = Math.max(0.25, (tG - tSe) / 5), d = tc < tSe ? 0 : Math.min(4, Math.floor((tc - tSe) / passo));
      calT.desenhar((c, w, h) => folhaCal(c, w, h, DIAS[d], d === 4 ? 'vermelho' : 'normal'), 'd' + d);
      for (let k = 0; k < 5; k++) K.som('clique', tSe + k * passo, 0.4);
      fx.folhas.em(mais(CAL_Q, [0, 0, 0]), tc - tSe, { largura: 8, forca: tc > tSe ? 0.6 : 0 });
      comp.tela.desenhar((c, w, h) => buscaGoogle(c, w, h, { n: d }), 'g' + d);
      // PERSONAGEM: digitando · em "uma": mão na testa
      sentado(MONITOR);
      if (tc > tU) menino.reagir('mao_na_testa', tc - tU); else menino.reagir('digitando', tc);
      fx.et.umaPor.em(mais(SEAT, [0.8, 2.1, 0.3]), tc - tU);
      K.som('whoosh', tSe, 0.4);
      // CÂMERA: (1) até "Google": girando, médio, esquerda · (2) afastando, médio, direita
      if (tc < tG) { const q = K.suave(pc(tc, B.inicio, tG)); K.mirar([K.lerp(0.3, 0.6, q), 1.7, K.lerp(4.6, 4.1, q)], [1.8, 1.1, 0.4]); }
      else K.filmar([cabecaDe(menino, 0.3), MONITOR, mais(SEAT, [0, 0.05, 0.3]), mais(CAL_Q, [0, 2.0, 0])], 'afastando', pc(tc, tG, B.ate), { plano: 'perto', lado: -80, altura: 'olho', tam: 1.9 });
    },
    achou(B, tc) {
      // NA TELA: (1) o quintal: o Igor comemorando, o calendário em SEX, o site da Fala BH no monitor · (2) em "outro": a calçada; o outro chegando e a porta abrindo, o calendário SEG · MOSTRA: personagem, calendario, outro
      const tSx = quando('sexta', B, 0.35), tO = quando('outro', B, 0.5), tSg = quando('segunda', B, 0.9);
      ve(cal);
      if (tc < tO) {
        ve(comp); comp.tela.desenhar((c, w, h) => siteFala(c, w, h, false), 'fala0');
        calT.desenhar((c, w, h) => folhaCal(c, w, h, 'SEX', 'vermelho'), 'sexV');
        cal.position.set(...CAL_Q);
        // PERSONAGEM: comemorando · em "sexta": a cara cai
        menino.colocar(EM_PE, tc < tSx ? [2.6, 1.2, 7] : mais(CAL_Q, [0, 1.4, 0]));
        if (tc < tSx) menino.reagir('comemorando', tc - B.inicio); else menino.reagir('triste', tc - tSx);
        fx.et.sexta.em(mais(CAL_Q, [0, 2.35, 0.1]), tc - tSx);
        fx.simb.em(mais(CAL_Q, [0.55, 1.9, 0.2]), tc - tSx, { tipo: '✗', tam: 0.6 });
        K.som('errado', tSx, 0.5);
        // CÂMERA: (1) chegando, perto, frente
        K.filmar([cabecaDe(menino, 0.3), mais(EM_PE, [0, 0.05, 0]), mais(CAL_Q, [0, 2.0, 0]), mais(CAL_Q, [0, 0.9, 0])], 'chegando', pc(tc, B.inicio, tO), { plano: 'perto', lado: 8, altura: 'olho', tam: 2.2 });
      } else {
        ve(escFala);
        calT.desenhar((c, w, h) => folhaCal(c, w, h, 'SEG', 'verde'), 'segV');
        cal.position.set(...CAL_FORA); cal.rotation.set(0, -0.3, 0);
        // OBJETOS SE MEXENDO: a porta abre pro outro em "segunda", com o sino
        const kA = porta('fora').abrirEm(tc - tSg + 0.15, 0.4);
        const q = pc(tc, tO, tSg);
        if (q < 1) outro.irPara([5.0, 0, 1.9], [DX, 0, 0.85], q, tc, { olhar: [DX, 1.3, -2] });
        else outro.irPara([DX, 0, 0.85], [DX, 0, -1.0], K.clamp(kA * pc(tc, tSg, tSg + 0.7)), tc, {});
        outro.humor('feliz');
        fx.et.segunda.em(mais(CAL_FORA, [0, 2.35, 0.1]), tc - tSg);
        fx.simb.em(mais(CAL_FORA, [0.55, 1.9, 0.2]), tc - tSg, { tipo: '✓', tam: 0.6 });
        K.som('certo', tSg + 0.1, 0.5); K.som('whoosh', tO, 0.4);
        // CÂMERA: (2) passando, médio, de fora, a porta e o outro
        K.filmar([[DX, 2.6, 0], [DX, 0.05, 0.6], mais(CAL_FORA, [0, 2.0, 0]), cabecaDe(outro, 0.2)], 'passando', pc(tc, tO, B.ate), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.7 });
      }
    },
    fechou(B, tc) {
      // NA TELA: a sala de aula; a TV com o site novo; a dona Lúcia mostrando, o outro comemorando; o contrato; o Igor chegando · MOSTRA: tv_site, dona, outro
      const tF = quando('fechado', B, 0.6), tN = quando('novo', B, 0.78);
      ve(tvG, contrato);
      tvT.desenhar((c, w, h) => siteFala(c, w, h, true), 'novo');
      contratoT.desenhar((c, w, h) => contratoDesenho(c, w, h, pc(tc, tF, tF + 0.25)), 'k' + Math.round(pc(tc, tF, tF + 0.25) * 8));
      // PERSONAGEM: a dona Lúcia mostrando a TV · o outro comemorando · o Igor chega e em "fechado" fica triste
      lucia.colocar(LUCIA_S, [0.5, 1.2, 6]); lucia.reagir('mostrando', tc - B.inicio);
      outro.colocar(OUTRO_S, [0.2, 1.2, 6]); outro.reagir(tc > tF ? 'comemorando' : 'vitoria', tc - B.inicio);
      const q = pc(tc, B.inicio, B.inicio + 1.0);
      if (q < 1) menino.irPara(IGOR_S0, IGOR_S, q, tc, { olhar: OUTRO_S }); else { menino.colocar(IGOR_S, mais(CONTRATO, [0, 0.6, 0])); menino.reagir(tc > tF ? 'triste' : 'surpreso', tc - B.inicio); }
      K.som('whoosh', B.inicio + 0.05, 0.4); K.som('baque', tF + 0.2, 0.6);
      // EFEITOS VISUAIS: "Site fechado" em "fechado" · ✓ no contrato
      fx.et.siteF.em(mais(CONTRATO, [0, 0.75, 0.2]), tc - tF);
      fx.simb.em(mais(TV, [1.5, 0.8, 0.3]), tc - B.inicio - 0.3, { tipo: '✓', tam: 0.7 });
      // CÂMERA: (1) até "fechado": chegando, médio, frente · (2) passando, perto, esquerda, no contrato e no Igor
      if (tc < tF) K.filmar([mais(TV, [-1.9, 1.1, 0]), mais(TV, [1.9, -1.0, 0]), cabecaDe(lucia, 0.2), cabecaDe(outro, 0.2), mais(LUCIA_S, [0, 0.05, 0])], 'chegando', pc(tc, B.inicio, tF), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 3.6 });
      else K.filmar([CONTRATO, cabecaDe(menino, 0.3), cabecaDe(outro, 0.2), mais(IGOR_S, [0, 0.05, 0])], 'passando', pc(tc, tF, B.ate), { plano: 'perto', lado: 25, altura: 'olho', tam: 2.4 });
    },
    investe(B, tc) {
      // NA TELA: o quintal de dia; o Igor de pé com o prato de tropeiro; o prato vai pro monitor e some · MOSTRA: personagem, tropeiro, monitor
      const tI = quando('investir', B, 0.2), tTr = quando('tropeiro', B, 0.38), tS = quando('sistema', B, 0.55), tPr = quando('precisa', B, 0.85), tSi = quando('site', B, 0.95);
      ve(comp, tropeiro);
      const k = pc(tc, tS, tS + 0.8);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tSi) }), 'inv' + Math.round(pc(tc, tS + 0.4, tSi) * 10));
      // PERSONAGEM: faz que sim · em "sistema": aponta o monitor · em "site": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [3.0, 1.3, 7]);
      if (tc > tSi) menino.reagir('comemorando', tc - tSi); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: o prato na mão em "investir"; em "sistema", desliza até o monitor girando e some num poof
      const m = menino.mao(1);
      if (tc < tS) { tropeiro.position.set(m[0] + 0.05, m[1] - 0.08, m[2] + 0.12); tropeiro.rotation.set(0, tc * 0.6, 0); tropeiro.scale.setScalar(1.5 * pop(tc - tI)); }
      else {
        const q = K.suave(k), mesaY = 0.79;
        tropeiro.position.set(K.lerp(m[0], MONITOR[0] + 0.1, q), q < 0.3 ? K.lerp(m[1] - 0.08, mesaY, q / 0.3) : mesaY + Math.max(0, (q - 0.8) * 1.5), K.lerp(m[2], MONITOR[2] + 0.18, q));
        tropeiro.rotation.set(0, q * 7, 0); tropeiro.scale.setScalar(1.5 * (1 - q * 0.8)); if (q >= 1) tropeiro.visible = false;
      }
      fx.poof.em(mais(MONITOR, [0.1, 0, 0.2]), tc - tS - 0.8, { escala: 0.8 });
      if (tc < tPr) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.precisa.em(mais(MONITOR, [0, 0.75, 0]), tc - tPr);
      K.som('ding', tTr, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.8, 0.5); K.som('certo', tSi, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), tropeiro.position.toArray()], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [tropeiro.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -10, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das escolas de idiomas de BH sobe do computador · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tE = quando('escolas', B, 0.52), tBH = quando('BH', B, 0.7);
      ve(comp, navG); comp.tela.desenhar(portfolio, 'port');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(COMP[2], TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tE ? 1 + Math.floor((tc - tE) / 0.25) : 0;
        telaC.mostrar('listaEscolas', { n: Math.min(4, n), sel: n >= 2 ? 1 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tE + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a lista
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [3.6, 1.1, 7]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.bh.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tBH);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: BH em miniatura; o Igor gigante; o painel com a análise da Speak Up; os pinos brotando nas escolas · MOSTRA: tela, pinos, personagem
      const tM = quando('Mappoa', B, 0.1), tPr = quando('precisa', B, 0.35), tDe = quando('depois', B, 0.9), tFim = Math.min(B.ate - 0.2, tPr + 0.9);
      menino.g.scale.setScalar(GIG);
      ve(telaM); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3, destaque: false });
      telaM.g.scale.setScalar(2.0); telaM.g.rotation.set(0, 0.35, 0);
      const ate = tc > tM + 0.3 ? Math.min(4, 1 + Math.floor((tc - tM - 0.3) / 0.35)) : 0;
      telaM.mostrar('analiseSpeak', { a: Math.round(pc(tc, tM, tM + 0.9) * 0.88 * 20) / 20, ate });
      // OBJETOS SE MEXENDO: os pinos brotam um por um a partir de "precisa"
      const cut = tc >= tPr;
      if (cut) pinos.forEach((p, i) => { const t0 = tPr + i * 0.09; if (tc < t0) return; ve(p.parent); p.visible = true; p.scale.setScalar(pop(tc - t0)); p.position.set(PINOS[i][0], PINOS[i][1] + Math.abs(Math.sin((tc - t0) * 5)) * 0.15, PINOS[i][2]); if (i % 2 === 0) K.som('estalo', t0, 0.25); });
      // PERSONAGEM: surpreso, olhando o painel e os pinos · em "depois": ergue os braços
      menino.colocar(M_MQ, tc > tDe ? [0.6, 1.4, 6] : cut ? PINOS[Math.min(7, Math.floor((tc - tPr) / 0.25))] : TELA_MQ);
      if (tc > tDe) menino.reagir('erguendo', tc - tDe); else if (cut) menino.apontar(0.4); else menino.reagir('surpreso', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.som('brilho', tM, 0.6); K.som('certo', tDe, 0.5);
      // CÂMERA: (1) chegando, perto, frente, alto, no painel e nele · (2) afastando, perto, esquerda, alto, nos pinos
      if (!cut) K.filmar([mais(TELA_MQ, [0, 2.4, 0]), mais(TELA_MQ, [0, -2.4, 0]), mais(M_MQ, CAB), mais(M_MQ, MEIO)], 'chegando', pc(tc, B.inicio, tPr), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.2 });
      else K.filmar([mais(M_MQ, MEIO), mais(M_MQ, CAB), PINOS[0], PINOS[1], PINOS[2]], 'afastando', pc(tc, tPr, B.ate), { plano: 'perto', lado: -20, altura: 'alto', tam: 0.85 });
      if (cut) { if (tc < tDe) fx.et.quem.em(mais(M_MQ, [0, 5.2, 0]), tc - tPr); else fx.et.antes.em(mais(M_MQ, [0, 5.2, 0]), tc - tDe); }
    },
    mensagem(B, tc) {
      // NA TELA: (1) o quintal: o calendário em SEG, o Igor apontando a mensagem pronta · (2) em "Márcio": a fachada da Speak Up, o seu Márcio com o celular gigante · MOSTRA: dono, celular
      const tSg = quando('segunda', B, 0.05), tMa = quando('mandou', B, 0.25), tMc = quando('Márcio', B, 0.55), tPe = quando('pediu', B, 0.85);
      if (tc < tMc) {
        ve(comp, cal, telaC); comp.tela.desenhar(portfolio, 'port');
        cal.position.set(...CAL_Q); calT.desenhar((c, w, h) => folhaCal(c, w, h, 'SEG', 'verde'), 'segV');
        telaC.mostrar('msgSpeak', { d: Math.round(pc(tc, tMa, tMa + 0.4) * 20) / 20 });
        // PERSONAGEM: o Igor aponta o botão de enviar
        menino.colocar([1.35, 0, 1.95], TELA_Q); if (tc > tMa) menino.apontar(0.4); else menino.reagir('sim', tc - B.inicio);
        fx.et.segCedo.em(mais(CAL_Q, [0, 2.35, 0.1]), tc - tSg);
        K.som('clique', tMa + 0.45, 0.6);
        // CÂMERA: (1) chegando, perto, frente, na tela e no Igor
        K.filmar([telaC, cabecaDe(menino, 0), mais(CAL_Q, [0, 2.0, 0])], 'chegando', pc(tc, B.inicio, tMc), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.6 });
      } else {
        ve(escSpeak, cel); cel.position.set(...CEL_FORA); cel.rotation.set(0, 0.35, 0);
        celTela(cel, (c, w, h) => celZap(c, w, h, { resp: tc > tPe }), 'z' + (tc > tPe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tMc);
        // PERSONAGEM: o seu Márcio lê, surpreso · em "pediu": comemora
        marcio.colocar(MARCIO_FORA, tc < tPe ? mais(CEL_FORA, [0, 1.3, 0]) : [1.0, 1.4, 6]);
        if (tc > tPe) marcio.reagir('comemorando', tc - tPe); else marcio.reagir('surpreso', tc - tMc);
        fx.fala.em(cabecaDe(marcio, 0.15), tc - tPe, { texto: 'Quero um site novo!' });
        K.som('pingo', tMc + 0.05, 0.6); K.som('certo', tPe, 0.6);
        // CÂMERA: (2) passando, perto, direita, no celular e no seu Márcio
        K.filmar([mais(CEL_FORA, [0, 2.0, 0]), mais(CEL_FORA, [0, 0.5, 0]), cabecaDe(marcio, 0.3)], 'passando', pc(tc, tMc, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.4 });
        fx.simb.em(mais(MARCIO_FORA, [0.4, 2.4, 0.3]), tc - tPe - 0.2, { tipo: '✓' });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a porta da Fala BH, o Igor achatado no vidro com FECHADO · (2) Agora: a porta da Speak Up abrindo pro Igor; o outro chega correndo e leva a porta na cara · MOSTRA: personagem, porta, dono
      const tA = quando('Agora', B, 0.45), tAb = quando('abre', B, 0.62), tPr = quando('primeiro', B, 0.88);
      if (tc < tA) {
        ve(escFala); fechado.visible = true;
        achatado(menino, 1, tc); menino.humor('triste');
        lucia.colocar(DENTRO_LUCIA, mais(DENTRO_OUTRO, [0, 1.2, 0])); lucia.apontar(0.25);
        outro.colocar(DENTRO_OUTRO, mais(DENTRO_LUCIA, [0, 1.2, 0])); outro.apontar(0.25);
        fx.et.depois.em([DX, 2.75, 0.5], tc - B.inicio - 0.15);
        K.som('errado', B.inicio + 0.3, 0.4);
        // CÂMERA: (1) parado, perto, de lado, na porta
        K.mirar([3.3, 1.55, 2.4], [DX - 0.1, 1.35, 0.0]);
      } else {
        ve(escSpeak);
        // OBJETOS SE MEXENDO: a porta abre com o sino em "abre"; fecha de novo na cara do outro em "primeiro"
        const tFe = Math.max(tAb + 0.9, tPr + 0.05);
        let kP = porta('fora2').abrirEm(tc - tAb, 0.4);
        if (tc > tFe) { kP = 1 - K.clamp((tc - tFe) / 0.12); porta('fora2').abrir(kP); }
        // PERSONAGEM: o Igor entra comemorando, o seu Márcio acenando lá dentro, o outro achatado no vidro
        const qI = pc(tc, tAb + 0.15, tAb + 0.85);
        if (tc < tAb + 0.15) { menino.colocar([DX, 0, 1.0], [DX, 1.3, -3]); menino.reagir('surpreso', tc - tA); }
        else if (qI < 1) menino.irPara([DX, 0, 1.0], [DX + 0.3, 0, -1.3], qI, tc, {});
        else { menino.colocar([DX + 0.3, 0, -1.3], [DX + 1, 1.3, 4]); menino.reagir('comemorando', tc - tAb - 0.85); }
        marcio.colocar(MARCIO_DENTRO, [DX, 1.3, 3]); marcio.acenar(tc);
        const tCh = tFe + 0.12;
        if (tc < tCh) outro.irPara([-3.6, 0, 2.6], NA_PORTA, pc(tc, tA, tCh), tc, { correr: true });
        else { achatado(outro, K.clamp((tc - tCh) / 0.08), tc); fx.onda.em([DX, 1.3, 0.0], tc - tCh, { raio: 1.0, som: false }); }
        fechado2.visible = false;
        fx.et.primeiro.em([DX, 2.9, 0.4], tc - tPr);
        K.som('certo', tAb + 0.3, 0.5); K.som('baque', tCh, 0.8);
        // CÂMERA: (2) chegando, médio, frente
        K.filmar([[DX, 2.8, 0], [DX, 0.05, 1.0], [DX - 1.4, 1.0, 1.6], [DX + 1.2, 1.0, -1.4]], 'chegando', pc(tc, tA, B.ate), { plano: 'perto', lado: 12, altura: 'olho', tam: 2.4 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Igor de pé no quintal; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(portfolio, 'port');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(1.2, 0, 1.4); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [3.0, 1.4, 8]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) chegando, médio, frente · (2) parado, aberto, frente, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
      else K.filmar([navG, comp, menino, robo], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(portfolio, 'port');
      robo.g.position.set(1.2, 0, 1.4); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [3.0, 1.4, 8]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino, robo], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      // de dentro da escola: o Igor achatado no vidro com FECHADO, e o aperto de mão do outro com a dona Lúcia na frente
      ve(escFala); fechado.visible = true; porta('fora').abrir(0);
      achatado(menino, 1, 0.5);
      outro.colocar(DENTRO_OUTRO, mais(DENTRO_LUCIA, [0, 1.2, 0])); outro.apontar(0.25); outro.humor('feliz');
      lucia.colocar(DENTRO_LUCIA, mais(DENTRO_OUTRO, [0, 1.2, 0])); lucia.apontar(0.25);
      if (salaFora) salaFora.visible = false; K.mirar(mais(CAM_DENTRO, [0, 0, 0.6]), [DX, 1.25, 0.1]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'fora' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, outro, lucia, marcio].forEach((b) => { b.g.visible = false; b.g.scale.set(1, 1, 1); b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    pinos.forEach((p) => { p.visible = false; });
    fechado.visible = false; fechado2.visible = false; if (salaFora) salaFora.visible = true;
    menino.g.position.y = 0; menino.humor('feliz');
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(...TELA_MQ); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1.5); cal.position.set(...CAL_Q); cal.rotation.set(0, 0.25, 0);
    tropeiro.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
