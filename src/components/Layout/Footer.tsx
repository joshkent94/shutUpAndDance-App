import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCopyright, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    const faCopyrightProp = faCopyright as IconProp
    const faHeartProp = faHeart as IconProp

    return (
        <div className="mt-auto bg-fifth px-8 pb-6 pt-2">
            <p className="m-0 text-[0.9rem] font-normal">
                Made with <FontAwesomeIcon icon={faHeartProp} /> by Shut Up And
                Dance Ltd. <FontAwesomeIcon icon={faCopyrightProp} /> All rights
                reserved.
            </p>
        </div>
    )
}
