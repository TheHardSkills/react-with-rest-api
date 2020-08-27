import React from "react";
import "../../src/index.css";

class Month extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { month, usersData } = this.props;

    this.monthId = month.title;
    let listItems = 0;
    if (usersData !== null) {
      listItems = usersData.map((oneUserDate) => {
        return <li>{`${oneUserDate.firstName} ${oneUserDate.lastName}`}</li>;
      });
    } else {
      listItems = <li>Wait..</li>;
    }

    return (
      <div className="card month" id={this.monthId}>
        <img className="card-img-top" src={month.src} alt={month.title} />
        <div class="birthdayList">
          {listItems !== 0 && <ul>{listItems}</ul>}
        </div>
      </div>
    );
  }
}

export default Month;
