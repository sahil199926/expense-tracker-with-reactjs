import { useReducer } from "react";
//reducer takes a old state and a action and redurn a new state
import React from 'react'


const ContextReducer=(state, action)=>{
    let transaction;
switch(action.type){
    case "DELETE":
        transaction=state.filter((i)=>i.id!==action.payload);
        //todo LocalStorage
        localStorage.setItem('transactions',JSON.stringify(transaction));
        return transaction;

    case "ADD":
        transaction=[action.payload,...state];
        //todo LocalStorage
        localStorage.setItem('transactions',JSON.stringify(transaction));
        return transaction;
    
    default:
        return state;
        break;
}
}

export default ContextReducer;
