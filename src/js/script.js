const elements = document.querySelectorAll(".hidden");
  
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((el) => observer.observe(el));

const form = document.getElementById("contactForm");
const alertBox = document.getElementById("alertMessage");

const fields = [
  { field: document.getElementById("name"), errorMessage: "Name is required!" },
  { field: document.getElementById("email"), errorMessage: "Email is required!" },
  { field: document.getElementById("message"), errorMessage: "Message is required!" }
];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  resetForm();

  const formValues = getFormValues();
  
  if (validateForm(formValues)) {
    sendMessage(formValues);
  }
});

function getFormValues() {
  return fields.reduce((values, fieldObj) => {
    values[fieldObj.field.id] = fieldObj.field.value.trim();
    return values;
  }, {});
}

function resetForm() {
  fields.forEach(({ field }) => field.classList.remove('input-error'));
  alertBox.style.display = "none";
}

function validateForm(values) {
  const missingFields = fields.filter(({ field, errorMessage }) => values[field.id] === "");

  if (missingFields.length > 0) {
    let alertMessage = missingFields.length > 1 ? "Fill all the missing fields!" : missingFields[0].errorMessage;
    showAlert(alertMessage, "error");

    const missingFieldElements = missingFields.map(item => item.field);
    highlightError(...missingFieldElements);

    return false;
  }

  if (!validateEmail(values.email)) {
    showAlert("Enter a valid email address!", "error");
    highlightError(document.getElementById("email"));
    return false;
  }

  return true;
}

async function sendMessage(values) {
  try {
    const response = await emailjs.send("service_gi653bl", "template_mj0gzng", {
      from_name: values.name,
      from_email: values.email,
      message: values.message
    });
    
    showAlert("Message sent successfully!", "success");
    form.reset();
  } catch (error) {
    showAlert("Failed to send message. Try again!", "error");
  }
}


function showAlert(message, type) {
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  alertBox.style.display = "block";
  setTimeout(() => alertBox.style.display = "none", 3000);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function highlightError(...fields) {
  fields.forEach(field => field.classList.add('input-error'));
}

function projectHandler() {
  const projectButton = document.getElementsByClassName('cta-button');
  showAlert('Try again later to see projects', 'error');
}
