import * as types from '../constant/ActionTypes'
import callApi from '../utils/ApiCaller'
import handleError from './error'

//Get all tasks from db
export const fetchAllTasksRequest = (userId, headers) => {
    return async (dispatch) => {
        const result = await callApi(`tasks?userId=${userId}`, null, 'GET', headers)
        dispatch(allLists(result.data))
    }
}

export const allLists = (tasks) => {
    return {
        type: types.ALL_LISTS,
        tasks
    }
}

//Add task 
export const fetchAddTask = (task, headers) => {
    return async (dispatch) => {
        const result = await callApi('tasks', task, 'POST', headers)
        dispatch(addTask(result.data))
    }
}

export const addTask = (task) => {
    return {
        type: types.ADD_TASK,
        task
    }
}
//race condition

//Clear all tasks
export const fetchDeleteAllTask = (userId, headers) => {
    return async (dispatch) => {
        await callApi('tasks', userId, 'DELETE', headers)
        dispatch(clearList())
    }
}

export const clearList = () => {
    return {
        type: types.CLEAR_LIST
    }
}

// Delete task 
export const fetchDeleteTask = (_id, headers) => {
    return async (dispatch) => {
        await callApi(`tasks/${_id}`, null, 'DELETE', headers)
        dispatch(deleteTask(_id))
    }
}

export const deleteTask = (_id) => {
    return {
        type: types.DELETE_TASK,
        _id,
    }
}

//Edit task
export const fetchEditTask = (task, headers) => {
    return async (dispatch) => {
        try {
            await callApi(`tasks/${task._id}`, task, 'PUT', headers)
            dispatch(editTask(task))
        } catch (err) {
            //The task may be deleted
            handleError(err.response.data.errMessage)
        }
    }
}

export const editTask = (task) => {
    return {
        type: types.EDIT_TASK,
        task
    }
}

export const filterTask = (title) => {
    return {
        type: types.FILTER_TASK,
        title
    }
}

export const editingTask = (task) => {
    return {
        type: types.EDITING_TASK,
        task
    }
}

export const clearInput = () => {
    return {
        type: types.CLEAR_INPUT
    }
}

