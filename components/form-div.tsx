import { Label } from "./ui/label";

export default function FormDiv({
  children,
  label,
  labelId = "",
}: {
  children: React.ReactNode;
  label: string;
  labelId?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={labelId}>{label}</Label>
      {children}
    </div>
  );
}
