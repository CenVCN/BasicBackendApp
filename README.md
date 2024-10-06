# BasicBackendApp - Simple User Management API

A Basic Backend Applicaiton implemented using Node.js and Express.js

## Overview

This is a simple user management API built with Node.js and Express. It allows users to register, log in, view their profiles, and update their information. The user data is stored in a JSON file.

## Features

- User Registration
- User Login
- Retrieve User Profile
- Update User Information
- Middleware for logging requests and authentication

## Technologies Used

- Node.js
- Express.js
- Body-Parser
- JSON File Storage

API Endpoints
Register a User

    URL: /users/register
    Method: POST
    Request Body:

    json

    {
      "username": "yourUsername",
      "email": "yourEmail@example.com",
      "password": "yourPassword"
    }

    Response:
        Success: 201 Created
        Error: 400 Bad Request (if fields are missing)

Login a User

    URL: /users/login
    Method: POST
    Request Body:

    json

    {
      "username": "yourUsername",
      "password": "yourPassword"
    }

    Response:
        Success: 200 OK with token
        Error: 400 Bad Request (if invalid credentials)

Get User Profile

    URL: /users/profile
    Method: GET
    Headers:
        user-id: userId
    Response:
        Success: 200 OK with user data
        Error: 404 Not Found (if user does not exist)

Update User Information

    URL: /users/update/:id
    Method: PUT
    Request Body:

    json

    {
    "username": "newUsername",
    "email": "newEmail@example.com"
    }

Response:

    Success: 200 OK with update confirmation
    Error: 404 Not Found (if user does not exist)