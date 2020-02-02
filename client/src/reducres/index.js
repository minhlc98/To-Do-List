import { combineReducers } from 'redux'
import task from './tasks'
import editingTask from './editingTask'
import filter from './filter'
const myReducers = combineReducers({
    task,
    editingTask,
    filter,
})
export default myReducers