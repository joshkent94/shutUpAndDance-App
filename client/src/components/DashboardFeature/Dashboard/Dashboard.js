import WidgetDropdown from '../WidgetDropdown/WidgetDropdown';
import './Dashboard.css';

export default function Dashboard() {
    return (
        <div className='page'>
            <div className="page-header">
                <h5 className="page-header-h5">
                    Dashboard
                </h5>
                <WidgetDropdown />
            </div>
            <div className='page-content'>
                <div id="dashboard-page">
                    
                </div>
            </div>
        </div>
    );
};