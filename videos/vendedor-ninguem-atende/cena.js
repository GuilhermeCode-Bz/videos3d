// Por que o seu vendedor liga e ninguém atende (canal Mappoa): o Léo liga 40 vezes e ninguém atende (número
// desconhecido, spam, caixa postal, recepção, recado na gaveta, "não tenho interesse"); o problema é ligar no escuro.
// O Mappoa acha centenas de clínicas que combinam, com os contatos e o resumo, e prepara a mensagem que ele manda.
// Cenário pronto: o escritório (K.cenario('escritorio')): a mesa do Léo no centro e a clínica veterinária em volta da
// mesa2 (o doutor, o cachorro, a placa e o balcão da recepção). Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  let tl, bl, C, menino, doutor, recep, cachorro, pcm, celLeo, celDr, placaCl, balcao, gaveta, telefone, fone, recado;
  let falaRecep, falaDr, duvida, empresas, icones, resumo, mensagem, janela, escuroM, haloCel;
  const cartoes = [], fundoCartoes = [], ics = { whats: [], insta: [], site: [], resumo: [] }, pontos = [], sinal = [];
  const fx = {};
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const VERDE = '#2e9d5b';
  const BASE = [0, 0, 0];                      // a mesa do Léo (C.centro)
  const TELA = [0, 1.185, -0.1];               // o meio da tela do computador
  const LADO = [1.0, 0, 0.7];                  // o lugar do Léo, à direita da mesa
  const PRA_CAM = [0.7, 1.1, 5];               // um ponto na frente da cena (ele de frente pra câmera)
  // A clínica (em volta da mesa2 do cenário, que fica em [3.4, 0, -2.6], girada -0.25)
  const DR = [4.35, 0, -3.08];                 // o doutor, atrás da ponta direita da mesa2
  const CAO = [4.02, 0.785, -2.6];             // o cachorro, em cima da mesa2
  const CEL_DR = [2.77, 0.8, -2.55];           // o celular do doutor, deitado na mesa2
  const BALCAO = [4.6, 0, -1.2];               // o balcão da recepção
  const RECEP = [4.6, 0, -1.78];               // a recepcionista, atrás do balcão
  const FIXO = [4.3, 1.0, -1.2];               // o telefone fixo, em cima do balcão
  const LEO_FIXO = [3.35, 0, -0.55];           // o Léo do lado do balcão (frase 6)
  const PRA_CAM_CL = [3.6, 1.1, 4];            // um ponto na frente da clínica
  const COLUNA_X = -1.65;                      // a coluna dos cartões das clínicas
  const cardY = (i) => 2.75 - i * 0.26;        // os 8 cartões, antes de separar
  const cardYc = (g) => 2.55 - g * 0.34;       // os 5 que combinam, juntos
  const CLINICAS = ['Clínica Pet Vida', 'VetCare', 'Amigo Fiel', 'Clínica 4 Patas', 'Pet Saúde', 'Vet Center', 'Bicho Feliz', 'Clínica Animal'];
  const VERDES = [0, 2, 3, 5, 7];              // as que combinam com o que ele vende (as outras são cinza e somem)
  const BUSCA = 'clínicas veterinárias em São Paulo';

  function arred(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  const fonte = (c, px, peso = 800) => (c.font = `${peso} ${px}px Montserrat, sans-serif`);

  // ---------- As telas do computador ----------
  function telaPC(estado, n = 0, extra = 0) {
    pcm.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      if (estado === 'desligada') {
        const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#2a2e35'); g.addColorStop(1, '#14161a');
        c.fillStyle = g; c.fillRect(0, 0, w, h);
        c.fillStyle = 'rgba(255,255,255,0.08)'; c.beginPath(); c.moveTo(w * 0.1, 0); c.lineTo(w * 0.35, 0); c.lineTo(w * 0.15, h); c.lineTo(0, h); c.fill();
        return;
      }
      const sobe = estado === 'mappoa_liga' ? extra : 1;
      c.fillStyle = '#f2f7f4'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, h * (1 - sobe), w, h * sobe);
      if (sobe < 1) return;
      c.fillStyle = VERDE; c.fillRect(0, 0, w, h * 0.17);
      c.fillStyle = '#f2f7f4'; c.fillRect(0, h * 0.17, w, h * 0.83);
      fonte(c, h * 0.1, 900); c.fillStyle = '#fff'; c.textBaseline = 'middle'; c.fillText('Mappoa', w * 0.05, h * 0.09);
      arred(c, w * 0.05, h * 0.22, w * 0.9, h * 0.12, 10); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = VERDE; c.lineWidth = 3; c.stroke();
      fonte(c, h * 0.055, 600); c.fillStyle = '#1b1b1b'; c.fillText(BUSCA.slice(0, n) + (n < BUSCA.length && n > 0 ? '|' : ''), w * 0.08, h * 0.28);
      if (estado === 'mappoa_msg') {
        arred(c, w * 0.3, h * 0.5, w * 0.62, h * 0.2, 14); c.fillStyle = '#d4f5c4'; c.fill();
        fonte(c, h * 0.06, 700); c.fillStyle = '#1f6b43'; c.fillText('escrevendo' + '.'.repeat(1 + (extra % 3)), w * 0.35, h * 0.6);
        return;
      }
      for (let i = 0; i < Math.min(extra, 5); i++) {
        const y = h * (0.4 + i * 0.115);
        c.fillStyle = '#fff'; c.fillRect(w * 0.05, y, w * 0.9, h * 0.095);
        c.fillStyle = VERDE; c.fillRect(w * 0.05, y, w * 0.02, h * 0.095);
        fonte(c, h * 0.045, 700); c.fillStyle = '#1b1b1b'; c.fillText(CLINICAS[VERDES[i]], w * 0.1, y + h * 0.048);
        ['#25d366', '#e1306c', '#9aa0a6'].forEach((cor, j) => { c.fillStyle = cor; c.beginPath(); c.arc(w * (0.72 + j * 0.07), y + h * 0.048, h * 0.022, 0, 7); c.fill(); });
      }
      if (extra > 0) { fonte(c, h * 0.045, 800); c.fillStyle = VERDE; c.fillText('+ ' + Math.max(0, extra * 40) + ' clínicas', w * 0.6, h * 0.97 - h * 0.03); }
    }, estado + '|' + n + '|' + extra);
  }

  // ---------- As telas dos celulares ----------
  // estado: chamando (n = o número da ligação), encerrada, apagada, enviado (Léo) · desconhecido, spam, caixa, msg, leo (doutor)
  function telaCel(cel, estado, n = 0, escuro = 0) {
    cel.tela.desenhar((c, w, h) => {
      c.textAlign = 'center'; c.textBaseline = 'middle';
      const fundo = { spam: '#c0392b', leo: '#1f8a5b', chamando: '#20304a', encerrada: '#20304a', desconhecido: '#2b2f36', caixa: '#2b2f36' }[estado] || '#fafafa';
      c.fillStyle = fundo; c.fillRect(0, 0, w, h);
      const claro = fundo !== '#fafafa';
      const txt = (t, y, px, cor = claro ? '#fff' : '#1b1b1b', peso = 800) => { fonte(c, w * px, peso); c.fillStyle = cor; c.fillText(t, w / 2, h * y); };
      const pessoa = (cor) => { c.fillStyle = cor; c.beginPath(); c.arc(w / 2, h * 0.3, w * 0.13, 0, 7); c.fill(); c.beginPath(); c.arc(w / 2, h * 0.46, w * 0.22, Math.PI, 0); c.fill(); };
      if (estado === 'chamando') { txt('Chamando…', 0.15, 0.12); pessoa('#7d8ea3'); txt('Clínica', 0.58, 0.13); if (n) txt(n + 'ª ligação', 0.72, 0.1, '#ffd60a'); c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w / 2, h * 0.88, w * 0.11, 0, 7); c.fill(); }
      else if (estado === 'encerrada') { txt('Chamada', 0.42, 0.13); txt('encerrada', 0.52, 0.13); txt('ninguém atendeu', 0.66, 0.09, '#ff9a8f'); }
      else if (estado === 'desconhecido') { txt('Chamada', 0.12, 0.11, '#c9ced6', 700); pessoa('#9aa0a6'); txt('Número', 0.6, 0.14); txt('desconhecido', 0.7, 0.12); }
      else if (estado === 'spam') { txt('⚠', 0.27, 0.36); txt('Suspeita', 0.55, 0.15); txt('de spam', 0.66, 0.15); }
      else if (estado === 'caixa') { c.strokeStyle = '#fff'; c.lineWidth = w * 0.04; [0.36, 0.64].forEach((x) => { c.beginPath(); c.arc(w * x, h * 0.36, w * 0.11, 0, 7); c.stroke(); }); c.beginPath(); c.moveTo(w * 0.36, h * 0.36 + w * 0.11); c.lineTo(w * 0.64, h * 0.36 + w * 0.11); c.stroke(); txt('Caixa', 0.58, 0.15); txt('postal', 0.68, 0.15); }
      else if (estado === 'msg') { c.fillStyle = '#1f8a5b'; c.fillRect(0, 0, w, h * 0.12); txt('Léo · WhatsApp', 0.06, 0.08, '#fff'); arred(c, w * 0.06, h * 0.2, w * 0.88, h * 0.42, 14); c.fillStyle = '#d4f5c4'; c.fill(); c.textAlign = 'left'; fonte(c, w * 0.085, 700); c.fillStyle = '#1b1b1b'; ['Oi, doutor! Vi que', 'a clínica atende', 'cães e gatos...'].forEach((l, i) => c.fillText(l, w * 0.11, h * (0.29 + i * 0.1))); }
      else if (estado === 'leo') { txt('Chamando…', 0.13, 0.11); c.fillStyle = '#fff'; c.beginPath(); c.arc(w / 2, h * 0.36, w * 0.2, 0, 7); c.fill(); txt('L', 0.365, 0.24, '#1f8a5b', 900); txt('Léo', 0.6, 0.17); txt('da mensagem', 0.7, 0.09); c.fillStyle = '#25d366'; c.beginPath(); c.arc(w / 2, h * 0.87, w * 0.11, 0, 7); c.fill(); }
      else if (estado === 'enviado') { c.fillStyle = '#1f8a5b'; c.fillRect(0, 0, w, h * 0.12); arred(c, w * 0.2, h * 0.3, w * 0.72, h * 0.25, 14); c.fillStyle = '#d4f5c4'; c.fill(); txt('✓✓ enviada', 0.62, 0.11, '#1f8a5b'); }
      else { c.fillStyle = '#111317'; c.fillRect(0, 0, w, h); }
      if (escuro > 0) { c.fillStyle = `rgba(10,10,12,${escuro})`; c.fillRect(0, 0, w, h); }
    }, estado + '|' + n + '|' + escuro);
  }

  // Balão de fala desenhado (fica virado pra câmera)
  function balao(larg, alt, linhas, cor = '#1b1b1b') {
    const t = K.telaCanvas(larg, alt, 420);
    t.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      arred(c, 6, 6, w - 12, h * 0.8, 30); c.fillStyle = '#ffffff'; c.fill(); c.strokeStyle = '#3b4048'; c.lineWidth = 6; c.stroke();
      c.beginPath(); c.moveTo(w * 0.42, h * 0.8); c.lineTo(w * 0.5, h * 0.98); c.lineTo(w * 0.56, h * 0.8); c.fillStyle = '#fff'; c.fill();
      fonte(c, h * (linhas.length > 1 ? 0.2 : 0.28), 900); c.fillStyle = cor; c.textAlign = 'center'; c.textBaseline = 'middle';
      linhas.forEach((l, i) => c.fillText(l, w / 2, h * (0.4 + (i - (linhas.length - 1) / 2) * 0.26)));
    }, 'b');
    t.m.material.transparent = true;
    t.m.material.side = THREE.DoubleSide;
    const g = new THREE.Group();
    g.add(t.m);
    g.visible = false;
    K.scene.add(g);
    return g;
  }

  // O balão em cima do Léo: "?" (frase 3) ou "Clínica de quê?" (frase 9)
  function desenharDuvida(estado) {
    duvida.t.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      if (estado === '?') {
        c.fillStyle = '#ffffff'; c.beginPath(); c.arc(w / 2, h / 2, h * 0.46, 0, 7); c.fill();
        c.strokeStyle = '#2f6fd6'; c.lineWidth = 8; c.stroke();
        fonte(c, h * 0.6, 900); c.fillStyle = '#2f6fd6'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', w / 2, h * 0.54);
        return;
      }
      arred(c, 6, 6, w - 12, h - 12, h * 0.4); c.fillStyle = '#ffffff'; c.fill(); c.strokeStyle = '#2f6fd6'; c.lineWidth = 8; c.stroke();
      fonte(c, h * 0.3, 900); c.fillStyle = '#2f6fd6'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Clínica de quê?', w / 2, h * 0.52);
    }, 'd' + estado);
  }

  // A mensagem pronta: n linhas escritas
  function desenharMensagem(n) {
    mensagem.t.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      arred(c, 6, 6, w - 12, h * 0.82, 26); c.fillStyle = '#d4f5c4'; c.fill(); c.strokeStyle = '#1f8a5b'; c.lineWidth = 6; c.stroke();
      c.beginPath(); c.moveTo(w * 0.75, h * 0.86); c.lineTo(w * 0.86, h * 0.99); c.lineTo(w * 0.88, h * 0.86); c.fillStyle = '#d4f5c4'; c.fill();
      const linhas = ['Oi, doutor! Vi que a clínica', 'atende cães e gatos aqui', 'em São Paulo e pensei', 'numa ideia pra vocês...'];
      fonte(c, h * 0.1, 700); c.fillStyle = '#1b1b1b'; c.textBaseline = 'middle';
      linhas.slice(0, n).forEach((l, i) => c.fillText(l, w * 0.07, h * (0.16 + i * 0.17)));
    }, 'msg' + n);
  }

  // ---------- Montagem (uma vez só) ----------

  function montar(timeline) {
    tl = timeline;
    bl = K.blocos(tl);
    C = K.cenario('escritorio');
    const madeira = K.mat(0xd9b98a), escuro = K.mat(0x3b4048);

    // A mesa com o computador do Léo, no centro
    pcm = K.computador();
    pcm.g.position.set(...BASE);
    K.lugar(pcm.g);
    K.nomear('computador', pcm.g);

    // O celular do Léo (vai na mão dele), um pouco maior que o de verdade pra ler a tela
    celLeo = K.celular();
    celLeo.g.scale.setScalar(1.5);
    celLeo.g.visible = false;
    K.lugar(celLeo.g);
    K.nomear('celular_leo', celLeo.g);
    haloCel = K.halo(0xbfe3ff, 1.4);
    haloCel.material.depthTest = false;
    haloCel.renderOrder = 1001;
    haloCel.visible = false;

    // O celular do doutor, deitado na mesa2 (tela pra cima)
    celDr = K.celular();
    celDr.g.scale.setScalar(1.6);
    celDr.g.position.set(...CEL_DR);
    celDr.g.rotation.set(-Math.PI / 2, 0, 0.35);
    K.lugar(celDr.g);
    K.nomear('celular_doutor', celDr.g);

    // A placa da clínica, na parede atrás da mesa2
    placaCl = K.telaCanvas(1.4, 0.4, 420);
    placaCl.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#1f6b43'; c.fillRect(0, 0, w, h * 0.12); c.fillRect(0, h * 0.88, w, h * 0.12);
      fonte(c, h * 0.42, 900); c.fillStyle = '#1f6b43'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🐾 CLÍNICA VET', w / 2, h * 0.52);
    }, 'p');
    placaCl.m.position.set(4.25, 2.35, -4.34);
    K.scene.add(placaCl.m);
    K.lugar(placaCl.m);
    K.nomear('placa_clinica', placaCl.m);

    // O balcão da recepção, com a gaveta (na frente, pra +z) e os recados velhos dentro
    balcao = new THREE.Group();
    balcao.position.set(...BALCAO);
    K.scene.add(balcao);
    const corpo = K.malha(new THREE.BoxGeometry(1.2, 0.96, 0.5), madeira);
    corpo.position.set(0, 0.48, 0);
    const tampo = K.malha(new THREE.BoxGeometry(1.3, 0.05, 0.6), K.mat(0xf4f1ea));
    tampo.position.set(0, 0.985, 0);
    const faixa = K.malha(new THREE.BoxGeometry(1.21, 0.12, 0.02), K.mat(0x2e9d5b), false);
    faixa.position.set(0, 0.62, 0.252);
    balcao.add(corpo, tampo, faixa);
    gaveta = new THREE.Group();
    gaveta.position.set(0.25, 0.78, 0.0);
    const fundoG = K.malha(new THREE.BoxGeometry(0.46, 0.02, 0.44), K.mat(0xc9a676), false);
    fundoG.position.set(0, -0.08, 0);
    gaveta.add(fundoG);
    [[0, 0, 0.22, 0.48, 0.18, 0.03], [-0.23, 0, 0, 0.02, 0.18, 0.44], [0.23, 0, 0, 0.02, 0.18, 0.44], [0, 0, -0.22, 0.48, 0.18, 0.02]].forEach(([x, y, z, a, b, cc], i) => {
      const p = K.malha(new THREE.BoxGeometry(a, b, cc), i === 0 ? K.mat(0xe3c99a) : K.mat(0xc9a676), false);
      p.position.set(x, y, z); gaveta.add(p);
    });
    const puxador = K.malha(new THREE.BoxGeometry(0.14, 0.03, 0.03), escuro, false);
    puxador.position.set(0, 0, 0.25);
    gaveta.add(puxador);
    const rv = K.rand(5);
    for (let i = 0; i < 6; i++) {
      const p = K.malha(new THREE.BoxGeometry(0.14, 0.004, 0.14), K.mat([0xffe066, 0xffd23f, 0xfff08a][i % 3]), false);
      p.position.set(-0.12 + rv() * 0.24, -0.065 + i * 0.006, -0.12 + rv() * 0.24);
      p.rotation.y = rv() * 3;
      gaveta.add(p);
    }
    balcao.add(gaveta);
    K.lugar(balcao);
    K.nomear('balcao', balcao);

    // O telefone fixo (a base fica no balcão; o fone sobe pra orelha da recepcionista)
    telefone = new THREE.Group();
    telefone.position.set(...FIXO);
    const baseT = K.malha(new THREE.BoxGeometry(0.28, 0.08, 0.22), K.mat(0xe9dfc8));
    baseT.position.set(0, 0.045, 0);
    const teclas = K.malha(new THREE.BoxGeometry(0.12, 0.01, 0.1), escuro, false);
    teclas.position.set(0.04, 0.09, 0.03);
    telefone.add(baseT, teclas);
    K.scene.add(telefone);
    K.lugar(telefone);
    K.nomear('telefone_fixo', telefone);
    fone = new THREE.Group();
    const cabo = K.malha(new THREE.BoxGeometry(0.06, 0.05, 0.22), K.mat(0xe9dfc8));
    const pontas = [-0.1, 0.1].map((z) => { const m = K.malha(new THREE.BoxGeometry(0.09, 0.07, 0.08), K.mat(0xe9dfc8)); m.position.set(0, -0.02, z); return m; });
    fone.add(cabo, ...pontas);
    K.scene.add(fone);

    // O recado amarelo
    recado = K.malha(new THREE.BoxGeometry(0.16, 0.006, 0.16), K.mat(0xffd23f), false);
    recado.visible = false;
    K.scene.add(recado);
    K.nomear('recado', recado);

    // Os balões de fala
    falaRecep = balao(1.3, 0.55, ['O doutor tá ocupado.', 'Quer deixar recado?']);
    falaRecep.position.set(RECEP[0] - 0.1, 2.05, RECEP[2] + 0.2);
    K.lugar(falaRecep); K.nomear('fala_recepcao', falaRecep);
    falaDr = balao(1.25, 0.42, ['Não tenho interesse.'], '#c0392b');
    falaDr.position.set(DR[0] - 0.15, 2.2, DR[2] + 0.3);
    K.lugar(falaDr); K.nomear('fala_doutor', falaDr);

    // O balão em cima da cabeça do Léo
    duvida = new THREE.Group();
    duvida.t = K.telaCanvas(0.9, 0.42, 360);
    duvida.t.m.material.transparent = true;
    duvida.t.m.material.side = THREE.DoubleSide;
    duvida.add(duvida.t.m);
    duvida.position.set(LADO[0] - 0.12, 1.98, LADO[2] + 0.1);
    duvida.visible = false;
    K.scene.add(duvida);
    K.lugar(duvida);
    K.nomear('duvida', duvida);
    desenharDuvida('?');

    // Os cartões das clínicas (saem da tela), as fileiras de trás (as centenas) e os ícones do lado de cada um
    empresas = new THREE.Group();
    K.scene.add(empresas);
    K.nomear('empresas', empresas);
    const cartao = (nome, cinza) => {
      const t = K.telaCanvas(0.62, 0.21, 260);
      t.desenhar((c, w, h) => {
        const cor = cinza ? '#9aa0a6' : VERDE;
        arred(c, 3, 3, w - 6, h - 6, 14); c.fillStyle = cinza ? '#eef0f2' : '#ffffff'; c.fill(); c.strokeStyle = cor; c.lineWidth = 6; c.stroke();
        c.fillStyle = cor; c.beginPath(); c.arc(h * 0.5, h * 0.5, h * 0.3, 0, 7); c.fill();
        c.fillStyle = '#fff'; fonte(c, h * 0.3, 900); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🐾', h * 0.5, h * 0.53);
        c.textAlign = 'left'; c.fillStyle = cinza ? '#7d848c' : '#1b1b1b'; fonte(c, h * 0.28, 800); c.fillText(nome, h * 0.95, h * 0.4);
        c.fillStyle = '#6b7280'; fonte(c, h * 0.2, 600); c.fillText(cinza ? 'não combina' : 'São Paulo', h * 0.95, h * 0.72);
      }, 'c');
      t.m.material.side = THREE.DoubleSide;
      t.m.visible = false;
      empresas.add(t.m);
      return t.m;
    };
    CLINICAS.forEach((nome, i) => { const m = cartao(nome, !VERDES.includes(i)); m.userData.verde = VERDES.indexOf(i); cartoes.push(m); });
    for (let r = 1; r <= 3; r++) for (let g = 0; g < 5; g++) { const m = cartao(CLINICAS[(g * 3 + r) % 8], false); m.userData.fila = r; m.userData.g = g; fundoCartoes.push(m); }
    icones = new THREE.Group();
    K.scene.add(icones);
    K.nomear('icones', icones);
    const disco = (cor, r = 0.055) => { const m = K.malha(new THREE.CylinderGeometry(r, r, 0.03, 20), K.mat(cor), false); m.rotation.x = Math.PI / 2; return m; };
    const faltando = { 2: 'insta', 4: 'site' };           // o que não é público em alguns cartões
    VERDES.forEach((_, g) => {
      const y = cardYc(g), z = 0.2;
      [['whats', 0x25d366, -1.27], ['insta', 0xe1306c, -1.15], ['site', 0x8a929c, -1.03]].forEach(([tipo, cor, x]) => {
        const m = disco(cor);
        m.position.set(x, y, z);
        m.visible = false;
        if (faltando[g] === tipo) m.userData.falta = true;
        icones.add(m); K.lugar(m); ics[tipo].push(m);
      });
      const barra = K.malha(new THREE.BoxGeometry(0.2, 0.06, 0.02), K.mat(0x2f6fd6), false);
      barra.position.set(-0.83, y, z);
      barra.visible = false;
      icones.add(barra); K.lugar(barra); ics.resumo.push(barra);
    });
    // O resumo do negócio (o cartão de cima abre e mostra 3 linhas)
    resumo = K.telaCanvas(0.62, 0.36, 260);
    resumo.desenhar((c, w, h) => {
      arred(c, 3, 3, w - 6, h - 6, 14); c.fillStyle = '#eef4fd'; c.fill(); c.strokeStyle = '#2f6fd6'; c.lineWidth = 5; c.stroke();
      fonte(c, h * 0.13, 900); c.fillStyle = '#2f6fd6'; c.textBaseline = 'middle'; c.fillText('Resumo do negócio', w * 0.06, h * 0.17);
      fonte(c, h * 0.11, 600); c.fillStyle = '#1b1b1b';
      ['Atende cães e gatos', 'Banho, tosa e vacina', 'Quer mais clientes'].forEach((l, i) => c.fillText('• ' + l, w * 0.06, h * (0.42 + i * 0.2)));
    }, 'r');
    resumo.m.material.side = THREE.DoubleSide;
    resumo.m.position.set(COLUNA_X + 0.7, cardYc(0) + 0.32, 0.25);
    resumo.m.visible = false;
    icones.add(resumo.m);
    K.lugar(resumo.m);

    // O balão da mensagem pronta
    mensagem = new THREE.Group();
    mensagem.t = K.telaCanvas(0.95, 0.55, 360);
    mensagem.t.m.material.transparent = true;
    mensagem.t.m.material.side = THREE.DoubleSide;
    mensagem.add(mensagem.t.m);
    mensagem.position.set(0.25, 1.75, 0.3);
    mensagem.visible = false;
    K.scene.add(mensagem);
    K.lugar(mensagem);
    K.nomear('mensagem', mensagem);
    desenharMensagem(4);

    // O janelão: uma película na frente dele (fica laranja de tarde) e os pontinhos verdes das empresas lá fora
    janela = K.malha(new THREE.PlaneGeometry(7, 2.4), new THREE.MeshBasicMaterial({ color: 0xff8a3c, transparent: true, opacity: 0.02, depthWrite: false }), false);
    janela.position.set(-0.5, 2.3, -4.33);
    K.scene.add(janela);
    K.lugar(janela);
    K.nomear('janela', janela);
    const r = K.rand(11);
    for (let i = 0; i < 18; i++) {
      const p = K.malha(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0x3ee07a }), false);
      p.position.set(-1.2 + r() * 4.0, 1.45 + r() * 1.7, -4.3);
      p.visible = false;
      K.scene.add(p); K.lugar(p);
      pontos.push(p);
    }

    // Os pontinhos do sinal (do celular do Léo até o telefone fixo)
    for (let i = 0; i < 10; i++) {
      const p = K.malha(new THREE.SphereGeometry(0.035, 10, 8), new THREE.MeshBasicMaterial({ color: 0x2e9d5b }), false);
      p.visible = false;
      K.scene.add(p);
      sinal.push(p);
    }

    // O escuro da frase 11: uma película preta na frente da câmera (só a luz do celular passa)
    escuroM = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshBasicMaterial({ color: 0x04060b, transparent: true, opacity: 0, depthTest: false, depthWrite: false, fog: false, toneMapped: false }));
    escuroM.renderOrder = 999;
    escuroM.visible = false;
    K.scene.add(escuroM);

    // Os personagens: o doutor (dono da clínica), a recepcionista e o cachorro (o "personagem" é só o Léo)
    doutor = K.boneco({ tipo: 'doutor' });
    K.semNome(doutor.g); K.nomear('doutor', doutor.g);
    recep = K.boneco({ tipo: 'menina' });
    K.semNome(recep.g); K.nomear('recepcionista', recep.g);
    cachorro = K.cachorro();
    K.nomear('cachorro', cachorro.g);
    // O Léo, com as cores do canal
    menino = K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x3a2418, pele: 0xe6b48a } });

    // Textos e efeitos
    fx.cont = K.contador();
    fx.certo = K.marca('certo');
    fx.errado = K.marca('errado');
    fx.seguir = K.cartaoSeguir();
    fx.festa = K.festa([0, 1.5, 0]);
    fx.rot = K.rotulo('Mappoa');
    fx.ondas = K.ondas(0x2e9d5b, 4, 0.6);
    const e = (txt, cor) => K.etiqueta(txt, cor);
    fx.et = {
      zero: e('0 atenderam', 'vermelho'), desc: e('Número desconhecido', 'azul'), spam: e('Spam?', 'vermelho'),
      caixa: e('Direto pra caixa postal', 'vermelho'), fixo: e('Telefone fixo', 'azul'), recep: e('Recepção', 'laranja'),
      esquecido: e('Recado esquecido', 'vermelho'), igual: e('Discurso igual pra todos', 'vermelho'), escuro: e('Ligar no escuro', 'laranja'),
      combina: e('Só as que combinam', 'verde'), resumo: e('Resumo do negócio', 'azul'), msg: e('Mensagem pronta', 'verde'),
      sabe: e('Já sabe quem é', 'verde'), sabendo: e('Liga sabendo pra quem', 'laranja'), antes: e('Antes: 0 alô', 'vermelho'),
      agora: e('Agora: centenas de clínicas certas', 'verde'), ligar: e('Ligar?', 'azul'), mandar: e('Mensagem?', 'verde')
    };
  }

  // ---------- Ajudantes dos planos ----------

  // O celular na mão direita de alguém, virado pra câmera (chamar depois do K.filmar)
  function celNaMao(cel, quem, d = [-0.05, 0.2, 0.1], chacoalha = 0) {
    const m = quem.mao(1);
    cel.g.visible = true;
    cel.g.position.set(m[0] + d[0], m[1] + d[1] + chacoalha, m[2] + d[2]);
    cel.g.rotation.set(0, 0, 0);
    cel.g.lookAt(K.camera.position);
  }
  const pontoCelLeo = () => { const m = menino.mao(1); return [m[0] - 0.05, m[1] + 0.2, m[2] + 0.1]; };
  // Os cartões das clínicas. sai(i): 0 (dentro da tela) a 1 (no lugar); junta: 0 (os 8 em fila) a 1 (só os 5 verdes juntos)
  function cartoesEm(sai, junta = 0, fundo = () => 0) {
    empresas.visible = true;
    const j = K.suave(K.clamp(junta));
    cartoes.forEach((m, i) => {
      const k = K.suave(K.clamp(sai(i)));
      const verde = m.userData.verde >= 0;
      const yAte = verde ? K.lerp(cardY(i), cardYc(m.userData.verde), j) : cardY(i);
      const some = verde ? 1 : 1 - j;
      m.visible = k > 0 && some > 0.02;
      m.position.set(K.lerp(TELA[0], COLUNA_X - (verde ? 0 : 0.6 * j), k), K.lerp(TELA[1], yAte, k), K.lerp(TELA[2], 0.2, k));
      m.rotation.set(0, 0.25 + (1 - k) * Math.PI, 0);
      m.scale.setScalar((0.3 + 0.7 * k) * some);
    });
    fundoCartoes.forEach((m, n) => {
      const k = K.suave(K.clamp(fundo(n)));
      const { fila, g } = m.userData;
      m.visible = k > 0;
      m.position.set(K.lerp(TELA[0], COLUNA_X + 0.13 * fila, k), K.lerp(TELA[1], cardYc(g) + 0.07 * fila, k), K.lerp(TELA[2], 0.2 - 0.22 * fila, k));
      m.rotation.set(0, 0.25 + (1 - k) * Math.PI, 0);
      m.scale.setScalar((0.3 + 0.62 * k));
    });
  }
  // Os ícones já no lugar
  function iconesProntos(comResumo = true) {
    icones.visible = true;
    ['whats', 'insta', 'site', 'resumo'].forEach((t) => ics[t].forEach((m) => { m.visible = !m.userData.falta; }));
    resumo.m.visible = comResumo;
  }
  // A tarde chegando: o janelão fica laranja e a luz esquenta (k de 0 a 1)
  function tarde(k) {
    janela.material.opacity = 0.02 + 0.42 * k;
    if (k > 0) K.ceu('interior', 'tarde', 0.55 * k);
  }
  // O escuro (k de 0 a 1): a película preta na frente da câmera (chamar depois do K.filmar)
  function escurecer(k) {
    if (k <= 0.001) { escuroM.visible = false; return; }
    const cam = K.camera;
    const d = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    escuroM.visible = true;
    escuroM.position.copy(cam.position).addScaledVector(d, 0.3);
    escuroM.quaternion.copy(cam.quaternion);
    escuroM.material.opacity = 0.8 * k;
  }
  // A clínica: o doutor e o cachorro no lugar de sempre
  function clinica(tc, op = {}) {
    doutor.colocar(DR, op.olhar || CAO);
    cachorro.em(CAO, tc, Object.assign({ rumo: -1.3, chao: CAO[1], cara: 'feliz', abana: 0.6 }, op.cao || {}));
  }
  // Rumo das ondas: o ângulo que vira o +x do grupo pra um ponto
  const rumoPara = (de, pra) => Math.atan2(-(pra[2] - de[2]), pra[0] - de[0]);
  const olharCam = (obj) => obj.lookAt(K.camera.position);

  // ---------- Planos: um por frase do roteiro.json ----------

  const P = {
    gancho(B, tc) {
      // NA TELA: o Léo no centro com o celular; o computador desligado à esquerda; o janelão atrás · MOSTRA: personagem, celular_leo
      // CENÁRIO: o escritório de dia; pelo janelão, os prédios (o K.cenario cuida)
      telaPC('desligada');
      const tQ = quando('quarenta', B, 0.35), tE = quando('empresas', B, 0.6), tA = quando('atenderam', B, 0.85);
      // PERSONAGEM: de frente · começo: acena · "quarenta": chamando, com o celular
      // INTERAÇÃO: ele leva o celular e liga de novo a cada número do contador
      menino.colocar(LADO, PRA_CAM);
      if (tc > tQ) menino.reagir('chamando', tc - tQ); else { menino.humor('feliz'); menino.acenar(B.t); }
      // ENTRA AGORA e OBJETOS SE MEXENDO: o contador corre de 1 até 40 (de "quarenta" a "empresas")
      const n = Math.max(1, Math.round(40 * K.clamp((tc - tQ) / Math.max(0.5, tE - tQ + 0.3))));
      telaCel(celLeo, 'chamando', tc > tQ ? n : 0);
      // EFEITOS VISUAIS: a pergunta no topo (o motor põe) · o contador "40 ligações"
      fx.cont.em(String(n), mais(LADO, [-0.6, 1.85, 0.1]), tc - tQ, 'LIGAÇÕES');
      // SONS: bip a cada número · clique no "atenderam?"
      for (let k = 0; k < 8; k++) K.som('bip', tQ + k * Math.max(0.08, (tE - tQ) / 8), 0.25);
      K.som('clique', tA, 0.5);
      // CÂMERA: alvo [personagem, celular_leo] · revelando · aberto · frente · altura do olho · topo livre
      const pC = pontoCelLeo();
      K.filmar([menino, pC], 'revelando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
      celNaMao(celLeo, menino);
    },

    nenhuma(B, tc) {
      // NA TELA: o celular do Léo grande, na mão dele, "Chamando…"; o rosto dele em cima · MOSTRA: celular_leo
      telaPC('desligada');
      const tN = quando('nenhuma', B, 0.05), tT1 = quando('tocou', B, 0.3), tNa = quando('nada', B, 0.8);
      // PERSONAGEM: olhando o celular · começo: dúvida (balança o celular) · "nada": triste
      // INTERAÇÃO: ele sacode o celular esperando; a tela apaga na mão dele
      menino.colocar(LADO, [0.4, 1, 3]);
      if (tc > tNa) menino.reagir('triste', tc - tNa); else menino.reagir('duvida', B.t);
      // OBJETOS SE MEXENDO: as ondas do toque ("tocou, tocou"); no "nada", "Chamada encerrada" e a tela apaga
      const escuroT = Math.round(K.clamp((tc - tNa - 0.4) / 0.6) * 8) / 10;
      telaCel(celLeo, tc > tNa ? 'encerrada' : 'chamando', 40, escuroT);
      const chacoalha = tc < tNa ? Math.sin(B.t * 18) * 0.025 : 0;
      // SONS: apito de chamada nos dois "tocou" · desliga ("nada")
      K.som('apito', tT1, 0.35); K.som('apito', tT1 + 0.45, 0.35);
      K.som('desliga', tNa, 0.7);
      // CÂMERA: alvo o celular e a cabeça · chegando · perto · direita · do alto
      const pC = pontoCelLeo();
      K.filmar([pC, mais(LADO, [0, 1.35, 0])], 'chegando', B.p, { plano: 'perto', lado: 25, altura: 'olho', tam: 0.5 });
      celNaMao(celLeo, menino, [-0.05, 0.2, 0.1], chacoalha);
      if (tc > tT1 && tc < tNa) fx.ondas.em(pC, rumoPara(pC, K.camera.position.toArray()) + 0.9, tc - tT1, 0.5, 1.6);
      // EFEITOS VISUAIS: etiqueta vermelha "0 atenderam" ("Nenhuma") · ✗ do lado ("nada")
      fx.et.zero.em(mais(pC, [0, 0.42, 0]), tc - tN);
      fx.errado.em(mais(pC, [0.3, -0.05, 0]), tc - tNa);
    },

    por_que(B, tc) {
      // NA TELA: o Léo da cintura pra cima, coçando a cabeça; o balão "?" em cima · MOSTRA: personagem, duvida
      telaPC('desligada');
      const tP = quando('por', B, 0.2), tA = quando('atende', B, 0.7);
      // PERSONAGEM: de frente · começo: pensando · "atende": dúvida, abrindo os braços
      // INTERAÇÃO: ele olha pro celular apagado e depois pra câmera
      menino.colocar(LADO, PRA_CAM);
      if (tc > tA) menino.reagir('duvida', tc - tA); else menino.reagir('pensando', B.t);
      telaCel(celLeo, 'apagada');
      // ENTRA AGORA: o balão "?" cresce em cima da cabeça ("por")
      desenharDuvida('?');
      K.entrar(duvida, 'cresce', tc - tP, { som: 'estalo', destaque: false });
      duvida.position.y += Math.sin(B.t * 3) * 0.02;
      // CÂMERA: alvo [personagem, duvida] · girando · médio · esquerda · altura do olho
      K.filmar([menino, duvida], 'girando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho', angulo: 25 });
      olharCam(duvida);
    },

    desconhecido(B, tc) {
      // NA TELA: o celular do doutor grande, deitado na mesa dele, vibrando; atrás o doutor com o cachorro · MOSTRA: celular_doutor
      // CENÁRIO: o canto da clínica: a mesa2, a placa na parede
      const tD = quando('desconhecido', B, 0.4), tS = quando('spam', B, 0.85);
      // OBJETOS SE MEXENDO: o celular vibra; "Número desconhecido"; no "spam", a tela vermelha "Suspeita de spam"
      telaCel(celDr, tc > tS ? 'spam' : 'desconhecido');
      celDr.g.position.x += Math.sin(B.t * 55) * 0.006;
      celDr.g.rotation.z += Math.sin(B.t * 47) * 0.04;
      // PERSONAGEM: o doutor atrás da mesa · começo: segurando o cachorro · "spam": olha o celular, bravo
      // INTERAÇÃO: o celular vibra pedindo atenção; o doutor olha de canto e ignora
      clinica(tc, { olhar: tc > tS ? CEL_DR : CAO });
      if (tc > tS) doutor.reagir('bravo', tc - tS); else doutor.reagir('segurando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Número desconhecido" · etiqueta vermelha "Spam?"
      fx.et.desc.em(mais(CEL_DR, [0, 0.35, 0]), tc - tD);
      // SONS: zumbido do celular vibrando · errado ("spam")
      K.som('zumbido', B.inicio + 0.05, 0.4);
      K.som('errado', tS, 0.6);
      // CÂMERA: alvo o celular do doutor · chegando · detalhe · frente · de cima
      K.filmar(celDr.g, 'chegando', B.p, { plano: 'detalhe', lado: 'frente', altura: 'cima' });
      if (tc > tS) fx.et.spam.em(mais(CEL_DR, [0, 0.3, 0.25]), tc - tS);
    },

    caixa_postal(B, tc) {
      // NA TELA: a mesa do doutor com o celular quieto; o doutor ocupado com o cachorro; a placa · MOSTRA: celular_doutor, doutor
      const tC = quando('caixa', B, 0.65), tP = quando('postal', B, 0.85), tN = quando('nem', B, 0.25);
      // OBJETOS SE MEXENDO: o celular não vibra; a tela acende "Caixa postal" ("caixa") e apaga ("postal")
      const apaga = Math.round(K.clamp((tc - tP) / 0.5) * 9) / 10;
      telaCel(celDr, tc > tC ? 'caixa' : 'apagada', 0, apaga);
      // PERSONAGEM: o doutor · começo: segurando o cachorro · "postal": mostrando o cachorro (nem percebe o celular)
      // INTERAÇÃO: ele cuida do cachorro; o celular apaga sem ninguém ver
      clinica(tc, { cao: { abana: 1, cara: 'feliz' } });
      if (tc > tP) doutor.reagir('mostrando', tc - tP); else doutor.reagir('segurando', B.t);
      // SONS: desliga (o celular apagando)
      K.som('desliga', tP, 0.6);
      // CÂMERA: alvo [celular_doutor, doutor] · passando · médio · perfil direito · de baixo
      K.filmar([celDr.g, doutor, cachorro.g], 'passando', B.p, { plano: 'medio', lado: -30, altura: 'olho' });
      // EFEITOS VISUAIS: etiqueta vermelha "Direto pra caixa postal" ("caixa") · ✗ do lado ("postal")
      fx.et.caixa.em(mais(CEL_DR, [0.4, 0.55, 0]), tc - tC);
      const [ex, ey] = K.tela(mais(CEL_DR, [0.4, 0.55, 0]));
      fx.errado.em({ tela: [ex, ey - 130] }, tc - tP);
      K.som('estalo', tN, 0.2);
    },

    fixo(B, tc) {
      // NA TELA: o telefone fixo no balcão, tocando; o Léo do lado, discando no celular · MOSTRA: telefone_fixo, personagem
      // CENÁRIO: o balcão da recepção, com a placa atrás
      const tT = quando('tenta', B, 0.3), tF = quando('fixo', B, 0.6);
      // ENTRA AGORA: o telefone cai no balcão ("tenta")
      telefone.visible = true;
      K.entrar(telefone, 'cai', tc - tT, { som: 'baque' });
      fone.position.set(FIXO[0], FIXO[1] + 0.12, FIXO[2]);
      fone.rotation.set(0, 0, 0);
      fone.visible = tc > tT + 0.25;
      if (tc > tF) { const pulo = Math.max(0, Math.sin((tc - tF) * 14)) * 0.03; telefone.position.y += pulo; fone.position.y += pulo * 1.6; }
      // PERSONAGEM: anda da entrada até o balcão · começo: ideia · "fixo": chamando, com o celular
      // INTERAÇÃO: ele disca e o telefone da clínica começa a tocar
      menino.irPara(C.entrada, LEO_FIXO, K.faixa(B.p, 0, 0.45), tc, { olhar: FIXO });
      if (tc > tF) menino.reagir('chamando', tc - tF); else if (B.p > 0.45) menino.reagir('ideia', tc - (B.inicio + 0.45 * B.dur));
      telaCel(celLeo, 'chamando', 41);
      // SONS: apito de chamada ("fixo"), duas vezes
      K.som('apito', tF, 0.45); K.som('apito', tF + 0.5, 0.45);
      // CÂMERA: alvo [telefone_fixo, personagem] · subindo · médio · frente · do alto
      K.filmar([telefone, menino], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
      celNaMao(celLeo, menino);
      // EFEITOS VISUAIS: etiqueta azul "Telefone fixo" ("fixo") · os pontinhos do sinal, do celular até o telefone
      fx.et.fixo.em(mais(FIXO, [0, 0.45, 0]), tc - tF);
      const de = celLeo.g.position.toArray(), ate = mais(FIXO, [0, 0.12, 0]);
      sinal.forEach((p, i) => {
        const k = ((tc - tF) * 0.9 + i / sinal.length) % 1;
        p.visible = tc > tF;
        p.position.set(...K.lerp3(de, ate, k));
        p.position.y += Math.sin(k * Math.PI) * 0.25;
      });
      if (tc > tF) fx.ondas.em(ate, rumoPara(ate, K.camera.position.toArray()), tc - tF, 0.45, 1.8);
    },

    recepcao(B, tc) {
      // NA TELA: a recepcionista atrás do balcão, com o fone na orelha e o balão; o doutor atrás com o cachorro · MOSTRA: recepcionista, fala_recepcao
      const tA = quando('atende', B, 0.15), tR = quando('recepção', B, 0.3), tO = quando('ocupado', B, 0.55);
      // PERSONAGEM: a recepcionista · começo: segurando o fone · "ocupado": mostrando o doutor atrás dela. O doutor: segurando o cachorro
      // INTERAÇÃO: ela atende e aponta pro doutor ocupado; ele nem olha
      recep.colocar(RECEP, tc > tO ? DR : PRA_CAM_CL);
      if (tc > tO) recep.reagir('mostrando', tc - tO); else recep.reagir('segurando', B.t);
      clinica(tc, { cao: { come: tc > tO ? 1 : 0, cara: tc > tO ? 'comendo' : 'feliz' } });
      doutor.reagir('segurando', B.t);
      // OBJETOS SE MEXENDO: o fone sobe do telefone pra orelha dela ("atende")
      const k = K.suave(K.clamp((tc - tA) / 0.4));
      const orelha = mais(RECEP, [0.17, 1.28, 0.08]);
      fone.visible = true;
      fone.position.set(...K.lerp3(mais(FIXO, [0, 0.12, 0]), orelha, k));
      fone.rotation.set(0, 0, k * 1.3);
      // SONS: clique do fone tirado do gancho ("atende")
      K.som('clique', tA, 0.6);
      // ENTRA AGORA: o balão de fala ("ocupado")
      K.entrar(falaRecep, 'cresce', tc - tO + 0.35, { som: 'estalo', destaque: false });
      // CÂMERA: alvo [recepcionista, fala_recepcao] · chegando · perto · esquerda · altura do olho
      K.filmar([recep, falaRecep], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
      olharCam(falaRecep);
      // EFEITOS VISUAIS: etiqueta laranja "Recepção" ("recepção")
      fx.et.recep.em(mais(BALCAO, [-0.55, 1.25, 0.3]), tc - tR);
      // 2ª metade ("recado"): o papelzinho amarelo aparece no balcão, na frente dela
      const tRe = quando('recado', B, 0.85);
      const kr = K.saiVolta(K.clamp((tc - tRe) / 0.3));
      recado.visible = tc > tRe;
      recado.position.set(...mais(BALCAO, [0.05, 1.03, 0.1]));
      recado.rotation.set(0, 0.4, 0);
      recado.scale.setScalar(Math.max(0.01, kr));
      K.som('estalo', tRe, 0.4);
    },

    gaveta(B, tc) {
      // NA TELA: a gaveta do balcão aberta, vista de cima; o recado caindo dentro, em cima dos outros · MOSTRA: recado, balcao
      const tRe = quando('recado', B, 0.15), tPa = quando('parar', B, 0.35), tF = quando('fundo', B, 0.65), tG = quando('gaveta', B, 0.85);
      // OBJETOS SE MEXENDO: a gaveta desliza pra fora ("parar"); o recado cai girando lá dentro; no "fundo", fecha com força
      const abre = K.suave(K.clamp((tc - tPa) / 0.35)) * (1 - K.suave(K.clamp((tc - tF) / 0.2)));
      gaveta.position.z = 0.38 * abre;
      const dentro = mais(BALCAO, [0.25, 0.73, 0.38]);
      const cima = mais(BALCAO, [0.05, 1.03, 0.1]);
      const kc = K.suave(K.clamp((tc - tRe - 0.15) / 0.7));
      recado.visible = tc < tF + 0.05;
      recado.position.set(...K.lerp3(cima, dentro, kc));
      recado.position.y += Math.sin(kc * Math.PI) * 0.18;
      recado.rotation.set(Math.sin(kc * 6) * 0.4, kc * 4, 0);
      // PERSONAGEM: a recepcionista · começo: segurando o recado · "gaveta": empurrando (fecha a gaveta)
      // INTERAÇÃO: ela joga o recado na gaveta e fecha
      recep.colocar(RECEP, mais(BALCAO, [0.25, 0.8, 0.5]));
      if (tc > tF) recep.reagir('empurrando', tc - tF); else recep.reagir('segurando', B.t);
      telefone.visible = true;
      fone.visible = true; fone.position.set(FIXO[0], FIXO[1] + 0.12, FIXO[2]); fone.rotation.set(0, 0, 0);
      clinica(tc);
      doutor.reagir('segurando', B.t);
      // SONS: madeira da gaveta abrindo ("parar") · tampa batendo ("fundo")
      K.som('madeira', tPa, 0.5);
      K.som('tampa', tF + 0.15, 0.7);
      // CÂMERA: alvo [recado, balcao] · descendo · perto · direita · de cima
      K.filmar([dentro, recep], 'descendo', B.p, { plano: 'medio', lado: 30, altura: 'alto' });
      // EFEITOS VISUAIS: etiqueta vermelha "Recado esquecido" ("fundo")
      fx.et.esquecido.em(mais(BALCAO, [0.2, 1.4, 0.3]), tc - tF);
      void tG;
    },

    nem_sabe(B, tc) {
      // NA TELA: o Léo com o celular, suando; o balão "Clínica de quê?"; o computador desligado atrás · MOSTRA: personagem, duvida
      telaPC('desligada');
      const tFa = quando('fala', B, 0.25), tN = quando('nem', B, 0.55), tS = quando('sabe', B, 0.65);
      // PERSONAGEM: começo: surpreso, alegre (alguém atendeu!) · "nem": susto, suando
      // INTERAÇÃO: ele escuta a voz do dono e trava
      menino.colocar(LADO, PRA_CAM);
      if (tc > tN) { menino.reagir('susto', tc - tN); menino.suar(tc - tN); } else { menino.reagir('surpreso', B.t); menino.humor('feliz'); }
      telaCel(celLeo, 'chamando', 0);
      // ENTRA AGORA: o balão "Clínica de quê?" ("sabe")
      desenharDuvida('clinica');
      K.entrar(duvida, 'cresce', tc - tS, { som: 'estalo', destaque: false });
      // SONS: ding de alguém atendendo ("fala")
      K.som('ding', tFa, 0.5);
      // CÂMERA: alvo [personagem, duvida] · revelando · médio · perfil esquerdo · altura do olho
      K.filmar([menino, duvida], 'revelando', B.p, { plano: 'medio', lado: -40, altura: 'olho' });
      celNaMao(celLeo, menino);
      olharCam(duvida);
    },

    sem_interesse(B, tc) {
      // NA TELA: o doutor com o celular na orelha e o balão "Não tenho interesse."; o cachorro do lado · MOSTRA: doutor, fala_doutor
      const tI = quando('igual', B, 0.15), tIn = quando('interesse', B, 0.8);
      // PERSONAGEM: o doutor · começo: cansado (ouvindo o discurso de sempre) · "interesse": bravo, desligando
      // INTERAÇÃO: o doutor desliga na cara do Léo; o cachorro late junto
      clinica(tc, { olhar: PRA_CAM_CL, cao: { cara: tc > tIn ? 'agitado' : 'curioso', abana: 0.2 } });
      if (tc > tIn) doutor.reagir('bravo', tc - tIn); else doutor.reagir('cansado', B.t);
      telaCel(celDr, tc > tIn + 0.3 ? 'apagada' : 'desconhecido');
      // ENTRA AGORA: o balão "Não tenho interesse." ("interesse")
      K.entrar(falaDr, 'cresce', tc - tIn + 0.25, { som: 'estalo', destaque: false });
      // SONS: desliga ("interesse") · o latido vira um baque curto
      K.som('desliga', tIn + 0.4, 0.7);
      // CÂMERA: alvo [doutor, fala_doutor] · chegando · perto · frente · de baixo
      K.filmar([doutor, falaDr], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'baixo' });
      celNaMao(celDr, doutor, [0.0, 0.25, 0.05]);
      olharCam(falaDr);
      // EFEITOS VISUAIS: etiqueta vermelha "Discurso igual pra todos" ("igual")
      fx.et.igual.em(mais(DR, [-0.7, 1.75, 0.5]), tc - tI);
    },

    no_escuro(B, tc) {
      // NA TELA: o escritório escurecendo; o Léo iluminado só pela luz do celular · MOSTRA: personagem, celular_leo
      telaPC('desligada');
      const tT = quando('telefone', B, 0.3), tL = quando('ligar', B, 0.6), tE = quando('escuro', B, 0.8);
      // PERSONAGEM: começo: mostrando o celular ("não é o telefone") · "escuro": triste, tateando
      // INTERAÇÃO: o celular é a única luz em volta dele
      menino.colocar(LADO, PRA_CAM);
      if (tc > tE) menino.reagir('triste', tc - tE); else menino.reagir('mostrando', B.t);
      telaCel(celLeo, 'chamando', 0);
      // SONS: desliga da luz apagando ("escuro")
      K.som('desliga', tE, 0.6);
      // CÂMERA: alvo [personagem, celular_leo] · afastando · aberto · frente · do alto
      const pC = pontoCelLeo();
      K.filmar([menino, pC], 'afastando', B.p, { plano: 'aberto', lado: 'frente', altura: 'alto' });
      celNaMao(celLeo, menino);
      // OBJETOS SE MEXENDO: a luz cai até quase preto ("ligar" → "escuro"); a tela do celular brilha
      const k = K.suave(K.clamp((tc - tL) / Math.max(0.4, tE - tL + 0.2)));
      escurecer(k);
      celLeo.tela.m.material.depthTest = k < 0.05;
      celLeo.tela.m.renderOrder = k > 0.05 ? 1002 : 0;
      haloCel.visible = k > 0.05;
      haloCel.position.copy(celLeo.g.position);
      haloCel.material.opacity = 0.9 * k;
      // EFEITOS VISUAIS: etiqueta laranja "Ligar no escuro" ("escuro")
      fx.et.escuro.em(mais(LADO, [-0.2, 2.0, 0]), tc - tE);
      void tT;
    },

    mappoa(B, tc) {
      // NA TELA: a tela verde do Mappoa com a busca; as mãos do Léo no teclado · MOSTRA: computador
      // CENÁRIO: o escritório de volta ao dia (o jogo corrige)
      const tM = quando('mappoa', B, 0.3), tB = quando('busca', B, 0.45);
      // ENTRA AGORA e OBJETOS SE MEXENDO: a tela acende verde ("Mappoa"); a busca digitando ("busca")
      const liga = K.clamp((tc - tM) / 0.4);
      const letras = Math.round(BUSCA.length * K.clamp((tc - tB) / Math.max(0.5, B.ate - tB - 0.2)));
      if (tc < tM) telaPC('desligada');
      else if (liga < 1) telaPC('mappoa_liga', 0, Math.round(liga * 10) / 10);
      else telaPC('mappoa', letras, 0);
      // PERSONAGEM: de lado pra tela · começo: ideia · "busca": empurrando (digitando)
      // INTERAÇÃO: ele abre o Mappoa e digita
      menino.colocar(LADO, TELA);
      if (tc > tB) menino.reagir('empurrando', tc - tB); else menino.reagir('ideia', B.t);
      // EFEITOS VISUAIS: rótulo "Mappoa" ("Mappoa")
      fx.rot.em(mais(TELA, [0, 0.55, 0]), tc - tM);
      // SONS: liga ("Mappoa") · cliques das teclas ("busca")
      K.som('liga', tM, 0.6);
      for (let k = 0; k < 6; k++) K.som('clique', tB + k * 0.22, 0.3);
      // CÂMERA: alvo o computador · chegando · perto · perfil direito · altura do olho
      K.filmar([pcm.g, menino], 'chegando', B.p, { plano: 'perto', lado: -30, altura: 'olho' });
    },

    lista(B, tc) {
      // NA TELA: o computador; a enxurrada de cartões formando a coluna; os cinza somem · MOSTRA: empresas, computador
      const tV = quando('vez', B, 0.1), tCe = quando('centenas', B, 0.3), tCo = quando('combinam', B, 0.65);
      telaPC('mappoa', BUSCA.length, Math.min(5, Math.floor(K.clamp((tc - tV) / 1.2) * 6)));
      // ENTRA AGORA e OBJETOS SE MEXENDO: os cartões jorram ("vez"); no "combinam", os cinza somem e os verdes se juntam
      cartoesEm((i) => (tc - tV - i * 0.08) / 0.4, (tc - tCo) / 0.6, (n) => (tc - tV - 0.3 - n * 0.04) / 0.4);
      // PERSONAGEM: começo: surpreso · "combinam": mostrando os cartões verdes
      // INTERAÇÃO: a tela joga os cartões no ar e ele mostra os que combinam
      menino.colocar(LADO, [-0.6, 1.5, 1.5]);
      if (tc > tCo) menino.reagir('mostrando', tc - tCo); else menino.reagir('surpreso', B.t);
      // EFEITOS VISUAIS: contador "centenas" ("centenas") · etiqueta verde "Só as que combinam" ("combinam")
      const n = Math.round(200 * K.clamp((tc - tCe) / 1.0));
      fx.cont.em(n >= 200 ? '200+' : String(n), [COLUNA_X - 0.15, 3.2, 0.2], tc - tCe, 'CLÍNICAS');
      fx.et.combina.em(mais(TELA, [0.1, 0.62, 0]), tc - tCo);
      // SONS: whoosh da rajada · bip rápido do contador · certo ("combinam")
      K.som('whoosh', tV, 0.5);
      for (let i = 0; i < 8; i++) K.som('bip', tCe + i * 0.12, 0.22);
      K.som('certo', tCo + 0.3, 0.6);
      // CÂMERA: alvo [empresas, computador] · subindo · médio · esquerda · do alto
      K.filmar([[COLUNA_X, 1.85, 0.2], pcm.g], 'subindo', B.p, { plano: 'medio', lado: 'esquerda', altura: 'alto' });
    },

    contatos(B, tc) {
      // NA TELA: a coluna dos cartões verdes grande; os ícones crescendo; o resumo abrindo · MOSTRA: empresas, icones
      telaPC('mappoa', BUSCA.length, 5);
      cartoesEm(() => 1, 1, () => 1);
      icones.visible = true;
      // ENTRA AGORA e OBJETOS SE MEXENDO: WhatsApp, Instagram, site e o resumo, um tipo por palavra
      const tW = quando('whatsapp', B, 0.25), tI = quando('instagram', B, 0.4), tS = quando('site', B, 0.55), tR = quando('resumo', B, 0.75);
      [['whats', tW], ['insta', tI], ['site', tS], ['resumo', tR]].forEach(([tipo, t0]) => {
        ics[tipo].forEach((m, i) => { if (!m.userData.falta) K.entrar(m, 'cresce', tc - t0 - i * 0.04, { som: false, destaque: false, dur: 0.3 }); });
        K.som('ding', t0, 0.45);
      });
      K.entrar(resumo.m, 'cresce', tc - tR - 0.15, { som: false, destaque: false, dur: 0.35 });
      // PERSONAGEM: começo: mostrando · "resumo": aponta pro cartão aberto
      // INTERAÇÃO: ele aponta pra cada ícone quando aparece
      menino.colocar(LADO, [-0.8, 1.5, 0.6]);
      if (tc > tR) { menino.reagir('mostrando', tc - tR); menino.apontar(0.8); } else menino.reagir('mostrando', B.t);
      // CÂMERA: alvo [empresas, icones] · girando · perto · frente · altura do olho
      K.filmar([empresas, icones], 'girando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', angulo: 20 });
      // EFEITOS VISUAIS: etiqueta azul "Resumo do negócio" ("resumo")
      fx.et.resumo.em([COLUNA_X + 0.7, cardYc(0) + 0.62, 0.25], tc - tR);
    },

    mensagem(B, tc) {
      // NA TELA: o computador; o balão da mensagem saindo da tela; o Léo apertando enviar no celular · MOSTRA: mensagem, computador
      const tP = quando('prepara', B, 0.2), tMs = quando('mensagem', B, 0.35), tCa = quando('cada', B, 0.55), tMa = quando('manda', B, 0.75), tW = quando('whatsapp', B, 0.92);
      // OBJETOS SE MEXENDO: "escrevendo..." na tela ("prepara"); o balão sai e as linhas aparecem; no "manda", voa pro celular dele
      if (tc < tMs) telaPC('mappoa_msg', BUSCA.length, Math.floor(Math.max(0, tc - tP) * 3));
      else telaPC('mappoa', BUSCA.length, 5);
      // PERSONAGEM: começo: surpreso, lendo · "manda": segurando o celular e apertando enviar
      // INTERAÇÃO: o Mappoa prepara, e quem aperta enviar é ele
      menino.colocar(LADO, [0.25, 1.6, 0.3]);
      if (tc > tMa) menino.reagir('segurando', tc - tMa); else menino.reagir('surpreso', B.t);
      telaCel(celLeo, tc > tW - 0.2 ? 'enviado' : 'apagada');
      // SONS: whoosh do balão saindo · clique do enviar ("manda") · ding de enviado ("WhatsApp")
      K.som('clique', tMa + 0.3, 0.6);
      K.som('ding', tW, 0.6);
      // CÂMERA: alvo [mensagem, computador] · passando · médio · direita · do alto
      K.filmar([mensagem.position.toArray(), pcm.g], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'alto' });
      const showCel = tc > tMa - 0.4;
      if (showCel) celNaMao(celLeo, menino);
      // ENTRA AGORA: a mensagem desliza de dentro da tela ("mensagem"); no "manda", encolhe e voa pro celular
      desenharMensagem(Math.min(4, Math.max(1, Math.floor((tc - tMs) / 0.3) + 1)));
      if (tc < tMa) K.entrar(mensagem, 'desliza', tc - tMs, { de: [-0.25, -0.55, -0.4], som: 'whoosh' });
      else {
        const k = K.suave(K.clamp((tc - tMa) / 0.55));
        mensagem.visible = k < 0.98;
        mensagem.position.set(...K.lerp3([0.25, 1.75, 0.3], celLeo.g.position.toArray(), k));
        mensagem.scale.setScalar(1 - 0.85 * k);
      }
      olharCam(mensagem);
      // EFEITOS VISUAIS: etiqueta verde "Mensagem pronta" ("cada") · ✓ do lado ("manda")
      fx.et.msg.em([0.25, 2.3, 0.3], tc - tCa);
      const [mx, my] = K.tela([0.25, 2.3, 0.3]);
      fx.certo.em({ tela: [mx, my - 120] }, tc - tW);
    },

    doutor_sabe(B, tc) {
      // NA TELA: o doutor lendo a mensagem no celular e sorrindo; depois "Léo chamando" e ele atende · MOSTRA: doutor, celular_doutor
      const tS = quando('sabe', B, 0.3), tT = quando('tocar', B, 0.8);
      // PERSONAGEM: o doutor · começo: pensando, lendo, com um sorriso · "tocar": surpreso e feliz
      // INTERAÇÃO: o doutor reconhece o nome na tela e atende
      clinica(tc, { olhar: PRA_CAM_CL, cao: { abana: 1.2, cara: 'feliz' } });
      if (tc > tT) { doutor.reagir('surpreso', tc - tT); doutor.humor('feliz'); } else { doutor.reagir('pensando', B.t); doutor.humor('feliz'); }
      // ENTRA AGORA: a mensagem na tela (começo); "Léo chamando" ("tocar")
      telaCel(celDr, tc > tT ? 'leo' : 'msg');
      // SONS: zumbido do celular vibrando ("tocar") · ding
      K.som('ding', B.inicio + 0.1, 0.4);
      K.som('zumbido', tT, 0.5);
      // CÂMERA: alvo [doutor, celular_doutor] · chegando · perto · esquerda · de baixo
      const m = doutor.mao(1);
      const pC = [m[0], m[1] + 0.3, m[2] + 0.12];
      K.filmar([doutor, pC], 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
      const vibra = tc > tT ? Math.sin(B.t * 50) * 0.008 : 0;
      celNaMao(celDr, doutor, [0, 0.3 + vibra, 0.12]);
      if (tc > tT) fx.ondas.em(pC, rumoPara(pC, K.camera.position.toArray()) + 0.8, tc - tT, 0.45, 1.8);
      // EFEITOS VISUAIS: etiqueta verde "Já sabe quem é" ("sabe") · ✓ ("tocar")
      fx.et.sabe.em(mais(DR, [-0.55, 2.0, 0.4]), tc - tS);
      const [sx, sy] = K.tela(mais(DR, [-0.55, 2.0, 0.4]));
      fx.certo.em({ tela: [sx, sy - 120] }, tc - tT);
    },

    sabendo(B, tc) {
      // NA TELA: o janelão com a cidade; o Léo na frente apontando pra fora · MOSTRA: janela, personagem
      // CENÁRIO: a cidade cheia de prédios (cada prédio, uma empresa)
      telaPC('mappoa', BUSCA.length, 5);
      const tL = quando('liga', B, 0.5), tS = quando('sabendo', B, 0.75);
      // PERSONAGEM: anda até a frente do janelão · "sabendo": aponta pra fora e pulinho (ideia)
      // INTERAÇÃO: ele aponta e os prédios acendem
      const ate = [1.4, 0, -2.7];
      menino.irPara(LADO, ate, K.faixa(B.p, 0, 0.5), tc, { olhar: [1.0, 2.3, -4.4] });
      if (tc > tS) { menino.reagir('ideia', tc - tS); menino.apontar(0.9); }
      else if (B.p > 0.5) menino.reagir('pensando', tc - (B.inicio + 0.5 * B.dur));
      // OBJETOS SE MEXENDO: os pontinhos verdes acendem nos prédios ("sabendo")
      pontos.forEach((p, i) => {
        const t0 = tS + i * 0.06;
        p.visible = tc > t0;
        if (tc > t0) p.scale.setScalar(K.saiVolta(K.clamp((tc - t0) / 0.25)));
        K.som('bip', t0, 0.12);
      });
      // SONS: liga da luz acendendo ("liga")
      K.som('liga', tL, 0.6);
      // CÂMERA: alvo [personagem, janela] · revelando · aberto · frente · de baixo
      K.filmar([menino, [0.6, 2.7, -4.3], [2.0, 1.6, -4.3]], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo' });
      // O escritório começa meio escuro e acende de vez no "liga"
      escurecer(0.55 * (1 - K.suave(K.clamp((tc - tL) / 0.3))));
      // EFEITOS VISUAIS: etiqueta laranja "Liga sabendo pra quem" ("sabendo")
      fx.et.sabendo.em([1.2, 3.2, -4.2], tc - tS);
    },

    antes(B, tc) {
      // NA TELA: o Léo encostado na mesa, de tarde, com o celular apagado; o contador "40" · MOSTRA: personagem, celular_leo
      // CENÁRIO: a janela com o céu de tarde
      tarde(1);
      telaPC('desligada');
      const tA = quando('antes', B, 0.05), tQ = quando('quarenta', B, 0.25), tN = quando('nenhum', B, 0.7);
      // PERSONAGEM: começo: cansado · "nenhum": triste, suando
      // INTERAÇÃO: ele olha o celular apagado e desanima
      menino.colocar(LADO, [0.2, 1.0, 2]);
      if (tc > tN) { menino.reagir('triste', tc - tN); menino.suar(tc - tN); } else menino.reagir('cansado', B.t);
      telaCel(celLeo, 'encerrada', 0, K.clamp((tc - tN) / 0.6) * 0.8);
      // SONS: errado ("nenhum")
      K.som('errado', tN, 0.6);
      // CÂMERA: alvo [personagem, celular_leo] · afastando · médio · esquerda · do alto
      const pC = pontoCelLeo();
      K.filmar([menino, pC], 'afastando', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
      celNaMao(celLeo, menino);
      // EFEITOS VISUAIS: etiqueta vermelha "Antes: 0 alô" ("Antes") · o contador "40"
      fx.et.antes.em(mais(LADO, [-0.1, 2.05, 0]), tc - tA);
      fx.cont.em('40', mais(LADO, [-0.75, 1.5, 0.1]), tc - tQ, 'LIGAÇÕES');
    },

    agora(B, tc) {
      // NA TELA: o Mappoa, a coluna de clínicas verdes com os ícones, a mensagem; o Léo comemorando · MOSTRA: empresas, mensagem, personagem
      const tA = quando('agora', B, 0.05), tCe = quando('centenas', B, 0.15), tCo = quando('contato', B, 0.55), tM = quando('mensagem', B, 0.7), tP = quando('prontos', B, 0.88);
      telaPC('mappoa', BUSCA.length, 5);
      // ENTRA AGORA: os cartões ("centenas"), os ícones ("contato"), a mensagem ("mensagem"); o confete ("prontos")
      cartoesEm((i) => (tc - tCe - i * 0.03) / 0.35, 1, (n) => (tc - tCe - 0.15 - n * 0.02) / 0.35);
      if (tc > tCo) iconesProntos(false);
      mensagem.visible = tc > tM;
      K.entrar(mensagem, 'surge', tc - tM, { som: false });
      desenharMensagem(4);
      // PERSONAGEM: começo: vitória · "prontos": comemora
      // INTERAÇÃO: ele mostra a coluna de clínicas e comemora no fim
      menino.colocar(LADO, PRA_CAM);
      if (tc > tP) menino.comemorar(tc - tP); else menino.reagir('vitoria', B.t);
      fx.festa.em(tc - tP);
      // SONS: brilho ("centenas") · certo ("mensagem") · festa ("prontos")
      K.som('brilho', tCe, 0.5);
      K.som('certo', tM, 0.5);
      K.som('festa', tP, 0.6);
      // CÂMERA: alvo [empresas, mensagem, personagem] · girando · médio · direita · altura do olho
      K.filmar([[COLUNA_X, 1.85, 0.2], mensagem.position.toArray(), menino], 'girando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho', angulo: 25 });
      olharCam(mensagem);
      // EFEITOS VISUAIS: etiqueta verde "Agora: centenas de clínicas certas" ("Agora")
      fx.et.agora.em(mais(TELA, [0, 1.15, 0]), tc - tA);
    },

    pergunta(B, tc) {
      // NA TELA: o Léo de frente, falando com quem assiste; "Ligar?" e "Mensagem?" balançando · MOSTRA: personagem
      telaPC('mappoa', BUSCA.length, 5);
      const tL = quando('ligar', B, 0.3), tMe = quando('mensagem', B, 0.5), tC = quando('comenta', B, 0.85);
      // PERSONAGEM: olhando pra câmera · começo: chamando ("E você") · "Comenta": mostrando (pros comentários)
      // INTERAÇÃO: ele pesa as duas opções e passa a pergunta pra quem assiste
      const lugar = mais(LADO, [-0.1, 0, 0.5]);
      menino.colocar(lugar, PRA_CAM);
      if (tc > tC) menino.reagir('mostrando', tc - tC); else menino.reagir('chamando', B.t);
      menino.falar(B.t);
      // SONS: bip ("Comenta")
      K.som('bip', tC, 0.5);
      // CÂMERA: alvo o personagem · chegando · perto · frente · altura do olho
      K.filmar(menino, 'chegando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
      // EFEITOS VISUAIS: "Ligar?" ("ligar") · "Mensagem?" ("mensagem"), balançando como uma balança
      const bal = Math.sin(B.t * 3) * 0.06;
      fx.et.ligar.em(mais(lugar, [-0.42, 1.75 + bal, 0]), tc - tL);
      fx.et.mandar.em(mais(lugar, [0.42, 1.75 - bal, 0]), tc - tMe);
    },

    segue(B, tc) {
      // NA TELA: o cartão de seguir no topo; a mesa com o Mappoa; o Léo apontando pro cartão · MOSTRA: personagem
      telaPC('mappoa', BUSCA.length, 5);
      const tM = quando('mappoa', B, 0.1), tB = quando('bio', B, 0.8);
      // PERSONAGEM: feliz · começo: mostrando a tela · "Bio": aponta pro cartão
      // INTERAÇÃO: ele aponta pro cartão de seguir
      menino.colocar(LADO, PRA_CAM);
      if (tc > tB) { menino.humor('feliz'); menino.apontar(1); } else menino.reagir('mostrando', B.t);
      // ENTRA AGORA e EFEITOS VISUAIS: o cartão de seguir ("Mappoa"); o botão vira "Seguindo"
      fx.seguir.em(tc - tM);
      // SONS: brilho do cartão · clique do botão
      K.som('brilho', tM, 0.5);
      K.som('clique', tM + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: alvo [computador, personagem] · parado · aberto · topo livre
      K.filmar([pcm.g, menino], 'parado', B.p, { plano: 'aberto', espacoCima: 0.45 });
    },

    cartao(B, tc) {
      telaPC('mappoa', BUSCA.length, 5);
      menino.colocar(LADO, PRA_CAM);
      fx.seguir.em(9);
      menino.reagir('chamando', tc);
      K.som('final', B.inicio, 0.7);
      K.filmar([pcm.g, menino], 'parado', 1, { plano: 'aberto', espacoCima: 0.45 });
    },

    capa(B, tc) {
      // A capa: o Léo desesperado com o celular "Chamando… 40ª ligação" e o contador "0 atenderam"
      telaPC('desligada');
      menino.colocar(LADO, PRA_CAM);
      menino.reagir('susto', 1);
      menino.suar(1);
      telaCel(celLeo, 'chamando', 40);
      fx.cont.em('0', mais(LADO, [-0.5, 1.55, 0.1]), 1, 'ATENDERAM');
      const pC = pontoCelLeo();
      K.filmar([menino, pC], 'parado', 0, { plano: 'perto', lado: -20, altura: 'olho', espacoCima: 0.3 });
      celNaMao(celLeo, menino);
      fx.ondas.em(pontoCelLeo(), rumoPara(pC, K.camera.position.toArray()) + 0.9, 0.6, 0.5, 1.6);
    }
  };

  // ---------- Quadro ----------

  const CLINICA_PLANOS = ['desconhecido', 'caixa_postal', 'fixo', 'recepcao', 'gaveta', 'sem_interesse', 'doutor_sabe', 'capa'];
  const BALCAO_PLANOS = ['fixo', 'recepcao', 'gaveta'];

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    // Tudo começa escondido; cada plano mostra o que precisa
    menino.g.visible = false;
    doutor.g.visible = false;
    recep.g.visible = false;
    cachorro.esconder();
    celLeo.g.visible = false;
    celLeo.tela.m.material.depthTest = true;
    celLeo.tela.m.renderOrder = 0;
    haloCel.visible = false;
    escuroM.visible = false;
    empresas.visible = false;
    cartoes.forEach((m) => { m.visible = false; });
    fundoCartoes.forEach((m) => { m.visible = false; });
    icones.visible = false;
    duvida.visible = false;
    falaRecep.visible = false;
    falaDr.visible = false;
    mensagem.visible = false;
    mensagem.scale.setScalar(1);
    recado.visible = false;
    sinal.forEach((p) => { p.visible = false; });
    pontos.forEach((p) => { p.visible = false; });
    janela.material.opacity = 0.02;
    gaveta.position.z = 0;
    // O canto da clínica (o celular do doutor e o balcão) só aparece nas frases dela
    const naClinica = CLINICA_PLANOS.includes(B.plano);
    celDr.g.visible = naClinica && B.plano !== 'capa';
    celDr.g.position.set(...CEL_DR);
    celDr.g.rotation.set(-Math.PI / 2, 0, 0.35);
    if (celDr.g.visible) telaCel(celDr, 'apagada');
    const comBalcao = BALCAO_PLANOS.includes(B.plano);
    balcao.visible = comBalcao;
    telefone.visible = comBalcao && B.plano !== 'fixo';
    fone.visible = comBalcao && B.plano !== 'fixo';
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
