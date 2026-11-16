// Mais efeitos do canal (criar no montar, chamar .em(...) no plano em todo quadro):
//   K.fogos()            fogos de artifício estourando no céu: em(centro, tempo, { n, raio, altura, som })
//   K.holofote()         luz de palco caindo num ponto, com o cone e a poça de luz: em(alvo, { de, abertura, forca, cor })
//   K.chuva()            chuva (ou neve: K.chuva(7, { neve: true })) em volta de um ponto: em(centro, t, { raio, forca })
//   K.balaoPensamento()  nuvem de pensamento em cima da cabeça, com texto: em(cabeca, tempo, { texto, cor })
//   K.balaoFala()        balão de fala de quadrinho: em(boca, tempo, { texto, lado })
//   K.nuvemRaiva()       nuvem escura de tempestade em cima da cabeça, com raio e chuvinha: em(cabeca, t, { forca })
//   K.simbolo()          sinal gigante que pula em cima de alguém: '?', '!', '$', '✓', '✗', '❤', '+1': em(pos, tempo, { tipo, cor, tam })
//   K.contador()         número contando que nem placar ("+200 clientes"): em(pos, tempo, { de, ate, dur, antes, depois, cor, tam })
//   K.folhasVento()      folhas (ou papéis: { papel: true }) voando com o vento: em(centro, t, { rumo, forca })
// cabeca/boca: um ponto [x, y, z] (pra um personagem: b.cabeca.getWorldPosition(new THREE.Vector3()).toArray())
(function () {
  const K = window.K;
  const PI = Math.PI;
  const V = () => new THREE.Vector3();
  function texTexto(desenhar, w = 512, h = 256) {
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const c = cv.getContext('2d');
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    let chave = null;
    return { t, cv, c, desenhar(fn, k) { if (k === chave) return; chave = k; c.clearRect(0, 0, w, h); fn(c, w, h); t.needsUpdate = true; } };
  }
  function quebrar(c, texto, larg) {
    const palavras = String(texto).split(' '), linhas = [];
    let l = '';
    palavras.forEach((p) => { const t = l ? l + ' ' + p : p; if (c.measureText(t).width > larg && l) { linhas.push(l); l = p; } else l = t; });
    if (l) linhas.push(l);
    return linhas;
  }
  const pop = (tempo, dur = 0.35) => K.saiVolta(K.clamp(tempo / dur));

  K.fogos = function (seed = 71, n = 5) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const CORES = [0xff5a7a, 0xffd23f, 0x5ad8ff, 0x7dff6a, 0xc77dff, 0xffffff, 0xff8a1f];
    const geo = new THREE.SphereGeometry(0.11, 6, 4);
    const tiros = [];
    for (let i = 0; i < n; i++) {
      const cor = CORES[i % CORES.length], mat = new THREE.MeshBasicMaterial({ color: cor, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const rastro = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xfff2c4 }));
      const ps = [];
      for (let k = 0; k < 70; k++) { const m = new THREE.Mesh(geo, mat); const d = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize(); ps.push({ m, d }); g.add(m); }
      const halo = K.halo(cor, 1); g.add(halo);
      g.add(rastro);
      tiros.push({ ps, mat, rastro, halo, atraso: i * 0.45 + r() * 0.3, x: (r() - 0.5) * 2, z: (r() - 0.5) * 0.6, h: 0.75 + r() * 0.35, sobe: 0.7 + r() * 0.2 });
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(centro, tempo, op = {}) {
        const { raio = 5, altura = 9, som = 'estalo', repete = true } = op;
        if (tempo < 0) return;
        g.visible = true;
        g.position.set(...centro);
        tiros.forEach((T) => {
          const ciclo = 2.6, tt0 = tempo - T.atraso;
          const tt = repete ? ((tt0 % ciclo) + ciclo) % ciclo : tt0;
          const vivo = tt0 > 0;
          const topo = [T.x * raio, altura * T.h, T.z * raio];
          const subida = K.clamp(tt / T.sobe);
          T.rastro.visible = vivo && subida < 1;
          T.rastro.position.set(topo[0], topo[1] * K.suave(subida), topo[2]);
          const k = (tt - T.sobe) / 1.5;
          T.ps.forEach((p) => {
            p.m.visible = vivo && k > 0 && k < 1;
            if (!p.m.visible) return;
            const e = 1 - Math.pow(1 - k, 3);
            p.m.position.set(topo[0] + p.d.x * raio * 0.55 * e, topo[1] + p.d.y * raio * 0.55 * e - 1.2 * k * k, topo[2] + p.d.z * raio * 0.55 * e);
            p.m.scale.setScalar(2.2 * (1 - k * 0.55));
          });
          T.mat.opacity = 1 - Math.pow(K.clamp(k), 2);
          T.halo.visible = vivo && k > 0 && k < 0.5;
          T.halo.position.set(...topo); T.halo.scale.setScalar(raio * 1.4); T.halo.material.opacity = 0.7 * (1 - k * 2);
          if (som && vivo && k > 0) K.som(som, K.tc - (tt - T.sobe), 0.5);
        });
      }
    });
  };

  K.holofote = function () {
    const g = new THREE.Group();
    const matCone = new THREE.MeshBasicMaterial({ color: 0xfff4d6, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 40, 1, true).translate(0, -0.5, 0), matCone);
    const poca = new THREE.Mesh(new THREE.CircleGeometry(1, 40).rotateX(-PI / 2), new THREE.MeshBasicMaterial({ color: 0xfff4d6, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
    const luz = new THREE.SpotLight(0xfff4d6, 0, 40, 0.3, 0.5, 1);
    const alvoLuz = new THREE.Object3D();
    g.add(cone, poca, luz, alvoLuz);
    luz.target = alvoLuz;
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; luz.intensity = 0; },
      em(alvo, op = {}) {
        const { abertura = 1.1, forca = 1, cor = 0xfff4d6 } = op;
        if (forca <= 0.01) return;
        const de = op.de || [alvo[0] + 1.5, alvo[1] + 9, alvo[2] + 2];
        g.visible = true;
        const a = new THREE.Vector3(...de), b = new THREE.Vector3(...alvo), L = a.distanceTo(b);
        cone.position.copy(a);
        cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), b.clone().sub(a).normalize());
        cone.scale.set(abertura, L, abertura);
        matCone.color.setHex(cor); matCone.opacity = 0.16 * forca;
        poca.position.set(b.x, b.y + 0.015, b.z); poca.scale.setScalar(abertura * 1.05); poca.material.color.setHex(cor); poca.material.opacity = 0.35 * forca;
        luz.position.copy(a); alvoLuz.position.copy(b); luz.color.setHex(cor); luz.angle = Math.atan(abertura / L) * 1.2; luz.intensity = 90 * forca;
      }
    });
  };

  K.chuva = function (seed = 73, opC = {}) {
    const r = K.rand(seed), neve = !!opC.neve, n = opC.n || (neve ? 450 : 600);
    const g = new THREE.Group();
    const geo = neve ? new THREE.SphereGeometry(0.055, 6, 4) : new THREE.BoxGeometry(0.022, 0.55, 0.022);
    const mat = new THREE.MeshBasicMaterial({ color: neve ? 0xffffff : 0x8fb8dc, transparent: true, opacity: neve ? 0.95 : 0.75, depthWrite: false });
    const ps = [];
    for (let i = 0; i < n; i++) { const m = new THREE.Mesh(geo, mat); ps.push({ m, x: r() - 0.5, z: r() - 0.5, f: r(), v: 0.8 + r() * 0.4, s: r() * 6 }); g.add(m); }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(centro, t, op = {}) {
        const { raio = 5, altura = 8, forca = 1, vento = 0.15 } = op;
        if (forca <= 0.01) return;
        g.visible = true;
        g.position.set(...centro);
        const vel = neve ? 0.12 : 1.4;
        ps.forEach((p, i) => {
          p.m.visible = i / ps.length < forca;
          const k = (t * vel * p.v + p.f) % 1;
          const y = altura * (1 - k);
          p.m.position.set(p.x * raio * 2 + vento * y + (neve ? Math.sin(t * 1.3 + p.s) * 0.3 : 0), y, p.z * raio * 2);
          p.m.rotation.z = neve ? 0 : -vento * 0.4;
        });
      }
    });
  };

  // Balões e sinais (sprites: sempre de frente pra câmera)
  function spriteTexto(w, h, escala) {
    const tx = texTexto(() => {}, w, h);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx.t, transparent: true, depthWrite: false, depthTest: false }));
    s.renderOrder = 20;
    s.userData.base = [escala * (w / h), escala];
    s.scale.set(...s.userData.base, 1);
    return { s, tx };
  }
  K.balaoPensamento = function () {
    const g = new THREE.Group();
    const { s, tx } = spriteTexto(512, 360, 1.15);
    g.add(s);
    const bolinhas = [0.07, 0.11].map((r) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), K.mat(0xffffff, { roughness: 0.6 })); g.add(m); return m; });
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(cabeca, tempo, op = {}) {
        if (tempo < 0) return;
        const { texto = '?', cor = '#1e1f22', lado = 1 } = op;
        g.visible = true;
        g.position.set(...cabeca);
        const k = pop(tempo - 0.25);
        bolinhas[0].position.set(0.2 * lado, 0.3, 0); bolinhas[0].scale.setScalar(pop(tempo, 0.15));
        bolinhas[1].position.set(0.38 * lado, 0.5, 0); bolinhas[1].scale.setScalar(pop(tempo - 0.12, 0.15));
        s.position.set(0.75 * lado, 1.05 + Math.sin(tempo * 2) * 0.03, 0);
        s.scale.set(s.userData.base[0] * k, s.userData.base[1] * k, 1);
        s.visible = k > 0.01;
        tx.desenhar((c, w, h) => {
          c.fillStyle = '#ffffff'; c.strokeStyle = 'rgba(30,31,34,0.25)'; c.lineWidth = 8;
          const nuvem = [[0.5, 0.5, 0.36], [0.26, 0.55, 0.22], [0.74, 0.55, 0.22], [0.36, 0.3, 0.2], [0.64, 0.3, 0.2], [0.5, 0.72, 0.2]];
          c.beginPath(); nuvem.forEach(([x, y, rr]) => { c.moveTo(x * w + rr * h, y * h); c.arc(x * w, y * h, rr * h, 0, 7); }); c.stroke(); c.fill();
          const tam = String(texto).length <= 3 ? 150 : 52;
          c.font = `900 ${tam}px Montserrat, Arial`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = cor;
          const linhas = quebrar(c, texto, w * 0.62);
          linhas.forEach((l, i) => c.fillText(l, w / 2, h * 0.52 + (i - (linhas.length - 1) / 2) * tam * 1.1));
        }, texto + cor);
      }
    });
  };
  K.balaoFala = function () {
    const g = new THREE.Group();
    const { s, tx } = spriteTexto(512, 300, 0.95);
    g.add(s);
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(boca, tempo, op = {}) {
        if (tempo < 0) return;
        const { texto = 'Oi!', cor = '#1e1f22', fundo = '#ffffff', lado = 1 } = op;
        g.visible = true;
        g.position.set(...boca);
        const k = pop(tempo);
        s.position.set(0.7 * lado, 0.55, 0);
        s.scale.set(s.userData.base[0] * k, s.userData.base[1] * k, 1);
        tx.desenhar((c, w, h) => {
          c.fillStyle = fundo; c.strokeStyle = '#1e1f22'; c.lineWidth = 10;
          const x0 = 14, y0 = 14, ww = w - 28, hh = h * 0.72;
          c.beginPath(); c.roundRect ? c.roundRect(x0, y0, ww, hh, 60) : c.rect(x0, y0, ww, hh);
          c.fill(); c.stroke();
          const bx = lado > 0 ? w * 0.22 : w * 0.78;
          c.beginPath(); c.moveTo(bx - 30, y0 + hh - 6); c.lineTo(lado > 0 ? 30 : w - 30, h - 10); c.lineTo(bx + 30, y0 + hh - 6); c.closePath(); c.fill(); c.stroke();
          c.fillStyle = fundo; c.fillRect(bx - 24, y0 + hh - 14, 48, 14);
          c.font = '900 56px Montserrat, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = cor;
          const linhas = quebrar(c, texto, ww - 70);
          linhas.forEach((l, i) => c.fillText(l, w / 2, y0 + hh / 2 + (i - (linhas.length - 1) / 2) * 62));
        }, texto + cor + fundo + lado);
      }
    });
  };

  K.nuvemRaiva = function (seed = 75) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const nuvem = new THREE.Group();
    g.add(nuvem);
    [[0, 0, 0, 0.32], [-0.3, -0.04, 0, 0.24], [0.3, -0.03, 0.02, 0.26], [-0.12, 0.16, 0, 0.22], [0.15, 0.14, -0.02, 0.22]].forEach(([x, y, z, rr]) => { const m = K.malha(new THREE.IcosahedronGeometry(rr, 1), K.mat(0x4a4f58, { roughness: 1 }), false); m.position.set(x, y, z); nuvem.add(m); });
    const raio = new THREE.Mesh(new THREE.ShapeGeometry((() => { const s = new THREE.Shape(); s.moveTo(0.02, 0); s.lineTo(0.12, 0); s.lineTo(0.05, -0.16); s.lineTo(0.13, -0.16); s.lineTo(-0.03, -0.42); s.lineTo(0.02, -0.22); s.lineTo(-0.06, -0.22); s.closePath(); return s; })()), new THREE.MeshBasicMaterial({ color: 0xffe066, side: THREE.DoubleSide }));
    raio.position.set(0.05, -0.2, 0.2);
    g.add(raio);
    const gotas = [];
    for (let i = 0; i < 10; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.1, 0.012), new THREE.MeshBasicMaterial({ color: 0x8fd0ff })); gotas.push({ m, x: (r() - 0.5) * 0.6, z: (r() - 0.5) * 0.3, f: r() }); g.add(m); }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(cabeca, t, op = {}) {
        const { forca = 1, alto = 0.75 } = op;
        if (forca <= 0.01) return;
        g.visible = true;
        g.position.set(cabeca[0], cabeca[1] + alto, cabeca[2]);
        g.scale.setScalar(forca);
        nuvem.position.y = Math.sin(t * 3) * 0.03;
        nuvem.rotation.z = Math.sin(t * 2.2) * 0.05;
        raio.visible = Math.sin(t * 7) > 0.6;
        gotas.forEach((p) => { const k = (t * 1.6 + p.f) % 1; p.m.position.set(p.x, -0.15 - k * 0.5, p.z); });
      }
    });
  };

  K.simbolo = function () {
    const g = new THREE.Group();
    const { s, tx } = spriteTexto(256, 256, 0.8);
    g.add(s);
    g.visible = false;
    K.scene.add(g);
    const CORES = { '?': '#f5c518', '!': '#e8352b', '$': '#2fb54a', '✓': '#2fb54a', '✗': '#e8352b', '❤': '#ff4d6d', '+1': '#1067f8' };
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, tempo, op = {}) {
        if (tempo < 0) return;
        const { tipo = '!', tam = 1 } = op, cor = op.cor || CORES[tipo] || '#1067f8';
        g.visible = true;
        g.position.set(...pos);
        const k = pop(tempo, 0.3) * tam;
        s.position.y = 0.2 * pop(tempo, 0.3) + Math.sin(tempo * 4) * 0.03;
        s.material.rotation = Math.sin(tempo * 5) * 0.08;
        s.scale.set(s.userData.base[0] * k, s.userData.base[1] * k, 1);
        tx.desenhar((c, w, h) => {
          c.font = `900 ${tipo.length > 1 ? 130 : 200}px Montserrat, Arial`; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.lineWidth = 22; c.strokeStyle = '#ffffff'; c.lineJoin = 'round'; c.strokeText(tipo, w / 2, h / 2 + 8);
          c.fillStyle = cor; c.fillText(tipo, w / 2, h / 2 + 8);
        }, tipo + cor);
        if (op.som !== false && tempo < 0.4) K.som(op.som || 'brilho', K.tc - tempo, 0.6);
      }
    });
  };

  K.contador = function () {
    const g = new THREE.Group();
    const { s, tx } = spriteTexto(768, 220, 0.5);
    g.add(s);
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, tempo, op = {}) {
        if (tempo < 0) return;
        const { de = 0, ate = 200, dur = 1.6, antes = '+', depois = ' clientes', cor = '#2fb54a', tam = 1 } = op;
        g.visible = true;
        g.position.set(...pos);
        const n = Math.round(K.lerp(de, ate, K.suave(K.clamp(tempo / dur))));
        const k = pop(tempo, 0.3) * tam * (1 + (tempo > dur && tempo < dur + 0.25 ? 0.12 * Math.sin(((tempo - dur) / 0.25) * PI) : 0));
        s.scale.set(s.userData.base[0] * k, s.userData.base[1] * k, 1);
        tx.desenhar((c, w, h) => {
          c.font = '900 130px Montserrat, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
          const txt = antes + n.toLocaleString('pt-BR') + depois;
          let f = 130; while (c.measureText(txt).width > w - 40 && f > 40) { f -= 6; c.font = `900 ${f}px Montserrat, Arial`; }
          c.lineWidth = 24; c.strokeStyle = '#ffffff'; c.strokeText(txt, w / 2, h / 2 + 6);
          c.fillStyle = cor; c.fillText(txt, w / 2, h / 2 + 6);
        }, n + cor + antes + depois);
        if (op.som !== false) for (let i = 0; i < 8; i++) K.som('clique', K.tc - tempo + (i / 8) * dur, 0.35);
        if (op.som !== false) K.som('ding', K.tc - tempo + dur, 0.7);
      }
    });
  };

  K.folhasVento = function (seed = 77, n = 70, opF = {}) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const papel = !!opF.papel;
    const geo = papel ? new THREE.PlaneGeometry(0.21, 0.28) : new THREE.CircleGeometry(0.12, 5).scale(1, 1.6, 1);
    const ps = [];
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geo, K.mat(papel ? 0xf6f7f9 : [0x6cb548, 0xd9a520, 0xc8642a, 0x4f9a3a][i % 4], { side: THREE.DoubleSide }));
      ps.push({ m, y: 0.2 + r() * 2.6, z: (r() - 0.5) * 4, f: r(), v: 0.8 + r() * 0.5, s: r() * 6 });
      g.add(m);
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(centro, t, op = {}) {
        const { rumo = 0, largura = 16, forca = 1 } = op;
        if (forca <= 0.01) return;
        g.visible = true;
        g.position.set(...centro);
        g.rotation.y = rumo;
        ps.forEach((p, i) => {
          p.m.visible = i / ps.length < forca;
          const k = (t * 0.22 * p.v + p.f) % 1;
          p.m.position.set((k - 0.5) * largura, p.y + Math.sin(t * 2 + p.s) * 0.4, p.z + Math.cos(t * 1.4 + p.s) * 0.3);
          p.m.rotation.set(t * 3 + p.s, t * 2.2 + p.s, t * 1.7);
        });
      }
    });
  };
})();
