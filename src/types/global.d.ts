// Allow importing plain CSS files for side-effects (e.g. `import './globals.css'`)
declare module '*.css';

// Optionally declare other static asset types used in the project
declare module '*.svg' {
  const content: string;
  export default content;
}

export {};
