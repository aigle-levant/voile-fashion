import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { type CollapsibleProps } from "@/types/components";

export default function FilterCollapsible({
  query,
  content,
}: CollapsibleProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger>{query}</CollapsibleTrigger>
      <CollapsibleContent>{content}</CollapsibleContent>
    </Collapsible>
  );
}
