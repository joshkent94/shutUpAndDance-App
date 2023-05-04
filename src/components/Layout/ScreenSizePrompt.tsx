import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Logo from '@assets/logo.png'

export default function ScreenSizePrompt() {
    return (
        <div id="screen-size-prompt-page">
            <Image src={Logo} alt="logo" id="logo" priority />
            <h3 id="prompt">
                Please access Shut Up And Dance on a larger screen, or
                alternatively, you can download our mobile app.
            </h3>
            <p id="with-love">
                <span>With </span>
                <FontAwesomeIcon icon={faHeart} height={18} fixedWidth />
                <span> from Shut Up And Dance Ltd.</span>
            </p>
        </div>
    )
}
