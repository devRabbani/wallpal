import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

export default function FormDiv({
  children,
  label,
  labelId = "",
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  labelId?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={labelId}>{label}</Label>
      {children}
    </div>
  );
}
