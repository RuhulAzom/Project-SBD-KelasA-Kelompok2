const router = require("express").Router()
const Layanan_Detail = require("../controller/layanan_detail.controller")


router.get("/layanan-detail", Layanan_Detail.GetLayananDetail)
router.get("/layanan-detail/info", Layanan_Detail.GetInfo)
router.get("/layanan-detail/search", Layanan_Detail.GetSearchLayananDetailByName)
router.post("/layanan-detail/add", Layanan_Detail.AddLayananDetail)
router.put("/layanan-detail/edit", Layanan_Detail.EditLayananDetail)
router.delete("/layanan-detail/delete", Layanan_Detail.DeleteLayananDetail)

module.exports = router