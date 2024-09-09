import React from "react";
import styles from "./Tabs.module.scss";
import { clsx } from "clsx";

type TabsProps = {
  value: number;
  setValue: (i: number) => void;
};

const tabs = ["Новые", "Популярные"];
const Tabs: React.FC<TabsProps> = ({ value, setValue }) => {
  return (
    <div className={`${styles.root}`}>
      {tabs.map((tab, i) => (
        <div
          onClick={() => {
            setValue(i);
          }}
          className={`${styles.tab} ${value === i && styles.active}`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
