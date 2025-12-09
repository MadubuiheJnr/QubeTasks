import { CirclePlus, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";

interface NoDataFoundProps {
  title: string;
  description: string;
  btnText: string;
  btnAction: () => void;
}

export const NoDataFound = ({
  title,
  description,
  btnText,
  btnAction,
}: NoDataFoundProps) => {
  return (
    <div className="col-span-full text-center py-12 bg-muted/40 rounded-lg  2xl:py-24">
      <LayoutGrid className="size-12 mx-auto  text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      <Button onClick={btnAction} className="mt-4">
        <CirclePlus className="size-4 mr-2" />
        {btnText}
      </Button>
    </div>
  );
};
