
# Photo API

This project is a Photo API that provides endpoints to fetch random photos from Unsplash, create orders, and retrieve orders for a specific user. The backend is built using Node.js and TypeScript, and it uses MongoDB for data storage and Redis for caching.

## Features

- Fetch a specified number of random photos from Unsplash
- Create a new order with details such as email, full name, address, image URLs, frame color, and user
- Retrieve all orders for a specific user

## Prerequisites

- Node.js
- npm or yarn
- Docker (for MongoDB and Redis)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/photo-api.git
    cd photo-api
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=your_db_name
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    UNSPLASH_ACCESS_KEY=your_unsplash_access_key
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_TTL=3600
    ```

## Running MongoDB and Redis with Docker

1. **Run MongoDB**:

    ```sh
    docker run --name my-mongo -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=your_db_user -e MONGO_INITDB_ROOT_PASSWORD=your_db_password mongo:latest
    ```

2. **Run Redis**:

    ```sh
    docker run --name my-redis -d -p 6379:6379 redis:latest
    ```

## Running the Application

To run the application in development mode:

```sh
npm run dev
```

To transpile TypeScript to JavaScript and run the transpiled code:

```sh
npm run build
npm start
```

## API Endpoints

### Fetch Random Photos

- **Endpoint**: `GET /api/photos/:count`
- **Description**: Fetch a specified number of random photos from Unsplash
- **URL Parameters**:
  - `count` (required): Number of random photos to fetch

Example request:

```sh
GET http://localhost:3000/api/photos/5
```

### Create Order

- **Endpoint**: `POST /api/orders`
- **Description**: Create a new order
- **Request Body**:
  - `email` (string, required)
  - `fullName` (string, required)
  - `fullAddress` (string, required)
  - `imageUrls` (array of strings, required)
  - `frameColor` (string, required)
  - `user` (string, required)

Example request:

```sh
POST http://localhost:3000/api/orders
Content-Type: application/json

{
  "email": "user@example.com",
  "fullName": "John Doe",
  "fullAddress": "123 Main St, Anytown, USA",
  "imageUrls": [
    "https://images.unsplash.com/photo-1",
    "https://images.unsplash.com/photo-2"
  ],
  "frameColor": "black",
  "user": "user123"
}
```

### Get User Orders

- **Endpoint**: `GET /api/orders/:user`
- **Description**: Retrieve all orders for a specific user
- **URL Parameters**:
  - `user` (required): The user identifier

Example request:

```sh
GET http://localhost:3000/api/orders/user123
```

## Postman Collection

To import the Postman collection, follow these steps for each endpoint:

1. Open Postman.
2. Click on the "Import" button in the top left corner.
3. Select "Raw Text" and paste the respective JSON structure provided below.
4. Click on the "Import" button to import the endpoint.

### Fetch Random Photos

```json
{
  "info": {
    "name": "Fetch Random Photos",
    "_postman_id": "d4f0d5f0-1234-4c32-a456-123456789012",
    "description": "Fetch a specified number of random photos",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Fetch Random Photos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/photos/:count",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "photos",
            ":count"
          ],
          "variable": [
            {
              "key": "count",
              "value": "5"
            }
          ]
        }
      },
      "response": []
    }
  ]
}
```

### Create Order

```json
{
  "info": {
    "name": "Create Order",
    "_postman_id": "d4f0d5f0-1234-4c32-a456-123456789012",
    "description": "Create a new order",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create Order",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"fullName\": \"John Doe\",\n  \"fullAddress\": \"123 Main St, Anytown, USA\",\n  \"imageUrls\": [\n    \"https://images.unsplash.com/photo-1\",\n    \"https://images.unsplash.com/photo-2\"\n  ],\n  \"frameColor\": \"black\",\n  \"user\": \"user123\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/orders",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "orders"
          ]
        }
      },
      "response": []
    }
  ]
}
```

### Get User Orders

```json
{
  "info": {
    "name": "Get User Orders",
    "_postman_id": "d4f0d5f0-1234-4c32-a456-123456789012",
    "description": "Get all orders for a specific user",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get User Orders",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/orders/:user",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "api",
            "orders",
            ":user"
          ],
          "variable": [
            {
              "key": "user",
              "value": "user123"
            }
          ]
        }
      },
      "response": []
    }
  ]
}
```

## License

This project is licensed under the MIT License.
```
