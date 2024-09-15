import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "@/redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { fetchRegister } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Укажите полное имя",
  }),
  email: z.string().email({
    message: "Неверно указана почта",
  }),
  password: z.string().min(5, {
    message: "Минимальная длина пароля - 5 символов",
  }),
});

const Register = () => {
  const isAuth = useSelector(selectIsAuth);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return toast.error("Не удалось зарегистрироваться.", {
        description: "Пользователь с такой почтой уже существует",
      });
    }
    toast.success("Вы успешно зарегистрировались!", {
      closeButton: true,
    });
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      return toast.error("Не удалось зарегистрироваться");
    }
  }
  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container-main h-full flex justify-center items-center">
      <div className=" w-[400px] mt-[-86px] border bg-card text-card-foreground shadow  rounded-lg p-10 ">
        <h1 className=" text-center font-bold text-[30px] mb-5">
          Создание аккаунта
        </h1>
        <div className="flex justify-center">
          <div className="text-[30px] flex justify-center items-center text-white w-[100px] h-[100px] rounded-[50%] bg-[#7e7e7e]">
            CN
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>fullName</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Полное имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Пароль" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Зарегистрироваться
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
