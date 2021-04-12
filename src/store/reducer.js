import React from 'react'
import useTransaction from '../useTransactions';
const initial =  JSON.parse(localStorage.getItem('transactions'))||[];

const Reducer = (state = initial, action) => {
    let transaction;
    switch (action.type) {

        case 'ADD':
            transaction= [ action.payload, ...state ];
            localStorage.setItem("transactions",JSON.stringify(transaction));
            return transaction

        case 'DELETE':
            transaction= state.filter((t)=>t.id!=action.payload);
            localStorage.setItem("transactions",JSON.stringify(transaction));
            return transaction;
        
        default:
            return state;
    }

}


export default Reducer;
