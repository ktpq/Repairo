"use client"
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import Reported from "@/app/components/dorm/Reported";
import Completed from "@/app/components/dorm/Completed";
export default function Dorm() {
    const [page, setPage] = useState(0);


    return (
        <div>
            <Navbar />

            <div className="grid grid-cols-12 my-28">
                <div className="col-span-1"></div>

                <div className="col-span-10">

                    <div className="flex items-center justify-between">
                        <h1 className="text-[#3674B5] font-bold text-5xl">Dormitory A</h1>
                        <Link href="/report-form" className="flex items-center space-x-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-[#3674B5] text-white rounded-xl hover:bg-[#E61D1D] transition cursor-pointer"

                            >
                                Report New Issue
                            </button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-12 gap-4 mt-10">
                        <div className="col-span-5">
                            <button
                                type="button"
                                className={`w-full h-full px-4 py-2  text-xl font-bold rounded-xl transition cursor-pointer
    ${page === 1 ? "bg-[#EFEFEF] text-[#9F9F9F]" : "bg-[#3674B5] text-white hover:bg-sky-600"}`}
                                onClick={() => setPage(0)}
                            >
                                Reported
                            </button>
                        </div>
                        <div className="col-span-5">
                            <button
                                type="button"
                                className={`w-full h-full px-4 py-2  text-xl font-bold rounded-xl transition cursor-pointer
    ${page === 0 ? "bg-[#EFEFEF] text-[#9F9F9F]" : "bg-[#3674B5] text-white hover:bg-sky-600"}`}
                                
                                onClick={() => setPage(1)}
                            >
                                Completed
                            </button>
                        </div>
                        <div className="col-span-2">
                            <button
                                type="button"
                                className="w-full h-full px-2 py-2 flex justify-center bg-[#EFEFEF] text-white rounded-xl hover:bg-gray-300 transition cursor-pointer"
                            >
                                <Image
                                    src={"/contact-icon.png"}
                                    alt="contact-icon"
                                    width={20}
                                    height={20}
                                    className="h-8 w-8 flex items-center"
                                />
                            </button>
                        </div>

                    </div>
                    {page == 0 ?
                        <Reported />
                        :
                        <Completed />
                    }


                </div>


                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
