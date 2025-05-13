# Users
# /register Endpoint Documentation

## Description

The `/register` endpoint is used to register a new user in the system. It accepts user details such as their name, email, and password, validates the input, and creates a new user in the database. Upon successful registration, a JSON Web Token (JWT) is returned for authentication.

---

## HTTP Method

**POST**

---

## Request Body

The following fields are required in the request body:

| Field                | Type   | Required | Validation                                       |
| -------------------- | ------ | -------- | ------------------------------------------------ |
| `fullname.firstname` | String | Yes      | Must be at least 3 characters long.              |
| `fullname.lastname`  | String | No       | If provided, must be at least 3 characters long. |
| `email`              | String | Yes      | Must be a valid email address.                   |
| `password`           | String | Yes      | Must be at least 6 characters long.              |

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Response

### Success Response

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "609b8f1b8f1b8f1b8f1b8f1b",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Error Responses

#### Validation Errors

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "First Name should have atleast 3 characters",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

#### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required"
      }
    ]
  }
  ```

---

## Notes

- The password is hashed before being stored in the database.
- The `token` returned in the response can be used for subsequent authenticated requests.
- Ensure the `Content-Type` header is set to `application/json` when making the request.

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}'
```

# /login Endpoint Documentation

## Description

The `/login` endpoint is used to authenticate an existing user. It accepts the user's email and password, validates the input, and if the credentials are correct, returns a JSON Web Token (JWT) for authenticated access.

---

## HTTP Method

**POST**

---

## Request Body

The following fields are required in the request body:

| Field      | Type   | Required | Validation                          |
| ---------- | ------ | -------- | ----------------------------------- |
| `email`    | String | Yes      | Must be a valid email address.      |
| `password` | String | Yes      | Must be at least 6 characters long. |

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Response

### Success Response

* **Status Code:** `200 OK`
* **Body:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "609b8f1b8f1b8f1b8f1b8f1b",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Error Responses

#### Validation Errors

* **Status Code:** `400 Bad Request`
* **Body:**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

#### Invalid Credentials

* **Status Code:** `401 Unauthorized`
* **Body:**

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Notes

* The password is compared securely using a hashed check.
* A valid JWT is returned upon successful login for authenticated requests.
* Ensure the `Content-Type` header is set to `application/json` when making the request.

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "securepassword"
}'
```


# /profile Endpoint Documentation

## Description

The `/profile` endpoint is used to retrieve the authenticated user's profile information. It requires a valid JSON Web Token (JWT) to access and returns the user's data stored in the system.

---

## HTTP Method

**GET**

---

## Authentication

This endpoint **requires** authentication via JWT. The token must be provided either:

* In a `Cookie` named `token`, or
* In the `Authorization` header as a Bearer token.

---

## Request Headers

| Header Name     | Required                  | Description                   |
| --------------- | ------------------------- | ----------------------------- |
| `Authorization` | Yes (if not using cookie) | Format: `Bearer <token>`      |
| `Cookie`        | Yes (if not using header) | Cookie named `token` with JWT |

---

## Response

### Success Response

* **Status Code:** `200 OK`
* **Body:**

  ```json
  {
    "_id": "609b8f1b8f1b8f1b8f1b8f1b",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

### Error Responses

#### Unauthorized Access

* **Status Code:** `401 Unauthorized`
* **Body:**

  ```json
  {
    "message": "Access Denied. No token provided."
  }
  ```

---

## Example cURL Request

```bash
curl -X GET http://localhost:3000/profile \
-H "Authorization: Bearer <your_jwt_token>"
```

---

# /logout Endpoint Documentation

## Description

The `/logout` endpoint is used to log out an authenticated user by clearing their JWT cookie and blacklisting the token to prevent further use. It ensures the token cannot be reused for future requests.

---

## HTTP Method

**GET**

---

## Authentication

This endpoint **requires** authentication via JWT. The token must be provided either:

* In a `Cookie` named `token`, or
* In the `Authorization` header as a Bearer token.

---

## Request Headers

| Header Name     | Required                  | Description                   |
| --------------- | ------------------------- | ----------------------------- |
| `Authorization` | Yes (if not using cookie) | Format: `Bearer <token>`      |
| `Cookie`        | Yes (if not using header) | Cookie named `token` with JWT |

---

## Response

### Success Response

* **Status Code:** `200 OK`
* **Body:**

  ```json
  {
    "message": "Logged Out"
  }
  ```

---

## Notes

* The endpoint clears the `token` cookie from the client.
* It also saves the token to a blacklist, which should be checked in middleware for future protected route access.
* Ensure proper token revocation logic is implemented in the auth middleware.

---

## Example cURL Request

```bash
curl -X GET http://localhost:3000/logout \
-H "Authorization: Bearer <your_jwt_token>"
```
---

# Captains

# /captains/register Endpoint Documentation

## Description

The `/captains/register` endpoint is used to register a new captain in the system. It accepts captain details including name, email, password, and vehicle information. It performs validation on all inputs and creates a new captain in the database. Upon successful registration, a JSON Web Token (JWT) is returned for authentication.

---

## HTTP Method

**POST**

---

## Request Body

The following fields are required in the request body:

| Field                 | Type    | Required | Validation                                       |
| --------------------- | ------- | -------- | ------------------------------------------------ |
| `fullname.firstname`  | String  | Yes      | Must be at least 3 characters long.              |
| `fullname.lastname`   | String  | No       | If provided, must be at least 3 characters long. |
| `email`               | String  | Yes      | Must be a valid email address.                   |
| `password`            | String  | Yes      | Must be at least 6 characters long.              |
| `vehicle.color`       | String  | Yes      | Must be at least 3 characters long.              |
| `vehicle.plate`       | String  | Yes      | Must be at least 3 characters long.              |
| `vehicle.capacity`    | Integer | Yes      | Must be a number greater than or equal to 1.     |
| `vehicle.vehicleType` | String  | Yes      | Must be one of: `car`, `motorcycle`, `auto`.     |

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "red",
    "plate": "KA 01 AB 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Response

### Success Response

* **Status Code:** `201 Created`
* **Body:**

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60c72b2f4f1a4c3d5c3e94a7",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "KA 01 AB 1234",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive"
    }
  }
  ```

### Error Responses

#### Validation Errors

* **Status Code:** `400 Bad Request`
* **Body:**

  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      }
    ]
  }
  ```

#### Captain Already Exists

* **Status Code:** `400 Bad Request`
* **Body:**

  ```json
  {
    "message": "Captain already exist"
  }
  ```

---

## Notes

* The password is hashed before being stored in the database.
* The `token` returned in the response can be used for authenticated requests (e.g., managing rides).
* Ensure the `Content-Type` header is set to `application/json` when making the request.

---

## Example cURL Request

```bash
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "red",
    "plate": "KA 01 AB 1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

---

