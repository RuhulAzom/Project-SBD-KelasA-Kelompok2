const prisma = require("../database");

exports.AddStaff = async (req, res) => {
    try {
        const { nama, alamat, telp } = req.body;

        const data = await prisma.staff.create({ data: { nama, alamat, telp } })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully add Staff",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed add Staff"
        })
    } catch (error) {
        console.log("Error in Add Staff:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
exports.EditStaff = async (req, res) => {
    try {
        const { id, nama, alamat, telp } = req.body;

        const data = await prisma.staff.update({ where: { id }, data: { nama, alamat, telp } })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully Edit Staff",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed Edit Staff"
        })
    } catch (error) {
        console.log("Error in Edit Staff:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.GetStaff = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        if (page) {
            const data = await prisma.staff.findMany({
                take: limit,
                skip
            })
            const totalItems = await prisma.staff.count()
            const totalPages = Math.ceil(totalItems / limit)

            if (data.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Staff not found!",
                })
            }
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Staff",
                data,
                currentPage: page,
                totalPages
            })
        }

        const data = await prisma.staff.findMany()
        if (data.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Staff not found!",
                data
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Succesfully get Staff",
            data
        })
    } catch (error) {
        console.log("Error in Get Staff:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.SearchStaffByName = async (req, res) => {
    try {
        if (!req.query.nama) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully search customer",
                data: []
            })
        }
        const data = await prisma.staff.findMany({
            where: {
                nama: {
                    contains: req.query.nama,
                }
            }
        })

        return res.status(200).json({
            status: 200,
            message: "Succesfully search Staff",
            data
        })

    } catch (error) {
        console.log("Error in Search Customer:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.DeleteStaff = async (req, res) => {
    try {
        const { id } = req.query
        const checkStaff = await prisma.staff.findFirst({ where: { id } })
        if (!checkStaff) {
            return res.status(404).json({
                status: 404,
                message: "Staff not found"
            })
        }
        const data = await prisma.staff.delete({ where: { id } })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully delete Staff",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed delete type pricing"
        })
    } catch (error) {
        console.log("Error in listPricing GetAllItems:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}


exports.GetSearchStaff = async (req, res) => {
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
                data = await prisma.staff.findMany({
                    take: limit,
                    skip,
                    where: {
                        nama: {
                            contains: nama,
                        }
                    }
                })
                totalItems = await prisma.staff.count({
                    where: {
                        nama: {
                            contains: nama,
                        }
                    }
                })
            }
            else if (telp) {
                data = await prisma.staff.findMany({
                    take: limit,
                    skip,
                    where: {
                        telp: {
                            contains: telp,
                        }
                    }
                })
                totalItems = await prisma.staff.count({
                    where: {
                        telp: {
                            contains: telp,
                        }
                    }
                })
            }
            else if (alamat) {
                data = await prisma.staff.findMany({
                    take: limit,
                    skip,
                    where: {
                        alamat: {
                            contains: alamat,
                        }
                    }
                })
                totalItems = await prisma.staff.count({
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
                    message: "Berhasil Search Staff",
                    data,
                    currentPage: page,
                    totalPages
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Staff tidak ditemukan",
                })
            }
        }
        let data = []
        if (nama) {
            data = await prisma.staff.findMany({
                where: {
                    nama: {
                        contains: nama,
                    }
                }
            })
        }
        else if (telp) {
            data = await prisma.staff.findMany({
                where: {
                    telp: {
                        contains: telp,
                    }
                }
            })
        }
        else if (alamat) {
            data = await prisma.staff.findMany({
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
                message: "Berhasil Search Staff",
                data
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: "Staff tidak ditemukan",
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
