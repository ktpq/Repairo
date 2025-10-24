"use client";

import axios from "axios";

import Navbar from "./components/Navbar";
import DormCard from "./components/DormCard";
import JoinDormButton from "./components/JoinDormButton";
import Repairman from "./repairman/page";
import { useState, useEffect } from "react";

interface Dorm {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  
  const [loading, setLoading] = useState(true)
  const [allDorm, setAllDorm] = useState([])

  const [page, setPage] = useState<"user" | "owned" | "repairman">("user");

  useEffect(() => {
    const fetchDorm = async () => {
      const base_api = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.get(`${base_api}/dorm/user`, {withCredentials: true})
      setAllDorm(response.data.allRoomWithDorm)
      setLoading(false)
    }
    fetchDorm()
  }, [])
  

  return (
    <div>
      <Navbar  />
      
      <div className="grid grid-cols-12 my-28">
        <div className="col-span-1"></div>
        
        <div className="col-span-10">
              <div className="flex items-center gap-3">
                {/* {JSON.stringify(allDorm)} */}
                <h1 className="text-[#323034] font-bold text-5xl">Dormitory</h1>
                <JoinDormButton/>
              </div>

              <div className="flex flex-wrap gap-6 pt-8">

                {loading ? (
                  <span className="loading loading-spinner loading-md mx-auto"></span>
                ): (
                  allDorm.map((dorm) => (
                  <DormCard
                      key={dorm.id}
                      id={dorm.id}
                      imageSrc={dorm.image}
                      altText={dorm.dorm.dorm_name}
                      title={dorm.dorm.dorm_name}
                    />
                  ))
                )}

                

              </div>

        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
