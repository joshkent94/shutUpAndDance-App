import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { selectFirstName } from '../../../utils/state/userSlice';
import { getMostLikedThreads, searchThreads, selectMostLiked, selectThreads } from '../../../utils/state/forumSlice';
import ThreadOverview from '../ThreadOverview/ThreadOverview';
import './Forum.css';

export default function Forum() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const firstName = useSelector(selectFirstName);
    const threads = useSelector(selectThreads);
    const mostLiked = useSelector(selectMostLiked);

    // update local search term state
    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    // search for threads whenever search term is updated
    useEffect(() => {
        if (searchTerm) {
            dispatch(searchThreads({
                searchTerm: searchTerm
            }));
        };
    }, [searchTerm, dispatch]);

    // get most liked threads if search term is blank
    useEffect(() => {
        if (!searchTerm && firstName) {
            dispatch(getMostLikedThreads());
        };
    }, [dispatch, searchTerm, firstName]);

    // prevent form submit from reloading the page
    const handleFormSubmit = e => {
        e.preventDefault();
    };

    let content;
    if (threads.length === 0) {
        content = mostLiked.map(thread => {
            return <ThreadOverview key={thread.id} thread={thread} />
        });
    } else {
        content = threads.map(thread => {
            return <ThreadOverview key={thread.id} thread={thread} />
        });
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
                <Link to="/forum/new">Create Thread</Link>
            </button>

            {content}
        </div>
    );
};