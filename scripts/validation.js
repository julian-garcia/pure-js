document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('zip').addEventListener('blur', validateZip);

function testExpression(re, element){
  if (re.test(element.value) === false) {
    element.classList.add('is-invalid');
  } else {
    element.classList.remove('is-invalid');
  }
}

function validateName() {
  const re = /^[a-z]{2,10}$/i;
  testExpression(re, this);
}

function validateEmail() {
  const re = /^[a-z][a-z0-9_.-]{1,30}[^_.-]\@[a-z0-9][a-z0-9_.-]{0,30}[^_.-](\.[a-z]{2,})$/i;
  testExpression(re, this);
}

function validatePhone() {
  const re = /^[0-9\s\-]{10,20}$/i;
  testExpression(re, this);
}

function validateZip() {
  const re = /^[a-z]{1,2}[0-9]{1,2}[a-z]{0,1}\s{0,1}[0-9][a-z]{2}$/i;
  testExpression(re, this);
}
