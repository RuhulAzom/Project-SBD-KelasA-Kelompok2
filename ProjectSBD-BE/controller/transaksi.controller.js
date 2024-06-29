const prisma = require("../database/index")
const { getNota } = require("../utils")


exports.GetTransaksi = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;

        if (page) {
            let transaksi = await prisma.transaksi.findMany({
                take: limit,
                skip,
                include: {
                    customer: true,
                    staff: true,
                    transaksi_detail: true
                },
                orderBy: {
                    tanggal_masuk: "desc"
                }
            })
            if (transaksi.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Transaksi not found!"
                })
            }
            const totalItems = await prisma.transaksi.count()
            const totalPages = Math.ceil(totalItems / limit)
            transaksi.forEach((item) => {
                let total_harga_temp = 0;
                item.transaksi_detail.forEach((item) => {
                    total_harga_temp = total_harga_temp + (item.total_harga)
                })
                item.total_harga = total_harga_temp
            })
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Layanan Detail",
                data: [...transaksi],
                currentPage: page,
                totalPages
            })
        }

        let transaksi = await prisma.transaksi.findMany({
            include: {
                customer: true,
                staff: true,
                transaksi_detail: true
            },
            orderBy: {
                tanggal_masuk: "desc"
            }
        })
        if (transaksi.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Transaksi not found!"
            })
        }
        transaksi.forEach((item) => {
            let total_harga_temp = 0;
            item.transaksi_detail.forEach((item) => {
                total_harga_temp = total_harga_temp + (item.total_harga)
            })
            item.total_harga = total_harga_temp
        })
        return res.status(200).json({
            status: 200,
            message: "Succesfully get Layanan Detail",
            data: [...transaksi]
        })
    } catch (error) {
        console.log("Error in Get Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
exports.GetTransaksiFilter = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        const tanggal_masuk = req.query.tanggal_masuk;
        const tanggal_keluar = req.query.tanggal_keluar;
        const status = req.query.status;

        if (page) {
            if (tanggal_masuk) {
                const startDate = new Date(tanggal_masuk);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 1);

                let transaksi = await prisma.transaksi.findMany({
                    take: limit,
                    skip,
                    where: {
                        tanggal_masuk: {
                            gte: startDate,
                            lt: endDate
                        }
                    },
                    include: {
                        customer: true,
                        staff: true,
                        transaksi_detail: true
                    },
                    orderBy: {
                        tanggal_masuk: "desc"
                    }
                });

                if (transaksi.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "Transaksi not found!"
                    });
                }

                const totalItems = await prisma.transaksi.count({
                    where: {
                        tanggal_masuk: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                });
                const totalPages = Math.ceil(totalItems / limit);

                transaksi.forEach((item) => {
                    let total_harga_temp = 0;
                    item.transaksi_detail.forEach((detail) => {
                        total_harga_temp += detail.total_harga;
                    });
                    item.total_harga = total_harga_temp;
                });

                return res.status(200).json({
                    status: 200,
                    message: "Succesfully get Transaksi Filter Tanggal",
                    data: [...transaksi],
                    currentPage: page,
                    totalPages
                });
            } else if (tanggal_keluar) {
                const startDate = new Date(tanggal_keluar);
                const endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 1);

                let transaksi = await prisma.transaksi.findMany({
                    take: limit,
                    skip,
                    where: {
                        tanggal_keluar: {
                            gte: startDate,
                            lt: endDate
                        }
                    },
                    include: {
                        customer: true,
                        staff: true,
                        transaksi_detail: true
                    },
                    orderBy: {
                        tanggal_masuk: "desc"
                    }
                });

                if (transaksi.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "Transaksi not found!"
                    });
                }

                const totalItems = await prisma.transaksi.count({
                    where: {
                        tanggal_masuk: {
                            gte: startDate,
                            lt: endDate
                        }
                    }
                });
                const totalPages = Math.ceil(totalItems / limit);

                transaksi.forEach((item) => {
                    let total_harga_temp = 0;
                    item.transaksi_detail.forEach((detail) => {
                        total_harga_temp += detail.total_harga;
                    });
                    item.total_harga = total_harga_temp;
                });

                return res.status(200).json({
                    status: 200,
                    message: "Succesfully get Transaksi Filter Tanggal",
                    data: [...transaksi],
                    currentPage: page,
                    totalPages
                });
            } else if (status) {
                if (status === "selesai") {
                    let transaksi = await prisma.transaksi.findMany({
                        take: limit,
                        skip,
                        where: {
                            tanggal_keluar: {
                                not: null
                            }
                        },
                        include: {
                            customer: true,
                            staff: true,
                            transaksi_detail: true
                        },
                        orderBy: {
                            tanggal_masuk: "desc"
                        }
                    })
                    if (transaksi.length === 0) {
                        return res.status(404).json({
                            status: 404,
                            message: "Transaksi not found!"
                        })
                    }
                    const totalItems = await prisma.transaksi.count({
                        where: {
                            tanggal_keluar: {
                                not: null
                            }
                        },
                    })
                    const totalPages = Math.ceil(totalItems / limit)
                    transaksi.forEach((item) => {
                        let total_harga_temp = 0;
                        item.transaksi_detail.forEach((item) => {
                            total_harga_temp = total_harga_temp + (item.total_harga)
                        })
                        item.total_harga = total_harga_temp
                    })
                    return res.status(200).json({
                        status: 200,
                        message: "Succesfully get Layanan Detail",
                        data: [...transaksi],
                        currentPage: page,
                        totalPages
                    })
                } else if (status === "proses") {
                    let transaksi = await prisma.transaksi.findMany({
                        take: limit,
                        skip,
                        where: {
                            tanggal_keluar: null
                        },
                        include: {
                            customer: true,
                            staff: true,
                            transaksi_detail: true
                        },
                        orderBy: {
                            tanggal_masuk: "desc"
                        }
                    })
                    if (transaksi.length === 0) {
                        return res.status(404).json({
                            status: 404,
                            message: "Transaksi not found!"
                        })
                    }
                    const totalItems = await prisma.transaksi.count({
                        where: {
                            tanggal_keluar: null
                        },
                    })
                    const totalPages = Math.ceil(totalItems / limit)
                    transaksi.forEach((item) => {
                        let total_harga_temp = 0;
                        item.transaksi_detail.forEach((item) => {
                            total_harga_temp = total_harga_temp + (item.total_harga)
                        })
                        item.total_harga = total_harga_temp
                    })
                    return res.status(200).json({
                        status: 200,
                        message: "Succesfully get Layanan Detail",
                        data: [...transaksi],
                        currentPage: page,
                        totalPages
                    })
                }
            }
        }
        return res.status(400).json({
            status: 400,
            message: "Page needed",
        });
    } catch (error) {
        console.log("Error in Get Transaksi:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};

exports.SearchTransaksi = async (req, res) => {
    try {
        const page = req.query.page;
        const limit = 10;
        const skip = (page - 1) * limit;
        const nota = req.query.nota;
        const customer = req.query.customer;
        const staff = req.query.staff;

        if (page) {
            let transaksi = [];
            let totalItems = 0;
            if (nota) {
                transaksi = await prisma.transaksi.findMany({
                    take: limit,
                    skip,
                    where: {
                        nota: {
                            contains: nota
                        }
                    },
                    include: {
                        customer: true,
                        staff: true,
                        transaksi_detail: true
                    },
                    orderBy: {
                        tanggal_masuk: "desc"
                    }
                })
                if (transaksi.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "Transaksi not found!"
                    })
                }
                transaksi.forEach((item) => {
                    let total_harga_temp = 0;
                    item.transaksi_detail.forEach((item) => {
                        total_harga_temp = total_harga_temp + (item.total_harga)
                    })
                    item.total_harga = total_harga_temp
                })
                totalItems = await prisma.transaksi.count({
                    where: {
                        nota: {
                            contains: nota
                        }
                    },
                })
                const totalPages = Math.ceil(totalItems / limit)
                return res.status(200).json({
                    status: 200,
                    message: "Succesfully get Layanan Detail",
                    data: [...transaksi],
                    currentPage: page,
                    totalPages
                })
            } else if (customer) {
                transaksi = await prisma.transaksi.findMany({
                    take: limit,
                    skip,
                    where: {
                        customer: {
                            nama: {
                                contains: customer
                            }
                        }
                    },
                    include: {
                        customer: true,
                        staff: true,
                        transaksi_detail: true
                    },
                    orderBy: {
                        tanggal_masuk: "desc"
                    }
                })
                if (transaksi.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "Transaksi not found!"
                    })
                }
                transaksi.forEach((item) => {
                    let total_harga_temp = 0;
                    item.transaksi_detail.forEach((item) => {
                        total_harga_temp = total_harga_temp + (item.total_harga)
                    })
                    item.total_harga = total_harga_temp
                })
                totalItems = await prisma.transaksi.count({
                    where: {
                        customer: {
                            nama: {
                                contains: customer
                            }
                        }
                    },
                })
                const totalPages = Math.ceil(totalItems / limit)
                return res.status(200).json({
                    status: 200,
                    message: "Succesfully get Layanan Detail",
                    data: [...transaksi],
                    currentPage: page,
                    totalPages
                })
            } else if (staff) {
                transaksi = await prisma.transaksi.findMany({
                    take: limit,
                    skip,
                    where: {
                        staff: {
                            nama: {
                                contains: staff
                            }
                        }
                    },
                    include: {
                        customer: true,
                        staff: true,
                        transaksi_detail: true
                    },
                    orderBy: {
                        tanggal_masuk: "desc"
                    }
                })
                if (transaksi.length === 0) {
                    return res.status(404).json({
                        status: 404,
                        message: "Transaksi not found!"
                    })
                }
                transaksi.forEach((item) => {
                    let total_harga_temp = 0;
                    item.transaksi_detail.forEach((item) => {
                        total_harga_temp = total_harga_temp + (item.total_harga)
                    })
                    item.total_harga = total_harga_temp
                })
                totalItems = await prisma.transaksi.count({
                    where: {
                        staff: {
                            nama: {
                                contains: staff
                            }
                        }
                    },
                })
                const totalPages = Math.ceil(totalItems / limit)
                return res.status(200).json({
                    status: 200,
                    message: "Succesfully get Layanan Detail",
                    data: [...transaksi],
                    currentPage: page,
                    totalPages
                })
            }
        }
        let transaksi = []
        if (nota) {
            transaksi = await prisma.transaksi.findMany({
                where: {
                    nota: {
                        contains: nota
                    }
                },
                include: {
                    customer: true,
                    staff: true,
                    transaksi_detail: true
                },
                orderBy: {
                    tanggal_masuk: "desc"
                }
            })
            if (transaksi.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Transaksi not found!"
                })
            }
            transaksi.forEach((item) => {
                let total_harga_temp = 0;
                item.transaksi_detail.forEach((item) => {
                    total_harga_temp = total_harga_temp + (item.total_harga)
                })
                item.total_harga = total_harga_temp
            })
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Layanan Detail",
                data: [...transaksi]
            })
        } else if (customer) {
            transaksi = await prisma.transaksi.findMany({
                where: {
                    customer: {
                        nama: {
                            contains: customer
                        }
                    }
                },
                include: {
                    customer: true,
                    staff: true,
                    transaksi_detail: true
                },
                orderBy: {
                    tanggal_masuk: "desc"
                }
            })
            if (transaksi.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Transaksi not found!"
                })
            }
            transaksi.forEach((item) => {
                let total_harga_temp = 0;
                item.transaksi_detail.forEach((item) => {
                    total_harga_temp = total_harga_temp + (item.total_harga)
                })
                item.total_harga = total_harga_temp
            })
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Layanan Detail",
                data: [...transaksi]
            })
        } else if (staff) {
            transaksi = await prisma.transaksi.findMany({
                where: {
                    staff: {
                        nama: {
                            contains: staff
                        }
                    }
                },
                include: {
                    customer: true,
                    staff: true,
                    transaksi_detail: true
                },
                orderBy: {
                    tanggal_masuk: "desc"
                }
            })
            if (transaksi.length === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Transaksi not found!"
                })
            }
            transaksi.forEach((item) => {
                let total_harga_temp = 0;
                item.transaksi_detail.forEach((item) => {
                    total_harga_temp = total_harga_temp + (item.total_harga)
                })
                item.total_harga = total_harga_temp
            })
            return res.status(200).json({
                status: 200,
                message: "Succesfully get Layanan Detail",
                data: [...transaksi]
            })
        }
    } catch (error) {
        console.log("Error in Get Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}
exports.GetTransaksiDetailByNota = async (req, res) => {
    try {
        let data = await prisma.transaksi.findFirst({
            where: {
                nota: req.params.nota
            },
            include: {
                customer: true,
                staff: true,
                // transaksi_detail: true
            }
        })
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: "Transaksi not found!"
            })
        }
        let transaksiDetail = await prisma.transaksi_Detail.findMany({
            where: { nota: req.params.nota },
            include: { layanan: true }
        })
        data = { ...data, transaksi_detail: transaksiDetail }
        let total_harga_temp = 0;
        data.transaksi_detail.forEach((item) => {
            total_harga_temp = total_harga_temp + (item.total_harga)
        })
        data.total_harga = total_harga_temp
        console.log(data)
        return res.status(200).json({
            status: 200,
            message: "Succesfully get Layanan Detail",
            data,
        })
    } catch (error) {
        console.log("Error in Get Layanan Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.AddTransaksi = async (req, res) => {
    try {
        const { transaksi, transaksi_detail } = req.body;
        const nota = await getNota()
        const saveTransaksi = await prisma.transaksi.create({
            data: {
                nota, id_customer: transaksi.id_customer, id_staff: transaksi.id_staff
            }
        })
        const layananIds = transaksi_detail.map((item) => { return item.id_layanan })
        const layanan_detail = await prisma.layanan_Detail.findMany({
            where: {
                id: {
                    in: layananIds
                }
            }
        })
        const newTransaksiDetail = transaksi_detail.map((item) => {
            return {
                ...item,
                layanan_detail: layanan_detail.find((item2) => item2.id === item.id_layanan)
            }
        })
        const transaksiDetailData = newTransaksiDetail.map((item) => {
            let total_harga = 0;
            if (item.berat) {
                total_harga = total_harga + (item.berat * item.layanan_detail.harga)
                return {
                    nota: saveTransaksi.nota,
                    total_harga,
                    id_layanan: item.id_layanan,
                    berat: item.berat
                }
            } else {
                total_harga = total_harga + (item.jumlah_barang * item.layanan_detail.harga)
                return {
                    nota: saveTransaksi.nota,
                    total_harga,
                    id_layanan: item.id_layanan,
                    jumlah_barang: item.jumlah_barang
                }
            }
        })
        // console.log(layanan_detail, newTransaksiDetail, transaksiDetailData)
        if (saveTransaksi) {
            try {
                const saveTransaksiDetail = await prisma.transaksi_Detail.createMany({
                    data: transaksiDetailData
                })
                return res.status(200).json({
                    status: 200,
                    message: "Succesfully add Transaksi Detail",
                    data: {
                        transaksi: saveTransaksi,
                        transaksi_detail: saveTransaksiDetail
                    }
                })
            } catch (error) {
                await prisma.transaksi.delete({
                    where: {
                        nota: saveTransaksi.nota
                    }
                })
                return res.status(301).json({
                    status: 301,
                    message: "Failed add Transaksi Detail"
                })
            }
        }
        return res.status(300).json({
            status: 300,
            message: "Failed add Transaksi"
        })
    } catch (error) {
        console.log("Error in Add Transaksi Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.DeleteTransaksi = async (req, res) => {
    try {
        console.log(req.query.nota)
        if (!req.query.nota) {
            return res.status(401).json({
                status: 401,
                message: "id Must be field!!"
            })
        }
        const deleteTransaksi = await prisma.transaksi.delete({
            where: {
                nota: req.query.nota
            }
        })
        const deleteTransaksiDetail = await prisma.transaksi_Detail.deleteMany({
            where: {
                nota: req.query.nota
            }
        })
        return res.status(200).json({
            status: 200,
            message: "Succesfully Delete Transaksi",
            data: {
                transaksi: deleteTransaksi,
                transaksi_Detail: deleteTransaksiDetail
            }
        })
    } catch (error) {
        console.log("Error in Delete Transaksi Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

exports.TransactionDone = async (req, res) => {
    try {
        const { nota } = req.body
        const data = await prisma.transaksi.update({
            where: {
                nota
            },
            data: {
                tanggal_keluar: new Date()
            }
        })
        if (!data) {
            return res.status(300).json({
                status: 300,
                message: "Failed add Transaksi"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Succesfully Edit Transaksi ",
            data,
        })
    } catch (error) {
        console.log("Error in Add Transaksi Detail:", error)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        })
    }
}