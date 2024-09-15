import React from "react";
import { clsx } from "clsx";
import styles from "./Header.module.scss";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "@/redux/slices/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <div className={styles.root}>
      <div className={`container-main flex justify-between items-center`}>
        <Link to={"/"}>
          <Button>BLOG</Button>
        </Link>
        {isAuth ? (
          <div className="flex gap-2 items-center">
            <Link to={"/add-post"}>
              <Button variant={"outline"}>Написать статью</Button>
            </Link>
            <Button onClick={onClickLogout}>Выйти</Button>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <Link to={"/login"}>
              <Button variant={"outline"}>Войти</Button>
            </Link>
            <Link to={"/register"}>
              <Button>Создать аккаунт</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
