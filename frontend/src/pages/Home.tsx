import React from "react";
import { PostType } from "@/redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPosts } from "@/redux/slices/postsSlice";
import Tabs from "../components/Tabs";
import Post from "../components/Post";
import SkeletonPost from "@/components/SkeletonPost";

const Home: React.FC = () => {
  const [category, setCategory] = React.useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { data } = useSelector((state: RootState) => state.auth);

  const isLoading = posts.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPosts(category));
  }, [category]);
  return (
    <div className={`container-main `}>
      <Tabs value={category} setValue={setCategory} />
      <div className="flex gap-8 ">
        <div className={`$ w-[70%]`}>
          {(isLoading ? [...Array(5)] : posts.items).map(
            (item: PostType, i: number) =>
              isLoading ? (
                <SkeletonPost key={i} />
              ) : (
                <Post
                  key={i}
                  comments={item.comments}
                  _id={item._id}
                  imageUrl={item.imageUrl}
                  tags={item.tags}
                  title={item.title}
                  user={item.user}
                  viewsCount={item.viewsCount}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  isEditable={data?._id === item.user._id}
                />
              )
          )}
        </div>
        <div>Aside</div>
      </div>
    </div>
  );
};

export default Home;
