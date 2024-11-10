"use client";

import Link from "next/link";

import logo from "./assets/logo.svg";

import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState("portfolio");

  return (
    <nav className="flex flex-col rounded-lg gap-4 p-4 text-black w-1/5 h-screen shadow-md">
      <div className="flex p-4 justify-center items-center">
        <Image src={logo} alt="logo" priority="true" />
      </div>
      <spacer className="h-10"></spacer>
      <ul className="flex text-xl font-semibold flex-col justify-center text-start gap-4 items-center">
        <li>
          <Link
            href="/"
            className={`hover:text-orange-500 ${nav==="portfolio" && 'text-orange-500'}`}
            onClick={() => setNav("portfolio")}>
            Portfolio
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link
            href="/market"
            className={`hover:text-orange-500 ${nav==="market" && 'text-orange-500'}`}
            onClick={() => setNav("market")}>
            Markets
          </Link>
        </li>
        <spacer className="h-4"></spacer>
        <li>
          <Link
            href="/busd"
            className={`hover:text-orange-500 ${nav==="busd" && 'text-orange-500'}`}
            onClick={() => setNav("busd")}>
            bUSD
          </Link>
        </li>
      </ul>
    </nav>
  );
}
