import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMostLikedThreads, resetForumDetails, searchThreads, selectMostLiked, selectThreads } from '../../../utils/state/forumSlice';
import ThreadOverview from '../ThreadOverview/ThreadOverview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './BrowseThreads.css';

export default function BrowseThreads() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const threads = useSelector(selectThreads);
    const mostLiked = useSelector(selectMostLiked);

    // update local search term state
    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    // get most liked threads if search term is blank &
    // search for threads whenever search term is updated
    useEffect(() => {
        if (!searchTerm && document.cookie) {
            dispatch(resetForumDetails());
            dispatch(getMostLikedThreads());
        };
        if (searchTerm) {
            dispatch(searchThreads({
                searchTerm: searchTerm
            }));
        };
    }, [dispatch, searchTerm]);

    let content;
    if (threads.length === 0 && !searchTerm) {
        content = mostLiked.map(thread => {
            return <ThreadOverview key={thread.id} thread={thread} />
        });
    } else {
        content = threads.map(thread => {
            return <ThreadOverview key={thread.id} thread={thread} />
        });
    };

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    Forum {'>'} Browse Threads
                </h5>
                <div id="search" className="input-group">
                    <input className="form-control" type="search" aria-label="search threads" placeholder="Search" onChange={handleSearchTermChange}></input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" id="search-button" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </div>
        
            <div className="page-content">
                <div id="browse-threads-page">
                    {content}
                </div>
            </div>
        </div>
    );
};