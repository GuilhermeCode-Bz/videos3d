// A loja que o ChatGPT não conhece (canal Mappoa, molde de 45 s).
// A metáfora: a busca com IA é um robô gigante andando pela rua de noite com uma lanterna; ele ilumina as lojas que têm
// site e passa reto pelo quiosque do chaveiro, que fica apagado. O Caio (o menino do canal) oferece site pra quem já
// tem, espera 30 dias à toa, o rival acende a luz do chaveiro primeiro e fecha; na virada o Caio acende a PRÓPRIA
// lanterna, investe no sistema, digita mappoa.com e vem a lista dos chaveiros de Caruaru sem site. Quatro lugares
// (K.cenarios): a rua de noite, o quarto do Caio, o palco do Mappoa. Cada plano começa com as linhas da ficha.
(function () {
  const PI = Math.PI;
  let bl, CS, menino, ze, dona, rival, robo, roboIA, comp, cel, navG, telaC, telaM, cad, FOV0;
  let qZe, qAg, lanterna, lantRival, feixeR, feixeC, feixeV, contrato, carimbo;
  const tudo = [], fx = {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador do Caio, a cadeira e onde ele fica de pé
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], CEL_Q = [0.75, 0, -1.25];
  // Rua de noite: o quiosque do Seu Zé no lado esquerdo do calçadão, o do Agreste mais pra frente, no lado direito
  const CZ = -5;
  const Q_ZE = [-1.5, 0, CZ], ZE = [-0.35, 0, CZ + 0.55], CHAT = [1.05, 0, CZ + 0.5];
  const Q_AG = [1.5, 0, CZ + 9], DONA = [0.35, 0, CZ + 9.6];
  const LUGAR = { gancho: 'rua', oferece: 'quarto', espera: 'quarto', apagado: 'rua', rival: 'rua', lanterna: 'quarto', lista: 'quarto', mappoa: 'mundo_mappoa', antes_agora: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'rua' };
  function lugarDe(B, tc) {
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.45) ? 'quarto' : 'rua';
    return LUGAR[B.plano] || 'quarto';
  }

  const CHAVEIROS = [
    { nome: 'Chaveiro Agreste', end: 'Rua Vigário Freire, 212', chips: ['whats', 'tel'] },
    { nome: 'Chave Mestra', end: 'Av. Agamenon Magalhães, 870', chips: ['whats'] },
    { nome: 'Chaveiro Boa Vista', end: 'Rua Silvino Macêdo, 45', chips: ['tel', 'insta'] },
    { nome: 'Chaves 24h Salgado', end: 'Rua São Sebastião, 133', chips: ['whats', 'insta'] }
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
  function texCanvas(w, h, desenho) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    desenho(cv.getContext('2d'), w, h);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  function folha(l, a, px, desenho) {
    const t = texCanvas(px, Math.round((px * a) / l), desenho);
    return new THREE.Mesh(new THREE.PlaneGeometry(l, a), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide }));
  }

  // ---------- Telas desenhadas ----------
  // O e-mail "faço sites" pra quem já tem site, e as respostas "Já temos site"
  function emailJaTem(c, w, h, e) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    rr(c, w * 0.05, h * 0.05, w * 0.9, h * 0.13, 10, '#e7eefb');
    txt(c, 'Para: Padaria Pão Bom', w * 0.09, h * 0.115, w * 0.05, '#2f4a7a', 700, 'left', w * 0.82);
    txt(c, 'Proposta: faço sites.', w * 0.09, h * 0.27, w * 0.068, '#111', 900, 'left', w * 0.84);
    const n = e.n || 0;
    for (let i = 0; i < Math.min(3, n); i++) {
      rr(c, w * 0.08, h * (0.38 + i * 0.18), w * 0.84, h * 0.14, 12, '#fde8e7');
      txt(c, '"Já temos site."', w * 0.13, h * (0.45 + i * 0.18), w * 0.06, '#b42318', 900, 'left', w * 0.75);
    }
  }
  // O celular gigante parado: nenhuma mensagem
  function celVazio(c, w, h, e) {
    const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, '#1d2b4f'); d.addColorStop(1, '#3a2d63'); c.fillStyle = d; c.fillRect(0, 0, w, h);
    txt(c, '21:40', w / 2, h * 0.12, w * 0.16, '#ffffff', 800, 'center');
    txt(c, 'Dia ' + (e.dia || 30), w / 2, h * 0.22, w * 0.08, '#c9d4ff', 700, 'center');
    rr(c, w * 0.08, h * 0.42, w * 0.84, h * 0.2, 22, 'rgba(255,255,255,0.92)');
    txt(c, 'Nenhuma', w / 2, h * 0.49, w * 0.11, '#e8352b', 900, 'center');
    txt(c, 'mensagem', w / 2, h * 0.56, w * 0.11, '#e8352b', 900, 'center');
  }
  // O chat com a IA: perguntaram onde tem chaveiro e ela só conhece os que têm site
  function chatIA(c, w, h, e) {
    c.fillStyle = '#f4f5f8'; c.fillRect(0, 0, w, h);
    rr(c, 0, 0, w, h * 0.09, 0, '#1e1f2b');
    txt(c, 'Assistente de IA', w / 2, h * 0.048, w * 0.075, '#ffffff', 800, 'center');
    rr(c, w * 0.22, h * 0.13, w * 0.72, h * 0.13, 22, '#2f6fd6');
    txt(c, 'Onde tem chaveiro', w * 0.27, h * 0.175, w * 0.06, '#fff', 800, 'left', w * 0.64);
    txt(c, 'em Caruaru?', w * 0.27, h * 0.225, w * 0.06, '#fff', 800, 'left', w * 0.64);
    if (e.resp) {
      rr(c, w * 0.06, h * 0.31, w * 0.82, h * 0.3, 22, '#ffffff');
      txt(c, 'Encontrei estes:', w * 0.11, h * 0.36, w * 0.058, '#333', 800);
      txt(c, '• Chaves Centro', w * 0.11, h * 0.43, w * 0.062, '#111', 900);
      txt(c, '• Rei do Segredo', w * 0.11, h * 0.5, w * 0.062, '#111', 900);
      txt(c, '(os dois têm site)', w * 0.11, h * 0.565, w * 0.05, '#6a6f78', 700);
    }
    if (e.ze) {
      rr(c, w * 0.06, h * 0.67, w * 0.88, h * 0.22, 22, '#fde8e7');
      txt(c, 'Chaveiro do Zé:', w / 2, h * 0.73, w * 0.068, '#b42318', 900, 'center');
      txt(c, 'não encontrado', w / 2, h * 0.81, w * 0.075, '#b42318', 900, 'center');
    }
  }
  function siteDemo(c, w, h) {
    c.fillStyle = '#f7f9fc'; c.fillRect(0, 0, w, h);
    const d = c.createLinearGradient(0, 0, w, 0); d.addColorStop(0, '#2fb5a6'); d.addColorStop(1, '#2f6fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h * 0.34);
    txt(c, 'Caio Web Design', w * 0.06, h * 0.13, w * 0.072, '#fff', 900); txt(c, 'sites que aparecem', w * 0.06, h * 0.24, w * 0.045, '#fff', 700);
    [0, 1, 2].forEach((i) => { rr(c, w * (0.06 + i * 0.31), h * 0.45, w * 0.27, h * 0.45, 10, '#fff'); rr(c, w * (0.08 + i * 0.31), h * 0.48, w * 0.23, h * 0.22, 8, ['#c7f0ea', '#fde68a', '#c7d7fe'][i]); });
  }
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }

  // ---------- O feixe da lanterna (cone de luz + a mancha onde bate) ----------
  function fazFeixe(raio, cor = 0xfff1c2) {
    const g = new THREE.Group();
    const H = 10;
    const mat = new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(raio, H, 40, 1, true).translate(0, -H / 2, 0).rotateX(-PI / 2), mat);
    g.add(cone);
    const matM = new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const mancha = new THREE.Mesh(new THREE.CircleGeometry(raio * 1.1, 40), matM);
    g.visible = false; mancha.visible = false;
    K.scene.add(g); K.scene.add(mancha);
    return {
      g, mancha,
      esconder() { g.visible = false; mancha.visible = false; },
      // de: a boca da lanterna; ate: onde a luz bate (no chão ou numa fachada); forca de 0 a 1
      em(de, ate, forca = 1, normal) {
        g.visible = mancha.visible = forca > 0.01;
        g.position.set(...de); g.lookAt(V(...ate));
        const d = V(...de).distanceTo(V(...ate));
        g.scale.set(1, 1, d / H);
        mat.opacity = 0.2 * forca; matM.opacity = 0.5 * forca;
        mancha.position.set(...ate);
        if (normal) mancha.lookAt(V(ate[0] + normal[0], ate[1] + normal[1], ate[2] + normal[2]));
        else mancha.lookAt(V(...de));
      }
    };
  }
  // A lanterna de mão (cilindro preto com a boca amarela), apontando pro +z do grupo
  function fazLanterna(cor = 0x22252b) {
    const g = new THREE.Group();
    const corpo = K.malha(new THREE.CylinderGeometry(0.05, 0.045, 0.3, 18).rotateX(PI / 2), K.mat(cor, { roughness: 0.4 }));
    const cabeca = K.malha(new THREE.CylinderGeometry(0.085, 0.06, 0.12, 20).rotateX(PI / 2), K.mat(0xf39a1e, { roughness: 0.4 }));
    cabeca.position.z = 0.19;
    const vidro = new THREE.Mesh(new THREE.CircleGeometry(0.075, 20), new THREE.MeshBasicMaterial({ color: 0xfff6d0 }));
    vidro.position.z = 0.252;
    g.add(corpo, cabeca, vidro);
    g.visible = false; K.scene.add(g);
    return g;
  }
  // põe a lanterna na mão do boneco apontando pro alvo; devolve a boca dela
  function lanternaNa(b, lg, alvo, esc = 1.3) {
    ve(lg); lg.scale.setScalar(esc);
    const m = b.mao(1);
    lg.position.set(...m); lg.lookAt(V(...alvo));
    lg.updateMatrixWorld(true);
    const boca = V(0, 0, 0.27).applyMatrix4(lg.matrixWorld);
    return [boca.x, boca.y, boca.z];
  }

  // ---------- O robô gigante da IA (7 m, cinza claro com detalhes roxos, "IA" no peito) ----------
  function fazRoboIA() {
    const g = new THREE.Group();
    const casca = K.mat(0xe4e8ef, { roughness: 0.35 }), junta = K.mat(0x3a3f4a, { roughness: 0.5 }), roxo = K.mat(0x7c5cff, { roughness: 0.4 });
    const brilho = new THREE.MeshBasicMaterial({ color: 0x8ef0ff });
    const corpo = new THREE.Group(); g.add(corpo);
    // pernas (pivô no quadril)
    const pernas = [-1, 1].map((l) => {
      const q = new THREE.Group(); q.position.set(l * 0.62, 2.55, 0); g.add(q);
      const coxa = K.malha(new THREE.CapsuleGeometry(0.34, 1.6, 6, 14), junta); coxa.position.y = -1.05; q.add(coxa);
      const pe = K.malha(new THREE.BoxGeometry(0.9, 0.42, 1.35), casca); pe.position.set(0, -2.32, 0.18); q.add(pe);
      const faixa = K.malha(new THREE.BoxGeometry(0.92, 0.1, 1.37), roxo); faixa.position.set(0, -2.18, 0.18); q.add(faixa);
      return q;
    });
    const tronco = K.malha(new THREE.CapsuleGeometry(1.05, 1.0, 8, 20), casca); tronco.scale.set(1.05, 1, 0.72); tronco.position.y = 3.75; corpo.add(tronco);
    const cinto = K.malha(new THREE.CylinderGeometry(0.98, 0.98, 0.22, 28), roxo); cinto.scale.set(1.05, 1, 0.75); cinto.position.y = 2.95; corpo.add(cinto);
    // o "IA" aceso no peito
    const placa = new THREE.Mesh(new THREE.CircleGeometry(0.46, 36), new THREE.MeshBasicMaterial({ map: texCanvas(256, 256, (c, w, h) => {
      c.fillStyle = '#1b1438'; c.beginPath(); c.arc(w / 2, h / 2, w / 2, 0, 7); c.fill();
      c.strokeStyle = '#8ef0ff'; c.lineWidth = 12; c.beginPath(); c.arc(w / 2, h / 2, w / 2 - 12, 0, 7); c.stroke();
      txt(c, 'IA', w / 2, h / 2 + 6, 128, '#8ef0ff', 900, 'center');
    }) }));
    placa.position.set(0, 3.95, 0.79); corpo.add(placa);
    // cabeça com o visor e os olhos
    const cab = new THREE.Group(); cab.position.y = 5.55; corpo.add(cab);
    const cranio = K.malha(new THREE.SphereGeometry(0.85, 28, 20), casca); cranio.scale.set(1.15, 0.92, 0.95); cab.add(cranio);
    const visor = K.malha(new THREE.SphereGeometry(0.72, 28, 20), K.mat(0x14122a, { roughness: 0.2 })); visor.scale.set(1.12, 0.62, 0.55); visor.position.z = 0.48; cab.add(visor);
    const olhos = [-1, 1].map((l) => { const o = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 14), brilho); o.position.set(l * 0.3, 0.04, 0.84); o.scale.z = 0.4; cab.add(o); return o; });
    const ant = K.malha(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 10), junta); ant.position.y = 0.95; cab.add(ant);
    const bola = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), new THREE.MeshBasicMaterial({ color: 0xb69cff })); bola.position.y = 1.25; cab.add(bola);
    [-1, 1].forEach((l) => { const o = K.malha(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 20).rotateZ(PI / 2), roxo); o.position.x = l * 0.98; cab.add(o); });
    // braços (pivô no ombro); a mão direita segura a lanterna gigante
    const bracos = [-1, 1].map((l) => {
      const o = new THREE.Group(); o.position.set(l * 1.25, 4.45, 0); corpo.add(o);
      const omb = K.malha(new THREE.SphereGeometry(0.36, 18, 14), roxo); o.add(omb);
      const b = K.malha(new THREE.CapsuleGeometry(0.24, 1.5, 6, 14), junta); b.position.y = -1.0; o.add(b);
      const m = K.malha(new THREE.SphereGeometry(0.34, 18, 14), casca); m.position.y = -1.95; o.add(m);
      return o;
    });
    const lant = new THREE.Group();
    const lc = K.malha(new THREE.CylinderGeometry(0.2, 0.18, 1.0, 20).rotateX(PI / 2), junta); lant.add(lc);
    const lb = K.malha(new THREE.CylinderGeometry(0.36, 0.22, 0.4, 24).rotateX(PI / 2), K.mat(0xf39a1e, { roughness: 0.4 })); lb.position.z = 0.65; lant.add(lb);
    const lv = new THREE.Mesh(new THREE.CircleGeometry(0.33, 24), new THREE.MeshBasicMaterial({ color: 0xfff6d0 })); lv.position.z = 0.86; lant.add(lv);
    g.add(lant);
    g.visible = false; K.scene.add(g);
    const mao = V();
    return {
      g, cab, olhos,
      // pos: o chão embaixo do robô; rumo: pra onde anda; t: o tempo; anda: 0 parado, 1 andando; alvo: onde a lanterna aponta
      em(pos, rumo, t, anda, alvo) {
        g.visible = true;
        g.position.set(...pos); g.rotation.y = rumo;
        const s = Math.sin(t * 4.2) * anda;
        pernas[0].rotation.x = s * 0.38; pernas[1].rotation.x = -s * 0.38;
        corpo.position.y = Math.abs(Math.cos(t * 4.2)) * 0.12 * anda;
        corpo.rotation.z = s * 0.03;
        bracos[0].rotation.set(-s * 0.3, 0, -0.12);
        bracos[1].rotation.set(-1.15, 0, 0.18);
        cab.rotation.y = Math.sin(t * 1.7) * 0.25;
        g.updateMatrixWorld(true);
        bracos[1].children[2].getWorldPosition(mao);
        lant.position.copy(g.worldToLocal(mao.clone()));
        lant.rotation.set(0, 0, 0);
        g.updateMatrixWorld(true);
        const alvoLocal = g.worldToLocal(V(...alvo));
        lant.lookAt(alvoLocal);
        lant.updateMatrixWorld(true);
        const boca = V(0, 0, 0.9).applyMatrix4(lant.matrixWorld);
        return [boca.x, boca.y, boca.z];
      },
      cabeca() { cab.updateMatrixWorld(true); const p = cab.getWorldPosition(V()); return [p.x, p.y, p.z]; }
    };
  }

  // ---------- O quiosque do chaveiro (balcão, toldo, placa e a chave gigante em cima). acender(k): 0 apagado, 1 aceso ----------
  function fazQuiosque(nome) {
    const g = new THREE.Group();
    const madeira = K.mat(0x6b4a2e, { roughness: 0.8 }), metal = K.mat(0x4a505c, { roughness: 0.5 });
    const balcao = K.malha(new THREE.BoxGeometry(1.9, 1.05, 1.0), madeira); balcao.position.set(0, 0.525, 0); g.add(balcao);
    const tampo = K.malha(new THREE.BoxGeometry(2.0, 0.08, 1.1), metal); tampo.position.set(0, 1.09, 0); g.add(tampo);
    const fundo = K.malha(new THREE.BoxGeometry(1.9, 1.35, 0.12), madeira); fundo.position.set(0, 1.78, -0.45); g.add(fundo);
    [-0.9, 0.9].forEach((x) => { const p = K.malha(new THREE.BoxGeometry(0.1, 1.5, 0.1), metal); p.position.set(x, 1.85, 0.45); g.add(p); });
    const toldoT = texCanvas(256, 64, (c, w, h) => { for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#f4f1ea' : '#d8343a'; c.fillRect((i * w) / 8, 0, w / 8 + 1, h); } });
    const toldoMat = new THREE.MeshStandardMaterial({ map: toldoT, roughness: 0.8 });
    const toldo = K.malha(new THREE.BoxGeometry(2.2, 0.08, 1.3), toldoMat); toldo.position.set(0, 2.62, 0.05); toldo.rotation.x = 0.12; g.add(toldo);
    // a placa (acende junto)
    const placaT = texCanvas(512, 128, (c, w, h) => {
      rr(c, 0, 0, w, h, 16, '#1e2a44');
      txt(c, '🔑 ' + nome, w / 2, h / 2 + 4, 58, '#ffd36b', 900, 'center', w - 30);
    });
    const placaMat = new THREE.MeshStandardMaterial({ map: placaT, emissive: 0xffffff, emissiveMap: placaT, emissiveIntensity: 0, roughness: 0.5 });
    const placa = K.malha(new THREE.BoxGeometry(2.1, 0.52, 0.08), placaMat); placa.position.set(0, 3.0, 0.42); g.add(placa);
    // a chave gigante em cima da placa
    const chave = K.m3d('chave', { cor: 0xf5c518 }); chave.scale.setScalar(1.4); chave.position.set(0, 3.3, 0.35); g.add(chave);
    // as chaves penduradas no painel do fundo
    const chaves = [];
    for (let i = 0; i < 10; i++) { const k = K.malha(new THREE.BoxGeometry(0.06, 0.16, 0.02), K.mat(0xd9b84a, { metalness: 0.6, roughness: 0.35 })); k.position.set(-0.7 + (i % 5) * 0.35, 1.95 - Math.floor(i / 5) * 0.4, -0.38); g.add(k); chaves.push(k); }
    // a lâmpada (com o halo) que acende
    const lampMat = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), lampMat); lamp.position.set(0, 2.45, 0.1); g.add(lamp);
    const halo = K.halo(0xffd88a, 3.0); halo.position.copy(lamp.position); g.add(halo);
    const luz = new THREE.PointLight(0xffd88a, 0, 7, 1.6); luz.position.set(0, 2.2, 0.8); g.add(luz);
    // o vidro escuro na frente do balcão
    const sombra = new THREE.Mesh(new THREE.PlaneGeometry(1.86, 1.0), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false }));
    sombra.position.set(0, 0.55, 0.505); g.add(sombra);
    g.visible = false; K.scene.add(g);
    return {
      g,
      acender(k) {
        placaMat.emissiveIntensity = 0.9 * k;
        placaMat.color.setScalar(K.lerp(0.25, 1, k));
        toldoMat.color.setScalar(K.lerp(0.35, 1, k));
        lampMat.color.setHex(k > 0.5 ? 0xfff2c4 : 0x444444);
        halo.visible = k > 0.05; halo.scale.setScalar(Math.max(0.01, k));
        luz.intensity = 6 * k;
        sombra.material.opacity = K.lerp(0.5, 0.05, k);
      }
    };
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    CS = K.cenarios([['rua_predios', { hora: 'noite' }, 'rua'], ['home_office', {}, 'quarto'], 'mundo_mappoa']);
    const Cr = CS.todos.rua;
    // as árvores e os bancos do meio do calçadão saem perto da cena (tapam a câmera)
    if (Cr.grupo) Cr.grupo.children.forEach((o) => { if (Math.abs(Math.abs(o.position.x) - 2.6) < 0.05 && o.position.z > CZ - 22 && o.position.z < CZ + 26) o.visible = false; });

    const T = K.telasMappoa, M = K.MAPPOA;
    T.listaChav = (c, w, h, e) => {
      T.lista(c, w, h, { grupo: 'SEM SITE', itens: CHAVEIROS, n: e.n, sel: e.sel });
      c.fillStyle = '#fff'; c.strokeStyle = M.borda; c.lineWidth = 2; c.beginPath(); c.roundRect(18, 140, w - 36, 54, 16); c.fill(); c.stroke();
      txt(c, 'Chaveiros · Caruaru, PE', 36, 168, 21, M.marinho, 700, 'left', w - 72);
      c.font = '800 22px Montserrat, Arial, sans-serif'; const dx = c.measureText('SEM SITE').width;
      c.fillStyle = M.fundo; c.fillRect(30 + dx, 204, 70, 38);
      rr(c, 34 + dx, 208, 110, 28, 14, '#fff4dc'); txt(c, 'sem site', 89 + dx, 223, 17, '#d97706', 800, 'center');
    };
    T.analiseChav = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Chaveiro Agreste', ate: e.ate, aderencia: 0.88 * k,
        dores: ['Sem site próprio', 'Não aparece quando perguntam pra IA'], oportunidades: ['Site com os serviços, o bairro e o WhatsApp 24h'],
        objecoes: ['"Meus clientes me acham no boca a boca"'], abordagem: 'Mostre que quem pergunta pra IA não acha a loja dele.'
      });
      if (e.ate >= 0) txt(c, Math.round(88 * k) + '/100', w - 38, 216, 26, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };

    // Personagens: o Caio (do canal), o Seu Zé do chaveiro, a dona do Chaveiro Agreste, o rival e o robô do Mappoa
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    ze = K.personagem('dono', { cores: { terno: 0x7a5a3a, gravata: 0xf39a1e } }); K.semNome(ze.g); K.nomear('chaveiro', ze.g);
    dona = K.personagem('dona', { cores: { blazer: 0xf39a1e, vestido: 0x2a2f3a } }); K.semNome(dona.g); K.nomear('dona', dona.g);
    rival = K.boneco({ roupa: 'moletom', cores: { moletom: 0xd8343a, punho: 0xa82228, calca: 0x2a2f3a, mochila: 0x2a2f3a, tenis: 0xffffff, cabelo: 0x1c120c, pele: 0xd9a07a } }); K.semNome(rival.g); K.nomear('rival', rival.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // O robô gigante da IA e o feixe da lanterna dele
    roboIA = fazRoboIA(); K.nomear('robo_ia', roboIA.g);
    feixeR = fazFeixe(1.6);
    // Os dois quiosques
    qZe = fazQuiosque('CHAVEIRO DO ZÉ'); guarda(qZe, 'quiosque', Q_ZE);
    qAg = fazQuiosque('CHAVEIRO AGRESTE'); guarda(qAg, 'quiosque2', Q_AG);
    // As lanternas de mão: a do Caio (azul) e a do rival; os feixes
    lanterna = fazLanterna(0x2f6fd6); K.nomear('lanterna', lanterna); tudo.push(lanterna);
    lantRival = fazLanterna(0xa82228); tudo.push(lantRival);
    feixeC = fazFeixe(0.55); feixeV = fazFeixe(0.55);

    // Quarto: o computador, a cadeira, o celular gigante, a barra do endereço e as telas do Mappoa
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cad = K.m3d('cadeira_giratoria'); guarda(cad, null, SEAT);
    cel = K.m3d('celular_gigante'); guarda(cel, 'celular', CEL_Q);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    telaC = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaC, 'tela', TELA_Q);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);
    // Rua: o celular gigante com o chat da IA (o mesmo modelo, outro objeto)
    const chat = K.m3d('celular_gigante'); guarda(chat, 'chat', CHAT); fx.chat = chat;

    // O contrato do rival com o carimbo FECHADO
    contrato = new THREE.Group();
    contrato.add(folha(0.62, 0.82, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 18, '#ffffff');
      txt(c, 'CONTRATO', w / 2, h * 0.12, w * 0.12, '#0b1b3a', 900, 'center');
      txt(c, 'Site do Chaveiro do Zé', w / 2, h * 0.22, w * 0.062, '#4a4f58', 700, 'center', w * 0.9);
      c.fillStyle = '#d6dbe3'; for (let i = 0; i < 6; i++) c.fillRect(w * 0.1, h * (0.34 + i * 0.07), w * (i % 3 === 2 ? 0.5 : 0.8), h * 0.022);
    }));
    carimbo = folha(0.56, 0.22, 400, (c, w, h) => {
      c.strokeStyle = '#d8352b'; c.lineWidth = h * 0.09; c.beginPath(); c.roundRect(h * 0.08, h * 0.08, w - h * 0.16, h * 0.84, 14); c.stroke();
      txt(c, 'FECHADO', w / 2, h / 2 + 2, h * 0.55, '#d8352b', 900, 'center');
    });
    carimbo.position.set(0, -0.12, 0.01); carimbo.rotation.z = 0.22; contrato.add(carimbo);
    K.scene.add(contrato); K.nomear('contrato', contrato); tudo.push(contrato);

    // Efeitos
    fx.pensa = K.balaoPensamento();
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo();
    fx.cont = K.contador();
    fx.papeis = K.folhasVento(77, 30, { papel: true });
    fx.poof = K.poof();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      existe: e('Não existe', 'vermelho'), jaTem: e('Já têm site', 'laranja'), zero: e('0 respostas', 'vermelho'),
      semSite: e('Sem site', 'vermelho'), outro: e('Outro web designer', 'vermelho'), investir: e('Investir', 'azul'),
      cidade: e('Caruaru', 'azul'), precisa: e('Quem precisa de você', 'verde'), achou: e('Achou primeiro!', 'verde'), invis: e('Invisíveis pra IA', 'laranja')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); ve(cad); }
  // O robô andando pela rua (z de onde até onde), a lanterna varrendo as lojas da direita, nunca o quiosque do Zé
  function roboAnda(tc, k, z0, z1) {
    const z = K.lerp(z0, z1, k);
    const alvo = [5.4, 1.6 + Math.sin(tc * 2.2) * 0.6, z + 5.5 + Math.sin(tc * 1.3) * 1.8];
    const boca = roboIA.em([1.8, 0, z], 0, tc, 1, alvo);
    feixeR.em(boca, alvo, 1, [-1, 0, 0]);
    return { z, alvo };
  }
  function passosRobo(t0, t1) { for (let t = t0; t < t1; t += 0.75) { K.som('baque', t, 0.55); K.som('estrondo', t + 0.02, 0.12); } }
  // O Seu Zé no balcão apagado acenando pro robô (ou parado triste)
  function zeAcenando(tc, olhar, acena = true) {
    ze.colocar(ZE, olhar);
    if (acena) { ze.humor('triste'); ze.acenar(tc * 1.5); } else ze.reagir('triste', 1);
  }

  const P = {
    gancho(B, tc) {
      // NA TELA: a rua de noite; o robô gigante da IA vindo pelo calçadão com a lanterna varrendo as lojas da direita; o quiosque CHAVEIRO DO ZÉ apagado do lado esquerdo, o Seu Zé acenando · MOSTRA: robo_ia, quiosque, chaveiro
      // CENÁRIO: a rua entre prédios de noite, as lojas acesas, a gente andando (o cenário cuida)
      const tPe = quando('Perguntaram', B, 0.02), tCh = quando('chaveiro', B, 0.4), tEx = quando('existe', B, 0.85);
      ve(qZe); qZe.acender(0);
      // OBJETOS SE MEXENDO: o robô anda de CZ-6 até CZ+3 durante a frase; a lanterna varre as fachadas da direita
      roboAnda(tc, pc(tc, B.inicio - 0.3, B.ate + 0.3), CZ - 6, CZ + 3);
      // PERSONAGEM: o Seu Zé acena pro robô com os dois braços · em "existe": baixa os braços, triste
      if (tc < tEx) zeAcenando(tc, [1.6, 3.2, CZ + 5]); else zeAcenando(tc, [0.4, 1.4, CZ + 12], false);
      // EFEITOS VISUAIS: o pensamento do robô "Onde tem chaveiro?" · "Não existe" em "existe"
      const cab = roboIA.cabeca();
      if (tc < B.inicio + 2.3) { fx.pensa.em(mais(cab, [-0.7, 0.4, 0.9]), tc - tPe, { texto: 'Onde tem chaveiro?', lado: -1 }); fx.pensa.g.scale.setScalar(2.0); }
      fx.et.existe.em({ tela: [540, 600] }, tc - tEx);
      // SONS: o passo gigante (baque + estrondo) a cada 0,75 s, o zumbido do robô, whoosh em cada corte, o errado em "existe"
      passosRobo(B.inicio, B.ate);
      K.som('zumbido', B.inicio + 0.05, 0.4); K.som('liga', B.inicio, 0.5);
      K.som('ding', tCh, 0.3); K.som('errado', tEx, 0.5);
      // CÂMERA: 4 cortes de ~0,75 s: (1) a cara do robô de baixo, (2) a lanterna batendo nas fachadas, (3) o quiosque apagado com o Zé acenando e o pé do robô passando, (4) o quadro inteiro, topo livre
      const c1 = B.inicio + 0.75, c2 = B.inicio + 1.5, c3 = B.inicio + 2.3;
      [c1, c2, c3].forEach((t) => K.som('whoosh', t - 0.05, 0.35));
      const zR = K.lerp(CZ - 6, CZ + 3, pc(tc, B.inicio - 0.3, B.ate + 0.3));
      if (tc < c1) {
        const k = pc(tc, B.inicio, c1);
        K.mirar([K.lerp(0.2, 0.4, k), 4.4, zR + 7.2], [1.0, 5.6, zR]);
      } else if (tc < c2) {
        const k = pc(tc, c1, c2);
        K.mirar([-1.4, 1.7, zR + 13 - k], [4.6, 2.4, zR + 5]);
      } else if (tc < c3) {
        const k = pc(tc, c2, c3);
        K.mirar([K.lerp(1.0, 0.8, k), 1.65, CZ + K.lerp(8.2, 7.6, k)], [-0.7, 1.9, CZ + 0.2]);
      } else {
        const k = pc(tc, c3, B.ate);
        K.mirar([-0.2, K.lerp(2.4, 2.2, k), CZ + K.lerp(17.5, 16.5, k)], [0.1, 3.3, CZ + 1]);
      }
    },
    oferece(B, tc) {
      // NA TELA: o quarto; o Caio sentado no computador; na tela, o e-mail "faço sites" pra Padaria Pão Bom e as respostas "Já temos site" empilhando · MOSTRA: personagem, monitor
      const tCa = quando('Caio', B, 0.05), tDe = quando('designer', B, 0.25), tOf = quando('oferecendo', B, 0.6), tJa = quando('já', B, 0.88);
      ve(comp);
      // PERSONAGEM: começo digitando animado · em "já": olha a tela e coça a cabeça
      sentado(MONITOR);
      if (tc > tJa) menino.reagir('coca_cabeca', tc - tJa); else { menino.reagir('digitando', tc); menino.humor('feliz'); }
      // OBJETOS SE MEXENDO: as respostas "Já temos site" chegando uma a uma a partir de "oferecendo"
      const n = tc > tOf ? Math.min(3, 1 + Math.floor((tc - tOf) / 0.4)) : 0;
      comp.tela.desenhar((c, w, h) => emailJaTem(c, w, h, { n }), 'mail' + n);
      for (let k = 0; k < 3; k++) K.som('errado', tOf + k * 0.4, 0.25);
      for (let k = 0; k < 9; k++) K.som('clique', B.inicio + 0.1 + k * 0.14, 0.25);
      // EFEITOS VISUAIS: "Já têm site" em "oferecendo"
      fx.et.jaTem.em({ tela: [540, 400] }, tc - tOf);
      // CÂMERA: (1) até "designer": chegando · de trás do monitor no rosto dele · (2) passando · de lado, a tela com as respostas
      const cv = (tDe + tOf) / 2; void tCa;
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(1.6, 1.4, k), 1.55, K.lerp(-2.85, -2.7, k)], [-0.4, 1.05, -0.55]); menino.olharPara([0.45, 1.8, -1.0]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(1.0, 0.8, k), 2.3, K.lerp(1.6, 1.3, k)], [-0.5, 1.15, -1.4]); }
    },
    espera(B, tc) {
      // NA TELA: o quarto; o celular gigante do lado da mesa com "Nenhuma mensagem"; o contador "Dia 1 → Dia 30"; papéis do calendário voando; o Caio com a mão na testa · MOSTRA: personagem, celular
      const tTr = quando('Trinta', B, 0.03), tNe = quando('Nenhuma', B, 0.35), tCe = quando('celular', B, 0.65), tMe = quando('mesa', B, 0.92);
      ve(comp, cel);
      comp.tela.desenhar((c, w, h) => emailJaTem(c, w, h, { n: 3 }), 'mail3');
      // PERSONAGEM: sentado virado pro celular · começo olhando o relógio · em "Nenhuma": mão na testa
      sentado([1.4, 1.0, 0.9]);
      if (tc < tNe) menino.reagir('olha_relogio', tc - B.inicio); else menino.reagir('mao_na_testa', tc - tNe);
      // OBJETOS SE MEXENDO: o celular gigante com o dia passando; em "celular" ele treme de leve (nada chega)
      const dia = Math.max(1, Math.min(30, Math.round(1 + 29 * K.clamp((tc - tTr) / 1.4))));
      cel.userData.m3d.tela.desenhar((c, w, h) => celVazio(c, w, h, { dia }), 'cv' + dia);
      cel.rotation.set(0, Math.atan2(2.6 - CEL_Q[0], 3.5 - CEL_Q[2]), 0);
      // EFEITOS VISUAIS: o contador "Dia 30" no começo · "0 respostas" em "Nenhuma" · os papéis do calendário voando
      if (tc < tNe) fx.cont.em(mais(CEL_Q, [-0.2, 2.1, 0.3]), tc - tTr, { de: 1, ate: 30, dur: 1.2, antes: 'Dia ', depois: '', cor: '#f39a1e', tam: 0.8 });
      fx.et.zero.em({ tela: [540, 400] }, tc - tNe);
      fx.papeis.em([0, 1.0, -1.2], tc, { forca: 0.7, largura: 6 });
      // SONS: o tique do relógio · o errado em "Nenhuma" · o ding vazio em "mesa"
      for (let k = 0; k < 6; k++) K.som('clique', B.inicio + k * 0.25, 0.3);
      K.som('errado', tNe, 0.45); K.som('desliga', tMe, 0.4); K.som('whoosh', tCe, 0.3);
      // CÂMERA: (1) até "Nenhuma": chegando · médio · frente-direita · olho (o celular e ele) · (2) afastando · aberto · o quarto
      if (tc < tNe) { const k = K.suave(pc(tc, B.inicio, tNe)); K.mirar([K.lerp(2.3, 2.0, k), 1.75, K.lerp(4.9, 4.5, k)], [0.05, 1.2, -0.9]); }
      else { const k = K.suave(pc(tc, tNe, B.ate)); K.mirar([K.lerp(0.2, 0.0, k), 1.7, K.lerp(4.4, 4.9, k)], [0.1, 1.15, -0.85]); }
    },
    apagado(B, tc) {
      // NA TELA: a rua de noite; o quiosque do Zé apagado entre as lojas acesas; o Seu Zé triste no balcão; o celular gigante do lado com o chat da IA: "Onde tem chaveiro em Caruaru?" → só os que têm site; "Chaveiro do Zé: não encontrado" · MOSTRA: quiosque, chaveiro, chat
      const tCh = quando('chaveiro', B, 0.12), tSi = quando('site', B, 0.4), tCG = quando('ChatGPT', B, 0.6), tAp = quando('apagado', B, 0.9);
      ve(qZe, fx.chat); qZe.acender(0);
      // PERSONAGEM: o Zé no balcão · começo limpando o balcão (segurando) e olhando a rua · em "apagado": ombros, triste
      ze.colocar(ZE, tc < tAp ? [1.0, 1.4, CZ + 8] : [0.3, 1.4, CZ + 6]);
      if (tc < tAp) { ze.reagir('segurando', tc - B.inicio); ze.humor('triste'); } else ze.reagir('ombros', tc - tAp);
      // OBJETOS SE MEXENDO: o chat sobe em "chaveiro"; a resposta em "site"; o "não encontrado" em "ChatGPT"
      K.entrar(fx.chat, 'cresce', tc - tCh + 0.2, { dur: 0.35 });
      fx.chat.rotation.set(0, Math.atan2(0.1 - CHAT[0], (CZ + 8) - CHAT[2]), 0);
      fx.chat.userData.m3d.tela.desenhar((c, w, h) => chatIA(c, w, h, { resp: tc > tSi, ze: tc > tCG }), 'ch' + (tc > tSi) + (tc > tCG));
      // EFEITOS VISUAIS: "Sem site" em "site" · ✗ em "apagado" (o congela em preto e branco o jogo faz)
      fx.et.semSite.em({ tela: [540, 400] }, tc - tSi);
      if (tc > tAp) fx.simb.em(mais(Q_ZE, [0, 3.9, 0.5]), tc - tAp, { tipo: '✗', tam: 0.9 });
      // SONS: o bip do chat · o errado em "ChatGPT" · o desliga em "apagado"
      K.som('bip', tCh + 0.2, 0.4); K.som('bip', tSi, 0.4); K.som('errado', tCG + 0.1, 0.5); K.som('desliga', tAp, 0.5);
      // CÂMERA: (1) até "site": chegando · o quiosque apagado com as lojas acesas atrás · (2) passando · perto do chat e do Zé
      const cv = (tSi + tCG) / 2;
      if (tc < cv) { const k = K.suave(pc(tc, B.inicio, cv)); K.mirar([K.lerp(1.6, 1.2, k), 1.8, CZ + K.lerp(9.0, 7.6, k)], [-0.8, 1.6, CZ]); }
      else { const k = K.suave(pc(tc, cv, B.ate)); K.mirar([K.lerp(0.5, 0.3, k), 1.65, CZ + K.lerp(6.0, 5.4, k)], [0.3, 1.45, CZ + 0.5]); }
    },
    rival(B, tc) {
      // NA TELA: a rua; o rival de moletom vermelho chega com a lanterna, aponta pro quiosque e ele ACENDE; aperto de mão com o Zé e o contrato FECHADO · MOSTRA: rival, quiosque, contrato
      const tDe = quando('designer', B, 0.25), tAc = quando('acendeu', B, 0.35), tPr = quando('primeiro', B, 0.65), tFe = quando('fechou', B, 0.9);
      ve(qZe);
      const R_A = [0.7, 0, CZ + 6.5], R_B = [0.15, 0, CZ + 1.6];
      const aceso = K.suave(pc(tc, tAc, tAc + 0.3));
      qZe.acender(aceso);
      if (tc < tPr) {
        // PERSONAGEM: o rival anda até o quiosque apontando a lanterna · o Zé se assusta quando acende
        const k = pc(tc, B.inicio - 0.2, tAc);
        rival.irPara(R_A, R_B, k, tc, { reto: true });
        rival.humor('feliz'); rival.apontar(0.25);
        const boca = lanternaNa(rival, lantRival, mais(Q_ZE, [0.2, 2.9, 0.4]));
        feixeV.em(boca, mais(Q_ZE, [0.2, 2.9, 0.45]), 1, [0, 0, 1]);
        ze.colocar(ZE, cabecaDe(rival, -1.3));
        if (tc > tAc) ze.reagir('surpreso', tc - tAc); else ze.reagir('triste', 1);
        fx.et.outro.em(cabecaDe(rival, 0.5), tc - tDe);
        // CÂMERA: (1) atrás do rival, o feixe dele indo no quiosque
        const kc = K.suave(pc(tc, B.inicio, tPr));
        K.mirar([1.4, K.lerp(2.1, 1.9, kc), CZ + K.lerp(10.5, 9.0, kc)], [-0.6, 1.5, CZ + 0.4]);
      } else {
        // INTERAÇÃO: o aperto de mão; o contrato aparece e o carimbo FECHADO bate em "fechou"
        rival.colocar(R_B, [-0.6, 1.4, CZ + 4]); rival.humor('feliz'); rival.apontar(0.35);
        ze.colocar(ZE, [0.6, 1.4, CZ + 4]); ze.humor('feliz');
        if (tc > tFe) ze.reagir('vitoria', tc - tFe);
        // CÂMERA: (2) de lado, o quiosque aceso atrás dos dois
        const kp = K.suave(pc(tc, tPr, B.ate));
        K.mirar([K.lerp(0.25, -0.05, kp), 1.8, CZ + K.lerp(6.8, 6.3, kp)], [-0.15, 1.55, CZ + 0.8]);
        const meio = [(R_B[0] + ZE[0]) / 2 + 0.2, 1.95, (R_B[2] + ZE[2]) / 2 + 0.35];
        contrato.visible = tc > tFe - 0.35;
        contrato.position.set(...meio); contrato.lookAt(K.camera.position);
        contrato.scale.setScalar(pop(tc - tFe + 0.35));
        carimbo.visible = tc > tFe; carimbo.scale.setScalar(tc > tFe ? K.lerp(1.8, 1, K.suave(pc(tc, tFe, tFe + 0.15))) : 0.001);
      }
      // SONS: os passos · o liga em "acendeu" · o baque do carimbo em "fechou" · o certo
      K.som('passo', B.inicio + 0.2, 0.3); K.som('passo', B.inicio + 0.5, 0.3); K.som('passo', B.inicio + 0.8, 0.3);
      K.som('liga', tAc, 0.6); K.som('brilho', tAc + 0.1, 0.4); K.som('baque', tFe, 0.6); K.som('certo', tFe + 0.25, 0.4);
    },
    lanterna(B, tc) {
      // NA TELA: o quarto; o Caio de pé pega a lanterna e acende (o feixe bate na parede); em "investir" a etiqueta; em "digita" ele senta e digita, a barra com mappoa.com aparece acima do computador · MOSTRA: personagem, lanterna, navegador
      const tAc = quando('acende', B, 0.1), tIn = quando('investir', B, 0.4), tDi = quando('digita', B, 0.55), tCo = quando('computador', B, 0.88);
      ve(comp);
      comp.tela.desenhar(tc < tDi ? telaEscura : siteDemo, tc < tDi ? 'esc' : 'demo');
      if (tc < tDi) {
        // PERSONAGEM: de pé, pega a lanterna e aponta pro alto da parede · em "investir": faz sim com a cabeça
        menino.colocar(EM_PE, tc < tIn ? [5.1, 1.6, -1.2] : [1.4, 1.4, 4]);
        menino.apontar(tc < tIn ? 0.3 : 0.9);
        if (tc > tIn) { menino.humor('feliz'); menino.cabeca.rotation.x = Math.sin((tc - tIn) * 12) * 0.12 * K.clamp(1 - (tc - tIn)); } else menino.humor('surpreso');
        const alvo = tc < tIn ? [5.15, 2.4, -1.2] : [1.6, 3.95, -1.6];
        const boca = lanternaNa(menino, lanterna, alvo, 1.4);
        const liga = tc > tAc ? 1 : 0;
        if (liga) feixeC.em(boca, alvo, 1, tc < tIn ? [-1, 0, 0] : [0, -1, 0]);
        fx.et.investir.em(cabecaDe(menino, 0.55), tc - tIn);
        // CÂMERA: (1) até "investir": chegando · ele e a lanterna, o feixe na parede · (2) girando de leve
        if (tc < tIn) { const k = K.suave(pc(tc, B.inicio, tIn)); K.mirar([K.lerp(1.6, 1.4, k), 1.7, K.lerp(3.4, 3.0, k)], [0.95, 1.7, -0.5]); }
        else { const k = K.suave(pc(tc, tIn, tDi)); K.mirar([K.lerp(1.5, 1.3, k), 1.6, K.lerp(2.3, 2.0, k)], [0.75, 1.55, -0.45]); }
      } else {
        // PERSONAGEM: senta e digita; a lanterna fica acesa em cima da mesa apontando pro teto
        sentado(MONITOR); menino.reagir('digitando', tc);
        ve(lanterna); lanterna.scale.setScalar(1.4); lanterna.position.set(0.2, 0.92, -1.15); lanterna.lookAt(V(1.2, 0.95, -1.6));
        ve(navG); K.entrar(navG.g, 'cresce', tc - tDi + 0.15, { dur: 0.3 });
        const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi - 0.05) / 0.07)));
        navG.mostrar('endereco', { letras, ir: tc > tCo });
        // CÂMERA: (3) chegando · perto · a barra, o monitor e ele
        K.filmar([navG, MONITOR, cabecaDe(menino, 0.2)], 'chegando', pc(tc, tDi, B.ate), { plano: 'perto', lado: -24, altura: 'olho', tam: 1.4 });
      }
      // SONS: o clique da lanterna em "acende" · o ding em "investir" · as teclas a partir de "digita"
      K.som('clique', tAc, 0.8); K.som('liga', tAc + 0.03, 0.5); K.som('ding', tIn, 0.4);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + 0.05 + k * 0.07, 0.25);
      K.som('whoosh', tDi, 0.35);
    },
    lista(B, tc) {
      // NA TELA: a lista dos chaveiros de Caruaru sem site sobe do computador; a lanterna na mesa ilumina; o Caio de pé aponta · MOSTRA: tela, personagem, monitor
      const tVe = quando('Vem', B, 0.02), tCh = quando('chaveiros', B, 0.25), tCa = quando('Caruaru', B, 0.45), tAp = quando('apagados', B, 0.78);
      ve(comp, navG); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      ve(telaC); const q = K.suave(K.clamp((tc - tVe) / 0.45));
      telaC.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); telaC.g.scale.setScalar(K.lerp(0.4, 1, q));
      const n = tc > tCh ? 1 + Math.floor((tc - tCh) / 0.22) : 0;
      telaC.mostrar('listaChav', { n: Math.min(4, n), sel: n >= 1 ? 0 : -1 });
      for (let k = 0; k < 4; k++) K.som('bip', tCh + k * 0.22, 0.25);
      K.som('brilho', tVe, 0.5);
      // PERSONAGEM: levanta surpreso · em "Caruaru" aponta o Chaveiro Agreste · em "apagados" comemora
      menino.colocar(mais(EM_PE, [0.35, 0, 0.1]), TELA_Q);
      if (tc > tAp) menino.reagir('comemorando', tc - tAp); else if (tc > tCa) menino.apontar(0.6); else menino.reagir('surpreso', tc - tVe);
      // EFEITOS VISUAIS: "Caruaru" em "Caruaru" · "Invisíveis pra IA" em "apagados"
      if (tc < tAp) fx.et.cidade.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tCa); else fx.et.invis.em({ tela: [540, 400] }, tc - tAp);
      K.som('ding', tAp, 0.4);
      // CÂMERA: (1) até "Caruaru": subindo · médio · frente · olho · (2) passando · médio · esquerda
      if (tc < tCa) K.filmar([telaC, mais(TELA_Q, [-0.75, -1.1, 0]), menino], 'subindo', pc(tc, B.inicio, tCa), { plano: 'medio', lado: 'frente', altura: 'olho' });
      else K.filmar([telaC, menino, MONITOR], 'passando', pc(tc, tCa, B.ate), { plano: 'medio', lado: -16, altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: no palco, a análise do Chaveiro Agreste (88/100); o robô do Mappoa à esquerda; o Caio à direita · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseChav', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
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
      // NA TELA: (1) Antes: o quarto, ele digitando "faço sites" pra quem já tem, as respostas "Já temos site"; (2) Agora: a rua de noite, ele chega de lanterna acesa no Chaveiro Agreste apagado e o quiosque acende; (3) a dona sorri e faz joia, ✓ "Achou primeiro!" · MOSTRA: personagem, quiosque2, dona
      const tA = quando('Agora', B, 0.45), tAc = quando('acha', B, 0.65), tVe = quando('vê', B, 0.92);
      if (tc < tA) {
        ve(comp); comp.tela.desenhar((c, w, h) => emailJaTem(c, w, h, { n: 3 }), 'mail3');
        sentado(MONITOR); menino.reagir('digitando', tc); menino.humor('triste');
        fx.et.jaTem.em({ tela: [540, 400] }, tc - B.inicio - 0.2);
        K.som('whoosh', B.inicio + 0.1, 0.4); K.som('errado', B.inicio + 0.5, 0.3);
        // CÂMERA: (1) afastando · médio · direita · olho
        { const k = K.suave(pc(tc, B.inicio, tA)); K.mirar([K.lerp(1.3, 1.55, k), 1.6, K.lerp(-2.7, -2.9, k)], [-0.4, 1.05, -0.55]); menino.olharPara([0.45, 1.8, -1.0]); }
        return;
      }
      ve(qAg);
      const aceso = K.suave(pc(tc, tAc - 0.1, tAc + 0.25));
      qAg.acender(aceso);
      const C_A = [-0.3, 0, CZ + 14.6], C_B = [-0.6, 0, CZ + 11.0];
      if (tc < tAc + 0.35) {
        // a rua: ele anda com a lanterna acesa até o quiosque apagado; o feixe acha a placa
        const k = pc(tc, tA - 0.1, tAc);
        menino.irPara(C_A, C_B, k, tc, { reto: true });
        menino.humor('feliz'); menino.apontar(0.2);
        const boca = lanternaNa(menino, lanterna, mais(Q_AG, [0, 2.9, 0.45]), 1.4);
        feixeC.em(boca, mais(Q_AG, [0, 2.9, 0.47]), 1, [0, 0, 1]);
        dona.colocar(DONA, [0.2, 1.4, CZ + 14]); dona.reagir(tc > tAc ? 'surpreso' : 'triste', tc > tAc ? tc - tAc : 1);
        K.som('passo', tA + 0.15, 0.3); K.som('passo', tA + 0.45, 0.3); K.som('whoosh', tA, 0.5);
        // CÂMERA: (2) de baixo pra cima, atrás dele, o quiosque e os prédios gigantes
        const kh = K.suave(pc(tc, tA, tAc + 0.35));
        K.mirar([0.35, 0.8, CZ + K.lerp(19.2, 18.4, kh)], [0.45, K.lerp(2.3, 2.6, kh), CZ + 9]);
      } else {
        // ele chega e mostra a análise; a dona faz joia
        menino.colocar([-0.75, 0, CZ + 10.4], [1.4, 1.4, CZ + 14]);
        menino.reagir('mostrando', tc - tAc); menino.pose({ x: -0.9, z: 0.3, c: -0.4 }, { z: 0.15 });
        dona.colocar(DONA, [0.6, 1.4, CZ + 15]); dona.humor('feliz');
        if (tc > tVe - 0.3) dona.reagir('vitoria', tc - tVe + 0.3); else dona.reagir('surpreso', tc - tAc);
        ve(telaM); const m = menino.mao(0); telaM.g.position.set(m[0] - 0.25, m[1] + 0.35, m[2] + 0.15); telaM.g.rotation.set(0, 0.15, 0); telaM.g.scale.setScalar(0.34 * pop(tc - tAc - 0.35));
        telaM.mostrar('analiseChav', { ate: 2, score: 1 });
        if (tc > tVe - 0.3) fx.simb.em(mais(DONA, [0.3, 2.35, 0.3]), tc - tVe + 0.3, { tipo: '✓', tam: 0.75 });
        fx.et.achou.em({ tela: [540, 400] }, tc - tAc - 0.35);
        // CÂMERA: (3) chegando · médio · os dois de frente com o quiosque aceso atrás
        const k3 = K.suave(pc(tc, tAc + 0.35, B.ate));
        K.mirar([K.lerp(1.0, 0.8, k3), 1.7, CZ + K.lerp(15.4, 14.8, k3)], [-0.05, 1.5, CZ + 9.9]);
      }
      // SONS: o liga e o brilho quando acende · o certo no ✓
      K.som('liga', tAc, 0.6); K.som('brilho', tAc + 0.05, 0.5); K.som('certo', tVe - 0.3, 0.6); K.som('etiqueta', tAc + 0.35, 0.3);
    },
    segue(B, tc) {
      // NA TELA: o Caio de pé no quarto; o cartão de seguir entra em "Segue" e vira "Seguindo"; a barra com mappoa.com sendo digitada em "digita"; o robô do Mappoa acenando · MOSTRA: personagem, navegador, monitor
      const tSg = quando('Segue', B, 0.02), tPc = quando('computador', B, 0.42), tDi = quando('digita', B, 0.55), tTe = quando('testa', B, 0.85);
      fx.seguir.em(tc - tSg + 0.05);
      ve(comp); comp.tela.desenhar(siteDemo, 'demo');
      ve(navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tTe });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6); K.som('clique', tSg + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // a lanterna acesa em cima da mesa
      ve(lanterna); lanterna.scale.setScalar(1.4); lanterna.position.set(0.2, 0.92, -1.15); lanterna.lookAt(V(-0.4, 3.9, -2.4));
      // PERSONAGEM: começo chamando · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else menino.reagir('chamando', tc - B.inicio);
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar(siteDemo, 'demo');
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      // a capa vende "Invisível pra IA": o robô gigante passando com a lanterna, o quiosque apagado e o Caio na frente, de susto, apontando
      ve(qZe); qZe.acender(0);
      const z = CZ - 1.5;
      const alvo = [5.4, 1.8, z + 5.5];
      const boca = roboIA.em([1.8, 0, z], 0, 0.6, 1, alvo);
      feixeR.em(boca, alvo, 1, [-1, 0, 0]);
      zeAcenando(0.3, roboIA.cabeca());
      menino.colocar([0.35, 0, CZ + 8.2], [0.2, 1.6, CZ + 16]);
      menino.reagir('susto', 0.6);
      K.mirar([0.0, 1.7, CZ + 15.5], [0.1, 3.0, CZ + 2.5]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'rua' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, ze, dona, rival].forEach((b) => { b.g.visible = false; b.g.rotation.x = 0; });
    tudo.forEach((g) => { g.visible = false; });
    roboIA.g.visible = false;
    [feixeR, feixeC, feixeV].forEach((f) => f.esconder());
    menino.cabeca.rotation.x = 0;
    menino.g.position.y = 0;
    telaC.g.scale.setScalar(1); telaC.g.position.set(...TELA_Q); telaC.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    cel.scale.setScalar(1); cel.position.set(...CEL_Q);
    fx.chat.scale.setScalar(1); fx.chat.position.set(...CHAT);
    cad.position.set(-1.6, 0, -0.75); cad.rotation.set(0, 0.6, 0);
    contrato.scale.setScalar(1); carimbo.visible = false;
    fx.pensa.g.scale.setScalar(1);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
    // a cadeira gira junto com o Caio quando ele está sentado nela
    if (menino.g.visible && Math.abs(menino.g.position.x - SEAT[0]) < 0.05 && Math.abs(menino.g.position.z - SEAT[2]) < 0.05) {
      ve(cad); cad.position.set(...SEAT); cad.rotation.set(0, menino.g.rotation.y, 0);
    } else if (lugarDe(B, tc) === 'quarto') ve(cad);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
