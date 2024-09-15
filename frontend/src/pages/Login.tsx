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
import { fetchLogin, selectIsAuth } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Неверно указана почта",
  }),
  password: z.string().min(5, {
    message: "Минимальная длина пароля - 5 символов",
  }),
});

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "examap123a1ale@mail.ru",
      password: "12323",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      return toast.error("Не удалось авторизоваться.");
    }
    toast.success("Вы успешно авторизовались!");

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      return toast.error("Не удалось авторизоваться.");
    }
  }
  React.useEffect(() => {}, []);
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container-main h-full flex justify-center items-center">
      <div className=" w-[400px] mt-[-86px] border bg-card text-card-foreground shadow  rounded-lg p-10">
        <h1 className=" text-center font-bold text-[30px] mb-5">
          Вход в аккаунт
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
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
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Войти
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
