import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { Api_Url } from "../../env"
import { getError } from "../../Utils"
import Loading from "../../_Component/Loading/Loading"


export default function EditStaff({ data, setEdit, refresh }: any) {


    const [name, setName] = useState<string>(data.nama || "")
    const [telp, setTelp] = useState<string>(data.telp || "")
    const [alamat, setAlamat] = useState<string>(data.alamat || "")
    const [loading, setLoading] = useState<boolean>(false)
    console.log(data)

    const editData = async () => {
        setLoading(true)
        try {
            const res = await axios.put(`${Api_Url}/staff/edit`, {
                id: data.id,
                nama: name,
                telp,
                alamat
            })
            console.log(res)
            toast.success(`Succes To Edit Staff`, { duration: 3000 })
            refresh()
            setLoading(false)
            setEdit({ value: false, data: {} })
            return;
        } catch (error: any) {
            console.log("Failed to Edit Staff :", error)
            getError(error, "Failed to Edit Staff")
            setLoading(false)
            return error;
        }
    }

    return (
        <div className="fixed top-0 left-0 z-[100] w-full h-full bg-[#ffffff01] backdrop-blur-[8px] flex justify-center items-center">
            <div className="bg-white p-[3rem] shadow-default-black rounded-[1rem] flex flex-col gap-[2rem] relative w-[90%] md:w-full max-w-[400px]">
                <i className="bx bx-x absolute top-4 right-4 text-[1.5rem] hover:bg-main-gray-border rounded-[50%] duration-300" onClick={() => { setEdit({ value: false, data: {} }) }} />
                <h1 className="text-[1.1rem] font-[600] text-main-gray-text text-center">
                    Edit Staff
                </h1>
                <form className="flex flex-col gap-[1rem]">
                    <div id="nama" className="text-[.9rem] flex flex-col gap-[.2rem]">
                        <p>Nama Staff</p>
                        <input type="text" placeholder="Input Nama Staff.." className="outline-none border border-black rounded-[.1rem] px-[1rem] py-[.5rem] w-full" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div id="nama" className="text-[.9rem] flex flex-col gap-[.2rem]">
                        <p>No. Telp</p>
                        <input type="number" placeholder="Input No. Telp.." className="outline-none border border-black rounded-[.1rem] px-[1rem] py-[.5rem] w-full" value={telp} onChange={(e) => setTelp(e.target.value)} />
                    </div>

                    <div id="nama" className="text-[.9rem] flex flex-col gap-[.2rem]">
                        <p>Alamat</p>
                        <input type="text" placeholder="Input Alamat.." className="outline-none border border-black rounded-[.1rem] px-[1rem] py-[.5rem] w-full" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-[1rem] w-full">
                        {!loading &&
                            <div className="mt-[2rem] bg-transparent border border-blue-500 hover:bg-blue-100 duration-300 text-blue-600 font-[500] h-[50px] w-full flex justify-center items-center cursor-pointer" onClick={() => { setEdit({ value: false, data: {} }) }}>
                                Cancel
                            </div>
                        }
                        {!loading ?
                            <button className="mt-[2rem] bg-blue-500 hover:bg-blue-400 duration-300 text-white font-[500] h-[50px] w-full" onClick={() => { editData() }}>
                                Save Data
                            </button>
                            :
                            <div className="flex mt-[2rem] justify-center items-center w-full text-blue-600">
                                <Loading loading={loading} />
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}