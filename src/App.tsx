import { CSSProperties, useState } from "react";
import { ColorPicker } from "./components/ColorPicker";
import styles from "./App.module.scss";
import { GitHubGraphPreview } from "./components/GitHubGraphPreview";
import { ColorizedButton } from "./components/ColorizedButton";
import { getStorageValue } from "./PickedColor";
import { calculateColors } from "./calculateColors";

function App() {
  const [color, setColor] = useState(getStorageValue());
  const onChange = (hue: number, saturation: number) => {
    setColor({ hue, saturation });
  };

  const saveToChromeStorage = () => {
    chrome.storage.sync.set({ picked: color });
  };

  const calculatedColors = calculateColors(color);

  return (
    <div
      className={styles.app}
      style={
        calculatedColors &&
        ({
          "--picked-color": calculatedColors.main,
          "--picked-color-contract": calculatedColors.contrast,
          "--picked-color-level-1": calculatedColors.level1,
          "--picked-color-level-2": calculatedColors.level2,
          "--picked-color-level-3": calculatedColors.level3,
          "--picked-color-level-4": calculatedColors.level4,
        } as CSSProperties)
      }
      data-gaming-mode={color === "gaming"}
    >
      <h1 className={styles.title}>Kaleido GitHub Graph</h1>
      <label>
        <input
          type="checkbox"
          checked={color === "gaming"}
          onChange={(event) =>
            setColor(
              event.target.checked ? "gaming" : { hue: 130, saturation: 64 }
            )
          }
        />
        Gaming Mode
      </label>
      <ColorPicker
        isDisabled={color === "gaming"}
        hue={color !== "gaming" ? color.hue : 130}
        saturation={color !== "gaming" ? color.saturation : 64}
        onChange={onChange}
      />
      <div className={styles.preview}>
        <GitHubGraphPreview />
      </div>
      <ColorizedButton
        onClick={saveToChromeStorage}
        gamingMode={color === "gaming"}
      >
        Save
      </ColorizedButton>
    </div>
  );
}

export default App;
