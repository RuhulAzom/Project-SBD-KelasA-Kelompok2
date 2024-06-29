export default function InputSelect({ heading, option, setValue, value }: any) {
    return (

        <div className="input-poster flex flex-col gap-[.5rem]">
            <p>
                {heading}
            </p>
            <select className="px-[1rem] py-[.7rem] rounded-[.5rem] outline-none border border-main-gray-border w-full text-gray-400" >
                <option value="" className="text-gray-400">
                    Pilih Layanan
                </option>
                {option?.map((item: any, i: number) => (
                    <option value={item.id_layanan} className="text-black"
                        onClick={() =>
                            setValue({ ...item })}
                    >
                        {item.nama}
                    </option>
                ))}
            </select>
        </div>
    )
}