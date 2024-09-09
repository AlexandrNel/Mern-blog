import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import walter from "../../assets/walter.jpg";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Comments = () => {
  return (
    <div className="p-5 pr-0 bg-white rounded-lg">
      <h2 className="text-[20px] font-bold">Комментарии</h2>
      <div className="flex items-center gap-2 mb-5">
        <Avatar>
          <AvatarImage src={walter} />
          <AvatarFallback>ВП</AvatarFallback>
        </Avatar>
        <div className="py-2 border-b w-full flex flex-col ">
          <p className="text-[#3f3f3f] font-[500]">Вася Пупкин</p>
          <span className=" text-[#868686] text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam enim
            culpa. Perferendis!
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage src={walter} />
          <AvatarFallback>ВП</AvatarFallback>
        </Avatar>
        <div className="w-full pr-5">
          <Textarea
            className="mb-4"
            maxLength={100}
            placeholder="Написать комментарий"
          />
          <Button>Отправить</Button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
