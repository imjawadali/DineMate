
var date = new Date()

export function getTodayTimeStamp () {
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    return today.getTime()
}

export function getCurrentMonthTimeStamp () {
    var monthsFirstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    return monthsFirstDay.getTime()
}

export function getCurrentYearTimeStamp () {
    var yearsFirstDay = new Date(date.getFullYear(), 0, 1)
    return yearsFirstDay.getTime()
}

export function getTimeObject (timeStamp) {
    var time = {}
    var days = Math.floor(timeStamp / 86400)
    var hrs = Math.floor((timeStamp % 86400) / 3600)
    var mints = Math.floor(((timeStamp % 86400) % 3600) / 60)
    var secs = ((timeStamp % 86400) % 3600) % 60
    if (days) time.days = days
    if (hrs) time.hrs = hrs
    if (mints) time.mints = mints
    time.secs = secs
    return time
}

export function getFormatedDateTime (dateTime) {
    const date = new Date(dateTime)
    return `${date.getDate()}/
        ${date.getMonth() + 1}/
        ${date.getFullYear()} - 
        ${date.getHours() ? date.getHours()%12 : '12'}:
        ${date.getMinutes()}
        ${date.getHours() < 12 ? 'AM' : 'PM'}`
}