import { CirclePlus, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NoDataFoundProps {
  title: string;
  description: string;
  btnText?: string;
  btnAction?: () => void;
  className?: string;
  [key: string]: any;
}

export const NoDataFound = ({
  title,
  description,
  btnText,
  btnAction,
  className,
  ...props
}: NoDataFoundProps) => {
  return (
    <div
      className={cn(
        "col-span-full text-center py-12 bg-muted/40 rounded-lg  2xl:py-24",
        className
      )}
    >
      <LayoutGrid className="size-12 mx-auto  text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        {description}
      </p>
      {btnText && (
        <Button onClick={btnAction} className={cn("mt-4")} {...props}>
          <CirclePlus className="size-4" />
          {btnText}
        </Button>
      )}
    </div>
  );
};
