import { displayWidget } from '@utils/helperFunctions/widgetHelper'
import { useSelector } from 'react-redux'
import { sortWidgetsByName } from '@utils/helperFunctions/sortWidgetsByName'
import { findWidgetName } from '@utils/helperFunctions/findWidgetName'
import DraggableGrid, { DraggableItem } from 'ruuri'
import {
    selectWidgets,
    setWidgetOrder,
    updateWidgets,
} from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'

export default function WidgetGrid() {
    const dispatch = useAppDispatch()
    const widgets = useSelector(selectWidgets, (prev, next) => {
        const prevLength = prev.filter((widget) => widget.show).length
        const nextLength = next.filter((widget) => widget.show).length
        return prevLength === nextLength
    })

    // show widgets based on widget selection or a prompt if none are selected
    let content
    if (widgets.length === 0) {
        content = (
            <h5 className="m-auto text-[1.1rem] font-semibold">
                Please select at least one widget for your dashboard.
            </h5>
        )
    } else {
        const children = widgets
            .filter((widget) => widget.show)
            .map((widget) => (
                <DraggableItem key={widget.name}>
                    {displayWidget(widget.name)}
                </DraggableItem>
            ))
        const showPlaceholder = (widget) => widget.getElement().cloneNode(false)
        const updateWidgetOrder = (widget) => {
            const grid = widget.getGrid()
            const gridWidgets = grid.getItems()
            const newlyOrderedWidgetsByName = gridWidgets.map((widget) =>
                findWidgetName(widget.getElement())
            )
            const newlyOrderedWidgets = sortWidgetsByName(
                widgets,
                newlyOrderedWidgetsByName
            )
            dispatch(setWidgetOrder(newlyOrderedWidgets))
            dispatch(updateWidgets(newlyOrderedWidgets))
        }
        content = (
            <DraggableGrid
                dragEnabled
                dragPlaceholder={{
                    enabled: true,
                    createElement: showPlaceholder,
                }}
                onDragEnd={updateWidgetOrder}
            >
                {children}
            </DraggableGrid>
        )
    }

    return <>{content}</>
}
