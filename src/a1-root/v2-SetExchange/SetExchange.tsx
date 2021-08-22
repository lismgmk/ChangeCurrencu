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
    Container,
    ListItem,
    ListItemText,
    makeStyles,
    Select,
    TextField
} from "@material-ui/core";
import { nanoid } from 'nanoid'


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(2),
    },
}));

export function SetExchange() {
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
        alert('Currency added')
    }

    if (initial) {
        return <CircularProgress color="secondary"/>
    }
    return (
        <Container>
            <div className={style.App}>
                <TextField
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
                <ul>
                    {hideInputs && inputsArray.map((i, index) => {
                        return <ListItem
                            key={nanoid()}
                            button>
                            <ListItemText
                                key={nanoid()}
                                onClick={() => {
                                    setHideInputs(false)
                                    setInput(i)
                                    setSelect(i)
                                }}
                                primary={i}
                            /></ListItem>
                    })
                    }


                </ul>

                {!hideInputs && <Button className={classes.margin}

                        disabled={err}
                        variant="contained"
                        color="primary"
                        onClick={addCurrencu}>
                    Add Currencu</Button>}

                {mainArray.map((i, index) => {
                    return <ListItem
                        key={nanoid()}
                        button>
                        <ListItemText
                            // key={nanoid()}
                            primary={i}
                        />
                        <Button  className={classes.margin} variant="contained" color="primary" onClick={()=>{
                            dispatch(delElArrayAC(i))
                            alert('Currency deleted')
                        }
                        }>Delete
                            Currencu</Button>
                    </ListItem>
                })}
            </div>
        </Container>

    )
}

