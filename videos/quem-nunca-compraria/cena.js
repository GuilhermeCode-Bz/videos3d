// Pare de abordar empresas que nunca comprariam seu serviço (canal Mappoa). Seis cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa.
(function () {
  let bl, CS, menino, dentista, robo, comp, agenda, proposta, lupa, relogio, calendario, papeis, logo, peneira, monte, podio, balao, guarda_chuva, cacto, sol, solHalo, alvoClinica, balaoVerde, navG, tv;
  let telaSala, telaC, telaM, telaClin;
  const clin = [], halos = [], envelopes = [], folhas = [], moedas = [], cartoes = [], pilhaEnv = [], tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k), K.lerp(a[2], b[2], k)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'clinica_odonto', pedro: 'sala_reuniao', dispara: 'cidade_maquete', ninguem: 'cidade_maquete', filtro: 'cidade_maquete',
    semana: 'sala_reuniao', site: 'sala_reuniao', mappoa_rotulo: 'central_mappoa', contatos: 'central_mappoa', deserto: 'deserto',
    analise: 'mundo_mappoa', aderencia_rotulo: 'mundo_mappoa', peneira: 'mundo_mappoa', objecao: 'clinica_odonto', resposta: 'clinica_odonto',
    por_isso: 'mundo_mappoa', antes_agora: 'sala_reuniao', segue: 'sala_reuniao', cartao: 'sala_reuniao', capa: 'clinica_odonto'
  };
  // Lugares de cada cenário
  const DENT = [-0.6, 0, -3.3];                 // o dentista, atrás do balcão da clínica
  const MESA = [-3.8, 0, 0.4];                  // a mesa do Pedro na sala (o computador)
  const CLINS = [[-0.9, 0.12, -0.45], [0, 0.12, -0.45], [0.9, 0.12, -0.45], [-0.55, 0.12, -0.45], [0.55, 0.12, -0.45]];
  const LEADS = [
    { nome: 'OdontoVida Centro', end: 'Rua Barão, 210', chips: ['whats', 'tel', 'site'] },
    { nome: 'Clínica Bem Sorrir', end: 'Av. Brasil, 1500', chips: ['whats', 'tel'] },
    { nome: 'Dente Feliz Odonto', end: 'Rua das Palmeiras, 88', chips: ['whats', 'tel', 'site'] },
    { nome: 'Sorriso Pleno', end: 'Av. Norte, 402', chips: ['tel', 'site'] },
    { nome: 'Odonto Prime Campinas', end: 'Rua Sete, 19', chips: ['whats', 'tel', 'site'] },
    { nome: 'Clínica Arco Dental', end: 'Praça da Matriz, 5', chips: ['whats', 'tel'] }
  ];
  const ANALISE = {
    nome: 'OdontoVida Centro',
    dores: ['Instagram parado há meses', 'Poucas avaliações no Google'],
    oportunidades: ['Anúncio pra encher a agenda de limpeza'],
    objecoes: ['"Já tentei anúncio e não funcionou"'],
    abordagem: 'Mostre como medir cada paciente que chegou pelo anúncio.'
  };

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  // Placa desenhada (telaCanvas) com costas, virada pra +z
  function quadro(larg, alt, px, nome, pos, fundo = 0xffffff) {
    const g = new THREE.Group(), t = K.telaCanvas(larg, alt, px);
    const costas = K.malha(new THREE.BoxGeometry(larg + 0.06, alt + 0.06, 0.04), K.mat(fundo)); costas.position.z = -0.03;
    t.m.position.z = 0.002; g.add(costas, t.m); K.scene.add(g); guarda(g, nome, pos);
    return { g, tela: t };
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['clinica_odonto', 'sala_reuniao', 'cidade_maquete', 'central_mappoa', 'deserto', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dentista = K.boneco({ tipo: 'doutor' }); K.nomear('dentista', dentista.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Clínica: a agenda lotada na parede, a proposta, o balão da objeção, a tela da resposta
    agenda = quadro(1.3, 1.0, 520, 'agenda', [1.15, 2.25, -4.33]);
    proposta = K.placa('+ PACIENTES', { larg: 0.8, alt: 0.5, fundo: '#1067f8', cor: '#ffffff', borda: '#ffffff' }); guarda(proposta, 'proposta');
    balao = quadro(1.9, 0.75, 700, 'balao', [-0.6, 2.85, -2.9]);
    balao.costas = balao.g.children[0];
    telaClin = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaClin, 'tela', [-1.9, 1.6, -0.7]);

    // Sala do Pedro
    comp = K.computador({}); guarda(comp, 'computador', MESA, 1.55);
    telaSala = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaSala, 'tela', mais(MESA, [0.1, 1.65, 1.0]));
    relogio = guarda(K.m3d('relogio_parede', { hora: 3 }), 'relogio', [-6.33, 2.75, -0.1], 1.6); relogio.rotation.y = Math.PI / 2; K.lugar(relogio);
    calendario = K.m3d('calendario'); calendario.rotation.y = Math.PI / 2; guarda(calendario, 'calendario', [-6.36, 1.7, 1.45], 1.25);
    ['SEG', 'TER', 'QUA', 'QUI', 'SEX'].forEach((d) => { const f = K.placa(d, { larg: 0.42, alt: 0.3, fundo: '#ffffff', cor: '#e8352b', borda: '#e8352b' }); folhas.push(guarda(f, null)); });
    papeis = guarda(K.m3d('pilha_papeis', { n: 30 }), 'papeis', mais(MESA, [-0.62, 1.18, 0.15]), 0.85);
    tv = K.painelMappoa(3, 1.87, { px: 1000 }); guarda(tv, 'tv', [0, 2.3, -4.25]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', mais(MESA, [0.2, 2.75, 0.9]));
    for (let i = 0; i < 6; i++) envelopes.push(guarda(K.m3d('envelope'), 'envelopes', [0, 1.3, 0], 0.42));

    // Cidade em maquete: as clínicas no quarteirão do meio
    const cores = [0xf7c6c6, 0xffe1a8, 0xb9c4d6, 0xe9f7f2, 0xe9f7f2];
    CLINS.forEach((p, i) => { const c = K.m3d('prediozinho', { cor: cores[i], a: 1.3, placa: 'CLÍNICA' }); clin.push(guarda(c, 'predios', p, 0.8)); });
    [3, 4].forEach((i) => { const h = K.halo(0x00e39a, 1.9); halos.push(guarda(h, null, mais(CLINS[i], [0, 0.6, -0.2]))); });
    lupa = guarda(K.m3d('lupa', { tam: 1.1 }), 'lupa', [0, 1.9, 0.35]);

    // Central do Mappoa
    logo = K.logoMappoa(1.75); guarda(logo, 'logo', [0.7, 1.65, -0.3]);
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [0.85, 1.6, 0.1]);
    ['whats', 'tel', 'insta', 'site', 'whats', 'site'].forEach((tp) => moedas.push(guarda(K.moedaContatoMappoa(tp, 0.45), null)));

    // Deserto: o guarda-chuva, o cacto e o sol
    guarda_chuva = new THREE.Group();
    const lona = K.malha(new THREE.ConeGeometry(0.62, 0.32, 24, 1, true), K.mat(0x1067f8, { side: THREE.DoubleSide })); lona.position.y = 0.95;
    const cabo = K.malha(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 10), K.mat(0x2b2f36)); cabo.position.y = 0.5;
    const ponta = K.malha(new THREE.SphereGeometry(0.04, 10, 8), K.mat(0x2b2f36)); ponta.position.y = 1.12;
    guarda_chuva.add(lona, cabo, ponta); guarda_chuva.userData.lona = lona; K.scene.add(guarda_chuva); guarda(guarda_chuva, 'guardachuva');
    cacto = new THREE.Group();
    const verde = K.mat(0x3f9b4a);
    const tronco = K.malha(new THREE.CapsuleGeometry(0.22, 1.5, 6, 14), verde); tronco.position.y = 0.97;
    const b1 = K.malha(new THREE.CapsuleGeometry(0.13, 0.5, 6, 12), verde); b1.position.set(-0.36, 1.25, 0);
    const b1b = K.malha(new THREE.CapsuleGeometry(0.13, 0.26, 6, 12), verde); b1b.position.set(-0.24, 0.98, 0); b1b.rotation.z = Math.PI / 2;
    const b2 = K.malha(new THREE.CapsuleGeometry(0.12, 0.42, 6, 12), verde); b2.position.set(0.34, 1.45, 0);
    const b2b = K.malha(new THREE.CapsuleGeometry(0.12, 0.22, 6, 12), verde); b2b.position.set(0.22, 1.22, 0); b2b.rotation.z = Math.PI / 2;
    cacto.add(tronco, b1, b1b, b2, b2b); K.scene.add(cacto); guarda(cacto, 'cacto', [1.45, 0, 0.5]);
    sol = K.malha(new THREE.SphereGeometry(0.45, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffd23f }), false); K.scene.add(sol); guarda(sol, 'sol', [-1.1, 3.9, -1.6]);
    solHalo = guarda(K.halo(0xffb020, 3.4), null, [-1.1, 3.9, -1.65]);

    // Palco da marca: a análise, a peneira, os cartões, a pilha de envelopes e a clínica certa
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    peneira = K.peneiraMappoa(1.1); peneira.g.rotation.x = 0.55; guarda(peneira, 'peneira', [-0.1, 2.75, 0.1]);
    monte = guarda(K.m3d('pilha_cartoes', { n: 8 }), 'monte', [-1.45, 0, 0.6], 1.0);
    podio = K.malha(new THREE.BoxGeometry(0.95, 0.7, 0.8), K.mat(0x00bc7b)); K.scene.add(podio); guarda(podio, 'podio', [1.25, 0.35, 0.55]);
    LEADS.forEach((l, i) => {
      const c = K.cartaoLeadMappoa(l), g = c.g, alto = i >= 3;
      const borda = K.malha(new THREE.PlaneGeometry(1.62, 0.52), new THREE.MeshBasicMaterial({ color: alto ? 0x00bc7b : 0x9aa3ad }), false); borda.position.z = -0.03; g.add(borda);
      cartoes.push(guarda(c, 'cartoes', [0, 2, 0], 0.45));
    });
    for (let i = 0; i < 12; i++) { const e = K.m3d('envelope', { cor: 0xc9ced6 }); pilhaEnv.push(guarda(e, 'pilha_envelopes', [-1.55 + ((i * 37) % 7) * 0.09, 0.05 + i * 0.07, 0.45 + ((i * 13) % 5) * 0.06], 0.5)); }
    alvoClinica = guarda(K.m3d('prediozinho', { cor: 0x00bc7b, a: 1.5, placa: 'CLÍNICA' }), 'alvo_clinica', [1.45, 0, 0.1], 1.3);
    balaoVerde = guarda(K.m3d('balao_chat'), 'balao_verde', [1.45, 2.65, 0.4], 0.7);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      lotada: e('Agenda lotada', 'vermelho'), haha: e('HAHA', 'laranja'), gestor: e('Gestor de tráfego', 'azul'), mesma: e('A mesma proposta', 'laranja'),
      l1: e('Lotada', 'vermelho'), l2: e('Já tem agência', 'vermelho'), l3: e('Fechou', 'vermelho'), insta: e('Instagram parado', 'laranja'), aval: e('Pouca avaliação', 'laranja'),
      uma: e('Uma por uma', 'vermelho'), contatos: e('Com os contatos', 'verde'), nunca: e('Nunca compraria', 'vermelho'),
      depois: e('Depois', 'vermelho'), primeiro: e('Primeiro', 'verde'), precisa: e('Pra quem precisa', 'laranja'), combina: e('Quem combina primeiro', 'verde')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo');
    fx.rot = K.rotulo('Mappoa'); fx.rotA = K.rotulo('Aderência à oferta');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual empresa nunca compraria o seu serviço? <em>Comenta aí</em>');
    fx.festa = K.festa([1.25, 1.6, 0.6]);
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  // A agenda da clínica: n quadradinhos marcados com ✕ e o "LOTADA" piscando
  function desenhaAgenda(n, lot) {
    agenda.tela.desenhar((c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); c.fillStyle = '#e8352b'; c.fillRect(0, 0, w, h * 0.2);
      c.fillStyle = '#fff'; c.font = '900 52px Montserrat, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('AGENDA', w / 2, h * 0.1);
      for (let i = 0; i < 20; i++) {
        const x = 30 + (i % 5) * ((w - 60) / 5), y = h * 0.25 + Math.floor(i / 5) * (h * 0.18), cw = (w - 60) / 5 - 10, ch = h * 0.15;
        c.fillStyle = '#eef2f6'; c.fillRect(x, y, cw, ch);
        if (i < n) { c.strokeStyle = '#e8352b'; c.lineWidth = 9; c.beginPath(); c.moveTo(x + 14, y + 12); c.lineTo(x + cw - 14, y + ch - 12); c.moveTo(x + cw - 14, y + 12); c.lineTo(x + 14, y + ch - 12); c.stroke(); }
      }
      if (lot) { c.save(); c.translate(w / 2, h * 0.6); c.rotate(-0.18); c.fillStyle = 'rgba(232,53,43,.92)'; c.fillRect(-w * 0.42, -52, w * 0.84, 104); c.fillStyle = '#fff'; c.font = '900 80px Montserrat, sans-serif'; c.fillText('LOTADA', 0, 4); c.restore(); }
    }, n + '-' + lot);
  }
  function desenhaBalao(letras) {
    const s = 'Já tentei anúncio e não deu certo.';
    balao.tela.desenhar((c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#050d1c'; c.font = '900 64px Montserrat, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      const t = s.slice(0, letras), meio = t.length > 17 ? t.lastIndexOf(' ', 17) : -1;
      if (meio > 0) { c.fillText(t.slice(0, meio), w / 2, h * 0.34); c.fillText(t.slice(meio + 1), w / 2, h * 0.68); } else c.fillText(t, w / 2, h * 0.34);
    }, 'b' + letras);
  }
  function desenhaAnuncio(k) {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#eaf6ff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(w * 0.3, h * 0.5, w * 0.13, h * 0.3, 0, 0, 7); c.fill(); c.strokeStyle = '#2fb5a6'; c.lineWidth = 6; c.stroke();
      c.fillStyle = '#050d1c'; c.font = '900 34px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Agende já!', w * 0.48, h * 0.38);
      c.fillStyle = '#1067f8'; c.beginPath(); c.roundRect(w * 0.48, h * 0.55, w * 0.42, h * 0.2, 12); c.fill(); c.fillStyle = '#fff'; c.font = '800 22px Montserrat, sans-serif'; c.fillText('Avaliação', w * 0.52, h * 0.65);
      if (k) { c.fillStyle = '#e8352b'; c.font = '900 30px Montserrat, sans-serif'; c.fillText('♥ +1', w * 0.74, h * 0.16); }
    }, 'anuncio' + k);
  }
  // Envelope voando em arco de a até b; d de 0 a 1
  function voa(e, a, b, d, alt = 1.0) { ve(e); const q = K.clamp(d); e.position.set(...lerp3(a, b, q)); e.position.y += Math.sin(q * Math.PI) * alt; e.rotation.set(0, 0, q * 4); }

  const P = {
    gancho(B, tc) {
      // NA TELA: a recepção; o dentista atrás do balcão; a agenda lotada na parede; o Pedro à direita com a proposta · MOSTRA: dentista, agenda, personagem
      // CENÁRIO: clinica_odonto (o dente na parede, a cadeira de dentista no fundo)
      const tL = quando('lotada', B, 0.25), tO = quando('oferece', B, 0.55), tR = quando('ri', B, 0.9), pos = [1.15, 0, -1.25];
      // ENTRA AGORA / OBJETOS SE MEXENDO: os ✕ da agenda no 1º segundo, até o LOTADA; a proposta sobe na mão dele em "oferece"
      ve(agenda); desenhaAgenda(Math.min(20, Math.floor(B.t / 0.05)), tc > tL && (tc < tL + 0.3 || Math.floor((tc - tL) * 4) % 2 === 0 || tc > tL + 1));
      // PERSONAGEM: o Pedro mostra a proposta e leva o susto em "ri"; o dentista ri
      dentista.g.visible = true; dentista.colocar(DENT, [0.6, 1.3, 0]);
      if (tc > tR) { dentista.reagir('vitoria', tc - tR); dentista.humor('feliz'); } else dentista.reagir('pensando', B.t);
      menino.colocar(pos, [-0.6, 1.4, -3.3]);
      if (tc > tR) menino.reagir('susto', tc - tR); else menino.reagir('mostrando', B.t);
      // INTERAÇÃO: ele estende a proposta, ela treme quando o dentista ri
      ve(proposta); proposta.position.set(0.72, 1.05 + 0.25 * K.suave(K.clamp((tc - tO) / 0.4)) - 0.25, -1.55); proposta.scale.setScalar(0.4 + 0.6 * K.clamp((tc - tO + 0.6) / 0.4));
      proposta.rotation.z = tc > tR ? Math.sin((tc - tR) * 30) * 0.08 : 0;
      // EFEITOS VISUAIS: "Agenda lotada" em "lotada" · "HAHA" em "ri"
      fx.et.lotada.em([1.15, 3.0, -4.1], tc - tL); fx.et.haha.em([-0.6, 2.55, -3.1], tc - tR);
      // SONS: zap dos ✕ · errado em "ri"
      K.som('zap', B.inicio + 0.1, 0.4); K.som('zap', B.inicio + 0.5, 0.35); K.som('errado', tR, 0.5);
      // CÂMERA: mergulho · médio · frente · alto, topo livre
      K.filmar([dentista.g, agenda.g, menino], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.25 });
    },
    pedro(B, tc) {
      // NA TELA: o Pedro no centro; o computador à esquerda com o anúncio · MOSTRA: personagem, computador
      const tP = quando('Pedro', B, 0.15), tA = quando('anúncio', B, 0.5), tD = quando('dentista', B, 0.85), pos = mais(MESA, [1.35, 0, 0.9]);
      ve(comp); desenhaAnuncio(tc > tD ? 1 : 0);
      if (tc < tA) comp.tela.m.visible = true;
      menino.colocar(pos, tc > tA ? mais(MESA, [0, 1.8, 0]) : [pos[0] + 1, 1.4, 6]);
      if (tc > tA) menino.reagir('mostrando', tc - tA); else menino.reagir('chamando', B.t);
      fx.et.gestor.em(mais(pos, [0, 2.05, 0]), tc - tP);
      K.som('ding', tP, 0.5); K.som('clique', tA, 0.5); K.som('ding', tD, 0.5); K.brilhar(comp.g, tc - tD, 0.9);
      K.filmar([menino, comp], 'chegando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho' });
    },
    dispara(B, tc) {
      // NA TELA: a maquete; o Pedro à esquerda; as clínicas; os envelopes voando · MOSTRA: personagem, predios, envelopes
      const tC = quando('clínicas', B, 0.35), tM = quando('manda', B, 0.75), tMe = quando('mesma', B, 0.85), pos = [-1.7, 0, 1.6];
      [0, 1, 2].forEach((i) => { ve(clin[i]); K.entrar(clin[i], 'sobe', tc - tC - i * 0.15, { dur: 0.35, som: false }); });
      for (let i = 0; i < 3; i++) K.som('bip', tC + i * 0.15, 0.3);
      const mao = [-1.45, 1.15, 1.35], alvos = [mais(CLINS[0], [0, 1.25, 0.2]), mais(CLINS[1], [0, 1.25, 0.2]), mais(CLINS[2], [0, 1.25, 0.2]), [-4.5, 1.8, -5], [3.6, 2.2, -4.2], [4.6, 1.6, 0.4]];
      envelopes.forEach((e, i) => { const t0 = tM + i * 0.15, d = (tc - t0) / 0.6; if (d > 0 && d < (i < 3 ? 99 : 1)) { voa(e, mao, alvos[i], d, 0.9); if (d >= 1) e.rotation.set(0, 0, 0); } if (i < 4) K.som('whoosh', t0, 0.25); });
      menino.colocar(pos, [0, 1, -0.45]);
      if (tc > tM) menino.reagir('empurrando', tc - tM); else menino.reagir('pensando', B.t);
      fx.et.mesma.em([0, 2.15, -0.3], tc - tMe);
      K.filmar([menino, clin[0], clin[2]], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'alto' });
    },
    ninguem(B, tc) {
      // NA TELA: os três prédios com as etiquetas; os envelopes caindo; o Pedro à direita · MOSTRA: predios, personagem
      const t1 = quando('lotada', B, 0.15), t2 = quando('agência', B, 0.38), t3 = quando('fechou', B, 0.6), tN = quando('Ninguém', B, 0.75);
      const ts = [t1, t2, t3];
      [0, 1, 2].forEach((i) => {
        ve(clin[i]); const e = envelopes[i], d = K.clamp((tc - ts[i]) / 0.45);
        ve(e); e.rotation.set(d * 1.4, 0, d * 2); e.position.set(CLINS[i][0] + d * 0.15, K.lerp(1.45, 0.17, d * d), CLINS[i][2] + 0.2 + d * 0.45);
        K.som('baque', ts[i] + 0.4, 0.5);
      });
      K.falhar(clin[2], 'apaga', tc - t3);
      menino.colocar([1.75, 0, 1.5], [0, 1, -0.45]);
      if (tc > tN) menino.reagir('triste', tc - tN); else menino.reagir('duvida', B.t);
      fx.et.l1.em(mais(CLINS[0], [0, 1.75, 0]), tc < t3 ? tc - t1 : -1);
      fx.et.l2.em(mais(CLINS[1], [0, 2.55, 0]), tc - t2);
      fx.et.l3.em(mais(CLINS[2], [0, 1.75, 0]), tc - t3);
      const [x, y] = K.tela([0, 2.9, -0.45]);
      fx.errado.em({ tela: [x, y - 60] }, tc - tN);
      K.som('errado', tN, 0.5);
      K.filmar([clin[0], clin[2], menino], 'descendo', B.p, { plano: 'aberto', lado: 'frente', altura: 'alto' });
    },
    filtro(B, tc) {
      // NA TELA: outra rua; o Pedro com a lupa; duas clínicas acendendo em verde · MOSTRA: lupa, personagem, predios
      const tC = quando('chama', B, 0.12), tI = quando('Instagram', B, 0.62), tA = quando('avaliação', B, 0.88), pos = [1.45, 0.12, 0.85];
      [3, 4].forEach((i) => ve(clin[i]));
      ve(lupa); K.entrar(lupa, 'desliza', tc - tC, { de: [2, 0, 0], dur: 0.35 });
      const k = K.suave(K.clamp((tc - tC) / Math.max(0.4, tA - tC)));
      lupa.position.set(K.lerp(-1.1, 0.75, k), 1.75, 0.3);
      [[0, tI], [1, tA]].forEach(([j, t0]) => { if (tc > t0) { ve(halos[j]); halos[j].scale.setScalar(1.9 * K.clamp((tc - t0) / 0.3)); K.brilhar(clin[3 + j], tc - t0, 0.8); } });
      menino.colocar(pos, [0, 1.3, -0.45]);
      if (tc > tA) menino.reagir('ideia', tc - tA); else { menino.reagir('segurando', B.t); menino.apontar(0.4); }
      fx.et.insta.em(mais(CLINS[3], [0, 1.75, 0]), tc < tA ? tc - tI : -1); fx.et.aval.em(mais(CLINS[4], [0, 2.15, 0]), tc - tA);
      K.som('brilho', tI, 0.5); K.som('brilho', tA, 0.5);
      K.filmar([lupa, menino, clin[3]], 'subindo', B.p, { plano: 'perto', lado: 'direita', altura: 'alto' });
    },
    semana(B, tc) {
      // NA TELA: na sala, o Pedro na mesa; a pilha de papéis; o relógio e o calendário na parede · MOSTRA: relogio, calendario, personagem
      const tO = quando('olhar', B, 0.1), tC = quando('clínica', B, 0.3), tS = quando('semana', B, 0.65), tI = quando('inteira', B, 0.85);
      ve(comp, relogio, calendario, papeis); desenhaAnuncio(0);
      papeis.scale.set(0.85, 0.85 * (0.4 + 1.6 * K.suave(K.clamp((tc - tC) / 0.8))), 0.85);
      const m = relogio.userData.m3d, g = K.clamp((tc - tO) / (B.ate - tO)); m.m.rotation.z = -g * 20; m.h.rotation.z = -1.57 - g * 3.4;
      folhas.forEach((f, i) => { const t0 = tS + i * 0.14, d = (tc - t0) / 0.7; if (d <= 0) return; ve(f); const q = K.clamp(d); f.rotation.set(q * 2, Math.PI / 2, q * 3); f.position.set(-6.28 + q * 1.5, 2.0 + Math.sin(q * Math.PI) * 0.5 - q * 1.6, 1.45 + (i - 2) * 0.2 * q); });
      const pos = mais(MESA, [-1.35, 0, 0.6]);
      menino.colocar(pos, tc > tI ? [0, 1.4, 4] : mais(MESA, [-0.6, 1.4, 0.15]));
      if (tc > tI) { menino.reagir('cansado', tc - tI); menino.suar(tc - tI); } else menino.reagir('pensando', B.t);
      fx.et.uma.em(mais(MESA, [-0.6, 2.4, 0.3]), tc - tC);
      K.som('zumbido', tO, 0.45); K.som('whoosh', tS, 0.45);
      K.filmar([relogio, calendario, menino], 'chegando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho' });
    },
    site(B, tc) {
      // NA TELA: o Pedro no computador; a tela de busca subindo, grande · MOSTRA: tela, personagem
      const tS = quando('site', B, 0.15), tE = quando('escreve', B, 0.55), tC = quando('cidade', B, 0.92), pos = mais(MESA, [1.45, 0, 1.25]);
      ve(comp, telaSala); comp.tela.desenhar((c, w, h) => { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#1067f8'); d.addColorStop(1, '#00bc7b'); c.fillStyle = d; c.fillRect(0, 0, w, h); }, 'marca');
      K.entrar(telaSala.g, 'sobe', tc - tS, { dur: 0.5 });
      telaSala.mostrar('busca', { nicho: 'clínicas odontológicas', estado: 'SP', cidade: 'Campinas', digitado: K.clamp((tc - tE) / Math.max(0.3, tC - tE)), apertado: tc > tC + 0.3 });
      menino.colocar(pos, mais(MESA, [0.1, 1.5, 1.0]));
      if (tc > tC) menino.apontar(0.7); else menino.reagir('segurando', B.t);
      K.som('clique', tE, 0.5); K.som('clique', tE + 0.2, 0.4); K.som('clique', tC + 0.3, 0.5);
      K.filmar([telaSala, menino], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa_rotulo(B, tc) {
      // NA TELA: o logo no centro; o robô acenando · MOSTRA: logo, robo
      const tM = quando('Mappoa', B, 0.4);
      ve(logo, robo); logo.g.rotation.y = K.suave(K.clamp((tc - tM + 0.2) / 0.6)) * 6.283;
      robo.g.position.set(K.lerp(-3.5, -0.95, K.suave(K.clamp(B.t / 0.5))), 0, 0.5); robo.g.rotation.y = 0.35; robo.em(tc, { acena: tc > tM ? 0.4 : 1, mapa: false });
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.filmar([logo, robo], 'girando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho', angulo: 16 });
    },
    contatos(B, tc) {
      // NA TELA: o robô no mapa; a lista de clínicas à direita; as moedas de contato voando · MOSTRA: robo, tela
      const tCl = quando('clínicas', B, 0.25), tT = quando('traz', B, 0.5), tCo = quando('contatos', B, 0.85);
      ve(robo, telaC); K.entrar(telaC.g, 'desliza', tc - tCl, { de: [3, 0, 0], dur: 0.4 });
      const n = Math.min(4, Math.floor(K.clamp((tc - tCl) / 0.9) * 5));
      telaC.mostrar('lista', { total: 6, comSite: 4, semSite: 2, itens: LEADS, n });
      for (let i = 0; i < 4; i++) K.som('bip', tCl + i * 0.2, 0.25);
      moedas.forEach((m, i) => { const t0 = tCo - 0.35 + i * 0.1, d = (tc - t0) / 0.5; if (d <= 0 || d >= 1) return; ve(m); const g = m.g || m; const q = K.clamp(d); g.position.set(...lerp3([-0.6 + i * 0.25, 3.0, -3.6], [0.85, 1.9 - (i % 3) * 0.35, 0.2], q)); g.position.y += Math.sin(q * Math.PI) * 0.6; g.rotation.y = q * 6; if (i % 2 === 0) K.som('ding', t0 + 0.5, 0.3); });
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = tc > tCo ? 0.9 : 0.2; robo.em(tc, { mapa: true, acena: tc > tCo ? 0.6 : 0 });
      menino.colocar([2.25, 0, 1.35], [0.85, 1.4, 0.1]);
      if (tc > tT) menino.reagir('surpreso', tc - tT); else menino.reagir('pensando', B.t);
      fx.et.contatos.em([0.85, 3.15, 0.2], tc - tCo);
      K.filmar([robo, telaC], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    deserto(B, tc) {
      // NA TELA: o deserto; o Pedro com o guarda-chuva aberto; o cacto à direita; o sol no alto · MOSTRA: personagem, guardachuva, cacto
      const tN = quando('nunca', B, 0.3), tG = quando('guarda-chuva', B, 0.7), tD = quando('deserto', B, 0.9), pos = [-0.1, 0, 1.0];
      ve(guarda_chuva, cacto, sol, solHalo);
      solHalo.scale.setScalar(3.4 + Math.sin(tc * 5) * 0.25);
      const ab = K.suave(K.clamp((tc - tG + 0.15) / 0.35));
      guarda_chuva.userData.lona.scale.set(0.15 + 0.85 * ab, 1, 0.15 + 0.85 * ab);
      guarda_chuva.position.set(0.3, 0.75, 1.25); guarda_chuva.scale.setScalar(1.35); guarda_chuva.rotation.z = -0.25 * ab;
      cacto.rotation.z = tc > tD ? Math.sin((tc - tD) * 9) * 0.12 : 0;
      menino.colocar(pos, [1.45, 1.2, 0.5]);
      if (tc > tD) { menino.reagir('cansado', tc - tD); menino.suar(tc - tD); } else menino.reagir('mostrando', B.t);
      fx.et.nunca.em([0.5, 2.55, 0.8], tc - tN);
      K.som('whoosh', B.inicio, 0.4); K.som('estalo', tG, 0.6); K.som('errado', tD, 0.5);
      K.filmar([menino, guarda_chuva, cacto], 'chegando', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    analise(B, tc) {
      // NA TELA: a tela no centro (a escolha, depois a análise com a aderência enchendo); o robô à esquerda; o Pedro à direita · MOSTRA: tela, personagem
      const tA = quando('análise', B, 0.15), tCp = quando('completa', B, 0.3), tM = quando('mostra', B, 0.45), tCb = quando('combina', B, 0.7);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tA, { altura: 3 });
      if (tc < tM) telaM.mostrar('enriquecer', { tipo: tc > tCp ? 2 : 1 });
      else telaM.mostrar('analise', Object.assign({ ate: 0, aderencia: 0.04 + 0.78 * K.suave(K.clamp((tc - tCb) / 0.9)) }, ANALISE));
      robo.g.position.set(-1.75, 0, 0.7); robo.g.rotation.y = 0.5; robo.em(tc, { acena: 0.5, mapa: false });
      menino.colocar([1.3, 0, 0.9], [-0.35, 1.5, 0.1]);
      if (tc > tCb) menino.reagir('surpreso', tc - tCb); else menino.apontar(0.55);
      K.som('clique', tCp, 0.5); K.som('liga', tCb, 0.5);
      K.filmar([telaM, menino], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    aderencia_rotulo(B, tc) {
      // NA TELA: a barra de aderência bem grande · MOSTRA: tela
      ve(telaM); telaM.mostrar('analise', Object.assign({ ate: 0, aderencia: 0.82 }, ANALISE));
      K.brilhar(telaM.g, B.t, 1.2);
      menino.colocar([1.15, 0, 0.75], [-0.35, 2.2, 0.1]); menino.apontar(0.9); menino.humor('feliz');
      fx.rotA.em({ tela: [540, 1520] }, B.t - 0.1);
      K.filmar(telaM, 'girando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho', angulo: 12 });
    },
    peneira(B, tc) {
      // NA TELA: a peneira no alto com o robô; os cartões cinzas pro "Depois", os verdes pro "Primeiro"; o Pedro à direita · MOSTRA: peneira, cartoes, personagem
      const tB = quando('baixa', B, 0.12), tDp = quando('depois', B, 0.35), tA = quando('alta', B, 0.6), tP = quando('primeiro', B, 0.88);
      ve(peneira, robo, monte, podio); K.entrar(peneira.g, 'cai', B.t - 0.05, { altura: 2.5 }); peneira.em(tc, 0.8);
      robo.g.position.set(-0.1, 0, -0.9); robo.g.rotation.y = 0; robo.em(tc, { acena: 0, mapa: false, olhar: [0, -0.2] });
      cartoes.forEach((c, i) => {
        const alto = i >= 3, t0 = (alto ? tA : tB) + (i % 3) * 0.18, d = (tc - t0) / 0.55, g = c.g;
        const fim = alto ? [1.25, 0.82 + (i - 3) * 0.06, 0.55] : [-1.45, 0.5 + i * 0.05, 0.6];
        ve(c); if (d <= 0) { g.position.set(-0.1, 2.55, 0.2); g.rotation.set(0.55, 0, 0); g.scale.setScalar(0.0001); return; }
        g.scale.setScalar(0.45); const q = K.clamp(d); g.position.set(...lerp3([-0.1, 2.5, 0.2], fim, q)); g.position.y += alto ? Math.sin(q * Math.PI) * 0.5 : 0; g.rotation.set(-Math.PI / 2 * q, 0, alto ? 0 : q * 0.4);
      });
      menino.colocar([2.0, 0, 1.15], [1.25, 1, 0.55]);
      if (tc > tP) menino.reagir('vitoria', tc - tP); else menino.reagir('duvida', B.t);
      fx.et.depois.em([-1.45, 1.4, 0.7], tc - tDp); fx.et.primeiro.em([1.25, 1.65, 0.7], tc - tP);
      fx.festa.em(tc - tP);
      K.som('whoosh', B.inicio + 0.1, 0.5); K.som('errado', tDp, 0.25); K.som('certo', tP, 0.6);
      K.filmar([peneira, monte, podio, menino], 'mergulho', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
    },
    objecao(B, tc) {
      // NA TELA: o dentista de braços cruzados; o balão da objeção acima dele; o Pedro à esquerda · MOSTRA: dentista, balao, personagem
      const tD = quando('diz', B, 0.3), tF = quando('certo', B, 0.92), pos = [-2.2, 0, -1.4];
      ve(balao); const k = pop(tc - tD); balao.g.scale.setScalar(Math.max(0.0001, k));
      desenhaBalao(Math.max(0, Math.floor((tc - tD - 0.1) / 0.045)));
      if (tc > tF) balao.g.rotation.z = Math.sin((tc - tF) * 30) * 0.03 * K.clamp(1 - (tc - tF) * 2); else balao.g.rotation.z = 0;
      dentista.g.visible = true; dentista.colocar(DENT, [-2.2, 1.3, -1.4]); dentista.reagir('bravo', B.t);
      menino.colocar(pos, [-0.6, 1.4, -3.3]);
      if (tc > tF) menino.reagir('susto', tc - tF); else menino.reagir('chamando', B.t);
      K.som('bip', tD, 0.5); K.som('errado', tF, 0.5);
      K.filmar([dentista.g, balao.g, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    resposta(B, tc) {
      // NA TELA: a tela da análise ao lado do Pedro, com as objeções e a abordagem; o dentista à direita · MOSTRA: tela, personagem, dentista
      const tA = quando('abre', B, 0.15), tO = quando('objeções', B, 0.35), tR = quando('resposta', B, 0.7), tP = quando('pronta', B, 0.9), pos = [-3.2, 0, -0.55];
      ve(telaClin); K.entrar(telaClin.g, 'sobe', tc - tA, { dur: 0.45 });
      telaClin.mostrar('analise', Object.assign({ ate: tc > tR ? 4 : tc > tO ? 3 : 0, aderencia: 0.82 }, ANALISE));
      dentista.g.visible = true; dentista.colocar(DENT, [-1.9, 1.5, -0.7]);
      if (tc > tP) dentista.reagir('surpreso', tc - tP); else dentista.reagir('bravo', B.t);
      menino.colocar(pos, [-1.9, 1.5, -0.7]);
      if (tc > tP) menino.reagir('ideia', tc - tP); else menino.reagir('mostrando', B.t);
      const [x, y] = K.tela([-1.0, 2.6, -0.7]);
      fx.certo.em({ tela: [x + 40, y] }, tc - tP);
      K.som('clique', tA, 0.5); K.som('certo', tP, 0.6);
      K.filmar([telaClin, menino, dentista.g], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    por_isso(B, tc) {
      // NA TELA: a pilha de envelopes cinzas à esquerda; a clínica verde à direita; o Pedro no meio · MOSTRA: pilha_envelopes, alvo_clinica, personagem
      const tPr = quando('proposta', B, 0.45), tN = quando('precisa', B, 0.88), pos = [0.0, 0, 1.0];
      pilhaEnv.forEach((e, i) => { ve(e); K.entrar(e, 'cai', tc - tPr - i * 0.04, { altura: 3, som: false, destaque: false }); });
      ve(alvoClinica); K.entrar(alvoClinica, 'sobe', tc - tN + 0.5, { dur: 0.4 });
      const env = envelopes[0], d = (tc - tN) / 0.55;
      if (d > 0 && d < 1) voa(env, [0.3, 1.15, 1.1], [1.45, 0.4, 0.7], d, 0.7);
      if (tc > tN + 0.5) { ve(balaoVerde); balaoVerde.scale.setScalar(0.7 * pop(tc - tN - 0.5)); K.brilhar(alvoClinica, tc - tN - 0.5, 0.8); }
      menino.colocar(pos, tc > tN ? [1.45, 0.8, 0.1] : [-1.55, 0.4, 0.45]);
      if (tc > tN + 0.6) menino.reagir('vitoria', tc - tN - 0.6); else if (tc > tN) menino.reagir('empurrando', tc - tN); else menino.reagir('pensando', B.t);
      fx.et.precisa.em([1.45, 3.35, 0.2], tc - tN);
      K.som('baque', tPr + 0.35, 0.6); K.som('whoosh', tN, 0.5); K.som('ding', tN + 0.55, 0.6);
      K.filmar([pilhaEnv[0], pilhaEnv[11], alvoClinica, menino], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
    },
    antes_agora(B, tc) {
      // NA TELA: antes, o Pedro jogando envelopes pra todo lado; agora, o funil na TV e ele arrastando um cartão · MOSTRA: tv, personagem
      const tA = quando('Agora', B, 0.45), tC = quando('combina', B, 0.92);
      if (tc < tA) {
        const pos = [0.4, 0, 0.6];
        envelopes.forEach((e, i) => { const t0 = B.inicio + i * 0.18, dd = ((tc - t0) / 0.6) % 1; if (tc < t0) return; voa(e, [0.6, 1.15, 0.5], [[-3, 1.5, -1], [3.5, 2, -1], [-2, 0.3, 3], [2.5, 0.3, 3], [-4, 2.4, 1], [4.5, 1, 1.5]][i], dd, 1.1); });
        menino.colocar(pos, [0, 1.4, 5]); menino.reagir('empurrando', B.t);
        K.filmar([menino, [0, 1.4, 0.6]], 'afastando', K.clamp(B.t / (tA - B.inicio)), { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 1.8 });
      } else {
        ve(tv); tv.mostrar('funil', { nome: 'CLÍNICAS QUE COMBINAM', itens: LEADS.slice(3).concat(LEADS.slice(0, 1)), mover: K.clamp((tc - tC + 0.3) / 0.9) });
        menino.colocar([3.1, 0, -3.55], [0, 2.3, -4.3]);
        if (tc > tC) menino.reagir('vitoria', tc - tC); else menino.reagir('mostrando', tc - tA);
        fx.et.combina.em([0, 3.55, -4.0], tc - tC);
        K.som('certo', tC, 0.6);
        K.filmar([tv, menino], 'afastando', K.clamp((tc - tA) / (B.ate - tA)), { plano: 'medio', lado: 'esquerda', altura: 'olho' });
      }
    },
    segue(B, tc) {
      // NA TELA: o Pedro no computador; o navegador com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, computador
      const tQ = quando('Qual', B, 0.02), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.62), tTe = quando('testa', B, 0.86);
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#1067f8'); d.addColorStop(1, '#00bc7b'); c.fillStyle = d; c.fillRect(0, 0, w, h); }, 'marca');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(MESA[0] - 1.9, 0, MESA[2] + 0.7); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      const pos = mais(MESA, [1.2, 0, 0.55]);
      menino.colocar(pos, tc > tPc ? mais(MESA, [0, 1.8, 0]) : [pos[0], 1.4, 6]);
      if (tc > tPc) menino.reagir('segurando', tc - tPc); else menino.reagir('chamando', B.t);
      K.filmar([navG, comp, menino], 'parado', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      robo.g.position.set(MESA[0] - 1.9, 0, MESA[2] + 0.7); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      const pos = mais(MESA, [1.2, 0, 0.55]);
      menino.colocar(pos, [pos[0], 1.4, 6]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(agenda, proposta); desenhaAgenda(20, true);
      dentista.g.visible = true; dentista.colocar(DENT, [0.6, 1.3, 0]); dentista.reagir('vitoria', 0.4); dentista.humor('feliz');
      menino.colocar([1.15, 0, -1.25], [0, 1.4, 5]); menino.reagir('susto', 0.5);
      proposta.position.set(0.7, 1.05, -1.1);
      K.filmar([dentista.g, agenda.g, menino], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'sala_reuniao');
    menino.g.visible = false; dentista.g.visible = false;
    tudo.forEach((g) => { g.visible = false; });
    balao.g.scale.setScalar(1); balao.g.rotation.z = 0;
    papeis.scale.setScalar(0.85);
    cartoes.forEach((c) => c.g.scale.setScalar(0.45));
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
