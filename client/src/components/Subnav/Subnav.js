import './Subnav.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../utils/state/preLoginSlice';
import { resetUserDetails } from '../../utils/state/userSlice';
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { resetMusicDetails } from '../../utils/state/musicSlice';

export default function Subnav() {
    const dispatch = useDispatch();

    const handleLogout = e => {
        e.preventDefault();
        dispatch(resetUserDetails());
        dispatch(resetMusicDetails());
        dispatch(logout());
    };

    return (
        <div id="subnav">
            <GenreDropdown />

            <form>
                <input className="form-control" id="search" type="search" placeholder="Search..."></input>
            </form>

            <button className="form-control" id="log-out" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
};