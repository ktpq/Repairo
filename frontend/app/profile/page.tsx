'use client'

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Profile() {
  // mock data
  const userDorm = {
    dormName: "Condo A",
    roomNumber: "123/456",
  };

  const [userProfile, setUserProfile] = useState({
    firstName: "Name",
    lastName: "Surname",
    email: "username@gmail.com",
    avatar: "/default-avatar.png",
  });

  const [showModal, setShowModal] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(userProfile.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewAvatar(url);
    }
  };

  const handleRemoveAvatar = () => {
    setPreviewAvatar("/default-avatar.png");
  };

  const handleSaveProfile = () => {
    setUserProfile((prev) => ({
      ...prev,
      avatar: previewAvatar,
    }));
    setEditProfileOpen(false);
  };

  const [currentVisible, setCurrentVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-12 my-28">
        <div className="col-span-1"></div>

        <div className="col-span-10">
          {/* Card condo + Room number */}
          <div className="inline-flex items-center space-x-2 bg-[#3674B5] px-3 py-2 rounded-xl shadow-md hover:shadow-lg transition">
            <Image
              src={"/condo-icon.png"}
              alt="condo-icon"
              width={40}
              height={40}
              className="h-6 w-6"
            />
            <span className="text-white font-medium">
              {userDorm.dormName} | {userDorm.roomNumber}
            </span>
          </div>

          {/* การ์ดโปรไฟล์ (รวม Edit) */}
          <div className="bg-[#E2F0FF] p-8 rounded-xl mt-10 shadow flex flex-col space-y-4 transition-all duration-300">
            {/* Top: profile info */}
            <div
              className={`flex items-center justify-between ${editProfileOpen ? "pointer-events-none opacity-50" : ""
                }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={userProfile.avatar}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {userProfile.firstName} {userProfile.lastName}
                  </h2>
                  <p className="text-gray-700 flex items-center">
                    <Image
                      src={"/email-icon.png"}
                      alt="email-icon"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                    <span className="ps-1">{userProfile.email}</span>
                  </p>
                </div>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white px-4 py-2 rounded-xl shadow text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Change password
                </button>
                <button
                  onClick={() => setEditProfileOpen(!editProfileOpen)}
                  className="bg-[#3674B5] text-white px-4 py-2 rounded-xl text-sm hover:bg-sky-600 cursor-pointer"
                >
                  Edit profile
                </button>
              </div>
            </div>

            {/* Slide-down Edit profile */}
            {editProfileOpen && (
              <div className="pt-4 border-t border-gray-300 space-y-4">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={previewAvatar}
                      alt="Profile preview"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <label className="px-4 py-2 bg-[#3674B5] text-white rounded-xl cursor-pointer hover:bg-sky-600 transition">
                      Change picture
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-4 py-2 bg-[#EA5252] text-white rounded-xl hover:bg-[#E61D1D] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Name fields */}
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <label className="text-gray-700 font-medium">First name</label>
                    <input
                      type="text"
                      value={userProfile.firstName}
                      onChange={(e) =>
                        setUserProfile((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      className="w-full border rounded-xl px-3 py-2"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-gray-700 font-medium">Last name</label>
                    <input
                      type="text"
                      value={userProfile.lastName}
                      onChange={(e) =>
                        setUserProfile((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      className="w-full border rounded-xl px-3 py-2"
                    />
                  </div>
                </div>

                {/* Save & Cancel buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditProfileOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-[#3674B5] text-white rounded-xl hover:bg-sky-600 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="col-span-1"></div>
      </div>

      {/* Modal Change Password */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-xl w-96 shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#3674B5] text-white text-center py-3">
              <h3 className="text-xl font-semibold">Change Password</h3>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">
              {/* Current password */}
              <div className="relative">
                <input
                  type={currentVisible ? "text" : "password"}
                  placeholder="Current password"
                  className="w-full border rounded-xl px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setCurrentVisible(!currentVisible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={currentVisible ? "/eye-slash.png" : "/eye.png"}
                    alt="toggle password"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {/* New password */}
              <div className="relative">
                <input
                  type={newVisible ? "text" : "password"}
                  placeholder="New password"
                  className="w-full border rounded-xl px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setNewVisible(!newVisible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={newVisible ? "/eye-slash.png" : "/eye.png"}
                    alt="toggle password"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {/* Confirm new password */}
              <div className="relative">
                <input
                  type={confirmVisible ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full border rounded-xl px-3 py-2 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setConfirmVisible(!confirmVisible)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={confirmVisible ? "/eye-slash.png" : "/eye.png"}
                    alt="toggle password"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-lg bg-[#3674B5] text-white hover:bg-sky-600 cursor-pointer">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
