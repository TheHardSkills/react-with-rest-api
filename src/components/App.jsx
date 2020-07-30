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
    let monthName = this.state.oneMonth.title;
    let monthInLowerCase = monthName.toLowerCase();

    let borderColor = await usersListClass.borderSetter(monthInLowerCase);
    if (document.getElementById(this.state.oneMonth.title)) {
      let monthElement = document.getElementById(this.state.oneMonth.title);
      let monthElementStyle = (monthElement.style.border = `2px solid ${borderColor}`);
      return monthElementStyle;
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
