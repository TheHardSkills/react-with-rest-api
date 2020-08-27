import YalantisDataAPI from "../components/YalantisDataAPI";

class YalantisDataServis {
    constructor() {
        this.monthArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    }

    async getUsersListFromAPI() { //тесная связь? 
        const yalantisData = new YalantisDataAPI();
        const usersData = await yalantisData.getUsersList();
        return usersData;
    }

    defineTheNameAndNubmerOfTheMonth(dob) {
        const date = new Date(dob);
        const monthPart = date.getUTCMonth();
        const monthNamber = monthPart;
        const monthName = this.monthArray[monthNamber];
        return { "monthName": monthName, "monthNamber": monthNamber };
    }

    async getUsersDataWithMonthName() {
        let usersDataArray = await this.getUsersListFromAPI();
        let fullDataArray = usersDataArray.map((oneUserData) => {
            let monthData = this.defineTheNameAndNubmerOfTheMonth(oneUserData.dob);
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

    // async countOfBirthsPerMonth() {
    //     const birthdaysArray = await this.getUsersDataWithMonthName();
    //     let monthArray = [];
    //     birthdaysArray.map(birthdayOfOneUser => {
    //         const birthdayData = this.defineTheNameAndNubmerOfTheMonth(birthdayOfOneUser.dob);
    //         const birthdayMonth = birthdayData.monthNamber;
    //         if (monthArray[birthdayMonth] === undefined) {
    //             monthArray[birthdayMonth] = 0;
    //         }
    //         monthArray[birthdayMonth]++;
    //     });
    //     return monthArray;
    // }

    async borderSetter() {
        const allUsersData = await this.getUsersDataWithMonthName();
        let countBirthdayForMonthArray = [];
        this.monthArray.forEach((month) => {
            let oneMonth = 0;
            allUsersData.forEach((oneUserData) => {
                if (month === oneUserData.monthName) { oneMonth++; }
            })
            countBirthdayForMonthArray.push(oneMonth);
        })

        //const countOfBirthsAllMonth = await this.countOfBirthsPerMonth();
        const countOfBirthsAllMonth = countBirthdayForMonthArray;
        let arrayWithValuesForTheColorOfTheMonth = [];
        countOfBirthsAllMonth.map(oneMonth => {
            if (oneMonth <= 2) {
                arrayWithValuesForTheColorOfTheMonth.push("grey");
            }
            else if (oneMonth >= 3 && oneMonth <= 6) {
                arrayWithValuesForTheColorOfTheMonth.push("blue");
            }
            else if (oneMonth >= 7 && oneMonth <= 10) {
                arrayWithValuesForTheColorOfTheMonth.push("green");
            }
            else if (oneMonth >= 11) {
                arrayWithValuesForTheColorOfTheMonth.push("red");
            }
        });
        return arrayWithValuesForTheColorOfTheMonth;
    }
}

export default YalantisDataServis;
