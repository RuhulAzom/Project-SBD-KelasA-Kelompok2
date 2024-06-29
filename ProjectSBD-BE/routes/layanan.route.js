const router = require("express").Router()
const Layanan = require("../controller/layanan.controller")


router.get("/layanan", Layanan.GetLayanan)
router.post("/layanan/add", Layanan.AddLayanan)
router.delete("/layanan/delete", Layanan.DeleteLayanan)

module.exports = router