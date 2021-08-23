import React, {useCallback, useEffect, useState} from 'react';
import style from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCurerencyThunk,
} from "../v5-redusers/mainReduser";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {CurrencyElement} from "../v4-components/CurrencyElements/CurrensyElement";
import {Box, Button, CircularProgress, Container, Grid} from "@material-ui/core";
import { nanoid } from 'nanoid'
import {Alert} from "@material-ui/lab";

function Main() {
    const [alert, setAlert] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [alert]);


    const [refresh, setRefresh] = useState(false)
    useEffect(function () {
        dispatch(fetchCurerencyThunk())
    }, [refresh])


    const dispatch = useDispatch();
    const currencu = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.main);
    const initial = useSelector<AppRootStateType, boolean>(state => state.initial.initial);


    const [filter, setFilter] = useState<'id' | 'abr' | 'name'>('abr')

    const refreshData = () => {
        setRefresh(!refresh)
        setAlert(true)
    }

    const setFilterId = (val: 'id' | 'abr' | 'name') => {
        setFilter(val)
    }
    const buttonsName: Array<'id' | 'abr' | 'name'> = ['id', 'abr', 'name']

    let filterCurrency = currencu

    if (filter == 'id') {
        filterCurrency = currencu.sort((a, b) => +a.Cur_ID > +b.Cur_ID ? 1 : -1)
    }
    if (filter == 'abr') {
        filterCurrency = currencu.sort((a, b) => a.Cur_Abbreviation > b.Cur_Abbreviation ? 1 : -1)
    }
    if (filter == 'name') {
        filterCurrency = currencu.sort((a, b) => a.Cur_Name > b.Cur_Name ? 1 : -1)
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
            <Grid container>
                <Grid item
                      xs
                >
                    <h3>Date</h3>
                </Grid>
                <Grid item
                      xs
                >
                    <h3>Currency</h3>
                </Grid>
                <Grid item
                      xs
                >
                    <h3>Rates</h3>
                </Grid>
                <Grid item
                      xs
                >
                    <h3>Abbreviation</h3>
                </Grid>
                <Grid item
                      xs
                >
                    <h3>Copy to clipboard</h3>
                </Grid>
                {
                    filterCurrency.map((i, index) => {
                        return (
                            <CurrencyElement
                                key={nanoid()}
                                id={i.Cur_ID}
                                date={i.Date}
                                name={i.Cur_Name}
                                rate={Math.ceil((+i.Cur_OfficialRate) * 100) / 100}
                                abbreviation={i.Cur_Abbreviation}
                            />
                        )
                    })
                }
            </Grid>

        <Grid container justifyContent="center" spacing={2}
        style={{marginBottom: "10px"}}
        >
            {buttonsName.map(i => {
                return <Grid item>
                    <Button
                        key={nanoid()}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setFilterId(i)
                        }
                        }>
                        Sort by {i}
                    </Button>
                </Grid>
            })}
            <Grid item>
            <Button variant="contained" color="primary" onClick={refreshData}>Refrech</Button>
            </Grid>
        </Grid>

            {alert && <Alert variant="filled" severity="success">Data refreshed</Alert>}
        </Container>
    )
};

export default Main
