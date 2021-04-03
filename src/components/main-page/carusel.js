import React from "react";
import "./style.scss";


export const Carusel = ({caruselImg}) => {
  
  const [position, setPosition] = React.useState(0);

  let x1 = 0;
  const startTouch = e =>  x1 = e.changedTouches[0].clientX;

  const rightSizeMax = (caruselImg.length * - 109.33333333333333);

  const endTouch = e => {
    let x2 = e.changedTouches[0].clientX;

    if (x1 > x2 && position <= 0 && position > rightSizeMax) {
      setPosition(position - 164);
    } else if (x1 < x2 && position < 0 )
      setPosition(position + 164);
  }

  const arrowLeftHandler = () => {
    if ( position < 0 ) {
      setPosition(position + 164);
    }
  };

  const arrowRightHandler = () => {
    if (position <= 0 && position > rightSizeMax) {
      setPosition(position - 164);
    }
  };

  return (
    <div className="wrapper"> 
   
      <div
        className="filmLenta"
        style={{ left: position + "px" }}
        onTouchStart={startTouch}
        onTouchEnd={endTouch}
      >
      {
      caruselImg.map(({id, img}) => {
        return <div key={id} className="filmLenta__item">
          <img src={img} alt="loading..." />
        </div>
        })
      }

      </div>
      <div className="filmLenta__arrow-left" onClick={arrowLeftHandler}>
        <div className="filmLenta__arrowButton-left" />
      </div>

      <div className="filmLenta__arrow-right" onClick={arrowRightHandler}>
        <div className="filmLenta__arrowButton-right" />
      </div>
    </div>
  );
};
