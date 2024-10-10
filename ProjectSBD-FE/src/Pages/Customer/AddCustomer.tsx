import axios from "axios"
import { useState } from "react"
import { Api_Url } from "../../env"
import { Link } from "react-router-dom"
import InputText from "../../_Component/Input/InputText"
import LoadingPageWithText from "../../_Component/Loading/LoadingPageText"
import toast from "react-hot-toast"
import { getError } from "../../Utils"


export default function AddCustomer() {

    const [name, setName] = useState<string>("")
    const [telp, setTelp] = useState<string>("")
    const [address, setAddress] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false)

    const AddMembers = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${Api_Url}/customer/add`, {
                nama: name,
                telp,
                alamat: address
            })
            console.log(res)
            toast.success(`Succes To Add ${name} as Customer`, { duration: 3000 })
            setLoading(false)
        } catch (error) {
            console.log("Failed to add Member :", error)
            setLoading(false)
            getError(error, "Failed To Add Customer")
            return error;
        }
    }

    return (
        <div className="px-[1rem] md:px-[4rem] py-[2rem]">
            <LoadingPageWithText heading="Adding Customer...." loading={loading} />
            <Link to={"/Customer"} className="flex gap-[1rem] justify-start items-center mb-[2rem] hover:bg-main-gray-border cursor-pointer select-none w-fit px-[.8rem] rounded-[1rem] duration-300">
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
                                Insert Customer
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
                            onClick={(e) => { AddMembers(); e.preventDefault() }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

