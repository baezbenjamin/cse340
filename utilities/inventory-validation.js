const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* **********************************
 * Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 2 })
            .isAlpha()
            .withMessage("Provide a correct classification name.")        
    ]
}

/* ******************************
 * Check classification data and return errors or continue
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}

/* **********************************
 * Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        body("classification_id")
            .notEmpty()
            .withMessage("Choose a Classification."),  

        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Provide a correct Make name."),

        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Provide a correct Model name."),

        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 4, max: 4 })
            .withMessage("Provide a correct Year."),

        body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Provide a Description."),
        
        body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Provide an Image Path."),
        
        body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Provide a Thumbnail Path."),
        
        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage("Provide a correct Price."),
        
        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .isNumeric({ no_symbols: true })
            .withMessage("Provide a correct Miles number."),
        
        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("The vehicle's color is required."),

    ]
}

/* ******************************
 * Check inventory data and return errors or continue
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { classification_id, classification_name, inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationlist = await utilities.buildClassificationList(classification_id || null)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add Inventory",
            nav,
            classificationlist,
            classification_name,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_price,
            inv_miles,
            inv_color
        })
        return
    }
    next()
}

module.exports = validate