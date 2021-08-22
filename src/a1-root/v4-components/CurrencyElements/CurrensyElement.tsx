import React, {useState} from 'react';
import {Paper, Box, Button} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from '../../v1-Main/Main.module.css'

export function CurrencyElement(props: CurrencyElementType) {


    const dateToday = props.date.slice(0, 10).split('-').reverse().join('-')

    const [valueCur, setValueCur] = useState({
        value: ['Date', dateToday, 'Currency', props.name, 'Rate', props.rate, 'BYN'].join(' '),
        copied: false,
    })

    return (
            <div className={style.papers}>
                <Box color="red">
                    <span>Дата:  </span>{dateToday}
                </Box>
                <Box>
                    <span>Валюта:  </span> {props.name}
                </Box>
                <Box>
                    <span>Курс: </span> {props.rate} BYN
                </Box>
                <Box>
                    <span>Abbreviation </span> {props.abbreviation}
                </Box>

                <CopyToClipboard text={valueCur.value}
                                 onCopy={() => {
                                     alert('Copied To Clipboard')
                                     setValueCur({
                                     copied: true,
                                     value: [props.rate, props.name, props.date].join(' ')
                                 })}}>
                    <Button variant="contained" color="primary">Copy to clipboard</Button>
                </CopyToClipboard>
            </div>



    )

}

type CurrencyElementType = {
    id: number
    date: string
    name: string
    rate: string
    abbreviation: string
}
