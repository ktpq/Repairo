"use client"

import { useState } from "react"
import { alertSuccess, alertFailed } from "../swal"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"
export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const base_api = process.env.NEXT_PUBLIC_API_URL
        if (password !== confirmPassword) {
            alertFailed("รหัสผ่านทั้ง 2 ช่องไม่ตรงกัน")
            return
        }
        console.log("Register:", { firstName, lastName, email, password })
        // call API register
        try {
            const response = await axios.post(`${base_api}/register`, { first_name: firstName, last_name: lastName, email: email, password: password })
            if (response.data.error){
                return alertFailed("มีผู้ใช้นี้ในระบบอยู่แล้ว")
            }
            alertSuccess("ลงทะเบียนสําเร็จ")
            router.push("/login")
        } catch (error){
            console.log(error)
            alertFailed("ลงทะเบียนไม่สําเร็จ")
        }
    }

    return (
        <div
            className="h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.jpg')" }}
        >
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-2xl rounded-3xl bg-white/5 backdrop-blur-sm p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-4xl font-bold text-white">
                        Register to <span className="text-[#2B5D91]">Repairo !</span>
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-100">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="mt-1 w-full rounded-lg border border-white bg-transparent
                  px-3 py-2 text-sm text-white placeholder-white
                  focus:border-white focus:ring-2 focus:ring-white"
                                    placeholder="Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-100">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="mt-1 w-full rounded-lg border border-white bg-transparent
                  px-3 py-2 text-sm text-white placeholder-white
                  focus:border-white focus:ring-2 focus:ring-white"
                                    placeholder="Surname"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-100">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-white bg-transparent
                px-3 py-2 text-sm text-white placeholder-white
                focus:border-white focus:ring-2 focus:ring-white"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-100">
                                Password
                            </label>
                            <div className="relative flex items-center mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-white bg-transparent px-3 py-2 text-sm text-white placeholder-white focus:border-white focus:ring-2 focus:ring-white pr-10"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 flex items-center justify-center h-full cursor-pointer"
                                >
                                    <Image
                                        src={showPassword ? "/eye-slash.png" : "/eye.png"}
                                        alt="toggle password"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-100">
                                Confirm Password
                            </label>
                            <div className="relative flex items-center mt-1">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-white bg-transparent px-3 py-2 text-sm text-white placeholder-white focus:border-white focus:ring-2 focus:ring-white pr-10"
                                    placeholder="Re-enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 flex items-center justify-center h-full cursor-pointer"
                                >
                                    <Image
                                        src={showConfirmPassword ? "/eye-slash.png" : "/eye.png"}
                                        alt="toggle password"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-[#3674B5] cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-white">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-200 hover:underline">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
