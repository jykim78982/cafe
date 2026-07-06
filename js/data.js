/* 메뉴/카테고리 데이터 레이어. localStorage에 저장하고, 관리자 CRUD(2단계)와 고객 조회(3단계)가 공통으로 사용합니다. */
(function (global) {
  "use strict";

  var STORAGE_KEY = "cafeapp_menus";

  var CATEGORIES = ["전체", "커피", "음료", "디저트"];

  var SEED_MENUS = [
    { id: "m1", name: "아메리카노", category: "커피", price: 4500, description: "깊고 진한 에스프레소에 물을 더한 클래식 커피", image: "", soldOut: false },
    { id: "m2", name: "카페라떼", category: "커피", price: 5000, description: "부드러운 우유 거품이 어우러진 라떼", image: "", soldOut: false },
    { id: "m3", name: "바닐라빈 프라페", category: "음료", price: 5800, description: "바닐라빈이 콕콕 박힌 시원한 프라페", image: "", soldOut: false },
    { id: "m4", name: "치즈케이크", category: "디저트", price: 6500, description: "진한 크림치즈로 만든 촉촉한 케이크", image: "", soldOut: false }
  ];

  function read() {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function write(menus) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  }

  function init() {
    if (read() === null) {
      write(SEED_MENUS);
    }
  }

  function generateId() {
    return "m_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function getCategories() {
    return CATEGORIES.slice();
  }

  function getMenus() {
    return read() || [];
  }

  function getMenuById(id) {
    return getMenus().find(function (m) { return m.id === id; }) || null;
  }

  function addMenu(menu) {
    var menus = getMenus();
    var newMenu = Object.assign({ id: generateId(), soldOut: false }, menu);
    menus.push(newMenu);
    write(menus);
    return newMenu;
  }

  function updateMenu(id, updates) {
    var menus = getMenus();
    var index = menus.findIndex(function (m) { return m.id === id; });
    if (index === -1) return null;
    menus[index] = Object.assign({}, menus[index], updates);
    write(menus);
    return menus[index];
  }

  function deleteMenu(id) {
    write(getMenus().filter(function (m) { return m.id !== id; }));
  }

  global.CafeData = {
    init: init,
    getCategories: getCategories,
    getMenus: getMenus,
    getMenuById: getMenuById,
    addMenu: addMenu,
    updateMenu: updateMenu,
    deleteMenu: deleteMenu
  };
})(window);
