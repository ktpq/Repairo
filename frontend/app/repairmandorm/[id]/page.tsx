"use client"
import Navbar from "@/app/components/Navbar";
import { useState } from "react";
import Contact from "@/app/components/dorm/Contact";
import { CheckCircle, MessageCircle } from "lucide-react"
import ReportedRPM from "@/app/components/repairman/Reported";
import CompletedRPM from "@/app/components/repairman/Completed";
import MyWork from "@/app/components/repairman/Mywork";

import { useParams } from "next/navigation";

export default function RepairmanDorm() {
  const [page, setPage] = useState(0);
  const params = useParams()
  const dorm_id = Number(params.id);
  return (
    <div>
      <Navbar />
    
      <div className="grid grid-cols-12 my-28">
        <div className="col-span-1"></div>

        <div className="col-span-10">
          <div className="flex items-center justify-between">
            <h1 className="text-[#3674B5] font-bold text-5xl">Dormitory A</h1>
            <button
              type="button"
              className="px-4 py-2 bg-[#3674B5] text-white rounded-xl hover:bg-sky-600 transition cursor-pointer"
              onClick={() => setPage(3)}
            >
              <MessageCircle className="w-8 h-8" />
            </button>
          </div>


          <div className="grid grid-cols-12 gap-4 mt-10">
            <div className="col-span-5">
              <button
                type="button"
                className={`w-full h-full px-4 py-2 text-xl font-bold rounded-xl transition cursor-pointer 
                  ${page === 0 ? "bg-[#3674B5] text-white" : "bg-[#EFEFEF] text-[#9F9F9F]"}`}
                onClick={() => setPage(0)}
              >
                Reported
              </button>
            </div>
            <div className="col-span-5">
              <button
                type="button"
                className={`w-full h-full px-4 py-2 text-xl font-bold rounded-xl transition cursor-pointer 
                  ${page === 1 ? "bg-[#3674B5] text-white" : "bg-[#EFEFEF] text-[#9F9F9F]"}`}
                onClick={() => setPage(1)}
              >
                My work
              </button>
            </div>
            <div className="col-span-2">
              <button
                type="button"
                className={`w-full h-full px-2 py-2 flex justify-center items-center rounded-xl transition cursor-pointer
                  ${page === 2 ? "bg-[#3674B5] text-white" : "bg-[#EFEFEF] text-[#9F9F9F]"}`}
                onClick={() => setPage(2)}
              >
                <CheckCircle className="w-7 h-7" />
              </button>
            </div>
          </div>

          {/* Render component ตาม page */}
          {page === 0 && <ReportedRPM dorm_id={dorm_id}/>}
          {page === 1 && <MyWork />}
          {page === 2 && <CompletedRPM />}
          {page === 3 && <Contact dorm_id={dorm_id}/>}

        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
