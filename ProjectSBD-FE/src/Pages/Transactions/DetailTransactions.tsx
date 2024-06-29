import axios from "axios"
import { useEffect, useState } from "react"
import { Api_Url } from "../../env"
import { Link, useNavigate, useParams } from "react-router-dom"
import InputText from "../../_Component/Input/InputText"
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText"
import InputNumber from "../../_Component/Input/InputNumber"
import InputSelect from "../../_Component/Input/InputSelect"
import { getDate, getDateString, getError, getHours } from "../../Utils"
import logo from "../../_Assets/logoo.png"
import toast from "react-hot-toast"


export default function DetailTransactions() {

    const navigate = useNavigate()
    const { nota } = useParams()
    console.log(nota)

    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    const getDetailTransaction = async () => {
        try {
            const res = await axios.get(`${Api_Url}/transaksi/detail/${nota}`)
            console.log(res)
            setData({ ...res.data.data })
            return;
        } catch (error) {
            console.log("Failed get Detail Transactions:", error)
            return error
        }
    }
    const handleTransactionEditStatus = async () => {
        try {
            const res = await axios.put(`${Api_Url}/transaksi`, {
                nota
            })
            console.log(res)
            if (res.status === 200) {
                getDetailTransaction()
            }
            return;
        } catch (error) {
            console.log("Failed edit Transactions:", error)
            throw error
        }
    }

    useEffect(() => {
        getDetailTransaction()
    }, [])


    const handlePrint = () => {
        const print = document.getElementById("printDiv") as HTMLDivElement;
        const content = document.getElementById("content") as HTMLDivElement;
        print.classList.add("flex", "h-[100vh]", "justify-center", "items-center", "p-[1rem]")

        content.classList.remove("shadow-xl")
        content.classList.add("shadow-print")
        const printContents = print.outerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();  // To reload the page and restore original content after printing
    };

    return (
        <div className="px-[4rem] py-[2rem] flex flex-col items-center">
            <LoadingPageWithText heading="Adding Transactions...." loading={loading} />
            <div className="w-full flex mb-[1rem] justify-between">
                <Link to={"/Transactions"} className="flex gap-[1rem] justify-start items-center hover:bg-main-gray-border cursor-pointer select-none w-fit px-[.8rem] rounded-[1rem] duration-300">
                    <i className='bx bx-arrow-back text-[1.5rem]' />
                    <p className="text-[1.5rem]">
                        Back
                    </p>
                </Link>
                <div className="flex items-center gap-[1rem]">
                    {!data?.tanggal_keluar &&
                        <button className="flex items-center gap-[.5rem] bg-main-hover px-[1.5rem] py-[.8rem] rounded-[2rem] font-[500] text-white duration-300 hover:bg-[#5d5fef9d]" onClick={() => {
                            toast.promise(
                                handleTransactionEditStatus(),
                                {
                                    loading: 'Changing Transaction Status...',
                                    success: <b>Transaction {nota} is Done!</b>,
                                    error: <b>Could not change transaction status.</b>,
                                },
                                {
                                    duration: 5000
                                }
                            );
                        }}>
                            Ubah Status Pesananan Selesai
                        </button>
                    }
                    <button className="flex items-center gap-[.5rem] bg-main-hover px-[1.5rem] py-[.8rem] rounded-[2rem] font-[500] text-white duration-300 hover:bg-[#5d5fef9d]" onClick={() => { handlePrint() }}>
                        <i className='bx bx-printer text-[1.5rem]'></i>
                        Print
                    </button>
                </div>
            </div>
            <div id="printDiv" className="w-full max-w-[800px]">
                <div id="content" className="rounded-sm bg-white shadow-xl w-full">
                    <div className="flex p-[1rem] items-center justify-between text-[1.2rem] font-[500] border-b border-main-gray-border select-none">
                        <div className="flex gap-[.5rem] items-center">
                            <img src={logo} alt="" className="w-[3rem] mt-[-.7rem]" />
                            <p className="sansita text-main-gray-text select-text">Oke Laundry</p>
                        </div>
                        <p className="sansita select-text"><span className="text-main-gray-text ">Nota :</span> {nota}</p>
                    </div>
                    <div className="p-[2rem] flex flex-col gap-[1rem]">
                        <div id="staff" className="flex flex-col">
                            <div className="bg-main-hover px-[1rem] py-[.5rem] text-white font-[600]">
                                <p>Staff</p>
                            </div>
                            <div className="grid grid-cols-3 border border-b-0 border-main-gray-border">
                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Nama</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.staff?.nama}</p>
                                </div>

                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Nomor Telp</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.staff?.telp}</p>
                                </div>

                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Alamat</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.staff?.alamat}</p>
                                </div>
                            </div>
                        </div>
                        <div id="customer" className="flex flex-col">
                            <div className="bg-main-hover px-[1rem] py-[.5rem] text-white font-[600]">
                                <p>Customer</p>
                            </div>
                            <div className="grid grid-cols-3 border border-b-0 border-main-gray-border">
                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Nama</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.customer?.nama}</p>
                                </div>

                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Nomor Telp</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.customer?.telp}</p>
                                </div>

                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Alamat</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.customer?.alamat}</p>
                                </div>

                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Tanggal Masuk</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{getDateString(data?.tanggal_masuk)} | {getHours(data?.tanggal_masuk)}</p>
                                </div>

                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Tanggal Keluar</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.tanggal_keluar ? <>{getDateString(data?.tanggal_keluar)} | {getHours(data?.tanggal_keluar)}</> : "Belum Diambil"}</p>
                                </div>
                                <div id="title" className="col-span-1 px-[1rem] py-[.2rem] font-[600] border-b border-main-gray-border">
                                    <p>Status</p>
                                </div>
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                    <p className="break-words">{data?.tanggal_keluar ? <span className="font-[600] text-green-600">Selesai</span> : <span className="font-[600] text-red-600">Prosess...</span>}</p>
                                </div>
                            </div>
                        </div>
                        <div id="order" className="flex flex-col">
                            <div className="bg-main-hover px-[1rem] py-[.5rem] text-white font-[600]">
                                <p>Order</p>
                            </div>
                            <div className="grid grid-cols-3 border border-b-0 border-main-gray-border">
                                <div id="title" className="px-[1rem] py-[.2rem] bg-main-gray-border font-[600]">
                                    <p>Layanan</p>
                                </div>
                                <div id="field" className="px-[1rem] py-[.2rem] bg-main-gray-border font-[600]">
                                    <p>Berat/Jumlah</p>
                                </div>
                                <div id="field" className="px-[1rem] py-[.2rem] bg-main-gray-border font-[600]">
                                    <p>Total Harga</p>
                                </div>
                            </div>


                            {data?.transaksi_detail?.map((item: any, i: number) => (
                                <div key={i} className="grid grid-cols-3 border-main-gray-border">
                                    <div id="field" className="px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                        <p className="break-words">{item.layanan.layanan_detail}</p>
                                    </div>
                                    <div id="field" className="px-[1rem] py-[.2rem] border-l border-b border-main-gray-border">
                                        <div>
                                            {item.berat ?
                                                <p className="break-words">{item.berat} Kg</p>
                                                :
                                                <p className="break-words">{item.jumlah_barang} Helai</p>
                                            }
                                        </div>
                                    </div>
                                    <div id="field" className="px-[1rem] py-[.2rem] border-l border-b border-r border-main-gray-border">
                                        <p className="break-words">{item.total_harga.toLocaleString("id-Id", { style: "currency", currency: "IDR" })}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="grid grid-cols-3 border-main-gray-border">
                                <div id="field" className="col-span-2 px-[1rem] py-[.2rem] border-l border-b border-main-gray-border bg-main-gray-border2 font-[600]">
                                    <p className="break-words text-center">Total Harga</p>
                                </div>
                                <div id="field" className="col-span-1 px-[1rem] py-[.2rem] border-l border-b border-r border-main-gray-border bg-main-gray-border2 font-[600]">
                                    <p className="break-words">{data?.total_harga?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-main-gray-border p-[1rem] text-[1.2rem] font-[500] flex justify-between">
                        <p className="sansita text-main-gray-text">One Day Service - Oke Laundry</p>
                        <p className="sansita text-main-gray-text">Jl. Prof.Dr.M.Hatta No.83</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
