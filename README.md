BasicBackendApp - Simple User Management API

A Basic Backend Application implemented using Node.js and Express.js

## Overview

This is a simple user management API built with Node.js and Express. It allows users to register, log in, view their profiles, and update their information. The user data is stored in a JSON file.

## Features

- User Registration
- User Login (JWT Authentication)
- Retrieve User Profile
- Update User Information
- Middleware for logging requests and authentication (JWT)

## Technologies Used

- Node.js
- Express.js
- Body-Parser
- JSON File Storage
- JWT (JSON Web Tokens) for Authentication

## JWT Authentication

For login and authentication, the application uses JWT tokens to verify users. The token is issued upon successful login and must be included in the headers for protected routes like viewing and updating profiles.

## API Endpoints

### Register a User

- **URL**: `/users/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "yourUsername",
    "email": "yourEmail@example.com",
    "password": "yourPassword"
  }
  ```
- **Response**:
  - **Success**: `201 Created` with
    ```json
    { "message": "User Registration Successful!" }
    ```
  - **Error**: `400 Bad Request` (if fields are missing)

### Login a User

- **URL**: `/users/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "yourUsername",
    "password": "yourPassword"
  }
  ```
- **Response**:
  - **Success**: `200 OK` with token
    ```json
    { "token": "your_jwt_token" }
    ```
  - **Error**: `400 Bad Request` (if invalid credentials)

### Get User Profile

- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**:
  - `user-id`: userId
- **Response**:
  - **Success**: `200 OK` with user data
  - **Error**:
    - `400 Bad Request` (if user ID is invalid)
    - `404 Not Found` (if user does not exist)

### Update User Information

- **URL**: `/users/update/:id`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "username": "newUsername",
    "email": "newEmail@example.com"
  }
  ```
- **Response**:
  - **Success**: `200 OK` with update confirmation
    ```json
    { "message": "User updated successfully" }
    ```
  - **Error**: `404 Not Found` (if user does not exist)
