// Sombra lisa em tudo (pedido do canal: nada de riscos em objeto, parede, chão ou personagem). A sombra macia do estilo
// redondo (VSM) é a que risca: logo depois que o motor liga ela, troca pela lisa (PCF). Vale pros vídeos e pras fotos dos modelos
(function () {
  const K = window.K; if (!K || !K.preparar) return;
  const original = K.preparar;
  K.preparar = function () {
    const volta = original.apply(this, arguments);
    if (K.renderer && K.sol) {
      K.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      K.sol.shadow.bias = -0.0005;
      K.sol.shadow.normalBias = 0.05;
      if (K.sol.shadow.map) { K.sol.shadow.map.dispose(); K.sol.shadow.map = null; }
    }
    return volta;
  };
})();
