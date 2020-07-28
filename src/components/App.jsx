import React from "react";
import { monthData } from "../monthData";
import Month from "./Month";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      month: monthData,
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {this.state.month.map((month) => {
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
