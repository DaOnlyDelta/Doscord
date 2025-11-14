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


// Check email
function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check mid form values
document.getElementById("mid").addEventListener("submit", function (event) {
    event.preventDefault();
    const emailField = document.getElementById("mailOrPhone");
    const passwordField = document.getElementById("pass");

    const value = emailField.value.trim();

    if (value === "") {
        emailField.focus();
        return;
    }

    if (passwordField.value.trim() === "") {
        passwordField.focus();
        return;
    }

    const isEmail = checkEmail(value);

    const isPhone = phoneDetected;
    const hasPlus = isPhone && value.includes("+");

    // Trigger SweetAlert for invalid input
    if ((!isEmail && !isPhone) || hasPlus) {
        hideForms(1500);
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,

            allowOutsideClick: false,
            allowEscapeKey: false,

            icon: 'warning',
            title: 'Invalid input',
            text: isPhone && hasPlus ? "Please remove the prefix from the input field and select it on the right." : "Please enter a valid email address or phone number!",
            showConfirmButton: false,
            background: 'rgb(57, 58, 65)',
            color: '#fff',
            timer: 1500,
        });
        emailField.focus();
        return;
    }

    hideForms(1500);
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,

        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        background: 'rgb(57, 58, 65)',
        color: '#fff',
        timer: 1500
    });

    clearFormInputs();
});


// Check reg form values
document.getElementById("reg").addEventListener("submit", function (event) {
    event.preventDefault();
    const emailField = document.getElementById("regMail");
    const UsernameField = document.getElementById("regUsername");
    const passwordField = document.getElementById("regPass");
    const month = parseInt(document.getElementById("month").value);
    const day = parseInt(document.getElementById("day").value);
    const year = parseInt(document.getElementById("year").value);

    if (emailField.value.trim() === "") {
        emailField.focus();
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
        hideForms(2500);
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,

            icon: "error",
            title: "Please select month, day, and year!",
            showConfirmButton: false,
            background: 'rgb(57, 58, 65)',
            color: '#fff',
            timer: 2500
        });
        return;
    }

    // Check for email
    if (!checkEmail(emailField.value.trim())) {
        hideForms(1500);
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,

            icon: 'warning',
            title: 'Invalid email',
            text: "Please enter a valid email address!",
            showConfirmButton: false,
            background: 'rgb(57, 58, 65)',
            color: '#fff',
            timer: 1500,
        });
        emailField.focus();
        return;
    }

    // Check if password is strong enough
    const password = passwordField.value.trim();

    if (!(/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password))) {
        hideForms(2500);
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,

            icon: 'warning',
            title: 'Weak password',
            text: 'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol.',
            showConfirmButton: false,
            background: 'rgb(57, 58, 65)',
            color: '#fff',
            timer: 2500
        });
        passwordField.focus();
        return;
    }

    // Check for correct date
    const date = new Date(year, month - 1, day);
    const isValid =
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;

    if (!isValid) {
        hideForms(1500);
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,

            icon: "error",
            title: "Please select a valid date!",
            showConfirmButton: false,
            background: 'rgb(57, 58, 65)',
            color: '#fff',
            timer: 1500
        });
        return;
    }

    hideForms(1500);
    Swal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,

        icon: "success",
        title: "Register successful!",
        showConfirmButton: false,
        background: 'rgb(57, 58, 65)',
        color: '#fff',
        timer: 1500
    });

    clearFormInputs();
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


// Function to validate input for only a-z, A-Z, 0-9
const usernameField = document.getElementById("regUsername");
const passwordField = document.getElementById("regPass");

restrictCharacters(usernameField);
restrictCharacters(passwordField);

function restrictCharacters(field) {
    field.addEventListener('input', () => {
        const value = field.value;
        if (/[^a-zA-Z0-9.,_/\\@$!#%&?+-]/.test(value)) {
            hideForms(2500);
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,

                icon: 'warning',
                title: 'Invalid character',
                text: 'You can only use letters, numbers and (.,_/\\@$!#%&?+-).',
                showConfirmButton: false,
                background: 'rgb(57, 58, 65)',
                color: '#fff',
                timer: 2500,
            });
            field.value = value.replace(/[^a-zA-Z0-9]/g, '');
        }
    });
}


