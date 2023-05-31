export type PickedColor =
  | {
      hue: number;
      saturation: number;
    }
  | "gaming";

export function isPickedColor(
  pickedColor: unknown
): pickedColor is PickedColor {
  if (typeof pickedColor === "string") {
    return pickedColor === "gaming";
  } else {
    return (
      typeof pickedColor === "object" &&
      pickedColor !== null &&
      typeof (pickedColor as Record<string, unknown>).hue === "number" &&
      typeof (pickedColor as Record<string, unknown>).saturation === "number"
    );
  }
}

let storageValue: PickedColor;
export const getStorageValue = (): PickedColor => {
  if (storageValue) return storageValue;

  throw chrome.storage.sync.get(["picked"]).then((value) => {
    if (isPickedColor(value.picked)) {
      storageValue = value.picked;
    } else
      storageValue = {
        hue: 130,
        saturation: 64,
      };
  });
};
