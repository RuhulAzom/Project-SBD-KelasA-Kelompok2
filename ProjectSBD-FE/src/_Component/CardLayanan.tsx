import { utils, writeFile } from "xlsx";
import { getDateString } from "../Utils";

const CardLayanan = ({ heading, transaction, totalSale, waiting, data, index }: any) => {
    const formatRupiah = (amount: any) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };
    // const handleMonth = (month: any) => {
    //     switch (month) {
    //         case 1:
    //             return "January";
    //         case 2:
    //             return "February";
    //         case 3:
    //             return "March";
    //         case 4:
    //             return "April";
    //         case 5:
    //             return "May";
    //         case 6:
    //             return "June";
    //         case 7:
    //             return "July";
    //         case 8:
    //             return "August";
    //         case 9:
    //             return "September";
    //         case 10:
    //             return "October";
    //         case 11:
    //             return "November";
    //         case 12:
    //             return "December";
    //         default:
    //             return "Invalid month";
    //     }
    // }
    // const handleDate = (dates: any) => {
    //     const Dates = new Date(dates);
    //     const day = Dates.getDate();
    //     const month = Dates.getMonth() + 1;
    //     const year = Dates.getFullYear()
    //     const newDate = `${day} ${handleMonth(month)} ${year}`
    //     return newDate
    // }

    // console.log(data)
    const exportData = async (fileName: string) => {
        const exelData = data.filter((_: any, i: number) => i === index)
        const download = exelData.map((item: any) => {
            return {
                Nama_Layanan: item.layanan_detail,
                Type_Layanan: item.layanan,
                Total_Pendapatan: item.total_pendapatan,
                Total_Transaksi: item.transaksi,
                Proses: item.proses
            }
        })

        const wb = utils.book_new(),
            ws = utils.json_to_sheet(download);
        utils.book_append_sheet(wb, ws, "items");
        writeFile(wb, fileName);
    };
    return (
        <div className="rounded-2xl border h-fit border-stroke bg-white p-4 shadow-xl dark:border-strokedark dark:bg-boxdark flex flex-col gap-4 text-[#64748b]">
            <h1 className="font-[700] text-[1.2rem] capitalize">{heading}</h1>
            <div className="grid grid-cols-3 gap-0 ">
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <i className='bx bx-transfer-alt text-[#9a9cfd] text-[32px]'></i>
                        <p className="font-[700] text-[1.1rem]">{transaction}</p>
                    </div>
                    <p className="font-medium text-[1rem] text-center">Transactions</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <i className='bx bx-data text-[#9a9cfd] text-[32px]'></i>
                        <p className="font-[700] text-[1.1rem]">{formatRupiah(totalSale)}</p>
                    </div>
                    <p className="font-medium text-[1rem] text-center">Total Sale</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <div className="flex gap-2 items-center">
                        <i className='bx bxs-time-five text-[#9a9cfd] text-[32px]'></i>
                        <p className="font-[700] text-[1.1rem]">{waiting}</p>
                    </div>
                    <p className="font-medium text-[1rem] text-center">Prosess</p>
                </div>
            </div>
            <div className="grid grid-cols-3 ">
                <div className="col-span-2"></div>
                <div className="flex justify-center col-span-1">
                    <button
                        className="bg-[#9a9cfd] hover:bg-[#9a9cfdc5] duration-300 text-white font-[500] py-1 px-[1rem] rounded-[1rem] text-[.8rem]"
                        onClick={() => exportData(`${heading}_${getDateString(new Date())}.xlsx`)}
                    >
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardLayanan;
