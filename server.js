const express = require('express');

// we'll use morgan to log the HTTP layer
const morgan = require('morgan');

// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const {ShoppingList, Recipes } = require('./models');


const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

const ingredients = [
  { main:"pasta", veggies:["tomatoe", "garlic", "onion", "spinach"], spice:["oregano","salt","cloves"], cheese:"Parmesan" },
  { main:"trout", veggies:["eggs", "dill", "onion"], spice:["kosher salt","pepper"], fruit:["lemon wedges", "almonds"], bread: "bread-crumbs" },
  { main:"ziti",  veggies:["spinach", "garlic", "onion", "carrots"], spice:["salt","pepper"], cheese:"Gorgonzola" }
]

// we're going to add some items to ShoppingList & Recipes
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database, really its resources!

ShoppingList.create(ingredients[0].main, 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

Recipes.create('mac and cheese', ingredients[0]);
Recipes.create('freshest trout', ingredients[1]);
Recipes.create('ziti fresco', ingredients[2]);

// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/shopping-list', (req, res) => {

  // console.log(req); // checkout the request object in console!
  // console.log(req.route); // checkout the request object in console!
  // console.log(req.route.path);  // returns the path: /shopping-list

  // res.send(JSON.stringify( ShoppingList.get()) ); // node way
  res.json(ShoppingList.get()); // express way
  
});

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
