const detailModel = require("../models/detail-model")
const utilities = require("../utilities/")

const detailCont = {}

/* ***************************
 *  Build detail by vehicle view
 * ************************** */
detailCont.buildByVehicleId = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId
  const data = await detailModel.getDetailByVehicleId(vehicle_id)
  const grid = await utilities.buildDetailPage(data)
//   console.log(data)  
  let nav = await utilities.getNav()
  const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./detail/detail", {
    title: className,
    nav,
    grid,
  })
}

  module.exports = detailCont