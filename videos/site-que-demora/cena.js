// O site que demora pra abrir (canal Mappoa).
// Três lugares (K.cenarios): o calçadão entre prédios com a AUTOESCOLA (o telão "Carregando... 3%" e o aluno que virou
// esqueleto esperando), o quarto do Léo (de dia e de noite) e o palco do Mappoa.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, aluno, rita, robo, comp, cel, desp, cadeira, abas, lanche, telao, esq, carro, telaC, telaM, navG, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const fr = (i) => { const s = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return s - Math.floor(s); };

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Léo no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], ABAS = [1.2, 0, -1.0], DESP = [-0.08, 0.76, -1.2];
  // Calçadão: DZ = logo depois de uma árvore da direita, perto da loja; o telão no meio, o esqueleto na frente
  let DZ = -5, TEL = [-0.35, 2.4, -6.2], ESQ = [0.45, 0, -5], RITA = [0.75, 0, -5], CEL_R = [-0.2, 0, -4.5], ALU = [0.75, 0, -3.7], CARRO = [-1.5, 0, -5.1];
  const TW = 3.6, TH = 2.2;

  const LUGAR = {
    gancho: 'rua', leo: 'quarto', site: 'rua', aluno: 'rua', procura: 'quarto_noite', investe: 'quarto', lista: 'quarto',
    mappoa: 'mundo_mappoa', mensagem: 'quarto', antes_agora: 'quarto_noite', segue: 'quarto', cartao: 'quarto', capa: 'rua'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'leo') return tc < quando('autoescola', B, 0.55) ? 'quarto' : 'rua';
    if (B.plano === 'mensagem') return tc < quando('dona', B, 0.45) ? 'quarto' : 'rua';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'quarto_noite' : 'rua';
    return LUGAR[B.plano] || 'quarto';
  }

  const AUTOS = [
    { nome: 'Autoescola Via Certa', end: 'Av. T-63, 1180 · Goiânia', chips: ['tel', 'site'] },
    { nome: 'CFC Bueno Direção', end: 'Rua T-37, 455 · Setor Bueno', chips: ['whats', 'site'] },
    { nome: 'Autoescola Marista', end: 'Av. 85, 2010 · Setor Marista', chips: ['tel', 'site', 'insta'] },
    { nome: 'CFC Campinas Trânsito', end: 'Av. Anhanguera, 6620', chips: ['whats', 'site'] }
  ];
  const ABAS_TXT = ['CFC Centro', 'Autoescola Pista', 'CFC Avenida', 'Autoescola Rota', 'CFC Sul', 'Auto Fácil', 'CFC Norte', 'Via Rápida'];

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
  // Rodinha de carregando: arco grosso girando
  function rodinha(c, x, y, r, ang, cor = '#2f6fd6') {
    c.lineCap = 'round'; c.lineWidth = r * 0.28;
    c.strokeStyle = '#e3e8ef'; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke();
    c.strokeStyle = cor; c.beginPath(); c.arc(x, y, r, ang, ang + 1.9); c.stroke();
  }
  function barraUrl(c, w, h, url, alt) {
    c.fillStyle = '#e9edf2'; c.fillRect(0, 0, w, alt);
    rr(c, w * 0.04, alt * 0.2, w * 0.92, alt * 0.6, alt * 0.3, '#ffffff');
    txt(c, url, w * 0.08, alt / 2, alt * 0.32, '#4b5563', 600, 'left', w * 0.84);
  }

  // ---------- O esqueleto (o aluno que cansou de esperar) ----------
  // Cada parte guarda o lugar de pé (p0, q0) e onde cai no chão (pT, qT); e.em(tc, tDesmonta) monta ou desmonta
  function fazEsqueleto() {
    const g = new THREE.Group(), partes = [];
    const osso = K.mat(0xf1e8d2, { roughness: 0.65 }), escuro = K.mat(0x2a2320, { roughness: 0.9 });
    const add = (m, deitado) => { g.add(m); partes.push({ m, p0: m.position.clone(), q0: m.quaternion.clone(), deitado }); return m; };
    const up = V(0, 1, 0);
    function ossoEntre(a, b, r) {
      const A = V(...a), Bv = V(...b), d = Bv.clone().sub(A), len = d.length();
      const m = K.malha(new THREE.CylinderGeometry(r, r * 0.9, len, 10), osso);
      [-1, 1].forEach((s) => { const n = K.malha(new THREE.SphereGeometry(r * 1.55, 10, 8), osso); n.position.y = (s * len) / 2; m.add(n); });
      m.position.copy(A).add(Bv).multiplyScalar(0.5); m.quaternion.setFromUnitVectors(up, d.normalize());
      return add(m, true);
    }
    // Crânio com os olhos fundos, o nariz, os dentes e o queixo (que cai)
    const cr = new THREE.Group(); cr.position.set(0, 1.47, 0);
    const caixa = K.malha(new THREE.SphereGeometry(0.2, 22, 16), osso); caixa.scale.set(0.95, 1.05, 1.05); cr.add(caixa);
    [-1, 1].forEach((s) => { const o = K.malha(new THREE.SphereGeometry(0.058, 14, 10), escuro, false); o.position.set(s * 0.078, 0.01, 0.168); o.scale.z = 0.5; cr.add(o); });
    const nariz = K.malha(new THREE.ConeGeometry(0.03, 0.05, 3), escuro, false); nariz.position.set(0, -0.06, 0.2); nariz.rotation.x = PI; cr.add(nariz);
    const dentes = K.malha(new THREE.BoxGeometry(0.15, 0.035, 0.03), K.mat(0xfffcf2)); dentes.position.set(0, -0.13, 0.16); cr.add(dentes);
    const queixo = new THREE.Group(); queixo.position.set(0, -0.12, 0.03); cr.add(queixo);
    const qm = K.malha(new THREE.BoxGeometry(0.17, 0.05, 0.16), osso); qm.position.set(0, -0.04, 0.07); queixo.add(qm);
    const dentesB = dentes.clone(); dentesB.position.set(0, -0.01, 0.135); queixo.add(dentesB);
    add(cr, false);
    // Coluna, ombros, bacia e costelas
    ossoEntre([0, 1.3, -0.02], [0, 0.88, -0.04], 0.03);
    ossoEntre([-0.2, 1.23, 0], [0.2, 1.23, 0], 0.022);
    const bacia = K.malha(new THREE.TorusGeometry(0.12, 0.035, 10, 20), osso); bacia.position.set(0, 0.86, 0); bacia.rotation.x = PI / 2; bacia.scale.set(1.15, 0.8, 1); add(bacia, false);
    [1.17, 1.1, 1.03, 0.96].forEach((y, i) => {
      const r = 0.15 - i * 0.012, c = K.malha(new THREE.TorusGeometry(r, 0.016, 8, 24, PI * 1.6), osso);
      c.position.set(0, y, 0.02); c.rotation.set(PI / 2, 0, -0.3 * PI); add(c, false);
    });
    // Braços dobrados segurando o celular na frente do peito
    const MAO = [0, 1.02, 0.27];
    [-1, 1].forEach((s) => {
      ossoEntre([s * 0.21, 1.22, 0], [s * 0.25, 0.94, 0.03], 0.022);
      ossoEntre([s * 0.25, 0.94, 0.03], [s * 0.07, MAO[1], MAO[2] - 0.02], 0.018);
      ossoEntre([s * 0.09, 0.84, 0], [s * 0.1, 0.46, 0.02], 0.028);
      ossoEntre([s * 0.1, 0.46, 0.02], [s * 0.1, 0.07, 0.0], 0.022);
      const pe = K.malha(new THREE.BoxGeometry(0.08, 0.04, 0.17), osso); pe.position.set(s * 0.1, 0.03, 0.06); add(pe, false);
    });
    // O celular nas mãos, com a rodinha
    const celM = new THREE.Group(); celM.position.set(...MAO); celM.rotation.x = -0.75;
    celM.add(K.malha(new THREE.BoxGeometry(0.1, 0.19, 0.016), K.mat(0x1e1f22)));
    const tl = K.telaCanvas(0.088, 0.17, 120); tl.m.position.z = 0.009; celM.add(tl.m);
    tl.desenhar((c, w, h) => { c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); rodinha(c, w / 2, h / 2, w * 0.22, 1.2); }, 'rod');
    add(celM, false);
    // Teia de aranha entre o crânio e o ombro (fica até desmontar)
    const teia = new THREE.Group();
    const lm = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const fio = (pts) => teia.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts.map((p) => V(...p))), lm));
    const teiaEm = (cx, cy, cz, r, giro) => {
      const raios = 7;
      for (let k = 0; k < raios; k++) { const a = giro + (k / raios) * PI * 2; fio([[cx, cy, cz], [cx + Math.cos(a) * r, cy + Math.sin(a) * r, cz]]); }
      [0.35, 0.65, 1].forEach((f) => { const pts = []; for (let k = 0; k <= raios; k++) { const a = giro + (k / raios) * PI * 2; pts.push([cx + Math.cos(a) * r * f, cy + Math.sin(a) * r * f, cz]); } fio(pts); });
    };
    teiaEm(-0.22, 1.36, 0.02, 0.13, 0.3); teiaEm(0.0, 0.62, 0.03, 0.1, 0); teiaEm(0.2, 1.08, 0.12, 0.08, 0.5);
    g.add(teia);
    // Onde cada parte cai: espalhada em volta, deitada; o crânio rola pra frente
    const qTmp = new THREE.Quaternion();
    partes.forEach((p, i) => {
      const cranio = p.m === cr;
      p.pT = V(p.p0.x * 1.8 + (fr(i) - 0.5) * 0.7 + (cranio ? 0.55 : 0), cranio ? 0.2 : 0.05 + fr(i + 9) * 0.03, p.p0.z + (fr(i + 3) - 0.3) * 0.7 + (cranio ? 0.45 : 0));
      qTmp.setFromEuler(new THREE.Euler(p.deitado ? PI / 2 : (fr(i + 5) - 0.5) * 0.8, fr(i + 7) * 3, (fr(i + 11) - 0.5) * 0.6));
      p.qT = qTmp.clone();
      p.atraso = cranio ? 0.22 : fr(i + 13) * 0.18;
    });
    const qm2 = new THREE.Quaternion();
    return {
      g, cranio: cr, queixo, cel: celM, teia,
      // queixo: 0 fechado, 1 caído · tD: instante em que desmonta (null = de pé)
      em(tc, op = {}) {
        queixo.rotation.x = (op.queixo || 0) * 0.55 + Math.sin(tc * 9) * 0.02 * (op.queixo || 0);
        celM.rotation.z = 0;
        let caiu = false;
        partes.forEach((p, i) => {
          const dt = op.tD == null ? -1 : tc - op.tD - p.atraso;
          if (dt <= 0) {
            p.m.position.copy(p.p0); p.m.quaternion.copy(p.q0);
            if (op.tD == null && p.m === cr) p.m.rotation.z = Math.sin(tc * 2) * 0.04;
            return;
          }
          caiu = true;
          const y0 = p.p0.y - p.pT.y, T = Math.sqrt((2 * Math.max(0.05, y0)) / 12), q = K.clamp(dt / T);
          p.m.position.set(K.lerp(p.p0.x, p.pT.x, q), Math.max(p.pT.y, p.p0.y - 0.5 * 12 * dt * dt), K.lerp(p.p0.z, p.pT.z, q));
          if (p.m === cr && dt > T) { const r = K.clamp((dt - T) / 0.6); p.m.position.x += K.suave(r) * 0.35; p.m.rotation.set(0, 0, -K.suave(r) * 2.2); }
          else { qm2.copy(p.q0).slerp(p.qT, K.suave(q)); p.m.quaternion.copy(qm2); }
          if (op.quica && i === 0) void 0;
        });
        teia.visible = !caiu;
        return caiu;
      },
      batida(tD, i) { const p = partes[i]; return tD + p.atraso + Math.sqrt((2 * Math.max(0.05, p.p0.y - p.pT.y)) / 12); },
      n: partes.length
    };
  }

  // ---------- O lanche (o investimento) ----------
  function fazLanche() {
    const g = new THREE.Group();
    const pao = K.mat(0xd9984a, { roughness: 0.7 });
    const b = K.malha(new THREE.CylinderGeometry(0.13, 0.12, 0.05, 20), pao); b.position.y = 0.025; g.add(b);
    const carne = K.malha(new THREE.CylinderGeometry(0.135, 0.135, 0.045, 20), K.mat(0x5a3020)); carne.position.y = 0.07; g.add(carne);
    const queijo = K.malha(new THREE.BoxGeometry(0.25, 0.012, 0.25), K.mat(0xffc93c)); queijo.position.y = 0.097; queijo.rotation.y = PI / 4; g.add(queijo);
    const alface = K.malha(new THREE.CylinderGeometry(0.148, 0.148, 0.016, 20), K.mat(0x5cb848)); alface.position.y = 0.108; g.add(alface);
    const topo = K.malha(new THREE.SphereGeometry(0.135, 20, 12, 0, PI * 2, 0, PI / 2), K.mat(0xe0a458, { roughness: 0.6 })); topo.position.y = 0.115; topo.scale.y = 0.75; g.add(topo);
    for (let i = 0; i < 9; i++) { const a = i * 2.4, r = 0.03 + (i % 3) * 0.03; const s = K.malha(new THREE.SphereGeometry(0.009, 6, 4), K.mat(0xfff6dc), false); s.position.set(Math.cos(a) * r, 0.115 + 0.1 * Math.sqrt(1 - (r / 0.135) ** 2) * 0.75 - 0.002, Math.sin(a) * r); s.scale.y = 0.5; g.add(s); }
    return g;
  }

  // ---------- A torre de abas (site por site, de madrugada) ----------
  function fazAbas() {
    const g = new THREE.Group(), itens = [];
    ABAS_TXT.forEach((nome, i) => {
      const a = new THREE.Group();
      const t = K.telaCanvas(0.95, 0.6, 300);
      t.desenhar((c, w, h) => {
        c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
        barraUrl(c, w, h, nome.toLowerCase().replace(/ /g, '') + '.com.br', h * 0.2);
        if (i % 3 === 1) { txt(c, 'Não abriu', w / 2, h * 0.58, h * 0.16, '#e8352b', 900, 'center'); }
        else { rodinha(c, w / 2, h * 0.52, h * 0.14, i * 1.3); txt(c, 'Carregando...', w / 2, h * 0.84, h * 0.1, '#6b7280', 700, 'center'); }
      }, 'aba' + i);
      t.m.position.z = 0.016; a.add(t.m); a.scale.setScalar(0.8);
      a.add(K.malha(new THREE.BoxGeometry(0.99, 0.64, 0.03), K.mat(0x9aa3b2), true));
      a.position.set((i % 2 ? 0.08 : -0.08) + Math.sin(i) * 0.05, 0.34 + i * 0.29, 0); a.rotation.set(-0.05, -0.55 + Math.sin(i * 1.7) * 0.12, (i % 2 ? 1 : -1) * 0.05);
      a.userData.p0 = a.position.clone(); a.userData.r0 = a.rotation.clone();
      g.add(a); itens.push(a);
    });
    return { g, itens };
  }

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Léo Sites', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que abrem rápido', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A busca de madrugada no monitor: uma aba atrás da outra
  function buscaNoite(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    barraUrl(c, w, h, ABAS_TXT[Math.min(7, e.n || 0)].toLowerCase().replace(/ /g, '') + '.com.br', h * 0.16);
    rodinha(c, w / 2, h * 0.58, h * 0.14, (e.n || 0) * 1.1);
  }
  function telaInvest(c, w, h, e) {
    c.fillStyle = '#0b2545'; c.fillRect(0, 0, w, h);
    txt(c, e.k >= 1 ? 'Pronto!' : 'Carregando...', w / 2, h * 0.36, w * 0.08, '#ffffff', 800, 'center');
    rr(c, w * 0.12, h * 0.52, w * 0.76, h * 0.1, h * 0.05, '#1f3b63');
    rr(c, w * 0.12, h * 0.52, Math.max(h * 0.1, w * 0.76 * e.k), h * 0.1, h * 0.05, '#2fb5a6');
  }
  // O celular gigante: o site da Via Certa rodando (ou o erro), a conversa do WhatsApp e o site novo
  function celSite(c, w, h, e) {
    c.fillStyle = e.erro ? '#eceff3' : '#ffffff'; c.fillRect(0, 0, w, h);
    barraUrl(c, w, h, 'autoescolaviacerta.com.br', h * 0.075);
    if (!e.erro) { rodinha(c, w / 2, h * 0.45, w * 0.17, e.ang || 0); txt(c, 'Carregando...', w / 2, h * 0.62, w * 0.075, '#6b7280', 700, 'center'); }
    else { txt(c, '☹', w / 2, h * 0.4, w * 0.25, '#9aa3b2', 400, 'center'); txt(c, 'Não foi possível', w / 2, h * 0.56, w * 0.075, '#4b5563', 800, 'center'); txt(c, 'carregar a página', w / 2, h * 0.62, w * 0.075, '#4b5563', 800, 'center'); }
  }
  function celZap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.1);
    txt(c, 'Léo · Web designer', w * 0.08, h * 0.05, w * 0.065, '#ffffff', 800, 'left', w * 0.86);
    if (e.msg) {
      rr(c, w * 0.05, h * 0.14, w * 0.8, h * 0.36, 16, '#ffffff');
      ['Oi, dona Rita! Abri o site', 'da Via Certa no celular e', 'ele não carregou. Faço', 'sites leves pra autoescola.', 'Posso te mostrar uma ideia?'].forEach((l, i) => txt(c, l, w * 0.09, h * (0.19 + i * 0.065), w * 0.056, '#111b21', 600, 'left', w * 0.74));
    }
    if (e.resp) {
      rr(c, w * 0.17, h * 0.56, w * 0.78, h * 0.17, 16, '#d9fdd3');
      txt(c, 'Quero um site que', w * 0.21, h * 0.61, w * 0.06, '#111b21', 700, 'left', w * 0.7);
      txt(c, 'abre rápido! 🚗', w * 0.21, h * 0.67, w * 0.06, '#111b21', 700, 'left', w * 0.7);
    }
  }
  function celNovo(c, w, h) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    barraUrl(c, w, h, 'autoescolaviacerta.com.br', h * 0.075);
    c.fillStyle = '#ffd400'; c.fillRect(0, h * 0.075, w, h * 0.2);
    txt(c, 'Autoescola', w / 2, h * 0.14, w * 0.09, '#1b1b1b', 900, 'center'); txt(c, 'Via Certa', w / 2, h * 0.22, w * 0.09, '#1b1b1b', 900, 'center');
    txt(c, 'Tire a sua carta', w / 2, h * 0.36, w * 0.07, '#1b1b1b', 800, 'center'); txt(c, 'Carro e moto · Goiânia', w / 2, h * 0.42, w * 0.055, '#6b7280', 700, 'center');
    rr(c, w * 0.12, h * 0.5, w * 0.76, h * 0.09, h * 0.045, '#16a34a'); txt(c, 'Matricule-se no WhatsApp', w / 2, h * 0.545, w * 0.055, '#fff', 800, 'center', w * 0.7);
    rr(c, w * 0.12, h * 0.64, w * 0.76, h * 0.2, 14, '#f1f5f9'); txt(c, 'Abriu na hora ✓', w / 2, h * 0.74, w * 0.07, '#16a34a', 900, 'center');
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], ['home_office', { hora: 'noite' }, 'quarto_noite'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    const loja = (Cr.lojas || []).find((l) => l.id === 'loja');
    if (loja) DZ = loja.porta[2];
    // as árvores da direita ficam a cada 14 m (z = 26 - 14k): a cena fica logo depois de uma, pra nenhuma tampar a câmera
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;
    TEL = [-0.35, 2.4, DZ - 1.3]; ESQ = [0.45, 0, DZ + 0.7]; RITA = [0.75, 0, DZ]; CEL_R = [-0.2, 0, DZ + 0.5]; ALU = [0.75, 0, DZ + 1.3]; CARRO = [-1.5, 0, DZ - 0.1];

    // A placa AUTOESCOLA VIA CERTA por cima da placa da loja
    if (loja) {
      const pl = K.placa('AUTOESCOLA VIA CERTA', { larg: 3.5, alt: 0.7, fundo: '#ffd400', cor: '#1b1b1b', borda: '#1b1b1b' });
      const dir = loja.placa[0] < 0 ? 1 : -1;
      pl.position.set(loja.placa[0] + dir * 0.06, loja.placa[1], loja.placa[2]); pl.rotation.y = dir * PI / 2;
      K.lugar(pl); K.nomear('placa', pl);
    }

    const T = K.telasMappoa, M = K.MAPPOA;
    T.carregando = (c, w, h, e) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      barraUrl(c, w, h, 'autoescolaviacerta.com.br', h * 0.15);
      rodinha(c, w / 2, h * 0.44, h * 0.13, e.ang || 0);
      txt(c, 'Carregando...', w / 2, h * 0.66, h * 0.08, '#4b5563', 800, 'center');
      rr(c, w * 0.12, h * 0.78, w * 0.76, h * 0.06, h * 0.03, '#e3e8ef');
      rr(c, w * 0.12, h * 0.78, Math.max(h * 0.06, w * 0.76 * (e.k || 0.03)), h * 0.06, h * 0.03, '#2f6fd6');
      txt(c, Math.round((e.k || 0.03) * 100) + '%', w * 0.9, h * 0.9, h * 0.06, '#2f6fd6', 900, 'right');
    };
    T.listaAutos = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'COM SITE', itens: AUTOS, n: e.n, sel: e.sel, total: 148, comSite: 102, semSite: 46 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Autoescolas · Goiânia, GO', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      for (let i = 0; i < Math.min(e.n || 0, 4); i++) { if (i === 2) continue; const y = 248 + i * 140; rr(c, w - 226, y + 12, 190, 28, 14, '#fff4dc'); txt(c, 'site não respondeu', w - 131, y + 27, 15, '#d97706', 800, 'center', 180); }
    };
    // O lead da Via Certa: dados, o site que não respondeu e os contatos aparecendo
    T.leadVia = (c, w, h, e) => {
      c.fillStyle = '#f4f8fd'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, 84); txt(c, 'mappoa', 26, 44, 30, M.azul, 900);
      txt(c, 'Autoescola Via Certa', 24, 122, 34, M.marinho, 800, 'left', w - 48);
      txt(c, 'Autoescola · Goiânia, GO', 24, 160, 20, '#64748b', 600);
      rr(c, 18, 190, w - 36, 150, 20, '#ffffff'); txt(c, 'Dados da empresa', 38, 220, 22, M.marinho, 900);
      txt(c, 'Av. T-63, 1180 · Setor Bueno', 38, 258, 19, '#475569', 600, 'left', w - 76); txt(c, '4,1 ★ · 87 avaliações', 38, 294, 19, '#475569', 600);
      rr(c, 18, 356, w - 36, 108, 20, '#ffffff'); txt(c, 'Site', 38, 388, 22, M.marinho, 900);
      rr(c, 38, 410, 250, 36, 18, '#fff4dc'); txt(c, 'não respondeu', 163, 428, 19, '#d97706', 900, 'center');
      rr(c, 18, 480, w - 36, 300, 20, '#ffffff'); txt(c, 'Contatos', 38, 512, 22, M.marinho, 900);
      [['WhatsApp', '#16a34a', '#e6f9ed'], ['Telefone', '#475569', '#eef2f7'], ['Instagram', '#d6336c', '#fdebf1']].forEach(([s, cor, fundo], i) => {
        if ((e.n || 0) <= i) return;
        rr(c, 38, 540 + i * 74, w - 76, 60, 16, fundo); txt(c, s, 62, 570 + i * 74, 22, cor, 800); txt(c, 'achado ✓', w - 62, 570 + i * 74, 18, cor, 800, 'right');
      });
    };
    T.msgVia = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Autoescola Via Certa', texto: 'Oi, dona Rita! Abri o site da Via Certa no celular e ele não carregou. Faço sites leves pra autoescolas. Posso te mostrar uma ideia?', digitado: e.d });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Léo (do canal), a dona Rita, o aluno e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    rita = K.personagem('dona', { cores: { blazer: 0xd63a3a } }); K.semNome(rita.g); K.nomear('dona', rita.g);
    aluno = K.boneco({ roupa: 'moletom', cores: { moletom: 0x2fa86a, punho: 0x23824f, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xc98d5e } });
    K.semNome(aluno.g); K.nomear('aluno', aluno.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O telão "Carregando... 3%" num pé duplo
    telao = K.painelMappoa(TW, TH, { px: 900, borda: '#22262e' });
    const pes = TEL[1] - TH / 2 + 0.05;
    [-1.4, 1.4].forEach((x) => { const pe = K.malha(new THREE.CylinderGeometry(0.07, 0.09, pes, 12), K.mat(0x3a3f4a, { metalness: 0.4 })); pe.position.set(x, -pes / 2 - TH / 2 + 0.05, -0.08); telao.g.add(pe); });
    guarda(telao, 'carregando', TEL);

    // O esqueleto, virado pra câmera do calçadão (girar antes do K.lugar)
    esq = fazEsqueleto();
    esq.g.rotation.y = Math.atan2(CAM_R()[0] - ESQ[0], CAM_R()[2] - ESQ[2]) * 0.5;
    guarda(esq.g, 'esqueleto', ESQ, 1.25);

    // O carro branco da autoescola, de frente pra +z, com a placa no teto
    carro = new THREE.Group();
    const car = K.carro(0xf4f4f4); car.rotation.y = -PI / 2; carro.add(car);
    const sup = K.malha(new THREE.BoxGeometry(0.85, 0.26, 0.08), K.mat(0xffd400)); sup.position.set(0, 1.29, 0.1); carro.add(sup);
    [1, -1].forEach((s) => { const p = K.placa('AUTOESCOLA', { larg: 0.8, alt: 0.22, fundo: '#ffd400', cor: '#1b1b1b', borda: '#ffd400' }); p.position.set(0, 1.29, 0.1 + s * 0.045); p.rotation.y = s > 0 ? 0 : PI; carro.add(p); });
    guarda(carro, 'carro', CARRO);

    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante', { tam: 1.5 }); guarda(cel, 'celular', CEL_R);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    abas = fazAbas(); guarda(abas.g, 'abas', ABAS);
    lanche = fazLanche(); guarda(lanche, 'lanche', [0, 1, 0], 1.8);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    fx.poeira = [0, 1, 2].map((i) => K.poof(40 + i));
    fx.poof = K.poof(61);
    fx.pensa = K.balaoPensamento(); fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      anos: e('Carregando há 3 anos...', 'laranja'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'),
      perde: e('Perde aluno todo dia', 'vermelho'), naoAbre: e('Não abre', 'vermelho'), esquina: e('Foi pra da esquina', 'vermelho'),
      sitePor: e('Site por site...', 'vermelho'), invest: e('Investimento', 'verde'), naoResp: e('Mostra quem não respondeu', 'verde'),
      goiania: e('Goiânia', 'azul'), contato: e('Já com o contato', 'verde'),
      cacando: e('Caçando cliente', 'vermelho'), abriu: e('Abriu na hora', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Esperava carregar ou fechava? Comenta <em>ESPERAVA</em> ou <em>FECHAVA</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  const cranioEm = (dy = 0) => { esq.g.updateMatrixWorld(true); const p = esq.cranio.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  function CAM_R() { return [0.6, 1.5, DZ + 9]; }
  // O celular gigante virado pra câmera do calçadão, com uma tela
  function celRua(desenho, chave, pos = CEL_R) {
    ve(cel); cel.position.set(...pos);
    cel.rotation.set(0, Math.atan2(CAM_R()[0] - pos[0], CAM_R()[2] - pos[2]) * 0.6 + 0.3, 0);
    cel.userData.m3d.tela.desenhar(desenho, chave);
  }
  // A torre de abas: n abas à vista, a de cima entrando, a torre balançando
  function torre(tc, n, tUlt) {
    ve(abas.g);
    abas.itens.forEach((a, i) => {
      a.visible = i < n;
      a.position.copy(a.userData.p0); a.rotation.copy(a.userData.r0);
      a.rotation.z += Math.sin(tc * 3 + i * 0.4) * 0.012 * i;
      if (i === n - 1 && tUlt != null) { const k = pop(tc - tUlt); a.position.y += (1 - Math.min(1, k)) * 0.4; a.scale.setScalar(0.8 * Math.max(0.0001, k)); } else a.scale.setScalar(0.8);
    });
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o telão "Carregando... 3%" com a rodinha; embaixo, o esqueleto com o celular e a teia · MOSTRA: carregando, esqueleto
      // CENÁRIO: a rua entre prédios de dia, gente andando (o cenário cuida); a placa AUTOESCOLA e o carro ao fundo
      const tCl = quando('clicou', B, 0.12), tDe = quando('demora', B, 0.55), tFoi = quando('foi', B, 0.9);
      ve(telao, esq.g, carro);
      // OBJETOS SE MEXENDO: a rodinha girando; a barra tenta passar de 3% e volta
      telao.mostrar('carregando', { ang: Math.round(tc * 30) / 5, k: 0.03 + Math.max(0, Math.sin(tc * 2.2)) * 0.012 });
      // PERSONAGEM: o esqueleto · em "clicou": o queixo cai · em "foi": desmonta
      const caiu = esq.em(tc, { queixo: pc(tc, tCl, tCl + 0.3), tD: tc > tFoi - 0.05 ? tFoi - 0.05 : null });
      // EFEITOS VISUAIS: "Carregando há 3 anos..." em "demora" · ✗ enorme no telão em "foi" · poeira nos ossos
      fx.et.anos.em(mais(ESQ, [-0.2, 2.4, 0.2]), tc - tDe);
      [0, 6, 12].forEach((j, k) => fx.poeira[k].em(mais(ESQ, [(k - 1) * 0.5, 0.12, 0.3]), tc - esq.batida(tFoi - 0.05, Math.min(j, esq.n - 1)), { escala: 0.7 }));
      K.som('clique', B.inicio + 0.05, 0.5); K.som('estalo', tCl, 0.5); K.som('errado', tFoi + 0.15, 0.6);
      for (let k = 0; k < 5; k++) K.som('madeira', tFoi + 0.12 + k * 0.09, 0.45);
      // CÂMERA: 4 cortes de ~0,8 s · (1) o crânio e o celular · (2) o telão de baixo · (3) tudo · (4) passando, com o ✗
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = Math.max(B.inicio + 2.4, tFoi - 0.15);
      if (tc < c1) K.filmar([cranioEm(0.1), cranioEm(-0.5), mais(ESQ, [0, 0.95, 0.25])], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 14, altura: 'olho', tam: 1.1 });
      else if (tc < c2) K.filmar([cranioEm(0.2), mais(ESQ, [0, 0.1, 0]), mais(TEL, [0, -0.4, 0])], 'subindo', pc(tc, c1, c2), { plano: 'perto', lado: -10, altura: 'baixo', tam: 2.4 });
      else if (tc < c3) K.filmar([mais(TEL, [0, 0.6, 0]), cranioEm(0.3), mais(ESQ, [0, 0.1, 0.2])], 'afastando', pc(tc, c2, c3), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.8 });
      else K.filmar([mais(TEL, [0, 0.5, 0]), mais(ESQ, [0.6, 0.15, 0.7]), cranioEm(0.3)], 'passando', pc(tc, c3, B.ate), { plano: 'perto', lado: 10, altura: 'olho', tam: 3.0 });
      fx.simb.em(mais(TEL, [0, 0.1, 0.4]), tc - tFoi - 0.15, { tipo: '✗', tam: 2.0 });
      void caiu;
    },
    leo(B, tc) {
      // NA TELA: (1) o quarto; o Léo no computador com o site dele · (2) em "autoescola": a dona Rita do lado do carro · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.42), tA = quando('autoescola', B, 0.55), tAl = quando('aluno', B, 0.75);
      if (tc < tA) {
        ve(comp); comp.tela.desenhar(siteDemo, 'demo');
        // PERSONAGEM: começo digitando · em "cliente": coça a cabeça
        sentado(MONITOR);
        if (tc > tC) menino.reagir('coca_cabeca', tc - tC); else menino.reagir('digitando', tc);
        // EFEITOS VISUAIS: "Web designer" · "Sem cliente"
        if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else fx.et.semCli.em(cabecaDe(menino, 0.5), tc - tC);
        K.som('clique', B.inicio + 0.1, 0.4); K.som('pingo', tC, 0.5);
        // CÂMERA: (1) passando, perto, direita
        K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tA), { plano: 'perto', lado: 60, altura: 'olho', tam: 1.6 });
      } else {
        // a dona Rita do lado do carro, olhando o relógio; ninguém entra
        ve(carro);
        rita.colocar(mais(CARRO, [1.05, 0, 0.6]), CAM_R()); rita.reagir('olha_relogio', tc - tA);
        fx.et.perde.em(cabecaDe(rita, 0.55), tc - tAl);
        K.som('whoosh', tA, 0.5); K.som('errado', tAl, 0.4);
        // CÂMERA: (2) chegando, médio, frente, no carro e na dona Rita
        K.filmar([carro, cabecaDe(rita, 0.2), mais(CARRO, [1.05, 0, 0.6])], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.8 });
      }
    },
    site(B, tc) {
      // NA TELA: o calçadão; o celular gigante com a rodinha; a dona Rita orgulhosa do lado · MOSTRA: celular, dona
      const tCe = quando('celular', B, 0.05), tRo = quando('rodando', B, 0.45), tAb = quando('abre', B, 0.9);
      ve(carro);
      // ENTRA AGORA: o celular sobe do chão · OBJETOS SE MEXENDO: a rodinha cada vez mais devagar; em "abre", o erro
      const ang = tc < tAb ? (tc - B.inicio) * 6 - (tc - B.inicio) ** 2 * 0.6 : 0;
      celRua((c, w, h) => celSite(c, w, h, { erro: tc > tAb, ang }), 's' + (tc > tAb ? 'e' : Math.round(ang * 10)));
      K.entrar(cel, 'sobe', tc - tCe + 0.1, { dur: 0.3 });
      // PERSONAGEM: a dona Rita mostrando, orgulhosa · em "abre": encolhe os ombros
      rita.colocar(RITA, tc < tAb ? mais(CEL_R, [0, 1.2, 0]) : CAM_R());
      if (tc > tAb) rita.reagir('ombros', tc - tAb); else rita.reagir('mostrando', tc - B.inicio);
      // EFEITOS VISUAIS: "Não abre" e ✗ em "abre"
      fx.et.naoAbre.em(mais(CEL_R, [0, 2.65, 0.2]), tc - tAb);
      K.som('clique', tCe, 0.4); K.som('range', tRo, 0.5); K.som('errado', tAb, 0.6);
      // CÂMERA: (1) até "rodando": chegando, perto, frente, no celular · (2) girando, médio, esquerda
      if (tc < tRo) K.filmar([mais(CEL_R, [0, 2.3, 0]), mais(CEL_R, [0, 0.4, 0]), cabecaDe(rita, 0)], 'chegando', pc(tc, B.inicio, tRo), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 2.4 });
      else K.filmar([cel, rita, mais(CEL_R, [0, 2.4, 0])], 'passando', pc(tc, tRo, B.ate), { plano: 'perto', lado: 6, altura: 'olho', tam: 2.4 });
      fx.simb.em(mais(CEL_R, [0, 1.3, 0.5]), tc - tAb, { tipo: '✗', tam: 0.9 });
    },
    aluno(B, tc) {
      // NA TELA: o calçadão; o aluno com o celular gigante, ainda rodando · MOSTRA: aluno, celular
      const tCa = quando('cansou', B, 0.15), tFoi = quando('foi', B, 0.45), tEs = quando('esquina', B, 0.9);
      celRua((c, w, h) => celSite(c, w, h, { ang: tc * 4 }), 'a' + Math.round(tc * 40));
      if (tc > tCa && cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tCa);
      // PERSONAGEM: olha o relógio · em "cansou": faz que não · em "foi": vai embora andando
      if (tc < tFoi) { aluno.colocar(ALU, mais(CEL_R, [0, 1.2, 0])); aluno.reagir(tc > tCa ? 'nao' : 'olha_relogio', tc - (tc > tCa ? tCa : B.inicio)); }
      else { aluno.irPara(ALU, [0.85, 0, ALU[2] - 6], K.clamp((tc - tFoi) / 2.4), tc, { reto: true }); for (let k = 0; k < 6; k++) K.som('passo', tFoi + k * 0.28, 0.3); }
      // EFEITOS VISUAIS: "?" em "cansou" · "Foi pra da esquina" em "esquina"
      fx.simb2.em(cabecaDe(aluno, 0.3), tc - tCa, { tipo: '?' });
      fx.et.esquina.em(cabecaDe(aluno, 0.55), tc - tEs);
      K.som('bip', B.inicio + 0.1, 0.35); K.som('errado', tCa, 0.5);
      // CÂMERA: (1) até "foi": chegando, perto, direita · (2) seguindo o aluno de trás
      if (tc < tFoi) K.filmar([cabecaDe(aluno, 0), mais(CEL_R, [0, 2.2, 0]), mais(CEL_R, [0, 0.3, 0]), mais(ALU, [0, 0.2, 0])], 'chegando', pc(tc, B.inicio, tFoi), { plano: 'perto', lado: 22, altura: 'olho', tam: 2.4 });
      else K.seguir(aluno, { lado: 'tras', dist: 3.6, altura: 1.5 });
    },
    procura(B, tc) {
      // NA TELA: o quarto de noite; o Léo digitando; a torre de abas crescendo; o despertador até as 3h · MOSTRA: personagem, abas, despertador
      const tS = quando('site', B, 0.15), tPr = quando('procurando', B, 0.45), tM = quando('madrugada', B, 0.88);
      ve(comp, desp);
      // ENTRA AGORA: uma aba por clique, a partir de "site"
      const passo = Math.max(0.25, (tM - tS) / 8), n = tc > tS ? Math.min(8, 1 + Math.floor((tc - tS) / passo)) : 0;
      torre(tc, n, n ? tS + (n - 1) * passo : null);
      for (let k = 0; k < 8; k++) K.som('clique', tS + k * passo, 0.3);
      comp.tela.desenhar((c, w, h) => buscaNoite(c, w, h, { n }), 'bn' + n);
      // OBJETOS SE MEXENDO: os ponteiros correndo; o despertador toca em "madrugada"
      desp.userData.m3d.horas(22 + pc(tc, B.inicio, tM) * 5);
      if (tc > tM) desp.userData.m3d.tocar(tc - tM);
      // PERSONAGEM: digitando · em "madrugada": cochila (Zzz)
      sentado(MONITOR);
      if (tc > tM) menino.reagir('dormindo', tc - tM); else menino.reagir('digitando', tc);
      fx.et.sitePor.em(mais(ABAS, [0, 2.9, 0.2]), tc - tS);
      K.som('apito', tM + 0.1, 0.4);
      // CÂMERA: (1) até "procurando": girando, médio, esquerda · (2) passando, médio, na torre e no despertador
      if (tc < tPr) K.filmar([cabecaDe(menino, 0.2), MONITOR, mais(SEAT, [0, 0.3, 0.4])], 'girando', pc(tc, B.inicio, tPr), { plano: 'medio', lado: 28, angulo: 20, altura: 'olho', tam: 1.8 });
      else K.filmar([mais(ABAS, [0, 0.4, 0]), mais(ABAS, [0, 2.6, 0]), DESP, cabecaDe(menino, 0)], 'passando', pc(tc, tPr, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 2.6 });
    },
    investe(B, tc) {
      // NA TELA: o quarto de dia; o Léo de pé com o lanche; o lanche voa pro monitor · MOSTRA: personagem, lanche, monitor
      const tI = quando('investir', B, 0.2), tL = quando('lanche', B, 0.38), tS = quando('sistema', B, 0.55), tR = quando('respondem', B, 0.92);
      ve(comp, lanche);
      const k = pc(tc, tS, tS + 0.9);
      comp.tela.desenhar((c, w, h) => telaInvest(c, w, h, { k: pc(tc, tS + 0.4, tR) }), 'inv' + Math.round(pc(tc, tS + 0.4, tR) * 10));
      // PERSONAGEM: de pé · começo: faz que sim · em "sistema": aponta o monitor · em "respondem": comemora
      menino.colocar(EM_PE, tc > tS ? MONITOR : [0.8, 1.3, 4]);
      if (tc > tR) menino.reagir('comemorando', tc - tR); else if (tc > tS) menino.apontar(0.7); else menino.reagir('sim', tc - B.inicio);
      // OBJETOS SE MEXENDO: o lanche na mão em "lanche"; em "sistema", voa girando até o monitor e some num poof
      const m = menino.mao(1);
      if (tc < tS) { lanche.position.set(m[0] + 0.05, m[1] - 0.05, m[2] + 0.12); lanche.rotation.set(0.2, tc, 0); lanche.scale.setScalar(1.8 * pop(tc - tI)); }
      else { const q = K.suave(k); lanche.position.set(K.lerp(m[0], MONITOR[0] + 0.2, q), K.lerp(m[1], MONITOR[1] + 0.1, q) + Math.sin(q * PI) * 0.5, K.lerp(m[2], MONITOR[2] + 0.15, q)); lanche.rotation.set(q * 2, q * 6, 0); lanche.scale.setScalar(1.8 * (1 - q * 0.85)); if (q >= 1) lanche.visible = false; }
      fx.poof.em(mais(MONITOR, [0.2, 0.1, 0.2]), tc - tS - 0.9, { escala: 0.8 });
      // EFEITOS VISUAIS: "Investimento" em "investir" · "Mostra quem não respondeu" em "respondem"
      if (tc < tR) fx.et.invest.em(mais(EM_PE, [0, 2.15, 0]), tc - tI); else fx.et.naoResp.em(mais(MONITOR, [0, 0.75, 0]), tc - tR);
      K.som('ding', tL, 0.5); K.som('whoosh', tS, 0.5); K.som('brilho', tS + 0.9, 0.5); K.som('certo', tR, 0.5);
      // CÂMERA: (1) até "sistema": chegando, perto, direita · (2) passando, perto, esquerda
      if (tc < tS) K.filmar([cabecaDe(menino, 0.1), mais(EM_PE, [0, 0.6, 0]), mais(EM_PE, [0, 2.1, 0]), lanche], 'chegando', pc(tc, B.inicio, tS), { plano: 'perto', lado: 25, altura: 'olho', tam: 1.5 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.75, 0]), menino, cabecaDe(menino, 0.2)].concat(k < 1 ? [lanche.position.toArray()] : []), 'passando', pc(tc, tS, B.ate), { plano: 'perto', lado: -8, altura: 'olho', tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das autoescolas de Goiânia sobe do computador; o Léo ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('Digitou', B, 0.03), tC = quando('computador', B, 0.28), tL = quando('lista', B, 0.42), tAu = quando('autoescolas', B, 0.52), tG = quando('Goiânia', B, 0.65);
      ve(comp, navG); comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tAu ? 1 + Math.floor((tc - tAu) / 0.25) : 0;
        telaC.mostrar('listaAutos', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tAu + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "lista": levanta e aponta a Via Certa
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.goiania.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tG);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; o lead da Via Certa com os contatos; o robô e o Léo · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tAc = quando('acha', B, 0.3), tSe = quando('serviço', B, 0.6), tCo = quando('contato', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tM, { altura: 3 });
      // OBJETOS SE MEXENDO: os contatos aparecendo um por um até "contato"
      const n = tc > tSe ? Math.min(3, 1 + Math.floor((tc - tSe) / Math.max(0.2, (tCo - tSe) / 2))) : 0;
      telaM.mostrar('leadVia', { n });
      for (let k = 0; k < 3; k++) K.som('bip', tSe + k * Math.max(0.2, (tCo - tSe) / 2), 0.35);
      K.som('certo', tCo, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tSe ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "contato": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.contato.em([-0.35, 3.2, 0.3], tc - tCo);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) passando, médio, esquerda
      if (tc < tAc) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tAc), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tAc, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    mensagem(B, tc) {
      // NA TELA: (1) o quarto: o Léo na frente da mensagem pronta · (2) em "dona": a dona Rita com o celular gigante e a resposta · MOSTRA: dona, celular
      const tMa = quando('manda', B, 0.1), tDo = quando('dona', B, 0.45), tPe = quando('pede', B, 0.72);
      if (tc < tDo) {
        ve(comp, telaC); comp.tela.desenhar(siteDemo, 'demo');
        telaC.mostrar('msgVia', { d: pc(tc, B.inicio, tMa + 0.3) });
        // PERSONAGEM: o Léo aponta o botão de enviar
        menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tMa) menino.apontar(0.4); else menino.reagir('mostrando', tc - B.inicio);
        K.som('clique', tMa + 0.2, 0.6);
        // CÂMERA: (1) chegando, perto, frente, na tela
        K.filmar([telaC, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tDo), { plano: 'perto', lado: 10, altura: 'olho', tam: 2.4 });
      } else {
        ve(carro);
        celRua((c, w, h) => celZap(c, w, h, { msg: true, resp: tc > tPe }), 'z' + (tc > tPe ? 1 : 0));
        if (cel.userData.m3d.vibrar) cel.userData.m3d.vibrar(tc - tDo);
        // PERSONAGEM: a dona Rita lê, surpresa · em "pede": comemora
        rita.colocar(RITA, tc < tPe ? mais(CEL_R, [0, 1.3, 0]) : CAM_R());
        if (tc > tPe) rita.reagir('comemorando', tc - tPe); else rita.reagir('surpreso', tc - tDo);
        fx.fala.em(cabecaDe(rita, 0.15), tc - tPe, { texto: 'Quero um site que abre rápido!' });
        K.som('pingo', tDo + 0.05, 0.6); K.som('certo', tPe, 0.6);
        // CÂMERA: (2) passando, perto, direita, no celular e na dona Rita
        K.filmar([mais(CEL_R, [0, 2.2, 0]), mais(CEL_R, [0, 0.6, 0]), cabecaDe(rita, 0.3)], 'passando', pc(tc, tDo, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.4 });
        fx.simb.em(mais(RITA, [0.3, 2.4, 0.3]), tc - tPe - 0.2, { tipo: '✓' });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Léo de noite com a torre de abas · (2) Agora: no calçadão, o Léo, a dona Rita e o aluno com o site aberto · MOSTRA: personagem, dona
      const tA = quando('Agora', B, 0.45), tEs = quando('esqueleto', B, 0.88);
      if (tc < tA) {
        ve(comp); comp.tela.desenhar(telaEscura, 'escura'); torre(tc, 8, null);
        sentado(mais(ABAS, [0, 1.5, 0])); menino.reagir('mao_na_testa', tc - B.inicio);
        fx.et.cacando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.4, 0.1, 0.8]), mais(ABAS, [0, 2.2, 0])], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 25, altura: 'olho', tam: 1.8 });
      } else {
        ve(carro);
        const CP = [-0.55, 0, DZ + 0.1];
        celRua(celNovo, 'novo', CP);
        const LR = [0.25, 0, DZ + 1.1], AL = [-0.45, 0, DZ + 1.35];
        menino.colocar(LR, CAM_R()); menino.reagir('vitoria', tc - tA);
        rita.colocar(mais(RITA, [0.15, 0, 0.6]), cabecaDe(menino, -0.5)); rita.reagir('aplaudindo', tc - tA);
        aluno.colocar(AL, CAM_R()); aluno.reagir('comemorando', tc - tA);
        fx.et.abriu.em(mais(CP, [0, 2.4, 0.3]), tc - tEs);
        K.som('certo', tEs, 0.6);
        K.filmar([mais(LR, [0, 1, 0]), mais(RITA, [0.15, 1, 0.6]), mais(CP, [0, 2.2, 0]), mais(AL, [0, 0.2, 0])], 'passando', pc(tc, tA, B.ate), { plano: 'perto', lado: 6, altura: 'olho', tam: 2.6 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Léo de pé no quarto; a pergunta no topo; o cartão de seguir; a barra com mappoa.com; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('segue', B, 0.45), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.68), tTe = quando('testa', B, 0.9);
      if (tc < tSg) fx.cta.em(tc - B.inicio); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteDemo, 'demo');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando · em "digita": digitando
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
      // o esqueleto de pé, de queixo caído, embaixo do telão dos 3%
      ve(telao, esq.g, carro);
      telao.mostrar('carregando', { ang: 0.8, k: 0.03 });
      esq.em(0.4, { queixo: 1 });
      K.mirar([0.45, 1.75, ESQ[2] + 5.4], [0.15, 1.75, ESQ[2] - 0.8]);
      fx.simb.em(mais(TEL, [-0.9, -0.2, 0.4]), 1, { tipo: '✗', tam: 1.1, som: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, aluno, rita].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.position.set(...CEL_R); cel.scale.setScalar(1.5);
    lanche.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
