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
  } else {
    document.body.removeAttribute("data-theme");
  }

  // Alterna o tema quando o botão é clicado
  themeToggle.addEventListener("click", function () {
    let theme;
    const icon = themeToggle.querySelector("i");
    
    if (document.body.hasAttribute("data-theme")) {
      document.body.removeAttribute("data-theme");
      theme = "light";
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      document.body.setAttribute("data-theme", "dark");
      theme = "dark";
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }

    // Salva a preferência no localStorage
    localStorage.setItem("theme", theme);
    
  });
});

// No evento de clique:
prefersDarkScheme.addEventListener("change", (e) => {
  const newTheme = e.matches ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.removeAttribute("data-theme");
  }
}
