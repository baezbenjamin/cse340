// const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
// const othercode = require("../public/js/inventory")

const managementCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
managementCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()
  // const classificationSelect = await utilities.buildClassificationList()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    // classificationSelect,
  })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
managementCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

  module.exports = managementCont