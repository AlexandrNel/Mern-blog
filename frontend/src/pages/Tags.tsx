import axios from "../axios";
import React from "react";

const TagsPage = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const tag = params.get("tag");
  const getPostsByTag = async () => {
    await axios.get(`/tags`);
  };
  React.useEffect(() => {}, []);
  return (
    <div className="container-main">
      <div className=" text-2xl font-bold text-center">
        Статьи по тэгу: {tag}
      </div>
    </div>
  );
};

export default TagsPage;
