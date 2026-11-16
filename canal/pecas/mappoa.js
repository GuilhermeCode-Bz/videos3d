// Kit visual do Mappoa, feito a partir do site, do código e do vídeo do produto. Referência: canal/referencias/mappoa-fluxo.md
// 3D: K.roboMappoa K.logoMappoa K.pinoMappoa K.mapaMappoa K.lupaMappoa K.funilMappoa K.peneiraMappoa K.siteAntigoMappoa
//     K.cartaoLeadMappoa K.moedaContatoMappoa · Painel com tela: K.painelMappoa(larg, alt, { px }).mostrar('busca', {...})
// Telas (K.telasMappoa): busca captura resultado lista enriquecer analise funil mensagem planilha mapaBusca
// Sempre com empresas inventadas (K.MAPPOA.exemplos). Títulos em Montserrat: o motor não tem a Space Grotesk do site.
(function () {
  const K = window.K;
  const M = K.MAPPOA = {
    azul: '#1067f8', azulEscuro: '#1d4ed8', ciano: '#0ea5d9', verde: '#00bc7b', marinho: '#050d1c', cinza: '#596571',
    fundo: '#f4f8fd', borda: '#e2e8f0', azulSuave: '#e9f1fe', verdeSuave: '#e3f8ef', whats: '#25d366', insta: '#e4405f',
    laranja: '#f59e0b', logoAzul: '#0b66e8', logoVerde: '#37b03f', logoCinza: '#cfd0d6',
    exemplos: [
      { nome: 'Clínica Sorriso Azul', end: 'Av. Central, 120', chips: ['whats', 'tel', 'site'] },
      { nome: 'Studio Pixel Design', end: 'Rua das Flores, 45', chips: ['whats', 'tel', 'site'] },
      { nome: 'Academia Corpo Leve', end: 'Rua do Bosque, 800', chips: ['whats', 'tel', 'site'] },
      { nome: 'Padaria Grão Dourado', end: 'Praça Nova, 12', chips: ['whats', 'tel'] },
      { nome: 'Boutique Vento Sul', end: 'Rua Direita, 310', chips: ['whats', 'tel', 'site'] },
      { nome: 'Pet Shop Patinha', end: 'Av. do Lago, 77', chips: ['tel', 'site'] }
    ]
  };
  const hex = (h) => parseInt(h.slice(1), 16);
  const FONTE = 'Montserrat, Arial, sans-serif';

  // ---------- Desenho 2D ----------
  function rr(c, x, y, w, h, r, fill, stroke, lw = 2) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); }
  }
  function tx(c, s, x, y, tam, cor = M.marinho, peso = 700, al = 'left', maxW) {
    c.font = `${peso} ${tam}px ${FONTE}`;
    if (maxW) { let t = tam; while (t > 8 && c.measureText(s).width > maxW) { t -= 1; c.font = `${peso} ${t}px ${FONTE}`; } }
    c.fillStyle = cor; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(s, x, y);
  }
  function linhas(c, s, x, y, maxW, lh, tam, cor, peso = 600) {
    c.font = `${peso} ${tam}px ${FONTE}`; const pal = String(s).split(' '); let l = '', yy = y;
    pal.forEach((p, i) => {
      const t = l ? l + ' ' + p : p;
      if (c.measureText(t).width > maxW && l) { tx(c, l, x, yy, tam, cor, peso); yy += lh; l = p; } else l = t;
      if (i === pal.length - 1 && l) tx(c, l, x, yy, tam, cor, peso);
    });
    return yy + lh;
  }
  function degrade(c, x, w) {
    const g = c.createLinearGradient(x, 0, x + w, 0);
    g.addColorStop(0, M.azul); g.addColorStop(0.55, M.ciano); g.addColorStop(1, M.verde); return g;
  }
  function botao(c, x, y, w, h, s, cheio = true) {
    if (cheio) rr(c, x, y, w, h, h / 2.4, degrade(c, x, w)); else rr(c, x, y, w, h, h / 2.4, '#fff', M.borda);
    tx(c, s, x + w / 2, y + h / 2 + 1, h * 0.36, cheio ? '#fff' : M.marinho, 800, 'center', w - 24);
  }
  function fundoApp(c, w, h) {
    c.fillStyle = M.fundo; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(16,103,248,.05)'; c.lineWidth = 1;
    for (let x = 0; x < w; x += 40) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
    for (let y = 0; y < h; y += 40) { c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke(); }
  }
  // O M do logo: os pedaços de mapa (coordenadas do ícone original, 0 a 1254)
  const PECAS_LOGO = [
    [M.logoAzul, [[325, 180], [425, 180], [627, 382], [830, 180], [930, 180], [930, 262], [655, 535], [600, 535], [325, 262]]],
    [M.logoAzul, [[325, 310], [420, 405], [428, 425], [385, 520], [375, 522], [325, 488]]],
    [M.logoCinza, [[460, 450], [575, 565], [575, 595], [510, 650], [415, 560], [415, 545]]],
    [M.logoCinza, [[930, 310], [930, 490], [880, 522], [812, 435], [815, 420]]],
    [M.logoVerde, [[775, 468], [838, 545], [742, 648], [680, 595], [680, 565]]],
    [M.logoVerde, [[325, 545], [335, 545], [478, 680], [340, 835], [328, 830], [325, 700], [385, 682], [392, 660], [378, 645], [325, 658]]],
    [M.logoVerde, [[930, 545], [930, 810], [918, 835], [778, 685], [778, 672]]],
    [M.logoCinza, [[365, 860], [597, 628], [655, 628], [888, 860], [830, 860], [627, 690], [600, 690], [445, 840], [410, 860]]]
  ];
  function logo2d(c, x, y, tam) {
    const s = tam / 680; c.save(); c.translate(x - 627 * s, y - 520 * s); c.scale(s, s);
    PECAS_LOGO.forEach(([cor, p]) => { c.beginPath(); p.forEach(([a, b], i) => (i ? c.lineTo(a, b) : c.moveTo(a, b))); c.closePath(); c.fillStyle = cor; c.fill(); });
    c.beginPath(); c.arc(627, 578, 22, 0, 7); c.fillStyle = M.logoCinza; c.fill(); c.restore();
  }
  function topo(c, w, titulo, destaque) {
    logo2d(c, 44, 42, 44); tx(c, 'Mappoa', 76, 43, 25, M.marinho, 800);
    if (titulo) {
      tx(c, titulo, 24, 106, 36, M.marinho, 800);
      c.font = `800 36px ${FONTE}`; const dx = c.measureText(titulo + ' ').width;
      tx(c, destaque, 24 + dx, 106, 36, M.azul, 800);
    }
  }
  const CHIP = { whats: ['WhatsApp', '#16a34a', '#e6f9ed'], tel: ['Telefone', '#475569', '#eef2f7'], site: ['Site', M.azul, M.azulSuave], email: ['E-mail', M.azul, M.azulSuave], insta: ['Instagram', '#d6336c', '#fdebf1'] };
  function chip(c, x, y, tipo, tam = 17) {
    const [s, cor, bg] = CHIP[tipo]; c.font = `700 ${tam}px ${FONTE}`;
    const w = c.measureText(s).width + tam * 1.9, h = tam * 1.9;
    rr(c, x, y, w, h, h / 2, bg); c.beginPath(); c.arc(x + tam * 0.75, y + h / 2, tam * 0.27, 0, 7); c.fillStyle = cor; c.fill();
    tx(c, s, x + tam * 1.3, y + h / 2 + 1, tam, cor, 700); return x + w + 8;
  }
  function cartaoLead(c, x, y, w, h, l, op = {}) {
    rr(c, x, y, w, h, 20, '#fff', op.sel ? M.azul : M.borda, op.sel ? 3 : 2);
    tx(c, l.nome, x + 20, y + 30, 25, M.marinho, 800, 'left', w - 40);
    tx(c, l.end, x + 20, y + 60, 18, M.cinza, 500, 'left', w - 40);
    let cx = x + 20;
    if (l.enr) { rr(c, cx, y + 77, 122, 26, 13, M.verde); tx(c, 'enriquecido', cx + 61, y + 91, 15, '#fff', 800, 'center'); cx += 130; rr(c, cx, y + 77, 96, 26, 13, M.azulSuave); tx(c, 'Completo', cx + 48, y + 91, 15, M.azul, 800, 'center'); }
    const ty = l.enr ? y + 112 : y + 82; let ix = x + 20;
    (l.chips || []).forEach((t) => { ix = chip(c, ix, ty, t, 16); });
  }
  function roboChapa(c, x, y, s) {
    rr(c, x - 3 * s, y - 62 * s, 6 * s, 18 * s, 3 * s, '#38b6ee'); c.beginPath(); c.arc(x, y - 66 * s, 8 * s, 0, 7); c.fillStyle = '#4fd3ff'; c.fill();
    rr(c, x - 48 * s, y - 44 * s, 96 * s, 78 * s, 36 * s, '#dff3fd', '#38b6ee', 4 * s);
    rr(c, x - 36 * s, y - 28 * s, 72 * s, 42 * s, 20 * s, '#0b1f3a');
    c.fillStyle = '#4fe3ff'; c.beginPath(); c.arc(x - 15 * s, y - 7 * s, 8 * s, 0, 7); c.arc(x + 15 * s, y - 7 * s, 8 * s, 0, 7); c.fill();
    rr(c, x - 34 * s, y + 38 * s, 68 * s, 44 * s, 18 * s, '#38b6ee'); rr(c, x - 46 * s, y + 50 * s, 92 * s, 30 * s, 6 * s, '#e9f7ee', M.verde, 3 * s);
    c.fillStyle = M.azul; c.beginPath(); c.arc(x, y + 62 * s, 7 * s, 0, 7); c.fill();
  }
  function etapa(c, x, y, w, s, est) {
    const f = est === 2 ? M.verdeSuave : est === 1 ? M.azulSuave : '#f3f5f8';
    rr(c, x, y, w, 56, 16, f, est === 1 ? M.azul : null);
    c.beginPath(); c.arc(x + 26, y + 28, 11, 0, 7); c.fillStyle = est === 2 ? M.verde : est === 1 ? M.azul : '#cdd5df'; c.fill();
    if (est) { c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.moveTo(x + 20, y + 28); c.lineTo(x + 25, y + 33); c.lineTo(x + 33, y + 23); c.stroke(); }
    tx(c, s, x + 46, y + 29, 18, est ? M.marinho : '#94a3b8', est === 1 ? 800 : 600, 'left', w - 56);
  }
  function numeroBox(c, x, y, w, h, rot, v, azul) {
    rr(c, x, y, w, h, 18, azul ? M.azulSuave : '#fff', M.borda);
    tx(c, rot, x + 14, y + 26, 16, M.cinza, 600, 'left', w - 24); tx(c, String(v), x + 14, y + h - 32, 38, azul ? M.azul : M.marinho, 800, 'left', w - 24);
  }
  function pilulas(c, x, y, w, itens, bg, cor) {
    let yy = y;
    itens.forEach((s) => {
      const ini = yy; const prox = (() => { c.font = `600 18px ${FONTE}`; let n = 1, l = ''; String(s).split(' ').forEach((p) => { const t = l ? l + ' ' + p : p; if (c.measureText(t).width > w - 32 && l) { n++; l = p; } else l = t; }); return n; })();
      const h = prox * 25 + 16; rr(c, x, ini, w, h, 14, bg); linhas(c, s, x + 16, ini + 20, w - 32, 25, 18, cor, 600); yy += h + 8;
    });
    return yy;
  }

  // ---------- Telas (desenhadas numa largura de 540) ----------
  const T = K.telasMappoa = {
    busca(c, w, h, e = {}) {
      fundoApp(c, w, h); topo(c, w, 'Encontrar', 'novos leads');
      rr(c, 18, 150, w - 36, h - 170, 28, '#fff', M.borda);
      tx(c, 'Sua próxima busca', 42, 196, 28, M.marinho, 800);
      const nicho = e.nicho || 'clínicas odontológicas', d = e.digitado == null ? 1 : e.digitado;
      const campo = (x, y, l, rot, v, ativo) => {
        tx(c, rot, x, y, 20, M.marinho, 700); rr(c, x, y + 18, l, 62, 16, '#fff', ativo ? M.azul : M.borda, ativo ? 3 : 2);
        tx(c, v, x + 18, y + 50, 23, M.marinho, 700, 'left', l - 32);
      };
      const n = Math.floor(nicho.length * d);
      campo(42, 250, w - 84, 'Nicho', nicho.slice(0, n) + (d < 1 ? '|' : ''), d < 1);
      campo(42, 356, 170, 'Estado', d >= 1 ? (e.estado || 'SP') : 'Selecione');
      campo(230, 356, w - 272, 'Cidade', d >= 1 ? (e.cidade || 'Campinas') : 'Selecione');
      campo(42, 462, w - 84, 'Quantidade', d >= 1 ? (e.qtd || 'Todos os leads disponíveis') : '');
      botao(c, 42, 590, w - 84, 76, e.apertado ? 'Buscando...' : 'Buscar leads');
    },
    captura(c, w, h, e = {}) {
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      const g = c.createLinearGradient(0, 0, w, 260); g.addColorStop(0, '#e6f0ff'); g.addColorStop(1, '#dff7ee'); c.fillStyle = g; c.fillRect(0, 0, w, 300);
      roboChapa(c, w / 2, 96, 0.9); tx(c, 'MAPPOA', w / 2, 192, 28, M.marinho, 900, 'center');
      tx(c, 'Encontrando novos leads', w / 2, 240, 31, M.marinho, 800, 'center', w - 40);
      const novos = Math.round(e.novos || 0);
      rr(c, 24, 318, w - 48, 104, 20, '#fff', M.borda);
      tx(c, 'PESQUISA', 44, 346, 14, M.cinza, 800); tx(c, e.busca || 'Designer em São Paulo, SP', 44, 386, 22, M.marinho, 800, 'left', 310);
      rr(c, w - 170, 334, 130, 72, 16, M.azulSuave); tx(c, String(novos), w - 105, 372, 36, M.azul, 800, 'center');
      const p = K.clamp(e.progresso || 0);
      tx(c, 'Progresso de novos leads', 24, 454, 20, M.marinho, 800); tx(c, Math.round(p * 100) + '%', w - 24, 454, 20, M.azul, 800, 'right');
      rr(c, 24, 474, w - 48, 14, 7, '#dbe7f7'); if (p > 0.01) rr(c, 24, 474, (w - 48) * p, 14, 7, degrade(c, 24, w - 48));
      const et = ['Preparando captura', 'Conectando à extensão', 'Abrindo o Google Maps', 'Aguardando resultados', 'Salvando novos leads', 'Finalizando'];
      const atual = e.etapa == null ? 4 : e.etapa, lw = (w - 60) / 2;
      et.forEach((s, i) => etapa(c, 24 + (i % 2) * (lw + 12), 506 + Math.floor(i / 2) * 66, lw, s, i < atual ? 2 : i === atual ? 1 : 0));
      const bw = (w - 72) / 3, by = 716;
      numeroBox(c, 24, by, bw, 116, 'Encontrados', Math.round(e.encontrados == null ? novos : e.encontrados));
      numeroBox(c, 36 + bw, by, bw, 116, 'Novos', novos, true);
      numeroBox(c, 48 + 2 * bw, by, bw, 116, 'Existentes', Math.round(e.existentes || 0));
    },
    resultado(c, w, h, e = {}) {
      fundoApp(c, w, h); topo(c, w);
      c.beginPath(); c.arc(w / 2, 150, 54, 0, 7); c.fillStyle = M.verde; c.fill();
      c.strokeStyle = '#fff'; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath(); c.moveTo(w / 2 - 25, 150); c.lineTo(w / 2 - 6, 170); c.lineTo(w / 2 + 28, 130); c.stroke(); c.lineCap = 'butt';
      tx(c, 'Captura concluída', w / 2, 244, 36, M.marinho, 800, 'center', w - 40);
      const bw = (w - 60) / 2, bh = 128;
      numeroBox(c, 24, 290, bw, bh, 'Encontrados', e.encontrados ?? 99); numeroBox(c, 36 + bw, 290, bw, bh, 'Novos', e.novos ?? 99, true);
      numeroBox(c, 24, 430, bw, bh, 'Atualizados', e.atualizados ?? 0); numeroBox(c, 36 + bw, 430, bw, bh, 'Duração', e.duracao || '2min 7s');
      rr(c, 24, 576, w - 48, 104, 20, '#fff', M.borda); tx(c, 'PESQUISA REALIZADA', 44, 606, 15, M.cinza, 800);
      tx(c, e.busca || 'Designer em São Paulo, SP', 44, 646, 25, M.marinho, 800, 'left', w - 88);
      botao(c, 24, 700, w - 48, 76, 'Ver leads e continuar');
    },
    lista(c, w, h, e = {}) {
      fundoApp(c, w, h); topo(c, w, 'Meus', 'leads');
      const tot = e.total ?? 99, cs = e.comSite ?? 65, ss = e.semSite ?? 34;
      rr(c, 18, 140, w - 36, 54, 16, '#fff', M.borda); tx(c, `${tot} leads · ${cs} com site · ${ss} sem site`, 36, 168, 21, M.marinho, 700, 'left', w - 72);
      const grupo = e.grupo || 'COM SITE';
      tx(c, grupo, 24, 222, 22, M.marinho, 800); c.font = `800 22px ${FONTE}`; const dx = c.measureText(grupo).width;
      rr(c, 34 + dx, 208, 58, 28, 14, M.azulSuave); tx(c, String(grupo === 'SEM SITE' ? ss : cs), 63 + dx, 223, 18, M.azul, 800, 'center');
      const itens = e.itens || M.exemplos, n = e.n == null ? itens.length : e.n;
      let y = 248;
      for (let i = 0; i < Math.min(n, itens.length) && y < h - 20; i++) {
        const l = itens[i], alt = l.enr ? 158 : 128;
        cartaoLead(c, 18, y, w - 36, alt, l, { sel: e.sel === i }); y += alt + 12;
      }
    },
    enriquecer(c, w, h, e = {}) {
      fundoApp(c, w, h); topo(c, w);
      tx(c, 'Enriquecer leads', 24, 112, 36, M.marinho, 800);
      const op = (y, tit, itens, sel) => {
        rr(c, 18, y, w - 36, 278, 24, sel ? '#f5f9ff' : '#fff', sel ? M.azul : M.borda, sel ? 4 : 2);
        const yy = linhas(c, tit, 42, y + 44, w - 90, 36, 29, M.marinho, 800);
        itens.forEach((s, i) => { const iy = yy + 4 + i * 38; c.strokeStyle = M.verde; c.lineWidth = 4; c.beginPath(); c.moveTo(44, iy); c.lineTo(52, iy + 8); c.lineTo(65, iy - 8); c.stroke(); tx(c, s, 78, iy, 20, M.cinza, 600, 'left', w - 120); });
        if (sel) { c.beginPath(); c.arc(w - 54, y + 42, 17, 0, 7); c.fillStyle = M.azul; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.moveTo(w - 62, y + 42); c.lineTo(w - 56, y + 49); c.lineTo(w - 45, y + 35); c.stroke(); }
      };
      op(150, 'Contatos e presença digital', ['E-mails e canais públicos', 'Instagram, LinkedIn e Facebook', 'YouTube, TikTok e outras redes'], e.tipo === 1);
      op(444, 'Inteligência comercial completa', ['Aderência à sua oferta', 'Dores, oportunidades, objeções', 'Abordagem pronta'], e.tipo !== 1);
      botao(c, 18, 738, w - 36, 76, 'Iniciar enriquecimento');
    },
    analise(c, w, h, e = {}) {
      fundoApp(c, w, h); topo(c, w);
      tx(c, e.nome || 'Studio Pixel Design', 24, 112, 34, M.marinho, 800, 'left', w - 48);
      rr(c, 24, 140, 132, 30, 15, M.verde); tx(c, 'enriquecido', 90, 156, 17, '#fff', 800, 'center');
      rr(c, 164, 140, 106, 30, 15, M.azulSuave); tx(c, 'Completo', 217, 156, 17, M.azul, 800, 'center');
      const ate = e.ate == null ? 4 : e.ate, a = K.clamp(e.aderencia == null ? 0.82 : e.aderencia);
      rr(c, 18, 186, w - 36, 92, 20, '#fff', M.borda); tx(c, 'Aderência à sua oferta', 38, 216, 22, M.marinho, 800);
      rr(c, 38, 240, w - 76, 18, 9, '#dbe7f7'); rr(c, 38, 240, Math.max(18, (w - 76) * a), 18, 9, degrade(c, 38, w - 76));
      let y = 296; const az = M.azulSuave, azt = '#1454c0';
      const bloco = (i, tit, itens) => { if (ate < i) return; tx(c, tit, 24, y + 8, 21, M.marinho, 900); y = pilulas(c, 18, y + 30, w - 36, itens, az, azt) + 6; };
      bloco(1, 'DORES PROVÁVEIS', e.dores || ['Site com cara de modelo pronto', 'Sem portfólio atualizado']);
      bloco(2, 'OPORTUNIDADES', e.oportunidades || ['Refazer o site com casos reais']);
      bloco(3, 'OBJEÇÕES PROVÁVEIS', e.objecoes || ['"Não temos orçamento agora"']);
      if (ate >= 4 && y < h - 60) { rr(c, 18, y, w - 36, Math.min(h - y - 14, 118), 18, '#f3f6fa'); tx(c, 'Abordagem recomendada', 36, y + 28, 20, M.marinho, 900); linhas(c, e.abordagem || 'Comece pelo site dela: mostre o que está afastando cliente.', 36, y + 58, w - 72, 25, 18, M.cinza, 600); }
    },
    funil(c, w, h, e = {}) {
      fundoApp(c, w, h);
      tx(c, e.nome || 'CAMPANHA DE CONVERSÃO', 16, 28, 22, M.azul, 900, 'left', w - 32);
      const cols = [['Novos', '#94a3b8'], ['Contato enviado', M.azul], ['Follow-up', M.laranja], ['Respondeu', M.verde]];
      const cw = (w - 40) / 4, nomes = e.itens || M.exemplos, m = K.clamp(e.mover || 0), ch = 78;
      cols.forEach(([s, cor], i) => {
        const x = 8 + i * (cw + 8);
        rr(c, x, 54, cw, h - 64, 12, '#fff', M.borda); c.fillStyle = cor; c.fillRect(x + 8, 54, cw - 16, 5);
        tx(c, s, x + 9, 80, 16, M.marinho, 800, 'left', cw - 18);
      });
      const carta = (x, y, l, op = 1) => { c.globalAlpha = op; rr(c, x, y, cw - 12, ch, 10, '#fff', M.borda); tx(c, l.nome.split(' ').slice(0, 2).join(' '), x + 8, y + 24, 15, M.marinho, 800, 'left', cw - 28); rr(c, x + 8, y + 46, 76, 22, 11, '#e6f9ed'); tx(c, 'WhatsApp', x + 46, y + 58, 12, '#16a34a', 800, 'center'); c.globalAlpha = 1; };
      for (let i = 1; i < 4 && i < nomes.length; i++) carta(14, 104 + (i - 1 + (m >= 1 ? 0 : 1)) * (ch + 6), nomes[i]);
      const sx = 14 + K.suave(m) * (cw + 8), sy = 104 - Math.sin(m * Math.PI) * 8; carta(sx, sy, nomes[0]);
    },
    mensagem(c, w, h, e = {}) {
      fundoApp(c, w, h); topo(c, w);
      tx(c, 'Mensagem personalizada', 24, 112, 31, M.marinho, 800, 'left', w - 48);
      tx(c, e.para || 'Para: Studio Pixel Design', 24, 150, 22, M.cinza, 600, 'left', w - 48);
      rr(c, 18, 182, w - 36, h - 300, 22, '#fff', M.borda);
      const s = e.texto || 'Oi, vi que o site de vocês ainda não mostra os trabalhos recentes. Faço isso para estúdios como o seu. Posso te mostrar uma ideia?';
      const d = e.digitado == null ? 1 : K.clamp(e.digitado);
      linhas(c, s.slice(0, Math.floor(s.length * d)), 42, 224, w - 84, 40, 26, M.marinho, 600);
      rr(c, 18, h - 98, w - 36, 76, 24, M.azul); tx(c, 'Enviar pelo WhatsApp', w / 2, h - 59, 28, '#fff', 800, 'center');
    },
    planilha(c, w, h, e = {}) {
      // Igual à exportação do Mappoa: faixa azul do título, faixa azul-escura, cabeçalho marinho e os links coloridos
      c.fillStyle = '#fff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2563eb'; c.fillRect(0, 0, w, 42); tx(c, 'MAPPOA — Leads Enriquecidos', w / 2, 22, 23, '#fff', 800, 'center');
      c.fillStyle = M.azulEscuro; c.fillRect(0, 42, w, 24); tx(c, `mappoa.com · ${e.total ?? 99} leads`, w / 2, 55, 13, '#fff', 600, 'center');
      const col = [[0, 150, 'Nome'], [150, 96, 'Telefone'], [246, 78, 'WhatsApp'], [324, 76, 'E-mail'], [400, 76, 'Instagram'], [476, 64, 'Site']];
      c.fillStyle = '#0f172a'; c.fillRect(0, 72, w, 28);
      col.forEach(([x, , s]) => tx(c, s, x + 7, 87, 12, '#fff', 800));
      const itens = e.itens || M.exemplos, n = e.n == null ? 9 : e.n, al = 26;
      for (let i = 0; i < n && 100 + i * al < h; i++) {
        const y = 100 + i * al + al / 2, l = itens[i % itens.length];
        tx(c, l.nome, 7, y, 12, '#0f172a', 600, 'left', 138); tx(c, '(00) 90000-0000', 157, y, 10.5, '#0f172a', 500);
        tx(c, 'WhatsApp', 285, y, 11, M.whats, 800, 'center'); tx(c, 'contato@...', 330, y, 10.5, '#2563eb', 600);
        tx(c, 'Instagram', 438, y, 11, M.insta, 800, 'center'); tx(c, 'SITE', 508, y, 11, '#2563eb', 800, 'center');
        c.strokeStyle = M.borda; c.lineWidth = 1; c.beginPath(); c.moveTo(0, 100 + (i + 1) * al); c.lineTo(w, 100 + (i + 1) * al); c.stroke();
      }
    },
    mapaBusca(c, w, h, e = {}) {
      // Um mapa genérico com a busca em cima (não é a tela de nenhum site de verdade)
      c.fillStyle = '#e8efe6'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#fff'; c.lineWidth = 22; [[0, 260, w, 180], [0, 540, w, 620], [140, 0, 90, h], [400, 0, 460, h]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); });
      c.fillStyle = '#bfe3f5'; c.beginPath(); c.ellipse(440, 400, 60, 90, 0.3, 0, 7); c.fill();
      c.fillStyle = '#cfe6c6'; c.fillRect(190, 300, 150, 150);
      const rand = K.rand(4), n = e.pinos == null ? 7 : e.pinos;
      for (let i = 0; i < n; i++) { const x = 40 + rand() * (w - 80), y = 140 + rand() * (h - 300); c.beginPath(); c.arc(x, y, 12, 0, 7); c.fillStyle = '#ea4335'; c.fill(); c.beginPath(); c.arc(x, y, 4, 0, 7); c.fillStyle = '#fff'; c.fill(); }
      rr(c, 20, 22, w - 40, 72, 36, '#fff', M.borda); tx(c, e.termo || 'dentista em Campinas', 50, 59, 28, M.marinho, 600, 'left', w - 90);
    }
  };

  // ---------- Peças 3D ----------
  function laje(w, h, d, r, mat) {
    const x = -w / 2, y = -h / 2, s = new THREE.Shape();
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const geo = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 3, curveSegments: 10 });
    geo.translate(0, 0, -d / 2); return K.malha(geo, mat);
  }
  const esfera = (r, cor, seg = 28) => K.malha(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), typeof cor === 'object' ? cor : K.mat(cor));
  const cil = (r1, r2, a, cor, seg = 24) => K.malha(new THREE.CylinderGeometry(r1, r2, a, seg), typeof cor === 'object' ? cor : K.mat(cor));
  const novo = () => { const g = new THREE.Group(); K.scene.add(g); return g; };

  // Painel flutuante com tela arredondada. p.mostrar('lista', { n: 3 }) desenha uma das telas; p.tela é o telaCanvas
  K.painelMappoa = function (larg = 1.5, alt = 2.5, op = {}) {
    const g = novo(), d = 0.05;
    const costas = laje(larg + 0.05, alt + 0.05, d, 0.13, K.mat(hex(op.borda || M.azul))); costas.position.z = -0.012; g.add(costas);
    const px = op.px || 760, t = K.telaCanvas(larg, alt, px);
    t.m.material.transparent = true; t.m.position.z = d / 2 + 0.02; g.add(t.m);
    const raio = (0.12 / larg) * 540;
    function mostrar(nome, e = {}) {
      t.desenhar((c, w, h) => {
        const s = w / 540, H = h / s; c.clearRect(0, 0, w, h); c.save(); c.scale(s, s);
        rr(c, 0, 0, 540, H, raio); c.clip(); T[nome](c, 540, H, e); c.restore();
      }, nome + JSON.stringify(e));
    }
    return { g, tela: t, mostrar, larg, alt };
  };

  // O robô mascote, com o mapa na mão. Altura ~1.45. r.em(t, { acena: 0 a 1, mapa: true, olhar: [x, z] })
  K.roboMappoa = function () {
    const g = novo(), casca = K.mat(0xdff3fd, { roughness: 0.35 }), azul = K.mat(0x38b6ee, { roughness: 0.4 });
    const corpoG = new THREE.Group(); g.add(corpoG);
    [-1, 1].forEach((l) => { const p = cil(0.06, 0.07, 0.2, azul); p.position.set(l * 0.13, 0.15, 0); const f = esfera(0.11, casca); f.scale.set(1, 0.6, 1.3); f.position.set(l * 0.13, 0.06, 0.03); g.add(p, f); });
    const corpo = esfera(0.3, azul); corpo.scale.set(1, 1.02, 0.86); corpo.position.y = 0.52; corpoG.add(corpo);
    const barriga = esfera(0.2, casca); barriga.scale.set(1, 1.05, 0.5); barriga.position.set(0, 0.5, 0.17); corpoG.add(barriga);
    const cabeca = new THREE.Group(); cabeca.position.y = 1.08; corpoG.add(cabeca);
    const cranio = esfera(0.36, casca); cranio.scale.set(1.14, 0.96, 0.96); cabeca.add(cranio);
    const visor = esfera(0.3, K.mat(0x0b1f3a, { roughness: 0.2 })); visor.scale.set(1.08, 0.72, 0.42); visor.position.z = 0.22; cabeca.add(visor);
    const brilhoOlho = new THREE.MeshBasicMaterial({ color: 0x4fe3ff });
    const olhos = [-1, 1].map((l) => { const o = K.malha(new THREE.SphereGeometry(0.062, 18, 14), brilhoOlho, false); o.position.set(l * 0.12, 0.01, 0.335); o.scale.z = 0.4; cabeca.add(o); return o; });
    [-1, 1].forEach((l) => { const e = cil(0.09, 0.09, 0.07, azul); e.rotation.z = Math.PI / 2; e.position.x = l * 0.42; cabeca.add(e); });
    const haste = cil(0.018, 0.018, 0.16, azul); haste.position.y = 0.42; cabeca.add(haste);
    const bola = K.malha(new THREE.SphereGeometry(0.058, 18, 14), brilhoOlho, false); bola.position.y = 0.52; cabeca.add(bola);
    const bracos = [-1, 1].map((l) => {
      const om = new THREE.Group(); om.position.set(l * 0.3, 0.68, 0.02);
      const b = cil(0.05, 0.05, 0.3, azul); b.position.y = -0.15; const m = esfera(0.075, casca); m.position.y = -0.33; om.add(b, m); corpoG.add(om); return om;
    });
    // O mapa aberto na frente da barriga
    const mapa = new THREE.Group(); mapa.position.set(0, 0.46, 0.34); mapa.rotation.x = -0.18; corpoG.add(mapa);
    const tm = K.telaCanvas(0.62, 0.4, 260);
    tm.desenhar((c, w, h) => {
      c.fillStyle = '#eef8f0'; c.fillRect(0, 0, w, h); c.strokeStyle = '#fff'; c.lineWidth = 10;
      [[0, h * 0.6, w, h * 0.3], [w * 0.3, 0, w * 0.5, h]].forEach(([a, b, x, y]) => { c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); });
      c.fillStyle = 'rgba(0,188,123,.4)'; c.fillRect(w * 0.6, h * 0.5, w * 0.3, h * 0.35); c.fillStyle = 'rgba(16,103,248,.3)'; c.fillRect(w * 0.08, h * 0.08, w * 0.18, h * 0.3);
      c.strokeStyle = 'rgba(5,13,28,.14)'; c.lineWidth = 2; [1, 2].forEach((i) => { c.beginPath(); c.moveTo((w * i) / 3, 0); c.lineTo((w * i) / 3, h); c.stroke(); });
    }, 'mapa');
    tm.m.position.z = 0.012; mapa.add(tm.m); mapa.add(laje(0.62, 0.4, 0.008, 0.012, K.mat(0xffffff)));
    const pino = K.pinoMappoa(M.azul, 0.3); pino.g.position.set(0.04, -0.04, 0.03); mapa.add(pino.g);
    return {
      g, cabeca, bracos, mapa,
      em(t, op = {}) {
        corpoG.position.y = Math.sin(t * 2.4) * (op.flutua == null ? 0.018 : op.flutua);
        cabeca.rotation.y = op.olhar ? op.olhar[0] : Math.sin(t * 0.9) * 0.14; cabeca.rotation.x = op.olhar ? op.olhar[1] || 0 : 0;
        const pisca = (t % 3.1) < 0.12 ? 0.12 : 1; olhos.forEach((o) => { o.scale.y = pisca; });
        bola.scale.setScalar(1 + Math.sin(t * 5) * 0.18);
        mapa.visible = op.mapa !== false; const ac = K.clamp(op.acena || 0);
        const seg = mapa.visible ? 1 : 0;
        bracos[0].rotation.set(-1.15 * seg, 0, -0.1 + 0.45 * seg);
        bracos[1].rotation.set(-1.15 * seg * (1 - ac), 0, (0.1 - 0.45 * seg) * (1 - ac) + ac * (2.5 + Math.sin(t * 9) * 0.35));
      }
    };
  };

  // O logo do Mappoa em 3D, de pé e virado pra +z. tam = altura
  K.logoMappoa = function (tam = 1.4) {
    const g = novo(), s = tam / 680;
    PECAS_LOGO.forEach(([cor, p]) => {
      const f = new THREE.Shape(); p.forEach(([a, b], i) => { const x = (a - 627) * s, y = -(b - 520) * s; if (i) f.lineTo(x, y); else f.moveTo(x, y); });
      const geo = new THREE.ExtrudeGeometry(f, { depth: 0.06 * tam, bevelEnabled: true, bevelSize: 0.012 * tam, bevelThickness: 0.012 * tam, bevelSegments: 3 });
      geo.translate(0, 0, -0.03 * tam); g.add(K.malha(geo, K.mat(hex(cor), { roughness: 0.35 })));
    });
    const ponto = cil(22 * s, 22 * s, 0.07 * tam, hex(M.logoCinza)); ponto.rotation.x = Math.PI / 2; ponto.position.y = -(578 - 520) * s; g.add(ponto);
    return { g, em(t) { g.rotation.y = Math.sin(t * 0.9) * 0.22; } };
  };

  // Pino de mapa. A ponta fica em y = 0; altura = tam
  K.pinoMappoa = function (cor = M.azul, tam = 1) {
    const g = new THREE.Group(); K.scene.add(g);
    const pts = []; for (let i = 0; i <= 32; i++) { const y = (1.02 * i) / 32; const r = y < 0.55 ? 0.247 * Math.pow(y / 0.55, 0.85) : Math.sqrt(Math.max(0, 0.09 - (y - 0.72) * (y - 0.72))); pts.push(new THREE.Vector2(Math.max(r, 0.0001), y)); }
    const geo = new THREE.LatheGeometry(pts, 36); geo.scale(tam, tam, tam);
    g.add(K.malha(geo, K.mat(hex(cor), { roughness: 0.32 })));
    [-1, 1].forEach((l) => { const b = esfera(0.125 * tam, 0xffffff, 20); b.scale.z = 0.6; b.position.set(0, 0.72 * tam, l * 0.24 * tam); g.add(b); });
    return { g, em(t, x = 1) { g.scale.setScalar(Math.max(0.0001, x)); g.rotation.y = Math.sin(t * 1.6) * 0.3; } };
  };

  // Mapa da cidade deitado (larg x prof), com quarteirões nas cores do logo e pinos. m.em(t, quantos pinos, de 0 a n)
  K.mapaMappoa = function (larg = 5, prof = 5, op = {}) {
    const g = novo(), d = 0.08;
    const base = laje(larg, prof, d, 0.2, K.mat(0xffffff)); base.rotation.x = -Math.PI / 2; g.add(base);
    const t = K.telaCanvas(larg - 0.1, prof - 0.1, 800); t.m.rotation.x = -Math.PI / 2; t.m.position.y = d / 2 + 0.018; g.add(t.m);
    t.desenhar((c, w, h) => {
      c.fillStyle = '#d7dde6'; c.fillRect(0, 0, w, h); const passo = w / 6, cor = [M.logoAzul, M.logoVerde, '#e8edf3', '#e8edf3', '#c9efdc', '#cfe0fb'], r = K.rand(11);
      for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) rr(c, i * passo + 12, j * (h / 6) + 12, passo - 24, h / 6 - 24, 18, cor[Math.floor(r() * cor.length)]);
    }, 'mapa');
    const r = K.rand(op.seed || 8), n = op.pinos || 9, pinos = [];
    for (let i = 0; i < n; i++) { const p = K.pinoMappoa(i % 3 === 2 ? M.verde : M.azul, 0.6); p.g.position.set((r() - 0.5) * (larg - 1), d, (r() - 0.5) * (prof - 1)); g.add(p.g); pinos.push(p); }
    return { g, pinos, em(t, q = n) { pinos.forEach((p, i) => p.em(t + i, K.saiVolta(K.clamp(q - i)))); } };
  };

  // Lupa com o vidro virado pra +z; a origem é o centro do vidro
  K.lupaMappoa = function (tam = 1) {
    const g = novo();
    g.add(K.malha(new THREE.TorusGeometry(0.42 * tam, 0.06 * tam, 16, 48), K.mat(hex(M.azul), { roughness: 0.3 })));
    const vidro = K.malha(new THREE.CircleGeometry(0.4 * tam, 40), new THREE.MeshStandardMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.35, roughness: 0.05, side: THREE.DoubleSide }), false); g.add(vidro);
    const cabo = cil(0.065 * tam, 0.085 * tam, 0.62 * tam, hex(M.marinho)); cabo.rotation.z = Math.PI / 4; cabo.position.set(0.53 * tam, -0.53 * tam, 0); g.add(cabo);
    return { g, em(t) { g.rotation.z = Math.sin(t * 2) * 0.08; } };
  };

  // Funil de 4 andares (Novos, Contato enviado, Follow-up, Respondeu). Base em y = 0
  K.funilMappoa = function (tam = 1) {
    const g = novo(), cores = [0x94a3b8, hex(M.azul), hex(M.laranja), hex(M.verde)], raios = [0.95, 0.73, 0.52, 0.34, 0.2];
    const andares = cores.map((cor, i) => { const m = cil(raios[i] * tam, raios[i + 1] * tam, 0.42 * tam, K.mat(cor, { roughness: 0.4 }), 40); m.position.y = (1.6 - i * 0.48) * tam; g.add(m); return m; });
    return { g, andares, em(t) { g.rotation.y = t * 0.3; } };
  };

  // Peneira com a trama: separa quem compra de quem nunca compraria. A origem é o centro do aro
  K.peneiraMappoa = function (tam = 1) {
    const g = novo(), R = 1.1 * tam;
    const aro = K.malha(new THREE.CylinderGeometry(R, R, 0.26 * tam, 48, 1, true), K.mat(hex(M.azul), { side: THREE.DoubleSide, roughness: 0.4 })); g.add(aro);
    [0.13, -0.13].forEach((y) => { const b = K.malha(new THREE.TorusGeometry(R, 0.03 * tam, 10, 48), K.mat(hex(M.azulEscuro))); b.rotation.x = Math.PI / 2; b.position.y = y * tam; g.add(b); });
    const fio = K.mat(0x8fa3bd);
    for (let i = -8; i <= 8; i++) {
      const o = (i / 8.5) * R, l = 2 * Math.sqrt(R * R - o * o);
      const a = K.malha(new THREE.CylinderGeometry(0.009 * tam, 0.009 * tam, l, 6), fio, false); a.rotation.z = Math.PI / 2; a.position.set(0, -0.08 * tam, o); g.add(a);
      const b = K.malha(new THREE.CylinderGeometry(0.009 * tam, 0.009 * tam, l, 6), fio, false); b.rotation.x = Math.PI / 2; b.position.set(o, -0.08 * tam, 0); g.add(b);
    }
    return { g, em(t, agita = 1) { g.position.x = g.userData.x0 == null ? (g.userData.x0 = g.position.x) : g.userData.x0 + Math.sin(t * 14) * 0.05 * agita; } };
  };

  // Computador velho com um site parado no tempo. s.tela.desenhar é do telaCanvas; s.desatualizar(k) pisca o "em construção"
  K.siteAntigoMappoa = function (op = {}) {
    const g = novo(), bege = K.mat(0xd8cfb8, { roughness: 0.7 });
    const caixa = K.malha(new THREE.BoxGeometry(1.5, 1.15, 1.05), bege); caixa.position.y = 0.92; g.add(caixa);
    const pe = K.malha(new THREE.BoxGeometry(0.8, 0.18, 0.7), bege); pe.position.y = 0.09; const co = cil(0.3, 0.38, 0.2, bege); co.position.y = 0.27; g.add(pe, co);
    const t = K.telaCanvas(1.26, 0.92, 500); t.m.position.set(0, 0.94, 0.532); g.add(t.m);
    const led = K.malha(new THREE.SphereGeometry(0.03, 10, 8), new THREE.MeshBasicMaterial({ color: 0x35d05c }), false); led.position.set(0.62, 0.42, 0.53); g.add(led);
    const nome = op.nome || 'PADARIA DO BAIRRO', ano = op.ano || '2014';
    function desatualizar(k) {
      const ligado = Math.floor(k * 3) % 2 === 0;
      t.desenhar((c, w, h) => {
        c.fillStyle = '#c0c0c0'; c.fillRect(0, 0, w, h); c.fillStyle = '#000080'; c.fillRect(0, 0, w, 54);
        c.font = '700 26px "Times New Roman", serif'; c.fillStyle = '#ffff00'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(nome, w / 2, 28);
        c.font = '700 40px "Times New Roman", serif'; c.fillStyle = '#b00020'; c.fillText('Seja bem-vindo!', w / 2, 100);
        c.fillStyle = ligado ? '#ffd400' : '#b8a000'; c.fillRect(30, 146, w - 60, 66); c.font = '700 28px "Courier New", monospace'; c.fillStyle = '#000'; c.fillText('SITE EM CONSTRUÇÃO', w / 2, 180);
        c.font = '400 24px "Times New Roman", serif'; c.fillStyle = '#0000ee'; c.fillText('Clique aqui', w / 2, 248); c.fillRect(w / 2 - 58, 262, 116, 2);
        c.fillStyle = '#333'; c.font = '400 22px "Times New Roman", serif'; c.fillText(`Última atualização: ${ano}`, w / 2, 310);
      }, 'antigo' + ligado);
    }
    desatualizar(0);
    return { g, tela: t, desatualizar };
  };

  // Cartão de empresa em 3D, igual ao da lista. op: { sel }
  K.cartaoLeadMappoa = function (lead = M.exemplos[0], op = {}) {
    const g = novo(), L = 1.5, A = lead.enr ? 0.48 : 0.39;
    g.add(laje(L, A, 0.03, 0.06, K.mat(0xffffff)));
    const t = K.telaCanvas(L - 0.03, A - 0.02, 560); t.m.material.transparent = true; t.m.position.z = 0.031; g.add(t.m);
    function desenhar(l = lead) { t.desenhar((c, w, h) => { const s = w / 540, H = h / s; c.clearRect(0, 0, w, h); c.save(); c.scale(s, s); cartaoLead(c, 2, 2, 536, H - 4, l, op); c.restore(); }, JSON.stringify(l)); }
    desenhar();
    return { g, tela: t, desenhar };
  };

  // Moeda de contato flutuando. tipo: 'whats' 'tel' 'email' 'insta' 'site'
  K.moedaContatoMappoa = function (tipo = 'whats', tam = 0.5) {
    const g = novo(), cores = { whats: M.whats, tel: '#64748b', email: M.azul, insta: M.insta, site: M.ciano };
    const corpo = cil(tam / 2, tam / 2, tam * 0.16, K.mat(hex(cores[tipo]), { roughness: 0.35 }), 40); corpo.rotation.x = Math.PI / 2; g.add(corpo);
    const t = K.telaCanvas(tam * 0.74, tam * 0.74, 200); t.m.material.transparent = true; t.m.position.z = tam * 0.085; g.add(t.m);
    t.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h); c.strokeStyle = '#fff'; c.fillStyle = '#fff'; c.lineWidth = w * 0.09; c.lineCap = 'round'; c.lineJoin = 'round'; const m = w / 2;
      if (tipo === 'email') { c.strokeRect(w * 0.14, h * 0.26, w * 0.72, h * 0.48); c.beginPath(); c.moveTo(w * 0.14, h * 0.26); c.lineTo(m, h * 0.55); c.lineTo(w * 0.86, h * 0.26); c.stroke(); }
      else if (tipo === 'insta') { rr(c, w * 0.16, h * 0.16, w * 0.68, h * 0.68, w * 0.2, null, '#fff', w * 0.09); c.beginPath(); c.arc(m, h / 2, w * 0.15, 0, 7); c.stroke(); c.beginPath(); c.arc(w * 0.67, h * 0.33, w * 0.04, 0, 7); c.fill(); }
      else if (tipo === 'site') { c.beginPath(); c.arc(m, h / 2, w * 0.36, 0, 7); c.stroke(); c.beginPath(); c.ellipse(m, h / 2, w * 0.15, w * 0.36, 0, 0, 7); c.stroke(); c.beginPath(); c.moveTo(w * 0.14, h / 2); c.lineTo(w * 0.86, h / 2); c.stroke(); }
      else { if (tipo === 'whats') { c.beginPath(); c.arc(m, h / 2, w * 0.36, 0.5, 6.0); c.stroke(); } c.lineWidth = w * (tipo === 'whats' ? 0.08 : 0.14); c.beginPath(); c.moveTo(w * 0.36, h * 0.34); c.quadraticCurveTo(w * 0.38, h * 0.62, w * 0.66, h * 0.66); c.stroke(); }
    }, tipo);
    return { g, em(t) { g.rotation.y = Math.sin(t * 2.2) * 0.45; } };
  };

  // Sombra lisa, sem riscos (regra do canal). Chamar no começo do quadro
  K.sombraLisaMappoa = function () {
    if (K.renderer.shadowMap.type === THREE.PCFSoftShadowMap && K.sol.shadow.normalBias === 0.05) return;
    K.renderer.shadowMap.type = THREE.PCFSoftShadowMap; K.sol.shadow.bias = -0.0005; K.sol.shadow.normalBias = 0.05;
    if (K.sol.shadow.map) { K.sol.shadow.map.dispose(); K.sol.shadow.map = null; }
    K.scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.needsUpdate = true; }); });
  };
})();
