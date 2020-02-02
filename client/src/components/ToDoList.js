import React, { useEffect } from 'react'
import ToDoItem from './ToDoItem'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import Filter from './Filter'
import swal from 'sweetalert'

function ToDoList(props) {

    const { getListTasks, deleteAllTask, filter } = props
    const allInfo = JSON.parse(sessionStorage.getItem("user"))
    const { user, token } = allInfo
    const { _id: userId } = user
    let { tasks } = props
    const headers = { 'auth-token': token }
    //Get List tasks
    useEffect(() => {
        getListTasks(userId, headers)
    }, []);
    function handleDeleteAll() {
        swal({
            title: "Comfirm",
            text: "Are you sure you want to delete all tasks?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(() => {
            deleteAllTask({ userId }, headers)
        });
    }
    if (filter !== '') tasks = tasks.filter(task => task.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    const toDoTasks = tasks.map(t => <ToDoItem key={t._id} task={t} />)
    return (
        <ul className="list-group my-5">
            <h3 className="text-center">To Do List</h3>
            <Filter />
            {toDoTasks}
            <button onClick={handleDeleteAll} className="btn btn-danger mt-2">Clear List</button>
        </ul>
    )
}
const mapStateToProps = (state) => {
    return {
        tasks: state.task,
        filter: state.filter
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        deleteAllTask: (userId, headers) => {
            dispatch(actions.fetchDeleteAllTask(userId, headers))
        },
        getListTasks: (userId, headers) => {
            dispatch(actions.fetchAllTasksRequest(userId, headers))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)