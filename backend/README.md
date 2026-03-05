# Autoflex - Backend API

This is the backend service for the Autoflex project, a RESTful API built to manage raw material inventory and product manufacturing for an industrial company.

The API handles all core business logic, including CRUD operations for products and raw materials, managing the composition of products, and providing production suggestions based on available stock.

---

## 🚀 Tech Stack

- **Java 17**: The version of the Java language used for the project.
- **Spring Boot 3.2.5**: The core framework for building and configuring the application.
- **Spring Data JPA**: For simplified and efficient data persistence with the database.
- **PostgreSQL**: The relational database management system used for data storage.
- **Maven**: The dependency management and project build tool.
- **Lombok**: To reduce boilerplate code (getters, setters, constructors).
- **MapStruct**: For high-performance, automated mapping between DTOs and JPA Entities.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or later.
- [Maven](https://maven.apache.org/download.cgi) (Optional, as the project includes the Maven Wrapper).
- A database client, such as [DBeaver](https://dbeaver.io/) or [pgAdmin](https://www.pgadmin.org/).
- A running instance of [PostgreSQL](https://www.postgresql.org/download/).

---

## ⚙️ Getting Started

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Configure the Database:**
    - In PostgreSQL, create a new, empty database named `autoflex`.
    - Open the configuration file at `src/main/resources/application.properties`.
    - Update the following lines with your local PostgreSQL credentials:
      ```properties
      spring.datasource.url=jdbc:postgresql://localhost:5432/autoflex
      spring.datasource.username=your_username_here
      spring.datasource.password=your_password_here
      ```

3.  **Build the Project:**
    - Open a terminal in the `backend` project folder.
    - Run the Maven Wrapper command to compile the project and download dependencies. This will also generate the necessary MapStruct implementation classes.
      ```sh
      # On Windows
      .\mvnw.cmd clean install

      # On Linux/macOS
      ./mvnw clean install
      ```

4.  **Run the Application:**
    - **Recommended:** Run the application directly from your IDE by locating the `AutoflexApplication.java` class and clicking "Run".
    - **Alternatively (via terminal):** From the `backend` folder, run:
      ```sh
      java -jar target/autoflex-0.0.1-SNAPSHOT.jar
      ```

The server will start and be available at `http://localhost:8080`.

---

## 📖 API Endpoints

The base URL for all endpoints is `http://localhost:8080/api`.

### Raw Materials (`/raw-materials`)

#### `POST /raw-materials`
Creates a new raw material.

-   **Request Body:**
    ```json
    {
      "name": "Stainless Steel Screw 3/16",
      "stockQuantity": 5000
    }
    ```
-   **Success Response (201 Created):**
    ```json
    {
      "id": 1,
      "name": "Stainless Steel Screw 3/16",
      "stockQuantity": 5000
    }
    ```

#### `GET /raw-materials`
Retrieves a list of all raw materials.

-   **Success Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "name": "Stainless Steel Screw 3/16",
        "stockQuantity": 5000
      },
      {
        "id": 2,
        "name": "2mm Steel Plate",
        "stockQuantity": 150
      }
    ]
    ```

#### `GET /raw-materials/{id}`
Finds a specific raw material by its ID.

-   **Success Response (200 OK):** Returns the raw material object.
-   **Error Response (404 Not Found):** If the ID does not exist.

#### `PUT /raw-materials/{id}`
Updates an existing raw material.

-   **Request Body:**
    ```json
    {
      "name": "Stainless Steel Screw 3/16 (Gen 2)",
      "stockQuantity": 4500
    }
    ```
-   **Success Response (200 OK):** Returns the updated raw material object.

#### `DELETE /raw-materials/{id}`
Deletes a raw material.

-   **Success Response (204 No Content):**
-   **Error Response (409 Conflict):** If the raw material is currently used in any product's composition.

---

### Products (`/products`)

#### `POST /products`
Creates a new product and its composition.

-   **Request Body:**
    ```json
    {
      "name": "Pro Gaming Chair",
      "price": 1250.99,
      "composition": [
        {
          "rawMaterialId": 1,
          "quantityNeeded": 20
        },
        {
          "rawMaterialId": 2,
          "quantityNeeded": 3
        }
      ]
    }
    ```
-   **Success Response (201 Created):**
    ```json
    {
      "id": 1,
      "name": "Pro Gaming Chair",
      "price": 1250.99,
      "composition": [
        {
          "rawMaterialId": 1,
          "rawMaterialName": "Stainless Steel Screw 3/16",
          "quantityNeeded": 20
        },
        {
          "rawMaterialId": 2,
          "rawMaterialName": "2mm Steel Plate",
          "quantityNeeded": 3
        }
      ]
    }
    ```

#### `GET /products`
Retrieves a list of all products.

-   **Success Response (200 OK):** Returns an array of product objects.

#### `GET /products/{id}`
Finds a specific product by its ID.

-   **Success Response (200 OK):** Returns a single product object.

#### `PUT /products/{id}`
Updates an existing product. The provided composition completely replaces the old one.

-   **Request Body:** (Same structure as `POST`)
-   **Success Response (200 OK):** Returns the updated product object.

#### `DELETE /products/{id}`
Deletes a product and its associated composition records.

-   **Success Response (204 No Content):**

---

### Production Suggestion (`/products/production-suggestion`)

#### `GET /products/production-suggestion`
Calculates and returns a list of products that can be manufactured with the current stock, prioritized by the highest value.

-   **Success Response (200 OK):**
    ```json
    {
      "suggestedProducts": [
        {
          "productId": 1,
          "productName": "Pro Gaming Chair",
          "quantityProducible": 50,
          "unitPrice": 1250.99,
          "totalValue": 62549.50
        }
      ],
      "totalObtainableValue": 62549.50
    }
    ```

---

## 🏛️ Architecture

The backend follows a layered architecture to promote a clean separation of concerns:

-   **`controller`**: The API layer. Responsible for exposing REST endpoints, handling HTTP requests, and returning responses.
-   **`business`**: The Service layer. Contains the core business logic of the application.
    -   **`service`**: Orchestrates business operations.
    -   **`mapper`**: Uses MapStruct to convert between DTOs and Entities.
    -   **`dto`**: Data Transfer Objects used for client communication.
-   **`infrastructure`**: The data access and infrastructure layer.
    -   **`entity`**: Classes that represent database tables (JPA Entities).
    -   **`repository`**: Spring Data JPA interfaces for database access.
    -   **`exception`**: Custom exception classes and the global exception handler (`@ControllerAdvice`).
-   **`WebConfig.java`**: Global configuration file, used here to define the CORS policy.
