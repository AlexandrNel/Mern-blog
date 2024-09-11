import React from "react";
import Post from "@/components/Post";
import Comments from "@/components/Comments";

const text =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, accusamus. Ipsum sequi quam qui quas iure architecto quaerat iusto aliquam eius sint. Officiis corrupti eveniet, quae quis rerum illum quaerat.";

const PostPage = () => {
  return (
    <div className="container-main">
      <Post text={text} />
      <Comments />
    </div>
  );
};

export default PostPage;
