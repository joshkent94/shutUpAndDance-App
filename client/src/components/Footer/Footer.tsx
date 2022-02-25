import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCopyright, faHeart } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export default function Footer() {
    const faCopyrightProp = faCopyright as IconProp;
    const faHeartProp = faHeart as IconProp;

    return (
        <div id="footer">
            <p id="footer-message">Made with <FontAwesomeIcon icon={faHeartProp} /> by Shut Up And Dance Ltd. <FontAwesomeIcon icon={faCopyrightProp} /> All rights reserved.</p>
        </div>
    );
};