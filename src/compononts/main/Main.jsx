import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import userStyle from './Mstyle';
import Form from './form/form';
import List from './list/List';
import { useContext } from "react";
import {ExpenseTrackerContext} from '../../context/Context';
const Main = () => {
    const classes = userStyle();

    const {Balance}=useContext(ExpenseTrackerContext);
    return (
        <Card className={classes.root}>
            <img src='/chart_img.png' style={{ 
    float: "right",
    marginRight: "3%",
    width: "14%",
    marginTop: "2%"
}} />
            <CardHeader title='Expense Tracker' subheader='Powered by Speechly' />

            <CardContent >
                <Typography align='center' variant='h5'>Total Balance- ₹ {Balance} </Typography>
                <Typography variant='subtitle1' style={{ lineHeight: '1.5em', marginTop: '20px',textAlign:'center' }}>
                    Try saying Add income for 1000₹ in category salary for monday
                </Typography>
                <Divider />
                <Form />
            </CardContent>
            <CardContent className={classes.CardContent}>
                <Grid container spaceing={2}>
                    <Grid item xs={12} >
                    <Divider />
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main;
