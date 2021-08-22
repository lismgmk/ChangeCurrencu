import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {mainReduser} from "./v5-redusers/mainReduser";
import {setReduser} from "./v5-redusers/setReduser";
import {mainArrayReduser} from "./v5-redusers/mainArrayReduser";
import {initialReduser} from "./v5-redusers/initialReduser";



const rootReducer = combineReducers({
    main: mainReduser,
    mainArr: mainArrayReduser,
    set: setReduser,
    initial: initialReduser
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;

