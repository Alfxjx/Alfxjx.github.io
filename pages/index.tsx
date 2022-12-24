import React from "react"

export default function Me() {
  return (
    <div className="w-full min-h-screen overflow-hidden grid grid-cols-4 grid-rows-6 bg-white dark:bg-gray-800 text-black dark:text-gray-400">
      <Card row={2} col={4}>01</Card>
      <Card row={1} col={4}>02</Card>
      <Card row={2} col={2}>03</Card>
    </div>
  )
}

interface ICardProps { row: number, col: number, children: React.ReactNode }

const Card = ({ row, col, children }: ICardProps) => {
  return (
    <div className={`col-span-${col} row-span-${row}`}>
      <div className="w-full h-full rounded-lg bg-gray-200 dark:bg-gray-700">
        {children}
      </div>
    </div>
  )
}