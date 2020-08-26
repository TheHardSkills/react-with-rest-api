import YalantisDataAPI from "./components/YalantisDataAPI";

class ShowUsersList {

    async getBirthdayArray() {
        const yalantisData = new YalantisDataAPI();
        const usersData = await yalantisData.getUsersList();
        let usersBirthdaysArray = [];
        usersData.map(dataOfOneUser => {
            usersBirthdaysArray.push(dataOfOneUser);
        });
        return usersBirthdaysArray;
    }

    getBirthMonth(userDateOfBirthday) {
        const date = new Date(userDateOfBirthday);
        const monthPart = date.getUTCMonth();
        const month = monthPart + 1;
        return month;
    }

    async createBirthdayUsersObject() {
        const usersBirthdaysArray = await this.getBirthdayArray();
        let birthdayUsersObject = {};

        let monthArray = [];
        usersBirthdaysArray.map(userData => {
            const birthdayMonth = this.getBirthMonth(userData.dob);
            const firstName = userData.firstName;
            const lastName = userData.lastName;
            const userNameAndLastname = {};
            userNameAndLastname.firstName = firstName;
            userNameAndLastname.lastName = lastName;

            if (monthArray[birthdayMonth] === undefined) {
                monthArray[birthdayMonth] = [];
            }
            monthArray[birthdayMonth].push(userNameAndLastname);
        });

        birthdayUsersObject.january = monthArray[1];
        birthdayUsersObject.february = monthArray[2];
        birthdayUsersObject.march = monthArray[3];
        birthdayUsersObject.april = monthArray[4];
        birthdayUsersObject.may = monthArray[5];
        birthdayUsersObject.june = monthArray[6];
        birthdayUsersObject.july = monthArray[7];
        birthdayUsersObject.august = monthArray[8];
        birthdayUsersObject.september = monthArray[9];
        birthdayUsersObject.october = monthArray[10];
        birthdayUsersObject.november = monthArray[11];
        birthdayUsersObject.december = monthArray[12];

        return birthdayUsersObject;
    }

    async countOfBirthsPerMonth() {
        const birthdaysArray = await this.getBirthdayArray();
        let monthObject = [];

        birthdaysArray.map(birthdayOfOneUser => {

            const birthdayMonth = this.getBirthMonth(birthdayOfOneUser.dob);

            if (monthObject[birthdayMonth] === undefined) {
                monthObject[birthdayMonth] = 0;
            }
            monthObject[birthdayMonth]++;
        });
        let monthCountObject = {};
        monthCountObject.january = monthObject[1];
        monthCountObject.february = monthObject[2];
        monthCountObject.march = monthObject[3];
        monthCountObject.april = monthObject[4];
        monthCountObject.may = monthObject[5];
        monthCountObject.june = monthObject[6];
        monthCountObject.july = monthObject[7];
        monthCountObject.august = monthObject[8];
        monthCountObject.september = monthObject[9];
        monthCountObject.october = monthObject[10];
        monthCountObject.november = monthObject[11];
        monthCountObject.december = monthObject[12];
        return monthCountObject;
    }

    async borderSetter() {
        const countOfBirthsAllMonth = await this.countOfBirthsPerMonth();
        let borderColorObject = {};

        for (const [key, countOfBirthsThisMonth] of Object.entries(countOfBirthsAllMonth)) {

            if (countOfBirthsThisMonth <= 2) {
                borderColorObject[key] = "grey";
            }
            else if (countOfBirthsThisMonth >= 3 && countOfBirthsThisMonth <= 6) {
                borderColorObject[key] = "blue";
            }
            else if (countOfBirthsThisMonth >= 7 && countOfBirthsThisMonth <= 10) {
                borderColorObject[key] = "green";
            }
            else if (countOfBirthsThisMonth >= 11) {
                borderColorObject[key] = "red";
            }
        }
        return borderColorObject;
    }
}

export default ShowUsersList;
