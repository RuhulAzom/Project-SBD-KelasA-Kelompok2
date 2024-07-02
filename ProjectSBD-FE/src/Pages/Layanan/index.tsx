import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api_Url } from "../../env";
import HeadingInfoSales from "../../_Component/HeadingInfoSales";
import ModalDelete from "../../_Component/ModalDelete";
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText";


export default function Layanan() {

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<any>({
        id: "",
        title: "",
        show: false,
        delete: false
    })

    const getLayanan = async () => {
        try {
            const res = await axios.get(`${Api_Url}/layanan`)
            console.log(res)
            setData([...res.data.data])
        } catch (error) {
            console.log("Failed get Layanan:", error)
            return error
        }
    }

    useEffect(() => {
        getLayanan()
    }, [])

    const deleteLayanan = async (id: string) => {
        setLoading(true)
        try {
            const res = await axios.delete(`${Api_Url}/layanan/delete?id=${id}`)
            setLoading(false)
            console.log(res)
            alert("Succes To Delete Layanan")
            setModalDelete((prev: any) => ({ ...prev, show: false, id: "", delete: false }))
        } catch (error) {
            console.log("Failed delete Layanan:", error)
            setLoading(false)
            alert("Failed To Delete Layanan")
            setModalDelete((prev: any) => ({ ...prev, show: false, id: "", delete: false }))
            return error
        }
    }
    const handleDelete = async () => {
        console.log(modalDelete)
        await deleteLayanan(modalDelete.id)
        await getLayanan()
    }

    useEffect(() => {
        if (modalDelete.delete) {
            handleDelete()
        }
    }, [modalDelete])

    return (
        <div className="py-[2rem] px-[4rem] flex flex-col gap-[2rem]">

            <ModalDelete data={modalDelete} setDelete={setModalDelete} />
            <LoadingPageWithText heading={`Deleting "${modalDelete.title}"`} loading={loading} />


            <HeadingInfoSales />

            <div className="">
                <p className="text-[1.5rem] font-[500] text-main-heading-text">
                    Layanan
                </p>
            </div>

            <div className="flex w-full items-center justify-between gap-[1rem]">
                <div className="flex items-center gap-[2rem]">
                    <div className="w-fit relative flex items-center text-main-gray-text">
                        <i className='bx bx-search absolute left-[1rem] text-[1.5rem] hover:scale-125 cursor-pointer active:scale-110 duration-300' />
                        <input type="text" placeholder="Search Items" className="w-[400px] shadow-table-black outline-none bg-white py-[.8rem] pl-[3rem] rounded-[.8rem] border border-white focus:border-main-gray-border hover:border-main-gray-border duration-300" />
                    </div>
                    <button className="flex items-center gap-[.5rem] bg-white py-[.8rem] px-[1rem] rounded-[.8rem] shadow-table-black text-main-gray-text cursor-pointer border border-white hover:border-main-gray-border active:border-white duration-300">
                        <i className='bx bx-filter text-[1.5rem]' />
                        <p>Filter</p>
                    </button>
                </div>

                <Link to={"/Layanan/Add"} className="shrink-0 bg-main-purple text-main font-[500] px-[1.5rem] py-[.8rem] rounded-[1rem] hover:bg-main-purple-hover active:bg-main-purple duration-200 shadow-table-black">
                    Add Items
                </Link>
            </div>


            <div className="bg-body w-full select-none">
                <table className="w-full shadow-table-black rounded-[.8rem]">
                    <thead>
                        <tr className="border-b border-main-gray-border">
                            <th className={`select-text text-center rounded-tl-[.8rem] bg-white p-[1rem] font-[500] text-[1rem]`}>
                                No
                            </th>
                            <th className={`select-text text-center bg-white p-[1rem] font-[500] text-[1rem]`}>
                                ID
                            </th>
                            <th className={`select-text text-center bg-white p-[1rem] font-[500] text-[1rem]`}>
                                Layanan
                            </th>
                            <th className={`select-text text-center rounded-tr-[.8rem] bg-white p-[1rem] font-[500] text-[1rem]`}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any, i: number) => (
                            <tr key={i} className={`border-b ${i === data.length - 1 && "border-none"} border-main-gray-border`}>
                                <td className={`select-text text-center ${i === (data.length - 1) && "rounded-bl-[.8rem]"} bg-white p-[1rem] text-[.9rem] font-[400] text-main-gray-text`}>
                                    {i + 1}
                                </td>
                                <td className={`select-text text-center bg-white p-[1rem] text-[.9rem] font-[400] text-main-gray-text`}>
                                    {item.id_layanan}
                                </td>
                                <td className={`select-text text-center bg-white p-[1rem] text-[.9rem] font-[400] text-main-gray-text`}>
                                    {item.layanan}
                                </td>
                                <td className={`text-center ${i === (data.length - 1) && "rounded-br-[.8rem]"} bg-white p-[1rem] text-[.9rem] font-[400] text-main-gray-text`}>
                                    <div className="flex gap-2 w-full justify-center">
                                        {/* <button className="bg-main-yellow text-main-orange py-[.8rem] px-[1rem] font-[600] rounded-[1rem] hover:bg-main-yellow-hover active:bg-main-yellow">
                                            Detail
                                        </button> */}
                                        <button className="bg-main-pink text-main-red py-[.8rem] px-[1rem] font-[600] rounded-[1rem] hover:bg-main-pink-hover active:bg-main-pink"
                                            onClick={() => { setModalDelete((prev: any) => ({ ...prev, title: item.name, show: true, id: item.id_layanan })) }}
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

        </div>
    )
}