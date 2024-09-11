import React from "react";
import { clsx } from "clsx";
import styles from "./Header.module.scss";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.root}>
      <div className={`container-main flex justify-between items-center`}>
        <Link to={"/"}>
          <Button>BLOG</Button>
        </Link>
        <div className="flex gap-2 items-center">
          <Link to={"/login"}>
            <Button variant={"outline"}>Войти</Button>
          </Link>
          <Link to={"/register"}>
            <Button>Создать аккаунт</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
