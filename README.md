# User Registration and Authentication System

This is a simple web application built with **Express.js** for handling user registration, login, and searching of users based on the provided username or email. The application uses **MongoDB** for data storage and **JWT** for authentication.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Postman**: Used for testing the API endpoints

## Features
- **User Registration**: Allows a user to register by submitting their username, password, full name, gender, date of birth, and country. The password is hashed before storing in the database for security.
- **User Login**: Enables users to log in using their username/email and password, generating a JWT token for authenticated access.
- **Search User**: Search for a registered user by their username or email.
  
## Endpoints

### 1. **POST /register**
   - **Description**: Registers a new user in the system.
   - **Request Body**:
     ```json
     {
       "username": "johndoe",
       "password": "password123",
        "email":"email12@gmail.com",
       "fullName": "John Doe",
       "gender": "Male",
       "dateOfBirth": "21/09/2004",
       "country": "India"
     }
     ```
   - **Response**:
     - `201 Created`: User registered successfully.
     - `400 Bad Request`: Invalid or missing fields.

### 2. **POST /login**
   - **Description**: Logs in an existing user and generates a JWT token.
   - **Request Body**:
     ```json
     {
       "username": "johndoe",
       "password": "password123"
     }
     ```
   - **Response**:
     - `200 OK`: JWT token if login is successful.
     - `401 Unauthorized`: Invalid credentials.

### 3. **GET /search**
   - **Description**: Searches for a user by their username.
   - **Query Parameters**:
     - `username`
   - **Response**:
     - `200 OK`: User details if found.
     - `404 Not Found`: No user found with the provided username or email.

## Installation

### Prerequisites
- Node.js
- MongoDB (locally or through a cloud provider like MongoDB Atlas)

### Steps to Run the Project

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/kuruvapavani/toposel.git
   ```

2. Navigate to the project directory:
   ```bash
   cd toposel
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add the MongoDB connection string and JWT secret:
   ```bash
   MONGO_URI=mongodb://localhost:27017/your-db-name
   JWT_SECRET=your-secret-key
   ```

5. Run the application:
   ```bash
   nodemon index.js
   ```

6. The server will be running on `http://localhost:3000`.

## Testing with Postman

You can use Postman to test the three API endpoints. Here's an example of how to test each endpoint:

### 1. **User Registration**
   - Set method to `POST`.
   - URL: `http://localhost:3000/api/users/register`
   - Request Body (JSON):
     ```json
     {
       "username": "johndoe",
       "password": "password123",
        "email":"email12@gmail.com",
       "fullName": "John Doe",
       "gender": "Male",
       "dateOfBirth": "21/09/2004",
       "country": "India"
     }
     ```

### 2. **User Login**
   - Set method to `POST`.
   - URL: `http://localhost:3000/api/users/login`
   - Request Body (JSON):
     ```json
     {
       "username": "johndoe",
       "password": "password123"
     }
     ```

### 3. **Search User**
   - Set method to `GET`.
   - URL: `http://localhost:3000/api/users/search?username=johndoe`

## Data Validation
All user input is validated server-side. The application ensures that:
- Required fields are provided.
- Password is at least 6 characters long.
- Username and email are unique.

## Authentication
JWT tokens are used to manage authentication. After a successful login, the user will receive a JWT token, which can be used for authenticated routes (in this case, the `/search` endpoint).


## License
This project is open-source and available under the [MIT License](LICENSE).
