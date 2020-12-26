
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