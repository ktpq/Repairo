"use client";

import { useState } from "react";

interface Dorm {
    id: number;
    name: string;
    image: string;
    rooms: number;
    mapLink: string;
    lineID: string;
}

interface CreateDormButtonProps {
    onCreate: (newDorm: Dorm) => void;
}

export default function CreateDormButton({ onCreate }: CreateDormButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [rooms, setRooms] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [lineID, setLineID] = useState("");

    const handleCreate = () => {
        if (!name || !rooms || !mapLink || !lineID) return;

        const newDorm: Dorm = {
            id: Math.floor(Math.random() * 10000),
            name,
            image: "/mockup-dorm.png",
            rooms: parseInt(rooms),
            mapLink,
            lineID,
        };

        onCreate(newDorm);

        // reset form
        setName("");
        setRooms("");
        setMapLink("");
        setLineID("");
        setIsOpen(false);
    };

    return (
        <div className="inline-block">
            <button
                onClick={() => setIsOpen(true)}
                className="ml-4 px-4 py-2 bg-[#3674B5] text-white font-medium rounded-lg hover:bg-sky-600 transition cursor-pointer"
            >
                # Create Dormitory
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl w-full max-w-md shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#3674B5] text-white text-center text-2xl font-bold py-4">
                            Create New Dormitory
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            <div className="mb-3">
                                <label className="block mb-1 font-semibold">Dormitory's Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Dormitory Name"
                                    required
                                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block mb-1 font-semibold">Number of Rooms <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}
                                    placeholder="Number of Rooms"
                                    required
                                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block mb-1 font-semibold">Google Map Link <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={mapLink}
                                    onChange={(e) => setMapLink(e.target.value)}
                                    placeholder="Google Map Link"
                                    required
                                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-1 font-semibold">Line ID <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={lineID}
                                    onChange={(e) => setLineID(e.target.value)}
                                    placeholder="Line ID"
                                    required
                                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3674B5]"
                                />
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreate}
                                    className="px-4 py-2 bg-[#3674B5] text-white rounded-lg hover:bg-sky-600 transition cursor-pointer"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
