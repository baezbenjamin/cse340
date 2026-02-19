// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const addinventoryController = require("../controllers/addinventoryController")

router.get("/add-inventory", utilities.handleErrors(addinventoryController.buildAddInvView))

router.post("/add-inventory", utilities.handleErrors(addinventoryController.addInventory));

module.exports = router;