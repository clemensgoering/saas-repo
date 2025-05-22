"use client"

export function SectionHeader({title, subtitle} : { title:string, subtitle?:string}) {
    return (
        <div className="border-b border-gray-200 my-10">
            <div className="-mt-2 -ml-2 flex flex-wrap items-baseline">
                <h3 className="mt-2 ml-2 text-base font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 ml-2 truncate text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
    )
}
