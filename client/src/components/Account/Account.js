import { useSelector } from 'react-redux';
import { selectFirstName } from '../../utils/state/userSlice';
import './Account.css';

export default function Account() {
    const firstName = useSelector(selectFirstName);

    return (
        <div id="account">
            <div className="heading">
                <h3>{firstName}'s Account</h3>
            </div>
            <div className="content">

            </div>
        </div>
    );
};