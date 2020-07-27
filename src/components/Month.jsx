import React from "react";

const Month = (props) => {
  const { month } = props;
  return (
    <div className="card">
      <img
        className="card-img-top"
        src={month.src}
        alt=""
      />
      <div className="card-body">
        <h6 className="card-title">{month.title}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb=0">Rating:{month.vote_avarage}</p>
        </div>
      </div>
    </div>
  );
};

export default Month;
