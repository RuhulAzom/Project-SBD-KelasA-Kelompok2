import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api_Url } from "../../env";
import axios from "axios";
import { getDateString, getError, getHours } from "../../Utils";
import ModalDelete from "../../_Component/ModalDelete";
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText";
import toast from "react-hot-toast";
import { utils, writeFile } from "xlsx";

export default function Transactions() {


    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)


    const [modalDelete, setModalDelete] = useState<any>({
        id: "",
        title: "",
        show: false,
        delete: false
    })


    const [searchValue, setSearchValue] = useState<string>("")
    const [typeSearch, setTypeSearch] = useState<string>("nota")
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)


    const [filter, setFilter] = useState<string>("")
    const [status, setStatus] = useState<string>("selesai")
    const [tanggal, setTanggal] = useState<string>("")

    const getTransactions = async (page: number) => {
        try {
            const res = await fetch(`${Api_Url}/transaksi?page=${page}`);
            const response = await res.json();
            console.log(response)
            setTotalPages(response.totalPages)
            setData([...response.data])
            // const res = await axios.get(`${Api_Url}/transaksi`)
            // console.log(res)
            return
        } catch (error) {
            console.log("Error in get Transactions:", error)
            return error
        }
    }
    const getTransactionsFilterTanggal = async (page: number) => {
        if (filter === "tanggal_masuk") {
            try {
                const res = await fetch(`${Api_Url}/transaksi/filter?tanggal_masuk=${tanggal}&page=${page}`);
                const response = await res.json();
                console.log(response)
                setTotalPages(response.totalPages)
                setData([...response.data])
                return
            } catch (error) {
                console.log("Error in get Transactions:", error)
                setData([])
                return error
            }
        } else if (filter === "tanggal_keluar") {
            try {
                const res = await fetch(`${Api_Url}/transaksi/filter?tanggal_keluar=${tanggal}&page=${page}`);
                const response = await res.json();
                console.log(response)
                setTotalPages(response.totalPages)
                setData([...response.data])
                return
            } catch (error) {
                console.log("Error in get Transactions:", error)
                setData([])
                return error
            }
        }
    }
    const getTransactionsFilterStatus = async (page: number) => {
        try {
            const res = await fetch(`${Api_Url}/transaksi/filter?status=${status}&page=${page}`);
            const response = await res.json();
            console.log(response)
            setTotalPages(response.totalPages)
            setData([...response.data])
            return
        } catch (error) {
            console.log("Error in get Transactions:", error)
            setData([])
            return error
        }
    }

    const searchByNota = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/transaksi/search?nota=${searchValue}&page=${page}`)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error) {
            console.log("Failed Search Staff:", error)
            getError(error, "Failed Search Staff")
            setData([])
            return error
        }
    }
    const searchByCustomer = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/transaksi/search?customer=${searchValue}&page=${page}`)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error) {
            console.log("Failed Search Staff:", error)
            getError(error, "Failed Search Staff")
            setData([])
            return error
        }
    }
    const searchByStaff = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/transaksi/search?staff=${searchValue}&page=${page}`)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error) {
            console.log("Failed Search Staff:", error)
            getError(error, "Failed Search Staff")
            setData([])
            return error
        }
    }

    const handleFilter = async () => {
        if (filter === "status") {
            if (status === "selesai") {
                if (searchValue.length === 0) {
                    setPage(1)
                    getTransactionsFilterStatus(1)
                }
            } else if (status === "proses") {
                if (searchValue.length === 0) {
                    setPage(1)
                    getTransactionsFilterStatus(1)
                }
            }
        }
        else if (filter === "tanggal_masuk" || filter === "tanggal_keluar") {
            setPage(1)
            getTransactionsFilterTanggal(1)
        }
        else if (filter === "") {
            if (searchValue.length === 0) {
                setPage(1)
                getTransactions(1)
            }
        }
    }

    useEffect(() => {
        if (searchValue.length === 0) {
            if (filter === "") {
                getTransactions(page)
            } else if (filter === "tanggal_masuk" || filter === "tanggal_keluar") {
                getTransactionsFilterTanggal(page)
            } else if (filter === "status") {
                getTransactionsFilterStatus(page)
            }
        } else {
            if (typeSearch === "nota") {
                searchByNota(page)
            } else if (typeSearch === "customer") {
                searchByCustomer(page)
            } else if (typeSearch === "staff") {
                searchByStaff(page)
            }
        }
    }, [page])

    useEffect(() => {
        if (searchValue.length === 0) {
            getTransactions(1)
            setFilter("")
        }
    }, [searchValue])

    useEffect(() => {
        handleFilter()
    }, [filter, status, tanggal])


    const deleteTransaction = async (nota: string) => {
        setLoading(true)
        try {
            const res = await axios.delete(`${Api_Url}/transaksi/delete?nota=${nota}`)
            setLoading(false)
            console.log(res)
            toast.success(`Succes To Delete Staff`, { duration: 3000 })
            setModalDelete((prev: any) => ({ ...prev, show: false, id: "", delete: false }))
        } catch (error) {
            console.log("Failed delete Staff:", error)
            setLoading(false)
            getError(error, "Failed delete Staff")
            setModalDelete((prev: any) => ({ ...prev, show: false, id: "", delete: false }))
            return error
        }
    }
    const handleDelete = async () => {
        await deleteTransaction(modalDelete.id)
        await getTransactions(page)
    }

    useEffect(() => {
        if (modalDelete.delete) {
            handleDelete()
        }
    }, [modalDelete])

    const exportData = async (fileName: string, parameter: string) => {
        if (parameter === "All") {
            const res = await fetch(`${Api_Url}/transaksi`);
            const response = await res.json();
            const data = [...response.data]
            const download = data.map((item: any, i: number) => {
                return {
                    No: i + 1,
                    Nota: item.nota,
                    Customer: item.customer.nama,
                    Staff: item.staff.nama,
                    Tanggal_Masuk: `${getDateString(item.tanggal_masuk)} | ${getHours(item.tanggal_masuk)}`,
                    Tanggal_Keluar: item.tanggal_keluar ? `${getDateString(item.tanggal_keluar)} | ${getHours(item.tanggal_keluar)}` : "Belum Diambil",
                    Total_Harga: item.total_harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
                    Status: item.tanggal_keluar ? "Selesai" : "Proses"
                }
            })
            const wb = utils.book_new(),
                ws = utils.json_to_sheet(download);
            utils.book_append_sheet(wb, ws, "items");
            writeFile(wb, fileName);
        } else {
            const download = data.map((item: any, i: number) => {
                return {
                    No: i + 1,
                    Nota: item.nota,
                    Customer: item.customer.nama,
                    Staff: item.staff.nama,
                    Tanggal_Masuk: `${getDateString(item.tanggal_masuk)} | ${getHours(item.tanggal_masuk)}`,
                    Tanggal_Keluar: item.tanggal_keluar ? `${getDateString(item.tanggal_keluar)} | ${getHours(item.tanggal_keluar)}` : "Belum Diambil",
                    Total_Harga: item.total_harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }),
                    Status: item.tanggal_keluar ? "Selesai" : "Proses"
                }
            })
            const wb = utils.book_new(),
                ws = utils.json_to_sheet(download);
            utils.book_append_sheet(wb, ws, "items");
            writeFile(wb, fileName);
        }
    };

    return (
        <div className="pb-[2rem] pt-[1rem] md:py-[2rem] px-[1rem] md:px-[4rem] flex flex-col gap-[2rem]">


            <ModalDelete data={modalDelete} setDelete={setModalDelete} />
            <LoadingPageWithText heading={`Deleting "${modalDelete.title}"`} loading={loading} />
            {/* 
            <div className="flex w-full justify-between gap-[1rem]">
                <div className="w-full relative flex items-center text-main-gray-text">
                    <i className='bx bx-search absolute left-[.5rem] text-[1.5rem]' />
                    <input type="text" placeholder="Search transactions history.." className="w-full outline-none bg-transparent border border-black py-[.5rem] pl-[2.5rem] rounded-[.5rem]" />
                </div>
                <Link to={`/Transactions/Add`} className="shrink-0 bg-main text-white px-[1rem] py-[.5rem] rounded-[.5rem] hover:bg-main-hover active:bg-main duration-200">
                    Add Transactions
                </Link>
            </div> */}
            <div className="flex w-full items-center justify-between gap-[1rem]">
                <div className="flex flex-col md:flex-row items-center gap-[1rem] md:gap-[2rem]">
                    <Link to={"/Transactions/Add"} className="md:hidden shrink-0 bg-main text-white font-[500] w-full flex justify-center py-[.8rem] rounded-[1rem] hover:bg-main-hover active:bg-main-purple duration-200 shadow-table-black">
                        Add Transactions
                    </Link>
                    <div className="flex w-full md:w-fit gap-[2rem]">
                        <form className="w-full xl:w-fit relative flex items-center text-main-gray-text" onSubmit={(e) => {
                            e.preventDefault();
                            setPage(1)
                            if (typeSearch === "nota") {
                                searchByNota(1)
                            } else if (typeSearch === "customer") {
                                searchByCustomer(1)
                            } else if (typeSearch === "staff") {
                                searchByStaff(1)
                            }
                        }}>
                            <button className="absolute left-[1rem] text-[1.5rem] hover:scale-125 cursor-pointer active:scale-110 duration-300 flex justify-center items-center">
                                <i className='bx bx-search' />
                            </button>
                            <input type="text" placeholder="Search Items" className="w-full xl:w-[400px] shadow-table-black outline-none bg-white py-[.8rem] px-[3rem] rounded-[.8rem] border border-white focus:border-main-gray-border hover:border-main-gray-border duration-300" onChange={(e) => {
                                setSearchValue(e.target.value);
                            }} value={searchValue} />
                            {searchValue.length > 0 &&
                                <i className='bx bx-x absolute right-4 text-[1.5rem] duration-300 hover:bg-main-gray-border rounded-[50%]' onClick={() => { setSearchValue(""); setPage(1) }} />
                            }
                        </form>
                        <select className="flex shrink-0 ml-[-1rem] items-center gap-[.5rem] bg-white py-[.8rem] px-[1rem] rounded-[.8rem] shadow-table-black text-main-gray-text cursor-pointer border border-white hover:border-main-gray-border active:border-white duration-300 outline-none select-none" onChange={(e) => {
                            setTypeSearch(e.target.value)
                        }} value={typeSearch} >
                            <option value="nota" className="text-gray-400">
                                By Nota
                            </option>
                            <option value="customer" className="text-gray-400">
                                By Customer
                            </option>
                            <option value="staff" className="text-gray-400">
                                By Staff
                            </option>
                        </select>
                    </div>
                    <div className={`grid ${filter !== "" ? "grid-cols-2" : "grid-cols-1"} md:flex gap-[1rem] md:gap-[2rem] w-full md:w-fit duration-300`}>
                        {searchValue.length === 0 &&
                            <div className="relative flex items-center justify-center shrink-0">
                                <select className={`flex items-center gap-[.5rem] bg-white w-full md:w-[unset] py-[.8rem] pl-[3rem] pr-[1rem] rounded-[.8rem] shadow-table-black ${filter === "" ? "text-gray-400" : "text-main-gray-text"} cursor-pointer border border-white hover:border-main-gray-border active:border-white duration-300 outline-none`} onChange={(e) => {
                                    setFilter(e.target.value)
                                }} value={filter} >
                                    <option value="" className="text-gray-400">
                                        Pilih Filter
                                    </option>
                                    <option value="status" className="text-main-gray-text">
                                        Status
                                    </option>
                                    <option value="tanggal_masuk" className="text-main-gray-text">
                                        Tanggal Masuk
                                    </option>
                                    <option value="tanggal_keluar" className="text-main-gray-text">
                                        Tanggal Keluar
                                    </option>
                                </select>
                                <i className='bx bx-filter text-[1.5rem] absolute left-[1rem]' />
                            </div>
                        }
                        {searchValue.length === 0 && filter === "status" &&
                            <div className="relative flex items-center justify-center md:w-full pl-[1rem] md:pl-0 min-w-[110px]">
                                <select className="flex w-full shrink-0 ml-[-1rem] items-center gap-[.5rem] bg-white py-[.8rem] px-[1rem] rounded-[.8rem] shadow-table-black text-main-gray-text cursor-pointer border border-white hover:border-main-gray-border active:border-white duration-300 outline-none select-none" onChange={(e) => {
                                    setStatus(e.target.value)
                                }} value={status} >
                                    <option value="selesai" className="text-gray-400">
                                        Selesai
                                    </option>
                                    <option value="proses" className="text-gray-400">
                                        Proses
                                    </option>
                                </select>
                            </div>
                        }
                        {searchValue.length === 0 && filter === "tanggal_masuk" || filter === "tanggal_keluar" ?
                            <input type="date" className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" onChange={(e) => {
                                setTanggal(e.target.value)
                            }} /> : null
                        }
                    </div>
                </div>

                <Link to={"/Transactions/Add"} className="hidden md:block shrink-0 bg-main text-white font-[500] px-[1.5rem] py-[.8rem] rounded-[1rem] hover:bg-main-hover active:bg-main-purple duration-200 shadow-table-black">
                    Add Transactions
                </Link>
            </div>
            <div className="w-full flex flex-col gap-4 bg-white p-8 rounded-2xl relative shadow-lg">
                <div className="flex w-full gap-4 md:justify-between xl:flex-row flex-col items-start">
                    <h4 className='font-[700] whitespace-nowrap w-full md:w-fit text-[1.5rem] text-[#464646] dark:text-white'>
                        Transactions History
                    </h4>
                    <div className="flex gap-2 md:gap-6 md:flex-row flex-col w-full justify-between xl:justify-end">
                        <div className="flex gap-4">
                            <button
                                className="bg-main-purple duration-300 hover:bg-main-purple-hover whitespace-nowrap relative  text-sm text-main font-[500] py-2 px-4 rounded-3xl active:scale-95 md:w-fit w-[160px] capitalize"
                                onClick={() => exportData(`Data Transaksi ${getDateString(new Date())}.xlsx`, "Filter")}
                            >
                                Export Data in This Page
                            </button>
                            <button
                                className="bg-main-purple duration-300 hover:bg-main-purple-hover relative whitespace-nowrap  text-sm text-main font-[500] py-2 px-4 rounded-3xl active:scale-95 md:w-fit w-[160px] capitalize"
                                onClick={() => exportData(`Data Semua Transaksi - ${getDateString(new Date())}.xlsx`, "All")}
                            >
                                Export All Data
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-scroll md:overflow-x-hidden w-full">
                    <table className="w-full border-separate border-spacing-x-0 border-spacing-y-4">
                        <thead>
                            <tr>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">No</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">NOTA</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">CUSTOMER</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">STAFF</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">DATE IN</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">DATE OUT</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">TOTAL HARGA</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">STATUS</th>
                                <th className="lg:text-[1rem] md:text-xs text-[.6rem] font-bold text-main-gray-text uppercase md:py-5 py-2.5 px-2 md:px-2.5">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item: any, i: any) => (
                                <tr key={i}>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:pr-2 md:pl-8 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis  text-center rounded-bl-xl rounded-tl-xl`}>
                                        {(page * 10) + (i + 1) - 10}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        {item.nota}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        {item.customer.nama}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        {item.staff.nama}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        <p>{getDateString(item.tanggal_masuk)}  | {getHours(item.tanggal_masuk)}</p>
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        {item.tanggal_keluar ? <p>{getDateString(item.tanggal_keluar)} | {getHours(item.tanggal_keluar)}</p> : "Belum Diambil"}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        {item.total_harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center`}>
                                        {item.tanggal_keluar ? "Selesai" : "Proses"}
                                    </td>
                                    <td className={`${item.tanggal_keluar ? "bg-[#d6e4f0]" : "bg-[#fff1d6]"} mt-4 md:py-5 py-2.5 md:px-2.5 font-[500] text-[#000]  xl1.5:text-sm xl:text-[.9rem] text-[.6rem] px-2 whitespace-nowrap overflow-hidden text-ellipsis text-center rounded-br-xl rounded-tr-xl`}>
                                        <div className="flex gap-2 w-full justify-center">
                                            <Link to={`/Transactions/Detail/${item.nota}`} className="bg-blue-100 text-blue-600 shadow-table-black py-[.8rem] px-[1rem] font-[600] rounded-[1rem] hover:bg-blue-200 active:bg-blue-100">
                                                Detail
                                            </Link>
                                            <button className="bg-main-pink  shadow-table-black text-main-red py-[.8rem] px-[1rem] font-[600] rounded-[1rem] hover:bg-main-pink-hover active:bg-main-pink"
                                                onClick={() => { setModalDelete((prev: any) => ({ ...prev, title: item.nota, show: true, id: item.nota })) }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* {transData.length === 0 &&
                    <div className="flex w-full justify-center py-12">
                        <h1 className="text-title-lg">Data Not Found</h1>
                    </div>
                } */}
                </div>
            </div>

            <div className="w-full flex justify-between">
                <div className="bg-white rounded-[.8rem] shadow-table-black px-[2rem] py-[.8rem] text-main-gray-text">
                    <p>Total Page : {totalPages}</p>
                </div>
                <div className="flex items-center gap-[1rem] bg-white rounded-[.8rem] overflow-hidden shadow-table-black">
                    <button className="px-[1rem] py-[.8rem] text-main font-[500] bg-main-purple hover:bg-main-purple-hover duration-200 active:bg-main-purple" onClick={() => {
                        if (page > 1) {
                            setPage(page - 1)
                        }
                    }}>
                        Prev
                    </button>
                    <p className="text-main-gray-text">{page}</p>
                    <button className="px-[1rem] py-[.8rem] text-main font-[500] bg-main-purple hover:bg-main-purple-hover duration-200 active:bg-main-purple" onClick={() => {
                        if (page < totalPages) {
                            setPage(page + 1)
                        }
                    }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}