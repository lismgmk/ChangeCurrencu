import React, {useEffect} from 'react';
import style from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    addCurrencuAC,
    deadCurrencuAC,
    fetchCurerencyThunk,
    refrechCurrencuAC,
    refreshCurerencyThunk
} from "../v5-redusers/mainReduser";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {Paper, Box} from "@material-ui/core";
import {CurrencyElement} from "../v4-components/CurrencyElements/CurrensyElement";


function Main() {


    let currencu = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.main);


// @ts-ignore
    useEffect(function (){
    dispatch(fetchCurerencyThunk())
    // return dispatch(deadCurrencuAC())
} ,[])



    const dispatch = useDispatch();

    const refreshData = ()=>{
        dispatch(refreshCurerencyThunk())
    }

    return (
        <div className={style.column}>
            {
                currencu.map(i=>{
                    console.log(i)
                    return(
                        <CurrencyElement
                            id={i.Cur_ID}
                            date={i.Date}
                            name={i.Cur_Name}
                            rate={i.Cur_OfficialRate}
                        />
                    )
                })
            }
            <button onClick={refreshData}>Refresh</button>
        </div>
    )
}

export default Main
