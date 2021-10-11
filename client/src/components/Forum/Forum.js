import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFirstName } from '../../utils/state/userSlice';
import { searchThreads, selectThreads } from '../../utils/state/forumSlice';
import { Link } from "react-router-dom";
import './Forum.css';
import ThreadOverview from '../ThreadOverview/ThreadOverview';

export default function Forum() {
    const firstName = useSelector(selectFirstName);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const threads = useSelector(selectThreads);

    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    const handleSearch = e => {
        e.preventDefault();
        dispatch(searchThreads({
            searchTerm: searchTerm
        }));
    };

    return (
        <div id="forum">
            <div className="heading">
                <h3>{firstName}'s Forum</h3>
                <form onSubmit={handleSearch}>
                    <input className="form-control" id="search" type="search" placeholder="Search threads..." onChange={handleSearchTermChange}></input>
                </form>
            </div>

            <button className="account-submit btn" id="new-thread-button">
                <Link to="/forum/new">New Thread</Link>
            </button>

            {threads.map(thread => {
                return <ThreadOverview key={thread.id} thread={thread} />
            })}
        </div>
    );
};