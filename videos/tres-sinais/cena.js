// Os 3 sinais (canal Mappoa, feito na nuvem, 19/11/2026, molde de 45 s, visual motion).
// O vídeo responde "como achar cliente pra vender site?": o Enzo (o personagem do canal) bota um óculos de raio-X no
// meio do calçadão e três lojas acendem em vermelho: 1) a padaria não tem site no Google Maps, 2) o "site" da loja é só
// o Instagram, 3) o site da farmácia não abre. Só que, loja por loja, leva o dia inteiro. Ele tira o óculos, investe e
// digita mappoa.com: a lista real dos escritórios de Campinas, já separada em SEM SITE e SITE COM PROBLEMA. No fim, em
// vez de uma loja por vez, a cidade inteira acende.
// Três lugares (K.cenarios): o calçadão entre prédios, o quarto do Enzo e o palco do Mappoa. O óculos, os feixes, as
// molduras das lojas, as fichas do Maps, o Instagram, a página de erro, o relógio e os pinos são feitos aqui.
// Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, robo, comp, cad, navG, telaC, telaM, moeda, FOV0;
  let lente, insta, erro, relogio;
  const tudo = [], fx = {}, encarar = [];
  const SN = {}; // os 3 sinais: { pad, loj, far } com a moldura, o número e a ficha de cada loja
  const pinos = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira no SEAT quando ele senta, encostada do lado se não
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62], CAD_LADO = [-1.6, 0, -0.75];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.55, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  // Rua: as três lojas seguidas da fachada da esquerda (z de cada uma vem do cenário, no montar)
  let ZL = 0.9, ZF = 6.9, ZP = 12.9, FX = -5.95;
  const EG = () => [0.9, 0, ZL - 4.6];             // o Enzo no gancho e na frase 2, no meio do calçadão
  const ALVO_G = () => [-5.2, 2.4, ZF + 1];         // pra onde ele olha no gancho (as três lojas)
  const NA_LOJA = (z) => [-1.9, 0, z - 3.0];        // o Enzo de frente pra uma loja, do calçadão

  const LUGAR = { gancho: 'rua', enzo: 'rua', sinal1: 'rua', sinal2: 'rua', sinal3: 'rua', cansou: 'rua', lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'rua', segue: 'quarto', cartao: 'quarto', capa: 'rua' };

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
  function canvasTex(w, h, desenho) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    desenho(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  }
  function folha(l, a, px, desenho, op = {}) {
    const t = canvasTex(px, Math.round((px * a) / l), desenho);
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial(Object.assign({ map: t, transparent: true, side: THREE.DoubleSide }, op)));
  }

  // ---------- Desenhos ----------
  // A ficha do Google Maps que salta da loja (estado: 'sem' = Site: —, 'insta' = o link do Instagram, 'site' = um site)
  function fichaMaps(nome, nota, end, site) {
    return (c, w, h) => {
      rr(c, 0, 0, w, h, 34, '#ffffff');
      c.strokeStyle = '#dfe3ea'; c.lineWidth = 6; c.beginPath(); c.roundRect(3, 3, w - 6, h - 6, 32); c.stroke();
      // o pino vermelho do mapa
      c.fillStyle = '#ea4335'; c.beginPath(); c.arc(70, 76, 30, PI, 0); c.lineTo(70, 136); c.closePath(); c.fill();
      c.fillStyle = '#ffffff'; c.beginPath(); c.arc(70, 76, 12, 0, 7); c.fill();
      txt(c, nome, 124, 74, 46, '#1f1f1f', 900, 'left', w - 150);
      txt(c, '★★★★★', 124, 130, 30, '#f5b400', 900); txt(c, nota, 270, 130, 30, '#5f6368', 800);
      txt(c, end, 40, 196, 28, '#5f6368', 700, 'left', w - 80);
      c.fillStyle = '#e8eaed'; c.fillRect(40, 236, w - 80, 4);
      txt(c, 'Site:', 40, 300, 40, '#1f1f1f', 900);
      if (site === 'sem') { txt(c, '—  nenhum', 150, 300, 40, '#d93025', 900); }
      else if (site === 'insta') {
        const g = c.createLinearGradient(150, 270, 210, 330); g.addColorStop(0, '#f9a43a'); g.addColorStop(0.5, '#e1306c'); g.addColorStop(1, '#833ab4');
        rr(c, 150, 272, 56, 56, 16, g); c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.roundRect(162, 284, 32, 32, 9); c.stroke(); c.beginPath(); c.arc(178, 300, 8, 0, 7); c.stroke();
        txt(c, 'instagram.com/lojabella', 222, 300, 34, '#1a73e8', 800, 'left', w - 260);
      } else txt(c, 'farmaciavidaboa.com.br', 150, 300, 36, '#1a73e8', 800, 'left', w - 190);
    };
  }
  // O "site" da loja que é só o perfil do Instagram
  function perfilInsta(c, w, h) {
    rr(c, 0, 0, w, h, 30, '#ffffff');
    txt(c, 'lojabella', 36, 50, 34, '#111', 900);
    const g = c.createLinearGradient(30, 90, 150, 210); g.addColorStop(0, '#f9a43a'); g.addColorStop(0.5, '#e1306c'); g.addColorStop(1, '#833ab4');
    c.fillStyle = g; c.beginPath(); c.arc(90, 150, 58, 0, 7); c.fill();
    c.fillStyle = '#fff'; c.beginPath(); c.arc(90, 150, 50, 0, 7); c.fill();
    c.fillStyle = '#c0267a'; c.beginPath(); c.arc(90, 150, 44, 0, 7); c.fill(); txt(c, 'LB', 90, 152, 36, '#fff', 900, 'center');
    [['48', 'posts'], ['312', 'seguid.'], ['90', 'seguindo']].forEach(([n, l], i) => { txt(c, n, 220 + i * 95, 136, 30, '#111', 900, 'center'); txt(c, l, 220 + i * 95, 172, 20, '#555', 700, 'center'); });
    rr(c, 30, 226, w - 60, 52, 12, '#1877f2'); txt(c, 'Seguir', w / 2, 253, 28, '#fff', 900, 'center');
    const cores = ['#f6c1d1', '#c7d7fe', '#fde68a', '#bfe9df', '#f9d4b0', '#e2c6f5', '#ffd1d1', '#c9f0c4', '#d6e4ff'];
    const q = (w - 66) / 3;
    for (let i = 0; i < 9; i++) { const x = 30 + (i % 3) * (q + 3), y = 298 + Math.floor(i / 3) * (q + 3); c.fillStyle = cores[i]; c.fillRect(x, y, q, q); c.fillStyle = 'rgba(255,255,255,0.7)'; c.beginPath(); c.arc(x + q / 2, y + q / 2, q * 0.22, 0, 7); c.fill(); }
  }
  // A página que não abre
  function paginaErro(c, w, h) {
    rr(c, 0, 0, w, h, 26, '#ffffff');
    rr(c, 0, 0, w, 80, 26, '#dee1e6'); c.fillStyle = '#dee1e6'; c.fillRect(0, 50, w, 30);
    ['#ff5f57', '#febc2e', '#28c840'].forEach((cor, i) => { c.fillStyle = cor; c.beginPath(); c.arc(36 + i * 34, 40, 11, 0, 7); c.fill(); });
    rr(c, 150, 18, w - 180, 46, 23, '#ffffff'); txt(c, 'farmaciavidaboa.com.br', 176, 42, 24, '#5f6368', 700, 'left', w - 230);
    txt(c, ':(', 60, 190, 90, '#5f6368', 900);
    txt(c, 'Esta página não', 60, 300, 46, '#202124', 900, 'left', w - 100);
    txt(c, 'está disponível', 60, 356, 46, '#202124', 900, 'left', w - 100);
    txt(c, 'ERR_CONNECTION_TIMED_OUT', 60, 420, 22, '#5f6368', 700, 'left', w - 100);
  }
  // A moldura vermelha que acende em volta da loja
  function moldura(c, w, h) {
    c.clearRect(0, 0, w, h);
    c.shadowColor = '#ff2a2a'; c.shadowBlur = 30;
    c.strokeStyle = '#ff3b30'; c.lineWidth = 22; c.beginPath(); c.roundRect(28, 28, w - 56, h - 56, 30); c.stroke();
    c.shadowBlur = 0; c.fillStyle = 'rgba(255,40,40,0.13)'; c.beginPath(); c.roundRect(40, 40, w - 80, h - 80, 24); c.fill();
  }
  // A plaquinha redonda com o número do sinal
  const numero = (n) => (c, w, h) => {
    c.fillStyle = '#ff3b30'; c.beginPath(); c.arc(w / 2, h / 2, w / 2 - 8, 0, 7); c.fill();
    c.strokeStyle = '#ffffff'; c.lineWidth = 14; c.beginPath(); c.arc(w / 2, h / 2, w / 2 - 16, 0, 7); c.stroke();
    txt(c, String(n), w / 2, h / 2 + 8, w * 0.56, '#ffffff', 900, 'center');
  };
  // As lentes do óculos de raio-X, brilhando
  function lentes(c, w, h) {
    c.clearRect(0, 0, w, h);
    [w * 0.3, w * 0.7].forEach((x) => {
      const g = c.createRadialGradient(x, h / 2, 2, x, h / 2, h * 0.5);
      g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(255,70,60,0.95)'); g.addColorStop(1, 'rgba(255,0,0,0)');
      c.fillStyle = g; c.beginPath(); c.arc(x, h / 2, h * 0.5, 0, 7); c.fill();
    });
  }
  // A hora no relógio (8h → 18h)
  const hora = (n) => (c, w, h) => {
    rr(c, 0, 0, w, h, 40, '#ffffff'); c.strokeStyle = '#1e1f22'; c.lineWidth = 10; c.beginPath(); c.roundRect(5, 5, w - 10, h - 10, 36); c.stroke();
    c.strokeStyle = '#e8352b'; c.lineWidth = 12; c.beginPath(); c.arc(90, h / 2, 50, 0, 7); c.stroke();
    c.beginPath(); c.moveTo(90, h / 2); c.lineTo(90, h / 2 - 34); c.moveTo(90, h / 2); c.lineTo(90 + 26 * Math.cos((n / 12) * 2 * PI - PI / 2), h / 2 + 26 * Math.sin((n / 12) * 2 * PI - PI / 2)); c.stroke();
    txt(c, n + 'h', 172, h / 2 + 4, 92, '#e8352b', 900, 'left', w - 190);
  };
  // A tela de busca real do Mappoa no computador do quarto
  let IMG_BUSCA = null;
  function telaBusca(c, w, h) {
    c.fillStyle = '#0b1220'; c.fillRect(0, 0, w, h);
    if (IMG_BUSCA && IMG_BUSCA.complete && IMG_BUSCA.naturalWidth) c.drawImage(IMG_BUSCA, 0, 0, w, h);
  }

  // ---------- Peças feitas aqui ----------
  // O feixe do raio-X: um cone vermelho transparente que sai do olho e abre até a loja
  function fazFeixe() {
    const geo = new THREE.CylinderGeometry(0.03, 0.75, 1, 20, 1, true).translate(0, -0.5, 0);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xff3020, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    m.renderOrder = 5; K.scene.add(m); m.visible = false; tudo.push(m);
    return m;
  }
  const BAIXO = V(0, -1, 0);
  function apontaFeixe(f, de, ate, op = 0.28) {
    const a = V(...de), b = V(...ate), d = b.clone().sub(a), L = d.length();
    f.visible = true; f.position.copy(a); f.scale.set(1, L, 1);
    f.quaternion.setFromUnitVectors(BAIXO, d.normalize());
    f.material.opacity = op;
  }
  // O pino verde que acende em cima de cada loja no "Agora"
  function fazPino() {
    const g = new THREE.Group();
    const verde = K.mat(0x22c55e, { roughness: 0.35 });
    const bola = K.malha(new THREE.SphereGeometry(0.42, 22, 16), verde); bola.position.y = 1.05; g.add(bola);
    const ponta = K.malha(new THREE.ConeGeometry(0.36, 0.85, 22).rotateX(PI), verde); ponta.position.y = 0.48; g.add(ponta);
    const miolo = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })); miolo.position.set(0, 1.08, 0.33); g.add(miolo);
    const ok = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })); ok.position.set(0, 1.08, -0.33); g.add(ok);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', {}, 'rua'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);

    // As três lojas seguidas da esquerda: padaria, farmácia e loja (pega a posição de cada uma no cenário)
    const Cr = CS.todos.rua, lojas = Cr.lojas || [];
    const acha = (id) => lojas.filter((l) => l.id === id && l.lado < 0).sort((a, b) => Math.abs(a.placa[2] - 7) - Math.abs(b.placa[2] - 7))[0];
    const lP = acha('padaria'), lF = acha('farmacia'), lL = acha('loja');
    if (lP) ZP = lP.placa[2]; if (lF) { ZF = lF.placa[2]; FX = lF.placa[0]; } if (lL) ZL = lL.placa[2];
    // as árvores, bancos e floreiras desse trecho do calçadão somem (a câmera anda livre)
    const z0 = Math.min(ZL, ZF, ZP) - 16, z1 = Math.max(ZL, ZF, ZP) + 12;
    if (Cr && Cr.grupo) Cr.grupo.children.forEach((o) => { const p = o.position; if (Math.abs(p.x) > 1.5 && Math.abs(p.x) < 5.5 && p.z > z0 && p.z < z1) o.visible = false; });

    // As molduras, os números e as fichas do Maps das três lojas
    const fichas = {
      pad: fichaMaps('Padaria Pão Dourado', '4,7 (212)', 'Rua das Flores, 120', 'sem'),
      loj: fichaMaps('Loja Bella Moda', '4,8 (96)', 'Rua das Flores, 98', 'insta'),
      far: fichaMaps('Farmácia Vida Boa', '4,5 (140)', 'Rua das Flores, 110', 'site')
    };
    [['pad', ZP, 1, 'padaria'], ['loj', ZL, 2, 'loja'], ['far', ZF, 3, 'farmacia']].forEach(([k, z, n, nome]) => {
      const mold = folha(4.4, 3.3, 512, moldura, { depthWrite: false }); mold.rotation.y = PI / 2;
      guarda(mold, nome, [FX + 0.35, 1.75, z]);
      const num = folha(0.95, 0.95, 256, numero(n)); guarda(num, nome, [FX + 0.6, 4.55, z]); encarar.push(num);
      const fi = folha(2.3, 1.4, 760, fichas[k]); guarda(fi, 'ficha', [FX + 2.6, 3.35, z + 0.2]); encarar.push(fi);
      SN[k] = { z, mold, num, fi, n };
    });
    insta = folha(1.35, 1.95, 520, perfilInsta); guarda(insta, 'insta', [FX + 2.9, 2.2, ZL + 0.9]); encarar.push(insta);
    erro = folha(2.2, 1.6, 760, paginaErro); guarda(erro, 'erro', [FX + 2.8, 2.25, ZF + 0.5]); encarar.push(erro);
    relogio = folha(1.5, 0.75, 512, hora(8)); guarda(relogio, 'relogio'); encarar.push(relogio);
    relogio.userData.horas = {}; for (let n = 8; n <= 18; n++) relogio.userData.horas[n] = canvasTex(512, 256, hora(n));

    // O óculos: as lentes brilhando (o desenho 2D ganha o aro do óculos) e os dois feixes
    lente = folha(0.42, 0.17, 256, lentes, { depthWrite: false, blending: THREE.AdditiveBlending });
    lente.renderOrder = 6; guarda(lente, 'oculos'); encarar.push(lente);
    fx.feixes = [fazFeixe(), fazFeixe()];

    // Os pinos verdes em cima de todas as lojas da rua (o "Agora")
    lojas.forEach((l) => {
      const p = fazPino(); p.scale.setScalar(1.15);
      guarda(p, 'pinos', [l.placa[0] - Math.sign(l.placa[0]) * 1.3, 4.6, l.placa[2]]);
      pinos.push({ g: p, z: l.placa[2], lado: l.lado });
    });
    pinos.sort((a, b) => a.z - b.z);

    // A tela de busca real do Mappoa (pro monitor do quarto)
    if (window.TELAS_MAPPOA && window.TELAS_MAPPOA.busca) {
      IMG_BUSCA = new Image(); IMG_BUSCA.src = window.TELAS_MAPPOA.busca;
      window.ESPERAR = window.ESPERAR || []; window.ESPERAR.push(IMG_BUSCA.decode().catch(() => {}));
    }
    const M = K.MAPPOA;
    K.telasMappoa.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Enzo (do canal) e o robô do Mappoa
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cadeira, a barra do endereço, a lista real do Mappoa e a moeda
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria', { cor: 0x1067f8 }); guarda(cad, null, CAD_LADO);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.celularMappoa('lista', { tam: 6.6 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.celularMappoa('lista', { tam: 7.4 }); guarda(telaM, 'tela', [-0.35, 1.75, 0.1]);
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 })); guarda(moeda, 'moeda');

    fx.simb = K.simbolo();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      tres: e('3 sinais', 'laranja'), web: e('Web designer', 'azul'), semSite: e('Sem site', 'vermelho'), soInsta: e('Só Instagram', 'laranja'),
      naoAbre: e('Site não abre', 'vermelho'), dia: e('O dia inteiro', 'vermelho'), investir: e('Investir', 'azul'), campinas: e('Campinas', 'azul'),
      precisa: e('Quem precisa de site', 'verde'), antes: e('Loja por loja', 'vermelho'), cidade: e('A cidade inteira', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { cad.position.set(...SEAT); menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); }
  // o óculos de raio-X no Enzo (k de 0 a 1: o brilho); alvos = pra onde vão os feixes (chamado no fim do quadro)
  let oculosK = 0, oculosAlvos = [];
  function oculos(k, alvos = []) { oculosK = k; oculosAlvos = alvos; }
  const OLHO_DY = 0.02;
  function poeOculos() {
    if (menino.cartao) menino.cartao.o.oculos = oculosK > 0.01;
    if (oculosK <= 0.01 || !menino.g.visible) return;
    const c = V(...cabecaDe(menino, OLHO_DY));
    const praCam = K.camera.position.clone().sub(c).setY(0).normalize();
    lente.visible = true; lente.position.copy(c).addScaledVector(praCam, 0.32); lente.scale.setScalar(0.4 + 0.6 * oculosK);
    lente.lookAt(K.camera.position);
    const dir = V(1, 0, 0).applyQuaternion(K.camera.quaternion);
    oculosAlvos.slice(0, 2).forEach((a, i) => {
      const de = lente.position.clone().addScaledVector(dir, (i ? 1 : -1) * 0.06);
      apontaFeixe(fx.feixes[i], de.toArray(), a, 0.3 * oculosK);
    });
  }
  // acende o sinal: a moldura piscando e o número pulando (d = segundos desde que acendeu)
  function acende(k, d) {
    const S = SN[k]; if (d < 0) return;
    ve(S.mold, S.num);
    S.mold.material.opacity = 0.75 + 0.25 * Math.sin(d * 14);
    S.num.scale.setScalar(pop(d) * (1 + 0.06 * Math.sin(d * 9)));
  }
  // a ficha do Maps saltando da loja
  function ficha(k, d, esc = 1) { if (d < 0) return; const S = SN[k]; ve(S.fi); S.fi.scale.setScalar(pop(d) * esc); }
  const lojaC = (k, dy = 2.2) => [FX + 0.4, dy, SN[k].z]; // o meio da fachada da loja

  const P = {
    gancho(B, tc) {
      // NA TELA: o Enzo de óculos de raio-X no meio do calçadão, os feixes; as três lojas com a moldura vermelha e 1, 2, 3 · MOSTRA: personagem, oculos, padaria
      // CENÁRIO: a rua entre prédios de dia
      const tSi = quando('sinais', B, 0.85), tTr = quando('três', B, 0.75);
      // ENTRA AGORA: tudo já aceso no 1º quadro · OBJETOS SE MEXENDO: as molduras piscando, os números pulando
      acende('pad', tc - B.inicio + 0.4); acende('loj', tc - B.inicio + 0.2); acende('far', tc - B.inicio + 0.3);
      // PERSONAGEM: de óculos, olhando as lojas · em "três": aponta
      menino.colocar(EG(), ALVO_G()); menino.parado(); menino.humor('surpreso');
      if (tc > tTr) menino.apontar(0.5);
      oculos(1, [lojaC('pad'), lojaC('far')]);
      // SONS: estrondo + zumbido no 1º quadro · whoosh em cada corte · zap em cada loja
      K.som('estrondo', B.inicio + 0.03, 0.35); K.som('zumbido', B.inicio, 0.45);
      // CÂMERA: 4 cortes de ~0,85 s: (1) o rosto com o óculos; (2) a padaria; (3) a loja e a farmácia; (4) aberto, topo livre
      const c1 = B.inicio + 0.8, c2 = B.inicio + 1.6, c3 = B.inicio + 2.4;
      [c1, c2, c3].forEach((c) => K.som('whoosh', c, 0.35));
      K.som('zap', B.inicio + 0.1, 0.4); K.som('zap', c1 + 0.05, 0.4); K.som('zap', c2 + 0.05, 0.4);
      const E = EG();
      if (tc < c1) { const k = K.suave(pc(tc, B.inicio, c1)); K.mirar([E[0] + 2.5, 1.75, E[2] + K.lerp(2.3, 2.0, k)], [E[0], 1.25, E[2]]); }
      else if (tc < c2) { const k = K.suave(pc(tc, c1, c2)); K.mirar([0.5, K.lerp(2.1, 2.4, k), ZP - K.lerp(5.4, 4.8, k)], [FX + 0.3, 2.2, ZP + 0.8]); }
      else if (tc < c3) { const k = K.suave(pc(tc, c2, c3)); K.mirar([2.6, 2.1, ZL - K.lerp(6.4, 5.8, k)], [FX + 0.3, 2.4, ZL + 2.6]); }
      else { const k = K.suave(pc(tc, c3, B.ate)); K.mirar([4.1, 2.2, ZL - K.lerp(10.5, 11.0, k)], [-5.0, 2.6, ZL + 4.1]); }
      // EFEITOS VISUAIS: "3 sinais" em "sinais"
      fx.et.tres.em({ tela: [540, 600] }, tc - tSi);
    },
    enzo(B, tc) {
      // NA TELA: o Enzo de frente, sem o óculos; em "óculos" ele põe e as lentes acendem · MOSTRA: personagem, oculos
      const tWe = quando('designer', B, 0.3), tOc = quando('óculos', B, 0.55), tCa = quando('caçar', B, 0.75);
      const E = EG();
      // PERSONAGEM: mostrando · põe o óculos · decidido
      menino.colocar(E, [E[0] + 0.4, 1.4, E[2] + 5]);
      if (tc < tOc) menino.reagir('mostrando', tc - B.inicio);
      else { menino.reagir('ideia', tc - tOc); menino.humor('feliz'); }
      const kO = K.clamp((tc - tOc) / 0.3);
      oculos(kO, tc > tCa ? [lojaC('pad'), lojaC('loj')] : []);
      // CÂMERA: (1) médio chegando, de frente · (2) em "óculos": mais perto, o rosto
      const cv = Math.max(B.inicio + 1.0, tOc - 0.1);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([E[0] + 0.7, 1.6, E[2] + K.lerp(5.2, 4.6, k)], [E[0], 1.15, E[2]]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([E[0] - 0.6, 1.7, E[2] + K.lerp(3.6, 3.3, k)], [E[0], 1.35, E[2]]); }
      // EFEITOS VISUAIS: "Web designer" em "designer"
      fx.et.web.em({ tela: [540, 400] }, tc - tWe);
      // SONS: etiqueta · whoosh no corte · liga quando acende · zap nos feixes
      K.som('etiqueta', tWe, 0.4); K.som('whoosh', cv, 0.3); K.som('liga', tOc + 0.05, 0.5); K.som('zap', tCa, 0.35);
    },
    sinal1(B, tc) {
      // NA TELA: o feixe na padaria; a ficha do Maps salta com "Site: — nenhum" e o ✗ · MOSTRA: padaria, ficha, personagem
      const tMa = quando('Maps', B, 0.35), tSi = quando('site', B, 0.8);
      acende('pad', tc - B.inicio + 0.6);
      const L = NA_LOJA(ZP);
      // PERSONAGEM: olha a padaria · em "Maps": aponta
      menino.colocar(L, lojaC('pad', 1.6)); menino.parado(); menino.humor('surpreso');
      if (tc > tMa) menino.apontar(0.6);
      oculos(1, [lojaC('pad', 2.0), lojaC('pad', 2.6)]);
      ficha('pad', tc - tMa + 0.05);
      // CÂMERA: (1) por cima do ombro, a padaria · (2) em "site": perto da ficha
      const cv = Math.max(B.inicio + 1.0, tSi - 0.35);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([0.7, 2.0, ZP - K.lerp(7.6, 7.0, k)], [-3.9, 2.4, ZP]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([0.4, 3.0, ZP - K.lerp(3.6, 3.3, k)], [FX + 2.4, 3.1, ZP + 0.2]); }
      // EFEITOS VISUAIS: "Sem site" e ✗ em "site"
      fx.et.semSite.em({ tela: [540, 400] }, tc - tSi);
      if (tc > tSi) fx.simb.em([FX + 2.6, 4.35, ZP + 0.8], tc - tSi, { tipo: '✗', tam: 0.55 });
      // SONS: zap · pop da ficha · etiqueta · errado
      K.som('zap', B.inicio + 0.05, 0.35); K.som('estalo', tMa, 0.4); K.som('etiqueta', tSi, 0.4); K.som('errado', tSi + 0.05, 0.45); K.som('whoosh', cv, 0.3);
    },
    sinal2(B, tc) {
      // NA TELA: a loja; a ficha com o link do Instagram; em "Clica" abre o perfil · MOSTRA: loja, ficha, insta
      const tJu = quando('jura', B, 0.3), tCl = quando('Clica', B, 0.55), tIn = quando('Instagram', B, 0.85);
      acende('loj', tc - B.inicio + 0.6);
      const L = NA_LOJA(ZL);
      // PERSONAGEM: desconfiado · em "Instagram": cara de "ahá"
      menino.colocar(L, lojaC('loj', 1.6));
      if (tc < tIn) { menino.reagir('duvida', tc - B.inicio); } else { menino.reagir('surpreso', tc - tIn); }
      oculos(1, [lojaC('loj', 2.0), lojaC('loj', 2.6)]);
      ficha('loj', tc - B.inicio - 0.1, tc > tCl ? 0.8 : 1);
      if (tc > tCl) { ve(insta); insta.scale.setScalar(pop(tc - tCl)); }
      // CÂMERA: (1) chegando na loja, de lado · (2) em "Clica": perto, o perfil abrindo
      const cv = Math.max(B.inicio + 1.0, tCl - 0.1);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([1.2, 2.3, ZL - K.lerp(7.0, 6.3, k)], [-3.4, 2.7, ZL + 0.2]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([0.6, 2.5, ZL + K.lerp(-2.6, -2.3, k)], [FX + 2.9, 2.35, ZL + 0.9]); }
      // EFEITOS VISUAIS: "Só Instagram" em "Instagram"
      fx.et.soInsta.em({ tela: [540, 400] }, tc - tIn);
      // SONS: zap · clique em "Clica" · etiqueta
      K.som('zap', B.inicio + 0.05, 0.35); K.som('estalo', B.inicio + 0.15, 0.35); K.som('clique', tCl, 0.6); K.som('whoosh', cv, 0.3); K.som('etiqueta', tIn, 0.45); K.som('ding', tIn + 0.1, 0.3);
    },
    sinal3(B, tc) {
      // NA TELA: a farmácia; a ficha com o site; a página de erro tremendo · MOSTRA: farmacia, erro, personagem
      const tTe = quando('tem', B, 0.3), tMa = quando('Mas', B, 0.55), tAb = quando('abre', B, 0.88);
      acende('far', tc - B.inicio + 0.6);
      const L = NA_LOJA(ZF);
      // PERSONAGEM: confiante · em "abre": surpreso
      menino.colocar(L, lojaC('far', 1.6));
      if (tc < tMa) { menino.parado(); menino.humor('normal'); } else menino.reagir('susto', tc - tMa);
      oculos(1, [lojaC('far', 2.0), lojaC('far', 2.6)]);
      if (tc < tMa) ficha('far', tc - tTe + 0.15);
      else { ve(erro); erro.scale.setScalar(pop(tc - tMa)); if (tc > tAb) erro.userData.treme = Math.sin(tc * 60) * 0.06; }
      // CÂMERA: (1) da rua, a farmácia · (2) em "Mas": perto, a página
      const cv = Math.max(B.inicio + 1.0, tMa - 0.1);
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([1.0, 2.1, ZF - K.lerp(7.4, 6.8, k)], [-3.6, 2.5, ZF + 0.2]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([0.7, 2.4, ZF + K.lerp(-2.9, -2.6, k)], [FX + 2.8, 2.25, ZF + 0.5]); }
      // EFEITOS VISUAIS: "Site não abre" em "abre"
      fx.et.naoAbre.em({ tela: [540, 400] }, tc - tAb);
      // SONS: zap · pop da ficha · errado e racha em "abre"
      K.som('zap', B.inicio + 0.05, 0.35); K.som('estalo', tTe, 0.35); K.som('clique', tMa, 0.5); K.som('whoosh', cv, 0.3); K.som('errado', tAb, 0.5); K.som('racha', tAb + 0.05, 0.35);
    },
    cansou(B, tc) {
      // NA TELA: o Enzo largado no calçadão, suado, o óculos ainda no rosto; o relógio sobe de 8h a 18h · MOSTRA: personagem, relogio
      const tLo = quando('loja', B, 0.15), tDi = quando('dia', B, 0.75);
      // as três lojas continuam acesas, lá atrás
      acende('pad', 3); acende('loj', 3); acende('far', 3);
      const E = [0.6, 0, ZL - 2.4];
      // PERSONAGEM: cansado
      menino.colocar(E, [0.6, 1.0, ZL - 9]); menino.reagir('cansado', tc - B.inicio); menino.humor('triste');
      oculos(0.35, []);
      // o relógio em cima dele: 8h → 18h
      const n = 8 + Math.min(10, Math.floor(K.clamp((tc - tLo) / Math.max(0.6, tDi - tLo + 0.3)) * 10));
      ve(relogio); relogio.material.map = relogio.userData.horas[n]; relogio.position.set(E[0], 2.75, E[2]); relogio.scale.setScalar(pop(tc - B.inicio));
      // CÂMERA: de cima, afastando: ele pequeno no meio da rua comprida
      const k = K.suave(pc(tc, B.inicio, B.ate));
      K.mirar([K.lerp(1.4, 2.0, k), K.lerp(4.2, 6.2, k), ZL - 2.4 - K.lerp(4.2, 6.4, k)], [0.6, 1.0, ZL - 1.2]);
      // EFEITOS VISUAIS: "O dia inteiro" (o jogo congela em preto e branco)
      fx.et.dia.em({ tela: [540, 400] }, tc - tDi);
      // SONS: o tique do relógio · errado
      for (let h = 1; h <= 10; h++) K.som('clique', tLo + (h / 10) * Math.max(0.6, tDi - tLo + 0.3), 0.18);
      K.som('errado', tDi, 0.45);
    },
    lista(B, tc) {
      // NA TELA: (1) ele tira o óculos; (2) a moeda cai no teclado; (3) a barra mappoa.com; (4) a lista real sobe · MOSTRA: personagem, navegador, tela
      const tTi = quando('tira', B, 0.05), tIn = quando('investe', B, 0.2), tDi = quando('digita', B, 0.35), tL = quando('lista', B, 0.55), tCa = quando('Campinas', B, 0.68), tSe = quando('separada', B, 0.75), tPr = quando('problema', B, 0.95);
      ve(comp, cad);
      comp.tela.desenhar(telaBusca, 'busca');
      const c1 = Math.max(B.inicio + 0.7, tIn - 0.1);
      if (tc < c1) {
        // PERSONAGEM: tira o óculos, decidido
        menino.colocar(EM_PE, [0.9, 1.4, 5]);
        const k = 1 - K.suave(pc(tc, tTi + 0.1, tTi + 0.45));
        oculos(k, []);
        if (k > 0.02) { menino.reagir('erguendo', tc - B.inicio); } else menino.reagir('vitoria', tc - tTi - 0.45);
        // CÂMERA: (1) perto, o rosto
        { const kk = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(1.15, 1.0, kk), 1.6, K.lerp(2.9, 2.6, kk)], [0.68, 1.25, -0.45]); }
        K.som('whoosh', tTi + 0.2, 0.4); K.som('desliga', tTi + 0.3, 0.4);
      } else if (tc < tDi) {
        // INTERAÇÃO: a moeda sai da mão e cai no teclado
        menino.colocar(EM_PE, [-0.2, 1.3, 2.5]); menino.reagir('mostrando', tc - c1);
        menino.g.updateMatrixWorld(true);
        const pPos = mais(menino.mao(1), [0, 0.08, 0]), q = K.clamp((tc - tIn) / 0.45);
        moeda.visible = true;
        moeda.position.set(K.lerp(pPos[0], TECLADO[0], q), K.lerp(pPos[1], TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(pPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3); K.som('pingo', tIn + 0.45, 0.6);
        fx.et.investir.em({ tela: [540, 400] }, tc - tIn);
        // CÂMERA: (2) o monitor e ele, fixa
        { const k = K.suave(pc(tc, c1, tDi)); K.mirar([K.lerp(0.6, 0.45, k), K.lerp(1.45, 1.6, k), K.lerp(3.8, 3.4, k)], [0.1, 1.2, -0.8]); }
      } else {
        ve(navG);
        K.entrar(navG.g, 'cresce', tc - tDi + 0.1, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.07)));
        navG.mostrar('endereco', { letras, ir: tc > tL - 0.1 });
        for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.07, 0.25);
        if (tc > tL) {
          ve(telaC); const q = K.suave(K.clamp((tc - tL) / 0.45));
          telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
          telaC.mostrar('lista', { rolar: K.suave(pc(tc, tSe, tPr + 0.2)) * 0.32 });
          for (let k = 0; k < 4; k++) K.som('bip', tCa + k * 0.2, 0.25);
          K.som('brilho', tL, 0.5); K.som('ding', tPr, 0.4);
        }
        // PERSONAGEM: sentado digitando · em "lista": levanta e aponta
        if (tc < tL) { sentado(MONITOR); menino.reagir('digitando', tc); }
        else { menino.colocar(mais(EM_PE, [0.05, 0, 0.1]), TELA_Q); if (tc > tL + 0.45) menino.apontar(0.6); else menino.reagir('surpreso', tc - tL); }
        // CÂMERA: (3) chegando, perto, no endereço e no monitor · (4) afastando, médio, de frente: a lista
        if (tc < tL) K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, tDi, tL), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
        else K.filmar([navG, telaC, mais(TELA_Q, [-0.65, -1.2, 0]), menino], 'afastando', pc(tc, tL, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho' });
        fx.et.campinas.em(mais(TELA_Q, [0.6, 1.45, 0.25]), tc - tCa);
        K.som('whoosh', tL, 0.3);
      }
      K.som('whoosh', c1, 0.3); K.som('whoosh', tDi, 0.3);
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a lista real gigante rolando; o robô acenando; o Enzo chamando · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tCi = quando('cidade', B, 0.55), tPr = quando('precisa', B, 0.8), tFi = quando('site', B, 0.95);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      telaM.mostrar('lista', { rolar: K.suave(pc(tc, tCi, B.ate)) * 0.9 });
      K.som('ding', tPr, 0.4); K.som('certo', tFi, 0.5); K.som('brilho', tM, 0.6); K.som('baque', tS + 0.3, 0.35);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: chamando · em "site": comemorando
      menino.colocar([1.45, 0, 1.0], tc > tFi ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tFi) menino.reagir('vitoria', tc - tFi); else menino.reagir('chamando', tc - B.inicio);
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.precisa.em([-0.35, 3.45, 0.3], tc - tPr);
      // CÂMERA: (1) chegando, médio, de baixo · (2) passando, médio, da esquerda
      const tMo = Math.max(B.inicio + 1.2, tCi - 0.2);
      if (tc < tMo) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tMo), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tMo, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
      K.som('whoosh', tMo, 0.3);
    },
    antes_agora(B, tc) {
      // NA TELA: (Antes) o Enzo de óculos numa loja só, apertando os olhos; (Agora) sem óculos no meio da rua e os pinos verdes acendendo em todas as lojas · MOSTRA: personagem, pinos
      const tAg = quando('Agora', B, 0.45), tCi = quando('cidade', B, 0.65), tAc = quando('acende', B, 0.8);
      if (tc < tAg) {
        acende('pad', tc - B.inicio + 0.5);
        const L = NA_LOJA(ZP);
        // PERSONAGEM: de óculos, apertando os olhos, cansado
        menino.colocar(L, lojaC('pad', 1.6)); menino.reagir('cansado', tc - B.inicio);
        oculos(1, [lojaC('pad', 2.0), lojaC('pad', 2.6)]);
        // CÂMERA: (1) perto, o Enzo e a padaria
        { const k = K.suave(pc(tc, B.inicio, tAg)); K.mirar([0.8, 2.0, ZP - K.lerp(7.2, 6.6, k)], [-3.6, 2.3, ZP - 0.5]); }
        fx.et.antes.em({ tela: [540, 400] }, tc - B.inicio - 0.15);
        K.som('zumbido', B.inicio + 0.1, 0.3); K.som('zap', B.inicio + 0.1, 0.3);
      } else {
        // PERSONAGEM: sem óculos, no meio da rua, com os braços pra cima
        const E = [0.4, 0, ZL - 7.5];
        menino.colocar(E, [0.4, 1.4, ZL - 14]);
        menino.reagir(tc < tAc ? 'surpreso' : 'vitoria', tc - tAg);
        oculos(0, []);
        // OBJETOS SE MEXENDO: os pinos acendem um atrás do outro, do mais perto pro mais longe, dos dois lados
        const t0 = tCi - 0.15;
        let nSom = 0;
        pinos.forEach((p, i) => {
          if (p.z < ZL - 9) return;
          const d = tc - (t0 + i * 0.07);
          if (d > 0) { ve(p.g); p.g.scale.setScalar(1.15 * pop(d)); p.g.rotation.y = tc * 2; }
          if (nSom < 10 && i % 2 === 0) { K.som('bip', t0 + i * 0.07, 0.22); nSom++; }
        });
        // CÂMERA: (2) de baixo pra cima, atrás do Enzo, a rua inteira com os pinos
        { const k = K.suave(pc(tc, tAg, B.ate)); K.mirar([K.lerp(1.3, 1.0, k), K.lerp(0.9, 1.2, k), ZL - K.lerp(13.6, 14.4, k)], [0.0, 4.2, ZL + 14]); }
        fx.et.cidade.em({ tela: [540, 400] }, tc - tCi);
        K.som('avanca', tAg, 0.4); K.som('festa', tAc, 0.4); K.som('certo', tAc + 0.1, 0.4);
      }
      K.som('whoosh', tAg, 0.35);
    },
    segue(B, tc) {
      // NA TELA: o Enzo de pé no quarto; o cartão de seguir em "Segue"; a barra mappoa.com digitada em "digita"; o robô acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp, cad); comp.tela.desenhar(telaBusca, 'busca');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
      K.som('whoosh', tPc - 0.3, 0.3);
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, cad, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(telaBusca, 'busca');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende a resposta: o Enzo de óculos de raio-X e as três lojas acesas com 1, 2 e 3
      acende('pad', 1.2); acende('loj', 1.0); acende('far', 1.1);
      menino.colocar(EG(), ALVO_G()); menino.parado(); menino.humor('surpreso'); menino.apontar(0.5);
      oculos(1, [lojaC('pad'), lojaC('far')]);
      K.mirar([4.1, 2.2, ZL - 10.8], [-5.0, 2.6, ZL + 4.1]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(LUGAR[B.plano] || 'quarto');
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    menino.g.visible = false; menino.g.rotation.x = 0;
    tudo.forEach((g) => { g.visible = false; });
    menino.g.position.y = 0;
    oculosK = 0; oculosAlvos = [];
    cad.position.set(...CAD_LADO); cad.rotation.y = PI * 0.75;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.75, 0.1); telaM.g.rotation.set(0, 0, 0);
    erro.userData.treme = 0;
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    // a gente que anda na calçada some no trecho das lojas (não passa na frente do Enzo nem da câmera). A rua liga o
    // figurante de novo a cada quadro (colocar), então ele encolhe em vez de sumir
    CS.todos.rua.grupo.children.forEach((o) => {
      if (!o.isGroup || Math.abs(Math.abs(o.position.x) - 3.65) > 0.45) return;
      const some = o.position.z > ZL - 18 && o.position.z < ZP + 10;
      o.scale.setScalar(some ? 0.0001 : 1);
    });
    P[B.plano](B, tc);
    // depois da câmera: o óculos no rosto, as placas viradas pra câmera e a página tremendo
    poeOculos();
    encarar.forEach((m) => { if (m.visible && m !== lente) m.lookAt(K.camera.position); });
    if (erro.visible && erro.userData.treme) erro.rotateZ(erro.userData.treme);
    // a cadeira gira junto com o Enzo quando ele está sentado nela (senão o encosto tapa ele)
    if (menino.g.visible && Math.hypot(menino.g.position.x - SEAT[0], menino.g.position.z - SEAT[2]) < 0.05) cad.rotation.y = menino.g.rotation.y;
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
