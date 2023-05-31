import { FC, useCallback, useEffect, useRef } from "react";
import styles from "./ColorPicker.module.scss";

type Props = {
  /**
   * 色相
   *
   * 0 <= hue < 360
   */
  hue: number;
  /**
   * 彩度
   *
   * 0 <= saturation <= 100
   */
  saturation: number;
  onChange: (hue: number, saturation: number) => void;
  isDisabled: boolean;
};

export const ColorPicker: React.FC<Props> = ({
  hue: _hue,
  saturation: _saturation,
  onChange: _onChange,
  isDisabled,
}) => {
  const hue = Math.max(0, Math.min(360, _hue));
  const saturation = Math.max(0, Math.min(100, _saturation));

  const onCangeRef = useRef(_onChange);
  onCangeRef.current = _onChange;

  const onChange = useCallback(
    (hue: number, saturation: number) => {
      if (isDisabled) return;

      onCangeRef.current(
        Math.max(0, Math.min(360, Math.round(hue))),
        Math.max(0, Math.min(100, Math.round(saturation)))
      );
    },
    [isDisabled]
  );

  const colorPickerRef = useRef<HTMLDivElement>(null);

  const onChangeWithMouse = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hue = (x / rect.width) * 360;
    const saturation = (1 - y / rect.height) * 100;
    onChange(hue, saturation);
  };

  const isDraggingRef = useRef(false);
  const onMouseDown = (event: React.MouseEvent) => {
    if (event.buttons !== 1) return;
    isDraggingRef.current = true;
    onChangeWithMouse(event);
  };

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (!colorPickerRef.current) return;
      const colorPickerRect = colorPickerRef.current.getBoundingClientRect();
      const x = event.clientX - colorPickerRect.left;
      const y = event.clientY - colorPickerRect.top;
      const hue = (x / colorPickerRect.width) * 360;
      const saturation = (1 - y / colorPickerRect.height) * 100;
      onChange(hue, saturation);
    };
    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onChange]);

  return (
    <div
      ref={colorPickerRef}
      className={styles.colorPicker}
      onMouseDown={onMouseDown}
      onClick={onChangeWithMouse}
      aria-label="カラーピッカー"
      aria-disabled={isDisabled}
    >
      <div className={styles.colorPickerHueGradient} />
      <div className={styles.colorPickerSaturationGradient} />
      {!isDisabled && (
        <ColorPickerMarker
          hue={hue}
          saturation={saturation}
          onChange={onChange}
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
};

const ColorPickerMarker: FC<{
  hue: number;
  saturation: number;
  onChange: (hue: number, saturation: number) => void;
  isDisabled: boolean;
}> = ({ hue, saturation, onChange, isDisabled }) => {
  const onKeydown = (event: React.KeyboardEvent) => {
    if (isDisabled) return;

    const diff = event.shiftKey ? 10 : 1;
    if (event.key === "ArrowUp") {
      onChange(hue, saturation + diff);
    } else if (event.key === "ArrowDown") {
      onChange(hue, saturation - diff);
    } else if (event.key === "ArrowLeft") {
      onChange(hue - diff, saturation);
    } else if (event.key === "ArrowRight") {
      onChange(hue + diff, saturation);
    }
  };

  return (
    <div
      className={styles.colorPickerMarker}
      tabIndex={0}
      onKeyDown={onKeydown}
      style={{
        top: `${100 - saturation}px`,
        left: `${hue}px`,
      }}
      aria-label="上下左右キーで色相を変更"
      aria-disabled={isDisabled}
    />
  );
};
