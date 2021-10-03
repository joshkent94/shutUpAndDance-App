import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFirstName } from '../../utils/state/userSlice';
import './Forum.css';

export default function Forum() {
    const firstName = useSelector(selectFirstName);
    const [/*searchTerm*/, setSearchTerm] = useState('');

    const handleSearch = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    return (
        <div id="forum">
            <div className="heading">
                <h3>{firstName}'s Forum</h3>
                <form>
                    <input className="form-control" id="search" type="search" placeholder="Search posts..." onChange={handleSearch}></input>
                </form>
            </div>
            <div className="content">

            </div>
        </div>
    );
};