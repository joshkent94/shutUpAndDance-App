import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { widgetArray } from "../../../utils/helperFunctions/widgetArray";
import { hideCheckboxes, showCheckboxes } from '../../../utils/helperFunctions/toggleCheckboxes';
import WidgetOption from "../WidgetOption/WidgetOption";
import { selectWidgets, updateWidgets } from "../../../utils/state/userSlice";

export default function WidgetDropdown() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const selectedWidgetsNames = useSelector(selectWidgets);
    const firstRender = useRef(true);

    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    // get names of widgets from helper function
    let widgetArrayNames = [];
    for (let i = 0; i < widgetArray.length; i++) {
        widgetArrayNames.push(widgetArray[i].name);
    };

    // calculate selected widgets filtered by search term and in alphabetical order
    const filteredSortedWidgets = selectedWidgetsNames.slice().sort().filter(widget => {
        return widget.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    // calculate available widgets filtered by search term and in alphabetical order
    const filteredWidgets = widgetArrayNames.slice().sort().filter(widget => {
        return widget.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // update widgets in db whenever selected widgets change
    useEffect(() => {
        if (document.cookie) {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            }
            dispatch(updateWidgets(selectedWidgetsNames));
        };
    }, [dispatch, selectedWidgetsNames]);

    return (
        <form>
            <div id="multiselect">
                <input className="form-control" id="genre-input" type="search" placeholder={`Select widgets (4 max, ${selectedWidgetsNames.length} chosen)`} aria-label="select widgets" onChange={handleSearchTermChange} onFocus={showCheckboxes} onBlur={hideCheckboxes}></input>
                <div id="genres">
                    <div id="selected-genres">
                        <p className="dropdown-heading">Selected Widgets</p>
                        {filteredSortedWidgets.map(widget => {
                            return <WidgetOption key={widget} widget={widget} />
                        })}
                    </div>
                    <div id="genre-options">
                        <p className="dropdown-heading">Widget Options</p>
                        {filteredWidgets.map(widget => {
                            return <WidgetOption key={widget} widget={widget} />
                        })}
                    </div>
                </div>
            </div>
        </form>
    );
};