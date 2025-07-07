// projects.js
document.addEventListener("DOMContentLoaded", function () {
  fetchAllProjects();
  setupFilterButtons();
});

async function fetchAllProjects() {
  try {
    // Mostrar esqueletos de loading
    const projectsGrid = document.querySelector(".all-projects-grid");

    // Buscar todos os projetos do GitHub
    const response = await fetch(
      "https://api.github.com/users/thednz/repos?sort=updated"
    );
    const projects = await response.json();

    // Limpar esqueletos
    projectsGrid.innerHTML = "";

    // Adicionar projetos reais
    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card animate-on-scroll";
      projectCard.dataset.category = getProjectCategory(project);

      projectCard.innerHTML = `
                <img src="images/project-placeholder.jpg" alt="${
                  project.name
                }" class="project-image">
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description || "Sem descrição disponível."}</p>
                    <div class="project-links">
                        <a href="${project.html_url}" target="_blank">GitHub</a>
                        ${
                          project.homepage
                            ? `<a href="${project.homepage}" target="_blank">Demo</a>`
                            : ""
                        }
                    </div>
                </div>
            `;

      projectsGrid.appendChild(projectCard);
    });

    // Ativar animações
    animateOnScroll();
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
    document.querySelector(".all-projects-grid").innerHTML =
      '<p class="error-message">Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.</p>';
  }
}

function getProjectCategory(project) {
  // Esta é uma função simplificada - você pode melhorar com tags reais dos projetos
  if (project.name.toLowerCase().includes("mobile")) return "mobile";
  if (
    project.name.toLowerCase().includes("js") ||
    project.name.toLowerCase().includes("javascript")
  )
    return "javascript";
  return "web";
}

function setupFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover classe active de todos os botões
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Adicionar classe active ao botão clicado
      this.classList.add("active");

      // Filtrar projetos
      const filter = this.dataset.filter;
      filterProjects(filter);
    });
  });
}

function filterProjects(filter) {
  const projects = document.querySelectorAll(".project-card");

  projects.forEach((project) => {
    if (filter === "all" || project.dataset.category === filter) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}
