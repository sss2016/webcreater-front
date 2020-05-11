import {combineReducers} from 'redux';
import {layout,message} from './reducer'

const reducer = combineReducers({
    layout,message
})
export default reducer;