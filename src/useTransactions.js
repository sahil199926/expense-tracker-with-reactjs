

import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';



//?transaction
//? {amount: '',category: 'business',type: 'Income', date: new Date()}



//categories
// { type: 'Gifts', amount: 0, color: incomeColors[5] },
// { type: 'Salary', amount: 0, color: incomeColors[6] },
// { type: 'Savings', amount: 0, color: incomeColors[7] },
// { type: 'Rental income', amount: 0, color: incomeColors[8] },



//todo a custom hook starts with use and use react usestate and other hooks


const useTransaction = (title,transactions) => {
    resetCategories();
 const transactionPerType = transactions.filter((t) => t.type === title);
    const total = transactionPerType.reduce((acc, currval) => acc += currval.amount, 0);

    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    // console.log({ transactionPerType,categories });
    transactionPerType.forEach((t) => {
        categories.forEach((c) => {

            if (c.type === t.category) { c.amount += t.amount; }
        })

    });
    const filteredCategories = categories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color)
        }],
        labels: filteredCategories.map((c) => c.type)
    }
    return { total, chartData };


 
}



export default useTransaction;