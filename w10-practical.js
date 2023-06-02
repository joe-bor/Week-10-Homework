require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const Item = require("./models/item");

const app = express();

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

//-----------------------------------
// ROUTES
//-----------------------------------
app.get("/", (req, res) => {
  res.send(`
  This is the root path of items api <br/>
  <br/>
  Interact with: <br/>
  <br/>

GET '/items' - Retrieves all the items from the database in JSON format <br/>
POST '/items' - To create a new item, body MUST contain { "name": <stringValue>, "price": <integerValue> } <br/>

GET '/items/:id' - To retrieve an item with the given id <br/>
PUT '/items/:id/ - To update an item with said id, body MUST include { "name": <stringValue>, "price": <integerValue> } <br/>
DELETE '/items/:id' - To retrieve said item with id, from the database, and delete it.
`);
});

//Index
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//Create
app.post("/items", async (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(403).send({
      message:
        "ERROR: Invalid Input, name property must be a string && price should be an int",
    });
  }
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//Show
app.get("/items/:id", async (req, res) => {
  try {
    const foundItem = await Item.findById(req.params.id);
    if (!foundItem) {
      return res
        .status(422)
        .send({ message: `ERROR: Item with id ${req.params.id} not found` });
    }
    res.json(foundItem);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//Update
app.put("/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    //These were broken into two parts to ensure the updated 'Item' is returned
    const foundItem = await Item.findById(req.params.id);
    if (!foundItem) {
      return res
        .status(422)
        .send({ message: `ERROR: Item with id ${req.params.id} not found` });
    }
    res.json(foundItem);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//Delete
app.delete("/items/:id", async (req, res) => {
  try {
    const foundItem = await Item.findByIdAndDelete(req.params.id);
    if (!foundItem) {
      return res
        .status(422)
        .send({ message: `ERROR: Item with id ${req.params.id} not found` });
    }
    res.json(foundItem);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//----------------------
// End of Routes
//-----------------------
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
