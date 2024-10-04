import Post from "@/components/Post";
import axios from "../axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchPostsByTag,
  selectPostsItems,
  selectPostsStatus,
} from "@/redux/slices/postsSlice";
import SkeletonPost from "@/components/SkeletonPost";

const TagsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPostsItems);
  const status = useSelector(selectPostsStatus);
  const { data } = useSelector((state: RootState) => state.auth);
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const tag = params.get("tag")?.trim();
  React.useEffect(() => {
    if (tag) {
      dispatch(fetchPostsByTag(tag));
    }
  }, []);
  return (
    <div className="container-main">
      <div className="mb-10  text-center">
        <h2 className="text-2xl font-bold">Статьи по тэгу: {tag}</h2>
      </div>
      {status === "loading" && <SkeletonPost />}
      {status === "error" && <>Ошибка получения данных</>}
      {status === "success" && posts.length === 0 ? (
        <h3 className="text-xl text-gray-500 text-center font-bold">
          Статьи не найдены
        </h3>
      ) : (
        ""
      )}
      <div className=" grid grid-cols-2 gap-10">
        {posts.map((post) => (
          <Post
            key={post._id}
            text={""}
            comments={post.comments}
            _id={post._id}
            imageUrl={post.imageUrl}
            tags={post.tags}
            title={post.title}
            likesCount={post.likesCount}
            user={post.user}
            viewsCount={post.viewsCount}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            isEditable={data?._id === post.user._id}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
