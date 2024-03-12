import React from "react";
// import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
// import {AuthContext} from "../../../context";

const Header = () => {
  // const {isAuth, setIsAuth} = useContext(AuthContext);

  // const logout = () => {
  //     setIsAuth(false);
  //     localStorage.removeItem('auth')
  // }

  return (
    <div className="header">
      {/* <MyButton onClick={logout}>
                Выйти
            </MyButton> */}
      <div className="header__links">
        <Link to="/tasks">Задачи</Link>
        <Link to="/questions">Вопросы</Link>
        <Link to="/answers">Ответы</Link>
      </div>
    </div>
  );
};

export default Header;
