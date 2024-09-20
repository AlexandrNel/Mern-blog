import React from "react";

const TagsPage = () => {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const tag = params.get("tag");
  console.log(tag);

  return (
    <div className="container-main">
      <div className=" text-2xl font-bold text-center">
        Статьи по тэгу: {tag}
      </div>
    </div>
  );
};

export default TagsPage;
