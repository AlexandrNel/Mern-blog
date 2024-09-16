import React from "react";
import styles from "./Post.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageSquare, Pencil, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { deletePost, PostType } from "@/redux/slices/postsSlice";
import axios from "../../axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface PostProps extends PostType {
  isEditable?: boolean;
  isFull?: boolean;
}

const Post: React.FC<PostProps> = ({
  _id,
  imageUrl,
  user,
  comments,
  createdAt,
  updatedAt,
  title,
  tags,
  text,
  viewsCount,
  isEditable = true,
  isFull = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const onClickRemovePost = async () => {
    if (window.confirm("Вы уверены, что хотите удалить статью?")) {
      dispatch(deletePost(_id));
      toast.success("Статья успешно удалена");
    }
  };
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
          className={`${styles.edit} dark:bg-slate-400 flex gap-5 p-2 rounded absolute right-0 w-min`}
        >
          <Link to={`/posts/${_id}/edit`}>
            <Pencil size={20} color="#858585" strokeWidth={2} />
          </Link>
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
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              {user.fullName.includes("")
                ? user.fullName
                    .split(" ")
                    .map((item) => item.slice(0, 1))
                    .join("")
                : user.fullName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
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
              <span key={i}>#{value}</span>
            ))}
          </div>
          <div className={`pb-5 text-[20px ${styles.markdown}`}>
            <ReactMarkdown children={text} />
          </div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <Eye size={16} color="#858585" strokeWidth={1} />
              {viewsCount.toString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={16} color="#858585" strokeWidth={1} />
              {comments?.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
