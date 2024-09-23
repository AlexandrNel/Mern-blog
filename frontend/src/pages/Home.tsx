import React from "react";
import { fetchTags, PostType } from "@/redux/slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPosts } from "@/redux/slices/postsSlice";
import Tabs from "../components/Tabs";
import Post from "../components/Post";
import SkeletonPost from "@/components/SkeletonPost";
import SideBar from "@/components/SideBar";

const Home: React.FC = () => {
  const [category, setCategory] = React.useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.posts);
  const { tags } = useSelector((state: RootState) => state.posts);
  const { data } = useSelector((state: RootState) => state.auth);

  const isLoadingTags = tags.status === "loading";
  const isLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts(category));
  }, [category]);
  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);
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
                  text={""}
                  usersWhoLiked={[]}
                  comments={item.comments}
                  _id={item._id}
                  imageUrl={item.imageUrl}
                  tags={item.tags}
                  title={item.title}
                  likesCount={item.likesCount}
                  user={item.user}
                  viewsCount={item.viewsCount}
                  createdAt={item.createdAt}
                  updatedAt={item.updatedAt}
                  isEditable={data?._id === item.user._id}
                />
              )
          )}
        </div>
        {isLoadingTags ? "loading" : <SideBar tags={tags.items} />}
      </div>
    </div>
  );
};

export default Home;
