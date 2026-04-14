// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const accountValidate = require('../utilities/account-validation')

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process the registration data
router.post(
  "/register",
  accountValidate.registationRules(),
  accountValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)
// Process the login attempt
router.post(
  "/login",
  accountValidate.loginRules(),
  accountValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route to build the account management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Route to build the update account view
router.get("/update/:account_id", utilities.handleErrors(accountController.updateAccountView))

// Proccess to attempt to update the account information
router.post(
  "/update-information/",
  utilities.handleErrors(accountController.updateAccountInformation)
)

// Process to attempt to update the account password
router.post(
  "/change-password/",
  utilities.handleErrors(accountController.updateAccountPassword)
)

// Process to Logout
router.get("/logout", utilities.logoutProcess)

module.exports = router;