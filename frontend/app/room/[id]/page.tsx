"use client"
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Settings, Copy } from "lucide-react"
import { useState, useEffect } from "react";



export default function Room() {
    const router = useRouter()
    const params = useParams()

    const dorm_id = Number(params.id)
    const [isOpen, setIsOpen] = useState(false);

    const [copied, setCopied] = useState(false);
    const [accessCode, setAccessCode] = useState<string>("")
    const [currentRoom, setCurrentRoom] = useState<number>(0)
    const [allRoom, setAllRoom] = useState<any[]>()

    const handleCopy = () => {
        navigator.clipboard.writeText(accessCode);
        setCopied(true);
    };

    useEffect(() => {
        const fetchRooms = async () => {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.get(`${base_api}/room/${dorm_id}`, {withCredentials: true})
            console.log(response.data)
            setAllRoom(response.data.allRoom)
        }
        fetchRooms()
    }, [])

    const getStatusColor = (status: string) => {
        switch (status){
            case "Available":
                return "bg-[#3ECA3E]"
            case "Reported":
                return "bg-[#EAC42B]"
            case "Unavailable":
                return "bg-[#EA5252]"
        }
    }

    const openModal = (access_code: string, room_id: number) => {
        setIsOpen(true)
        setAccessCode(access_code)
        setCurrentRoom(room_id)
    }

    const closeModal = () => {
        setIsOpen(false)
        setAccessCode("")
        setCurrentRoom(0)
    }

    const generateNewCode = async () => {
        try {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.put(`${base_api}/room/change-accesscode/${dorm_id}`, {room_id: currentRoom}, {withCredentials: true})
            setAccessCode(response.data.result.access_code)
            
            setAllRoom((prev) =>
                prev.map((room) =>
                    room.id === currentRoom ? { ...room, access_code: response.data.result.access_code } : room
                )
            );
        } catch (error){
            console.log(error.message)
        }
    }

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
                    <h1 className="text-5xl font-bold text-[#3674B5]">Room</h1>
                    {/* {JSON.stringify(allRoom)} */}
                    <div className="flex gap-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#3ECA3E] rounded-sm"></div>
                            <span className="text-sm text-gray-700">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#EAC42B] rounded-sm"></div>
                            <span className="text-sm text-gray-700">Reported</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-[#EA5252] rounded-sm"></div>
                            <span className="text-sm text-gray-700">Unavailable</span>
                        </div>
                    </div>

                    {allRoom && allRoom.map((room) => (
                        <div className="w-full border-2 rounded-lg h-12 flex items-center border-[#3674B5] px-4 justify-between my-3" key={room.id}>
                        <div className="flex items-center justify-start space-x-4">
                            <span className="flex items-center rounded-md text-lg w-12">R{room.number}</span>
                            {!room.tenant ? (
                                <span className="flex items-center rounded-md text-lg flex-1">None</span>
                            ): (
                                <span className="flex items-center rounded-md text-lg flex-1">{room.tenant.first_name} {room.tenant.last_name}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                className="rounded-lg mr-4 flex items-center justify-center"
                            >
                                <div className={`w-4 h-4 rounded-sm ${getStatusColor(room.status)}`}></div>
                            </span>

                            <div className="flex gap-2">
                                <button
                                    className="cursor-pointer"
                                    onClick={() => openModal(room.access_code, room.id)}>
                                    <Settings className="w-5 h-5" />
                                </button>

                                
                            </div>
                        </div>
                    </div>
                    ))}

                    {isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                                <h2 className="text-lg mb-2">Access code</h2>

                                <div className="relative w-full mb-4">
                                    {/* prefix # */}
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">#</span>

                                    {/* input */}
                                    <input
                                        type="text"
                                        readOnly
                                        value={accessCode}
                                        className="w-full pl-7 pr-10 py-2 border rounded-xl bg-gray-100 text-gray-600"
                                    />

                                    {/* copy icon */}
                                    <button
                                        onClick={handleCopy}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#3674B5] transition cursor-pointer"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>

                                    {/* copied message */}
                                    {copied && (
                                        <span className="absolute right-10 top-1/2 -translate-y-1/2 text-sm text-[#3674B5]">
                                            Copied!
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => closeModal()}
                                        className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#3674B5] text-white rounded-lg hover:bg-sky-600 transition cursor-pointer"
                                    onClick={generateNewCode}>
                                        Generate code
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
