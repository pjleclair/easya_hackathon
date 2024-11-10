"use client"

import { Input } from "@nextui-org/react";

export default function bUSD() {
    return (
        <div className="flex flex-col gap-4 pl-4 pr-4 items-center w-full">
            <h1 className="mt-8 text-4xl font-semibold">Mint bUSD</h1>
            <div className="bg-slate-50 rounded-md">
                <Input label="Collateral Amount" placeholder="1" description="~ $ 75.4k"/>
                <Input label="Mint bUSD" placeholder="1000" description="Min: 10 bUSD"/>
            </div>
        </div>
    )
}