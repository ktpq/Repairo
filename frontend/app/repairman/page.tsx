"use client";

import axios from "axios";

import Navbar from "../components/Navbar";
import JoinDormButtonTech from "../components/JoinDormButtonTech";
import RepairmanCard from "../components/RepairmanCard";
import { useState, useEffect } from "react";

interface Dorm {
  id: number;
  name: string;
  image: string;
}

export default function Repairman() {
  const base_api = process.env.NEXT_PUBLIC_API_URL
  const [dorms, setDorms] = useState<Dorm[]>([
    { id: 1, name: "Dorm A", image: "/mockup-dorm.png" },
    { id: 2, name: "Dorm B", image: "/mockup-dorm.png" },
  ]);

  const [allDorm, setAllDorm] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchTechDorm = async () => {
      const response = await axios.get(`${base_api}/dorm/technician`, {withCredentials: true})
      setAllDorm(response.data.allDorm)
      setLoading(false)
    }
    fetchTechDorm()
  }, [])
  return (
    <div>
      <Navbar  />

      <div className="grid grid-cols-12 my-28">
        <div className="col-span-1"></div>
        
        <div className="col-span-10">
              <div className="flex items-center gap-3">
                <h1 className="text-[#323034] font-bold text-5xl">Dormitory as Repairman</h1>
                {/* {JSON.stringify(allDorm)} */}
                <JoinDormButtonTech/>
              </div>

              <div className="flex flex-wrap gap-6 pt-8">
                

                {loading ? (
                    <span className="loading loading-spinner loading-md mx-auto"></span>
                  ): (
                    allDorm.map((dorm) => (
                    <RepairmanCard
                        key={dorm.id}
                        id={dorm.id}
                        imageSrc={dorm.dorm.img_url}
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
