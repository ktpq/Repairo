"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
type Status = "Pending" | "In progress" | "Canceled";

interface Issue {
    date: string;
    issue: string;
    status: Status;
}

const mockData: Issue[] = [
    { date: "01/01/2025", issue: "ไฟกลางห้องเสีย", status: "Pending" },
    { date: "05/01/2025", issue: "แอร์ไม่เย็น", status: "In progress" },
    { date: "10/01/2025", issue: "ประตูห้องน้ำพัง", status: "Canceled" },
    { date: "15/01/2025", issue: "ปลั๊กไฟชำรุด", status: "Pending" },
];



const statusColors = {
    Pending: "bg-[#FFA01B]",
    "In progress": "bg-[#EAC42B]",
    Canceled: "bg-[#FE8B80]",
};
export default function Reported() {


    return (
        <div className="space-y-3 mt-3">
            {mockData.map((item, index) => (
                <div
                    key={index}
                    className="w-full border-2 rounded-lg h-12 flex items-center border-[#3674B5] px-4 justify-between"
                >
                    <div className="flex items-center gap-4">
                        <span>{item.date}</span>
                        <span>{item.issue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={`${statusColors[item.status]} text-sm text-white font-medium rounded-lg mr-4 flex items-center justify-center`}
                            style={{ width: "100px", height: "28px" }}
                        >
                            {item.status}
                        </span>
                        <button className="">
                            <svg width="24" height="24" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.17399 30.5346H29.8198C30.0132 30.5346 30.1987 30.4578 30.3354 30.321C30.4722 30.1843 30.549 29.9988 30.549 29.8054C30.549 29.612 30.4722 29.4266 30.3354 29.2898C30.1987 29.1531 30.0132 29.0763 29.8198 29.0763H5.17399C4.9806 29.0763 4.79514 29.1531 4.65839 29.2898C4.52165 29.4266 4.44482 29.612 4.44482 29.8054C4.44482 29.9988 4.52165 30.1843 4.65839 30.321C4.79514 30.4578 4.9806 30.5346 5.17399 30.5346ZM14.1602 25.0542C14.7759 24.881 15.3378 24.5549 15.7936 24.1063L29.7061 10.1938C30.1825 9.71544 30.45 9.06783 30.45 8.39271C30.45 7.7176 30.1825 7.06999 29.7061 6.59167L28.3352 5.23542C27.8498 4.77271 27.2049 4.51459 26.5342 4.51459C25.8635 4.51459 25.2186 4.77271 24.7332 5.23542L10.8207 19.1333C10.372 19.5868 10.0502 20.15 9.88732 20.7667L8.80816 24.7917C8.75742 24.9756 8.75633 25.1696 8.805 25.3541C8.85368 25.5385 8.95037 25.7068 9.08524 25.8417C9.29192 26.0442 9.5688 26.1591 9.85816 26.1625L14.1602 25.0542ZM14.7582 23.0708C14.4892 23.3444 14.1518 23.5408 13.7811 23.6396L12.3665 24.0188L10.9082 22.5604L11.2873 21.1458C11.388 20.7759 11.5841 20.439 11.8561 20.1688L12.4102 19.6292L15.3123 22.5313L14.7582 23.0708ZM16.3477 21.4958L13.4457 18.5938L23.2602 8.77917L26.1623 11.6813L16.3477 21.4958ZM28.6707 9.17292L27.1977 10.6458L24.2957 7.74375L25.7686 6.25625C25.9737 6.05143 26.2516 5.93638 26.5415 5.93638C26.8313 5.93638 27.1093 6.05143 27.3144 6.25625L28.6707 7.62709C28.8741 7.83291 28.9881 8.11063 28.9881 8.4C28.9881 8.68938 28.8741 8.96709 28.6707 9.17292Z" fill="black" />
                            </svg>

                        </button>
                        <button className="">
                            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.23373 13.377C2.14344 13.1338 2.14344 12.8662 2.23373 12.623C3.11307 10.4908 4.6057 8.66779 6.5224 7.38497C8.43909 6.10215 10.6935 5.41733 12.9999 5.41733C15.3063 5.41733 17.5607 6.10215 19.4774 7.38497C21.3941 8.66779 22.8867 10.4908 23.7661 12.623C23.8563 12.8662 23.8563 13.1338 23.7661 13.377C22.8867 15.5092 21.3941 17.3322 19.4774 18.615C17.5607 19.8978 15.3063 20.5827 12.9999 20.5827C10.6935 20.5827 8.43909 19.8978 6.5224 18.615C4.6057 17.3322 3.11307 15.5092 2.23373 13.377Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13 16.25C14.7949 16.25 16.25 14.7949 16.25 13C16.25 11.2051 14.7949 9.75 13 9.75C11.2051 9.75 9.75 11.2051 9.75 13C9.75 14.7949 11.2051 16.25 13 16.25Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                    </div>
                </div>
            ))}
        </div>

    )
}
