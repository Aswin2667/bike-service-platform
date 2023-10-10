# Bike Service Application Readme

This readme provides instructions for installing and running the Bike Service Application. The application consists of both frontend and backend components and uses MongoDB as its database. You have two ways to set up and run the application, either manually or using Docker Compose.

## Installation and Setup

### Way 1: Manual Setup

Follow these steps to manually set up the Bike Service Application:

1. Clone the repository:

   ```
  git clone https://github.com/Aswin2667/Project.git
   ```

2. Change into the frontend directory:

   ```
   cd front-end
   ```

3. Install frontend dependencies:

   ```
   npm install
   ```

4. Change into the backend directory:

   ```
   cd back-end
   ```

5. Install backend dependencies:

   ```
   npm install
   ```

6. Make sure MongoDB is installed on your local machine.

7. Start the frontend:

   ```
   npm start
   ```

8. Start the backend:

   ```
   npm start
   ```

### Way 2: Docker Compose

If you prefer using Docker Compose, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Aswin2667/Project.git
   ```

2. Make sure you have Docker and Docker Compose installed on your local machine.

3. Change into the project directory:

   ```
   cd Project
   ```

4. Run Docker Compose to start both frontend and backend containers:

   ```
   docker-compose up
   ```

## Application Credentials

- Admin Username: root
- Admin Password: rootroot

## Default Service

A default service is added at the startup of the backend.

## API Documentation and Schemas

API documentation and all schemas are accessible at:

- API Documentation: http://localhost:9090/api-docs

## Ports

The application uses the following ports:

- Frontend Port: 3000
- Backend Port: 9090

Please ensure that these ports are available and not in use by other applications when running the Bike Service Application.

For any additional information or issues, please refer to the [GitHub repository](https://github.com/Aswin2667/Bike-service-application.git).
