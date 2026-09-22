const navLinksPanel = document.getElementById("nav-links");
const overlay = document.getElementById("overlay");
const openSidebarButton = document.getElementById("open-sidebar");

function toggleSidebar(forceClose = false) {
  if (!navLinksPanel) return;
  const shouldOpen = forceClose ? false : !navLinksPanel.classList.contains("show");
  navLinksPanel.classList.toggle("show", shouldOpen);
  overlay?.classList.toggle("show", shouldOpen);
  openSidebarButton?.setAttribute("aria-expanded", String(shouldOpen));
  document.body.style.overflow = shouldOpen ? "hidden" : "";
}

document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => toggleSidebar(true));
});

const observedSections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll('#nav-links a[href^="#"]');

function changeActiveLink() {
  const position = window.scrollY + 180;
  observedSections.forEach((section) => {
    const inside = position >= section.offsetTop && position < section.offsetTop + section.offsetHeight;
    if (inside) {
      sectionLinks.forEach((link) => link.classList.toggle("active-link", link.getAttribute("href") === `#${section.id}`));
    }
  });
}

window.addEventListener("scroll", changeActiveLink, { passive: true });