// Reset all inputs
function clearFormInputs() {
    // Clear text, password, and email inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');
    inputs.forEach(input => input.value = '');

    // Reset all selects to their first option
    const selects = document.querySelectorAll('select');
    selects.forEach(select => select.selectedIndex = 0);

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    // Re-disable the reg submit
    submitBtn.classList.remove('enabled');
    submitBtn.disabled = true;

    // Hide select only if invalid characters typed
    mailOrPhone.style.width = "95%";
    countrySelect.style.opacity = "0";
    countrySelect.style.transform = "translateX(100%)";
    wrapper.classList.remove("show-arrow");
    countrySelect.hidden = true;
    phoneDetected = false;
}


// Hide the forms on SweetAlert trigger
function hideForms(duration) {
    const mid = document.getElementById('mid');
    const reg = document.getElementById('reg');

    if (mid) mid.style.display = 'none';
    if (reg) reg.style.display = 'none';

    setTimeout(() => {
        if (mid) mid.style.display = '';
        if (reg) reg.style.display = '';
    }, duration + 155);
}


// Country select animation
let phoneDetected = false;
const mailOrPhone = document.getElementById("mailOrPhone");
const countrySelect = document.getElementById("countrySelect");
const wrapper = document.querySelector(".inputWrapper");

mailOrPhone.addEventListener("input", () => {
    const value = mailOrPhone.value.trim();

    // Phone-like input: only digits, spaces, +, ()
    const isPhoneLike = /^[\d\s()+]*$/.test(value);

    if (/\d/.test(value)) phoneDetected = true;

    if (phoneDetected && isPhoneLike) {
        // Shrink input and reveal select
        mailOrPhone.style.width = "70%";
        countrySelect.hidden = false;
        setTimeout(() => wrapper.classList.add("show-arrow"), 250);
        requestAnimationFrame(() => {
            countrySelect.style.opacity = "1";
            countrySelect.style.transform = "translateX(0)";
        });
    } else {
        // Hide select only if invalid characters typed
        mailOrPhone.style.width = "95%";
        countrySelect.style.opacity = "0";
        countrySelect.style.transform = "translateX(100%)";
        wrapper.classList.remove("show-arrow");
        setTimeout(() => (countrySelect.hidden = true), 100);
        phoneDetected = false; // reset detection
    }
});


// Fill the country select
const countries = [
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+49", flag: "🇩🇪" },
    { code: "+33", flag: "🇫🇷" },
    { code: "+39", flag: "🇮🇹" },
    { code: "+386", flag: "🇸🇮" },
    { code: "+34", flag: "🇪🇸" },
    { code: "+41", flag: "🇨🇭" },
    { code: "+31", flag: "🇳🇱" },
    { code: "+46", flag: "🇸🇪" },
    { code: "+47", flag: "🇳🇴" },
    { code: "+45", flag: "🇩🇰" },
    { code: "+358", flag: "🇫🇮" },
    { code: "+351", flag: "🇵🇹" },
    { code: "+48", flag: "🇵🇱" },
    { code: "+420", flag: "🇨🇿" },
    { code: "+421", flag: "🇸🇰" },
    { code: "+43", flag: "🇦🇹" },
    { code: "+355", flag: "🇦🇱" },
    { code: "+374", flag: "🇦🇲" },
    { code: "+372", flag: "🇪🇪" },
    { code: "+370", flag: "🇱🇹" },
    { code: "+371", flag: "🇱🇻" },
    { code: "+386", flag: "🇸🇮" },
    { code: "+423", flag: "🇱🇮" },
    { code: "+32", flag: "🇧🇪" },
    { code: "+221", flag: "🇸🇳" },
    { code: "+27", flag: "🇿🇦" },
    { code: "+880", flag: "🇧🇩" },
    { code: "+91", flag: "🇮🇳" },
    { code: "+81", flag: "🇯🇵" },
    { code: "+82", flag: "🇰🇷" },
    { code: "+60", flag: "🇲🇾" },
    { code: "+65", flag: "🇸🇬" },
    { code: "+971", flag: "🇦🇪" },
    { code: "+52", flag: "🇲🇽" },
    { code: "+55", flag: "🇧🇷" },
    { code: "+56", flag: "🇨🇱" },
    { code: "+57", flag: "🇨🇴" },
    { code: "+58", flag: "🇻🇪" },
    { code: "+591", flag: "🇧🇴" },
    { code: "+507", flag: "🇵🇦" },
    { code: "+595", flag: "🇵🇾" },
    { code: "+264", flag: "🇳🇦" },
    { code: "+263", flag: "🇿🇼" }
];

countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = `${country.flag} ${country.code}`;
    countrySelect.appendChild(option);
});