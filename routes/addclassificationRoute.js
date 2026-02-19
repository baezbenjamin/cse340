// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const addclassificationController = require("../controllers/addclassificationController")

router.get("/add-classification", utilities.handleErrors(addclassificationController.buildAddClassView))

router.post("/add-classification", utilities.handleErrors(addclassificationController.addClassification));

module.exports = router;