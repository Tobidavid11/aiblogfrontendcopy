"use client";

import { useState } from "react";
import { Copy, EyeOff } from "lucide-react";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import WalletModals from "./wallet-modal";

export default function WalletDashboard() {
  const [balance, setBalance] = useState(7610.0);
  const [transactions, setTransactions] = useState([
    { type: "reward", date: "12/08/24", amount: "+340 ETH" },
    { type: "withdrawal", date: "12/08/24", amount: "+340 ETH" },
    { type: "job", date: "12/08/24", amount: "+340 ETH" },
    { type: "reward", date: "12/08/24", amount: "+340 ETH" },
    { type: "withdrawal", date: "12/08/24", amount: "+340 ETH" },
  ]);

  const walletAddress = "0x27D9a...6BD04";

  const handleDeposit = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions((prevTransactions) => [
      {
        type: "deposit",
        date: new Date().toLocaleDateString(),
        amount: `+${amount} ETH`,
      },
      ...prevTransactions,
    ]);
  };

  const handleWithdraw = (amount: number) => {
    if (amount <= balance) {
      setBalance((prevBalance) => prevBalance - amount);
      setTransactions((prevTransactions) => [
        {
          type: "withdrawal",
          date: new Date().toLocaleDateString(),
          amount: `-${amount} ETH`,
        },
        ...prevTransactions,
      ]);
    } else {
      alert("Insufficient funds");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>My Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {walletAddress}
                    </span>
                    <Copy className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-4 flex items-center gap-4">
                  <Image
                    src="/images/CurrencyEth.svg"
                    alt="currency" 
                    width={32}
                    height={32}
                  />
                  <span>$ {balance.toFixed(2)}</span> 
                  <EyeOff size={24} />
                </div>
                <div className="flex space-x-4 mb-8">
                  <WalletModals
                    walletAddress={walletAddress}
                    balance={balance}
                    onDeposit={handleDeposit}
                    onWithdraw={handleWithdraw}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
            <CardContent className="py-8">
           
              <h3 className="text-lg font-semibold mb-4">History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           
            </CardContent>
            </Card>
            
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ways to Earn on dRello</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Every description will be saved as drafts for recovery
                </p>
                <ul className="space-y-4">
                  {[
                    {
                      title: "Create Engaging Content",
                      description:
                        "Post valuable content that gets liked, shared, and commented on to earn ETH based on engagement.",
                      status: "Available",
                    },
                    {
                      title: "Complete Jobs for ETH",
                      description:
                        "Take on tasks and jobs posted by others and complete them to earn rewards in ETH.",
                      status: "Available",
                    },
                    {
                      title: "Create Jobs and Pay Others",
                      description:
                        "Create your own jobs and tasks for other users to complete. Pay in ETH for each successful task.",
                      status: "Available",
                    },
                    {
                      title: "Participate in dRello Challenges",
                      description:
                        "Join platform-wide challenges and competitions to earn rewards based on your performance.",
                      status: "Coming soon",
                    },
                    {
                      title: "Monetize Your Blogs",
                      description:
                        "Publish long-form content and monetize it based on views and engagement.",
                      status: "Coming soon",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          item.status === "Available" ? "success" : "warning"
                        }
                      >
                        {item.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
