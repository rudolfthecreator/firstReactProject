import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
import Error from "../pages/Error";
import Tasks from "../pages/Tasks";
import Questions from "../pages/Questions";
import Answers from "../pages/Answers";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/answers" element={<Answers />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
