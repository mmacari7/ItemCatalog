// Michael Macari

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");

const exphbs = require("express-handlebars");

const Handlebars = require("handlebars");

const handlebarsInstance = exphbs.create({
  defaultLayout: false,
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }

});

// Public assets
app.use("/public", static);

// Images sit here at root
app.use(express.static(__dirname + "/assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");


configRoutes(app);

app.listen(3000, () => {
  console.log("Starting the server");
  console.log("Your routes are on http://localhost:3000");
});
