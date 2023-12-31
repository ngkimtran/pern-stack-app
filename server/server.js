import dotenv from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import { client } from "./db/index.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(json());

app.get("/api/v1/restaurants", async (_req, res) => {
  try {
    const results = await client.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
    );

    res.status(200).json({
      status: "Success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // to avoid sql injection vulnerabilities
    const restaurants = await client.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id=$1",
      [req.params.id]
    );

    const reviews = await client.query(
      "SELECT * FROM reviews WHERE restaurant_id=$1",
      [req.params.id]
    );

    res.status(200).json({
      status: "Success",
      data: {
        restaurant: restaurants.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await client.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await client.query(
      "UPDATE restaurants SET name=$2, location=$3, price_range=$4 WHERE id=$1 RETURNING *;",
      [req.params.id, req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await client.query("DELETE FROM restaurants WHERE id=$1;", [
      req.params.id,
    ]);

    res.status(204).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const results = await client.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    res.status(201).json({
      status: "Success",
      data: {
        reviews: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server up and listening on port ${port}`);
});
