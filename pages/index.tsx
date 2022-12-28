import React from "react"

export default function Me() {
  return (
    <div className="p-2 w-5/6 min-h-screen mx-auto grid grid-cols-12 grid-flow-row-dense auto-rows-[128px] gap-2 bg-white dark:bg-gray-800 text-black dark:text-gray-400">
      <div className="lg:col-span-6 lg:row-span-4">
        <Card>01</Card>
      </div>
      <div className="lg:col-span-4 lg:row-span-3">
        <Card>02</Card>
      </div>
      <div className="lg:col-span-2 lg:row-span-4">
        <Card>03</Card>
      </div>
      <div className="lg:col-span-4 lg:row-span-1">
        <Card>04</Card>
      </div>
      <div className="lg:col-span-3 lg:row-span-2">
        <Card>05</Card>
      </div>
      <div className="lg:col-span-3 lg:row-span-2">
        <Card>06</Card> 
      </div>
      <div className="lg:col-span-3 lg:row-span-2">
        <Card>07</Card>
      </div>
      <div className="lg:col-span-3 lg:row-span-2">
        <Card>08</Card>
      </div>
    </div>
  )
}

interface ICardProps { children: React.ReactNode }

const Card = ({ children }: ICardProps) => {
  return (
    <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700">
      {children}
    </div>
  )
}