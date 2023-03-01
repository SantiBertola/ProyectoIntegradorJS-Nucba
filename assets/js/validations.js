const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName")
const emailInput = document.getElementById("mail");
const phoneInput = document.getElementById("phone");


const NAME_LASTNAME_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;


const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => length > min && length < max;

const isNameValid = (name) => NAME_LASTNAME_REGEX.test(name)

const isLastNameValid = (lastName) => NAME_LASTNAME_REGEX.test(lastName)

const isEmailValid = (mail) => EMAIL_REGEX.test(mail);

const isPhoneValid = (phone) => PHONE_REGEX.test(phone);

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

const checkName = () => {
  let valid = false;
  const min = 2;
  const max = 25;
  const name = nameInput.value.trim();

  if (isEmpty(name)) {
    showError(nameInput, "El nombre es obligatorio.");
  } else if (!isBetween(name.length, min, max)) {
    showError(
      nameInput,
      `El nombre debe tener entre ${min} y ${max} caracteres`
    );
  } else {
    showSuccess(nameInput, "El nombre es valido");
    valid = true;
  }
  return valid;
};
const checkLastName = () => {
  let valid = false;
  const min = 3;
  const max = 25;
  const lastName = lastNameInput.value.trim();

  if (isEmpty(lastName)) {
    showError(lastNameInput, "El apellido es obligatorio.");
  } else if (!isBetween(lastName.length, min, max)) {
    showError(
      lastNameInput,
      `El apellido debe tener entre ${min} y ${max} caracteres`
    );
  } else {
    showSuccess(lastNameInput, "El apellido es valido");
    valid = true;
  }
  return valid;
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

const checkPhone = () => {
  let valid = false;
  const phone = phoneInput.value.trim();
  if (isEmpty(phone)) {
    showError(phoneInput, "El telefono es obligatorio");
  } else if (!isPhoneValid(phone)) {
    showError(phoneInput, "El telefono no es valido");
  } else {
    showSuccess(phoneInput, "El télefono es valido");
    valid = true;
  }
  return valid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = checkName();
  const isLastNameValid = checkLastName();
  const isEmailValid = checkEmail();
  const isPhoneValid = checkPhone();

  const isFormValid =
    isNameValid && isLastNameValid && isEmailValid && isPhoneValid;

  if (isFormValid) {
    form.submit();
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
      case "name":
        checkName();
        break;
      case "lastName":
        checkLastName();
        break;
      case "mail":
        checkEmail();
        break;
      case "phone":
        checkPhone();
        break;
    }
  })
);