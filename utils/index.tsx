import { Dimensions } from "react-native";

export const formatDate = (epoch:number)=> {
    const date = new Date(epoch).toLocaleTimeString([], {day: '2-digit', month: '2-digit', year: '2-digit'})
    return date
}
export const getMonth = (month:string)=>{
    let monthText = ''
    const months = {'01':'Jan',
                    '02':'Feb',
                    '03':'Mar',
                    '04':'Apr',
                    '05':'May',
                    '06':'Jun',
                    '07':'Jul',
                    '08':'Aug',
                    '09':'Sep',
                    '10':'Oct',
                    '11':'Nov',
                    '12':'Dec',
    }
    if (month.length < 0) {
        return 'NaN'
    }
    //@ts-ignore
    monthText = months[month];
    return monthText;
}

export const Width = Dimensions.get("window").width;
export const Height = Dimensions.get("window").height;