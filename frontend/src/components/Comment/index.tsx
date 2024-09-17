import { CommentType } from "@/redux/slices/postsSlice";
import React from "react";
import UserAvatar from "../UserAvatar";
import { Textarea } from "../ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectAuthData } from "@/redux/slices/authSlice";
import { EditingComment, maxLength } from "../Comments";

interface CommentProps {
  comment: CommentType;
  isEditing?: boolean;
  isError?: boolean;
  handleRemove: (id: string) => void;
  setIsEditing: (id: string) => void;
  handleEdit: ({ id, content }: EditingComment) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  isEditing = false,
  isError = false,
  setIsEditing,
  handleRemove,
  handleEdit,
}) => {
  const [editValue, setEdit] = React.useState("");
  const [error, setError] = React.useState(false);

  const editRef = React.useRef<HTMLTextAreaElement>(null);
  const me = useSelector(selectAuthData);

  console.log(editValue);
  React.useEffect(() => {
    setEdit(comment.content);
  }, []);
  return (
    <div key={comment._id} className={`flex-col flex mb-5  `}>
      <div className="flex items-start gap-2 ">
        <UserAvatar user={comment.autor} />
        <div className=" pr-3 w-full flex items-center border-b justify-between ">
          <div className="flex flex-col w-full">
            <p className="text-foreground font-[500]">
              {comment.autor.fullName}
            </p>
            {isEditing ? (
              <form className="w-full" onSubmit={(e) => console.log()}>
                <Textarea
                  ref={editRef}
                  value={editValue}
                  onChange={(e) => {
                    setError(false);
                    setEdit(e.target.value);
                  }}
                  className={`s-full `}
                  maxLength={100}
                />
                <p className="text-xs text-right text-foreground opacity-50">
                  {maxLength - editValue.length}/{maxLength}
                </p>
                {error && (
                  <p className="text-xs my-2 text-red-500">
                    Поле не должно быть пустым
                  </p>
                )}
              </form>
            ) : (
              <p className=" text-foreground text-base mb-1">
                {(!isError && editValue) || comment.content}
              </p>
            )}
          </div>
        </div>
      </div>
      {comment.autor._id === me?._id ? (
        <div className="flex py-1 text-sm comments-center pl-10">
          {isEditing && (
            <button
              onClick={() => {
                if (!editValue) {
                  setError(true);
                  editRef.current?.focus();

                  return;
                }
                handleEdit({ id: comment._id, content: editValue });
              }}
              className="px-2  transition-opacity text-[#868686] hover:text-foreground"
            >
              Save
            </button>
          )}
          <button
            className="px-2  transition-opacity text-[#868686] hover:text-foreground"
            onClick={() => {
              setIsEditing(comment._id);
            }}
          >
            <span className="flex items-center gap-2">Edit</span>
          </button>

          <button
            onClick={() => {
              handleRemove(comment._id);
            }}
            className="px-2  transition-opacity text-[#868686] hover:text-foreground"
          >
            <span className="flex items-center gap-2">Delete</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
