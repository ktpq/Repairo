"use client";

import { useState } from "react";

interface Dorm {
  id: number;
  name: string;
  image: string;
}

interface JoinDormButtonProps {
  onJoin: (newDorm: Dorm) => void;
}

export default function JoinDormButton({ onJoin }: JoinDormButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const handleJoin = async () => {
    if (!accessCode) return;

    // ตัวอย่าง: เช็ค code กับ mock API (จริง ๆ ก็ fetch ไป backend)
    // สมมติว่าถ้า code ถูกต้อง จะได้ dorm object กลับมา
    const mockDorm: Dorm = {
      id: Math.floor(Math.random() * 1000), // id ใหม่
      name: `Dorm ${accessCode.toUpperCase()}`,
      image: "/mockup-dorm.png",
    };

    // ส่ง dorm object กลับไปหน้า Home → เพิ่มการ์ด
    onJoin(mockDorm);

    // ปิด modal และล้าง input
    setIsOpen(false);
    setAccessCode("");
  };

  return (
    <div className="inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className="ml-4 px-4 py-2 bg-[#3674B5] text-white font-medium rounded-lg hover:bg-sky-600 transition cursor-pointer"
      >
        Join with code
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
