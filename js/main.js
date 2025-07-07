// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initThemeSystem();
  loadDynamicContent();
  setupAnimations();
});

// ===== FUNÇÕES PRINCIPAIS =====
function initNavigation() {
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");

  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
    this.classList.toggle("active");
  });
}

function initThemeSystem() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = "🌓";
  document.body.appendChild(themeToggle);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Verificar localStorage para preferência salva
  const savedTheme =
    localStorage.getItem("portfolio-theme") ||
    (prefersDark.matches ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", toggleTheme);
  prefersDark.addListener(updateTheme);
}

// ===== FUNÇÕES AUXILIARES =====
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio-theme", newTheme);
}

function updateTheme(e) {
  const theme = e.matches ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
}
