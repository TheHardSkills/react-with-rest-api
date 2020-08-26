class YalantisDataAPI {
    async getUsersList() {
        const response = await fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users');
        const json = await response.json();
        return json;
    }
}

export default YalantisDataAPI;
