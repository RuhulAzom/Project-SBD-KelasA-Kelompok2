export default function InputText({ heading, placeholder, setValue, value, disabled }: any) {
    return (
        <>
            {disabled ?
                <div className="input-poster flex flex-col gap-[.5rem]">
                    <p>
                        {heading}
                    </p>
                    <input type="text" placeholder={`${placeholder}`} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" onChange={(e) => setValue(e.target.value)} value={value} disabled />
                </div>
                :
                <div className="input-poster flex flex-col gap-[.5rem]">
                    <p>
                        {heading}
                    </p>
                    <input type="text" placeholder={`${placeholder}`} className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full" onChange={(e) => setValue(e.target.value)} value={value} />
                </div>
            }
        </>
    )
}