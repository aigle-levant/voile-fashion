import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Sort() {
  return (
    <Select>
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
