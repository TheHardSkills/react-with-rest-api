import React from "react";
import "../../src/index.css";

const Month = (props) => {
  const { month, usersData } = props;
  console.log("usersData");
  console.log(typeof usersData);
  console.log(usersData);
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
      <div className="card-body">
        <h6 className="card-title">{month.title}</h6>
      </div>
      <div class="descr">
        <p>Birthday users: </p>
        {listItems !== 0 && <ul>{listItems}</ul>}
      </div>
    </div>
  );
};

export default Month;
