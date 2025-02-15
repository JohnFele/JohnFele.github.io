const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function toggleSidebar() {
  if(navbar.classList.contains('show-sidebar')){
    navbar.classList.remove('show-sidebar');
  } else {
    navbar.classList.add('show-sidebar');
  }
}

function changeActiveLink() {
  let scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 250;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active-link"));
      document
        .querySelector(`nav a[href="#${sectionId}"]`)
        ?.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", changeActiveLink);