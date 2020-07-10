function menuToggle() {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector(".nav");
  menu.classList.toggle("menu-active");
  nav.classList.toggle("nav-active");
}



window.onload = function () {
  window.addEventListener("scroll", () => showBottom((window.pageYOffset > window.innerHeight)));
};

let prev = false;
function showBottom(ok) {
  const scrol = document.querySelector(".UP");
  if (ok) {
    if (prev) return;
    scrol.classList.add("activeUP");
    prev = ok;
  } else {
    prev && scrol.classList.remove("activeUP");
    prev = ok;
  }
}
