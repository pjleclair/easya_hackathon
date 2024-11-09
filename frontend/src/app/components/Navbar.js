"use client";

import Link from "next/link";

import logo from "./assets/logo.svg";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-4 p-4 text-black bg-slate-50 w-fit h-screen border-r-4">
      <div className="flex">
        <Image src={logo} />
      </div>
      <div className="border h-px w-full"></div>
      <ul className="flex flex-col justify-center text-center gap-4">
        <li>
          <Link href="/" className="hover:text-orange-500">
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/market" className="hover:text-orange-500">
            Markets
          </Link>
        </li>
        <li>
          <Link href="/borrow" className="hover:text-orange-500">
            News
          </Link>
        </li>
        <li>
          <Link href="/deposit" className="hover:text-orange-500">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
