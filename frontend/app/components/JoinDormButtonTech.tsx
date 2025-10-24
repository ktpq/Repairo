"use client";

import { useState } from "react";
import axios from "axios";
import { alertSuccess, alertFailed } from "../swal";
interface Dorm {
  id: number;
  name: string;
  image: string;
}

interface JoinDormButtonProps {
  onJoin: (newDorm: Dorm) => void;
}

export default function JoinDormButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const handleJoin = async () => {
    if (!accessCode) return alertFailed("กรุณากรอก tech_code");
    // ตัวอย่าง: เช็ค code กับ mock API (จริง ๆ ก็ fetch ไป backend)
    try {
      const base_api = process.env.NEXT_PUBLIC_API_URL
      const response = await axios.post(`${base_api}/dorm/join/technician`, { tech_code: accessCode} , {withCredentials: true})


      if (response.status === 200){
          return alertSuccess("เข้าร่วมหอพักสำเร็จ").then(() => {
              window.location.reload()
          })
      }
      
    } catch (error){
        if (error.status === 404){
          return alertFailed("ไม่พบหอพักนี้ในระบบ")
        }
        
    }
    setIsOpen(false);
    setAccessCode("");
  };

  return (
    <div className="inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className="ml-4 px-4 py-2 bg-[#3674B5] text-white font-medium rounded-lg hover:bg-sky-600 transition cursor-pointer"
      >
        # Join with code
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg mb-2">Join dormitory with access code</h2>

            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter code e.g. A1B2C3"
              className="w-full px-3 py-2 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[#3674B5]"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleJoin}
                className="px-4 py-2 bg-[#3674B5] text-white rounded-lg hover:bg-sky-600 transition cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
