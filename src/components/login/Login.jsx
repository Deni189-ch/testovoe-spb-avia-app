import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setToggleErrorAC, setSpinAC } from "../../redux/actions";

import { LoadingOutlined } from '@ant-design/icons';
import { Input, Spin } from "antd";
import "./style.scss";


const Login = () => {
  const dispatch = useDispatch();

  const isError = useSelector(state => state.state.isError);
  const spin = useSelector(state => state.state.isSpin);

  const [data, setData] = React.useState({
    login: " ", //do not touch !
    password: "",
  });

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin /> //antd-spin

  React.useEffect(() => {
    const dataObj = { login: "admin", password: "free" };
    localStorage.setItem("dataLocal", JSON.stringify(dataObj));
  }, []);

  const changeForm = (e) => {
    setData({ ...data, ...{ [e.target.name]: e.target.value.trim() } });
  };

  const raw = localStorage.getItem("dataLocal");
  const dataLocal = JSON.parse(raw);

  const handleSubmit = () => {
    dispatch(setSpinAC(true));

    if ( data.login === dataLocal.login && data.password === dataLocal.password ) {
      dispatch(setSpinAC(false));
      dispatch(setToggleErrorAC(false));
      localStorage.setItem("isAuth", true);
    }
  };

  const Auth = localStorage.getItem("isAuth");
  const isAuth = JSON.parse(Auth);
  if (isAuth === true) {
    dispatch(setSpinAC(true));
    return <Redirect to={"/main"} />;
  }

  return (
    <div className="login">
      {spin && <Spin className="login__spin" indicator={antIcon} />}

      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__form-title">Simple Flight Check</h1>

        <div className="login__form-text">Логин:</div>
        <Input
          type="text"
          name="login"
          value={data.login}
          onChange={changeForm}
        />

        <div className="login__form-text">Пароль:</div>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={changeForm}
        />

        <div className="login__form-footer">
          <div className="login__form-error">
            {(!data.login.length || isError) && "Заполнить все поля"}
          </div>

          <button type="submit" className="login__form-btn" disabled={ (
                !data.login.trim() ||
                !data.password.trim() 
              ) } >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
