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

    const yalantisDataServis = new YalantisDataServis();
    const borderColorArray = await yalantisDataServis.borderSetter();

    if (document.getElementById("december")) {
      monthNameArray.forEach((oneMonthName, i) => {
        const monthElement = document.getElementById(oneMonthName);
        monthElement.style.border = `3px solid ${borderColorArray[i]}`;
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
