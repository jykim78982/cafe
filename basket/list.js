(function () {
  "use strict";

  var basketList = document.getElementById("basketList");
  var emptyState = document.getElementById("emptyState");
  var summaryCard = document.getElementById("summaryCard");
  var totalCount = document.getElementById("totalCount");
  var totalPrice = document.getElementById("totalPrice");
  var cartCount = document.getElementById("cartCount");
  var checkoutButton = document.getElementById("checkoutButton");
  var toast = document.getElementById("toast");
  var toastTimer = null;

  CafeData.init();

  function updateCartCount() {
    cartCount.textContent = CafeUtils.getCartCount();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 1800);
  }

  function renderRow(item) {
    return "" +
      '<article class="basket-row glass" data-menu-id="' + CafeUtils.escapeHtml(item.menuId) + '">' +
        '<div class="item-info">' +
          "<h3>" + CafeUtils.escapeHtml(item.name) + "</h3>" +
          '<p class="unit-price">' + CafeUtils.formatPrice(item.price) + "</p>" +
        "</div>" +
        '<div class="qty-control" aria-label="수량 선택">' +
          '<button type="button" class="decrease-btn" aria-label="수량 감소">-</button>' +
          "<output>" + item.qty + "</output>" +
          '<button type="button" class="increase-btn" aria-label="수량 증가">+</button>' +
        "</div>" +
        '<div class="line-actions">' +
          '<strong class="line-price">' + CafeUtils.formatPrice(item.price * item.qty) + "</strong>" +
          '<button type="button" class="remove-btn">삭제</button>' +
        "</div>" +
      "</article>";
  }

  function render() {
    var cart = CafeUtils.getCart();

    if (cart.length === 0) {
      basketList.innerHTML = "";
      emptyState.hidden = false;
      summaryCard.hidden = true;
    } else {
      emptyState.hidden = true;
      summaryCard.hidden = false;
      basketList.innerHTML = cart.map(renderRow).join("");
    }

    totalCount.textContent = CafeUtils.getCartCount() + "개";
    totalPrice.textContent = CafeUtils.formatPrice(CafeUtils.getCartTotal());
    updateCartCount();
  }

  basketList.addEventListener("click", function (event) {
    var row = event.target.closest("[data-menu-id]");
    if (!row) return;

    var menuId = row.dataset.menuId;
    var cart = CafeUtils.getCart();
    var item = cart.find(function (c) { return c.menuId === menuId; });
    if (!item) return;

    if (event.target.closest(".increase-btn")) {
      CafeUtils.updateCartQty(menuId, item.qty + 1);
      render();
    } else if (event.target.closest(".decrease-btn")) {
      CafeUtils.updateCartQty(menuId, item.qty - 1);
      render();
    } else if (event.target.closest(".remove-btn")) {
      CafeUtils.removeFromCart(menuId);
      showToast("'" + item.name + "'을(를) 장바구니에서 삭제했습니다.");
      render();
    }
  });

  checkoutButton.addEventListener("click", function () {
    if (CafeUtils.getCart().length === 0) return;
    window.location.href = "../orders/list.html";
  });

  render();
})();
