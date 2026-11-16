// Efeitos de impacto do canal (pros ganchos do 1º segundo): explosão, poof, faíscas, raio, chuva de dinheiro,
// rachadura no chão, onda de choque, linhas de velocidade, bomba de desenho e dinamite. Fotos e uso:
// canal/plano-pecas-novas.md e referencias de cada função abaixo. Tudo é função do tempo (nada guarda estado), igual
// ao K.fogo e ao K.fumaca: criar no montar, chamar .em(...) no quadro. O que treme a câmera vai DEPOIS da câmera.
(function () {
  const K = window.K;
  const V = () => new THREE.Vector3();
  const geoBola = new THREE.IcosahedronGeometry(1, 1);
  const geoHaste = new THREE.CylinderGeometry(1, 1, 1, 6).translate(0, 0.5, 0);
  const CIMA = new THREE.Vector3(0, 1, 0), FRENTE = new THREE.Vector3(0, 0, 1);
  const cEscuro = new THREE.Color(0x4a1a10);

  // Direção aleatória (meio de cima, um pouco achatada)
  function direcao(r, cima = 0.6) {
    const a = r() * Math.PI * 2, y = cima + (1 - cima) * r() * (r() < 0.5 ? 1 : -0.4);
    const h = Math.sqrt(Math.max(0, 1 - y * y));
    return new THREE.Vector3(Math.cos(a) * h, y, Math.sin(a) * h).normalize();
  }
  function matFogo(cor) {
    return new THREE.MeshStandardMaterial({ color: cor, emissive: cor, emissiveIntensity: 1, roughness: 1, flatShading: true, transparent: true, depthWrite: false });
  }
  function matLuz(cor, op = {}) {
    return new THREE.MeshBasicMaterial(Object.assign({ color: cor, transparent: true, depthWrite: false }, op));
  }
  // Pedaço que voa com gravidade e para no chão (y local = chao)
  function balistico(p, tt, chao, gr = 9.8) {
    const tq = (p.v.y + Math.sqrt(p.v.y * p.v.y + 2 * gr * Math.max(0, p.y0 - chao))) / gr;
    const t = Math.min(tt, tq);
    return { x: p.x0 + p.v.x * t, y: Math.max(chao, p.y0 + p.v.y * t - 0.5 * gr * t * t), z: p.z0 + p.v.z * t, t, parou: tt >= tq };
  }

  // Onda de choque no chão: dois anéis claros que abrem e a poeira que corre pros lados. em(pos, tempo, op):
  // op = { raio (até onde vai, padrão 4), cor, dur (0,6), poeira (true), som (nome ou false; padrão false), ganho }
  K.ondaChoque = function (seed = 43) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const geoAnel = new THREE.RingGeometry(0.86, 1, 56).rotateX(-Math.PI / 2);
    const aneis = [0, 0.12].map((atraso) => {
      const m = new THREE.Mesh(geoAnel, matLuz(0xfff3d0, { side: THREE.DoubleSide }));
      m.renderOrder = 3;
      g.add(m);
      return { m, atraso };
    });
    const poeira = [];
    for (let i = 0; i < 14; i++) {
      const mat = K.mat([0xd8c8a8, 0xc9b898, 0xe6dccb][i % 3], { transparent: true, depthWrite: false, roughness: 1 });
      const m = K.malha(geoBola, mat, false);
      const a = (i / 14) * Math.PI * 2 + r() * 0.3;
      poeira.push({ m, mat, a, s: 0.25 + r() * 0.25, v: 0.7 + r() * 0.5 });
      g.add(m);
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, tempo, op = {}) {
        const { raio = 4, cor = 0xfff3d0, dur = 0.6, som = false, ganho = 0.8 } = op;
        if (tempo < 0 || tempo > dur * 3) return;
        g.visible = true;
        g.position.set(pos[0], pos[1] + 0.03, pos[2]);
        aneis.forEach(({ m, atraso }) => {
          const k = K.clamp((tempo - atraso) / dur);
          m.visible = tempo > atraso && k < 1;
          m.material.color.setHex(cor);
          m.scale.setScalar(0.2 + raio * (1 - Math.pow(1 - k, 2.2)));
          m.material.opacity = 0.85 * Math.pow(1 - k, 1.4);
        });
        poeira.forEach((p) => {
          p.m.visible = op.poeira !== false;
          const k = K.clamp(tempo / (dur * 3));
          const d = raio * 0.75 * p.v * (1 - Math.pow(1 - k, 3));
          p.m.position.set(Math.cos(p.a) * d, p.s * (0.6 + k), Math.sin(p.a) * d);
          p.m.scale.setScalar(p.s * (0.6 + k * 1.6));
          p.mat.opacity = 0.8 * Math.pow(1 - k, 1.5);
        });
        if (som) K.som(som, K.tc - tempo, ganho);
      }
    });
  };

  // Explosão de desenho: clarão, bola de fogo que vira fumaça preta, onda de choque no chão, destroços, faíscas, luz
  // laranja e a tremida da câmera, com o som 'estrondo'. em(pos, tempo, op) com tempo = segundos desde o estouro
  // (negativo = ainda não estourou). op = { escala (1 = do tamanho de um carro), forca (0 a 1: luz e tremida),
  // chao (y do chão; padrão o y de pos), som (nome ou false), ganho, tremer (false tira; chamar depois da câmera),
  // fumaca (false tira), cor: 'fogo' | 'azul' | 'verde' (explosão mágica/tóxica) }. Devolve o clarão (0 a 1)
  K.explosao = function (seed = 41) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const PALETAS = {
      fogo: [0xfff4b0, 0xffd23f, 0xff9a1f, 0xff5a1f, 0xe8352b],
      azul: [0xeaffff, 0x9fe8ff, 0x3fb8ff, 0x2f7fe0, 0x5a4fe0],
      verde: [0xf2ffd0, 0xc8ff5a, 0x7fe04f, 0x2fb54a, 0x1f8a4a]
    };
    const fogo = [];
    for (let i = 0; i < 18; i++) {
      const mat = matFogo(0xffffff);
      const m = new THREE.Mesh(geoBola, mat);
      m.renderOrder = 4;
      fogo.push({ m, mat, camada: i % 5, dir: direcao(r, 0.25), d: 0.35 + r() * 0.75, s: 0.45 + r() * 0.45, atraso: r() * 0.1, giro: r() * 6 });
      g.add(m);
    }
    const fumaca = [];
    for (let i = 0; i < 16; i++) {
      const mat = K.mat([0x2e2b2a, 0x46403c, 0x5c5550][i % 3], { transparent: true, depthWrite: false, roughness: 1 });
      const m = K.malha(geoBola, mat, false);
      fumaca.push({ m, mat, dir: direcao(r, 0.3), atraso: 0.18 + r() * 0.35, sobe: 1.6 + r() * 2.2, s: 0.55 + r() * 0.55, giro: r() * 6 });
      g.add(m);
    }
    const pedacos = [];
    for (let i = 0; i < 22; i++) {
      const quente = i % 5 === 0;
      const mat = quente ? matFogo(0xff8a1f) : K.mat([0x3a3a3a, 0x6b5a4a, 0x8a8f96, 0x2a2a2a][i % 4]);
      if (quente) { mat.transparent = false; mat.depthWrite = true; }
      const m = K.malha(new THREE.BoxGeometry(0.1 + r() * 0.16, 0.06 + r() * 0.08, 0.1 + r() * 0.14), mat, !quente);
      const a = r() * Math.PI * 2, h = 1.8 + r() * 4;
      pedacos.push({ m, mat, quente, x0: 0, y0: 0.3, z0: 0, v: new THREE.Vector3(Math.cos(a) * h, 3 + r() * 6, Math.sin(a) * h), giro: [r() * 14, r() * 14, r() * 14] });
      g.add(m);
    }
    const faiscas = [];
    const geoFa = new THREE.BoxGeometry(0.025, 0.025, 0.16);
    for (let i = 0; i < 26; i++) {
      const m = new THREE.Mesh(geoFa, matLuz(i % 2 ? 0xffe066 : 0xfff6c8));
      const d = direcao(r, 0.1).multiplyScalar(5 + r() * 6);
      faiscas.push({ m, v: d, vida: 0.5 + r() * 0.5 });
      g.add(m);
    }
    const clarao = K.halo(0xfff0b0, 1);
    g.add(clarao);
    const luz = new THREE.PointLight(0xffa040, 0, 22, 1.6);
    g.add(luz);
    const onda = K.ondaChoque(seed + 2);
    const cBase = new THREE.Color();
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, tempo, op = {}) {
        const { escala = 1, forca = 1, som = 'estrondo', ganho = 1, tremer = true, cor = 'fogo' } = op;
        if (tempo < 0 || tempo > 5) return 0;
        const paleta = PALETAS[cor] || PALETAS.fogo;
        const chao = op.chao ?? pos[1];
        const chaoL = (chao - pos[1]) / escala;
        g.visible = true;
        g.position.set(pos[0], pos[1], pos[2]);
        g.scale.setScalar(escala);
        // Bola de fogo: abre rápido, sobe e escurece até sumir
        fogo.forEach((p) => {
          const t = tempo - p.atraso;
          p.m.visible = t > 0 && t < 1.5;
          if (!p.m.visible) return;
          const e = 1 - Math.pow(1 - K.clamp(t / 0.3), 3);
          const morre = K.faixa(t, 0.45, 1.4);
          p.m.position.copy(p.dir).multiplyScalar(p.d * e * 1.5 * (p.camada === 0 ? 0.35 : 1)).add(V().set(0, 0.5 + t * 0.9, 0));
          p.m.scale.setScalar(p.s * (0.25 + e * 1.15) * (1 - 0.55 * morre) * (p.camada === 0 ? 0.7 : 1));
          p.m.rotation.set(p.giro + t, p.giro * 0.5, 0);
          cBase.setHex(paleta[p.camada]).lerp(cEscuro, morre * 0.8);
          p.mat.color.copy(cBase);
          p.mat.emissive.copy(cBase);
          p.mat.emissiveIntensity = 1.1 * (1 - morre);
          p.mat.opacity = 1 - K.faixa(t, 0.8, 1.45);
        });
        // Fumaça preta subindo depois do fogo
        fumaca.forEach((p) => {
          const t = tempo - p.atraso;
          p.m.visible = op.fumaca !== false && t > 0;
          if (!p.m.visible) return;
          const k = K.clamp(t / 4);
          p.m.position.copy(p.dir).multiplyScalar(0.7 + k * 1.4).add(V().set(0, 0.6 + p.sobe * (1 - Math.pow(1 - k, 2)), 0));
          p.m.scale.setScalar(p.s * (0.5 + k * 1.7));
          p.m.rotation.set(p.giro + t * 0.3, p.giro, 0);
          p.mat.opacity = 0.9 * K.clamp(t / 0.25) * Math.pow(1 - k, 1.3);
        });
        // Destroços voando e parando no chão
        pedacos.forEach((p) => {
          const b = balistico(p, tempo, chaoL + 0.03);
          p.m.position.set(b.x, b.y, b.z);
          p.m.rotation.set(p.giro[0] * b.t, p.giro[1] * b.t, p.giro[2] * b.t);
          if (p.quente) { p.mat.emissiveIntensity = 1.2 * (1 - K.faixa(tempo, 0.4, 2.5)); p.mat.color.setHex(0xff8a1f).lerp(cEscuro, K.faixa(tempo, 0.4, 2.5)); }
        });
        // Faíscas rápidas
        faiscas.forEach((p) => {
          const t = tempo, k = t / p.vida;
          p.m.visible = k < 1;
          if (!p.m.visible) return;
          const vel = V().copy(p.v).add(V().set(0, -9.8 * t, 0));
          p.m.position.set(p.v.x * t, 0.5 + p.v.y * t - 4.9 * t * t, p.v.z * t);
          p.m.quaternion.setFromUnitVectors(FRENTE, vel.normalize());
          p.m.scale.setScalar(1 - k * 0.6);
          p.m.material.opacity = 1 - k;
        });
        // Clarão e luz
        const flash = 1 - K.faixa(tempo, 0.04, 0.45);
        clarao.position.set(0, 0.7, 0);
        clarao.material.color.setHex(paleta[0]);
        clarao.scale.setScalar(2 + 7 * K.clamp(tempo / 0.12));
        clarao.material.opacity = 0.95 * flash * forca;
        clarao.visible = flash > 0.01;
        luz.color.setHex(paleta[2]);
        luz.position.set(0, 1, 0);
        luz.intensity = 60 * forca * Math.pow(1 - K.faixa(tempo, 0, 1.2), 2);
        // No chão: onda de choque
        if (pos[1] - chao < 2 * escala && op.onda !== false) onda.em([pos[0], chao, pos[2]], tempo, { raio: 4.5 * escala, cor: paleta[0] });
        if (som) K.som(som, K.tc - tempo, ganho);
        if (tremer) K.tremer(tempo, 1.6 * forca * Math.min(1.5, escala));
        return flash;
      }
    });
  };

  // Poof de desenho: nuvenzinha branca que estoura e as estrelinhas voando (algo aparece ou some do nada).
  // em(pos, tempo, op): op = { escala, cor (da nuvem), som (padrão 'whoosh'; false tira), ganho }
  K.poof = function (seed = 45) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const nuvem = [];
    for (let i = 0; i < 12; i++) {
      const mat = K.mat(0xffffff, { transparent: true, depthWrite: false, roughness: 1 });
      const m = K.malha(geoBola, mat, false);
      nuvem.push({ m, mat, dir: direcao(r, 0), s: 0.22 + r() * 0.18 });
      g.add(m);
    }
    const geoEstrela = new THREE.OctahedronGeometry(0.07, 0);
    const estrelas = [];
    for (let i = 0; i < 8; i++) {
      const m = new THREE.Mesh(geoEstrela, matLuz([0xffe066, 0xffffff, 0x9fe8ff][i % 3]));
      estrelas.push({ m, dir: direcao(r, 0.2), v: 1.6 + r() * 1.2, giro: 6 + r() * 8 });
      g.add(m);
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, tempo, op = {}) {
        const { escala = 1, cor = 0xffffff, som = 'whoosh', ganho = 0.8 } = op;
        if (tempo < 0 || tempo > 1) return;
        g.visible = true;
        g.position.set(...pos);
        g.scale.setScalar(escala);
        const e = 1 - Math.pow(1 - K.clamp(tempo / 0.25), 3);
        nuvem.forEach((p) => {
          p.mat.color.setHex(cor);
          p.m.position.copy(p.dir).multiplyScalar(0.15 + e * 0.45).add(V().set(0, tempo * 0.3, 0));
          p.m.scale.setScalar(p.s * (0.4 + e) * (1 - K.faixa(tempo, 0.35, 0.8) * 0.6));
          p.mat.opacity = 1 - K.faixa(tempo, 0.3, 0.8);
        });
        estrelas.forEach((p) => {
          const d = p.v * (1 - Math.pow(1 - K.clamp(tempo / 0.7), 2));
          p.m.position.copy(p.dir).multiplyScalar(0.2 + d);
          p.m.rotation.set(tempo * p.giro, tempo * p.giro * 0.7, 0);
          p.m.material.opacity = 1 - K.faixa(tempo, 0.5, 0.95);
        });
        if (som) K.som(som, K.tc - tempo, ganho);
      }
    });
  };

  // Faíscas saindo de um ponto sem parar (curto-circuito, metal raspando, solda, pavio). em(pos, t, op) com t = tempo
  // da cena: op = { forca (0 a 1: quantas), escala, dir ([x, y, z]: pra onde saem, padrão pra cima), abertura (0 a 1),
  // ritmo, brilho (true: o ponto aceso) }
  K.faiscas = function (seed = 47, n = 22) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const geo = new THREE.BoxGeometry(0.035, 0.035, 0.24);
    const ps = [];
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geo, matLuz(i % 3 ? 0xffe066 : 0xfff8e0));
      ps.push({ m, fase: r(), sorteio: [r() - 0.5, r() - 0.5, r() - 0.5], v: 2.2 + r() * 2.6, liga: r() });
      g.add(m);
    }
    const halo = K.halo(0xffd56a, 0.9);
    g.add(halo);
    g.visible = false;
    K.scene.add(g);
    const dirV = new THREE.Vector3();
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, t, op = {}) {
        const { forca = 1, escala = 1, dir = [0, 1, 0], abertura = 0.7, ritmo = 1.6 } = op;
        if (forca <= 0.01) return;
        g.visible = true;
        g.position.set(...pos);
        g.scale.setScalar(escala);
        dirV.set(...dir).normalize();
        ps.forEach((p) => {
          p.m.visible = p.liga < forca;
          if (!p.m.visible) return;
          const k = (t * ritmo + p.fase) % 1, tt = k * 0.55;
          const v = V().set(dirV.x + p.sorteio[0] * abertura * 2, dirV.y + p.sorteio[1] * abertura * 2, dirV.z + p.sorteio[2] * abertura * 2).normalize().multiplyScalar(p.v);
          p.m.position.set(v.x * tt, v.y * tt - 4.9 * tt * tt, v.z * tt);
          p.m.quaternion.setFromUnitVectors(FRENTE, v.add(V().set(0, -9.8 * tt, 0)).normalize());
          p.m.scale.setScalar(1 - k * 0.7);
          p.m.material.opacity = 1 - k;
        });
        halo.visible = op.brilho !== false;
        halo.material.opacity = 0.9 * forca * (0.7 + 0.3 * Math.sin(t * 41));
        halo.scale.setScalar(0.8 + 0.2 * Math.sin(t * 29));
      }
    });
  };

  // Raio caindo do céu num ponto: zigue-zague branco com brilho azul, piscando, clarão e luz no chão, som 'zap'.
  // em(alvo, tempo, op) com tempo desde a queda: op = { de ([x, y, z] de onde sai; padrão 14 acima do alvo), escala
  // (grossura), cor, dur (0,45), som, ganho, tremer }. Devolve o clarão (0 a 1)
  K.raio = function (seed = 49) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const N = 12;
    // Duas formas de zigue-zague (pisca trocando) e um galho em cada
    const formas = [0, 1].map(() => {
      const desvio = [];
      for (let i = 0; i <= N; i++) desvio.push(i === 0 || i === N ? [0, 0] : [(r() - 0.5) * 2, (r() - 0.5) * 2]);
      const galho = { de: 3 + Math.floor(r() * 4), n: 3, lado: [(r() - 0.5) * 2, (r() - 0.5) * 2] };
      const segs = [];
      for (let i = 0; i < N + galho.n; i++) {
        const nucleo = new THREE.Mesh(geoHaste, matLuz(0xffffff));
        const brilho = new THREE.Mesh(geoHaste, matLuz(0x9fd8ff, { opacity: 0.45, blending: THREE.AdditiveBlending }));
        nucleo.renderOrder = 6; brilho.renderOrder = 5;
        g.add(nucleo, brilho);
        segs.push({ nucleo, brilho });
      }
      return { desvio, galho, segs };
    });
    const halo = K.halo(0xcfeaff, 1);
    g.add(halo);
    const luz = new THREE.PointLight(0xbfe0ff, 0, 30, 1.5);
    g.add(luz);
    const vd = new THREE.Vector3(), lado1 = new THREE.Vector3(), lado2 = new THREE.Vector3();
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(alvo, tempo, op = {}) {
        const { escala = 1, cor = 0x9fd8ff, dur = 0.45, som = 'zap', ganho = 1, tremer = true } = op;
        const de = op.de || [alvo[0] + 1.2, alvo[1] + 14, alvo[2] - 1];
        if (tempo < 0 || tempo > dur + 0.4) return 0;
        g.visible = true;
        const a = new THREE.Vector3(...alvo), b = new THREE.Vector3(...de);
        const L = a.distanceTo(b);
        vd.copy(b).sub(a).normalize();
        lado1.crossVectors(vd, Math.abs(vd.y) > 0.9 ? FRENTE : CIMA).normalize();
        lado2.crossVectors(vd, lado1).normalize();
        const ativa = Math.floor(tempo * 18) % 2;
        const aceso = tempo < dur && Math.sin(tempo * 95) > -0.35;
        const ponto = (f, d) => V().copy(a).addScaledVector(vd, f * L).addScaledVector(lado1, d[0] * L * 0.045).addScaledVector(lado2, d[1] * L * 0.045);
        formas.forEach((F, fi) => {
          const mostra = aceso && fi === ativa;
          const pts = F.desvio.map((d, i) => ponto(1 - i / N, d));
          const gp = [pts[F.galho.de]];
          for (let k = 1; k <= F.galho.n; k++) {
            const base = gp[k - 1];
            gp.push(V().copy(base).addScaledVector(vd, -L * 0.05).addScaledVector(lado1, F.galho.lado[0] * L * 0.05).addScaledVector(lado2, F.galho.lado[1] * L * 0.03 * k));
          }
          F.segs.forEach((s, i) => {
            s.nucleo.visible = s.brilho.visible = mostra;
            if (!mostra) return;
            const noGalho = i >= N;
            const p0 = noGalho ? gp[i - N] : pts[i], p1 = noGalho ? gp[i - N + 1] : pts[i + 1];
            const grossura = (noGalho ? 0.5 : 1) * escala;
            K.ligarPontos(s.nucleo, p0.toArray(), p1.toArray(), 0.045 * grossura);
            K.ligarPontos(s.brilho, p0.toArray(), p1.toArray(), 0.16 * grossura);
            s.brilho.material.color.setHex(cor);
          });
        });
        const flash = tempo < dur ? (aceso ? 1 : 0.5) : 1 - K.clamp((tempo - dur) / 0.4);
        halo.position.copy(a).add(V().set(0, 0.3, 0));
        halo.scale.setScalar(3.5 * escala * (0.8 + 0.2 * flash));
        halo.material.opacity = 0.95 * flash;
        luz.position.copy(a).add(V().set(0, 1.2, 0));
        luz.intensity = 70 * flash;
        if (som) K.som(som, K.tc - tempo, ganho);
        if (tremer) K.tremer(tempo, 0.8);
        return flash;
      }
    });
  };

  // Chuva de dinheiro: notas verdes de R$ que caem balançando e moedas douradas girando, e tudo fica no chão.
  // em(centro, tempo, op) com tempo desde que começou: op = { raio (3), altura (7), dur (tempo em que vão caindo: 2,5),
  // forca (0 a 1: quanto dinheiro), som (padrão 'brilho'), ganho }
  K.chuvaDinheiro = function (seed = 51, n = 110) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const cv = document.createElement('canvas');
    cv.width = 256; cv.height = 120;
    const c2 = cv.getContext('2d');
    c2.fillStyle = '#3fae5a'; c2.fillRect(0, 0, 256, 120);
    c2.strokeStyle = '#d9f5c8'; c2.lineWidth = 8; c2.strokeRect(8, 8, 240, 104);
    c2.fillStyle = '#2a8a44'; c2.beginPath(); c2.arc(128, 60, 34, 0, Math.PI * 2); c2.fill();
    c2.fillStyle = '#eaffdf'; c2.font = '900 44px Montserrat, Arial'; c2.textAlign = 'center'; c2.textBaseline = 'middle';
    c2.fillText('R$', 128, 62);
    c2.font = '900 26px Montserrat, Arial'; c2.fillText('100', 40, 30); c2.fillText('100', 216, 92);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    const matNota = K.mat(0xffffff, { map: tex, side: THREE.DoubleSide, roughness: 0.8 });
    const geoNota = new THREE.PlaneGeometry(0.56, 0.27);
    const matMoeda = K.mat(0xf5c518, { metalness: 0.6, roughness: 0.3, emissive: 0x6a4a00, emissiveIntensity: 0.3 });
    const geoMoeda = new THREE.CylinderGeometry(0.11, 0.11, 0.03, 18);
    const ps = [];
    for (let i = 0; i < n; i++) {
      const moeda = i % 4 === 0;
      const m = K.malha(moeda ? geoMoeda : geoNota, moeda ? matMoeda : matNota, true);
      m.rotation.order = 'YXZ';
      const a = r() * Math.PI * 2, d = Math.sqrt(r());
      ps.push({ m, moeda, ax: Math.cos(a) * d, az: Math.sin(a) * d, inicio: r(), vel: moeda ? 4.5 + r() * 2 : 1.6 + r() * 0.9, fase: r() * 6, yaw: r() * 6, giro: 5 + r() * 6, liga: r(), pilha: r() * 0.03 });
      g.add(m);
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(centro, tempo, op = {}) {
        const { raio = 3, altura = 7, dur = 2.5, forca = 1, som = 'brilho', ganho = 0.8 } = op;
        if (tempo < 0) return;
        g.visible = true;
        g.position.set(...centro);
        ps.forEach((p) => {
          const t = tempo - p.inicio * dur;
          p.m.visible = p.liga < forca && t > 0;
          if (!p.m.visible) return;
          const y = altura - p.vel * t;
          const x = p.ax * raio, z = p.az * raio;
          if (y <= 0.012 + p.pilha) {
            p.m.position.set(x, 0.012 + p.pilha, z);
            p.m.rotation.set(p.moeda ? 0 : -Math.PI / 2, p.yaw, 0);
          } else if (p.moeda) {
            p.m.position.set(x, y, z);
            p.m.rotation.set(t * p.giro, p.yaw, Math.PI / 2);
          } else {
            p.m.position.set(x + Math.sin(t * 3 + p.fase) * 0.35, y, z + Math.cos(t * 2.3 + p.fase) * 0.2);
            p.m.rotation.set(-Math.PI / 2 + Math.sin(t * 4 + p.fase) * 0.9, p.yaw + t * 1.5, Math.sin(t * 3 + p.fase) * 0.5);
          }
        });
        if (som) K.som(som, K.tc - tempo, ganho);
      }
    });
  };

  // Chão rachando: rachaduras escuras que correm do ponto pra fora, o buraco no meio e a poeira subindo, som 'racha'
  // (fica rachado depois). em(pos, tempo, op) com tempo desde o impacto: op = { raio (2,5), cor, som, ganho, poeira }
  K.rachadura = function (seed = 53) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const gr = new THREE.Group();
    g.add(gr);
    const geoSeg = new THREE.BoxGeometry(1, 0.012, 1).translate(0.5, 0, 0);
    const mat = new THREE.MeshBasicMaterial({ color: 0x2a2420, polygonOffset: true, polygonOffsetFactor: -2 });
    const segs = [];
    const RAIOS = 9, PASSOS = 5;
    for (let i = 0; i < RAIOS; i++) {
      let ang = (i / RAIOS) * Math.PI * 2 + r() * 0.5, x = 0, z = 0;
      const compRaio = 0.6 + r() * 0.5;
      for (let k = 0; k < PASSOS; k++) {
        ang += (r() - 0.5) * 0.9;
        const len = (compRaio / PASSOS) * (0.7 + r() * 0.6);
        const m = new THREE.Mesh(geoSeg, mat);
        segs.push({ m, x, z, ang, len, w: 0.07 * (1 - k / PASSOS) + 0.015, ordem: k / PASSOS });
        gr.add(m);
        // Galhinho
        if (k === 2 && r() < 0.7) {
          const gm = new THREE.Mesh(geoSeg, mat);
          segs.push({ m: gm, x: x + Math.cos(ang) * len, z: z - Math.sin(ang) * len, ang: ang + (r() < 0.5 ? 0.8 : -0.8), len: len * 0.9, w: 0.025, ordem: 0.6 });
          gr.add(gm);
        }
        x += Math.cos(ang) * len; z -= Math.sin(ang) * len;
      }
    }
    const buraco = new THREE.Mesh(new THREE.CircleGeometry(1, 10).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x1e1a17, polygonOffset: true, polygonOffsetFactor: -2 }));
    gr.add(buraco);
    const pedras = [];
    for (let i = 0; i < 10; i++) {
      const m = K.malha(new THREE.DodecahedronGeometry(0.06 + r() * 0.06, 0), K.mat([0x8a8070, 0x6b6358][i % 2]));
      const a = r() * Math.PI * 2;
      pedras.push({ m, x0: 0, y0: 0.05, z0: 0, v: new THREE.Vector3(Math.cos(a) * (0.6 + r()), 1.8 + r() * 1.8, Math.sin(a) * (0.6 + r())), giro: r() * 10 });
      g.add(m);
    }
    const poeira = [];
    for (let i = 0; i < 9; i++) {
      const pm = K.mat(0xcbb89a, { transparent: true, depthWrite: false, roughness: 1 });
      const m = K.malha(geoBola, pm, false);
      const a = (i / 9) * Math.PI * 2;
      poeira.push({ m, mat: pm, a, s: 0.2 + r() * 0.2 });
      g.add(m);
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, tempo, op = {}) {
        const { raio = 2.5, cor = 0x2a2420, som = 'racha', ganho = 1 } = op;
        if (tempo < 0) return;
        g.visible = true;
        g.position.set(pos[0], pos[1] + 0.005, pos[2]);
        gr.scale.set(raio, 1, raio);
        mat.color.setHex(cor);
        const k = K.clamp(tempo / 0.35);
        segs.forEach((s) => {
          const cresce = K.clamp((k - s.ordem * 0.85) / 0.25);
          s.m.visible = cresce > 0;
          s.m.position.set(s.x, 0, s.z);
          s.m.rotation.y = s.ang;
          s.m.scale.set(s.len * cresce, 1, s.w / raio * 2.2);
        });
        buraco.scale.setScalar(0.16 * K.saiVolta(K.clamp(tempo / 0.2)));
        pedras.forEach((p) => {
          const b = balistico(p, tempo, 0.04);
          p.m.position.set(b.x, b.y, b.z);
          p.m.rotation.set(p.giro * b.t, p.giro * b.t * 0.6, 0);
        });
        const kp = K.clamp(tempo / 1.6);
        poeira.forEach((p) => {
          p.m.visible = op.poeira !== false && kp < 1;
          const d = raio * (0.15 + kp * 0.35);
          p.m.position.set(Math.cos(p.a) * d, p.s + kp * 0.5, Math.sin(p.a) * d);
          p.m.scale.setScalar(p.s * (0.6 + kp) * 2);
          p.mat.opacity = 0.75 * Math.pow(1 - kp, 1.4);
        });
        if (som) K.som(som, K.tc - tempo, ganho);
      }
    });
  };

  // Linhas de velocidade: riscos brancos passando em volta de algo que corre ou voa (de desenho animado).
  // em(pos, t, op) com t = tempo da cena: op = { rumo (pra onde vai, em radianos no chão; 0 = +x, como os bichos),
  // subida (inclinação em radianos), raio (0,9), comp (1,6), forca (0 a 1), cor, ritmo }
  K.velocidade = function (seed = 55, n = 16) {
    const r = K.rand(seed);
    const g = new THREE.Group();
    const giro = new THREE.Group();
    g.add(giro);
    const geo = new THREE.BoxGeometry(1, 0.05, 0.05).translate(-0.5, 0, 0);
    const ps = [];
    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(geo, matLuz(0xffffff));
      const a = r() * Math.PI * 2;
      ps.push({ m, cy: Math.sin(a), cz: Math.cos(a), rr: 0.55 + r() * 0.5, fase: r(), len: 0.35 + r() * 0.5 });
      giro.add(m);
    }
    g.visible = false;
    K.scene.add(g);
    return K.componente({
      g,
      esconder() { g.visible = false; },
      em(pos, t, op = {}) {
        const { rumo = 0, subida = 0, raio = 0.9, comp = 1.6, forca = 1, cor = 0xffffff, ritmo = 2.4 } = op;
        if (forca <= 0.01) return;
        g.visible = true;
        g.position.set(...pos);
        g.rotation.set(0, rumo, subida);
        ps.forEach((p) => {
          const k = (t * ritmo + p.fase) % 1;
          p.m.material.color.setHex(cor);
          p.m.position.set(comp * (0.5 - k * 1.6), p.cy * p.rr * raio, p.cz * p.rr * raio);
          p.m.scale.set(comp * p.len, 1, 1);
          p.m.material.opacity = forca * Math.min(1, 1.6 * Math.sin(Math.PI * k));
        });
      }
    });
  };

  // Pavio aceso (da bomba e da dinamite): segmentos que somem do fim pro começo e a faísca na ponta
  function pavio(pai, pontos, raio = 0.025) {
    const mat = K.mat(0xd9c49a, { roughness: 1 });
    const queimado = K.mat(0x2a2420, { roughness: 1 });
    const curva = new THREE.CatmullRomCurve3(pontos.map((p) => new THREE.Vector3(...p)));
    const N = 14, pts = curva.getPoints(N);
    const segs = [];
    for (let i = 0; i < N; i++) {
      const m = K.malha(geoHaste, mat, false);
      K.ligarPontos(m, pts[i].toArray(), pts[i + 1].toArray(), raio);
      pai.add(m);
      segs.push(m);
    }
    const ponta = new THREE.Mesh(new THREE.SphereGeometry(raio * 1.4, 8, 6), queimado);
    pai.add(ponta);
    return {
      segs, pts,
      // queimou: 0 (inteiro) a 1 (acabou). Devolve a ponta acesa no espaço do pai
      em(queimou) {
        const resta = N * (1 - K.clamp(queimou));
        segs.forEach((m, i) => {
          m.visible = i < Math.ceil(resta);
          if (i === Math.ceil(resta) - 1) {
            const f = resta - i;
            K.ligarPontos(m, pts[i].toArray(), pts[i].clone().lerp(pts[i + 1], f).toArray(), raio);
          } else if (m.visible) K.ligarPontos(m, pts[i].toArray(), pts[i + 1].toArray(), raio);
        });
        const i = Math.max(0, Math.min(N - 1, Math.floor(resta)));
        const p = pts[i].clone().lerp(pts[Math.min(N, i + 1)], resta - i);
        ponta.position.copy(p);
        ponta.visible = queimou < 1;
        return p;
      }
    };
  }
  function comPavio(g, pv, nome) {
    const fa = K.faiscas(61 + nome.length, 14);
    const vp = new THREE.Vector3();
    return {
      g, pavio: pv,
      // pos: onde fica (base no chão), t: tempo da cena, op = { queimou (0 a 1), escala, treme (0 a 1: quase
      // estourando), giro (graus), aceso (false apaga a faísca) }. Devolve a ponta do pavio no mundo
      em(pos, t, op = {}) {
        const { queimou = 0, escala = 1, treme = 0, giro = 0 } = op;
        g.visible = true;
        g.position.set(pos[0] + Math.sin(t * 61) * 0.03 * treme * escala, pos[1], pos[2] + Math.cos(t * 47) * 0.02 * treme * escala);
        g.rotation.set(Math.sin(t * 37) * 0.04 * treme, (giro * Math.PI) / 180, Math.sin(t * 53) * 0.05 * treme);
        g.scale.setScalar(escala * (1 + 0.06 * treme * Math.sin(t * 30)));
        const p = pv.em(queimou);
        g.updateMatrixWorld(true);
        vp.copy(p).applyMatrix4(g.matrixWorld);
        if (op.aceso !== false && queimou < 1) fa.em(vp.toArray(), t, { escala: 0.55 * escala, abertura: 0.9, forca: 1 });
        return vp.toArray();
      }
    };
  }

  // Bomba de desenho: bola preta brilhante com tampa e pavio aceso soltando faísca. Base no chão (y = 0), ~1,2 de
  // altura com o pavio. b.em(pos, t, { queimou, escala, treme, giro, aceso }) a cada quadro (some se não chamar);
  // pra estourar: parar de chamar e chamar a K.explosao no mesmo lugar
  K.bomba = function (op = {}) {
    const g = new THREE.Group();
    const corpo = K.malha(new THREE.SphereGeometry(0.5, 32, 22), K.mat(op.cor ?? 0x24262b, { roughness: 0.3, metalness: 0.25, flatShading: false }));
    corpo.position.y = 0.5;
    const reflexo = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 8), matLuz(0xffffff, { opacity: 0.55 }));
    reflexo.scale.set(1, 1.6, 0.4);
    reflexo.position.set(-0.22, 0.78, 0.38);
    reflexo.rotation.z = 0.6;
    const tampa = K.malha(new THREE.CylinderGeometry(0.15, 0.17, 0.16, 18), K.mat(0x6b6f78, { metalness: 0.5, roughness: 0.4 }));
    tampa.position.set(0.12, 0.98, 0);
    tampa.rotation.z = -0.3;
    g.add(corpo, reflexo, tampa);
    const pv = pavio(g, [[0.16, 1.05, 0], [0.24, 1.2, 0], [0.38, 1.26, 0.02], [0.46, 1.18, 0.04], [0.5, 1.3, 0.05]], 0.028);
    g.visible = false;
    K.scene.add(g);
    K.nomear('bomba', g);
    const b = comPavio(g, pv, 'bomba');
    K.componente({ esconder() { g.visible = false; } });
    return b;
  };

  // Dinamite: três bananas vermelhas amarradas com fita preta, etiqueta TNT e pavio aceso. Base no chão, ~1 de
  // altura. d.em(pos, t, { queimou, escala, treme, giro, aceso }) igual à K.bomba
  K.dinamite = function () {
    const g = new THREE.Group();
    const vermelho = K.mat(0xd8352b, { roughness: 0.6 });
    [[-0.1, 0], [0.1, 0], [0, -0.16]].forEach(([x, z]) => {
      const c = K.malha(new THREE.CylinderGeometry(0.1, 0.1, 0.75, 18), vermelho);
      c.position.set(x, 0.375, z);
      const topo = K.malha(new THREE.CylinderGeometry(0.08, 0.1, 0.02, 18), K.mat(0xe9d9b0));
      topo.position.set(x, 0.76, z);
      g.add(c, topo);
    });
    [0.18, 0.56].forEach((y) => {
      const fita = K.malha(new THREE.CylinderGeometry(0.235, 0.235, 0.07, 24), K.mat(0x1e1f22, { roughness: 0.5 }));
      fita.position.set(0, y, -0.06);
      fita.scale.z = 0.85;
      g.add(fita);
    });
    const etq = K.placa('TNT', { larg: 0.3, alt: 0.14, fundo: '#f5e6b0', cor: '#1e1f22' });
    if (etq) { etq.position.set(0, 0.38, 0.108); g.add(etq); }
    const pv = pavio(g, [[0, 0.77, 0], [0.02, 0.9, 0.02], [0.1, 0.98, 0.03], [0.18, 0.95, 0.04], [0.22, 1.05, 0.05]], 0.022);
    g.visible = false;
    K.scene.add(g);
    K.nomear('dinamite', g);
    const d = comPavio(g, pv, 'dinamite');
    K.componente({ esconder() { g.visible = false; } });
    return d;
  };
})();
