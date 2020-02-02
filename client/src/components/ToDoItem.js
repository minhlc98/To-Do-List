import React from 'react'
import * as actions from '../actions/index'
import { connect } from 'react-redux'
import swal from 'sweetalert'
function ToDoItem(props) {
    const { task, deleteTask, editingTask } = props
    const data = JSON.parse(sessionStorage.getItem('user'))
    const { token } = data
    const headers = { 'auth-token': token }
    function handleDelete(e) {
        swal({
            title: "Comfirm",
            text: "Are you sure you want to delete this task?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) deleteTask(task._id, headers)
        });
    }
    function handleEdit(e) {
        editingTask(task)
    }
    return (
        <li key={task._id} className="list-group-item text-capitalize d-flex justify-content-between align-items-center py-2">
            <h6 className="mb-0">{task.title}</h6>
            <div className="to-do-icon">
                <button className="btn btn-primary mx-1"
                    onClick={handleEdit}>
                    <i className="fa fa-edit" ></i>
                </button>
                <button className="btn btn-danger mx-1" onClick={handleDelete}>
                    <i className="fa fa-trash" ></i>
                </button>
            </div>
        </li>
    )
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteTask: (_id, headers) => {
            dispatch(actions.fetchDeleteTask(_id, headers))
        },
        editingTask: (task) => {
            dispatch(actions.editingTask(task))
        }
    }
}
export default connect(null, mapDispatchToProps)(ToDoItem)