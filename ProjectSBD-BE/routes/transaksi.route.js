const router = require("express").Router()
const Transaksi = require("../controller/transaksi.controller")


router.get("/transaksi", Transaksi.GetTransaksi)
router.get("/transaksi/filter", Transaksi.GetTransaksiFilter)
router.get("/transaksi/search", Transaksi.SearchTransaksi)
router.get("/transaksi/detail/:nota", Transaksi.GetTransaksiDetailByNota)
router.put("/transaksi", Transaksi.TransactionDone)
router.post("/transaksi/add", Transaksi.AddTransaksi)
router.delete("/transaksi/delete", Transaksi.DeleteTransaksi)

module.exports = router