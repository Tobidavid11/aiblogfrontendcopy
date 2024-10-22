import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, EyeIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from "../shared/button";

type ModalType = "deposit" | "withdraw";

interface WalletModalsProps {
  walletAddress: string;
  balance: number;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export default function WalletModals({
  walletAddress,
  balance = 0,
  onDeposit,
  onWithdraw,
}: WalletModalsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("deposit");
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setAmount("");
      setRecipientAddress("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (modalType === "deposit") {
      onDeposit(numAmount);
    } else {
      if (numAmount > balance) {
        alert("Insufficient funds");
        return;
      }
      onWithdraw(numAmount);
    }
    setIsOpen(false);
  };

  const setPercentage = (percentage: number) => {
    setAmount(((balance ?? 0) * percentage).toFixed(2));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setModalType("deposit")}
          className="mr-2 flex items-center gap-2 rounded-lg"
          color="secondary"
        >
          <ArrowUp />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setModalType("withdraw")}
          className="flex items-center gap-2 rounded-lg"
        >
          <ArrowDown />
          Withdraw
        </Button>
      </DialogTrigger> 
 
      <DialogContent className="sm:max-w-[425px] lg:min-w-[550px] py-16 min-h-[450px] ">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-4">      
              <div className="flex items-center gap-1"><Image
                  src="/metamask.svg"
                  alt="currency"
                  width={40}
                  height={35}
                /><span>{walletAddress}</span></div>
              <Copy className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2 rounded-lg px-4 py-2 border boder-gray-400">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/CurrencyEth.svg"
                  alt="currency"
                  width={24}
                  height={24}
                />
                <span className="opacity-70">Ethereum</span>{" "}
              </div>
              <span>${balance?.toFixed(2) ?? "0.00"}</span> <EyeIcon />
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={modalType}
          className="w-full"
          onValueChange={(value) => setModalType(value as ModalType)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="deposit"
              className="flex items-center gap-2 border-b border-transparent data-[state=active]:border-[#fbc316]"
            >
              <ArrowUp />
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="flex items-center gap-2 border-b border-transparent data-[state=active]:border-[#fbc316]"
            >
              <ArrowDown />
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center py-4">
                <Image
                  src="/images/wallet.svg"
                  width={46}
                  height={52}
                  alt="Transfer funds"
                  className="mx-auto mb-2"
                />
                <p>Transfer Funds into your wallet address</p>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" color="secondary" className="rounded-lg">
                  Fund
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="withdraw">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="from">Send from</Label>
                <Input id="from" value={walletAddress} readOnly />
              </div>
              <div>
                <Label htmlFor="to">Send to</Label>
                <Input
                  id="to"
                  placeholder="Enter the wallet address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </div>
              <div className="space-x-3">
                <Label htmlFor="amount">Amount</Label>
                <Label htmlFor="amount" className="w-full flex justify-between items-center mb-2"><span>% amount to withdraw</span> <div className="flex justify-between gap-2">
                <button
                className="px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40"
                  onClick={() => setPercentage(0.2)}
                  type="button"
                >
                  
                  20%
                </button>
                <button
                  type="button"
                  className="px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40"
       
                
                  onClick={() => setPercentage(0.5)}
                > 
                  50%
                </button>
                <button
                className="px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40"
                 type="button"
                  onClick={() => setPercentage(1)}   
                >
                  Max
                </ button>
              </div>
              </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

              </div>
              
              <Button type="submit" color="secondary" className="w-full flex items-center gap-2 justify-center">
              <ArrowDown /> Withdraw
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
