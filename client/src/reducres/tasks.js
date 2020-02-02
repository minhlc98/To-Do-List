import * as types from '../constant/ActionTypes'
import swal from 'sweetalert'

const initialState = []
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ALL_LISTS: {
            return [...action.tasks]
        }
        case types.ADD_TASK: {
            swal("Success!", "You have added task success!", "success");
            return [...state, action.task]
        }
        case types.EDIT_TASK: {
            const { _id, title } = action.task
            const index = state.findIndex(x => x._id === _id)
            if (index !== -1) {
                state[index] = {
                    _id,
                    title
                }
            }
            swal("Success!", "You have edited task success!", "success")
            return [...state]
        }
        case types.CLEAR_LIST: {
            swal("Success!", "You have deleted all tasks success!", "success")
            return []
        }
        case types.DELETE_TASK: {
            const { _id } = action
            let remainItems = state.filter(item => item._id !== _id)
            swal("Success!", "You have deleted task success!", "success")
            return remainItems
        }
        default: return state
    }
}
export default myReducer
