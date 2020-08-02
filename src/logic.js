class ShowUsersList {
    async getUserList() {
        let response = await fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users');
        let json = await response.json();
        return json;
    }

    async getBirthdayArray() {
        const usersData = await this.getUserList();
        let usersBirthdaysArray = [];
        usersData.map(dataOfOneUser => {
            usersBirthdaysArray.push(dataOfOneUser);
        })
        return usersBirthdaysArray;
    }

    getBirthMonth(userDateOfBirthday) {
        const date = new Date(userDateOfBirthday);
        const monthPart = date.getUTCMonth();
        const month = monthPart + 1;
        return month;
    }

    async createBirthdayUsersObject() {
        let usersBirthdaysArray = await this.getBirthdayArray();
        let birthdayUsersObject = {};

        let januaryArr = [];
        let februaryArr = [];
        let marchArr = [];
        let aprilArr = [];
        let mayArr = [];
        let juneArr = [];
        let julyArr = [];
        let augustArr = [];
        let septemberArr = [];
        let octoberArr = [];
        let novemberArr = [];
        let decemberArr = [];

        usersBirthdaysArray.map(userData => {
            let birthdayMonth = this.getBirthMonth(userData.dob);
            let firstName = userData.firstName;
            let lastName = userData.lastName;
            let userNameAndLastname = {};
            userNameAndLastname.firstName = firstName;
            userNameAndLastname.lastName = lastName;

            switch (birthdayMonth) {
                case 1:
                    januaryArr.push(userNameAndLastname);
                    break;
                case 2:
                    februaryArr.push(userNameAndLastname);
                    break;
                case 3:
                    marchArr.push(userNameAndLastname);
                    break;
                case 4:
                    aprilArr.push(userNameAndLastname);
                    break;
                case 5:
                    mayArr.push(userNameAndLastname);
                    break;
                case 6:
                    juneArr.push(userNameAndLastname);
                    break;
                case 7:
                    julyArr.push(userNameAndLastname);
                    break;
                case 8:
                    augustArr.push(userNameAndLastname);
                    break;
                case 9:
                    septemberArr.push(userNameAndLastname);
                    break;
                case 10:
                    octoberArr.push(userNameAndLastname);
                    break;
                case 11:
                    novemberArr.push(userNameAndLastname);
                    break;
                case 12:
                    decemberArr.push(userNameAndLastname);
                    break;
                default:
                    console.log(`Error in getBirthMonth() function. Value is ${birthdayMonth}`);
            }
        });

        birthdayUsersObject.january = januaryArr;
        birthdayUsersObject.february = februaryArr;
        birthdayUsersObject.march = marchArr;
        birthdayUsersObject.april = aprilArr;
        birthdayUsersObject.may = mayArr;
        birthdayUsersObject.june = juneArr;
        birthdayUsersObject.july = julyArr;
        birthdayUsersObject.august = augustArr;
        birthdayUsersObject.september = septemberArr;
        birthdayUsersObject.october = octoberArr;
        birthdayUsersObject.november = novemberArr;
        birthdayUsersObject.december = decemberArr;

        return birthdayUsersObject;
    }

    async countOfBirthsPerMonth() {
        const birthdaysArray = await this.getBirthdayArray();

        let monthCountObject = {
            january: 0,
            february: 0,
            march: 0,
            april: 0,
            may: 0,
            june: 0,
            july: 0,
            august: 0,
            september: 0,
            october: 0,
            november: 0,
            december: 0
        }

        birthdaysArray.map(birthdayOfOneUser => {

            let birthdayMonth = this.getBirthMonth(birthdayOfOneUser.dob);
            switch (birthdayMonth) {
                case 1:
                    monthCountObject.january++;
                    break;
                case 2:
                    monthCountObject.february++;
                    break;
                case 3:
                    monthCountObject.march++;
                    break;
                case 4:
                    monthCountObject.april++;
                    break;
                case 5:
                    monthCountObject.may++;
                    break;
                case 6:
                    monthCountObject.june++;
                    break;
                case 7:
                    monthCountObject.july++;
                    break;
                case 8:
                    monthCountObject.august++;
                    break;
                case 9:
                    monthCountObject.september++;
                    break;
                case 10:
                    monthCountObject.october++;
                    break;
                case 11:
                    monthCountObject.november++;
                    break;
                case 12:
                    monthCountObject.december++;
                    break;
                default:
                    console.log(`Error in getBirthMonth() function. Value is ${birthdayMonth}`);
            }
        });
        return monthCountObject;
    }

    async borderSetter(allMonth) {
        let countOfBirthsAllMonth = await this.countOfBirthsPerMonth();
        let borderColorObject = {};

        for (let [key, countOfBirthsThisMonth] of Object.entries(countOfBirthsAllMonth)) {

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