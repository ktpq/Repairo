"use client"
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import Reported from "@/app/components/dorm/Reported";
import Completed from "@/app/components/dorm/Completed";
import Contact from "@/app/components/dorm/Contact";

export default function OwnedDorm() {
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
                                    ${page === 0
                                        ? "bg-[#3674B5] text-white"
                                        : page === 1
                                            ? "bg-[#EFEFEF] text-[#9F9F9F]"
                                            : "bg-[#EFEFEF] text-[#9F9F9F]"}`}
                                onClick={() => setPage(0)}
                            >
                                Reported
                            </button>
                        </div>
                        <div className="col-span-5">
                            <button
                                type="button"
                                className={`w-full h-full px-4 py-2  text-xl font-bold rounded-xl transition cursor-pointer 
                                    ${page === 0
                                        ? "bg-[#EFEFEF] text-[#9F9F9F]"
                                        : page === 1
                                            ? "bg-[#3674B5] text-white"
                                            : "bg-[#EFEFEF] text-[#9F9F9F]"}`}

                                onClick={() => setPage(1)}
                            >
                                Completed
                            </button>
                        </div>
                        <div className="col-span-2">
                            <button
                                type="button"
                                className={`w-full h-full px-2 py-2 flex justify-center rounded-xl transition cursor-pointer
                                    ${page === 0
                                        ? "bg-[#EFEFEF] text-[#9F9F9F]"
                                        : page === 1
                                            ? "bg-[#EFEFEF] text-[#9F9F9F]"
                                            : "bg-[#3674B5] text-white"}`}
                                onClick={() => setPage(2)}
                            >
                                <svg
                                    width="34"
                                    height="33"
                                    viewBox="0 0 45 44"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.8557 36.079C17.2085 37.3324 19.8342 37.9858 22.5 37.9812C31.4899 37.9812 38.7777 30.6935 38.7777 21.7035C38.7777 12.7136 31.4899 5.42589 22.5 5.42589C13.5101 5.42589 6.22237 12.7136 6.22237 21.7035C6.22237 24.4707 6.91223 27.0736 8.12763 29.3525C8.4112 29.8834 8.47789 30.5035 8.31366 31.0826L6.40065 37.806L13.1256 35.8946C13.7045 35.7299 14.3246 35.796 14.8557 36.079ZM22.5 40.3066C19.4524 40.3109 16.4508 39.5633 13.7612 38.13L6.36654 40.2337C6.0346 40.328 5.68349 40.332 5.34951 40.2451C5.01553 40.1583 4.71078 39.9839 4.46677 39.7399C4.22277 39.4959 4.04834 39.1911 3.96153 38.8572C3.87471 38.5232 3.87866 38.1721 3.97295 37.8401L6.0751 30.4454C4.64079 27.7551 3.89263 24.7523 3.89699 21.7035C3.89699 11.43 12.2265 3.10051 22.5 3.10051C32.7735 3.10051 41.1031 11.43 41.1031 21.7035C41.1031 31.9771 32.7735 40.3066 22.5 40.3066ZM15.5239 18.2155C15.5239 17.9071 15.6464 17.6114 15.8644 17.3933C16.0825 17.1753 16.3782 17.0528 16.6866 17.0528H28.3135C28.6218 17.0528 28.9176 17.1753 29.1356 17.3933C29.3537 17.6114 29.4762 17.9071 29.4762 18.2155C29.4762 18.5238 29.3537 18.8196 29.1356 19.0376C28.9176 19.2557 28.6218 19.3782 28.3135 19.3782H16.6866C16.3782 19.3782 16.0825 19.2557 15.8644 19.0376C15.6464 18.8196 15.5239 18.5238 15.5239 18.2155ZM15.5239 25.1916C15.5239 24.8832 15.6464 24.5875 15.8644 24.3695C16.0825 24.1514 16.3782 24.0289 16.6866 24.0289H23.6627C23.9711 24.0289 24.2668 24.1514 24.4849 24.3695C24.7029 24.5875 24.8254 24.8832 24.8254 25.1916C24.8254 25.5 24.7029 25.7957 24.4849 26.0138C24.2668 26.2318 23.9711 26.3543 23.6627 26.3543H16.6866C16.3782 26.3543 16.0825 26.2318 15.8644 26.0138C15.6464 25.7957 15.5239 25.5 15.5239 25.1916Z"
                                        fill={page === 2 ? "#FFFFFF" : "#9F9F9F"} />
                                </svg>

                            </button>
                        </div>

                    </div>
                    {page == 0 ?
                        <Reported />
                        : page == 1 ?
                            <Completed />
                            :
                            <Contact />
                    }


                </div>


                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
