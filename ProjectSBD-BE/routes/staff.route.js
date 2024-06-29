const router = require("express").Router()
const Staff = require("../controller/staff.controller")


router.get("/staff", Staff.GetStaff)
router.get("/staff/search", Staff.GetSearchStaff)
router.post("/staff/add", Staff.AddStaff)
router.put("/staff/edit", Staff.EditStaff)
router.delete("/staff/delete", Staff.DeleteStaff)

module.exports = router