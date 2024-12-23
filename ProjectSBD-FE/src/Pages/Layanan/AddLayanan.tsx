import axios from "axios"
import { useState } from "react"
import { Api_Url } from "../../env"
import { Link, useNavigate } from "react-router-dom"
import InputText from "../../_Component/Input/InputText"
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText"


export default function AddLayanan() {

    const navigate = useNavigate()

    const [typePricing, setTypePricing] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const AddLayanan = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${Api_Url}/layanan/add`, {
                layanan: typePricing,
            })
            console.log(res)
            alert("Succes To Add Layanan")
            navigate("/Layanan")
        } catch (error) {
            console.log("Failed to add Layanan :", error)
            alert("Failed To Add Layanan")
            setLoading(false)
            return error;
        }
    }

    return (
        <div className="px-[4rem] py-[2rem]">
            <LoadingPageWithText heading="Adding Layanan...." loading={loading} />
            <Link to={"/Layanan"} className="flex gap-[1rem] justify-start items-center mb-[2rem] hover:bg-main-gray-border cursor-pointer select-none w-fit px-[.8rem] rounded-[1rem] duration-300">
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
                                Insert Data Layanan
                            </h3>
                        </div>
                    </div>
                </div>
                <form className="flex flex-col gap-[1.5rem] p-[1.5rem]">

                    <div className="input-poster">
                        <InputText heading="Name" placeholder="Input Name..." setValue={setTypePricing} value={typePricing} />
                    </div>

                    <div className="flex justify-end p-4">
                        <button
                            type='submit'
                            className="bg-main-purple font-[500] hover:bg-main-hover hover:text-white duration-200 text-main py-[.8rem] px-[1rem] rounded-[.8rem]"
                            onClick={(e) => { AddLayanan(); e.preventDefault() }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

