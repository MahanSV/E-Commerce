# E-Commerce API Documentation

Complete reference for all HTTP APIs in this project.

---

## Table of Contents

1.  [Overview](#overview)
2.  [Base URLs](#base-urls)
3.  [Common Headers](#common-headers)
4.  [Authentication](#authentication)
5.  [Error Responses](#error-responses)
6.  [Rate Limiting](#rate-limiting)
7.  [Express Backend API (`/api/*`)](#express-backend-api)
    -   [Health & Utility](#health--utility)
    -   [Products](#products)
    -   [Categories](#categories)
    -   [Product Images](#product-images)
    -   [Main Image Upload](#main-image-upload)
    -   [Search](#search)
    -   [Slugs](#slugs)
    -   [Users](#users)
    -   [Orders](#orders)
    -   [Order Products](#order-products)
    -   [Notifications](#notifications)
    -   [Merchants](#merchants)
    -   [Bulk Upload](#bulk-upload)
8.  [Next.js Frontend API](#nextjs-frontend-api)
    -   [Registration](#registration)
    -   [NextAuth (Authentication)](#nextauth-authentication)
9.  [Data Models Reference](#data-models-reference)
10.  [Disabled Routes](#disabled-routes)

---

## Overview

This E-Commerce application uses a **two-server architecture**:

Server

Technology

Default URL

Purpose

**Backend API**

Express.js + Prisma + MySQL

`http://localhost:3001`

REST API for products, orders, users, etc.

**Frontend**

Next.js 14 (App Router)

`http://localhost:3000`

UI + NextAuth + registration endpoint

The frontend communicates with the backend via `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:3001`).

---

## Base URLs

Environment

Backend API

Frontend

Development

`http://localhost:3001`

`http://localhost:3000`

Production

Set via `PORT` env var

Set via `NEXTAUTH_URL` / `FRONTEND_URL`

All backend routes are prefixed with `/api` unless noted otherwise (e.g. `/health`).

---

## Common Headers

### Request Headers

Header

Required

Used By

Description

`Content-Type: application/json`

Yes (JSON endpoints)

Most POST/PUT endpoints

JSON request body

`Content-Type: multipart/form-data`

Yes (file uploads)

Bulk upload, main image upload

File upload requests

`Authorization`

Optional

CORS allowed

Permitted by CORS config; not enforced on most backend routes

`x-forwarded-for`

Optional

Registration rate limit

Client IP for rate limiting

`x-real-ip`

Optional

Registration rate limit

Client IP for rate limiting

### Response Headers

Header

Description

`Content-Type: application/json`

Standard JSON responses

`RateLimit-*`

Rate limit info (when rate limiting applies)

### CORS Configuration

-   **Allowed methods:** `GET`, `POST`, `PUT`, `DELETE`
-   **Allowed headers:** `Content-Type`, `Authorization`
-   **Credentials:** `true`
-   **Allowed origins:** `http://localhost:3000`, `http://localhost:3001`, `NEXTAUTH_URL`, `FRONTEND_URL`, and any `http://localhost:*` in development

---

## Authentication

Most Express backend endpoints do **not** require authentication middleware. Access control is primarily handled on the frontend via NextAuth sessions.

**NextAuth** (frontend) provides JWT-based sessions:

-   Strategy: JWT
-   Session max age: 15 minutes
-   Session includes: `user.id`, `user.email`, `user.role`

---

## Error Responses

### Express Backend (standard)

```json
{
  "error": "Error message",
  "timestamp": "2026-08-10T12:00:00.000Z"
}
```

### Express Backend (validation with details)

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

### Express Backend (404)

```json
{
  "error": "Route not found",
  "requestId": "uuid"
}
```

### Next.js API (registration / auth errors)

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "password", "message": "Password must be at least 8 characters long" }
  ],
  "timestamp": "2026-08-10T12:00:00.000Z"
}
```

### HTTP Status Codes

Code

Meaning

`200`

Success

`201`

Created

`204`

No Content (successful delete)

`400`

Bad Request / Validation Error

`404`

Not Found

`409`

Conflict (duplicate record, duplicate order)

`429`

Too Many Requests (rate limited)

`500`

Internal Server Error

---

## Rate Limiting

All backend routes use rate limiting. When exceeded, response is `429`:

```json
{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": "15 minutes"
}
```

Route Group

Limit

Window

General (all routes)

300 requests

15 minutes

`/api/users`

300 requests

15 minutes

`/api/users/email/:email`

300 requests

15 minutes

`/api/search`

300 requests

1 minute

`/api/orders`, `/api/order-product`

300 requests

15 minutes

`/api/images`, `/api/main-image`, `/api/bulk-upload`

300 requests

15 minutes

`/api/register` (Next.js)

5 attempts

15 minutes (per IP)

See `GET /rate-limit-info` for a summary endpoint.

---

## Express Backend API

---

### Health & Utility

#### GET `/health`

Health check endpoint (no rate limiting bypass — uses general limiter).

**Headers:** None required

**Response `200`:**

```json
{
  "status": "OK",
  "timestamp": "2026-08-10T12:00:00.000Z",
  "rateLimiting": "enabled",
  "requestId": "uuid"
}
```

---

#### GET `/rate-limit-info`

Returns rate limit configuration summary.

**Response `200`:**

```json
{
  "general": "100 requests per 15 minutes",
  "auth": "5 login attempts per 15 minutes",
  "register": "3 registrations per hour",
  "upload": "10 uploads per 15 minutes",
  "search": "30 searches per minute",
  "orders": "15 order operations per 15 minutes",
  "wishlist": "20 operations per 5 minutes",
  "products": "60 requests per minute",
  "requestId": "uuid"
}
```

> Note: Actual limits in code may differ from this info endpoint text. Refer to the Rate Limiting table above for current values.

---

### Products

Base path: `/api/products`

#### GET `/api/products`

List products with optional filtering, sorting, and pagination.

**Query Parameters:**

Parameter

Type

Required

Description

`mode`

string

No

Set to `admin` to return all products without pagination

`page`

number

No

Page number (default: `1`). Returns 12 products per page

`filters[price][$operator]`

number

No

Filter by price. Operators: `gte`, `lte`, `gt`, `lt`, `equals`

`filters[rating][$operator]`

number

No

Filter by rating

`filters[category][$equals]`

string

No

Filter by category name

`filters[inStock][$operator]`

number

No

Filter by stock quantity

`filters[outOfStock][$operator]`

number

No

Filter out-of-stock products

`sort`

string

No

One of: `defaultSort`, `titleAsc`, `titleDesc`, `lowPrice`, `highPrice`

**Example URL:**

```
GET /api/products?page=1&filters[price][$gte]=10&filters[category][$equals]=Electronics&sort=lowPrice
```

**Response `200` (storefront mode):**

```json
[
  {
    "id": "uuid",
    "slug": "product-slug",
    "title": "Product Name",
    "mainImage": "image.jpg",
    "price": 9999,
    "rating": 5,
    "description": "Product description",
    "manufacturer": "Brand",
    "inStock": 10,
    "categoryId": "uuid",
    "merchantId": "uuid",
    "category": {
      "name": "Electronics"
    }
  }
]
```

**Response `200` (admin mode — `?mode=admin`):**

Returns all products without pagination or category include.

---

#### GET `/api/products/:id`

Get a single product by ID.

**URL Params:**

Param

Type

Required

Description

`id`

string (UUID)

Yes

Product ID

**Response `200`:**

```json
{
  "id": "uuid",
  "slug": "product-slug",
  "title": "Product Name",
  "mainImage": "image.jpg",
  "price": 9999,
  "rating": 5,
  "description": "Product description",
  "manufacturer": "Brand",
  "inStock": 10,
  "categoryId": "uuid",
  "merchantId": "uuid",
  "category": {
    "id": "uuid",
    "name": "Electronics"
  }
}
```

**Errors:** `400` missing ID, `404` product not found

---

#### POST `/api/products`

Create a new product.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`merchantId`

string (UUID)

Yes

Merchant ID

`slug`

string

Yes

Unique URL slug

`title`

string

Yes

Product title

`price`

number

Yes

Product price

`categoryId`

string (UUID)

Yes

Category ID

`mainImage`

string

No

Main image filename/URL

`description`

string

No

Product description

`manufacturer`

string

No

Manufacturer name

`inStock`

number

No

Stock quantity (default: 1)

**Example Request:**

```json
{
  "merchantId": "uuid",
  "slug": "wireless-headphones",
  "title": "Wireless Headphones",
  "mainImage": "headphones.jpg",
  "price": 7999,
  "description": "High quality wireless headphones",
  "manufacturer": "AudioBrand",
  "categoryId": "uuid",
  "inStock": 50
}
```

**Response `201`:** Created product object (includes auto-set `rating: 5`)

**Errors:** `400` missing required fields

---

#### PUT `/api/products/:id`

Update an existing product.

**URL Params:**

Param

Type

Required

Description

`id`

string (UUID)

Yes

Product ID

**Request Body:** Same fields as POST (all optional for update)

**Response `200`:** Updated product object

**Errors:** `400` missing ID, `404` product not found

---

#### DELETE `/api/products/:id`

Delete a product.

**URL Params:**

Param

Type

Required

Description

`id`

string (UUID)

Yes

Product ID

**Response:** `204 No Content`

**Errors:**

-   `400` — Product is referenced in orders (foreign key constraint)
-   `404` — Product not found

---

### Categories

Base path: `/api/categories`

#### GET `/api/categories`

List all categories.

**Response `200`:**

```json
[
  {
    "id": "uuid",
    "name": "Electronics"
  }
]
```

---

#### GET `/api/categories/:id`

Get a category by ID.

**URL Params:**

Param

Type

Required

Description

`id`

string (UUID)

Yes

Category ID

**Response `200`:**

```json
{
  "id": "uuid",
  "name": "Electronics"
}
```

**Errors:** `404` category not found

---

#### POST `/api/categories`

Create a category.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`name`

string

Yes

Unique category name

**Example Request:**

```json
{
  "name": "Electronics"
}
```

**Response `201`:**

```json
{
  "id": "uuid",
  "name": "Electronics"
}
```

**Errors:** `400` empty name, `409` duplicate name (unique constraint)

---

#### PUT `/api/categories/:id`

Update a category.

**URL Params:** `id` (UUID)

**Request Body:**

Field

Type

Required

`name`

string

Yes

**Response `200`:** Updated category object

---

#### DELETE `/api/categories/:id`

Delete a category.

**Response:** `204 No Content`

**Errors:** `400` — Category has associated products

---

### Product Images

Base path: `/api/images`

> Note: Route param `:id` refers to **product ID**, not image ID.

#### GET `/api/images/:id`

Get all images for a product.

**URL Params:**

Param

Type

Required

Description

`id`

string

Yes

Product ID

**Response `200`:**

```json
[
  {
    "imageID": "uuid",
    "productID": "uuid",
    "image": "image-filename.jpg"
  }
]
```

---

#### POST `/api/images`

Create a product image record.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`productID`

string

Yes

Product ID

`image`

string

Yes

Image filename/path

**Example Request:**

```json
{
  "productID": "uuid",
  "image": "product-photo-2.jpg"
}
```

**Response `201`:** Created image object

---

#### PUT `/api/images/:id`

Update image for a product (finds first image by product ID).

**URL Params:** `id` — Product ID

**Request Body:**

Field

Type

Required

`productID`

string

Yes

`image`

string

Yes

**Response `200`:** Updated image object

**Errors:** `404` no image found for product

---

#### DELETE `/api/images/:id`

Delete all images for a product.

**URL Params:** `id` — Product ID

**Response:** `204 No Content`

---

### Main Image Upload

Base path: `/api/main-image`

#### POST `/api/main-image`

Upload a main product image file.

**Headers:** `Content-Type: multipart/form-data`

**Request Body (form-data):**

Field

Type

Required

Description

`uploadedFile`

File

Yes

Image file to upload

**Response `200`:**

```json
{
  "message": "Fajl je uspešno otpremljen"
}
```

**Errors:**

-   `400` — No files uploaded
-   `500` — File move error

> File is saved to `public/` directory with original filename.

---

### Search

Base path: `/api/search`

#### GET `/api/search`

Search products by title or description.

**Query Parameters:**

Parameter

Type

Required

Description

`query`

string

Yes

Search term

**Example:**

```
GET /api/search?query=headphones
```

**Response `200`:**

```json
[
  {
    "id": "uuid",
    "slug": "wireless-headphones",
    "title": "Wireless Headphones",
    "mainImage": "headphones.jpg",
    "price": 7999,
    "rating": 5,
    "description": "High quality wireless headphones",
    "manufacturer": "AudioBrand",
    "inStock": 50,
    "categoryId": "uuid",
    "merchantId": "uuid"
  }
]
```

**Errors:** `400` — Missing `query` parameter

---

### Slugs

Base path: `/api/slugs`

#### GET `/api/slugs/:slug`

Get a product by its URL slug.

**URL Params:**

Param

Type

Required

Description

`slug`

string

Yes

Product slug

**Example:**

```
GET /api/slugs/wireless-headphones
```

**Response `200`:**

```json
{
  "id": "uuid",
  "slug": "wireless-headphones",
  "title": "Wireless Headphones",
  "mainImage": "headphones.jpg",
  "price": 7999,
  "rating": 5,
  "description": "High quality wireless headphones",
  "manufacturer": "AudioBrand",
  "inStock": 50,
  "categoryId": "uuid",
  "merchantId": "uuid",
  "category": {
    "id": "uuid",
    "name": "Electronics"
  }
}
```

**Errors:** `404` — Product not found

---

### Users

Base path: `/api/users`

> Passwords are never returned in responses.

#### GET `/api/users`

List all users.

**Response `200`:**

```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "role": "user"
  }
]
```

---

#### GET `/api/users/:id`

Get user by ID.

**URL Params:** `id` (UUID)

**Response `200`:**

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "role": "user"
}
```

---

#### GET `/api/users/email/:email`

Get user by email address.

**URL Params:**

Param

Type

Required

Description

`email`

string

Yes

User email

**Example:**

```
GET /api/users/email/user@example.com
```

**Response `200`:** User object (no password)

**Errors:** `404` user not found

---

#### POST `/api/users`

Create a new user.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`email`

string

Yes

Valid email address

`password`

string

Yes

Min 8 characters

`role`

string

No

Default: `"user"`

**Example Request:**

```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "role": "user"
}
```

**Response `201`:**

```json
{
  "id": "uuid",
  "email": "newuser@example.com",
  "role": "user"
}
```

**Errors:** `400` invalid email or short password, `409` duplicate email

---

#### PUT `/api/users/:id`

Update a user.

**URL Params:** `id` (UUID)

**Request Body:**

Field

Type

Required

Description

`email`

string

No

New email

`password`

string

No

New password (min 8 chars, hashed)

`role`

string

No

New role

**Response `200`:** Updated user object (no password)

---

#### DELETE `/api/users/:id`

Delete a user.

**Response:** `204 No Content`

---

### Orders

Base path: `/api/orders`

#### GET `/api/orders`

List all orders with pagination.

**Query Parameters:**

Parameter

Type

Required

Default

Description

`page`

number

No

`1`

Page number (must be ≥ 1)

`limit`

number

No

`50`

Items per page (1–100)

**Response `200`:**

```json
{
  "orders": [
    {
      "id": "uuid",
      "name": "John",
      "lastname": "Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "company": "ACME Inc",
      "adress": "123 Main St",
      "apartment": "4B",
      "postalCode": "10001",
      "dateTime": "2026-08-10T12:00:00.000Z",
      "status": "pending",
      "city": "New York",
      "country": "USA",
      "orderNotice": "Leave at door",
      "total": 9999
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 100,
    "totalPages": 2
  }
}
```

---

#### GET `/api/orders/:id`

Get a single order by ID.

**Response `200`:** Order object

**Errors:** `404` order not found

---

#### POST `/api/orders`

Create a new customer order.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Validation

Description

`name`

string

Yes

2–50 chars

First name

`lastname`

string

Yes

2–50 chars

Last name

`email`

string

Yes

Valid email

Customer email

`phone`

string

Yes

10–20 chars

Phone number

`company`

string

Yes

5–200 chars

Company name

`adress`

string

Yes

5–200 chars

Street address

`apartment`

string

Yes

1–200 chars

Apartment/unit

`city`

string

Yes

5–200 chars

City

`country`

string

Yes

5–200 chars

Country

`postalCode`

string

Yes

3–20 chars

Postal/ZIP code

`total`

number

Yes

> 0, min $0.01

Order total

`status`

string

No

See below

Default: `"pending"`

`orderNotice`

string

No

Max 500 chars

Special instructions

`userId`

string

No

UUID

Logged-in user ID (for notifications)

**Valid `status` values:** `pending`, `processing`, `shipped`, `delivered`, `cancelled`

**Example Request:**

```json
{
  "name": "John",
  "lastname": "Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "company": "ACME Inc",
  "adress": "123 Main Street",
  "apartment": "4B",
  "postalCode": "10001",
  "city": "New York",
  "country": "USA",
  "total": 9999,
  "status": "pending",
  "orderNotice": "Leave at door",
  "userId": "uuid"
}
```

**Response `201`:**

```json
{
  "id": "uuid",
  "message": "Order created successfully",
  "orderNumber": "uuid"
}
```

**Errors:**

-   `400` — Validation failed (see `details` array)
-   `409` — Duplicate order (same email + total within 1 minute)

---

#### PUT `/api/orders/:id`

Update an order.

**URL Params:** `id` (UUID)

**Request Body:** Same fields as POST (all validated)

**Response `200`:** Updated order object

**Side effect:** Sends notification if status changed and user account exists.

---

#### DELETE `/api/orders/:id`

Delete an order.

**Response:** `204 No Content`

---

### Order Products

Base path: `/api/order-product`

Links products to customer orders (line items).

#### GET `/api/order-product`

Get all order-product entries grouped by order.

**Response `200`:**

```json
[
  {
    "customerOrderId": "uuid",
    "customerOrder": {
      "name": "John",
      "lastname": "Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "company": "ACME Inc",
      "adress": "123 Main St",
      "apartment": "4B",
      "postalCode": "10001",
      "dateTime": "2026-08-10T12:00:00.000Z",
      "status": "pending",
      "total": 9999
    },
    "products": [
      {
        "id": "uuid",
        "title": "Wireless Headphones",
        "mainImage": "headphones.jpg",
        "price": 7999,
        "slug": "wireless-headphones",
        "quantity": 2
      }
    ]
  }
]
```

---

#### GET `/api/order-product/:id`

Get all products for a specific order.

**URL Params:** `id` — Customer Order ID

**Response `200`:**

```json
[
  {
    "id": "uuid",
    "customerOrderId": "uuid",
    "productId": "uuid",
    "quantity": 2,
    "product": {
      "id": "uuid",
      "slug": "wireless-headphones",
      "title": "Wireless Headphones",
      "mainImage": "headphones.jpg",
      "price": 7999,
      "rating": 5,
      "description": "...",
      "manufacturer": "AudioBrand",
      "inStock": 50,
      "categoryId": "uuid",
      "merchantId": "uuid"
    }
  }
]
```

---

#### POST `/api/order-product`

Add a product to an order.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`customerOrderId`

string (UUID)

Yes

Order ID

`productId`

string (UUID)

Yes

Product ID

`quantity`

number

Yes

Quantity (> 0)

**Example Request:**

```json
{
  "customerOrderId": "uuid",
  "productId": "uuid",
  "quantity": 2
}
```

**Response `201`:**

```json
{
  "id": "uuid",
  "customerOrderId": "uuid",
  "productId": "uuid",
  "quantity": 2
}
```

**Errors:** `404` order or product not found

---

#### PUT `/api/order-product/:id`

Update an order-product line item.

**URL Params:** `id` — Order-Product line item ID

**Request Body:**

Field

Type

Required

`customerOrderId`

string

No

`productId`

string

No

`quantity`

number

No

**Response `200`:** Updated line item

---

#### DELETE `/api/order-product/:id`

Delete order-product entries by customer order ID.

**URL Params:** `id` — Customer Order ID

**Response:** `204 No Content`

---

### Notifications

Base path: `/api/notifications`

#### GET `/api/notifications/:userId/unread-count`

Get unread notification count for a user.

**URL Params:** `userId` (UUID)

**Response `200`:**

```json
{
  "unreadCount": 5
}
```

---

#### GET `/api/notifications/:userId`

Get paginated notifications for a user.

**URL Params:** `userId` (UUID)

**Query Parameters:**

Parameter

Type

Required

Default

Description

`type`

string

No

—

Filter by type (see enum below)

`isRead`

boolean

No

—

Filter by read status (`"true"` / `"false"`)

`search`

string

No

—

Search in title and message

`page`

number

No

`1`

Page number

`limit`

number

No

`10`

Items per page

`sortBy`

string

No

`createdAt`

`createdAt` or `priority`

`sortOrder`

string

No

`desc`

`asc` or `desc`

**Notification Types:** `ORDER_UPDATE`, `PAYMENT_STATUS`, `PROMOTION`, `SYSTEM_ALERT`

**Example:**

```
GET /api/notifications/uuid?page=1&limit=10&isRead=false&type=ORDER_UPDATE
```

**Response `200`:**

```json
{
  "notifications": [
    {
      "id": "uuid",
      "userId": "uuid",
      "title": "Order Confirmed",
      "message": "Your order has been confirmed.",
      "type": "ORDER_UPDATE",
      "isRead": false,
      "priority": "NORMAL",
      "metadata": { "orderId": "uuid" },
      "createdAt": "2026-08-10T12:00:00.000Z",
      "updatedAt": "2026-08-10T12:00:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "unreadCount": 5
}
```

---

#### POST `/api/notifications`

Create a notification.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`userId`

string (UUID)

Yes

Target user ID

`title`

string

Yes

Notification title

`message`

string

Yes

Notification message

`type`

string

Yes

Notification type enum

`priority`

string

No

Default: `"NORMAL"`. Values: `LOW`, `NORMAL`, `HIGH`, `URGENT`

`metadata`

object

No

Additional JSON metadata

**Example Request:**

```json
{
  "userId": "uuid",
  "title": "Order Shipped",
  "message": "Your order #12345 has been shipped.",
  "type": "ORDER_UPDATE",
  "priority": "HIGH",
  "metadata": {
    "orderId": "uuid",
    "trackingNumber": "TRACK123"
  }
}
```

**Response `201`:** Created notification object

**Errors:** `400` invalid type/priority, `404` user not found

---

#### POST `/api/notifications/mark-read`

Bulk mark notifications as read.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`notificationIds`

string[]

Yes

Array of notification IDs

`userId`

string (UUID)

Yes

User ID (ownership check)

**Example Request:**

```json
{
  "notificationIds": ["uuid1", "uuid2"],
  "userId": "uuid"
}
```

**Response `200`:**

```json
{
  "message": "2 notifications marked as read",
  "updatedCount": 2
}
```

---

#### PUT `/api/notifications/:id`

Update a notification (mark read/unread).

**URL Params:** `id` — Notification ID

**Request Body:**

Field

Type

Required

Description

`isRead`

boolean

Yes

Read status

**Example Request:**

```json
{
  "isRead": true
}
```

**Response `200`:** Updated notification object

---

#### DELETE `/api/notifications/:id`

Delete a single notification.

**URL Params:** `id` — Notification ID

**Request Body:**

Field

Type

Required

Description

`userId`

string (UUID)

Yes

User ID (ownership check)

**Response `200`:**

```json
{
  "message": "Notification deleted successfully"
}
```

---

#### DELETE `/api/notifications/bulk`

Bulk delete notifications.

**Request Body:**

Field

Type

Required

Description

`notificationIds`

string[]

Yes

Array of notification IDs

`userId`

string (UUID)

Yes

User ID (ownership check)

**Response `200`:**

```json
{
  "message": "3 notifications deleted",
  "deletedCount": 3
}
```

---

### Merchants

Base path: `/api/merchants`

#### GET `/api/merchants`

List all merchants with their products.

**Response `200`:**

```json
[
  {
    "id": "uuid",
    "name": "Tech Store",
    "description": "Electronics retailer",
    "email": "contact@techstore.com",
    "phone": "+1234567890",
    "address": "456 Commerce Blvd",
    "status": "ACTIVE",
    "createdAt": "2026-08-10T12:00:00.000Z",
    "updatedAt": "2026-08-10T12:00:00.000Z",
    "products": []
  }
]
```

---

#### GET `/api/merchants/:id`

Get merchant by ID with products.

**Response `200`:** Merchant object with `products` array

**Errors:** `404` merchant not found

---

#### POST `/api/merchants`

Create a merchant.

**Headers:** `Content-Type: application/json`

**Request Body:**

Field

Type

Required

Description

`name`

string

Yes

Merchant name

`email`

string

No

Contact email

`phone`

string

No

Contact phone

`address`

string

No

Physical address

`description`

string

No

Description

`status`

string

No

Default: `"ACTIVE"`

**Example Request:**

```json
{
  "name": "Tech Store",
  "email": "contact@techstore.com",
  "phone": "+1234567890",
  "address": "456 Commerce Blvd",
  "description": "Electronics retailer",
  "status": "ACTIVE"
}
```

**Response `201`:** Created merchant object

---

#### PUT `/api/merchants/:id`

Update a merchant.

**Request Body:** Same fields as POST (all optional)

**Response `200`:** Updated merchant object

---

#### DELETE `/api/merchants/:id`

Delete a merchant.

**Response:** `204 No Content`

**Errors:** `400` — Merchant has existing products

---

### Bulk Upload

Base path: `/api/bulk-upload`

Bulk import products from CSV files.

#### POST `/api/bulk-upload`

Upload a CSV file and create products in batch.

**Headers:** `Content-Type: multipart/form-data`

**Request Body (form-data):**

Field

Type

Required

Description

`file`

File (CSV)

Yes

CSV file with product data

**CSV Columns:**

Column

Type

Required

Description

`title`

string

Yes

Product title

`slug`

string

Yes

Unique slug

`price`

number

Yes

Non-negative price

`categoryId`

string

Yes

Category UUID or category name

`inStock`

number

Yes

Non-negative stock quantity

`manufacturer`

string

No

Manufacturer

`description`

string

No

Description

`mainImage`

string

No

Image filename

**Example CSV:**

```csv
title,slug,price,categoryId,inStock,manufacturer,description,mainImage
Wireless Headphones,wireless-headphones,79.99,Electronics,50,AudioBrand,High quality headphones,headphones.jpg
```

**Response `201`:**

```json
{
  "batchId": "uuid",
  "status": "COMPLETED",
  "total": 10,
  "errors": 0,
  "created": 10,
  "updated": 0,
  "validationErrors": []
}
```

**Batch Status Values:** `PENDING`, `COMPLETED`, `PARTIAL`, `FAILED`

**Item Status Values:** `CREATED`, `UPDATED`, `ERROR`

---

#### GET `/api/bulk-upload`

List all bulk upload batches.

**Response `200`:**

```json
{
  "batches": [
    {
      "id": "uuid",
      "fileName": "products.csv",
      "totalRecords": 10,
      "successfulRecords": 9,
      "failedRecords": 1,
      "status": "PARTIAL",
      "uploadedBy": "Admin",
      "uploadedAt": "2026-08-10T12:00:00.000Z",
      "errors": ["Row 5: slug is required"]
    }
  ]
}
```

---

#### GET `/api/bulk-upload/:batchId`

Get batch details with all items.

**URL Params:** `batchId` (UUID)

**Response `200`:**

```json
{
  "batch": {
    "id": "uuid",
    "fileName": "products.csv",
    "createdAt": "2026-08-10T12:00:00.000Z",
    "status": "COMPLETED",
    "itemCount": 10,
    "errorCount": 0,
    "userId": null
  },
  "items": [
    {
      "id": "uuid",
      "batchId": "uuid",
      "productId": "uuid",
      "title": "Wireless Headphones",
      "slug": "wireless-headphones",
      "price": 7999,
      "manufacturer": "AudioBrand",
      "description": "High quality headphones",
      "mainImage": "headphones.jpg",
      "categoryId": "uuid",
      "inStock": 50,
      "status": "CREATED",
      "error": null,
      "product": { }
    }
  ]
}
```

---

#### PUT `/api/bulk-upload/:batchId`

Update batch items (price and stock).

**URL Params:** `batchId` (UUID)

**Request Body:**

Field

Type

Required

Description

`items`

array

Yes

Array of item updates

**Item update object:**

Field

Type

Required

Description

`itemId`

string (UUID)

Yes

Bulk upload item ID

`price`

number

Yes

New price

`inStock`

number

Yes

New stock (0 or 1)

**Example Request:**

```json
{
  "items": [
    {
      "itemId": "uuid",
      "price": 8999,
      "inStock": 1
    }
  ]
}
```

**Response `200`:**

```json
{
  "updatedCount": 1,
  "items": [ ]
}
```

---

#### DELETE `/api/bulk-upload/:batchId`

Delete a bulk upload batch.

**URL Params:** `batchId` (UUID)

**Query Parameters:**

Parameter

Type

Required

Default

Description

`deleteProducts`

boolean

No

`false`

If `"true"`, also deletes created products

**Example:**

```
DELETE /api/bulk-upload/uuid?deleteProducts=true
```

**Response `200` (products kept):**

```json
{
  "success": true,
  "message": "Batch deleted successfully (products kept)",
  "deletedProducts": false
}
```

**Response `200` (products deleted):**

```json
{
  "success": true,
  "message": "Batch and products deleted successfully",
  "deletedProducts": true
}
```

**Errors:** `409` — Cannot delete products that are referenced in orders

---

## Next.js Frontend API

Base URL: `http://localhost:3000` (or `NEXTAUTH_URL`)

---

### Registration

#### POST `/api/register`

Register a new user account.

**Headers:**

Header

Required

Description

`Content-Type: application/json`

Yes

JSON body

**Request Body:**

Field

Type

Required

Validation

`email`

string

Yes

Valid email, max 254 chars, no XSS patterns

`password`

string

Yes

Min 8 chars, max 128 chars, must include uppercase, lowercase, number, and special character (`@$!%*?&`), not a common password

**Example Request:**

```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!"
}
```

**Response `200`:**

```json
{
  "message": "User registered successfully",
  "userId": "nanoid-string"
}
```

**Errors:**

-   `400` — Validation failed or email already in use
-   `429` — Too many registration attempts (5 per 15 minutes per IP)

---

### NextAuth (Authentication)

Base path: `/api/auth`

NextAuth.js catch-all route handles all authentication endpoints.

#### Supported Providers

Provider

Status

Description

Credentials

Active

Email + password login

GitHub

Disabled

Commented out in config

Google

Disabled

Commented out in config

---

#### GET `/api/auth/providers`

List available authentication providers.

**Response `200`:**

```json
{
  "credentials": {
    "id": "credentials",
    "name": "Credentials",
    "type": "credentials",
    "signinUrl": "http://localhost:3000/api/auth/signin/credentials",
    "callbackUrl": "http://localhost:3000/api/auth/callback/credentials"
  }
}
```

---

#### GET `/api/auth/csrf`

Get CSRF token for sign-in forms.

**Response `200`:**

```json
{
  "csrfToken": "token-string"
}
```

---

#### GET `/api/auth/session`

Get current session (requires valid session cookie).

**Response `200` (authenticated):**

```json
{
  "user": {
    "email": "user@example.com",
    "id": "uuid",
    "role": "user"
  },
  "expires": "2026-08-10T12:15:00.000Z"
}
```

**Response `200` (not authenticated):**

```json
{}
```

---

#### GET/POST `/api/auth/signin`

Sign-in page and sign-in handler.

**Credentials Sign-In POST Body:**

Field

Type

Required

Description

`email`

string

Yes

User email

`password`

string

Yes

User password

`csrfToken`

string

Yes

CSRF token from `/api/auth/csrf`

`callbackUrl`

string

No

Redirect URL after login

`json`

boolean

No

Set `true` for JSON response

**Example (JSON mode):**

```
POST /api/auth/callback/credentials
Content-Type: application/x-www-form-urlencoded

email=user@example.com&password=SecurePass123!&csrfToken=...&json=true
```

**Response (success):**

```json
{
  "url": "http://localhost:3000/"
}
```

**Response (failure):** Redirect to `/login` with error

---

#### GET/POST `/api/auth/signout`

Sign out current user.

**Response:** Redirect or JSON depending on request

---

#### GET/POST `/api/auth/callback/:provider`

OAuth/credentials callback handler.

**URL Params:** `provider` — e.g. `credentials`, `github`, `google`

---

#### Session Configuration

Setting

Value

Strategy

JWT

Max Age

15 minutes

Update Age

5 minutes

Sign-in Page

`/login`

Error Page

`/login`

**JWT Token Fields:**

Field

Description

`id`

User ID

`role`

User role (`user`, `admin`, etc.)

`iat`

Issued-at timestamp

---

## Data Models Reference

### Product

```typescript
{
  id: string;           // UUID
  slug: string;         // Unique
  title: string;
  mainImage: string;
  price: number;        // Integer
  rating: number;       // Integer, default 5
  description: string;
  manufacturer: string;
  inStock: number;      // Integer, default 1
  categoryId: string;   // UUID → Category
  merchantId: string;   // UUID → Merchant
}
```

### Category

```typescript
{
  id: string;    // UUID
  name: string;  // Unique
}
```

### User

```typescript
{
  id: string;       // UUID or nanoid
  email: string;    // Unique
  password?: string; // Hashed (never returned in API responses)
  role?: string;    // Default: "user"
}
```

### Customer Order

```typescript
{
  id: string;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  company: string;
  adress: string;       // Note: typo preserved from schema
  apartment: string;
  postalCode: string;
  dateTime?: DateTime;  // Default: now
  status: string;
  city: string;
  country: string;
  orderNotice?: string;
  total: number;        // Integer
}
```

### Customer Order Product (Line Item)

```typescript
{
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
}
```

### Image

```typescript
{
  imageID: string;
  productID: string;
  image: string;
}
```

### Merchant

```typescript
{
  id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: string;       // Default: "ACTIVE"
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Notification

```typescript
{
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "ORDER_UPDATE" | "PAYMENT_STATUS" | "PROMOTION" | "SYSTEM_ALERT";
  isRead: boolean;      // Default: false
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";  // Default: "NORMAL"
  metadata?: object;
  createdAt: DateTime;
  updatedAt: DateTime;
}
```

### Bulk Upload Batch

```typescript
{
  id: string;
  fileName?: string;
  createdAt: DateTime;
  status: "PENDING" | "COMPLETED" | "PARTIAL" | "FAILED";
  itemCount: number;
  errorCount: number;
  userId?: string;
}
```

### Bulk Upload Item

```typescript
{
  id: string;
  batchId: string;
  productId?: string;
  title: string;
  slug: string;
  price: number;
  manufacturer?: string;
  description?: string;
  mainImage?: string;
  categoryId: string;
  inStock: number;
  status: "CREATED" | "UPDATED" | "ERROR";
  error?: string;
}
```

### Wishlist (schema exists, API disabled)

```typescript
{
  id: string;
  productId: string;
  userId: string;
}
```

---

## Disabled Routes

The following routes exist in the codebase but are **commented out** in `server/app.js` and are **not active**:

### Wishlist — `/api/wishlist`

Method

Endpoint

Description

GET

`/api/wishlist`

Get all wishlist items

POST

`/api/wishlist`

Add item to wishlist

GET

`/api/wishlist/:userId`

Get wishlist by user

GET

`/api/wishlist/:userId/:productId`

Get single wishlist item

DELETE

`/api/wishlist/:userId/:productId`

Remove from wishlist

> Note: The wishlist controller file is missing from the repository; the route would fail if enabled without implementing the controller.

---

## Quick Reference — All Endpoints

Method

Endpoint

Description

GET

`/health`

Health check

GET

`/rate-limit-info`

Rate limit info

GET

`/api/products`

List products

POST

`/api/products`

Create product

GET

`/api/products/:id`

Get product

PUT

`/api/products/:id`

Update product

DELETE

`/api/products/:id`

Delete product

GET

`/api/categories`

List categories

POST

`/api/categories`

Create category

GET

`/api/categories/:id`

Get category

PUT

`/api/categories/:id`

Update category

DELETE

`/api/categories/:id`

Delete category

GET

`/api/images/:id`

Get product images

POST

`/api/images`

Create image

PUT

`/api/images/:id`

Update image

DELETE

`/api/images/:id`

Delete images

POST

`/api/main-image`

Upload main image

GET

`/api/search`

Search products

GET

`/api/slugs/:slug`

Get product by slug

GET

`/api/users`

List users

POST

`/api/users`

Create user

GET

`/api/users/:id`

Get user

PUT

`/api/users/:id`

Update user

DELETE

`/api/users/:id`

Delete user

GET

`/api/users/email/:email`

Get user by email

GET

`/api/orders`

List orders

POST

`/api/orders`

Create order

GET

`/api/orders/:id`

Get order

PUT

`/api/orders/:id`

Update order

DELETE

`/api/orders/:id`

Delete order

GET

`/api/order-product`

List order products

POST

`/api/order-product`

Create order line item

GET

`/api/order-product/:id`

Get order products

PUT

`/api/order-product/:id`

Update line item

DELETE

`/api/order-product/:id`

Delete line items

GET

`/api/notifications/:userId`

Get notifications

GET

`/api/notifications/:userId/unread-count`

Unread count

POST

`/api/notifications`

Create notification

POST

`/api/notifications/mark-read`

Bulk mark read

PUT

`/api/notifications/:id`

Update notification

DELETE

`/api/notifications/:id`

Delete notification

DELETE

`/api/notifications/bulk`

Bulk delete

GET

`/api/merchants`

List merchants

POST

`/api/merchants`

Create merchant

GET

`/api/merchants/:id`

Get merchant

PUT

`/api/merchants/:id`

Update merchant

DELETE

`/api/merchants/:id`

Delete merchant

POST

`/api/bulk-upload`

Upload CSV

GET

`/api/bulk-upload`

List batches

GET

`/api/bulk-upload/:batchId`

Batch detail

PUT

`/api/bulk-upload/:batchId`

Update batch items

DELETE

`/api/bulk-upload/:batchId`

Delete batch

POST

`/api/register`

Register user (Next.js)

GET/POST

`/api/auth/*`

NextAuth endpoints (Next.js)

---

*Generated from project source code. Backend server: Express.js on port 3001. Frontend: Next.js on port 3000.*