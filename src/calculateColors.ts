import Color from "color";
import { PickedColor } from "./PickedColor";

type CalculatedColors = {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  contrast: string;
  main: string;
};

export const calculateColors = (
  baseValue: PickedColor
): CalculatedColors | undefined => {
  if (baseValue === "gaming") return undefined;

  const mainColor = Color.hsl(baseValue.hue, baseValue.saturation, 50);
  const contrastColor = mainColor.isDark() ? "white" : "black";
  const level1Color = Color.hsl(
    baseValue.hue,
    baseValue.saturation,
    100 - 1 * (50 / 3)
  );
  const level2Color = Color.hsl(
    baseValue.hue,
    baseValue.saturation,
    100 - 2 * (50 / 3)
  );
  const level3Color = Color.hsl(
    baseValue.hue,
    baseValue.saturation,
    100 - 3 * (50 / 3)
  );
  const level4Color = Color.hsl(
    baseValue.hue,
    baseValue.saturation,
    100 - 4 * (50 / 3)
  );

  return {
    contrast: contrastColor,
    main: mainColor.toString(),
    level1: level1Color.toString(),
    level2: level2Color.toString(),
    level3: level3Color.toString(),
    level4: level4Color.toString(),
  };
};
