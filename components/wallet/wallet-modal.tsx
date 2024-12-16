import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, Check, EyeIcon, EyeOff } from "lucide-react";
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
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useTransaction,
} from "wagmi";
import { parseEther } from "viem";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Helper function to truncate address
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

type ModalType = "deposit" | "withdraw";

interface WalletModalsProps {
  walletAddress: string;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  openBalance: () => void;
  showBalance: boolean;
}

export default function WalletModals({
  walletAddress,
  onDeposit,
  onWithdraw,
  openBalance,
  showBalance,
}: WalletModalsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("deposit");
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();

  const { address } = useAccount();
  const { data: walletBalance } = useBalance({
    address: address,
  });

  const { data: txHash, sendTransaction } = useSendTransaction();

  const { isLoading, isSuccess } = useTransaction({
    hash: txHash,
  });

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
        duration: 2000,
      });

      // Reset copy success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try again",
      });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setAmount("");
      setRecipientAddress("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount",
      });
      return;
    }

    try {
      if (modalType === "deposit") {
        onDeposit(numAmount);
        toast({
          title: "Success",
          description: "Deposit initiated",
        });
      } else {
        if (!recipientAddress) {
          toast({
            variant: "destructive",
            title: "Missing address",
            description: "Please enter a recipient address",
          });
          return;
        }

        if (
          numAmount >
          (walletBalance?.formatted ? parseFloat(walletBalance.formatted) : 0)
        ) {
          toast({
            variant: "destructive",
            title: "Insufficient funds",
            description: "Your balance is too low for this withdrawal",
          });
          return;
        }

        if (sendTransaction) {
          sendTransaction({
            to: recipientAddress as `0x${string}`,
            value: parseEther(amount),
          });
          onWithdraw(numAmount);
          toast({
            title: "Success",
            description: "Withdrawal initiated",
          });
        }
      }
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Transaction failed",
        description: "Please try again",
      });
      console.error("Transaction error:", error);
    }
  };

  const setPercentage = (percentage: number) => {
    const maxAmount = walletBalance?.formatted
      ? parseFloat(walletBalance.formatted)
      : 0;
    setAmount((maxAmount * percentage).toFixed(6));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <div className="flex gap-2">
        <DialogTrigger asChild>
          <Button
            onClick={() => setModalType("deposit")}
            className="flex items-center justify-center gap-2 rounded-lg w-full sm:w-auto"
            color="secondary"
          >
            <ArrowUp className="w-4 h-4" />
            Deposit
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setModalType("withdraw")}
            className="flex items-center justify-center gap-2 rounded-lg w-full sm:w-auto"
          >
            <ArrowDown className="w-4 h-4" />
            Withdraw
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px] lg:max-w-[550px] w-[95vw] py-8 sm:py-16 min-h-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <Image
                  src="/metamask.svg"
                  alt="currency"
                  width={40}
                  height={35}
                />
                <span className="text-sm sm:text-base">
                  {truncateAddress(walletAddress)}
                </span>
              </div>
              <button
                className={`p-1 rounded-md transition-all duration-200 hover:bg-gray-100 ${
                  copySuccess ? "bg-green-50" : ""
                }`}
                onClick={() => handleCopy(walletAddress)}
              >
                {copySuccess ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 rounded-lg px-4 py-2 border border-gray-200 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/CurrencyEth.svg"
                  alt="currency"
                  width={24}
                  height={24}
                />
                <span className="opacity-70 text-sm sm:text-base hidden md:block">
                  Ethereum
                </span>
              </div>
              <span className="text-sm sm:text-base">
                {showBalance
                  ? `${walletBalance?.formatted || "0.00"} ${
                      walletBalance?.symbol || "ETH"
                    }`
                  : "*****"}
              </span>
              <button
                onClick={openBalance}
                className="p-1 rounded-md hover:bg-gray-100 transition-all duration-200"
              >
                {showBalance ? <EyeOff size={16} /> : <EyeIcon size={16} />}
              </button>
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
              className="flex items-center justify-center gap-2 border-b border-transparent data-[state=active]:border-[#fbc316]"
            >
              <ArrowUp className="w-4 h-4" />
              Deposit
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="flex items-center justify-center gap-2 border-b border-transparent data-[state=active]:border-[#fbc316]"
            >
              <ArrowDown className="w-4 h-4" />
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
                <p className="text-sm sm:text-base">
                  Transfer Funds into your wallet address
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="number"
                  placeholder="Enter Amount (ETH)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-grow"
                  step="0.000001"
                  min="0"
                />
                <Button
                  type="submit"
                  color="secondary"
                  className="rounded-lg w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Fund"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="withdraw">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="from" className="text-sm">
                  Send from
                </Label>
                <div className="relative">
                  <Input
                    id="from"
                    value={truncateAddress(walletAddress)}
                    readOnly
                    className="text-sm pr-10"
                  />
                  <button
                    type="button"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md transition-all duration-200 hover:bg-gray-100 ${
                      copySuccess ? "bg-green-50" : ""
                    }`}
                    onClick={() => handleCopy(walletAddress)}
                  >
                    {copySuccess ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="to" className="text-sm">
                  Send to
                </Label>
                <Input
                  id="to"
                  placeholder="Enter the wallet address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm">
                  Amount
                </Label>
                <Label
                  htmlFor="amount"
                  className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2"
                >
                  <span className="text-sm">% amount to withdraw</span>
                  <div className="flex justify-between gap-2">
                    {[20, 50, 100].map((percent) => (
                      <button
                        key={percent}
                        type="button"
                        className="px-2 sm:px-4 py-1 hover:bg-black text-black hover:text-white rounded-[20px] border border-black/40 text-xs sm:text-sm transition-colors duration-200"
                        onClick={() => setPercentage(percent / 100)}
                      >
                        {percent === 100 ? "Max" : `${percent}%`}
                      </button>
                    ))}
                  </div>
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-sm"
                  step="0.000001"
                  min="0"
                />
              </div>

              <Button
                type="submit"
                color="secondary"
                className="w-full flex items-center gap-2 justify-center"
                disabled={!sendTransaction || isLoading}
              >
                <ArrowDown className="w-4 h-4" />
                {isLoading ? "Processing..." : "Withdraw"}
              </Button>

              {isSuccess && (
                <div className="mt-2 text-sm text-green-500">
                  Transaction successful! Hash: {txHash}
                </div>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
