// Aspirador de pó gigante (o "aspirador de cliente"), no catálogo do K.m3d: const a = K.m3d('aspirador_gigante', { texto: 'CLIENTES' }).
// Corpo vermelho de rodinhas, botão MÁX em cima, mangueira cinza e o bocal largo. No plano (todo quadro volta ao neutro):
// a.userData.m3d.bocal(pos, alvo) põe o bocal num ponto do mundo apontado pra outro (a mangueira acompanha) ·
// ligar(t, forca) treme o corpo e acende o botão · murcha(k) desliga e murcha o corpo (0 a 1) · boca(): o ponto do mundo da boca do bocal
(function () {
  const K = window.K;
  if (!K.m3d || !K.m3d.novo) return;
  const { cx, ci, bo, to, gr, pl, letra } = K.m3d.h;
  const PI = Math.PI;
  const VERM = 0xd93a2f, ESC = 0x23272e, CINZA = 0x8a929c;

  K.m3d.novo('aspirador_gigante', 'Aspirador de pó gigante com mangueira e bocal', 'ganchos', (g, o) => {
    const cor = o.cor || VERM, texto = o.texto || 'CLIENTES';
    // Corpo (o que treme): cilindro deitado no eixo z, com as tampas arredondadas
    const corpo = gr(g, [0, 0, 0]);
    ci(corpo, [0.42, 0.42, 0.8], cor, [0, 0.52, 0], { giro: [PI / 2, 0, 0], m: { roughness: 0.35 } });
    bo(corpo, 0.42, cor, [0, 0.52, 0.4], [1, 1, 0.45], { m: { roughness: 0.35 } });
    bo(corpo, 0.42, new THREE.Color(cor).multiplyScalar(0.8).getHex(), [0, 0.52, -0.4], [1, 1, 0.4]);
    // faixa escura no meio e a alça em cima
    ci(corpo, [0.43, 0.43, 0.08], ESC, [0, 0.52, 0], { giro: [PI / 2, 0, 0] });
    to(corpo, 0.22, 0.035, ESC, [0, 0.98, -0.05], [0, PI / 2, 0], PI);
    // a saída da mangueira na frente
    ci(corpo, [0.1, 0.12, 0.12], ESC, [0, 0.52, 0.6], { giro: [PI / 2, 0, 0] });
    // o botão MÁX em cima (acende)
    const matBotao = K.mat(0x7a1d18, { emissive: 0xff3b2f, emissiveIntensity: 0, roughness: 0.3 });
    ci(corpo, [0.09, 0.1, 0.05], ESC, [0, 0.95, 0.24], {});
    const botao = ci(corpo, [0.075, 0.075, 0.05], matBotao, [0, 0.99, 0.24], {});
    pl(corpo, 0.26, 0.1, (c, w, h) => letra(c, 'MÁX', w / 2, h / 2, h * 0.8, '#ffffff', 900), [0, 0.955, 0.36], [-PI / 2 + 0.5, 0, 0], 200);
    // a etiqueta dos dois lados
    [-1, 1].forEach((s) => pl(corpo, 0.62, 0.2, (c, w, h) => {
      c.fillStyle = '#ffffff'; c.beginPath(); c.roundRect(2, 2, w - 4, h - 4, h * 0.3); c.fill();
      letra(c, texto, w / 2, h / 2 + 2, h * 0.56, '#d93a2f', 900);
    }, [s * 0.425, 0.56, 0.02], [0, s * PI / 2, 0], 360));
    // rodinhas
    [[-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]].forEach(([x, z]) => ci(g, [0.09, 0.09, 0.07], ESC, [x, 0.09, z], { giro: [0, 0, PI / 2] }));

    // Bocal: funil largo com a boca pro +z do bocal, e a alça
    const bocal = gr(g, [0, 0.12, 1.4]);
    const geoFunil = new THREE.CylinderGeometry(0.34, 0.09, 0.5, 30, 1, true).rotateX(PI / 2);
    const funil = K.malha(geoFunil, K.mat(CINZA, { side: THREE.DoubleSide, metalness: 0.3, roughness: 0.4 }));
    bocal.add(funil);
    to(bocal, 0.34, 0.03, ESC, [0, 0, 0.25], [0, 0, 0]);
    const fundoBoca = K.malha(new THREE.CircleGeometry(0.31, 28), K.mat(0x0d0f12, { side: THREE.DoubleSide }), false);
    fundoBoca.position.z = 0.05; bocal.add(fundoBoca);
    ci(bocal, [0.1, 0.1, 0.18], ESC, [0, 0, -0.32], { giro: [PI / 2, 0, 0] });

    // Mangueira: tubo refeito quando o bocal muda de lugar
    const matMang = K.mat(CINZA, { roughness: 0.55 });
    const mang = K.malha(new THREE.BufferGeometry(), matMang);
    g.add(mang);
    let chave = '';
    const SAIDA = new THREE.Vector3(0, 0.52, 0.66);
    function refazer(sag) {
      const b = bocal.localToWorld(new THREE.Vector3(0, 0, -0.42));
      const fim = g.worldToLocal(b);
      const k = fim.toArray().map((v) => v.toFixed(2)).join(',') + sag.toFixed(2);
      if (k === chave) return; chave = k;
      const meio = SAIDA.clone().lerp(fim, 0.5); meio.y = Math.min(SAIDA.y, fim.y) - 0.15 - sag;
      const c1 = SAIDA.clone().add(new THREE.Vector3(0, 0, 0.35));
      const curva = new THREE.CatmullRomCurve3([SAIDA, c1, meio, fim]);
      mang.geometry.dispose();
      mang.geometry = new THREE.TubeGeometry(curva, 40, 0.075, 12, false);
    }
    tam(g, o);
    let sag = 0;
    const api = {
      corpo, botao, grupoBocal: bocal,
      // bocal num ponto do mundo, a boca apontada pro alvo
      bocal(pos, alvo) {
        g.updateMatrixWorld(true);
        const p = g.worldToLocal(new THREE.Vector3(...pos));
        bocal.position.copy(p);
        bocal.lookAt(new THREE.Vector3(...alvo));
        bocal.updateMatrixWorld(true);
        refazer(sag);
      },
      boca() { bocal.updateMatrixWorld(true); return bocal.localToWorld(new THREE.Vector3(0, 0, 0.3)).toArray(); },
      ligar(t, forca = 1) {
        corpo.position.set(Math.sin(t * 57) * 0.014 * forca, Math.abs(Math.sin(t * 43)) * 0.012 * forca, 0);
        corpo.rotation.z = Math.sin(t * 31) * 0.02 * forca;
        matBotao.emissiveIntensity = 1.4 * forca;
        bocal.rotation.z += Math.sin(t * 50) * 0.04 * forca;
      },
      murcha(k) {
        k = K.clamp(k);
        corpo.scale.set(1 + 0.06 * k, 1 - 0.18 * k, 1 + 0.04 * k);
        sag = 0.25 * k; chave = ''; refazer(sag);
      }
    };
    function tam(gg, op) { if (op.tam) gg.scale.setScalar(op.tam); }
    K.vivo(() => {
      corpo.position.set(0, 0, 0); corpo.rotation.set(0, 0, 0); corpo.scale.set(1, 1, 1);
      matBotao.emissiveIntensity = 0; sag = 0;
    });
    g.updateMatrixWorld(true); refazer(0);
    return api;
  });
})();
