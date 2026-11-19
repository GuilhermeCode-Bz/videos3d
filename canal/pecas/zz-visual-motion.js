// Visual "motion" do canal: a estética da referência 3D motion (VIDEOS CHAT/ANALISE REFERENCIA) por cima do motor.
// Liga com "visual": "motion" no roteiro.json (o bloco "No roteiro.json" de canal/identidade.md já traz). Sem o campo,
// nada muda (os vídeos antigos saem iguais).
//
// O que muda no modo motion:
// - Contorno preto em tudo (detecção de borda por profundidade e normal), mais grosso perto da câmera
// - Brilho (bloom) nas luzes e janelas e fundo desfocado nos closes (profundidade de campo)
// - Cor por clima: K.clima('normal' | 'isolamento' | 'ameaca' | 'noite' | 'verdade' | 'virada') no plano, ou
//   "clima" na frase do roteiro.json. Sombra puxada pro azul-cobalto, luz quente, saturação alta
// - Fusão curta (0,2 s) entre um plano e outro, no lugar do corte seco, e um push-in lento em todo plano
// - Boneco de desenho: cabeça grande, olho de bolinha preta, sem nariz e orelha, braço e perna de traço fino e
//   sombreado chapado (toon)
// - Legenda branca com contorno fino, 1 ou 2 palavras, a ~67% da altura, sem pulo e sem palavra amarela
// - Etiquetas e rótulos viram adesivos de papel com fita, como as placas impressas da referência
(function () {
  const K = window.K;
  if (!K || K.visualMotion) return;
  const W = K.W, H = K.H;

  const CSS = `
.motion .vinheta{background:radial-gradient(ellipse 80% 62% at 50% 46%,transparent 58%,rgba(6,12,48,.42) 100%)}
.motion .legenda{top:1240px;font:900 76px/1.2 Montserrat,'Arial Black',sans-serif;-webkit-text-stroke:10px #0d0d12;letter-spacing:0;
  text-shadow:0 5px 16px rgba(0,0,0,.45)}
.motion .legenda .chave{color:#fff}
.motion .rotulo{font:900 70px/1 Montserrat,'Arial Black',sans-serif;color:#13238a;-webkit-text-stroke:0;background:#fff8e6;
  padding:22px 34px 18px;border:7px solid #15151c;border-radius:14px;box-shadow:9px 10px 0 rgba(0,0,0,.32);rotate:-2.5deg}
.motion .rotulo:before,.motion .etiqueta:before,.motion .contador:before{content:'';position:absolute;left:50%;top:-20px;width:120px;height:34px;
  margin-left:-60px;background:rgba(246,226,160,.82);border:2px solid rgba(0,0,0,.12);rotate:3deg}
.motion .etiqueta{background:#fff8e6;border:5px solid #15151c;border-radius:10px;color:#15151c;font:900 38px Montserrat,sans-serif;
  padding:14px 26px 12px 18px;box-shadow:7px 8px 0 rgba(0,0,0,.3);rotate:1.8deg;overflow:visible}
.motion .etiqueta:before{width:90px;height:28px;margin-left:-45px;top:-17px}
.motion .etiqueta i{border-radius:5px;border:4px solid #15151c;width:22px;height:22px}
.motion .contador{background:#fff8e6;border:6px solid #15151c;border-radius:14px;box-shadow:8px 9px 0 rgba(0,0,0,.3);color:#15151c;rotate:-1.5deg}
.motion .marca{box-shadow:7px 8px 0 rgba(0,0,0,.3)}
.motion .cta{-webkit-text-stroke:12px #0d0d12;text-shadow:0 6px 18px rgba(0,0,0,.45)}
`;

  // Climas de cor (em sRGB): s = tom da sombra, l = tom da luz, g = tinta geral, sat, brilho, contraste
  const CLIMAS = {
    normal: { s: [0.30, 0.38, 0.80], fs: 0.30, l: [0.60, 0.56, 0.48], fl: 0.18, g: [1, 1, 1.02], sat: 1.12, bri: 1.0, con: 1.04 },
    isolamento: { s: [0.30, 0.44, 0.66], fs: 0.32, l: [0.64, 0.60, 0.44], fl: 0.24, g: [0.98, 1.02, 0.99], sat: 1.14, bri: 1.0, con: 1.05 },
    ameaca: { s: [0.42, 0.26, 0.34], fs: 0.40, l: [0.70, 0.52, 0.36], fl: 0.38, g: [1.10, 0.93, 0.84], sat: 1.25, bri: 0.92, con: 1.10 },
    noite: { s: [0.16, 0.24, 0.92], fs: 0.60, l: [0.72, 0.60, 0.40], fl: 0.40, g: [0.70, 0.80, 1.18], sat: 1.40, bri: 0.78, con: 1.10 },
    verdade: { s: [0.14, 0.20, 0.90], fs: 0.55, l: [0.76, 0.62, 0.42], fl: 0.45, g: [0.80, 0.85, 1.12], sat: 1.30, bri: 0.86, con: 1.12 },
    virada: { s: [0.30, 0.44, 0.92], fs: 0.30, l: [0.64, 0.58, 0.46], fl: 0.24, g: [1.02, 1.02, 1.04], sat: 1.30, bri: 1.06, con: 1.06 }
  };
  let climaAgora = null;
  // Clima de cor deste quadro (chamar no plano do cena.js). Sem chamada, vale o "clima" da frase ou o normal
  K.clima = function (nome) { if (CLIMAS[nome]) climaAgora = nome; };

  const DISSOLVE = 0.2;   // fusão entre planos, em segundos (6 quadros a 30 fps)
  const PUSH = 0.045;     // push-in lento: quanto o plano fecha do começo ao fim

  let P = null;           // a linha de pós-processamento (criada no preparar)
  const ehMotion = () => !!K.motion;

  // ---------- Pós-processamento ----------

  const VERT = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';

  function criarPos() {
    const T = THREE;
    const rt = (w, h, op = {}) => new T.WebGLRenderTarget(w, h, Object.assign({ type: T.HalfFloatType, minFilter: T.LinearFilter, magFilter: T.LinearFilter, depthBuffer: false }, op));
    const p = {};
    p.cor = rt(W, H, { depthBuffer: true, samples: 4 });
    p.nd = new T.WebGLRenderTarget(W, H, { type: T.UnsignedByteType, depthBuffer: true, depthTexture: new T.DepthTexture(W, H) });
    p.nd.depthTexture.type = T.UnsignedIntType;
    const w4 = W / 4, h4 = H / 4;
    p.brA = rt(w4, h4); p.brB = rt(w4, h4);
    p.blA = rt(w4, h4); p.blB = rt(w4, h4);
    p.ant = new T.WebGLRenderTarget(W, H, { type: T.UnsignedByteType, depthBuffer: false });
    p.matNormal = new T.MeshNormalMaterial({ side: T.DoubleSide, opacity: 0, blending: T.NoBlending });
    p.cam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    p.cena = new T.Scene();
    p.quad = new T.Mesh(new T.PlaneGeometry(2, 2), null);
    p.quad.frustumCulled = false;
    p.cena.add(p.quad);

    // Reduz pra 1/4 (com limiar opcional, pro brilho)
    p.matReduz = new T.ShaderMaterial({
      uniforms: { t: { value: null }, px: { value: new T.Vector2(1 / W, 1 / H) }, limiar: { value: 0 } },
      vertexShader: VERT,
      fragmentShader: `uniform sampler2D t; uniform vec2 px; uniform float limiar; varying vec2 vUv;
        void main(){
          vec3 c = vec3(0.0);
          for (int i = -1; i <= 1; i++) for (int j = -1; j <= 1; j++) c += texture2D(t, vUv + vec2(float(i), float(j)) * px * 1.5).rgb;
          c /= 9.0;
          if (limiar > 0.0) { float l = dot(c, vec3(0.2126, 0.7152, 0.0722)); c *= smoothstep(limiar, limiar + 0.35, l); }
          gl_FragColor = vec4(c, 1.0);
        }`,
      depthTest: false, depthWrite: false
    });
    // Desfoque gaussiano separável (9 amostras)
    p.matBlur = new T.ShaderMaterial({
      uniforms: { t: { value: null }, dir: { value: new T.Vector2() } },
      vertexShader: VERT,
      fragmentShader: `uniform sampler2D t; uniform vec2 dir; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(t, vUv).rgb * 0.2270270270;
          c += (texture2D(t, vUv + dir * 1.3846153846).rgb + texture2D(t, vUv - dir * 1.3846153846).rgb) * 0.3162162162;
          c += (texture2D(t, vUv + dir * 3.2307692308).rgb + texture2D(t, vUv - dir * 3.2307692308).rgb) * 0.0702702703;
          gl_FragColor = vec4(c, 1.0);
        }`,
      depthTest: false, depthWrite: false
    });
    // Junta tudo: contorno, profundidade de campo, brilho, cor do clima e a fusão com o plano anterior
    p.matFinal = new T.ShaderMaterial({
      uniforms: {
        tCor: { value: p.cor.texture }, tND: { value: p.nd.texture }, tProf: { value: p.nd.depthTexture },
        tBrilho: { value: p.brA.texture }, tBlur: { value: p.blA.texture }, tAnt: { value: p.ant.texture },
        px: { value: new T.Vector2(1 / W, 1 / H) }, perto: { value: 0.1 }, longe: { value: 400 },
        nevoa: { value: new T.Vector2(45, 140) }, misturaAnt: { value: 1 },
        cs: { value: new T.Vector3() }, fs: { value: 0 }, cl: { value: new T.Vector3() }, fl: { value: 0 }, cg: { value: new T.Vector3(1, 1, 1) },
        sat: { value: 1 }, bri: { value: 1 }, con: { value: 1 }, forcaBrilho: { value: 0.22 }, forcaFoco: { value: 0.5 }, forcaLinha: { value: 0.92 }
      },
      vertexShader: VERT,
      fragmentShader: `
        uniform sampler2D tCor, tND, tProf, tBrilho, tBlur, tAnt;
        uniform vec2 px, nevoa; uniform float perto, longe, misturaAnt;
        uniform vec3 cs, cl, cg; uniform float fs, fl, sat, bri, con, forcaBrilho, forcaFoco, forcaLinha;
        varying vec2 vUv;
        float vz(vec2 uv){ float d = texture2D(tProf, uv).x; float z = d * 2.0 - 1.0; return 2.0 * perto * longe / (longe + perto - z * (longe - perto)); }
        vec3 nrm(vec2 uv){ return texture2D(tND, uv).rgb * 2.0 - 1.0; }
        float msk(vec2 uv){ return texture2D(tND, uv).a; }
        vec3 srgb(vec3 c){ c = max(c, 0.0); return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
        float borda(vec2 uv, float zc, vec3 nc, float r){
          float wc = 1.0 / zc, e = 0.0;
          vec2 o[4]; o[0] = vec2(1.0, 0.0); o[1] = vec2(0.0, 1.0); o[2] = vec2(0.7071, 0.7071); o[3] = vec2(0.7071, -0.7071);
          for (int i = 0; i < 4; i++) {
            vec2 d = o[i] * px * r;
            float ma = msk(uv + d), mb = msk(uv - d);
            float za = mix(vz(uv + d), zc, ma), zb = mix(vz(uv - d), zc, mb);
            // 1/z é linear numa superfície plana: a curvatura disso só aparece em quina e silhueta
            float lap = abs(1.0 / za + 1.0 / zb - 2.0 * wc) / wc;
            e = max(e, smoothstep(0.02, 0.06, lap));
            float dn = max((1.0 - dot(nc, nrm(uv + d))) * (1.0 - ma), (1.0 - dot(nc, nrm(uv - d))) * (1.0 - mb));
            e = max(e, smoothstep(0.2, 0.45, dn) * step(za, longe * 0.95) * step(zb, longe * 0.95));
          }
          return e;
        }
        void main(){
          vec3 cor = texture2D(tCor, vUv).rgb;
          float zc = vz(vUv);
          vec3 nc = nrm(vUv);
          // Contorno: mais grosso perto da câmera, some na névoa
          float r = mix(4.0, 2.0, smoothstep(2.0, 20.0, zc));
          float e = max(borda(vUv, zc, nc, r), borda(vUv, zc, nc, r * 0.5));
          e *= 1.0 - smoothstep(nevoa.x * 0.55, nevoa.x * 1.1, zc);
          e *= step(zc, longe * 0.95) * (1.0 - msk(vUv));
          vec3 c = mix(cor, vec3(0.035, 0.035, 0.05), e * forcaLinha);
          // Profundidade de campo: só nos closes (foco perto), desfoca o que está longe do foco
          float f = min(min(vz(vec2(0.5, 0.5)), vz(vec2(0.5, 0.43))), min(vz(vec2(0.5, 0.58)), min(vz(vec2(0.42, 0.5)), vz(vec2(0.58, 0.5)))));
          float coc = smoothstep(0.3, 1.1, abs(zc - f) / f) * smoothstep(7.5, 3.2, f) * forcaFoco;
          c = mix(c, texture2D(tBlur, vUv).rgb, coc);
          c += texture2D(tBrilho, vUv).rgb * forcaBrilho;
          // Cor do clima, em sRGB
          c = srgb(c);
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(l), c, sat);
          c = (c - 0.5) * con + 0.5;
          float ws = pow(1.0 - clamp(l, 0.0, 1.0), 2.0), wl = pow(clamp(l, 0.0, 1.0), 2.0);
          c += (cs - 0.5) * ws * fs;
          c += (cl - 0.5) * wl * fl;
          c *= cg * bri;
          c = clamp(c, 0.0, 1.0);
          if (misturaAnt < 1.0) c = mix(texture2D(tAnt, vUv).rgb, c, misturaAnt);
          gl_FragColor = vec4(c, 1.0);
        }`,
      depthTest: false, depthWrite: false
    });
    return p;
  }

  function passe(mat, destino) {
    P.quad.material = mat;
    K.renderer.setRenderTarget(destino);
    K.renderer.render(P.cena, P.cam);
  }
  function borrar(a, b, w, h, vezes) {
    for (let i = 0; i < vezes; i++) {
      P.matBlur.uniforms.t.value = a.texture; P.matBlur.uniforms.dir.value.set((1 + i) / w, 0); passe(P.matBlur, b);
      P.matBlur.uniforms.t.value = b.texture; P.matBlur.uniforms.dir.value.set(0, (1 + i) / h); passe(P.matBlur, a);
    }
  }

  // Esconde do passe de normal o que é transparente, sprite, ponto, linha e o céu
  const escondidos = [];
  function esconderPraNormal() {
    escondidos.length = 0;
    K.scene.traverse((o) => {
      if (!o.visible) return;
      const m = Array.isArray(o.material) ? o.material[0] : o.material;
      if (o === K.domo || o.userData.contorno || o.userData.cartao || o.isSprite || o.isPoints || o.isLine || (m && m.transparent && (m.opacity < 0.95 || m.map)) || (m && m.isShaderMaterial)) {
        o.visible = false; escondidos.push(o);
      }
    });
  }

  // Frase e bloco do tempo t (pro clima e pro push-in)
  let blocos = null;
  function blocoEm(t) {
    blocos = blocos || K.blocos(K.tl);
    let b = blocos[0];
    for (const x of blocos) if (t >= x.inicio) b = x;
    return b;
  }
  function climaDaFrase(t) {
    const fr = (K.tl.roteiro && K.tl.roteiro.frases) || [];
    let nome = null;
    K.tl.frases.forEach((f, i) => { if (t >= f.inicio) nome = f.clima || (fr[i] && fr[i].clima) || nome; });
    return nome;
  }

  let destinoFinal = null;   // null = tela; P.ant = guarda o quadro pra fusão
  let mistura = 1;
  const vFrente = new THREE.Vector3(), qCam = new THREE.Quaternion();

  function renderMotion() {
    const r = K.renderer, cam = K.camera, t = K.t || 0;
    // Contraluz (igual ao estilo redondo)
    if (K.contra) {
      cam.getWorldDirection(vFrente);
      K.contra.position.copy(cam.position).addScaledVector(vFrente, 40);
      K.contra.position.y += 6;
      K.contra.target.position.copy(cam.position);
      K.contra.target.updateMatrixWorld();
      K.contra.color.copy(K.hemi.color);
      K.contra.intensity = K.hemi.intensity * 0.3;
    }
    // A câmera nunca para: respira e fecha devagar ao longo do plano
    qCam.copy(cam.quaternion);
    const fov0 = cam.fov;
    cam.rotateX(Math.sin(t * 0.9) * 0.0022 + Math.sin(t * 2.3 + 1) * 0.0008);
    cam.rotateY(Math.sin(t * 0.7 + 2) * 0.0026 + Math.sin(t * 1.7) * 0.0007);
    if (K.tl && K.tl.frases && K.tl.frases.length) {
      const b = blocoEm(t), p = K.clamp((t - b.inicio) / Math.max(0.3, b.ate - b.inicio));
      cam.fov = fov0 * (1 - PUSH * K.suave(p));
      cam.updateProjectionMatrix();
    }
    cam.updateMatrixWorld();
    K.domo.position.copy(cam.position);

    // 1) Cor (antes, todo material novo vira pintura)
    celarCena();
    if (K.atualizarCartoes) K.atualizarCartoes(cam);
    r.setRenderTarget(P.cor);
    r.render(K.scene, cam);
    // 2) Normal e profundidade (sem sombra de novo e sem transparentes)
    const autoSombra = r.shadowMap.autoUpdate;
    r.shadowMap.autoUpdate = false;
    esconderPraNormal();
    const fundo = K.scene.background, nevoa = K.scene.fog;
    K.scene.background = null; K.scene.fog = null;
    K.scene.overrideMaterial = P.matNormal;
    r.setClearColor(0x8080ff, 0);
    r.setRenderTarget(P.nd);
    r.clear();
    r.render(K.scene, cam);
    K.scene.overrideMaterial = null;
    escondidos.forEach((o) => { o.visible = true; });
    // os bonecos-cartão entram por cima, com a profundidade certa: o alfa 1 deles é a máscara (o contorno do cenário
    // não passa por cima do boneco, que já tem o traço dele)
    if (K.cartoesBoneco && K.cartoesBoneco.length) {
      const camadas = cam.layers.mask, auto = r.autoClear;
      cam.layers.set(6); r.autoClear = false;
      r.render(K.scene, cam);
      cam.layers.mask = camadas; r.autoClear = auto;
    }
    K.scene.background = fundo; K.scene.fog = nevoa;
    r.shadowMap.autoUpdate = autoSombra;
    r.setClearColor(0x000000, 1);
    // 3) Brilho e desfoque, em 1/4
    P.matReduz.uniforms.t.value = P.cor.texture;
    P.matReduz.uniforms.limiar.value = 0.97; passe(P.matReduz, P.brA);
    borrar(P.brA, P.brB, W / 4, H / 4, 3);
    P.matReduz.uniforms.limiar.value = 0; passe(P.matReduz, P.blA);
    borrar(P.blA, P.blB, W / 4, H / 4, 2);
    // 4) Final
    const u = P.matFinal.uniforms;
    u.perto.value = cam.near; u.longe.value = cam.far;
    if (K.scene.fog) u.nevoa.value.set(K.scene.fog.near, K.scene.fog.far);
    const c = CLIMAS[climaAgora || climaDaFrase(t) || 'normal'] || CLIMAS.normal;
    u.cs.value.set(...c.s); u.fs.value = c.fs; u.cl.value.set(...c.l); u.fl.value = c.fl; u.cg.value.set(...c.g);
    u.sat.value = c.sat; u.bri.value = c.bri; u.con.value = c.con;
    u.misturaAnt.value = destinoFinal ? 1 : mistura;
    u.tAnt.value = destinoFinal ? P.blB.texture : P.ant.texture; // nunca ler e escrever a mesma textura
    passe(P.matFinal, destinoFinal);
    r.setRenderTarget(null);

    cam.fov = fov0; cam.updateProjectionMatrix();
    cam.quaternion.copy(qCam);
    cam.updateMatrixWorld();
    K.ui.divisor.style.display = 'none';
  }

  // ---------- Sombreado pintado (cel) ----------
  // Todo material com luz vira cor lisa em 3 tons (luz, meia-luz e sombra puxada pro azul), como pintura de desenho.
  // Não troca o material: só muda o shader, então o cena.js continua mexendo em cor, brilho e transparência.
  // material.userData.chapado = true: cor lisa sem sombra nenhuma (o boneco)
  const celFeito = new WeakSet();
  function celar(m) {
    if (!m || celFeito.has(m)) return;
    celFeito.add(m);
    if (!(m.isMeshStandardMaterial || m.isMeshLambertMaterial || m.isMeshPhongMaterial)) return;
    const plano = !!m.userData.chapado, antes = m.onBeforeCompile;
    m.onBeforeCompile = (sh, r) => {
      if (antes) antes(sh, r);
      sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', `{
        vec3 base = diffuseColor.rgb;
        ${plano ? 'outgoingLight = base * 0.97 + totalEmissiveRadiance;' : `
        float lb = max(dot(base, vec3(0.299, 0.587, 0.114)), 0.02);
        float k = dot(max(outgoingLight - totalEmissiveRadiance, 0.0), vec3(0.299, 0.587, 0.114)) / lb;
        float q = mix(0.62, 0.82, smoothstep(K_SOMBRA - 0.05, K_SOMBRA + 0.05, k));
        q = mix(q, 1.0, smoothstep(K_LUZ - 0.06, K_LUZ + 0.06, k));
        vec3 tom = mix(vec3(0.80, 0.86, 1.12), vec3(1.0), smoothstep(0.7, 1.0, q));
        outgoingLight = base * q * tom + totalEmissiveRadiance;`}
      }
      #include <opaque_fragment>`).replace(/K_SOMBRA/g, CEL.sombra.toFixed(3)).replace(/K_LUZ/g, CEL.luz.toFixed(3));
    };
    const ck = m.customProgramCacheKey.bind(m);
    m.customProgramCacheKey = () => ck() + (plano ? '|chapado' : `|cel${CEL.sombra}-${CEL.luz}`);
    m.needsUpdate = true;
  }
  const CEL = { sombra: 0.32, luz: 0.62 };
  function celarCena() {
    K.scene.traverse((o) => {
      if (!o.material) return;
      if (Array.isArray(o.material)) o.material.forEach(celar); else celar(o.material);
    });
  }

  // ---------- Boneco de desenho ----------
  // O esqueleto é o boneco da Máquina (anda, aponta, reage, e a revisão entende), desenhado chapado: cor lisa, cabeça
  // grande, olho oval preto, sem nariz e orelha, braço e perna de traço preto e um contorno preto grosso em volta de
  // cada parte (casca invertida com largura fixa na tela, como traço de caneta)

  let matContorno = null;
  function contornoMat() {
    if (matContorno) return matContorno;
    matContorno = new THREE.ShaderMaterial({
      uniforms: { px: { value: 3.4 }, tela: { value: new THREE.Vector2(W, H) } },
      side: THREE.BackSide,
      vertexShader: `uniform float px; uniform vec2 tela;
        void main(){
          vec4 c = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          vec3 n = normalize(normalMatrix * normal);
          vec2 d = (projectionMatrix * vec4(n, 0.0)).xy * tela;
          float l = length(d);
          d = l > 1e-5 ? d / l : vec2(0.0);
          c.xy += d * 2.0 * px / tela * c.w;
          gl_Position = c;
        }`,
      fragmentShader: 'void main(){ gl_FragColor = vec4(0.07, 0.07, 0.09, 1.0); }'
    });
    return matContorno;
  }
  function contornar(raiz) {
    const lista = [];
    raiz.traverse((o) => {
      if (!o.isMesh || o.userData.contorno || !o.material || o.material.isMeshBasicMaterial || o.material.transparent) return;
      lista.push(o);
    });
    lista.forEach((o) => {
      const c = new THREE.Mesh(o.geometry, contornoMat());
      c.userData.contorno = true;
      c.castShadow = false; c.receiveShadow = false;
      c.raycast = () => {};
      o.add(c);
    });
  }
  // Contorno grosso em qualquer objeto do cena.js (o boneco já vem com o dele): K.contornar(peca)
  K.contornar = function (obj) { if (obj) contornar(obj.g && obj.g.isObject3D ? obj.g : obj); return obj; };

  function desenhar(b) {
    const preto = K.mat(0x17171e);
    preto.userData.chapado = true;
    const fino = (m, k) => { if (m && m.isMesh) { m.material = preto; m.scale.x *= k; m.scale.z *= k; } };
    // Braço e perna de traço fino; mão redonda menor
    (b.bracos || []).forEach((br) => {
      br.ombro.children.forEach((o, i) => { if (o.isMesh && i > 0) fino(o, 0.42); });
      br.cotovelo.children.forEach((o) => {
        if (!o.isMesh) return;
        if (b.maos && b.maos.includes(o)) { o.scale.multiplyScalar(0.82); o.children.forEach((p) => { if (p.isMesh) p.visible = false; }); }
        else if (o.geometry && o.geometry.type !== 'SphereGeometry') fino(o, 0.42);
      });
    });
    (b.pernas || []).forEach((pr) => {
      pr.quadril.children.forEach((o, i) => {
        if (!o.isMesh) return;
        if (i === 0) fino(o, o.geometry.parameters && o.geometry.parameters.radiusTop > 0.09 ? 0.32 : 0.48);
        else if (i === 1) { o.material = preto; o.scale.multiplyScalar(0.75); }
      });
    });
    // Rosto: cabeça grande, sem nariz, orelha e bochecha; olho oval preto; boca e sobrancelha pretas
    const cab = b.cabeca;
    if (cab) {
      cab.scale.setScalar(1.42);
      const rosto = cab.children.find((o) => o.isMesh && o.geometry && o.geometry.parameters && o.geometry.parameters.radius === 0.21);
      if (rosto && rosto.material && rosto.material.color) rosto.material.color.lerp(new THREE.Color(0xfffaf2), 0.3);
      cab.children.forEach((o) => {
        if (!o.isMesh) return;
        const p = o.position, g = o.geometry && o.geometry.type;
        if (g === 'CircleGeometry') o.visible = false;                                                  // bochecha
        else if (Math.abs(Math.abs(p.x) - 0.205) < 0.01 && Math.abs(p.y) < 0.01) o.visible = false;   // orelha
        else if (Math.abs(p.x) < 0.01 && p.z > 0.2 && p.y > -0.03 && p.y < 0.01) o.visible = false;   // nariz
        else if (o.material && o.material.isMeshBasicMaterial && o !== b.boca && o !== b.bocaAberta && !b.doutor) o.material = new THREE.MeshBasicMaterial({ color: 0x17171e });
      });
      const olhos = cab.children.find((o) => o.isGroup && Math.abs(o.position.y - 0.03) < 0.001 && o.children.length >= 4);
      if (olhos) {
        olhos.children.forEach((o) => { o.visible = false; });
        [-1, 1].forEach((lado) => {
          const bola = new THREE.Mesh(new THREE.SphereGeometry(0.03).scale(0.78, 1.3, 0.45), new THREE.MeshBasicMaterial({ color: 0x0d0d12 }));
          bola.position.set(lado * 0.068, -0.005, 0.195);
          olhos.add(bola);
        });
      }
    }
    if (b.boca) { b.boca.material = new THREE.MeshBasicMaterial({ color: 0x17171e }); b.boca.scale.set(0.9, 0.7, 1); }
    if (b.bocaAberta) b.bocaAberta.material = new THREE.MeshBasicMaterial({ color: 0x2a0d10 });
    // Cor lisa (sem sombra) e o traço preto em volta de cada parte
    b.g.traverse((o) => { if (o.isMesh && o.material && o.material.isMeshStandardMaterial) o.material.userData.chapado = true; });
    contornar(b.g);
    return b;
  }

  // ---------- Legenda de 1 ou 2 palavras ----------

  const grupos = new WeakMap();
  function gruposDa(f) {
    if (grupos.has(f)) return grupos.get(f);
    const g = [], ws = f.palavras || [];
    for (let i = 0; i < ws.length; i++) {
      const a = ws[i], b = ws[i + 1];
      const curta = (w) => w.texto.replace(/[^\p{L}\p{N}]/gu, '').length <= 3;
      if (b && (curta(a) || curta(b)) && b.inicio - a.inicio < 0.45 && (a.texto + b.texto).length <= 13 && !/[.!?,:;]$/.test(a.texto)) {
        g.push({ inicio: a.inicio, texto: a.texto + ' ' + b.texto }); i++;
      } else g.push({ inicio: a.inicio, texto: a.texto });
    }
    grupos.set(f, g);
    return g;
  }
  function legendaMotion(tl, t) {
    let atual = null;
    for (const f of tl.frases) {
      if (t < f.inicio || t > f.fim + 0.12) continue;
      for (const g of gruposDa(f)) if (t >= g.inicio) atual = g;
    }
    K.legenda.innerHTML = atual ? `<span>${atual.texto.replace(/[*]/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>` : '';
  }

  // ---------- Ligando ----------

  const preparar0 = K.preparar, render0 = K.render, quadro0 = K.quadro, boneco0 = K.boneco, legenda0 = K.mostrarLegenda;

  K.preparar = function (tl) {
    preparar0(tl);
    const visual = (tl.roteiro && tl.roteiro.visual) || tl.visual;
    if (visual !== 'motion' || K.motion) return;
    K.motion = true;
    P = criarPos();
    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
    K.palco.classList.add('motion');
    if (!K.palco.querySelector('.vinheta')) {
      const v = document.createElement('div'); v.className = 'vinheta'; K.palco.appendChild(v);
    }
  };

  K.render = function () {
    if (!ehMotion() || K.dividida) return render0();
    renderMotion();
  };

  K.quadro = function (t) {
    if (!ehMotion()) return quadro0(t);
    blocos = blocos || K.blocos(K.tl);
    // Fusão: nos primeiros 0,2 s de um plano novo, o último quadro do plano anterior vai sumindo por cima
    const b = blocos.find((x, i) => i > 0 && t >= x.inicio && t < x.inicio + DISSOLVE);
    if (b) {
      climaAgora = null; destinoFinal = P.ant;
      quadro0(Math.max(0, b.inicio - 1 / 60));
      destinoFinal = null;
      mistura = K.suave(K.clamp((t - b.inicio) / DISSOLVE));
    } else mistura = 1;
    climaAgora = null;
    quadro0(t);
    mistura = 1;
  };

  K.mostrarLegenda = function (tl, t) {
    if (!ehMotion()) return legenda0(tl, t);
    legendaMotion(tl, t);
  };

  K.boneco = function (op = {}) {
    const b = boneco0(op);
    return ehMotion() && op.desenho !== false && !b.desenho2d ? desenhar(b) : b;
  };

  K.visualMotion = true;
})();
