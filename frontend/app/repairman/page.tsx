"use client";

import Navbar from "../components/Navbar";
import JoinDormButton from "../components/JoinDormButton";
import RepairmanCard from "../components/RepairmanCard";
import { useState } from "react";

interface Dorm {
  id: number;
  name: string;
  image: string;
}

export default function Repairman() {
  const [dorms, setDorms] = useState<Dorm[]>([
    { id: 1, name: "Dorm A", image: "/mockup-dorm.png" },
    { id: 2, name: "Dorm B", image: "/mockup-dorm.png" },
  ]);

  const handleJoinDorm = (newDorm: Dorm) => {
    setDorms((prev) => [...prev, newDorm]);
  };

  return (
    <div>
      <Navbar  />

      <div className="grid grid-cols-12 my-28">
        <div className="col-span-1"></div>

        <div className="col-span-10">
              <div className="flex items-center gap-3">
                <h1 className="text-[#323034] font-bold text-5xl">Dormitory</h1>
                <JoinDormButton onJoin={handleJoinDorm} />
              </div>

              <div className="flex flex-wrap gap-6 pt-8">
                {dorms.map((dorm) => (
                  <RepairmanCard
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
