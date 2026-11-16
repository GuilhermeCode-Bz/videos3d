// Montei uma lista de clientes para uma agência do zero (canal Mappoa). Quatro cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa.
(function () {
  let bl, CS, menino, robo, comp, cel, contador, agenda, contas, lupa, relogio, logo, pilha, monteA, monteB, peneira, lixeira, balao, alvo, navG;
  let telaAg, telaC1, telaC2, telaM, funil;
  const pinos = [], envelopes = [], cartoes = [], tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = { gancho: 'agencia', jose: 'agencia', celular: 'agencia', aluguel: 'agencia', escolhe: 'cidade_maquete', um_por_um: 'cidade_maquete', site: 'agencia', mappoa_rotulo: 'central_mappoa', captura: 'central_mappoa', noventa_e_nove: 'central_mappoa', quem_primeiro: 'mundo_mappoa', separa: 'mundo_mappoa', analise: 'mundo_mappoa', lixo: 'agencia', mensagem: 'agencia', alvo: 'agencia', antes_agora: 'agencia', segue: 'agencia', cartao: 'agencia', capa: 'agencia' };
  const BUSCA = 'Designer em São Paulo, SP';
  const SOFA = [-3.3, 0, 1.5];

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['agencia', 'cidade_maquete', 'central_mappoa', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    T.contador = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '800 44px Montserrat, sans-serif'; c.fillStyle = M.cinza; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Empresas na lista', w / 2, 62);
      c.font = '900 190px Montserrat, sans-serif'; c.fillStyle = e.n ? M.azul : '#e8352b'; c.fillText(String(e.n), w / 2, h * 0.62);
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    robo = K.roboMappoa(); guarda(robo, 'robo');
    // Agência
    contador = K.painelMappoa(1.7, 1.05, { px: 700 }); guarda(contador, 'contador', [-0.5, 1.45, 0]);
    agenda = guarda(K.m3d('calendario'), 'agenda', [-1.2, 0.72, 0.2], 1.5);
    cel = K.celular(); guarda(cel, 'celular', mais(SOFA, [0.42, 1.18, 0.52]), 2.2);
    cel.tela.desenhar((c, w, h) => { c.fillStyle = '#eef3f9'; c.fillRect(0, 0, w, h); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#e8352b'; c.font = '900 92px Montserrat, sans-serif'; c.fillText('0', w / 2, h * 0.42); c.fillStyle = '#334155'; c.font = '800 22px Montserrat, sans-serif'; c.fillText('mensagens', w / 2, h * 0.62); }, 'zero');
    contas = guarda(K.m3d('pilha_papeis', { n: 34 }), 'contas', [-0.7, 0, 0.25], 1.7);
    comp = K.computador({}); guarda(comp, 'computador', [-0.45, 0, -1.25], 1.55);
    comp.tela.desenhar((c, w, h) => { const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, M.azul); d.addColorStop(1, M.verde); c.fillStyle = d; c.fillRect(0, 0, w, h); }, 'marca');
    telaAg = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaAg, 'tela', [-0.55, 1.6, 0.1]);
    for (let i = 0; i < 6; i++) envelopes.push(guarda(K.m3d('envelope'), 'envelope', [0, 1.3, 0], 0.62));
    lixeira = guarda(K.m3d('lixeira'), 'lixeira', [1.35, 0, 0.3], 1.9);
    balao = guarda(K.m3d('balao_chat'), 'balao', [0.55, 3.05, 0.35], 0.95);
    alvo = guarda(K.m3d('alvo'), 'alvo', [-0.2, 1.75, -0.2], 1.3);
    funil = K.painelMappoa(3, 1.87, { px: 1000 }); guarda(funil, 'funil', [-0.5, 2.05, -0.8]);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);
    // Cidade em maquete
    lupa = guarda(K.m3d('lupa', { tam: 1.25 }), 'lupa', [-0.5, 1.75, 0.3]);
    relogio = guarda(K.m3d('relogio_parede', { hora: 3 }), 'relogio', [-0.2, 2.85, 0], 2.1);
    [[-3.4, 0], [3.4, 0], [0, -3.4], [-3.4, -3.4], [3.4, -3.4], [-1.7, -6.8], [1.7, -6.8], [-6.8, -3.4], [6.8, -3.4]].forEach(([x, z], i) => { const p = K.pinoMappoa(i % 3 === 2 ? M.verde : M.azul, 1.05); guarda(p, 'pinos', [x, 2.7 + (i % 2) * 0.45, z]); pinos.push(p); });
    // Central
    logo = K.logoMappoa(1.75); guarda(logo, 'logo', [0.7, 1.65, -0.3]);
    telaC1 = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC1, 'tela', [0.85, 1.6, 0.1]);
    telaC2 = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC2, 'tela', [0, 1.65, 0.8]);
    // Palco da marca
    pilha = guarda(K.m3d('pilha_cartoes', { n: 30 }), 'pilha', [-0.2, 0, 0], 2.2);
    peneira = K.peneiraMappoa(1); peneira.g.rotation.x = 0.55; guarda(peneira, 'peneira', [-0.1, 2.75, 0.1]);
    monteA = guarda(K.m3d('pilha_cartoes', { n: 14 }), 'monte', [-1.25, 0, 0.5], 1.15);
    monteB = guarda(K.m3d('pilha_cartoes', { n: 8 }), 'monte', [1.05, 0, 0.5], 1.15);
    for (let i = 0; i < 12; i++) cartoes.push(guarda(K.m3d('cartao_visita'), null, [0, 2, 0], 0.5));
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = { zero: e('Do zero', 'azul'), vazio: e('Sem clientes', 'vermelho'), indica: e('Esperando indicação', 'laranja'), aluguel: e('Aluguel', 'vermelho'), nicho: e('Estúdios de design · São Paulo', 'azul'), um: e('Um por um', 'vermelho'), min: e('2 minutos', 'verde'), quem: e('Quem primeiro?', 'laranja'), com: e('65 com site', 'azul'), sem: e('34 sem site', 'verde'), falar: e('Com quem falar', 'verde'), chamar: e('99 pra chamar', 'azul') };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Que tipo de empresa entrava na sua lista? <em>Comenta aí</em>');
    fx.festa = K.festa([-0.2, 2.6, 1]);
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));

  const P = {
    gancho(B, tc) {
      // NA TELA: o contador grande no centro; o José à direita · MOSTRA: contador, personagem
      const tL = quando('lista', B, 0.25), tZ = quando('zero', B, 0.85), C = CS.todos.agencia;
      ve(contador); K.entrar(contador.g, 'cai', tc - tL + 0.5, { altura: 4 });
      contador.mostrar('contador', { n: Math.round(99 * K.suave(K.clamp((tc - tZ) / 0.5))) });
      // PERSONAGEM: susto, depois aponta na palavra "zero"
      menino.colocar(C.personagem, [-0.5, 1.2, 0]);
      if (tc > tZ) { menino.apontar(0.7); menino.humor('surpreso'); } else menino.reagir('susto', B.t);
      fx.et.zero.em([-0.5, 2.3, 0.2], tc - tZ);
      K.som('baque', tL - 0.2, 0.7); K.som('ding', tZ, 0.6);
      K.filmar([contador, menino], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.2 });
    },
    jose(B, tc) {
      const tA = quando('agenda', B, 0.65), tV = quando('vazia', B, 0.9), pos = [0.5, 0, 0.5];
      ve(agenda); K.entrar(agenda, 'gira', tc - tA, { dur: 0.4 });
      menino.colocar(pos, [0.5, 0, 4]);
      if (tc > tV) menino.reagir('triste', tc - tV); else if (tc > tA) { menino.olharPara([-1.2, 1.3, 0.2]); menino.apontar(0.6); } else menino.reagir('mostrando', B.t);
      fx.et.vazio.em([-1.2, 2.3, 0.3], tc - tV);
      K.som('whoosh', tA, 0.5); K.som('errado', tV, 0.5);
      K.filmar([menino, agenda], 'chegando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho' });
    },
    celular(B, tc) {
      const tI = quando('indicação', B, 0.4), tC = quando('celular', B, 0.85), m = mais(SOFA, [0, 0, 0.2]);
      ve(cel); cel.g.scale.setScalar(2.2 * pop(tc - tI + 0.6));
      menino.colocar(m, mais(cel.g.position.toArray(), [0, 0, 0]));
      if (tc > tC) menino.reagir('segurando', tc - tC); else menino.reagir('pensando', B.t);
      fx.et.indica.em(mais(SOFA, [0.3, 2.15, 0.6]), tc - tI);
      K.som('bip', tC, 0.35);
      K.filmar([cel.g.position.toArray(), menino], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 0.8 });
    },
    aluguel(B, tc) {
      const tA = quando('aluguel', B, 0.55), pos = [0.75, 0, 0.75];
      ve(contas); K.entrar(contas, 'cai', tc - tA, { altura: 5 });
      contas.rotation.z = Math.sin((tc - tA) * 7) * 0.02 * K.clamp(1 - (tc - tA) / 1.2);
      menino.colocar(pos, [-0.7, 0.6, 0.2]);
      if (tc > tA) menino.reagir('cansado', tc - tA); else menino.reagir('duvida', B.t);
      fx.et.aluguel.em([-0.7, 2.05, 0.4], tc - tA);
      K.som('baque', tA + 0.2, 0.8);
      K.filmar([contas, menino], 'descendo', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
    },
    escolhe(B, tc) {
      const C = CS.todos.cidade_maquete, tA = quando('atrás', B, 0.15), tD = quando('design', B, 0.72), de = [1.7, 0.12, 5], ate = C.personagem;
      ve(lupa); K.entrar(lupa, 'cai', tc - tA, { altura: 3 });
      lupa.position.x = -1.2 + K.suave(K.clamp((tc - tA) / (B.ate - tA))) * 1.7;
      pinos.forEach((p, i) => { ve(p); p.em(tc + i, pop(tc - tD - i * 0.09)); });
      for (let i = 0; i < pinos.length; i++) K.som('bip', tD + i * 0.09, 0.2);
      const x = K.faixa(B.p, 0, 0.55);
      menino.irPara(de, ate, x, tc, { olhar: [0, 1.5, 0] });
      if (tc > tD) menino.reagir('ideia', tc - tD);
      fx.et.nicho.em([0, 3.5, 0], tc - tD);
      K.som('whoosh', tA, 0.6);
      K.filmar([lupa, menino], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'alto', espacoCima: 0.1 });
    },
    um_por_um(B, tc) {
      const C = CS.todos.cidade_maquete, tD = quando('dia', B, 0.6), tI = quando('inteiro', B, 0.85), tU = quando('um', B, 0.2), m = relogio.userData.m3d;
      ve(relogio); K.entrar(relogio, 'cai', tc - tD, { altura: 3 });
      const g = K.clamp((tc - tD) / (B.ate - tD)); m.m.rotation.z = -g * 18; m.h.rotation.z = -1.57 - g * 3;
      pinos.slice(0, 3).forEach((p, i) => { ve(p); p.em(tc + i, 1); });
      const vai = Math.sin(B.t * 2.4) * 0.8, pos = [vai, 0.12, 0.8];
      if (tc > tI) { menino.colocar(pos, [0, 1.5, 3]); menino.reagir('cansado', tc - tI); }
      else { menino.colocar(pos, Math.cos(B.t * 2.4) > 0 ? [5, 0.12, 0.8] : [-5, 0.12, 0.8]); menino.correr(tc, 1.3); menino.humor('assustado'); }
      void C; fx.et.um.em([-0.2, 4.1, 0.2], tc - tU);
      K.som('zumbido', tD, 0.5);
      K.filmar([relogio, menino], 'chegando', B.p, { plano: 'medio', lado: -22, altura: 'alto', obstaculos: false });
    },
    site(B, tc) {
      const tS = quando('site', B, 0.2), tE = quando('escreve', B, 0.5), tC = quando('cidade', B, 0.9), pos = [1.25, 0, 0.8];
      ve(comp, telaAg); K.entrar(telaAg.g, 'sobe', tc - tS, { dur: 0.5 });
      telaAg.mostrar('busca', { nicho: 'estúdios de design', estado: 'SP', cidade: 'São Paulo', digitado: K.clamp((tc - tE) / Math.max(0.3, tC - tE)) });
      menino.colocar(pos, [-0.55, 1.2, 0.1]);
      if (tc > tC) menino.apontar(0.7); else menino.reagir('segurando', B.t);
      K.som('clique', tE, 0.5); K.som('clique', tE + 0.2, 0.4); K.som('clique', tE + 0.4, 0.4);
      K.filmar([telaAg, menino], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa_rotulo(B, tc) {
      const tM = quando('Mappoa', B, 0.4);
      ve(logo, robo); logo.g.rotation.y = K.suave(K.clamp((tc - tM + 0.2) / 0.6)) * 6.283;
      robo.g.position.set(K.lerp(-3.5, -0.95, K.suave(K.clamp(B.t / 0.5))), 0, 0.5); robo.g.rotation.y = 0.35; robo.em(tc, { acena: 1, mapa: false });
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      K.filmar([logo, robo], 'girando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', angulo: 16 });
    },
    captura(B, tc) {
      const tM = quando('mapa', B, 0.3), tS = quando('salvando', B, 0.55), g = K.clamp((tc - tM) / (B.ate - tM));
      ve(robo, telaC1); K.entrar(telaC1.g, 'desliza', tc - tM, { de: [3, 0, 0], dur: 0.4 });
      const novos = Math.round(g * 72);
      telaC1.mostrar('captura', { busca: BUSCA, novos, progresso: g * 0.8, etapa: Math.min(4, 1 + Math.floor(g * 4)) });
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { mapa: true });
      menino.colocar([2.15, 0, 1.3], [0.8, 1.2, 0.1]);
      if (tc > tS) menino.reagir('surpreso', tc - tS); else menino.reagir('pensando', B.t);
      for (let i = 0; i < 7; i++) K.som('bip', tS + i * 0.14, 0.25);
      K.filmar([robo, telaC1], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },
    noventa_e_nove(B, tc) {
      const tM = quando('minutos', B, 0.3), tN = quando('noventa', B, 0.5), tE = quando('empresas', B, 0.9);
      ve(telaC2); const g = K.clamp((tc - tN) / 0.7);
      telaC2.mostrar('resultado', { busca: BUSCA, encontrados: Math.round(g * 99), novos: Math.round(g * 99), duracao: '2min 7s' });
      fx.et.min.em([0, 3.2, 1], tc - tM);
      menino.colocar([1.1, 0, 2.2], [0, 1.4, 0.8]);
      if (tc > tE) menino.reagir('vitoria', tc - tE); else menino.reagir('surpreso', B.t);
      fx.festa.em(tc - tE);
      K.som('certo', tE, 0.7);
      K.filmar(telaC2, 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho' });
    },
    quem_primeiro(B, tc) {
      const tL = quando('lista', B, 0.15), tQ = quando('Quem', B, 0.55), tP = quando('primeiro', B, 0.85);
      ve(pilha); K.entrar(pilha, 'sobe', tc - tL, { dur: 0.5 });
      pilha.rotation.z = tc > tP ? Math.sin((tc - tP) * 9) * 0.05 : 0;
      menino.colocar([1.45, 0, 0.75], [-0.2, 1.8, 0]);
      if (tc > tP) menino.reagir('duvida', tc - tP); else menino.reagir('surpreso', B.t);
      fx.et.quem.em([-0.2, 2.75, 0.2], tc - tQ);
      K.som('whoosh', tL, 0.5); K.som('range', tP, 0.6);
      K.filmar([pilha, menino], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    separa(B, tc) {
      const tS = quando('separa', B, 0.12), t6 = quando('sessenta', B, 0.3), t3 = quando('trinta', B, 0.65);
      ve(peneira, robo); K.entrar(peneira.g, 'cai', tc - tS, { altura: 3 }); peneira.em(tc, 0.8);
      robo.g.position.set(-0.1, 0, -0.9); robo.g.rotation.y = 0; robo.em(tc, { acena: 0, mapa: false, olhar: [0, -0.2] });
      const cres = (t0, m) => { ve(m); const k = K.clamp((tc - t0) / 0.7); m.scale.setScalar(1.15 * Math.max(0.02, k)); };
      cres(t6, monteA); cres(t3, monteB);
      cartoes.forEach((c, i) => {
        const dir = i % 12 < 8 ? -1.25 : 1.05, t0 = (i % 12 < 8 ? t6 : t3) + (i % 4) * 0.13, d = (tc - t0) / 0.5;
        if (d <= 0 || d >= 1) return; ve(c); c.position.set(K.lerp(-0.1, dir, d), K.lerp(2.55, 0.5, d * d), K.lerp(0.1, 0.5, d)); c.rotation.set(d * 3, i, d * 2);
      });
      menino.colocar([1.95, 0, 1.15], [0, 1, 0.4]);
      if (tc > t3) menino.reagir('vitoria', tc - t3); else menino.apontar(0.3);
      fx.et.com.em([-1.25, 1.35, 0.8], tc - t6); fx.et.sem.em([1.05, 1.35, 0.8], tc - t3);
      K.som('whoosh', tS, 0.5); K.som('ding', t6, 0.6); K.som('ding', t3, 0.6);
      K.filmar([peneira, robo], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    analise(B, tc) {
      const tA = quando('análise', B, 0.1), tD = quando('dores', B, 0.35), tF = quando('falar', B, 0.78);
      ve(telaM, robo); K.entrar(telaM.g, 'desliza', tc - tA, { de: [-3, 0, 0], dur: 0.4 });
      const ate = tc > tF ? 4 : tc > tD ? 2 : 0;
      telaM.mostrar('analise', { nome: 'Studio Pixel Design', ate, aderencia: K.clamp((tc - tA) / 0.8) * 0.82 });
      robo.g.position.set(-1.7, 0, 0.7); robo.g.rotation.y = 0.5; robo.em(tc, { acena: 0.7, mapa: false });
      menino.colocar([1.35, 0, 0.9], [-0.35, 1.5, 0.1]);
      if (tc > tF) menino.reagir('ideia', tc - tF); else menino.reagir('pensando', B.t);
      K.som('clique', tD, 0.5); K.som('clique', tF, 0.5);
      K.filmar([telaM, robo], 'chegando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho' });
    },
    lixo(B, tc) {
      const tI = quando('igual', B, 0.25), tL = quando('lixo', B, 0.85), de = [-1.1, 1.25, 0.5], ate = [1.35, 1.1, 0.3];
      ve(lixeira);
      envelopes.forEach((e, i) => {
        const t0 = tI + i * 0.2, d = (tc - t0) / 0.55; if (d <= 0) return; if (d >= 1 && tc > tL + 0.4) return;
        ve(e); const q = K.clamp(d); e.position.set(K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) + Math.sin(q * Math.PI) * 1.2, K.lerp(de[2], ate[2], q)); e.rotation.z = q * 5; if (i < 3) K.som('whoosh', t0, 0.25);
      });
      menino.colocar([-1.6, 0, 0.5], [1.3, 1, 0.3]);
      if (tc > tL) menino.reagir('triste', tc - tL); else menino.reagir('empurrando', B.t);
      const [x, y] = K.tela([1.35, 2.1, 0.3]);
      fx.errado.em({ tela: [x, y - 40] }, tc - tL);
      K.som('errado', tL, 0.6);
      K.filmar([[0, 1.5, 0.3], lixeira, menino], 'passando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.05 });
    },
    mensagem(B, tc) {
      const tMsg = quando('mensagem', B, 0.2), tM = quando('manda', B, 0.92);
      ve(telaAg); K.entrar(telaAg.g, 'sobe', tc - tMsg, { dur: 0.45 });
      telaAg.mostrar('mensagem', { digitado: K.clamp((tc - tMsg - 0.3) / Math.max(0.5, tM - tMsg - 0.4)) });
      ve(balao); balao.scale.setScalar(0.95 * pop(tc - tM)); balao.position.y = 3.05 + K.clamp(tc - tM) * 0.25;
      menino.colocar([1.1, 0, 0.85], [-0.55, 1, 0.1]);
      if (tc > tM) { menino.reagir('vitoria', tc - tM); } else menino.reagir('mostrando', B.t);
      const [x, y] = K.tela([0.55, 3.25, 0.35]);
      fx.certo.em({ tela: [x + 120, y - 20] }, tc - tM);
      K.som('clique', tM, 0.7); K.som('ding', tM + 0.1, 0.7);
      K.filmar([telaAg, menino], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },
    alvo(B, tc) {
      const tF = quando('falar', B, 0.88), d = K.clamp((tc - tF + 0.3) / 0.3);
      ve(alvo); K.entrar(alvo, 'cresce', B.t - 0.05, { dur: 0.35 });
      alvo.children.slice(5, 7).forEach((p, i) => { if (p.userData.z0 == null) p.userData.z0 = p.position.z; p.visible = d > 0; p.position.z = p.userData.z0 + (1 - d) * 3.2; void i; });
      alvo.rotation.z = tc > tF ? Math.sin((tc - tF) * 30) * 0.03 * K.clamp(1 - (tc - tF) * 2) : 0;
      menino.colocar([1.25, 0, 0.5], [-0.2, 1.5, -0.2]);
      if (tc > tF) menino.apontar(0.8); else menino.reagir('pensando', B.t);
      fx.et.falar.em([-0.2, 3.0, 0], tc - tF);
      K.som('estalo', tF, 0.8);
      K.filmar([alvo, menino], 'chegando', B.p, { plano: 'perto', lado: -10, altura: 'olho' });
    },
    antes_agora(B, tc) {
      const tA = quando('Agora', B, 0.45), tC = quando('chamar', B, 0.92), dep = tc > tA;
      if (!dep) {
        ve(cel); cel.g.scale.setScalar(2.2);
        menino.colocar(mais(SOFA, [0, 0, 0.2]), cel.g.position.toArray()); menino.reagir('triste', B.t);
        K.filmar([cel.g.position.toArray(), menino], 'afastando', K.clamp(B.t / (tA - B.inicio)), { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 0.8 });
      } else {
        ve(funil); funil.mostrar('funil', { nome: 'LISTA DO JOSÉ', mover: K.clamp((tc - tA - 0.5) / 0.9) });
        menino.colocar([1.25, 0, 0.9], [-0.5, 1.8, -0.8]);
        if (tc > tC) menino.reagir('vitoria', tc - tC); else menino.reagir('mostrando', tc - tA);
        fx.et.chamar.em([-0.5, 3.25, -0.5], tc - tC);
        K.som('certo', tC, 0.6);
        K.filmar([funil, menino], 'afastando', K.clamp((tc - tA) / (B.ate - tA)), { plano: 'medio', lado: 'frente', altura: 'olho' });
      }
    },
    segue(B, tc) {
      const tQ = quando('Que', B, 0.02), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.62), tTe = quando('testa', B, 0.86);
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
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
      robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], [0.5, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(contador, robo, pilha); contador.mostrar('contador', { n: 0 });
      pilha.position.set(-2.0, 0, 0.5); pilha.scale.setScalar(1.15);
      robo.g.position.set(-1.9, 0, 1.0); robo.g.rotation.y = 0.5; robo.em(1, { mapa: false, acena: 1 });
      menino.colocar([1.1, 0, 0.9], [-0.5, 1.4, 0]); menino.reagir('susto', 0.5);
      K.filmar([contador, menino, robo], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'agencia');
    menino.g.visible = false;
    tudo.forEach((g) => { g.visible = false; });
    pilha.position.set(-0.2, 0, 0); pilha.scale.setScalar(2.2);
    lupa.position.x = -0.5;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
