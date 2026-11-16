// Web designer, três da manhã. E a planilha ainda tem duas linhas (canal Mappoa).
// O Felipe passa a noite caçando cliente no Google Maps, oficina por oficina: abre site, caça telefone, fuça Instagram e
// copia na planilha. Às 3 da manhã, com as olheiras até o chão e a torre de canecas até o teto, a planilha tem 2 linhas.
// Ele investe "o preço de um pastel", digita mappoa.com no computador, busca oficinas em Londrina e vem a lista (99, 40
// sem site, com os contatos); abre uma oficina e vê a nota e a mensagem pronta; manda pra 20 e 1 topa. Antes x Agora.
// Lugares (K.cenarios): o quarto de noite e de dia, a cidade em maquete, a central do Mappoa, o palco da marca e a
// oficina. Cada plano começa com as linhas da ficha do roteiro.md.
(function () {
  const PI = Math.PI;
  let bl, CS, M, menino, dono, robo, comp, cadeira, nota, moeda, navG, buscaP, listaP, telaM, telaQ, planP, relP, torre, abasG, olhG, poca, lant, fachoM, FOV0;
  const tudo = [], fx = {}, abas = [], pinos = [];
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pc = (tc, a, b) => K.clamp((tc - a) / Math.max(0.15, b - a));
  const pop = (d) => (d <= 0 ? 0.0001 : K.saiVolta(K.clamp(d / 0.35)));
  const ve = (...o) => o.forEach((x) => { (x.g && x.g.isObject3D ? x.g : x).visible = true; });

  // ---------- Onde fica cada coisa ----------
  // Quarto (home_office): o computador no meio, virado pra +z; a cadeira na frente; a torre de canecas à esquerda; a
  // planilha gigante flutuando à direita; o relógio digital acima do monitor
  const COMP = [-0.5, 0, -1.3], MONITOR = [-0.5, 1.185, -1.42], SEAT = [-0.5, 0, -0.62];
  const EM_PE = [0.65, 0, -0.45], TELA_Q = [-1.0, 1.45, -0.4], TECLADO = [-0.5, 0.86, -1.02];
  const TORRE = [-1.5, 0, -1.55], PLAN = [0.95, 2.05, -1.35], REL = [-0.5, 2.3, -1.55];
  const N_CANECAS = 15;
  // Abas do navegador em volta do monitor
  const ABA_POS = [[-1.45, 1.75, -1.0], [0.45, 1.8, -1.0], [-1.3, 2.4, -1.15], [0.3, 2.45, -1.15], [-0.5, 2.85, -1.25], [0.95, 2.4, -1.1]];
  const ABA_TIPO = ['abaSite', 'abaTel', 'abaInsta', 'abaWhats', 'abaMaps', 'abaSite2'];
  // Central e palco do Mappoa
  const LISTA_C = [-0.2, 1.7, 0.8];
  // Oficina: o carro no elevador lá atrás; o dono na frente do carro; o Felipe chegando
  const DONO = [-1.05, 0, 0.7], FEL_O = [0.35, 0, 1.0];
  // Maquete: as oficinas que a lanterna encontra (no telhado)
  const OF_MQ = [[3.4, 3.9, 0], [-3.4, 3.9, -3.4], [3.4, 3.9, -3.4], [0, 3.9, -6.8]];
  const FEL_MQ = [0.05, 0.12, 2.2];

  const LUGAR = {
    gancho: 'noite', caca: 'maquete', abas: 'noite', fuca: 'noite', duas: 'noite', investe: 'noite', busca: 'noite',
    lista: 'central_mappoa', mappoa: 'mundo_mappoa', analise: 'quarto', segue: 'quarto', cartao: 'quarto', capa: 'noite'
  };
  function lugarDe(B, tc) {
    if (B.plano === 'venda') return tc < quando('Mas', B, 0.55) ? 'quarto' : 'oficina';
    if (B.plano === 'antes_agora') return tc < quando('Agora', B, 0.48) ? 'noite' : 'oficina';
    return LUGAR[B.plano] || 'quarto';
  }

  const OFICINAS = [
    { nome: 'Auto Center Tarumã', end: 'Av. Tiradentes, 2140', chips: ['whats', 'tel', 'insta'] },
    { nome: 'Mecânica Bom Motor', end: 'Rua Pará, 812', chips: ['tel', 'whats'] },
    { nome: 'Oficina do Zé Londrina', end: 'Av. Saul Elkind, 455', chips: ['whats'] },
    { nome: 'Freios & Cia Norte', end: 'Rua Goiás, 1290', chips: ['tel', 'insta'] }
  ];

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

  // ---------- Telas desenhadas (largura 540 nos painéis) ----------
  function telas() {
    const T = K.telasMappoa;
    // A planilha feita na mão: cabeçalho verde, só "n" linhas preenchidas e o resto em branco
    T.planilhaFelipe = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#1f7a44'; c.fillRect(0, 0, w, 70); txt(c, 'clientes.xlsx', 24, 36, 32, '#fff', 800);
      const col = [[0, 200, 'Oficina'], [200, 140, 'Telefone'], [340, 200, 'Precisa de site?']];
      c.fillStyle = '#e8edf2'; c.fillRect(0, 70, w, 50); col.forEach(([x, , s]) => txt(c, s, x + 12, 96, 21, '#334155', 800));
      const al = 58, nomes = ['Mecânica Bom Motor', 'Oficina do Zé'];
      for (let i = 0; i < 14; i++) {
        const y = 120 + i * al;
        c.strokeStyle = '#d5dde6'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, y + al); c.lineTo(w, y + al); c.stroke();
        if (i < (e.n || 0)) {
          if (e.pisca && i === e.n - 1) { c.fillStyle = 'rgba(255, 214, 102, .6)'; c.fillRect(0, y, w, al); }
          txt(c, nomes[i], 12, y + al / 2, 21, '#0f172a', 700, 'left', 184); txt(c, '(43) 9....', 212, y + al / 2, 20, '#0f172a', 600);
          txt(c, '?', 440, y + al / 2, 30, '#e8352b', 900, 'center');
        }
      }
      col.forEach(([x]) => { c.strokeStyle = '#d5dde6'; c.beginPath(); c.moveTo(x, 70); c.lineTo(x, h); c.stroke(); });
    };
    // O relógio digital (fundo preto, números vermelhos)
    T.relogioDig = (c, w, h, e) => {
      c.fillStyle = '#0b0d12'; c.fillRect(0, 0, w, h);
      if (e.pisca && Math.floor(e.pisca * 2) % 2) return;
      c.shadowColor = '#ff3b30'; c.shadowBlur = 24;
      txt(c, e.hora || '03:00', w / 2, h / 2 + 6, h * 0.72, '#ff3b30', 900, 'center');
      c.shadowBlur = 0;
    };
    // As abas do navegador
    const barra = (c, w, s, cor) => { rr(c, 0, 0, w, 60, 0, '#e6e9ef'); rr(c, 14, 10, w * 0.62, 50, 14, '#fff'); c.fillStyle = cor; c.beginPath(); c.arc(40, 35, 11, 0, 7); c.fill(); txt(c, s, 60, 35, 22, '#334155', 700, 'left', w * 0.5); };
    T.abaSite = (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); barra(c, w, 'bommotor.com.br', '#1067f8');
      rr(c, 0, 60, w, 90, 0, '#26364f'); txt(c, 'MECÂNICA BOM MOTOR', 24, 105, 28, '#fff', 900, 'left', w - 48);
      rr(c, 24, 175, w * 0.55, 22, 6, '#d6dbe3'); rr(c, 24, 210, w * 0.4, 22, 6, '#d6dbe3'); rr(c, 24, 250, 150, 48, 12, '#f59e0b');
      txt(c, '✓ já tem site', w - 24, h - 40, 30, '#2fb54a', 900, 'right');
    };
    T.abaSite2 = (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); barra(c, w, 'freiosnorte.com', '#1067f8');
      rr(c, 0, 60, w, 90, 0, '#8a1c1c'); txt(c, 'FREIOS & CIA', 24, 105, 30, '#fff', 900);
      rr(c, 24, 175, w * 0.6, 22, 6, '#d6dbe3'); rr(c, 24, 210, w * 0.45, 22, 6, '#d6dbe3');
      txt(c, '✓ já tem site', w - 24, h - 40, 30, '#2fb54a', 900, 'right');
    };
    T.abaTel = (c, w, h) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h); barra(c, w, 'Oficina do Zé', '#ea4335');
      txt(c, 'Oficina do Zé Londrina', 24, 100, 28, '#0f172a', 800, 'left', w - 48); txt(c, '★★★★☆  Oficina mecânica', 24, 140, 22, '#596571', 700);
      txt(c, '📞', 70, 240, 70, '#0f172a', 400, 'center'); txt(c, 'Telefone: ???', 130, 240, 34, '#e8352b', 900);
    };
    T.abaInsta = (c, w, h) => {
      const d = c.createLinearGradient(0, 0, w, h); d.addColorStop(0, '#f59e0b'); d.addColorStop(0.5, '#e4405f'); d.addColorStop(1, '#8a4fd8');
      c.fillStyle = d; c.fillRect(0, 0, w, h); barra(c, w, 'instagram.com', '#e4405f');
      txt(c, '@freios_cia', w / 2, 130, 36, '#fff', 900, 'center'); txt(c, 'Link na bio? ...', w / 2, 185, 26, '#fff', 700, 'center');
      [0, 1, 2].forEach((i) => rr(c, 30 + i * ((w - 80) / 3 + 10), 220, (w - 80) / 3, 90, 8, 'rgba(255,255,255,.55)'));
    };
    T.abaWhats = (c, w, h) => {
      c.fillStyle = '#e7f8ee'; c.fillRect(0, 0, w, h); barra(c, w, 'web.whatsapp.com', '#25d366');
      rr(c, 0, 60, w, 70, 0, '#25d366'); txt(c, 'WhatsApp', 24, 95, 30, '#fff', 900);
      txt(c, 'Número não encontrado', w / 2, 210, 28, '#0f172a', 800, 'center'); txt(c, '?', w / 2, 270, 60, '#e8352b', 900, 'center');
    };
    T.abaMaps = (c, w, h) => {
      c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h); barra(c, w, 'google.com/maps', '#34a853');
      c.strokeStyle = '#fff'; c.lineWidth = 14; [110, 200, 280].forEach((y) => { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y + 20); c.stroke(); });
      [[0.2, 0.45], [0.5, 0.6], [0.78, 0.5], [0.35, 0.82], [0.66, 0.85]].forEach(([x, y]) => { c.fillStyle = '#ea4335'; c.beginPath(); c.arc(w * x, h * y, 13, 0, 7); c.fill(); });
      txt(c, 'oficinas em Londrina', 24, h - 26, 22, '#334155', 800);
    };
    // A busca, a lista, a análise e a mensagem do Mappoa (kit do canal), com as oficinas de Londrina
    T.buscaOf = (c, w, h, e) => T.busca(c, w, h, { nicho: 'Oficinas mecânicas', estado: 'PR', cidade: 'Londrina', qtd: 'Todos os leads disponíveis', digitado: e.digitado, apertado: e.apertado });
    T.listaOf = (c, w, h, e) => {
      const itens = OFICINAS.map((o) => Object.assign({}, o, { chips: e.chips ? o.chips : [] }));
      T.lista(c, w, h, { total: e.total, comSite: e.total >= 99 ? 59 : Math.round(e.total * 0.6), semSite: e.total >= 99 ? 40 : Math.round(e.total * 0.4), grupo: e.sem ? 'SEM SITE' : 'COM SITE', itens, n: e.n, sel: e.sem ? 0 : -1 });
    };
    T.analiseOf = (c, w, h, e) => {
      const k = K.clamp(e.score || 0);
      T.analise(c, w, h, {
        nome: 'Auto Center Tarumã', ate: e.ate, aderencia: 0.88 * k,
        dores: ['Sem site: só tem Instagram', 'Cliente não acha o horário nem o WhatsApp'], oportunidades: ['Site com os serviços e botão do WhatsApp'],
        objecoes: ['"Meus clientes vêm por indicação"'], abordagem: 'Cite as avaliações boas no Maps e mostre quem procura oficina no Google.'
      });
      if (e.ate >= 0) txt(c, Math.round(88 * k) + '/100', w - 38, 216, 30, k >= 1 ? M.verde : M.azul, 900, 'right');
    };
    T.mensagemOf = (c, w, h, e) => T.mensagem(c, w, h, {
      para: 'Para: Auto Center Tarumã', digitado: e.digitado,
      texto: 'Oi! Vi que a Auto Center Tarumã tem ótimas avaliações no Maps, mas ainda não tem site. Faço sites pra oficinas aqui de Londrina. Posso te mostrar uma ideia?'
    });
    T.endereco = (c, w, h, e) => {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.font = '900 52px Montserrat, sans-serif'; c.fillStyle = M.marinho; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('mappoa.com'.slice(0, e.letras) + (e.letras < 10 ? '|' : ''), 34, h / 2 + 2);
      c.fillStyle = e.ir ? M.verde : '#9aa59e'; c.beginPath(); c.roundRect(w - 110, 16, 94, h - 32, 18); c.fill();
      c.font = '900 34px Montserrat, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('Ir', w - 63, h / 2 + 2);
    };
  }
  function telaEscura(c, w, h) { c.fillStyle = '#141b26'; c.fillRect(0, 0, w, h); }
  function telaMaps(c, w, h) { K.telasMappoa.abaMaps(c, w, h); }
  // O mapa da ferramenta (no monitor, logo depois de investir): os pinos de quem precisa de site
  function mapa(c, w, h, e) {
    c.fillStyle = '#e8f1ec'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#ffffff'; c.lineWidth = w * 0.03;
    [0.22, 0.5, 0.78].forEach((y) => { c.beginPath(); c.moveTo(0, h * y); c.lineTo(w, h * (y + 0.06)); c.stroke(); });
    rr(c, 0, 0, w, h * 0.13, 0, '#0b1b3a');
    txt(c, 'Quem precisa de site', w * 0.05, h * 0.066, w * 0.05, '#fff', 800, 'left', w * 0.9);
    const P2 = [[0.18, 0.36], [0.55, 0.3], [0.82, 0.45], [0.36, 0.64], [0.66, 0.7], [0.15, 0.86]];
    P2.slice(0, e.n || 0).forEach(([x, y]) => {
      const px = w * x, py = h * y, r = w * 0.04;
      c.fillStyle = '#00bc7b'; c.beginPath(); c.arc(px, py - r, r, PI, 0); c.lineTo(px, py + r * 0.6); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px, py - r, r * 0.4, 0, PI * 2); c.fill();
    });
  }

  // ---------- A torre de canecas de café (do chão até o teto, torta) ----------
  function fazTorre() {
    const g = new THREE.Group(), r = K.rand(9);
    const branca = K.mat(0xf4f1ea, { roughness: 0.5 }), marrom = K.mat(0x8a5a3a, { roughness: 0.6 }), cafe = K.mat(0x3a2414, { roughness: 0.3 });
    for (let i = 0; i < N_CANECAS; i++) {
      const c = new THREE.Group(), mat = i % 3 === 1 ? marrom : branca;
      const corpo = K.malha(new THREE.CylinderGeometry(0.13, 0.115, 0.26, 20), mat); corpo.position.y = 0.13; c.add(corpo);
      const alca = K.malha(new THREE.TorusGeometry(0.065, 0.018, 8, 16), mat); alca.position.set(0.14, 0.14, 0); c.add(alca);
      const liq = K.malha(new THREE.CylinderGeometry(0.115, 0.115, 0.01, 18), cafe); liq.position.y = 0.255; c.add(liq);
      c.position.set(Math.sin(i * 0.9) * 0.05 + i * 0.012, i * 0.265, Math.cos(i * 1.3) * 0.04);
      c.rotation.set((r() - 0.5) * 0.12, r() * PI * 2, (r() - 0.5) * 0.12);
      c.userData.p0 = c.position.clone(); c.userData.r0 = c.rotation.clone();
      g.add(c);
    }
    return g;
  }
  // Mostra n canecas (as de cima balançam); cai = a caneca do topo caindo (0 a 1)
  function torreEm(n, tc, cai = -1) {
    ve(torre);
    torre.children.forEach((c, i) => {
      c.visible = i < n;
      c.position.copy(c.userData.p0); c.rotation.copy(c.userData.r0);
      c.position.x += Math.sin(tc * 2.4) * 0.006 * i;
    });
    torre.rotation.z = Math.sin(tc * 2.4) * 0.008;
    if (cai >= 0 && n > 0) {
      const c = torre.children[n - 1], q = K.clamp(cai);
      c.position.set(K.lerp(0, 0.9, q), K.lerp((n - 1) * 0.265, 0.02, K.desce ? K.desce(q) : q * q), K.lerp(0, 0.7, q));
      c.rotation.z = q * 2.2;
      if (q >= 1) c.position.y = 0.02 + Math.abs(Math.sin((cai - 1) * 9)) * Math.exp(-(cai - 1) * 6) * 0.25;
    }
  }
  // A torre desabando (k de 0 a 1): cada caneca cai pra um lado
  function torreDesaba(k) {
    ve(torre);
    torre.children.forEach((c, i) => {
      c.visible = true;
      const q = K.clamp(k * 1.6 - (N_CANECAS - i) * 0.03), lado = i % 2 ? 1 : -1;
      c.position.set(Math.sin(i * 0.9) * 0.05 + lado * q * (0.4 + i * 0.05), K.lerp(i * 0.265, 0.05 + (i % 4) * 0.02, q * q), q * (0.5 + (i % 3) * 0.25));
      c.rotation.set(q * lado * 1.3, i, q * lado * 1.6);
    });
  }

  // ---------- As olheiras (escorrem do olho até o chão, como a barba do campeão) ----------
  function olheiras(k) {
    while (olhG.children.length) { const m = olhG.children.pop(); m.geometry.dispose(); }
    if (k <= 0.01) { olhG.visible = false; poca.visible = false; return; }
    menino.g.updateMatrixWorld(true);
    const r = menino.g.rotation.y, f = V(Math.sin(r), 0, Math.cos(r)), lado = V(Math.cos(r), 0, -Math.sin(r));
    const b = menino.g.position.clone(); b.y = 0;
    const chao = b.clone().addScaledVector(f, 0.55);
    [-1, 1].forEach((l) => {
      const olho = menino.cabeca.localToWorld(V(l * 0.1, -0.02, 0.19));
      const pts = [olho, menino.cabeca.localToWorld(V(l * 0.115, -0.12, 0.2)), menino.cabeca.localToWorld(V(l * 0.13, -0.26, 0.17))];
      const q = pts[2];
      pts.push(V(q.x, q.y - 0.25, q.z).addScaledVector(f, 0.08), V(q.x, (q.y + 0.04) / 2, q.z).addScaledVector(f, 0.22).addScaledVector(lado, l * 0.04), chao.clone().addScaledVector(lado, l * 0.12).setY(0.03));
      const todos = new THREE.CatmullRomCurve3(pts).getSpacedPoints(60), n = Math.max(3, Math.ceil(todos.length * K.clamp(k)));
      const parte = new THREE.CatmullRomCurve3(todos.slice(0, n)), seg = Math.max(4, n), rad = 8;
      const geo = new THREE.TubeGeometry(parte, seg, 0.03, rad, false), pos = geo.attributes.position, c = new THREE.Vector3(), v = new THREE.Vector3();
      for (let i = 0; i <= seg; i++) {
        parte.getPointAt(i / seg, c); const s = K.lerp(0.9, 1.8, i / seg);
        for (let j = 0; j <= rad; j++) { const id = i * (rad + 1) + j; v.fromBufferAttribute(pos, id).sub(c).multiplyScalar(s).add(c); pos.setXYZ(id, v.x, v.y, v.z); }
      }
      geo.computeVertexNormals();
      olhG.add(K.malha(geo, fx.matOlh));
    });
    olhG.visible = true;
    if (k > 0.9) { poca.visible = true; poca.position.copy(chao).setY(0.015); poca.scale.setScalar(K.lerp(0.3, 1, K.clamp((k - 0.9) * 10))); }
    else poca.visible = false;
  }

  // ---------- A lanterna (na mão do Felipe gigante) e o facho ----------
  function lanternaEm(alvo, forca) {
    ve(lant);
    const m = V(...menino.mao(1));
    lant.position.copy(m); lant.lookAt(V(...alvo));
    fachoM.visible = forca > 0.01;
    const d = m.distanceTo(V(...alvo));
    fachoM.scale.set(0.9 * forca + 0.05, 0.9 * forca + 0.05, d);
    fachoM.material.opacity = 0.32 * forca;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    FOV0 = K.camera.fov;
    M = K.MAPPOA;
    CS = K.cenarios([['home_office', { hora: 'noite' }, 'noite'], ['home_office', {}, 'quarto'], ['cidade_maquete', {}, 'maquete'], 'central_mappoa', 'mundo_mappoa', 'oficina']);
    telas();

    // Personagens: o Felipe (do canal), o dono da Auto Center Tarumã (de boné e camisa azul de oficina) e o robô
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dono = K.personagem('entregador', { cores: { camiseta: 0x24477e, calca: 0x24477e, bone: 0x24477e, bota: 0x2a2e36, cabelo: 0x2a1a10, pele: 0xc58c5f } });
    if (dono.extras && dono.extras.bag) dono.extras.bag.visible = false;
    K.semNome(dono.g); K.nomear('dono', dono.g);
    robo = K.roboMappoa(); guarda(robo, 'robo');

    // Quarto: o computador, a cadeira, a torre de canecas, a planilha, o relógio, as abas, a nota do pastel e a moeda
    comp = K.computador({ corMesa: 0xc89a6a }); guarda(comp, 'monitor', COMP);
    cadeira = K.m3d('cadeira_giratoria', { cor: 0x2f6fd6 }); guarda(cadeira, 'cadeira', SEAT);
    torre = fazTorre(); guarda(torre, 'canecas', TORRE);
    planP = K.painelMappoa(1.3, 1.9, { px: 700, borda: '#1f7a44' }); planP.g.rotation.y = -0.45; guarda(planP, 'planilha', PLAN);
    relP = K.painelMappoa(0.9, 0.36, { px: 500, borda: '#2a2e36' }); guarda(relP, 'relogio', REL);
    abasG = new THREE.Group(); guarda(abasG, 'abas', [0, 0, 0]);
    ABA_POS.forEach((p) => { const a = K.painelMappoa(0.66, 0.44, { px: 540, borda: '#c3c8d0' }); a.g.position.set(...p); abasG.add(a.g); abas.push(a); });
    nota = folha(0.42, 0.22, 400, (c, w, h) => {
      rr(c, 0, 0, w, h, 14, '#5fb86a'); c.strokeStyle = '#2f7a3a'; c.lineWidth = 6; c.beginPath(); c.roundRect(8, 8, w - 16, h - 16, 10); c.stroke();
      txt(c, '1 PASTEL', w * 0.62, h * 0.5, h * 0.24, '#ffffff', 900, 'center');
      // o pastel (meia-lua dourada)
      c.fillStyle = '#f2b544'; c.beginPath(); c.ellipse(w * 0.2, h * 0.52, w * 0.12, h * 0.22, 0, PI, 0); c.closePath(); c.fill();
      c.strokeStyle = '#c9822f'; c.lineWidth = 5; c.beginPath(); c.moveTo(w * 0.08, h * 0.52); c.lineTo(w * 0.32, h * 0.52); c.stroke();
    });
    guarda(nota, 'nota');
    moeda = K.malha(new THREE.CylinderGeometry(0.09, 0.09, 0.022, 26), K.mat(0xf5c518, { metalness: 0.7, roughness: 0.3 }));
    guarda(moeda, null);
    navG = K.painelMappoa(2.3, 0.4, { px: 900, borda: '#050d1c' }); guarda(navG, 'navegador', [-0.35, 2.95, -0.95]);
    buscaP = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(buscaP, 'busca', TELA_Q);
    telaQ = K.painelMappoa(1.4, 2.33, { px: 800 }); guarda(telaQ, 'tela', TELA_Q);

    // As olheiras e a poça roxa no chão
    fx.matOlh = K.mat(0x5b3a8c, { roughness: 0.35 });
    olhG = new THREE.Group(); K.scene.add(olhG); K.nomear('olheiras', olhG);
    poca = K.malha(new THREE.CylinderGeometry(0.32, 0.32, 0.02, 28), fx.matOlh); poca.scale.set(1, 1, 1); K.scene.add(poca);

    // Maquete: a lanterna com o facho e os pinos das oficinas
    lant = new THREE.Group();
    const corpoL = K.malha(new THREE.CylinderGeometry(0.06, 0.05, 0.32, 16).rotateX(PI / 2), K.mat(0xe8352b, { roughness: 0.4 })); lant.add(corpoL);
    const vidro = K.malha(new THREE.CylinderGeometry(0.085, 0.07, 0.08, 16).rotateX(PI / 2), K.mat(0xfff3b0, { emissive: 0xffe066, emissiveIntensity: 1 })); vidro.position.z = 0.18; lant.add(vidro);
    const cone = new THREE.ConeGeometry(1, 1, 28, 1, true).translate(0, -0.5, 0).rotateX(-PI / 2);
    fachoM = new THREE.Mesh(cone, new THREE.MeshBasicMaterial({ color: 0xffe680, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
    fachoM.position.z = 0.2; lant.add(fachoM);
    guarda(lant, 'lanterna');
    OF_MQ.forEach((p) => pinos.push(guarda(K.pinoMappoa('#00bc7b', 1.0), 'pinos', p)));

    // Central e palco: a lista grande e a análise
    listaP = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(listaP, 'lista', LISTA_C);
    telaM = K.painelMappoa(1.56, 2.6, { px: 800 }); guarda(telaM, 'tela', [-0.35, 1.65, 0.1]);

    // Efeitos
    fx.cont = K.contador();
    fx.fala = K.balaoFala();
    fx.simb = K.simbolo(); fx.simb2 = K.simbolo(); fx.simb3 = K.simbolo(); fx.simb4 = K.simbolo();
    fx.poof = K.poof(); fx.poof2 = K.poof(46);
    fx.vel = K.velocidade();
    fx.grana = K.chuvaDinheiro();
    const e = (t, c) => K.etiqueta(t, c);
    fx.et = {
      web: e('Web designer', 'azul'), duas: e('2 linhas', 'vermelho'), maps: e('Google Maps', 'azul'), tem: e('Já tem site', 'laranja'),
      tel: e('Cadê o telefone?', 'vermelho'), denovo: e('De novo...', 'laranja'), seis: e('6 horas', 'vermelho'), precisa: e('Precisam?', 'laranja'),
      investir: e('Investir', 'azul'), noventa: e('99 oficinas', 'azul'), quarenta: e('40 sem site', 'verde'), quem: e('Quem precisa de você', 'verde'),
      nota: e('Nota 88', 'verde'), msg: e('Mensagem pronta', 'azul'), semResp: e('Sem resposta', 'laranja'), venda: e('Primeira venda!', 'verde'),
      antes: e('Antes', 'vermelho'), agora: e('Agora', 'verde'), fechou: e('Fechou', 'verde')
    };
    fx.rot = K.rotulo('Mappoa');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Até que horas você trabalha? <em>Comenta a hora</em>');
  }

  // ---------- Ajudas da cena ----------
  const cabecaDe = (b, dy = 0.45) => { b.g.updateMatrixWorld(true); const p = b.cabeca.getWorldPosition(V(0, 0, 0)); return [p.x, p.y + dy, p.z]; };
  function sentado(olhar) { menino.colocar(SEAT, olhar || MONITOR); menino.sentar(1); cadeira.position.set(SEAT[0], 0, SEAT[2]); cadeira.rotation.set(0, menino.g.rotation.y, 0); ve(cadeira); }
  function cadeiraDoLado() { ve(cadeira); cadeira.position.set(-1.6, 0, -0.75); cadeira.rotation.set(0, 0.6, 0); }
  const planilha = (n, pisca) => { ve(planP); planP.mostrar('planilhaFelipe', { n, pisca: !!pisca }); };
  const relogio = (hora, pisca) => { ve(relP); relP.mostrar('relogioDig', { hora, pisca: pisca || 0 }); };
  // Mostra a aba i (cada uma com a sua tela) com o pulo de entrada; pos opcional
  function aba(i, dt, pos) {
    const a = abas[i]; if (dt <= 0) { a.g.visible = false; return; }
    ve(abasG); a.g.visible = true; a.mostrar(ABA_TIPO[i], {});
    if (pos) a.g.position.set(...pos); else a.g.position.set(...ABA_POS[i]);
    a.g.scale.setScalar(pop(dt)); a.g.rotation.set(0, 0, Math.sin(dt * 3 + i) * 0.04);
  }
  // O quarto de noite como no gancho: a torre, a planilha com 2 linhas, o relógio, a tela com o Maps
  function quartoNoite(tc, nTorre = N_CANECAS) {
    ve(comp); comp.tela.desenhar(telaMaps, 'maps');
    torreEm(nTorre, tc);
  }

  // Câmeras fixas do quarto: de lado (pega o perfil e as olheiras) e de trás do monitor (o rosto)
  const camLado = (q) => K.mirar([K.lerp(2.75, 2.5, q), 1.7, K.lerp(-0.55, -0.75, q)], [-0.5, 1.3, -0.7]);
  const camRosto = (q) => (planP.g.visible = false, abasG.children.forEach((c, i) => { if (i !== 1) c.visible = false; }), K.mirar([K.lerp(1.55, 1.45, q), 1.55, K.lerp(-2.95, -2.85, q)], [-0.4, 1.05, -0.55]));

  const P = {
    gancho(B, tc) {
      // NA TELA: o quarto de noite; o Felipe sentado com olheiras até o chão; a torre de canecas até o teto; o relógio 03:00; a planilha com 2 linhas · MOSTRA: personagem, olheiras, canecas, planilha
      // CENÁRIO: home_office de noite, a janela escura (o cenário cuida)
      const tT = quando('três', B, 0.15), tMa = quando('manhã', B, 0.3), tP = quando('planilha', B, 0.55), tD = quando('duas', B, 0.8);
      quartoNoite(tc);
      // ENTRA AGORA: o relógio pisca 03:00 em "três"; a planilha desce em "planilha"; as 2 linhas se acendem em "duas"
      relogio('03:00', tc > tT && tc < tT + 1 ? tc - tT : 0);
      planilha(tc > tD ? 2 : 0, tc > tD);
      if (tc < tP + 0.4) K.entrar(planP.g, 'cai', tc - tP + 0.35, { altura: 2.5 });
      // OBJETOS SE MEXENDO: a caneca do topo cai em "manhã" e quica no chão
      torreEm(N_CANECAS, tc, tc > tMa ? (tc - tMa) / 0.5 : -1);
      // PERSONAGEM: sentado · começo cochilando, acorda num susto · em "duas": olha a planilha e põe a mão na testa
      const c1 = B.inicio + 0.7, c2 = Math.max(c1 + 0.5, tMa + 0.1), c3 = Math.max(c2 + 0.5, tP);
      sentado(tc > c2 && tc < c3 ? ABA_POS[1] : tc > tP ? PLAN : MONITOR);
      if (tc > tD) { menino.reagir('mao_na_testa', tc - tD); menino.humor('triste'); }
      else if (tc > c2) { menino.reagir('surpreso', tc - c2); menino.humor('triste'); }
      else if (tc > B.inicio + 0.55) { menino.reagir('susto', tc - B.inicio - 0.55); menino.humor('triste'); }
      else { menino.reagir('dormindo', tc - B.inicio); menino.humor('triste'); }
      olheiras(1);
      // EFEITOS VISUAIS: "Web designer" em "designer" · "2 linhas" em "duas"
      if (tc < tP) fx.et.web.em({ tela: [540, 470] }, tc - B.inicio - 0.1);
      fx.et.duas.em({ tela: [540, 470] }, tc - tD);
      // SONS: tique-taque · baque da caneca · errado em "duas"
      for (let k = 0; k < 4; k++) K.som('clique', B.inicio + k * 0.5, 0.15);
      K.som('baque', tMa + 0.5, 0.6); K.som('errado', tD, 0.35);
      // CÂMERA: 4 cortes de ~0,7 s: (1) aberto, o quarto inteiro e a torre até o teto · (2) o relógio de perto · (3) o rosto com as olheiras · (4) ele e a planilha
      if (tc < c1) { const q = K.suave(pc(tc, B.inicio, c1)); K.mirar([K.lerp(3.2, 2.9, q), 2.3, K.lerp(0.6, 0.3, q)], [-0.6, 1.9, -1.0]); }
      else if (tc < c2) { const q = K.suave(pc(tc, c1, c2)); K.mirar([-0.5, 2.3, K.lerp(1.0, 0.75, q)], [-0.5, 2.3, -1.55]); }
      else if (tc < c3) camRosto(K.suave(pc(tc, c2, c3)));
      else { const q = K.suave(pc(tc, c3, B.ate)); K.mirar([K.lerp(1.5, 1.3, q), 1.85, K.lerp(2.1, 1.8, q)], [-0.45, 1.35, -0.85]); }
    },
    caca(B, tc) {
      // NA TELA: a cidade em maquete; o Felipe gigante com a lanterna; o facho para numa oficina por vez e acende um pino · MOSTRA: personagem, lanterna
      // CENÁRIO: cidade_maquete com o céu de noite, os carrinhos passando
      K.ceu('noite');
      const tMa = quando('Maps', B, 0.55), tO1 = quando('oficina', B, 0.72), tPor = quando('por', B, 0.85);
      const tempos = [tMa, tO1, tPor, B.ate - 0.25];
      // OBJETOS SE MEXENDO: o facho vai de oficina em oficina; cada pino acende na sua palavra
      let i = 0; while (i < 3 && tc > tempos[i + 1] - 0.15) i++;
      const de = i > 0 ? OF_MQ[i - 1] : [6, 0.5, -4], ate = OF_MQ[i], q = K.suave(K.clamp((tc - (i ? tempos[i] - 0.15 : B.inicio)) / 0.35));
      const alvo = [K.lerp(de[0], ate[0], q), K.lerp(de[1], ate[1], q) - 0.8, K.lerp(de[2], ate[2], q)];
      pinos.forEach((p, j) => { if (tc > tempos[j]) { ve(p); p.em(tc, pop(tc - tempos[j])); } });
      // PERSONAGEM: gigante (escala 2,4) · começo: aponta a lanterna, curvado · em "oficina": agacha e espia
      menino.g.scale.setScalar(2.4);
      menino.colocar(FEL_MQ, alvo);
      if (tc > tO1) menino.reagir('pensando', tc - tO1); else menino.apontar(0.8);
      menino.humor('triste');
      lanternaEm(alvo, 1);
      // EFEITOS VISUAIS: "Google Maps" em "Maps"
      fx.et.maps.em({ tela: [540, 380] }, tc - tMa);
      // SONS: whoosh · estalo a cada pino
      K.som('whoosh', B.inicio + 0.1, 0.4); tempos.forEach((t) => K.som('estalo', t, 0.4));
      // CÂMERA: (1) até "oficina": chegando · médio · frente · alto, ele gigante e a cidade · (2) passando · perto · direita, o facho e um pino
      if (tc < tO1) { const q = K.suave(pc(tc, B.inicio, tO1)); K.mirar([K.lerp(1.5, 0.8, q), K.lerp(6.5, 6.0, q), K.lerp(13, 11.5, q)], [0.3, 2.6, -1.0]); }
      else { const q = K.suave(pc(tc, tO1, B.ate)); K.mirar([K.lerp(5.8, 5.0, q), 5.6, K.lerp(8.0, 7.2, q)], [0.4, 2.7, 0.0]); }
    },
    abas(B, tc) {
      // NA TELA: o quarto de noite; ele sentado; as abas pipocando: o site com "já tem site" e outra sem o telefone · MOSTRA: personagem, abas, monitor
      const tS = quando('site', B, 0.15), tTe = quando('tem', B, 0.35), tO = quando('outra', B, 0.6), tTel = quando('telefone', B, 0.9);
      quartoNoite(tc); planilha(2);
      // ENTRA AGORA: a 1ª aba em "site"; a 2ª em "outra"
      aba(0, tc - tS); aba(1, tc - tO);
      if (tc > tTe + 0.35 && tc < tO) { abas[0].g.scale.setScalar(Math.max(0.0001, 1 - (tc - tTe - 0.35) / 0.2)); }
      if (tc > tO) abas[0].g.visible = false;
      fx.poof.em(ABA_POS[0], tc - tTe - 0.35, { escala: 0.5 });
      // PERSONAGEM: digitando · em "tem": bufa e fecha a aba com um tapa · em "telefone": coça a cabeça
      sentado(tc > tO ? ABA_POS[1] : ABA_POS[0]);
      if (tc > tTel) menino.reagir('coca_cabeca', tc - tTel); else if (tc > tTe) menino.reagir('bate_mesa', tc - tTe); else menino.reagir('digitando', tc);
      menino.humor('triste'); olheiras(0.55);
      // EFEITOS VISUAIS: "Já tem site" em "tem" · "Cadê o telefone?" em "telefone"
      if (tc < tO) fx.et.tem.em(mais(ABA_POS[0], [0, 0.45, 0.1]), tc - tTe); else fx.et.tel.em(mais(ABA_POS[1], [0, 0.45, 0.1]), tc - tTel);
      // SONS: clique · poof · pingo
      K.som('clique', tS, 0.5); K.som('clique', tO, 0.5); K.som('pingo', tTel, 0.5);
      // CÂMERA: (1) até "outra": chegando · perto · por cima do ombro, o monitor e a 1ª aba · (2) passando · médio · frente, ele e a 2ª aba
      if (tc < tO) { const q = K.suave(pc(tc, B.inicio, tO)); K.mirar([K.lerp(-1.6, -1.45, q), 1.85, K.lerp(2.0, 1.7, q)], [-0.7, 1.6, -1.0]); }
      else camRosto(K.suave(pc(tc, tO, B.ate)));
    },
    fuca(B, tc) {
      // NA TELA: as abas do Instagram e do WhatsApp empilham em volta dele; uma linha voa pra planilha; em "novo" tudo gira e volta · MOSTRA: personagem, abas, planilha
      const tI = quando('Instagram', B, 0.1), tW = quando('WhatsApp', B, 0.3), tCo = quando('copia', B, 0.45), tC = quando('começa', B, 0.75), tN = quando('novo', B, 0.92);
      quartoNoite(tc);
      // ENTRA AGORA: o Instagram em "Instagram", o WhatsApp em "WhatsApp", o Maps e os sites depois
      const ts = [tI, tW, tCo - 0.2, tCo, tC - 0.25];
      const idx = [2, 3, 4, 5, 0];
      // OBJETOS SE MEXENDO: as abas giram em volta dele como redemoinho a partir de "começa"
      const centro = [-0.5, 2.0, -0.85], gira = tc > tC ? (tc - tC) * 5 : 0;
      idx.forEach((ai, j) => {
        let pos = null;
        if (tc > tC) { const a = j * (PI * 2 / 5) + gira; pos = [centro[0] + Math.cos(a) * 1.25, centro[1] + Math.sin(a * 0.5 + j) * 0.5, centro[2] + Math.sin(a) * 0.55]; }
        aba(ai, tc - ts[j], pos);
      });
      // a linha copiada voa da aba pra planilha em "copia"
      const voando = tc > tCo && tc < tCo + 0.6;
      planilha(2, voando || (tc > tCo + 0.6 && tc < tC));
      if (voando) { const q = K.suave((tc - tCo) / 0.6); fx.simb.em([K.lerp(ABA_POS[3][0], PLAN[0], q), K.lerp(ABA_POS[3][1], PLAN[1], q) + Math.sin(q * PI) * 0.4, K.lerp(ABA_POS[3][2], PLAN[2] + 0.1, q)], 0.3, { tipo: '➜', tam: 0.6, som: false }); }
      // PERSONAGEM: digitando rápido · em "copia": arrasta a linha pra planilha · em "novo": deita a cabeça na mesa
      sentado(tc > tCo && tc < tC ? PLAN : MONITOR);
      if (tc > tN) menino.reagir('dormindo', tc - tN); else if (tc > tCo && tc < tC) menino.apontar(0.6); else menino.reagir('digitando', tc * 1.6);
      menino.humor('triste'); olheiras(0.7);
      // EFEITOS VISUAIS: "De novo..." em "novo"
      fx.et.denovo.em(mais(centro, [0, 1.0, 0.3]), tc - tN);
      // SONS: teclado rápido · whoosh do redemoinho · baque da cabeça
      for (let k = 0; k < 8; k++) K.som('clique', B.inicio + k * 0.11, 0.18);
      K.som('estalo', tI, 0.3); K.som('estalo', tW, 0.3); K.som('whoosh', tC, 0.6); K.som('baque', tN + 0.1, 0.4);
      // CÂMERA: (1) até "começa": girando · médio · esquerda · olho, as abas e ele · (2) subindo · médio · frente · baixo, ele e o redemoinho
      if (tc < tC) K.filmar([menino, cabecaDe(menino, 0.2), ABA_POS[2], ABA_POS[3], PLAN], 'girando', pc(tc, B.inicio, tC), { plano: 'medio', lado: -15, angulo: 22, altura: 'olho', tam: 2.0 });
      else camLado(K.suave(pc(tc, tC, B.ate)));
    },
    duas(B, tc) {
      // NA TELA: o relógio correndo 21:00 → 03:00; a torre de canecas crescendo; as olheiras fazendo poça; a planilha com 2 linhas e o "?" · MOSTRA: personagem, relogio, planilha, canecas
      const tSe = quando('Seis', B, 0.02), tDe = quando('depois', B, 0.2), tDu = quando('duas', B, 0.35), tSa = quando('sabe', B, 0.62), tSi = quando('site', B, 0.92);
      ve(comp); comp.tela.desenhar(telaMaps, 'maps');
      // OBJETOS SE MEXENDO: os números do relógio correndo de "Seis" a "depois"; as canecas empilhando uma a uma
      const g = pc(tc, tSe, tDe + 0.3), hr = (21 + Math.floor(g * 6)) % 24, mi = Math.floor((g * 360) % 60);
      if (tc < tDu) relogio(String(hr).padStart(2, '0') + ':' + String(mi).padStart(2, '0'));
      const nT = Math.round(K.lerp(8, N_CANECAS, g)); torreEm(nT, tc);
      planilha(2, tc > tDu && tc < tSa);
      // PERSONAGEM: começo olha o relógio, desesperado · em "site": encolhe os ombros
      menino.colocar(mais(EM_PE, [-0.2, 0, 0.35]), tc < tDu ? [1.6, 1.6, 4] : tc < tSi ? PLAN : [1.2, 1.4, 5]); cadeiraDoLado();
      if (tc > tSi) menino.reagir('ombros', tc - tSi); else if (tc > tDu) menino.apontar(0.5); else menino.reagir('olha_relogio', tc - B.inicio);
      menino.humor('triste'); olheiras(1);
      // EFEITOS VISUAIS: "6 horas" em "Seis" · o "?" gigante em "sabe" · "Precisam?" em "site"
      fx.et.seis.em(mais(REL, [0, 0.55, 0.2]), tc - tSe);
      fx.simb.em(mais(PLAN, [0, 0.2, 0.3]), tc - tSa, { tipo: '?', tam: 1.4 });
      fx.et.precisa.em(mais(PLAN, [0, 1.3, 0.2]), tc - tSi);
      // SONS: tique-taque rápido · tlin de caneca · errado em "site"
      for (let k = 0; k < 8; k++) K.som('clique', tSe + k * 0.12, 0.2);
      for (let k = 0; k < 6; k++) K.som('pingo', tSe + 0.1 + k * 0.15, 0.15);
      K.som('errado', tSi, 0.45);
      // CÂMERA: (1) até "duas": afastando · médio · direita, o relógio e a torre · (2) chegando · perto · frente, ele e o "?"
      if (tc < tDu) { const q = K.suave(pc(tc, B.inicio, tDu)); K.mirar([K.lerp(0.2, 0.5, q), 2.1, K.lerp(2.3, 2.8, q)], [-0.4, 1.9, -1.2]); }
      else { const q = K.suave(pc(tc, tDu, B.ate)); K.mirar([K.lerp(-0.1, 0.0, q), 1.75, K.lerp(2.8, 2.4, q)], [0.45, 1.5, -0.6]); }
    },
    investe(B, tc) {
      // NA TELA: ele de pé bate na mesa; a torre desaba atrás; a nota "1 PASTEL" vira moeda e cai no teclado; o mapa com pinos no monitor · MOSTRA: personagem, nota, monitor
      const tDe = quando('decidiu', B, 0.12), tIn = quando('investir', B, 0.25), tPa = quando('pastel', B, 0.5), tFe = quando('ferramenta', B, 0.65), tCl = quando('cliente', B, 0.9);
      ve(comp); relogio('03:00'); planilha(2); cadeiraDoLado();
      // OBJETOS SE MEXENDO: a torre desaba a partir de "decidiu"; a moeda em arco até o teclado
      if (tc < tDe) torreEm(N_CANECAS, tc); else torreDesaba(pc(tc, tDe, tDe + 0.9));
      menino.colocar(EM_PE, tc < tFe + 0.2 ? [0.8, 1.4, 5] : MONITOR);
      // PERSONAGEM: começo bate na mesa e levanta · em "pastel": faz que sim, decidido
      if (tc < tIn) menino.reagir('bate_mesa', tc - B.inicio); else if (tc < tPa) menino.reagir('segurando', tc - tIn); else if (tc < tFe) menino.reagir('sim', tc - tPa); else menino.reagir('digitando', tc);
      menino.humor(tc > tPa ? 'feliz' : 'normal'); olheiras(tc < tDe ? 0.8 : 0.4);
      // ENTRA AGORA: a nota na mão em "investir"; o poof e a moeda em "ferramenta"; os pinos em "cliente"
      const mao = menino.mao(1), notaPos = mais(mao, [0.03, 0.08, 0.1]);
      if (tc > tIn - 0.3 && tc < tFe) { ve(nota); nota.position.set(...notaPos); nota.lookAt(K.camera.position); nota.rotation.z += Math.sin(tc * 3) * 0.1; nota.scale.setScalar(pop(tc - tIn + 0.3)); }
      if (tc > tFe) {
        fx.poof.em(mais(notaPos, [0, 0.15, 0]), tc - tFe, { escala: 0.35 });
        const q = K.clamp((tc - tFe) / 0.45);
        moeda.visible = tc < tFe + 1.2;
        moeda.position.set(K.lerp(notaPos[0], TECLADO[0], q), K.lerp(notaPos[1] + 0.2, TECLADO[1], q) + Math.sin(q * PI) * 0.4, K.lerp(notaPos[2], TECLADO[2], q));
        moeda.rotation.set(tc * 8, 0, 0.3);
        K.som('pingo', tFe + 0.45, 0.6);
      }
      const n = tc > tCl ? Math.min(6, 1 + Math.floor((tc - tCl) / 0.1)) : 1;
      comp.tela.desenhar((c, w, h) => (tc > tFe ? mapa(c, w, h, { n }) : telaMaps(c, w, h)), 'm' + (tc > tFe) + n);
      // EFEITOS VISUAIS: "Investir" em "investir"
      fx.et.investir.em({ tela: [540, 470] }, tc - tIn);
      // SONS: baque · canecas tilintando · pingo · estalos
      K.som('baque', B.inicio + 0.15, 0.5); for (let k = 0; k < 5; k++) K.som('pingo', tDe + 0.2 + k * 0.12, 0.2);
      for (let k = 0; k < 6; k++) K.som('estalo', tCl + k * 0.1, 0.2);
      // CÂMERA: (1) chegando · médio · esquerda, ele com a nota e as canecas caindo · (2) subindo · médio · frente, o monitor
      if (tc < tFe + 0.15) K.filmar([menino, cabecaDe(menino, 0.45), notaPos, mais(TORRE, [0, 1.5, 0])], 'chegando', pc(tc, B.inicio, tFe + 0.15), { plano: 'medio', lado: 12, altura: 'olho', espacoCima: 0.25, obstaculos: false, tam: 1.9 });
      else K.filmar([MONITOR, mais(MONITOR, [0, 0.45, 0]), menino], 'subindo', pc(tc, tFe + 0.15, B.ate), { plano: 'medio', lado: 'frente', altura: 'olho', obstaculos: false, tam: 1.9 });
    },
    busca(B, tc) {
      // NA TELA: a barra com mappoa.com acima do monitor; a tela "Sua próxima busca" sobe com "Oficinas mecânicas" e "Londrina" · MOSTRA: navegador, busca, personagem
      const tPc = quando('computador', B, 0.05), tDi = quando('digita', B, 0.15), tEs = quando('escreve', B, 0.5), tOf = quando('oficinas', B, 0.65), tLo = quando('Londrina', B, 0.9);
      ve(comp, navG); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); relogio('03:00'); planilha(2);
      torreDesaba(1);
      // ENTRA AGORA: a barra em "computador", as letras em "digita"; a busca sobe em "escreve"; o nicho e a cidade digitados
      K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.3 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tEs - 0.1 });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.25);
      if (tc > tEs) {
        ve(buscaP); const q = K.suave(K.clamp((tc - tEs) / 0.4));
        buscaP.g.position.set(TELA_Q[0], K.lerp(1.0, TELA_Q[1], q), K.lerp(-1.3, TELA_Q[2], q)); buscaP.g.scale.setScalar(K.lerp(0.4, 1, q));
        const dig = tc > tLo + 0.35 ? 1 : 0.98 * K.clamp((tc - tOf) / Math.max(0.3, tLo + 0.3 - tOf));
        buscaP.mostrar('buscaOf', { digitado: Math.round(dig * 20) / 20, apertado: tc > B.ate - 0.3 });
        K.som('brilho', tEs, 0.5); K.som('clique', B.ate - 0.3, 0.6);
      }
      // PERSONAGEM: sentado digitando · no fim aperta o botão
      sentado(tc > tEs ? TELA_Q : MONITOR);
      if (tc > B.ate - 0.4) menino.apontar(0.6); else menino.reagir('digitando', tc);
      menino.humor('feliz'); olheiras(0.3);
      // CÂMERA: (1) até "escreve": chegando · perto · por cima do ombro, a barra · (2) parado · médio · frente, a busca inteira
      if (tc < tEs) K.filmar([navG, MONITOR, cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tEs), { plano: 'perto', lado: -38, altura: 'olho', tam: 1.7 });
      else K.filmar([buscaP, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0]), cabecaDe(menino, 0)], 'parado', pc(tc, tEs, B.ate), { plano: 'medio', lado: 8, altura: 'olho', tam: 1.4, obstaculos: false });
    },
    lista(B, tc) {
      // NA TELA: a central do Mappoa; a lista grande enchendo; 0 → 99; o grupo SEM SITE com 40; os chips de contato; o Felipe e o robô · MOSTRA: lista, robo, personagem
      // CENÁRIO: central_mappoa, os robôs nas mesas (o cenário cuida)
      const tL = quando('lista', B, 0.1), tN = quando('noventa', B, 0.25), tQ = quando('quarenta', B, 0.55), tC = quando('contatos', B, 0.88);
      ve(listaP, robo); K.entrar(listaP.g, 'cai', tc - tL, { altura: 3 });
      // OBJETOS SE MEXENDO: o contador de leads sobe até 99 em "noventa e nove"; os cartões descendo; os chips em "contatos"
      const total = tc < tN ? 0 : Math.round(K.lerp(5, 99, pc(tc, tN, tQ - 0.1)));
      const n = tc < tN ? 0 : Math.min(4, 1 + Math.floor((tc - tN) / 0.25));
      listaP.mostrar('listaOf', { total, n, sem: tc > tQ, chips: tc > tC });
      robo.g.position.set(-1.55, 0, 1.3); robo.g.rotation.y = 0.5; robo.em(tc, { acena: tc > tQ ? 1 : 0, mapa: false });
      // PERSONAGEM: começo olha pra cima de boca aberta · em "contatos": comemora
      menino.colocar([1.2, 0, 1.6], [-0.2, 1.8, 0.8]);
      if (tc > tC) menino.reagir('comemorando', tc - tC); else if (tc > tQ) menino.apontar(0.6); else menino.reagir('surpreso', tc - B.inicio);
      menino.humor('feliz');
      // EFEITOS VISUAIS: "99 oficinas" em "noventa" · "40 sem site" em "quarenta"
      if (tc < tQ) fx.et.noventa.em(mais(LISTA_C, [0, 1.6, 0.2]), tc - tN); else fx.et.quarenta.em(mais(LISTA_C, [0, 1.6, 0.2]), tc - tQ);
      // SONS: brilho · bips · ding em "quarenta"
      K.som('brilho', tL, 0.5); for (let k = 0; k < 6; k++) K.som('bip', tN + k * 0.15, 0.2); K.som('ding', tQ, 0.5); K.som('certo', tC, 0.4);
      // CÂMERA: (1) até "quarenta": revelando · aberto · frente · baixo · (2) chegando · médio · esquerda, os chips
      if (tc < tQ) K.filmar([listaP, robo, menino], 'chegando', pc(tc, B.inicio, tQ), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([listaP, menino, robo], 'chegando', pc(tc, tQ, B.ate), { plano: 'medio', lado: 'esquerda', altura: 'olho' });
    },
    mappoa(B, tc) {
      // NA TELA: o palco da marca, o logo gigante; o Felipe e o robô dos lados; a análise cai com o score enchendo até 88 · MOSTRA: tela, robo, personagem
      const tM = quando('Mappoa', B, 0.1), tS = quando('sistema', B, 0.3), tA = quando('acha', B, 0.45), tPr = quando('precisa', B, 0.65), tSv = quando('serviço', B, 0.9);
      ve(telaM, robo); K.entrar(telaM.g, 'cai', tc - tS, { altura: 3 });
      // OBJETOS SE MEXENDO: o score enche de "precisa" a "serviço"
      const sc = Math.round(K.clamp((tc - tPr) / Math.max(0.4, tSv - tPr + 0.2)) * 20) / 20;
      telaM.mostrar('analiseOf', { ate: tc > tSv ? 2 : tc > tPr ? 0 : -1, score: sc });
      K.som('ding', tPr, 0.4); K.som('certo', tSv, 0.5);
      robo.g.position.set(-2.2, 0, 0.75); robo.g.rotation.y = 0.55; robo.em(tc, { acena: tc < tPr ? 1 : 0, mapa: false });
      // PERSONAGEM: começo aponta o logo · em "serviço": comemora com o punho
      menino.colocar([1.45, 0, 1.0], tc > tSv ? [0.6, 1.4, 5] : [-0.35, 1.6, 0.1]);
      if (tc > tSv) menino.reagir('vitoria', tc - tSv); else menino.reagir('chamando', tc - B.inicio);
      menino.humor('feliz');
      fx.rot.em({ tela: [540, 330] }, tc - tM);
      fx.et.quem.em([-0.35, 3.2, 0.3], tc - tPr);
      K.som('brilho', tM, 0.6);
      // CÂMERA: (1) até "acha": chegando · médio · frente · baixo · (2) passando · médio · esquerda · olho
      if (tc < tA) K.filmar([telaM, robo, menino], 'chegando', pc(tc, B.inicio, tA), { plano: 'medio', lado: 'frente', altura: 'baixo', tam: 2.0 });
      else K.filmar([telaM, robo, menino], 'passando', pc(tc, tA, B.ate), { plano: 'medio', lado: -14, altura: 'olho', tam: 2.0 });
    },
    analise(B, tc) {
      // NA TELA: o quarto de dia; acima do monitor, a análise da Auto Center Tarumã com a nota 88/100; depois a mensagem pronta · MOSTRA: tela, personagem, monitor
      // CENÁRIO: o quarto de dia (a janela clara)
      const tAb = quando('abre', B, 0.08), tNo = quando('nota', B, 0.4), tMe = quando('mensagem', B, 0.8), tPr = quando('pronta', B, 0.92);
      ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); torreDesaba(1);
      ve(telaQ); K.entrar(telaQ.g, 'sobe', tc - tAb, { dur: 0.4 });
      // OBJETOS SE MEXENDO: o score girando até 88 a partir de "nota"; a mensagem se escrevendo a partir de "mensagem"
      if (tc < tMe) telaQ.mostrar('analiseOf', { ate: tc > tNo + 0.4 ? 1 : 0, score: Math.round(K.clamp((tc - tNo) / 0.6) * 20) / 20 });
      else telaQ.mostrar('mensagemOf', { digitado: Math.round(K.clamp((tc - tMe) / 0.9) * 20) / 20 });
      // PERSONAGEM: começo clica · em "pronta": vira pra câmera e aponta a tela
      if (tc < tPr) { sentado(TELA_Q); menino.reagir(tc < tNo ? 'digitando' : 'surpreso', tc - tAb); }
      else { cadeiraDoLado(); menino.colocar(mais(EM_PE, [0.2, 0, 0.2]), TELA_Q); menino.apontar(0.6); }
      menino.humor('feliz'); olheiras(0.15);
      // EFEITOS VISUAIS: "Nota 88" em "nota" · "Mensagem pronta" em "pronta"
      if (tc < tMe) fx.et.nota.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tNo); else fx.et.msg.em(mais(TELA_Q, [0.55, 1.35, 0.2]), tc - tPr);
      // SONS: clique · ding do score · teclinhas da mensagem
      K.som('clique', tAb, 0.5); K.som('ding', tNo + 0.6, 0.5); for (let k = 0; k < 6; k++) K.som('clique', tMe + k * 0.12, 0.15);
      // CÂMERA: (1) até "mensagem": chegando · médio · direita · baixo, a tela e ele · (2) parado · perto · frente, a mensagem inteira
      if (tc < tMe) K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), cabecaDe(menino, 0)], 'chegando', pc(tc, B.inicio, tMe), { plano: 'medio', lado: 18, altura: 'olho', tam: 1.6, obstaculos: false });
      else K.filmar([telaQ, mais(TELA_Q, [0, -1.15, 0]), mais(TELA_Q, [0, 1.2, 0])], 'parado', pc(tc, tMe, B.ate), { plano: 'perto', lado: 'frente', altura: 'olho', tam: 1.3, obstaculos: false });
    },
    venda(B, tc) {
      // NA TELA: (1) ele de pé no quarto com o celular, "Enviadas 1 → 20" e os ✗ "sem resposta"; (2) a oficina: o dono aperta a mão dele, o ✓ e o dinheiro · MOSTRA: personagem, dono
      const tV = quando('vinte', B, 0.12), tMa = quando('maioria', B, 0.25), tR = quando('respondeu', B, 0.42), tMas = quando('Mas', B, 0.55), tT = quando('topou', B, 0.7), tPv = quando('venda', B, 0.92);
      if (tc < tMas) {
        ve(comp); comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado(); torreDesaba(1);
        // OBJETOS SE MEXENDO: o contador de mensagens até 20; os ✗ pipocando em volta dele
        fx.cont.em(mais(EM_PE, [0.2, 2.75, 0.3]), tc - B.inicio, { de: 1, ate: 20, dur: Math.max(0.4, tV - B.inicio + 0.2), antes: 'Enviadas ', depois: '', cor: '#1067f8' });
        const ps = [[-0.75, 1.5, 0.3], [0.75, 1.8, 0.2], [-0.55, 1.1, 0.4], [0.65, 1.2, 0.4]];
        [fx.simb, fx.simb2, fx.simb3, fx.simb4].forEach((s, i) => { const dt = tc - (tMa + i * 0.12); if (dt > 0) s.em(mais(EM_PE, ps[i]), dt % 0.5, { tipo: '✗', tam: 0.55, som: false }); });
        // PERSONAGEM: começo manda mensagem no celular · em "respondeu": ombros caídos
        menino.colocar(mais(EM_PE, [0, 0, 0.35]), [0.9, 1.4, 5]);
        if (tc > tR) { menino.reagir('ombros', tc - tR); menino.humor('triste'); } else { menino.reagir('celular', tc); menino.humor('normal'); }
        fx.et.semResp.em(cabecaDe(menino, 0.6), tc - tR);
        K.som('whoosh', B.inicio + 0.1, 0.4); for (let k = 0; k < 4; k++) K.som('errado', tMa + k * 0.15, 0.12);
        // CÂMERA: (1) passando · médio · direita · olho, ele e os ✗
        K.filmar([menino, cabecaDe(menino, 0.5), mais(EM_PE, [0.2, 2.75, 0.3]), mais(EM_PE, [-0.75, 1.3, 0.3]), mais(EM_PE, [0.75, 1.3, 0.3])], 'passando', pc(tc, B.inicio, tMas), { plano: 'medio', lado: 22, altura: 'olho', espacoCima: 0.15, obstaculos: false, tam: 2.0 });
      } else {
        // CENÁRIO: a oficina, o carro azul no elevador atrás (o cenário cuida)
        menino.colocar(FEL_O, cabecaDe(dono, -0.5)); dono.colocar(DONO, [FEL_O[0], 1.2, FEL_O[2]]);
        // PERSONAGEM: o Felipe · em "venda": pulinhos; o dono · em "topou": faz que sim e estende a mão
        if (tc > tPv) menino.reagir('comemorando', tc - tPv); else menino.reagir('mostrando', tc - tMas);
        if (tc > tT) dono.reagir('mostrando', tc - tT); else dono.reagir('sim', tc - tMas);
        menino.humor('feliz'); dono.humor('feliz');
        // EFEITOS VISUAIS: o ✓ em "topou" · "Primeira venda!" e o dinheiro em "venda"
        fx.simb.em(mais(DONO, [0.7, 2.4, 0.1]), tc - tT, { tipo: '✓', tam: 1.2 });
        fx.et.venda.em(mais(FEL_O, [0.2, 2.6, 0.2]), tc - tPv);
        K.som('ding', tT, 0.5); K.som('certo', tT + 0.15, 0.6); K.som('festa', tPv, 0.5);
        // CÂMERA: (2) chegando · médio · frente, o aperto de mão com o carro atrás
        const q = K.suave(pc(tc, tMas, B.ate)); K.mirar([K.lerp(1.6, 1.1, q), 1.7, K.lerp(6.4, 5.6, q)], [-0.4, 1.35, 0.3]);
        fx.grana.em(mais(FEL_O, [-0.3, 0, 0]), tc - tPv, { raio: 1.3, altura: 3, dur: 1.4 });
      }
    },
    antes_agora(B, tc) {
      // NA TELA: (1) Antes: o quarto de noite, as olheiras, a torre e a planilha com 2 linhas; (2) Agora: de dia, ele chegando na oficina, "Fechou" · MOSTRA: personagem
      const tA = quando('Agora', B, 0.48), tB = quando('busca', B, 0.7), tAt = quando('atrás', B, 0.92);
      if (tc < tA) {
        quartoNoite(tc); relogio('03:00'); planilha(2);
        sentado(PLAN); menino.reagir('dormindo', tc - B.inicio); menino.humor('triste'); olheiras(1);
        fx.et.antes.em(mais(PLAN, [0, 1.3, 0.2]), tc - B.inicio - 0.1);
        K.som('clique', B.inicio + 0.2, 0.2); K.som('clique', B.inicio + 0.7, 0.2); K.som('errado', B.inicio + 0.4, 0.3);
        // CÂMERA: (1) afastando · médio · esquerda, o quarto
        camLado(K.suave(pc(tc, B.inicio, tA)));
      } else {
        // o Agora: ele entra rápido na oficina e o dono acena
        const de = [3.0, 0, 4.2], ate = mais(FEL_O, [0.4, 0, 0.3]);
        menino.irPara(de, ate, K.clamp((tc - tA + 0.1) / Math.max(0.6, tAt - tA)), tc, { reto: true });
        if (tc > tAt) { menino.colocar(ate, cabecaDe(dono, -0.5)); menino.reagir('vitoria', tc - tAt); }
        menino.humor('feliz');
        dono.colocar(DONO, menino.g.position.toArray()); dono.acenar(tc); dono.humor('feliz');
        fx.vel.em(mais(menino.g.position.toArray(), [0, 0.6, 0]), tc, { rumo: menino.g.rotation.y });
        fx.et.agora.em({ tela: [540, 380] }, tc - tA);
        fx.simb.em(cabecaDe(menino, 0.4), tc - tAt, { tipo: '✓', tam: 1.1 });
        fx.et.fechou.em(cabecaDe(menino, 0.9), tc - tAt);
        K.som('whoosh', tA, 0.5); K.som('passo', tA + 0.2, 0.3); K.som('passo', tA + 0.45, 0.3); K.som('certo', tAt, 0.6);
        void tB;
        // CÂMERA: (2) chegando · médio · frente · baixo, ele entrando com o dono e o carro atrás
        { const q = K.suave(pc(tc, tA, B.ate)); K.mirar([K.lerp(2.2, 1.6, q), 1.3, K.lerp(5.4, 4.6, q)], [-0.1, 1.35, 0.8]); }
      }
    },
    segue(B, tc) {
      // NA TELA: ele de pé no quarto de dia; a pergunta no topo e o relógio 03:00; a barra com mappoa.com; o robô acenando; o cartão de seguir · MOSTRA: personagem, navegador, monitor
      const tQ = quando('você', B, 0.02), tH = quando('hora', B, 0.3), tPc = quando('computador', B, 0.45), tDi = quando('digita', B, 0.55), tSi = quando('sem', B, 0.85);
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      ve(comp, navG); K.entrar(navG.g, 'cresce', tc - tPc, { dur: 0.4 });
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      if (tc < tPc) relogio('03:00', tc > tH ? tc - tH : 0);
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      navG.mostrar('endereco', { letras, ir: tc > tSi });
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('estalo', tH, 0.4); K.som('ding', tSi, 0.6); K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      ve(robo); robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      // PERSONAGEM: começo aponta pra câmera · em "hora": olha o relógio do pulso · em "digita": digitando
      menino.colocar(EM_PE, tc > tDi ? MONITOR : [0.8, 1.4, 5]);
      if (tc > tDi) menino.reagir('digitando', tc); else if (tc > tH) menino.reagir('olha_relogio', tc - tH); else menino.apontar(1);
      menino.humor('feliz');
      // CÂMERA: (1) até "computador": chegando · médio · frente · olho · (2) parado · aberto · frente · olho, topo livre pro cartão
      if (tc < tPc - 0.3) K.filmar([menino, cabecaDe(menino, 0.4), MONITOR], 'chegando', pc(tc, B.inicio, tPc - 0.3), { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35, obstaculos: false });
      else K.filmar([navG, comp, menino], 'parado', pc(tc, tPc - 0.3, B.ate), { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    cartao(B, tc) {
      fx.seguir.em(9); ve(comp, navG, robo); navG.mostrar('endereco', { letras: 10, ir: true });
      comp.tela.desenhar((c, w, h) => mapa(c, w, h, { n: 6 }), 'm6'); cadeiraDoLado();
      robo.g.position.set(-1.9, 0, 0.3); robo.g.rotation.y = 0.45; robo.em(tc, { acena: 1, mapa: false });
      menino.colocar(EM_PE, [0.8, 1.4, 5]); menino.acenar(tc); menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4, obstaculos: false });
    },
    capa() {
      quartoNoite(0); relogio('03:00'); planilha(2);
      sentado([1.0, 1.5, 4]); menino.reagir('mao_na_testa', 0.5); menino.humor('triste'); olheiras(1);
      K.mirar([3.1, 2.3, 0.5], [-0.6, 1.85, -1.0]);
    }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    CS.usar(plano === 'capa' ? 'noite' : lugarDe(B, tc));
    if (K.camera.fov !== FOV0) { K.camera.fov = FOV0; K.camera.updateProjectionMatrix(); }
    [menino, dono].forEach((b) => { b.g.visible = false; });
    tudo.forEach((g) => { g.visible = false; });
    abas.forEach((a) => { a.g.visible = false; a.g.scale.setScalar(1); });
    olhG.visible = false; poca.visible = false; fachoM.visible = false;
    menino.g.position.y = 0; menino.g.scale.setScalar(1);
    buscaP.g.scale.setScalar(1); buscaP.g.position.set(...TELA_Q); buscaP.g.rotation.set(0, 0, 0);
    telaQ.g.scale.setScalar(1); telaQ.g.position.set(...TELA_Q); telaQ.g.rotation.set(0, 0, 0);
    telaM.g.scale.setScalar(1); telaM.g.position.set(-0.35, 1.65, 0.1); telaM.g.rotation.set(0, 0, 0);
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
