# Personal Portfolio Website

## Overview
This is my personal portfolio website showcasing my projects, skills, and experience as a full stack web developer. The site is built with HTML, CSS, and JavaScript and includes a dedicated projects page highlighting my work.

## Design reference

The version before the glass redesign is preserved at commit `c51d51a`, tagged `portfolio-reference-before-redesign`. This checkpoint includes Subtrack, the Supabase correction and the removal of JWT. Use it as the stable comparison point for future design iterations.

The current design keeps the charcoal `#414141`, cyan `#0cc0df` and pink `#ff66c4` palette. It uses frosted panels, layered portrait frames, perspective on project previews and a CSS cube for depth. The active stylesheet is `src/styles/glass.css`; the earlier stylesheets are retained as reference files. The site remains static HTML, CSS and browser JavaScript, without a build step.

Home includes two selected projects; the Projects page includes the full collection. Both pages share the catalog in `src/js/projects.js`. The repository chooser uses a native dialog with keyboard focus management and Escape support. Navigation adapts to mobile, and animation respects reduced-motion preferences.

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
- Formspree for contact submissions and email notifications

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
   │  └─ projects.js
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
2. Open `index.html` directly in a browser, or serve the repository root with a static server such as VS Code Live Server. No build step is required.

## Contact form

Set the contact form's `action` in `index.html` to the public endpoint from the Formspree dashboard's Integration tab. Configure the notification email in Formspree. After deployment, submit a test from the live page and check the Formspree Submissions tab and the recipient inbox.

Mirror the browser rules in the form's Formspree Workflow validations. Require `name` (text, up to 120 characters), `email` (email, up to 254 characters), and `message` (text, up to 5,000 characters). These rules are managed in Formspree.

## Live Demo
[View Portfolio](https://johnfele.github.io)

## Contributing
Feel free to fork this repository and submit pull requests for improvements.

## License
This project is open-source and available under the [MIT License](LICENSE).

