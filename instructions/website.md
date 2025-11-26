### Key Features

- **Light Theme Design**: Professional light theme with accent color #45e783
- **Responsive Layout**: Mobile-first design supporting all devices (320px+)
- **Team Pages**: Dedicated pages for E-Darts and Steel Darts teams
- **Events & News**: Dynamic loading of upcoming events and latest news
- **Member Directory**: Active, passive, and committee member listings
- **Sponsor Showcase**: Tiered sponsor display (Main, Shirt, Tournament, Board)
- **Accessibility**: WCAG 2.1 Level A compliant with keyboard navigation support
- **Security**: Content Security Policy (CSP) headers, no inline scripts, use metadata header

### Technical Stack

- **HTML5, CSS3, Vanilla JavaScript, bootstrp 5** (no frameworks or build tools)
- **ECMAScript Modules** for clean, modular code
- **GitHub Pages** hosting with static file serving
- **JSON data storage** for events, members, teams, and sponsors
- **Markdown support** for rich news articles

### Project Structure

```
public/
├── index.html             # Landing page
├── about.html             # Club information
├── projects.html          # Projects details
├── news.html              # News details
├── impressum.html         # Legal information
├── css/
│   ├── base.css           # Base styles, variables, typography
│   ├── theme.css          # Cards, grids, buttons
│   └── components/
│       └── carousel.css   # Carousel component
├── js/
│   ├── data-loader.js     # Dynamic content loading
│   ├── carousel.js        # Keyboard navigation
│   └── year.js            # Dynamic year in footer
├── data/
│   ├── projects.json      # Project listings
│   ├── news.json          # News articles metadata
└── images/
    ├── projects/           # Member photos
    └── placeholders/      # Default images
```

#### Security Review Checklist

- [x] Content Security Policy (CSP) meta tag present in all HTML pages
- [x] No inline scripts or styles (all external)
- [x] All scripts loaded as ES modules with `type="module"`
- [x] External links use `rel="noopener noreferrer"` (when applicable)
- [x] No hardcoded secrets or API keys
- [x] HTTPS enforced by GitHub Pages
- [x] Input sanitization via `escapeHtml()` function in data-loader.js
- [x] Safe JSON parsing with error handling

#### Keyboard Navigation Testing

- [x] All interactive elements accessible via Tab key
- [x] Focus indicators visible on all focusable elements
- [x] Carousel supports Arrow keys, Home, and End keys
- [x] Skip links or logical tab order present
- [x] No keyboard traps

### index.html specification

Use a standard carousel and create 3 images based on the about page

### about.html specification

- Add info about damienbod.com
- Use the contents from https://damienbod.com/about/
- Use the contents from https://mvp.microsoft.com/en-us/PublicProfile/5002218?fullName=Damien%20%20Bowden
- Use the contents from https://www.linkedin.com/in/damien-bowden/$
- Use the contents from https://bsky.app/profile/damienbod.com
- Use the contents from https://mastodon.social/@damienbod

### projects.html specification

Show the 6 highlighted projects from:
- https://github.com/damienbod
- https://github.com/swiss-ssi-group

### impressum.html

Create a standard page