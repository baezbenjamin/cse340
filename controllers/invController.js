const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null
  })
}

/* ***************************
 *  Build detail by vehicle view
 * ************************** */
invCont.buildByVehicleId = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId
  const data = await invModel.getDetailByVehicleId(vehicle_id)
  const grid = await utilities.buildDetailPage(data)
  let nav = await utilities.getNav()
  const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/detail", {
    title: className,
    nav,
    grid,
    errors: null
  })
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
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
 *  Add a new vehicle classification into the database
 * ************************** */
invCont.addClassification = async function (req, res) {
    const { classification_name } = req.body
    
    const addResult = await invModel.addClassification(classification_name)

    if (addResult) {
        req.flash(
            "notice",
            "The new car classification was succesfully added."
      )
      let nav = await utilities.getNav()
        res.status(201).render("inventory/management", {
          title: "Vehicle Management",
          nav,
          errors: null
        })
    } else {
      req.flash("notice", "Sorry, the process failed.")
      res.status(501).render("inventory/management", {
        title: "Vehicle Management",
        nav,
    })  
    }
}

/* ***************************
 *  Build Add Classification View
 * ************************** */
invCont.buildAddClassView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build Add Inventory View
 * ************************** */
invCont.buildAddInvView = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationlist = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationlist,
    errors: null,
  })
}

/* ***************************
 *  Add a new vehicle inventory into the database
 * ************************** */
invCont.addInventory = async function (req, res) {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    
    const addResult = await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)

    if (addResult) {
        req.flash(
            "notice",
            "The new car inventory was succesfully added."
      )
      let nav = await utilities.getNav()
        res.status(201).render("inventory/management", {
          title: "Vehicle Management",
          nav,
          errors: null
        })
    } else {
      req.flash("notice", "Sorry, the process failed.")
      res.status(501).render("inventory/management", {
        title: "Vehicle Management",
        nav,
    })  
    }
}

module.exports = invCont