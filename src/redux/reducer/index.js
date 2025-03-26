import {combineReducers} from 'redux'
import handleUserAuth from './loginCred'
import handleStaticData from './staticData'

const rootReducer = combineReducers({
    userCred: handleUserAuth,
    staticData: handleStaticData
})

export default rootReducer