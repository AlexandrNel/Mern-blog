import React from "react";
import { Link } from "react-router-dom";

interface SideBarProps {
  tags: string[];
}

const SideBar: React.FC<SideBarProps> = ({ tags }) => {
  return (
    <div className="w-[30%]">
      <div className="bg-card  p-5 rounded-lg">
        <h2 className="font-bold text-2xl mb-4">Тэги</h2>

        <ul className=" flex flex-col gap-2">
          {tags.map((tag) => (
            <li className=" transition-colors hover:text-[#344cd6]">
              <Link to={`/tags/?tag=${tag}`}>#{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
