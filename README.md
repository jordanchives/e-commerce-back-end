# E-commerce Back End

## Description

The E-commerce Backend is an Express.js application that provides RESTful API endpoints for managing data related to an e-commerce application, including products, categories, and tags.

## Table of Contents

- [Files](#files)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Models](#models)
- [Preview](#preview)
- [License](#license)

## Files

- `server.js`: Entry point for the application. Defines the Express server and sets up middleware.
- `.env.EXAMPLE`: Example environment file for configuring database connection parameters.
- `seeds/index.js`: Script for seeding the database with initial data.
- `routes/index.js`: Defines the main router and imports routes for categories, products, and tags.
- `routes/api/`: Files with routes for handling CRUD operations on categories, products, and tags.
- `models/`: Files defining Category, Product, ProductTag, and Tag models.
- `db/schema.sql`: SQL schema for creating the database.

## Dependencies

- `express`: Web application framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file into `process.env`.
- `mysql2`: MySQL client for Node.js, enabling access to MySQL databases.
- `sequelize`: Promise-based ORM for Node.js, supporting various SQL dialects.

### Development Dependencies

- `nodemon`: Monitors for changes in files and automatically restarts the server.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/jordanchives/e-commerce-back-end.git
    ```

2. Navigate to the project directory:

    ```bash
    cd e-commerce-back-end
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file based on the provided `.env.EXAMPLE` and fill in the required database connection parameters.

5. Create your MySQL database by executing the schema script provided in the `db/` directory.

6. Seed the database with initial data:

    ```bash
    npm run seed
    ```

## Usage

1. Open a terminal and navigate to the project directory.

2. Run the following command to start the server:

    ```bash
    npm start
    ```

3. Use API testing tools like Insomnia or curl to interact with the API endpoints.

## Environment Variables

Create a `.env` file in the root directory of the project based on the provided `.env.EXAMPLE`. Replace the placeholder values with your actual database connection parameters.

Example `.env` file:

```
DB_NAME='ecommerce_db'
DB_USER=''
DB_PW=''
```


## Routes

### Category Routes

- `GET /api/categories`: Retrieve all categories.
- `GET /api/categories/:id`: Retrieve a specific category by ID.
- `POST /api/categories`: Create a new category.
- `PUT /api/categories/:id`: Update an existing category.
- `DELETE /api/categories/:id`: Delete a category by ID.

### Product Routes

- `GET /api/products`: Retrieve all products.
- `GET /api/products/:id`: Retrieve a specific product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update an existing product.
- `DELETE /api/products/:id`: Delete a product by ID.

### Tag Routes

- `GET /api/tags`: Retrieve all tags.
- `GET /api/tags/:id`: Retrieve a specific tag by ID.
- `POST /api/tags`: Create a new tag.
- `PUT /api/tags/:id`: Update an existing tag.
- `DELETE /api/tags/:id`: Delete a tag by ID.

## Models

### Category Model

- `id`: Integer, Primary Key, Auto Increment.
- `category_name`: String, Not Null.

### Product Model

- `id`: Integer, Primary Key, Auto Increment.
- `product_name`: String, Not Null.
- `price`: Decimal, Not Null, Validation: isDecimal.
- `stock`: Integer, Not Null, Default: 10, Validation: isNumeric.
- `category_id`: Integer, References Category Model.

### Tag Model

- `id`: Integer, Primary Key, Auto Increment.
- `tag_name`: String.

### ProductTag Model

- `id`: Integer, Primary Key, Auto Increment.
- `product_id`: Integer, References Product Model.
- `tag_id`: Integer, References Tag Model.

## Preview

A video preview of the application can be found [here](https://jordanchives.github.io/e-commerce-back-end/assets/index.html)


## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
