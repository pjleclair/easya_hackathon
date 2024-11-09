import { CardHeader, Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/react"
import Levels from "./assets/levels.svg"
import Image from "next/image"

export default function Swap() {
    return(
        <div className="bg-slate-50 flex flex-col h-full text-black">
            <Image src={Levels} className="mt-32"/>
            <Card>
                <CardHeader className="p-2 flex gap-2 justify-center">
                    <a>Deposit</a>
                    <Divider orientation="vertical" />
                    <a>Withdraw</a>
                </CardHeader>
                <CardBody>
                    Test
                </CardBody>
            </Card>
        </div>
    )
}