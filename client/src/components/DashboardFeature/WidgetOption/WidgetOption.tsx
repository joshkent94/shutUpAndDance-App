import { setWidgetSelection } from '../../../utils/state/userSlice'
import { useAppDispatch } from '../../../utils/state/store'

export default function WidgetOption({ widget, add, remove, selectedWidgets }) {
    const dispatch = useAppDispatch()

    const handleWidgetSelect = (e) => {
        dispatch(setWidgetSelection(e.target.value))
        if (selectedWidgets.includes(widget)) {
            remove(widget)
        } else {
            add(widget)
        }
    }

    return (
        <label htmlFor={widget} className="genre-label">
            <input
                className="genre-checkbox"
                type="checkbox"
                id={widget}
                value={widget}
                onClick={handleWidgetSelect}
                checked={selectedWidgets.includes(widget)}
                readOnly
            />
            <p className="genre">{widget}</p>
        </label>
    )
}
