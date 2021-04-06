import React, { useReducer, createContext } from 'react';
import ContextReducer from "./useContextReducer";
const initialState=JSON.parse(localStorage.getItem('transactions'))||[];

export const ExpenseTrackerContext=createContext(initialState);

export const Provider=({children})=>{
    const [transactions,dispatch]=useReducer(ContextReducer,initialState);
  
     const deleteTransaction=(id)=>{
        dispatch({type:'DELETE',payload:id})
    }
    const addTransaction=(transaction)=>{
        dispatch({type:'ADD',payload:transaction})
    }

    const Balance=transactions.reduce((acc,currval)=>{

        return currval.type==='Income'? acc+currval.amount:acc-currval.amount},0
    )
    return (
        <ExpenseTrackerContext.Provider value={{Balance,deleteTransaction,addTransaction,transactions}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}