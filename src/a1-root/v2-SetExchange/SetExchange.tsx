import React, {useEffect, useState} from 'react';
import style from './Set.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import {deadAllCurrencuAC, fetchAllCurerencyThunk} from "../v5-redusers/setReduser";
import {addCurerencyThunk, addnNewCurrencuAC, deleteNewCurrencuAC} from "../v5-redusers/mainReduser";

// import {fetchAllCurerencyThunk} from "../v5-redusers/mainReduser";

export function SetExchange() {
// @ts-ignore
    useEffect(()=>{
    dispatch(fetchAllCurerencyThunk())
    return dispatch(deadAllCurrencuAC())
},[])


    const currencu = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.set);
    const dispatch = useDispatch();


    const options = currencu.map(i=>{
      return  <option value={i.Cur_ID}
      >{i.Cur_Name}</option>
    })

    const[select, setSelect]=useState('')
    const addCurrencu =()=>{
        dispatch(addCurerencyThunk(+select))
    }
    const deleteCurrencu =()=>{
        dispatch(deleteNewCurrencuAC(+select))
    }


  return (
    <div className={style.App}>

        <select id="select" onChange={(e)=>{
            setSelect(e.currentTarget.value)
            console.log(e.currentTarget.value)
        }}>
            {options}
        </select>
        <button onClick={addCurrencu}>Add Currencu</button>
        <button onClick={deleteCurrencu}>Delete Currencu</button>
    </div>
  )
}

