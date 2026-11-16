// Converte os modelos do canal (K.m3d, canal/pecas/) no formato oficial de modelos prontos da Máquina e grava o pacote em
// canal/pacote-mappoa/. Rodar depois de mudar um modelo: node canal/ferramentas/assar-modelos.js e, em seguida,
// npm run painel -- --pacote canal/pacote-mappoa. Só mede, sem gravar: --medir
const fs = require('fs');
const path = require('path');
const RAIZ = path.resolve(__dirname, '..', '..');
const N = require(path.join(RAIZ, 'motor', 'navegador'));
const SAIDA = path.join(RAIZ, 'canal', 'pacote-mappoa', 'motor', 'modelos');
const medir = process.argv.includes('--medir');

function pagina() {
  const b64 = (buf) => { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 32766) s += String.fromCharCode.apply(null, u.subarray(i, i + 32766)); return btoa(s); };
  const canal = (x) => Math.min(255, Math.max(0, Math.round((x <= 0.0031308 ? x * 12.92 : 1.055 * Math.pow(x, 1 / 2.4) - 0.055) * 255)));
  const srgb = (c) => [canal(c.r), canal(c.g), canal(c.b)];
  window.ASSAR = function (fazer, celulas) {
    const P = [], NN = [], C = [];
    const v = new THREE.Vector3(), n = new THREE.Vector3(), nm = new THREE.Matrix3();
    const canto = (q, no, cor) => { P.push(q.x / 5, q.y / 5, q.z / 5); NN.push(Math.round(no.x * 127), Math.round(no.y * 127), Math.round(no.z * 127)); C.push(cor[0], cor[1], cor[2]); };
    const g = fazer(); g.updateMatrixWorld(true);
    g.traverseVisible((m) => {
      if (!m.isMesh || !m.geometry || !m.material) return;
      const mat = Array.isArray(m.material) ? m.material[0] : m.material;
      if (mat.transparent && mat.opacity < 0.5) return;
      const dupla = mat.side === THREE.DoubleSide;
      nm.getNormalMatrix(m.matrixWorld);
      if (mat.map && mat.map.image && m.geometry.type === 'PlaneGeometry') {
        // Tela ou placa desenhada: vira retângulos coloridos (o formato só guarda cor por vértice)
        const pa = m.geometry.parameters, img = mat.map.image, nx = Math.min(celulas, img.width), ny = Math.max(1, Math.round((nx * pa.height) / pa.width));
        const cv = document.createElement('canvas'); cv.width = nx; cv.height = ny;
        const c2 = cv.getContext('2d', { willReadFrequently: true }); c2.drawImage(img, 0, 0, nx, ny);
        const d = c2.getImageData(0, 0, nx, ny).data, q = (x) => Math.min(255, Math.round(x / 10) * 10);
        const corDe = (i) => (d[i + 3] < 190 ? null : `${q(d[i])},${q(d[i + 1])},${q(d[i + 2])}`);
        n.set(0, 0, 1).applyMatrix3(nm).normalize(); const no = n.clone();
        const fechar = (r, yFim) => {
          const x0 = (r.a / nx - 0.5) * pa.width, x1 = (r.b / nx - 0.5) * pa.width, y0 = (0.5 - r.y / ny) * pa.height, y1 = (0.5 - yFim / ny) * pa.height;
          const pt = (x, y) => new THREE.Vector3(x, y, 0).applyMatrix4(m.matrixWorld), a = pt(x0, y1), b = pt(x1, y1), c = pt(x1, y0), e = pt(x0, y0), cor = r.cor.split(',').map(Number);
          [a, b, c, a, c, e].forEach((p) => canto(p, no, cor));
        };
        let abertos = new Map();
        for (let y = 0; y <= ny; y++) {
          const agora = new Map();
          if (y < ny) {
            let x = 0;
            while (x < nx) {
              const c = corDe((y * nx + x) * 4); let f = x + 1;
              while (f < nx && corDe((y * nx + f) * 4) === c) f++;
              if (c) { const k = `${x}:${f}:${c}`; agora.set(k, abertos.get(k) || { a: x, b: f, y, cor: c }); }
              x = f;
            }
          }
          abertos.forEach((r, k) => { if (!agora.has(k)) fechar(r, y); });
          abertos = agora;
        }
        return;
      }
      const geo = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry, pos = geo.attributes.position, nor = geo.attributes.normal;
      const base = mat.color.clone();
      if (mat.emissive && mat.emissiveIntensity) base.add(mat.emissive.clone().multiplyScalar(mat.emissiveIntensity * 0.6));
      const cor = srgb(base);
      for (let i = 0; i < pos.count; i += 3) {
        const q = [0, 1, 2].map((k) => v.fromBufferAttribute(pos, i + k).applyMatrix4(m.matrixWorld).clone());
        const ns = [0, 1, 2].map((k) => n.fromBufferAttribute(nor, i + k).applyMatrix3(nm).normalize().clone());
        [0, 1, 2].forEach((k) => canto(q[k], ns[k], cor));
        if (dupla) [2, 1, 0].forEach((k) => canto(q[k], ns[k].clone().negate(), cor));
      }
    });
    if (g.parent) g.parent.remove(g);
    // Todo modelo pronto fica em pé no chão: a base em y = 0
    let chao = 1e9; for (let i = 1; i < P.length; i += 3) if (P[i] < chao) chao = P[i];
    for (let i = 1; i < P.length; i += 3) P[i] -= chao;
    const mn = [1e9, 1e9, 1e9], mx = [-1e9, -1e9, -1e9];
    for (let i = 0; i < P.length; i++) { const e = i % 3; if (P[i] < mn[e]) mn[e] = P[i]; if (P[i] > mx[e]) mx[e] = P[i]; }
    return { caixa: [mn.map((x) => +x.toFixed(3)), mx.map((x) => +x.toFixed(3))], p: b64(new Float32Array(P).buffer), n: b64(new Int8Array(NN).buffer), c: b64(new Uint8Array(C).buffer), tris: P.length / 9 };
  };
}

