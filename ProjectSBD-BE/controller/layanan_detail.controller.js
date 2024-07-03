const prisma = require("../database/index")


exports.GetLayananDetail = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        if (page) {
            const data = await prisma.layanan_Detail.findMany({
                take: limit,
                skip,
                orderBy: {
                    createAt: "desc"
                },
                include: {
                    layanan: {
                        select: {
                            layanan: true
                        }
                    }
                }
            })
            if (data.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Layanan Detail not found!"
                })
            }
            const totalItems = await prisma.layanan_Detail.count()
            const totalPages = Math.ceil(totalItems / limit)
            const sendData = data.map((item) => {
                return {
                    id: item.id,
                    id_layanan: item.id_layanan,
                    layanan_detail: item.layanan_detail,
                    harga: item.harga,
                    layanan: item.layanan.layanan,
                    createAt: item.createAt,
                    updateAt: item.updateAt
                }
            })
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Layanan Detail",
                data: sendData,
                currentPage: page,
                totalPages
            })
        }
        const data = await prisma.layanan_Detail.findMany({
            include: {
                layanan: {
                    select: {
                        layanan: true
                    }
                }
            }
        })
        if (data.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Layanan Detail not found!"
            })
        }
        const sendData = data.map((item) => {
            return {
                id: item.id,
                id_layanan: item.id_layanan,
                layanan_detail: item.layanan_detail,
                harga: item.harga,
                layanan: item.layanan.layanan,
                createAt: item.createAt,
                updateAt: item.updateAt
            }
        })
        return res.status(200).json({
            status: 200,
            message: "Succesfully get Layanan Detail",
            data: sendData
        })
    } catch (error) {
        console.log("Error in Get Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.GetInfo = async (req, res) => {
    try {
        let sendData = []
        sendData = await prisma.layanan_Detail.findMany({
            select: {
                id: true,
                layanan_detail: true,
                layanan: {
                    select: {
                        layanan: true
                    }
                },
                Transaksi_Detail: {
                    select: {
                        nota: true,
                        total_harga: true,
                        transaksi: {
                            select: {
                                nota: true,
                                tanggal_keluar: true
                            }
                        }
                    }
                }
            }
        })
        if (sendData.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Layanan Detail not found!"
            })
        }
        sendData.forEach((item) => {
            let total = 0;
            let proses = 0
            let notaIds = []
            item.Transaksi_Detail.forEach((item2) => {
                notaIds = [...notaIds, item2.transaksi.nota]
                total = total + item2.total_harga;
                if (!item2.transaksi.tanggal_keluar) {
                    proses = proses + 1;
                }
            })
            const notaList = [...new Set(notaIds)]
            item.total_pendapatan = total
            item.proses = proses
            item.transaksi = notaList.length
        })
        return res.status(200).json({
            status: 200,
            message: "Succesfully get Layanan Detail",
            data: sendData.map((item) => {
                return {
                    layanan_detail: item.layanan_detail,
                    layanan: item.layanan.layanan === "HELAIAN" ? "Helaian" : item.layanan.layanan === "KILOAN" ? "Kiloan" : item.layanan.layanan,
                    total_pendapatan: item.total_pendapatan,
                    proses: item.proses,
                    transaksi: item.transaksi
                }
            })
        })
    } catch (error) {
        console.log("Error in Get Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.GetSearchLayananDetailByName = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        const nama = req.query.nama;

        if (page) {
            const data = await prisma.layanan_Detail.findMany({
                take: limit,
                skip,
                where: {
                    layanan_detail: {
                        contains: nama,
                    }
                }
            })

            if (data.length > 0) {

                const totalItems = await prisma.layanan_Detail.count({
                    where: {
                        layanan_detail: {
                            contains: nama,
                        }
                    }
                })
                console.log(totalItems)
                const totalPages = Math.ceil(totalItems / limit)

                return res.status(200).json({
                    status: 200,
                    message: "Berhasil Search Layanan Detail",
                    data,
                    currentPage: page,
                    totalPages
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    message: "Layanan Detail tidak ditemukan",
                })
            }
        }
        const data = await prisma.layanan_Detail.findMany({
            where: {
                layanan_detail: {
                    contains: nama,
                }
            }
        })

        if (data.length > 0) {
            return res.status(200).json({
                status: 200,
                message: "Berhasil Search Layanan Detail",
                data
            })
        } else {
            return res.status(404).json({
                status: 404,
                message: "Layanan Detail tidak ditemukan",
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

exports.AddLayananDetail = async (req, res) => {
    try {
        const { id_layanan, layanan_detail, harga, kiloan } = req.body;

        const layanan = await prisma.layanan.findUnique({
            where: { id_layanan }
        });
        if (!layanan) {
            return res.status(400).json({ error: "Layanan dengan id_layanan tersebut tidak ditemukan." });
        }
        if (kiloan) {
            const addData = await prisma.layanan_Detail.create({
                data: {
                    id_layanan,
                    layanan_detail,
                    harga,
                    kiloan
                }
            })
            if (addData) {
                return res.status(200).json({
                    status: 200,
                    message: "Succesfully add Layanan Detail",
                    data: addData
                })
            }
            return res.status(300).json({
                status: 300,
                message: "Failed add Layanan Detail"
            })
        }

        const addData = await prisma.layanan_Detail.create({
            data: {
                id_layanan,
                layanan_detail,
                harga
            }
        })
        if (addData) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully add Layanan Detail",
                data: addData
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed add Layanan Detail"
        })
    } catch (error) {
        console.log("Error in Add Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
exports.EditLayananDetail = async (req, res) => {
    try {
        const { id, layanan_detail, harga } = req.body;

        const layanan = await prisma.layanan_Detail.update({
            where: { id },
            data: {
                layanan_detail,
                harga
            }
        });
        if (!layanan) {
            return res.status(400).json({ message: "Failed to Edit Layanan Detail" });
        }
        if (layanan) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully Edit Layanan Detail",
                data: layanan
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed Edit Layanan Detail"
        })
    } catch (error) {
        console.log("Error in Edit Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.DeleteLayananDetail = async (req, res) => {
    try {
        const { id } = req.query
        const checkLayananDetail = await prisma.layanan_Detail.findFirst({
            where: {
                id
            }
        })
        if (!checkLayananDetail) {
            return res.status(404).json({
                status: 404,
                message: "Layanan Detail not found"
            })
        }
        const data = await prisma.layanan_Detail.delete({
            where: {
                id
            }
        })
        if (data) {
            return res.status(200).json({
                status: 200,
                message: "Succesfully delete Layanan Detail",
                data
            })
        }
        return res.status(300).json({
            status: 300,
            message: "Failed delete Layanan Detail"
        })
    } catch (error) {
        console.log("Error in Delete Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
