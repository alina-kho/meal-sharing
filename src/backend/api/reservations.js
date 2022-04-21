const express = require("express");
const router = express.Router();
const knex = require("../database");
const { parse } = require("path");

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservations").select("*");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const reservation = {
      number_of_guests: request.body.numberOfGuests,
      meal_id: request.body.mealId,
      contact_phonenumber: request.body.contactPhonenumber,
      contact_name: request.body.contactName,
      contact_email: request.body.contactEmail,
      created_date: new Date(),
    };
    const newReservation = await knex("reservations").insert(reservation);
    response.json(newReservation);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const reservation = await knex("reservations").where({ id });
    response.json(reservation);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const updatedReservation = await knex("reservations")
      .where({ id })
      .update(request.body);
    response.json(updatedReservation);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deletedReservation = await knex("reservations").where({ id }).del();
    response.json(deletedReservation);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
