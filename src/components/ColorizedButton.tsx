import { ComponentProps, memo } from "react";
import styles from "./ColorizedButton.module.scss";

type Props = ComponentProps<"button"> & {
  gamingMode: boolean;
};

export const ColorizedButton: React.FC<Props> = memo(
  ({ gamingMode, ...props }) => {
    return (
      <button
        className={styles.button}
        type={props.type ?? "button"}
        data-gaming-mode={gamingMode}
        {...props}
      />
    );
  }
);
