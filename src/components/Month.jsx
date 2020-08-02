import React from "react";
import "../../src/index.css";

const Month = (props) => {
  const { month, usersData } = props;
  let monthTitle = month.title;
  let monthId = monthTitle.toLowerCase();

  let listItems = 0;
  if (usersData !== "Wait..") {
    listItems = usersData.map((oneUserDate) => {
      return <li>{`${oneUserDate.firstName} ${oneUserDate.lastName}`}</li>;
    });
  }

  return (
    <div className="card month" id={monthId}>
      <img className="card-img-top" src={month.src} alt={month.title} />
      <div class="descr">
        {listItems !== 0 && <ul>{listItems}</ul>}
      </div>
    </div>
  );
};

export default Month;
