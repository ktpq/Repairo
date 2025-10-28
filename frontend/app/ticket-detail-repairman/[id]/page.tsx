"use client"

import axios from "axios"
import Swal from "sweetalert2"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { RequestInterface } from "@/app/interface"
import { useState, useEffect } from "react"
import { formatDatetime } from "@/app/helper"
import { ArrowLeft, CalendarDays, Hammer, Clock, Wrench, Check, X, FileText, User, Phone, Home } from "lucide-react"
import { alertSuccess, alertChoice } from "@/app/swal"
import Navbar from "@/app/components/Navbar"

export default function TicketDetail() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()

    const request_id = Number(params.id)
    const dorm_id = Number(searchParams.get("dorm_id"))
    const [request, setRequest] = useState({} as RequestInterface)
    
    useEffect(() => {
        const fetchDetail = async () => {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.get(`${base_api}/request/${request_id}/${dorm_id}`, {withCredentials: true})
            setRequest(response.data.request)
        }
        fetchDetail()
    }, [request_id, dorm_id])

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

    const getStepBg = (stepKey: string) => {
        if (stepKey === "pending" && ["pending", "in_progress", "completed", "canceled"].includes(ticketStatus!)) {
            return "bg-[#3674B5]"
        }
        if (stepKey === "in_progress" && ["in_progress", "completed", "canceled"].includes(ticketStatus!)) {
            return "bg-[#3674B5]"
        }
        if (stepKey === "final") {
            if (ticketStatus === "completed") return "bg-green-500"
            if (ticketStatus === "canceled") return "bg-red-500"
        }
        return "bg-[#D9D9D9]"
    }

    const acceptRequest = async () => {
        Swal.fire({
            title: "คุณต้องการรับคําขอหรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                 try{
                    const base_api = process.env.NEXT_PUBLIC_API_URL
                    const response = await axios.put(`${base_api}/request/technician/accept/${request_id}/${dorm_id}` , {}, {withCredentials: true})
                    console.log(response.data)
                    alertSuccess("ยกเลิกคำขอสำเร็จ").then(() => {
                        window.location.reload()
                    })
                } catch (error){
                    console.log(error.message)
                }
            }
        });
       
    }

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
                                    {/* Repairman: {request.technician ? `${request.technician.first_name} ${request.technician.last_name}` : "Not assigned"} */}
                                </p>
                            </div>
                            <div className="flex gap-1 items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                {formatDatetime(request.createdAt)}
                            </div>
                        </div>

                        {/* Status flow */}
                        <div className="flex justify-around mt-6">
                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${getStepBg(step.key)}`}>
                                        {step.icon}
                                    </div>
                                    <p className="text-xs mt-1">{step.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Cancel button */}
                        <div className="flex justify-end mt-6">
                            {request?.status !== "in_progress" && request?.status !== "completed" && (
                                <button className="bg-[#3574b8] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition cursor-pointer" onClick={acceptRequest}>
                                    accept request
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="mt-6 space-y-6 grid grid-cols-2">
                        <section>
                            <div className="space-y-2">
                                <h1 className="flex items-center gap-2 font-bold text-black text-2xl">
                                    <FileText className="w-6 h-6 text-black" />
                                    Description
                                </h1>
                                <p className="text-md mt-1 ml-8">{request.description}</p>
                            </div>

                            <div className="space-y-2 mt-5">
                                <h3 className="flex items-center gap-2 font-bold text-black text-2xl">
                                    <User className="w-6 h-6 text-black" />
                                    Reporter Information
                                </h3>
                                <p className="flex items-center gap-2 text-md mt-1 ml-8">
                                    <User className="w-5 h-5 text-gray-500" />
                                    {request.user ? `${request.user.first_name} ${request.user.last_name}` : ""}
                                </p>
                                <p className="flex items-center gap-2 text-md ml-8">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    {request.phone}
                                </p>
                                <p className="flex items-center gap-2 text-md ml-8">
                                    <Home className="w-5 h-5 text-gray-500" />
                                    {request.dorm?.dorm_name || "No dorm"}
                                </p>
                            </div>
                        </section>

                        <section>
                            <img 
                                src={`http://localhost:8000/${request.image_url}`}
                                alt="Dorm Image" 
                                className="w-full max-w-md h-64 object-cover rounded-2xl border-4 border-[#3875b5] shadow-lg mx-auto"
                            />
                        </section>
                    </div>
                </div>
                <div className="col-span-1"></div>
            </div>
            {/* {JSON.stringify(request)} */}
        </div>
    )
}
