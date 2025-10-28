"use client"

import axios from "axios"

import Link from "next/link"
import { formatDatetime } from "@/app/helper"
import { useState, useEffect } from "react"

interface Issue {
  date: string
  issue: string
}

interface ReportedProps {
    dorm_id: number
    room_id: number
}

const mockData: Issue[] = [
  { date: "01/01/2025", issue: "ไฟกลางห้องเสีย" },
  { date: "05/01/2025", issue: "แอร์ไม่เย็น" },
  { date: "10/01/2025", issue: "ประตูห้องน้ำพัง" },
  { date: "15/01/2025", issue: "ปลั๊กไฟชำรุด" },
]

export default function Completed({dorm_id, room_id}: ReportedProps) {
  const [completedRequest, setCompletedRequest] = useState([])
  useEffect(() => {
    const base_api = process.env.NEXT_PUBLIC_API_URL
    const fetchRequest = async () => {
      const response = await axios.get(`${base_api}/request/tenant/complete/${dorm_id}/${room_id}`, {withCredentials: true})
      console.log("completed", response.data)
      setCompletedRequest(response.data.allRequest)
    }
    fetchRequest()
  }, [])
  return (
    <div className="space-y-3 mt-3">
      {completedRequest.map((item, index) => (
        <div
          key={item.id}
          className="w-full border-2 rounded-lg h-12 flex items-center border-[#3674B5] px-4 justify-between"
        >
          <div className="flex items-center gap-4">
            <span>{formatDatetime(item.request_date)}</span>
            <span>{item.topic}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="bg-[#33BF33] text-white text-sm font-medium rounded-lg mr-4 flex items-center justify-center"
              style={{ width: "100px", height: "28px" }}
            >
              Completed
            </span>
            {/* Icon see history detail */}
            <Link href={`/ticket-detail/${item.id}?dorm_id=${dorm_id}&room_id=${room_id}`}>
              <button className="cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.23373 13.377C2.14344 13.1338 2.14344 12.8662 2.23373 12.623C3.11307 10.4908 4.6057 8.66779 6.5224 7.38497C8.43909 6.10215 10.6935 5.41733 12.9999 5.41733C15.3063 5.41733 17.5607 6.10215 19.4774 7.38497C21.3941 8.66779 22.8867 10.4908 23.7661 12.623C23.8563 12.8662 23.8563 13.1338 23.7661 13.377C22.8867 15.5092 21.3941 17.3322 19.4774 18.615C17.5607 19.8978 15.3063 20.5827 12.9999 20.5827C10.6935 20.5827 8.43909 19.8978 6.5224 18.615C4.6057 17.3322 3.11307 15.5092 2.23373 13.377Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 16.25C14.7949 16.25 16.25 14.7949 16.25 13C16.25 11.2051 14.7949 9.75 13 9.75C11.2051 9.75 9.75 11.2051 9.75 13C9.75 14.7949 11.2051 16.25 13 16.25Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
