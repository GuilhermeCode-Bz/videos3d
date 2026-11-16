// Você atende qualquer um. É por isso que cobra pouco (canal Mappoa, série Como funciona a venda: o cliente ideal do web designer).
// Cinco cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa.
(function () {
  let bl, CS, menino, dono, robo, comp, cel, placa, precoV, precoR, precoB, rascunho, telaHo, telaMsg, funil, navG;
  let alvo, flecha, zeG, navalhaG, placaSem, placaNovo, siteRua, pedido, lupa, relogio, logo, telaC, telaM, siteMundo, pedestal, lupaRobo, monte, podio, cartaoGrande;
  const quem = [], predios = [], icones = [], moedas = [], cartoes = [], tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k), K.lerp(a[2], b[2], k)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'home_office', thiago: 'home_office', espera: 'home_office', baratinho: 'home_office', escolhe: 'cidade', ideal_rotulo: 'cidade',
    dois_jeitos: 'cidade', na_mao: 'cidade_maquete', site: 'home_office', mappoa_rotulo: 'central_mappoa', lista: 'central_mappoa',
    do_zero: 'cidade', como_saber: 'mundo_mappoa', analise: 'mundo_mappoa', mensagem: 'home_office', por_isso: 'mundo_mappoa',
    antes_agora: 'home_office', segue: 'home_office', cartao: 'home_office', capa: 'home_office'
  };
  // Home office: o computador do Thiago na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33];
  // Cidade: o calçadão fica em y = 0,14; as lojas a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, ZE = -26.2, NAVALHA = -21, LOJAS_Z = -0.3;
  const ALVO = [-23.3, G, 3.6];
  // Maquete: três prédios no quarteirão do meio
  const PRED = [[-0.9, 0.12, -0.45], [0, 0.12, -0.45], [0.9, 0.12, -0.45]];
  const COM_SITE = [
    { nome: 'Barbearia Navalha', end: 'Rua 7, 210 · Centro', chips: ['whats', 'tel', 'site'] },
    { nome: 'Barber Prime', end: 'Av. T-63, 1500', chips: ['whats', 'site'] },
    { nome: 'Corte Fino', end: 'Rua 24, 88', chips: ['tel', 'site'] },
    { nome: 'Dom Bigode', end: 'Av. Goiás, 402', chips: ['whats', 'tel', 'site'] }
  ];
  const SEM_SITE = [
    { nome: 'Barbearia do Zé', end: 'Rua 10, 19', chips: ['whats', 'tel'] },
    { nome: 'Navalha de Ouro', end: 'Praça Cívica, 5', chips: ['whats'] },
    { nome: 'Salão do Tonho', end: 'Rua 82, 300', chips: ['tel'] }
  ];
  const BUSCA = { nicho: 'barbearias', estado: 'GO', cidade: 'Goiânia' };
  const ANALISE = { nome: 'Barbearia Navalha', aderencia: 0.84 };

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  function placaSolta(texto, op, nome, pos) { const p = K.placa(texto, op); return guarda(p, nome, pos); }

  // ---------- Telas desenhadas ----------
  function portfolio(c, w, h, rola) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const y0 = -rola * 60;
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#1067f8'); d.addColorStop(1, '#2fb5a6');
    c.fillStyle = d; c.fillRect(0, y0, w, 92);
    c.fillStyle = '#fff'; c.font = '900 26px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Thiago.web', 18, y0 + 34);
    c.font = '700 13px Montserrat, sans-serif'; c.fillText('Sites que dão orgulho', 18, y0 + 64);
    [['#ff8a5b', '#ffd6c7'], ['#2f6fd6', '#d6e4ff'], ['#00bc7b', '#cdf3e4']].forEach(([a, b], i) => {
      const lw = (w - 44) / 3, x = 14 + i * (lw + 8);
      c.fillStyle = b; c.beginPath(); c.roundRect(x, y0 + 108, lw, 120, 10); c.fill();
      c.fillStyle = a; c.beginPath(); c.roundRect(x + 10, y0 + 118, lw - 20, 52, 6); c.fill();
      c.fillStyle = '#334155'; c.fillRect(x + 10, y0 + 182, lw - 30, 8); c.fillRect(x + 10, y0 + 198, lw - 44, 8);
    });
  }
  function celularVazio(c, w, h, vibra) {
    c.fillStyle = '#f4f6f9'; c.fillRect(0, 0, w, h); c.fillStyle = '#25d366'; c.fillRect(0, 0, w, 46);
    c.fillStyle = '#fff'; c.font = '800 18px Montserrat, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Mensagens', w / 2, 24);
    c.fillStyle = vibra ? '#e8352b' : '#050d1c'; c.font = '900 64px Montserrat, sans-serif'; c.fillText('0', w / 2, h * 0.45);
    c.fillStyle = '#596571'; c.font = '700 20px Montserrat, sans-serif'; c.fillText('mensagens', w / 2, h * 0.45 + 52);
  }
  const marca = (c, w, h) => { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#1067f8'); d.addColorStop(1, '#00bc7b'); c.fillStyle = d; c.fillRect(0, 0, w, h); };

  // Uma barbearia no calçadão: o prédio, o toldo e a placa com o nome
  function barbearia(x, nome, fundo, cor, toldoCor, mod) {
    const g = new THREE.Group(); g.position.set(x, G, LOJAS_Z); K.scene.add(g);
    K.modelo('kenney-cidade/' + mod, { escala: 5, pos: [0, 0, 0], pai: g });
    const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(toldoCor)); toldo.position.set(0, 2.55, 3.0); toldo.rotation.x = 0.25; g.add(toldo);
    const p = K.placa(nome, { larg: 3.0, alt: 0.7, fundo, cor, borda: cor }); K.scene.remove(p); p.position.set(0, 3.15, 2.62); g.add(p);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['home_office', 'cidade', 'cidade_maquete', 'central_mappoa', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A lista sem o número da busca no topo (esta busca não é uma captura de verdade)
    T.listaBarb = (c, w, h, e) => {
      T.lista(c, w, h, e);
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      c.font = '700 21px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Barbearias · Goiânia, GO', 36, 168, w - 72);
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Thiago (do canal), quem aparece (primo, vizinho, amigo), o dono da Barbearia do Zé e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    [
      { roupa: 'camiseta', cores: { camiseta: 0xe8352b, bermuda: 0x2f3540, cabelo: 0x1a1a1a, pele: 0xc98f62 } },
      { roupa: 'moletom', cores: { moletom: 0x8a8f98, punho: 0x6b7079, calca: 0x2f3540, mochila: 0x596571, cabelo: 0x3a2414, pele: 0xf0c8a0 } },
      { roupa: 'camiseta', cores: { camiseta: 0xff8a2b, bermuda: 0x3b4f7a, cabelo: 0x5a3416, pele: 0xe6b48a } }
    ].forEach((op) => { const b = K.boneco(op); K.semNome(b.g); K.nomear('quem_aparece', b.g); quem.push(b); });
    dono = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x222222, bermuda: 0x4a4a4a, cabelo: 0x1a1a1a, pele: 0xb57a50 } });
    K.semNome(dono.g); K.nomear('dono', dono.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Home office
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    cel = K.celular(); guarda(cel, 'celular', [0, 1, 0], 1.8);
    placa = placaSolta('ATENDO QUALQUER UM', { larg: 1.5, alt: 0.62, fundo: '#ffd23f', cor: '#050d1c', borda: '#050d1c' }, 'placa', [0.3, 2.2, 0.55]);
    precoV = placaSolta('PREÇO', { larg: 1.0, alt: 0.5, fundo: '#00bc7b', cor: '#ffffff', borda: '#ffffff' }, 'preco', [-0.85, 1.6, 0.6]);
    precoR = placaSolta('PREÇO', { larg: 1.0, alt: 0.5, fundo: '#e8352b', cor: '#ffffff', borda: '#ffffff' }, 'preco', [-0.85, 1.6, 0.6]);
    precoB = placaSolta('BARATINHO', { larg: 1.2, alt: 0.5, fundo: '#e8352b', cor: '#ffffff', borda: '#ffffff' }, 'preco', [0, 1.9, 0.6]);
    rascunho = placaSolta('Faz igual, mas barato', { larg: 1.1, alt: 0.45, fundo: '#ffffff', cor: '#596571', borda: '#9aa3ad' }, 'rascunho', [0.6, 1.3, 0.8]);
    telaHo = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaHo, 'tela', [-0.55, 1.6, 0.1]);
    telaMsg = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaMsg, 'mensagem', [-0.55, 1.6, 0.1]);
    funil = K.painelMappoa(3, 1.87, { px: 1000 }); guarda(funil, 'funil', [-0.5, 2.05, -0.8]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Cidade: a Barbearia do Zé (sem site) à esquerda e a Barbearia Navalha (site ruim) à direita
    zeG = barbearia(ZE, 'Barbearia do Zé', '#fff3d6', '#7a4a10', 0xd98a2b, 'building-small-a'); guarda(zeG, 'barbearia_sem');
    navalhaG = barbearia(NAVALHA, 'Barbearia Navalha', '#e3ecff', '#123a8a', 0x2f6fd6, 'building-small-d'); guarda(navalhaG, 'barbearia_ruim');
    placaSem = placaSolta('Sem site', { larg: 1.4, alt: 0.5, fundo: '#ffffff', cor: '#b42318', borda: '#b42318' }, null, [ZE, G + 2.0, 3.35]);
    placaNovo = placaSolta('Site novo', { larg: 1.4, alt: 0.5, fundo: '#ffffff', cor: '#0b6b49', borda: '#0b6b49' }, null, [ZE, G + 2.0, 3.35]);
    siteRua = K.siteAntigoMappoa({ nome: 'BARBEARIA NAVALHA', ano: '2014' }); guarda(siteRua, 'site_velho', [NAVALHA + 0.2, G, 3.0], 0.8);
    alvo = guarda(K.m3d('alvo'), 'alvo', ALVO, 1.3);
    flecha = new THREE.Group();
    const haste = K.malha(new THREE.CylinderGeometry(0.025, 0.025, 0.7, 8), K.mat(0x7a4a22)); haste.rotation.z = Math.PI / 2;
    const ponta = K.malha(new THREE.ConeGeometry(0.06, 0.16, 10), K.mat(0x596571)); ponta.rotation.z = -Math.PI / 2; ponta.position.x = 0.42;
    const pena = K.malha(new THREE.BoxGeometry(0.14, 0.12, 0.01), K.mat(0xe8352b)); pena.position.x = -0.33;
    flecha.add(haste, ponta, pena); K.scene.add(flecha); guarda(flecha, null);
    pedido = guarda(K.m3d('lista_check'), 'pedido', [0, 1, 0], 0.9);

    // Maquete: três empresas, os ícones do que se procura na mão, a lupa e o relógio
    [0xffe1a8, 0xb9c4d6, 0xf7c6c6].forEach((cor, i) => predios.push(guarda(K.m3d('prediozinho', { cor, a: 1.3, placa: 'EMPRESA' }), 'predios', PRED[i], 0.8)));
    icones.push(guarda(K.m3d('pino'), null, mais(PRED[0], [0, 1.6, 0.2]), 0.7));
    icones.push(guarda(K.moedaContatoMappoa('site', 0.45), null, mais(PRED[1], [0, 1.7, 0.2])));
    icones.push(guarda(K.moedaContatoMappoa('tel', 0.45), null, mais(PRED[2], [0, 1.7, 0.2])));
    lupa = guarda(K.m3d('lupa', { tam: 1.0 }), 'lupa', [0, 1.6, 1.0]);
    relogio = guarda(K.m3d('relogio_parede', { hora: 3 }), 'relogio', [0, 2.65, 0.9], 1.1);

    // Central do Mappoa
    logo = K.logoMappoa(1.75); guarda(logo, 'logo', [0.7, 1.65, -0.3]);
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [0.85, 1.6, 0.1]);
    ['whats', 'tel', 'insta', 'site', 'whats', 'site'].forEach((tp) => moedas.push(guarda(K.moedaContatoMappoa(tp, 0.45), null)));

    // Palco da marca: o site velho no pedestal, a análise, o monte cinza e o pódio verde
    pedestal = K.malha(new THREE.BoxGeometry(1.2, 0.6, 0.9), K.mat(0xe9eef5)); K.scene.add(pedestal); guarda(pedestal, null, [0, 0.3, 0.3]);
    siteMundo = K.siteAntigoMappoa({ nome: 'BARBEARIA NAVALHA', ano: '2014' }); guarda(siteMundo, 'site_velho', [0, 0.6, 0.3], 0.95);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.2, 1.65, 0.1]);
    lupaRobo = guarda(K.m3d('lupa', { tam: 0.8 }), null, [-1.6, 1.4, 0.9]);
    monte = guarda(K.m3d('pilha_cartoes', { n: 8 }), 'monte', [-1.45, 0, 0.6], 1.0);
    podio = K.malha(new THREE.BoxGeometry(0.95, 0.7, 0.8), K.mat(0x00bc7b)); K.scene.add(podio); guarda(podio, 'podio', [1.35, 0.35, 0.55]);
    COM_SITE.slice(0, 1).concat(SEM_SITE.slice(0, 2)).forEach((l) => {
      const c = K.cartaoLeadMappoa(l);
      const borda = K.malha(new THREE.PlaneGeometry(1.62, 0.52), new THREE.MeshBasicMaterial({ color: 0x00bc7b }), false); borda.position.z = -0.03; c.g.add(borda);
      cartoes.push(guarda(c, 'cartoes', [0, 2, 0], 0.45));
    });
    cartaoGrande = K.cartaoLeadMappoa(COM_SITE[0]); guarda(cartaoGrande, 'cartoes', [0.35, 1.45, 1.35], 0.6);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      pouco: e('Cobra pouco', 'vermelho'), designer: e('Web designer', 'azul'), vender: e('Não sabe vender', 'vermelho'), aparecer: e('Quem aparecer', 'laranja'),
      baratinho: e('Site baratinho', 'vermelho'), precisa: e('Quem precisa de site', 'verde'), criar: e('Criar do zero', 'verde'), reformar: e('Reformar', 'laranja'),
      uma: e('Uma por uma', 'vermelho'), contatos: e('Com os contatos', 'verde'), zero: e('Site do zero', 'verde'), duvida: e('Bom ou ruim?', 'laranja'),
      modelo: e('Modelo pronto', 'laranja'), construcao: e('Em construção', 'vermelho'), perde: e('O que ela perde', 'verde'), escolhe: e('Ele escolhe', 'verde')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo'); fx.errado2 = K.marca('errado');
    fx.rotI = K.rotulo('Cliente ideal'); fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Você cria site do zero ou reforma site velho? <em>Comenta aí</em>');
    fx.festa = K.festa([1.35, 1.6, 0.6]);
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const pisca = (tc) => Math.floor(tc * 3) % 2 === 0;
  // A etiqueta de preço murchando: de "e0" pra "e1" de tamanho, aos trancos
  const murcha = (k, e0, e1) => K.lerp(e0, e1, Math.min(1, Math.floor(K.clamp(k) * 4) / 3));

  const P = {
    gancho(B, tc) {
      // NA TELA: o Thiago no centro erguendo a placa "ATENDO QUALQUER UM"; a etiqueta de preço à esquerda, murchando · MOSTRA: personagem, placa, preco
      // CENÁRIO: home_office de dia; a mesa com o computador e a janela atrás
      const tC = quando('cobra', B, 0.72), tP = quando('pouco', B, 0.9), pos = [0.3, 0, 0.3];
      ve(comp, placa); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      // OBJETOS SE MEXENDO: a placa balança no 1º segundo; o preço encolhe de 1,0 pra 0,4 e desce a partir de "cobra", e fica vermelho em "pouco"
      placa.rotation.z = Math.sin(tc * 5) * 0.08 * K.clamp(1.4 - B.t);
      const k = K.clamp((tc - tC) / Math.max(0.4, tP - tC + 0.3)), esc = murcha(k, 1.0, 0.4);
      const pr = tc > tP ? precoR : precoV; ve(pr);
      pr.scale.setScalar(esc); pr.position.set(-0.85, 1.6 - 0.5 * K.suave(k), 0.6);
      // PERSONAGEM: começo erguendo (a placa no alto) · na palavra "pouco": susto
      menino.colocar(pos, tc > tP ? [-0.85, 1.2, 0.6] : [0.3, 1.4, 5]);
      if (tc > tP) menino.reagir('susto', tc - tP); else menino.reagir('erguendo', B.t);
      // EFEITOS VISUAIS: "Cobra pouco" em "pouco"
      fx.et.pouco.em([-0.85, 2.3, 0.7], tc - tP);
      // SONS: whoosh da placa · desliga no preço encolhendo · errado em "pouco"
      K.som('whoosh', B.inicio + 0.05, 0.4); K.som('desliga', tC, 0.5); K.som('errado', tP, 0.5);
      // CÂMERA: revelando · aberto · frente · olho, topo livre
      K.filmar([menino, placa, pr], 'revelando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.38, obstaculos: false });
    },
    thiago(B, tc) {
      // NA TELA: o Thiago à direita da mesa; o monitor com o site lindo rolando · MOSTRA: personagem, monitor
      const tT = quando('Thiago', B, 0.12), tI = quando('incríveis', B, 0.5), tV = quando('vender', B, 0.9);
      ve(comp); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, K.clamp(B.p)), 'port' + Math.round(B.p * 30));
      if (tc > tI) K.brilhar(comp.g, tc - tI, 0.8);
      // PERSONAGEM: começo mostrando (orgulhoso) · na palavra "vender": triste
      menino.colocar([0.45, 0, -0.2], tc > tV ? [0.3, 1.2, 4] : MONITOR);
      if (tc > tV) menino.reagir('triste', tc - tV); else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: "Web designer" · "Não sabe vender" (a azul some antes)
      fx.et.designer.em(mais(MONITOR, [0, 0.75, 0.3]), tc < tV ? tc - tT : -1);
      fx.et.vender.em([0.45, 2.15, 0], tc - tV);
      K.som('ding', tT, 0.5); K.som('brilho', tI, 0.5); K.som('errado', tV, 0.3);
      // CÂMERA: chegando · perto · esquerda · olho
      K.filmar([menino, comp], 'chegando', B.p, { plano: 'medio', lado: -30, altura: 'olho', obstaculos: false });
    },
    espera(B, tc) {
      // NA TELA: o Thiago com o celular "0 mensagens"; o primo, o vizinho e o amigo entrando pela direita · MOSTRA: personagem, celular, quem_aparece
      const tI = quando('indicação', B, 0.2), tA = quando('aparecer', B, 0.4), ts = [quando('primo', B, 0.55), quando('vizinho', B, 0.72), quando('amigo', B, 0.86)];
      const pos = [-0.4, 0, 0.2];
      ve(comp, cel); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      const vib = tc > tI && tc < tI + 0.4;
      cel.tela.desenhar((c, w, h) => celularVazio(c, w, h, vib), 'cel' + vib);
      cel.g.position.set(pos[0] + 0.32 + (vib ? Math.sin(tc * 60) * 0.015 : 0), 1.05, pos[2] + 0.42); cel.g.rotation.set(-0.3, 0.2, 0);
      // OBJETOS SE MEXENDO: cada um anda da porta (à direita) até a fila na frente do Thiago
      const FILA = [[0.75, 0, 0.55], [1.35, 0, 0.85], [1.95, 0, 1.15]];
      quem.forEach((b, i) => {
        if (tc < ts[i]) return;
        b.g.visible = true;
        b.irPara([3.2, 0, 1.4 + i * 0.2], FILA[i], K.clamp((tc - ts[i]) / 0.7), tc, { olhar: [pos[0], 1.3, pos[2]] });
        K.som('passo', ts[i] + 0.1, 0.4); K.som('passo', ts[i] + 0.4, 0.4);
      });
      // PERSONAGEM: começo pensando (olha o celular) · na palavra "aparecer": surpreso
      menino.colocar(pos, tc > tA ? [2, 1.3, 1] : mais(pos, [0.32, 1.05, 0.42]));
      if (tc > tA) menino.reagir('surpreso', tc - tA); else menino.reagir('pensando', B.t);
      fx.et.aparecer.em([1.3, 2.25, 0.9], tc - tA);
      K.som('bip', tI, 0.5);
      // CÂMERA: passando · médio · direita · olho
      K.filmar([menino, [1.3, 1.0, 0.85]], 'passando', B.p, { plano: 'medio', lado: 18, altura: 'olho', tam: 1.6, obstaculos: false });
    },
    baratinho(B, tc) {
      // NA TELA: os três em fila; o primo na frente com o rascunho; o preço entre eles virando "BARATINHO" · MOSTRA: quem_aparece, preco, personagem
      const tQ = quando('quer', B, 0.15), tB = quando('baratinho', B, 0.35), tA = quando('aceita', B, 0.6), tO = quando('outro', B, 0.92);
      const pos = [-0.4, 0, 0.2], FILA = [[0.75, 0, 0.55], [1.35, 0, 0.85], [1.95, 0, 1.15]];
      quem.forEach((b, i) => { b.g.visible = true; b.colocar(FILA[i], [pos[0], 1.3, pos[2]]); if (i === 0 && tc > tQ) b.reagir('mostrando', tc - tQ); else b.reagir('pensando', B.t + i); });
      ve(rascunho); rascunho.scale.setScalar(pop(tc - tQ)); rascunho.position.set(0.55, 1.35, 0.95);
      // OBJETOS SE MEXENDO: o preço perde um pedaço e vira "BARATINHO" em "baratinho"; em "aceita", passa pra mão do Thiago
      const pr = tc > tB ? precoB : precoR; ve(pr);
      const ida = K.suave(K.clamp((tc - tA) / 0.5));
      pr.scale.setScalar(tc > tB ? 0.75 : 0.7); pr.position.set(...lerp3([0.25, 2.0, 0.75], [-0.1, 1.25, 0.6], ida));
      pr.rotation.z = tc > tB && tc < tB + 0.4 ? Math.sin((tc - tB) * 40) * 0.1 : 0;
      // PERSONAGEM: começo dúvida (olha o rascunho) · na palavra "aceita": cansado
      menino.colocar(pos, [0.6, 1.3, 0.7]);
      if (tc > tA) { menino.reagir('cansado', tc - tA); menino.suar(tc - tA); } else menino.reagir('duvida', B.t);
      fx.et.baratinho.em([0.25, 2.6, 0.8], tc - tB);
      K.som('racha', tB, 0.5); K.som('errado', tO, 0.5);
      // CÂMERA: chegando · perto · frente · baixo
      K.filmar([quem[0].g, pr, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', obstaculos: false });
    },
    escolhe(B, tc) {
      // NA TELA: a rua; o Thiago à esquerda com a flecha; o alvo no meio da calçada; as duas barbearias atrás · MOSTRA: alvo, personagem, barbearia_sem
      // CENÁRIO: cidade de dia; os carros e o ônibus passando (o cenário cuida)
      const tE = quando('escolhe', B, 0.3), tEm = quando('empresa', B, 0.72), tS = quando('site', B, 0.95), pos = [-24.7, G, 4.5];
      ve(zeG, navalhaG, alvo); K.entrar(alvo, 'sobe', tc - tE, { dur: 0.4 });
      // OBJETOS SE MEXENDO: a flecha sai da mão e crava no centro do alvo em "empresa"
      const mao = mais(pos, [0.45, 1.15, 0]), centro = mais(ALVO, [0, 0.95, 0.12]), d = K.clamp((tc - tEm) / 0.35);
      if (tc > tE) { ve(flecha); flecha.position.set(...lerp3(mao, centro, d)); flecha.position.y += Math.sin(d * Math.PI) * 0.25; flecha.rotation.set(0, Math.atan2(-(centro[2] - mao[2]), centro[0] - mao[0]), 0); }
      if (tc > tEm + 0.35) alvo.rotation.z = Math.sin((tc - tEm) * 30) * 0.04 * K.clamp(1 - (tc - tEm - 0.35) * 2);
      if (tc > tS) { K.brilhar(zeG, tc - tS, 0.6); K.brilhar(navalhaG, tc - tS, 0.6); }
      // PERSONAGEM: começo pensando (mira) · "empresa": empurrando (lança) e depois vitória
      menino.colocar(pos, mais(ALVO, [0, 1, 0]));
      if (tc > tEm + 0.4) menino.reagir('vitoria', tc - tEm - 0.4); else if (tc > tEm) menino.reagir('empurrando', tc - tEm); else menino.reagir('pensando', B.t);
      fx.et.precisa.em(mais(ALVO, [0, 2.1, 0.2]), tc - tS);
      K.som('whoosh', tEm, 0.5); K.som('trava', tEm + 0.35, 0.6); K.som('certo', tS, 0.6);
      // CÂMERA: subindo · médio · direita · baixo
      K.filmar([alvo, menino], 'subindo', B.p, { plano: 'perto', lado: 25, altura: 'baixo', tam: 1.4 });
      const [x, y] = K.tela(mais(ALVO, [0.8, 1.4, 0]));
      fx.certo.em({ tela: [x, y] }, tc - tS);
    },
    ideal_rotulo(B, tc) {
      // NA TELA: o alvo de perto, com a flecha no centro · MOSTRA: alvo
      ve(alvo, flecha); flecha.position.set(...mais(ALVO, [0, 0.95, 0.12])); flecha.rotation.set(0, -0.35, 0);
      alvo.rotation.y = -0.2 + K.suave(B.p) * 0.4; K.brilhar(alvo, B.t, 1.2);
      // PERSONAGEM: a mão do Thiago aponta o centro
      menino.colocar([-24.6, G, 4.4], mais(ALVO, [0, 0.95, 0])); menino.apontar(0.9); menino.humor('feliz');
      fx.rotI.em({ tela: [540, 330] }, B.t - 0.1);
      K.som('brilho', B.inicio + 0.1, 0.6);
      // CÂMERA: girando · perto · esquerda · olho
      K.filmar(alvo, 'girando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho', angulo: 14 });
    },
    dois_jeitos(B, tc) {
      // NA TELA: as duas barbearias lado a lado; "Sem site" no Zé, o site velho piscando na Navalha; o Thiago entre as duas · MOSTRA: barbearia_sem, barbearia_ruim, site_velho
      const tSs = quando('sem', B, 0.4), tN = quando('nenhum', B, 0.55), tR = quando('ruim', B, 0.92), pos = [-23.6, G, 4.6];
      ve(zeG, navalhaG, placaSem, siteRua);
      K.entrar(placaSem, 'cai', tc - tN, { altura: 2.5 });
      if (tc > tN + 0.4) placaSem.rotation.z = Math.sin((tc - tN) * 8) * 0.06 * K.clamp(1.5 - (tc - tN));
      siteRua.desatualizar(tc > tR ? tc : 0);
      // PERSONAGEM: aponta o Zé em "sem" · aponta a Navalha em "ruim" e depois ideia
      menino.colocar(pos, tc > tR ? [NAVALHA, 1.5, 3] : [ZE, 1.5, 3]);
      if (tc > tR + 0.5) menino.reagir('ideia', tc - tR - 0.5); else if (tc > tSs) menino.apontar(0.8); else menino.reagir('pensando', B.t);
      dono.g.visible = true; dono.colocar([ZE + 0.9, G, 2.6], [ZE + 0.9, 1.4, 6]); dono.reagir('duvida', B.t);
      fx.et.criar.em([ZE, G + 2.8, 3.4], tc - tN); fx.et.reformar.em([NAVALHA + 0.2, G + 2.1, 3.2], tc - tR);
      K.som('baque', tN + 0.4, 0.5); K.som('zap', tR, 0.5);
      // CÂMERA: revelando · aberto · frente · olho
      K.filmar([[ZE, G + 1.8, 2.8], [NAVALHA, G + 1.2, 3.0], menino], 'passando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    na_mao(B, tc) {
      // NA TELA: a maquete; o Thiago com a lupa correndo de prédio em prédio; os ícones piscando; o relógio girando por cima · MOSTRA: personagem, lupa, relogio
      const ts = [quando('mapa', B, 0.55), quando('site', B, 0.72), quando('telefone', B, 0.9)], tT = quando('trava', B, 0.35);
      predios.forEach((p) => ve(p));
      // OBJETOS SE MEXENDO: a cada verbo, ele vai até o prédio e o ícone dele acende
      let alvoX = -1.4;
      ts.forEach((t0, i) => { if (tc > t0) { alvoX = PRED[i][0]; ve(icones[i]); const g = icones[i].g || icones[i]; g.scale.setScalar((i === 0 ? 0.7 : 1) * pop(tc - t0)); g.rotation.y = tc * 2; K.som('clique', t0, 0.5); } });
      const ultimo = ts.filter((t0) => tc > t0).length, t0 = ultimo ? ts[ultimo - 1] : B.inicio;
      const xAnt = ultimo > 1 ? PRED[ultimo - 2][0] : -1.4, x = K.lerp(xAnt, alvoX, K.suave(K.clamp((tc - t0) / 0.35)));
      const pos = [x, 0.12, 0.95];
      menino.colocar(pos, [x, 1, -0.45]);
      if (tc > ts[2]) { menino.reagir('cansado', tc - ts[2]); menino.suar(tc - ts[2]); } else menino.reagir('segurando', B.t);
      ve(lupa); lupa.position.set(x + 0.35, 1.25, 0.65); lupa.rotation.z = Math.sin(tc * 3) * 0.15;
      // o relógio cai em "trava" e corre por cima dele
      ve(relogio); K.entrar(relogio, 'cai', tc - tT, { altura: 2, som: false });
      relogio.position.x = x; const m = relogio.userData.m3d, g = K.clamp((tc - tT) / Math.max(0.5, B.ate - tT));
      if (m) { m.m.rotation.z = -g * 22; m.h.rotation.z = -1.57 - g * 3.5; }
      fx.et.uma.em([x, 3.4, 0.9], tc - tT);
      K.som('zumbido', tT, 0.4); K.som('errado', B.ate - 0.25, 0.4);
      // CÂMERA: afastando · médio · direita · alto
      K.filmar([menino, relogio, predios[1]], 'afastando', B.p, { plano: 'medio', lado: 'direita', altura: 'alto' });
    },
    site(B, tc) {
      // NA TELA: a tela de busca subindo do monitor; o Thiago digitando · MOSTRA: tela, personagem
      const tS = quando('site', B, 0.12), tE = quando('escreve', B, 0.6), tC = quando('cidade', B, 0.92);
      ve(comp, telaHo); K.entrar(telaHo.g, 'sobe', tc - tS, { dur: 0.5 });
      comp.tela.desenhar(marca, 'marca');
      telaHo.mostrar('busca', { nicho: BUSCA.nicho, estado: BUSCA.estado, cidade: BUSCA.cidade, digitado: K.clamp((tc - tE) / Math.max(0.3, tC - tE)), apertado: tc > tC + 0.3 });
      // PERSONAGEM: começo segurando (digitando) · "cidade": aponta a tela
      menino.colocar([1.25, 0, 0.8], [-0.55, 1.2, 0.1]);
      if (tc > tC) menino.apontar(0.7); else menino.reagir('segurando', B.t);
      K.som('clique', tE, 0.5); K.som('clique', tE + 0.2, 0.4); K.som('clique', tC + 0.3, 0.6);
      // CÂMERA: chegando · médio · frente · olho
      K.filmar([telaHo, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa_rotulo(B, tc) {
      // NA TELA: o logo grande; o robô acenando · MOSTRA: logo, robo
      const tM = quando('Mappoa', B, 0.4);
      ve(logo, robo); logo.g.rotation.y = K.suave(K.clamp((tc - tM + 0.2) / 0.6)) * 6.283;
      robo.g.position.set(K.lerp(-3.5, -0.95, K.suave(K.clamp(B.t / 0.5))), 0, 0.5); robo.g.rotation.y = 0.35; robo.em(tc, { acena: tc > tM ? 0.4 : 1, mapa: false });
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.som('brilho', tM, 0.5);
      // CÂMERA: girando · perto · direita · olho
      K.filmar([logo, robo], 'girando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho', angulo: 16 });
    },
    lista(B, tc) {
      // NA TELA: o robô no mapa; a lista COM SITE / SEM SITE à direita; as moedas voando; o Thiago chegando · MOSTRA: robo, tela
      const tL = quando('lista', B, 0.2), tSp = quando('separada', B, 0.35), tT = quando('tem', B, 0.55), tN = quando('não', B, 0.7), tCo = quando('contatos', B, 0.92);
      ve(robo, telaC); K.entrar(telaC.g, 'desliza', tc - tL, { de: [3, 0, 0], dur: 0.4 });
      const sem = tc > tN, n = Math.floor(K.clamp((tc - tL) / 0.9) * 4);
      telaC.mostrar('listaBarb', sem ? { grupo: 'SEM SITE', itens: SEM_SITE, n: 3 } : { grupo: 'COM SITE', itens: COM_SITE, n });
      for (let i = 0; i < 4; i++) K.som('bip', tL + i * 0.2, 0.25);
      moedas.forEach((m, i) => { const t0 = tCo - 0.35 + i * 0.1, d = (tc - t0) / 0.5; if (d <= 0 || d >= 1) return; ve(m); const g = m.g || m; const q = K.clamp(d); g.position.set(...lerp3([-0.6 + i * 0.25, 3.0, -3.6], [0.85, 1.9 - (i % 3) * 0.35, 0.2], q)); g.position.y += Math.sin(q * Math.PI) * 0.6; g.rotation.y = q * 6; if (i % 2 === 0) K.som('ding', t0 + 0.5, 0.3); });
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = tc > tCo ? 0.9 : 0.2; robo.em(tc, { mapa: true, acena: tc > tCo ? 0.6 : 0 });
      // PERSONAGEM: o Thiago chega à direita, surpreso, em "separada"
      menino.colocar([2.25, 0, 1.35], [0.85, 1.4, 0.1]);
      if (tc > tCo) menino.reagir('vitoria', tc - tCo); else if (tc > tSp) menino.reagir('surpreso', tc - tSp); else menino.reagir('pensando', B.t);
      fx.et.contatos.em([0.85, 3.15, 0.2], tc - tCo);
      void tT;
      // CÂMERA: passando · médio · esquerda · olho
      K.filmar([robo, telaC], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    do_zero(B, tc) {
      // NA TELA: a Barbearia do Zé com a placa "Sem site"; o dono na porta; o Thiago estendendo a prancheta · MOSTRA: barbearia_sem, dono, personagem
      const tO = quando('oferece', B, 0.5), tZ = quando('zero', B, 0.88), pos = [ZE + 1.7, G, 4.7];
      ve(zeG, pedido);
      // OBJETOS SE MEXENDO: em "zero", a placa vira e mostra "Site novo"; a vitrine acende
      const giro = K.clamp((tc - tZ) / 0.35), virou = giro > 0.5;
      const pl = virou ? placaNovo : placaSem; ve(pl); pl.rotation.y = virou ? (giro - 1) * Math.PI : giro * Math.PI;
      if (virou) K.brilhar(zeG, tc - tZ - 0.2, 0.7);
      pedido.position.set(pos[0] - 0.4, G + 1.05, pos[2] + 0.1); pedido.rotation.set(0, -0.8, 0); pedido.scale.setScalar(0.9 * pop(tc - tO));
      // PERSONAGEM: começo chamando · "zero": mostrando. O dono: surpreso em "zero"
      menino.colocar(pos, [ZE + 0.7, 1.4, 3.0]);
      if (tc > tZ) menino.reagir('mostrando', tc - tZ); else menino.reagir('chamando', B.t);
      dono.g.visible = true; dono.colocar([ZE + 0.4, G, 3.8], pos);
      if (tc > tZ) dono.reagir('surpreso', tc - tZ); else dono.reagir('duvida', B.t);
      fx.et.zero.em([ZE, G + 2.85, 3.5], tc - tZ - 0.2);
      K.som('estalo', tZ, 0.6); K.som('certo', tZ + 0.3, 0.6);
      // CÂMERA: chegando · perto · direita · baixo
      K.filmar([pl, dono.g, menino], 'chegando', B.p, { plano: 'perto', lado: 22, altura: 'baixo' });
      const [x, y] = K.tela([ZE + 1.4, G + 2.4, 3.5]);
      fx.certo.em({ tela: [x + 60, y] }, tc - tZ - 0.3);
    },
    como_saber(B, tc) {
      // NA TELA: o site velho no pedestal, trocando de tela; o "Bom ou ruim?" em cima; o Thiago à direita · MOSTRA: site_velho, personagem
      const tS = quando('site', B, 0.25), tR = quando('ruim', B, 0.85);
      ve(pedestal, siteMundo); K.entrar(siteMundo.g, 'cai', tc - tS, { altura: 2.5 });
      siteMundo.desatualizar(Math.floor(tc * 2.5) % 2 === 0 ? tc : 0);
      // PERSONAGEM: começo dúvida · na palavra "ruim": pensando
      menino.colocar([1.45, 0, 1.0], [0, 1.0, 0.3]);
      if (tc > tR) menino.reagir('pensando', tc - tR); else menino.reagir('duvida', B.t);
      fx.et.duvida.em([0, 2.05, 0.5], tc - tR);
      K.som('baque', tS + 0.35, 0.5); K.som('zap', tR, 0.4);
      // CÂMERA: mergulho · médio · frente · alto
      K.filmar([siteMundo, menino], 'mergulho', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
    },
    analise(B, tc) {
      // NA TELA: a tela no centro (a escolha, depois a análise da Navalha); o site velho à esquerda; o robô passando a lupa · MOSTRA: tela, site_velho, robo
      const tA = quando('análise', B, 0.15), tCp = quando('completa', B, 0.28), tAp = quando('aponta', B, 0.42), tM = quando('modelo', B, 0.62), tC = quando('construção', B, 0.92);
      ve(telaM, siteMundo, robo, lupaRobo); K.entrar(telaM.g, 'cai', tc - tA, { altura: 3 });
      siteMundo.g.position.set(-1.85, 0, 0.75); siteMundo.g.scale.setScalar(0.85); siteMundo.desatualizar(tc > tC ? tc : 0);
      if (tc < tAp) telaM.mostrar('enriquecer', { tipo: tc > tCp ? 2 : 1 });
      else telaM.mostrar('analise', { nome: ANALISE.nome, ate: 1, aderencia: ANALISE.aderencia, dores: tc > tC ? ['Site com cara de modelo pronto', 'Site em construção'] : tc > tM ? ['Site com cara de modelo pronto'] : [] });
      robo.g.position.set(1.55, 0, 0.75); robo.g.rotation.y = -0.5; robo.em(tc, { acena: tc > tAp ? 0 : 0.6, mapa: false });
      const v = K.clamp((tc - tAp) / Math.max(0.5, B.ate - tAp));
      lupaRobo.position.set(K.lerp(-1.2, -2.3, K.suave(v)), 1.3 + Math.sin(v * 6) * 0.2, 1.1);
      // PERSONAGEM: começo apontar (escolhe a opção completa) · na palavra "construção": surpreso
      menino.colocar([-2.85, 0, 1.35], [-0.2, 1.6, 0.1]);
      if (tc > tC) menino.reagir('surpreso', tc - tC); else menino.apontar(0.55);
      fx.et.modelo.em([-1.85, 2.0, 0.9], tc < tC ? tc - tM : -1); fx.et.construcao.em([-1.85, 2.0, 0.9], tc - tC);
      K.som('clique', tCp, 0.6); K.som('bip', tM, 0.5); K.som('bip', tC, 0.5);
      // CÂMERA: subindo · médio · esquerda · olho
      K.filmar([telaM, siteMundo, robo], 'subindo', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    mensagem(B, tc) {
      // NA TELA: a mensagem pronta subindo do monitor, falando do site da Navalha; o Thiago aperta enviar · MOSTRA: mensagem, personagem
      const tP = quando('prepara', B, 0.1), tMsg = quando('mensagem', B, 0.2), tD = quando('daquela', B, 0.45), tE = quando('envia', B, 0.92);
      ve(comp, telaMsg); K.entrar(telaMsg.g, 'sobe', tc - tP, { dur: 0.45 });
      comp.tela.desenhar(marca, 'marca');
      telaMsg.mostrar('mensagem', { para: 'Para: Barbearia Navalha', texto: 'Oi! Vi que o site da Navalha ainda aparece em construção. Faço sites para barbearias. Posso te mostrar uma ideia rápida?', digitado: K.clamp((tc - tMsg) / Math.max(0.6, tD - tMsg + 0.8)) });
      // PERSONAGEM: começo surpreso (olha a mensagem se escrever) · "envia": apontar (aperta) e depois vitória
      menino.colocar([1.1, 0, 0.85], [-0.55, 1.2, 0.1]);
      if (tc > tE + 0.35) menino.reagir('vitoria', tc - tE - 0.35); else if (tc > tE) menino.apontar(0.8); else menino.reagir('surpreso', B.t);
      const [x, y] = K.tela([-0.55, 3.0, 0.15]);
      fx.certo.em({ tela: [x + 180, y] }, tc - tE);
      K.som('clique', tE, 0.7); K.som('ding', tE + 0.1, 0.7);
      // CÂMERA: chegando · perto · direita · baixo
      K.filmar([telaMsg, menino], 'chegando', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    por_isso(B, tc) {
      // NA TELA: a etiqueta de preço caindo no monte cinza; os cartões verdes no pódio; o Thiago no meio mostrando o cartão da Navalha · MOSTRA: cartoes, preco, personagem
      const tPr = quando('preço', B, 0.45), tMo = quando('mostrando', B, 0.65), tPe = quando('perdendo', B, 0.92), pos = [0, 0, 1.0];
      ve(monte, podio, precoB);
      // OBJETOS SE MEXENDO: o preço cai do alto no monte e some; os cartões verdes sobem no pódio
      const dq = K.clamp((tc - tPr + 0.5) / 0.5);
      precoB.scale.setScalar(0.6 * (tc > tPr + 0.6 ? K.clamp(1 - (tc - tPr - 0.6) / 0.3) + 0.0001 : 1));
      precoB.position.set(-1.45, K.lerp(3.2, 0.75, dq * dq), 0.7); precoB.rotation.z = dq * 0.5;
      cartoes.forEach((c, i) => { const t0 = tMo + i * 0.15, d = K.clamp((tc - t0) / 0.45); ve(c); c.g.scale.setScalar(0.45 * Math.max(0.0001, d)); c.g.position.set(1.35, 0.8 + i * 0.06 + (1 - d) * 0.5, 0.55); c.g.rotation.set(-Math.PI / 2 * d, 0, 0); });
      ve(cartaoGrande); cartaoGrande.g.scale.setScalar(0.6 * pop(tc - tMo + 0.2)); cartaoGrande.g.position.set(0.4, 1.45, 1.35);
      // PERSONAGEM: começo pensando (olha o preço cair) · "mostrando": mostrando, depois vitória
      menino.colocar(pos, tc > tMo ? [0.4, 1.4, 5] : [-1.45, 0.8, 0.6]);
      if (tc > tPe) menino.reagir('vitoria', tc - tPe); else if (tc > tMo) menino.reagir('mostrando', tc - tMo); else menino.reagir('pensando', B.t);
      fx.et.perde.em([0.4, 2.3, 1.4], tc - tPe);
      fx.festa.em(tc - tPe);
      K.som('baque', tPr, 0.6); K.som('brilho', tMo, 0.5); K.som('certo', tPe, 0.6);
      // CÂMERA: revelando · aberto · frente · olho
      K.filmar([monte, podio, menino], 'revelando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho' });
      const [x, y] = K.tela([-1.45, 1.3, 0.7]);
      fx.errado.em({ tela: [x, y] }, tc - tPr - 0.2);
    },
    antes_agora(B, tc) {
      // NA TELA: antes, o Thiago parado olhando o celular vazio; agora, o funil da campanha e ele arrastando um cartão · MOSTRA: personagem, funil
      const tAp = quando('aparecesse', B, 0.3), tA = quando('Agora', B, 0.45), tE = quando('escolhe', B, 0.7), tV = quando('vende', B, 0.92);
      if (tc < tA) {
        ve(comp, cel); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
        const pos = [-0.4, 0, 0.2];
        cel.tela.desenhar((c, w, h) => celularVazio(c, w, h, false), 'celfalse');
        const cai = K.clamp((tc - tAp) / 0.35);
        cel.g.position.set(pos[0] + 0.32, K.lerp(1.05, 0.08, cai * cai), pos[2] + 0.42); cel.g.rotation.set(-0.3 - cai * 1.2, 0.2, 0);
        menino.colocar(pos, mais(pos, [0.32, 1.05, 0.42])); menino.reagir('triste', B.t);
        K.som('baque', tAp + 0.35, 0.4);
        K.filmar([menino, cel], 'afastando', K.clamp((tc - B.inicio) / Math.max(0.5, tA - B.inicio)), { plano: 'medio', lado: 'esquerda', altura: 'olho', obstaculos: false });
      } else {
        ve(funil); funil.mostrar('funil', { nome: 'BARBEARIAS DO THIAGO', itens: SEM_SITE.slice(0, 2).concat(COM_SITE.slice(0, 2)), mover: K.clamp((tc - tE) / 0.9) });
        menino.colocar([1.25, 0, 0.9], [-0.5, 1.8, -0.8]);
        if (tc > tV) menino.reagir('vitoria', tc - tV); else menino.apontar(0.7);
        fx.et.escolhe.em([-0.5, 3.3, -0.5], tc - tE);
        K.som('certo', tE, 0.5); K.som('festa', tV, 0.5);
        K.filmar([funil, menino], 'afastando', K.clamp((tc - tA) / (B.ate - tA)), { plano: 'aberto', lado: 'frente', altura: 'olho' });
      }
    },
    segue(B, tc) {
      // NA TELA: o Thiago no computador; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Você', B, 0.02), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.62), tTe = quando('testa', B, 0.86);
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], tc > tPc ? [-0.45, 1.6, -1.25] : [0.5, 1.4, 5]);
      if (tc > tPc) menino.reagir('segurando', tc - tPc); else menino.reagir('chamando', B.t);
      K.filmar([navG, comp, menino], 'parado', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], [0.5, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(comp, placa, precoR); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      precoR.scale.setScalar(0.5); precoR.position.set(-0.85, 1.2, 0.6); precoR.rotation.z = 0.25;
      menino.colocar([0.3, 0, 0.3], [0.3, 1.4, 5]); menino.reagir('susto', 0.5);
      K.filmar([menino, placa, precoR], 'parado', 0, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'home_office');
    menino.g.visible = false; dono.g.visible = false; quem.forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    [precoV, precoR, precoB].forEach((p) => { p.scale.setScalar(1); p.rotation.set(0, 0, 0); });
    placaSem.rotation.set(0, 0, 0); placaNovo.rotation.set(0, 0, 0);
    siteMundo.g.position.set(0, 0.6, 0.3); siteMundo.g.scale.setScalar(0.95);
    cel.g.scale.setScalar(1.8);
    cartoes.forEach((c) => c.g.scale.setScalar(0.45));
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
