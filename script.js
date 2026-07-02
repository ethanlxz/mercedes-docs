const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const revealItems = document.querySelectorAll(".reveal");

document.documentElement.classList.add("js-ready");

if (window.mermaid) {
  window.mermaid.initialize({
    startOnLoad: true,
    securityLevel: "loose",
    theme: "base",
    themeVariables: {
      background: "#ffffff",
      primaryColor: "#ffffff",
      primaryTextColor: "#111827",
      primaryBorderColor: "#1769e8",
      lineColor: "#1769e8",
      secondaryColor: "#eef6ff",
      tertiaryColor: "#f6f9fc",
      fontFamily: "IBM Plex Sans, system-ui, sans-serif",
    },
    flowchart: {
      curve: "basis",
      htmlLabels: true,
    },
  });
}

function closeMenu() {
  mobileMenu?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    closeMenu();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}
