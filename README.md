# Personal Portfolio Website

## Overview
This is my personal portfolio website showcasing my projects, skills, and experience as a full stack web developer. The site is built with HTML, CSS, and JavaScript and includes a dedicated projects page highlighting my work.

## Design reference

The version before the glass redesign is preserved at commit `c51d51a`, tagged `portfolio-reference-before-redesign`. This checkpoint includes Subtrack, the Supabase correction and the removal of JWT. Use it as the stable comparison point for future design iterations.

The current design keeps the charcoal `#414141`, cyan `#0cc0df` and pink `#ff66c4` palette. It uses frosted panels, layered portrait frames, perspective on project previews and a CSS cube for depth. The active stylesheet is `src/styles/glass.css`; the earlier stylesheets are retained as reference files. The site remains static HTML, CSS and browser JavaScript, without a build step.

Home includes two selected projects; the Projects page includes the full collection. Project details and both frontend/backend repository links are maintained in `src/js/projects.json`. The repository chooser uses a native dialog with keyboard focus management and Escape support. Navigation adapts to mobile, and animation respects reduced-motion preferences.

## Features
- Responsive design for mobile and desktop
- Projects page with descriptions, images, and links to GitHub and live demos
- Smooth navigation with a modern UI
- Contact page for inquiries

## Technologies Used
- HTML
- CSS
- JavaScript
- Inline SVG icons
- EmailJS for the existing contact form

## Project Structure
```
JohnFele.github.io
├─ index.html
├─ README.md
└─ src
   ├─ assets
   │  └─ images
   │     ├─ Me/John.png
   │     └─ projects/ (preserved project previews)
   ├─ js
   │  ├─ script.js
   │  ├─ navScroll.js
   │  ├─ projects.js
   │  ├─ projects.json
   │  └─ contact-init.js
   ├─ pages
   │  └─ projects.html
   └─ styles
      ├─ glass.css (active design)
      ├─ media-queries.css
      ├─ project-styles.css
      └─ style.css

```

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/JohnFele/JohnFele.github.io.git
   ```
2. Serve the repository root with a static server, such as VS Code Live Server, and open `index.html`. A server is needed for the project JSON to load; no Node.js runtime or build step is required.

## Live Demo
[View Portfolio](https://johnfele.github.io)

## Contributing
Feel free to fork this repository and submit pull requests for improvements.

## License
This project is open-source and available under the [MIT License](LICENSE).

