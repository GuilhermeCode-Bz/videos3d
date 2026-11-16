// Vendedor de software sem clientes (canal Mappoa). Cenário pronto: o escritório (K.cenario('escritorio')).
// A metade esquerda é a mesa do Rafa (vende um sistema de agendamento), a direita é o salão da Bia, e a divisória no
// meio separa os dois lugares. Cada plano tem as linhas do bloco da ficha (roteiro.md) como comentário e o código
// embaixo. Tudo é função do tempo da cena (tc). Base: videos/cold-call/cena.js.
(function () {
  let tl, bl, C, menino, bia, comp, listaG, lista, fichaG, ficha, navG, nav, celG, cel, celBG, celB, contatosG, ideaisG,
    abasG, relogioG, ptrH, ptrM, salaoG, caixaG, tampa, agCheiaG, esteiraG, rolos, calcaG, pc;
  let ordem = [];
  const fx = {};
  const casas = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pop = (t, d = 0.3) => (t <= 0 ? 0 : t >= d ? 1 : K.quica(t / d));
  const COR = '#2fb5a6';
  const ZAP = '#25b35a', INSTA = '#d6249f';

  // Lugares do vídeo (o escritório vai de x -6,4 a 6,4; a parede do fundo fica em z -4,4)
  const PC = [-2.4, 0, 0.2];                       // a mesa com o computador do Rafa
  const TELA = [-2.4, 1.185, 0.08];                // o meio da tela do computador
  const RAFA = [-3.25, 0, 0.85];                   // o Rafa do lado da mesa
  const RAFA_MEIO = [-1.5, 0, 1.0];                // o Rafa mais perto da divisória
  const LISTA = [-2.4, 2.6, -0.15];                // o painel do Mappoa, em cima do computador
  const MESA_B = [2.7, 0, 0.0];                    // a mesa da Bia
  const BIA = [2.3, 0, 0.95];                      // a Bia na frente da mesa
  const CEL_B = [2.85, 1.15, 1.25];                // o celular da Bia, na mão dela
  const CADEIRA = [4.6, 0, -0.2];                  // a cadeira do salão
  const CAIXA = [-0.3, 0, 2.1];                    // a caixa do "SISTEMA"
  const ESTEIRA = [-0.4, 0, 2.2];                  // a esteira
  const NAV = [-2.4, 2.05, 0.1];                   // a barra de endereço, em cima do computador
  const OLHA_CAM = [0, 1, 12];
  const CARTAS = [[0.9, 2.2, 1.0], [1.9, 1.7, 0.9], [2.9, 2.2, 1.0]];   // onde ficam os 3 cartões

  const SALOES = ['Studio Bella', 'Salão da Bia', 'Espaço Charme', 'Beleza Pura', 'Studio Glam', 'Salão Divas',
    'Cabelo & Cia', 'Espaço Jardim', 'Studio Batel', 'Salão Bonita', 'Bella Arte', 'Espaço Mulher'];
  const BAIRROS = ['Batel', 'Centro', 'Água Verde', 'Portão', 'Bigorrilho', 'Cabral'];
  const temZap = (i) => i % 5 !== 3;
  const temInsta = (i) => i % 4 !== 2;

  function guardar(o) { casas.push({ o, p: o.position.clone(), r: o.rotation.clone(), s: o.scale.clone() }); }

  // A sombra lisa, sem riscos (canal/aprendizados.md: nada de riscos de sombra)
  function sombraLisa() {
    if (K.renderer.shadowMap.type === THREE.PCFSoftShadowMap && K.sol.shadow.normalBias === 0.05) return;
    K.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    K.sol.shadow.bias = -0.0005;
    K.sol.shadow.normalBias = 0.05;
    if (K.sol.shadow.map) { K.sol.shadow.map.dispose(); K.sol.shadow.map = null; }
    K.scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.needsUpdate = true; }); });
  }

  // ---------- Desenhos ----------

  function caixaR(c, x, y, w, h, r, cor) {
    c.fillStyle = cor; c.beginPath();
    c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); c.fill();
  }
  function texto(c, t, x, y, tam, cor, peso = 800, al = 'left') {
    c.fillStyle = cor; c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, x, y);
  }
  function icone(c, x, y, r, cor, letra) {
    c.fillStyle = cor; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    texto(c, letra, x, y + 1, r * 1.1, '#fff', 900, 'center');
  }

  function telaDesligada() { comp.tela.desenhar((c, w, h) => { c.fillStyle = '#16181d'; c.fillRect(0, 0, w, h); }, 'off'); }
  function telaSistema(cursor) {                     // o sistema de agendamento do Rafa, bonito e sem venda
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, 34);
      texto(c, 'AgendaFácil', 14, 17, 17, '#fff', 900);
      for (let j = 0; j < 5; j++) { caixaR(c, 14 + j * ((w - 28) / 5), 48, (w - 28) / 5 - 6, h - 100, 6, '#eef3fc'); }
      caixaR(c, 20, 60, 46, 30, 6, '#8fb3ee'); caixaR(c, 20 + (w - 28) / 5 * 2, 90, 46, 30, 6, '#8fb3ee');
      texto(c, 'Vendas: 0' + (cursor ? '|' : ''), 16, h - 28, 16, '#e8352b', 900);
    }, 'sis' + (cursor ? 1 : 0));
  }
  function telaLupa(k) {                             // o site que procura as empresas: a lupa girando
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f2fbfa'; c.fillRect(0, 0, w, h);
      caixaR(c, 14, 22, w - 28, 40, 20, '#ffffff');
      c.strokeStyle = COR; c.lineWidth = 3; c.strokeRect(15, 23, w - 30, 38);
      texto(c, 'Que empresas você procura?', 28, 42, 13, '#556', 700);
      const a = k * Math.PI * 4;
      const lx = w / 2 + Math.cos(a) * 26, ly = 120 + Math.sin(a) * 18;
      c.strokeStyle = COR; c.lineWidth = 8; c.beginPath(); c.arc(lx, ly, 22, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.moveTo(lx + 16, ly + 16); c.lineTo(lx + 34, ly + 34); c.stroke();
    }, 'lupa' + Math.floor(k * 30));
  }
  function telaBusca(letras, botao) {                // a busca do Mappoa, digitada letra por letra
    const alvo = 'salões de beleza em Curitiba';
    const s = alvo.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f2fbfa'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, 'O que você procura?', 18, 58, 14, '#2a3a38', 700);
      caixaR(c, 12, 74, w - 24, 44, 10, '#ffffff');
      c.strokeStyle = COR; c.lineWidth = 3; c.strokeRect(13, 75, w - 26, 42);
      texto(c, s + (letras < alvo.length ? '|' : ''), 20, 96, 14, '#111', 700);
      caixaR(c, w / 2 - 60, 134, 120, 36, 18, botao ? '#1fd1b6' : COR);
      texto(c, 'Buscar', w / 2, 152, 16, '#fff', 900, 'center');
    }, 'b' + letras + (botao ? 'x' : ''));
  }
  function telaMappoa() {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f2fbfa'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, '100+', w / 2, 95, 56, COR, 900, 'center');
      texto(c, 'salões encontrados', w / 2, 140, 16, '#2a3a38', 700, 'center');
    }, 'mappoa');
  }
  function telaEndereco(letras) {                    // o navegador no computador, com mappoa.com
    const s = 'mappoa.com'.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      caixaR(c, 10, 10, w - 20, 40, 20, '#eef0f3');
      texto(c, '🔒 ' + s, 24, 30, 18, '#111', 800);
      texto(c, s.length >= 10 ? 'Mappoa' : '', w / 2, 120, 40, COR, 900, 'center');
    }, 'end' + letras);
  }

  // A lista do Mappoa: n salões (até 12), ic = os ícones de WhatsApp e Instagram, cont = o número do topo
  function desenharLista(n, ic, cont) {
    lista.desenhar((c, w, h) => {
      c.fillStyle = '#f2fbfa'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 74);
      texto(c, 'Mappoa', 20, 26, 30, '#fff', 900);
      texto(c, 'salões de beleza · Curitiba', 20, 56, 15, '#e2fbf8', 700);
      texto(c, cont, w - 18, 30, 24, '#fff', 900, 'right');
      const alt = 60, top = 86;
      const cabe = Math.floor((h - top) / alt);
      const ini = Math.max(0, n - cabe);
      for (let j = ini; j < n; j++) {
        const y = top + (j - ini) * alt;
        caixaR(c, 12, y, w - 24, alt - 8, 10, '#ffffff');
        texto(c, SALOES[j % SALOES.length], 24, y + 17, 18, '#1d2a28', 800);
        texto(c, BAIRROS[j % BAIRROS.length], 24, y + 39, 13, '#6b7a78', 700);
        if (ic) {
          if (temZap(j)) icone(c, w - 92, y + 26, 16, ZAP, 'W');
          if (temInsta(j)) icone(c, w - 52, y + 26, 16, INSTA, '◎');
        }
      }
    }, `li${n}-${ic ? 1 : 0}-${cont}`);
  }

  // A ficha do salão no Mappoa: k = 0 a 1 (as dores e a mensagem entrando)
  function desenharFicha(nDores, letrasMsg) {
    const msg = 'Oi, Bia! Vi que vocês marcam pelo WhatsApp. Quantas clientes faltam sem avisar?';
    ficha.desenhar((c, w, h) => {
      c.fillStyle = '#f2fbfa'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 74);
      texto(c, 'Salão da Bia', 20, 28, 30, '#fff', 900);
      texto(c, 'Batel · Curitiba', 20, 58, 15, '#e2fbf8', 700);
      texto(c, 'Dores', 20, 106, 24, '#1d2a28', 900);
      ['Clientes faltando', 'Agenda no WhatsApp'].forEach((d, i) => {
        if (i >= nDores) return;
        const y = 132 + i * 52;
        caixaR(c, 14, y, w - 28, 42, 10, '#fff1ef');
        texto(c, '● ' + d, 28, y + 21, 18, '#c0392b', 800);
      });
      texto(c, 'Mensagem pronta', 20, 258, 24, '#1d2a28', 900);
      caixaR(c, 14, 280, w - 28, h - 296, 14, '#e3f7ea');
      const s = msg.slice(0, letrasMsg);
      const pal = s.split(' ');
      let linha = '', y = 312;
      c.font = '700 18px Montserrat, sans-serif';
      pal.forEach((p) => {
        const t = linha ? linha + ' ' + p : p;
        if (c.measureText(t).width > w - 60) { texto(c, linha, 28, y, 18, '#1d4a2c', 700); y += 28; linha = p; } else linha = t;
      });
      if (linha) texto(c, linha, 28, y, 18, '#1d4a2c', 700);
    }, `fi${nDores}-${letrasMsg}`);
  }

  // A barra de endereço grande, com mappoa.com
  function desenharNav(letras, ir) {
    const s = 'mappoa.com'.slice(0, letras);
    nav.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      caixaR(c, 0, 0, w, h, h / 2, '#ffffff');
      c.strokeStyle = '#1b1b1b'; c.lineWidth = 6;
      c.beginPath(); c.roundRect ? c.roundRect(3, 3, w - 6, h - 6, h / 2 - 3) : c.rect(3, 3, w - 6, h - 6); c.stroke();
      texto(c, '🔒', 34, h / 2 + 2, 44, COR, 900);
      texto(c, s + (letras < 10 ? '|' : ''), 100, h / 2 + 2, 68, '#111', 900);
      caixaR(c, w - 130, 18, 108, h - 36, (h - 36) / 2, ir ? '#1fd1b6' : '#9aa59e');
      texto(c, 'Ir', w - 76, h / 2 + 2, 40, '#fff', 900, 'center');
    }, 'nav' + letras + (ir ? 'i' : ''));
  }

  // O celular do Rafa: a mensagem genérica e o botão Enviar
  function desenharCel(env) {
    cel.desenhar((c, w, h) => {
      c.fillStyle = '#eaf6f4'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 50);
      texto(c, 'Para: todos', w / 2, 26, 20, '#fff', 900, 'center');
      caixaR(c, 14, 80, w - 28, 120, 14, '#ffffff');
      texto(c, 'Conheça', 26, 112, 24, '#333', 800);
      texto(c, 'nosso', 26, 142, 24, '#333', 800);
      texto(c, 'sistema!', 26, 172, 24, '#333', 800);
      caixaR(c, 24, h - 90, w - 48, 54, 27, env ? '#1fd1b6' : COR);
      texto(c, 'Enviar', w / 2, h - 62, 24, '#fff', 900, 'center');
    }, 'cel' + (env ? 1 : 0));
  }
  // O celular da Bia: 'notif' (chegou), 'msg' (aberta), k (0 a 1, apagando), 'dor' (a mensagem certa), 'vazio'
  function desenharCelB(modo, k = 0) {
    celB.desenhar((c, w, h) => {
      c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#128c7e'; c.fillRect(0, 0, w, 50);
      texto(c, 'Rafa', 18, 26, 22, '#fff', 900);
      if (modo === 'notif') {
        caixaR(c, 12, 70, w - 24, 70, 12, '#ffffff');
        texto(c, '🔔 Nova mensagem', 22, 105, 18, '#128c7e', 900);
      } else if (modo === 'msg') {
        const x = 12 - k * w * 1.2;
        caixaR(c, x, 80, w - 40, 120, 14, '#ffffff');
        texto(c, 'Conheça', x + 12, 112, 24, '#333', 800);
        texto(c, 'nosso', x + 12, 142, 24, '#333', 800);
        texto(c, 'sistema!', x + 12, 172, 24, '#333', 800);
      } else if (modo === 'dor') {
        caixaR(c, 12, 70, w - 30, 220, 14, '#ffffff');
        ['Vi que vocês', 'marcam pelo', 'WhatsApp.', 'Quantas', 'clientes faltam', 'sem avisar?'].forEach((t, i) => texto(c, t, 22, 98 + i * 32, 20, '#1d2a28', 800));
      }
    }, 'celb-' + modo + Math.floor(k * 20));
  }

  // O cartão com a agenda cheia que sai da caixa (frase 14)
  function desenharAgCheia(g) {
    const t = K.telaCanvas(1.0, 0.75, 360);
    t.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, 50);
      texto(c, 'Agenda cheia', w / 2, 26, 26, '#fff', 900, 'center');
      for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) caixaR(c, 12 + j * ((w - 24) / 5), 62 + i * 48, (w - 24) / 5 - 6, 40, 6, j % 2 ? '#8fb3ee' : COR);
    }, 'agc');
    g.add(t.m);
  }

  function balao(t, larg, alt, borda = '#1b1b1b') { return K.placa(t, { larg, alt, fundo: '#ffffff', cor: '#1b1b1b', borda }); }
  function cartao(t, f, cor) { const p = K.placa(t, { larg: 1.05, alt: 0.45, fundo: f, cor, borda: cor }); return p; }

  // ---------- Montagem (uma vez só) ----------

  function montar(timeline) {
    tl = timeline;
    bl = K.blocos(tl);
    ordem = bl.map((b) => b.plano);
    C = K.cenario('escritorio');

    // A divisória no meio da sala (o Rafa à esquerda, o salão à direita), a mesa da Bia e a lixeira
    pc = K.pecas({
      divisoria: { forma: 'caixa', tam: [0.15, 2.3, 5.2], cor: '#d9dde2', pos: [0, 1.15, -1.8] },
      mesa_b: { forma: 'caixa', tam: [1.5, 0.07, 0.75], cor: '#f4f1ea', pos: [MESA_B[0], 0.75, MESA_B[2]] },
      pe1: { forma: 'caixa', tam: [0.07, 0.72, 0.7], cor: '#9aa0a6', pos: [MESA_B[0] - 0.68, 0.36, MESA_B[2]] },
      pe2: { forma: 'caixa', tam: [0.07, 0.72, 0.7], cor: '#9aa0a6', pos: [MESA_B[0] + 0.68, 0.36, MESA_B[2]] },
      lixeira: { forma: 'tubo', tam: [0.24, 0.5], cor: '#7d8590', pos: [1.3, 0.25, 1.6] }
    });
    guardar(pc.lixeira);

    // O salão da Bia: o espelho, a cadeira vermelha de salão e a placa
    salaoG = new THREE.Group();
    K.scene.add(salaoG);
    const moldura = K.malha(new THREE.BoxGeometry(1.0, 1.3, 0.06), K.mat(0xf5c518));
    moldura.position.set(CADEIRA[0], 1.55, CADEIRA[2] - 1.0);
    const vidro = K.malha(new THREE.BoxGeometry(0.88, 1.18, 0.03), K.mat(0xbfe3f2, { metalness: 0.6, roughness: 0.1 }));
    vidro.position.set(CADEIRA[0], 1.55, CADEIRA[2] - 0.96);
    const assento = K.malha(new THREE.BoxGeometry(0.62, 0.14, 0.6), K.mat(0xc0392b));
    assento.position.set(CADEIRA[0], 0.55, CADEIRA[2]);
    const encosto = K.malha(new THREE.BoxGeometry(0.62, 0.7, 0.12), K.mat(0xc0392b));
    encosto.position.set(CADEIRA[0], 0.95, CADEIRA[2] + 0.28);
    const peC = K.malha(new THREE.CylinderGeometry(0.06, 0.25, 0.48, 14), K.mat(0x9aa0a6, { metalness: 0.6 }));
    peC.position.set(CADEIRA[0], 0.24, CADEIRA[2]);
    fx.cadeira = new THREE.Group();
    fx.cadeira.add(assento, encosto, peC);
    salaoG.add(moldura, vidro, fx.cadeira);
    fx.placaSalao = K.placa('Salão da Bia', { larg: 2.0, alt: 0.55, fundo: '#ffffff', cor: '#d6249f', borda: '#d6249f' });
    fx.placaSalao.position.set(3.2, 2.75, -4.3);
    K.lugar(salaoG); K.nomear('salao', salaoG); guardar(fx.cadeira);

    // O computador do Rafa (com a mesa)
    comp = K.computador();
    comp.g.position.set(...PC);
    K.lugar(comp.g); K.nomear('computador', comp.g);

    // O celular do Rafa
    celG = new THREE.Group();
    K.scene.add(celG);
    const corpo = K.malha(new THREE.BoxGeometry(0.2, 0.38, 0.03), K.mat(0x1d1f24, { roughness: 0.4 }));
    cel = K.telaCanvas(0.18, 0.34, 220);
    cel.m.position.z = 0.017;
    celG.add(corpo, cel.m);
    K.lugar(celG); K.nomear('celular', celG); guardar(celG);
    desenharCel(false);

    // O celular da Bia (grande, virado pra câmera)
    celBG = new THREE.Group();
    celBG.position.set(...CEL_B);
    K.scene.add(celBG);
    const corpoB = K.malha(new THREE.BoxGeometry(0.2, 0.38, 0.03), K.mat(0xf0e6f0, { roughness: 0.4 }));
    celB = K.telaCanvas(0.18, 0.34, 220);
    celB.m.position.z = 0.017;
    celBG.add(corpoB, celB.m);
    celBG.scale.setScalar(1.7);
    K.lugar(celBG); K.nomear('celular_bia', celBG); guardar(celBG);

    // O painel da lista do Mappoa e a ficha do salão, em cima do computador
    const painel = (larg, alt, res) => {
      const g = new THREE.Group();
      g.position.set(...LISTA);
      K.scene.add(g);
      const fundo = K.malha(new THREE.BoxGeometry(larg + 0.1, alt + 0.1, 0.06), K.mat(0x2fb5a6));
      fundo.position.z = -0.04;
      const t = K.telaCanvas(larg, alt, res);
      g.add(fundo, t.m);
      return [g, t];
    };
    [listaG, lista] = painel(1.9, 2.4, 440);
    K.lugar(listaG); K.nomear('lista', listaG); guardar(listaG);
    [fichaG, ficha] = painel(1.8, 2.2, 440);
    K.lugar(fichaG); K.nomear('ficha', fichaG); guardar(fichaG);

    // A barra de endereço grande (frase 17)
    navG = new THREE.Group();
    navG.position.set(...NAV);
    K.scene.add(navG);
    nav = K.telaCanvas(2.2, 0.46, 700);
    navG.add(nav.m);
    K.lugar(navG); K.nomear('navegador', navG); guardar(navG);

    // Os 3 contatos de qualquer um (frases 3 e 4) e os 3 clientes ideais (frases 5 e 6)
    contatosG = new THREE.Group();
    K.scene.add(contatosG);
    fx.contatos = [['🥖 Padaria', '#f7e7c6', '#7a4a22'], ['👕 Loja de roupa', '#e8eef5', '#2b4a6f'], ['🔧 Mecânica', '#eeeeee', '#444444']].map(([t, f, c], i) => {
      const p = cartao(t, f, c); K.scene.remove(p);
      p.position.set(...CARTAS[i]); p.rotation.y = -0.15;
      contatosG.add(p); guardar(p); return p;
    });
    K.lugar(contatosG); K.nomear('contatos', contatosG); guardar(contatosG);
    ideaisG = new THREE.Group();
    K.scene.add(ideaisG);
    fx.ideais = ['⏰ Salão', '⏰ Barbearia', '⏰ Clínica'].map((t, i) => {
      const p = cartao(t, '#e3f7f4', '#1a8f80'); K.scene.remove(p);
      p.position.set(...CARTAS[i]); p.rotation.y = -0.15;
      ideaisG.add(p); guardar(p); return p;
    });
    K.lugar(ideaisG); K.nomear('ideais', ideaisG); guardar(ideaisG);

    // As 4 tarefas na mão (frase 7), girando em volta da cabeça do Rafa
    abasG = new THREE.Group();
    abasG.position.set(RAFA[0], 1.9, RAFA[2]);
    K.scene.add(abasG);
    fx.abas = [['Google', '#2f7fe0'], ['Site', '#7b3fe4'], ['Instagram', INSTA], ['Planilha', '#1f8f4a']].map(([t, c]) => {
      const p = K.placa(t, { larg: 0.8, alt: 0.32, fundo: '#ffffff', cor: c, borda: c }); K.scene.remove(p);
      abasG.add(p); return p;
    });
    K.lugar(abasG); K.nomear('abas', abasG); guardar(abasG);

    // O relógio que corre as horas (frase 7)
    relogioG = new THREE.Group();
    relogioG.position.set(-2.2, 2.45, 1.2);
    K.scene.add(relogioG);
    const aroR = K.malha(new THREE.CylinderGeometry(0.47, 0.47, 0.08, 32), K.mat(0x1b1d22));
    aroR.rotation.x = Math.PI / 2;
    const face = K.malha(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 32), K.mat(0xffffff));
    face.rotation.x = Math.PI / 2; face.position.z = 0.005;
    ptrH = new THREE.Group(); ptrM = new THREE.Group();
    const h1 = K.malha(new THREE.BoxGeometry(0.05, 0.22, 0.02), K.mat(0x1b1d22)); h1.position.y = 0.11;
    const m1 = K.malha(new THREE.BoxGeometry(0.03, 0.34, 0.02), K.mat(0xe8352b)); m1.position.y = 0.17;
    ptrH.add(h1); ptrM.add(m1);
    ptrH.position.z = 0.06; ptrM.position.z = 0.07;
    relogioG.add(aroR, face, ptrH, ptrM);
    K.lugar(relogioG); K.nomear('relogio', relogioG); guardar(relogioG);

    // A caixa "SISTEMA" (frase 14), com a tampa e a agenda cheia que sobe de dentro
    caixaG = new THREE.Group();
    caixaG.position.set(...CAIXA);
    K.scene.add(caixaG);
    const cx = K.malha(new THREE.BoxGeometry(0.9, 0.8, 0.9), K.mat(0x2f6fd6));
    cx.position.y = 0.4;
    tampa = K.malha(new THREE.BoxGeometry(0.96, 0.12, 0.96), K.mat(0x245bb5));
    tampa.position.y = 0.86;
    const rotCx = K.placa('SISTEMA', { larg: 0.8, alt: 0.24, fundo: '#ffffff', cor: '#2f6fd6', borda: '#ffffff' });
    K.scene.remove(rotCx); rotCx.position.set(0, 0.45, 0.46);
    agCheiaG = new THREE.Group();
    desenharAgCheia(agCheiaG);
    caixaG.add(cx, tampa, rotCx, agCheiaG);
    K.lugar(caixaG); K.nomear('caixa', caixaG); guardar(caixaG); guardar(tampa); guardar(agCheiaG);

    // A esteira (frase 15): a base, a lona, os 2 rolos e o painel
    esteiraG = new THREE.Group();
    esteiraG.position.set(...ESTEIRA);
    K.scene.add(esteiraG);
    const baseE = K.malha(new THREE.BoxGeometry(1.7, 0.18, 0.7), K.mat(0x3a3f47));
    baseE.position.y = 0.09;
    const lona = K.malha(new THREE.BoxGeometry(1.5, 0.04, 0.55), K.mat(0x15171b));
    lona.position.y = 0.2;
    rolos = [-0.75, 0.75].map((x) => { const r = K.malha(new THREE.CylinderGeometry(0.1, 0.1, 0.6, 14), K.mat(0x9aa0a6, { metalness: 0.6 })); r.rotation.x = Math.PI / 2; r.position.set(x, 0.12, 0); return r; });
    const coluna = K.malha(new THREE.BoxGeometry(0.08, 1.1, 0.08), K.mat(0x3a3f47));
    coluna.position.set(-0.85, 0.7, 0);
    const painelE = K.malha(new THREE.BoxGeometry(0.2, 0.3, 0.6), K.mat(0x2fb5a6));
    painelE.position.set(-0.85, 1.25, 0);
    esteiraG.add(baseE, lona, ...rolos, coluna, painelE);
    K.lugar(esteiraG); K.nomear('esteira', esteiraG); guardar(esteiraG);

    // A calça jeans que volta a servir (frase 15)
    calcaG = new THREE.Group();
    calcaG.position.set(1.25, 1.35, 2.3);
    K.scene.add(calcaG);
    const jeans = K.mat(0x3b5f9a);
    const cint = K.malha(new THREE.BoxGeometry(0.62, 0.16, 0.22), jeans); cint.position.y = 0.42;
    const pern = [-0.16, 0.16].map((x) => { const p = K.malha(new THREE.BoxGeometry(0.26, 0.72, 0.2), jeans); p.position.set(x, -0.02, 0); return p; });
    const botao = K.malha(new THREE.SphereGeometry(0.035, 10, 8), K.mat(0xf5c518, { metalness: 0.8 })); botao.position.set(0, 0.42, 0.12);
    calcaG.add(cint, ...pern, botao);
    K.lugar(calcaG); K.nomear('calca', calcaG); guardar(calcaG);

    // Os balões e os envelopes
    fx.b = { dor: balao('Vi que vocês marcam pelo WhatsApp.\nQuantas clientes faltam sem avisar?', 2.6, 0.75, ZAP) };
    Object.values(fx.b).forEach((p) => { K.lugar(p); K.nomear('balao', p); });
    fx.envs = [0, 1, 2].map(() => K.placa('✉', { larg: 0.4, alt: 0.28, fundo: '#ffffff', cor: '#555', borda: '#555' }));
    fx.envelope = K.placa('✉ Conheça nosso sistema!', { larg: 1.3, alt: 0.4, fundo: '#ffffff', cor: '#2f6fd6', borda: '#2f6fd6' });
    K.lugar(fx.envelope); K.nomear('envelope', fx.envelope);
    fx.chao = [0, 1, 2, 3].map(() => K.placa('✉', { larg: 0.4, alt: 0.28, fundo: '#ffffff', cor: '#888', borda: '#888' }));
    fx.comenta = K.placa('💬', { larg: 0.5, alt: 0.4, fundo: '#ffffff', cor: '#1b1b1b', borda: '#1b1b1b' });

    // Os personagens: o Rafa (o personagem do canal, canal/identidade.md) e a Bia (a dona do salão)
    menino = K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    bia = K.boneco({ tipo: 'menina' });
    K.nomear('bia', bia);

    // Efeitos
    fx.ondas = K.ondas(0x2fb5a6, 3, 0.5);

    // Textos (cada um uma vez)
    fx.certo = K.marca('certo');
    fx.certo2 = K.marca('certo');
    fx.certo3 = K.marca('certo');
    fx.errado = K.marca('errado');
    fx.errado2 = K.marca('errado');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Pra quem você vende? <em>Comenta aí</em>');
    fx.rot = { ideal: K.rotulo('Cliente ideal'), mappoa: K.rotulo('Mappoa') };
    fx.cont = { lista: K.contador() };
    const e = (t, cor) => K.etiqueta(t, cor);
    fx.et = {
      rafa: e('Rafa · vende sistema', 'azul'), zero: e('0 vendas', 'vermelho'), mesma: e('A mesma pra todos', 'laranja'),
      precisa: e('Não precisa', 'vermelho'), horas: e('8 horas', 'vermelho'), procura: e('Procura por você', 'azul'),
      cadeira: e('Cadeira vazia', 'laranja'), manda: e('Você que manda', 'azul'), quer: e('O que ele quer', 'laranja'),
      antes: e('Qualquer um', 'vermelho'), agora: e('Salões certos', 'verde')
    };
  }

  // Ajudantes
  function celNaMao(pos) {                           // o celular na mão do Rafa, na frente do peito, virado pra câmera
    celG.visible = true;
    celG.position.set(pos[0] + 0.22, 1.0, pos[2] + 0.32);
    celG.rotation.set(-0.2, 0.2, 0);
    celG.scale.setScalar(1.3);
  }
  function mostrar(p, ponto, t, esc = 1) {
    p.visible = t > 0;
    p.position.set(...ponto);
    p.scale.setScalar(pop(t) * esc);
  }
  function voa(p, de, ate, k, alto = 0.8) {          // a peça voando em arco de um ponto até outro (k de 0 a 1)
    const s = K.suave(K.clamp(k));
    p.position.set(K.lerp(de[0], ate[0], s), K.lerp(de[1], ate[1], s) + Math.sin(Math.PI * s) * alto, K.lerp(de[2], ate[2], s));
  }
  function biaNoSalao(olhar = OLHA_CAM) { bia.g.visible = true; bia.colocar(BIA, olhar); }

  // ---------- Planos: um por frase do roteiro.json ----------

  const P = {
    gancho(B, tc) {
      // NA TELA: a Bia na frente da mesa da direita, com o celular grande virado pra câmera; o salão atrás; a pergunta no topo · MOSTRA: bia, celular_bia
      // CENÁRIO: a metade direita do escritório, o salão (o K.cenario cuida do resto)
      const tAb = quando('abriu', B, 0.2), tAp = quando('apaga', B, 0.88);
      // ENTRA AGORA / OBJETOS SE MEXENDO: o celular vibra com a notificação até "abriu"; a mensagem abre; em "apaga", escorrega e some
      celBG.visible = true;
      if (tc < tAb) { desenharCelB('notif'); K.falhar(celBG, 'treme', B.t, { dur: 2, forca: 0.5, som: false }); fx.ondas.em(mais(CEL_B, [0, 0.4, 0.1]), Math.PI / 2, tc, 0.6, 1.5); }
      else if (tc < tAp) desenharCelB('msg', 0);
      else desenharCelB(tc - tAp < 0.4 ? 'msg' : 'vazio', K.clamp((tc - tAp) / 0.4));
      // PERSONAGEM: a Bia · começo: surpreso, olha o celular · na palavra "apaga": bravo, apaga
      // INTERAÇÃO: a Bia abre a mensagem e apaga com o dedo
      biaNoSalao();
      if (tc > tAp) { bia.reagir('bravo', tc - tAp); bia.humor('nojo'); } else bia.reagir('surpreso', B.t);
      // SONS: bip da notificação · whoosh da mensagem saindo · errado
      K.som('bip', B.inicio, 0.6);
      K.som('bip', B.inicio + 0.4, 0.5);
      K.som('clique', tAb, 0.5);
      K.som('whoosh', tAp, 0.6);
      // CÂMERA: alvo [bia, celular_bia] · revelando · perto → médio · frente · olho · topo livre
      K.filmar([bia, celBG], 'chegando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.38 });
      // EFEITOS VISUAIS: ✗ vermelho grande na palavra "apaga"
      const [ex, ey] = K.tela(mais(BIA, [0, 1.9, 0]));
      fx.errado.em({ tela: [ex + 150, Math.min(ey - 40, 950)] }, tc - tAp);
    },

    rafa(B, tc) {
      // NA TELA: o Rafa na frente da mesa da esquerda; o computador com o sistema de agendamento · MOSTRA: personagem, computador
      // CENÁRIO: a metade esquerda; a mesa, a cadeira e a cidade no janelão
      const tR = quando('Rafa', B, 0.08), tS = quando('sistema', B, 0.4), tN = quando('ninguém', B, 0.8);
      // ENTRA AGORA: a tela acende com a agenda do sistema (palavra "sistema")
      // OBJETOS SE MEXENDO: em "ninguém", o cursor fica piscando no "Vendas: 0"
      if (tc > tS) telaSistema(tc > tN && Math.floor(tc * 3) % 2 === 0); else telaDesligada();
      // PERSONAGEM: de frente pra câmera · começo: mostrando (orgulhoso) · na palavra "ninguém": triste
      // INTERAÇÃO: ele aponta o sistema na tela e desanima quando nada acontece
      menino.colocar(RAFA, [-1.8, 0, 9]);
      if (tc > tN) menino.reagir('triste', tc - tN);
      else if (tc > tS) { menino.olharPara(TELA); menino.apontar(0.4); menino.humor('feliz'); }
      else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Rafa · vende sistema" (palavra "Rafa") · etiqueta vermelha "0 vendas" (palavra "ninguém")
      fx.et.rafa.em(mais(RAFA, [-0.2, 1.95, 0.3]), tc - tR);
      fx.et.zero.em(mais(PC, [0.3, 1.75, 0.2]), tc - tN);
      // SONS: ding (o kit põe) · liga da tela · errado baixinho
      K.som('liga', tS, 0.6);
      K.som('errado', tN, 0.4);
      // CÂMERA: alvo [personagem, computador] · chegando · médio · um pouco pela direita · olho (frase 1: revelando, frente, na Bia)
      K.filmar([menino, comp.g], 'chegando', B.p, { plano: 'medio', lado: 25, altura: 'olho' });
    },

    manda(B, tc) {
      // NA TELA: o Rafa com o celular; 3 envelopes voando por cima da divisória até os cartões Padaria, Loja de roupa, Mecânica · MOSTRA: personagem, celular, contatos
      // CENÁRIO: a sala inteira de lado, as duas metades e a divisória
      const tM = quando('manda', B, 0.2), tMe = quando('mesma', B, 0.32), tTo = quando('todo', B, 0.6), tC = quando('contato', B, 0.7);
      // ENTRA AGORA: o celular sobe pra mão (palavra "manda"); os cartões surgem um a um (palavra "contato"); os envelopes (palavra "mesma")
      const pos = menino.irPara(RAFA, RAFA_MEIO, K.faixa(B.p, 0, 0.3), tc, { olhar: [2, 1, 4] });
      if (tc > tM) { celNaMao(pos); K.entrar(celG, 'sobe', tc - tM, { dur: 0.3, som: false, destaque: false }); }
      desenharCel(tc > tTo && Math.floor(tc * 6) % 2 === 0);
      contatosG.visible = true;
      fx.contatos.forEach((p, i) => { const d = tc - tC + 0.5 - i * 0.18; p.visible = d > 0; p.scale.setScalar(pop(d)); });
      // OBJETOS SE MEXENDO: os 3 envelopes iguais viajam em arco da esquerda pra direita e batem nos cartões
      fx.envs.forEach((p, i) => {
        const d = tc - tMe - i * 0.35;
        p.visible = d > 0 && d < 1.0;
        voa(p, [pos[0] + 0.3, 1.2, pos[2] + 0.3], mais(CARTAS[i], [0, 0, 0.1]), d / 0.9, 1.0);
      });
      // PERSONAGEM: começo: ideia (pega o celular) · na palavra "todo": aperta enviar sem parar
      // INTERAÇÃO: ele dispara as mensagens do celular; elas chegam nos cartões
      if (tc > tTo) menino.reagir('segurando', tc - tTo); else menino.reagir('ideia', B.t);
      // EFEITOS VISUAIS: etiqueta laranja "A mesma pra todos" (palavra "mesma")
      fx.et.mesma.em(mais(pos, [0.2, 2.0, 0.3]), tc - tMe);
      // SONS: bip do enviar · whoosh de cada envelope
      K.som('bip', tM + 0.2, 0.5);
      [0, 1, 2].forEach((i) => { K.som('whoosh', tMe + i * 0.35, 0.4); K.som('bip', tTo + i * 0.17, 0.3); });
      // CÂMERA: alvo [personagem, celular, contatos] · passando · aberto · frente · alto (frase 2: chegando, médio, direita, olho)
      K.filmar([menino, celG, contatosG], 'passando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
    },

    ninguem(B, tc) {
      // NA TELA: os 3 cartões grandes; o envelope da padaria quicando de volta; a loja tombando · MOSTRA: contatos
      // CENÁRIO: atrás dos cartões, a metade direita da sala, o salão desfocado
      const tP = quando('padaria', B, 0.15), tH = quando('horário', B, 0.4), tLe = quando('lê', B, 0.85);
      contatosG.visible = true;
      fx.contatos.forEach((p) => { p.visible = true; });
      // OBJETOS SE MEXENDO: o cartão da padaria treme e o envelope volta; o da loja tomba devagar (palavra "lê")
      K.falhar(fx.contatos[0], 'treme', tc - tP, { dur: 0.6, forca: 0.6, som: false });
      const dv = tc - tP;
      fx.envs[0].visible = dv > 0 && dv < 0.9;
      voa(fx.envs[0], mais(CARTAS[0], [0, 0, 0.15]), [-1.2, 1.0, 1.4], dv / 0.8, 0.5);
      fx.envs[1].visible = true;
      fx.envs[1].position.set(...mais(CARTAS[1], [0.3, -0.15, 0.12]));
      K.falhar(fx.contatos[1], 'tomba', tc - tLe, { dur: 0.6, som: false });
      // PERSONAGEM: à esquerda, com o celular · começo: dúvida · na palavra "lê": triste
      // INTERAÇÃO: os cartões rejeitam as mensagens dele
      menino.colocar(RAFA_MEIO, [2, 1.5, 0.6]);
      celNaMao(RAFA_MEIO);
      desenharCel(false);
      if (tc > tLe) menino.reagir('triste', tc - tLe); else menino.reagir('duvida', B.t);
      // SONS: baque do envelope voltando · errado em cada ✗ · o congela (o jogo)
      K.som('baque', tP + 0.8, 0.5);
      K.som('errado', tP + 0.1, 0.6);
      K.som('errado', tLe + 0.3, 0.6);
      // CÂMERA: alvo contatos · chegando · perto · perfil esquerda · olho (frase 3: passando, aberto, frente, alto)
      K.filmar(contatosG, 'chegando', B.p, { plano: 'perto', lado: -25, altura: 'olho' });
      // EFEITOS VISUAIS: etiqueta vermelha "Não precisa" (palavra "horário") · ✗ em cada cartão
      fx.et.precisa.em(mais(CARTAS[0], [0, 0.5, 0.1]), tc - tH);
      const [x1, y1] = K.tela(CARTAS[0]);
      fx.errado.em({ tela: [x1 + 140, y1 + 10] }, tc - tP - 0.1);
      const [x2, y2] = K.tela(CARTAS[1]);
      fx.errado2.em({ tela: [x2 + 140, y2 + 10] }, tc - tLe - 0.3);
    },

    ideais(B, tc) {
      // NA TELA: os 3 cartões novos com relógio: Salão, Barbearia, Clínica; o Rafa apontando · MOSTRA: ideais, personagem
      // CENÁRIO: as duas metades; atrás dos cartões, o salão da Bia aparecendo
      const tH = quando('horário', B, 0.3), ts = [quando('salão', B, 0.55), quando('barbearia', B, 0.72), quando('clínica', B, 0.88)];
      // ENTRA AGORA / OBJETOS SE MEXENDO: cada cartão entra girando na palavra dele
      ideaisG.visible = true;
      fx.ideais.forEach((p, i) => { p.visible = tc > ts[i] - 0.05; K.entrar(p, 'gira', tc - ts[i], { dur: 0.4, som: false, destaque: false }); });
      // PERSONAGEM: anda 1 passo pra divisória · começo: ideia · na palavra "salão": aponta cada cartão
      // INTERAÇÃO: ele aponta e cada cartão aparece onde ele aponta
      const pos = menino.irPara(RAFA, RAFA_MEIO, K.faixa(B.p, 0, 0.3), tc, { olhar: [2, 2, 0.6] });
      if (tc > ts[0]) { menino.olharPara(CARTAS[ts.filter((t) => tc > t).length - 1]); menino.apontar(0.8); menino.humor('feliz'); }
      else if (B.p > 0.3) menino.reagir('ideia', tc - (B.inicio + 0.3 * B.dur));
      // SONS: brilho de cada cartão · certo na palavra "clínica"
      ts.forEach((t) => K.som('brilho', t, 0.5));
      K.som('certo', ts[2] + 0.2, 0.6);
      // CÂMERA: alvo [ideais, personagem] · subindo · médio · frente · baixo (frase 4: chegando, perto, perfil esquerda, olho)
      K.filmar([ideaisG, menino], 'subindo', B.p, { plano: 'medio', lado: 10, altura: 'olho' });
      // EFEITOS VISUAIS: ✓ verde em cada cartão
      [fx.certo, fx.certo2, fx.certo3].forEach((m, i) => { const [x, y] = K.tela(CARTAS[i]); m.em({ tela: [x, y - 80] }, tc - ts[i] - 0.25); });
      void tH; void pos;
    },

    ideal_rotulo(B, tc) {
      // NA TELA: os 3 cartões no centro, brilhando; o rótulo "Cliente ideal" · MOSTRA: ideais
      ideaisG.visible = true;
      fx.ideais.forEach((p) => { p.visible = true; });
      // OBJETOS SE MEXENDO: os cartões giram juntos e brilham
      ideaisG.rotation.y = 0.2 * Math.sin(B.p * Math.PI);
      K.brilhar(ideaisG, B.t);
      // PERSONAGEM: à esquerda, de canto · vitória
      // INTERAÇÃO: ele comemora os cartões
      menino.colocar(RAFA_MEIO, [2, 2, 1]);
      menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: o rótulo amarelo "Cliente ideal" (o kit põe o som)
      fx.rot.ideal.em(mais(CARTAS[1], [0, 1.15, 0.3]), B.t - 0.05);
      K.som('brilho', B.inicio, 0.4);
      // CÂMERA: alvo ideais · girando · perto · perfil direita · baixo (frase 5: subindo, médio, frente)
      K.filmar(ideaisG, 'girando', B.p, { plano: 'perto', lado: 25, altura: 'baixo', angulo: 25 });
    },

    na_mao(B, tc) {
      // NA TELA: o Rafa com 4 cartões girando em volta da cabeça; o relógio correndo as horas · MOSTRA: personagem, abas, relogio
      // CENÁRIO: a mesa da esquerda e o computador
      const tD = quando('dia', B, 0.4), tI = quando('inteiro', B, 0.48);
      const ts = [quando('Google', B, 0.6), quando('site', B, 0.7), quando('Instagram', B, 0.8), quando('planilha', B, 0.92)];
      // ENTRA AGORA / OBJETOS SE MEXENDO: cada cartão entra na palavra dele e gira em volta da cabeça, cada vez mais rápido
      abasG.visible = true;
      const vel = 1.5 + 2.5 * K.clamp(B.p);
      fx.abas.forEach((p, i) => {
        const d = tc - ts[i] + 1.2;                 // os cartões já rodam desde o começo, e cada um pula na palavra dele
        p.visible = true;
        const a = B.t * vel + i * Math.PI / 2;
        p.position.set(Math.cos(a) * 0.75, 0.15 * Math.sin(a * 2), Math.sin(a) * 0.5);
        p.scale.setScalar((tc > ts[i] ? 1.25 : 0.9) * pop(d));
      });
      relogioG.visible = tc > tD - 0.1;
      K.entrar(relogioG, 'cresce', tc - tD, { dur: 0.3, som: false });
      const giro = Math.max(0, tc - tD) * 9;
      ptrM.rotation.z = -giro; ptrH.rotation.z = -giro / 12;
      // PERSONAGEM: na frente da mesa · começo: pensando · na palavra "inteiro": cansado, suando
      // INTERAÇÃO: os cartões rodeiam e cansam ele
      menino.colocar(RAFA, OLHA_CAM);
      if (tc > tI) { menino.reagir('cansado', tc - tI); menino.suar(tc - tI); } else menino.reagir('pensando', B.t);
      // SONS: clique de cada cartão · zumbido do relógio correndo · o congela (o jogo)
      ts.forEach((t) => K.som('clique', t, 0.5));
      K.som('zumbido', tD, 0.35, 1.5);
      // CÂMERA: alvo [personagem, abas, relogio] · girando (sentido contrário) · médio · frente · alto (frase 6: girando, perto, direita, baixo)
      K.filmar([menino, abasG, relogioG], 'girando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto', sentido: -1, angulo: 20 });
      // EFEITOS VISUAIS: etiqueta vermelha "8 horas" (palavra "inteiro")
      fx.et.horas.em(mais(relogioG.position.toArray(), [0, 0.7, 0]), tc - tI);
    },

    site(B, tc) {
      // NA TELA: o computador acendendo com a caixa de busca e a lupa; o Rafa chegando · MOSTRA: computador, personagem
      // CENÁRIO: a mesa da esquerda; os cartões da frase 7 caem e somem
      const tS = quando('site', B, 0.3), tP = quando('procura', B, 0.55);
      // OBJETOS SE MEXENDO: as abas caem no chão e somem; a lupa na tela gira procurando
      const dq = B.t;
      abasG.visible = dq < 0.7;
      fx.abas.forEach((p, i) => { p.visible = true; p.position.set(Math.cos(i * 1.6) * 1.0, -dq * dq * 4, Math.sin(i * 1.6) * 0.7); p.rotation.z = dq * 3; });
      // ENTRA AGORA: a lupa e a caixa de busca na tela (palavra "site")
      if (tc > tS) telaLupa(K.clamp((tc - tS) / 1.5)); else telaDesligada();
      // PERSONAGEM: anda até a mesa · começo: surpreso · na palavra "procura": ideia, apontando a tela
      // INTERAÇÃO: ele vai até o computador e aponta a busca
      menino.irPara([-1.4, 0, 1.8], RAFA, K.faixa(B.p, 0, 0.4), tc, { olhar: TELA });
      if (tc > tP) { menino.reagir('ideia', tc - tP); } else if (B.p > 0.4) menino.reagir('surpreso', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Procura por você" (palavra "procura")
      fx.et.procura.em(mais(PC, [0, 1.85, 0.3]), tc - tP);
      // SONS: whoosh das abas caindo · liga · passos
      K.som('whoosh', B.inicio + 0.05, 0.5);
      K.som('liga', tS, 0.6);
      [0.08, 0.2, 0.32].forEach((f) => K.som('passo', B.inicio + f * B.dur, 0.4));
      // CÂMERA: alvo [computador, personagem] · chegando · médio · perfil esquerda · olho (frase 7: girando, médio, frente, alto)
      K.filmar([comp.g, menino], 'chegando', B.p, { plano: 'medio', lado: -25, altura: 'olho' });
    },

    busca(B, tc) {
      // NA TELA: o computador embaixo; acima, o painel do Mappoa enchendo de salões com WhatsApp e Instagram · MOSTRA: lista, computador
      // CENÁRIO: a mesa da esquerda; o janelão atrás
      const tE = quando('escreve', B, 0.05), tLi = quando('lista', B, 0.5), tW = quando('WhatsApp', B, 0.68);
      // ENTRA AGORA: a busca letra por letra (palavra "escreve"); o painel subindo (palavra "lista"); os ícones (palavra "WhatsApp")
      const N = 28;
      const letras = Math.max(0, Math.min(N, Math.floor((tc - tE) / Math.max(0.03, (tLi - tE - 0.3) / N))));
      if (tc < tLi) telaBusca(letras, letras >= N); else telaMappoa();
      listaG.visible = tc > tLi - 0.1;
      K.entrar(listaG, 'sobe', tc - tLi, { dur: 0.6 });
      // OBJETOS SE MEXENDO: as linhas entram de cima pra baixo
      const n = Math.max(0, Math.min(12, Math.floor(K.clamp((tc - tLi) / 1.8) * 12)));
      const cont = Math.min(100, Math.floor(K.clamp((tc - tLi) / 2.0) * 100));
      desenharLista(n, tc > tW, cont >= 100 ? '100+' : String(cont));
      // PERSONAGEM: começo: digitando · na palavra "lista": surpreso, se afasta um passo
      // INTERAÇÃO: ele digita e a lista sobe na frente dele
      const recua = K.suave(K.clamp((tc - tLi) / 0.4));
      menino.colocar([RAFA[0] - 0.3 * recua, 0, RAFA[2] + 0.4 * recua], tc > tLi ? LISTA : TELA);
      if (tc > tLi) menino.reagir('surpreso', tc - tLi); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: contador de salões (palavra "lista")
      fx.cont.lista.em(cont >= 100 ? '100+' : String(cont), mais(LISTA, [-1.5, 0.7, 0.2]), tc - tLi, 'SALÕES');
      // SONS: clique das teclas · bip das linhas · certo nos ícones
      for (let k = 0; k < N; k += 3) K.som('clique', tE + k * 0.05, 0.25);
      for (let k = 1; k <= 6; k++) K.som('bip', tLi + k * 0.3, 0.18);
      K.som('certo', tW, 0.6);
      // CÂMERA: alvo [lista, computador] · subindo · médio · frente · olho (frase 8: chegando, médio, perfil esquerda)
      K.filmar([listaG, comp.g], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },

    mappoa_rotulo(B, tc) {
      // NA TELA: a lista de perto, girando e brilhando; o rótulo "Mappoa" · MOSTRA: lista
      listaG.visible = true;
      desenharLista(12, true, '100+');
      telaMappoa();
      // OBJETOS SE MEXENDO: o painel gira um pouco e brilha
      listaG.rotation.y = 0.25 * Math.sin(B.p * Math.PI);
      K.brilhar(listaG, B.t);
      // PERSONAGEM: no canto de baixo · vitória
      // INTERAÇÃO: ele comemora a lista
      menino.colocar([RAFA[0] - 0.3, 0, RAFA[2] + 0.4], LISTA);
      menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: o rótulo amarelo "Mappoa" · o brilho
      fx.rot.mappoa.em(mais(LISTA, [0, -1.45, 0.3]), B.t - 0.05);
      K.som('brilho', B.inicio, 0.4);
      // CÂMERA: alvo a lista · girando · perto · perfil direita · baixo (frase 9: subindo, médio, frente, olho)
      K.filmar(listaG, 'girando', B.p, { plano: 'perto', lado: 'direita', altura: 'baixo', angulo: 25 });
    },

    lixo(B, tc) {
      // NA TELA: a sala de cima: o envelope "Conheça nosso sistema" voa do Rafa até a Bia, que joga na lixeira · MOSTRA: envelope, lixeira, bia
      // CENÁRIO: as duas metades; o salão da Bia
      const tMe = quando('mensagem', B, 0.45), tSi = quando('sistema', B, 0.7), tLx = quando('lixo', B, 0.9);
      // ENTRA AGORA / OBJETOS SE MEXENDO: o envelope voa em arco (palavra "mensagem"), chega na Bia (palavra "sistema") e cai na lixeira (palavra "lixo")
      const bocaLixo = mais(pc.lixeira.position.toArray(), [0, 0.45, 0]);
      const mao = [BIA[0] - 0.3, 1.25, BIA[2] + 0.4];
      fx.envelope.visible = tc > tMe;
      if (tc < tSi) voa(fx.envelope, [RAFA_MEIO[0] + 0.3, 1.3, RAFA_MEIO[2] + 0.3], mao, (tc - tMe) / Math.max(0.3, tSi - tMe), 1.2);
      else if (tc < tLx) fx.envelope.position.set(...mao);
      else { voa(fx.envelope, mao, bocaLixo, (tc - tLx) / 0.35, 0.3); fx.envelope.scale.setScalar(1 - 0.6 * K.clamp((tc - tLx) / 0.35)); }
      if (tc > tLx + 0.35) fx.envelope.visible = false;
      K.falhar(pc.lixeira, 'treme', tc - tLx - 0.35, { dur: 0.4, forca: 0.5, som: false });
      // PERSONAGEM: o Rafa: chamando (manda confiante) · em "lixo": susto · a Bia: dúvida → brava, joga fora
      // INTERAÇÃO: a Bia pega o envelope dele e joga no lixo
      menino.colocar(RAFA_MEIO, [3, 1, 0]);
      if (tc > tLx) menino.reagir('susto', tc - tLx); else menino.reagir('chamando', B.t);
      biaNoSalao([-2, 1, 3]);
      if (tc > tSi) bia.reagir('bravo', tc - tSi); else bia.reagir('duvida', B.t);
      // SONS: whoosh do envelope · tampa da lixeira · o congela (o jogo)
      K.som('whoosh', tMe, 0.5);
      K.som('tampa', tLx + 0.35, 0.7);
      // CÂMERA: alvo [envelope, bia, lixeira] · afastando · aberto · frente · de cima (frase 10: girando, perto, direita, baixo)
      K.filmar([bia, pc.lixeira, [RAFA_MEIO[0] + 1.2, 1.6, RAFA_MEIO[2]]], 'afastando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
      // EFEITOS VISUAIS: ✗ vermelho em cima da lixeira (palavra "lixo")
      const [ex, ey] = K.tela(bocaLixo);
      fx.errado.em({ tela: [ex, ey - 110] }, tc - tLx - 0.35);
    },

    dor(B, tc) {
      // NA TELA: o balão verde do Rafa atravessa a divisória e chega no celular da Bia; a cadeira vazia do salão atrás · MOSTRA: balao, bia, celular_bia
      // CENÁRIO: o salão: espelho, a cadeira vazia, a placa
      const tDo = quando('dor', B, 0.12), tW = quando('WhatsApp', B, 0.45), tF = quando('faltam', B, 0.78), tAv = quando('avisar', B, 0.92);
      // ENTRA AGORA / OBJETOS SE MEXENDO: o balão desliza por cima da divisória (palavra "dor"); a mensagem chega no celular (palavra "WhatsApp")
      const kb = K.suave(K.clamp((tc - tDo) / 0.8));
      mostrar(fx.b.dor, [-0.4 + 2.6 * kb, 2.55, 0.3], tc - tDo);
      celBG.visible = true;
      desenharCelB(tc > tW ? 'dor' : 'vazio');
      // a cadeira vazia gira um pouquinho
      fx.cadeira.rotation.y = 0.25 * Math.sin(tc * 1.5);
      // PERSONAGEM: a Bia · começo: dúvida, olha o celular · na palavra "faltam": surpresa, aponta a cadeira vazia
      // INTERAÇÃO: a mensagem do Rafa faz a Bia olhar pra cadeira vazia
      biaNoSalao(tc > tF ? mais(CADEIRA, [0, 0.8, 0]) : OLHA_CAM);
      if (tc > tF) { bia.apontar(0.4); bia.humor('surpreso'); } else bia.reagir('duvida', B.t);
      // SONS: bip da mensagem chegando · certo
      K.som('whoosh', tDo, 0.4);
      K.som('bip', tW, 0.6);
      K.som('certo', tAv, 0.6);
      // CÂMERA: alvo [bia, celular_bia, balao] · passando · médio · perfil esquerda · olho (frase 11: afastando, aberto, frente, cima)
      K.filmar([bia, celBG, [2.2, 2.55, 0.3]], 'passando', B.p, { plano: 'medio', lado: -20, altura: 'olho' });
      // EFEITOS VISUAIS: etiqueta laranja "Cadeira vazia" (palavra "faltam") · ✓ verde no balão (palavra "avisar")
      fx.et.cadeira.em(mais(CADEIRA, [0, 1.6, 0.2]), tc - tF);
      const [ex, ey] = K.tela([3.5, 2.55, 0.3]);
      fx.certo.em({ tela: [ex + 60, ey - 80] }, tc - tAv);
    },

    ficha(B, tc) {
      // NA TELA: acima do computador, a ficha do "Salão da Bia" no Mappoa: as dores e a mensagem pronta; o Rafa do lado · MOSTRA: ficha, personagem
      // CENÁRIO: a mesa da esquerda e o computador
      const tE = quando('empresa', B, 0.2), tD = quando('dores', B, 0.4), tM = quando('mensagem', B, 0.62), tP = quando('pronta', B, 0.75), tMa = quando('mandar', B, 0.92);
      // ENTRA AGORA: a ficha cresce do computador (palavra "empresa"); as dores linha por linha (palavra "dores"); a mensagem se escreve (palavra "mensagem")
      fichaG.visible = tc > tE - 0.05;
      K.entrar(fichaG, 'cresce', tc - tE, { dur: 0.45 });
      const nD = tc > tD + 0.35 ? 2 : tc > tD ? 1 : 0;
      const letras = Math.max(0, Math.min(90, Math.floor((tc - tM) / 0.02)));
      desenharFicha(nD, letras);
      telaMappoa();
      // PERSONAGEM: começo: pensando, lendo · na palavra "pronta": mostrando, oferecendo pra câmera
      // INTERAÇÃO: ele lê a ficha e mostra a mensagem
      menino.colocar([RAFA[0] - 0.3, 0, RAFA[2] + 0.4], tc > tP ? OLHA_CAM : LISTA);
      if (tc > tP) menino.reagir('mostrando', tc - tP); else menino.reagir('pensando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Você que manda" (palavra "mandar")
      fx.et.manda.em(mais(LISTA, [0, 1.45, 0.2]), tc - tMa);
      // SONS: brilho da ficha (o K.entrar põe) · clique das linhas
      K.som('clique', tD, 0.4); K.som('clique', tD + 0.35, 0.4);
      for (let k = 0; k < 6; k++) K.som('clique', tM + k * 0.12, 0.2);
      // CÂMERA: alvo [ficha, personagem] · chegando · médio · perfil direita · baixo (frase 12: passando, médio, perfil esquerda, olho)
      K.filmar([fichaG, menino], 'chegando', B.p, { plano: 'medio', lado: 25, altura: 'baixo' });
    },

    caixa(B, tc) {
      // NA TELA: no meio da sala, a caixa azul "SISTEMA"; o Rafa do lado; a tampa abre e sobe a agenda cheia · MOSTRA: caixa, personagem
      // CENÁRIO: o meio da sala, a divisória atrás, a cidade no janelão
      const tN = quando('ninguém', B, 0.15), tS = quando('sistema', B, 0.3), tPr = quando('problema', B, 0.7), tR = quando('resolvido', B, 0.85);
      // ENTRA AGORA: a caixa cai do alto (palavra "sistema"); a agenda cheia sobe de dentro (palavra "resolvido")
      caixaG.visible = tc > tS - 0.3;
      K.entrar(caixaG, 'cai', tc - tS + 0.3, { dur: 0.4, altura: 2 });
      // OBJETOS SE MEXENDO: a tampa abre e voa (palavra "problema"); a agenda sobe meio metro e brilha
      const ka = K.suave(K.clamp((tc - tPr) / 0.35));
      tampa.position.set(0.5 * ka, 0.86 + 0.6 * ka - 0.6 * ka * ka, 0);
      tampa.rotation.z = -1.4 * ka;
      const kg = K.suave(K.clamp((tc - tR) / 0.4));
      agCheiaG.visible = tc > tPr;
      agCheiaG.position.set(0, 0.5 + 0.9 * kg, 0.05);
      if (tc > tR) K.brilhar(agCheiaG, tc - tR, 0.8);
      // PERSONAGEM: do lado da caixa · começo: dúvida, olhando a caixa · na palavra "problema": abre a tampa
      // INTERAÇÃO: ele abre a caixa e mostra o que tem dentro
      menino.colocar([CAIXA[0] - 1.05, 0, CAIXA[2] + 0.1], mais(CAIXA, [0, 0.8, 0]));
      if (tc > tR) menino.reagir('vitoria', tc - tR); else if (tc > tPr) menino.reagir('erguendo', tc - tPr); else menino.reagir('duvida', B.t);
      // SONS: baque da caixa (o K.entrar põe) · tampa · brilho
      K.som('tampa', tPr, 0.7);
      K.som('brilho', tR, 0.6);
      // CÂMERA: alvo [caixa, personagem] · revelando · médio · frente · olho (frase 13: chegando, médio, perfil direita, baixo)
      K.filmar([caixaG, menino, mais(CAIXA, [0, 1.6, 0])], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
      // EFEITOS VISUAIS: ✗ em cima da palavra "SISTEMA" (palavra "ninguém") · ✓ verde na agenda (palavra "resolvido")
      const [xs, ys] = K.tela(mais(CAIXA, [0.3, 1.3, 0.3]));
      if (tc < tPr) fx.errado.em({ tela: [xs + 40, ys] }, tc - Math.max(tN, tS + 0.3));
      const [xa, ya] = K.tela(mais(CAIXA, [0, 1.9, 0]));
      fx.certo.em({ tela: [xa + 120, ya - 60] }, tc - tR - 0.3);
    },

    esteira(B, tc) {
      // NA TELA: a esteira com o Rafa correndo em cima; do lado, a calça jeans flutuando · MOSTRA: esteira, calca, personagem
      // CENÁRIO: o meio da sala; atrás, a divisória
      const tA = quando('academia', B, 0.12), tE = quando('esteira', B, 0.45), tC = quando('calça', B, 0.7), tS = quando('servir', B, 0.92);
      // ENTRA AGORA: a esteira surge (palavra "academia"); a calça cai do alto (palavra "calça")
      esteiraG.visible = tc > tA - 0.05;
      K.entrar(esteiraG, 'surge', tc - tA, { dur: 0.35 });
      calcaG.visible = tc > tC - 0.05;
      K.entrar(calcaG, 'cai', tc - tC, { dur: 0.35, altura: 1.5 });
      // OBJETOS SE MEXENDO: os rolos giram; a calça encolhe um pouco na cintura e o botão fecha (palavra "servir")
      rolos.forEach((r) => { r.rotation.y = tc * 12; });
      const ks = K.suave(K.clamp((tc - tS) / 0.3));
      if (tc > tC + 0.35) calcaG.scale.set(1 - 0.12 * ks, 1, 1);
      // PERSONAGEM: correndo na esteira · na palavra "servir": vitória, pula da esteira
      // INTERAÇÃO: ele corre na esteira e comemora a calça
      if (tc < tS) {
        menino.colocar(mais(ESTEIRA, [0.1, 0.22, 0]), mais(ESTEIRA, [-3, 0.22, 0]));
        if (tc > tA) menino.correr(tc, 1.2); else menino.reagir('cansado', B.t);
      } else {
        const k = K.clamp((tc - tS) / 0.4);
        menino.colocar(mais(ESTEIRA, [0.1 + 0.7 * k, 0.22 * (1 - k) + 0.4 * Math.sin(Math.PI * k), 0.5 * k]), OLHA_CAM);
        menino.reagir('vitoria', tc - tS);
      }
      // SONS: zumbido da esteira · whoosh da calça (o K.entrar põe) · festa baixinho
      K.som('zumbido', tA, 0.3, 2);
      K.som('festa', tS, 0.4);
      // CÂMERA: alvo [esteira, personagem, calca] · passando · médio · perfil esquerda · olho (frase 14: revelando, médio, frente)
      K.filmar([esteiraG, menino, calcaG], 'passando', B.p, { plano: 'medio', lado: -25, altura: 'olho' });
      // EFEITOS VISUAIS: etiqueta laranja "O que ele quer" (palavra "calça") · ✓ verde (palavra "servir")
      fx.et.quer.em(mais(calcaG.position.toArray(), [0, 0.85, 0]), tc - tC - 0.3);
      const [ex, ey] = K.tela(calcaG.position.toArray());
      fx.certo.em({ tela: [ex + 110, ey] }, tc - tS - 0.2);
    },

    antes_agora(B, tc) {
      // NA TELA: Antes: o Rafa largado, envelopes caindo no chão. Agora: a lista do Mappoa e a Bia respondendo com joinha · MOSTRA: personagem, lista, bia
      // CENÁRIO: a sala inteira; a cidade no janelão
      const tQ = quando('qualquer', B, 0.3), tA = quando('Agora', B, 0.45), tD = quando('dor', B, 0.9);
      const antes = tc < tA;
      biaNoSalao([-2, 1, 3]);
      if (antes) {
        // OBJETOS SE MEXENDO: os envelopes caem do alto e se espalham no chão (palavra "qualquer")
        fx.chao.forEach((p, i) => { const d = tc - tQ - i * 0.12; p.visible = d > 0; p.position.set(-2.6 + i * 0.5, Math.max(0.15, 2.2 - d * d * 6), 1.6 + (i % 2) * 0.3); p.rotation.z = i * 0.7; });
        // PERSONAGEM: cansado, largado
        menino.colocar(RAFA_MEIO, OLHA_CAM);
        menino.reagir('cansado', tc - B.inicio);
        bia.reagir('bravo', 1);
        // EFEITOS VISUAIS: etiqueta vermelha "Qualquer um" · SONS: baque dos envelopes
        fx.et.antes.em([-1.5, 2.6, 1.0], tc - tQ);
        [0, 0.12, 0.24, 0.36].forEach((d) => K.som('baque', tQ + d + 0.4, 0.3));
        // CÂMERA: alvo [personagem, bia] · afastando · médio · frente · alto
        K.filmar([menino, bia], 'afastando', K.clamp((tc - B.inicio) / (tA - B.inicio)) * 0.5, { plano: 'medio', lado: 'frente', altura: 'alto' });
      } else {
        // ENTRA AGORA: a lista sobe (palavra "Agora"); o balão verde atravessa a divisória; o ✓ em cima da Bia (palavra "dor")
        listaG.visible = true;
        desenharLista(12, true, '100+');
        telaMappoa();
        K.entrar(listaG, 'sobe', tc - tA, { dur: 0.5 });
        const kb = K.suave(K.clamp((tc - tA - 0.6) / 0.8));
        mostrar(fx.b.dor, [-0.4 + 2.6 * kb, 2.6, 0.3], tc - tA - 0.6, 0.8);
        // PERSONAGEM: levanta num pulo, vitória, aponta a lista · a Bia: joinha
        // INTERAÇÃO: ele aponta a lista e a Bia responde
        menino.colocar(RAFA, LISTA);
        if (tc - tA < 0.6) menino.reagir('vitoria', tc - tA); else { menino.apontar(0.9); menino.humor('feliz'); }
        if (tc > tD) bia.reagir('ideia', tc - tD); else bia.reagir('duvida', B.t);
        // EFEITOS VISUAIS: etiqueta verde "Salões certos" · SONS: certo
        fx.et.agora.em(mais(LISTA, [0, 1.45, 0.2]), tc - tA);
        K.som('certo', tD, 0.6);
        // CÂMERA: alvo [personagem, lista, bia] · afastando · aberto · frente · alto
        K.filmar([menino, listaG, bia], 'afastando', 0.5 + 0.5 * K.clamp((tc - tA) / (B.ate - tA)), { plano: 'medio', lado: 'frente', altura: 'alto' });
        const [ex, ey] = K.tela(mais(BIA, [0, 1.9, 0]));
        fx.certo.em({ tela: [ex, ey - 60] }, tc - tD);
      }
    },

    segue(B, tc) {
      // NA TELA: o Rafa digitando no computador; a barra "mappoa.com" grande em cima; o cartão de seguir no topo · MOSTRA: personagem, navegador, computador
      // CENÁRIO: a mesa da esquerda; o janelão com a cidade atrás
      const tQ = quando('Pra', B, 0.02), tCo = quando('Comenta', B, 0.35), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
      // ENTRA AGORA: a chamada (palavra "Pra"), depois o cartão de seguir (palavra "computador"); o balão de comentário (palavra "Comenta")
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      const dc = tc - tCo;
      fx.comenta.visible = dc > 0 && dc < 0.9;
      fx.comenta.position.set(RAFA[0] + 0.3, 1.9 + dc * 0.6, RAFA[2] + 0.2);
      fx.comenta.scale.setScalar(pop(dc) * (dc > 0.7 ? 1 + (dc - 0.7) * 3 : 1));
      // ENTRA AGORA: a barra de endereço (palavra "computador"); "mappoa.com" letra por letra (palavra "digita")
      navG.visible = tc > tPc - 0.05;
      K.entrar(navG, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      desenharNav(letras, tc > tTe);
      telaEndereco(letras);
      // PERSONAGEM: começo: chamando, de frente pra câmera · em "digita": digita · em "testa": aponta pra barra
      // INTERAÇÃO: ele digita mappoa.com e aponta pro endereço
      if (tc < tPc) { menino.colocar(RAFA, OLHA_CAM); menino.reagir('chamando', B.t); }
      else { menino.colocar(RAFA, tc > tTe ? NAV : TELA); if (tc > tTe) { menino.apontar(0.9); menino.humor('feliz'); } else menino.reagir('segurando', tc - tPc); }
      // SONS: estalo do balão · clique de cada letra · ding no "Ir" · clique do seguir
      K.som('estalo', tCo + 0.7, 0.4);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6);
      K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: alvo [personagem, navegador, computador] · chegando · aberto · frente · olho · topo livre (frase 16: afastando, alto)
      K.filmar([navG, comp.g, menino], 'chegando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },

    cartao(B, tc) {
      // A cauda: o cartão fica (já em "Seguindo"), o Rafa acena; mappoa.com continua legível
      navG.visible = true;
      desenharNav(10, true);
      telaEndereco(10);
      menino.colocar(RAFA, OLHA_CAM);
      fx.seguir.em(9);
      menino.acenar(tc);
      menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp.g, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },

    capa(B, tc) {
      // A capa: o Rafa em desespero na frente; do lado, a Bia brava com o celular grande mostrando a mensagem apagada
      bia.g.visible = true;
      bia.colocar([1.1, 0, 1.6], [-1, 1, 6]);
      bia.reagir('bravo', 0.5);
      bia.humor('nojo');
      celBG.visible = true;
      celBG.position.set(1.62, 1.3, 2.0);
      celBG.scale.setScalar(2.2);
      desenharCelB('msg', 0);
      menino.colocar([-0.35, 0, 1.9], OLHA_CAM);
      menino.reagir('susto', 0.6);
      K.filmar([menino, bia, celBG], 'parado', 0, { plano: 'perto', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
      const [ex, ey] = K.tela([1.62, 1.85, 2.0]);
      fx.errado.em({ tela: [ex + 110, ey - 40] }, 1);
    }
  };

  // ---------- Quadro ----------

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    sombraLisa();
    // Tudo volta pro lugar, e o que só aparece em algumas frases começa escondido: o plano mostra o que precisa
    casas.forEach(({ o, p, r, s }) => { o.position.copy(p); o.rotation.copy(r); o.scale.copy(s); });
    menino.g.visible = false;
    bia.g.visible = false;
    [listaG, fichaG, navG, celG, celBG, contatosG, ideaisG, abasG, relogioG, caixaG, esteiraG, calcaG, pc.lixeira,
      fx.envelope, fx.comenta].forEach((o) => { o.visible = false; });
    pc.lixeira.visible = true;
    [...fx.contatos, ...fx.ideais, ...fx.abas].forEach((p) => { p.visible = false; });
    [...Object.values(fx.b), ...fx.envs, ...fx.chao].forEach((o) => { o.visible = false; o.rotation.set(0, 0, 0); o.scale.setScalar(1); });
    fx.ondas.esconder();
    celG.scale.setScalar(1);
    telaDesligada();
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
