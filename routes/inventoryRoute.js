// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build detail by vehicle view
router.get("/detail/:vehicleId", utilities.handleErrors(invController.buildByVehicleId));

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassView))

// Route to process the addition of a new classification
router.post(
    "/add-classification",
    invValidate.classificationRules(),
    invValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification));

// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInvView))

// Route to process the addition of a new inventory
router.post(
    "/add-inventory",
    invValidate.inventoryRules(),
    invValidate.checkInventoryData,
    utilities.handleErrors(invController.addInventory));

module.exports = router;