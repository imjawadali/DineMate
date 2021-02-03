export function capitalizeFirstLetter (string) {
    if (string)
        return string.charAt(0).toUpperCase() + string.slice(1);
    else return string
}

export function getNameById(list, id) {
    var result = list.filter(item => item.id === id)
    return result.length ? result[0].name : null
}