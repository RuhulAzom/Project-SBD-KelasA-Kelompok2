import contoh from "../_Assets/me4.jpg"

export default function Header() {
    return (
        <div className="flex items-center h-full px-[1rem] justify-between">
            <p className="font-[500] text-main-heading-text text-[1.5rem]">
                Oke Laundry
            </p>
            <div className="flex gap-[1rem] pr-[3rem] items-center">
                <div className="text-end">
                    <p className="text-[.9rem]">
                        Ruhul Azom Pratama
                    </p>
                    <p className="text-[.7rem] text-main-gray-text">
                        Admin
                    </p>
                </div>
                <div className="w-[3rem] h-[3rem] border border-main-gray-border overflow-hidden rounded-[50%]">
                    <img src={contoh} alt="" className="w-full" />
                </div>
            </div>
        </div>
    )
}