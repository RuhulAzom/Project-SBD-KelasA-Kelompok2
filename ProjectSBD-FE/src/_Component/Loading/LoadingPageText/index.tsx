import "./style.css"

// export default function LoadingPageWithText() {
//     return (
//         <div className="fixed top-0 left-0 w-full h-full z-[201] flex justify-center items-center bg-[#ffffff52] backdrop-blur-[6px]">
//             <div className="flex flex-col-reverse items-center text-center">
//                 <p className="text-[1.5rem]">
//                     Deleting Data....
//                 </p>
//                 <div className="loading text-main">
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                     <div></div>
//                 </div>

//             </div>
//         </div>
//     )
// }

export default function LoadingPageWithText({ heading, loading }: { heading: string, loading: boolean }) {
    return (
        <>
            {loading &&
                <div className="fixed top-0 left-0 w-full h-full z-[201] flex justify-center items-center bg-[#ffffff52] backdrop-blur-[6px] select-none">
                    <div className="flex flex-col gap-[.5rem] items-center text-center">
                        <div className="loading text-main-heading-text">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <p className="text-[1.3rem] text-main-heading-text">
                            {heading}
                        </p>

                    </div>
                </div>
            }
        </>
    )
}