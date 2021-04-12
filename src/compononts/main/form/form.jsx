import React from 'react'
import { TextField, Typography, Grid, Button, option, NativeSelect, FormControl, InputLabel } from '@material-ui/core';
import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './formstyle';
import { useSpeechContext } from '@speechly/react-client';
import {connect} from 'react-redux';
import {addTransaction,deleteTransaction} from '../../../store/action'
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import { CustomeSnackBar } from '../../../snackbar/SnackBar'
const initialData = {
    amount: '',
    category: 'Category',
    type: 'type',
    date: new Date()
}
    
const Form = (props) => {


    //stylrhook
    const classes = useStyles();


    //userDtate to update the initial value on evety click on create button

    const [formData, setformData] = useState(initialData);


    //state update
    //const update = useContext(ExpenseTrackerContext);

    //snackBar
    const [open, setOpen] = useState(false);
    //create transation

    const createTransaction = () => {
        if (Number(formData.amount) <= 0 || Number.isNaN(Number(formData.amount)) || formData.type === "type" || formData.category === "Category") { return; }

        setOpen(true);
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }
        props.add(transaction);
        setformData(initialData);

    }
    //catergories

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    //speechly
    const { segment } = useSpeechContext();


    //useEffect

    useEffect(() => {
        if (segment) {
            if(segment.intent.intent === 'add_expense') {
                setformData({ ...formData, type: 'Expense' })
            }
            else if (segment.intent.intent === 'add_income') {
                setformData({ ...formData, type: 'Income' })
            }
            else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            }
            else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                setformData({ initialData });
            }

            segment.entities.forEach((e) => {

                switch (e.type) {
                    case 'amount':
                        setformData({ ...formData, amount: e.value });
                        break;

                    case 'category':
                        const captial = e.value.charAt(0).toUpperCase() + e.value.slice(1).toLowerCase();
                        if (incomeCategories.map((ic) => ic.type).includes(captial)) {
                            setformData({ ...formData, category: captial, type: 'Income' });
                        }
                        else if (expenseCategories.map((ic) => ic.type).includes(captial)) {
                            setformData({ ...formData, category: captial, type: 'Expense' });
                        }
                        break;

                    case 'date':
                        setformData({ ...formData, date: e.value });
                        break;

                    default:
                        break;
                }
            })

            if (segment.isFinal && formData.type && formData.category) {
                createTransaction();
            }
        }
    }, [segment])

    return (
        <Grid container spacing={2}>
            <CustomeSnackBar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    {segment && segment.words.map((w) => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>type</InputLabel>
                    <NativeSelect value={formData.type} onChange={(e) => setformData({ ...formData, type: e.target.value })} >
                        <option value="type">type</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>

                    </NativeSelect>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <NativeSelect value={formData.category} onChange={(e) => setformData({ ...formData, category: e.target.value })} >
                        <option value="Category">Category</option>
                        {selectedCategories.map((cat) => <option key={cat.type} value={cat.type} >{cat.type}</option>)}


                    </NativeSelect>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type='number' label='Amount' fullWidth value={formData.amount} onChange={(e) => setformData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label='Date' fullWidth value={formData.date} onChange={(event) => setformData({ ...formData, date: event.target.value })} />
            </Grid>
            <Button className={classes.button} variant='outlined' color='primary' fullWidth onClick={createTransaction}  > Create</Button>
        </Grid>
    )
}


const mapDispatchToprops=(dispatch)=>{

    return {add:(transaction)=>dispatch(addTransaction(transaction)),
    delete:(id)=>dispatch(deleteTransaction(id))}
}

export default connect(null,mapDispatchToprops)(Form);
