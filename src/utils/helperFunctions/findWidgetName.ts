export const flattenObject = (obj: any) => {
    let arr: any[] = []
    if (obj.children && obj.children.length > 0) {
        for (let i = 0; i < obj.children.length; i++) {
            arr = arr.concat(flattenObject(obj.children[i]))
        }
    } else {
        arr.push(obj)
    }
    return arr
}

export const findWidgetName = (obj: any) => {
    const flatArray = flattenObject(obj)
    for (let i = 0; i < flatArray.length; i++) {
        if (
            flatArray[i].classList &&
            flatArray[i].classList.contains('widget-title')
        ) {
            return flatArray[i].innerText
        }
    }
    return null
}
