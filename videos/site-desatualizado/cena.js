// Como descobrir empresas com site desatualizado na sua cidade (canal Mappoa). Cinco cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa.
(function () {
  let bl, CS, menino, dona, cliente, robo, comp, cel, celDona, agenda, telefone, ondas, lupa, lupaRobo, relogio, logo, balao, navG;
  let siteLoja, siteMundo, balcao, placaSem, placaRuim, placasG, lojasG, telaHo, telaC, telaM, funil;
  const cartoes = [], tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'cidade', davi: 'home_office', liga: 'home_office', ja_tem: 'loja_roupas', pergunta: 'cidade', na_mao: 'home_office',
    dez_sites: 'home_noite', busca: 'home_office', mappoa_rotulo: 'central_mappoa', separa: 'central_mappoa', presta: 'mundo_mappoa',
    analise: 'mundo_mappoa', aponta: 'mundo_mappoa', feio: 'loja_roupas', mensagem: 'home_office', comeco: 'loja_roupas',
    antes_agora: 'home_office', segue: 'home_office', cartao: 'home_office', capa: 'mundo_mappoa'
  };
  // Cidade: o calçadão fica em y = 0,14; as lojas a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, LOJA_A = -26.2, LOJA_B = -21, LOJAS_Z = -0.3;
  const CLIENTE_DE = [-25.0, G, 4.2], CLIENTE_ATE = [-21.6, G, 3.9];
  const DAVI_RUA = [-23.6, G, 4.8];
  // Home office: o computador do Davi na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33], MESA_Y = 1.18;
  const LOJAS = [
    { nome: 'Boutique Vento Sul', end: 'Rua Direita, 310', chips: ['whats', 'tel', 'site'] },
    { nome: 'Moda Nova', end: 'Av. Brasil, 1200', chips: ['whats', 'tel', 'site'] },
    { nome: 'Ateliê Lírio', end: 'Rua das Palmeiras, 88', chips: ['tel', 'site'] },
    { nome: 'Closet da Vila', end: 'Praça XV, 40', chips: ['whats', 'site'] },
    { nome: 'Jeans & Cia', end: 'Rua Amazonas, 515', chips: ['whats', 'tel', 'site'] }
  ];
  const SEM_SITE = [
    { nome: 'Bazar da Lu', end: 'Rua Tibiriçá, 77', chips: ['whats', 'tel'] },
    { nome: 'Lojinha Flor', end: 'Av. Nove de Julho, 30', chips: ['whats'] },
    { nome: 'Moda Kids Sol', end: 'Rua São José, 9', chips: ['tel'] }
  ];
  const BUSCA = { nicho: 'lojas de roupa', estado: 'SP', cidade: 'Ribeirão Preto' };

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }

  // ---------- Telas desenhadas (monitor do Davi e celular do cliente) ----------
  function portfolio(c, w, h, rola) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const y0 = -rola * 60;
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#7a4fd6'); d.addColorStop(1, '#2fb5a6');
    c.fillStyle = d; c.fillRect(0, y0, w, 92);
    c.fillStyle = '#fff'; c.font = '900 26px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Davi.design', 18, y0 + 34);
    c.font = '700 13px Montserrat, sans-serif'; c.fillText('Sites que vendem', 18, y0 + 64);
    [['#ff8a5b', '#ffd6c7'], ['#2f6fd6', '#d6e4ff'], ['#00bc7b', '#cdf3e4']].forEach(([a, b], i) => {
      const x = 14 + i * ((w - 28) / 3 + 0), lw = (w - 44) / 3;
      c.fillStyle = b; c.beginPath(); c.roundRect(x + i * 2, y0 + 108, lw, 120, 10); c.fill();
      c.fillStyle = a; c.beginPath(); c.roundRect(x + i * 2 + 10, y0 + 118, lw - 20, 52, 6); c.fill();
      c.fillStyle = '#334155'; c.fillRect(x + i * 2 + 10, y0 + 182, lw - 30, 8); c.fillRect(x + i * 2 + 10, y0 + 198, lw - 44, 8);
    });
  }
  const VELHOS = [
    { nome: 'MODA NOVA', fundo: '#c0c0c0', barra: '#800000', ano: '2016' },
    { nome: 'ATELIÊ LÍRIO', fundo: '#ffffcc', barra: '#006400', ano: '2013' },
    { nome: 'BOUTIQUE VENTO SUL', fundo: '#c0c0c0', barra: '#000080', ano: '2014' }
  ];
  function siteVelho(c, w, h, i, rodape, pisca) {
    const v = VELHOS[i % VELHOS.length];
    c.fillStyle = v.fundo; c.fillRect(0, 0, w, h); c.fillStyle = v.barra; c.fillRect(0, 0, w, 40);
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '700 20px "Times New Roman", serif'; c.fillStyle = '#ffff00'; c.fillText(v.nome, w / 2, 21, w - 20);
    c.font = '700 26px "Times New Roman", serif'; c.fillStyle = '#b00020'; c.fillText('Bem-vindo!!!', w / 2, 70);
    c.fillStyle = pisca ? '#ffd400' : '#b8a000'; c.fillRect(20, 92, w - 40, 38);
    c.font = '700 17px "Courier New", monospace'; c.fillStyle = '#000'; c.fillText('EM CONSTRUÇÃO', w / 2, 112);
    c.font = '400 16px "Times New Roman", serif'; c.fillStyle = '#0000ee'; c.fillText('Clique aqui', w / 2, 150); c.fillRect(w / 2 - 38, 160, 76, 1.5);
    if (rodape) { c.fillStyle = '#e8352b'; c.fillRect(0, h - 34, w, 34); c.font = '900 20px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.fillText('© ' + v.ano, w / 2, h - 17); }
    else { c.fillStyle = '#333'; c.font = '400 13px "Times New Roman", serif'; c.fillText('Visitas: 000123', w / 2, h - 16); }
  }
  function celularVelho(c, w, h, pisca) {
    c.fillStyle = '#c0c0c0'; c.fillRect(0, 0, w, h); c.fillStyle = '#000080'; c.fillRect(0, 0, w, 40);
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '700 15px "Times New Roman", serif'; c.fillStyle = '#ffff00'; c.fillText('VENTO SUL', w / 2, 21);
    c.font = '700 22px "Times New Roman", serif'; c.fillStyle = '#b00020'; c.fillText('Bem-vindo!', w / 2, 74);
    c.fillStyle = pisca ? '#ffd400' : '#b8a000'; c.fillRect(8, 110, w - 16, 78);
    c.font = '900 20px "Courier New", monospace'; c.fillStyle = '#000'; c.fillText('SITE EM', w / 2, 136); c.fillText('CONSTRUÇÃO', w / 2, 164);
    c.font = '400 15px "Times New Roman", serif'; c.fillStyle = '#333'; c.fillText('Última atualização: 2014', w / 2, 230, w - 10);
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['cidade', 'home_office', ['home_office', { hora: 'noite' }, 'home_noite'], 'loja_roupas', 'central_mappoa', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A lista sem o número da busca no topo (esta busca não é uma captura de verdade)
    T.listaLojas = (c, w, h, e) => {
      T.lista(c, w, h, e);
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      c.font = '700 21px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Lojas de roupa · Ribeirão Preto, SP', 36, 168, w - 72);
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Davi (do canal), a dona da loja e o cliente do gancho
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.boneco({ tipo: 'menina', cores: { vestido: 0xe8537a, cabelo: 0x2a1a12, pele: 0xc98f62 } });
    K.semNome(dona.g); K.nomear('dona', dona.g);
    cliente = K.boneco({ roupa: 'moletom', cores: { moletom: 0x8a8f98, punho: 0x6b7079, calca: 0x2f3540, mochila: 0x596571, cabelo: 0x3a2414, pele: 0xf0c8a0 } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Cidade: duas lojas no calçadão (a Vento Sul, com o site velho, e a vizinha)
    lojasG = new THREE.Group(); K.scene.add(lojasG);
    [[LOJA_A, 'Vento Sul', '#ffe3ec', '#9b1d4a', 0xe0457b, 'building-small-a'], [LOJA_B, 'Moda Nova', '#e3fff4', '#0b6b49', 0x00bc7b, 'building-small-d']].forEach(([x, nome, fundo, cor, toldoCor, mod], i) => {
      const g = new THREE.Group(); g.position.set(x, G, LOJAS_Z); lojasG.add(g);
      K.modelo('kenney-cidade/' + mod, { escala: 5, pos: [0, 0, 0], pai: g });
      const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(toldoCor)); toldo.position.set(0, 2.55, 3.0); toldo.rotation.x = 0.25; g.add(toldo);
      const placa = K.placa(nome, { larg: 2.8, alt: 0.7, fundo, cor, borda: cor }); K.scene.remove(placa); placa.position.set(0, 3.15, 2.62); g.add(placa);
      if (i === 1) { fx.placaVizinha = placa; const s = K.m3d('sacola', { cor: 0x00bc7b }); K.scene.remove(s); s.position.set(1.0, 0, 2.9); s.scale.setScalar(1.3); g.add(s); }
    });
    K.lugar(lojasG); K.nomear('vitrine', lojasG); tudo.push(lojasG);
    cel = K.celular(); guarda(cel, 'celular', mais(CLIENTE_DE, [0.32, 1.05, 0.5]), 2.3);
    lupa = guarda(K.m3d('lupa', { tam: 1.1 }), 'lupa', mais(DAVI_RUA, [0.75, 1.35, 0.35]));
    placasG = new THREE.Group(); K.scene.add(placasG);
    placaSem = K.placa('Sem site', { larg: 1.6, alt: 0.55, fundo: '#ffffff', cor: '#b42318', borda: '#b42318' }); K.scene.remove(placaSem); placasG.add(placaSem); placaSem.position.set(-1.25, 0, 0);
    placaRuim = K.placa('Site ruim', { larg: 1.6, alt: 0.55, fundo: '#ffffff', cor: '#0b6b49', borda: '#0b6b49' }); K.scene.remove(placaRuim); placasG.add(placaRuim); placaRuim.position.set(1.25, 0, 0);
    guarda(placasG, 'placas', mais(DAVI_RUA, [0, 2.75, -0.4]));
    K.lugar(placaSem); K.lugar(placaRuim);

    // Home office
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    agenda = guarda(K.m3d('calendario'), 'agenda', [-1.95, 0.95, -0.3], 1.5);
    telefone = guarda(K.m3d('telefone_fixo'), 'telefone', [0.05, MESA_Y, -0.95], 1.5);
    ondas = K.ondas(0x2fb5a6, 4, 0.55);
    relogio = guarda(K.m3d('relogio_parede', { hora: 3 }), 'relogio', [-1.85, 2.45, -0.5], 2.1);
    telaHo = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaHo, 'tela', [-0.55, 1.6, 0.1]);
    balao = guarda(K.m3d('balao_chat'), 'balao', [0.55, 3.05, 0.35], 0.95);
    funil = K.painelMappoa(3, 1.87, { px: 1000 }); guarda(funil, 'funil', [-0.5, 2.05, -0.8]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Loja de roupas: um balcão baixo com o computador velho em cima; a dona do lado
    balcao = guarda(K.m3d('balcao', { l: 2.2, faixa: 0xe8537a, cor: 0xfaf5f0, tampo: 0xb07a48 }), null, [-0.45, 0, -0.35], 0.75);
    siteLoja = K.siteAntigoMappoa({ nome: 'BOUTIQUE VENTO SUL', ano: '2014' }); guarda(siteLoja, 'site_velho', [-0.6, 0.82, -0.35], 0.72);
    celDona = K.celular(); guarda(celDona, null, [0, 0, 0], 1.5);

    // Central do Mappoa
    logo = K.logoMappoa(1.75); guarda(logo, 'logo', [0.7, 1.65, -0.3]);
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [0.85, 1.6, 0.1]);

    // Palco da marca
    LOJAS.forEach((l, i) => { const cd = K.cartaoLeadMappoa(l); guarda(cd, 'cartoes', [0, 2, 0]); cartoes.push(cd); });
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.7, 1.65, 0.1]);
    siteMundo = K.siteAntigoMappoa({ nome: 'BOUTIQUE VENTO SUL', ano: '2014' }); guarda(siteMundo, 'site_velho', [1.15, 0, 0.35], 1.0);
    lupaRobo = guarda(K.m3d('lupa', { tam: 0.8 }), null, [-0.7, 1.9, 0.6]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      vizinho: e('Comprou no vizinho', 'verde'), designer: e('Web designer', 'azul'), zero: e('0 clientes', 'vermelho'),
      oferece: e('Oferecendo site', 'laranja'), jaTem: e('"A gente já tem site"', 'azul'), centenas: e('Centenas na cidade', 'vermelho'),
      ano: e('© 2014', 'laranja'), com: e('Com site', 'azul'), sem: e('Sem site', 'verde'), presta: e('Bom ou ruim?', 'laranja'),
      velho: e('Site desatualizado', 'vermelho'), presenca: e('Presença digital', 'azul'), feio: e('"Seu site é feio"', 'vermelho'), voce: e('Quem envia é você', 'azul'),
      comeco: e('Começo da conversa', 'verde'), precisam: e('Sites que precisam de você', 'azul')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo'); fx.errado2 = K.marca('errado'); fx.certo2 = K.marca('certo');
    fx.contador = K.contador();
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual tipo de empresa tem o pior site da sua cidade? <em>Comenta aí</em>');
    fx.festa = K.festa([1.15, 2.2, 0.8]);
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const pisca = (tc) => Math.floor(tc * 3) % 2 === 0;

  // O celular na orelha da dona (ela fica em DONA, virada pro meio da loja)
  const DONA = [0.95, 0, 0.25], OLHA_DONA = [0.1, 1.3, 4];
  function donaNoTelefone(tc, naOrelha) {
    ve(celDona);
    celDona.g.position.set(DONA[0] + 0.2, naOrelha ? 1.27 : 0.85, DONA[2] + 0.12);
    celDona.g.rotation.set(naOrelha ? 0 : -1.1, -0.5, naOrelha ? 0.3 : 0);
    void tc;
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o cliente na calçada com o celular grande mostrando o site velho; a loja vizinha à direita · MOSTRA: celular, cliente
      // CENÁRIO: a cidade de dia; carros e ônibus passando atrás (o K.cenario cuida)
      const tC = quando('construção', B, 0.55), tV = quando('vizinho', B, 0.88);
      ve(lojasG, cel);
      cel.tela.desenhar((c, w, h) => celularVelho(c, w, h, tc < tC || pisca(tc)), 'cel' + (tc < tC || pisca(tc)));
      // PERSONAGEM: começo dúvida olhando o celular · na palavra "vizinho": anda até a loja vizinha
      let pos = CLIENTE_DE;
      if (tc > tV) { pos = cliente.irPara(CLIENTE_DE, CLIENTE_ATE, K.clamp((tc - tV) / 0.9), tc, { olhar: [LOJA_B, 1.4, 2.5] }); }
      else { cliente.colocar(CLIENTE_DE, mais(CLIENTE_DE, [0.4, 1.0, 3])); if (tc > tC) cliente.reagir('bravo', tc - tC); else cliente.reagir('duvida', B.t); }
      // OBJETOS SE MEXENDO: o celular acompanha a mão dele e treme quando o site pisca
      const treme = tc > tC && tc < tV ? Math.sin(tc * 40) * 0.012 : 0;
      cel.g.position.set(pos[0] + 0.32 + treme, pos[1] + 1.05, pos[2] + 0.5); cel.g.rotation.set(-0.15, -0.25, 0);
      // EFEITOS VISUAIS: ✗ em cima do celular ("construção") · etiqueta verde em cima da vizinha ("vizinho")
      fx.et.vizinho.em([pos[0] + 0.9, pos[1] + 1.25, pos[2] + 0.3], tc - tV);
      // SONS: zap do site piscando · passos · ding da vizinha
      K.som('zap', tC, 0.5); K.som('passo', tV + 0.1, 0.5); K.som('passo', tV + 0.45, 0.5); K.som('ding', tV, 0.5);
      // CÂMERA: alvo o celular e o cliente · mergulho · aberto · frente · alto, topo livre
      K.filmar([cel.g.position.toArray(), cliente], 'mergulho', B.p, { plano: 'medio', lado: 'frente', altura: 'alto', espacoCima: 0.22, tam: 0.6 });
      const [x, y] = K.tela(mais(cel.g.position.toArray(), [0, 0.4, 0]));
      fx.errado.em({ tela: [x + 190, y - 30] }, tc - tC);
    },
    davi(B, tc) {
      // NA TELA: o Davi na frente da mesa; o monitor com o portfólio; a agenda vazia à esquerda · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.55), tN = quando('nenhum', B, 0.8);
      ve(comp, agenda);
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, K.clamp(B.p)), 'port' + Math.round(B.p * 30));
      K.entrar(agenda, 'gira', tc - tN, { dur: 0.4 });
      // PERSONAGEM: começo mostrando o monitor · na palavra "nenhum": triste
      menino.colocar([0.45, 0, -0.2], [0.3, 1.2, 4]);
      if (tc > tN) { menino.olharPara([-1.95, 1.4, -0.3]); menino.reagir('triste', tc - tN); } else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: "Web designer" · "0 clientes"
      fx.et.designer.em(mais(MONITOR, [0, 0.75, 0.3]), tc - tD);
      fx.et.zero.em([-1.95, 2.35, -0.2], tc - tN);
      K.som('whoosh', tN, 0.5); K.som('errado', tN + 0.1, 0.5);
      // CÂMERA: chegando · perto · esquerda · olho
      K.filmar([menino, comp], 'chegando', B.p, { plano: 'medio', lado: -30, altura: 'olho', obstaculos: false });
    },
    liga(B, tc) {
      // NA TELA: o Davi do lado da mesa com o telefone; as ondas saindo · MOSTRA: personagem, telefone
      const tL = quando('liga', B, 0.25), tJ = quando('lojas', B, 0.4), tO = quando('oferecendo', B, 0.75);
      ve(comp, telefone); K.entrar(telefone, 'sobe', tc - tL + 0.2, { dur: 0.35 });
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0.4), 'port12');
      if (tc > tJ) ondas.em(mais(telefone.position.toArray(), [0.3, 0.55, 0]), 0, tc - tJ, 2.2, 1.6);
      // PERSONAGEM: começo segurando o fone · na palavra "oferecendo": chamando
      menino.colocar([0.95, 0, -0.35], [0.05, 1.3, -0.95]);
      if (tc > tO) menino.reagir('chamando', tc - tO); else menino.reagir('segurando', B.t);
      fx.et.oferece.em([0.6, 2.6, -0.3], tc - tO);
      K.som('bip', tL, 0.4); K.som('bip', tJ, 0.3); K.som('bip', tJ + 0.4, 0.3);
      // CÂMERA: passando · médio · direita · olho
      K.filmar([telefone, menino], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho', obstaculos: false });
    },
    ja_tem(B, tc) {
      // NA TELA: a dona do lado do balcão com o celular na orelha; o computador velho piscando no balcão · MOSTRA: dona, site_velho
      const tT = quando('tem', B, 0.55), tD = quando('desliga', B, 0.88);
      ve(balcao, siteLoja); siteLoja.desatualizar(tc);
      donaNoTelefone(tc, tc < tD + 0.15);
      // PERSONAGEM: começo chamando (atende) · na palavra "desliga": brava
      dona.colocar(DONA, OLHA_DONA);
      if (tc > tD) dona.reagir('bravo', tc - tD); else if (tc > tT) { dona.olharPara([-0.6, 1.2, -0.35]); dona.reagir('mostrando', tc - tT); } else dona.reagir('chamando', B.t);
      fx.et.jaTem.em([0.2, 2.45, 0.2], tc - tT);
      K.som('desliga', tD, 0.6);
      // CÂMERA: descendo · médio · frente · alto
      K.filmar([dona, siteLoja], 'descendo', B.p, { plano: 'perto', lado: 'frente', altura: 'olho' });
      const [x, y] = K.tela([0.95, 1.85, 0.25]);
      fx.errado.em({ tela: [x, y - 90] }, tc - tD);
    },
    pergunta(B, tc) {
      // NA TELA: o Davi na calçada com a lupa; as placas "Sem site" e "Site ruim" acima · MOSTRA: personagem, placas
      const tP = quando('pergunta', B, 0.15), tN = quando('não', B, 0.35), tR = quando('ruim', B, 0.9);
      ve(lojasG, lupa, placasG);
      K.entrar(lupa, 'cai', tc - tP, { altura: 2.5 });
      lupa.rotation.z = Math.sin(tc * 2.2) * 0.12;
      K.entrar(placaSem, 'cai', tc - tN, { altura: 3 }); K.entrar(placaRuim, 'cai', tc - tR + 0.35, { altura: 3 });
      if (tc > tR) K.falhar(placaSem, 'tomba', tc - tR, { lado: -1 });
      // PERSONAGEM: começo ideia · na palavra "ruim": aponta a placa nova
      menino.colocar(DAVI_RUA, mais(DAVI_RUA, [0.6, 1.5, 4]));
      if (tc > tR) { menino.olharPara(mais(DAVI_RUA, [1.25, 2.75, -0.4])); menino.apontar(0.9); menino.humor('feliz'); } else menino.reagir('ideia', B.t);
      K.som('whoosh', tP, 0.5);
      // CÂMERA: subindo · aberto · esquerda · baixo
      K.filmar([menino, placasG], 'subindo', B.p, { plano: 'medio', lado: 'esquerda', altura: 'baixo' });
      const [ax, ay] = K.tela(mais(DAVI_RUA, [-1.25, 3.15, -0.4])), [bx, by] = K.tela(mais(DAVI_RUA, [1.25, 3.15, -0.4]));
      fx.errado.em({ tela: [ax, ay - 50] }, tc - tN); fx.certo.em({ tela: [bx, by - 50] }, tc - tR);
      K.som('certo', tR, 0.6);
    },
    na_mao(B, tc) {
      // NA TELA: o monitor de perto trocando de site velho; o Davi à direita com o celular · MOSTRA: monitor, personagem
      const tS = quando('site', B, 0.15), tC = quando('celular', B, 0.5), tR = quando('rodapé', B, 0.88);
      ve(comp, cel);
      const i = Math.min(2, Math.max(0, Math.floor((tc - tS) / Math.max(0.5, (tR - tS) / 3))));
      comp.tela.desenhar((c, w, h) => siteVelho(c, w, h, i, tc > tR, pisca(tc)), 'v' + i + (tc > tR) + pisca(tc));
      for (let k = 0; k < 3; k++) K.som('clique', tS + k * Math.max(0.5, (tR - tS) / 3), 0.5);
      // PERSONAGEM: começo pensando · "celular": segurando · "rodapé": surpreso
      const pos = [0.6, 0, -0.35];
      menino.colocar(pos, MONITOR);
      if (tc > tR) menino.reagir('surpreso', tc - tR); else if (tc > tC) menino.reagir('segurando', tc - tC); else menino.reagir('pensando', B.t);
      // o celular na mão dele, aparecendo na palavra "celular"
      cel.tela.desenhar((c, w, h) => celularVelho(c, w, h, pisca(tc)), 'cel' + pisca(tc));
      cel.g.position.set(pos[0] - 0.05, 1.05, pos[2] + 0.4); cel.g.rotation.set(-0.3, -0.7, 0); cel.g.scale.setScalar(1.8 * pop(tc - tC));
      fx.contador.em(String(i + 1), mais(MONITOR, [-0.75, 0.45, 0.2]), tc - tS, 'sites');
      fx.et.ano.em(mais(MONITOR, [0, -0.55, 0.35]), tc - tR);
      K.som('bip', tR, 0.5);
      // CÂMERA: chegando · perto · direita · olho
      K.filmar([MONITOR, menino], 'chegando', B.p, { plano: 'perto', lado: 28, altura: 'olho', tam: 1.1, obstaculos: false });
    },
    dez_sites(B, tc) {
      // NA TELA: de noite; o relógio girando na parede; o Davi cansado; o contador em 10 · MOSTRA: relogio, personagem
      const tT = quando('tarde', B, 0.2), tD = quando('dez', B, 0.4), tC = quando('centenas', B, 0.8), m = relogio.userData.m3d;
      ve(comp, relogio); K.entrar(relogio, 'gira', tc - tT, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => siteVelho(c, w, h, 1, true, true), 'v1n');
      const g = K.clamp((tc - tT) / (B.ate - tT)); m.m.rotation.z = -g * 22; m.h.rotation.z = -1.57 - g * 3.5;
      const n = Math.round(K.lerp(3, 10, K.clamp((tc - tD) / 0.6)));
      fx.contador.em(String(n), [-0.3, 2.7, 0.2], tc - B.inicio, 'sites');
      // PERSONAGEM: começo cansado · na palavra "centenas": susto
      menino.colocar([0.75, 0, 0.1], [-0.4, 1.3, 3]);
      if (tc > tC) menino.reagir('susto', tc - tC); else menino.reagir('cansado', B.t);
      fx.et.centenas.em([0.75, 2.15, 0.3], tc - tC);
      K.som('zumbido', tT, 0.5); K.som('estrondo', tC, 0.35);
      // CÂMERA: afastando · médio · frente · alto
      K.filmar([relogio, menino], 'afastando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo' });
    },
    busca(B, tc) {
      // NA TELA: a tela de busca subindo do monitor; o Davi digitando · MOSTRA: tela, personagem
      const tS = quando('site', B, 0.15), tL = quando('lojas', B, 0.6), tR = quando('Ribeirão', B, 0.85), tP = quando('Preto', B, 0.95);
      ve(comp, telaHo); K.entrar(telaHo.g, 'sobe', tc - tS, { dur: 0.5 });
      comp.tela.desenhar((c, w, h) => { c.fillStyle = '#f4f8fd'; c.fillRect(0, 0, w, h); }, 'claro');
      const dig = K.clamp((tc - tL) / Math.max(0.3, tR - tL));
      telaHo.mostrar('busca', { nicho: BUSCA.nicho, estado: BUSCA.estado, cidade: BUSCA.cidade, digitado: tc > tR ? 1 : Math.min(0.99, dig), apertado: tc > tP + 0.2 });
      // PERSONAGEM: começo segurando (digitando) · "Ribeirão": aponta a tela
      menino.colocar([1.25, 0, 0.8], [-0.55, 1.2, 0.1]);
      if (tc > tR) menino.apontar(0.7); else menino.reagir('segurando', B.t);
      K.som('clique', tL, 0.5); K.som('clique', tL + 0.2, 0.4); K.som('clique', tP + 0.2, 0.6);
      // CÂMERA: revelando · médio · esquerda · olho
      K.filmar([telaHo, menino], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    mappoa_rotulo(B, tc) {
      // NA TELA: o logo grande; o robô acenando · MOSTRA: logo, robo
      const tM = quando('Mappoa', B, 0.4);
      ve(logo, robo); logo.g.rotation.y = K.suave(K.clamp((tc - tM + 0.2) / 0.6)) * 6.283;
      robo.g.position.set(K.lerp(3.5, 2.3, K.suave(K.clamp(B.t / 0.5))), 0, 0.5); robo.g.rotation.y = -0.45; robo.em(tc, { acena: 1, mapa: false });
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.filmar([logo, robo], 'girando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', angulo: 16 });
    },
    separa(B, tc) {
      // NA TELA: o robô na frente do mapa; a tela de lista à direita; o Davi chegando · MOSTRA: robo, tela
      const tM = quando('mapa', B, 0.2), tL = quando('lojas', B, 0.35), tS = quando('separando', B, 0.55), tT = quando('tem', B, 0.7), tN = quando('não', B, 0.88);
      ve(robo, telaC); K.entrar(telaC.g, 'desliza', tc - tM, { de: [3, 0, 0], dur: 0.4 });
      const sem = tc > tN, n = Math.floor(K.clamp((tc - tL) / 1.0) * 5);
      telaC.mostrar('listaLojas', sem ? { grupo: 'SEM SITE', itens: SEM_SITE, n: 3 } : { grupo: 'COM SITE', itens: LOJAS, n });
      for (let k = 0; k < 5; k++) K.som('bip', tL + k * 0.2, 0.25);
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { mapa: true });
      // PERSONAGEM: anda até perto do robô · na palavra "não": surpreso
      if (tc > tS) {
        menino.irPara([-3.2, 0, 2.5], [-2.0, 0, 1.4], K.clamp((tc - tS) / 0.7), tc, { olhar: [0.85, 1.4, 0.1] });
        if (tc > tN) menino.reagir('surpreso', tc - tN);
      } else menino.g.visible = false;
      fx.et.com.em([0.85, 3.15, 0.2], tc - tT);
      if (tc > tN) fx.et.sem.em([0.85, 3.6, 0.2], tc - tN);
      K.som('ding', tN, 0.5);
      // CÂMERA: passando · médio · direita · olho
      K.filmar([robo, telaC], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },
    presta(B, tc) {
      // NA TELA: cinco cartões de lojas no ar, todos com "Site"; o Davi embaixo olhando pra cima · MOSTRA: cartoes, personagem
      const tS = quando('site', B, 0.2), tP = quando('presta', B, 0.85);
      cartoes.forEach((cd, i) => {
        const a = (i - 2) * 0.55, k = K.clamp((tc - tS - i * 0.08) / 0.45);
        if (k <= 0) return; ve(cd);
        const tr = tc > tP ? Math.sin(tc * 38 + i) * 0.04 : 0;
        cd.g.position.set(Math.sin(a) * 2.0 + tr, K.lerp(0.3, 2.35 + Math.cos(a) * 0.7, K.suave(k)), 0.2 - Math.cos(a) * 0.4);
        cd.g.rotation.set(0, -a * 0.6 + Math.sin(tc * 1.2 + i) * 0.08, 0); cd.g.scale.setScalar(k);
      });
      K.som('whoosh', tS, 0.5); K.som('range', tP, 0.5);
      // PERSONAGEM: começo surpreso · na palavra "presta": dúvida
      menino.colocar([0.2, 0, 1.4], [0, 2.4, 0]);
      if (tc > tP) menino.reagir('duvida', tc - tP); else menino.reagir('surpreso', B.t);
      fx.et.presta.em([0, 3.75, 0.2], tc - tP);
      // CÂMERA: mergulho · aberto · esquerda · alto
      K.filmar([[0, 2.2, 0.2], menino], 'mergulho', B.p, { plano: 'perto', lado: 'esquerda', altura: 'alto', tam: 2.6, obstaculos: false });
    },
    analise(B, tc) {
      // NA TELA: a tela de enriquecer; o robô passando a lupa; o Davi à direita · MOSTRA: tela, robo
      const tA = quando('análise', B, 0.12), tC = quando('completa', B, 0.3), tP = quando('presença', B, 0.55), tL = quando('loja', B, 0.92);
      ve(telaM, robo, lupaRobo); K.entrar(telaM.g, 'cai', tc - tA, { altura: 3 });
      telaM.mostrar('enriquecer', { tipo: tc > tC ? 2 : 1 });
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: 0.6, mapa: false });
      const v = K.clamp((tc - tP) / Math.max(0.5, B.ate - tP));
      lupaRobo.position.set(K.lerp(-1.3, -0.1, K.suave(v)), 1.9 + Math.sin(v * 6) * 0.25, 0.55);
      // PERSONAGEM: começo pensando · na palavra "loja": ideia
      menino.colocar([0.8, 0, 1.1], [-0.7, 1.5, 0.1]);
      fx.et.presenca.em([-0.7, 3.2, 0.3], tc - tP);
      if (tc > tL) menino.reagir('ideia', tc - tL); else menino.reagir('pensando', B.t);
      K.som('clique', tC, 0.6); K.som('zumbido', tP, 0.25);
      // CÂMERA: subindo · médio · direita · baixo
      K.filmar([telaM, robo], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    aponta(B, tc) {
      // NA TELA: a análise à esquerda com as dores; o computador velho piscando à direita · MOSTRA: tela, site_velho
      const tS = quando('site', B, 0.15), tM = quando('modelo', B, 0.45), tC = quando('construção', B, 0.9);
      ve(telaM, siteMundo, robo); K.entrar(siteMundo.g, 'cresce', tc - tS, { dur: 0.4 });
      if (tc > tC) K.falhar(siteMundo.g, 'pisca', tc - tC);
      siteMundo.desatualizar(tc > tC ? tc : 0);
      const dores = tc > tC ? ['Site com cara de modelo pronto', 'Site em construção'] : ['Site com cara de modelo pronto'];
      telaM.mostrar('analise', { nome: 'Boutique Vento Sul', ate: tc > tM ? 1 : 0, dores, aderencia: 0.86 });
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: 0, mapa: false });
      // PERSONAGEM: começo aponta · na palavra "construção": vitória
      menino.colocar([2.25, 0, 1.0], [1.15, 1.0, 0.35]);
      if (tc > tC) menino.reagir('vitoria', tc - tC); else menino.apontar(0.4);
      fx.et.velho.em([1.15, 1.95, 0.7], tc - tC);
      K.som('ding', tM, 0.5); K.som('ding', tC, 0.5); K.som('zap', tC + 0.1, 0.4);
      // CÂMERA: chegando · perto · esquerda · olho
      K.filmar([telaM, siteMundo], 'chegando', B.p, { plano: 'medio', lado: -12, altura: 'olho' });
    },
    feio(B, tc) {
      // NA TELA: a dona com o celular, ficando brava; o computador velho no balcão · MOSTRA: dona, site_velho
      const tF = quando('feio', B, 0.4), tH = quando('hora', B, 0.9);
      ve(balcao, siteLoja); siteLoja.desatualizar(tc);
      donaNoTelefone(tc, tc < tH);
      if (tc > tF) K.falhar(siteLoja.g, 'treme', tc - tF);
      // PERSONAGEM: começo surpresa · na palavra "feio": brava
      dona.colocar(DONA, OLHA_DONA);
      if (tc > tF) dona.reagir('bravo', tc - tF); else dona.reagir('surpreso', B.t);
      fx.et.feio.em([0.95, 2.35, 0.3], tc - tF);
      K.som('errado', tF, 0.5); K.som('desliga', tH, 0.6);
      // CÂMERA: chegando · perto · direita · baixo
      K.filmar([dona, siteLoja], 'chegando', B.p, { plano: 'perto', lado: 'direita', altura: 'baixo' });
      const [x, y] = K.tela([0.95, 2.0, 0.25]);
      fx.errado.em({ tela: [x - 200, y] }, tc - tH);
    },
    mensagem(B, tc) {
      // NA TELA: a tela de mensagem na frente do monitor; o Davi aperta o botão; o balão verde sobe · MOSTRA: tela, personagem
      const tMsg = quando('mensagem', B, 0.15), tJ = quando('jeito', B, 0.55), tE = quando('envia', B, 0.8), tV = quando('você', B, 0.95);
      ve(comp, telaHo); K.entrar(telaHo.g, 'sobe', tc - tMsg, { dur: 0.45 });
      telaHo.mostrar('mensagem', { para: 'Para: Boutique Vento Sul', texto: 'Oi! Vi que a página da loja de vocês ainda aparece em construção. Faço sites para lojas de roupa. Posso te mostrar uma ideia rápida?', digitado: K.clamp((tc - tMsg - 0.2) / Math.max(0.5, tJ - tMsg)) });
      ve(balao); balao.scale.setScalar(0.95 * pop(tc - tE)); balao.position.y = 3.05 + K.clamp(tc - tE) * 0.3;
      // PERSONAGEM: começo mostrando · "envia": empurrando (aperta) e depois vitória
      menino.colocar([1.1, 0, 0.85], [-0.55, 1, 0.1]);
      if (tc > tE + 0.4) menino.reagir('vitoria', tc - tE - 0.4); else if (tc > tE) menino.reagir('empurrando', tc - tE); else menino.reagir('mostrando', B.t);
      fx.et.voce.em([1.1, 2.3, 1.0], tc - tV);
      const [x, y] = K.tela([0.55, 3.3, 0.35]);
      fx.certo.em({ tela: [x + 120, y - 20] }, tc - tE);
      K.som('clique', tE, 0.7); K.som('ding', tE + 0.1, 0.7);
      // CÂMERA: girando · médio · frente · olho
      K.filmar([telaHo, menino], 'girando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', angulo: 22 });
    },
    comeco(B, tc) {
      // NA TELA: a dona lendo o celular e sorrindo; o balão verde chegando até ela · MOSTRA: dona, balao
      const tC = quando('conversa', B, 0.55), tB = quando('começo', B, 0.9);
      ve(balcao, siteLoja, balao); siteLoja.desatualizar(tc);
      donaNoTelefone(tc, false);
      const k = K.suave(K.clamp((tc - B.inicio) / Math.max(0.6, tC - B.inicio)));
      balao.position.set(K.lerp(-2.6, 0.55, k), 2.35 + Math.sin(tc * 4) * 0.05, 0.6); balao.scale.setScalar(0.85 * (tc > tB ? 1 + Math.sin((tc - tB) * 12) * 0.06 * K.clamp(1 - (tc - tB)) : 1));
      // PERSONAGEM: começo pensando (lendo) · na palavra "começo": ideia, sorrindo
      dona.colocar(DONA, [0.55, 2.0, 0.6]);
      if (tc > tB) { dona.reagir('ideia', tc - tB); dona.humor('feliz'); } else dona.reagir('pensando', B.t);
      fx.et.comeco.em([0.55, 3.05, 0.6], tc - tB);
      K.som('bip', tC, 0.5); K.som('certo', tB, 0.6);
      // CÂMERA: revelando · médio · esquerda · olho
      K.filmar([dona, [0.55, 2.35, 0.6]], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 1.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: antes, o Davi abaixando o fone; agora, o funil com as lojas e ele arrastando · MOSTRA: funil, personagem
      const tA = quando('Agora', B, 0.45), tS = quando('sabe', B, 0.65), tD = quando('dele', B, 0.95);
      if (tc < tA) {
        ve(comp, telefone); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0.4), 'port12');
        menino.colocar([0.95, 0, -0.35], [0.05, 1.3, -0.95]); menino.reagir('triste', B.t);
        K.som('desliga', B.inicio + 0.6, 0.4);
        K.filmar([telefone, menino], 'afastando', K.clamp((tc - B.inicio) / Math.max(0.5, tA - B.inicio)), { plano: 'medio', lado: 'esquerda', altura: 'alto' });
      } else {
        ve(funil); funil.mostrar('funil', { nome: 'LOJAS DO DAVI', itens: LOJAS, mover: K.clamp((tc - tS) / 0.9) });
        menino.colocar([1.25, 0, 0.9], [-0.5, 1.8, -0.8]);
        if (tc > tD) menino.reagir('vitoria', tc - tD); else menino.reagir('mostrando', tc - tA);
        fx.et.precisam.em([-0.5, 3.3, -0.5], tc - tD);
        K.som('certo', tD, 0.6);
        K.filmar([funil, menino], 'afastando', K.clamp((tc - tA) / (B.ate - tA)), { plano: 'aberto', lado: 'frente', altura: 'olho' });
      }
    },
    segue(B, tc) {
      // NA TELA: o Davi no computador; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Qual', B, 0.02), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.62), tTe = quando('testa', B, 0.86);
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
      ve(siteMundo, robo, lupaRobo); siteMundo.desatualizar(0);
      siteMundo.g.position.set(-0.45, 0, 0); siteMundo.g.scale.setScalar(1.7);
      robo.g.position.set(-2.5, 0, 1.0); robo.g.rotation.y = 0.6; robo.em(1, { mapa: false, acena: 0.5 });
      lupaRobo.position.set(-1.9, 1.6, 1.3);
      menino.colocar([1.35, 0, 1.0], [0.4, 1.4, 5]); menino.reagir('susto', 0.5);
      K.filmar([siteMundo, menino, robo], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'home_office');
    menino.g.visible = false; dona.g.visible = false; cliente.g.visible = false;
    tudo.forEach((g) => { g.visible = false; });
    ondas.esconder();
    siteMundo.g.position.set(1.15, 0, 0.35); siteMundo.g.scale.setScalar(1.0);
    cel.g.scale.setScalar(2.3);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
