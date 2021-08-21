import React, {useState} from 'react';
import {Paper, Box} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export function CurrencyElement(props: CurrencyElementType) {


    const dateToday = props.date.slice(0, 10).split('-').reverse().join('-')

    const [valueCur, setValueCur] = useState({
        value: ['Date', dateToday, 'Currency', props.name, 'Rate', props.rate, 'BYN'].join(' '),
        copied: false,
    })

    return (
        <Paper key={props.id}>
            <Box color="red">
                <span>Дата:  </span>{dateToday}
            </Box>
            <Box>
                <span>Валюта:  </span> {props.name}
            </Box>
            <Box>
                <span>Курс: </span> {props.rate} BYN
            </Box>

            <CopyToClipboard text={valueCur.value}
                             onCopy={() => setValueCur({
                                 copied: true,
                                 value: [props.rate, props.name, props.date].join(' ')
                             })}>
                <button>Copy to clipboard</button>
            </CopyToClipboard>
        </Paper>

    )

}

type CurrencyElementType = {
    id: number
    date: string
    name: string
    rate: string
}
