"use client"

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {Card, CardBody, CardHeader, Divider, Select, SelectItem} from "@nextui-org/react";
import Image from "next/image";

import Token from "../components/assets/token.svg";

import BtcLogo from "../components/assets/btc-icon.svg";

export default function bUSD() {


    return (
        <div className="flex flex-col pl-4 pr-4 items-center w-full">
            <h1 className="mt-8 mb-12 text-4xl font-semibold">Mint bUSD</h1>
            <div className="flex w-full gap-4 justify-center">
                <div className="bg-slate-50 rounded-md w-1/2 p-4 flex flex-col gap-12 items-center">
                    <Input label="Collateral Amount" placeholder="1" description="~ $ 75.4k"/>
                    <Input label="Mint bUSD" placeholder="1000" description="Min: 10 bUSD"/>
                    <div className="flex flex-col items-center shadow-md rounded-md w-2/3 p-2">
                        <div className="flex flex-col w-full items-center">
                            <div className="flex w-full justify-between">
                                <small>Collateral ratio</small>
                                <div className="ml-auto">7,540%</div>
                            </div>
                            <div className="flex w-full justify-between">
                                <small>Liquidation Price</small>
                                <div className="ml-auto">$1100.00</div>
                            </div>
                            <div className="flex w-full justify-between">
                                <small>Debt Amount</small>
                                <div className="ml-auto">1,007.00 bUSD</div>
                            </div>
                            <div className="flex w-full justify-between">
                                <small>Minting Fee</small>
                                <div className="ml-auto">0.50%</div>
                            </div>
                            <div className="flex w-full justify-between">
                                <small>Gas compensation</small>
                                <div className="ml-auto">2 bUSD</div>
                            </div>
                            <div className="flex w-full justify-between">
                                <small>Min CR</small>
                                <div className="ml-auto">110%</div>
                            </div>
                        </div>
                    </div>
                    <Button color="success">Create Position</Button>
                </div>
                <div>
                    <Card className="mt-24">
                        <CardHeader className="p-2 flex gap-2 justify-center">
                            <a>Deposit</a>
                            <Divider orientation="vertical" />
                            <a>Withdraw</a>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-2">
                            <Select label="Asset" defaultSelectedKeys={["susdt"]}>
                                <SelectItem key="susdt" textValue="bUSD" startContent={<Image alt="token" src={Token}/>}>bUSD</SelectItem>
                            </Select>
                            <Input type="number" label="Amount" placeholder="bUSD"/>
                            <Button color="success">Deposit</Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
            
            <h1 style={{
                textShadow: `
                1px 1px 0px rgba(0, 0, 0, 0.2),
                2px 2px 0px rgba(0, 0, 0, 0.2),
                3px 3px 0px rgba(0, 0, 0, 0.2),
                4px 4px 0px rgba(0, 0, 0, 0.2),
                5px 5px 5px rgba(0, 0, 0, 0.25),
                6px 6px 10px rgba(0, 0, 0, 0.2),
                7px 7px 15px rgba(0, 0, 0, 0.15)
                `,
            }}
            className="rounded-lg mt-12 text-8xl font-semibold absolute bottom-10 p-4 gap-4 text-center flex justify-center items-center drop-shadow-2xl">Unleash Trillions in Bitcoin <Image width={250} src={BtcLogo} alt="btc logo"/></h1>
        </div>
    )
}