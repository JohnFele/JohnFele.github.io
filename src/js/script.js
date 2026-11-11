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

if (contactForm) {
  const fieldset = contactForm.querySelector("fieldset");
  const status = document.getElementById("contactStatus");
  const fields = [...fieldset.querySelectorAll("input, textarea")];
  const errorElements = new Map(fields.map(field => [
    field,
    document.getElementById(field.getAttribute("aria-describedby")),
  ]));

  function fieldError(field, message) {
    const error = errorElements.get(field);
    error.textContent = message;
    error.hidden = !message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  function validate(field, value) {
    if (!value) return `Enter ${field.labels[0].textContent.toLowerCase()}.`;
    if (field.validity.typeMismatch) return "Enter an email address like name@example.com.";
    if (field.maxLength >= 0 && value.length > field.maxLength) {
      return `Use ${field.maxLength} characters or fewer.`;
    }
    return "";
  }

  function setStatus(message, state = "neutral") {
    status.dataset.state = state;
    status.textContent = message;
  }

  const checkFields = "Check the highlighted fields and try again.";
  contactForm.addEventListener("input", ({ target }) => {
    if (!errorElements.has(target) || !target.hasAttribute("aria-invalid")) return;
    fieldError(target, validate(target, target.value.trim()));
    if (status.textContent === checkFields && !fieldset.querySelector("[aria-invalid]")) {
      setStatus("");
    }
  });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (fieldset.disabled) return;

    const data = new FormData(contactForm);
    let firstInvalid;
    for (const field of fields) {
      const value = field.value.trim();
      data.set(field.name, value);
      const message = validate(field, value);
      fieldError(field, message);
      if (message) firstInvalid ??= field;
    }
    if (firstInvalid) {
      setStatus(checkFields, "error");
      firstInvalid.focus();
      return;
    }

    const focusWasInForm = fieldset.contains(document.activeElement);
    fieldset.disabled = true;
    setStatus("Sending…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        headers: { Accept: "application/json" },
        body: data,
        signal: controller.signal,
      });
      if (response.ok) {
        contactForm.reset();
        setStatus("Message received. Thank you!");
        return;
      }

      if (response.status === 400 || response.status === 422) {
        const result = await response.json().catch(() => null);
        const errors = Array.isArray(result?.errors) ? result.errors : [];
        for (const field of fields) {
          const error = errors.find(item => item?.field === field.name);
          if (!error) continue;
          fieldError(field, `Check ${field.labels[0].textContent.toLowerCase()} and try again.`);
          firstInvalid ??= field;
        }
      }

      if (firstInvalid) setStatus(checkFields, "error");
      else if (response.status === 429) setStatus("Please wait a moment before trying again.", "error");
      else setStatus("Your message couldn't be sent. Try again or use the email link.", "error");
    } catch {
      setStatus("We couldn't confirm delivery. Check your connection or use the email link.", "error");
    } finally {
      clearTimeout(timeout);
      fieldset.disabled = false;
      const focusWasLost = document.activeElement === document.body;
      if (firstInvalid && (focusWasLost || contactForm.contains(document.activeElement))) {
        firstInvalid.focus();
      } else if (focusWasLost && focusWasInForm) {
        event.submitter?.focus({ preventScroll: true });
      }
    }
  });

  contactForm.noValidate = true;
}
