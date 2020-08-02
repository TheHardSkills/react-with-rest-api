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
    this.state.birthdayObject = await this.showBirthdayByHoveringOverMonth(); //todo: correct use
    this.setState(async (state) => {
      return (state.birthdayObject = await this.showBirthdayByHoveringOverMonth());
    });
  }

  getBorderColor = async () => {
    let usersListClass = new ShowUsersList(); //todo: move to constructor
    await usersListClass.countOfBirthsPerMonth();
    let allMonthLowerCase = [];
    this.state.month.map((oneMonth) => {
      let monthName = oneMonth.title;
      let monthInLowerCase = monthName.toLowerCase();
      allMonthLowerCase.push(monthInLowerCase);
    });

    let borderColorObject = await usersListClass.borderSetter(
      allMonthLowerCase
    );

    if (document.getElementById("december")) {
      for (const [key, value] of Object.entries(borderColorObject)) {
        let monthElement = document.getElementById(key);
        monthElement.style.border = `2px solid ${value}`;
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
                  let titletoLowerCase = title.toLowerCase();
                  return (
                    <div className="col-3 mb-2">
                      <Month
                        key={month.id}
                        month={month}
                        title={titletoLowerCase}
                        usersData={this.state.birthdayObject[titletoLowerCase]}
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
