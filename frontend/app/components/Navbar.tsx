"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

// interface สำหรับ Notification
interface Notification {
    id: number
    message: string
    link?: string
    read?: boolean
}

export default function Navbar() {
    const router = useRouter() // redirect

    // state ของ dropdown และ notification
    const [openDropdown, setOpenDropdown] = useState(false) // dropdown profile
    const [openNoti, setOpenNoti] = useState(false) // dropdown notification
    const [userImage, setUserImage] = useState<string | null>(null) // เก็บรูป profile ของ user
    const [notifications, setNotifications] = useState<Notification[]>([ // mock up data notification
        { id: 1, message: "Your report has been completed", link: "/reports/1", read: false },
        { id: 2, message: "Your report has been completed", link: "/reports/123", read: false },
        { id: 3, message: "Your report has been completed", link: "/reports/456", read: false },
    ])

    // นับ notification ที่ unread
    const [unreadCount, setUnreadCount] = useState(
        notifications.filter((n) => !n.read).length
    )

    // fetch notifications API
    useEffect(() => {
        async function fetchNotifications() {
            const res = await fetch("/api/notifications")
            const data: Notification[] = await res.json()
            setNotifications(data)
            setUnreadCount(data.filter((n) => !n.read).length) // อัปเดตจำนวน unread
        }
        fetchNotifications()
    }, [])

    // fetch user API
    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/user")
            const data = await res.json()
            setUserImage(data.profileImage) // set user pic profile
        }
        fetchUser()
    }, [])

    // ใช้ ref check click นอก dropdown
    const profileRef = useRef<HTMLDivElement>(null)
    const notiRef = useRef<HTMLDivElement>(null)

    // click นอก dropdown เพื่อปิด dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setOpenDropdown(false)
            }
            if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
                setOpenNoti(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Sign Out
    const handleSignOut = () => {
        localStorage.removeItem("token") // ล้าง token
        router.push("/login") // redirect login
    }

    return (
        <nav className="flex items-center justify-between bg-white/10 backdrop-blur-md px-6 py-3 shadow-md">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Repairo Logo" width={50} height={50} className="rounded-full" />
                <span className="text-2xl font-bold text-[#3674B5]">Repairo</span>
            </Link>

            <div className="flex items-center space-x-6">
                {/* Owned */}
                <Link href="/owned" className="text-black font-bold text-lg hover:text-[#3674B5]">
                    Owned
                </Link>

                {/* Notification Icon */}
                <div className="relative" ref={notiRef}>
                    <div className="relative cursor-pointer" onClick={() => setOpenNoti(!openNoti)}>
                        <Image src="/noti-icon.png" alt="Notifications" width={28} height={28} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                                {unreadCount}
                            </span>
                        )}
                    </div>

                    {/* Dropdown Noti */}
                    {openNoti && (
                        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg bg-white shadow-lg z-50">
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-2 border-b bg-[#3674B5]">
                                <span className="font-semibold text-white">Notifications</span>
                                <button
                                    className="text-sm text-white hover:underline"
                                    onClick={() => setUnreadCount(0)}
                                >
                                    Mark as read
                                </button>
                            </div>

                            {/* Content */}
                            {notifications.length === 0 ? (
                                <p className="p-4 text-sm text-gray-500">No notifications</p>
                            ) : (
                                notifications.map((noti) => (
                                    <div
                                        key={noti.id}
                                        className="block px-4 py-2 text-sm text-gray-700 border-b last:border-b-0 hover:bg-[#E2F0FF]"
                                    >
                                        {noti.message}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <Image
                        src={userImage || "/default-avatar.png"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full cursor-pointer"
                        onClick={() => setOpenDropdown(!openDropdown)}
                    />
                    {openDropdown && (
                        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-lg overflow-y-auto">
                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#E2F0FF]">
                                Profile
                            </Link>
                            <button
                                onClick={handleSignOut}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E2F0FF]"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
