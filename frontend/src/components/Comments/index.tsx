import React, { FormEvent } from "react";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Autor, CommentType } from "@/redux/slices/postsSlice";
import axios from "../../axios";
import { toast } from "sonner";
import UserAvatar from "../UserAvatar";
import Comment from "../Comment";

type CommentsListProps = {
  user: Autor;
  comments: CommentType[];
  postId: string;
  isEditable?: boolean;
};

const Comments: React.FC<CommentsListProps> = ({
  comments = [],
  user,
  postId,
}) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [commentsData, setComments] = React.useState<CommentType[]>(comments);
  const [value, setValue] = React.useState("");

  console.log(value);

  const handleRemoveComment = async (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить комментарий?")) {
      try {
        const data = await axios
          .delete(`/comments/${id}`)
          .then((res) => res.data);
        setComments(commentsData.filter((item) => item._id !== id));
        toast.error("Вы удалили комментарий");
      } catch (error) {
        toast.error("Возникла ошибка при удалении уомментария", {
          description: "Попробуйте повторить позднее",
        });
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    setValue("");
    axios
      .post("/comments", {
        post: postId,
        content: value,
      })
      .then((res) => {
        setComments([...commentsData, res.data]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка при отправке комментария");
      });
  };

  if (!comments) {
    return <>Loading...</>;
  }
  return (
    <div className="p-5 pr-0 border bg-card text-card-foreground shadow  rounded-lg">
      <h2 className="text-[20px] font-bold">Комментарии</h2>
      {commentsData.map((item) => (
        <Comment comment={item} handleRemove={handleRemoveComment} />
      ))}
      <div className="flex items-center gap-2 mb-5">
        <UserAvatar imageUrl={"http://localhost:3000/uploads/walter.jpg"} />
        <div className="py-2 border-b w-full flex flex-col ">
          <p className="text-[#3f3f3f] font-[500]">Вася Пупкин</p>
          <span className=" text-[#868686] text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim
            culpa. Perferendis!
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <UserAvatar user={user} />
        <div className="w-full pr-5">
          <form onSubmit={handleSubmit}>
            <Textarea
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mb-4"
              maxLength={100}
              placeholder="Написать комментарий"
            />
            <Button>Отправить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comments;
