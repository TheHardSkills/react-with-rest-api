import React from "react";
import { monthData } from "../monthData";
import Month from "./Month";
import ShowUsersList from "../logic";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      month: monthData,
      usersData: "",
      birthdayObject: null,
    };
  }

  async componentDidMount() {
    this.getBorderColor();
    let birthdayObject = await this.showBirthdayByHoveringOverMonth();
    this.setState((state) => {
      state.birthdayObject = birthdayObject;
      return state;
    });
  }

  getBorderColor = async () => {
    let usersListClass = new ShowUsersList();
    await usersListClass.countOfBirthsPerMonth();
    let allMonthLowerCase = [];
    this.state.month.map((oneMonth) => {
      let monthName = oneMonth.title;
      allMonthLowerCase.push(monthName);
    });

    let borderColorObject = await usersListClass.borderSetter(allMonthLowerCase);

    if (document.getElementById("december")) {
      for (const [key, value] of Object.entries(borderColorObject)) {
        let monthElement = document.getElementById(key);
        monthElement.style.border = `3px solid ${value}`;
      }
    }
  };

  async showBirthdayByHoveringOverMonth() {
    let usersListClass = new ShowUsersList();
    let birthdayUsersObject = await usersListClass.createBirthdayUsersObject();
    return birthdayUsersObject;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {this.state.birthdayObject &&
                this.state.month.map((month) => {
                  let title = month.title;
                  return (
                    <div className="col-3 mb-2">
                      <Month
                        key={month.id}
                        month={month}
                        usersData={this.state.birthdayObject[title]}
                      />
                    </div>
                  );
                })}

              {!this.state.birthdayObject &&
                this.state.month.map((month) => {
                  return (
                    <div className="col-3 mb-2">
                      <Month
                        key={month.id}
                        month={month}
                        usersData={"Wait.."}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
}

export default App;
