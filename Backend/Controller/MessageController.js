const Message = require("../Model/MessageScheme");
const createCrudController = require("./crudController");
const controller = createCrudController(Message, "Message");

module.exports = { ...controller, deleteMessage: controller.deleteItem };
