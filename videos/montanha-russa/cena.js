// Mês passado ele tinha três clientes. Olha ele agora (canal Mappoa, molde de 45 s).
// A montanha-russa é o saldo da conta: o trilho sobe quando tem cliente e despenca quando o trabalho acaba, porque o
// Caíque só trabalha e nunca procura o próximo. Quatro lugares (K.cenarios): o parque (fundo azul com o trilho em forma
// de gráfico), o quarto do Caíque, a oficina de moto da esquina e o palco do Mappoa. Base: o cena.js do
// cliente-gritou-na-esquina (quarto, Mappoa, contrato e fim). Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, mecanico, cliente, rival, robo, comp, cad, cel, moto, carro, alavanca, telaC, telaM, navG, pino, FOV0;
  let curva, trilhoG, subidaG, placaSaldo, calend, lembrete, contrato, carimbo;
  const tudo = [], fx = {}, pinos = [], sites = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio do quarto, virado pra +z; a cadeira giratória no SEAT
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  // Oficina: a moto no meio, o mecânico do lado dela, o cliente com o celular gigante à direita
  const MOTO = [0.4, 0, -0.9], MEC = [-0.9, 0, -0.5], CLI = [2.7, 0, 1.3], CEL = [1.75, 0, 0.75];
  // O trilho da montanha-russa: corre no eixo x, em z = ZT, e tem a forma do saldo da conta
  const ZT = -1;
  const PTS = [[-26, 1.2], [-19, 1.3], [-13.5, 5], [-9.8, 8.7], [-7.2, 9.1], [-4.6, 5], [-2.3, 1.0], [1, 0.95], [3.8, 4.3], [5.8, 5.0], [8.0, 1.0],
    [11, 0.9], [14, 0.95], [16.6, 5.4], [18.8, 6.0], [21.2, 1.2], [26, 1.2], [31, 2.6], [36, 4.8], [41, 7.0], [46, 9.2], [52, 11.4]];

  const LUGAR = {
    gancho: 'parque', trabalha: 'quarto', despenca: 'parque', oficina: 'oficina', rival: 'oficina', freio: 'parque',
    lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'parque', segue: 'quarto', cartao: 'quarto', capa: 'parque'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'freio') return tc < quando('decide', B, 0.42) - 0.1 ? 'parque' : 'quarto';
    return LUGAR[B.plano] || 'quarto';
  }

  const OFICINAS = [
    { nome: 'Serra Motos', end: 'Rua Sinimbu, 1180', chips: ['whats', 'tel'] },
    { nome: 'Moto Peças Galópolis', end: 'Rua Pinheiro Machado, 402', chips: ['whats'] },
    { nome: 'Garagem Duas Rodas', end: 'Av. Júlio de Castilhos, 2210', chips: ['tel', 'insta'] },
    { nome: 'Oficina do Tchê', end: 'Rua Os Dezoito do Forte, 95', chips: ['whats', 'insta'] }
  ];

  function guarda(obj, nome, pos, esc) {
    const g = obj.g && obj.g.isObject3D ? obj.g : obj;
    if (!g.parent) K.scene.add(g);
    if (esc) g.scale.setScalar(esc);
    if (pos) g.position.set(...pos);
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
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  // Os três projetos do Caíque com as barras enchendo
  function projetos(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.16, 0, '#0b1b3a'); txt(c, 'Meus projetos', w * 0.05, h * 0.08, w * 0.06, '#fff', 800);
    ['Site da Padaria', 'Site da Clínica', 'Site do Pet'].forEach((s, i) => {
      const y = h * (0.26 + i * 0.25), k = K.clamp((e.k || 0) * 1.2 - i * 0.12);
      txt(c, s, w * 0.06, y, w * 0.055, '#111', 800, 'left', w * 0.6);
      rr(c, w * 0.06, y + h * 0.06, w * 0.88, h * 0.06, 12, '#dbe2ec');
      rr(c, w * 0.06, y + h * 0.06, Math.max(14, w * 0.88 * k), h * 0.06, 12, k >= 1 ? '#3fae5a' : '#2f6fd6');
      txt(c, k >= 1 ? 'ENTREGUE ✓' : Math.round(k * 100) + '%', w * 0.94, y, w * 0.05, k >= 1 ? '#3fae5a' : '#4a4f58', 900, 'right');
    });
  }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Caíque Web Design', w * 0.06, h * 0.13, w * 0.07, '#fff', 900); txt(c, 'sites que trazem cliente', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  // A busca no celular do cliente: a oficina sem site e sem telefone
  const BUSCA = 'oficina de moto';
  function busca(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    txt(c, '9:41', w * 0.08, h * 0.035, w * 0.05, '#111', 800);
    rr(c, w * 0.06, h * 0.07, w * 0.88, h * 0.07, 40, '#eef1f5');
    txt(c, BUSCA.slice(0, e.letras) + (e.letras < BUSCA.length ? '|' : ''), w * 0.12, h * 0.105, w * 0.062, '#111', 700, 'left', w * 0.78);
    if (e.res) {
      rr(c, w * 0.06, h * 0.18, w * 0.88, h * 0.36, 18, '#f7f9fc');
      txt(c, 'Moto da Esquina', w * 0.11, h * 0.23, w * 0.075, '#111', 900, 'left', w * 0.8);
      txt(c, '★★★★☆ 4,6 · Oficina', w * 0.11, h * 0.29, w * 0.05, '#d97706', 800, 'left', w * 0.8);
      txt(c, 'Site:  —', w * 0.11, h * 0.38, w * 0.075, '#e8352b', 900);
      txt(c, 'Telefone:  —', w * 0.11, h * 0.46, w * 0.075, e.erro ? '#e8352b' : '#9aa0a6', 900);
    }
    if (e.erro) {
      rr(c, w * 0.06, h * 0.6, w * 0.88, h * 0.28, 18, '#fde8e7');
      c.strokeStyle = '#e8352b'; c.lineWidth = w * 0.03; c.lineCap = 'round';
      const cx = w / 2, cy = h * 0.69, r = w * 0.08;
      c.beginPath(); c.moveTo(cx - r, cy - r); c.lineTo(cx + r, cy + r); c.moveTo(cx + r, cy - r); c.lineTo(cx - r, cy + r); c.stroke();
      txt(c, 'Nada encontrado', w / 2, h * 0.81, w * 0.07, '#b42318', 900, 'center');
    }
  }
  function paginaCal(c, w, h, e) {
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.26, 0, '#e8352b'); txt(c, 'SEM PEDIDO', w / 2, h * 0.13, w * 0.12, '#fff', 900, 'center');
    txt(c, 'DIA', w / 2, h * 0.42, w * 0.13, '#4a4f58', 900, 'center');
    txt(c, String(e.dia), w / 2, h * 0.7, w * 0.36, '#111', 900, 'center');
  }

  // ---------- O trilho da montanha-russa (o gráfico do saldo) ----------
  function fazTrilho(g) {
    curva = new THREE.CatmullRomCurve3(PTS.map(([x, y]) => V(x, y, ZT)), false, 'centripetal');
    const N = 900, amos = curva.getSpacedPoints(N);
    const mats = { sobe: K.mat(0x3fae5a, { roughness: 0.35, metalness: 0.3 }), desce: K.mat(0xe8352b, { roughness: 0.35, metalness: 0.3 }), reto: K.mat(0xf4f1ea, { roughness: 0.35, metalness: 0.3 }) };
    const branco = K.mat(0xf4f1ea, { roughness: 0.5 }), cinza = K.mat(0x8a929c, { roughness: 0.4, metalness: 0.4 });
    const PED = 30;
    for (let i = 0; i < N; i += PED) {
      const pedaco = amos.slice(i, Math.min(N, i + PED) + 1);
      if (pedaco.length < 2) continue;
      const dy = pedaco[pedaco.length - 1].y - pedaco[0].y;
      const mat = dy > 0.25 ? mats.sobe : dy < -0.25 ? mats.desce : mats.reto;
      const xm = pedaco[Math.floor(pedaco.length / 2)].x;
      const pai = xm > 28 && xm < 44 ? subidaG : g;
      [-0.45, 0.45].forEach((dz) => {
        const c = new THREE.CatmullRomCurve3(pedaco.map((p) => V(p.x, p.y, p.z + dz)));
        pai.add(K.malha(new THREE.TubeGeometry(c, pedaco.length * 2, 0.07, 8, false), mat));
      });
    }
    // dormentes a cada ~0,6 m e os pilares a cada ~2 m
    const geoD = new THREE.BoxGeometry(0.12, 0.06, 1.12), geoP = new THREE.CylinderGeometry(0.08, 0.1, 1, 10).translate(0, 0.5, 0);
    const comp = curva.getLength(), nd = Math.floor(comp / 0.6);
    for (let i = 0; i <= nd; i++) {
      const u = i / nd, p = curva.getPointAt(u), t = curva.getTangentAt(u);
      const d = K.malha(geoD, cinza); d.position.copy(p).add(V(0, -0.07, 0)); d.rotation.z = Math.atan2(t.y, t.x);
      ((p.x > 28 && p.x < 44) ? subidaG : g).add(d);
    }
    for (let x = -24; x <= 50; x += 2) {
      const p = curva.getPointAt(uDeX(x));
      if (p.y < 0.5) continue;
      [-0.45, 0.45].forEach((dz) => { const c = K.malha(geoP, branco); c.position.set(p.x, 0, ZT + dz); c.scale.set(1, p.y - 0.1, 1); g.add(c); });
    }
  }
  // a fração do trilho (0 a 1) que fica num x
  let TAB = null;
  function uDeX(x) {
    if (!TAB) { TAB = []; for (let i = 0; i <= 2000; i++) TAB.push(curva.getPointAt(i / 2000).x); }
    let a = 0, b = TAB.length - 1;
    while (b - a > 1) { const m = (a + b) >> 1; if (TAB[m] < x) a = m; else b = m; }
    const f = K.clamp((x - TAB[a]) / Math.max(1e-6, TAB[b] - TAB[a]));
    return (a + f) / 2000;
  }
  // O carrinho vermelho, de frente pra +z, com o banco, as rodas e a alavanca do freio do lado direito
  function fazCarrinho() {
    const g = new THREE.Group();
    const verm = K.mat(0xe8352b, { roughness: 0.35, metalness: 0.15 }), amar = K.mat(0xf5c518, { roughness: 0.4 }), preto = K.mat(0x22252b, { roughness: 0.5 });
    const casco = K.malha(new THREE.BoxGeometry(1.0, 0.42, 1.5), verm); casco.position.set(0, 0.38, 0); g.add(casco);
    const bico = K.malha(new THREE.CylinderGeometry(0.5, 0.5, 0.42, 20, 1, false, -PI / 2, PI), verm); bico.position.set(0, 0.38, 0.75); g.add(bico);
    const faixa = K.malha(new THREE.BoxGeometry(1.02, 0.08, 1.52), amar); faixa.position.set(0, 0.5, 0); g.add(faixa);
    const encosto = K.malha(new THREE.BoxGeometry(0.96, 0.55, 0.14), verm); encosto.position.set(0, 0.75, -0.7); g.add(encosto);
    const banco = K.malha(new THREE.BoxGeometry(0.86, 0.1, 0.6), preto); banco.position.set(0, 0.52, -0.35); g.add(banco);
    const barra = K.malha(new THREE.TorusGeometry(0.38, 0.035, 8, 20, PI), amar); barra.position.set(0, 0.62, 0.32); barra.rotation.x = -0.25; g.add(barra);
    [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([x, z]) => { const r = K.malha(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 16).rotateZ(PI / 2), preto); r.position.set(x * 0.95, 0.12, z); g.add(r); });
    // a alavanca do freio: gira em x a partir da base
    alavanca = new THREE.Group(); alavanca.position.set(0.56, 0.5, 0.05);
    const haste = K.malha(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 10).translate(0, 0.3, 0), K.mat(0x3b4048, { metalness: 0.5, roughness: 0.3 }));
    const bola = K.malha(new THREE.SphereGeometry(0.08, 16, 12), K.mat(0xe8352b, { roughness: 0.3 })); bola.position.y = 0.62;
    alavanca.add(haste, bola); g.add(alavanca);
    return g;
  }
  // põe o carrinho no trilho (no x dado) e o Caíque sentado dentro; devolve o ponto do carrinho
  function carrinhoEm(x, olharTras = false) {
    ve(carro);
    const u = uDeX(x), p = curva.getPointAt(u), t = curva.getTangentAt(u);
    carro.position.copy(p).add(V(0, 0.02, 0));
    carro.lookAt(p.clone().add(olharTras ? t.clone().negate() : t));
    carro.updateMatrixWorld(true);
    carro.add(menino.g);
    menino.colocar([0, 0.24, -0.33], [0, 0.24, 5]);
    menino.sentar(1, 0.3);
    alavanca.rotation.x = 0;
    return p.toArray();
  }
  const declive = (x) => { const t = curva.getTangentAt(uDeX(x)); return t.y; };
  // gritando com os braços pra cima
  function gritando(tc, forca = 1) {
    menino.humor('assustado');
    const s = Math.sin(tc * 14) * 0.12;
    menino.pose({ x: -0.1, z: 2.6 * forca + s, c: -0.3 }, { x: -0.1, z: 2.6 * forca - s, c: -0.3 });
    menino.cabeca.rotation.x = -0.2;
  }
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['vazio_colorido', { cor: 'azul' }, 'parque'], ['home_office', {}, 'quarto'], ['oficina', {}, 'oficina'], 'mundo_mappoa']);

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaOficinas = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: OFICINAS, n: e.n, sel: e.sel, total: 86, comSite: 55, semSite: 31 });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Oficinas de moto · Caxias do Sul, RS', 36, 168, 21, M.marinho, 700, 'left', w - 72);
    };
    T.analiseOficina = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Serra Motos', ate: e.ate, aderencia: 0.91 * k,
        dores: ['Sem site próprio', 'Telefone não aparece na busca'], oportunidades: ['Site com serviços, preço da revisão e botão de WhatsApp'],
        objecoes: ['"Cliente meu vem por indicação"'], abordagem: 'Mostre quem procura oficina de moto no bairro e não acha o telefone.'
      });
      if (e.ate >= 0) txt(c, Math.round(91 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Caíque (do canal), o mecânico (entregador de boné, sem a bag), o cliente, o rival e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    mecanico = K.personagem('entregador', { cores: { camiseta: 0x5a6270, bone: 0xf5c518 } }); K.semNome(mecanico.g); K.nomear('mecanico', mecanico.g);
    if (mecanico.extras && mecanico.extras.bag) mecanico.extras.bag.visible = false;
    cliente = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x8e44ad, bermuda: 0x1e1f22, tenis: 0xffffff, cabelo: 0x2a1a10, pele: 0xc98d5e } }); K.semNome(cliente.g); K.nomear('cliente', cliente.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Parque: o trilho (verde subindo, vermelho descendo), a placa SALDO, o carrinho, o calendário e os sites entregues
    trilhoG = new THREE.Group(); subidaG = new THREE.Group();
    fazTrilho(trilhoG); trilhoG.add(subidaG);
    guarda(trilhoG, 'trilho'); K.nomear('subida', subidaG);
    placaSaldo = K.placa('SALDO DA CONTA', { larg: 5.2, alt: 1.1, fundo: '#0b1b3a', cor: '#ffffff', borda: '#2fb5a6' });
    guarda(placaSaldo, 'placa', [-8.5, 11.4, ZT - 1.2]);
    carro = fazCarrinho(); guarda(carro, 'carrinho'); K.nomear('alavanca', alavanca);
    calend = new THREE.Group();
    const pagina = K.telaCanvas(1.3, 1.5, 300); pagina.m.position.set(0, 0, 0.03); calend.add(pagina.m); calend.userData.pag = pagina;
    const fundoCal = K.malha(new THREE.BoxGeometry(1.42, 1.62, 0.05), K.mat(0x2a2e36)); calend.add(fundoCal);
    const pe = K.malha(new THREE.CylinderGeometry(0.05, 0.05, 2.2, 8), K.mat(0x8a929c)); pe.position.set(0, -1.9, -0.05); calend.add(pe);
    guarda(calend, 'calendario', [12.6, 3.0, ZT + 1.6]);
    for (let i = 0; i < 3; i++) { const s = folha(0.9, 0.62, 300, (c, w, h) => { rr(c, 0, 0, w, h, 22, '#ffffff'); rr(c, 0, 0, w, h * 0.24, 22, '#2f6fd6'); c.fillStyle = '#2f6fd6'; c.fillRect(0, h * 0.12, w, h * 0.12); txt(c, 'SITE ' + (i + 1), w / 2, h * 0.5, w * 0.16, '#0b1b3a', 900, 'center'); txt(c, 'ENTREGUE ✓', w / 2, h * 0.78, w * 0.12, '#3fae5a', 900, 'center'); }); K.scene.add(s); tudo.push(s); sites.push(s); }
    for (let i = 0; i < 5; i++) { const p = K.m3d('pino'); p.scale.setScalar(0.9); K.scene.add(p); tudo.push(p); pinos.push(p); }

    // Quarto: o computador, a cadeira giratória, o post-it "procurar cliente", a barra do endereço e a tela do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria'); guarda(cad, null, SEAT);
    // o post-it tem as duas faces escritas (visto de trás do monitor não fica espelhado)
    const postit = (c, w, h) => { rr(c, 0, 0, w, h, 10, '#ffe066'); txt(c, 'PROCURAR', w / 2, h * 0.3, w * 0.15, '#7a4a00', 900, 'center'); txt(c, 'O PRÓXIMO', w / 2, h * 0.5, w * 0.15, '#7a4a00', 900, 'center'); txt(c, 'CLIENTE!', w / 2, h * 0.7, w * 0.15, '#e8352b', 900, 'center'); };
    lembrete = new THREE.Group();
    const pf = folha(0.42, 0.42, 256, postit); pf.material.side = THREE.FrontSide; pf.position.z = 0.002;
    const pt = folha(0.42, 0.42, 256, postit); pt.material.side = THREE.FrontSide; pt.rotation.y = PI; pt.position.z = -0.002;
    lembrete.add(pf, pt);
    K.scene.add(lembrete); K.nomear('lembrete', lembrete); tudo.push(lembrete);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    pino = K.m3d('pino'); guarda(pino, null, [0.9, 2.2, 0.3], 0.8);

    // Oficina: a moto, o celular gigante do cliente e o contrato com o carimbo FECHADO
    moto = K.m3d('moto_entrega', { cor: 0x2f6fd0, bag: 0x2f6fd0 }); guarda(moto, 'moto', MOTO, 1.35); moto.rotation.y = -0.5; K.lugar(moto);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CEL);
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site da Moto da Esquina', w / 2, h * 0.22, w * 0.062, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    K.scene.add(contrato); K.nomear('contrato', contrato); tudo.push(contrato);

    // Efeitos
    fx.pens = K.balaoPensamento();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.poof = K.poof();
    fx.vel = K.velocidade();
    fx.faisca = K.faiscas();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      tres: e('3 clientes', 'verde'), zero: e('R$ 0', 'vermelho'), web: e('Web designer', 'azul'), esquece: e('Só trabalha', 'laranja'),
      pedido: e('0 pedidos', 'vermelho'), semSite: e('Sem site', 'vermelho'), semana: e('Procura toda semana', 'laranja'), freio: e('Freio!', 'azul'),
      investir: e('Investir', 'azul'), cidade: e('Caxias do Sul', 'azul'), precisa: e('Quem precisa de você', 'verde'),
      sobeDesce: e('Sobe e desce', 'vermelho'), soSobe: e('Só sobe', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  function sentado(olhar) {
    menino.colocar(SEAT, olhar || MONITOR);
    menino.sentar(1);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: o carrinho vermelho despencando do pico do trilho em forma de gráfico, o Caíque dentro gritando de braços pra cima; a placa SALDO DA CONTA · MOSTRA: carrinho, trilho, personagem
      // CENÁRIO: o fundo azul infinito com as formas flutuando (o cenário cuida)
      const tT = quando('três', B, 0.3), tO = quando('Olha', B, 0.65), tA = quando('agora', B, 0.85);
      // OBJETOS SE MEXENDO: o carrinho sai do pico (x -7) e despenca até o vale (x -1), cada vez mais rápido, e segue no reto
      const k = pc(tc, B.inicio - 0.15, B.ate);
      const x = K.lerp(-7.3, 4.2, Math.pow(k, 1.6));
      const pos = carrinhoEm(Math.min(x, 3.0));
      // PERSONAGEM: começo gritando de braços pra cima · em "agora": encolhido, segurando a barra, cara de susto
      if (tc < tA) gritando(tc); else { menino.humor('assustado'); menino.pose({ x: -1.1, z: 0.3, c: -0.6 }, { x: -1.1, z: 0.3, c: -0.6 }); menino.cabeca.rotation.z = Math.sin(tc * 30) * 0.06; }
      if (declive(Math.min(x, 3.0)) < -0.2) fx.vel.em(mais(pos, [0, 0.8, 0]), tc, { rumo: -PI / 2 });
      // EFEITOS VISUAIS: "3 clientes" no pico em "três" · "R$ 0" no vale em "agora"
      fx.et.tres.em([-7.2, 10.6, ZT], tc - tT);
      fx.et.zero.em({ tela: [540, 600] }, tc - tA);
      // SONS: estrondo e whoosh no 1º segundo · o trilho rangendo · whoosh em cada corte · o grito (zumbido)
      K.som('estrondo', B.inicio + 0.05, 0.45); K.som('whoosh', B.inicio + 0.1, 0.6); K.som('zumbido', B.inicio + 0.15, 0.35);
      K.som('range', B.inicio + 0.5, 0.4); K.som('range', B.inicio + 1.6, 0.35); K.som('baque', tA, 0.4);
      // CÂMERA: 4 cortes (o rosto gritando de frente, o carrinho despencando de lado, o trilho inteiro, ele de perto com o topo livre)
      const c1 = B.inicio + 0.75, c2 = B.inicio + 1.5, c3 = Math.max(B.inicio + 2.25, tO - 0.1);
      [c1, c2, c3].forEach((c) => K.som('whoosh', c, 0.35));
      const cab = cabecaDe(menino, 0);
      if (tc < c1) {
        placaSaldo.visible = false;
        K.filmar([cab, mais(cab, [0, 0.55, 0]), mais(cab, [0, -0.7, 0])], 'chegando', pc(tc, B.inicio, c1), { plano: 'perto', lado: 'direita', altura: 'olho', tam: 1.5 });
      } else if (tc < c2) {
        K.filmar([pos, mais(pos, [0, 1.6, 0]), mais(pos, [-2.5, 2.5, 0])], 'passando', pc(tc, c1, c2), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 3.2 });
      } else if (tc < c3) {
        K.filmar([[-9, 9.5, ZT], [-1.5, 0.5, ZT], [-8.5, 11.8, ZT - 1.2], pos], 'afastando', pc(tc, c2, c3), { plano: 'aberto', lado: 'frente', altura: 'olho', tam: 9 });
      } else {
        K.filmar([pos, mais(pos, [0, 1.5, 0])], 'chegando', pc(tc, c3, B.ate), { plano: 'medio', lado: 35, altura: 'olho', espacoCima: 0.25, tam: 2.2 });
      }
    },
    trabalha(B, tc) {
      // NA TELA: o quarto; o Caíque sentado digitando rápido; no monitor, os 3 projetos com as barras enchendo; o post-it "PROCURAR O PRÓXIMO CLIENTE!" no alto do monitor · MOSTRA: personagem, monitor, lembrete
      const tW = quando('designer', B, 0.2), tC = quando('cliente', B, 0.45), tE = quando('esquece', B, 0.62), tPr = quando('próximo', B, 0.9);
      ve(comp, cad, lembrete);
      // PERSONAGEM: começo digitando rápido · em "esquece": nem olha pro post-it caindo, dá de ombros e volta a digitar
      sentado(MONITOR);
      if (tc > tE && tc < tE + 0.9) menino.reagir('ombros', tc - tE); else menino.reagir('digitando', tc);
      comp.tela.desenhar((c, w, h) => projetos(c, w, h, { k: pc(tc, B.inicio, tPr) }), 'p' + Math.round(pc(tc, B.inicio, tPr) * 30));
      // OBJETOS SE MEXENDO: o post-it no topo do monitor cai em "esquece", girando até o chão
      const q = K.clamp((tc - tE) / 0.9);
      const lp = mais(MONITOR, [0.42, 0.42, 0.06]);
      lembrete.position.set(lp[0] + q * 0.5, K.lerp(lp[1], 0.03, q * q), lp[2] + q * 0.6);
      lembrete.rotation.set(-PI / 2 * q, q * 2.5, Math.sin(q * 9) * 0.4 * (1 - q));
      // EFEITOS VISUAIS: "Web designer" em "designer" · "Só trabalha" em "cliente"
      if (tc < tC) fx.et.web.em({ tela: [540, 950] }, tc - tW); else fx.et.esquece.em({ tela: [540, 400] }, tc - tC);
      // SONS: as teclas o tempo todo · whoosh do post-it caindo · o ping dele no chão
      for (let k = 0; k < 14; k++) K.som('clique', B.inicio + 0.1 + k * 0.17, 0.22);
      K.som('whoosh', tE, 0.4); K.som('pingo', tE + 0.9, 0.4); K.som('bip', tC, 0.3);
      // CÂMERA: (1) até "cliente": por cima do ombro, as barras enchendo · (2) de trás do monitor, o rosto dele e o post-it caindo
      if (tc < tC) K.filmar([MONITOR, cabecaDe(menino, 0.1), mais(MONITOR, [0, 0.5, 0])], 'chegando', pc(tc, B.inicio, tC), { plano: 'perto', lado: 150, altura: 'olho', tam: 1.3 });
      else { const k = K.suave(pc(tc, tC, B.ate)); K.mirar([K.lerp(1.6, 1.3, k), 1.5, -2.85], [-0.3, 1.0, -0.55]); }
    },
    despenca(B, tc) {
      // NA TELA: o carrinho no topo do 2º pico; os 3 sites ENTREGUE ✓ saem voando; em "despencou" ele cai; em "mês" para no reto, com o calendário DIA 1 → DIA 30 do lado · MOSTRA: carrinho, personagem, calendario
      const tEn = quando('Entregou', B, 0.05), tDe = quando('despencou', B, 0.4), tMe = quando('mês', B, 0.62), tPe = quando('pedido', B, 0.92);
      // OBJETOS SE MEXENDO: o carrinho parado no pico (x 5,6) até "despencou", cai até o vale (x 8) e rola devagar até parar (x 12)
      let x;
      if (tc < tDe) x = K.lerp(5.3, 5.85, pc(tc, B.inicio, tDe));
      else if (tc < tMe) x = K.lerp(5.85, 10.2, Math.pow(pc(tc, tDe, tMe), 1.4));
      else x = K.lerp(10.2, 11.6, K.suave(pc(tc, tMe, tMe + 1.2)));
      const pos = carrinhoEm(x);
      // ENTRA AGORA: os 3 sites saem do carrinho um por um em "Entregou" e voam pro alto
      sites.forEach((s, i) => {
        const d = tc - tEn - i * 0.25;
        s.visible = d > 0 && d < 2.2 && tc < tMe;
        s.position.set(pos[0] - 0.8 + i * 0.8 + d * 0.3, pos[1] + 1.6 + d * 1.1, pos[2] + 0.7);
        s.scale.setScalar(pop(d)); s.lookAt(K.camera.position);
        if (d > 0 && d < 0.05) K.som('certo', tEn + i * 0.25, 0.35);
      });
      // PERSONAGEM: começo comemorando com os braços pra cima · em "despencou": gritando · em "mês": largado, triste
      if (tc < tDe) { menino.humor('feliz'); menino.pose({ z: 2.4 + Math.sin(tc * 9) * 0.2, c: -0.4 }, { z: 2.4 - Math.sin(tc * 9) * 0.2, c: -0.4 }); }
      else if (tc < tMe) gritando(tc);
      else { menino.humor('triste'); menino.pose({ x: 0.1, z: 0.1 }, { x: 0.1, z: 0.1 }); menino.cabeca.rotation.x = 0.35; }
      // o calendário vira as folhas em "mês"
      ve(calend);
      const dia = tc < tMe ? 1 : Math.min(30, 1 + Math.floor((tc - tMe) / 0.045));
      calend.userData.pag.desenhar((c, w, h) => paginaCal(c, w, h, { dia }), 'd' + dia);
      calend.scale.setScalar(pop(tc - tMe + 0.2));
      if (tc > tMe) for (let k = 0; k < 8; k++) K.som('estalo', tMe + k * 0.16, 0.2);
      // EFEITOS VISUAIS: "0 pedidos" em "pedido" (o congela em preto e branco o jogo faz)
      fx.et.pedido.em(mais(pos, [0, 2.6, 0]), tc - tPe + 0.4);
      // SONS: o trilho rangendo no pico · whoosh e o grito na queda · o baque no vale
      K.som('range', B.inicio + 0.1, 0.35); K.som('whoosh', tDe, 0.6); K.som('zumbido', tDe + 0.05, 0.3); K.som('baque', tDe + 0.9, 0.35);
      // CÂMERA: (1) até "despencou": chegando · médio · frente, os sites voando · (2) de lado acompanhando a queda · (3) parado no reto com o calendário
      if (tc < tDe) K.filmar([pos, mais(pos, [0, 3.2, 0]), mais(pos, [0, -0.3, 0])], 'chegando', pc(tc, B.inicio, tDe), { plano: 'medio', lado: -25, altura: 'olho', tam: 3.2 });
      else if (tc < tMe) K.filmar([pos, mais(pos, [0, 1.4, 0]), [8.0, 0.8, ZT]], 'descendo', pc(tc, tDe, tMe), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 4 });
      else K.filmar([mais(pos, [0, 0.3, 0]), mais(pos, [0, 1.3, 0]), [12.6, 3.6, ZT + 1.6]], 'chegando', pc(tc, tMe, B.ate), { plano: 'perto', lado: 20, altura: 'olho', tam: 2.0 });
    },
    oficina(B, tc) {
      // NA TELA: a oficina; o mecânico do lado da moto, de braço cruzado, com o balão "Cadê cliente?"; o cliente procura no celular gigante: Site —, Telefone —, ✗ · MOSTRA: mecanico, moto, celular
      // CENÁRIO: a oficina, o carro no elevador, os pneus e o portão (o cenário cuida)
      const tOf = quando('oficina', B, 0.12), tSi = quando('site', B, 0.4), tTe = quando('telefone', B, 0.7), tAp = quando('aparece', B, 0.9);
      ve(moto); moto.userData.m3d.rodar(0);
      // PERSONAGEM: o mecânico limpa a moto e olha o portão vazio · em "site": cruza os braços, triste. O cliente digita · em "aparece": faz não
      mecanico.colocar(MEC, tc < tSi ? [0.8, 1.2, 4] : [1.5, 1.4, 6]);
      if (tc < tSi) mecanico.reagir('segurando', tc - B.inicio); else mecanico.reagir('triste', tc - tSi);
      cliente.colocar(CLI, mais(CEL, [0, 1.0, 0]));
      if (tc > tAp) cliente.reagir('nao', tc - tAp); else cliente.reagir('celular', tc - B.inicio);
      fx.pens.em(cabecaDe(mecanico, 0.35), tc - tOf, { texto: 'Cadê cliente?' });
      // ENTRA AGORA: o celular gigante sobe em "site"; a busca, o resultado e o ✗ em "aparece"
      ve(cel); K.entrar(cel, 'cresce', tc - tSi, { dur: 0.35 });
      cel.rotation.set(0, Math.atan2(-0.6 - CEL[0], 7 - CEL[2]), 0);
      const letras = Math.max(0, Math.min(BUSCA.length, Math.floor((tc - tSi) / 0.05)));
      cel.userData.m3d.tela.desenhar((c, w, h) => busca(c, w, h, { letras, res: tc > tTe - 0.3, erro: tc > tAp }), 'b' + letras + (tc > tTe - 0.3) + (tc > tAp));
      // EFEITOS VISUAIS: "Sem site" em "site" · ✗ em "aparece"
      fx.et.semSite.em(cabecaDe(mecanico, 0.95), tc - tSi);
      if (tc > tAp) fx.simb.em(mais(CEL, [0.6, 2.0, 0.1]), tc - tAp, { tipo: '✗', tam: 0.9 });
      // SONS: a chave de boca na moto · as teclas do celular · errado em "aparece"
      K.som('metal', B.inicio + 0.15, 0.35); K.som('metal', B.inicio + 0.55, 0.3);
      for (let k = 0; k < 12; k++) K.som('clique', tSi + k * 0.05, 0.2);
      K.som('errado', tAp, 0.6); K.som('bip', tTe, 0.3);
      // CÂMERA: (1) até "site": girando · perto · o mecânico e a moto · (2) chegando · perto · o celular e o cliente
      const cv = tSi + 0.1;
      if (tc < cv) K.filmar([mecanico, moto, cabecaDe(mecanico, 0.6)], 'girando', pc(tc, B.inicio, cv), { plano: 'medio', lado: 20, angulo: 18, altura: 'olho', tam: 2.3 });
      else K.filmar([mais(CEL, [0, 0.1, 0]), mais(CEL, [0, 1.7, 0]), cabecaDe(cliente, 0.2), cabecaDe(mecanico, 0.1)], 'chegando', pc(tc, cv, B.ate), { plano: 'perto', lado: -10, altura: 'olho', tam: 1.7 });
    },
    rival(B, tc) {
      // NA TELA: a oficina; o rival de moletom vermelho entra pelo portão andando rápido com o notebook; aperto de mão com o mecânico e o contrato FECHADO · MOSTRA: rival, mecanico, contrato
      const tCo = quando('colega', B, 0.1), tSe = quando('semana', B, 0.4), tCh = quando('chegou', B, 0.58), tFe = quando('fechou', B, 0.88);
      ve(moto);
      const RIV_A = [3.2, 0, -3.8], RIV_B = [0.75, 0, 0.35], MEC_B = [-0.45, 0, 0.35];
      if (tc < tCh) {
        // PERSONAGEM: o rival entra andando rápido pelo portão · o mecânico levanta a cabeça, surpreso
        rival.irPara(RIV_A, RIV_B, pc(tc, B.inicio - 0.2, tCh), tc, { olhar: cabecaDe(mecanico, -1.3) });
        mecanico.colocar(MEC, cabecaDe(rival, -1.3));
        mecanico.reagir(tc > tSe ? 'surpreso' : 'triste', tc - (tc > tSe ? tSe : B.inicio));
        fx.et.semana.em(cabecaDe(rival, 0.55), tc - tSe);
        K.som('passo', B.inicio + 0.2, 0.3); K.som('passo', B.inicio + 0.6, 0.3); K.som('passo', B.inicio + 1.0, 0.3); K.som('range', tCo, 0.3);
        // CÂMERA: (1) passando · médio · o rival chegando do portão
        K.filmar([rival, cabecaDe(rival, 0.4), mecanico], 'passando', pc(tc, B.inicio, tCh), { plano: 'medio', lado: 15, altura: 'olho', tam: 2.6 });
      } else {
        // INTERAÇÃO: o aperto de mão; o contrato aparece e o carimbo FECHADO bate em "fechou"
        // cada um virado pra um ponto entre o outro e a câmera (de frente um pro outro ficam de perfil)
        rival.colocar(RIV_B, [-0.2, 1.2, 4.5]); rival.apontar(0.3); rival.humor('feliz');
        mecanico.colocar(MEC_B, [1.2, 1.2, 4.5]); mecanico.apontar(0.3); mecanico.humor('feliz');
        if (tc > tFe + 0.3) mecanico.reagir('vitoria', tc - tFe - 0.3);
        const meio = [(RIV_B[0] + MEC_B[0]) / 2, 1.95, 0.75];
        // CÂMERA: (2) chegando · médio · esquerda · o aperto de mão e o contrato
        K.filmar([rival, mecanico, meio], 'chegando', pc(tc, tCh, B.ate), { plano: 'medio', lado: -18, altura: 'olho', tam: 2.4 });
        contrato.visible = tc > tFe - 0.35;
        contrato.position.set(...meio); contrato.lookAt(K.camera.position);
        contrato.scale.setScalar(pop(tc - tFe + 0.35));
        carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
        K.som('baque', tFe, 0.6); K.som('certo', tFe + 0.3, 0.4); K.som('whoosh', tCh, 0.4);
      }
    },
    freio(B, tc) {
      // NA TELA: (1) o carrinho chegando no 3º pico, prestes a despencar de novo; ele puxa a alavanca e o carrinho trava com faíscas; (2) o quarto: ele digita mappoa.com na barra · MOSTRA: personagem, alavanca, navegador
      const tPu = quando('puxa', B, 0.12), tFr = quando('freio', B, 0.22), tDe = quando('decide', B, 0.42), tIn = quando('investir', B, 0.52), tDi = quando('digita', B, 0.66);
      if (tc < tDe - 0.1) {
        // OBJETOS SE MEXENDO: o carrinho sobe até a beira do pico (x 18,8) e trava lá em "freio"
        const x = tc < tFr ? K.lerp(17.6, 19.0, K.suave(pc(tc, B.inicio - 0.4, tFr))) : 19.0 + Math.sin((tc - tFr) * 40) * 0.02 * Math.max(0, 1 - (tc - tFr) * 2);
        const pos = carrinhoEm(x);
        // PERSONAGEM: começo de olho arregalado vendo a descida · em "puxa": puxa a alavanca com as duas mãos · depois aliviado
        const kp = K.suave(pc(tc, tPu, tFr));
        alavanca.rotation.x = -1.0 * kp;
        if (tc < tPu) { menino.humor('assustado'); menino.pose({ x: -1.1, z: 0.3, c: -0.6 }, { x: -1.1, z: 0.3, c: -0.6 }); }
        else { menino.humor(tc > tFr + 0.3 ? 'feliz' : 'bravo'); menino.pose({ x: -0.9, z: -0.05, c: -0.7 }, { x: -0.6 - kp * 0.5, z: -0.3, c: -0.9 + kp * 0.5 }); }
        // EFEITOS VISUAIS: as faíscas nas rodas em "freio" · "Freio!" em "freio"
        if (tc > tFr) fx.faisca.em(mais(pos, [0.5, 0.15, 0.6]), tc - tFr, { forca: Math.max(0, 1 - (tc - tFr) * 1.3), escala: 0.8, dir: [-1, 1, 0] });
        fx.et.freio.em({ tela: [540, 400] }, tc - tFr);
        // SONS: o clique da corrente subindo · o rangido do freio e o estalo da alavanca
        for (let k = 0; k < 4; k++) K.som('clique', B.inicio + k * 0.18, 0.3);
        K.som('trava', tPu + 0.2, 0.5); K.som('range', tFr, 0.6); K.som('zap', tFr + 0.05, 0.25);
        // CÂMERA: (1) até "puxa": de lado, aberto, a descida na frente · (2) perto, a mão na alavanca e as faíscas
        const cv = tPu + 0.05;
        if (tc < cv) K.filmar([pos, mais(pos, [0, 1.5, 0]), [21.2, 1.2, ZT]], 'chegando', pc(tc, B.inicio, cv), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 4 });
        else K.filmar([pos, cabecaDe(menino, 0.15), mais(pos, [0.6, 0.3, 0])], 'girando', pc(tc, cv, tDe), { plano: 'perto', lado: 60, angulo: 20, altura: 'olho', tam: 1.9 });
      } else {
        // o quarto: ele de pé, decide investir (a moeda cai no teclado) e depois senta e digita mappoa.com
        ve(comp, cad, navG);
        comp.tela.desenhar(telaEscura, 'escura');
        if (tc < tDi) {
          menino.colocar(EM_PE, [0.8, 1.4, 5]);
          menino.reagir(tc > tIn ? 'sim' : 'ideia', tc - (tc > tIn ? tIn : tDe));
          fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
          if (tc > tIn) fx.poof.em(mais(TECLADO, [0, 0.15, 0.1]), tc - tIn - 0.2, { escala: 0.3 });
          K.som('ding', tIn, 0.5); K.som('brilho', tDe, 0.4);
        } else { sentado(MONITOR); menino.reagir('digitando', tc); }
        // ENTRA AGORA: a barra do navegador em "decide"; as letras de mappoa.com a partir de "digita"
        K.entrar(navG.g, 'cresce', tc - tDe, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi - 0.05) / 0.08)));
        navG.mostrar('endereco', { letras, ir: letras >= 10 });
        for (let k = 0; k < 10; k++) K.som('clique', tDi + 0.05 + k * 0.08, 0.28);
        // CÂMERA: (3) chegando · médio · frente · ele, o computador e a barra
        if (tc < tDi) K.filmar([navG, comp, menino], 'chegando', pc(tc, tDe, tDi), { plano: 'medio', lado: 12, altura: 'olho', obstaculos: false });
        else K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, tDi, B.ate), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      }
    },
    lista(B, tc) {
      // NA TELA: a barra mappoa.com no alto; a lista das oficinas de moto de Caxias do Sul sobe do computador · MOSTRA: tela, personagem, navegador
      const tL = quando('lista', B, 0.2), tOf = quando('oficinas', B, 0.35), tCx = quando('Caxias', B, 0.65), tSi = quando('site', B, 0.92);
      ve(comp, cad, navG);
      comp.tela.desenhar(siteDemo, 'demo');
      navG.mostrar('endereco', { letras: 10, ir: true });
      // ENTRA AGORA: a lista sobe do computador em "lista" e enche de oficinas a partir de "oficinas"
      ve(telaC); const q = K.suave(K.clamp((tc - tL + 0.2) / 0.45));
      telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
      const n = tc > tOf ? 1 + Math.floor((tc - tOf) / 0.25) : 0;
      telaC.mostrar('listaOficinas', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
      for (let k = 0; k < 4; k++) K.som('bip', tOf + k * 0.25, 0.28);
      K.som('brilho', tL, 0.5); K.som('certo', tSi, 0.4);
      // PERSONAGEM: começo levanta da cadeira, surpreso · em "Caxias": aponta a Serra Motos
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q);
      if (tc > tCx) menino.apontar(0.6); else menino.reagir('surpreso', tc - B.inicio);
      fx.et.cidade.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCx);
      // CÂMERA: afastando · médio · frente · olho (na frase anterior: perto, na barra)
      K.filmar([navG, telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'afastando', pc(tc, B.inicio, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise da Serra Motos (91/100); o robô à esquerda; o Caíque à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseOficina', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: à direita · começo chamando · em "serviço": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('comemorando', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) até "acha": chegando · médio · frente · baixo · (2) passando · médio · esquerda · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o carrinho correndo nos morros do trilho, sobe e desce, ele tonto; (2) Agora: o carrinho no trilho verde que só sobe, os pinos de cliente brotando do lado, ele acenando feliz · MOSTRA: personagem, carrinho, subida
      const tSd = quando('sobe', B, 0.3), tA = quando('Agora', B, 0.48), tSo = quando('só', B, 0.85);
      if (tc < tA) {
        // OBJETOS SE MEXENDO: o carrinho correndo de x 0 a x 9 (morro e vale)
        const x = K.lerp(0.5, 9.5, pc(tc, B.inicio, tA));
        const pos = carrinhoEm(x);
        gritando(tc, 0.8); menino.cabeca.rotation.z = Math.sin(tc * 8) * 0.25;
        fx.vel.em(mais(pos, [0, 0.8, 0]), tc, { rumo: -PI / 2 });
        fx.et.sobeDesce.em({ tela: [540, 400] }, tc - tSd);
        K.som('whoosh', B.inicio + 0.1, 0.5); K.som('range', B.inicio + 0.6, 0.35); K.som('zumbido', tSd, 0.3);
        // CÂMERA: (1) de lado, aberto, os morros
        K.filmar([pos, mais(pos, [0, 1.2, 0])], 'passando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'olho', tam: 4.5 });
      } else {
        // OBJETOS SE MEXENDO: o carrinho sobe firme de x 31 a x 38; um pino de cliente brota do lado a cada ~0,3 s
        const x = K.lerp(30.5, 37.5, pc(tc, tA, B.ate + 0.4));
        const pos = carrinhoEm(x);
        menino.humor('feliz'); menino.acenar(tc);
        pinos.forEach((p, i) => {
          const px = 31 + i * 1.6, py = curva.getPointAt(uDeX(px)).y;
          const d = tc - tA - 0.15 - i * 0.28;
          p.visible = d > 0; p.position.set(px, py + 0.5, ZT + 1.2); p.scale.setScalar(0.9 * pop(d));
          if (d > 0 && d < 0.05) K.som('bip', tA + 0.15 + i * 0.28, 0.3);
        });
        fx.et.soSobe.em({ tela: [540, 400] }, tc - tSo);
        if (tc > tSo) fx.simb.em(mais(pos, [0, 2.6, 0]), tc - tSo, { tipo: '✓', tam: 0.75 });
        K.som('avanca', tA, 0.4); K.som('certo', tSo, 0.6);
        // CÂMERA: (2) de baixo pra cima, subindo junto, o trilho verde na frente
        K.filmar([pos, mais(pos, [0, 1.6, 0]), mais(pos, [2.5, 1.0, 0])], 'subindo', pc(tc, tA, B.ate), { plano: 'medio', lado: 30, altura: 'baixo', tam: 2.6 });
      }
    },
    segue(B, tc) {
      // NA TELA: o Caíque de pé no quarto; o cartão de seguir entra em "Segue" e vira "Seguindo"; a barra com mappoa.com sendo digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(siteDemo, 'demo');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo chamando (aponta pra quem assiste) · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, cad, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende "Sobe e desce?": ele gritando de braços pra cima no carrinho despencando, o trilho vermelho na frente
      const pos = carrinhoEm(-5.2);
      gritando(0.3);
      menino.cabeca.rotation.x = -0.75;
      placaSaldo.visible = false;
      K.filmar([pos, cabecaDe(menino, 0.5), mais(pos, [1.1, -1.3, 0])], 'parado', 0, { plano: 'medio', lado: 75, altura: 'olho', espacoCima: 0.3, tam: 1.9 });
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'parque' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    if (menino.g.parent !== K.scene) K.scene.add(menino.g);
    [menino, mecanico, cliente, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    if (mecanico.extras && mecanico.extras.bag) mecanico.extras.bag.visible = false;
    pinos.forEach((p) => { p.visible = false; });
    menino.cabeca.rotation.z = 0; menino.cabeca.rotation.y = 0;
    menino.g.position.y = 0;
    const lugar = plano === 'capa' ? 'parque' : lugarDe(B, tc);
    if (lugar === 'parque') { trilhoG.visible = true; placaSaldo.visible = true; }
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1); cel.position.set(...CEL);
    calend.scale.setScalar(1);
    contrato.scale.setScalar(1); carimbo.visible = false;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // a cadeira gira junto com ele quando ele está sentado
    cad.rotation.y = menino.g.rotation.y;
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
