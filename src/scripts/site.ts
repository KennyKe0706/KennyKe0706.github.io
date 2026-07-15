const header = document.querySelector<HTMLElement>("[data-header]");
const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

export {};

const updateHeader = (): void => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5%" },
  );

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    revealObserver.observe(item);
  });
}
