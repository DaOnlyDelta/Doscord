// QR code generator
function generateRandomId(len = 20) {
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let s = '';
for (let i = 0; i < len; i++) {
    s += chars.charAt(Math.floor(Math.random() * chars.length));
}
return s;
}

// generate a placeholder "QR data" (random id)
const qrValue = generateRandomId(30);

// render QR
const qr = new QRCode(document.getElementById("qrBox"), {
text: qrValue,
width: 160,
height: 160,
correctLevel: QRCode.CorrectLevel.H
});

// Transition between forms
const loginForm = document.getElementById('mid');
const registerForm = document.getElementById('reg');
const trigger = document.querySelector('#bottom h4');

trigger.addEventListener('click', () => {
    loginForm.classList.remove('active');
    loginForm.classList.add('out');

    registerForm.classList.remove('out');
    registerForm.classList.add('active');
});

const backBtn = document.querySelector('#reg #bottom h4');

backBtn.addEventListener('click', () => {
    registerForm.classList.remove('active');
    registerForm.classList.add('out');

    loginForm.classList.remove('out');
    loginForm.classList.add('active');
});

// Check login forms values
document.getElementById("mid").addEventListener("submit", function (event) {
    event.preventDefault();
    const emailField = document.getElementById("mailOrPhone");
    const passwordField = document.getElementById("pass");

    if (emailField.value.trim() === "") {
        emailField.focus();
        return;
    }

    if (passwordField.value.trim() === "") {
        passwordField.focus();
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500
    });
});

// Check reg form values
document.getElementById("reg").addEventListener("submit", function (event) {
    event.preventDefault();
    const emailField = document.getElementById("regMail");
    const displayField = document.getElementById("regDisplay");
    const UsernameField = document.getElementById("regUsername");
    const passwordField = document.getElementById("regPass");
    const monthField = document.getElementById("month-select");
    const dayField = document.getElementById("day-select");
    const yearField = document.getElementById("year-select");
    const month = parseInt(document.getElementById("month").value);
    const day = parseInt(document.getElementById("day").value);
    const year = parseInt(document.getElementById("year").value);
    const submit = document.getElementById("regSubmit");

    if (emailField.value.trim() === "") {
        emailField.focus();
        return;
    }

    if (displayField.value.trim() === "") {
        displayField.focus();
        return;
    }

    if (UsernameField.value.trim() === "") {
        UsernameField.focus();
        return;
    }

    if (passwordField.value.trim() === "") {
        passwordField.focus();
        return;
    }

    if (!month || !day || !year) {
        Swal.fire({
            icon: "error",
            title: "Please select month, day, and year!",
            showConfirmButton: false,
            timer: 2500
        });
        return;
    }

    // Check for correct date
    const date = new Date(year, month - 1, day);
    const isValid =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    if (!isValid) {
        Swal.fire({
            icon: "error",
            title: "Please select a valid date!",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "Register successful!",
        showConfirmButton: false,
        timer: 1500
    });
});

// ToS checkbox trigger
const checkbox = document.getElementById('termsCheck');
const submitBtn = document.getElementById('regSubmit');

// Initially disable the button
submitBtn.classList.remove('enabled');
submitBtn.disabled = true;

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('enabled');
    }
});
