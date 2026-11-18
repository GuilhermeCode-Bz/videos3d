// A mesma segunda-feira (canal Mappoa, feito na nuvem, 18/11/2026): LOOP DE TEMPO. O Rafa, web designer, acorda na
// mesma segunda pela quinta vez (o despertador gigante pulando, as folhas do calendário voltando pra parede). Ele posta
// o portfólio e espera (1 curtida), às 6 da tarde o relógio gira pra trás e o dia recomeça; na 6ª segunda tenta
// panfleto na rua e chove; na 7ª entende a regra (o dia só acaba se ele fechar um cliente), investe o preço de um café
// no Mappoa, acha a Barbearia do Zé e, às 5:59, o Zé responde "fechado". Punchline: ele acorda numa terça.
// Três lugares (K.cenarios): o quarto (home_office), a rua (rua_predios) e o palco do Mappoa. Cada plano começa com as
// linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, robo, comp, cel, navG, telaC, telaM, desp, relogio, calend, contrato, carimbo, cafe, moeda, clarao, FOV0;
  const tudo = [], fx = {}, folhasV = [], panfs = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office, parede do fundo em z -3,6): o computador do Rafa no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const DESP = [0.95, 0, -0.75], CAL = [0.35, 2.45, -3.55], REL = [1.6, 3.05, -3.55];
  // Rua: o Rafa no calçadão, logo depois de uma árvore da direita
  let DZ = -5;

  const LUGAR = { gancho: 'quarto', posta: 'quarto', volta: 'quarto', panfleto: 'rua', regra: 'quarto', investe: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', empresa: 'quarto', fecha: 'quarto', terca: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'quarto' };

  const BARBS = [
    { nome: 'Barbearia do Zé', end: 'Rua da Aurora, 212', chips: ['whats', 'insta'] },
    { nome: 'Navalha de Ouro', end: 'Av. Boa Viagem, 1480', chips: ['tel', 'insta'] },
    { nome: 'Corte Fino Casa Forte', end: 'Rua Dom Bosco, 90', chips: ['whats'] },
    { nome: 'Barba Negra Recife', end: 'Rua do Hospício, 33', chips: ['whats', 'tel'] }
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
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
    let chave = null;
    m.userData.desenhar = (fn, k) => { if (k === chave) return; chave = k; const c = cv.getContext('2d'); c.clearRect(0, 0, cv.width, cv.height); fn(c, cv.width, cv.height); t.needsUpdate = true; };
    m.userData.desenhar(desenho, 'ini');
    return m;
  }
  // a folha do calendário: o dia da semana grande
  const diaCal = (dia, cor = '#d8343a') => (c, w, h) => {
    rr(c, 0, 0, w, h, 26, '#ffffff');
    rr(c, 0, 0, w, h * 0.24, 26, cor); c.fillStyle = cor; c.fillRect(0, h * 0.12, w, h * 0.12);
    txt(c, 'NOVEMBRO', w / 2, h * 0.12, w * 0.11, '#fff', 900, 'center');
    txt(c, dia, w / 2, h * 0.5, w * (dia.length > 6 ? 0.17 : 0.2), '#1e1f22', 900, 'center', w * 0.92);
    txt(c, dia === 'TERÇA' ? '19' : '17', w / 2, h * 0.78, w * 0.3, cor, 900, 'center');
  };

  // ---------- Telas desenhadas ----------
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  // o post do portfólio no celular: "Projeto novo!" e a curtida solitária
  function post(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.06, '#111', 800);
    c.fillStyle = '#2f6fd6'; c.beginPath(); c.arc(w * 0.14, h * 0.1, w * 0.06, 0, 7); c.fill();
    txt(c, 'rafa.design', w * 0.24, h * 0.1, w * 0.065, '#111', 800);
    const d = c.createLinearGradient(0, h * 0.15, 0, h * 0.6); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6');
    c.fillStyle = d; c.fillRect(0, h * 0.15, w, h * 0.45);
    txt(c, 'Projeto', w / 2, h * 0.32, w * 0.13, '#fff', 900, 'center'); txt(c, 'novo!', w / 2, h * 0.43, w * 0.13, '#fff', 900, 'center');
    if (e.curtida) { c.fillStyle = '#e8352b'; txt(c, '♥ 1 curtida', w * 0.08, h * 0.67, w * 0.09, '#e8352b', 900); }
    txt(c, 'Clientes novos: 0', w * 0.08, h * 0.78, w * 0.07, '#4a4f58', 800);
  }
  // a conversa com o Zé no celular: a mensagem que o Rafa mandou e o "Fechado!"
  function zap(c, w, h, e) {
    c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, h * 0.12);
    txt(c, 'Barbearia do Zé', w * 0.08, h * 0.065, w * 0.075, '#fff', 800, 'left', w * 0.85);
    rr(c, w * 0.22, h * 0.17, w * 0.72, h * 0.25, 16, '#dcf8c6');
    txt(c, 'Oi, Zé! Vi que a', w * 0.27, h * 0.22, w * 0.06, '#111', 700); txt(c, 'barbearia não tem', w * 0.27, h * 0.28, w * 0.06, '#111', 700); txt(c, 'site. Faço o seu?', w * 0.27, h * 0.34, w * 0.06, '#111', 700);
    if (e.resp) { rr(c, w * 0.06, h * 0.5, w * 0.62, h * 0.13, 16, '#ffffff'); txt(c, 'Fechado! 👊', w * 0.11, h * 0.565, w * 0.09, '#111', 900); txt(c, '17:59', w * 0.55, h * 0.61, w * 0.045, '#777', 700); }
  }
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
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Barbearia do Zé', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'agende o seu corte', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['home_office', {}, 'quarto'], ['rua_predios', {}, 'rua'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    const bar = (Cr.lojas || []).find((l) => l.id === 'padaria');
    if (bar) DZ = bar.porta[2];
    DZ = 26 - 14 * Math.round((26 - DZ) / 14) + 0.5;

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaBarbs = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: BARBS, n: e.n, sel: e.sel, total: 118, comSite: 77, semSite: 41 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Barbearias · Recife, PE · 41 sem site', 36, 168, 21, M.marinho, 700, 'left', w - 72);
    };
    T.analiseZe = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Barbearia do Zé', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site: agenda só no WhatsApp', 'Some no Google pra quem é do bairro'], oportunidades: ['Site com agendamento e o WhatsApp no topo'],
        objecoes: ['"Meus clientes já me conhecem"'], abordagem: 'Mostre quanta gente procura barbearia no bairro e não acha a dele.'
      });
      if (e.ate >= 0) txt(c, Math.round(91 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
      if (e.zap) { rr(c, w - 250, 132, 232, 44, 22, '#25d366'); txt(c, 'WhatsApp ✓', w - 134, 155, 22, '#fff', 900, 'center'); }
    };
    T.msgZe = (c, w, h, e) => T.mensagem(c, w, h, { para: 'Para: Barbearia do Zé (WhatsApp)', digitado: e.d, texto: 'Oi, Zé! Vi que a barbearia não tem site e a agenda é só no WhatsApp. Faço um site com o agendamento pros clientes do bairro. Te mostro uma ideia?' });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cadeira, o despertador gigante, o relógio, o calendário e as folhas voando
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    const cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); cad.rotation.y = PI; guarda(cad, null, SEAT);
    desp = K.m3d('despertador', { tam: 2.6 }); desp.rotation.y = -0.5; guarda(desp, 'despertador', DESP);
    relogio = K.m3d('relogio_parede'); relogio.scale.setScalar(2); guarda(relogio, 'relogio', REL);
    calend = folha(1.0, 1.25, 400, diaCal('SEGUNDA')); guarda(calend, 'calendario', CAL);
    const fG = new THREE.Group(); guarda(fG, 'folhas');
    for (let i = 0; i < 4; i++) { const f = folha(0.5, 0.62, 200, diaCal(['SEXTA', 'QUINTA', 'QUARTA', 'TERÇA'][i], '#f39a1e')); fG.add(f); folhasV.push(f); }
    cel = K.celular(); guarda(cel, 'celular', null, 1.8);
    cafe = K.m3d('caneca', { cor: 0xffffff }); guarda(cafe, 'cafe', null, 1.6);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Rua: os panfletos "FAÇO SITES" (um na mão e os do chão)
    const pG = new THREE.Group(); guarda(pG, 'panfletos');
    for (let i = 0; i < 6; i++) {
      const p = folha(0.3, 0.42, 160, (c, w, h) => { rr(c, 0, 0, w, h, 8, '#fff7d6'); txt(c, 'FAÇO', w / 2, h * 0.32, w * 0.24, '#d8343a', 900, 'center'); txt(c, 'SITES', w / 2, h * 0.55, w * 0.24, '#d8343a', 900, 'center'); txt(c, '(81) 9...', w / 2, h * 0.8, w * 0.13, '#333', 700, 'center'); });
      pG.add(p); panfs.push(p);
    }

    // O contrato com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site da Barbearia do Zé', w / 2, h * 0.22, w * 0.06, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    guarda(contrato, 'contrato');

    // O clarão do dia voltando: um plano branco na frente da câmera
    clarao = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthTest: false, depthWrite: false }));
    clarao.renderOrder = 30; K.scene.add(clarao);

    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.chuva = K.chuva(41);
    fx.pensa = K.balaoPensamento();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      seg5: e('Segunda nº 5', 'laranja'), seg6: e('Segunda nº 6', 'laranja'), seg7: e('Segunda nº 7', 'laranja'),
      curtida: e('1 curtida', 'vermelho'), zero: e('0 clientes', 'vermelho'), investir: e('Investir', 'azul'),
      recife: e('Recife', 'azul'), chance: e('Quem tem chance', 'verde'), zap: e('WhatsApp ✓', 'verde'),
      terca: e('Terça!', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // o despertador tocando (forca 0 = parado) e mostrando a hora
  function despTocando(tc, forca, h) { ve(desp); const a = desp.userData.m3d; if (h != null) a.horas(h); if (forca > 0) a.tocar(tc, forca); }
  // o celular na mão, do lado da cabeça, virado pra câmera (chamar DEPOIS do K.filmar)
  function celNaMao(desenho, chave, esc = 1.8) {
    ve(cel); menino.g.updateMatrixWorld(true);
    const m = menino.mao(1); cel.g.position.set(m[0], m[1] + 0.12, m[2]); cel.g.scale.setScalar(esc);
    cel.g.lookAt(K.camera.position); cel.tela.desenhar(desenho, chave);
  }
  // as folhas do calendário voltando: k de 0 (longe, espalhadas) a 1 (dentro do calendário)
  function folhasVoltando(k) {
    ve(folhasV[0].parent);
    folhasV.forEach((f, i) => {
      const q = K.clamp(k * 1.4 - i * 0.12); f.visible = q < 0.98;
      const de = [CAL[0] + 1.2 - i * 0.9, CAL[1] - 1.3 + i * 0.35, CAL[2] + 2.2 + i * 0.3];
      f.position.set(K.lerp(de[0], CAL[0], q), K.lerp(de[1], CAL[1], q) + Math.sin(q * PI) * 0.4, K.lerp(de[2], CAL[2] + 0.02, q));
      f.rotation.set(0, 0, (1 - q) * (i % 2 ? 2.4 : -2.4));
    });
  }
  function clarear(forca) {
    if (forca <= 0.01) { clarao.visible = false; return; }
    const d = V(0, 0, -1).applyQuaternion(K.camera.quaternion);
    clarao.visible = true; clarao.position.copy(K.camera.position).addScaledVector(d, 0.6); clarao.quaternion.copy(K.camera.quaternion);
    clarao.material.opacity = forca;
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o despertador gigante pulando e tocando do lado da mesa; o Rafa dormindo debruçado; o calendário SEGUNDA · MOSTRA: despertador, calendario, personagem
      const tAc = quando('acordou', B, 0.18), tMe = quando('mesma', B, 0.32), tQu = quando('quinta', B, 0.82);
      ve(comp, calend); comp.tela.desenhar(telaEscura, 'esc');
      // OBJETOS SE MEXENDO: o despertador pula o tempo todo, nas 7 da manhã
      despTocando(tc, 1.2, 7);
      // PERSONAGEM: dormindo debruçado · em "acordou": susto · em "quinta": mão na testa
      sentado(MONITOR);
      if (tc < tAc) menino.reagir('dormindo', tc - B.inicio);
      else if (tc < tQu) { menino.colocar(SEAT, mais(DESP, [0, 1.2, 0])); menino.reagir('susto', tc - tAc); }
      else { menino.colocar(SEAT, [1.6, 1.4, 4]); menino.reagir('mao_na_testa', tc - tQu); }
      // ENTRA AGORA: as folhas do calendário voando de volta a partir de "mesma"
      folhasVoltando(pc(tc, tMe - 0.3, tMe + 0.9));
      // SONS: o toque do despertador · rebobina nas folhas · whoosh no susto
      for (let k = 0; k < 6; k++) K.som('ding', B.inicio + k * 0.18, 0.35);
      K.som('zumbido', B.inicio, 0.45); K.som('rebobina', tMe - 0.2, 0.4); K.som('whoosh', tAc, 0.4); K.som('baque', tQu, 0.35);
      // CÂMERA: 4 cortes (o despertador de baixo; o calendário com as folhas; o Rafa de susto; mais perto no "quinta")
      const c1 = B.inicio + 0.7, c2 = B.inicio + 1.45, c3 = Math.max(c2 + 0.5, tQu - 0.1);
      if (tc < c1) K.filmar([mais(DESP, [0, 0.4, 0]), mais(DESP, [0, 1.6, 0])], 'chegando', pc(tc, B.inicio, c1), { plano: 'medio', lado: 25, altura: 'baixo', tam: 2.2 });
      else if (tc < c2) K.mirar([0.9, 2.1, K.lerp(0.8, 0.3, pc(tc, c1, c2))], [CAL[0], CAL[1] - 0.2, CAL[2]]);
      else if (tc < c3) K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0, 0.4, 0]), mais(DESP, [0, 1.3, 0])], 'passando', pc(tc, c2, c3), { plano: 'medio', lado: 30, altura: 'olho', tam: 2.4 });
      else K.filmar([cabecaDe(menino, 0.3), cabecaDe(menino, -0.7)], 'chegando', pc(tc, c3, B.ate), { plano: 'medio', lado: 28, altura: 'olho', tam: 1.6 });
      // EFEITOS VISUAIS: "Segunda nº 5" em "quinta"
      fx.et.seg5.em({ tela: [540, 600] }, tc - tQu);
    },
    posta(B, tc) {
      // NA TELA: o Rafa sentado de lado com o celular: o post "Projeto novo!" e 1 curtida · MOSTRA: personagem, celular, monitor
      const tPo = quando('posta', B, 0.3), tEs = quando('espera', B, 0.6), tAp = quando('aparecer', B, 0.9);
      ve(comp, calend); comp.tela.desenhar(siteDemo, 'demo0');
      // PERSONAGEM: no celular · em "espera": olha o relógio do pulso
      menino.colocar(SEAT, [1.5, 1.3, 3]); menino.sentar(1);
      if (tc < tEs) menino.reagir('celular', tc - B.inicio); else menino.reagir('olha_relogio', tc - tEs);
      K.som('clique', tPo, 0.3); K.som('clique', tPo + 0.15, 0.3); K.som('ding', tAp, 0.25);
      // CÂMERA: (1) chegando · perto · lado 22 · (2) passando · lado -20
      const cv = (tPo + tEs) / 2;
      if (tc < cv) K.filmar([cabecaDe(menino, 0.35), mais(SEAT, [0.25, 0.9, 0.3]), MONITOR], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: 30, altura: 'olho', tam: 1.6 });
      else K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.25, 0.9, 0.3])], 'passando', pc(tc, cv, B.ate), { plano: 'perto', lado: 12, altura: 'olho', tam: 1.5 });
      // o celular (depois da câmera, pra virar pra ela)
      if (tc < tEs) celNaMao((c, w, h) => post(c, w, h, { curtida: tc > tPo + 0.4 }), 'p' + (tc > tPo + 0.4));
      else { ve(cel); cel.g.position.set(SEAT[0] + 0.45, 0.62, SEAT[2] + 0.25); cel.g.rotation.set(-PI / 2 + 0.3, 0, 0); cel.g.scale.setScalar(1.8); cel.tela.desenhar((c, w, h) => post(c, w, h, { curtida: true }), 'ptrue'); }
      // EFEITOS VISUAIS: "1 curtida" em "aparecer"
      fx.et.curtida.em({ tela: [540, 400] }, tc - tAp);
    },
    volta(B, tc) {
      // NA TELA: o relógio nas 6; "0 clientes"; os ponteiros girando pra trás, clarão e o calendário voltando · MOSTRA: relogio, personagem, calendario
      const tSe = quando('seis', B, 0.12), tZe = quando('zero', B, 0.4), tVo = quando('volta', B, 0.7), tCo = quando('começo', B, 0.9);
      ve(comp, calend, relogio); comp.tela.desenhar(siteDemo, 'demo0');
      // OBJETOS SE MEXENDO: o relógio anda até as 6 e, em "volta", gira pra trás até as 7 da manhã
      const r = relogio.userData.m3d || {};
      const h = tc < tVo ? K.lerp(4.5, 6, pc(tc, B.inicio, tZe)) : 6 - 11 * K.suave(pc(tc, tVo, tCo + 0.3)) * 1.0;
      if (r.h) { r.h.rotation.z = -(h / 12) * PI * 2; r.m.rotation.z = -(h % 1) * PI * 2 * (tc > tVo ? 6 : 1); }
      // PERSONAGEM: triste no celular · em "volta": susto, puxado pra trás
      menino.colocar(SEAT, tc < tVo ? [1.5, 1.3, 3] : mais(REL, [0, -0.5, 0])); menino.sentar(1);
      if (tc < tVo) menino.reagir('triste', tc - B.inicio); else menino.reagir('susto', tc - tVo);
      folhasVoltando(tc > tVo ? pc(tc, tVo, tCo + 0.4) : 0); if (tc < tVo) folhasV.forEach((f) => { f.visible = false; });
      K.som('errado', tZe, 0.5); K.som('rebobina', tVo, 0.55); K.som('whoosh', tCo, 0.4);
      // CÂMERA: (1) no relógio, chegando · (2) o quarto, afastando
      const cv = (tZe + tVo) / 2;
      if (tc < cv) K.mirar([1.2, 2.5, K.lerp(0.2, -0.6, pc(tc, B.inicio, cv))], REL);
      else K.filmar([cabecaDe(menino, 0.3), REL, CAL, mais(SEAT, [0, 0.4, 0])], 'afastando', pc(tc, cv, B.ate), { plano: 'medio', lado: 22, altura: 'olho', tam: 3.2 });
      // EFEITOS VISUAIS: "0 clientes" em "zero" · ✗ · clarão em "começo"
      fx.et.zero.em({ tela: [540, 400] }, tc - tZe);
      if (tc > tZe && tc < tVo) fx.simb.em(mais(REL, [0.75, 0.3, 0.3]), tc - tZe, { tipo: '✗', tam: 0.6 });
      clarear(tc > tCo - 0.15 ? Math.sin(K.clamp((tc - tCo + 0.15) / 0.5) * PI) * 0.9 : 0);
      void tSe;
    },
    panfleto(B, tc) {
      // NA TELA: o Rafa no calçadão oferecendo o panfleto FAÇO SITES; em "Choveu", a chuva e os panfletos no chão · MOSTRA: personagem, panfletos
      // CENÁRIO: a rua entre prédios de dia, gente andando (o cenário cuida)
      const tSx = quando('sexta', B, 0.1), tPa = quando('panfleto', B, 0.45), tCh = quando('Choveu', B, 0.8);
      const POS = [0.85, 0, DZ + 3];
      ve(panfs[0].parent);
      // PERSONAGEM: oferece o panfleto · em "Choveu": triste, ombros
      menino.colocar(POS, [-0.6, 1.4, DZ + 8]);
      if (tc < tCh) { menino.apontar(0.55 + Math.sin(tc * 4) * 0.08); menino.humor('feliz'); } else menino.reagir(tc < tCh + 0.6 ? 'ombros' : 'triste', tc - tCh);
      // CÂMERA: (1) de frente, perto, chegando · (2) do alto, a chuva caindo nele
      const cv = tCh - 0.1;
      if (tc < cv) K.mirar([K.lerp(0.1, 0.25, pc(tc, B.inicio, cv)), 1.65, DZ + K.lerp(8.2, 7.4, pc(tc, B.inicio, cv))], [0.75, 1.25, DZ + 3]);
      else K.mirar([0.5, K.lerp(4.4, 4.9, pc(tc, cv, B.ate)), DZ + 7.6], [0.8, 0.8, DZ + 3]);
      // OBJETOS SE MEXENDO: o panfleto na mão; em "Choveu" todos caem no chão
      menino.g.updateMatrixWorld(true);
      const m = menino.mao(1);
      panfs.forEach((p, i) => {
        if (tc < tCh) { p.visible = i < 3; p.position.set(m[0] + i * 0.02, m[1] + 0.12 + i * 0.01, m[2] + 0.06 + i * 0.01); p.lookAt(K.camera.position); }
        else {
          const q = K.suave(K.clamp((tc - tCh - i * 0.08) / 0.5)), ch = [POS[0] - 0.7 + i * 0.3, 0.06, POS[2] + 0.4 + (i % 3) * 0.35];
          p.visible = true; p.position.set(K.lerp(m[0], ch[0], q), K.lerp(m[1], ch[1], q) + Math.sin(q * PI) * 0.3, K.lerp(m[2], ch[2], q));
          p.rotation.set(-PI / 2 * q, 0, i * 0.7 * q);
        }
      });
      if (tc > tCh) fx.chuva.em([0.6, 0, DZ + 4], tc - tCh, { raio: 4, altura: 7, forca: K.clamp((tc - tCh) / 0.3) });
      // EFEITOS VISUAIS: "Segunda nº 6" em "sexta" · ✗ em "Choveu"
      fx.et.seg6.em({ tela: [540, 400] }, tc - tSx);
      // SONS: passos · a chuva (respingo e água) · errado
      K.som('passo', B.inicio + 0.2, 0.3); K.som('clique', tPa, 0.3); K.som('agua', tCh, 0.6); K.som('respingo', tCh + 0.2, 0.4); K.som('errado', tCh + 0.35, 0.4);
    },
    regra(B, tc) {
      // NA TELA: o despertador tocando de novo; o Rafa dá um tapa nele; o balão "Fechar 1 cliente" · MOSTRA: personagem, despertador
      const tSe = quando('sétima', B, 0.1), tEn = quando('entende', B, 0.3), tFe = quando('fechar', B, 0.75);
      ve(comp, calend); comp.tela.desenhar(telaEscura, 'esc');
      // PERSONAGEM: em pé do lado do despertador · bravo, bate nele · em "fechar": ideia
      const POS = mais(DESP, [-0.75, 0, 0.55]);
      const tTapa = B.inicio + 0.4;
      despTocando(tc, tc < tTapa ? 1.2 : 0, 7);
      menino.colocar(POS, tc < tFe ? mais(DESP, [0, 1.0, 0]) : [0.3, 1.5, 5]);
      if (tc < tTapa + 0.4) menino.reagir('bate_mesa', tc - B.inicio); else if (tc < tFe) menino.reagir('pensando', tc - tEn); else menino.reagir('ideia', tc - tFe);
      if (tc < tTapa) { for (let k = 0; k < 3; k++) K.som('ding', B.inicio + k * 0.15, 0.3); }
      K.som('baque', tTapa, 0.6); K.som('ding', tFe, 0.5);
      // CÂMERA: (1) de baixo, o despertador grande · (2) chegando no rosto dele
      const cv = (tEn + tFe) / 2;
      if (tc < cv) K.filmar([mais(DESP, [0, 1.4, 0]), cabecaDe(menino, 0.2), mais(DESP, [0, 0.3, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: -25, altura: 'baixo', tam: 2.4 });
      else K.filmar([cabecaDe(menino, 1.2), cabecaDe(menino, -0.6)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 10, altura: 'olho', tam: 1.9 });
      fx.et.seg7.em({ tela: [540, 400] }, tc - tSe);
      fx.pensa.em(cabecaDe(menino, 0.25), tc - tEn, { texto: 'Fechar 1 cliente' });
      if (tc > tTapa && tc < tTapa + 0.6) fx.simb.em(mais(DESP, [0.3, 1.9, 0.3]), tc - tTapa, { tipo: '!', tam: 0.6 });
    },
    investe(B, tc) {
      // NA TELA: o Rafa de pé do lado da mesa com o café; o café vira moeda e cai no teclado; a tela com os pinos · MOSTRA: personagem, cafe, monitor
      const tDe = quando('decide', B, 0.12), tIn = quando('investir', B, 0.22), tCa = quando('café', B, 0.38), tSi = quando('sistema', B, 0.5), tSt = quando('site', B, 0.92);
      ve(comp);
      menino.colocar(EM_PE, tc < tSi + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      if (tc < tDe) menino.reagir('segurando', tc - B.inicio); else if (tc < tSi) menino.reagir('sim', tc - tDe); else menino.reagir('digitando', tc);
      menino.humor(tc > tDe ? 'feliz' : 'normal');
      menino.g.updateMatrixWorld(true);
      const mao = menino.mao(1), cPos = mais(mao, [0.03, 0.05, 0.06]);
      if (tc < tSi) { ve(cafe); cafe.position.set(...cPos); cafe.rotation.set(0, 0.4, 0); cafe.scale.setScalar(1.6 * pop(tc - tCa + 0.35)); }
      if (tc > tSi) {
        fx.poof.em(cPos, tc - tSi, { escala: 0.35 });
        const q = K.clamp((tc - tSi) / 0.45);
        moeda.visible = true;
        moeda.position.set(K.lerp(cPos[0], TECLADO[0], q), K.lerp(cPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(cPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tSi + 0.45, 0.6);
      }
      const n = tc > tSt - 0.4 ? Math.min(6, 1 + Math.floor((tc - tSt + 0.4) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => (tc > tSi ? mapaPinos(c, w, h, { n }) : telaEscura(c, w, h)), 'm' + (tc > tSi) + n);
      for (let k = 0; k < 6; k++) K.som('estalo', tSt - 0.4 + k * 0.12, 0.2);
      fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
      // CÂMERA: (1) chegando nele com o café · (2) subindo pra tela com os pinos
      if (tc < tSi + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), cPos], 'chegando', pc(tc, B.inicio, tSi + 0.15), { plano: 'medio', lado: 15, altura: 'olho', espacoCima: 0.3, obstaculos: false, tam: 1.6 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tSi + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com acima do computador; a lista das barbearias de Recife sobe do computador · MOSTRA: navegador, tela, personagem
      const tPc = quando('computador', B, 0.05), tDi = quando('digita', B, 0.15), tL = quando('lista', B, 0.55), tBa = quando('barbearias', B, 0.65), tRe = quando('Recife', B, 0.85);
      ve(comp, navG);
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      K.entrar(navG.g, 'cresce', tc - tPc + 0.15, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tBa ? 1 + Math.floor((tc - tBa) / 0.22) : 0;
        telaC.mostrar('listaBarbs', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tBa + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
      fx.et.recife.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tRe);
      if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, B.inicio, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Barbearia do Zé cai do alto; o robô à esquerda; o Rafa à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tMo = quando('mostra', B, 0.45), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseZe', { ate: tc > tCo ? 2 : tc > tCh ? 0 : -1, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tCh ? 1 : 0, mapa: false });
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('comemorando', tc - tCo); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.chance.em([-0.35, 3.2, 0.3], tc - tCh);
      K.som('brilho', tM, 0.6);
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    empresa(B, tc) {
      // NA TELA: a tela do lado do computador: a ficha da Barbearia do Zé, o WhatsApp, a nota subindo até 91; em "mensagem", a mensagem pronta · MOSTRA: tela, personagem, monitor
      const tAb = quando('abre', B, 0.08), tZa = quando('WhatsApp', B, 0.35), tNo = quando('nota', B, 0.5), tMs = quando('mensagem', B, 0.75), tPr = quando('pronta', B, 0.92);
      ve(comp, telaC); comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, { n: 6 }), 'm6');
      if (tc < tMs) telaC.mostrar('analiseZe', { ate: tc > tNo + 0.4 ? 1 : 0, score: K.clamp((tc - tNo) / 0.7), zap: tc > tZa });
      else telaC.mostrar('msgZe', { d: K.clamp((tc - tMs) / 1.0) });
      // PERSONAGEM: de pé do lado da tela, clica · em "pronta": vira pra câmera e faz sim
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc < tPr ? TELA_Q : [1.6, 1.4, 5]);
      if (tc < tPr) menino.apontar(0.55 + Math.sin(tc * 3) * 0.05); else menino.reagir('sim', tc - tPr);
      K.som('clique', tAb, 0.4); K.som('ding', tZa, 0.35); for (let k = 0; k < 5; k++) K.som('bip', tNo + k * 0.12, 0.2); K.som('certo', tPr, 0.45);
      // CÂMERA: (1) perto da tela, de frente-esquerda · (2) chegando, frente
      const cv = (tNo + tMs) / 2;
      if (tc < cv) K.filmar([telaC, mais(TELA_Q, [0, 1.0, 0]), mais(TELA_Q, [0, -1.0, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -12, altura: 'olho', tam: 1.5 });
      else K.filmar([telaC, menino, cabecaDe(menino, 0.3)], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 2.4 });
      if (tc > tZa && tc < tMs) fx.et.zap.em({ tela: [540, 400] }, tc - tZa);
    },
    fecha(B, tc) {
      // NA TELA: o despertador nas 5:59; o Rafa com o celular: "Fechado! 👊"; o contrato com o carimbo FECHADO · MOSTRA: despertador, celular, personagem
      const tCi = quando('cinco', B, 0.12), tZe = quando('Zé', B, 0.55), tFe = quando('fechado', B, 0.8);
      ve(comp, calend); comp.tela.desenhar(siteDemo, 'demo0');
      despTocando(tc, 0, 5 + 59 / 60);
      // PERSONAGEM: de pé, ansioso olhando o celular · em "fechado": comemora pulando
      const POS = mais(DESP, [-0.8, 0, 0.6]);
      menino.colocar(POS, [0.5, 1.4, 5]);
      if (tc < tFe) { menino.reagir('celular', tc - B.inicio); menino.g.position.y = Math.abs(Math.sin(tc * 14)) * 0.01; } else menino.reagir('comemorando', tc - tFe);
      // CÂMERA: (1) o despertador nas 5:59, de perto · (2) nele com o celular, médio
      const cv = Math.min(tZe - 0.1, B.inicio + 1.6);
      if (tc < cv) K.filmar([mais(DESP, [0, 1.0, 0]), mais(DESP, [0, 1.55, 0]), mais(DESP, [0, 0.45, 0])], 'chegando', pc(tc, B.inicio, cv), { plano: 'perto', lado: -10, altura: 'olho', tam: 1.4 });
      else K.filmar([cabecaDe(menino, 0.3), mais(POS, [0, 0.3, 0]), mais(DESP, [0, 1.3, 0])], 'afastando', pc(tc, cv, B.ate), { plano: 'medio', lado: 12, altura: 'olho', tam: 2.4 });
      if (tc < tFe) celNaMao((c, w, h) => zap(c, w, h, { resp: tc > tZe }), 'z' + (tc > tZe), 1.6);
      else {
        ve(contrato); const cab = cabecaDe(menino, 0.25);
        contrato.position.set(cab[0] + 0.7, cab[1] + 0.1, cab[2] + 0.2); contrato.lookAt(K.camera.position); contrato.scale.setScalar(pop(tc - tFe));
        carimbo.visible = tc > tFe + 0.2; carimbo.scale.setScalar(tc > tFe + 0.2 ? K.lerp(1.8, 1, K.suave(pc(tc, tFe + 0.2, tFe + 0.35))) : 0.001);
        fx.simb.em(mais(cab, [-0.4, 0.4, 0]), tc - tFe, { tipo: '✓', tam: 0.6 });
      }
      // SONS: tic-tac · o ding da mensagem · baque do carimbo · festa
      for (let k = 0; k < 6; k++) K.som('clique', B.inicio + k * 0.3, 0.2);
      K.som('ding', tZe, 0.5); K.som('baque', tFe + 0.2, 0.6); K.som('festa', tFe + 0.25, 0.5);
      void tCi;
    },
    terca(B, tc) {
      // NA TELA: o calendário vira pra TERÇA; o despertador tocando normal; o Rafa acorda e comemora · MOSTRA: calendario, personagem, despertador
      const tPr = quando('primeira', B, 0.25), tAc = quando('acorda', B, 0.55), tTe = quando('terça', B, 0.85);
      ve(comp, calend); comp.tela.desenhar(siteDemo, 'demo0');
      calend.userData.desenhar(diaCal(tc > tTe ? 'TERÇA' : 'SEGUNDA', tc > tTe ? '#16a34a' : '#d8343a'), 'c' + (tc > tTe));
      despTocando(tc, tc < tAc ? 0.6 : 0, 7);
      // PERSONAGEM: dormindo debruçado · em "acorda": espreguiça · em "terça": comemora
      sentado(MONITOR);
      if (tc < tAc) menino.reagir('dormindo', tc - B.inicio);
      else { menino.colocar(SEAT, tc < tTe ? CAL : [1.6, 1.4, 4]); menino.reagir(tc < tTe ? 'surpreso' : 'vitoria', tc - tAc); }
      // CÂMERA: (1) o calendário virando · (2) nele de frente, chegando
      const cv = tTe + 0.35;
      if (tc < cv) K.mirar([0.95, 2.0, K.lerp(0.9, 0.4, pc(tc, B.inicio, cv))], [CAL[0] - 0.2, CAL[1] - 0.45, CAL[2]]);
      else K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0, 0.4, 0]), CAL], 'chegando', pc(tc, cv, B.ate), { plano: 'medio', lado: 25, altura: 'olho', tam: 2.6 });
      fx.et.terca.em({ tela: [540, 400] }, tc - tTe);
      K.som('ding', B.inicio + 0.1, 0.3); K.som('whoosh', tTe, 0.3); K.som('festa', tTe + 0.1, 0.55);
      void tPr;
    },
    segue(B, tc) {
      // NA TELA: o Rafa de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo0');
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
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo0');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende "Segunda de novo": o despertador gigante pulando e o Rafa de susto, de frente
      ve(comp, calend); comp.tela.desenhar(telaEscura, 'esc');
      despTocando(0.37, 1.2, 7);
      menino.colocar(SEAT, [1.6, 1.4, 4]); menino.sentar(1); menino.reagir('susto', 0.3);
      K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0, 0.3, 0]), mais(DESP, [0, 1.5, 0])], 'parado', 0, { plano: 'medio', lado: 25, altura: 'olho', espacoCima: 0.3, tam: 2.6 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    menino.g.visible = false; menino.g.rotation.x = 0; menino.g.position.y = 0;
    tudo.forEach((g) => { g.visible = false; });
    folhasV.forEach((f) => { f.visible = true; });
    panfs.forEach((p) => { p.visible = false; });
    calend.userData.desenhar(diaCal('SEGUNDA'), 'seg');
    clarao.visible = false;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
