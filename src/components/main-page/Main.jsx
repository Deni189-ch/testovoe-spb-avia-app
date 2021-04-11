import React from "react";
import { compose } from "redux";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Carusel } from "./Carusel";
import { getPrintInfoFight } from './utils';
import { DATES_SORT_SAGA } from "../../data/constants";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

import moment from 'moment';
import { DatePicker, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import "./style.scss";


const Main = () => {
  const [newDates, setNewDates] = React.useState(moment().format("YYYY-MM-DD").toString());
  const [countFavorites, setCountFavorites] = React.useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const caruselImg = useSelector( state => state.state.caruselImg);
  const dates = useSelector( state => state.state.dates);
  const spin = useSelector( state => state.state.isSpin);

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
  const tickerHandler = (id) => {
    
  }
  //Info-print.
  let PrintInfoFight
  if (dates.Carriers && dates.Carriers.length > 0) {
    PrintInfoFight =  getPrintInfoFight(dates).map(({ id, DepartureDate, From, To, MinPrice, Name, QuoteDateTime, isTicker}) => {
       
      return (
      <div className="main__flight-wrapper" key={id}>
        <div className="main__fight-columnLeft">
          <div className="main__flight-img" />
        </div>
  
        <div className="main__fight-columnRight">
          <div className="main__flight-row">
            <div className="main__flight-info"> {From} &#8594; {To} </div>
            {
            isTicker 
            ? <div className='main__showe-ticker' onClick={()=> tickerHandler(id)} />
            : <div className='main__empty-ticker' onClick={()=> tickerHandler(id)} />
            }
            {/* <div className={{isTicker} ? 'main__showe-ticker' : 'main__empty-ticker'} onClick={()=> tickerHandler(id)} /> */}
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
  }
  //The end info print.
 
  const exitHandler = () => {
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
          
          <Space direction="vertical"  className="main__input-calendar"  >
              <DatePicker onChange={newDateHandler}
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
          Добавлено в Избранное: <span style={{ color: "#135aab" }}>{countFavorites}</span>{" "}
          рейсов
        </div>

        { PrintInfoFight}

      </div>
    </div>
  );
};

export default compose(withAuthRedirect)(Main);
