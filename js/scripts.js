import "../scss/styles.scss";
window.onscroll = function () {
  init();
};
function init() {
  let menu = document.getElementById("menu");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    menu.classList.add("menu-dark");
  } else {
    menu.classList.remove("menu-dark");
  }
}
