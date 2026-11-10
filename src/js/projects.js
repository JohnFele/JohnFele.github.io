(() => {
  const base = new URL('./', document.currentScript.src);
  const grid = document.querySelector('.projects-grid');
  const dialog = document.getElementById('github-modal');
  if (!grid || !dialog) return;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
  const code = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/></svg>';
  const safeUrl = value => { const url = new URL(value); if (url.protocol !== 'https:') throw Error('Invalid project URL'); return url.href; };
  let projects = [];
  function showRepositories(project) {
    document.getElementById('repo-project-name').textContent = project.title;
    for (const kind of ['frontend', 'backend']) {
      const link = document.getElementById(kind + '-repo');
      link.hidden = !project.github[kind];
      if (project.github[kind]) link.href = safeUrl(project.github[kind]);
    }
    dialog.showModal();
  }
  fetch(new URL('projects.json', base)).then(response => {
    if (!response.ok) throw Error('Projects unavailable');
    return response.json();
  }).then(data => {
    projects = data;
    const limit = Number(grid.dataset.projectLimit) || data.length;
    grid.innerHTML = data.slice(0, limit).map((project, index) => {
      const multiple = typeof project.github === 'object' && project.github.backend && project.github.frontend;
      const repository = typeof project.github === 'string' ? project.github : project.github.frontend;
      const category = multiple ? 'Full stack application' : 'Frontend application';
      return '<article class="project-card glass"><a class="project-image-link" href="' + escape(safeUrl(project.link)) + '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + escape(project.title) + ' live demo"><div class="project-image-frame"><div class="project-window-bar" aria-hidden="true"><i></i><i></i><i></i><span>' + escape(new URL(project.link).hostname) + '</span></div><img src="' + escape(new URL('../assets/images/projects/' + project.image, base).href) + '" alt="' + escape(project.imageAlt || project.title + ' screenshot') + '" width="1280" height="800" loading="lazy"></div></a><div class="project-card-content"><span class="project-category">' + category + '</span><h3>' + escape(project.title) + '</h3><p class="project-description">' + escape(project.description) + '</p><ul class="project-technologies" aria-label="Technologies">' + project.technologies.map(name => '<li>' + escape(name) + '</li>').join('') + '</ul><div class="project-links">' + (multiple ? '<button class="project-link github-link" type="button" data-project-index="' + index + '" aria-haspopup="dialog">' + code + 'View code</button>' : '<a class="project-link github-link" href="' + escape(safeUrl(repository)) + '" target="_blank" rel="noopener noreferrer">' + code + 'View code</a>') + '<a class="project-link" href="' + escape(safeUrl(project.link)) + '" target="_blank" rel="noopener noreferrer">Live demo ' + arrow + '</a></div></div></article>';
    }).join('');
    const total = document.querySelector('.project-total');
    if (total) total.textContent = data.length + ' projects · frontend to backend';
  }).catch(() => {
    grid.innerHTML = '<div class="projects-empty"><h3>The projects could not load.</h3><p>Refresh this page, or <a href="https://github.com/JohnFele" target="_blank" rel="noopener noreferrer">explore the work on GitHub</a>.</p></div>';
  });
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
