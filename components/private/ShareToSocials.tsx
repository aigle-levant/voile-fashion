import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ShareToSocials() {
  return (
    <Dialog>
      <DialogTrigger>Share Collection</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your collection with people</DialogTitle>
          <DialogDescription>
            {/* screencap of collection */}
            {/* socials list */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
