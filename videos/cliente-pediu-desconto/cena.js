// Você mandou o orçamento do site. Se o cliente pediu desconto, ele não era o seu cliente (canal Mappoa).
// Seis cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  let bl, CS, menino, cliente, rua1, rua2, cachorro, robo, comp, cel, celRua, orcV, orcR, preco, relogio, lupa, lupaRobo, prancheta, balao;
  let petA, petB, placaSem, telaHo, telaC, telaM, telaMsg, funil, navG;
  const mudancas = [], tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'home_office', igor: 'home_office', de_graca: 'home_office', virada: 'sala_reuniao', sem_site: 'cidade',
    em_construcao: 'cidade', motivo: 'cidade', tarde: 'home_noite', lista: 'central_mappoa', analise: 'mundo_mappoa',
    antes_agora: 'home_office', segue: 'home_office', cartao: 'home_office', capa: 'home_office'
  };
  // Cidade: o calçadão fica em y = 0,14; as lojas a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, LOJA_A = -26.2, LOJA_B = -21, LOJAS_Z = -0.3;
  const RUA1_DE = [-25.4, G, 4.3], RUA1_ATE = [-22.4, G, 4.9];
  const RUA2_DE = [-21.4, G, 4.3], RUA2_ATE = [-18.8, G, 4.9];
  const IGOR_RUA = [-28.0, G, 4.7], IGOR_MEIO = [-23.6, G, 4.6];
  const CAO = [LOJA_A - 1.0, G, 3.5];
  // Home office: o computador do Igor na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33];
  const PETS = [
    { nome: 'Pet Amigo', end: 'Av. Rondon Pacheco, 410', chips: ['whats', 'tel', 'site'] },
    { nome: 'Pet Center Uberlândia', end: 'Av. João Naves, 1200', chips: ['whats', 'tel', 'site'] },
    { nome: 'Banho & Tosa Lulu', end: 'Rua Goiás, 88', chips: ['tel', 'site'] },
    { nome: 'Mundo Pet', end: 'Rua Tiradentes, 515', chips: ['whats', 'site'] },
    { nome: 'Casa do Bicho', end: 'Av. Getúlio Vargas, 33', chips: ['whats', 'tel', 'site'] }
  ];
  const SEM_SITE = [
    { nome: 'Bicho Feliz', end: 'Rua Santos Dumont, 77', chips: ['whats', 'tel'] },
    { nome: 'Pet da Vila', end: 'Av. Floriano Peixoto, 30', chips: ['whats'] },
    { nome: 'Au Au Pet Shop', end: 'Rua Duque de Caxias, 9', chips: ['tel'] }
  ];
  const MSG = 'Oi! Procurei o Pet Amigo e o site de vocês ainda aparece em construção. Faço sites para pet shops. Posso te mostrar uma ideia rápida?';

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }

  // ---------- Telas desenhadas ----------
  function portfolio(c, w, h, rola) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const y0 = -rola * 60;
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#ff8a5b'); d.addColorStop(1, '#2fb5a6');
    c.fillStyle = d; c.fillRect(0, y0, w, 92);
    c.fillStyle = '#fff'; c.font = '900 26px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Igor.web', 18, y0 + 34);
    c.font = '700 13px Montserrat, sans-serif'; c.fillText('Sites que trazem cliente', 18, y0 + 64);
    [['#7a4fd6', '#e7dcff'], ['#2f6fd6', '#d6e4ff'], ['#00bc7b', '#cdf3e4']].forEach(([a, b], i) => {
      const lw = (w - 44) / 3, x = 14 + i * (lw + 8);
      c.fillStyle = b; c.beginPath(); c.roundRect(x, y0 + 108, lw, 120, 10); c.fill();
      c.fillStyle = a; c.beginPath(); c.roundRect(x + 10, y0 + 118, lw - 20, 52, 6); c.fill();
      c.fillStyle = '#334155'; c.fillRect(x + 10, y0 + 182, lw - 30, 8); c.fillRect(x + 10, y0 + 198, lw - 44, 8);
    });
  }
  function entregue(c, w, h) {
    portfolio(c, w, h, 0);
    c.fillStyle = 'rgba(255,255,255,.88)'; c.fillRect(0, h * 0.3, w, h * 0.4);
    c.fillStyle = '#00bc7b'; c.beginPath(); c.arc(w / 2, h * 0.42, 22, 0, 7); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 6; c.beginPath(); c.moveTo(w / 2 - 10, h * 0.42); c.lineTo(w / 2 - 2, h * 0.42 + 8); c.lineTo(w / 2 + 12, h * 0.42 - 8); c.stroke();
    c.fillStyle = '#050d1c'; c.font = '900 22px Montserrat, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Site entregue', w / 2, h * 0.6);
  }
  // A conversa do WhatsApp: o orçamento enviado e os pedidos de desconto chegando (k: a última bolha subindo)
  const PEDIDOS = [['faz mais', 'barato?'], ['dá um', 'descontinho?'], ['o sobrinho faz', 'por menos']];
  function chat(c, w, h, n, k) {
    c.fillStyle = '#efe7dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#075e54'; c.fillRect(0, 0, w, 34);
    c.fillStyle = '#fff'; c.font = '800 15px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Cliente', 12, 18);
    c.fillStyle = '#d9fdd3'; c.beginPath(); c.roundRect(24, 44, w - 32, 56, 10); c.fill();
    c.fillStyle = '#111b21'; c.font = '800 14px Montserrat, sans-serif'; c.fillText('Orçamento:', 32, 60); c.fillText('site completo', 32, 80);
    c.fillStyle = '#34b7f1'; c.font = '900 12px Montserrat, sans-serif'; c.textAlign = 'right'; c.fillText('✓✓', w - 14, 90);
    for (let i = 0; i < n; i++) {
      const sobe = i === n - 1 ? (1 - K.suave(K.clamp(k))) * 40 : 0, op = i === n - 1 ? K.clamp(k * 2) : 1;
      const y = 112 + i * 62 + sobe, grande = i === 0 && n === 1;
      c.globalAlpha = op; c.fillStyle = '#fff'; c.beginPath(); c.roundRect(8, y, w - 34, grande ? 62 : 54, 10); c.fill();
      c.fillStyle = '#b42318'; c.font = (grande ? '900 18px' : '800 15px') + ' Montserrat, sans-serif'; c.textAlign = 'left';
      c.fillText(PEDIDOS[i][0], 16, y + (grande ? 20 : 17)); c.fillText(PEDIDOS[i][1], 16, y + (grande ? 44 : 38));
      c.globalAlpha = 1;
    }
  }
  // A busca no celular da rua: o concorrente aparece, o Bicho Feliz não
  function buscaRua(c, w, h, achou) {
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#f1f3f4'; c.beginPath(); c.roundRect(8, 10, w - 16, 34, 17); c.fill();
    c.fillStyle = '#202124'; c.font = '700 13px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('pet shop perto', 18, 27);
    if (!achou) return;
    c.fillStyle = '#e8f0fe'; c.beginPath(); c.roundRect(8, 58, w - 16, 92, 12); c.fill();
    c.fillStyle = '#1a0dab'; c.font = '900 17px Montserrat, sans-serif'; c.fillText('Pet Center', 16, 80);
    c.fillStyle = '#f9ab00'; c.font = '900 14px Montserrat, sans-serif'; c.fillText('★★★★★', 16, 104);
    c.fillStyle = '#1067f8'; c.beginPath(); c.roundRect(16, 118, 60, 22, 11); c.fill(); c.fillStyle = '#fff'; c.font = '800 12px Montserrat, sans-serif'; c.fillText('Site', 32, 129);
    c.fillStyle = '#9aa0a6'; c.font = '700 14px Montserrat, sans-serif'; c.fillText('Bicho Feliz', 16, 176); c.font = '600 12px Montserrat, sans-serif'; c.fillText('sem site', 16, 196);
  }
  function siteVelhoCel(c, w, h, pisca) {
    c.fillStyle = '#c0c0c0'; c.fillRect(0, 0, w, h); c.fillStyle = '#006400'; c.fillRect(0, 0, w, 40);
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '700 15px "Times New Roman", serif'; c.fillStyle = '#ffff00'; c.fillText('PET AMIGO', w / 2, 21);
    c.font = '700 22px "Times New Roman", serif'; c.fillStyle = '#b00020'; c.fillText('Bem-vindo!', w / 2, 74);
    c.fillStyle = pisca ? '#ffd400' : '#b8a000'; c.fillRect(8, 110, w - 16, 78);
    c.font = '900 20px "Courier New", monospace'; c.fillStyle = '#000'; c.fillText('SITE EM', w / 2, 136); c.fillText('CONSTRUÇÃO', w / 2, 164);
  }
  function mapaPinos(c, w, h, n) {
    c.fillStyle = '#e8efe6'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#fff'; c.lineWidth = 10; [[0, h * 0.35, w, h * 0.25], [0, h * 0.75, w, h * 0.8], [w * 0.3, 0, w * 0.2, h], [w * 0.75, 0, w * 0.85, h]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); });
    const P = [[0.15, 0.5], [0.45, 0.55], [0.62, 0.32], [0.88, 0.6], [0.38, 0.88], [0.6, 0.7]];
    P.forEach(([x, y], i) => { c.beginPath(); c.arc(x * w, y * h, 8, 0, 7); c.fillStyle = i === n ? '#1067f8' : '#ea4335'; c.fill(); });
    c.fillStyle = '#fff'; c.beginPath(); c.roundRect(10, 8, w - 20, 30, 15); c.fill();
    c.fillStyle = '#202124'; c.font = '700 13px Montserrat, sans-serif'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('pet shop em Uberlândia', 22, 23, w - 40);
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['home_office', ['home_office', { hora: 'noite' }, 'home_noite'], 'sala_reuniao', 'cidade', 'central_mappoa', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A lista sem o número da captura no topo (esta busca não é uma captura de verdade)
    T.listaPets = (c, w, h, e) => {
      T.lista(c, w, h, e);
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      c.font = '700 21px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Pet shops · Uberlândia, MG', 36, 168, w - 72);
      c.fillStyle = '#fff'; c.fillRect(w - 110, 206, 92, 34);
    };
    // A análise com o score escrito do lado da barra de aderência
    T.analiseScore = (c, w, h, e) => {
      T.analise(c, w, h, e);
      if (e.score == null) return;
      c.fillStyle = '#fff'; c.fillRect(w - 150, 200, 128, 32);
      c.font = '900 28px Montserrat, sans-serif'; c.fillStyle = M.azul; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText(Math.round(e.score) + '/100', w - 38, 216);
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Igor (do canal), o cliente do desconto, duas pessoas na rua e o cachorro do pet shop
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    cliente = K.boneco({ roupa: 'moletom', cores: { moletom: 0x8a8f98, punho: 0x6b7079, calca: 0x2f3540, mochila: 0x596571, cabelo: 0x3a2414, pele: 0xf0c8a0 } });
    K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    rua1 = K.boneco({ roupa: 'moletom', cores: { moletom: 0x3f9b5a, punho: 0x2f7a45, calca: 0x2f3540, mochila: 0x596571, cabelo: 0x1a1210, pele: 0xc98f62 } });
    K.semNome(rua1.g); K.nomear('rua1', rua1.g);
    rua2 = K.boneco({ roupa: 'moletom', cores: { moletom: 0x7a4fd6, punho: 0x5b3aa8, calca: 0x2f3540, mochila: 0x596571, cabelo: 0x8a5a2b, pele: 0xf0c8a0 } });
    K.semNome(rua2.g); K.nomear('rua2', rua2.g);
    cachorro = K.cachorro(); K.nomear('cachorro', cachorro.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Home office
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    cel = K.celular(); guarda(cel, 'celular', [-0.2, 1.6, 0.6], 5.5);
    orcV = guarda(K.placa('ORÇAMENTO', { larg: 1.3, alt: 0.5, fundo: '#00bc7b', cor: '#ffffff', borda: '#ffffff' }), 'orcamento', [0.85, 1.75, 0.6]);
    orcR = guarda(K.placa('DESCONTO', { larg: 1.3, alt: 0.5, fundo: '#e8352b', cor: '#ffffff', borda: '#ffffff' }), 'orcamento', [0.85, 1.45, 0.6]);
    [['Muda a cor', [-1.4, 2.15, -0.95]], ['Mais uma página', [-0.45, 2.75, -1.0]], ['Troca a foto', [0.5, 2.2, -0.95]]].forEach(([t, p]) => {
      mudancas.push(guarda(K.placa(t, { larg: 1.0, alt: 0.4, fundo: '#ffe066', cor: '#3a2a00', borda: '#d9a400' }), 'mudancas', p));
    });
    relogio = guarda(K.m3d('relogio_parede', { hora: 3 }), 'relogio', [-1.85, 2.45, -0.5], 2.1);
    lupa = guarda(K.m3d('lupa', { tam: 1.0 }), 'lupa', [0.2, 1.4, -0.2]);
    telaHo = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaHo, 'tela', [-0.55, 1.6, 0.1]);
    balao = guarda(K.m3d('balao_chat'), 'balao', [0.55, 3.05, 0.35], 0.95);
    funil = K.painelMappoa(3, 1.87, { px: 1000 }); guarda(funil, 'funil', [-0.5, 2.05, -0.8]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Sala de reunião: a placa "PREÇO" em pé na mesa
    preco = guarda(K.placa('PREÇO', { larg: 1.4, alt: 0.6, fundo: '#e8352b', cor: '#ffffff', borda: '#ffffff' }), 'preco', [0.0, 1.1, -1.85]);

    // Cidade: dois pet shops no calçadão (o Bicho Feliz sem site e o Pet Amigo com o site em construção)
    const loja = (x, nome, fundo, cor, toldoCor, mod) => {
      const g = new THREE.Group(); g.position.set(x, G, LOJAS_Z); K.scene.add(g);
      K.modelo('kenney-cidade/' + mod, { escala: 5, pos: [0, 0, 0], pai: g });
      const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(toldoCor)); toldo.position.set(0, 2.55, 3.0); toldo.rotation.x = 0.25; g.add(toldo);
      const placa = K.placa(nome, { larg: 2.8, alt: 0.7, fundo, cor, borda: cor }); K.scene.remove(placa); placa.position.set(0, 3.15, 2.62); g.add(placa);
      return g;
    };
    petA = loja(LOJA_A, 'Bicho Feliz', '#fff4dc', '#9a5b00', 0xf59e0b, 'building-small-a'); guarda(petA, 'pet_sem');
    petB = loja(LOJA_B, 'Pet Amigo', '#e3fff4', '#0b6b49', 0x00bc7b, 'building-small-d'); guarda(petB, 'pet_ruim');
    placaSem = guarda(K.placa('Sem site', { larg: 1.4, alt: 0.5, fundo: '#ffffff', cor: '#b42318', borda: '#b42318' }), null, [LOJA_A, G + 3.95, 2.35]);
    celRua = K.celular(); guarda(celRua, 'cel_rua', mais(RUA1_DE, [0.32, 1.05, 0.5]), 2.3);
    prancheta = guarda(K.m3d('lista_check'), 'prancheta', mais(IGOR_MEIO, [0.4, 0.75, 0.35]), 0.9);

    // Central e palco do Mappoa
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [0.85, 1.6, 0.1]);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    telaMsg = K.painelMappoa(1.2, 2.0, { px: 700 }); guarda(telaMsg, 'mensagem', [1.3, 1.45, 0.3]);
    lupaRobo = guarda(K.m3d('lupa', { tam: 0.8 }), null, [-1.2, 1.9, 0.6]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      designer: e('Web designer', 'azul'), barato: e('"Faz mais barato?"', 'vermelho'), graca: e('De graça', 'vermelho'),
      gasto: e('Site é gasto', 'vermelho'), concorrente: e('Achou o concorrente', 'laranja'), resolve: e('Resolve o problema', 'azul'),
      tarde: e('A tarde inteira', 'vermelho'), com: e('Com site', 'azul'), sem: e('Sem site', 'verde'),
      voce: e('Quem envia é você', 'azul'), precisa: e('Quem precisa de você', 'verde')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo'); fx.certo2 = K.marca('certo');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Desconto é culpa do cliente ou de quem escolheu ele? <em>Comenta aí</em>');
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const pisca = (tc) => Math.floor(tc * 3) % 2 === 0;

  const P = {
    gancho(B, tc) {
      // NA TELA: o celular gigante com a conversa; a placa ORÇAMENTO à direita; o Igor atrás, à esquerda · MOSTRA: celular, orcamento, personagem
      // CENÁRIO: home office de dia (o K.cenario cuida)
      const tD = quando('desconto', B, 0.6), tN = quando('não', B, 0.78);
      ve(comp, cel, orcV); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      // ENTRA AGORA: a bolha "faz mais barato?" sobe na palavra "desconto"
      const n = tc > tD ? 1 : 0, k = K.clamp((tc - tD) / 0.35);
      cel.tela.desenhar((c, w, h) => chat(c, w, h, n, k), 'chat' + n + Math.round(k * 10));
      // OBJETOS SE MEXENDO: o celular vibra em "desconto"; a placa encolhe e desce; em "não" vira DESCONTO
      const vib = tc > tD && tc < tD + 0.6 ? Math.sin(tc * 70) * 0.02 : 0;
      cel.g.position.set(-0.2 + vib, 1.6, 0.6);
      const enc = K.suave(K.clamp((tc - tD) / 0.8));
      orcV.scale.setScalar(K.lerp(1, 0.55, enc)); orcV.position.y = K.lerp(1.75, 1.4, enc);
      if (tc > tN) { orcV.visible = false; ve(orcR); orcR.scale.setScalar(0.8 * pop(tc - tN)); }
      // PERSONAGEM: começo segurando (estica a mão pro celular) · na palavra "desconto": susto
      menino.colocar([-1.15, 0, 0.0], [-0.2, 1.4, 3]);
      if (tc > tD) menino.reagir('susto', tc - tD); else menino.reagir('segurando', B.t);
      // SONS: bip da notificação · zumbido da vibração · desliga da placa encolhendo · errado em "não"
      K.som('bip', tD, 0.6); K.som('zumbido', tD + 0.05, 0.35); K.som('desliga', tD + 0.3, 0.4); K.som('errado', tN, 0.5);
      // CÂMERA: chegando · médio · frente · olho, topo livre
      K.filmar([[-0.2, 1.6, 0.6], [0.85, 1.6, 0.6], menino], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.3, obstaculos: false });
      const [x, y] = K.tela([0.85, 1.85, 0.6]);
      fx.errado.em({ tela: [x + 40, y - 110] }, tc - tN);
    },
    igor(B, tc) {
      // NA TELA: o Igor na frente da mesa com o celular; o monitor com o portfólio · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.3), tP = quando('proposta', B, 0.5), tI = quando('igual', B, 0.7), tB = quando('barato', B, 0.92);
      ve(comp, cel);
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, K.clamp(B.p)), 'port' + Math.round(B.p * 30));
      // ENTRA AGORA: as bolhas "dá um descontinho?" (proposta) e "o sobrinho faz por menos" (igual)
      const n = tc > tI ? 3 : tc > tP ? 2 : 1, tUlt = n === 3 ? tI : n === 2 ? tP : B.inicio - 1, k = K.clamp((tc - tUlt) / 0.35);
      cel.tela.desenhar((c, w, h) => chat(c, w, h, n, k), 'chat' + n + Math.round(k * 10));
      // PERSONAGEM: começo mostrando o monitor · na palavra "igual": bravo, olhando o celular
      const pos = [0.45, 0, -0.2];
      menino.colocar(pos, [0.3, 1.2, 4]);
      if (tc > tI) { menino.reagir('bravo', tc - tI); } else menino.reagir('mostrando', B.t);
      const vib = (tc > tP && tc < tP + 0.4) || (tc > tI && tc < tI + 0.4) ? Math.sin(tc * 70) * 0.012 : 0;
      cel.g.scale.setScalar(1.8); cel.g.position.set(pos[0] + 0.3 + vib, 1.05, pos[2] + 0.42); cel.g.rotation.set(-0.25, 0.25, 0);
      // EFEITOS VISUAIS: "Web designer" · "Faz mais barato?"
      fx.et.designer.em(mais(MONITOR, [0, 0.75, 0.3]), tc - tD);
      fx.et.barato.em([0.6, 2.25, 0.1], tc - tB);
      K.som('bip', tP, 0.5); K.som('bip', tI, 0.5); K.som('errado', tB, 0.5);
      // CÂMERA: passando · médio · esquerda · olho
      K.filmar([menino, comp], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', obstaculos: false });
    },
    de_graca(B, tc) {
      // NA TELA: o monitor com "Site entregue"; a placa do orçamento pequena; os bilhetes de mudança; o Igor cansado · MOSTRA: monitor, mudancas, personagem
      const tB = quando('baixa', B, 0.12), tE = quando('entrega', B, 0.35), tM = quando('mudança', B, 0.65), tG = quando('graça', B, 0.9);
      ve(comp, orcV);
      if (tc > tE) comp.tela.desenhar(entregue, 'entregue'); else comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0.3), 'port9');
      // OBJETOS SE MEXENDO: a placa encolhe mais em "baixa"
      orcV.position.set(-1.45, 1.35, -0.85); orcV.scale.setScalar(K.lerp(0.5, 0.28, K.suave(K.clamp((tc - tB) / 0.5))));
      // ENTRA AGORA: os bilhetes caem um a um a partir de "mudança"
      mudancas.forEach((m, i) => { ve(m); K.entrar(m, 'cai', tc - tM - i * 0.2, { altura: 1.6 }); if (tc > tM + i * 0.2) K.som('tampa', tM + i * 0.2, 0.4); });
      // PERSONAGEM: começo empurrando (aperta enter) · na palavra "graça": cansado
      menino.colocar([0.95, 0, -0.3], MONITOR);
      if (tc > tG) { menino.reagir('cansado', tc - tG); menino.suar(tc - tG); } else menino.reagir('empurrando', B.t);
      fx.et.graca.em([0.95, 2.35, 0.1], tc - tG);
      K.som('desliga', tB, 0.4); K.som('ding', tE, 0.5);
      // CÂMERA: afastando · perto · direita · baixo
      K.filmar([MONITOR, [-0.45, 2.75, -1.0], menino], 'afastando', B.p, { plano: 'medio', lado: 30, altura: 'olho', tam: 1.4, obstaculos: false });
    },
    virada(B, tc) {
      // NA TELA: a sala de reunião; a placa PREÇO na mesa; o cliente de braço cruzado; o Igor à esquerda · MOSTRA: cliente, preco, personagem
      // CENÁRIO: a sala de reunião, a TV com o gráfico e a mesa comprida (o cenário cuida)
      const tP = quando('preço', B, 0.35), tQ = quando('quem', B, 0.5), tG = quando('gasto', B, 0.92);
      ve(preco);
      // OBJETOS SE MEXENDO: a placa tomba pra trás na palavra "preço"
      if (tc > tP) K.falhar(preco, 'tomba', tc - tP, { lado: -1 });
      // PERSONAGEM: começo dúvida olhando a placa · na palavra "quem": ideia e aponta o cliente. O cliente: bravo
      menino.colocar([-1.3, 0, -0.55], [0, 1.2, -1.85]);
      if (tc > tQ) { menino.olharPara([1.3, 1.3, -0.6]); if (tc > tQ + 0.5) menino.apontar(0.5); else menino.reagir('ideia', tc - tQ); } else menino.reagir('duvida', B.t);
      cliente.colocar([1.3, 0, -0.6], [-0.4, 1.3, 3]); cliente.reagir('bravo', B.t);
      fx.et.gasto.em([1.3, 2.25, -0.4], tc - tG);
      K.som('ding', tQ, 0.5); K.som('errado', tG, 0.5);
      // CÂMERA: girando · médio · direita · olho
      K.filmar([cliente, preco, menino], 'girando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho', angulo: 18 });
      const [x, y] = K.tela([0, 1.45, -1.85]);
      fx.errado.em({ tela: [x - 170, y] }, tc - tP);
    },
    sem_site(B, tc) {
      // NA TELA: o pet shop Bicho Feliz com "Sem site"; o cachorro na porta; quem procura no celular vai pro concorrente; o Igor à esquerda · MOSTRA: pet_sem, rua1, personagem
      // CENÁRIO: a cidade de dia; carros e ônibus passando (o K.cenario cuida)
      const tS = quando('sem', B, 0.3), tPr = quando('procura', B, 0.55), tC = quando('concorrente', B, 0.88);
      ve(petA, placaSem, celRua);
      K.entrar(placaSem, 'cai', tc - tS, { altura: 2 });
      cachorro.g.visible = true; cachorro.em(CAO, tc, { rumo: 1.4, chao: G, cara: tc > tC ? 'pidao' : 'feliz', abana: tc > tC ? 0 : 1 });
      // OBJETOS SE MEXENDO: a busca aparece em "procura"; em "concorrente" o cliente vira e vai embora pra direita
      celRua.tela.desenhar((c, w, h) => buscaRua(c, w, h, tc > tPr), 'busca' + (tc > tPr));
      let pos = RUA1_DE;
      if (tc > tC) pos = rua1.irPara(RUA1_DE, RUA1_ATE, K.clamp((tc - tC) / 1.0), tc, { olhar: [LOJA_B + 4, 1.4, 5] });
      else { rua1.colocar(RUA1_DE, mais(RUA1_DE, [0.4, 1.0, 3])); rua1.reagir('duvida', B.t); }
      celRua.g.scale.setScalar(2.3); celRua.g.position.set(pos[0] + 0.32, pos[1] + 1.05, pos[2] + 0.5); celRua.g.rotation.set(-0.15, -0.25, 0);
      // PERSONAGEM: o Igor · começo pensando · na palavra "concorrente": aponta o cliente indo embora
      menino.colocar(IGOR_RUA, mais(IGOR_RUA, [1.5, 1.2, 3]));
      if (tc > tC) { menino.olharPara(mais(pos, [0, 1.2, 0])); menino.apontar(0.4); } else menino.reagir('pensando', B.t);
      fx.et.concorrente.em(mais(pos, [0, 2.2, 0]), tc - tC);
      K.som('baque', tS + 0.35, 0.5); K.som('clique', tPr, 0.5); K.som('passo', tC + 0.1, 0.5); K.som('passo', tC + 0.45, 0.5);
      // CÂMERA: revelando · aberto · esquerda · alto
      K.filmar([[LOJA_A, G + 2.2, 2.4], RUA1_DE, menino], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 3.2 });
    },
    em_construcao(B, tc) {
      // NA TELA: o Pet Amigo; quem está na frente segura o celular piscando "SITE EM CONSTRUÇÃO"; o Igor à esquerda · MOSTRA: cel_rua, rua2
      const tC = quando('construção', B, 0.4), tS = quando('sai', B, 0.9);
      ve(petB, celRua);
      celRua.tela.desenhar((c, w, h) => siteVelhoCel(c, w, h, tc < tC || pisca(tc)), 'velho' + (tc < tC || pisca(tc)));
      // OBJETOS SE MEXENDO: em "sai", o celular desce e ele anda pra direita
      let pos = RUA2_DE;
      if (tc > tS) pos = rua2.irPara(RUA2_DE, RUA2_ATE, K.clamp((tc - tS) / 1.0), tc, { olhar: [LOJA_B + 6, 1.4, 5] });
      else { rua2.colocar(RUA2_DE, mais(RUA2_DE, [0.4, 1.0, 3])); if (tc > tC) rua2.reagir('bravo', tc - tC); else rua2.reagir('duvida', B.t); }
      celRua.g.scale.setScalar(2.6); celRua.g.position.set(pos[0] + 0.32, pos[1] + 1.1 - (tc > tS ? K.clamp(tc - tS) * 0.3 : 0), pos[2] + 0.5); celRua.g.rotation.set(-0.1, -0.2, 0);
      // PERSONAGEM: o Igor · começo surpreso · na palavra "sai": mostrando ("viu?")
      menino.colocar([-23.0, G, 4.9], [-21.5, 1.2, 8]);
      if (tc > tS) menino.reagir('mostrando', tc - tS); else menino.reagir('surpreso', B.t);
      K.som('zap', tC, 0.5); K.som('passo', tS + 0.1, 0.5);
      // CÂMERA: chegando · perto · frente · olho
      K.filmar([[RUA2_DE[0] + 0.32, G + 1.1, RUA2_DE[2] + 0.5], rua2], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.2 });
      const [x, y] = K.tela([RUA2_DE[0] + 0.32, G + 1.6, RUA2_DE[2] + 0.5]);
      fx.errado.em({ tela: [x + 180, y] }, tc - tS);
    },
    motivo(B, tc) {
      // NA TELA: os dois pet shops lado a lado; o Igor no meio com a prancheta; o cachorro comemorando · MOSTRA: pet_sem, pet_ruim, personagem
      const tM = quando('motivo', B, 0.2), tPg = quando('pagar', B, 0.38), tR = quando('resolve', B, 0.7), tPr = quando('problema', B, 0.85);
      ve(petA, petB, placaSem, prancheta);
      cachorro.g.visible = true; cachorro.em(CAO, tc, { rumo: 1.4, chao: G, cara: 'feliz', abana: 1, pula: tc > tPg ? 1 : 0 });
      // PERSONAGEM: anda pra frente · começo segurando a prancheta · na palavra "resolve": vitória
      const pos = menino.irPara(mais(IGOR_MEIO, [0, 0, -0.6]), IGOR_MEIO, K.clamp(B.p / 0.4), tc, { olhar: mais(IGOR_MEIO, [0, 1.2, 4]) });
      if (B.p > 0.4) { if (tc > tR) menino.reagir('vitoria', tc - tR); else menino.reagir('segurando', tc - tM); }
      prancheta.position.set(pos[0] + 0.38, pos[1] + 0.8, pos[2] + 0.32); prancheta.scale.setScalar(0.9 * pop(tc - tM));
      fx.et.resolve.em(mais(IGOR_MEIO, [0, 2.3, 0]), tc - tPr);
      K.som('certo', tPg, 0.6); K.som('ding', tPr, 0.5);
      // CÂMERA: afastando · aberto · frente · baixo
      K.filmar([[LOJA_A, G + 3.0, 2.4], [LOJA_B, G + 3.0, 2.4], menino], 'subindo', B.p, { plano: 'aberto', lado: 'frente', altura: 'baixo', tam: 4.5 });
      const [ax, ay] = K.tela([LOJA_A, G + 3.9, 2.5]), [bx, by] = K.tela([LOJA_B, G + 3.9, 2.5]);
      fx.certo.em({ tela: [ax, ay - 70] }, tc - tPg); fx.certo2.em({ tela: [bx, by - 70] }, tc - tPg - 0.15);
    },
    tarde(B, tc) {
      // NA TELA: de noite; o relógio girando; o Igor com a lupa no mapa do monitor · MOSTRA: relogio, personagem, monitor
      const tA = quando('achar', B, 0.1), tU = quando('um', B, 0.25), tL = quando('leva', B, 0.55), tT = quando('tarde', B, 0.75), m = relogio.userData.m3d;
      ve(comp, relogio, lupa); K.entrar(relogio, 'gira', tc - tA, { dur: 0.4 });
      const pino = Math.min(5, Math.max(0, Math.floor((tc - tU) / 0.4)));
      comp.tela.desenhar((c, w, h) => mapaPinos(c, w, h, pino), 'mapa' + pino);
      for (let k = 0; k < 4; k++) K.som('clique', tU + k * 0.4, 0.3);
      const g = K.clamp((tc - tL) / Math.max(0.5, B.ate - tL)); m.m.rotation.z = -g * 22; m.h.rotation.z = -1.57 - g * 3.5;
      // PERSONAGEM: começo pensando com a lupa · na palavra "tarde": cansado
      const pos = [0.55, 0, -0.35];
      menino.colocar(pos, MONITOR);
      if (tc > tT) menino.reagir('cansado', tc - tT); else menino.reagir('pensando', B.t);
      lupa.position.set(pos[0] - 0.35 + Math.sin(tc * 3) * 0.08, 1.45, pos[2] + 0.2); lupa.scale.setScalar(pop(tc - tU));
      fx.et.tarde.em([0.55, 2.3, 0.1], tc - tT);
      K.som('zumbido', tL, 0.5);
      // CÂMERA: subindo · médio · esquerda · baixo
      K.filmar([relogio, menino, comp], 'subindo', B.p, { plano: 'medio', lado: -15, altura: 'baixo', obstaculos: false });
    },
    lista(B, tc) {
      // NA TELA: a lista do Mappoa já pronta; o robô com o mapa; o Igor chegando · MOSTRA: tela, robo
      // CENÁRIO: a central, o mapa gigante com pontos brilhando (o cenário cuida)
      const tM = quando('Mappoa', B, 0.15), tP = quando('pet', B, 0.45), tS = quando('separados', B, 0.7), tC = quando('com', B, 0.8), tN = quando('sem', B, 0.9);
      ve(robo, telaC);
      // ENTRA AGORA: a lista pronta desde o começo; os cartões descem a partir de "pet"; em "sem" troca pro grupo SEM SITE
      const sem = tc > tN, n = 2 + Math.floor(K.clamp((tc - tP) / 1.0) * 3);
      telaC.mostrar('listaPets', sem ? { grupo: 'SEM SITE', itens: SEM_SITE, n: 3 } : { grupo: 'COM SITE', itens: PETS, n });
      for (let k = 0; k < 3; k++) K.som('bip', tP + k * 0.33, 0.25);
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { mapa: true, acena: tc < tP ? 1 : 0 });
      // PERSONAGEM: anda da direita · começo surpreso · na palavra "separados": aponta a tela
      menino.irPara([3.2, 0, 2.4], [2.1, 0, 1.4], K.clamp(B.t / 0.8), tc, { olhar: [0.85, 1.4, 0.1] });
      if (tc > tS) menino.apontar(0.6); else if (B.t > 0.8) menino.reagir('surpreso', B.t - 0.8);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      if (!sem) fx.et.com.em([0.85, 3.15, 0.2], tc - tC); else fx.et.sem.em([0.85, 3.15, 0.2], tc - tN);
      K.som('ding', tN, 0.5);
      // CÂMERA: revelando · médio · direita · olho
      K.filmar([robo, telaC], 'revelando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },
    analise(B, tc) {
      // NA TELA: a análise do Pet Amigo enchendo; o robô com a lupa; a mensagem pronta deslizando · MOSTRA: tela, mensagem, robo
      const tA = quando('analisa', B, 0.08), tS = quando('score', B, 0.25), tD = quando('dores', B, 0.45), tO = quando('oportunidades', B, 0.58), tOb = quando('objeções', B, 0.72), tMs = quando('mensagem', B, 0.88);
      ve(telaM, robo, lupaRobo); K.entrar(telaM.g, 'cai', tc - tA, { altura: 3 });
      const ate = tc > tOb ? 3 : tc > tO ? 2 : tc > tD ? 1 : 0, sc = K.suave(K.clamp((tc - tS) / 0.6));
      telaM.mostrar('analiseScore', {
        nome: 'Pet Amigo', ate, aderencia: Math.max(0.001, 0.91 * sc), score: tc > tS ? 91 * sc : null,
        dores: ['Presença digital fraca', 'Site em construção'], oportunidades: ['Site novo com agendamento online'], objecoes: ['"Site é caro"']
      });
      [tS, tD, tO, tOb].forEach((t) => K.som('ding', t, 0.4));
      // a mensagem pronta desliza da direita
      if (tc > tMs) { ve(telaMsg); K.entrar(telaMsg.g, 'desliza', tc - tMs, { de: [2.5, 0, 0], dur: 0.35 }); telaMsg.mostrar('mensagem', { para: 'Para: Pet Amigo', texto: MSG, digitado: K.clamp((tc - tMs) / 0.6) }); }
      K.som('whoosh', tMs, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: 0, mapa: false });
      const v = K.clamp((tc - tS) / Math.max(0.5, tMs - tS));
      lupaRobo.position.set(-1.25 + Math.sin(tc * 3) * 0.1, K.lerp(2.5, 1.0, v), 0.55);
      // PERSONAGEM: à direita · começo pensando · na palavra "mensagem": ideia
      menino.colocar([2.5, 0, 1.3], [0.4, 1.5, 0.1]);
      if (tc > tMs) menino.reagir('ideia', tc - tMs); else menino.reagir('pensando', B.t);
      // CÂMERA: chegando · médio · frente · baixo
      K.filmar([telaM, [1.3, 1.45, 0.3], robo], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo' });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) o Igor aperta "Enviar pelo WhatsApp" e o balão sobe; (2) "Antes": o celular com "faz mais barato?" e o cliente; (3) "Agora": o funil · MOSTRA: funil, personagem
      const tE = quando('envia', B, 0.15), tA = quando('Antes', B, 0.3), tG = quando('Agora', B, 0.62), tC = quando('chega', B, 0.72), tP = quando('precisa', B, 0.88);
      if (tc < tA) {
        ve(comp, telaHo); telaHo.mostrar('mensagem', { para: 'Para: Pet Amigo', texto: MSG, digitado: 1 });
        ve(balao); balao.scale.setScalar(0.95 * pop(tc - tE)); balao.position.set(0.55, 3.05 + K.clamp(tc - tE) * 0.3, 0.35);
        menino.colocar([1.1, 0, 0.85], [-0.55, 1, 0.1]);
        if (tc > tE) menino.reagir('empurrando', tc - tE); else menino.reagir('mostrando', B.t);
        fx.et.voce.em([1.1, 2.3, 1.0], tc - tE);
        K.som('clique', tE, 0.7); K.som('ding', tE + 0.1, 0.6);
        K.filmar([telaHo, menino], 'chegando', K.clamp((tc - B.inicio) / Math.max(0.4, tA - B.inicio)), { plano: 'medio', lado: 'esquerda', altura: 'olho' });
      } else if (tc < tG) {
        ve(comp, cel); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
        cel.tela.desenhar((c, w, h) => chat(c, w, h, 1, 1), 'chat11');
        const pos = [0.6, 0, 0.2];
        menino.colocar(pos, [-1.0, 1.3, 0.3]); menino.reagir('bravo', tc - tA);
        cel.g.scale.setScalar(1.8); cel.g.position.set(pos[0] - 0.3 + Math.sin(tc * 60) * 0.01, 1.1, pos[2] + 0.35); cel.g.rotation.set(-0.2, 0.5, 0);
        cliente.colocar([-1.0, 0, 0.3], [0.6, 1.3, 0.3]); cliente.reagir('bravo', tc - tA);
        K.som('bip', tA, 0.5);
        K.filmar([cliente, menino], 'afastando', K.clamp((tc - tA) / Math.max(0.4, tG - tA)), { plano: 'medio', lado: 'direita', altura: 'olho', obstaculos: false });
      } else {
        ve(funil); funil.mostrar('funil', { nome: 'PET SHOPS DO IGOR', itens: PETS, mover: K.clamp((tc - tC) / 0.9) });
        menino.colocar([1.25, 0, 0.9], [-0.5, 1.8, -0.8]);
        if (tc > tP) menino.reagir('vitoria', tc - tP); else menino.reagir('mostrando', tc - tG);
        fx.et.precisa.em([-0.5, 3.3, -0.5], tc - tP);
        K.som('certo', tP, 0.6);
        K.filmar([funil, menino], 'afastando', K.clamp((tc - tG) / (B.ate - tG)), { plano: 'aberto', lado: 'frente', altura: 'olho' });
      }
    },
    segue(B, tc) {
      // NA TELA: o Igor no computador; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Desconto', B, 0.02), tSg = quando('segue', B, 0.35), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
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
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], [0.5, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(comp, cel, orcR); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      cel.tela.desenhar((c, w, h) => chat(c, w, h, 1, 1), 'chat11');
      orcR.scale.setScalar(0.8);
      menino.colocar([-1.15, 0, 0.0], [-0.2, 1.4, 3]); menino.reagir('susto', 0.5);
      K.filmar([[-0.2, 1.6, 0.6], [0.85, 1.45, 0.6], menino], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'home_office');
    [menino, cliente, rua1, rua2].forEach((b) => { b.g.visible = false; });
    cachorro.g.visible = false;
    tudo.forEach((g) => { g.visible = false; });
    cel.g.scale.setScalar(5.5); cel.g.position.set(-0.2, 1.6, 0.6); cel.g.rotation.set(0, 0, 0);
    orcV.scale.setScalar(1); orcV.position.set(0.85, 1.75, 0.6); orcR.scale.setScalar(1);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
