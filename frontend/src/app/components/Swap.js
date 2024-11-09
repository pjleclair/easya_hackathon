import { CardHeader, Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/react"
import { Select, SelectItem } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import Levels from "./assets/levels.svg"
import Image from "next/image"
import Token from "./assets/token.svg"

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
                    <Select label="Asset" defaultSelectedKeys={["susdt"]}>
                        <SelectItem key="susdt" textValue="bUSD" startContent={<Image alt="token" src={Token}/>}>bUSD</SelectItem>
                    </Select>
                    <Input type="number" label="Amount" placeholder="bUSD"/>
                    <Button color="success">Deposit</Button>
                </CardBody>
            </Card>
        </div>
    )
}