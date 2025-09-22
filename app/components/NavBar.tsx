"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 bg-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-xl">
          Restobook 🍽️
        </Link>
        <div className="space-x-6">
          <Link href="/reservations" className="hover:underline">
            Reservations
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/register" className="hover:underline">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
