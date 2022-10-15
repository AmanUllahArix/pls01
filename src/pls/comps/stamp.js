import  { detect } from 'detect-browser';

export function dtStamp () {
    const browsername = detect();
    let dtstamp = new Date(); 
    let localdt = dtstamp.toLocaleString();
    return { "browsername": browsername, "localdt" : localdt}
}


export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
