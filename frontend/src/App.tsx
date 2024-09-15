import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/authSlice";
import { AppDispatch } from "./redux/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/posts/:id" element={<PostPage />}></Route>
          <Route
            path="/posts/:id/edit"
            element={<AddPost isEditing={true} />}
          ></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<>not found</>}></Route>
        </Routes>
        <Toaster duration={2000} />
      </div>
    </>
  );
}

export default App;
