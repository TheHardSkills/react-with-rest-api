import React from "react";
import "../../src/index.css";

const Month = (props) => {
  const { month } = props;
  //let monthTitle = month.title;
  //let monthId = monthTitle.toLowerCase();
  return (
    <div className="card month" id={month.title}>
      <img className="card-img-top" src={month.src} alt={month.title} />
      <div className="card-body">
        <h6 className="card-title">{month.title}</h6>
      </div>
    </div>
  );
};

export default Month;
