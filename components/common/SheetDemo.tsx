import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Search />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col border-zinc-950 dark:border-zinc-50 justify-around bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950">
        <SheetHeader>
          <input
            name="search"
            id="sheet-demo-name"
            className="border-b px-1 py-3 active:border-b bg-zinc-950 dark:bg-zinc-50 border-zinc-50 dark:border-zinc-950 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 text-lg mr-2"
            placeholder="SEARCH"
          />
        </SheetHeader>
        <div className="grid auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <p className="text-lg font-bold">Highlights</p>
            <div
              id="highlight-links-wrapper"
              className="flex flex-col justify-center gap-3"
            >
              <Link href="/gallery" className="hover:underline">
                Eastern European dresses
              </Link>
              <Link href="/gallery" className="hover:underline">
                Indian ornaments
              </Link>
              <Link href="/gallery" className="hover:underline">
                Persian festive-wear
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
