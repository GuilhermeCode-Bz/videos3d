// Quem vende serviço pra empresa: os sinais de compra (canal Mappoa). Cenário pronto: a cidade de dia (K.cenario('cidade')).
// Feito a partir da ficha de cena do roteiro.md: cada plano tem as linhas do bloco da ficha como comentário e o código
// embaixo. Tudo é função do tempo da cena (tc).
(function () {
  let tl, bl, C, menino, dona, comp, lojaG, lojasG, academiaG, celG, cel, propG, copias, lixeira, lixeira2, agendaG, agenda;
  let clientesG, clientes, balaoG, balao, interroga, interrogaG, lupaG, sinaisG, sinais, relogioG, ponteiros, listaG, lista;
  let analiseG, analise, pins, navG, nav, folhasCinza;
  let ordem = [];
  const fx = {};
  const casas = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pop = (t, d = 0.3) => (t <= 0 ? 0 : t >= d ? 1 : K.quica(t / d));
  const VERDE = '#2e9d5b';
  const G = 0.14;                                  // o chão do calçadão

  // Lugares do vídeo (o calçadão vai de z -3 a 10)
  const LOJAS_X = [-21, -26.2, -31.4];             // academia, pet shop, clínica
  const LOJAS_Z = -0.3;
  const FRENTE_LOJA = 2.2;                         // z da fachada
  const DONA = [-21, G, 3.1];                      // a dona na porta da academia
  const CEL_DONA = [-19.95, G + 1.35, 3.55];       // o celular dela, grande, do lado
  const LIXEIRA = [-19.0, G, 3.3];                 // a lixeira na frente da academia
  const PC = [2.9, G, 0.9];                        // a mesa com o computador
  const TELA = [2.9, G + 1.185, 0.78];             // o meio da tela do computador
  const MESA_LADO = [2.05, G, 1.75];               // o Caio na frente da mesa
  const LIXEIRA2 = [0.3, G, 2.6];                  // a lixeira do lado da mesa (frase 4)
  const LISTA = [2.9, G + 2.95, 0.55];             // o painel da lista, em cima do computador
  const NAV = [2.9, G + 2.15, 1.0];                // a barra de endereço grande (frase 16)
  const BANCO_LADO = [3.7, G, 5.1];                // o Caio do lado do banco
  const AGENDA = [2.45, G + 1.5, 5.45];            // a agenda flutuando do lado dele
  const MEIO = [-11.5, G, 4.6];                    // o Caio no meio do calçadão
  const LUPA_POS = [-19.5, G, 4.5];                // o Caio na frente da academia, com a lupa
  const SINAIS = [-21, G + 5.0, 2.9];              // os 3 cartões em cima da academia
  const ANALISE = [1.55, G + 2.35, 1.7];           // o cartão da análise, saindo da lista
  const OLHA_CAM = (p) => [p[0], 0, p[2] + 9];

  const ACADEMIAS = ['Ponto Fit', 'Academia Atlas', 'Studio Move', 'Corpo em Forma', 'Iron Gym', 'Academia Vida', 'Fit Center',
    'Academia Pulso', 'CrossBox Norte', 'Studio Equilíbrio', 'Academia Força', 'Energia Fit', 'Gym Prime', 'Academia Leste',
    'Studio Ritmo', 'Academia Raiz'];

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
  function icone(c, x, y, r, cor, letra) {
    c.fillStyle = cor; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    texto(c, letra, x, y + 1, r * 1.1, '#fff', 900, 'center');
  }

  function telaGrafico(k) {                          // o trabalho do Caio: o gráfico de anúncio subindo
    const n = Math.max(1, Math.min(6, Math.ceil(k * 6)));
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, 30);
      texto(c, 'Campanhas', 12, 15, 15, '#fff', 900);
      for (let i = 0; i < n; i++) caixaR(c, 24 + i * 50, h - 20 - (30 + i * 24), 34, 30 + i * 24, 5, i === n - 1 ? VERDE : '#8fb3ef');
    }, 'graf' + n);
  }
  function telaProposta(enviando) {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, 30);
      texto(c, 'Nova mensagem', 12, 15, 15, '#fff', 900);
      texto(c, 'Para: 50 empresas', 14, 52, 14, '#555', 700);
      texto(c, 'Faço tráfego pago,', 14, 90, 20, '#111', 900);
      texto(c, 'preço bom.', 14, 118, 20, '#111', 900);
      caixaR(c, w - 110, h - 46, 96, 32, 16, enviando ? '#1fd16b' : '#2f6fd6');
      texto(c, 'Enviar', w - 62, h - 30, 15, '#fff', 900, 'center');
    }, 'prop' + (enviando ? 1 : 0));
  }
  function telaMappoaBusca(letras) {
    const alvo = 'academias em Londrina';
    const s = alvo.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, 'O que você procura?', 18, 62, 14, '#2a3a30', 700);
      caixaR(c, 14, 78, w - 28, 40, 10, '#ffffff');
      c.strokeStyle = VERDE; c.lineWidth = 3; c.strokeRect(15, 79, w - 30, 38);
      texto(c, s + (letras < alvo.length ? '|' : ''), 24, 98, 15, '#111', 700);
      caixaR(c, w / 2 - 60, 136, 120, 36, 18, letras >= alvo.length ? '#1fd16b' : VERDE);
      texto(c, 'Buscar', w / 2, 154, 16, '#fff', 900, 'center');
    }, 'mb' + letras);
  }
  function telaMappoa() {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, '300+', w / 2, 95, 56, VERDE, 900, 'center');
      texto(c, 'academias encontradas', w / 2, 140, 15, '#2a3a30', 700, 'center');
    }, 'mappoa');
  }
  function telaEndereco(letras) {
    const s = 'mappoa.com'.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      caixaR(c, 10, 10, w - 20, 40, 20, '#eef0f3');
      texto(c, '🔒 ' + s, 24, 30, 18, '#111', 800);
      texto(c, s.length >= 10 ? 'Mappoa' : '', w / 2, 120, 40, VERDE, 900, 'center');
    }, 'end' + letras);
  }

  // O celular da dona: k = 0 a 1 do e-mail deslizando pra lixeira; verm = a 1ª linha acesa em vermelho
  function desenharCel(k, verm, apagado) {
    cel.desenhar((c, w, h) => {
      c.fillStyle = '#f3f4f7'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, 56);
      texto(c, 'Caixa de entrada', 16, 30, 20, '#fff', 800);
      if (apagado) {
        texto(c, '🗑', w / 2, h / 2 - 20, 90, '#e8352b', 900, 'center');
        texto(c, 'Apagado', w / 2, h / 2 + 60, 26, '#e8352b', 900, 'center');
        return;
      }
      const dx = -k * w;
      caixaR(c, 16 + dx, 80, w - 32, 290, 16, '#ffffff');
      texto(c, 'Caio · Proposta', 34 + dx, 112, 18, '#555', 800);
      if (verm) caixaR(c, 26 + dx, 140, w - 52, 76, 10, 'rgba(232,53,43,0.18)');
      texto(c, 'Faço tráfego', 34 + dx, 162, 28, verm ? '#c0262a' : '#111', 900);
      texto(c, 'pago, preço bom.', 34 + dx, 196, 26, verm ? '#c0262a' : '#111', 900);
      ['Tenho experiência...', 'Atendo vários...', 'Me chama!'].forEach((l, i) => texto(c, l, 34 + dx, 250 + i * 34, 18, '#888', 600));
      if (k > 0) { c.fillStyle = '#e8352b'; c.fillRect(w + dx, 80, -dx, 290); texto(c, '🗑', w + dx / 2, 225, 50, '#fff', 900, 'center'); }
    }, `cel${Math.floor(k * 20)}-${verm ? 1 : 0}-${apagado ? 1 : 0}`);
  }

  // A agenda: pag = qual página (todas em branco)
  function desenharAgenda(pag) {
    agenda.desenhar((c, w, h) => {
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, h);
      caixaR(c, 14, 14, w / 2 - 20, h - 28, 8, '#ffffff');
      caixaR(c, w / 2 + 6, 14, w / 2 - 20, h - 28, 8, '#ffffff');
      c.fillStyle = '#d0d4da'; c.fillRect(w / 2 - 3, 14, 6, h - 28);
      const dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
      [0, 1].forEach((lado) => {
        const x0 = lado ? w / 2 + 6 : 14;
        texto(c, dias[(pag * 2 + lado) % 6], x0 + 18, 44, 22, '#2f6fd6', 900);
        for (let j = 0; j < 5; j++) { c.fillStyle = '#e6e8ec'; c.fillRect(x0 + 14, 74 + j * 40, w / 2 - 48, 3); }
        texto(c, 'SEM REUNIÃO', x0 + (w / 2 - 20) / 2, h / 2 + 30, 18, '#c0262a', 900, 'center');
      });
    }, 'ag' + pag);
  }

  // O balão de fala: lado 0 = "MEU SERVIÇO", 1 = "O SEU PROBLEMA"
  function desenharBalao(lado) {
    balao.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      caixaR(c, 4, 4, w - 8, h - 30, 30, '#ffffff');
      c.beginPath(); c.moveTo(w / 2 - 22, h - 28); c.lineTo(w / 2, h - 2); c.lineTo(w / 2 + 22, h - 28); c.fill();
      texto(c, lado ? 'O SEU PROBLEMA' : 'MEU SERVIÇO', w / 2, (h - 26) / 2 + 2, lado ? 50 : 56, lado ? '#ff7a1a' : '#2f6fd6', 900, 'center');
    }, 'bal' + lado);
  }

  // Os cartões de sinal (i = 0 Instagram, 1 site, 2 anúncios)
  function desenharSinal(t, i) {
    const dados = [['📷', 'Instagram', 'Último post:', 'março'], ['🌐', 'Site', 'Não abre no', 'celular'], ['📣', 'Anúncios', '0 anúncios', 'no ar']][i];
    t.desenhar((c, w, h) => {
      caixaR(c, 0, 0, w, h, 26, '#ffffff');
      c.fillStyle = '#e8352b'; c.fillRect(0, 0, w, 14);
      icone(c, w / 2, 86, 54, '#e8352b', '!');
      texto(c, dados[1], w / 2, 172, 34, '#1b1b1b', 900, 'center');
      texto(c, dados[2], w / 2, 222, 26, '#555', 700, 'center');
      texto(c, dados[3], w / 2, 256, 30, '#c0262a', 900, 'center');
    }, 'sinal' + i);
  }

  // A lista do Mappoa: n cartões, icones = 0/1, cont = o número do topo
  function desenharLista(n, icones, cont) {
    lista.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 70);
      texto(c, 'Mappoa', 20, 26, 30, '#fff', 900);
      texto(c, 'academias em Londrina', 20, 54, 16, '#dff5e7', 700);
      texto(c, cont, w - 20, 36, 24, '#fff', 900, 'right');
      const alt = 58, top = 82;
      const cabe = Math.floor((h - top) / alt);
      const ini = Math.max(0, n - cabe);
      for (let j = ini; j < n; j++) {
        const y = top + (j - ini) * alt;
        caixaR(c, 12, y, w - 24, alt - 8, 10, j === 0 ? '#e3f7ea' : '#ffffff');
        texto(c, ACADEMIAS[j % ACADEMIAS.length], 24, y + 17, 17, '#1d2a22', 800);
        if (icones) {
          const temSite = j % 3 !== 1;
          caixaR(c, 24, y + 30, 70, 16, 8, temSite ? '#dfe5e1' : '#f9d7d5');
          texto(c, temSite ? 'site' : 'sem site', 59, y + 38, 11, temSite ? '#4b5a50' : '#c0262a', 900, 'center');
          icone(c, w - 78, y + 25, 12, '#d6249f', '◎');
          icone(c, w - 44, y + 25, 12, '#25d366', '✆');
        }
      }
    }, `li${n}-${icones}-${cont}`);
  }

  // A análise de uma academia: blocos = quantos dos 3 já apareceram
  function desenharAnalise(blocos) {
    const B3 = [['Dores', 'Instagram parado desde março'], ['Oportunidades', 'Anúncio local pro bairro'], ['Comece por', 'O post de março']];
    analise.desenhar((c, w, h) => {
      caixaR(c, 0, 0, w, h, 24, '#ffffff');
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 70);
      texto(c, 'Análise · Ponto Fit', 22, 36, 28, '#fff', 900);
      for (let i = 0; i < blocos; i++) {
        const y = 96 + i * 130;
        caixaR(c, 18, y, w - 36, 112, 14, i === 2 ? '#e3f7ea' : '#f4f6f5');
        icone(c, 44, y + 34, 12, VERDE, '');
        texto(c, B3[i][0], 66, y + 34, 26, VERDE, 900);
        texto(c, B3[i][1], 30, y + 80, 21, '#1b1b1b', 700);
      }
    }, 'an' + blocos);
  }

  // A barra de endereço grande, com mappoa.com
  function desenharNav(letras, ir) {
    const s = 'mappoa.com'.slice(0, letras);
    nav.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      caixaR(c, 0, 0, w, h, h / 2, '#ffffff');
      c.strokeStyle = '#1b1b1b'; c.lineWidth = 6;
      c.beginPath(); c.roundRect ? c.roundRect(3, 3, w - 6, h - 6, h / 2 - 3) : c.rect(3, 3, w - 6, h - 6); c.stroke();
      texto(c, '🔒', 34, h / 2 + 2, 44, VERDE, 900);
      texto(c, s + (letras < 10 ? '|' : ''), 100, h / 2 + 2, 68, '#111', 900);
      caixaR(c, w - 130, 18, 108, h - 36, (h - 36) / 2, ir ? '#1fd16b' : '#9aa59e');
      texto(c, 'Ir', w - 76, h / 2 + 2, 40, '#fff', 900, 'center');
    }, 'nav' + letras + (ir ? 'i' : ''));
  }

  // Um painel com moldura (telaCanvas + fundo), num grupo
  function painel(larg, alt, px, cor, pos) {
    const g = new THREE.Group();
    g.position.set(...pos);
    K.scene.add(g);
    const t = K.telaCanvas(larg, alt, px);
    if (cor != null) {
      const f = K.malha(new THREE.BoxGeometry(larg + 0.1, alt + 0.1, 0.05), K.mat(cor));
      f.position.z = -0.035;
      g.add(f);
    }
    t.m.material.transparent = true;
    g.add(t.m);
    return { g, t };
  }


  // Sombra sem os riscos (pedido do canal): a sombra lisa (PCF) no lugar da macia (VSM), que risca chão, casas e bonecos
  function sombraLisa() {
    if (K.renderer.shadowMap.type === THREE.PCFSoftShadowMap && K.sol.shadow.normalBias === 0.05) return;
    K.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    K.sol.shadow.bias = -0.0005;
    K.sol.shadow.normalBias = 0.05;
    if (K.sol.shadow.map) { K.sol.shadow.map.dispose(); K.sol.shadow.map = null; }
    K.scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.needsUpdate = true; }); });
  }

  // ---------- Montagem (uma vez só) ----------

  function montar(timeline) {
    tl = timeline;
    bl = K.blocos(tl);
    ordem = bl.map((b) => b.plano);
    C = K.cenario('cidade');

    // As lojas: academia (caprichada), pet shop e clínica, cada uma com toldo e placa
    lojasG = new THREE.Group();
    K.scene.add(lojasG);
    const nomes = [['PONTO FIT', '#ff7a1a', '#ffffff', 0xff7a1a], ['Pet Amigo', '#d9f0ff', '#1f5d8f', 0x2f7fe0], ['Clínica Sorriso', '#ffffff', '#1f8f7a', 0x1f8f7a]];
    const modelos = ['building-small-a', 'building-small-d', 'building-small-c'];
    lojaG = [];
    LOJAS_X.forEach((x, i) => {
      const g = new THREE.Group();
      g.position.set(x, G, LOJAS_Z);
      lojasG.add(g);
      K.modelo('kenney-cidade/' + modelos[i], { escala: 5, pos: [0, 0, 0], pai: g });
      const toldo = K.malha(new THREE.BoxGeometry(3.6, 0.12, 1.0), K.mat(nomes[i][3]));
      toldo.position.set(0, 2.55, 3.0);
      toldo.rotation.x = 0.25;
      g.add(toldo);
      const placa = K.placa(nomes[i][0], { larg: 2.8, alt: 0.7, fundo: nomes[i][1], cor: nomes[i][2], borda: nomes[i][2] });
      K.scene.remove(placa);
      placa.position.set(0, 3.15, 2.62);
      g.add(placa);
      if (i === 0) {
        // a vitrine da academia: 2 halteres e luzinhas na placa
        [-1.1, 1.1].forEach((dx) => {
          const h = new THREE.Group();
          h.position.set(dx, 0.75, 2.75);
          const barra = K.malha(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 10), K.mat(0x9aa3ad, { metalness: 0.6 }));
          barra.rotation.z = Math.PI / 2;
          h.add(barra);
          [-0.32, 0.32].forEach((bx) => { const p = K.malha(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 18), K.mat(0x2b2f36)); p.rotation.z = Math.PI / 2; p.position.x = bx; h.add(p); });
          g.add(h);
        });
        fx.placaAcad = placa;
      }
      lojaG.push(g);
    });
    academiaG = lojaG[0];
    K.lugar(lojasG); K.nomear('lojas', lojasG);
    K.lugar(academiaG); K.nomear('academia', academiaG);

    // As lixeiras (a da academia e a do lado da mesa)
    const fazLixeira = (pos) => {
      const g = new THREE.Group();
      g.position.set(...pos);
      K.scene.add(g);
      const corpo = K.malha(new THREE.CylinderGeometry(0.36, 0.3, 0.9, 20), K.mat(0x2f5f3a));
      corpo.position.y = 0.45;
      const tampa = K.malha(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 20), K.mat(0x244a2d));
      tampa.position.y = 0.94;
      g.add(corpo, tampa);
      K.lugar(g);
      return g;
    };
    lixeira = fazLixeira(LIXEIRA); K.nomear('lixeira', lixeira);
    lixeira2 = fazLixeira(LIXEIRA2); guardar(lixeira2);

    // A dona da academia
    dona = K.boneco({ tipo: 'menina' });
    K.nomear('dona', dona.g);

    // O celular dela, grande pra dar pra ler
    celG = new THREE.Group();
    celG.position.set(...CEL_DONA);
    celG.rotation.y = -0.3;
    K.scene.add(celG);
    const corpo = K.malha(new THREE.BoxGeometry(0.62, 1.16, 0.05), K.mat(0x1d1f24, { roughness: 0.4 }));
    cel = K.telaCanvas(0.56, 1.08, 360);
    cel.m.position.z = 0.027;
    celG.add(corpo, cel.m);
    K.lugar(celG); K.nomear('celular', celG); guardar(celG);

    // O computador do Caio, com a mesa
    comp = K.computador();
    comp.g.position.set(...PC);
    K.lugar(comp.g); K.nomear('computador', comp.g);

    // A folha da proposta e as cópias voando
    propG = new THREE.Group();
    propG.position.set(...mais(TELA, [0, 0.95, 0.2]));
    K.scene.add(propG);
    const folha = K.placa('Faço tráfego\npago,\npreço bom.', { larg: 0.8, alt: 1.05, fundo: '#ffffff', cor: '#1b1b1b', borda: '#2f6fd6' });
    K.scene.remove(folha);
    propG.add(folha);
    K.lugar(propG); K.nomear('proposta', propG); guardar(propG);
    copias = [];
    for (let i = 0; i < 8; i++) {
      const p = K.placa('Faço tráfego\npago', { larg: 0.42, alt: 0.55, fundo: '#ffffff', cor: '#1b1b1b', borda: '#2f6fd6' });
      p.material.side = THREE.DoubleSide;
      copias.push(p);
    }
    // As folhas cinza do "Antes" (frase 15)
    folhasCinza = [];
    for (let i = 0; i < 7; i++) {
      const p = K.placa('Meu\nserviço', { larg: 0.42, alt: 0.55, fundo: '#d9d9d9', cor: '#777', borda: '#999' });
      p.material.side = THREE.DoubleSide;
      folhasCinza.push(p);
    }

    // A agenda do Caio
    ({ g: agendaG, t: agenda } = painel(1.4, 1.0, 420, 0x24519e, AGENDA));
    agendaG.rotation.y = -0.35;
    K.lugar(agendaG); K.nomear('agenda', agendaG); guardar(agendaG);

    // Os 3 clientes entrando pela porta
    clientesG = new THREE.Group();
    K.scene.add(clientesG);
    clientes = [
      K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0xf5c518, bermuda: 0x3a3f4a, cabelo: 0x2b1a10 } }),
      K.boneco({ tipo: 'menina' }),
      K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x8a4fd8, bermuda: 0x2f3a5e, cabelo: 0x111111, pele: 0x9a6a48 } })
    ];
    clientes.forEach((b) => K.semNome(b.g));
    // um ponto fixo do grupo, na porta, pra revisão achar "clientes_porta"
    const marca = K.malha(new THREE.BoxGeometry(2.2, 1.5, 0.1), new THREE.MeshBasicMaterial({ visible: false }), false);
    marca.position.set(-19.6, G + 0.75, 3.4);
    clientesG.add(marca);
    K.lugar(clientesG); K.nomear('clientes_porta', clientesG);

    // O balão de fala que vira
    ({ g: balaoG, t: balao } = painel(1.7, 0.75, 600, null, mais(MEIO, [0, 2.3, 0])));
    balao.m.material.side = THREE.DoubleSide;
    K.lugar(balaoG); K.nomear('balao_servico', balaoG); guardar(balaoG);

    // Os "?" em cima de cada loja
    interrogaG = new THREE.Group();
    K.scene.add(interrogaG);
    interroga = LOJAS_X.map((x) => {
      const q = K.placa('?', { larg: 1.0, alt: 1.0, fundo: '#ff9f1c', cor: '#ffffff', borda: '#ff9f1c' });
      K.scene.remove(q);
      q.position.set(x, G + 5.9, FRENTE_LOJA);
      interrogaG.add(q);
      return q;
    });
    K.lugar(interrogaG); K.nomear('interrogacoes', interrogaG);

    // A lupa
    lupaG = new THREE.Group();
    K.scene.add(lupaG);
    const aro = K.malha(new THREE.TorusGeometry(0.22, 0.04, 10, 28), K.mat(0x2b2f36, { metalness: 0.5 }));
    const vidro = K.malha(new THREE.CircleGeometry(0.21, 28), new THREE.MeshStandardMaterial({ color: 0xbfe3ff, transparent: true, opacity: 0.45 }), false);
    const cabo = K.malha(new THREE.CylinderGeometry(0.035, 0.045, 0.36, 10), K.mat(0x7a4a22));
    cabo.position.y = -0.4;
    lupaG.add(aro, vidro, cabo);

    // Os 3 cartões de sinal em cima da academia
    sinaisG = new THREE.Group();
    sinaisG.position.set(...SINAIS);
    K.scene.add(sinaisG);
    sinais = [-1.2, 0, 1.2].map((dx, i) => {
      const g = new THREE.Group();
      g.position.set(dx, 0, 0);
      g.rotation.z = -dx * 0.08;
      const t = K.telaCanvas(0.95, 1.15, 300);
      t.m.material.transparent = true;
      desenharSinal(t, i);
      g.add(t.m);
      sinaisG.add(g);
      return g;
    });
    K.lugar(sinaisG); K.nomear('sinais', sinaisG); guardar(sinaisG);
    sinais.forEach(guardar);

    // O relógio gigante
    relogioG = new THREE.Group();
    K.scene.add(relogioG);
    const most = K.malha(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32), K.mat(0xffffff));
    most.rotation.x = Math.PI / 2;
    const aroR = K.malha(new THREE.TorusGeometry(0.7, 0.07, 10, 32), K.mat(0x1b1b1b));
    relogioG.add(most, aroR);
    ponteiros = [0.5, 0.34].map((len, i) => {
      const p = new THREE.Group();
      const m = K.malha(new THREE.BoxGeometry(0.06, len, 0.03), K.mat(i ? 0xe8352b : 0x1b1b1b));
      m.position.y = len / 2;
      p.add(m);
      p.position.z = 0.07;
      relogioG.add(p);
      return p;
    });
    K.lugar(relogioG); K.nomear('relogio', relogioG);

    // O painel da lista do Mappoa
    ({ g: listaG, t: lista } = painel(2.2, 2.8, 440, 0x2e9d5b, LISTA));
    K.lugar(listaG); K.nomear('lista', listaG); guardar(listaG);

    // O cartão da análise
    ({ g: analiseG, t: analise } = painel(1.6, 1.9, 520, 0x2e9d5b, ANALISE));
    analiseG.rotation.y = 0.25;
    K.lugar(analiseG); K.nomear('analise', analiseG); guardar(analiseG);

    // A barra de endereço grande
    ({ g: navG, t: nav } = painel(2.2, 0.46, 700, null, NAV));
    K.lugar(navG); K.nomear('navegador', navG); guardar(navG);

    // Os marcadores verdes nos prédios do outro lado da rua e na academia
    pins = new THREE.Group();
    K.scene.add(pins);
    const pontosPins = [[-33, G + 11.4, -19.2], [-27, G + 7.3, -19.2], [-15, G + 11.8, -19.2], [-21, G + 6.3, LOJAS_Z], [-9, G + 7.6, -19.2]];
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

    // O Caio: o personagem do canal (canal/identidade.md)
    menino = K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });

    // Efeitos
    fx.bits = K.bits(K.caminho([mais(TELA, [0, 0.2, 0.05]), mais(TELA, [-3, 1.2, 0.6]), [-8, G + 2.2, 2.5]]), 22, 21, { cor: 0x2e9d5b, soLuz: true });
    fx.bitsLista = K.bits(K.caminho([mais(TELA, [0, 0.2, 0.05]), mais(LISTA, [0, -1.0, 0.1]), mais(LISTA, [0, 0.6, 0.1])]), 22, 22, { cor: 0x2e9d5b, soLuz: true });
    fx.ondas = K.ondas(0x2e9d5b, 4, 0.5);
    fx.festa = K.festa(mais(DONA, [1.2, 1.4, 0.6]));
    fx.comenta = K.placa('💬', { larg: 0.6, alt: 0.6, fundo: '#ffffff', cor: '#2e9d5b', borda: '#2e9d5b' });

    // Textos (cada um uma vez)
    fx.certo = K.marca('certo');
    fx.errado = K.marca('errado');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Vende qual serviço, e pra quem? <em>Comenta aí</em>');
    fx.rot = { sinais: K.rotulo('Sinais de compra') };
    fx.cont = { meses: K.contador(), cinquenta: K.contador(), cinco: K.contador(), lista: K.contador() };
    const e = (t, cor) => K.etiqueta(t, cor);
    fx.et = {
      caio: e('Caio · gestor de tráfego', 'azul'), bom: e('Bom no que faz', 'verde'), trafego: e('Tráfego', 'vermelho'),
      porta: e('Cliente na porta', 'verde'), dor: e('Fale da dor dela', 'laranja'), ninguem: e('Ninguém te conta', 'vermelho'),
      linda: e('Fachada linda', 'verde'), parado: e('Instagram parado', 'vermelho'), fecha: e('Quem fecha é você', 'verde'),
      antes: e('Antes: pra qualquer um', 'vermelho'), agora: e('Agora: a dor certa', 'verde')
    };
  }

  // ---------- Planos: um por frase do roteiro.json ----------

  const P = {
    gancho(B, tc) {
      // NA TELA: a dona no centro, na porta da Ponto Fit; o celular grande do lado dela; a lixeira à direita · MOSTRA: dona, celular
      // CENÁRIO: a fachada laranja da academia atrás dela; a rua com um carro passando (o K.cenario cuida)
      // ENTRA AGORA: o celular surgindo do lado dela no começo; a folha caindo na lixeira na palavra "apaga"
      const tPr = quando('primeira', B, 0.45), tTr = quando('tráfego', B, 0.65), tAp = quando('apaga', B, 0.88);
      celG.visible = true;
      K.entrar(celG, 'surge', B.t, { dur: 0.35, som: false });
      // OBJETOS SE MEXENDO: a linha "Faço tráfego" acende em vermelho (palavra "tráfego"); o e-mail desliza pro lado (palavra "apaga")
      const kAp = K.clamp((tc - tAp) / 0.35);
      desenharCel(kAp, tc > tTr, kAp >= 1);
      const dF = tc - tAp;
      propG.visible = dF > 0 && dF < 0.9;
      if (propG.visible) {
        const k = K.clamp(dF / 0.6);
        propG.position.set(K.lerp(CEL_DONA[0], LIXEIRA[0], k), K.lerp(CEL_DONA[1], LIXEIRA[1] + 0.9, k) + 0.6 * Math.sin(Math.PI * k), K.lerp(CEL_DONA[2], LIXEIRA[2], k));
        propG.rotation.z = k * 4;
        propG.scale.setScalar(0.6 * (1 - 0.6 * k));
      }
      // PERSONAGEM: a dona na porta, de frente pra câmera · começo: segurando (lendo) · "tráfego": bravo · "apaga": arrasta o dedo
      // INTERAÇÃO: ela apaga a proposta com o dedo e a folha cai na lixeira
      dona.g.visible = true;
      dona.colocar(DONA, CEL_DONA);
      if (tc > tAp) { dona.reagir('bravo', tc - tTr); dona.apontar(0.5); } else if (tc > tTr) dona.reagir('bravo', tc - tTr); else dona.reagir('segurando', B.t);
      // SONS: bip do e-mail · whoosh do deslize · tampa da lixeira · o congela (o jogo põe)
      K.som('bip', B.inicio + 0.1, 0.5);
      K.som('whoosh', tAp, 0.6);
      K.som('tampa', tAp + 0.6, 0.6);
      // CÂMERA: alvo [dona, celular] · revelando · médio · lado 20 · olho · topo livre (0.35)
      K.filmar([dona.g, celG], 'revelando', B.p, { plano: 'medio', lado: 20, altura: 'olho', espacoCima: 0.35 });
      // EFEITOS VISUAIS: ✗ vermelho em cima do celular (palavra "apaga")
      const [ex, ey] = K.tela(mais(CEL_DONA, [0, 0.75, 0]));
      fx.errado.em({ tela: [ex, ey - 60] }, tc - tAp - 0.2);
    },

    caio(B, tc) {
      // NA TELA: o Caio no centro, do lado da mesa; na tela, o gráfico subindo; a etiqueta do lado · MOSTRA: personagem, computador
      // CENÁRIO: a outra ponta do calçadão; atrás, a rua com o ônibus (o K.cenario cuida)
      const tC = quando('Caio', B, 0.1), tT = quando('tráfego', B, 0.45), tE = quando('empresa', B, 0.85);
      // OBJETOS SE MEXENDO: o gráfico sobe barra por barra (a partir de "tráfego"); os bits correm pras lojas (palavra "empresa")
      telaGrafico(K.clamp((tc - tT) / 1.2));
      if (tc > tE) fx.bits.em(tc - tE, 0.8);
      // PERSONAGEM: do lado da mesa, de frente pra câmera · começo: mostrando a tela · na palavra "empresa": aponta pras lojas
      // INTERAÇÃO: ele mostra o gráfico e aponta pras empresas lá longe
      menino.colocar([1.85, G, 1.9], tc > tE ? [-10, 1, 4] : [1.5, 0, 9]);
      if (tc > tE) { menino.humor('feliz'); menino.apontar(0.6); } else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Caio · gestor de tráfego" (palavra "Caio")
      fx.et.caio.em([0.6, G + 1.3, 1.9], tc - tC);
      // SONS: ding (o kit põe) · zumbido dos bits
      K.som('zumbido', tE, 0.3);
      // CÂMERA: alvo [personagem, computador] · chegando · perto · frente · olho (frase 1: revelando, médio, lado 20)
      K.filmar([menino, comp.g], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho' });
    },

    agenda(B, tc) {
      // NA TELA: o Caio do lado do banco; a agenda aberta grande do lado dele, páginas em branco virando; "2 meses" · MOSTRA: agenda, personagem
      // CENÁRIO: o banco da calçada; atrás, a rua e um carro passando (o K.cenario cuida)
      const tB = quando('bom', B, 0.1), tA = quando('agenda', B, 0.5), tV = quando('vazia', B, 0.65), tM = quando('meses', B, 0.9);
      // ENTRA AGORA: a agenda crescendo (palavra "agenda"); o contador "2 meses" (palavra "meses")
      agendaG.visible = tc > tA - 0.05;
      K.entrar(agendaG, 'cresce', tc - tA, { dur: 0.45 });
      // OBJETOS SE MEXENDO: as páginas viram, todas em branco (de "vazia" até o fim)
      const pag = tc > tV ? 1 + Math.floor((tc - tV) / 0.35) : 0;
      desenharAgenda(pag);
      if (tc > tV) agendaG.rotation.y = -0.35 + 0.15 * Math.sin((tc - tV) * 9);
      fx.cont.meses.em('2', mais(AGENDA, [0, 0.95, 0]), tc - tM, 'MESES');
      // PERSONAGEM: do lado do banco, de frente pra câmera · começo: vitória curtinha · "vazia": triste
      // INTERAÇÃO: ele abre a agenda e ela só tem página em branco
      menino.colocar(BANCO_LADO, tc > tV ? AGENDA : OLHA_CAM(BANCO_LADO));
      if (tc > tV) menino.reagir('triste', tc - tV); else menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: etiqueta verde "Bom no que faz" (palavra "bom") · P&B (o jogo)
      if (tc < tV) fx.et.bom.em(mais(BANCO_LADO, [0.9, 2.0, 0]), tc - tB);
      // SONS: certo (etiqueta) · madeira das páginas · errado no contador
      K.som('certo', tB, 0.4);
      for (let k = 0; k < 5; k++) K.som('madeira', tV + k * 0.35, 0.25);
      K.som('errado', tM, 0.5);
      // CÂMERA: alvo [agenda, personagem] · subindo · médio · esquerda · baixo (frase 2: chegando, perto, frente)
      K.filmar([agendaG, menino], 'subindo', B.p, { plano: 'medio', lado: 'esquerda', altura: 'baixo' });
    },

    cinquenta(B, tc) {
      // NA TELA: a folha da proposta saindo do computador e virando cópias, que voam e caem na lixeira; o Caio na mesa · MOSTRA: proposta, computador, personagem
      // CENÁRIO: o calçadão de lado (o K.cenario cuida)
      const tP = quando('proposta', B, 0.3), tC = quando('cinquenta', B, 0.45);
      // ENTRA AGORA: a proposta subindo da tela (palavra "proposta"); as cópias se multiplicando (palavra "cinquenta")
      propG.visible = tc > tP - 0.05;
      K.entrar(propG, 'sobe', tc - tP, { dur: 0.45 });
      telaProposta(tc > tC);
      // OBJETOS SE MEXENDO: as 8 cópias voam do computador em arco até a lixeira do lado da mesa
      const de = mais(TELA, [0, 0.95, 0.2]), ate = mais(LIXEIRA2, [0, 1.0, 0]);
      copias.forEach((p, i) => {
        const d = tc - tC - i * 0.28;
        const k = K.clamp(d / 0.9);
        p.visible = d > 0 && k < 1;
        p.position.set(K.lerp(de[0], ate[0], k), K.lerp(de[1], ate[1], k) + 1.4 * Math.sin(Math.PI * k), K.lerp(de[2], ate[2], k) + 0.4 * Math.sin(Math.PI * k));
        p.rotation.set(0, k * 2, k * 5 + i);
        if (d > 0) K.som('whoosh', tC + i * 0.28, 0.2);
        if (d > 0.9) K.som('tampa', tC + i * 0.28 + 0.9, 0.25);
      });
      if (tc > tC) K.falhar(lixeira2, 'treme', tc - tC - 0.9, { dur: 2.5, forca: 0.3, som: false });
      // PERSONAGEM: na mesa, digitando · "cinquenta": aperta o botão e fica olhando, surpreso no fim
      // INTERAÇÃO: ele dispara as propostas e vê todas caírem na lixeira
      menino.colocar(MESA_LADO, tc > tC + 0.4 ? LIXEIRA2 : TELA);
      if (tc > tC + 1.6) menino.reagir('surpreso', tc - tC - 1.6); else if (tc > tC) menino.reagir('empurrando', tc - tC); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: contador azul de 1 a 50 (palavra "cinquenta")
      const n = Math.max(1, Math.min(50, Math.ceil((tc - tC) / 0.04)));
      fx.cont.cinquenta.em(String(n), mais(PC, [-1.4, 2.6, 0.4]), tc - tC, 'PROPOSTAS');
      // SONS: clique do botão
      K.som('clique', tC, 0.7);
      // CÂMERA: alvo [computador, proposta, personagem] · passando · médio · perfil_direita · alto (frase 3: subindo, médio, esquerda, baixo)
      K.filmar([comp.g, propG, menino, lixeira2], 'passando', B.p, { plano: 'medio', lado: 'perfil_direita', altura: 'alto' });
    },

    porta(B, tc) {
      // NA TELA: a porta da academia no centro; 3 clientes entrando um atrás do outro; a dona recebendo · MOSTRA: academia, clientes_porta
      // CENÁRIO: o calçadão na frente da academia (o K.cenario cuida)
      const tT = quando('tráfego', B, 0.25), tCl = quando('cliente', B, 0.6), tP = quando('porta', B, 0.92);
      // ENTRA AGORA e OBJETOS SE MEXENDO: os clientes andam até a porta e somem lá dentro (a partir de "cliente")
      const porta = [-21, G, 2.4];
      clientes.forEach((b, i) => {
        const d = tc - tCl + 0.6 - i * 0.45;
        const k = K.clamp(d / 1.4);
        b.g.visible = d > 0 && k < 1;
        if (b.g.visible) { b.irPara([-16.2 - i * 0.2, G, 5.8 + i * 0.5], porta, k, tc, { olhar: [-21, 1, 0] }); if (k > 0.9) b.g.scale.setScalar(1 - (k - 0.9) * 8); else b.g.scale.setScalar(1); }
        if (d > 1.4) K.som('ding', tCl - 0.6 + i * 0.45 + 1.4, 0.35);
      });
      // PERSONAGEM: o Caio na beira do calçadão, olhando a porta · começo: dúvida · "porta": ideia
      // INTERAÇÃO: a dona recebe os clientes (acenando); o Caio entende vendo eles entrarem
      dona.g.visible = true;
      dona.colocar([-19.9, G, 3.0], [-17, 0, 7]);
      dona.reagir('chamando', B.t);
      menino.colocar([-16.6, G, 5.6], [-20, 1, 2.6]);
      if (tc > tP) menino.reagir('ideia', tc - tP); else menino.reagir('duvida', B.t);
      // SONS: passos
      [0.6, 0.8, 1.0, 1.2].forEach((f) => K.som('passo', tCl - 0.6 + f, 0.3));
      // CÂMERA: alvo [academia, clientes_porta] · chegando · aberto · frente · olho (frase 4: passando, médio, perfil, alto)
      K.filmar([[-21, G + 2.2, 2.6], [-16.4, G + 0.8, 5.6]], 'subindo', B.p, { plano: 'medio', lado: 15, altura: 'olho', tam: 1.6 });
      // EFEITOS VISUAIS: etiqueta vermelha "Tráfego" + ✗ (palavra "tráfego") · etiqueta verde "Cliente na porta" + ✓ (palavra "porta")
      const pE1 = [-23.2, G + 3.9, 3.2], pE2 = [-18.6, G + 3.9, 3.2];
      if (tc < tP - 0.5) fx.et.trafego.em(pE1, tc - tT);
      fx.et.porta.em(pE2, tc - tP + 0.5);
      const [ax, ay] = K.tela(pE1), [bx, by] = K.tela(pE2);
      if (tc < tP - 0.5) fx.errado.em({ tela: [ax, ay - 170] }, tc - tT - 0.2);
      fx.certo.em({ tela: [bx, by - 170] }, tc - tP + 0.3);
    },

    assunto(B, tc) {
      // NA TELA: o Caio no centro do calçadão; o balão em cima dele, que gira e vira "O SEU PROBLEMA" · MOSTRA: balao_servico, personagem
      // CENÁRIO: atrás, os prédios do outro lado da rua; o ônibus passando (o K.cenario cuida)
      const tA = quando('assunto', B, 0.2), tP = quando('problema', B, 0.8), tD = quando('dela', B, 0.95);
      // ENTRA AGORA: o balão surgindo (palavra "assunto")
      balaoG.visible = tc > tA - 0.05;
      K.entrar(balaoG, 'surge', tc - tA, { dur: 0.35 });
      // OBJETOS SE MEXENDO: o balão dá meia-volta no ar e troca o texto (palavra "problema")
      const k = K.suave(K.clamp((tc - tP + 0.25) / 0.5));
      if (k < 0.5) { balaoG.rotation.y = Math.PI * k; desenharBalao(0); } else { balaoG.rotation.y = Math.PI * (k - 1); desenharBalao(1); }
      // PERSONAGEM: no meio do calçadão, de frente pra câmera · começo: mostrando (o próprio peito) · "problema": chamando
      // INTERAÇÃO: ele vira o balão com a mão
      menino.colocar(MEIO, OLHA_CAM(MEIO));
      if (tc > tP - 0.25) menino.reagir('chamando', tc - tP + 0.25); else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: etiqueta laranja "Fale da dor dela" (palavra "dela")
      fx.et.dor.em(mais(MEIO, [1.1, 1.2, 0.3]), tc - tD + 0.3);
      // SONS: whoosh do balão girando · brilho
      K.som('whoosh', tP - 0.25, 0.5);
      // CÂMERA: alvo [balao_servico, personagem] · girando · perto · frente→direita · olho (frase 5: chegando, aberto, frente)
      K.filmar([balaoG, menino], 'girando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho', angulo: 35 });
    },

    qual(B, tc) {
      // NA TELA: as 3 lojas lado a lado, cada uma com um "?" gigante em cima; o Caio na frente delas · MOSTRA: lojas, interrogacoes
      // CENÁRIO: o calçadão; atrás das lojas, os prédios altos (o K.cenario cuida)
      const tC = quando('Cada', B, 0.35), tN = quando('ninguém', B, 0.75);
      // ENTRA AGORA: os "?" caindo em cima das lojas, um por loja (palavra "cada")
      interrogaG.visible = true;
      interroga.forEach((q, i) => { const d = tc - tC - i * 0.2; q.visible = d > 0; q.scale.setScalar(pop(d)); q.position.y = G + 5.9 + 0.1 * Math.sin(tc * 4 + i) + Math.max(0, 3 * (1 - d / 0.3)); });
      // OBJETOS SE MEXENDO: os "?" balançam; as lojas dão um tranco na palavra "ninguém" (portas fechando)
      if (tc > tN) lojaG.forEach((g, i) => K.falhar(g, 'treme', tc - tN - i * 0.08, { dur: 0.3, forca: 0.15, som: false }));
      // PERSONAGEM: na frente da academia · começo: pensando · "ninguém": vira pra câmera, dúvida
      // INTERAÇÃO: ele olha de um "?" pro outro, e as portas fecham na cara dele
      const pos = [-24.5, G, 5.4];
      if (tc > tN) { menino.colocar(pos, OLHA_CAM(pos)); menino.reagir('duvida', tc - tN); }
      else { menino.colocar(pos, [LOJAS_X[Math.min(2, Math.max(0, Math.floor((tc - tC) / 0.4)))], 5, FRENTE_LOJA]); menino.reagir('pensando', B.t); }
      // EFEITOS VISUAIS: etiqueta vermelha "Ninguém te conta" (palavra "ninguém") · P&B (o jogo)
      fx.et.ninguem.em(mais(pos, [0, 2.2, 0]), tc - tN);
      // SONS: bip pra cada "?" · madeira das portas
      [0, 1, 2].forEach((i) => K.som('bip', tC + i * 0.2, 0.5));
      [0, 1, 2].forEach((i) => K.som('madeira', tN + i * 0.08, 0.4));
      // CÂMERA: alvo [lojas, interrogacoes] · afastando · aberto · esquerda · alto (frase 6: girando, perto, frente)
      K.filmar([[-26.2, G + 3.6, 2.2], pos], 'afastando', B.p, { plano: 'perto', lado: -25, altura: 15, tam: 1.6 });
    },

    lupa(B, tc) {
      // NA TELA: a fachada da academia no centro; o Caio na frente, com a lupa; em cima, os 3 cartões aparecendo · MOSTRA: sinais, academia, personagem
      // CENÁRIO: a academia de frente, com os halteres na vitrine (o K.cenario cuida do resto)
      const tI = quando('Instagram', B, 0.4), tS = quando('site', B, 0.62), tA = quando('anúncio', B, 0.85);
      const ts = [tI, tS, tA];
      // ENTRA AGORA: cada cartão desliza de dentro da fachada pra cima, na sua palavra
      sinaisG.visible = true;
      sinais.forEach((s, i) => { s.visible = tc > ts[i] - 0.05; K.entrar(s, 'desliza', tc - ts[i], { dur: 0.45, de: [0, -2.2, -0.4], som: 'zap' }); });
      // PERSONAGEM: na frente da academia · começo: segurando a lupa · em "site": aponta · no fim: surpreso
      // INTERAÇÃO: a lupa dele "puxa" cada sinal de dentro da fachada
      menino.colocar(LUPA_POS, [-21, 3, FRENTE_LOJA]);
      if (tc > tA + 0.5) menino.reagir('surpreso', tc - tA - 0.5);
      else if (tc > tS) menino.apontar(0.9);
      else menino.reagir('segurando', B.t);
      lupaG.visible = true;
      const m = menino.mao(1);
      lupaG.position.set(m[0], m[1] + 0.35, m[2] + 0.05);
      lupaG.rotation.set(0, 0.6, 0.2);
      // CÂMERA: alvo [sinais, academia, personagem] · subindo · médio · perfil_esquerda · olho (frase 7: afastando, aberto, esquerda, alto)
      K.filmar([SINAIS, LUPA_POS], 'chegando', B.p, { plano: 'perto', lado: -30, altura: 'olho', tam: 1.6 });
    },

    sinais_rotulo(B, tc) {
      // NA TELA: os 3 cartões grandes brilhando; o rótulo "SINAIS DE COMPRA" · MOSTRA: sinais
      // CENÁRIO: o topo da fachada laranja atrás; o céu azul
      sinaisG.visible = true;
      // OBJETOS SE MEXENDO: os cartões balançam devagar e brilham
      sinais.forEach((s, i) => { s.rotation.y = 0.15 * Math.sin(tc * 2 + i); });
      K.brilhar(sinaisG, B.t);
      // PERSONAGEM: embaixo, erguendo a lupa
      // INTERAÇÃO: ele ergue a lupa e os cartões brilham
      menino.colocar(LUPA_POS, [-21, 3, FRENTE_LOJA]);
      menino.reagir('erguendo', B.t);
      lupaG.visible = true;
      const m = menino.mao(1);
      lupaG.position.set(m[0], m[1] + 0.35, m[2]);
      // EFEITOS VISUAIS: rótulo amarelo "Sinais de compra" embaixo dos cartões
      fx.rot.sinais.em(mais(SINAIS, [0, 0.95, 0.2]), B.t - 0.05);
      // SONS: brilho (o rótulo põe)
      // CÂMERA: alvo sinais · girando · perto · frente · baixo (frase 8: subindo, médio, perfil)
      K.filmar(SINAIS, 'girando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', angulo: 25, tam: 3.6, espacoCima: 0.15 });
    },

    fachada(B, tc) {
      // NA TELA: a academia inteira no centro; a dona na porta; o cartão do Instagram voltando pro lado dela; o Caio chegando · MOSTRA: academia, dona, sinais
      // CENÁRIO: o bairro: o calçadão, o pet shop e a clínica, a rua com o ônibus, os prédios (o K.cenario cuida)
      const tL = quando('linda', B, 0.25), tI = quando('Instagram', B, 0.35), tP = quando('parado', B, 0.42), tC = quando('cara', B, 0.92);
      // ENTRA AGORA: a placa da academia brilha (palavra "linda"); o cartão do Instagram vem pro lado da dona (palavra "Instagram")
      K.brilhar(fx.placaAcad, tc - tL, 1.0);
      sinaisG.visible = tc > tI - 0.05;
      sinais[1].visible = false; sinais[2].visible = false;
      const kI = K.suave(K.clamp((tc - tI) / 0.5));
      sinaisG.position.set(K.lerp(SINAIS[0], -18.9, kI), K.lerp(SINAIS[1], G + 2.0, kI), K.lerp(SINAIS[2], 3.6, kI));
      sinaisG.scale.setScalar(K.lerp(1, 0.8, kI));
      // PERSONAGEM: o Caio anda da direita até perto da dona · "cara": aponta pro cartão, com ideia; a dona coça a cabeça
      // INTERAÇÃO: ele aponta o cartão do Instagram parado do lado da fachada linda
      dona.g.visible = true;
      dona.colocar(DONA, OLHA_CAM(DONA));
      if (tc > tC) dona.reagir('duvida', tc - tC); else dona.reagir('mostrando', B.t);
      menino.irPara([-14.5, G, 5.6], [-17.3, G, 5.1], K.faixa(B.p, 0, 0.5), tc, { olhar: [-19, 2, 3.6] });
      if (tc > tC) { menino.humor('feliz'); menino.apontar(0.7); } else if (B.p > 0.5) menino.reagir('ideia', tc - (B.inicio + 0.5 * B.dur));
      // SONS: brilho na placa · ding na palavra "cara"
      K.som('brilho', tL, 0.5);
      K.som('ding', tC, 0.6);
      // CÂMERA: alvo [academia, dona, sinais] · revelando · aberto · direita · olho (frase 9: girando, perto, baixo)
      K.filmar([[-21, G + 2.4, 2.6], [-17.7, G + 0.8, 4.4]], 'revelando', B.p, { plano: 'medio', lado: 'direita', altura: 'olho', tam: 1.6 });
      // EFEITOS VISUAIS: etiqueta verde "Fachada linda" (palavra "linda") · etiqueta vermelha "Instagram parado" (palavra "parado")
      fx.et.linda.em([-22.6, G + 4.3, 3.0], tc - tL);
      fx.et.parado.em([-18.9, G + 3.0, 3.6], tc - tP);
    },

    tarde(B, tc) {
      // NA TELA: o Caio andando de loja em loja com a lupa; o relógio gigante em cima dele girando; o céu ficando laranja · MOSTRA: relogio, personagem
      // CENÁRIO: as 3 lojas atrás dele; o céu virando tarde
      K.ceu('dia', 'tarde', K.suave(K.clamp(B.p * 1.4)));
      const tF = quando('fuçar', B, 0.08), tCi = quando('cinco', B, 0.88);
      // PERSONAGEM: anda da academia até a clínica · "cinco": cansado, suando
      // INTERAÇÃO: ele passa a lupa em cada loja e o relógio corre em cima da cabeça dele
      const pos = menino.irPara([-20, G, 4.6], [-30.4, G, 4.6], K.faixa(B.p, 0.05, 0.8), tc, { olhar: OLHA_CAM([-30.4, G, 4.6]) });
      if (tc > tCi) { menino.reagir('cansado', tc - tCi); menino.suar(tc - tCi); } else if (B.p > 0.8) menino.reagir('cansado', B.t);
      const p = pos || [-25, G, 4.6];
      lupaG.visible = true;
      const m = menino.mao(1);
      lupaG.position.set(m[0], m[1] + 0.3, m[2]);
      // ENTRA AGORA: o relógio caindo em cima dele (palavra "fuçar")
      relogioG.visible = true;
      relogioG.position.set(p[0], G + 3.0 + Math.max(0, 4 * (1 - K.clamp((tc - tF) / 0.5))), p[2]);
      // OBJETOS SE MEXENDO: os ponteiros dão voltas rápidas
      ponteiros[0].rotation.z = -tc * 2;
      ponteiros[1].rotation.z = -tc * 24;
      // EFEITOS VISUAIS: contador vermelho "5 empresas" (palavra "cinco") · P&B (o jogo)
      fx.cont.cinco.em('5', mais(p, [1.3, 2.4, 0]), tc - tCi, 'EMPRESAS');
      // SONS: range do relógio · passos · errado no contador
      K.som('range', tF + 0.3, 0.4);
      for (let k = 0.1; k < 0.8; k += 0.1) K.som('passo', B.inicio + k * B.dur, 0.25);
      K.som('errado', tCi, 0.5);
      // CÂMERA: alvo [relogio, personagem] · passando · médio · perfil_direita · alto (frase 10: revelando, aberto, direita)
      K.filmar(mais(p, [0, 2.0, 0]), 'passando', B.p, { plano: 'medio', lado: 20, altura: 'alto', tam: 2.4 });
    },

    lista(B, tc) {
      // NA TELA: o computador na mesa; a busca sendo digitada; a lista do Mappoa subindo e enchendo; o Caio digitando · MOSTRA: lista, computador
      // CENÁRIO: de volta à mesa, de dia de novo (o K.cenario cuida)
      const tB = quando('busca', B, 0.25), tM = quando('Mappoa', B, 0.15), tC = quando('centenas', B, 0.6), tS = quando('site', B, 0.8);
      // OBJETOS SE MEXENDO: a busca digitada letra por letra (de "busca" em diante)
      const letras = Math.max(0, Math.min(21, Math.floor((tc - tB) / 0.06)));
      if (tc < tC) telaMappoaBusca(letras); else telaMappoa();
      // ENTRA AGORA: a lista subindo da tela (palavra "Mappoa"); os cartões entrando a partir de "centenas"
      listaG.visible = tc > tM - 0.05;
      K.entrar(listaG, 'sobe', tc - tM, { dur: 0.6 });
      const n = Math.max(0, Math.min(16, Math.floor(Math.pow(Math.max(0, tc - tC) / 2.0, 0.8) * 16)));
      const cont = Math.min(300, Math.floor(K.clamp((tc - tC) / 2.2) * 300));
      desenharLista(n, tc > tS - 0.2 ? 1 : 0, cont >= 300 ? '300+' : String(cont));
      fx.bitsLista.em(tc, 0.6);
      // PERSONAGEM: na mesa · começo: digitando · "centenas": surpreso
      // INTERAÇÃO: ele digita a busca e a lista enche na frente dele
      menino.colocar(MESA_LADO, tc > tC ? LISTA : TELA);
      if (tc > tC) menino.reagir('surpreso', tc - tC); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: contador verde "300+" (palavra "centenas")
      fx.cont.lista.em(cont >= 300 ? '300+' : String(cont), mais(LISTA, [-1.75, 0.9, 0.2]), tc - tC, 'ACADEMIAS');
      // SONS: clique das teclas · bip a cada cartão · certo nos ícones
      for (let k = 0; k < 21; k += 3) K.som('clique', tB + k * 0.06, 0.25);
      for (let k = 1; k <= 16; k += 2) K.som('bip', tC + 2.0 * Math.pow(k / 16, 1.25), 0.18);
      K.som('certo', tS, 0.5);
      // CÂMERA: alvo [lista, computador] · subindo · médio · frente · olho (frase 11: passando, médio, perfil, alto)
      K.filmar([listaG, comp.g], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },

    analise(B, tc) {
      // NA TELA: o cartão da análise grande, saindo da lista; os 3 blocos aparecendo; o Caio à esquerda, lendo · MOSTRA: analise, personagem
      // CENÁRIO: a lista atrás do cartão; a rua atrás (o K.cenario cuida)
      const tA = quando('análise', B, 0.1), tD = quando('dores', B, 0.4), tO = quando('oportunidades', B, 0.6), tCv = quando('conversa', B, 0.92);
      listaG.visible = true;
      desenharLista(16, 1, '300+');
      telaMappoa();
      // ENTRA AGORA: o cartão desliza pra frente da lista (palavra "análise"); cada bloco na sua palavra
      analiseG.visible = tc > tA - 0.05;
      K.entrar(analiseG, 'desliza', tc - tA, { dur: 0.5, de: [1.3, 0.6, -1.1] });
      const blocos = (tc > tD) + (tc > tO) + (tc > tCv);
      desenharAnalise(blocos);
      // PERSONAGEM: à esquerda do cartão · começo: pensando (lendo) · "conversa": ideia
      // INTERAÇÃO: ele lê o cartão e marca o "Comece por"
      const pos = [0.4, G, 2.6];
      menino.colocar(pos, ANALISE);
      if (tc > tCv) menino.reagir('ideia', tc - tCv); else menino.reagir('pensando', B.t);
      // SONS: bip por bloco · certo no ✓
      [tD, tO, tCv].forEach((t) => K.som('bip', t, 0.45));
      K.som('certo', tCv + 0.2, 0.5);
      // CÂMERA: alvo analise · chegando · perto · esquerda · olho (frase 12: subindo, médio, frente)
      K.filmar([analiseG, menino], 'chegando', B.p, { plano: 'perto', lado: 'esquerda', altura: 'olho' });
      // EFEITOS VISUAIS: ✓ verde do lado do "Comece por" (palavra "conversa")
      const [cx, cy] = K.tela(mais(ANALISE, [0.95, -0.55, 0.1]));
      fx.certo.em({ tela: [cx, cy] }, tc - tCv - 0.2);
    },

    chama(B, tc) {
      // NA TELA: o Caio à direita com o celular; ondas atravessando até a dona, na porta da academia · MOSTRA: personagem, dona
      // CENÁRIO: o calçadão de ponta a ponta (o K.cenario cuida)
      const tC = quando('chama', B, 0.1), tF = quando('fecha', B, 0.75);
      const pos = [-15.8, G, 4.8];
      // ENTRA AGORA e OBJETOS SE MEXENDO: as ondas saem do celular dele e atravessam até a dona (palavra "chama")
      if (tc > tC) fx.ondas.em([pos[0] - 0.4, G + 1.3, pos[2]], Math.PI + 0.25, tc - tC, 4.8, 1.1);
      // PERSONAGEM: de perfil pra dona · começo: chamando · "fecha": vitória
      // INTERAÇÃO: a mensagem chega no celular dela, que sorri e acena de volta
      menino.colocar(pos, DONA);
      if (tc > tF) menino.reagir('vitoria', tc - tF); else menino.reagir('chamando', B.t);
      dona.g.visible = true;
      dona.colocar(DONA, pos);
      if (tc > tC + 1.2) dona.reagir('chamando', tc - tC - 1.2); else dona.reagir('segurando', B.t);
      // SONS: ondas · ding no celular dela
      K.som('ondas', tC, 0.5);
      K.som('ding', tC + 1.2, 0.6);
      // CÂMERA: alvo [personagem, dona] · passando · aberto · por trás do Caio (160) · olho (frase 13: chegando, perto, esquerda)
      K.filmar([mais(pos, [0, 0.8, 0]), mais(DONA, [0, 0.8, 0])], 'passando', B.p, { plano: 'perto', lado: 35, altura: 'olho', tam: 1.6 });
      // EFEITOS VISUAIS: etiqueta verde "Quem fecha é você" (palavra "fecha")
      fx.et.fecha.em(mais(pos, [0, 2.3, 0]), tc - tF);
    },

    antes_agora(B, tc) {
      // NA TELA: 1ª metade: o Caio jogando folhas cinza pra todo lado; 2ª: pins verdes nos prédios e ele indo até a dona · MOSTRA: personagem, dona
      // CENÁRIO: a rua inteira vista de cima (o K.cenario cuida)
      const tA = quando('Agora', B, 0.5);
      const antes = tc < tA;
      const pos = [-14.5, G, 4.8];
      // ENTRA AGORA e OBJETOS SE MEXENDO: as folhas cinza voam e caem (Antes); os pins caem quicando (Agora)
      folhasCinza.forEach((f, i) => {
        const d = tc - B.inicio - 0.2 - i * 0.22;
        const k = K.clamp(d / 1.0);
        f.visible = antes && d > 0;
        const ang = -1.2 + i * 0.45;
        f.position.set(pos[0] + Math.sin(ang) * 3 * k, G + 1.2 + 1.5 * Math.sin(Math.PI * k) - 1.1 * k, pos[2] + Math.cos(ang) * 1.5 * k);
        f.rotation.set(k * 3, k * 4, i);
        if (d > 0) K.som('whoosh', B.inicio + 0.2 + i * 0.22, 0.15);
      });
      pins.visible = !antes;
      pins.children.forEach((pin, i) => { const d = tc - tA - i * 0.15; pin.visible = d > 0; pin.scale.setScalar(pop(d, 0.35)); K.som('baque', tA + i * 0.15 + 0.2, 0.2); });
      // PERSONAGEM: 1ª metade: empurrando (jogando as folhas), cansado · "Agora": anda até a dona e comemora
      // INTERAÇÃO: antes ele joga papel pra todo lado; agora vai direto na dona e ela acena
      dona.g.visible = true;
      dona.colocar(DONA, [-18, 0, 4.4]);
      if (antes) { menino.colocar(pos, OLHA_CAM(pos)); menino.reagir('empurrando', B.t); menino.humor('triste'); }
      else {
        const k = K.clamp((tc - tA) / 1.4);
        menino.irPara(pos, [-19.6, G, 3.9], k, tc, { olhar: DONA });
        if (k >= 1) { menino.comemorar(tc - tA - 1.4); dona.reagir('chamando', tc - tA - 1.4); fx.festa.em(tc - tA - 1.4); }
      }
      // SONS: festa no encontro
      K.som('festa', tA + 1.4, 0.4);
      // CÂMERA: alvo [personagem, dona] · mergulho · aberto · direita · alto (frase 14: passando, aberto, por trás)
      K.filmar([[-14.5, G + 0.8, 4.8], [-21, G + 0.8, 3.1]], 'mergulho', B.p, { plano: 'perto', lado: 'direita', altura: 'alto', tam: 1.6 });
      // EFEITOS VISUAIS: etiqueta "Antes: pra qualquer um" · etiqueta verde "Agora: a dor certa"
      if (antes) fx.et.antes.em(mais(pos, [0, 2.4, 0]), tc - B.inicio);
      else fx.et.agora.em([-18.3, G + 3.6, 4.0], tc - tA);
    },

    segue(B, tc) {
      // NA TELA: o Caio perguntando pra câmera, depois digitando mappoa.com; a barra grande; o cartão de seguir · MOSTRA: navegador, computador, personagem
      // CENÁRIO: a mesa no calçadão, de dia (o K.cenario cuida)
      const tQ = quando('você', B, 0.02), tCo = quando('Comenta', B, 0.35), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
      // ENTRA AGORA: a chamada no topo, depois o cartão de seguir (palavra "computador"); o balão de comentário (palavra "Comenta")
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      const dc = tc - tCo;
      fx.comenta.visible = dc > 0 && dc < 0.9;
      fx.comenta.position.set(MESA_LADO[0] - 0.6, G + 1.9 + dc * 0.6, MESA_LADO[2] + 0.3);
      fx.comenta.scale.setScalar(pop(dc));
      // ENTRA AGORA: a barra de endereço (palavra "computador"); mappoa.com letra por letra (palavra "digita")
      navG.visible = tc > tPc - 0.05;
      K.entrar(navG, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      desenharNav(letras, tc > tTe);
      telaEndereco(letras);
      // PERSONAGEM: começo: chamando, de frente pra câmera · "computador": digita · "testa": aponta pra barra
      // INTERAÇÃO: ele digita mappoa.com no computador
      if (tc < tPc) { menino.colocar(MESA_LADO, OLHA_CAM(MESA_LADO)); menino.reagir('chamando', B.t); }
      else { menino.colocar(MESA_LADO, tc > tTe ? NAV : TELA); if (tc > tTe) { menino.apontar(0.9); menino.humor('feliz'); } else menino.reagir('segurando', tc - tPc); }
      // SONS: estalo do balão · clique de cada letra · ding no "Ir" · clique do seguir
      K.som('estalo', tCo + 0.7, 0.4);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6);
      K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: alvo [navegador, computador, personagem] · chegando · aberto · frente · olho · topo livre (frase 15: mergulho, aberto, alto)
      K.filmar([navG, comp.g, menino], 'chegando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },

    cartao(B, tc) {
      // A cauda: o cartão fica (já em "Seguindo"), o Caio aponta e acena; mappoa.com continua legível
      navG.visible = true;
      desenharNav(10, true);
      telaEndereco(10);
      menino.colocar(MESA_LADO, OLHA_CAM(MESA_LADO));
      fx.seguir.em(9);
      menino.acenar(tc);
      menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp.g, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },

    capa(B, tc) {
      // A capa: a dona apagando a proposta, brava; o Caio do lado, em desespero
      celG.visible = true;
      desenharCel(0.45, true, false);
      dona.g.visible = true;
      dona.colocar(DONA, CEL_DONA);
      dona.reagir('bravo', 0.6);
      menino.colocar([-17.9, G, 4.4], CEL_DONA);
      menino.reagir('susto', 0.6);
      K.filmar([dona.g, celG, menino], 'parado', 0, { plano: 'medio', lado: 15, espacoCima: 0.35 });
    }
  };

  // ---------- Quadro ----------

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    // Tudo volta pro lugar, e o que só aparece em algumas frases começa escondido: o plano mostra o que precisa
    sombraLisa();
    casas.forEach(({ o, p, r, s }) => { o.position.copy(p); o.rotation.copy(r); o.scale.copy(s); });
    menino.g.visible = false;
    dona.g.visible = false;
    clientes.forEach((b) => { b.g.visible = false; b.g.scale.setScalar(1); });
    celG.visible = false;
    propG.visible = false;
    copias.forEach((p) => { p.visible = false; });
    folhasCinza.forEach((p) => { p.visible = false; });
    agendaG.visible = false;
    balaoG.visible = false;
    interrogaG.visible = false;
    lupaG.visible = false;
    sinaisG.visible = false;
    sinais.forEach((s) => { s.visible = true; });
    relogioG.visible = false;
    listaG.visible = false;
    analiseG.visible = false;
    navG.visible = false;
    lixeira2.visible = B.plano === 'cinquenta';
    pins.visible = false;
    fx.comenta.visible = false;
    const i = ordem.indexOf(B.plano);
    if (i >= 0 && i >= ordem.indexOf('lista')) { telaMappoa(); desenharLista(16, 1, '300+'); } else telaGrafico(1);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
