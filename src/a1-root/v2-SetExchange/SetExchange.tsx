import React, {useEffect, useState} from 'react';
import style from './Set.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store";
import {CurrencyType} from "../v6-Api/exchange-api";
import { fetchAllCurerencyThunk} from "../v5-redusers/setReduser";
import {addElArrayAC, delElArrayAC} from "../v5-redusers/mainArrayReduser";
import {Button, Select} from "@material-ui/core";


export function SetExchange() {
    useEffect(()=>{
    dispatch(fetchAllCurerencyThunk())
},[])


    const allCurrency = useSelector<AppRootStateType, Array<CurrencyType>>(state => state.set);
    const mainArray = useSelector<AppRootStateType, Array<string>>(state => state.mainArr);
    const dispatch = useDispatch();


    const options = allCurrency.map(i=>{
      return  <option
          value={i.Cur_Abbreviation}
      selected={mainArray.includes(i.Cur_Abbreviation)}
      >
          {i.Cur_Name}
      </option>
    })

    const[select, setSelect]=useState('')
    const addCurrencu =()=>{
        dispatch(addElArrayAC(select))
    }
    const deleteCurrencu =()=>{
        dispatch(delElArrayAC(select))
    }


  return (
    <div className={style.App}>

        <select
            size={allCurrency.length+1}
            multiple
                onChange={(e)=>{
            setSelect(e.currentTarget.value)
        }}>
            <option value="" selected disabled>Please select an currensy...</option>
            {allCurrency && options}
        </select>
        <Button variant="contained" color="primary" onClick={addCurrencu}>Add Currencu</Button>
        <Button variant="contained" color="primary" onClick={deleteCurrencu}>Delete Currencu</Button>
    </div>
  )
}

