import React, {useEffect, useState} from 'react';
import {Paper, Box, Button, Grid} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import style from '../../v1-Main/Main.module.css'
import {Alert} from "@material-ui/lab";

export function CurrencyElement(props: CurrencyElementType) {

    const [alert, setAlert] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false)
        }, 3000);
        return () => clearTimeout(timer);
    }, [alert]);

    const dateToday = props.date.slice(0, 10).split('-').reverse().join('-')

    const [valueCur, setValueCur] = useState({
        value: ['Date', dateToday, 'Currency', props.name, 'Rate', props.rate, 'BYN'].join(' '),
        copied: false,
    })

    return (<>
            <Grid style={{backgroundColor: 'rgb(207, 232, 252)', marginBottom: '10px', marginTop: "10px"}} container spacing={2}>
                <Grid item
                      xs
                >
                    {dateToday}
                </Grid>
                <Grid item
                      xs
                >
                    {props.name}
                </Grid>
                <Grid item
                      xs
                >
                    {props.rate}
                </Grid>
                <Grid item
                      xs
                >
                    {props.abbreviation}
                </Grid>
                <Grid item
                      xs
                >
                    <CopyToClipboard text={valueCur.value}
                                     onCopy={() => {
                                         setAlert(true)
                                         setValueCur({
                                             copied: true,
                                             value: [props.rate, props.name, props.date].join(' ')
                                         })
                                     }}>
                        <Button variant="contained" color="primary">Copy</Button>
                    </CopyToClipboard>
                </Grid>


            </Grid>
            {alert && <Alert variant="filled" severity="success">Data copied to clipboard</Alert>}
        </>


    )

}

type CurrencyElementType = {
    id: number
    date: string
    name: string
    rate: number
    abbreviation: string
}