(async () => {
  const { browser } = await N.abrir();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.setContent('<!doctype html><html><body><div id="palco" style="position:relative;width:1080px;height:1920px"><div class="legenda" id="legenda"></div></div></body></html>');
  await page.addScriptTag({ path: path.join(RAIZ, 'node_modules', 'three', 'build', 'three.min.js') });
  await page.addScriptTag({ path: path.join(RAIZ, 'motor', 'kit.js') });
  for (const f of ['bichos.js', 'cenarios.js']) await page.addScriptTag({ path: path.join(RAIZ, 'motor', f) });
  const pecas = path.join(RAIZ, 'canal', 'pecas');
  for (const f of fs.readdirSync(pecas).filter((x) => x.endsWith('.js')).sort()) await page.addScriptTag({ path: path.join(pecas, f) });
  await page.addScriptTag({ content: `(${pagina.toString()})();` });
  await page.evaluate(() => { const tl = { frases: [{ texto: 'x', marcado: 'x', plano: 'v', inicio: 0, fim: 4, palavras: [] }], total: 4, capa: '', estilo: 'redondo', roteiro: {} }; K.init(); K.preparar(tl); K.cenario('estudio', { pedestal: false }); });
  const lista = (await page.evaluate(() => K.m3d.lista())).filter((i) => i.nome !== 'painel');
  const PACOTE = { moveis: 'mappoa-moveis', tecnologia: 'mappoa-tecnologia', vendas: 'mappoa-vendas', nichos: 'mappoa-nichos', mappoa: 'mappoa' };
  const saida = {}, maior = []; let total = 0;
  for (const it of lista) {
    const tela = it.nome.startsWith('tela_');
    const r = await page.evaluate(([n, cel]) => window.ASSAR(() => {
      const g = K.m3d(n, n === 'mapa' ? { pinos: 7 } : {}), a = g.userData.m3d;
      if (n === 'mapa') a.em(1, 9);
      if (n === 'robo') a.em(0.4, { flutua: 0 });
      return g;
    }, cel), [it.nome, tela ? 340 : 200]);
    const pacote = tela ? 'mappoa-telas' : PACOTE[it.cat];
    const chave = it.titulo.replace(/\s*\(.*\)$/, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
    (saida[pacote] = saida[pacote] || []).push([`${pacote}/${chave}`, r]);
    total += r.tris; maior.push([r.tris, it.nome]);
  }
  let bytes = 0;
  if (!medir) fs.mkdirSync(SAIDA, { recursive: true });
  if (!medir) for (const f of fs.readdirSync(SAIDA)) fs.rmSync(path.join(SAIDA, f));
  for (const [pacote, itens] of Object.entries(saida)) {
    const js = `// Modelos 3D do canal Mappoa, gerados por canal/ferramentas/assar-modelos.js a partir de canal/pecas/: não editar à mão. Na cena: K.modelo('${pacote}/<nome>', { escala: 5, pos, giro }).\nwindow.MODELOS_PRONTOS = window.MODELOS_PRONTOS || {};\n` + itens.map(([k, r]) => `window.MODELOS_PRONTOS['${k}'] = ${JSON.stringify({ caixa: r.caixa, p: r.p, n: r.n, c: r.c })};`).join('\n') + '\n';
    bytes += Buffer.byteLength(js);
    if (!medir) fs.writeFileSync(path.join(SAIDA, pacote + '.js'), js);
  }
  if (!medir) fs.copyFileSync(path.join(__dirname, 'sombra-lisa.txt'), path.join(SAIDA, 'mappoa-sombra-lisa.js'));
  if (!medir) fs.writeFileSync(path.join(RAIZ, 'canal', 'pacote-mappoa', 'pacote.json'), JSON.stringify({ nome: 'Modelos do Mappoa', versao: new Date().toISOString().slice(0, 10), maquina: '2.3.0' }, null, 2) + '\n');
  await browser.close();
  console.log('modelos', lista.length, 'triangulos', total, 'MB', (bytes / 1048576).toFixed(1), 'erros', erros.length ? erros.join(' | ') : 'nenhum');
  console.log('maiores', maior.sort((a, b) => b[0] - a[0]).slice(0, 12).map(([t, n]) => `${n}:${t}`).join(' '));
})().catch((e) => { console.error(e); process.exit(1); });
