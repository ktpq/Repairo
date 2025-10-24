"use client"

import axios from "axios"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { RequestInterface } from "@/app/interface"
import { useState, useEffect } from "react"
import { formatDatetime } from "@/app/helper"
import { ArrowLeft, CalendarDays, Hammer, Clock, Wrench, Check, X, FileText, User, Phone, Home } from "lucide-react"
import Navbar from "@/app/components/Navbar"

interface Reporter {
    name: string
    phone: string
    room: string
}

interface Ticket {
    title: string
    description: string
    appointment: string
    repairman: string
    submittedDate: string
    status: "pending" | "inprogress" | "complete" | "cancel"
    reporter: Reporter
}

const mockTicket: Ticket = {
    title: "ไฟกลางห้องเสีย",
    description: "ไฟกลางห้องเสีย เปิดไม่ติดเลยครับ ช่วยส่งช่างมาตรวจสอบ",
    appointment: "July 25, 2025 - 01:00 p.m.",
    repairman: "Name Surname",
    submittedDate: "July 22, 2025",
    status: "pending",
    reporter: {
        name: "นายเอ นักศึกษา",
        phone: "081-234-5678",
        room: "A-205",
    },
}

export default function TicketDetail() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()

    const request_id = Number(params.id)
    const dorm_id = Number(searchParams.get("dorm_id"))
    const room_id = Number(searchParams.get("room_id"))
    const [request, setRequest] = useState({} as RequestInterface)
    
    useEffect(() => {
        // if (!request_id || !dorm_id || !room_id) return;
        const fetchDetail = async () => {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.get(`${base_api}/request/${request_id}/${dorm_id}/${room_id}`, {withCredentials: true})
            console.log(response.data)
            setRequest(response.data.request)
            // console.log(request_id, dorm_id, room_id)
        }
        fetchDetail()
    }, [])




    const ticketStatus = request.status
    const steps = [
        { label: "Pending", key: "pending", icon: <Clock className="w-6 h-6" /> },
        { label: "In progress", key: "in_progress", icon: <Wrench className="w-6 h-6" /> },
        {
            label: ticketStatus === "canceled" ? "Canceled" : "Completed",
            key: "final",
            icon: ticketStatus === "canceled" ? <X className="w-6 h-6" /> : <Check className="w-6 h-6" />,
        },
    ]

    
    return (
        <div>
            
            <Navbar />
            
            <div className="grid grid-cols-12 my-26">
                
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    
                    {/* Back button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-[#3674B5] font-medium mb-4 cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>

                    {/* Main Box */}
                    <div className="bg-[#E2F0FF] rounded-lg py-10 px-12 relative">
                        {/* Header Info */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="flex gap-2 text-2xl font-bold text-black mb-2">
                                    Reported: <span>{request?.topic}</span>
                                </h2>
                                <p className="text-md mb-2 flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-black" />
                                    Appointment: {formatDatetime(request.request_date)}
                                </p>
                                <p className="text-md flex items-center gap-2">
                                    <Hammer className="w-4 h-4 text-black" />
                                    Repairman: {mockTicket.repairman}
                                </p>
                            </div>
                            <div className="flex gap-1 items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {formatDatetime(request.createdAt)}</div>
                        </div>

                        {/* Status flow */}
                        <div className="flex justify-around mt-6">
                            {steps.map((step, index) => {
                                let bgColor = "bg-[#D9D9D9]"

                                if (step.key === "pending" && ["pending", "inprogress", "complete", "cancel"].includes(ticketStatus)) {
                                    bgColor = "bg-[#3674B5]"
                                }
                                if (step.key === "inprogress" && ["inprogress", "complete", "cancel"].includes(ticketStatus)) {
                                    bgColor = "bg-[#3674B5]"
                                }
                                if (step.key === "final") {
                                    if (ticketStatus === "completed") bgColor = "bg-green-500"
                                    if (ticketStatus === "canceled") bgColor = "bg-red-500"
                                }

                                return (
                                    <div key={index} className="flex flex-col items-center">
                                        <div
                                            className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${bgColor}`}
                                        >
                                            {step.icon}
                                        </div>
                                        <p className="text-xs mt-1">{step.label}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Cancel button */}
                        <div className="flex justify-end mt-6">
                            <button className="bg-[#E61D1D] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition cursor-pointer">
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="mt-6 space-y-6 grid grid-cols-2">
                        {/* Description */}
                        <section>
                            <div className="space-y-2">
                                <h1 className="flex items-center gap-2 font-bold text-black text-2xl">
                                    <FileText className="w-6 h-6 text-black" />
                                    Description
                                </h1>
                                <p className="text-md mt-1 ml-8">{request.description}</p>
                            </div>

                            {/* Reporter Information */}
                            <div className="space-y-2 mt-5">
                                <h3 className="flex items-center gap-2 font-bold text-black text-2xl">
                                    <User className="w-6 h-6 text-black" />
                                    Reporter Information
                                </h3>
                                <p className="flex items-center gap-2 text-md mt-1 ml-8">
                                    <User className="w-5 h-5 text-gray-500" />
                                    {request.user?.first_name} {request.user?.last_name}
                                </p>
                                <p className="flex items-center gap-2 text-md ml-8">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    {request.phone}
                                </p>
                                <p className="flex items-center gap-2 text-md ml-8">
                                    <Home className="w-5 h-5 text-gray-500" />
                                    {request.dorm?.dorm_name}
                                    
                                </p>
                            </div>
                        </section>

                        <section>
                            <img 
                                src="/mockup-dorm.png" 
                                alt="Dorm Image" 
                                className="w-full max-w-md h-64 object-cover rounded-2xl border-4 border-[#3875b5] shadow-lg mx-auto"
                                />
                        </section>
                    </div>

                    
                </div>

                <div className="col-span-1"></div>
            </div>
            {JSON.stringify(request)}
        </div>
    )
}
