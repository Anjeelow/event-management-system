'use client'

import Link from "next/link"

export default function BottomNavbar() {
    return (
        <div className="border bg-white flex justify-center fixed bottom-0 w-full z-50">
            <div className="flex flex-col px-5 gap-5 py-5 w-full" style={{maxWidth: '64rem'}}>
                <div className="grid gap-5 md:grid-cols-[3fr_2fr] xl:grid-cols-[4fr_2fr]">
                    <div className="hidden md:block">
                    </div>
                    <div>
                        <div className="flex gap-5 text-black items-center">
                            <button type="button" className="w-full border border-blue-700 text-blue-700 bg-white hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 ">
                                Share
                            </button>
                            <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600">
                                Attend
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}