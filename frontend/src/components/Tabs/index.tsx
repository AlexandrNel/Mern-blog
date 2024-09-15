import React from "react";
import styles from "./Tabs.module.scss";
import { clsx } from "clsx";

type TabsProps = {
  value: number;
  setValue: (i: number) => void;
};

export const list = [
  {
    id: 1,
    name: "Новые",
    field: "createdAt",
    property: "desc",
  },
  {
    id: 2,
    name: "Популярные",
    field: "viewsCount",
    property: "desc",
  },
];

const Tabs: React.FC<TabsProps> = ({ value, setValue }) => {
  return (
    <div className={`${styles.root}`}>
      {list.map((category, i) => (
        <div
          key={category.id}
          onClick={() => {
            setValue(category.id);
          }}
          className={`${styles.tab} ${value === category.id && styles.active}`}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
