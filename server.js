const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");

// GETTING OUR STRIPE SECRET KEY FOR THE DOTENV FILE
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// INTANTIATING OUR STRIPE LIBARY CALLING THE STRIPE SECRET KEY
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// SENDING OUR STATIC FILE WHEN APP IS HOSTED
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, error => {
  if (error) throw error;

  console.log("server running on port" + port);
});

// HANDLING STRIPE PAYMENT
app.post("/payment", (req, res) => {
  // GETTING THE BODY FOR THE STRIPE CHARGES FROM THE REQ OBJECT FROM THE FRONTEND
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd"
  };

  // MAKING STRIPE PAYMENTS WITH THE BODY (ABOVE), AND RESPONDING WITH ERROR OR RESPONSE FROM STRIPE
  stripe.charges.create(body, (stripeError, stripeResponse) => {
    if (stripeError) {
      res.status(500).send({ error: stripeError });
    } else {
      res.status(200).send({ success: stripeResponse });
    }
  });
});
