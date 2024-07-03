const { query } = require("express");
const prisma = require("../database");

exports.AddCustomer = async (req, res) => {
    try {
        const { nama, alamat, telp } = req.body;

        const data = await prisma.customer.create({ data: { nama, alamat, telp } })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully add Customer",
                data: data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed add Customer"
        })
    } catch (error) {
        console.log("Error in Add Customer:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
exports.EditCustomer = async (req, res) => {
    try {
        const { id, nama, alamat, telp } = req.body;

        const data = await prisma.customer.update({ where: { id }, data: { nama, alamat, telp } })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully Edit Customer",
                data: data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed Edit Customer"
        })
    } catch (error) {
        console.log("Error in Edit Customer:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.GetCustomer = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        if (page) {
            const data = await prisma.customer.findMany({
                take: limit,
                skip,
                orderBy: {
                    createAt: "desc"
                }
            })
            const totalItems = await prisma.customer.count()
            const totalPages = Math.ceil(totalItems / limit)

            if (data.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Customer not found!",
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Customer",
                data,
                currentPage: page,
                totalPages
            })
        }

        const data = await prisma.customer.findMany({
            orderBy: {
                createAt: "desc"
            }
        })
        if (data.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Customer not found!",
                data
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Succesfully get Customer",
            data
        })
    } catch (error) {
        console.log("Error in Get Customer:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.DeleteCustomer = async (req, res) => {
    try {
        const { id } = req.query
        const checkType = await prisma.customer.findFirst({ where: { id } })
        if (!checkType) {
            return res.status(404).json({
                status: 404,
                message: "Customer not found"
            })
        }
        const data = await prisma.customer.delete({ where: { id } })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully delete Customer",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed delete Customer"
        })
    } catch (error) {
        console.log("Error in Customer Delete:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.GetSearchCustomer = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        const nama = req.query.nama;
        const telp = req.query.telp;
        const alamat = req.query.alamat;

        if (page) {
            let data = [];
            let totalItems = 0;
            if (nama) {
                data = await prisma.customer.findMany({
                    take: limit,
                    skip,
                    where: {
                        nama: {
                            contains: nama,
                        }
                    }
                })
                totalItems = await prisma.customer.count({
                    where: {
                        nama: {
                            contains: nama,
                        }
                    }
                })
            }
            else if (telp) {
                data = await prisma.customer.findMany({
                    take: limit,
                    skip,
                    where: {
                        telp: {
                            contains: telp,
                        }
                    }
                })
                totalItems = await prisma.customer.count({
                    where: {
                        telp: {
                            contains: telp,
                        }
                    }
                })
            }
            else if (alamat) {
                data = await prisma.customer.findMany({
                    take: limit,
                    skip,
                    where: {
                        alamat: {
                            contains: alamat,
                        }
                    }
                })
                totalItems = await prisma.customer.count({
                    where: {
                        alamat: {
                            contains: alamat,
                        }
                    }
                })
            }
            if (data.length > 0) {
                const totalPages = Math.ceil(totalItems / limit)

                return res.status(200).json({
                    status: 200,
                    message: "Berhasil Search Customer",
                    data,
                    currentPage: page,
                    totalPages
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Customer tidak ditemukan",
                })
            }
        }
        let data = []
        if (nama) {
            data = await prisma.customer.findMany({
                where: {
                    nama: {
                        contains: nama,
                    }
                }
            })
        }
        else if (telp) {
            data = await prisma.customer.findMany({
                where: {
                    telp: {
                        contains: telp,
                    }
                }
            })
        }
        else if (alamat) {
            data = await prisma.customer.findMany({
                where: {
                    alamat: {
                        contains: alamat,
                    }
                }
            })
        }

        if (data.length > 0) {
            return res.status(200).json({
                status: 200,
                message: "Berhasil Search Customer",
                data
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: "Customer tidak ditemukan",
            })
        }
    } catch (error) {
        console.log("Kumpul Anggota Kelompok Controller Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}