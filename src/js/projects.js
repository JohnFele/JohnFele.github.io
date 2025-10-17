let currentProjectData = null;

const data = fetch("../js/projects.json")
  .then(response => response.json())
  .then(projectData => addProjectData(projectData))
  .catch(error => console.error("Error fetching data:", error));

const addProjectData = (projects) => {
  const projectsContainer = document.querySelector(".projects-grid");
  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    const hasMultipleRepos = project.github && typeof project.github === 'object' && project.github.frontend && project.github.backend;
    const isSingleRepoObject = project.github && typeof project.github === 'object' && project.github.frontend && !project.github.backend;
    const githubLink = hasMultipleRepos ? '#' : 
                      (isSingleRepoObject ? project.github.frontend : 
                      (typeof project.github === 'string' ? project.github : '#'));

    projectCard.innerHTML = `
      <img src="../assets/images/projects/${project.image}" alt="${project.title} screenshot">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <p>Technologies:<br> ${project.technologies.join(", ")}</p>
      <div class="project-links">
        <a href="${githubLink}" 
           class="project-link github-link" 
           data-project-index="${index}"
           ${hasMultipleRepos ? '' : 'target="_blank"'}
           ${hasMultipleRepos ? 'style="cursor: pointer;"' : ''}>
          <i class="fa-brands fa-github"></i> GitHub
          ${!hasMultipleRepos ? '<span class="github-tooltip">View Repository</span>' : ''}
        </a>
        <a href="${project.link}" target="_blank" class="project-link">
          <i class="fa-solid fa-globe"></i> Live Demo
        </a>
      </div>
    `;
    projectsContainer.appendChild(projectCard);
  });

  // Store projects globally for modal access
  window.projectsData = projects;
  
  // Add event listeners after creating the cards
  initializeModalHandlers();
};

const initializeModalHandlers = () => {
  const modal = document.getElementById('github-modal');
  const closeBtn = document.querySelector('.modal-close');
  const githubLinks = document.querySelectorAll('.github-link');
  const frontendRepo = document.getElementById('frontend-repo');
  const backendRepo = document.getElementById('backend-repo');

  // Open modal on GitHub link click (for projects with multiple repos)
  githubLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const projectIndex = parseInt(link.getAttribute('data-project-index'));
      const projectData = window.projectsData[projectIndex];
      
      // Check if this project has multiple repositories
      const hasMultipleRepos = projectData.github && 
                              typeof projectData.github === 'object' && 
                              projectData.github.frontend && 
                              projectData.github.backend;
      
      // If it's a single repo project, just follow the link (don't prevent default)
      if (!hasMultipleRepos) {
        return; // Let the default link behavior happen
      }
      
      // For multiple repos, show modal and prevent default link behavior
      e.preventDefault();
      currentProjectData = projectData;
      showRepoModal(projectData);
    });
  });

  // Close modal handlers
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Repository option handlers
  frontendRepo.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentProjectData && currentProjectData.github.frontend) {
      window.open(currentProjectData.github.frontend, '_blank');
      closeModal();
    }
  });

  backendRepo.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentProjectData && currentProjectData.github.backend) {
      window.open(currentProjectData.github.backend, '_blank');
      closeModal();
    }
  });
};

const showRepoModal = (projectData) => {
  const modal = document.getElementById('github-modal');
  const frontendRepo = document.getElementById('frontend-repo');
  const backendRepo = document.getElementById('backend-repo');

  // Enable/disable buttons based on available repos
  if (projectData.github.frontend) {
    frontendRepo.style.display = 'flex';
    frontendRepo.href = projectData.github.frontend;
  } else {
    frontendRepo.style.display = 'none';
  }

  if (projectData.github.backend) {
    backendRepo.style.display = 'flex';
    backendRepo.href = projectData.github.backend;
  } else {
    backendRepo.style.display = 'none';
  }

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  const modal = document.getElementById('github-modal');
  modal.classList.remove('show');
  document.body.style.overflow = '';
  currentProjectData = null;
};