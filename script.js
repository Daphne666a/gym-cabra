document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu-principal");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const revealSelectors = [
    ".title",
    ".descripcion",
    ".comodidades-comodidad",
    "#RutinasPersonalizadas",
    ".ListaDePersonalizacion li",
    ".aviso",
    ".ubicacion",
    ".footer-top > *",
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(","));
  if (!revealElements.length) return;

  revealElements.forEach((el) => el.classList.add("reveal"));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.15,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
});
