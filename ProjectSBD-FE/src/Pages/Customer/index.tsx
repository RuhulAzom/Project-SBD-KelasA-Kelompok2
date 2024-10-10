import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api_Url } from "../../env";
import HeadingInfoSales from "../../_Component/HeadingInfoSales";
import ModalDelete from "../../_Component/ModalDelete";
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText";
import { getError } from "../../Utils";
import toast from "react-hot-toast";
import EditCustomer from "./EditCustomer";


export default function Customer() {

    const [data, setData] = useState<any>([])
    const [edit, setEdit] = useState<any>({
        value: false,
        data: {}
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<any>({
        id: "",
        title: "",
        show: false,
        delete: false
    })

    const [searchValue, setSearchValue] = useState<string>("")
    const [typeSearch, setTypeSearch] = useState<string>("nama")
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const getCustomer = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/customer?page=${page}`)
            console.log(res)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error: any) {
            console.log("Failed get customer:", error)
            getError(error, "Failed Get customer")
            return error
        }
    }

    const searchByName = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/customer/search?nama=${searchValue}&page=${page}`)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error) {
            console.log("Failed Search Customer:", error)
            getError(error, "Failed Search Customer")
            setData([])
            return error
        }
    }
    const searchByTelp = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/customer/search?telp=${searchValue}&page=${page}`)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error) {
            console.log("Failed Search Customer:", error)
            getError(error, "Failed Search Customer")
            setData([])
            return error
        }
    }
    const searchByAlamat = async (page: number) => {
        try {
            const res = await axios.get(`${Api_Url}/customer/search?alamat=${searchValue}&page=${page}`)
            setTotalPages(res.data.totalPages)
            setData([...res.data.data])
            return;
        } catch (error) {
            console.log("Failed Search Customer:", error)
            getError(error, "Failed Search Customer")
            setData([])
            return error
        }
    }

    useEffect(() => {
        if (searchValue.length === 0) {
            getCustomer(page)
        } else {
            if (typeSearch === "nama") {
                searchByName(page)
            } else if (typeSearch === "telp") {
                searchByTelp(page)
            } else if (typeSearch === "alamat") {
                searchByAlamat(page)
            }
        }
    }, [page])

    useEffect(() => {
        if (searchValue.length === 0) {
            getCustomer(page)
        }
    }, [searchValue])

    const deleteCustomer = async (id: string) => {
        setLoading(true)
        try {
            const res = await axios.delete(`${Api_Url}/customer/delete?id=${id}`)
            setLoading(false)
            console.log(res)
            alert("Succes To Delete Customer")
            setModalDelete((prev: any) => ({ ...prev, show: false, id: "", delete: false }))
        } catch (error) {
            console.log("Failed delete customer:", error)
            setLoading(false)
            alert("Failed To Delete Customer")
            setModalDelete((prev: any) => ({ ...prev, show: false, id: "", delete: false }))
            return error
        }
    }
    const handleDelete = async () => {
        await deleteCustomer(modalDelete.id)
        await getCustomer(page)
    }

    useEffect(() => {
        if (modalDelete.delete) {
            handleDelete()
        }
    }, [modalDelete])

    const refresh = async () => {
        setPage(1)
        await getCustomer(1)
    }

    return (
        <div className="py-[2rem] px-[1rem] md:px-[4rem] flex flex-col gap-[2rem]">

            <ModalDelete data={modalDelete} setDelete={setModalDelete} />
            <LoadingPageWithText heading={`Deleting "${modalDelete.title}"`} loading={loading} />

            {edit.value &&
                <EditCustomer data={edit.data} setEdit={setEdit} refresh={refresh} />
            }

            <HeadingInfoSales />

            <div className="flex items-center justify-between w-full">
                <p className="text-[1.5rem] font-[500] text-main-heading-text">
                    Customer
                </p>
                <Link to={"/Customer/Add"} className="md:hidden shrink-0 bg-main-purple text-main font-[500] px-[1.5rem] py-[.8rem] rounded-[1rem] hover:bg-main-purple-hover active:bg-main-purple duration-200 shadow-table-black">
                    Add Items
                </Link>
            </div>

            <div className="flex w-full items-center justify-between gap-[1rem]">
                <div className="flex items-center gap-[2rem]">
                    <form className="w-full xl:w-fit relative flex items-center text-main-gray-text" onSubmit={(e) => {
                        e.preventDefault();
                        if (searchValue.length === 0) {
                            toast("Masukan Value Search", { icon: "ℹ️" })
                            return;
                        }
                        if (typeSearch === "nama") {
                            setPage(1)
                            searchByName(1)
                        } else if (typeSearch === "telp") {
                            setPage(1)
                            searchByTelp(1)
                        } else if (typeSearch === "alamat") {
                            setPage(1)
                            searchByAlamat(1)
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
                        <option value="nama" className="text-gray-400">
                            By Nama
                        </option>
                        <option value="telp" className="text-gray-400">
                            By No. Telp
                        </option>
                        <option value="alamat" className="text-gray-400">
                            By Alamat
                        </option>
                    </select>
                </div>

                <Link to={"/Customer/Add"} className="hidden md:block shrink-0 bg-main-purple text-main font-[500] px-[1.5rem] py-[.8rem] rounded-[1rem] hover:bg-main-purple-hover active:bg-main-purple duration-200 shadow-table-black">
                    Add Items
                </Link>
            </div>


            <div className="bg-body w-full select-none overflow-x-auto text-[75%] md:text-[unset] rounded-[.8rem] overflow-hidden md:rounded-none md:overflow-auto">
                <table className="w-full shadow-table-black rounded-[.8rem]">
                    <thead>
                        <tr className="border-b border-main-gray-border">
                            <th className={`select-text text-center rounded-tl-[.8rem] bg-white p-[1rem] font-[500] md:text-[1rem]`}>
                                No
                            </th>
                            {/* <th className={`select-text text-center bg-white p-[1rem] font-[500] md:text-[1rem]`}>
                                ID
                            </th> */}
                            <th className={`select-text text-center bg-white p-[1rem] font-[500] md:text-[1rem]`}>
                                Nama
                            </th>
                            <th className={`select-text text-center bg-white p-[1rem] font-[500] md:text-[1rem]`}>
                                No. Telp
                            </th>
                            <th className={`select-text text-center bg-white p-[1rem] font-[500] md:text-[1rem]`}>
                                Alamat
                            </th>
                            <th className={`select-text text-center rounded-tr-[.8rem] bg-white p-[1rem] font-[500] md:text-[1rem]`}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any, i: number) => (
                            <tr key={i} className={`border-b ${i === data.length - 1 && "border-none"} border-main-gray-border`}>
                                <td className={`select-text text-center ${i === (data.length - 1) && "rounded-bl-[.8rem]"} bg-white p-[1rem] md:text-[.9rem] font-[400] text-main-gray-text`}>
                                    {(page * 10) + (i + 1) - 10}
                                </td>
                                {/* <td className={`select-text text-center bg-white p-[1rem] md:text-[.9rem] font-[400] text-main-gray-text`}>
                                    {item.id}
                                </td> */}
                                <td className={`select-text text-center bg-white p-[1rem] md:text-[.9rem] font-[400] text-main-gray-text`}>
                                    {item.nama}
                                </td>
                                <td className={`select-text text-center bg-white p-[1rem] md:text-[.9rem] font-[400] text-main-gray-text`}>
                                    {item.telp}
                                </td>
                                <td className={`select-text text-center bg-white p-[1rem] md:text-[.9rem] font-[400] text-main-gray-text`}>
                                    {item.alamat}
                                </td>
                                <td className={`text-center ${i === (data.length - 1) && "rounded-br-[.8rem]"} bg-white p-[1rem] md:text-[.9rem] font-[400] text-main-gray-text`}>
                                    <div className="flex gap-2 w-full justify-center">
                                        <button className="bg-blue-100 text-blue-600 py-[.8rem] px-[1.5rem] font-[600] rounded-[1rem] hover:bg-blue-200 active:bg-blue-100"
                                            onClick={() => { setEdit({ value: true, data: { ...item } }) }}
                                        >
                                            Edit
                                        </button>
                                        <button className="bg-main-pink text-main-red py-[.8rem] px-[1rem] font-[600] rounded-[1rem] hover:bg-main-pink-hover active:bg-main-pink"
                                            onClick={() => { setModalDelete((prev: any) => ({ ...prev, title: item.nama, show: true, id: item.id })) }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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