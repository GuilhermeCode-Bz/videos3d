// O cliente cancelou hoje. Se ele era o único, você tá sem renda (canal Mappoa).
// Cinco cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  let bl, CS, C, menino, dona, mecanico, robo, comp, cel, celMapa, agenda, graf, tablet, pote, contrato, telaC, telaM, navG, imob, imobMq;
  const tudo = [], fx = {}, moedas = [], pinos = [], duvidas = [], interrog = [], alvos = [], predios = [], halos = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const lerp3 = (a, b, k) => [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k), K.lerp(a[2], b[2], k)];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'home_office', antes: 'cidade', vazia: 'home_office', perdido: 'home_office', erro: 'cidade_maquete',
    virada: 'cidade_maquete', oficina: 'oficina', lista: 'home_office', mappoa: 'mundo_mappoa', antes_agora: 'home_office',
    segue: 'home_office', cartao: 'home_office', capa: 'home_office'
  };
  // Home office: o computador do Lucas na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33], LUCAS = [0.45, 0, -0.2];
  const CEL_G = [-0.55, 1.6, 0.7], GRAF = [-2.15, 0.95, 0.35], AG_P = [-2.05, 2.0, -1.0];
  const AG_V = [1.05, 2.45, -0.75], POTE = [1.35, 0.18, 0.35], MAPA = [-0.55, 1.55, 0.95], L_PERD = [0.65, 0, 0.55];
  // Cidade: o calçadão em y = 0,14; a imobiliária a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, IMB_X = -24.5, IMB_Z = -0.3, L_CID = [-22.9, G, 4.3], DONA = [-25.3, G, 3.5], AG_CID = [-21.3, 2.0, 4.0];
  // Maquete: o Lucas no quarteirão do meio; a imobiliária atrás dele; as 3 oficinas que já têm o problema, no fundo
  const L_MQ = [0.55, 0.12, 0.75], IMB_MQ = [-0.1, 0.12, -0.1], ALV = [[-0.85, 0.12, -0.7], [0, 0.12, -0.95], [0.85, 0.12, -0.7]];
  const INTERR = [[2.6, 1.9, 0], [-2.6, 1.9, 0], [0, 2.0, -2.6], [2.6, 2.1, -2.6], [-2.6, 2.1, -2.6], [2.6, 1.8, 2.6], [-2.6, 1.8, 2.6], [-1.3, 2.0, -1.9]];
  // Oficina: o carro no elevador em x -3,1; o mecânico perto dele, o Lucas à direita
  const MEC = [-2.2, 0, -1.0], L_OF = [-0.5, 0, 0.4], TELA_OF = [0.9, 1.6, -0.3];
  const OFICINAS = [
    { nome: 'Mecânica Boa Vista', end: 'Rua Blumenau, 1840', chips: ['whats', 'tel'] },
    { nome: 'Auto Center Rota Sul', end: 'Av. Santos Dumont, 3200', chips: ['tel', 'insta'] },
    { nome: 'Oficina Dois Irmãos', end: 'Rua Dona Francisca, 905', chips: ['whats'] },
    { nome: 'Freios & Cia', end: 'Rua Ottokar Doerffel, 410', chips: ['whats', 'insta'] }
  ];
  const PINO_COR = ['#e8352b', '#1067f8', '#00bc7b', '#ffb020', '#8b5cf6', '#e8537a', '#0ea5d9', '#ff7a1a', '#16a34a', '#d97706'];

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
  // A conversa de WhatsApp com o cliente: o histórico tranquilo e, se "cancela", a mensagem do fim do contrato
  function chat(c, w, h, nome, cancela, msgFim, cinza) {
    c.fillStyle = cinza ? '#e4e4e4' : '#efe7dd'; c.fillRect(0, 0, w, h);
    c.fillStyle = cinza ? '#6b6b6b' : '#075e54'; c.fillRect(0, 0, w, h * 0.13);
    const f = w * 0.062;
    txt(c, nome, w * 0.06, h * 0.05, f * 1.05, '#fff', 800, 'left', w * 0.88);
    txt(c, 'WhatsApp', w * 0.06, h * 0.095, f * 0.75, '#cfe9df', 600);
    const lista = [['eu', 'Site atualizado ✓'], ['ele', 'Obrigada, Lucas!'], ['eu', 'Mês que vem tem mais 🙂']];
    if (cancela) lista.push(['fim', msgFim]); else lista.push(['dig', 'digitando...']);
    let y = h * 0.93;
    for (let i = lista.length - 1; i >= 0 && y > h * 0.16; i--) {
      const [quem, s] = lista[i], fim = quem === 'fim';
      if (quem === 'dig') { txt(c, s, w * 0.06, y - f, f * 0.9, '#25a35a', 700, 'left'); y -= f * 2.2; continue; }
      const ft = fim ? f * 1.15 : f;
      c.font = `${fim ? 900 : 700} ${ft}px Montserrat, sans-serif`;
      if (fim) {
        // a mensagem grande, em duas linhas, com a borda vermelha
        const bw = w * 0.86, bh = ft * 4.4; y -= bh;
        rr(c, w * 0.06, y, bw, bh, f * 0.6, cinza ? '#d6d6d6' : '#fff');
        c.strokeStyle = cinza ? '#8a8a8a' : '#e8352b'; c.lineWidth = 5; c.beginPath(); c.roundRect(w * 0.06, y, bw, bh, f * 0.6); c.stroke();
        const [l1, l2] = s.split('|');
        txt(c, l1, w * 0.1, y + bh * 0.3, ft, '#111b21', 900, 'left', bw - w * 0.08);
        txt(c, l2, w * 0.1, y + bh * 0.7, ft, cinza ? '#555' : '#c0262d', 900, 'left', bw - w * 0.08);
        y -= f * 0.55; continue;
      }
      const bw = Math.min(w * 0.82, c.measureText(s).width + w * 0.08), bh = f * 2.0;
      y -= bh;
      const x = quem === 'eu' ? w * 0.94 - bw : w * 0.06;
      rr(c, x, y, bw, bh, f * 0.6, quem === 'eu' ? (cinza ? '#d0d0d0' : '#d9fdd3') : '#fff');
      txt(c, s, x + w * 0.04, y + bh / 2, f, '#111b21', 700, 'left', bw - w * 0.06);
      y -= f * 0.55;
    }
  }
  const FIM_IMOB = 'Oi, Lucas. Vamos encerrar|o contrato do site.';
  const FIM_OUTRO = 'Oi, Lucas. Vamos pausar|o site por um tempo.';
  // O Maps no celular grande, cheio de pinos de todo tipo
  function mapaTodos(c, w, h, n) {
    c.fillStyle = '#e8eee4'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.035;
    for (let i = 1; i < 5; i++) { c.beginPath(); c.moveTo(0, h * i / 5); c.lineTo(w, h * i / 5 + h * 0.04); c.stroke(); c.beginPath(); c.moveTo(w * i / 4, 0); c.lineTo(w * i / 4 - w * 0.05, h); c.stroke(); }
    rr(c, w * 0.04, h * 0.03, w * 0.92, h * 0.07, h * 0.035, '#fff'); txt(c, 'empresas perto de mim', w * 0.09, h * 0.065, w * 0.055, '#5f6368', 700, 'left', w * 0.8);
    for (let i = 0; i < n; i++) {
      const x = w * (0.12 + ((i * 37) % 76) / 100), y = h * (0.18 + ((i * 53) % 72) / 100);
      c.fillStyle = PINO_COR[i % PINO_COR.length]; c.beginPath(); c.arc(x, y, w * 0.04, 0, 7); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, w * 0.015, 0, 7); c.fill();
    }
  }
  // A ficha do Maps da oficina no celular: a linha "Site" vazia
  function fichaOficina(c, w, h, vazio) {
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    const f = w * 0.065;
    rr(c, w * 0.04, h * 0.03, w * 0.92, h * 0.07, h * 0.035, '#f1f3f4'); txt(c, 'oficina mecânica joinville', w * 0.09, h * 0.065, f * 0.8, '#202124', 700, 'left', w * 0.8);
    c.fillStyle = '#d7e8d0'; c.fillRect(0, h * 0.12, w, h * 0.2);
    c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w / 2, h * 0.2, w * 0.05, 0, 7); c.fill();
    txt(c, 'Mecânica Boa Vista', w * 0.06, h * 0.37, f * 1.1, '#202124', 900, 'left', w * 0.88);
    txt(c, '★★★★★  Oficina mecânica', w * 0.06, h * 0.43, f * 0.8, '#f9ab00', 800, 'left', w * 0.88);
    rr(c, w * 0.06, h * 0.49, w * 0.4, h * 0.07, h * 0.035, '#1067f8'); txt(c, 'Ligar', w * 0.26, h * 0.525, f * 0.9, '#fff', 800, 'center');
    txt(c, 'Site:', w * 0.06, h * 0.65, f, '#5f6368', 800);
    if (vazio) { rr(c, w * 0.04, h * 0.69, w * 0.92, h * 0.09, h * 0.03, '#fde8e8'); txt(c, '— não tem', w * 0.08, h * 0.735, f * 1.05, '#c0262d', 900); }
    else txt(c, 'carregando...', w * 0.06, h * 0.73, f * 0.9, '#9aa0a6', 700);
  }
  // O site da imobiliária, no tablet e no monitor do Lucas
  function siteImob(c, w, h) {
    c.fillStyle = '#f4f7fb'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#1d4ed8'); d.addColorStop(1, '#0ea5d9'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.3);
    txt(c, 'Lar Novo', w * 0.06, h * 0.12, w * 0.085, '#fff', 900); txt(c, 'Imóveis · Joinville', w * 0.06, h * 0.22, w * 0.045, '#fff', 700);
    txt(c, 'Encontre seu lar', w * 0.06, h * 0.42, w * 0.06, '#0f172a', 900);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.52, w * 0.27, h * 0.4, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.55, w * 0.23, h * 0.2, 8, ['#bfdbfe', '#fde68a', '#bbf7d0'][i]); });
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['home_office', 'cidade', 'cidade_maquete', 'oficina', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A agenda do Lucas: as páginas em branco
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
      if (e.cinza) { c.fillStyle = 'rgba(120,120,120,.25)'; c.fillRect(0, 0, w, h); }
    };
    // Os meses do contrato, cada um com o ✓ do site cuidado
    T.meses = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#1d4ed8'; c.fillRect(0, 0, w, h * 0.2);
      txt(c, 'TODO MÊS', w / 2, h * 0.1, w * 0.1, '#fff', 900, 'center');
      ['AGO', 'SET', 'OUT', 'NOV'].forEach((m, i) => {
        const x = w * (0.04 + i * 0.24), y = h * 0.26;
        rr(c, x, y, w * 0.21, h * 0.68, 14, '#f1f5f9');
        txt(c, m, x + w * 0.105, y + h * 0.1, w * 0.06, '#0f172a', 900, 'center');
        if (e.n > i) txt(c, '✓', x + w * 0.105, y + h * 0.42, w * 0.13, '#00bc7b', 900, 'center');
      });
    };
    // O contrato que rasga
    T.contrato = (c, w, h, e) => {
      c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
      txt(c, 'CONTRATO', w / 2, h * 0.2, w * 0.12, '#0f172a', 900, 'center');
      c.fillStyle = '#cbd5e1'; for (let i = 0; i < 4; i++) c.fillRect(w * 0.12, h * (0.38 + i * 0.13), w * 0.76, h * 0.04);
      if (e.x) { c.globalAlpha = Math.min(1, e.x); c.strokeStyle = '#e8352b'; c.lineWidth = w * 0.05; c.beginPath(); c.moveTo(w * 0.15, h * 0.15); c.lineTo(w * 0.85, h * 0.9); c.moveTo(w * 0.85, h * 0.15); c.lineTo(w * 0.15, h * 0.9); c.stroke(); c.globalAlpha = 1; }
    };
    // A lista das oficinas de Joinville, no grupo SEM SITE, sem os totais da captura
    T.listaOficinas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: OFICINAS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Oficinas mecânicas · Joinville, SC', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      if (e.pilula) { rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center'); }
    };
    // A análise da Mecânica Boa Vista: a aderência com o score, as dores e as oportunidades
    T.analiseOficina = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Mecânica Boa Vista', ate: e.ate, aderencia: 0.89 * k,
        dores: ['Sem site próprio', 'Cliente só acha pelo Maps'], oportunidades: ['Site com orçamento pelo WhatsApp'],
        objecoes: ['"Cliente meu vem por indicação"'], abordagem: 'Mostre quem procura oficina no Google e acha o concorrente.'
      });
      if (e.ate >= 0) { txt(c, Math.round(89 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right'); }
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Lucas (do canal), a dona da imobiliária, o mecânico e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dona = K.boneco({ tipo: 'menina', roupa: 'camiseta', cores: { camiseta: 0x8a929c, bermuda: 0x2f3540, tenis: 0x2a2e33, cabelo: 0x2a1a10, pele: 0xd9a070 } });
    K.semNome(dona.g); K.nomear('dona', dona.g);
    mecanico = K.boneco({ roupa: 'moletom', cores: { moletom: 0x1f2f5a, punho: 0x1f2f5a, calca: 0x1f2f5a, mochila: 0x1f2f5a, tenis: 0x2a2e33, cabelo: 0x3a2a1a, pele: 0xb97a50 } });
    K.semNome(mecanico.g); K.nomear('mecanico', mecanico.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Os celulares: o da conversa (gigante no gancho, na mão nas outras) e o do Maps cheio de pinos
    cel = K.celular(); guarda(cel, 'celular', CEL_G, 5.5);
    celMapa = K.celular(); guarda(celMapa, 'mapa', MAPA, 3);
    // O gráfico da renda: as barras dos meses, a do mês caindo pro zero
    graf = K.m3d('grafico_barras', { alturas: [1.0, 1.1, 1.2, 1.3] }); guarda(graf, 'grafico', GRAF, 0.75);
    graf.userData.cores = graf.userData.m3d.barras.map((b) => b.material);
    fx.matVermelho = K.mat(0xe8352b);
    agenda = K.painelMappoa(1.1, 1.0, { px: 700, borda: '#e8352b' }); guarda(agenda, 'calendario', AG_P);

    // Home office: o computador, o pote das moedas, o contrato e a barra do endereço
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    pote = K.malha(new THREE.CylinderGeometry(0.26, 0.22, 0.36, 24), K.mat(0x2fb5a6)); K.scene.add(pote); guarda(pote, 'pote', POTE);
    const ouro = K.mat(0xffc531, { metalness: 0.6, roughness: 0.3 });
    for (let i = 0; i < 5; i++) { const m = K.malha(new THREE.CylinderGeometry(0.11, 0.11, 0.035, 24), ouro); K.scene.add(m); moedas.push(guarda(m, 'moedas', mais(POTE, [0, 0.2 + i * 0.04, 0]))); }
    contrato = K.painelMappoa(0.8, 0.95, { px: 500, borda: '#0f172a' }); guarda(contrato, 'contrato', mais(POTE, [0, 1.35, 0]));
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Home office, frase 4: os pinos que pulam do Maps e as dúvidas em volta da cabeça do Lucas
    for (let i = 0; i < 10; i++) pinos.push(guarda(K.m3d('pino', { cor: PINO_COR[i], tam: 0.55 }), null, MAPA));
    for (let i = 0; i < 3; i++) duvidas.push(guarda(K.placa('?', { larg: 0.42, alt: 0.5, fundo: '#ffffff', cor: '#e8352b', borda: '#e8352b' }), 'duvidas', mais(L_PERD, [0, 2.1, 0])));

    // Cidade: a fachada da Imobiliária Lar Novo e o tablet com o site
    imob = new THREE.Group(); imob.position.set(IMB_X, G, IMB_Z); K.scene.add(imob);
    K.modelo('kenney-cidade/building-small-a', { escala: 5, pos: [0, 0, 0], pai: imob });
    const placa = K.placa('Lar Novo Imóveis', { larg: 2.8, alt: 0.7, fundo: '#eaf1ff', cor: '#1d4ed8', borda: '#1d4ed8' }); K.scene.remove(placa); placa.position.set(0, 3.15, 2.62); imob.add(placa);
    guarda(imob, 'imobiliaria');
    tablet = K.m3d('tablet'); guarda(tablet, 'tablet', mais(L_CID, [0.3, 1.0, 0.4]), 0.9);

    // Maquete: a imobiliária que afunda, os "?" em cima dos prédios e as 3 oficinas que já têm o problema
    imobMq = guarda(K.m3d('prediozinho', { cor: 0x1d4ed8, a: 1.3, placa: 'LAR NOVO' }), 'imob_mq', IMB_MQ, 0.8);
    INTERR.forEach((p) => interrog.push(guarda(K.placa('?', { larg: 0.9, alt: 1.05, fundo: '#ffffff', cor: '#0f172a', borda: '#0f172a' }), 'interrogacoes', p)));
    ALV.forEach((p, i) => {
      predios.push(guarda(K.m3d('prediozinho', { cor: [0xffd08a, 0xc7d2fe, 0xffd08a][i], a: 1.2, placa: 'OFICINA' }), 'predios', p, 0.8));
      alvos.push(guarda(K.m3d('alvo'), 'alvos', mais(p, [0, 1.75, 0.15]), 0.45));
      halos.push(guarda(K.halo(0xffa63d, 1.6), null, mais(p, [0, 0.7, -0.2])));
    });

    // As telas do Mappoa: a lista (sobe do computador / ao lado do Lucas na oficina) e a análise no palco
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [-0.45, 1.75, 0.15]);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      unico: e('Único cliente', 'laranja'), designer: e('Web designer', 'azul'), semPag: e('Sem pagamento', 'vermelho'),
      vazia: e('Agenda vazia', 'vermelho'), vou: e('Vou atrás!', 'verde'), como: e('Como?', 'azul'), quem: e('Pra quem?', 'laranja'),
      erro: e('O erro', 'laranja'), proximo: e('Quem é o próximo?', 'azul'), problema: e('Já tem o problema', 'laranja'),
      semSite: e('Sem site', 'vermelho'), semSite2: e('Sem site', 'laranja'), precisa: e('Precisa de você', 'verde'),
      zerado: e('Mês zerado', 'vermelho'), proximos: e('Os próximos', 'verde')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Quantos clientes você tem hoje? <em>Comenta aí</em>');
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  // O celular na mão do Lucas (pos = onde ele está)
  function celNaMao(pos, op = {}) {
    cel.g.scale.setScalar(op.esc || 1.8);
    cel.g.position.set(pos[0] + (op.dx || 0.3), pos[1] + 1.05, pos[2] + 0.4); cel.g.rotation.set(-0.25, op.giro || 0.25, 0);
  }
  const desenhaChat = (nome, cancela, fim, cinza) => cel.tela.desenhar((c, w, h) => chat(c, w, h, nome, cancela, fim, cinza), 'chat' + nome + (cancela ? 'x' : '') + (cinza ? 'c' : ''));
  // O gráfico da renda: k = quanto a barra do mês já caiu; vermelho = as barras ficam vermelhas
  function grafico(k, vermelho) {
    const r = graf.userData.m3d, al = [1.0, 1.1, 1.2, 1.3];
    r.barras.forEach((b, i) => { b.scale.y = i === 3 ? Math.max(0.02, al[i] * (1 - K.clamp(k))) : al[i]; b.material = vermelho ? fx.matVermelho : graf.userData.cores[i]; });
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o celular gigante com a conversa da imobiliária; o gráfico da renda à esquerda; o Lucas à direita · MOSTRA: celular, grafico, personagem
      // CENÁRIO: home office de dia; o ring light e a planta (o cenário cuida)
      const tC = quando('cancelou', B, 0.2), tU = quando('único', B, 0.5), tR = quando('renda', B, 0.85);
      ve(cel, comp, graf); comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
      // ENTRA AGORA: o "digitando..." no 1º quadro; a mensagem do fim do contrato cai em "cancelou"
      desenhaChat('Imobiliária Lar Novo', tc > tC, FIM_IMOB);
      const tranco = tc > tC && tc < tC + 0.35 ? Math.sin((tc - tC) * 60) * 0.04 : 0;
      cel.g.position.set(CEL_G[0] + tranco, CEL_G[1], CEL_G[2]);
      // OBJETOS SE MEXENDO: o gráfico surge em "único" e a barra do mês despenca em "renda"
      graf.scale.setScalar(0.75 * (tc > tU ? pop(tc - tU) : 1));
      grafico(tc > tR ? (tc - tR) / 0.4 : 0, tc > tU);
      // PERSONAGEM: começo segurando o celular · em "cancelou": susto · em "renda": desespero (susto de novo, assustado)
      const pos = [0.85, 0, 0.55];
      menino.colocar(pos, tc > tR ? GRAF : [0.6, 1.4, 5]);
      if (tc > tR) { menino.reagir('susto', tc - tR); menino.humor('assustado'); menino.suar(tc - tR); }
      else if (tc > tC) menino.reagir('susto', tc - tC); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: "Único cliente" em "único" · ✗ em "renda"
      fx.et.unico.em(mais(GRAF, [0.3, 1.45, 0.2]), tc - tU);
      K.som('bip', tC, 0.6); K.som('errado', tU, 0.5); K.som('desliga', tR, 0.6);
      // CÂMERA: chegando · perto · frente · olho, topo livre
      K.filmar([CEL_G, mais(GRAF, [0, 0.6, 0]), mais(pos, [0, 0.9, 0])], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.3, tam: 1.4, obstaculos: false });
      const [x, y] = K.tela(mais(GRAF, [0.4, 1.1, 0]));
      fx.errado.em({ tela: [x, y] }, tc - tR);
    },
    antes(B, tc) {
      // NA TELA: a fachada da Imobiliária Lar Novo; a dona na porta; o Lucas com o tablet; o calendário dos meses no ar · MOSTRA: imobiliaria, personagem, calendario
      // CENÁRIO: a cidade de dia; os carros passando (o cenário cuida)
      const tD = quando('designer', B, 0.2), tS = quando('site', B, 0.4), tI = quando('imobiliária', B, 0.7), tT = quando('todo', B, 0.82);
      ve(imob, tablet);
      tablet.position.set(...mais(L_CID, [-0.35, 1.0, 0.3])); tablet.rotation.set(-0.2, -0.7, 0); tablet.scale.setScalar(0.9 * pop(tc - tS + 0.35));
      // ENTRA AGORA: o calendário surge em "todo" e cada mês ganha um ✓
      if (tc > tT) {
        ve(agenda); agenda.g.position.set(...AG_CID); agenda.g.scale.setScalar(1.1 * pop(tc - tT)); agenda.g.rotation.set(0, -0.35, 0);
        const n = Math.min(4, 1 + Math.floor((tc - tT) / 0.22)); agenda.mostrar('meses', { n });
        for (let k = 0; k < 4; k++) K.som('bip', tT + k * 0.22, 0.3);
      }
      // PERSONAGEM: começo mostrando o tablet · em "mês": vitória curta. A dona: joia em "imobiliária"
      menino.colocar(L_CID, DONA);
      if (tc > tT + 0.6) menino.reagir('vitoria', tc - tT - 0.6); else menino.reagir('mostrando', B.t);
      dona.colocar(DONA, mais(L_CID, [0, 1.2, 0]));
      if (tc > tI) dona.reagir('segurando', tc - tI); else dona.reagir('duvida', B.t);
      // EFEITOS VISUAIS: "Web designer"
      fx.et.designer.em(mais(L_CID, [0, 2.1, 0]), tc - tD);
      K.som('ding', tS, 0.5);
      // CÂMERA: passando · médio · esquerda · olho
      K.filmar([mais([IMB_X, G, IMB_Z], [0.6, 2.4, 2.6]), mais(L_CID, [0, 1.0, 0]), DONA, AG_CID], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', tam: 1.8 });
    },
    vazia(B, tc) {
      // NA TELA: o pote das moedas; o contrato no ar; a agenda na parede; o Lucas na frente da mesa · MOSTRA: moedas, calendario, personagem
      const tCt = quando('contrato', B, 0.15), tSu = quando('sumiu', B, 0.5), tV = quando('vazia', B, 0.85);
      ve(comp, pote, agenda); comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
      agenda.g.position.set(...AG_V); agenda.g.scale.setScalar(1.0);
      agenda.mostrar('agenda', { pag: tc > tV ? 1 + Math.min(3, Math.floor((tc - tV) / 0.2)) : 0, cinza: tc > tV + 0.6 });
      // ENTRA AGORA: o contrato aparece e rasga em "contrato", depois cai e some
      if (tc > tCt && tc < tSu + 0.4) {
        ve(contrato); const q = K.clamp((tc - tSu) / 0.4);
        contrato.g.position.set(...mais(POTE, [0, 1.35 - q * 0.8, 0])); contrato.g.scale.setScalar(pop(tc - tCt) * (1 - q * 0.95)); contrato.g.rotation.set(0, 0, q * 0.8);
        contrato.mostrar('contrato', { x: K.clamp((tc - tCt - 0.3) / 0.3) });
      }
      // OBJETOS SE MEXENDO: as moedas saem do pote voando pra cima em "sumiu" e somem
      moedas.forEach((m, i) => {
        ve(m); const d = K.clamp((tc - tSu - i * 0.12) / 0.5);
        m.position.set(POTE[0] + Math.sin(i * 2) * d * 0.5, POTE[1] + 0.2 + i * 0.04 + d * d * 2.2, POTE[2] + Math.cos(i * 2) * d * 0.3);
        m.rotation.set(d * 6, 0, d * 3); m.scale.setScalar(Math.max(0.0001, 1 - K.clamp((d - 0.7) / 0.3)));
        if (i < 3) K.som('whoosh', tSu + i * 0.12, 0.3);
      });
      // PERSONAGEM: começo pensando, olhando o pote · em "sumiu": erguendo (tenta pegar a moeda) · em "vazia": triste, olhando a agenda
      menino.colocar(LUCAS, tc > tV ? AG_V : POTE);
      if (tc > tV) menino.reagir('triste', tc - tV); else if (tc > tSu) menino.reagir('erguendo', tc - tSu); else menino.reagir('pensando', B.t);
      // EFEITOS VISUAIS: "Sem pagamento" em "sumiu" · "Agenda vazia" em "vazia"
      if (tc < tV) fx.et.semPag.em(mais(POTE, [0, 1.0, 0.2]), tc - tSu); else fx.et.vazia.em(mais(AG_V, [0, 0.75, 0.2]), tc - tV);
      K.som('racha', tCt + 0.3, 0.4); K.som('desliga', tV, 0.5);
      // CÂMERA: afastando · médio · direita · baixo
      K.filmar([pote, agenda, mais(LUCAS, [0, 1.0, 0])], 'afastando', B.p, { plano: 'perto', lado: 12, altura: 'baixo', tam: 1.1, obstaculos: false });
    },
    perdido(B, tc) {
      // NA TELA: o Lucas de pé no meio do quarto; o Maps no celular grande cheio de pinos; os "?" e os balões em volta da cabeça · MOSTRA: personagem, mapa, duvidas
      // CENÁRIO: home office de dia, a mesa e a janela atrás (o cenário cuida)
      const tDe = quando('decide', B, 0.1), tAt = quando('atrás', B, 0.3), tCo = quando('como', B, 0.6), tQ = quando('quem', B, 0.75), tOf = quando('oferecer', B, 0.88);
      ve(comp); comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
      // ENTRA AGORA: o Maps abre em "atrás"; pinos de todo tipo pulam dele, cada vez mais
      if (tc > tAt) {
        ve(celMapa); celMapa.g.scale.setScalar(3 * pop(tc - tAt)); celMapa.g.position.set(...MAPA); celMapa.g.rotation.set(0, 0.35, 0);
        const n = Math.min(14, 3 + Math.floor((tc - tAt) / 0.12));
        celMapa.tela.desenhar((c, w, h) => mapaTodos(c, w, h, n), 'mapa' + n);
      }
      const cabeca = mais(L_PERD, [0, 1.7, 0]);
      pinos.forEach((p, i) => {
        const t0 = tAt + 0.2 + i * 0.1; if (tc < t0) return; ve(p);
        const d = K.clamp((tc - t0) / 0.5), a = i * 0.63 + (tc > tOf ? (tc - tOf) * 2.2 : 0);
        const alvo = [L_PERD[0] + Math.cos(a) * 1.05, 0.9 + (i % 3) * 0.5, L_PERD[2] + Math.sin(a) * 0.8];
        p.position.set(...lerp3(MAPA, alvo, d)); p.position.y += Math.sin(d * Math.PI) * 0.6;
        if (i < 6) K.som('estalo', t0, 0.25);
      });
      // os "?" giram em volta da cabeça a partir de "quem"
      duvidas.forEach((q, i) => {
        if (tc < tQ) return; ve(q); const a = (tc - tQ) * 2.5 + i * 2.09;
        q.position.set(cabeca[0] + Math.cos(a) * 0.55, cabeca[1] + 0.55 + Math.sin(tc * 5 + i) * 0.05, cabeca[2] + Math.sin(a) * 0.45);
        q.scale.setScalar(pop(tc - tQ - i * 0.1));
      });
      // PERSONAGEM: começo vitória (levanta decidido) · em "como": pensando · em "quem": dúvida, girando pra olhar os pinos
      const olhar = tc > tQ ? [L_PERD[0] + Math.cos(tc * 2.5) * 3, 1.3, L_PERD[2] + Math.sin(tc * 2.5) * 3] : MAPA;
      menino.colocar(L_PERD, olhar);
      if (tc > tQ) menino.reagir('duvida', tc - tQ); else if (tc > tCo) menino.reagir('pensando', tc - tCo); else menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: "Vou atrás!" em "decide" · "Como?" em "como" · "Pra quem?" em "quem"
      if (tc < tCo) fx.et.vou.em(mais(L_PERD, [0, 2.15, 0]), tc - tDe);
      else if (tc < tQ) fx.et.como.em(mais(L_PERD, [-0.4, 2.2, 0]), tc - tCo);
      else fx.et.quem.em(mais(L_PERD, [0.2, 2.55, 0]), tc - tQ);
      K.som('whoosh', tDe, 0.5); K.som('errado', tQ, 0.5);
      // CÂMERA: girando · perto · esquerda · olho
      K.filmar([celMapa, menino, mais(L_PERD, [0, 2.4, 0])], 'girando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho', angulo: 18, tam: 1.5, obstaculos: false });
    },
    erro(B, tc) {
      // NA TELA: a cidade em miniatura; o Lucas no meio; a imobiliária afundando; um "?" em cima de cada prédio · MOSTRA: personagem, interrogacoes
      // CENÁRIO: os carrinhos andando nas ruas (o cenário cuida)
      const tE = quando('erro', B, 0.1), tPe = quando('perder', B, 0.3), tSa = quando('saber', B, 0.6), tPx = quando('próximo', B, 0.9);
      // ENTRA AGORA: a imobiliária afunda em "perder"
      const dA = K.clamp((tc - tPe) / 0.6);
      if (dA < 1) { ve(imobMq); imobMq.position.set(IMB_MQ[0], IMB_MQ[1] - dA * 1.2, IMB_MQ[2]); imobMq.rotation.y = dA * 2; }
      // OBJETOS SE MEXENDO: os "?" pulam em cima dos prédios a partir de "saber"; em "próximo", todos viram pro Lucas
      interrog.forEach((q, i) => {
        const t0 = tSa + i * 0.1; if (tc < t0) return; ve(q);
        q.scale.setScalar(pop(tc - t0)); q.position.set(INTERR[i][0], INTERR[i][1] + Math.sin(tc * 4 + i) * 0.06, INTERR[i][2]);
        q.rotation.y = tc > tPx ? Math.atan2(L_MQ[0] - INTERR[i][0], L_MQ[2] - INTERR[i][2]) : 0;
        K.som('estalo', t0, 0.2);
      });
      // PERSONAGEM: começo triste, olhando o buraco da imobiliária · em "próximo": pensando, girando pra olhar os "?"
      const qi = Math.max(0, Math.min(7, Math.floor((tc - tSa) / 0.1)));
      menino.colocar(L_MQ, tc > tSa ? INTERR[qi] : IMB_MQ);
      if (tc > tPx) menino.reagir('pensando', tc - tPx); else menino.reagir('triste', B.t);
      // EFEITOS VISUAIS: "O erro" · "Quem é o próximo?"
      if (tc < tPx) fx.et.erro.em(mais(L_MQ, [0, 2.0, 0]), tc - tE); else fx.et.proximo.em(mais(L_MQ, [0, 2.0, 0]), tc - tPx);
      K.som('baque', tPe + 0.3, 0.5);
      // CÂMERA: subindo · aberto · frente · alto
      K.filmar([mais(L_MQ, [0, 0.8, 0]), INTERR[7], INTERR[0], IMB_MQ], 'subindo', B.p, { plano: 'perto', lado: 'frente', altura: 'alto', tam: 1.15 });
    },
    virada(B, tc) {
      // NA TELA: a maquete; os "?" estouram; as 3 oficinas sobem com um alvo em cima; o Lucas apontando · MOSTRA: alvos, personagem
      const tPx = quando('próximo', B, 0.1), tEm = quando('empresa', B, 0.35), tPr = quando('problema', B, 0.65), tRe = quando('resolve', B, 0.9);
      // ENTRA AGORA: os "?" estouram em "próximo"
      interrog.forEach((q, i) => { const d = (tc - tPx - i * 0.04) / 0.25; if (d >= 1) return; ve(q); q.position.set(...INTERR[i]); q.scale.setScalar(d < 0 ? 1 : 1 + d * 0.6 - d * d * 1.6); });
      K.som('estalo', tPx, 0.5);
      // as oficinas sobem em "empresa"; os alvos caem e os halos acendem em "problema"
      predios.forEach((p, i) => { ve(p); K.entrar(p, 'sobe', tc - tEm - i * 0.12, { dur: 0.35, som: false }); });
      alvos.forEach((a, i) => {
        const t0 = tPr + i * 0.2; if (tc < t0) return; ve(a);
        const q = K.clamp((tc - t0) / 0.35); a.position.set(ALV[i][0], K.lerp(3.6, ALV[i][1] + 1.75, q * q), ALV[i][2] + 0.15); a.rotation.y = (1 - q) * Math.PI;
        ve(halos[i]); halos[i].scale.setScalar(1.6 * K.clamp((tc - t0) / 0.3) * (1 + Math.sin(tc * 6) * 0.06));
        K.som('ding', t0, 0.4);
      });
      for (let i = 0; i < 3; i++) K.som('bip', tEm + i * 0.12, 0.25);
      // PERSONAGEM: começo surpreso · em "resolve": ideia e aponta a oficina mais perto
      menino.colocar(L_MQ, ALV[2]);
      if (tc > tRe + 0.3) menino.apontar(0.5); else if (tc > tRe) menino.reagir('ideia', tc - tRe); else menino.reagir('surpreso', B.t);
      fx.et.problema.em([0, 2.75, -0.8], tc - tPr);
      // CÂMERA: revelando · aberto · esquerda · alto
      K.filmar([...predios, menino, [0, 2.3, -0.8]], 'revelando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'alto', tam: 2.4 });
    },
    oficina(B, tc) {
      // NA TELA: a oficina com o carro no elevador; o mecânico; o Lucas com o celular na ficha do Maps · MOSTRA: mecanico, celular, personagem
      // CENÁRIO: as ferramentas na parede, o elevador de carro (o cenário cuida)
      const tO = quando('oficina', B, 0.4), tN = quando('não', B, 0.7);
      ve(cel);
      cel.tela.desenhar((c, w, h) => fichaOficina(c, w, h, tc > tN), tc > tN ? 'fichaV' : 'ficha');
      // PERSONAGEM: começo segurando o celular · em "não": aponta o mecânico
      menino.colocar(L_OF, tc > tN ? mais(MEC, [0, 1.3, 0]) : [0.6, 1.4, 5]);
      if (tc > tN + 0.2) menino.apontar(0.5); else menino.reagir('segurando', B.t);
      celNaMao(L_OF, { esc: 1.8 * Math.max(0.3, pop(tc - tO + 0.3)) * 1.25, giro: 0.4, dx: 0.35 });
      // o mecânico sai de baixo do carro e acena
      const pm = MEC;
      mecanico.colocar(pm, mais(L_OF, [0, 1.2, 0]));
      if (tc > tO) mecanico.acenar(tc); else mecanico.reagir('segurando', B.t);
      // EFEITOS VISUAIS: ✗ "Sem site" em "não"
      fx.et.semSite.em(mais(L_OF, [0.3, 2.35, 0.4]), tc - tN);
      K.som('metal', B.inicio + 0.1, 0.4); K.som('errado', tN, 0.5);
      // CÂMERA: chegando · médio · direita · olho
      K.filmar([mais(MEC, [0, 1.0, 0]), mais(L_OF, [0.35, 1.1, 0.4]), mais(L_OF, [0, 1.0, 0])], 'chegando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho', tam: 1.1 });
      const [x, y] = K.tela(mais(L_OF, [0.3, 2.35, 0.4]));
      fx.errado.em({ tela: [x, y - 110] }, tc - tN);
    },
    lista(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a lista do Mappoa sobe do computador; o Lucas à direita · MOSTRA: navegador, tela, personagem
      const tDi = quando('digita', B, 0.1), tC = quando('computador', B, 0.3), tL = quando('lista', B, 0.5), tOf = quando('oficinas', B, 0.65), tS = quando('sem', B, 0.88);
      ve(comp, navG); comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
      // ENTRA AGORA: a barra em "digita" e as letras até "computador"; a lista sobe do monitor em "lista"
      K.entrar(navG.g, 'cresce', tc - tDi, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / Math.max(0.06, (tC - tDi + 0.2) / 10))));
      navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tL) {
        ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
        telaC.g.position.set(-0.45, K.lerp(0.9, 1.6, q), K.lerp(-1.0, 0.15, q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
        const n = tc > tOf ? 1 + Math.floor((tc - tOf) / 0.25) : 0;
        telaC.mostrar('listaOficinas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1, pilula: tc > tS });
        for (let k = 0; k < 4; k++) K.som('bip', tOf + k * 0.25, 0.25);
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
      // NA TELA: no palco, a análise da Mecânica Boa Vista; o robô à esquerda; o Lucas à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: o score enche de "precisa" a "serviço"; as dores e oportunidades em "serviço"
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseOficina', { ate: tc > tSv ? 2 : 0, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "serviço": vitória
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('vitoria', tc - tSv); else menino.reagir('chamando', B.t);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: chegando · médio · frente · baixo
      K.filmar([telaM, robo, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) "Antes": o celular gigante com o "vamos encerrar" e o gráfico zerado, em cinza; (2) "Agora": na oficina, chega outro cancelamento e o Lucas abre a lista · MOSTRA: personagem, tela, mecanico
      const tZ = quando('zerava', B, 0.2), tG = quando('Agora', B, 0.4), tSai = quando('sai', B, 0.6), tL = quando('lista', B, 0.8), tPx = quando('próximos', B, 0.93);
      ve(cel);
      if (tc < tG) {
        ve(comp, graf); comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
        desenhaChat('Imobiliária Lar Novo', true, FIM_IMOB, true);
        grafico(K.clamp((tc - tZ) / 0.4), true);
        const pos = [0.85, 0, 0.55];
        menino.colocar(pos, [0.6, 1.4, 5]); menino.reagir('susto', tc - B.inicio); menino.humor('assustado');
        fx.et.zerado.em(mais(GRAF, [0.3, 1.45, 0.2]), tc - tZ);
        K.som('errado', tZ, 0.5);
        K.filmar([CEL_G, mais(GRAF, [0, 0.6, 0]), mais(pos, [0, 0.9, 0])], 'afastando', K.clamp((tc - B.inicio) / Math.max(0.4, tG - B.inicio)), { plano: 'medio', lado: 'direita', altura: 'olho', obstaculos: false, tam: 1.4 });
      } else {
        // o celular na mão recebe outro cancelamento em "sai"; a lista abre do lado em "lista"
        desenhaChat('Auto Escola Via Certa', tc > tSai, FIM_OUTRO);
        celNaMao(L_OF, { esc: 1.8 * 1.2, giro: 0.4, dx: 0.35 });
        if (tc > tSai) K.som('bip', tSai, 0.5);
        if (tc > tL) {
          ve(telaC); telaC.g.position.set(...TELA_OF); telaC.g.rotation.set(0, -0.35, 0); telaC.g.scale.setScalar(0.85 * pop(tc - tL));
          const n = tc > tPx ? 1 + Math.floor((tc - tPx) / 0.15) : 1;
          telaC.mostrar('listaOficinas', { n: Math.min(4, n), sel: tc > tPx ? 0 : -1, pilula: true });
        }
        menino.colocar(L_OF, tc > tL ? TELA_OF : [0.6, 1.4, 5]);
        if (tc > tPx) menino.reagir('mostrando', tc - tPx); else if (tc > tSai) menino.reagir('duvida', tc - tSai); else menino.reagir('segurando', tc - tG);
        menino.humor('feliz');
        mecanico.colocar(MEC, mais(L_OF, [0, 1.2, 0])); mecanico.acenar(tc);
        fx.et.proximos.em(mais(TELA_OF, [0, 1.35, 0.2]), tc - tPx);
        K.som('whoosh', tG, 0.5); K.som('certo', tPx, 0.6);
        K.filmar([mais(L_OF, [0, 1.0, 0]), mais(TELA_OF, [0, 1.15, 0]), mais(TELA_OF, [0, -1.0, 0]), mais(MEC, [0, 1.0, 0])], 'passando', K.clamp((tc - tG) / (B.ate - tG)), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 2.0, obstaculos: false });
      }
    },
    segue(B, tc) {
      // NA TELA: o Lucas no computador; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Quantos', B, 0.02), tSg = quando('segue', B, 0.35), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
      if (tc < tSg) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tSg);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
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
      comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
      robo.g.position.set(-2.2, 0, 0.5); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar([1.05, 0, -0.45], [0.5, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },
    capa() {
      ve(cel, comp, graf); desenhaChat('Imobiliária Lar Novo', true, FIM_IMOB);
      comp.tela.desenhar((c, w, h) => siteImob(c, w, h), 'site');
      grafico(1, true);
      const pos = [0.85, 0, 0.55];
      menino.colocar([0.55, 0, 0.95], [0.2, 1.4, 5]); menino.reagir('susto', 0.5); menino.humor('assustado'); menino.suar(1);
      K.filmar([mais(CEL_G, [0, 0.4, 0]), mais(pos, [0, 1.0, 0]), mais(GRAF, [0.9, 0.9, 0])], 'parado', 0, { plano: 'perto', lado: 12, altura: 'olho', espacoCima: 0.22, tam: 0.95, obstaculos: false });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const agora = B.plano === 'antes_agora' && tc >= quando('Agora', B, 0.4);
    C = CS.usar(agora ? 'oficina' : LUGAR[B.plano] || 'home_office');
    [menino, dona, mecanico].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    cel.g.scale.setScalar(5.5); cel.g.position.set(...CEL_G); cel.g.rotation.set(0, 0, 0);
    graf.scale.setScalar(0.75); graf.position.set(...GRAF); grafico(0, false);
    agenda.g.scale.setScalar(1); agenda.g.position.set(...AG_P); agenda.g.rotation.set(0, 0, 0);
    telaC.g.scale.setScalar(1); telaC.g.position.set(-0.45, 1.6, 0.15); telaC.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
