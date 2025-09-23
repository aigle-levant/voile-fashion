import { Button } from "@/components/ui/button";
import { type ProductProps } from "@/types/components";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown } from "lucide-react";

export default function ProductDetailsSheet({
  product,
}: {
  product: ProductProps;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex flex-row gap-5">
          <p>MORE DETAILS</p>
          <ChevronDown />
        </Button>
      </SheetTrigger>
      <SheetOverlay className="bg-zinc-950/80 dark:bg-zinc-50/80 backdrop-blur-sm" />
      <SheetContent className="flex flex-col border-zinc-950 dark:border-zinc-50 justify-center bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950">
        <SheetHeader>
          <p>PRODUCT DETAILS</p>
        </SheetHeader>
        <div className="px-5">{product.description}</div>
      </SheetContent>
    </Sheet>
  );
}
