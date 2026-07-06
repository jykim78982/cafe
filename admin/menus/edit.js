(function () {
  "use strict";
  CafeData.init();

  var id = new URLSearchParams(window.location.search).get("id");
  var menu = id ? CafeData.getMenuById(id) : null;

  if (!menu) {
    document.querySelector(".page").innerHTML = "<h1>메뉴를 찾을 수 없습니다</h1><a class=\"btn btn-outline\" href=\"list.html\">목록으로</a>";
    return;
  }

  document.getElementById("name").value = menu.name;
  document.getElementById("category").value = menu.category;
  document.getElementById("price").value = menu.price;
  document.getElementById("description").value = menu.description || "";
  document.getElementById("soldOut").checked = !!menu.soldOut;

  var form = document.getElementById("edit-form");
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

    CafeData.updateMenu(menu.id, {
      name: name,
      category: document.getElementById("category").value,
      price: price,
      description: document.getElementById("description").value.trim(),
      soldOut: document.getElementById("soldOut").checked
    });

    window.location.href = "detail.html?id=" + encodeURIComponent(menu.id);
  });
})();
