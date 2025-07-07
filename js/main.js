/**
 * ARQUIVO PRINCIPAL JS - PORTFÓLIO theDNZ
 * Todas as funcionalidades unificadas
 */

// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa todos os módulos
  initNavigation();
  initThemeSystem();
  initAnimations();
  loadDynamicContent();

  // Atualiza o ano no footer
  document.getElementById("year").textContent = new Date().getFullYear();
});

// ===== MÓDULO DE NAVEGAÇÃO =====
function initNavigation() {
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");

  // Menu mobile
  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Fechar menu ao clicar em links
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navList.classList.remove("active");

      // Scroll suave para seções
      if (link.hash) {
        const target = document.querySelector(link.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// ===== MÓDULO DE TEMA =====
function initThemeSystem() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = "🌓";
  themeToggle.title = "Alternar tema";
  document.body.appendChild(themeToggle);

  // Verificar preferências do sistema
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  // Verificar tema salvo
  const savedTheme = localStorage.getItem("portfolio-theme");

  // Aplicar tema inicial
  const initialTheme = savedTheme || (prefersDark.matches ? "dark" : "light");
  applyTheme(initialTheme);

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);
  prefersDark.addListener(handleSystemThemeChange);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  // Atualizar ícone
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.innerHTML = theme === "light" ? "🌙" : "☀️";
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
}

function handleSystemThemeChange(e) {
  if (!localStorage.getItem("portfolio-theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
}

// ===== MÓDULO DE ANIMAÇÕES =====
function initAnimations() {
  // Animações ao scroll
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Efeito hover nos cards
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const animationPoint = windowHeight / 1.3;

    if (elementPosition < animationPoint) {
      element.classList.add("animated");
    }
  });
}

// ===== MÓDULO DE CONTEÚDO DINÂMICO =====
function loadDynamicContent() {
  // Carregar projetos do GitHub
  if (document.querySelector(".projects-grid")) {
    fetchProjects();
  }

  // Validar formulário de contato
  if (document.getElementById("contact-form")) {
    setupFormValidation();
  }
}

async function fetchProjects() {
  try {
    const response = await fetch(
      "https://api.github.com/users/thednz/repos?sort=updated"
    );
    const projects = await response.json();
    const projectsGrid = document.querySelector(".projects-grid");

    if (projectsGrid) {
      projectsGrid.innerHTML = "";

      projects.slice(0, 6).forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.className = "card animate-on-scroll";
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description || "Sem descrição disponível."}</p>
            <div class="project-links">
              <a href="${
                project.html_url
              }" target="_blank" class="btn">Ver no GitHub</a>
              ${
                project.homepage
                  ? `<a href="${project.homepage}" target="_blank" class="btn">Ver Demo</a>`
                  : ""
              }
            </div>
          `;
        projectsGrid.appendChild(projectCard);
      });
    }
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
  }
}

function setupFormValidation() {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const message = form.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      if (!validateEmail(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }

      // Simular envio
      alert("Mensagem enviada com sucesso! Entrarei em contato em breve.");
      form.reset();
    });
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
