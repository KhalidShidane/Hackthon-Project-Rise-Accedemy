const Review = require("../Model/ReviewScheme");
const createCrudController = require("./crudController");
const controller = createCrudController(Review, "Review");

module.exports = { ...controller, deleteReview: controller.deleteItem };
