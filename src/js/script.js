const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}

document.getElementById("currentYear")?.replaceChildren(String(new Date().getFullYear()));

const form = document.getElementById("contactForm");
const alertBox = document.getElementById("alertMessage");

if (form && alertBox) {
  const fields = [
    { field: document.getElementById("name"), errorMessage: "Name is required." },
    { field: document.getElementById("email"), errorMessage: "Email is required." },
    { field: document.getElementById("message"), errorMessage: "Message is required." }
  ];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    fields.forEach(({ field }) => field?.classList.remove("input-error"));
    alertBox.style.display = "none";

    const values = Object.fromEntries(fields.map(({ field }) => [field.id, field.value.trim()]));
    const missing = fields.filter(({ field }) => !values[field.id]);
    if (missing.length) {
      missing.forEach(({ field }) => field.classList.add("input-error"));
      showAlert(missing.length > 1 ? "Please complete all required fields." : missing[0].errorMessage, "error");
      missing[0].field.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      fields[1].field.classList.add("input-error");
      showAlert("Enter a valid email address.", "error");
      fields[1].field.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    try {
      await emailjs.send("service_lod25uq", "template_mj0gzng", {
        from_name: values.name,
        from_email: values.email,
        message: values.message
      });
      showAlert("Message sent successfully.", "success");
      form.reset();
    } catch (error) {
      showAlert("The message could not be sent. Please email me directly.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send message <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    }
  });
}

function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = "block";
  window.setTimeout(() => { alertBox.style.display = "none"; }, 4500);
}
