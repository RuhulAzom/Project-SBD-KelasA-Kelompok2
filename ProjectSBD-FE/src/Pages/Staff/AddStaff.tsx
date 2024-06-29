import axios from "axios"
import { useEffect, useState } from "react"
import { Api_Url } from "../../env"
import { Link, useNavigate } from "react-router-dom"
import InputText from "../../_Component/Input/InputText"
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText"
import InputNumber from "../../_Component/Input/InputNumber"


export default function AddStaff() {

    const navigate = useNavigate()

    const [name, setName] = useState<string>("")
    const [telp, setTelp] = useState<string>("")
    const [address, setAddress] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)

    const AddStaff = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${Api_Url}/staff/add`, {
                nama: name,
                telp,
                alamat: address
            })
            console.log(res)
            alert("Succes To Add Staff")
            navigate("/Staff")
        } catch (error) {
            console.log("Failed to add Employee :", error)
            alert("Failed To Add Staff")
            setLoading(false)
            return error;
        }
    }

    // const getTypePricing = async () => {
    //     try {
    //         const res = await axios.get(`${Api_Url}/type-pricing`)
    //         console.log(res)
    //         setOption([...res.data.data])
    //     } catch (error) {
    //         console.log("Failed get Employee:", error)
    //         return error
    //     }
    // }

    // useEffect(() => {
    //     getTypePricing()
    // }, [])

    return (
        <div className="px-[4rem] py-[2rem]">
            <LoadingPageWithText heading="Adding Staff...." loading={loading} />
            <Link to={"/Staff"} className="flex gap-[1rem] justify-start items-center mb-[2rem] hover:bg-main-gray-border cursor-pointer select-none w-fit px-[.8rem] rounded-[1rem] duration-300">
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
                                Insert Staff Data
                            </h3>
                        </div>
                    </div>
                </div>
                <form className="flex flex-col gap-[1.5rem] p-[1.5rem]">

                    <div className="input-name">
                        <InputText heading="Name" placeholder="Input Name..." setValue={setName} value={name} />
                    </div>
                    <div className="input-name">
                        <InputText heading="No. Telp" placeholder="Input No. Telp..." setValue={setTelp} value={telp} />
                    </div>
                    <div className="input-name">
                        <InputText heading="Address" placeholder="Input Address..." setValue={setAddress} value={address} />
                    </div>

                    <div className="flex justify-end p-4">
                        <button
                            type='submit'
                            className="bg-main-purple font-[500] hover:bg-main-hover hover:text-white duration-200 text-main py-[.8rem] px-[1rem] rounded-[.8rem]"
                            onClick={(e) => { AddStaff(); e.preventDefault() }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

