import React from "react";
import { compose } from "redux";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { DATES_SORT_SAGA } from "../../data/constants";
import { Carusel } from "./Carusel";
import moment from 'moment';
import { getPrintInfoFight } from './utils';

import { LoadingOutlined } from '@ant-design/icons';
import { DatePicker, Space, Spin } from 'antd';
import "./style.scss";



const Main = () => {
  const [newDates, setNewDates] = React.useState(moment().format("YYYY-MM-DD").toString());//'2021-04-30'  moment().format("YYYY-MM-DD").toString().trim().split(' ').join('-').trim()
  const [treeRender, setTreeRender] = React.useState(false);
  
  const history = useHistory();
  const dispatch = useDispatch();

  const caruselImg = useSelector((state) => state.state.caruselImg);
  const dates = useSelector((state) => state.state.dates);
  const spin = useSelector((state) => state.state.isSpin);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin /> //antd-spin

  //Calendar information processing.
  const dateFormat = 'YYYY MM DD';

  const newDateHandler = (_date, dateString) => {
    let newGetDates =  dateString.split(' ').join('-').trim();
    setNewDates(newGetDates)
  }
  
  React.useEffect(() => {

    if(newDates.length > 0) {
      dispatch({ type: DATES_SORT_SAGA, payload: newDates })
    }
  }, [])
  React.useEffect(() => {

    if(newDates.length > 0) {
      dispatch({ type: DATES_SORT_SAGA, payload: newDates })
    }
  }, [newDates])

  function disabledDate(current) {
  // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  //The end of calendar information processing.


  //Info-print.
  let PrintInfoFight
  if (Object.values(dates).length > 0) {
    //debugger
    PrintInfoFight =  getPrintInfoFight(dates).map(({ id, DepartureDate, From, To, MinPrice, Name, QuoteDateTime, }) => {
      return (
      <div className="main__flight-wrapper" key={id}>
        <div className="main__fight-columnLeft">
          <div className="main__flight-img" />
        </div>
  
        <div className="main__fight-columnRight">
          <div className="main__flight-row">
            <div className="main__flight-info"> {From} &#8594; {To} </div>
            <div className="main__flight-ticker" />
          </div>
          
          <div className="main__flight-text"> {DepartureDate} - {QuoteDateTime} </div>
  
          <div className="main__flight-row">
            <div className="main__flight-info"> {Name} </div>
            <div className="main__flight-price">Price: {MinPrice}</div>
          </div>                
        </div>
      </div>
      )
    })
    //setTreeRender(!treeRender)
  }
  //The end info print.
  console.log('Компонента =', dates);
 
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

        { PrintInfoFight}

      </div>
    </div>
  );
};

export default compose(withAuthRedirect)(Main);

/**
 * <div className="main__flight-row" key={id}>
      <div className="main__flight-info"> Moscow (SVO) &#8594; New York City (JFK) </div>
      <div className="main__flight-ticker" />
    </div>
    
    <div className="main__flight-text">28 June, 2020 - 14:50</div>

    <div className="main__flight-row">
      <div className="main__flight-info"> Aeroflot </div>
      <div className="main__flight-price">Price: 23 924</div>
    </div>
 */


/**
 * {
(Object.values(dates).length > 0) && getPrintInfoFight(dates).map(({ id, DepartureDate, From, To, MinPrice, Name, QuoteDateTime, }) => {
  return (
  <div className="main__flight-wrapper" key={id}>
    <div className="main__fight-columnLeft">
      <div className="main__flight-img" />
    </div>

    <div className="main__fight-columnRight">
      <div className="main__flight-row">
        <div className="main__flight-info"> {From} &#8594; {To} </div>
        <div className="main__flight-ticker" />
      </div>
      
      <div className="main__flight-text"> {DepartureDate} - {QuoteDateTime} </div>

      <div className="main__flight-row">
        <div className="main__flight-info"> {Name} </div>
        <div className="main__flight-price">Price: {MinPrice}</div>
      </div>                
    </div>
  </div>
  )
})
} */    