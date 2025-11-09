# Starnavi Test Project

This project is a React application that visualizes Star Wars characters, their films, and starships using interactive graphs. It uses React Query for data fetching, ReactFlow for graph visualization, and Vitest with React Testing Library for unit testing.

## Features

- Infinite scrolling list of people from the Star Wars API
- Detailed graph view of a person's films and starships
- Interactive UI with loading and error states
- Fully typed with TypeScript
- Unit tests for hooks and components

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/starnavi-test.git
   cd starnavi-test
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Running the Project

Start the development server:

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Running Tests

Unit tests are written using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To run all tests:

```bash
pnpm test
```

For watch mode (recommended during development):

```bash
pnpm test:watch
```

## Project Structure

```
src/
  components/         # React components
  hooks/              # Custom React hooks
  queries/            # API query functions
  utils/              # Utility functions (graph logic, etc.)
  mock/               # Mock data for tests
  consts/             # API endpoints and constants
  types/              # TypeScript types
```

## License

MIT

---
