import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HexColorPicker } from "react-colorful";
import FormDiv from "./form-div";
import { CustomColorPickerProps } from "@/lib/types";

export default function CustomColorPicker({
  customColor1,
  customColor2,
  setCustomColor1,
  setCustomColor2,
}: CustomColorPickerProps) {
  return (
    <FormDiv
      label="Custom Colors"
      labelId="custom-colors"
      className="w-3/6 sm:w-4/12"
    >
      <div className="flex gap-3">
        {[
          { color: customColor1, setColor: setCustomColor1 },
          { color: customColor2, setColor: setCustomColor2 },
        ].map(({ color, setColor }, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="aspect-square w-full p-0"
                style={{ backgroundColor: color }}
              />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <HexColorPicker color={color} onChange={setColor} />
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </FormDiv>
  );
}
