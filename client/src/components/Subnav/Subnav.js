import './Subnav.css';
import GenreDropdown from '../GenreDropdown/GenreDropdown';

export default function Subnav() {
    return (
        <div id="subnav">
            <GenreDropdown />

            <form>
                <input className="form-control" id="search" type="search" placeholder="Search..."></input>
            </form>
        </div>
    );
};