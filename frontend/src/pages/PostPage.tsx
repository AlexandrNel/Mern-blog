import React, { useEffect } from "react";
import Post from "@/components/Post";
import Comments from "@/components/Comments";
import { PostType } from "@/redux/slices/postsSlice";
import axios from "../axios";
import SkeletonPost from "@/components/SkeletonPost";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = React.useState<PostType>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container-main">
        <SkeletonPost />;
      </div>
    );
  }
  if (isError || !post) {
    return <>Error 404</>;
  }

  return (
    <div className="container-main">
      <>
        <Post
          _id={post._id}
          imageUrl={post.imageUrl}
          tags={post.tags}
          text={post.text}
          title={post.title}
          user={post.user}
          viewsCount={post.viewsCount}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          isEditable={false}
          isFull={true}
        />

        <Comments user={post.user} comments={post.comments} />
      </>
    </div>
  );
};

export default PostPage;
