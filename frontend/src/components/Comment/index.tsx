import { CommentType } from "@/redux/slices/postsSlice";
import React from "react";
import UserAvatar from "../UserAvatar";
import { Textarea } from "../ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthData } from "@/redux/slices/authSlice";

interface CommentProps {
  comment: CommentType;
  isEditing?: boolean;
  handleRemove: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  isEditing = false,
  handleRemove,
}) => {
  const [editValue, setEdit] = React.useState("");
  const me = useSelector(selectAuthData);
  return (
    <div key={comment._id} className={` flex items-center gap-2 mb-5`}>
      <UserAvatar user={comment.autor} />
      <div className="py-2 pr-3 border-b w-full flex items-center justify-between ">
        <div className="flex flex-col w-full">
          <p className="text-[#3f3f3f] font-[500]">{comment.autor.fullName}</p>
          {isEditing ? (
            <form className="w-full" onSubmit={(e) => console.log()}>
              <Textarea
                value={editValue}
                onChange={(e) => setEdit(e.target.value)}
                className=" w-full"
                maxLength={100}
              />
            </form>
          ) : (
            <p className=" text-[#868686] text-[14px]">{comment.content}</p>
          )}
        </div>
        {comment.autor._id === me?._id ? (
          <div className="flex  comments-center">
            <button className="p-2 opacity-50 transition-opacity hover:opacity-100">
              <Pencil
                className="text-foreground "
                onClick={() => console.log("")}
                size={20}
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => handleRemove(comment._id)}
              className="p-2 opacity-50 transition-opacity hover:opacity-100"
            >
              <Trash2
                className="text-foreground "
                size={20}
                strokeWidth={1.5}
              />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
