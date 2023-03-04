const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
  console.log("Database connection established!");
});

// express has no idea about graphql so whenever any request on /graphql is made graphqlHTTP() is fired as middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Your app is listening on http://localhost:4000/");
});
