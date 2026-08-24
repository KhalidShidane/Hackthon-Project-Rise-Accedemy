const Contract = require("../Model/ContractScheme");
const createCrudController = require("./crudController");
const controller = createCrudController(Contract, "Contract");

module.exports = { ...controller, deleteContract: controller.deleteItem };
