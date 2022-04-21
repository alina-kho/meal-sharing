const express = require("express");
const router = express.Router();
const knex = require("../database");
const { parse } = require("path");

router.get("/", async (request, response) => {
  try {
    const reviews = await knex("reviews").select("*");
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const review = {
      title: request.body.title,
      description: request.body.description,
      meal_id: request.body.mealId,
      stars: request.body.stars,
      created_date: new Date(),
    };
    const newReview = await knex("reviews").insert(review);
    response.json(newReview);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const review = await knex("reviews").where({ id });
    response.json(review);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const updatedReview = await knex("reviews")
      .where({ id })
      .update(request.body);
    response.json(updatedReview);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deletedReview = await knex("reviews").where({ id }).del();
    response.json(deletedReview);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
