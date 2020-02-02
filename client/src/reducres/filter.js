import * as types from '../constant/ActionTypes'
const initialState = ''
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TASK: {
            return action.title
        }
        default: return state
    }

}

export default myReducer