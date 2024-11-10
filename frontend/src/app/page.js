"use client";

import Image from "next/image";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button, Divider } from "@nextui-org/react";
import Swap from "./components/Swap";
import { Line } from 'react-chartjs-2';
import { useState } from "react";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import BtcLogo from "./components/assets/btc-icon.svg";

import Steelers from "./components/assets/steelers.svg";

import Chiefs from "./components/assets/chiefs.svg";

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
  Legend,
  ChartDataLabels
);

export default function Dashboard() {
  const [asset, setAsset] = useState("bUSD");

  const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRXE4WXy29ldj6Ds63QuzHAV8G3e3OvPf7_A&s";

  const chiefsLogo = "https://cdn.freebiesupply.com/images/large/2x/kansas-city-chiefs-logo-transparent.png";

  const ethLogo = "https://cryptologos.cc/logos/ethereum-eth-logo.png";

  const bidenLogo = "https://images.mktw.net/im-41684901?width=1260&height=869";

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: `Portfolio Value`,
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // This removes the grid lines on the x-axis
        },
        ticks: {
          maxTicksLimit: 5, // Adjust this number to the desired number of labels
        },
      },
      y: {
        grid: {
          display: false, // This removes the grid lines on the y-axis
        },
        ticks: {
          callback: function(value) {
            // Skip the label for the origin (0)
            if (value < 68000) {
              return '';
            }
            return '$' + value.toLocaleString();
          },
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
        label: 'Portfolio Value',
        data: closePrices,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.1,
        pointRadius: 0
      },
    ],
  };

  const handleSelection = (e) => {
    setAsset(e.target.value);
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full pr-4 pl-4 items-center">
        <h1 className="text-4xl p-4 font-semibold drop-shadow-lg">
          Portfolio
        </h1>
        <div className="p-4 flex w-full items-center justify-between">
          <div className="flex gap-4">
            <div>
              <small className="">Portfolio</small>
              <h1 className="text-2xl">$76,456</h1>
            </div>
            <div>
              <small className="">Cash</small>
              <h1 className="text-2xl">$12,345</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Tabs>
              <Tab key="portfolio" title="Portfolio"></Tab>
              <Tab key="assets" title="Assets"></Tab>
              <Tab key="history" title="History"></Tab>
            </Tabs>
          </div>
        </div>
        <div className="w-full h-3/4 pl-4 pr-4 flex flex-col items-center">
          <div className="rounded-lg w-3/5 h-1/2 flex justify-center items-center flex-col mb-20 mt-8 bg-slate-50 p-4">
            <Line options={options} data={data}/>
          </div>
          <h1 className="mb-2 text-xl drop-shadow-lg">Markets</h1>
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex gap-2">
                  <Image alt="market" src={logo} width={25} height={25} className="rounded-md"/>
                  Will Bitcoin reach $100,000 by the end of 2024?
                </CardHeader>
                <CardBody>
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex gap-2">
                      <Button color="success">Yes</Button>
                      <Button color="danger">No</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader className="flex gap-2">
                  <Image alt="market" src={chiefsLogo} width={25} height={25} className="rounded-md"/>
                  Will the Chiefs win the Superbowl?
                </CardHeader>
                <br />
                <CardBody>
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex gap-2">
                      <Button color="success">Yes</Button>
                      <Button color="danger">No</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader className="flex gap-2">
                  <Image alt="market" src={ethLogo} width={25} height={25} className="rounded-md"/>
                  Will Ethereum reach $4,500 by the end of 2024?
                </CardHeader>
                <CardBody>
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex gap-2">
                      <Button color="success">Yes</Button>
                      <Button color="danger">No</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardHeader className="flex gap-2">
                  <Image alt="market" src={bidenLogo} width={25} height={25} className="rounded-md"/>
                  Will Biden finish his Presidential term?
                </CardHeader>
                <br />
                <CardBody>
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex gap-2">
                      <Button color="success">Yes</Button>
                      <Button color="danger">No</Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="flex justify-center">
                  Activity
                </CardHeader>
                <CardBody>
                  <div className="flex h-8 justify-center gap-4">
                    <Image src={Chiefs} alt="chiefs logo" width={35} height={35}/>
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">Will the Chiefs win the Superbowl?</div>
                      <small className="flex gap-1">Phil bought <span className="text-green-600">Yes</span> at 19.5¢ ($39.20)</small>
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardBody>
                  <div className="flex h-8 justify-center gap-4">
                    <Image src={BtcLogo} alt="btc logo" width={25} height={25}/>
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">Will BTC be {'>'} 75k on Nov. 30th?</div>
                      <small className="flex gap-1">Hayley sold <span className="text-red-600">No</span> at 40.2¢ ($254.87)</small>
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardBody>
                  <div className="flex h-8 justify-center gap-4">
                    <Image src={Steelers} alt="btc logo" width={25} height={25}/>
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">Will the Steelers win the Superbowl?</div>
                      <small className="flex gap-1">Dom bought <span className="text-red-600">No</span> at 97.7¢ ($488.50)</small>
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardBody>
                  <div className="flex h-8 justify-center gap-4">
                    <Image src={Steelers} alt="btc logo" width={25} height={25}/>
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">Will BTC be {'>'} 75k on Nov. 30th?</div>
                      <small className="flex gap-1">Alex bought <span className="text-green-600">Yes</span> at 59.8¢ ($41.86)</small>
                    </div>
                  </div>
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
  );
}
