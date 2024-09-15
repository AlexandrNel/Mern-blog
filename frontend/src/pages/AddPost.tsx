import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "@/redux/slices/authSlice";
import axios from "../axios";
import { toast } from "sonner";
import type { Editor } from "codemirror";

type propsType = {
  isEditing?: boolean;
};
const AddPost: React.FC<propsType> = ({ isEditing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [codemirrorInstance, setCodemirrorInstance] =
    React.useState<Editor | null>(null);
  const getCmInstanceCallback = React.useCallback((editor: Editor) => {
    setCodemirrorInstance(editor);
  }, []);
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        uniqueId: "uniqueId",
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const field = {
        text,
        title,
        imageUrl: imageUrl ? imageUrl : "",
        tags: tags.split(","),
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, field)
        : await axios.post("/posts", field);

      const _id = isEditing ? id : data._id;

      isEditing
        ? toast.success("Статья успешно сохранена")
        : toast.success("Статья успешно опубликована");
      setIsLoading(false);
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);

      isEditing
        ? toast.error("Не удалось сохранить статью!")
        : toast.error("Не удалось создать статью!");
    }
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);
  const onChangeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(`http://localhost:3000${data.url}`);
    } catch (error) {
      toast.error("Ошибка при загрузке файла!");
    }
  };
  const onClickRemoveFile = () => {
    setImageUrl("");
  };

  React.useEffect(() => {
    if (id && isEditing) {
      axios.get(`/posts/${id}`).then((res) => {
        setText(res.data.text);
        setTitle(res.data.title);
        setTags(res.data.tags.join(","));
        setImageUrl(res.data.imageUrl);
      });
    }
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container-main ">
      <div className=" p-7 border bg-card text-card-foreground shadow  rounded-lg">
        <div className="flex flex-col gap-3 mb-4">
          <div>
            <Button
              onClick={() => {
                inputFileRef.current?.click();
              }}
              className="w-min"
              variant={"outline"}
            >
              загрузить превью
            </Button>
            {imageUrl && (
              <>
                <Button
                  className="w-min"
                  variant={"destructive"}
                  onClick={onClickRemoveFile}
                >
                  Удалить
                </Button>
                <img src={imageUrl} alt="image" />
              </>
            )}
          </div>

          <input
            onChange={onChangeUpload}
            ref={inputFileRef}
            hidden
            type="file"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-[40px] font-bold outline-none
            text-card-foreground bg-card"
            type="text"
            placeholder="Заголовок статьи..."
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="outline-none border-b border-[#8d8d8d] text-card-foreground bg-card"
            type="text"
            placeholder="Тэги"
          />
        </div>
        <div className="">
          <SimpleMDE
            className="mb-5 "
            options={options}
            placeholder="Введите текст..."
            value={text}
            onChange={onChange}
            getCodemirrorInstance={getCmInstanceCallback}
          />
          <Button onClick={onSubmit}>
            {isEditing ? "Сохранить" : "Опубликовать"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
