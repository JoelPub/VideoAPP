
let getDaysOfMonth = () => {
    var myDate = new Date();

    var days = 0;
    var month = myDate.getMonth() + 1;
    console.log(month);
    var date = myDate.getDate();//获取当前日(1-31)
    var day = myDate.getDay();//获取当前星期X(0-6,0代表星期天)

    var result = day - (date % 7 - 1);
    console.log(result);
    var re = result < 0 ? 7 + result : result;

    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            days = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            days = 30;
            break;
        case 2:
            if (isLeapYear) {
                days = 29;
            } else {
                days = 28;
            }
    }

    return days + '-' + re;
}



export {
    getDaysOfMonth
}
