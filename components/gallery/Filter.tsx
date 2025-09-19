import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterCollapsible from "./FilterCollapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FilterGallery() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetOverlay className="bg-zinc-950/80 dark:bg-zinc-50/80 backdrop-blur-sm" />
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">FILTERS</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 gap-6 px-4">
          {/* TODO: add a way to distinguish gender */}
          {/* <FilterCollapsible
            query="Gender"
            content={
              <div id="gender-filter-wrapper" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Checkbox id="women" />
                  <Label htmlFor="women">Women</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="men" />
                  <Label htmlFor="men">Men</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="na" />
                  <Label htmlFor="na">Not Applicable</Label>
                </div>
              </div>
            }
          /> */}
          <FilterCollapsible
            query="Culture"
            content={
              <div id="culture-filter-wrapper" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Checkbox id="indian" />
                  <Label htmlFor="indian">Indian</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="english" />
                  <Label htmlFor="english">English</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="slavic" />
                  <Label htmlFor="slavic">Slavic</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="french" />
                  <Label htmlFor="french">French</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="chinese" />
                  <Label htmlFor="chinese">Chinese</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="japanese" />
                  <Label htmlFor="japanese">Japanese</Label>
                </div>
              </div>
            }
          />
          <FilterCollapsible
            query="Material"
            content={
              <div id="material-filter-wrapper" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Checkbox id="silk" />
                  <Label htmlFor="silk">Silk</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="cotton" />
                  <Label htmlFor="cotton">Cotton</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="gold" />
                  <Label htmlFor="gold">Gold</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="polyester" />
                  <Label htmlFor="polyester">Polyester</Label>
                </div>
              </div>
            }
          />
          <FilterCollapsible
            query="Period"
            content={
              <div id="material-filter-wrapper" className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Checkbox id="silk" />
                  <Label htmlFor="silk">Silk</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="cotton" />
                  <Label htmlFor="cotton">Cotton</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="gold" />
                  <Label htmlFor="gold">Gold</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="polyester" />
                  <Label htmlFor="polyester">Polyester</Label>
                </div>
              </div>
            }
          />
        </div>
        <SheetFooter className="flex flex-row">
          <Button type="button" variant="default" className="rounded-none">
            Apply
          </Button>
          <SheetClose asChild>
            <Button type="button" variant="outline" className="rounded-none">
              Clear
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
