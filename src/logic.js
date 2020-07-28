
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

    showBirthdayList() { //draft
        let container = document.getElementById("contentId");
        container.onmouseover = container.onmouseout = handler;

        function handler(event) {
            if (event.type === 'mouseover') {
                event.target.style.background = 'pink'
            }
            if (event.type === 'mouseout') {
                event.target.style.background = ''
            }
        }
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

    async borderSetter(month) {
        let countOfBirthsAllMonth = await this.countOfBirthsPerMonth();
        let countOfBirthsThisMonth = countOfBirthsAllMonth[month];
        //let monthInLowerCase = month.toLowerCase();
        //let countOfBirthdayInSelectedMonth = countOfBirthsThisMonth.monthInLowerCase;


        if (countOfBirthsThisMonth <= 2) {
            //month.border = 2px solid grey
            return "grey";

        }
        else if (countOfBirthsThisMonth >= 3 && countOfBirthsThisMonth <= 6) {
            //month.border = 2px solid blue
            return "blue";
        }
        else if (countOfBirthsThisMonth >= 7 && countOfBirthsThisMonth <= 10) {
            //month.border = 2px solid green
            return "green";
        }
        else if (countOfBirthsThisMonth >= 11) {
            //month.border = 2px solid red
            return "red";
        }
    }
}

export default ShowUsersList;
// const fff = async () => {
//     let experementWithShowUsersList = new ShowUsersList();
//     await experementWithShowUsersList.countOfBirthsPerMonth();
//     let res = await experementWithShowUsersList.borderSetter("august");
//     console.log("res");
//     console.log(res);

//     //shareButtonsContainer - el by id
//     //shareButtonsContainer.style.display = 'block';
// }

// fff();