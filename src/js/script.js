const elements = document.querySelectorAll(".hidden");
  
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((el) => observer.observe(el));

const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fieldset = contactForm.querySelector("fieldset");
  if (fieldset.disabled) return;

  const status = document.getElementById("contactStatus");
  const data = new FormData(contactForm);
  for (const [field, value] of data) {
    data.set(field, value.trim());
  }

  if (!data.get("name") || !data.get("message")) {
    status.textContent = "Please enter your name and a message.";
    return;
  }

  fieldset.disabled = true;
  status.textContent = "Sending…";
  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      headers: { Accept: "application/json" },
      body: data,
    });
    if (!response.ok) {
      throw new Error(`Formspree returned HTTP ${response.status}`);
    }
    contactForm.reset();
    status.textContent = "Message received. Thank you!";
  } catch (error) {
    console.error("Contact form submission failed", error);
    status.textContent = "Your message couldn't be sent. Try again or use the email link.";
  } finally {
    fieldset.disabled = false;
  }
});
