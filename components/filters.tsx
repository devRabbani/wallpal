import type {
  AlignType,
  FillModeType,
  PaletteType,
  SelectFieldProps,
  SliderFieldProps,
  FiltersProps,
} from "@/lib/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FormDiv from "./form-div";
import CustomColorPicker from "./custom-color-picker";

const SelectField = ({
  label,
  id,
  value,
  onValueChange,
  options,
}: SelectFieldProps) => (
  <FormDiv label={label} labelId={id} className="flex-grow">
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FormDiv>
);

const SliderField = ({
  label,
  id,
  min,
  max,
  step,
  value,
  onValueChange,
}: SliderFieldProps) => (
  <FormDiv label={label} labelId={id}>
    <Slider
      id={id}
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={([value]) => onValueChange(value)}
    />
  </FormDiv>
);

export default function Filters({ config, updateConfig }: FiltersProps) {
  return (
    <div className="space-y-4 mt-3 min-h-[350px]">
      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger className="w-28" value="text">
            Text
          </TabsTrigger>
          <TabsTrigger className="w-28" value="background">
            Background
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="space-y-4 mt-4">
          <FormDiv label="Your Text" labelId="text">
            <Input
              id="text"
              placeholder="Enter text"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
            />
          </FormDiv>
          <SelectField
            label="Align"
            id="align"
            value={config.align}
            onValueChange={(value) =>
              updateConfig({ align: value as AlignType })
            }
            options={[
              { value: "left", label: "Left" },
              { value: "center", label: "Center" },
              { value: "right", label: "Right" },
            ]}
          />
          <SliderField
            label="Font Size"
            id="fontsize"
            min={1}
            max={20}
            step={0.1}
            value={config.fontSize}
            onValueChange={(value) => updateConfig({ fontSize: value })}
          />
          <SliderField
            label="Text Position X"
            id="textpositionx"
            min={0}
            max={100}
            step={1}
            value={config.textPosition.x}
            onValueChange={(value) =>
              updateConfig({
                textPosition: { ...config.textPosition, x: value },
              })
            }
          />
          <SliderField
            label="Text Position Y"
            id="textpositiony"
            min={0}
            max={100}
            step={1}
            value={config.textPosition.y}
            onValueChange={(value) =>
              updateConfig({
                textPosition: { ...config.textPosition, y: value },
              })
            }
          />
        </TabsContent>
        <TabsContent value="background" className="space-y-4 mt-4">
          <div className="flex gap-4 flex-wrap lg:flex-nowrap">
            <SelectField
              label="Color Palette"
              id="colorpalette"
              value={config.palette}
              onValueChange={(value) =>
                updateConfig({ palette: value as PaletteType })
              }
              options={[
                { value: "custom", label: "Custom" },
                { value: "pastel", label: "Pastel" },
                { value: "vibrant", label: "Vibrant" },
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
              ]}
            />
            {config.palette === "custom" && (
              <CustomColorPicker
                customColor1={config.customColor1}
                customColor2={config.customColor2}
                setCustomColor1={(color) =>
                  updateConfig({ customColor1: color })
                }
                setCustomColor2={(color) =>
                  updateConfig({ customColor2: color })
                }
              />
            )}
          </div>
          <SelectField
            label="Fill Mode"
            id="fillmode"
            value={config.fillMode}
            onValueChange={(value) =>
              updateConfig({ fillMode: value as FillModeType })
            }
            options={[
              { value: "auto", label: "Auto" },
              { value: "flat", label: "Flat" },
              { value: "gradient", label: "Gradient" },
            ]}
          />
          <SliderField
            label="Pattern Intensity"
            id="patternintensity"
            min={0}
            max={1}
            step={0.01}
            value={config.patternIntensity}
            onValueChange={(value) => updateConfig({ patternIntensity: value })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
