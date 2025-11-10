# TaskApp

TaskApp is a lightweight task management dashboard built with React and Tailwind CSS. It provides a simple UI to add, toggle, and delete tasks, view task statistics, and explore public API data. The project includes dark/light theme support (class-based Tailwind dark mode) and persists tasks to localStorage.

![TaskApp Dashboard](./docs/screenshot.png)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Theme & Tailwind Notes](#theme--tailwind-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add, toggle (complete/incomplete), and delete tasks
- Filters: All / Active / Completed
- Task persistence via localStorage (custom hook)
- Dark / light theme toggle (applies `dark` class to `<html>`)
- Responsive navigation and layout (Tailwind + flex)
- Small dashboard cards for quick overview
- API page to fetch and display public API data (sample)

## Tech Stack

- React (Vite or Create React App)
- Tailwind CSS
- Framer Motion (animations)
- lucide-react (icons)
- ESLint (linting)
- LocalStorage hook for persistence

## Prerequisites

- Node.js 16+ (or current LTS)
- npm (or pnpm/yarn)

## Getting started (local)

1. Clone the repo and change into project folder
   - Example:
     - git clone <repo-url>
     - cd task-app

2. Install dependencies
   - npm install

3.
     - `task-app/docs/screenshot.png`
   - This README references that path to display the screenshot.

4. Start the dev server
   - npm run dev
   - Open http://localhost:5174 (or the port Vite prints)

5. Build for production
   - npm run build
   - npm run preview (optional, preview the build)

## Useful scripts

- npm run dev — Start development server
- npm run build — Build production assets
- npm run preview — Preview production build
- npm run lint — Run ESLint
- npm run format — (if configured) Format code

(Adjust commands to match your package.json if names differ.)

## Project structure (relevant)

- src/
  - components/
    - Navbar.jsx
    - TaskManager.jsx
    - Card.jsx
    - Footer.jsx
  - context/
    - ThemeProvider.jsx
    - useTheme.js
  - hooks/
    - useLocalStorage.js
  - pages/
    - Tasks.jsx
    - Dashboard.jsx
    - Api.jsx
  - index.css (Tailwind directives)
  - main.jsx / index.jsx
- tailwind.config.js
- postcss.config.js
- package.json
- docs/
  - screenshot.png (project screenshot)

## Theme & Tailwind Notes

- Tailwind dark mode is configured with `darkMode: 'class'`. The ThemeProvider toggles the `dark` class on `<html>` to switch themes.
- Ensure your `index.css` contains the Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- postcss.config.js should export plugins using CommonJS for most toolchains:
  ```js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  ```
- tailwind.config.js example:
  ```js
  module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: { extend: {} },
    plugins: [],
  };
  ```

## Troubleshooting

- Unknown at-rule `@tailwind` in your editor:
  - Install Tailwind CSS IntelliSense extension or set file language to PostCSS.
  - Ensure PostCSS is configured and your build runs PostCSS with Tailwind.

- ESLint errors in config files like `postcss.config.js` or `tailwind.config.js` (`'module' is not defined`):
  - ESLint may lint config files as browser code. Add an override in `.eslintrc` to mark these files as Node:
    ```json
    {
      "overrides": [
        {
          "files": ["postcss.config.js", "tailwind.config.js", "vite.config.js"],
          "env": { "node": true }
        }
      ]
    }
    ```

- Theme toggle updates `<html>` but styles don't change:
  - Verify Tailwind classes use `dark:` variants (e.g., `bg-white dark:bg-gray-900`).
  - Confirm `tailwind.config.js` has `darkMode: 'class'`.
  - Clear cache and ensure CSS bundle includes Tailwind build (restart dev server after config changes).

- Add button not creating tasks:
  - Confirm `useLocalStorage` returns `[value, setter]` and that TaskManager uses the setter with a functional update: `setTasks(prev => [...prev, newTask])`.
  - Ensure Add button is `type="button"` (avoids form submit cancelling event).
  - Open DevTools Console and verify `addTask` logs when clicked.

## Contributing

- Open an issue for bugs or feature requests.
- Fork the repo, create a branch, and open a PR with a clear description of changes.

## License

- MIT (adjust as needed)

## Contact

- For questions or issues, open an issue in the repository.

---
