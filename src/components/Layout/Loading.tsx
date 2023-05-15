export default function Loading() {
    return (
        <div className="lds-ring relative flex h-full grow items-center justify-center">
            <div className="absolute m-2 box-border block h-16 w-16 rounded-[50%]"></div>
            <div className="absolute m-2 box-border block h-16 w-16 rounded-[50%]"></div>
            <div className="absolute m-2 box-border block h-16 w-16 rounded-[50%]"></div>
            <div className="absolute m-2 box-border block h-16 w-16 rounded-[50%]"></div>
        </div>
    )
}
