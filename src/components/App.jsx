import React from "react";
import { monthData } from "../monthData";
import Month from "./Month";
import ShowUsersList from "../logic";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      month: monthData,
      oneMonth: {
        id: 1,
        title: "root",
        src: "https://c.tadst.com/gfx/750w/the-month-january.jpg?1",
      },
    };
  }

  componentDidMount() {
    this.getBorderColor();
  }

  getBorderColor = async () => {
    let usersListClass = new ShowUsersList();
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
    if (document.getElementById(this.state.oneMonth.title)) {
      for (const [key, value] of Object.entries(borderColorObject)) {
        console.log(`${key}: ${value}`);
        let monthElement = document.getElementById(key);
        monthElement.style.border = `2px solid ${value}`;
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {this.state.month.map((month) => {
                //-this.setState({ oneMonth: month });
                this.state.oneMonth = month;
                return (
                  <div className="col-3 mb-2">
                    <Month key={month.id} month={month} />
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
