const prisma = require("../database");

exports.getNota = async () => {
    const lastTransaction = await prisma.transaksi.findFirst({
        orderBy: {
            tanggal_masuk: 'desc'
        }
    });
    const Test = parseInt(lastTransaction.nota.replace("TKD-", "").replace("AZT", ""))
    return `TKD-${Test + 1}AZT`
}