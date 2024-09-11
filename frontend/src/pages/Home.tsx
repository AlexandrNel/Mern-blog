import React from "react";

import Tabs from "../components/Tabs";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const Home = () => {
  const posts = ["", "", ""];
  const [value, setValue] = React.useState(0);
  return (
    <div className={`container-main `}>
      <Tabs value={value} setValue={setValue} />
      <div className="flex gap-8 ">
        <div className={`$ w-[70%]`}>
          {posts.map((item, i) => (
            <Post id={i} key={i} edit={true} />
          ))}
        </div>
        <div>Aside</div>
      </div>
    </div>
  );
};

export default Home;
