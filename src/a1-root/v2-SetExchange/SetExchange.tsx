import React, {useEffect, useState} from 'react';
import style from './Set.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {fetchAllCurerencyThunk} from "../v5-redusers/setReduser";
import {addElArrayAC, delElArrayAC} from "../v5-redusers/mainArrayReduser";
import {
    Button,
    CircularProgress,
    Container, Grid,
    ListItem,
    ListItemText,
    makeStyles, Paper,
    Select,
    TextField
} from "@material-ui/core";
import {nanoid} from 'nanoid'
import {Alert} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(2),
    },
}));

export function SetExchange() {

    const [alert, setAlert] = useState<boolean>(false);
    const [alertAdd, setAlertAdd] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlertAdd(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [alertAdd]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [alert]);

    useEffect(() => {
        dispatch(fetchAllCurerencyThunk())
    }, [])

    const classes = useStyles();

    const allCurrency = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.set);
    const mainArray = useSelector<AppRootStateType, Array<string>>(state => state.mainArr);
    const dispatch = useDispatch();


    const abbreviatureCurrensy = allCurrency.map(i => {
        return i.Cur_Abbreviation
    })

    const [select, setSelect] = useState('')
    const [inputs, setInput] = useState('')
    const [hideInputs, setHideInputs] = useState(true)
    const initial = useSelector<AppRootStateType, boolean>(state => state.initial.initial)

    let err: boolean = true
    let inputsArray: Array<string> = abbreviatureCurrensy.filter((i, index) => {
        if (inputs.length == 1) {
            if (i[0] == inputs[0].toUpperCase()) {
                err = false
                return true
            }
        }
        if (inputs.length == 2) {
            if (i[0] == inputs[0].toUpperCase() && i[1] == inputs[1].toUpperCase()) {
                err = false
                return true
            }
        }
        if (inputs.length == 3) {
            if (i[0] == inputs[0].toUpperCase() && i[1] == inputs[1].toUpperCase() && i[2] == inputs[2].toUpperCase()) {
                err = false
                return true
            }
        }
        if (inputs.length == 0) {
            err = false
        }

    })

    const addCurrencu = () => {
        dispatch(addElArrayAC(select))
        setInput('')
        inputsArray = []
        setSelect('')
        setHideInputs(true)
        setAlertAdd(true)
    }
    if (initial) {
        return <Grid
            container
            xs={12}
            justifyContent="center"
        >
            <CircularProgress color="secondary"
                              size={100}
            />
        </Grid>
    }
    return (
        <Container>
            <Grid container
                  spacing={1}
                  justifyContent="center"
                  direction="column"
                  alignItems="center"
            >

                <Grid
                    container
                    justifyContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={2}
                    xs={12}
                >
                    <Grid
                        item
                        spacing={2}
                        xs={12}
                    >
                        <h1>Add currency</h1>
                    </Grid>

                    <Grid item
                          spacing={1}
                          xs={12}
                    >
                        <TextField
                            style={{backgroundColor: '#cfe8fc', marginBottom: '10px'}}
                            error={err}
                            id="filled-textarea"
                            label={err ? "there is no such currency" : "enter abbreviation here..."}
                            multiline
                            variant="filled"
                            value={inputs}
                            onChange={(e) => {
                                setInput(e.currentTarget.value)
                            }}
                        />
                    </Grid>


                    {hideInputs && inputsArray.map((i, index) => {
                        return <Grid item
                                     xs={12}
                        >
                            <ListItem
                                style={{
                                    backgroundColor: '#cfe8fc',
                                    width: '150px',
                                    textAlign: "center",
                                    marginBottom: "10px",
                                    marginTop: "10px"
                                }}
                                key={nanoid()}
                                button>
                                <ListItemText

                                    onClick={() => {
                                        setHideInputs(false)
                                        setInput(i)
                                        setSelect(i)
                                    }}
                                    primary={i}
                                /></ListItem>
                        </Grid>

                    })
                    }

                    {alertAdd && <Alert variant="filled" severity="success">Currency added</Alert>}
                    {!hideInputs &&
                    <Grid item
                          spacing={2}
                          xs={12}
                    >
                        <Button className={classes.margin}
                                disabled={err}
                                variant="contained"
                                color="primary"
                                onClick={addCurrencu}>
                            Add Currencu</Button>
                    </Grid>
                    }
                </Grid>


                {mainArray.map((i, index) => {
                    return <Grid
                        container
                        xs
                        justifyContent="center"
                        spacing={2}
                    >
                        <ListItem
                            key={nanoid()}
                            button
                            style={{
                                backgroundColor: '#cfe8fc',
                                width: '100vh',
                                textAlign: "center",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            <ListItemText
                                primary={i}
                            />
                            <Button variant="contained" color="primary" onClick={() => {
                                dispatch(delElArrayAC(i))
                                setAlert(true)
                            }
                            }>Delete
                                Currencu</Button>

                        </ListItem>
                    </Grid>


                })}
                {alert && <Alert variant="filled"
                                 severity="success">Currency deleted</Alert>

                }


            </Grid>
        </Container>

    )
}

