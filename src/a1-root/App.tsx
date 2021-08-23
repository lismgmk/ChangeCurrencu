import React from 'react';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import style from './App.module.css'
import Main from "./v1-Main/Main";
import {SetExchange} from "./v2-SetExchange/SetExchange";
import Page_404 from "./v3-Page_404/Page_404";
import {AppBar, Button, Grid, Paper, Typography} from "@material-ui/core";


function App() {
    return (
        <div>
            <AppBar position="static">
                <Grid
                    style={{margin: "30px"}}
                    container
                    justifyContent="space-around">
                    <NavLink
                        style={{textDecoration: "none", color: "white", fontSize: "26px"}}
                        to={PATH.EXCHANG_MAIN} activeClassName={style.activeLink}>
                        Main
                    </NavLink>
                    <NavLink
                        style={{textDecoration: "none", color: "white", fontSize: "26px"}} to={PATH.EXCHANG_SET}
                       >
                        Set
                    </NavLink>
                </Grid>



            </AppBar>
            <Switch>
                <Route path={PATH.EXCHANG} exact render={() => <Redirect to={PATH.EXCHANG_MAIN}/>}/>

                <Route exact path={PATH.EXCHANG_MAIN} render={() => <Main/>}/>
                <Route exact path={PATH.EXCHANG_SET} render={() => <SetExchange/>}/>
                <Route exact path={PATH.EXCHANG_404} render={() => <Page_404/>}/>

                <Redirect from={'*'} to={PATH.EXCHANG_404}/>
            </Switch>
        </div>
    )
}

export default App

export const PATH = {
    EXCHANG: '/ChangeCurrencu/',
    EXCHANG_MAIN: '/ChangeCurrencu/main',
    EXCHANG_SET: '/ChangeCurrencu/setReduser',
    EXCHANG_404: '/ChangeCurrencu/404',
}
