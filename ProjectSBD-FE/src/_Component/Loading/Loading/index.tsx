import "./style.css"
export default function Loading({ loading }: { loading: boolean }) {
    return (
        <>
            {loading &&
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </>
    )
}