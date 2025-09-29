"use client"
import Navbar from "@/app/components/Navbar";
import Reported from "../components/dorm/Reported";
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function AllReport() {
    const router = useRouter()
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
                    <h1 className="text-5xl font-bold text-[#3674B5] pb-8">All Report</h1>
                    <Reported showEdit={false} />
                </div>

                <div className="col-span-1"></div>
            </div>

        </div>
    );
}
