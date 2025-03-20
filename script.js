const addBtn = document.querySelector('.add-btn')
const inputName = document.querySelector('#name')
const inputCategory = document.querySelector('#category')
const inputAmount = document.querySelector('#amount')
const dataContainer = document.querySelector('.data')
const table = document.querySelector('table')
const total = document.querySelector('.total')
const categoryTable = document.querySelector('#category-table')

let expenses = JSON.parse(localStorage.getItem('expenses')) || []
let expense = {}
let editingRowId = ''

table.addEventListener('click', (e) => {
    if (e.target.innerText == 'Edit') {
        editRow(e.target.parentElement.id)
    } else if (e.target.innerText == 'Delete') {
        deleteRow(e.target.parentElement.id)
    }
})

const deleteRow = (id) => {
    expenses = expenses.filter(expense => expense.id !== id)
    localStorage.setItem('expenses',JSON.stringify(expenses))
    loadData()
}

const editRow = (id) => {
    expenseData = expenses.filter((expense) => expense.id == id)[0]
    editingRowId = expenseData.id
    inputName.value = expenseData.title
    inputAmount.value = expenseData.amount
    expenses = expenses.filter(expense => expense.id !== id)
    loadData()
    if (editingRowId != '') {
        addBtn.innerText = 'Save'
    } else {
        addBtn.innerText = 'Add'
    }
}


addBtn.addEventListener('click', (e) => {
    expense = {
        id: crypto.randomUUID(),
        title: inputName.value,
        category: inputCategory.value,
        amount: +inputAmount.value,
    }
    expenses = [...expenses, expense]
    loadData()
    inputName.value = ''
    inputCategory.value = ''
    inputAmount.value = ''
    localStorage.setItem('expenses',JSON.stringify(expenses))
    if (addBtn.innerText == 'Save') {
        addBtn.innerText = 'Add '
    }
})
categoryTable.addEventListener('change',()=>{
    loadData()
})
function loadData() {
    dataContainer.innerText = ''
    expenses.filter(expense=>expense.category.includes(categoryTable.value)).forEach((expense) => {
        const tr = document.createElement('tr')
        tr.id = expense.id
        tr.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount}</td>
            <td class="edit">Edit</td>
            <td class="delete">Delete</td>
        `
        dataContainer.append(tr)
    })

    total.innerText = `$${expenses.reduce((accumulator,expense)=>accumulator+expense.amount,0)}`
}

loadData()