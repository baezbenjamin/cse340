const pool = require("../database")

/* ***************************
 *  Get all anouncements data
 * ************************** */
async function getAnnouncement() {
    try {
        const data = await pool.query(
            `SELECT * FROM public.announcement as i
            JOIN public.account AS c
            ON i.account_id = c.account_id`)
        return data.rows
        console.log("Hello")
    } catch (error) {
        console.error("getannoucement error " + error)
    }
}

module.exports = {getAnnouncement}