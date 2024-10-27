# PrimeBay Ecommerce Frontend

This is the frontend repository for the **MERN Stack Ecommerce** project. The frontend provides a responsive user interface for browsing products, managing carts, handling checkout, and managing user accounts.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)

## Project Overview

This project includes the frontend of an ecommerce platform built with the MERN (MongoDB, Express, React, Node.js) stack. Users can browse, add items to the cart, and securely complete purchases. Admins can manage products, orders, and users.

## Technologies Used

- **React** - Frontend library for building user interfaces
- **Redux** - State management for React applications
- **Axios** - For making HTTP requests to the backend API
- **React Router** - Client-side routing
- **Bootstrap** - UI components for responsive design
- **Stripe/PayPal API** - Payment processing

## Features

- User authentication and authorization (JWT)
- Shopping cart management
- Product listing and filtering
- Order management
- Payment integration with Stripe or PayPal
- Admin dashboard for managing products and orders

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-frontend-repo.git

2. Navigate to the project directory:

    ```bash
    cd your-frontend-repo

3. Install dependencies:

    ```bash
    npm install

4. Start the frontend application:

    ```bash
    npm run dev

## Environment Variables

    VITE_FIREBASE_KEY=""
    VITE_AUTH_DOMAIN=""
    VITE_PROJECT_ID=""
    VITE_STORAGE_BUCKET=""
    VITE_MESSAGING_SENDER_ID=""
    VITE_APP_ID=""
    VITE_MEASUREMENT_ID=""
    VITE_SERVER=""
    VITE_STRIPE_KEY=""