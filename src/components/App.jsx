import React from "react";
import { monthData } from "../monthData";
import Month from "./Month";
import YalantisDataServis from "./YalantisDataServis";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      month: monthData,
      usersData: "",
      fullUsersData: null,
    };
  }

  async componentDidMount() {
    this.getBorderColor();

    this.getObjSortByBirthdayMonth().then((res) => {
      this.setState((state) => {
        state.fullUsersData = res;
        return state;
      });
    });
  }

  getBorderColor = async () => {
    const monthNameArray = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    const yalantisDataServis = new YalantisDataServis();
    let wtf = await yalantisDataServis.countOfBirthsPerMonth(); //wtf
    console.log(wtf);
    let allMonthLowerCase = [];
    this.state.month.map((oneMonth) => {
      let monthName = oneMonth.title;
      allMonthLowerCase.push(monthName);
    });

    const borderColorArray = await yalantisDataServis.borderSetter(
      allMonthLowerCase
    );

    if (document.getElementById("december")) {
      let iterNumber = 0;
      borderColorArray.map((colorForOneMonth) => {
        let monthName = monthNameArray[iterNumber];
        const monthElement = document.getElementById(monthName);
        monthElement.style.border = `3px solid ${colorForOneMonth}`;
        iterNumber++;
      });
    }
  };

  async getFullUsersData() {
    const yalantisDataServis = new YalantisDataServis();
    const usersDataWithMonthName = await yalantisDataServis.getUsersDataWithMonthName();
    return usersDataWithMonthName;
  }

  async getObjSortByBirthdayMonth() {
    const yalantisDataServis = new YalantisDataServis();
    const objSortByBirthdayMonth = await yalantisDataServis.getMonthObjectWithUsersData();
    return objSortByBirthdayMonth;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {this.state.fullUsersData &&
                this.state.month.map((month) => {
                  const title = month.title;
                  return (
                    <div className="col-3 mb-2">
                      <Month
                        key={month.id}
                        month={month}
                        usersData={this.state.fullUsersData[month.title]}
                      />
                    </div>
                  );
                })}

              {!this.state.fullUsersData &&
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
