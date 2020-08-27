import YalantisDataAPI from "../components/YalantisDataAPI";

class YalantisDataServise {
    constructor() {
        this.monthArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        this.yalantisData = new YalantisDataAPI();
    }

    defineAndGetTheNameAndNubmerOfTheMonth(dob) {
        const date = new Date(dob);
        const monthPart = date.getUTCMonth();
        const monthNumber = monthPart;
        const monthName = this.monthArray[monthNumber];
        return { "monthName": monthName, "monthNumber": monthNumber };
    }

    async getUsersDataWithMonthName() {
        let usersDataArray = await this.yalantisData.getUsersList();
        let fullDataArray = usersDataArray.map((oneUserData) => {
            let monthData = this.defineAndGetTheNameAndNubmerOfTheMonth(oneUserData.dob);
            let monthName = monthData.monthName;
            oneUserData.monthName = monthName;
            return oneUserData;
        });
        return fullDataArray;
    }

    async getMonthObjectWithUsersData() {
        let usersData = await this.getUsersDataWithMonthName();
        let objectSortByMonth = {};
        this.monthArray.map(month => {
            let monthName = month;
            let dataArr = [];
            usersData.map(oneUserData => {
                if (oneUserData.monthName === month) {
                    dataArr.push(oneUserData);
                }
            })
            objectSortByMonth[monthName] = dataArr;
        })
        return objectSortByMonth;
    }
}

export default YalantisDataServise;
