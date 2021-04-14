import React from "react";
import { useSelector } from "react-redux";

import { getPrintInfoFight } from "./utils";

import "./style.scss";

export const InfoPrint = () => {
  const dates = useSelector(state => state.state.dates);

  const tickerHandler = (id) => {};

  return (
    <>
      {dates.Carriers &&
        dates.Carriers.length > 0 &&
        getPrintInfoFight(dates).map(
          ({
            id,
            DepartureDate,
            From,
            To,
            MinPrice,
            Name,
            QuoteDateTime,
            isTicker,
          }) => {
            return (
              <div className="main__flight-wrapper" key={id}>
                <div className="main__fight-columnLeft">
                  <div className="main__flight-img" />
                </div>

                <div className="main__fight-columnRight">
                  <div className="main__flight-row">
                    <div className="main__flight-info">
                      {" "}
                      {From} &#8594; {To}{" "}
                    </div>
                    {isTicker ? (
                      <div
                        className="main__showe-ticker"
                        onClick={() => tickerHandler(id)}
                      />
                    ) : (
                      <div
                        className="main__empty-ticker"
                        onClick={() => tickerHandler(id)}
                      />
                    )}
                    {/* <div className={{isTicker} ? 'main__showe-ticker' : 'main__empty-ticker'} onClick={()=> tickerHandler(id)} /> */}
                  </div>

                  <div className="main__flight-text">
                    {" "}
                    {DepartureDate} - {QuoteDateTime}{" "}
                  </div>

                  <div className="main__flight-row">
                    <div className="main__flight-info"> {Name} </div>
                    <div className="main__flight-price">Price: {MinPrice}</div>
                  </div>
                </div>
              </div>
            );
          }
        )}
    </>
  );
};
