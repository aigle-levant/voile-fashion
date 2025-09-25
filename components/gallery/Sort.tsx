"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortProps {
  sort: "ascending" | "descending";
  setSort: (value: "ascending" | "descending") => void;
}

export default function Sort({ sort, setSort }: SortProps) {
  return (
    <Select
      value={sort}
      onValueChange={(v) => setSort(v as "ascending" | "descending")}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ascending">A - Z</SelectItem>
        <SelectItem value="descending">Z - A</SelectItem>
      </SelectContent>
    </Select>
  );
}
