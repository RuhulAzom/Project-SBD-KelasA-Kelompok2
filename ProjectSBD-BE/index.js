const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")
const { PrismaClient } = require("prisma/prisma-client");
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Berhasil mencapai server"
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})

const Staff = require("./routes/staff.route")
const Layanan_Detail = require("./routes/layanan_detail.route")
const Layanan = require("./routes/layanan.route")
const Customer = require("./routes/customer.route")
const Transaksi = require("./routes/transaksi.route")

app.use(Staff)
app.use(Layanan_Detail)
app.use(Layanan)
app.use(Customer)
app.use(Transaksi)

app.get("/info", async (req, res) => {
    try {
        const transaksi = await prisma.transaksi.findMany({
            select: {
                transaksi_detail: true
            }
        })
        const totalCustomer = await prisma.customer.count()
        const totalStaff = await prisma.staff.count()
        let totalPendapatan = 0;
        transaksi.forEach((item) => {
            item.transaksi_detail.forEach((item) => {
                totalPendapatan = totalPendapatan + (item.total_harga)
            })
        })
        return res.status(200).json({
            status: 200,
            data: {
                totalTransaksi: transaksi.length,
                totalCustomer,
                totalStaff,
                totalPendapatan
            }
        })
    } catch (error) {
        console.log("Error In Info:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})

app.post("/account", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10)
        const data = await prisma.account.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })
        if (!data) {
            return res.status(400).json({
                status: 400,
                message: "Failed Make Account"
            })
        }
        return res.status(200).json({
            status: 200,
            data
        })
    } catch (error) {
        console.log("Error In Info:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const account = await prisma.$queryRaw`
            SELECT * FROM \`Account\` WHERE BINARY username = ${username} LIMIT 1
        `;
        const data = account[0]
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Account Not Found!!"
            })
        }
        const checkPassword = bcrypt.compareSync(password, data.password)
        if (checkPassword) {
            const token = jwt.sign({ ...data, password: "-" }, 'shhhhh', { expiresIn: "24h" });
            return res.status(200).json({
                status: 200,
                data,
                token
            })
        } else {
            return res.status(400).json({
                status: 400,
                message: "Your Passsword is Wrong"
            })
        }
    } catch (error) {
        console.log("Error In Info:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
})
app.get("/check-token/:token", async (req, res) => {
    try {
        const token = jwt.verify(`${req.params.token}`, "shhhhh")
        return res.status(200).json({
            status: 200,
            message: "Token Valid",
            data: token
        })
    } catch (error) {
        console.log("Error In Info:", error);
        return res.status(400).json({
            status: 400,
            message: "Token Not Validated",
            error
        })
    }
})



app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
