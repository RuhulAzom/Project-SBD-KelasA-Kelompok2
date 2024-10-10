import { Link, useLocation } from "react-router-dom";
import logo from "../_Assets/logoo.png"
import { LogOut } from "../Utils";
import { useContext } from "react";
import { AppContexs } from "../App";
import { ArrowLeft } from "lucide-react"


export default function Sidebar({ setShowSidebar }: { setShowSidebar: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { userData } = useContext(AppContexs)

    const { pathname } = useLocation()

    return (
        <div className="flex flex-col h-full gap-[4rem] relative">
            <div className="absolute top-4 right-4 md:hidden"
                onClick={() => setShowSidebar(false)}
            >
                <ArrowLeft />
            </div>
            <div className="w-full flex flex-col justify-center gap-[.5rem] items-center">
                <div className="w-[7rem]">
                    <img src={logo} alt="" />
                </div>
                <p className="font-[700] text-[1.5rem] sansitaReal text-main-gray-text mb-[-1.8rem] text-center leading-6">
                    <span className="text-[2rem]">Oke Laundry </span> <br /> <span className="text-[1rem]">One Day Service</span>
                </p>
            </div>
            <div className="flex flex-col gap-[.5rem]">
                <Link to={"/"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname === "/" ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                    onClick={() => { setShowSidebar(false) }}
                >
                    <i className='bx bxs-dashboard text-[1.5rem]' />
                    <p>
                        Dashboard
                    </p>
                </Link>
                <Link to={"/Transactions"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Transactions") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                    onClick={() => { setShowSidebar(false) }}
                >
                    <i className='bx bx-transfer-alt text-[1.5rem]' />
                    <p>
                        Transactions
                    </p>
                </Link>
                {userData.role === "Admin" &&
                    <Link to={"/Staff"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Staff") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                        onClick={() => { setShowSidebar(false) }}
                    >
                        <i className='bx bx-user-pin text-[1.5rem]' />
                        <p>
                            Staff
                        </p>
                    </Link>
                }
                <Link to={"/Customer"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Customer") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                    onClick={() => { setShowSidebar(false) }}
                >
                    <i className='bx bx-user-circle text-[1.5rem]' />
                    <p>
                        Customer
                    </p>
                </Link>
                <Link to={"/Detail-Layanan"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Detail-Layanan") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                    onClick={() => { setShowSidebar(false) }}
                >
                    <i className='bx bx-purchase-tag text-[1.5rem]' />
                    <p>
                        Detail Layanan
                    </p>
                </Link>
                {/* <Link to={"/Layanan"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Layanan") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                    onClick={()=>{setShowSidebar(false)}}
                >
                    <i className='bx bx-store text-[1.5rem]' />
                    <p>
                        Layanan
                    </p>
                </Link> */}
                {/* <Link to={"/Settings"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Settings") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}
                    onClick={()=>{setShowSidebar(false)}}
                >
                    <i className='bx bx-cog text-[1.5rem]' />
                    <p>
                        Settings
                    </p>
                </Link> */}
            </div>

            <div className={`flex items-center gap-[1rem] px-[1rem] rounded-[.8rem] text-main-gray-text hover:text-main duration-300 active:bg-main absolute bottom-8 md:bottom-0 left-0 w-fit h-fit cursor-pointer`}
                onClick={() => LogOut()}
            >
                <i className='bx bx-log-out-circle text-[1.5rem]' />
                <p>
                    Sign Out
                </p>
            </div>
        </div>
    )
}