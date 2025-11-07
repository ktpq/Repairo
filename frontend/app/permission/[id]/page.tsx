"use client"
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Trash } from "lucide-react"
import { useState, useEffect } from "react";
import { UserInterface } from "@/app/interface";
import { alertSuccess } from "@/app/swal";

interface allUser{
    id: number
    user_id: number
    dorm_id: number
    role: string
    room_id: number | null
    user: UserInterface

}

export default function Permission() {
    const router = useRouter();
    const params = useParams();
    const [showConfirm, setShowConfirm] = useState(false);
    const [allUser, setAllUser] = useState<allUser[]>()
    const dorm_id = Number(params.id)

    const [currentId, setCurrentId] = useState<number>(0)
    const [currentRole, setCurrentRole] = useState<string>("")

    useEffect(() => {
        const base_api = process.env.NEXT_PUBLIC_API_URL
        const fetchAllUser = async () => {
            const response = await axios.get(`${base_api}/dorm/user/${dorm_id}`, {withCredentials: true})
            console.log(response.data)
            setAllUser(response.data.allUser)
        }
        fetchAllUser()
    }, [])

    const showModal = (user_id: number, role: string) => {
        setShowConfirm(true);
        setCurrentId(user_id)
        setCurrentRole(role)
        
    }

    const closeModal = () => {
        setShowConfirm(false);
        setCurrentId(0)
        setCurrentRole("")
    }

    const deleteUser = async () => {
        console.log("delete")
        const base_api = process.env.NEXT_PUBLIC_API_URL
        try{
            if (currentRole === "Tenant"){
                // ถ้าจะลบ Tenant ออกจากหอ
                await axios.delete(`${base_api}/user/tenant/${currentId}/${dorm_id}`, {withCredentials: true})
                alertSuccess("ลบสําเร็จ").then(() => {
                    window.location.reload()
                })
            } else {
                // ถ้าจะลบ Technician ออกจากหอ
                await axios.delete(`${base_api}/user/technician/${currentId}/${dorm_id}`, {withCredentials: true})
                alertSuccess("ลบสําเร็จ").then(() => {
                    window.location.reload()
                })
            }
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
                    <h1 className="text-5xl font-bold text-[#3674B5]">Permission</h1>
                    {/* {JSON.stringify(allUser)} */}
                    <div className="mt-6">
                    {/* หัวตาราง */}
                    <div className="grid grid-cols-[100px_1.5fr_2fr_180px_60px] items-center px-6 py-2 text-gray-500 border-b">
                        <span className="font-semibold">ID</span>
                        <span className="font-semibold">Name</span>
                        <span className="font-semibold">Email</span>
                        <span className="font-semibold">Role</span>
                        <span className="text-center font-semibold">Action</span>
                    </div>

                    {/* เนื้อหา */}
                    {allUser && allUser.map((user) => (
                        <div
                        key={user.id}
                        className="grid grid-cols-[100px_1.5fr_2fr_180px_60px] items-center px-6 py-3 border-b hover:bg-[#f9fbff] transition"
                        >
                        <span className="text-lg text-gray-800">U{user.user_id}</span>
                        <span className="text-lg text-gray-700 truncate">
                            {user.user.first_name} {user.user.last_name}
                        </span>
                        <span className="text-lg text-gray-700 truncate">{user.user.email}</span>
                        <span className="text-lg text-gray-700">{user.role}</span>

                        <div className="flex justify-center">
                            <button
                            className="text-[#EA5252] hover:text-red-600 transition cursor-pointer"
                            onClick={() => showModal(user.user.id, user.role)}
                            >
                            <Trash className="w-5 h-5" />
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>


                    {/* Confirm Modal */}
                    {showConfirm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                                <h2 className="text-lg font-bold mb-6 text-center">Are you sure you want to delete?</h2>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => closeModal()}
                                        className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteUser();
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
