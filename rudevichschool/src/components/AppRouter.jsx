import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
import Error from "../pages/Error";
import Tasks from "../pages/Tasks";
import Learning from "../pages/Learning";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default AppRouter;
