// TODO: make comments.
// think about data-attributes appearing and hiding.
function handleForm(form, btn) {
  var name = form.getElementsByClassName("js-name"),
      email = form.getElementsByClassName("js-email"),
      phone = form.getElementsByClassName("js-phone"),
      field = form.getElementsByClassName("js-field"),
      close = form.getElementsByClassName("js-close"),
      overlay;

  if (form.parentNode.classList.contains("js-overlay")) {
    overlay = form.parentNode;
  };

  function toggleForm() {
    overlay.classList.toggle("modal--show");
  }

  function closeFormOnEsc(event) {
    if ((event.keyCode == 27) && overlay.classList.contains("modal--show")) {
      toggleForm();
    };
  }

  function validateEmail() {
    if (!isValidEmail(email[0].value) || !email[0].value.length) {
      email[0].classList.add("invalid");

      setTimeout(function () {
        email[0].classList.remove("invalid");
      }, 1000);

      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    var pattern = new RegExp(/^[a-z0-9\+_-]+(\.[a-z0-9_\+-]+)*@[a-z0-9_-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i);
    return ( pattern.test(email) );
  }

  function isValidName() {
    if (name[0].value.match(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g) || name[0].value.replace(/[\s\-\.]+/g, "").length < 2 || name[0].value.match(/^[\s\-\.]+$/g)) {
      name[0].classList.add("invalid");

      setTimeout(function () {
        name[0].classList.remove("invalid");
      }, 1000);

      return false;
    }
    return true;
  }

  function typeVetoName() {
    if (name[0].value.match(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g)) {
      var newValue = name[0].value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g, "");
      name[0].value = newValue;
    }
  }

  // check with function to correctness.
  function isValidPhone() {
    if (phone[0].value.match(/[^0-9\+\s\-]/g) || phone[0].value.replace(/[\s\-\+]+/g, "").length > 11 || phone[0].value.replace(/[\s\-\+]+/g, "").length < 6 || phone[0].value.match(/^[\s\-\+]+$/g)) {
      phone[0].classList.add("invalid");

      setTimeout(function() {
        phone[0].classList.remove("invalid");
      },1000);

      return false;
    };
    return true;
  }

  function typeVetoPhone() {
    if (phone[0].value.match(/[^0-9\+\s\-]/g)) {
      var newValue = phone[0].value.replace(/[^0-9\+\s\-]/g, "");
      phone[0].value = newValue;
    }
  }

  // to make an attention to this function
  function isEmptyField(field) {
    var self = (undefined == this.classList) ? field : this;

    if (!self.value.length) {
      self.classList.add("invalid");

      setTimeout(function () {
        self.classList.remove("invalid");
      }, 1000);

      return false;
    }
    return true;
  }

  function validateEverything() {
    if (name.length) {
      if (!isValidName()) {
        return false;
      }
    }

    if (email.length) {
      if (!validateEmail()) {
        return false;
      }
    }

    if (phone.length) {
      if (!isValidPhone()) {
        return false;
      }
    }

    if (field.length) {
      for (var i = 0; i < field.length; i++) {
        if (!isEmptyField(field[i])) {
          return false;
        };
      };
    }

    return true;
  }

  // strange function.
  // think it over.
  function ValidForm() {
    if (this.classList.contains("invalid")) {
      this.classList.remove("invalid")
      this.classList.add("valid");
    }

    if (this.classList.contains("valid")) {
      setTimeout(function () {
        this.classList.remove("valid");
      }, 1000);
    }
  }

[snp tpl="js/modules/serialize.js" ]

  function submitForm(event) {
    if (!validateEverything()) {
      event.preventDefault();
      return false;
    } else {
      var type;
      if (form.classList.contains("modal-form--application")) {
        type = "revision";
      } else if (form.classList.contains("modal-form--question")) {
        type = "question";
      } else if (form.classList.contains("modal-form--offer")) {
        type = "offer";
      };
      var request = new XMLHttpRequest();
      request.open("GET", "/my/url/", true);

      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          toggleForm();
        };
      };

      request.send();
    }
  }

  if (field.length) {
    for (var i = field.length; i--;) {
      // field[i].addEventListener("keyup", ValidForm);
      field[i].addEventListener("blur", isEmptyField);
    };
  }

  if (name.length) {
    name[0].addEventListener("blur", isValidName);
    // name[0].addEventListener("keyup", ValidForm);
    name[0].addEventListener("keyup", typeVetoName);
  };

  if (phone.length) {
    phone[0].addEventListener("blur", isValidPhone);
    // phone[0].addEventListener("keyup", ValidForm);
    phone[0].addEventListener("keyup", typeVetoPhone);
  }

  if (email.length) {
    email[0].addEventListener("blur", validateEmail);
    // email[0].addEventListener("keyup", ValidForm);
  }

  form.addEventListener("submit", submitForm);

  if (undefined != overlay) {
    if (close.length) {
      close[0].addEventListener("click", toggleForm);
      window.addEventListener("keydown", closeFormOnEsc);
    }

    if (btn) {
      btn.addEventListener("click", toggleForm);
    };
  };

}
