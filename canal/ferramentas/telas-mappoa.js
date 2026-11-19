// Junta as telas reais do Mappoa (canal/telas-mappoa/*.jpg, 1280 x 720) num arquivo que o render carrega
// (canal/pecas/zy-telas-mappoa-dados.js, window.TELAS_MAPPOA = { nome: dataURL }). Rodar de novo depois de pôr ou
// trocar uma tela: node canal/ferramentas/telas-mappoa.js
// A peça que usa as telas é canal/pecas/zz-telas-mappoa.js (K.celularMappoa, K.monitorMappoa, K.notebookMappoa).
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const pasta = path.join(raiz, 'telas-mappoa');
const telas = {};
fs.readdirSync(pasta).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort().forEach((f) => {
  const tipo = /png$/i.test(f) ? 'png' : 'jpeg';
  telas[f.replace(/\.[^.]+$/, '')] = `data:image/${tipo};base64,` + fs.readFileSync(path.join(pasta, f)).toString('base64');
});
const saida = path.join(raiz, 'pecas', 'zy-telas-mappoa-dados.js');
fs.writeFileSync(saida, '// Gerado por canal/ferramentas/telas-mappoa.js a partir de canal/telas-mappoa/ (não editar à mão)\n' +
  'window.TELAS_MAPPOA = ' + JSON.stringify(telas) + ';\n');
console.log(`${Object.keys(telas).length} telas → ${path.relative(raiz, saida)} (${(fs.statSync(saida).size / 1e6).toFixed(1)} MB): ${Object.keys(telas).join(', ')}`);
