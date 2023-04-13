import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './ScreenSizePrompt.scss';

export default function ScreenSizePrompt() {
    return (
        <div id="screen-size-prompt-page">
            <img src={Logo} alt="logo" id="logo" />
            <h3 id="prompt">
                Please access Shut Up And Dance on a larger screen,
                or alternatively, you can download our mobile app.
            </h3>
            <p id="with-love">With <FontAwesomeIcon icon={faHeart} /> from Shut Up And Dance Ltd.</p>
        </div>
    );
};