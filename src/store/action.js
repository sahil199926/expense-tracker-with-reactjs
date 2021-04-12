export const addTransaction=(transaction)=>{

    return {type:'ADD',payload:transaction}
}

export const deleteTransaction=(id)=>{
return {type:'DELETE',payload:id}

}