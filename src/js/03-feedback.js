import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
let formData = {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form  input');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);

populateFeedbackForm();

function onInputData(e) {
  formData = {
    email: input.value,
    message: textarea.value,
  };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;
  console.log({ email: email.value, message: message.value });

  e.currentTarget.reset();
  formData = {};
}

function populateFeedbackForm() {
  let data = localStorage.getItem(LOCAL_KEY);
  if (!data) return;
  formData = JSON.parse(data);
  input.value = formData.email ?? '';
  textarea.value = formData.message ?? '';
}
