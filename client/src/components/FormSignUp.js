import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import callApi from '../utils/ApiCaller'
import handleError from '../actions/error'
import swal from 'sweetalert'
function FormSignUp(props) {
    const fNameInput = React.createRef()
    const lNameInput = React.createRef()
    const eInput = React.createRef()
    const passInput = React.createRef()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const displayLoading = (isLoading) ? { display: 'block' } : { display: 'none' }
    function handleChange(e) {
        const { target } = e
        const { name } = target
        const { value } = target
        switch (name) {
            case 'firstName': {
                fNameInput.current.value = value
                break
            }
            case 'lastName': {
                lNameInput.current.value = value
                break
            }
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
        const patternEmail = /^[a-z][a-z0-9_\.]{3,}@[a-z][a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g;
        if (patternEmail.test(eInput.current.value)) {
            setIsLoading(true)
            const user = {
                name: {
                    firstName: fNameInput.current.value,
                    lastName: lNameInput.current.value
                },
                email: eInput.current.value,
                password: passInput.current.value
            }
            try {
                await callApi('users/signup', user, 'POST')
                history.push('/confirm')
            } catch (err) {
                setIsLoading(false)
                handleError(err.response.data.errMessage)
            }
        }
        else {
            swal("Email is invalid.")
        }
    }
    return (
        <div className="container card my-3" style={{ width: '28rem', fontSize: 14 }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="firstNameInput">First Name</label>
                            <input type="text"
                                id="firstNameInput"
                                ref={fNameInput}
                                name="firstName"
                                className="form-control"
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="lastNameInput">Last Name</label>
                            <input type="text"
                                id="lastNameInput"
                                ref={lNameInput}
                                name="lastName"
                                className="form-control"
                                onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="emailInput">Email</label>
                    <input type="text"
                        id="emailInput"
                        ref={eInput}
                        name="email"
                        className="form-control"
                        onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password"
                        id="passwordInput"
                        ref={passInput}
                        name="password"
                        className="form-control"
                        onChange={handleChange} />
                </div>
                <button className="btn btn-success w-100" onClick={handleSubmit}>
                    Sign Up
                </button>
                <div className="have-account text-center pt-2">
                    <span>Already have an account? </span>
                    <Link to="/signin">Click here to sign in</Link>
                </div>
            </div>
            <div className="text-center mt-3" style={displayLoading}>
                <span className="sbl-circ-path"></span>
            </div>
        </div>
    )
}

export default FormSignUp