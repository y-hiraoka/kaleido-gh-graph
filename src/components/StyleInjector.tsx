import { createPortal } from "react-dom";
import { getStorageValue } from "../PickedColor";
import { calculateColors } from "../calculateColors";
import { useEffect, useState } from "react";

export const StyleInjector: React.FC = () => {
  const pickedColorInitialValue = getStorageValue();
  const [pickedColor, setPickedColor] = useState(pickedColorInitialValue);

  useEffect(() => {
    const changeListener: Parameters<
      typeof chrome.storage.sync.onChanged.addListener
    >[0] = (changes) => {
      if ("picked" in changes) {
        setPickedColor(changes.picked.newValue);
      }
    };
    chrome.storage.sync.onChanged.addListener(changeListener);
    return () => {
      chrome.storage.sync.onChanged.removeListener(changeListener);
    };
  }, []);

  const calculatedColors = calculateColors(pickedColor);

  return createPortal(
    calculatedColors ? (
      <NormalModeStyle
        level1={calculatedColors.level1}
        level2={calculatedColors.level2}
        level3={calculatedColors.level3}
        level4={calculatedColors.level4}
      />
    ) : (
      <GamingModeStyle />
    ),
    document.head
  );
};

const GamingModeStyle: React.FC = () => {
  const lightness1 = 100 - 1 * (50 / 3);
  const lightness2 = 100 - 2 * (50 / 3);
  const lightness3 = 100 - 3 * (50 / 3);
  const lightness4 = 100 - 4 * (50 / 3);
  const colorStep = 3;

  return (
    <style>
      {`
         @keyframes kaleido-github-graph-gaming-mode {
          ${Array.from(
            { length: 360 },
            (_, i) =>
              `${(100 * i) / (360 / colorStep)}% {
              --color-calendar-graph-day-L1-bg: hsl(${
                i * colorStep
              }, 100%, ${lightness1}%);
              --color-calendar-graph-day-L2-bg: hsl(${
                i * colorStep
              }, 100%, ${lightness2}%);
              --color-calendar-graph-day-L3-bg: hsl(${
                i * colorStep
              }, 100%, ${lightness3}%);
              --color-calendar-graph-day-L4-bg: hsl(${
                i * colorStep
              }, 100%, ${lightness4}%);
            }`
          ).join("\n")}
        }
        
        .ContributionCalendar-day {
          animation: kaleido-github-graph-gaming-mode 4s infinite linear;
        }`}
    </style>
  );
};

const NormalModeStyle: React.FC<{
  level1: string;
  level2: string;
  level3: string;
  level4: string;
}> = ({ level1, level2, level3, level4 }) => {
  return (
    <style>
      {`
        .ContributionCalendar-day {
          --color-calendar-graph-day-L1-bg: ${level1};
          --color-calendar-graph-day-L2-bg: ${level2};
          --color-calendar-graph-day-L3-bg: ${level3};
          --color-calendar-graph-day-L4-bg: ${level4};
        }
      `}
    </style>
  );
};
