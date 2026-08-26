const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navLinks");

toggle.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("#navLinks a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`#navLinks a[href="#${entry.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));
