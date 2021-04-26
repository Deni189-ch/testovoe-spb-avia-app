import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setToggleErrorAC, setSpinAC } from "../../redux/actions";

import { LoadingOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import "./style.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />; //antd-spin

const Login = ({ RedirectFn }) => {
  const dispatch = useDispatch();

  const isError = useSelector(({ state }) => state.isError);
  const spin = useSelector(({ state }) => state.isSpin);

  const [data, setData] = useState({
    login: " ", //do not touch !
    password: "",
  });

  const { login, password } = data;

  useEffect(() => {
    dispatch(setSpinAC(false));
    const dataObj = { login: "admin", password: "free" };
    localStorage.setItem("dataLocal", JSON.stringify(dataObj));
  }, []);

  const changeForm = (e) => {
    setData({ ...data, ...{ [e.target.name]: e.target.value.trim() } });
  };

  const dataLocal = JSON.parse(localStorage.getItem("dataLocal"));

  const handleSubmit = () => {
    dispatch(setSpinAC(true));

    if (
     login === dataLocal.login &&
     password === dataLocal.password
    ) {
      dispatch(setSpinAC(false));
      dispatch(setToggleErrorAC(false));
      localStorage.setItem("isAuth", true);
    }
  };

  const isBtnDisable = !login.trim() || !password.trim();

  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  if (isAuth) {
    dispatch(setSpinAC(true));
    RedirectFn("/main")
  }

  return (
    <div className="login">
      {spin && <Spin className="login__spin" indicator={antIcon} />}

      <form className="login__form">
        <h1 className="login__form-title">Simple Flight Check</h1>

        <div className="login__form-text">Логин:</div>
        <Input type="text" name="login" value={login} onChange={changeForm} />

        <div className="login__form-text">Пароль:</div>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={changeForm}
        />

        <div className="login__form-footer">
          {(!login.length || isError) && (
            <div className="login__form-error">Заполнить все поля</div>
          )}

          <button
            onClick={handleSubmit}
            className="login__form-btn"
            disabled={isBtnDisable}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
