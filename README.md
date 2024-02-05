This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Api specs

### Ticket

Get Tickets

- endpoint : /api/tickets
- method : GET
- Authorization :
  - api-key : "required"
  - access-token: "not required"
- Query :
  - page : number
  - size : number
  - search : string
- Response Body :

```json
{
  "statusText": "success",
  "page": 1,
  "size": 10,
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "price": 10000,
      "availability": true,
      "description": "string",
      "imagesUrl": "/images/name-images.jpg",
      "createdAt": 123412314,
      "updatedAt": 123434123,
      "tourismId": "uuid"
    }
  ]
}
```

Store Tickets

- endpoint : /api/tickets
- method : POST
- Authorization :

  - api-key : "required"
  - access-token: "required"

- Request Body :

```json
{
  "id": "uuid",
  "name": "string",
  "price": 100000,
  "availability": true,
  "description": "string",
  "tourismId": "uuid",
  "imagesUrl": "/images/name-images.jpg"
}
```

- Response Body :

```json
{
  "statusText": "success",
  "message": "Ticket success stored"
}
```

Update Tickets

- endpoint : /api/tickets/{id}
- method : PATCH
- Authorization :

  - api-key : "required"
  - access-token: "required"

- Params:
  - id : uuid
- Request Body :

```json
{
  "id": "uuid",
  "name": "string",
  "price": 100000,
  "availability": true,
  "description": "string",
  "tourismId": "uuid",
  "imagesUrl": "/images/name-images.jpg"
}
```

- Response Body :

```json
{
  "statusText": "success",
  "message": "Ticket success updated"
}
```

Delete Tickets

- endpoint : /api/tickets/{id}
- method : DELETE
- Authorization :

  - api-key : "required"
  - access-token: "required"

- Params:

  - id : uuid

- Response Body :

```json
{
  "statusText": "success",
  "message": "Ticket success deleted"
}
```

### Tourims
