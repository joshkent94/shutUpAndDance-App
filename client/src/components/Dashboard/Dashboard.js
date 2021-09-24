import Subnav from '../Subnav/Subnav';
import './Dashboard.css';

export default function Dashboard() {
    return (
        <div id="dashboard">
            <Subnav />
            <div className="content">
                <p>Dashboard</p>
            </div>
        </div>
    );
};