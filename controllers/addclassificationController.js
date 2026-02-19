const addClassificationModel = require("../models/addClassification-model")
const utilities = require("../utilities")

const classificationCont = {}

classificationCont.addClassification = async function (req, res) {
    const { classification_name } = req.body
    
    const addResult = await addClassificationModel.addClassification(classification_name)

    if (addResult) {
        req.flash(
            "notice",
            "The new car classification was succesfully added."
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

classificationCont.buildAddClassView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

module.exports = classificationCont