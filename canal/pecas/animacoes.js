// Animações novas pra todo personagem (o do canal, os K.personagem e os figurantes). Viram reações novas do
// menino.reagir(nome, t) (t = segundos desde que começou; chamar depois do colocar/andar, em todo quadro) e também
// funções do boneco (menino.digitar(t)...):
//   'sentado' (b.sentar(k, assento)) · 'digitando' · 'celular' (falando no telefone) · 'comemorando' (pulinhos) ·
//   'cai_sentado' · 'bate_mesa' · 'coca_cabeca' · 'mao_na_testa' · 'nao' (balança a cabeça) · 'sim' (concorda) ·
//   'dancando' · 'dormindo' (olho fechado e Zzz) · 'correndo_assustado' (com o vel no b.correrAssustado) ·
//   'carregando' (caixa nos braços: b.carregar() devolve o ponto entre as mãos) · 'olha_relogio' · 'chorando' ·
//   'desmaia' · 'aplaudindo' · 'ombros' (encolhe os ombros: "sei lá")
// Sentado: a cadeira fica atrás dele (o assento na altura op.assento, padrão 0,48). Em pé de novo: só não chamar.
(function () {
  const K = window.K;
  const PI = Math.PI;
  const ORIG = K.boneco;
  const texZ = (() => {
    let t = null;
    return () => {
      if (t) return t;
      const cv = document.createElement('canvas'); cv.width = cv.height = 64;
      const c = cv.getContext('2d'); c.font = '900 54px Montserrat, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.lineWidth = 8; c.strokeStyle = '#ffffff'; c.strokeText('Z', 32, 34); c.fillStyle = '#3a6fd8'; c.fillText('Z', 32, 34);
      t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
    };
  })();

  K.boneco = function (op = {}) {
    const b = ORIG(op);
    const { corpo, cabeca, bracos, maos } = b;
    const olhos = cabeca.children.find((c) => c.isGroup && Math.abs(c.position.y - 0.03) < 1e-6 && c.children.length >= 2);
    const escY = () => b.g.scale.y || 1;
    // Peças que só aparecem em algumas animações (somem no reset de todo quadro)
    const props = [];
    const prop = (obj) => { obj.visible = false; props.push(obj); return obj; };
    let fone = null, zzz = null, lagrimas = null;
    const reset = b.reset;
    b.reset = function (t) { reset(t); props.forEach((p) => { p.visible = false; }); corpo.position.x = 0; };

    b.sentar = function (k = 1, assento = 0.48) {
      const x = K.clamp(k);
      corpo.position.y += (assento / escY() - 0.6) * x;
      b.pernasEm(-1.5 * x, -1.45 * x);
      corpo.rotation.x += -0.05 * x;
    };
    b.digitar = function (t) {
      const a = Math.sin(t * 24) * 0.12, d = Math.sin(t * 24 + 2) * 0.12;
      b.pose({ x: -1.0, z: -0.12, c: -0.95 + a }, { x: -1.0, z: -0.12, c: -0.95 + d });
      cabeca.rotation.x = 0.16 + Math.sin(t * 1.3) * 0.03;
    };
    b.celular = function (t, falando = true) {
      if (!fone) {
        fone = prop(new THREE.Group());
        const m = K.malha(new THREE.BoxGeometry(0.07, 0.15, 0.015), K.mat(0x1e1f22));
        const tela = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.12), new THREE.MeshBasicMaterial({ color: 0x6fb8ff }));
        tela.position.z = -0.009; tela.rotation.y = PI;
        fone.add(m, tela);
        fone.position.set(0.02, 0.0, 0.04);
        fone.rotation.set(0.3, -1.2, 0);
        maos[1].add(fone);
      }
      fone.visible = true;
      b.pose({ z: 0.12 }, { x: -0.55, z: -0.15, c: -2.55 });
      cabeca.rotation.z = -0.12;
      if (falando) b.falar(t);
    };
    b.comemorarPulando = function (t) {
      const x = (t * 1.7) % 1;
      b.pular(x, 0.35);
      const s = Math.sin(t * 1.7 * PI * 2);
      b.pose({ z: 2.5 + s * 0.2, c: -0.6 }, { z: 2.5 - s * 0.2, c: -0.6 });
      b.humor('feliz');
    };
    b.caiSentado = function (x) {
      const k = K.quica(K.clamp(x));
      corpo.position.y -= 0.42 * k;
      corpo.rotation.x = -0.25 * k;
      b.pernasEm(-1.45 * k, -1.3 * k);
      b.pose({ x: 0.3 * k, z: 0.6 + 0.3 * k }, { x: 0.3 * k, z: 0.6 + 0.3 * k });
      b.humor(x < 0.6 ? 'assustado' : 'triste');
    };
    // Devolve o tempo da batida dentro do ciclo (impacto quando fase ≈ 0.7: K.som('baque', ...) na cena)
    b.bateMesa = function (t) {
      const f = (t * 1.8) % 1;
      const ang = f < 0.6 ? K.lerp(-0.9, -2.3, K.suave(f / 0.6)) : K.lerp(-2.3, -0.75, K.clamp((f - 0.6) / 0.1));
      b.pose({ x: 0.1, z: 0.6, c: -1.5 }, { x: ang, z: 0.15, c: -0.3 });
      corpo.rotation.x = f > 0.65 && f < 0.85 ? 0.12 : 0.04;
      b.humor('bravo');
      return f;
    };
    b.cocaCabeca = function (t) {
      b.pose({ z: 0.12 }, { x: -2.3, z: 0.75, c: -1.6 + Math.sin(t * 22) * 0.18 });
      cabeca.rotation.z = 0.15;
      b.humor('surpreso');
    };
    b.maoNaTesta = function (t) {
      b.pose({ z: 0.12 }, { x: -1.35, z: -0.25, c: -2.35 });
      cabeca.rotation.x = 0.28 + Math.sin(t * 2) * 0.03;
      b.humor('triste');
    };
    b.nao = function (t) { cabeca.rotation.y = Math.sin(t * 11) * 0.42 * Math.max(0.3, 1 - t * 0.4); };
    b.sim = function (t) { cabeca.rotation.x = 0.05 + Math.sin(t * 9) * 0.22 * Math.max(0.3, 1 - t * 0.4); };
    b.dancar = function (t) {
      const f = t * 7;
      corpo.rotation.z = Math.sin(f) * 0.12;
      corpo.position.y = Math.abs(Math.sin(f)) * 0.06;
      const cima = Math.sin(f / 2) > 0;
      b.pose(cima ? { z: 2.6, c: -0.2 } : { x: -0.4, z: 0.3, c: -1.4 }, cima ? { x: -0.4, z: 0.3, c: -1.4 } : { z: 2.6, c: -0.2 });
      b.pernasEm(Math.sin(f) * 0.3, -Math.sin(f) * 0.3);
      cabeca.rotation.z = -Math.sin(f) * 0.12;
      b.humor('feliz');
    };
    b.dormir = function (t) {
      if (!zzz) {
        zzz = prop(new THREE.Group());
        for (let i = 0; i < 3; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texZ(), transparent: true, depthWrite: false })); s.scale.setScalar(0.18); zzz.add(s); }
        zzz.position.set(0.18, 0.28, 0);
        cabeca.add(zzz);
      }
      zzz.visible = true;
      zzz.children.forEach((s, i) => { const k = (t * 0.6 + i / 3) % 1; s.position.set(0.1 * k + Math.sin(k * 6) * 0.04, 0.45 * k, 0); s.material.opacity = Math.sin(PI * k); s.scale.setScalar(0.1 + 0.14 * k); });
      cabeca.rotation.z = 0.35; cabeca.rotation.x = 0.2;
      if (olhos) olhos.scale.y = 0.1;
      corpo.rotation.x = 0.06 + Math.sin(t * 1.6) * 0.02;
      b.pose({ z: 0.06 }, { z: 0.06 });
    };
    b.correrAssustado = function (t, vel = 1.2) {
      b.correr(t, vel);
      b.pose({ x: -0.3, z: 2.2 + Math.sin(t * 25) * 0.4, c: -0.4 }, { x: -0.3, z: 2.2 - Math.sin(t * 25) * 0.4, c: -0.4 });
      b.humor('assustado');
      b.suar(t);
    };
    // Carregando algo nos braços (uma caixa): devolve o ponto entre as mãos, no mundo
    b.carregar = function () {
      b.pose({ x: -0.95, z: -0.32, c: -0.55 }, { x: -0.95, z: -0.32, c: -0.55 });
      corpo.rotation.x = -0.06;
      const a = b.mao(0), c = b.mao(1);
      return [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2 + 0.08, (a[2] + c[2]) / 2];
    };
    b.olhaRelogio = function (t) {
      b.pose({ x: -1.2, z: -0.5, c: -1.3 }, { x: -0.9, z: -0.3, c: -1.2 });
      cabeca.rotation.x = 0.3; cabeca.rotation.y = 0.25;
      if (t > 0.6) b.humor('surpreso');
    };
    b.chorar = function (t) {
      if (!lagrimas) {
        lagrimas = prop(new THREE.Group());
        const geo = new THREE.SphereGeometry(0.022, 8, 6).scale(1, 1.5, 1);
        for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x8fd0ff, roughness: 0.1, transparent: true })); m.userData.lado = i % 2 ? 1 : -1; m.userData.fase = i < 2 ? 0 : 0.5; lagrimas.add(m); }
        cabeca.add(lagrimas);
      }
      lagrimas.visible = true;
      lagrimas.children.forEach((m) => { const k = (t * 1.4 + m.userData.fase) % 1; m.position.set(m.userData.lado * (0.08 + 0.02 * k), 0.0 - 0.25 * k, 0.19 - 0.04 * k); m.material.opacity = 1 - k * 0.6; });
      b.humor('triste');
      cabeca.rotation.x = 0.15;
      corpo.position.y -= Math.abs(Math.sin(t * 9)) * 0.015;
      b.pose({ x: -1.2, z: -0.1, c: -2.2 }, { x: -1.2, z: -0.1, c: -2.2 });
    };
    b.desmaia = function (x) {
      const k = K.quica(K.clamp(x));
      corpo.rotation.z = 1.45 * k;
      corpo.position.x = -0.55 * k;
      corpo.position.y -= 0.05 * k;
      b.pose({ z: 0.4 + 0.6 * k }, { z: 0.4 + 0.6 * k });
      if (olhos) olhos.scale.y = x > 0.3 ? 0.1 : 1;
      b.humor('surpreso');
    };
    b.aplaudir = function (t) {
      const a = Math.abs(Math.sin(t * 9)) * 0.22;
      b.pose({ x: -1.15, z: -0.5 + a, c: -0.7 }, { x: -1.15, z: -0.5 + a, c: -0.7 });
      b.humor('feliz');
      corpo.position.y += Math.abs(Math.sin(t * 9)) * 0.01;
    };
    b.ombros = function (t) {
      const k = K.pulso(K.clamp(t / 0.8)) * 0.6 + 0.4;
      b.pose({ x: -0.2, z: 0.7 * k, c: -1.5 * k }, { x: -0.2, z: 0.7 * k, c: -1.5 * k });
      cabeca.rotation.z = 0.18 * k;
      corpo.position.y += 0.03 * k;
      b.humor('surpreso');
    };

    const NOVAS = {
      sentado: () => b.sentar(1), digitando: (t) => { b.digitar(t); }, celular: (t) => b.celular(t), comemorando: (t) => b.comemorarPulando(t),
      cai_sentado: (t) => b.caiSentado(t / 0.6), bate_mesa: (t) => b.bateMesa(t), coca_cabeca: (t) => b.cocaCabeca(t), mao_na_testa: (t) => b.maoNaTesta(t),
      nao: (t) => { b.humor('bravo'); b.nao(t); }, sim: (t) => { b.humor('feliz'); b.sim(t); }, dancando: (t) => b.dancar(t), dormindo: (t) => b.dormir(t),
      correndo_assustado: (t) => b.correrAssustado(t), carregando: () => b.carregar(), olha_relogio: (t) => b.olhaRelogio(t), chorando: (t) => b.chorar(t),
      desmaia: (t) => b.desmaia(t / 0.7), aplaudindo: (t) => b.aplaudir(t), ombros: (t) => b.ombros(t)
    };
    const reagir = b.reagir;
    b.reagir = function (tipo, t = 0) { if (NOVAS[tipo]) return NOVAS[tipo](t); return reagir(tipo, t); };
    b.REACOES_NOVAS = Object.keys(NOVAS);
    return b;
  };
  K.REACOES_NOVAS = ['sentado', 'digitando', 'celular', 'comemorando', 'cai_sentado', 'bate_mesa', 'coca_cabeca', 'mao_na_testa', 'nao', 'sim', 'dancando', 'dormindo', 'correndo_assustado', 'carregando', 'olha_relogio', 'chorando', 'desmaia', 'aplaudindo', 'ombros'];
})();
