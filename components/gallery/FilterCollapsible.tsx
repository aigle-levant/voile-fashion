import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { type CollapsibleProps } from "@/types/components";
import { ChevronDown } from "lucide-react";

export default function FilterCollapsible({
  query,
  content,
}: CollapsibleProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex px-3 flex-row justify-between w-[100%]">
        {query} <ChevronDown />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 px-3">{content}</CollapsibleContent>
    </Collapsible>
  );
}
