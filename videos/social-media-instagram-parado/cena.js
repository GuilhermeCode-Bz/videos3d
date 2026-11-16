// Social media atrás de lojas com o Instagram parado (canal Mappoa). Cenário pronto: a cidade de dia (K.cenario('cidade')).
// Feito a partir da ficha de cena do roteiro.md: cada plano tem as linhas do bloco da ficha como comentário e o código
// embaixo. Tudo é função do tempo da cena (tc).
(function () {
  let tl, bl, C, menino, dona, comp, lojaG, lojasG, boutiqueG, perfilG, perfil, agendaG, agenda, celG, cel, calG, cal;
  let coracaoG, lupaG, perfisG, perfisC, relogioG, ponteiros, listaG, lista, envelope, balaoG, caixasG, caixas, pins, navG, nav;
  let interrogaG, interroga, cabides;
  let ordem = [];
  const fx = {};
  const casas = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pop = (t, d = 0.3) => (t <= 0 ? 0 : t >= d ? 1 : K.quica(t / d));
  const COR = '#2fb5a6';                          // a cor do canal
  const COR_N = 0x2fb5a6;
  const INSTA = '#d6249f';
  const G = 0.14;                                  // o chão do calçadão

  // Lugares do vídeo (o calçadão vai de z -3 a 10)
  const LOJAS_X = [-21, -26.2, -31.4];             // Boutique Flor, Pet Amigo, Doce Mel
  const LOJAS_Z = -0.3;
  const FRENTE_LOJA = 2.2;                         // z da fachada
  const DONA = [-21, G, 3.1];                      // a dona na porta da boutique
  const PERFIL = [-18.9, G + 1.95, 3.7];           // o celular gigante com o perfil parado
  const PERFIL_LISTA = [1.05, G + 2.6, 1.5];       // o perfil aberto do lado da lista (frase 11)
  const PC = [2.9, G, 0.9];                        // a mesa com o computador
  const TELA = [2.9, G + 1.185, 0.78];             // o meio da tela do computador
  const MESA_LADO = [2.05, G, 1.75];               // o Léo na frente da mesa
  const LISTA = [2.9, G + 2.95, 0.55];             // o painel da lista, em cima do computador
  const NAV = [2.9, G + 2.15, 1.0];                // a barra de endereço grande (frase 16)
  const LEO = [0.2, G, 3.2];                       // o Léo no calçadão (frase 2 e 3)
  const BANCO_LADO = [3.7, G, 5.1];                // o Léo do lado do banco
  const AGENDA = [-1.0, G + 1.35, 3.5];            // a agenda flutuando do lado dele
  const CAL = [2.45, G + 1.55, 5.5];               // o calendário do lado do banco
  const MEIO = [-11.5, G, 4.8];                    // o Léo no meio do calçadão
  const LUPA_POS = [-19.4, G, 4.8];                // o Léo na frente da boutique, com a lupa
  const LUPA_ALTO = [-19.4, G + 2.7, 4.8];         // a lupa grande no ar (frase 6)
  const OLHA_CAM = (p) => [p[0], 0, p[2] + 9];

  const LOJAS = ['Boutique Flor', 'Moda Bella', 'Loja Estilo', 'Vila Chic', 'Ateliê Rosa', 'Jeans & Cia', 'Look Certo',
    'Bazar da Ana', 'Moda Leste', 'Closet 62', 'Loja Aurora', 'Trend Goiás', 'Moda Viva', 'Casa da Moda', 'Lu Store', 'Bem Vestir'];
  const PARADAS = [0, 3, 6];                       // as lojas da lista com o perfil parado

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

  // O perfil da boutique: pisca = a data acesa; ouro = 0 a 1 (vira dourado)
  function desenharPerfil(pisca, ouro) {
    perfil.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      icone(c, 60, 70, 38, INSTA, '◎');
      texto(c, 'boutiqueflor', 112, 56, 26, '#1b1b1b', 900);
      texto(c, 'Moda feminina', 112, 88, 20, '#777', 700);
      for (let j = 0; j < 6; j++) {
        const x = 14 + (j % 3) * ((w - 28) / 3), y = 130 + Math.floor(j / 3) * 128;
        caixaR(c, x + 4, y, (w - 28) / 3 - 8, 120, 8, '#c9cdd2');
      }
      caixaR(c, 14, 400, w - 28, 120, 16, pisca ? 'rgba(232,53,43,0.22)' : '#f6f6f6');
      texto(c, 'Último post:', w / 2, 432, 28, '#555', 800, 'center');
      texto(c, '2023', w / 2, 486, 62, '#e8352b', 900, 'center');
      // a teia de aranha no canto
      c.strokeStyle = 'rgba(90,90,90,0.7)'; c.lineWidth = 2;
      for (let k = 0; k < 6; k++) { const a = (k / 5) * Math.PI / 2; c.beginPath(); c.moveTo(w, 0); c.lineTo(w - 120 * Math.cos(a), 120 * Math.sin(a)); c.stroke(); }
      [40, 75, 110].forEach((r) => { c.beginPath(); c.arc(w, 0, r, Math.PI / 2, Math.PI); c.stroke(); });
      if (ouro > 0) {
        c.fillStyle = `rgba(245,190,30,${0.75 * ouro})`; c.fillRect(0, 0, w, h);
        if (ouro > 0.5) { texto(c, '★', w / 2, 260, 150, '#fff7c2', 900, 'center'); texto(c, 'OPORTUNIDADE', w / 2, 400, 40, '#7a4a00', 900, 'center'); }
      }
    }, `perf${pisca ? 1 : 0}-${Math.round(ouro * 10)}`);
  }

  // A agenda do Léo: pag = qual página (todas em branco)
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
        texto(c, 'VAZIO', x0 + (w / 2 - 20) / 2, h / 2 + 30, 24, '#c0262a', 900, 'center');
      });
    }, 'ag' + pag);
  }

  // O celular do Léo: o post dele e as curtidas
  function desenharCel(postado, curtidas) {
    cel.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      icone(c, 40, 40, 24, COR, 'L');
      texto(c, 'leo.social', 74, 40, 20, '#1b1b1b', 900);
      if (postado) {
        caixaR(c, 16, 78, w - 32, 230, 14, COR);
        texto(c, 'Faço', w / 2, 150, 44, '#fff', 900, 'center');
        texto(c, 'social', w / 2, 200, 44, '#fff', 900, 'center');
        texto(c, 'media!', w / 2, 250, 44, '#fff', 900, 'center');
        texto(c, '♥ ' + curtidas, 24, 340, 30, curtidas ? '#e8352b' : '#999', 900);
        texto(c, curtidas ? 'curtida' : 'curtidas', 110, 341, 22, '#777', 700);
      } else {
        caixaR(c, 16, 78, w - 32, 230, 14, '#eef0f3');
        texto(c, '+ Novo post', w / 2, 193, 30, '#999', 800, 'center');
      }
    }, `cel${postado ? 1 : 0}-${curtidas}`);
  }

  // O calendário: dia de 1 a 30
  function desenharCal(dia) {
    cal.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#e8352b'; c.fillRect(0, 0, w, 70);
      texto(c, 'NOVEMBRO', w / 2, 36, 30, '#fff', 900, 'center');
      texto(c, String(dia), w / 2, h / 2 + 34, 150, '#1b1b1b', 900, 'center');
    }, 'cal' + dia);
  }

  function telaSite(k) {                           // a busca acendendo, com a lupa girando
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf9'; c.fillRect(0, 0, w, h);
      caixaR(c, 14, 30, w - 28, 40, 20, '#ffffff');
      c.strokeStyle = COR; c.lineWidth = 3; c.strokeRect(15, 31, w - 30, 38);
      texto(c, 'Buscar empresas...', 30, 50, 15, '#999', 700);
      const a = k * Math.PI * 2;
      texto(c, '🔍', w / 2 + 30 * Math.cos(a), 140 + 18 * Math.sin(a), 54, '#111', 900, 'center');
    }, 'site' + Math.floor(k * 12) % 12);
  }
  function telaPerfis(k) {                         // o celular de perfis, rolando (na mão)
    comp.tela.desenhar((c, w, h) => { c.fillStyle = '#1d2026'; c.fillRect(0, 0, w, h); texto(c, '...', w / 2, h / 2, 40, '#888', 900, 'center'); }, 'apagada');
    void k;
  }
  function telaMappoaBusca(letras) {
    const alvo = 'lojas de roupa em Goiânia';
    const s = alvo.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf9'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, 'O que você procura?', 18, 62, 14, '#2a3a38', 700);
      caixaR(c, 14, 78, w - 28, 40, 10, '#ffffff');
      c.strokeStyle = COR; c.lineWidth = 3; c.strokeRect(15, 79, w - 30, 38);
      texto(c, s + (letras < alvo.length ? '|' : ''), 22, 98, 13, '#111', 700);
      caixaR(c, w / 2 - 60, 136, 120, 36, 18, letras >= alvo.length ? '#1fd16b' : COR);
      texto(c, 'Buscar', w / 2, 154, 16, '#fff', 900, 'center');
    }, 'mb' + letras);
  }
  function telaMappoa() {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf9'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, '200+', w / 2, 95, 56, COR, 900, 'center');
      texto(c, 'lojas encontradas', w / 2, 140, 15, '#2a3a38', 700, 'center');
    }, 'mappoa');
  }
  function telaEndereco(letras) {
    const s = 'mappoa.com'.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      caixaR(c, 10, 10, w - 20, 40, 20, '#eef0f3');
      texto(c, '🔒 ' + s, 24, 30, 18, '#111', 800);
      texto(c, s.length >= 10 ? 'Mappoa' : '', w / 2, 120, 40, COR, 900, 'center');
    }, 'end' + letras);
  }

  // A lista do Mappoa: n cartões, icones = 0/1, cont = o número do topo; sep = 0 a 1 (as paradas sobem pro topo com a etiqueta)
  function desenharLista(n, icones, cont, sep = 0) {
    lista.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf9'; c.fillRect(0, 0, w, h);
      c.fillStyle = COR; c.fillRect(0, 0, w, 70);
      texto(c, 'Mappoa', 20, 26, 30, '#fff', 900);
      texto(c, 'lojas de roupa em Goiânia', 20, 54, 15, '#e3faf7', 700);
      texto(c, cont, w - 20, 36, 24, '#fff', 900, 'right');
      const alt = 58, top = 82;
      const cabe = Math.floor((h - top) / alt);
      const ini = sep > 0 ? 0 : Math.max(0, n - cabe);
      const outras = [];
      for (let j = 0; j < Math.min(n, 16); j++) if (!PARADAS.includes(j)) outras.push(j);
      for (let j = ini; j < n; j++) {
        // a linha j vai da posição original até a nova (as paradas primeiro)
        const ip = PARADAS.indexOf(j);
        const novo = ip >= 0 ? ip : PARADAS.length + outras.indexOf(j);
        const pos = (j - ini) + (novo - (j - ini)) * K.suave(sep);
        if (pos >= cabe) continue;
        const y = top + pos * alt;
        const parada = ip >= 0 && sep > 0;
        caixaR(c, 12, y, w - 24, alt - 8, 10, parada ? '#fff1dc' : '#ffffff');
        texto(c, LOJAS[j % LOJAS.length], 24, y + 17, 17, '#1d2a28', 800);
        if (icones) {
          icone(c, 32, y + 38, 8, INSTA, '');
          texto(c, '@' + LOJAS[j % LOJAS.length].toLowerCase().replace(/[^a-z0-9]/g, ''), 46, y + 38, 11, '#6b7a78', 700);
          icone(c, w - 44, y + 25, 13, INSTA, '◎');
        }
        if (parada) { caixaR(c, w - 150, y + 12, 86, 26, 13, '#ff9f1c'); texto(c, 'PARADO', w - 107, y + 25, 13, '#fff', 900, 'center'); }
      }
    }, `li${n}-${icones}-${cont}-${Math.round(sep * 20)}`);
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

  // Um ponto em arco entre a e b (k de 0 a 1)
  function arco(a, b, k, alt) {
    return [K.lerp(a[0], b[0], k), K.lerp(a[1], b[1], k) + alt * Math.sin(Math.PI * k), K.lerp(a[2], b[2], k)];
  }

  // ---------- Montagem (uma vez só) ----------

  function montar(timeline) {
    tl = timeline;
    bl = K.blocos(tl);
    ordem = bl.map((b) => b.plano);
    C = K.cenario('cidade');

    // As lojas: Boutique Flor (caprichada), Pet Amigo e Doce Mel, cada uma com toldo e placa
    lojasG = new THREE.Group();
    K.scene.add(lojasG);
    const nomes = [['Boutique Flor', '#ffe3ec', '#9b1d4a', 0xe0457b], ['Pet Amigo', '#d9f0ff', '#1f5d8f', 0x2f7fe0], ['Doce Mel', '#fff3c9', '#8a5a00', 0xf2b134]];
    const modelos = ['building-small-a', 'building-small-d', 'building-small-c'];
    lojaG = [];
    cabides = [];
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
        // a vitrine da boutique: 3 vestidinhos nos cabides
        [-1.15, -0.75, 1.0].forEach((dx, k) => {
          const v = new THREE.Group();
          v.position.set(dx, 1.25, 2.72);
          const corpo = K.malha(new THREE.ConeGeometry(0.2, 0.62, 16), K.mat([0xe0457b, 0xf2b134, 0x2fb5a6][k]));
          const gancho = K.malha(new THREE.TorusGeometry(0.06, 0.012, 6, 12, Math.PI), K.mat(0x777777));
          gancho.position.y = 0.38;
          v.add(corpo, gancho);
          g.add(v);
          cabides.push(v);
        });
        fx.placaBoutique = placa;
      }
      lojaG.push(g);
    });
    cabides.forEach(guardar);
    boutiqueG = lojaG[0];
    K.lugar(lojasG); K.nomear('lojas', lojasG);
    K.lugar(boutiqueG); K.nomear('boutique', boutiqueG);

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

    // A dona da boutique
    dona = K.boneco({ tipo: 'menina' });
    K.nomear('dona', dona.g);

    // O perfil gigante da boutique (um celular grande flutuando)
    perfilG = new THREE.Group();
    perfilG.position.set(...PERFIL);
    perfilG.rotation.y = -0.25;
    K.scene.add(perfilG);
    const corpoP = K.malha(new THREE.BoxGeometry(1.0, 1.82, 0.07), K.mat(0x1d1f24, { roughness: 0.4 }));
    perfil = K.telaCanvas(0.9, 1.7, 540);
    perfil.m.position.z = 0.04;
    perfilG.add(corpoP, perfil.m);
    K.lugar(perfilG); K.nomear('perfil', perfilG); guardar(perfilG);
    fx.poeira = K.poeira(3, 0xb9b2a4, 26);

    // O computador do Léo, com a mesa
    comp = K.computador();
    comp.g.position.set(...PC);
    K.lugar(comp.g); K.nomear('computador', comp.g);

    // A agenda do Léo
    ({ g: agendaG, t: agenda } = painel(1.4, 1.0, 420, 0x24519e, AGENDA));
    agendaG.rotation.y = 0.3;
    K.lugar(agendaG); K.nomear('agenda', agendaG); guardar(agendaG);

    // O celular do Léo (grande pra dar pra ler; vai na mão dele)
    celG = new THREE.Group();
    K.scene.add(celG);
    const corpoC = K.malha(new THREE.BoxGeometry(0.5, 0.9, 0.05), K.mat(0x1d1f24, { roughness: 0.4 }));
    cel = K.telaCanvas(0.44, 0.82, 360);
    cel.m.position.z = 0.027;
    celG.add(corpoC, cel.m);
    celG.position.set(...mais(LEO, [0.5, 1.2, 0.4]));
    K.lugar(celG); K.nomear('celular', celG);

    // O calendário do lado do banco
    ({ g: calG, t: cal } = painel(0.75, 0.85, 300, 0xcfd3d8, CAL));
    calG.rotation.y = -0.4;
    K.lugar(calG); K.nomear('calendario', calG); guardar(calG);
    fx.folhas = [];
    for (let i = 0; i < 6; i++) { const f = K.placa(String(5 * i + 3), { larg: 0.6, alt: 0.55, fundo: '#ffffff', cor: '#1b1b1b', borda: '#cccccc' }); f.material.side = THREE.DoubleSide; fx.folhas.push(f); }

    // O coração da curtida, com o "Mãe"
    coracaoG = new THREE.Group();
    coracaoG.position.set(...mais(BANCO_LADO, [-0.6, 2.2, 0.3]));
    K.scene.add(coracaoG);
    const vermelho = K.mat(0xe8352b, { emissive: 0xe8352b, emissiveIntensity: 0.25 });
    [-0.11, 0.11].forEach((dx) => { const b = K.malha(new THREE.SphereGeometry(0.15, 16, 12), vermelho); b.position.set(dx, 0.06, 0); coracaoG.add(b); });
    const ponta = K.malha(new THREE.ConeGeometry(0.255, 0.34, 18), vermelho);
    ponta.rotation.x = Math.PI; ponta.position.y = -0.14;
    coracaoG.add(ponta);
    const mae = K.placa('Mãe', { larg: 0.55, alt: 0.25, fundo: '#ffffff', cor: '#e8352b', borda: '#e8352b' });
    K.scene.remove(mae);
    mae.position.set(0, 0.42, 0);
    coracaoG.add(mae);
    K.lugar(coracaoG); K.nomear('coracao', coracaoG); guardar(coracaoG);

    // A lupa grande
    lupaG = new THREE.Group();
    K.scene.add(lupaG);
    const aro = K.malha(new THREE.TorusGeometry(0.3, 0.05, 10, 28), K.mat(0x2b2f36, { metalness: 0.5 }));
    const vidro = K.malha(new THREE.CircleGeometry(0.29, 28), new THREE.MeshStandardMaterial({ color: 0xbfe3ff, transparent: true, opacity: 0.45 }), false);
    const cabo = K.malha(new THREE.CylinderGeometry(0.045, 0.055, 0.45, 10), K.mat(0x2f6fd6));
    cabo.position.y = -0.52;
    lupaG.add(aro, vidro, cabo);
    lupaG.position.set(...LUPA_ALTO);
    K.lugar(lupaG); K.nomear('lupa', lupaG);

    // Os 6 perfis girando em volta dele (frase 7)
    perfisG = new THREE.Group();
    perfisG.position.set(...MEIO);
    K.scene.add(perfisG);
    const datas = ['jan/2024', 'ontem', 'mar/2023', 'há 2 dias', 'ago/2024', 'hoje'];
    perfisC = datas.map((d, i) => {
      const p = K.placa('@loja' + (i + 1) + '\núltimo post\n' + d, { larg: 0.75, alt: 0.8, fundo: '#ffffff', cor: '#1b1b1b', borda: INSTA });
      K.scene.remove(p);
      p.material.side = THREE.DoubleSide;
      perfisG.add(p);
      return p;
    });
    K.lugar(perfisG); K.nomear('perfis', perfisG); guardar(perfisG);

    // O relógio
    relogioG = new THREE.Group();
    relogioG.position.set(...mais(MEIO, [0, 3.2, 0]));
    K.scene.add(relogioG);
    const most = K.malha(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32), K.mat(0xffffff));
    most.rotation.x = Math.PI / 2;
    const aroR = K.malha(new THREE.TorusGeometry(0.5, 0.06, 10, 32), K.mat(0x1b1b1b));
    relogioG.add(most, aroR);
    ponteiros = [0.38, 0.26].map((len, i) => {
      const p = new THREE.Group();
      const m = K.malha(new THREE.BoxGeometry(0.05, len, 0.03), K.mat(i ? 0xe8352b : 0x1b1b1b));
      m.position.y = len / 2;
      p.add(m);
      p.position.z = 0.06;
      relogioG.add(p);
      return p;
    });
    K.lugar(relogioG); K.nomear('relogio', relogioG); guardar(relogioG);

    // O painel da lista do Mappoa
    ({ g: listaG, t: lista } = painel(2.2, 2.8, 440, COR_N, LISTA));
    K.lugar(listaG); K.nomear('lista', listaG); guardar(listaG);

    // O envelope "Faço social media" e o balão da mensagem certa
    envelope = K.placa('✉ Faço social media!', { larg: 1.3, alt: 0.42, fundo: '#ffffff', cor: '#2f6fd6', borda: '#2f6fd6' });
    envelope.material.side = THREE.DoubleSide;
    K.lugar(envelope); K.nomear('envelope', envelope); guardar(envelope);
    balaoG = new THREE.Group();
    K.scene.add(balaoG);
    const bal = K.placa('O último post de vocês\nfoi em março.\nBora voltar a aparecer?', { larg: 2.1, alt: 0.85, fundo: '#ffffff', cor: '#1b1b1b', borda: '#1fbf6a' });
    K.scene.remove(bal);
    balaoG.add(bal);
    balaoG.position.set(-19.9, G + 2.45, 4.0);
    K.lugar(balaoG); K.nomear('balao', balaoG); guardar(balaoG);

    // As caixas de roupa nos braços da dona
    caixasG = new THREE.Group();
    caixasG.position.set(...mais(DONA, [0, 0, 0.45]));
    K.scene.add(caixasG);
    caixas = [0, 1, 2].map((i) => {
      const cx = K.malha(new THREE.BoxGeometry(0.5 - i * 0.04, 0.28, 0.4), K.mat([0xc79a5b, 0xd8ad6c, 0xb98a4c][i]));
      cx.position.set(0, 0.95 + i * 0.29, 0);
      caixasG.add(cx);
      return cx;
    });
    caixas.forEach(guardar);
    K.lugar(caixasG); K.nomear('caixas', caixasG); guardar(caixasG);

    // A barra de endereço grande
    ({ g: navG, t: nav } = painel(2.2, 0.46, 700, null, NAV));
    K.lugar(navG); K.nomear('navegador', navG); guardar(navG);

    // Os marcadores nos prédios do outro lado da rua e nas lojas
    pins = new THREE.Group();
    K.scene.add(pins);
    const pontosPins = [[-21, G + 6.3, LOJAS_Z], [-33, G + 11.4, -19.2], [-26.2, G + 6.3, LOJAS_Z], [-27, G + 7.3, -19.2], [-15, G + 11.8, -19.2],
      [-31.4, G + 6.3, LOJAS_Z], [-9, G + 7.6, -19.2], [-21, G + 9.9, -19.2]];
    pontosPins.forEach((p) => {
      const pin = new THREE.Group();
      pin.position.set(...p);
      const m = K.mat(COR_N, { emissive: COR_N, emissiveIntensity: 0.4 });
      const cone = K.malha(new THREE.ConeGeometry(0.55, 1.3, 16), m);
      cone.rotation.x = Math.PI;
      const bola = K.malha(new THREE.SphereGeometry(0.62, 16, 12), m);
      bola.position.y = 0.75;
      const miolo = K.malha(new THREE.SphereGeometry(0.26, 12, 10), K.mat(0xffffff));
      miolo.position.set(0, 0.8, 0.45);
      pin.add(cone, bola, miolo);
      pins.add(pin);
    });
    K.lugar(pins); K.nomear('pins', pins);

    // O Léo: o personagem do canal (canal/identidade.md)
    menino = K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });

    // Efeitos
    fx.bitsLista = K.bits(K.caminho([mais(TELA, [0, 0.2, 0.05]), mais(LISTA, [0, -1.0, 0.1]), mais(LISTA, [0, 0.6, 0.1])]), 22, 22, { cor: COR_N, soLuz: true });
    fx.seta = K.seta(0xff9f1c, 1);
    fx.festa = K.festa([-16, G + 2.5, 4.5]);
    fx.comenta = K.placa('💬', { larg: 0.6, alt: 0.6, fundo: '#ffffff', cor: COR, borda: COR });

    // Textos (cada um uma vez)
    fx.certo = K.marca('certo');
    fx.errado = K.marca('errado');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual tipo de loja você atenderia primeiro? <em>Comenta aí</em>');
    fx.rot = { prosp: K.rotulo('Prospecção ativa'), mappoa: K.rotulo('Mappoa') };
    fx.cont = { lista: K.contador(), pins: K.contador() };
    const e = (t, cor) => K.etiqueta(t, cor);
    fx.et = {
      precisa: e('Precisa de você', 'laranja'), leo: e('Léo · social media', 'azul'), zero: e('0 clientes', 'vermelho'),
      espera: e('Esperando...', 'laranja'), curtida: e('1 curtida', 'vermelho'), horas: e('8 horas', 'vermelho'),
      procura: e('Procura por você', 'azul'), olha: e('Você que olha', 'azul'), semtempo: e('Sem tempo', 'laranja'),
      antes: e('Antes: esperando', 'vermelho'), agora: e('Agora: a cidade inteira', 'verde')
    };
  }

  // A dona na porta da boutique
  function donaNaPorta(olhar) { dona.g.visible = true; dona.colocar(DONA, olhar || OLHA_CAM(DONA)); }

  // ---------- Planos: um por frase do roteiro.json ----------

  const P = {
    gancho(B, tc) {
      // NA TELA: a Boutique Flor no centro, a dona na porta; o perfil gigante na frente, com "Último post: 2023" · MOSTRA: perfil, boutique
      // CENÁRIO: o calçadão com a fileira de lojas; atrás, a rua com um carro passando (o K.cenario cuida)
      const tA = quando('2023', B, 0.55), tP = quando('precisa', B, 0.75), tV = quando('você', B, 0.9);
      // ENTRA AGORA: o perfil já está na tela no 1º quadro, tremendo; a data pisca na palavra "2023"
      perfilG.visible = true;
      desenharPerfil(tc > tA && Math.floor((tc - tA) * 6) % 2 === 0, 0);
      // OBJETOS SE MEXENDO: o perfil treme e solta poeira desde o 1º quadro; a seta laranja entra na palavra "você"
      K.falhar(perfilG, 'treme', B.t, { dur: 1.2, forca: 0.25, som: false });
      fx.poeira.em(mais(PERFIL, [0, -0.9, 0.2]), B.t, 0.7);
      if (tc > tV) fx.seta.em(mais(PERFIL, [1.6, 0.3, 0.3]), [-1, 0, 0], 0.9, tc - tV);
      // PERSONAGEM: a dona · começo: cansado, abanando · na palavra "2023": triste, olhando o perfil
      // INTERAÇÃO: o perfil parado solta poeira e a dona olha pra ele desanimada
      donaNaPorta(tc > tA ? PERFIL : OLHA_CAM(DONA));
      if (tc > tA) dona.reagir('triste', tc - tA); else dona.reagir('cansado', B.t);
      // EFEITOS VISUAIS: a pergunta no topo (o motor põe) · etiqueta laranja "Precisa de você" (palavra "precisa")
      fx.et.precisa.em(mais(PERFIL, [0, 1.25, 0.2]), tc - tP);
      // SONS: range do perfil tremendo · zap na data · whoosh da seta
      K.som('range', B.inicio + 0.05, 0.4);
      K.som('zap', tA, 0.5);
      K.som('whoosh', tV, 0.5);
      // CÂMERA: alvo [perfil, boutique] · mergulho · médio · frente · alto → olho · topo livre (0.38)
      K.filmar([PERFIL, [-21, G + 1.6, 2.6]], 'mergulho', B.p, { plano: 'aberto', lado: 15, altura: 'olho', tam: 1.4, espacoCima: 0.38 });
    },

    leo(B, tc) {
      // NA TELA: o Léo no centro, no calçadão; a agenda azul do lado dele abrindo em branco · MOSTRA: personagem, agenda
      // CENÁRIO: o calçadão; atrás, a rua com o ônibus e os prédios (o K.cenario cuida)
      const tL = quando('Léo', B, 0.1), tA = quando('agenda', B, 0.6), tV = quando('vazia', B, 0.85);
      // ENTRA AGORA: a agenda surge girando (palavra "agenda")
      agendaG.visible = tc > tA - 0.05;
      K.entrar(agendaG, 'gira', tc - tA, { dur: 0.45 });
      // OBJETOS SE MEXENDO: as páginas viram sozinhas, todas em branco (palavra "vazia")
      desenharAgenda(tc > tV ? 1 + Math.floor((tc - tV) / 0.3) : 0);
      if (tc > tV) agendaG.rotation.y = 0.3 + 0.12 * Math.sin((tc - tV) * 9);
      // PERSONAGEM: de frente pra câmera · começo: mostrando (se apresenta) · "vazia": triste
      // INTERAÇÃO: ele abre a agenda e desanima com as páginas em branco
      menino.colocar(LEO, tc > tV ? AGENDA : OLHA_CAM(LEO));
      if (tc > tV) menino.reagir('triste', tc - tV); else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Léo · social media" (palavra "Léo") · etiqueta vermelha "0 clientes" (palavra "vazia")
      if (tc < tV) fx.et.leo.em(mais(LEO, [1.1, 1.9, 0]), tc - tL);
      fx.et.zero.em(mais(AGENDA, [0, 0.85, 0]), tc - tV);
      // SONS: ding (o kit põe) · whoosh das páginas
      for (let k = 0; k < 4; k++) K.som('whoosh', tV + k * 0.3, 0.2);
      // CÂMERA: alvo [personagem, agenda] · chegando · médio · perfil direita · olho (frase 1: mergulho, médio, frente)
      K.filmar([menino, agendaG], 'chegando', B.p, { plano: 'medio', lado: 35, altura: 'olho' });
    },

    posta(B, tc) {
      // NA TELA: o Léo com o celular; o post "Faço social media!"; ele vai até o banco esperar · MOSTRA: personagem, celular
      // CENÁRIO: o banco da calçada; atrás, a rua com os carros (o K.cenario cuida)
      const tP = quando('posta', B, 0.25), tE = quando('espera', B, 0.55);
      // PERSONAGEM: começo: segurando o celular, aperta postar · "espera": anda até o banco, pensando
      // INTERAÇÃO: ele posta no celular e fica esperando o cliente chegar
      if (tc < tE) { menino.colocar(LEO, OLHA_CAM(LEO)); if (tc > tP) menino.reagir('ideia', tc - tP); else menino.reagir('segurando', B.t); }
      else {
        const k = K.clamp((tc - tE) / 1.2);
        menino.irPara(LEO, BANCO_LADO, k, tc, { olhar: k >= 1 ? [0, 0, 9] : BANCO_LADO });
        if (k >= 1) menino.reagir('pensando', tc - tE - 1.2);
      }
      // ENTRA AGORA: o celular sobe pra mão dele; o post aparece na tela (palavra "posta")
      celG.visible = true;
      const m = menino.mao(1);
      celG.position.set(m[0] + 0.05, m[1] + 0.3, m[2] + 0.15);
      desenharCel(tc > tP, 0);
      // EFEITOS VISUAIS: etiqueta laranja "Esperando..." (palavra "espera")
      fx.et.espera.em(mais(BANCO_LADO, [0, 2.2, 0]), tc - tE - 1.0);
      // SONS: clique do postar · passos
      K.som('clique', tP, 0.6);
      for (let k = 0; k < 4; k++) K.som('passo', tE + k * 0.3, 0.3);
      // CÂMERA: alvo [personagem, celular] · passando · aberto · frente · alto (frase 2: chegando, médio, perfil direita)
      K.filmar([menino, celG, mais(BANCO_LADO, [0, 0.8, 0])], 'passando', B.p, { plano: 'aberto', lado: 'frente', altura: 'alto' });
    },

    mae(B, tc) {
      // NA TELA: o Léo do lado do banco; o calendário virando; o coração "Mãe" saindo do celular · MOSTRA: calendario, coracao, personagem
      // CENÁRIO: o banco; atrás, a rua e o semáforo (o K.cenario cuida)
      const tPa = quando('passa', B, 0.1), tMe = quando('mês', B, 0.3), tC = quando('curtiu', B, 0.65), tM = quando('mãe', B, 0.9);
      // ENTRA AGORA: o calendário cai (palavra "passa"); o coração sobe do celular (palavra "curtiu")
      calG.visible = tc > tPa - 0.05;
      K.entrar(calG, 'cai', tc - tPa, { dur: 0.4 });
      // OBJETOS SE MEXENDO: as folhas voam uma por uma a partir de "mês"; o dia vai até 30
      const dia = Math.max(1, Math.min(30, 1 + Math.floor((tc - tMe) / 0.05)));
      desenharCal(tc > tMe ? dia : 1);
      fx.folhas.forEach((f, i) => {
        const d = tc - tMe - i * 0.2, k = K.clamp(d / 0.8);
        f.visible = d > 0 && k < 1;
        f.position.set(CAL[0] - 1.4 * k, CAL[1] + 0.3 + 1.2 * k, CAL[2] + 0.3 + 0.4 * Math.sin(k * 3));
        f.rotation.set(k * 3, k * 2, k * 4 + i);
        if (d > 0) K.som('whoosh', tMe + i * 0.2, 0.15);
      });
      coracaoG.visible = tc > tC;
      const kc = K.suave(K.clamp((tc - tC) / 0.6));
      const mao = mais(BANCO_LADO, [0.3, 1.25, 0.3]);
      coracaoG.position.set(...arco(mao, mais(BANCO_LADO, [-0.6, 2.2, 0.3]), kc, 0.2));
      coracaoG.scale.setScalar(0.3 + 0.7 * kc);
      // o celular na mão, com 1 curtida
      celG.visible = true;
      celG.position.set(...mais(BANCO_LADO, [0.45, 1.15, 0.35]));
      desenharCel(true, tc > tC ? 1 : 0);
      // PERSONAGEM: começo: cansado · "mãe": surpreso
      // INTERAÇÃO: o celular solta um coração só, e ele olha sem acreditar
      menino.colocar(BANCO_LADO, tc > tC ? coracaoG.position.toArray() : [0, 0, 9]);
      if (tc > tM) menino.reagir('surpreso', tc - tM); else menino.reagir('cansado', B.t);
      // SONS: pingo do coração · o congela (o jogo)
      K.som('pingo', tC, 0.6);
      // CÂMERA: alvo [calendario, coracao, personagem] · chegando · perto · perfil esquerda · olho (frase 3: passando, médio, frente, alto)
      K.filmar([CAL, mais(BANCO_LADO, [-0.6, 2.2, 0.3]), mais(BANCO_LADO, [0, 0.8, 0])], 'chegando', B.p, { plano: 'perto', lado: -30, altura: 'olho', tam: 1.2 });
      // EFEITOS VISUAIS: etiqueta vermelha "1 curtida" (palavra "curtiu") · ✗ no fim
      fx.et.curtida.em(mais(BANCO_LADO, [0.9, 2.75, 0.3]), tc - tC - 0.3);
    },

    vai_atras(B, tc) {
      // NA TELA: o Léo andando na frente das 3 lojas, com a lupa; a boutique acende · MOSTRA: personagem, lupa, lojas
      // CENÁRIO: a fileira de lojas; atrás, os prédios; a rua com os carros (o K.cenario cuida)
      const tA = quando('atrás', B, 0.15), tL = quando('loja', B, 0.5), tP = quando('parado', B, 0.9);
      // ENTRA AGORA: os "?" em cima de cada loja (palavra "loja")
      interrogaG.visible = true;
      interroga.forEach((q, i) => { const d = tc - tL - i * 0.15; q.visible = d > 0 && !(i === 0 && tc > tP); q.scale.setScalar(pop(d)); q.position.y = G + 5.9 + 0.1 * Math.sin(tc * 4 + i); });
      // PERSONAGEM: anda do meio do calçadão até a boutique · começo: ideia · "parado": aponta a boutique
      // INTERAÇÃO: ele procura com a lupa e acha a loja com o perfil parado
      const t0 = B.inicio + (B.bloco && B.bloco.reb ? B.bloco.reb : 0);
      const k = K.clamp((tc - t0) / Math.max(0.6, tP - t0 - 0.2));
      menino.irPara([-12.5, G, 5.2], LUPA_POS, k, tc, { olhar: k >= 1 ? [-21, 2, FRENTE_LOJA] : LUPA_POS });
      if (tc > tP) { menino.apontar(0.7); menino.humor('feliz'); } else if (k >= 1) menino.reagir('ideia', tc - t0);
      // OBJETOS SE MEXENDO: a lupa na mão; na palavra "parado", a boutique acende
      lupaG.visible = tc > tA - 0.1;
      const m = menino.mao(1);
      lupaG.position.set(m[0], m[1] + 0.45, m[2] + 0.05);
      lupaG.rotation.set(0, 0.6, 0.2);
      if (tc > tP) K.brilhar(boutiqueG, tc - tP, 0.9);
      // SONS: passos · brilho da boutique (palavra "parado") · bip dos "?"
      for (let s = 0; s < 6; s++) K.som('passo', t0 + s * 0.3, 0.25);
      [0, 1, 2].forEach((i) => K.som('bip', tL + i * 0.15, 0.4));
      K.som('brilho', tP, 0.6);
      // CÂMERA: alvo [personagem, lojas] · passando · médio · frente · olho (frase 4: chegando, médio, perfil esquerda)
      K.filmar([[-21, G + 3.0, 2.4], menino, lupaG], 'passando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', tam: 1.6 });
      // EFEITOS VISUAIS: ✓ verde em cima da boutique (palavra "parado")
      const [cx, cy] = K.tela([-21, G + 5.6, FRENTE_LOJA]);
      fx.certo.em({ tela: [cx, cy] }, tc - tP);
    },

    prospeccao_rotulo(B, tc) {
      // NA TELA: a lupa no centro, grande, brilhando; a boutique atrás; o rótulo "Prospecção ativa" · MOSTRA: lupa
      // CENÁRIO: atrás, desfocado, a fileira de lojas
      // OBJETOS SE MEXENDO: a lupa gira meia volta no ar e brilha
      lupaG.visible = true;
      lupaG.position.set(...LUPA_ALTO);
      lupaG.scale.setScalar(1.8);
      lupaG.rotation.set(0, Math.PI * K.suave(B.p) * 0.5 + 0.3, 0);
      K.brilhar(lupaG, B.t);
      // PERSONAGEM: embaixo · vitória, erguendo a lupa
      // INTERAÇÃO: ele ergue a lupa como um troféu
      menino.colocar(LUPA_POS, OLHA_CAM(LUPA_POS));
      menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: o rótulo amarelo "Prospecção ativa" · SONS: o do rótulo (o kit põe)
      fx.rot.prosp.em(mais(LUPA_ALTO, [0, 1.15, 0]), B.t - 0.05);
      // CÂMERA: alvo lupa · girando · perto · perfil direita · baixo (frase 5: passando, médio, frente, olho)
      K.filmar(LUPA_ALTO, 'girando', B.p, { plano: 'perto', lado: 30, altura: 'baixo', angulo: 25, tam: 1.4, espacoCima: 0.15 });
    },

    na_mao(B, tc) {
      // NA TELA: o Léo no centro, com o celular; 6 perfis girando em volta dele; o relógio correndo · MOSTRA: personagem, perfis, relogio
      // CENÁRIO: o calçadão; a luz ficando de tarde
      K.ceu('dia', 'tarde', K.suave(K.clamp(B.p * 1.4)));
      const tP = quando('perfil', B, 0.4), tD = quando('dia', B, 0.75), tI = quando('inteiro', B, 0.88);
      // ENTRA AGORA: os perfis entram um por um (a partir de "perfil"); o relógio cai (palavra "dia")
      perfisG.visible = true;
      const vel = 0.8 + 2.5 * K.clamp((tc - tP) / 2.5);
      perfisC.forEach((p, i) => {
        const d = tc - tP + 0.9 - i * 0.18;
        p.visible = d > 0;
        const a = (i / 6) * Math.PI * 2 + (tc - tP) * vel;
        p.position.set(1.45 * Math.sin(a), 1.25 + 0.15 * Math.sin(a * 2), 1.45 * Math.cos(a));
        p.rotation.set(0, a, 0);
        p.scale.setScalar(pop(d));
        if (d > 0) K.som('clique', tP - 0.9 + i * 0.18, 0.2);
      });
      relogioG.visible = tc > tD - 0.05;
      relogioG.position.set(MEIO[0], G + 3.2 + Math.max(0, 3 * (1 - K.clamp((tc - tD) / 0.4))), MEIO[2]);
      ponteiros[0].rotation.z = -tc * 2;
      ponteiros[1].rotation.z = -tc * 24;
      // o celular na mão dele
      celG.visible = true;
      // PERSONAGEM: começo: pensando, rolando o celular · "inteiro": cansado, suando
      // INTERAÇÃO: os perfis rodeiam e cansam ele
      menino.colocar(MEIO, OLHA_CAM(MEIO));
      if (tc > tI) { menino.reagir('cansado', tc - tI); menino.suar(tc - tI); } else menino.reagir('pensando', B.t);
      const m = menino.mao(1);
      celG.position.set(m[0], m[1] + 0.3, m[2] + 0.15);
      celG.scale.setScalar(0.6);
      desenharCel(true, 1);
      // EFEITOS VISUAIS: etiqueta vermelha "8 horas" (palavra "inteiro") · P&B (o jogo)
      fx.et.horas.em(mais(MEIO, [1.6, 3.2, 0]), tc - tI);
      // SONS: zumbido do relógio
      K.som('zumbido', tD, 0.4);
      // CÂMERA: alvo [personagem, perfis] · girando (sentido contrário) · médio · frente · alto (frase 6: girando, perto, baixo)
      K.filmar([mais(MEIO, [0, 0.6, 0]), mais(MEIO, [0, 3.8, 0])], 'girando', B.p, { plano: 'medio', lado: 'frente', altura: 20, sentido: -1, angulo: 30, tam: 1.8 });
    },

    site(B, tc) {
      // NA TELA: a mesa com o computador; a tela acende com a busca e a lupa; o Léo chegando · MOSTRA: computador, personagem
      // CENÁRIO: o calçadão de dia; atrás, os carros passando (o K.cenario cuida)
      const tS = quando('site', B, 0.25), tP = quando('procura', B, 0.55);
      // ENTRA AGORA e OBJETOS SE MEXENDO: a busca na tela (palavra "site"), a lupa girando procurando
      if (tc > tS) telaSite((tc - tS) * 1.2); else telaPerfis(0);
      // PERSONAGEM: anda até a mesa · começo: surpreso · "procura": ideia, apontando pra tela
      // INTERAÇÃO: ele vai até o computador e aponta a busca
      const k = K.clamp(B.p / 0.4);
      menino.irPara([0.0, G, 3.2], MESA_LADO, k, tc, { olhar: TELA });
      if (tc > tP) { menino.apontar(0.6); menino.humor('feliz'); } else if (k >= 1) menino.reagir('surpreso', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Procura por você" (palavra "procura")
      fx.et.procura.em(mais(PC, [0, 1.85, 0.2]), tc - tP);
      // SONS: liga a tela · passos
      K.som('liga', tS, 0.6);
      // CÂMERA: alvo [computador, personagem] · chegando · médio · perfil esquerda · olho (frase 7: girando, médio, frente, alto)
      K.filmar([comp.g, menino], 'chegando', B.p, { plano: 'medio', lado: -35, altura: 'olho' });
    },

    busca(B, tc) {
      // NA TELA: o computador embaixo; a lista do Mappoa subindo e enchendo de lojas com o Instagram · MOSTRA: lista, computador
      // CENÁRIO: o calçadão; atrás, a rua (o K.cenario cuida)
      const tE = quando('escreve', B, 0.05), tL = quando('lista', B, 0.45), tI = quando('Instagram', B, 0.7);
      // OBJETOS SE MEXENDO: a busca digitada letra por letra (de "escreve" em diante)
      const letras = Math.max(0, Math.min(25, Math.floor((tc - tE) / 0.06)));
      if (tc < tL) telaMappoaBusca(letras); else telaMappoa();
      // ENTRA AGORA: a lista subindo da tela (palavra "lista"); os ícones (palavra "Instagram")
      listaG.visible = tc > tL - 0.05;
      K.entrar(listaG, 'sobe', tc - tL, { dur: 0.6 });
      const n = Math.max(0, Math.min(16, Math.floor(Math.pow(Math.max(0, tc - tL) / 2.0, 0.8) * 16)));
      const cont = Math.min(200, Math.floor(K.clamp((tc - tL) / 2.2) * 200));
      desenharLista(n, tc > tI - 0.2 ? 1 : 0, cont >= 200 ? '200+' : String(cont));
      if (tc > tL) fx.bitsLista.em(tc, 0.6);
      // PERSONAGEM: na mesa · começo: digitando · "lista": surpreso
      // INTERAÇÃO: ele digita a busca e a lista sobe na frente dele
      menino.colocar(MESA_LADO, tc > tL ? LISTA : TELA);
      if (tc > tL) menino.reagir('surpreso', tc - tL); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: contador "200+ lojas" (palavra "lista")
      fx.cont.lista.em(cont >= 200 ? '200+' : String(cont), mais(LISTA, [-1.75, 0.9, 0.2]), tc - tL, 'LOJAS');
      // SONS: clique das teclas · bip a cada linha · ding
      for (let k = 0; k < 25; k += 3) K.som('clique', tE + k * 0.06, 0.25);
      for (let k = 1; k <= 16; k += 2) K.som('bip', tL + 2.0 * Math.pow(k / 16, 1.25), 0.18);
      K.som('ding', tI, 0.5);
      // CÂMERA: alvo [lista, computador] · subindo · médio · frente · olho (frase 8: chegando, médio, perfil esquerda)
      K.filmar([listaG, comp.g], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },

    mappoa_rotulo(B, tc) {
      // NA TELA: a lista no centro, grande, girando e brilhando; o rótulo "Mappoa" · MOSTRA: lista
      // CENÁRIO: atrás, o calçadão e a rua
      listaG.visible = true;
      desenharLista(16, 1, '200+');
      telaMappoa();
      K.brilhar(listaG, B.t);
      // PERSONAGEM: embaixo · vitória · INTERAÇÃO: ele comemora a lista
      menino.colocar([1.3, G, 2.0], LISTA);
      menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: o rótulo amarelo "Mappoa" · SONS: o do rótulo (o kit põe)
      fx.rot.mappoa.em(mais(LISTA, [0, 1.75, 0]), B.t - 0.05);
      // CÂMERA: alvo lista · girando · perto · perfil direita · baixo (frase 9: subindo, médio, frente)
      K.filmar(listaG, 'girando', B.p, { plano: 'perto', lado: 25, altura: 'baixo', angulo: 30, espacoCima: 0.25 });
    },

    parados(B, tc) {
      // NA TELA: a lista no centro; o perfil de 2023 abre do lado dela; as paradas ganham "PARADO" e sobem · MOSTRA: lista, perfil, personagem
      // CENÁRIO: a mesa e o computador; atrás, a rua (o K.cenario cuida)
      const tA = quando('abre', B, 0.15), tS = quando('separa', B, 0.45), tP = quando('parados', B, 0.55);
      listaG.visible = true;
      telaMappoa();
      // OBJETOS SE MEXENDO: as 3 paradas sobem pro topo da lista (palavra "separa")
      desenharLista(16, 1, '200+', K.clamp((tc - tS) / 0.8));
      // ENTRA AGORA: o perfil desliza da lista pro lado (palavra "abre"), pisca 2 vezes
      perfilG.visible = tc > tA - 0.05;
      const kE = K.suave(K.clamp((tc - tA) / 0.45));
      perfilG.position.set(...mais(PERFIL_LISTA, [1.6 * (1 - kE), 0, -0.6 * (1 - kE)]));
      perfilG.rotation.set(0, 0.3, 0);
      perfilG.scale.setScalar(0.8 * Math.max(0.05, kE));
      K.som('whoosh', tA, 0.4);
      desenharPerfil(tc > tP && Math.floor((tc - tP) * 5) % 2 === 0, 0);
      // PERSONAGEM: começo: aponta a linha · "parados": ideia, empurra pra cima
      // INTERAÇÃO: ele abre os perfis e arrasta os parados pra cima da lista
      menino.colocar([0.0, G, 2.9], LISTA);
      if (tc > tS) menino.reagir('empurrando', tc - tS); else menino.apontar(0.8);
      // EFEITOS VISUAIS: etiqueta azul "Você que olha" (palavra "abre")
      fx.et.olha.em(mais(PERFIL_LISTA, [0, 1.05, 0.2]), tc - tA - 0.3);
      // SONS: clique (palavra "abre") · trava de cada carimbo
      K.som('clique', tA, 0.6);
      [0, 1, 2].forEach((i) => K.som('trava', tP + i * 0.2, 0.4));
      // CÂMERA: alvo [lista, perfil] · afastando · médio · perfil esquerda · olho (frase 10: girando, perto, baixo)
      K.filmar([LISTA, PERFIL_LISTA, [0.0, G + 0.8, 2.9]], 'afastando', B.p, { plano: 'perto', lado: -25, altura: 'olho', tam: 1.4 });
    },

    ignora(B, tc) {
      // NA TELA: de cima: o envelope "Faço social media" voa do Léo até a dona, que vira de costas · MOSTRA: envelope, dona, boutique
      // CENÁRIO: a boutique e a rua de cima (o K.cenario cuida)
      const tM = quando('mensagem', B, 0.2), tD = quando('dona', B, 0.75), tI = quando('ignora', B, 0.9);
      const pos = [-16.0, G, 5.2];
      // ENTRA AGORA e OBJETOS SE MEXENDO: o envelope voa em arco (palavra "mensagem") e cai no chão murcho (palavra "ignora")
      const de = mais(pos, [-0.3, 1.3, 0]), ate = mais(DONA, [0.6, 1.3, 0.5]), chao = mais(DONA, [1.0, 0.05, 1.0]);
      envelope.visible = tc > tM;
      if (tc < tI) envelope.position.set(...arco(de, ate, K.clamp((tc - tM) / Math.max(0.4, tI - tM - 0.1)), 1.2));
      else { const k = K.clamp((tc - tI) / 0.35); envelope.position.set(...arco(ate, chao, k, 0.1)); envelope.rotation.x = -Math.PI / 2 * k; }
      envelope.rotation.z = tc < tI ? (tc - tM) * 3 : 0;
      // PERSONAGEM: o Léo · começo: chamando · "ignora": susto · a dona: vira de costas, brava
      // INTERAÇÃO: a dona dá as costas pro envelope dele
      menino.colocar(pos, DONA);
      if (tc > tI) menino.reagir('susto', tc - tI); else menino.reagir('chamando', B.t);
      donaNaPorta(tc > tD ? [-21, G, -3] : pos);
      if (tc > tD) dona.reagir('bravo', tc - tD); else dona.reagir('segurando', B.t);
      // SONS: whoosh do envelope · baque no chão · o congela (o jogo)
      K.som('whoosh', tM, 0.5);
      K.som('baque', tI + 0.35, 0.5);
      // CÂMERA: alvo [envelope, dona, boutique] · afastando · aberto · frente · de cima (frase 11: afastando, médio, perfil esquerda, olho)
      K.filmar([[-21, G + 2.2, 2.6], mais(pos, [0, 0.8, 0])], 'afastando', B.p, { plano: 'medio', lado: -20, altura: 'alto', tam: 1.6 });
      // EFEITOS VISUAIS: ✗ vermelho em cima do envelope no chão (palavra "ignora")
      const [ex, ey] = K.tela(mais(chao, [0, 0.6, 0]));
      fx.errado.em({ tela: [ex, ey - 80] }, tc - tI - 0.3);
    },

    perfil_dela(B, tc) {
      // NA TELA: o balão verde chega até a dona; ela lê e sorri; a vitrine acende · MOSTRA: balao, dona, boutique
      // CENÁRIO: a boutique de perto: a placa, a vitrine com os vestidos
      const tP = quando('perfil', B, 0.1), tMa = quando('março', B, 0.5), tA = quando('aparecer', B, 0.9);
      // ENTRA AGORA e OBJETOS SE MEXENDO: o balão desliza da direita até a frente da dona (palavra "perfil")
      balaoG.visible = tc > tP - 0.05;
      K.entrar(balaoG, 'desliza', tc - tP, { dur: 0.6, de: [3.5, 0, 0.5] });
      // a vitrine acende e os vestidos giram (palavra "aparecer")
      if (tc > tA) { K.brilhar(boutiqueG, tc - tA, 1.0); cabides.forEach((v, i) => { v.rotation.y = (tc - tA) * 3 + i; }); }
      // PERSONAGEM: a dona · começo: dúvida, lendo · "aparecer": surpresa e feliz, aponta a vitrine · o Léo de lado, mostrando
      // INTERAÇÃO: a mensagem do Léo faz a dona olhar pra própria loja e sorrir
      donaNaPorta([-19.9, G + 2.4, 4.0]);
      if (tc > tA) { dona.humor('feliz'); dona.apontar(0.4); } else if (tc > tMa) dona.reagir('surpreso', tc - tMa); else dona.reagir('duvida', B.t);
      menino.colocar([-17.4, G, 5.0], DONA);
      menino.reagir('mostrando', B.t);
      // SONS: bip da mensagem · certo (palavra "aparecer")
      K.som('bip', tP + 0.6, 0.6);
      K.som('certo', tA, 0.6);
      // CÂMERA: alvo [dona, balao] · passando · médio · perfil direita · olho (frase 12: afastando, aberto, frente, cima)
      K.filmar([[-19.9, G + 2.45, 4.0], mais(DONA, [0, 0.8, 0])], 'passando', B.p, { plano: 'medio', lado: 30, altura: 'olho', tam: 1.6 });
      // EFEITOS VISUAIS: ✓ verde ao lado do balão (palavra "aparecer")
      const [cx, cy] = K.tela([-18.6, G + 2.9, 4.0]);
      fx.certo.em({ tela: [cx + 150, cy - 60] }, tc - tA);
    },

    ouro(B, tc) {
      // NA TELA: a dona na porta com as caixas; o perfil parado ficando dourado do lado; o Léo apontando · MOSTRA: dona, caixas, perfil
      // CENÁRIO: a boutique; o ônibus passando atrás (o K.cenario cuida)
      const tO = quando('ouro', B, 0.35), tS = quando('sabe', B, 0.6), tT = quando('tempo', B, 0.92);
      // ENTRA AGORA: o perfil volta e fica dourado (palavra "ouro")
      perfilG.visible = true;
      perfilG.rotation.y = -0.25 + (tc > tO ? Math.sin(K.clamp((tc - tO) / 0.6) * Math.PI) * 0.6 : 0);
      desenharPerfil(false, K.clamp((tc - tO) / 0.5));
      if (tc > tO) K.brilhar(perfilG, tc - tO, 1.0);
      // OBJETOS SE MEXENDO: as caixas empilhadas balançam nos braços dela (palavra "tempo")
      caixasG.visible = true;
      caixas.forEach((cx, i) => { cx.position.x = 0.04 * Math.sin(tc * 6 + i) * (1 + 2 * (tc > tT)); });
      // PERSONAGEM: a dona · começo: segurando as caixas · "tempo": cansada, suando · o Léo: ideia, aponta o perfil
      // INTERAÇÃO: as caixas não deixam a dona mexer no celular; o Léo aponta que é aí que ele entra
      donaNaPorta();
      if (tc > tT) { dona.reagir('cansado', tc - tT); dona.suar(tc - tT); } else dona.reagir('segurando', B.t);
      menino.colocar([-17.2, G, 5.1], PERFIL);
      if (tc > tS) menino.apontar(0.7); else menino.reagir('ideia', B.t);
      // SONS: brilho do ouro · baque das caixas
      K.som('brilho', tO, 0.6);
      K.som('baque', tT, 0.4);
      // CÂMERA: alvo [dona, caixas, perfil] · revelando · médio · frente · baixo (frase 13: passando, médio, perfil direita)
      K.filmar([PERFIL, mais(DONA, [0, 1.1, 0.4]), [-17.2, G + 0.8, 5.1]], 'revelando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 1.8 });
      // EFEITOS VISUAIS: etiqueta laranja "Sem tempo" (palavra "tempo")
      fx.et.semtempo.em(mais(DONA, [-1.2, 2.4, 0.4]), tc - tT);
    },

    antes_agora(B, tc) {
      // NA TELA: Antes (P&B): o Léo no banco com uma curtida; ⏩; Agora: os marcadores brotando nas lojas e prédios · MOSTRA: personagem, pins, lojas
      // CENÁRIO: a cidade inteira (o K.cenario cuida)
      const tA = quando('Agora', B, 0.45);
      const antes = tc < tA;
      if (antes) {
        // PERSONAGEM: cansado do lado do banco · o coração murcha
        menino.colocar(BANCO_LADO, OLHA_CAM(BANCO_LADO));
        menino.reagir('cansado', B.t);
        coracaoG.visible = true;
        coracaoG.scale.setScalar(1 - 0.5 * K.clamp((tc - B.inicio) / Math.max(0.5, tA - B.inicio)));
        fx.et.antes.em(mais(BANCO_LADO, [0, 2.7, 0]), tc - B.inicio);
        K.som('desliga', B.inicio + 0.6, 0.4);
        // CÂMERA: o Léo e o coração · afastando · médio · frente
        K.filmar([mais(BANCO_LADO, [0, 0.8, 0]), coracaoG.position.toArray()], 'afastando', K.clamp((tc - B.inicio) / (tA - B.inicio)) * 0.5, { plano: 'medio', lado: 'frente', altura: 'olho', tam: 1.6 });
        return;
      }
      // ENTRA AGORA e OBJETOS SE MEXENDO: os marcadores caem e quicam em cima de cada loja e prédio
      pins.visible = true;
      pins.children.forEach((pin, i) => { const d = tc - tA - i * 0.15; pin.visible = d > 0; pin.scale.setScalar(pop(d, 0.35) * (1 + 0.05 * Math.sin(tc * 5 + i))); K.som('brilho', tA + i * 0.15, 0.2); });
      // PERSONAGEM: "Agora": vitória, aponta os marcadores · a dona acena na porta
      // INTERAÇÃO: ele aponta e os marcadores brotam nas lojas da cidade
      const pos = [-16.2, G, 5.4];
      menino.colocar(pos, [-21, 5, 0]);
      if (tc > tA + 1.0) menino.comemorar(tc - tA - 1.0); else menino.apontar(1);
      donaNaPorta(pos);
      dona.reagir('chamando', tc - tA);
      fx.festa.em(tc - tA - 1.0);
      // EFEITOS VISUAIS: etiqueta verde "Agora: a cidade inteira" · contador dos marcadores
      fx.et.agora.em([-21, G + 8.6, 2.0], tc - tA);
      // CÂMERA: alvo [personagem, pins, lojas] · afastando · aberto · frente · alto (frase 14: revelando, médio, frente, baixo)
      K.filmar([[-26.2, G + 5.0, 1.0], mais(pos, [0, 0.8, 0])], 'afastando', K.clamp((tc - tA) / (B.ate - tA)), { plano: 'aberto', lado: -20, altura: 25, tam: 2.4 });
    },

    segue(B, tc) {
      // NA TELA: o Léo perguntando pra câmera, depois digitando mappoa.com; a barra grande; o cartão de seguir · MOSTRA: personagem, navegador, computador
      // CENÁRIO: a mesa no calçadão, de dia (o K.cenario cuida)
      const tQ = quando('Qual', B, 0.02), tCo = quando('Comenta', B, 0.35), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
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
      // INTERAÇÃO: ele digita mappoa.com no computador e aponta
      if (tc < tPc) { menino.colocar(MESA_LADO, OLHA_CAM(MESA_LADO)); menino.reagir('chamando', B.t); }
      else { menino.colocar(MESA_LADO, tc > tTe ? NAV : TELA); if (tc > tTe) { menino.apontar(0.9); menino.humor('feliz'); } else menino.reagir('segurando', tc - tPc); }
      // SONS: estalo do balão · clique de cada letra · ding no "Ir" · clique do seguir
      K.som('estalo', tCo + 0.7, 0.4);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6);
      K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: alvo [personagem, navegador] · chegando · aberto · perfil esquerda leve · olho · topo livre (frase 15: afastando, aberto, frente, alto)
      K.filmar([navG, comp.g, menino], 'chegando', B.p, { plano: 'aberto', lado: -12, altura: 'olho', espacoCima: 0.4 });
    },

    cartao(B, tc) {
      // A cauda: o cartão fica (já em "Seguindo"), o Léo acena; mappoa.com continua legível
      navG.visible = true;
      desenharNav(10, true);
      telaEndereco(10);
      menino.colocar(MESA_LADO, OLHA_CAM(MESA_LADO));
      fx.seguir.em(9);
      menino.acenar(tc);
      menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp.g, menino], 'parado', 1, { plano: 'aberto', lado: -12, altura: 'olho', espacoCima: 0.4 });
    },

    capa(B, tc) {
      // A capa: o perfil parado de 2023 gigante, a dona desanimada e o Léo surpreso, descobrindo a oportunidade
      perfilG.visible = true;
      desenharPerfil(true, 0);
      donaNaPorta(PERFIL);
      dona.reagir('triste', 0.6);
      menino.colocar([-17.4, G, 5.0], PERFIL);
      menino.reagir('surpreso', 0.6);
      K.filmar([PERFIL, mais(DONA, [0, 0.8, 0]), [-17.4, G + 0.8, 5.0]], 'parado', 0, { plano: 'medio', lado: 15, tam: 1.6, espacoCima: 0.35 });
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
    perfilG.visible = false;
    agendaG.visible = false;
    celG.visible = false;
    celG.scale.setScalar(1);
    calG.visible = false;
    fx.folhas.forEach((f) => { f.visible = false; });
    coracaoG.visible = false;
    lupaG.visible = false;
    lupaG.scale.setScalar(1);
    interrogaG.visible = false;
    perfisG.visible = false;
    relogioG.visible = false;
    listaG.visible = false;
    envelope.visible = false;
    balaoG.visible = false;
    caixasG.visible = false;
    navG.visible = false;
    pins.visible = false;
    fx.comenta.visible = false;
    const i = ordem.indexOf(B.plano);
    if (i >= 0 && i >= ordem.indexOf('busca')) { telaMappoa(); desenharLista(16, 1, '200+'); } else telaPerfis(0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
