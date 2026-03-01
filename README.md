# SERA — The Emotional Operating System

A luxury, modern landing page built with clean project structure for easy maintenance and quick edits.

## Project Structure

```
SERA-project/
├── index.html              # Main HTML file with all structure
├── css/
│   └── styles.css          # Complete styling with CSS variables
├── js/
│   └── script.js           # All JavaScript functionality
├── assets/
│   └── images/
│       └── sera_character.png    # SERA character image
└── README.md               # This file
```

## Quick Start

### Run the Server
```bash
cd /Users/parasverma/Desktop/SERA-project
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open: `http://localhost:8000`

## File Overview

### index.html
- Clean semantic HTML structure
- Sections: Hero, Revelation, Modules, Weather, Philosophy, Phases, Built For, Before You Do, Logo Feature, Final CTA, Footer
- Waitlist modal form
- Links to external CSS and JavaScript

### css/styles.css
- **Color System** (CSS Variables):
  - Dark theme: `--black`, `--deep`, `--surface`
  - Accent colors: `--gold`, `--rose`
  - Text colors: `--text`, `--muted`, `--faint`
- **Sections**: Each major section has organized CSS comments
- **Animations**: Breathe, fadeUp, scrollPulse, spin, seraFloat
- **Responsive**: Mobile breakpoint at 900px

### js/script.js
- **Modal Functions**: Open/close waitlist form
- **Custom Cursor**: Gold cursor with ring animation
- **Scroll Reveal**: Intersection Observer for fade-in effects
- **Smooth Scroll**: Navigation anchor links
- **Parallax**: SERA character follows mouse movement
- **Form Handling**: Waitlist submission with success state

## Key Features

✨ **Custom cursor** - Gold dot with animated ring
🎨 **Scroll animations** - Elements fade in as they enter viewport
🌊 **Parallax effects** - Character moves with mouse
💬 **Waitlist modal** - Functional form with success message
📱 **Responsive design** - Mobile-friendly layout
🎭 **Luxury aesthetic** - Refined typography and color palette

## Making Edits

### Edit Styling
- Open `css/styles.css`
- Colors are defined as CSS variables at top (`:root`)
- Each section is clearly labeled with comments

### Edit Content
- Open `index.html`
- Update text, heading, or links directly
- Structure is semantic and organized by sections

### Edit JavaScript
- Open `js/script.js`
- Functions are clearly labeled with comments
- Each feature (modal, cursor, animations) is separate

### Add Images
- Place images in `assets/images/`
- Update paths in HTML: `src="assets/images/filename.png"`
- SERA character image path: `assets/images/sera_character.png`

## Customization Tips

**Change Colors**:
In `css/styles.css`, find `:root` section and modify:
```css
--gold: #c9a96e;
--rose: #c4a2a2;
```

**Modify Animations**:
In `css/styles.css`, find `@keyframes` section to adjust timing and effects.

**Update Form Fields**:
In `index.html`, modify inputs in the modal section and handle in `js/script.js`.

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard HTML5, CSS3, and ES6 JavaScript
- No external frameworks required

## Performance
- Single CSS and JS file keeps requests minimal
- Images should be optimized for web
- Smooth animations use requestAnimationFrame

---

**Built for**: Emotional wellness, luxury branding, modern web design.
