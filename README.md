[README.md](https://github.com/user-attachments/files/28978888/README.md)
# TaskFlow – To-Do App

A clean, minimal task manager built with **vanilla JavaScript**, HTML, and CSS. No frameworks, no dependencies — just pure front-end development.

![TaskFlow Preview](https://img.shields.io/badge/status-live-brightgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow) ![HTML5](https://img.shields.io/badge/HTML-5-orange) ![CSS3](https://img.shields.io/badge/CSS-3-blue)

## Features

- ✅ Add, complete, and delete tasks
- 🔴🟡🟢 Priority levels (High, Medium, Low)
- 🔍 Filter tasks by All / Active / Completed
- 💾 Persistent storage via `localStorage` — tasks survive page refresh
- 📱 Fully responsive (mobile-friendly)
- ♿ Accessible — keyboard navigation and ARIA labels

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling & animations |
| JavaScript (ES6+) | Logic & DOM manipulation |
| localStorage API | Data persistence |

## Getting Started

No installation needed. Just open the project in your browser:

```bash
# Clone the repository
git clone https://github.com/your-username/taskflow.git

# Navigate into the folder
cd taskflow

# Open in browser
open index.html
```

Or simply double-click `index.html`.

## Project Structure

```
taskflow/
├── index.html   # App structure and markup
├── style.css    # Styles, dark theme, animations
├── app.js       # All logic: tasks, filters, localStorage
└── README.md    # This file
```

## What I Learned

- DOM manipulation without frameworks
- State management with plain JavaScript arrays
- Data persistence using the Web Storage API
- Writing modular, commented functions
- XSS prevention via HTML escaping
- Responsive design with CSS Flexbox

## License

MIT — free to use and modify.
