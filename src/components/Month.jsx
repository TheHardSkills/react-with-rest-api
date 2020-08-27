import React from "react";
import "../../src/index.css";

class Month extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { month, usersData } = this.props;
    return (
      <div className="card month" id={month.title}>
        <img className="card-img-top" src={month.src} alt={month.title} />
        <div class="birthdayList">
          {usersData !== null && (
            <ul>
              {usersData.map((oneUserData) => {
                return (
                  <li>{`${oneUserData.firstName} ${oneUserData.lastName}`}</li>
                );
              })}
            </ul>
          )}
          {usersData === null && <p>Wait..</p>}
        </div>
      </div>
    );
  }
}

export default Month;
