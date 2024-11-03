
# React Login Dashboard Backend with MongoDB

This project is a Node.js backend for the React Login Dashboard. It uses MongoDB for data storage, and Docker/Docker Compose for easy setup and deployment.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [License](#license)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installing Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# MongoDB configuration
MONGO_URI=mongodb://mongodb:27017/your_database_name

# JWT secret for token signing
JWT_SECRET=your_jwt_secret

# Backend server port
PORT=8000
```

## Docker Setup

### Building and Running the Containers

1. Build and start the containers:

    ```bash
    docker-compose up -d
    ```

2. Stop the containers:

    ```bash
    docker-compose down
    ```

### Docker Compose Configuration

The `docker-compose.yml` file includes services for both the backend and MongoDB.

## API Endpoints

### Health Check
- **Endpoint**: `/api/health`
- **Method**: `GET`
- **Response**:
    ```json
    {
      "status": "Server is healthy"
    }
    ```

### User Registration
- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "username": "user",
      "password": "password"
    }
    ```

### User Login
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "username": "user",
      "password": "password"
    }
    ```

## Development

To start the backend server for development:

```bash
npm run dev
```

## License

This project is licensed under the MIT License.
