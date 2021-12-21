import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BrowseThreads from "../BrowseThreads/BrowseThreads";
import NewThread from "../NewThread/NewThread";
import MyThreads from "../MyThreads/MyThreads";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Forum.css';

export default function Forum() {
    const [searchTerm, setSearchTerm] = useState('');

    // update local search term state
    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    Forum
                </h5>
                <div id="search" className="input-group">
                    <input
                        className="form-control"
                        type="search"
                        aria-label="search threads"
                        placeholder="Search"
                        onChange={handleSearchTermChange}
                        autoComplete="off"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" id="search-button" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div id="forum-page">
                    <Tabs
                        defaultActiveKey="browse-threads"
                        id="forum-tabs"
                    >
                        <Tab eventKey='browse-threads' title="Browse Threads">
                            <BrowseThreads searchTerm={searchTerm} />
                        </Tab>
                        <Tab eventKey='my-threads' title="My Threads">
                            <MyThreads searchTerm={searchTerm} />
                        </Tab>
                        <Tab eventKey='create-new-thread' title="Create New Thread">
                            <NewThread />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};