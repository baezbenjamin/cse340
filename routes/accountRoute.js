// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const regValidate = require('../utilities/account-validation')
const logValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  logValidate.loginRules(),
  logValidate.checkLoginData,
  utilities.handleErrors(utilities.handleErrors(accountController.accountLogin))
)

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement));

module.exports = router;
