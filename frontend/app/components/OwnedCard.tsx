"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"



export default function OwnedCard({ id, imageSrc, altText, title }) {
  const router = useRouter()
  if (!imageSrc){
    imageSrc = "/mockup-dorm.png"
  }
  const handleClick = () => {
    router.push(`/owneddorm/${id}`) // ไปยังหน้าหอพักเฉพาะ
  }

  return (
    <div
      className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      {/* รูป */}
      <Image
        src={imageSrc}
        alt={altText}
        width={256}
        height={256}
        className="object-cover w-full h-auto"
      />

      {/* ข้อความใต้รูป */}
      <div className="p-4">
        <p className="text-gray-800 font-medium truncate">{title}</p>
      </div>
    </div>
  )
}
