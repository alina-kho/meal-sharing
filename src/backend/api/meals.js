const express = require("express");
const router = express.Router();
const knex = require("../database");
const { parse } = require("path");

//NOTE: Everything works except for the availableReservations param route when combnining with other params.
//SQL strict mode won't let groupping in this case - help needed :)

router.get("/", async (request, response) => {
  try {
    const maxPrice = request.query.maxPrice;
    const availableReservations = request.query.availableReservations;
    const title = request.query.title;
    const createdAfter = request.query.createdAfter;
    const limit = request.query.limit;
    let results = knex("meals");

    if (Object.keys(request.query).length == 0) {
      let meals = await knex("meals");
      response.json(meals);
    } else {
      let supportedParams = false;

      if (maxPrice) {
        if (!isNaN(parseInt(maxPrice))) {
          supportedParams = true;
          results.select().where("price", "<=", maxPrice);
        } else {
          supportedParams = false;
          response
            .status(400)
            .send("Failed to parse max price. Please check the format.");
          return;
        }
      }

      if (limit) {
        if (!isNaN(parseInt(limit))) {
          supportedParams = true;
          results.limit(parseInt(limit));
        } else {
          response
            .status(400)
            .send("Failed to parse limit value. Please check the format");
          return;
        }
      }

      if (title) {
        supportedParams = true;
        results.where("title", "like", `%${title}%`).select();
      }

      if (createdAfter) {
        if (new Date(createdAfter) != "Invalid Date") {
          supportedParams = true;
          const createdAfterFormatted = new Date(createdAfter);
          results.where("created_date", ">", createdAfterFormatted).select();
        } else {
          response.status(400).send("Failed to parse the date");
          return;
        }
      }

      if (availableReservations) {
        if (availableReservations == "true") {
          supportedParams = true;
          results
            .leftJoin("reservations", "meals.id", "reservations.meal_id")
            .select(
              "meals.id",
              "meals.title",
              "meals.description",
              "meals.location",
              "meals.when",
              "meals.price",
              "meals.max_reservations",
              knex.raw(
                "SUM(IFNULL(number_of_guests,0)) AS `guests_registered`"
              ),
              knex.raw(
                "meals.max_reservations - SUM(IFNULL(number_of_guests,0)) AS `reservations_available`"
              )
            )
            .groupBy("meals.id")
            .where("max_reservations", ">", "number_of_guests")
            .having(
              knex.raw(
                "(meals.max_reservations - SUM(IFNULL(number_of_guests,0)))>0"
              )
            );
        } else {
          response
            .status(400)
            .send(
              "The inserted param is not boolean. Please check the format."
            );
          return;
        }
      }

      if (supportedParams === true) {
        const resultsFinal = await results;
        response.status(200).json(resultsFinal);
      } else {
        response.status(400).send("Inserted params are not supported");
      }
    }
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    //I suggest making a data-model, so there's no issue with data types in  DB and request
    const meal = {
      title: request.body.title,
      description: request.body.description,
      location: request.body.location,
      when: new Date(request.body.when),
      max_reservations: request.body.maxReservations,
      price: request.body.price,
      created_date: new Date(),
    };

    const newMeal = await knex("meals").insert(meal);
    response.json(newMeal);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const meal = await knex("meals").where({ id });
    response.json(meal);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const updatedMeal = await knex("meals").where({ id }).update(request.body);
    response.json(updatedMeal);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deletedMeal = await knex("meals").where({ id }).del();
    response.json(deletedMeal);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
