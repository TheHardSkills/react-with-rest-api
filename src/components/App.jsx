import React from "react";
import { monthData } from "../monthData";
import Month from "./Month";
import YalantisDataServise from "./YalantisDataServis";

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
    this.getObjSortByBirthdayMonth().then((res) => {
      this.setState((state) => {
        state.fullUsersData = res;
        return state;
      });
    });
    this.setBorderColors();
  }

  setBorderColors = async () => {
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

    let finalUsersObject = await this.getObjSortByBirthdayMonth();
    let borderColorArray = [];
    for (let key in finalUsersObject) {
      let userInMonth = finalUsersObject[key];
      let countUserInMonth = userInMonth.length;

      if (countUserInMonth <= 2) {
        borderColorArray.push("grey");
      } else if (countUserInMonth >= 3 && countUserInMonth <= 6) {
        borderColorArray.push("blue");
      } else if (countUserInMonth >= 7 && countUserInMonth <= 10) {
        borderColorArray.push("green");
      } else if (countUserInMonth >= 11) {
        borderColorArray.push("red");
      }
    }
    if (document.getElementById("december")) {
      monthNameArray.forEach((oneMonthName, i) => {
        const monthElement = document.getElementById(oneMonthName);
        monthElement.style.border = `3px solid ${borderColorArray[i]}`;
      });
    }
  };

  async getObjSortByBirthdayMonth() {
    const yalantisDataServis = new YalantisDataServise();
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
                      <Month key={month.id} month={month} usersData={null} />
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
