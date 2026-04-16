// Needed Resources 
const express = require("express")
const router = new express.Router() 
const announcementController = require("../controllers/announcementController")
const utilities = require("../utilities")

router.get("/", utilities.checkLogin, utilities.handleErrors(announcementController.buildAnnouncements))

module.exports = router;