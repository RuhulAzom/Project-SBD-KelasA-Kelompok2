import { Link, useLocation } from "react-router-dom";
import logo from "../_Assets/logoo.png"
import { LogOut } from "../Utils";


export default function Sidebar() {

    const { pathname } = useLocation()

    return (
        <div className="flex flex-col h-full gap-[4rem] relative">
            <div className="w-full flex justify-center items-center
            ">
                <div className="w-[10rem]">
                    <img src={logo} alt="" />
                </div>
                <p className="font-[700] text-[1.5rem] sansita text-[#464646] mb-[-2.5rem]">
                    OKE LAUNDRY
                </p>
            </div>
            <div className="flex flex-col gap-[.5rem]">
                <Link to={"/"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname === "/" ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bxs-dashboard text-[1.5rem]' />
                    <p>
                        Dashboard
                    </p>
                </Link>
                <Link to={"/Transactions"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Transactions") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bx-transfer-alt text-[1.5rem]' />
                    <p>
                        Transactions
                    </p>
                </Link>
                <Link to={"/Staff"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Staff") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bx-user-pin text-[1.5rem]' />
                    <p>
                        Staff
                    </p>
                </Link>
                <Link to={"/Customer"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Customer") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bx-user-circle text-[1.5rem]' />
                    <p>
                        Customer
                    </p>
                </Link>
                <Link to={"/Detail-Layanan"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Detail-Layanan") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bx-purchase-tag text-[1.5rem]' />
                    <p>
                        Detail Layanan
                    </p>
                </Link>
                <Link to={"/Layanan"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Layanan") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bx-store text-[1.5rem]' />
                    <p>
                        Layanan
                    </p>
                </Link>
                {/* <Link to={"/Settings"} className={`flex items-center gap-[1rem] py-[.8rem] px-[1rem] rounded-[.8rem] ${pathname.includes("/Settings") ? "bg-main-purple text-main" : "text-main-gray-text hover:bg-main-hover hover:text-white duration-300 active:bg-main"}`}>
                    <i className='bx bx-cog text-[1.5rem]' />
                    <p>
                        Settings
                    </p>
                </Link> */}
            </div>

            <div className={`flex items-center gap-[1rem] px-[1rem] rounded-[.8rem] text-main-gray-text hover:text-main duration-300 active:bg-main absolute bottom-0 left-0 w-fit h-fit cursor-pointer`}
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