(function () {
  "use strict";
  CafeData.init();

  var form = document.getElementById("create-form");
  var errorEl = document.getElementById("form-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var price = Number(document.getElementById("price").value);

    if (!name || !price || price < 0) {
      errorEl.textContent = "메뉴명과 올바른 가격을 입력해주세요.";
      errorEl.style.display = "block";
      return;
    }

    CafeData.addMenu({
      name: name,
      category: document.getElementById("category").value,
      price: price,
      description: document.getElementById("description").value.trim()
    });

    window.location.href = "list.html";
  });
})();
