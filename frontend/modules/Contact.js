import validator from "validator";

export default class Contact {
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
      const nameErr = document.querySelector('#name-err');
      const emailErr = document.querySelector('#email-err');
      const emailTelErr = document.querySelector('#email-tel-err');
      this.cleanErrMsg(nameErr);
      this.cleanErrMsg(emailErr);
      this.cleanErrMsg(emailTelErr);
      this.validate(e, [nameErr, emailErr, emailTelErr]);
    });
  }

  validate(e, errs) {
    const el = e.target;
    const email = el.querySelector('#email').value;
    const name = el.querySelector('#name').value;
    const tel = el.querySelector('#tel').value;
    let error = false;

    // The email must be valid
    if (email && !validator.isEmail(email)) {
      errs[1].classList.remove('hidden');
      error = true;
    };

    // Must fill name field
    if (!name) {
      errs[0].classList.remove('hidden');
      error = true;
    };

    // Must fill email or tel field
    if (!email && !tel) {
      errs[2].classList.remove('hidden');
      error = true;
    };

    if (!error) el.submit();
  }

  setError(el) {
    el.classList.remove('hidden');
  }

  cleanErrMsg(el) {
    if (!el.classList.contains('hidden')) el.classList.add('hidden');
  }
}