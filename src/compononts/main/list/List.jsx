import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';

import { Delete, MoneyOff } from '@material-ui/icons'
import React from 'react'
import useStyles from './listStyle';
import {useContext} from 'react';
import { ExpenseTrackerContext } from "../../../context/Context";

const date=(d)=>{
    d=new Date(d);
const a=`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;

return a;
}


const List = () => {
    const {deleteTransaction,transactions}=useContext(ExpenseTrackerContext);
   
    const classes = useStyles();

    return (
        <MUIList denser={false} className={classes.list} >
            {transactions.map((transaction) => ( 
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`₹ ${transaction.amount}   - ${date(transaction.date)}`} />
                   <ListItemSecondaryAction>
                       <IconButton edge='end' aria-label='delete' onClick={()=>deleteTransaction(transaction.id)}>
                           <Delete/>
                       </IconButton>
                   </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}

        </MUIList>
    )
}

export default List
