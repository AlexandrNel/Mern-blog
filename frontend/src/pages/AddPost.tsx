import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Markdown from "react-markdown";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Button } from "@/components/ui/button";

const AddPost = () => {
  const [value, setValue] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);
  console.log(inputFileRef.current?.value);
  const onClickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  return (
    <div className="container-main">
      <div className="bg-white p-7 rounded-lg">
        <div className="flex flex-col gap-3 mb-4">
          <Button
            onClick={() => {
              inputFileRef.current?.click();
            }}
            className="w-min"
            variant={"outline"}
          >
            загрузить превью
          </Button>
          <input
            onChange={onClickUpload}
            ref={inputFileRef}
            hidden
            type="file"
          />
          <input
            className="text-[40px] font-bold outline-none"
            type="text"
            placeholder="Заголовок статьи..."
          />
          <input
            className="outline-none border-b border-[#8d8d8d]"
            type="text"
            placeholder="Тэги"
          />
        </div>
        <div className="">
          <SimpleMDE
            placeholder="Введите текст..."
            value={value}
            onChange={onChange}
          />
          <Button>Опубликовать</Button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
