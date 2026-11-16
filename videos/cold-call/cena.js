// Como funciona uma cold call (canal Mappoa, série "Como funciona a venda"). Cenário pronto: o escritório
// (K.cenario('escritorio')). A metade esquerda é a agência do Léo, a direita é a clínica do doutor, e a divisória no
// meio separa os dois lugares. Cada plano tem as linhas do bloco da ficha (roteiro.md) como comentário e o código
// embaixo. Tudo é função do tempo da cena (tc).
(function () {
  let tl, bl, C, menino, dr, comp, listaG, lista, agendaG, agenda, navG, nav, celG, cel, telG, fone, contatosG, pc, chkG, chk;
  let ordem = [];
  const fx = {};
  const casas = [];
  const mais = (p, d) => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];
  const quando = (palavra, B, frac) => { const t = K.quando(palavra, B.inicio); return t != null && t < B.ate ? t : B.inicio + frac * B.dur; };
  const pop = (t, d = 0.3) => (t <= 0 ? 0 : t >= d ? 1 : K.quica(t / d));
  const VERDE = '#2e9d5b';

  // Lugares do vídeo (o escritório vai de x -6,4 a 6,4; a parede do fundo fica em z -4,4)
  const PC = [-2.4, 0, 0.2];                       // a mesa com o computador do Léo
  const TELA = [-2.4, 1.185, 0.08];                // o meio da tela do computador
  const LEO = [-3.25, 0, 0.85];                    // o Léo do lado da mesa
  const LEO_MEIO = [-1.5, 0, 1.0];                 // o Léo mais perto da divisória
  const LISTA = [-2.4, 2.6, -0.15];                // o painel da lista, em cima do computador
  const AGENDA = [-4.3, 2.0, -0.4];                // a agenda da semana, flutuando do lado da mesa
  const MESA_DR = [2.7, 0, 0.0];                   // a mesa do doutor
  const DR = [2.85, 0, -0.75];                     // o doutor atrás da mesa
  const TEL = [2.25, 0.79, 0.12];                  // o telefone da clínica, em cima da mesa
  const BEBE = [-4.45, 0, 2.3];                     // o Léo do lado do bebedouro
  const CAFE = [-4.0, 0, 2.6];                     // a mesinha do cafezinho
  const NAV = [-2.4, 2.05, 0.1];                   // a barra de endereço, em cima do computador
  const OLHA_CAM = [0, 1, 12];

  const CLINICAS = ['Clínica Sorriso', 'OdontoVida', 'Dente de Ouro', 'Sorria Mais', 'Clínica Bem Estar', 'Odonto Center',
    'Clínica Cambuí', 'Sorriso Real', 'OdontoPrime', 'Clínica Taquaral', 'Dentista do Bairro', 'Odonto Barão',
    'Clínica Guanabara', 'Sorriso Feliz', 'Odonto Castelo', 'Clínica Flamboyant'];
  const BAIRROS = ['Cambuí', 'Centro', 'Taquaral', 'Barão Geraldo', 'Castelo', 'Guanabara'];
  const temTel = (i) => i % 5 !== 3;

  function guardar(o) { casas.push({ o, p: o.position.clone(), r: o.rotation.clone(), s: o.scale.clone() }); }

  // ---------- Desenhos ----------

  function caixaR(c, x, y, w, h, r, cor) {
    c.fillStyle = cor; c.beginPath();
    c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); c.fill();
  }
  function texto(c, t, x, y, tam, cor, peso = 800, al = 'left') {
    c.fillStyle = cor; c.font = `${peso} ${tam}px Montserrat, sans-serif`; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, x, y);
  }

  function telaDesligada() {
    comp.tela.desenhar((c, w, h) => { c.fillStyle = '#16181d'; c.fillRect(0, 0, w, h); }, 'off');
  }
  function telaListaCerta(k) {                       // a lista em branco: "Quem pode precisar de mim?" + o funil
    const alvo = 'Quem pode precisar de mim?';
    const s = alvo.slice(0, Math.floor(alvo.length * K.clamp(k * 1.6)));
    const funil = k > 0.6;
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      texto(c, s, 16, 30, 17, '#1d2a22', 900);
      for (let j = 0; j < 4; j++) { caixaR(c, 16, 60 + j * 34, w - 32 - (funil ? 60 : 0), 24, 6, '#f1f3f2'); }
      if (funil) {
        c.fillStyle = VERDE; c.beginPath(); c.moveTo(w - 66, 64); c.lineTo(w - 14, 64); c.lineTo(w - 32, 104); c.lineTo(w - 32, 140); c.lineTo(w - 48, 132); c.lineTo(w - 48, 104); c.closePath(); c.fill();
      }
    }, 'lc' + s.length + (funil ? 'f' : ''));
  }
  function telaBusca(letras, botao) {                // a busca do Mappoa, digitada letra por letra
    const alvo = 'clínicas odontológicas em Campinas';
    const s = alvo.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, 'O que você procura?', 18, 58, 14, '#2a3a30', 700);
      caixaR(c, 12, 74, w - 24, 44, 10, '#ffffff');
      c.strokeStyle = VERDE; c.lineWidth = 3; c.strokeRect(13, 75, w - 26, 42);
      texto(c, s + (letras < alvo.length ? '|' : ''), 20, 96, 13, '#111', 700);
      caixaR(c, w / 2 - 60, 134, 120, 36, 18, botao ? '#1fd16b' : VERDE);
      texto(c, 'Buscar', w / 2, 152, 16, '#fff', 900, 'center');
    }, 'b' + letras + (botao ? 'x' : ''));
  }
  function telaMappoa() {
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 34);
      texto(c, 'Mappoa', 14, 17, 17, '#fff', 900);
      texto(c, '100+', w / 2, 95, 56, VERDE, 900, 'center');
      texto(c, 'clínicas encontradas', w / 2, 140, 16, '#2a3a30', 700, 'center');
    }, 'mappoa');
  }
  function telaEndereco(letras) {                    // o navegador no computador, com mappoa.com
    const s = 'mappoa.com'.slice(0, letras);
    comp.tela.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      caixaR(c, 10, 10, w - 20, 40, 20, '#eef0f3');
      texto(c, '🔒 ' + s, 24, 30, 18, '#111', 800);
      texto(c, s.length >= 10 ? 'Mappoa' : '', w / 2, 120, 40, VERDE, 900, 'center');
    }, 'end' + letras);
  }

  // A lista do Mappoa: n cartões (até 16), tel = 0/1 (os ícones de telefone), cont = o número do topo
  function desenharLista(n, tel, cont) {
    lista.desenhar((c, w, h) => {
      c.fillStyle = '#f4faf6'; c.fillRect(0, 0, w, h);
      c.fillStyle = VERDE; c.fillRect(0, 0, w, 74);
      texto(c, 'Mappoa', 20, 26, 30, '#fff', 900);
      texto(c, 'clínicas odontológicas · Campinas', 20, 56, 15, '#dff5e7', 700);
      texto(c, cont, w - 18, 30, 24, '#fff', 900, 'right');
      const alt = 60, top = 86;
      const cabe = Math.floor((h - top) / alt);
      const ini = Math.max(0, n - cabe);
      for (let j = ini; j < n; j++) {
        const y = top + (j - ini) * alt;
        caixaR(c, 12, y, w - 24, alt - 8, 10, '#ffffff');
        texto(c, CLINICAS[j % CLINICAS.length], 24, y + 17, 18, '#1d2a22', 800);
        texto(c, BAIRROS[j % BAIRROS.length], 24, y + 39, 13, '#6b7a70', 700);
        if (tel) {
          const ok = temTel(j);
          caixaR(c, w - 200, y + 12, 176, 28, 14, ok ? '#e3f7ea' : '#eceeed');
          texto(c, ok ? '☎ (19) 3•••-••' + (10 + j * 7) : 'sem tel. público', w - 112, y + 26, 13, ok ? VERDE : '#9aa59e', 800, 'center');
        }
      }
    }, `li${n}-${tel ? 1 : 0}-${cont}`);
  }

  // A agenda da semana: quinta = 0 a 1 (o bloco verde encaixando)
  function desenharAgenda(quinta) {
    agenda.desenhar((c, w, h) => {
      c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#2f6fd6'; c.fillRect(0, 0, w, 64);
      texto(c, 'Agenda da semana', 20, 33, 28, '#fff', 900);
      const dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
      const cw = (w - 20) / 7;
      dias.forEach((d, i) => {
        const x = 10 + i * cw;
        texto(c, d, x + cw / 2, 88, 18, '#555', 900, 'center');
        caixaR(c, x + 4, 106, cw - 8, h - 120, 8, '#f2f4f7');
      });
      if (quinta > 0) {
        const x = 10 + 3 * cw, y = 106 + (1 - quinta) * -120;
        caixaR(c, x + 6, y + 30, cw - 12, 150, 10, VERDE);
        texto(c, '15 min', x + cw / 2, y + 70, 20, '#fff', 900, 'center');
        texto(c, 'Clínica', x + cw / 2, y + 105, 15, '#eafff1', 800, 'center');
        texto(c, 'Sorriso', x + cw / 2, y + 128, 15, '#eafff1', 800, 'center');
      }
    }, 'ag' + Math.floor(quinta * 10));
  }

  // A barra de endereço grande, com mappoa.com
  function desenharNav(letras, ir) {
    const s = 'mappoa.com'.slice(0, letras);
    nav.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      caixaR(c, 0, 0, w, h, h / 2, '#ffffff');
      c.strokeStyle = '#1b1b1b'; c.lineWidth = 6;
      c.beginPath(); c.roundRect ? c.roundRect(3, 3, w - 6, h - 6, h / 2 - 3) : c.rect(3, 3, w - 6, h - 6); c.stroke();
      texto(c, '🔒', 34, h / 2 + 2, 44, '#2e9d5b', 900);
      texto(c, s + (letras < 10 ? '|' : ''), 100, h / 2 + 2, 68, '#111', 900);
      caixaR(c, w - 130, 18, 108, h - 36, (h - 36) / 2, ir ? '#1fd16b' : '#9aa59e');
      texto(c, 'Ir', w - 76, h / 2 + 2, 40, '#fff', 900, 'center');
    }, 'nav' + letras + (ir ? 'i' : ''));
  }

  // O celular do Léo: 'ligando' (o nome), 'gelo', 'tu' (chamada encerrada)
  function desenharCel(modo) {
    cel.desenhar((c, w, h) => {
      c.fillStyle = modo === 'tu' ? '#3a1c1c' : '#1f3b2c'; c.fillRect(0, 0, w, h);
      texto(c, modo === 'tu' ? 'Chamada' : 'Ligando...', w / 2, 70, 26, '#fff', 800, 'center');
      texto(c, modo === 'tu' ? 'encerrada' : 'Empresa', w / 2, 110, 26, '#cfe', 700, 'center');
      c.fillStyle = '#e8352b'; c.beginPath(); c.arc(w / 2, h - 90, 46, 0, Math.PI * 2); c.fill();
      texto(c, '☎', w / 2, h - 88, 46, '#fff', 900, 'center');
    }, 'cel-' + modo);
  }

  // A plaquinha de checklist do "Agora" (n itens com ✓)
  function desenharChk(n) {
    chk.desenhar((c, w, h) => {
      c.clearRect(0, 0, w, h);
      caixaR(c, 0, 0, w, h, 26, '#ffffff');
      ['Lista certa', 'Abertura', 'Pergunta', 'Próximo passo'].forEach((t, i) => {
        const y = 50 + i * 82;
        const on = i < n;
        c.fillStyle = on ? VERDE : '#dfe5e1'; c.beginPath(); c.arc(50, y, 28, 0, Math.PI * 2); c.fill();
        texto(c, '✓', 50, y + 2, 34, '#fff', 900, 'center');
        texto(c, t, 96, y, 40, on ? '#1d2a22' : '#b0b8b3', 900);
      });
    }, 'chk' + n);
  }

  function balao(t, larg, alt) { return K.placa(t, { larg, alt, fundo: '#ffffff', cor: '#1b1b1b', borda: '#1b1b1b' }); }

  // ---------- Montagem (uma vez só) ----------

  function montar(timeline) {
    tl = timeline;
    bl = K.blocos(tl);
    ordem = bl.map((b) => b.plano);
    C = K.cenario('escritorio');

    // A divisória no meio da sala (agência à esquerda, clínica à direita) e as peças simples do vídeo
    pc = K.pecas({
      divisoria: { forma: 'caixa', tam: [0.15, 2.3, 5.2], cor: '#d9dde2', pos: [0, 1.15, -1.8] },
      mesa_dr: { forma: 'caixa', tam: [1.5, 0.07, 0.75], cor: '#f4f1ea', pos: [MESA_DR[0], 0.75, MESA_DR[2]] },
      pe1: { forma: 'caixa', tam: [0.07, 0.72, 0.7], cor: '#9aa0a6', pos: [MESA_DR[0] - 0.68, 0.36, MESA_DR[2]] },
      pe2: { forma: 'caixa', tam: [0.07, 0.72, 0.7], cor: '#9aa0a6', pos: [MESA_DR[0] + 0.68, 0.36, MESA_DR[2]] },
      pacote: { forma: 'caixa', tam: [0.6, 0.5, 0.6], cor: '#7b3fe4', pos: [-0.9, 0.25, 0.9] },
      orelha: { forma: 'esfera', tam: [0.42], cor: '#e6b48a', pos: [-3.6, 1.55, 2.6] },
      boca: { forma: 'esfera', tam: [0.2], cor: '#c8442f', pos: [-5.3, 1.45, 2.7] },
      cafe: { forma: 'cilindro', tam: [0.45, 0.06], cor: '#f4f1ea', pos: [CAFE[0], 0.75, CAFE[2]] },
      lixeira: { forma: 'tubo', tam: [0.2, 0.42], cor: '#7d848c', pos: [MESA_DR[0] + 1.15, 0.21, MESA_DR[2] + 0.55] }
    });
    pc.orelha.scale.set(0.45, 1, 0.3);
    pc.boca.scale.set(1.6, 0.55, 0.6);
    [pc.pacote, pc.orelha, pc.boca, pc.cafe, pc.lixeira].forEach(guardar);
    // a faixa amarela e a plaquinha do pacote
    const faixa = K.malha(new THREE.BoxGeometry(0.62, 0.52, 0.12), K.mat(0xf5c518));
    const tagPac = K.placa('PACOTE R$', { larg: 0.5, alt: 0.18, fundo: '#f5c518', cor: '#3a1c6b', borda: '#f5c518' });
    K.scene.remove(tagPac); tagPac.position.set(0, 0.06, 0.32);
    pc.pacote.add(faixa, tagPac);
    // a orelha: o miolo mais escuro
    const miolo = K.malha(new THREE.SphereGeometry(0.3, 14, 10), K.mat(0xc98e66));
    miolo.position.set(0, 0, 0.18); miolo.scale.set(0.7, 0.75, 0.4);
    pc.orelha.add(miolo);
    // o pé da mesinha do café e as duas xícaras
    const peCafe = K.malha(new THREE.CylinderGeometry(0.05, 0.05, 0.72, 10), K.mat(0x9aa0a6));
    peCafe.position.y = -0.36;
    pc.cafe.add(peCafe);
    fx.xicaras = [-0.18, 0.2].map((x) => { const x1 = K.malha(new THREE.CylinderGeometry(0.07, 0.055, 0.11, 14), K.mat(0xffffff)); x1.position.set(x, 0.085, 0.05); pc.cafe.add(x1); return x1; });

    // O anel: a caixinha vermelha, o aro dourado e a pedra
    fx.anelG = new THREE.Group();
    fx.anelG.position.set(CAFE[0], 0.88, CAFE[2] + 0.1);
    K.scene.add(fx.anelG);
    const cx = K.malha(new THREE.BoxGeometry(0.2, 0.12, 0.2), K.mat(0xc0392b));
    const tampa = K.malha(new THREE.BoxGeometry(0.2, 0.04, 0.2), K.mat(0xc0392b));
    tampa.position.set(0, 0.08, 0);
    fx.tampa = tampa;
    const aro = K.malha(new THREE.TorusGeometry(0.07, 0.018, 8, 20), K.mat(0xf5c518, { metalness: 0.8, roughness: 0.25 }));
    aro.position.set(0, 0.14, 0);
    const pedra = K.malha(new THREE.OctahedronGeometry(0.035), K.mat(0x8fd3ff, { emissive: 0x8fd3ff, emissiveIntensity: 0.6 }));
    pedra.position.set(0, 0.22, 0);
    fx.anelG.add(cx, tampa, aro, pedra);
    K.lugar(fx.anelG); K.nomear('anel', fx.anelG); guardar(fx.anelG); guardar(tampa);

    // O computador do Léo (com a mesa)
    comp = K.computador();
    comp.g.position.set(...PC);
    K.lugar(comp.g); K.nomear('computador', comp.g);

    // O telefone da clínica: a base vermelha e o fone preto (que sai do gancho)
    telG = new THREE.Group();
    telG.position.set(...TEL);
    K.scene.add(telG);
    const base = K.malha(new THREE.BoxGeometry(0.34, 0.1, 0.26), K.mat(0xe8352b));
    base.position.y = 0.05;
    telG.add(base);
    [[-0.06, 0], [0.06, 0], [0, 0]].forEach(() => {});
    fone = new THREE.Group();
    const cabo = K.malha(new THREE.BoxGeometry(0.34, 0.05, 0.07), K.mat(0x1b1d22));
    const p1 = K.malha(new THREE.BoxGeometry(0.09, 0.07, 0.1), K.mat(0x1b1d22)); p1.position.x = -0.15;
    const p2 = p1.clone(); p2.position.x = 0.15;
    fone.add(cabo, p1, p2);
    fone.position.set(0, 0.14, 0);
    telG.add(fone);
    K.lugar(telG); K.nomear('telefone', telG); guardar(telG); guardar(fone);

    // A placa da clínica (na parede do fundo, atrás do doutor)
    fx.placaClinica = K.placa('Clínica Sorriso', { larg: 2.0, alt: 0.55, fundo: '#ffffff', cor: '#1a9e8f', borda: '#1a9e8f' });
    fx.placaClinica.position.set(3.0, 2.75, -4.3);
    K.lugar(fx.placaClinica); K.nomear('placa_clinica', fx.placaClinica);

    // O celular do Léo
    celG = new THREE.Group();
    K.scene.add(celG);
    const corpo = K.malha(new THREE.BoxGeometry(0.2, 0.38, 0.03), K.mat(0x1d1f24, { roughness: 0.4 }));
    cel = K.telaCanvas(0.18, 0.34, 220);
    cel.m.position.z = 0.017;
    celG.add(corpo, cel.m);
    K.lugar(celG); K.nomear('celular', celG); guardar(celG);
    desenharCel('ligando');

    // A agenda da semana
    agendaG = new THREE.Group();
    agendaG.position.set(...AGENDA);
    agendaG.rotation.y = 0.35;
    K.scene.add(agendaG);
    const fundoAg = K.malha(new THREE.BoxGeometry(1.88, 1.28, 0.05), K.mat(0x2f6fd6));
    fundoAg.position.z = -0.035;
    agenda = K.telaCanvas(1.8, 1.2, 520);
    agendaG.add(fundoAg, agenda.m);
    K.lugar(agendaG); K.nomear('agenda', agendaG); guardar(agendaG);
    desenharAgenda(0);

    // O painel da lista do Mappoa, em cima do computador
    listaG = new THREE.Group();
    listaG.position.set(...LISTA);
    K.scene.add(listaG);
    const fundoLi = K.malha(new THREE.BoxGeometry(2.0, 2.5, 0.06), K.mat(0x2e9d5b));
    fundoLi.position.z = -0.04;
    lista = K.telaCanvas(1.9, 2.4, 440);
    listaG.add(fundoLi, lista.m);
    K.lugar(listaG); K.nomear('lista', listaG); guardar(listaG);

    // A barra de endereço grande (frase 21)
    navG = new THREE.Group();
    navG.position.set(...NAV);
    K.scene.add(navG);
    nav = K.telaCanvas(2.2, 0.46, 700);
    navG.add(nav.m);
    K.lugar(navG); K.nomear('navegador', navG); guardar(navG);

    // A plaquinha de checklist do "Agora" (frase 20)
    chkG = new THREE.Group();
    chkG.position.set(-4.4, 1.9, 0.3);
    chkG.rotation.y = 0.35;
    K.scene.add(chkG);
    chk = K.telaCanvas(1.3, 1.15, 420);
    chkG.add(chk.m);
    K.lugar(chkG); guardar(chkG);

    // Os 3 cartões de contato (frase 5)
    contatosG = new THREE.Group();
    K.scene.add(contatosG);
    fx.contatos = [['Pizzaria', '#fff1d6', '#c0392b'], ['Oficina', '#e8eef5', '#2b4a6f'], ['Padaria', '#f7e7c6', '#7a4a22']].map(([t, f, c], i) => {
      const p = K.placa('☎ ' + t, { larg: 1.0, alt: 0.42, fundo: f, cor: c, borda: c });
      K.scene.remove(p);
      p.position.set(-1.9 + i * 0.05, 2.45 - i * 0.55, 0.9 + i * 0.05);
      p.rotation.y = 0.1;
      contatosG.add(p);
      guardar(p);
      return p;
    });
    K.lugar(contatosG); K.nomear('contatos', contatosG); guardar(contatosG);

    // Os balões de fala (cada texto é uma placa; todos se chamam "balao" pro "mostra")
    fx.b = {
      tudo: balao('Tudo bem?', 1.3, 0.45),
      oi: balao('Oi, tudo bem?', 1.5, 0.45),
      oi2: balao('Oi, tudo bem?\nComo vai o senhor?', 1.9, 0.75),
      quem: K.placa('Quem é você', { larg: 1.1, alt: 0.38, fundo: '#e7f0ff', cor: '#1a4fb8', borda: '#1a4fb8' }),
      porque: K.placa('Por que ligou', { larg: 1.1, alt: 0.38, fundo: '#e7f0ff', cor: '#1a4fb8', borda: '#1a4fb8' }),
      abre: balao('Doutor, aqui é o Léo.\nAjudo clínicas a atrair\npacientes novos.', 2.0, 0.95),
      vende: balao('Tenho um pacote\nimperdível!!!', 1.6, 0.7),
      perg: balao('Hoje, os pacientes novos\nchegam de onde?', 2.0, 0.75),
      mando: balao('Mando sim!\n15 min na quinta?', 1.6, 0.7)
    };
    Object.values(fx.b).forEach((p) => { K.lugar(p); K.nomear('balao', p); });
    fx.bd = { email: balao('Me manda\npor e-mail.', 1.4, 0.65), pode: balao('Pode ser!', 1.1, 0.42) };
    Object.values(fx.bd).forEach((p) => { K.lugar(p); K.nomear('balao_dr', p); });

    // Outras plaquinhas: os "?" (frase 3), o "tu tu tu" (frase 20), o envelope (16), o carimbo (18), os ícones (14)
    fx.interroga = [0, 1, 2].map(() => K.placa('?', { larg: 0.6, alt: 0.6, fundo: '#ff9f1c', cor: '#ffffff', borda: '#ff9f1c' }));
    fx.tus = [0, 1, 2].map(() => K.placa('tu', { larg: 0.5, alt: 0.32, fundo: '#e8352b', cor: '#ffffff', borda: '#e8352b' }));
    fx.envelope = K.placa('✉ e-mail', { larg: 0.6, alt: 0.36, fundo: '#ffffff', cor: '#1a4fb8', borda: '#1a4fb8' });
    fx.carimbo = K.placa('VENDIDO', { larg: 1.2, alt: 0.42, fundo: '#ffffff', cor: '#e8352b', borda: '#e8352b' });
    fx.icones = [['Indicação', '#7b3fe4'], ['Instagram', '#d6249f'], ['Google', '#2f7fe0']].map(([t, c]) => K.placa(t, { larg: 0.9, alt: 0.3, fundo: '#ffffff', cor: c, borda: c }));
    fx.comenta = K.placa('💬', { larg: 0.5, alt: 0.4, fundo: '#ffffff', cor: '#1b1b1b', borda: '#1b1b1b' });
    // os pacientes: bonequinhos simples (frase 11)
    fx.pacientes = ['#ff7a59', '#6c5ce7', '#00a3a3'].map((cor) => {
      const g = new THREE.Group();
      const c1 = K.malha(new THREE.CylinderGeometry(0.1, 0.12, 0.32, 12), K.mat(new THREE.Color(cor).getHex()));
      c1.position.y = 0.16;
      const cab = K.malha(new THREE.SphereGeometry(0.09, 12, 10), K.mat(0xe6b48a));
      cab.position.y = 0.42;
      g.add(c1, cab);
      K.scene.add(g);
      return g;
    });

    // Os personagens: o Léo (o personagem do canal, canal/identidade.md) e o doutor (o dono da clínica)
    menino = K.boneco({ tipo: 'menino', roupa: 'camiseta', cores: { camiseta: 0x2f6fd6, bermuda: 0x2f6f5e, tenis: 0xf4f1ea, cabelo: 0x7a4a22, pele: 0xe6b48a } });
    dr = K.boneco({ tipo: 'doutor' });
    K.nomear('doutor', dr);

    // Efeitos
    fx.ondasTel = K.ondas(0xe8352b, 3, 0.7);
    fx.ondas = K.ondas(0x2e9d5b, 4, 0.5);
    fx.fumaca = K.fumaca(15, 0xffffff, 10);
    fx.vapor = K.fumaca(16, 0xffffff, 10);
    fx.coracoes = K.coracoes(23, 6);

    // Textos (cada um uma vez)
    fx.certo = K.marca('certo');
    fx.errado = K.marca('errado');
    fx.errado2 = K.marca('errado');
    fx.seguir = K.cartaoSeguir();
    fx.cta = K.cta('Qual frase você usa? <em>Comenta aí</em>');
    fx.rot = { cold: K.rotulo('Cold call'), lista: K.rotulo('Lista de prospecção'), abertura: K.rotulo('Abertura'), passo: K.rotulo('Próximo passo') };
    fx.cont = { lista: K.contador(), frase: K.contador(), min: K.contador() };
    const e = (t, cor) => K.etiqueta(t, cor);
    fx.et = {
      leo: e('Léo · agência de marketing', 'azul'), zero: e('0 reuniões', 'vermelho'), fria: e('Ligação fria', 'azul'),
      precisa: e('Não precisa de agência', 'vermelho'), certa: e('Lista certa', 'verde'), publico: e('Telefone público', 'azul'),
      generico: e('Genérico', 'vermelho'), cedo: e('Cedo demais', 'vermelho'), negocio: e('Pergunta do negócio', 'azul'),
      menos: e('Fala menos', 'laranja'), mais: e('Escuta mais', 'verde'), classica: e('A frase clássica', 'laranja'),
      marca: e('Marca a conversa', 'verde'), cedo2: e('Cedo demais!', 'laranja'), antes: e('Qualquer um', 'vermelho'), agora: e('Agora', 'verde')
    };
  }

  // Ajudantes dos personagens e das peças
  function foneNaOrelha(P0 = DR) {                          // o doutor com o fone na orelha
    const ang = dr.g.rotation.y;
    const lado = [Math.cos(ang) * -0.2, 0, Math.sin(ang) * 0.2];
    fone.parent.remove(fone); K.scene.add(fone);
    fone.position.set(P0[0] + lado[0], 1.42, P0[2] + lado[2] + 0.05);
    fone.rotation.set(0, 0, Math.PI / 2);
  }
  function foneNoGancho() {
    if (fone.parent !== telG) { fone.parent.remove(fone); telG.add(fone); }
    fone.position.set(0, 0.14, 0); fone.rotation.set(0, 0, 0);
  }
  function celNaOrelha(pos) {                        // o celular na mão do Léo, do lado da cabeça
    celG.visible = true;
    celG.position.set(pos[0] + 0.24, 1.22, pos[2] + 0.08);
    celG.rotation.set(0, 0.4, 0.15);
  }
  function mostrarBalao(p, ponto, t, esc = 1) {
    p.visible = t > 0;
    p.position.set(...ponto);
    p.scale.setScalar(pop(t) * esc);
  }

  // ---------- Planos: um por frase do roteiro.json ----------

  const P = {
    gancho(B, tc) {
      // NA TELA: o doutor atrás da mesa da direita, o telefone vermelho tocando; o balão "Tudo bem?" chegando; a pergunta no topo · MOSTRA: doutor, telefone
      // CENÁRIO: a metade direita do escritório; a placa da clínica atrás; o janelão (o K.cenario cuida)
      const tA = quando('atendeu', B, 0.2), tT = quando('tudo', B, 0.55), tD = quando('desliga', B, 0.88);
      // OBJETOS SE MEXENDO: o telefone treme tocando até "atendeu"; o doutor tira o fone; em "desliga", bate o fone de volta
      if (tc < tA) { K.falhar(telG, 'treme', B.t, { dur: 2, forca: 0.6, som: false }); fx.ondasTel.em(mais(TEL, [0, 0.2, 0]), Math.PI / 2, tc, 0.8, 2.2); }
      if (tc > tA && tc < tD) foneNaOrelha(); else foneNoGancho();
      if (tc > tD) K.falhar(telG, 'treme', tc - tD, { dur: 0.4, forca: 1, som: false });
      // PERSONAGEM: o doutor · começo: atende, surpreso · na palavra "desliga": bravo, bate o fone
      // INTERAÇÃO: o doutor atende e bate o fone quando o "tudo bem?" chega nele
      dr.g.visible = true;
      dr.colocar(DR, OLHA_CAM);
      if (tc > tD) dr.reagir('bravo', tc - tD); else dr.reagir('surpreso', B.t);
      // ENTRA AGORA / EFEITOS VISUAIS: o balão "Tudo bem?" desliza da esquerda (palavra "tudo") · ✗ em "desliga"
      const kb = K.clamp((tc - tT) / 0.35);
      mostrarBalao(fx.b.tudo, [DR[0] - 1.6 + 0.8 * K.suave(kb), 1.75, DR[2] + 0.9], tc - tT);
      // SONS: zumbido + bip do telefone tocando · clique do fone · baque + desliga
      K.som('zumbido', B.inicio, 0.5, Math.max(0.2, tA - B.inicio));
      [0, 0.45].forEach((d) => K.som('bip', B.inicio + d, 0.5));
      K.som('clique', tA, 0.7);
      K.som('baque', tD, 0.8);
      K.som('desliga', tD + 0.05, 0.7);
      // CÂMERA: alvo [doutor, telefone] · revelando · perto → médio · frente · olho · topo livre
      K.filmar([dr, telG], 'revelando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.38 });
      const [ex, ey] = K.tela(mais(DR, [0, 2.0, 0]));
      fx.errado.em({ tela: [ex + 160, ey] }, tc - tD);
    },

    leo(B, tc) {
      // NA TELA: o Léo na frente da mesa da esquerda; a agenda da semana vazia do lado · MOSTRA: personagem, agenda
      // CENÁRIO: a agência, a mesa com o computador, a cidade no janelão (o K.cenario cuida)
      const tL = quando('Léo', B, 0.08), tAg = quando('agenda', B, 0.6), tV = quando('vazia', B, 0.85);
      // ENTRA AGORA: a agenda crescendo (palavra "agenda")
      agendaG.visible = tc > tAg - 0.05;
      K.entrar(agendaG, 'cresce', tc - tAg, { dur: 0.5 });
      desenharAgenda(0);
      // OBJETOS SE MEXENDO: a agenda balança de leve
      agendaG.rotation.z = 0.03 * Math.sin(tc * 3);
      // PERSONAGEM: de frente pra câmera · começo: mostrando (orgulhoso) · na palavra "vazia": triste
      // INTERAÇÃO: ele apresenta a agência e olha pra agenda vazia
      menino.colocar(LEO, [-1.8, 0, 9]);
      if (tc > tV) { menino.olharPara(AGENDA); menino.reagir('triste', tc - tV); } else menino.reagir('mostrando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Léo · agência de marketing" (palavra "Léo") · etiqueta vermelha "0 reuniões" (palavra "vazia")
      fx.et.leo.em(mais(LEO, [0.9, 1.9, 0.3]), tc - tL);
      fx.et.zero.em(mais(AGENDA, [0, 0.85, 0.1]), tc - tV);
      // SONS: ding (o kit põe) · brilho da agenda (o K.entrar põe) · errado baixinho
      K.som('errado', tV, 0.4);
      // CÂMERA: alvo [personagem, agenda] · chegando · médio · um pouco pela direita · olho (frase 1: revelando, de frente, no doutor)
      K.filmar([menino, agendaG], 'chegando', B.p, { plano: 'medio', lado: 25, altura: 'olho' });
    },

    liga(B, tc) {
      // NA TELA: o Léo com o celular na orelha; as ondas atravessando a divisória; os "?" do outro lado · MOSTRA: personagem, celular, divisoria
      // CENÁRIO: a sala inteira, as duas metades e a divisória
      const tT = quando('telefone', B, 0.3), tLi = quando('liga', B, 0.45), tC = quando('conhecem', B, 0.85);
      // ENTRA AGORA: o celular sobe pra mão (palavra "telefone"); as ondas (palavra "liga"); os "?" (palavra "conhecem")
      const pos = menino.irPara(LEO, LEO_MEIO, K.faixa(B.p, 0.35, 0.8), tc, { olhar: [3, 1, 0] });
      if (tc > tT) { celNaOrelha(pos); K.entrar(celG, 'sobe', tc - tT, { dur: 0.35, som: false, destaque: false }); }
      desenharCel('ligando');
      // OBJETOS SE MEXENDO: as ondas viajam da esquerda pra direita por cima da divisória; os "?" pulam
      if (tc > tLi) fx.ondas.em([pos[0] + 0.3, 1.6, pos[2]], 0, tc - tLi, 4.5, 1.1);
      fx.interroga.forEach((q, i) => { const d = tc - tC - i * 0.15; q.visible = d > 0; q.position.set(1.6 + i * 1.3, 2.2 + 0.1 * Math.sin(tc * 5 + i), -0.6 + i * 0.4); q.scale.setScalar(pop(d)); });
      // PERSONAGEM: começo: ideia (pega o celular) · na palavra "liga": segurando, andando
      // INTERAÇÃO: ele pega o celular e liga; as ondas saem do celular dele pros "?"
      if (tc > tLi) menino.reagir('segurando', tc - tLi); else menino.reagir('ideia', B.t);
      // SONS: whoosh do celular · bip bip da discagem · estalo de cada "?"
      K.som('whoosh', tT, 0.5);
      [0, 0.12, 0.24].forEach((d) => K.som('bip', tLi + d, 0.4));
      [0, 1, 2].forEach((i) => K.som('estalo', tC + i * 0.15, 0.4));
      // CÂMERA: alvo [personagem, celular, divisoria] · passando · aberto · frente · alto (frase 2: chegando, médio, direita, olho)
      K.filmar([menino, celG, [2.4, 1.8, -0.2]], 'passando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
    },

    cold_rotulo(B, tc) {
      // NA TELA: o celular no centro, grande, ficando coberto de gelo; o rótulo "Cold call" · MOSTRA: celular
      // CENÁRIO: atrás, o janelão com a cidade
      const tF = quando('fria', B, 0.7), tCo = quando('cold', B, 0.25);
      // OBJETOS SE MEXENDO: o celular gira devagar no ar e congela (palavra "fria"); a respiração do Léo vira fumacinha
      celG.visible = true;
      celG.position.set(-2.3, 1.5, 2.2);
      celG.scale.setScalar(2.2);
      celG.rotation.set(0, 0.5 * Math.sin(B.t * 1.5), 0);
      desenharCel('ligando');
      K.falhar(celG, 'congela', tc - tF, { dur: 2 });
      // PERSONAGEM: ao lado do celular · na palavra "fria": treme de frio
      // INTERAÇÃO: o celular "esfria" o Léo
      menino.colocar([-3.6, 0, 1.3], [-2.3, 1.5, 2.2]);
      if (tc > tF) { menino.reagir('cansado', tc - tF); menino.humor('assustado'); fx.fumaca.em([-3.45, 1.3, 1.45], tc - tF, { altura: 0.5, escala: 0.25 }); } else menino.reagir('surpreso', B.t);
      // EFEITOS VISUAIS: o rótulo "Cold call" (palavra "cold") · etiqueta azul "Ligação fria" (palavra "fria")
      fx.rot.cold.em(mais(celG.position.toArray(), [0, -0.75, 0.2]), tc - tCo);
      fx.et.fria.em(mais(celG.position.toArray(), [0, 0.8, 0]), tc - tF);
      // SONS: o do rótulo (o kit põe) · estalo do gelo (o K.falhar põe)
      // CÂMERA: alvo o celular · girando · detalhe · esquerda · olho (frase 3: passando, aberto, frente, alto)
      K.filmar(celG.position.toArray(), 'girando', B.p, { plano: 'perto', tam: 1.4, lado: -15, altura: 'olho', angulo: 20 });
    },

    qualquer(B, tc) {
      // NA TELA: o Léo embaixo à esquerda com o celular; os 3 cartões em leque ganhando ✗ · MOSTRA: contatos, personagem
      // CENÁRIO: a agência; o computador desligado atrás dele
      const tQ = quando('qualquer', B, 0.12), tPz = quando('pizzaria', B, 0.3), tO = quando('oficina', B, 0.7);
      // ENTRA AGORA: os 3 cartões caindo um por um (palavra "qualquer")
      contatosG.visible = true;
      fx.contatos.forEach((p, i) => { p.visible = tc > tQ + i * 0.15; K.entrar(p, 'cai', tc - tQ - i * 0.15, { dur: 0.45, altura: 2, som: i === 0 ? 'whoosh' : false, destaque: false }); });
      // OBJETOS SE MEXENDO: a pizzaria fica cinza (palavra "pizzaria"); a oficina treme sem atender (palavra "oficina"); no fim, os 3 tombam
      if (tc > tPz) K.falhar(fx.contatos[0], 'apaga', tc - tPz, { dur: 0.4, som: false });
      K.falhar(fx.contatos[1], 'treme', tc - tO, { dur: 1.0, forca: 0.6, som: false });
      // PERSONAGEM: com o celular na orelha · começo: dúvida · na palavra "oficina": bravo
      // INTERAÇÃO: cada cartão que ele liga responde com um ✗
      menino.colocar([-3.0, 0, 1.4], [-1.9, 1.8, 0.9]);
      celNaOrelha([-3.0, 0, 1.4]);
      desenharCel('ligando');
      if (tc > tO) menino.reagir('bravo', tc - tO); else menino.reagir('duvida', B.t);
      // SONS: whoosh dos cartões · errado (pizzaria) · zumbido (oficina) · o congela (o jogo)
      K.som('errado', tPz + 0.1, 0.6);
      K.som('zumbido', tO, 0.5, 0.9);
      K.som('errado', tO + 0.6, 0.6);
      // CÂMERA: alvo [contatos, personagem] · subindo · médio · direita · baixo (frase 4: girando, detalhe, esquerda)
      K.filmar([contatosG, menino], 'subindo', B.p, { plano: 'medio', lado: 'direita', altura: 'baixo' });
      // EFEITOS VISUAIS: etiqueta vermelha "Não precisa de agência" (palavra "pizzaria") · ✗ em cada cartão
      fx.et.precisa.em(mais(fx.contatos[0].position.toArray(), [0, 0.45, 0.1]), tc - tPz);
      const [x1, y1] = K.tela(fx.contatos[0].position.toArray());
      fx.errado.em({ tela: [x1 + 150, y1] }, tc - tPz - 0.1);
      const [x2, y2] = K.tela(fx.contatos[1].position.toArray());
      fx.errado2.em({ tela: [x2 + 150, y2] }, tc - tO - 0.6);
    },

    lista_certa(B, tc) {
      // NA TELA: o computador acendendo com "Quem pode precisar de mim?"; o Léo chegando · MOSTRA: computador, personagem
      // CENÁRIO: de volta às cores; a agência com o janelão atrás
      const tL = quando('lista', B, 0.3), tS = quando('só', B, 0.5), tP = quando('precisar', B, 0.75);
      // ENTRA AGORA / OBJETOS SE MEXENDO: a tela liga (palavra "lista"); o título é digitado; o funil aparece (palavra "só")
      if (tc > tL) telaListaCerta(K.clamp((tc - tL) / Math.max(0.4, (tS - tL) * 1.6))); else telaDesligada();
      // PERSONAGEM: anda até a mesa · na palavra "precisar": ideia
      // INTERAÇÃO: ele liga o computador e começa a montar a lista
      menino.irPara([-1.4, 0, 1.8], LEO, K.faixa(B.p, 0, 0.35), tc, { olhar: TELA });
      if (tc > tP) menino.reagir('ideia', tc - tP); else if (B.p > 0.35) menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: etiqueta verde "Lista certa" (palavra "lista")
      fx.et.certa.em(mais(PC, [0, 1.85, 0.3]), tc - tL);
      // SONS: liga do computador · passos · clique do teclado
      K.som('liga', tL, 0.6);
      [0.05, 0.15, 0.25].forEach((f) => K.som('passo', B.inicio + f * B.dur, 0.4));
      for (let k = 0; k < 6; k++) K.som('clique', tL + 0.2 + k * 0.12, 0.25);
      // CÂMERA: alvo [computador, personagem] · chegando · médio · perfil esquerda · olho (frase 5: subindo, médio, direita, baixo)
      K.filmar([comp.g, menino], 'chegando', B.p, { plano: 'medio', lado: 25, altura: 'alto' });
    },

    busca(B, tc) {
      // NA TELA: o computador embaixo; acima, o painel da lista enchendo de clínicas; o Léo digitando · MOSTRA: lista, computador
      // CENÁRIO: a agência; o janelão com a cidade atrás do painel
      const tB = quando('busca', B, 0.12), tLi = quando('lista', B, 0.55), tT = quando('telefone', B, 0.75);
      // ENTRA AGORA: a busca letra por letra (palavra "busca"); o painel subindo (palavra "lista")
      const letras = Math.max(0, Math.min(34, Math.floor((tc - tB) / 0.045)));
      if (tc < tLi) telaBusca(letras, letras >= 34); else telaMappoa();
      listaG.visible = tc > tLi - 0.1;
      K.entrar(listaG, 'sobe', tc - tLi, { dur: 0.6 });
      // OBJETOS SE MEXENDO: os cartões das clínicas enchendo; os telefones acendem (palavra "telefone")
      const n = Math.max(0, Math.min(16, Math.floor(K.clamp((tc - tLi) / 2.0) * 16)));
      const cont = Math.min(100, Math.floor(K.clamp((tc - tLi) / 2.2) * 100));
      desenharLista(n, tc > tT, cont >= 100 ? '100+' : String(cont));
      // PERSONAGEM: começo: segurando (digitando) · na palavra "lista": surpreso, se afasta um passo
      // INTERAÇÃO: ele digita a busca e o computador solta o painel pra cima
      const recua = K.suave(K.clamp((tc - tLi) / 0.4));
      menino.colocar([LEO[0] - 0.3 * recua, 0, LEO[2] + 0.4 * recua], tc > tLi ? LISTA : TELA);
      if (tc > tLi) menino.reagir('surpreso', tc - tLi); else menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: contador verde "clínicas" (palavra "lista") · etiqueta azul "Telefone público" (palavra "telefone")
      fx.cont.lista.em(cont >= 100 ? '100+' : String(cont), mais(LISTA, [-1.5, 0.7, 0.2]), tc - tLi, 'CLÍNICAS');
      fx.et.publico.em(mais(LISTA, [1.3, -0.5, 0.2]), tc - tT);
      // SONS: clique das teclas · whoosh do painel (o K.entrar põe) · bip dos cartões · certo nos telefones
      for (let k = 0; k < 34; k += 3) K.som('clique', tB + k * 0.045, 0.25);
      for (let k = 1; k <= 8; k++) K.som('bip', tLi + k * 0.25, 0.18);
      K.som('certo', tT, 0.6);
      // CÂMERA: alvo [lista, computador] · subindo · médio · frente · olho (frase 6: chegando, médio, perfil esquerda)
      K.filmar([listaG, comp.g], 'subindo', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
    },

    lista_rotulo(B, tc) {
      // NA TELA: o painel da lista de perto, girando e brilhando; o rótulo "Lista de prospecção" · MOSTRA: lista
      listaG.visible = true;
      desenharLista(16, true, '100+');
      telaMappoa();
      // OBJETOS SE MEXENDO: o painel gira um pouco e brilha amarelo
      listaG.rotation.y = 0.25 * Math.sin(B.p * Math.PI);
      K.brilhar(listaG, B.t);
      // PERSONAGEM: na beira de baixo · na palavra "prospecção": vitória
      // INTERAÇÃO: ele comemora a lista pronta
      menino.colocar([LEO[0] - 0.3, 0, LEO[2] + 0.4], LISTA);
      menino.reagir('vitoria', B.t);
      // EFEITOS VISUAIS: o rótulo amarelo · o brilho
      fx.rot.lista.em(mais(LISTA, [0, -1.45, 0.3]), B.t - 0.05);
      // SONS: o do rótulo · brilho
      K.som('brilho', B.inicio, 0.4);
      // CÂMERA: alvo a lista · girando · perto · direita · baixo (frase 7: subindo, médio, frente, olho)
      K.filmar(listaG, 'girando', B.p, { plano: 'perto', lado: 'direita', altura: 'baixo', angulo: 25 });
    },

    tudo_bem(B, tc) {
      // NA TELA: a sala inteira de cima: o Léo à esquerda, o doutor à direita; o balão do Léo; o fone batendo · MOSTRA: personagem, doutor, balao
      // CENÁRIO: as duas mesas; o janelão atrás
      const tA = quando('atende', B, 0.15), tOi = quando('Oi', B, 0.4), tCo = quando('Como', B, 0.6), tS = quando('senhor', B, 0.75), tD = quando('desliga', B, 0.92);
      // OBJETOS SE MEXENDO: o telefone treme e o doutor atende; as ondas vão do Léo pro doutor; o balão cresce; em "desliga", bate o fone
      if (tc < tA) K.falhar(telG, 'treme', tc - B.inicio, { dur: 1, forca: 0.5, som: false });
      dr.g.visible = true;
      dr.colocar(DR, [0, 1, 1]);
      if (tc > tA && tc < tD) foneNaOrelha(); else foneNoGancho();
      if (tc > tA && tc < tD) fx.ondas.em([LEO_MEIO[0] + 0.3, 1.6, LEO_MEIO[2]], 0, tc - tA, 4.2, 1.1);
      // ENTRA AGORA: o balão "Oi, tudo bem?" (palavra "Oi") e, em "Como", o balão maior
      const pB = [LEO_MEIO[0] + 0.4, 2.35, LEO_MEIO[2]];
      if (tc < tCo) mostrarBalao(fx.b.oi, pB, tc - tOi);
      else mostrarBalao(fx.b.oi2, mais(pB, [0.3, 0.1, 0]), tc - tCo + 0.3, 1 + 0.1 * K.clamp((tc - tCo) / 0.8));
      // PERSONAGEM: o Léo: mostrando (simpático) · em "desliga": susto. O doutor: dúvida → bravo
      // INTERAÇÃO: o "tudo bem?" chega no doutor e ele desliga na cara do Léo
      menino.colocar(LEO_MEIO, [3, 1, 0]);
      celNaOrelha(LEO_MEIO);
      desenharCel(tc > tD ? 'tu' : 'ligando');
      if (tc > tD) menino.reagir('susto', tc - tD); else menino.reagir('mostrando', B.t);
      if (tc > tD) dr.reagir('bravo', tc - tD); else dr.reagir('duvida', B.t);
      // SONS: zumbido · clique (atende) · baque + desliga · o congela (o jogo)
      K.som('zumbido', B.inicio, 0.4, Math.max(0.2, tA - B.inicio));
      K.som('clique', tA, 0.6);
      K.som('baque', tD, 0.8);
      K.som('desliga', tD + 0.05, 0.7);
      // CÂMERA: alvo [personagem, doutor] · afastando · aberto · frente · de cima (frase 8: girando, perto, direita, baixo)
      K.filmar([menino, dr], 'afastando', B.p, { plano: 'medio', lado: 'frente', altura: 'alto' });
      // EFEITOS VISUAIS: etiqueta vermelha "Genérico" (palavra "senhor") · ✗ em cima do doutor (palavra "desliga")
      fx.et.generico.em(mais(pB, [0, 0.8, 0]), tc - tS);
      const [ex, ey] = K.tela(mais(DR, [0, 2.0, 0]));
      fx.errado.em({ tela: [ex, ey - 60] }, tc - tD);
    },

    direto(B, tc) {
      // NA TELA: o Léo de perto com o celular; as caixinhas "Quem é você" e "Por que ligou" se juntando; o contador "1 frase" · MOSTRA: personagem, balao
      // CENÁRIO: a agência, a mesa e a planta atrás dele
      const tQ = quando('quem', B, 0.3), tLg = quando('ligou', B, 0.6), tF = quando('frase', B, 0.85);
      // OBJETOS SE MEXENDO: depois do ⏪, as 2 caixinhas entram de lados opostos e se juntam numa linha só (palavra "frase")
      const pos = [-2.2, 0, 1.4];
      const junta = K.suave(K.clamp((tc - tF) / 0.35));
      const cima = [pos[0], 2.15, pos[2] + 0.1];
      mostrarBalao(fx.b.quem, [cima[0] - 1.1 + 0.5 * K.suave(K.clamp((tc - tQ) / 0.3)) + 0.05 * junta, cima[1] + 0.25 * (1 - junta), cima[2]], tc - tQ);
      mostrarBalao(fx.b.porque, [cima[0] + 1.1 - 0.5 * K.suave(K.clamp((tc - tLg) / 0.3)) + 0.5 * junta, cima[1] - 0.25 * (1 - junta), cima[2]], tc - tLg);
      if (junta > 0) fx.b.quem.position.x = cima[0] - 0.55; if (junta > 0) fx.b.porque.position.x = cima[0] + 0.55;
      // PERSONAGEM: depois do ⏪: pensando · na palavra "frase": ideia
      // INTERAÇÃO: ele junta as duas caixinhas com as mãos
      menino.colocar(pos, OLHA_CAM);
      celNaOrelha(pos);
      desenharCel('ligando');
      if (tc > tF) menino.reagir('ideia', tc - tF); else menino.reagir('pensando', B.tq);
      // EFEITOS VISUAIS: o ⏪ (o jogo) · o contador "1 frase" (palavra "frase")
      fx.cont.frase.em('1', mais(cima, [0, 0.75, 0]), tc - tF, 'FRASE');
      // SONS: rebobina (o jogo põe) · trava das caixinhas
      K.som('trava', tF + 0.3, 0.7);
      // CÂMERA: alvo [personagem, balao] · chegando · perto · perfil direita · olho (B.q) (frase 9: afastando, aberto, frente, de cima)
      K.filmar([menino, [cima[0] - 0.9, cima[1], cima[2]], [cima[0] + 0.9, cima[1], cima[2]]], 'chegando', B.q, { plano: 'perto', lado: 30, altura: 'olho' });
    },

    fala_abertura(B, tc) {
      // NA TELA: o doutor em primeiro plano, com o fone; o balão da abertura chegando por cima da divisória; o Léo lá atrás · MOSTRA: doutor, balao
      // CENÁRIO: a clínica, a placa "Clínica Sorriso"
      const tDo = quando('Doutor', B, 0.05), tAj = quando('ajudo', B, 0.45), tPa = quando('pacientes', B, 0.8), tN = quando('novos', B, 0.92);
      dr.g.visible = true;
      dr.colocar(DR, [-2, 1, 3]);
      foneNaOrelha();
      // OBJETOS SE MEXENDO: as ondas calmas do Léo pro doutor; o balão atravessa a divisória; os pacientes pulam (palavra "pacientes")
      fx.ondas.em([LEO_MEIO[0] + 0.3, 1.6, LEO_MEIO[2]], 0, tc - B.inicio, 4.2, 0.8);
      const kb = K.suave(K.clamp((tc - tDo) / 0.6));
      mostrarBalao(fx.b.abre, [-0.6 + 2.5 * kb, 2.5, 0.2], tc - tDo);
      fx.pacientes.forEach((g, i) => { const d = tc - tPa - i * 0.12; g.visible = d > 0; g.position.set(MESA_DR[0] + 0.9 + i * 0.35, Math.max(0, Math.sin(Math.PI * K.clamp(d / 0.5)) * 0.5), MESA_DR[2] + 0.9); g.scale.setScalar(pop(d) * 1.4); });
      // PERSONAGEM: o doutor: dúvida · na palavra "pacientes": surpreso, interessado. O Léo lá atrás: chamando
      // INTERAÇÃO: a frase do Léo prende a atenção do doutor
      if (tc > tPa) dr.reagir('surpreso', tc - tPa); else dr.reagir('duvida', B.t);
      menino.colocar(LEO_MEIO, [3, 1, 0]);
      celNaOrelha(LEO_MEIO);
      menino.reagir('chamando', B.t);
      // SONS: bip das ondas · estalo dos pacientes · certo (palavra "novos")
      K.som('bip', B.inicio + 0.1, 0.3);
      [0, 1, 2].forEach((i) => K.som('estalo', tPa + i * 0.12, 0.4));
      K.som('certo', tN, 0.6);
      // CÂMERA: alvo [doutor, balao] · passando · médio · por cima do ombro do doutor · olho (frase 10: chegando, perto, perfil direita)
      K.filmar([dr, fx.b.abre], 'passando', B.p, { plano: 'medio', lado: 35, altura: 'olho' });
      // EFEITOS VISUAIS: ✓ verde do lado do balão (palavra "novos")
      const [ex, ey] = K.tela(fx.b.abre.position.toArray());
      fx.certo.em({ tela: [ex, ey - 170] }, tc - tN);
    },

    abertura_rotulo(B, tc) {
      // NA TELA: o balão da abertura no centro, grande, brilhando; o rótulo "Abertura" · MOSTRA: balao
      const pB = [0.2, 1.75, 1.6];
      fx.b.abre.visible = true;
      fx.b.abre.position.set(...pB);
      // OBJETOS SE MEXENDO: o balão gira meia volta e brilha amarelo
      fx.b.abre.rotation.y = 0.35 * Math.sin(B.p * Math.PI);
      K.brilhar(fx.b.abre, B.t);
      // PERSONAGEM: o Léo embaixo · na palavra "abertura": aponta pro balão
      // INTERAÇÃO: ele aponta pra frase que acabou de dizer
      menino.colocar([-1.0, 0, 0.3], pB);
      menino.apontar(0.9);
      menino.humor('feliz');
      // EFEITOS VISUAIS: o rótulo amarelo · SONS: o do rótulo · brilho
      fx.rot.abertura.em(mais(pB, [0, -0.75, 0.2]), B.t - 0.05);
      K.som('brilho', B.inicio, 0.4);
      // CÂMERA: alvo o balão · girando · detalhe · frente · baixo (frase 11: passando, médio, olho)
      K.filmar([fx.b.abre, menino], 'girando', B.p, { plano: 'medio', lado: 'frente', altura: 'baixo', angulo: 20 });
    },

    vendendo(B, tc) {
      // NA TELA: o Léo empurrando o pacote contra a divisória; o doutor do outro lado fechando a cara · MOSTRA: pacote, personagem, doutor
      const tV = quando('vendendo', B, 0.3), tP = quando('pacote', B, 0.45), tC = quando('cara', B, 0.9);
      // ENTRA AGORA: o pacote caindo (palavra "pacote")
      pc.pacote.visible = tc > tP - 0.1;
      K.entrar(pc.pacote, 'cai', tc - tP, { dur: 0.45, altura: 2.5 });
      // OBJETOS SE MEXENDO: o Léo empurra o pacote até a divisória; o pacote treme; o balão murcha (palavra "cara")
      const emp = K.suave(K.clamp((tc - tP - 0.45) / Math.max(0.3, tC - tP - 0.5)));
      pc.pacote.position.x = -0.9 + 0.6 * emp;
      if (emp >= 1) K.falhar(pc.pacote, 'treme', tc - tC + 0.2, { dur: 0.6, forca: 0.6, som: 'range' });
      mostrarBalao(fx.b.vende, [-1.5, 2.3, 1.0], tc - tV);
      if (tc > tC) K.falhar(fx.b.vende, 'murcha', tc - tC, { dur: 0.6 });
      // PERSONAGEM: o Léo: empurrando · na palavra "cara": susto. O doutor: bravo, vira o rosto
      // INTERAÇÃO: o Léo empurra o pacote pra cima do doutor e o doutor fecha a cara
      menino.colocar([-1.75 + 0.6 * emp, 0, 0.95], [3, 0.5, 0.9]);
      if (tc > tC) menino.reagir('susto', tc - tC); else menino.reagir('empurrando', B.t);
      dr.g.visible = true;
      dr.colocar([1.6, 0, 0.6], tc > tC ? [4, 1, 3] : [-2, 1, 1]);
      if (tc > tC) dr.reagir('bravo', tc - tC); else dr.reagir('duvida', B.t);
      // SONS: baque (o K.entrar põe) · range (o K.falhar põe) · errado · o congela
      K.som('errado', tC, 0.6);
      // CÂMERA: alvo [pacote, personagem, doutor] · descendo · médio · de trás do Léo, pela direita · alto (frase 12: girando, perto, frente, baixo)
      K.filmar([pc.pacote, menino, dr], 'descendo', B.p, { plano: 'medio', lado: 30, altura: 'alto' });
      // EFEITOS VISUAIS: etiqueta vermelha "Cedo demais" (palavra "vendendo") · ✗ em cima do doutor (palavra "cara")
      fx.et.cedo.em([-0.3, 2.9, 1.0], tc - tV);
      const [ex, ey] = K.tela([1.6, 2.0, 0.6]);
      fx.errado.em({ tela: [ex, ey - 40] }, tc - tC);
    },

    pergunta(B, tc) {
      // NA TELA: o doutor de frente, pensando com o fone; o balão da pergunta; os 3 ícones em volta dele · MOSTRA: doutor, balao
      // CENÁRIO: a clínica; o quadro branco na parede da direita
      const tH = quando('Hoje', B, 0.45), tN = quando('negócio', B, 0.25), tO = quando('onde', B, 0.9);
      dr.g.visible = true;
      dr.colocar(DR, OLHA_CAM);
      foneNaOrelha();
      // ENTRA AGORA: o balão (palavra "Hoje"); os ícones subindo e girando (palavra "onde")
      mostrarBalao(fx.b.perg, [DR[0] - 0.4, 2.45, DR[2] + 0.6], tc - tH);
      fx.icones.forEach((p, i) => { const d = tc - tO - i * 0.12; p.visible = d > 0; const a = tc * 1.2 + i * 2.1; p.position.set(DR[0] + Math.cos(a) * 0.95, 1.55 + 0.25 * i + 0.1 * Math.sin(a), DR[2] + 0.3 + Math.sin(a) * 0.3); p.scale.setScalar(pop(d)); });
      // PERSONAGEM: o doutor: dúvida · na palavra "onde": pensando e falando. O Léo, ao fundo: segurando o celular, ouvindo
      // INTERAÇÃO: a pergunta faz o doutor pensar e falar do negócio dele
      if (tc > tO) { dr.reagir('pensando', tc - tO); dr.falar(tc - tO); } else dr.reagir('duvida', B.t);
      menino.colocar(LEO_MEIO, [3, 1, 0]);
      celNaOrelha(LEO_MEIO);
      menino.reagir('segurando', B.t);
      // EFEITOS VISUAIS: etiqueta azul "Pergunta do negócio" (palavra "negócio")
      fx.et.negocio.em([DR[0] - 0.4, 3.2, DR[2] + 0.6], tc - tN);
      // SONS: clique do balão · ding dos ícones
      K.som('clique', tH, 0.6);
      [0, 1, 2].forEach((i) => K.som('ding', tO + i * 0.12, 0.35));
      // CÂMERA: alvo [doutor, balao] · chegando · perto · frente · olho (frase 13: descendo, médio, alto)
      K.filmar([dr, fx.b.perg], 'chegando', B.p, { plano: 'perto', lado: 'frente', altura: 'olho' });
    },

    escuta(B, tc) {
      // NA TELA: o Léo perto do bebedouro, com o celular; a boca encolhendo de um lado; a orelha crescendo do outro · MOSTRA: personagem, orelha, boca
      // CENÁRIO: o canto da agência com o bebedouro
      const tF = quando('fala', B, 0.45), tM = quando('menos', B, 0.55), tE = quando('escuta', B, 0.75), tMa = quando('mais', B, 0.9);
      // ENTRA AGORA / OBJETOS SE MEXENDO: a boca surge e encolhe ("fala", "menos"); a orelha cresce ("escuta", "mais")
      pc.boca.visible = tc > tF - 0.05;
      const sb = pop(tc - tF) * (1 - 0.65 * K.suave(K.clamp((tc - tM) / 0.4)));
      pc.boca.scale.set(1.6 * sb, 0.55 * sb, 0.6 * sb);
      pc.orelha.visible = tc > tE - 0.05;
      const so = pop(tc - tE) * (0.6 + 0.5 * K.suave(K.clamp((tc - tMa) / 0.4)));
      pc.orelha.scale.set(0.45 * so, so, 0.3 * so);
      // PERSONAGEM: do lado do bebedouro · começo: pensando · na palavra "escuta": surpreso, inclinando a cabeça
      // INTERAÇÃO: ele aponta pra boca e depois encosta na orelha gigante
      menino.colocar(BEBE, OLHA_CAM);
      celNaOrelha(BEBE);
      if (tc > tE) { menino.reagir('surpreso', tc - tE); menino.olharPara(pc.orelha.position.toArray()); } else menino.reagir('pensando', B.t);
      // EFEITOS VISUAIS: etiqueta laranja "Fala menos" · etiqueta verde "Escuta mais"
      fx.et.menos.em(mais(pc.boca.position.toArray(), [0, 0.5, 0]), tc - tM);
      fx.et.mais.em(mais(pc.orelha.position.toArray(), [0, 0.75, 0]), tc - tMa);
      // SONS: bolhas do bebedouro · estalo da boca · brilho da orelha
      K.som('bolhas', B.inicio, 0.3, 1);
      K.som('estalo', tM, 0.5);
      K.som('brilho', tE, 0.5);
      // CÂMERA: alvo [personagem, orelha, boca] · revelando · médio · esquerda · olho (frase 14: chegando, perto, frente)
      K.filmar([menino, [-3.6, 1.55, 2.6], [-5.3, 1.45, 2.7]], 'afastando', B.p, { plano: 'medio', lado: 15, altura: 'olho' });
    },

    email(B, tc) {
      // NA TELA: o doutor de perto, com o fone; o balão "Me manda por e-mail."; o envelope voando pra lixeira · MOSTRA: doutor, balao_dr
      // CENÁRIO: a clínica; o telefone vermelho na mesa
      const tCl = quando('clássica', B, 0.3), tMa = quando('manda', B, 0.6), tE = quando('e-mail', B, 0.85);
      dr.g.visible = true;
      dr.colocar(DR, [-1, 1, 6]);
      foneNaOrelha();
      // ENTRA AGORA: o balão do doutor (palavra "manda"); a lixeira (palavra "clássica"); o envelope (palavra "e-mail")
      mostrarBalao(fx.bd.email, [DR[0] - 0.6, 2.35, DR[2] + 0.6], tc - tMa);
      pc.lixeira.visible = tc > tCl - 0.05;
      K.entrar(pc.lixeira, 'surge', tc - tCl, { dur: 0.3, som: false, destaque: false });
      // OBJETOS SE MEXENDO: o envelope sai do balão, dá uma volta e cai na lixeira
      const d = tc - tE;
      fx.envelope.visible = d > 0 && d < 1.2;
      const k = K.clamp(d / 0.8);
      const de = [DR[0] - 0.6, 2.2, DR[2] + 0.7], ate = mais(pc.lixeira.position.toArray(), [0, 0.3, 0]);
      fx.envelope.position.set(K.lerp(de[0], ate[0], k), K.lerp(de[1], ate[1], k) + Math.sin(Math.PI * k) * 0.6, K.lerp(de[2], ate[2], k));
      fx.envelope.rotation.z = k * 6;
      // PERSONAGEM: o doutor: cansado (com pressa) · na palavra "e-mail": mostrando ("manda aí")
      // INTERAÇÃO: o doutor despacha o Léo pro e-mail, e o e-mail vai pro lixo
      if (tc > tE) dr.reagir('mostrando', tc - tE); else dr.reagir('cansado', B.t);
      // SONS: whoosh do envelope · tampa da lixeira · o congela
      K.som('whoosh', tE, 0.5);
      K.som('tampa', tE + 0.8, 0.6);
      // CÂMERA: alvo [doutor, balao_dr] · girando · perto · perfil direita · baixo (frase 15: revelando, médio, esquerda, olho)
      K.filmar([dr, fx.bd.email, pc.lixeira], 'girando', B.p, { plano: 'perto', lado: -25, altura: 'olho', angulo: 20 });
      // EFEITOS VISUAIS: etiqueta laranja "A frase clássica" · ✗ no envelope quando cai no lixo
      fx.et.classica.em([DR[0] - 0.6, 3.05, DR[2] + 0.6], tc - tCl);
      const [ex, ey] = K.tela(ate);
      fx.errado.em({ tela: [ex, ey - 110] }, tc - tE - 0.8);
    },

    quinta(B, tc) {
      // NA TELA: a sala inteira de frente: o Léo calmo à esquerda, o doutor à direita; os balões; o doutor fazendo joinha · MOSTRA: personagem, doutor, balao
      const tMa = quando('Mando', B, 0.3), tQ = quando('quinze', B, 0.5), tMi = quando('minutinhos', B, 0.6), tMo = quando('mostrar', B, 0.92);
      dr.g.visible = true;
      const DQ = [1.4, 0, 0.7];
      dr.colocar(DQ, [0, 1, 4]);
      foneNaOrelha(DQ);
      // ENTRA AGORA: o balão "Mando sim! 15 min na quinta?" (palavra "Mando"); o "Pode ser!" (palavra "mostrar")
      mostrarBalao(fx.b.mando, [LEO_MEIO[0] - 0.1, 2.4, LEO_MEIO[2]], tc - tMa);
      mostrarBalao(fx.bd.pode, [DQ[0] + 0.2, 2.35, DQ[2] + 0.3], tc - tMo);
      // OBJETOS SE MEXENDO: as ondas indo e voltando devagar; o reloginho "15 min" (palavra "minutinhos")
      fx.ondas.em([LEO_MEIO[0] + 0.3, 1.6, LEO_MEIO[2]], 0, tc - B.inicio, 4.2, 0.7);
      fx.cont.min.em('15', [LEO_MEIO[0] + 1.1, 1.6, LEO_MEIO[2] + 0.3], tc - tMi, 'MIN');
      // PERSONAGEM: o Léo: mostrando (palma aberta) · em "mostrar": vitória. O doutor: dúvida → ideia (joinha)
      // INTERAÇÃO: o Léo concorda e pede uma coisa pequena; o doutor aceita
      menino.colocar(LEO_MEIO, [3, 1, 2]);
      celNaOrelha(LEO_MEIO);
      if (tc > tMo) menino.reagir('vitoria', tc - tMo); else menino.reagir('mostrando', B.t);
      if (tc > tMo) dr.reagir('ideia', tc - tMo); else dr.reagir('duvida', B.t);
      // SONS: clique dos balões · ding do reloginho · certo
      K.som('clique', tMa, 0.6);
      K.som('ding', tMi, 0.5);
      K.som('certo', tMo + 0.1, 0.7);
      // CÂMERA: alvo [personagem, doutor] · passando · aberto · frente · olho (frase 16: girando, perto, direita, baixo)
      K.filmar([menino, dr, fx.b.mando], 'passando', B.p, { plano: 'medio', lado: 'frente', altura: 'olho' });
      // EFEITOS VISUAIS: ✓ verde no balão do doutor (palavra "mostrar")
      const [ex, ey] = K.tela([DQ[0] + 0.2, 2.35, DQ[2] + 0.3]);
      fx.certo.em({ tela: [ex + 120, ey - 70] }, tc - tMo - 0.1);
    },

    proximo_passo(B, tc) {
      // NA TELA: a agenda grande de perto; a quinta pintando de verde; o carimbo "VENDIDO" com ✗; o Léo comemorando · MOSTRA: agenda
      // CENÁRIO: a agência
      const tPr = quando('próximo', B, 0.1), tVe = quando('vende', B, 0.5), tMa = quando('marca', B, 0.75), tCo = quando('conversa', B, 0.88);
      agendaG.visible = true;
      // OBJETOS SE MEXENDO: a agenda brilha; o carimbo desce, para no ar e some; o bloco verde da quinta encaixa (palavra "marca")
      desenharAgenda(K.suave(K.clamp((tc - tMa) / 0.4)));
      K.brilhar(agendaG, tc - tPr, 1.2);
      const dv = tc - tVe;
      fx.carimbo.visible = dv > 0 && dv < 1.0;
      fx.carimbo.position.set(AGENDA[0] + 0.1, AGENDA[1] + 0.2 + 0.6 * (1 - K.clamp(dv / 0.25)), AGENDA[2] + 0.25);
      fx.carimbo.rotation.set(0, 0.35, -0.15);
      // PERSONAGEM: começo: aponta pra agenda · na palavra "conversa": comemora
      // INTERAÇÃO: ele aponta pro dia marcado e comemora
      menino.colocar([-3.3, 0, 1.0], AGENDA);
      if (tc > tCo) menino.comemorar(tc - tCo); else { menino.apontar(0.8); menino.humor('feliz'); }
      // EFEITOS VISUAIS: o rótulo "Próximo passo" (sai antes da etiqueta) · ✗ no carimbo · etiqueta verde "Marca a conversa"
      if (tc < tMa) fx.rot.passo.em(mais(AGENDA, [0, -0.85, 0.3]), tc - tPr);
      fx.et.marca.em(mais(AGENDA, [0, 0.85, 0.2]), tc - tMa);
      // SONS: o do rótulo · errado no carimbo · trava do bloco
      K.som('errado', tVe + 0.25, 0.5);
      K.som('trava', tMa + 0.4, 0.7);
      // CÂMERA: alvo a agenda · subindo · perto · perfil esquerda · olho (frase 17: passando, aberto, frente)
      K.filmar([agendaG, menino], 'subindo', B.p, { plano: 'medio', lado: -15, altura: 'olho' });
      const [ex, ey] = K.tela(fx.carimbo.position.toArray());
      if (dv > 0.25 && dv < 1.0) fx.errado.em({ tela: [ex + 170, ey] }, dv - 0.25);
    },

    encontro(B, tc) {
      // NA TELA: a mesinha com 2 xícaras; a caixinha do anel abrindo em cima dela; o Léo atrás, de olhos arregalados · MOSTRA: cafe, anel
      // CENÁRIO: o canto do bebedouro da agência
      const tEn = quando('encontro', B, 0.2), tCa = quando('casamento', B, 0.6), tCf = quando('cafezinho', B, 0.88);
      // ENTRA AGORA: a mesinha subindo do chão (palavra "encontro"); a caixinha caindo (palavra "casamento")
      pc.cafe.visible = tc > tEn - 0.05;
      K.entrar(pc.cafe, 'sobe', tc - tEn, { dur: 0.4 });
      fx.anelG.visible = tc > tCa - 0.05;
      K.entrar(fx.anelG, 'cai', tc - tCa, { dur: 0.35, altura: 1.2, som: false });
      // OBJETOS SE MEXENDO: o vapor das xícaras; a caixinha abre e o anel brilha; o coração estoura (palavra "cafezinho")
      fx.vapor.em([CAFE[0], 0.95, CAFE[2] + 0.05], tc - tEn, { altura: 0.5, escala: 0.2 });
      fx.tampa.rotation.x = -1.6 * K.suave(K.clamp((tc - tCa - 0.35) / 0.3));
      fx.tampa.position.set(0, 0.08 + 0.05 * K.clamp((tc - tCa - 0.35) / 0.3), -0.1 * K.clamp((tc - tCa - 0.35) / 0.3));
      if (tc > tCa + 0.35) K.brilhar(fx.anelG, tc - tCa - 0.35, 0.8);
      fx.coracoes.em([CAFE[0], 1.1, CAFE[2]], tc - tCa - 0.3, K.clamp(1 - (tc - tCf) / 0.4));
      // PERSONAGEM: atrás da mesinha · começo: segurando a xícara · na palavra "casamento": susto
      // INTERAÇÃO: o anel aparecendo na mesa assusta o Léo
      menino.colocar([CAFE[0], 0, CAFE[2] - 0.75], OLHA_CAM);
      if (tc > tCa + 0.3) menino.reagir('susto', tc - tCa - 0.3); else menino.reagir('segurando', B.t);
      // SONS: brilho do anel · estalo do coração · errado baixinho
      K.som('brilho', tCa + 0.35, 0.6);
      K.som('estalo', tCf, 0.5);
      K.som('errado', tCf + 0.1, 0.35);
      // CÂMERA: alvo [cafe, anel] · mergulho · perto · direita · do alto (frase 18: subindo, médio, perfil esquerda)
      K.filmar([pc.cafe, fx.anelG, menino], 'mergulho', B.p, { plano: 'perto', lado: 'direita', altura: 'alto' });
      // EFEITOS VISUAIS: etiqueta laranja "Cedo demais!" (palavra "casamento") · ✗ em cima da caixinha (palavra "cafezinho")
      fx.et.cedo2.em([CAFE[0] + 0.6, 2.0, CAFE[2]], tc - tCa);
      const [ex, ey] = K.tela([CAFE[0], 1.15, CAFE[2] + 0.1]);
      fx.errado.em({ tela: [ex, ey - 90] }, tc - tCf);
    },

    antes_agora(B, tc) {
      // NA TELA: Antes: o Léo largado com o celular, os cartões com ✗, o "tu tu tu" caindo. Agora: a lista e o checklist com ✓ · MOSTRA: personagem, lista
      // CENÁRIO: a agência inteira, com o janelão e a cidade
      const tA = quando('Agora', B, 0.45), tTu = quando('tu', B, 0.3), tQ = quando('qualquer', B, 0.12);
      const tLc = quando('certa', B, 0.62), tAb = quando('abertura', B, 0.72), tPe = quando('pergunta', B, 0.82), tPr = quando('próximo', B, 0.92);
      const antes = tc < tA;
      if (antes) {
        // OBJETOS SE MEXENDO: os "tu tu tu" saem do celular e caem; os cartões com ✗ em volta
        contatosG.visible = true;
        fx.contatos.forEach((p) => { p.visible = true; });
        K.falhar(fx.contatos[0], 'apaga', 1, { dur: 0.1, som: false });
        fx.tus.forEach((p, i) => { const d = tc - tTu - i * 0.25; p.visible = d > 0; p.position.set(-2.6 + i * 0.35, 1.7 - Math.min(1.5, d * d * 3), 1.6); p.scale.setScalar(pop(d)); });
        // PERSONAGEM: cansado, largado com o celular
        menino.colocar([-3.0, 0, 1.4], OLHA_CAM);
        celNaOrelha([-3.0, 0, 1.4]);
        desenharCel('tu');
        menino.reagir('cansado', tc - B.inicio);
        // EFEITOS VISUAIS: etiqueta vermelha "Qualquer um" · SONS: desliga 3 vezes
        fx.et.antes.em([-1.9, 3.0, 1.0], tc - tQ);
        [0, 0.25, 0.5].forEach((d) => K.som('desliga', tTu + d, 0.35));
        // CÂMERA: alvo [personagem, contatos] · afastando · médio · frente · alto
        K.filmar([menino, contatosG], 'afastando', K.clamp((tc - B.inicio) / (tA - B.inicio)) * 0.5, { plano: 'medio', lado: 'frente', altura: 'alto' });
      } else {
        // ENTRA AGORA: a lista sobe (palavra "lista"); o checklist ganha um ✓ por palavra
        listaG.visible = true;
        desenharLista(16, true, '100+');
        telaMappoa();
        K.entrar(listaG, 'sobe', tc - tA, { dur: 0.5 });
        chkG.visible = true;
        K.entrar(chkG, 'cresce', tc - tA, { dur: 0.4, som: false });
        const n = [tLc, tAb, tPe, tPr].filter((t) => tc > t).length;
        desenharChk(n);
        // PERSONAGEM: levanta num pulo e vitória, apontando cada item
        // INTERAÇÃO: ele monta a ligação peça por peça
        menino.colocar([-3.3, 0, 1.2], chkG.position.toArray());
        if (tc - tA < 0.5) menino.reagir('vitoria', tc - tA); else { menino.apontar(0.7); menino.humor('feliz'); }
        // EFEITOS VISUAIS: etiqueta verde "Agora" · SONS: certo em cada ✓
        fx.et.agora.em([-1.2, 3.9, 0.3], tc - tA);
        [tLc, tAb, tPe, tPr].forEach((t) => K.som('certo', t, 0.45));
        // CÂMERA: alvo [personagem, lista] · afastando · médio → aberto · frente · alto
        K.filmar([menino, listaG, chkG], 'afastando', 0.5 + 0.5 * K.clamp((tc - tA) / (B.ate - tA)), { plano: 'medio', lado: 'frente', altura: 'alto' });
      }
    },

    segue(B, tc) {
      // NA TELA: o Léo digitando no computador; a barra "mappoa.com" grande em cima; o cartão de seguir no topo · MOSTRA: navegador, computador, personagem
      // CENÁRIO: a agência; o janelão com a cidade atrás
      const tQ = quando('Qual', B, 0.02), tCo = quando('Comenta', B, 0.35), tPc = quando('computador', B, 0.5), tDi = quando('digita', B, 0.6), tTe = quando('testa', B, 0.88);
      // ENTRA AGORA: a chamada (palavra "Qual"), depois o cartão de seguir (palavra "computador"); o balão de comentário (palavra "Comenta")
      if (tc < tPc) fx.cta.em(tc - tQ); else fx.seguir.em(tc - tPc);
      const dc = tc - tCo;
      fx.comenta.visible = dc > 0 && dc < 0.9;
      fx.comenta.position.set(LEO[0] + 0.3, 1.9 + dc * 0.6, LEO[2] + 0.2);
      fx.comenta.scale.setScalar(pop(dc) * (dc > 0.7 ? 1 + (dc - 0.7) * 3 : 1));
      // ENTRA AGORA: a barra de endereço (palavra "computador"); "mappoa.com" letra por letra (palavra "digita")
      navG.visible = tc > tPc - 0.05;
      K.entrar(navG, 'cresce', tc - tPc, { dur: 0.4 });
      const letras = Math.max(0, Math.min(10, Math.floor((tc - tDi) / 0.08)));
      desenharNav(letras, tc > tTe);
      telaEndereco(letras);
      // PERSONAGEM: começo: chamando, de frente pra câmera · em "computador": digita · em "testa": aponta pra barra
      // INTERAÇÃO: ele digita mappoa.com e aponta pro endereço
      if (tc < tPc) { menino.colocar(LEO, OLHA_CAM); menino.reagir('chamando', B.t); }
      else { menino.colocar(LEO, tc > tTe ? NAV : TELA); if (tc > tTe) { menino.apontar(0.9); menino.humor('feliz'); } else menino.reagir('segurando', tc - tPc); }
      // SONS: estalo do balão · clique de cada letra · ding no "Ir" · clique do seguir
      K.som('estalo', tCo + 0.7, 0.4);
      for (let k = 0; k < 10; k++) K.som('clique', tDi + k * 0.08, 0.3);
      K.som('ding', tTe, 0.6);
      K.som('clique', tPc + K.SEGUIR_CLIQUE, 0.9);
      // CÂMERA: alvo [navegador, computador, personagem] · chegando · aberto · frente · olho · topo livre (frase 20: afastando, alto)
      K.filmar([navG, comp.g, menino], 'chegando', B.p, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },

    cartao(B, tc) {
      // A cauda: o cartão fica (já em "Seguindo"), o Léo aponta e acena; mappoa.com continua legível
      navG.visible = true;
      desenharNav(10, true);
      telaEndereco(10);
      menino.colocar(LEO, OLHA_CAM);
      fx.seguir.em(9);
      menino.acenar(tc);
      menino.humor('feliz');
      K.som('final', B.inicio, 0.7);
      K.filmar([navG, comp.g, menino], 'parado', 1, { plano: 'aberto', lado: 'frente', altura: 'olho', espacoCima: 0.4 });
    },

    capa(B, tc) {
      // A capa: o Léo em susto com o celular na orelha; o doutor do outro lado batendo o fone, bravo
      dr.g.visible = true;
      dr.colocar([1.5, 0, 0.6], [-2, 1, 3]);
      dr.reagir('bravo', 0.5);
      menino.colocar([-1.3, 0, 1.0], [1, 1, 4]);
      celNaOrelha([-1.3, 0, 1.0]);
      desenharCel('tu');
      menino.reagir('susto', 0.6);
      K.filmar([menino, dr], 'parado', 0, { plano: 'medio', lado: 'frente', altura: 'olho', espacoCima: 0.35 });
    }
  };

  // ---------- Quadro ----------

  function cena(tc, t, plano) {
    const B = plano ? { plano, p: 0.5, t: 1, dur: 2, inicio: 0, ate: 2, q: 0.5, tq: 1, bloco: { reb: 0 } } : K.blocoEm(bl, tc);
    // Tudo volta pro lugar, e o que só aparece em algumas frases começa escondido: o plano mostra o que precisa
    foneNoGancho();
    casas.forEach(({ o, p, r, s }) => { o.position.copy(p); o.rotation.copy(r); o.scale.copy(s); });
    menino.g.visible = false;
    dr.g.visible = false;
    [listaG, agendaG, navG, celG, contatosG, chkG, fx.anelG, pc.pacote, pc.orelha, pc.boca, pc.cafe, pc.lixeira,
      fx.envelope, fx.carimbo, fx.comenta].forEach((o) => { o.visible = false; });
    fx.contatos.forEach((p) => { p.visible = false; });
    [...Object.values(fx.b), ...Object.values(fx.bd), ...fx.interroga, ...fx.tus, ...fx.icones, ...fx.pacientes].forEach((o) => { o.visible = false; o.rotation.set(0, 0, 0); });
    [fx.ondas, fx.ondasTel].forEach((o) => o.esconder());
    celG.scale.setScalar(1);
    telaDesligada();
    if (!P[B.plano]) throw new Error(`Falta o plano "${B.plano}" no cena.js (um por frase do roteiro.json)`);
    P[B.plano](B, tc);
  }

  window.CENA = { montar, cena, capa: () => cena(0, 0, 'capa') };
})();
