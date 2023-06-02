# **Items REST API**

## Description

This is a simple RESTful API that interacts with MongoDB to retrieve and store data about the items.

---

## Interact

To use the API, send HTTP Requests to the following endpoints using a tool like cURL, Postman, Insomnia.

### Root Path

- GET '/'
  - Returns A simple instruction on how to interact with the endpoints

### Index

- GET '/items'
  - Retrieves all the items from the database
  - Returns a list in JSON format

### Create

- POST '/items'
  - Creates a new item
  - Format:

```
// Request body

{
  "name": "item-name",
  "price": 10
}
```

### Show

- GET '/items/:id'
  - Retrieves a specific item by it's id from the database
  - Returns the item in JSON format

### Update

- PUT '/items/:id/
  - Retrieves a specific item by it's id form the database
  - Changes it's properties

```
// Request Body
{
  "name": "item-name",
  "price": 10
}
```

### Delete

- DELETE '/items/:id'
  - Retrieves a specific item by it's id and deletes it
  - Returns the deleted item in JSON format
