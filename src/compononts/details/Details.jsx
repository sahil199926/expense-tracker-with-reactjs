import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import useTransaction from '../../useTransactions';
import  {Doughnut}  from 'react-chartjs-2';
import useStyles from './style';

function Details({ title }) {
    const clasN = useStyles();
const {total,chartData}=useTransaction(title);
console.log('this is chart',chartData)
    return (
        <Card className={title === 'Income' ? clasN.income : clasN.expense} >
            <CardHeader title={title} />
            <CardContent>
                <Typography variant='h5'> ₹ {total}</Typography>
                <Doughnut data={chartData}/>
            </CardContent>
        </Card>
    )
}

export default Details;
