import { useSelector } from 'react-redux'
import {
    selectEmail,
    selectFirstName,
    selectLastName,
} from '@utils/state/userSlice'
import { useEffect } from 'react'

export default function Pendo() {
    const userEmail = useSelector(selectEmail)
    const userFirstName = useSelector(selectFirstName)
    const userLastName = useSelector(selectLastName)

    // initialize Pendo if logged in
    useEffect(() => {
        window.pendo?.initialize({
            disableCookies: true,
            visitor: {
                id: userEmail,
                email: userEmail,
                full_name: `${userFirstName} ${userLastName}`,
            },
            account: {
                id: userEmail,
                name: userEmail,
                is_paying: false,
                monthly_value: 0,
            },
        })
    }, [userEmail, userFirstName, userLastName])

    return null
}
