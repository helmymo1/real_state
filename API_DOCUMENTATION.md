# Backend API Documentation

This document provides a comprehensive overview of the backend API endpoints for the ProHouse application.

## Base URL

All API endpoints are prefixed with `/api/v1`.

---

## Order Routes

These endpoints are for managing orders.

### 22. Create a new order

*   **Endpoint:** `/order/new`
*   **Method:** `POST`
*   **Description:** Creates a new order.
*   **Authentication:** Required.
*   **Request Body:**
    ```json
    {
        "shippingInfo": {
            "address": "string",
            "city": "string",
            "state": "string",
            "country": "string",
            "pinCode": "number",
            "phoneNo": "number"
        },
        "orderItems": [
            {
                "name": "string",
                "price": "number",
                "quantity": "number",
                "image": "string (URL)",
                "product": "string (ObjectId)"
            }
        ],
        "itemsPrice": "number",
        "taxPrice": "number",
        "shippingPrice": "number",
        "totalPrice": "number",
        "paymentInfo": {
            "id": "string",
            "status": "string"
        }
    }
    ```
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true,
            "order": { ... } // created order object
        }
        ```

### 23. Get single order details

*   **Endpoint:** `/order/:id`
*   **Method:** `GET`
*   **Description:** Returns the details of a specific order.
*   **Authentication:** Required.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "order": { ... } // order object
        }
        ```
    *   **404 Not Found:** If the order is not found.

### 24. Get my orders

*   **Endpoint:** `/orders/me`
*   **Method:** `GET`
*   **Description:** Returns a list of all orders for the currently logged-in user.
*   **Authentication:** Required.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "orders": [ ... ] // array of order objects
        }
        ```

### 25. Get all orders (Admin)

*   **Endpoint:** `/admin/orders`
*   **Method:** `GET`
*   **Description:** Returns a list of all orders.
*   **Authentication:** Required, Admin role.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "orders": [ ... ] // array of order objects
        }
        ```

### 26. Update order status (Admin)

*   **Endpoint:** `/admin/order/:id`
*   **Method:** `PUT`
*   **Description:** Updates the status of a specific order.
*   **Authentication:** Required, Admin role.
*   **Request Body:**
    ```json
    {
        "status": "string"
    }
    ```
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```
    *   **404 Not Found:** If the order is not found.

### 27. Delete an order (Admin)

*   **Endpoint:** `/admin/order/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a specific order.
*   **Authentication:** Required, Admin role.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```
    *   **404 Not Found:** If the order is not found.

## Payment Routes

These endpoints are for processing payments.

### 28. Process payment

*   **Endpoint:** `/payment/process`
*   **Method:** `POST`
*   **Description:** Processes a payment. (Implementation is specific to the payment gateway).
*   **Authentication:** Required.
*   **Request Body:**
    ```json
    {
        "amount": "number",
        "email": "string",
        "phoneNo": "number"
    }
    ```
*   **Response:**
    *   **200 OK:** Depends on the payment gateway.

### 29. Paytm callback

*   **Endpoint:** `/callback`
*   **Method:** `POST`
*   **Description:** Callback endpoint for Paytm to send the payment status.
*   **Request Body:** Depends on Paytm's callback format.
*   **Response:** Depends on the implementation.

### 30. Get payment status

*   **Endpoint:** `/payment/status/:id`
*   **Method:** `GET`
*   **Description:** Returns the status of a specific payment.
*   **Authentication:** Required.
*   **Response:**
    *   **200 OK:** Depends on the implementation.

## Product Routes

These endpoints are for managing products.

### 13. Get all products

*   **Endpoint:** `/products`
*   **Method:** `GET`
*   **Description:** Returns a list of all products with optional filtering and pagination.
*   **Query Parameters:**
    *   `keyword` (string): Search keyword.
    *   `category` (string): Filter by category.
    *   `price[gte]` (number): Minimum price.
    *   `price[lte]` (number): Maximum price.
    *   `ratings[gte]` (number): Minimum rating.
    *   `page` (number): Page number for pagination.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "products": [ ... ], // array of product objects
            "productsCount": "number",
            "resultPerPage": "number",
            "filteredProductsCount": "number"
        }
        ```

### 14. Get all products (for sliders)

*   **Endpoint:** `/products/all`
*   **Method:** `GET`
*   **Description:** Returns a list of all products without pagination.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "products": [ ... ] // array of product objects
        }
        ```

### 15. Get product details

*   **Endpoint:** `/product/:id`
*   **Method:** `GET`
*   **Description:** Returns the details of a specific product.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "product": { ... } // product object
        }
        ```
    *   **404 Not Found:** If the product is not found.

### 16. Create a new product

*   **Endpoint:** `/admin/product/new`
*   **Method:** `POST`
*   **Description:** Creates a new product.
*   **Authentication:** Required. (Admin role intended, but currently disabled for testing).
*   **Request Body:**
    ```json
    {
        "name": "string",
        "description": "string",
        "price": "number",
        "cuttedPrice": "number",
        "category": "string",
        "stock": "number",
        "brandname": "string",
        "logo": "string (base64 encoded)",
        "images": ["string (base64 encoded)"],
        "specifications": [{"title": "string", "description": "string"}],
        "highlights": ["string"]
    }
    ```
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true,
            "product": { ... } // created product object
        }
        ```

### 17. Update a product

*   **Endpoint:** `/admin/product/:id`
*   **Method:** `PUT`
*   **Description:** Updates a specific product.
*   **Authentication:** Required. (Admin role intended, but currently disabled for testing).
*   **Request Body:** Same as create product.
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true,
            "product": { ... } // updated product object
        }
        ```
    *   **404 Not Found:** If the product is not found.

### 18. Delete a product

