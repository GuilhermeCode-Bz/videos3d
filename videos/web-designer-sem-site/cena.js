// Web designer atrás de empresas sem site (canal Mappoa). Cenário pronto: a cidade de dia (K.cenario('cidade')).
// Feito a partir da ficha de cena do roteiro.md: cada plano tem as linhas do bloco da ficha como comentário e o código
// embaixo. Tudo é função do tempo da cena (tc).
(function () {
  let lojaG, tl, bl, C, menino, comp, listaG, lista, planilhaG, planilha, celG, cel, lojasG, padariaG, pins, pc;
  let ordem = [];
  const fx = {};
  const casas = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pop = (t, d = 0.3) => (t <= 0 ? 0 : t >= d ? 1 : K.quica(t / d));
  const VERDE = '#2e9d5b';
  const G = 0.14;                                  // o chão do calçadão

  // Lugares do vídeo (o calçadão vai de z -3 a 10; a rua fica atrás, em z -7)
  const PC = [2.9, G, 0.9];                        // a mesa com o computador (C.direita)
  const TELA = [2.9, G + 1.185, 0.78];             // o meio da tela do computador
  const MESA_LADO = [2.05, G, 1.75];               // o Rafa na frente da mesa, à esquerda
  const LISTA = [2.9, G + 2.95, 0.55];             // o painel da lista, em cima do computador
  const PLANILHA = [2.9, G + 2.45, 0.5];           // a planilha, atrás e acima do computador
  const LOJAS_X = [-21, -26.2, -31.4];             // a fileira de lojas (a padaria é a 1ª)
  const LOJAS_Z = -0.3;
  const FRENTE_LOJA = 2.2;                         // z da fachada
  const PORTA_PAD = [-20.3, G, 3.3];               // o Rafa na porta da padaria
  const BANCO = [3.7, G, 5.1];                     // do lado do banco do calçadão
  const CEL_LADO = [0.2, G, 2.6];                  // o Rafa com o celular
  const CEL = [0.82, G + 1.15, 2.95];              // o celular, do lado da mão dele

  const EMPRESAS = ['Padaria Bom Dia', 'Padaria Pão Quente', 'Panificadora Central', 'Padaria Trigo de Ouro', 'Padaria Estrela',
    'Padaria Doce Lar', 'Padaria Vila Nova', 'Padaria Sabor da Terra', 'Padaria São José', 'Padaria Fornalha', 'Padaria Real',
    'Padaria Bela Vista', 'Padaria Pão Nosso', 'Padaria Aurora', 'Padaria Primavera', 'Padaria Campineira'];
  const temSite = (i) => i % 2 === 1;

  function guardar(o) { casas.push({ o, p: o.position.clone(), r: o.rotation.clone(), s: o.scale.clone() }); }

  // ---------- Telas desenhadas ----------

  function caixaR(c, x, y, w, h, r, cor) {
    c.fillStyle = cor; c.beginPath();
    c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); c.fill();
  }
  function texto(c, t, x, y, tam, cor, peso = 800, al = 'left') {
    c.fillStyle = cor; c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, x, y);
  }
  function zap(c, x, y, r) {                       // bolinha verde do WhatsApp
    c.fillStyle = '#25d366'; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    texto(c, '✆', x, y + 1, r * 1.3, '#fff', 900, 'center');
  }

  function telaSite(i) {                           // os sites bonitos que o Rafa faz
    const cores = [['#ff7a59', '#ffe2d6'], ['#6c5ce7', '#e6e2ff'], ['#00a3a3', '#d9f7f5']][i % 3];
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = cores[0]; c.fillRect(0, 0, w, 26);
      texto(c, ['Café Aroma', 'Studio Lumi', 'Verde Vida'][i % 3], 12, 13, 13, '#fff');
      c.fillStyle = cores[1]; c.fillRect(0, 26, w, 100);
      texto(c, 'Seu negócio', 18, 60, 22, '#222', 900);
      texto(c, 'mais bonito', 18, 88, 22, cores[0], 900);
      caixaR(c, 18, 104, 90, 16, 8, cores[0]);
      [0, 1, 2].forEach((k) => caixaR(c, 14 + k * 102, 140, 92, 56, 8, '#f1f1f1'));
    }, 'site' + (i % 3));
  }
  function telaZero() {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#1d2026'; c.fillRect(0, 0, w, h);
      texto(c, '0', w / 2, h / 2 - 14, 90, '#ff4d4d', 900, 'center');
      texto(c, 'CLIENTES', w / 2, h / 2 + 56, 26, '#ff9a9a', 900, 'center');
    }, 'zero');
  }
  function telaBuscaManual(k) {                    // procurando empresa por empresa, uma de cada vez
    const n = Math.floor(k * 6) % EMPRESAS.length;
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      caixaR(c, 14, 10, w - 28, 26, 13, '#eef0f3');
      texto(c, '🔍  ' + EMPRESAS[n].toLowerCase(), 26, 23, 13, '#444', 600);
      for (let j = 0; j < 4; j++) {
        caixaR(c, 14, 48 + j * 38, w - 28, 30, 6, j === 0 ? '#e7f0ff' : '#f6f6f6');
        texto(c, j === 0 ? EMPRESAS[n] : '...', 24, 63 + j * 38, 13, j === 0 ? '#1a4fb8' : '#999', 700);
      }
    }, 'manual' + n);
  }
  function telaMappoaBusca(letras, botao) {        // a busca do Mappoa, digitada letra por letra
    const alvo = 'padarias em Campinas';
    const s = alvo.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, 'O que você procura?', 18, 62, 14, '#2a3a30', 700);
      caixaR(c, 14, 78, w - 28, 40, 10, '#ffffff');
      c.strokeStyle = VERDE; c.lineWidth = 3; c.strokeRect(15, 79, w - 30, 38);
      texto(c, s + (letras < alvo.length ? '|' : ''), 26, 98, 17, '#111', 700);
      caixaR(c, w / 2 - 60, 136, 120, 36, 18, botao ? '#1fd16b' : VERDE);
      texto(c, 'Buscar', w / 2, 154, 16, '#fff', 900, 'center');
    }, 'mb' + letras + (botao ? 'b' : ''));
  }
  function telaMappoa() {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, '300+', w / 2, 95, 56, VERDE, 900, 'center');
      texto(c, 'empresas encontradas', w / 2, 140, 16, '#2a3a30', 700, 'center');
    }, 'mappoa');
  }

  // A planilha: n linhas (k = a linha nova entrando, 0 a 1), riscadas = quantas linhas "já tem site" já ganharam o ✗
  function desenharPlanilha(n, parcial, riscadas) {
    planilha.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#217346'; c.fillRect(0, 0, w, 44);
      texto(c, 'empresas.xlsx', 16, 22, 22, '#fff', 800);
      c.fillStyle = '#e9efe9'; c.fillRect(0, 44, w, 40);
      ['Empresa', 'Telefone', 'Tem site?'].forEach((t, i) => texto(c, t, [16, 250, 380][i], 64, 18, '#333', 800));
      const ordemRisca = [1, 3, 5];
      for (let j = 0; j < n; j++) {
        const y = 84 + j * 46;
        c.strokeStyle = '#d6d6d6'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y + 46); c.lineTo(w, y + 46); c.stroke();
        let nome = EMPRESAS[j];
        if (j === n - 1 && parcial < 1) nome = nome.slice(0, Math.max(1, Math.floor(nome.length * parcial)));
        const r = ordemRisca.indexOf(j);
        const riscada = r >= 0 && r < riscadas;
        texto(c, nome, 16, y + 23, 18, riscada ? '#aaa' : '#222', 700);
        if (j < n - 1 || parcial >= 1) {
          texto(c, '(19) 9••••-••' + (10 + j * 7), 250, y + 23, 16, riscada ? '#aaa' : '#444', 600);
          texto(c, temSite(j) ? 'sim' : 'não', 380, y + 23, 18, riscada ? '#aaa' : '#444', 700);
        }
        if (riscada) {
          c.strokeStyle = '#e8352b'; c.lineWidth = 4; c.beginPath(); c.moveTo(10, y + 23); c.lineTo(w - 10, y + 23); c.stroke();
          texto(c, '✗', w - 28, y + 23, 30, '#e8352b', 900, 'center');
        }
      }
    }, `pl${n}-${Math.floor(parcial * 10)}-${riscadas}`);
  }

  // A lista do Mappoa: n cartões (até 16), scroll, semSite = destacar as sem site, icones = 0 a 1 (telefone e WhatsApp)
  function desenharLista(n, semSite, icones, cont) {
    lista.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 70);
      texto(c, 'Mappoa', 20, 26, 30, '#fff', 900);
      texto(c, 'padarias em Campinas', 20, 54, 17, '#dff5e7', 700);
      texto(c, cont, w - 20, 36, 24, '#fff', 900, 'right');
      const alt = 58, top = 82;
      const cabe = Math.floor((h - top) / alt);
      const ini = Math.max(0, n - cabe);
      for (let j = ini; j < n; j++) {
        const y = top + (j - ini) * alt;
        const sem = !temSite(j);
        caixaR(c, 12, y, w - 24, alt - 8, 10, sem && semSite ? '#e3f7ea' : '#ffffff');
        texto(c, EMPRESAS[j % EMPRESAS.length], 24, y + 17, 17, '#1d2a22', 800);
        if (sem) { caixaR(c, 24, y + 30, 82, 16, 8, semSite ? VERDE : '#b9c4bd'); texto(c, 'SEM SITE', 65, y + 38, 11, '#fff', 900, 'center'); }
        else { caixaR(c, 24, y + 30, 82, 16, 8, '#dfe5e1'); texto(c, 'tem site', 65, y + 38, 11, '#6b7a70', 800, 'center'); }
        if (icones > 0) {
          texto(c, '☎ (19) 9••••-••' + (10 + j * 7), 122, y + 38, 12, '#44524a', 700);
          zap(c, w - 44, y + 25, 13 * Math.min(1, icones * 1.5));
        }
      }
    }, `li${n}-${semSite ? 1 : 0}-${icones > 0 ? 1 : 0}-${cont}`);
  }

  // O celular: modo 'spam' (k = quantos balões iguais) ou 'pessoal' (k = 0 a 1 da mensagem escrita), verde = botão aceso
  function desenharCelular(modo, k, verde) {
    const msgSpam = 'Olá, prezado cliente! Faço sites. Tem interesse?';
    const msg = 'Oi, Padaria Bom Dia! Vi que o pão de queijo de vocês é famoso no bairro. Que tal um site com o cardápio e pedido pelo WhatsApp?';
    cel.desenhar((c, w, h) => {
      c.fillStyle = '#ece5dd'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#075e54'; c.fillRect(0, 0, w, 56);
      texto(c, modo === 'spam' ? 'Todos os contatos' : 'Padaria Bom Dia', 16, 30, 20, '#fff', 800);
      const quebrar = (t, max) => { const ps = t.split(' '), ls = []; let l = ''; ps.forEach((p) => { if ((l + ' ' + p).trim().length > max) { ls.push(l.trim()); l = p; } else l += ' ' + p; }); if (l.trim()) ls.push(l.trim()); return ls; };
      if (modo === 'spam') {
        for (let j = 0; j < k; j++) {
          const y = 72 + j * 98;
          caixaR(c, 40, y, w - 56, 86, 14, '#dcf8c6');
          quebrar(msgSpam, 22).forEach((l, i) => texto(c, l, 54, y + 20 + i * 24, 17, '#222', 600));
        }
      } else {
        const s = msg.slice(0, Math.floor(msg.length * k));
        const ls = quebrar(s, 22);
        caixaR(c, 30, 76, w - 46, 30 + ls.length * 26, 14, '#ffffff');
        ls.forEach((l, i) => {
          texto(c, l, 44, 96 + i * 26, 17, '#222', 600);
          const ix = l.indexOf('pão de queijo');
          if (ix >= 0) { c.fillStyle = 'rgba(245,197,24,0.35)'; c.fillRect(44 + c.measureText(l.slice(0, ix)).width, 84 + i * 26, c.measureText('pão de queijo').width, 24); }
        });
        caixaR(c, w - 150, h - 70, 130, 48, 24, verde ? '#1fd16b' : '#9aa59e');
        texto(c, 'Enviar ➤', w - 85, h - 46, 20, '#fff', 900, 'center');
      }
    }, `cel-${modo}-${modo === 'spam' ? k : Math.floor(k * 30)}-${verde ? 1 : 0}`);
  }

  // ---------- Montagem (uma vez só) ----------

  function montar(timeline) {
    tl = timeline;
    bl = K.blocos(tl);
    ordem = bl.map((b) => b.plano);
    C = K.cenario('cidade');

    // As lojas: 3 lojinhas prontas (Kenney) no calçadão, de frente pra câmera, cada uma com toldo e placa
    lojasG = new THREE.Group();
    K.scene.add(lojasG);
    const nomes = [['Padaria', '#f7e7c6', '#7a4a22', 0xe8a33d], ['Pet Shop', '#d9f0ff', '#1f5d8f', 0x2f7fe0], ['Barbearia', '#ffe1e1', '#9b2226', 0xc0392b]];
    const modelos = ['building-small-a', 'building-small-d', 'building-small-a'];
    lojaG = [];
    LOJAS_X.forEach((x, i) => {
      const g = new THREE.Group();
      g.position.set(x, G, LOJAS_Z);
      lojasG.add(g);
      K.modelo('kenney-cidade/' + modelos[i], { escala: 5, pos: [0, 0, 0], pai: g });
      const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(nomes[i][3]));
      toldo.position.set(0, 2.55, 2.5 + 0.5);
      toldo.rotation.x = 0.25;
      g.add(toldo);
      const placa = K.placa(nomes[i][0], { larg: 2.8, alt: 0.7, fundo: nomes[i][1], cor: nomes[i][2], borda: nomes[i][2] });
      K.scene.remove(placa);
      placa.position.set(0, 3.15, 2.62);
      g.add(placa);
      lojaG.push(g);
    });
    padariaG = lojaG[0];
    K.lugar(lojasG); K.nomear('lojas', lojasG);
    K.lugar(padariaG); K.nomear('padaria', padariaG);

    // Os "?" laranja em cima de cada loja (gancho)
    fx.interroga = LOJAS_X.map((x) => {
      const q = K.placa('?', { larg: 1.0, alt: 1.0, fundo: '#ff9f1c', cor: '#ffffff', borda: '#ff9f1c' });
      q.position.set(x, G + 5.9, FRENTE_LOJA);
      return q;
    });

    // O computador do Rafa (C.direita), com a mesa
    comp = K.computador();
    comp.g.position.set(...PC);
    K.lugar(comp.g); K.nomear('computador', comp.g);

    // A planilha flutuando atrás do computador
    planilhaG = new THREE.Group();
    planilhaG.position.set(...PLANILHA);
    K.scene.add(planilhaG);
    const fundoPl = K.malha(new THREE.BoxGeometry(1.68, 1.28, 0.04), K.mat(0x217346));
    fundoPl.position.z = -0.03;
    planilha = K.telaCanvas(1.6, 1.2, 480);
    planilhaG.add(fundoPl, planilha.m);
    K.lugar(planilhaG); K.nomear('planilha', planilhaG); guardar(planilhaG);

    // O painel da lista do Mappoa, em cima do computador
    listaG = new THREE.Group();
    listaG.position.set(...LISTA);
    K.scene.add(listaG);
    const fundoLi = K.malha(new THREE.BoxGeometry(2.32, 2.92, 0.06), K.mat(0x2e9d5b));
    fundoLi.position.z = -0.04;
    lista = K.telaCanvas(2.2, 2.8, 440);
    listaG.add(fundoLi, lista.m);
    K.lugar(listaG); K.nomear('lista', listaG); guardar(listaG);

    // O celular (grande, pra dar pra ler)
    celG = new THREE.Group();
    celG.position.set(...CEL);
    celG.rotation.y = -0.25;
    K.scene.add(celG);
    const corpo = K.malha(new THREE.BoxGeometry(0.52, 0.98, 0.05), K.mat(0x1d1f24, { roughness: 0.4 }));
    cel = K.telaCanvas(0.46, 0.9, 360);
    cel.m.position.z = 0.027;
    celG.add(corpo, cel.m);
    K.lugar(celG); K.nomear('celular', celG); guardar(celG);

    // Os 3 cartõezinhos das empresas (frase 11), do lado do celular
    fx.cartoes = [['Padaria:\npão de queijo', '#f7e7c6', '#7a4a22'], ['Pet shop:\nbanho e tosa', '#d9f0ff', '#1f5d8f'], ['Barbearia:\ncorte e barba', '#ffe1e1', '#9b2226']].map(([t, f, c], i) => {
      const p = K.placa(t, { larg: 0.8, alt: 0.42, fundo: f, cor: c, borda: c });
      p.position.set(CEL[0] + 0.85, CEL[1] + 0.42 - i * 0.48, CEL[2] - 0.1);
      p.rotation.y = -0.35;
      K.lugar(p);
      return p;
    });

    // O pão de queijo gigante e a plaquinha "Prezado cliente" (frase 12)
    pc = K.pecas({ paodequeijo: { forma: 'esfera', tam: [0.55], cor: '#e8b54a', pos: [LOJAS_X[0] - 0.6, G + 1.5, FRENTE_LOJA + 1.4] } });
    pc.paodequeijo.scale.set(1, 0.78, 1);
    K.lugar(pc.paodequeijo); guardar(pc.paodequeijo);
    fx.prezado = K.placa('Prezado cliente', { larg: 1.3, alt: 0.4, fundo: '#ffffff', cor: '#555', borda: '#999' });

    // O balão de fala "Vocês têm site?" (frase 3)
    fx.balao = K.placa('Vocês têm site?', { larg: 1.7, alt: 0.5, fundo: '#ffffff', cor: '#1b1b1b', borda: '#1b1b1b' });

    // Os marcadores verdes em cima dos prédios do outro lado da rua e das lojas (frase 13)
    const tipos = ['building-small-b', 'building-small-a', 'building-small-c', 'building-small-d', 'building-small-b', 'building-garage', 'building-small-c', 'building-small-a'];
    const altura = { 'building-small-a': 0.95, 'building-small-b': 1.626, 'building-small-c': 1.75, 'building-small-d': 1.0, 'building-garage': 0.55 };
    pins = new THREE.Group();
    K.scene.add(pins);
    const pontosPins = [];
    for (let i = 0, x = -36; x <= -12; x += 6, i++) pontosPins.push([x, G + altura[tipos[i % tipos.length]] * 6 + 1.6, -19.2]);
    LOJAS_X.forEach((x) => pontosPins.push([x, G + 6.3, LOJAS_Z]));
    pontosPins.forEach((p) => {
      const pin = new THREE.Group();
      pin.position.set(...p);
      const cone = K.malha(new THREE.ConeGeometry(0.55, 1.3, 16), K.mat(0x2e9d5b, { emissive: 0x2e9d5b, emissiveIntensity: 0.4 }));
      cone.rotation.x = Math.PI;
      const bola = K.malha(new THREE.SphereGeometry(0.62, 16, 12), K.mat(0x2e9d5b, { emissive: 0x2e9d5b, emissiveIntensity: 0.4 }));
      bola.position.y = 0.75;
      const miolo = K.malha(new THREE.SphereGeometry(0.26, 12, 10), K.mat(0xffffff));
      miolo.position.set(0, 0.8, 0.45);
      pin.add(cone, bola, miolo);
      pins.add(pin);
    });
    K.lugar(pins); K.nomear('pins', pins);

    // O Rafa: o personagem do canal (canal/identidade.md)
    menino = K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });

    // Os dados chegando do computador pra lista
    fx.bits = K.bits(K.caminho([mais(TELA, [0, 0.2, 0.05]), mais(LISTA, [0, -1.0, 0.1]), mais(LISTA, [0, 0.6, 0.1])]), 26, 21, { cor: 0x2e9d5b, soLuz: true });

    // Textos (cada um uma vez)
    fx.certo = K.marca('certo');
    fx.errado = K.marca('errado');
    fx.errado2 = K.marca('errado');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual empresa você quer achar? <em>Comenta aí</em>');
    fx.rot = { mappoa: K.rotulo('Mappoa') };
    fx.cont = { zero: K.contador(), lojas: K.contador(), lista: K.contador() };
    const e = (t, cor) => K.etiqueta(t, cor);
    fx.et = {
      rafa: e('Rafa · web designer', 'azul'), dia: e('1 dia inteiro', 'vermelho'), manual: e('Empresa por empresa', 'azul'),
      site: e('Já tem site', 'vermelho'), procura: e('Procura por você', 'verde'), semsite: e('Sem site', 'verde'),
      spam: e('Cara de spam', 'vermelho'), cada: e('Uma pra cada empresa', 'verde'), envia: e('Quem envia é você', 'azul'),
      negocio: e('Fala do negócio dela', 'laranja'), antes: e('Antes', 'vermelho'), agora: e('Agora', 'verde')
    };
  }

  // ---------- Planos: um por frase do roteiro.json ----------

  const P = {
    gancho(B, tc) {
      // NA TELA: a fileira de lojas no centro, a padaria na frente; o Rafa à direita delas, procurando; a pergunta no topo · MOSTRA: lojas, personagem
      // CENÁRIO: o calçadão; atrás das lojas, os prédios altos; a rua com os carros passando (o K.cenario cuida)
      // ENTRA AGORA: nada (o gancho mostra o lugar pronto)
      // OBJETOS SE MEXENDO: "?" laranja pulam em cima de cada loja, um por um, na palavra "site"
      const tS = quando('site', B, 0.75);
      fx.interroga.forEach((q, i) => { q.visible = tc > tS + i * 0.2; q.scale.setScalar(pop(tc - tS - i * 0.2)); q.position.y = G + 5.9 + 0.08 * Math.sin(tc * 4 + i); });
      // PERSONAGEM: à direita das lojas, meio de frente pra câmera · começo: pensando · na palavra "site": dúvida, olhando de loja em loja
      // INTERAÇÃO: ele olha as lojas, uma por uma, tentando adivinhar qual não tem site
      const pos = [LOJAS_X[0] + 3.6, G, 4.2];
      if (tc > tS) {
        menino.colocar(pos, [LOJAS_X[Math.min(2, Math.floor((tc - tS) / 0.5))], 2, FRENTE_LOJA]);
        menino.reagir('duvida', tc - tS);
      } else { menino.colocar(pos, [LOJAS_X[0], 2, 8]); menino.reagir('pensando', B.t); }
      // EFEITOS VISUAIS: a pergunta no topo (o motor põe) · os "?" laranja
      // SONS: whoosh da câmera descendo · bip pra cada "?"
      K.som('whoosh', B.inicio + 0.05, 0.4);
      [0, 1, 2].forEach((i) => K.som('bip', tS + i * 0.2, 0.5));
      // CÂMERA: alvo [lojas, personagem] · mergulho · médio · um pouco pela direita (20) · topo livre (espacoCima 0.35)
      K.filmar([lojaG[0], menino], 'mergulho', B.p, { plano: 'aberto', lado: 20, espacoCima: 0.35 });
    },

    rafa(B, tc) {
      // NA TELA: o Rafa no centro, do lado da mesa com o computador; na tela, um site bonito; em cima dele, "0 clientes" · MOSTRA: personagem, computador
      // CENÁRIO: o calçadão; atrás, a rua com um carro passando (o K.cenario cuida)
      // OBJETOS SE MEXENDO: a tela passa por 3 sites bonitos (a partir de "sites"); na palavra "nenhum", vira "0 clientes"
      const tSites = quando('sites', B, 0.3), tN = quando('nenhum', B, 0.75), tR = quando('Rafa', B, 0.1);
      if (tc > tN) telaZero(); else telaSite(Math.max(0, Math.floor((tc - tSites) / 0.7)));
      // PERSONAGEM: na frente da mesa, de frente pra câmera · começo: mostrando a tela · na palavra "nenhum": triste
      // INTERAÇÃO: ele mostra os sites na tela, orgulhoso, e murcha quando aparece o zero
      menino.colocar([1.85, G, 1.9], [1.5, 0, 9]);
      if (tc > tN) menino.reagir('triste', tc - tN); else menino.reagir('mostrando', B.t);
      // ENTRA AGORA e EFEITOS VISUAIS: etiqueta azul "Rafa · web designer" (palavra "Rafa") · contador vermelho "0 clientes" (palavra "nenhum")
      fx.et.rafa.em([0.7, G + 1.2, 1.9], tc - tR);
      fx.cont.zero.em('0', [1.85, G + 2.05, 1.9], tc - tN, 'CLIENTES');
      // SONS: ding da etiqueta (o kit põe) · errado no zero
      K.som('errado', tN, 0.6);
      // CÂMERA: alvo [personagem, computador] · chegando · perto · frente · altura do olho (frase 1: mergulho, médio, de cima)
      K.filmar([menino, comp.g], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho' });
    },

    rua(B, tc) {
      // NA TELA: as lojas, a padaria no centro; o Rafa andando pela frente delas; o balão "Vocês têm site?" · MOSTRA: padaria, personagem
      // CENÁRIO: o calçadão com as lojas; atrás, a rua com o ônibus (o K.cenario cuida)
      // PERSONAGEM: anda até a porta da padaria na 1ª metade · na palavra "Vocês": chamando, virado pra porta
      // INTERAÇÃO: ele chega na porta da padaria e pergunta pra dentro da loja
      const tV = quando('Vocês', B, 0.65);
      const porta = [LOJAS_X[0], G + 1, FRENTE_LOJA];
      menino.irPara([LOJAS_X[0] + 5, G, 4.4], PORTA_PAD, K.faixa(B.p, 0, 0.5), tc, { olhar: porta });
      if (tc > tV) menino.reagir('chamando', tc - tV);
      // ENTRA AGORA e EFEITOS VISUAIS: o balão de fala surgindo em cima dele (palavra "Vocês")
      fx.balao.visible = tc > tV;
      fx.balao.position.set(PORTA_PAD[0] - 0.3, G + 2.15, PORTA_PAD[2] + 0.1);
      fx.balao.scale.setScalar(pop(tc - tV));
      // OBJETOS SE MEXENDO: a porta da padaria acende quando ele chega
      if (B.p > 0.5) K.brilhar(padariaG, tc - (B.inicio + 0.5 * B.dur), 0.8);
      // SONS: passos · clique do balão · buzina lá atrás, baixinho
      [0.08, 0.2, 0.32, 0.44].forEach((f) => K.som('passo', B.inicio + f * B.dur, 0.4));
      K.som('clique', tV, 0.7);
      K.som('buzina', B.inicio + 0.3 * B.dur, 0.15);
      // CÂMERA: alvo [padaria, personagem] · passando · médio · direita · altura do olho (frase 2: chegando, perto, de frente)
      K.filmar([padariaG, menino], 'passando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho' });
    },

    cansaco(B, tc) {
      // NA TELA: o banco da calçada; o Rafa largado do lado dele, suando; o contador até 12; o céu alaranjado · MOSTRA: personagem
      // CENÁRIO: o calçadão no fim da tarde (o céu muda pra tarde nesta frase)
      K.ceu('dia', 'tarde', K.suave(K.clamp(B.p * 1.5)));
      const tD = quando('doze', B, 0.4), tC = quando('cansaço', B, 0.8);
      // ENTRA AGORA e OBJETOS SE MEXENDO: o contador surge e conta de 1 a 12 em 1 s (palavra "doze"); o suor a partir de "cansaço"
      const n = Math.max(1, Math.min(12, Math.ceil((tc - tD + 0.9) / 0.08)));
      fx.cont.lojas.em(String(n), mais(BANCO, [0, 2.15, 0]), tc - tD + 0.9, 'LOJAS');
      // PERSONAGEM: chega arrastando os pés até o banco na 1ª metade · na palavra "cansaço": cansado, suando
      // INTERAÇÃO: ele desaba do lado do banco no fim do dia
      menino.irPara([1.2, G, 6.4], BANCO, K.faixa(B.p, 0, 0.45), tc, { olhar: [3.0, 0, 10] });
      if (tc > tC) { menino.reagir('cansado', tc - tC); menino.suar(tc - tC); } else if (B.p > 0.45) menino.reagir('cansado', B.t);
      // EFEITOS VISUAIS: contador "12 lojas" (palavra "doze") · etiqueta vermelha "1 dia inteiro" + ✗ (palavra "cansaço") · P&B no fim (o jogo)
      fx.et.dia.em(mais(BANCO, [-1.6, 2.6, 0]), tc - tC);
      // SONS: bip a cada número · baque quando ele desaba · o congela (o jogo põe)
      for (let k = 0; k < 12; k++) K.som('bip', tD - 0.9 + k * 0.08, 0.25);
      K.som('baque', tC, 0.6);
      // CÂMERA: alvo [banco, personagem] · descendo · médio · esquerda · do alto (frase 3: passando, médio, direita, olho)
      K.filmar([menino, mais(BANCO, [0.8, 0.5, -0.4])], 'descendo', B.p, { plano: 'medio', lado: -30, altura: 'alto' });
      if (B.p > 0.45) menino.olharPara([K.camera.position.x, G, K.camera.position.z]);
      // o ✗ em cima da etiqueta (depois da câmera, pra K.tela achar o lugar certo na tela)
      const [ex, ey] = K.tela(mais(BANCO, [-1.6, 2.6, 0]));
      fx.errado.em({ tela: [ex, ey - 150] }, tc - tC - 0.2);
    },

    planilha(B, tc) {
      // NA TELA: a mesa com o computador no centro; o Rafa digitando; a planilha flutuando atrás, com as linhas entrando · MOSTRA: computador, planilha, personagem
      // CENÁRIO: de volta ao dia; atrás da mesa, o calçadão e a rua (o K.cenario cuida)
      // ENTRA AGORA: a planilha crescendo atrás do computador (palavra "planilha")
      const tP = quando('planilha', B, 0.8), tE = quando('empresa', B, 0.35);
      planilhaG.visible = true;
      const kp = K.entrar(planilhaG, 'cresce', tc - Math.min(tP - 0.3, B.inicio + 0.6), { dur: 0.6 });
      // OBJETOS SE MEXENDO: a tela passa por uma empresa de cada vez; na planilha, 3 linhas entram uma por uma
      telaBuscaManual(B.p);
      const linhas = Math.min(3, 1 + Math.floor(B.p * 3.2));
      desenharPlanilha(linhas, K.clamp(B.p * 3.2 - (linhas - 1)), 0);
      // PERSONAGEM: na frente da mesa, de frente pro computador · começo: segurando (digitando) · na palavra "planilha": aponta pra planilha
      // INTERAÇÃO: ele digita no teclado e as linhas aparecem na planilha
      menino.colocar(MESA_LADO, TELA);
      if (tc > tP) { menino.olharPara(PLANILHA); menino.apontar(0.8); } else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Empresa por empresa" em cima do computador (palavra "empresa")
      fx.et.manual.em(mais(PC, [-1.1, 1.9, 0.5]), tc - tE);
      // SONS: clique do teclado, rapidinho · brilho da planilha crescendo (o K.entrar põe)
      for (let k = 0.1; k < 0.9; k += 0.09) K.som('clique', B.inicio + k * B.dur, 0.25);
      // CÂMERA: alvo [computador, planilha, personagem] · subindo · médio · perfil_direita · altura do olho (frase 4: descendo, alto, esquerda)
      K.filmar([comp.g, planilhaG, menino], 'subindo', B.p, { plano: 'medio', lado: 'perfil_direita', altura: 'olho' });
      return kp;
    },

    devagar(B, tc) {
      // NA TELA: a planilha grande no centro, de perto, com 6 linhas; metade ganha ✗ "já tem site"; o Rafa embaixo à direita · MOSTRA: planilha
      // CENÁRIO: atrás da planilha, os prédios do outro lado da rua (o K.cenario cuida)
      planilhaG.visible = true;
      const tM = quando('metade', B, 0.6);
      // OBJETOS SE MEXENDO: uma linha nova entra devagar, letra por letra; na palavra "metade", 3 linhas ganham o ✗ e a planilha treme
      const linhas = 5 + (B.p > 0.15 ? 1 : 0);
      const riscadas = tc > tM ? Math.min(3, 1 + Math.floor((tc - tM) / 0.25)) : 0;
      desenharPlanilha(linhas, linhas === 6 ? K.clamp((B.p - 0.15) / 0.4) : 1, riscadas);
      K.falhar(planilhaG, 'treme', tc - tM, { dur: 0.6, forca: 0.5, som: 'range' });
      telaBuscaManual(0.9);
      // PERSONAGEM: embaixo, à direita da planilha · começo: cansado (bocejando) · na palavra "metade": bravo
      // INTERAÇÃO: a planilha frustra o Rafa: o trabalho dele vai sendo riscado na frente dele
      menino.colocar([3.7, G, 1.9], PLANILHA);
      if (tc > tM) menino.reagir('bravo', tc - tM); else menino.reagir('cansado', B.t);
      // EFEITOS VISUAIS: os ✗ vermelhos nas linhas · etiqueta vermelha "Já tem site" (palavra "metade") · P&B no fim (o jogo)
      fx.et.site.em(mais(PLANILHA, [0, 0.85, 0.1]), tc - tM);
      // SONS: clique lento das letras · errado a cada ✗ · range (o K.falhar põe) · o congela (o jogo põe)
      [0.2, 0.32, 0.44].forEach((f) => K.som('clique', B.inicio + f * B.dur, 0.3));
      [0, 1, 2].forEach((i) => K.som('errado', tM + i * 0.25, 0.4));
      // CÂMERA: alvo a planilha, quase a tela toda · chegando · detalhe · frente · altura do olho (frase 5: subindo, médio, de perfil)
      K.filmar(planilhaG, 'chegando', B.p, { plano: 'detalhe', lado: 'frente', altura: 'olho' });
    },

    busca(B, tc) {
      // NA TELA: o computador no centro, de perto; na tela, a busca do Mappoa sendo digitada; o Rafa do lado; a planilha some · MOSTRA: computador, personagem
      // CENÁRIO: atrás, a rua com o semáforo (o K.cenario cuida)
      // OBJETOS SE MEXENDO: depois do ⏪, a planilha encolhe e some; as letras entram uma por uma; o botão "Buscar" pisca verde no fim
      const t0 = B.inicio + B.bloco.reb;          // o começo depois do ⏪
      const kSome = K.clamp(B.tq / 0.4);
      planilhaG.visible = kSome < 1;
      planilhaG.scale.setScalar(1 - K.suave(kSome));
      desenharPlanilha(6, 1, 3);
      const tF = quando('ferramenta', B, 0.25), tPad = quando('padarias', B, 0.6);
      const letras = Math.max(0, Math.min(20, Math.floor((tc - tPad) / 0.05)));
      const botao = tc > tPad + 1.15;
      if (tc > tF) telaMappoaBusca(letras, botao); else telaBuscaManual(0.9);
      // PERSONAGEM: na frente da mesa, à esquerda · depois do ⏪: surpreso · na palavra "padarias": ideia, e volta a digitar
      // INTERAÇÃO: ele digita a busca no teclado e aperta o botão
      menino.colocar(MESA_LADO, TELA);
      if (tc > tPad + 0.6) menino.reagir('segurando', tc - tPad - 0.6);
      else if (tc > tPad) menino.reagir('ideia', tc - tPad);
      else menino.reagir('surpreso', Math.max(0, tc - t0));
      // EFEITOS VISUAIS: o ⏪ (o jogo) · etiqueta verde "Procura por você" (palavra "ferramenta")
      fx.et.procura.em(mais(PC, [0, 1.75, 0.2]), tc - tF);
      // SONS: rebobina (o jogo põe) · clique de cada letra · bip no Buscar
      for (let k = 0; k < 20; k += 2) K.som('clique', tPad + k * 0.05, 0.25);
      K.som('bip', tPad + 1.15, 0.6);
      // CÂMERA: alvo o computador · girando · perto · esquerda · do alto (B.q: depois do ⏪) (frase 6: chegando, detalhe, frente)
      K.filmar([comp.g, menino], 'girando', B.q, { plano: 'perto', lado: 'esquerda', altura: 'alto', angulo: 30 });
    },

    lista(B, tc) {
      // NA TELA: o painel da lista em cima do computador; os cartões das empresas enchendo; o contador; o Rafa embaixo · MOSTRA: lista, personagem
      // CENÁRIO: o calçadão; atrás do painel, os prédios e o ônibus (o K.cenario cuida)
      const tL = quando('lista', B, 0.05), tC = quando('centenas', B, 0.15), tN = quando('tem', B, 0.5), tW = quando('WhatsApp', B, 0.9);
      const tNao = K.quando('não', tN) ?? tN;
      // ENTRA AGORA: a lista subindo de dentro da tela (palavra "lista"); os cartões caindo a partir de "centenas"; os ícones na palavra "WhatsApp"
      listaG.visible = true;
      K.entrar(listaG, 'sobe', tc - tL + 0.2, { dur: 0.6 });
      const n = Math.max(0, Math.min(16, Math.floor(Math.pow(Math.max(0, tc - tC) / 2.6, 0.8) * 16)));
      const cont = Math.min(300, Math.floor(K.clamp((tc - tC) / 3) * 300));
      desenharLista(n, tc > tNao, tc > tW - 0.2 ? 1 : 0, cont >= 300 ? '300+' : String(cont));
      telaMappoa();
      // OBJETOS SE MEXENDO: os bits verdes sobem do computador pra lista o tempo todo
      fx.bits.em(tc, 0.6);
      // PERSONAGEM: embaixo, à esquerda da lista, olhando pra cima · começo: surpreso · na palavra "WhatsApp": vitória
      // INTERAÇÃO: a lista cresce em cima da cabeça dele; ele comemora quando aparecem os contatos
      menino.colocar([1.3, G, 2.0], LISTA);
      if (tc > tW) menino.reagir('vitoria', tc - tW); else menino.reagir('surpreso', B.t);
      // EFEITOS VISUAIS: contador verde "300+ empresas" (palavra "centenas") · etiqueta verde "Sem site" (palavra "não tem")
      fx.cont.lista.em(cont >= 300 ? '300+' : String(cont), mais(LISTA, [-1.75, 0.9, 0.2]), tc - tC, 'EMPRESAS');
      fx.et.semsite.em(mais(LISTA, [1.55, -0.6, 0.2]), tc - tNao);
      // SONS: whoosh da lista subindo (o K.entrar põe) · bip a cada cartão · certo nos ícones
      for (let k = 1; k <= 16; k++) K.som('bip', tC + 2.6 * Math.pow(k / 16, 1.25), 0.18);
      K.som('certo', tW, 0.6);
      // CÂMERA: alvo [lista, personagem] · revelando · médio · frente · de baixo (frase 7: girando, perto, do alto)
      K.filmar([listaG, menino], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo' });
    },

    mappoa_rotulo(B, tc) {
      // NA TELA: a lista do Mappoa brilhando, de cima a baixo na tela; o rótulo "Mappoa" · MOSTRA: lista
      // CENÁRIO: os prédios do outro lado da rua, lá atrás (o K.cenario cuida)
      // OBJETOS SE MEXENDO: a lista brilha amarelo enquanto a câmera gira em volta dela
      listaG.visible = true;
      desenharLista(16, true, 1, '300+');
      telaMappoa();
      K.brilhar(listaG, B.t);
      // PERSONAGEM: em C.personagem, mostrando a lista (no close ele pode sair do quadro)
      // INTERAÇÃO: nenhuma na tela
      menino.colocar([1.3, G, 2.0], LISTA);
      menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: o brilho amarelo · rótulo amarelo "Mappoa" no topo
      fx.rot.mappoa.em(mais(LISTA, [0, 1.75, 0]), B.t - 0.05);
      // SONS: o do rótulo (o kit põe)
      // CÂMERA: alvo a lista · girando pro outro lado · perto · do alto (30) · topo livre pro rótulo (frase 8: revelando, médio, de baixo)
      K.filmar(listaG, 'girando', B.p, { plano: 'perto', altura: 'alto', angulo: 30, sentido: -1, espacoCima: 0.25 });
    },

    spam(B, tc) {
      // NA TELA: o celular grande no centro, do lado do Rafa; a mesma mensagem copiada 5 vezes · MOSTRA: celular, personagem
      // CENÁRIO: o calçadão; atrás, a rua com um carro passando (o K.cenario cuida)
      celG.visible = true;
      // ENTRA AGORA: o celular subindo até a frente do peito, no começo; os balões iguais a partir de "mesma"
      K.entrar(celG, 'sobe', B.t, { dur: 0.5 });
      const tM = quando('mesma', B, 0.25), tS = quando('spam', B, 0.85);
      const nb = Math.max(0, Math.min(5, 1 + Math.floor((tc - tM) / 0.32)));
      desenharCelular('spam', tc > tM ? nb : 0, false);
      // OBJETOS SE MEXENDO: na palavra "spam", o celular treme e pisca (K.falhar 'pisca')
      K.falhar(celG, 'pisca', tc - tS, { dur: 0.8 });
      // PERSONAGEM: de frente pra câmera, segurando o celular · começo: segurando · na palavra "spam": susto
      // INTERAÇÃO: ele aperta enviar várias vezes e o celular reclama na mão dele
      menino.colocar(CEL_LADO, [1.2, 0, 9]);
      if (tc > tS) menino.reagir('susto', tc - tS); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: etiqueta vermelha "Cara de spam" + ✗ (palavra "spam") · P&B no fim (o jogo)
      fx.et.spam.em(mais(CEL, [0, 0.75, 0.1]), tc - tS);
      const [ex, ey] = K.tela(mais(CEL, [0, 0.75, 0.1]));
      fx.errado.em({ tela: [ex, ey - 140] }, tc - tS - 0.2);
      // SONS: clique a cada balão · zap (o K.falhar põe) · o congela (o jogo põe)
      for (let k = 0; k < 5; k++) K.som('clique', tM + k * 0.32, 0.4);
      // CÂMERA: alvo o celular, o rosto dele embaixo · chegando · perto · direita · altura do olho (frase 9: girando, perto, do alto)
      K.filmar([celG, menino], 'chegando', B.p, { plano: 'perto', lado: 'direita', altura: 'olho' });
    },

    mensagem(B, tc) {
      // NA TELA: o celular no centro com uma mensagem nova, sendo escrita; do lado, 3 cartõezinhos das empresas; o Rafa · MOSTRA: celular, personagem
      // CENÁRIO: o calçadão de volta à cor; atrás, as lojas (o K.cenario cuida)
      celG.visible = true;
      const tMsg = quando('mensagem', B, 0.15), tCada = quando('cada', B, 0.3), tEnv = quando('envia', B, 0.8), tVoce = K.quando('você', tEnv) ?? (tEnv + 0.3);
      // ENTRA AGORA e OBJETOS SE MEXENDO: a cor volta (o jogo corrige); a mensagem escrita letra por letra; os cartõezinhos surgindo um por um; o botão fica verde em "você"
      desenharCelular('pessoal', K.clamp((tc - tMsg) / 2.4), tc > tVoce);
      fx.cartoes.forEach((p, i) => { p.visible = tc > tCada + i * 0.25; K.entrar(p, 'gira', tc - tCada - i * 0.25, { dur: 0.4, som: false }); });
      // PERSONAGEM: segurando o celular · começo: pensando (lendo) · na palavra "você": aponta pra câmera
      // INTERAÇÃO: o Mappoa escreve a mensagem e o Rafa segura o dedo no botão: quem aperta é ele
      menino.colocar(CEL_LADO, [1.2, 0, 9]);
      if (tc > tVoce) { menino.humor('feliz'); menino.apontar(0.3); } else menino.reagir('pensando', B.t);
      // EFEITOS VISUAIS: etiqueta verde "Uma pra cada empresa" (palavra "cada") · etiqueta azul "Quem envia é você" + ✓ (palavra "envia")
      fx.et.cada.em(mais(CEL, [0.85, 0.95, 0]), tc - tCada);
      fx.et.envia.em(mais(CEL, [-0.9, 0.55, 0.2]), tc - tEnv);
      const [ex, ey] = K.tela(mais(CEL, [-0.9, 0.55, 0.2]));
      fx.certo.em({ tela: [ex, ey - 130] }, tc - tVoce);
      // SONS: clique das letras · brilho dos cartõezinhos · certo no botão
      for (let k = 0; k < 2.4; k += 0.3) K.som('clique', tMsg + k, 0.2);
      [0, 1, 2].forEach((i) => K.som('brilho', tCada + i * 0.25, 0.35));
      K.som('certo', tVoce, 0.6);
      // CÂMERA: alvo [celular, personagem] · subindo · médio · esquerda · altura do olho (frase 10: chegando, perto, direita)
      K.filmar([celG, menino, fx.cartoes[0], fx.cartoes[2]], 'subindo', B.p, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },

    paodequeijo(B, tc) {
      // NA TELA: a padaria no centro; o pão de queijo gigante girando na frente da vitrine; o Rafa na calçada, mostrando o celular · MOSTRA: padaria, paodequeijo
      // CENÁRIO: a vida real é o assunto: a padaria no calçadão, os pedestres e o ônibus atrás (o K.cenario cuida)
      const tP = quando('pão', B, 0.3), tPz = quando('prezado', B, 0.75);
      // ENTRA AGORA: o pão de queijo crescendo (palavra "pão"); a plaquinha "Prezado cliente" caindo (palavra "prezado")
      pc.paodequeijo.visible = tc > tP - 0.3;
      K.entrar(pc.paodequeijo, 'cresce', tc - tP + 0.3, { dur: 0.6 });
      // OBJETOS SE MEXENDO: o pão de queijo gira devagar; a plaquinha cai, quica e é chutada pra longe
      pc.paodequeijo.rotation.y = tc * 1.2;
      const dP = tc - tPz;
      fx.prezado.visible = dP > 0;
      const chute = K.suave(K.clamp((dP - 0.7) / 0.5));
      fx.prezado.position.set(PORTA_PAD[0] + 0.9 + 2.2 * chute, G + 0.03 + Math.max(0, 1.9 * (1 - K.clamp(dP / 0.45))) + 0.5 * Math.sin(Math.PI * chute), PORTA_PAD[2] + 0.2);
      fx.prezado.rotation.set(-Math.PI / 2 * K.clamp(dP / 0.45), 0, 3 * chute);
      // PERSONAGEM: na frente da padaria · começo: mostrando o celular · na palavra "prezado": dúvida, e chuta a plaquinha
      // INTERAÇÃO: ele mostra a mensagem pra padaria e chuta pra longe o "prezado cliente"
      celG.visible = false;
      menino.colocar(PORTA_PAD, [LOJAS_X[0], 1, FRENTE_LOJA]);
      if (dP > 0.6) menino.reagir('empurrando', dP - 0.6); else if (dP > 0) menino.reagir('duvida', dP); else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: etiqueta laranja "Fala do negócio dela" (palavra "pão") · ✗ vermelho na plaquinha (palavra "prezado")
      fx.et.negocio.em(mais(pc.paodequeijo.position.toArray(), [0, 0.75, 0]), tc - tP);
      const [ex, ey] = K.tela(fx.prezado.position.toArray());
      fx.errado.em({ tela: [ex, ey - 90] }, dP - 0.45);
      // SONS: brilho do pão de queijo (o K.entrar põe) · baque da plaquinha · whoosh do chute
      K.som('baque', tPz + 0.45, 0.5);
      K.som('whoosh', tPz + 0.7, 0.5);
      // CÂMERA: alvo [padaria, paodequeijo] · revelando · médio · direita · de baixo (frase 11: subindo, médio, esquerda, olho)
      K.filmar([padariaG, pc.paodequeijo, menino], 'revelando', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
    },

    antes_agora(B, tc) {
      // NA TELA: 1ª metade: o Rafa batendo na porta das lojas; 2ª metade: os prédios com os marcadores verdes brotando · MOSTRA: personagem, pins
      // CENÁRIO: a cidade toda: as lojas, a rua com os carros, os prédios coloridos (o K.cenario cuida)
      const tA = quando('Agora', B, 0.45);
      const antes = tc < tA;
      // ENTRA AGORA e OBJETOS SE MEXENDO: na palavra "Agora", os pins surgem um atrás do outro e ficam pulsando
      pins.visible = !antes;
      pins.children.forEach((pin, i) => { const d = tc - tA - i * 0.11; pin.visible = d > 0; pin.scale.setScalar(pop(d, 0.35) * (1 + 0.06 * Math.sin(tc * 5 + i))); });
      listaG.visible = false;
      // PERSONAGEM: 1ª metade: anda de porta em porta e bate, cansado · na palavra "Agora": vira pra câmera e comemora, apontando
      // INTERAÇÃO: na 1ª metade, ele bate nas portas; na 2ª, ele aponta e os pins aparecem
      const pAntes = K.clamp((tc - B.inicio) / Math.max(0.5, tA - B.inicio));
      const de = [LOJAS_X[1] + 0.7, G, 3.3];
      if (antes) {
        const pos = menino.irPara(PORTA_PAD, de, K.faixa(pAntes, 0.35, 0.8), tc, { olhar: [LOJAS_X[1], 1, FRENTE_LOJA] });
        if (pAntes < 0.35 || pAntes > 0.8) menino.reagir('empurrando', tc - B.inicio); else menino.reagir('cansado', tc - B.inicio);
        void pos;
      } else {
        menino.colocar(de, [LOJAS_X[1] + 3, 0, 9]);
        menino.comemorar(tc - tA);
      }
      // EFEITOS VISUAIS: etiqueta "Antes" na 1ª metade · etiqueta verde "Agora" (palavra "Agora") · os pins
      if (antes) fx.et.antes.em(mais(PORTA_PAD, [-2.6, 2.4, 0]), tc - B.inicio);
      fx.et.agora.em([LOJAS_X[1], 12.5, -16], tc - tA);
      // SONS: madeira da batida, 2 vezes · brilho de cada pin · festa no fim
      [0.12, 0.88].forEach((f) => K.som('madeira', B.inicio + f * (tA - B.inicio), 0.6));
      pins.children.forEach((_, i) => K.som('brilho', tA + i * 0.11, 0.2));
      K.som('festa', tA + 1.6, 0.4);
      // CÂMERA: alvo [personagem, pins] · afastando · perto → aberto · esquerda · do alto (frase 12: revelando, médio, de baixo, direita)
      if (antes) K.filmar([menino, padariaG], 'passando', pAntes, { plano: 'medio', lado: 'esquerda', altura: 'olho' });
      else K.filmar([menino, lojaG[0], lojaG[1]], 'afastando', K.clamp((tc - tA) / (B.ate - tA)), { plano: 'medio', lado: -25, altura: 15 });
    },

    segue(B, tc) {
      // NA TELA: o cartão de seguir no topo; a pergunta em destaque; as lojas no meio; o Rafa embaixo, apontando · MOSTRA: personagem, lojas
      // CENÁRIO: o calçadão com as lojas; atrás, os prédios com os pins verdes (o K.cenario cuida)
      pins.visible = true;
      pins.children.forEach((pin, i) => pin.scale.setScalar(1 + 0.06 * Math.sin(tc * 5 + i)));
      const tQ = quando('Qual', B, 0.02), tU = quando('Use', B, 0.55), tBio = quando('Bio', B, 0.95);
      // ENTRA AGORA: a chamada no topo (palavra "Qual") e o cartão de seguir (palavra "Use")
      if (tc < tU) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tU);
      // PERSONAGEM: começo: chamando ("comenta aí") · na palavra "Bio": aponta pro cartão
      // INTERAÇÃO: ele chama quem assiste pra comentar e aponta pro botão de seguir
      menino.colocar([LOJAS_X[0] + 1.8, G, 4.2], [LOJAS_X[0] + 2, 0, 10]);
      if (tc > tBio - 0.4) { menino.humor('feliz'); menino.apontar(1); } else menino.reagir('chamando', B.t);
      // SONS: ding da chamada · brilho do cartão · clique do botão
      K.som('ding', tQ, 0.5);
      K.som('brilho', tU, 0.5);
      K.som('clique', tU + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: alvo [lojas, personagem] · parado · aberto · frente · topo livre (0.45) (frase 13: afastando, do alto, esquerda)
      K.filmar([menino, [LOJAS_X[0], G + 3.2, FRENTE_LOJA]], 'parado', B.p, { plano: 'aberto', lado: 'frente', espacoCima: 0.45 });
    },

    cartao(B, tc) {
      // A cauda: o cartão fica (já em "Seguindo") e o Rafa acena
      pins.visible = true;
      menino.colocar([LOJAS_X[0] + 1.8, G, 4.2], [LOJAS_X[0] + 2, 0, 10]);
      fx.seguir.em(9);
      menino.reagir('chamando', tc);
      K.som('final', B.inicio, 0.7);
      K.filmar([menino, [LOJAS_X[0], G + 3.2, FRENTE_LOJA]], 'parado', 1, { plano: 'aberto', lado: 'frente', espacoCima: 0.45 });
    },

    capa(B, tc) {
      // A capa: o Rafa desesperado do lado do computador com "0 clientes"; a lista verde saindo da tela, como a solução
      telaZero();
      listaG.visible = true;
      desenharLista(16, true, 1, '300+');
      menino.colocar([1.75, G, 1.95], [1.5, 0, 9]);
      menino.reagir('susto', 0.6);
      K.filmar([comp.g, menino, listaG], 'parado', 0, { plano: 'medio', lado: -18, espacoCima: 0.35 });
    }
  };

  // ---------- Quadro ----------

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    // Tudo volta pro lugar, e o que só aparece em algumas frases começa escondido: o plano mostra o que precisa
    casas.forEach(({ o, p, r, s }) => { o.position.copy(p); o.rotation.copy(r); o.scale.copy(s); });
    menino.g.visible = false;
    const i = ordem.indexOf(B.plano);
    const ja = (n) => i >= ordem.indexOf(n);
    planilhaG.visible = false;
    listaG.visible = i >= 0 && ja('lista');
    celG.visible = false;
    pc.paodequeijo.visible = false;
    pins.visible = false;
    fx.interroga.forEach((q) => { q.visible = false; });
    fx.cartoes.forEach((p) => { p.visible = false; });
    fx.prezado.visible = false;
    fx.balao.visible = false;
    if (i < 0 || !ja('lista')) telaSite(0); else telaMappoa();
    if (i >= 0 && ja('lista')) desenharLista(16, true, 1, '300+');
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
