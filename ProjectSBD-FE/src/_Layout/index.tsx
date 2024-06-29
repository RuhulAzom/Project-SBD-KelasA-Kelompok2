import { useLocation } from "react-router-dom";
import Header from "../_Component/Header";
import Sidebar from "../_Component/Sidebar";


export default function Layout({ children }: any) {
    const { pathname } = useLocation()

    return (
        <>
            {pathname.includes("Login") ?
                <>{children}</>
                :
                <div className="ml-[300px] mt-[80px]">
                    <div id="header" className="fixed z-[99] h-[80px] top-0 left-0 w-full border-b border-main-gray-border bg-white pl-[300px]">
                        <Header />
                    </div>
                    <div id="sidebar" className="fixed top-0 left-0 h-full w-[300px] bg-white p-[2rem] border-r border-main-gray-border z-[100]">
                        <Sidebar />
                    </div>
                    {children}
                </div>
            }
        </>
    )
}