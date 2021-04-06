
//reducer takes a old state and a action and redurn a new state
const ContextReducer=(state, action)=>{
    let transaction;
switch(action.type){
    case "DELETE":
        transaction=state.filter((i)=>i.id!==action.payload);
        localStorage.setItem('transactions',JSON.stringify(transaction));
        return transaction;

    case "ADD":
        transaction=[action.payload,...state];
        localStorage.setItem('transactions',JSON.stringify(transaction));
        return transaction;
    
    default:
        return state;
}
}

export default ContextReducer;
