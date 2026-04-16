const announcementModel = require("../models/announcement-model")
const utilities = require("../utilities")

const announcementCont = {}

announcementCont.buildAnnouncements = async function (req, res, next) {
    let data = await announcementModel.getAnnouncement()
    const grid = await utilities.buildAnnouncementGrid(data)
    let nav = await utilities.getNav()
    res.render("./announcement/announcements", {
        title: "Announcements",
        nav,
        grid,
        errors: null
    })

}

module.exports = announcementCont