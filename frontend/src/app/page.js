"use client"

import Image from "next/image";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Divider } from "@nextui-org/react";
import Swap from "./components/Swap";

export default function Dashboard() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-center w-full p-4">
        <h1 className="text-2xl p-4">
          Portfolio
        </h1>
        <div className="border h-px w-full"></div>
        <div className="p-4 flex w-4/5 items-center justify-between">
          <div>
            <small className="text-grey">Total balance</small>
            <h1 className="text-2xl">$123,456</h1>
          </div>
          <div className="flex gap-2">
            <Tabs>
                <Tab key="portfolio" title="Portfolio">
                  
                </Tab>
                <Tab key="assets" title="Assets">
                  
                </Tab>
                <Tab key="history" title="History">
                  
                </Tab>
              </Tabs>
          </div>
        </div>
        <div className="w-full h-full p-4">
          <div className="rounded-md w-full h-1/2">

          </div>
          <h1 className="mt-2 mb-2 text-xl">Markets</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <Image />
                  Market Name
                </CardHeader>
                <CardBody>Here is some more info.</CardBody>
              </Card>
              <Card>
              <CardHeader>
                  <Image />
                  Market Name
                </CardHeader>
                <CardBody>Here is some more info.</CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Image />
                  Market Name
                </CardHeader>
                <CardBody>Here is some more info.</CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <Image />
                  Market Name
                </CardHeader>
                <CardBody>Here is some more info.</CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="flex justify-center">
                  Activity
                </CardHeader>
                <CardBody>
                  Text
                </CardBody>
                <Divider />
                <CardBody>
                  Text
                </CardBody>
                <Divider />
                <CardBody>
                  Text
                </CardBody>
                <Divider />
                <CardBody>
                  Text
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <Swap />
      </div>
    </div>
  )
}