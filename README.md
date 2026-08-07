# Dhanin T — Personal Portfolio

A dark-themed, animated personal portfolio built with plain HTML5, CSS3, and JavaScript (no build step required).

## Structure
```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/        → your photo, favicons, etc.
    ├── icons/          → any custom icons
    ├── projects/       → project screenshots
    ├── certificates/   → certificate images/PDFs
    └── resume.pdf       ← add your resume here (see below)
```

## Run it
Just open `index.html` in a browser, or serve it locally:
```bash
cd portfolio
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Things to customize before publishing

1. **Resume** — drop your PDF at `assets/resume.pdf`. The "Download Resume" buttons already link there.
2. **Achievements & Certifications** — the site currently shows placeholder cards in the *Internship & Experience* section (marked clearly as placeholders) since none were provided. Replace them with your real hackathon wins, certificates, course names and dates.
3. **Project screenshots** — each project card currently shows an icon instead of a screenshot. Drop images into `assets/projects/` and swap the `<i class="project-icon">` markup in `index.html` for an `<img>` tag if you'd like real screenshots.
4. **Live Demo links** — the "Live Demo" buttons on project cards are placeholders (`href="#"`). Point them at your deployed project URLs, or remove the button for projects that aren't hosted anywhere.
5. **Contact form** — there's no backend, so submissions currently open the visitor's email client via a `mailto:` link pre-filled with their message. To collect messages directly, wire the form up to a service like Formspree, Web3Forms, or your own backend endpoint (swap the `fetch`/`mailto` logic in `script.js`).
6. **Favicon** — add one at `assets/images/favicon.png` and reference it in the `<head>` of `index.html`.

## What's included
- Loading screen, sticky navbar with active-section highlighting, mobile menu
- Hero with typewriter role text, floating tech icons, particle background, cursor glow, and a signature animated terminal panel
- About, animated skill bars + circular progress skills, education timeline
- Project cards with tilt-on-hover, tech badges, GitHub/Live Demo buttons
- Internship experience card, achievements/certifications placeholders
- Services grid, animated stats counters
- Contact form with client-side validation
- Back-to-top button, footer with social links
- Fully responsive (desktop / tablet / mobile), respects `prefers-reduced-motion`

## Libraries used (via CDN)
- [Font Awesome](https://fontawesome.com/) — icons
- [AOS](https://michalsnik.github.io/aos/) — scroll reveal animations
- Google Fonts: Poppins (display/body), JetBrains Mono (terminal/code accents)

# portfolionew

# portfolionew
