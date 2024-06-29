const router = require("express").Router()
const Customer = require("../controller/customer.controller")


router.get("/customer", Customer.GetCustomer)
router.post("/customer/add", Customer.AddCustomer)
router.put("/customer/edit", Customer.EditCustomer)
router.delete("/customer/delete", Customer.DeleteCustomer)
router.get("/customer/search", Customer.GetSearchCustomer)

module.exports = router