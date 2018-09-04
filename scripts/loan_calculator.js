// Define main UI elements to be referenced
const loanForm = document.getElementById('loan-form');
const loanAmount = document.getElementById('amount');
const loanInterest = document.getElementById('interest');
const loanRepayment = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const results = document.getElementById('results');
const loading = document.getElementById('loading');

loanForm.addEventListener('submit', calculateResults);

function calculateResults(e) {
  if (loanAmount.value && loanInterest.value && loanRepayment.value){
    if (loanAmount.value > 0 && loanInterest.value > 0){
      // Loan calculation
      const principalAmount = parseFloat(loanAmount.value);
      const interestCalc = parseFloat(loanInterest.value)/(12*100);
      const numPayments = parseFloat(loanRepayment.value) * 12;

      const x = Math.pow(1 + interestCalc, numPayments);
      const monthlyPaymentCalc = (principalAmount * x * interestCalc) / (x-1);
      const totalPaymentCalc = monthlyPaymentCalc * numPayments;
      const totalInterestCalc = totalPaymentCalc - principalAmount;

      // Show loading gif to indicate calculations are happening
      loadingAlert();

      // Render the calc results to the relevant DOM elements
      monthlyPayment.value = monthlyPaymentCalc.toFixed(2);
      totalPayment.value = totalPaymentCalc.toFixed(2);
      totalInterest.value = totalInterestCalc.toFixed(2);
    } else {
      errorAlert(`Your loan amount (${loanAmount.value}) and interest (${loanInterest.value}) must be greater than zero`);
    }
  } else {
    errorAlert('Please enter a loan amount, loan interest and repayment years');
  }

  e.preventDefault();
}

// Show error messages by creating the bootstrap alert component
// with a temporary lifespan of 3 seconds to avoid manual dismissal
function errorAlert(errorMessage){
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-secondary';
  errorDiv.textContent = errorMessage;
  document.getElementById('loan-form').appendChild(errorDiv);
  setTimeout(function (){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Temporarily show loading animated gif and hide results
// to indicate to the user that a calculation is happening. In reality,
// the calculation is performed in a matter of milliseconds.
function loadingAlert(){
  loading.className = 'd-block';
  results.classList.add('d-none');
  results.classList.remove('d-block');
  setTimeout(function (){
    loading.className = 'd-none';
    results.classList.add('d-block');
    results.classList.remove('d-none');
  }, 2000);
}
