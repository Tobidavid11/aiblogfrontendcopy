import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Redirecting = ({ className }: { className?: string }) => {
  return (
    <Card
      className={cn(
        "bg-modals-and-dropdown shadow-[0px_0px_8px_rgba(113,_128,_150,_0.04),_0px_4px_16px_rgba(113,_128,_150,_0.08)] font-dm-sans",
        className,
      )}
    >
      <CardContent>
        <Image
          width={500}
          alt="Redirecting animation"
          src={"/running.gif"}
          height={441}
        />
      </CardContent>
      <CardFooter className="border-t border-t-neutral-100 pt-4 flex items-center justify-center">
        <CardTitle className="text-2xl">Redirecting ...</CardTitle>
      </CardFooter>
    </Card>
  );
};
export default Redirecting;
