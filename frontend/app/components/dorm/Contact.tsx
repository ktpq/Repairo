"use client"
import Image from "next/image"

export default function ContactMapOverlay() {
    const mapUrl =
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.811013152172!2d100.77565737493228!3d13.729888886659674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664988a1bedf%3A0xcc678f180e221cd0!2sKing%20Mongkut's%20Institute%20of%20Technology%20Ladkrabang!5e0!3m2!1sen!2sth!4v1758132208210!5m2!1sen!2sth"

    // Mock data
    const mockdata = {
        phone: "+66 81 234 5678",
        line: "@Repairo"
    }

    return (
        <div className="flex justify-center py-6 relative w-full">
            {/* Map */}
            <div className="w-full h-82 rounded-lg overflow-hidden shadow-lg">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Info Box */}
            <div className="absolute top-40 left-3 bg-white p-3 shadow-xl rounded-sm w-75">
                <h2 className="font-bold text-md">Contact</h2>
                <p className="text-xs mt-1 flex items-center gap-1">
                    <svg width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9264 9.72835L11.1345 11.336C11.3714 12.1467 11.7023 12.927 12.1204 13.6608C12.5565 14.3893 13.082 15.0604 13.6847 15.6585L16.0052 14.9435C17.3052 14.5427 18.7244 14.9543 19.5889 15.9835L20.9105 17.5565C21.4456 18.188 21.7139 19.003 21.6585 19.8288C21.6031 20.6547 21.2284 21.4265 20.6137 21.9809C18.4579 23.9482 15.1385 24.6133 12.6534 22.6612C10.4682 20.9424 8.61999 18.8342 7.20203 16.4428C5.78048 14.0633 4.82872 11.4331 4.39837 8.69485C3.9217 5.61385 6.1772 3.14818 8.98954 2.30752C10.6665 1.80485 12.4562 2.66718 13.0715 4.27485L13.7974 6.17068C14.274 7.41868 13.9317 8.82701 12.9264 9.72835Z" fill="#3674B5" />
                    </svg>
                    <span>{mockdata.phone}</span>
                </p>
                <p className="text-xs mt-1 flex items-center gap-1">
                    <Image
                        src={"/line-icon.png"}
                        alt="line-icon"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                    />
                    <span>{mockdata.line}</span>
                </p>
            </div>
        </div>
    )
}
