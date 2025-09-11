"use client";

import { useState } from "react";

interface Repair {
  id: number;
  title: string;
  status: "Pending" | "In Progress" | "Done";
}

export default function UserMain() {
  const [repairs, setRepairs] = useState<Repair[]>([
    { id: 1, title: "Fix AC", status: "Pending" },
    { id: 2, title: "Broken Light", status: "In Progress" },
    { id: 3, title: "Leaky Faucet", status: "Done" },
  ]);
  const [newRepair, setNewRepair] = useState("");

  const handleAddRepair = () => {
    if (!newRepair) return;
    const repair: Repair = {
      id: Math.floor(Math.random() * 1000),
      title: newRepair,
      status: "Pending",
    };
    setRepairs((prev) => [...prev, repair]);
    setNewRepair("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dorm Mockup - Repair Requests</h1>

      {/* New repair input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter repair title"
          value={newRepair}
          onChange={(e) => setNewRepair(e.target.value)}
          className="border px-3 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-[#3674B5]"
        />
        <button
          onClick={handleAddRepair}
          className="px-4 py-2 bg-[#3674B5] text-white rounded-lg hover:bg-sky-600 transition"
        >
          Add
        </button>
      </div>

      {/* Repair list */}
      <ul className="space-y-2">
        {repairs.map((r) => (
          <li key={r.id} className="p-3 border rounded-lg flex justify-between">
            <span>{r.title}</span>
            <span className={`text-sm font-medium ${
              r.status === "Pending" ? "text-yellow-500" :
              r.status === "In Progress" ? "text-blue-500" :
              "text-green-500"
            }`}>
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
