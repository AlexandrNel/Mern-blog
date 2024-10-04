import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Post.module.scss";
import { Eye, MessageSquare, Pencil, ThumbsUp, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { deletePost, PostType } from "@/redux/slices/postsSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import UserAvatar from "../UserAvatar";
import axios from "../../axios";

interface PostProps extends PostType {
  isEditable?: boolean;
  isFull?: boolean;
}

const Post: React.FC<PostProps> = ({
  _id,
  imageUrl,
  user,
  comments = [],
  likesCount,
  createdAt,
  updatedAt,
  title,
  tags,
  text,
  viewsCount,
  isEditable = true,
  isFull = false,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [localLikesCount, setLikesCount] = React.useState(likesCount);
  const me = useSelector((state: RootState) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onClickRemovePost = async () => {
    if (window.confirm("Вы уверены, что хотите удалить статью?")) {
      dispatch(deletePost(_id));
      toast.success("Статья успешно удалена");
    }
  };
  const checkIsLiked = async () => {
    const { isLiked } = await axios.get(`/like/${_id}`).then((res) => res.data);
    setIsLiked(isLiked);
  };
  const handleLike = async () => {
    if (!me?._id) {
      return navigate("/login");
    }
    try {
      if (isLiked) {
        await axios.delete(`/like/${_id}`);
        setIsLiked(false);
        setLikesCount(localLikesCount - 1);
      } else {
        await axios.post(`/like/${_id}`);
        setIsLiked(true);
        setLikesCount(localLikesCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    checkIsLiked();
  }, []);
  return (
    <div
      className={`${styles.root} ${
        isFull
          ? "border-none dark:shadow-none dark:bg-inherit hover:border-none "
          : ""
      } border bg-card text-card-foreground shadow  rounded-lg  relative`}
    >
      {isEditable && (
        <div
          className={`${styles.edit}  flex gap-5 p-2 rounded absolute right-0 w-min`}
        >
          <button>
            <Link to={`/posts/${_id}/edit`}>
              <Pencil size={20} color="#858585" strokeWidth={2} />
            </Link>
          </button>
          <button onClick={onClickRemovePost}>
            <X size={20} color="#858585" strokeWidth={2} />
          </button>
        </div>
      )}

      <div className={`${styles.banner} ${isFull ? styles.full : ""}`}>
        {imageUrl && (
          <img className=" dark:brightness-75" src={imageUrl} alt="" />
        )}
      </div>
      <div className="p-5  rounded-lg">
        <div className="flex gap-2 items-center">
          <UserAvatar user={user} />
          <div className="flex flex-col mb-2">
            <p className={styles.name}>{user.fullName}</p>
            <span className="flex gap-1">
              <span>{new Date(createdAt.toString()).toDateString()}</span>
              {new Date(createdAt.toString()).getHours()}:
              {new Date(createdAt.toString()).getMinutes()}
            </span>
          </div>
        </div>
        <div className="px-12 pb-5 ">
          {isFull ? (
            <div className="font-bold text-[25px] mb-2 ">{title}</div>
          ) : (
            <Link to={`/posts/${_id}`}>
              <div className="font-bold text-[25px] mb-2 hover:text-[#344cd6]">
                {title}
              </div>
            </Link>
          )}
          <div className="flex gap-3 mb-5">
            {tags.map((value, i) => (
              <Link key={i} className={styles.tag} to={`/tags/?tag=${value}`}>
                <span>#{value}</span>
              </Link>
            ))}
          </div>
          <div className={`pb-5 text-[16px] ${styles.markdown}`}>
            <ReactMarkdown children={text} />
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <Eye size={16} color="#858585" strokeWidth={1} />
              {viewsCount.toString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={16} color="#858585" strokeWidth={1} />
              {comments.length}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp
                onClick={handleLike}
                className={`${
                  isLiked ? "scale-110 stroke-blue-700" : ""
                } transition-transform active:scale-95 hover:scale-110 hover:stroke-blue-700  box-content p-2 mx-[-8px] cursor-pointer`}
                size={16}
                strokeWidth={1}
              />
              {localLikesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
