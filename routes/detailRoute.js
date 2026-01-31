// Needed Resources 
const express = require("express")
const router = new express.Router() 
const detailController = require("../controllers/detailController")

// Route to build detail by vehicle view
router.get("/detail/:vehicleId", detailController.buildByVehicleId);

module.exports = router;