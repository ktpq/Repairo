"use client"

import axios from "axios"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { alertSuccess } from "../swal"

import Navbar from "../components/Navbar"
import Image from "next/image"
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context"

export default function ReportForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const reportId = searchParams.get("id")
    const dorm_id = searchParams.get("dorm_id")
    const room_id = searchParams.get("room_id")


    const [topic, setTopic] = useState("")
    const [description, setDescription] = useState("")
    const [appointment, setAppointment] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const [request, setRequest] = useState()

    useEffect(() => {
        if (reportId) {
            // setTopic("Leaking Faucet")
            // setDescription("The faucet in the kitchen is leaking and needs repair.")
            // setAppointment("2025-09-20T10:30")
            // setPhone("0812345678")
            const fetchUser = async () => {
                const base_api = process.env.NEXT_PUBLIC_API_URL
                const response = await axios.get(`${base_api}/request/${reportId}/${dorm_id}/${room_id}`, {withCredentials: true})
                console.log(response.data)
                setRequest(response.data.request)
                setTopic(response.data.request.topic)
                setDescription(response.data.request.description)
                setPhone(response.data.request.phone)

                const formatDate = response.data.request.request_date ? new Date(response.data.request.request_date).toISOString().slice(0, 16) : ""
                setAppointment(formatDate)
                setPreview(`http://localhost:8000/${response.data.request.image_url}`)
                
            }
           fetchUser()
        }
    }, [reportId, dorm_id, room_id])


    // update preview when image changes
    useEffect(() => {
        if (!image) {
            setPreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)

        // clean up URL object
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const base_api = process.env.NEXT_PUBLIC_API_URL
        // console.log({ topic, description, appointment, phone, image })
        const formData = new FormData()
        formData.append("topic", topic)
        formData.append("description", description)
        formData.append("request_date", appointment)
        formData.append("phone", phone)
        formData.append("image_url", image || "")

        try{
            if (reportId){
                // ยิง api แก้ไขคําร้อง
                const response = await axios.put(`${base_api}/request/tenant/${reportId}/${dorm_id}/${room_id}`, formData, {withCredentials: true})
                alertSuccess("แก้ไขคําร้องเรียบร้อยแล้ว").then(() => {
                    router.back()
                })
                
            } else {
                 // ยิง api ส่งคำร้อง
                await axios.post(`${base_api}/request/tenant/${dorm_id}/${room_id}`, formData, {withCredentials: true})
                alertSuccess("ส่งคําร้องเรียบร้อยแล้ว").then(() => {
                    router.back()
                })
            }
        } catch(error){
            console.log(error.message)
        }
    }

    return (
        <div className="overflow-hidden">
            <Navbar />
            <div className="grid grid-cols-12 mt-22 mb-4">
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    <div className="p-6 bg-white rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src='/report-form-icon.png'
                                alt="Report Form Icon"
                                width={40}
                                height={40}
                                className="object-cover h-auto"
                            />
                            <h1 className="text-3xl font-bold text-[#3674B5]">
                                {reportId ? "Edit Repair Request" : "Repair Request Form"}
                            </h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Topic */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Topic <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Enter the topic of your request"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3674B5]"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide a detailed description of the problem"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-[#3674B5]"
                                    required
                                />
                            </div>

                            {/* Appointment */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Appointment Date & Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={appointment}
                                    onChange={(e) => setAppointment(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3674B5]"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                    maxLength={10}
                                    placeholder="Enter your phone number"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#3674B5]"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Maximum 10 digits
                                </p>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Attach Additional Image (optional)
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />

                                    <label
                                        htmlFor="imageUpload"
                                        className="flex items-center gap-2 px-3 py-1 bg-[#3674B5] text-white rounded-lg shadow-md hover:bg-sky-600 transition cursor-pointer text-sm"
                                    >
                                        {image ? "Change File" : "Choose File"}
                                    </label>

                                    {image && (
                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {image && (
                                        <span className="text-sm text-gray-600 truncate max-w-xs">{image.name}</span>
                                    )}
                                </div>

                                {preview && (
                                    <div className="mt-3">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-auto h-44 object-cover rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Submit + Cancel */}
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#3674B5] text-white rounded-lg hover:bg-sky-600 transition cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-span-1"></div>
            </div>
        </div>
    )
}
