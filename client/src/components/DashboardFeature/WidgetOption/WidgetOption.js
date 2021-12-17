import { useDispatch, useSelector } from "react-redux";
import { selectWidgets, setWidgetSelection } from "../../../utils/state/userSlice";

export default function WidgetOption(props) {
    const widget = props.widget;
    const dispatch = useDispatch();
    const selectedWidgetsNames = useSelector(selectWidgets);

    const handleWidgetSelect = e => {
        dispatch(setWidgetSelection(e.target.value));
    };

    return (
        <label htmlFor={widget} className="genre-label">
            <input
                className="genre-checkbox"
                type="checkbox"
                id={widget}
                value={widget}
                onClick={handleWidgetSelect}
                checked={selectedWidgetsNames.includes(widget)}
                readOnly />
            <p className="genre">{widget}</p>
        </label>
    );
};