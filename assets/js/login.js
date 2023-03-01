const form = document.getElementById("form");
const emailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");



const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;


const isEmpty = (value) => value === "";
const isEmailValid = (mail) => EMAIL_REGEX.test(mail);
const isPasswordValid = (password) => PASSWORD_REGEX.test(password);

const showError = (input, message) => {
    const formDivs = input.parentElement;
    formDivs.classList.remove("success");
    formDivs.classList.add("error");
    const errorContainer = formDivs.querySelector("small");
    errorContainer.textContent = message;
};

const showSuccess = (input, message) => {
    const formDivs = input.parentElement;
    formDivs.classList.remove("error");
    formDivs.classList.add("success");
    const errorContainer = formDivs.querySelector("small");
    errorContainer.textContent = message;
};

const checkEmail = () => {
    let valid = false;
    const email = emailInput.value.trim();
    if (isEmpty(email)) {
        showError(emailInput, "El mail es obligatorio");
    } else if (!isEmailValid(email)) {
        showError(emailInput, "El mail es invalido");
    } else {
        showSuccess(emailInput, "El mail es valido");
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordInput.value.trim();
    if (isEmpty(password)) {
        showError(passwordInput, "La contraseña es obligatoria");
    } else if (!isPasswordValid(password)) {
        showError(
            passwordInput,
            "La contraseña debe teenr al menos 8 caracteres, una mayuscula, una minuscula y un simbolo."
        );
    } else {
        showSuccess(passwordInput);
        valid = true;
    }
    return valid;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();


    const isEmailValid = checkEmail();
    const isPasswordValid = checkPassword();


    const isFormValid =
        isEmailValid && isPasswordValid;

    if (isFormValid) {
        form.submit();
        alert(`Gracias por iniciar sesión`)
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

form.addEventListener(
    "input",
    debounce((e) => {
        switch (e.target.id) {
            case "mail":
                checkEmail();
                break;
            case "password":
                checkPassword();
                break;
        }
    })
);