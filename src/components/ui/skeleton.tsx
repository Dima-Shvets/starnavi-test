import { cn } from "@/utils/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      data-testid="skeleton"
      {...props}
    />
  );
}

export { Skeleton };
