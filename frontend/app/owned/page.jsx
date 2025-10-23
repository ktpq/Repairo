"use client";

import { useState, useEffect } from "react";
import { UserDormRoleInterface } from "../interface";
import Navbar from "../components/Navbar";
import CreateDormButton from "../components/CreateDormButton";
import OwnedCard from "../components/OwnedCard";

import axios from "axios";


export default function Owned() {
    // const [dorms, setDorms] = useState<Dorm[]>([
    //     { id: 1, name: "Dorm A", image: "/mockup-dorm.png" },
    // ]);

    const [dormTest, setDormTest] = useState([])
    useEffect(() => {
        const fetchDorm = async () => {
            const base_api = process.env.NEXT_PUBLIC_API_URL
            const response = await axios.get(`${base_api}/dorm/owner`, {withCredentials: true})
            setDormTest(response.data.allDorm)
        }
        fetchDorm()
    }, [])
    return (
        <div>
            <Navbar />
            
            <div className="grid grid-cols-12 my-28">
                {JSON.stringify(dormTest)}
                <div className="col-span-1"></div>
                
                <div className="col-span-10">
                    <div className="flex items-center gap-3">
                        <h1 className="text-[#323034] font-bold text-5xl">Dormitory as Admin</h1>
                        <CreateDormButton
                            onCreate={(newDorm) => setDorms((prev) => [...prev, newDorm])}
                        />

                    </div>

                    <div className="flex flex-wrap gap-6 pt-8">
                        {dormTest.map((ownneddorm) => (
                            <OwnedCard
                                key={ownneddorm.dorm.id}
                                id={ownneddorm.dorm.id}
                                imageSrc={ownneddorm.dorm.img_url}
                                altText={ownneddorm.dorm.dorm_name}
                                title={ownneddorm.dorm.dorm_name}
                            />
                        ))}
                        
                    </div>

                </div>

                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
