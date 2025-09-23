"use client";
// me: importing usestate happily
// nextjs: use client, you moron

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
// period
import { Slider } from "@/components/ui/slider";
import { formatPeriod } from "@/utils/formatPeriod";
// filter logic
import { type FilterGalleryProps, type Filters } from "@/types/components";
import { useState } from "react";

export default function FilterGallery({
  filters,
  setFilters,
}: FilterGalleryProps) {
  // setting filter
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  function toggleTempFilter(key: keyof Omit<Filters, "period">, value: string) {
    setTempFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  }

  const resetFilters: Filters = {
    category: [],
    culture: [],
    material: [],
    period: [-4000, 2020],
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetOverlay className="bg-zinc-950/80 dark:bg-zinc-50/80 backdrop-blur-sm" />
      <SheetContent className="bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950">
        <SheetHeader>
          <SheetTitle className="text-center text-xl font-normal text-zinc-50 dark:text-zinc-950">
            FILTERS
          </SheetTitle>
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
            query="Category"
            content={
              <div className="flex font-medium flex-col gap-3">
                {["Dress", "Footwear", "Jewelry"].map((cat) => (
                  <div key={cat} className="flex items-center gap-3">
                    <Checkbox
                      id={cat.toLowerCase()}
                      checked={tempFilters.category.includes(cat)}
                      onCheckedChange={() => toggleTempFilter("category", cat)}
                    />
                    <Label htmlFor={cat.toLowerCase()}>{cat}</Label>
                  </div>
                ))}
              </div>
            }
          />
          <FilterCollapsible
            query="Culture"
            content={
              <div className="flex font-medium flex-col gap-3">
                {[
                  "Indian",
                  "English",
                  "Slavic",
                  "French",
                  "Chinese",
                  "Japanese",
                ].map((culture) => (
                  <div key={culture} className="flex items-center gap-3">
                    <Checkbox
                      id={culture.toLowerCase()}
                      checked={tempFilters.culture.includes(culture)}
                      onCheckedChange={() =>
                        toggleTempFilter("culture", culture)
                      }
                    />
                    <Label htmlFor={culture.toLowerCase()}>{culture}</Label>
                  </div>
                ))}
              </div>
            }
          />
          <FilterCollapsible
            query="Material"
            content={
              <div className="flex font-medium flex-col gap-3">
                {["Silk", "Cotton", "Gold", "Polyester"].map((mat) => (
                  <div key={mat} className="flex items-center gap-3">
                    <Checkbox
                      id={mat.toLowerCase()}
                      checked={tempFilters.material.includes(mat)}
                      onCheckedChange={() => toggleTempFilter("material", mat)}
                    />
                    <Label htmlFor={mat.toLowerCase()}>{mat}</Label>
                  </div>
                ))}
              </div>
            }
          />
          <FilterCollapsible
            query="Period"
            content={
              <div className="px-2 flex flex-col gap-5 font-medium">
                <Slider
                  value={tempFilters.period}
                  onValueChange={(value) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      period: value as [number, number],
                    }))
                  }
                  min={-4000}
                  max={2020}
                  step={20}
                />
                <p className="mt-2 text-sm text-zinc-500">
                  Selected: {formatPeriod(tempFilters.period[0])} –{" "}
                  {formatPeriod(tempFilters.period[1])}
                </p>
              </div>
            }
          />
        </div>
        <SheetFooter className="flex flex-row gap-2 ">
          <SheetClose asChild>
            <Button
              type="button"
              variant="default"
              className="rounded-none"
              onClick={() => setFilters(tempFilters)}
            >
              Apply
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              className="rounded-none text-zinc-950 dark:text-zinc-50"
              onClick={() => setTempFilters(resetFilters)}
            >
              Clear
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
