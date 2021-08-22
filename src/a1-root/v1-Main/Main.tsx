import React, {useCallback, useEffect, useState} from 'react';
import style from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCurerencyThunk,
} from "../v5-redusers/mainReduser";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {CurrencyElement} from "../v4-components/CurrencyElements/CurrensyElement";
import {Button, CircularProgress} from "@material-ui/core";
import { nanoid } from 'nanoid'

function Main() {


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
        alert('Data refreshed')
    }

    const setFilterId = (val: 'id' | 'abr' | 'name') => {
        setFilter(val)
        alert(`Sort by ${val}`)
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
        return <CircularProgress color="secondary"/>
    }
    return (
        <div className={style.column}>
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
        <>
            {buttonsName.map(i => {
                return <>
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
                </>
            })}
            <Button variant="contained" color="primary" onClick={refreshData}>Refrech</Button>
        </>


        </div>
    )
}

export default Main
