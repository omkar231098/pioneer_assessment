# Authentication API with Node.js and Swagger

## Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/omkar231098/pioneer_assessment.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file and adding the following:
   ```plaintext
   SECRET_KEY=your_secret_key_here
   DATABASE_URL=your_mongodb_URL
   PORT=8500
   ```

4. Start the server:
   ```bash
   npm run server
   ```

   The server should now be running on http://localhost:8500.

## API Endpoints

### User Registration

- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```
- **Success Response:**
  ```json
  {
    "success": true,
    "message": "Registration successful! You can now log in."
  }
  ```
- **Error Response:**
  ```json
  {
    "success": false,
    "message": "User already exists. Please use a different username."
  }
  ```

### User Login

- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Log in with username and password.
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```
- **Success Response:**
  ```json
  {
    "status": true,
    "message": "Successfully logged in",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response:**
  ```json
  {
    "status": false,
    "message": "Incorrect Password"
  }
  ```

### User Logout

- **URL:** `/auth/logout`
- **Method:** `POST`
- **Description:** Log out the user and blacklist the token.
- **Success Response:**
  ```plaintext
  Logged out successfully
  ```
- **Error Response:**
  ```plaintext
  Server error
  ```

### Sample Route

- **URL:** `/gethello`
- **Method:** `GET`
- **Description:** Sample route to return a hello message.
- **Request Headers:**
  ```plaintext
  Authorization: your_access_token_here
  ```
- **Success Response:**
  ```json
  {
    "message": "Hello, World!"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

## Swagger Documentation

Swagger documentation for the API endpoints is available at http://localhost:8500/documentations when the server is running. You can use Swagger UI or a similar tool to interactively explore and test the API.

Deployed Swagger Documenatation https://pioneer-assessment.onrender.com/documentations

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
