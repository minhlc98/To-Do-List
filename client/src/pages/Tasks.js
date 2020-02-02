import React from 'react'
import ToDoInput from '../components/ToDoInput'
import ToDoList from '../components/ToDoList'
import { useHistory } from 'react-router-dom'
function Tasks() {
    const allInfo = JSON.parse(sessionStorage.getItem("user"))
    const history = useHistory()
    if (allInfo == null) {
        history.replace('/signin')
        return null
    }
    const { user } = allInfo
    const cursorPointer = {
        cursor: 'pointer'
    }
    function handleLogout() {
        sessionStorage.clear()
        history.push('/signin')
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-10 mx-auto col-md-8 mt-4">
                    <div className="btn-group float-right">
                        <span className="dropdown-toggle font-weight-bold"
                            style={cursorPointer}
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Welcome {user.name.lastName}
                        </span>
                        <div className="dropdown-menu">
                            <span className="dropdown-item"
                                style={cursorPointer}
                                onClick={handleLogout}>
                                Log out
                            </span>
                        </div>
                    </div>
                    <h3 className="text-center" style={{ clear: 'both' }}>To Do Input</h3>
                    <ToDoInput />
                    <ToDoList />
                </div>
            </div>
        </div>
    )
}
export default Tasks