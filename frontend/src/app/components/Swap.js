import { CardHeader, Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/react"
import { Select } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import Levels from "./assets/levels.svg"
import Image from "next/image"

export default function Swap() {
    return(
        <div className="bg-slate-50 flex flex-col h-full text-black p-4">
            <Image src={Levels} className="mt-32"/>
            <Card className="mt-24">
                <CardHeader className="p-2 flex gap-2 justify-center">
                    <a>Deposit</a>
                    <Divider orientation="vertical" />
                    <a>Withdraw</a>
                </CardHeader>
                <CardBody className="flex flex-col gap-2">
                    <Select></Select>
                    <Select></Select>
                    <Select></Select>
                    <Button color="success">Deposit</Button>
                </CardBody>
            </Card>
        </div>
    )
}