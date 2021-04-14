import { React, useState, useEffect } from "react";
import { compose } from "redux";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Carusel } from "./Carusel";
import { InfoPrint } from "./infoPrint";
import { setSpinAC } from "../../redux/actions";
import { DATES_SORT_SAGA } from "../../data/types";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

import moment from "moment";
import { DatePicker, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./style.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />; //antd-spin

const Main = () => {
  const [newDates, setNewDates] = useState(
    moment().format("YYYY-MM-DD").toString()
  );
  const [countFavorites, setCountFavorites] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const caruselImg = useSelector(state => state.state.caruselImg);
  const spin = useSelector(state => state.state.isSpin);
  const dates = useSelector(state => state.state.dates);

  //Calendar information processing.
  const dateFormat = "YYYY MM DD";

  const newDateHandler = (_, dateString) => {
    let newGetDates = dateString.split(" ").join("-").trim();
    setNewDates(newGetDates);
  };

  useEffect(() => {
    if (newDates.length > 0) {
      dispatch({ type: DATES_SORT_SAGA, payload: newDates });
    }
  }, []);
  useEffect(() => {
    if (newDates.length > 0) {
      dispatch({ type: DATES_SORT_SAGA, payload: newDates });
    }
  }, [newDates]);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }
  //The end of calendar information processing.

  const exitHandler = () => {
    dispatch(setSpinAC(true));
    localStorage.setItem("isAuth", false);
    history.push("/login");
  };

  return (
    <div className="main">
      {spin && <Spin className="main__spin" indicator={antIcon} />}

      <div className="main__exit" onClick={exitHandler}>
        Выйти
      </div>

      <div className="main__info-wrapper">
        <div className="main__info-header">
          <div className="main__info-title">Вылеты</div>
          <div className="main__info-title main__info-title_flight">
            svo - jfk
          </div>

          <Space direction="vertical" className="main__input-calendar">
            <DatePicker
              onChange={newDateHandler}
              disabledDate={disabledDate}
              autoFocus={false}
              allowClear={false}
              bordered={false}
              defaultValue={moment(newDates, dateFormat)}
              format={dateFormat}
              suffixIcon={<div className="main__info-calend"></div>}
            />
          </Space>
        </div>

        <Carusel caruselImg={caruselImg} />

        <div className="main__number-flights">
          Добавлено в Избранное:{" "}
          <span style={{ color: "#135aab" }}>{countFavorites}</span> рейсов
        </div>

        <InfoPrint dates={dates}/>
      </div>
    </div>
  );
};

export default compose(withAuthRedirect)(Main);
