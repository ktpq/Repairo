import Navbar from "@/app/components/Navbar";
import Link from "next/link"
import Image from "next/image";

export default function UserMain() {

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
                                className="w-full h-full px-4 py-2 bg-[#3674B5] text-white text-xl font-bold rounded-xl hover:bg-sky-600 transition cursor-pointer"
                            >
                                Reported
                            </button>
                        </div>
                        <div className="col-span-5">
                            <button
                                type="button"
                                className="w-full h-full px-4 py-2 bg-[#EFEFEF] text-[#9F9F9F] text-xl font-bold rounded-xl hover:bg-gray-300 transition cursor-pointer"
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
                </div>


                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
