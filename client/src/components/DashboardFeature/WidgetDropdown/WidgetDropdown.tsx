import { useEffect, useRef, useState } from 'react'
import { widgetArray } from '../../../utils/helperFunctions/widgetHelper'
import {
    hideCheckboxes,
    showCheckboxes,
} from '../../../utils/helperFunctions/toggleCheckboxes'
import WidgetOption from '../WidgetOption/WidgetOption'
import { updateWidgets } from '../../../utils/state/userSlice'
import { useAppDispatch } from '../../../utils/state/store'

export default function WidgetDropdown({ add, remove, selectedWidgets }) {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const firstRender = useRef(true)

    const handleSearchTermChange = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

    // calculate selected widgets filtered by search term and in alphabetical order
    const filteredSortedWidgets = selectedWidgets
        .slice()
        .sort()
        .filter((widget) => {
            return widget.toLowerCase().includes(searchTerm.toLowerCase())
        })

    // calculate available widgets filtered by search term and in alphabetical order
    const filteredWidgets = widgetArray
        .slice()
        .sort()
        .filter((widget) => {
            return widget.toLowerCase().includes(searchTerm.toLowerCase())
        })

    // update widgets in db whenever selected widgets change
    useEffect(() => {
        if (document.cookie) {
            if (firstRender.current) {
                firstRender.current = false
                return
            }
            dispatch(updateWidgets(selectedWidgets))
        }
    }, [dispatch, selectedWidgets])

    return (
        <form>
            <div id="multiselect">
                <input
                    className="form-control"
                    id="genre-input"
                    type="search"
                    placeholder={`Select widgets`}
                    aria-label="select widgets"
                    onChange={handleSearchTermChange}
                    onFocus={showCheckboxes}
                    onBlur={hideCheckboxes}
                    autoComplete="off"
                />
                <div id="genres">
                    <div id="selected-genres">
                        <p className="dropdown-heading">Selected Widgets</p>
                        {filteredSortedWidgets.map((widget) => {
                            return (
                                <WidgetOption
                                    key={widget}
                                    widget={widget}
                                    add={add}
                                    remove={remove}
                                    selectedWidgets={selectedWidgets}
                                />
                            )
                        })}
                    </div>
                    <div id="genre-options">
                        <p className="dropdown-heading">Widget Options</p>
                        {filteredWidgets.map((widget) => {
                            return (
                                <WidgetOption
                                    key={widget}
                                    widget={widget}
                                    add={add}
                                    remove={remove}
                                    selectedWidgets={selectedWidgets}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </form>
    )
}
