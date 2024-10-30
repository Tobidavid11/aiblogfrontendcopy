"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter } from "lucide-react"

type Transaction = {
  type: string
  date: string
  amount: string
  status: "Successful" | "Pending" | "Unsuccessful"
}

const transactions: Transaction[] = [
  { type: "Withdrawal", date: "Oct 27, 2024", amount: "+340ETH", status: "Successful" },
  { type: "Reward", date: "Oct 27, 2024", amount: "+340ETH", status: "Successful" },
  { type: "Job payment", date: "Oct 27, 2024", amount: "+340ETH", status: "Successful" },
  { type: "Job payment", date: "Oct 27, 2024", amount: "+340ETH", status: "Pending" },
  { type: "Deposit", date: "Oct 27, 2024", amount: "+340ETH", status: "Successful" },
  { type: "Deposit", date: "Oct 27, 2024", amount: "+340ETH", status: "Unsuccessful" },
]

export function WalletDetails() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Wallet</CardTitle>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Date
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle font-medium">{transaction.type}</td>
                  <td className="p-4 align-middle text-muted-foreground">
                    {transaction.date}
                  </td>
                  <td className="p-4 align-middle">{transaction.amount}</td>
                  <td className="p-4 align-middle">
                    <Badge
                      variant="outline"
                      className={
                        transaction.status === "Successful"
                          ? "text-green-500"
                          : transaction.status === "Pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}