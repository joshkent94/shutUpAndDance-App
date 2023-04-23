import { useSelector } from 'react-redux'
import WidgetDropdown from '../WidgetDropdown/WidgetDropdown'
import { displayWidget } from '../../../utils/helperFunctions/widgetHelper'
import {
    selectWidgets,
    setWidgetOrder,
    updateWidgets,
} from '../../../utils/state/userSlice'
import { useAppDispatch } from '../../../utils/state/store'
import DraggableGrid, { DraggableItem } from 'ruuri'
import { findWidgetName } from '../../../utils/helperFunctions/findWidgetName'
import './Dashboard.scss'

export default function Dashboard() {
    const selectedWidgets = useSelector(selectWidgets, (prev, next) => {
        return prev.length === next.length
    })
    const dispatch = useAppDispatch()

    // show widgets based on widget selection or a prompt if none are selected
    let content
    if (selectedWidgets.length === 0) {
        content = (
            <h5 className="sub-heading">
                Please select at least one widget for your dashboard.
            </h5>
        )
    } else {
        const children = selectedWidgets.map((widget) => (
            <DraggableItem key={widget}>{displayWidget(widget)}</DraggableItem>
        ))
        const showPlaceholder = (item) => item.getElement().cloneNode(false)
        const sendItemOrder = (item) => {
            const grid = item.getGrid()
            const items = grid.getItems()
            const orderedWidgets = items.map((item) =>
                findWidgetName(item.getElement())
            )
            dispatch(setWidgetOrder(orderedWidgets))
            dispatch(updateWidgets(orderedWidgets))
        }
        content = (
            <DraggableGrid
                dragEnabled
                dragPlaceholder={{
                    enabled: true,
                    createElement: showPlaceholder,
                }}
                onDragEnd={sendItemOrder}
            >
                {children}
            </DraggableGrid>
        )
    }

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">Dashboard</h5>
                <WidgetDropdown selectedWidgets={selectedWidgets} />
            </div>
            <div className="page-content">
                <div id="dashboard-page">{content}</div>
            </div>
        </div>
    )
}
