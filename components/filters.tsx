import {
  AlignType,
  FillModeType,
  PaletteType,
  WallpaperConfig,
} from "@/lib/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FormDiv from "./form-div";

export default function Filters({
  config,
  updateConfig,
}: {
  config: WallpaperConfig;
  updateConfig: (updates: Partial<WallpaperConfig>) => void;
}) {
  return (
    <div className="space-y-4 mt-3 min-h-[347px]">
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
          <FormDiv label="Align" labelId="align">
            <Select
              value={config.align}
              onValueChange={(value: AlignType) =>
                updateConfig({ align: value })
              }
            >
              <SelectTrigger id="align">
                <SelectValue placeholder="Select text alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </FormDiv>

          <FormDiv label="Font Size" labelId="fontsize">
            <Slider
              id="fontsize"
              min={1}
              max={20}
              step={0.1}
              value={[config.fontSize]}
              onValueChange={([value]) => updateConfig({ fontSize: value })}
            />
          </FormDiv>
          <FormDiv label="Text Position X" labelId="textpositionx">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[config.textPosition.x]}
              onValueChange={([value]) =>
                updateConfig({
                  textPosition: { ...config.textPosition, x: value },
                })
              }
            />
          </FormDiv>
          <FormDiv label="Text Position Y" labelId="textpositiony">
            <Slider
              min={0}
              max={100}
              step={1}
              value={[config.textPosition.y]}
              onValueChange={([value]) =>
                updateConfig({
                  textPosition: { ...config.textPosition, y: value },
                })
              }
            />
          </FormDiv>
        </TabsContent>
        <TabsContent value="background" className="space-y-4 mt-4">
          <FormDiv label="Color Palette" labelId="colorpalette">
            <Select
              value={config.palette}
              onValueChange={(value: PaletteType) =>
                updateConfig({ palette: value })
              }
            >
              <SelectTrigger id="colorpalette">
                <SelectValue placeholder="Select color palette" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="pastel">Pastel</SelectItem>
                <SelectItem value="vibrant">Vibrant</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          </FormDiv>
          <FormDiv label="Fill Mode" labelId="fillmode">
            <Select
              value={config.fillMode}
              onValueChange={(value: FillModeType) =>
                updateConfig({ fillMode: value })
              }
            >
              <SelectTrigger id="fillmode">
                <SelectValue placeholder="Select fill mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="gradient">Gradient</SelectItem>
              </SelectContent>
            </Select>
          </FormDiv>

          {config.palette === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="color"
                value={config.customColor1}
                onChange={(e) => updateConfig({ customColor1: e.target.value })}
              />
              <Input
                type="color"
                value={config.customColor2}
                onChange={(e) => updateConfig({ customColor2: e.target.value })}
              />
            </div>
          )}

          <FormDiv label="Pattern Intensity" labelId="patternintensity">
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[config.patternIntensity]}
              onValueChange={([value]) =>
                updateConfig({ patternIntensity: value })
              }
            />
          </FormDiv>
        </TabsContent>
      </Tabs>
    </div>
  );
}
