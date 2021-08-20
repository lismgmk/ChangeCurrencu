import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {mainReduser} from "./v5-redusers/mainReduser";
import {setReduser} from "./v5-redusers/setReduser";


const rootReducer = combineReducers({
    main: mainReduser,
set: setReduser
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

