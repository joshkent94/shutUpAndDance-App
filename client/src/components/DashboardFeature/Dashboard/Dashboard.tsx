import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WidgetDropdown from '../WidgetDropdown/WidgetDropdown';
import { displayWidget } from "../../../utils/helperFunctions/widgetHelper";
import { selectWidgets, setWidgetOrder } from '../../../utils/state/userSlice';
import { MuuriComponent } from 'muuri-react';
import './Dashboard.scss';

export default function Dashboard() {
    const selectedWidgets = useSelector(selectWidgets);
    const [items, setItems] = useState(selectedWidgets);
    const dispatch = useDispatch();

    // functions passed down to widget selector to add/remove widgets from state
    const add = widget => {
        const widgetArray = [widget];
        setItems(widgetArray.concat(items));
    };
    const remove = widget => setItems(items.filter(item => item !== widget));

    // show widgets using muuri component based on widget selection or a prompt if none are selected
    let content;
    if (items.length === 0) {
        content =
            <h5 className="sub-heading">
                Please select at least one widget for your dashboard.
            </h5>
    } else {
        const children = items.map(widget => displayWidget(widget));
        const showPlaceholder = item => item.getElement().cloneNode(false);
        const sendItemOrder = item => {
            const grid = item.getGrid();
            const items = grid.getItems();
            const orderedWidgets = items.map(item => item.getKey());
            dispatch(setWidgetOrder(orderedWidgets));
        };
        content =
            <MuuriComponent
                key={items}
                instantLayout
                dragEnabled
                dragPlaceholder={{
                    enabled: true,
                    createElement: showPlaceholder
                }}
                onDragEnd={sendItemOrder}>
                {children}
            </MuuriComponent>
    };

    return (
        <div className='page'>
            <div className="page-header">
                <h5 className="page-header-h5">
                    Dashboard
                </h5>
                <WidgetDropdown add={add} remove={remove} selectedWidgets={selectedWidgets} />
            </div>
            <div className='page-content'>
                <div id="dashboard-page">
                    {content}
                </div>
            </div>
        </div>
    );
};