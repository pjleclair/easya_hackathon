"use client"

import Image from "next/image";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Divider } from "@nextui-org/react";
import Swap from "./components/Swap";
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bitcoin Price History',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const dates = [
    '2024-10-21', '2024-10-22', '2024-10-23', '2024-10-24', '2024-10-25',
    '2024-10-26', '2024-10-27', '2024-10-28', '2024-10-29', '2024-10-30',
    '2024-10-31', '2024-11-01', '2024-11-02', '2024-11-03', '2024-11-04',
    '2024-11-05', '2024-11-06', '2024-11-07', '2024-11-08', '2024-11-09'
  ]

  const openPrices = [
    68963, 67395, 67351, 66684, 68214, 66586, 67018, 67939, 69845, 72781,
    72343, 70265, 69508, 69299, 68804, 67793, 69335, 75621, 75987, 76550
  ]

  const closePrices = [
    67395, 67351, 66684, 68214, 66586, 67018, 67939, 69845, 72781, 72343,
    70265, 69508, 69299, 68804, 67793, 69335, 75621, 75987, 76550, null
  ]

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Opening Price',
        data: openPrices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      },
      {
        label: 'Closing Price',
        data: closePrices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.1
      },
    ],
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col justify-center w-full p-4">
        <h1 className="text-2xl p-4">
          Portfolio
        </h1>
        <div className="border h-px w-full"></div>
        <div className="p-4 flex w-full items-center justify-between">
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
          <div className="rounded-md w-full h-1/2 flex justify-center">
            <Line options={options} data={data}/>
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