interface Widget {
    name: string
    show: boolean
}

export const sortWidgetsByName = (
    widgetsArray: Widget[],
    namesArray: string[]
): Widget[] => {
    const sortedWidgets: Widget[] = []
    const widgetsNotShown: Widget[] = widgetsArray.filter(
        (widget) => !widget.show
    )

    // iterate over the namesArray
    for (let i = 0; i < namesArray.length; i++) {
        const name = namesArray[i]

        // find the corresponding widget in widgetsArray
        const widget = widgetsArray.find((widget) => widget.name === name)

        // add the widget to the sortedWidgets array
        if (widget) sortedWidgets.push(widget)
    }

    return sortedWidgets.concat(widgetsNotShown)
}
