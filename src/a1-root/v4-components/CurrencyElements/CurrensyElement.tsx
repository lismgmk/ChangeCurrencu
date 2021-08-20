import React, {useEffect, useState} from 'react';
import style from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchCurerencyThunk} from "../../v5-redusers/mainReduser";
import {AppRootStateType} from "../../store";
import {CurrencyType} from "../../v6-Api/exchange-api";
import {Paper, Box} from "@material-ui/core";

export function CurrencyElement(props: CurrencyElementType) {
const [rateBord, setRateBord]=useState(props.rate)

    return (
        <Paper key={props.id}>
            <Box color="red">
                <span>Дата:  </span>{props.date}
            </Box>
            <Box>
                <span>Валюта:  </span> {props.name}
            </Box>
            <Box>
                <span>Курс: </span> {props.rate} BYN
            </Box>
            <button>Copy</button>
            {/*<CopyToClipboard text={rateBord}*/}
            {/*                 onCopy={() => setRateBord({copied: true})}>*/}
            {/*    <button>Copy to clipboard with button</button>*/}
            {/*</CopyToClipboard>*/}
        </Paper>

    )

}

type CurrencyElementType = {
    id: number
    date: string
    name: string
    rate: string
}
