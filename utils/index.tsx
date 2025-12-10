import { Dimensions } from "react-native";

export const formatDate = (epoch:number)=> {
    const date = new Date(epoch).toLocaleTimeString([], {day: '2-digit', month: '2-digit', year: '2-digit'})
    return date
}
export const getMonth = (month:string)=>{
    let monthText = ''
    switch (month) {
        case '01':
            monthText = "Jan";
            break;
        case '02':
            monthText = "Feb";
            break;
        case '03':
            monthText = "Mar";
            break;
        case '04':
            monthText = "Apr";
            break;
        case '05':
            monthText = "May";
            break;
        case '06':
            monthText = "Jun";
            break;
        case '07':
            monthText = "Jul";
            break;
        case '08':
            monthText = "Aug";
            break;
        case '09':
            monthText = "Sep";
            break;
        case '10':
            monthText = "Oct";
            break;
        case '11':
            monthText = "Nov";
            break;
        case '12':
            monthText = "Dev";
            break;
    }
    return monthText;
}

export const Width = Dimensions.get("window");
export const Height = Dimensions.get("window").height;