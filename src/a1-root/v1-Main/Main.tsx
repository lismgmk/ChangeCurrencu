import React, {useEffect, useState} from 'react';
import style from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCurerencyThunk,
} from "../v5-redusers/mainReduser";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {CurrencyElement} from "../v4-components/CurrencyElements/CurrensyElement";
import {Button} from "@material-ui/core";


function Main() {
    const [refresh, setRefresh]=useState(false)

    useEffect(function (){
    dispatch(fetchCurerencyThunk())
}, [refresh] )

    const currencu = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.main);

    const dispatch = useDispatch();



    const refreshData = ()=>{
        setRefresh(!refresh)
        alert('Data refreshed')
    }

    return (
        <div className={style.column}>
            {
                currencu.map((i, index)=>{
                    return(
                        <CurrencyElement
                            key={index*9}
                            id={i.Cur_ID}
                            date={i.Date}
                            name={i.Cur_Name}
                            rate={i.Cur_OfficialRate}
                            abbreviation={i.Cur_Abbreviation}
                        />
                    )
                })
            }
            <Button  variant="contained" color="primary" onClick={refreshData}>Refresh</Button>
        </div>
    )
}

export default Main
