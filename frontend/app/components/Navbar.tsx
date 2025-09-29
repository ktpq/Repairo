"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Wrench, Shield, Building2 } from "lucide-react"

export default function Navbar() {
    const router = useRouter() // redirect
    const pathname = usePathname()

    // state ของ dropdown
    const [openDropdown, setOpenDropdown] = useState(false) // dropdown profile
    const [userImage, setUserImage] = useState<string | null>(null) // เก็บรูป profile ของ user

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

    // click นอก dropdown เพื่อปิด dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setOpenDropdown(false)
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
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-white px-6 py-3 shadow-md z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
                <Image src="/logo.png" alt="Repairo Logo" width={50} height={50} className="rounded-full" />
                <span className="text-2xl font-bold text-[#3674B5]">Repairo</span>
            </Link>

            <div className="flex items-center space-x-6">
                {/* Repairman */}
                <Link
                    href="/repairman"
                    className="flex items-center gap-2 text-black font-bold text-lg hover:text-[#3674B5]"
                >
                    <Wrench className="w-5 h-5" />
                    Repairman
                </Link>

                {/* Owned (Admin) */}
                {/* Owned <-> Dormitory */}
                {pathname === "/owned" ? (
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-black font-bold text-lg hover:text-[#3674B5]"
                    >
                        <Building2 className="w-5 h-5" />
                        Dormitory
                    </Link>
                ) : (
                    <Link
                        href="/owned"
                        className="flex items-center gap-2 text-black font-bold text-lg hover:text-[#3674B5]"
                    >
                        <Shield className="w-5 h-5" />
                        Owned
                    </Link>
                )}

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
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#E2F0FF] cursor-pointer"
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
