// Mostruário do kit do Mappoa (canal/pecas/mappoa.js): uma peça ou tela por frase, pra conferir o visual. Não é vídeo de postar.
(function () {
  let bl, C, robo, logo, mapa, lupa, cartao, moedas, funil, peneira, site, painel, largo, O;
  const ladoA = [-22, 18, -14, 24, -18, 14];

  function montar(tl) {
    bl = K.blocos(tl);
    C = K.cenario('estudio');
    O = C.centro;
    const pos = (g, d) => { g.position.set(O[0] + d[0], O[1] + d[1], O[2] + d[2]); K.lugar(g); };
    robo = K.roboMappoa(); pos(robo.g, [0, 0, 0]); K.nomear('robo', robo.g);
    logo = K.logoMappoa(1.6); pos(logo.g, [0, 1.2, 0]); K.nomear('logo', logo.g);
    mapa = K.mapaMappoa(5, 5); pos(mapa.g, [0, 0.05, 0]); K.nomear('mapa', mapa.g);
    lupa = K.lupaMappoa(0.7); pos(lupa.g, [-0.55, 1.85, 0]); K.nomear('lupa', lupa.g);
    cartao = K.cartaoLeadMappoa({ ...K.MAPPOA.exemplos[1], enr: true, chips: ['whats', 'tel', 'email', 'insta', 'site'] }); pos(cartao.g, [0, 0.85, 0.2]); K.nomear('cartao', cartao.g);
    moedas = ['whats', 'email', 'insta', 'site'].map((t, i) => { const m = K.moedaContatoMappoa(t, 0.5); pos(m.g, [0.2 + (i % 2) * 0.58, 2.1 - Math.floor(i / 2) * 0.58, 0.1]); return m; });
    funil = K.funilMappoa(0.72); pos(funil.g, [-0.72, 0.1, 0]); K.nomear('funil', funil.g);
    peneira = K.peneiraMappoa(0.46); peneira.g.rotation.x = 0.95; pos(peneira.g, [0.72, 1.0, 0]); K.nomear('peneira', peneira.g);
    site = K.siteAntigoMappoa(); pos(site.g, [0, 0, 0]); K.nomear('site', site.g);
    painel = K.painelMappoa(1.56, 2.6, { px: 800 }); pos(painel.g, [0, 1.5, 0]); K.nomear('painel', painel.g);
    largo = K.painelMappoa(2.5, 1.56, { px: 1000 }); pos(largo.g, [0, 1.4, 0]); K.nomear('largo', largo.g);
  }

  const todos = () => [robo, logo, mapa, lupa, cartao, ...moedas, funil, peneira, site, painel, largo];
  const filme = (g, B, mov, tam, i) => K.filmar(g.position.toArray(), mov, B.p, { tam, plano: 'medio', lado: ladoA[i % ladoA.length] });
  const tela = (qual, nome, e, B, i) => {
    qual.g.visible = true; qual.mostrar(nome, e);
    qual.g.rotation.y = Math.sin(B.t * 0.9) * 0.05;
    K.filmar(qual.g.position.toArray(), i % 2 ? 'chegando' : 'parado', B.p, { tam: qual === largo ? 2.35 : 1.5, plano: 'perto', lado: i % 2 ? 8 : -8 });
  };

  const P = {
    robo(B, tc) { robo.g.visible = true; robo.em(tc, { acena: 0.7 }); K.filmar([O[0], O[1] + 0.75, O[2]], 'chegando', B.p, { tam: 1.0, plano: 'medio', lado: -18 }); },
    logo(B, tc) { logo.g.visible = true; logo.em(tc); K.filmar(logo.g.position.toArray(), 'parado', B.p, { tam: 1.1, plano: 'medio', lado: 6 }); },
    mapa(B, tc) { mapa.g.visible = true; mapa.em(tc, 1 + B.p * 9); K.filmar([O[0], O[1] + 0.3, O[2]], 'girando', B.p, { tam: 2.2, plano: 'medio', altura: 3 }); },
    objetos(B, tc) { lupa.g.visible = cartao.g.visible = true; moedas.forEach((m) => { m.g.visible = true; m.em(tc); }); lupa.em(tc); K.filmar([O[0], O[1] + 1.4, O[2]], 'parado', B.p, { tam: 1.45, plano: 'medio', lado: 8 }); },
    funil(B, tc) { funil.g.visible = peneira.g.visible = true; funil.em(tc); peneira.em(tc, 0.3); K.filmar([O[0], O[1] + 0.85, O[2]], 'chegando', B.p, { tam: 1.7, plano: 'medio', lado: -6 }); },
    site(B, tc) { site.g.visible = true; site.desatualizar(tc); K.filmar([O[0], O[1] + 0.85, O[2]], 'parado', B.p, { tam: 1.2, plano: 'medio', lado: 16 }); },
    t_busca(B) { tela(painel, 'busca', { digitado: 1 }, B, 0); },
    t_captura(B) { tela(painel, 'captura', { busca: 'Dentistas em Campinas, SP', novos: 41, encontrados: 34 + 7, progresso: 0.34, etapa: 4 }, B, 1); },
    t_resultado(B) { tela(painel, 'resultado', {}, B, 2); },
    t_lista(B) { tela(painel, 'lista', {}, B, 3); },
    t_enriquecer(B) { tela(painel, 'enriquecer', {}, B, 4); },
    t_analise(B) { tela(painel, 'analise', {}, B, 5); },
    t_mensagem(B) { tela(painel, 'mensagem', {}, B, 6); },
    t_funil(B) { tela(largo, 'funil', { mover: 0.45 }, B, 7); },
    t_planilha(B) { tela(largo, 'planilha', {}, B, 8); },
    t_mapa(B) { tela(painel, 'mapaBusca', {}, B, 10); },
    capa(B, tc) { robo.g.visible = true; robo.em(1, { acena: 1 }); K.filmar([O[0], O[1] + 0.75, O[2]], 'parado', 0, { tam: 1.0, plano: 'medio', lado: -18, espacoCima: 0.35 }); void tc; }
  };

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2 } : K.blocoEm(bl, tc);
    K.sombraLisaMappoa();
    todos().forEach((o) => { o.g.visible = false; });
    P[B.plano](B, tc);
  }
  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
