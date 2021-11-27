import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { selectFirstName } from '../../utils/state/userSlice';
import { getMostLikedThreads, searchThreads, selectThreads } from '../../utils/state/forumSlice';
import ThreadOverview from '../ThreadOverview/ThreadOverview';
import './Forum.css';

export default function Forum() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const firstName = useSelector(selectFirstName);
    const threads = useSelector(selectThreads);

    // update local search term state
    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    // search for threads whenever search term is updated
    // or get most liked threads if search term is blank
    useEffect(() => {
        if (!searchTerm) {
            dispatch(getMostLikedThreads());
        } else {
            dispatch(searchThreads({
                searchTerm: searchTerm
            }));
        };
    }, [searchTerm, dispatch]);

    // prevent form submit from reloading the page
    const handleFormSubmit = e => {
        e.preventDefault();
    };

    return (
        <div id="forum">
            <div className="heading">
                <h3>{firstName}'s Forum</h3>
                <form onSubmit={handleFormSubmit}>
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