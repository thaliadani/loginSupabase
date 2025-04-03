document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Verifica o tema salvo no localStorage ou o preferido pelo sistema
  const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

  // Aplica o tema inicial
  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Modo Claro";
  } else {
    document.body.removeAttribute("data-theme");
    themeToggle.textContent = "Modo Escuro";
  }

  // Alterna o tema quando o botão é clicado
  themeToggle.addEventListener("click", function () {
    let theme;
    if (document.body.hasAttribute("data-theme")) {
      document.body.removeAttribute("data-theme");
      theme = "light";
      themeToggle.textContent = "Modo Escuro";
    } else {
      document.body.setAttribute("data-theme", "dark");
      theme = "dark";
      themeToggle.textContent = "Modo Claro";
    }

    // Salva a preferência no localStorage
    localStorage.setItem("theme", theme);
  });
});

// No evento de clique:
const icon = themeToggle.querySelector("i");
if (theme === "dark") {
  icon.classList.remove("fa-moon");
  icon.classList.add("fa-sun");
} else {
  icon.classList.remove("fa-sun");
  icon.classList.add("fa-moon");
}

prefersDarkScheme.addEventListener("change", (e) => {
  const newTheme = e.matches ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Modo Claro";
  } else {
    document.body.removeAttribute("data-theme");
    themeToggle.textContent = "Modo Escuro";
  }
}
