document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validação simples
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
      contactForm.reset();
    });
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
