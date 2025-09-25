"use client";
// me: importing usestate happily
// nextjs: use client, you moron
import { useGalleryFilters } from "@/hooks/useGalleryFilters";
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
// filter logic
import { type FilterGalleryProps, type Filters } from "@/types/components";
import { useState } from "react";

export default function FilterGallery({
  filters,
  setFilters,
}: FilterGalleryProps) {
  const { categories, cultures, materials, loading, error } =
    useGalleryFilters();

  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  function toggleTempFilter(key: keyof Omit<Filters, "period">, value: string) {
    setTempFilters((prev) => {
      const updated = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: updated };
    });
  }

  if (loading) return <p>Loading filters...</p>;
  if (error) return <p>Error loading filters: {error}</p>;

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
          <SheetTitle>FILTERS</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 gap-6 px-4">
          <FilterCollapsible
            query="Category"
            content={
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center gap-3">
                    <Checkbox
                      id={cat}
                      checked={tempFilters.category.includes(cat)}
                      onCheckedChange={() => toggleTempFilter("category", cat)}
                    />
                    <Label htmlFor={cat}>{cat}</Label>
                  </div>
                ))}
              </div>
            }
          />

          <FilterCollapsible
            query="Culture"
            content={
              <div className="flex flex-col gap-3">
                {cultures.map((cul) => (
                  <div key={cul} className="flex items-center gap-3">
                    <Checkbox
                      id={cul}
                      checked={tempFilters.culture.includes(cul)}
                      onCheckedChange={() => toggleTempFilter("culture", cul)}
                    />
                    <Label htmlFor={cul}>{cul}</Label>
                  </div>
                ))}
              </div>
            }
          />

          <FilterCollapsible
            query="Material"
            content={
              <div className="flex flex-col gap-3">
                {materials.map((mat) => (
                  <div key={mat} className="flex items-center gap-3">
                    <Checkbox
                      id={mat}
                      checked={tempFilters.material.includes(mat)}
                      onCheckedChange={() => toggleTempFilter("material", mat)}
                    />
                    <Label htmlFor={mat}>{mat}</Label>
                  </div>
                ))}
              </div>
            }
          />
        </div>

        <SheetFooter className="flex flex-row gap-2">
          <SheetClose asChild>
            <Button onClick={() => setFilters(tempFilters)}>Apply</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
