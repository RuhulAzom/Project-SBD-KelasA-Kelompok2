const prisma = require("../database/index")

exports.AddLayanan = async (req, res) => {
    try {
        const { layanan, } = req.body;
        const checkLayanan = await prisma.layanan.findFirst({
            where: {
                layanan,
            }
        })
        if (checkLayanan) {
            return res.status(400).json({
                status: 400,
                message: "Layanan is exisiting"
            })
        }

        const data = await prisma.layanan.create({
            data: {
                layanan,
            }
        })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully add Layanan",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed add Layanan"
        })
    } catch (error) {
        console.log("Error in listPricing GetAllItems:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.GetLayanan = async (req, res) => {
    try {
        const data = await prisma.layanan.findMany()

        if (data.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Layanan not found!"
            })
        }
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Layanan",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed get Layanan"
        })
    } catch (error) {
        console.log("Error in listPricing GetAllItems:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.DeleteLayanan = async (req, res) => {
    try {
        const { id } = req.query
        const checkLayanan = await prisma.layanan.findFirst({
            where: {
                id_layanan: id
            }
        })
        if (!checkLayanan) {
            return res.status(404).json({
                status: 404,
                message: "Layanan not found"
            })
        }
        const data = await prisma.layanan.delete({
            where: {
                id_layanan: id
            }
        })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully delete Layanan",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed delete Layanan"
        })
    } catch (error) {
        console.log("Error in Delete Layanan:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}