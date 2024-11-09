import {Tabs, Tab} from "@nextui-org/tabs";

export default function Dashboard() {
  return (
  <div className="flex flex-col justify-center w-full h-full p-4">
    <h1 className="text-2xl p-4">
      Portfolio
    </h1>
    <div className="border h-px w-full"></div>
    <div className="p-4">
      <div>
        <small className="text-grey">Total balance</small>
        <h1 className="text-2xl">$123,456</h1>
      </div>
      <div>
        <Tabs>
          <Tab key="Portfolio" title="Portfolio">

          </Tab>
          <Tab key="Assets" title="Assets">

          </Tab>
          <Tab key="History" title="History">

          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
)
}