*   **Endpoint:** `/admin/product/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a specific product.
*   **Authentication:** Required. (Admin role intended, but currently disabled for testing).
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true
        }
        ```
    *   **404 Not Found:** If the product is not found.

### 19. Create or update a product review

*   **Endpoint:** `/review`
*   **Method:** `PUT`
*   **Description:** Creates a new review or updates an existing one for a product.
*   **Authentication:** Required.
*   **Request Body:**
    ```json
    {
        "rating": "number",
        "comment": "string",
        "productId": "string (ObjectId)"
    }
    ```
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```

### 20. Get product reviews

*   **Endpoint:** `/admin/reviews`
*   **Method:** `GET`
*   **Description:** Returns all reviews for a specific product.
*   **Query Parameters:**
    *   `id` (string): Product ID.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "reviews": [ ... ] // array of review objects
        }
        ```
    *   **404 Not Found:** If the product is not found.

### 21. Delete a product review

*   **Endpoint:** `/admin/reviews`
*   **Method:** `DELETE`
*   **Description:** Deletes a specific review.
*   **Authentication:** Required.
*   **Query Parameters:**
    *   `productId` (string): Product ID.
    *   `id` (string): Review ID.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```
    *   **404 Not Found:** If the product is not found.

---

### 5. Forgot Password

*   **Endpoint:** `/password/forgot`
*   **Method:** `POST`
*   **Description:** Sends a password reset email to the user.
*   **Request Body:**
    ```json
    {
        "email": "string"
    }
    ```
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "message": "Email sent to user@example.com successfully"
        }
        ```
    *   **404 Not Found:** If the user is not found.

### 6. Reset Password

*   **Endpoint:** `/password/reset/:token`
*   **Method:** `PUT`
*   **Description:** Resets the user's password using a reset token.
*   **Request Body:**
    ```json
    {
        "password": "string",
        "confirmPassword": "string"
    }
    ```
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "user": { ... }, // same as register response
            "token": "string (JWT)"
        }
        ```
    *   **404 Not Found:** If the reset token is invalid or has expired.

### 7. Update Password

*   **Endpoint:** `/password/update`
*   **Method:** `PUT`
*   **Description:** Updates the password of the currently logged-in user.
*   **Authentication:** Required.
*   **Request Body:**
    ```json
    {
        "oldPassword": "string",
        "newPassword": "string",
        "confirmPassword": "string"
    }
    ```
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true,
            "user": { ... }, // same as register response
            "token": "string (JWT)"
        }
        ```
    *   **400 Bad Request:** If the old password is incorrect.

### 8. Update Profile

*   **Endpoint:** `/me/update`
*   **Method:** `PUT`
*   **Description:** Updates the profile of the currently logged-in user.
*   **Authentication:** Required.
*   **Request Body:**
    ```json
    {
        "name": "string",
        "email": "string",
        "avatar": "string (base64 encoded)"
    }
    ```
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```

## Admin Routes (User Management)

### 9. Get all users

*   **Endpoint:** `/admin/users`
*   **Method:** `GET`
*   **Description:** Returns a list of all users.
*   **Authentication:** Required, Admin role.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "users": [ ... ] // array of user objects
        }
        ```

### 10. Get a single user

*   **Endpoint:** `/admin/user/:id`
*   **Method:** `GET`
*   **Description:** Returns the details of a specific user.
*   **Authentication:** Required, Admin role.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "user": { ... }
        }
        ```
    *   **404 Not Found:** If the user is not found.

### 11. Update user role

*   **Endpoint:** `/admin/user/:id`
*   **Method:** `PUT`
*   **Description:** Updates the role of a specific user.
*   **Authentication:** Required, Admin role.
*   **Request Body:**
    ```json
    {
        "name": "string",
        "email": "string",
        "gender": "string",
        "role": "string"
    }
    ```
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```

### 12. Delete a user

*   **Endpoint:** `/admin/user/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a specific user.
*   **Authentication:** Required, Admin role.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true
        }
        ```
    *   **404 Not Found:** If the user is not found.

---

## User Routes

These endpoints are for user management, including registration, login, and profile updates.

### 1. Register a new user

*   **Endpoint:** `/register`
*   **Method:** `POST`
*   **Description:** Registers a new user in the system.
*   **Request Body:**
    ```json
    {
        "name": "string",
        "email": "string (unique)",
        "gender": "string",
        "password": "string",
        "avatar": "string (base64 encoded)"
    }
    ```
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true,
            "user": {
                "name": "string",
                "email": "string",
                "gender": "string",
                "avatar": {
                    "public_id": "string",
                    "url": "string"
                },
                "role": "user",
                "_id": "string (ObjectId)",
                "createdAt": "string (Date)"
            },
            "token": "string (JWT)"
        }
        ```
    *   **400 Bad Request:** If there are validation errors.

### 2. Login a user

*   **Endpoint:** `/login`
*   **Method:** `POST`
*   **Description:** Logs in a user and returns a JWT token.
*   **Request Body:**
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
*   **Response:**
    *   **201 Created:**
        ```json
        {
            "success": true,
            "user": { ... }, // same as register response
            "token": "string (JWT)"
        }
        ```
    *   **400 Bad Request:** If email or password are not provided.
    *   **401 Unauthorized:** If the credentials are invalid.

### 3. Logout a user

*   **Endpoint:** `/logout`
*   **Method:** `GET`
*   **Description:** Logs out the current user by clearing the session cookie.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "message": "Logged Out"
        }
        ```

### 4. Get user details

*   **Endpoint:** `/me`
*   **Method:** `GET`
*   **Description:** Returns the details of the currently logged-in user.
*   **Authentication:** Required.
*   **Response:**
    *   **200 OK:**
        ```json
        {
            "success": true,
            "user": { ... } // same as register response
        }
        ```

---
