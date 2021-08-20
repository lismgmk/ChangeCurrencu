import React, {useEffect} from 'react';
import style from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCurerencyThunk,
} from "../v5-redusers/mainReduser";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {CurrencyElement} from "../v4-components/CurrencyElements/CurrensyElement";


function Main() {

    useEffect(function (){
    dispatch(fetchCurerencyThunk())
}, [] )

    const currencu = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.main);

    const dispatch = useDispatch();

    const refreshData = ()=>{
        dispatch(fetchCurerencyThunk())
    }

    return (
        <div className={style.column}>
            {
                currencu.map(i=>{
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
