"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import CreateDormButton from "../components/CreateDormButton";
import OwnedCard from "../components/OwnedCard";

interface Dorm {
    id: number;
    name: string;
    image: string;
}

export default function Owned() {
    const [dorms, setDorms] = useState<Dorm[]>([
        { id: 1, name: "Dorm A", image: "/mockup-dorm.png" },
    ]);

    return (
        <div>
            <Navbar />

            <div className="grid grid-cols-12 my-28">
                <div className="col-span-1"></div>

                <div className="col-span-10">
                    <div className="flex items-center gap-3">
                        <h1 className="text-[#323034] font-bold text-5xl">Dormitory</h1>
                        <CreateDormButton
                            onCreate={(newDorm) => setDorms((prev) => [...prev, newDorm])}
                        />

                    </div>

                    <div className="flex flex-wrap gap-6 pt-8">
                        {dorms.map((ownneddorm) => (
                            <OwnedCard
                                key={ownneddorm.id}
                                id={ownneddorm.id}
                                imageSrc={ownneddorm.image}
                                altText={ownneddorm.name}
                                title={ownneddorm.name}
                            />
                        ))}
                    </div>

                </div>

                <div className="col-span-1"></div>
            </div>
        </div>
    );
}
