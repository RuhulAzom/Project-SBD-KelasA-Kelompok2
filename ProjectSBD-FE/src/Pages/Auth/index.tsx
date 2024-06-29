import axios from "axios"
import { Api_Url } from "../../env"
import { useState } from "react"
import { getError } from "../../Utils"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import { userData } from "../../App"
import LoginFrame from "../../_Assets/Login.png"
import Loading from "../../_Component/Loading/Loading"


export default function Auth() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`${Api_Url}/login`, {
                username,
                password
            })
            console.log(res)
            if (res.status === 200) {
                toast.success(`Success To Login`, { duration: 3000 })
                Cookies.set("token", `${res.data.token}`)
                setTimeout(() => {
                    window.location.pathname = "/"
                }, 1000);
            }
            setLoading(false)
            return;
        } catch (error) {
            console.log("Error in login", error)
            getError(error, "Failed to Login")
            setLoading(false)
            throw error;
            return
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full">
            <img src={LoginFrame} alt="" className="h-full w-full max-w-[unset]" />
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#ffffff17] backdrop-blur-[10px]">
                <div className="bg-[#ffffffa6] w-fit p-[3rem] shadow-default rounded-[2rem]">
                    <div id="heading" className="whitespace-nowrap mb-[2rem]">
                        {/* <p className="text-main-green-dark font-[600] text-[1rem] sm:text-[1.5rem]">
                    WELCOME TO
                </p> */}
                        <h1 className="text-[2.5rem] sm:text-[4rem] sansita font-[700] text-main-green-dark leading-[2.5rem] sm:leading-[4rem]">
                            OKE LAUNDRY
                        </h1>
                        <p className="text-green-600">
                            Buat Akunmu
                        </p>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin()
                        // toast.promise(
                        //     handleLogin(),
                        //     {
                        //         loading: 'Trying To Login...',
                        //         success: <p>Succesfully Logged In</p>,
                        //         error: (err: any) => <p>{err.response.data.message ? err.response.data.message : "Failed to Login"}</p>,
                        //     },
                        //     { duration: 5000 }
                        // );
                    }} className="flex flex-col gap-[1rem]">
                        <div className="flex flex-col gap-[.5rem]">
                            <p className="font-[500]">
                                Username
                            </p>
                            <input type="text" placeholder="Input Username..." onChange={(e) => setUsername(e.target.value)} value={username} className="outline-none border-[1.5px] border-main-gray-border py-[.8rem] px-[2rem] w-full rounded-[2rem]" required />
                        </div>
                        <div className="flex flex-col gap-[.5rem]">
                            <p className="font-[500]">
                                Password
                            </p>

                            <div className="relative flex items-center">
                                <input type={`${showPassword ? "text" : "password"}`} placeholder="Masukan Password..." className="outline-none border-[1.5px] border-main-gray-border py-[.8rem] px-[2rem] w-full rounded-[2rem]" onChange={(e) => setPassword(e.target.value)} value={password} required />
                                <i className={`bx ${!showPassword ? "bx-show" : "bx-low-vision"} absolute text-[1.5rem] cursor-pointer hover:text-main-green-1 right-[1rem]`}
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>
                        </div>
                        {loading ?
                            <div className="flex justify-center items-center text-main mt-[1rem]">
                                <Loading loading={loading} />
                            </div>
                            :
                            <button className="bg-main duration-300 hover:bg-main-hover text-white h-[50px] mt-[1rem]">
                                Sign In
                            </button>
                        }
                        <div id="waves" className="text-[.9rem] flex justify-center text-center">
                            <div className="w-[280px]">By logging in you are agree to our privacy policy & terms of service</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}