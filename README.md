# <h1 align="center">🧑‍💻CodeSandbox Frontend</></h1>

CodeSandbox is a React-based web application built with **Vite**. It provides a collaborative code editing environment for your 'React' projects with real-time file editing, live preview, and terminal integration. The project follows the **Atomic Design Pattern** for organizing components, ensuring scalability and maintainability.

## <h2 align="center">Features🔥</h3>

- **Real-Time Code Editing**: Collaborative editing using the Monaco Editor.
- **Live Preview**: Integrated browser for live application previews.
- **File System Management**: Create, edit, delete, and manage files and folders.
- **Custom Themes**: Support for custom editor themes like Dracula.
- **Terminal Integration**: Interactive terminal access for containerized environments.
- **Tab Management**: Edit multiple files with a tabbed interface.
- **Atomic Design Pattern**: Organized folder structure for scalable development.

## <h2 align="center">🧬Project Structure</h2>

The project is organized using the **Atomic Design Pattern**, which breaks down components into four levels: **atoms**, **molecules**, **organisms** and **pages**.

[Atomic design Folder Structure](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97)

```
src
  |->apis
  |->components
    |->atoms (Smallest reusable components)
    |->molecules (Combinations of atoms)
    |->organisms (Complex components made of molecules)
  |->config 
  |->hooks/apis
  |->pages (Full pages)
  |->store
  |->utils
   App.jsx
   main.jsx
   Router.jsx (For handling all the routes)
   .env (For environment variables)
   .gitignore
   Dracula.json (Theme for monaco code editor)
```

### Key Directories and Files

- **`src/components/`**: Contains all UI components organized by the Atomic Design Pattern.
- **`src/store/`**: Zustand stores for managing application state (e.g., `editorSocketStore`, `activeFileTabStore`).
- **`src/utils/`**: Helper functions for common tasks like file type detection.
- **`src/assets/`**: Static files like images, fonts, and styles.
- **`Dracula.json`**: Custom theme configuration for the Monaco Editor.

---

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Modern Web Browser**: Chrome, Firefox, or Safari
- **CodeSandbox Backend**: Ensure the backend is running locally.

---
## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd codesandbox-frontend
   npm install
   npm run dev
   ```
---   
### How to create and run a react project ?
Step-1: Create a react project using create button on the landing page.After creating the project it will redirect you to Project-Playground page.

Step-2: In Project-Playground page change directory to sandbox(`cd sandbox`) using custom terminal(xterm).

Step-3: After that run `npm install` to install all the dependencies(node_modules). 

Step-4: Run the project using command `npm run dev -- --host 0.0.0.0` .

Step-5: Click on the `Load Browser` Button of the Browser window for live preview of the project.

### WebSocket Events
- **Editor Namespace** (/editor)
- **Emitted Events**:

- **writeFile**: Save file contents.
- **readFile**: Request file contents.
- **getPort**: Request container port for preview.

### Received Events:

- **readFileSuccess**: File contents received.
- **writeFileSuccess**: File save confirmation.

### Technologies Used
- **React.js**: A JavaScript library for building fast, interactive user interfaces using reusable components.
- **Monaco-Editor**: A powerful code editor providing syntax highlighting, IntelliSense, and theming, used in VS Code.
- **Tanstack-react-query**:  A data-fetching library for managing server-state in React apps with caching and syncing.
- **Xterm**:  A terminal emulator library for running and displaying terminal output in the browser.
- **Allotment**: A resizable split-pane layout component for creating flexible UI layouts.
- **Antd Design (Antd)**: A comprehensive React UI component library with elegant and responsive design.
- **Axios**: A promise-based HTTP client for making API requests in JavaScript.
- **react-icons**:  A library that provides popular icons as React components.
- **react-router-dom**: A routing library for managing navigation in React web applications.
- **socket.io-client**: A real-time communication library for connecting to WebSocket-based servers.
- **Zustand**: A lightweight, scalable state management library for React.


### Check Backend Code:
# [CodeSanbox-Backend](https://github.com/himanshuramteke/CodeSandbox-backend) 