import axios from "axios"
import { useEffect, useState } from "react"
import { Api_Url } from "../../env"
import { Link } from "react-router-dom"
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText"
import toast from "react-hot-toast"
import { getError } from "../../Utils"


export default function AddTransactions() {

    const [customer, setCustomer] = useState<any>({})
    const [name, setName] = useState<string>("")
    const [OnSearch, setOnSearch] = useState<boolean>(false)
    const [SearchData, setSearchData] = useState<any>([])


    const [staff, setStaff] = useState<any>({})
    const [nameStaff, setNameStaff] = useState<string>("")
    const [OnSearchStaff, setOnSearchStaff] = useState<boolean>(false)
    const [SearchDataStaff, setSearchDataStaff] = useState<any>([])

    const [service, setService] = useState<any>({
        id: ""
    })
    const [listBuy, setListBuy] = useState<any>([])

    const [optionStaff, setOptionStaff] = useState<any>([])
    const [optionLayananDetail, setOptionLayananDetail] = useState<any>([])

    const [loading, setLoading] = useState<boolean>(false)

    const AddTransactions = async () => {
        setLoading(true)
        try {
            const detailTransaksi = listBuy.map((item: any) => {
                if (item.layanan === "HELAIAN") {
                    return {
                        id_layanan: item.id,
                        jumlah_barang: item.jumlah_barang
                    }
                }
                if (item.layanan === "KILOAN") {
                    return {
                        id_layanan: item.id,
                        berat: item.berat
                    }
                }
            })
            const data = {
                transaksi: {
                    id_customer: customer.id,
                    id_staff: staff.id
                },
                transaksi_detail: [...detailTransaksi]
            }
            console.log(data)
            const res = await axios.post(`${Api_Url}/transaksi/add`, {
                transaksi: {
                    id_customer: customer.id,
                    id_staff: staff.id
                },
                transaksi_detail: [...detailTransaksi]
            })
            console.log(res)
            // navigate("/Transactions")
            toast.success(`Success To Add Transaksi`, { duration: 3000 })
            setLoading(false)
        } catch (error) {
            console.log("Failed to add Transaksi :", error)
            getError(error, "Failed to add Transaksi")
            setLoading(false)
            return error;
        }
    }

    console.log(staff, customer)

    const SearchCustomer = async (nama: string) => {
        try {
            const res = await fetch(`${Api_Url}/customer/search?nama=${nama}`)
            const data = await res.json()
            setSearchData([...data.data])
            console.log(data)
        } catch (error) {
            console.log("Failed to search customer :", error)
            return error;
        }
    }
    const CustomerAll = async () => {
        try {
            const res = await fetch(`${Api_Url}/customer`)
            const data = await res.json()
            setSearchData([...data.data])
            console.log(data)
        } catch (error) {
            console.log("Failed to search customer :", error)
            return error;
        }
    }
    const SearchStaff = async (nama: string) => {
        try {
            const res = await fetch(`${Api_Url}/staff/search?nama=${nama}`)
            const data = await res.json()
            setSearchDataStaff([...data.data])
            console.log(data)
        } catch (error) {
            console.log("Failed to search customer :", error)
            return error;
        }
    }
    const StaffAll = async () => {
        try {
            const res = await fetch(`${Api_Url}/staff`)
            const data = await res.json()
            setSearchDataStaff([...data.data])
            console.log(data)
        } catch (error) {
            console.log("Failed to search customer :", error)
            return error;
        }
    }
    const getOptionStaff = async () => {
        try {
            const res = await axios.get(`${Api_Url}/staff`)
            console.log(res)
            setOptionStaff([...res.data.data])
        } catch (error) {
            console.log("Failed get list pricing:", error)
            return error
        }
    }
    const getOptionLayananDetail = async () => {
        try {
            const res = await axios.get(`${Api_Url}/layanan-detail`)
            console.log(res)
            setOptionLayananDetail([...res.data.data])
        } catch (error) {
            console.log("Failed get list pricing:", error)
            return error
        }
    }

    useEffect(() => {
        getOptionStaff()
        getOptionLayananDetail()
    }, [])

    useEffect(() => {
        const data = optionLayananDetail.filter((item: any) => item.id === service.id)[0]
        if (service.id !== "") {
            setListBuy((prev: any) => ([...prev, {
                ...data
            }]))
            setService({
                id: ""
            })
        }
    }, [service.id])

    useEffect(() => {
        const data = optionStaff.filter((item: any) => item.id === staff.id)[0]
        if (staff.id !== "") {
            setStaff({ ...data })
        }
    }, [staff.id])

    console.log("listBuy", listBuy)

    return (
        <div className="px-[1rem] md:px-[4rem] py-[2rem]">
            <LoadingPageWithText heading="Adding Transactions...." loading={loading} />
            <Link to={"/Transactions"} className="flex gap-[1rem] justify-start items-center mb-[2rem] hover:bg-main-gray-border cursor-pointer select-none w-fit px-[.8rem] rounded-[1rem] duration-300">
                <i className='bx bx-arrow-back text-[1.5rem]' />
                <p className="text-[1.5rem]">
                    Back
                </p>
            </Link>
            <div className="rounded-sm bg-white shadow-xl">
                <div className="border-b py-4 px-[1.5rem]">
                    <div className="flex">
                        <div className="pr-4">
                            <h3 className="font-medium text-black dark:text-white">
                                Insert Transactions Data
                            </h3>
                        </div>
                    </div>
                </div>
                <form className="flex flex-col gap-[1.5rem] p-[1.5rem]">

                    <div id="customer" className="flex flex-col gap-4">
                        <div id="nama" className="relative z-[9]">
                            <div className="input-poster flex flex-col gap-[.5rem]">
                                <p>
                                    Customer
                                </p>
                                {Object.keys(customer).length === 0 ?
                                    <input type="text" placeholder={`Cari Customer....`} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" onChange={(e) => {
                                        setName(e.target.value)
                                        if (e.target.value.length > 0) {
                                            SearchCustomer(e.target.value)
                                        } else {
                                            CustomerAll()
                                        }
                                    }}
                                        value={name}
                                        onFocus={() => {
                                            setOnSearch(true)
                                            if (name.length === 0) {
                                                CustomerAll()
                                            }
                                        }}
                                        onBlur={() => {
                                            setTimeout(() => {
                                                setOnSearch(false)
                                            }, 500);
                                        }}
                                    /> :
                                    <input type="text" placeholder={`Cari Customer....`} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" disabled value={customer.nama} />
                                }
                            </div>
                            {OnSearch &&
                                <div className="bg-white border border-main-gray-border w-full absolute top-[calc(100%)] left-0 rounded-[.5rem]">
                                    {SearchData?.map((item: any, i: number) => (
                                        <div key={i} className="hover:bg-main-purple px-[1rem] py-[.5rem] text-main-gray-text"
                                            onClick={() => { setCustomer({ ...item }); setOnSearch(false); setName("") }}
                                        >
                                            <p>{item.nama} / {item.telp} / {item.alamat}</p>
                                        </div>
                                    ))}
                                    {SearchData.length === 0 &&
                                        <div className="hover:bg-main-purple px-[1rem] py-[.5rem] text-main-gray-text bg-white">
                                            <p>Customer not found</p>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        {Object.keys(customer).length !== 0 &&
                            <div className="bg-main-purple text-main shadow-default2 w-full max-w-[200px] p-[1rem] rounded-[1rem] pr-[2rem] relative">
                                <h1 className="font-[600] text-[1rem] mb-[.5rem]">Customer:</h1>
                                <p className="font-[600]">{customer.nama}</p>
                                <p>{customer.telp}</p>
                                <p>{customer.alamat}</p>
                                <i className='bx bx-x absolute top-2 right-2 text-main-red text-[1.5rem] bg-white rounded-[50%] hover:bg-[#ffffffdc] hover:scale-105 cursor-pointer duration-200'
                                    onClick={() => setCustomer({})}
                                />
                            </div>
                        }
                    </div>

                    <div id="staff" className="flex flex-col gap-4">
                        <div id="nama" className="relative">
                            <div className="input-poster flex flex-col gap-[.5rem]">
                                <p>
                                    Staff
                                </p>
                                {Object.keys(staff).length === 0 ?
                                    <input type="text" placeholder={`Cari Staff....`} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" onChange={(e) => {
                                        setNameStaff(e.target.value)
                                        if (e.target.value.length > 0) {
                                            SearchStaff(e.target.value)
                                        } else {
                                            StaffAll()
                                        }
                                    }}
                                        value={nameStaff}
                                        onFocus={() => {
                                            setOnSearchStaff(true)
                                            if (name.length === 0) {
                                                StaffAll()
                                            }
                                        }}
                                        onBlur={() => {
                                            setTimeout(() => {
                                                setOnSearchStaff(false)
                                            }, 500);
                                        }}
                                    /> :
                                    <input type="text" placeholder={`Cari Staff....`} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" disabled value={staff.nama} />
                                }
                            </div>
                            {OnSearchStaff &&
                                <div className="bg-white border border-main-gray-border w-full absolute top-[calc(100%)] left-0 rounded-[.5rem]">
                                    {SearchDataStaff?.map((item: any, i: number) => (
                                        <div key={i} className="hover:bg-main-purple px-[1rem] py-[.5rem] text-main-gray-text"
                                            onClick={() => { setStaff({ ...item }); setOnSearchStaff(false); setNameStaff("") }}
                                        >
                                            <p>{item.nama} / {item.telp} / {item.alamat}</p>
                                        </div>
                                    ))}
                                    {SearchDataStaff.length === 0 &&
                                        <div className="hover:bg-main-purple px-[1rem] py-[.5rem] text-main-gray-text">
                                            <p>Staff not found</p>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                        {Object.keys(staff).length !== 0 &&
                            <div className="bg-main-purple text-main shadow-default2 w-full max-w-[200px] p-[1rem] rounded-[1rem] pr-[1rem] relative">
                                <h1 className="font-[600] text-[1rem] mb-[.5rem]">Staff:</h1>
                                <p className="font-[600]">{staff.nama}</p>
                                <p>{staff.telp}</p>
                                <p>{staff.alamat}</p>
                                <i className='bx bx-x absolute top-2 right-2 text-main-red text-[1.5rem] bg-white rounded-[50%] hover:bg-[#ffffffdc] hover:scale-105 cursor-pointer duration-200'
                                    onClick={() => setStaff({})}
                                />
                            </div>
                        }
                    </div>

                    <div id="buy">
                        <div className="input-poster flex flex-col gap-[.5rem]">
                            <p>
                                Service
                            </p>
                            <select className={`px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full ${service.id !== "" ? "text-black" : "text-gray-400"}`} value={service.id} onChange={(e) => {
                                setService((prev: any) => ({ ...prev, id: e.target.value }))
                            }} >
                                <option value="" className="text-gray-400">
                                    Pilih Layanan
                                </option>
                                {optionLayananDetail?.map((item: any, i: number) => (
                                    <option key={i} value={item.id} className="text-black">
                                        {item.layanan_detail}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-[1rem] mt-[1rem]">
                            {listBuy?.map((item: any, i: number) => (
                                <div className="input-poster flex flex-col gap-[.5rem] bg-main-purple p-[1rem] pt-[.5rem] rounded-[1rem] relative">
                                    <p className="text-main text-[1.1rem] capitalize">
                                        {item.layanan_detail} ({item.layanan})
                                    </p>
                                    <input type="number" placeholder={item.layanan === "HELAIAN" ? "Jumlah barang...." : "Berat..."} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" onChange={(e) => {
                                        const data = listBuy;
                                        data.forEach((item: any, index: number) => {
                                            if (index === i && item.layanan === "HELAIAN") {
                                                item.jumlah_barang = parseFloat(e.target.value)
                                            }
                                            if (index === i && item.layanan === "KILOAN") {
                                                item.berat = parseFloat(e.target.value)
                                            }
                                        });
                                        console.log(data)
                                    }} />
                                    <i className='bx bx-x absolute top-1 right-1 text-main-red text-[1.5rem] bg-white rounded-[50%] hover:bg-[#ffffffdc] hover:scale-105 cursor-pointer duration-200'
                                        onClick={() => {
                                            const data = listBuy.filter((item: any, index: number) => i !== index);
                                            setListBuy([...data])
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end p-4">
                        <button
                            type='submit'
                            className="bg-main-purple font-[500] hover:bg-main-hover hover:text-white duration-200 text-main py-[.8rem] px-[1rem] rounded-[.8rem]"
                            onClick={(e) => { AddTransactions(); e.preventDefault() }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// <div className="input-poster flex flex-col gap-[.5rem]">
// {/* <select className={`px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full ${service.id !== "" ? "text-black" : "text-gray-400"}`} value={service.id} >
//     <option value="" className="text-gray-400">
//         Pilih Layanan
//     </option>
//     {optionLayananDetail?.map((item: any, i: number) => (
//         <option value={item.id} className="text-black"
//             onClick={() => setService({ ...item })}
//         >
//             {item.layanan_detail}
//         </option>
//     ))}
// </select> */}
// <div className=" flex flex-col gap-[.5rem]">
//     <p>Service</p>
//     <div className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full">
//         awda
//     </div>
// </div>

// <div className="bg-white border border-main-gray-border w-full absolute top-[calc(100%)] left-0 rounded-[.5rem]">
//     {optionLayananDetail?.map((item: any, i: number) => (
//         <div className="hover:bg-main-purple px-[1rem] py-[.5rem] text-main-gray-text"
//             onClick={() => {

//             }}
//         >
//             <p>{item.layanan_detail}</p>
//         </div>
//     ))}
//     {optionLayananDetail.length === 0 &&
//         <div className="hover:bg-main-purple px-[1rem] py-[.5rem] text-main-gray-text">
//             <p>Customer not found</p>
//         </div>
//     }
// </div>
// </div>