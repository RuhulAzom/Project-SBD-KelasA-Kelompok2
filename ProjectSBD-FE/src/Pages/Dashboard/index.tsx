import { useEffect, useState } from "react";
import { userData } from "../../App";
import CardLayanan from "../../_Component/CardLayanan";
import HeadingInfoSales from "../../_Component/HeadingInfoSales";
import axios from "axios";
import { Api_Url } from "../../env";
import { utils, writeFile } from "xlsx";
import { getDateString } from "../../Utils";


export default function Dashboard() {

    const [dataLayanan, setDataLayanan] = useState<any>([])

    const getInfoLayanan = async () => {
        try {
            const res = await axios.get(`${Api_Url}/layanan-detail/info`)
            console.log(res)
            setDataLayanan([...res.data.data])
        } catch (error) {
            console.log("Failed get Staff:", error)
            return error
        }
    }

    useEffect(() => {
        getInfoLayanan()
    }, [])

    const exportData = async (fileName: string) => {
        const exelData = [...dataLayanan]
        const download = exelData.map((item: any) => {
            return {
                Nama_Layanan: item.layanan_detail,
                Type_Layanan: item.layanan,
                Total_Pendapatan: item.total_pendapatan,
                Total_Transaksi: item.transaksi,
                Proses: item.proses
            }
        })

        let wb = utils.book_new(),
            ws = utils.json_to_sheet(download);
        utils.book_append_sheet(wb, ws, "items");
        writeFile(wb, fileName);
    };

    return (
        <div className="px-[4rem] py-[2rem] flex flex-col gap-[1rem]">
            <h1 className="text-[2rem] font-[500] text-main-gray-text">
                Welcome Back, {userData.username}
            </h1>
            <HeadingInfoSales />

            <div className="flex flex-col gap-[1rem]">
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-[2rem] font-[500] text-main-gray-text">
                        Layanan
                    </h1>
                    <button
                        className="bg-[#9a9cfd] hover:bg-[#9a9cfdc5] duration-300 px-[1rem] py-[.5rem] font-[500] text-white flex justify-center items-center rounded-[1.5rem]"
                        onClick={() => exportData(`Data Transaksi Layanan_${getDateString(new Date())}.xlsx`)}
                    >
                        Export All Data Transaksi Layanan
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {dataLayanan?.map((item: any, i: number) => (
                        <CardLayanan
                            key={i}
                            index={i}
                            heading={`${item.layanan} - ${item.layanan_detail}`}
                            transaction={item.transaksi}
                            totalSale={item.total_pendapatan}
                            waiting={item.proses}
                            data={dataLayanan}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}