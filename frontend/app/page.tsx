"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import DormCard from "./components/DormCard";
import JoinDormButton from "./components/JoinDormButton";
import { useState } from "react";

interface Dorm {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  // ใช้ state เพื่อให้สามารถเพิ่ม dorm ใหม่ได้
  const [dorms, setDorms] = useState<Dorm[]>([
    { id: 1, name: "Dorm A", image: "/mockup-dorm.png" },
    { id: 2, name: "Dorm B", image: "/mockup-dorm.png" },
    { id: 3, name: "Dorm C", image: "/mockup-dorm.png" },
    { id: 4, name: "Dorm D", image: "/mockup-dorm.png" },
    { id: 5, name: "Dorm E", image: "/mockup-dorm.png" },
  ]);

  // ฟังก์ชันส่งไปให้ JoinDormButton → เพิ่ม dorm ใหม่
  const handleJoinDorm = (newDorm: Dorm) => {
    setDorms((prev) => [...prev, newDorm]);
  };

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-12 my-28">
        <div className="col-span-1"></div>

        <div className="col-span-10">
          <div className="flex items-center gap-3">
            <h1 className="text-[#323034] font-bold text-5xl">Your Domitory</h1>
            {/* ส่งฟังก์ชัน handleJoinDorm */}
            <JoinDormButton onJoin={handleJoinDorm} />
          </div>

          <div className="flex flex-wrap gap-6 pt-8">
            {dorms.map((dorm) => (
              <DormCard
                key={dorm.id}
                id={dorm.id}
                imageSrc={dorm.image}
                altText={dorm.name}
                title={dorm.name}
              />
            ))}

          </div>
        </div>

        <div className="col-span-1"></div>
      </div>
    </div>
  );
}
