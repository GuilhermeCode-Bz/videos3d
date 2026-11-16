// Câmeras prontas do canal pra filmar o personagem andando (feitas pra rua_predios, servem em qualquer cenário).
// alvo = um personagem (K.boneco) ou um ponto [x, y, z]. Chamar no plano, no lugar do K.filmar (depois de colocar o
// personagem). Todas põem a sombra do sol em volta do alvo (K.focoSombra) e devolvem { pos, alvo } da câmera.
//   K.seguir(menino, { lado: 'tras' })   anda junto: atrás ('tras'), na frente vindo pra câmera ('frente'), do lado
//                                        ('direita' / 'esquerda', o travelling) ou em graus (0 = atrás, 90 = direita)
//   K.drone(menino, B.p)                 desce do alto da cidade até o personagem, girando
//   K.heroi(menino, B.p)                 de baixo pra cima, com os prédios gigantes atrás (bom pra gancho)
//   K.ombro(menino, ponto, B.p)          por cima do ombro, olhando pra onde ele olha (a placa da loja, a tela)
(function () {
  const K = window.K;
  const v = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const LADOS = { tras: 0, atras: 0, frente: 180, direita: 90, esquerda: -90 };

  function info(alvo) {
    if (alvo && alvo.g && alvo.g.isObject3D) { alvo.g.updateMatrixWorld(true); return { p: alvo.g.getWorldPosition(v()), rumo: alvo.g.rotation.y }; }
    if (Array.isArray(alvo)) return { p: v(...alvo), rumo: 0 };
    if (alvo && alvo.isObject3D) return { p: alvo.getWorldPosition(v()), rumo: alvo.rotation.y };
    throw new Error('câmera do canal: o alvo tem que ser um personagem (K.boneco) ou um ponto [x, y, z]');
  }
  const frente = (rumo) => v(Math.sin(rumo), 0, Math.cos(rumo));
  function fov(f) { if (f && K.camera.fov !== f) { K.camera.fov = f; K.camera.updateProjectionMatrix(); } }
  // Se a câmera cair dentro de um prédio (K.obstaculos), ela vem chegando perto do alvo até sair
  function foraDosPredios(pos, c) {
    const caixas = K.obstaculos || [];
    const dentro = (q) => caixas.some((b) => b.containsPoint(q));
    if (!dentro(pos)) return pos;
    const alvoH = v(c.x, pos.y, c.z);
    for (let k = 1; k <= 24; k++) {
      const q = pos.clone().lerp(alvoH, k / 24);
      if (!dentro(q)) return q;
    }
    return pos;
  }
  function fim(pos, olho, p, op) {
    if (op.atravessa !== true) pos = foraDosPredios(pos, p);
    fov(op.fov);
    K.mirar(pos.toArray(), olho.toArray());
    K.focoSombra(p.x, p.z);
    return { pos: pos.toArray(), alvo: olho.toArray() };
  }

  // Anda junto com o personagem. op = { lado ('tras' 'frente' 'direita' 'esquerda' ou graus), dist (4,2), altura
  // (1,9), olhar (altura do ponto que a câmera olha: 1,1), adiante (quanto a mira vai na frente dele: 1,5 atrás),
  // balanco (true: leve câmera na mão), fov }
  K.seguir = function (alvo, op = {}) {
    const { p, rumo } = info(alvo);
    const graus = typeof op.lado === 'number' ? op.lado : LADOS[op.lado || 'tras'] ?? 0;
    const { dist = 4.2, altura = 1.9, olhar = 1.1 } = op;
    const f = frente(rumo);
    const dir = f.clone().negate().applyAxisAngle(v(0, 1, 0), (graus * Math.PI) / 180);
    const adiante = op.adiante ?? (Math.abs(graus) < 60 ? 1.5 : 0);
    const t = K.tc || 0, mao = op.balanco === false ? 0 : 1;
    const pos = p.clone().addScaledVector(dir, dist).add(v(Math.sin(t * 1.3) * 0.05 * mao, altura + Math.sin(t * 2.1) * 0.03 * mao, 0));
    const olho = p.clone().add(v(0, olhar, 0)).addScaledVector(f, adiante);
    return fim(pos, olho, p, op);
  };

  // Desce do alto até o personagem, girando em volta. p de 0 a 1 (normalmente B.p). op = { de (altura do começo:
  // 30), ate (altura do fim: 3), dist (5,5), giro (graus que gira no caminho: 70), lado (graus de onde começa: 30),
  // fov }
  K.drone = function (alvo, p, op = {}) {
    const { p: c } = info(alvo);
    const { de = 30, ate = 3, dist = 5.5, giro = 70, lado = 30 } = op;
    const x = K.suave(K.clamp(p));
    const a = ((lado + giro * x) * Math.PI) / 180;
    const d = K.lerp(dist * 2.4, dist, x);
    const pos = c.clone().add(v(Math.sin(a) * d, K.lerp(de, ate, x), Math.cos(a) * d));
    const olho = c.clone().add(v(0, K.lerp(0.3, 1.1, x), 0));
    return fim(pos, olho, c, op);
  };

  // De baixo pra cima, perto do chão: o personagem fica grande e os prédios enormes atrás. p de 0 a 1 (aproxima um
  // pouco). op = { lado (graus em volta dele; 0 = de frente: 25), dist (2,6), altura (0,35), olhar (2,2), fov (62) }
  K.heroi = function (alvo, p = 0, op = {}) {
    const { p: c, rumo } = info(alvo);
    const { lado = 25, dist = 2.6, altura = 0.35, olhar = 2.2 } = op;
    const dir = frente(rumo).applyAxisAngle(v(0, 1, 0), (lado * Math.PI) / 180);
    const d = dist * K.lerp(1.15, 0.92, K.suave(K.clamp(p)));
    const pos = c.clone().addScaledVector(dir, d).add(v(0, altura, 0));
    const olho = c.clone().add(v(0, olhar, 0));
    return fim(pos, olho, c, Object.assign({ fov: 62 }, op));
  };

  // Por cima do ombro do personagem, olhando um ponto (a placa da loja, a tela do computador). p de 0 a 1 (chega um
  // pouco mais perto). op = { lado (1 = ombro direito, -1 = esquerdo), dist (1,7), altura (1,75), fov }
  K.ombro = function (alvo, ponto, p = 0, op = {}) {
    const { p: c } = info(alvo);
    const alvoP = v(...ponto);
    const { lado = 1, dist = 1.7, altura = 1.75 } = op;
    const dir = alvoP.clone().sub(c).setY(0).normalize();
    const dirDireita = v(-dir.z, 0, dir.x);
    const d = dist * K.lerp(1.1, 0.9, K.suave(K.clamp(p)));
    const pos = c.clone().addScaledVector(dir, -d).addScaledVector(dirDireita, 0.55 * lado).add(v(0, altura, 0));
    return fim(pos, alvoP, c, op);
  };
})();
