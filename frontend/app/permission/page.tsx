"use client"
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash } from "lucide-react"
import { useState } from "react";

export default function Permission() {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-12 my-28">
                <div className="col-span-1"></div>

                <div className="col-span-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-[#3674B5] font-medium mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                    <h1 className="text-5xl font-bold text-[#3674B5]">Permission</h1>

                    <div className="mb-2 mt-4">
                        <div className="flex items-center px-4 text-gray-500 gap-26">
                            <span>ID</span>
                            <span>Name</span>
                            <span className="ps-30">Email</span>
                        </div>
                    </div>

                    <div className="w-full border-2 rounded-lg h-12 flex items-center border-[#3674B5] px-4 justify-between">
                        <div className="flex items-center gap-16">
                            <span className="flex items-center rounded-md text-lg">#U001</span>
                            <span className="flex items-center rounded-md text-lg">Name Surname</span>
                            <span className="flex items-center rounded-md text-lg ps-20">repairo@test.com</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="cursor-pointer"
                                onClick={() => setShowConfirm(true)}
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Confirm Modal */}
                    {showConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                                <h2 className="text-lg font-bold mb-6 text-center">Are you sure you want to delete?</h2>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowConfirm(false);
                                            // delete logic
                                        }}
                                        className="px-4 py-2 bg-[#EA5252] text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
