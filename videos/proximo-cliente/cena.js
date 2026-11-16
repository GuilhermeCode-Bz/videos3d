// Deu um trabalhão fechar o último cliente. Se você não sabe quem é o próximo, vai sofrer tudo de novo (canal Mappoa).
// Seis cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  let bl, CS, menino, dono, dona, robo, comp, cel, agenda, balao, telefone, ampulheta, pote, abas, telaC, telaM, navG, salao;
  const tudo = [], fx = {}, moedas = [], envelopes = [], alvos = [], predios = [], halos = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k), K.lerp(a[2], b[2], k)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'home_office', ultimo: 'academia', vazia: 'home_office', qualquer: 'cidade_maquete', virada: 'cidade_maquete',
    salao: 'cidade', trabalhao: 'home_noite', lista: 'home_noite', mappoa: 'mundo_mappoa', antes_agora: 'home_office',
    segue: 'home_office', cartao: 'home_office', capa: 'home_office'
  };
  // Home office: o computador do Nando na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33], NANDO = [0.45, 0, -0.2];
  const CEL_G = [-0.55, 1.6, 0.7], AG_G = [-2.05, 1.75, 0.4], AG_P = [-2.05, 2.0, -1.0];
  // Academia: o Nando no meio, o dono encostado na esteira
  const N_AC = [0.7, 0, 0.3], DONO = [-1.0, 0, -0.5];
  // Cidade: o calçadão em y = 0,14; o salão a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, SAL_X = -24.5, SAL_Z = -0.3, N_CID = [-22.9, G, 4.3], DONA = [-25.3, G, 3.5];
  // Maquete: o Nando no quarteirão do meio; os 3 salões que já têm o problema, no fundo dele
  const N_MQ = [0.55, 0.12, 0.75], ALV = [[-0.85, 0.12, -0.7], [0, 0.12, -0.95], [0.85, 0.12, -0.7]];
  const DESTINO = [[2.6, 1.6, 0], [-2.6, 1.6, 0], [0, 1.6, -2.6], [2.6, 1.8, -2.6], [-2.6, 1.8, -2.6], [2.6, 1.5, 2.6], [-2.6, 1.5, 2.6], [-2.6, 1.9, -1.2]];
  const SALOES = [
    { nome: 'Salão Bella Vista', end: 'Rua Barão de Jaguara, 410', chips: ['whats', 'insta'] },
    { nome: 'Studio Charme', end: 'Av. Norte-Sul, 1200', chips: ['whats', 'tel'] },
    { nome: 'Espaço Beleza Pura', end: 'Rua Conceição, 88', chips: ['tel', 'insta'] },
    { nome: 'Unhas & Cia', end: 'Av. Brasil, 515', chips: ['whats'] }
  ];
  const MSGS = [
    ['eu', 'Oi! Faço sites pra academias'], ['ele', 'Visualizado'], ['eu', 'Posso te mostrar uma ideia?'],
    ['ele', 'Vou ver e te falo'], ['eu', 'Conseguiu ver?'], ['ele', 'Me chama semana que vem'], ['eu', 'Oi, tudo bem? 🙂'], ['ele', 'Visualizado']
  ];
  const ABAS = ['Google Maps', 'salaocharme.com.br', 'instagram.com/belezapura', 'Google Maps', 'unhasecia.com.br'];

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
  // A conversa de WhatsApp com a academia: n mensagens, a última embaixo; "fechado" põe o "Fechado! ✓"
  function chat(c, w, h, n, fechado, cinza) {
    c.fillStyle = cinza ? '#e4e4e4' : '#efe7dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = cinza ? '#6b6b6b' : '#075e54'; c.fillRect(0, 0, w, h * 0.13);
    const f = w * 0.062;
    txt(c, 'Academia Força Total', w * 0.06, h * 0.05, f * 1.05, '#fff', 800, 'left', w * 0.88);
    txt(c, 'WhatsApp', w * 0.06, h * 0.095, f * 0.75, '#cfe9df', 600);
    const lista = MSGS.slice(0, n).map((m) => m);
    if (fechado) lista.push(['ele', 'Fechado! ✓']);
    let y = h * 0.93;
    for (let i = lista.length - 1; i >= 0 && y > h * 0.16; i--) {
      const [quem, s] = lista[i], visto = s === 'Visualizado', fe = s.startsWith('Fechado');
      c.font = `${fe ? 900 : 700} ${fe ? f * 1.3 : f}px Montserrat, sans-serif`;
      const bw = Math.min(w * 0.82, c.measureText(s).width + w * 0.08), bh = fe ? f * 2.6 : f * 2.0;
      y -= bh;
      if (visto) { txt(c, '✓✓ ' + s, w * 0.06, y + bh / 2, f * 0.85, '#8a8f94', 700, 'left'); y -= f * 0.4; continue; }
      const x = quem === 'eu' ? w * 0.94 - bw : w * 0.06;
      rr(c, x, y, bw, bh, f * 0.6, fe ? (cinza ? '#9a9a9a' : '#00bc7b') : quem === 'eu' ? (cinza ? '#d0d0d0' : '#d9fdd3') : '#fff');
      txt(c, s, x + w * 0.04, y + bh / 2, fe ? f * 1.3 : f, fe ? '#fff' : '#111b21', fe ? 900 : 700, 'left', bw - w * 0.06);
      y -= f * 0.55;
    }
  }
  // A ficha do Maps do salão no celular: o "Site" que é o Instagram
  function fichaMaps(c, w, h, insta) {
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    const f = w * 0.065;
    rr(c, w * 0.04, h * 0.03, w * 0.92, h * 0.07, h * 0.035, '#f1f3f4'); txt(c, 'salão de beleza campinas', w * 0.09, h * 0.065, f * 0.8, '#202124', 700, 'left', w * 0.8);
    c.fillStyle = '#d7e8d0'; c.fillRect(0, h * 0.12, w, h * 0.2);
    c.fillStyle = '#e8537a'; c.beginPath(); c.arc(w / 2, h * 0.2, w * 0.05, 0, 7); c.fill();
    txt(c, 'Salão Bella Vista', w * 0.06, h * 0.37, f * 1.15, '#202124', 900, 'left', w * 0.88);
    txt(c, '★★★★★  Salão de beleza', w * 0.06, h * 0.43, f * 0.8, '#f9ab00', 800, 'left', w * 0.88);
    rr(c, w * 0.06, h * 0.49, w * 0.4, h * 0.07, h * 0.035, '#1067f8'); txt(c, 'Ligar', w * 0.26, h * 0.525, f * 0.9, '#fff', 800, 'center');
    txt(c, 'Site:', w * 0.06, h * 0.65, f, '#5f6368', 800);
    if (insta) { rr(c, w * 0.04, h * 0.69, w * 0.92, h * 0.09, h * 0.03, '#fdebf1'); txt(c, 'instagram.com/', w * 0.08, h * 0.72, f * 0.85, '#d6336c', 800); txt(c, 'salaobellavista', w * 0.08, h * 0.755, f * 0.85, '#d6336c', 900); }
    else txt(c, 'carregando...', w * 0.06, h * 0.73, f * 0.9, '#9aa0a6', 700);
  }
  // O celular do "Agora": o próximo cliente já marcado
  function proximoCel(c, w, h, k) {
    c.fillStyle = '#f4f8fd'; c.fillRect(0, 0, w, h);
    const f = w * 0.065;
    txt(c, 'Mappoa', w * 0.06, h * 0.06, f, '#050d1c', 800);
    txt(c, 'Próximo cliente', w * 0.06, h * 0.16, f * 0.9, '#596571', 700);
    rr(c, w * 0.04, h * 0.21, w * 0.92, h * 0.3, w * 0.06, k ? '#e3f8ef' : '#fff');
    c.strokeStyle = k ? '#00bc7b' : '#e2e8f0'; c.lineWidth = 4; c.beginPath(); c.roundRect(w * 0.04, h * 0.21, w * 0.92, h * 0.3, w * 0.06); c.stroke();
    txt(c, 'Salão Bella Vista', w * 0.09, h * 0.28, f * 1.05, '#050d1c', 900, 'left', w * 0.82);
    txt(c, 'Sem site · só Instagram', w * 0.09, h * 0.35, f * 0.8, '#d97706', 800, 'left', w * 0.82);
    rr(c, w * 0.09, h * 0.4, w * 0.4, h * 0.07, h * 0.035, '#e6f9ed'); txt(c, 'WhatsApp', w * 0.29, h * 0.435, f * 0.8, '#16a34a', 800, 'center');
  }
  // O site da academia pronto, no monitor do Nando
  function siteAcademia(c, w, h) {
    c.fillStyle = '#16181d'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#ff7a1a'); d.addColorStop(1, '#ffb020'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.3);
    txt(c, 'Força Total', w * 0.06, h * 0.12, w * 0.085, '#fff', 900); txt(c, 'Academia · Campinas', w * 0.06, h * 0.22, w * 0.045, '#fff', 700);
    txt(c, 'Treine com a gente', w * 0.06, h * 0.45, w * 0.06, '#fff', 900);
    rr(c, w * 0.06, h * 0.56, w * 0.36, h * 0.14, h * 0.07, '#ff7a1a'); txt(c, 'Agendar aula', w * 0.24, h * 0.63, w * 0.04, '#fff', 800, 'center');
    [0, 1, 2].forEach((i) => rr(c, w * (0.5 + i * 0.16), h * 0.42, w * 0.13, h * 0.42, 8, ['#2b2f36', '#3a3f48', '#2b2f36'][i]));
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['home_office', ['home_office', { hora: 'noite' }, 'home_noite'], 'academia', 'cidade_maquete', 'cidade', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A agenda do Nando: as páginas em branco e o "?"
    T.agenda = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = e.cinza ? '#9aa0a6' : '#e8352b'; c.fillRect(0, 0, w, h * 0.2);
      txt(c, 'AGENDA', w / 2, h * 0.1, w * 0.11, '#fff', 900, 'center');
      const cw = w / 5, ch = (h * 0.78) / 4;
      c.strokeStyle = '#e2e8f0'; c.lineWidth = 3;
      for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
        c.strokeRect(i * cw + 6, h * 0.21 + j * ch + 6, cw - 12, ch - 12);
        txt(c, String(1 + i + j * 5 + (e.pag || 0) * 20), i * cw + 18, h * 0.21 + j * ch + 26, w * 0.04, '#9aa0a6', 700);
      }
      if (e.q) { c.globalAlpha = Math.min(1, e.q); txt(c, '?', w / 2, h * 0.6, w * 0.55, '#e8352b', 900, 'center'); c.globalAlpha = 1; }
      if (e.cinza) { c.fillStyle = 'rgba(120,120,120,.25)'; c.fillRect(0, 0, w, h); }
    };
    // As abas do navegador abrindo uma em cima da outra, empresa por empresa
    T.abas = (c, w, h, e) => {
      c.fillStyle = '#20242c'; c.fillRect(0, 0, w, h);
      for (let i = 0; i < Math.min(e.n, ABAS.length); i++) {
        const x = 20 + i * 34, y = 24 + i * 44, ww = w - 40 - (ABAS.length - 1) * 34, hh = h - 48 - (ABAS.length - 1) * 44;
        rr(c, x, y, ww, hh, 14, '#ffffff'); rr(c, x, y, ww, 54, 14, '#e8eaed');
        txt(c, ABAS[i], x + 22, y + 28, 24, '#202124', 800, 'left', ww - 44);
        if (ABAS[i] === 'Google Maps') { c.fillStyle = '#d7e8d0'; c.fillRect(x + 8, y + 62, ww - 16, hh - 70); c.fillStyle = '#e8352b'; c.beginPath(); c.arc(x + ww / 2, y + hh / 2 + 20, 18, 0, 7); c.fill(); }
        else if (ABAS[i].startsWith('insta')) { txt(c, 'Último post: há 8 meses', x + 22, y + 120, 22, '#d6336c', 700, 'left', ww - 44); }
        else { c.lineWidth = 8; c.strokeStyle = '#dfe5ee'; c.beginPath(); c.arc(x + ww / 2, y + hh / 2 + 20, 34, 0, 7); c.stroke(); c.strokeStyle = '#1067f8'; c.beginPath(); c.arc(x + ww / 2, y + hh / 2 + 20, 34, i, i + 1.9); c.stroke(); }
      }
    };
    // A lista dos salões de Campinas, no grupo SEM SITE, sem os totais da captura
    T.listaSaloes = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: SALOES, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Salões de beleza · Campinas, SP', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      if (e.pilula) { rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center'); }
    };
    // A análise do Salão Bella Vista: a aderência com o score, as dores e as oportunidades
    T.analiseSalao = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Salão Bella Vista', ate: e.ate, aderencia: 0.92 * k,
        dores: ['Sem site próprio', 'Agenda só pelo Instagram'], oportunidades: ['Site com agendamento online'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre quanta cliente procura o salão no Google e não acha o site.'
      });
      if (e.ate >= 0) { txt(c, Math.round(92 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right'); }
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Nando (do canal), o dono da academia, a dona do salão e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dono = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0xe8352b, bermuda: 0x2a2e33, tenis: 0xf4f1ea, cabelo: 0x1a1210, pele: 0xc98f62 } });
    K.semNome(dono.g); K.nomear('dono', dono.g);
    dona = K.boneco({ tipo: 'menina', roupa: 'camiseta', cores: { camiseta: 0xe8537a, bermuda: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xb97a50 } });
    K.semNome(dona.g); K.nomear('dona', dona.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O celular (gigante no gancho, na mão nas outras) e a agenda
    cel = K.celular(); guarda(cel, 'celular', CEL_G, 5.5);
    agenda = K.painelMappoa(1.1, 1.0, { px: 700, borda: '#e8352b' }); guarda(agenda, 'calendario', AG_G);

    // Home office: o computador, o pote das moedas, as abas e a barra do endereço
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    pote = K.malha(new THREE.CylinderGeometry(0.26, 0.22, 0.36, 24), K.mat(0x2fb5a6)); K.scene.add(pote); guarda(pote, 'pote', [1.35, 0.18, 0.35]);
    const ouro = K.mat(0xffc531, { metalness: 0.6, roughness: 0.3 });
    for (let i = 0; i < 5; i++) { const m = K.malha(new THREE.CylinderGeometry(0.11, 0.11, 0.035, 24), ouro); K.scene.add(m); moedas.push(guarda(m, 'moedas', [1.35, 0.4, 0.35])); }
    abas = K.painelMappoa(1.7, 1.25, { px: 800, borda: '#20242c' }); guarda(abas, 'abas', [-0.45, 1.75, 0.1]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Academia: as mensagens, as ligações e a espera em cima do Nando
    balao = guarda(K.m3d('balao_chat'), 'balao', mais(N_AC, [-0.55, 2.15, 0]), 0.6);
    telefone = guarda(K.m3d('telefone_fixo'), 'telefone', mais(N_AC, [0, 2.35, 0]), 0.7);
    ampulheta = guarda(K.m3d('ampulheta'), 'ampulheta', mais(N_AC, [0.55, 2.0, 0]), 0.6);

    // Maquete: os envelopes e os 3 salões que já têm o problema
    for (let i = 0; i < 8; i++) envelopes.push(guarda(K.m3d('envelope'), 'envelopes', [0, 1.3, 0], 0.6));
    ALV.forEach((p, i) => {
      predios.push(guarda(K.m3d('prediozinho', { cor: [0xf8b4c8, 0xffd08a, 0xf8b4c8][i], a: 1.2, placa: 'SALÃO' }), 'predios', p, 0.8));
      alvos.push(guarda(K.m3d('alvo'), 'alvos', mais(p, [0, 1.75, 0.15]), 0.45));
      halos.push(guarda(K.halo(0xffa63d, 1.6), null, mais(p, [0, 0.7, -0.2])));
    });

    // Cidade: a fachada do Salão Bella Vista, com a placa do Instagram no lugar do site
    salao = new THREE.Group(); salao.position.set(SAL_X, G, SAL_Z); K.scene.add(salao);
    K.modelo('kenney-cidade/building-small-d', { escala: 5, pos: [0, 0, 0], pai: salao });
    const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(0xe8537a)); toldo.position.set(0, 2.55, 3.0); toldo.rotation.x = 0.25; salao.add(toldo);
    const placa = K.placa('Salão Bella Vista', { larg: 2.8, alt: 0.7, fundo: '#fff0f4', cor: '#b0244d', borda: '#b0244d' }); K.scene.remove(placa); placa.position.set(0, 3.15, 2.62); salao.add(placa);
    const pInsta = K.placa('@salaobellavista', { larg: 1.3, alt: 0.42, fundo: '#d6336c', cor: '#ffffff', borda: '#ffffff' }); K.scene.remove(pInsta); pInsta.position.set(1.35, 1.6, 2.62); salao.add(pInsta);
    salao.userData.insta = pInsta;
    guarda(salao, 'salao');

    // Palco do Mappoa: a análise
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [-0.45, 1.75, 0.15]);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      designer: e('Web designer', 'azul'), semanas: e('Semanas', 'laranja'), vazia: e('Agenda vazia', 'vermelho'),
      oi: e('"Oi, faço sites"', 'azul'), ninguem: e('Ninguém responde', 'vermelho'), problema: e('Já tem o problema', 'laranja'),
      semSite: e('Sem site', 'vermelho'), soInsta: e('Só o Instagram', 'laranja'), trabalhao: e('O mesmo trabalhão', 'vermelho'),
      semSite2: e('Sem site', 'laranja'), proximo: e('Seu próximo cliente', 'verde'), antes: e('Trabalhão', 'vermelho'),
      agora: e('O próximo cliente', 'verde')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual cliente deu mais trabalho pra você fechar? <em>Comenta aí</em>');
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  function voa(e, a, b, d, alt = 1.0) { ve(e); const q = K.clamp(d); e.position.set(...lerp3(a, b, q)); e.position.y += Math.sin(q * Math.PI) * alt; e.rotation.set(0, 0, q * 4); }
  // O celular na mão do Nando (pos = onde ele está)
  function celNaMao(pos, op = {}) {
    cel.g.scale.setScalar(op.esc || 1.8);
    cel.g.position.set(pos[0] + (op.dx || 0.3), pos[1] + 1.05, pos[2] + 0.4); cel.g.rotation.set(-0.25, op.giro || 0.25, 0);
  }
  const desenhaChat = (n, fe, cinza) => cel.tela.desenhar((c, w, h) => chat(c, w, h, n, fe, cinza), 'chat' + n + (fe ? 'f' : '') + (cinza ? 'c' : ''));

  const P = {
    gancho(B, tc) {
      // NA TELA: o celular gigante com a conversa da academia; o Nando à direita suando; a agenda surge à esquerda · MOSTRA: celular, personagem
      // CENÁRIO: home office de dia; o ring light e a planta (o cenário cuida)
      const tF = quando('fechar', B, 0.2), tP = quando('próximo', B, 0.55), tT = quando('tudo', B, 0.85);
      ve(cel, comp); comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
      // ENTRA AGORA / OBJETOS SE MEXENDO: as mensagens sobem desde o 1º quadro; "Fechado!" em "fechar"; em "tudo", a conversa recomeça
      const n = tc > tT ? Math.min(MSGS.length, 1 + Math.floor((tc - tT) / 0.3)) : Math.min(MSGS.length, 2 + Math.floor((tc - B.inicio) / 0.3));
      desenhaChat(n, tc > tF && tc < tT);
      const tranco = tc > tF && tc < tF + 0.3 ? Math.sin((tc - tF) * 60) * 0.03 : 0;
      cel.g.position.set(CEL_G[0] + tranco, CEL_G[1], CEL_G[2]);
      for (let k = 0; k < 5; k++) K.som('bip', B.inicio + 0.05 + k * 0.3, 0.3);
      // a agenda em branco com o "?" em "próximo"
      if (tc > tP) { ve(agenda); agenda.g.scale.setScalar(pop(tc - tP)); agenda.mostrar('agenda', { q: K.clamp((tc - tP - 0.2) / 0.3), pag: Math.min(3, Math.floor((tc - tP) / 0.25)) }); }
      // PERSONAGEM: começo cansado, suando · em "fechar": vitória · em "próximo": susto
      const pos = [0.85, 0, 0.55];
      menino.colocar(pos, tc > tP ? mais(AG_G, [0, 0, 0.5]) : [0.6, 1.4, 5]);
      if (tc > tP) menino.reagir('susto', tc - tP); else if (tc > tF) menino.reagir('vitoria', tc - tF); else { menino.reagir('cansado', B.t); menino.suar(B.t); }
      // SONS: certo em "fechar" · errado em "próximo" · whoosh em "tudo"
      K.som('certo', tF, 0.6); K.som('errado', tP, 0.6); K.som('whoosh', tT, 0.5);
      // CÂMERA: chegando · perto · frente · olho, topo livre
      K.filmar([CEL_G, mais(pos, [0, 0.9, 0])], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.3, tam: 1.3, obstaculos: false });
      const [x, y] = K.tela(mais(CEL_G, [0.5, 0.5, 0]));
      fx.certo.em({ tela: [x + 40, y] }, tc > tT ? -1 : tc - tF);
    },
    ultimo(B, tc) {
      // NA TELA: na academia, o Nando perto da esteira; o dono; o balão, o telefone e a ampulheta em cima do Nando · MOSTRA: personagem, dono, ampulheta
      // CENÁRIO: as esteiras, o espelho e os halteres (o cenário cuida)
      const tD = quando('designer', B, 0.15), tS = quando('semanas', B, 0.55), tM = quando('mensagem', B, 0.65), tL = quando('ligação', B, 0.78), tE = quando('espera', B, 0.9);
      // ENTRA AGORA: o balão em "mensagem", o telefone em "ligação", a ampulheta em "espera"
      [[balao, tM, -0.55, 2.15], [telefone, tL, 0, 2.4], [ampulheta, tE, 0.55, 2.0]].forEach(([o, t0, dx, y]) => {
        if (tc < t0) return; ve(o); const g = o.g || o;
        const esc = { [balao.id]: 0.6, [telefone.id]: 0.7, [ampulheta.id]: 0.6 }[g.id] || 0.6;
        g.scale.setScalar(esc * pop(tc - t0));
        const a = tc > tE ? (tc - tE) * 1.2 : 0;   // em "espera", os três giram em volta da cabeça
        g.position.set(N_AC[0] + dx * Math.cos(a), y + Math.sin(tc * 4 + dx) * 0.04, N_AC[2] + dx * Math.sin(a));
        g.rotation.y = o === ampulheta ? 0 : Math.sin(tc * 3) * 0.3;
        if (o === telefone && tc - t0 < 0.8) g.position.x += Math.sin(tc * 70) * 0.015;
        if (o === ampulheta) g.rotation.z = Math.min(Math.PI, (tc - t0) * 4);
      });
      // PERSONAGEM: começo mostrando (apresenta o site) · em "espera": cansado. O dono: dúvida, e no fim joia (segurando)
      menino.colocar(N_AC, mais(DONO, [0, 1.3, 0]));
      if (tc > tE) menino.reagir('cansado', tc - tE); else menino.reagir('mostrando', B.t);
      dono.colocar(DONO, mais(N_AC, [0, 1.3, 0]));
      if (tc > tE + 0.3) dono.reagir('segurando', tc - tE - 0.3); else dono.reagir('duvida', B.t);
      // EFEITOS VISUAIS: "Web designer" · "Semanas"
      if (tc < tS) fx.et.designer.em(mais(N_AC, [0.3, 2.0, 0.2]), tc - tD); else fx.et.semanas.em(mais(DONO, [0, 2.1, 0.2]), tc - tS);
      K.som('bip', tM, 0.5); K.som('apito', tL, 0.4); K.som('zumbido', tE, 0.4);
      // CÂMERA: passando · médio · esquerda · olho
      K.filmar([menino, dono, mais(N_AC, [0, 2.4, 0])], 'passando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho', tam: 1.2 });
    },
    vazia(B, tc) {
      // NA TELA: o monitor com o site da academia; o pote das moedas; a agenda na parede; o Nando na frente da mesa · MOSTRA: monitor, calendario, personagem
      const tP = quando('pronto', B, 0.15), tD = quando('dinheiro', B, 0.35), tA = quando('agenda', B, 0.6), tV = quando('vazia', B, 0.75);
      ve(comp, pote, agenda); comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
      agenda.g.position.set(...AG_P); agenda.g.scale.setScalar(1.25);
      agenda.mostrar('agenda', { pag: tc > tV ? 1 + Math.min(3, Math.floor((tc - tV) / 0.2)) : 0, cinza: tc > tV + 0.6 });
      // OBJETOS SE MEXENDO: as moedas caem no pote em "dinheiro"
      moedas.forEach((m, i) => { const d = (tc - tD - i * 0.15) / 0.4; if (d <= 0) return; ve(m); const q = K.clamp(d); m.position.set(1.35 + Math.sin(i) * 0.05, K.lerp(2.6, 0.38 + i * 0.03, q * q), 0.35); m.rotation.set(q * 6, 0, q * 2); if (i < 3) K.som('metal', tD + i * 0.15 + 0.4, 0.35); });
      // PERSONAGEM: começo vitória · em "vazia": triste, olhando a agenda
      menino.colocar(NANDO, tc > tV ? AG_P : [0.6, 1.4, 5]);
      if (tc > tV) menino.reagir('triste', tc - tV); else menino.reagir('vitoria', B.t);
      fx.et.vazia.em(mais(AG_P, [0, 0.95, 0.2]), tc - tV);
      K.som('ding', tP, 0.5); K.som('desliga', tV, 0.5);
      // CÂMERA: afastando · médio · direita · baixo
      K.filmar([comp, agenda, menino], 'afastando', B.p, { plano: 'medio', lado: 25, altura: 'baixo', tam: 1.5 });
      const [x, y] = K.tela(mais(MONITOR, [0.6, 0.5, 0.3]));
      fx.certo.em({ tela: [x, y] }, tc - tP);
    },
    qualquer(B, tc) {
      // NA TELA: a cidade em miniatura; o Nando no meio; os envelopes voando pros prédios · MOSTRA: envelopes, personagem
      // CENÁRIO: os carrinhos andando, os prédios coloridos (o cenário cuida)
      const tM = quando('manda', B, 0.1), tQ = quando('qualquer', B, 0.35), tN = quando('ninguém', B, 0.8);
      const mao = mais(N_MQ, [0.2, 1.15, 0.1]);
      envelopes.forEach((e, i) => {
        const t0 = tQ + i * 0.18, d = (tc - t0) / 0.55;
        if (d <= 0) return;
        if (tc < tN || i === 2) voa(e, mao, DESTINO[i], d, 1.0);
        else { const v = K.clamp((tc - tN - i * 0.05) / 0.5), de = DESTINO[i], chao = mais(N_MQ, [Math.cos(i * 1.7) * 0.7, 0.05, Math.sin(i * 1.7) * 0.6]); voa(e, de, chao, v, 0.8); if (v >= 1) e.rotation.set(-Math.PI / 2, 0, i); }
        if (i < 5) K.som('whoosh', t0, 0.25);
      });
      // PERSONAGEM: começo empurrando (arremessa, girando pra cada lado) · em "ninguém": triste
      menino.colocar(N_MQ, tc > tN ? [0.5, 1.2, 6] : DESTINO[Math.max(0, Math.min(7, Math.floor((tc - tQ) / 0.18)))]);
      if (tc > tN) menino.reagir('triste', tc - tN); else menino.reagir('empurrando', B.t);
      // EFEITOS VISUAIS: "Oi, faço sites" em "manda" · "Ninguém responde" com ✗ em "ninguém"
      if (tc < tN) fx.et.oi.em(mais(N_MQ, [0, 2.0, 0]), tc - tM); else fx.et.ninguem.em(mais(N_MQ, [0, 2.0, 0]), tc - tN);
      K.som('baque', tN + 0.4, 0.5); K.som('baque', tN + 0.6, 0.4);
      // CÂMERA: subindo · aberto · frente · alto
      K.filmar([mais(N_MQ, [0, 0.8, 0]), [2.6, 1.6, 0], [-2.6, 1.8, -2.6]], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'alto', tam: 1.6 });
      const [x, y] = K.tela(mais(N_MQ, [0, 2.0, 0]));
      fx.errado.em({ tela: [x, y - 120] }, tc - tN - 0.2);
    },
    virada(B, tc) {
      // NA TELA: a maquete; os 3 salões acendendo com um alvo em cima; o Nando apontando · MOSTRA: alvos, personagem
      const tQ = quando('qualquer', B, 0.3), tPr = quando('problema', B, 0.7);
      // ENTRA AGORA: os salões sobem em "qualquer"; os alvos caem e os halos acendem em "problema"
      predios.forEach((p, i) => { ve(p); K.entrar(p, 'sobe', tc - tQ - i * 0.12, { dur: 0.35, som: false }); });
      alvos.forEach((a, i) => {
        const t0 = tPr + i * 0.2; if (tc < t0) return; ve(a);
        const q = K.clamp((tc - t0) / 0.35); a.position.set(ALV[i][0], K.lerp(3.6, ALV[i][1] + 1.75, q * q), ALV[i][2] + 0.15); a.rotation.y = (1 - q) * Math.PI;
        ve(halos[i]); halos[i].scale.setScalar(1.6 * K.clamp((tc - t0) / 0.3) * (1 + Math.sin(tc * 6) * 0.06));
        K.som('ding', t0, 0.4);
      });
      for (let i = 0; i < 3; i++) K.som('bip', tQ + i * 0.12, 0.25);
      // PERSONAGEM: começo pensando · em "problema": ideia e aponta o salão mais perto
      menino.colocar(N_MQ, ALV[2]);
      if (tc > tPr + 0.4) menino.apontar(0.5); else if (tc > tPr) menino.reagir('ideia', tc - tPr); else menino.reagir('pensando', B.t);
      fx.et.problema.em([0, 2.75, -0.8], tc - tPr);
      // CÂMERA: revelando · aberto · esquerda · alto
      K.filmar([...predios, menino, [0, 2.3, -0.8]], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'alto', tam: 2.4 });
    },
    salao(B, tc) {
      // NA TELA: a fachada do Salão Bella Vista com a placa do Instagram; o Nando com o celular na ficha do Maps; a dona na porta · MOSTRA: salao, celular, personagem
      // CENÁRIO: a cidade de dia; os carros passando (o cenário cuida)
      const tR = quando('salão', B, 0.25), tS = quando('sem', B, 0.4), tI = quando('Instagram', B, 0.75);
      ve(salao, cel);
      salao.userData.insta.rotation.z = Math.sin(tc * 3) * 0.05;
      // ENTRA AGORA: o celular sobe em "salão"; o Instagram aparece na ficha em "Instagram"
      cel.tela.desenhar((c, w, h) => fichaMaps(c, w, h, tc > tI), tc > tI ? 'fichaI' : 'ficha');
      // PERSONAGEM: começo segurando o celular · em "Instagram": surpreso, apontando a placa
      menino.colocar(N_CID, tc > tI ? mais([SAL_X, G, SAL_Z], [1.35, 1.6, 2.6]) : [-20, 1.4, 9]);
      if (tc > tI + 0.4) menino.apontar(0.5); else if (tc > tI) menino.reagir('surpreso', tc - tI); else menino.reagir('segurando', B.t);
      celNaMao(N_CID, { esc: 1.8 * Math.max(0.3, pop(tc - tR + 0.3)) * 1.25, giro: 0.5, dx: 0.35 });
      dona.colocar(DONA, [-22, 1.3, 8]); dona.acenar(tc);
      // EFEITOS VISUAIS: ✗ "Sem site" em "sem" · "Só o Instagram" em "Instagram"
      if (tc < tI) fx.et.semSite.em(mais([SAL_X, G, SAL_Z], [0.2, 4.0, 2.6]), tc - tS); else fx.et.soInsta.em(mais([SAL_X, G, SAL_Z], [1.35, 2.25, 2.7]), tc - tI);
      K.som('errado', tS, 0.5); K.som('clique', tI, 0.5);
      // CÂMERA: chegando · médio · direita · olho
      K.filmar([mais([SAL_X, G, SAL_Z], [0.6, 2.2, 2.6]), mais(N_CID, [0, 1.0, 0]), DONA], 'chegando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho', tam: 1.7 });
      const [x, y] = K.tela(mais([SAL_X, G, SAL_Z], [0.2, 4.0, 2.6]));
      fx.errado.em({ tela: [x, y - 150] }, tc < tI ? tc - tS : -1);
    },
    trabalhao(B, tc) {
      // NA TELA: de noite; as abas se empilhando na frente do monitor; a ampulheta; o Nando · MOSTRA: abas, ampulheta, personagem
      // CENÁRIO: o quarto de noite, a janela escura (o cenário cuida)
      const tE = quando('empresa', B, 0.25), tT = quando('trabalhão', B, 0.75);
      ve(comp, abas, ampulheta); comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
      const n = tc > tE ? 1 + Math.floor((tc - tE) / 0.3) : 0;
      abas.mostrar('abas', { n: Math.min(5, n) });
      for (let k = 0; k < 5; k++) K.som('clique', tE + k * 0.3, 0.3);
      ampulheta.position.set(0.85, 2.55, 0.25); ampulheta.scale.setScalar(0.6); ampulheta.rotation.set(0, 0, tc > tT ? Math.min(Math.PI, (tc - tT) * 5) : 0);
      // PERSONAGEM: começo pensando (clica rápido) · em "trabalhão": cansado, suando
      menino.colocar([0.75, 0, 0.75], tc > tT ? [0.4, 1.2, 5] : [-0.45, 1.7, 0.1]);
      if (tc > tT) { menino.reagir('cansado', tc - tT); menino.suar(tc - tT); } else menino.reagir('pensando', B.t);
      fx.et.trabalhao.em([-0.45, 2.75, 0.3], tc - tT);
      K.som('zumbido', tT, 0.5);
      // CÂMERA: girando · perto · esquerda · olho
      K.filmar([abas, ampulheta, menino], 'girando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho', angulo: 18, obstaculos: false });
    },
    lista(B, tc) {
      // NA TELA: de noite; a barra com mappoa.com acima do monitor; a lista do Mappoa sobe do computador; o Nando à direita · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.1), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tSa = quando('salões', B, 0.65), tS = quando('sem', B, 0.88);
      ve(comp, navG); comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
      // ENTRA AGORA: a barra em "digita" e as letras até "computador"; a lista sobe do monitor em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(-0.45, K.lerp(0.9, 1.6, q), K.lerp(-1.0, 0.15, q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tSa ? 1 + Math.floor((tc - tSa) / 0.25) : 0;
        telaC.mostrar('listaSaloes', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1, pilula: tc > tS });
        for (let k = 0; k < 4; k++) K.som('bip', tSa + k * 0.25, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: começo segurando (teclando) · em "lista": surpreso e aponta a tela
      menino.colocar([1.2, 0, 0.75], tc > tL ? [-0.45, 1.6, 0.15] : MONITOR);
      if (tc > tL + 0.5) menino.apontar(0.6); else if (tc > tL) menino.reagir('surpreso', tc - tL); else menino.reagir('segurando', B.t);
      fx.et.semSite2.em([0.75, 3.05, 0.3], tc - tS);
      // CÂMERA: subindo · médio · frente · olho
      K.filmar([navG, [-0.45, 1.6, 0.15], [-0.45, 0.5, 0.15], menino], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Salão Bella Vista; o robô à esquerda; o Nando à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.25), tPx = quando('próximo', B, 0.5), tCh = quando('chance', B, 0.75), tCo = quando('comprar', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: o score enche de "chance" a "comprar"; as dores e oportunidades em "comprar"
      const sc = Math.round(K.clamp((tc - tCh) / Math.max(0.4, tCo - tCh + 0.2)) * 20) / 20;
      telaM.mostrar('analiseSalao', { ate: tc > tCo ? 2 : 0, score: sc });
      K.som('ding', tCh, 0.4); K.som('certo', tCo, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPx ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "próximo": vitória
      menino.colocar([1.45, 0, 1.0], tc > tPx ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tPx) menino.reagir('vitoria', tc - tPx); else menino.reagir('chamando', B.t);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.proximo.em([-0.35, 3.2, 0.3], tc - tPx);
      K.som('brilho', tM, 0.6);
      // CÂMERA: chegando · médio · frente · baixo
      K.filmar([telaM, robo, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) "Antes": o Nando largado no home office e o celular gigante cheio de "Visualizado"; (2) "Agora": na calçada do salão, o Nando com o próximo cliente no celular · MOSTRA: personagem, celular
      const tTr = quando('trabalhão', B, 0.25), tG = quando('Agora', B, 0.45), tSa = quando('sabe', B, 0.7), tP = quando('próximo', B, 0.9);
      ve(cel);
      if (tc < tG) {
        ve(comp); comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
        desenhaChat(Math.min(MSGS.length, 3 + Math.floor((tc - B.inicio) / 0.25)), false, true);
        const pos = [0.85, 0, 0.55];
        menino.colocar(pos, [0.6, 1.4, 5]); menino.reagir('cansado', tc - B.inicio);
        fx.et.antes.em(mais(CEL_G, [0, 1.55, 0.3]), tc - tTr);
        K.som('errado', tTr, 0.5);
        K.filmar([CEL_G, mais(pos, [0, 0.9, 0])], 'afastando', K.clamp((tc - B.inicio) / Math.max(0.4, tG - B.inicio)), { plano: 'medio', lado: 'direita', altura: 'olho', obstaculos: false, tam: 1.3 });
      } else {
        ve(salao);
        cel.tela.desenhar((c, w, h) => proximoCel(c, w, h, tc > tP), tc > tP ? 'prox1' : 'prox0');
        const pos = menino.irPara([-20.6, G, 5.4], N_CID, K.clamp((tc - tG) / 1.1), tc, { olhar: DONA });
        if (tc > tP) menino.reagir('mostrando', tc - tP);
        cel.g.scale.setScalar(1.8 * 1.2 * pop(tc - tSa + 0.2)); celNaMao(pos, { esc: 1.8 * 1.2 * pop(tc - tSa + 0.2), giro: tc > tP ? -0.6 : 0.4, dx: 0.35 });
        dona.colocar(DONA, mais(pos, [0, 1.2, 0])); dona.acenar(tc);
        fx.et.agora.em(mais(N_CID, [0, 2.3, 0]), tc - tP);
        K.som('whoosh', tG, 0.5); K.som('certo', tP, 0.6);
        K.filmar([mais(pos, [0, 1.0, 0]), DONA, mais([SAL_X, G, SAL_Z], [0.4, 2.6, 2.6])], 'passando', K.clamp((tc - tG) / (B.ate - tG)), { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 1.8 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Nando no computador; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Qual', B, 0.02), tSg = quando('segue', B, 0.35), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
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
      comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
      robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], [0.5, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(cel, comp, agenda); desenhaChat(MSGS.length, false);
      comp.tela.desenhar((c, w, h) => siteAcademia(c, w, h), 'site');
      agenda.mostrar('agenda', { q: 1, pag: 2 });
      const pos = [0.85, 0, 0.55];
      menino.colocar(pos, [0.4, 1.4, 5]); menino.reagir('susto', 0.5); menino.humor('assustado');
      K.filmar([CEL_G, AG_G, mais(pos, [0, 0.9, 0])], 'parado', 0, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.35, tam: 1.4, obstaculos: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const agora = B.plano === 'antes_agora' && tc >= quando('Agora', B, 0.45);
    CS.usar(agora ? 'cidade' : LUGAR[B.plano] || 'home_office');
    [menino, dono, dona].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    cel.g.scale.setScalar(5.5); cel.g.position.set(...CEL_G); cel.g.rotation.set(0, 0, 0);
    agenda.g.scale.setScalar(1); agenda.g.position.set(...AG_G);
    telaC.g.scale.setScalar(1); telaC.g.position.set(-0.45, 1.6, 0.15);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
