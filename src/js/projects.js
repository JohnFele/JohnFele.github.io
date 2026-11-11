(() => {
  const base = new URL('./', document.currentScript.src);
  const grid = document.querySelector('.projects-grid');
  const dialog = document.getElementById('github-modal');
  if (!grid || !dialog) return;

  // A classic script can load from disk, where fetch() cannot read a neighboring JSON file.
  const projects = [
    {
      image: 'Aerogen-tut.png',
      imageAlt: 'Aerogen Tutorial Website',
      title: 'Aerogen Tutorial Website',
      description: 'A website that connects tutors, parents, and students for tutoring services.',
      github: {
        frontend: 'https://github.com/JohnFele/AeroGen-Tutoring',
      },
      link: 'https://aerogen-tut.netlify.app/',
      technologies: ['React', 'Tailwind CSS'],
    },
    {
      image: 'Subtrack.jpg',
      imageAlt: 'Subtrack subscription tracker sign-in page',
      title: 'Subtrack — Subscription Tracker',
      description: 'A full-stack subscription manager with a responsive dashboard for recurring costs, upcoming renewals and spending insights. Users can manage subscriptions, search and filter records, and access their subscription data backed by Supabase.',
      github: {
        frontend: 'https://github.com/JohnFele/subscription-tracker-frontend',
        backend: 'https://github.com/JohnFele/subscription-tracker',
      },
      link: 'https://johns-subscription-tracker.netlify.app/',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Express.js', 'Supabase'],
    },
    {
      image: 'Weather-app.png',
      imageAlt: 'Weather app',
      title: 'Weather app',
      description: 'A simple web application that displays the current weather for a given location.',
      github: {
        frontend: 'https://github.com/JohnFele/Weather-app',
      },
      link: 'https://johnfele-weather-app.netlify.app/',
      technologies: ['React', 'Tailwind CSS', 'OpenWeather API', 'Sunrise-Sunset API'],
    },
    {
      image: 'Chatbot-app.png',
      imageAlt: 'Chatbot app',
      title: 'Chatbot app',
      description: 'A Gemini AI powered chatbot application',
      github: {
        frontend: 'https://github.com/JohnFele/Chat-bot',
        backend: 'https://github.com/JohnFele/Chat-bot-backend',
      },
      link: 'https://johnfele-chatbot.netlify.app/',
      technologies: ['React', 'Tailwind CSS', "Google's Gemini AI"],
    },
  ];

  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  const code = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/></svg>';
  const safeUrl = value => { const url = new URL(value); if (url.protocol !== 'https:') throw Error('Invalid project URL'); return url.href; };
  function showRepositories(project) {
    document.getElementById('repo-project-name').textContent = project.title;
    for (const kind of ['frontend', 'backend']) {
      const link = document.getElementById(kind + '-repo');
      link.hidden = !project.github[kind];
      if (project.github[kind]) link.href = safeUrl(project.github[kind]);
    }
    dialog.showModal();
  }
  try {
    const limit = Number(grid.dataset.projectLimit) || projects.length;
    grid.innerHTML = projects.slice(0, limit).map((project, index) => {
      const multiple = typeof project.github === 'object' && project.github.backend && project.github.frontend;
      const repository = typeof project.github === 'string' ? project.github : project.github.frontend;
      const category = multiple ? 'Full stack application' : 'Frontend application';
      const title = escape(project.title);
      const demo = escape(safeUrl(project.link));
      const image = escape(new URL('../assets/images/projects/' + project.image, base).href);
      const alt = escape(project.imageAlt || project.title + ' screenshot');
      const codeLabel = `aria-label="View code for ${title}"`;
      const source = multiple
        ? `<button class="project-link github-link" type="button" data-project-index="${index}" aria-haspopup="dialog" ${codeLabel}>${code}View code</button>`
        : `<a class="project-link github-link" href="${escape(safeUrl(repository))}" target="_blank" rel="noopener noreferrer" ${codeLabel}>${code}View code</a>`;
      return `
        <article class="project-card glass">
          <a class="project-image-link" href="${demo}" target="_blank" rel="noopener noreferrer" aria-label="Open ${title} live demo">
            <div class="project-image-frame">
              <div class="project-window-bar" aria-hidden="true"><i></i><i></i><i></i><span>${escape(new URL(project.link).hostname)}</span></div>
              <img src="${image}" alt="${alt}" width="1280" height="800" loading="lazy">
            </div>
          </a>
          <div class="project-card-content">
            <span class="project-category">${category}</span>
            <h3>${title}</h3>
            <p class="project-description">${escape(project.description)}</p>
            <ul class="project-technologies" aria-label="Technologies">${project.technologies.map(name => `<li>${escape(name)}</li>`).join('')}</ul>
            <div class="project-links">
              ${source}
              <a class="project-link" href="${demo}" target="_blank" rel="noopener noreferrer" aria-label="Live demo for ${title}">Live demo ${arrow}</a>
            </div>
          </div>
        </article>`;
    }).join('');
    const total = document.querySelector('.project-total');
    if (total) total.textContent = projects.length + ' projects · frontend to backend';
  } catch {
    grid.innerHTML = '<div class="projects-empty"><h3>The projects could not load.</h3><p>Refresh this page, or <a href="https://github.com/JohnFele" target="_blank" rel="noopener noreferrer">explore the work on GitHub</a>.</p></div>';
  }
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-project-index]');
    if (button) showRepositories(projects[Number(button.dataset.projectIndex)]);
  });
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
})();
