"use client";

import Link from "next/link";

import logo from "./assets/logo.svg";

import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-4 p-4 m-2 rounded-lg bg-white text-black w-1/6 shadow-md rounded-br-lg">
      <div className="flex mt-12 mb-5 items-center justify-center">
        <Image src={logo} alt="logo" priority="true" />
      </div>
      <spacer className="h-10"></spacer>
      <ul className="flex text-xl font-semibold flex-col justify-center text-start gap-4">
        <li>
          <Link href="/" className="hover:text-orange-500">
            Portfolio
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/market" className="hover:text-orange-500">
            Markets
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/borrow" className="hover:text-orange-500">
            News
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/deposit" className="hover:text-orange-500">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
