export const formatDate = (epoch:number)=> {
    const date = new Date(epoch).toLocaleTimeString([], {day: '2-digit', month: '2-digit', year: '2-digit'})
    return date
}