import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

export default function Success() {
  return (
    <Card className="rounded-xl overflow-hidden bg-whitesmoke">
      {/* <CardContent className="mt-6 grid grid-cols-2 gap-4 py-12"></CardContent> */}
      <CardContent>
        <Image
          width={500}
          alt="Redirecting animation"
          src={"/sweet-run.png"}
          height={441}
        />
      </CardContent>
      <CardFooter className="w-full py-5 flex items-center justify-between shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] bg-modals-and-dropdown border-gainsboro">
        <div className="flex flex-col gap-3">
          <CardTitle className="text-text-color">Yeaayy!!</CardTitle>
          <CardDescription className="text-neutral-700">
            Welcome to the winning team!
          </CardDescription>
        </div>
        <Button className="rounded-xl text-2xl text-text-color bg-cta-primary-normal hover:text-white py-6 flex gap-3 items-center">
          LFG !!!
          <Image
            width={32}
            alt="Redirecting animation"
            src={"/arrow-fatlines-right.svg"}
            height={32}
          />
        </Button>
      </CardFooter>
    </Card>
  );
}
