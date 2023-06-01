import styles from "./GamingCheckbox.module.scss";

type Props = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export const GamingCheckbox: React.FC<Props> = ({ isChecked, onChange }) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={isChecked}
        onChange={(event) => onChange(event.target.checked)}
      />
      Gaming Mode
    </label>
  );
};
