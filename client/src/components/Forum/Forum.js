import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFirstName } from '../../utils/state/userSlice';
import './Forum.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import NewThread from '../NewThread/NewThread';
import Thread from '../Thread/Thread';
import ForumHome from '../ForumHome/ForumHome';
import { searchThreads } from '../../utils/state/forumSlice';

export default function Forum() {
    const firstName = useSelector(selectFirstName);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

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

    const match = useRouteMatch();

    return (
        <Router>
            <div id="forum">
                <div className="heading">
                    <h3>{firstName}'s Forum</h3>
                    <form onSubmit={handleSearch}>
                        <input className="form-control" id="search" type="search" placeholder="Search posts..." onChange={handleSearchTermChange}></input>
                    </form>
                </div>

                <Switch>
                    <Route path={`${match.path}/new`}>
                        <NewThread />
                    </Route>
                    <Route path={`${match.path}/:threadId`}>
                        <Thread />
                    </Route>
                    <Route path={`${match.path}`}>
                        <ForumHome />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};