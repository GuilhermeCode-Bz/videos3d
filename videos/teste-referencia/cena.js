// Teste do visual da referência 3D motion com o Mappoa: a sala verde (ninguém responde), o escritório azul (o colega
// que fecha cliente), o mergulho no celular com o Mappoa e o prédio à noite.
(function () {
  const PI = Math.PI;
  let bl, CS, eu, colega, celEu, celCol, mon;
  const pc = (x, a, b) => K.clamp((x - a) / (b - a));

  // Celular com a caixa de mensagens vazia (o "Inbox (0)" do Mappoa)
  function celularVazio() {
    const g = new THREE.Group();
    g.add(K.malha(new THREE.BoxGeometry(0.17, 0.33, 0.018), K.mat(0x1b1d24)));
    const cv = document.createElement('canvas'); cv.width = 360; cv.height = 700;
    const c = cv.getContext('2d');
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, 360, 700);
    c.fillStyle = '#1b1b22'; c.font = '700 22px Montserrat, sans-serif'; c.textAlign = 'left'; c.fillText('9:41', 24, 38);
    c.font = '800 38px Montserrat, sans-serif'; c.fillText('Mensagens', 24, 104);
    c.fillStyle = '#eef1f6'; c.beginPath(); c.roundRect(24, 126, 312, 40, 20); c.fill();
    c.strokeStyle = '#2f6fd6'; c.lineWidth = 10; c.beginPath(); c.arc(180, 340, 92, 0, 7); c.stroke();
    c.fillStyle = '#e2332b'; c.font = '900 120px Montserrat, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('0', 180, 346);
    c.fillStyle = '#1b1b22'; c.font = '800 32px Montserrat, sans-serif'; c.fillText('respostas', 180, 486);
    c.fillStyle = '#8a93a3'; c.font = '600 21px Montserrat, sans-serif'; c.fillText('Nenhuma empresa respondeu', 180, 530);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace;
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(0.152, 0.296), new THREE.MeshBasicMaterial({ map: t }));
    tela.position.z = 0.0102; g.add(tela);
    K.scene.add(g);
    return g;
  }

  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios(['sala_verde', 'escritorio_azul', ['predio_noite', { janela: [4, 2] }]]);
    // o protagonista: cabeça branca, camisa azul-clara, gravata e crachá; o colega: pele morena, camisa verde-petróleo
    eu = K.boneco({ roupa: 'camiseta', desenho: { roupa: '#8cc0f0', calca: '#26304a', pele: '#fbf6ef', cabelo: '#16141b', cracha: true, gravata: '#1d3b9a' } });
    colega = K.boneco({ roupa: 'camiseta', semente: 11, desenho: { roupa: '#2fa79a', calca: '#3a3f4a', pele: '#f0b27a', cabelo: '#6b3d1e', sapato: '#6b3d1e' } });
    K.nomear('colega', colega.g);
    celEu = celularVazio(); K.nomear('celular', celEu);
    // as telas reais do Mappoa: o celular do colega e o monitor da mesa dele
    celCol = K.celularMappoa('lista', { tam: 2 }); K.nomear('mappoa', celCol.g);
    mon = K.monitorMappoa('campanha', { tam: 0.8 }); CS.todos.escritorio_azul.grupo.add(mon.g); mon.g.position.set(2.75, 0.765, -0.62); mon.g.rotation.y = -0.15; K.nomear('monitor', mon.g);
  }

  const PLANOS = {
    gancho(B, tc) {
      const C = CS.usar('sala_verde'); K.clima('isolamento');
      eu.colocar([0.05, 0, -2.35], 0);
      eu.humor('triste'); eu.suar(tc);
      eu.pose({ x: -0.55, z: 0.1, c: -0.6 }, { x: -0.55, z: 0.1, c: -0.6 });
      eu.cabeca.rotation.x = 0.18;
      celEu.visible = true; celEu.position.set(0.15, 0.775, -1.45); celEu.rotation.set(-PI / 2, 0, 0.25);
      // 1) crash zoom no celular com o "0" · 2) sobe e recua até ele suando atrás da mesa
      const p = B.p;
      if (p < 0.38) {
        const x = K.saiVolta(pc(p, 0, 0.12)) * 0.6 + pc(p, 0.12, 0.38) * 0.4;
        K.plano({ pos: [0.15, 1.75, -1.15], alvo: [0.15, 0.78, -1.45], fov: 44 }, { pos: [0.15, 1.12, -1.33], alvo: [0.15, 0.78, -1.45], fov: 40 }, x);
      } else {
        K.plano({ pos: [0.2, 1.0, -0.7], alvo: [0.12, 0.86, -1.55], fov: 44 }, { pos: [0.55, 1.32, 0.9], alvo: [0.0, 1.12, -2.1], fov: 44 }, pc(p, 0.38, 1));
      }
      if (p > 0.36 && p < 0.42) K.som('whoosh', B.inicio + 0.38 * B.dur);
      K.som('bip', B.inicio + 0.05);
    },
    colega(B, tc) {
      CS.usar('escritorio_azul'); K.clima('normal');
      // o colega atravessa as baias, feliz, e a câmera acompanha de lado, um pouco à frente
      const pos = colega.irPara([-3.4, 0, 1.6], [1.6, 0, 1.6], B.p * 1.12, tc, { olhar: [1.6, 0, 6] });
      colega.humor('feliz');
      if (B.p * 1.12 >= 1) colega.acenar(tc);
      const x = pos[0];
      K.plano({ pos: [x + 0.5, 1.2, 4.6], alvo: [x + 0.25, 1.0, 1.4], fov: 46 }, { pos: [x + 0.8, 1.25, 4.2], alvo: [x + 0.25, 1.0, 1.4], fov: 44 }, B.p);
      K.som('passo-1', B.inicio + 0.2); K.som('passo-2', B.inicio + 0.6);
    },
    segredo(B, tc) {
      CS.usar('escritorio_azul'); K.clima('normal');
      colega.colocar([1.4, 0, 3.35], 0);
      colega.humor('feliz');
      colega.segurar();
      celCol.g.visible = true; celCol.g.position.set(1.4, 1.02, 3.72); celCol.g.rotation.set(-0.12, 0, 0);
      // a lista de leads rola e o dedo toca na primeira empresa; no fim, a análise dela
      const rolar = K.suave(pc(B.p, 0.5, 0.8)), toca = B.p > 0.8 && B.p < 0.88;
      if (B.p < 0.88) celCol.mostrar('lista', { rolar, toque: toca ? [0.42, 0.33] : null }); else celCol.mostrar('analise', { rolar: pc(B.p, 0.9, 1) * 0.6 });
      // de perto do colega, a câmera mergulha no celular até a tela do Mappoa ocupar o quadro (acelera no fim)
      const x = Math.pow(K.clamp(B.p / 0.55), 2.2);
      K.plano({ pos: [1.75, 1.45, 5.6], alvo: [1.4, 1.2, 3.4], fov: 44 }, { pos: [1.4, 1.03, 4.62], alvo: [1.4, 1.01, 3.72], fov: 40 }, x);
      K.som('whoosh', B.inicio + 0.3 * B.dur);
    },
    noite(B, tc) {
      const C = CS.usar('predio_noite'); K.clima('noite');
      const j = C.lugares.janela;
      // da janela acesa até o prédio inteiro (afasta rápido e assenta)
      const x = 1 - Math.pow(1 - B.p, 2.4);
      K.plano({ pos: [j[0] + 0.15, j[1] + 0.1, j[2] + 1.7], alvo: [j[0], j[1], j[2]], fov: 44 }, { pos: [-7.5, 1.6, 12], alvo: [-0.5, 7.5, -2], fov: 50 }, x);
    }
  };

  function cena(tc, t) {
    const B = K.blocoEm(bl, tc);
    [eu, colega].forEach((b) => { b.g.visible = false; });
    celEu.visible = false; celCol.g.visible = false;
    (PLANOS[B.plano] || PLANOS.gancho)(B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0.6, 0.6) };
})();
