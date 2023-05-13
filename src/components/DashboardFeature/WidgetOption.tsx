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
        <label
            htmlFor={widget}
            className="dropdown-option flex h-[1.8rem] items-center hover:cursor-pointer hover:bg-fifth hover:text-primary"
        >
            <input
                className="relative ml-[0.8rem] mr-4 box-border inline-block appearance-none rounded-[3px] border border-third p-[7px] checked:bg-secondary checked:after:absolute checked:after:-top-0.5 checked:after:left-px checked:after:text-[13px] checked:after:text-primary checked:after:content-['\2714'] hover:cursor-pointer"
                type="checkbox"
                id={widget}
                value={widget}
                onClick={handleWidgetSelect}
                checked={widgetNames.includes(widget)}
                readOnly
            />
            <p className="m-0 font-normal capitalize">{widget}</p>
        </label>
    )
}
