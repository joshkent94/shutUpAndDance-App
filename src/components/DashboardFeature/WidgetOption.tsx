import { useSelector } from 'react-redux'
import { selectWidgets, setWidgetSelection } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'

export default function WidgetOption({ widget }) {
    const dispatch = useAppDispatch()
    const widgets = useSelector(selectWidgets)
    const widgetNames = widgets
        .filter((widget) => widget.show)
        .map((widget) => widget.name)

    const handleWidgetSelect = (e) => {
        dispatch(setWidgetSelection(e.target.value))
    }

    return (
        <label htmlFor={widget} className="genre-label">
            <input
                className="genre-checkbox"
                type="checkbox"
                id={widget}
                value={widget}
                onClick={handleWidgetSelect}
                checked={widgetNames.includes(widget)}
                readOnly
            />
            <p className="genre">{widget}</p>
        </label>
    )
}
