import axios from "axios"
import { useEffect, useState } from "react"
import { Api_Url } from "../env"


export default function HeadingInfoSales() {

    const [data, setData] = useState<any>({})

    const getInfo = async () => {
        try {
            const res = await axios.get(`${Api_Url}/info`)
            console.log(res)
            setData({ ...res.data.data })
        } catch (error) {
            console.log("Failed get Staff:", error)
            return error
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <div className="grid grid-cols-4 items-center gap-[2rem] h-full">
            <div className="bg-white p-[2rem] w-full h-full rounded-[1rem] shadow-table-black flex items-center gap-[1rem]">
                <i className='bx bxs-user-check text-[6.5rem] text-[#9a9cfd] bg-' ></i>
                <div className="flex flex-col justify-between h-full">
                    <p className="text-black font-[600]">
                        Total Staff
                    </p>
                    <p className="text-[3rem] font-[500] text-[#64748b]">
                        {data?.totalStaff}
                    </p>
                    <div className="flex gap-2 items-center">
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <svg className="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill="currentColor"></path></svg>
                        </span>
                        <span className="md:text-sm font-medium text-[.6rem] text-main-gray-text">8% vs last month</span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-[2rem] w-full h-full rounded-[1rem] shadow-table-black flex items-center gap-[1rem]">
                <i className='bx bxs-user-detail text-[6.5rem] text-[#9a9cfd] bg-' ></i>
                <div className="flex flex-col justify-between h-full">
                    <p className="text-black font-[600]">
                        Total Customer
                    </p>
                    <p className="text-[3rem] font-[500] text-[#64748b]">
                        {data?.totalCustomer}
                    </p>
                    <div className="flex gap-2 items-center">
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <svg className="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill="currentColor"></path></svg>
                        </span>
                        <span className="md:text-sm font-medium text-[.6rem] text-main-gray-text">8% vs last month</span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-[2rem] w-full h-full rounded-[1rem] shadow-table-black flex items-center gap-[1rem">
                <i className='bx bx-transfer-alt text-[6.5rem] text-[#9a9cfd] bg-' ></i>
                <div className="flex flex-col justify-between h-full">
                    <p className="text-black font-[600]">
                        Total Transactions
                    </p>
                    <p className="text-[3rem] font-[500] text-[#64748b]">
                        {data?.totalTransaksi}
                    </p>
                    <div className="flex gap-2 items-center">
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <svg className="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill="currentColor"></path></svg>
                        </span>
                        <span className="md:text-sm font-medium text-[.6rem] text-main-gray-text">8% vs last month</span>
                    </div>
                </div>
            </div>
            <div className="bg-white p-[2rem] w-full h-full rounded-[1rem] shadow-table-black flex items-center gap-[1rem">
                <i className='bx bx-data text-[6.5rem] text-[#9a9cfd] bg-' ></i>
                <div className="flex flex-col justify-between h-full">
                    <p className="text-black font-[600]">
                        Total Pendapatan
                    </p>
                    <p className="text-[1.1rem] font-[600] break-words text-[#64748b]">
                        {data?.totalPendapatan?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </p>
                    <div className="flex gap-2 items-center">
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <svg className="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill="currentColor"></path></svg>
                        </span>
                        <span className="md:text-sm font-medium text-[.6rem] text-main-gray-text">8% vs last month</span>
                    </div>
                </div>
            </div>
            {/* <div id="test" className="bg-white p-[2rem] w-full h-full rounded-[1rem] shadow-table-black flex items-center gap-[1rem]">
                <i className='bx bx-data text-[6.5rem] text-[#9a9cfd] bg-' ></i>
                <div className="">
                    <p className="text-black font-[600]">
                        Total Pendapatan
                    </p>
                    <div className="text-[1.5rem] flex gap-3 items-center h-[64px] font-[500]">
                        <p>{data?.totalPendapatan?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                            <svg className="fill-meta-3" width="10" height="11" viewBox="0 0 10 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z" fill="currentColor"></path></svg>
                        </span>
                        <span className="md:text-sm font-medium text-[.6rem] text-main-gray-text">8% vs last month</span>
                    </div>
                </div>
            </div> */}
        </div>
    )
}