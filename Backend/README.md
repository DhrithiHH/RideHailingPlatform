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
