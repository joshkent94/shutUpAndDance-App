import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { widgetArray } from '@utils/helperFunctions/widgetHelper'
import {
    hideCheckboxes,
    showCheckboxes,
} from '@utils/helperFunctions/toggleCheckboxes'
import { selectWidgets, updateWidgets } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import WidgetOption from './WidgetOption'

export default function WidgetDropdown() {
    const dispatch = useAppDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const widgets = useSelector(selectWidgets)
    const firstRender = useRef(true)

    const handleSearchTermChange = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

    // calculate selected widgets filtered by search term and in alphabetical order
    const filteredSortedWidgets = widgets
        .filter((widget) => widget.show)
        .slice()
        .sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }

            return 0
        })
        .filter((widget) => {
            return widget.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        // dispatch(updateWidgets(widgets))
    }, [dispatch, widgets])

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
                                    key={widget.name}
                                    widget={widget.name}
                                />
                            )
                        })}
                    </div>
                    <div id="genre-options">
                        <p className="dropdown-heading">Widget Options</p>
                        {filteredWidgets.map((widget) => {
                            return <WidgetOption key={widget} widget={widget} />
                        })}
                    </div>
                </div>
            </div>
        </form>
    )
}
