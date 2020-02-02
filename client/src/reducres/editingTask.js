import * as types from '../constant/ActionTypes'
const initialState = { title: '' }
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDITING_TASK: {
            return {...action.task}
        }
        case types.CLEAR_INPUT:{
            return { title: ''}
        }
        default: return state
    }
}
export default myReducer
