import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import callApi from '../utils/ApiCaller'
function ActivateStatus() {
    const { activateCode } = useParams()
    const [isSuccess, setIsSuccess] = useState(false)
    const history = useHistory()
    useEffect(() => {
        async function activate() {
            try {
                const result = await callApi('users/activate', { activateCode }, 'POST')
                const { data } = result
                sessionStorage.setItem("user", JSON.stringify(data))
                setIsSuccess(true)
            } catch (err) {
                history.push('/')
            }
        }
        activate()
    }, [])
    return (
        <div className="container mt-5 text-center">
            <p>
                {
                    isSuccess ? 'Congratulation! You have activated your account success.'
                        : 'Please wait a moment. Server is activating your account.'
                }
            </p>
            <Link to="/">Go to main page</Link>
        </div>
    )

}
export default ActivateStatus