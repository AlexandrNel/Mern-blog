import React from "react";
import styles from "./Post.module.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, MessageSquare, Pencil, X } from "lucide-react";
import banner from "../../assets/banner.png";
import { Link } from "react-router-dom";

type PostProps = {
  id: Number;
  imageUrl: String;
  avatarStringl: String;
  user: {};
  date: String;
  title: String;
  tags: String[];
  text?: String;
  viewsCount: Number;
  comments: {};
  edit?: Boolean;
};

const Post: React.FC<PostProps> = ({
  id,
  imageUrl,
  avatarUrl,
  user,
  date,
  title,
  tags,
  text,
  viewsCount,
  comments,
  edit = false,
}) => {
  console.log(edit);

  return (
    <div
      className={`${styles.root} ${
        !edit && "border-0 hover:border-0"
      } relative`}
    >
      {edit && (
        <div
          className={`${styles.edit} flex gap-5 p-2 rounded absolute right-0 w-min`}
        >
          <Link to={`/posts/${id}/edit`}>
            <Pencil size={20} color="#858585" strokeWidth={2} />
          </Link>
          <button>
            <X size={20} color="#858585" strokeWidth={2} />
          </button>
        </div>
      )}

      <div className={styles.banner}>
        <img src={banner} alt="" />
      </div>
      <div className="p-5 bg-white">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col mb-2">
            <p>Keff</p>
            <span>12 июня 2024 г.</span>
          </div>
        </div>
        <div className="px-12 pb-5 ">
          <Link to={`/posts/${id}`}>
            <div className="font-bold text-[25px] mb-2 hover:text-[#344cd6]">
              Title
            </div>
          </Link>
          <div className="flex gap-3 mb-5">
            <span>#react</span>
            <span>#typescript</span>
          </div>
          <div className="pb-5 text-[20px]">{text}</div>
          <div className="flex gap-3">
            <span className="flex items-center gap-1">
              <Eye size={16} color="#858585" strokeWidth={1} />
              150
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={16} color="#858585" strokeWidth={1} />3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
