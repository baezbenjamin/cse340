const addInventoryModel = require("../models/addInventory-model")
const utilities = require("../utilities")

const inventoryCont = {}

inventoryCont.addInventory = async function (req, res) {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    
    const addResult = await addInventoryModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

    if (addResult) {
        req.flash(
            "notice",
            "The new car inventory was succesfully added."
      )
      let nav = await utilities.getNav()
        res.status(201).render("inventory/management", {
            title: "Vehicle Management",
            nav,
        })
    } else {
      req.flash("notice", "Sorry, the process failed.")
      res.status(501).render("inventory/management", {
        title: "Vehicle Management",
        nav,
    })  
    }
}

inventoryCont.buildAddInvView = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationlist = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationlist,
    errors: null,
  })
}

module.exports = inventoryCont