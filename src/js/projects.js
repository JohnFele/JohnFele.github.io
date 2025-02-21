const data = fetch("../js/projects.json")
  .then(response => response.json())
  .then(projectData => addProjectData(projectData))
  .catch(error => console.error("Error fetching data:", error));

const addProjectData = (projects) => {
  const projectsContainer = document.querySelector(".projects-grid");
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    projectCard.innerHTML = `
            <img src="../assets/images/projects/${project.image}" alt="Project 1">
            <h3>${project.title}</h3>
            <p>
              ${project.description}
            </p>
            <p>
              Technologies:<br> ${project.technologies.join(", ")}
            </p>
            <div class="project-links">
              <a href="${project.github}" target="_blank" class="project-link">
                <i class="fa-brands fa-github"></i> GitHub
              </a>
              <a href="${project.link}" target="_blank" class="project-link">
                <i class="fa-solid fa-globe"></i> Live Demo
              </a>
            </div>
            `;
    projectsContainer.appendChild(projectCard);
  });
};
