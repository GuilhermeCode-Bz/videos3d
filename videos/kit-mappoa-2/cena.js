// Mostruário dos cenários do canal e do catálogo de modelos (K.m3d). Testa também vários cenários no mesmo vídeo. Não é vídeo de postar.
(function () {
  let bl, CS, menino, estudio;
  const paginas = [], P = {};
  const NOMES = ['agencia', 'home_office', 'sala_reuniao', 'clinica_odonto', 'academia', 'salao_beleza', 'pizzaria', 'loja_roupas', 'central_mappoa', 'mundo_mappoa', 'cidade_maquete', 'cidade'];
  function ajustar(m, x, y, tam) {
    m.position.set(0, 0, 0); m.scale.setScalar(1); m.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(m), s = new THREE.Vector3(), c = new THREE.Vector3(); b.getSize(s); b.getCenter(c);
    const e = tam / Math.max(s.x, s.y, s.z, 0.001); m.scale.setScalar(e); m.position.set(x - c.x * e, y - c.y * e, -c.z * e);
  }
  function rotulo(pai, s, x, y) {
    const t = K.telaCanvas(1.45, 0.22, 420); t.m.material.transparent = true;
    t.desenhar((c, w, h) => { c.clearRect(0, 0, w, h); c.fillStyle = '#ffffff'; c.beginPath(); c.roundRect(0, 0, w, h, 20); c.fill(); c.font = '800 34px Montserrat, sans-serif'; c.fillStyle = '#0f172a'; c.textAlign = 'center'; c.textBaseline = 'middle'; let z = 34; while (c.measureText(s).width > w - 20 && z > 12) { z -= 1; c.font = `800 ${z}px Montserrat, sans-serif`; } c.fillText(s, w / 2, h / 2 + 2); }, s);
    t.m.position.set(x, y, 0.7); pai.add(t.m);
  }
  function montar(tl) {
    bl = K.blocos(tl);
    CS = K.cenarios([...NOMES, ['estudio', { pedestal: false, cor: 0xe9f1fe }]]);
    menino = K.boneco({ roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    NOMES.forEach((n) => {
      P['c_' + n] = (B, tc) => {
        const C = CS.usar(n);
        menino.g.visible = true; menino.colocar(C.personagem, C.centro); menino.reagir('mostrando', tc - B.inicio);
        const v = C.vista, d = n === 'cidade_maquete' ? 1 : 1.0;
        K.plano({ pos: v.pos, alvo: v.alvo }, { pos: [v.pos[0] - 0.5 * d, v.pos[1], v.pos[2] - 0.5 * d], alvo: v.alvo }, B.p);
      };
    });
    const pr = new THREE.Group(); K.scene.add(pr); CS.todos.agencia.grupo.add(pr);
    [['mappoa-moveis/sofá', [-2.6, 0, -0.4], 40], ['mappoa/robô-do-mappoa', [-0.7, 0, 0.8], 15], ['mappoa-nichos/dente', [-1.6, 0, 1.9], 20], ['mappoa/logo-3d', [0.4, 0, -1.6], 0], ['mappoa-vendas/gráfico-de-barras-em-3d', [-1.9, 0, -2.2], 0], ['mappoa-vendas/empresa-em-miniatura', [0.5, 0, 2.2], -20], ['mappoa-telas/planilha-exportada', [-1.3, 1.4, -3.2], 0]].forEach(([n, pos, giro]) => K.modelo(n, { escala: 5, pos, giro, pai: pr }));
    P.prontos = (B, tc) => { const C = CS.usar('agencia'); menino.g.visible = true; menino.colocar(C.personagem, C.centro); menino.reagir('mostrando', tc - B.inicio); K.plano({ pos: [2.6, 2.3, 9], alvo: [-0.8, 1.2, -1] }, { pos: [2.2, 2.3, 8.6], alvo: [-0.8, 1.2, -1] }, B.p); };
    const itens = K.m3d.lista();
    for (let i = 0; i < Math.ceil(itens.length / 6); i++) {
      const g = new THREE.Group(); K.scene.add(g); K.lugar(g); K.nomear('pagina' + i, g); paginas.push(g);
      itens.slice(i * 6, i * 6 + 6).forEach((it, j) => {
        const x = (j % 2 ? 1 : -1) * 0.82, y = 3.85 - Math.floor(j / 2) * 1.5, op = it.nome === 'mapa' ? { pinos: 5 } : {};
        const m = K.m3d(it.nome, op); const emu = m.userData.m3d;
        if (emu && emu.mostrar) emu.mostrar('lista', {});
        if (["tapete", "pizza", "caixa_pizza", "pilha_cartoes", "mapa", "peneira"].includes(it.nome)) m.rotation.x = 0.85; g.add(m); ajustar(m, x, y + 0.1, 1.05); rotulo(g, it.titulo, x, y - 0.66);
      });
      P['p_' + i] = (B) => { CS.usar('estudio'); paginas[i].visible = true; K.plano({ pos: [0, 2.2, 9.6], alvo: [0, 2.2, 0] }, { pos: [0, 2.2, 9.4], alvo: [0, 2.2, 0] }, B.p); };
    }
  }
  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2 } : K.blocoEm(bl, tc);
    K.sombraLisaMappoa(); menino.g.visible = false; paginas.forEach((p) => { p.visible = false; });
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'c_agencia') };
})();
