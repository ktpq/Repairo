"use client"

import Link from "next/link"
import axios from "axios";
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { RequestInterface } from "@/app/interface";
import { formatDatetime } from "@/app/helper";
import { alertSuccess } from "@/app/swal";



interface Props{
    dorm_id: number
}


export default function MyWork({dorm_id}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [allRequest, setAllRequest] = useState<RequestInterface[]>()
    const [image, setImage] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const fetchRequest = async () => {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.get(`${base_api}/request/technician/incomplete/${dorm_id}`, {withCredentials: true})
            console.log(response.data)
            setAllRequest(response.data.allRequest)
        }
        fetchRequest()
    }, [])

    const submitRequest = async (request_id: number) => {
        console.log(request_id)
        console.log(image)
        const base_api = process.env.NEXT_PUBLIC_API_URL
        try{
            const formData = new FormData()
            formData.append("image_url", image)
            await axios.put(`${base_api}/request/technician/submit/${request_id}/${dorm_id}`, formData, {withCredentials: true})
            alertSuccess("ยืนยันการแก้ไขเรียบร้อยแล้ว").then(() => {
                window.location.reload()
            })
        } catch (error){
            console.log(error.message)
        }
    }

    return (
        <div className="space-y-3 mt-3">
            {allRequest && allRequest.map((item) => (
                <div
                    key={item.id}
                    className="w-full border-2 rounded-lg h-12 flex items-center border-[#3674B5] px-4 justify-between"
                >
                    <div className="flex items-center gap-4">
                        <span>{formatDatetime(item.request_date)}</span>
                        <span>{item.topic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="px-4 py-1 text-sm text-white bg-[#3674B5] font-medium rounded-lg mr-4 flex items-center justify-center cursor-pointer"
                            onClick={() => setIsOpen(true)}>
                            Hand in
                        </button>

                        {isOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
                                <div className="bg-white rounded-xl w-full max-w-lg shadow-lg overflow-hidden">
                                    <h2 className="text-xl font-bold text-white text-center bg-[#3674B5] py-3">
                                        Submit your work
                                    </h2>

                                    <div className="p-6">
                                        {/* File */}
                                        <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-[#3674B5] rounded-lg border-2 border-dashed border-[#3674B5] cursor-pointer hover:bg-[#f0f8ff] transition mb-6">
                                            <Upload className="h-8 w-8 mb-2 text-[#3674B5]" />
                                            <span className="font-medium">Choose a file</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>

                                        {/* Preview */}
                                        {preview && (
                                            <div className="my-4 flex justify-center">
                                                <img
                                                    src={preview}
                                                    alt="Preview"
                                                    className="max-w-full max-h-64 rounded-lg object-contain border"
                                                />
                                            </div>
                                        )}

                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setPreview(null);
                                                }}
                                                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    submitRequest(item.id)
                                                    // setIsOpen(false)
                                                }}
                                                className="px-4 py-2 bg-[#3674B5] text-white rounded-lg hover:bg-sky-600 transition cursor-pointer"
                                            >
                                                Hand in
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Icon see detail */}
                        <Link href={`/ticket-detail-repairman/${item.id}?dorm_id=${dorm_id}`}>
                            <button className="cursor-pointer pt-2">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 26 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.23373 13.377C2.14344 13.1338 2.14344 12.8662 2.23373 12.623C3.11307 10.4908 4.6057 8.66779 6.5224 7.38497C8.43909 6.10215 10.6935 5.41733 12.9999 5.41733C15.3063 5.41733 17.5607 6.10215 19.4774 7.38497C21.3941 8.66779 22.8867 10.4908 23.7661 12.623C23.8563 12.8662 23.8563 13.1338 23.7661 13.377C22.8867 15.5092 21.3941 17.3322 19.4774 18.615C17.5607 19.8978 15.3063 20.5827 12.9999 20.5827C10.6935 20.5827 8.43909 19.8978 6.5224 18.615C4.6057 17.3322 3.11307 15.5092 2.23373 13.377Z"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M13 16.25C14.7949 16.25 16.25 14.7949 16.25 13C16.25 11.2051 14.7949 9.75 13 9.75C11.2051 9.75 9.75 11.2051 9.75 13C9.75 14.7949 11.2051 16.25 13 16.25Z"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
