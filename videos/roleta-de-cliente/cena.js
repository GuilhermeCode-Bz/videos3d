// Três vídeos sobre a DIFICULDADE DE ACHAR CLIENTE, no formato do megafone e da barba (os que mais levaram gente pro
// link da bio): gancho com imagem absurda, a dor do próprio web designer, um gesto de virada, "digita mappoa.com e vem a
// lista das X de Y sem site", "Esse é o Mappoa", Antes x Agora e "comenta a sua cidade". A ideia dos três: o cliente
// pode estar em QUALQUER cidade, escolhido pelo nicho e pelo lugar, não só nas lojas perto de casa.
// Este mesmo arquivo serve pros três vídeos: só muda a linha VID abaixo ('rua', 'cidade' ou 'roleta').
//   rua    (preso-na-rua):      o Caio acorrentado num poste da rua, só alcança 3 lojas; quebra a corrente
//   cidade (cidade-pequena):    o Lucas gigante numa cidade que cabe no quintal; desfaz a mala da capital
//   roleta (roleta-de-cliente): o Rafa escolhe cliente numa roleta gigante; trava a roleta em barbearias
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const VID = 'roleta';
  const PI = Math.PI;

  const CFGS = {
    rua: {
      nome: 'Caio', nicho: 'Pet shops', uf: 'MG', cidade: 'Belo Horizonte', total: 120, sem: 47, nota: '1 LANCHE', masc: true,
      etTotal: '120 pet shops', etSem: '47 sem site', wNicho: 'pet', wCidade: 'Belo',
      itens: [
        { nome: 'Pet Shop Patas & Cia', end: 'Rua da Bahia, 1020', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Banho e Tosa Lulu', end: 'Av. Afonso Pena, 3311', chips: ['whats', 'tel'] },
        { nome: 'Mundo Pet Savassi', end: 'Rua Pernambuco, 640', chips: ['whats'] },
        { nome: 'Casa do Bicho BH', end: 'Av. Amazonas, 2208', chips: ['tel', 'insta'] }
      ],
      abre: 'Pet Shop Patas & Cia', score: 0.86,
      dores: ['Sem site: só tem Instagram', 'Cliente não acha o horário do banho e tosa'], oport: ['Site com agendamento pelo WhatsApp'],
      obj: '"Meus clientes já me conhecem"', abord: 'Elogie as avaliações no Maps e mostre quem procura pet shop no Google.',
      msg: 'Oi! Vi que o Patas & Cia tem ótimas avaliações em BH, mas ainda não tem site. Faço sites pra pet shops. Posso te mostrar uma ideia?',
      cidades: ['Belo Horizonte', 'Recife', 'Porto Alegre', 'Salvador', 'Campinas', 'Manaus'],
      cta: 'Comenta a <em>sua cidade</em>'
    },
    cidade: {
      nome: 'Lucas', nicho: 'Clínicas odontológicas', uf: 'PR', cidade: 'Curitiba', total: 150, sem: 52, nota: '1 AÇAÍ', masc: false,
      etTotal: '150 clínicas', etSem: '52 sem site', wNicho: 'clínicas', wCidade: 'Curitiba',
      itens: [
        { nome: 'Clínica Sorriso Batel', end: 'Av. do Batel, 1550', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Odonto Água Verde', end: 'Rua Brasílio Itiberê, 820', chips: ['whats', 'tel'] },
        { nome: 'Dente Feliz Centro', end: 'Rua XV de Novembro, 300', chips: ['whats'] },
        { nome: 'OdontoVida Portão', end: 'Av. República Argentina, 2100', chips: ['tel', 'insta'] }
      ],
      abre: 'Clínica Sorriso Batel', score: 0.9,
      dores: ['Sem site: o paciente não acha os tratamentos', 'Agenda só por telefone'], oport: ['Site com os tratamentos e botão do WhatsApp'],
      obj: '"Já tenho Instagram"', abord: 'Mostre quantas pessoas procuram dentista no Batel pelo Google.',
      msg: 'Oi! Vi que a Clínica Sorriso Batel tem ótimas avaliações em Curitiba, mas ainda não tem site. Faço sites pra clínicas. Posso te mostrar uma ideia?',
      cidades: ['Curitiba', 'São Paulo', 'Florianópolis', 'Goiânia', 'Fortaleza', 'Brasília'],
      cta: 'Comenta a <em>sua cidade</em>'
    },
    roleta: {
      nome: 'Rafa', nicho: 'Barbearias', uf: 'GO', cidade: 'Goiânia', total: 90, sem: 38, nota: '1 CORTE', masc: false,
      etTotal: '90 barbearias', etSem: '38 sem site', wNicho: 'barbearias', wCidade: 'Goiânia',
      itens: [
        { nome: 'Barbearia Navalha de Ouro', end: 'Av. T-63, 1290', chips: ['whats', 'tel', 'insta'] },
        { nome: 'Dom Bigode Barber', end: 'Rua 9, 455', chips: ['whats', 'tel'] },
        { nome: 'Corte Fino Setor Bueno', end: 'Av. T-4, 812', chips: ['whats'] },
        { nome: 'Barba Negra Goiânia', end: 'Av. 85, 2140', chips: ['tel', 'insta'] }
      ],
      abre: 'Barbearia Navalha de Ouro', score: 0.88,
      dores: ['Sem site: só tem Instagram', 'Agendamento só pelo direct'], oport: ['Site com agendamento e os cortes'],
      obj: '"O pessoal marca pelo direct"', abord: 'Mostre o seu portfólio de barbearias e quem procura barbearia no Google.',
      msg: 'Oi! Vi que a Navalha de Ouro tem ótimas avaliações em Goiânia, mas ainda não tem site. Faço sites só pra barbearias. Posso te mostrar uma ideia?',
      cidades: ['Goiânia', 'Campinas', 'Recife', 'Curitiba', 'Belém', 'Natal'],
      cta: 'Comenta a <em>sua cidade</em>'
    }
  };
  const CFG = CFGS[VID];

  let bl, CS, M, menino, robo, comp, cadeira, nota, moeda, navG, buscaP, listaP, telaM, telaQ, mapaP, FOV0;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office de dia): o computador no meio, virado pra +z; a tela do Mappoa flutua à esquerda do monitor
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02], MAPA_Q = [0.95, 2.0, -1.3];
  const LISTA_C = [-0.2, 1.7, 0.8];
  // Rua (rua_predios): o poste no meio do calçadão, entre a padaria (esq., z 12,9), a farmácia (esq., z 6,9) e o mercado (dir., z 10,1)
  const POSTE = [0.3, 0, 9.4], CORR = 4.0;
  const PLACA = { padaria: [-4.9, 3.0, 12.9], farmacia: [-4.9, 3.0, 6.9], mercado: [4.9, 3.0, 10.1] };
  // Maquete (cidade_maquete): o personagem no quarteirão vazio do meio; os telhados das lojas
  const OF_MQ = [[3.4, 3.4, 0], [-3.4, 3.4, -3.4], [3.4, 3.4, -3.4], [0, 3.4, -6.8], [-3.4, 3.4, 3.4], [6.8, 3.4, -6.8], [-6.8, 3.4, 0], [6.8, 3.4, 3.4]];
  // Palco (palco_show): a roleta em pé à esquerda; o Rafa à direita
  const ROL = [-1.5, 2.4, -1.6], RAIO = 1.75, RAFA = [1.35, 0, 0.4];
  const FATIAS = ['PADARIA', 'OFICINA', 'PET SHOP', 'SALÃO', 'MERCADO', 'ÓTICA'];
  const COR_FAT = ['#f39a1e', '#1067f8', '#2fb54a', '#d85a8a', '#e8352b', '#8a4fd8'];

  const LUGAR = {
    rua: { gancho: 'rua', ape: 'rua', lojas: 'rua', capa: 'rua' },
    cidade: { gancho: 'maquete', oito: 'maquete', nao: 'maquete', virada: 'quarto', capa: 'maquete' },
    roleta: { gancho: 'palco', qualquer: 'palco', portfolio: 'quarto', virada: 'palco', capa: 'palco' }
  }[VID];
  const LUGAR_COMUM = { investe: 'quarto', mappoa: 'mundo_mappoa', analise: 'quarto', segue: 'quarto', cartao: 'quarto' };
  function lugarDe(B, tc) {
    if (VID === 'rua' && B.plano === 'virada') return tc < quando('qualquer', B, 0.75) ? 'rua' : 'maquete';
    if (VID === 'cidade' && B.plano === 'nao') return tc < quando('mala', B, 0.82) - 0.1 ? 'maquete' : 'quarto';
    if (B.plano === 'lista') return tc < quando('vem', B, 0.5) ? 'quarto' : 'central_mappoa';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.5) ? { rua: 'rua', cidade: 'maquete', roleta: 'palco' }[VID] : 'quarto';
    return LUGAR[B.plano] || LUGAR_COMUM[B.plano] || 'quarto';
  }

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
    if (!g.parent) K.scene.add(g);
    K.lugar(g);
    if (nome) K.nomear(nome, g);
    tudo.push(g);
    return obj;
  }
  const rr = (c, x, y, w, h, r, f) => { c.fillStyle = f; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); };
  const txt = (c, s, x, y, tam, cor, peso = 800, al = 'left', max) => { c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y, max); };
  function folha(l, a, px, desenho) {
    const cv = document.createElement('canvas'); cv.width = px; cv.height = Math.round((px * a) / l);
    desenho(cv.getContext('2d'), cv.width, cv.height);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }

  // ---------- Telas desenhadas ----------
  function telas() {
    const T = K.telasMappoa;
    T.buscaV = (c, w, h, e) => T.busca(c, w, h, { nicho: CFG.nicho, estado: CFG.uf, cidade: CFG.cidade, qtd: 'Todos os leads disponíveis', digitado: e.digitado, apertado: e.apertado });
    T.listaV = (c, w, h, e) => {
      const itens = CFG.itens.map((o) => Object.assign({}, o, { chips: e.chips ? o.chips : [] }));
      const k = e.total / CFG.total;
      T.lista(c, w, h, { total: e.total, comSite: Math.round((CFG.total - CFG.sem) * k), semSite: Math.round(CFG.sem * k), grupo: e.sem ? 'SEM SITE' : 'COM SITE', itens, n: e.n, sel: e.sem ? 0 : -1 });
    };
    T.analiseV = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, { nome: CFG.abre, ate: e.ate, aderencia: CFG.score * k, dores: CFG.dores, oportunidades: CFG.oport, objecoes: [CFG.obj], abordagem: CFG.abord });
      if (e.ate >= 0) txt(c, Math.round(CFG.score * 100 * k) + '/100', w - 38, 216, 30, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.mensagemV = (c, w, h, e) => T.mensagem(c, w, h, { para: 'WhatsApp: ' + CFG.abre, digitado: e.digitado, texto: CFG.msg });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };
    // O mapa das cidades (o Agora): pinos verdes com o nome de cada cidade
    T.mapaCidades = (c, w, h, e) => {
      c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#ffffff'; c.lineWidth = 12; [0.3, 0.55, 0.8].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.05)); c.stroke(); });
      rr(c, 0, 0, w, 86, 0, '#0b1b3a'); txt(c, CFG.nicho + ' sem site', 28, 44, 34, '#fff', 900, 'left', w - 56);
      const P2 = [[0.25, 0.22], [0.7, 0.3], [0.35, 0.47], [0.75, 0.58], [0.3, 0.72], [0.68, 0.86]];
      P2.slice(0, e.n || 0).forEach(([x, y], i) => {
        const px = w * x, py = h * y, r = 22;
        c.fillStyle = '#00bc7b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.7); c.closePath(); c.fill();
        c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
        txt(c, CFG.cidades[i], px, py + 34, 26, '#0b1b3a', 900, 'center');
      });
    };
    // Os 5 sites do portfólio do Rafa, cada um num estilo (roleta)
    const ESTILOS = [['#f39a1e', '#fff4e0', 'PADARIA', 'serif'], ['#1e1f22', '#f5c518', 'OFICINA', 'Montserrat'], ['#2fb54a', '#eaffef', 'PET SHOP', 'cursive'], ['#d85a8a', '#ffe6f0', 'SALÃO', 'serif'], ['#3a6fd8', '#e6efff', 'ÓTICA', 'monospace']];
    ESTILOS.forEach(([a, b, nome, fonte], i) => {
      T['site' + i] = (c, w, h) => {
        c.fillStyle = b; c.fillRect(0, 0, w, h); rr(c, 0, 0, w, h * 0.3, 0, a);
        c.font = `900 ${Math.round(h * 0.14)}px ${fonte}`; c.fillStyle = i === 1 ? '#f5c518' : '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(nome, w / 2, h * 0.15);
        for (let k = 0; k < 3; k++) rr(c, w * 0.1, h * (0.42 + k * 0.13), w * (0.8 - k * 0.15), h * 0.07, 8, 'rgba(0,0,0,.18)');
        if (i % 2) { c.fillStyle = a; c.beginPath(); c.arc(w * 0.8, h * 0.82, h * 0.09, 0, 7); c.fill(); } else rr(c, w * 0.1, h * 0.8, w * 0.35, h * 0.1, 30, a);
      };
    });
  }
  function telaMapa(c, w, h, e) { K.telasMappoa.mapaCidades(c, w, h, e); }

  // ---------- A corrente (rua): elos de um ponto ao outro, com barriga; quebra = os elos voando ----------
  const N_ELOS = 34;
  function fazCorrente() {
    const g = new THREE.Group(), mc = K.mat(0x9aa0a6, { metalness: 0.75, roughness: 0.3 });
    const geo = new THREE.TorusGeometry(0.075, 0.02, 8, 16); geo.scale(1.4, 1, 1); geo.rotateY(PI / 2);
    for (let i = 0; i < N_ELOS; i++) g.add(K.malha(geo, mc));
    return g;
  }
  function correnteEm(a, b, folga, quebra = -1) {
    ve(fx.corr);
    const pts = [];
    for (let i = 0; i < N_ELOS; i++) { const u = i / (N_ELOS - 1); pts.push(V(K.lerp(a[0], b[0], u), K.lerp(a[1], b[1], u) - folga * 4 * u * (1 - u), K.lerp(a[2], b[2], u))); }
    fx.corr.children.forEach((e, i) => {
      const p = pts[i], n = pts[Math.min(N_ELOS - 1, i + 1)].clone(); if (i === N_ELOS - 1) n.add(p.clone().sub(pts[i - 1]));
      e.position.copy(p); e.lookAt(n); e.rotateZ(i % 2 ? PI / 2 : 0);
      if (quebra >= 0) {
        const s = Math.sin(i * 12.9898) * 43758.5453, r = s - Math.floor(s), q = quebra;
        e.position.x += (r - 0.5) * 3 * q; e.position.z += (Math.cos(i) * 1.5) * q;
        e.position.y = Math.max(0.03, p.y + (2.5 + r * 2) * q - 6 * q * q);
        e.rotation.x += q * 9 * r;
      }
    });
  }
  // A corrente presa no tornozelo do Caio (ou no chão, quebrada)
  const tornozelo = () => { menino.g.updateMatrixWorld(true); const p = menino.g.position; return [p.x, 0.16, p.z]; };
  function preso(folga = 0.15) { ve(fx.poste, fx.cad); correnteEm([POSTE[0], 0.95, POSTE[2]], tornozelo(), folga); }
  // Onde ele fica no fim da corrente, olhando pra um ponto
  function noFim(alvo, frac = 1) {
    const d = V(alvo[0] - POSTE[0], 0, alvo[2] - POSTE[2]).normalize().multiplyScalar(CORR * frac);
    return [POSTE[0] + d.x, 0, POSTE[2] + d.z];
  }

  // ---------- A roleta (palco): o disco com as fatias, girando em z; a seta em cima ----------
  function fazRoleta() {
    const g = new THREE.Group();
    const cv = document.createElement('canvas'); cv.width = cv.height = 1024; fx.rolCv = cv;
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; fx.rolTex = t;
    const disco = new THREE.Mesh(new THREE.CircleGeometry(RAIO, 64), new THREE.MeshBasicMaterial({ map: t, toneMapped: false }));
    disco.position.z = 0.09; g.add(disco); fx.disco = disco;
    const aro = K.malha(new THREE.CylinderGeometry(RAIO + 0.12, RAIO + 0.12, 0.16, 64).rotateX(PI / 2), K.mat(0xf5c518, { metalness: 0.6, roughness: 0.3 })); g.add(aro);
    for (let i = 0; i < 24; i++) { const a = (i / 24) * PI * 2, l = K.malha(new THREE.SphereGeometry(0.05, 10, 8), K.mat(0xffffff, { emissive: 0xfff2c4, emissiveIntensity: 1 })); l.position.set(Math.sin(a) * (RAIO + 0.12), Math.cos(a) * (RAIO + 0.12), 0.1); g.add(l); }
    const miolo = K.malha(new THREE.CylinderGeometry(0.22, 0.22, 0.12, 24).rotateX(PI / 2), K.mat(0x1e1f22)); miolo.position.z = 0.14; g.add(miolo);
    const seta = K.malha(new THREE.ConeGeometry(0.2, 0.45, 16).rotateZ(PI), K.mat(0xe8352b, { roughness: 0.4 })); seta.position.set(0, RAIO + 0.35, 0.2); g.add(seta);
    const pe = K.malha(new THREE.CylinderGeometry(0.09, 0.14, ROL[1], 12), K.mat(0x2a2e36)); pe.position.set(0, -ROL[1] / 2, -0.15); g.add(pe);
    pintaRoleta(false);
    return g;
  }
  function pintaRoleta(barbearia) {
    if (fx.rolPintada === barbearia) return; fx.rolPintada = barbearia;
    const c = fx.rolCv.getContext('2d'), w = 1024, r = 512;
    c.clearRect(0, 0, w, w);
    for (let i = 0; i < 6; i++) {
      // fatia i centrada no ângulo i * 60° (horário, a partir do topo)
      const a0 = -PI / 2 + (i - 0.5) * (PI / 3), a1 = a0 + PI / 3;
      c.fillStyle = barbearia ? (i % 2 ? '#e8352b' : '#1067f8') : COR_FAT[i];
      c.beginPath(); c.moveTo(r, r); c.arc(r, r, r, a0, a1); c.closePath(); c.fill();
      c.strokeStyle = '#ffffff'; c.lineWidth = 10; c.stroke();
      c.save(); c.translate(r, r); c.rotate(i * (PI / 3)); c.font = '900 64px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(barbearia ? 'BARBEARIA' : FATIAS[i], 0, -r * 0.62, r * 0.75); c.restore();
    }
    fx.rolTex.needsUpdate = true;
  }
  // Ângulo pra fatia i ficar embaixo da seta (com voltas a mais)
  const angFatia = (i, voltas = 0) => i * (PI / 3) + voltas * PI * 2;
  function roletaEm(ang) { ve(fx.rol); fx.disco.rotation.z = ang; }

  // ---------- A mala (cidade): a mala aberta com as roupas pulando pra dentro ----------
  function fazMala() {
    const g = new THREE.Group(), cor = K.mat(0x8a4fd8, { roughness: 0.5 }), esc = K.mat(0x5a2fa0, { roughness: 0.5 });
    const base = K.malha(new THREE.BoxGeometry(1.1, 0.32, 0.7), cor); base.position.y = 0.16; g.add(base);
    const tampa = new THREE.Group(); tampa.position.set(0, 0.32, -0.35); g.add(tampa); fx.tampa = tampa;
    const tm = K.malha(new THREE.BoxGeometry(1.1, 0.08, 0.7), cor); tm.position.set(0, 0.04, 0.35); tampa.add(tm);
    const alca = K.malha(new THREE.TorusGeometry(0.12, 0.025, 8, 16, PI), esc); alca.position.set(0, 0.08, 0.72); alca.rotation.x = -PI / 2; tampa.add(alca);
    fx.roupas = [0xe8352b, 0x2f6fd6, 0xf5c518, 0x2fb54a].map((c, i) => { const r = K.malha(new THREE.BoxGeometry(0.4, 0.08, 0.3), K.mat(c, { roughness: 0.8 })); g.add(r); return r; });
    return g;
  }
  const MALA = [0.9, 0, 0.25];
  function malaEm(aberta, roupasK, tc) {
    ve(fx.mala); fx.tampa.rotation.x = -aberta * 1.9;
    fx.roupas.forEach((r, i) => {
      const q = K.clamp(roupasK * 4 - i);
      r.visible = q > 0;
      r.position.set(K.lerp(-1.4 + i * 0.2, (i % 2 ? 0.2 : -0.2), q), K.lerp(1.8, 0.36 + i * 0.07, q) + Math.sin(q * PI) * 0.6, K.lerp(0.6, 0, q));
      r.rotation.set(0, (1 - q) * 5 + i, (1 - q) * 3);
    });
    void tc;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    M = K.MAPPOA;
    const lista = [['home_office', {}, 'quarto'], 'central_mappoa', 'mundo_mappoa'];
    if (VID === 'rua') lista.push(['rua_predios', {}, 'rua'], ['cidade_maquete', {}, 'maquete']);
    if (VID === 'cidade') lista.push(['cidade_maquete', {}, 'maquete']);
    if (VID === 'roleta') lista.push(['palco_show', { texto: 'QUAL CLIENTE?' }, 'palco']);
    CS = K.cenarios(lista);
    telas();

    // O personagem (as cores do canal) e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cadeira, a nota do investimento e a moeda, a barra do navegador, a busca, a tela e o mapa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    nota = folha(0.46, 0.22, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#5fb86a'); c.strokeStyle = '#2f7a3a'; c.lineWidth = 6; c.beginPath(); c.roundRect(8, 8, w - 16, h - 16, 10); c.stroke();
      txt(c, CFG.nota, w / 2, h * 0.5, h * 0.3, '#ffffff', 900, 'center', w * 0.86);
    });
    guarda(nota, 'nota');
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, null);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    buscaP = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(buscaP, 'busca', TELA_Q);
    telaQ = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaQ, 'tela', TELA_Q);
    mapaP = K.painelMappoa(1.5, 1.9, { px: 700 }); mapaP.g.rotation.y = -0.45; guarda(mapaP, 'mapa', MAPA_Q);
    listaP = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(listaP, 'lista', LISTA_C);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Rua: o poste, a corrente e o cadeado; o anel gasto no chão
    if (VID === 'rua') {
      const p = new THREE.Group(), mp = K.mat(0x2f3540, { metalness: 0.3, roughness: 0.5 });
      const haste = K.malha(new THREE.CylinderGeometry(0.08, 0.11, 4.4, 10), mp); haste.position.y = 2.2; p.add(haste);
      const lamp = K.malha(new THREE.SphereGeometry(0.28, 16, 12), K.mat(0xfff2c4, { emissive: 0xffd88a, emissiveIntensity: 0.4 })); lamp.position.y = 4.5; p.add(lamp);
      fx.poste = guarda(p, 'poste', POSTE);
      fx.corr = new THREE.Group(); K.scene.add(fx.corr); K.nomear('corrente', fx.corr); tudo.push(fx.corr);
      fx.corr.add(...fazCorrente().children.slice());
      fx.cad = K.m3d('corrente_cadeado', { comp: 0.01 });
      fx.cad.children.forEach((c, i) => { if (i < 1) c.visible = false; });
      guarda(fx.cad, 'cadeado', [POSTE[0], 0.55, POSTE[2] + 0.12]);
      fx.anel = K.malha(new THREE.RingGeometry(CORR - 0.25, CORR + 0.1, 64).rotateX(-PI / 2), K.mat(0x9a8f7c, { roughness: 1 }), false);
      guarda(fx.anel, null, [POSTE[0], 0.012, POSTE[2]]);
    }
    if (VID === 'rua' || VID === 'cidade') {
      fx.pinos = OF_MQ.map((p, i) => guarda(K.pinoMappoa(i < 3 && VID === 'cidade' ? '#e8352b' : '#00bc7b', 1.0), 'pinos', p));
    }
    if (VID === 'cidade') fx.mala = guarda(fazMala(), 'mala', MALA);
    if (VID === 'roleta') {
      fx.rol = guarda(fazRoleta(), 'roleta', ROL);
      fx.sites = [0, 1, 2, 3, 4].map((i) => guarda(K.painelMappoa(0.8, 0.6, { px: 500, borda: '#c3c8d0' }), 'portfolio'));
      fx.cel = K.m3d('celular_gigante'); guarda(fx.cel, 'celular', [0.55, 0, 0.2]);
      fx.estr = K.estrelinhas();
    }

    // Efeitos
    fx.cont = K.contador();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo(); fx.simb4 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.vel = K.velocidade();
    fx.lascas = K.lascas(4, 0x9aa0a6, 18);
    fx.pens = K.balaoPensamento();
    fx.grana = K.chuvaDinheiro();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      web: e('Web designer', 'azul'), chave: e('A chave é sua', 'verde'), ape: e('Só a pé', 'laranja'),
      padaria: e('Padaria: já tem site', 'laranja'), farmacia: e('Farmácia: não', 'vermelho'), mercado: e('Mercado: nem atendeu', 'vermelho'),
      internet: e('Pela internet', 'verde'), qualquer: e('Qualquer cidade', 'verde'),
      quintal: e('Cabe no quintal', 'laranja'), oito: e('8 mil pessoas', 'azul'), rua1: e('1 rua de comércio', 'laranja'),
      todos: e('Todo mundo: não', 'vermelho'), capital: e('Capital?', 'laranja'), semMudar: e('Sem se mudar', 'verde'),
      giro: e('Cliente na sorte', 'laranja'), zero: e('Do zero, toda vez', 'laranja'), cinco: e('5 estilos?', 'vermelho'), confia: e('Ninguém confia', 'vermelho'),
      nicho: e('Um nicho só', 'verde'),
      investir: e('Investir', 'azul'), total: e(CFG.etTotal, 'azul'), sem: e(CFG.etSem, 'verde'), quem: e('Quem precisa de você', 'verde'),
      nota: e('Nota ' + Math.round(CFG.score * 100), 'verde'), whats: e('WhatsApp', 'verde'), msg: e('Mensagem pronta', 'azul'),
      antes: e('Antes', 'vermelho'), agora: e('Agora', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta(CFG.cta);
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  function cadeiraDoLado() { ve(cadeira); cadeira.position.set(-1.6, 0, -0.75); cadeira.rotation.set(0, 0.6, 0); }
  const mapaEm = (n) => { ve(mapaP); mapaP.mostrar('mapaCidades', { n }); };
  // Câmeras fixas do quarto: de lado e de trás do monitor (o rosto)
  const camLado = (q) => K.mirar([K.lerp(2.75, 2.5, q), 1.7, K.lerp(-0.55, -0.75, q)], [-0.5, 1.3, -0.7]);
  const camRosto = (q) => (mapaP.g.visible = false, K.mirar([K.lerp(1.55, 1.45, q), 1.55, K.lerp(-2.95, -2.85, q)], [-0.4, 1.05, -0.55]));
  // Câmera que olha um ponto, de um ponto relativo a ele
  const olhar = (alvo, d, q = 0, d2) => K.mirar(mais(alvo, d2 ? [K.lerp(d[0], d2[0], q), K.lerp(d[1], d2[1], q), K.lerp(d[2], d2[2], q)] : d), alvo);

  // ---------- Os planos de cada vídeo (gancho até a virada) ----------
  const PV = {};

  // ===== RUA (preso-na-rua) =====
  PV.rua = {
    gancho(B, tc) {
      // NA TELA: a rua de lojas; o Caio correndo pra câmera e a corrente esticando até o poste; o tranco joga ele no chão; ele mostra a chave no bolso · MOSTRA: personagem, corrente, poste
      // CENÁRIO: rua_predios de dia, gente andando nas calçadas (o cenário cuida)
      // o tranco vem logo no começo (0,6 s): os 6 primeiros segundos são onde mais gente sai
      const tPr = Math.min(quando('preso', B, 0.25), B.inicio + 0.6), tRu = quando('rua', B, 0.45), tCh = quando('chave', B, 0.7), tBo = quando('bolso', B, 0.9);
      const c1 = B.inicio + 0.7, c2 = Math.max(c1 + 0.45, tPr + 0.2), c3 = Math.max(c2 + 0.5, tRu + 0.3);
      // PERSONAGEM: começo correndo pra câmera · em "preso" a corrente estica e ele cai de costas · em "chave": senta e tira a chave do bolso, sem graça
      const corre = pc(tc, B.inicio, tPr);
      const fim = noFim([POSTE[0] + 0.4, 0, POSTE[2] + 10]);
      if (tc < tPr) {
        menino.colocar([K.lerp(POSTE[0] + 0.35, fim[0], corre), 0, K.lerp(POSTE[2] + 1.8, fim[2], corre)], [fim[0], 1, fim[2] + 5]);
        menino.correr(tc, 1.4); menino.humor('feliz'); preso(K.lerp(0.35, 0.05, corre));
      } else if (tc < tCh) {
        menino.colocar(fim, [fim[0], 1, fim[2] + 5]); menino.cair(K.clamp((tc - tPr) / 0.4)); menino.humor('assustado'); preso(0.02);
      } else {
        menino.colocar(fim, [fim[0] + 0.5, 1.2, fim[2] + 5]); menino.reagir('cai_sentado', tc - tCh); menino.humor('triste'); preso(0.1);
      }
      // EFEITOS VISUAIS: "Web designer" no começo · o "!" no tranco · "A chave é sua" em "bolso"
      if (tc < tCh) fx.et.web.em({ tela: [540, 430] }, tc - B.inicio - 0.1);
      fx.simb.em(cabecaDe(menino, 0.4), tc - tPr, { tipo: '!', tam: 0.9 });
      fx.et.chave.em(cabecaDe(menino, 0.8), tc - tBo);
      // SONS: passos correndo · o tranco da corrente (baque) · tilintar
      for (let k = 0; k < 5; k++) K.som('passo', B.inicio + k * 0.16, 0.3);
      K.som('baque', tPr, 0.8); K.som('pingo', tPr + 0.05, 0.5); K.som('pingo', tBo, 0.5);
      // CÂMERA: 4 cortes: (1) aberto, ele correndo pra câmera · (2) o cadeado no poste esticando · (3) ele caindo · (4) ele sentado olhando pra câmera
      // (1) de perto, ele correndo pra câmera e a corrente esticando atrás · (2) de trás do poste, a corrente inteira esticada até ele
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([fim[0] + 0.5, 1.5, fim[2] + K.lerp(3.6, 3.1, q)], [fim[0], 1.0, fim[2] - 1.4]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([POSTE[0] + K.lerp(1.3, 1.0, q), 3.0, POSTE[2] - 2.2], [fim[0], 0.5, fim[2] - 0.6]); }
      else if (tc < c3) olhar(mais(fim, [0, 0.6, 0]), [1.6, 1.4, 3.2], pc(tc, c2, c3), [1.3, 1.1, 2.8]);
      else olhar(mais(fim, [0, 0.7, 0]), [0.3, 1.0, 2.6], pc(tc, c3, B.ate), [0.3, 0.9, 2.3]);
    },
    ape(B, tc) {
      // NA TELA: vista de cima: o Caio andando em círculo em volta do poste, no fim da corrente; o anel gasto no chão · MOSTRA: personagem, corrente, poste
      const tOf = quando('oferece', B, 0.2), tLo = quando('lojas', B, 0.55), tPe = quando('pé', B, 0.92);
      ve(fx.anel);
      // PERSONAGEM: andando em círculo (a corrente esticada) · em "pé": para e olha o próprio pé, bufando
      const a = 0.4 + pc(tc, B.inicio, tPe) * PI * 1.3;
      const pos = [POSTE[0] + Math.sin(a) * (CORR - 0.1), 0, POSTE[2] + Math.cos(a) * (CORR - 0.1)];
      if (tc < tPe) { menino.colocar(pos, [pos[0] + Math.cos(a), 0, pos[2] - Math.sin(a)]); menino.andar(tc, 1); menino.humor('triste'); }
      else { menino.colocar(pos, [pos[0], 0, pos[2] + 4]); menino.reagir('mao_na_testa', tc - tPe); menino.humor('triste'); }
      preso(0.03);
      // EFEITOS VISUAIS: "Só a pé" em "pé"
      fx.et.ape.em(cabecaDe(menino, 0.7), tc - tPe);
      // SONS: passos · errado em "pé"
      for (let k = 0; k < 8; k++) K.som('passo', B.inicio + 0.2 + k * 0.35, 0.25);
      K.som('errado', tPe, 0.3); void tOf; void tLo;
      // CÂMERA: (1) até "lojas": descendo do alto, o círculo inteiro · (2) seguindo ele de perto, de frente
      if (tc < tLo) { const q = K.suave(pc(tc, B.inicio, tLo)); K.mirar([K.lerp(0.4, 0.5, q), K.lerp(11, 8.5, q), POSTE[2] + K.lerp(8.5, 7.5, q)], [POSTE[0], 0.3, POSTE[2]]); }
      else { const c = mais(menino.g.position.toArray(), [0, 1.0, 0]); K.mirar([c[0] * 0.3 + 0.3, 1.6, c[2] + 3.2], c); }
    },
    lojas(B, tc) {
      // NA TELA: as 3 lojas que ele alcança: a padaria com "já tem site", a farmácia com o ✗, o mercado com a porta fechada · MOSTRA: personagem, corrente
      const tPa = quando('padaria', B, 0.05), tFa = quando('farmácia', B, 0.35), tMe = quando('mercado', B, 0.68), tAt = quando('atendeu', B, 0.9);
      // PERSONAGEM: esticado na corrente na direção de cada loja, apontando · em "atendeu": braços caídos (ombros)
      const alvo = tc < tFa ? PLACA.padaria : tc < tMe ? PLACA.farmacia : PLACA.mercado;
      const pos = noFim(alvo, 0.98);
      menino.colocar(pos, [alvo[0], 1.4, alvo[2]]);
      if (tc > tAt) menino.reagir('ombros', tc - tAt); else menino.reagir('chamando', tc - B.inicio);
      menino.humor(tc > tFa ? 'triste' : 'normal'); preso(0.02);
      // EFEITOS VISUAIS: a etiqueta de cada loja na sua palavra, com o ✗
      if (tc < tFa) fx.et.padaria.em(mais(PLACA.padaria, [1.0, 0.9, 0]), tc - tPa);
      else if (tc < tMe) { fx.et.farmacia.em(mais(PLACA.farmacia, [1.0, 0.9, 0]), tc - tFa); fx.simb.em(mais(PLACA.farmacia, [1.0, -0.4, 0]), tc - tFa - 0.3, { tipo: '✗', tam: 0.9 }); }
      else { fx.et.mercado.em(mais(PLACA.mercado, [-1.0, 0.9, 0]), tc - tMe); fx.simb.em(mais(PLACA.mercado, [-1.0, -0.4, 0]), tc - tAt, { tipo: '✗', tam: 0.9 }); }
      // SONS: estalo em cada loja · errado
      K.som('estalo', tPa, 0.4); K.som('errado', tFa + 0.3, 0.4); K.som('errado', tAt, 0.4);
      // CÂMERA: 3 cortes, um por loja, do meio da rua: a fachada inteira com ele esticado na corrente na frente (fora das árvores)
      if (tc < tFa) { const q = K.suave(pc(tc, B.inicio, tFa)); K.mirar([2.0, 2.3, K.lerp(17.8, 17.2, q)], [-3.3, 2.0, 12.4]); }
      else if (tc < tMe) { const q = K.suave(pc(tc, tFa, tMe)); K.mirar([K.lerp(0.9, 0.7, q), 2.4, 13.4], [-3.6, 2.0, 7.4]); }
      else { const q = K.suave(pc(tc, tMe, B.ate)); K.mirar([-0.5, 2.4, K.lerp(6.8, 7.2, q)], [4.3, 2.0, 10.0]); }
    },
    virada(B, tc) {
      // NA TELA: (1) o Caio puxa a corrente com força e ela estoura, os elos voando; (2) a cidade em maquete, ele gigante e os pinos verdes brotando em toda parte · MOSTRA: personagem
      const tQu = quando('quebra', B, 0.1), tCo = quando('corrente', B, 0.2), tIn = quando('internet', B, 0.5), tQq = quando('qualquer', B, 0.75), tCi = quando('cidade', B, 0.92);
      if (tc < tQq) {
        const pos = noFim([POSTE[0] + 0.5, 0, POSTE[2] + 10], 0.98);
        menino.colocar(pos, [pos[0], 1, pos[2] + 5]);
        // PERSONAGEM: começo puxando (empurrando ao contrário) · em "corrente": a corrente estoura e ele dá um pulo · em "internet": a ideia
        if (tc < tCo) { menino.reagir('empurrando', tc - B.inicio); preso(0.0); }
        else { ve(fx.poste, fx.cad); correnteEm([POSTE[0], 0.95, POSTE[2]], tornozelo(), 0.05, K.clamp((tc - tCo) / 0.8)); fx.cad.userData.m3d && fx.cad.userData.m3d.abrir(1); menino.reagir(tc > tIn ? 'ideia' : 'vitoria', tc - tCo); }
        menino.humor(tc > tCo ? 'feliz' : 'bravo');
        fx.lascas.em(mais(pos, [0, 0.2, -0.5]), tc - tCo, 0);
        fx.poof.em(mais(pos, [0, 0.3, -0.3]), tc - tCo, { escala: 0.5 });
        fx.et.internet.em(cabecaDe(menino, 0.8), tc - tIn);
        K.som('baque', tCo, 0.8); K.som('estrondo', tCo, 0.4); K.som('brilho', tIn, 0.5);
        // CÂMERA: (1) baixo, de frente, ele puxando · (2) afastando, a corrente estourando
        if (tc < tCo) olhar(mais(pos, [0, 0.8, 0]), [0.6, -0.2, 2.6]);
        else olhar(mais(pos, [0, 0.9, -0.8]), [0.4, 0.8, 3.4], pc(tc, tCo, tQq), [0.6, 1.4, 4.6]);
      } else {
        // CENÁRIO: cidade_maquete com os carrinhos
        menino.g.scale.setScalar(2.4); menino.colocar([0.05, 0.12, 2.2], [0, 2, -4]); menino.reagir('vitoria', tc - tQq); menino.humor('feliz');
        fx.pinos.forEach((p, j) => { const t0 = tQq + j * 0.09; if (tc > t0) { ve(p); p.em(tc, pop(tc - t0)); } });
        fx.et.qualquer.em({ tela: [540, 380] }, tc - tCi);
        for (let k = 0; k < 8; k++) K.som('estalo', tQq + k * 0.09, 0.25);
        // CÂMERA: (3) subindo · aberto, a cidade com os pinos
        const q = K.suave(pc(tc, tQq, B.ate)); K.mirar([K.lerp(2.0, 2.6, q), K.lerp(7.5, 10, q), K.lerp(14, 15.5, q)], [0, 2.4, -1.5]);
      }
    },
    antes(B, tc, tA) {
      // Antes: o Caio andando em volta do poste, preso
      ve(fx.anel);
      const a = 0.4 + (tc - B.inicio) * 1.2, pos = [POSTE[0] + Math.sin(a) * (CORR - 0.1), 0, POSTE[2] + Math.cos(a) * (CORR - 0.1)];
      menino.colocar(pos, [pos[0] + Math.cos(a), 0, pos[2] - Math.sin(a)]); menino.andar(tc, 0.8); menino.humor('triste'); preso(0.03);
      fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
      const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([0.5, K.lerp(7.5, 8.5, q), POSTE[2] + 7], [POSTE[0], 0.4, POSTE[2]]);
    },
    capa() {
      const fim = noFim([POSTE[0] + 0.4, 0, POSTE[2] + 10]);
      menino.colocar(fim, [fim[0] + 0.5, 1.2, fim[2] + 5]); menino.reagir('empurrando', 0.6); menino.humor('assustado'); preso(0.0);
      K.mirar([1.0, 2.2, fim[2] + 4.8], [0.4, 1.2, POSTE[2] + 2.0]);
    }
  };

  // ===== CIDADE (cidade-pequena) =====
  PV.cidade = {
    gancho(B, tc) {
      // NA TELA: a cidade inteira em miniatura e o Lucas gigante no meio dela, maior que os prédios; os carrinhos passando entre os pés · MOSTRA: personagem
      // CENÁRIO: cidade_maquete (os carrinhos)
      const tCi = quando('cidade', B, 0.15), tQu = quando('quintal', B, 0.42), tSo = quando('só', B, 0.7), tNe = quando('nela', B, 0.9);
      const c1 = B.inicio + 0.7, c2 = Math.max(c1 + 0.45, tQu), c3 = Math.max(c2 + 0.5, tSo);
      // PERSONAGEM: gigante (escala 6) · começo: olha pra baixo, as mãos na cintura · em "quintal": dá um passo e a cidade acaba · em "nela": coça a cabeça
      menino.g.scale.setScalar(6);
      menino.colocar([0, 0.12, 0], [2, 0, 6]);
      if (tc > tNe) menino.reagir('coca_cabeca', tc - tNe); else if (tc > tQu) menino.reagir('duvida', tc - tQu); else menino.reagir('pensando', tc - B.inicio);
      menino.humor('triste');
      // EFEITOS VISUAIS: "Web designer" · "Cabe no quintal" em "quintal"
      if (tc < tQu) fx.et.web.em({ tela: [540, 430] }, tc - B.inicio - 0.1); else fx.et.quintal.em({ tela: [540, 430] }, tc - tQu);
      // SONS: baque do passo gigante · whoosh
      K.som('baque', B.inicio + 0.1, 0.7); K.som('whoosh', tQu, 0.5); K.som('errado', tNe, 0.3);
      fx.ondaOk || (fx.onda = K.ondaChoque && K.ondaChoque(), fx.ondaOk = true);
      if (fx.onda) fx.onda.em([0, 0.15, 0], tc - B.inicio - 0.1, { raio: 4, som: false });
      // CÂMERA: 4 cortes: (1) do alto, a cidade inteira e ele · (2) no chão, entre os prédios, olhando pra cima (o gigante) · (3) o rosto · (4) aberto de lado
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(9, 8, q), K.lerp(16, 15, q), K.lerp(24, 22, q)], [0, 4.5, 0]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([K.lerp(11, 10.2, q), 1.4, K.lerp(14, 13.2, q)], [0, 5.2, 0]); }
      else if (tc < c3) { const q = K.suave(pc(tc, c2, c3)); K.mirar([K.lerp(4.5, 4.0, q), 9.5, K.lerp(19, 18, q)], [0, 6.2, 0]); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(14, 13, q), 8, K.lerp(13, 12, q)], [0, 4.5, 0]); }
    },
    oito(B, tc) {
      // NA TELA: o Lucas (gigante, escala 2,4) andando pela maquete; o contador de habitantes até 8.000; a rua de comércio · MOSTRA: personagem
      const tMo = quando('mora', B, 0.1), tOi = quando('oito', B, 0.35), tRu = quando('rua', B, 0.7), tSo = quando('só', B, 0.92);
      menino.g.scale.setScalar(2.4);
      // PERSONAGEM: andando pela rua da maquete · em "só": para e abre os braços (ombros)
      const pos = menino.irPara([1.7, 0.12, 5.5], [1.7, 0.12, -3.0], pc(tc, B.inicio, tSo), tc, { reto: true });
      if (tc > tSo) { menino.colocar([1.7, 0.12, -3.0], [6, 2, 6]); menino.reagir('ombros', tc - tSo); }
      menino.humor('normal');
      // EFEITOS VISUAIS: o contador 0 → 8.000 em "oito" · "1 rua de comércio" em "rua"
      fx.cont.em(mais(pos, [0, 5.4, 0]), tc - tOi, { de: 0, ate: 8000, dur: 0.8, antes: '', depois: ' pessoas', cor: '#1067f8' });
      fx.et.rua1.em({ tela: [540, 330] }, tc - tRu);
      K.som('whoosh', B.inicio + 0.1, 0.4); for (let k = 0; k < 5; k++) K.som('passo', B.inicio + 0.2 + k * 0.4, 0.3); void tMo;
      // CÂMERA: seguindo de frente, um pouco de cima
      const c = mais(menino.g.position.toArray(), [0, 2.5, 0]); K.mirar([c[0] + 3.5, c[1] + 3.2, c[2] + 9], c);
    },
    nao(B, tc) {
      // NA TELA: os pinos vermelhos na padaria, na farmácia e no mercado, cada um com o ✗; o Lucas gigante apontando; a mala surge aberta no quarto em "mala" · MOSTRA: personagem, pinos
      const tPa = quando('padaria', B, 0.18), tFa = quando('farmácia', B, 0.3), tMe = quando('mercado', B, 0.42), tNa = quando('não', B, 0.6), tMa = quando('mala', B, 0.82);
      if (tc < tMa - 0.1) {
        menino.g.scale.setScalar(2.4); menino.colocar([0.05, 0.12, 2.2], tc < tFa ? OF_MQ[0] : tc < tMe ? OF_MQ[1] : OF_MQ[2]);
        if (tc > tNa) menino.reagir('mao_na_testa', tc - tNa); else menino.apontar(0.4);
        menino.humor(tc > tNa ? 'triste' : 'normal');
        [tPa, tFa, tMe].forEach((t0, j) => { if (tc > t0) { ve(fx.pinos[j]); fx.pinos[j].em(tc, pop(tc - t0)); } });
        [fx.simb, fx.simb2, fx.simb3].forEach((s, j) => s.em(mais(OF_MQ[j], [0, 1.6, 0]), tc - tNa - j * 0.1, { tipo: '✗', tam: 1.2 }));
        fx.et.todos.em({ tela: [540, 380] }, tc - tNa);
        [tPa, tFa, tMe].forEach((t0) => K.som('estalo', t0, 0.4)); K.som('errado', tNa, 0.5);
        const q = K.suave(pc(tc, B.inicio, tMa)); K.mirar([K.lerp(4, 5, q), K.lerp(9.5, 10.5, q), K.lerp(12.5, 11.5, q)], [0.6, 2.6, -1.4]);
      } else {
        // a mala aberta (no quarto) com as roupas pulando dentro
        cadeiraDoLado(); ve(comp);
        malaEm(1, pc(tc, tMa - 0.1, B.ate + 0.2), tc);
        menino.colocar([1.7, 0, 0.3], MALA); menino.reagir('triste', tc - tMa); menino.humor('triste');
        fx.et.capital.em(mais(MALA, [0, 1.6, 0]), tc - tMa);
        K.som('whoosh', tMa, 0.4);
        olhar(mais(MALA, [0.3, 0.6, 0]), [0.6, 1.0, 3.0]);
      }
    },
    virada(B, tc) {
      // NA TELA: o quarto; o Lucas fecha a mala com um chute e ela tomba; as roupas voltam; o mapa com os pinos das capitais acende · MOSTRA: personagem, mala, mapa
      const tDe = quando('desfaz', B, 0.12), tMu = quando('mudar', B, 0.45), tCl = quando('cliente', B, 0.6), tIn = quando('internet', B, 0.92);
      cadeiraDoLado(); ve(comp);
      // OBJETOS SE MEXENDO: a tampa fecha em "desfaz" e a mala tomba de lado; as roupas voam pra fora
      const fecha = pc(tc, tDe, tDe + 0.35);
      malaEm(1 - fecha, 1 - pc(tc, tDe, tDe + 0.6), tc);
      if (tc > tDe + 0.35) K.falhar(fx.mala, 'tomba', tc - tDe - 0.35);
      // PERSONAGEM: começo chuta a mala (empurrando) · em "mudar": faz que não · em "internet": a ideia, apontando o mapa
      menino.colocar([1.6, 0, 0.6], tc > tCl ? MAPA_Q : MALA);
      if (tc > tCl) menino.reagir('ideia', tc - tCl); else if (tc > tMu) menino.reagir('nao', tc - tMu); else menino.reagir('empurrando', tc - B.inicio);
      menino.humor(tc > tMu ? 'feliz' : 'bravo');
      if (tc > tCl) { mapaEm(Math.min(6, 1 + Math.floor((tc - tCl) / 0.15))); K.entrar(mapaP.g, 'cresce', tc - tCl, { dur: 0.3 }); }
      comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n: tc > tCl ? 6 : 0 }), 'm' + (tc > tCl));
      // EFEITOS VISUAIS: "Sem se mudar" em "mudar" · "Pela internet" em "internet"
      if (tc < tIn) fx.et.semMudar.em(mais(MALA, [0, 1.4, 0]), tc - tMu); else fx.et.internet.em(mais(MAPA_Q, [0, 1.25, 0.2]), tc - tIn);
      fx.poof.em(mais(MALA, [0, 0.4, 0]), tc - tDe - 0.3, { escala: 0.5 });
      K.som('baque', tDe + 0.35, 0.7); K.som('brilho', tCl, 0.5); for (let k = 0; k < 6; k++) K.som('estalo', tCl + k * 0.15, 0.2);
      // CÂMERA: (1) baixo, de frente, a mala e ele · (2) chegando, ele e o mapa
      if (tc < tCl) K.filmar([menino, cabecaDe(menino, 0.3), fx.mala], 'chegando', pc(tc, B.inicio, tCl), { plano: 'medio', lado: -20, altura: 'olho', obstaculos: false, tam: 1.7 });
      else K.filmar([menino, cabecaDe(menino, 0.3), mapaP], 'chegando', pc(tc, tCl, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 2.0 });
    },
    antes(B, tc, tA) {
      menino.g.scale.setScalar(6); menino.colocar([0, 0.12, 0], [2, 0, 6]); menino.reagir('cansado', tc - B.inicio); menino.humor('triste');
      fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
      const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([K.lerp(8, 9, q), 15, K.lerp(22, 23, q)], [0, 4.5, 0]);
    },
    capa() {
      menino.g.scale.setScalar(6); menino.colocar([0, 0.12, 0], [3, 7, 20]); menino.reagir('coca_cabeca', 0.6); menino.humor('triste');
      K.mirar([8, 14, 22], [0, 5, 0]);
    }
  };

  // ===== ROLETA (roleta-de-cliente) =====
  PV.roleta = {
    gancho(B, tc) {
      // NA TELA: o palco de show; a roleta gigante girando rápido com as fatias (padaria, oficina, pet shop...); o Rafa empurrando e ficando tonto · MOSTRA: personagem, roleta
      // CENÁRIO: palco_show, refletores mexendo, o telão "QUAL CLIENTE?"
      const tRo = quando('roleta', B, 0.45), tGi = quando('girar', B, 0.75), tSe = quando('sempre', B, 0.92);
      const c1 = B.inicio + 0.7, c2 = Math.max(c1 + 0.45, tRo), c3 = Math.max(c2 + 0.5, tGi);
      pintaRoleta(false);
      // OBJETOS SE MEXENDO: a roleta girando sem parar (acelera no começo, gira o resto do tempo)
      roletaEm((tc - B.inicio) * 7 + Math.min(1, (tc - B.inicio) / 0.5) * 2);
      // PERSONAGEM: começo empurra a roleta · em "roleta": olha ela rodar, a cabeça girando · em "sempre": tonto, as estrelinhas
      menino.colocar(RAFA, tc < tRo ? ROL : [1.4, 1.4, 6]);
      if (tc > tSe) menino.reagir('duvida', tc - tSe); else if (tc > tRo) menino.reagir('surpreso', tc - tRo); else menino.reagir('empurrando', tc - B.inicio);
      menino.humor(tc > tGi ? 'assustado' : 'feliz');
      if (tc > tGi) fx.estr.em(cabecaDe(menino, 0.25), tc, { raio: 0.35 });
      // EFEITOS VISUAIS: "Web designer" · "Cliente na sorte" em "girar"
      if (tc < tGi) fx.et.web.em({ tela: [540, 430] }, tc - B.inicio - 0.1); else fx.et.giro.em({ tela: [540, 430] }, tc - tGi);
      // SONS: cliques da roleta · whoosh
      for (let k = 0; k < 14; k++) K.som('clique', B.inicio + k * 0.12, 0.2);
      K.som('whoosh', B.inicio + 0.05, 0.5); K.som('errado', tSe, 0.3);
      // CÂMERA: 4 cortes: (1) aberto, o palco e a roleta · (2) a roleta de perto girando · (3) o rosto do Rafa · (4) os dois, de lado
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([-0.2, 2.6, K.lerp(10.5, 9.5, q)], [-0.7, 2.2, -1]); }
      else if (tc < c2) olhar(ROL, [0.7, 0.2, 6.2], pc(tc, c1, c2), [0.5, 0.1, 5.6]);
      else if (tc < c3) { const c = cabecaDe(menino, -0.3); K.mirar([c[0] + 0.7, c[1] + 0.1, c[2] + 4.4], c); }
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(4.2, 3.8, q), 2.2, K.lerp(5.5, 5.0, q)], [-0.3, 1.9, -0.6]); }
    },
    qualquer(B, tc) {
      // NA TELA: a roleta para em PADARIA, depois OFICINA, depois PET SHOP; o telão mostra a fatia; o Rafa aponta cada uma · MOSTRA: personagem, roleta
      const tMa = quando('mandar', B, 0.45), tPa = quando('padaria', B, 0.62), tOf = quando('oficina', B, 0.78), tPe = quando('pet', B, 0.92);
      pintaRoleta(false);
      // OBJETOS SE MEXENDO: a roleta gira e para na fatia da palavra (0 padaria, 1 oficina, 2 pet shop)
      const paradas = [[B.inicio, 0, 6], [tPa, 0, 8], [tOf, 1, 9], [tPe, 2, 10]];
      let ang = 0;
      for (let k = 1; k < paradas.length; k++) {
        const [t0] = paradas[k - 1], [t1, i1, v1] = paradas[k];
        const a0 = k === 1 ? 0 : angFatia(paradas[k - 1][1], paradas[k - 1][2]), a1 = angFatia(i1, v1);
        if (tc <= t1) { ang = K.lerp(a0, a1, K.suave(pc(tc, t0, t1))); break; }
        ang = a1;
      }
      roletaEm(ang);
      const atual = tc > tPe ? 2 : tc > tOf ? 1 : tc > tPa ? 0 : -1;
      if (CS.todos.palco.telao) CS.todos.palco.telao.desenhar((c, w, h) => { c.fillStyle = atual >= 0 ? COR_FAT[atual] : '#1067f8'; c.fillRect(0, 0, w, h); txt(c, atual >= 0 ? FATIAS[atual] : 'QUAL CLIENTE?', w / 2, h / 2, 130, '#fff', 900, 'center', w * 0.9); }, 't' + atual);
      // PERSONAGEM: começo gira a roleta (empurrando) · em cada fatia aponta e comemora pouco
      menino.colocar([0.6, 0, 0.7], ROL);
      if (tc > tPa) menino.apontar(0.6); else menino.reagir('empurrando', tc - B.inicio);
      menino.humor('feliz');
      [tPa, tOf, tPe].forEach((t0, j) => fx.poof.em(mais(ROL, [0, RAIO + 0.6, 0.3]), j === atual ? tc - t0 : -1, { escala: 0.4 }));
      [tPa, tOf, tPe].forEach((t0) => K.som('ding', t0, 0.4));
      for (let k = 0; k < 10; k++) K.som('clique', B.inicio + k * 0.15, 0.15); void tMa;
      // CÂMERA: (1) passando · médio, os dois · (2) a partir de "padaria": a roleta e o telão de frente
      if (tc < tPa) { const q = K.suave(pc(tc, B.inicio, tPa)); K.mirar([K.lerp(-3.2, -2.2, q), 2.0, 6.0], [0, 1.9, -0.6]); }
      else { const q = K.suave(pc(tc, tPa, B.ate)); K.mirar([K.lerp(-0.5, -0.7, q), 2.8, K.lerp(10.4, 9.8, q)], [-1.1, 2.3, -0.8]); }
    },
    portfolio(B, tc) {
      // NA TELA: o quarto; os 5 sites do portfólio pipocam em volta dele, cada um num estilo; o celular gigante sem nenhuma notificação · MOSTRA: personagem, portfolio, celular
      const tZe = quando('zero', B, 0.2), tPo = quando('portfólio', B, 0.35), tCi = quando('cinco', B, 0.55), tNi = quando('Ninguém', B, 0.78), tCo = quando('confia', B, 0.92);
      cadeiraDoLado(); ve(comp);
      // OBJETOS SE MEXENDO: os 5 sites pipocando um por um a partir de "portfólio"
      const POS = [[-1.55, 1.7, -0.9], [-1.1, 2.45, -1.0], [-0.3, 2.75, -1.1], [0.5, 2.45, -1.0], [0.95, 1.7, -0.9]];
      fx.sites.forEach((s, i) => { const dt = tc - tPo - i * 0.12; if (dt > 0) { ve(s); s.mostrar('site' + i, {}); s.g.position.set(...POS[i]); s.g.scale.setScalar(pop(dt)); s.g.rotation.set(0, 0, Math.sin(tc * 2 + i) * 0.05); } });
      comp.tela.desenhar((c, w, h) => K.telasMappoa['site' + Math.min(4, Math.floor(Math.max(0, tc - B.inicio) * 2) % 5)](c, w, h), 's' + Math.floor(Math.max(0, tc - B.inicio) * 2) % 5);
      // o celular gigante com zero notificações, em "Ninguém"
      if (tc > tNi) { ve(fx.cel); fx.cel.userData.m3d && fx.cel.userData.m3d.mostrar({ itens: [], n: 0, hora: '23:48', data: 'sem mensagens' }); K.entrar(fx.cel, 'cai', tc - tNi, { altura: 2 }); }
      // PERSONAGEM: começo digitando cansado, sentado · em "cinco": coça a cabeça olhando os sites · em "confia": cabeça na mesa
      if (tc < tCi) { sentado(MONITOR); menino.reagir('digitando', tc); }
      else if (tc < tCo) { sentado([-0.3, 2.6, -1.1]); menino.reagir('coca_cabeca', tc - tCi); }
      else { sentado(MONITOR); menino.reagir('dormindo', tc - tCo); }
      menino.humor('triste');
      // EFEITOS VISUAIS: "Do zero, toda vez" em "zero" · "5 estilos?" em "cinco" · "Ninguém confia" em "confia"
      if (tc < tCi) fx.et.zero.em({ tela: [540, 380] }, tc - tZe); else if (tc < tNi) fx.et.cinco.em({ tela: [540, 380] }, tc - tCi); else fx.et.confia.em({ tela: [540, 380] }, tc - tNi);
      for (let k = 0; k < 6; k++) K.som('clique', B.inicio + k * 0.13, 0.15);
      for (let i = 0; i < 5; i++) K.som('estalo', tPo + i * 0.12, 0.25); K.som('errado', tNi, 0.4);
      // CÂMERA: (1) até "cinco": de lado, ele digitando · (2) afastando, de frente, os 5 sites e ele
      if (tc < tCi) camLado(K.suave(pc(tc, B.inicio, tCi)));
      else { const q = K.suave(pc(tc, tCi, B.ate)); K.mirar([K.lerp(-0.2, -0.3, q), 2.1, K.lerp(2.4, 2.9, q)], [-0.3, 1.9, -1.0]); }
    },
    virada(B, tc) {
      // NA TELA: o palco; o Rafa segura a roleta com a mão e ela trava; todas as fatias viram BARBEARIA; o telão "BARBEARIAS"; pinos verdes brotando no palco · MOSTRA: personagem, roleta
      const tTr = quando('trava', B, 0.15), tNi = quando('nicho', B, 0.4), tBa = quando('barbearias', B, 0.62), tCi = quando('cidade', B, 0.92);
      pintaRoleta(tc > tBa);
      const gira = tc < tTr ? (tc - B.inicio) * 6 : (tTr - B.inicio) * 6 + (1 - Math.exp(-(tc - tTr) * 8)) * 0.4;
      roletaEm(gira);
      if (CS.todos.palco.telao) CS.todos.palco.telao.desenhar((c, w, h) => { c.fillStyle = tc > tBa ? '#e8352b' : '#1067f8'; c.fillRect(0, 0, w, h); txt(c, tc > tBa ? 'BARBEARIAS' : 'QUAL CLIENTE?', w / 2, h / 2, 130, '#fff', 900, 'center', w * 0.9); }, 'v' + (tc > tBa));
      // PERSONAGEM: começo agarra a roleta (segurando) · em "nicho": a ideia · em "barbearias": comemora
      menino.colocar(tc < tNi ? mais(ROL, [1.55, -ROL[1], 0.6]) : RAFA, tc < tBa ? ROL : [1.4, 1.4, 6]);
      if (tc > tBa) menino.reagir('vitoria', tc - tBa); else if (tc > tNi) menino.reagir('ideia', tc - tNi); else menino.reagir('segurando', tc - B.inicio);
      menino.humor(tc > tTr ? 'feliz' : 'bravo');
      fx.poof.em(mais(ROL, [0, 0, 0.4]), tc - tBa, { escala: 0.8 });
      // EFEITOS VISUAIS: "Um nicho só" em "nicho" · "Qualquer cidade" em "cidade"
      if (tc < tCi) fx.et.nicho.em({ tela: [540, 380] }, tc - tNi); else fx.et.qualquer.em({ tela: [540, 380] }, tc - tCi);
      K.som('baque', tTr, 0.7); K.som('brilho', tBa, 0.6); K.som('festa', tBa + 0.1, 0.3);
      // CÂMERA: (1) até "nicho": perto, a mão travando · (2) afastando, de frente, a roleta toda de barbearia e o telão
      if (tc < tNi) olhar(mais(ROL, [0.9, -0.6, 0.3]), [1.6, 0.5, 3.0]);
      else { const q = K.suave(pc(tc, tNi, B.ate)); K.mirar([0.2, 2.6, K.lerp(8.0, 10.0, q)], [-0.2, 2.5, -1.5]); }
    },
    antes(B, tc, tA) {
      pintaRoleta(false); roletaEm((tc - B.inicio) * 7);
      menino.colocar(RAFA, [1.4, 1.4, 6]); menino.reagir('duvida', tc - B.inicio); menino.humor('assustado');
      fx.estr.em(cabecaDe(menino, 0.25), tc, { raio: 0.35 });
      fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.1);
      const q = K.suave(pc(tc, B.inicio, tA)); K.mirar([0.2, 2.6, K.lerp(9, 10, q)], [-0.2, 2.3, -1]);
    },
    capa() {
      pintaRoleta(false); roletaEm(0.4);
      menino.colocar(RAFA, [1.4, 1.4, 6]); menino.reagir('duvida', 0.5); menino.humor('assustado');
      fx.estr.em(cabecaDe(menino, 0.25), 0.4, { raio: 0.35 });
      K.mirar([0.4, 2.4, 8.8], [-0.2, 2.0, -0.8]);
    }
  };

  // ---------- Os planos iguais nos três (do investir ao fim) ----------
  const P = Object.assign({}, PV[VID], {
    investe(B, tc) {
      // NA TELA: o quarto de dia; a nota do investimento na mão dele vira moeda e cai no teclado; o mapa com os pinos no monitor · MOSTRA: personagem, nota, monitor
      const tDe = quando('decide', B, 0.1), tIn = quando('investir', B, 0.25), tFe = quando('ferramenta', B, 0.6), tAc = quando('acha', B, 0.8);
      ve(comp); cadeiraDoLado();
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      // PERSONAGEM: começo bate na mesa, decidido · em "investir": segura a nota · em "ferramenta": digita
      if (tc < tIn) menino.reagir('bate_mesa', tc - B.inicio); else if (tc < tFe) menino.reagir('segurando', tc - tIn); else menino.reagir('digitando', tc);
      menino.humor('feliz');
      // ENTRA AGORA: a nota na mão em "investir"; o poof e a moeda em "ferramenta"; os pinos no monitor em "acha"
      const mao = menino.mao(1), notaPos = mais(mao, [0.03, 0.08, 0.1]);
      if (tc < tFe) { ve(nota); nota.position.set(...notaPos); nota.lookAt(K.camera.position); nota.rotation.z += Math.sin(tc * 3) * 0.1; nota.scale.setScalar(pop(tc - B.inicio + 0.2) * (tc > tIn ? 1.3 : 1)); }
      if (tc > tFe) {
        fx.poof.em(mais(notaPos, [0, 0.15, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(notaPos[0], TECLADO[0], q), K.lerp(notaPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(notaPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tAc ? Math.min(6, 1 + Math.floor((tc - tAc) / 0.12)) : 0;
      comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n }), 'm' + n);
      // EFEITOS VISUAIS: "Investir" em "investir"
      fx.et.investir.em({ tela: [540, 470] }, tc - tIn);
      K.som('baque', B.inicio + 0.15, 0.5); for (let k = 0; k < 6; k++) K.som('estalo', tAc + k * 0.12, 0.2); void tDe;
      // CÂMERA: (1) chegando · médio · esquerda, ele com a nota · (2) subindo · médio · frente, o monitor
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), notaPos], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.25, obstaculos: false, tam: 1.9 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    lista(B, tc) {
      // NA TELA: (1) o quarto: a barra com mappoa.com sendo digitada e a busca com o nicho e a cidade; (2) a central do Mappoa: a lista enchendo até o total, o grupo SEM SITE e os contatos · MOSTRA: navegador, lista, personagem
      const tPc = quando('computador', B, 0.05), tDi = quando('digita', B, 0.15), tVe = quando('vem', B, 0.5), tNi = quando(CFG.wNicho, B, 0.65), tCi = quando(CFG.wCidade, B, 0.8), tSe = quando('sem', B, 0.92);
      if (tc < tVe) {
        ve(comp, navG); comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
        K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
        navG.mostrar('endereco', { letras, ir: tc > tDi + 0.8 });
        for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
        const tB = tDi + 0.8;
        if (tc > tB) { ve(buscaP); const q = K.suave(K.clamp((tc - tB) / 0.3)); buscaP.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); buscaP.g.scale.setScalar(K.lerp(0.4, 1, q)); buscaP.mostrar('buscaV', { digitado: Math.round(K.clamp((tc - tB) / Math.max(0.3, tVe - tB - 0.1)) * 20) / 20, apertado: tc > tVe - 0.2 }); K.som('brilho', tB, 0.4); }
        // PERSONAGEM: sentado digitando · no fim aperta o botão
        sentado(tc > tB ? TELA_Q : MONITOR);
        if (tc > tVe - 0.3) menino.apontar(0.6); else menino.reagir('digitando', tc);
        menino.humor('feliz');
        // CÂMERA: (1) por cima do ombro, a barra · (2) a busca de frente
        if (tc < tB) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tB), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
        else K.filmar([buscaP, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0]), cabecaDe(menino, 0)], 'parado', pc(tc, tB, tVe), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.4, obstaculos: false });
      } else {
        // CENÁRIO: central_mappoa, os robôs nas mesas
        ve(listaP, robo); K.entrar(listaP.g, 'cai', tc - tVe, { altura: 3 });
        const total = tc < tNi ? 0 : Math.round(K.lerp(5, CFG.total, pc(tc, tNi, tSe - 0.1)));
        const n = tc < tNi ? 0 : Math.min(4, 1 + Math.floor((tc - tNi) / 0.2));
        listaP.mostrar('listaV', { total, n, sem: tc > tSe, chips: tc > tSe + 0.3 });
        robo.g.position.set(-1.55, 0, 1.3); robo.g.rotation.y = 0.5; robo.em(tc, { acena: tc > tSe ? 1 : 0, mapa: false });
        // PERSONAGEM: olha pra cima de boca aberta · em "sem": comemora
        menino.colocar([1.2, 0, 1.6], [-0.2, 1.8, 0.8]);
        if (tc > tSe) menino.reagir('comemorando', tc - tSe); else menino.reagir('surpreso', tc - tVe);
        menino.humor('feliz');
        if (tc < tSe) fx.et.total.em(mais(LISTA_C, [0, 1.6, 0.2]), tc - tCi); else fx.et.sem.em(mais(LISTA_C, [0, 1.6, 0.2]), tc - tSe);
        K.som('brilho', tVe, 0.5); for (let k = 0; k < 6; k++) K.som('bip', tNi + k * 0.12, 0.2); K.som('ding', tSe, 0.5);
        // CÂMERA: (3) chegando · médio · frente · baixo, a lista, o robô e ele
        K.filmar([listaP, robo, menino], 'chegando', pc(tc, tVe, B.ate), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      }
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca, o logo gigante; ele e o robô dos lados; a análise cai com o score enchendo · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.5), tPr = quando('precisa', B, 0.7), tSv = quando('serviço', B, 0.92);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseV', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: começo aponta o logo · em "serviço": comemora
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('vitoria', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      menino.humor('feliz');
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.quem.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) chegando · médio · frente · baixo · (2) passando · médio · esquerda · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    analise(B, tc) {
      // NA TELA: o quarto; a análise da empresa com a nota; depois a mensagem pronta no WhatsApp · MOSTRA: tela, personagem, monitor
      const tAb = quando('abre', B, 0.08), tNo = quando('nota', B, 0.45), tWh = quando('WhatsApp', B, 0.62), tPr = quando('pronta', B, 0.92);
      ve(comp); comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n: 6 }), 'm6');
      ve(telaQ); K.entrar(telaQ.g, 'sobe', tc - tAb, { dur: 0.4 });
      if (tc < tWh) telaQ.mostrar('analiseV', { ate: tc > tNo + 0.3 ? 1 : 0, score: Math.round(K.clamp((tc - tNo) / 0.5) * 20) / 20 });
      else telaQ.mostrar('mensagemV', { digitado: Math.round(K.clamp((tc - tWh) / 0.9) * 20) / 20 });
      // PERSONAGEM: começo clica · em "pronta": vira e aponta a tela
      if (tc < tPr) { sentado(TELA_Q); menino.reagir(tc < tNo ? 'digitando' : 'surpreso', tc - tAb); }
      else { cadeiraDoLado(); menino.colocar(mais(EM_PE, [0.2, 0, 0.2]), TELA_Q); menino.apontar(0.6); }
      menino.humor('feliz');
      // EFEITOS VISUAIS: "Nota NN" em "nota" · "WhatsApp" · "Mensagem pronta" em "pronta"
      if (tc < tWh) fx.et.nota.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tNo); else if (tc < tPr) fx.et.whats.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tWh); else fx.et.msg.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tPr);
      K.som('clique', tAb, 0.5); K.som('ding', tNo + 0.5, 0.5); for (let k = 0; k < 6; k++) K.som('clique', tWh + k * 0.12, 0.15);
      // CÂMERA: (1) chegando · médio · direita, a tela e ele · (2) parado · perto · frente, a mensagem inteira
      if (tc < tWh) K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tWh), { plano: 'medio', lado: 18, altura: 'olho', tam: 1.6, obstaculos: false });
      else K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0])], 'parado', pc(tc, tWh, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.3, obstaculos: false });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: a cena do gancho de cada vídeo; (2) Agora: o quarto, ele no computador e o mapa com os pinos e os nomes das cidades acendendo · MOSTRA: personagem
      const tA = quando('Agora', B, 0.5);
      if (tc < tA) { PV[VID].antes(B, tc, tA); K.som('errado', B.inicio + 0.3, 0.3); return; }
      cadeiraDoLado(); ve(comp);
      const n = Math.min(6, 1 + Math.floor((tc - tA) / 0.2));
      mapaEm(n); comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n }), 'm' + n);
      menino.colocar(mais(EM_PE, [0.1, 0, 0.3]), tc > tA + 0.6 ? [0.6, 1.4, 5] : MAPA_Q);
      if (tc > tA + 0.6) menino.reagir('vitoria', tc - tA - 0.6); else menino.apontar(0.9);
      menino.humor('feliz');
      fx.et.agora.em({ tela: [540, 380] }, tc - tA);
      for (let k = 0; k < 6; k++) K.som('estalo', tA + k * 0.2, 0.25); K.som('certo', tA + 1.2, 0.5);
      fx.grana.em(mais(EM_PE, [0.1, 0, 0.3]), tc - tA - 0.6, { raio: 1.1, altura: 2.6, dur: 1.2 });
      // CÂMERA: (2) chegando · médio · frente, ele e o mapa
      K.filmar([menino, cabecaDe(menino, 0.3), mapaP], 'chegando', pc(tc, tA, B.ate), { plano: 'medio', lado: -10, altura: 'olho', obstaculos: false, tam: 2.1 });
    },
    segue(B, tc) {
      // NA TELA: ele de pé no quarto; o pedido "Comenta a sua cidade" no topo; o mapa das cidades; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tCo = quando('Comenta', B, 0.02), tCi = quando('cidade', B, 0.12), tPc = quando('computador', B, 0.6), tDi = quando('digita', B, 0.7), tTe = quando('testa', B, 0.9);
      if (tc < tPc) fx.cta.em(tc - tCo); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      if (tc < tPc) mapaEm(6);
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('estalo', tCi, 0.4); K.som('ding', tTe, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo aponta pra câmera, falando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else if (tc > tCi) menino.reagir('chamando', tc - tCi); else menino.apontar(1);
      menino.humor('feliz');
      // CÂMERA: (1) até "computador": chegando · médio · frente · (2) parado · aberto · frente, topo livre pro cartão
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar((c, w, h) => telaMapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() { PV[VID].capa(); }
  });

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? LUGAR.capa : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    menino.g.visible = false;
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0; menino.g.scale.setScalar(1);
    buscaP.g.scale.setScalar(1); buscaP.g.position.set(...TELA_Q); buscaP.g.rotation.set(0, 0, 0);
    telaQ.g.scale.setScalar(1); telaQ.g.position.set(...TELA_Q); telaQ.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    mapaP.g.scale.setScalar(1); mapaP.g.position.set(...MAPA_Q); mapaP.g.rotation.set(0, -0.45, 0);
    if (fx.mala) { fx.mala.position.set(...MALA); fx.mala.rotation.set(0, 0, 0); }
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
