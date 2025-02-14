const form = document.getElementById('form');
const selectInputs = document.querySelectorAll('select');
const amount = document.getElementById('amount');
const button = document.getElementById('calculate-btn');
const error = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
    let isValid = true;

    selectInputs.forEach(select => {
        if(!select.value) {
            isValid = false;
            select.classList.add('error');
        } else {
            select.classList.remove('error');
        }
    })

    if (!isValid) {
        e.preventDefault(); 
        error.hidden = false; 
    } else {
        error.hidden = true; 
    }

    if(isValid && !amount.value){
        amount.value = 0;
    }

})
