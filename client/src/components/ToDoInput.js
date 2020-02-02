import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import swal from 'sweetalert'
function ToDoInput(props) {
    const { onSubmit, clearInput, onEditTask } = props
    const { _id, title } = props.editingTask
    const data = JSON.parse(sessionStorage.getItem('user'))
    const { user, token } = data
    const headers = { 
        'auth-token': token
    }
    //if these value are not empty => action is editing task. Otherwise, action is adding task
    const textInput = React.createRef();

    useEffect(() => {
        textInput.current.value = title
    }, [title]);

    function handleChange(event) {
        const { value: title } = event.target
        textInput.current.value = title
    }

    function handSubmit(e) {
        e.preventDefault()
        const { value: inputValue } = textInput.current
        if (inputValue) {
            const { _id: userId } = user
            if (_id) { // if action is editing task, it will have an _id
                //Edit task
                //Are old task and new task not same? if true => edit task. otherwise, show dialog nothing to change
                if (title === inputValue) {
                    //show dialog
                    swal('Nothing to change')
                }
                else {
                    const task = { _id, title: inputValue }
                    onEditTask(task, headers)
                }
            }
            else {
                // Add task
                onSubmit(
                    {
                        title: inputValue,
                        userId,
                    },
                    headers
                )
            }
            textInput.current.value = ''
            clearInput()
        }
    }
    return (
        <div className="card card-body my-3">
            <form>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Enter some characters"
                        ref={textInput}
                        onChange={handleChange} />
                </div>
                <button onClick={handSubmit} className="btn btn-block btn-primary">
                    {(_id) ? 'Done' : 'Add Task'}
                </button>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        editingTask: state.editingTask
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmit: (task, headers) => dispatch(actions.fetchAddTask(task, headers)),
        onEditTask: (task, headers) => dispatch(actions.fetchEditTask(task, headers)),
        clearInput: () => dispatch(actions.clearInput())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDoInput)