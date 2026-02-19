const utilities = require("../utilities/")

const errorCont = {}

errorCont.buildErrorView = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("errors/error", {
    title: '505 Server Error',
    nav
  })
}

module.exports = errorCont