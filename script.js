const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = new Map(
  [...document.querySelectorAll(".nav-links a")].map((link) => [
    link.getAttribute("href")?.slice(1),
    link,
  ]),
);

if (sections.length > 0 && navLinks.size > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => link.classList.remove("is-active"));
      navLinks.get(visible.target.id)?.classList.add("is-active");
    },
    {
      rootMargin: "-10% 0px -70% 0px",
      threshold: [0.1, 0.25, 0.5],
    },
  );

  sections.forEach((section) => observer.observe(section));
}
