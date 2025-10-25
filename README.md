# Inventory management system

This is a simple inventory management system built with express.js and PostgreSQL. It allows users to manage products and categories.

## Features

- Add, update, delete, and view products
- Add, update, delete, and view categories
- Search products by name or category

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- node-postgres (pg)

## Installation

1. Clone the repository:
   ```bash
   git clone
   ```
2. Navigate to the project directory:
   ```bash
   cd inventory-management-system
   ```
3. Install the dependencies:
   ```bash
   npm Install
   ``````
4. Set up the PostgreSQL database:
   - Create a new PostgreSQL database.
   - Run the SQL scripts in the `database` folder to create the necessary tables.   
5. Configure the database connection:
   - Create a `.env` file in the root directory.
   - Add the following line to the `.env` file, replacing the placeholders with your database credentials:
     `DATABASE_URL=postgresql://username:password@localhost:5432/database_name`
6. Start the server:
    ```bash 
    npm start
    ``````
7. Open your browser and navigate to `http://localhost:5000` to access the application.


