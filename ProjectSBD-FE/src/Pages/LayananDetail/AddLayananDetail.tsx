import axios from "axios"
import { useEffect, useState } from "react"
import { Api_Url } from "../../env"
import { Link } from "react-router-dom"
import InputText from "../../_Component/Input/InputText"
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText"
import InputNumber from "../../_Component/Input/InputNumber"
import toast from "react-hot-toast"
import { getError } from "../../Utils"


export default function AddLayananDetail() {

    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [IdLayanan, setIdLayanan] = useState<string>("")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [Layanan, setLayanan] = useState<string>("")

    const [option, setOption] = useState<any>([])

    const [loading, setLoading] = useState<boolean>(false)

    const AddLayananDetail = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${Api_Url}/layanan-detail/add`, {
                layanan_detail: name,
                harga: parseFloat(price),
                id_layanan: IdLayanan,
            })
            console.log(res)
            toast.success(`Succes To Add Layanan Detail`, { duration: 3000 })
            setLoading(false)
            // navigate("/Detail-Layanan")
            return;
        } catch (error: any) {
            console.log("Failed to add Layanan Detail :", error)
            getError(error, "Failed to Add Layanan Detail")
            setLoading(false)
            return error;
        }
    }

    const getLayanan = async () => {
        try {
            const res = await axios.get(`${Api_Url}/layanan`)
            console.log(res)
            setOption([...res.data.data])
        } catch (error) {
            console.log("Failed get Layanan Detail:", error)
            return error
        }
    }

    useEffect(() => {
        getLayanan()
    }, [])

    return (
        <div className="px-[1rem] md:px-[4rem] py-[2rem]">
            <LoadingPageWithText heading="Adding Layanan Detail...." loading={loading} />
            <Link to={"/Detail-Layanan"} className="flex gap-[1rem] justify-start items-center mb-[2rem] hover:bg-main-gray-border cursor-pointer select-none w-fit px-[.8rem] rounded-[1rem] duration-300">
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
                                Insert List Pricing
                            </h3>
                        </div>
                    </div>
                </div>
                <form className="flex flex-col gap-[1.5rem] p-[1.5rem]">

                    <div className="input-name">
                        <InputText heading="Name" placeholder="Input Name..." setValue={setName} value={name} />
                    </div>
                    <div className="input-price">
                        <InputNumber heading="Price" placeholder="Input Price..." setValue={setPrice} value={price} />
                    </div>
                    <div className="input-type">
                        <div className="input-poster flex flex-col gap-[.5rem]">
                            <p>
                                Layanan
                            </p>
                            <select className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full text-gray-400" onChange={(e) => {
                                setIdLayanan(e.target.value)
                            }} value={IdLayanan} >
                                <option value="" className="text-gray-400">
                                    Pilih Layanan
                                </option>
                                {option?.map((item: any, i: number) => (
                                    <option key={i} value={item.id_layanan} className="text-black"
                                    >
                                        {item.layanan}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end p-4">
                        <button
                            type='submit'
                            className="bg-main-purple font-[500] hover:bg-main-hover hover:text-white duration-200 text-main py-[.8rem] px-[1rem] rounded-[.8rem]"
                            onClick={(e) => { AddLayananDetail(); e.preventDefault() }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

