"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Wallet2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Redirecting from "./redirecting";

type Wallet = "phantom" | "metamask";
export default function ConnectWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const wallets: { name: Wallet; icon: string }[] = [
    { name: "phantom", icon: "/phantom.svg" },
    { name: "metamask", icon: "/metamask.svg" },
  ];

  const mockConnect = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setIsConnected(true);
    setIsLoading(false);
  };

  return (
    <div className="max-w-[530px] mx-auto font-dm-sans">
      {isLoading ? (
        <Redirecting />
      ) : (
        <Card className="rounded-xl overflow-hidden bg-whitesmoke">
          <CardHeader className="">
            <CardTitle className="text-text-color text-xl">
              Connect Wallet
            </CardTitle>
            <CardDescription className="text-neutral-700">
              Select what network and wallet you want to connect below
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="mt-6 grid grid-cols-2 gap-4 py-12">
            {wallets.map((wallet) => (
              <Button
                asChild
                className={cn(
                  "w-full h-full hover:bg-transparent transition-colors duration-300 border",
                  selectedWallet === wallet.name && "border-[#fdc316]",
                )}
                key={wallet.name}
                onClick={() => setSelectedWallet(wallet.name)}
              >
                <div className="rounded-md bg-whitesmoke border border-gainsboro text-center py-4 flex items-center justify-center flex-col">
                  <Image
                    src={wallet.icon}
                    width={60}
                    height={72}
                    alt="Metamask"
                  />
                  <p className="text-gray text-[20px] capitalize">
                    {wallet.name}
                  </p>
                </div>
              </Button>
            ))}
          </CardContent>
          <CardFooter className="w-full py-5 flex flex-col shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] bg-modals-and-dropdown border-gainsboro">
            <Button
              className="text-text-color bg-cta-primary-normal w-full hover:text-white"
              disabled={!selectedWallet}
              onClick={mockConnect}
            >
              <Wallet2 className="h-4 w-4 mr-2" /> Connect wallet
            </Button>
            <Button variant={"link"} asChild>
              <Link href={""}>I already have a wallet</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
