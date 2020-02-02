import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import callApi from '../utils/ApiCaller'
import handleError from '../actions/error'
function FormSignIn() {
    const eInput = React.createRef()
    const passInput = React.createRef()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const displayLoading = isLoading ? {display: 'block'} : {display: 'none'}
    function handleChange(e) {
        const { target } = e
        const { name } = target
        const { value } = target
        switch (name) {
            case 'email': {
                eInput.current.value = value
                break
            }
            case 'password': {
                passInput.current.value = value
                break
            }
            default: break
        }
    }

    async function handleSubmit() {
        setIsLoading(true)
        const { value: email } = eInput.current
        const { value: password } = passInput.current
        const login = {
            email,
            password
        }
        try {
            const result = await callApi('users/signin', login, 'POST')
            const { data } = result
            sessionStorage.setItem("user", JSON.stringify(data))
            history.push('/')
        } catch (err) {
            setIsLoading(false)
            handleError(err.response.data.errMessage)
        }
    }

    return (
        <div className="container my-3" style={{ fontSize: 14 }}>
            <div className="card mx-auto" style={{ width: '24rem' }}>
                <div className="card-body">
                    <div className='form-group'>
                        <label htmlFor="emailInput">Email</label>
                        <input type="text"
                            id="emailInput"
                            className="form-control"
                            name="email"
                            ref={eInput}
                            onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password"
                            id="passwordInput"
                            className="form-control"
                            name="password"
                            ref={passInput}
                            onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <div className="forgot-password text-center">
                            <Link to="/signup">Forgot password?</Link>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" onClick={handleSubmit} >Sign In</button>
                    <div className="pt-2 text-center">
                        <span>Don't have an account? </span>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>

            </div>
            <div className="text-center mt-3" style={displayLoading}>
                <span className="sbl-circ-path"></span>
            </div>
        </div>
    )
}
export default FormSignIn