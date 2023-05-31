import { memo } from "react";
import styles from "./GitHubGraphPreview.module.scss";

const contributionLevels = Array.from({ length: 164 }, (_, i) => i % 5);

export const GitHubGraphPreview: React.FC = memo(() => {
  return (
    <div className={styles.contributions}>
      {contributionLevels.map((level, index) => (
        <span key={index} className={styles.contribution} data-level={level} />
      ))}
    </div>
  );
});
