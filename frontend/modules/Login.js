import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const emailErr = document.querySelector('#email-err');
      const passwordErr = document.querySelector('#password-err');

      this.cleanErrMsg(emailErr);
      this.cleanErrMsg(passwordErr);

      this.validate(e, emailErr, passwordErr);
    });
  }

  validate(e, ...errs) {
    const el = e.target;
    const email = el.querySelector('#email').value;
    const password = el.querySelector('#password').value;
    let error = false;

    if (!validator.isEmail(email)) {
      this.setError(errs[0]);
      error = true;
    }

    if (password.length < 8 || password.length > 20) {
      this.setError(errs[1]);
      error = true;
    }

    if (!error) el.submit();
  }

  setError(el) {
    el.classList.remove('hidden');
  }

  cleanErrMsg(el) {
    if (!el.classList.contains('hidden')) el.classList.add('hidden');
  }
}