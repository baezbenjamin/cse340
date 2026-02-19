// Needed Resources
const express = require("express");
const managementCont = require("../controllers/managementController");
const router = new express.Router()
const utilities = require("../utilities")

// Route to build management view
router.get("/", utilities.handleErrors(managementCont.buildManagementView));

router.get("/getInventory/:classification_id",
    // utilities.checkAccountType,
    utilities.handleErrors(managementCont.getInventoryJSON));

module.exports = router;