"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon } from "lucide-react";
interface Spending {
  date: Date
  cost: number
  category: number
}

const categories = {
  0: "MAKAN MINUM",
  1: "UTILITY",
  2: "ENTERTAINMENT",
  3: "CHARITY"
}

const maxIndex = Object.keys(categories).length - 1

function getCategory(index: number): string {
  if (index < 0) {
    return categories[0]
  }
  if (index > 3) {
    return categories[3]
  }
  return categories[index as keyof typeof categories]
}


export default function App() {
  const [spending, setSpending] = useState<Spending[]>([])
  const [cost, setCost] = useState(50000)
  const [spendingType, setSpendingType] = useState<number>(0)

  function submit() {
    setSpending([...spending, { cost: cost, category: spendingType, date: new Date() }])
  }

  return (
    <div className="flex flex-col items-center justify-center w-96 space-y-4 p-4 mx-auto mt-12">
      <div className="flex flex-col items-center justify-center mb-12">
        <Image src="/logo.png" alt="Duitku" width={100} height={100} />
        <h1 className="text-4xl font-bold">Duitku</h1>
        <small>cukup pilih angka sama kategorinya, trus simpen deh!</small>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between space-x-2">
          <Button onClick={() => setCost(cost - 10000)}>
            <MinusIcon />
          </Button>
          <Button size="sm" onClick={() => setCost(cost - 1000)}>
            <MinusIcon />
          </Button>
          <div className="relative">
            <Input
              type="text"
              value={cost.toLocaleString("id-ID")}
              onChange={(e: { target: { value: string } }) => {
                const numericValue = Number(e.target.value.replace(/\D/g, ""));
                setCost(numericValue);
              }}
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <Button size="sm" onClick={() => setCost(cost + 1000)}>
            <PlusIcon />
          </Button>
          <Button onClick={() => setCost(cost + 10000)}>
            <PlusIcon />
          </Button>
        </div>
        <small className="mx-auto">dipake buat:</small>
        <div className="flex items-center justify-between space-x-2">
          <Button
            onClick={() =>
              setSpendingType(spendingType === 0 ? 3 : spendingType - 1)
            }
          >
            <ChevronLeftIcon />
          </Button>
          <select
            value={spendingType}
            onChange={(e) => setSpendingType(Number(e.target.value))}
            className="border-2 border-gray-300 rounded-md p-2 w-full"
          >
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              setSpendingType(spendingType === maxIndex ? 0 : spendingType + 1)
            }
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <Button onClick={() => submit()} className="w-full">
        Simpen
      </Button>
      <div className="flex flex-col items-center justify-center p-2">
        <small>Pengeluaran hari ini:</small>
        <span className="p-2">{spending.filter((spending: Spending) => spending.date.toLocaleDateString() === new Date().toLocaleDateString()).reduce((acc, curr) => acc + curr.cost, 0).toLocaleString("id-ID")}</span>
      </div>
      <div className="flex flex-col items-center justify-center p-2">
        {spending.map((spending: Spending, i: number) => (
          <div key={spending.date.toLocaleDateString() + i}>
            <span className="p-2">{spending.date.toLocaleDateString()}</span>
            <span className="p-2">{spending.cost.toLocaleString("id-ID")}</span>
            <span className="p-2">{getCategory(spending.category)}</span>
          </div>
        ))}
      </div>

      <footer className="flex flex-row items-center justify-center p-2 mt-28">
        built by <a href="https://x.com/kafinsm" target="_blank" rel="noopener noreferrer" className="pl-2">@kafinsm</a>
      </footer>
    </div>
  );
}