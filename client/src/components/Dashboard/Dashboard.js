import './Dashboard.css';
import { selectFirstName } from '../../utils/state/userSlice';
import { useSelector } from 'react-redux';

export default function Dashboard() {
    const firstName = useSelector(selectFirstName);

    return (
        <div id="dashboard">
            <div className="heading">
                <h3>{firstName}'s Dashboard</h3>
            </div>
            <div className="content">

            </div>
        </div>
    );
};