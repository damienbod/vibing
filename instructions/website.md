### Key Features

- **Dark Theme Design**: Professional dark theme with accent color #45e783
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
├── index.html              # Landing page
├── about.html              # Club information
├── projects.html          # Facility details
├── impressum.html          # Legal information
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
│   ├── events.json        # Event listings
│   ├── news.json          # News articles metadata
│   ├── members.json       # Member profiles
│   ├── teams.json         # Team information
│   ├── committee-roles.json  # Committee positions
│   └── sponsors.json      # Sponsor details
└── images/
    ├── members/           # Member photos
    └── placeholders/      # Default images
```
