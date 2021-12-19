import { useState } from 'react';
import { useSelector } from 'react-redux';
import WidgetDropdown from '../WidgetDropdown/WidgetDropdown';
import { displayWidget, widgetArray } from "../../../utils/helperFunctions/widgetHelper";
import { selectWidgets } from '../../../utils/state/userSlice';
import { MuuriComponent } from 'muuri-react';
import './Dashboard.css';

export default function Dashboard() {
    const selectedWidgets = useSelector(selectWidgets);
    const [items, setItems] = useState(selectedWidgets);

    // functions passed down to widget selector to add/remove widgets state
    const add = widget => setItems(items.concat(widget));
    const remove = widget => setItems(items.filter(item => item !== widget));

    // show widgets using muuri component based on widget selection or a prompt if none are selected
    let content;
    if (items.length === 0) {
        content =
            <h5 className="sub-heading">
                Please select at least one widget for your dashboard.
            </h5>
    } else {
        const selectedWidgets = [];
        for (let i = 0; i < widgetArray.length; i++) {
            if (items.includes(widgetArray[i].name)) {
                selectedWidgets.push(widgetArray[i]);
            };
        };
        const children = items.map(widget => displayWidget(widget));
        const showPlaceholder = item => item.getElement().cloneNode(true);
        content =
            <MuuriComponent key={items}
                dragEnabled
                dragPlaceholder={{
                    enabled: true,
                    createElement: showPlaceholder
                }}>
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