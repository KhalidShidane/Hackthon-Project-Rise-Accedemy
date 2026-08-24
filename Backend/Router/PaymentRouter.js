const express = require("express");

const Router = express.Router();

const PaymentController = require("../Controller/PaymentController");

// CREATE PAYMENT
Router.post("/", PaymentController.create);

// GET ALL PAYMENTS
Router.get("/", PaymentController.read);

// GET SINGLE PAYMENT
Router.get("/:id", PaymentController.getsingle);

// UPDATE PAYMENT
Router.put("/:id", PaymentController.update);

// DELETE PAYMENT
Router.delete("/:id", PaymentController.deletePayment);

module.exports = Router;