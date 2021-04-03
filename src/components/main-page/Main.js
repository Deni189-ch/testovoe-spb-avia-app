import React from "react";
import { compose } from "redux";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { DATES_SORT_SAGA } from "../../data/constants";
import { Carusel } from "./carusel";
import moment from 'moment';

import { LoadingOutlined } from '@ant-design/icons';
import { DatePicker, Space, Spin } from 'antd';
import "./style.scss";



const Main = () => {
  const history = useHistory()
  const [newDates, setNewDates] = React.useState(moment().format("YYYY-MM-DD").toString().trim());
  
  const dispatch = useDispatch();

  const caruselImg = useSelector((state) => state.state.caruselImg);
  const dates = useSelector((state) => state.state.dates);
  const spin = useSelector((state) => state.state.isSpin);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin /> //antd-spin


  // -------info-print---------
  const infoPrint = Object.entries(dates).reduce((prev, cur) => {

    return  console.log('log', cur);

  }, [])

  //-------info-print-end-----
  console.log('Компонента =', dates);

  //-------Calendar----------
  const dateFormat = 'YYYY MM DD';

  const newDateHandler = (_date, dateString) => {
    let newGetDates =  dateString.split(' ').join('-').trim();
    setNewDates(newGetDates)
  }

  React.useEffect(() => {

    if(newDates.length > 0) {
      dispatch({ type: DATES_SORT_SAGA, payload: newDates })
    }

  }, [newDates])

  function disabledDate(current) {
  // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  //---------------------
 
  const exitHandler = () => {
    localStorage.setItem("isAuth", false);
    history.push("/login"); //тут костыль сделал как смог
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
          
          <Space direction="vertical"  className="main__input-calendar"  >
              <DatePicker onChange={newDateHandler}
               disabledDate={disabledDate} 
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
          Добавлено в Избранное: <span style={{ color: "#135aab" }}>10</span>{" "}
          рейсов
        </div>
       
        <div className="main__flight-wrapper" >
          <div className="main__fight-columnLeft">
            <div className="main__flight-img" />
          </div>

          <div className="main__fight-columnRight">

            <div className="main__flight-row">
              <div className="main__flight-info"> Moscow (SVO) &#8594; New York City (JFK) </div>
              <div className="main__flight-ticker" />
            </div>
            
            <div className="main__flight-text">28 June, 2020 - 14:50</div>

            <div className="main__flight-row">
              <div className="main__flight-info"> Aeroflot </div>
              <div className="main__flight-price">Price: 23 924</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default compose(withAuthRedirect)(Main);
