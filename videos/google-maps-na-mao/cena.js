// Você ainda procura clientes empresa por empresa no Google Maps? (canal Mappoa). Cinco cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa.
(function () {
  let bl, CS, M, menino, conc, robo, comp, tela, planilha, relogio, gaveta, quadro, navG, logo, telaC1, telaC2, cartao, cartaoG, pinoG, contador, predio, balao;
  const pinos = [], moedas = {}, folhas = [], tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = { gancho: 'cidade_maquete', lucas: 'home_office', digita: 'home_office', caca: 'cidade_maquete', planilha: 'home_office', cinco_horas: 'home_office', busca: 'home_office', mappoa_rotulo: 'central_mappoa', captura: 'central_mappoa', pronta: 'central_mappoa', so_nome: 'mundo_mappoa', contatos: 'mundo_mappoa', gaveta: 'home_office', quadro: 'home_office', concorrente: 'cidade_maquete', antes_agora: 'home_office', segue: 'home_office', cartao_fim: 'home_office', capa: 'cidade_maquete' };
  const BUSCA = 'Hamburgueria em Curitiba, PR';
  const ZE = { nome: 'Hamburgueria do Zé', end: 'Rua das Palmeiras, 210', chips: [], enr: false };
  const BURGERS = [
    { nome: 'Hamburgueria do Zé', end: 'Rua das Palmeiras, 210', chips: [] },
    { nome: 'Brasa Smash Burger', end: 'Av. Sete, 1450', chips: [] },
    { nome: 'Cheddar & Cia', end: 'Rua do Porto, 88', chips: [] },
    { nome: 'Burger da Esquina', end: 'Praça Azul, 31', chips: [] },
    { nome: 'Pão e Brasa', end: 'Rua Larga, 502', chips: [] },
    { nome: 'Lanches Bom Bocado', end: 'Av. das Torres, 9', chips: [] }
  ];
  // Casa: computador no meio do quarto, a tela flutuando na frente dele
  const COMP = [-0.6, 0, -1.2], TELA = [-0.6, 1.75, -0.3], LADO = [0.95, 0, -0.45];
  const SOBRE_COMP = [-0.6, 1.6, -1.25];

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }

  function telas() {
    const T = K.telasMappoa;
    const txt = (c, s, x, y, px, cor, peso = 800, al = 'left') => { c.font = `${peso} ${px}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y); };
    const caixa = (c, x, y, w, h, r, cor, borda) => { c.beginPath(); c.roundRect(x, y, w, h, r); if (cor) { c.fillStyle = cor; c.fill(); } if (borda) { c.strokeStyle = borda; c.lineWidth = 3; c.stroke(); } };
    // A placa do gancho: quantas empresas já foram clicadas
    T.contadorG = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      txt(c, 'Empresas clicadas', w / 2, 62, 40, M.cinza, 800, 'center');
      txt(c, String(e.n), w / 2 - 58, h * 0.62, 170, M.verde, 900, 'center');
      txt(c, '/ 100', w / 2 + 118, h * 0.66, 70, '#94a3b8', 900, 'center');
    };
    // Planilha feita na mão: cabeçalho cinza, poucas linhas preenchidas e o resto em branco
    T.planilhaMao = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#1f7a44'; c.fillRect(0, 0, w, 64); txt(c, 'clientes.xlsx', 24, 33, 30, '#fff', 800);
      const col = [[0, 170, 'Nome'], [170, 130, 'Telefone'], [300, 110, 'Site'], [410, 130, 'Instagram']];
      c.fillStyle = '#e8edf2'; c.fillRect(0, 64, w, 46); col.forEach(([x, , s]) => txt(c, s, x + 12, 88, 20, '#334155', 800));
      const al = 52, nomes = ['Burger da Praça', 'Smash 41', 'Hamburgueria do Zé'];
      for (let i = 0; i < 16; i++) {
        const y = 110 + i * al;
        c.strokeStyle = '#d5dde6'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y + al); c.lineTo(w, y + al); c.stroke();
        if (i < e.n) {
          if (i === e.n - 1 && e.pisca) { c.fillStyle = 'rgba(255, 214, 102, .55)'; c.fillRect(0, y, w, al); }
          txt(c, nomes[i], 12, y + al / 2, 19, '#0f172a', 700); txt(c, '(41) 9....', 182, y + al / 2, 18, '#0f172a', 600);
          txt(c, i === 1 ? '—' : 'site', 312, y + al / 2, 18, '#2563eb', 600); txt(c, i === 2 ? '?' : '@...', 422, y + al / 2, 18, '#d6336c', 600);
        }
      }
      col.forEach(([x]) => { c.strokeStyle = '#d5dde6'; c.beginPath(); c.moveTo(x, 64); c.lineTo(x, h); c.stroke(); });
    };
    // A lista pronta do Mappoa, sem número de captura (o nicho daqui não tem captura medida)
    T.listaPronta = (c, w, h, e) => {
      T.lista(c, w, h, { itens: BURGERS, n: e.n });
      c.fillStyle = M.fundo; c.fillRect(10, 134, w - 20, 108);
      caixa(c, 18, 142, w - 36, 64, 18, M.verdeSuave, M.verde);
      txt(c, '✓  Captura concluída', w / 2, 175, 27, '#0f8f5f', 900, 'center');
      txt(c, 'Hamburgueria · Curitiba', 24, 226, 21, M.marinho, 800);
    };
    // O quadro com as 4 colunas; o cartão do Zé anda até a coluna e.pos (0 a 3, pode ser fração)
    T.quadro4 = (c, w, h, e) => {
      c.fillStyle = M.fundo; c.fillRect(0, 0, w, h);
      txt(c, 'Campanha: hamburguerias', 18, 30, 24, M.azul, 900);
      const cols = [['Novos', '#94a3b8'], ['Contato enviado', M.azul], ['Follow-up', M.laranja], ['Respondeu', M.verde]];
      const cw = (w - 40) / 4, ch = 64;
      cols.forEach(([s, cor], i) => { const x = 8 + i * (cw + 8); caixa(c, x, 56, cw, h - 66, 12, '#fff', M.borda); c.fillStyle = cor; c.fillRect(x + 8, 56, cw - 16, 6); txt(c, s, x + 9, 84, i === 1 ? 14 : 16, M.marinho, 800); });
      const carta = (x, y, nome, cor = M.borda) => { caixa(c, x, y, cw - 12, ch, 10, '#fff', cor); txt(c, nome, x + 8, y + 22, 13, M.marinho, 800); caixa(c, x + 8, y + 36, 70, 20, 10, '#e6f9ed'); txt(c, 'WhatsApp', x + 43, y + 46, 11, '#16a34a', 800, 'center'); };
      const resto = e.cheio ? [['Brasa Smash', 0], ['Cheddar & Cia', 0], ['Pão e Brasa', 0], ['Bom Bocado', 1], ['Burger Esquina', 1], ['Smash 41', 2], ['Burger Praça', 3]] : [['Brasa Smash', 0], ['Cheddar & Cia', 0]];
      const cont = [0, 0, 0, 0];
      resto.forEach(([n, k]) => { carta(14 + k * (cw + 8), 104 + cont[k] * (ch + 8), n); cont[k]++; });
      const p = K.clamp(e.pos || 0, 0, 3), k = Math.floor(p), f = K.suave(p - k), x = 14 + (k + f) * (cw + 8);
      carta(x, 104 + cont[Math.min(3, Math.round(p))] * (ch + 8) - Math.sin(f * Math.PI) * 12, 'Hamb. do Zé', M.azul);
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      txt(c, 'mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2, 52, M.marinho, 900);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      txt(c, 'Ir', w - 63, h / 2 + 2, 34, '#fff', 900, 'center');
    };
  }

  function montar(tl) {
    bl = K.blocos(tl);
    M = K.MAPPOA;
    CS = K.cenarios(['cidade_maquete', 'home_office', ['home_office', { hora: 'noite' }, 'noite'], 'central_mappoa', 'mundo_mappoa']);
    telas();

    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    conc = K.boneco({ roupa: 'moletom', cores: { moletom: 0x8a919c, punho: 0x6b7280, calca: 0x2b2f36, mochila: 0x3f4652, cabelo: 0x1f1a17, pele: 0xc58c5f } });
    K.nomear('concorrente', conc.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Cidade em maquete: 100 pinos (20 verdes já clicados, 80 cinza faltando), o pino grande e a placa
    const blocos = [];
    for (let i = -5; i <= 5; i++) for (let j = -5; j <= 5; j++) if (i || j) blocos.push([i * 3.4, j * 3.4]);
    blocos.sort((a, b) => (a[0] - 1) ** 2 + (a[1] - 1.5) ** 2 - ((b[0] - 1) ** 2 + (b[1] - 1.5) ** 2));
    blocos.slice(0, 100).forEach(([x, z], i) => { const p = K.pinoMappoa(i < 20 ? M.verde : '#9aa5b1', 0.95); guarda(p, 'pinos', [x, 3.9, z]); pinos.push(p); });
    pinoG = K.pinoMappoa(M.azul, 1.6); guarda(pinoG, 'pino_grande', [0.05, 0.12, 1.25]);
    contador = K.painelMappoa(1.5, 0.92, { px: 700 }); guarda(contador, 'contador', [2.45, 2.25, 0.55]);
    predio = guarda(K.m3d('prediozinho', { cor: 0xf59e0b, a: 1.5, placa: 'INAUGURAÇÃO' }), 'predio_novo', [-0.35, 0.12, -0.55], 1.5);
    balao = guarda(K.m3d('balao_chat'), 'balao', [-1.35, 2.25, 0.5], 0.75);
    cartao = K.cartaoLeadMappoa(Object.assign({}, ZE, { enr: true })); guarda(cartao, 'cartao', [0, 2, 0], 0.9);
    ['tel', 'site', 'insta', 'whats'].forEach((t) => { moedas[t] = K.moedaContatoMappoa(t, 0.55); guarda(moedas[t], null, [0, 2, 0]); });

    // Casa
    comp = K.computador({ corMesa: 0xe9e2d4 }); guarda(comp, 'computador', COMP, 1.5);
    tela = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(tela, 'tela', TELA);
    planilha = K.painelMappoa(1.56, 2.6, { px: 800, borda: '#1f7a44' }); guarda(planilha, 'planilha', TELA);
    relogio = guarda(K.m3d('relogio_parede', { hora: 2 }), 'relogio', [0.75, 2.95, -3.5], 1.7);
    gaveta = guarda(K.m3d('arquivo'), 'gaveta', [-3.1, 0, -1.3], 1.45);
    for (let i = 0; i < 10; i++) folhas.push(guarda(K.m3d('pilha_papeis', { n: 1, seed: i + 3 }), null, [-3.1, 2, -1.3], 0.8));
    quadro = K.painelMappoa(2.5, 1.56, { px: 1000 }); guarda(quadro, 'quadro', [1.6, 2.6, -3.42]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.6, 2.55, -0.55]);
    // Central
    logo = K.logoMappoa(1.75); guarda(logo, 'logo', [0.7, 1.65, -0.3]);
    telaC1 = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC1, 'tela', [0.85, 1.6, 0.1]);
    telaC2 = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC2, 'tela', [-0.2, 1.65, 0.8]);
    // Palco da marca: o cartão grande do Zé
    cartaoG = K.cartaoLeadMappoa(Object.assign({}, ZE, { enr: true })); guarda(cartaoG, 'cartao', [-0.1, 1.95, 0], 1.5);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = { faltam: e('Faltam 80', 'laranja'), tarde: e('Tarde perdida', 'vermelho'), gestor: e('Gestor de tráfego', 'azul'), ontem: e('Cliente pra ontem', 'laranja'), mao: e('Tudo na mão', 'laranja'), tres: e('3 de 100', 'laranja'), min3: e('3 min cada', 'laranja'), horas: e('100 = 5 horas', 'vermelho'), poucos: e('Poucos minutos', 'verde'), so: e('Só o nome?', 'laranja'), bagunca: e('Bagunça', 'vermelho'), antes: e('Chegou antes', 'laranja'), falando: e('Falando com empresas', 'verde') };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo'); fx.certo2 = K.marca('certo');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Quanto tempo você perde no mapa? <em>Comenta aí</em>');
    fx.festa = K.festa([-0.2, 2.6, 1]);
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const voa = (obj, de, ate, d, esc = 1) => { const q = K.clamp(d); ve(obj); const g = obj.g || obj; g.position.set(K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) + Math.sin(q * Math.PI) * 0.9, K.lerp(de[2], ate[2], q)); g.scale.setScalar(esc * (1 - 0.35 * q)); };
  const chipsAte = (lista, tempos, tc) => lista.filter((_, i) => tc > tempos[i]);

  const P = {
    gancho(B, tc) {
      // NA TELA: a maquete; o Lucas no centro; o pino grande caindo na frente dele; a placa 20/100; 20 pinos verdes e 80 cinza · MOSTRA: personagem, pino_grande, contador
      const C = CS.todos.cidade_maquete, tV = quando('vigésima', B, 0.18), tO = quando('oitenta', B, 0.55), tT = quando('tarde', B, 0.8), tA = quando('acabou', B, 0.9);
      // ENTRA AGORA: o pino grande cai no 1º segundo; a placa na palavra "vigésima"; os 80 cinza a partir de "oitenta"
      ve(pinoG, contador); K.entrar(pinoG.g, 'cai', B.t + 0.05, { altura: 4 }); pinoG.g.rotation.z = Math.sin(B.t * 9) * 0.06 * K.clamp(1 - B.t);
      K.entrar(contador.g, 'cai', tc - tV, { altura: 3 }); contador.mostrar('contadorG', { n: 20 });
      // OBJETOS SE MEXENDO: os pinos sobem dos telhados com um quique, dos mais perto pros mais longe
      pinos.forEach((p, i) => { ve(p); p.em(tc + i * 0.3, i < 20 ? 1 : pop(tc - tO - (i - 20) * 0.012)); });
      // CENÁRIO: a luz cai pra fim de tarde na palavra "tarde"
      if (tc > tT) K.ceu('tarde');
      // PERSONAGEM: em C.centro, de frente · começo: susto · na palavra "acabou": cansado
      menino.colocar(C.personagem, tc > tO ? [1.3, 1.4, 6] : [0.05, 1, 1.25]);
      if (tc > tA) menino.reagir('cansado', tc - tA); else if (tc > tO) { menino.reagir('surpreso', tc - tO); menino.olharPara([Math.sin((tc - tO) * 2) * 6, 3, -4]); } else menino.reagir('susto', B.t);
      // EFEITOS VISUAIS: "Faltam 80" (oitenta) · "Tarde perdida" (acabou)
      fx.et.faltam.em({ tela: [540, 390] }, tc - tO); fx.et.tarde.em({ tela: [540, 480] }, tc - tA);
      // SONS: baque do pino · ding da placa · bip dos pinos · errado
      K.som('baque', B.inicio + 0.3, 0.8); K.som('ding', tV + 0.3, 0.5); for (let i = 0; i < 8; i++) K.som('bip', tO + i * 0.12, 0.2); K.som('errado', tA, 0.5);
      // CÂMERA: alvo os três · afastando · aberto · frente · cima, topo livre
      K.filmar([menino, pinoG, contador], 'afastando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto', espacoCima: 0.25 });
    },
    lucas(B, tc) {
      // NA TELA: o Lucas no centro do quarto; o computador atrás, à esquerda · MOSTRA: personagem, computador
      const C = CS.todos.home_office, tL = quando('Lucas', B, 0.12), tT = quando('tráfego', B, 0.5), tO = quando('ontem', B, 0.92), ate = [0.7, 0, 0.1];
      ve(comp);
      // OBJETOS SE MEXENDO: o monitor liga na palavra "tráfego"
      const liga = tc > tT;
      comp.tela.desenhar((c, w, h) => { if (liga) { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, M.azul); d.addColorStop(1, M.verde); c.fillStyle = d; } else c.fillStyle = '#0b0f16'; c.fillRect(0, 0, w, h); }, liga ? 'liga' : 'desliga');
      // PERSONAGEM: anda da entrada até o centro, acenando · na palavra "ontem": duvida
      const x = K.faixa(tc, tL - 0.3, tT);
      if (x < 1) menino.irPara(C.entrada, ate, x, tc, { olhar: [0.7, 1.2, 6] });
      else { menino.colocar(ate, tc > tO ? [0.7, 1.2, 6] : COMP); if (tc > tO) menino.reagir('duvida', tc - tO); else { menino.apontar(0.4); menino.humor('feliz'); } }
      // INTERAÇÃO: ele aponta o computador na palavra "tráfego"
      // EFEITOS VISUAIS: "Gestor de tráfego" · "Cliente pra ontem"
      fx.et.gestor.em([0.7, 2.15, 0.2], tc - tT); fx.et.ontem.em([0.7, 2.65, 0.2], tc - tO);
      // SONS: passos · ding
      K.som('passo', tL, 0.4); K.som('passo', tL + 0.35, 0.4); K.som('ding', tT, 0.5); K.som('errado', tO, 0.35);
      // CÂMERA: chegando · médio · esquerda · olho
      K.filmar([menino, comp], 'chegando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    digita(B, tc) {
      // NA TELA: o Lucas ao lado do computador; a tela com o mapa subindo; "hamburgueria" digitado; pinos aparecendo · MOSTRA: tela, personagem
      const tM = quando('mapa', B, 0.35), tD = quando('digita', B, 0.5), tC = quando('clicar', B, 0.9);
      ve(comp, tela); K.entrar(tela.g, 'sobe', tc - tM, { dur: 0.45 });
      // OBJETOS SE MEXENDO: as letras em "digita"; os pinos da tela no "clicar"
      const termo = 'hamburgueria em Curitiba', n = Math.floor(termo.length * K.clamp((tc - tD) / Math.max(0.4, tC - tD - 0.1)));
      tela.mostrar('mapaBusca', { termo: termo.slice(0, n) + (n < termo.length ? '|' : ''), pinos: tc > tC - 0.15 ? 9 : 0 });
      // PERSONAGEM: segurando (teclando) · na palavra "clicar": apontar
      menino.colocar(LADO, TELA);
      if (tc > tC) menino.apontar(0.65); else menino.reagir('segurando', B.t);
      // SONS: teclado e o clique
      for (let k = 0; k < 6; k++) K.som('clique', tD + k * 0.1, 0.25); K.som('clique', tC, 0.6);
      // CÂMERA: subindo · médio · frente · baixo
      K.filmar([tela, menino], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo' });
    },
    caca(B, tc) {
      // NA TELA: a maquete de perto; o Lucas correndo entre os prédios; o cartão em cima dele ganhando os contatos · MOSTRA: personagem, cartao
      const tE = quando('empresa', B, 0.08), tN = quando('nome', B, 0.25), tT = quando('telefone', B, 0.45), tS = quando('site', B, 0.65), tI = quando('Instagram', B, 0.85);
      // PERSONAGEM: corre de prédio em prédio · na palavra "Instagram": cansado, suando
      const W = [[1.0, 0.12, 1.0], [-0.95, 0.12, 0.95], [-0.95, 0.12, -0.9], [0.95, 0.12, -0.9], [0.95, 0.12, 0.6]], T = [B.inicio, tN, tT, tS, tI];
      let k = 0; while (k < 3 && tc > T[k + 1]) k++;
      const x = K.clamp((tc - T[k]) / Math.max(0.3, T[k + 1] - T[k]));
      if (tc > tI) { menino.colocar(W[4], [1.2, 1.4, 6]); menino.reagir('cansado', tc - tI); menino.suar(tc); }
      else menino.irPara(W[k], W[k + 1], x, tc, { correr: true });
      const pm = menino.g.position.toArray(), cpos = mais(pm, [0, 2.05, 0.15]);
      // ENTRA AGORA: o cartão com o nome na palavra "nome"; cada contato salta de um prédio na sua palavra
      ve(cartao); cartao.g.position.set(...cpos); cartao.g.scale.setScalar(0.9 * pop(tc - tN));
      cartao.desenhar(Object.assign({}, ZE, { chips: chipsAte(['tel', 'site', 'insta'], [tT + 0.4, tS + 0.4, tI + 0.4], tc) }));
      [['tel', tT, [3.4, 3.2, 0]], ['site', tS, [-3.4, 3.2, 0]], ['insta', tI, [0, 3.2, -3.4]]].forEach(([t, t0, de]) => { const d = (tc - t0) / 0.4; if (d > 0 && d < 1) { voa(moedas[t], de, cpos, d, 1.2); moedas[t].em(tc); } });
      // EFEITOS VISUAIS: os chips no cartão · "Tudo na mão" (Instagram)
      fx.et.mao.em(mais(cpos, [0, 0.55, 0]), tc - tI);
      // SONS: bip em cada contato · whoosh da corrida
      [tN, tT, tS, tI].forEach((t) => { K.som('bip', t, 0.4); K.som('whoosh', t - 0.2, 0.25); }); void tE;
      // CÂMERA: passando · médio · direita · alto
      K.filmar([pm, cpos], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'alto', tam: 1.4 });
    },
    planilha(B, tc) {
      // NA TELA: a planilha subindo do monitor, com 3 linhas e o resto em branco; o Lucas do outro lado · MOSTRA: planilha, personagem
      const tP = quando('planilha', B, 0.3), tTu = quando('tudo', B, 0.2), tX = quando('próxima', B, 0.85);
      ve(comp, planilha); K.entrar(planilha.g, 'sobe', tc - tP + 0.2, { dur: 0.4 });
      // OBJETOS SE MEXENDO: a 3ª linha se escreve e pisca; na palavra "próxima", a planilha desce um pouco
      planilha.mostrar('planilhaMao', { n: tc > tTu + 0.3 ? 3 : 2, pisca: tc > tTu + 0.3 && tc < tX });
      planilha.g.position.y = TELA[1] - K.suave(K.clamp((tc - tX) / 0.5)) * 0.35;
      // PERSONAGEM: empurrando (colando) · na palavra "próxima": triste
      const pos = [-2.1, 0, -0.35]; menino.colocar(pos, TELA);
      if (tc > tX) menino.reagir('triste', tc - tX); else menino.reagir('empurrando', B.t);
      // EFEITOS VISUAIS: "3 de 100" (próxima)
      fx.et.tres.em([-0.6, 3.3, -0.2], tc - tX);
      // SONS: clique em "cola" · errado baixinho em "próxima"
      K.som('clique', B.inicio + 0.1, 0.6); K.som('errado', tX, 0.3);
      // CÂMERA: revelando · médio · direita · olho
      K.filmar([planilha, menino], 'revelando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },
    cinco_horas(B, tc) {
      // NA TELA: o quarto: o relógio na parede, a janela virando noite, o Lucas desabando · MOSTRA: relogio, personagem
      const tMi = quando('minutos', B, 0.3), tC = quando('cem', B, 0.45), tH = quando('horas', B, 0.75);
      if (tc > tH) CS.usar('noite');
      ve(comp, relogio); K.entrar(relogio, 'cresce', tc - tMi, { dur: 0.4 });
      // OBJETOS SE MEXENDO: o ponteiro gira várias voltas a partir de "cem"
      const m = relogio.userData.m3d, g = K.clamp((tc - tC) / Math.max(0.5, B.ate - tC)); if (m) { m.m.rotation.z = -g * 30; m.h.rotation.z = -1.05 - g * 2.6; }
      comp.tela.desenhar((c, w, h) => { c.fillStyle = '#e8efe6'; c.fillRect(0, 0, w, h); c.fillStyle = '#ea4335'; for (let i = 0; i < 6; i++) { c.beginPath(); c.arc(40 + i * 45, 60 + (i % 3) * 70, 9, 0, 7); c.fill(); } }, 'mapinha');
      // PERSONAGEM: pensando (a conta) · na palavra "horas": cansado
      menino.colocar([0.55, 0, -0.35], [0.4, 1.4, 6]);
      if (tc > tH) menino.reagir('cansado', tc - tH); else { menino.reagir('pensando', B.t); menino.olharPara([0.75, 2.95, -3.5]); }
      // EFEITOS VISUAIS: "3 min cada" · "100 = 5 horas"
      fx.et.min3.em([0.75, 3.75, -3.2], tc - tMi); fx.et.horas.em([0.55, 2.05, -0.2], tc - tH);
      // SONS: tique-taque acelerado
      K.som('zumbido', tC, 0.45); K.som('errado', tH, 0.4);
      // CÂMERA: descendo · aberto · frente · alto
      K.filmar([relogio, menino, [-0.9, 2.2, -3.5]], 'chegando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho' });
    },
    busca(B, tc) {
      // NA TELA: o Lucas no computador; a tela de busca do Mappoa: Nicho e Cidade · MOSTRA: tela, personagem
      const tS = quando('site', B, 0.2), tTi = quando('tipo', B, 0.55), tC = quando('cidade', B, 0.9);
      ve(comp, tela); K.entrar(tela.g, 'sobe', tc - tS, { dur: 0.45 });
      // OBJETOS SE MEXENDO: "Hamburgueria" digitado em "tipo"; "Curitiba" em "cidade"
      tela.mostrar('busca', { nicho: 'Hamburgueria', estado: 'PR', cidade: 'Curitiba', qtd: 'Todos os leads disponíveis', digitado: tc > tC ? 1 : 0.98 * K.clamp((tc - tTi) / Math.max(0.3, tC - tTi)) });
      // PERSONAGEM: ideia · na palavra "cidade": apontar pro botão
      menino.colocar(LADO, TELA);
      if (tc > tC) menino.apontar(0.35); else menino.reagir('ideia', B.t);
      // EFEITOS VISUAIS: o brilho em volta da tela na palavra "site"
      K.brilhar(tela.g, tc - tS);
      // SONS: cliques
      K.som('brilho', tS, 0.4); K.som('clique', tTi, 0.5); K.som('clique', tC, 0.5);
      // CÂMERA: girando · médio · esquerda · olho
      K.filmar([tela, menino], 'girando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', angulo: 18 });
    },
    mappoa_rotulo(B, tc) {
      // NA TELA: o logo grande; o robô acenando; o mapa gigante atrás · MOSTRA: logo, robo
      const tM = quando('Mappoa', B, 0.4);
      ve(logo, robo); logo.g.rotation.y = K.suave(K.clamp((tc - tM + 0.2) / 0.6)) * 6.283;
      robo.g.position.set(K.lerp(-3.5, -0.95, K.suave(K.clamp(B.t / 0.5))), 0, 0.5); robo.g.rotation.y = 0.35; robo.em(tc, { acena: 1, mapa: false });
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      // CÂMERA: chegando · perto · frente · olho
      K.filmar([logo, robo], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    captura(B, tc) {
      // NA TELA: o robô de frente pro mapa gigante; a janela de captura com as etapas ficando verdes · MOSTRA: robo, tela
      const tM = quando('Maps', B, 0.3), tS = quando('salvando', B, 0.55), tZ = quando('sozinho', B, 0.75), g = K.clamp((tc - tM) / (B.ate - tM));
      ve(robo, telaC1); K.entrar(telaC1.g, 'desliza', tc - tM, { de: [3, 0, 0], dur: 0.4 });
      const novos = Math.round(g * 58);
      telaC1.mostrar('captura', { busca: BUSCA, novos, progresso: g * 0.75, etapa: Math.min(4, 2 + Math.floor(g * 3)) });
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = tc > tS ? 0.45 : -0.2; robo.em(tc, { mapa: true });
      // PERSONAGEM: o Lucas entra pequeno pela direita na palavra "sozinho", surpreso
      if (tc > tZ - 0.4) { menino.irPara([4.2, 0, 1.6], [2.15, 0, 1.3], K.clamp((tc - tZ + 0.4) / 0.5), tc, { olhar: [0.8, 1.2, 0.1] }); if (tc > tZ + 0.1) menino.reagir('surpreso', tc - tZ); }
      for (let i = 0; i < 7; i++) K.som('bip', tS + i * 0.14, 0.25);
      // CÂMERA: passando · médio · direita · baixo
      K.filmar([robo, telaC1], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    pronta(B, tc) {
      // NA TELA: a tela da lista pronta, bem grande; o robô comemorando; o Lucas no canto · MOSTRA: tela, personagem
      const tMi = quando('minutos', B, 0.25), tL = quando('lista', B, 0.4), tP = quando('pronta', B, 0.92);
      ve(telaC2, robo); telaC2.mostrar('listaPronta', { n: Math.round(1 + 5 * K.clamp((tc - tL) / 0.9)) });
      robo.g.position.set(-1.45, 0, 1.25); robo.g.rotation.y = 0.5; robo.em(tc, { acena: tc > tP ? 1 : 0, mapa: false });
      // PERSONAGEM: surpreso · na palavra "pronta": vitoria
      menino.colocar([1.15, 0, 1.55], [-0.2, 1.4, 0.8]);
      if (tc > tP) menino.reagir('vitoria', tc - tP); else menino.reagir('surpreso', B.t);
      fx.et.poucos.em([-0.2, 3.2, 1], tc - tMi); fx.festa.em(tc - tP);
      K.som('ding', tMi, 0.4); K.som('certo', tP, 0.7);
      // CÂMERA: mergulho · médio · esquerda · alto
      K.filmar([telaC2, menino], 'chegando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    so_nome(B, tc) {
      // NA TELA: o cartão gigante só com o nome; o Lucas ao lado, procurando o telefone · MOSTRA: cartao, personagem
      const tN = quando('nome', B, 0.1), tNa = quando('nada', B, 0.45), tF = quando('fala', B, 0.85);
      ve(cartaoG); K.entrar(cartaoG.g, 'sobe', tc - tN, { dur: 0.45 }); cartaoG.desenhar(Object.assign({}, ZE));
      // INTERAÇÃO: ele vira o cartão procurando o telefone atrás
      cartaoG.g.rotation.y = tc > tF ? Math.sin(K.clamp((tc - tF) / 0.8) * Math.PI) * 0.9 : 0;
      menino.colocar([1.15, 0, 0.85], [-0.1, 1.9, 0]);
      if (tc > tF) menino.reagir('duvida', tc - tF); else menino.reagir('mostrando', B.t);
      fx.et.so.em([0.1, 2.75, 0.2], tc - tNa);
      K.som('whoosh', tN, 0.4); K.som('errado', tNa, 0.5);
      // CÂMERA: subindo · médio · frente · baixo
      K.filmar([cartaoG, menino], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    contatos(B, tc) {
      // NA TELA: o cartão no centro; o robô à esquerda jogando os contatos; o Lucas à direita · MOSTRA: cartao, robo
      const tW = quando('WhatsApp', B, 0.5), tT = quando('telefone', B, 0.62), tS = quando('site', B, 0.75), tI = quando('Instagram', B, 0.88);
      ve(cartaoG, robo); cartaoG.g.rotation.y = 0;
      const ts = [tW, tT, tS, tI], tipos = ['whats', 'tel', 'site', 'insta'];
      cartaoG.desenhar(Object.assign({}, ZE, { chips: chipsAte(tipos, ts.map((t) => t + 0.4), tc), enr: tc > tI + 0.45 }));
      const de = [-1.25, 1.3, 1.0], ate = [-0.1, 1.75, 0.25];
      tipos.forEach((t, i) => { const d = (tc - ts[i]) / 0.4; if (d > 0 && d < 1) { voa(moedas[t], de, mais(ate, [-0.5 + i * 0.35, 0, 0]), d, 1.6); moedas[t].em(tc); } });
      robo.g.position.set(-1.55, 0, 0.9); robo.g.rotation.y = 0.6; robo.em(tc, { acena: Math.max(0, Math.sin(tc * 6)), mapa: false });
      menino.colocar([1.3, 0, 0.95], [-0.1, 1.9, 0]);
      if (tc > tI) menino.reagir('vitoria', tc - tI); else menino.reagir('surpreso', B.t);
      const [x, y] = K.tela([-0.1, 2.5, 0]); fx.certo.em({ tela: [x + 150, y - 30] }, tc - tI - 0.4);
      ts.forEach((t) => K.som('ding', t + 0.4, 0.45));
      // CÂMERA: revelando · médio · esquerda · olho
      K.filmar([cartaoG, robo], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    gaveta(B, tc) {
      // NA TELA: o arquivo ao lado da mesa explodindo de papel; o Lucas tentando fechar · MOSTRA: gaveta, personagem
      const tG = quando('gaveta', B, 0.65), tBa = quando('bagunçada', B, 0.85), base = [-3.1, 1.95, -1.05];
      ve(gaveta); K.falhar(gaveta, 'treme', tc - tG);
      // OBJETOS SE MEXENDO: as folhas sobem e se espalham pelo chão
      folhas.forEach((f, i) => {
        const d = (tc - tG - i * 0.05) / 0.9; if (d <= 0) return; ve(f); const q = K.clamp(d), a = i * 0.63;
        f.position.set(base[0] + Math.cos(a) * 1.6 * q, base[1] + Math.sin(q * Math.PI) * 1.2 - q * 1.9, base[2] + 0.6 + Math.sin(a) * 1.1 * q); f.rotation.set(q * 4 + i, i, q * 3);
      });
      // PERSONAGEM: empurrando · na palavra "bagunçada": susto
      menino.colocar([-1.85, 0, -0.75], [-3.1, 0.8, -1.3]);
      if (tc > tBa) { menino.reagir('susto', tc - tBa); menino.olharPara([-1.2, 1.4, 6]); } else menino.reagir('empurrando', B.t);
      fx.et.bagunca.em([-3.1, 2.75, -1.0], tc - tBa);
      K.som('baque', tG, 0.7); K.som('whoosh', tG + 0.1, 0.5);
      // CÂMERA: passando · médio · direita · alto
      K.filmar([gaveta, menino], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },
    quadro(B, tc) {
      // NA TELA: o quadro com 4 colunas na parede; o Lucas na frente arrastando o cartão · MOSTRA: quadro, personagem
      const tQ = quando('quadro', B, 0.15), tN = quando('novos', B, 0.5), tE = quando('enviado', B, 0.65), tF = quando('follow-up', B, 0.8), tR = quando('respondeu', B, 0.92);
      ve(quadro); K.entrar(quadro.g, 'surge', tc - tQ, { dur: 0.4 });
      // OBJETOS SE MEXENDO: o cartão anda de coluna em coluna, uma por palavra
      const seg = (t0) => K.clamp((tc - t0) / 0.35);
      const pos = seg(tE - 0.2) + seg(tF - 0.2) + seg(tR - 0.2);
      quadro.mostrar('quadro4', { pos: tc > tN - 0.1 ? pos : 0 });
      // PERSONAGEM: mostrando · na palavra "respondeu": vitoria
      menino.colocar([0.15, 0, -1.55], [1.6, 2.4, -3.4]);
      if (tc > tR) { menino.reagir('vitoria', tc - tR); } else if (tc > tN) menino.apontar(0.9); else menino.reagir('mostrando', B.t);
      const [x, y] = K.tela([2.65, 3.4, -3.4]); fx.certo.em({ tela: [x, y - 60] }, tc - tR);
      [tE, tF, tR].forEach((t) => K.som('whoosh', t - 0.15, 0.35)); K.som('certo', tR, 0.6);
      // CÂMERA: afastando · aberto · frente · olho
      K.filmar([quadro, menino], 'afastando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    concorrente(B, tc) {
      // NA TELA: o prédio novo "Inauguração"; o concorrente na porta com o balão; o Lucas chegando correndo · MOSTRA: predio_novo, concorrente, personagem
      const tC = quando('concorrente', B, 0.3), tA = quando('antes', B, 0.75), tV = quando('você', B, 0.92);
      pinos.slice(0, 20).forEach((p, i) => { ve(p); p.em(tc + i, 1); });
      ve(predio); K.entrar(predio, 'sobe', tc - tC + 0.25, { dur: 0.45 });
      conc.g.visible = true; conc.colocar([-1.35, 0.12, 0.45], [1.5, 1, 2]); if (tc > tA) conc.acenar(tc); else conc.reagir('mostrando', B.t); conc.humor('feliz');
      ve(balao); balao.scale.setScalar(0.75 * pop(tc - tA)); balao.position.y = 2.25 + K.clamp(tc - tA) * 0.2;
      // PERSONAGEM: correndo · na palavra "você": bravo
      const x = K.clamp((tc - B.inicio) / Math.max(0.5, tV - B.inicio));
      if (x < 1) menino.irPara([1.7, 0, 5.1], [1.2, 0.12, 1.0], x, tc, { correr: true, olhar: [-1.3, 1, 0.4] }); else { menino.colocar([1.2, 0.12, 1.0], [-1.3, 1, 0.4]); menino.reagir('bravo', tc - tV); }
      fx.et.antes.em([-0.35, 3.15, -0.3], tc - tA);
      K.som('ding', tA, 0.5); K.som('passo', tV, 0.6);
      // CÂMERA: girando · médio · esquerda · cima
      K.filmar([predio, conc.g, [1.2, 0.8, 1.0]], 'girando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'alto', angulo: 20 });
    },
    antes_agora(B, tc) {
      // NA TELA: antes, o Lucas largado no computador com o mapa; agora, o quadro cheio e ele de pé, arrastando · MOSTRA: quadro, personagem
      const tAg = quando('Agora', B, 0.45), tFa = quando('falando', B, 0.75), tEm = quando('empresas', B, 0.95);
      ve(comp, quadro);
      quadro.mostrar('quadro4', { cheio: tc > tAg, pos: tc > tFa ? K.clamp((tc - tFa) / 0.5) : 0 });
      if (tc < tAg) {
        ve(tela); tela.mostrar('mapaBusca', { termo: 'hamburgueria em Curitiba', pinos: 9 });
        menino.colocar(LADO, TELA); menino.reagir('cansado', B.t);
        K.filmar([tela, menino], 'chegando', K.clamp(B.t / (tAg - B.inicio)), { plano: 'medio', lado: 'frente', altura: 'olho' });
      } else {
        // PERSONAGEM: anda até a parede, mostrando · INTERAÇÃO: ele arrasta o cartão
        const x = K.clamp((tc - tAg) / 0.6);
        if (x < 1) menino.irPara(LADO, [0.15, 0, -1.55], x, tc, { olhar: [1.6, 2.4, -3.4] }); else { menino.colocar([0.15, 0, -1.55], [1.6, 2.4, -3.4]); if (tc > tFa) menino.apontar(0.9); else menino.reagir('mostrando', tc - tAg); }
        fx.et.falando.em([1.6, 3.65, -3.2], tc - tFa);
        K.som('certo', tEm, 0.6);
        K.filmar([quadro, menino], 'chegando', K.clamp((tc - tAg) / (B.ate - tAg)), { plano: 'medio', lado: 'frente', altura: 'baixo' });
      }
    },
    segue(B, tc) {
      // NA TELA: o Lucas no computador; o navegador enorme com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, computador
      const tQ = quando('Quanto', B, 0.02), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.62), tTe = quando('testa', B, 0.86);
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      comp.tela.desenhar((c, w, h) => { c.fillStyle = '#f4f8fd'; c.fillRect(0, 0, w, h); c.fillStyle = M.azul; c.fillRect(0, 0, w, 40); }, 'site');
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-2.4, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([0.85, 0, -0.75], tc > tPc ? SOBRE_COMP : [0.5, 1.4, 6]);
      if (tc > tPc) menino.reagir('segurando', tc - tPc); else menino.reagir('chamando', B.t);
      // CÂMERA: parado · aberto · frente · olho, topo livre
      K.filmar([navG, comp, menino], 'parado', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    cartao_fim(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      robo.g.position.set(-2.4, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([0.85, 0, -0.75], [0.5, 1.4, 6]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      const C = CS.todos.cidade_maquete;
      ve(pinoG, contador, robo); contador.mostrar('contadorG', { n: 20 });
      pinos.forEach((p, i) => { ve(p); p.em(i, 1); });
      robo.g.position.set(-1.0, 0.12, 0.6); robo.g.rotation.y = 0.5; robo.em(1, { mapa: true });
      menino.colocar(C.personagem, [0.4, 1.4, 6]); menino.reagir('susto', 0.5);
      K.filmar([pinoG, menino, robo, contador], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'alto', espacoCima: 0.35 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'home_office');
    if (K.sombraLisaMappoa) K.sombraLisaMappoa();
    menino.g.visible = false; conc.g.visible = false;
    tudo.forEach((g) => { g.visible = false; });
    planilha.g.position.y = TELA[1];
    gaveta.position.set(-3.1, 0, -1.3); gaveta.rotation.set(0, 0, 0);
    comp.tela.desenhar((c, w, h) => { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, M.azul); d.addColorStop(1, M.verde); c.fillStyle = d; c.fillRect(0, 0, w, h); }, 'liga');
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
