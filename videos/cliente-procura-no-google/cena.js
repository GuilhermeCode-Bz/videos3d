// O cliente pesquisou "dentista perto de mim" (canal Mappoa).
// Cinco lugares (K.cenarios): a fachada da Clínica Sorriso, a recepção por dentro, o quarto do Rafa (de dia e de
// noite), a rua entre prédios com a outra clínica (DENTISTA) e o palco do Mappoa. Cada plano começa com a ficha.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, cliente, dentista, robo, comp, cel, celP, desp, cadeira, plan, telaC, telaM, telaR, navG, agenda, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Rafa no meio, virado pra +z; a cadeira na frente
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], PLAN = [1.5, 0, -0.9], DESP = [-0.08, 0.76, -1.2], CELP = [-1.6, 0, -0.1];
  // Fachada: a porta em x DX; o celular gigante na calçada, à direita da porta; o cliente olhando pra ele
  let DX = 0, CEL = [1.8, 0, 2.7], CLI = [0.5, 0, 3.0], RAFA_F = [-0.4, 0, 2.4], DENT_F = [0.6, 0, 1.6];
  // Recepção (clinica_odonto): a dentista na ponta do balcão, do lado de fora; a agenda ao lado dela
  const DENT_IN = [-2.85, 0, -1.9], AGENDA = [-1.35, 1.65, -1.25];
  // Rua: a porta da loja DENTISTA e a placa dela
  let RUA_D = [3, 0, -10], RUA_PLACA = [3.5, 3, -10];

  const LUGAR = {
    gancho: 'fora', rafa: 'quarto', agenda: 'clinica_odonto', outra: 'rua', procura: 'quarto_noite', lista: 'quarto',
    mappoa: 'mundo_mappoa', mostra: 'fora', antes_agora: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'fora'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') { const tA = quando('Agora', B, 0.45), tP = quando('perdendo', B, 0.75); return tc < tA ? 'quarto' : tc < tP ? 'rua' : 'fora'; }
    return LUGAR[B.plano] || 'quarto';
  }

  const CLINICAS = [
    { nome: 'Clínica Sorriso', end: 'Av. Brasil, 2140 · Maringá', chips: ['whats', 'tel'] },
    { nome: 'Odonto Bem Estar', end: 'Rua Néo Alves Martins, 880', chips: ['tel', 'insta'] },
    { nome: 'Dra. Paula Odontologia', end: 'Av. Tiradentes, 1210', chips: ['whats'] },
    { nome: 'Sorria Mais Clínica', end: 'Rua Santos Dumont, 455', chips: ['whats', 'insta'] }
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
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); txt(c, 'Nenhuma mensagem', w / 2, h / 2, w * 0.07, '#4a5568', 700, 'center'); }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Rafa Sites', w * 0.06, h * 0.13, w * 0.075, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A busca genérica no celular: a barra com o texto e os resultados (as outras clínicas, que têm site)
  function busca(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.05, '#111', 800);
    const q = 'dentista perto de mim', n = Math.floor(q.length * K.clamp(e.d == null ? 1 : e.d));
    rr(c, w * 0.06, h * 0.25, w * 0.88, h * 0.07, h * 0.035, '#eef1f5');
    c.strokeStyle = '#5f6b7a'; c.lineWidth = w * 0.012; c.beginPath(); c.arc(w * 0.14, h * 0.283, w * 0.025, 0, 7); c.stroke();
    txt(c, q.slice(0, n) + (n < q.length ? '|' : ''), w * 0.2, h * 0.285, w * 0.055, '#111', 700, 'left', w * 0.7);
    const res = [['Clínica Dente Feliz', 'Site · Horários · Rota'], ['OdontoVida', 'Site · Agende online'], ['Clínica Dr. Sorrir', 'Site · Ver endereço']];
    for (let i = 0; i < Math.min(e.n || 0, 3); i++) {
      const y = h * (0.36 + i * 0.165);
      rr(c, w * 0.05, y, w * 0.9, h * 0.15, 18, '#f7f9fc');
      txt(c, res[i][0], w * 0.1, y + h * 0.05, w * 0.06, '#1a4fd6', 800, 'left', w * 0.8);
      txt(c, '★ 4,' + (8 - i), w * 0.1, y + h * 0.095, w * 0.045, '#e3a008', 800);
      txt(c, res[i][1], w * 0.1, y + h * 0.135, w * 0.042, '#2b8a3e', 700, 'left', w * 0.8);
    }
    if ((e.n || 0) >= 3) txt(c, 'Clínica Sorriso: sem site', w / 2, h * 0.88, w * 0.045, '#c0392b', 800, 'center');
  }
  // A tela travada: zero mensagens
  function vazio(c, w, h) {
    const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, '#3a6fd8'); d.addColorStop(1, '#4b3a8f'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w / 2, h * 0.14, w * 0.2, '#fff', 300, 'center');
    txt(c, '0', w / 2, h * 0.48, w * 0.42, '#ffffff', 900, 'center');
    txt(c, 'mensagens', w / 2, h * 0.62, w * 0.09, '#ffffff', 800, 'center');
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['fachada', { loja: 'clinica' }, 'fora'], 'clinica_odonto', ['home_office', {}, 'quarto'], ['home_office', { hora: 'noite' }, 'quarto_noite'], ['rua_predios', {}, 'rua'], 'mundo_mappoa']);
    const Cf = CS.todos.fora; DX = Cf.lugares.porta[0];
    CEL = [DX + 1.9, 0, 2.6]; CLI = [DX + 0.45, 0, 3.0]; RAFA_F = [DX - 0.55, 0, 2.5]; DENT_F = [DX + 0.55, 0, 1.7];
    if (Cf.objetos && Cf.objetos.fachada) K.nomear('fachada', Cf.objetos.fachada);
    const Cr = CS.todos.rua;
    if (Cr.lugares.dentista) RUA_D = Cr.lugares.dentista;
    const lj = (Cr.lojas || []).find((l) => l.id === 'dentista'); if (lj && lj.placa) RUA_PLACA = lj.placa;

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaClinicas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: CLINICAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Clínicas odontológicas · Maringá, PR', 36, 168, 20, M.marinho, 700, 'left', w - 72);
    };
    T.analiseClinica = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Clínica Sorriso', ate: e.ate, aderencia: 0.88 * k,
        dores: ['Sem site próprio', 'Paciente não acha horário nem endereço'], oportunidades: ['Site com horários e agendamento pelo WhatsApp'],
        objecoes: ['"O Instagram já resolve"'], abordagem: 'Mostre que quem procura dentista na região acha outra clínica.'
      });
      if (e.ate >= 0) txt(c, Math.round(88 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };
    // A agenda do dia: todos os horários livres, piscando
    T.agenda = (c, w, h, e) => {
      c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2fb5a6'; c.fillRect(0, 0, w, 120);
      txt(c, 'Agenda · Terça', 30, 62, 40, '#fff', 900);
      const hs = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
      hs.forEach((s, i) => {
        const y = 150 + i * 92, pis = Math.sin((e.t || 0) * 6 + i) > 0.2;
        rr(c, 24, y, w - 48, 76, 18, '#fff');
        txt(c, s, 48, y + 38, 30, '#0b2545', 800);
        rr(c, w - 200, y + 18, 150, 40, 20, pis ? '#fde2e1' : '#f3f5f8'); txt(c, 'livre', w - 125, y + 38, 24, '#c0392b', 800, 'center');
      });
    };

    // Personagens: o Rafa (do canal), o cliente, a dentista e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    cliente = K.boneco({ roupa: 'moletom', cores: { moletom: 0x2fa86a, punho: 0x23824f, calca: 0x2f3540, mochila: 0x2f3540, tenis: 0xf4f1ea, cabelo: 0x2a1a10, pele: 0xc98d5e } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    dentista = K.personagem('dentista'); K.semNome(dentista.g); K.nomear('dentista', dentista.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cadeira, 'cadeira', SEAT);
    cel = K.m3d('celular_gigante', { tam: 2.3 }); guarda(cel, 'celular', CEL);
    celP = K.m3d('celular_gigante'); guarda(celP, 'celular2', CELP);
    desp = K.m3d('despertador'); guarda(desp, 'despertador', DESP, 0.9);
    plan = K.m3d('planilha_gigante'); guarda(plan, 'planilha', PLAN);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    telaR = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaR, 'tela', [0, 1.5, 2]);
    agenda = K.painelMappoa(1.2, 1.9, { px: 700 }); guarda(agenda, 'agenda', AGENDA);

    fx.onda = K.ondaChoque(); fx.poof = K.poof(); fx.poeira = K.poof(46);
    fx.papeis = K.folhasVento(77, 40, { papel: true });
    fx.pensa = K.balaoPensamento(); fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.vel = K.velocidade();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      naoAparece: e('Não aparece', 'vermelho'), web: e('Web designer', 'azul'), semCli: e('Sem cliente', 'vermelho'),
      vazia: e('Agenda vazia', 'vermelho'), end: e('Endereço ✓', 'verde'), hor: e('Horário ✓', 'verde'), marcou: e('Marcou', 'verde'),
      umaUma: e('Uma por uma...', 'vermelho'), maringa: e('Maringá', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      google: e('No Google, acham a outra', 'laranja'), esperando: e('Esperando', 'vermelho'), achou: e('Achou quem precisa', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Na sua cidade, quantas empresas não têm site? <em>Comenta aí</em>');
  }

  // ---------- Ajudas ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira);
    menino.sentar(1);
  }
  const Cf = () => CS.todos.fora;
  const PLACA = () => Cf().lugares.placa;
  // O celular gigante da calçada, virado pra rua (e pro cliente)
  function celCalcada() { ve(cel); cel.rotation.set(0, -0.35, 0); }

  const P = {
    gancho(B, tc) {
      // NA TELA: a frente da Clínica Sorriso; o celular gigante na calçada; o cliente · MOSTRA: cliente, celular, fachada
      // CENÁRIO: fachada da clínica de dia, carros passando (o cenário cuida)
      const tPe = quando('pesquisou', B, 0.12), tMi = quando('mim', B, 0.38), tSi = quando('site', B, 0.68), tVe = quando('vê', B, 0.85);
      // ENTRA AGORA: o celular despenca no 1º quadro, com onda de choque e tremida
      celCalcada(); const k = K.entrar(cel, 'cai', tc - B.inicio + 0.05, { altura: 7, dur: 0.4, som: false, destaque: false });
      const tImp = B.inicio + 0.42;
      fx.onda.em([CEL[0], 0.02, CEL[2]], tc - tImp, { raio: 3, som: false }); fx.poeira.em(mais(CEL, [0.6, 0.2, 0.6]), tc - tImp, { escala: 1.0 });
      K.som('estrondo', tImp, 0.7);
      // OBJETOS SE MEXENDO: a busca digitada até "mim"; os resultados descem depois; o ✗ na placa em "site"
      const d = pc(tc, tPe, tMi), n = tc > tMi ? 1 + Math.floor((tc - tMi) / 0.25) : 0;
      cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { d, n }), 'b' + Math.round(d * 21) + '_' + Math.min(3, n));
      for (let i = 0; i < 8; i++) K.som('clique', tPe + i * 0.08, 0.25);
      for (let i = 0; i < 3; i++) K.som('bip', tMi + i * 0.25, 0.25);
      // PERSONAGEM: o cliente lendo o celular · em "vê": vira as costas e vai embora pela calçada
      if (tc < tVe) { cliente.colocar(CLI, mais(CEL, [0, 1.4, 0])); cliente.reagir(tc > tSi ? 'coca_cabeca' : 'segurando', tc - B.inicio); }
      else cliente.irPara(CLI, mais(CLI, [-4, 0, 0.4]), K.clamp((tc - tVe) / 1.6), tc, { reto: true });
      // EFEITOS VISUAIS: ✗ enorme e "Não aparece" na placa em "site"
      fx.simb.em(mais(PLACA(), [0, -0.4, 0.8]), tc - tSi, { tipo: '✗', tam: 2.2 });
      fx.et.naoAparece.em(mais(PLACA(), [0, -1.4, 0.8]), tc - tSi - 0.1);
      K.som('errado', tSi, 0.7);
      // CÂMERA: 4 cortes de ~0,8 s · (1) o impacto, de baixo · (2) a tela de perto · (3) o cliente de lado · (4) aberto
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = tSi - 0.05;
      if (tc < c1) { K.filmar([mais(CEL, [0, 0.2, 0.3]), mais(CEL, [0, 2.4, 0])], 'chegando', pc(tc, B.inicio, c1), { plano: 'medio', lado: 15, altura: 'baixo', tam: 2.6 }); if (k >= 1 || tc > tImp) K.tremer(tc - tImp, 0.8); }
      else if (tc < c2) K.filmar([mais(CEL, [0, 1.3, 0.2]), mais(CEL, [0, 2.3, 0.2])], 'chegando', pc(tc, c1, c2), { plano: 'perto', lado: -10, altura: 'olho', tam: 2.0 });
      else if (tc < c3) K.filmar([cabecaDe(cliente, 0), mais(CEL, [0, 1.6, 0])], 'passando', pc(tc, c2, c3), { plano: 'perto', lado: -50, altura: 'olho', tam: 1.6 });
      else K.filmar([PLACA(), mais(CLI, [0, 0.2, 0]), mais(CEL, [0, 2.3, 0]), Cf().lugares.porta], 'afastando', pc(tc, c3, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 3.6 });
    },
    rafa(B, tc) {
      // NA TELA: o quarto; o Rafa no computador com o site dele; o balão "Quem precisa de site?" · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.2), tC = quando('cliente', B, 0.4), tI = quando('imagina', B, 0.6), tCl = quando('clínica', B, 0.8);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      // PERSONAGEM: começo digitando · em "cliente": coça a cabeça · em "imagina": olha pra câmera de braços abertos (ombros)
      sentado(tc < tI ? MONITOR : [1.6, 1.1, 4]);
      if (tc > tI) menino.reagir('ombros', tc - tI); else if (tc > tC) menino.reagir('coca_cabeca', tc - tC); else menino.reagir('digitando', tc);
      // EFEITOS VISUAIS: "Web designer" · "Sem cliente" · balão em "imagina" com a clínica
      if (tc < tC) fx.et.web.em(cabecaDe(menino, 0.5), tc - tD); else if (tc < tI) fx.et.semCli.em(cabecaDe(menino, 0.5), tc - tC);
      fx.pensa.em(mais(cabecaDe(menino, 0.1), [-0.45, 0, 0]), tc - tI, { texto: 'Quem precisa de site?' });
      if (tc > tCl) fx.simb2.em(cabecaDe(menino, 0.1).map((v, i) => v + [0.6, 0.2, 0.1][i]), tc - tCl, { tipo: '?' });
      K.som('clique', B.inicio + 0.1, 0.4); K.som('pingo', tC, 0.5); K.som('whoosh', tI, 0.5);
      // CÂMERA: (1) passando, perto, de lado · (2) de "imagina": chegando de frente, baixo
      if (tc < tI) K.filmar([cabecaDe(menino, 0), MONITOR, mais(SEAT, [0, 0.6, 0])], 'passando', pc(tc, B.inicio, tI), { plano: 'perto', lado: 70, altura: 'olho', tam: 1.6 });
      else K.filmar([mais(SEAT, [0, 0.9, 0]), cabecaDe(menino, 0.9)], 'chegando', pc(tc, tI, B.ate), { plano: 'perto', lado: 'frente', altura: 'baixo', tam: 1.6 });
    },
    agenda(B, tc) {
      // NA TELA: a recepção; a dentista na ponta do balcão; a agenda toda "livre" · MOSTRA: dentista, agenda
      // CENÁRIO: clinica_odonto (câmera olho ou baixa)
      const tAg = quando('agenda', B, 0.3), tV = quando('vazia', B, 0.45), tE = quando('entende', B, 0.7), tP = quando('quê', B, 0.92);
      ve(agenda); K.entrar(agenda.g, 'cresce', tc - tAg, { dur: 0.35 });
      agenda.mostrar('agenda', { t: tc });
      // PERSONAGEM: a dentista olha a agenda · em "entende": encolhe os ombros · em "quê": mão na testa
      dentista.colocar(DENT_IN, tc < tE ? AGENDA : [0.5, 1.5, 4]);
      if (tc > tP) dentista.reagir('mao_na_testa', tc - tP); else if (tc > tE) dentista.reagir('ombros', tc - tE); else dentista.reagir('segurando', tc - B.inicio);
      fx.et.vazia.em(mais(AGENDA, [0, 1.25, 0.1]), tc - tV);
      fx.simb.em(cabecaDe(dentista, 0.05), tc - tP, { tipo: '?' });
      K.som('pingo', tV, 0.5); K.som('errado', tP, 0.5);
      // CÂMERA: (1) chegando, médio, frente · (2) de "vazia": girando, perto
      if (tc < tV) K.filmar([dentista, AGENDA, mais(AGENDA, [0, 0.9, 0])], 'chegando', pc(tc, B.inicio, tV), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.4 });
      else K.filmar([cabecaDe(dentista, 0), AGENDA, mais(AGENDA, [0, 1.1, 0])], 'girando', pc(tc, tV, B.ate), { plano: 'perto', lado: 12, angulo: 25, altura: 'olho', tam: 1.8 });
    },
    outra(B, tc) {
      // NA TELA: o calçadão entre prédios; o cliente andando até a loja DENTISTA; Endereço ✓, Horário ✓, Marcou · MOSTRA: cliente, loja_dentista
      const tO = quando('outra', B, 0.12), tEn = quando('endereço', B, 0.55), tH = quando('horário', B, 0.72), tM = quando('marcou', B, 0.9);
      const porta = RUA_D, ini = [0.9, 0, porta[2] + 9], perto = [0.9, 0, porta[2] + 1.2];
      // PERSONAGEM: o cliente anda rápido até a porta · em "marcou": comemora
      if (tc < tM) { cliente.irPara(ini, perto, K.clamp((tc - B.inicio + 0.2) / (tM - B.inicio + 0.1)), tc, { reto: true }); fx.vel.em(mais(cliente.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: cliente.g.rotation.y }); }
      else { cliente.colocar(perto, mais(RUA_PLACA, [0, -1.5, 0])); cliente.reagir('comemorando', tc - tM); }
      for (let k = 0; k < 6; k++) K.som('passo', B.inicio + k * 0.25, 0.3);
      // EFEITOS VISUAIS: "Endereço ✓", "Horário ✓", e o ✓ com "Marcou"
      fx.et.end.em(mais(cabecaDe(cliente, 0.4), [0, 0.3, 0]), tc - tEn);
      if (tc > tH) fx.et.hor.em(mais(cabecaDe(cliente, 0.4), [0, -0.15, 0]), tc - tH);
      fx.simb.em(mais(RUA_PLACA, [0, -0.6, 0.6]), tc - tM, { tipo: '✓', tam: 1.6 });
      fx.et.marcou.em(mais(RUA_PLACA, [0, 0.7, 0.6]), tc - tM);
      K.som('ding', tEn, 0.5); K.som('ding', tH, 0.5); K.som('certo', tM, 0.7);
      // CÂMERA: (1) seguindo atrás · (2) de "endereço": por cima do ombro, olhando a placa · (3) de "marcou": parado, médio
      if (tc < tM) K.seguir(cliente, { lado: 'tras', dist: 3.6, altura: 1.5 });
            else K.filmar([cabecaDe(cliente, 0), RUA_PLACA, mais(perto, [0, 0.2, 0])], 'parado', pc(tc, tM, B.ate), { plano: 'medio', lado: 30, altura: 'olho', tam: 3.0 });
      void tO;
    },
    procura(B, tc) {
      // NA TELA: o quarto de noite; o Rafa digitando; a planilha gigante enchendo devagar; o despertador girando · MOSTRA: personagem, planilha, despertador
      const tU = quando('uma', B, 0.55), tD = quando('dia', B, 0.9);
      ve(comp, plan, desp); comp.tela.desenhar(siteDemo, 'demo');
      plan.rotation.set(0, -0.6, 0);
      // OBJETOS SE MEXENDO: a planilha preenche devagar; os ponteiros giram rápido; papéis voando
      plan.userData.m3d.preencher(K.lerp(0.05, 0.25, pc(tc, B.inicio, B.ate)));
      desp.userData.m3d.horas(8 + (tc - B.inicio) * 4);
      if (tc > tD) desp.userData.m3d.tocar(tc - tD);
      fx.papeis.em([0, 0, -0.4], tc, { largura: 6, forca: 0.5 });
      // PERSONAGEM: digitando · em "dia": mão na testa
      sentado(tc < tD ? MONITOR : [1.6, 1.1, 4]);
      if (tc > tD) menino.reagir('mao_na_testa', tc - tD); else menino.reagir('digitando', tc);
      fx.et.umaUma.em(mais(PLAN, [0, 2.6, 0.2]), tc - tU);
      for (let k = 0; k < 8; k++) K.som('clique', B.inicio + 0.1 + k * 0.18, 0.25);
      K.som('pingo', tD, 0.5);
      // CÂMERA: (1) girando, médio · (2) de "uma": chegando, perto da planilha
      if (tc < tU) K.filmar([cabecaDe(menino, 0.2), MONITOR, mais(SEAT, [0, 0.3, 0.4])], 'girando', pc(tc, B.inicio, tU), { plano: 'medio', lado: 20, angulo: 25, altura: 'olho', tam: 1.8 });
      else K.filmar([mais(PLAN, [0, 0.6, 0]), mais(PLAN, [0, 2.3, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, tU, B.ate), { plano: 'medio', lado: -10, altura: 'olho', tam: 2.6 });
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com; a lista das clínicas de Maringá sobe do computador; o Rafa ao lado · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.05), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tCl = quando('clínicas', B, 0.62), tMa = quando('Maringá', B, 0.8);
      ve(comp, navG); comp.tela.desenhar(siteDemo, 'demo');
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      const vem = (tC + tL) / 2;
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tCl ? 1 + Math.floor((tc - tCl) / 0.22) : 0;
        telaC.mostrar('listaClinicas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
        for (let k = 0; k < 4; k++) K.som('bip', tCl + k * 0.22, 0.25);
        K.som('brilho', tL, 0.5);
      }
      // PERSONAGEM: digitando · em "vem": levanta e aponta a Clínica Sorriso
      if (tc < vem) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else { menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), tc > tL ? TELA_Q : [1.6, 1.1, 4]); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - vem); }
      fx.et.maringa.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tMa);
      // CÂMERA: (1) por cima do ombro, olhando o endereço · (2) chegando de frente, médio
      if (tc < vem) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, vem), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'chegando', pc(tc, vem, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca; a análise da Clínica Sorriso; o robô e o Rafa · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.25), tA = quando('mostra', B, 0.4), tPr = quando('precisa', B, 0.6), tQ = quando('quê', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tQ - tPr)) * 20) / 20;
      telaM.mostrar('analiseClinica', { ate: tc > tQ - 0.25 ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tQ - 0.25, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "quê": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tQ - 0.25 ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tQ - 0.25) menino.reagir('comemorando', tc - tQ + 0.25); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando, frente, baixo · (2) passando, médio
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    mostra(B, tc) {
      // NA TELA: a fachada; o Rafa com a tela na mão; a dentista sai pela porta e topa · MOSTRA: personagem, dentista, tela
      const tDe = quando('dentista', B, 0.2), tG = quando('Google', B, 0.45), tTo = quando('topa', B, 0.82);
      // PERSONAGEM: o Rafa mostra a tela · a dentista surpresa · em "topa": comemora
      menino.colocar(RAFA_F, cabecaDe(dentista, -0.5));
      menino.reagir('mostrando', tc - B.inicio);
      ve(telaR); const m = menino.mao(1); telaR.g.position.set(m[0] + 0.25, m[1] + 0.45, m[2] + 0.2); telaR.g.rotation.set(0, 0.4, 0); telaR.g.scale.setScalar(0.42);
      telaR.mostrar('analiseClinica', { ate: 2, score: 1 });
      Cf().porta.abrirEm(tc - B.inicio, 0.4);
      dentista.irPara(mais(Cf().lugares.porta, [0, 0, -0.4]), DENT_F, K.clamp((tc - B.inicio) / 0.8), tc, { olhar: cabecaDe(menino, -0.5) });
      if (tc > tTo) dentista.reagir('comemorando', tc - tTo); else if (tc > tG) dentista.reagir('surpreso', tc - tG);
      fx.et.google.em(mais(RAFA_F, [-0.2, 2.6, 0.2]), tc - tG);
      if (tc > tTo) fx.fala.em(cabecaDe(dentista, 0.15), tc - tTo, { texto: 'Vamos conversar!' });
      fx.simb.em(mais(DENT_F, [0.7, 2.6, 0]), tc - tTo - 0.2, { tipo: '✓' });
      K.som('certo', tTo, 0.7);
      // CÂMERA: (1) chegando, médio, frente · (2) de "Google": passando, perto
      if (tc < tG) K.filmar([mais(RAFA_F, [0, 1, 0]), mais(DENT_F, [0, 1, 0]), PLACA()], 'chegando', pc(tc, B.inicio, tG), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 3.0 });
      else K.filmar([cabecaDe(menino, 0), cabecaDe(dentista, 0), telaR], 'passando', pc(tc, tG, B.ate), { plano: 'perto', lado: 28, altura: 'olho', tam: 1.9 });
      void tDe;
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o Rafa sentado com o celular "0"; (2) Agora: andando no calçadão; (3) a dentista e o Rafa · MOSTRA: personagem, dentista
      const tA = quando('Agora', B, 0.45), tP = quando('perdendo', B, 0.75);
      if (tc < tA) {
        ve(comp, celP); comp.tela.desenhar(telaEscura, 'escura');
        celP.rotation.set(0, Math.atan2(0.4 - CELP[0], 2.6 - CELP[2]), 0);
        celP.userData.m3d.tela.desenhar(vazio, 'vazio');
        sentado(mais(CELP, [0, 0.9, 0])); menino.reagir('mao_na_testa', tc - B.inicio);
        fx.et.esperando.em(cabecaDe(menino, 0.55), tc - B.inicio - 0.2);
        K.som('errado', B.inicio + 0.3, 0.4);
        K.filmar([cabecaDe(menino, 0.3), mais(SEAT, [0.4, 0.1, 0.8]), mais(CELP, [0, 1.5, 0])], 'afastando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 25, altura: 'olho', tam: 1.6 });
      } else if (tc < tP) {
        const de = [0.9, 0, RUA_D[2] + 14], ate = [0.9, 0, RUA_D[2] + 8];
        menino.irPara(de, ate, K.clamp((tc - tA + 0.3) / (tP - tA + 0.8)), tc, { reto: true });
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        K.som('whoosh', tA, 0.5);
        K.heroi(menino, pc(tc, tA, tP));
      } else {
        menino.colocar(RAFA_F, cabecaDe(dentista, -0.5)); menino.reagir('vitoria', tc - tP);
        dentista.colocar(DENT_F, cabecaDe(menino, -0.5)); dentista.reagir('aplaudindo', tc - tP);
        fx.et.achou.em(mais(RAFA_F, [0.5, 2.5, 0.2]), tc - tP);
        K.som('certo', tP, 0.6);
        K.filmar([mais(RAFA_F, [0, 1, 0]), mais(DENT_F, [0, 1, 0]), PLACA()], 'passando', pc(tc, tP, B.ate), { plano: 'medio', lado: -25, altura: 'olho', tam: 2.8 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Rafa no quarto; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('cidade', B, 0.05), tCo = quando('Comenta', B, 0.4), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      const tSg = tCo + 0.5;
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar(siteDemo, 'demo');
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
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      celCalcada(); cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { d: 1, n: 3 }), 'capa');
      cliente.colocar(mais(CLI, [-0.6, 0, 0.2]), [CLI[0] - 5, 1.4, CLI[2] + 1]); cliente.reagir('ombros', 0.6);
      fx.simb.em(mais(PLACA(), [0, -0.4, 0.8]), 1, { tipo: '✗', tam: 2.2, som: false });
      K.filmar([PLACA(), mais(CLI, [-0.6, 1, 0]), mais(CEL, [0, 2.3, 0])], 'parado', 0, { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.3, tam: 3.0 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'fora' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, cliente, dentista].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    agenda.g.scale.setScalar(1); agenda.g.position.set(...AGENDA); agenda.g.rotation.set(0, 0.25, 0);
    cel.position.set(...CEL); celP.scale.setScalar(1); celP.position.set(...CELP);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
