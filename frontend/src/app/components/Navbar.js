"use client";

import Link from "next/link";

import logo from "./assets/logo.svg";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState("portfolio");

  const handleMenuSelect = (e) => {
    console.log(e.target.value);
  }

  return (
    <nav className="flex flex-col gap-4 p-4 text-black w-fit h-screen shadow-md">
      <div className="flex">
        <Image src={logo} alt="logo" priority="true"/>
      </div>
      <spacer className="h-10"></spacer>
      <ul className="flex text-xl font-semibold flex-col justify-center text-start gap-4 items-center">
        <li>
          <Link href="/" className="hover:text-orange-500" onClick={handleMenuSelect}>
            Portfolio
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/market" className="hover:text-orange-500" onClick={handleMenuSelect}>
            Markets
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/busd" className="hover:text-orange-500" onClick={handleMenuSelect}>
            bUSD
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/borrow" className="hover:text-orange-500" onClick={handleMenuSelect}>
            News
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link href="/deposit" className="hover:text-orange-500" onClick={handleMenuSelect}>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
