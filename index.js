(function () {
  "use strict";

  CafeData.init();

  document.getElementById("cartCount").textContent = CafeUtils.getCartCount();
})();
