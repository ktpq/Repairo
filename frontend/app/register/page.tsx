"use client"

import { useState } from "react"

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return
        }
        console.log("Register:", { firstName, lastName, email, password })
        // call API register
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
                        <div>
                            <label className="block text-sm font-medium text-gray-100">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-white bg-transparent
                 px-3 py-2 text-sm text-white placeholder-white
                 focus:border-white focus:ring-2 focus:ring-white"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-100">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 w-full rounded-lg border border-white bg-transparent
                 px-3 py-2 text-sm text-white placeholder-white
                 focus:border-white focus:ring-2 focus:ring-white"
                                placeholder="Re-enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-[#3674B5]"
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
