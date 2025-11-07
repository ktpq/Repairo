"use client"
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import axios from "axios";
import { Home, Users, Clock, CheckCircle, AlertTriangle, Loader2, Eye } from "lucide-react";
import ReportOwner from "@/app/components/ReportOwner";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DormInterface } from "@/app/interface";

interface status {
    canceld_report: number
    completed_report: number
    dorm: DormInterface
    inprogress_report: number
    pending_report: number
    success_rate: number
    total_report: number
    total_report_thismonth: number
}


export default function OwnedDorm() {
    const params = useParams()
    const dorm_id = Number(params.id)
    const [allStatus, setAllStatus] = useState<status>()
    useEffect(() => {
        const fetchAllStatus = async () => {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.get(`${base_api}/request/admin/status/${dorm_id}`, {withCredentials: true})
            console.log(response.data)
            setAllStatus(response.data.result)
        }
        fetchAllStatus()
    }, [])
    return (
        <div>
            <Navbar />

            {/* Header Dormitory */}
            <div className="grid grid-cols-12 my-28">
                <div className="col-span-1"></div>

                {allStatus && (
                    <div className="col-span-10">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[#3674B5] font-bold text-5xl">{allStatus?.dorm.dorm_name}</h1>
                        <h1 className="text-[#3674B5] font-bold text-2xl">Technician code : {allStatus?.dorm.tech_code}</h1>
                        <div className="flex gap-2">
                            <Link href={`/room/${dorm_id}`} className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-[#CAE4FF] text-[#3674B5] shadow-md rounded-xl hover:bg-sky-200 transition cursor-pointer"
                                >
                                    <Home className="w-7 h-7" />
                                </button>
                            </Link>
                            <Link href={`/permission/${dorm_id}`} className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-[#CAE4FF] text-[#3674B5] shadow-md rounded-xl hover:bg-sky-200 transition cursor-pointer"
                                >
                                    <Users className="w-7 h-7" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* 3 Boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        {/* Red Box */}
                        <div className="flex items-center bg-[#EA5252] rounded-xl p-6 shadow-md">
                            <AlertTriangle className="w-10 h-10 text-white mr-4" />
                            <div>
                                <p className="text-white text-md">Total report</p>
                                <p className="text-white text-3xl font-bold">{allStatus?.total_report}</p>
                            </div>
                        </div>

                        {/* Orange Box */}
                        <div className="flex items-center bg-[#FFA01B] rounded-xl p-6 shadow-md">
                            <Clock className="w-10 h-10 text-white mr-4" />
                            <div>
                                <p className="text-white text-md">Monthly Report</p>
                                <p className="text-white text-3xl font-bold">{allStatus?.total_report_thismonth}</p>
                            </div>
                        </div>

                        {/* Green Box */}
                        <div className="flex items-center bg-[#3ECB3E] rounded-xl p-6 shadow-md">
                            <CheckCircle className="w-10 h-10 text-white mr-4" />
                            <div>
                                <p className="text-white text-md">Success Rate (%)</p>
                                <p className="text-white text-3xl font-bold">{allStatus?.success_rate} %</p>
                            </div>
                        </div>
                    </div>

                    <div className="my-4">
                        <div className="items-center border-2 border-[#3674B5] bg-transparent rounded-xl p-8">
                            <p className="text-black text-3xl font-bold mb-4">Status</p>
                            <div className="grid grid-cols-3 gap-6 my-5">
                                {/* Red Box */}
                                <div className="flex flex-col items-center">
                                    <div className="flex justify-center items-center bg-[#FFA01B]/40 rounded-xl p-6 w-full">
                                        <Clock className="w-10 h-10 text-[#FFA01B]" />
                                    </div>
                                    <span className="text-3xl font-bold mt-2">{allStatus?.pending_report}</span>
                                    <span className="text-sm text-gray-600 mt-1">Pending</span>
                                </div>

                                {/* Orange Box */}
                                <div className="flex flex-col items-center">
                                    <div className="flex justify-center items-center bg-[#EAC42B]/30 rounded-xl p-6 w-full">
                                        <Loader2 className="w-10 h-10 text-[#EAC42B]" />
                                    </div>
                                    <span className="text-3xl font-bold mt-2">{allStatus?.inprogress_report}</span>
                                    <span className="text-sm text-gray-600 mt-1">In Progress</span>
                                </div>

                                {/* Green Box */}
                                <div className="flex flex-col items-center">
                                    <div className="flex justify-center items-center bg-[#3ECA3E]/30 rounded-xl p-6 w-full">
                                        <CheckCircle className="w-10 h-10 text-[#3ECA3E]" />
                                    </div>
                                    <span className="text-3xl font-bold mt-2">{allStatus?.completed_report}</span>
                                    <span className="text-sm text-gray-600 mt-1">Completed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <h1 className="text-black font-bold text-3xl">Recent Requests</h1>
                        <div className="flex gap-2">
                            <Link href={`/all-report/${dorm_id}`} className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-[#CAE4FF] text-[#3674B5] shadow-md rounded-xl hover:bg-sky-200 transition cursor-pointer"
                                >
                                    <Eye className="w-7 h-7" />
                                </button>
                            </Link>
                        </div>
                    </div>
                    <ReportOwner dorm_id={dorm_id}/>

                </div>
                )}

                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
