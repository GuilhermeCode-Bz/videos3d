// O cliente clicou no site da clínica. Se a página não abre, ele liga pra outra (canal Mappoa).
// Seis cenários no mesmo vídeo (K.cenarios) e o kit do Mappoa. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  let bl, CS, menino, paciente, dono, robo, comp, cel, lista, telaErro, chatMsg, relogio, prancheta, telaC, telaM, navG, clinica;
  const tudo = [], fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const LUGAR = {
    gancho: 'cidade', vini: 'home_office', risca: 'home_office', virada: 'clinica_odonto', dono: 'clinica_odonto',
    motivo: 'clinica_odonto', prova: 'home_office', dia: 'home_noite', lista: 'central_mappoa', mappoa: 'mundo_mappoa',
    antes_agora: 'home_office', segue: 'home_office', cartao: 'home_office', capa: 'cidade'
  };
  // Cidade: o calçadão fica em y = 0,14; a clínica a partir de x -21 (os vasos da calçada tampam o que fica perto de -14)
  const G = 0.14, CLIN_X = -24.5, CLIN_Z = -0.3;
  const PAC = [-25.5, G, 4.6], PAC_SAI = [-28.6, G, 5.2], CEL_G = [-24.75, G + 1.55, 5.3];
  // Home office: o computador do Vini na frente da mesa do cenário
  const COMP = [-0.45, 0, -1.15], MONITOR = [-0.45, 1.84, -1.33];
  // Clínica: a tela do site em cima do balcão, o dono atrás, o Vini e o paciente na frente
  const TELA_ERRO = [0.45, 2.6, -2.3], DONO = [-2.85, 0, -2.1], VINI_CL = [1.0, 0, -0.9];
  const CLINICAS = [
    { nome: 'Clínica Sorriso', end: 'Av. Higienópolis, 410', chips: ['whats', 'tel', 'site'], st: 1 },
    { nome: 'OdontoVida Londrina', end: 'Rua Sergipe, 1200', chips: ['whats', 'tel', 'site'], st: 0 },
    { nome: 'Sorria Mais', end: 'Av. Madre Leônia, 88', chips: ['tel', 'site'], st: 2 },
    { nome: 'Clínica Bem Estar', end: 'Rua Pará, 515', chips: ['whats', 'tel', 'site'], st: 0 },
    { nome: 'Dente Feliz', end: 'Av. JK, 33', chips: ['whats', 'site'], st: 3 }
  ];
  const SEM_SITE = [
    { nome: 'Odonto Centro', end: 'Rua Maranhão, 77', chips: ['whats', 'tel'] },
    { nome: 'Clínica Dr. Sato', end: 'Av. São Paulo, 30', chips: ['tel'] },
    { nome: 'Sorriso Kids', end: 'Rua Belo Horizonte, 9', chips: ['whats'] }
  ];
  const STATUS = [['Site abriu', '#00bc7b', '#e3f8ef'], ['Fora do ar (404)', '#e8352b', '#fde8e7'], ['Não respondeu', '#d97706', '#fff4dc'], ['Bloqueado', '#596571', '#eef2f7']];
  const PAPEL = ['Clínica Sorriso', 'OdontoVida', 'Sorria Mais', 'Dente Feliz', 'Clínica Bem Estar'];
  const PROVA = 'Oi! Testei o site de vocês e ele não abriu.';

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
  function rodinha(c, x, y, r, ang, cor = '#1067f8') {
    c.lineWidth = r * 0.28; c.lineCap = 'round'; c.strokeStyle = '#dfe5ee'; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke();
    c.strokeStyle = cor; c.beginPath(); c.arc(x, y, r, ang, ang + 1.9); c.stroke(); c.lineCap = 'butt';
  }
  function erroIcone(c, x, y, s, cor = '#5f6368') {
    c.fillStyle = cor; c.beginPath(); c.roundRect(x - 26 * s, y - 22 * s, 52 * s, 44 * s, 6 * s); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(x - 10 * s, y - 4 * s, 4 * s, 0, 7); c.arc(x + 10 * s, y - 4 * s, 4 * s, 0, 7); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 3 * s; c.beginPath(); c.arc(x, y + 14 * s, 9 * s, 3.6, 5.8); c.stroke();
  }

  // ---------- Telas desenhadas ----------
  // O celular: 'link' (a busca com a Clínica Sorriso), 'carrega' (a rodinha), 'erro' (404), 'liga' (ligando pra outra)
  function navCel(c, w, h, est, k = 0) {
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    if (est === 'liga') {
      const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0b3d2e'); g.addColorStop(1, '#075e54'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      txt(c, 'Ligando...', w / 2, h * 0.2, 16, '#cfe9df', 700, 'center');
      txt(c, 'Clínica', w / 2, h * 0.32, 24, '#fff', 900, 'center'); txt(c, 'Bem Estar', w / 2, h * 0.42, 24, '#fff', 900, 'center');
      c.fillStyle = '#fff'; c.beginPath(); c.arc(w / 2, h * 0.6, 34 + Math.sin(k * 8) * 4, 0, 7); c.globalAlpha = 0.25; c.fill(); c.globalAlpha = 1;
      rr(c, w / 2 - 30, h * 0.78, 60, 60, 30, '#e8352b'); txt(c, '✆', w / 2, h * 0.78 + 31, 30, '#fff', 900, 'center');
      return;
    }
    rr(c, 8, 8, w - 16, 32, 16, '#f1f3f4');
    txt(c, est === 'link' ? 'dentista perto de mim' : 'clinicasorriso.com.br', 18, 25, 12, '#202124', 700, 'left', w - 36);
    if (est === 'link') {
      rr(c, 8, 52, w - 16, 120, 12, '#e8f0fe');
      txt(c, 'Clínica Sorriso', 18, 76, 18, '#1a0dab', 900);
      txt(c, '★★★★☆', 18, 100, 14, '#f9ab00', 900);
      rr(c, 18, 116, 74, 28, 14, '#1067f8'); txt(c, 'Site', 55, 131, 14, '#fff', 800, 'center');
      rr(c, 100, 116, 84, 28, 14, '#fff'); txt(c, 'Ligar', 142, 131, 14, '#1067f8', 800, 'center');
      txt(c, 'Clínica Bem Estar', 18, 200, 15, '#5f6368', 800); txt(c, 'Sorria Mais', 18, 232, 15, '#5f6368', 800);
      if (k > 0) { c.fillStyle = 'rgba(16,103,248,.35)'; c.beginPath(); c.arc(55, 131, 12 + k * 26, 0, 7); c.fill(); }
      return;
    }
    if (est === 'carrega') { rodinha(c, w / 2, h * 0.45, 26, k * 9); txt(c, 'Carregando...', w / 2, h * 0.62, 14, '#9aa0a6', 700, 'center'); return; }
    erroIcone(c, w / 2, h * 0.3, 1.1);
    txt(c, 'Esta página não', w / 2, h * 0.47, 16, '#202124', 900, 'center'); txt(c, 'está disponível', w / 2, h * 0.53, 16, '#202124', 900, 'center');
    rr(c, w / 2 - 50, h * 0.62, 100, 44, 12, '#fde8e7'); txt(c, '404', w / 2, h * 0.62 + 23, 28, '#e8352b', 900, 'center');
  }
  function portfolio(c, w, h, rola) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const y0 = -rola * 60;
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#7a4fd6'); d.addColorStop(1, '#2fb5a6');
    c.fillStyle = d; c.fillRect(0, y0, w, 92);
    txt(c, 'Vini.dev', 18, y0 + 34, 26, '#fff', 900); txt(c, 'Sites para clínicas', 18, y0 + 64, 13, '#fff', 700);
    [['#2fb5a6', '#d6f1ec'], ['#2f6fd6', '#d6e4ff'], ['#ff8a5b', '#ffe4d6']].forEach(([a, b], i) => {
      const lw = (w - 44) / 3, x = 14 + i * (lw + 8);
      rr(c, x, y0 + 108, lw, 120, 10, b); rr(c, x + 10, y0 + 118, lw - 20, 52, 6, a);
      c.fillStyle = '#334155'; c.fillRect(x + 10, y0 + 182, lw - 30, 8); c.fillRect(x + 10, y0 + 198, lw - 44, 8);
    });
  }
  // O monitor testando clínica por clínica, cada uma presa na rodinha
  function testando(c, w, h, i, ang) {
    c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
    rr(c, 10, 8, w - 20, 30, 15, '#f1f3f4');
    txt(c, PAPEL[i % PAPEL.length].toLowerCase().replace(/[^a-z]/g, '') + '.com.br', 22, 23, 13, '#202124', 700, 'left', w - 44);
    rodinha(c, w / 2, h * 0.55, 30, ang);
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['cidade', 'home_office', ['home_office', { hora: 'noite' }, 'home_noite'], 'clinica_odonto', 'central_mappoa', 'mundo_mappoa']);
    const T = K.telasMappoa, M = K.MAPPOA;
    // A folha de papel com as clínicas, riscadas uma a uma
    T.papel = (c, w, h, e) => {
      c.fillStyle = '#fffdf6'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#d7e3f4'; c.lineWidth = 2; for (let y = 120; y < h; y += 92) { c.beginPath(); c.moveTo(0, y + 46); c.lineTo(w, y + 46); c.stroke(); }
      c.strokeStyle = '#f0a8a8'; c.beginPath(); c.moveTo(56, 0); c.lineTo(56, h); c.stroke();
      txt(c, 'Clínicas pra ligar', 76, 62, 36, '#1f2937', 900);
      PAPEL.forEach((s, i) => {
        const y = 166 + i * 92, riscado = i < e.riscados || (i === e.riscados && e.risco > 0);
        txt(c, s, 76, y, 34, riscado ? '#9aa0a6' : '#1f2937', 800);
        const l = i < e.riscados ? 1 : i === e.riscados ? e.risco : 0;
        if (l > 0) { c.strokeStyle = '#e8352b'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(66, y); c.lineTo(66 + (w - 110) * l, y - 6); c.stroke(); c.lineCap = 'butt'; }
      });
      if (e.seta != null) { const y = 166 + e.seta * 92; c.fillStyle = '#1067f8'; c.beginPath(); c.moveTo(16, y - 16); c.lineTo(46, y); c.lineTo(16, y + 16); c.fill(); }
    };
    // O site da clínica na tela do balcão: a rodinha e depois o erro
    T.erroSite = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#e8eaed'; c.fillRect(0, 0, w, 46); rr(c, 14, 9, w - 28, 28, 14, '#fff');
      txt(c, 'clinicasorriso.com.br', 30, 23, 17, '#202124', 700, 'left', w - 60);
      if (!e.erro) { rodinha(c, w / 2, h * 0.58, 46, e.ang || 0); return; }
      if (e.vermelho) { c.fillStyle = 'rgba(232,53,43,.12)'; c.fillRect(0, 46, w, h - 46); }
      erroIcone(c, 92, h * 0.6, 1.6, e.vermelho ? '#e8352b' : '#5f6368');
      txt(c, 'Esta página não', 158, h * 0.46, 30, '#202124', 900); txt(c, 'está disponível', 158, h * 0.6, 30, '#202124', 900);
      rr(c, 158, h * 0.7, 96, 44, 12, '#fde8e7'); txt(c, '404', 206, h * 0.7 + 23, 28, '#e8352b', 900, 'center');
    };
    // A conversa do Vini com a clínica: o print do erro e a mensagem sendo digitada
    T.chatProva = (c, w, h, e) => {
      c.fillStyle = '#efe7dd'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#075e54'; c.fillRect(0, 0, w, 96);
      c.fillStyle = '#d6f1ec'; c.beginPath(); c.arc(56, 48, 28, 0, 7); c.fill(); txt(c, '🦷', 56, 50, 28, '#075e54', 900, 'center');
      txt(c, 'Clínica Sorriso', 100, 40, 30, '#fff', 800); txt(c, 'WhatsApp', 100, 70, 19, '#cfe9df', 600);
      const p = K.suave(K.clamp(e.print || 0));
      if (p > 0) {
        c.globalAlpha = p; const y = 130 + (1 - p) * 60;
        rr(c, 120, y, w - 140, 360, 18, '#d9fdd3'); rr(c, 136, y + 16, w - 172, 300, 12, '#fff');
        c.save(); c.translate(136, y + 16); T.erroSite(c, w - 172, 300, { erro: true }); c.restore();
        txt(c, 'print do site', 140, y + 340, 18, '#4a5d52', 700); c.globalAlpha = 1;
      }
      const s = PROVA.slice(0, Math.floor(PROVA.length * K.clamp(e.digitado || 0)));
      if (s) {
        rr(c, 80, 520, w - 100, 170, 18, '#d9fdd3');
        const pal = s.split(' '); let l = '', y = 566;
        c.font = '800 30px Montserrat, sans-serif';
        pal.forEach((pw) => { const t = l ? l + ' ' + pw : pw; if (c.measureText(t).width > w - 140 && l) { txt(c, l, 100, y, 30, '#111b21'); l = pw; y += 42; } else l = t; });
        txt(c, l + (e.digitado < 1 ? '|' : ''), 100, y, 30, '#111b21');
        if (e.digitado >= 1) txt(c, '✓✓', w - 40, 670, 20, '#34b7f1', 900, 'right');
      }
      rr(c, 16, h - 84, w - 110, 64, 32, '#fff'); txt(c, 'Mensagem', 44, h - 52, 22, '#9aa0a6', 600);
      c.fillStyle = '#00a884'; c.beginPath(); c.arc(w - 50, h - 52, 32, 0, 7); c.fill(); txt(c, '➤', w - 48, h - 50, 28, '#fff', 900, 'center');
    };
    // A lista de clínicas com o status do site de cada uma (o enriquecimento marca), sem o total da captura no topo
    T.listaClinicas = (c, w, h, e) => {
      T.lista(c, w, h, e);
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Clínicas odontológicas · Londrina, PR', 36, 168, 20, M.marinho, 700, 'left', w - 72);
      c.fillStyle = M.fundo; c.fillRect(w - 110, 204, 110, 36);
      if (e.grupo === 'SEM SITE') return;
      const itens = e.itens || [];
      for (let i = 0; i < Math.min(e.n, itens.length); i++) {
        if (i >= (e.st || 0)) break;
        const [s, cor, bg] = STATUS[itens[i].st], y = 248 + i * 140;
        c.font = '800 17px Montserrat, sans-serif'; const lw = c.measureText(s).width + 30;
        rr(c, w - 30 - lw, y + 14, lw, 32, 16, bg); txt(c, s, w - 30 - lw / 2, y + 31, 17, cor, 800, 'center');
      }
    };
    // O lead da Clínica Sorriso: dados da empresa, presença digital (o site fora do ar) e os contatos
    T.leadClinica = (c, w, h, e) => {
      c.fillStyle = M.fundo; c.fillRect(0, 0, w, h);
      txt(c, 'Mappoa', 30, 44, 26, M.marinho, 800);
      txt(c, 'Clínica Sorriso', 24, 110, 36, M.marinho, 900, 'left', w - 48);
      rr(c, 24, 140, 132, 30, 15, M.verde); txt(c, 'enriquecido', 90, 156, 17, '#fff', 800, 'center');
      const caixa = (y, alt, tit) => { c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, y, w - 36, alt, 20); c.fill(); c.stroke(); txt(c, tit, 38, y + 32, 22, M.marinho, 900); };
      if (e.ate >= 1) { caixa(190, 130, 'Dados da empresa'); txt(c, 'Odontologia · Londrina, PR', 38, 252, 20, M.cinza, 600); txt(c, 'Av. Higienópolis, 410', 38, 286, 20, M.cinza, 600); }
      if (e.ate >= 2) {
        caixa(338, 196, 'Presença digital');
        rr(c, 38, 384, w - 76, 62, 14, '#fde8e7'); txt(c, 'Site', 58, 415, 20, '#7a1f19', 800); txt(c, 'fora do ar (404)', w - 58, 415, 22, '#e8352b', 900, 'right');
        rr(c, 38, 456, w - 76, 62, 14, '#fdebf1'); txt(c, 'Instagram', 58, 487, 20, '#d6336c', 800); txt(c, 'encontrado', w - 58, 487, 20, '#d6336c', 700, 'right');
      }
      if (e.ate >= 3) {
        caixa(552, 150, 'Contatos');
        rr(c, 38, 600, 210, 70, 16, '#e6f9ed'); txt(c, 'WhatsApp', 143, 635, 22, '#16a34a', 900, 'center');
        rr(c, 262, 600, 220, 70, 16, '#eef2f7'); txt(c, 'Telefone', 372, 635, 22, '#475569', 900, 'center');
      }
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Vini (do canal), o paciente, o dono da clínica (doutor) e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    paciente = K.boneco({ roupa: 'moletom', cores: { moletom: 0x3f9b5a, punho: 0x2f7a45, calca: 0x2f3540, mochila: 0x596571, cabelo: 0x1a1210, pele: 0xc98f62 } });
    K.semNome(paciente.g); K.nomear('paciente', paciente.g);
    dono = K.boneco({ tipo: 'doutor' }); K.semNome(dono.g); K.nomear('dono', dono.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O celular (gigante no gancho, na mão nas outras)
    cel = K.celular(); guarda(cel, 'celular', CEL_G, 5.5);

    // Cidade: a fachada da Clínica Sorriso no calçadão
    clinica = new THREE.Group(); clinica.position.set(CLIN_X, G, CLIN_Z); K.scene.add(clinica);
    K.modelo('kenney-cidade/building-small-d', { escala: 5, pos: [0, 0, 0], pai: clinica });
    const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(0x2fb5a6)); toldo.position.set(0, 2.55, 3.0); toldo.rotation.x = 0.25; clinica.add(toldo);
    const placa = K.placa('Clínica Sorriso', { larg: 2.8, alt: 0.7, fundo: '#e3fff8', cor: '#0b6b5f', borda: '#0b6b5f' }); K.scene.remove(placa); placa.position.set(0, 3.15, 2.62); clinica.add(placa);
    guarda(clinica, 'clinica');

    // Home office
    comp = K.computador({}); guarda(comp, 'monitor', COMP, 1.55);
    lista = K.painelMappoa(1.25, 1.65, { px: 800, borda: '#d9c9a3' }); guarda(lista, 'lista', [0.1, 1.75, 0.1]);
    chatMsg = K.painelMappoa(1.4, 2.3, { px: 800, borda: '#075e54' }); guarda(chatMsg, 'mensagem', [-0.45, 1.65, 0.1]);
    relogio = guarda(K.m3d('relogio_parede', { hora: 3 }), 'relogio', [-1.85, 2.45, -0.5], 2.1);
    navG = K.painelMappoa(2.5, 0.42, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.3, 2.35, 1.35]);

    // Clínica: a tela do site em cima do balcão e a prancheta do Vini
    telaErro = K.painelMappoa(1.9, 1.15, { px: 900, borda: '#050d1c' }); guarda(telaErro, 'tela_erro', TELA_ERRO);
    prancheta = guarda(K.m3d('lista_check'), 'prancheta', mais(VINI_CL, [0.4, 0.75, 0.35]), 0.9);

    // Central e palco do Mappoa
    telaC = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaC, 'tela', [0.85, 1.6, 0.1]);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      designer: e('Web designer', 'azul'), temos: e('"Já temos site"', 'vermelho'), nemAbre: e('Site que nem abre', 'laranja'),
      certo: e('"Tá tudo certo"', 'verde'), concorrente: e('Ligou pro concorrente', 'vermelho'), pagar: e('Motivo pra pagar', 'verde'),
      perdido: e('Paciente perdido', 'vermelho'), prova: e('Prova pronta', 'azul'), dia: e('O dia inteiro', 'vermelho'),
      testado: e('Cada site testado', 'verde'), semSite: e('Sem site', 'laranja'), proximo: e('Seu próximo cliente', 'verde'),
      antes: e('"Já temos site"', 'vermelho'), precisa: e('Quem precisa de você', 'verde')
    };
    fx.errado = K.marca('errado'); fx.certo = K.marca('certo');
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Site fora do ar é culpa da clínica ou de quem fez o site? <em>Comenta aí</em>');
  }

  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const pisca = (tc) => Math.floor(tc * 3) % 2 === 0;
  // O celular na mão de alguém (pos = onde a pessoa está)
  function celNaMao(pos, op = {}) {
    cel.g.scale.setScalar(op.esc || 1.8);
    if (op.ouvido) { cel.g.position.set(pos[0] + 0.24, pos[1] + 1.28, pos[2] + 0.02); cel.g.rotation.set(0, -1.2, 0.2); }
    else { cel.g.position.set(pos[0] + 0.3, pos[1] + 1.05, pos[2] + 0.4); cel.g.rotation.set(-0.25, op.giro || 0.25, 0); }
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o celular gigante com o link da Clínica Sorriso; a fachada da clínica atrás; o paciente à esquerda · MOSTRA: celular, paciente
      // CENÁRIO: a cidade de dia; carros passando (o K.cenario cuida)
      const tC = quando('clicou', B, 0.12), tA = quando('abre', B, 0.62), tL = quando('liga', B, 0.8);
      ve(cel, clinica);
      // ENTRA AGORA: o toque no link em "clicou" e a rodinha · OBJETOS SE MEXENDO: o erro em "abre" (com tranco) e a ligação em "liga"
      const est = tc > tL ? 'liga' : tc > tA ? 'erro' : tc > tC + 0.3 ? 'carrega' : 'link';
      const k = est === 'link' ? (tc > tC ? K.clamp((tc - tC) / 0.3) : 0) : est === 'carrega' ? tc : tc - tL;
      cel.tela.desenhar((c, w, h) => navCel(c, w, h, est, k), est + (est === 'link' ? Math.round(k * 10) : Math.round(k * 20)));
      const tranco = tc > tA && tc < tA + 0.35 ? Math.sin((tc - tA) * 60) * 0.03 : 0;
      cel.g.position.set(CEL_G[0] + tranco, CEL_G[1], CEL_G[2]);
      // PERSONAGEM: o paciente · começo segurando (olhando o celular) · em "abre": bravo · em "liga": vira e vai embora pra esquerda
      if (tc > tL + 0.2) paciente.irPara(PAC, PAC_SAI, K.clamp((tc - tL - 0.2) / 1.2), tc, { olhar: [-32, 1.4, 6] });
      else { paciente.colocar(PAC, CEL_G); if (tc > tA) paciente.reagir('bravo', tc - tA); else paciente.reagir('segurando', B.t); }
      // SONS: clique · zumbido da rodinha · errado em "abre" · bip da ligação
      K.som('clique', tC, 0.6); K.som('zumbido', tC + 0.3, 0.3); K.som('errado', tA, 0.6); K.som('bip', tL, 0.5); K.som('bip', tL + 0.5, 0.4);
      // CÂMERA: chegando · perto · frente · olho, topo livre
      K.filmar([CEL_G, mais(PAC, [0, 1.0, 0])], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.3, tam: 1.25 });
      const [x, y] = K.tela(mais(CEL_G, [0.45, 0.25, 0]));
      fx.errado.em({ tela: [x + 40, y] }, tc - tA);
    },
    vini(B, tc) {
      // NA TELA: o Vini na frente da mesa com o celular no ouvido; o monitor com o portfólio · MOSTRA: personagem, monitor
      const tD = quando('designer', B, 0.25), tO = quando('ouve', B, 0.65), tT = quando('temos', B, 0.85);
      ve(comp, cel);
      comp.tela.desenhar((c, w, h) => portfolio(c, w, h, K.clamp(B.p)), 'port' + Math.round(B.p * 30));
      cel.tela.desenhar((c, w, h) => navCel(c, w, h, 'liga', 0), 'liga0');
      // PERSONAGEM: começo mostrando (fala animado, aponta o portfólio) · em "ouve": triste
      const pos = [0.45, 0, -0.2];
      menino.colocar(pos, tc > tO ? [0.3, 1.2, 4] : [-0.45, 1.6, -1.2]);
      if (tc > tO) menino.reagir('triste', tc - tO); else menino.reagir('mostrando', B.t);
      // OBJETOS SE MEXENDO: o celular treme no "já"
      celNaMao(pos, { ouvido: true }); if (tc > tT && tc < tT + 0.35) cel.g.position.x += Math.sin(tc * 70) * 0.01;
      // EFEITOS VISUAIS: "Web designer" · "Já temos site"
      fx.et.designer.em(mais(MONITOR, [0, 0.75, 0.3]), tc - tD);
      fx.et.temos.em([0.8, 2.25, 0.1], tc - tT);
      K.som('bip', B.inicio + 0.05, 0.4); K.som('errado', tT, 0.5);
      // CÂMERA: passando · médio · esquerda · olho
      K.filmar([menino, comp], 'passando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', obstaculos: false, tam: 1.5 });
    },
    risca(B, tc) {
      // NA TELA: a folha com as clínicas; o Vini à direita riscando · MOSTRA: lista, personagem
      const tR = quando('risca', B, 0.15), tP = quando('próxima', B, 0.8);
      ve(lista, comp); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      // ENTRA AGORA: o risco atravessa "Clínica Sorriso" em "risca"; a seta desce pra próxima em "próxima"
      const r = K.suave(K.clamp((tc - tR) / 0.6));
      lista.mostrar('papel', { riscados: 0, risco: Math.round(r * 20) / 20, seta: tc > tP ? 1 : 0 });
      lista.g.rotation.z = Math.sin(tc * 2) * 0.02;
      // PERSONAGEM: começo empurrando (risca com força) · em "próxima": cansado
      menino.colocar([1.25, 0, 0.35], [0.1, 1.7, 0.1]);
      if (tc > tP) menino.reagir('cansado', tc - tP); else menino.reagir('empurrando', B.t);
      K.som('whoosh', tR, 0.5); K.som('clique', tP, 0.5);
      // CÂMERA: afastando · médio · direita · olho
      K.filmar([lista, menino], 'afastando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho', obstaculos: false, tam: 1.5 });
    },
    virada(B, tc) {
      // NA TELA: a recepção; a tela do balcão tentando abrir o site; o Vini na frente do balcão · MOSTRA: tela_erro, personagem
      // CENÁRIO: a clínica, o letreiro Sorriso e o dente na parede (o cenário cuida)
      const tC = quando('clínica', B, 0.3), tA = quando('abre', B, 0.85);
      ve(telaErro);
      // ENTRA AGORA: a tela acende em "clínica"; o erro em "abre" · OBJETOS SE MEXENDO: a rodinha gira e a tela treme no erro
      telaErro.g.scale.setScalar(pop(tc - tC));
      telaErro.mostrar('erroSite', tc > tA ? { erro: true, vermelho: true } : { erro: false, ang: Math.round(tc * 9 * 4) / 4 });
      if (tc > tA && tc < tA + 0.35) telaErro.g.position.x = TELA_ERRO[0] + Math.sin(tc * 60) * 0.03;
      // PERSONAGEM: começo dúvida · em "abre": ideia, apontando a tela
      menino.colocar(VINI_CL, TELA_ERRO);
      if (tc > tA + 0.4) menino.apontar(0.7); else if (tc > tA) menino.reagir('ideia', tc - tA); else menino.reagir('duvida', B.t);
      fx.et.nemAbre.em(mais(TELA_ERRO, [0, 0.9, 0.2]), tc - tA);
      K.som('zumbido', tC, 0.3); K.som('ding', tA, 0.6);
      // CÂMERA: girando · médio · direita · baixo
      K.filmar([telaErro, menino], 'girando', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo', angulo: 20 });
    },
    dono(B, tc) {
      // NA TELA: o dono sorrindo atrás do balcão; a tela com o 404; o paciente vê o erro e sai ligando · MOSTRA: dono, paciente, tela_erro
      const tS = quando('sabe', B, 0.2), tCl = quando('clica', B, 0.38), tCo = quando('concorrente', B, 0.88), tL = quando('liga', B, 0.75);
      ve(telaErro, cel); telaErro.mostrar('erroSite', { erro: true });
      // PERSONAGEM: o dono feliz, de polegar pra cima, sem perceber
      dono.colocar(DONO, [0.6, 1.3, 3]); dono.reagir('segurando', B.t);
      fx.et.certo.em(mais(DONO, [0, 2.15, 0.4]), tc - tS);
      // ENTRA AGORA: o paciente chega ao balcão em "clica" · OBJETOS SE MEXENDO: vê o erro no celular e, em "concorrente", sai ligando
      const A = [3.4, 0, 0.6], BAL = [0.9, 0, -1.4], SAI = [4.6, 0, 1.6];
      let pos;
      if (tc < tCo) {
        pos = paciente.irPara(A, BAL, K.clamp((tc - B.inicio) / Math.max(0.5, tCl - B.inicio + 0.4)), tc, { olhar: mais(BAL, [0.3, 1.05, 0.5]) });
        if (tc > tCl + 0.4) paciente.reagir('duvida', tc - tCl);
      } else { pos = paciente.irPara(BAL, SAI, K.clamp((tc - tCo) / 1.0), tc, { olhar: [6, 1.4, 3] }); }
      cel.tela.desenhar((c, w, h) => navCel(c, w, h, tc > tL ? 'liga' : 'erro', tc), tc > tL ? 'liga' + Math.round(tc * 10) : 'erro');
      celNaMao(pos, { ouvido: tc > tL });
      fx.et.concorrente.em(mais(pos, [0, 2.2, 0]), tc - tCo);
      K.som('ding', tS, 0.5); K.som('bip', tL, 0.5); K.som('passo', tCo + 0.1, 0.5); K.som('passo', tCo + 0.45, 0.5);
      // CÂMERA: revelando · aberto · esquerda · olho
      K.filmar([dono, mais(BAL, [0, 1, 0]), telaErro], 'revelando', B.p, { plano: 'medio', lado: -25, altura: 'olho', tam: 1.6 });
    },
    motivo(B, tc) {
      // NA TELA: o Vini com a prancheta na frente do balcão; a tela com o 404; o dono preocupado · MOSTRA: personagem, tela_erro, dono
      const tM = quando('motivo', B, 0.15), tPg = quando('pagar', B, 0.35), tPa = quando('paciente', B, 0.65), tQ = quando('quebrada', B, 0.92);
      ve(telaErro, prancheta); telaErro.mostrar('erroSite', { erro: true, vermelho: tc > tQ && pisca(tc) });
      // PERSONAGEM: anda até o balcão · começo segurando a prancheta · em "pagar": vitória. O dono: surpreso em "paciente"
      const pos = menino.irPara(mais(VINI_CL, [0.5, 0, 0.9]), VINI_CL, K.clamp(B.p / 0.3), tc, { olhar: [0.6, 1.3, 4] });
      if (B.p > 0.3) { if (tc > tPg) menino.reagir('vitoria', tc - tPg); else menino.reagir('segurando', tc - tM); }
      prancheta.position.set(pos[0] + 0.38, pos[1] + 0.8, pos[2] + 0.32); prancheta.scale.setScalar(0.9 * pop(tc - tM));
      dono.colocar(DONO, [1.0, 1.3, -0.9]); if (tc > tPa) dono.reagir('surpreso', tc - tPa); else dono.reagir('duvida', B.t);
      fx.et.pagar.em(mais(VINI_CL, [-0.3, 2.05, 0.3]), tc - tPg);
      fx.et.perdido.em(mais(DONO, [0.3, 1.95, 0.6]), tc - tPa);
      K.som('certo', tPg, 0.6); K.som('errado', tQ, 0.5);
      // CÂMERA: afastando · médio · frente · olho
      K.filmar([menino, telaErro, dono], 'afastando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
      const [x, y] = K.tela(mais(TELA_ERRO, [0.75, 0.45, 0]));
      fx.certo.em({ tela: [x, y] }, tc - tPg);
    },
    prova(B, tc) {
      // NA TELA: a conversa com a clínica na frente do monitor; o print do erro; a mensagem sendo digitada · MOSTRA: mensagem, personagem
      const tP = quando('prova', B, 0.15), tT = quando('testei', B, 0.55);
      ve(comp, chatMsg, cel); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
      // ENTRA AGORA: o print cai em "prova"; o texto letra por letra a partir de "testei"
      const d = K.clamp((tc - tT) / Math.max(0.6, B.ate - tT - 0.3));
      chatMsg.mostrar('chatProva', { print: Math.round(K.clamp((tc - tP) / 0.4) * 10) / 10, digitado: Math.round(d * 40) / 40 });
      for (let k = 0; k < 8; k++) K.som('clique', tT + k * 0.15, 0.25);
      // PERSONAGEM: à direita · começo ideia · em "testei": segurando (digitando no celular)
      const pos = [1.15, 0, 0.85];
      menino.colocar(pos, [-0.45, 1.6, 0.1]);
      if (tc > tT) menino.reagir('segurando', tc - tT); else menino.reagir('ideia', B.t);
      cel.tela.desenhar((c, w, h) => navCel(c, w, h, 'erro'), 'erro'); celNaMao(pos, { giro: -0.4 });
      fx.et.prova.em([-0.45, 3.15, 0.3], tc - tP);
      K.som('whoosh', tP, 0.5);
      // CÂMERA: chegando · médio · esquerda · olho
      K.filmar([chatMsg, menino], 'chegando', B.p, { plano: 'medio', lado: -20, altura: 'olho', obstaculos: false, tam: 1.6 });
    },
    dia(B, tc) {
      // NA TELA: de noite; o relógio girando; o monitor trocando de clínica, sempre na rodinha · MOSTRA: relogio, personagem, monitor
      const tT = quando('testar', B, 0.05), tC = quando('clínica', B, 0.2), tL = quando('leva', B, 0.6), tD = quando('dia', B, 0.8), m = relogio.userData.m3d;
      ve(comp, relogio); K.entrar(relogio, 'gira', tc - tT, { dur: 0.4 });
      const i = Math.max(0, Math.floor((tc - tC) / 0.4));
      comp.tela.desenhar((c, w, h) => testando(c, w, h, i, Math.round(tc * 9 * 4) / 4), 'teste' + i + Math.round(tc * 36));
      for (let k = 0; k < 5; k++) K.som('clique', tC + k * 0.4, 0.3);
      const g = K.clamp((tc - tL) / Math.max(0.5, B.ate - tL)); m.m.rotation.z = -g * 22; m.h.rotation.z = -1.57 - g * 3.5;
      // PERSONAGEM: começo pensando · em "dia": cansado, suando
      menino.colocar([0.55, 0, -0.35], MONITOR);
      if (tc > tD) { menino.reagir('cansado', tc - tD); menino.suar(tc - tD); } else menino.reagir('pensando', B.t);
      fx.et.dia.em([0.55, 2.3, 0.1], tc - tD);
      K.som('zumbido', tL, 0.5);
      // CÂMERA: subindo · médio · esquerda · baixo
      K.filmar([relogio, menino, comp], 'subindo', B.p, { plano: 'medio', lado: -15, altura: 'baixo', obstaculos: false });
    },
    lista(B, tc) {
      // NA TELA: a lista do Mappoa já pronta com as clínicas de Londrina; o robô com o mapa; o Vini chegando · MOSTRA: tela, robo
      // CENÁRIO: a central, o mapa gigante com pontos brilhando (o cenário cuida)
      const tC = quando('clínicas', B, 0.3), tTe = quando('testado', B, 0.6), tN = quando('não', B, 0.85);
      ve(robo, telaC);
      // ENTRA AGORA: a lista pronta desde o começo; os status aparecem um a um a partir de "testado"; em "não" troca pro grupo SEM SITE
      const sem = tc > tN, n = 2 + Math.floor(K.clamp((tc - tC) / 0.8) * 3);
      const st = tc > tTe ? 1 + Math.floor((tc - tTe) / 0.3) : 0;
      telaC.mostrar('listaClinicas', sem ? { grupo: 'SEM SITE', itens: SEM_SITE, n: 3 } : { grupo: 'COM SITE', itens: CLINICAS, n, st: Math.min(4, st), sel: st >= 2 ? 0 : -1 });
      for (let k = 0; k < 3; k++) K.som('ding', tTe + k * 0.3, 0.25);
      robo.g.position.set(-1.0, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { mapa: true, acena: tc < tC ? 1 : 0 });
      // PERSONAGEM: anda da direita · começo surpreso · em "testado": aponta a tela
      menino.irPara([3.2, 0, 2.4], [2.1, 0, 1.4], K.clamp(B.t / 0.8), tc, { olhar: [0.85, 1.4, 0.1] });
      if (tc > tTe) menino.apontar(0.6); else if (B.t > 0.8) menino.reagir('surpreso', B.t - 0.8);
      if (!sem) fx.et.testado.em([0.85, 3.15, 0.2], tc - tTe); else fx.et.semSite.em([0.85, 3.15, 0.2], tc - tN);
      K.som('whoosh', tN, 0.5);
      // CÂMERA: revelando · médio · direita · olho
      K.filmar([robo, telaC], 'revelando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o lead da Clínica Sorriso enchendo; o robô à esquerda; o Vini à direita · MOSTRA: tela, robo, personagem
      // CENÁRIO: o palco da marca, o logo gigante atrás (o cenário cuida)
      const tM = quando('Mappoa', B, 0.1), tA = quando('acha', B, 0.25), tPx = quando('próximo', B, 0.4), tP = quando('precisa', B, 0.6), tCo = quando('contatos', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tA, { altura: 3 });
      // ENTRA AGORA: os blocos de cima pra baixo (dados, presença digital com o site fora do ar, contatos)
      telaM.mostrar('leadClinica', { ate: tc > tCo ? 3 : tc > tP ? 2 : tc > tA ? 1 : 0 });
      [tA, tP, tCo].forEach((t) => K.som('ding', t, 0.4));
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tP ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "contatos": vitória
      menino.colocar([1.45, 0, 1.0], tc > tCo ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tCo) menino.reagir('vitoria', tc - tCo); else menino.reagir('chamando', B.t);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.proximo.em([-0.35, 3.2, 0.3], tc - tPx);
      K.som('brilho', tM, 0.6);
      // CÂMERA: chegando · médio · frente · baixo
      K.filmar([telaM, robo, menino], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) "Antes": o Vini no telefone e o "já temos site"; (2) "Agora": na clínica, o Vini mostra o erro no celular pro dono · MOSTRA: personagem, celular
      const tT = quando('temos', B, 0.2), tG = quando('Agora', B, 0.42), tMo = quando('mostrando', B, 0.55), tE = quando('erro', B, 0.68), tP = quando('precisa', B, 0.85);
      ve(cel);
      if (tc < tG) {
        ve(comp); comp.tela.desenhar((c, w, h) => portfolio(c, w, h, 0), 'port0');
        cel.tela.desenhar((c, w, h) => navCel(c, w, h, 'liga', 0), 'liga0');
        const pos = [0.45, 0, -0.2];
        menino.colocar(pos, [0.3, 1.2, 4]); menino.reagir('triste', tc - B.inicio);
        celNaMao(pos, { ouvido: true });
        fx.et.antes.em([0.8, 2.25, 0.1], tc - tT);
        K.som('errado', tT, 0.5);
        K.filmar([menino], 'afastando', K.clamp((tc - B.inicio) / Math.max(0.4, tG - B.inicio)), { plano: 'medio', lado: 'direita', altura: 'olho', obstaculos: false });
      } else {
        ve(telaErro); telaErro.mostrar('erroSite', { erro: true });
        cel.tela.desenhar((c, w, h) => navCel(c, w, h, 'erro'), 'erro');
        const pos = [0.7, 0, -1.0];
        menino.colocar(pos, mais(DONO, [0, 1.3, 0])); dono.colocar([-1.2, 0, -1.7], mais(pos, [0, 1.2, 0]));
        if (tc > tP) menino.reagir('vitoria', tc - tP); else menino.reagir('mostrando', tc - tG);
        if (tc > tP) dono.reagir('segurando', tc - tP); else dono.reagir('surpreso', tc - tG);
        // o celular sobe na mão em "mostrando" e gira pro dono em "erro"
        cel.g.scale.setScalar(1.8 * pop(tc - tMo + 0.2));
        cel.g.position.set(pos[0] - 0.45, 1.3, pos[2] - 0.1); cel.g.rotation.set(-0.1, tc > tE ? -0.9 : 0.3, 0);
        fx.et.precisa.em([-0.25, 2.4, -1.3], tc - tP);
        K.som('whoosh', tG, 0.5); K.som('certo', tP, 0.6);
        K.filmar([menino, dono], 'chegando', K.clamp((tc - tG) / (B.ate - tG)), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.8 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Vini no computador; a pergunta; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('Site', B, 0.02), tSg = quando('segue', B, 0.35), tPc = quando('computador', B, 0.55), tDi = quando('digita', B, 0.65), tTe = quando('testa', B, 0.88);
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
      ve(cel, clinica); cel.tela.desenhar((c, w, h) => navCel(c, w, h, 'erro'), 'erro');
      paciente.colocar(PAC, CEL_G); paciente.reagir('susto', 0.5);
      K.filmar([CEL_G, mais(PAC, [0, 1.0, 0])], 'parado', 0, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.35, tam: 1.4 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    const agora = B.plano === 'antes_agora' && tc >= quando('Agora', B, 0.42);
    CS.usar(agora ? 'clinica_odonto' : LUGAR[B.plano] || 'home_office');
    [menino, paciente, dono].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    cel.g.scale.setScalar(5.5); cel.g.position.set(...CEL_G); cel.g.rotation.set(0, 0, 0);
    telaErro.g.scale.setScalar(1); telaErro.g.position.set(...TELA_ERRO);
    lista.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
