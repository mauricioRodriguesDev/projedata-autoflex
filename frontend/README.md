# Autoflex - Frontend

This is the frontend for the Autoflex project, a responsive web application built with React and TypeScript. It provides a user interface to interact with the Autoflex Backend API, allowing users to manage products, raw materials, and view production suggestions.

---

## 🚀 Tech Stack

- **React 18**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, providing type safety.
- **React Router**: For declarative routing and navigation within the single-page application.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **Styled Components**: For component-level styling and creating a responsive UI, fulfilling the RNF003 requirement.
- **React Hook Form**: For efficient and scalable form state management and validation.
- **Create React App**: The toolchain used to bootstrap the project, providing a ready-to-use build setup.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)
- The [Autoflex Backend](../backend) must be running for the frontend to fetch data.

---

## ⚙️ Getting Started

1.  **Clone the repository (if you haven't already):**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Navigate to the Frontend Directory:**
    ```sh
    cd frontend
    ```

3.  **Install Dependencies:**
    This command will download all the necessary libraries defined in `package.json`.
    ```sh
    npm install
    ```

4.  **Run the Application:**
    This command starts the development server.
    ```sh
    npm start
    ```
    The application will automatically open in your default browser at `http://localhost:3000`.

---

## 📂 Folder Structure

The `src` folder is organized to maintain a clean and scalable architecture:

-   **`components`**: Contains reusable React components, such as forms (`ProductForm`, `RawMaterialForm`).
-   **`hooks`**: Holds custom React hooks. The `useApi` hook encapsulates the logic for fetching data, managing loading states, and handling errors.
-   **`pages`**: Contains the main page components that are mapped to routes (e.g., `ProductsPage`, `RawMaterialsPage`).
-   **`services`**: Manages all communication with the backend API.
    -   `api.ts`: Exports a pre-configured Axios instance with the base URL.
    -   `productService.ts`, `rawMaterialService.ts`: Contain functions for each specific API endpoint.
-   **`styles`**: Contains global styling and styled-component definitions.
    -   `GlobalStyle.ts`: A global stylesheet for base styles and resets.
    -   `components.ts`: Reusable styled components for UI elements like tables, buttons, and containers.
-   **`types`**: Contains TypeScript type and interface definitions, primarily `entities.ts`, which mirrors the backend DTOs.
-   **`App.tsx`**: The main application component, responsible for routing and layout.
-   **`index.tsx`**: The entry point of the application.

---

## ✨ Features

-   **Full CRUD Operations** for both Products and Raw Materials.
-   **Dynamic Form** for creating and editing products with their complex composition.
-   **Production Suggestion** page to display what can be manufactured based on current inventory.
-   **Responsive Design** that adapts tables and layouts for mobile and desktop screens.
-   **Centralized API Logic** via services and a custom `useApi` hook for clean and maintainable data fetching.
