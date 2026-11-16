// Objetos novos do canal, no catálogo do K.m3d (const c = K.m3d('cofre'); c.position.set(x, 0, z)). Base no chão (y = 0),
// frente pra +z, no tamanho certo perto do personagem (op.tam aumenta: os "gigantes" pro gancho). Os que se mexem têm
// os comandos em c.userData.m3d (chamar no plano, em todo quadro: todo quadro começa no neutro):
//   cofre (abrir(k), girar(t)) · pilha_dinheiro (crescer(k)) · saco_dinheiro · celular_gigante (mostrar({ itens, n }),
//   vibrar(t)) · botao_vermelho (apertar(k)) · rede_pesca · foguete_desenho (bocal) · balanca (pender(-1 a 1)) ·
//   corrente_cadeado (abrir(k)) · despertador (tocar(t), horas(h)) · calculadora (op.texto) · planilha_gigante
//   (preencher(k)) · caixa_entrega (abrir(k)) · moto_entrega (rodar(t, vel), selim) · carrinho_compras · coroa ·
//   seta_crescimento (crescer(k)) · escada_sucesso (crescer(k)) · papel_amassado · presente (abrir(k)) · sirene (em(t))
(function () {
  const K = window.K;
  if (!K.m3d || !K.m3d.novo) return;
  const { cx, ci, bo, to, gr, letra } = K.m3d.h;
  const R = K.m3d.novo;
  const PI = Math.PI;
  const OURO = 0xf5c518, VERDE = 0x3fae5a, VERM = 0xe8352b, ESC = 0x2a2e36, BR = 0xf6f7f9;
  const matOuro = () => K.mat(OURO, { metalness: 0.6, roughness: 0.3, emissive: 0x6a4a00, emissiveIntensity: 0.25 });
  const tam = (g, o) => { if (o.tam) g.scale.setScalar(o.tam); };
  const zera = (fn) => K.vivo(fn);   // todo quadro volta ao neutro antes do plano
  const geoHaste = new THREE.CylinderGeometry(1, 1, 1, 10).translate(0, 0.5, 0);

  // ---------- Dinheiro ----------
  R('cofre', 'Cofre com porta que abre', 'dinheiro', (g, o) => {
    const c = o.cor || 0x5a6270, W = 1.0, H = 1.1, D = 0.9, e = 0.08;
    cx(g, [W, e, D], c, [0, e / 2, 0]); cx(g, [W, e, D], c, [0, H - e / 2, 0]);
    cx(g, [e, H, D], c, [-W / 2 + e / 2, H / 2, 0]); cx(g, [e, H, D], c, [W / 2 - e / 2, H / 2, 0]); cx(g, [W, H, e], c, [0, H / 2, -D / 2 + e / 2]);
    cx(g, [W - 2 * e, 0.02, D - e], 0x1e2228, [0, e + 0.01, 0], { r: 0 });
    // O tesouro lá dentro: barras de ouro e maços de dinheiro
    [[-0.18, 0.13], [0.0, 0.13], [0.18, 0.13], [-0.09, 0.21], [0.09, 0.21]].forEach(([x, y]) => cx(g, [0.16, 0.08, 0.32], matOuro(), [x, y, 0.05], { r: 0.01 }));
    [[-0.2, 0.55], [0.2, 0.55]].forEach(([x, y]) => { cx(g, [0.3, 0.2, 0.16], VERDE, [x, y, 0.05], { r: 0.01 }); cx(g, [0.06, 0.205, 0.165], 0xf4f1ea, [x, y, 0.05], { r: 0 }); });
    cx(g, [W - 2 * e, 0.03, D - e], c, [0, 0.43, 0], { r: 0 });
    const porta = gr(g, [-W / 2, 0, D / 2]);
    cx(porta, [W, H, 0.08], c, [W / 2, H / 2, 0.04]);
    cx(porta, [W - 0.12, H - 0.12, 0.02], new THREE.Color(c).multiplyScalar(1.15).getHex(), [W / 2, H / 2, 0.09], { r: 0.02 });
    const dial = gr(porta, [W / 2 - 0.1, H / 2 + 0.12, 0.1]);
    ci(dial, [0.13, 0.13, 0.05], 0xd8dde3, [0, 0, 0.02], { giro: [PI / 2, 0, 0], m: { metalness: 0.6, roughness: 0.3 } });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * PI * 2; cx(dial, [0.012, 0.03, 0.01], ESC, [Math.cos(a) * 0.1, Math.sin(a) * 0.1, 0.05], { r: 0, giro: [0, 0, a] }); }
    cx(dial, [0.02, 0.07, 0.02], VERM, [0, 0.06, 0.06], { r: 0 });
    const vol = gr(porta, [W / 2 + 0.18, H / 2 - 0.18, 0.12]);
    for (let i = 0; i < 3; i++) cx(vol, [0.04, 0.22, 0.04], 0xc9ccd1, [0, 0, 0], { r: 0.01, giro: [0, 0, (i / 3) * PI] });
    ci(vol, [0.05, 0.05, 0.05], 0xc9ccd1, [0, 0, 0], { giro: [PI / 2, 0, 0] });
    [0.2, H - 0.2].forEach((y) => ci(g, [0.04, 0.04, 0.12], 0xc9ccd1, [-W / 2 - 0.01, y, D / 2], {}));
    tam(g, o);
    const api = { porta, abrir(k) { porta.rotation.y = -1.9 * K.suave(K.clamp(k)); }, girar(t) { dial.rotation.z = Math.sin(t * 3) * 2.5; vol.rotation.z = t * 2; } };
    zera(() => { porta.rotation.y = 0; dial.rotation.z = 0; vol.rotation.z = 0; });
    return api;
  });

  R('pilha_dinheiro', 'Pilhas de dinheiro', 'dinheiro', (g, o) => {
    const n = o.n || 6, r = K.rand(o.seed || 4), macos = [];
    const pos = [[0, 0], [0.4, 0], [-0.4, 0], [0.2, 0.25], [-0.2, 0.25], [0, -0.25], [0.6, 0.25], [-0.6, 0.25]].slice(0, n);
    pos.forEach(([x, z], i) => {
      const p = gr(g, [x, 0, z]), alt = 0.25 + r() * 0.35;
      cx(p, [0.36, alt, 0.17], VERDE, [0, alt / 2, 0], { r: 0.008 });
      for (let y = 0.04; y < alt; y += 0.04) cx(p, [0.362, 0.006, 0.172], 0x8fd89a, [0, y, 0], { r: 0, sombra: false });
      cx(p, [0.07, alt + 0.004, 0.176], 0xf4f1ea, [0, alt / 2, 0], { r: 0 });
      p.rotation.y = (r() - 0.5) * 0.4;
      macos.push({ p, atraso: i / pos.length });
    });
    tam(g, o);
    const api = { crescer(k) { macos.forEach((m) => { const s = K.saiVolta(K.clamp((k - m.atraso * 0.6) / 0.4)); m.p.scale.set(1, Math.max(0.001, s), 1); m.p.visible = s > 0.001; }); } };
    zera(() => macos.forEach((m) => { m.p.scale.set(1, 1, 1); m.p.visible = true; }));
    return api;
  });

  R('saco_dinheiro', 'Saco de dinheiro', 'dinheiro', (g, o) => {
    const pts = [[0.001, 0], [0.28, 0.03], [0.42, 0.2], [0.44, 0.42], [0.36, 0.6], [0.16, 0.72], [0.1, 0.76], [0.001, 0.76]].map(([a, b]) => new THREE.Vector2(a, b));
    g.add(K.malha(new THREE.LatheGeometry(pts, 32), K.mat(o.cor || 0xd9c08a)));
    to(g, 0.11, 0.035, 0x8b5b35, [0, 0.76, 0], [PI / 2, 0, 0]);
    [-1, 1].forEach((l) => cx(g, [0.18, 0.1, 0.06], o.cor || 0xd9c08a, [l * 0.08, 0.86, 0], { r: 0.03, giro: [0, 0, l * 0.6] }));
    K.m3d.h.pl(g, 0.5, 0.3, (c, w, h) => letra(c, 'R$', w / 2, h / 2, h * 0.8, '#2a8a44', 900), [0, 0.38, 0.44], [-0.05, 0, 0]);
    tam(g, o);
  });

  // ---------- Telas e tecnologia ----------
  R('celular_gigante', 'Celular gigante com notificações', 'tecnologia', (g, o) => {
    const W = 0.8, H = 1.6;
    cx(g, [W, H, 0.09], o.cor || 0x1e1f22, [0, H / 2, 0], { r: 0.07 });
    cx(g, [0.18, 0.03, 0.02], 0x0a0a0a, [0, H - 0.07, 0.05], { r: 0.01 });
    const tela = K.telaCanvas(W - 0.08, H - 0.16, 360);
    tela.m.position.set(0, H / 2, 0.047);
    g.add(tela.m);
    // Suporte atrás (fica em pé sozinho)
    cx(g, [0.06, 0.9, 0.06], 0x3a3f4a, [0, 0.45, -0.25], { r: 0.02, giro: [-0.5, 0, 0] });
    const ITENS = o.itens || ['Novo cliente: "Quero um orçamento!"', 'Pix recebido: R$ 1.200,00', 'Reunião confirmada às 15h', '5 novas mensagens no WhatsApp'];
    const COR = ['#25d366', '#00bc7b', '#1067f8', '#25d366', '#f59e0b', '#e8352b'];
    function mostrar(e = {}) {
      const itens = e.itens || ITENS, n = Math.min(itens.length, e.n == null ? itens.length : e.n);
      tela.desenhar((c, w, h) => {
        const d = c.createLinearGradient(0, 0, 0, h); d.addColorStop(0, e.fundo || '#3a6fd8'); d.addColorStop(1, '#7a4fd6'); c.fillStyle = d; c.fillRect(0, 0, w, h);
        letra(c, e.hora || '9:41', w / 2, h * 0.12, w * 0.2, '#ffffff', 300);
        letra(c, e.data || 'segunda-feira', w / 2, h * 0.19, w * 0.055, 'rgba(255,255,255,.85)', 600);
        for (let i = 0; i < n; i++) {
          const y = h * 0.26 + i * h * 0.13, x0 = w * 0.06, ww = w * 0.88, hh = h * 0.11;
          c.fillStyle = 'rgba(255,255,255,.92)'; c.beginPath(); c.roundRect ? c.roundRect(x0, y, ww, hh, 18) : c.rect(x0, y, ww, hh); c.fill();
          c.fillStyle = COR[i % COR.length]; c.beginPath(); c.arc(x0 + hh * 0.5, y + hh / 2, hh * 0.3, 0, 7); c.fill();
          const txt = itens[i], meio = txt.length > 24 ? txt.lastIndexOf(' ', 24) : -1;
          if (meio > 0) { letra(c, txt.slice(0, meio), x0 + hh, y + hh * 0.34, w * 0.045, '#1e1f22', 700, 'left'); letra(c, txt.slice(meio + 1), x0 + hh, y + hh * 0.7, w * 0.045, '#4a4f58', 600, 'left'); }
          else letra(c, txt, x0 + hh, y + hh / 2, w * 0.05, '#1e1f22', 700, 'left');
        }
        if (n > 0) { c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w * 0.86, h * 0.07, w * 0.07, 0, 7); c.fill(); letra(c, String(e.badge ?? n), w * 0.86, h * 0.072, w * 0.08, '#ffffff', 900); }
      }, JSON.stringify(e));
    }
    tam(g, o);
    const api = { tela, mostrar, vibrar(t, forca = 1) { g.rotation.z = Math.sin(t * 60) * 0.03 * forca; } };
    zera(() => { g.rotation.z = 0; mostrar(o.estado || {}); });
    mostrar(o.estado || {});
    return api;
  });

  R('botao_vermelho', 'Botão vermelho gigante', 'ganchos', (g, o) => {
    ci(g, [0.32, 0.38, 0.9], 0x3a3f4a, [0, 0.45, 0]);
    ci(g, [0.42, 0.42, 0.08], OURO, [0, 0.94, 0]);
    for (let i = 0; i < 8; i++) cx(g, [0.12, 0.081, 0.06], 0x1e1f22, [Math.cos((i / 8) * PI * 2) * 0.36, 0.94, Math.sin((i / 8) * PI * 2) * 0.36], { r: 0, giro: [0, -(i / 8) * PI * 2 + 0.6, 0] });
    ci(g, [0.3, 0.3, 0.06], 0x2a2e36, [0, 1.0, 0]);
    const matB = K.mat(VERM, { roughness: 0.3, emissive: 0xff2010, emissiveIntensity: 0.1 });
    const domo = K.malha(new THREE.SphereGeometry(0.24, 28, 14, 0, PI * 2, 0, PI / 2), matB);
    domo.scale.y = 0.75; domo.position.y = 1.03; g.add(domo);
    tam(g, o);
    const api = { domo, apertar(k) { const x = K.clamp(k); domo.position.y = 1.03 - 0.07 * x; domo.scale.y = 0.75 * (1 - 0.3 * x); matB.emissiveIntensity = 0.1 + 1.2 * x; } };
    zera(() => api.apertar(0));
    return api;
  });

  R('calculadora', 'Calculadora', 'negocios', (g, o) => {
    const p = gr(g, [0, 0, 0]); p.rotation.x = -0.25;
    cx(p, [0.5, 0.78, 0.06], o.cor || 0x2a2e36, [0, 0.39, 0], { r: 0.04 });
    K.m3d.h.pl(p, 0.42, 0.14, (c, w, h) => { c.fillStyle = '#b8d4a8'; c.fillRect(0, 0, w, h); letra(c, o.texto || '1.250,00', w * 0.94, h / 2, h * 0.6, '#1e2a1a', 700, 'right'); }, [0, 0.64, 0.032]);
    const cores = [0xd8dde3, 0xd8dde3, 0xd8dde3, 0xf59e0b];
    for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) cx(p, [0.085, 0.07, 0.03], j === 0 && i < 3 ? 0x8a929c : cores[i], [-0.165 + i * 0.11, 0.48 - j * 0.09, 0.035], { r: 0.012 });
    cx(g, [0.5, 0.06, 0.3], 0x3a3f4a, [0, 0.03, -0.1], { r: 0.02 });
    tam(g, o);
  });

  R('planilha_gigante', 'Planilha gigante num cavalete', 'negocios', (g, o) => {
    const W = 2.2, H = 1.6, Y = 1.75;
    [-1, 1].forEach((l) => cx(g, [0.06, Y + H / 2, 0.06], 0x8a929c, [l * (W / 2 - 0.1), (Y + H / 2) / 2, -0.05], { r: 0.01 }));
    cx(g, [W + 0.08, H + 0.08, 0.05], 0xc9ccd1, [0, Y, -0.04], { r: 0.02 });
    const tela = K.telaCanvas(W, H, 640);
    tela.m.position.set(0, Y, 0);
    g.add(tela.m);
    const cols = o.colunas || ['Empresa', 'Telefone', 'Cidade', 'Site'];
    const linhas = o.linhas || ['Clínica Sorriso', 'Academia Treino', 'Pizzaria Forno', 'Salão Bella', 'Loja Vento Sul', 'Padaria Pão Bom', 'Pet Shop Amigo', 'Ótica Visão', 'Café Central'];
    function preencher(k = 1) {
      const n = Math.round(K.clamp(k) * linhas.length);
      tela.desenhar((c, w, h) => {
        c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
        const lh = h / (linhas.length + 1.4), cw = [0.36, 0.24, 0.2, 0.2].map((f) => f * w);
        c.fillStyle = '#1f7a44'; c.fillRect(0, 0, w, lh * 1.4);
        let x = 0; cols.forEach((t, i) => { letra(c, t, x + 12, lh * 0.7, lh * 0.55, '#ffffff', 800, 'left'); x += cw[i] || w * 0.2; });
        for (let i = 0; i < linhas.length; i++) {
          const y = lh * 1.4 + i * lh;
          if (i % 2) { c.fillStyle = '#eef6f0'; c.fillRect(0, y, w, lh); }
          if (i < n) {
            letra(c, linhas[i], 12, y + lh / 2, lh * 0.5, '#1e1f22', 700, 'left');
            c.fillStyle = '#9aa0a6'; c.fillRect(cw[0] + 12, y + lh * 0.35, cw[1] * 0.7, lh * 0.3);
            c.fillRect(cw[0] + cw[1] + 12, y + lh * 0.35, cw[2] * 0.6, lh * 0.3);
            c.fillStyle = i % 3 === 1 ? '#e8352b' : '#2fb54a'; c.beginPath(); c.arc(cw[0] + cw[1] + cw[2] + 30, y + lh / 2, lh * 0.2, 0, 7); c.fill();
          }
        }
        c.strokeStyle = '#c9d6cc'; c.lineWidth = 2;
        for (let i = 0; i <= linhas.length; i++) { const y = lh * 1.4 + i * lh; c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
        let xx = 0; cw.forEach((v) => { xx += v; c.beginPath(); c.moveTo(xx, 0); c.lineTo(xx, h); c.stroke(); });
      }, 'n' + n);
      return n;
    }
    tam(g, o);
    zera(() => preencher(o.cheia === false ? 0 : 1));
    preencher(1);
    return { tela, preencher };
  });

  // ---------- Ganchos e metáforas ----------
  R('rede_pesca', 'Rede de pescar (pegar cliente)', 'ganchos', (g, o) => {
    ci(g, [0.03, 0.035, 1.3], 0x8b5b35, [0, 0.65, 0]);
    ci(g, [0.045, 0.045, 0.3], 0x2a2e36, [0, 0.15, 0]);
    const aro = gr(g, [0, 1.65, 0]);
    to(aro, 0.36, 0.022, 0x8a929c, [0, 0, 0], [0, 0, 0]);
    const rede = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.7, 14, 5, true), new THREE.MeshBasicMaterial({ color: o.corRede || 0x2a6f9a, wireframe: true, transparent: true, opacity: 0.95 }));
    rede.rotation.x = -PI / 2; rede.position.z = -0.35; aro.add(rede);
    tam(g, o);
  });

  R('foguete_desenho', 'Foguete de desenho (crescimento)', 'ganchos', (g, o) => {
    const c = o.cor || BR, v = o.cor2 || VERM;
    ci(g, [0.26, 0.3, 1.0], c, [0, 0.95, 0]);
    const nariz = K.malha(new THREE.ConeGeometry(0.26, 0.5, 28), K.mat(v)); nariz.position.y = 1.7; g.add(nariz);
    ci(g, [0.3, 0.22, 0.2], 0x8a929c, [0, 0.35, 0]);
    to(g, 0.12, 0.03, 0x8a929c, [0, 1.1, 0.27], [0, 0, 0]);
    ci(g, [0.11, 0.11, 0.04], 0x6fc3ff, [0, 1.1, 0.27], { giro: [PI / 2, 0, 0], m: { emissive: 0x2060a0, emissiveIntensity: 0.3 } });
    for (let i = 0; i < 3; i++) { const a = (i / 3) * PI * 2; cx(g, [0.04, 0.42, 0.3], v, [Math.sin(a) * 0.32, 0.55, Math.cos(a) * 0.32], { r: 0.02, giro: [0, a, 0] }); }
    tam(g, o);
    return { bocal: [0, 0.25, 0] };
  });

  R('balanca', 'Balança de dois pratos', 'ganchos', (g, o) => {
    const c = o.cor || OURO, m = { metalness: 0.5, roughness: 0.35 };
    ci(g, [0.3, 0.36, 0.08], c, [0, 0.04, 0], { m });
    ci(g, [0.04, 0.05, 1.5], c, [0, 0.8, 0], { m });
    bo(g, 0.07, c, [0, 1.58, 0], null, { m });
    const trave = gr(g, [0, 1.52, 0]);
    cx(trave, [1.5, 0.05, 0.05], c, [0, 0, 0], { r: 0.02, m });
    const pratos = [-1, 1].map((l) => {
      const p = gr(g, [l * 0.72, 1.52, 0]);
      [0, 2.1, 4.2].forEach((a) => { const h = K.malha(geoHaste, K.mat(0x8a929c), false); K.ligarPontos(h, [0, -0.6, 0].map((v, i) => [Math.cos(a) * 0.2, -0.6, Math.sin(a) * 0.2][i]), [0, 0, 0], 0.006); p.add(h); });
      ci(p, [0.24, 0.18, 0.05], c, [0, -0.62, 0], { m });
      return { p, l };
    });
    tam(g, o);
    const api = { trave, pratos, pender(k) { const a = -0.3 * K.clamp(k, -1, 1); trave.rotation.z = a; pratos.forEach(({ p, l }) => p.position.set(l * 0.72 * Math.cos(a), 1.52 + l * 0.72 * Math.sin(a), 0)); } };
    zera(() => api.pender(0));
    return api;
  });

  R('corrente_cadeado', 'Corrente com cadeado', 'ganchos', (g, o) => {
    const comp = o.comp || 2.4, y = o.y ?? 0.9, n = Math.round(comp / 0.13);
    const mc = K.mat(0x9aa0a6, { metalness: 0.7, roughness: 0.35 });
    const geoElo = new THREE.TorusGeometry(0.06, 0.016, 8, 16); geoElo.scale(1.35, 1, 1);
    for (let i = 0; i < n; i++) { const e = K.malha(geoElo, mc); e.position.set(-comp / 2 + i * 0.13 + 0.065, y, 0.1); e.rotation.x = i % 2 ? PI / 2 : 0; g.add(e); }
    const cad = gr(g, [0, y - 0.12, 0.18]);
    cx(cad, [0.3, 0.26, 0.1], matOuro(), [0, 0, 0], { r: 0.03 });
    bo(cad, 0.025, 0x1e1f22, [0, 0.02, 0.05]); cx(cad, [0.02, 0.06, 0.02], 0x1e1f22, [0, -0.03, 0.052], { r: 0 });
    const alca = gr(cad, [0, 0.13, 0]);
    to(alca, 0.09, 0.022, 0xc9ccd1, [0, 0, 0], [0, 0, 0], PI);
    [-1, 1].forEach((l) => ci(alca, [0.022, 0.022, 0.06], 0xc9ccd1, [l * 0.09, -0.03, 0]));
    tam(g, o);
    const api = { cadeado: cad, abrir(k) { const x = K.clamp(k); alca.position.y = 0.13 + 0.08 * x; alca.rotation.y = 1.2 * x; } };
    zera(() => api.abrir(0));
    return api;
  });

  R('despertador', 'Despertador', 'ganchos', (g, o) => {
    const c = o.cor || VERM;
    const corpo = gr(g, [0, 0.38, 0]);
    ci(corpo, [0.24, 0.24, 0.14], c, [0, 0, 0], { giro: [PI / 2, 0, 0] });
    ci(corpo, [0.2, 0.2, 0.02], 0xffffff, [0, 0, 0.07], { giro: [PI / 2, 0, 0] });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * PI * 2; cx(corpo, [0.012, i % 3 ? 0.02 : 0.04, 0.01], ESC, [Math.sin(a) * 0.16, Math.cos(a) * 0.16, 0.085], { r: 0, giro: [0, 0, -a] }); }
    const pH = gr(corpo, [0, 0, 0.09]), pM = gr(corpo, [0, 0, 0.095]);
    cx(pH, [0.025, 0.1, 0.01], ESC, [0, 0.05, 0], { r: 0 }); cx(pM, [0.018, 0.15, 0.01], ESC, [0, 0.075, 0], { r: 0 });
    const sinos = [-1, 1].map((l) => { const s = gr(corpo, [l * 0.16, 0.22, 0]); bo(s, 0.1, c, [0, 0, 0], [1, 0.8, 1]); s.rotation.z = -l * 0.5; return s; });
    cx(corpo, [0.03, 0.12, 0.03], 0x8a929c, [0, 0.27, 0], { r: 0 });
    [-1, 1].forEach((l) => ci(g, [0.025, 0.04, 0.18], 0x8a929c, [l * 0.14, 0.09, 0], { giro: [0, 0, l * 0.4] }));
    tam(g, o);
    const api = { corpo, horas(h) { pH.rotation.z = -(h / 12) * PI * 2; pM.rotation.z = -(h % 1) * PI * 2; }, tocar(t, forca = 1) { corpo.rotation.z = Math.sin(t * 70) * 0.12 * forca; corpo.position.y = 0.38 + Math.abs(Math.sin(t * 35)) * 0.03 * forca; sinos.forEach((s, i) => { s.rotation.y = Math.sin(t * 90 + i) * 0.4 * forca; }); } };
    zera(() => { corpo.rotation.z = 0; corpo.position.y = 0.38; sinos.forEach((s) => { s.rotation.y = 0; }); api.horas(o.horas ?? 7); });
    return api;
  });

  R('seta_crescimento', 'Seta de crescimento (gráfico subindo)', 'ganchos', (g, o) => {
    const pts = (o.pontos || [[-1.2, 0.2], [-0.6, 0.7], [-0.2, 0.5], [0.4, 1.2], [0.8, 1.0], [1.3, 1.9]]).map(([x, y]) => new THREE.Vector3(x, y, 0));
    const mat = K.mat(o.cor || 0x2fb54a, { roughness: 0.5 });
    const segs = pts.slice(0, -1).map((p, i) => ({ m: K.malha(geoHaste, mat), a: p, b: pts[i + 1], L: p.distanceTo(pts[i + 1]) }));
    segs.forEach((s) => g.add(s.m));
    const juntas = pts.map((p) => { const j = K.malha(new THREE.SphereGeometry(0.09, 14, 10), mat); j.position.copy(p); g.add(j); return j; });
    const ponta = K.malha(new THREE.ConeGeometry(0.2, 0.36, 20), mat); g.add(ponta);
    const total = segs.reduce((a, s) => a + s.L, 0);
    function crescer(k) {
      let d = K.clamp(k) * total, fim = pts[0], dir = segs[0].b.clone().sub(segs[0].a);
      segs.forEach((s, i) => {
        const f = K.clamp(d / s.L); d -= s.L;
        s.m.visible = f > 0; juntas[i].visible = f > 0 || i === 0;
        if (f > 0) { const b = s.a.clone().lerp(s.b, f); K.ligarPontos(s.m, s.a.toArray(), b.toArray(), 0.08); fim = b; dir = s.b.clone().sub(s.a); }
      });
      juntas[juntas.length - 1].visible = k >= 1;
      ponta.position.copy(fim); ponta.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize()); ponta.visible = k > 0.02;
    }
    tam(g, o);
    zera(() => crescer(1));
    crescer(1);
    return { crescer };
  });

  R('escada_sucesso', 'Escada do sucesso (degraus subindo)', 'ganchos', (g, o) => {
    const n = o.degraus || 5, cores = [0x9fd8f0, 0x6fc3ff, 0x3a8fe0, 0x1067f8, 0x2f4fd8, 0x5a3fd8];
    const degs = [];
    for (let i = 0; i < n; i++) { const h = 0.3 * (i + 1); const d = gr(g, [-((n - 1) * 0.55) / 2 + i * 0.55, 0, 0]); cx(d, [0.55, h, 0.8], cores[i % cores.length], [0, h / 2, 0], { r: 0.02 }); degs.push(d); }
    const bandeira = gr(g, [-((n - 1) * 0.55) / 2 + (n - 1) * 0.55, 0.3 * n, 0]);
    ci(bandeira, [0.015, 0.015, 0.7], 0x8a929c, [0, 0.35, 0]); cx(bandeira, [0.3, 0.2, 0.01], OURO, [0.15, 0.6, 0], { r: 0 });
    tam(g, o);
    const api = { degraus: degs, crescer(k) { degs.forEach((d, i) => { const s = K.saiVolta(K.clamp((k * n - i))); d.scale.set(1, Math.max(0.001, s), 1); d.visible = s > 0.001; }); bandeira.visible = k >= 1; } };
    zera(() => api.crescer(1));
    return api;
  });

  R('coroa', 'Coroa', 'ganchos', (g, o) => {
    const m = matOuro();
    g.add(K.malha(new THREE.CylinderGeometry(0.3, 0.27, 0.2, 32, 1, true), Object.assign(m, { side: THREE.DoubleSide })));
    g.children[g.children.length - 1].position.y = 0.1;
    for (let i = 0; i < 8; i++) { const a = (i / 8) * PI * 2; const p = K.malha(new THREE.ConeGeometry(0.06, 0.18, 8), m); p.position.set(Math.sin(a) * 0.285, 0.28, Math.cos(a) * 0.285); g.add(p); bo(g, 0.025, OURO, [Math.sin(a) * 0.285, 0.37, Math.cos(a) * 0.285]); }
    [0xe8352b, 0x1067f8, 0x2fb54a, 0xe8352b].forEach((c, i) => { const a = (i / 4) * PI * 2; bo(g, 0.04, c, [Math.sin(a) * 0.3, 0.1, Math.cos(a) * 0.3], [1, 1, 0.5], { giro: [0, a, 0], m: { roughness: 0.2 } }); });
    tam(g, o);
  });

  R('papel_amassado', 'Bola de papel amassado', 'ganchos', (g, o) => {
    const geo = new THREE.IcosahedronGeometry(0.12, 1), r = K.rand(o.seed || 9), p = geo.attributes.position, mapa = new Map();
    for (let i = 0; i < p.count; i++) { const k = `${p.getX(i).toFixed(3)},${p.getY(i).toFixed(3)},${p.getZ(i).toFixed(3)}`; if (!mapa.has(k)) mapa.set(k, 0.8 + r() * 0.35); const f = mapa.get(k); p.setXYZ(i, p.getX(i) * f, p.getY(i) * f, p.getZ(i) * f); }
    geo.computeVertexNormals();
    const m = K.malha(geo, K.mat(o.cor || 0xf4f1ea, { flatShading: true }));
    m.position.y = 0.11; g.add(m);
    tam(g, o);
  });

  R('presente', 'Caixa de presente', 'ganchos', (g, o) => {
    const c = o.cor || 0x1067f8, f = o.fita || 0xf5c518, S = 0.6;
    cx(g, [S, S * 0.8, S], c, [0, S * 0.4, 0], { r: 0.01 });
    cx(g, [0.1, S * 0.8 + 0.004, S + 0.004], f, [0, S * 0.4, 0], { r: 0 }); cx(g, [S + 0.004, S * 0.8 + 0.004, 0.1], f, [0, S * 0.4, 0], { r: 0 });
    const tampa = gr(g, [0, S * 0.8, -S / 2 - 0.02]);
    cx(tampa, [S + 0.06, 0.14, S + 0.06], c, [0, 0.07, S / 2 + 0.02], { r: 0.01 });
    cx(tampa, [0.1, 0.144, S + 0.064], f, [0, 0.07, S / 2 + 0.02], { r: 0 }); cx(tampa, [S + 0.064, 0.144, 0.1], f, [0, 0.07, S / 2 + 0.02], { r: 0 });
    [-1, 1].forEach((l) => to(tampa, 0.09, 0.03, f, [l * 0.08, 0.2, S / 2 + 0.02], [0, 0, l * 0.5]));
    tam(g, o);
    const api = { tampa, abrir(k) { const x = K.saiVolta(K.clamp(k)); tampa.rotation.x = -1.6 * x; tampa.position.y = S * 0.8 + 0.08 * x; } };
    zera(() => api.abrir(0));
    return api;
  });

  R('sirene', 'Sirene de alerta girando', 'ganchos', (g, o) => {
    const cor = o.cor || VERM;
    ci(g, [0.2, 0.24, 0.12], 0x2a2e36, [0, 0.06, 0]);
    const matC = new THREE.MeshStandardMaterial({ color: cor, transparent: true, opacity: 0.75, emissive: cor, emissiveIntensity: 0.6, roughness: 0.2 });
    const domo = K.malha(new THREE.SphereGeometry(0.18, 24, 14, 0, PI * 2, 0, PI / 2), matC, false); domo.scale.y = 1.4; domo.position.y = 0.12; g.add(domo);
    const gira = gr(g, [0, 0.22, 0]);
    const feixe = new THREE.Mesh(new THREE.ConeGeometry(0.5, 2.4, 20, 1, true).rotateZ(PI / 2).translate(1.2, 0, 0), new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    gira.add(feixe);
    const halo = K.halo(cor, 1.2); halo.position.y = 0.22; g.add(halo);
    tam(g, o);
    const api = { em(t, forca = 1) { gira.rotation.y = t * 6; feixe.visible = forca > 0.01; halo.material.opacity = forca * (0.6 + 0.4 * Math.abs(Math.sin(t * 6))); matC.emissiveIntensity = 0.3 + 0.9 * forca; } };
    zera(() => { feixe.visible = false; halo.material.opacity = 0.3; matC.emissiveIntensity = 0.4; });
    return api;
  });

  // ---------- Entrega e compras ----------
  R('caixa_entrega', 'Caixa de papelão de entrega', 'entrega', (g, o) => {
    const S = o.l || 0.6, c = o.cor || 0xc8935a;
    cx(g, [S, S * 0.8, S * 0.8], c, [0, S * 0.4, 0], { r: 0.005 });
    const abas = [[0, 1], [0, -1], [1, 0], [-1, 0]].map(([x, z]) => {
      const a = gr(g, [x * S / 2, S * 0.8, z * S * 0.4]);
      const larg = x ? S * 0.8 : S, prof = x ? S / 2 : S * 0.4;
      cx(a, [x ? prof : larg, 0.012, x ? larg : prof], new THREE.Color(c).multiplyScalar(0.95).getHex(), [-x * prof / 2, 0, -z * prof / 2], { r: 0 });
      return { a, x, z };
    });
    cx(g, [S * 0.2, 0.014, S * 0.8 + 0.01], 0xd9c49a, [0, S * 0.8 + 0.008, 0], { r: 0, sombra: false });
    K.m3d.h.pl(g, S * 0.45, S * 0.3, (cc, w, h) => { cc.fillStyle = '#ffffff'; cc.fillRect(0, 0, w, h); cc.fillStyle = '#1e1f22'; for (let i = 0; i < 4; i++) cc.fillRect(w * 0.1, h * (0.2 + i * 0.17), w * (0.8 - i * 0.12), h * 0.07); }, [S * 0.15, S * 0.45, S * 0.401]);
    tam(g, o);
    const api = { abrir(k) { const x = K.clamp(k); abas.forEach(({ a, x: ax, z }) => { a.rotation.set(-z * 2.2 * x, 0, ax * 2.2 * x); }); } };
    zera(() => api.abrir(0));
    return api;
  });

  R('moto_entrega', 'Moto de entrega com bag', 'entrega', (g, o) => {
    const c = o.cor || VERM;
    const rodas = [-0.62, 0.62].map((x) => { const r = gr(g, [x, 0.3, 0]); to(r, 0.24, 0.07, 0x1e1f22, [0, 0, 0], [0, 0, 0]); ci(r, [0.1, 0.1, 0.08], 0xc9ccd1, [0, 0, 0], { giro: [PI / 2, 0, 0] }); for (let i = 0; i < 3; i++) cx(r, [0.03, 0.34, 0.02], 0xc9ccd1, [0, 0, 0], { r: 0, giro: [0, 0, (i / 3) * PI] }); return r; });
    cx(g, [1.0, 0.24, 0.3], c, [0, 0.6, 0], { r: 0.08 });
    cx(g, [0.5, 0.1, 0.28], 0x1e1f22, [-0.15, 0.78, 0], { r: 0.05 });
    cx(g, [0.12, 0.6, 0.12], 0x3a3f4a, [0.55, 0.62, 0], { r: 0.03, giro: [0, 0, -0.35] });
    cx(g, [0.06, 0.06, 0.6], 0x1e1f22, [0.66, 0.95, 0], { r: 0.02 });
    bo(g, 0.07, 0xfff2c4, [0.72, 0.82, 0], null, { m: { emissive: 0xffd88a, emissiveIntensity: 0.6 } });
    const bag = gr(g, [-0.55, 0.95, 0]);
    cx(bag, [0.46, 0.44, 0.44], o.bag || c, [0, 0.22, 0], { r: 0.03 }); cx(bag, [0.48, 0.05, 0.46], BR, [0, 0.4, 0], { r: 0.01 });
    cx(g, [0.3, 0.05, 0.3], 0x3a3f4a, [-0.55, 0.92, 0], { r: 0.01 });
    tam(g, o);
    const api = { selim: [-0.15, 0.84, 0], rodar(t, vel = 1) { rodas.forEach((r) => { r.rotation.z = -t * vel * 8; }); } };
    zera(() => api.rodar(0));
    return api;
  });

  R('carrinho_compras', 'Carrinho de compras', 'entrega', (g, o) => {
    const c = o.cor || 0xc9ccd1, m = { metalness: 0.5, roughness: 0.35 }, W = 0.55, L = 0.85, H = 0.45, Y = 0.5;
    const arame = (a, b, r = 0.012) => { const h = K.malha(geoHaste, K.mat(c, m)); K.ligarPontos(h, a, b, r); g.add(h); };
    const cant = [[-L / 2, -W / 2], [L / 2, -W / 2], [L / 2, W / 2], [-L / 2, W / 2]];
    cant.forEach(([x, z], i) => { const [x2, z2] = cant[(i + 1) % 4]; arame([x, Y, z], [x2, Y, z2]); arame([x * 1.12, Y + H, z * 1.1], [x2 * 1.12, Y + H, z2 * 1.1]); arame([x, Y, z], [x * 1.12, Y + H, z * 1.1]); });
    for (let k = 1; k < 6; k++) { const x = -L / 2 + (k * L) / 6; [-1, 1].forEach((l) => arame([x, Y, l * W / 2], [x * 1.12, Y + H, l * W / 2 * 1.1], 0.006)); }
    for (let k = 1; k < 3; k++) { const y = Y + (k * H) / 3, f = 1 + 0.12 * (k / 3); [-1, 1].forEach((l) => { arame([-L / 2 * f, y, l * W / 2], [L / 2 * f, y, l * W / 2], 0.006); arame([l * L / 2 * f, y, -W / 2], [l * L / 2 * f, y, W / 2], 0.006); }); }
    cx(g, [L, 0.01, W], 0x8a929c, [0, Y, 0], { r: 0 });
    arame([-L / 2 * 1.12, Y + H, -W / 2], [-L / 2 - 0.25, Y + H + 0.2, -W / 2]); arame([-L / 2 * 1.12, Y + H, W / 2], [-L / 2 - 0.25, Y + H + 0.2, W / 2]);
    ci(g, [0.03, 0.03, W + 0.1], VERM, [-L / 2 - 0.25, Y + H + 0.2, 0], { giro: [PI / 2, 0, 0] });
    cant.forEach(([x, z]) => { arame([x, Y, z], [x * 0.9, 0.08, z]); ci(g, [0.06, 0.06, 0.04], 0x1e1f22, [x * 0.9, 0.06, z], { giro: [PI / 2, 0, 0] }); });
    tam(g, o);
  });
})();
