import React from 'react';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import style from './App.module.css'
import Main from "./v1-Main/Main";
import {SetExchange} from "./v2-SetExchange/SetExchange";
import Page_404 from "./v3-Page_404/Page_404";
import {Button} from "@material-ui/core";



function App() {
    return (
        <>
            <div className={style.App}>
               <NavLink to={PATH.EXCHANG_MAIN} activeClassName={style.activeLink}>Main</NavLink>
                <NavLink to={PATH.EXCHANG_SET} activeClassName={style.activeLink}>Set</NavLink>


            </div>
            <Switch>
                <Route path={PATH.EXCHANG} exact render={() => ()=><Main/>}/>
                <Route path={'/'} exact render={() => ()=><Main/>}/>
                <Route path={PATH.EXCHANG_START} exact render={() => ()=><Main/>}/>

                <Route exact path={PATH.EXCHANG_MAIN} render={()=><Main/> }/>
                <Route exact path={PATH.EXCHANG_SET} render={()=><SetExchange/> }/>
                <Route exact path={PATH.EXCHANG_404} render={()=><Page_404/> }/>

                <Redirect from={'*'} to={PATH.EXCHANG_404}/>
            </Switch>
        </>
    )
}

export default App

export const PATH = {
    EXCHANG: '/ChangeCurrencu/',
    EXCHANG_START: '/exchang',
    EXCHANG_MAIN: '/exchang/main',
    EXCHANG_SET: '/exchang/setReduser',
    EXCHANG_404: '/exchang/404',
}
