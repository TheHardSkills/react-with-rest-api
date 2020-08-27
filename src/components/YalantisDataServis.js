import YalantisDataAPI from "../components/YalantisDataAPI";

class YalantisDataServis {
    constructor() {
        this.monthArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
        this.yalantisData = new YalantisDataAPI();
    }

    defineAndGetTheNameAndNubmerOfTheMonth(dob) {
        const date = new Date(dob);
        const monthPart = date.getUTCMonth();
        const monthNamber = monthPart;
        const monthName = this.monthArray[monthNamber];
        return { "monthName": monthName, "monthNamber": monthNamber };
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

export default YalantisDataServis;
