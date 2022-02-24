import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright, faHeart } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export default function Footer() {
    return (
        <div id="footer">
            <p id="footer-message">Made with <FontAwesomeIcon icon={faHeart} /> by Shut Up And Dance Ltd. <FontAwesomeIcon icon={faCopyright} /> All rights reserved.</p>
        </div>
    );
};